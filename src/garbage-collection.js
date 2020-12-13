/**
 * NOTES:
 * 1. is a function that takes in the cache and returns a copy with any inaccessible references removed
 * 2. a reference is considered inaccessible if there is no way to access it from any of the root queries
 * 3. How/when should this be called?
 *    after every query/mutation?
 *    on some sort of time interval?
 *    only when the developer asks for it?
 *    when the cache reaches a certain size?
 */

function garbageCollection(cache) {}

const cacheBeforeGC = {
  ROOT_QUERY: {
    'actor(id:1)': 'Actor~1',
    favoriteMovies: ['Movie~1', 'Movie~2', 'Movie~5'],
    'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~5'],
  },
  ROOT_MUTATION: {
    'favoriteMovie(id:2)': 'Movie~2',
    "addMovie(input: {title: 'The Fugitive', releaseYear: 1993, genre: ACTION })":
      'Movie~5',
    'deleteMovie(id:4)': 'Movie~5',
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
  // INACCESSIBLE
  'Movie~3': {
    id: '3',
    title: 'Witness',
    actors: ['Actor~1', 'Actor~4'],
    releaseYear: 1985,
  },
  'Movie~5': {
    id: '5',
    title: 'The Fugitive',
    genre: 'ACTION',
    releaseYear: 1993,
    isFavorite: false,
  },
  'Actor~1': { id: '1', firstName: 'Harrison', lastName: 'Ford' },
  'Actor~2': { id: '2', firstName: 'Sean', lastName: 'Connery' },
  'Actor~3': { id: '3', firstName: 'Mark', lastName: 'Hamill' },
  'Actor~4': { id: '4', firstName: 'Patti', lastName: 'LuPone' }, // INACCESSIBLE
  'Actor~5': { id: '5', firstName: 'Gary', lastName: 'Oldman' }, // INACCESSIBLE
};

const resultObj = {
  ROOT_QUERY: {
    'actor(id:1)': 'Actor~1',
    favoriteMovies: ['Movie~1', 'Movie~2', 'Movie~5'],
    'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~5'],
  },
  ROOT_MUTATION: {
    'favoriteMovie(id:2)': 'Movie~2',
    "addMovie(input: {title: 'The Fugitive', releaseYear: 1993, genre: ACTION })":
      'Movie~5',
    'deleteMovie(id:4)': 'Movie~4',
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
  'Movie~5': {
    id: '5',
    title: 'The Fugitive',
    genre: 'ACTION',
    releaseYear: 1993,
    isFavorite: false,
  },
  'Actor~1': { id: '1', firstName: 'Harrison', lastName: 'Ford' },
  'Actor~2': { id: '2', firstName: 'Sean', lastName: 'Connery' },
  'Actor~3': { id: '3', firstName: 'Mark', lastName: 'Hamill' },
};
