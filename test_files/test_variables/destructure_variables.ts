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
        lastName`,

  findTwoActorsAliasTestResult: {
    queries: [
      {
        name: 'actors',
        alias: 'harrisonActor',
        arguments: '(id:00)',
        fields: {
          firstName: 'scalar',
          lastName: 'scalar',
          films: { __typename: 'meta', id: 'scalar', title: 'scalar' },
        },
      },
      {
        name: 'actors',
        alias: 'hammelActor',
        arguments: '(id:01)',
        fields: {
          firstName: 'scalar',
          lastName: 'scalar',
          films: { __typename: 'meta', id: 'scalar', title: 'scalar' },
        },
      },
    ],
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

  newAliasTestResult: {
    queries: [
      {
        name: 'hero',
        alias: 'empireHero',
        arguments: '(episode:EMPIRE)',
        fields: { name: 'scalar' },
      },
      {
        name: 'hero',
        alias: 'jediHero',
        arguments: '(episode:JEDI)',
        fields: { name: 'scalar' },
      },
    ],
  },

  fragmentTestData: `query {
          movies(input: { genre: ACTION }) {
            __typename
            id
          ...titleAndGenre
         }
            actors {
              id
              films {
                __typename
                id
                title
              }   
          ...firstAndLast
         }
        }
        fragment titleAndGenre on Movie {
          title
          genre
        }
        fragment firstAndLast on Actors {
          firstName
          lastName
        }`,

  fragmentResultData: {
    queries: [
      {
        name: 'movies',
        arguments: '(input:{genre:ACTION})',
        fields: {
          __typename: 'meta',
          id: 'scalar',
          title: 'scalar',
          genre: 'scalar',
        },
      },
      {
        name: 'actors',
        arguments: '',
        fields: {
          id: 'scalar',
          films: { __typename: 'meta', id: 'scalar', title: 'scalar' },
          firstName: 'scalar',
          lastName: 'scalar',
        },
      },
    ],
  },

  fragmentTestData2: `query {
    movies(input: { genre: ACTION }) {
      __typename
      id
      actors {
        id
        films {
          __typename
          id
          title
        }   
    ...firstAndLast
   }
    ...titleAndGenre
   }
      
  }
  fragment titleAndGenre on Movie {
    title
    genre
  }
  fragment firstAndLast on Actors {
    firstName
    lastName
  }`,

  fragmentResultData2: {
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
            films: { __typename: 'meta', id: 'scalar', title: 'scalar' },
            firstName: 'scalar',
            lastName: 'scalar',
          },
        },
      },
    ],
  },

  fragmentTestData3: `
  query AllActionMovies {
    movies(input: { genre: ACTION }) {
      __typename
      id
      ...titleAndGenre
      actors {
        id
        ...firstAndLast
      }
    }  
  }
  fragment titleAndGenre on Movie {
    title
    genre
  }
  fragment firstAndLast on Actors {
    firstName
    lastName
  }`,

  fragmentResultData3: {
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

  singleVariableTestData: `
  query AllActionMoviesAndAllActors ($movieGenre: String) {
    movies(genre: $movieGenre) {
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

  singleVariableTestResult: {
    queries: [
      {
        name: 'movies',
        arguments: '(genre:ACTION)',
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

  singleVariableTestValue: {
    movieGenre: 'ACTION',
  },

  multiVariableTestData: `
  query AllActionMoviesAndAllActors ($movieGenre: String, $actorID: ID) {
    movies(genre: $movieGenre) {
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
    actors (actor: $actorID) {
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

  multiVariableTestResult: {
    queries: [
      {
        name: 'movies',
        arguments: '(genre:ACTION)',
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
        arguments: '(actor:1)',
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

  multiVariableTestValue: {
    movieGenre: 'ACTION',
    actorID: '1',
  },

  includeDirectiveTestData: `query AllActionMoviesAndAllActors ($movieGenre: String, $withActors: Boolean!) {
    movies(genre: $movieGenre) {
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
    actors @include (if: $withActors) {
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

  includeDirectiveFalseResult: {
    queries: [
      {
        name: 'movies',
        arguments: '(genre:ACTION)',
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

  includeDirectiveFalseValues: {
    movieGenre: 'ACTION',
    withActors: false,
  },

  includeDirectiveTrueResult: {
    queries: [
      {
        name: 'movies',
        arguments: '(genre:ACTION)',
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

  includeDirectiveTrueValues: {
    movieGenre: 'ACTION',
    withActors: true,
  },

  skipDirectiveTestData: `query AllActionMoviesAndAllActors ($movieGenre: String, $withActors: Boolean!) {
  movies(genre: $movieGenre) {
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
  actors @skip (if: $withActors) {
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

  skipDirectiveTrueResult: {
    queries: [
      {
        name: 'movies',
        arguments: '(genre:ACTION)',
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

  skipDirectiveTrueValues: {
    movieGenre: 'ACTION',
    withActors: true,
  },

  skipDirectiveFalseResult: {
    queries: [
      {
        name: 'movies',
        arguments: '(genre:ACTION)',
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

  skipDirectiveFalseValues: {
    movieGenre: 'ACTION',
    withActors: false,
  },
};
