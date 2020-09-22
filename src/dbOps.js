const browser = window.Deno ? false : true;

let redis;
let connectFunc;

if (!browser) {
  import('./cache.js')
  .then(mod => {
    connectFunc = mod.default;
  })
}


async function checkAndInsert(hash, value, cache, expiration = 20) {
  let ifCached;

  if (browser) {
    ifCached = cache[hash];
    if (!ifCached) {
      cache[hash] = value;
    }
    return cache;
  } else {
    if (!redis) {
      redis = await connectFunc(browser);
    }
    if (Array.isArray(value)) {
      ifCached = await redis.lrange(hash, 0, -1);
      if (ifCached.length === 0) {
        await redis.rpush(hash, ...value);
        redis.expire(hash, expiration);
      }
    } else if (typeof value === 'object') {
      value = JSON.stringify(value);
      ifCached = await redis.get(hash);
      if (!ifCached) {
        redis.setex(hash, expiration, value);
      }
    } else {
      ifCached = await redis.get(hash);
      if (!ifCached) {
        if (!value || typeof value === 'boolean') value = JSON.stringify(value);
        redis.setex(hash, expiration, value);
      }
    }

    if (!ifCached) {
      const consoleObj = {
        Storing: hash,
        value: value
      }
      console.log(consoleObj);
    } else {
      const consoleObj = {
        Retrieved: hash,
        value: value
      }
      console.log(consoleObj);
    }
  }
}

async function checkAndRetrieveQuery(hash, cache) {
  if (browser) {
    return cache[hash];
  } else {
    if (!redis) {
      redis = await connectFunc(browser);
    }
    let ifCached = await redis.get(hash);
    if (ifCached) ifCached = JSON.parse(ifCached);
    return ifCached;
  }
}

async function retrieveScalar(hash, cache) {
  if (browser) {
    return cache[hash];
  } else {
    if (!redis) {
      redis = await connectFunc(browser);
    }
    const type = await redis.type(hash);
    if (type === 'list') {
      return await redis.lrange(hash, 0, -1);
    }
    return await redis.get(hash);
  }
}

async function retrieveComplex(hash, cache) {
  if (browser) {
    return cache[hash];
  } else {
    if (!redis) {
      redis = await connectFunc(browser);
    }
    return JSON.parse(await redis.get(hash));
  }
}

async function clearRedis() {
  if (!redis) redis = await connectFunc(browser);
  redis.flushdb(function (err, succeeded) {
    if (err) console.log('redis error ', err)
    console.log(succeeded); // will be true if successfull
  });
}



export {
  checkAndInsert,
  checkAndRetrieveQuery,
  retrieveScalar,
  retrieveComplex,
  clearRedis
}
