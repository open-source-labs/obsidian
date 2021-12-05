/**
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
const hashableKeys = ["id", "__typename"];
console.log(isHashableKey("id", hashableKeys));
console.log(isHashableKey("__typename", hashableKeys));
console.log(isHashableKey(["id"], hashableKeys));
console.log(isHashableKey({"id": "id"}, hashableKeys));
console.log(isHashableKey("Brad", hashableKeys));

/* ----------------------------------------------------------------*/
/**
 * Returns a boolean indicating that the passed in value is hashable. It must:
 * 1) Be an object
 * 2) Not have any nesting (i.e., contains no objects or arrays)
 * 3) Contain all hashable keys
 *
 * @param {any} objectInQuestion Object being tested if hashable
 * @param {array} hashableKeys Array of hashable keys
 * @return {boolean} Boolean indicating if objectInQuestion is hashable or not
 */
 const isHashableObject = (objectInQuestion, hashableKeys:string[]):boolean => {
    if((typeof objectInQuestion !== 'object') || (Array.isArray(objectInQuestion)) || (objectInQuestion === null)) return false;
    for(const key in objectInQuestion){
        if(typeof objectInQuestion[key] === 'object') return false;
    }
    const objectInQuestionKeysSet = new Set(Object.keys(objectInQuestion));
    return hashableKeys.every(hashableKey => objectInQuestionKeysSet.has(hashableKey))
}
const hashableObjFail1 = ["id", "__typename"]
const hashableObjFail2 = 
{
    "id": "11", 
    "__typename": "Movie", 
    "title": "Ad Astra",
    "thing": {"generic": "thing"}
}
console.log(isHashableObject(hashableObjFail1, hashableKeys));
console.log(isHashableObject(hashableObjFail2, hashableKeys));
/* ----------------------------------------------------------------*/
type FlatObject = { [key:string]: (string | number | boolean)};
/**
 * Creates unique hash for an object with hashable keys 
 *
 * @param {FlatObject} nestedObject Nested object 
 * @return {ArrayOfObjects} Array of normalized objects
 */
const hashMaker = (hashableObject, hashableKeys):ArrayOfObjects => {
    if(!isHashableObject(hashableObject, hashableKeys)) return "Not a hashable object";
    let hash = '';
    let tilde = "~"
    for(let i = hashableKeys.length - 1; i >= 0; i--){
        let value = '';
        value += tilde;
        value += hashableObject[hashableKeys[i]]
        hash += value;
    }
    // for(const hashableKey of hashableKeys){
    //     let value = '';
    //     value += tilde;
    //     value += hashableObject[hashableKey]
    //     hash += value;
    // }
    return hash;
}
console.log(hashMaker({"id": "7", "__typename": "Movie", "title": "Ad Astra"}, hashableKeys));

/* ----------------------------------------------------------------*/
type GenericObject = { [key:string]: any};
type ArrayOfObjects = GenericObject[]
/**
 * Flattens an arbitrarily nested object into an array of objects by checking if 
 * 1) Object has hashable key
 * 2) Object doesn't have any objects or arrays (i.e., no more nesting)
 *
 * @param {GenericObject} nestedObject Nested object 
 * @return {ArrayOfObjects} Array of normalized objects
 */
const normalizeObject = (nestedObject: GenericObject):ArrayOfObjects => {
    
}
const nestedObject1 = {
    "data": {
        "movies": [
            {
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
            },
            {
                "id": "15",
                "__typename": "Movie",
                "title": "World War Z",
                "releaseYear": 2013,
                "genre": "SCIFI",
                "actors": [
                    {
                        "id": "1",
                        "__typename": "Actor",
                        "firstName": "Brad",
                        "lastName": "Pitt"
                    }
                ]
            },
            {
                "id": "17",
                "__typename": "Movie",
                "title": "Sky Captain and the World of Tomorrow",
                "releaseYear": 2004,
                "genre": "SCIFI",
                "actors": [
                    {
                        "id": "2",
                        "__typename": "Actor",
                        "firstName": "Angelina",
                        "lastName": "Jolie"
                    },
                    {
                        "id": "25",
                        "__typename": "Actor",
                        "firstName": "Jude",
                        "lastName": "Law"
                    },
                    {
                        "id": "26",
                        "__typename": "Actor",
                        "firstName": "Gwyneth",
                        "lastName": "Paltrow"
                    }
                ]
            }
        ]
    }
}
console.log(normalizeObject(nestedObject1));


























