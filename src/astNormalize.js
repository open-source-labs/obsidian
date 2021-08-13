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
  console.log("____array", array);
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
//remember to export
//ur not my supervisor

export async function normalizeResult(
  gqlResponse,
  map,
  idArray = ["id", "__typename"]
) {
  const recursiveObjectHashStore = (object, uniqueArray, map) => {
    console.log("-+-+-+", object);
    //const nullObj = "null";
    if (object == null) object = {};

    const keys = Object.keys(object);
    console.log("__Object", object);
    console.log("keys", keys);
    console.log("__uniqueArray", uniqueArray);
    const isHashable = uniqueArray.every((element) => keys.includes(element));
    console.log("isHashable", isHashable);
    if (isHashable) {
      let hash = "";
      console.log("uniqueArray before forEach", uniqueArray);
      uniqueArray.forEach((id) => (hash = hash + "~" + object[id]));
      console.log("SHOULD BE UNIQUE: ", hash);
      const returnObject = {};
      console.log("this da map", map);
      keys.forEach((key) => {
        // if (!uniqueArray.includes(key)) {
        if (Array.isArray(object[key])) {
          //returnObject[hash] = {};

          console.log("returnObject[hash]", returnObject[hash]);
          returnObject[hash][map[key]] = [];
          object[key].forEach((element) => {
            //tring to put null back in

            returnObject[hash][map[key]].push(
              recursiveObjectHashStore(element, uniqueArray, map)
            );
          });
        } else if (typeof object[key] == "object" && object[key] !== null) {
          //returnObject[hash] = {};
          console.log("in the pasta", map[key], object[key]);
          returnObject[hash][map[key]] = recursiveObjectHashStore(
            object[key],
            uniqueArray,
            map
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
          console.log("in the pasta", map[key], object[key]);
          returnObject[hash][map[key]] = object[key];
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
          returnObject[map[key]] = [];
          object[key].forEach((element) => {
            returnObject[map[key]].push(
              recursiveObjectHashStore(element, uniqueArray, map)
            );
          });
        } else if (typeof object[key] == "object") {
          //returnObject = {};
          returnObject[map[key]] = recursiveObjectHashStore(
            object[key],
            uniqueArray,
            map
          );
        } else {
          //returnObject = {};
          console.log("console to beat all", object[key]);
          returnObject[map[key]] = object[key];
        }
        console.log("returnObject", returnObject);
      });
      ////////

      return returnObject;
    }
    //define hash from idArray (loop through, concatenate all items into one string)
    //define query hash from name,

    //think about whether leave and enter need to be different to track the things

    console.log("inside normalizeResult");
    //console.log("normalizeResult", "Query", query, "GQLresponse", gqlResponse);

    // need to move down
  };

  return await recursiveObjectHashStore(gqlResponse, idArray, map);
}

export const cachePrimaryFields = async (
  normalizedResult,
  queryString,
  map
) => {
  let ast = gql(queryString);
  //ast = gql(print(visit(ast, { leave: rebuildInlinesVisitor })));
  console.log("WHOOOOA DADDY!");
  //console.log(ast);
  const primaryFieldsArray = ast.definitions[0].selectionSet.selections;

  console.log(primaryFieldsArray);
  console.log("ENDDDD DADDY!");

  const expectedResultKeys = [];
  const objectOfShitToHash = {};
  for (const primaryField of primaryFieldsArray) {
    let title = primaryField.name.value;
    console.log("this one title we lookingfor", title);
    // if (primaryField.alias) {
    //   title = primaryField.alias.value;
    // } else {
    //   title = primaryField.name.value;
    //   console.log("_____title", title);
    // }
    expectedResultKeys.push(title);
    //console.log("NARWHAL", title);
    let hashName = "";
    hashName =
      hashName +
      primaryField.name.value +
      JSON.stringify(primaryField.arguments) +
      JSON.stringify(primaryField.directives);
    console.log("AINT GOT NOTTINGHAM FOREST", hashName);
    console.log("normalizedResult.data", normalizedResult.data);
    objectOfShitToHash[hashName] = normalizedResult.data[map[title]];
    console.log(
      "____objectOfShitToHash",
      objectOfShitToHash,
      "___normalized",
      normalizedResult.data[primaryField.name.value]
    );
    if (!Array.isArray(normalizedResult.data[primaryField.name.value])) {
      normalizedResult.data[primaryField.name.value] = [
        normalizedResult.data[primaryField.name.value],
      ];
      console.log("()()()", normalizedResult.data[primaryField.name.value]);
    }
    await cacheWriteList(
      hashName,
      normalizedResult.data[primaryField.name.value]
    );
    console.log("waiting");
  }
  console.log(expectedResultKeys);
  console.log("SOOOPER USEFUL", objectOfShitToHash);

  return objectOfShitToHash;
};

// const testing = async () => {
//   const putin = {
//     data: {
//       Scifi: ["~7~Movie", "~15~Movie", "~17~Movie"],
//       Adventure: ["~3~Movie", "~8~Movie", "~9~Movie", "~21~Movie"],
//       actors: ["~1~Actor", "~2~Actor"],
//     },
//   };
//   const resultyface = await normalizeResult(testsObj.resp2);
//   console.log("This is what we really return", resultyface);
//   // await cachePrimaryFields(putin, testsObj.query2.query);
//   const testingCPF = await cachePrimaryFields(
//     resultyface,
//     testsObj.query2.query
//   );

//   console.log("--------------------------------testingCPF", testingCPF);
//   //const somehashes = Object.keys(testingCPF);
//   const theoreticalHash2 = Object.keys(testingCPF)[0];
//   console.log("theoreticalHash2", theoreticalHash2);
//   console.log("Be Fast!");
//   // await cacheReadList(theoreticalHash2);
//   console.log("BE QUICK!");

//   console.log(
//     "this should be something",
//     await cacheReadList(theoreticalHash2)
//   );
//   // console.log("whatwhut", await what);
//   // console.log("")
//   //console.log("here we go", y);
//   let stoker =
//     'actors[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"film"},"value":{"kind":"IntValue","value":"1"}}]}}][{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"BooleanValue","value":true}}]},{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"BooleanValue","value":false}}]}]';
//   let what = await cacheReadList(stoker);
//   console.log("what", await what);
// };
// const prime = async (resp, query) => {
//   const normal = await normalizeResult(resp);
//   await cachePrimaryFields(normal, query);
// };
// await prime(testsObj.resp1, testsObj.query1.query);
const rebuildInlinesVisitor = {
  InlineFragment: (node) => {
    console.log("^^^^", node);
    console.log(node.selectionSet.selections[0].name);
    return node.selectionSet.selections;
  },
};
