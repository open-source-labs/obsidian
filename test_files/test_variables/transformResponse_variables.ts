export const test = {
  hashableKeys: ["__typename", "id"],
  queryKey:  "{\n  movies(input: {genre: ACTION}) {\n    id\n    __typename\n    title\n    releaseYear\n    genre\n    actors {\n      id\n      __typename\n      firstName\n      lastName\n    }\n  }\n}\n",
  detransformedResponse_nested: 
  {
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
      ]
    }
  },
  detransformedResponse_notnested: 
  {
    data: {
      movies: [
        {
          __typename: 'Movie',
          id: '1',
          title: 'Indiana Jones and the Last Crusade',
          genre: 'ACTION',
        },
        {
          __typename: 'Movie',
          id: '4',
          title: 'Air Force One',
          genre: 'ACTION'
        },
        {
          __typename: 'Movie',
          id: '5',
          title: 'Die Hard',
          genre: 'ACTION'
        }
      ]
    }
  },
  transformedResponse_nested: 
  {
    "~Movie~1": {
      "~Actor~1": {},
      "~Actor~2": {}
    },
    "~Movie~4": {
      "~Actor~1": {},
      "~Actor~5": {}
    },
  },
  transformedResponse_notnested: 
  {
    "~Movie~1": {},
    "~Movie~4": {},
    "~Movie~5": {}
  },
  writeHashes:
  ['~Movie~1', '~Movie~4', '~Movie~5', '~Actor~1', '~Actor~2', '~Actor~5'],
  writeData: 
  [
    {
      __typename: 'Movie',
      id: '1',
      title: 'Indiana Jones and the Last Crusade',
      genre: 'ACTION',
    },
    {
      __typename: 'Movie',
      id: '4',
      title: 'Air Force One',
      genre: 'ACTION'
    },
    {
      __typename: 'Movie',
      id: '5',
      title: 'Die Hard',
      genre: 'ACTION'
    },
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
      id: '5',
      firstName: 'Gary',
      lastName: 'Oldman',
    }
  ]
}