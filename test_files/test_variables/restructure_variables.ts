export const test = {
  fragmentTestData0: {
    query:
      `query {
      movies(input: { genre: ACTION }) {
        __typename
        id
  
     }
        actors {
          id
          films {
            __typename
            id
            title
          }   
     }
    }
  `
  },

  fragmentResultData0:
    `query {
      movies(input: { genre: ACTION }) {
        __typename
        id
  
     }
        actors {
          id
          films {
            __typename
            id
            title
          }   
     }
    }`,

  fragmentTestData: {
    query:
      `query {
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
      }
      `
  },
  fragmentResultData:
    `query {
        movies(input: { genre: ACTION }) {
          __typename
          id
          title
          genre
       }
          actors {
            id
            films {
              __typename
              id
              title
            }   
            firstName
            lastName
       }
      
      }`,


  fragmentTestData2: {
    query:
       `query {
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
    }`
    
  },
  fragmentResultData2:
    `query {
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
          firstName
          lastName
     }
     title
     genre
     }    
    }`,

  fragmentTestData3: {
    query:
      `
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
  }`
  },

  fragmentResultData3: `
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

  singleVariableTestData:
  {
    variables: {
      "movieGenre": "ACTION"
    },
    query:
      `query AllActionMoviesAndAllActors ($movieGenre: String) {
        movies(input: {genre: $movieGenre}) {
          __typename
          id
          title
          genre
          actors {
            id
            firstName
            lastName
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
      }`

  },
  singleVariableTestResult:
    `query AllActionMoviesAndAllActors {
      movies(input: {genre: ACTION}) {
        __typename
        id
        title
        genre
        actors {
          id
          firstName
          lastName
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
    }`,

  multiVariableTestData:
  {
    variables: {
      "movieGenre": "ACTION",
      "actorID": "7"
    },
    query:
      `query AllActionMoviesAndAllActors ($movieGenre: String, $actorID: ID) {
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
      }`,
  },

  multiVariableTestResult:
    ` query AllActionMoviesAndAllActors {
      movies(genre: ACTION) {
        __typename
        id
        title
        genre
        actors {
          id
          firstName
          lastName
        }
     
      actors (actor: 7) {
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
    }`,
}