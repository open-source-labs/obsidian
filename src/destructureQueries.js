import specificQueryParser from './specificQueryParser.js';
import { checkAndRetrieveQuery } from './dbOps.js';

export default function destructureQueries(query, obsidianSchema) {
  query = JSON.stringify(query)
  const queryHashes = findSpecificQueries(query, obsidianSchema);
}

async function findSpecificQueries(query, obsidianSchema) {
  console.log('obsidianSchema',obsidianSchema);
  
  const queryHashes = [];

  let nameOfQuery = findQueryName(query);

  while (nameOfQuery) {
    const startIndexOfName = query.indexOf(nameOfQuery);
    const next = specificQueryParser(startIndexOfName, query);
    queryHashes.push(next.output)
    nameOfQuery = findQueryName(query, next.endIdx);
  }

  console.log('queryHashes', queryHashes);

  const redisResults = [];

  for (let i = 0; i < queryHashes.length; i++) {
    redisResults.push(await checkAndRetrieveQuery(queryHashes[i]));
  }

  console.log('redisResults', redisResults);



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