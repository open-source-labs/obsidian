/**
 * NOTES:
 * 1.This file will test readCache functionality:
 * Should return an object if all values are in the cache.
 * Should return undefined if any field is missing value  in the cache.
 * Should accept multiple queries in one query operation.
 * 2. This file will test populateAllTypes functionality:
 * Should return an array if all fields are found.
 * Should return undefined if any field is missing value.
 * Reviews:
 * Change comments for what we are testing
 * Adding a file that contains all the variables for the test suite readCache
 */

import { writeCache } from '../../src/writeCache.js';
import { Rhum } from 'https://deno.land/x/rhum@v1.1.4/mod.ts';
const toAddInCache = {
  ROOT_QUERY: {
    'actor(id:1)': 'Actor~1',
    movies: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~4'],
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
  'Actor~1': {
    id: '1',
    firstName: 'Harrison',
    lastName: 'Ford',
    films: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~4'],
  },
  'Actor~3': {
    id: '3',
    firstName: 'Mark',
    lastName: 'Hamill',
    films: ['Movie~2'],
  },
  'Actor~4': {
    id: '4',
    firstName: 'Patti',
    lastName: 'LuPone',
    films: ['Movie~3'],
  },
  'Actor~5': {
    id: '5',
    firstName: 'Gary',
    lastName: 'Oldman',
    films: ['Movie~4'],
  },
};
const originalCache = {
  ROOT_QUERY: {
    'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~4'],
    actors: ['Actor~1', 'Actor~2', 'Actor~3', 'Actor~4', 'Actor~5'],
  },
  'Movie~1': {
    id: '1',
    title: 'Indiana Jones and the Last Crusade',
    actors: ['Actor~1', 'Actor~2'],
    genre: 'ACTION',
  },
  'Movie~2': {
    id: '2',
    title: 'Empire Strikes Back',
  },
  'Movie~3': {
    id: '3',
    title: 'Witness',
  },
  'Movie~4': {
    id: '4',
    title: 'Air Force One',
    actors: ['Actor~1', 'Actor~5'],
    genre: 'ACTION',
  },

  'Actor~2': {
    id: '2',
    firstName: 'Sean',
    lastName: 'Connery',
    films: ['Movie~1'],
  },
};
const expectedResultCache = {
  ROOT_QUERY: {
    'actor(id:1)': 'Actor~1',
    movies: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~4'],
    'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~4'],
    actors: ['Actor~1', 'Actor~2', 'Actor~3', 'Actor~4', 'Actor~5'],
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
  'Actor~1': {
    id: '1',
    firstName: 'Harrison',
    lastName: 'Ford',
    films: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~4'],
  },
  'Actor~2': {
    id: '2',
    firstName: 'Sean',
    lastName: 'Connery',
    films: ['Movie~1'],
  },
  'Actor~3': {
    id: '3',
    firstName: 'Mark',
    lastName: 'Hamill',
    films: ['Movie~2'],
  },
  'Actor~4': {
    id: '4',
    firstName: 'Patti',
    lastName: 'LuPone',
    films: ['Movie~3'],
  },
  'Actor~5': {
    id: '5',
    firstName: 'Gary',
    lastName: 'Oldman',
    films: ['Movie~4'],
  },
};
Rhum.testPlan('writeCache.js', () => {
  Rhum.testSuite('creatCache()', () => {
    Rhum.testCase(
      'should return an updated cache with the new fields and queries',
      () => {
        const result = writeCache(toAddInCache, originalCache);
        Rhum.asserts.assertEquals(result, expectedResultCache);
      }
    );
  });
});
// deno test --allow-env
