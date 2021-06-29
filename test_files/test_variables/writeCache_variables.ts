export const test = {
  queryStr: `
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
`,
  queryStrTwo: `
  query AllMoviesAndGetActorById  {
    movies {
      __typename
      id
      nickname
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
`,
  respObj: {
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
      actor: [
        {
          __typename: 'Actor',
          id: '1',
          firstName: 'Harrison',
          lastName: 'Ford',
        },
      ],
    },
  },
  toAddInCache: {
    ROOT_QUERY: {
      movies: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~4'],
      'actor(id:1)': ['Actor~1'],
    },
    'Movie~1': {
      id: '1',
      title: 'Indiana Jones and the Last Crusade',
      actors: ['Actor~1', 'Actor~2'],
    },
    'Actor~1': { id: '1', firstName: 'Harrison', lastName: 'Ford' },
    'Actor~2': { id: '2', firstName: 'Sean' },
    'Movie~2': {
      id: '2',
      title: 'Empire Strikes Back',
      actors: ['Actor~1', 'Actor~3'],
    },
    'Actor~3': { id: '3', firstName: 'Mark' },
    'Movie~3': { id: '3', title: 'Witness', actors: ['Actor~1', 'Actor~4'] },
    'Actor~4': { id: '4', firstName: 'Patti' },
    'Movie~4': {
      id: '4',
      title: 'Air Force One',
      actors: ['Actor~1', 'Actor~5'],
    },
    'Actor~5': { id: '5', firstName: 'Gary' },
  },
  expectedResultCache: {
    ROOT_QUERY: {
      movies: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~4'],
      'actor(id:1)': ['Actor~1'],
      'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~4'],
      actors: ['Actor~1', 'Actor~2', 'Actor~3', 'Actor~4', 'Actor~5'],
    },
    ROOT_MUTATION: {},
    'Movie~1': {
      id: '1',
      title: 'Indiana Jones and the Last Crusade',
      actors: ['Actor~1', 'Actor~2'],
      genre: 'ACTION',
      runtime: '12 minutes',
    },
    'Movie~4': {
      id: '4',
      title: 'Air Force One',
      actors: ['Actor~1', 'Actor~5'],
      genre: 'ACTION',
    },
    'Actor~1': { id: '1', firstName: 'Harrison', lastName: 'Ford' },
    'Actor~2': {
      id: '2',
      firstName: 'Sean',
      lastName: 'Connery',
      films: ['Movie~1'],
    },
    'Movie~2': {
      id: '2',
      title: 'Empire Strikes Back',
      actors: ['Actor~1', 'Actor~3'],
    },
    'Actor~3': { id: '3', firstName: 'Mark' },
    'Movie~3': { id: '3', title: 'Witness', actors: ['Actor~1', 'Actor~4'] },
    'Actor~4': { id: '4', firstName: 'Patti' },
    'Actor~5': { id: '5', firstName: 'Gary' },
  },
  originalCache: {
    ROOT_QUERY: {
      'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~4'],
      actors: ['Actor~1', 'Actor~2', 'Actor~3', 'Actor~4', 'Actor~5'],
    },
    ROOT_MUTATION: {},
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
  aliasQuery: `
    query twoHeros {
    jediHero: getHero(episode: "jedi") {
          __typename
          id
          name
   }
      empireHero: getHero(episode: "empire") {
          __typename
          id
          name
      }
    }
  `,
  aliasResponse: {
    data: {
      jediHero: {
        __typename: 'Hero',
        id: 2,
        name: 'R2-D2',
      },
      empireHero: {
        __typename: 'Hero',
        id: 1,
        name: 'Luke Skywalker',
      },
    },
  },
};
