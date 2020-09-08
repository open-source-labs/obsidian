import specificQueryParser from './specificQueryParser.js'
import { checkAndInsert } from './dbOps.js';


export default function normalizeResult(query, result, obsidianSchema) {
  console.log('query', query);
  console.log('result', result);
  
  const { returnTypes, obsidianTypeSchema } = obsidianSchema;
  console.log('returnTypes', returnTypes);

  const specificQueryArray = Object.keys(result.data);
  console.log('specificQueryArray', specificQueryArray)

  for (let i = 0; i < specificQueryArray.length; i++) {
    const hashedQuery = hashSpecificQuery(specificQueryArray[i], result.data[specificQueryArray[i]], returnTypes, query, obsidianTypeSchema);
  }

}

function hashSpecificQuery(queryType, fields, returnTypes, query, obsidianTypeSchema) {

  // Stringify the query to reveal newline characters
  query = JSON.stringify(query);

  // Find starting index of query name in order to create the specific query hash
  const startIdx = query.indexOf(queryType);

  // Create the hash of the specific query
  const hash = specificQueryParser(startIdx, query).output;
  console.log('hash', hash);

  // Create array of hashes of all key:value pairs (will check and store in cache inside)
  const arrayOfHashes = hashAndStoreFields(queryType, fields, returnTypes, obsidianTypeSchema);

  return {
    hash: hash,
    value: arrayOfHashes
  };
}

function hashAndStoreFields(queryType, fields, returnTypes, obsidianTypeSchema, typeSchemaName) {
  if (!typeSchemaName) {
    typeSchemaName = returnTypes[queryType].type;
  }
  console.log('46', typeSchemaName)
  if (Array.isArray(fields)) {
    let output = [];
    fields.forEach(el => {
      output = output.concat(hashAndStoreFieldsOfObject(typeSchemaName, el, obsidianTypeSchema, queryType, returnTypes));
    })
    return output;
  }
  return hashAndStoreFieldsOfObject(typeSchemaName, fields, obsidianTypeSchema, queryType, returnTypes);
}

function hashAndStoreFieldsOfObject(typeSchemaName, fields, obsidianTypeSchema, queryType, returnTypes) {
  const properties = Object.keys(fields);
  const id = (fields.id || fields.ID || fields._id || fields._ID || fields.Id || fields._Id);
  console.log('60 properties', properties);

  const hashes = properties.reduce((acc, property) => {

    if (!property.toLowerCase().match(/_?id/)) {
      const hash = hashGenerator(typeSchemaName, id, property);
      console.log('66 hash', hash)
      let value;

      if (!obsidianTypeSchema[typeSchemaName][property].scalar) {
        const nestedSchemaName = obsidianTypeSchema[typeSchemaName][property].type;
        console.log('non-scalar field', nestedSchemaName)
        value = hashAndStoreFields(queryType, fields[property], returnTypes, obsidianTypeSchema, nestedSchemaName);
        console.log('73 value', value)
      } else {
        value = fields[property];
      }
      console.log('76 value', value)

      // store hash key and value in redis database
      checkAndInsert(hash, value);

      acc.push(hash);
    }
    return acc;
  }, [])

  console.log('hashes array ', hashes)
  return hashes;
}

function hashGenerator(typeSchemaName, id, property) {
  return typeSchemaName + String(id) + property;
}
