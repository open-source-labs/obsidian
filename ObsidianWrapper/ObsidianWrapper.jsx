import React from 'https://dev.jspm.io/react';
2
import normalizeResult from '../src/normalize.js';
import destructureQueries from '../src/destructureQueries.js';

// Context will be used to create a custom provider for the application
const cacheContext = React.createContext();

// Class constructor for specifying global specifications
class ObsidianClient {
  constructor(
    // Specify default variables if not all variables all passed in
    {
      url = '/graphql',
      globalSessionStore = false,
      globalDestructure = true,
    } = {
      // Creates a default object in case an object is not passed in
      url: '/graphql',
      globalSessionStore: false,
      globalDestructure: true,
    }
  ) {
    this.url = url;
    this.globalSessionStore = globalSessionStore;
    this.globalDestructure = globalDestructure;
  }
}

// Declaration of custom Obsidian Wrapper
function ObsidianWrapper(props) {
  // Global Default Variables, client input defaults to empty object if an instance is not created
  const {
    url = '/graphql',
    globalSessionStore = false,
    globalDestructure = true,
  } = props.client || {};
  const [cache, setCache] = React.useState({});

  // Primary function, provides access to fetching and caching capabilities
  async function gather(query, options = {}) {
    // Destructuring of optional parameters, default values are defined and may be over written
    const {
      endpoint = url,
      pollInterval = null,
      destructure = globalDestructure,
      sessionStore = globalSessionStore,
    } = options;

    // Logic if destructuring is enabled
    if (destructure) {
      // Specifying the schema sent from the server
      const obsidianSchema = window.__INITIAL_STATE__.obsidianSchema;

      // Creating deep clone of cache to send to destructure
      const deepCache = sessionStore
        ? sessionStorage
        : Object.assign({}, cache);
      const obsidianReturn = await destructureQueries(
        query,
        obsidianSchema,
        deepCache
      );

      // Conditional to check if query is stored in global cache
      if (obsidianReturn) {
        // Returning cached response as a promise
        return new Promise((resolve, reject) => resolve(obsidianReturn));
      }
    } else {
      // If destructuring is not specified, cache or session storage is checked
      const checkStorage = sessionStore
        ? JSON.parse(sessionStorage.getItem(query))
        : cache[query];
      if (checkStorage) {
        return new Promise((resolve, reject) => resolve(checkStorage));
      }
    }

    // If not found in cache or session storage, query will be executed
    // Conditional check, if poll interval has been defined
    if (pollInterval) {
      console.log(
        `Setting ${
          pollInterval / 1000
        } second poll interval for graphql request`
      );
      // Initiation of recurring fetch request
      setInterval(() => {
        hunt(query, endpoint, destructure, sessionStore);
      }, pollInterval);
    }
    // Expectation of fetch
    return new Promise((resolve, reject) =>
      resolve(hunt(query, endpoint, destructure, sessionStore))
    );
  }

  // Function to update the global cache with new response data
  function updateCache(query, response, sessionStore) {
    // Declaring new object with new data to store in cache
    const newObj = Object.assign(cache, { [query]: response });

    // React hook to update global cache object or session storage
    sessionStore
      ? sessionStorage.setItem(query, JSON.stringify(response))
      : setCache(newObj);
  }

  // Function to clear cache and session storage
  function clearCache() {
    sessionStorage.clear();
    setCache({});
  }

  // Function executes mutation and clears cache by default to avoid conflicts
  async function mutate(mutation, options = {}) {
    const { endpoint = '/graphql', clearCache = true } = options;
    try {
      const respJSON = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ query: mutation }),
      });
      const resp = await respJSON.json();
      if (clearCache) clearCache();
      return resp;
    } catch (e) {
      console.log(e);
    }
  }

  // Executes graphql fetch request
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

      // Execute function to update the cache with new response
      if (destructure) {
        const obsidianSchema = window.__INITIAL_STATE__.obsidianSchema;

        const deepCache = Object.assign({}, cache);

        // Updates all of the normalized results in our cache
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
        // If query is not destructured, entire query and response are cached
        updateCache(query, resp, sessionStore);
        return resp;
      }
    } catch (e) {
      console.log(e);
    }
  }

  // Returning Provider React component that allows consuming components to subscribe to context changes
  return (
    <cacheContext.Provider
      value={{ cache, gather, hunt, mutate, clearCache }}
      {...props}
    />
  );
};
// Declaration of custom hook to allow access to provider
function useObsidian() {
  // React useContext hook to access the global provider by any of the consumed components
  return React.useContext(cacheContext);
}

// Exporting of Custom wrapper and hook to access wrapper cache
export { ObsidianWrapper, useObsidian, ObsidianClient };
