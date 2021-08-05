import { Rhum } from 'https://deno.land/x/rhum@v1.1.4/mod.ts';
import normalizeResult from '../../src/Old/normalize.js';
import { test } from '../test_variables/normalize_variables.ts';

Rhum.testPlan('normalize.ts', () => {
  Rhum.testSuite('normalizeTestSuite', () => {
    Rhum.testCase(
      'expected result to equal object with ROOT_QUERY and hash:value pairs',
      async () => {
        const result = normalizeResult(test.queryObject1, test.resultObject1);
        Rhum.asserts.assertEquals(result, test.resultObj1);
      }
    );
  });
  Rhum.testSuite('normalizeAliasTestSuite', () => {
    Rhum.testCase(
      'expected result to equal object with ROOT_QUERY and hash:value pairs',
      async () => {
        const result = normalizeResult(test.aliasTestQueryObj, test.aliasTestResult);
        Rhum.asserts.assertEquals(result, test.aliasTestRootHash);
      }
    );
  });
});

Rhum.run();
 