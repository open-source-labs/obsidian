import specificQueryParser from './specificQueryParser.js'


export default function normalizeResult(query, result, returnTypes) {
  console.log('query', query);
  console.log('result', result);
  console.log('returnTypes', returnTypes);

  const specificQueryArray = Object.keys(result.data);
  console.log('specificQueryArray', specificQueryArray)

  for (let i = 0; i < specificQueryArray.length; i++) {
    const hashedQuery = hashSpecificQuery(specificQueryArray[i], result.data[specificQueryArray[i]], returnTypes, query);
  }

}

function hashSpecificQuery(queryType, fields, returnTypes, query) {

  // Stringify the query to reveal newline characters
  query = JSON.stringify(query);

  // Find starting index of query name in order to create the specific query hash
  const startIdx = query.indexOf(queryType);

  // Create the hash of the specific query
  const hash = specificQueryParser(startIdx, query);
  console.log('hash', hash);

  // Create array of hashes of all key:value pairs (will check and store in cache inside)
  const arrayOfHashes = hashAndStoreFields(queryType, fields, returnTypes);

  return {
    hash: hash,
    value: arrayOfHashes
  };
}

function hashAndStoreFields(queryType, fields, returnTypes) {
  const typeSchemaName = returnTypes[queryType].type;
  if (Array.isArray(fields)) {
    const output = [];
    fields.forEach(el => {
      output.concat(hashAndStoreFieldsOfObject(typeSchemaName, el));
    })
    return output;
  }
  return hashAndStoreFieldsOfObject(typeSchemaName, fields);
}

function hashAndStoreFieldsOfObject(typeSchemaName, fields) {

}

function hashGenerator(typeSchemaName, id, property) {
  return typeSchemaName + String(id) + property;
}
