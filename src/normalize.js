import specificQueryParser from './specificQueryParser.js'
import { checkAndInsert } from './dbOps.js';

// Normalizes responses from GraphQL queries //
export default function normalizeResult(query, result, obsidianSchema) {

  const { returnTypes, obsidianTypeSchema } = obsidianSchema;

  const specificQueryArray = Object.keys(result.data);

  // Iterates through sub-queries to create hash-value pairs in Redis //
  for (let i = 0; i < specificQueryArray.length; i++) {
    const hashedQuery = hashSpecificQuery(specificQueryArray[i], result.data[specificQueryArray[i]], returnTypes, query, obsidianTypeSchema);
    checkAndInsert(hashedQuery.hash, hashedQuery.value);
  }
}

// Builds hash-value pair for each sub-query //
// where hash = minified query && value = array of hashes for each property needed for the response //
function hashSpecificQuery(queryType, fields, returnTypes, query, obsidianTypeSchema) {

  // Stringify the query to reveal newline characters
  query = JSON.stringify(query);

  // Find starting index of query name in order to create the specific query hash
  const startIdx = query.indexOf(queryType);

  // Create the hash of the specific query
  const hash = specificQueryParser(startIdx, query).output;

  // Create array of hashes of all key:value pairs (will check and store in cache inside)
  const objOfHashes = hashAndStoreFields(queryType, fields, returnTypes, obsidianTypeSchema);

  return {
    hash: hash,
    value: objOfHashes
  };
}

// Switch to deal with ListType versus NamedType //
function hashAndStoreFields(queryType, fields, returnTypes, obsidianTypeSchema, typeSchemaName) {
  // Needed for nested Types //
  if (!typeSchemaName) typeSchemaName = returnTypes[queryType].type;

  // Iterate through ListType to hash and store each object //
  if (Array.isArray(fields)) {
    let output = {};
    fields.forEach(el => {
      output = Object.assign(output, hashAndStoreFieldsOfObject(typeSchemaName, el, obsidianTypeSchema, queryType, returnTypes));
    })
    return output;
  }
  // Hash and store NamedType //
  return hashAndStoreFieldsOfObject(typeSchemaName, fields, obsidianTypeSchema, queryType, returnTypes);
}

// Create hash object and Store hash-value pairs in Redis of individual fields //
function hashAndStoreFieldsOfObject(typeSchemaName, fields, obsidianTypeSchema, queryType, returnTypes) {
  const properties = Object.keys(fields);
  const id = (fields.id || fields.ID || fields._id || fields._ID || fields.Id || fields._Id);

  // Loop through properties to create object with all hashes //
  const hashes = properties.reduce((acc, property) => {
    // Only store non-id properties //
    if (!property.toLowerCase().match(/_?id/)) {
      const hash = hashGenerator(typeSchemaName, id, property);
      let value;

      // Check if the property is complex using our schema //
      if (!obsidianTypeSchema[typeSchemaName][property].scalar) {
        // Finds name of nested Type //
        const nestedSchemaName = obsidianTypeSchema[typeSchemaName][property].type;

        // Recursively hashes and stores properties within this property //
        hashAndStoreFields(queryType, fields[property], returnTypes, obsidianTypeSchema, nestedSchemaName);

        // Check for ListType //
        if (Array.isArray(fields[property])) {

          value = {};

          // Create hash prefixes //
          for (let i = 0; i < fields[property].length; i++) {
            const newId = checkID(fields[property][i])

            if (newId) {
              value[nestedSchemaName + '~' + newId] = true;
            } else {
              value = null;
            }
          }
          // NamedType 
        } else {
          const newId = checkID(fields[property])
          if (newId) {
            value = JSON.stringify(nestedSchemaName + '~' + newId);
          } else {
            value = null;
          }
        }
      } else {
        // Property is scalar //
        value = fields[property];
      }
      // Store hash key and value in Redis database //
      checkAndInsert(hash, value);

      // Add hash to hash object //
      acc[hash] = true;
    }
    return acc;
  }, {})

  return hashes;
}

function hashGenerator(typeSchemaName, id, property) {
  return typeSchemaName + '~' + String(id) + '~' + property;
}

// Grab ID and check if null (valid) or undefined (invalid => throw Error) //
function checkID(propObj) {
  const newId = (propObj.id || propObj.ID || propObj._id || propObj._ID || propObj.Id || propObj._Id);
  // If id is null or undefined //
  if (!newId) {
    // Determine if null //
    const nullResult = [propObj.id, propObj.ID, propObj._id, propObj._ID, propObj.Id, propObj._Id].some(el => el === null);

    if (nullResult) {
      // Null id is valid because nothing was found //
      return null;
    } else {
      // Undefined is not valid. Developer did not return id field. //
      throw new Error('Must return id field with each NamedType in your query');
    }
  } 

  return newId;
}