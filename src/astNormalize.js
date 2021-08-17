/** @format */

import { gql } from "https://deno.land/x/oak_graphql/mod.ts";

import { redisdb } from "./quickCache.js";

//graphql response is going to be in JSON;
// this is for breaking up AST feilds/parts into the hash
// and taking the response and pairing the resp info with hash

//idArray so they can define hash nomenclature
const cacheWriteList = async (hash, array, overwrite = true) => {
  if (overwrite) {
    await redisdb.del(hash);
  }

  array = array.map((element) => JSON.stringify(element));
  await redisdb.rpush(hash, ...array);
  return;
};

const cacheWriteObject = async (hash, obj) => {
  let entries = Object.entries(obj).flat();
  entries = entries.map((entry) => JSON.stringify(entry));

  await redisdb.hset(hash, ...entries);
};

export async function normalizeResult(
  gqlResponse,
  map,
  idArray = ["id", "__typename"]
) {
  const recursiveObjectHashStore = (object, uniqueArray, map) => {
    if (object == null) object = {};

    const keys = Object.keys(object);

    const isHashable = uniqueArray.every((element) => keys.includes(element));

    if (isHashable) {
      let hash = "";

      uniqueArray.forEach((id) => (hash = hash + "~" + object[id]));
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

        //returnObject[hash] -> is the object we eventually want to return
      });

      //here is where you store it in redis to store the nested info into keys
      cacheWriteObject(hash, Object.values(returnObject)[0]);

      return Object.keys(returnObject)[0];
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
