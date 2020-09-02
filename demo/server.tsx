import { Application, Router } from 'https://deno.land/x/oak@v6.0.1/mod.ts';

import React from 'https://dev.jspm.io/react@16.13.1';
import ReactDomServer from 'https://dev.jspm.io/react-dom@16.13.1/server';
import App from './app.tsx';

// Create a new server
const app = new Application();

// Initial state
const initialState = {};

// Router for base path
const router = new Router();
router.get('/', handlePage);

/*

let todos: Map<number, any> = new Map();

function init() {
  todos.set(todos.size + 1, { id: Date.now(), task: "build an ssr deno app" });
  todos.set(todos.size + 1, {
    id: Date.now(),
    task: "write blogs on deno ssr",
  });
}
init();
router
  .get("/todos", (context) => {
    context.response.body = Array.from(todos.values());
  })
  .get("/todos/:id", (context) => {
    if (
      context.params &&
      context.params.id &&
      todos.has(Number(context.params.id))
    ) {
      context.response.body = todos.get(Number(context.params.id));
    } else {
      context.response.status = 404;
    }
  })
  .post("/todos", async (context) => {
    const body = context.request.body();
    if (body.type === "json") {
      const todo = await body.value;
      todos.set(Date.now(), todo);
    }
    context.response.body = { status: "OK" };
  });

  */

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

// Spin up the server
console.log('server is running on http://localhost:8000/');
await app.listen({ port: 8000 });

// SSR of React App (invoked at line 12)

function handlePage(ctx: any) {
  try {
    const body = ReactDomServer.renderToString(
      <App state={initialState} /> // Pass state as props here
    );
    ctx.response.body = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
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
