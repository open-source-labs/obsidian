![Obsidian](./assets/bannerfull_gradient.png)

<div align="center">GraphQL, built for Deno.</div>

<div align="center">

<h1 align="center">
	<a>Obsidian</a>
	<a href="https://twitter.com/intent/tweet?text=Meet%20Obsidian!%20Deno's%20first%20native%20GraphQL%20caching%20client%20and%20server%20module&url=http://obsidian.land/&via=obsidian_land&hashtags=deno,denoland,nodejs,graphql,javascript" rel="nofollow"><img src="https://camo.githubusercontent.com/83d4084f7b71558e33b08844da5c773a8657e271/68747470733a2f2f696d672e736869656c64732e696f2f747769747465722f75726c2f687474702f736869656c64732e696f2e7376673f7374796c653d736f6369616c" alt="Tweet" data-canonical-src="https://img.shields.io/twitter/url/http/shields.io.svg?style=social" style="max-width:100%;"></a>
</h1>

<p align="center">from <em align="center">Lascaux</em></p>

</div>

<p align="center">
  <img alt="GitHub" src="https://img.shields.io/github/license/open-source-labs/obsidian">
  <img alt="GitHub issues" src="https://img.shields.io/github/issues-raw/open-source-labs/obsidian?color=yellow">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/open-source-labs/obsidian?color=orange">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/open-source-labs/obsidian?style=social">  
</p>

## Features

- (New!) Support for W-TinyLFU client-side cache that brings great hit-ratio performance with minimal memory overhead
- (New!) Option to provide Obsidian with the search types your application uses, allowing data cached from complete dataset pulls to be accessible later on in searches for individual items
- (New!) Refactored server-side caching with Redis
- (New!) Rebuilt developer tool for Obsidian 8.0 for testing and analytics related to the new client caching options
- (New!) Option for persistant queries, allowing only a smaller hash to be sent to the server on client-side cache misses, minimizing the cost of queries. Note that while this will increase the performance for frequent, repeat queries, you may see a performance drop for new queries that haven't yet been persisted
- Flexible cache responds with only data requested from selected fields
- GraphQL query abstraction and caching improving the performance of your app
- SSR React wrapper, allowing you to cache in browser
- Configurable caching options, giving you complete control over your cache
- Fullstack integration, leveraging client-side and server-side caching to streamline your caching strategy
- Support for the full GraphQL convention
- Support for client-side and server-side cache invalidation
- Optional GraphQL DoS attack mitigation security module

## Overview

Obsidian is Deno's first native GraphQL caching client and server module. Boasting lightning-fast caching and fetching capabilities alongside headlining normalization and rebuilding strategies, Obsidian is equipped to support scalable, highly performant applications.

With additional support for use in server-side rendered React apps built with Deno, full stack integration of Obsidian enables a fast and flexible caching solution.

## Installation

<div align="center"><strong>QUICK START</strong></div>
<br>

## Creating the Router

```javascript
import { Application, Router } from 'https://deno.land/x/oak@v6.0.1/mod.ts';
import { ObsidianRouter, gql } from 'https://deno.land/x/obsidian/mod.ts';
import { resolvers } from './ import from your resolvers file';
import { types } from './ import your schema/types from schema/types file';

interface ObsRouter extends Router {
  obsidianSchema?: any;
}

const GraphQLRouter =
  (await ObsidianRouter) <
  ObsRouter >
  {
    Router,
    typeDefs: types, // graphQL typeDefs
    resolvers: resolvers, // graphQL resolvers
  };

// attach the graphql routers routes to our app
app.use(GraphQLRouter.routes(), GraphQLRouter.allowedMethods());
```
## Selecting options for the Router
```javascript
const GraphQLRouter =
  (await ObsidianRouter) <
  ObsRouter >
  {
    Router, // Router that is initialized by server.
    path = '/graphql', // endpoint for graphQL queries, default to '/graphql'
    typeDefs: types, // graphQL typeDefs
    resolvers: resolvers, // graphQL resolvers
    usePlayground: true, // Boolean to allow for graphQL playground, default to false
    useCache: true, // Boolean to toggle all cache functionality, default to true
    redisPort: 6379, // Desired redis port, default to 6379
    policy: 'allkeys-lru', // Option select your Redis policy, default to allkeys-lru
    maxmemory = '2000mb', // Option to select Redis capacity, default to 2000mb
    searchTerms: [] //Optional array to allow board queries to store according to search fields so individual searches are found in cache
    persistQueries: true, //Boolean to toggle the use of persistant queries, default to false
    hashTableSize = 16, // Size of hash table for persistent queries, default to 16
    maxQueryDepth = 0, // Maximum depth of query, default to 0
    customIdentifier: ['__typename', '_id'], // keys to be used to idedntify and normalize object
    mutationTableMap = {}, //Object where keys are add mutation types and value is an array of affected tables (e.g. {addPlants: ['plants'], addMovie: ['movies']})
  };
```

## Creating the Wrapper

