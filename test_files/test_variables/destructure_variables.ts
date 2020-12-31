export const test = {
  ALL_ACTION_MOVIES: `
  query AllActionMovies {
    movies(input: { genre: ACTION }) {
      __typename
      id
      title
      genre
      actors {
        id
        firstName
        lastName
      }
    }
  }`,

  allActionTestResult: {
    queries: [
      {
        name: 'movies',
        arguments: '(input:{genre:ACTION})',
        fields: {
          __typename: 'meta',
          id: 'scalar',
          title: 'scalar',
          genre: 'scalar',
          actors: {
            id: 'scalar',
            firstName: 'scalar',
            lastName: 'scalar',
          },
        },
      },
    ],
  },

  ALL_ACTORS: `
    query AllActors {
      actors {
        id
        firstName
        lastName
        films {
          __typename
          id
          title
        }
      }
    }
    }
      `,

  allActorsTestResult: {
    queries: [
      {
        name: 'actors',
        arguments: '',
        fields: {
          id: 'scalar',
          firstName: 'scalar',
          lastName: 'scalar',
          films: {
            __typename: 'meta',
            id: 'scalar',
            title: 'scalar',
          },
        },
      },
    ],
  },

  ALL_ACTION_MOVIES_AND_ALL_ACTORS: `
  query AllActionMoviesAndAllActors {
    movies(input: { genre: ACTION }) {
      __typename
      id
      title
      genre
      actors {
        id
        firstName
        lastName
      }
    }
    actors {
      id
      firstName
      lastName
      films {
        __typename
        id
        title
      }
    }
  }
  }
    `,

  allActionActorsTestResult: {
    queries: [
      {
        name: 'movies',
        arguments: '(input:{genre:ACTION})',
        fields: {
          __typename: 'meta',
          id: 'scalar',
          title: 'scalar',
          genre: 'scalar',
          actors: {
            id: 'scalar',
            firstName: 'scalar',
            lastName: 'scalar',
          },
        },
      },
      {
        name: 'actors',
        arguments: '',
        fields: {
          id: 'scalar',
          firstName: 'scalar',
          lastName: 'scalar',
          films: {
            __typename: 'meta',
            id: 'scalar',
            title: 'scalar',
          },
        },
      },
    ],
  },

  findQueryStringsTestData: `{
    actors {
      id
      firstName
      lastName
      films {
        __typename
        id
        title
      }
    }
    }`,

  findQueryStringsResultData: [
    `actors {
      id
      firstName
      lastName
      films {
        __typename
        id
        title
      }
    }`,
  ],

  createQueriesObjTestData: [
    `actors {
    id
    firstName
    lastName
    films {
      __typename
      id
      title
    }
  }`,
  ],

  createQueriesObjResultsData: {
    queries: [
      {
        name: 'actors',
        arguments: '',
        fields: {
          id: 'scalar',
          firstName: 'scalar',
          lastName: 'scalar',
          films: {
            __typename: 'meta',
            id: 'scalar',
            title: 'scalar',
          },
        },
      },
    ],
  },

  findQueryFieldsTestData: `{
    id
    firstName
    lastName
    films {
      __typename
      id
      title
    }
  }`,

  findQueryFieldsResultData: {
    id: 'scalar',
    firstName: 'scalar',
    lastName: 'scalar',
    films: { __typename: 'meta', id: 'scalar', title: 'scalar' },
  },

  findClosingBraceTestData: `{
    id
    firstName
    lastName
    films {
      __typename
      id
      title
    }
  }`,

  findClosingBraceResultData: 90,
};
