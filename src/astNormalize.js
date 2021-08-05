/** @format */

//this where some normilizaiton of the result comes in so we can be normal
import { gql } from "https://deno.land/x/oak_graphql/mod.ts";
import { print, visit } from "https://deno.land/x/graphql_deno/mod.ts";
import { redisdb } from "./quickCache.js";

//graphql response is going to be in JSON;
// this is for breaking up AST feilds/parts into the hash
// and taking the response and pairing the resp info with hash

//idArray so they can define hash nomenclature
const cacheWriteObject = async (hash, obj) => {
  let entries = Object.entries(obj).flat();
  entries = entries.map((entry) => JSON.stringify(entry));
  console.log("Entries", entries);
  await redisdb.hset(hash, ...entries);
};

const cacheReadObject = async (hash) => {
  let objArray = await redisdb.hgetall(hash);
  objArray = objArray.map((entry) => JSON.parse(entry));
  console.log(objArray);

  if (objArray.length % 2 !== 0) {
    console.log("uneven number of keys and values in ", hash);
    return undefined;
  }
  let returnObj = {};
  for (let i = 0; i < objArray.length; i += 2) {
    returnObj[objArray[i]] = objArray[i + 1];
  }
  console.log("returnObj:", returnObj);
  return returnObj;
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

  return recursiveObjectHashStore(gqlResponse, idArray);
}

let test1 = {
  data: {
    movies: [
      {
        id: "7",
        __typename: "Movie",
        title: "Ad Astra",
        releaseYear: 2019,
        genre: "SCIFI",
      },
      {
        id: "15",
        __typename: "Movie",
        title: "World War Z",
        releaseYear: 2013,
        genre: "SCIFI",
      },
      {
        id: "17",
        __typename: "Movie",
        title: "Sky Captain and the World of Tomorrow",
        releaseYear: 2004,
        genre: "SCIFI",
      },
    ],
  },
};

let test2 = {
  data: {
    movies: [
      {
        id: "7",
        __typename: "Movie",
        title: "Ad Astra",
        releaseYear: 2019,
        genre: "SCIFI",
        actors: [
          {
            id: "1",
            __typename: "Actor",
            nickname: "BradyMcBradFace",
            lastName: "Pitt",
          },
          {
            id: "14",
            __typename: "Actor",
            firstName: "Tommy Lee",
            lastName: "Jones",
          },
        ],
      },
      {
        id: "15",
        __typename: "Movie",
        title: "World War Z",
        releaseYear: 2013,
        genre: "SCIFI",
        actors: [
          {
            id: "1",
            __typename: "Actor",
            firstName: "Brad",
            lastName: "Pitt",
          },
        ],
      },
      {
        id: "17",
        __typename: "Movie",
        title: "Sky Captain and the World of Tomorrow",
        releaseYear: 2004,
        genre: "SCIFI",
        actors: [
          {
            id: "2",
            __typename: "Actor",
            firstName: "Angelina",
            lastName: "Jolie",
          },
          {
            id: "25",
            __typename: "Actor",
            firstName: "Jude",
            lastName: "Law",
          },
          {
            id: "26",
            __typename: "Actor",
            firstName: "Gwyneth",
            lastName: "Paltrow",
          },
        ],
      },
    ],
  },
};
const resultyface = await normalizeResult(test2);
console.log("This is what we realy return", resultyface);
const readdat = await cacheReadObject("~2~Actor");
console.log(readdat);
//console.log(JSON.stringify(await normalizeResult(test2, ["id", "__typename"])));

/*
    
*/
