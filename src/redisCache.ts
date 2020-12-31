import { connect } from "https://denopkg.com/keroxp/deno-redis/mod.ts";

// Connects to redis database that is already running on developer chosen port //
// const connectToRedis = async (browser) => {
//   if (!browser) {
//     const obsidian = await import('./obsidian.ts')
//     let port = obsidian.redisPortExport;
//     return await connect({ hostname: "127.0.0.1", port });
//   }
// }
// export default async function(browser) {
//   return await connectToRedis(browser);
// }
const redis = await connect({
  hostname: "127.0.0.1",
  port: 6379

});

export default redis;



