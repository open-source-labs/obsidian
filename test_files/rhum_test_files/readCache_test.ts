/**
 * NOTES:
 * 1.This file will test readCache functionalities:
 * Should return a graphql response object if all required values are found in the cache.
 * Should return undefined if any field is missing value  in the cache.
 * Should accept multiple queries in one query operation.
 * 2. This file will test populateAllHashes functionalities:
 * Should return undefined if any field is missing from the cache.
 * Should return an array of field objects if all the elements are found in the cache.
 */

import { Cache } from '../../src/CacheClass.js';
import { Rhum } from 'https://deno.land/x/rhum@v1.1.4/mod.ts';
import { test } from '../test_variables/readCache_variables.ts';

Rhum.testPlan('read method on Cache class', () => {
  Rhum.testSuite('read()', () => {
    Rhum.testCase(
      'should return a graphql response object if all required values are found in the cache',
      () => {
        const cache = new Cache(test.cache);
        const result = cache.read(test.singularInputQuery);
        Rhum.asserts.assertEquals(result, test.singularQueryResObj);
      }
    );
    Rhum.testCase(
      'should return undefined if any field is missing a value in the cache',
      () => {
        const cache = new Cache(test.cache);
        const result = cache.read(test.undefinedInputQuery);
        Rhum.asserts.assertEquals(result, undefined);
      }
    );
    Rhum.testCase(
      'should accept multiple queries in one query operation',
      () => {
        const cache = new Cache(test.cache);
        const result = cache.read(test.multipleInputQuery);
        Rhum.asserts.assertEquals(result, test.multipleQueriesResObj);
      }
    );
  });

  Rhum.testSuite('populateAllHashes()', () => {
    Rhum.testCase(
      'should return undefined if any field is missing from the cache',
      () => {
        const cache = new Cache(test.cache);
        const result = cache.populateAllHashes('Actor~1', test.fieldsUndefined);
        Rhum.asserts.assertEquals(result, undefined);
      }
    );
    Rhum.testCase(
      'should return an array of field objects if all the elements are found in the cache',
      () => {
        const cache = new Cache(test.cache);
        const result = cache.populateAllHashes('Actor~1', test.fieldsComplete);
        Rhum.asserts.assertEquals(result, {
          __typename: 'Actor',
          id: '1',
          firstName: 'Harrison',
        });
      }
    );
  });
});
Rhum.run();
// TO RUN TEST: deno test test_files/rhum_test_files/readCache_test.ts --allow-env
