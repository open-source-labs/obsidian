import { readCache, populateAllTypes } from '../../src/readCache.js';
import { Rhum } from 'https://deno.land/x/rhum@v1.1.4/mod.ts';

const cache = {
  ROOT_QUERY: {
    'actor(id:1)': 'Actor~1',
    movies: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~4'],
    actors: ['Actor~1', 'Actor~2', 'Actor~3', 'Actor~4'],
    'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~4'],
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
    releaseYear: 1980,
  },
  'Movie~3': {
    id: '3',
    title: 'Witness',
    actors: ['Actor~1', 'Actor~4'],
    releaseYear: 1985,
  },
  'Movie~4': {
    id: '4',
    title: 'Air Force One',
    actors: ['Actor~1', 'Actor~5'],
    genre: 'ACTION',
    releaseYear: 1997,
  },
  'Actor~1': { id: '1', firstName: 'Harrison', lastName: 'Ford' },
  'Actor~2': { id: '2', firstName: 'Sean' },
  'Actor~3': { id: '3', firstName: 'Mark' },
  'Actor~4': { id: '4', firstName: 'Patti' },
  'Actor~5': { id: '5', firstName: 'Gary' },
}

const fields = { __typename: 'meta', 
  id: 'scalar', 
  title: 'scalar', 
  genre: 'scalar', 
  actors: { __typename: 'meta', id: 'scalar', firstName: 'scalar' }
} 
  
Rhum.testPlan('readCache.js', () => {
  Rhum.testSuite('readCache()', () => {
    Rhum.testCase('should return an object or undefined', () => {
      const result = readCache(`
  query getActorById {
    actor(id: 1) {
      __typename
      id
      firstName
      lastName
    }
  }
`, cache)
      Rhum.asserts.assertEquals(result, {
  data: {
    actor: [
      {
        __typename: 'Actor',
        id: '1',
        firstName: 'Harrison',
        lastName: 'Ford',
      },
    ],
  },
} || undefined);
    });
  });

  Rhum.testSuite('populateAllTypes()', () => {
    Rhum.testCase('return an array', () => {
      const result = populateAllTypes(['Movie~1', 'Movie~4'], cache, fields);
      Rhum.asserts.assertEquals(result, [{ __typename: 'Actor', id: '1', firstName: 'Harrison', lastName: 'Ford' }]);
    })
  })
});
Rhum.run();