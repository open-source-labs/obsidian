import {
  insertTypenames,
  addTypenamesToFieldsStr,
  findClosingBrace,
} from '../../src/Browser/insertTypenames.js';
import { Rhum } from 'https://deno.land/x/rhum@v1.1.11/mod.ts';
import { test } from '../test_variables/insertTypenames_variables.ts';

Rhum.testPlan('insertTypenames.js', () => {
  Rhum.testSuite('insertTypenames()', () => {
    Rhum.testCase(
      'should add __typenames meta field to every level of a graphql query',
      () => {
        const result = insertTypenames(test.singleQueryInput);
        Rhum.asserts.assertEquals(result, test.singleQueryOutput);
      }
    );
    Rhum.testCase(
      'should add __typenames meta field to every level of a graphql mutation',
      () => {
        const result = insertTypenames(test.singleMutationInput);
        Rhum.asserts.assertEquals(result, test.singleMutationOutput);
      }
    );
    Rhum.testCase(
      'should add __typenames meta field to every level of a graphql operation with multiple queries',
      () => {
        const result = insertTypenames(test.multipleQueriesInput);
        Rhum.asserts.assertEquals(result, test.multipleQueriesOutput);
      }
    );
  });

  Rhum.testSuite('addTypenamesToFieldsStr()', () => {
    Rhum.testCase(
      'should add __typenames meta field to every level of a field string',
      () => {
        const result = addTypenamesToFieldsStr(test.fieldsStrInput);
        Rhum.asserts.assertEquals(result, test.fieldsStrOutput);
      }
    );
  });
  Rhum.testSuite('findClosingBrace()', () => {
    Rhum.testCase(
      'should return the index of the matching closing brace',
      () => {
        const result = findClosingBrace('asdf{asasd}a', 4);
        Rhum.asserts.assertEquals(result, 10);
      }
    );
    Rhum.testCase(
      'should return the index of the matching closing brace when there are other nested brace',
      () => {
        const result = findClosingBrace('asdf{as{{a}}sd}a', 4);
        Rhum.asserts.assertEquals(result, 14);
      }
    );
  });

  Rhum.testSuite('insertTypenames()', () => {
    Rhum.testCase(
      'should add __typenames meta field to graphql alias query',
      () => {
        const result = insertTypenames(test.newAliasTestQuery);
        Rhum.asserts.assertEquals(result, test.newAliasTestResult);
      }
    );
  });
});
Rhum.run();
