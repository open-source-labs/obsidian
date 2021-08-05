/** @format */

//this where some normilizaiton of the result comes in so we can be normal
import { gql } from "https://deno.land/x/oak_graphql/mod.ts";
import { print, visit } from "https://deno.land/x/graphql_deno/mod.ts";
import { redisdb } from "./quickCache.js";

export default function normalizeResult(string) {}
