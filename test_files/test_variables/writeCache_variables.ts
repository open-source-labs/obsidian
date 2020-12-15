export const test = {
  queryObj: {
    queries: [
      {
        name: 'movies',
        arguments: '',
        fields: {
          __typename: 'meta',
          id: 'scalar',
          title: 'scalar',
          actors: { __typename: 'meta', id: 'scalar', firstName: 'scalar' },
        },
      },
      {
        name: 'actor',
        arguments: '(id:1)',
        fields: {
          __typename: 'meta',
          id: 'scalar',
          firstName: 'scalar',
          LastName: 'scalar',
        },
      },
    ],
  },
  resultObj: {
    data: {
      movies: [
        {
          __typename: 'Movie',
          id: '1',
          title: 'Indiana Jones and the Last Crusade',
          actors: [
            { __typename: 'Actor', id: '1', firstName: 'Harrison' },
            { __typename: 'Actor', id: '2', firstName: 'Sean' },
          ],
        },
        {
          __typename: 'Movie',
          id: '2',
          title: 'Empire Strikes Back',
          actors: [
            { __typename: 'Actor', id: '1', firstName: 'Harrison' },
            { __typename: 'Actor', id: '3', firstName: 'Mark' },
          ],
        },
        {
          __typename: 'Movie',
          id: '3',
          title: 'Witness',
          actors: [
            { __typename: 'Actor', id: '1', firstName: 'Harrison' },
            { __typename: 'Actor', id: '4', firstName: 'Patti' },
          ],
        },
        {
          __typename: 'Movie',
          id: '4',
          title: 'Air Force One',
          actors: [
            { __typename: 'Actor', id: '1', firstName: 'Harrison' },
            { __typename: 'Actor', id: '5', firstName: 'Gary' },
          ],
        },
      ],
      actor: {
        __typename: 'Actor',
        id: '1',
        firstName: 'Harrison',
        lastName: 'Ford',
      },
    },
  },
  toAddInCache: {
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
  },
  expectedResultCache: {
    ROOT_QUERY: {
      'actor(id:1)': 'Actor~1',
      movies: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~4'],
      'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~4'],
      actors: ['Actor~1', 'Actor~2', 'Actor~3', 'Actor~4', 'Actor~5'],
    },
    'Movie~1': {
      id: '1',
      title: 'Indiana Jones and the Last Crusade',
      actors: ['Actor~1', 'Actor~2'],
      genre: 'ACTION',
      releaseYear: 1989,
      runtime: '12 minutes',
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
  },
  originalCache: {
    ROOT_QUERY: {
      'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~4'],
      actors: ['Actor~1', 'Actor~2', 'Actor~3', 'Actor~4', 'Actor~5'],
    },
    'Movie~1': {
      id: '1',
      title: 'Indiana Jones and the Last Crusade',
      actors: ['Actor~1', 'Actor~2'],
      genre: 'ACTION',
      runtime: '12 minutes',
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
  },
};
