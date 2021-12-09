/** @format */
import { gql } from "https://deno.land/x/oak_graphql/mod.ts";
import { visit } from "https://deno.land/x/graphql_deno/mod.ts";
import { Cache } from "./quickCache.js";
import { deepEqual } from "./utils.js";
import {containsHashableObject, isHashableObject, hashMaker, printHashableObject, normalizeObject} from './normalize.ts'


const cache = new Cache();

export function invalidateCacheCheck(body) {
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

  for (const redisKey in normalizedMutation) {
    const normalizedData = normalizedMutation[key];
    const cachedVal = await cache.cacheReadObject(redisKey);

    // if no value in redis at @redisKey then it's an add mution so we write the added value to cache
    if (cachedVal === undefined) {
      await cache.cacheWriteObject(redisKey, normalizedData)
      return 'Add mutation -> Cache write performed'
    }

    // if response from mutation and cached response values are same then it's a delete mutation
    if (deepEqual(normalizedData, cachedVal)) {
      await cache.cacheDelete(redisKey)
      return 'Delete mutation -> Cache delete performed'
    } else {
      // otherwise it's an update mutation because mutation response doesn't match cached response values so we overwrite it
      // Edge case: update is done without changing any values... cache will be deleted from redis and needs to be rewritten to cache on the next request.
      await cache.cacheWriteObject(redisKey, normalizedData)
      return 'Update mutation -> Cache overwrite performed'
    }
  }
}