/** @format */

// this function will insert __typename meta fields into a querystring
export function insertTypenames(queryOperationStr) {
  let newQueryStr = "";
  // removes extra whitespace
  const queryStr = queryOperationStr.replace(/\s\s+/g, " ").trim();
  // finds end of operation name by finding the beginning of the query strings
  const startIndex = queryStr.indexOf("{");
  // adds the operation name to newQueryStr
  const operationName = queryStr.substring(0, startIndex + 1);
  newQueryStr += operationName;
  // iterate through query until you find beginning of field object
  let bracePairs = 0;
  let parensPairs = 0;
  for (let i = startIndex + 1; i < queryStr.length; i += 1) {
    const char = queryStr[i];
    // functionality when the beginning of fields Obj is found
    if (char === "{" && !bracePairs && !parensPairs) {
      const endOfFieldsStr = findClosingBrace(queryStr, i);
      const fieldsStr = queryStr.substring(i, endOfFieldsStr + 1);
      const fieldsStrWithTypenames = addTypenamesToFieldsStr(fieldsStr);
      newQueryStr += fieldsStrWithTypenames;
      i = endOfFieldsStr;
      continue;
    }
    // bracket/parens counter
    if (char === "{") bracePairs += 1;
    if (char === "}") bracePairs -= 1;
    if (char === "(") parensPairs += 1;
    if (char === ")") parensPairs -= 1;
    // adds current character to newQueryString
    newQueryStr += char;
  }
  return newQueryStr;
}

// helper function to add typenames to fieldsStr where needed
export function addTypenamesToFieldsStr(fieldsStr) {
  let newFieldsStr = fieldsStr;
  let currentOpenBrace = 0;
  let isAnotherOpenBrace = true;
  while (isAnotherOpenBrace) {
    // find the next open brace
    let nextOpenBrace = newFieldsStr.indexOf("{", currentOpenBrace + 1);
    if (nextOpenBrace === -1) isAnotherOpenBrace = false;
    const nextTypenameIndex = newFieldsStr.indexOf(
      "__typename",
      currentOpenBrace
    );
    // check to see if __typename is between the current open brace and the next open brace
    if (
      (nextTypenameIndex > nextOpenBrace && nextOpenBrace !== -1) ||
      nextTypenameIndex === -1
    ) {
      // inserts __typename after currentOpenBrace
      newFieldsStr =
        newFieldsStr.substring(0, currentOpenBrace + 1) +
        " __typename " +
        newFieldsStr.substring(currentOpenBrace + 1);
      // updates nextOpenBrace after insertion
      nextOpenBrace = newFieldsStr.indexOf("{", currentOpenBrace + 1);
    }
    currentOpenBrace = nextOpenBrace;
  }
  return newFieldsStr;
}

// helper function to find the partner closing brace
export function findClosingBrace(str, index) {
  let bracePairs = 0;
  // skips ahead 1 index to skip first brace
  for (let i = index + 1; i < str.length; i += 1) {
    const char = str[i];
    if (char === "}" && !bracePairs) return i;
    if (char === "{") bracePairs += 1;
    if (char === "}") bracePairs -= 1;
  }
}
