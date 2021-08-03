/**
 * NOTES:
 * 1. For now we will record the arguments as a string unless we come up with an alternative argument
 * 3. We won't worry about aliases for now
 * 4. We won't worry about handling MULTIPLE directives for now (both @skip and
 *
 * @format
 * @include) 5. We won't worry about fragments for now 6. This function will assume that everything passed in can be a query or a mutation (not both). 8. We will handle only the meta field "__typename" for now 9. What edge cases as far as field/query names do we have to worry about: special characters, apostrophes, etc??? 10. Directives-implementation doesn't handle fragment inclusion
 */

/* notes:
 boom get rid of vars
*/

// this function will destructure a query/mutation operation string into a query/mutation operation object
export function destructureQueries(queryOperationStr) {
  console.log("IN THE HOOOOOOOLE!");
  // Trims blocks of extra white space into a single white space for uniformity
  // of incoming queryOperationStrings
  queryOperationStr = queryOperationStr.replace(/\s+/g, " ").trim();

  // check if query has fragments

  // check if query has directives
  if (queryOperationStr.indexOf("@") !== -1) {
    // reassigns query string to handle directives
    queryOperationStr = destructureQueriesWithDirectives(queryOperationStr);
  }

  // ignore operation name by finding the beginning of the query strings
  const startIndex = queryOperationStr.indexOf("{");
  const queryStrings = queryOperationStr.substring(startIndex).trim();
  // create an array of individual query strings
  const arrayOfQueryStrings = findQueryStrings(queryStrings);
  // define the type property name of the operation query/mutation
  const typePropName =
    queryOperationStr.trim().slice(0, 8) === "mutation"
      ? "mutations"
      : "queries";
  // create a queries object from array of query strings
  const queriesObj = createQueriesObj(arrayOfQueryStrings, typePropName);

  return queriesObj;
}

