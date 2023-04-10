import { graphql } from 'https://cdn.pika.dev/graphql@15.0.0';
import { renderPlaygroundPage } from 'https://deno.land/x/oak_graphql@0.6.2/graphql-playground-html/render-playground-html.ts';
import { makeExecutableSchema } from 'https://deno.land/x/oak_graphql@0.6.2/graphql-tools/schema/makeExecutableSchema.ts';
import { Cache } from './quickCache.js';
import queryDepthLimiter from './DoSSecurity.ts';
import { restructure } from './restructure.ts';
import { normalizeObject } from './normalize.ts';
import { isMutation, invalidateCache } from './invalidateCacheCheck.ts';
import { mapSelectionSet } from './mapSelections.js';
import { HashTable } from './queryHash.js';

interface Constructable<T> {
  new (...args: any): T & OakRouter;
}

interface OakRouter {
  post: any;
  get: any;
  obsidianSchema?: any;
}

export interface ObsidianRouterOptions<T> {
  Router: Constructable<T>;
  path?: string;
  typeDefs: any;
  resolvers: ResolversProps;
  context?: (ctx: any) => any;
  usePlayground?: boolean;
  useCache?: boolean;
  redisPort?: number;
  redisURI?: string;
  policy?: string;
  maxmemory?: string;
  searchTerms?: string[];
  persistQueries?: boolean;
  hashTableSize?: number;
  maxQueryDepth?: number;
  customIdentifier?: string[];
  mutationTableMap?: Record<string, unknown>; // Deno recommended type name
}

export interface ResolversProps {
  Query?: any;
  Mutation?: any;
  [dynamicProperty: string]: any;
}

// Export developer chosen port for redis database connection //
export let redisPortExport: number = 6379;

// tentative fix to get invalidateCacheCheck.ts access to the cache;
export const scope: Record<string, unknown> = {};

/**
 *
 * @param param0
 * @returns
 */
export async function ObsidianRouter<T>({
  Router,
  path = '/graphql',
  typeDefs,
  resolvers,
  context,
  usePlayground = false,
  useCache = true, // default to true
  redisPort = 6379,
  policy = 'allkeys-lru',
  maxmemory = '2000mb',
  searchTerms = [], // Developer can pass in array of search categories
  persistQueries = false, // default to false
  hashTableSize = 16, // default to 16
  maxQueryDepth = 0,
  customIdentifier = ['__typename', '_id'],
  mutationTableMap = {}, // Developer passes in object where keys are add mutations and values are arrays of affected tables
}: ObsidianRouterOptions<T>): Promise<T> {
  const router = new Router();
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  let cache, hashTable;
  if (useCache) {
    cache = new Cache();
    scope.cache = cache;
    cache.connect(redisPort, policy, maxmemory);
  }
  if (persistQueries) {
    hashTable = new HashTable(hashTableSize);
  }

  //post
  await router.post(path, async (ctx: any) => {

    const { response, request } = ctx;
    if (!request.hasBody) return;

    try {
      let queryStr;
      let body = await request.body().value;
      if (persistQueries && body.hash && !body.query) {
        const { hash } = body;
        queryStr = hashTable.get(hash);
        // if not found in hash table, respond so we can send full query.
        if (!queryStr) {
          response.status = 204;
          return;
        }
      } else if (persistQueries && body.hash && body.query) {
        const { hash, query } = body;
        hashTable.add(hash, query);
        queryStr = query;
      } else if (persistQueries && !body.hash) {
        throw new Error('Unable to process request because hashed query was not provided');
      } else if (!persistQueries) {
        queryStr = body.query;
      } else {
        throw new Error('Unable to process request because query argument not provided');
      }

      const contextResult = context ? await context(ctx) : undefined;
      // const selectedFields = mapSelectionSet(queryStr); // Gets requested fields from query and saves into an array
      if (maxQueryDepth) queryDepthLimiter(queryStr, maxQueryDepth); // If a securty limit is set for maxQueryDepth, invoke queryDepthLimiter, which throws error if query depth exceeds maximum
      let restructuredBody = { query: restructure({query: queryStr}) }; // Restructure gets rid of variables and fragments from the query

      // IF WE ARE USING A CACHE
      if (useCache) {

        let cacheQueryValue = await cache.read(queryStr); // Parses query string into query key and checks cache for that key

        // ON CACHE MISS
        if (!cacheQueryValue) {
          // QUERY THE DATABASE
          const gqlResponse = await (graphql as any)(
            schema,
            queryStr,
            resolvers,
            contextResult,
            body.variables || undefined,
            body.operationName || undefined
          );

          // customIdentifier is a default param for Obsidian Router - defaults to ['__typename', '_id]
          const normalizedGQLResponse = normalizeObject( // Recursively flattens an arbitrarily nested object into an objects with hash key and hashable object pairs
            gqlResponse,
            customIdentifier
          );

          // If operation is mutation, invalidate relevant responses in cache
          if (isMutation(restructuredBody)) { 
            invalidateCache(normalizedGQLResponse, queryStr, mutationTableMap);
          // ELSE, simply write to the cache
          } else {
            await cache.write(queryStr, normalizedGQLResponse, searchTerms);
          }
          // AFTER HANDLING THE CACHE, RETURN THE ORIGINAL RESPONSE 
          response.status = 200;
          response.body = gqlResponse;
          return;
        // ON CACHE HIT
        } else {
          response.status = 200;
          response.body = cacheQueryValue; // Returns response from cache
          return;
        }
      // IF NOT USING A CACHE
      } else {
        // DIRECTLY QUERY THE DATABASE
        const gqlResponse = await (graphql as any)(
          schema,
          queryStr,
          resolvers,
          contextResult,
          body.variables || undefined,
          body.operationName || undefined
        );

        response.status = 200;
        response.body = gqlResponse; // Returns response from database
        return;
      }
    } catch (error) {
      response.status = 400;
      response.body = {
        data: null,
        errors: [
          {
            message: error.message ? error.message : error,
          },
        ],
      };
      console.error('Error: ', error.message);
    }
  });

  // serve graphql playground
  // deno-lint-ignore require-await
  await router.get(path, async (ctx: any) => {
    const { request, response } = ctx;
    if (usePlayground) {
      const prefersHTML = request.accepts('text/html');
      const optionsObj: any = {
        'schema.polling.enable': false, // enables automatic schema polling
      };

      if (prefersHTML) {
        const playground = renderPlaygroundPage({
          endpoint: request.url.origin + path,
          subscriptionEndpoint: request.url.origin,
          settings: optionsObj,
        });
        response.status = 200;
        response.body = playground;
        return;
      }
    }
  });

  return router;
}
