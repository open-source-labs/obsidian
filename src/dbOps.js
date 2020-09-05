import redis from './cache.js';


export default async function checkAndInsert(hash, value, expiration = 20) {
  const ifCached = await redis.get(hash);
  console.log('ifCached', ifCached)
  if (!ifCached) {
    console.log(await redis.setex(hash, expiration, value));
  }
}