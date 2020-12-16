/* eslint-disable no-restricted-syntax */
/** NOTES:
 * 1.This function will assume that everything passed in is a queryObj, response object from gql request, and the original cache
 * 2. This function will add new fields to the cache and new key/value pair queries to the ROOT_QUERY.
 * 3. This function will update an existent field or an existent ROOT_QUERY key/value pair.
 * 4. This function will update the existent cache keeping its reference.
 */

import normalizeResult from './newNormalize.js';
import destructureQueries from './newDestructure.js';
export function writeCache(queryStr, resultObj, cache) {
  const queryObj = destructureQueries(queryStr);
  const resFromNormalize = normalizeResult(queryObj, resultObj);
  // update the original cache with same reference
  for (const key in resFromNormalize) {
    if (cache[key]) {
      Object.assign(cache[key], resFromNormalize[key]);
    } else {
      cache[key] = resFromNormalize[key];
    }
  }
  return cache;
  // return 'Cache Updated';
}
console.log(
  destructureQueries(`
query AllMoviesAndGetActorById  {
  movies {
    __typename
    id
    title
    actors {
      __typename
      id
      firstName
    }
  }
  actor(id: 1) {
    __typename
    id
    firstName
    LastName
  }
}
`)
);
