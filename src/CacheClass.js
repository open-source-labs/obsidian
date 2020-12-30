import normalizeResult from './newNormalize.js';
import destructureQueries from './newDestructure.js';
import redis from './redisCache.ts';

let connectFunc;
console.log(await redis.ping());

export class Cache {
  constructor(
    cache = {
      ROOT_QUERY: {},
      ROOT_MUTATION: {},
    }
  ) {
    this.storage = cache;
    // this.context = window.Deno ? 'server' : 'client';
    this.context = 'server';
  }

  // Main functionality methods
  async read(queryStr) {
    console.log('I AM DOING A CACHE READ');
    if (typeof queryStr !== 'string')
      throw TypeError('input should be a string');
    // destructure the query string into an object
    const queries = destructureQueries(queryStr).queries;
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
        responseObject[queries[query].name] = this.populateAllHashes(
          arrayHashes,
          queries[query].fields
        );
        if (!responseObject[queries[query].name]) {
          console.log('CACHE MISS: in populateAllHashes');
          return undefined;
        }
        // no match with ROOT_QUERY return null or ...
      } else {
        console.log('CACHE MISS: in RootQuery check');
        return undefined;
      }
    }
    return { data: responseObject };
  }

  async write(queryStr, respObj, deleteFlag) {
    const queryObj = destructureQueries(queryStr);

    const resFromNormalize = normalizeResult(queryObj, respObj, deleteFlag);
    console.log('resFromNormalize', resFromNormalize);
    // update the original cache with same reference
    for (const hash in resFromNormalize) {
      const resp = await this.cacheRead(hash);
      if (resp) {
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

  // async initializeRedis() {
  //   if (this.context === 'server') {
  //     import('./redisCache.js').then((mod) => {
  //       connectFunc = mod.default;
  //     });
  //   }
  //   this.redis = await connectFunc(this.context);
  // }

  // cache read/write helper methods
  async cacheRead(hash) {
    // returns value from either object cache or   cache || 'DELETED' || undefined
    if (this.context === 'client') {
      console.log('i am cheating');
      return this.storage[hash];
    } else {
      console.log('CACHEREAD');

      let hashedQuery = await redis.get(hash);
      console.log('hash', hash);
      console.log('value', hashedQuery);
      if (hashedQuery === undefined) return undefined;
      console.log('parsed value', JSON.parse(hashedQuery));
      return JSON.parse(hashedQuery);
    }
  }
  async cacheWrite(hash, value) {
    // writes value to object cache or JSON.stringified value to redis cache
    if (this.context === 'client') {
      console.log('i am cheating');
      this.storage[hash] = value;
    } else {
      console.log('CACHEWRITE');
      console.log('hash', hash);
      console.log('value to be written', hashedQuery);
      value = JSON.stringify(value);
      await redis.set(hash, value);
      // extra check
      const check = await redis.get(hash);
      console.log('value in cache', check);
    }
  }
  async cacheDelete(hash) {
    // deletes the hash/value pair on either object cache or redis cache
    if (this.context === 'client') {
      delete this.storage[hash];
    } else {
      let delHash = await redis.del(hash);
      console.log(delHash);
    }
  }
  async cacheClear() {
    // erases either object cache or redis cache
    if (this.context === 'client') {
      this.storage = { ROOT_QUERY: {}, ROOT_MUTATION: {} };
    } else {
      await redis.flushdb((err, successful) => {
        if (err) console.log('redis error', err);
        console.log(successful, 'clear');
      });
      await redis.set('ROOT_QUERY', JSON.stringify({}));
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
