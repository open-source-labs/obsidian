import specificQueryParser from './specificQueryParser.js';
import { checkAndRetrieveQuery, retrieveScalar, retrieveComplex, clearRedis } from './dbOps.js';
import createQueryObj from './createQueryObj.js';
import { findTypeSchemaName, findProp } from './hashOps.js';


// Attempt to rebuild results object if all hashes are found in Redis //
export default async function destructureQueries(query, obsidianSchema, cache) {
  // Stringify to expose newline characters //
  query = JSON.stringify(query);

  // Destructure query into array of minified sub-queries //
  const queryHashes = await findSpecificQueries(query, obsidianSchema, cache);
  // If graphql query is a mutation, clear Redis and skip destructuring //
  if (!queryHashes) {
    clearRedis();
    return 'mutation';
  }

  const result = {
    data: {}
  };

  // Loop through queryHashes and reconstruct results based on stored property hashes //
  for (let queryName in queryHashes) {
    // Create object representation of query //
    const queryObj = createQueryObj(queryName, query, obsidianSchema);

    // If hasn't been stored in the database //
    if (!queryHashes[queryName]) continue;

    const hashes = Object.keys(queryHashes[queryName])

    // Attempt to build result object from cache //
    result.data[queryName] = await buildResultsObject(hashes, obsidianSchema, queryObj, cache);
  };
  // If can't reconstruct //
  if (Object.keys(result.data).length === 0) return;

  return result;
}

async function buildResultsObject(hashes, obsidianSchema, queryObj, cache) {
  let queryResult = {};

  // For each property hash, add to result object //
  // NOTE: queryResult built as object and turned into an array at end in order to preserve constant look up time during build. Keys are ids //
  for (let j = 0; j < hashes.length; j++) {
    const typeSchemaName = findTypeSchemaName(hashes[j]);
    const id = hashes[j].match(/(?<=~).*(?=~)/)[0];
    const property = findProp(hashes[j]);

    // If have not created an object at this id, make one //
    if (!queryResult[id]) {
      queryResult[id] = {}

      // Really inelegant solution to ensuring the id remains in the correct format //
      if (obsidianSchema.obsidianTypeSchema[typeSchemaName].id) {
        queryResult[id].id = id;
      } else if (obsidianSchema.obsidianTypeSchema[typeSchemaName]._id) {
        queryResult[id]._id = id;
      } else if (obsidianSchema.obsidianTypeSchema[typeSchemaName].ID) {
        queryResult[id].ID = id;
      } else if (obsidianSchema.obsidianTypeSchema[typeSchemaName]._ID) {
        queryResult[id]._ID = id;
      } else if (obsidianSchema.obsidianTypeSchema[typeSchemaName].Id) {
        queryResult[id].Id = id;
      } else if (obsidianSchema.obsidianTypeSchema[typeSchemaName]._Id) {
        queryResult[id]._Id = id;
      }
    }

    // Prevent overriding of id //
    if (property.toLowerCase() === 'id' || property.toLowerCase() === '_id') continue;

    // If this field is scalar //
    if (obsidianSchema.obsidianTypeSchema[typeSchemaName][property].scalar) {
      // Retrieve hash and parse based on expected type //
      const propType = obsidianSchema.obsidianTypeSchema[typeSchemaName][property].type;
      let propVal;
      if (propType === 'Int' || propType === 'Float') {
        propVal = Number(await retrieveScalar(hashes[j], cache));
      } else if (propType === 'Boolean') {
        propVal = JSON.parse(await retrieveScalar(hashes[j], cache));
      } else {
        propVal = await retrieveScalar(hashes[j], cache);
        if (propVal && propVal.slice(1, 5) === 'null') propVal = null;
      }
      queryResult[id][property] = propVal;
      // If this field is complex, recursive call to build nested property object //
    } else {
      let partialHashes = await retrieveComplex(hashes[j], cache);
      if (partialHashes[0] === '"') partialHashes = JSON.parse(partialHashes) // Added for odd edge case of double stringified complex types //
      // Field is ListType //
      if (typeof partialHashes === 'object') {
        const partialHashesArray = Object.keys(partialHashes);
        queryResult[id][property] = [];
        for (let k = 0; k < partialHashesArray.length; k++) {
          // Recursive call //
          queryResult[id][property].push(await buildResultsObject(batchHash(Object.keys(queryObj.properties[property]), partialHashesArray[k]), obsidianSchema, queryObj, cache));
        }
        // Field is NamedType //
      } else {
        // Recursive call //
        queryResult[id][property] = await buildResultsObject(batchHash(Object.keys(queryObj.properties[property]), partialHashes), obsidianSchema, queryObj, cache);
      }
    }
  }

  // Converts object into array //
  const resultObjects = Object.values(queryResult);

  // If only one, it should not be in an array //
  if (resultObjects.length === 1) {
    queryResult = resultObjects[0];
  } else {
    queryResult = resultObjects;
  }

  return queryResult;
}

// Returns obj with minified queries and associated hashes //
async function findSpecificQueries(query, obsidianSchema, cache) {
  const queryHashes = {};

  // Finds first query name //
  let nameOfQuery = findQueryName(query);
  // If graphql query is a mutation //
  if (nameOfQuery === 'mutation') return undefined;

  // Iterates until all sub-queries are added to queryHashes object //
  while (nameOfQuery) {
    const startIndexOfName = query.indexOf(nameOfQuery);
    const next = specificQueryParser(startIndexOfName, query);
    queryHashes[nameOfQuery] = next.output;
    nameOfQuery = findQueryName(query, next.endIdx);
  }

  const redisResults = {};

  // Loop through all sub-queries and find their values in redis //
  for (let queryHash in queryHashes) {
    redisResults[queryHash] = await checkAndRetrieveQuery(queryHashes[queryHash], cache);
  }

  return redisResults;
}

// Returns query name //
function findQueryName(query, startIdx = query.indexOf('{') + 1) {
  let i = startIdx;
  let output = '';

  if (startIdx > 6) {
    if (query.slice(0, startIdx).includes('mutation')) {
      return 'mutation';
    }
  }

  while (i < query.length) {
    // Eat whitespace //
    if (query[i] === ' ') {
    // Eat new line characters //
    } else if (query[i] === '\\') {
      if (query[i+1] === 'n') {
        i++;
      } else {
        output += query[i];
      }
      // Found start of parameters/properties, break out of loop //
    } else if (query[i] === '(' || query[i] === '{') {
      return output;
    } else {
      if (query[i] === 'm' && query.slice(i, i+7) === 'mutation') {
        return 'mutation';
      }

      // Edge case for query string beginning with redundant 'query' //
      if (query[i] === 'q' && query.slice(i,i+5) === 'query') {
        i = query.indexOf('{') + 1;
        continue;
      }
      output += query[i];
    }
    i++;
  }
  return;
}


function nestedPropertyHashConstructor(partialHash, property) {
  return partialHash + '~' + property;
}

// Constructs hashes based on hash prefix and requested properties //
function batchHash(propertySchema, hashPrefix) {
  return propertySchema.reduce((acc, prop) => {
    const fullQuery = nestedPropertyHashConstructor(hashPrefix, prop);
    acc.push(fullQuery);
    return acc;
  }, [])
}
