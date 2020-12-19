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
  read(qryStr) {
    // readCache; returns gql response object || undefined
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
  cacheClear(hash) {
    // erases either object cache or redis cache
    if (this.context === 'client') {
      this.storage = {};
    } else {
      throw Error('Redis functionality has not been implemented');
    }
  }
}
