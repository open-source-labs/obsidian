import normalizeResult from './normalize.js';
import destructureQueries from './destructure.js';

export default class Cache {
  constructor(
    initialCache = {
      ROOT_QUERY: {},
      ROOT_MUTATION: {},
    }
  ) {
    this.storage = initialCache;
    this.context = 'client';
  }

  // Main functionality methods
  async read(queryStr) {
    if (typeof queryStr !== 'string')
      throw TypeError('input should be a string');
    // destructure the query string into an object
    const queries = destructureQueries(queryStr).queries;
    // breaks out of function if queryStr is a mutation
    if (!queries) return undefined;
    const responseObject = {};
    // iterate through each query in the input queries object
    for (const query in queries) {
      // get the entire str query from the name input query and arguments
      const queryHash = queries[query].name.concat(queries[query].arguments);
      const rootQuery = await this.cacheRead('ROOT_QUERY');
      // match in ROOT_QUERY
      if (rootQuery[queryHash]) {
        // get the hashs to populate from the existent query in the cache
        const arrayHashes = rootQuery[queryHash];
        // invoke populateAllHashes and add data objects to the response object for each input query
        responseObject[queries[query].name] = await this.populateAllHashes(
          arrayHashes,
          queries[query].fields
        );
        if (!responseObject[queries[query].name]) return undefined;

        // no match with ROOT_QUERY return null or ...
      } else {
        return undefined;
      }
    }
    return { data: responseObject };
  }

  async write(queryStr, respObj, deleteFlag) {
    const queryObj = destructureQueries(queryStr);
    const resFromNormalize = normalizeResult(queryObj, respObj, deleteFlag);
    // update the original cache with same reference
    for (const hash in resFromNormalize) {
      const resp = await this.cacheRead(hash);
      if (resFromNormalize[hash] === 'DELETED') {
        await this.cacheWrite(hash, 'DELETED');
      } else if (resp) {
        const newObj = Object.assign(resp, resFromNormalize[hash]);
        await this.cacheWrite(hash, newObj);
      } else {
        await this.cacheWrite(hash, resFromNormalize[hash]);
      }
    }
    return;
  }

  gc() {
    // garbageCollection;  garbage collection: removes any inaccessible hashes from the cache
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
    this.storage = { ROOT_QUERY: {}, ROOT_MUTATION: {} };
  }

  // functionality to stop polling
  stopPollInterval(interval) {
    clearInterval(interval);
  }

  writeWholeQuery(queryStr, respObj) {
    let hash = queryStr.replace(/\s/g, '');
    this.cacheWrite(ROOT_QUERY[hash], respObj);
    return respObj;
  }

  readWholeQuery(queryStr) {
    let hash = queryStr.replace(/\s/g, '');
    const root = this.cacheRead('ROOT_QUERY');
    if (root[hash]) return { data: root[hash] };
    else return undefined;
  }

  // specialized helper methods
  async populateAllHashes(allHashesFromQuery, fields) {
    if (Array.isArray(allHashesFromQuery)) {
      // include the hashname for each hash
      if (!allHashesFromQuery.length) return [];
      const hyphenIdx = allHashesFromQuery[0].indexOf('~');
      const typeName = allHashesFromQuery[0].slice(0, hyphenIdx);
      return allHashesFromQuery.reduce(async (acc, hash) => {
        // for each hash from the input query, build the response object
        const readVal = await this.cacheRead(hash);
        if (readVal === 'DELETED') return acc;
        const dataObj = {};
        for (const field in fields) {
          if (readVal[field] === 'DELETED') continue;
          // for each field in the fields input query, add the corresponding value from the cache if the field is not another array of hashs
          if (readVal[field] === undefined && field !== '__typename') {
            return undefined;
          } else if (typeof fields[field] !== 'object') {
            // add the typename for the type
            if (field === '__typename') {
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
    }
    // Case where allHashesFromQuery has only one hash and is not an array but a single string
    const hash = allHashesFromQuery;
    const readVal = await this.cacheRead(hash);
    if (readVal !== 'DELETED') {
      // include the typename for each hash
      const hyphenIdx = hash.indexOf('~');
      const typeName = hash.slice(0, hyphenIdx);
      const dataObj = {};
      for (const field in fields) {
        if (readVal[field] === 'DELETED') continue;
        if (!readVal[field] && field !== '__typename') {
          return undefined;
        } else if (typeof fields[field] !== 'object') {
          // add the typename for the type
          if (field === '__typename') {
            dataObj[field] = typeName;
          } else dataObj[field] = readVal[field];
        } else {
          dataObj[field] = await this.populateAllHashes(
            readVal[field],
            fields[field]
          );
          if (dataObj[field] === undefined) return undefined;
        }
      }
      return dataObj;
    }
  }
}
