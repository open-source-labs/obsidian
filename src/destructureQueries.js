import specificQueryParser from './specificQueryParser.js';
import { checkAndRetrieveQuery, retrieveScalar, retrieveComplex } from './dbOps.js';
import createQueryObj from './createQueryObj.js';

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
    let queryObj = createQueryObj(queryName, query, obsidianSchema);

    // Haven't stored in the database
    if (!queryHashes[queryName]) continue;

    const hashes = Object.keys(queryHashes[queryName])

    // for (let j = 0; j < hashes.length; j++) {
    //   const typeSchemaName = findTypeSchemaName(hashes[j]);
    //   const id = hashes[j].match(/(?<=~).*(?=~)/)[0];
    //   const property = findProp(hashes[j]);
    //   if (!queryResult[id]) {
    //     queryResult[id] = {
    //       id
    //     }
    //   }
    //   if (obsidianSchema.obsidianTypeSchema[typeSchemaName][property].scalar) {
    //     queryResult[id][property] = await retrieveScalar(hashes[j]);
    //   } else {
    //     const partialHashes = await retrieveScalar(hashes[j]);
    //     if (Array.isArray(partialHashes)) {
    //       partialHashes.
    //     } else {

    //     }
    //   }
    // }

    // const ids = Object.keys(queryResult);

    // if (ids.length === 1) {
    //   queryResult = queryResult[ids[0]];
    // } else {
    //   queryResult = Object.values(queryResult);
    // }

    // result.data[queryName] = queryResult;

    result.data[queryName] = await buildResultsObject(hashes, obsidianSchema, queryObj);
  };

  console.log('RESULT?????? ',result);
  if (result.data.getBook) console.log(result.data.getBook.whereToBuy)

}

async function buildResultsObject(hashes, obsidianSchema, queryObj) {
  let queryResult = {};
  console.log('Hashes in biuild', hashes)
  for (let j = 0; j < hashes.length; j++) {
    const typeSchemaName = findTypeSchemaName(hashes[j]);
    const id = hashes[j].match(/(?<=~).*(?=~)/)[0];
    const property = findProp(hashes[j]);
    if (!queryResult[id]) {
      queryResult[id] = {
        id
      }
    }
    if (property.toLowerCase() === 'id' || property.toLowerCase() === '_id') continue;
    if (obsidianSchema.obsidianTypeSchema[typeSchemaName][property].scalar) {
      queryResult[id][property] = await retrieveScalar(hashes[j]);
    } else {
      const partialHashes = await retrieveComplex(hashes[j]);
      if (typeof partialHashes === 'object') {
        const loophash = Object.keys(partialHashes);
        queryResult[id][property] = [];
        for (let k = 0; k < loophash.length; k++) {
          queryResult[id][property].push(await buildResultsObject(batchHash(Object.keys(queryObj.properties[property]), loophash[k]), obsidianSchema, queryObj));
        }
        // queryResult[id][property] = await Object.keys(partialHashes).reduce(async (acc, hash) => {
        //   console.log('accumulator', acc)
        //   return acc.concat([await buildResultsObject(batchHash(Object.keys(queryObj.properties[property]), hash), obsidianSchema, queryObj)]);
        //   // acc.push(variable);
        //   // return acc;
        // }, []);
      } else {
        queryResult[id][property] = await buildResultsObject(batchHash(Object.keys(queryObj.properties[property]), partialHashes), obsidianSchema, queryObj);
      }
    }
  }

  const ids = Object.keys(queryResult);

  if (ids.length === 1) {
    queryResult = queryResult[ids[0]];
  } else {
    queryResult = Object.values(queryResult);
  }

  return queryResult;
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
      if (query[i] === 'q' && query.slice(i,i+5) === 'query') {
        i = query.indexOf('{') + 1;
        continue;
      }
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


function partialQueryConstructor(partialHash, property) {
  return partialHash + '~' + property;
}

function batchHash(propertySchema, hashPrefix) {
  return propertySchema.reduce((acc, prop) => {
    const fullQuery = partialQueryConstructor(hashPrefix, prop);
    acc.push(fullQuery);
    return acc;
  }, [])
}
