import React from 'https://dev.jspm.io/react@16.13.1';
// Context will be used to create a custom provider for the application
export const cacheContext = React.createContext();
// Initial global cache object, empty by default
const CACHE = {};
// Declaration of custom Obsidian Wrapper
function ObsidianWrapper(props) {
  // React state hook used to modify global cache
  const [cache, setCache] = React.useState(CACHE);
  // Primary function, provides access to fetching and caching capabilities
  async function fetcher(query, options = {}) {
    // Desctructuring of optional parameters, default values are defined and may be over written
    const { endpoint = '/graphql', pollInterval = null } = options;
    // Conditional to check if query is stored in global cache
    if (cache[query]) {
      console.log('--------------');
      console.log('Found it in the cache!!');
      console.log('--------------');
      // Returning cached response as a promise
      return new Promise(
        (resolve, reject) => resolve(cache[query])
        // This can be uncommeted to store cache in session storage
        // resolve(JSON.parse(sessionStorage.getItem(query)))
      );
    }
    // If not found in cache, query is excecuted
    else {
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
          fetchData(query, endpoint);
        }, pollInterval);
      }
      console.log('--------------');
      console.log('Fetching Data');
      // Excection of fetch
      return await fetchData(query, endpoint);
    }
  }
  // Function to update the global cache with new response data
  function updateCache(query, response) {
    console.log('BEFORE: ', cache);
    // Declaring new object with new data to store in cache
    const newObj = Object.assign(cache, { [query]: response });
    // React hook to update global cache object
    setCache(newObj);
    console.log('AFTER: ', newObj);
    console.log('CACHEEE: ', cache);
    // Can be uncommeted to store data in session storage
    // sessionStorage.setItem(query, JSON.stringify(response));
  }
  // Excecutes graphql fetch request
  async function fetchData(query, endpoint) {
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
      updateCache(query, resp.data);
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  }
  // Returning Provider React component that allows consuming components to subscribe to context changes
  return <cacheContext.Provider value={{ cache, fetcher }} {...props} />;
}
// Declaration of custom hook to allow access to provider
function useObsidian() {
  // React useContext hook to access the global provider by any of the consumed components
  return React.useContext(cacheContext);
}
// Exporting of Custom wrapper and hook to access wrapper cache
export { ObsidianWrapper, useObsidian };
