export const test = {
  singleQueryInput: `
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
  }
  }
`,

  singleQueryOutput:
    'query AllActionMoviesAndAllActors { movies(input: { genre: ACTION }) { __typename id title genre actors { __typename  id firstName lastName } } } }',

  singleMutationInput: `
  mutation AllActionMoviesAndAllActors {
    movies(input: { genre: ACTION }) {
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
  }
`,

  singleMutationOutput:
    'mutation AllActionMoviesAndAllActors { movies(input: { genre: ACTION }) { __typename  id title genre actors { __typename  id firstName lastName } } } }',

  multipleQueriesInput: `
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
`,
  multipleQueriesOutput:
    'query AllActionMoviesAndAllActors { movies(input: { genre: ACTION }) { __typename id title genre actors { __typename  id firstName lastName } } actors { __typename  id firstName lastName films { __typename id title } } } }',

  fieldsStrInput:
    '{ __typename id title genre actors { id firstName lastName } }',
  fieldsStrOutput:
    '{ __typename id title genre actors { __typename  id firstName lastName } }',

  newAliasTestQuery: `
    query twoHeros {
      empireHero: hero(episode: EMPIRE) {
        name
      }
      jediHero: hero(episode: JEDI) {
        name
      }
    }`,

  newAliasTestResult: `query twoHeros { empireHero: hero(episode: EMPIRE) { __typename  name } jediHero: hero(episode: JEDI) { __typename  name } }`,
};
