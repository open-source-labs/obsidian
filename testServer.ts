import { Application, Router } from 'https://deno.land/x/oak@v6.0.1/mod.ts';
import * as Colors from 'https://deno.land/std/fmt/colors.ts';

// OBSIDIAN
import { ObsidianRouter, gql } from './mod.ts';

import client from './sqlclient.ts';

const PORT = 3000;

// Create a new server
const app = new Application();

// Track response time in headers of responses
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get('X-Response-Time');
  if (ctx.request.url.href === 'http://localhost:8000/graphql') {
    console.log(Colors.underline(Colors.cyan(`QUERY TOOK ` + Colors.bold(`${rt}`))));
  }
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set('X-Response-Time', `${ms}ms`);
});

const router = new Router();
router.get('/', handlePage);

app.use(router.routes());
app.use(router.allowedMethods());

function handlePage(ctx: any) {
  try {
    ctx.response.body = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>ObsidianTest</title>
        </head>
        <body >
          <div id="root"></div>
        </body>
      </html>`;
  } catch (error) {
    console.error(error);
  }
}

// GraphQL types
const types = (gql as any)`
type Book {
  id: ID
  title: String
  author: String
  description: String
  publicationDate: String
  publisher: String
  coverPrice: Float
  whereToBuy: [Store]!
}

type Store {
  id: ID
  name: String
  address: String
  inventory: [Book]!
}

type ResolveType {
  done: Boolean
}

type Query {
  getBook(id: ID): Book!
  getEightBooks(id: ID): [Book]
}

type Mutation {
  updateAuthor(id: ID!, author: String!): Book
}
`;

// GraphQL Resolvers
const resolvers = {
  Query: {
    getBook: async (parent: any, { id }: any, context: any, info: any) => {
      const data = await client.query(
        `
          SELECT books.*, store.id AS storeID, store.name, store.address
          FROM books
          LEFT JOIN store_inventory ON books.id = store_inventory.book_id
          LEFT JOIN store ON store.id = store_inventory.store_id
          WHERE books.id = $1;
        `,
        id
      );
      const whereToBuy:any = [];

      data.rows.forEach((book:any) => {
        whereToBuy.push({
          id: book[7],
          name: book[8],
          address: book[9]
        })
      })

      const book = {
        id: data.rows[0][0],
        title: data.rows[0][1],
        author: data.rows[0][2],
        description: data.rows[0][3],
        publicationDate: data.rows[0][4],
        publisher: data.rows[0][5],
        coverPrice: data.rows[0][6],
        whereToBuy
      };

      return book;
    },
    getEightBooks: async (
      parent: any,
      { id }: any,
      context: any,
      info: any
    ) => {
      const data = await client.query(
        `
          SELECT books.title, books.author, books.id
          FROM books
          WHERE id
          BETWEEN $1 AND $2
        `,
        id,
        Number(id) + 7
      );
      const books = data.rows.map((cv) => {
        return {
          title: cv[0],
          author: cv[1],
          id: cv[2],
        };
      });
      return books;
    },
  },
  Mutation: {
    updateAuthor: async (parent: any, { id, author }: any, context: any, info: any) => {
      try {
      const resp = await client.query(`
          UPDATE books
          SET author = $1
          WHERE id = $2
        `,
        author,
        id
      );
      return resp;
      } catch (err) {
        console.log('mutation error', err)
        return err;
      }
    }
  }
};

interface ObsRouter extends Router {
  obsidianSchema?: any;
}

// Setup GraphQL Router
const GraphQLRouter = await ObsidianRouter<ObsRouter>({
  Router,
  typeDefs: types,
  resolvers: resolvers,
  redisPort: 6379,
});
app.use(GraphQLRouter.routes(), GraphQLRouter.allowedMethods());

app.addEventListener('listen', () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

if (import.meta.main) {
  await app.listen({ port: PORT });
}

export { app };
