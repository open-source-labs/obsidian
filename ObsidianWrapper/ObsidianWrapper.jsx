import React from "https://dev.jspm.io/react";
import BrowserCache from "../src/Browser/CacheClassBrowser.js";
import { insertTypenames } from "../src/Browser/insertTypenames.js";

const cacheContext = React.createContext();

function ObsidianWrapper(props) {
  const [cache, setCache] = React.useState(new BrowserCache());

  // You have to put your Google Chrome Obsidian developer tool extension id to connect Obsidian Wrapper with dev tool
  const chromeExtensionId = "dkbfipkapkljpdbhdihnlnbieffhjdmh";
  window.localStorage.setItem("cache", JSON.stringify(cache));

  async function query(query, options = {}) {
    // dev tool messages
    const startTime = Date.now();
    chrome.runtime.sendMessage(chromeExtensionId, { query: query });
    chrome.runtime.sendMessage(chromeExtensionId, {
      cache: window.localStorage.getItem("cache"),
    });
    console.log(
      "Here's the message content: ",
      window.localStorage.getItem("cache")
    );
    // set the options object default properties if not provided
    const {
      endpoint = "/graphql",
      cacheRead = true,
      cacheWrite = true,
      pollInterval = null,
      wholeQuery = false,
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
      if (wholeQuery) resObj = await cache.readWholeQuery(query);
      else resObj = await cache.read(query);
      console.log("query function resObj: ", resObj);
      // check if query is stored in cache
      if (resObj) {
        // returning cached response as a promise
        const cacheHitResponseTime = Date.now() - startTime;
        chrome.runtime.sendMessage(chromeExtensionId, {
          cacheHitResponseTime: cacheHitResponseTime,
        });
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
      if (!wholeQuery) query = insertTypenames(query);
      try {
        // send fetch request with query
        const resJSON = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ query }),
        });
        const resObj = await resJSON.json();
        const deepResObj = { ...resObj };
        // update result in cache if cacheWrite is set to true
        if (cacheWrite) {
          if (wholeQuery) cache.writeWholeQuery(query, deepResObj);
          else cache.write(query, deepResObj);
        }
        const cacheMissResponseTime = Date.now() - startTime;
        chrome.runtime.sendMessage(chromeExtensionId, {
          cacheMissResponseTime: cacheMissResponseTime,
        });
        console.log(
          "Here's the response time on the front end: ",
          cacheMissResponseTime
        );
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
    chrome.runtime.sendMessage(chromeExtensionId, {
      mutation: mutation,
    });
    const startTime = Date.now();
    mutation = insertTypenames(mutation);
    const {
      endpoint = "/graphql",
      cacheWrite = true,
      toDelete = false,
      update = null,
      writeThrough = false,
    } = options;
    try {
      if (writeThrough) {
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
          console.log("WriteThrough - true ", responseObj);
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
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
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
        // third behaviour just for normal update (no-delete, no update function)
        cache.write(mutation, responseObj);
        console.log("WriteThrough - false ", responseObj);
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
