/**
 * NOTES:
 * 1. This function takes in a query string and returns a response object after reading the cache.
 * 2.This function will record the arguments as a string unless we come up with an alternative argument
 * 3. This function will assume that everything passed in is a query, not a mutation.
 * 4. This function accepts one query operation which contains one/multiples queries as input
 * 5. We won't worry about arguments on fields for now
 * 6. We won't worry about aliases for now
 * 7. We won't worry about handling directives for now
 * 8. We wont' worry about fragments for now
 * 9. We won't handle variables for now
 * 10. We will handle only the meta field "__typename" for now
 * 11. This function will return undefined if any of the field value is missing from the cache or/and if the query does not exist in the cache
 * 12. If a field value is marked as 'DELETED', it'll ignore the field and does not throw a cache miss.
 * 13. Edge cases: if not passed a query string, return undefined
 */
// Import newDestructure function
import destructureQueries from './newDestructure.js';

//* CRUD READ
export function readCache(queryOperationStr, cache) {
  if (typeof queryOperationStr !== 'string') return undefined;
  // destructure the query string into an object
  const queries = destructureQueries(queryOperationStr).queries;
  const responseObject = {};
  // iterate through each query in the input queries object
  for (const query in queries) {
    // get the entire str query from the name input query and arguments
    const rootQuery = queries[query].name.concat(queries[query].arguments);
    // match in ROOT_QUERY
    if (cache.ROOT_QUERY[rootQuery]) {
      // get the types to populate from the existent query in the cache
      const arrayTypes = cache.ROOT_QUERY[rootQuery];
      // invoke populateAllTypes and add data objects to the response object for each input query
      responseObject[queries[query].name] = populateAllTypes(
        arrayTypes,
        cache,
        queries[query].fields
      );
      if (!responseObject[queries[query].name]) return undefined;
      // no match with ROOT_QUERY return null or ...
    } else return undefined;
  }
  return { data: responseObject };
}

//* helper function that populates responseObject types with fields
export function populateAllTypes(allTypesFromQuery, cache, fields) {
  if (Array.isArray(allTypesFromQuery)) {
    // include the typename for each type
    const hyphenIdx = allTypesFromQuery[0].indexOf('~');
    const typeName = allTypesFromQuery[0].slice(0, hyphenIdx);
    return allTypesFromQuery.reduce((acc, type) => {
      // for each type from the input query, build the response object
      if (cache[type] === 'DELETED') return acc;
      const dataObj = {};
      for (const field in fields) {
        if (cache[type][field] === 'DELETED') continue;
        // for each field in the fields input query, add the corresponding value from the cache if the field is not another array of types
        if (!cache[type][field] && field !== '__typename') return undefined;
        else if (typeof fields[field] !== 'object') {
          // add the typename for the type
          if (field === '__typename') {
            dataObj[field] = typeName;
          } else dataObj[field] = cache[type][field];
        } else {
          // case where the field from the input query is an array of types, recursively invoke populateAllTypes
          dataObj[field] = populateAllTypes(
            cache[type][field],
            cache,
            fields[field]
          );
        }
      }
      // acc is an array of response object for each type
      acc.push(dataObj);
      return acc;
    }, []);
  }

  //* Case where allTypesFromQuery has only one type and is not an array but a single string
  if (cache[allTypesFromQuery] !== 'DELETED') {
    // include the typename for each type
    const hyphenIdx = allTypesFromQuery.indexOf('~');
    const typeName = allTypesFromQuery.slice(0, hyphenIdx);
    const dataObj = {};
    for (const field in fields) {
      if (cache[allTypesFromQuery][field] === 'DELETED') continue;
      if (!cache[allTypesFromQuery][field] && field !== '__typename')
        return undefined;
      else if (typeof fields[field] !== 'object') {
        // add the typename for the type
        if (field === '__typename') {
          dataObj[field] = typeName;
        } else dataObj[field] = cache[allTypesFromQuery][field];
      } else {
        dataObj[field] = populateAllTypes(
          cache[allTypesFromQuery][field],
          cache,
          fields[field]
        );
      }
    }
    return dataObj;
  }
}

