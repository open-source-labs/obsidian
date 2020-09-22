import { graphql } from 'https://deno.land/x/oak_graphql@0.6.1/deps.ts';
import { renderPlaygroundPage } from 'https://deno.land/x/oak_graphql@0.6.1/graphql-playground-html/render-playground-html.ts';
import { makeExecutableSchema } from 'https://deno.land/x/oak_graphql@0.6.1/graphql-tools/schema/makeExecutableSchema.ts';
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

  // create easy-to-use schema from typeDefs once when server boots up
  const obsidianSchema = getObsidianSchema(typeDefs);
  console.log('obsidianSchema', obsidianSchema);

  router.obsidianSchema = obsidianSchema;


  await router.post(path, async (ctx: any) => {
    const { response, request } = ctx;
    if (request.hasBody) {
      try {
        const contextResult = context ? await context(ctx) : undefined;
        const body = await request.body().value;

        console.log('Incoming Query:');
        console.log(body.query);
        let toNormalize = true;

        if (useCache) {
          // Send query off to be destructured and found in Redis if possible //
          const obsidianReturn = await destructureQueries(body.query, obsidianSchema);
          console.log('Obsidian Reconstructed Result:', obsidianReturn)
          
          if (obsidianReturn === 'mutation') toNormalize = false;

          if (obsidianReturn && obsidianReturn !== 'mutation') {
            response.status = 200;
            response.body = obsidianReturn;

            console.log('Reconstructed results object using cache, returning without querying db.')

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

        response.status = 200;
        response.body = result;

        // Store the new results
        console.log('GraphQL result object');
        console.log(result);
        console.log('Sending results off to normalize...')

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
      // perform more expensive content-type check only if necessary
      // XXX We could potentially move this logic into the GuiOptions lambda,
      // but I don't think it needs any overriding
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
