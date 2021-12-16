import { isHashableObject, containsHashableObject, hashMaker } from './normalize.ts';
import { GenericObject } from './normalize.ts';
import { Cache } from './quickCache.js'
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
export const detransformResponse = async (queryKey: String, transformedValue: any):Promise<any> => {
  // remove all text within parentheses aka '(input: ...)'
  queryKey = queryKey.replace(/\(([^)]+)\)/, '');
  // save Regex matches for line break followed by '{'
  const matches = [...queryKey.matchAll(/\n([^\n]+)\{/g)];

  // get fields of query
  const fields: Array<string> = [];
  matches.forEach(match => {
    fields.push(match[1].trim());
  });
  
  // define recursiveDetransform function body for use later
  const recursiveDetransform = async (transformedValue: any, fields: Array<string>, depth: number = 0):Promise<any> => {
    let result: any = {}; 
    let currDepth = depth;

    // base case: transformedValue is innermost object aka empty object 
    if (Object.keys(transformedValue).length === 0) {
      return result;
    } else {
      let currField: string = fields[currDepth];
      result[currField] = [];
  
      for (let hash in transformedValue) { 
        const redisValue: GenericObject = await cache.cacheReadObject(hash);

        // edge case in which our eviction strategy has pushed partial Cache data out of Redis
        if (!redisValue) {
          return 'cacheEvicted';
        }

        result[currField].push(redisValue);
        
        let recursiveResult = await recursiveDetransform(transformedValue[hash], fields, depth = currDepth + 1)

        // edge case in which our eviction strategy has pushed partial Cache data out of Redis, for recursive call
        if (recursiveResult === 'cacheEvicted') {
          return 'cacheEvicted';
        // normal case with no cache eviction
        } else {
          result[currField][result[currField].length - 1] = Object.assign(
            result[currField][result[currField].length - 1], recursiveResult);
        }

      }
      return result;
    }
  }

  // actually call recursiveDetransform
  let detransformedResult: any = {'data' : {}};
  const detransformedSubresult = await recursiveDetransform(transformedValue, fields)
  if (detransformedSubresult === 'cacheEvicted') {
    detransformedResult = undefined;
  } else {
    detransformedResult.data = await recursiveDetransform(transformedValue, fields);
  }

  return detransformedResult;
}