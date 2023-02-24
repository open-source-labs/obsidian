import {
  isHashableObject,
  containsHashableObject,
  hashMaker,
} from './normalize.ts';
import { GenericObject } from './normalize.ts';
import { Cache } from './quickCache.js';
const cache = new Cache();

const isArrayOfHashableObjects = (
  arrayOfObjects: Array<GenericObject>,
  hashableKeys: Array<string>
): boolean => {
  if (Array.isArray(arrayOfObjects)) {
    return arrayOfObjects.every((object) => {
      return containsHashableObject(object, hashableKeys);
    });
  }
  return false;
};

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
export const transformResponse = (
  responseObject: any,
  hashableKeys: Array<string>
): GenericObject => {
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
};

/* ----------------------------------------------------------------*/
/** detransformResponse
 * Returns a nested object representing the original graphQL response object for a given queryKey
 * @param {String} queryKey String representing the stringified GraphQL query for a big read query, which should have been saved as a key in Redis
 * @param {GenericObject} transformedValue Nested object representing of references, where the references are hashes in Redis
 * @return {GenericObject} Nested object representing the original graphQL response object for a given queryKey
 */
export const detransformResponse = async (
  queryString: String,
  transformedValue: any,
  selectedFields: Array<string>
): Promise<any> => {
  // remove all text within parentheses aka '(input: ...)'
  queryString = queryString.replace(/\(([^)]+)\)/, '');
  // save Regex matches for line break followed by '{'
  const matches = [...queryString.matchAll(/\n([^\n]+)\{/g)];

  // get fields of query
  const tableNames: Array<string> = [];
  matches.forEach((match) => {
    tableNames.push(match[1].trim());
  });
  // fields ends up as array of just the fields ("plants" in the demo case);
  // define recursiveDetransform function body for use later
  const recursiveDetransform = async (
    transformedValue: any,
    tableNames: Array<string>,
    selectedFields: Array<string>,
    depth: number = 0
  ): Promise<any> => {
    const keys = Object.keys(transformedValue);
    let result: any = {};
    let currDepth = depth;

    // base case: transformedValue is innermost object aka empty object
    if (Object.keys(transformedValue).length === 0) {
      return result;
    } else {
      let currTable: string = tableNames[currDepth];
      result[currTable] = [];

      for (let hash in transformedValue) {
        const redisValue: GenericObject = await cache.cacheReadObject(
          hash,
          selectedFields
        );

        // edge case in which our eviction strategy has pushed partial Cache data out of Redis
        if (!redisValue) {
          return 'cacheEvicted';
        }

        result[currTable].push(redisValue);

        let recursiveResult = await recursiveDetransform(
          transformedValue[hash],
          tableNames,
          selectedFields,
          (depth = currDepth + 1)
        );

        // edge case in which our eviction strategy has pushed partial Cache data out of Redis, for recursive call
        if (recursiveResult === 'cacheEvicted') {
          return 'cacheEvicted';
          // normal case with no cache eviction
        } else {
          result[currTable][result[currTable].length - 1] = Object.assign(
            result[currTable][result[currTable].length - 1],
            recursiveResult
          );
        }
      }
      return result;
    }
  };

  // actually call recursiveDetransform
  // Formats Redis cache value into GraphQL response syntax. cacheReadObject is called and returns only fields that are present in selectedFields
  let detransformedResult: any = { data: {} };
  const detransformedSubresult = await recursiveDetransform(
    transformedValue,
    tableNames,
    selectedFields
  );
  if (detransformedSubresult === 'cacheEvicted') {
    detransformedResult = undefined;
  } else {
    detransformedResult.data = await recursiveDetransform(
      transformedValue,
      tableNames,
      selectedFields
    );
  }

  return detransformedResult;
};
