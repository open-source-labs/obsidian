// DESTRUCTURE

destructureQueries(query, ObsidianSchema, cache);

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

const cache = {
  'Country(_id:"4425"){_idnamepopulationflag{_idemoji}borders{_idnamecapital}}': {
    'Country~4425~name': true,
    'Country~4425~population': true,
    'Country~4425~flag': true,
    'Country~4425~borders': true,
  },
  'Country~860~capital': 'Ottawa',
  'Country~860~name': 'Canada',
  'Country~2741~capital': 'Mexico City',
  'Country~2741~name': 'Mexico',
  'Country~4425~borders': { 'Country~2741': true, 'Country~860': true },
  'Country~4425~flag': 'Flag~4440',
  'Country~4425~name': 'United States of America',
  'Country~4425~population': 323947000,
  'Flag~4440~emoji': '🇺🇸',
};

// PROCESS:
// finds the specific queries if there is more than one
findSpecificQueries;
// checks to see if the fields on each querie are currerently stored in the cache
createQueryObj;
// converts the query string into a query object for reference
// creates a hash array from the keys on queryHashes
buildResultsObject;
// attempts to build result object by comparing the cache, queryObj, and hashes

// OUTPUT:

// if any part of the query string is a mutation return 'mutation'???

// if everything is not found in cache return undefined;

// if everything is found in cache
const obsidianReturn = {
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
};

// =====================================================================
queryHashes = findSpecificQueries(query, obsidianSchema, cache);
// INPUT: nothing new

// PROCESS:
findqueryname; // finds the first query name
// iterate through the rest of the query to find all of the other querie names and hash them onto the queryHashes object
specificQueryParser;
// this is what query hashes looks like now
queryHashes = {
  Country:
    'Country(_id:"4425"){_idnamepopulationflag{_idemoji}borders{_idnamecapital}}',
};
checkAndRetrieveHash;

// OUTPUT:
const queryHashes = { Country: undefined }; // if cache does not have everything
// if cache has everything
const queryHashes = {
  Country: {
    'Country~4425~borders': true,
    'Country~4425~flag': true,
    'Country~4425~name': true,
    'Country~4425~population': true,
  },
};

// =====================================================================
const nameOfQuery = findQueryName(query);

// INPUT: nothing new

// PROCESS:
// parsing function to find the name of the query

// OUTPUT:
const nameOfQuery = 'Country';
// will return 'mutation' if it's a mutation query; this will casue the destucture to break out

// ==========================================================
const next = specificQueryParser(startIndexOfName, query);

// INPUT: startIndexOfName is where we left off in the query parsing
const startIndexOfName = 9;
// PROCESS:
// parses individual queries into minified strings and finds the end index
// OUTPUT:
const next = {
  output:
    'Country(_id:"4425"){_idnamepopulationflag{_idemoji}borders{_idnamecapital}}',
  endIdx: 256,
};

// ========================================================================

redisResults[queryHash] = checkAndRetrieveQuery(queryHashes[queryHash], cache);

// INPUT: individual query hash for one query and the cache

// PROCESS:
// checks to see if the minified query string is stored in cache, if so return corresp[ponding object

// OUTPUT:
// if cache doesn't have everything return undefined

// if cache has everything
const redisResults = {
  'Country~4425~name': true,
  'Country~4425~population': true,
  'Country~4425~flag': true,
  'Country~4425~borders': true,
};

// =======================================================================
const queryObj = createQueryObj(queryName, query, obsidianSchema);

// INPUT: nothing special

// PROCESS:
// parses query string and converts it to query object
// NOTES:
// this seems to be the first place they actually use the schema. do they need the schema?
// There is a note here about not supporting any paramters other than ID??
// We should look at this closer later and see if there is abetter way;
// OUTPUT:

const queryObj = {
  queryName: 'Country',
  paramaters: { _id: '"4425"' },
  properties: {
    _id: true,
    name: true,
    population: true,
    flag: { _id: true, emoji: true },
    borders: { _id: true, name: true, capital: true },
  },
};

// ==========================================================================
result.data[queryName] = await buildResultsObject(
  hashes,
  obsidianSchema,
  queryObj,
  cache
);

// INPUT:
const hashes = [
  'Country~4425~borders',
  'Country~4425~flag',
  'Country~4425~name',
  'Country~4425~population',
];

// PROCESS:
// parsing to store the 3 parts of a hash as variables
retrieveScalar;
restrieveComplex;
batchHash;
nestedPropertyHashConstructor;
// finds the corresponding values in the cache and stores them as appropriate on the passed in results object
// Notes:
// this is also using the schema? is there a better way?
// this is complex parsing? should definitly take another look at some point
// OUTPUT:

// if not able to find everything return undefined

// if able to find everything in cache
const obsidianReturn = {
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
};
