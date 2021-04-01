/**
 * NOTES:
 * 1.This file will test the write method on the Cache class functionality:
 * Should return the new updated cache when the cache was successfully updated with the same reference to the original cache
// Should return the string 'Cache update' when the cache was successfully updated.
 * Should update the original cache with the new fields and queries.
 * Should not overwrite the fields in the original cache with the new fields if the fields are not the same
 *
 */


import {Cache as Cache} from '../../src/CacheClassServer.js';
import { Rhum } from 'https://deno.land/x/rhum@v1.1.4/mod.ts';
import { test as testWrite} from '../test_variables/writeCache_variables.ts';
import { test as testRead } from '../test_variables/readCache_variables.ts';
import { connect } from 'https://denopkg.com/keroxp/deno-redis/mod.ts';


let redis;
const context = 'server';

if (context === 'server') {
  redis = await connect({
    hostname: "localhost",
    port: 6379,
  });
}

Rhum.testPlan('Write to Cache class', () => {
    Rhum.testSuite('write()', () => {
        Rhum.testCase(
            'Should write to redis cache',
            async () => {
              const cache = new Cache(testWrite.originalCache);
              await cache.write(testWrite.queryStr, testWrite.respObj);
              Rhum.asserts.assertEquals(cache.storage, testWrite.originalCache);
            }
      );
    });

    Rhum.testSuite('read()', () => {
      Rhum.testCase(
        'should return a graphql response object if all required values are found in the cache',
        async () => {
            const cache = new Cache(testRead.cache);
            const result = await cache.read(testRead.singularInputQuery);
            Rhum.asserts.assertEquals(result, testRead.singularQueryResObj);
           
        }
    );
});

  
  
 
  

});

Rhum.run();

// Write to cache,
    // use our cache writing function from CacheClassServer.js and check using the redis get fuction


// Read to cache,

// Obsidan will refetch a data point that has been deleted from the redis 
    // has has to be in the root query
    // data can not be in the redis hash