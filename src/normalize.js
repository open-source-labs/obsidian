import specificQueryParser from './specificQueryParser.js'
import checkAndInsert from './dbOps.js';


export default function normalizeResult(query, result, obsidianSchema) {
  console.log('query', query);
  console.log('result', result);

  const { returnTypes, obsidianTypeSchema } = obsidianSchema;
  console.log('returnTypes', returnTypes);

  const specificQueryArray = Object.keys(result.data);
  console.log('specificQueryArray', specificQueryArray)

  for (let i = 0; i < specificQueryArray.length; i++) {
    const hashedQuery = hashSpecificQuery(specificQueryArray[i], result.data[specificQueryArray[i]], returnTypes, query, obsidianTypeSchema);
    checkAndInsert(hashedQuery.hash, hashedQuery.value);
  }

}

function hashSpecificQuery(queryType, fields, returnTypes, query, obsidianTypeSchema) {

  // Stringify the query to reveal newline characters
  query = JSON.stringify(query);

  // Find starting index of query name in order to create the specific query hash
  const startIdx = query.indexOf(queryType);

  // Create the hash of the specific query
  const hash = specificQueryParser(startIdx, query);

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

  const hashes = properties.reduce((acc, property) => {

    if (!property.toLowerCase().match(/_?id/)) {
      const hash = hashGenerator(typeSchemaName, id, property);
      let value;

      // Check if the property is not scalar
      if (!obsidianTypeSchema[typeSchemaName][property].scalar) {
        const nestedSchemaName = obsidianTypeSchema[typeSchemaName][property].type;

        hashAndStoreFields(queryType, fields[property], returnTypes, obsidianTypeSchema, nestedSchemaName);

        if (Array.isArray(fields[property])) {

          value = [];

          for (let i = 0; i < fields[property].length; i++) {
            const newId = (fields[property][i].id || fields[property][i].ID || fields[property][i]._id || fields[property][i]._ID || fields[property][i].Id || fields[property][i]._Id);
            if (!newId) {
              const nullResult = [fields[property][i].id, fields[property][i].ID, fields[property][i]._id, fields[property][i]._ID, fields[property][i].Id, fields[property][i]._Id].some(el => el === null);
              if (nullResult) {
                value = null;
              } else {
                throw new Error('Must return id field with each NamedType in your query');
              }

            } else {
              value.push(nestedSchemaName + newId);
            }

          }

        } else {

          const newId = (fields[property].id || fields[property].ID || fields[property]._id || fields[property]._ID || fields[property].Id || fields[property]._Id);
          value = nestedSchemaName + newId;

        }
      } else {

        // Property is scalar
        value = fields[property];
      }


      // store hash key and value in redis database
      checkAndInsert(hash, value);

      acc.push(hash);
    }
    return acc;
  }, [])

  return hashes;
}

function hashGenerator(typeSchemaName, id, property) {
  return typeSchemaName + String(id) + property;
}
