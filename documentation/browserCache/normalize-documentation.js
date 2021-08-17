//*=========================================================================*//
/*
  normalizeResult
  
  Description: Takes a query, a response object, an obsidianSchema, and a cache
  and 'normalizes' (flattens) the data, merges it into the cache, and returns
  the updated cache

  Summary:
    Breaks response object into various queries
    Creates an object of hashes and values from the response object
      {
        hash: queryStringHashed
        value: {
          dataHashes: true,
          ...,
          ...
        }
      }
        Recursively adds all base data to the cache
    Checks to see if the hash exists in the cache and returns a new cache
*/

normalizeResult(query, result, obsidianSchema, cache)

// INPUT:
const query = gql`
  {
    Country(_id: "4425") {
      _id
      name
      population
      flag {
        _id
        emoji
      }
      borders {
        _id
        name
        capital
      }
    }
  }
`;

const result = {
  data: {
    Country: [
      {
        _id: '4425',
        name: 'United States of America',
        population: 323947000,
        flag: {
          _id: '4440',
          emoji:'🇺🇸'
        },
        borders: [
          {
            capital: "Mexico City",
            name: "Mexico",
            _id: "2741"
          }, 
          {
            capital: "Ottawa",
            name: "Canada",
            _id: "860",
          }
        ],
      },
    ]
  }
};

const obsidianSchema = {
  returnTypes: {
    Country: {
      kind: 'NamedType',
      type: 'Country',
    },
  },
  argTypes: {
    Country: { _id: 'ID' },
  },
  obsidianTypeSchema: {
    Country: {
      borders: { type: 'Country', scalar: false },
      capital: { type: 'String', scalar: true },
      flag: { type: 'Flag', scalar: false },
      name: { type: 'String', scalar: true },
      population: { type: 'Int', scalar: true },
      _id: { type: 'ID', scalar: true },
    },
    Flag: {
      emoji: { type: 'String', scalar: true },
      _id: { type: 'ID', scalar: true },
    },
  },
};

const cache = {};

// PROCESS:
hashSpecificQuery; // CORE NORMALIZATION FLOW, stores base data and returns queryHash and data
checkAndInsert; // checks if the query string is in the cache, then caches

// OUTPUT:
const obsidianReturn = [{
  data: {
    Country: [
      {
        borders: [
          { _id: '2741', name: 'Mexico', capital: 'Mexico City' },
          { _id: '860', name: 'Canada', capital: 'Ottawa' },
        ],
        flag: {
          emoji: '',
          _id: '4440',
        },
        _id: '4425',
        name: 'United States of America',
        population: 323947000,
      },
    ],
  },
}];

//*=========================================================================*//
/*
  hashSpecificQuery

  Description: Takes a query and spits out an object composed of
  hashes for that query and values for that query
*/
async function hashSpecificQuery(queryType, fields, returnTypes, query, obsidianTypeSchema, cache)

// INPUT:
queryType = 'Country'

fields = [
  {
    _id: '4425',
    name: 'United States of America',
    population: 323947000,
    flag: {
      _id: '4440',
      emoji:'🇺🇸'
    },
    borders: [
      {
        capital: "Mexico City",
        name: "Mexico",
        _id: "2741"
      }, 
      {
        capital: "Ottawa",
        name: "Canada",
        _id: "860",
      }
    ],
  },
]
returnTypes
query
obsidianTypeSchema
cache

// PROCESS:
specificQueryParser;
hashAndStoreFields;

// OUTPUT:
hashedQuery = {
  hash: "Country(_id:\"4425\"){_idnamepopulationflag{_idemoji}borders{_idnamecapital}}",
  value: {
    'Country~4425~borders': true,
    'Country~4425~flag': true,
    'Country~4425~name': true,
    'Country~4425~population': true
  }
}

