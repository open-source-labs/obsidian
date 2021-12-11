import { assert, equal, assertStrictEquals, assertEquals } from "https://deno.land/std/testing/asserts.ts";
// import { Rhum } from 'https://deno.land/x/rhum@v1.1.11/mod.ts';
import { transformResponse, detransformResponse } from '../test_variables/transformResponseLight.ts';
import { test } from '../test_variables/transformResponse_variables.ts';
import { Cache } from '../test_variables/quickCacheLight.js'



// transformResponse
Deno.test('transformResponse - expected transformation to work on nested response objects', () => {
  const result = transformResponse(test.detransformedResponse_nested, test.hashableKeys);
  assertEquals(JSON.stringify(result), JSON.stringify(test.transformedResponse_nested))
})
Deno.test('transformResponse - expected transformation to work on non nested response objects', () => {
  const result = transformResponse(test.detransformedResponse_notnested, test.hashableKeys);
  assertEquals(JSON.stringify(result), JSON.stringify(test.transformedResponse_notnested))
})

// detransformResponse
// test cases below do not seem to work when working with Redis - not sure why
// Deno.test('detransformResponse - expected detransformation to work on nested response objects', () => {
//   const cache = new Cache();
//   for (let i = 0; i < test.writeHashes.length; i++) {
//     cache.cacheWriteObject(test.writeHashes[i], test.writeData[i]);
//   }
//   const result = detransformResponse(test.queryKey, test.transformedResponse_nested);
//   assertEquals(JSON.stringify(result), JSON.stringify(test.detransformedResponse_nested))
// })
// Deno.test('detransformResponse - expected detransformation to work on non nested response objects', () => {
//   const result = detransformResponse(test.queryKey, test.transformedResponse_notnested);
//   assertEquals(JSON.stringify(result), JSON.stringify(test.detransformedResponse_notnested))
// })