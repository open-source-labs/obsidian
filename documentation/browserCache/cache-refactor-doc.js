/**
 * GOALS
 * 1. refactor all cache related functionality as methods on Cache object
 * 2. Create a one source of truth for the naming of those different methods and defining their agruments, return, other functionality
 * 3. Create a template for refactoring our cache interaction so that it will work for both redis cache and the object cache
 *
 */

// CLIENT-SIDE OBJECT CACHE VS SERVER-SIDE REDIS CACHE
/**
 * NOTES:
 * 1. Any direct reads/writes of the cache will be replaced with the cacheRead and cacheWrite methods.
 * 2. These methods will be dual purpose functions that will read and write key value pairs from the client/side Cache
 * 3. Both will first have a check to see if we are in the client side cache or server side cache
 * 4. Client-Side: will read/write to cache.storage via normal object lookup/assignment
 * 5. Server-Side: will read/write to redis a JSON.stringified version of the value using redis methods
 * 6. See Obsidian 1.0's dbOps for reference/inspiration
 * 7. Reading or writing to the Root_Query or Root_Mutation will now be a 2 part process via cacheRead, cacheWrite:
 *    first retrieving the entire ROOT_QUERY object from the cache and then reading values from that object.
 * 8. We can no longer pass the cache in as an argument, clone the cache or update the cache with Object.assign
 *
 */

// Cache constructor

class Cache {
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
  read(qryStr) {
    // readCache; returns gql response object || undefined
  }
  write(qryStr, respObj) {
    // writeCache; updates cache with all data from response object
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
  cacheClear(hash) {
    // erases either object cache or redis cache
    if (this.context === 'client') {
      this.storage = {};
    } else {
      throw Error('Redis functionality has not been implemented');
    }
  }
}

/**
 * OPEN QUESTIONS
 * (We think no) 1. Do we need any more than two functions for cache read/write.  why does Obsidian 1.0 have 4???
 * (yes, maybe) 2. Can we utilize helper methods in our main methods (will we have to worry about binding context?)
 * (could maybe explore 2020) 3. We will be exposing all these methods, when we probably only want to expose some to the devleloper. Is this an issue?
 * 4. Will we run into any issues with live incremental updates of the cache object (always the same reference)?
 *    (how will React know the cache has been updated?)
 *
 */
