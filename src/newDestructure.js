/**
 * NOTES:
 * 1. For now we will record the arguments as a string unless we come up with an alternative argument
 * 2. We won't worry about arguments on fields for now
 * 3. We won't worry about aliases for now
 * 4. We won't worry about handling directives for now
 * 5. We wont't worry about fragments for now
 * 6. This function will assume that everything passed in is a query,
 *    I can't think of a reason we would ever want to destructure a mutation request
 *    Let me know if you can think of reason
 * 7. We won't handle variables for now, but we may very well find we need to
 * 8. We will handle only meta field "__typename" for now
 *
 */

function destructureQueries(query) {
  // this function will destructure a query string into an object
}

const ALL_ACTION_MOVIES_AND_ALL_ACTORS = gql`
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

destructureQueries(ALL_ACTION_MOVIES_AND_ALL_ACTORS);

const sampleResult = {
  queries: [
    {
      name: 'movies',
      arguments: '(input:{genre:ACTION})',
      fields: {
        __typename: 'meta',
        id: 'scalar',
        title: 'scalar',
        genre: 'scalar',
        actors: { id: 'scalar', firstName: 'scalar', lastName: 'scalar' },
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
