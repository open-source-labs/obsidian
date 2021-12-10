import { Rhum } from 'https://deno.land/x/rhum@v1.1.4/mod.ts';
import normalizeResult from '../../src/Browser/normalize.js';
import { test } from '../test_variables/browserNormalize_variables.ts';

Rhum.testPlan('normalize.ts', () => {
    Rhum.testSuite('destructure helper function tests', () => {
      Rhum.testCase('findQueryStrings test', () => {
        const results = findQueryStrings(test.findQueryStringsTestData);
        Rhum.asserts.assertEquals(test.findQueryStringsResultData, results);
      });
      Rhum.testCase('createQueriesObj test', () => {
        const results = createQueriesObj(
          test.createQueriesObjTestData,
          'queries'
        );
        Rhum.asserts.assertEquals(test.createQueriesObjResultsData, results);
      });
      Rhum.testCase('findQueryFields test', () => {
        const results = findQueryFields(test.findQueryFieldsTestData);
        Rhum.asserts.assertEquals(test.findQueryFieldsResultData, results);
      });
      Rhum.testCase('findClosingBrace test', () => {
        const results = findClosingBrace(test.findClosingBraceTestData, 62);
        Rhum.asserts.assertEquals(test.findClosingBraceResultData, results);
      });
    });