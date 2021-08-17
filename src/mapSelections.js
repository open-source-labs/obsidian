/** @format */

import { gql } from "https://deno.land/x/oak_graphql/mod.ts";

export function mapSelectionSet(query) {
  let selectionKeysMap = { data: "data" };
  let ast = gql(query);
  let selections = ast.definitions[0].selectionSet.selections;

  const recursiveMap = (recurseSelections) => {
    for (const selection of recurseSelections) {
      if (selection.name && selection.name.value) {
        selectionKeysMap[selection.name.value] = selection.name.value;
      }
      if (selection.alias && selection.alias.value) {
        selectionKeysMap[selection.alias.value] = selection.name.value;
      }

      if (selection.selectionSet && selection.selectionSet.selections) {
        recursiveMap(selection.selectionSet.selections);
      }
    }
  };
  recursiveMap(selections);
  return selectionKeysMap;
}
