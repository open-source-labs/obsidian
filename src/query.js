async function query(query, options = {}) {
  // set the options object default properties if not provided
  const {
    endpoint = '/graphql',
    cacheRead = true,
    cacheWrite = true,
    pollInterval = null,
    wholeQuery = false,
  } = options;

  // when pollInterval is not null the query will be sent to the server every inputted number of milliseconds
  if (pollInterval) {
    const interval = setInterval(() => {
      new Promise((resolve, reject) => resolve(hunt(query)));
    }, pollInterval);
  }

  // when cacheRead set to true
  if (cacheRead) {
    const resObj = cache.read(query);
    // check if query is stored in cache
    if (resObj) {
      // returning cached response as a promise
      return new Promise((resolve, reject) => resolve(resObj));
    }
    // execute graphql fetch request if cache miss
    return new Promise((resolve, reject) => resolve(hunt(query)));
    // when cacheRead set to false
  }
  if (!cacheRead) {
    return new Promise((resolve, reject) => resolve(hunt(query)));
  }

  // when cache miss or on intervals
  async function hunt(query) {
    query = insertTypenames(query);
    try {
      // send fetch request with query
      const resJSON = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const resObj = await resJSON.json();
      const deepResObj = { ...resObj };
      // update normalized result in cache if cacheWrite is set to true
      if (cacheWrite) cache.write(query, deepResObj);
      return resObj;
    } catch (e) {
      console.log(e);
    }
  }
}
