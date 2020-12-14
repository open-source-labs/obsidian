/**
 * NOTES:
 * 1.This file will test readCache functionality:
 * Should return an object if all values are in the cache.
 * Should return undefined if any field is missing value  in the cache.
 * Should accept multiple queries in one query operation.
 * 2. This file will test populateAllTypes functionality:
 * Should return an array if all fields are found.
 * Should return undefined if any field is missing value.
 * Reviews:
 * Change comments for what we are testing
 * Adding a file that contains all the variables for the test suite readCache
 */

import { writeCache } from '../../src/writeCache.js';
import { Rhum } from 'https://deno.land/x/rhum@v1.1.4/mod.ts';
import { test } from '../test_variables/writeCache_variables.ts';

Rhum.testPlan('writeCache.js', () => {
  Rhum.testSuite('creatCache()', () => {
    Rhum.testCase(
      'should update the original cache with the new fields and queries',
      () => {
        writeCache(test.toAddInCache, test.originalCache);
        Rhum.asserts.assertEquals(test.originalCache, test.expectedResultCache);
      }
    );
  });
});
// deno test test_files/rhum_test_files/writeCache_test.ts --allow-env
Rhum.run();
