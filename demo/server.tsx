import {
  Application,
  Router,
  RouterContext,
} from 'https://deno.land/x/oak@v6.0.1/mod.ts';
import {
  applyGraphQL,
  gql,
  GQLError,
} from 'https://deno.land/x/oak_graphql/mod.ts';

// OBSIDIAN ROUTER
import { ObsidianRouter } from '../src/obsidian.ts';
import { ObsidianWrapper } from '../ObsidianWrapper/ObsidianWrapper.jsx';

import client from './sqlclient.ts';

import React from 'https://dev.jspm.io/react@16.13.1';
import ReactDomServer from 'https://dev.jspm.io/react-dom@16.13.1/server';
import App from './app.tsx';

// Create a new server
const app = new Application();

// Track response time in headers of responses
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get('X-Response-Time');
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set('X-Response-Time', `${ms}ms`);
});

// Initial state
const initialState = {};

// Router for base path
const router = new Router();
router.get('/', handlePage);

// Bundle the client-side code
const [_, clientJS] = await Deno.bundle('./client.tsx');

// Router for bundle
const serverrouter = new Router();
serverrouter.get('/static/client.js', (context) => {
  context.response.headers.set('Content-Type', 'text/html');
  context.response.body = clientJS;
});

// Implement the routes on the server
app.use(router.routes());
app.use(serverrouter.routes());
app.use(router.allowedMethods());

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
`;

// GraphQL Resolvers (For now just the basic getBooks query)
const resolvers = {
  Query: {
    getBook: async (parent: any, { id }: any, context: any, info: any) => {
      console.log('id', id);
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
      console.log('Returned rows:');
      console.log(data.rows);
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

      console.log('book', book)
      return book;
    },
    getEightBooks: async (
      parent: any,
      { id }: any,
      context: any,
      info: any
    ) => {
      console.log('id', id, context);
      console.log(id + 7);
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
      console.log('Returned rows:');
      console.log(data.rows);
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
};

// Setup GraphQL Router
const GraphQLService = await ObsidianRouter<Router>({
  Router,
  typeDefs: types,
  resolvers: resolvers,
});
app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

// Spin up the server
console.log('server is running on http://localhost:8000/');
await app.listen({ port: 8000 });

// SSR of React App (invoked at line 12)

function handlePage(ctx: any) { // <ObsidianWrapper> needed
  try {
    const body = (ReactDomServer as any).renderToString(
      <ObsidianWrapper>
        <App state={initialState} />
      </ObsidianWrapper>
    );
    ctx.response.body = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet">
    <title>Document</title>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
    </script>
  </head>
  <body >
    <div id="root">${body}</div>
    <script  src="http://localhost:8000/static/client.js" defer></script>
  </body>
  </html>`;
  } catch (error) {
    console.error(error);
  }
}
