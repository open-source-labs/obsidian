export const test: { [index: string]: any } = {
  nestedObj: {
    queryStr: `query movie { 
      Movie(id:1) {
      __typename
      id
      title
      actors {
        __typename
        id
        firstName
        lastName
      }
    }}`,
    rootQuery: { 'Movie(id:1)': ['Movie~1'] },
    expectedCache: {
      'Movie~1': {
        title: 'Indiana Jones and the Last Crusade',
        id: '1',
        actors: ['Actor~1', 'Actor~2'],
      },
      'Actor~1': {
        id: '1',
        firstName: 'Harrison',
        lastName: 'Ford',
      },
      'Actor~2': {
        id: '2',
        firstName: 'Sean',
        lastName: 'Connery',
      },
    },
    respObj: {
      data: {
        Movie: [
          {
            __typename: 'Movie',
            id: '1',
            title: 'Indiana Jones and the Last Crusade',
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
        ],
      },
    },
  },
  LFUObj: {
    queryStr1: `{
      Actors(movieID:1) { 
        __typename
        id
        firstName
        lastName
    }}`,
    queryStr2: `{
      Actors(movieID:2) { 
      __typename
      id
      firstName
      lastName
  }}`,
    respObj1: {
      data: {
        Actors: [
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
          {
            __typename: 'Actor',
            id: '3',
            firstName: 'Nhan',
            lastName: 'Ly',
          },
          {
            __typename: 'Actor',
            id: '4',
            firstName: 'Mark',
            lastName: 'Hammill',
          },
          {
            __typename: 'Actor',
            id: '5',
            firstName: 'Christy',
            lastName: 'Gomez',
          },
        ],
      },
    },
    respObj2: {
      data: {
        Actors: [
          {
            __typename: 'Actor',
            id: '6',
            firstName: 'James Earl',
            lastName: 'Jones',
          },
        ],
      },
    },
    expectedCache1: {
      'Actor~1': {
        id: '1',
        firstName: 'Harrison',
        lastName: 'Ford',
      },
      'Actor~2': {
        id: '2',
        firstName: 'Sean',
        lastName: 'Connery',
      },
      'Actor~3': {
        id: '3',
        firstName: 'Nhan',
        lastName: 'Ly',
      },
      'Actor~4': {
        id: '4',
        firstName: 'Mark',
        lastName: 'Hammill',
      },
      'Actor~5': {
        id: '5',
        firstName: 'Christy',
        lastName: 'Gomez',
      },
    },
    expectedCache2: {
      'Actor~6': {
        id: '6',
        firstName: 'James Earl',
        lastName: 'Jones',
      },
      'Actor~2': {
        id: '2',
        firstName: 'Sean',
        lastName: 'Connery',
      },
      'Actor~3': {
        id: '3',
        firstName: 'Nhan',
        lastName: 'Ly',
      },
      'Actor~4': {
        id: '4',
        firstName: 'Mark',
        lastName: 'Hammill',
      },
      'Actor~5': {
        id: '5',
        firstName: 'Christy',
        lastName: 'Gomez',
      },
    },
  },
};
