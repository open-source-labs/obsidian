// need redis v0.23.2 to be compatible with Deno testing. That is why we need to separate transformResponseLight.ts from transformResponse.ts

import { isHashableObject, containsHashableObject, hashMaker } from '../../src/normalize.ts';
import { GenericObject } from '../../src/normalize.ts';
import { Cache } from './quickCacheLight.js'
const cache = new Cache;

const isArrayOfHashableObjects = (arrayOfObjects: Array<GenericObject>, hashableKeys: Array<string>):boolean => {
  if (Array.isArray(arrayOfObjects)) {
    return arrayOfObjects.every(object => {
      return containsHashableObject(object, hashableKeys);
    })
  }
  return false;
}

/* ----------------------------------------------------------------*/
/** transformResponse 
* Returns a nested object representing an object of references, where the references are hashes in Redis. The responseObject input must:
* 1) Contain hashable object(s)
* 2) have a first key of 'data', as should all GraphQL response objects
* 3) have an inner array of data response objects corresponding to the GraphQL fields
*
* @param {GenericObject} responseObject GraphQL response Object for large read query
* @param {array} hashableKeys Array of hashable keys
* @return {GenericObject} Nested object representing an object of references, where the references are hashes in Redis
*/
export const transformResponse = (responseObject: any, hashableKeys: Array<string>):GenericObject => {
  const result: GenericObject = {};

  if (responseObject.data) {
    return transformResponse(responseObject.data, hashableKeys);
  } else if (isHashableObject(responseObject, hashableKeys)) {
    return result;
  } else {
    for (const key in responseObject) {
      if (isArrayOfHashableObjects(responseObject[key], hashableKeys)) {
        for (const element of responseObject[key]) {
          let hash = hashMaker(element, hashableKeys);
          result[hash] = transformResponse(element, hashableKeys);
        }
      }
    }
  }
  return result;
}

  
/* ----------------------------------------------------------------*/
/** detransformResponse
* Returns a nested object representing the original graphQL response object for a given queryKey
* @param {String} queryKey String representing the stringified GraphQL query for a big read query, which should have been saved as a key in Redis
* @param {GenericObject} transformedValue Nested object representing of references, where the references are hashes in Redis
* @return {GenericObject} Nested object representing the original graphQL response object for a given queryKey
*/
export const detransformResponse = async (queryKey: String, transformedValue: GenericObject):Promise<GenericObject> => {
  // remove all text within parentheses aka '(input: ...)'
  queryKey = queryKey.replace(/\(([^)]+)\)/, '');
  // save Regex matches for line break followed by '{'
  const matches = [...queryKey.matchAll(/\n([^\n]+)\{/g)];

  // get fields of query
  const fields: Array<string> = [];
  matches.forEach(match => {
    fields.push(match[1].trim());
  });
  const recursiveDetransform = async (transformedValue: GenericObject, fields: Array<string>, depth: number = 0):Promise<GenericObject> => {
    const result: GenericObject = {}; 
    let currDepth = depth;

    console.log('tv-> ', transformedValue);
    // base case: innermost object with key:value pair of hash:{}
    if (Object.keys(transformedValue).length === 0) {
      return result;
    } else {
      let currField: string = fields[currDepth];
      result[currField] = [];
  
      for (let hash in transformedValue) { 
        console.log('hash -> ', hash);
        const redisValue: GenericObject = await cache.cacheReadObject(hash);
        console.log('redisVal -> ', redisValue);
        // edge case in which our eviction strategy has pushed partial Cache data out of Redis
        if (!redisValue) {
          return {'cache evicted': {}};
        }

        result[currField].push(redisValue);
        
        result[currField][result[currField].length - 1] = Object.assign(
          result[currField][result[currField].length - 1], 
          await recursiveDetransform(transformedValue[hash], fields, depth = currDepth + 1)
        )
      }
      return result;
    }
  }
  const detransformedResult: GenericObject = {'data' : {}};
  detransformedResult.data = await recursiveDetransform(transformedValue, fields);
  console.log('dt-> ', detransformedResult);
  return detransformedResult;
}