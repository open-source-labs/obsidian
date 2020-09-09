import { connect } from "https://denopkg.com/keroxp/deno-redis/mod.ts";

const redis = await connect({ hostname: "127.0.0.1", port: 6379 });





export const checkCache = async query => {
  const response = await redis.get(query);

  return (response) ? JSON.parse(response) : false;

}

export const storeCache = (query, result) => {


<<<<<<< HEAD
  console.log('-----PRE-STORAGE-----')
  redis.setex(query, 15, JSON.stringify(result))
  console.log('-----POST-STORAGE-----')
=======

  console.log('-----PRE-STORAGE-----')
  //set expiration 
  redis.setex(query, 15, JSON.stringify(result))
  // BAO[query] = JSON.stringify(result);
  console.log('-----POST-STORAGE-----')

>>>>>>> e52cc7bd81b872811e4661f53540c7f0623f44b2

}