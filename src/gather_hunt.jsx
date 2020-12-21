import React from 'https://dev.jspm.io/react';
import { Cache } from './CacheClass.js';
import { insertTypenames } from './insertTypenames.js';

const cacheContext = React.createContext();

function ObsidianWrapper(props) {
  // const [cache, setCache] = React.useState({ ROOT_QUERY: {} });
  const cache = new Cache();
  async function gather(query, options = {}) {
    //create deep clone of cache to send to destructure
    const destructure = true;
    const sessionStore = false;
    // const deepCache = Object.assign({}, cache);
    const { endpoint } = options;
    //create graphql response object from query string
    const resObj = cache.read(query);

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
    query = insertTypenames(query);
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
      const resObj = await resJSON.json();
      const deepResObj = Object.assign({}, resObj);
      //update normalized result in cache
      cache.write(query, deepResObj);
      // setCache(deepCache);
      return resObj;
      // return new Promise((resolve, reject) => {
      //   resolve(
      //     writeCache(query, deepResObj, deepCache)
      //   );
      //   setCache(deepCache);
      //   return resObj;
      // });
    } catch (e) {
      console.log(e);
    }
  }
  // Function to clear cache and session storage
  function clearCache() {
    cache.cacheClear();
  }
  // Returning Provider React component that allows consuming components to subscribe to context changes
  return (
    <cacheContext.Provider
      value={{ cache, gather, hunt, clearCache }}
      {...props}
    />
  );
}

// Declaration of custom hook to allow access to provider
function useObsidian() {
  // React useContext hook to access the global provider by any of the consumed components
  return React.useContext(cacheContext);
}

// Exporting of Custom wrapper and hook to access wrapper cache
export { ObsidianWrapper, useObsidian };
