import normalizeResult from './normalize.js';
import destructureQueries from './destructure.js';
import 'https://deno.land/x/dotenv/load.ts';
import { connect } from 'https://denopkg.com/keroxp/deno-redis/mod.ts';

let redis;
const context = window.Deno ? 'server' : 'client';

if (context === 'server') {
  redis = await connect({
    hostname: Deno.env.get('REDIS_HOST'),
    port: 6379,
  });
}

console.log(await redis.ping());

export class Cache {
  constructor(
    // initialCache = {
    //   ROOT_QUERY: {},
    //   ROOT_MUTATION: {},
    // }
    initialCache = {
      ROOT_QUERY: {
        'actor(id:1)': 'Actor~1',
        movies: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~4'],
        actors: ['Actor~1', 'Actor~2', 'Actor~3', 'Actor~4', 'Actor~6'],
        'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~4', 'Movie~5'],
      },
      ROOT_MUTATION: {},
      'Movie~1': {
        id: '1',
        title: 'Indiana Jones and the Last Crusade',
        actors: ['Actor~1', 'Actor~2', 'Actor~6', 'Actor~7'],
        genre: 'ACTION',
        releaseYear: 1989,
      },
      'Movie~2': {
        id: '2',
        title: 'Empire Strikes Back',
        actors: ['Actor~1', 'Actor~3'],
        releaseYear: 1980,
      },
      'Movie~3': {
        id: '3',
        title: 'Witness',
        actors: ['Actor~1', 'Actor~4'],
        releaseYear: 1985,
      },
      'Movie~4': {
        id: '4',
        title: 'Air Force One',
        actors: ['Actor~1', 'Actor~5'],
        genre: 'ACTION',
        releaseYear: 1997,
      },
      'Movie~5': 'DELETED',
      'Actor~1': { id: '1', firstName: 'Harrison' },
      'Actor~2': { id: '2', firstName: 'Sean' },
      'Actor~3': { id: '3', firstName: 'Mark' },
      'Actor~4': { id: '4', firstName: 'Patti' },
      'Actor~5': { id: '5', firstName: 'Gary' },
      'Actor~6': 'DELETED',
      'Actor~7': { id: '7', firstName: 'Christy' }
    }
  ) {
    this.storage = initialCache;
    this.context = window.Deno ? 'server' : 'client';
  }

  insertIntoRedis() {
    // console.log('i am called');
    for (let key in this.storage) {
      redis.set(key, JSON.stringify(this.storage[key]));
    }
  }

  pullOutCache() {
    
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
    const badHashes = getBadHashes();
    const goodHashes = rootQueryCleaner(badHashes);
    const goodHashes2 = getGoodHashes(badHashes, goodHashes);
    removeInaccessibleHashes(badHashes, goodHashes2);
  }

  // remove hashes that are flagged for deletion and store records of them in a set badHashes for removal inside root queries
  getBadHashes() {
    const badHashes = new Set();
    for (let key in this.storage) {
      if (key === 'ROOT_QUERY' || key === 'ROOT_MUTATION') continue;
      if (this.storage[key] === 'DELETED') {
        badHashes.add(key);
        delete this.storage[key];
      }
    }
    return badHashes;
  }

  // go through root queries, remove all instances of bad hashes, add remaining hashes into goodHashes set
  rootQueryCleaner(badHashes) {
    const goodHashes = new Set();
      const rootQuery = this.storage['ROOT_QUERY'];
      for (let key in rootQuery) {
        if (Array.isArray(rootQuery[key])) {
          rootQuery[key] = rootQuery[key].filter(x => !badHashes.has(x));
          if (rootQuery[key].length === 0) delete rootQuery[key];
          for (let el of rootQuery[key]) goodHashes.add(el);
        } else (badHashes.has(rootQuery[key])) ? delete rootQuery[key] : goodHashes.add(rootQuery[key]);
      }
      return goodHashes;
    }

  // Go through the cache, check good hashes for any nested hashes and add them to goodHashes set
  getGoodHashes(badHashes, goodHashes) {
      for (let key in this.storage) {
        if (key === 'ROOT_QUERY' || key === 'ROOT_MUTATION') continue;
        for (let i in this.storage[key]) {
          if (Array.isArray(this.storage[key][i])) {
            for (let el of this.storage[key][i]) {
              if (el.includes('~') && !badHashes.has(el)) {
                goodHashes.add(el);
              }
            }
          } else if (typeof this.storage[key][i] === 'string') {
            if (this.storage[key][i].includes('~') && !badHashes.has(this.storage[key][i])) {
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
        if (key === 'ROOT_QUERY' || key === 'ROOT_MUTATION') continue;
        if (!goodHashes.has(key)) delete this.storage[key];
        for (let i in this.storage[key]) {
          if (Array.isArray(this.storage[key][i])) {
            this.storage[key][i] = this.storage[key][i].filter(x => !badHashes.has(x));
          } else if (typeof this.storage[key][i] === 'string') {
            if (this.storage[key][i].includes('~') && badHashes.has(this.storage[key][i])) {
              delete this.storage[key][i];
            }
          }
        }
      }
    }

  // cache read/write helper methods
  async cacheRead(hash) {
    // returns value from either object cache or   cache || 'DELETED' || undefined
    if (this.context === 'client') {
      return this.storage[hash];
    } else {
      // logic to replace these storage keys if they have expired
      if (hash === 'ROOT_QUERY' || hash === 'ROOT_MUTATION') {
        const hasRootQuery = await redis.get('ROOT_QUERY');
        if (!hasRootQuery) {
          await redis.set('ROOT_QUERY', JSON.stringify({}));
        }
        const hasRootMutation = await redis.get('ROOT_MUTATION');
        if (!hasRootMutation) {
          await redis.set('ROOT_MUTATION', JSON.stringify({}));
        }
      }
      let hashedQuery = await redis.get(hash);
      // if cacheRead is a miss
      if (hashedQuery === undefined) return undefined;
      return JSON.parse(hashedQuery);
    }
  }
  async cacheWrite(hash, value) {
    // writes value to object cache or JSON.stringified value to redis cache
    if (this.context === 'client') {
      this.storage[hash] = value;
    } else {
      value = JSON.stringify(value);
      await redis.setex(hash, 6000, value);
      let hashedQuery = await redis.get(hash);
    }
  }
  async cacheDelete(hash) {
    // deletes the hash/value pair on either object cache or redis cache
    if (this.context === 'client') {
      delete this.storage[hash];
    } else await redis.del(hash);
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
      await redis.set('ROOT_MUTATION', JSON.stringify({}));
    }
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
        // return undefine if hash has been garbage collected
        if (readVal === undefined) return undefined
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
        // acc is an array within a Response object for each hash
        try{
          const resolvedProm = await Promise.resolve(acc)
          resolvedProm.push(dataObj);
          return resolvedProm;
        } catch (error){
          return undefined
        }
      
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