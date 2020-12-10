/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */

const realCache = {
  ROOT_QUERY: {
    movies: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~4'],
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
const inputQueryOne = {
  queryName: 'movies',
  arguments: '(input:{genre:ACTION})',
  fields: {
    __typename: 'meta',
    id: 'scalar',
    title: 'scalar',
    genre: 'scalar',
    actors: { id: 'scalar', firstName: 'scalar', lastName: 'scalar' },
  },
};
const inputQueryTwo = [
  {
    queryName: 'movies',
    arguments: '',
    fields: ['id', 'title', { actors: ['id', 'firstName'] }],
  },
];

//* CRUD READ
function readCache(query, cache) {
  let dataRes;
  let arrayTypes;
  // get the entire str query from the nama query and arguments
  const rootQuery = query.queryName.concat(query.arguments);
  // match in ROOT_QUERY
  if (cache.ROOT_QUERY[rootQuery]) {
    arrayTypes = cache.ROOT_QUERY[query.queryName];
    dataRes = {};
    // invoke populate and add data objects to the data response
    dataRes[query.queryName] = populate(arrayTypes, cache, query.fields);
    return { data: dataRes };
    // no match with ROOT_QUERY we need to fetch the data
  }
  return 'query not found';
}
//* helper function that populates dataRes types with fields
function populate(arrTypes, cache, fields) {
  return arrTypes.reduce((acc, type, idx) => {
    acc.push({});
    const dataObj = acc[idx];
    for (const field in fields) {
      if (typeof fields[field] !== 'object') {
        dataObj[field] = cache[type][field];
      } else {
        dataObj[field] = populate(cache[type][field], cache, fields[field]);
      }
    }
    return acc;
  }, []);
}

const data = readCache(inputQueryOne, realCache);
console.log(readCache(inputQueryOne, realCache));
console.log(data.data.movies[3]);

// function that fetchs data
