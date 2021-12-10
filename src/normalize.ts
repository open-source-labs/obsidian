
/* ----------------------------------------------------------------*/

/** containsHashableObject -
 * Returns a boolean indicating that the passed in value contains a hashable object. It must:
 * 1) Be an object
 * 2) Has all hashable keys
 *
 * @param {any} objectInQuestion Object being tested contains hashable object
 * @param {Array<string>} hashableKeys Array of hashable keys
 * @return {boolean} Boolean indicating if objectInQuestion is hashable or not
 */

 export const containsHashableObject = (objectInQuestion: any, hashableKeys: Array<string>):boolean => {
    if(typeof objectInQuestion !== 'object' ||
        Array.isArray(objectInQuestion) ||
        !objectInQuestion
    ) return false;
    const objectInQuestionKeysSet = new Set(Object.keys(objectInQuestion));
    return hashableKeys.every(key => objectInQuestionKeysSet.has(key))
}
// const arrHashableKeys = ['id', '__typename'];
// const containsHashableObjFalse1 =
//   [
//     "id",
//     "__typename"
// ]
// const containsHashableObjFalse2 =
// [
//     {
//         "id": 1,
//         "__typename" : 'Movie'
//     }
// ]
// const containsHashableObjFalse3 =
// {
//     "data": {
//         "id": 1,
//         "__typename" : 'Movie'
//     }
// }
// const containsHashableObjTrue1 = 
// {
//   "id": "11",
//   "__typename": "Movie",
//   "title": "Ad Astra",
//   "thing": { "generic": "thing" }
// }
// const containsHashableObjTrue2 = {
//   "id": "7",
//   "__typename": "Movie",
//   "title": "Ad Astra",
//   "releaseYear": 2019,
//   "genre": "SCIFI",
//   "actors": [
//     {
//       "id": "1",
//       "__typename": "Actor",
//       "firstName": "Brad",
//       "lastName": "Pitt"
//     },
//     {
//       "id": "14",
//       "__typename": "Actor",
//       "firstName": "Tommy Lee",
//       "lastName": "Jones"
//     }
//   ]
// }
// const containsHashableObjTrue3 = {
//   "id": "1",
//   "__typename": "Actor",
//   "firstName": "Brad",
//   "lastName": "Pitt",
//   "movies": ["Ad Astra", "Fight Club"]
// }
// console.log(containsHashableObject(containsHashableObjFalse1, arrHashableKeys));
// console.log(containsHashableObject(containsHashableObjFalse2, arrHashableKeys));
// console.log(containsHashableObject(containsHashableObjFalse3, arrHashableKeys));
// console.log(containsHashableObject(containsHashableObjTrue1, arrHashableKeys));
// console.log(containsHashableObject(containsHashableObjTrue2, arrHashableKeys));
// console.log(containsHashableObject(containsHashableObjTrue3, arrHashableKeys));
/* ----------------------------------------------------------------*/

/* ----------------------------------------------------------------*/
/** isHashableObject - 
 * Returns a boolean indicating that the passed in value is hashable. It must:
 * 1) Contain hashable object
 * 2) Does not have any nesting (i.e., contains no objects or array values)
 *
 * @param {any} objectInQuestion Object being tested if hashable
 * @param {Array<string>} hashableKeys Array of hashable keys
 * @return {boolean} Boolean indicating if objectInQuestion is hashable or not
 */
export const isHashableObject = (objectInQuestion: any, hashableKeys: Array<string>): boolean => {
  if (!containsHashableObject(objectInQuestion, hashableKeys)) return false;
  for (const key in objectInQuestion) {
    if (typeof objectInQuestion[key] === 'object') return false;
  }
  return true;
}

// const isHashableObjFalse1 =
//   [
//     "id",
//     "__typename"
//   ]
// const isHashableObjFalse2 =
// {
//   "id": "11",
//   "__typename": "Movie",
//   "title": "Ad Astra",
//   "thing": { "generic": "thing" }
// }
// const isHashableObjTrue1 =
// {
//   "id": "7",
//   "__typename": "Movie",
//   "title": "Ad Astra",
//   "releaseYear": 2019,
//   "genre": "SCIFI"
// }
// const isHashableObjTrue2 =
// {
//   "id": "1",
//   "__typename": "Actor",
//   "firstName": "Brad",
//   "lastName": "Pitt"
// }

// console.log(isHashableObject(isHashableObjFalse1, arrHashableKeys));
// console.log(isHashableObject(isHashableObjFalse2, arrHashableKeys));
// console.log(isHashableObject(isHashableObjTrue1, arrHashableKeys));
// console.log(isHashableObject(isHashableObjTrue2, arrHashableKeys));
/* ----------------------------------------------------------------*/





/* ----------------------------------------------------------------*/
export type GenericObject = { [key:string]: any};
type FlatObject = { [key:string]: (string | number | boolean)};
/** hashMaker -
 * Creates unique hash string for an object with hashable keys with hashable object passed in
 *
 * @param {FlatObject} hashableObject Object that is hashable 
 * @param {Array<string>} hashableKeys Array of hashable keys
 * @return {ArrayOfObjects} Array of normalized objects
 */
export const hashMaker = (hashableObject: FlatObject, hashableKeys:Array<string>):string => {   
    let hash = '';
    let value = '';
    for(const hashableKey of hashableKeys){
        value = '~';
        value += hashableObject[hashableKey]
        hash += value;
    }
    return hash;
}
// const hashMaker1 = {'id': 7, '__typename': 'Movie', 'title': 'Ad Astra', 'releaseYear': 2019, 'genre': 'SCIFI'}
// const hashMaker2 = { 'id': 1, '__typename': 'Actor', 'firstName': 'Brad', 'lastName': 'Pitt' }
// console.log(hashMaker(hashMaker1, arrHashableKeys));
// console.log(hashMaker(hashMaker2, arrHashableKeys));
// console.log(hashMaker(isHashableObjFalse1, arrHashableKeys));
/* ----------------------------------------------------------------*/






/* ----------------------------------------------------------------*/
/** printHashableObject -
 * Creates a hashable object from an object that contains a hashable object. Does not print hashable object 
 * 
 * @param {FlatObject} containsHashableObject Object that is hashable 
 * @return {GenericObject} A hashable object
 */
export const printHashableObject = (containsHashableObject: GenericObject):GenericObject => {
    const hashObj:GenericObject = {};
    for(const key in containsHashableObject){
        if(typeof containsHashableObject[key] !== 'object' && !hashObj.hasOwnProperty(key)) hashObj[key] = containsHashableObject[key];
    }
    return hashObj;
}
/* ----------------------------------------------------------------*/
// console.log(printHashableObject(containsHashableObjTrue1));
// console.log(printHashableObject(containsHashableObjTrue2));
// console.log(printHashableObject(containsHashableObjTrue3));
/* ----------------------------------------------------------------*/






/* ----------------------------------------------------------------*/

/**
 * Recursively flattens an arbitrarily nested object into an objects with hash key and hashable object pairs
 * 
 * For each key in object (typeof === 'object', meaning it can be array):
 * 
 * 1) If current object contains hashable object and if it hasn't printed already,
 * it prints a hashable object and makes its associated hash. If hash doesn't exist in normalizedHashableObjects,
 * it adds hash key and hashable object pair.
 * 
 * 2) If the value at the current key is an object (typeof === 'object', meaning it can be array), it recursively
 * calls normalizeObject with the value passed in. This recursive calls goes inside arbitrary nesting.
 * 
 * 3) Return normalizedHashableObjects. In the outer most execution context, this will return the output of the function.
 * In inner execution contexts, this will return that execution context's normalizedHashableObjects.
 * 
 * @param {GenericObject} nestedObject Nested object
 * @param {Array<string>} hashableKeys Array of hashable keys 
 * @return {FlatObject} Normalized object with hash keys and hashable object pairs
 */
export const normalizeObject = (nestedObject: GenericObject, hashableKeys:Array<string>, normalizedHashableObjects:GenericObject = {}):GenericObject => {
    let hasAlreadyPrinted = false;
    for(const key in nestedObject){    
        if(containsHashableObject(nestedObject, hashableKeys) && hasAlreadyPrinted === false){
            hasAlreadyPrinted = true;
            const hashableObject = printHashableObject(nestedObject);
            const hash = hashMaker(hashableObject, hashableKeys);
            if(!normalizedHashableObjects.hasOwnProperty(hash)) normalizedHashableObjects[hash] = hashableObject;
        }
        if(typeof nestedObject[key] === 'object') normalizeObject(nestedObject[key], hashableKeys, normalizedHashableObjects);
    }
    return normalizedHashableObjects;
}

// const scifiMovies = {
//     "data": {
//         "movies": [
//              {
//                 "id": "7",
//                 "__typename": "Movie",
//                 "title": "Ad Astra",
//                 "releaseYear": 2019,
//                 "genre": "SCIFI",
//                 "actors": [
//                     {
//                         "id": "1",
//                         "__typename": "Actor",
//                         "firstName": "Brad",
//                         "lastName": "Pitt"
//                     },
//                     {
//                         "id": "14",
//                         "__typename": "Actor",
//                         "firstName": "Tommy Lee",
//                         "lastName": "Jones"
//                     }
//                 ]
//             },
//             {
//                 "id": "15",
//                 "__typename": "Movie",
//                 "title": "World War Z",
//                 "releaseYear": 2013,
//                 "genre": "SCIFI",
//                 "actors": [
//                     {
//                         "id": "1",
//                         "__typename": "Actor",
//                         "firstName": "Brad",
//                         "lastName": "Pitt"
//                     }
//                 ]
//             },
//             {
//                 "id": "17",
//                 "__typename": "Movie",
//                 "title": "Sky Captain and the World of Tomorrow",
//                 "releaseYear": 2004,
//                 "genre": "SCIFI",
//                 "actors": [
//                     {
//                         "id": "2",
//                         "__typename": "Actor",
//                         "firstName": "Angelina",
//                         "lastName": "Jolie"
//                     },
//                     {
//                         "id": "25",
//                         "__typename": "Actor",
//                         "firstName": "Jude",
//                         "lastName": "Law"
//                     },
//                     {
//                         "id": "26",
//                         "__typename": "Actor",
//                         "firstName": "Gwyneth",
//                         "lastName": "Paltrow"
//                     }
//                 ]
//             }
//         ]
//     }
// }
// console.log(normalizeObject(scifiMovies, arrHashableKeys))
// const scifiMoviesLenTest = normalizeObject(scifiMovies, arrHashableKeys);
// console.log(Object.keys(scifiMoviesLenTest).length)

