/** @format */

import normalizeResult from "./normalize.js";
import destructureQueries from "./destructure.js";

export default class BrowserCache {
  constructor(
    initialCache = {
      ROOT_QUERY: {},
      ROOT_MUTATION: {},
      // match resolvers to types in order to add them in write-through
      writeThroughInfo: {},
    },
  ) {
    this.storage = initialCache;
    this.context = "client";
  }

  // Main functionality methods
  async read(queryStr) {
    if (typeof queryStr !== "string") {
      throw TypeError("input should be a string");
    }
    // destructure the query string into an object
    const queries = destructureQueries(queryStr).queries;
    // breaks out of function if queryStr is a mutation
    if (!queries) return undefined;
    const responseObject = {};
    // iterate through each query in the input queries object
    for (const query in queries) {
      // get the entire str query from the name input query and arguments
      const queryHash = queries[query].name.concat(queries[query].arguments);
      const rootQuery = await this.cacheRead("ROOT_QUERY");
      // match in ROOT_QUERY
      if (rootQuery[queryHash]) {
        // get the hashs to populate from the existent query in the cache
        const arrayHashes = rootQuery[queryHash];
        // Determines responseObject property labels - use alias if applicable, otherwise use name
        const respObjProp = queries[query].alias ?? queries[query].name;
        // invoke populateAllHashes and add data objects to the response object for each input query
        responseObject[respObjProp] = await this.populateAllHashes(
          arrayHashes,
          queries[query].fields,
        );
        if (!responseObject[respObjProp]) return undefined;

        // no match with ROOT_QUERY return null or ...
      } else {
        return undefined;
      }
    }
    return { data: responseObject };
  }

