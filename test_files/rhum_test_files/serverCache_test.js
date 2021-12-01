/**
 * NOTES:
 * This file will test the read and write method on the Cache class functionality.
 */
import { Cache } from '../test_variables/quickCacheLight.js'
import { Rhum } from 'https://deno.land/x/rhum@v1.1.11/mod.ts';
import { test as testWrite } from '../test_variables/writeCache_variables.ts';
import { test as testRead } from '../test_variables/readCache_variables.ts';

//======================================================================

Rhum.testPlan('Write to Cache class', () => {
  Rhum.testSuite('write()', () => {
    Rhum.testCase('Should write to redis cache', async () => {
      const cache = new Cache(testWrite.originalCache);
      await cache.write(testWrite.queryStr, testWrite.respObj);
      Rhum.asserts.assertEquals(cache.storage, testWrite.originalCache);
    });
    Rhum.testCase(
      'should not overwrite the fields in the original cache with the new fields if the fields are not the same',
      async () => {
        const cache = new Cache(testWrite.originalCache);
        await cache.write(testWrite.queryStrTwo, testWrite.respObj);
        Rhum.asserts.assertEquals(testWrite.originalCache, cache.storage);
      }
    );
  });

  Rhum.testSuite('read()', () => {
    Rhum.testCase(
      '\n *** \n serverCache_test \nshould return a graphql response object if all required values are found in the cache',
      async () => {
        const cache = new Cache(testRead.cache);
        cache.write(testRead.singularInputQuery, testRead.singularQueryResObj)
        const result = await cache.read(testRead.singularInputQuery);
        Rhum.asserts.assertEquals(result, testRead.singularQueryResObj);
      }
    );
  });
});

Rhum.run();
