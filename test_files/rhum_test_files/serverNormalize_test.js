import { assert, equal } from "https://deno.land/std/testing/asserts.ts";
import { containsHashableObject, isHashableObject, hashMaker, printHashableObject, normalizeObject} from '../../src/normalize.ts';
import { serverNormalizeTestVariables } from '../test_variables/serverNormalize_variables.ts';
const arrOfHashableKeys = ['id', '__typename'];

// containsHashableObject
Deno.test('normalize.ts - cointainsHashableObject - True test 1: object with hashable key properties and a nested object', () => {
    assert(containsHashableObject(serverNormalizeTestVariables.containsHashableObjTrue1, arrOfHashableKeys) === true);
})
Deno.test('normalize.ts - cointainsHashableObject - True test 2: object with hashable key properties and an array of nested objects', () => {
    assert(containsHashableObject(serverNormalizeTestVariables.containsHashableObjTrue2, arrOfHashableKeys) === true);
})
Deno.test('normalize.ts - cointainsHashableObject - True test 3: object with hashable key properties with nested array', () => {
    assert(containsHashableObject(serverNormalizeTestVariables.containsHashableObjTrue3, arrOfHashableKeys) === true);
})
Deno.test('normalize.ts - cointainsHashableObject - False test 1: array of hashable keys', () => {
    assert(containsHashableObject(serverNormalizeTestVariables.containsHashableObjFalse1, arrOfHashableKeys) === false);
})
Deno.test('normalize.ts - cointainsHashableObject - False test 2: array nested with an object of hashable key properties', () => {
    assert(containsHashableObject(serverNormalizeTestVariables.containsHashableObjFalse2, arrOfHashableKeys) === false);
})
Deno.test('normalize.ts - cointainsHashableObject - False test 3: object with nested object with hashable key properties', () => {
    assert(containsHashableObject(serverNormalizeTestVariables.containsHashableObjFalse3, arrOfHashableKeys) === false);
})

// isHashableObject
Deno.test('normalize.ts - isHashableObject - True test 1: object with hashable key properties and no nesting', () => {
    assert(isHashableObject(serverNormalizeTestVariables.isHashableObjTrue1, arrOfHashableKeys) === true);
})
Deno.test('normalize.ts - isHashableObject - True test 2: object with hashable key properties and no nesting', () => {
    assert(isHashableObject(serverNormalizeTestVariables.isHashableObjTrue2, arrOfHashableKeys) === true);
})
Deno.test('normalize.ts - isHashableObject - False test 1: array of hashable keys', () => {
    assert(isHashableObject(serverNormalizeTestVariables.isHashableObjFalse1, arrOfHashableKeys) === false);
})
Deno.test('normalize.ts - isHashableObject - False test 2: object with hashable key properties and nesting', () => {
    assert(isHashableObject(serverNormalizeTestVariables.isHashableObjFalse2, arrOfHashableKeys) === false);
})

// hashMaker
Deno.test('normalize.ts - hashMaker - Creates unique hash when a hashable object is passed through', () => {
    console.log(hashMaker(serverNormalizeTestVariables.isHashableObjTrue1, arrOfHashableKeys))
    assertStrictEquals(hashMaker(serverNormalizeTestVariables.isHashableObjTrue1, arrOfHashableKeys), "~7~Movie");
})
Deno.test('normalize.ts - hashMaker - Creates unique hash when a hashable object is passed through', () => {
    assertStrictEquals(hashMaker(serverNormalizeTestVariables.isHashableObjTrue2, arrOfHashableKeys), "~1~Actor");
})

// printHashableObject
Deno.test('normalize.ts - printHashableObject - Prints a hashable object when object with hashable key properties and no nesting is passed through', () => {
    const printedHashableObject1 = printHashableObject(serverNormalizeTestVariables.containsHashableObjTrue1);
    console.log(printedHashableObject1)
    assertEquals(printedHashableObject1, {"id": "11", "__typename": "Movie", "title": "Ad Astra"});
})
Deno.test('normalize.ts - hashMaker - Creates unique hash when a hashable object is passed through', () => {
    assertEquals(hashMaker(serverNormalizeTestVariables.isHashableObjTrue2, arrOfHashableKeys), "~1~Actor");
})
