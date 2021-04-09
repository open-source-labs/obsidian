/**
 * NOTES:
 * This file will test the read and write method on the Cache class functionality.
 */

import {Cache as Cache} from '../../src/CacheClassServer.js';
import { Rhum } from 'https://deno.land/x/rhum@v1.1.4/mod.ts';
import { test as testWrite} from '../test_variables/writeCache_variables.ts';
import { test as testRead } from '../test_variables/readCache_variables.ts';
import { connect } from 'https://deno.land/x/redis/mod.ts';

// set up a redis sever
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
      Rhum.testCase(
        'should not overwrite the fields in the original cache with the new fields if the fields are not the same',
        async () => {
          const cache = new Cache(testWrite.originalCache);
          await cache.write(testWrite.queryStrTwo, testWrite.respObj);
          Rhum.asserts.assertEquals(testWrite.originalCache, cache.storage);
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




