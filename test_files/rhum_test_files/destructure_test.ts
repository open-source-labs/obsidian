import { Rhum } from 'https://deno.land/x/rhum@v1.1.4/mod.ts';
import destructureQueries from '../../src/newDestructure.js';

const ALL_ACTION_MOVIES = `
      query AllActionMovies {
        movies(input: { genre: ACTION }) {
          __typename
          id
          title
          genre
          actors {
            id
            firstName
            lastName
          }
        }
      }
        `;

const ALL_ACTORS = `
        query AllActors {
          actors {
            id
            firstName
            lastName
            films {
              __typename
              id
              title
            }
          }
        }
        }
          `;

const ALL_ACTION_MOVIES_AND_ALL_ACTORS = `
      query AllActionMoviesAndAllActors {
        movies(input: { genre: ACTION }) {
          __typename
          id
          title
          genre
          actors {
            id
            firstName
            lastName
          }
        }
        actors {
          id
          firstName
          lastName
          films {
            __typename
            id
            title
          }
        }
      }
      }
        `;

Rhum.testPlan('destructure.ts', () => {
  Rhum.testSuite('destructure invalid query tests', () => {
    Rhum.testCase('destructure empty query string', async () => {
      const EMPTY_QUERY_STRING = '';
      const result = destructureQueries(EMPTY_QUERY_STRING);
      const testResult = {};
      Rhum.asserts.assertEquals(testResult, {});
    });
    Rhum.testCase('destructure invalid query string', async () => {
      const INVALID_QUERY_STRING = 'abc123';
      const result = destructureQueries(INVALID_QUERY_STRING);
      const testResult = {};
      Rhum.asserts.assertEquals(testResult, {});
    });
  });
  Rhum.testSuite('destructure single query tests', () => {
    Rhum.testCase('destructure single query string - no inputs', async () => {
      const result = destructureQueries(ALL_ACTORS);
      const testResult = {
        queries: [
          {
            name: 'actors',
            arguments: '',
            fields: {
              id: 'scalar',
              firstName: 'scalar',
              lastName: 'scalar',
              films: {
                __typename: 'meta',
                id: 'scalar',
                title: 'scalar',
              },
            },
          },
        ],
      };
      Rhum.asserts.assertEquals(testResult, result);
    });
    Rhum.testCase('destructure single query string - inputs', async () => {
      const result = destructureQueries(ALL_ACTION_MOVIES);
      const testResult = {
        queries: [
          {
            name: 'movies',
            arguments: '(input:{genre:ACTION})',
            fields: {
              __typename: 'meta',
              id: 'scalar',
              title: 'scalar',
              genre: 'scalar',
              actors: {
                id: 'scalar',
                firstName: 'scalar',
                lastName: 'scalar',
              },
            },
          },
        ],
      };
      Rhum.asserts.assertEquals(testResult, result);
    });
  });
  Rhum.testSuite('destructure multi query tests', () => {
    Rhum.testCase('destructure multi query - input / non input', async () => {
      const result = destructureQueries(ALL_ACTION_MOVIES_AND_ALL_ACTORS);
      const testResult = {
        queries: [
          {
            name: 'movies',
            arguments: '(input:{genre:ACTION})',
            fields: {
              __typename: 'meta',
              id: 'scalar',
              title: 'scalar',
              genre: 'scalar',
              actors: {
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
              id: 'scalar',
              firstName: 'scalar',
              lastName: 'scalar',
              films: {
                __typename: 'meta',
                id: 'scalar',
                title: 'scalar',
              },
            },
          },
        ],
      };
      Rhum.asserts.assertEquals(testResult, result);
    });
  });
});

Rhum.run();
