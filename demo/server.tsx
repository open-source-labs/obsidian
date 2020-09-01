/*
import {
  Application,
  Router,
  send,
} from 'https://deno.land/x/oak@v6.0.1/mod.ts';
import { applyGraphQL, gql } from 'https://deno.land/x/oak_graphql/mod.ts';

const app = new Application();
const port = 8080;

const router = new Router();

// router.get('/', (ctx) => {
//   // const htmlDoc = Deno.openSync('../client/assets/index.html', { read: true });
//   ctx.response.body = Deno.readFileSync(
//     `${Deno.cwd()}/../client/assets/index.html`
//   );
//   // Deno.close(htmlDoc.rid);
// });

app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/client/assets`,
    index: 'index.html',
  });
});

// const GraphQLService = await applyGraphQL({
//   Router,
//   typeDefs: (gql as any)`
//   type Book {
//     title: String!
//     author: String!
//     description: String
//     coverPrice: Int!
//     publicationDate: String
//     publisher: String
//     id: Int!
//   }

//   type Query {
//     books: [Book]
//     book (id: Int): Book
//   }
//   `, // need
//   resolvers: {
//     // Query: {
//     //   book
//     // }
//   }, // need
// });

// app.use(GraphQLService.routes(), GraphQLService.allowedMethods());
app.use(router.routes());
app.use(router.allowedMethods());


console.log('server is running on http://localhost:8080/');
await app.listen({ port: port });

*/

import { opine, serveStatic } from 'https://deno.land/x/opine@0.21.3/mod.ts';
import { dirname, join } from 'https://deno.land/std/path/mod.ts';
const app = opine();
const clientDir = join(dirname(import.meta.url), './client');
console.log(clientDir);
app.use(serveStatic(clientDir));
app.get('/', (req, res) => res.sendFile(join(clientDir, 'index.html')));

// app.use((req, res) => {
//   res.send('Hello World');
// });

app.listen(8080);
console.log('Opine started on port 8080');
