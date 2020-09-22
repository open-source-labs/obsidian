![Obsidian](./assets/logoSilver.jpg)

<div align="center">GraphQL, built for Deno.</div>

<div align="center">

<h1>Obsidian</h1>

from <em>Lascaux</em>

</div>

## Features

- GraphQL query abstraction and caching in SSR React projects, improving the performance of your app
- Normalized caching, optimizing memory management to keep your site lightweight and fast
- Fullstack integration, leveraging client-side and server-side caching to streamline your caching strategy

## Overview

Obsidian is Deno's first native GraphQL caching client and server module. Boasting lightning-fast caching and fetching capabilities alongside headlining normalization and destructuring strategies, obsidian is equipped to support scalable, highly performant applications.

Optimized for use in server-side rendered React apps built with Deno, fullstack integration of obsidian enables many of its most powerful features, including optimized caching exchanges between client and server as well as server-side user session storage, maintaining the benefits of server-side rendering even after client-side caches have expired.

## Installation

<div align="center"><strong>QUICK START</strong></div>
<br>

In the server:

```javascript
import { ObsidianRouter } from 'https://deno.land/x/obsidian@v1.0.0/mod.ts';
```

In the app: 

```javascript
import { ObsidianWrapper } from 'https://deno.land/x/obsidian@v1.0.0/mod.ts';
```

## Creating the Router

```javascript
import { Application, Router } from 'https://deno.land/x/oak@v6.0.1/mod.ts';
import { ObsidianRouter, gql } from 'https://deno.land/x/obsidian@v1.0.0/mod.ts';

const PORT = 8000;

const app = new Application();

const types = (gql as any)`
  // Type definitions
`;

const resolvers = {
  Query: {
    // Resolvers
  }
}

interface ObsRouter extends Router {
  obsidianSchema?: any;
}

const GraphQLRouter = await ObsidianRouter<ObsRouter>({
  Router,
  typeDefs: types,
  resolvers: resolvers,
});

app.use(GraphQLRouter.routes(), GraphQLRouter.allowedMethods());

await app.listen({ port: PORT });
```

## Sending ObsidianSchema

```javascript
interface initialState {
  obsidianSchema?: any;
}

const initialState: initialState = {
  obsidianSchema: GraphQLRouter.obsidianSchema
}

const router = new Router();
router.get('/', handlePage);

function handlePage(ctx: any) {
  try {
    const body = (ReactDomServer as any).renderToString(<App />);
    ctx.response.body = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>SSR React App</title>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
      </head>
      <body>
        <div id="root">${body}</div>
        <script src="/static/client.tsx" defer></script>
      </body>
      </html>`;
  } catch (error) {
    console.error(error);
  }
}

app.use(router.routes(), router.allowedMethods());
```

## Creating the Wrapper

```javascript
import { ObsidianWrapper } from 'https://deno.land/x/obsidian@v1.0.0/mod.ts';

const App = () => {
  return (
    <ObsidianWrapper>
      <WeatherApp />
    </ObsidianWrapper>
  );
};
```

## Making a Query


```javascript
import { useObsidian } from 'https://deno.land/x/obsidian@v1.0.0/mod.ts';

const WeatherApp = () => {
  const { gather } = useObsidian();
  const [weather, setWeather] = useState('Sunny');

  return (
    <h1>{weather}</h1>
    <button
      onClick={() => {
        gather(`query { getWeather { id description } }`)
        .then(resp => setWeather(resp.data.getWeather.description))
      }}
    >Get Weather</button>
  );
};

```

## Documentation

[obsidian.land](http://obsidian.land)

## Demo

To spin up the demo app, run:

	deno run --allow-net --allow-read --unstable demo/server.tsx -c tsconfig.json

## Authors

*Lascaux* Engineers

[Alonso Garza](https://github.com/Alonsog66)  
[Burak Caliskan](https://github.com/CaliskanBurak)  
[Matt Meigs](https://github.com/mmeigs)  
[Travis Frank](https://github.com/TravisFrankMTG/) 
