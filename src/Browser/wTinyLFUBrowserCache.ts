import { plural } from "https://deno.land/x/deno_plural@2.0.0/mod.ts";

import normalizeResult from "./normalize.js";
import destructureQueries from "./destructure.js";
import SLRUCache from "./wTinyLFU%20Sub-Caches/slruSub-cache.js"
import LRUCache from "./wTinyLFU%20Sub-Caches/lruSub-cache.js";
import WLRUCache from "./wTinyLFU%20Sub-Caches/wlruSub-cache.js"
import { FrequencySketch } from './FrequencySketch.js';

import { Node, LRU, SLRU } from './cacheTypes.ts'


// BIG TODO: Add Frequency Sketch Logic into get/put operations

type WTinyLFU = {
  capacity: number,
  currentSize: number,
  ROOT_QUERY: Record<string, unknown>,
  ROOT_MUTATION: Record<string, unknown>,
  WLRU: LRU,
  SLRU: SLRU
  prototype: Record<string, unknown>;
}


/*****
* Overall w-TinyLFU Cache
*****/
export class WTinyLFUCache {
  capacity: number;
  currentSize: number;
  ROOT_QUERY: Record<string, unknown>;
  ROOT_MUTATION: Record<string, unknown>;
  WLRU: LRU;
  SLRU: SLRU

  constructor(capacity:number) {
    this.capacity=capacity;
    this.currentSize=0;
    this.ROOT_QUERY={};
    this.ROOT_MUTATION={};
    
    this.WLRU=new LRUCache(capacity*.01);
    this.SLRU=new SLRUCache(capacity*.99);
  }

  putAndPromote(key: string,node: Node) {
    const WLRUCandidate: Node = this.WLRU.put(key, node);
    // if adding to the WLRU cache results in an eviction...
    if (WLRUCandidate) {
      let winner: Node = WLRUCandidate;
      // TODO: Double check that this pulls current size of cache correctly
      // if the probationary cache is at capacity...
      if (this.SLRU.probationaryLRU.nodeHash.size >= this.SLRU.probationaryLRU.capacity) {
        // send the last accessed item in the probationary cache to the TinyLFU
        const SLRUCandidate = this.SLRU.probationaryLRU.getCandidate();
        // determine which item will imrpove the hit-ratio most
        winner = this.TinyLFU(WLRUCandidate, SLRUCandidate);
      }
      // add the winner to the probationary SLRU (WLRU if no contest)
      this.SLRU.probationaryLRU.put(winner.key, winner);
    }
  }

  populateAllHashes(allHashesFromQuery: string[], fields: Record<string, unknown>) {
    if(!allHashesFromQuery.length)return [];
    const hyphenIdx=allHashesFromQuery[0].indexOf("~");
    const typeName=allHashesFromQuery[0].slice(0,hyphenIdx);
    const reduction=allHashesFromQuery.reduce(async (acc,hash) => {
      // for each hash from the input query, build the response object
      // first, check the SLRU cache
      const readVal=await this.SLRU.get(hash);
      // if the hash is not in the SLRU, check the WLRU
      if(!readVal) readVal=await this.WLRU.get(hash);
      if(readVal==="DELETED") return acc;
      if(!readVal) return undefined;
      const dataObj={};
      for(const field in fields) {
        if(readVal[field]==="DELETED") continue;
        // for each field in the fields input query, add the corresponding value from the cache if the field is not another array of hashs
        if(readVal[field]===undefined&&field!=="__typename") {
          return undefined;
        }
        if(typeof fields[field]!=="object") {
          // add the typename for the type
          if(field==="__typename") {
            dataObj[field]=typeName;
          } else dataObj[field]=readVal[field];
        } else {
          // case where the field from the input query is an array of hashes, recursively invoke populateAllHashes
          dataObj[field]=await this.populateAllHashes(readVal[field], fields[field]);
          if(dataObj[field]===undefined) return undefined;
        }
      }
      // acc is an array of response object for each hash
      const resolvedProm=await Promise.resolve(acc);
      resolvedProm.push(dataObj);
      return resolvedProm;
    },[]);
    return reduction;
  }

