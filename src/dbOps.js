import redis from './cache.js';


async function checkAndInsert(hash, value, expiration = 20) {
  let ifCached;
  if (typeof value === 'object') {
    ifCached = await redis.lrange(hash, 0, -1);
    console.log('ifCached obj', ifCached);
    if (ifCached.length === 0) {
      await redis.rpush(hash, ...value);
      redis.expire(hash, expiration);
    }
  } else {
    ifCached = await redis.get(hash);
    console.log('ifCached', ifCached)
    if (!ifCached) {
      console.log(await redis.setex(hash, expiration, value));
    }
  }
}

async function checkAndRetrieveQuery(hash) {
  const ifCached = await redis.lrange(hash, 0, -1);
  return ifCached;
}

export {
  checkAndInsert,
  checkAndRetrieveQuery
}