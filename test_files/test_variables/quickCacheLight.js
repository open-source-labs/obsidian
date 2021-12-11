// need redis v0.23.2 to be compatible with Rhum v.1.1.11 testing. That is why we need to separate quickCacheLight from quickCache.js
import { connect } from 'https://deno.land/x/redis@v0.23.2/mod.ts';

// set up a redis sever
let redis;
const context = 'server';

if (context === 'server') {
  redis = await connect({
    hostname: '127.0.0.1',
    port: 6379,
  });
}

export class Cache {
    constructor(
      initialCache = {
        ROOT_QUERY: {},
        ROOT_MUTATION: {},
      }
    ) {
      this.storage = initialCache;
      this.context = "server";
    }
  
    // set cache configurations
    async configSet(parameter, value) {
      return await redis.configSet(parameter, value);
    }
  
    // Main functionality methods
    // for reading the inital query
    async read(queryStr) {
      console.log('in the read func');
      //the queryStr it gets is the JSON stringified
      const returnedValue = await this.cacheRead(queryStr);
      console.log('returnedValue -> ', returnedValue)
  
      if (("returnedValue", returnedValue)) {
        return JSON.parse(returnedValue);
      } else {
        return undefined;
      }
    }
    async write(queryStr, respObj) {
      // update the original cache with same reference
      await this.cacheWrite(queryStr, JSON.stringify(respObj));
    }
  
    //will overwrite a list at the given hash by default
    //if you pass a false value to overwrite, it will append the list items to the end
  
    //Probably be used in normalize
    cacheWriteList = async (hash, array, overwrite = true) => {
      if (overwrite) {
        await redis.del(hash);
      }
      array = array.map((element) => JSON.stringify(element));
      await redis.rpush(hash, ...array);
    };
  
    cacheReadList = async (hash) => {
      let cachedArray = await redis.lrange(hash, 0, -1);
      cachedArray = cachedArray.map((element) => JSON.parse(element));
  
      return cachedArray;
    };
  
    cacheWriteObject = async (hash, obj) => {
      let entries = Object.entries(obj).flat();
      entries = entries.map((entry) => JSON.stringify(entry));
  
      await redis.hset(hash, ...entries);
    };
  
    cacheReadObject = async (hash, field) => {
      if (field) {
        let returnValue = await redis.hget(hash, JSON.stringify(field));
  
        if (returnValue === undefined) return undefined;
        return JSON.parse(returnValue);
      } else {
        let objArray = await redis.hgetall(hash);
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
  
    async cacheRead(hash) {
      console.log('in the cacheRead func');
      console.log('context: ', context);
      console.log('hash: ', hash);
  
      if (this.context === "client") {
        return this.storage[hash];
      } else {
        console.log('In the else block...')
        if (hash === "ROOT_QUERY" || hash === "ROOT_MUTATION") {
          const hasRootQuery = await redis.get("ROOT_QUERY");
          
          if (!hasRootQuery) {
            await redis.set("ROOT_QUERY", JSON.stringify({}));
          }
          const hasRootMutation = await redis.get("ROOT_MUTATION");
  
          if (!hasRootMutation) {
            await redis.set("ROOT_MUTATION", JSON.stringify({}));
          }
        }
        let hashedQuery = await redis.get(hash);
        console.log('Response from redis -> ', hashedQuery)
  
        if (hashedQuery === undefined) return undefined;
        return JSON.parse(hashedQuery);
      }
    }
    async cacheWrite(hash, value) {
      // writes value to object cache or JSON.stringified value to redis cache
      if (this.context === "client") {
        this.storage[hash] = value;
      } else {
        value = JSON.stringify(value);
        await redis.setex(hash, 6000, value);
        let hashedQuery = await redis.get(hash);
      }
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
      if (this.context === "client") {
        delete this.storage[hash];
      } else await redis.del(hash);
    }
    async cacheClear() {
      // erases either object cache or redis cache
      if (this.context === "client") {
        this.storage = { ROOT_QUERY: {}, ROOT_MUTATION: {} };
      } else {
        await redis.flushdb((err, successful) => {
          if (err) console.log("redis error", err);
          console.log(successful, "clear");
        });
        await redis.set("ROOT_QUERY", JSON.stringify({}));
        await redis.set("ROOT_MUTATION", JSON.stringify({}));
      }
    }
  
    // functionality to stop polling
    stopPollInterval(interval) {
      clearInterval(interval);
    }
  }