/** NOTES:
 * 1.This function will assume that everything passed in is a response object from gql request, query object from the destructure queries, and the original cache
 * 2. This function will add new fields to the cache and new key/value pair queries to the ROOT_QUERY .
 * 3. This function will update an existent field or an existent ROOT_QUERY key/value pair.
 * 4. This function will return the updated cache with the same reference.
 */
const toAddInCache = {
  ROOT_QUERY: {
    'actor(id:1)': 'Actor~1',
    movies: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~4'],
  },
  'Movie~1': {
    id: '1',
    title: 'Indiana Jones and the Last Crusade',
    actors: ['Actor~1', 'Actor~2'],
    genre: 'ACTION',
    releaseYear: 1989,
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
  'Movie~4': {
    id: '4',
    title: 'Air Force One',
    actors: ['Actor~1', 'Actor~5'],
    genre: 'ACTION',
    releaseYear: 1997,
  },
  'Actor~1': {
    id: '1',
    firstName: 'Harrison',
    lastName: 'Ford',
    films: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~4'],
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
  'Movie~2': {
    id: '2',
    title: 'Empire Strikes Back',
  },
  'Movie~3': {
    id: '3',
    title: 'Witness',
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
};
function creatCache(resFromNormalize, cache) {
  // update the root query from both objects and merge them into the response object. This will modify resFromNormalize with the updated ROOT_QUERY
  Object.assign(resFromNormalize.ROOT_QUERY, cache.ROOT_QUERY);
  // update the original cache with the response object. This will return the reference to the original cache
  return Object.assign(cache, resFromNormalize);
}

const respCache = creatCache(toAddInCache, originalCache);
console.log(respCache);
console.log(originalCache === respCache);
