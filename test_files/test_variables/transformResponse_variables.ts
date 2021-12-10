export const test = {
  hashableKeys: ["id", "__typename"],
  queryKey:  "{\n  movies(input: {genre: SCIFI}) {\n    id\n    __typename\n    title\n    releaseYear\n    genre\n    actors {\n      id\n      __typename\n      firstName\n      lastName\n    }\n  }\n}\n",
  detransformedResponse: 
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
  transformedResponse: 
  {
    "~Movie~1": {
      "Actor~1": {},
      "Actor~2": {}
    },
    "~Movie~4": {
      "Actor~1": {},
      "Actor~5": {}
    },
  }
}