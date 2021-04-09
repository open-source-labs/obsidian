/**
 * NOTES:
 * 1. is a method on the cache object that removes all references to DELETED and inaccessible hashes
 * 2. a reference is considered inaccessible if there is no way to access it from any of the root queries
 * 3. How/when should this be called?
 *    after every query/mutation?
 *    on some sort of time interval?
 *    only when the developer asks for it?
 *    when the cache reaches a certain size?
 */
class Cache {
  gc() {
    // where the magic happens
  }
}

/**
 * Possible high-level approach
 *  1. iterate through all the hashes and generate a Set of all the deleted hashes.
 *  2. delete those hashes
 *  3. iterate through all of the non-wholeQuery ROOT_QUERIES
 *    - remove any hash reference that is a member of the deleted hash Set
 *    - for any hash reference that has not been deleted
 *       - add that hash to a Set of accessible hashes
 *       - recursively trace that hash and continue removing any deleted hash references and updating the Set of accesible hashes
 *  4. remove any hashes that are not a member of the accessible hash Set
 */

// EXAMPLE ===========================================================================================
const cacheBeforeGC = {
  ROOT_QUERY: {
    'actor(id:1)': 'Actor~1',
    favoriteMovies: ['Movie~1', 'Movie~2', 'Movie~3'], // includes reference to deleted hash
    'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~3', 'Movie~5'], // includes reference to deleted hash
  },
  ROOT_MUTATION: {
    'favoriteMovie(id:2)': 'Movie~2',
    "addMovie(input: {title: 'The Fugitive', releaseYear: 1993, genre: ACTION })":
      'Movie~5',
    'deleteMovie(id:3)': 'Movie~3',
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
    isFavorite: true,
  },
  // DELETED
  'Movie~3': 'DELETED',
  'Movie~5': {
    id: '5',
    title: 'The Fugitive',
    genre: 'ACTION',
    releaseYear: 1993,
    isFavorite: false,
  },
  'Actor~1': {
    id: '1',
    firstName: 'Harrison',
    lastName: 'Ford',
    films: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~5'], // includes reference to deleted hash
  },
  'Actor~2': { id: '2', firstName: 'Sean', lastName: 'Connery' },
  'Actor~3': { id: '3', firstName: 'Mark', lastName: 'Hamill' },
  'Actor~4': { id: '4', firstName: 'Patti', lastName: 'LuPone' }, // INACCESSIBLE
  'Actor~5': { id: '5', firstName: 'Gary', lastName: 'Oldman' }, // INACCESSIBLE
};

const cacheAfterGC = {
  ROOT_QUERY: {
    'actor(id:1)': 'Actor~1',
    favoriteMovies: ['Movie~1', 'Movie~2'], // deleted reference removed
    'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~5'], // deleted reference removed
  },
  ROOT_MUTATION: {
    'favoriteMovie(id:2)': 'Movie~2',
    "addMovie(input: {title: 'The Fugitive', releaseYear: 1993, genre: ACTION })":
      'Movie~5',
    // 'deleteMovie(id:4)': 'Movie~4', // mistake?
    'deleteMovie(id:3)': 'Movie~3',
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
    isFavorite: true,
  },
  // deleted hash removed
  'Movie~5': {
    id: '5',
    title: 'The Fugitive',
    genre: 'ACTION',
    releaseYear: 1993,
    isFavorite: false,
  },
  'Actor~1': {
    id: '1',
    firstName: 'Harrison',
    lastName: 'Ford',
    films: ['Movie~1', 'Movie~2', 'Movie~5'], // deleted reference removed
  },
  'Actor~2': { id: '2', firstName: 'Sean', lastName: 'Connery' },
  'Actor~3': { id: '3', firstName: 'Mark', lastName: 'Hamill' },
  // inaccessible hashes removed
};
