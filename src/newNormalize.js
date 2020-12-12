/**
 * NOTES:
 */
//==============================================================================
//INPUT:

const queryObject = {
  queries: [
    {
      name: "movies",
      arguments: "(input:{genre:ACTION})",
      fields: {
        __typename: "meta",
        id: "scalar",
        title: "scalar",
        genre: "scalar",
        actors: { id: "scalar", firstName: "scalar", lastName: "scalar" },
      },
    },
    {
      name: "actors",
      arguments: "",
      fields: {
        id: "scalar",
        firstName: "scalar",
        lastName: "scalar",
        films: {
          __typename: "meta",
          id: "scalar",
          title: "scalar",
        },
      },
    },
  ],
};

const resultObject = {
  data: {
    movies: [
      {
        __typename: "Movie",
        id: "1",
        title: "Indiana Jones and the Last Crusade",
        genre: "ACTION",
        actors: [{
          __typename: "Actor",
          id: "1",
          firstName: "Harrison",
          lastName: "Ford",
        }, {
          __typename: "Actor",
          id: "2",
          firstName: "Sean",
          lastName: "Connery",
        }],
      },
      {
        __typename: "Movie",
        id: "4",
        title: "Air Force One",
        genre: "ACTION",
        actors: [{
          __typename: "Actor",
          id: "1",
          firstName: "Harrison",
          lastName: "Ford",
        }, {
          __typename: "Actor",
          id: "5",
          firstName: "Gary",
          lastName: "Oldman",
        }],
      },
    ],
    actors: [
      {
        __typename: "Actor",
        id: "1",
        firstName: "Harrison",
        lastName: "Ford",
        films: [{
          __typename: "Movie",
          id: "1",
          title: "Indiana Jones and the Last Crusade",
        }, {
          __typename: "Movie",
          id: "2",
          title: "Empire Strikes Back",
        }, {
          __typename: "Movie",
          id: "3",
          title: "Witness",
        }, {
          __typename: "Movie",
          id: "4",
          title: "Air Force One",
        }],
      },
      {
        __typename: "Actor",
        id: "2",
        firstName: "Sean",
        lastName: "Connery",
        films: [{
          __typename: "Movie",
          id: "1",
          title: "Indian Jones and the Last Crusade",
        }],
      },
      {
        __typename: "Actor",
        id: "3",
        firstName: "Mark",
        lastName: "Hamill",
        films: [{
          __typename: "Movie",
          id: "2",
          title: "Empire Strikes Back",
        }],
      },
      {
        __typename: "Actor",
        id: "4",
        firstName: "Patti",
        lastName: "LuPone",
        films: [{
          __typename: "Movie",
          id: "3",
          title: "Witness",
        }],
      },
      {
        __typename: "Actor",
        id: "5",
        firstName: "Gary",
        lastName: "Oldman",
        films: [{
          __typename: "Movie",
          id: "4",
          title: "Air Force One",
        }],
      },
    ],
  },
};

//==========================================================

//Normalizes responses using the query object from destructure and the response object from
//the graphql request
export default async function normalizeResult(queryObj, resultObj) {
  //
}

//===========================================================
//OUTPUT

const output = normalizeResult(queryObject, resultObject);

//
const resultObj = {
  "movies(input:{genre:ACTION})": ["Movie~1", "Movie~4"],
  "actors": ["Actor~1", "Actor~2", "Actor~3", "Actor~4", "Actor~5"],
  "Movie~1": {
    id: "1",
    title: "Indiana Jones and the Last Crusade",
    actors: ["Actor~1", "Actor~2"],
    genre: "ACTION",
  },
  "Movie~4": {
    id: "4",
    title: "Air Force One",
    actors: ["Actor~1", "Actor~5"],
    genre: "ACTION",
  },
  "Actor~1": {
    id: "1",
    firstName: "Harrison",
    lastName: "Ford",
    films: ["Movie~1", "Movie~2", "Movie~3", "Movie~4"],
  },
  "Actor~2": {
    id: "2",
    firstName: "Sean",
    lastName: "Connery",
    films: ["Movie~1"],
  },
  "Actor~3": {
    id: "3",
    firstName: "Mark",
    lastName: "Hamill",
    films: ["Movie~2"],
  },
  "Actor~4": {
    id: "4",
    firstName: "Patti",
    lastName: "LuPone",
    films: ["Movie~3"],
  },
  "Actor~5": {
    id: "5",
    firstName: "Gary",
    lastName: "Oldman",
    films: ["Movie~4"],
  },
};
