/**
 * NOTES:
 * 1.This file will test the write method on the Cache class functionality:
 * Should return the new updated cache when the cache was successfully updated with the same reference to the original cache
// Should return the string 'Cache update' when the cache was successfully updated.
 * Should update the original cache with the new fields and queries.
 * Should not overwrite the fields in the original cache with the new fields if the fields are not the same
 * Should test capacity 
 */

import LFUCache from '../../src/Browser/lfuBrowserCache.js';
import { Rhum } from 'https://deno.land/x/rhum@v1.1.11/mod.ts';
import { test } from '../test_variables/lfuBrowserCache_variables.ts';
import normalizeResult from '../../src/Browser/normalize.js';

Rhum.testPlan('LFU Browser Cache Testing', () => {
  Rhum.testSuite('write/read nested data object', () => {
    Rhum.testCase(
      'should store a nested data object into LFUCache and read the stored un-nested data objects by calling their hashes',
      async () => {
        const cache = new LFUCache(10);
        await cache.write(test.nestedObj.queryStr, test.nestedObj.respObj);
        for (let key of Object.keys(test.nestedObj.expectedCache)) {
          await Rhum.asserts.assertEquals(
            cache.get(key),
            test.nestedObj.expectedCache[key]
          );
        }
      }
    );
  });
  Rhum.testSuite('LFU cache evict the proper items', () => {
    Rhum.testCase(
      'should remove the least frequently used item from cache',
      async () => {
        const cache = new LFUCache(5);
        await cache.write(test.LFUObj.queryStr1, test.LFUObj.respObj1);
        await Rhum.asserts.assertEquals(
          cache.get('Actor~1'),
          test.LFUObj.expectedCache1['Actor~1']
        );
        await cache.get('Actor~2');
        await cache.get('Actor~3');
        await cache.get('Actor~4');
        await cache.get('Actor~5');
        await cache.write(test.LFUObj.queryStr2, test.LFUObj.respObj2);
        Rhum.asserts.assertEquals(cache.get('Actor~1'), undefined);
      }
    );
  });
});

Rhum.run();
// TO RUN TEST: deno test test_files/rhum_test_files/lfuBrowserCache_test.ts --allow-env
