/* ----------------------------------------------------------------*/
/** detransformResult 
* Returns a nested object representing the original graphQL response object for a given queryKey
* @param {String} queryKey String representing the stringified GraphQL query for a big read query, which should have been saved as a key in Redis
* @param {GenericObject} transformedValue Nested object representing of references, where the references are hashes in Redis
* @return {GenericObject} Nested object representing the original graphQL response object for a given queryKey
*/
const detransformResult = async (queryKey: String, transformedValue: GenericObject) => {

    // remove all text within parentheses aka '(input: ...)'
    queryKey = queryKey.replace(/\(([^)]+)\)/, '');
    // save Regex matches for line break followed by '{'
    const matches = [...queryKey.matchAll(/\n([^\n]+)\{/g)];
  
    const fields = [];
    matches.forEach(match => {
      fields.push(match[1].trim());
    });
    // fields is [ 'movies', 'actors' ]
    
    const recursiveDetransform = (transformedValue, fields, depth = 0) => {
      const result = {}; 
      let currDepth = depth;
      // depth;
      // console.log(transformedValue);
      if (Object.keys(transformedValue).length === 0) {
        return result;
      } else {
        let currField = fields[currDepth];
        result[currField] = [];
    
        for (let hash in transformedValue) { 
          // console.log(hash)
          const testObj = 
          {
            id: "7",
            __typename: "Movie"
          }
          result[currField].push(testObj);
          console.log(transformedValue[hash]);
          
          result[currField][result[currField].length - 1] = Object.assign(
            result[currField][result[currField].length - 1], 
            recursiveDetransform(transformedValue[hash], fields, depth = currDepth + 1)
          )
          // depth;
          console.log(result);
        }
        return result;
      }
    }
    const result = {};
    result.data = recursiveDetransform(transformedValue, fields);
  
    return result;
  }
  
  const expectedDetransformedValue =  
  {
    data: {
      movies: [
        {
          id: "7",
          __typename: "Movie",
          title: "Ad Astra",
          releaseYear: 2019,
          genre: "SCIFI",
          actors: [Array]
        },
        {
          id: "15",
          __typename: "Movie",
          title: "World War Z",
          releaseYear: 2013,
          genre: "SCIFI",
          actors: [Array]
        },
        {
          id: "17",
          __typename: "Movie",
          title: "Sky Captain and the World of Tomorrow",
          releaseYear: 2004,
          genre: "SCIFI",
          actors: [Array]
          // actors: [~Actor~1, ~Actor~2]
        }
      ]
    }
  }
  const transformedResult =
  {
    "~Movie~7": {
      "Actor~1": {},
      "Actor~2": {}
    },
    "~Movie~8": {
      "Actor~3": {},
      "Actor~4": {}
    },
  }
  
  const queryRedis = "{\n  movies(input: {genre: SCIFI}) {\n    id\n    __typename\n    title\n    releaseYear\n    genre\n    actors {\n      id\n      __typename\n      firstName\n      lastName\n    }\n  }\n}\n"
  
  console.log(detransformResult(queryRedis, transformedResult));
  
  const queryKey = 
  `query {
    movies(input: {genre: SCIFI}){
      id
      __typename
      title
      releaseYear
      genre
      actors {
        id
        __typename
        firstName
        lastName
      }
    }
  }`