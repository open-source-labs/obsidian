import { graphql } from 'https://cdn.pika.dev/graphql@15.0.0';
import { renderPlaygroundPage } from 'https://deno.land/x/oak_graphql@0.6.2/graphql-playground-html/render-playground-html.ts';
import { makeExecutableSchema } from 'https://deno.land/x/oak_graphql@0.6.2/graphql-tools/schema/makeExecutableSchema.ts';
import LFUCache from './lfuBrowserCache.js';
import { Cache } from './CacheClassServer.js';

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
  policy?: string;
  maxmemory?: string;
}

export interface ResolversProps {
  Query?: any;
  Mutation?: any;
  [dynamicProperty: string]: any;
}

// Export developer chosen port for redis database connection //
export let redisPortExport: number = 6379;

export async function ObsidianRouter<T>({
  Router,
  path = '/graphql',
  typeDefs,
  resolvers,
  context,
  usePlayground = false,
  useCache = true,
  redisPort = 6379,
  policy,
  maxmemory,
}: ObsidianRouterOptions<T>): Promise<T> {
  redisPortExport = redisPort;
  const router = new Router();

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // If using LFU Browser Caching, the following cache line needs to be uncommented.
  // const cache = new LFUCache(50);

  // If using Redis caching, the following lines need to be uncommented.
  const cache = new Cache();

  // clear redis cache when restarting the server
  cache.cacheClear();

  // set redis configurations

  if (policy || maxmemory) {
    console.log('inside if');
    cache.configSet('maxmemory-policy', policy);
    cache.configSet('maxmemory', maxmemory);
  }

  await router.post(path, async (ctx: any) => {
    var t0 = performance.now();
    const { response, request } = ctx;
    if (request.hasBody) {
      try {
        const contextResult = context ? await context(ctx) : undefined;
        const body = await request.body().value;
        // Variable to block the normalization of mutations //
        let toNormalize = true;

        if (useCache) {
          // Send query off to be destructured and found in Redis if possible //
          const obsidianReturn = await cache.read(body.query, body.variables);
          console.log('Retrieved from cache: \n\t', obsidianReturn);
          if (obsidianReturn) {
            response.status = 200;
            response.body = obsidianReturn;
            var t1 = performance.now();
            console.log(
              'Obsidian retrieved data from cache and took ' +
                (t1 - t0) +
                ' milliseconds.'
            );
            return;
          }
        }

        // if not in cache, it will fetch a new response from database
        const result = await (graphql as any)(
          schema,
          body.query,
          resolvers,
          contextResult,
          body.variables || undefined,
          body.operationName || undefined
        );

        // Send database response to client //
        response.status = 200;
        response.body = result;

        // Normalize response and store in cache //
        if (useCache && toNormalize && !result.errors)
          cache.write(body.query, result, false, body.variables);
        var t1 = performance.now();
        console.log(
          'Obsidian received new data and took ' + (t1 - t0) + ' milliseconds.'
        );
        return;
      } catch (error) {
        response.status = 200;
        response.body = {
          data: null,
          errors: [
            {
              message: error.message ? error.message : error,
            },
          ],
        };
        return;
      }
    }
  });
  // serve graphql playground
  await router.get(path, async (ctx: any) => {
    const { request, response } = ctx;
    if (usePlayground) {
      const prefersHTML = request.accepts('text/html');

      if (prefersHTML) {
        const playground = renderPlaygroundPage({
          endpoint: request.url.origin + path,
          subscriptionEndpoint: request.url.origin,
        });
        response.status = 200;
        response.body = playground;
        return;
      }
    }
  });

  return router;
}
