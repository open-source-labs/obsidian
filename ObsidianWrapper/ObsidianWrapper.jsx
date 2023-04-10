import * as React from "https://esm.sh/react@18";
import LFUCache from '../src/Browser/lfuBrowserCache.js';
import LRUCache from '../src/Browser/lruBrowserCache.js';
import WTinyLFUCache from "../src/Browser/wTinyLFUBrowserCache.js";
import { insertTypenames } from '../src/Browser/insertTypenames.js';
import { sha256 } from 'https://denopkg.com/chiefbiiko/sha256@v1.0.0/mod.ts';

const cacheContext = React.createContext();

function ObsidianWrapper(props) {
  // props to be inputted by user when using the Obsdian Wrapper
  const { algo, capacity, searchTerms, useCache, persistQueries } = props;
  // if useCache hasn't been set, default caching to true
  let caching = true;
  // if it has been set to false, turn client-side caching off
  if (useCache === false) caching = false;

  // algo defaults to LFU, capacity defaults to 2000
  const setAlgoCap = (algo, capacity) => {
    let cache;
    if(caching && algo === 'LRU'){
      cache = new LRUCache(Number(capacity || 2000))
    } else if (caching && algo === 'W-TinyLFU'){
      cache = new WTinyLFUCache(Number(capacity || 2000))
    } else if (caching) {
      cache = new LFUCache(Number(capacity || 2000))
    }
    return cache;
  }

  // once cache is initialized, cannot setCache
  // when tested, setCache breaks the whole app if trying to switch while in use
  // to successfully change between algo types, kill the server, change the algo type in wrapper, then restart server
  const [cache, setCache] = React.useState(setAlgoCap(algo, capacity));

  // FOR DEVTOOL - listening for message from content.js to be able to send algo type and capacity to devtool
  window.addEventListener('message', msg => {
    if(msg.data.type === 'algocap'){
      window.postMessage({
        algo: algo ? algo : 'LFU',
        capacity: capacity ? capacity : 2000
      })
    }
  });

  async function query(query, options = {}) {
    // FOR DEVTOOL - startTime is used to calculate the performance of the cache
    // startDate is to find out when query was made, this data is passed to devtools
    const startTime = Date.now();
    const startDate = new Date(Date.now());

    // set the options object default properties if not provided
    const {
      endpoint = '/graphql',
      cacheRead = !caching ? false : true,
      cacheWrite = !caching ? false : true,
      pollInterval = null,
      wholeQuery = true, //Note: logic for false is currently nonfunctional
    } = options;

    // when pollInterval is not null the query will be sent to the server every inputted number of milliseconds
    if (pollInterval) {
      const interval = setInterval(() => {
        // pass in query() with options instead
        new Promise((resolve, reject) =>
          resolve(
            query(query, { pollInterval: null, cacheRead: false, ...options })
          )
        );
      }, pollInterval);
      return interval;
    }

    // when cacheRead set to true
    if (cacheRead && caching) {
      let resObj;
      // when the developer decides to only utilize whole query for cache
      if (!wholeQuery) resObj = await cache.readWholeQuery(query);
      else resObj = await cache.read(query);
      // check if query is stored in cache
      if (resObj) {
        // returning cached response as a promise
        const cacheHitResponseTime = Date.now() - startTime;

        // resObj['time'] = cacheHitResponseTime;

        console.log(
          "From cacheRead: Here's the response time on the front end: ",
          cacheHitResponseTime
        );

        // FOR DEVTOOL - sends message to content.js with query metrics when query is a hit
        window.postMessage({
          type: 'query',
          time: cacheHitResponseTime,
          date: startDate.toDateString().slice(0, 24),
          query: query,
          hit: true
        });

        return new Promise((resolve, reject) => resolve(resObj));
      }
      // execute graphql fetch request if cache miss
      return new Promise((resolve, reject) => resolve(hunt(query)));
      // when cacheRead set to false
    }
    if (!cacheRead || !caching) {
      return new Promise((resolve, reject) => resolve(hunt(query)));
    }

    // when cache miss or on intervals or not looking in the cache
    async function hunt(query) {
      if (wholeQuery) query = insertTypenames(query);
      try {
        let resJSON;
        if (persistQueries) {
          // IF WE ARE USING PERSIST QUERIES
          // SEND THE HASH
          const hash = sha256(query, 'utf8', 'hex');
          resJSON = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({ hash }),
          });

          // IF HASH WAS NOT FOUND IN HASH TABLE
          if (resJSON.status === 204) {
            // SEND NEW REQUEST WITH HASH AND QUERY
            resJSON = await fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body: JSON.stringify({ hash, query }),
            });

          }

        } else {
          // IF WE ARE NOT USING PERSIST QUERIES
          // JUST SEND THE QUERY ONLY
          resJSON = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({ query }),
          });
        }

        const resObj = await resJSON.json();
        const deepResObj = { ...resObj };
        // update result in cache if cacheWrite is set to true
        if (cacheWrite && caching && resObj.data[Object.keys(resObj.data)[0]] !== null) {
          if (!wholeQuery) cache.writeWholeQuery(query, deepResObj);
          else if(resObj.data[Object.keys(resObj.data)[0]].length > cache.capacity) console.log('Please increase cache capacity');
          else cache.write(query, deepResObj, searchTerms);
        }
        const cacheMissResponseTime = Date.now() - startTime;
        
        // resObj['time'] = cacheMissResponseTime;

        console.log(
          "After the hunt: Here's the response time on the front end: ",
          cacheMissResponseTime
        );

        // FOR DEVTOOL - sends message to content.js when query is a miss
        window.postMessage({
          type: 'query', 
          time: cacheMissResponseTime,
          date: startDate.toDateString().slice(0, 24),
          query: query,
          hit: false
        });

        return resObj;
      } catch (e) {
        console.log(e);
      }
    }
  }

  // Function to clear cache and session storage
  function clearCache() {
    cache.cacheClear();
  }

  // NOTE - FOR DEVTOOL - no messages are currently being passed for mutations
  // so some logic in content.js and background.js may be missing to handle mutations

  // breaking out writethrough logic vs. non-writethrough logic
  async function mutate(mutation, options = {}) {
    const startTime = Date.now();
    mutation = insertTypenames(mutation);
    const {
      endpoint = '/graphql',
      cacheWrite = !caching ? false : true,
      toDelete = false,
      update = null,
      writeThrough = true, // not true
    } = options;
    try {
      if (!writeThrough) {
        // if it's a deletion, then delete from cache and return the object
        if (toDelete) {
          const responseObj = await cache.writeThrough(
            mutation,
            {},
            true,
            endpoint
          );
          const deleteMutationResponseTime = Date.now() - startTime;
          // NOTE -  from OLD DEVTOOLS - chrome.runtime.sendMessage(chromeExtensionId, {
          //   deleteMutationResponseTime: deleteMutationResponseTime,
          // });
          return responseObj;
        } else {
          // for add mutation
          const responseObj = await cache.writeThrough(
            mutation,
            {},
            false,
            endpoint
          );
          // for update mutation
          if (update) {
            // run the update function
            update(cache, responseObj);
          }
          // always write/over-write to cache (add/update)
          // GQL call to make changes and synchronize database
          console.log('WriteThrough - false ', responseObj);
          const addOrUpdateMutationResponseTime = Date.now() - startTime;
          // NOTE - from OLD DEVTOOLS - chrome.runtime.sendMessage(chromeExtensionId, {
          //   addOrUpdateMutationResponseTime: addOrUpdateMutationResponseTime,
          // });
          return responseObj;
        }
      } else {
        // copy-paste mutate logic from 4.

        // use cache.write instead of cache.writeThrough
        const responseObj = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ query: mutation }),
        }).then((resp) => resp.json());
        if (!cacheWrite || !caching) return responseObj;
        // first behaviour when delete cache is set to true
        if (toDelete) {
          cache.write(mutation, responseObj, searchTerms, true);
          return responseObj;
        }
        // second behaviour if update function provided
        if (update) {
          update(cache, responseObj);
        }

        if(!responseObj.errors) cache.write(mutation, responseObj, searchTerms);
        // third behaviour just for normal update (no-delete, no update function)
        console.log('WriteThrough - true ', responseObj);
        return responseObj;
      }
    } catch (e) {
      console.log(e);
    }
  }
  // Returning Provider React component that allows consuming components to subscribe to context changes
  return (
    <cacheContext.Provider
      value={{ cache, setCache, query, clearCache, mutate }}
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
