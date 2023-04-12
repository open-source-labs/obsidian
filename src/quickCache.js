/** @format */

import "https://deno.land/x/dotenv@v3.2.2/load.ts";
import { connect } from "https://deno.land/x/redis@v0.29.2/mod.ts";
import { gql } from "https://deno.land/x/oak_graphql@0.6.4/mod.ts";
import { print, visit } from "https://deno.land/x/graphql_deno@v15.0.0/mod.ts";
import { destructureQueries } from './Browser/destructure.js';


export class Cache {
  constructor(
    initialCache = {
      ROOT_QUERY: {},
      ROOT_MUTATION: {},
    }
  ) {
    this.ROOT_QUERY = initialCache.ROOT_QUERY;
    this.ROOT_MUTATION = initialCache.ROOT_MUTATION;
  }

  // METHOD TO CONNECT TO CACHE
  async connect(port, policy, maxmemory) {
    this.redis = await connect({
      hostname: Deno.env.get('REDIS_HOST'),
      port: port,
    });
    console.log('connecting to redis');
    this.cacheClear();
    this.redis.configSet('maxmemory-policy', policy);
    this.redis.configSet('maxmemory', maxmemory);
  }

  // METHOD TO READ FROM REDIS CACHE & RESTRUCTURE THE DATA
  async read(queryStr) {
    // destructure the query string into an object
    const queries = destructureQueries(queryStr).queries;
    if (!queries) return;
    const responseObject = {};
    // iterate through each query in the input object
    for (const query in queries) {
      const queryHash = queries[query].name.concat(queries[query].arguments);
      if (this.ROOT_QUERY[queryHash]) {
        const hashArray = this.ROOT_QUERY[queryHash];
        const respObjProp = queries[query].alias ?? queries[query].name;
        // invoke populateAllHashes to add data object to the response object
        responseObject[respObjProp] = await this.populateAllHashes(hashArray, queries[query].fields);
        if (!responseObject[respObjProp]) return;
      } else {
        return null;
      }
    }
    return { data: responseObject };
  }

  populateAllHashes(allHashes, fields){
    if (!allHashes.length) return [];
    const tildeInd = allHashes[0].indexOf('~');
    const typeName = allHashes[0].slice(0, tildeInd);
    const reduction = allHashes.reduce(async (acc, hash) => {
      const readStr = await this.redis.get(hash);
      const readVal = await JSON.parse(readStr);
      if (!readVal) return;
      const dataObj = {};
      // iterate over the fields object to populate with data from cache
      for (const field in fields) {
        if (typeof fields[field] !== 'object') {
          if (field === '__typename') {
            dataObj[field] = typeName;
          } else {
            dataObj[field] = readVal[field] || 'n/a';
          }
        } else {
          // if the field from the input query is an array of hashes, recursively invoke
          dataObj[field] = await this.populateAllHashes(readVal[field], fields[field]);
          if (dataObj[field] === undefined) return;
        }
      }
      // at this point acc should be an array of response objects for each hash
      const resolvedProm = await Promise.resolve(acc);
      resolvedProm.push(dataObj);
      return resolvedProm;
    }, []);
    return reduction;
  };

  // METHOD TO WRITE TO REDIS CACHE 
  async write(queryStr, respObj, searchTerms, deleteFlag) {
    const hash = this.createQueryKey(queryStr);
    const array = Object.keys(respObj);
    // isolate type of of query - 'person,' 'book,' etc.
    const tildeInd = array[0].indexOf('~');
    const typeName = array[0].slice(0, tildeInd);
    // store the array of keys to ROOT_QUERY
    this.ROOT_QUERY[hash] = array;
    // write each item in the array to the cache
    for (let i = 0; i < array.length; i++) {
      await this.redis.set(array[i], JSON.stringify(respObj[array[i]]));
      // if using searchTerms, iterate throuogh those and also store each item
      // according to those terms in ROOT_QUERY
      if (searchTerms.length && queryStr.slice(8 , 11) === 'all') {
        searchTerms.forEach(el => {
          const elVal = respObj[array[i]][el].replaceAll(' ', '');
          const hashKey = `one${typeName}(${el}:"${elVal}")`
          if (!this.ROOT_QUERY[hashKey]) this.ROOT_QUERY[hashKey] = [];
          this.ROOT_QUERY[hashKey].push(array[i]);
        })
      }
    }
  }


  // CURRENTLY BEING UTILIZED BY invalidateCacheCheck.ts, WHICH IS A FILE THAT SHOULD BE REFACTORED IN FUTURE ITERATION
  cacheWriteObject = async (hash, obj) => {
    let entries = Object.entries(obj).flat();
    entries = entries.map((entry) => JSON.stringify(entry));
    // adding as nested strings? take out one layer for clarity.
    await this.redis.hset(hash, ...entries);
  };

  // CURRENTLY BEING UTILIZED BY invalidateCacheCheck.ts, WHICH IS A FILE THAT SHOULD BE REFACTORED IN FUTURE ITERATION
  cacheReadObject = async (hash, fields = []) => {
    // Checks for the fields requested, then queries cache for those specific keys in the hashes
    if (fields.length !== 0) {
      const fieldObj = {};
      for (const field of fields) {
        const rawCacheValue = await this.redisdb.hget(hash, JSON.stringify(field));
        fieldObj[field] = JSON.parse(rawCacheValue);
      }
      return fieldObj;
    } else {
      let objArray = await this.redisdb.hgetall(hash);
      if (objArray.length == 0) return undefined;
      let parsedArray = objArray.map((entry) => JSON.parse(entry));

      if (parsedArray.length % 2 !== 0) {
        return undefined;
      }
      let returnObj = {};
      for (let i = 0; i < parsedArray.length; i += 2) {
        returnObj[parsedArray[i]] = parsedArray[i + 1];
      }

      return returnObj;
    }
  };

  /*
  Creates a string to search the cache or add as a key in the cache.
  */
  createQueryKey(queryStr) {
    // traverses AST and gets object name, and any filter keys in the query
    const ast = gql(queryStr);
    const tableName = ast.definitions[0].selectionSet.selections[0].name.value;
    let queryKey = `${tableName}`;

    if (ast.definitions[0].operation === 'mutation') return queryKey;
    if (ast.definitions[0].selectionSet.selections[0].arguments.length) {
      const fieldsArray =
        ast.definitions[0].selectionSet.selections[0].arguments;
      const resultsObj = {};
      fieldsArray.forEach((el) => {
        const name = el.name.value;
        const value = el.value.value;
        resultsObj[name] = value;
      });

      let parens = '' // name:"Yoda"
      for (const key in resultsObj) {
        parens += `${key}:"${resultsObj[key]}"`;
      }
      queryKey = queryKey + '(' +  parens + ')';
    }
    return queryKey;
  }

  async cacheDelete(hash) {
    await this.redis.del(hash);
  }

  async cacheClear() {
    await this.redis.flushdb((err, successful) => {
      if (err) console.log('redis error', err);
      console.log(successful, 'clear');
    });
  }

  // functionality to stop polling
  stopPollInterval(interval) {
    clearInterval(interval);
  }
}
