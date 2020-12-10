// SCHEMA EXAMPLE =====================================================
// sample schema for examples

const typeDefs = gql`
  enum MovieGenre {
    ACTION
    SCIFI
    DRAMA
  }
  enum releaseYearOrder {
    LATESTFIRST
    EARLIESTFIRST
  }

  enum alphabeticalOrder {
    ASCENDING
    DESCENDING
  }

  type Movie {
    id: ID!
    title: String!
    releaseYear: Int!
    actors: [Actor]
    genre: MovieGenre!
    isFavorite: Boolean!
  }

  type Actor {
    id: ID!
    firstName: String!
    lastName: String!
    age: Int!
    films: [Movie]!
    isFavorite: Boolean!
  }

  input MovieInput {
    genre: MovieGenre
    order: releaseYearOrder
  }
  input ActorInput {
    orderFirstName: alphabeticalOrder
    orderLastName: alphabeticalOrder
  }
  input newMovieInput {
    title: String!
    releaseYear: Int!
    genre: MovieGenre!
  }

  type Query {
    movie(id: ID!): Movie!
    movies(input: MovieInput): [Movie]!
    actor(id: ID!): Actor!
    actors(input: ActorInput): [Actor]!
  }

  type Mutation {
    addMovie(input: NewMovieInput): Movie!
    favoriteMovie(id: ID!): Movie!
    favoriteActor(id: ID!): Actor!
  }
`;

// QUERY EXAMPLES =================================================================

// EXAMPLE 1
// ================================================================================
// sample query to show how the cachee stores basic queries

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
    movies: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~4'],
  },
  'Movie~1': {
    id: '1',
    title: 'Indiana Jones and the Last Crusade',
    actors: ['Actor~1', 'Actor~2'],
  },
  'Movie~2': {
    id: '2',
    title: 'Empire Strikes Back',
    actors: ['Actor~1', 'Actor~3'],
  },
  'Movie~3': { id: '3', title: 'Witness', actors: ['Actor~1', 'Actor~4'] },
  'Movie~4': {
    id: '4',
    title: 'Air Force One',
    actors: ['Actor~1', 'Actor~5'],
  },
  'Actor~1': { id: '1', firstName: 'Harrison' },
  'Actor~2': { id: '2', firstName: 'Sean' },
  'Actor~3': { id: '3', firstName: 'Mark' },
  'Actor~4': { id: '4', firstName: 'Patti' },
  'Actor~5': { id: '4', firstName: 'Gary' },
};

// EXAMPLE 2
// ================================================================================
// sample query to show how the cache stores queries with arguments

const ALL_ACTION_MOVIES = gql`
  query AllActionMovies {
    movies(input: { genre: ACTION }) {
      id
      title
      genre
      releaseYear
    }
  }
`;

const respAllActionMovies = {
  data: {
    movies: [
      {
        id: '1',
        title: 'Indiana Jones and the Last Crusade',
        genre: 'ACTION',
        releaseYear: 1989,
      },
      {
        id: '4',
        title: 'Air Force One',
        genre: 'ACTION',
        releaseYear: 1997,
      },
    ],
  },
};

const cache2 = {
  ROOT_QUERY: {
    movies: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~4'],
    'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~4'], // Added
  },
  'Movie~1': {
    id: '1',
    title: 'Indiana Jones and the Last Crusade',
    actors: ['Actor~1', 'Actor~2'],
    genre: 'ACTION', // Added
    releaseYear: 1989, // Added
  },
  'Movie~2': {
    id: '2',
    title: 'Empire Strikes Back',
    actors: ['Actor~1', 'Actor~3'],
  },
  'Movie~3': { id: '3', title: 'Witness', actors: ['Actor~1', 'Actor~4'] },
  'Movie~4': {
    id: '4',
    title: 'Air Force One',
    actors: ['Actor~1', 'Actor~5'],
    genre: 'ACTION', // Added
    releaseYear: 1997, // Added
  },
  'Actor~1': { id: '1', firstName: 'Harrison' },
  'Actor~2': { id: '2', firstName: 'Sean' },
  'Actor~3': { id: '3', firstName: 'Mark' },
  'Actor~4': { id: '4', firstName: 'Patti' },
  'Actor~5': { id: '5', firstName: 'Gary' },
};

// EXAMPLE 3
// ================================================================================
// Another sample query to show how the cacbe stores queries with arguments and preserves order of response data

