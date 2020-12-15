/**
 * NOTES:
 * 1.Assuming that all response objects will have an ID
 */
//==============================================================================
//INPUT:

const queryObject = {
  queries: [
    {
      name: 'movies',
      arguments: '(input:{genre:ACTION})',
      fields: {
        __typename: 'meta',
        id: 'scalar',
        title: 'scalar',
        genre: 'scalar',
        actors: {
          __typename: 'meta',
          id: 'scalar',
          firstName: 'scalar',
          lastName: 'scalar',
        },
      },
    },
    {
      name: 'actors',
      arguments: '',
      fields: {
        __typename: 'meta',
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
            friends: {
              __typename: 'Actor',
              id: '8',
              firstName: 'Alicia',
              favHobby: 'eating',
            },
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

  for (let curr in resultObj.data) {
    for (let i = 0; i < resultObj.data[curr].length; i++) {
      // pass current obj to createHash function to create  obj of hashes
      const hashObj = createHash(resultObj.data[curr][i]);
      // check if the hash object pair exists, if not create new key value pair
      // if it does exist merge the hash pair with the existing key value pair
      for (const hash in hashObj) {
        if (result[hash]) {
          Object.assign(result[hash], hashObj[hash]);
        } else {
          result[hash] = hashObj[hash];
        }
      }
    }
  }
  console.log(result);
  return result;
}

// creates the hashes for query requests and stores the reference has that will be stored in result
function createRootQuery(queryObj, resultObj) {
  const output = {};
  queryObj.queries.forEach((query) => {
    const name = query.name;
    const args = query.arguments;
    const queryHash = name + args;

    // iterate thru the array of current query response
    // and store the hash of that response in an array
    const resultArray = resultObj.data[name];
    const arrOfHashes = [];
    resultArray.forEach((obj) => {
      const id = obj.id || obj.ID || obj._id || obj._ID || obj.Id || obj._Id;
      arrOfHashes.push(obj.__typename + '~' + id);
    });
    //store the array of hashes associated with the queryHash
    output[queryHash] = arrOfHashes;
  });
  return output;
}

//returns a hash value pair of each response obj passed in
function createHash(obj, output = {}) {
  const id = obj.id || obj.ID || obj._id || obj._ID || obj.Id || obj._Id;
  //create hash
  const hash = obj.__typename + '~' + id;

  //if output doesnt have a key of hash create a new obj with that hash key
  if (!output[hash]) output[hash] = {};
  // iterate thru the fields in the current obj and check whether the current field
  // is __typename, if so continue to the next iteration
  for (const field in obj) {
    if (field === '__typename') continue;
    //check whether current field is not an array
    if (!Array.isArray(obj[field])) {
      //check whether current field is an object
      if (typeof obj[field] === 'object') {
        const id =
          obj[field].id ||
          obj[field].ID ||
          obj[field]._id ||
          obj[field]._ID ||
          obj[field].Id ||
          obj[field]._Id;
        output[hash][field] = [obj[field].__typename + '~' + id];
        output = createHash(obj[field], output);
      } else {
        output[hash][field] = obj[field];
      }
    } // if it's an array of objects, iterate thru the array
    // create a hash for each obj in the array and store it in an array
    // recursive call on the current obj in the array
    // store the output of the recursive call in output
    else {
      output[hash][field] = [];
      obj[field].forEach((obj) => {
        const id = obj.id || obj.ID || obj._id || obj._ID || obj.Id || obj._Id;
        const arrayHash = obj.__typename + '~' + id;
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
      friends: {
        __typename: 'Actor',
        id: '8',
        firstName: 'alicia',
        favHobby: 'eating',
      },
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

const result = normalizeResult(queryObject, resultObject);

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