  async read(queryStr: string) {
    if(typeof queryStr!=="string") throw TypeError("input should be a string");
    // destructure the query string into an object
    const queries=destructureQueries(queryStr).queries;
    // breaks out of function if queryStr is a mutation
    if(!queries) return undefined;
    const responseObject={};
    // iterate through each query in the input queries object
    for(const query in queries) {
      // get the entire str query from the name input query and arguments
      const queryHash=queries[query].name.concat(queries[query].arguments);
      const rootQuery=this.ROOT_QUERY;
      // match in ROOT_QUERY
      if(rootQuery[queryHash]) {
        // get the hashes to populate from the existent query in the cache
        const arrayHashes=rootQuery[queryHash];
        // Determines responseObject property labels - use alias if applicable, otherwise use name
        const respObjProp=queries[query].alias??queries[query].name;
        // invoke populateAllHashes and add data objects to the response object for each input query
        responseObject[respObjProp]=await this.populateAllHashes(arrayHashes, queries[query].fields);
        if(!responseObject[respObjProp]) return undefined;
        // no match with ROOT_QUERY return null or ...
      } else {
      return null;
      }
    }
    return { data: responseObject };
  }

  async write(queryStr: string,respObj,deleteFlag: boolean) {
    let nullFlag=false;
    let deleteMutation="";
    let wasFoundIn=null;
    for(const query in respObj.data) {
      if(respObj.data[query]===null) nullFlag=true;
      else if(query.toLowerCase().includes('delete')) deleteMutation=labelId(respObj.data[query]);
    }
    if(!nullFlag) {
      const queryObj=destructureQueries(queryStr);
      const resFromNormalize=normalizeResult(queryObj,respObj,deleteFlag);
      // update the original cache with same reference
      for(const hash in resFromNormalize) {
        // first check SLRU
        let resp=await this.SLRU.get(hash);
        // next, check the window LRU
        if(resp) wasFoundIn='SLRU';
        else resp =await this.WLRU.get(hash);
        if(resp&&!wasFoundIn) wasFoundIn='WLRU';
        if(hash==="ROOT_QUERY"||hash==="ROOT_MUTATION") {
          if(deleteMutation==="") {
            this[hash]=Object.assign(this[hash],resFromNormalize[hash]);
          } else {
            const typeName=deleteMutation.slice(0,deleteMutation.indexOf('~'));
            for(const key in this.ROOT_QUERY) {
              if(key.includes(typeName+'s')||key.includes(plural(typeName))) {
                for(let i=0;i<this.ROOT_QUERY[key].length;i++) {
                  if(this.ROOT_QUERY[key][i]===deleteMutation) {
                    this.ROOT_QUERY[key].splice(i,1);
                    i--;
                  }
                }
              }
            }
          }
        } else if(resFromNormalize[hash]==="DELETED") {
          // Should we delete directly or do we still need to flag as DELETED
          if(wasFoundIn==='SLRU') await this.SLRU.put(hash,"DELETED");
          else if(wasFoundIn==='WLRU') await this.WLRU.put(hash,"DELETED");
        } else if(resp) {
          const newObj=Object.assign(resp,resFromNormalize[hash]);
          if(wasFoundIn==='SLRU') await this.SLRU.put(hash,newObj);
          else if(wasFoundIn==='WLRU') await this.WLRU.put(hash,newObj);
        } else {
          const typeName=hash.slice(0,hash.indexOf('~'));
          if(wasFoundIn==='SLRU') await this.SLRU.put(hash,resFromNormalize[hash]);
          else if(wasFoundIn==='WLRU') await this.WLRU.put(hash,resFromNormalize[hash]);
          for(const key in this.ROOT_QUERY) {
            if(key.includes(typeName+'s')||key.includes(plural(typeName))) {
              this.ROOT_QUERY[key].push(hash);
            }
          }
        }
      }
    }
  }
  /*****
  * TinyLFU Admission Policy
  *****/
  TinyLFU(WLRUCandidate: Node, SLRUCandidate: Node) {
  // TODO: Test that this integration of the frequency sketch is accurate and functional
    const WLRUFreq = FrequencySketch.frequency(JSON.stringify(WLRUCandidate.value));
    const SLRUFreq = FrequencySketch.frequency(JSON.stringify(SLRUCandidate.value));
    return WLRUFreq > SLRUFreq ? WLRUCandidate : SLRUCandidate;
  }
}
  
  