const ALL_MOVIES_CHRONOLOGICAL = gql`
  query AllMoviesChronological {
    movies(input: { order: EARLIESTFIRST }) {
      id
      title
      releaseYear
    }
  }
`;

const respAllMoviesChronological = {
  data: {
    movies: [
      {
        id: '2',
        title: 'Empire Strikes Back',
        releaseYear: 1980,
      },
      {
        id: '3',
        title: 'Witness',
        releaseYear: 1985,
      },
      {
        id: '1',
        title: 'Indiana Jones and the Last Crusade',
        releaseYear: 1989,
      },
      {
        id: '4',
        title: 'Air Force One',
        releaseYear: 1997,
      },
    ],
  },
};

const cache3 = {
  ROOT_QUERY: {
    movies: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~4'],
    'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~4'],
    // added
    'movies(input:{order:EARLIESTFIRST})': [
      'Movie~2',
      'Movie~3',
      'Movie~1',
      'Movie~4',
    ],
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
    releaseYear: 1980, // added
  },
  'Movie~3': {
    id: '3',
    title: 'Witness',
    actors: ['Actor~1', 'Actor~4'],
    releaseYear: 1985, // added
  },
  'Movie~4': {
    id: '4',
    title: 'Air Force One',
    actors: ['Actor~1', 'Actor~5'],
    genre: 'ACTION',
    releaseYear: 1997,
  },
  'Actor~1': { id: '1', firstName: 'Harrison' },
  'Actor~2': { id: '2', firstName: 'Sean' },
  'Actor~3': { id: '3', firstName: 'Mark' },
  'Actor~4': { id: '4', firstName: 'Patti' },
  'Actor~5': { id: '5', firstName: 'Gary' },
};

// EXAMPLE 4
// ================================================================================
// Another sample query to show how the cacbe stores queries with arguments and preserves order of response data

const ALL_ACTORS_ALPHABETICAL_LAST_NAME = gql`
  query AllActorsAlphabeticalLastName {
    actors(input: { orderLastName: DESCENDING }) {
      id
      firstName
      LastName
    }
  }
`;

const respAllActorsAlphabeticalLastName = {
  data: {
    actors: [
      {
        id: '2',
        firstName: 'Sean',
        lastName: 'Connery',
      },
      {
        id: '1',
        firstName: 'Harrion',
        lastName: 'Ford',
      },
      {
        id: '3',
        firstName: 'Mark',
        lastName: 'Hamill',
      },
      {
        id: '4',
        firstName: 'Patti',
        lastName: 'LuPone',
      },
      {
        id: '5',
        firstName: 'Gary',
        lastName: 'Oldman',
      },
    ],
  },
};

const cache4 = {
  ROOT_QUERY: {
    movies: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~4'],
    'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~4'],
    'movies(input:{order:EARLIESTFIRST})': [
      'Movie~2',
      'Movie~3',
      'Movie~1',
      'Movie~4',
    ],
    // added
    'actors(input:{ orderLastName:DESCENDING})': [
      'Actor~2',
      'Actor~1',
      'Actor~3',
      'Actor~4',
      'Actor~5',
    ],
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
  'Actor~1': { id: '1', firstName: 'Harrison', lastName: 'Ford' }, //added lastName to actors
  'Actor~2': { id: '2', firstName: 'Sean', lastName: 'Connery' },
  'Actor~3': { id: '3', firstName: 'Mark', lastName: 'Hamill' },
  'Actor~4': { id: '4', firstName: 'Patti', lastName: 'LuPone' },
  'Actor~5': { id: '5', firstName: 'Gary', lastName: 'Oldman' },
};

// EXAMPLE 5
// ================================================================================
// A sample query by id that we might want to create soecial logic for to save network requests

const GET_ACTOR_BY_ID = gql`
  query getActorById {
    actor(id: 1) {
      id
      firstName
      LastName
    }
  }
`;

const respGetActorById = {
  data: {
    actor: [
      {
        id: '1',
        firstName: 'Harrion',
        lastName: 'Ford',
      },
    ],
  },
};

// is there any way to stop this request from going  to the server and just serve from the cache if we have all the information???
// do we ant to hard code specialized check for arguments that are just a single id????

