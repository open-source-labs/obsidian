function deepEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = isObject(val1) && isObject(val2);
      if (
        areObjects && !deepEqual(val1, val2) ||
        !areObjects && val1 !== val2
      ) {
        return false;
      }
    }
    return true;
}


const isMutation = (body) => {
  let isMutation = false;
  let ast = gql(body.query);

  const checkMutationVisitor = {
    OperationDefinition: (node) => {
      if (node.operation === "mutation") {
        isMutation = true;
      }
    },
  };

  // left this piece of code in case someone decides to build upon subscriptions, but for now obsidian doesn't do anything with subscriptions
  const subscriptionTunnelVisitor = {
    OperationDefinition: (node) => {
      if (node.operation === "subscription") {
      }
    },
  };

  visit(ast, { enter: subscriptionTunnelVisitor, leave: checkMutationVisitor });
  return isMutation;
}

const isAddMutation = (cachedVal) => {
  (cachedVal === undefined) ? true : false;
}

const isDeleteMutation = (cachedVal, normalizedResponseObjVal) => {
    deepEqual(normalizedData, cachedVal) ? true : false
}

const isUpdateMutation = (cachedVal, normalizedResponseObjVal) => {
    if(!isAddMutation(cachedVal) && !isDeleteMutation(cachedVal, normalizedResponseObjVal)) return true;
    return false;
}

const flattenedResponseObject = {
    '~Movie~7': {
        "id": "7",
        "__typename": "Movie",
        "title": "Ad Astra",
        "releaseYear": 2019,
        "genre": "SCIFI"
    },
    '~Actor~1' : {
        "id": "1",
        "__typename": "Actor",
        "firstName": "Brad",
        "lastName": "Pitt"
    }
}

// isMutation(body) done in outer function
// for in loop through normalized object done in outerfunction, which passes in args for this func:
const cacheInvalidationJS = async (redisKey, cachedVal, normalizedResponseObjVal) => {
    if(isAddMutation(cachedVal)) await cache.cacheWriteObject(redisKey, normalizedResponseObjVal)
    else if(isDeleteMutation(cachedVal, normalizedResponseObjVal)) await cache.cacheDelete(redisKey)
    else if(isUpdateMutation(cachedVal, normalizedResponseObjVal)) await cache.cacheWriteObject(redisKey, normalizedResponseObjVal)
}

/* Obsidian.ts:
normalizedObject = normalizeObject(...)
for(const key in normalizedObject){
    cachedVal = await cache.cacheReadObject(key)
    cacheInvalidationJS(key, cachedVal, normalizedObject[key])
}
*/