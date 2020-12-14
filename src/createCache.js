/**
 * NOTES:
 * 1.This function will record the arguments as a string unless we come up with an alternative argument
 * 2. This function will assume that everything passed in is a query, not a mutation.
 * 3. This function accepts one query operation which contains one/multiples queries as input
 * 4. We won't worry about arguments on fields for now
 * 5. We won't worry about aliases for now
 * 6. We won't worry about handling directives for now
 * 7. We wont' worry about fragments for now
 * 8. We won't handle variables for now
 * 9. We will handle only the meta field "__typename" for now
 * 10. This function will return undefined if any of the field value is missing from the cache or/and if the query does not exist in the cache
 * 11. Edge cases: if not passed a query string, return undefined
 */

const addInCache = {
  ROOT_QUERY: {
    'actor(id:1)': 'Actor~1',
    movies: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~4'],
  },

  'Movie~2': {
    id: '2',
    title: 'Empire Strikes Back',
    actors: ['Actor~1', 'Actor~3'],
    releaseYear: 1980,
  },
  'Movie~3': {
    id: '3',
    title: 'Witness',
    actors: ['Actor~1', 'Actor~4'],
    releaseYear: 1985,
  },
  'Actor~1': {
    id: '1',
    firstName: 'Harrison',
    lastName: 'Ford',
    films: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~4'],
  },
  'Actor~2': {
    id: '2',
    firstName: 'Sean',
    lastName: 'Connery',
    films: ['Movie~1'],
  },
  'Actor~3': {
    id: '3',
    firstName: 'Mark',
    lastName: 'Hamill',
    films: ['Movie~2'],
  },
  'Actor~4': {
    id: '4',
    firstName: 'Patti',
    lastName: 'LuPone',
    films: ['Movie~3'],
  },
  'Actor~5': {
    id: '5',
    firstName: 'Gary',
    lastName: 'Oldman',
    films: ['Movie~4'],
  },
};

const originalCache = {
  ROOT_QUERY: {
    'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~4'],
    actors: ['Actor~1', 'Actor~2', 'Actor~3', 'Actor~4', 'Actor~5'],
  },
  'Movie~1': {
    id: '1',
    title: 'Indiana Jones and the Last Crusade',
    actors: ['Actor~1', 'Actor~2'],
    genre: 'ACTION',
  },

  'Movie~4': {
    id: '4',
    title: 'Air Force One',
    actors: ['Actor~1', 'Actor~5'],
    genre: 'ACTION',
  },
  'Actor~2': {
    id: '2',
    firstName: 'Sean',
    lastName: 'Connery',
    films: ['Movie~1'],
  },
  'Actor~5': {
    id: '5',
    firstName: 'Gary',
    lastName: 'Oldman',
    films: ['Movie~4'],
  },
};
function createCache(newRespCacheObj, cache) {
  const rootQuery = Object.assign(newRespCacheObj.ROOT_QUERY, cache.ROOT_QUERY);
  const newCache = { ...cache, ROOT_QUERY: rootQuery };
  return Object.assign(newCache, newRespCacheObj);
}
console.log(createCache(originalCache, addInCache));
