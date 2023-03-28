import * as React from "https://esm.sh/react@18";
import LFUCache from '../src/Browser/lfuBrowserCache.js';
import LRUCache from '../src/Browser/lruBrowserCache.js';
import WTinyLFUCache from "../src/Browser/wTinyLFUBrowserCache.js";
import { insertTypenames } from '../src/Browser/insertTypenames.js';

const cacheContext = React.createContext();

function ObsidianWrapper(props) {
  const { algo, capacity } = props

  const setAlgoCap = (algo, capacity) => {
    let cache;
    if(algo === 'LRU'){
      cache = new LRUCache(Number(capacity || 2000))
    } else if (algo === 'W-TinyLFU'){
      cache = new WTinyLFUCache(Number(capacity || 2000))
    } else {
      cache = new LFUCache(Number(capacity || 2000))
    }
    return cache;
  }

  const [cache, setCache] = React.useState(setAlgoCap(algo, capacity));
  
  // if(!algo) setCache(new LFUCache(Number(capacity || 2000)))
  // if(algo === 'LRU') setCache(new LRUCache(Number(capacity || 2000)));  // You have to put your Google Chrome Obsidian developer tool extension id to connect Obsidian Wrapper with dev tool
  // if(algo === 'W-TinyLFU') setCache(new WTinyLFUCache(Number(capacity || 2000))); 

  window.addEventListener('message', msg => {
    if(msg.data.type === 'algocap'){
      window.postMessage({
        algo: algo ? algo : 'LFU',
        capacity: capacity ? capacity : 2000
      })
    }
  });

  const chromeExtensionId = 'apcpdmmbhhephobnmnllbklplpaoiemo';
  // initialice cache in local storage
  //window.localStorage.setItem('cache', JSON.stringify(cache));

  let firstMessage = true;

  async function query(query, options = {}) {
    // dev tool messages
    const startTime = Date.now();
    /*
      chrome.runtime.sendMessage(chromeExtensionId, { query: query });
      chrome.runtime.sendMessage(chromeExtensionId, {
        cache: window.localStorage.getItem('cache'),
      });
    */

    if(firstMessage){
      window.postMessage({
        algo: algo ? algo : 'LFU',
        capacity: capacity ? capacity : 2000
      });
      firstMessage = false;
    };

    // set the options object default properties if not provided
    const {
      endpoint = '/graphql',
      cacheRead = true,
      cacheWrite = true,
      pollInterval = null,
      wholeQuery = true,
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
    if (cacheRead) {
      let resObj;
      // when the developer decides to only utilize whole query for cache
      if (!wholeQuery) resObj = await cache.readWholeQuery(query);
      else resObj = await cache.read(query);
      // check if query is stored in cache
      if (resObj) {
        // returning cached response as a promise
        const cacheHitResponseTime = Date.now() - startTime;

        // Allow for access of the response time
        // const cacheCopy = {...cache};
        // cacheCopy.callTime = cacheHitResponseTime;
        // setCache(cacheCopy);
        resObj['time'] = cacheHitResponseTime

        console.log(
          "From cacheRead: Here's the response time on the front end: ",
          cacheHitResponseTime
        );
        window.postMessage({
          type: 'query',
          time: cacheHitResponseTime,
          name: startTime,
          hit: true
        });
        /*chrome.runtime.sendMessage(chromeExtensionId, {
          cacheHitResponseTime: cacheHitResponseTime,
        });*/
        return new Promise((resolve, reject) => resolve(resObj));
      }
      // execute graphql fetch request if cache miss
      return new Promise((resolve, reject) => resolve(hunt(query)));
      // when cacheRead set to false
    }
    if (!cacheRead) {
      return new Promise((resolve, reject) => resolve(hunt(query)));
    }

    // when cache miss or on intervals
    async function hunt(query) {
      if (wholeQuery) query = insertTypenames(query);
      try {
        // send fetch request with query
        const resJSON = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ query }),
        });
        const resObj = await resJSON.json();
        const deepResObj = { ...resObj };
        // update result in cache if cacheWrite is set to true
        if (cacheWrite && resObj.data[Object.keys(resObj.data)[0]] !== null) {
          if (!wholeQuery) cache.writeWholeQuery(query, deepResObj);
          else if(resObj.data[Object.keys(resObj.data)[0]].length > cache.capacity) console.log('Please increase cache capacity');
          else cache.write(query, deepResObj);
        }
        const cacheMissResponseTime = Date.now() - startTime;
        /*chrome.runtime.sendMessage(chromeExtensionId, {
          cacheMissResponseTime: cacheMissResponseTime,
        });*/
        resObj['time'] = cacheMissResponseTime
        console.log(
          "After the hunt: Here's the response time on the front end: ",
          cacheMissResponseTime
        );
        window.postMessage({
          type: 'query', 
          time: cacheMissResponseTime,
          name: startTime,
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

  // breaking out writethrough logic vs. non-writethrough logic
  async function mutate(mutation, options = {}) {
    // dev tool messages
    // chrome.runtime.sendMessage(chromeExtensionId, {
    //   mutation: mutation,
    // });
    const startTime = Date.now();
    mutation = insertTypenames(mutation);
    const {
      endpoint = '/graphql',
      cacheWrite = true,
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
          chrome.runtime.sendMessage(chromeExtensionId, {
            deleteMutationResponseTime: deleteMutationResponseTime,
          });
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
          chrome.runtime.sendMessage(chromeExtensionId, {
            addOrUpdateMutationResponseTime: addOrUpdateMutationResponseTime,
          });
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
        if (!cacheWrite) return responseObj;
        // first behaviour when delete cache is set to true
        if (toDelete) {
          cache.write(mutation, responseObj, true);
          return responseObj;
        }
        // second behaviour if update function provided
        if (update) {
          update(cache, responseObj);
        }

        if(!responseObj.errors) cache.write(mutation, responseObj);
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
