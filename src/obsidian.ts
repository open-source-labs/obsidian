import { graphql } from 'https://cdn.pika.dev/graphql@15.0.0';
import { renderPlaygroundPage } from 'https://deno.land/x/oak_graphql@0.6.2/graphql-playground-html/render-playground-html.ts';
import { makeExecutableSchema } from 'https://deno.land/x/oak_graphql@0.6.2/graphql-tools/schema/makeExecutableSchema.ts';
import getObsidianSchema from './getObsidianSchema.js';
import { Cache } from './CacheClass.js';

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
}: ObsidianRouterOptions<T>): Promise<T> {
  redisPortExport = redisPort;
  const router = new Router();

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const cache = new Cache();

  // clear redis cache when restarting the server
  cache.cacheClear();
  // Create easy-to-use schema from typeDefs once when server boots up //
  // const obsidianSchema = getObsidianSchema(typeDefs);

  // router.obsidianSchema = obsidianSchema;

  await router.post(path, async (ctx: any) => {
    const { response, request } = ctx;
    if (request.hasBody) {
      try {
        const contextResult = context ? await context(ctx) : undefined;
        const body = await request.body().value;
        // Variable to block the normalization of mutations //
        let toNormalize = true;

        if (useCache) {
          // Send query off to be destructured and found in Redis if possible //
          const obsidianReturn = await cache.read(body.query);
          console.log('retrieved from cache', obsidianReturn);
          // if (obsidianReturn === 'mutation') toNormalize = false;

          // if (obsidianReturn && obsidianReturn !== 'mutation') {
          if (obsidianReturn) {
            response.status = 200;
            response.body = obsidianReturn;
            return;
          }
        }

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
        if (useCache && toNormalize) cache.write(body.query, result, false);

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
