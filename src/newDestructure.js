/**
 * NOTES:
 * 1. For now we will record the arguments as a string unless we come up with an alternative argument
 * 2. We won't worry about arguments on fields for now
 * 3. We won't worry about aliases for now
 * 4. We won't worry about handling directives for now
 * 5. We wont' worry about fragments for now
 * 6. This function will assume that everything passed in can be a query or a mutation (not both).
 * 7. We won't handle variables for now, but we may very well find we need to
 * 8. We will handle only the meta field "__typename" for now
 * 9. What edge cases as far as field/query names do we have to worry about: special characters, apostrophes, etc???
 *
 */
// this function will destructure a query/mutation operation string into a query/mutation operation object
function destructureQueries(queryOperationStr) {
  // ignore operation name by finding the beginning of the query strings
  const startIndex = queryOperationStr.indexOf('{');
  const queryStrings = queryOperationStr.substring(startIndex).trim();
  // create an array of individual query strings
  const arrayOfQueryStrings = findQueryStrings(queryStrings);
  // define the type property name of the operation query/mutation
  const typePropName =
    queryOperationStr.trim().slice(0, 8) === 'mutation'
      ? 'mutations'
      : 'queries';
  // create a queries object from array of query strings
  const queriesObj = createQueriesObj(arrayOfQueryStrings, typePropName);
  return queriesObj;
}

// helper function to create an array of individual query strings from an operation string
function findQueryStrings(queryStrings) {
  const result = [];
  let queryStartIndex = 1;
  let bracePairs = 0;
  let parensPairs = 0;
  let insideQuery = false;
  // loop begins at index 1 to ignore the open brace
  for (let i = 1; i < queryStrings.length; i += 1) {
    const char = queryStrings[i];
    // flips insideQuery flag when at the beginning of query fields
    if (char === '{' && !bracePairs && !parensPairs) insideQuery = true;
    // bracket/parens counter
    if (char === '{') bracePairs += 1;
    if (char === '}') bracePairs -= 1;
    if (char === '(') parensPairs += 1;
    if (char === ')') parensPairs -= 1;
    // special operation for when we find the end of the query strings
    if (i === queryStrings.length - 1) {
      const queryStr = queryStrings.substring(queryStartIndex, i).trim();
      result.push(queryStr);
      break;
    }
    // finding the beginning of a subsequent query name will trigger storing the current query string and resetting variables
    if (char.match(/[^{}()\s]/) && !bracePairs && !parensPairs && insideQuery) {
      const queryStr = queryStrings.substring(queryStartIndex, i - 1).trim();
      result.push(queryStr);
      insideQuery = false;
      queryStartIndex = i;
      continue;
    }
  }
  return result;
}
// helper function to create a queries object from an array of query strings
function createQueriesObj(arrayOfQueryStrings, typePropName) {
  // define a new empty result object
  const queriesObj = {};
  queriesObj[typePropName] = [];
  // for each query string
  arrayOfQueryStrings.forEach((queryStr) => {
    // split the query string into multiple parts
    const queryObj = splitUpQueryStr(queryStr);
    // recursively convert the fields string to a fields object and update the fields property
    queryObj.fields = findQueryFields(queryObj.fields);
    // push the finished query object into the queries/mutations array on the result object
    queriesObj[typePropName].push(queryObj);
  });
  return queriesObj;
}
// helper function that returns an object with a query string split into multiple parts
function splitUpQueryStr(queryStr) {
  // creates new queryObj
  const queryObj = {};
  let parensPairs = 0;
  const argsStartIndex = queryStr.indexOf('(');
  const firstBraceIndex = queryStr.indexOf('{');
  // checks to see if there are no arguments
  if (argsStartIndex === -1 || firstBraceIndex < argsStartIndex) {
    queryObj.name = queryStr.substring(0, firstBraceIndex).trim();
    queryObj.arguments = '';
    queryObj.fields = queryStr.substring(firstBraceIndex);
    return queryObj;
  }
  // finds the query name string and assigns it
  queryObj.name = queryStr.substring(0, argsStartIndex).trim();
  // begin iterating through the queryString at the beginning of the arguments
  for (let i = argsStartIndex; i < queryStr.length; i += 1) {
    const char = queryStr[i];
    if (char === '(') parensPairs += 1;
    if (char === ')') parensPairs -= 1;
    // returns the arguments string when the matching closing parens is found
    if (char === ')' && !parensPairs) {
      let argsString = queryStr.substring(argsStartIndex, i + 1);
      // removes whitespace inside parens string;
      argsString = argsString.replace(/\s/g, '');
      // handles edge case where ther are no arguments inside the argument parens pair.
      if (argsString === '()') argsString = '';
      queryObj.arguments = argsString;
      queryObj.fields = queryStr.substring(i + 1).trim();
      return queryObj;
    }
  }
}

