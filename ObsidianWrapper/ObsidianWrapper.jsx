import React from 'https://dev.jspm.io/react@16.13.1';

import normalizeResult from '../src/normalize.js';
import destructureQueries from '../src/destructureQueries.js';

// Context will be used to create a custom provider for the application
export const cacheContext = React.createContext();
// Declaration of custom Obsidian Wrapper
function ObsidianWrapper(props) {
  const [cache, setCache] = React.useState({});

  // Primary function, provides access to fetching and caching capabilities
  async function gather(query, options = {}) {
    // Desctructuring of optional parameters, default values are defined and may be over written
    const {
      endpoint = '/graphql',
      pollInterval = null,
      destructure = true,
      sessionStore = false,
    } = options;
    if (destructure) {
      const obsidianSchema = window.__INITIAL_STATE__.obsidianSchema;
      /* COMMENT OUT THESE LINES FOR SERVER CACHE */
      const deepCache = sessionStore ? localStorage : Object.assign({}, cache);
      const obsidianReturn = await destructureQueries(
        query,
        obsidianSchema,
        deepCache
      );
      // // Conditional to check if query is stored in global cache
      if (obsidianReturn) {
        console.log('--------------');
        console.log('Found it in the cache!!');
        console.log('--------------');
        // Returning cached response as a promise
        return new Promise(
          (resolve, reject) => resolve(obsidianReturn)
          // This can be uncommeted to store cache in session storage
          // resolve(JSON.parse(sessionStorage.getItem(query)))
        );
      }
    } else {
      const checkStorage = sessionStore
        ? JSON.parse(sessionStorage.getItem(query))
        : cache[query];
      if (checkStorage) {
        console.log('--------------');
        console.log('Found it in the cache!!');
        console.log('--------------');
        return new Promise((resolve, reject) => resolve(checkStorage));
      }
      /* ^^^ COMMENT OUT THESE LINES FOR SERVER CACHE ^^^ */
    }
    // If not found in cache, query is excecuted
    
    // Conditional check, if poll interval has been defined
    if (pollInterval) {
      console.log(
        `Setting ${
          pollInterval / 1000
        } second poll interval for graphql request`
      );
      // Initiation of reocurring fetch request
      setInterval(() => {
        console.log('--------------');
        console.log('Fetching query with poll interval');
        hunt(query, endpoint, destructure, sessionStore);
      }, pollInterval);
    }
    console.log('--------------');
    console.log('Fetching Data');
    // Excection of fetch
    return new Promise((resolve, reject) =>
      resolve(hunt(query, endpoint, destructure, sessionStore))
    );
  }
  // Function to update the global cache with new response data
  function updateCache(query, response, sessionStore) {
    // Declaring new object with new data to store in cache
    const newObj = Object.assign(cache, { [query]: response });

    // React hook to update global cache object
    sessionStore
      ? sessionStorage.setItem(query, JSON.stringify(response))
      : setCache(newObj);
  }
  function clearCache() {
    sessionStorage.clear();
    setCache({});
  }

  // Excecutes graphql fetch request
  async function hunt(query, endpoint, destructure, sessionStore) {
    try {
      const respJSON = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const resp = await respJSON.json();
      // Excecute function to update the cache with new response
      if (destructure) {
        const obsidianSchema = window.__INITIAL_STATE__.obsidianSchema;

        const deepCache = Object.assign({}, cache);

        return new Promise((resolve, reject) => {
          resolve(
            normalizeResult(query, resp, obsidianSchema, deepCache).then(
              (updatedCache) => {
                for (let key in updatedCache) {
                  for (let hash in updatedCache[key]) {
                    updateCache(hash, updatedCache[key][hash], sessionStore);
                  }
                }
                return resp;
              }
            )
          );
        });
      } else {
        updateCache(query, resp, sessionStore);
        return resp;
      }
    } catch (e) {
      console.log(e);
    }
  }

  // Returning Provider React component that allows consuming components to subscribe to context changes
  return (
    <cacheContext.Provider value={{ cache, gather, hunt, clearCache }} {...props} />
  );
}
// Declaration of custom hook to allow access to provider
function useObsidian() {
  // React useContext hook to access the global provider by any of the consumed components
  return React.useContext(cacheContext);
}
// Exporting of Custom wrapper and hook to access wrapper cache
export { ObsidianWrapper, useObsidian };
