/** isHashableKey - O(n) such that n is the length of hashableKeys array
 * Returns a boolean indicating that the passed in value is a hasbale key
 *
 * @param {string} key  Key to test if hashable
 * @param {Array} hashableKeys Array of hashable keys
 * @return {boolean} Hashable or not
 */
 const isHashableKey = (key:string, hashableKeys:string[]):boolean => {
    const hashableKeysSet = new Set(hashableKeys);
    return hashableKeysSet.has(key)
}
const arrHashableKeys = ["id", "__typename"];
console.log(isHashableKey("id", arrHashableKeys));
console.log(isHashableKey("__typename", arrHashableKeys));
console.log(isHashableKey(["id"], arrHashableKeys));
console.log(isHashableKey({"id": "id"}, arrHashableKeys));
console.log(isHashableKey("Brad", arrHashableKeys));

/* ----------------------------------------------------------------*/

















/* ----------------------------------------------------------------*/

/** containsHashableObject - O(n) such that n is the length of hashableKeys array
 * Returns a boolean indicating that the passed in value contains a hashable object. It must:
 * 1) Be an object
 * 2) Has all hashable keys
 *
 * @param {any} objectInQuestion Object being tested if hashable
 * @param {Array} hashableKeys Array of hashable keys
 * @return {boolean} Boolean indicating if objectInQuestion is hashable or not
 */

 const containsHashableObject = (objectInQuestion: GenericObject, hashableKeys: Array<string>) => {
    if(typeof objectInQuestion !== 'object' ||
        Array.isArray(objectInQuestion) ||
        !objectInQuestion
    ) return false;
    const objectInQuestionKeysSet = new Set(Object.keys(objectInQuestion));
    return hashableKeys.every(key => objectInQuestionKeysSet.has(key))
}

const containsHashableObjFalse1 =
[
    "id",
    "__typename"
]
const containsHashableObjTrue1 = 
{
    "id": "11", 
    "__typename": "Movie", 
    "title": "Ad Astra",
    "thing": {"generic": "thing"}
}
const containsHashableObjTrue2 = {
    "id": "7",
    "__typename": "Movie",
    "title": "Ad Astra",
    "releaseYear": 2019,
    "genre": "SCIFI",
    "actors": [
        {
            "id": "1",
            "__typename": "Actor",
            "firstName": "Brad",
            "lastName": "Pitt"
        },
        {
            "id": "14",
            "__typename": "Actor",
            "firstName": "Tommy Lee",
            "lastName": "Jones"
        }
    ]
}

console.log(containsHashableObject(containsHashableObjFalse1, arrHashableKeys));
console.log(containsHashableObject(containsHashableObjTrue1, arrHashableKeys));
console.log(containsHashableObject(containsHashableObjTrue2, arrHashableKeys));
/* ----------------------------------------------------------------*/















/* ----------------------------------------------------------------*/
/** isHashableObject - 
 * Returns a boolean indicating that the passed in value is hashable. It must:
 * 1) Contain hashable object
 * 2) Does not have any nesting (i.e., contains no objects or array values)
 *
 * @param {any} objectInQuestion Object being tested if hashable
 * @param {array} hashableKeys Array of hashable keys
 * @return {boolean} Boolean indicating if objectInQuestion is hashable or not
 */
 const isHashableObject = (objectInQuestion:any, hashableKeys:Array<string>):boolean => {
    if(!containsHashableObject(objectInQuestion, hashableKeys)) return false;
    for(const key in objectInQuestion){
        if(typeof objectInQuestion[key] === 'object') return false;
    }
    return true;
}

const isHashableObjFalse1 =
[
    "id",
    "__typename"
]
const isHashableObjFalse2 =
{
    "id": "11",
    "__typename": "Movie",
    "title": "Ad Astra",
    "thing": {"generic": "thing"}
}
const isHashableObjTrue1 = 
{
    "id": "7",
    "__typename": "Movie",
    "title": "Ad Astra",
    "releaseYear": 2019,
    "genre": "SCIFI"
}
const isHashableObjTrue2 =
{
    "id": "1",
    "__typename": "Actor",
    "firstName": "Brad",
    "lastName": "Pitt"
}

console.log(isHashableObject(isHashableObjFalse1, arrHashableKeys));
console.log(isHashableObject(isHashableObjFalse2, arrHashableKeys));
console.log(isHashableObject(isHashableObjTrue1, arrHashableKeys));
console.log(isHashableObject(isHashableObjTrue2, arrHashableKeys));
/* ----------------------------------------------------------------*/







/* ----------------------------------------------------------------*/
type FlatObject = { [key:string]: (string | number | boolean)};
/**
 * Creates unique hash for an object with hashable keys
 *
 * @param {FlatObject} nestedObject Nested object 
 * @return {ArrayOfObjects} Array of normalized objects
 */
const hashMaker = (hashableObject, hashableKeys):string => {
    if(!isHashableObject(hashableObject, hashableKeys)) return "Not a hashable object";
    
    let hash = '';
    let value = '';

    for(let i = hashableKeys.length - 1; i >= 0; i--){
        value = '~';
        value += hashableObject[hashableKeys[i]]
        hash += value;
    }
    /*
    for(const hashableKey of hashableKeys){
        let value = '';
        value += tilde;
        value += hashableObject[hashableKey]
        hash += value;
    }
    */
    return hash;
}
console.log(hashMaker({"id": "7", "__typename": "Movie", "title": "Ad Astra"}, arrHashableKeys));

/* ----------------------------------------------------------------*/
type GenericObject = { [key:string]: any};
type ArrayOfObjects = GenericObject[]

const printHashableObject = (hashableObject: GenericObject):GenericObject => {
    const hashObj = {};
    for(const key in hashableObject){
        if(typeof hashableObject[key] !== 'object' && !hashObj.hasOwnProperty(key)) hashObj[key] = hashableObject[key];
    }
    return hashObj;
}

console.log(printHashableObject(containsHashableObjTrue1));
console.log(printHashableObject(containsHashableObjTrue2));





























