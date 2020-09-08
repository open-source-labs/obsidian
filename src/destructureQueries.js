import specificQueryParser from './specificQueryParser.js';
import { checkAndRetrieveQuery, retrieveScalar } from './dbOps.js';

export default async function destructureQueries(query, obsidianSchema) {
  query = JSON.stringify(query)
  const queryHashes = await findSpecificQueries(query, obsidianSchema);

  // Result object that we will build
  const result = {
    data: {}
  };

  // Loop through queryHashes and reconstruct results
  for (let queryName in queryHashes) {
    console.log('queryName', queryName);
    console.log('hashes', queryHashes[queryName]);

    // Haven't stored in the database
    if (!queryHashes[queryName]) continue;

    let queryResult = {};

    const hashes = Object.keys(queryHashes[queryName])

    for (let j = 0; j < hashes.length; j++) {
      const typeSchemaName = findTypeSchemaName(hashes[j]);
      const id = hashes[j].match(/(?<=~).*(?=~)/)[0];
      const property = findProp(hashes[j]);
      if (obsidianSchema.obsidianTypeSchema[typeSchemaName][property].scalar) {
        if (!queryResult[id]) {
          queryResult[id] = {
            id
          }
        }
        queryResult[id][property] = await retrieveScalar(hashes[j]);
      } else {
        
      }
    }

    const ids = Object.keys(queryResult);

    if (ids.length === 1) {
      queryResult = queryResult[ids[0]];
    } else {
      queryResult = Object.values(queryResult);
    }

    result.data[queryName] = queryResult;
  };



  console.log(result);
}

async function findSpecificQueries(query, obsidianSchema) {
  console.log('obsidianSchema',obsidianSchema);

  const queryHashes = {};

  let nameOfQuery = findQueryName(query);

  while (nameOfQuery) {
    const startIndexOfName = query.indexOf(nameOfQuery);
    const next = specificQueryParser(startIndexOfName, query);
    queryHashes[nameOfQuery] = next.output;
    nameOfQuery = findQueryName(query, next.endIdx);
  }

  console.log('queryHashes', queryHashes);

  const redisResults = {};

  // Loop through all specific queries and find their values in redis
  for (let queryHash in queryHashes) {
    redisResults[queryHash] = await checkAndRetrieveQuery(queryHashes[queryHash]);
  }

  console.log('redisResults', redisResults);

  return redisResults;
}

function findQueryName(query, startIdx = 2) {
  let i = startIdx;
  let output = '';

  while (i < query.length) {
    // Eat whitespace
    if (query[i] === ' ') {
      i++;
    // Came to the start of the requested fields, break out of loop
    } else if (query[i] === '\\') {
      if (query[i+1] === 'n') {
        i += 2;
      } else {
        output += query[i];
        i++;
      }
    } else if (query[i] === '(' || query[i] === '{') {
      return output;
    } else {
      output += query[i];
      i++;
    }
  }

  return;
}

const findTypeSchemaName = hash => {
  let i = 0;
  while (hash[i] !== '~') {
    i++;
  }
  return hash.slice(0, i);
}

const findProp = hash => {
  let i = hash.length - 1;

  while (hash[i] !== '~') {
    i--;
  }

  return hash.slice(i + 1);
}
