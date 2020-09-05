import { graphql } from 'https://deno.land/x/oak_graphql@0.6.1/deps.ts';
import { renderPlaygroundPage } from 'https://deno.land/x/oak_graphql@0.6.1/graphql-playground-html/render-playground-html.ts';
import { makeExecutableSchema } from 'https://deno.land/x/oak_graphql@0.6.1/graphql-tools/schema/makeExecutableSchema.ts';
import getReturnTypes from './getReturnTypes.js';
import normalizeResult from './normalize.js';

interface Constructable<T> {
  new (...args: any): T & OakRouter;
}

interface OakRouter {
  post: any;
  get: any;
}

export interface ApplyGraphQLOptions<T> {
  Router: Constructable<T>;
  path?: string;
  typeDefs: any;
  resolvers: ResolversProps;
  context?: (ctx: any) => any;
  usePlayground?: boolean;
}

export interface ResolversProps {
  Query?: any;
  Mutation?: any;
  [dynamicProperty: string]: any;
}

export async function ObsidianRouter<T>({
  Router,
  path = '/graphql',
  typeDefs,
  resolvers,
  context,
  usePlayground = true,
}: ApplyGraphQLOptions<T>): Promise<T> {
  const router = new Router();

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const returnTypes = getReturnTypes(typeDefs);
  // console.log(returnTypes)


  await router.post(path, async (ctx: any) => {
    const { response, request } = ctx;
    if (request.hasBody) {
      try {
        const contextResult = context ? await context(ctx) : undefined;
        const body = await request.body().value;

        // Check the cache here
        const storedResult = undefined //await checkCache(body.query);
        if (storedResult) {
          console.log('Grabbed something from the cache');

          response.status = 200;
          response.body = storedResult;
          return;
        } else {
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
          normalizeResult(body.query, result, returnTypes);
          // storeCache(body.query, result);
          // console.log('query', body);
          // console.log('result', result)
          return;
        }
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
