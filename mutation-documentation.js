/**
 * NOTES:
 * 1. This implementation does not handle variables currently
 * 2. This function will always send the inputted mutation operation string to the inputted endpoint
 * 3. Once receiving a response object it will have three different behaviors depending on what is passed
 *    into the options object:
 *      1. Will update fields for any elements that we find if the hash is present and not set to 'DELETE'.
 *        - will not do anything with any fields associated with unknown hashes.
 *      2. If the delete flag is set to true, the function will set the value of every top level hash that currently exists to 'DELETE'
 *        - cache.read() will need to be updated to ignore any hashes with the value 'DELETE' (not treat as cache miss)
 *      3. If the update property is set to a function.  That function will be executed causing a cache update as specified by the developer.
 *        - the cache object and respObj will automatically be passed into the update object as arguments
 * 4. After implementing garbage collection: This function would invoke gc() every time a mutation is made except when an update function is provided by the developer.
 * 5. This implementation would update the cache only if the flag cache is set to true.
 * 6. This function takes in a mutation string and an optional options object and returns the response object from the request made.
 */

function mutate(mutation, options) {
  // where the magic happens
}

// options object
const options = {
  endpoint: '/graphql', // the endpoint where the post request with mutation string will be sent; DEFAULT: '/graphql'
  cache: true, // flag to enable automatic cache updates; DEFAULT: 'true'
  delete: false, // flag the developer can set to indicate delete mutation; DEFAULT: 'false'
  update: updateFunc(cache, respObj), // optional update function to customize cache updating behavior; DEFAULT: null
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
    favoriteMovie(id: 4) {
      __typename
      id
      isFavorite
    }
  }
`;

mutate(ADD_FAVORITE_MOVIE); // we don't need an options object since we are using /graphql endpoint

const respObj = {
  data: {
    favoriteMovie: {
      __typename: 'Movie',
      id: '4',
      isFavorite: true,
    },
  },
};

const cachePostMut = {
  ROOT_QUERY: {
    'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~4'],
  },
  ROOT_MUTATION: {
    'favoriteMovie(id: 4)': 'Movie~4',
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

// SPECIAL NOTE: this mutation string would result in no cache change because Movie~2 is not currently cached
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

const DELETE_MOVIE = gql`
  mutation DeleteMovie {
    deleteMovie(id: 4) {
      __typename
      id
    }
  }
`;

mutate(DELETE_MOVIE, { delete: true });

const respObj = {
  data: {
    deleteMovie: {
      __typename: 'Movie',
      id: '4',
    },
  },
};

const cachePostMut = {
  ROOT_QUERY: {
    'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~4'],
  },
  ROOT_MUTATION: {
    'deleteMovie(id:4)': 'Movie~4',
  },

  'Movie~1': {
    id: '1',
    title: 'Indiana Jones and the Last Crusade',
    genre: 'ACTION',
    releaseYear: 1989,
    isFavorite: false,
  },
  'Movie~4': 'DELETED', // Movie~4 set to DELETED
};

// SPECIAL NOTE: DELETED hashes will be ignored in future queries and not throw a cache miss

const ALL_MOVIES = gql`
  query movies(input: {genre: ACTION}) {
    movies {
      __typename
      id
      title
    }
  }
`;

gather(ALL_MOVIES);

// this will be the response object served for the above query from the cache
const respObj = {
  data: {
    movies: [
      {
        __typename,
        id: '1',
        title: 'Indiana Jones and the Last Crusade',
      },
    ],
  },
};

// EXAMPLE 3: SIMPLE CREATE ===================================================================================================

const ALL_MOVIES_BY_RELEASE_DATE = gql`
  query AllMoviesByDate {
    movies(sort: { release: ASC }) {
      __typename
      id
      title
      releaseYear
      genre
      isFavorite
    }
  }
`;

// cache after the above query
const cachePreMut = {
  ROOT_QUERY: {
    'movies(sort:{release:ASC})': ['Movie~1', 'Movie~4'],
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

const ADD_MOVIE = gql`
  mutation AddMovie {
    addMovie(input: {title: 'The Fugitive', releaseYear: 1993, genre: ACTION }) {
      __typename
      id
      title
      releaseYear
      genre
      isFavorite
    }
  }
`;

// developer defined update function to correctly add movies into ALL_MOVIES_BY_RELEASE_DATE query
function movieUpdate(cache, respObj) {
  const result = cache.read(ALL_MOVIES_BY_RELEASE_DATE);
  const { movies } = result.data;
  const newMovie = respObj.data.addMovie;
  const updatedMovieArr = movies.push(newMovie).sort((movie1, movie2) => {
    return movie1.releaseYear - movie2.releaseYear;
  });
  const updatedRespObj = { data: { movies: updatedMovieArr } };
  cache.write(ALL_MOVIES_BY_RELEASE_DATE, updatedRespObj);
}

mutate(ADD_MOVIE, { update: movieUpdate });

const respAddMovie = {
  data: {
    addMovie: {
      __typename: 'Movie',
      id: '5',
      title: 'The Fugitive',
      releaseYear: 1993,
      genre: 'ACTION',
      isFavorite: false,
    },
  },
};

const cachePostMut = {
  ROOT_QUERY: {
    'movies(sort:{release:ASC})': ['Movie~1', 'Movie~5', 'Movie~4'], // Movie~5 is slotted into the appropriate place
  },
  ROOT_MUTATION: {
    "addMovie(input:{title:'TheFugitive',releaseYear:1993,genre:ACTION})":
      'Movie~5',
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
    isFavorite: false,
  },
  // Movie~5 added
  'Movie~5': {
    id: '5',
    title: 'The Fugitive',
    genre: 'ACTION',
    releaseYear: 1993,
    isFavorite: false,
  },
};
