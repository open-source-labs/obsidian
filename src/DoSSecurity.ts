import destructureQueries from './Browser/destructure.js';

// Interface representing shape of query object after destructuring
interface queryObj {
  queries?: Array<object>,
  mutations?: Array<object>,
}

/**
 * Tests whether a queryString (string representation of query) exceeds the maximum nested depth levels (queryDepthLimit) allowable for the instance of obsidian
 * @param {*} queryString the string representation of the graphql query
 * @param {*} queryDepthLimit number representation of the maximum query depth limit.  Default 0 will return undefined. Root query doesn't count toward limit.
 * @returns boolean indicating whether the query depth exceeded maximum allowed query depth
 */
export default function queryDepthLimiter(queryString: string, queryDepthLimit: number = 0): void {
  const queryObj = destructureQueries(queryString) as queryObj;
  /**
   *Function that tests whether the query object debth exceeds maximum depth
   * @param {*} qryObj an object representation of the query (after destructure)
   * @param {*} qryDepthLim the maximum query depth
   * @param {*} depth indicates current depth level
   * @returns boolean indicating whether query depth exceeds maximum depth
   */
  const queryDepthCheck = (qryObj: queryObj, qryDepthLim: number, depth: number = 0): boolean => {
    // Base case 1: check to see if depth exceeds limit, if so, return error (true means depth limit was exceeded)
    if (depth > qryDepthLim) return true;
    // Recursive case: Iterate through values of queryObj, and check if each value is an object,
    for (let value = 0; value < Object.values(qryObj).length; value++) {
      // if the value is an object, return invokation queryDepthCheck on nested object and iterate depth
      const currentValue = Object.values(qryObj)[value];
      if (typeof currentValue === 'object') {
        return queryDepthCheck(currentValue, qryDepthLim, depth + 1);
      };
    };
    // Base case 2: reach end of object keys iteration,return false - depth has not been exceeded
    return false;
  };

      // Check if queryObj has query or mutation root type, if so, call queryDepthCheck on each element, i.e. each query or mutation
  if (queryObj.queries) {
    for(let i = 0; i < queryObj.queries.length; i++) {
      if(queryDepthCheck(queryObj.queries[i], queryDepthLimit)) {
        throw new Error(
          'Security Error: Query depth exceeded maximum query depth limit'
        );
      };
    };
  };
  
  if (queryObj.mutations){
    for (let i = 0; i < queryObj.mutations.length; i++) {
      if (queryDepthCheck(queryObj.mutations[i], queryDepthLimit)) {
        throw new Error(
          'Security Error: Query depth exceeded maximum mutation depth limit'
        );
      };
    };
  };
}
