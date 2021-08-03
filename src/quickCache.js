/** @format */

import normalizeResult from "./BigNormalize.js";
import destructureQueries from "./BigDestructure.js";
import "https://deno.land/x/dotenv/load.ts";
import { connect } from "https://deno.land/x/redis/mod.ts";
import { gql } from "https://deno.land/x/oak_graphql/mod.ts";
//import {concatInlineFragments, parseFragmentToInlineFragment} from "https://deno.land/x/oak_graphql/graphql-tools/utils/fragments.ts";
import { print, visit } from "https://deno.land/x/graphql_deno/mod.ts";

let redis;
const context = window.Deno ? "server" : "client";

if (context === "server") {
  redis = await connect({
    hostname: Deno.env.get("REDIS_HOST"),
    port: 6379,
  });
}

export class Cache {
  constructor(
    initialCache = {
      ROOT_QUERY: {},
      ROOT_MUTATION: {},
    }
  ) {
    this.storage = initialCache;
    this.context = window.Deno ? "server" : "client";
  }

  // set cache configurations
  async configSet(parameter, value) {
    return await redis.configSet(parameter, value);
  }

  // Main functionality methods
  // for reading the inital query
  async read(queryStr) {
    const returnedValue = await this.cacheRead(queryStr);

    /*
        if (typeof queryStr !== "string")
          throw TypeError("input should be a string");
        // destructure the query string into an object
        const queries = destructureQueries(queryStr).queries;
        //console.log("queries from cachclassServer", queries);
    
        // breaks out of function if queryStr is a mutation
        if (!queries) return undefined;
    */
  }

  createBigHash(inputfromQuery) {
    let ast = gql(inputfromQuery);
    console.log("about to return whole Query String");
    return visit(ast, { enter: OperationDefinition(inputfromQuery) });
    //return this.operationDefinition(inputfromQuery)
  }

  operationDefinition(node) {
    console.log("entering operationDefinition");
    console.log(node.name);
    console.log(JSON.stringify(node));
    return JSON.stringify(node);
  }

  async cacheRead(hash) {
    if (this.context === "client") {
      return this.storage[hash];
    } else {
      if (hash === "ROOT_QUERY" || hash === "ROOT_MUTATION") {
        const hasRootQuery = await redis.get("ROOT_QUERY");

        if (!hasRootQuery) {
          await redis.set("ROOT_QUERY", JSON.stringify({}));
        }
        const hasRootMutation = await redis.get("ROOT_MUTATION");

        if (!hasRootMutation) {
          await redis.set("ROOT_MUTATION", JSON.stringify({}));
        }
      }
      let hashedQuery = await redis.get(hash);

      //   let newHash = hash;
      //   let hashArr = [];
      //   newHash.forEach(async (e) => {
      //     let poobah = await redis.get(e);
      //     console.log("poobah", poobah);
      //     hashArr.push(poobah);
      //     console.log("HighGrand", hashArr);
      //     hashArr;
      //   });
      //   console.log("grand", await hashArr);
      // }

      // if cacheRead is a miss
      if (hashedQuery === undefined) return undefined;
      return JSON.parse(hashedQuery);
    }
  }
  async cacheWrite(hash, value) {
    // writes value to object cache or JSON.stringified value to redis cache
    if (this.context === "client") {
      this.storage[hash] = value;
    } else {
      value = JSON.stringify(value);
      await redis.setex(hash, 6000, value);
      let hashedQuery = await redis.get(hash);
    }
  }
  async cacheDelete(hash) {
    // deletes the hash/value pair on either object cache or redis cache
    if (this.context === "client") {
      delete this.storage[hash];
    } else await redis.del(hash);
  }
  async cacheClear() {
    // erases either object cache or redis cache
    if (this.context === "client") {
      this.storage = { ROOT_QUERY: {}, ROOT_MUTATION: {} };
    } else {
      await redis.flushdb((err, successful) => {
        if (err) console.log("redis error", err);
        console.log(successful, "clear");
      });
      await redis.set("ROOT_QUERY", JSON.stringify({}));
      await redis.set("ROOT_MUTATION", JSON.stringify({}));
    }
  }

  // functionality to stop polling
  stopPollInterval(interval) {
    clearInterval(interval);
  }
}
