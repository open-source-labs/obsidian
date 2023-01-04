/** @format */

import { gql } from 'https://deno.land/x/oak_graphql/mod.ts';

export function mapSelectionSet(query) {
  // Gets fields from query and stores all in an array - used to selectively query cache
  let selectionKeysMap = {};
  let ast = gql(query);
  let selections = ast.definitions[0].selectionSet.selections;
  const tableName = selections[0].name.value;

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

  // filter out table name from array, leaving only fields
  const selectedFields = Object.keys(selectionKeysMap).filter(
    (key) => key !== tableName
  );
  return selectedFields;
}
