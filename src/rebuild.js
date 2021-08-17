/** @format */

import { redisdb } from "./quickCache.js";
import { gql } from "https://deno.land/x/oak_graphql/mod.ts";

let localCacheObject = {};
const cacheReadList = async (hash) => {
  //await redisdb.lrange(hash, 0, -1);

  let redisList = await redisdb.lrange(hash, 0, -1);

  //if (redisList.length===0) return undefined;
  let cachedArray = redisList.map((element) => JSON.parse(element));
  localCacheObject[hash] = cachedArray;

  return cachedArray;
};

const cacheReadObject = async (hash, field) => {
  if (field) {
    if (localCacheObject[hash] && localCacheObject[hash][field]) {
      return localCacheObject[hash][field];
    } else {
    }
    let returnValue = await redisdb.hget(hash, JSON.stringify(field));
    if (returnValue === undefined) return undefined;

    if (!localCacheObject[hash]) {
      localCacheObject[hash] = {};
    }
    if (localCacheObject[hash]) {
      localCacheObject[hash][field] = JSON.parse(returnValue);
    }
    return JSON.parse(returnValue);
  } else {
    if (localCacheObject[hash]) {
      return localCacheObject[hash];
    } else {
    }
    let objArray = await redisdb.hgetall(hash);
    if (objArray.length == 0) return undefined;
    let parsedArray = objArray.map((entry) => JSON.parse(entry));

    if (parsedArray.length % 2 !== 0) {
      return undefined;
    }
    let returnObj = {};
    for (let i = 0; i < parsedArray.length; i += 2) {
      returnObj[parsedArray[i]] = parsedArray[i + 1];
    }

    localCacheObject[hash] = returnObj;
    return returnObj;
  }
};

export const rebuildFromQuery = async (restructuredQuery) => {
  localCacheObject = {};
  let ast = gql(restructuredQuery);

  const primaryFieldsArray = ast.definitions[0].selectionSet.selections;
  const primaryFieldResponseObject = {};
  for (const primaryField of primaryFieldsArray) {
    const hashName =
      primaryField.name.value +
      JSON.stringify(primaryField.arguments) +
      JSON.stringify(primaryField.directives);
    const responseKeyName = primaryField.alias
      ? primaryField.alias.value
      : primaryField.name.value;

    let fieldsArray = primaryField.selectionSet.selections;

    const retrievedArray = await cacheReadList(hashName);

    if (retrievedArray.length === 0) return undefined;
    const entry = await rebuildArrays(retrievedArray, fieldsArray);
    if (entry === undefined) return undefined;

    primaryFieldResponseObject[responseKeyName] = entry;
  }

  const rebuiltResponse = { data: primaryFieldResponseObject };

  return rebuiltResponse;
};

const rebuildArrays = async (cachedArray, queryArray) => {
  const returnArray = [];
  for (const cachedHash of cachedArray) {
    let returnObject = {};

    for (const queryField of queryArray) {
      let objKey;
      let nameyName;
      if (queryField.kind == "InlineFragment") {
        let __typeof = await cacheReadObject(cachedHash, "__typeof");
        if (__typeof == queryField.typeCondition.name.value) {
        }
      }
      if (queryField.name && queryField.name.value) {
        objKey = queryField.name.value;
        nameyName = queryField.name.value;
      }
      if (queryField.alias && queryField.alias.value) {
        objKey = queryField.alias.value;
      }

      const fieldValue = await cacheReadObject(cachedHash, nameyName);

      if (fieldValue === undefined) return undefined;

      if (Array.isArray(fieldValue)) {
        returnObject[objKey] = await rebuildArrays(
          fieldValue,
          queryField.selectionSet.selections
        );
        if (returnObject[objKey] === undefined) return undefined;
      } else {
        if (queryField.selectionSet == undefined) {
          returnObject[objKey] = fieldValue;
        } else {
          //its not undefined because its an inline fragment

          if (returnObject.__typename === queryField.typeCondition.name.value) {
            let inlines = await rebuildArrays(
              [cachedHash],
              queryField.selectionSet.selections
            );
            if (inlines == undefined) return undefined;

            returnObject = { ...returnObject, ...inlines[0] };
          }
        }
      }
    }

    returnArray.push(returnObject);
  }

  return returnArray;
};
