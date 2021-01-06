/**
 * NOTES:
 * 1. This implementation does not handle variables or aliases currently
 * 2. Potential updates needed for implementation:
 *   - gather_hunt.jsx will need to be updated to handle the combining of hunt and gather.
 *   - making simple edits to gather_hunt should be sufficient for handling the cacheRead, cacheWrite, PollInterval flags;
 *   - some combination of newNormalize, newDestructure, and the read and write methods on the cache
 *      would need to be updated to account for wholeQuery caching
 *   - it may make more sense to create dedicated cache methods for whole query caching
 */

function query(query, options) {
  // where the magic happens
}

// options object
const options = {
  endpoint: '/graphql', // the endpoint where the post request with mutation string will be sent; DEFAULT: '/graphql'
  cacheRead: true, // determines whether the cache should be checked before making a server request; DEFAULT: true
  cacheWrite: true, // determines whether the response from a server request should be written into the cache; DEFAULT: true
  pollInterval: null, // if non-null the query will be sent the server every inputted number of ms; DEFAULT: null
  wholeQuery: false, // for any cache reads or writes this will conduct wholeQuery writes or retrieval; DEFAULT: false
};

/**
 * cacheRead
 *  - If set to false the query will always be sent to the server; the cache will not be checked.
 *  - __typenames will still be inserted into this request
 */

/**
 * cacheWrite
 *  - If set to false, the cache will never be updated even if new data is retrieved from the server.
 */

/**
 * pollInterval
 *  - null disables this feature
 *  - This same query will be sent to the server every inputed number of milliseconds
 *  - This query will not check the client-side cache before being sent to the server
 *  - The response from the server will be written into cache upon receipt
 */

/**
 * wholeQuery
 *  - if enabled the entire query and response will be stored in the cache as one key value pair
 *  - a minified version of the entire query operation string will be stored as the hash key
 *  - the response object will be stored as the value without any normalization
 *  - the only way to retrieve a cached whole query is to make another query request with an identical
 *     operation query string and the wholeQuery flag set to true
 *  - if the WholeQuery flag is true the caheRead and cacheWrite flags will be ignored.
 *  - __typenames will not get inserted into wholeQuery requests
 */

// WHOLE QUERY EXAMPLE ======================================================================================

const ALL_MOVIES = gql`
  query AllMovies {
    movies {
      id
      title
      actors {
        id
        firstName
      }
    }
  }
`;
const respAllMovies = {
  data: {
    movies: [
      {
        id: '1',
        title: 'Indiana Jones and the Last Crusade',
        actors: [
          { id: '1', firstName: 'Harrison' },
          { id: '2', firstName: 'Sean' },
        ],
      },
      {
        id: '2',
        title: 'Empire Strikes Back',
        actors: [
          { id: '1', firstName: 'Harrison' },
          { id: '3', firstName: 'Mark' },
        ],
      },
      {
        id: '3',
        title: 'Witness',
        actors: [
          { id: '1', firstName: 'Harrison' },
          { id: '4', firstName: 'Patti' },
        ],
      },
      {
        id: '4',
        title: 'Air Force One',
        actors: [
          { id: '1', firstName: 'Harrison' },
          { id: '5', firstName: 'Gary' },
        ],
      },
    ],
  },
};

const cache = {
  ROOT_QUERY: {
    'queryAllMovies{movies{idtitleactors{idfirstName}}}': {
      data: {
        movies: [
          {
            id: '1',
            title: 'Indiana Jones and the Last Crusade',
            actors: [
              { id: '1', firstName: 'Harrison' },
              { id: '2', firstName: 'Sean' },
            ],
          },
          {
            id: '2',
            title: 'Empire Strikes Back',
            actors: [
              { id: '1', firstName: 'Harrison' },
              { id: '3', firstName: 'Mark' },
            ],
          },
          {
            id: '3',
            title: 'Witness',
            actors: [
              { id: '1', firstName: 'Harrison' },
              { id: '4', firstName: 'Patti' },
            ],
          },
          {
            id: '4',
            title: 'Air Force One',
            actors: [
              { id: '1', firstName: 'Harrison' },
              { id: '5', firstName: 'Gary' },
            ],
          },
        ],
      },
    },
  },
  ROOT_MUTATION: {},
};
