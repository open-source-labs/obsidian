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



















