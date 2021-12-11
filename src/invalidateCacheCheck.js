/** @format */
import { gql } from "https://deno.land/x/oak_graphql/mod.ts";
import { visit } from "https://deno.land/x/graphql_deno/mod.ts";
import { Cache } from "./quickCache.js";
import { deepEqual } from "./utils.js";

const cache = new Cache();

/**
 * @param {object} gqlQuery - Object containing the query string
 * @return {boolean} Boolean indicating if it's a mutation query
 */
export function isMutation(gqlQuery) {
  let isMutation = false;
  let ast = gql(gqlQuery.query);

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

/**
 * Invalidates cache in redis based on the mutation type.
 * @param {object} normalizedMutation - Object containing hash val in redis as key and normalized object as value. 
 * Ex: {
 * ~7~Movie: {id: 7, __typename: Movie, title: Ad Astra, releaseYear: 2019}
 * }
 * @param {string} queryString - raw mutation query.
 * Ex: 'mutation { addMovie(input: {title: "sdfsdg", releaseYear: 1234, genre: ACTION }) { __typename  id ti...'
 * @return {boolean} Boolean indicating if objectInQuestion is hashable or not
 */
export async function invalidateCache(normalizedMutation, queryString) {
  // isDelete flag is a safety net for delete mutations.
  // it's set to true if certain keywords such as 'delete' are found in the mutation query
  // Because we check if response object from delete mutation equals to cached object to determine if it's a delete mutation 
  // but there may be instances that the object is evicted from cache or never cached previously.
  const deleteKeywords = ['delete', 'remove']
  let isDelete = false;
  for (const keyword of deleteKeywords) {
    const regex = new RegExp(keyword);
    if (queryString.search(regex) !== -1) isDelete = true;
  }

  let normalizedData;
  let cachedVal;
  for (const redisKey in normalizedMutation) {
    normalizedData = normalizedMutation[redisKey];
    cachedVal = await cache.cacheReadObject(redisKey);

    // if response from mutation and cached response values are same then we assume it's a delete mutation
    if (cachedVal !== undefined && deepEqual(normalizedData, cachedVal) || isDelete) {
      await cache.cacheDelete(redisKey)
      return 'Cached object deleted due to mutation'
    } else {
      // otherwise it's an update or add mutation because mutation response doesn't match cached response values so we overwrite it
      // Edge case: update is done without changing any values... cache will be deleted from redis because the response obj and cached obj will be equal
      // we put it in the backburner because it doesn't make our cache stale, we would just perform an extra operation to re-cache the missing value when a request comes in
      await cache.cacheWriteObject(redisKey, normalizedData)
      // extra check to delete the cached object if it contains certain keywords
      return 'Cached object updated or added due to mutation'
    }
  }
}