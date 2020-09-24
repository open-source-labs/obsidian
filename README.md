![Obsidian](./assets/logoSilver.jpg)

<div align="center">GraphQL, built for Deno.</div>

<div align="center">

<h1 align="center">
	<a>Obsidian</a>
	<a href="https://twitter.com/intent/tweet?text=Meet%20Obsidian!%20Deno's%20first%20native%20GraphQL%20caching%20client%20and%20server%20module&url=http://obsidian.land/&via=obsidian_land&hashtags=deno,denoland,nodejs,graphql,javascript" rel="nofollow"><img src="https://camo.githubusercontent.com/83d4084f7b71558e33b08844da5c773a8657e271/68747470733a2f2f696d672e736869656c64732e696f2f747769747465722f75726c2f687474702f736869656c64732e696f2e7376673f7374796c653d736f6369616c" alt="Tweet" data-canonical-src="https://img.shields.io/twitter/url/http/shields.io.svg?style=social" style="max-width:100%;"></a>
</h1>

<p align="center">from <em align="center">Lascaux</em></p>

</div>

<p align="center">
  <img alt="GitHub" src="https://img.shields.io/github/license/oslabs-beta/obsidian">
  <img alt="GitHub issues" src="https://img.shields.io/github/issues-raw/oslabs-beta/obsidian?color=yellow">
  <img alt="GitHub All Releases" src="https://img.shields.io/github/downloads/oslabs-beta/obsidian/total?color=green">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/oslabs-beta/obsidian?color=orange">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/oslabs-beta/obsidian?style=social">  
</p>


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
