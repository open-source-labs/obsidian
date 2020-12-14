/**
 * NOTES:
 * 1.This file will test readCache functionality:
 * Should return the correct object if all values are in the cache.
 * Should return undefined if any field is missing value  in the cache.
 * Should accept multiple queries in one query operation.
 * 2. This file will test populateAllTypes functionality:
 * Should return an array if all fields are found.
 * Should return undefined if any field is missing value.
 * Reviews:
 * Change comments for what we are testing
 * Adding a file that contains all the variables for the test suite readCache
 */

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
  'Actor~1': { id: '1', firstName: 'Harrison' },
  'Actor~2': { id: '2', firstName: 'Sean' },
  'Actor~3': { id: '3', firstName: 'Mark' },
  'Actor~4': { id: '4', firstName: 'Patti' },
  'Actor~5': { id: '5', firstName: 'Gary' },
};

const fields = {
  __typename: 'meta',
  id: 'scalar',
  firstName: 'scalar',
  lastName: 'scalar',
};
Rhum.testPlan('readCache.js', () => {
  Rhum.testSuite('readCache()', () => {
    Rhum.testCase(
      'should return the correct object if all values are in the cache',
      () => {
        const result = readCache(
          `
  query getActorById {
    actor(id: 1) {
      __typename
      id
      firstName
    }
  }
`,
          cache
        );
        Rhum.asserts.assertEquals(result, {
          data: {
            actor: [
              {
                __typename: 'Actor',
                id: '1',
                firstName: 'Harrison',
              },
            ],
          },
        });
      }
    );
    Rhum.testCase(
      'should return undefined if any field is missing value  in the cache',
      () => {
        const result = readCache(
          `
  query getActorById {
    actor(id: 1) {
      __typename
      id
      firstName
      lastName
    }
  }
`,
          cache
        );
        Rhum.asserts.assertEquals(result, undefined);
      }
    );
    Rhum.testCase(
      'should accept multiple queries in one query operation',
      () => {
        const result = readCache(
          `
      query AllActionMoviesAndAllActors {
        movies(input: { genre: ACTION }) {
          __typename
          id
          title
          genre
          actors {
            __typename
            id
            firstName
          }
        }
        actors {
          __typename
          id
          firstName
        }
      }
      }
    `,
          cache
        );
        Rhum.asserts.assertEquals(result, {
          data: {
            movies: [
              {
                __typename: 'Movie',
                id: '1',
                title: 'Indiana Jones and the Last Crusade',
                genre: 'ACTION',
                actors: [
                  {
                    __typename: 'Actor',
                    id: '1',
                    firstName: 'Harrison',
                  },
                  {
                    __typename: 'Actor',
                    id: '2',
                    firstName: 'Sean',
                  },
                ],
              },
              {
                __typename: 'Movie',
                id: '4',
                title: 'Air Force One',
                genre: 'ACTION',
                actors: [
                  {
                    __typename: 'Actor',
                    id: '1',
                    firstName: 'Harrison',
                  },
                  {
                    __typename: 'Actor',
                    id: '5',
                    firstName: 'Gary',
                  },
                ],
              },
            ],
            actors: [
              {
                __typename: 'Actor',
                id: '1',
                firstName: 'Harrison',
              },
              { __typename: 'Actor', id: '2', firstName: 'Sean' },
              { __typename: 'Actor', id: '3', firstName: 'Mark' },
              { __typename: 'Actor', id: '4', firstName: 'Patti' },
            ],
          },
        });
      }
    );
  });

  Rhum.testSuite('populateAllTypes()', () => {
    Rhum.testCase(
      'should return undefined if any field is missing value ',
      () => {
        const result = populateAllTypes('Actor~1', cache, fields);
        Rhum.asserts.assertEquals(result, undefined);
      }
    );
    Rhum.testCase('should return an array if all fields are found', () => {
      const result = populateAllTypes('Actor~1', cache, {
        __typename: 'meta',
        id: 'scalar',
        firstName: 'scalar',
      });
      Rhum.asserts.assertEquals(result, [
        { __typename: 'Actor', id: '1', firstName: 'Harrison' },
      ]);
    });
  });
});
Rhum.run();
