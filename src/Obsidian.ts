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
  persistQueries?: boolean;
  hashTableSize?: number;
  maxQueryDepth?: number;
  customIdentifier?: Array<string>;
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
  redisURI = '',
  policy = 'allkeys-lru',
  maxmemory = '2000mb',
  searchTerms = [],
  persistQueries = false, // default to false
  hashTableSize = 16, // default to 16
  maxQueryDepth = 0,
  customIdentifier = ['__typename', '_id'],
  mutationTableMap = {}, // Developer passes in object where keys are add mutations and values are arrays of affected tables
}: ObsidianRouterOptions<T>): Promise<T> {
  console.log('HELLOOOOOOOO ;)');
  const router = new Router();
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  let cache, hashTable;
  if (useCache) {
    cache = new Cache();
    scope.cache = cache;
    cache.connect(redisPort, policy, maxmemory);
    console.log('cleared the Cache');
    // if (policy || maxmemory) {
    //   // set redis configurations
    //   cache.configSet('maxmemory-policy', policy);
    //   cache.configSet('maxmemory', maxmemory);
    // }
  }
  if (persistQueries) {
    hashTable = new HashTable(hashTableSize);
  }

  //post
  await router.post(path, async (ctx: any) => {
    console.log('KEJHKJHEFKJSDHF');
    const t0 = performance.now(); // Used for demonstration of cache vs. db performance times

    const { response, request } = ctx;
    if (!request.hasBody) return;

    try {
      console.log('hellooooo from try');
      let queryStr;
      let body = await request.body().value;
      if (persistQueries && body.hash && !body.query) {
        console.log('persistQueries && body.hash && !body.query');
        const { hash } = body;
        // console.log('hash is ', hash);
        // console.log('hashTable.table is ', hashTable.table);
        queryStr = hashTable.get(hash);
        // console.log('queryStr is ',queryStr);
        // console.log('type of queryStr is', typeof queryStr);
        // if not found in hash table, respond so we can send full query.
        if (!queryStr) {
          response.status = 204;
          // console.log('about to return');
          return;
        }
      } else if (persistQueries && body.hash && body.query) {
        console.log('persistQueries && body.hash && body.query');
        const { hash, query } = body;
        hashTable.add(hash, query);
        // console.log('hashTable.table is ', hashTable.table);
        queryStr = query;
      } else if (persistQueries && !body.hash) {
        console.log('persistQueries && !body.hash');
        throw new Error('Hashed query not found');
      } else if (!persistQueries) {
        console.log('!persistQueries');
        queryStr = body.query;
      } else {
        console.log('else');
        throw new Error('Error occured while setting queryStr');
      }

      console.log('context is ', context);
      const contextResult = context ? await context(ctx) : undefined;
      console.log('contextResult is ', contextResult);
      // let body = await request.body().value;
      console.log('here?');
      // const selectedFields = mapSelectionSet(queryStr); // Gets requested fields from query and saves into an array
      console.log('there?');
      if (maxQueryDepth) queryDepthLimiter(queryStr, maxQueryDepth); // If a securty limit is set for maxQueryDepth, invoke queryDepthLimiter, which throws error if query depth exceeds maximum
      console.log('anywhere?');
      let restructuredBody = { query: restructure({query: queryStr}) }; // Restructure gets rid of variables and fragments from the query
      console.log('up?');
      console.log('down?');
      // Is query in cache?
      if (useCache) {
        console.log('we are using a cache');
        let cacheQueryValue = await cache.read(queryStr); // Parses query string into query key and checks cache for that key
        // console.log('cacheQueryValue is ', cacheQueryValue);
        // if we missed the cache.
        if (!cacheQueryValue) {
          console.log('missed the redis cacheeee');
          const gqlResponse = await (graphql as any)(
            schema,
            queryStr,
            resolvers,
            contextResult,
            body.variables || undefined,
            body.operationName || undefined
          );

          // console.log('gqlResponse is ', gqlResponse);

          // customIdentifier is a default param for Obsidian Router - defaults to ['id', '__typename']
          // this is the hashableKeys arg for normalizeObject
          const normalizedGQLResponse = normalizeObject( // Recursively flattens an arbitrarily nested object into an objects with hash key and hashable object pairs
            gqlResponse,
            customIdentifier
          );
          // console.log('normalizedGQLResponse is ', normalizedGQLResponse);

          if (isMutation(restructuredBody)) { // If operation is mutation, invalidate relevant responses in cache
            console.log('restructuredBody is a mutation');
            invalidateCache(
              normalizedGQLResponse,
              queryStr,
              mutationTableMap
            );
          }
          // If read query: run query, normalize GQL response, transform GQL response, write to cache, and write pieces of normalized GQL response objects
          else {
            // const transformedGQLResponse = transformResponse(
            //   gqlResponse,
            //   customIdentifier
            // );

            // console.log('transformedGQLResponse is ', transformedGQLResponse);

            // await cache.write(queryStr, transformedGQLResponse, false);
            // for (const key in normalizedGQLResponse) {
              await cache.write(queryStr, normalizedGQLResponse, searchTerms);
            // }
          }
          response.status = 200;
          response.body = gqlResponse; // Returns response from database
          const t1 = performance.now();
          console.log(
            '%c Obsidian received new data and took ' +
              (t1 - t0) +
              ' milliseconds',
            'background: #222; color: #FFFF00'
          );
          return;
        } else {
          console.log('left');
          console.log('cacheQueryValue is ', cacheQueryValue);
          // let detransformedCacheQueryValue = await detransformResponse( // Returns a nested object representing the original graphQL response object for a given queryKey 
          //   restructuredBody.query,
          //   cacheQueryValue,
          //   selectedFields
          // );
          // console.log('detransformedCacheQueryValue is ', detransformedCacheQueryValue);
          // if (!detransformedCacheQueryValue) {
          //   // cache was evicted if any partial cache is missing, which causes detransformResponse to return undefined
          //   cacheQueryValue = undefined;
  
          // } else { 
          // Successful cache hit
          response.status = 200;
          response.body = cacheQueryValue; // Returns response from cache
          const t1 = performance.now();
          console.log(
            '%c Obsidian retrieved data from cache and took ' +
              (t1 - t0) +
              ' milliseconds.',
            'background: #222; color: #00FF00'
          );
          return;
        }
      } else {
        console.log('we are not using a cache :(');
        // if not using a cache, go directly to the database
        const gqlResponse = await (graphql as any)(
          schema,
          queryStr,
          resolvers,
          contextResult,
          body.variables || undefined,
          body.operationName || undefined
        );

        // console.log('gqlResponse is ', gqlResponse);
        response.status = 200;
        response.body = gqlResponse; // Returns response from database
        const t1 = performance.now();
        console.log(
          '%c Obsidian received new data and took ' +
            (t1 - t0) +
            ' milliseconds',
          'background: #222; color: #FFFF00'
        );
        return;
      }
    } catch (error) {
      console.log('hellooo from catch');
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
