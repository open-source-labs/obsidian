/**
 * NOTES:
 * 1.This file will test the write method on the Cache class functionality:
 * Should return the new updated cache when the cache was successfully updated with the same reference to the original cache
// Should return the string 'Cache update' when the cache was successfully updated.
 * Should update the original cache with the new fields and queries.
 * Should not overwrite the fields in the original cache with the new fields if the fields are not the same
 *
 */

import Cache from '../../src/CacheClassBrowser.js';
import {Cache as CacheServer} from '../../src/CacheClassServer.js';
import { Rhum } from 'https://deno.land/x/rhum@v1.1.4/mod.ts';
import { test } from '../test_variables/writeCache_variables.ts';

Rhum.testPlan('write method on Cache class', () => {
  Rhum.testSuite('write', () => {
    Rhum.testCase(
      'should return the new updated cache when the cache was successfully updated with the same reference to the original cache',
      () => {
        const cache = new Cache(test.originalCache);
        cache.write(test.queryStr, test.respObj);
        Rhum.asserts.assertEquals(cache.storage, test.originalCache);
      }
    );
    Rhum.testCase(
      'should update the original cache with the new fields and queries',
      () => {
        const cache = new Cache(test.originalCache);
        cache.write(test.queryStr, test.respObj);
        Rhum.asserts.assertEquals(cache.storage, test.expectedResultCache);
      }
    );
    Rhum.testCase(
      'should not overwrite the fields in the original cache with the new fields if the fields are not the same',
      () => {
        const cache = new Cache(test.originalCache);
        cache.write(test.queryStrTwo, test.respObj);
        Rhum.asserts.assertEquals(test.originalCache, cache.storage);
      }
    )
    // Rhum.testCase(
    //   'alias test case',
    //   async () => {   
    //     const cache = new CacheServer(test.originalCache);
    //     await cache.write(test.aliasQuery, test.aliasResponse);
    //     await console.log(cache.storage);
    //     Rhum.asserts.assertEquals(cache.storage, test.originalCache);
    //   }
    // );
  });
});
Rhum.run();
// TO RUN TEST: deno test test_files/rhum_test_files/writeCache_test.ts --allow-env