// const allMovies =
//     {
//         "data": {
//           "movies": [
//             {
//               "id": "7",
//               "__typename": "Movie",
//               "title": "Ad Astra",
//               "releaseYear": 2019,
//               "genre": "SCIFI",
//               "actors": [
//                 {
//                   "id": "1",
//                   "__typename": "Actor",
//                   "firstName": "Brad",
//                   "lastName": "Pitt",
//                   "movies": [
//                     {
//                       "id": "1",
//                       "__typename": "Movie",
//                       "title": "Mr. and Mrs. Smith",
//                       "releaseYear": 2005,
//                       "genre": "COMEDY",
//                       "actors": [
//                         {
//                           "id": "1",
//                           "__typename": "Actor",
//                           "firstName": "Brad",
//                           "lastName": "Pitt",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "3",
//                               "__typename": "Movie",
//                               "title": "Troy",
//                               "releaseYear": 2004,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "6",
//                                   "__typename": "Actor",
//                                   "firstName": "Orlando",
//                                   "lastName": "Bloom"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "15",
//                               "__typename": "Movie",
//                               "title": "World War Z",
//                               "releaseYear": 2013,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "2",
//                           "__typename": "Actor",
//                           "firstName": "Angelina",
//                           "lastName": "Jolie",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "8",
//                               "__typename": "Movie",
//                               "title": "Maleficient",
//                               "releaseYear": 2014,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "9",
//                               "__typename": "Movie",
//                               "title": "Lara Croft Tomb Raider",
//                               "releaseYear": 2001,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "15",
//                                   "__typename": "Actor",
//                                   "firstName": "Daniel",
//                                   "lastName": "Craig"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "10",
//                               "__typename": "Movie",
//                               "title": "Wanted",
//                               "releaseYear": 2008,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "16",
//                                   "__typename": "Actor",
//                                   "firstName": "James",
//                                   "lastName": "McAvoy"
//                                 },
//                                 {
//                                   "id": "17",
//                                   "__typename": "Actor",
//                                   "firstName": "Morgan",
//                                   "lastName": "Freeman"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "11",
//                               "__typename": "Movie",
//                               "title": "Salt",
//                               "releaseYear": 2010,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "12",
//                               "__typename": "Movie",
//                               "title": "Gone in 60 Seconds",
//                               "releaseYear": 2000,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "18",
//                                   "__typename": "Actor",
//                                   "firstName": "Nicholas",
//                                   "lastName": "Cage"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "14",
//                               "__typename": "Movie",
//                               "title": "The Tourist",
//                               "releaseYear": 2010,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "23",
//                                   "__typename": "Actor",
//                                   "firstName": "Johnny",
//                                   "lastName": "Depp"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "18",
//                               "__typename": "Movie",
//                               "title": "Girl, Interrupted",
//                               "releaseYear": 1999,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "27",
//                                   "__typename": "Actor",
//                                   "firstName": "Winona",
//                                   "lastName": "Ryder"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "19",
//                               "__typename": "Movie",
//                               "title": "Playing By Heart",
//                               "releaseYear": 1998,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "28",
//                                   "__typename": "Actor",
//                                   "firstName": "Sean",
//                                   "lastName": "Connery"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "21",
//                               "__typename": "Movie",
//                               "title": "Beowulf",
//                               "releaseYear": 2007,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "22",
//                               "__typename": "Movie",
//                               "title": "The Good Shepherd",
//                               "releaseYear": 2006,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "23",
//                               "__typename": "Movie",
//                               "title": "Shark Tale",
//                               "releaseYear": 2004,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "2",
//                       "__typename": "Movie",
//                       "title": "Fight Club",
//                       "releaseYear": 1999,
//                       "genre": "ACTION",
//                       "actors": [
//                         {
//                           "id": "1",
//                           "__typename": "Actor",
//                           "firstName": "Brad",
//                           "lastName": "Pitt",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "3",
//                               "__typename": "Movie",
//                               "title": "Troy",
//                               "releaseYear": 2004,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "6",
//                                   "__typename": "Actor",
//                                   "firstName": "Orlando",
//                                   "lastName": "Bloom"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "15",
//                               "__typename": "Movie",
//                               "title": "World War Z",
//                               "releaseYear": 2013,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "4",
//                           "__typename": "Actor",
//                           "firstName": "Edward",
//                           "lastName": "Norton",
//                           "movies": [
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "5",
//                           "__typename": "Actor",
//                           "firstName": "Helena",
//                           "lastName": "Bonharm Carter",
//                           "movies": [
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "3",
//                       "__typename": "Movie",
//                       "title": "Troy",
//                       "releaseYear": 2004,
//                       "genre": "ADVENTURE",
//                       "actors": [
//                         {
//                           "id": "1",
//                           "__typename": "Actor",
//                           "firstName": "Brad",
//                           "lastName": "Pitt",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "3",
//                               "__typename": "Movie",
//                               "title": "Troy",
//                               "releaseYear": 2004,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "6",
//                                   "__typename": "Actor",
//                                   "firstName": "Orlando",
//                                   "lastName": "Bloom"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "15",
//                               "__typename": "Movie",
//                               "title": "World War Z",
//                               "releaseYear": 2013,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "6",
//                           "__typename": "Actor",
//                           "firstName": "Orlando",
//                           "lastName": "Bloom",
//                           "movies": [
//                             {
//                               "id": "3",
//                               "__typename": "Movie",
//                               "title": "Troy",
//                               "releaseYear": 2004,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "6",
//                                   "__typename": "Actor",
//                                   "firstName": "Orlando",
//                                   "lastName": "Bloom"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "4",
//                       "__typename": "Movie",
//                       "title": "Oceans 11",
//                       "releaseYear": 2001,
//                       "genre": "ACTION",
//                       "actors": [
//                         {
//                           "id": "1",
//                           "__typename": "Actor",
//                           "firstName": "Brad",
//                           "lastName": "Pitt",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "3",
//                               "__typename": "Movie",
//                               "title": "Troy",
//                               "releaseYear": 2004,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "6",
//                                   "__typename": "Actor",
//                                   "firstName": "Orlando",
//                                   "lastName": "Bloom"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "15",
//                               "__typename": "Movie",
//                               "title": "World War Z",
//                               "releaseYear": 2013,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "7",
//                           "__typename": "Actor",
//                           "firstName": "George",
//                           "lastName": "Clooney",
//                           "movies": [
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "8",
//                           "__typename": "Actor",
//                           "firstName": "Matt",
//                           "lastName": "Damon",
//                           "movies": [
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "22",
//                               "__typename": "Movie",
//                               "title": "The Good Shepherd",
//                               "releaseYear": 2006,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "9",
//                           "__typename": "Actor",
//                           "firstName": "Julia",
//                           "lastName": "Roberts",
//                           "movies": [
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "5",
//                       "__typename": "Movie",
//                       "title": "Once Upon a Time in Hollywood",
//                       "releaseYear": 2019,
//                       "genre": "DRAMA",
//                       "actors": [
//                         {
//                           "id": "1",
//                           "__typename": "Actor",
//                           "firstName": "Brad",
//                           "lastName": "Pitt",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "3",
//                               "__typename": "Movie",
//                               "title": "Troy",
//                               "releaseYear": 2004,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "6",
//                                   "__typename": "Actor",
//                                   "firstName": "Orlando",
//                                   "lastName": "Bloom"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "15",
//                               "__typename": "Movie",
//                               "title": "World War Z",
//                               "releaseYear": 2013,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "3",
//                           "__typename": "Actor",
//                           "firstName": "Leonardo",
//                           "lastName": "Dicaprio",
//                           "movies": [
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "10",
//                           "__typename": "Actor",
//                           "firstName": "Margot",
//                           "lastName": "Robbie",
//                           "movies": [
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "6",
//                       "__typename": "Movie",
//                       "title": "Moneyball",
//                       "releaseYear": 2011,
//                       "genre": "DRAMA",
//                       "actors": [
//                         {
//                           "id": "1",
//                           "__typename": "Actor",
//                           "firstName": "Brad",
//                           "lastName": "Pitt",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "3",
//                               "__typename": "Movie",
//                               "title": "Troy",
//                               "releaseYear": 2004,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "6",
//                                   "__typename": "Actor",
//                                   "firstName": "Orlando",
//                                   "lastName": "Bloom"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "15",
//                               "__typename": "Movie",
//                               "title": "World War Z",
//                               "releaseYear": 2013,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "11",
//                           "__typename": "Actor",
//                           "firstName": "Jonah",
//                           "lastName": "Hill",
//                           "movies": [
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "12",
//                           "__typename": "Actor",
//                           "firstName": "Philip",
//                           "lastName": "Seymour Hoffman",
//                           "movies": [
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "13",
//                           "__typename": "Actor",
//                           "firstName": "Chris",
//                           "lastName": "Pratt",
//                           "movies": [
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "7",
//                       "__typename": "Movie",
//                       "title": "Ad Astra",
//                       "releaseYear": 2019,
//                       "genre": "SCIFI",
//                       "actors": [
//                         {
//                           "id": "1",
//                           "__typename": "Actor",
//                           "firstName": "Brad",
//                           "lastName": "Pitt",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "3",
//                               "__typename": "Movie",
//                               "title": "Troy",
//                               "releaseYear": 2004,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "6",
//                                   "__typename": "Actor",
//                                   "firstName": "Orlando",
//                                   "lastName": "Bloom"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "15",
//                               "__typename": "Movie",
//                               "title": "World War Z",
//                               "releaseYear": 2013,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "14",
//                           "__typename": "Actor",
//                           "firstName": "Tommy Lee",
//                           "lastName": "Jones",
//                           "movies": [
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "15",
//                       "__typename": "Movie",
//                       "title": "World War Z",
//                       "releaseYear": 2013,
//                       "genre": "SCIFI",
//                       "actors": [
//                         {
//                           "id": "1",
//                           "__typename": "Actor",
//                           "firstName": "Brad",
//                           "lastName": "Pitt",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "3",
//                               "__typename": "Movie",
//                               "title": "Troy",
//                               "releaseYear": 2004,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "6",
//                                   "__typename": "Actor",
//                                   "firstName": "Orlando",
//                                   "lastName": "Bloom"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "15",
//                               "__typename": "Movie",
//                               "title": "World War Z",
//                               "releaseYear": 2013,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "16",
//                       "__typename": "Movie",
//                       "title": "Legends of the Fall",
//                       "releaseYear": 1994,
//                       "genre": "ROMANCE",
//                       "actors": [
//                         {
//                           "id": "1",
//                           "__typename": "Actor",
//                           "firstName": "Brad",
//                           "lastName": "Pitt",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "3",
//                               "__typename": "Movie",
//                               "title": "Troy",
//                               "releaseYear": 2004,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "6",
//                                   "__typename": "Actor",
//                                   "firstName": "Orlando",
//                                   "lastName": "Bloom"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "15",
//                               "__typename": "Movie",
//                               "title": "World War Z",
//                               "releaseYear": 2013,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "24",
//                           "__typename": "Actor",
//                           "firstName": "Anthony",
//                           "lastName": "Hopkins",
//                           "movies": [
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "21",
//                               "__typename": "Movie",
//                               "title": "Beowulf",
//                               "releaseYear": 2007,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "20",
//                       "__typename": "Movie",
//                       "title": "By the Sea",
//                       "releaseYear": 2015,
//                       "genre": "ROMANCE",
//                       "actors": [
//                         {
//                           "id": "1",
//                           "__typename": "Actor",
//                           "firstName": "Brad",
//                           "lastName": "Pitt",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "3",
//                               "__typename": "Movie",
//                               "title": "Troy",
//                               "releaseYear": 2004,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "6",
//                                   "__typename": "Actor",
//                                   "firstName": "Orlando",
//                                   "lastName": "Bloom"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "15",
//                               "__typename": "Movie",
//                               "title": "World War Z",
//                               "releaseYear": 2013,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "2",
//                           "__typename": "Actor",
//                           "firstName": "Angelina",
//                           "lastName": "Jolie",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "8",
//                               "__typename": "Movie",
//                               "title": "Maleficient",
//                               "releaseYear": 2014,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "9",
//                               "__typename": "Movie",
//                               "title": "Lara Croft Tomb Raider",
//                               "releaseYear": 2001,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "15",
//                                   "__typename": "Actor",
//                                   "firstName": "Daniel",
//                                   "lastName": "Craig"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "10",
//                               "__typename": "Movie",
//                               "title": "Wanted",
//                               "releaseYear": 2008,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "16",
//                                   "__typename": "Actor",
//                                   "firstName": "James",
//                                   "lastName": "McAvoy"
//                                 },
//                                 {
//                                   "id": "17",
//                                   "__typename": "Actor",
//                                   "firstName": "Morgan",
//                                   "lastName": "Freeman"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "11",
//                               "__typename": "Movie",
//                               "title": "Salt",
//                               "releaseYear": 2010,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "12",
//                               "__typename": "Movie",
//                               "title": "Gone in 60 Seconds",
//                               "releaseYear": 2000,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "18",
//                                   "__typename": "Actor",
//                                   "firstName": "Nicholas",
//                                   "lastName": "Cage"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "14",
//                               "__typename": "Movie",
//                               "title": "The Tourist",
//                               "releaseYear": 2010,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "23",
//                                   "__typename": "Actor",
//                                   "firstName": "Johnny",
//                                   "lastName": "Depp"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "18",
//                               "__typename": "Movie",
//                               "title": "Girl, Interrupted",
//                               "releaseYear": 1999,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "27",
//                                   "__typename": "Actor",
//                                   "firstName": "Winona",
//                                   "lastName": "Ryder"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "19",
//                               "__typename": "Movie",
//                               "title": "Playing By Heart",
//                               "releaseYear": 1998,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "28",
//                                   "__typename": "Actor",
//                                   "firstName": "Sean",
//                                   "lastName": "Connery"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "21",
//                               "__typename": "Movie",
//                               "title": "Beowulf",
//                               "releaseYear": 2007,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "22",
//                               "__typename": "Movie",
//                               "title": "The Good Shepherd",
//                               "releaseYear": 2006,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "23",
//                               "__typename": "Movie",
//                               "title": "Shark Tale",
//                               "releaseYear": 2004,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     }
//                   ]
//                 },
//                 {
//                   "id": "14",
//                   "__typename": "Actor",
//                   "firstName": "Tommy Lee",
//                   "lastName": "Jones",
//                   "movies": [
//                     {
//                       "id": "7",
//                       "__typename": "Movie",
//                       "title": "Ad Astra",
//                       "releaseYear": 2019,
//                       "genre": "SCIFI",
//                       "actors": [
//                         {
//                           "id": "1",
//                           "__typename": "Actor",
//                           "firstName": "Brad",
//                           "lastName": "Pitt",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "3",
//                               "__typename": "Movie",
//                               "title": "Troy",
//                               "releaseYear": 2004,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "6",
//                                   "__typename": "Actor",
//                                   "firstName": "Orlando",
//                                   "lastName": "Bloom"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "15",
//                               "__typename": "Movie",
//                               "title": "World War Z",
//                               "releaseYear": 2013,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "14",
//                           "__typename": "Actor",
//                           "firstName": "Tommy Lee",
//                           "lastName": "Jones",
//                           "movies": [
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     }
//                   ]
//                 }
//               ]
//             },
//             {
//               "id": "15",
//               "__typename": "Movie",
//               "title": "World War Z",
//               "releaseYear": 2013,
//               "genre": "SCIFI",
//               "actors": [
//                 {
//                   "id": "1",
//                   "__typename": "Actor",
//                   "firstName": "Brad",
//                   "lastName": "Pitt",
//                   "movies": [
//                     {
//                       "id": "1",
//                       "__typename": "Movie",
//                       "title": "Mr. and Mrs. Smith",
//                       "releaseYear": 2005,
//                       "genre": "COMEDY",
//                       "actors": [
//                         {
//                           "id": "1",
//                           "__typename": "Actor",
//                           "firstName": "Brad",
//                           "lastName": "Pitt",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "3",
//                               "__typename": "Movie",
//                               "title": "Troy",
//                               "releaseYear": 2004,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "6",
//                                   "__typename": "Actor",
//                                   "firstName": "Orlando",
//                                   "lastName": "Bloom"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "15",
//                               "__typename": "Movie",
//                               "title": "World War Z",
//                               "releaseYear": 2013,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "2",
//                           "__typename": "Actor",
//                           "firstName": "Angelina",
//                           "lastName": "Jolie",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "8",
//                               "__typename": "Movie",
//                               "title": "Maleficient",
//                               "releaseYear": 2014,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "9",
//                               "__typename": "Movie",
//                               "title": "Lara Croft Tomb Raider",
//                               "releaseYear": 2001,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "15",
//                                   "__typename": "Actor",
//                                   "firstName": "Daniel",
//                                   "lastName": "Craig"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "10",
//                               "__typename": "Movie",
//                               "title": "Wanted",
//                               "releaseYear": 2008,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "16",
//                                   "__typename": "Actor",
//                                   "firstName": "James",
//                                   "lastName": "McAvoy"
//                                 },
//                                 {
//                                   "id": "17",
//                                   "__typename": "Actor",
//                                   "firstName": "Morgan",
//                                   "lastName": "Freeman"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "11",
//                               "__typename": "Movie",
//                               "title": "Salt",
//                               "releaseYear": 2010,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "12",
//                               "__typename": "Movie",
//                               "title": "Gone in 60 Seconds",
//                               "releaseYear": 2000,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "18",
//                                   "__typename": "Actor",
//                                   "firstName": "Nicholas",
//                                   "lastName": "Cage"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "14",
//                               "__typename": "Movie",
//                               "title": "The Tourist",
//                               "releaseYear": 2010,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "23",
//                                   "__typename": "Actor",
//                                   "firstName": "Johnny",
//                                   "lastName": "Depp"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "18",
//                               "__typename": "Movie",
//                               "title": "Girl, Interrupted",
//                               "releaseYear": 1999,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "27",
//                                   "__typename": "Actor",
//                                   "firstName": "Winona",
//                                   "lastName": "Ryder"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "19",
//                               "__typename": "Movie",
//                               "title": "Playing By Heart",
//                               "releaseYear": 1998,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "28",
//                                   "__typename": "Actor",
//                                   "firstName": "Sean",
//                                   "lastName": "Connery"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "21",
//                               "__typename": "Movie",
//                               "title": "Beowulf",
//                               "releaseYear": 2007,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "22",
//                               "__typename": "Movie",
//                               "title": "The Good Shepherd",
//                               "releaseYear": 2006,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "23",
//                               "__typename": "Movie",
//                               "title": "Shark Tale",
//                               "releaseYear": 2004,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "2",
//                       "__typename": "Movie",
//                       "title": "Fight Club",
//                       "releaseYear": 1999,
//                       "genre": "ACTION",
//                       "actors": [
//                         {
//                           "id": "1",
//                           "__typename": "Actor",
//                           "firstName": "Brad",
//                           "lastName": "Pitt",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "3",
//                               "__typename": "Movie",
//                               "title": "Troy",
//                               "releaseYear": 2004,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "6",
//                                   "__typename": "Actor",
//                                   "firstName": "Orlando",
//                                   "lastName": "Bloom"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "15",
//                               "__typename": "Movie",
//                               "title": "World War Z",
//                               "releaseYear": 2013,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "4",
//                           "__typename": "Actor",
//                           "firstName": "Edward",
//                           "lastName": "Norton",
//                           "movies": [
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "5",
//                           "__typename": "Actor",
//                           "firstName": "Helena",
//                           "lastName": "Bonharm Carter",
//                           "movies": [
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "3",
//                       "__typename": "Movie",
//                       "title": "Troy",
//                       "releaseYear": 2004,
//                       "genre": "ADVENTURE",
//                       "actors": [
//                         {
//                           "id": "1",
//                           "__typename": "Actor",
//                           "firstName": "Brad",
//                           "lastName": "Pitt",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "3",
//                               "__typename": "Movie",
//                               "title": "Troy",
//                               "releaseYear": 2004,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "6",
//                                   "__typename": "Actor",
//                                   "firstName": "Orlando",
//                                   "lastName": "Bloom"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "15",
//                               "__typename": "Movie",
//                               "title": "World War Z",
//                               "releaseYear": 2013,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "6",
//                           "__typename": "Actor",
//                           "firstName": "Orlando",
//                           "lastName": "Bloom",
//                           "movies": [
//                             {
//                               "id": "3",
//                               "__typename": "Movie",
//                               "title": "Troy",
//                               "releaseYear": 2004,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "6",
//                                   "__typename": "Actor",
//                                   "firstName": "Orlando",
//                                   "lastName": "Bloom"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "4",
//                       "__typename": "Movie",
//                       "title": "Oceans 11",
//                       "releaseYear": 2001,
//                       "genre": "ACTION",
//                       "actors": [
//                         {
//                           "id": "1",
//                           "__typename": "Actor",
//                           "firstName": "Brad",
//                           "lastName": "Pitt",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "3",
//                               "__typename": "Movie",
//                               "title": "Troy",
//                               "releaseYear": 2004,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "6",
//                                   "__typename": "Actor",
//                                   "firstName": "Orlando",
//                                   "lastName": "Bloom"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "15",
//                               "__typename": "Movie",
//                               "title": "World War Z",
//                               "releaseYear": 2013,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "7",
//                           "__typename": "Actor",
//                           "firstName": "George",
//                           "lastName": "Clooney",
//                           "movies": [
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "8",
//                           "__typename": "Actor",
//                           "firstName": "Matt",
//                           "lastName": "Damon",
//                           "movies": [
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "22",
//                               "__typename": "Movie",
//                               "title": "The Good Shepherd",
//                               "releaseYear": 2006,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "9",
//                           "__typename": "Actor",
//                           "firstName": "Julia",
//                           "lastName": "Roberts",
//                           "movies": [
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "5",
//                       "__typename": "Movie",
//                       "title": "Once Upon a Time in Hollywood",
//                       "releaseYear": 2019,
//                       "genre": "DRAMA",
//                       "actors": [
//                         {
//                           "id": "1",
//                           "__typename": "Actor",
//                           "firstName": "Brad",
//                           "lastName": "Pitt",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "3",
//                               "__typename": "Movie",
//                               "title": "Troy",
//                               "releaseYear": 2004,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "6",
//                                   "__typename": "Actor",
//                                   "firstName": "Orlando",
//                                   "lastName": "Bloom"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "15",
//                               "__typename": "Movie",
//                               "title": "World War Z",
//                               "releaseYear": 2013,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "3",
//                           "__typename": "Actor",
//                           "firstName": "Leonardo",
//                           "lastName": "Dicaprio",
//                           "movies": [
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "10",
//                           "__typename": "Actor",
//                           "firstName": "Margot",
//                           "lastName": "Robbie",
//                           "movies": [
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "6",
//                       "__typename": "Movie",
//                       "title": "Moneyball",
//                       "releaseYear": 2011,
//                       "genre": "DRAMA",
//                       "actors": [
//                         {
//                           "id": "1",
//                           "__typename": "Actor",
//                           "firstName": "Brad",
//                           "lastName": "Pitt",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "3",
//                               "__typename": "Movie",
//                               "title": "Troy",
//                               "releaseYear": 2004,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "6",
//                                   "__typename": "Actor",
//                                   "firstName": "Orlando",
//                                   "lastName": "Bloom"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "15",
//                               "__typename": "Movie",
//                               "title": "World War Z",
//                               "releaseYear": 2013,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "11",
//                           "__typename": "Actor",
//                           "firstName": "Jonah",
//                           "lastName": "Hill",
//                           "movies": [
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "12",
//                           "__typename": "Actor",
//                           "firstName": "Philip",
//                           "lastName": "Seymour Hoffman",
//                           "movies": [
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "13",
//                           "__typename": "Actor",
//                           "firstName": "Chris",
//                           "lastName": "Pratt",
//                           "movies": [
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "7",
//                       "__typename": "Movie",
//                       "title": "Ad Astra",
//                       "releaseYear": 2019,
//                       "genre": "SCIFI",
//                       "actors": [
//                         {
//                           "id": "1",
//                           "__typename": "Actor",
//                           "firstName": "Brad",
//                           "lastName": "Pitt",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "3",
//                               "__typename": "Movie",
//                               "title": "Troy",
//                               "releaseYear": 2004,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "6",
//                                   "__typename": "Actor",
//                                   "firstName": "Orlando",
//                                   "lastName": "Bloom"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "15",
//                               "__typename": "Movie",
//                               "title": "World War Z",
//                               "releaseYear": 2013,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "14",
//                           "__typename": "Actor",
//                           "firstName": "Tommy Lee",
//                           "lastName": "Jones",
//                           "movies": [
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "15",
//                       "__typename": "Movie",
//                       "title": "World War Z",
//                       "releaseYear": 2013,
//                       "genre": "SCIFI",
//                       "actors": [
//                         {
//                           "id": "1",
//                           "__typename": "Actor",
//                           "firstName": "Brad",
//                           "lastName": "Pitt",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "3",
//                               "__typename": "Movie",
//                               "title": "Troy",
//                               "releaseYear": 2004,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "6",
//                                   "__typename": "Actor",
//                                   "firstName": "Orlando",
//                                   "lastName": "Bloom"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "15",
//                               "__typename": "Movie",
//                               "title": "World War Z",
//                               "releaseYear": 2013,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "16",
//                       "__typename": "Movie",
//                       "title": "Legends of the Fall",
//                       "releaseYear": 1994,
//                       "genre": "ROMANCE",
//                       "actors": [
//                         {
//                           "id": "1",
//                           "__typename": "Actor",
//                           "firstName": "Brad",
//                           "lastName": "Pitt",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "3",
//                               "__typename": "Movie",
//                               "title": "Troy",
//                               "releaseYear": 2004,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "6",
//                                   "__typename": "Actor",
//                                   "firstName": "Orlando",
//                                   "lastName": "Bloom"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "15",
//                               "__typename": "Movie",
//                               "title": "World War Z",
//                               "releaseYear": 2013,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "24",
//                           "__typename": "Actor",
//                           "firstName": "Anthony",
//                           "lastName": "Hopkins",
//                           "movies": [
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "21",
//                               "__typename": "Movie",
//                               "title": "Beowulf",
//                               "releaseYear": 2007,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "20",
//                       "__typename": "Movie",
//                       "title": "By the Sea",
//                       "releaseYear": 2015,
//                       "genre": "ROMANCE",
//                       "actors": [
//                         {
//                           "id": "1",
//                           "__typename": "Actor",
//                           "firstName": "Brad",
//                           "lastName": "Pitt",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "3",
//                               "__typename": "Movie",
//                               "title": "Troy",
//                               "releaseYear": 2004,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "6",
//                                   "__typename": "Actor",
//                                   "firstName": "Orlando",
//                                   "lastName": "Bloom"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "15",
//                               "__typename": "Movie",
//                               "title": "World War Z",
//                               "releaseYear": 2013,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "2",
//                           "__typename": "Actor",
//                           "firstName": "Angelina",
//                           "lastName": "Jolie",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "8",
//                               "__typename": "Movie",
//                               "title": "Maleficient",
//                               "releaseYear": 2014,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "9",
//                               "__typename": "Movie",
//                               "title": "Lara Croft Tomb Raider",
//                               "releaseYear": 2001,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "15",
//                                   "__typename": "Actor",
//                                   "firstName": "Daniel",
//                                   "lastName": "Craig"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "10",
//                               "__typename": "Movie",
//                               "title": "Wanted",
//                               "releaseYear": 2008,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "16",
//                                   "__typename": "Actor",
//                                   "firstName": "James",
//                                   "lastName": "McAvoy"
//                                 },
//                                 {
//                                   "id": "17",
//                                   "__typename": "Actor",
//                                   "firstName": "Morgan",
//                                   "lastName": "Freeman"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "11",
//                               "__typename": "Movie",
//                               "title": "Salt",
//                               "releaseYear": 2010,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "12",
//                               "__typename": "Movie",
//                               "title": "Gone in 60 Seconds",
//                               "releaseYear": 2000,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "18",
//                                   "__typename": "Actor",
//                                   "firstName": "Nicholas",
//                                   "lastName": "Cage"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "14",
//                               "__typename": "Movie",
//                               "title": "The Tourist",
//                               "releaseYear": 2010,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "23",
//                                   "__typename": "Actor",
//                                   "firstName": "Johnny",
//                                   "lastName": "Depp"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "18",
//                               "__typename": "Movie",
//                               "title": "Girl, Interrupted",
//                               "releaseYear": 1999,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "27",
//                                   "__typename": "Actor",
//                                   "firstName": "Winona",
//                                   "lastName": "Ryder"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "19",
//                               "__typename": "Movie",
//                               "title": "Playing By Heart",
//                               "releaseYear": 1998,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "28",
//                                   "__typename": "Actor",
//                                   "firstName": "Sean",
//                                   "lastName": "Connery"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "21",
//                               "__typename": "Movie",
//                               "title": "Beowulf",
//                               "releaseYear": 2007,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "22",
//                               "__typename": "Movie",
//                               "title": "The Good Shepherd",
//                               "releaseYear": 2006,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "23",
//                               "__typename": "Movie",
//                               "title": "Shark Tale",
//                               "releaseYear": 2004,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     }
//                   ]
//                 }
//               ]
//             },
//             {
//               "id": "17",
//               "__typename": "Movie",
//               "title": "Sky Captain and the World of Tomorrow",
//               "releaseYear": 2004,
//               "genre": "SCIFI",
//               "actors": [
//                 {
//                   "id": "2",
//                   "__typename": "Actor",
//                   "firstName": "Angelina",
//                   "lastName": "Jolie",
//                   "movies": [
//                     {
//                       "id": "1",
//                       "__typename": "Movie",
//                       "title": "Mr. and Mrs. Smith",
//                       "releaseYear": 2005,
//                       "genre": "COMEDY",
//                       "actors": [
//                         {
//                           "id": "1",
//                           "__typename": "Actor",
//                           "firstName": "Brad",
//                           "lastName": "Pitt",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "3",
//                               "__typename": "Movie",
//                               "title": "Troy",
//                               "releaseYear": 2004,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "6",
//                                   "__typename": "Actor",
//                                   "firstName": "Orlando",
//                                   "lastName": "Bloom"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "15",
//                               "__typename": "Movie",
//                               "title": "World War Z",
//                               "releaseYear": 2013,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "2",
//                           "__typename": "Actor",
//                           "firstName": "Angelina",
//                           "lastName": "Jolie",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "8",
//                               "__typename": "Movie",
//                               "title": "Maleficient",
//                               "releaseYear": 2014,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "9",
//                               "__typename": "Movie",
//                               "title": "Lara Croft Tomb Raider",
//                               "releaseYear": 2001,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "15",
//                                   "__typename": "Actor",
//                                   "firstName": "Daniel",
//                                   "lastName": "Craig"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "10",
//                               "__typename": "Movie",
//                               "title": "Wanted",
//                               "releaseYear": 2008,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "16",
//                                   "__typename": "Actor",
//                                   "firstName": "James",
//                                   "lastName": "McAvoy"
//                                 },
//                                 {
//                                   "id": "17",
//                                   "__typename": "Actor",
//                                   "firstName": "Morgan",
//                                   "lastName": "Freeman"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "11",
//                               "__typename": "Movie",
//                               "title": "Salt",
//                               "releaseYear": 2010,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "12",
//                               "__typename": "Movie",
//                               "title": "Gone in 60 Seconds",
//                               "releaseYear": 2000,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "18",
//                                   "__typename": "Actor",
//                                   "firstName": "Nicholas",
//                                   "lastName": "Cage"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "14",
//                               "__typename": "Movie",
//                               "title": "The Tourist",
//                               "releaseYear": 2010,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "23",
//                                   "__typename": "Actor",
//                                   "firstName": "Johnny",
//                                   "lastName": "Depp"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "18",
//                               "__typename": "Movie",
//                               "title": "Girl, Interrupted",
//                               "releaseYear": 1999,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "27",
//                                   "__typename": "Actor",
//                                   "firstName": "Winona",
//                                   "lastName": "Ryder"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "19",
//                               "__typename": "Movie",
//                               "title": "Playing By Heart",
//                               "releaseYear": 1998,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "28",
//                                   "__typename": "Actor",
//                                   "firstName": "Sean",
//                                   "lastName": "Connery"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "21",
//                               "__typename": "Movie",
//                               "title": "Beowulf",
//                               "releaseYear": 2007,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "22",
//                               "__typename": "Movie",
//                               "title": "The Good Shepherd",
//                               "releaseYear": 2006,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "23",
//                               "__typename": "Movie",
//                               "title": "Shark Tale",
//                               "releaseYear": 2004,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "8",
//                       "__typename": "Movie",
//                       "title": "Maleficient",
//                       "releaseYear": 2014,
//                       "genre": "ADVENTURE",
//                       "actors": [
//                         {
//                           "id": "2",
//                           "__typename": "Actor",
//                           "firstName": "Angelina",
//                           "lastName": "Jolie",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "8",
//                               "__typename": "Movie",
//                               "title": "Maleficient",
//                               "releaseYear": 2014,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "9",
//                               "__typename": "Movie",
//                               "title": "Lara Croft Tomb Raider",
//                               "releaseYear": 2001,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "15",
//                                   "__typename": "Actor",
//                                   "firstName": "Daniel",
//                                   "lastName": "Craig"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "10",
//                               "__typename": "Movie",
//                               "title": "Wanted",
//                               "releaseYear": 2008,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "16",
//                                   "__typename": "Actor",
//                                   "firstName": "James",
//                                   "lastName": "McAvoy"
//                                 },
//                                 {
//                                   "id": "17",
//                                   "__typename": "Actor",
//                                   "firstName": "Morgan",
//                                   "lastName": "Freeman"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "11",
//                               "__typename": "Movie",
//                               "title": "Salt",
//                               "releaseYear": 2010,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "12",
//                               "__typename": "Movie",
//                               "title": "Gone in 60 Seconds",
//                               "releaseYear": 2000,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "18",
//                                   "__typename": "Actor",
//                                   "firstName": "Nicholas",
//                                   "lastName": "Cage"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "14",
//                               "__typename": "Movie",
//                               "title": "The Tourist",
//                               "releaseYear": 2010,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "23",
//                                   "__typename": "Actor",
//                                   "firstName": "Johnny",
//                                   "lastName": "Depp"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "18",
//                               "__typename": "Movie",
//                               "title": "Girl, Interrupted",
//                               "releaseYear": 1999,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "27",
//                                   "__typename": "Actor",
//                                   "firstName": "Winona",
//                                   "lastName": "Ryder"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "19",
//                               "__typename": "Movie",
//                               "title": "Playing By Heart",
//                               "releaseYear": 1998,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "28",
//                                   "__typename": "Actor",
//                                   "firstName": "Sean",
//                                   "lastName": "Connery"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "21",
//                               "__typename": "Movie",
//                               "title": "Beowulf",
//                               "releaseYear": 2007,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "22",
//                               "__typename": "Movie",
//                               "title": "The Good Shepherd",
//                               "releaseYear": 2006,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "23",
//                               "__typename": "Movie",
//                               "title": "Shark Tale",
//                               "releaseYear": 2004,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "9",
//                       "__typename": "Movie",
//                       "title": "Lara Croft Tomb Raider",
//                       "releaseYear": 2001,
//                       "genre": "ADVENTURE",
//                       "actors": [
//                         {
//                           "id": "2",
//                           "__typename": "Actor",
//                           "firstName": "Angelina",
//                           "lastName": "Jolie",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "8",
//                               "__typename": "Movie",
//                               "title": "Maleficient",
//                               "releaseYear": 2014,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "9",
//                               "__typename": "Movie",
//                               "title": "Lara Croft Tomb Raider",
//                               "releaseYear": 2001,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "15",
//                                   "__typename": "Actor",
//                                   "firstName": "Daniel",
//                                   "lastName": "Craig"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "10",
//                               "__typename": "Movie",
//                               "title": "Wanted",
//                               "releaseYear": 2008,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "16",
//                                   "__typename": "Actor",
//                                   "firstName": "James",
//                                   "lastName": "McAvoy"
//                                 },
//                                 {
//                                   "id": "17",
//                                   "__typename": "Actor",
//                                   "firstName": "Morgan",
//                                   "lastName": "Freeman"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "11",
//                               "__typename": "Movie",
//                               "title": "Salt",
//                               "releaseYear": 2010,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "12",
//                               "__typename": "Movie",
//                               "title": "Gone in 60 Seconds",
//                               "releaseYear": 2000,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "18",
//                                   "__typename": "Actor",
//                                   "firstName": "Nicholas",
//                                   "lastName": "Cage"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "14",
//                               "__typename": "Movie",
//                               "title": "The Tourist",
//                               "releaseYear": 2010,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "23",
//                                   "__typename": "Actor",
//                                   "firstName": "Johnny",
//                                   "lastName": "Depp"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "18",
//                               "__typename": "Movie",
//                               "title": "Girl, Interrupted",
//                               "releaseYear": 1999,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "27",
//                                   "__typename": "Actor",
//                                   "firstName": "Winona",
//                                   "lastName": "Ryder"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "19",
//                               "__typename": "Movie",
//                               "title": "Playing By Heart",
//                               "releaseYear": 1998,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "28",
//                                   "__typename": "Actor",
//                                   "firstName": "Sean",
//                                   "lastName": "Connery"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "21",
//                               "__typename": "Movie",
//                               "title": "Beowulf",
//                               "releaseYear": 2007,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "22",
//                               "__typename": "Movie",
//                               "title": "The Good Shepherd",
//                               "releaseYear": 2006,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "23",
//                               "__typename": "Movie",
//                               "title": "Shark Tale",
//                               "releaseYear": 2004,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "15",
//                           "__typename": "Actor",
//                           "firstName": "Daniel",
//                           "lastName": "Craig",
//                           "movies": [
//                             {
//                               "id": "9",
//                               "__typename": "Movie",
//                               "title": "Lara Croft Tomb Raider",
//                               "releaseYear": 2001,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "15",
//                                   "__typename": "Actor",
//                                   "firstName": "Daniel",
//                                   "lastName": "Craig"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "10",
//                       "__typename": "Movie",
//                       "title": "Wanted",
//                       "releaseYear": 2008,
//                       "genre": "ACTION",
//                       "actors": [
//                         {
//                           "id": "2",
//                           "__typename": "Actor",
//                           "firstName": "Angelina",
//                           "lastName": "Jolie",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "8",
//                               "__typename": "Movie",
//                               "title": "Maleficient",
//                               "releaseYear": 2014,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "9",
//                               "__typename": "Movie",
//                               "title": "Lara Croft Tomb Raider",
//                               "releaseYear": 2001,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "15",
//                                   "__typename": "Actor",
//                                   "firstName": "Daniel",
//                                   "lastName": "Craig"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "10",
//                               "__typename": "Movie",
//                               "title": "Wanted",
//                               "releaseYear": 2008,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "16",
//                                   "__typename": "Actor",
//                                   "firstName": "James",
//                                   "lastName": "McAvoy"
//                                 },
//                                 {
//                                   "id": "17",
//                                   "__typename": "Actor",
//                                   "firstName": "Morgan",
//                                   "lastName": "Freeman"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "11",
//                               "__typename": "Movie",
//                               "title": "Salt",
//                               "releaseYear": 2010,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "12",
//                               "__typename": "Movie",
//                               "title": "Gone in 60 Seconds",
//                               "releaseYear": 2000,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "18",
//                                   "__typename": "Actor",
//                                   "firstName": "Nicholas",
//                                   "lastName": "Cage"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "14",
//                               "__typename": "Movie",
//                               "title": "The Tourist",
//                               "releaseYear": 2010,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "23",
//                                   "__typename": "Actor",
//                                   "firstName": "Johnny",
//                                   "lastName": "Depp"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "18",
//                               "__typename": "Movie",
//                               "title": "Girl, Interrupted",
//                               "releaseYear": 1999,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "27",
//                                   "__typename": "Actor",
//                                   "firstName": "Winona",
//                                   "lastName": "Ryder"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "19",
//                               "__typename": "Movie",
//                               "title": "Playing By Heart",
//                               "releaseYear": 1998,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "28",
//                                   "__typename": "Actor",
//                                   "firstName": "Sean",
//                                   "lastName": "Connery"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "21",
//                               "__typename": "Movie",
//                               "title": "Beowulf",
//                               "releaseYear": 2007,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "22",
//                               "__typename": "Movie",
//                               "title": "The Good Shepherd",
//                               "releaseYear": 2006,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "23",
//                               "__typename": "Movie",
//                               "title": "Shark Tale",
//                               "releaseYear": 2004,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "16",
//                           "__typename": "Actor",
//                           "firstName": "James",
//                           "lastName": "McAvoy",
//                           "movies": [
//                             {
//                               "id": "10",
//                               "__typename": "Movie",
//                               "title": "Wanted",
//                               "releaseYear": 2008,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "16",
//                                   "__typename": "Actor",
//                                   "firstName": "James",
//                                   "lastName": "McAvoy"
//                                 },
//                                 {
//                                   "id": "17",
//                                   "__typename": "Actor",
//                                   "firstName": "Morgan",
//                                   "lastName": "Freeman"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "17",
//                           "__typename": "Actor",
//                           "firstName": "Morgan",
//                           "lastName": "Freeman",
//                           "movies": [
//                             {
//                               "id": "10",
//                               "__typename": "Movie",
//                               "title": "Wanted",
//                               "releaseYear": 2008,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "16",
//                                   "__typename": "Actor",
//                                   "firstName": "James",
//                                   "lastName": "McAvoy"
//                                 },
//                                 {
//                                   "id": "17",
//                                   "__typename": "Actor",
//                                   "firstName": "Morgan",
//                                   "lastName": "Freeman"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "11",
//                       "__typename": "Movie",
//                       "title": "Salt",
//                       "releaseYear": 2010,
//                       "genre": "ACTION",
//                       "actors": [
//                         {
//                           "id": "2",
//                           "__typename": "Actor",
//                           "firstName": "Angelina",
//                           "lastName": "Jolie",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "8",
//                               "__typename": "Movie",
//                               "title": "Maleficient",
//                               "releaseYear": 2014,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "9",
//                               "__typename": "Movie",
//                               "title": "Lara Croft Tomb Raider",
//                               "releaseYear": 2001,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "15",
//                                   "__typename": "Actor",
//                                   "firstName": "Daniel",
//                                   "lastName": "Craig"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "10",
//                               "__typename": "Movie",
//                               "title": "Wanted",
//                               "releaseYear": 2008,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "16",
//                                   "__typename": "Actor",
//                                   "firstName": "James",
//                                   "lastName": "McAvoy"
//                                 },
//                                 {
//                                   "id": "17",
//                                   "__typename": "Actor",
//                                   "firstName": "Morgan",
//                                   "lastName": "Freeman"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "11",
//                               "__typename": "Movie",
//                               "title": "Salt",
//                               "releaseYear": 2010,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "12",
//                               "__typename": "Movie",
//                               "title": "Gone in 60 Seconds",
//                               "releaseYear": 2000,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "18",
//                                   "__typename": "Actor",
//                                   "firstName": "Nicholas",
//                                   "lastName": "Cage"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "14",
//                               "__typename": "Movie",
//                               "title": "The Tourist",
//                               "releaseYear": 2010,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "23",
//                                   "__typename": "Actor",
//                                   "firstName": "Johnny",
//                                   "lastName": "Depp"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "18",
//                               "__typename": "Movie",
//                               "title": "Girl, Interrupted",
//                               "releaseYear": 1999,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "27",
//                                   "__typename": "Actor",
//                                   "firstName": "Winona",
//                                   "lastName": "Ryder"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "19",
//                               "__typename": "Movie",
//                               "title": "Playing By Heart",
//                               "releaseYear": 1998,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "28",
//                                   "__typename": "Actor",
//                                   "firstName": "Sean",
//                                   "lastName": "Connery"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "21",
//                               "__typename": "Movie",
//                               "title": "Beowulf",
//                               "releaseYear": 2007,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "22",
//                               "__typename": "Movie",
//                               "title": "The Good Shepherd",
//                               "releaseYear": 2006,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "23",
//                               "__typename": "Movie",
//                               "title": "Shark Tale",
//                               "releaseYear": 2004,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "12",
//                       "__typename": "Movie",
//                       "title": "Gone in 60 Seconds",
//                       "releaseYear": 2000,
//                       "genre": "ACTION",
//                       "actors": [
//                         {
//                           "id": "2",
//                           "__typename": "Actor",
//                           "firstName": "Angelina",
//                           "lastName": "Jolie",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "8",
//                               "__typename": "Movie",
//                               "title": "Maleficient",
//                               "releaseYear": 2014,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "9",
//                               "__typename": "Movie",
//                               "title": "Lara Croft Tomb Raider",
//                               "releaseYear": 2001,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "15",
//                                   "__typename": "Actor",
//                                   "firstName": "Daniel",
//                                   "lastName": "Craig"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "10",
//                               "__typename": "Movie",
//                               "title": "Wanted",
//                               "releaseYear": 2008,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "16",
//                                   "__typename": "Actor",
//                                   "firstName": "James",
//                                   "lastName": "McAvoy"
//                                 },
//                                 {
//                                   "id": "17",
//                                   "__typename": "Actor",
//                                   "firstName": "Morgan",
//                                   "lastName": "Freeman"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "11",
//                               "__typename": "Movie",
//                               "title": "Salt",
//                               "releaseYear": 2010,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "12",
//                               "__typename": "Movie",
//                               "title": "Gone in 60 Seconds",
//                               "releaseYear": 2000,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "18",
//                                   "__typename": "Actor",
//                                   "firstName": "Nicholas",
//                                   "lastName": "Cage"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "14",
//                               "__typename": "Movie",
//                               "title": "The Tourist",
//                               "releaseYear": 2010,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "23",
//                                   "__typename": "Actor",
//                                   "firstName": "Johnny",
//                                   "lastName": "Depp"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "18",
//                               "__typename": "Movie",
//                               "title": "Girl, Interrupted",
//                               "releaseYear": 1999,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "27",
//                                   "__typename": "Actor",
//                                   "firstName": "Winona",
//                                   "lastName": "Ryder"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "19",
//                               "__typename": "Movie",
//                               "title": "Playing By Heart",
//                               "releaseYear": 1998,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "28",
//                                   "__typename": "Actor",
//                                   "firstName": "Sean",
//                                   "lastName": "Connery"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "21",
//                               "__typename": "Movie",
//                               "title": "Beowulf",
//                               "releaseYear": 2007,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "22",
//                               "__typename": "Movie",
//                               "title": "The Good Shepherd",
//                               "releaseYear": 2006,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "23",
//                               "__typename": "Movie",
//                               "title": "Shark Tale",
//                               "releaseYear": 2004,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "18",
//                           "__typename": "Actor",
//                           "firstName": "Nicholas",
//                           "lastName": "Cage",
//                           "movies": [
//                             {
//                               "id": "12",
//                               "__typename": "Movie",
//                               "title": "Gone in 60 Seconds",
//                               "releaseYear": 2000,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "18",
//                                   "__typename": "Actor",
//                                   "firstName": "Nicholas",
//                                   "lastName": "Cage"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "13",
//                       "__typename": "Movie",
//                       "title": "Kung Fu Panda",
//                       "releaseYear": 2008,
//                       "genre": "COMEDY",
//                       "actors": [
//                         {
//                           "id": "2",
//                           "__typename": "Actor",
//                           "firstName": "Angelina",
//                           "lastName": "Jolie",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "8",
//                               "__typename": "Movie",
//                               "title": "Maleficient",
//                               "releaseYear": 2014,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "9",
//                               "__typename": "Movie",
//                               "title": "Lara Croft Tomb Raider",
//                               "releaseYear": 2001,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "15",
//                                   "__typename": "Actor",
//                                   "firstName": "Daniel",
//                                   "lastName": "Craig"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "10",
//                               "__typename": "Movie",
//                               "title": "Wanted",
//                               "releaseYear": 2008,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "16",
//                                   "__typename": "Actor",
//                                   "firstName": "James",
//                                   "lastName": "McAvoy"
//                                 },
//                                 {
//                                   "id": "17",
//                                   "__typename": "Actor",
//                                   "firstName": "Morgan",
//                                   "lastName": "Freeman"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "11",
//                               "__typename": "Movie",
//                               "title": "Salt",
//                               "releaseYear": 2010,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "12",
//                               "__typename": "Movie",
//                               "title": "Gone in 60 Seconds",
//                               "releaseYear": 2000,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "18",
//                                   "__typename": "Actor",
//                                   "firstName": "Nicholas",
//                                   "lastName": "Cage"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "14",
//                               "__typename": "Movie",
//                               "title": "The Tourist",
//                               "releaseYear": 2010,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "23",
//                                   "__typename": "Actor",
//                                   "firstName": "Johnny",
//                                   "lastName": "Depp"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "18",
//                               "__typename": "Movie",
//                               "title": "Girl, Interrupted",
//                               "releaseYear": 1999,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "27",
//                                   "__typename": "Actor",
//                                   "firstName": "Winona",
//                                   "lastName": "Ryder"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "19",
//                               "__typename": "Movie",
//                               "title": "Playing By Heart",
//                               "releaseYear": 1998,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "28",
//                                   "__typename": "Actor",
//                                   "firstName": "Sean",
//                                   "lastName": "Connery"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "21",
//                               "__typename": "Movie",
//                               "title": "Beowulf",
//                               "releaseYear": 2007,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "22",
//                               "__typename": "Movie",
//                               "title": "The Good Shepherd",
//                               "releaseYear": 2006,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "23",
//                               "__typename": "Movie",
//                               "title": "Shark Tale",
//                               "releaseYear": 2004,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "19",
//                           "__typename": "Actor",
//                           "firstName": "Jack",
//                           "lastName": "Black",
//                           "movies": [
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "23",
//                               "__typename": "Movie",
//                               "title": "Shark Tale",
//                               "releaseYear": 2004,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "20",
//                           "__typename": "Actor",
//                           "firstName": "Dustin",
//                           "lastName": "Hoffman",
//                           "movies": [
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "21",
//                           "__typename": "Actor",
//                           "firstName": "Jackie",
//                           "lastName": "Chan",
//                           "movies": [
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "22",
//                           "__typename": "Actor",
//                           "firstName": "Seth",
//                           "lastName": "Rogen",
//                           "movies": [
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "14",
//                       "__typename": "Movie",
//                       "title": "The Tourist",
//                       "releaseYear": 2010,
//                       "genre": "ROMANCE",
//                       "actors": [
//                         {
//                           "id": "2",
//                           "__typename": "Actor",
//                           "firstName": "Angelina",
//                           "lastName": "Jolie",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "8",
//                               "__typename": "Movie",
//                               "title": "Maleficient",
//                               "releaseYear": 2014,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "9",
//                               "__typename": "Movie",
//                               "title": "Lara Croft Tomb Raider",
//                               "releaseYear": 2001,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "15",
//                                   "__typename": "Actor",
//                                   "firstName": "Daniel",
//                                   "lastName": "Craig"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "10",
//                               "__typename": "Movie",
//                               "title": "Wanted",
//                               "releaseYear": 2008,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "16",
//                                   "__typename": "Actor",
//                                   "firstName": "James",
//                                   "lastName": "McAvoy"
//                                 },
//                                 {
//                                   "id": "17",
//                                   "__typename": "Actor",
//                                   "firstName": "Morgan",
//                                   "lastName": "Freeman"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "11",
//                               "__typename": "Movie",
//                               "title": "Salt",
//                               "releaseYear": 2010,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "12",
//                               "__typename": "Movie",
//                               "title": "Gone in 60 Seconds",
//                               "releaseYear": 2000,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "18",
//                                   "__typename": "Actor",
//                                   "firstName": "Nicholas",
//                                   "lastName": "Cage"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "14",
//                               "__typename": "Movie",
//                               "title": "The Tourist",
//                               "releaseYear": 2010,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "23",
//                                   "__typename": "Actor",
//                                   "firstName": "Johnny",
//                                   "lastName": "Depp"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "18",
//                               "__typename": "Movie",
//                               "title": "Girl, Interrupted",
//                               "releaseYear": 1999,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "27",
//                                   "__typename": "Actor",
//                                   "firstName": "Winona",
//                                   "lastName": "Ryder"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "19",
//                               "__typename": "Movie",
//                               "title": "Playing By Heart",
//                               "releaseYear": 1998,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "28",
//                                   "__typename": "Actor",
//                                   "firstName": "Sean",
//                                   "lastName": "Connery"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "21",
//                               "__typename": "Movie",
//                               "title": "Beowulf",
//                               "releaseYear": 2007,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "22",
//                               "__typename": "Movie",
//                               "title": "The Good Shepherd",
//                               "releaseYear": 2006,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "23",
//                               "__typename": "Movie",
//                               "title": "Shark Tale",
//                               "releaseYear": 2004,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "23",
//                           "__typename": "Actor",
//                           "firstName": "Johnny",
//                           "lastName": "Depp",
//                           "movies": [
//                             {
//                               "id": "14",
//                               "__typename": "Movie",
//                               "title": "The Tourist",
//                               "releaseYear": 2010,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "23",
//                                   "__typename": "Actor",
//                                   "firstName": "Johnny",
//                                   "lastName": "Depp"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "17",
//                       "__typename": "Movie",
//                       "title": "Sky Captain and the World of Tomorrow",
//                       "releaseYear": 2004,
//                       "genre": "SCIFI",
//                       "actors": [
//                         {
//                           "id": "2",
//                           "__typename": "Actor",
//                           "firstName": "Angelina",
//                           "lastName": "Jolie",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "8",
//                               "__typename": "Movie",
//                               "title": "Maleficient",
//                               "releaseYear": 2014,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "9",
//                               "__typename": "Movie",
//                               "title": "Lara Croft Tomb Raider",
//                               "releaseYear": 2001,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "15",
//                                   "__typename": "Actor",
//                                   "firstName": "Daniel",
//                                   "lastName": "Craig"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "10",
//                               "__typename": "Movie",
//                               "title": "Wanted",
//                               "releaseYear": 2008,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "16",
//                                   "__typename": "Actor",
//                                   "firstName": "James",
//                                   "lastName": "McAvoy"
//                                 },
//                                 {
//                                   "id": "17",
//                                   "__typename": "Actor",
//                                   "firstName": "Morgan",
//                                   "lastName": "Freeman"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "11",
//                               "__typename": "Movie",
//                               "title": "Salt",
//                               "releaseYear": 2010,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "12",
//                               "__typename": "Movie",
//                               "title": "Gone in 60 Seconds",
//                               "releaseYear": 2000,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "18",
//                                   "__typename": "Actor",
//                                   "firstName": "Nicholas",
//                                   "lastName": "Cage"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "14",
//                               "__typename": "Movie",
//                               "title": "The Tourist",
//                               "releaseYear": 2010,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "23",
//                                   "__typename": "Actor",
//                                   "firstName": "Johnny",
//                                   "lastName": "Depp"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "18",
//                               "__typename": "Movie",
//                               "title": "Girl, Interrupted",
//                               "releaseYear": 1999,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "27",
//                                   "__typename": "Actor",
//                                   "firstName": "Winona",
//                                   "lastName": "Ryder"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "19",
//                               "__typename": "Movie",
//                               "title": "Playing By Heart",
//                               "releaseYear": 1998,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "28",
//                                   "__typename": "Actor",
//                                   "firstName": "Sean",
//                                   "lastName": "Connery"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "21",
//                               "__typename": "Movie",
//                               "title": "Beowulf",
//                               "releaseYear": 2007,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "22",
//                               "__typename": "Movie",
//                               "title": "The Good Shepherd",
//                               "releaseYear": 2006,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "23",
//                               "__typename": "Movie",
//                               "title": "Shark Tale",
//                               "releaseYear": 2004,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "25",
//                           "__typename": "Actor",
//                           "firstName": "Jude",
//                           "lastName": "Law",
//                           "movies": [
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "26",
//                           "__typename": "Actor",
//                           "firstName": "Gwyneth",
//                           "lastName": "Paltrow",
//                           "movies": [
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "18",
//                       "__typename": "Movie",
//                       "title": "Girl, Interrupted",
//                       "releaseYear": 1999,
//                       "genre": "DRAMA",
//                       "actors": [
//                         {
//                           "id": "2",
//                           "__typename": "Actor",
//                           "firstName": "Angelina",
//                           "lastName": "Jolie",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "8",
//                               "__typename": "Movie",
//                               "title": "Maleficient",
//                               "releaseYear": 2014,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "9",
//                               "__typename": "Movie",
//                               "title": "Lara Croft Tomb Raider",
//                               "releaseYear": 2001,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "15",
//                                   "__typename": "Actor",
//                                   "firstName": "Daniel",
//                                   "lastName": "Craig"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "10",
//                               "__typename": "Movie",
//                               "title": "Wanted",
//                               "releaseYear": 2008,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "16",
//                                   "__typename": "Actor",
//                                   "firstName": "James",
//                                   "lastName": "McAvoy"
//                                 },
//                                 {
//                                   "id": "17",
//                                   "__typename": "Actor",
//                                   "firstName": "Morgan",
//                                   "lastName": "Freeman"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "11",
//                               "__typename": "Movie",
//                               "title": "Salt",
//                               "releaseYear": 2010,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "12",
//                               "__typename": "Movie",
//                               "title": "Gone in 60 Seconds",
//                               "releaseYear": 2000,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "18",
//                                   "__typename": "Actor",
//                                   "firstName": "Nicholas",
//                                   "lastName": "Cage"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "14",
//                               "__typename": "Movie",
//                               "title": "The Tourist",
//                               "releaseYear": 2010,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "23",
//                                   "__typename": "Actor",
//                                   "firstName": "Johnny",
//                                   "lastName": "Depp"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "18",
//                               "__typename": "Movie",
//                               "title": "Girl, Interrupted",
//                               "releaseYear": 1999,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "27",
//                                   "__typename": "Actor",
//                                   "firstName": "Winona",
//                                   "lastName": "Ryder"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "19",
//                               "__typename": "Movie",
//                               "title": "Playing By Heart",
//                               "releaseYear": 1998,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "28",
//                                   "__typename": "Actor",
//                                   "firstName": "Sean",
//                                   "lastName": "Connery"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "21",
//                               "__typename": "Movie",
//                               "title": "Beowulf",
//                               "releaseYear": 2007,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "22",
//                               "__typename": "Movie",
//                               "title": "The Good Shepherd",
//                               "releaseYear": 2006,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "23",
//                               "__typename": "Movie",
//                               "title": "Shark Tale",
//                               "releaseYear": 2004,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "27",
//                           "__typename": "Actor",
//                           "firstName": "Winona",
//                           "lastName": "Ryder",
//                           "movies": [
//                             {
//                               "id": "18",
//                               "__typename": "Movie",
//                               "title": "Girl, Interrupted",
//                               "releaseYear": 1999,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "27",
//                                   "__typename": "Actor",
//                                   "firstName": "Winona",
//                                   "lastName": "Ryder"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "19",
//                       "__typename": "Movie",
//                       "title": "Playing By Heart",
//                       "releaseYear": 1998,
//                       "genre": "ROMANCE",
//                       "actors": [
//                         {
//                           "id": "2",
//                           "__typename": "Actor",
//                           "firstName": "Angelina",
//                           "lastName": "Jolie",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "8",
//                               "__typename": "Movie",
//                               "title": "Maleficient",
//                               "releaseYear": 2014,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "9",
//                               "__typename": "Movie",
//                               "title": "Lara Croft Tomb Raider",
//                               "releaseYear": 2001,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "15",
//                                   "__typename": "Actor",
//                                   "firstName": "Daniel",
//                                   "lastName": "Craig"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "10",
//                               "__typename": "Movie",
//                               "title": "Wanted",
//                               "releaseYear": 2008,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "16",
//                                   "__typename": "Actor",
//                                   "firstName": "James",
//                                   "lastName": "McAvoy"
//                                 },
//                                 {
//                                   "id": "17",
//                                   "__typename": "Actor",
//                                   "firstName": "Morgan",
//                                   "lastName": "Freeman"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "11",
//                               "__typename": "Movie",
//                               "title": "Salt",
//                               "releaseYear": 2010,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "12",
//                               "__typename": "Movie",
//                               "title": "Gone in 60 Seconds",
//                               "releaseYear": 2000,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "18",
//                                   "__typename": "Actor",
//                                   "firstName": "Nicholas",
//                                   "lastName": "Cage"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "14",
//                               "__typename": "Movie",
//                               "title": "The Tourist",
//                               "releaseYear": 2010,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "23",
//                                   "__typename": "Actor",
//                                   "firstName": "Johnny",
//                                   "lastName": "Depp"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "18",
//                               "__typename": "Movie",
//                               "title": "Girl, Interrupted",
//                               "releaseYear": 1999,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "27",
//                                   "__typename": "Actor",
//                                   "firstName": "Winona",
//                                   "lastName": "Ryder"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "19",
//                               "__typename": "Movie",
//                               "title": "Playing By Heart",
//                               "releaseYear": 1998,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "28",
//                                   "__typename": "Actor",
//                                   "firstName": "Sean",
//                                   "lastName": "Connery"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "21",
//                               "__typename": "Movie",
//                               "title": "Beowulf",
//                               "releaseYear": 2007,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "22",
//                               "__typename": "Movie",
//                               "title": "The Good Shepherd",
//                               "releaseYear": 2006,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "23",
//                               "__typename": "Movie",
//                               "title": "Shark Tale",
//                               "releaseYear": 2004,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "28",
//                           "__typename": "Actor",
//                           "firstName": "Sean",
//                           "lastName": "Connery",
//                           "movies": [
//                             {
//                               "id": "19",
//                               "__typename": "Movie",
//                               "title": "Playing By Heart",
//                               "releaseYear": 1998,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "28",
//                                   "__typename": "Actor",
//                                   "firstName": "Sean",
//                                   "lastName": "Connery"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "20",
//                       "__typename": "Movie",
//                       "title": "By the Sea",
//                       "releaseYear": 2015,
//                       "genre": "ROMANCE",
//                       "actors": [
//                         {
//                           "id": "1",
//                           "__typename": "Actor",
//                           "firstName": "Brad",
//                           "lastName": "Pitt",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "2",
//                               "__typename": "Movie",
//                               "title": "Fight Club",
//                               "releaseYear": 1999,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "4",
//                                   "__typename": "Actor",
//                                   "firstName": "Edward",
//                                   "lastName": "Norton"
//                                 },
//                                 {
//                                   "id": "5",
//                                   "__typename": "Actor",
//                                   "firstName": "Helena",
//                                   "lastName": "Bonharm Carter"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "3",
//                               "__typename": "Movie",
//                               "title": "Troy",
//                               "releaseYear": 2004,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "6",
//                                   "__typename": "Actor",
//                                   "firstName": "Orlando",
//                                   "lastName": "Bloom"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "5",
//                               "__typename": "Movie",
//                               "title": "Once Upon a Time in Hollywood",
//                               "releaseYear": 2019,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "3",
//                                   "__typename": "Actor",
//                                   "firstName": "Leonardo",
//                                   "lastName": "Dicaprio"
//                                 },
//                                 {
//                                   "id": "10",
//                                   "__typename": "Actor",
//                                   "firstName": "Margot",
//                                   "lastName": "Robbie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "6",
//                               "__typename": "Movie",
//                               "title": "Moneyball",
//                               "releaseYear": 2011,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "11",
//                                   "__typename": "Actor",
//                                   "firstName": "Jonah",
//                                   "lastName": "Hill"
//                                 },
//                                 {
//                                   "id": "12",
//                                   "__typename": "Actor",
//                                   "firstName": "Philip",
//                                   "lastName": "Seymour Hoffman"
//                                 },
//                                 {
//                                   "id": "13",
//                                   "__typename": "Actor",
//                                   "firstName": "Chris",
//                                   "lastName": "Pratt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "7",
//                               "__typename": "Movie",
//                               "title": "Ad Astra",
//                               "releaseYear": 2019,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "14",
//                                   "__typename": "Actor",
//                                   "firstName": "Tommy Lee",
//                                   "lastName": "Jones"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "15",
//                               "__typename": "Movie",
//                               "title": "World War Z",
//                               "releaseYear": 2013,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "2",
//                           "__typename": "Actor",
//                           "firstName": "Angelina",
//                           "lastName": "Jolie",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "8",
//                               "__typename": "Movie",
//                               "title": "Maleficient",
//                               "releaseYear": 2014,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "9",
//                               "__typename": "Movie",
//                               "title": "Lara Croft Tomb Raider",
//                               "releaseYear": 2001,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "15",
//                                   "__typename": "Actor",
//                                   "firstName": "Daniel",
//                                   "lastName": "Craig"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "10",
//                               "__typename": "Movie",
//                               "title": "Wanted",
//                               "releaseYear": 2008,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "16",
//                                   "__typename": "Actor",
//                                   "firstName": "James",
//                                   "lastName": "McAvoy"
//                                 },
//                                 {
//                                   "id": "17",
//                                   "__typename": "Actor",
//                                   "firstName": "Morgan",
//                                   "lastName": "Freeman"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "11",
//                               "__typename": "Movie",
//                               "title": "Salt",
//                               "releaseYear": 2010,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "12",
//                               "__typename": "Movie",
//                               "title": "Gone in 60 Seconds",
//                               "releaseYear": 2000,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "18",
//                                   "__typename": "Actor",
//                                   "firstName": "Nicholas",
//                                   "lastName": "Cage"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "14",
//                               "__typename": "Movie",
//                               "title": "The Tourist",
//                               "releaseYear": 2010,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "23",
//                                   "__typename": "Actor",
//                                   "firstName": "Johnny",
//                                   "lastName": "Depp"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "18",
//                               "__typename": "Movie",
//                               "title": "Girl, Interrupted",
//                               "releaseYear": 1999,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "27",
//                                   "__typename": "Actor",
//                                   "firstName": "Winona",
//                                   "lastName": "Ryder"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "19",
//                               "__typename": "Movie",
//                               "title": "Playing By Heart",
//                               "releaseYear": 1998,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "28",
//                                   "__typename": "Actor",
//                                   "firstName": "Sean",
//                                   "lastName": "Connery"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "21",
//                               "__typename": "Movie",
//                               "title": "Beowulf",
//                               "releaseYear": 2007,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "22",
//                               "__typename": "Movie",
//                               "title": "The Good Shepherd",
//                               "releaseYear": 2006,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "23",
//                               "__typename": "Movie",
//                               "title": "Shark Tale",
//                               "releaseYear": 2004,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "21",
//                       "__typename": "Movie",
//                       "title": "Beowulf",
//                       "releaseYear": 2007,
//                       "genre": "ADVENTURE",
//                       "actors": [
//                         {
//                           "id": "2",
//                           "__typename": "Actor",
//                           "firstName": "Angelina",
//                           "lastName": "Jolie",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "8",
//                               "__typename": "Movie",
//                               "title": "Maleficient",
//                               "releaseYear": 2014,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "9",
//                               "__typename": "Movie",
//                               "title": "Lara Croft Tomb Raider",
//                               "releaseYear": 2001,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "15",
//                                   "__typename": "Actor",
//                                   "firstName": "Daniel",
//                                   "lastName": "Craig"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "10",
//                               "__typename": "Movie",
//                               "title": "Wanted",
//                               "releaseYear": 2008,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "16",
//                                   "__typename": "Actor",
//                                   "firstName": "James",
//                                   "lastName": "McAvoy"
//                                 },
//                                 {
//                                   "id": "17",
//                                   "__typename": "Actor",
//                                   "firstName": "Morgan",
//                                   "lastName": "Freeman"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "11",
//                               "__typename": "Movie",
//                               "title": "Salt",
//                               "releaseYear": 2010,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "12",
//                               "__typename": "Movie",
//                               "title": "Gone in 60 Seconds",
//                               "releaseYear": 2000,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "18",
//                                   "__typename": "Actor",
//                                   "firstName": "Nicholas",
//                                   "lastName": "Cage"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "14",
//                               "__typename": "Movie",
//                               "title": "The Tourist",
//                               "releaseYear": 2010,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "23",
//                                   "__typename": "Actor",
//                                   "firstName": "Johnny",
//                                   "lastName": "Depp"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "18",
//                               "__typename": "Movie",
//                               "title": "Girl, Interrupted",
//                               "releaseYear": 1999,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "27",
//                                   "__typename": "Actor",
//                                   "firstName": "Winona",
//                                   "lastName": "Ryder"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "19",
//                               "__typename": "Movie",
//                               "title": "Playing By Heart",
//                               "releaseYear": 1998,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "28",
//                                   "__typename": "Actor",
//                                   "firstName": "Sean",
//                                   "lastName": "Connery"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "21",
//                               "__typename": "Movie",
//                               "title": "Beowulf",
//                               "releaseYear": 2007,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "22",
//                               "__typename": "Movie",
//                               "title": "The Good Shepherd",
//                               "releaseYear": 2006,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "23",
//                               "__typename": "Movie",
//                               "title": "Shark Tale",
//                               "releaseYear": 2004,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "24",
//                           "__typename": "Actor",
//                           "firstName": "Anthony",
//                           "lastName": "Hopkins",
//                           "movies": [
//                             {
//                               "id": "16",
//                               "__typename": "Movie",
//                               "title": "Legends of the Fall",
//                               "releaseYear": 1994,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "21",
//                               "__typename": "Movie",
//                               "title": "Beowulf",
//                               "releaseYear": 2007,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "22",
//                       "__typename": "Movie",
//                       "title": "The Good Shepherd",
//                       "releaseYear": 2006,
//                       "genre": "DRAMA",
//                       "actors": [
//                         {
//                           "id": "2",
//                           "__typename": "Actor",
//                           "firstName": "Angelina",
//                           "lastName": "Jolie",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "8",
//                               "__typename": "Movie",
//                               "title": "Maleficient",
//                               "releaseYear": 2014,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "9",
//                               "__typename": "Movie",
//                               "title": "Lara Croft Tomb Raider",
//                               "releaseYear": 2001,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "15",
//                                   "__typename": "Actor",
//                                   "firstName": "Daniel",
//                                   "lastName": "Craig"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "10",
//                               "__typename": "Movie",
//                               "title": "Wanted",
//                               "releaseYear": 2008,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "16",
//                                   "__typename": "Actor",
//                                   "firstName": "James",
//                                   "lastName": "McAvoy"
//                                 },
//                                 {
//                                   "id": "17",
//                                   "__typename": "Actor",
//                                   "firstName": "Morgan",
//                                   "lastName": "Freeman"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "11",
//                               "__typename": "Movie",
//                               "title": "Salt",
//                               "releaseYear": 2010,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "12",
//                               "__typename": "Movie",
//                               "title": "Gone in 60 Seconds",
//                               "releaseYear": 2000,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "18",
//                                   "__typename": "Actor",
//                                   "firstName": "Nicholas",
//                                   "lastName": "Cage"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "14",
//                               "__typename": "Movie",
//                               "title": "The Tourist",
//                               "releaseYear": 2010,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "23",
//                                   "__typename": "Actor",
//                                   "firstName": "Johnny",
//                                   "lastName": "Depp"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "18",
//                               "__typename": "Movie",
//                               "title": "Girl, Interrupted",
//                               "releaseYear": 1999,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "27",
//                                   "__typename": "Actor",
//                                   "firstName": "Winona",
//                                   "lastName": "Ryder"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "19",
//                               "__typename": "Movie",
//                               "title": "Playing By Heart",
//                               "releaseYear": 1998,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "28",
//                                   "__typename": "Actor",
//                                   "firstName": "Sean",
//                                   "lastName": "Connery"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "21",
//                               "__typename": "Movie",
//                               "title": "Beowulf",
//                               "releaseYear": 2007,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "22",
//                               "__typename": "Movie",
//                               "title": "The Good Shepherd",
//                               "releaseYear": 2006,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "23",
//                               "__typename": "Movie",
//                               "title": "Shark Tale",
//                               "releaseYear": 2004,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "8",
//                           "__typename": "Actor",
//                           "firstName": "Matt",
//                           "lastName": "Damon",
//                           "movies": [
//                             {
//                               "id": "4",
//                               "__typename": "Movie",
//                               "title": "Oceans 11",
//                               "releaseYear": 2001,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "7",
//                                   "__typename": "Actor",
//                                   "firstName": "George",
//                                   "lastName": "Clooney"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 },
//                                 {
//                                   "id": "9",
//                                   "__typename": "Actor",
//                                   "firstName": "Julia",
//                                   "lastName": "Roberts"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "22",
//                               "__typename": "Movie",
//                               "title": "The Good Shepherd",
//                               "releaseYear": 2006,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "id": "23",
//                       "__typename": "Movie",
//                       "title": "Shark Tale",
//                       "releaseYear": 2004,
//                       "genre": "COMEDY",
//                       "actors": [
//                         {
//                           "id": "2",
//                           "__typename": "Actor",
//                           "firstName": "Angelina",
//                           "lastName": "Jolie",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "8",
//                               "__typename": "Movie",
//                               "title": "Maleficient",
//                               "releaseYear": 2014,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "9",
//                               "__typename": "Movie",
//                               "title": "Lara Croft Tomb Raider",
//                               "releaseYear": 2001,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "15",
//                                   "__typename": "Actor",
//                                   "firstName": "Daniel",
//                                   "lastName": "Craig"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "10",
//                               "__typename": "Movie",
//                               "title": "Wanted",
//                               "releaseYear": 2008,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "16",
//                                   "__typename": "Actor",
//                                   "firstName": "James",
//                                   "lastName": "McAvoy"
//                                 },
//                                 {
//                                   "id": "17",
//                                   "__typename": "Actor",
//                                   "firstName": "Morgan",
//                                   "lastName": "Freeman"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "11",
//                               "__typename": "Movie",
//                               "title": "Salt",
//                               "releaseYear": 2010,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "12",
//                               "__typename": "Movie",
//                               "title": "Gone in 60 Seconds",
//                               "releaseYear": 2000,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "18",
//                                   "__typename": "Actor",
//                                   "firstName": "Nicholas",
//                                   "lastName": "Cage"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "14",
//                               "__typename": "Movie",
//                               "title": "The Tourist",
//                               "releaseYear": 2010,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "23",
//                                   "__typename": "Actor",
//                                   "firstName": "Johnny",
//                                   "lastName": "Depp"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "18",
//                               "__typename": "Movie",
//                               "title": "Girl, Interrupted",
//                               "releaseYear": 1999,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "27",
//                                   "__typename": "Actor",
//                                   "firstName": "Winona",
//                                   "lastName": "Ryder"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "19",
//                               "__typename": "Movie",
//                               "title": "Playing By Heart",
//                               "releaseYear": 1998,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "28",
//                                   "__typename": "Actor",
//                                   "firstName": "Sean",
//                                   "lastName": "Connery"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "21",
//                               "__typename": "Movie",
//                               "title": "Beowulf",
//                               "releaseYear": 2007,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "22",
//                               "__typename": "Movie",
//                               "title": "The Good Shepherd",
//                               "releaseYear": 2006,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "23",
//                               "__typename": "Movie",
//                               "title": "Shark Tale",
//                               "releaseYear": 2004,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "19",
//                           "__typename": "Actor",
//                           "firstName": "Jack",
//                           "lastName": "Black",
//                           "movies": [
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "23",
//                               "__typename": "Movie",
//                               "title": "Shark Tale",
//                               "releaseYear": 2004,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     }
//                   ]
//                 },
//                 {
//                   "id": "25",
//                   "__typename": "Actor",
//                   "firstName": "Jude",
//                   "lastName": "Law",
//                   "movies": [
//                     {
//                       "id": "17",
//                       "__typename": "Movie",
//                       "title": "Sky Captain and the World of Tomorrow",
//                       "releaseYear": 2004,
//                       "genre": "SCIFI",
//                       "actors": [
//                         {
//                           "id": "2",
//                           "__typename": "Actor",
//                           "firstName": "Angelina",
//                           "lastName": "Jolie",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "8",
//                               "__typename": "Movie",
//                               "title": "Maleficient",
//                               "releaseYear": 2014,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "9",
//                               "__typename": "Movie",
//                               "title": "Lara Croft Tomb Raider",
//                               "releaseYear": 2001,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "15",
//                                   "__typename": "Actor",
//                                   "firstName": "Daniel",
//                                   "lastName": "Craig"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "10",
//                               "__typename": "Movie",
//                               "title": "Wanted",
//                               "releaseYear": 2008,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "16",
//                                   "__typename": "Actor",
//                                   "firstName": "James",
//                                   "lastName": "McAvoy"
//                                 },
//                                 {
//                                   "id": "17",
//                                   "__typename": "Actor",
//                                   "firstName": "Morgan",
//                                   "lastName": "Freeman"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "11",
//                               "__typename": "Movie",
//                               "title": "Salt",
//                               "releaseYear": 2010,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "12",
//                               "__typename": "Movie",
//                               "title": "Gone in 60 Seconds",
//                               "releaseYear": 2000,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "18",
//                                   "__typename": "Actor",
//                                   "firstName": "Nicholas",
//                                   "lastName": "Cage"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "14",
//                               "__typename": "Movie",
//                               "title": "The Tourist",
//                               "releaseYear": 2010,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "23",
//                                   "__typename": "Actor",
//                                   "firstName": "Johnny",
//                                   "lastName": "Depp"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "18",
//                               "__typename": "Movie",
//                               "title": "Girl, Interrupted",
//                               "releaseYear": 1999,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "27",
//                                   "__typename": "Actor",
//                                   "firstName": "Winona",
//                                   "lastName": "Ryder"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "19",
//                               "__typename": "Movie",
//                               "title": "Playing By Heart",
//                               "releaseYear": 1998,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "28",
//                                   "__typename": "Actor",
//                                   "firstName": "Sean",
//                                   "lastName": "Connery"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "21",
//                               "__typename": "Movie",
//                               "title": "Beowulf",
//                               "releaseYear": 2007,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "22",
//                               "__typename": "Movie",
//                               "title": "The Good Shepherd",
//                               "releaseYear": 2006,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "23",
//                               "__typename": "Movie",
//                               "title": "Shark Tale",
//                               "releaseYear": 2004,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "25",
//                           "__typename": "Actor",
//                           "firstName": "Jude",
//                           "lastName": "Law",
//                           "movies": [
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "26",
//                           "__typename": "Actor",
//                           "firstName": "Gwyneth",
//                           "lastName": "Paltrow",
//                           "movies": [
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     }
//                   ]
//                 },
//                 {
//                   "id": "26",
//                   "__typename": "Actor",
//                   "firstName": "Gwyneth",
//                   "lastName": "Paltrow",
//                   "movies": [
//                     {
//                       "id": "17",
//                       "__typename": "Movie",
//                       "title": "Sky Captain and the World of Tomorrow",
//                       "releaseYear": 2004,
//                       "genre": "SCIFI",
//                       "actors": [
//                         {
//                           "id": "2",
//                           "__typename": "Actor",
//                           "firstName": "Angelina",
//                           "lastName": "Jolie",
//                           "movies": [
//                             {
//                               "id": "1",
//                               "__typename": "Movie",
//                               "title": "Mr. and Mrs. Smith",
//                               "releaseYear": 2005,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "8",
//                               "__typename": "Movie",
//                               "title": "Maleficient",
//                               "releaseYear": 2014,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "9",
//                               "__typename": "Movie",
//                               "title": "Lara Croft Tomb Raider",
//                               "releaseYear": 2001,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "15",
//                                   "__typename": "Actor",
//                                   "firstName": "Daniel",
//                                   "lastName": "Craig"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "10",
//                               "__typename": "Movie",
//                               "title": "Wanted",
//                               "releaseYear": 2008,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "16",
//                                   "__typename": "Actor",
//                                   "firstName": "James",
//                                   "lastName": "McAvoy"
//                                 },
//                                 {
//                                   "id": "17",
//                                   "__typename": "Actor",
//                                   "firstName": "Morgan",
//                                   "lastName": "Freeman"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "11",
//                               "__typename": "Movie",
//                               "title": "Salt",
//                               "releaseYear": 2010,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "12",
//                               "__typename": "Movie",
//                               "title": "Gone in 60 Seconds",
//                               "releaseYear": 2000,
//                               "genre": "ACTION",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "18",
//                                   "__typename": "Actor",
//                                   "firstName": "Nicholas",
//                                   "lastName": "Cage"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "13",
//                               "__typename": "Movie",
//                               "title": "Kung Fu Panda",
//                               "releaseYear": 2008,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 },
//                                 {
//                                   "id": "20",
//                                   "__typename": "Actor",
//                                   "firstName": "Dustin",
//                                   "lastName": "Hoffman"
//                                 },
//                                 {
//                                   "id": "21",
//                                   "__typename": "Actor",
//                                   "firstName": "Jackie",
//                                   "lastName": "Chan"
//                                 },
//                                 {
//                                   "id": "22",
//                                   "__typename": "Actor",
//                                   "firstName": "Seth",
//                                   "lastName": "Rogen"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "14",
//                               "__typename": "Movie",
//                               "title": "The Tourist",
//                               "releaseYear": 2010,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "23",
//                                   "__typename": "Actor",
//                                   "firstName": "Johnny",
//                                   "lastName": "Depp"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "18",
//                               "__typename": "Movie",
//                               "title": "Girl, Interrupted",
//                               "releaseYear": 1999,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "27",
//                                   "__typename": "Actor",
//                                   "firstName": "Winona",
//                                   "lastName": "Ryder"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "19",
//                               "__typename": "Movie",
//                               "title": "Playing By Heart",
//                               "releaseYear": 1998,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "28",
//                                   "__typename": "Actor",
//                                   "firstName": "Sean",
//                                   "lastName": "Connery"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "20",
//                               "__typename": "Movie",
//                               "title": "By the Sea",
//                               "releaseYear": 2015,
//                               "genre": "ROMANCE",
//                               "actors": [
//                                 {
//                                   "id": "1",
//                                   "__typename": "Actor",
//                                   "firstName": "Brad",
//                                   "lastName": "Pitt"
//                                 },
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "21",
//                               "__typename": "Movie",
//                               "title": "Beowulf",
//                               "releaseYear": 2007,
//                               "genre": "ADVENTURE",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "24",
//                                   "__typename": "Actor",
//                                   "firstName": "Anthony",
//                                   "lastName": "Hopkins"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "22",
//                               "__typename": "Movie",
//                               "title": "The Good Shepherd",
//                               "releaseYear": 2006,
//                               "genre": "DRAMA",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "8",
//                                   "__typename": "Actor",
//                                   "firstName": "Matt",
//                                   "lastName": "Damon"
//                                 }
//                               ]
//                             },
//                             {
//                               "id": "23",
//                               "__typename": "Movie",
//                               "title": "Shark Tale",
//                               "releaseYear": 2004,
//                               "genre": "COMEDY",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "19",
//                                   "__typename": "Actor",
//                                   "firstName": "Jack",
//                                   "lastName": "Black"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "25",
//                           "__typename": "Actor",
//                           "firstName": "Jude",
//                           "lastName": "Law",
//                           "movies": [
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             }
//                           ]
//                         },
//                         {
//                           "id": "26",
//                           "__typename": "Actor",
//                           "firstName": "Gwyneth",
//                           "lastName": "Paltrow",
//                           "movies": [
//                             {
//                               "id": "17",
//                               "__typename": "Movie",
//                               "title": "Sky Captain and the World of Tomorrow",
//                               "releaseYear": 2004,
//                               "genre": "SCIFI",
//                               "actors": [
//                                 {
//                                   "id": "2",
//                                   "__typename": "Actor",
//                                   "firstName": "Angelina",
//                                   "lastName": "Jolie"
//                                 },
//                                 {
//                                   "id": "25",
//                                   "__typename": "Actor",
//                                   "firstName": "Jude",
//                                   "lastName": "Law"
//                                 },
//                                 {
//                                   "id": "26",
//                                   "__typename": "Actor",
//                                   "firstName": "Gwyneth",
//                                   "lastName": "Paltrow"
//                                 }
//                               ]
//                             }
//                           ]
//                         }
//                       ]
//                     }
//                   ]
//                 }
//               ]
//             }
//           ]
//         }
//     }
// const t0 = performance.now();
// console.log(normalizeObject(allMovies, arrHashableKeys))
// const t1 = performance.now();
// console.log(t1 - t0, 'milliseconds');
// const allMoviesLenTest = normalizeObject(allMovies, arrHashableKeys)
// console.log(Object.keys(allMoviesLenTest).length)



















