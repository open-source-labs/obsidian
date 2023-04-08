/** @format */

import 'https://deno.land/x/dotenv/load.ts';
import { connect } from 'https://deno.land/x/redis/mod.ts';
import { gql } from 'https://deno.land/x/oak_graphql/mod.ts';
import { print, visit } from 'https://deno.land/x/graphql_deno/mod.ts';
import { destructureQueries } from './Browser/destructure.js';

//this is being exported so we can flush db in invalidateCacheCheck

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

  // // Main functionality methods below
  // // for reading the inital query
  // async read(queryStr) {
  //   //the queryStr it gets is the JSON stringified
  //   const returnedValue = await this.cacheRead(queryStr);

  //   if (('returnedValue', returnedValue)) {
  //     return JSON.parse(returnedValue);
  //   } else {
  //     return undefined;
  //   }
  // }

  async read(queryStr) {
    // destructure the query string into an object
    console.log('queryStr in read method is: ', queryStr);
    const queries = destructureQueries(queryStr).queries;
    console.log('destructured queries are: ', queries);
    if (!queries) return;
    const responseObject = {};
    console.log('ROOT_QUERY currently is: ', this.ROOT_QUERY);
    // iterate through each query in the input object
    for (const query in queries) {
      const queryHash = queries[query].name.concat(queries[query].arguments);
      console.log('query hash being looked for in ROOT_QUERY: ', queryHash);
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
    console.log('fields in populateAllHashes: ', fields);
    console.log('all hashes populateAllHashes: ', allHashes);
    const reduction = allHashes.reduce(async (acc, hash) => {
      // console.log('Hash we are finding a value for is: ', hash);
      const readStr = await this.redis.get(hash);
      console.log('string from redis is: ', readStr);
      const readVal = await JSON.parse(readStr);
      console.log('readval after get and json is :', readVal);
      if (!readVal) return;
      const dataObj = {};
      // iterate over the fields object to populate with data from cache
      for (const field in fields) {
        // console.log('readVal at ', field, ' is: ', readVal[field]);
        if (typeof fields[field] !== 'object') {
          if (field === '__typename') {
            dataObj[field] = typeName;
          } else {
            console.log(field, ' of dataObj being set to', readVal[field]);
            dataObj[field] = readVal[field] || 'n/a';
          }
        } else {
          // if the field from the input query is an array of hashes, recursively invoke
          console.log('hitting recursive populateAllHashes for ', fields[field]);
          dataObj[field] = await this.populateAllHashes(readVal[field], fields[field]);
          if (dataObj[field] === undefined) return;
        }
      }
      // at this point acc should be an array of response objects for each hash
      // console.log('acc is: ', acc);
      const resolvedProm = await Promise.resolve(acc);
      // console.log('resolvedProm is: ', resolvedProm);
      resolvedProm.push(dataObj);
      console.log(dataObj.name, ' has been added to the accumulator');
      return resolvedProm;
    }, []);
    return reduction;
  };

  async write(queryStr, respObj, searchTerms, deleteFlag) {
    // console.log('in cache.write queryStr is ', queryStr);
    // console.log('in cache.write respObj is ', respObj);
    const hash = this.createQueryKey(queryStr);
    // console.log('hash after createQueryKey is: ', hash)
    const array = Object.keys(respObj);
    const tildeInd = array[0].indexOf('~');
    const typeName = array[0].slice(0, tildeInd);
    // console.log ('array of respObj keys is: ', array);
    this.ROOT_QUERY[hash] = array;
    console.log('array is :', array);
    for (let i = 0; i < array.length; i++) {
      // console.log('respObj[key] about to be written is ', respObj[array[i]])
      await this.redis.set(array[i], JSON.stringify(respObj[array[i]]));
      console.log('searchTerms are: ', searchTerms);
      if (searchTerms.length && queryStr.slice(8 , 11) === 'all') {
        console.log('array[i] is: ', array[i]);
        searchTerms.forEach(el => {
          const elVal = respObj[array[i]][el].replaceAll(' ', '');
          console.log(el, 'elVal is: ', elVal);
          const hashKey = `one${typeName}(${el}:"${elVal}")`
          console.log('hash key is: ', hashKey);
          if (!this.ROOT_QUERY[hashKey]) this.ROOT_QUERY[hashKey] = [];
          this.ROOT_QUERY[hashKey].push(array[i]);
        })
      }
    }
  }

  // async write(queryStr, respObj, deleteFlag) {
  //   // update the original cache with same reference
  //   const cacheHash = this.createQueryKey(queryStr);
  //   await this.cacheWrite(cacheHash, JSON.stringify(respObj));
  // }

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
    // if (this.context === 'client') {
    //   return this.storage[queryStr];
    // } else {
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
    console.log('hello from before quickcache cache createQueryKey');
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
    // console.log('hello from inside quickcache cache createQueryKey');
    // traverses AST and gets object name, and any filter keys in the query
    const ast = gql(queryStr);
    // console.log('ast.definitions[0].selectionSet.selections[0].selectionSet.selections is ', ast.definitions[0].selectionSet.selections[0].selectionSet.selections);
    const tableName = ast.definitions[0].selectionSet.selections[0].name.value;
    // console.log('tableName is ', tableName);
    let queryKey = `${tableName}`;

    // console.log('ast.definitions[0].selectionSet.selections[0].arguments is ', ast.definitions[0].selectionSet.selections[0].arguments);
    if (ast.definitions[0].operation === 'mutation') return queryKey;
    if (ast.definitions[0].selectionSet.selections[0].arguments.length) {
      const fieldsArray =
        //ast.definitions[0].selectionSet.selections[0].selectionSet.selections
        ast.definitions[0].selectionSet.selections[0].arguments; // THIS DOESNT EXIST
      // console.log('fieldsArray is ', fieldsArray);
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
    // console.log('this is queryKey retrieved from queryStr', queryKey)
    return queryKey;
  }


  async cacheWrite(hash, value) {
    // writes value to object cache or JSON.stringified value to redis cache
    // if (this.context === 'client') {
    //   this.storage[hash] = value;
    // } else {
    value = JSON.stringify(value);
    await redis.hset('ROOT_QUERY', hash, value);
    // }
  }

  async cacheWriteList(hash, array) {
    await redis.rpush(hash, ...array);
  }

  async cacheReadList(hash) {
    let cachedArray = await redis.lrange(hash, 0, -1);
    return cachedArray;
  }

  async cacheDelete(hash) {
    // deletes the hash/value pair on either object cache or redis cache
    // if (this.context === 'client') {
    //   delete this.storage[hash];
    // } else 
    await this.redis.del(hash);
  }

  async cacheClear() {
    // erases either object cache or redis cache
    // if (this.context === 'client') {
    //   this.storage = { ROOT_QUERY: {}, ROOT_MUTATION: {} };
    // } else {
    await this.redis.flushdb((err, successful) => {
      if (err) console.log('redis error', err);
      console.log(successful, 'clear');
    });
    // await redis.hset('ROOT_QUERY', 'blank', JSON.stringify({}));
    // await redis.set('ROOT_MUTATION', 'blank', JSON.stringify({}));
  }

  // functionality to stop polling
  stopPollInterval(interval) {
    clearInterval(interval);
  }
}
