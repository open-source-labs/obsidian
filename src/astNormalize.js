/** @format */

//this where some normilizaiton of the result comes in so we can be normal
import { gql } from "https://deno.land/x/oak_graphql/mod.ts";
import { print, visit } from "https://deno.land/x/graphql_deno/mod.ts";
import { redisdb } from "./quickCache.js";
import testsObj from "../queries.js";

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


const cacheReadList = async (hash) => {
  //we gotta get the list lubed up and ready for action
  //await redisdb.lrange(hash, 0, -1);
  let redisList = await redisdb.lrange(hash, 0, -1);
  console.log("CachedArray", redisList);
  let cachedArray = redisList.map((element) => JSON.parse(element));
  // console.log(cachedArray);
  return cachedArray;
};


const cacheWriteObject = async (hash, obj) => {
  let entries = Object.entries(obj).flat();
  entries = entries.map((entry) => JSON.stringify(entry));
  console.log("Entries", entries);
  await redisdb.hset(hash, ...entries);
};

const cacheReadObject = async (hash,field) => {
  if(field){
      let returnValue = await redisdb.hget(hash,JSON.stringify(field));
      console.log("do thing",returnValue)
      if(returnValue===undefined) return undefined;
      return JSON.parse(returnValue);
  }
  else{

  let objArray = await redisdb.hgetall(hash);
  if(objArray.length==0) return undefined;
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
//remember to export
//ur not my supervisor

export async function normalizeResult(
  gqlResponse,
  idArray = ["id", "__typename"]
) {
  const recursiveObjectHashStore = (object, uniqueArray) => {
    const keys = Object.keys(object);
    console.log("keys", keys);
    const isHashable = uniqueArray.every((element) => keys.includes(element));
    console.log("isHashable", isHashable);
    if (isHashable) {
      let hash = "";
      console.log("uniqueArray before forEach", uniqueArray);
      uniqueArray.forEach((id) => (hash = hash + "~" + object[id]));
      console.log("SHOULD BE UNIQUE: ", hash);
      const returnObject = {};
      keys.forEach((key) => {
        // if (!uniqueArray.includes(key)) {
        if (Array.isArray(object[key])) {
          //returnObject[hash] = {};
          console.log("returnObject[hash]", returnObject[hash]);
          returnObject[hash][key] = [];
          object[key].forEach((element) => {
            returnObject[hash][key].push(
              recursiveObjectHashStore(element, uniqueArray)
            );
          });
        } else if (typeof object[key] == "object") {
          //returnObject[hash] = {};
          returnObject[hash][key] = recursiveObjectHashStore(
            object[key],
            uniqueArray
          );
        } else {
          console.log("CHECKIT", returnObject);
          if (!returnObject[hash]) {
            returnObject[hash] = {};
          }

          console.log(
            "1returnObject[hash]",
            returnObject,
            "hash",
            hash,
            "key",
            key
          );
          returnObject[hash][key] = object[key];
          console.log("2returnObject[hash]", returnObject[hash], "hash", hash);
        }
        console.log("returnObject", returnObject);
        //console.log("desired object", [...returnObject]);
        //return returnObject;
        //returnObject[hash] -> is the object we eventually want to return?
        //}
      });
      console.log("Right before return line 56", returnObject);

      //here is where you store it in redis to store the nested info into keys
      cacheWriteObject(hash, Object.values(returnObject)[0]);
      //here is where
      return Object.keys(returnObject)[0];
    } else {
      //if object isn't hashable
      let returnObject = {};
      Object.keys(object).forEach((key) => {
        if (Array.isArray(object[key])) {
          //returnObject = {};
          console.log("returnObject[hash]", returnObject);
          returnObject[key] = [];
          object[key].forEach((element) => {
            returnObject[key].push(
              recursiveObjectHashStore(element, uniqueArray)
            );
          });
        } else if (typeof object[key] == "object") {
          //returnObject = {};
          returnObject[key] = recursiveObjectHashStore(
            object[key],
            uniqueArray
          );
        } else {
          //returnObject = {};
          returnObject[key] = object[key];
        }
        console.log("returnObject", returnObject);
      });
      return returnObject;
    }
    //define hash from idArray (loop through, concatenate all items into one string)
    //define query hash from name,

    //think about whether leave and enter need to be different to track the things

    console.log("inside normalizeResult");
    //console.log("normalizeResult", "Query", query, "GQLresponse", gqlResponse);

    // need to move down
  };

  return await recursiveObjectHashStore(gqlResponse, idArray);
}

const cachePrimaryFields = async (normalizedResult, queryString) => {
  const ast = gql(queryString);
  console.log("WHOOOOA DADDY!");
  //console.log(ast);
  const primaryFieldsArray = ast.definitions[0].selectionSet.selections;

  console.log(primaryFieldsArray);
  console.log("ENDDDD DADDY!");
  const expectedResultKeys = [];
  const objectOfShitToHash = {};
    for (const primaryField of primaryFieldsArray) {
    let title;
    if (primaryField.alias) {
      title = primaryField.alias.value;
    } else {
      title = primaryField.name.value;
    }
    expectedResultKeys.push(title);
    //console.log("NARWHAL", title);
    let hashName = "";
    hashName =
      hashName +
      primaryField.name.value +
      JSON.stringify(primaryField.arguments) +
      JSON.stringify(primaryField.directives);
    console.log("AINT GOT NOTTINGHAM FOREST", hashName);
    objectOfShitToHash[hashName] = normalizedResult.data[title];
    await cacheWriteList(hashName, normalizedResult.data[title]);
    console.log("waiting");
  };
  console.log(expectedResultKeys);
  console.log("SOOOPER USEFUL", objectOfShitToHash);

  return objectOfShitToHash;
};


const testing = async()=>{
const putin = {
  data: {
    Scifi: [ "~7~Movie", "~15~Movie", "~17~Movie" ],
    Adventure: [ "~3~Movie", "~8~Movie", "~9~Movie", "~21~Movie" ],
    actors: [ "~1~Actor", "~2~Actor" ]
  }
}
 const resultyface =  await normalizeResult(testsObj.resp2);
console.log("This is what we really return", resultyface);
// await cachePrimaryFields(putin, testsObj.query2.query);
const testingCPF = await cachePrimaryFields(resultyface, testsObj.query2.query);

console.log("--------------------------------testingCPF", testingCPF);
//const somehashes = Object.keys(testingCPF);
const theoreticalHash2 = Object.keys(testingCPF)[0];
console.log("theoreticalHash2", theoreticalHash2);
console.log("Be Fast!");
// await cacheReadList(theoreticalHash2);
console.log("BE QUICK!");

console.log("this should be something", await cacheReadList(theoreticalHash2));
// console.log("whatwhut", await what);
// console.log("")
//console.log("here we go", y);
let stoker =
  'actors[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"film"},"value":{"kind":"IntValue","value":"1"}}]}}][{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"BooleanValue","value":true}}]},{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"BooleanValue","value":false}}]}]';
let what = await cacheReadList(stoker);
console.log("what", await what);
}
const prime = async (resp,query)=>{

const normal = await normalizeResult(resp);
await cachePrimaryFields(normal,query)
}
await prime(testsObj.resp1, testsObj.query1.query);