import { connect } from "https://denopkg.com/keroxp/deno-redis/mod.ts";

const redis = await connect({ hostname: "127.0.0.1", port: 6379 });





export const checkCache = async query => {
  const response = await redis.get(query);

  return (response) ? JSON.parse(response) : false;

}

export const storeCache = (query, result) => {


  console.log('-----PRE-STORAGE-----')
  redis.setex(query, 15, JSON.stringify(result))
  console.log('-----POST-STORAGE-----')

}