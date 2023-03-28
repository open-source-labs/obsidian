import { assert, equal, assertStrictEquals, assertEquals } from "https://deno.land/std@0.181.0/testing/asserts.ts";
import WTinyLFUCache from "../../src/Browser/wTinyLFUBrowserCache.js";
import { FrequencySketch } from "../../src/Browser/FrequencySketch.js";

// Cache creation
Deno.test('creating a new cache creates subcaches with correct capacities', () => {
  const cache = new WTinyLFUCache(1000)
  assertEquals(cache.WLRU.capacity, 10);
  assertEquals(cache.SLRU.protectedLRU.capacity, 792);
  assertEquals(cache.SLRU.probationaryLRU.capacity, 198);
  // console.log(cache);
})