import WTinyLFUCache from "../test_variables/wTinyLFU_variables.js";
import { Rhum } from 'https://deno.land/x/rhum@v1.1.11/mod.ts';

Rhum.testPlan('WTinyLFU cache functionality', () => {
  Rhum.testSuite('WTinyLFU Initialization', () => {
    Rhum.testCase('should initialize with corect capacities', () => {
      const cache = new WTinyLFUCache(1000);
      Rhum.asserts.assertEquals(cache.capacity, 1000);
      Rhum.asserts.assertEquals(cache.WLRU.capacity, 10);
      Rhum.asserts.assertEquals(cache.SLRU.probationaryLRU.capacity, 198);
      Rhum.asserts.assertEquals(cache.SLRU.protectedLRU.capacity, 792);
    });
  })
  Rhum.testSuite('Window cache functionality', () => {
    Rhum.testCase('should add new item to the windowLRU when adding to WTLFU cache', () => {
      const cache = new WTinyLFUCache(100);
      cache.putAndPromote('one', 1);
      Rhum.asserts.assertEquals(cache.WLRU.get('one'), 1);
    });
    Rhum.testCase('should move items ejected from windowLRU into the probationaryLRU cache', async () => {
      const cache = new WTinyLFUCache(100);
      await cache.putAndPromote('one', 1);
      await cache.putAndPromote('two', 2);
      Rhum.asserts.assertEquals(cache.WLRU.get('one'), null);
      Rhum.asserts.assertEquals(cache.SLRU.probationaryLRU.peek('one'), 1);
      Rhum.asserts.assertEquals(cache.WLRU.get('two'), 2);
    })
    Rhum.testCase('should promote items from probationaryLRU to the protectedLRU when accessed', async () => {
      const cache = new WTinyLFUCache(100);
      await cache.putAndPromote('one', 1);
      await cache.putAndPromote('two', 2);
      Rhum.asserts.assertEquals(cache.SLRU.get('one'), 1);
      Rhum.asserts.assertEquals(cache.SLRU.probationaryLRU.get('one'), null);
      Rhum.asserts.assertEquals(cache.SLRU.protectedLRU.peek('one'), 1);
    })
    Rhum.testCase('should demote items ejected from protectedLRU to probationary LRU', async () => {
      const cache = new WTinyLFUCache(100);
      cache.SLRU.protectedLRU.capacity = 1;
      cache.SLRU.protectedLRU.put('one', 1);
      await cache.SLRU.putAndDemote('two', 2);
      Rhum.asserts.assertEquals(cache.SLRU.protectedLRU.get('one'), null);
      Rhum.asserts.assertEquals(cache.SLRU.probationaryLRU.get('one'), 1);
      Rhum.asserts.assertEquals(cache.SLRU.protectedLRU.get('two'), 2);
    })
    Rhum.testCase('should move highest frequency item into full probationary cache', async () => {
      const cache = new WTinyLFUCache(100);
      cache.SLRU.probationaryLRU.capacity = 1;
      await cache.putAndPromote('one', 1);
      await cache.putAndPromote('two', 2);
      Rhum.asserts.assertEquals(cache.SLRU.probationaryLRU.get('one'), 1);
      cache.sketch['one'] = 3;
      cache.sketch['two'] = 2;
      await cache.putAndPromote('three', 3);
      Rhum.asserts.assertEquals(cache.SLRU.probationaryLRU.get('one'), 1);
      Rhum.asserts.assertEquals(cache.SLRU.probationaryLRU.get('two'), null);
      Rhum.asserts.assertEquals(cache.SLRU.probationaryLRU.get('three'), null);
      Rhum.asserts.assertEquals(cache.WLRU.get('one'), null);
      Rhum.asserts.assertEquals(cache.WLRU.get('two'), null);
      Rhum.asserts.assertEquals(cache.WLRU.get('three'), 3);
    })
    Rhum.testCase('should evict least recently used item from WLRU', async () => {
      const cache = new WTinyLFUCache(200);
      await cache.WLRU.put('one', 1);
      await cache.WLRU.put('two', 2);
      await cache.WLRU.put('three', 3);
      Rhum.asserts.assertEquals(cache.WLRU.get('one'), null);
      Rhum.asserts.assertEquals(cache.WLRU.get('two'), 2);
      Rhum.asserts.assertEquals(cache.WLRU.get('three'), 3);
    })
    Rhum.testCase('should evict least recently used item from ProbationaryLRU', async () => {
      const cache = new WTinyLFUCache(100);
      cache.SLRU.probationaryLRU.capacity = 2;
      await cache.SLRU.probationaryLRU.put('one', 1);
      await cache.SLRU.probationaryLRU.put('two', 2);
      await cache.SLRU.probationaryLRU.put('three', 3);
      Rhum.asserts.assertEquals(cache.SLRU.probationaryLRU.get('one'), null);
      Rhum.asserts.assertEquals(cache.SLRU.probationaryLRU.get('two'), 2);
      Rhum.asserts.assertEquals(cache.SLRU.probationaryLRU.get('three'), 3);
    })
    Rhum.testCase('should evict least recently used item from ProtectedLRU', async () => {
      const cache = new WTinyLFUCache(100);
      cache.SLRU.protectedLRU.capacity = 2;
      await cache.SLRU.protectedLRU.put('one', 1);
      await cache.SLRU.protectedLRU.put('two', 2);
      await cache.SLRU.protectedLRU.put('three', 3);
      Rhum.asserts.assertEquals(cache.SLRU.protectedLRU.get('one'), null);
      Rhum.asserts.assertEquals(cache.SLRU.protectedLRU.get('two'), 2);
      Rhum.asserts.assertEquals(cache.SLRU.protectedLRU.get('three'), 3);
    })
  })
});

Rhum.run();