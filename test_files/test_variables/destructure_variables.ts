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

  findTwoActorsAlias: `
  query TwoActors {
    harrisonActor: actors(id: 00) {
            firstName
        lastName
        films {
          __typename
          id
          title
        }
    }
    hammelActor: actors(id: 01) {
            firstName
        lastName
        films {
          __typename
          id
          title
        }
    }
  }
  `,
  findTwoActorsAliasTestResult: {
    queries: [
      {
        name: "actors",
        alias: "harrisonActor",
        arguments: "(id:00)",
        fields: { firstName: "scalar", lastName: "scalar", films: { __typename: 'meta', id: 'scalar', title: 'scalar' } }
      },
      {
        name: "actors",
        alias: "hammelActor",
        arguments: "(id:01)",
        fields: { firstName: "scalar", lastName: "scalar", films: { __typename: 'meta', id: 'scalar', title: 'scalar' } }
      }
    ]
  },

  newAliasTestQuery: `
  query twoHeros {
    empireHero: hero(episode: EMPIRE) {
      name
    }
    jediHero: hero(episode: JEDI) {
      name
    }
  }`,

  newAliasTestResult:{
    queries: [
      {
        name: "hero",
        alias: "empireHero",
        arguments: "(episode:EMPIRE)",
        fields: { name: "scalar" }
      },
      {
        name: "hero",
        alias: "jediHero",
        arguments: "(episode:JEDI)",
        fields: { name: "scalar" }
      }
    ]
  }
};
