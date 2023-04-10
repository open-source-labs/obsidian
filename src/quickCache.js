/** @format */

import 'https://deno.land/x/dotenv/load.ts';
import { connect } from 'https://deno.land/x/redis/mod.ts';
import { gql } from 'https://deno.land/x/oak_graphql/mod.ts';
import { print, visit } from 'https://deno.land/x/graphql_deno/mod.ts';
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

  async populateAllHashes(allHashes, fields){
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

  async write(queryStr, respObj, searchTerms, deleteFlag) {
    const hash = this.createQueryKey(queryStr);
    const array = Object.keys(respObj);
    const tildeInd = array[0].indexOf('~');
    const typeName = array[0].slice(0, tildeInd);
    this.ROOT_QUERY[hash] = array;
    for (let i = 0; i < array.length; i++) {
      await this.redis.set(array[i], JSON.stringify(respObj[array[i]]));
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


  //will overwrite a list at the given hash by default
  //if you pass a false value to overwrite, it will append the list items to the end

  //Probably be used in normalize
  cacheWriteList = async (hash, array, overwrite = true) => {
    if (overwrite) {
      await this.redis.del(hash);
    }
    array = array.map((element) => JSON.stringify(element));
    await this.redis.rpush(hash, ...array);
  };

  cacheReadList = async (hash) => {
    let cachedArray = await this.redis.lrange(hash, 0, -1);
    cachedArray = cachedArray.map((element) => JSON.parse(element));

    return cachedArray;
  };

  cacheWriteObject = async (hash, obj) => {
    let entries = Object.entries(obj).flat();
    entries = entries.map((entry) => JSON.stringify(entry));
    // adding as nested strings? take out one layer for clarity.
    await this.redis.hset(hash, ...entries);
  };

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

  createBigHash(inputfromQuery) {
    let ast = gql(inputfromQuery);

    let returned = visit(ast, { enter: print(ast) });
    let finalReturn = print(returned);
    return JSON.stringify(finalReturn);
  }

  async cacheRead(queryStr) {
    if (queryStr === 'ROOT_QUERY' || queryStr === 'ROOT_MUTATION') {
      const hasRootQuery = await this.redis.get('ROOT_QUERY');

      if (!hasRootQuery) {
        await this.redis.set('ROOT_QUERY', JSON.stringify({}));
      }
      const hasRootMutation = await this.redis.get('ROOT_MUTATION');

      if (!hasRootMutation) {
        await this.redis.set('ROOT_MUTATION', JSON.stringify({}));
      }
    }
    // use cacheQueryKey to create a key with object name and inputs to save in cache
    const queryKey = this.createQueryKey(queryStr);
    const cacheResponse = await this.redis.hget('ROOT_QUERY', queryKey);

    if (!cacheResponse === undefined) return;
    return JSON.parse(cacheResponse);
    // }
  }

  /*
  Creates a string to search the cache or add as a key in the cache.
  If GraphQL query string is query{plants(input:{maintenance:"Low"}) name id ...}
  returned queryKey will be plants:maintenance:Low
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
      for (let key in resultsObj) {
        parens += `${key}:"${resultsObj[key]}"`;
      }
      queryKey = queryKey + '(' +  parens + ')';
    }
    return queryKey;
  }


  async cacheWrite(hash, value) {
    value = JSON.stringify(value);
    await redis.hset('ROOT_QUERY', hash, value);
  }

  async cacheWriteList(hash, array) {
    await redis.rpush(hash, ...array);
  }

  async cacheReadList(hash) {
    let cachedArray = await redis.lrange(hash, 0, -1);
    return cachedArray;
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
