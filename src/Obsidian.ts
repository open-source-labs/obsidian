import { graphql } from 'https://cdn.pika.dev/graphql@15.0.0';
import { renderPlaygroundPage } from 'https://deno.land/x/oak_graphql@0.6.2/graphql-playground-html/render-playground-html.ts';
import { makeExecutableSchema } from 'https://deno.land/x/oak_graphql@0.6.2/graphql-tools/schema/makeExecutableSchema.ts';
import { Cache } from './quickCache.js';
import queryDepthLimiter from './DoSSecurity.ts';
import { restructure } from './restructure.ts';
import { invalidateCache } from './invalidateCacheCheck.js';
import { rebuildFromQuery } from './rebuild.js'
import { normalizeObject } from './normalize.ts'
import { transformResponse, detransformResponse } from './transformResponse.ts'
import { isMutation } from './invalidateCacheCheck.js'
// import LFUCache from './Browser/lfuBrowserCache.js';

interface Constructable<T> {
  new(...args: any): T & OakRouter;
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
  useCache?: boolean; // trivial parameter
  redisPort?: number;
  policy?: string;
  maxmemory?: string;
  maxQueryDepth?: number;
  useQueryCache?: boolean; // trivial parameter
  useRebuildCache?: boolean;
  customIdentifier?: Array<string>;
}

export interface ResolversProps {
  Query?: any;
  Mutation?: any;
  [dynamicProperty: string]: any;
}

// Export developer chosen port for redis database connection //
export let redisPortExport: number = 6379;

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
  useCache = true,
  redisPort = 6379,
  policy = 'allkeys-lru',
  maxmemory = '2000mb',
  maxQueryDepth = 0,
  useQueryCache = true,
  useRebuildCache = true,
  customIdentifier = ["id", "__typename"],
}: ObsidianRouterOptions<T>): Promise<T> {
  redisPortExport = redisPort;
  const router = new Router();
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  // const cache = new LFUCache(50); // If using LFU Browser Caching, uncomment line
  const cache = new Cache(); // If using Redis caching, uncomment line
  cache.cacheClear();
  if (policy || maxmemory) { // set redis configurations
    cache.configSet('maxmemory-policy', policy);
    cache.configSet('maxmemory', maxmemory);
  }

  await router.post(path, async (ctx: any) => {
    const t0 = performance.now();
    const { response, request } = ctx;
    if (!request.hasBody) return; 
    try {
      const contextResult = context ? await context(ctx) : undefined;
      let body = await request.body().value;
      if (maxQueryDepth) queryDepthLimiter(body.query, maxQueryDepth); // If a securty limit is set for maxQueryDepth, invoke queryDepthLimiter, which throws error if query depth exceeds maximum
      body = { query: restructure(body) }; // Restructre gets rid of variables and fragments from the query
      // Is query in cache? 
      let cacheQueryValue = await cache.read(body.query) //problem?
      if (useCache && useQueryCache && cacheQueryValue){
        const detransformedCacheQueryValue = await detransformResponse(body.query, cacheQueryValue)
        response.status = 200;
        response.body = detransformedCacheQueryValue;
        const t1 = performance.now();
        console.log(
          '%c Obsidian retrieved data from cache and took ' +
          (t1 - t0) +
          ' milliseconds.', "background: #222; color: #00FF00"
        );
      }
      // If not in cache: 
        // If mutation: invalidate cache
        // If read query: run query, normalize GQL response, transform GQL response, write to cache, and write pieces of normalized GQL response objects
      else if(useCache && useQueryCache && !cacheQueryValue){
        const gqlResponse = await (graphql as any)(
          schema,
          body.query,
          resolvers,
          contextResult,
          body.variables || undefined,
          body.operationName || undefined
        );
        const normalizedGQLResponse = normalizeObject(gqlResponse, customIdentifier);
        if(isMutation(body)) { 
          invalidateCache(normalizedGQLResponse);
        }
        else {
          const transformedGQLResponse = transformResponse(normalizedGQLResponse, customIdentifier);
          await cache.write(body.query, transformedGQLResponse, false);
          for(const key in normalizedGQLResponse){
            await cache.cacheWriteObject(key, normalizedGQLResponse[key]); 
          }
        }
        response.status = 200;
        response.body = gqlResponse;
        const t1 = performance.now();
        console.log(
          '%c Obsidian received new data and took ' +
          (t1 - t0) +
          ' milliseconds', 'background: #222; color: #FFFF00'
        );
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
  await router.get(path, async (ctx: any) => {
    const { request, response } = ctx;
    if (usePlayground) {
      const prefersHTML = request.accepts('text/html');
      const optionsObj: any = {
        'schema.polling.enable': false, // enables automatic schema polling
      }

      if (prefersHTML) {

        const playground = renderPlaygroundPage({
          endpoint: request.url.origin + path,
          subscriptionEndpoint: request.url.origin,
          settings: optionsObj
        });
        response.status = 200;
        response.body = playground;
        return;
      }
    }
  });

  return router;
}
