/** @format */

import { redisdb } from "./quickCache.js";
import { gql } from "https://deno.land/x/oak_graphql/mod.ts";
import { print, visit } from "https://deno.land/x/graphql_deno/mod.ts";
import testsObj from "../queries.js";
let localCacheObject = {};
const cacheReadList = async (hash) => {
  //we gotta get the list lubed up and ready for action
  //await redisdb.lrange(hash, 0, -1);
  // if (localCacheObject[hash]) {
  //   // console.log("yo");
  //   // console.log(localCacheObject[hash]);
  // }
  let redisList = await redisdb.lrange(hash, 0, -1);
  // console.log("CachedArray", redisList);
  //if (redisList.length===0) return undefined;
  let cachedArray = redisList.map((element) => JSON.parse(element));
  localCacheObject[hash] = cachedArray;
  // console.log(cachedArray);
  // console.log("CachedArray2", cachedArray);
  return cachedArray;
};

const cacheReadObject = async (hash, field) => {
  if (field) {
    if (localCacheObject[hash] && localCacheObject[hash][field]) {
      // console.log("original savetime");
      return localCacheObject[hash][field];
    } else {
      // console.log("hash", hash, "field", field);
      // console.log("localCacheObject: ");
      // console.log(localCacheObject);
    }
    let returnValue = await redisdb.hget(hash, JSON.stringify(field));
    if (returnValue === undefined) return undefined;
    // console.log("do thing", returnValue);
    // console.log(returnValue);
    // console.log(typeof returnValue);
    if (!localCacheObject[hash]) {
      localCacheObject[hash] = {};
    }
    if (localCacheObject[hash]) {
      localCacheObject[hash][field] = JSON.parse(returnValue);
    }
    return JSON.parse(returnValue);
  } else {
    if (localCacheObject[hash]) {
      // console.log("savetime");
      return localCacheObject[hash];
    } else {
      // console.log("hash", hash);
      // console.log("localCacheObject: ");
      // console.log(localCacheObject);
    }
    let objArray = await redisdb.hgetall(hash);
    if (objArray.length == 0) return undefined;
    let parsedArray = objArray.map((entry) => JSON.parse(entry));
    // console.log(parsedArray);

    if (parsedArray.length % 2 !== 0) {
      // console.log("uneven number of keys and values in ", hash);
      return undefined;
    }
    let returnObj = {};
    for (let i = 0; i < parsedArray.length; i += 2) {
      returnObj[parsedArray[i]] = parsedArray[i + 1];
    }
    // console.log("returnObj:", returnObj);
    localCacheObject[hash] = returnObj;
    return returnObj;
  }
};

export const rebuildFromQuery = async (restructuredQuery) => {
  localCacheObject = {};
  let ast = gql(restructuredQuery);
  //ast = gql(print(visit(ast, { leave: rebuildInlinesVisitor })));
  // console.log(
  //   "ast from rebuildFromQuery: ",
  //   ast.definitions[0].selectionSet.selections
  // );
  const primaryFieldsArray = ast.definitions[0].selectionSet.selections;
  const primaryFieldResponseObject = {};
  for (const primaryField of primaryFieldsArray) {
    // console.log("primaryField: ", primaryField);

    const hashName =
      primaryField.name.value +
      JSON.stringify(primaryField.arguments) +
      JSON.stringify(primaryField.directives);
    const responseKeyName = primaryField.alias
      ? primaryField.alias.value
      : primaryField.name.value;

    let fieldsArray = primaryField.selectionSet.selections;
    // console.log("fieldsArray", fieldsArray);
    const retrievedArray = await cacheReadList(hashName);
    // console.log("more console.logs, retrivedArray", retrievedArray);
    if (retrievedArray.length === 0) return undefined;
    const entry = await rebuildArrays(retrievedArray, fieldsArray);
    if (entry === undefined) return undefined;
    // console.log("entry: ", entry);
    // console.log("post-entry");
    // console.log(responseKeyName, ": ", entry);

    primaryFieldResponseObject[responseKeyName] = entry;
  }

  const rebuiltResponse = { data: primaryFieldResponseObject };
  // console.log("mostest importantest", rebuiltResponse);
  return rebuiltResponse;
  //console.log({data:{...}})
};

const rebuildArrays = async (cachedArray, queryArray) => {
  // console.log("%%%%%", queryArray);
  const returnArray = [];
  for (const cachedHash of cachedArray) {
    let returnObject = {};
    // console.log("this is cachedHash in rebuildArrays outer loop: ", cachedHash);
    for (const queryField of queryArray) {
      // console.log("looking for inline fragments", queryField);
      let objKey;
      let nameyName;
      if (queryField.kind == "InlineFragment") {
        // console.log("!@!@!@");
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
      // console.log("__alley");
      // console.log(objKey);
      const fieldValue = await cacheReadObject(cachedHash, nameyName);
      // console.log("stuipd");
      if (fieldValue === undefined) return undefined;
      // console.log(
      //   `In nameyname ${cachedHash}. ${objKey || "PROBABLY INLINE"} :`,
      //   fieldValue
      // );
      if (Array.isArray(fieldValue)) {
        // console.log(fieldValue, " should be an array");
        // console.log(
        // queryField.selectionSet.selections,
        // " should exist and be an array"
        // );
        //returnObject[queryField.name.value]=fieldValue;

        returnObject[objKey] = await rebuildArrays(
          fieldValue,
          queryField.selectionSet.selections
        );
        if (returnObject[objKey] === undefined) return undefined;
      } else {
        // console.log(fieldValue, "shouldn't be an array");
        if (queryField.selectionSet == undefined) {
          // console.log("this is good");
          returnObject[objKey] = fieldValue;
          // console.log("this is gooood", returnObject);
        } else {
          //its not undefined because its an inline fragment
          //insert error functionality here
          // console.log("this is bad");
          // console.log(returnObject);
          //console.log(queryField);
          if (returnObject.__typename === queryField.typeCondition.name.value) {
            // console.log(queryField.selectionSet.selections);
            // console.log(cachedHash);
            let inlines = await rebuildArrays(
              [cachedHash],
              queryField.selectionSet.selections
            );
            if (inlines == undefined) return undefined;
            // console.log("This the inlines:", inlines);
            returnObject = { ...returnObject, ...inlines[0] };
            // console.log("Full Blast!", returnObject);
          }
        }
      }
    }
    // console.log("this is probably important: ");
    // console.log(returnObject);
    returnArray.push(returnObject);
  }
  // console.log("this is probably critical: ");
  // console.log(returnArray);
  return returnArray;
};

const rebuildInlinesVisitor = {
  InlineFragment: (node) => {
    // console.log("^^^^", node);
    // console.log(node.selectionSet.selections[0].name);
    return node.selectionSet.selections;
  },
};
// let boop = await cacheReadList("actors[][]sddsfdsf")
// console.log("Gotta know what comes back:", boop);
// let query1rebuilt = await rebuildFromQuery(testsObj.query1.query);
// console.log("Did we do it?", query1rebuilt);
