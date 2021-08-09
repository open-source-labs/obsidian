/** @format */

import { redisdb } from "./quickCache.js";
import { gql } from "https://deno.land/x/oak_graphql/mod.ts";
import { print, visit } from "https://deno.land/x/graphql_deno/mod.ts";
import testsObj from "../queries.js";

const cacheReadList = async (hash) => {
  //we gotta get the list lubed up and ready for action
  //await redisdb.lrange(hash, 0, -1);
  let redisList = await redisdb.lrange(hash, 0, -1);
  console.log("CachedArray", redisList);
  //if (redisList.length===0) return undefined;
  let cachedArray = redisList.map((element) => JSON.parse(element));
  // console.log(cachedArray);
  return cachedArray;
};

const cacheReadObject = async (hash, field) => {
  if (field) {
    let returnValue = await redisdb.hget(hash, JSON.stringify(field));
    console.log("do thing", returnValue);
    if (returnValue === undefined) return undefined;
    return JSON.parse(returnValue);
  } else {
    let objArray = await redisdb.hgetall(hash);
    if (objArray.length == 0) return undefined;
    let parsedArray = objArray.map((entry) => JSON.parse(entry));
    console.log(parsedArray);

    if (parsedArray.length % 2 !== 0) {
      console.log("uneven number of keys and values in ", hash);
      return undefined;
    }
    let returnObj = {};
    for (let i = 0; i < parsedArray.length; i += 2) {
      returnObj[parsedArray[i]] = parsedArray[i + 1];
    }
    console.log("returnObj:", returnObj);
    return returnObj;
  }
};

export const rebuildFromQuery = async (normalizedQuery) => {
  const ast = gql(normalizedQuery);
  //console.log("ast from rebuildFromQuery: ",ast)
  const primaryFieldsArray = ast.definitions[0].selectionSet.selections;
  const primaryFieldResponseObject = {};
  for (const primaryField of primaryFieldsArray) {
    console.log("primaryField: ", primaryField);

    const hashName =
      primaryField.name.value +
      JSON.stringify(primaryField.arguments) +
      JSON.stringify(primaryField.directives);
    const responseKeyName = primaryField.alias
      ? primaryField.alias.value
      : primaryField.name.value;

    let fieldsArray = primaryField.selectionSet.selections;
    console.log("fieldsArray", fieldsArray);
    const retrievedArray = await cacheReadList(hashName);
    if (retrievedArray.length === 0) return undefined;
    const entry = await rebuildArrays(retrievedArray, fieldsArray);
    if (entry === undefined) return undefined;
    console.log("entry: ", entry);
    console.log("post-entry");
    console.log(responseKeyName, ": ", entry);

    primaryFieldResponseObject[responseKeyName] = entry;
  }

  const rebuiltResponse = { data: primaryFieldResponseObject };
  console.log("mostest importantest", rebuiltResponse);
  return rebuiltResponse;
  //console.log({data:{...}})
};

const rebuildArrays = async (cachedArray, queryArray) => {
  const returnArray = [];
  for (const cachedObject of cachedArray) {
    const returnObject = {};
    console.log(
      "this is cachedObject in rebuildArrays outer loop: ",
      cachedObject
    );
    for (const queryField of queryArray) {
      const fieldValue = await cacheReadObject(
        cachedObject,
        queryField.name.value
      );
      if (fieldValue === undefined) return undefined;
      console.log(`In ${cachedObject}. ${queryField.name.value} :`, fieldValue);
      if (Array.isArray(fieldValue)) {
        console.log(fieldValue, " should be an array");
        console.log(
          queryField.selectionSet.selections,
          " should exist and be an array"
        );
        //returnObject[queryField.name.value]=fieldValue;
        returnObject[queryField.name.value] = await rebuildArrays(
          fieldValue,
          queryField.selectionSet.selections
        );
        if (returnObject[queryField.name.value].length === 0) return undefined;
      } else {
        console.log(fieldValue, "shouldn't be an array");
        if (queryField.selectionSet == undefined) {
          console.log("this is good");
          returnObject[queryField.name.value] = fieldValue;
        } else {
          //insert error functionality here
          console.log("this is bad");
        }
      }
    }
    console.log("this is probably important: ");
    console.log(returnObject);
    returnArray.push(returnObject);
  }
  console.log("this is probably critical: ");
  console.log(returnArray);
  return returnArray;
};

// let boop = await cacheReadList("actors[][]sddsfdsf")
// console.log("Gotta know what comes back:", boop);
let query1rebuilt = await rebuildFromQuery(testsObj.query1.query);
console.log("Did we do it?", query1rebuilt);
