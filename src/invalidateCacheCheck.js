/** @format */
import { gql } from "https://deno.land/x/oak_graphql/mod.ts";
import { visit } from "https://deno.land/x/graphql_deno/mod.ts";
import { Cache } from "./quickCache.js";
import { deepEqual } from "./utils.js";

const cache = new Cache();

export function isMutation(body) {
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

export async function invalidateCache(normalizedMutation) {
  let normalizedData;
  let cachedVal;
  for (const redisKey in normalizedMutation) {
    normalizedData = normalizedMutation[redisKey];
    cachedVal = await cache.cacheReadObject(redisKey);

    // if response from mutation and cached response values are same then it's a delete mutation
    // edge case not covered for delete mutation: if value is not currently cached in redis it will be treated as add mutation and stale value will be written to redis 
    if (cachedVal !== undefined && deepEqual(normalizedData, cachedVal)) {
      await cache.cacheDelete(redisKey)
      return 'Delete mutation -> Cache delete performed'
    } else {
      // otherwise it's an update mutation because mutation response doesn't match cached response values so we overwrite it
      // Edge case: update is done without changing any values... cache will be deleted from redis and needs to be rewritten to cache on the next request.
      await cache.cacheWriteObject(redisKey, normalizedData)
      return 'Update or Add mutation -> Cache overwrite performed'
    }
  }
}



// THE BELOW NEEDS WORK TO BREAK UP THE CACHE INVALIDATION FUNCTIONALITY

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

export const cacheInvalidation = async (redisKey, cachedVal, normalizedResponseObjVal) => {
  if(isAddMutation(cachedVal)) await cache.cacheWriteObject(redisKey, normalizedResponseObjVal)
  else if(isDeleteMutation(cachedVal, normalizedResponseObjVal)) await cache.cacheDelete(redisKey)
  else if(isUpdateMutation(cachedVal, normalizedResponseObjVal)) await cache.cacheWriteObject(redisKey, normalizedResponseObjVal)
}