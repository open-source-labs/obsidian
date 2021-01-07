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


// const queryStr = `
//   query AllMoviesAndGetActorById  {
//     movies {
//       __typename
//       id
//       title
//       actors {
//         __typename
//         id
//         firstName
//       }
//     }
//     actor(id: 1) {
//       __typename
//       id
//       firstName
//       LastName
//     }
//   }
// `;
// console.log(destructureQueries(queryStr));

// const ALL_ACTION_MOVIES_AND_ALL_ACTORS = `
//   query AllActionMoviesAndAllActors {
//     movies(input: { genre: ACTION }) {
//       __typename
//       id
//       title
//       genre
//       actors {
//         id
//         firstName
//         lastName
//       }
//     }
//     actors {
//       id
//       firstName
//       lastName
//       films {
//         __typename
//         id
//         title
//       }
//     }
//   }
//   }
// `;

// const result = destructureQueries(ALL_ACTION_MOVIES_AND_ALL_ACTORS);

// const testResult = {
//   queries: [
//     {
//       name: 'movies',
//       arguments: '(input:{genre:ACTION})',
//       fields: {
//         __typename: 'meta',
//         id: 'scalar',
//         title: 'scalar',
//         genre: 'scalar',
//         actors: { id: 'scalar', firstName: 'scalar', lastName: 'scalar' },
//       },
//     },
//     {
//       name: 'actors',
//       arguments: '',
//       fields: {
//         id: 'scalar',
//         firstName: 'scalar',
//         lastName: 'scalar',
//         films: {
//           __typename: 'meta',
//           id: 'scalar',
//           title: 'scalar',
//         },
//       },
//     },
//   ],
// };
// const mutation = `
// mutation DeleteMovie {
//   deleteMovie(id: 4) {
//     __typename
//     id
//   }
// }
// `;
// const mutationTestResult = {
//   mutations: [
//     {
//       name: 'deleteMovie',
//       arguments: '(id:4)',
//       fields: { __typename: 'meta', id: 'scalar' },
//     },
//   ],
// };
// const mutationResult = destructureQueries(mutation);
// console.log(
//   JSON.stringify(mutationTestResult) === JSON.stringify(mutationResult)
// ); //true
// console.log(JSON.stringify(testResult) === JSON.stringify(result)); // true