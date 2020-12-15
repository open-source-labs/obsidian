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
            friends: [],
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

// Normalizes responses using the query object from destructure and the response object from
// the graphql request
export default function normalizeResult(queryObj, resultObj) {
  // Object to hold normalized obj
  const result = {};
  // creates a stringified version of query request and stores it in ROOT_QUERY key
  result['ROOT_QUERY'] = createRootQuery(queryObj, resultObj);

  let resultKeys = Object.keys(resultObj.data);
  const hashes = [];

  // stores appropriate response obj with hashed __typename and id
  for (let i = 0; i < resultKeys.length; i++) {
    // curr assigned the value of the response of that query
    const curr = resultObj.data[resultKeys[i]];
    for (let j = 0; j < curr.length; j++) {
      // pass current obj to createHash function to create hash and appropriate response obj
      const hashObj = createHash(curr[j]);
      // store the output of createHash in output cache obj
      for (const hash in hashObj) {
        if (result[hash]) {
          Object.assign(result[hash], hashObj[hash])
        } else{
          result[hash] = hashObj[hash]
        }
      }
    }
  }
  console.log(result);
  return result;
}

// checks if the object in innerObj exsits within output, if not create new reference in the output cache

// creates the hashes for query requests and stores the references with the appropriate hashes in an object
function createRootQuery(queryObj, resultObj) {
  const output = {};
  queryObj.queries.forEach((query) => {
    const name = query.name;
    const args = query.arguments;
    const queryHash = name + args;
    //create hashes that will be store the appropriate root query value
    const resultArray = resultObj.data[name];
    const arrOfHashes = [];
    resultArray.forEach((obj) => {
      arrOfHashes.push(obj.__typename + '~' + obj.id);
    });
    //store the hashes associated with the query request and arguement
    output[queryHash] = arrOfHashes;
  });
  return output;
}

//creates hashes and checks for complex fields
//returns hashes, appropriate obj, and innerObj if a complex field exists
function createHash(obj, output = {}) {
  const hash = obj.__typename + '~' + obj.id;
  if (!output[hash]) output[hash] = {};
  for (const field in obj) {
    if (field === '__typename') continue;
    if (!Array.isArray(obj[field])) {
      output[hash][field] = obj[field];
    } else {
      // create an array of hashes
      output[hash][field] = [];
      obj[field].forEach((obj) => {
        const arrayHash = obj.__typename + '~' + obj.id;
        output[hash][field].push(arrayHash);
        output = createHash(obj, output);
      });
      // store hashed values in output
    }
  }
  return output;
}

// ================================

const hashInput = {
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
};

const hashOutput = {
  'Movie~1': {
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
  'Actor~2': {
    id: '2',
    firstName: 'Sean',
    lastName: 'Connery',
    favHobby: 'fishing',
    friends: [],
  },
};

console.log(createHash(hashInput));

// //creates hash:obj pair for complex fields
// function innerQuery(innerArray) {
//   let output = [];
//   let obj = [];
//   let innerInfo = [];
//   for (let i = 0; i < innerArray.length; i++) {
//     const hashCreated = createHash(innerArray[i]);
//     obj.push(hashCreated.output);

//     output.push(hashCreated.hash);
//     if (hashCreated.innerOutput) {
//       innerInfo.push(hashCreated.innerOutput);
//     }
//   }
//   console.log(innerInfo);
//   return {output, obj, innerInfo};
// }

//

//===========================================================
//OUTPUT

<<<<<<< HEAD
const result = normalizeResult(queryObject, resultObject);
console.log(result)
=======
const output = normalizeResult(queryObject, resultObject);
>>>>>>> c125c89a028a7c66b79850ccf074c2637f7a0440

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
