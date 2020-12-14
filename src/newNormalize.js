/**
 * NOTES:
 * 1.Assuming that all response objects will have an ID
 */
//==============================================================================
//INPUT:

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
        actors: {id: 'scalar', firstName: 'scalar', lastName: 'scalar'},
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

//==========================================================

//Normalizes responses using the query object from destructure and the response object from
//the graphql request
export default async function normalizeResult(queryObj, resultObj) {
  const output = {};
  if (!resultObj.data) return;

  let resultKeys = Object.keys(resultObj.data);
  const hashes = [];

  console.log(queryObj.queries[0]);
  let queriesKeys = Object.keys(queryObj.queries[0]);

  for (let i = 0; i < queryObj.queries; i++) {
    const queriesKeys = Object.keys(queryObj.queries[i]);
  }

  for (let i = 0; i < resultKeys.length; i++) {
    const curr = resultObj.data[resultKeys[i]];
    for (let j = 0; j < curr.length; j++) {
      const hash = createHash(curr[j]);
      output[hash.hash] = hash.output;
    }
  }
  console.log(output);
}

function createHash(obj) {
  let hash = obj.__typename + '~' + obj.id;
  let output = {};
  let innerOutput = {};
  for (let curr in obj) {
    if (!Array.isArray(obj[curr])) {
      if (curr !== '__typename') {
        output[curr] = obj[curr];
      }
    } else {
      const innerRes = innerQuery(obj[curr]);
      output[curr] = innerRes.output;
      for (let i = 0; i < innerRes.output.length; i++) {
        innerOutput[innerRes.output[i]] = innerRes.obj[i];
      }
      console.log(innerOutput);
    }
  }
  console.log(output);
  return {hash, output, innerOutput};
}

function innerQuery(innerArray) {
  let output = [];
  let obj = [];
  for (let i = 0; i < innerArray.length; i++) {
    const hashCreated = createHash(innerArray[i]);
    obj.push(hashCreated.output);

    output.push(hashCreated.hash);

    console.log(obj);
  }
  return {output, obj};
}

//

//===========================================================
//OUTPUT

const output = normalizeResult(queryObject, resultObject);

//
const resultObj = {
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
  'Movie:~2': {
    id: '2',
    title: 'Empire Strikes Back',
  },
  'Movie:~3': {
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
};
