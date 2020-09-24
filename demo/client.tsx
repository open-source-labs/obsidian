import React from 'https://dev.jspm.io/react@16.13.1';
import ReactDom from 'https://dev.jspm.io/react-dom@16.13.1';
import {
  ObsidianWrapper,
  ObsidianClient,
} from '../ObsidianWrapper/ObsidianWrapper.jsx';

declare global {
  var __INITIAL_STATE__: any;
}

import App from './app.tsx';

const client = new ObsidianClient({});

// Grab the state that the server sent
const state = window.__INITIAL_STATE__;

// Hydrate the app and reconnect React functionality
(ReactDom as any).hydrate(
  <ObsidianWrapper client={client}>
    <App state={state} />
  </ObsidianWrapper>,
  document.getElementById('root')
);
