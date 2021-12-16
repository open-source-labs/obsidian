/** @format */

import { gql } from "https://deno.land/x/oak_graphql/mod.ts";

import { redisdb } from "./quickCache.js";
import { Cache } from './quickCache.js';

//graphql response is going to be in JSON;
// this is for breaking up AST feilds/parts into the hash
// and taking the response and pairing the resp info with hash
const cache = new Cache();
//idArray so they can define hash nomenclature
const cacheWriteList = async (hash, array, overwrite = true) => {
  if (overwrite) {
    await redisdb.del(hash);
  }

  array = array.map((element) => JSON.stringify(element));
  await redisdb.rpush(hash, ...array);
  return;
};

export async function normalizeResult(
  gqlResponse,
  map,
  idArray = ["id", "__typename"]
) {
  // console.log('gqlResponse -> ', gqlResponse);
  // console.log('map -> ', map);

  // console.log('%c astNormalize.js (normalizeResult) triggered', "background: #222; color: #F42504");

  const recursiveObjectHashStore = (object, uniqueArray, map) => {

    if (object == null) object = {};

    const keys = new Set(Object.keys(object)); // keys = ['data'], keys = ['id', '__typename', 'title', ...]

    // only the keys 'id' and '__typename' are hashable
    const isHashable = uniqueArray.every((element) => keys.has(element)); // can turn this from O(N) to O(1) with Map/Set.has

    if (isHashable) {
      let hash = "";

      uniqueArray.forEach((id) => (hash += "~" + object[id])); //~7~Movie

      // if hash exists as key in Redis, skip code block below and only return hash variable
      redisdb.exists(hash)
        .then(data => {
          if (!data) {
            const returnObject = {};
            keys.forEach((key) => {
              if (Array.isArray(object[key])) {
                returnObject[hash][map[key]] = [];
                object[key].forEach((element) => {
                  returnObject[hash][map[key]].push(
                     recursiveObjectHashStore(element, uniqueArray, map)
                  );
                });
              } else if (typeof object[key] == "object" && object[key] !== null) {
                returnObject[hash][map[key]] = recursiveObjectHashStore(
                  object[key],
                  uniqueArray,
                  map
                );
              } else {
                if (!returnObject[hash]) {
                  returnObject[hash] = {};
                }
                returnObject[hash][map[key]] = object[key];
              }
            });
            // console.log('Returned returnObject', returnObject);
            // console.log('cacheWriteObject called from astNormalize.js passing in hash and some object')
            // console.log('some object being passed in', Object.values(returnObject)[0])
            cache.cacheWriteObject(hash, Object.values(returnObject)[0]);
            // console.log('hash -->', hash)
            // console.log('Object.keys(returnObject)[0] -->', Object.keys(returnObject)[0])
            // console.log('returnObject ->', returnObject)
          }
        })
        .catch(err => {
          console.log('err occured when checking if hash in redis: ', err)
        })
        
        return hash;
    } else {
      //if object isn't hashable
      let returnObject = {};
      Object.keys(object).forEach((key) => {
        if (Array.isArray(object[key])) {
          returnObject[key] = [];
          object[key].forEach((element) => {
            returnObject[key].push(
              recursiveObjectHashStore(element, uniqueArray, map)
            );
          });
        } else if (typeof object[key] == "object") {
          returnObject[key] = recursiveObjectHashStore(
            object[key],
            uniqueArray,
            map
          );
        } else {
          returnObject[key] = object[key];
        }
      });

      return returnObject;
    }
    //define hash from idArray (loop through, concatenate all items into one string)
    //define query hash from name,
  };

  return await recursiveObjectHashStore(gqlResponse, idArray, map);
}

export const cachePrimaryFields = async (
  normalizedResult,
  queryString,
  map
) => {
  let ast = gql(queryString);

  const primaryFieldsArray = ast.definitions[0].selectionSet.selections;

  const expectedResultKeys = [];
  const objectOfHashs = {};
  for (const primaryField of primaryFieldsArray) {
    let title = primaryField.name.value;
    if (primaryField.alias) {
      title = primaryField.alias.value;
    } else {
      title = primaryField.name.value;
    }
    expectedResultKeys.push(title);

    let hashName = "";
    hashName =
      hashName +
      primaryField.name.value +
      JSON.stringify(primaryField.arguments) +
      JSON.stringify(primaryField.directives);

    objectOfHashs[hashName] = normalizedResult.data[title];

    if (!Array.isArray(normalizedResult.data[title])) {
      normalizedResult.data[title] = [normalizedResult.data[title]];
    }

    await cacheWriteList(hashName, normalizedResult.data[title]);
  }

  return objectOfHashs;
};