//*=========================================================================*//
/*
  checkAndInsert
  
  Description: Checks if the hash exists in the cache, if not then insert the
  hash and its value into the cache

  Doesn't appear to upidate previously hashed data
*/
async function checkAndInsert(hash, value, cache, expiration = 20)

// INPUT
hash
value
cache
expiration

// PROCESS
connectFunc

// OUTPUT
cache = {
  "Country(_id:\"4425\"){_idnamepopulationflag{_idemoji}borders{_idnamecapital}}": {
    "Country~4425~borders": true,
    "Country~4425~flag": true,
    "Country~4425~name": true,
    "Country~4425~population": true 
  },
  "Country~860~capital": "Ottawa",
  "Country~860~name": "Canada",
  "Country~2741~capital": "Mexico City",
  "Country~2741~name": "Mexico",
  "Country~4425~flag": "Flag~4440",
  "Country~4425~name": "United States of America",
  "Country~4425~population": 323947000,
  "Flag~4440~emoji": "🇺🇸",
  "Country~4425~borders": {
    "Country~2741": true, "Country~860": true
  },
}

//*=========================================================================*//
/*
  specificQueryParser

  Description: takes a starting index and a query string and returns a
    minified query and end index
*/
specificQueryParser(startIdx, query).output;

// INPUT
startIdx // starting index of query
query

// PROCESS:

// OUTPUT:
output = "Country(_id:\"4425\"){_idnamepopulationflag{_idemoji}borders{_idnamecapital}}"

//*=========================================================================*//
/*
  hashAndStoreFields

  Description: Takes a set of fields, generates hashes with them, gives them a value of true and 
  and outputs an object
*/
await hashAndStoreFields(queryType, fields, returnTypes, obsidianTypeSchema, cache);
//INPUT
queryType
fields
returnTypes
obsidianTypeSchema
cache

//PROCESS
hashAndStoreFieldsOfObject

//OUTPUT
output = {
  'Country~4425~borders': true,
  'Country~4425~flag': true,
  'Country~4425~name': true,
  'Country~4425~population': true
}

//*=========================================================================*//
/*
  hashAndStoreFieldsOfObject

  Description: Takes in an object of properties and eventually 
  returns an object of hashes with values true
*/
async function hashAndStoreFieldsOfObject(typeSchemaName, fields, obsidianTypeSchema, queryType, returnTypes, cache)

// INPUT
typeSchemaName
fields = {
  _id: '4425',
  name: 'United States of America',
  population: 323947000,
  flag: {
    _id: '4440',
    emoji:'🇺🇸'
  },
  borders: [
    {
      capital: "Mexico City",
      name: "Mexico",
      _id: "2741"
    }, 
    {
      capital: "Ottawa",
      name: "Canada",
      _id: "860",
    }
  ],
}
obsidianTypeSchema
queryType
returnTypes
cache

// PROCESS
oldReduce

// OUTPUT
hashes = {
  "Country~4425~name": true, 
  "Country~4425~population": true, 
  "Country~4425~flag": true, 
  "Country~4425~borders": true
}

//*=========================================================================*//
/*
  oldReduce

  Description: Takes a property, creates a hash, and enters it into the
  hash object
*/
async function oldReduce(property)

// INPUT
property = "name"

// PROCESS
hashGenerator // generates a hash
hashAndStoreFields // hashes and stores values within the nested obj
checkID // returns null or id of a named type (if it exists)
checkAndInsert // hashes pieces of data with their values

// OUTPUT
// Adds an element to the hash object


//*=========================================================================*//
/*
  hashGenerator

  Description: takes various fields and creates a hash
*/
async function hashGenerator(typeSchemaName, id, property)

// INPUT
typeSchemaName
id
property

// PROCESS

// OUTPUT
hash = "Country~4425~name"

//*=========================================================================*//
/*
  checkID

  Description: takes a the value associated with a property 
  and returns null or an id
*/

function checkID(propObj)
// INPUT
propObj

// PROCESS

// OUTPUT
newID = id || null