```javascript
import { ObsidianWrapper } from 'https://deno.land/x/obsidian/clientMod.ts';

const App = () => {
  return (
    <ObsidianWrapper>
      <MovieApp />
    </ObsidianWrapper>
  );
};
```

## Selecting useCache, LFU/LRU/WTinyLFU, capacity, persistQueries, and searchTerms (if any); default (if not provided): true, LFU, 2000, false

```javascript
<ObsidianWrapper useCache={true} algo='LRU' capacity='5000' persistQueries={true} searchTerms={['title', 'director', 'genre']}>
  <MovieApp />
</ObsidianWrapper>
```

## Making a Query

```javascript
import { useObsidian } from 'https://deno.land/x/obsidian/clientMod.ts';

const MovieApp = () => {
  const { query } = useObsidian();
  const [movies, setMovies] = (React as any).useState('');

  const queryStr = `query {
      movies {
        id
        title
        releaseYear
        genre
      }
    }
  `;

  return (
    <h1>{movies}</h1>
    <button
      onClick={() => {
        query(queryStr)
        .then(resp => setMovies(resp.data))
      }}
    >Get Movies</button>
  );
};
```

## Making a Mutation

```javascript
import { useObsidian } from 'https://deno.land/x/obsidian/clientMod.ts';

const MovieApp = () => {
  const { mutate } = useObsidian();
  const [movies, setMovies] = (React as any).useState('');

  const queryStr = `mutation {
    addMovie(input: {title: "Cruel Intentions", releaseYear: 1999, genre: "DRAMA" }) {
      id
      title
      releaseYear
      genre
    }
  }
  `;

  return (
    <h1>{movies}</h1>
    <button
      onClick={() => {
        mutate(queryStr)
        .then(resp => setMovies(resp.data))
      }}
    >Get Movies</button>
  );
}
```

## Documentation

[getobsidian.io](http://getobsidian.io/)

## Developer Tool

Information and instructions on how to use our developer tool can be found here <br/>
works with Obsidian 8.0 <br/>
[open-source-labs/obsidian-developer-tool](https://github.com/open-source-labs/obsidian-developer-tool)

## Obsidian 8.0 Demo

Github for a demo with some example code to play with: <br/>
[oslabs-beta/obsidian-demo-8.0](https://github.com/oslabs-beta/obsidian-8.0-demo)

## Dockerized Demo

Working demo to install locally in docker:  
[oslabs-beta/obsidian-demo-docker](https://github.com/oslabs-beta/obsidian-demo-docker)

## Features In Progress

- Server-side caching improvements
- More comprehensive mutation support
- searchTerms option optimization
- Ability to store/read only the whole query 
- Hill Climber optimization for W-TinyLFU cache size allocation
- Developer Tool View Cache component, and Playground component

## Authors
[David Kim](https://github.com/davidtoyoukim)   
[David Norman](https://github.com/DavidMNorman)   
[Eileen Cho](https://github.com/exlxxn)   
[Joan Manto](https://github.com/JoanManto)    
[Alex Lopez](https://github.com/AlexLopez7)   
[Kevin Huang](https://github.com/kevin-06-huang)    
[Matthew Weisker](https://github.com/mweisker)    
[Ryan Ranjbaran](https://github.com/ranjrover)    
[Derek Okuno](https://github.com/okunod)  
[Liam Johnson](https://github.com/liamdimitri)  
[Josh Reed](https://github.com/joshreed104)  
[Jonathan Fangon](https://github.com/jonathanfangon)  
[Liam Jeon](https://github.com/laj52)  
[Yurii Shchyrba](https://github.com/YuriiShchyrba)  
[Linda Zhao](https://github.com/lzhao15)  
[Ali Fay](https://github.com/ali-fay)  
[Anthony Guan](https://github.com/guananthony)  
[Yasir Choudhury](https://github.com/Yasir-Choudhury)  
[Yogi Paturu](https://github.com/YogiPaturu)  
[Michael Chin](https://github.com/mikechin37)  
[Dana Flury](https://github.com/dmflury)  
[Sardor Akhmedov](https://github.com/sarkamedo)  
[Christopher Berry](https://github.com/cjamesb)  
[Olivia Yeghiazarian](https://github.com/Olivia-code)  
[Michael Melville](https://github.com/meekle)  
[John Wong](https://github.com/johnwongfc)  
[Kyung Lee](https://github.com/kyunglee1)  
[Justin McKay](https://github.com/justinwmckay)  
[Patrick Sullivan](https://github.com/pjmsullivan)  
[Cameron Simmons](https://github.com/cssim22)  
[Raymond Ahn](https://github.com/raymondcodes)  
[Alonso Garza](https://github.com/Alonsog66)  
[Burak Caliskan](https://github.com/CaliskanBurak)  
[Matt Meigs](https://github.com/mmeigs)  
[Travis Frank](https://github.com/TravisFrankMTG/)  
[Lourent Flores](https://github.com/lourentflores)  
[Esma Sahraoui](https://github.com/EsmaShr)  
[Derek Miller](https://github.com/dsymiller)  
[Eric Marcatoma](https://github.com/ericmarc159)  
[Spencer Stockton](https://github.com/tonstock)
