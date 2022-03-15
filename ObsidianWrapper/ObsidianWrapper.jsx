import React from 'https://dev.jspm.io/react';
import BrowserCache from '../src/Browser/CacheClassBrowser.js';
import { insertTypenames } from '../src/Browser/insertTypenames.js';

const cacheContext = React.createContext();

function ObsidianWrapper(props) {
	const [cache, setCache] = React.useState(new BrowserCache());
	async function query(query, options = {}) {
		// set the options object default properties if not provided
		const {
			endpoint = '/graphql',
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
			// check if query is stored in cache
			if (resObj) {
				// returning cached response as a promise
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
				if (cacheWrite) {
					if (wholeQuery) cache.writeWholeQuery(query, deepResObj);
					else cache.write(query, deepResObj);
				}
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
	// mutate method, refer to mutate.js for more info
	// async function mutateOld(mutation, options = {}) {
	//   // set the options object default properties if not provided
	//   mutation = insertTypenames(mutation);
	//   let {
	//     endpoint = '/graphql',
	//     cacheWrite = true,
	//     toDelete = false,
	//     update = null,
	//     writeThrough = true,
	//   } = options;
	//   // for any mutation a request to the server is made
	//   try {
	//     // one-time check to add types to cache
	//     if(writeThrough){
	//       writeThrough = await cache.write(mutation, {}, toDelete, writeThrough);
	//     }
	//     const responseObj = await fetch(endpoint, {
	//       method: 'POST',
	//       headers: {
	//         'Content-Type': 'application/json',
	//         Accept: 'application/json',
	//       },
	//       body: JSON.stringify({ query: mutation }),
	//     }).then((resp) => resp.json());
	//     if (!cacheWrite) return responseObj;
	//     // first behaviour when delete cache is set to true
	//     console.log('writeThrough before toDelete: ', writeThrough)
	//     if (!writeThrough && toDelete) {
	//       console.log('in the toDelete')
	//       cache.write(mutation, responseObj, true);
	//       return responseObj;
	//     }
	//     // second behaviour if update function provided
	//     if (update) {
	//       update(cache, responseObj);
	//     }
	//     // third behaviour just for normal update (no-delete, no update function)
	//     if(!writeThrough){
	//       console.log('in the !writeThrough')
	//       cache.write(mutation, responseObj);
	//     }
	//     if (writeThrough) {
	//       console.log('Here\'s the response from cache: ', writeThrough);
	//       return writeThrough;
	//     }
	//     return responseObj;
	//   } catch (e) {
	//     console.log(e);
	//   }
	// }

	// breaking out writethrough logic vs. non-writethrough logic
	async function mutate(mutation, options = {}) {
		mutation = insertTypenames(mutation);
		const {
			endpoint = '/graphql',
			cacheWrite = true,
			toDelete = false,
			update = null,
			writeThrough = false,
		} = options;
		try {
			console.log('Lets see endpoint ' , endpoint);
			if (writeThrough) {
				// helper function to check if we've stored the type yet
				if (toDelete) {
					const responseObj = cache.writeThrough(mutation, {}, true, endpoint);
					return responseObj;
				} else {
					if (update) {
						// run the update function
					}
					// always write/over-write to cache (add/update)
					const responseObj = cache.writeThrough(mutation, {},false,endpoint);
					// GQL call to make changes and synchronize database
					console.log('WriteThrough - true ', responseObj);
					return responseObj;
				}
			} else {
				// copy-paste mutate logic from 4.0
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
				// third behaviour just for normal update (no-delete, no update function)
				cache.write(mutation, responseObj);
				console.log('WriteThrough - false ', responseObj);
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
