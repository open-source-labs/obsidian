const queryObject = {
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
};

const resultObject = {
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
            title: 'Indian Jones and the Last Crusade',
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
};
