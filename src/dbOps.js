import redis from './cache.js';


export default async function checkAndInsert(hash, value, expiration = 20) {
  let ifCached;
  if (Array.isArray(value)) {
    ifCached = await redis.lrange(hash, 0, -1);
    console.log('ifCached', hash, ':', ifCached);
    if (ifCached.length === 0) {
      await redis.rpush(hash, ...value);
      redis.expire(hash, expiration);
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
