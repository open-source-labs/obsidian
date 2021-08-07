/** @format */

// this isn't really javascript

/// querys for ASTdestructure
/*

*/

//query
const testsObj = {};

testsObj.query1 = {
  query: `
    query {
    Scifi : movies (input:{genre:SCIFI}){
          id
          __typename
          title
          releaseYear
          genre
            actors {
              id
              __typename
              firstName
              lastName
                 }
            }
     Adventure: movies (input:{genre:ADVENTURE}){
            id
          __typename
          title
          releaseYear
          genre
           actors {
              id
              __typename
              firstName
              lastName
                 }
             }
        Funky: actors {
           id
            __typename
           firstName
           lastName
      }
  }
`,
};
testsObj.query2 = {
  query: `
      query {
      Scifi : movies (input:{genre:SCIFI}){
            id
            __typename
            title
            releaseYear
            genre
              actors {
                id
                __typename
                firstName
                lastName
                   }
              }
       Adventure: movies (input:{genre:ADVENTURE}){
              id
            __typename
            title
            releaseYear
            genre
             actors {
                id
                __typename
                firstName
                lastName
                   }
               }
          actors (input:{film:1}) @include(if:true) @skip(if:false){
             id
              __typename
             firstName
             lastName
        }
    }
  `,
};
//expected response format:
// const generalResponse =
// {
//     data: {
//         OperationDefinition.selectionSet.selections[0].alias.value
//         || OperationDefinition.selectionSet.selections[0].name.value

//     }
// }

////response

testsObj.resp1 = {
  data: {
    Scifi: [
      {
        id: "7",
        __typename: "Movie",
        title: "Ad Astra",
        releaseYear: 2019,
        genre: "SCIFI",
        actors: [
          {
            id: "1",
            __typename: "Actor",
            firstName: "Brad",
            lastName: "Pitt",
          },
          {
            id: "14",
            __typename: "Actor",
            firstName: "Tommy Lee",
            lastName: "Jones",
          },
        ],
      },
      {
        id: "15",
        __typename: "Movie",
        title: "World War Z",
        releaseYear: 2013,
        genre: "SCIFI",
        actors: [
          {
            id: "1",
            __typename: "Actor",
            firstName: "Brad",
            lastName: "Pitt",
          },
        ],
      },
      {
        id: "17",
        __typename: "Movie",
        title: "Sky Captain and the World of Tomorrow",
        releaseYear: 2004,
        genre: "SCIFI",
        actors: [
          {
            id: "2",
            __typename: "Actor",
            firstName: "Angelina",
            lastName: "Jolie",
          },
          {
            id: "25",
            __typename: "Actor",
            firstName: "Jude",
            lastName: "Law",
          },
          {
            id: "26",
            __typename: "Actor",
            firstName: "Gwyneth",
            lastName: "Paltrow",
          },
        ],
      },
    ],
    Adventure: [
      {
        id: "3",
        __typename: "Movie",
        title: "Troy",
        releaseYear: 2004,
        genre: "ADVENTURE",
        actors: [
          {
            id: "1",
            __typename: "Actor",
            firstName: "Brad",
            lastName: "Pitt",
          },
          {
            id: "6",
            __typename: "Actor",
            firstName: "Orlando",
            lastName: "Bloom",
          },
        ],
      },
      {
        id: "8",
        __typename: "Movie",
        title: "Maleficient",
        releaseYear: 2014,
        genre: "ADVENTURE",
        actors: [
          {
            id: "2",
            __typename: "Actor",
            firstName: "Angelina",
            lastName: "Jolie",
          },
        ],
      },
      {
        id: "9",
        __typename: "Movie",
        title: "Lara Croft Tomb Raider",
        releaseYear: 2001,
        genre: "ADVENTURE",
        actors: [
          {
            id: "2",
            __typename: "Actor",
            firstName: "Angelina",
            lastName: "Jolie",
          },
          {
            id: "15",
            __typename: "Actor",
            firstName: "Daniel",
            lastName: "Craig",
          },
        ],
      },
      {
        id: "21",
        __typename: "Movie",
        title: "Beowulf",
        releaseYear: 2007,
        genre: "ADVENTURE",
        actors: [
          {
            id: "2",
            __typename: "Actor",
            firstName: "Angelina",
            lastName: "Jolie",
          },
          {
            id: "24",
            __typename: "Actor",
            firstName: "Anthony",
            lastName: "Hopkins",
          },
        ],
      },
    ],
    Funky: [
      {
        id: "1",
        __typename: "Actor",
        firstName: "Brad",
        lastName: "Pitt",
      },
      {
        id: "2",
        __typename: "Actor",
        firstName: "Angelina",
        lastName: "Jolie",
      },
      {
        id: "3",
        __typename: "Actor",
        firstName: "Leonardo",
        lastName: "Dicaprio",
      },
      {
        id: "4",
        __typename: "Actor",
        firstName: "Edward",
        lastName: "Norton",
      },
      {
        id: "5",
        __typename: "Actor",
        firstName: "Helena",
        lastName: "Bonharm Carter",
      },
      {
        id: "6",
        __typename: "Actor",
        firstName: "Orlando",
        lastName: "Bloom",
      },
      {
        id: "7",
        __typename: "Actor",
        firstName: "George",
        lastName: "Clooney",
      },
      {
        id: "8",
        __typename: "Actor",
        firstName: "Matt",
        lastName: "Damon",
      },
      {
        id: "9",
        __typename: "Actor",
        firstName: "Julia",
        lastName: "Roberts",
      },
      {
        id: "10",
        __typename: "Actor",
        firstName: "Margot",
        lastName: "Robbie",
      },
      {
        id: "11",
        __typename: "Actor",
        firstName: "Jonah",
        lastName: "Hill",
      },
      {
        id: "12",
        __typename: "Actor",
        firstName: "Philip",
        lastName: "Seymour Hoffman",
      },
      {
        id: "13",
        __typename: "Actor",
        firstName: "Chris",
        lastName: "Pratt",
      },
      {
        id: "14",
        __typename: "Actor",
        firstName: "Tommy Lee",
        lastName: "Jones",
      },
      {
        id: "15",
        __typename: "Actor",
        firstName: "Daniel",
        lastName: "Craig",
      },
      {
        id: "16",
        __typename: "Actor",
        firstName: "James",
        lastName: "McAvoy",
      },
      {
        id: "17",
        __typename: "Actor",
        firstName: "Morgan",
        lastName: "Freeman",
      },
      {
        id: "18",
        __typename: "Actor",
        firstName: "Nicholas",
        lastName: "Cage",
      },
      {
        id: "19",
        __typename: "Actor",
        firstName: "Jack",
        lastName: "Black",
      },
      {
        id: "20",
        __typename: "Actor",
        firstName: "Dustin",
        lastName: "Hoffman",
      },
      {
        id: "21",
        __typename: "Actor",
        firstName: "Jackie",
        lastName: "Chan",
      },
      {
        id: "22",
        __typename: "Actor",
        firstName: "Seth",
        lastName: "Rogen",
      },
      {
        id: "23",
        __typename: "Actor",
        firstName: "Johnny",
        lastName: "Depp",
      },
      {
        id: "24",
        __typename: "Actor",
        firstName: "Anthony",
        lastName: "Hopkins",
      },
      {
        id: "25",
        __typename: "Actor",
        firstName: "Jude",
        lastName: "Law",
      },
      {
        id: "26",
        __typename: "Actor",
        firstName: "Gwyneth",
        lastName: "Paltrow",
      },
      {
        id: "27",
        __typename: "Actor",
        firstName: "Winona",
        lastName: "Ryder",
      },
      {
        id: "28",
        __typename: "Actor",
        firstName: "Sean",
        lastName: "Connery",
      },
    ],
  },
};

