import { Rhum } from 'https://deno.land/x/rhum@v1.1.4/mod.ts';
import queryDepthLimiter from '../../src/DoSSecurity.ts';
import { test } from '../test_variables/DoSSecurity_variables.ts';


Rhum.testPlan('DoSSecurity.ts', () => {
  Rhum.testSuite('Query depth limit NOT exceeded tests', () => {
    Rhum.testCase('Test query depth with allowable depth 2', () => {
      const results = queryDepthLimiter(test.DEPTH_2_QUERY, 2);
      Rhum.asserts.assertEquals(undefined, results);
    });
    Rhum.testCase('Test mutation with allowable depth of 2', () => {
      const results = queryDepthLimiter(test.DEPTH_2_MUTATION, 2);
      Rhum.asserts.assertEquals(undefined, results);
    });
  });
  
  Rhum.testSuite('Query/mutation depth limit IS EXCEEDED tests', () => {
    Rhum.testCase('Test query depth should be exceeded', () => {
      Rhum.asserts.assertThrows(
        () => {
          queryDepthLimiter(test.DEPTH_2_QUERY, 1)
        },
        Error,
        "Security Error: Query depth exceeded maximum query depth limit",
      )
    });
    Rhum.testCase('Test mutation depth should be exceeded', () => {
      Rhum.asserts.assertThrows(
        () => {
          queryDepthLimiter(test.DEPTH_2_MUTATION, 1)
        },
        Error,
        "Security Error: Query depth exceeded maximum mutation depth limit",
      )
    });
  });
});

Rhum.run();