import { Application, Router } from "https://deno.land/x/oak@v6.0.1/mod.ts";
import React from "https://dev.jspm.io/react@16.13.1";
import { default as ReactDomServer } from "https://dev.jspm.io/react-dom@16.13.1/server";
import { App } from '../client/App.jsx';
import { applyGraphQL, gql } from "https://deno.land/x/oak_graphql/mod.ts";

const app = new Application();
const port = 8080;

const router = new Router();

// router.get('/', await (ctx) => {
  // Deno.readTextFile
// })

router.get("/", handlePage);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: any;
    }
  }
}

function handlePage(ctx: any) {
  try {
    const body = (ReactDomServer as any).renderToString(<App />);
    ctx.response.body = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <div id="root">${body}</div>
      </body>
      </html>`;
  } catch (error) {
    console.error(error);
  }
}

const GraphQLService = await applyGraphQL({
  Router,
  typeDefs: (gql as any)`
  type Book {
    title: String!
    author: String!
    description: String
    coverPrice: Int!
    publicationDate: String
    publisher: String
    id: Int!
  }

  type Query {
    books: [Book]
    book (id: Int): Book
  }
  `, // need
  resolvers: {
    // Query: {
    //   book
    // }
  } // need
})


app.use(GraphQLService.routes(), GraphQLService.allowedMethods());
app.use(router.routes());
app.use(router.allowedMethods());

console.log("server is running on http://localhost:8080/");
await app.listen({ port: port });