// helper function to create an array of individual query strings from an operation string
export function findQueryStrings(queryStrings) {
  const result = [];
  let queryStartIndex = 1;
  let bracePairs = 0;
  let parensPairs = 0;
  let insideQuery = false;
  // loop begins at index 1 to ignore the open brace
  for (let i = 1; i < queryStrings.length; i += 1) {
    const char = queryStrings[i];
    // flips insideQuery flag when at the beginning of query fields
    if (char === "{" && !bracePairs && !parensPairs) insideQuery = true;
    // bracket/parens counter
    if (char === "{") bracePairs += 1;
    if (char === "}") bracePairs -= 1;
    if (char === "(") parensPairs += 1;
    if (char === ")") parensPairs -= 1;
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
export function createQueriesObj(arrayOfQueryStrings, typePropName) {
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
export function splitUpQueryStr(queryStr) {
  // creates new queryObj
  const queryObj = {};
  let parensPairs = 0;
  const argsStartIndex = queryStr.indexOf("(");
  const firstBraceIndex = queryStr.indexOf("{");
  // checks to see if there are no arguments
  if (argsStartIndex === -1 || firstBraceIndex < argsStartIndex) {
    queryObj.name = queryStr.substring(0, firstBraceIndex).trim();
    // // Checks if there is an alias
    if (queryObj.name.includes(":")) {
      // sets index of alias marker :
      const aliasIndex = queryObj.name.indexOf(":");
      // sets alias
      queryObj.alias = queryObj.name.substring(0, aliasIndex).trim();
      // shortens name to exclude alias
      queryObj.name = queryObj.name
        .substring(aliasIndex + 1, firstBraceIndex)
        .trim();
    }
    queryObj.arguments = "";
    queryObj.fields = queryStr.substring(firstBraceIndex);

    return queryObj;
  }
  // finds the query name string and assigns it
  queryObj.name = queryStr.substring(0, argsStartIndex).trim();
  // Checks if there is an alias
  if (queryObj.name.includes(":")) {
    // sets index of alias marker :
    const aliasIndex = queryObj.name.indexOf(":");
    // sets alias
    queryObj.alias = queryObj.name.substring(0, aliasIndex).trim();
    // shortens name to exclude alias
    queryObj.name = queryObj.name
      .substring(aliasIndex + 1, firstBraceIndex)
      .trim();
  }
  // begin iterating through the queryString at the beginning of the arguments
  for (let i = argsStartIndex; i < queryStr.length; i += 1) {
    const char = queryStr[i];
    if (char === "(") parensPairs += 1;
    if (char === ")") parensPairs -= 1;
    // returns the arguments string when the matching closing parens is found
    if (char === ")" && !parensPairs) {
      let argsString = queryStr.substring(argsStartIndex, i + 1);
      // removes whitespace inside parens string;
      argsString = argsString.replace(/\s/g, "");
      // handles edge case where ther are no arguments inside the argument parens pair.
      if (argsString === "()") argsString = "";

      queryObj.arguments = argsString;
      queryObj.fields = queryStr.substring(i + 1).trim();
      return queryObj;
    }
  }
}

// helper function to recursively convert the fields string to a fields object
export function findQueryFields(fieldsStr) {
  const fieldsObj = {};
  let fieldCache = "";
  let foundEndOfFieldName = false;
  // starts at index 1 to skip first open brace
  for (let i = 1; i < fieldsStr.length; i += 1) {
    const char = fieldsStr[i];
    // the brace indicates that we have found the fields object for a complex field
    if (char === "{") {
      const closingBraceIndex = findClosingBrace(fieldsStr, i);
      const complexFieldName = fieldCache;
      const complexFieldObjStr = fieldsStr.substring(i, closingBraceIndex + 1);
      fieldsObj[complexFieldName] = findQueryFields(complexFieldObjStr);
      // reset cache string
      fieldCache = "";
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
      fieldsObj[fieldCache] = fieldCache === "__typename" ? "meta" : "scalar";

      fieldCache = "";
      foundEndOfFieldName = false;
    }
    // break out when you find a closing brace
    if (char === "}") break;
    // adds current non-whitespace character in fieldCache
    if (char.match(/\S/)) fieldCache += char;
  }

  return fieldsObj;
}

// helper function to find the partner closing brace
export function findClosingBrace(str, index) {
  let bracePairs = 0;
  // skips ahead 1 index to skip first brace
  for (let i = index + 1; i < str.length; i += 1) {
    const char = str[i];
    if (char === "}" && !bracePairs) return i;
    if (char === "{") bracePairs += 1;
    if (char === "}") bracePairs -= 1;
  }
}

// helper function to find fragments
//aint shit here bro

// handles query string with directives (@include, @skip) by keeping or omitting
// fields depending on the value of the variable passed in
export function destructureQueriesWithDirectives(queryStr) {
  // starting point of iteration over queryStr
  let startIndex = queryStr.indexOf("{");

  // the starting and ending indices of arguments in queryStr
  let argStartIndex;
  let argEndIndex;

  // iterate over queryStr to replace variables in arguments
  for (let i = startIndex; i < queryStr.length; i += 1) {
    const char = queryStr[i];

    if (char === "(") argStartIndex = i;
    if (char === ")") argEndIndex = i;

    // if the start and end positions for a query argument have been found,
    // replace variables in that argument
    if (argStartIndex && argEndIndex) {
      const oldQueryArgs = queryStr.slice(argStartIndex, argEndIndex + 1);
      const newQueryArgs = replaceQueryVariables(oldQueryArgs);

      queryStr = queryStr.replace(oldQueryArgs, newQueryArgs);

      // reset start and end indices to find and replace other arguments
      argStartIndex = undefined;
      argEndIndex = undefined;
    }
  }

  // starting point of iteration is now the first directive (indicated by @)
  startIndex = queryStr.indexOf("@");

  // skipFlag will indicate if the directive is @skip, otherwise @include is
  // assumed to be the directive
  let skipFlag = false;

  if (queryStr[startIndex + 1] === "s") {
    skipFlag = true;
  }

  // Boolean that indicates whether the field to which a directive is attached
  // to should be included in or removed from the query string
  let includeQueryField;

  // start and end positions of a directive (e.g.  --> @include (if: true) <-- )
  /* NOTE: directives (from '@' to the closest closing paren) will always be 
      deleted from the query string, regardless of whether the value of the variable is true or false */
  let startDeleteIndex;
  let endDeleteIndex;

  // delete directives from queryStr, as well as the field itself depending
  // on the value of the variable in the directive
  for (let i = startIndex; i < queryStr.length; i += 1) {
    const char = queryStr[i];

    if (char === "@") {
      startDeleteIndex = i;
    }
    if (char === ")") {
      endDeleteIndex = i;
    }

    // check value of the variable in the directive (to the right of the ':')
    if (startDeleteIndex && char === ":") {
      // @skip directives will do the opposite of @include directives
      if (queryStr.slice(i, i + 6).indexOf("true") !== -1) {
        includeQueryField = skipFlag ? false : true;
      } else {
        includeQueryField = skipFlag ? true : false;
      }
    }

    // if the start and end positions for a directive is found, delete it
    // (from the '@' to the closest closing paren)
    if (startDeleteIndex && endDeleteIndex) {
      const directive = queryStr.slice(startDeleteIndex, endDeleteIndex + 2);

      queryStr = queryStr.replace(directive, "");

      // adjust i after deleting the directive from the queryStr
      i -= directive.length;

      // if @include directive is false, or if @skip directive is true
      if (!includeQueryField) {
        // index of the beginning of a fields body (if the field was of
        // non-scalar type and has nested fields)
        let startBodyIndex = i + 2;

        // boolean indicating whether a field has nested fields (more fields
        // within '{' and '}')
        const hasNestedFields = queryStr.slice(i, i + 3).indexOf("{") !== -1;

        // if a field has nested fields and the @include was false/@skip was
        // true, delete the nested fields as well
        if (hasNestedFields) {
          // adjust i to be pointing inside the body of the field
          i += 2;

          // number of opening curly braces within the body of the field
          let numBraces = 1;

          // find the corresponding closing brace for the body of the field with the directive
          while (numBraces) {
            i++;
            const char = queryStr[i];

            if (char === "{") numBraces++;
            if (char === "}") numBraces--;
          }

          const endBodyIndex = ++i;

          // delete the body of the field
          const fieldBody = queryStr.slice(startBodyIndex, endBodyIndex);
          queryStr = queryStr.replace(fieldBody, "");
        }

        // delete the field with the directive attached to it
        let startFieldNameIndex = i - 1;
        const endFieldNameIndex = i + 1;

        while (queryStr[startFieldNameIndex] !== " ") {
          startFieldNameIndex--;
        }

        queryStr = queryStr.replace(
          queryStr.slice(startFieldNameIndex, endFieldNameIndex),
          ""
        );
      }

      // reset start and end positions for a directive to look for more directives
      startDeleteIndex = undefined;
      endDeleteIndex = undefined;
    }
  }

  return queryStr;
}

export default destructureQueries;
