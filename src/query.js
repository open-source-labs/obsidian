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
      // pass in query() with options instead
      new Promise((resolve, reject) =>
        resolve(
          query(query, { pollInterval: null, cacheRead: false, ...options })
        )
      );
    }, pollInterval);
    return interval;
  }

  // when cacheRead set to true
  if (cacheRead) {
    let resObj;
    // when the developer decides to only utilize whole query for cache
    if (wholeQuery) resObj = cache.readWholeQuery(query);
    else resObj = cache.read(query);
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
    if (!wholeQuery) query = insertTypenames(query);
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
      // update result in cache if cacheWrite is set to true
      if (cacheWrite) {
        if (wholeQuery) cache.writeWholeQuery(query, deepResObj);
        else cache.write(query, deepResObj);
      }
      return resObj;
    } catch (e) {
      console.log(e);
    }
  }
}
