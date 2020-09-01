import React from "https://dev.jspm.io/react@16.13.1";
import ReactDom from "https://dev.jspm.io/react-dom@16.13.1";

declare global {
  var __INITIAL_STATE__: any;
}

import App from "./app.tsx";

// Grab the state that the server sent
const state = window.__INITIAL_STATE__;

// Hydrate the app and reconnect React functionality
(ReactDom as any).hydrate(
  <App state={state} />,
  document.getElementById("root")
);
