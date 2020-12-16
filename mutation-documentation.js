/**
 * NOTES:
 * 1. This implementation does not handle variables currently
 * 2. This function will always send the inputted mutation operation string to the inputed endpoint
 * 3. Once recieving a response object it will have three different behaviors depending on what is passsed
 *    into the options object:
 *      1. Will update fields for any elements that we find if the hash is present and not set to 'DELETE'.
 *        - will not do anything with any fields associated with unknown hashes.
 *      2. If delete flag is set to true, will set the value every top level hash that currently exists to 'DELETE'
 *        - cache.read() will need to be updated to ignore any hashes with the value 'DELETE' (not treat as cache miss)
 *      3. If update is set to a function.  That function will be executed causeing a cache update as specified by the developer.
 *        - the cache object and respObj will automatically be passed into the update object as arguments
 */

function mutate(mutation, options) {}

// options object
const options = {
  endpoint: '/graphql', // the endpoint where the post request with mutation string will be sent; DEFAULT: '/graphql'
  delete: false, // flag the developer can set to indicate delete mutation; DEFAULT: 'false'
  update: update(cache, respObj), // optional update function to customize cache updating behavior; DEFAULT: null
};

// EXAMPLES

// EXAMPLE 1: SIMPLE UPDATE ===================================================================================================

const cachePreMut = {
  ROOT_QUERY: {
    'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~4'],
  },
  ROOT_MUTATION: {},

  'Movie~1': {
    id: '1',
    title: 'Indiana Jones and the Last Crusade',
    genre: 'ACTION',
    releaseYear: 1989,
    isFavorite: false,
  },
  'Movie~4': {
    id: '4',
    title: 'Air Force One',
    genre: 'ACTION',
    releaseYear: 1997,
    isFavorite: false,
  },
};

const ADD_FAVORITE_MOVIE = gql`
  mutation AddFavoriteMovie {
    favoriteMovie(id: 2) {
      id
      isFavorite
    }
  }
`;

mutate(ADD_FAVORITE_MOVIE); // we don't need an options object since we are using /graphql endpoint

const respObj = {
  data: {
    favoriteMovie: [
      {
        __typename: 'Movie',
        id: '4',
        isFavorite: true,
      },
    ],
  },
};

const cachePreMut = {
  ROOT_QUERY: {
    'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~4'],
  },
  ROOT_MUTATION: {
    'favoriteMovie(id: 2)': 'Movie~2',
  },

  'Movie~1': {
    id: '1',
    title: 'Indiana Jones and the Last Crusade',
    genre: 'ACTION',
    releaseYear: 1989,
    isFavorite: false,
  },
  'Movie~4': {
    id: '4',
    title: 'Air Force One',
    genre: 'ACTION',
    releaseYear: 1997,
    isFavorite: true, // updated value
  },
};

// SPECIAL NOTE: this mutation would result in no cache change because Movie~2 is not currently cached
const ADD_FAVORITE_MOVIE = gql`
  mutation AddFavoriteMovie {
    favoriteMovie(id: 2) {
      id
      isFavorite
    }
  }
`;

// EXAMPLE 2: SIMPLE DELETE ===================================================================================================

const cachePreMut = {
  ROOT_QUERY: {
    'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~4'],
  },
  ROOT_MUTATION: {},

  'Movie~1': {
    id: '1',
    title: 'Indiana Jones and the Last Crusade',
    genre: 'ACTION',
    releaseYear: 1989,
    isFavorite: false,
  },
  'Movie~4': {
    id: '4',
    title: 'Air Force One',
    genre: 'ACTION',
    releaseYear: 1997,
    isFavorite: false,
  },
};
