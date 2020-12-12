/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/**
 * NOTES:
 * 1.
 */
const realCache = {
  ROOT_QUERY: {
    movies: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~4'],
    actors: ['Actor~1', 'Actor~2', 'Actor~3', 'Actor~4'],
    'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~4'],
    // added
    'movies(input:{order:EARLIESTFIRST})': [
      'Movie~2',
      'Movie~3',
      'Movie~1',
      'Movie~4',
    ],
  },
  'Movie~1': {
    id: '1',
    title: 'Indiana Jones and the Last Crusade',
    actors: ['Actor~1', 'Actor~2'],
    genre: 'ACTION',
    releaseYear: 1989,
  },
  'Movie~2': {
    id: '2',
    title: 'Empire Strikes Back',
    actors: ['Actor~1', 'Actor~3'],
    releaseYear: 1980, // added
  },
  'Movie~3': {
    id: '3',
    title: 'Witness',
    actors: ['Actor~1', 'Actor~4'],
    releaseYear: 1985, // added
  },
  'Movie~4': {
    id: '4',
    title: 'Air Force One',
    actors: ['Actor~1', 'Actor~5'],
    genre: 'ACTION',
    releaseYear: 1997,
  },
  'Actor~1': { id: '1', firstName: 'Harrison' },
  'Actor~2': { id: '2', firstName: 'Sean' },
  'Actor~3': { id: '3', firstName: 'Mark' },
  'Actor~4': { id: '4', firstName: 'Patti' },
  'Actor~5': { id: '5', firstName: 'Gary' },
};

//* input after helper parsing function
const inputQueryOne = [
  {
    name: 'movies',
    arguments: '(input:{genre:ACTION})',
    fields: {
      __typename: 'meta',
      id: 'scalar',
      title: 'scalar',
      genre: 'scalar',
      actors: {
        __typename: 'meta',
        id: 'scalar',
        firstName: 'scalar',
        lastName: 'scalar',
      },
    },
  },
  {
    name: 'actors',
    arguments: '',
    fields: {
      __typename: 'meta',
      id: 'scalar',
      firstName: 'scalar',
      lastName: 'scalar',
    },
  },
];
const inputQueryTwo = [
  {
    name: 'movies',
    arguments: '',
    fields: ['id', 'title', { actors: ['id', 'firstName'] }],
  },
];

//* CRUD READ
function readCache(queries, cache) {
  const dataRes = {};
  for (const query in queries) {
    let arrayTypes;
    // get the entire str query from the name query and arguments
    const rootQuery = queries[query].name.concat(queries[query].arguments);
    // match in ROOT_QUERY
    if (cache.ROOT_QUERY[rootQuery]) {
      arrayTypes = cache.ROOT_QUERY[queries[query].name];

      // invoke populate and add data objects to the data response
      dataRes[queries[query].name] = populate(
        arrayTypes,
        cache,
        queries[query].fields
      );
      // no match with ROOT_QUERY return null or ...
    } else return 'query not found';
  }
  return { data: dataRes };
}
//* helper function that populates dataRes types with fields
function populate(arrTypes, cache, fields) {
  // include the type name for each types
  const hyphenIdx = arrTypes[0].indexOf('~');
  const typeName = arrTypes[0].slice(0, hyphenIdx);
  console.log(typeName);
  return arrTypes.reduce((acc, type, idx) => {
    acc.push({});
    const dataObj = acc[idx];
    for (const field in fields) {
      if (typeof fields[field] !== 'object') {
        console.log(field);
        if (field === '__typename') {
          dataObj[field] = typeName;
        } else dataObj[field] = cache[type][field];
      } else {
        dataObj[field] = populate(cache[type][field], cache, fields[field]);
      }
    }
    return acc;
  }, []);
}

const data = readCache(inputQueryOne, realCache);
console.log(readCache(inputQueryOne, realCache));
console.log(data.data.movies[0]);

const testResponse = {
  data: {
    movies: [
      {
        __typename: 'Actor',
        id: '1',
        title: 'Indiana Jones and the Last Crusade',
        genre: 'ACTION',
        actors: [
          { id: '1', firstName: 'Harrison', lastName: undefined },
          { id: '2', firstName: 'Sean', lastName: undefined },
        ],
      },
      {
        __typename: 'Actor',
        id: '2',
        title: 'Empire Strikes Back',
        genre: undefined,
        actors: [Object],
      },
      {
        __typename: 'Actor',
        id: '3',
        title: 'Witness',
        genre: undefined,
        actors: [Object],
      },
      {
        __typename: 'Actor',
        id: '4',
        title: 'Air Force One',
        genre: 'ACTION',
        actors: [Object],
      },
    ],
    actors: [
      {
        __typename: 'Actor',
        id: '1',
        firstName: 'Harrison',
        lastName: undefined,
      },
      { __typename: 'Actor', id: '2', firstName: 'Sean', lastName: undefined },
      { __typename: 'Actor', id: '3', firstName: 'Mark', lastName: undefined },
      { __typename: 'Actor', id: '4', firstName: 'Patti', lastName: undefined },
    ],
  },
};
