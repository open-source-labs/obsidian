import normalizeResult from './newNormalize.js';
import destructureQueries from './newDestructure.js';

export class Cache {
  constructor(
    cache = {
      ROOT_QUERY: {},
      ROOT_MUTATION: {},
    }
  ) {
    this.storage = cache;
    this.context = window.deno ? 'server' : 'client';
  }

  // Main functionality methods
  read(queryStr) {
    if (typeof queryStr !== 'string')
      throw TypeError('input should be a string');
    // destructure the query string into an object
    const queries = destructureQueries(queryStr).queries;
    const responseObject = {};
    // iterate through each query in the input queries object
    for (const query in queries) {
      // get the entire str query from the name input query and arguments
      const queryHash = queries[query].name.concat(queries[query].arguments);
      const rootQuery = this.cacheRead('ROOT_QUERY');
      // match in ROOT_QUERY
      if (rootQuery[queryHash]) {
        // get the hashs to populate from the existent query in the cache
        const arrayHashes = rootQuery[queryHash];
        // invoke populateAllHashes and add data objects to the response object for each input query
        responseObject[queries[query].name] = this.populateAllHashes(
          arrayHashes,
          queries[query].fields
        );
        if (!responseObject[queries[query].name]) return undefined;
        // no match with ROOT_QUERY return null or ...
      } else return undefined;
    }
    return { data: responseObject };
  }

  write(queryStr, respObj) {
    const queryObj = destructureQueries(queryStr);
    const resFromNormalize = normalizeResult(queryObj, respObj);
    // update the original cache with same reference
    for (const hash in resFromNormalize) {
      if (this.cacheRead(hash)) {
        const newObj = Object.assign(
          this.cacheRead(hash),
          resFromNormalize[hash]
        );
        this.cacheWrite(hash, newObj);
      } else {
        this.cacheWrite(hash, resFromNormalize[hash]);
      }
    }
    return;
  }

  delete(qryStr, respObj) {
    // deleteCache; sets any top level hashed values of response object to 'DELETE'
  }
  gc() {
    // garbageCollection;  garbage collection: removes any inaccessible hashes from the cache
  }

  // cache read/write helper methods
  cacheRead(hash) {
    // returns value from either object cache or redis cache || 'DELETED' || undefined
    if (this.context === 'client') {
      return this.storage[hash];
    } else {
      throw Error('Redis functionality has not been implemented');
    }
  }
  cacheWrite(hash, value) {
    // writes value to object cache or JSON.stringified value to redis cache
    if (this.context === 'client') {
      this.storage[hash] = value;
    } else {
      throw Error('Redis functionality has not been implemented');
    }
  }
  cacheDelete(hash) {
    // deletes the hash/value pair on either object cache or redis cache
    if (this.context === 'client') {
      delete this.storage[hash];
    } else {
      throw Error('Redis functionality has not been implemented');
    }
  }
  cacheClear() {
    // erases either object cache or redis cache
    if (this.context === 'client') {
      this.storage = { ROOT_QUERY: {}, ROOT_MUTATION: {} };
    } else {
      throw Error('Redis functionality has not been implemented');
    }
  }

  // specialized helper methods
  populateAllHashes(allHashesFromQuery, fields) {
    if (Array.isArray(allHashesFromQuery)) {
      // include the hashname for each hash
      const hyphenIdx = allHashesFromQuery[0].indexOf('~');
      const typeName = allHashesFromQuery[0].slice(0, hyphenIdx);
      return allHashesFromQuery.reduce((acc, hash) => {
        // for each hash from the input query, build the response object
        if (this.cacheRead(hash) === 'DELETED') return acc;
        const dataObj = {};
        for (const field in fields) {
          if (this.cacheRead(hash)[field] === 'DELETED') continue;
          // for each field in the fields input query, add the corresponding value from the cache if the field is not another array of hashs
          if (!this.cacheRead(hash)[field] && field !== '__typename')
            return undefined;
          else if (typeof fields[field] !== 'object') {
            // add the typename for the type
            if (field === '__typename') {
              dataObj[field] = typeName;
            } else dataObj[field] = this.cacheRead(hash)[field];
          } else {
            // case where the field from the input query is an array of hashes, recursively invoke populateAllHashes
            dataObj[field] = this.populateAllHashes(
              this.cacheRead(hash)[field],
              fields[field]
            );
          }
        }
        // acc is an array of response object for each hash
        acc.push(dataObj);
        return acc;
      }, []);
    }
    // Case where allHashesFromQuery has only one hash and is not an array but a single string
    const hash = allHashesFromQuery;
    if (this.cacheRead(hash) !== 'DELETED') {
      // include the typename for each hash
      const hyphenIdx = hash.indexOf('~');
      const typeName = hash.slice(0, hyphenIdx);
      const dataObj = {};
      for (const field in fields) {
        if (this.cacheRead(hash)[field] === 'DELETED') continue;
        if (!this.cacheRead(hash)[field] && field !== '__typename')
          return undefined;
        else if (typeof fields[field] !== 'object') {
          // add the typename for the type
          if (field === '__typename') {
            dataObj[field] = typeName;
          } else dataObj[field] = this.cacheRead(hash)[field];
        } else {
          dataObj[field] = this.populateAllHashes(
            this.cacheRead(hash)[field],
            fields[field]
          );
        }
      }
      return dataObj;
    }
  }
}
