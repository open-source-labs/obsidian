/**
 * NOTES:
 * 1. This implementation does not handle variables currently
 * 2. This function will always send the inputted mutation operation string to the inputted endpoint
 * 3. This function would invoke gc() every time a mutation is made except when an update function is provided by the developer.
 * 4. This implementation would update the cache only if the flag cache is set to true.
 * 5. This function takes in a mutation string and an optional options object and returns the response object from the request made.
 */

function mutate(mutation, options = {}) {
  // set the options object default properties if not provided
  const {
    endpoint = '/graphql',
    cache = true,
    toDelete = false,
    update = null,
  } = options;
  // for any mutation a request to the server is made
  try {
    const responseObj = fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query: mutation }),
    }).then((resp) => resp.json());
    if (!cache) return responseObj;
    // first behaviour when delete cache is set to true
    if (toDelete) {
      this.write(mutation, responseObj, true);
      this.gc();
      return responseObj;
    }
    // second behaviour if update function provided
    if (update) {
      return update(this, responseObj);
    }
    // third behaviour just for normal update (no-delete, no update function)
    this.write(mutation, responseObj);
    this.gc();
    return responseObj;
  } catch (e) {
    console.log(e);
  }
}
