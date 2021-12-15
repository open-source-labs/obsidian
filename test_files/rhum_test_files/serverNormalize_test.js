import { assert, equal, assertStrictEquals, assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { containsHashableObject, isHashableObject, hashMaker, printHashableObject, normalizeObject } from '../../src/normalize.ts';
import { serverNormalizeTestVariables as data } from '../test_variables/serverNormalize_variables.ts';
const arrOfHashableKeys = ['id', '__typename'];

// containsHashableObject
Deno.test('normalize.ts - cointainsHashableObject - True test 1: object with hashable key properties and a nested object', () => {
  assert(containsHashableObject(data.containsHashableObjTrue1, arrOfHashableKeys) === true);
})
Deno.test('normalize.ts - cointainsHashableObject - True test 2: object with hashable key properties and an array of nested objects', () => {
  assert(containsHashableObject(data.containsHashableObjTrue2, arrOfHashableKeys) === true);
})
Deno.test('normalize.ts - cointainsHashableObject - True test 3: object with hashable key properties with nested array', () => {
  assert(containsHashableObject(data.containsHashableObjTrue3, arrOfHashableKeys) === true);
})
Deno.test('normalize.ts - cointainsHashableObject - False test 1: array of hashable keys', () => {
  assert(containsHashableObject(data.containsHashableObjFalse1, arrOfHashableKeys) === false);
})
Deno.test('normalize.ts - cointainsHashableObject - False test 2: array nested with an object of hashable key properties', () => {
  assert(containsHashableObject(data.containsHashableObjFalse2, arrOfHashableKeys) === false);
})
Deno.test('normalize.ts - cointainsHashableObject - False test 3: object with nested object with hashable key properties', () => {
  assert(containsHashableObject(data.containsHashableObjFalse3, arrOfHashableKeys) === false);
})

// isHashableObject
Deno.test('normalize.ts - isHashableObject - True test 1: object with hashable key properties and no nesting', () => {
  assert(isHashableObject(data.isHashableObjTrue1, arrOfHashableKeys) === true);
})
Deno.test('normalize.ts - isHashableObject - True test 2: object with hashable key properties and no nesting', () => {
  assert(isHashableObject(data.isHashableObjTrue2, arrOfHashableKeys) === true);
})
Deno.test('normalize.ts - isHashableObject - False test 1: array of hashable keys', () => {
  assert(isHashableObject(data.isHashableObjFalse1, arrOfHashableKeys) === false);
})
Deno.test('normalize.ts - isHashableObject - False test 2: object with hashable key properties and nesting', () => {
  assert(isHashableObject(data.isHashableObjFalse2, arrOfHashableKeys) === false);
})

// hashMaker
Deno.test('normalize.ts - hashMaker - Creates unique hash when a hashable object is passed through', () => {
  assertStrictEquals(hashMaker(data.isHashableObjTrue1, arrOfHashableKeys), "~7~Movie");
})
Deno.test('normalize.ts - hashMaker - Creates unique hash when a hashable object is passed through', () => {
  assertStrictEquals(hashMaker(data.isHashableObjTrue2, arrOfHashableKeys), "~1~Actor");
})

// printHashableObject
Deno.test('normalize.ts - printHashableObject - Prints a hashable object when object with hashable key properties and no nesting is passed through', () => {
  assertEquals(printHashableObject(data.containsHashableObjTrue1), { "id": "11", "__typename": "Movie", "title": "Ad Astra" });
})
Deno.test('normalize.ts - printHashableObject - Prints a hashable object when object with hashable key properties and no nesting is passed through', () => {
  assertEquals(printHashableObject(data.containsHashableObjTrue2), { "id": "7", "__typename": "Movie", "title": "Ad Astra", "releaseYear": 2019, "genre": "SCIFI" });
})
Deno.test('normalize.ts - printHashableObject - Prints a hashable object when object with hashable key properties and no nesting is passed through', () => {
  assertEquals(printHashableObject(data.containsHashableObjTrue3), { "id": "1", "__typename": "Actor", "firstName": "Brad", "lastName": "Pitt" });
})

// normalizeObject
Deno.test('normalize.ts - normalizeObject - Constructs an object of reference caches. Key being the hash used as redis key and value being object that is stored in redis', () => {
  assertEquals(normalizeObject(data.scifiMovies, ["id", "__typename"]), data.scifiMoviesNormalized);
})

Deno.test('normalize.ts - normalizeObject - Constructs an object of reference caches. Key being the hash used as redis key and value being object that is stored in redis', () => {
  assertEquals(normalizeObject(data.arbitraryNestedScifiMovies, ["id", "__typename"]), data.arbitraryNestedScifiMoviesNormalized);
})

Deno.test('normalize.ts - normalizeObject - returns empty object if values in customIdentifier argument are not found in the nested response object', () => {
  assertEquals(normalizeObject(data.scifiMovies, ['identifier', 'uid', 'someType']), {});
})