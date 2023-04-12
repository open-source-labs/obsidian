/** @format */
import { plural } from "https://deno.land/x/deno_plural@2.0.0/mod.ts";

import normalizeResult from "./normalize.js";
import destructureQueries from "./destructure.js";

class Node {
  constructor(key, value) {
    this.key = key; // 'Actor~1
    this.val = value; // {id:1, name:harrison, ....}
    this.next = this.prev = null;
    this.freq = 1;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = new Node(null, null);
    this.tail = new Node(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  insertHead(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  removeNode(node) {
    const prev = node.prev;
    const next = node.next;
    prev.next = next;
    next.prev = prev;
  }

  removeTail() {
    const node = this.tail.prev;
    this.removeNode(node);
    return node.key;
  }

  isEmpty() {
    return this.head.next.val == null;
  }
}

/**
 * @param {number} capacity
 */
export default function LFUCache(capacity) {
  this.capacity = capacity;
  this.currentSize = 0;
  this.leastFreq = 0;
  this.ROOT_QUERY = {};
  this.ROOT_MUTATION = {};
  this.nodeHash = new Map();
  this.freqHash = new Map();
  this.callTime = 0
}

/**
 * @param {string} key
 * @return {object}
 */
LFUCache.prototype.get = function (key) {
  let node = this.nodeHash.get(key);
  // if node is not found return undefined so that Obsidian will pull new data from graphQL
  if (!node) return undefined;
  this.freqHash.get(node.freq).removeNode(node);
  if (node.freq == this.leastFreq && this.freqHash.get(node.freq).isEmpty())
    this.leastFreq++;
  node.freq++;
  // freqHash housekeeping
  if (this.freqHash.get(node.freq) == null)
    this.freqHash.set(node.freq, new DoublyLinkedList());
  this.freqHash.get(node.freq).insertHead(node);
  return node.val;
};

/**
 * @param {string} key
 * @param {object} value
 * @return {void}
 */
LFUCache.prototype.put = function (key, value) {
  if (this.capacity == 0) return;
  let node = this.nodeHash.get(key);
  if (!node) {
    // new node
    this.currentSize++;
    if (this.currentSize > this.capacity) {
      let tailKey = this.freqHash.get(this.leastFreq).removeTail();
      this.nodeHash.delete(tailKey);
      this.currentSize--;
    }
    let newNode = new Node(key, value);
    // freqHash housekeeping
    if (this.freqHash.get(1) == null)
      this.freqHash.set(1, new DoublyLinkedList());
    this.freqHash.get(1).insertHead(newNode);

    this.nodeHash.set(key, newNode);
    this.leastFreq = 1;
  } else {
    // existed node
    node.val = value;
    this.freqHash.get(node.freq).removeNode(node);
    if (node.freq == this.leastFreq && this.freqHash.get(node.freq).isEmpty())
      this.leastFreq++;
    node.freq++;
    // freqHash housekeeping
    if (this.freqHash.get(node.freq) == null)
      this.freqHash.set(node.freq, new DoublyLinkedList());
    this.freqHash.get(node.freq).insertHead(node);
  }
};

LFUCache.prototype.read = async function (queryStr) {
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

LFUCache.prototype.write = async function (queryStr, respObj, searchTerms, deleteFlag) {
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
        /****
        * if search terms were provided in the wrapper and the query is an 
        * "all"-type query, build out queries in ROOT_QUERY that match the 
        * search terms for each item retrieved from the "all"-type query so 
        * that future single queries can be looked up directly from the cache
        ****/
        if (searchTerms && queryStr.slice(8, 11) === 'all'){
          searchTerms.forEach(el => {
            const elVal = resFromNormalize[hash][el].replaceAll(' ', '');
            const hashKey = `one${typeName}(${el}:"${elVal}")`;
            if (!this.ROOT_QUERY[hashKey]) this.ROOT_QUERY[hashKey] = [];
            this.ROOT_QUERY[hashKey].push(hash);
          });
        }
      }
    }
  }
};

function labelId(obj) {
  const id = obj.id || obj.ID || obj._id || obj._ID || obj.Id || obj._Id;
  return obj.__typename + "~" + id;
}

LFUCache.prototype.cacheDelete = function (hash) {
  const node = this.nodeHash.get(hash);
  this.freqHash.get(node.freq).removeNode(node);
  this.nodeHash.delete(hash);
};

LFUCache.prototype.cacheClear = function () {
  this.currentSize = 0;
  this.leastFreq = 0;
  this.ROOT_QUERY = {};
  this.ROOT_MUTATION = {};
  this.nodeHash = new Map();
  this.freqHash = new Map();
};

LFUCache.prototype.writeWholeQuery = function (queryStr, respObj) {
  const hash = queryStr.replace(/\s/g, "");
  this.put(this.ROOT_QUERY[hash], respObj);
  return respObj;
};

LFUCache.prototype.readWholeQuery = function (queryStr) {
  const hash = queryStr.replace(/\s/g, "");
  if (this.ROOT_QUERY[hash]) return this.get(this.ROOT_QUERY[hash]);
  return undefined;
};

LFUCache.prototype.populateAllHashes = function (
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
