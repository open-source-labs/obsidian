import { Rhum } from 'https://deno.land/x/rhum@v1.1.4/mod.ts';
import destructureQueries from '../../src/newDestructure.js';
import { test } from '../test_variables/destructure_variables.ts';

Rhum.testPlan('destructure.ts', () => {
  Rhum.testSuite('destructure invalid query tests', () => {
    Rhum.testCase('destructure empty query string', () => {
      const EMPTY_QUERY_STRING = '';
      const result = destructureQueries(EMPTY_QUERY_STRING);
      const testResult = {};
      Rhum.asserts.assertEquals(testResult, {});
    });
    Rhum.testCase('destructure invalid query string', () => {
      const INVALID_QUERY_STRING = 'abc123';
      const result = destructureQueries(INVALID_QUERY_STRING);
      const testResult = {};
      Rhum.asserts.assertEquals(testResult, {});
    });
  });
  Rhum.testSuite('destructure single query tests', () => {
    Rhum.testCase('destructure single query string - no inputs', () => {
      const result = destructureQueries(test.ALL_ACTORS);
      Rhum.asserts.assertEquals(test.allActorsTestResult, result);
    });
    Rhum.testCase('destructure single query string - inputs', () => {
      const result = destructureQueries(test.ALL_ACTION_MOVIES);
      Rhum.asserts.assertEquals(test.allActionTestResult, result);
    });
  });
  Rhum.testSuite('destructure multi query tests', () => {
    Rhum.testCase('destructure multi query - input / non input', () => {
      const result = destructureQueries(test.ALL_ACTION_MOVIES_AND_ALL_ACTORS);
      Rhum.asserts.assertEquals(test.allActionActorsTestResult, result);
    });
  });
});

Rhum.run();
