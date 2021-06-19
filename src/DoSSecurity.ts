import destructureQueries from './destructure.js';

interface queryObj {
  queries?: Array<object>,
  mutations?: Array<object>,
}
/**
 * Tests whether a queryString (string representation of query) exceeds the maximum nested depth levels (queryDephtLimit) allowable for the instance of obsidian
 * @param {*} queryString the string representation of the graphql query
 * @param {*} queryDepthLimit number representation of the maximum query depth limit.  Default 0 will return undefined. Root query doesn't count toward limit.
 * @returns boolean indicating whether the query depth exceeded maximum allowed query depth
 */
export default function queryDepthExceeded(queryString: string, queryDepthLimit: number = 0): void {
  const queryObj = destructureQueries(queryString) as queryObj;
  // Make a subfunction called 'queryDepthCheck', params queryObj, queryDepthLimit, depth and returns boolean
  /**
   *Function that tests whether the query object debth exceeds maximum depth
   * @param {*} qryObj an object representation of the query (after destructure)
   * @param {*} qryDepthLim the maximum query depth
   * @param {*} depth indicates current depth level
   * @returns boolean indicating whether query depth exceeds maximum depth
   */
  const queryDepthCheck = (qryObj: queryObj, qryDepthLim: number, depth: number = 0): boolean => {
    // check if queryObj has query or mutation root type, if so, call query depth check on each of its elements
    if (Object.prototype.hasOwnProperty.call(qryObj, 'queries')) {
      qryObj.queries?.forEach((element: object) => {
        queryDepthCheck(element, queryDepthLimit);
      });
    }
    if (Object.prototype.hasOwnProperty.call(qryObj, 'mutations')) {
      qryObj.mutations?.forEach((element: object) => {
        queryDepthCheck(element, queryDepthLimit);
      });
    }

    // base case 1: check to see if depth exceeds limit, if so, return error (true => depth has been exceeded)
    if (depth > qryDepthLim) return true;
    // Iterate through values of queryObj, and check if it is an object,
    for (let value = 0; value < Object.values(qryObj).length; value++) {
      // if so return invoked QDC with depth+1
      const currentValue = Object.values(qryObj)[value];
      if (typeof currentValue === 'object') {
        return queryDepthCheck(currentValue, qryDepthLim, depth + 1);
      }
    }
    // base case 2: reach end of object keys iteration,return false - depth has not been exceeded
    return false;
  };
  // Invoke QDC and if returns true return error, else return nothing
  if (queryDepthCheck(queryObj, queryDepthLimit)) {
    throw new Error(
      'Security Error: Query depth exceeded maximum query depth limit'
    );
  }
}
