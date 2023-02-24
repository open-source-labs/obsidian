import { plural } from "https://deno.land/x/deno_plural/mod.ts";

import normalizeResult from "./normalize.js";
import destructureQueries from "./destructure.js";

class Node {
  constructor (key, value) {
    this.key = key;
    this.value = value;
    this.next = this.prev = null;
  }
}

export default function LRUCache(capacity) {
  this.capacity = capacity;
  this.currentSize = 0;
  this.ROOT_QUERY = {};
  this.ROOT_MUTATION = {};
  this.nodeHash = new Map();

  this.head = new Node('head', null);
  this.tail = new Node('tail', null);
  this.head.next = this.tail;
  this.tail.prev = this.head;
}

LRUCache.prototype.removeNode = function (node) {
  const prev = node.prev;
  const next = node.next; 
  prev.next = next; 
  next.prev = prev;
};

LRUCache.prototype.addNode = function (node) {
  const tempTail = this.tail.prev;
  tempTail.next = node;
  
  this.tail.prev = node;
  node.next = this.tail;
  node.prev = tempTail;
}

LRUCache.prototype.get = function(key) {
  const node = this.nodeHash.get(key);
 
  // check if node does not exist in nodeHash obj
  if (!node) return null;

  this.removeNode(node);
  this.addNode(node);
  return node.value;
}

LRUCache.prototype.put = function (key, value) {
  // remove node from old position
  const node = this.nodeHash.get(key);
  if (node) this.removeNode(node);

  // create new node and add to tail
  const newNode = new Node(key, value);
  this.addNode(newNode);
  this.nodeHash.set(key, newNode);

  // check capacity - if over capacity, remove and reassign head node
  // if (Object.nodeHash[this.nodeHash].length > capacity) 
  if (this.nodeHash.get(key).size > this.capacity){
    const tempHead = this.head.next;
    this.removeNode(tempHead);
    this.nodeHash.delete(tempTail.key);
  }
}

LRUCache.prototype.read = async function (queryStr) {
  if (typeof queryStr !== "string") throw TypeError("input should be a string");
  // destructure the query string into an object
  const queries = destructureQueries(queryStr).queries;
  // breaks out of function if queryStr is a mutation
  if (!queries) return undefined;
  const responseObject = {};
  // iterate through each query in the input queries object
  for (const query in queries) {
    // get the entire str query from the name input query and arguments
    const queryHash = queries[query].name.concat(queries[query].arguments);
    const rootQuery = this.ROOT_QUERY;
    // match in ROOT_QUERY
    if (rootQuery[queryHash]) {
      // get the hashs to populate from the existent query in the cache
      const arrayHashes = rootQuery[queryHash];
      // Determines responseObject property labels - use alias if applicable, otherwise use name
      const respObjProp = queries[query].alias ?? queries[query].name;
      // invoke populateAllHashes and add data objects to the response object for each input query
      responseObject[respObjProp] = await this.populateAllHashes(
        arrayHashes,
        queries[query].fields
      );


      if (!responseObject[respObjProp]) return undefined;

      // no match with ROOT_QUERY return null or ...
    } else {
      return null;
    }
  }
  return { data: responseObject };
};

LRUCache.prototype.write = async function (queryStr, respObj, deleteFlag) {
  let nullFlag = false;
  let deleteMutation = "";
  for(const query in respObj.data) {
    if(respObj.data[query] === null) nullFlag = true
    else if(query.toLowerCase().includes('delete')) deleteMutation = labelId(respObj.data[query]);
  }
  if(!nullFlag) {
    const queryObj = destructureQueries(queryStr);
    const resFromNormalize = normalizeResult(queryObj, respObj, deleteFlag);
    // update the original cache with same reference
    for (const hash in resFromNormalize) {
      const resp = await this.get(hash);
      if (hash === "ROOT_QUERY" || hash === "ROOT_MUTATION") {
        if(deleteMutation === "") {
          this[hash] = Object.assign(this[hash], resFromNormalize[hash]);
        } else {
          const typeName = deleteMutation.slice(0, deleteMutation.indexOf('~'));
          for(const key in this.ROOT_QUERY) {
            if(key.includes(typeName + 's') || key.includes(plural(typeName))) {
              for(let i = 0; i < this.ROOT_QUERY[key].length; i++) {
                if(this.ROOT_QUERY[key][i] === deleteMutation) {
                  this.ROOT_QUERY[key].splice(i, 1);
                  i--;
                }
              }
            }
        }
        }
      } else if (resFromNormalize[hash] === "DELETED") {
        // Should we delete directly or do we still need to flag as DELETED
        await this.put(hash, "DELETED");
      } else if (resp) {
        const newObj = Object.assign(resp, resFromNormalize[hash]);
        await this.put(hash, newObj);
      } else {
        const typeName = hash.slice(0, hash.indexOf('~'));
        await this.put(hash, resFromNormalize[hash]);
        for(const key in this.ROOT_QUERY) {
          if(key.includes(typeName + 's') || key.includes(plural(typeName))) {
            this.ROOT_QUERY[key].push(hash);
          }
        }
      }
    }
  }
};

function labelId(obj) {
  const id = obj.id || obj.ID || obj._id || obj._ID || obj.Id || obj._Id;
  return obj.__typename + "~" + id;
}

LRUCache.prototype.populateAllHashes = function (
  allHashesFromQuery,
  fields
) {
  if (!allHashesFromQuery.length) return [];
  const hyphenIdx = allHashesFromQuery[0].indexOf("~");
  const typeName = allHashesFromQuery[0].slice(0, hyphenIdx);
  const reduction =  allHashesFromQuery.reduce(async (acc, hash) => {
    // for each hash from the input query, build the response object
    const readVal = await this.get(hash);
    if (readVal === "DELETED") return acc;
    if (!readVal) return undefined;
    const dataObj = {};
    for (const field in fields) {
      if (readVal[field] === "DELETED") continue;
      // for each field in the fields input query, add the corresponding value from the cache if the field is not another array of hashs
      if (readVal[field] === undefined && field !== "__typename") {
        return undefined;
      }
      if (typeof fields[field] !== "object") {
        // add the typename for the type
        if (field === "__typename") {
          dataObj[field] = typeName;
        } else dataObj[field] = readVal[field];
      } else {
        // case where the field from the input query is an array of hashes, recursively invoke populateAllHashes
        dataObj[field] = await this.populateAllHashes(
          readVal[field],
          fields[field]
        );
        if (dataObj[field] === undefined) return undefined;
      }
    }
    // acc is an array of response object for each hash
    const resolvedProm = await Promise.resolve(acc);
    resolvedProm.push(dataObj);
    return resolvedProm;
  }, []);
  return reduction;
};
