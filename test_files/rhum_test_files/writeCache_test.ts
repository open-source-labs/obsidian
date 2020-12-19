/**
 * NOTES:
 * 1.This file will test writeCache functionality:
 * Should return the new updated cache when the cache was successfully updated with the same reference to the original cache
// Should return the string 'Cache update' when the cache was successfully updated.
 * Should update the original cache with the new fields and queries.
 * Should not overwrite the fields in the original cache with the new fields if the fields are not the same
 *
 */

import { writeCache } from '../../src/writeCache.js';
import { Rhum } from 'https://deno.land/x/rhum@v1.1.4/mod.ts';
import { test } from '../test_variables/writeCache_variables.ts';

Rhum.testPlan('writeCache.js', () => {
  Rhum.testSuite('writeCache()', () => {
    Rhum.testCase(
      'should return the new updated cache when the cache was successfully updated with the same reference to the original cache',
      () => {
        const result = writeCache(
          test.queryObj,
          test.resultObj,
          test.originalCache
        );
        Rhum.asserts.assertEquals(result, test.originalCache);
      }
    );
    // Rhum.testCase(
    //   'should return the string "Cache Updated" when the cache was successfully updated',
    //   () => {
    //     const result = writeCache(
    //       test.queryObj,
    //       test.resultObj,
    //       test.originalCache
    //     );
    //     Rhum.asserts.assertEquals(result, 'Cache Updated');
    //   }
    // );
    Rhum.testCase(
      'should update the original cache with the new fields and queries',
      () => {
        const result = writeCache(
          test.queryObj,
          test.resultObj,
          test.originalCache
        );
        Rhum.asserts.assertEquals(result, test.expectedResultCache);
      }
    );
    Rhum.testCase(
      'should not overwrite the fields in the original cache with the new fields if the fields are not the same',
      () => {
        const result = writeCache(
          test.queryObj,
          test.resultObj,
          test.originalCache
        );
        Rhum.asserts.assertEquals(result, test.expectedResultCache);
      }
    );
  });
});
Rhum.run();
// TO RUN TEST: deno test test_files/rhum_test_files/writeCache_test.ts --allow-env
