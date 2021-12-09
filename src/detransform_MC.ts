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
   * isHashableObject
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
  const containsHashableObjTrue3 = {
    "id": "1",
    "__typename": "Actor",
    "firstName": "Brad",
    "lastName": "Pitt",
    "movies": ["Ad Astra", "Fight Club"]
  }
  console.log(containsHashableObject(containsHashableObjFalse1, arrHashableKeys));
  console.log(containsHashableObject(containsHashableObjTrue1, arrHashableKeys));
  console.log(containsHashableObject(containsHashableObjTrue2, arrHashableKeys));
  console.log(containsHashableObject(containsHashableObjTrue3, arrHashableKeys));
  /* ----------------------------------------------------------------*/
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  /* ----------------------------------------------------------------*/
  /** isHashableObject - 
   * isUnnestedHashableObject
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
  
  /* ----------------------------------------------------------------*/
  
  
  
  
  
  
  
  /* ----------------------------------------------------------------*/
  type FlatObject = { [key:string]: (string | number | boolean)};
  /**
  * Creates unique hash for an object with hashable keys
  *
  * @param {FlatObject} hashableObject Object that has all hashable keys 
  * @return {ArrayOfObjects} Array of normalized objects
  */
  const hashMaker = (hashableObject, hashableKeys):string => {
    // if(!isHashableObject(hashableObject, hashableKeys)) return "Not a hashable object";
    
    let hash = '';
    let value = '';
  
    for(let i = hashableKeys.length - 1; i >= 0; i--){
        value = '~';
        value += hashableObject[hashableKeys[i]]
        hash += value;
    }
    
    // for(const hashableKey of hashableKeys){
    //     let value = '~';
    //     value += hashableObject[hashableKey]
    //     hash += value;
    // }
    
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
  console.log(printHashableObject(containsHashableObjTrue3));
  
  /* ----------------------------------------------------------------*/
  
  /**
  * Flattens an arbitrarily nested object into an array of objects by: 
  * 
  *
  * @param {GenericObject} nestedObject Nested object 
  * @return {FlatObject} Object of normalized objects in its keys
  */
  // const normalizeObject = (nestedObject: GenericObject, hashableKeys:Array<string>, normalizedObjects = []):ArrayOfObjects => {
  //     for(const key in nestedObject){
  //         if(isHashableObject(nestedObject, hashableKeys)) normalizedObjects.push(nestedObject)
  //         if(isHashableObject(nestedObject[key], hashableKeys)) normalizedObjects.push(nestedObject[key])
  //         if(containsHashableObject(nestedObject[key], hashableKeys)) normalizedObjects.push(printHashableObject(nestedObject[key]));
  //         if(!containsHashableObject(nestedObject, hashableKeys)) normalizeObject(nestedObject[key], hashableKeys, normalizedObjects)
  //     }
  //     return normalizedObjects;
  // }
  const normalizeObject = (nestedObject: GenericObject, hashableKeys:Array<string>, normalizedHashableObjects = {}):FlatObject => {
    for(const key in nestedObject){
        let visitedFlag = false;
        if(containsHashableObject(nestedObject, hashableKeys)){
            visitedFlag = true;
            const hashableObject = printHashableObject(nestedObject);
            const hash = hashMaker(hashableObject, hashableKeys);
            if(!normalizedHashableObjects.hasOwnProperty(hash)) normalizedHashableObjects[hash] = hashableObject;
        }
        if(typeof nestedObject[key] === 'object') normalizeObject(nestedObject[key], hashableKeys, normalizedHashableObjects);
    }
    return normalizedHashableObjects;
  }
  
  const isArrayOfHashableObjects = (nestedObject, hashableKeys) => {
    nestedObject;
    if (Array.isArray(nestedObject)) {
      nestedObject;
      return nestedObject.every(element => {
        element;
        console.log(containsHashableObject(element, hashableKeys))
        return containsHashableObject(element, hashableKeys);
      })
    }
    return false;
  }
  
  /* ----------------------------------------------------------------*/
  /** transformResult 
  * Returns a nested object representing an object of references, where the references are hashes in Redis. The responseObject input must:
  * 1) Contain hashable object(s)
  * 2) have a first key of 'data', as should all GraphQL response objects
  * 3) have an inner array of data response objects corresponding to the GraphQL fields
  *
  * @param {GenericObject} responseObject GraphQL response Object for large read query
  * @param {array} hashableKeys Array of hashable keys
  * @return {GenericObject} Nested object representing an object of references, where the references are hashes in Redis
  */
  const transformResult = (responseObject: GenericObject, hashableKeys: Array<String>) => {
    const result = {};
    // console.log(responseObject);
    if (responseObject.data) {
      return transformResult(responseObject.data, hashableKeys);
    } else if (isHashableObject(responseObject, hashableKeys)) {
      return result;
    } else {
      responseObject;
      for (const key in responseObject) {
        if (isArrayOfHashableObjects(responseObject[key], hashableKeys)) {
          for (const element of responseObject[key]) {
            let hash = hashMaker(element, hashableKeys);
            // console.log(hash);
            // console.log(element);
            result[hash] = transformResult(element, hashableKeys);
          }
        }
      }
    }
    return result;
  }
  
  const mExpectedDetransformedValue =  
  {
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
              firstName: "Movie",
              lastName: "Ad Astra"
            },
            {
              id: "2",
              __typename: "Actor",
              firstName: "Movie",
              lastName: "Ad Astra"
            }
          ]
        },
        {
          id: "15",
          __typename: "Movie",
          title: "World War Z",
          releaseYear: 2013,
          genre: "SCIFI",
          actors: [
            {
              id: "3",
              __typename: "Actor",
              firstName: "Movie",
              lastName: "Ad Astra"
            },
            {
              id: "4",
              __typename: "Actor",
              firstName: "Movie",
              lastName: "Ad Astra"
            }
          ]
        },
        {
          id: "17",
          __typename: "Movie",
          title: "Sky Captain and the World of Tomorrow",
          releaseYear: 2004,
          genre: "SCIFI",
          actors: [
            {
              id: "5",
              __typename: "Actor",
              firstName: "Movie",
              lastName: "Ad Astra"
            },
            {
              id: "6",
              __typename: "Actor",
              firstName: "Movie",
              lastName: "Ad Astra"
            }
          ]
          // actors: [~Actor~1, ~Actor~2]
        }
      ]
    }
  }
  const x = (transformResult(mExpectedDetransformedValue, arrHashableKeys));
  console.log(x);