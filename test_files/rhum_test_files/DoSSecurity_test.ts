import { Rhum } from 'https://deno.land/x/rhum@v1.1.11/mod.ts';
import queryDepthLimiter from '../../src/DoSSecurity.ts';
import { test } from '../test_variables/DoSSecurity_variables.ts';


Rhum.testPlan('DoSSecurity.ts', () => {
  Rhum.testSuite('Query depth limit NOT exceeded tests', () => {
    Rhum.testCase('Test query depth of 2 does not exceed allowable depth 2', () => {
      const results = queryDepthLimiter(test.DEPTH_2_QUERY, 2);
      Rhum.asserts.assertEquals(undefined, results);
    });
    Rhum.testCase('Test mutation depth of 2 does not exceed allowable depth of 2', () => {
      const results = queryDepthLimiter(test.DEPTH_2_MUTATION, 2);
      Rhum.asserts.assertEquals(undefined, results);
    });
  });
  
  Rhum.testSuite('Query/mutation depth limit IS EXCEEDED tests', () => {
    Rhum.testCase('Test query depth 2 should exceed depth limit of 1', () => {
      Rhum.asserts.assertThrows(
        () => {
          queryDepthLimiter(test.DEPTH_2_QUERY, 1)
        },
        Error,
        "Security Error: Query depth exceeded maximum query depth limit",
      )
    });
    Rhum.testCase('Test mutation depth 2 should exceed depth limit of 1', () => {
      Rhum.asserts.assertThrows(
        () => {
          queryDepthLimiter(test.DEPTH_2_MUTATION, 1)
        },
        Error,
        "Security Error: Query depth exceeded maximum mutation depth limit",
      )
    });
  });

  Rhum.testSuite('Query depth limit NOT exceeded, multiple query tests', () => {
    Rhum.testCase('Test multiple queries of depth 2 should not exceed allowable depth 2', () => {
      const results = queryDepthLimiter(test.MULTIPLE_DEPTH_2_QUERY, 2);
      Rhum.asserts.assertEquals(undefined, results);
    });
    Rhum.testCase('Test multiple mutations of depth 2 should not exceed allowable depth 2', () => {
      const results = queryDepthLimiter(test.MULTIPLE_DEPTH_2_MUTATION, 2);
      Rhum.asserts.assertEquals(undefined, results);
    });
  });

  Rhum.testSuite('Multiple query/mutation depth limit IS EXCEEDED tests', () => {
    Rhum.testCase('Test multiple query depth should be exceeded', () => {
      Rhum.asserts.assertThrows(
        () => {
          queryDepthLimiter(test.MULTIPLE_DEPTH_2_QUERY, 1)
        },
        Error,
        "Security Error: Query depth exceeded maximum query depth limit",
      )
    });
    Rhum.testCase('Test multiple mutation depth should be exceeded', () => {
      Rhum.asserts.assertThrows(
        () => {
          queryDepthLimiter(test.MULTIPLE_DEPTH_2_MUTATION, 1)
        },
        Error,
        "Security Error: Query depth exceeded maximum mutation depth limit",
      )
    });
  });
});

Rhum.run();