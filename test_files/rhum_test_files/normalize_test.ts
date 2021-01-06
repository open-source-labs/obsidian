import { Rhum } from 'https://deno.land/x/rhum@v1.1.4/mod.ts';
import normalizeResult from '../../src/normalize.js';
import { test } from '../test_variables/normalize_variables.ts';

Rhum.testPlan('app_test.ts', () => {
  Rhum.testSuite('normalizeTestSuite', () => {
    Rhum.testCase(
      'expected result to equal object with ROOT_QUERY and hash:value pairs',
      async () => {
        const result = normalizeResult(test.queryObject1, test.resultObject1);
        Rhum.asserts.assertEquals(result, test.resultObj1);
      }
    );
    Rhum.testCase('normalizeTestSuite test two', async () => {
      const result = true;
      Rhum.asserts.assertEquals(true, result);
    });
    Rhum.testCase('normalizeTestSuite test three', async () => {
      const result = true;
      Rhum.asserts.assertEquals(true, result);
    });
  });
});

Rhum.run();
