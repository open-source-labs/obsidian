import { connect } from "https://denopkg.com/keroxp/deno-redis/mod.ts";

const redis = await connect({ hostname: "127.0.0.1", port: 6379 });



const BAO = {};

export const checkCache = async query => {
  console.log('QUERYYY', query)
  const response = await redis.get(query);
  console.log('RESPONSE', response);

  return (response) ? JSON.parse(response) : false;
  // if (BAO[query]) {
  //   return JSON.parse(BAO[query]);
  // } else {
  //   return false;
  // }
}

export const storeCache = (query, result) => {


  console.log('-----PRE-----')
  redis.set(query, JSON.stringify(result))
  // BAO[query] = JSON.stringify(result);
  console.log('-----POST-----')

}