import { Rhum } from 'https://deno.land/x/rhum@v1.1.11/mod.ts';
import { transformResponse, detransformResponse } from '../../src/transformResponse.ts';
import { test } from '../test_variables/transformResponse_variables.ts';
// import { connect } from 'https://deno.land/x/redis/mod.ts';


// // set up a redis server
// let redis;
// const context = 'server';

// if (context === 'server') {
//   redis = await connect({
//     hostname: 'localhost',
//     port: 6379,
//   });
// }

Rhum.testPlan('transformResponse.ts', () => {
  Rhum.testSuite('transformResponse', () => {
    Rhum.testCase(
      'expected result to equal transformed response object', () => {
        const result = transformResponse(test.detransformedResponse, test.hashableKeys);
        Rhum.asserts.assertEquals(result, test.transformedResponse);
      }
    );
    Rhum.testCase(
      'expected transformation to work on nested objects', () => {
        const result = transformResponse(test.detransformedResponse, test.hashableKeys);
        Rhum.asserts.assertEquals(result, test.transformedResponse);
      }
    );
  });
  // Rhum.testSuite('detransformResponse', () => {
  //   Rhum.testCase(
  //     'expected server side Redis cache to be running', () => {
  //       const result = detransformResponse(test.queryKey, test.transformedResponse);
  //       Rhum.asserts.assertEquals(result, test.detransformedResponse);
  //     }
  //   );
  //   Rhum.testCase(
  //     'expected Redis to be able to write to cache', () => {
  //       const result = detransformResponse(test.queryKey, test.transformedResponse);
  //       Rhum.asserts.assertEquals(result, test.detransformedResponse);
  //     }
  //   );
  //   Rhum.testCase(
  //     'expected result to equal detransformed response object', () => {
  //       const result = detransformResponse(test.queryKey, test.transformedResponse);
  //       Rhum.asserts.assertEquals(result, test.detransformedResponse);
  //     }
  //   );
  // });
});

Rhum.run();
 