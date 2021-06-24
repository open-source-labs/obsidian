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
};