testsObj.resp2 = {
  data: {
    Scifi: [
      {
        id: "7",
        __typename: "Movie",
        title: "Ad Astra",
        releaseYear: 2019,
        genre: "SCIFI",
        actors: [
          {
            id: "1",
            __typename: "Actor",
            firstName: "Brad",
            lastName: "Pitt",
          },
          {
            id: "14",
            __typename: "Actor",
            firstName: "Tommy Lee",
            lastName: "Jones",
          },
        ],
      },
      {
        id: "15",
        __typename: "Movie",
        title: "World War Z",
        releaseYear: 2013,
        genre: "SCIFI",
        actors: [
          {
            id: "1",
            __typename: "Actor",
            firstName: "Brad",
            lastName: "Pitt",
          },
        ],
      },
      {
        id: "17",
        __typename: "Movie",
        title: "Sky Captain and the World of Tomorrow",
        releaseYear: 2004,
        genre: "SCIFI",
        actors: [
          {
            id: "2",
            __typename: "Actor",
            firstName: "Angelina",
            lastName: "Jolie",
          },
          {
            id: "25",
            __typename: "Actor",
            firstName: "Jude",
            lastName: "Law",
          },
          {
            id: "26",
            __typename: "Actor",
            firstName: "Gwyneth",
            lastName: "Paltrow",
          },
        ],
      },
    ],
    Adventure: [
      {
        id: "3",
        __typename: "Movie",
        title: "Troy",
        releaseYear: 2004,
        genre: "ADVENTURE",
        actors: [
          {
            id: "1",
            __typename: "Actor",
            firstName: "Brad",
            lastName: "Pitt",
          },
          {
            id: "6",
            __typename: "Actor",
            firstName: "Orlando",
            lastName: "Bloom",
          },
        ],
      },
      {
        id: "8",
        __typename: "Movie",
        title: "Maleficient",
        releaseYear: 2014,
        genre: "ADVENTURE",
        actors: [
          {
            id: "2",
            __typename: "Actor",
            firstName: "Angelina",
            lastName: "Jolie",
          },
        ],
      },
      {
        id: "9",
        __typename: "Movie",
        title: "Lara Croft Tomb Raider",
        releaseYear: 2001,
        genre: "ADVENTURE",
        actors: [
          {
            id: "2",
            __typename: "Actor",
            firstName: "Angelina",
            lastName: "Jolie",
          },
          {
            id: "15",
            __typename: "Actor",
            firstName: "Daniel",
            lastName: "Craig",
          },
        ],
      },
      {
        id: "21",
        __typename: "Movie",
        title: "Beowulf",
        releaseYear: 2007,
        genre: "ADVENTURE",
        actors: [
          {
            id: "2",
            __typename: "Actor",
            firstName: "Angelina",
            lastName: "Jolie",
          },
          {
            id: "24",
            __typename: "Actor",
            firstName: "Anthony",
            lastName: "Hopkins",
          },
        ],
      },
    ],
    actors: [
      {
        id: "1",
        __typename: "Actor",
        firstName: "Brad",
        lastName: "Pitt",
      },
      {
        id: "2",
        __typename: "Actor",
        firstName: "Angelina",
        lastName: "Jolie",
      },
    ],
  },
};

export default testsObj;
