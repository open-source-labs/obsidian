export const test = {
  DEPTH_2_QUERY: `
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
  }`,

  DEPTH_2_MUTATION: `
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
  }`,

  MULTIPLE_DEPTH_2_QUERY: `
  query AllActionMovies {
    movies(input: { genre: ACTION }) {
      __typename
      id
      title
      genre
    },
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
    },
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
  }`,

  MULTIPLE_DEPTH_2_MUTATION: `
  mutation AllActionMovies {
    movies(input: { genre: ACTION }) {
      __typename
      id
      title
      genre
    },
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
    },
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
  }`,
};