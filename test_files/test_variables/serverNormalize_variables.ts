// import { containsHashableObject, printHashableObject } from "../../src/normalize";

export const serverNormalizeTestVariables:any = {};

serverNormalizeTestVariables.containsHashableObjFalse1 =
[
    "id",
    "__typename"
]
serverNormalizeTestVariables.containsHashableObjFalse2 =
[
    {
        "id": 1,
        "__typename" : 'Movie'
    }
]
serverNormalizeTestVariables.containsHashableObjFalse3 =
{
    "data": {
        "id": 1,
        "__typename" : 'Movie'
    }
}
serverNormalizeTestVariables.containsHashableObjTrue1 = 
{
    "id": "11", 
    "__typename": "Movie", 
    "title": "Ad Astra",
    "thing": {"generic": "thing"}
}
serverNormalizeTestVariables.containsHashableObjTrue2 = {
    "id": "7",
    "__typename": "Movie",
    "title": "Ad Astra",
    "releaseYear": 2019,
    "genre": "SCIFI",
    "actors": [
        {
            "id": "1",
            "__typename": "Actor",
            "firstName": "Brad",
            "lastName": "Pitt"
        },
        {
            "id": "14",
            "__typename": "Actor",
            "firstName": "Tommy Lee",
            "lastName": "Jones"
        }
    ]
}
serverNormalizeTestVariables.containsHashableObjTrue3 = {
    "id": "1",
    "__typename": "Actor",
    "firstName": "Brad",
    "lastName": "Pitt",
    "movies": ["Ad Astra", "Fight Club"]
}
serverNormalizeTestVariables.isHashableObjFalse1 =
[
    "id",
    "__typename"
]
serverNormalizeTestVariables.isHashableObjFalse2 =
{
    "id": "11",
    "__typename": "Movie",
    "title": "Ad Astra",
    "thing": {"generic": "thing"}
}
serverNormalizeTestVariables.isHashableObjTrue1 = 
{
    "id": "7",
    "__typename": "Movie",
    "title": "Ad Astra",
    "releaseYear": 2019,
    "genre": "SCIFI"
}
serverNormalizeTestVariables.isHashableObjTrue2 =
{
    "id": "1",
    "__typename": "Actor",
    "firstName": "Brad",
    "lastName": "Pitt"
}
serverNormalizeTestVariables.hashMaker1 = {'id': 7, '__typename': 'Movie', 'title': 'Ad Astra', 'releaseYear': 2019, 'genre': 'SCIFI'}
serverNormalizeTestVariables.hashMaker2 = { 'id': 1, '__typename': 'Actor', 'firstName': 'Brad', 'lastName': 'Pitt' }
serverNormalizeTestVariables.scifiMovies = {
    "data": {
        "movies": [
             {
                "id": "7",
                "__typename": "Movie",
                "title": "Ad Astra",
                "releaseYear": 2019,
                "genre": "SCIFI",
                "actors": [
                    {
                        "id": "1",
                        "__typename": "Actor",
                        "firstName": "Brad",
                        "lastName": "Pitt"
                    },
                    {
                        "id": "14",
                        "__typename": "Actor",
                        "firstName": "Tommy Lee",
                        "lastName": "Jones"
                    }
                ]
            },
            {
                "id": "15",
                "__typename": "Movie",
                "title": "World War Z",
                "releaseYear": 2013,
                "genre": "SCIFI",
                "actors": [
                    {
                        "id": "1",
                        "__typename": "Actor",
                        "firstName": "Brad",
                        "lastName": "Pitt"
                    }
                ]
            },
            {
                "id": "17",
                "__typename": "Movie",
                "title": "Sky Captain and the World of Tomorrow",
                "releaseYear": 2004,
                "genre": "SCIFI",
                "actors": [
                    {
                        "id": "2",
                        "__typename": "Actor",
                        "firstName": "Angelina",
                        "lastName": "Jolie"
                    },
                    {
                        "id": "25",
                        "__typename": "Actor",
                        "firstName": "Jude",
                        "lastName": "Law"
                    },
                    {
                        "id": "26",
                        "__typename": "Actor",
                        "firstName": "Gwyneth",
                        "lastName": "Paltrow"
                    }
                ]
            }
        ]
    }
}
serverNormalizeTestVariables.scifiMoviesNormalized = {
  "~7~Movie": { id: "7", __typename: "Movie", title: "Ad Astra", releaseYear: 2019, genre: "SCIFI" },
  "~1~Actor": { id: "1", __typename: "Actor", firstName: "Brad", lastName: "Pitt" },
  "~14~Actor": { id: "14", __typename: "Actor", firstName: "Tommy Lee", lastName: "Jones" },
  "~15~Movie": {
    id: "15",
    __typename: "Movie",
    title: "World War Z",
    releaseYear: 2013,
    genre: "SCIFI"
  },
  "~17~Movie": {
    id: "17",
    __typename: "Movie",
    title: "Sky Captain and the World of Tomorrow",
    releaseYear: 2004,
    genre: "SCIFI"
  },
  "~2~Actor": { id: "2", __typename: "Actor", firstName: "Angelina", lastName: "Jolie" },
  "~25~Actor": { id: "25", __typename: "Actor", firstName: "Jude", lastName: "Law" },
  "~26~Actor": { id: "26", __typename: "Actor", firstName: "Gwyneth", lastName: "Paltrow" }
}
serverNormalizeTestVariables.arbitraryNestedScifiMovies =
{
    "data": {
      "movies": [
        {
          "id": "7",
          "__typename": "Movie",
          "title": "Ad Astra",
          "releaseYear": 2019,
          "genre": "SCIFI",
          "actors": [
            {
              "id": "1",
              "__typename": "Actor",
              "firstName": "Brad",
              "lastName": "Pitt",
              "movies": [
                {
                  "id": "1",
                  "__typename": "Movie",
                  "title": "Mr. and Mrs. Smith",
                  "releaseYear": 2005,
                  "genre": "COMEDY",
                  "actors": [
                    {
                      "id": "1",
                      "__typename": "Actor",
                      "firstName": "Brad",
                      "lastName": "Pitt",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        },
                        {
                          "id": "3",
                          "__typename": "Movie",
                          "title": "Troy",
                          "releaseYear": 2004,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "6",
                              "__typename": "Actor",
                              "firstName": "Orlando",
                              "lastName": "Bloom"
                            }
                          ]
                        },
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        },
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        },
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        },
                        {
                          "id": "15",
                          "__typename": "Movie",
                          "title": "World War Z",
                          "releaseYear": 2013,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            }
                          ]
                        },
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "2",
                      "__typename": "Actor",
                      "firstName": "Angelina",
                      "lastName": "Jolie",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "8",
                          "__typename": "Movie",
                          "title": "Maleficient",
                          "releaseYear": 2014,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "9",
                          "__typename": "Movie",
                          "title": "Lara Croft Tomb Raider",
                          "releaseYear": 2001,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "15",
                              "__typename": "Actor",
                              "firstName": "Daniel",
                              "lastName": "Craig"
                            }
                          ]
                        },
                        {
                          "id": "10",
                          "__typename": "Movie",
                          "title": "Wanted",
                          "releaseYear": 2008,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "16",
                              "__typename": "Actor",
                              "firstName": "James",
                              "lastName": "McAvoy"
                            },
                            {
                              "id": "17",
                              "__typename": "Actor",
                              "firstName": "Morgan",
                              "lastName": "Freeman"
                            }
                          ]
                        },
                        {
                          "id": "11",
                          "__typename": "Movie",
                          "title": "Salt",
                          "releaseYear": 2010,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "12",
                          "__typename": "Movie",
                          "title": "Gone in 60 Seconds",
                          "releaseYear": 2000,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "18",
                              "__typename": "Actor",
                              "firstName": "Nicholas",
                              "lastName": "Cage"
                            }
                          ]
                        },
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        },
                        {
                          "id": "14",
                          "__typename": "Movie",
                          "title": "The Tourist",
                          "releaseYear": 2010,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "23",
                              "__typename": "Actor",
                              "firstName": "Johnny",
                              "lastName": "Depp"
                            }
                          ]
                        },
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        },
                        {
                          "id": "18",
                          "__typename": "Movie",
                          "title": "Girl, Interrupted",
                          "releaseYear": 1999,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "27",
                              "__typename": "Actor",
                              "firstName": "Winona",
                              "lastName": "Ryder"
                            }
                          ]
                        },
                        {
                          "id": "19",
                          "__typename": "Movie",
                          "title": "Playing By Heart",
                          "releaseYear": 1998,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "28",
                              "__typename": "Actor",
                              "firstName": "Sean",
                              "lastName": "Connery"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "21",
                          "__typename": "Movie",
                          "title": "Beowulf",
                          "releaseYear": 2007,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "22",
                          "__typename": "Movie",
                          "title": "The Good Shepherd",
                          "releaseYear": 2006,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            }
                          ]
                        },
                        {
                          "id": "23",
                          "__typename": "Movie",
                          "title": "Shark Tale",
                          "releaseYear": 2004,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "2",
                  "__typename": "Movie",
                  "title": "Fight Club",
                  "releaseYear": 1999,
                  "genre": "ACTION",
                  "actors": [
                    {
                      "id": "1",
                      "__typename": "Actor",
                      "firstName": "Brad",
                      "lastName": "Pitt",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        },
                        {
                          "id": "3",
                          "__typename": "Movie",
                          "title": "Troy",
                          "releaseYear": 2004,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "6",
                              "__typename": "Actor",
                              "firstName": "Orlando",
                              "lastName": "Bloom"
                            }
                          ]
                        },
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        },
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        },
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        },
                        {
                          "id": "15",
                          "__typename": "Movie",
                          "title": "World War Z",
                          "releaseYear": 2013,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            }
                          ]
                        },
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "4",
                      "__typename": "Actor",
                      "firstName": "Edward",
                      "lastName": "Norton",
                      "movies": [
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "5",
                      "__typename": "Actor",
                      "firstName": "Helena",
                      "lastName": "Bonharm Carter",
                      "movies": [
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "3",
                  "__typename": "Movie",
                  "title": "Troy",
                  "releaseYear": 2004,
                  "genre": "ADVENTURE",
                  "actors": [
                    {
                      "id": "1",
                      "__typename": "Actor",
                      "firstName": "Brad",
                      "lastName": "Pitt",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        },
                        {
                          "id": "3",
                          "__typename": "Movie",
                          "title": "Troy",
                          "releaseYear": 2004,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "6",
                              "__typename": "Actor",
                              "firstName": "Orlando",
                              "lastName": "Bloom"
                            }
                          ]
                        },
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        },
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        },
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        },
                        {
                          "id": "15",
                          "__typename": "Movie",
                          "title": "World War Z",
                          "releaseYear": 2013,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            }
                          ]
                        },
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "6",
                      "__typename": "Actor",
                      "firstName": "Orlando",
                      "lastName": "Bloom",
                      "movies": [
                        {
                          "id": "3",
                          "__typename": "Movie",
                          "title": "Troy",
                          "releaseYear": 2004,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "6",
                              "__typename": "Actor",
                              "firstName": "Orlando",
                              "lastName": "Bloom"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "4",
                  "__typename": "Movie",
                  "title": "Oceans 11",
                  "releaseYear": 2001,
                  "genre": "ACTION",
                  "actors": [
                    {
                      "id": "1",
                      "__typename": "Actor",
                      "firstName": "Brad",
                      "lastName": "Pitt",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        },
                        {
                          "id": "3",
                          "__typename": "Movie",
                          "title": "Troy",
                          "releaseYear": 2004,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "6",
                              "__typename": "Actor",
                              "firstName": "Orlando",
                              "lastName": "Bloom"
                            }
                          ]
                        },
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        },
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        },
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        },
                        {
                          "id": "15",
                          "__typename": "Movie",
                          "title": "World War Z",
                          "releaseYear": 2013,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            }
                          ]
                        },
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "7",
                      "__typename": "Actor",
                      "firstName": "George",
                      "lastName": "Clooney",
                      "movies": [
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "8",
                      "__typename": "Actor",
                      "firstName": "Matt",
                      "lastName": "Damon",
                      "movies": [
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "22",
                          "__typename": "Movie",
                          "title": "The Good Shepherd",
                          "releaseYear": 2006,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "9",
                      "__typename": "Actor",
                      "firstName": "Julia",
                      "lastName": "Roberts",
                      "movies": [
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "5",
                  "__typename": "Movie",
                  "title": "Once Upon a Time in Hollywood",
                  "releaseYear": 2019,
                  "genre": "DRAMA",
                  "actors": [
                    {
                      "id": "1",
                      "__typename": "Actor",
                      "firstName": "Brad",
                      "lastName": "Pitt",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        },
                        {
                          "id": "3",
                          "__typename": "Movie",
                          "title": "Troy",
                          "releaseYear": 2004,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "6",
                              "__typename": "Actor",
                              "firstName": "Orlando",
                              "lastName": "Bloom"
                            }
                          ]
                        },
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        },
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        },
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        },
                        {
                          "id": "15",
                          "__typename": "Movie",
                          "title": "World War Z",
                          "releaseYear": 2013,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            }
                          ]
                        },
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "3",
                      "__typename": "Actor",
                      "firstName": "Leonardo",
                      "lastName": "Dicaprio",
                      "movies": [
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "10",
                      "__typename": "Actor",
                      "firstName": "Margot",
                      "lastName": "Robbie",
                      "movies": [
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "6",
                  "__typename": "Movie",
                  "title": "Moneyball",
                  "releaseYear": 2011,
                  "genre": "DRAMA",
                  "actors": [
                    {
                      "id": "1",
                      "__typename": "Actor",
                      "firstName": "Brad",
                      "lastName": "Pitt",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        },
                        {
                          "id": "3",
                          "__typename": "Movie",
                          "title": "Troy",
                          "releaseYear": 2004,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "6",
                              "__typename": "Actor",
                              "firstName": "Orlando",
                              "lastName": "Bloom"
                            }
                          ]
                        },
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        },
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        },
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        },
                        {
                          "id": "15",
                          "__typename": "Movie",
                          "title": "World War Z",
                          "releaseYear": 2013,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            }
                          ]
                        },
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "11",
                      "__typename": "Actor",
                      "firstName": "Jonah",
                      "lastName": "Hill",
                      "movies": [
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "12",
                      "__typename": "Actor",
                      "firstName": "Philip",
                      "lastName": "Seymour Hoffman",
                      "movies": [
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "13",
                      "__typename": "Actor",
                      "firstName": "Chris",
                      "lastName": "Pratt",
                      "movies": [
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "7",
                  "__typename": "Movie",
                  "title": "Ad Astra",
                  "releaseYear": 2019,
                  "genre": "SCIFI",
                  "actors": [
                    {
                      "id": "1",
                      "__typename": "Actor",
                      "firstName": "Brad",
                      "lastName": "Pitt",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        },
                        {
                          "id": "3",
                          "__typename": "Movie",
                          "title": "Troy",
                          "releaseYear": 2004,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "6",
                              "__typename": "Actor",
                              "firstName": "Orlando",
                              "lastName": "Bloom"
                            }
                          ]
                        },
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        },
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        },
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        },
                        {
                          "id": "15",
                          "__typename": "Movie",
                          "title": "World War Z",
                          "releaseYear": 2013,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            }
                          ]
                        },
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "14",
                      "__typename": "Actor",
                      "firstName": "Tommy Lee",
                      "lastName": "Jones",
                      "movies": [
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "15",
                  "__typename": "Movie",
                  "title": "World War Z",
                  "releaseYear": 2013,
                  "genre": "SCIFI",
                  "actors": [
                    {
                      "id": "1",
                      "__typename": "Actor",
                      "firstName": "Brad",
                      "lastName": "Pitt",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        },
                        {
                          "id": "3",
                          "__typename": "Movie",
                          "title": "Troy",
                          "releaseYear": 2004,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "6",
                              "__typename": "Actor",
                              "firstName": "Orlando",
                              "lastName": "Bloom"
                            }
                          ]
                        },
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        },
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        },
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        },
                        {
                          "id": "15",
                          "__typename": "Movie",
                          "title": "World War Z",
                          "releaseYear": 2013,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            }
                          ]
                        },
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "16",
                  "__typename": "Movie",
                  "title": "Legends of the Fall",
                  "releaseYear": 1994,
                  "genre": "ROMANCE",
                  "actors": [
                    {
                      "id": "1",
                      "__typename": "Actor",
                      "firstName": "Brad",
                      "lastName": "Pitt",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        },
                        {
                          "id": "3",
                          "__typename": "Movie",
                          "title": "Troy",
                          "releaseYear": 2004,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "6",
                              "__typename": "Actor",
                              "firstName": "Orlando",
                              "lastName": "Bloom"
                            }
                          ]
                        },
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        },
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        },
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        },
                        {
                          "id": "15",
                          "__typename": "Movie",
                          "title": "World War Z",
                          "releaseYear": 2013,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            }
                          ]
                        },
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "24",
                      "__typename": "Actor",
                      "firstName": "Anthony",
                      "lastName": "Hopkins",
                      "movies": [
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "21",
                          "__typename": "Movie",
                          "title": "Beowulf",
                          "releaseYear": 2007,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "20",
                  "__typename": "Movie",
                  "title": "By the Sea",
                  "releaseYear": 2015,
                  "genre": "ROMANCE",
                  "actors": [
                    {
                      "id": "1",
                      "__typename": "Actor",
                      "firstName": "Brad",
                      "lastName": "Pitt",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        },
                        {
                          "id": "3",
                          "__typename": "Movie",
                          "title": "Troy",
                          "releaseYear": 2004,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "6",
                              "__typename": "Actor",
                              "firstName": "Orlando",
                              "lastName": "Bloom"
                            }
                          ]
                        },
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        },
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        },
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        },
                        {
                          "id": "15",
                          "__typename": "Movie",
                          "title": "World War Z",
                          "releaseYear": 2013,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            }
                          ]
                        },
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "2",
                      "__typename": "Actor",
                      "firstName": "Angelina",
                      "lastName": "Jolie",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "8",
                          "__typename": "Movie",
                          "title": "Maleficient",
                          "releaseYear": 2014,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "9",
                          "__typename": "Movie",
                          "title": "Lara Croft Tomb Raider",
                          "releaseYear": 2001,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "15",
                              "__typename": "Actor",
                              "firstName": "Daniel",
                              "lastName": "Craig"
                            }
                          ]
                        },
                        {
                          "id": "10",
                          "__typename": "Movie",
                          "title": "Wanted",
                          "releaseYear": 2008,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "16",
                              "__typename": "Actor",
                              "firstName": "James",
                              "lastName": "McAvoy"
                            },
                            {
                              "id": "17",
                              "__typename": "Actor",
                              "firstName": "Morgan",
                              "lastName": "Freeman"
                            }
                          ]
                        },
                        {
                          "id": "11",
                          "__typename": "Movie",
                          "title": "Salt",
                          "releaseYear": 2010,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "12",
                          "__typename": "Movie",
                          "title": "Gone in 60 Seconds",
                          "releaseYear": 2000,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "18",
                              "__typename": "Actor",
                              "firstName": "Nicholas",
                              "lastName": "Cage"
                            }
                          ]
                        },
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        },
                        {
                          "id": "14",
                          "__typename": "Movie",
                          "title": "The Tourist",
                          "releaseYear": 2010,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "23",
                              "__typename": "Actor",
                              "firstName": "Johnny",
                              "lastName": "Depp"
                            }
                          ]
                        },
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        },
                        {
                          "id": "18",
                          "__typename": "Movie",
                          "title": "Girl, Interrupted",
                          "releaseYear": 1999,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "27",
                              "__typename": "Actor",
                              "firstName": "Winona",
                              "lastName": "Ryder"
                            }
                          ]
                        },
                        {
                          "id": "19",
                          "__typename": "Movie",
                          "title": "Playing By Heart",
                          "releaseYear": 1998,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "28",
                              "__typename": "Actor",
                              "firstName": "Sean",
                              "lastName": "Connery"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "21",
                          "__typename": "Movie",
                          "title": "Beowulf",
                          "releaseYear": 2007,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "22",
                          "__typename": "Movie",
                          "title": "The Good Shepherd",
                          "releaseYear": 2006,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            }
                          ]
                        },
                        {
                          "id": "23",
                          "__typename": "Movie",
                          "title": "Shark Tale",
                          "releaseYear": 2004,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "id": "14",
              "__typename": "Actor",
              "firstName": "Tommy Lee",
              "lastName": "Jones",
              "movies": [
                {
                  "id": "7",
                  "__typename": "Movie",
                  "title": "Ad Astra",
                  "releaseYear": 2019,
                  "genre": "SCIFI",
                  "actors": [
                    {
                      "id": "1",
                      "__typename": "Actor",
                      "firstName": "Brad",
                      "lastName": "Pitt",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        },
                        {
                          "id": "3",
                          "__typename": "Movie",
                          "title": "Troy",
                          "releaseYear": 2004,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "6",
                              "__typename": "Actor",
                              "firstName": "Orlando",
                              "lastName": "Bloom"
                            }
                          ]
                        },
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        },
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        },
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        },
                        {
                          "id": "15",
                          "__typename": "Movie",
                          "title": "World War Z",
                          "releaseYear": 2013,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            }
                          ]
                        },
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "14",
                      "__typename": "Actor",
                      "firstName": "Tommy Lee",
                      "lastName": "Jones",
                      "movies": [
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "15",
          "__typename": "Movie",
          "title": "World War Z",
          "releaseYear": 2013,
          "genre": "SCIFI",
          "actors": [
            {
              "id": "1",
              "__typename": "Actor",
              "firstName": "Brad",
              "lastName": "Pitt",
              "movies": [
                {
                  "id": "1",
                  "__typename": "Movie",
                  "title": "Mr. and Mrs. Smith",
                  "releaseYear": 2005,
                  "genre": "COMEDY",
                  "actors": [
                    {
                      "id": "1",
                      "__typename": "Actor",
                      "firstName": "Brad",
                      "lastName": "Pitt",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        },
                        {
                          "id": "3",
                          "__typename": "Movie",
                          "title": "Troy",
                          "releaseYear": 2004,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "6",
                              "__typename": "Actor",
                              "firstName": "Orlando",
                              "lastName": "Bloom"
                            }
                          ]
                        },
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        },
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        },
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        },
                        {
                          "id": "15",
                          "__typename": "Movie",
                          "title": "World War Z",
                          "releaseYear": 2013,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            }
                          ]
                        },
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "2",
                      "__typename": "Actor",
                      "firstName": "Angelina",
                      "lastName": "Jolie",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "8",
                          "__typename": "Movie",
                          "title": "Maleficient",
                          "releaseYear": 2014,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "9",
                          "__typename": "Movie",
                          "title": "Lara Croft Tomb Raider",
                          "releaseYear": 2001,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "15",
                              "__typename": "Actor",
                              "firstName": "Daniel",
                              "lastName": "Craig"
                            }
                          ]
                        },
                        {
                          "id": "10",
                          "__typename": "Movie",
                          "title": "Wanted",
                          "releaseYear": 2008,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "16",
                              "__typename": "Actor",
                              "firstName": "James",
                              "lastName": "McAvoy"
                            },
                            {
                              "id": "17",
                              "__typename": "Actor",
                              "firstName": "Morgan",
                              "lastName": "Freeman"
                            }
                          ]
                        },
                        {
                          "id": "11",
                          "__typename": "Movie",
                          "title": "Salt",
                          "releaseYear": 2010,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "12",
                          "__typename": "Movie",
                          "title": "Gone in 60 Seconds",
                          "releaseYear": 2000,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "18",
                              "__typename": "Actor",
                              "firstName": "Nicholas",
                              "lastName": "Cage"
                            }
                          ]
                        },
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        },
                        {
                          "id": "14",
                          "__typename": "Movie",
                          "title": "The Tourist",
                          "releaseYear": 2010,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "23",
                              "__typename": "Actor",
                              "firstName": "Johnny",
                              "lastName": "Depp"
                            }
                          ]
                        },
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        },
                        {
                          "id": "18",
                          "__typename": "Movie",
                          "title": "Girl, Interrupted",
                          "releaseYear": 1999,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "27",
                              "__typename": "Actor",
                              "firstName": "Winona",
                              "lastName": "Ryder"
                            }
                          ]
                        },
                        {
                          "id": "19",
                          "__typename": "Movie",
                          "title": "Playing By Heart",
                          "releaseYear": 1998,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "28",
                              "__typename": "Actor",
                              "firstName": "Sean",
                              "lastName": "Connery"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "21",
                          "__typename": "Movie",
                          "title": "Beowulf",
                          "releaseYear": 2007,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "22",
                          "__typename": "Movie",
                          "title": "The Good Shepherd",
                          "releaseYear": 2006,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            }
                          ]
                        },
                        {
                          "id": "23",
                          "__typename": "Movie",
                          "title": "Shark Tale",
                          "releaseYear": 2004,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "2",
                  "__typename": "Movie",
                  "title": "Fight Club",
                  "releaseYear": 1999,
                  "genre": "ACTION",
                  "actors": [
                    {
                      "id": "1",
                      "__typename": "Actor",
                      "firstName": "Brad",
                      "lastName": "Pitt",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        },
                        {
                          "id": "3",
                          "__typename": "Movie",
                          "title": "Troy",
                          "releaseYear": 2004,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "6",
                              "__typename": "Actor",
                              "firstName": "Orlando",
                              "lastName": "Bloom"
                            }
                          ]
                        },
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        },
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        },
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        },
                        {
                          "id": "15",
                          "__typename": "Movie",
                          "title": "World War Z",
                          "releaseYear": 2013,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            }
                          ]
                        },
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "4",
                      "__typename": "Actor",
                      "firstName": "Edward",
                      "lastName": "Norton",
                      "movies": [
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "5",
                      "__typename": "Actor",
                      "firstName": "Helena",
                      "lastName": "Bonharm Carter",
                      "movies": [
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "3",
                  "__typename": "Movie",
                  "title": "Troy",
                  "releaseYear": 2004,
                  "genre": "ADVENTURE",
                  "actors": [
                    {
                      "id": "1",
                      "__typename": "Actor",
                      "firstName": "Brad",
                      "lastName": "Pitt",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        },
                        {
                          "id": "3",
                          "__typename": "Movie",
                          "title": "Troy",
                          "releaseYear": 2004,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "6",
                              "__typename": "Actor",
                              "firstName": "Orlando",
                              "lastName": "Bloom"
                            }
                          ]
                        },
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        },
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        },
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        },
                        {
                          "id": "15",
                          "__typename": "Movie",
                          "title": "World War Z",
                          "releaseYear": 2013,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            }
                          ]
                        },
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "6",
                      "__typename": "Actor",
                      "firstName": "Orlando",
                      "lastName": "Bloom",
                      "movies": [
                        {
                          "id": "3",
                          "__typename": "Movie",
                          "title": "Troy",
                          "releaseYear": 2004,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "6",
                              "__typename": "Actor",
                              "firstName": "Orlando",
                              "lastName": "Bloom"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "4",
                  "__typename": "Movie",
                  "title": "Oceans 11",
                  "releaseYear": 2001,
                  "genre": "ACTION",
                  "actors": [
                    {
                      "id": "1",
                      "__typename": "Actor",
                      "firstName": "Brad",
                      "lastName": "Pitt",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        },
                        {
                          "id": "3",
                          "__typename": "Movie",
                          "title": "Troy",
                          "releaseYear": 2004,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "6",
                              "__typename": "Actor",
                              "firstName": "Orlando",
                              "lastName": "Bloom"
                            }
                          ]
                        },
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        },
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        },
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        },
                        {
                          "id": "15",
                          "__typename": "Movie",
                          "title": "World War Z",
                          "releaseYear": 2013,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            }
                          ]
                        },
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "7",
                      "__typename": "Actor",
                      "firstName": "George",
                      "lastName": "Clooney",
                      "movies": [
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "8",
                      "__typename": "Actor",
                      "firstName": "Matt",
                      "lastName": "Damon",
                      "movies": [
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "22",
                          "__typename": "Movie",
                          "title": "The Good Shepherd",
                          "releaseYear": 2006,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "9",
                      "__typename": "Actor",
                      "firstName": "Julia",
                      "lastName": "Roberts",
                      "movies": [
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "5",
                  "__typename": "Movie",
                  "title": "Once Upon a Time in Hollywood",
                  "releaseYear": 2019,
                  "genre": "DRAMA",
                  "actors": [
                    {
                      "id": "1",
                      "__typename": "Actor",
                      "firstName": "Brad",
                      "lastName": "Pitt",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        },
                        {
                          "id": "3",
                          "__typename": "Movie",
                          "title": "Troy",
                          "releaseYear": 2004,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "6",
                              "__typename": "Actor",
                              "firstName": "Orlando",
                              "lastName": "Bloom"
                            }
                          ]
                        },
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        },
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        },
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        },
                        {
                          "id": "15",
                          "__typename": "Movie",
                          "title": "World War Z",
                          "releaseYear": 2013,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            }
                          ]
                        },
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "3",
                      "__typename": "Actor",
                      "firstName": "Leonardo",
                      "lastName": "Dicaprio",
                      "movies": [
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "10",
                      "__typename": "Actor",
                      "firstName": "Margot",
                      "lastName": "Robbie",
                      "movies": [
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "6",
                  "__typename": "Movie",
                  "title": "Moneyball",
                  "releaseYear": 2011,
                  "genre": "DRAMA",
                  "actors": [
                    {
                      "id": "1",
                      "__typename": "Actor",
                      "firstName": "Brad",
                      "lastName": "Pitt",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        },
                        {
                          "id": "3",
                          "__typename": "Movie",
                          "title": "Troy",
                          "releaseYear": 2004,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "6",
                              "__typename": "Actor",
                              "firstName": "Orlando",
                              "lastName": "Bloom"
                            }
                          ]
                        },
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        },
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        },
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        },
                        {
                          "id": "15",
                          "__typename": "Movie",
                          "title": "World War Z",
                          "releaseYear": 2013,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            }
                          ]
                        },
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "11",
                      "__typename": "Actor",
                      "firstName": "Jonah",
                      "lastName": "Hill",
                      "movies": [
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "12",
                      "__typename": "Actor",
                      "firstName": "Philip",
                      "lastName": "Seymour Hoffman",
                      "movies": [
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "13",
                      "__typename": "Actor",
                      "firstName": "Chris",
                      "lastName": "Pratt",
                      "movies": [
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "7",
                  "__typename": "Movie",
                  "title": "Ad Astra",
                  "releaseYear": 2019,
                  "genre": "SCIFI",
                  "actors": [
                    {
                      "id": "1",
                      "__typename": "Actor",
                      "firstName": "Brad",
                      "lastName": "Pitt",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        },
                        {
                          "id": "3",
                          "__typename": "Movie",
                          "title": "Troy",
                          "releaseYear": 2004,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "6",
                              "__typename": "Actor",
                              "firstName": "Orlando",
                              "lastName": "Bloom"
                            }
                          ]
                        },
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        },
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        },
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        },
                        {
                          "id": "15",
                          "__typename": "Movie",
                          "title": "World War Z",
                          "releaseYear": 2013,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            }
                          ]
                        },
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "14",
                      "__typename": "Actor",
                      "firstName": "Tommy Lee",
                      "lastName": "Jones",
                      "movies": [
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "15",
                  "__typename": "Movie",
                  "title": "World War Z",
                  "releaseYear": 2013,
                  "genre": "SCIFI",
                  "actors": [
                    {
                      "id": "1",
                      "__typename": "Actor",
                      "firstName": "Brad",
                      "lastName": "Pitt",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        },
                        {
                          "id": "3",
                          "__typename": "Movie",
                          "title": "Troy",
                          "releaseYear": 2004,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "6",
                              "__typename": "Actor",
                              "firstName": "Orlando",
                              "lastName": "Bloom"
                            }
                          ]
                        },
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        },
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        },
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        },
                        {
                          "id": "15",
                          "__typename": "Movie",
                          "title": "World War Z",
                          "releaseYear": 2013,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            }
                          ]
                        },
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "16",
                  "__typename": "Movie",
                  "title": "Legends of the Fall",
                  "releaseYear": 1994,
                  "genre": "ROMANCE",
                  "actors": [
                    {
                      "id": "1",
                      "__typename": "Actor",
                      "firstName": "Brad",
                      "lastName": "Pitt",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        },
                        {
                          "id": "3",
                          "__typename": "Movie",
                          "title": "Troy",
                          "releaseYear": 2004,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "6",
                              "__typename": "Actor",
                              "firstName": "Orlando",
                              "lastName": "Bloom"
                            }
                          ]
                        },
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        },
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        },
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        },
                        {
                          "id": "15",
                          "__typename": "Movie",
                          "title": "World War Z",
                          "releaseYear": 2013,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            }
                          ]
                        },
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "24",
                      "__typename": "Actor",
                      "firstName": "Anthony",
                      "lastName": "Hopkins",
                      "movies": [
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "21",
                          "__typename": "Movie",
                          "title": "Beowulf",
                          "releaseYear": 2007,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "20",
                  "__typename": "Movie",
                  "title": "By the Sea",
                  "releaseYear": 2015,
                  "genre": "ROMANCE",
                  "actors": [
                    {
                      "id": "1",
                      "__typename": "Actor",
                      "firstName": "Brad",
                      "lastName": "Pitt",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        },
                        {
                          "id": "3",
                          "__typename": "Movie",
                          "title": "Troy",
                          "releaseYear": 2004,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "6",
                              "__typename": "Actor",
                              "firstName": "Orlando",
                              "lastName": "Bloom"
                            }
                          ]
                        },
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        },
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        },
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        },
                        {
                          "id": "15",
                          "__typename": "Movie",
                          "title": "World War Z",
                          "releaseYear": 2013,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            }
                          ]
                        },
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "2",
                      "__typename": "Actor",
                      "firstName": "Angelina",
                      "lastName": "Jolie",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "8",
                          "__typename": "Movie",
                          "title": "Maleficient",
                          "releaseYear": 2014,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "9",
                          "__typename": "Movie",
                          "title": "Lara Croft Tomb Raider",
                          "releaseYear": 2001,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "15",
                              "__typename": "Actor",
                              "firstName": "Daniel",
                              "lastName": "Craig"
                            }
                          ]
                        },
                        {
                          "id": "10",
                          "__typename": "Movie",
                          "title": "Wanted",
                          "releaseYear": 2008,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "16",
                              "__typename": "Actor",
                              "firstName": "James",
                              "lastName": "McAvoy"
                            },
                            {
                              "id": "17",
                              "__typename": "Actor",
                              "firstName": "Morgan",
                              "lastName": "Freeman"
                            }
                          ]
                        },
                        {
                          "id": "11",
                          "__typename": "Movie",
                          "title": "Salt",
                          "releaseYear": 2010,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "12",
                          "__typename": "Movie",
                          "title": "Gone in 60 Seconds",
                          "releaseYear": 2000,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "18",
                              "__typename": "Actor",
                              "firstName": "Nicholas",
                              "lastName": "Cage"
                            }
                          ]
                        },
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        },
                        {
                          "id": "14",
                          "__typename": "Movie",
                          "title": "The Tourist",
                          "releaseYear": 2010,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "23",
                              "__typename": "Actor",
                              "firstName": "Johnny",
                              "lastName": "Depp"
                            }
                          ]
                        },
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        },
                        {
                          "id": "18",
                          "__typename": "Movie",
                          "title": "Girl, Interrupted",
                          "releaseYear": 1999,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "27",
                              "__typename": "Actor",
                              "firstName": "Winona",
                              "lastName": "Ryder"
                            }
                          ]
                        },
                        {
                          "id": "19",
                          "__typename": "Movie",
                          "title": "Playing By Heart",
                          "releaseYear": 1998,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "28",
                              "__typename": "Actor",
                              "firstName": "Sean",
                              "lastName": "Connery"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "21",
                          "__typename": "Movie",
                          "title": "Beowulf",
                          "releaseYear": 2007,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "22",
                          "__typename": "Movie",
                          "title": "The Good Shepherd",
                          "releaseYear": 2006,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            }
                          ]
                        },
                        {
                          "id": "23",
                          "__typename": "Movie",
                          "title": "Shark Tale",
                          "releaseYear": 2004,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "17",
          "__typename": "Movie",
          "title": "Sky Captain and the World of Tomorrow",
          "releaseYear": 2004,
          "genre": "SCIFI",
          "actors": [
            {
              "id": "2",
              "__typename": "Actor",
              "firstName": "Angelina",
              "lastName": "Jolie",
              "movies": [
                {
                  "id": "1",
                  "__typename": "Movie",
                  "title": "Mr. and Mrs. Smith",
                  "releaseYear": 2005,
                  "genre": "COMEDY",
                  "actors": [
                    {
                      "id": "1",
                      "__typename": "Actor",
                      "firstName": "Brad",
                      "lastName": "Pitt",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        },
                        {
                          "id": "3",
                          "__typename": "Movie",
                          "title": "Troy",
                          "releaseYear": 2004,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "6",
                              "__typename": "Actor",
                              "firstName": "Orlando",
                              "lastName": "Bloom"
                            }
                          ]
                        },
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        },
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        },
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        },
                        {
                          "id": "15",
                          "__typename": "Movie",
                          "title": "World War Z",
                          "releaseYear": 2013,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            }
                          ]
                        },
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "2",
                      "__typename": "Actor",
                      "firstName": "Angelina",
                      "lastName": "Jolie",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "8",
                          "__typename": "Movie",
                          "title": "Maleficient",
                          "releaseYear": 2014,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "9",
                          "__typename": "Movie",
                          "title": "Lara Croft Tomb Raider",
                          "releaseYear": 2001,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "15",
                              "__typename": "Actor",
                              "firstName": "Daniel",
                              "lastName": "Craig"
                            }
                          ]
                        },
                        {
                          "id": "10",
                          "__typename": "Movie",
                          "title": "Wanted",
                          "releaseYear": 2008,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "16",
                              "__typename": "Actor",
                              "firstName": "James",
                              "lastName": "McAvoy"
                            },
                            {
                              "id": "17",
                              "__typename": "Actor",
                              "firstName": "Morgan",
                              "lastName": "Freeman"
                            }
                          ]
                        },
                        {
                          "id": "11",
                          "__typename": "Movie",
                          "title": "Salt",
                          "releaseYear": 2010,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "12",
                          "__typename": "Movie",
                          "title": "Gone in 60 Seconds",
                          "releaseYear": 2000,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "18",
                              "__typename": "Actor",
                              "firstName": "Nicholas",
                              "lastName": "Cage"
                            }
                          ]
                        },
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        },
                        {
                          "id": "14",
                          "__typename": "Movie",
                          "title": "The Tourist",
                          "releaseYear": 2010,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "23",
                              "__typename": "Actor",
                              "firstName": "Johnny",
                              "lastName": "Depp"
                            }
                          ]
                        },
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        },
                        {
                          "id": "18",
                          "__typename": "Movie",
                          "title": "Girl, Interrupted",
                          "releaseYear": 1999,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "27",
                              "__typename": "Actor",
                              "firstName": "Winona",
                              "lastName": "Ryder"
                            }
                          ]
                        },
                        {
                          "id": "19",
                          "__typename": "Movie",
                          "title": "Playing By Heart",
                          "releaseYear": 1998,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "28",
                              "__typename": "Actor",
                              "firstName": "Sean",
                              "lastName": "Connery"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "21",
                          "__typename": "Movie",
                          "title": "Beowulf",
                          "releaseYear": 2007,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "22",
                          "__typename": "Movie",
                          "title": "The Good Shepherd",
                          "releaseYear": 2006,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            }
                          ]
                        },
                        {
                          "id": "23",
                          "__typename": "Movie",
                          "title": "Shark Tale",
                          "releaseYear": 2004,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "8",
                  "__typename": "Movie",
                  "title": "Maleficient",
                  "releaseYear": 2014,
                  "genre": "ADVENTURE",
                  "actors": [
                    {
                      "id": "2",
                      "__typename": "Actor",
                      "firstName": "Angelina",
                      "lastName": "Jolie",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "8",
                          "__typename": "Movie",
                          "title": "Maleficient",
                          "releaseYear": 2014,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "9",
                          "__typename": "Movie",
                          "title": "Lara Croft Tomb Raider",
                          "releaseYear": 2001,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "15",
                              "__typename": "Actor",
                              "firstName": "Daniel",
                              "lastName": "Craig"
                            }
                          ]
                        },
                        {
                          "id": "10",
                          "__typename": "Movie",
                          "title": "Wanted",
                          "releaseYear": 2008,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "16",
                              "__typename": "Actor",
                              "firstName": "James",
                              "lastName": "McAvoy"
                            },
                            {
                              "id": "17",
                              "__typename": "Actor",
                              "firstName": "Morgan",
                              "lastName": "Freeman"
                            }
                          ]
                        },
                        {
                          "id": "11",
                          "__typename": "Movie",
                          "title": "Salt",
                          "releaseYear": 2010,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "12",
                          "__typename": "Movie",
                          "title": "Gone in 60 Seconds",
                          "releaseYear": 2000,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "18",
                              "__typename": "Actor",
                              "firstName": "Nicholas",
                              "lastName": "Cage"
                            }
                          ]
                        },
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        },
                        {
                          "id": "14",
                          "__typename": "Movie",
                          "title": "The Tourist",
                          "releaseYear": 2010,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "23",
                              "__typename": "Actor",
                              "firstName": "Johnny",
                              "lastName": "Depp"
                            }
                          ]
                        },
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        },
                        {
                          "id": "18",
                          "__typename": "Movie",
                          "title": "Girl, Interrupted",
                          "releaseYear": 1999,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "27",
                              "__typename": "Actor",
                              "firstName": "Winona",
                              "lastName": "Ryder"
                            }
                          ]
                        },
                        {
                          "id": "19",
                          "__typename": "Movie",
                          "title": "Playing By Heart",
                          "releaseYear": 1998,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "28",
                              "__typename": "Actor",
                              "firstName": "Sean",
                              "lastName": "Connery"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "21",
                          "__typename": "Movie",
                          "title": "Beowulf",
                          "releaseYear": 2007,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "22",
                          "__typename": "Movie",
                          "title": "The Good Shepherd",
                          "releaseYear": 2006,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            }
                          ]
                        },
                        {
                          "id": "23",
                          "__typename": "Movie",
                          "title": "Shark Tale",
                          "releaseYear": 2004,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "9",
                  "__typename": "Movie",
                  "title": "Lara Croft Tomb Raider",
                  "releaseYear": 2001,
                  "genre": "ADVENTURE",
                  "actors": [
                    {
                      "id": "2",
                      "__typename": "Actor",
                      "firstName": "Angelina",
                      "lastName": "Jolie",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "8",
                          "__typename": "Movie",
                          "title": "Maleficient",
                          "releaseYear": 2014,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "9",
                          "__typename": "Movie",
                          "title": "Lara Croft Tomb Raider",
                          "releaseYear": 2001,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "15",
                              "__typename": "Actor",
                              "firstName": "Daniel",
                              "lastName": "Craig"
                            }
                          ]
                        },
                        {
                          "id": "10",
                          "__typename": "Movie",
                          "title": "Wanted",
                          "releaseYear": 2008,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "16",
                              "__typename": "Actor",
                              "firstName": "James",
                              "lastName": "McAvoy"
                            },
                            {
                              "id": "17",
                              "__typename": "Actor",
                              "firstName": "Morgan",
                              "lastName": "Freeman"
                            }
                          ]
                        },
                        {
                          "id": "11",
                          "__typename": "Movie",
                          "title": "Salt",
                          "releaseYear": 2010,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "12",
                          "__typename": "Movie",
                          "title": "Gone in 60 Seconds",
                          "releaseYear": 2000,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "18",
                              "__typename": "Actor",
                              "firstName": "Nicholas",
                              "lastName": "Cage"
                            }
                          ]
                        },
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        },
                        {
                          "id": "14",
                          "__typename": "Movie",
                          "title": "The Tourist",
                          "releaseYear": 2010,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "23",
                              "__typename": "Actor",
                              "firstName": "Johnny",
                              "lastName": "Depp"
                            }
                          ]
                        },
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        },
                        {
                          "id": "18",
                          "__typename": "Movie",
                          "title": "Girl, Interrupted",
                          "releaseYear": 1999,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "27",
                              "__typename": "Actor",
                              "firstName": "Winona",
                              "lastName": "Ryder"
                            }
                          ]
                        },
                        {
                          "id": "19",
                          "__typename": "Movie",
                          "title": "Playing By Heart",
                          "releaseYear": 1998,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "28",
                              "__typename": "Actor",
                              "firstName": "Sean",
                              "lastName": "Connery"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "21",
                          "__typename": "Movie",
                          "title": "Beowulf",
                          "releaseYear": 2007,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "22",
                          "__typename": "Movie",
                          "title": "The Good Shepherd",
                          "releaseYear": 2006,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            }
                          ]
                        },
                        {
                          "id": "23",
                          "__typename": "Movie",
                          "title": "Shark Tale",
                          "releaseYear": 2004,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "15",
                      "__typename": "Actor",
                      "firstName": "Daniel",
                      "lastName": "Craig",
                      "movies": [
                        {
                          "id": "9",
                          "__typename": "Movie",
                          "title": "Lara Croft Tomb Raider",
                          "releaseYear": 2001,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "15",
                              "__typename": "Actor",
                              "firstName": "Daniel",
                              "lastName": "Craig"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "10",
                  "__typename": "Movie",
                  "title": "Wanted",
                  "releaseYear": 2008,
                  "genre": "ACTION",
                  "actors": [
                    {
                      "id": "2",
                      "__typename": "Actor",
                      "firstName": "Angelina",
                      "lastName": "Jolie",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "8",
                          "__typename": "Movie",
                          "title": "Maleficient",
                          "releaseYear": 2014,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "9",
                          "__typename": "Movie",
                          "title": "Lara Croft Tomb Raider",
                          "releaseYear": 2001,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "15",
                              "__typename": "Actor",
                              "firstName": "Daniel",
                              "lastName": "Craig"
                            }
                          ]
                        },
                        {
                          "id": "10",
                          "__typename": "Movie",
                          "title": "Wanted",
                          "releaseYear": 2008,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "16",
                              "__typename": "Actor",
                              "firstName": "James",
                              "lastName": "McAvoy"
                            },
                            {
                              "id": "17",
                              "__typename": "Actor",
                              "firstName": "Morgan",
                              "lastName": "Freeman"
                            }
                          ]
                        },
                        {
                          "id": "11",
                          "__typename": "Movie",
                          "title": "Salt",
                          "releaseYear": 2010,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "12",
                          "__typename": "Movie",
                          "title": "Gone in 60 Seconds",
                          "releaseYear": 2000,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "18",
                              "__typename": "Actor",
                              "firstName": "Nicholas",
                              "lastName": "Cage"
                            }
                          ]
                        },
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        },
                        {
                          "id": "14",
                          "__typename": "Movie",
                          "title": "The Tourist",
                          "releaseYear": 2010,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "23",
                              "__typename": "Actor",
                              "firstName": "Johnny",
                              "lastName": "Depp"
                            }
                          ]
                        },
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        },
                        {
                          "id": "18",
                          "__typename": "Movie",
                          "title": "Girl, Interrupted",
                          "releaseYear": 1999,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "27",
                              "__typename": "Actor",
                              "firstName": "Winona",
                              "lastName": "Ryder"
                            }
                          ]
                        },
                        {
                          "id": "19",
                          "__typename": "Movie",
                          "title": "Playing By Heart",
                          "releaseYear": 1998,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "28",
                              "__typename": "Actor",
                              "firstName": "Sean",
                              "lastName": "Connery"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "21",
                          "__typename": "Movie",
                          "title": "Beowulf",
                          "releaseYear": 2007,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "22",
                          "__typename": "Movie",
                          "title": "The Good Shepherd",
                          "releaseYear": 2006,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            }
                          ]
                        },
                        {
                          "id": "23",
                          "__typename": "Movie",
                          "title": "Shark Tale",
                          "releaseYear": 2004,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "16",
                      "__typename": "Actor",
                      "firstName": "James",
                      "lastName": "McAvoy",
                      "movies": [
                        {
                          "id": "10",
                          "__typename": "Movie",
                          "title": "Wanted",
                          "releaseYear": 2008,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "16",
                              "__typename": "Actor",
                              "firstName": "James",
                              "lastName": "McAvoy"
                            },
                            {
                              "id": "17",
                              "__typename": "Actor",
                              "firstName": "Morgan",
                              "lastName": "Freeman"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "17",
                      "__typename": "Actor",
                      "firstName": "Morgan",
                      "lastName": "Freeman",
                      "movies": [
                        {
                          "id": "10",
                          "__typename": "Movie",
                          "title": "Wanted",
                          "releaseYear": 2008,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "16",
                              "__typename": "Actor",
                              "firstName": "James",
                              "lastName": "McAvoy"
                            },
                            {
                              "id": "17",
                              "__typename": "Actor",
                              "firstName": "Morgan",
                              "lastName": "Freeman"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "11",
                  "__typename": "Movie",
                  "title": "Salt",
                  "releaseYear": 2010,
                  "genre": "ACTION",
                  "actors": [
                    {
                      "id": "2",
                      "__typename": "Actor",
                      "firstName": "Angelina",
                      "lastName": "Jolie",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "8",
                          "__typename": "Movie",
                          "title": "Maleficient",
                          "releaseYear": 2014,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "9",
                          "__typename": "Movie",
                          "title": "Lara Croft Tomb Raider",
                          "releaseYear": 2001,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "15",
                              "__typename": "Actor",
                              "firstName": "Daniel",
                              "lastName": "Craig"
                            }
                          ]
                        },
                        {
                          "id": "10",
                          "__typename": "Movie",
                          "title": "Wanted",
                          "releaseYear": 2008,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "16",
                              "__typename": "Actor",
                              "firstName": "James",
                              "lastName": "McAvoy"
                            },
                            {
                              "id": "17",
                              "__typename": "Actor",
                              "firstName": "Morgan",
                              "lastName": "Freeman"
                            }
                          ]
                        },
                        {
                          "id": "11",
                          "__typename": "Movie",
                          "title": "Salt",
                          "releaseYear": 2010,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "12",
                          "__typename": "Movie",
                          "title": "Gone in 60 Seconds",
                          "releaseYear": 2000,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "18",
                              "__typename": "Actor",
                              "firstName": "Nicholas",
                              "lastName": "Cage"
                            }
                          ]
                        },
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        },
                        {
                          "id": "14",
                          "__typename": "Movie",
                          "title": "The Tourist",
                          "releaseYear": 2010,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "23",
                              "__typename": "Actor",
                              "firstName": "Johnny",
                              "lastName": "Depp"
                            }
                          ]
                        },
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        },
                        {
                          "id": "18",
                          "__typename": "Movie",
                          "title": "Girl, Interrupted",
                          "releaseYear": 1999,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "27",
                              "__typename": "Actor",
                              "firstName": "Winona",
                              "lastName": "Ryder"
                            }
                          ]
                        },
                        {
                          "id": "19",
                          "__typename": "Movie",
                          "title": "Playing By Heart",
                          "releaseYear": 1998,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "28",
                              "__typename": "Actor",
                              "firstName": "Sean",
                              "lastName": "Connery"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "21",
                          "__typename": "Movie",
                          "title": "Beowulf",
                          "releaseYear": 2007,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "22",
                          "__typename": "Movie",
                          "title": "The Good Shepherd",
                          "releaseYear": 2006,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            }
                          ]
                        },
                        {
                          "id": "23",
                          "__typename": "Movie",
                          "title": "Shark Tale",
                          "releaseYear": 2004,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "12",
                  "__typename": "Movie",
                  "title": "Gone in 60 Seconds",
                  "releaseYear": 2000,
                  "genre": "ACTION",
                  "actors": [
                    {
                      "id": "2",
                      "__typename": "Actor",
                      "firstName": "Angelina",
                      "lastName": "Jolie",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "8",
                          "__typename": "Movie",
                          "title": "Maleficient",
                          "releaseYear": 2014,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "9",
                          "__typename": "Movie",
                          "title": "Lara Croft Tomb Raider",
                          "releaseYear": 2001,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "15",
                              "__typename": "Actor",
                              "firstName": "Daniel",
                              "lastName": "Craig"
                            }
                          ]
                        },
                        {
                          "id": "10",
                          "__typename": "Movie",
                          "title": "Wanted",
                          "releaseYear": 2008,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "16",
                              "__typename": "Actor",
                              "firstName": "James",
                              "lastName": "McAvoy"
                            },
                            {
                              "id": "17",
                              "__typename": "Actor",
                              "firstName": "Morgan",
                              "lastName": "Freeman"
                            }
                          ]
                        },
                        {
                          "id": "11",
                          "__typename": "Movie",
                          "title": "Salt",
                          "releaseYear": 2010,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "12",
                          "__typename": "Movie",
                          "title": "Gone in 60 Seconds",
                          "releaseYear": 2000,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "18",
                              "__typename": "Actor",
                              "firstName": "Nicholas",
                              "lastName": "Cage"
                            }
                          ]
                        },
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        },
                        {
                          "id": "14",
                          "__typename": "Movie",
                          "title": "The Tourist",
                          "releaseYear": 2010,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "23",
                              "__typename": "Actor",
                              "firstName": "Johnny",
                              "lastName": "Depp"
                            }
                          ]
                        },
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        },
                        {
                          "id": "18",
                          "__typename": "Movie",
                          "title": "Girl, Interrupted",
                          "releaseYear": 1999,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "27",
                              "__typename": "Actor",
                              "firstName": "Winona",
                              "lastName": "Ryder"
                            }
                          ]
                        },
                        {
                          "id": "19",
                          "__typename": "Movie",
                          "title": "Playing By Heart",
                          "releaseYear": 1998,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "28",
                              "__typename": "Actor",
                              "firstName": "Sean",
                              "lastName": "Connery"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "21",
                          "__typename": "Movie",
                          "title": "Beowulf",
                          "releaseYear": 2007,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "22",
                          "__typename": "Movie",
                          "title": "The Good Shepherd",
                          "releaseYear": 2006,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            }
                          ]
                        },
                        {
                          "id": "23",
                          "__typename": "Movie",
                          "title": "Shark Tale",
                          "releaseYear": 2004,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "18",
                      "__typename": "Actor",
                      "firstName": "Nicholas",
                      "lastName": "Cage",
                      "movies": [
                        {
                          "id": "12",
                          "__typename": "Movie",
                          "title": "Gone in 60 Seconds",
                          "releaseYear": 2000,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "18",
                              "__typename": "Actor",
                              "firstName": "Nicholas",
                              "lastName": "Cage"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "13",
                  "__typename": "Movie",
                  "title": "Kung Fu Panda",
                  "releaseYear": 2008,
                  "genre": "COMEDY",
                  "actors": [
                    {
                      "id": "2",
                      "__typename": "Actor",
                      "firstName": "Angelina",
                      "lastName": "Jolie",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "8",
                          "__typename": "Movie",
                          "title": "Maleficient",
                          "releaseYear": 2014,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "9",
                          "__typename": "Movie",
                          "title": "Lara Croft Tomb Raider",
                          "releaseYear": 2001,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "15",
                              "__typename": "Actor",
                              "firstName": "Daniel",
                              "lastName": "Craig"
                            }
                          ]
                        },
                        {
                          "id": "10",
                          "__typename": "Movie",
                          "title": "Wanted",
                          "releaseYear": 2008,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "16",
                              "__typename": "Actor",
                              "firstName": "James",
                              "lastName": "McAvoy"
                            },
                            {
                              "id": "17",
                              "__typename": "Actor",
                              "firstName": "Morgan",
                              "lastName": "Freeman"
                            }
                          ]
                        },
                        {
                          "id": "11",
                          "__typename": "Movie",
                          "title": "Salt",
                          "releaseYear": 2010,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "12",
                          "__typename": "Movie",
                          "title": "Gone in 60 Seconds",
                          "releaseYear": 2000,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "18",
                              "__typename": "Actor",
                              "firstName": "Nicholas",
                              "lastName": "Cage"
                            }
                          ]
                        },
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        },
                        {
                          "id": "14",
                          "__typename": "Movie",
                          "title": "The Tourist",
                          "releaseYear": 2010,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "23",
                              "__typename": "Actor",
                              "firstName": "Johnny",
                              "lastName": "Depp"
                            }
                          ]
                        },
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        },
                        {
                          "id": "18",
                          "__typename": "Movie",
                          "title": "Girl, Interrupted",
                          "releaseYear": 1999,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "27",
                              "__typename": "Actor",
                              "firstName": "Winona",
                              "lastName": "Ryder"
                            }
                          ]
                        },
                        {
                          "id": "19",
                          "__typename": "Movie",
                          "title": "Playing By Heart",
                          "releaseYear": 1998,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "28",
                              "__typename": "Actor",
                              "firstName": "Sean",
                              "lastName": "Connery"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "21",
                          "__typename": "Movie",
                          "title": "Beowulf",
                          "releaseYear": 2007,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "22",
                          "__typename": "Movie",
                          "title": "The Good Shepherd",
                          "releaseYear": 2006,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            }
                          ]
                        },
                        {
                          "id": "23",
                          "__typename": "Movie",
                          "title": "Shark Tale",
                          "releaseYear": 2004,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "19",
                      "__typename": "Actor",
                      "firstName": "Jack",
                      "lastName": "Black",
                      "movies": [
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        },
                        {
                          "id": "23",
                          "__typename": "Movie",
                          "title": "Shark Tale",
                          "releaseYear": 2004,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "20",
                      "__typename": "Actor",
                      "firstName": "Dustin",
                      "lastName": "Hoffman",
                      "movies": [
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "21",
                      "__typename": "Actor",
                      "firstName": "Jackie",
                      "lastName": "Chan",
                      "movies": [
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "22",
                      "__typename": "Actor",
                      "firstName": "Seth",
                      "lastName": "Rogen",
                      "movies": [
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "14",
                  "__typename": "Movie",
                  "title": "The Tourist",
                  "releaseYear": 2010,
                  "genre": "ROMANCE",
                  "actors": [
                    {
                      "id": "2",
                      "__typename": "Actor",
                      "firstName": "Angelina",
                      "lastName": "Jolie",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "8",
                          "__typename": "Movie",
                          "title": "Maleficient",
                          "releaseYear": 2014,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "9",
                          "__typename": "Movie",
                          "title": "Lara Croft Tomb Raider",
                          "releaseYear": 2001,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "15",
                              "__typename": "Actor",
                              "firstName": "Daniel",
                              "lastName": "Craig"
                            }
                          ]
                        },
                        {
                          "id": "10",
                          "__typename": "Movie",
                          "title": "Wanted",
                          "releaseYear": 2008,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "16",
                              "__typename": "Actor",
                              "firstName": "James",
                              "lastName": "McAvoy"
                            },
                            {
                              "id": "17",
                              "__typename": "Actor",
                              "firstName": "Morgan",
                              "lastName": "Freeman"
                            }
                          ]
                        },
                        {
                          "id": "11",
                          "__typename": "Movie",
                          "title": "Salt",
                          "releaseYear": 2010,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "12",
                          "__typename": "Movie",
                          "title": "Gone in 60 Seconds",
                          "releaseYear": 2000,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "18",
                              "__typename": "Actor",
                              "firstName": "Nicholas",
                              "lastName": "Cage"
                            }
                          ]
                        },
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        },
                        {
                          "id": "14",
                          "__typename": "Movie",
                          "title": "The Tourist",
                          "releaseYear": 2010,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "23",
                              "__typename": "Actor",
                              "firstName": "Johnny",
                              "lastName": "Depp"
                            }
                          ]
                        },
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        },
                        {
                          "id": "18",
                          "__typename": "Movie",
                          "title": "Girl, Interrupted",
                          "releaseYear": 1999,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "27",
                              "__typename": "Actor",
                              "firstName": "Winona",
                              "lastName": "Ryder"
                            }
                          ]
                        },
                        {
                          "id": "19",
                          "__typename": "Movie",
                          "title": "Playing By Heart",
                          "releaseYear": 1998,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "28",
                              "__typename": "Actor",
                              "firstName": "Sean",
                              "lastName": "Connery"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "21",
                          "__typename": "Movie",
                          "title": "Beowulf",
                          "releaseYear": 2007,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "22",
                          "__typename": "Movie",
                          "title": "The Good Shepherd",
                          "releaseYear": 2006,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            }
                          ]
                        },
                        {
                          "id": "23",
                          "__typename": "Movie",
                          "title": "Shark Tale",
                          "releaseYear": 2004,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "23",
                      "__typename": "Actor",
                      "firstName": "Johnny",
                      "lastName": "Depp",
                      "movies": [
                        {
                          "id": "14",
                          "__typename": "Movie",
                          "title": "The Tourist",
                          "releaseYear": 2010,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "23",
                              "__typename": "Actor",
                              "firstName": "Johnny",
                              "lastName": "Depp"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "17",
                  "__typename": "Movie",
                  "title": "Sky Captain and the World of Tomorrow",
                  "releaseYear": 2004,
                  "genre": "SCIFI",
                  "actors": [
                    {
                      "id": "2",
                      "__typename": "Actor",
                      "firstName": "Angelina",
                      "lastName": "Jolie",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "8",
                          "__typename": "Movie",
                          "title": "Maleficient",
                          "releaseYear": 2014,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "9",
                          "__typename": "Movie",
                          "title": "Lara Croft Tomb Raider",
                          "releaseYear": 2001,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "15",
                              "__typename": "Actor",
                              "firstName": "Daniel",
                              "lastName": "Craig"
                            }
                          ]
                        },
                        {
                          "id": "10",
                          "__typename": "Movie",
                          "title": "Wanted",
                          "releaseYear": 2008,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "16",
                              "__typename": "Actor",
                              "firstName": "James",
                              "lastName": "McAvoy"
                            },
                            {
                              "id": "17",
                              "__typename": "Actor",
                              "firstName": "Morgan",
                              "lastName": "Freeman"
                            }
                          ]
                        },
                        {
                          "id": "11",
                          "__typename": "Movie",
                          "title": "Salt",
                          "releaseYear": 2010,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "12",
                          "__typename": "Movie",
                          "title": "Gone in 60 Seconds",
                          "releaseYear": 2000,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "18",
                              "__typename": "Actor",
                              "firstName": "Nicholas",
                              "lastName": "Cage"
                            }
                          ]
                        },
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        },
                        {
                          "id": "14",
                          "__typename": "Movie",
                          "title": "The Tourist",
                          "releaseYear": 2010,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "23",
                              "__typename": "Actor",
                              "firstName": "Johnny",
                              "lastName": "Depp"
                            }
                          ]
                        },
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        },
                        {
                          "id": "18",
                          "__typename": "Movie",
                          "title": "Girl, Interrupted",
                          "releaseYear": 1999,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "27",
                              "__typename": "Actor",
                              "firstName": "Winona",
                              "lastName": "Ryder"
                            }
                          ]
                        },
                        {
                          "id": "19",
                          "__typename": "Movie",
                          "title": "Playing By Heart",
                          "releaseYear": 1998,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "28",
                              "__typename": "Actor",
                              "firstName": "Sean",
                              "lastName": "Connery"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "21",
                          "__typename": "Movie",
                          "title": "Beowulf",
                          "releaseYear": 2007,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "22",
                          "__typename": "Movie",
                          "title": "The Good Shepherd",
                          "releaseYear": 2006,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            }
                          ]
                        },
                        {
                          "id": "23",
                          "__typename": "Movie",
                          "title": "Shark Tale",
                          "releaseYear": 2004,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "25",
                      "__typename": "Actor",
                      "firstName": "Jude",
                      "lastName": "Law",
                      "movies": [
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "26",
                      "__typename": "Actor",
                      "firstName": "Gwyneth",
                      "lastName": "Paltrow",
                      "movies": [
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "18",
                  "__typename": "Movie",
                  "title": "Girl, Interrupted",
                  "releaseYear": 1999,
                  "genre": "DRAMA",
                  "actors": [
                    {
                      "id": "2",
                      "__typename": "Actor",
                      "firstName": "Angelina",
                      "lastName": "Jolie",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "8",
                          "__typename": "Movie",
                          "title": "Maleficient",
                          "releaseYear": 2014,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "9",
                          "__typename": "Movie",
                          "title": "Lara Croft Tomb Raider",
                          "releaseYear": 2001,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "15",
                              "__typename": "Actor",
                              "firstName": "Daniel",
                              "lastName": "Craig"
                            }
                          ]
                        },
                        {
                          "id": "10",
                          "__typename": "Movie",
                          "title": "Wanted",
                          "releaseYear": 2008,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "16",
                              "__typename": "Actor",
                              "firstName": "James",
                              "lastName": "McAvoy"
                            },
                            {
                              "id": "17",
                              "__typename": "Actor",
                              "firstName": "Morgan",
                              "lastName": "Freeman"
                            }
                          ]
                        },
                        {
                          "id": "11",
                          "__typename": "Movie",
                          "title": "Salt",
                          "releaseYear": 2010,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "12",
                          "__typename": "Movie",
                          "title": "Gone in 60 Seconds",
                          "releaseYear": 2000,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "18",
                              "__typename": "Actor",
                              "firstName": "Nicholas",
                              "lastName": "Cage"
                            }
                          ]
                        },
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        },
                        {
                          "id": "14",
                          "__typename": "Movie",
                          "title": "The Tourist",
                          "releaseYear": 2010,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "23",
                              "__typename": "Actor",
                              "firstName": "Johnny",
                              "lastName": "Depp"
                            }
                          ]
                        },
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        },
                        {
                          "id": "18",
                          "__typename": "Movie",
                          "title": "Girl, Interrupted",
                          "releaseYear": 1999,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "27",
                              "__typename": "Actor",
                              "firstName": "Winona",
                              "lastName": "Ryder"
                            }
                          ]
                        },
                        {
                          "id": "19",
                          "__typename": "Movie",
                          "title": "Playing By Heart",
                          "releaseYear": 1998,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "28",
                              "__typename": "Actor",
                              "firstName": "Sean",
                              "lastName": "Connery"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "21",
                          "__typename": "Movie",
                          "title": "Beowulf",
                          "releaseYear": 2007,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "22",
                          "__typename": "Movie",
                          "title": "The Good Shepherd",
                          "releaseYear": 2006,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            }
                          ]
                        },
                        {
                          "id": "23",
                          "__typename": "Movie",
                          "title": "Shark Tale",
                          "releaseYear": 2004,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "27",
                      "__typename": "Actor",
                      "firstName": "Winona",
                      "lastName": "Ryder",
                      "movies": [
                        {
                          "id": "18",
                          "__typename": "Movie",
                          "title": "Girl, Interrupted",
                          "releaseYear": 1999,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "27",
                              "__typename": "Actor",
                              "firstName": "Winona",
                              "lastName": "Ryder"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "19",
                  "__typename": "Movie",
                  "title": "Playing By Heart",
                  "releaseYear": 1998,
                  "genre": "ROMANCE",
                  "actors": [
                    {
                      "id": "2",
                      "__typename": "Actor",
                      "firstName": "Angelina",
                      "lastName": "Jolie",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "8",
                          "__typename": "Movie",
                          "title": "Maleficient",
                          "releaseYear": 2014,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "9",
                          "__typename": "Movie",
                          "title": "Lara Croft Tomb Raider",
                          "releaseYear": 2001,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "15",
                              "__typename": "Actor",
                              "firstName": "Daniel",
                              "lastName": "Craig"
                            }
                          ]
                        },
                        {
                          "id": "10",
                          "__typename": "Movie",
                          "title": "Wanted",
                          "releaseYear": 2008,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "16",
                              "__typename": "Actor",
                              "firstName": "James",
                              "lastName": "McAvoy"
                            },
                            {
                              "id": "17",
                              "__typename": "Actor",
                              "firstName": "Morgan",
                              "lastName": "Freeman"
                            }
                          ]
                        },
                        {
                          "id": "11",
                          "__typename": "Movie",
                          "title": "Salt",
                          "releaseYear": 2010,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "12",
                          "__typename": "Movie",
                          "title": "Gone in 60 Seconds",
                          "releaseYear": 2000,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "18",
                              "__typename": "Actor",
                              "firstName": "Nicholas",
                              "lastName": "Cage"
                            }
                          ]
                        },
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        },
                        {
                          "id": "14",
                          "__typename": "Movie",
                          "title": "The Tourist",
                          "releaseYear": 2010,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "23",
                              "__typename": "Actor",
                              "firstName": "Johnny",
                              "lastName": "Depp"
                            }
                          ]
                        },
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        },
                        {
                          "id": "18",
                          "__typename": "Movie",
                          "title": "Girl, Interrupted",
                          "releaseYear": 1999,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "27",
                              "__typename": "Actor",
                              "firstName": "Winona",
                              "lastName": "Ryder"
                            }
                          ]
                        },
                        {
                          "id": "19",
                          "__typename": "Movie",
                          "title": "Playing By Heart",
                          "releaseYear": 1998,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "28",
                              "__typename": "Actor",
                              "firstName": "Sean",
                              "lastName": "Connery"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "21",
                          "__typename": "Movie",
                          "title": "Beowulf",
                          "releaseYear": 2007,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "22",
                          "__typename": "Movie",
                          "title": "The Good Shepherd",
                          "releaseYear": 2006,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            }
                          ]
                        },
                        {
                          "id": "23",
                          "__typename": "Movie",
                          "title": "Shark Tale",
                          "releaseYear": 2004,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "28",
                      "__typename": "Actor",
                      "firstName": "Sean",
                      "lastName": "Connery",
                      "movies": [
                        {
                          "id": "19",
                          "__typename": "Movie",
                          "title": "Playing By Heart",
                          "releaseYear": 1998,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "28",
                              "__typename": "Actor",
                              "firstName": "Sean",
                              "lastName": "Connery"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "20",
                  "__typename": "Movie",
                  "title": "By the Sea",
                  "releaseYear": 2015,
                  "genre": "ROMANCE",
                  "actors": [
                    {
                      "id": "1",
                      "__typename": "Actor",
                      "firstName": "Brad",
                      "lastName": "Pitt",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "2",
                          "__typename": "Movie",
                          "title": "Fight Club",
                          "releaseYear": 1999,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "4",
                              "__typename": "Actor",
                              "firstName": "Edward",
                              "lastName": "Norton"
                            },
                            {
                              "id": "5",
                              "__typename": "Actor",
                              "firstName": "Helena",
                              "lastName": "Bonharm Carter"
                            }
                          ]
                        },
                        {
                          "id": "3",
                          "__typename": "Movie",
                          "title": "Troy",
                          "releaseYear": 2004,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "6",
                              "__typename": "Actor",
                              "firstName": "Orlando",
                              "lastName": "Bloom"
                            }
                          ]
                        },
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "5",
                          "__typename": "Movie",
                          "title": "Once Upon a Time in Hollywood",
                          "releaseYear": 2019,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "3",
                              "__typename": "Actor",
                              "firstName": "Leonardo",
                              "lastName": "Dicaprio"
                            },
                            {
                              "id": "10",
                              "__typename": "Actor",
                              "firstName": "Margot",
                              "lastName": "Robbie"
                            }
                          ]
                        },
                        {
                          "id": "6",
                          "__typename": "Movie",
                          "title": "Moneyball",
                          "releaseYear": 2011,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "11",
                              "__typename": "Actor",
                              "firstName": "Jonah",
                              "lastName": "Hill"
                            },
                            {
                              "id": "12",
                              "__typename": "Actor",
                              "firstName": "Philip",
                              "lastName": "Seymour Hoffman"
                            },
                            {
                              "id": "13",
                              "__typename": "Actor",
                              "firstName": "Chris",
                              "lastName": "Pratt"
                            }
                          ]
                        },
                        {
                          "id": "7",
                          "__typename": "Movie",
                          "title": "Ad Astra",
                          "releaseYear": 2019,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "14",
                              "__typename": "Actor",
                              "firstName": "Tommy Lee",
                              "lastName": "Jones"
                            }
                          ]
                        },
                        {
                          "id": "15",
                          "__typename": "Movie",
                          "title": "World War Z",
                          "releaseYear": 2013,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            }
                          ]
                        },
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "2",
                      "__typename": "Actor",
                      "firstName": "Angelina",
                      "lastName": "Jolie",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "8",
                          "__typename": "Movie",
                          "title": "Maleficient",
                          "releaseYear": 2014,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "9",
                          "__typename": "Movie",
                          "title": "Lara Croft Tomb Raider",
                          "releaseYear": 2001,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "15",
                              "__typename": "Actor",
                              "firstName": "Daniel",
                              "lastName": "Craig"
                            }
                          ]
                        },
                        {
                          "id": "10",
                          "__typename": "Movie",
                          "title": "Wanted",
                          "releaseYear": 2008,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "16",
                              "__typename": "Actor",
                              "firstName": "James",
                              "lastName": "McAvoy"
                            },
                            {
                              "id": "17",
                              "__typename": "Actor",
                              "firstName": "Morgan",
                              "lastName": "Freeman"
                            }
                          ]
                        },
                        {
                          "id": "11",
                          "__typename": "Movie",
                          "title": "Salt",
                          "releaseYear": 2010,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "12",
                          "__typename": "Movie",
                          "title": "Gone in 60 Seconds",
                          "releaseYear": 2000,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "18",
                              "__typename": "Actor",
                              "firstName": "Nicholas",
                              "lastName": "Cage"
                            }
                          ]
                        },
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        },
                        {
                          "id": "14",
                          "__typename": "Movie",
                          "title": "The Tourist",
                          "releaseYear": 2010,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "23",
                              "__typename": "Actor",
                              "firstName": "Johnny",
                              "lastName": "Depp"
                            }
                          ]
                        },
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        },
                        {
                          "id": "18",
                          "__typename": "Movie",
                          "title": "Girl, Interrupted",
                          "releaseYear": 1999,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "27",
                              "__typename": "Actor",
                              "firstName": "Winona",
                              "lastName": "Ryder"
                            }
                          ]
                        },
                        {
                          "id": "19",
                          "__typename": "Movie",
                          "title": "Playing By Heart",
                          "releaseYear": 1998,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "28",
                              "__typename": "Actor",
                              "firstName": "Sean",
                              "lastName": "Connery"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "21",
                          "__typename": "Movie",
                          "title": "Beowulf",
                          "releaseYear": 2007,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "22",
                          "__typename": "Movie",
                          "title": "The Good Shepherd",
                          "releaseYear": 2006,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            }
                          ]
                        },
                        {
                          "id": "23",
                          "__typename": "Movie",
                          "title": "Shark Tale",
                          "releaseYear": 2004,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "21",
                  "__typename": "Movie",
                  "title": "Beowulf",
                  "releaseYear": 2007,
                  "genre": "ADVENTURE",
                  "actors": [
                    {
                      "id": "2",
                      "__typename": "Actor",
                      "firstName": "Angelina",
                      "lastName": "Jolie",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "8",
                          "__typename": "Movie",
                          "title": "Maleficient",
                          "releaseYear": 2014,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "9",
                          "__typename": "Movie",
                          "title": "Lara Croft Tomb Raider",
                          "releaseYear": 2001,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "15",
                              "__typename": "Actor",
                              "firstName": "Daniel",
                              "lastName": "Craig"
                            }
                          ]
                        },
                        {
                          "id": "10",
                          "__typename": "Movie",
                          "title": "Wanted",
                          "releaseYear": 2008,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "16",
                              "__typename": "Actor",
                              "firstName": "James",
                              "lastName": "McAvoy"
                            },
                            {
                              "id": "17",
                              "__typename": "Actor",
                              "firstName": "Morgan",
                              "lastName": "Freeman"
                            }
                          ]
                        },
                        {
                          "id": "11",
                          "__typename": "Movie",
                          "title": "Salt",
                          "releaseYear": 2010,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "12",
                          "__typename": "Movie",
                          "title": "Gone in 60 Seconds",
                          "releaseYear": 2000,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "18",
                              "__typename": "Actor",
                              "firstName": "Nicholas",
                              "lastName": "Cage"
                            }
                          ]
                        },
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        },
                        {
                          "id": "14",
                          "__typename": "Movie",
                          "title": "The Tourist",
                          "releaseYear": 2010,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "23",
                              "__typename": "Actor",
                              "firstName": "Johnny",
                              "lastName": "Depp"
                            }
                          ]
                        },
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        },
                        {
                          "id": "18",
                          "__typename": "Movie",
                          "title": "Girl, Interrupted",
                          "releaseYear": 1999,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "27",
                              "__typename": "Actor",
                              "firstName": "Winona",
                              "lastName": "Ryder"
                            }
                          ]
                        },
                        {
                          "id": "19",
                          "__typename": "Movie",
                          "title": "Playing By Heart",
                          "releaseYear": 1998,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "28",
                              "__typename": "Actor",
                              "firstName": "Sean",
                              "lastName": "Connery"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "21",
                          "__typename": "Movie",
                          "title": "Beowulf",
                          "releaseYear": 2007,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "22",
                          "__typename": "Movie",
                          "title": "The Good Shepherd",
                          "releaseYear": 2006,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            }
                          ]
                        },
                        {
                          "id": "23",
                          "__typename": "Movie",
                          "title": "Shark Tale",
                          "releaseYear": 2004,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "24",
                      "__typename": "Actor",
                      "firstName": "Anthony",
                      "lastName": "Hopkins",
                      "movies": [
                        {
                          "id": "16",
                          "__typename": "Movie",
                          "title": "Legends of the Fall",
                          "releaseYear": 1994,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "21",
                          "__typename": "Movie",
                          "title": "Beowulf",
                          "releaseYear": 2007,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "22",
                  "__typename": "Movie",
                  "title": "The Good Shepherd",
                  "releaseYear": 2006,
                  "genre": "DRAMA",
                  "actors": [
                    {
                      "id": "2",
                      "__typename": "Actor",
                      "firstName": "Angelina",
                      "lastName": "Jolie",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "8",
                          "__typename": "Movie",
                          "title": "Maleficient",
                          "releaseYear": 2014,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "9",
                          "__typename": "Movie",
                          "title": "Lara Croft Tomb Raider",
                          "releaseYear": 2001,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "15",
                              "__typename": "Actor",
                              "firstName": "Daniel",
                              "lastName": "Craig"
                            }
                          ]
                        },
                        {
                          "id": "10",
                          "__typename": "Movie",
                          "title": "Wanted",
                          "releaseYear": 2008,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "16",
                              "__typename": "Actor",
                              "firstName": "James",
                              "lastName": "McAvoy"
                            },
                            {
                              "id": "17",
                              "__typename": "Actor",
                              "firstName": "Morgan",
                              "lastName": "Freeman"
                            }
                          ]
                        },
                        {
                          "id": "11",
                          "__typename": "Movie",
                          "title": "Salt",
                          "releaseYear": 2010,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "12",
                          "__typename": "Movie",
                          "title": "Gone in 60 Seconds",
                          "releaseYear": 2000,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "18",
                              "__typename": "Actor",
                              "firstName": "Nicholas",
                              "lastName": "Cage"
                            }
                          ]
                        },
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        },
                        {
                          "id": "14",
                          "__typename": "Movie",
                          "title": "The Tourist",
                          "releaseYear": 2010,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "23",
                              "__typename": "Actor",
                              "firstName": "Johnny",
                              "lastName": "Depp"
                            }
                          ]
                        },
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        },
                        {
                          "id": "18",
                          "__typename": "Movie",
                          "title": "Girl, Interrupted",
                          "releaseYear": 1999,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "27",
                              "__typename": "Actor",
                              "firstName": "Winona",
                              "lastName": "Ryder"
                            }
                          ]
                        },
                        {
                          "id": "19",
                          "__typename": "Movie",
                          "title": "Playing By Heart",
                          "releaseYear": 1998,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "28",
                              "__typename": "Actor",
                              "firstName": "Sean",
                              "lastName": "Connery"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "21",
                          "__typename": "Movie",
                          "title": "Beowulf",
                          "releaseYear": 2007,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "22",
                          "__typename": "Movie",
                          "title": "The Good Shepherd",
                          "releaseYear": 2006,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            }
                          ]
                        },
                        {
                          "id": "23",
                          "__typename": "Movie",
                          "title": "Shark Tale",
                          "releaseYear": 2004,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "8",
                      "__typename": "Actor",
                      "firstName": "Matt",
                      "lastName": "Damon",
                      "movies": [
                        {
                          "id": "4",
                          "__typename": "Movie",
                          "title": "Oceans 11",
                          "releaseYear": 2001,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "7",
                              "__typename": "Actor",
                              "firstName": "George",
                              "lastName": "Clooney"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            },
                            {
                              "id": "9",
                              "__typename": "Actor",
                              "firstName": "Julia",
                              "lastName": "Roberts"
                            }
                          ]
                        },
                        {
                          "id": "22",
                          "__typename": "Movie",
                          "title": "The Good Shepherd",
                          "releaseYear": 2006,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "23",
                  "__typename": "Movie",
                  "title": "Shark Tale",
                  "releaseYear": 2004,
                  "genre": "COMEDY",
                  "actors": [
                    {
                      "id": "2",
                      "__typename": "Actor",
                      "firstName": "Angelina",
                      "lastName": "Jolie",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "8",
                          "__typename": "Movie",
                          "title": "Maleficient",
                          "releaseYear": 2014,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "9",
                          "__typename": "Movie",
                          "title": "Lara Croft Tomb Raider",
                          "releaseYear": 2001,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "15",
                              "__typename": "Actor",
                              "firstName": "Daniel",
                              "lastName": "Craig"
                            }
                          ]
                        },
                        {
                          "id": "10",
                          "__typename": "Movie",
                          "title": "Wanted",
                          "releaseYear": 2008,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "16",
                              "__typename": "Actor",
                              "firstName": "James",
                              "lastName": "McAvoy"
                            },
                            {
                              "id": "17",
                              "__typename": "Actor",
                              "firstName": "Morgan",
                              "lastName": "Freeman"
                            }
                          ]
                        },
                        {
                          "id": "11",
                          "__typename": "Movie",
                          "title": "Salt",
                          "releaseYear": 2010,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "12",
                          "__typename": "Movie",
                          "title": "Gone in 60 Seconds",
                          "releaseYear": 2000,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "18",
                              "__typename": "Actor",
                              "firstName": "Nicholas",
                              "lastName": "Cage"
                            }
                          ]
                        },
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        },
                        {
                          "id": "14",
                          "__typename": "Movie",
                          "title": "The Tourist",
                          "releaseYear": 2010,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "23",
                              "__typename": "Actor",
                              "firstName": "Johnny",
                              "lastName": "Depp"
                            }
                          ]
                        },
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        },
                        {
                          "id": "18",
                          "__typename": "Movie",
                          "title": "Girl, Interrupted",
                          "releaseYear": 1999,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "27",
                              "__typename": "Actor",
                              "firstName": "Winona",
                              "lastName": "Ryder"
                            }
                          ]
                        },
                        {
                          "id": "19",
                          "__typename": "Movie",
                          "title": "Playing By Heart",
                          "releaseYear": 1998,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "28",
                              "__typename": "Actor",
                              "firstName": "Sean",
                              "lastName": "Connery"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "21",
                          "__typename": "Movie",
                          "title": "Beowulf",
                          "releaseYear": 2007,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "22",
                          "__typename": "Movie",
                          "title": "The Good Shepherd",
                          "releaseYear": 2006,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            }
                          ]
                        },
                        {
                          "id": "23",
                          "__typename": "Movie",
                          "title": "Shark Tale",
                          "releaseYear": 2004,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "19",
                      "__typename": "Actor",
                      "firstName": "Jack",
                      "lastName": "Black",
                      "movies": [
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        },
                        {
                          "id": "23",
                          "__typename": "Movie",
                          "title": "Shark Tale",
                          "releaseYear": 2004,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "id": "25",
              "__typename": "Actor",
              "firstName": "Jude",
              "lastName": "Law",
              "movies": [
                {
                  "id": "17",
                  "__typename": "Movie",
                  "title": "Sky Captain and the World of Tomorrow",
                  "releaseYear": 2004,
                  "genre": "SCIFI",
                  "actors": [
                    {
                      "id": "2",
                      "__typename": "Actor",
                      "firstName": "Angelina",
                      "lastName": "Jolie",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "8",
                          "__typename": "Movie",
                          "title": "Maleficient",
                          "releaseYear": 2014,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "9",
                          "__typename": "Movie",
                          "title": "Lara Croft Tomb Raider",
                          "releaseYear": 2001,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "15",
                              "__typename": "Actor",
                              "firstName": "Daniel",
                              "lastName": "Craig"
                            }
                          ]
                        },
                        {
                          "id": "10",
                          "__typename": "Movie",
                          "title": "Wanted",
                          "releaseYear": 2008,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "16",
                              "__typename": "Actor",
                              "firstName": "James",
                              "lastName": "McAvoy"
                            },
                            {
                              "id": "17",
                              "__typename": "Actor",
                              "firstName": "Morgan",
                              "lastName": "Freeman"
                            }
                          ]
                        },
                        {
                          "id": "11",
                          "__typename": "Movie",
                          "title": "Salt",
                          "releaseYear": 2010,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "12",
                          "__typename": "Movie",
                          "title": "Gone in 60 Seconds",
                          "releaseYear": 2000,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "18",
                              "__typename": "Actor",
                              "firstName": "Nicholas",
                              "lastName": "Cage"
                            }
                          ]
                        },
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        },
                        {
                          "id": "14",
                          "__typename": "Movie",
                          "title": "The Tourist",
                          "releaseYear": 2010,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "23",
                              "__typename": "Actor",
                              "firstName": "Johnny",
                              "lastName": "Depp"
                            }
                          ]
                        },
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        },
                        {
                          "id": "18",
                          "__typename": "Movie",
                          "title": "Girl, Interrupted",
                          "releaseYear": 1999,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "27",
                              "__typename": "Actor",
                              "firstName": "Winona",
                              "lastName": "Ryder"
                            }
                          ]
                        },
                        {
                          "id": "19",
                          "__typename": "Movie",
                          "title": "Playing By Heart",
                          "releaseYear": 1998,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "28",
                              "__typename": "Actor",
                              "firstName": "Sean",
                              "lastName": "Connery"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "21",
                          "__typename": "Movie",
                          "title": "Beowulf",
                          "releaseYear": 2007,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "22",
                          "__typename": "Movie",
                          "title": "The Good Shepherd",
                          "releaseYear": 2006,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            }
                          ]
                        },
                        {
                          "id": "23",
                          "__typename": "Movie",
                          "title": "Shark Tale",
                          "releaseYear": 2004,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "25",
                      "__typename": "Actor",
                      "firstName": "Jude",
                      "lastName": "Law",
                      "movies": [
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "26",
                      "__typename": "Actor",
                      "firstName": "Gwyneth",
                      "lastName": "Paltrow",
                      "movies": [
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "id": "26",
              "__typename": "Actor",
              "firstName": "Gwyneth",
              "lastName": "Paltrow",
              "movies": [
                {
                  "id": "17",
                  "__typename": "Movie",
                  "title": "Sky Captain and the World of Tomorrow",
                  "releaseYear": 2004,
                  "genre": "SCIFI",
                  "actors": [
                    {
                      "id": "2",
                      "__typename": "Actor",
                      "firstName": "Angelina",
                      "lastName": "Jolie",
                      "movies": [
                        {
                          "id": "1",
                          "__typename": "Movie",
                          "title": "Mr. and Mrs. Smith",
                          "releaseYear": 2005,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "8",
                          "__typename": "Movie",
                          "title": "Maleficient",
                          "releaseYear": 2014,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "9",
                          "__typename": "Movie",
                          "title": "Lara Croft Tomb Raider",
                          "releaseYear": 2001,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "15",
                              "__typename": "Actor",
                              "firstName": "Daniel",
                              "lastName": "Craig"
                            }
                          ]
                        },
                        {
                          "id": "10",
                          "__typename": "Movie",
                          "title": "Wanted",
                          "releaseYear": 2008,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "16",
                              "__typename": "Actor",
                              "firstName": "James",
                              "lastName": "McAvoy"
                            },
                            {
                              "id": "17",
                              "__typename": "Actor",
                              "firstName": "Morgan",
                              "lastName": "Freeman"
                            }
                          ]
                        },
                        {
                          "id": "11",
                          "__typename": "Movie",
                          "title": "Salt",
                          "releaseYear": 2010,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "12",
                          "__typename": "Movie",
                          "title": "Gone in 60 Seconds",
                          "releaseYear": 2000,
                          "genre": "ACTION",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "18",
                              "__typename": "Actor",
                              "firstName": "Nicholas",
                              "lastName": "Cage"
                            }
                          ]
                        },
                        {
                          "id": "13",
                          "__typename": "Movie",
                          "title": "Kung Fu Panda",
                          "releaseYear": 2008,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            },
                            {
                              "id": "20",
                              "__typename": "Actor",
                              "firstName": "Dustin",
                              "lastName": "Hoffman"
                            },
                            {
                              "id": "21",
                              "__typename": "Actor",
                              "firstName": "Jackie",
                              "lastName": "Chan"
                            },
                            {
                              "id": "22",
                              "__typename": "Actor",
                              "firstName": "Seth",
                              "lastName": "Rogen"
                            }
                          ]
                        },
                        {
                          "id": "14",
                          "__typename": "Movie",
                          "title": "The Tourist",
                          "releaseYear": 2010,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "23",
                              "__typename": "Actor",
                              "firstName": "Johnny",
                              "lastName": "Depp"
                            }
                          ]
                        },
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        },
                        {
                          "id": "18",
                          "__typename": "Movie",
                          "title": "Girl, Interrupted",
                          "releaseYear": 1999,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "27",
                              "__typename": "Actor",
                              "firstName": "Winona",
                              "lastName": "Ryder"
                            }
                          ]
                        },
                        {
                          "id": "19",
                          "__typename": "Movie",
                          "title": "Playing By Heart",
                          "releaseYear": 1998,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "28",
                              "__typename": "Actor",
                              "firstName": "Sean",
                              "lastName": "Connery"
                            }
                          ]
                        },
                        {
                          "id": "20",
                          "__typename": "Movie",
                          "title": "By the Sea",
                          "releaseYear": 2015,
                          "genre": "ROMANCE",
                          "actors": [
                            {
                              "id": "1",
                              "__typename": "Actor",
                              "firstName": "Brad",
                              "lastName": "Pitt"
                            },
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            }
                          ]
                        },
                        {
                          "id": "21",
                          "__typename": "Movie",
                          "title": "Beowulf",
                          "releaseYear": 2007,
                          "genre": "ADVENTURE",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "24",
                              "__typename": "Actor",
                              "firstName": "Anthony",
                              "lastName": "Hopkins"
                            }
                          ]
                        },
                        {
                          "id": "22",
                          "__typename": "Movie",
                          "title": "The Good Shepherd",
                          "releaseYear": 2006,
                          "genre": "DRAMA",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "8",
                              "__typename": "Actor",
                              "firstName": "Matt",
                              "lastName": "Damon"
                            }
                          ]
                        },
                        {
                          "id": "23",
                          "__typename": "Movie",
                          "title": "Shark Tale",
                          "releaseYear": 2004,
                          "genre": "COMEDY",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "19",
                              "__typename": "Actor",
                              "firstName": "Jack",
                              "lastName": "Black"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "25",
                      "__typename": "Actor",
                      "firstName": "Jude",
                      "lastName": "Law",
                      "movies": [
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "26",
                      "__typename": "Actor",
                      "firstName": "Gwyneth",
                      "lastName": "Paltrow",
                      "movies": [
                        {
                          "id": "17",
                          "__typename": "Movie",
                          "title": "Sky Captain and the World of Tomorrow",
                          "releaseYear": 2004,
                          "genre": "SCIFI",
                          "actors": [
                            {
                              "id": "2",
                              "__typename": "Actor",
                              "firstName": "Angelina",
                              "lastName": "Jolie"
                            },
                            {
                              "id": "25",
                              "__typename": "Actor",
                              "firstName": "Jude",
                              "lastName": "Law"
                            },
                            {
                              "id": "26",
                              "__typename": "Actor",
                              "firstName": "Gwyneth",
                              "lastName": "Paltrow"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
}
serverNormalizeTestVariables.arbitraryNestedScifiMoviesNormalized = {
  "~7~Movie": { id: "7", __typename: "Movie", title: "Ad Astra", releaseYear: 2019, genre: "SCIFI" },
  "~1~Actor": { id: "1", __typename: "Actor", firstName: "Brad", lastName: "Pitt" },
  "~1~Movie": {
    id: "1",
    __typename: "Movie",
    title: "Mr. and Mrs. Smith",
    releaseYear: 2005,
    genre: "COMEDY"
  },
  "~2~Actor": { id: "2", __typename: "Actor", firstName: "Angelina", lastName: "Jolie" },
  "~2~Movie": {
    id: "2",
    __typename: "Movie",
    title: "Fight Club",
    releaseYear: 1999,
    genre: "ACTION"
  },
  "~4~Actor": { id: "4", __typename: "Actor", firstName: "Edward", lastName: "Norton" },
  "~5~Actor": { id: "5", __typename: "Actor", firstName: "Helena", lastName: "Bonharm Carter" },
  "~3~Movie": { id: "3", __typename: "Movie", title: "Troy", releaseYear: 2004, genre: "ADVENTURE" },
  "~6~Actor": { id: "6", __typename: "Actor", firstName: "Orlando", lastName: "Bloom" },
  "~4~Movie": {
    id: "4",
    __typename: "Movie",
    title: "Oceans 11",
    releaseYear: 2001,
    genre: "ACTION"
  },
  "~7~Actor": { id: "7", __typename: "Actor", firstName: "George", lastName: "Clooney" },
  "~8~Actor": { id: "8", __typename: "Actor", firstName: "Matt", lastName: "Damon" },
  "~9~Actor": { id: "9", __typename: "Actor", firstName: "Julia", lastName: "Roberts" },
  "~5~Movie": {
    id: "5",
    __typename: "Movie",
    title: "Once Upon a Time in Hollywood",
    releaseYear: 2019,
    genre: "DRAMA"
  },
  "~3~Actor": { id: "3", __typename: "Actor", firstName: "Leonardo", lastName: "Dicaprio" },
  "~10~Actor": { id: "10", __typename: "Actor", firstName: "Margot", lastName: "Robbie" },
  "~6~Movie": {
    id: "6",
    __typename: "Movie",
    title: "Moneyball",
    releaseYear: 2011,
    genre: "DRAMA"
  },
  "~11~Actor": { id: "11", __typename: "Actor", firstName: "Jonah", lastName: "Hill" },
  "~12~Actor": { id: "12", __typename: "Actor", firstName: "Philip", lastName: "Seymour Hoffman" },
  "~13~Actor": { id: "13", __typename: "Actor", firstName: "Chris", lastName: "Pratt" },
  "~14~Actor": { id: "14", __typename: "Actor", firstName: "Tommy Lee", lastName: "Jones" },
  "~15~Movie": {
    id: "15",
    __typename: "Movie",
    title: "World War Z",
    releaseYear: 2013,
    genre: "SCIFI"
  },
  "~16~Movie": {
    id: "16",
    __typename: "Movie",
    title: "Legends of the Fall",
    releaseYear: 1994,
    genre: "ROMANCE"
  },
  "~24~Actor": { id: "24", __typename: "Actor", firstName: "Anthony", lastName: "Hopkins" },
  "~20~Movie": {
    id: "20",
    __typename: "Movie",
    title: "By the Sea",
    releaseYear: 2015,
    genre: "ROMANCE"
  },
  "~8~Movie": {
    id: "8",
    __typename: "Movie",
    title: "Maleficient",
    releaseYear: 2014,
    genre: "ADVENTURE"
  },
  "~9~Movie": {
    id: "9",
    __typename: "Movie",
    title: "Lara Croft Tomb Raider",
    releaseYear: 2001,
    genre: "ADVENTURE"
  },
  "~15~Actor": { id: "15", __typename: "Actor", firstName: "Daniel", lastName: "Craig" },
  "~10~Movie": { id: "10", __typename: "Movie", title: "Wanted", releaseYear: 2008, genre: "ACTION" },
  "~16~Actor": { id: "16", __typename: "Actor", firstName: "James", lastName: "McAvoy" },
  "~17~Actor": { id: "17", __typename: "Actor", firstName: "Morgan", lastName: "Freeman" },
  "~11~Movie": { id: "11", __typename: "Movie", title: "Salt", releaseYear: 2010, genre: "ACTION" },
  "~12~Movie": {
    id: "12",
    __typename: "Movie",
    title: "Gone in 60 Seconds",
    releaseYear: 2000,
    genre: "ACTION"
  },
  "~18~Actor": { id: "18", __typename: "Actor", firstName: "Nicholas", lastName: "Cage" },
  "~13~Movie": {
    id: "13",
    __typename: "Movie",
    title: "Kung Fu Panda",
    releaseYear: 2008,
    genre: "COMEDY"
  },
  "~19~Actor": { id: "19", __typename: "Actor", firstName: "Jack", lastName: "Black" },
  "~20~Actor": { id: "20", __typename: "Actor", firstName: "Dustin", lastName: "Hoffman" },
  "~21~Actor": { id: "21", __typename: "Actor", firstName: "Jackie", lastName: "Chan" },
  "~22~Actor": { id: "22", __typename: "Actor", firstName: "Seth", lastName: "Rogen" },
  "~14~Movie": {
    id: "14",
    __typename: "Movie",
    title: "The Tourist",
    releaseYear: 2010,
    genre: "ROMANCE"
  },
  "~23~Actor": { id: "23", __typename: "Actor", firstName: "Johnny", lastName: "Depp" },
  "~17~Movie": {
    id: "17",
    __typename: "Movie",
    title: "Sky Captain and the World of Tomorrow",
    releaseYear: 2004,
    genre: "SCIFI"
  },
  "~25~Actor": { id: "25", __typename: "Actor", firstName: "Jude", lastName: "Law" },
  "~26~Actor": { id: "26", __typename: "Actor", firstName: "Gwyneth", lastName: "Paltrow" },
  "~18~Movie": {
    id: "18",
    __typename: "Movie",
    title: "Girl, Interrupted",
    releaseYear: 1999,
    genre: "DRAMA"
  },
  "~27~Actor": { id: "27", __typename: "Actor", firstName: "Winona", lastName: "Ryder" },
  "~19~Movie": {
    id: "19",
    __typename: "Movie",
    title: "Playing By Heart",
    releaseYear: 1998,
    genre: "ROMANCE"
  },
  "~28~Actor": { id: "28", __typename: "Actor", firstName: "Sean", lastName: "Connery" },
  "~21~Movie": {
    id: "21",
    __typename: "Movie",
    title: "Beowulf",
    releaseYear: 2007,
    genre: "ADVENTURE"
  },
  "~22~Movie": {
    id: "22",
    __typename: "Movie",
    title: "The Good Shepherd",
    releaseYear: 2006,
    genre: "DRAMA"
  },
  "~23~Movie": {
    id: "23",
    __typename: "Movie",
    title: "Shark Tale",
    releaseYear: 2004,
    genre: "COMEDY"
  }
}