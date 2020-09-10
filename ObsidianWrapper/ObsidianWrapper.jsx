import React from 'https://dev.jspm.io/react@16.13.1';

export const cacheContext = React.createContext();

const CACHE = {};

function ObsidianWrapper(props) {
  const [cache, setCache] = React.useState(CACHE);

  function updateCache(query, response) {
    console.log('BEFORE: ', cache);
    const newObj = Object.assign(cache, { [query]: response });
    setCache(newObj);
    console.log('AFTER: ', newObj);
    console.log('CACHEEE: ', cache);
    // sessionStorage.setItem(query, JSON.stringify(response));
  }

  async function fetcher(query, options = {}) {
    const { endpoint = '/graphql', pollInterval = null } = options;
    if (cache[query]) {
      console.log('--------------');
      console.log('Found it in the cache!!');
      console.log('--------------');
      return new Promise(
        (resolve, reject) => resolve(cache[query])
        // resolve(JSON.parse(sessionStorage.getItem(query)))
      );
    } else {
      if (pollInterval !== null) {
        console.log(
          `Setting ${
            pollInterval / 1000
          } second poll interval for graphql request`
        );

        setInterval(() => {
          console.log('--------------');
          console.log('Fetching query with poll interval');
          fetchData(query, endpoint);
        }, pollInterval);
      }
      console.log('--------------');
      console.log('Fetching Data');
      return await fetchData(query, endpoint);
    }
  }

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
      updateCache(query, resp.data);

      return resp.data;
    } catch (e) {
      console.log(e);
    }
  }

  // React.useEffect(() => {
  //   console.log('CACHE:', cache);
  //   console.log('--------------');
  // }, [cache]);

  return <cacheContext.Provider value={{ cache, fetcher }} {...props} />;
}

function useObsidian() {
  return React.useContext(cacheContext);
}

export { ObsidianWrapper, useObsidian };
