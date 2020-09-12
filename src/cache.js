import { connect } from "https://denopkg.com/keroxp/deno-redis/mod.ts";

const connectToRedis = async (browser) => {
  if (!browser) {
    return await connect({ hostname: "127.0.0.1", port: 6379 });
  }
}

export default async function(browser) {
  return await connectToRedis(browser);
}

/*

const checkCache = async query => {

  console.log('QUERYYY', query)
  const response = await redis.get(query);

  return (response) ? JSON.parse(response) : false;

}

const storeCache = (query, result) => {

  console.log('-----PRE-STORAGE-----')
  //set expiration
  redis.setex(query, 15, JSON.stringify(result))
  console.log('-----POST-STORAGE-----')

}

*/
