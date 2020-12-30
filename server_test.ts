import { Application, Router } from 'https://deno.land/x/oak@v6.0.1/mod.ts';
import { ObsidianRouter, gql } from './mod.ts';

const PORT = 3000;

const app = new Application();

const types = (gql as any)`
  type Movie {
    id: ID
    title: String
    releaseYear: Int
  }

  type Query {
    getMovie: Movie 
  }
`;

const resolvers = {
  Query: {
    getMovie: () => {
      return {
        id: '1',
        title: 'Up',
        releaseYear: 2009,
      };
    },
  },
};

interface ObsRouter extends Router {
  obsidianSchema?: any;
}

const GraphQLRouter = await ObsidianRouter<ObsRouter>({
  Router,
  typeDefs: types,
  resolvers: resolvers,
  redisPort: 6379,
});

app.use(GraphQLRouter.routes(), GraphQLRouter.allowedMethods());


app.addEventListener('listen', () => {
  console.log(`listening on localhost:${3000}`);
});

await app.listen({ port: PORT });
