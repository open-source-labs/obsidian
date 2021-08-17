/** @format */
import { gql } from "https://deno.land/x/oak_graphql/mod.ts";
import { print, visit } from "https://deno.land/x/graphql_deno/mod.ts";
import { redisdb } from "./quickCache.js";

export function invalidateCacheCheck(body) {
  let isSubscription = false;
  let ast = gql(body.query);

  const checkMutationVisitor = {
    OperationDefinition: (node) => {
      if (node.operation === "mutation") {
        redisdb.flushdb();
      }
    },
  };
  const subscriptionTunnelVisitor = {
    OperationDefinition: (node) => {
      if (node.operation === "subscription") {
        isSubscription = true;
      }
    },
  };
  visit(ast, { enter: subscriptionTunnelVisitor, leave: checkMutationVisitor });
  return isSubscription;
}
