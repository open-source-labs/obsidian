/** @format */

import { gql } from "https://deno.land/x/oak_graphql/mod.ts";

import { print, visit } from "https://deno.land/x/graphql_deno/mod.ts";
import testsObj from "../queries.js";

//(there should only be 1 operation definition)
//we have to go into selectionsSet.selections inside the operation definition and take:
// every element from that
// save the alias for returning and do not much more with alas
// concatinate the name, directives and arguments to hash

//check hash on redis for if we have the value there
// there are feilds in the redis that line up with fields in the query

//redis notes
//KEYS *Movie* - looks though keys and finds if Movie shows up in key name

// if we cache the arguments as a key we can store a ref to the moves that come back in that argument key

function printNode(body) {
  let ast = gql(body.query);
  const checkNodeVisitor = {
    Field: (node) => {
      if (node.selectionSet) {
        //console.log("node", node, "node.name", node.name.value);
        //let argys = node.arguments[0];
        let i = 0;
        if (node.arguments[0]) {
          // console.log(`starting log ------------------------  \n`, {
          //   node: node,
          //   "node.name": node.name.value,
          //   "node.arguments": node.arguments[0].value.fields,
          //   "node.arguments.type": node.arguments[0].value.fields[0].name.value,
          //   "node.arguments.input":
          //     node.arguments[0].value.fields[0].value.value,
          // });
        }
      }
    },
  };

  visit(ast, { leave: checkNodeVisitor });
  return { original: body };
}

let test1 = {
  query: `
query {
    movies {
          id
          __typename
          title
          releaseYear
          genre
            actors {
              id
              __typename
              firstName
              lastName
                 }
        }
  }
`,
};
//printNode(test1);
printNode(testsObj.query2);
