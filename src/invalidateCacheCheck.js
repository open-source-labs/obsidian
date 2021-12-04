/** @format */
import { gql } from "https://deno.land/x/oak_graphql/mod.ts";
import { visit } from "https://deno.land/x/graphql_deno/mod.ts";
import { Cache } from "./quickCache.js";

const cache = new Cache();

//Utilities
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
function isObject(object) {
  return object != null && typeof object === 'object';
}


export function invalidateCacheCheck(body) {
  let isMutation = false;
  let ast = gql(body.query);
  console.log('inside invalidateCacheCheck and this is the body passed in ->\n', body)

  const checkMutationVisitor = {
    OperationDefinition: (node) => {
      if (node.operation === "mutation") {
        isMutation = true;
        console.log('inside mutation body')
        // redisdb.flushdb(); // commented out while working on the invalidation
      }
    },
  };

  const subscriptionTunnelVisitor = {
    OperationDefinition: (node) => {
      if (node.operation === "subscription") {
        // left this piece of code in case someone decides to build upon subscriptions, but for now obsidian doesn't do anything with subscriptions
      }
    },
  };

  visit(ast, { enter: subscriptionTunnelVisitor, leave: checkMutationVisitor });
  return isMutation;
}

export function invalidateCache(mutationResponse, redisKey) {
  const cachedVal = await cache.cacheReadObject(redisKey)

  // if no value in redis at @redisKey then it's an add mution so we write the added value to cache
  if (cachedVal === undefined) {
    await cache.cacheWriteObject(redisKey, mutationResponse)
    return 'Add mutation -> Cache write performed'
  }

  // if response from mutation and cached response values are same then it's a delete mutation
  if (deepEqual(mutationResponse, cachedVal)) {
    await cache.cacheDelete(redisKey)
    return 'Delete mutation -> Cache delete performed'
   } else {
     // otherwise it's an update mutation because mutation response doesn't match cached response values so we overwrite it
     await cache.cacheWriteObject(redisKey, mutationResponse)
     return 'Update mutation -> Cache overwrite performed'
    } 
}