//* TESTS:
// Cache example:
const cacheObject = {
  ROOT_QUERY: {
    'actor(id:1)': 'Actor~1',
    movies: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~4'],
    actors: ['Actor~1', 'Actor~2', 'Actor~3', 'Actor~4'],
    'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~4'],
  },
  // 'Movie~1': {
  //   id: '1',
  //   title: 'Indiana Jones and the Last Crusade',
  //   genre: 'ACTION',
  //   releaseYear: 1989,
  //   isFavorite: false,
  // },
  'Movie~1': 'DELETED',
  'Movie~2': {
    id: '2',
    title: 'Empire Strikes Back',
    actors: ['Actor~1', 'Actor~3'],
    releaseYear: 1980,
  },
  'Movie~3': {
    id: '3',
    title: 'Witness',
    actors: ['Actor~1', 'Actor~4'],
    releaseYear: 1985,
  },
  'Movie~4': {
    id: '4',
    title: 'Air Force One',
    actors: ['Actor~1', 'Actor~5'],
    genre: 'ACTION',
    releaseYear: 1997,
  },
  'Actor~1': 'DELETED',
  // 'Actor~1': { id: '1', firstName: 'Harrison', lastName: 'Ford' },
  'Actor~2': { id: '2', firstName: 'Sean' },
  'Actor~3': { id: '3', firstName: 'Mark' },
  'Actor~4': { id: '4', firstName: 'Patti' },
  'Actor~5': { id: '5', firstName: 'Gary' },
};
//* input before destructuring
const queryStr = `
  query AllActionMoviesAndAllActors {
    movies(input: { genre: ACTION }) {
      __typename
      id
      title
      genre
      actors {
        __typename
        id
        firstName
      }
    }
    actors {
      __typename
      id
      firstName
    }
  }
  }
`;

//* Response example after readCache()
const testResponse = {
  data: {
    movies: [
      // {
      //   __typename: 'Movie',
      //   id: '1',
      //   title: 'Indiana Jones and the Last Crusade',
      //   genre: 'ACTION',
      //   actors: [
      //     {
      //       __typename: 'Actor',
      //       id: '1',
      //       firstName: 'Harrison',
      //     },
      //     {
      //       __typename: 'Actor',
      //       id: '2',
      //       firstName: 'Sean',
      //     },
      //   ],
      // },
      {
        __typename: 'Movie',
        id: '4',
        title: 'Air Force One',
        genre: 'ACTION',
        actors: [
          // {
          //   __typename: 'Actor',
          //   id: '1',
          //   firstName: 'Harrison',
          // },
          {
            __typename: 'Actor',
            id: '5',
            firstName: 'Gary',
          },
        ],
      },
    ],
    actors: [
      // {
      //   __typename: 'Actor',
      //   id: '1',
      //   firstName: 'Harrison',
      // },
      { __typename: 'Actor', id: '2', firstName: 'Sean' },
      { __typename: 'Actor', id: '3', firstName: 'Mark' },
      { __typename: 'Actor', id: '4', firstName: 'Patti' },
    ],
  },
};
const response = readCache(queryStr, cacheObject);

console.log(JSON.stringify(response) === JSON.stringify(testResponse)); // true

const oneTypeQuery = `
  query getActorById {
    actor(id: 1) {
      __typename
      id
      firstName
      lastName
    }
  }
`;
const respGetActorById = {
  data: {
    actor: [
      {
        __typename: 'Actor',
        id: '1',
        firstName: 'Harrison',
        lastName: 'Ford',
      },
    ],
  },
};

console.log(undefined === JSON.stringify(readCache(oneTypeQuery, cacheObject))); // true
