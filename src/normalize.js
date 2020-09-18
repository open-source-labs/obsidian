import specificQueryParser from './specificQueryParser.js'
import { checkAndInsert } from './dbOps.js';

// Normalizes responses from GraphQL queries //
export default async function normalizeResult(query, result, obsidianSchema, cache) {

  const { returnTypes, obsidianTypeSchema } = obsidianSchema;

  const specificQueryArray = Object.keys(result.data);

  const promiseArr = [];

  // Iterates through sub-queries to create hash-value pairs in Redis //
  for (let i = 0; i < specificQueryArray.length; i++) {
    const hashedQuery = await hashSpecificQuery(specificQueryArray[i], result.data[specificQueryArray[i]], returnTypes, query, obsidianTypeSchema, cache);
    console.log(hashedQuery.value);
    promiseArr.push(checkAndInsert(hashedQuery.hash, hashedQuery.value, cache));
  }

  return Promise.all(promiseArr);
}

// Builds hash-value pair for each sub-query //
// where hash = minified query && value = array of hashes for each property needed for the response //
async function hashSpecificQuery(queryType, fields, returnTypes, query, obsidianTypeSchema, cache) {

  // Stringify the query to reveal newline characters
  query = JSON.stringify(query);

  // Find starting index of query name in order to create the specific query hash
  const startIdx = query.indexOf(queryType);

  // Create the hash of the specific query
  const hash = specificQueryParser(startIdx, query).output;

  // Create array of hashes of all key:value pairs (will check and store in cache inside)
  const objOfHashes = await hashAndStoreFields(queryType, fields, returnTypes, obsidianTypeSchema, cache);

  return {
    hash: hash,
    value: objOfHashes
  };
}

// Switch to deal with ListType versus NamedType //
async function hashAndStoreFields(queryType, fields, returnTypes, obsidianTypeSchema, cache, typeSchemaName) {
  // Needed for nested Types //
  if (!typeSchemaName) typeSchemaName = returnTypes[queryType].type;

  // Iterate through ListType to hash and store each object //
  if (Array.isArray(fields)) {
    let output = {};
    for (let i = 0; i < fields.length; i++) {
      output = Object.assign(output, await hashAndStoreFieldsOfObject(typeSchemaName, fields[i], obsidianTypeSchema, queryType, returnTypes, cache));
    }
    return output;
  }
  // Hash and store NamedType //
  return await hashAndStoreFieldsOfObject(typeSchemaName, fields, obsidianTypeSchema, queryType, returnTypes, cache);
}

// Create hash object and Store hash-value pairs in Redis of individual fields //
async function hashAndStoreFieldsOfObject(typeSchemaName, fields, obsidianTypeSchema, queryType, returnTypes, cache) {
  const properties = Object.keys(fields);
  const id = (fields.id || fields.ID || fields._id || fields._ID || fields.Id || fields._Id);

  // Loop through properties to create object with all hashes //
  const hashes = {};

  for (let i = 0; i < properties.length; i++) {
    const oldReduce = async (property) => {
      // Only store non-id properties //
      if (!property.toLowerCase().match(/_?id/)) {
        const hash = hashGenerator(typeSchemaName, id, property);
        let value;

        // Check if the property is complex using our schema //
        if (!obsidianTypeSchema[typeSchemaName][property].scalar) {
          // Finds name of nested Type //
          const nestedSchemaName = obsidianTypeSchema[typeSchemaName][property].type;

          // Recursively hashes and stores properties within this property //
          await hashAndStoreFields(queryType, fields[property], returnTypes, obsidianTypeSchema, cache, nestedSchemaName);

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
        await checkAndInsert(hash, value, cache);

        // Add hash to hash object //
        hashes[hash] = true;
      }
    }
    await oldReduce(properties[i]);
  }

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
