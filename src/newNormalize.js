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
            friends: [],
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

//Normalizes responses using the query object from destructure and the response object from
//the graphql request
export default async function normalizeResult(queryObj, resultObj) {
  if (!resultObj.data) return;

  //Object to hold normalized obj
  const cache = {};

  //
  let resultKeys = Object.keys(resultObj.data);
  const hashes = [];

  //creates a stringified version of query request and stores it in ROOT_QUERY key
  cache['ROOT_QUERY'] = createRootQuery(queryObj, resultObj);

  //stores appropriate response obj with hashed __typename and id
  for (let i = 0; i < resultKeys.length; i++) {
    //curr assigned the value of the response of that query
    const curr = resultObj.data[resultKeys[i]];
    for (let j = 0; j < curr.length; j++) {
      //pass current obj to createHash function to create hash and appropriate response obj
      const hash = createHash(curr[j]);
      //store the output of createHash in output cache obj
      if (cache[hash.hash]){
        Object.assign(cache[hash.hash], hash.output)
      } else {
        cache[hash.hash] = hash.output
      }
      console.log(cache);
      
    }
  }
  console.log(cache);
  return cache;
}

//checks if the object in innerObj exsits within output, if not create new reference in the output cache
function checkAndInsert(innerObj, output) {
  for (let obj in innerObj) {
    if (!output[obj]) {
      output[obj] = innerObj[obj];
    } else {
      Object.assign(output[obj], innerObj[obj]);
    }
  }
}

//creates the hashes for query requests and stores the references with the appropriate hashes in an object
function createRootQuery(queryObj, resultObj) {
  let output = {};
  for (let i = 0; i < queryObj.queries.length; i++) {
    const name = queryObj.queries[i].name;
    const args = queryObj.queries[i].arguments;
    //create hashes that will be store the appropriate root query value
    const hashes = createHash(resultObj.data).output;
    console.log(hashes);

    //store the hashes associated with the query request and arguement
    output[name + args] = hashes[name];
  }
  console.log(output);
  return output;
}

//creates hashes and checks for complex fields
//returns hashes, appropriate obj, and innerObj if a complex field exists
function createHash(obj, output) {
  let hash = obj.__typename + '~' + obj.id;
  let output = {};

  // let innerOutput = {};
  for (let curr in obj) {
    //checks if the current value is an array
    if (!Array.isArray(obj[curr])) {
      //if not array and the curr key isn't __typename add to output obj
      if (curr !== '__typename') {
        output[curr] = obj[curr];
      }

      //if array, we create hashes and appropriate obj for those hashes
    } else {
      let nestedField = obj[curr];
      const hashArr = [];
      let hashObj = {};
      for (let i = 0; i < nestedField.length; i++) {
        let nestedHash = createHash(nestedField[i]);
        console.log(nestedHash.output);
        console.log(nestedHash.hash);
        hashArr.push(nestedHash.hash);
      }
      output[curr] = hashArr;
    }
  }
  console.log({hash, output});
  return {hash, output};
}

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
