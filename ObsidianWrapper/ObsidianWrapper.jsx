import React from 'https://dev.jspm.io/react@16.13.1';

export const TodoContext = React.createContext();

const CACHE = {};

function ObsidianWrapper(props) {
  const [cache, setCache] = React.useState(CACHE);

  function updateCache(query, response) {
    // setCache({ ...cache, [query]: response });
    sessionStorage.setItem(query, JSON.stringify(response));
  }
  async function fetcher(query, endpoint = '/graphql') {
    if (sessionStorage.getItem(query)) {
      console.log('checking cache');
      return new Promise((resolve, reject) =>
        resolve(JSON.parse(sessionStorage.getItem(query)))
      );
    } else {
      console.log('fetching data');
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
  }
  React.useEffect(() => {
    console.log('CACHE:', cache);
  }, [cache]);

  const todoData = { cache, fetcher };

  return <TodoContext.Provider value={todoData} {...props} />;
}

function useObsidian() {
  return React.useContext(TodoContext);
}

export { ObsidianWrapper, useObsidian };
