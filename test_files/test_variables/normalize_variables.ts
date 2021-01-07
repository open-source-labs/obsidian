export const test = {
  queryObject1: {
    queries: [
      {
        __typename: 'meta',
        name: 'movies',
        arguments: '(input:{genre:ACTION})',
        fields: {
          __typename: 'meta',
          id: 'scalar',
          title: 'scalar',
          genre: 'scalar',
          actors: { id: 'scalar', firstName: 'scalar', lastName: 'scalar' },
        },
      },
      {
        __typename: 'meta',
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

  resultObject1: {
    data: {
      movies: [
        {
          __typename: 'Movie',
          id: '1',
          title: 'Indiana Jones and the Last Crusade',
          genre: 'ACTION',
          actors: [
            {
              __typename: 'Actor',
              id: '1',
              firstName: 'Harrison',
              lastName: 'Ford',
            },
            {
              __typename: 'Actor',
              id: '2',
              firstName: 'Sean',
              lastName: 'Connery',
            },
          ],
        },
        {
          __typename: 'Movie',
          id: '4',
          title: 'Air Force One',
          genre: 'ACTION',
          actors: [
            {
              __typename: 'Actor',
              id: '1',
              firstName: 'Harrison',
              lastName: 'Ford',
            },
            {
              __typename: 'Actor',
              id: '5',
              firstName: 'Gary',
              lastName: 'Oldman',
            },
          ],
        },
      ],
      actors: [
        {
          __typename: 'Actor',
          id: '1',
          firstName: 'Harrison',
          lastName: 'Ford',
          films: [
            {
              __typename: 'Movie',
              id: '1',
              title: 'Indiana Jones and the Last Crusade',
            },
            {
              __typename: 'Movie',
              id: '2',
              title: 'Empire Strikes Back',
            },
            {
              __typename: 'Movie',
              id: '3',
              title: 'Witness',
            },
            {
              __typename: 'Movie',
              id: '4',
              title: 'Air Force One',
            },
          ],
        },
        {
          __typename: 'Actor',
          id: '2',
          firstName: 'Sean',
          lastName: 'Connery',
          films: [
            {
              __typename: 'Movie',
              id: '1',
              title: 'Indiana Jones and the Last Crusade',
            },
          ],
        },
        {
          __typename: 'Actor',
          id: '3',
          firstName: 'Mark',
          lastName: 'Hamill',
          films: [
            {
              __typename: 'Movie',
              id: '2',
              title: 'Empire Strikes Back',
            },
          ],
        },
        {
          __typename: 'Actor',
          id: '4',
          firstName: 'Patti',
          lastName: 'LuPone',
          films: [
            {
              __typename: 'Movie',
              id: '3',
              title: 'Witness',
            },
          ],
        },
        {
          __typename: 'Actor',
          id: '5',
          firstName: 'Gary',
          lastName: 'Oldman',
          films: [
            {
              __typename: 'Movie',
              id: '4',
              title: 'Air Force One',
            },
          ],
        },
      ],
    },
  },
  resultObj1: {
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
  hashInput1: {
    __typename: 'Movie',
    id: '1',
    title: 'Indiana Jones and the Last Crusade',
    genre: 'ACTION',
    actors: [
      {
        __typename: 'Actor',
        id: '1',
        firstName: 'Harrison',
        lastName: 'Ford',
        friends: [
          {
            __typename: 'Actor',
            id: '6',
            firstName: 'Fred',
            favHobby: 'sleeping',
          },
          {
            __typename: 'Actor',
            id: '7',
            firstName: 'Gary',
            favHobby: 'climbing',
          },
          {
            __typename: 'Actor',
            id: '2',
            firstName: 'Sean',
            favHobby: 'fishing',
          },
        ],
      },
      {
        __typename: 'Actor',
        id: '2',
        firstName: 'Sean',
        lastName: 'Connery',
        friends: [],
      },
    ],
  },
  queryInput1: {
    queries: {
      __typename: 'meta',
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
          friends: { id: 'scalar', firstName: 'scalar', favHobby: 'scalar' },
        },
      },
    },
  },
  resultInput1: {
    'Movie~1': {
      id: '1',
      title: 'Indiana Jones and the Last Crusade',
      genre: 'ACTION',
      actors: ['Actor~1', 'Actor~2'],
    },
    'Actor~1': {
      id: '1',
      firstName: 'Harrison',
      lastName: 'Ford',
      friends: ['Actor~6', 'Actor~7', 'Actor~2'],
    },
    'Actor~2': {
      id: '2',
      firstName: 'Sean',
      lastName: 'Connery',
      favHobby: 'fishing',
      friends: [],
    },
    'Actor~6': {
      id: '6',
      firstName: 'Fred',
      favHobby: 'sleeping',
    },
    'Actor~7': {
      id: '7',
      firstName: 'Gary',
      favHobby: 'climbing',
    },
  },
};


// const queryObj = {
//   queries: [
//     { name: 'movies', arguments: '', fields: [Object] },
//     { name: 'actor', arguments: '(id:1)', fields: [Object] },
//   ],
// };

// const resultObj = {
//   data: {
//     movies: [
//       {
//         __typename: 'Movie',
//         id: '1',
//         title: 'Indiana Jones and the Last Crusade',
//         actors: [
//           { __typename: 'Actor', id: '1', firstName: 'Harrison' },
//           { __typename: 'Actor', id: '2', firstName: 'Sean' },
//         ],
//       },
//       {
//         __typename: 'Movie',
//         id: '2',
//         title: 'Empire Strikes Back',
//         actors: [
//           { __typename: 'Actor', id: '1', firstName: 'Harrison' },
//           { __typename: 'Actor', id: '3', firstName: 'Mark' },
//         ],
//       },
//       {
//         __typename: 'Movie',
//         id: '3',
//         title: 'Witness',
//         actors: [
//           { __typename: 'Actor', id: '1', firstName: 'Harrison' },
//           { __typename: 'Actor', id: '4', firstName: 'Patti' },
//         ],
//       },
//       {
//         __typename: 'Movie',
//         id: '4',
//         title: 'Air Force One',
//         actors: [
//           { __typename: 'Actor', id: '1', firstName: 'Harrison' },
//           { __typename: 'Actor', id: '5', firstName: 'Gary' },
//         ],
//       },
//     ],
//     actor: [
//       {
//         __typename: 'Actor',
//         id: '1',
//         firstName: 'Harrison',
//         lastName: 'Ford',
//       },
//     ],
//   },
// };
// console.log(normalizeResult(queryObj, resultObj));

// const queryObjTest = {
//   queries: [
//     {
//       name: 'getMovie',
//       arguments: '',
//       fields: {
//         __typename: 'meta',
//         id: 'scalar',
//         title: 'scalar',
//         releaseYear: 'scalar',
//       },
//     },
//   ],
// };

// const respObjTest = {
//   data: {
//     getMovie: {
//       __typename: 'Movie',
//       id: '1',
//       title: 'Up',
//       releaseYear: 2009,
//     },
//   },
// };

// console.log(normalizeResult(queryObjTest, respObjTest, false));

// const mutationTestResult = {
//   mutations: [
//     {
//       name: 'deleteMovie',
//       arguments: '(id:4)',
//       fields: {
//         __typename: 'meta',
//         id: 'scalar',
//       },
//     },
//   ],
// };

// const respObj = {
//   data: {
//     deleteMovie: {
//       __typename: 'Movie',
//       id: '4',
//     },
//   },
// };

// const cachePostMut = {
//   ROOT_MUTATION: {
//     'deleteMovie(id:4)': 'Movie~4',
//   },
//   'Movie~4': 'DELETED',
// };

// console.log(normalizeResult(mutationTestResult, respObj, true));
// // //==============================================================================

// const queryObject1 = {
//   queries: [
//     {
//       __typename: 'meta',
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
//       __typename: 'meta',
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

// const resultObject1 = {
//   data: {
//     movies: [
//       {
//         __typename: 'Movie',
//         id: '1',
//         title: 'Indiana Jones and the Last Crusade',
//         genre: 'ACTION',
//         actors: [
//           {
//             __typename: 'Actor',
//             id: '1',
//             firstName: 'Harrison',
//             lastName: 'Ford',
//           },
//           {
//             __typename: 'Actor',
//             id: '2',
//             firstName: 'Sean',
//             lastName: 'Connery',
//           },
//         ],
//       },
//       {
//         __typename: 'Movie',
//         id: '4',
//         title: 'Air Force One',
//         genre: 'ACTION',
//         actors: [
//           {
//             __typename: 'Actor',
//             id: '1',
//             firstName: 'Harrison',
//             lastName: 'Ford',
//           },
//           {
//             __typename: 'Actor',
//             id: '5',
//             firstName: 'Gary',
//             lastName: 'Oldman',
//           },
//         ],
//       },
//     ],
//     actors: [
//       {
//         __typename: 'Actor',
//         id: '1',
//         firstName: 'Harrison',
//         lastName: 'Ford',
//         films: [
//           {
//             __typename: 'Movie',
//             id: '1',
//             title: 'Indiana Jones and the Last Crusade',
//           },
//           {
//             __typename: 'Movie',
//             id: '2',
//             title: 'Empire Strikes Back',
//           },
//           {
//             __typename: 'Movie',
//             id: '3',
//             title: 'Witness',
//           },
//           {
//             __typename: 'Movie',
//             id: '4',
//             title: 'Air Force One',
//           },
//         ],
//       },
//       {
//         __typename: 'Actor',
//         id: '2',
//         firstName: 'Sean',
//         lastName: 'Connery',
//         films: [
//           {
//             __typename: 'Movie',
//             id: '1',
//             title: 'Indiana Jones and the Last Crusade',
//           },
//         ],
//       },
//       {
//         __typename: 'Actor',
//         id: '3',
//         firstName: 'Mark',
//         lastName: 'Hamill',
//         films: [
//           {
//             __typename: 'Movie',
//             id: '2',
//             title: 'Empire Strikes Back',
//           },
//         ],
//       },
//       {
//         __typename: 'Actor',
//         id: '4',
//         firstName: 'Patti',
//         lastName: 'LuPone',
//         films: [
//           {
//             __typename: 'Movie',
//             id: '3',
//             title: 'Witness',
//           },
//         ],
//       },
//       {
//         __typename: 'Actor',
//         id: '5',
//         firstName: 'Gary',
//         lastName: 'Oldman',
//         films: [
//           {
//             __typename: 'Movie',
//             id: '4',
//             title: 'Air Force One',
//           },
//         ],
//       },
//     ],
//   },
// };

// const resultObj1 = {
//   ROOT_QUERY: {
//     'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~4'],
//     actors: ['Actor~1', 'Actor~2', 'Actor~3', 'Actor~4', 'Actor~5'],
//   },
//   'Movie~1': {
//     id: '1',
//     title: 'Indiana Jones and the Last Crusade',
//     actors: ['Actor~1', 'Actor~2'],
//     genre: 'ACTION',
//   },
//   'Movie~2': {
//     id: '2',
//     title: 'Empire Strikes Back',
//   },
//   'Movie~3': {
//     id: '3',
//     title: 'Witness',
//   },
//   'Movie~4': {
//     id: '4',
//     title: 'Air Force One',
//     genre: 'ACTION',
//     actors: ['Actor~1', 'Actor~5'],
//   },
//   'Actor~1': {
//     id: '1',
//     firstName: 'Harrison',
//     lastName: 'Ford',
//     films: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~4'],
//   },
//   'Actor~2': {
//     id: '2',
//     firstName: 'Sean',
//     lastName: 'Connery',
//     films: ['Movie~1'],
//   },
//   'Actor~3': {
//     id: '3',
//     firstName: 'Mark',
//     lastName: 'Hamill',
//     films: ['Movie~2'],
//   },
//   'Actor~4': {
//     id: '4',
//     firstName: 'Patti',
//     lastName: 'LuPone',
//     films: ['Movie~3'],
//   },
//   'Actor~5': {
//     id: '5',
//     firstName: 'Gary',
//     lastName: 'Oldman',
//     films: ['Movie~4'],
//   },
// };

// console.log(normalizeResult(queryObject1, resultObject1, false));

// // //===============================================================================

// const queryObj3 = {
//   mutations: [
//     {
//       name: 'addFavoriteMovie',
//       arguments: '(id:4)',
//       fields: {
//         __typename: 'meta',
//         id: 'scalar',
//         isFavorite: 'scalar',
//       },
//     },
//   ],
// };

// const responseObj3 = {
//   data: {
//     addFavoriteMovie: {
//       __typename: 'Movie',
//       id: '4',
//       isFavorite: true,
//     },
//   },
// };

// const outputObj = {
//   ROOT_MUTATION: {
//     'addFavoriteMovie(id:4)': 'Movie~4',
//   },
//   'Movie~4': {
//     id: '4',
//     isFavorite: true,
//   },
// };

// console.log(normalizeResult(queryObj3, responseObj3, false));