// helper function to recursively convert the fields string to a fields object
function findQueryFields(fieldsStr) {
  const fieldsObj = {};
  let fieldCache = '';
  let foundEndOfFieldName = false;
  // starts at index 1 to skip first open brace
  for (let i = 1; i < fieldsStr.length; i += 1) {
    const char = fieldsStr[i];
    // the brace indicates that we have found the fields object for a complex field
    if (char === '{') {
      const closingBraceIndex = findClosingBrace(fieldsStr, i);
      const complexFieldName = fieldCache;
      const complexFieldObjStr = fieldsStr.substring(i, closingBraceIndex + 1);
      fieldsObj[complexFieldName] = findQueryFields(complexFieldObjStr);
      // reset cache string
      fieldCache = '';
      // update index to resume iteration from
      i = closingBraceIndex;
      foundEndOfFieldName = false;
      continue;
    }
    // finding a whitespace character while the fieldCache has non-zero length indicates the end of a field name
    if (char.match(/\s/) && fieldCache.length) {
      foundEndOfFieldName = true;
      continue;
    }
    // finding a non-whitespace character after the end of fieldname indicates the field is scalar or meta
    if (char.match(/\S/) && foundEndOfFieldName) {
      fieldsObj[fieldCache] = fieldCache === '__typename' ? 'meta' : 'scalar';
      fieldCache = '';
      foundEndOfFieldName = false;
    }
    // break out when you find a closing brace
    if (char === '}') break;
    // adds current non-whitespace character in fieldCache
    if (char.match(/\S/)) fieldCache += char;
  }
  return fieldsObj;
}

// helper function to find the partner closing brace
function findClosingBrace(str, index) {
  let bracePairs = 0;
  // skips ahead 1 index to skip first brace
  for (let i = index + 1; i < str.length; i += 1) {
    const char = str[i];
    if (char === '}' && !bracePairs) return i;
    if (char === '{') bracePairs += 1;
    if (char === '}') bracePairs -= 1;
  }
}

const queryStr = `
  query AllMoviesAndGetActorById  {
    movies {
      __typename
      id
      title
      actors {
        __typename
        id
        firstName
      }
    }
    actor(id: 1) {
      __typename
      id
      firstName
      LastName
    }
  }
`;
console.log(destructureQueries(queryStr));

const ALL_ACTION_MOVIES_AND_ALL_ACTORS = `
  query AllActionMoviesAndAllActors {
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
  }
`;

const result = destructureQueries(ALL_ACTION_MOVIES_AND_ALL_ACTORS);

const testResult = {
  queries: [
    {
      name: 'movies',
      arguments: '(input:{genre:ACTION})',
      fields: {
        __typename: 'meta',
        id: 'scalar',
        title: 'scalar',
        genre: 'scalar',
        actors: { id: 'scalar', firstName: 'scalar', lastName: 'scalar' },
      },
    },
    {
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
const mutation = `
mutation DeleteMovie {
  deleteMovie(id: 4) {
    __typename
    id
  }
}
`;
const mutationTestResult = {
  mutations: [
    {
      name: 'deleteMovie',
      arguments: '(id:4)',
      fields: { __typename: 'meta', id: 'scalar' },
    },
  ],
};
const mutationResult = destructureQueries(mutation);
console.log(
  JSON.stringify(mutationTestResult) === JSON.stringify(mutationResult)
); //true
console.log(JSON.stringify(testResult) === JSON.stringify(result)); // true
export default destructureQueries;
