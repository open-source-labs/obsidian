import React from 'https://dev.jspm.io/react';
import ReactDom from 'https://dev.jspm.io/react-dom';
import App from './App.tsx';

(ReactDom as any).hydrate(<App />, document.getElementById('root'));
