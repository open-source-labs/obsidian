![Obsidian](./assets/logoSilver.jpg)

<div align="center">GraphQL, built for Deno.</div>

<div align="center">

<h1>Obsidian</h1>

from <em>Lascaux</em>

</div>

## Features

- GraphQL query abstraction and caching in SSR React projects, improving the performance of your app
- Normalized caching, optimizing memory management to keep your site lightweight and fast
- Intuitive component subscriptions, enabling the power of reactive caching with minimal boilerplate
- Fullstack integration, leveraging client-side and server-side caching to streamline your caching strategy

## Installation

<div align="center"><strong>PLACEHOLDER INSTALLATION INSTRUCTIONS</strong></div>
<br>

To use Obsidian in your Deno React app, import obsidian and wrap your React app like so:

```javascript
import { ObsidianWrapper } from 'https://deno.land/x/obsidian/mod.ts'
import { React } from 'https://dev.jspm.io/react@16.13.1';
import { App } from 'App.tsx';

class Wrapper extends React.Component {
  render() {
    return (
      <ObsidianWrapper>
        <App />
      </ObsidianWrapper>
    )
  }
}
```
	
## Demo

To spin up the demo app, run:

	deno run --allow-net --allow-read --unstable demo/server.tsx -c tsconfig.json

## Authors

*Lascaux* Engineers

[Alonso Garza](https://github.com/Alonsog66)  
[Burak Caliskan](https://github.com/CaliskanBurak)  
[Matt Meigs](https://github.com/mmeigs)  
[Travis Frank](https://github.com/TravisFrankMTG/) 
