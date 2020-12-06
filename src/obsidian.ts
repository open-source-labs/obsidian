import { graphql } from 'https://cdn.pika.dev/graphql@15.0.0';
import { renderPlaygroundPage } from 'https://deno.land/x/oak_graphql/graphql-playground-html/render-playground-html.ts';
import { makeExecutableSchema } from 'https://deno.land/x/oak_graphql/graphql-tools/schema/makeExecutableSchema.ts';
import getObsidianSchema from './getObsidianSchema.js';
import normalizeResult from './normalize.js';
import destructureQueries from './destructureQueries.js';

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
  usePlayground = true,
  useCache = true,
  redisPort = 6379,
}: ObsidianRouterOptions<T>): Promise<T> {
  redisPortExport = redisPort;
  const router = new Router();

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Create easy-to-use schema from typeDefs once when server boots up //
  const obsidianSchema = getObsidianSchema(typeDefs);

  router.obsidianSchema = obsidianSchema;


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
          const obsidianReturn = await destructureQueries(body.query, obsidianSchema);

          if (obsidianReturn === 'mutation') toNormalize = false;

          if (obsidianReturn && obsidianReturn !== 'mutation') {
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
        if (useCache && toNormalize) normalizeResult(body.query, result, obsidianSchema);

        return;
      } catch (error) {
        response.status = 200;
        console.log('error message', error.message);
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
