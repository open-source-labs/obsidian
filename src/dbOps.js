import redis from './cache.js';


async function checkAndInsert(hash, value, expiration = 20) {
  let ifCached;
  if (Array.isArray(value)) {
    ifCached = await redis.lrange(hash, 0, -1);
    console.log('ifCached', hash, ':', ifCached);
    if (ifCached.length === 0) {
      await redis.rpush(hash, ...value);
      redis.expire(hash, expiration);
    }
  } else if (typeof value === 'object') {
    value = JSON.stringify(value);
    ifCached = await redis.get(hash);
    console.log('ifCached', hash, ':', ifCached)
    if (!ifCached) {
      redis.setex(hash, expiration, value);
    }
  } else {
    ifCached = await redis.get(hash);
    console.log('ifCached', hash, ':', ifCached)
    if (!ifCached) {
      if (!value) value = JSON.stringify(value);
      redis.setex(hash, expiration, value);
    }
  }
}

async function checkAndRetrieveQuery(hash) {
  let ifCached = await redis.get(hash);
  if (ifCached) ifCached = JSON.parse(ifCached);
  return ifCached;
}

async function retrieveScalar(hash) {
  const type = await redis.type(hash);
  if (type === 'list') {
    return await redis.lrange(hash, 0, -1);
  }
  return await redis.get(hash);
}

async function retrieveComplex(hash) {
  return JSON.parse(await redis.get(hash))
}

export {
  checkAndInsert,
  checkAndRetrieveQuery,
  retrieveScalar,
  retrieveComplex
}