  async writeThrough(queryStr, respObj, deleteFlag, endpoint) {
    try {
      const queryObj = destructureQueries(queryStr);
      const mutationName = queryObj.mutations[0].name;
      // check if it's a mutation
      if (queryObj.mutations) {
        // check to see if the mutation/type has been stored in the cache yet
        // if so, make the graphQL call
        if (!this.storage.writeThroughInfo.hasOwnProperty(mutationName)) {
          respObj = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ query: queryStr }),
          }).then((resp) => resp.json());
          // store the mutation/type in cache
          this.storage.writeThroughInfo[mutationName] = {};
          this.storage.writeThroughInfo[mutationName].type =
            respObj.data[mutationName].__typename;
          this.storage.writeThroughInfo[mutationName].lastId =
            respObj.data[mutationName].id;
          // below is for situations when the type is already stored
        } else {
          // construct the response object ourselves
          const dummyResponse = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ query: queryStr }),
          }).then((resp) => resp.json());
          this.constructResponseObject(queryObj, respObj, deleteFlag);
        }
        // same logic for both situations
        // normalize the result, invalidate the cache and return the appropriate object
        await this.write(queryStr, respObj, deleteFlag);
        return respObj;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async write(queryStr, respObj, deleteFlag) {
    const queryObj = destructureQueries(queryStr);
    const resFromNormalize = normalizeResult(queryObj, respObj, deleteFlag);
    // update the original cache with same reference
    for (const hash in resFromNormalize) {
      const resp = await this.cacheRead(hash);
      if (resFromNormalize[hash] === "DELETED") {
        await this.cacheWrite(hash, "DELETED");
      } else if (resp) {
        const newObj = Object.assign(resp, resFromNormalize[hash]);
        await this.cacheWrite(hash, newObj);
      } else {
        await this.cacheWrite(hash, resFromNormalize[hash]);
      }
    }
  }

  constructResponseObject(queryObj, respObj, deleteFlag) {
    const mutationData = queryObj.mutations[0];
    const mutationName = mutationData.name;
    const __typename = this.storage.writeThroughInfo[mutationName].type;
    // this.storage.writeThroughInfo[mutationName].type;
    respObj.data = {};
    const obj = {};
    respObj.data[mutationName] = obj;
    obj.__typename = __typename;
    // delete logic
    if (deleteFlag) {
      // add id and value from the queryObj
      let idAndVal = mutationData.arguments;
      idAndVal = idAndVal.split(":");
      const id = idAndVal[0].substring(1);
      const val = idAndVal[1].substring(0, idAndVal[1].length - 1);
      obj[id] = val;
      // return out of this function so we don't continue
      // onto add/update logic
      return respObj;
    }
    // increment ID for ADD mutations only
    obj.id = (++this.storage.writeThroughInfo[mutationName].lastId).toString();

    // ADD mutation logic
    // grab arguments (which is a string)
    const argumentsStr = mutationData.arguments;
    this.addNonScalarFields(argumentsStr, respObj, mutationData);
    this.separateArguments(argumentsStr, respObj, mutationName);
  }

  separateArguments(str, respObj, mutationName) {
    const startIndex = str.indexOf("{");
    const slicedStr = str.slice(startIndex + 1, str.length - 2);
    const argumentPairs = slicedStr.split(",");
    for (const argumentPair of argumentPairs) {
      const argumentKeyAndValue = argumentPair.split(":");
      const argumentKey = argumentKeyAndValue[0];
      let argumentValue = Number(argumentKeyAndValue[1])
        ? Number(argumentKeyAndValue[1])
        : argumentKeyAndValue[1];
      if (typeof argumentValue === "string") {
        argumentValue = argumentValue.replace(/\"/g, "");
      }
      respObj.data[mutationName][argumentKey] = argumentValue;
    }
  }

  addNonScalarFields(respObj, mutationData) {
    for (const field in mutationData.fields) {
      if (
        mutationData.fields[field] !== "scalar" &&
        mutationData.fields[field] !== "meta"
      ) {
        respObj.data[mutationData.name][field] = [];
      }
    }
  }

  gc() {
    // garbageCollection;  garbage collection: removes any inaccessible hashes from the cache
    const badHashes = getBadHashes();
    const goodHashes = rootQueryCleaner(badHashes);
    const goodHashes2 = getGoodHashes(badHashes, goodHashes);
    removeInaccessibleHashes(badHashes, goodHashes2);
  }

  // remove hashes that are flagged for deletion and store records of them in a set badHashes for removal inside root queries
  getBadHashes() {
    const badHashes = new Set();
    for (let key in this.storage) {
      if (key === "ROOT_QUERY" || key === "ROOT_MUTATION") continue;
      if (this.storage[key] === "DELETED") {
        badHashes.add(key);
        delete this.storage[key];
      }
    }
    return badHashes;
  }

  // go through root queries, remove all instances of bad hashes, add remaining hashes into goodHashes set
  rootQueryCleaner(badHashes) {
    const goodHashes = new Set();
    const rootQuery = this.storage["ROOT_QUERY"];
    for (let key in rootQuery) {
      if (Array.isArray(rootQuery[key])) {
        rootQuery[key] = rootQuery[key].filter((x) => !badHashes.has(x));
        if (rootQuery[key].length === 0) delete rootQuery[key];
        for (let el of rootQuery[key]) goodHashes.add(el);
      } else {
        badHashes.has(rootQuery[key])
          ? delete rootQuery[key]
          : goodHashes.add(rootQuery[key]);
      }
    }
    return goodHashes;
  }

  // Go through the cache, check good hashes for any nested hashes and add them to goodHashes set
  getGoodHashes(badHashes, goodHashes) {
    for (let key in this.storage) {
      if (key === "ROOT_QUERY" || key === "ROOT_MUTATION") continue;
      for (let i in this.storage[key]) {
        if (Array.isArray(this.storage[key][i])) {
          for (let el of this.storage[key][i]) {
            if (el.includes("~") && !badHashes.has(el)) {
              goodHashes.add(el);
            }
          }
        } else if (typeof this.storage[key][i] === "string") {
          if (
            this.storage[key][i].includes("~") &&
            !badHashes.has(this.storage[key][i])
          ) {
            goodHashes.add(this.storage[key][i]);
          }
        }
      }
    }
    return goodHashes;
  }

  // Remove inaccessible hashes by checking if they are in goodhashes set or not
  removeInaccessibleHashes(badHashes, goodHashes) {
    for (let key in this.storage) {
      if (key === "ROOT_QUERY" || key === "ROOT_MUTATION") continue;
      if (!goodHashes.has(key)) delete this.storage[key];
      for (let i in this.storage[key]) {
        if (Array.isArray(this.storage[key][i])) {
          this.storage[key][i] = this.storage[key][i].filter(
            (x) => !badHashes.has(x),
          );
        } else if (typeof this.storage[key][i] === "string") {
          if (
            this.storage[key][i].includes("~") &&
            badHashes.has(this.storage[key][i])
          ) {
            delete this.storage[key][i];
          }
        }
      }
    }
  }

  // cache read/write helper methods
  async cacheRead(hash) {
    return this.storage[hash];
  }

  async cacheWrite(hash, value) {
    this.storage[hash] = value;
  }

  async cacheDelete(hash) {
    delete this.storage[hash];
  }

  async cacheClear() {
    this.storage = {
      ROOT_QUERY: {},
      ROOT_MUTATION: {},
    };
  }

  // functionality to stop polling
  stopPollInterval(interval) {
    clearInterval(interval);
  }

  writeWholeQuery(queryStr, respObj) {
    const hash = queryStr.replace(/\s/g, "");
    this.cacheWrite(ROOT_QUERY[hash], respObj);
    return respObj;
  }

  readWholeQuery(queryStr) {
    const hash = queryStr.replace(/\s/g, "");
    const root = this.cacheRead("ROOT_QUERY");
    if (root[hash]) return { data: root[hash] };
    return undefined;
  }

  // specialized helper methods
  async populateAllHashes(allHashesFromQuery, fields) {
    // include the hashname for each hash
    if (!allHashesFromQuery.length) return [];
    const hyphenIdx = allHashesFromQuery[0].indexOf("~");
    const typeName = allHashesFromQuery[0].slice(0, hyphenIdx);
    return allHashesFromQuery.reduce(async (acc, hash) => {
      // for each hash from the input query, build the response object
      const readVal = await this.cacheRead(hash);
      // return undefine if hash has been garbage collected
      if (readVal === undefined) return undefined;
      if (readVal === "DELETED") return acc;
      const dataObj = {};
      for (const field in fields) {
        if (readVal[field] === "DELETED") continue;
        // for each field in the fields input query, add the corresponding value from the cache if the field is not another array of hashs
        if (readVal[field] === undefined && field !== "__typename") {
          return undefined;
        } else if (typeof fields[field] !== "object") {
          // add the typename for the type
          if (field === "__typename") {
            dataObj[field] = typeName;
          } else dataObj[field] = readVal[field];
        } else {
          // case where the field from the input query is an array of hashes, recursively invoke populateAllHashes
          dataObj[field] = await this.populateAllHashes(
            readVal[field],
            fields[field],
          );
          if (dataObj[field] === undefined) return undefined;
        }
      }
      // acc is an array within a Response object for each hash
      try {
        const resolvedProm = await Promise.resolve(acc);
        resolvedProm.push(dataObj);
        return resolvedProm;
      } catch (error) {
        return undefined;
      }
    }, []);
  }
}
