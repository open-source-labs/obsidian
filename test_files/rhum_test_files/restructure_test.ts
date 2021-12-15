import { Rhum } from 'https://deno.land/x/rhum@v1.1.11/mod.ts';
//import { assert } from "https://deno.land/std@0.102.0/testing/asserts.ts";
import { restructure } from '../../src/restructure.ts';
import { test } from '../test_variables/restructure_variables.ts';
import { gql } from "https://deno.land/x/oak_graphql/mod.ts";
//import {concatInlineFragments, parseFragmentToInlineFragment} from "https://deno.land/x/oak_graphql/graphql-tools/utils/fragments.ts";
import { print, visit } from "https://deno.land/x/graphql_deno/mod.ts";

// Testing  Fragments  with two Seperate queries

Rhum.testPlan("restructure.ts", () => {
  Rhum.testSuite("restructure fragment test", () => {
    // // No Fragment test 
    Rhum.testCase("restructure fragment test - no fragments", () => {
      const result = restructure(test.fragmentTestData0);
      Rhum.asserts.assertEquals(result, print(gql(test.fragmentResultData0)));
    });
    // Fragment with two seperate queries
    Rhum.testCase("restructure fragment test - results in two seperate queries", () => {
      const result = restructure(test.fragmentTestData);
      Rhum.asserts.assertEquals(result, print(gql(test.fragmentResultData)));
    });
    // Fragments in One query
    Rhum.testCase('restructure fragment test - result in one query', () => {
      const result = restructure(test.fragmentTestData2);
      Rhum.asserts.assertEquals(result, print(gql(test.fragmentResultData2)));
    });
    //  Fragment with Nested Fragments
    Rhum.testCase('restructure fragment test - nested fragments', () => {
      const result = restructure(test.fragmentTestData3);
      Rhum.asserts.assertEquals(result, print(gql(test.fragmentResultData3)))
    });
    // Single Variable Test 
    Rhum.testSuite('restructure single variable query tests', () => {
      Rhum.testCase('restructure single variable query string', () => {
        const result = restructure(
          test.singleVariableTestData,
        );
        Rhum.asserts.assertEquals(result, print(gql(test.singleVariableTestResult)));
      })
    });
    // // Multi Variable Test 
    Rhum.testSuite('restructure multi variable query test', () => {
      Rhum.testCase('restructure multi variable query', () => {
        const result = restructure(
          test.multiVariableTestData,
        );
        Rhum.asserts.assertEquals(result, print(gql(test.multiVariableTestResult)));
      });
    })
  });
});


Rhum.run(); // <-- make sure to include this so that your tests run via `deno test`