/**
 * NOTES:
 * 1.This file will test readCache functionalities:
 * Should return an object if all values are in the cache.
 * Should return undefined if any field is missing value  in the cache.
 * Should accept multiple queries in one query operation.
 * 2. This file will test populateAllTypes functionalities:
 * Should return an array if all fields are found.
 * Should return undefined if any field is missing value.
 */

import { readCache, populateAllTypes } from '../../src/readCache.js';
import { Rhum } from 'https://deno.land/x/rhum@v1.1.4/mod.ts';
import { test } from '../test_variables/readCache_variables.ts';

Rhum.testPlan('readCache.js', () => {
  Rhum.testSuite('readCache()', () => {
    Rhum.testCase(
      'should return an object if all required values are found in the cache',
      () => {
        const result = readCache(test.singularInputQuery, test.cache);
        Rhum.asserts.assertEquals(result, test.singularQueryResObj);
      }
    );
    Rhum.testCase(
      'should return undefined if any field is missing a value in the cache',
      () => {
        const result = readCache(test.undefinedInputQuery, test.cache);
        Rhum.asserts.assertEquals(result, undefined);
      }
    );
    Rhum.testCase(
      'should accept multiple queries in one query operation',
      () => {
        const result = readCache(test.multipleInputQuery, test.cache);
        Rhum.asserts.assertEquals(result, test.multipleQueriesResObj);
      }
    );
  });

  Rhum.testSuite('populateAllTypes()', () => {
    Rhum.testCase(
      'should return undefined if any field is missing from the cache',
      () => {
        const result = populateAllTypes(
          'Actor~1',
          test.cache,
          test.fieldsUndefined
        );
        Rhum.asserts.assertEquals(result, undefined);
      }
    );
    Rhum.testCase(
      'should return an array of objects with all the fields found in the cache corresponding to the query',
      () => {
        const result = populateAllTypes(
          'Actor~1',
          test.cache,
          test.fieldsComplete
        );
        Rhum.asserts.assertEquals(result, [
          { __typename: 'Actor', id: '1', firstName: 'Harrison' },
        ]);
      }
    );
  });
});
Rhum.run();
