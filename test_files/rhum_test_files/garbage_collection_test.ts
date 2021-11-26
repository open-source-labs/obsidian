import { Rhum } from 'https://deno.land/x/rhum@v1.1.11/mod.ts';
import Cache from '../../src/Browser/CacheClassBrowser.js';
import { test } from '../test_variables/garbage_collection_variables.ts';

Rhum.testPlan('CacheClassBrowser garbage collection', () => {
    Rhum.testSuite('getBadHashes()', () => {
      Rhum.testCase(
        'should return a badHashes set that contains all the hashes that are flagged for deletion',
        async () => {
          const cache = new Cache(test.cache);
          const result = Array.from(cache.getBadHashes());
          Rhum.asserts.assertEquals(result, test.badHashesSet);
        }
      );
    });
    Rhum.testSuite('rootQueryCleaner()', () => {
      Rhum.testCase(
        'should return (partial) goodHashes set from the root queries after removing bad hashes',
        async () => {
          const cache = new Cache(test.cache);
          const badHashes = new Set(test.badHashesSet);
          const result = Array.from(cache.rootQueryCleaner(badHashes)).sort();
          Rhum.asserts.assertEquals(result, test.goodHashesSet.sort());
        }
      );
      Rhum.testCase(
        'should clean up the root queries by removing bad hashes',
        async () => {
          const cache = new Cache(test.cache);
          const badHashes = new Set(test.badHashesSet);
          cache.rootQueryCleaner(badHashes);
          Rhum.asserts.assertEquals(cache.storage.ROOT_QUERY, test.cleanedRootQuery);
        }
      )
    });
    Rhum.testSuite('getGoodHashes()', () => {
        Rhum.testCase(
          'should return (complete) goodHashes set after checking goodHashes for nested hashes and adding them to the goodHashes set',
          async () => {
            const cache = new Cache(test.cache);
            const badHashes = new Set(test.badHashesSet);
            const goodHashes = new Set(test.goodHashesSet);
            const result = Array.from(cache.getGoodHashes(badHashes, goodHashes)).sort();
            Rhum.asserts.assertEquals(result, test.getGoodHashes.sort());
          }
        );
      });
      Rhum.testSuite('removeInaccessibleHashes()', () => {
        Rhum.testCase(
          'should remove inaccessible hashes from cache',
          async () => {
            const cache = new Cache(test.cache);
            const badHashes = new Set(test.badHashesSet);
            const goodHashes = new Set(test.getGoodHashes);
            cache.removeInaccessibleHashes(badHashes, goodHashes);
            Rhum.asserts.assertEquals(cache.storage, test.removeInaccessibleHashes);
          }
        );
      });
  });
  Rhum.run();