const cache5 = {
  ROOT_QUERY: {
    'actor(id:1)': 'Actor~1', // Added  CAN WE STOP IT?
    movies: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~4'],
    'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~4'],
    'movies(input:{order:EARLIESTFIRST})': [
      'Movie~2',
      'Movie~3',
      'Movie~1',
      'Movie~4',
    ],
    'actors(input:{ orderLastName:DESCENDING})': [
      'Actor~2',
      'Actor~1',
      'Actor~3',
      'Actor~4',
      'Actor~5',
    ],
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
  'Actor~1': { id: '1', firstName: 'Harrison', lastName: 'Ford' },
  'Actor~2': { id: '2', firstName: 'Sean', lastName: 'Connery' },
  'Actor~3': { id: '3', firstName: 'Mark', lastName: 'Hamill' },
  'Actor~4': { id: '4', firstName: 'Patti', lastName: 'LuPone' },
  'Actor~5': { id: '5', firstName: 'Gary', lastName: 'Oldman' },
};

// EXAMPLE 6
// ================================================================================
// The following queries should be able to be served from the cache without making a network request

const ALL_MOVIES_WITH_RELEASE_YEAR = gql`
  query AllMoviesWithReleaseYear {
    movies {
      id
      title
      releaseYear
    }
  }
`;

const ALL_MOVIES_WITH_ACTOR_LAST_NAMES = gql`
  query AllMoviesWithActorLastNames {
    movies {
      id
      title
      actors {
        id
        lastName
      }
    }
  }
`;

// MUTATIONS

// EXAMPLE 7
// ================================================================================
// simple update example the cache would automatically update

const ADD_FAVORITE_MOVIE = gql`
  mutation AddFavoriteMovie {
    favoriteMovie(id: 2) {
      id
      isFavorite
    }
  }
`;

const respAddFavoriteMovie = {
  data: {
    favoriteMovie: [
      {
        id: '2',
        isFavorite: true,
      },
    ],
  },
};

const cache6 = {
  ROOT_QUERY: {
    'actor(id:1)': 'Actor~1',
    movies: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~4'],
    'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~4'],
    'movies(input:{order:EARLIESTFIRST})': [
      'Movie~2',
      'Movie~3',
      'Movie~1',
      'Movie~4',
    ],
    'actors(input:{ orderLastName:DESCENDING})': [
      'Actor~2',
      'Actor~1',
      'Actor~3',
      'Actor~4',
      'Actor~5',
    ],
  },
  ROOT_MUTATION: {
    'favoriteMovie(id:2)': 'Movie~2', // Added
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
    isFavorite: true, // Added
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
  'Actor~1': { id: '1', firstName: 'Harrison', lastName: 'Ford' },
  'Actor~2': { id: '2', firstName: 'Sean', lastName: 'Connery' },
  'Actor~3': { id: '3', firstName: 'Mark', lastName: 'Hamill' },
  'Actor~4': { id: '4', firstName: 'Patti', lastName: 'LuPone' },
  'Actor~5': { id: '5', firstName: 'Gary', lastName: 'Oldman' },
};

// EXAMPLE 8
// ================================================================================
// add movie mutation example: the returned data would automically be cached.
// but the developer would have to assist in adding the movie  to the appropriate spot in the root queries.

const ADD_MOVIE = gql`
  mutation AddMovie {
    addMovie(input: {title: 'The Fugitive', releaseYear: 1993, genre: ACTION }) {
      id
      title
      releaseYear
      genre
      isFavorite
    }
  }
`;

const respAddMovie = {
  data: {
    addMovie: [
      {
        id: '5',
        title: 'The Fugitive',
        releaseYear: 1993,
        genre: 'ACTION',
        isFavorite: false,
      },
    ],
  },
};

const cache7 = {
  ROOT_QUERY: {
    'actor(id:1)': 'Actor~1',
    movies: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~4', 'Movie~5'], // Added added new movie with help from developer
    'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~4', 'Movie~5'], // Added added new movie with help from developer
    // Added new movie with help from developer
    'movies(input:{order:EARLIESTFIRST})': [
      'Movie~2',
      'Movie~3',
      'Movie~1',
      'Movie~5',
      'Movie~4',
    ],
    'actors(input:{ orderLastName:DESCENDING})': [
      'Actor~2',
      'Actor~1',
      'Actor~3',
      'Actor~4',
      'Actor~5',
    ],
  },
  ROOT_MUTATION: {
    'favoriteMovie(id:2)': 'Movie~2',
    "addMovie(input: {title: 'The Fugitive', releaseYear: 1993, genre: ACTION })":
      'Movie~5',
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
  // Added
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
  'Actor~4': { id: '4', firstName: 'Patti', lastName: 'LuPone' },
  'Actor~5': { id: '5', firstName: 'Gary', lastName: 'Oldman' },
};
