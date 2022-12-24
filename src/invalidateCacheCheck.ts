/** @format */
import { gql } from 'https://deno.land/x/oak_graphql/mod.ts';
import { visit } from 'https://deno.land/x/graphql_deno/mod.ts';
import { redisdb, Cache } from './quickCache.js';
import { deepEqual } from './utils.js';

const cache = new Cache();

/**
 * @param {any} gqlQuery - Object containing the query string
 * @param {boolean} isMutation - Boolean indicating if it's a mutation query
 * @return {boolean} isMutation
 */
export function isMutation(gqlQuery: { query: string }): boolean {
  let isMutation: boolean = false;
  let ast: any = gql(gqlQuery.query);

  const checkMutationVisitor: object = {
    OperationDefinition: (node: { operation: string }) => {
      if (node.operation === 'mutation') {
        isMutation = true;
      }
    },
  };

  // left this piece of code in case someone decides to build upon subscriptions, but for now obsidian doesn't do anything with subscriptions
  const subscriptionTunnelVisitor = {
    OperationDefinition: (node: { operation: string }) => {
      if (node.operation === 'subscription') {
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
 * @param {string} queryString - raw mutation query. Passed onto isDelete function
 * Ex: 'mutation { addMovie(input: {title: "sdfsdg", releaseYear: 1234, genre: ACTION }) { __typename  id ti...'
 * @return {void}
 */
export async function invalidateCache(
  normalizedMutation: { [key: string]: object },
  queryString: string,
  mutationTableMap: Record<string, unknown>
) {
  let normalizedData: object;
  let cachedVal: any;

  // Common case is that we get one mutation at a time. But it's possible to group multiple mutation queries into one.
  // That's why the for loop is needed
  for (const redisKey in normalizedMutation) {
    normalizedData = normalizedMutation[redisKey];
    cachedVal = await cache.cacheReadObject(redisKey);

    // if response objects from mutation and cache are deeply equal then we delete it from cache because it infers that it's a delete mutation
    if (
      (cachedVal !== undefined && deepEqual(normalizedData, cachedVal)) ||
      isDelete(queryString)
    ) {
      await cache.cacheDelete(redisKey);
    } 
    else {
      // Otherwise it's an update or add mutation because response objects from mutation and cache don't match. 
      // We overwrite the existing cache value or write new data if cache at that key doesn't exist
      // Edge case: update is done without changing any values... cache will be deleted from redis because the response obj and cached obj will be equal
      if (cachedVal === undefined) { // checks if add mutation
        let ast = gql(queryString);
        const mutationType =
          ast.definitions[0].selectionSet.selections[0].name.value; // Extracts mutationType from query string

        const staleRefs: Array<string> = mutationTableMap[mutationType]; // Grabs array of affected data tables from dev specified mutationTableMap

        const rootQueryContents = await redisdb.hgetall('ROOT_QUERY'); // Creates array of all query keys and values in ROOT_QUERY from Redis

        for (let j = 0; j < staleRefs.length; j++) {                // Checks for all query keys that refer to the affected tables and deletes them from Redis
          for (let i = 0; i < rootQueryContents.length; i += 2) {
            if (
              staleRefs[j] === rootQueryContents[i].slice(0, staleRefs[j].length)
            ) {
              redisdb.hdel('ROOT_QUERY', rootQueryContents[i]);
            }
          }
        }
      }
      await cache.cacheWriteObject(redisKey, normalizedData); // Adds or updates reference in redis cache
    }
  }
}

/**
 * Returns a boolean that's used to decide on deleting a value from cache
 * @param {string} queryString - raw mutation query.
 * Ex: 'mutation { addMovie(input: {title: "sdfsdg", releaseYear: 1234, genre: ACTION }) { __typename  id ti...'
 * @return {boolean} isDeleteFlag
 */
export function isDelete(queryString: string) {
  // Because we check if response object from delete mutation equals to cached object to determine if it's a delete mutation
  // but there may be instances that the object is evicted from cache or never cached previously which would be treated as add or update mutation
  // if we find any keywords we're looking for in the mutation query that infer deletion we force the deletion
  const deleteKeywords: Array<string> = ['delete', 'remove'];
  let isDeleteFlag: boolean = false;

  for (const keyword of deleteKeywords) {
    const regex = new RegExp(keyword);
    // if query string contains any of the keywords in the deleteKeywords array we set the flag to true and break out of the loop
    if (queryString.search(regex) !== -1) {
      isDeleteFlag = true;
      break;
    }
  }
  return isDeleteFlag;
}
