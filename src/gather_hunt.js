/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { readCache } from './readCache.js';

async function gather(query, options = {}) {
  //create deep clone of cache to send to destructure
  const deepCache = Object.assign({}, cache);

  //create graphql response object from query string
  const resObj = await readCache(query, deepCache);

  //check if query is stored in cache
  if (resObj) {
    //returning cached response as a promise
    return new Promise((resolve, reject) => resolve(resObj));
  }
  //execute graphql fetch request
  else
    return new Promise((resolve, reject) =>
      resolve(hunt(query, endpoint, destructure, sessionStore))
    );
}

async function hunt(query, endpoint, destructure, sessionStore) {
  try {
    //send fetch request with query
    const resJSON = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    const resObj = await respJSON.json();

    //create deep clone of cache
    const deepCache = Object.assign({}, cache);

    //update normalized result in cache
    return new Promise((resolve, reject) => {
      resolve(writeCache(objectQuery, resObj, deepCache));
      return resObj;
    });
  } catch (e) {
    console.log(e);
  }
}
