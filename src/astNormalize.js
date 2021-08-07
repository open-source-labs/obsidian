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
};

// const cacheReadList = async (hash) => {
//   let cachedArray = await redisdb.lrange(hash, 0, -1);
//   //console.log("CachedArray", cachedArray);
//   cachedArray = cachedArray.map((element) => JSON.parse(element));
//   console.log(cachedArray);
//   return cachedArray;
// };

// had to change cacheReadList a bit so it completed its promise
async function cacheReadList(hash) {
  let redisList = await redisdb.lrange(hash, 0, -1);
  //console.log("CachedArray", cachedArray);
  let cachedArray = await redisList.map((element) => JSON.parse(element));
  //console.log(cachedArray);
  return cachedArray;
}

const cacheWriteObject = async (hash, obj) => {
  let entries = Object.entries(obj).flat();
  entries = entries.map((entry) => JSON.stringify(entry));
  console.log("Entries", entries);
  await redisdb.hset(hash, ...entries);
};

const cacheReadObject = async (hash) => {
  let objArray = await redisdb.hgetall(hash);
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
            firstName: "BradyMcBradFace",
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

let test3 = {
  data: {
    Scifi: [
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
            firstName: "Brad",
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
    Adventure: [
      {
        id: "3",
        __typename: "Movie",
        title: "Troy",
        releaseYear: 2004,
        genre: "ADVENTURE",
        actors: [
          {
            id: "1",
            __typename: "Actor",
            firstName: "Brad",
            lastName: "Pitt",
          },
          {
            id: "6",
            __typename: "Actor",
            firstName: "Orlando",
            lastName: "Bloom",
          },
        ],
      },
      {
        id: "8",
        __typename: "Movie",
        title: "Maleficient",
        releaseYear: 2014,
        genre: "ADVENTURE",
        actors: [
          {
            id: "2",
            __typename: "Actor",
            firstName: "Angelina",
            lastName: "Jolie",
          },
        ],
      },
      {
        id: "9",
        __typename: "Movie",
        title: "Lara Croft Tomb Raider",
        releaseYear: 2001,
        genre: "ADVENTURE",
        actors: [
          {
            id: "2",
            __typename: "Actor",
            firstName: "Angelina",
            lastName: "Jolie",
          },
          {
            id: "15",
            __typename: "Actor",
            firstName: "Daniel",
            lastName: "Craig",
          },
        ],
      },
      {
        id: "21",
        __typename: "Movie",
        title: "Beowulf",
        releaseYear: 2007,
        genre: "ADVENTURE",
        actors: [
          {
            id: "2",
            __typename: "Actor",
            firstName: "Angelina",
            lastName: "Jolie",
          },
          {
            id: "24",
            __typename: "Actor",
            firstName: "Anthony",
            lastName: "Hopkins",
          },
        ],
      },
    ],
    Funky: [
      {
        id: "1",
        __typename: "Actor",
        firstName: "Brad",
        lastName: "Pitt",
      },
      {
        id: "2",
        __typename: "Actor",
        firstName: "Angelina",
        lastName: "Jolie",
      },
      {
        id: "3",
        __typename: "Actor",
        firstName: "Leonardo",
        lastName: "Dicaprio",
      },
      {
        id: "4",
        __typename: "Actor",
        firstName: "Edward",
        lastName: "Norton",
      },
      {
        id: "5",
        __typename: "Actor",
        firstName: "Helena",
        lastName: "Bonharm Carter",
      },
      {
        id: "6",
        __typename: "Actor",
        firstName: "Orlando",
        lastName: "Bloom",
      },
      {
        id: "7",
        __typename: "Actor",
        firstName: "George",
        lastName: "Clooney",
      },
      {
        id: "8",
        __typename: "Actor",
        firstName: "Matt",
        lastName: "Damon",
      },
      {
        id: "9",
        __typename: "Actor",
        firstName: "Julia",
        lastName: "Roberts",
      },
      {
        id: "10",
        __typename: "Actor",
        firstName: "Margot",
        lastName: "Robbie",
      },
      {
        id: "11",
        __typename: "Actor",
        firstName: "Jonah",
        lastName: "Hill",
      },
      {
        id: "12",
        __typename: "Actor",
        firstName: "Philip",
        lastName: "Seymour Hoffman",
      },
      {
        id: "13",
        __typename: "Actor",
        firstName: "Chris",
        lastName: "Pratt",
      },
      {
        id: "14",
        __typename: "Actor",
        firstName: "Tommy Lee",
        lastName: "Jones",
      },
      {
        id: "15",
        __typename: "Actor",
        firstName: "Daniel",
        lastName: "Craig",
      },
      {
        id: "16",
        __typename: "Actor",
        firstName: "James",
        lastName: "McAvoy",
      },
      {
        id: "17",
        __typename: "Actor",
        firstName: "Morgan",
        lastName: "Freeman",
      },
      {
        id: "18",
        __typename: "Actor",
        firstName: "Nicholas",
        lastName: "Cage",
      },
      {
        id: "19",
        __typename: "Actor",
        firstName: "Jack",
        lastName: "Black",
      },
      {
        id: "20",
        __typename: "Actor",
        firstName: "Dustin",
        lastName: "Hoffman",
      },
      {
        id: "21",
        __typename: "Actor",
        firstName: "Jackie",
        lastName: "Chan",
      },
      {
        id: "22",
        __typename: "Actor",
        firstName: "Seth",
        lastName: "Rogen",
      },
      {
        id: "23",
        __typename: "Actor",
        firstName: "Johnny",
        lastName: "Depp",
      },
      {
        id: "24",
        __typename: "Actor",
        firstName: "Anthony",
        lastName: "Hopkins",
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
      {
        id: "27",
        __typename: "Actor",
        firstName: "Winona",
        lastName: "Ryder",
      },
      {
        id: "28",
        __typename: "Actor",
        firstName: "Sean",
        lastName: "Connery",
      },
    ],
  },
};

const cachePrimaryFields = async (normalizedResult, queryString) => {
  const ast = gql(queryString);
  console.log("WHOOOOA DADDY!");
  //console.log(ast);
  const primaryFieldsArray = ast.definitions[0].selectionSet.selections;

  console.log(primaryFieldsArray);
  console.log("ENDDDD DADDY!");
  const expectedResultKeys = [];
  const objectOfShitToHash = {};
  await primaryFieldsArray.forEach(async (primaryField) => {
    let title;
    if (primaryField.alias) {
      title = primaryField.alias.value;
    } else {
      title = primaryField.name.value;
    }
    expectedResultKeys.push(title);
    console.log("NARWHAL", title);
    let hashName = "";
    hashName =
      hashName +
      primaryField.name.value +
      JSON.stringify(primaryField.arguments) +
      JSON.stringify(primaryField.directives);
    console.log("AINT GOT NOTTINGHAM FOREST", hashName);
    objectOfShitToHash[hashName] = normalizedResult.data[title];
    await cacheWriteList(hashName, normalizedResult.data[title]);
  });
  console.log(expectedResultKeys);
  console.log("SOOOPER USEFUL", objectOfShitToHash);

  return objectOfShitToHash;
};

const resultyface = await normalizeResult(testsObj.resp2);
console.log("This is what we realy return", resultyface);
const testingCPF = await cachePrimaryFields(resultyface, testsObj.query2.query);
console.log("--------------------------------testingCPF", testingCPF);
const somehashes = Object.keys(testingCPF);
const theoreticalHash2 = Object.keys(testingCPF)[0];
console.log("theoreticalHash2", theoreticalHash2);

let x = async () => {
  await cacheReadList(theoreticalHash2);
  console.log(await cacheReadList(theoreticalHash2));
};
x();
console.log("this should be something", await cacheReadList(theoreticalHash2));

// setTimeout(() => {
//   const exampleTest = cacheReadList(theoreticalHash2);
//   // setTimeout(() => {
//   //   console.log("HEY JUDE", exampleTest);
//   // }, 2000);
// }, 2000);
//console.log("parse", JSON.parse('"~1~Actor" "~2~Actor"'));

//const readdat = await cacheReadObject("~7~Movie");
//console.log(readdat);
//console.log(JSON.stringify(await normalizeResult(test2, ["id", "__typename"])));

/*
    
*/
