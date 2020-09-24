
// Minifies query string based on start index //
// Returns an object with the minified query and the end index in the larger query string //
// Ending index used to find next start index //
export default function specificQueryParser(startIdx, query) {
  // Declare some variables
  const parens = [];
  let output = '';
  let i = startIdx;

  // Construct beginning of output to find first curly brace //
  while (parens.length === 0) {
    // Eat whitespace
    if (query[i] === ' ') {
    // Came to the start of the requested fields, break out of loop //
    } else if (query[i] === '{') {
      parens.push('{');
      output += '{';
    // Eat newline character //
    } else if (query[i] === '\\') {
      if (query[i+1] === 'n') {
        i++;
      } else {
        output += query[i];
      }
    // Adds to minified query //
    } else {
      output += query[i];
    }
    i++;
  }

  // Loop through the query string until we hit the end of the query //
  while (parens.length > 0) {
    // Eat whitespace
    if (query[i] === ' ') {
    // Keep our open parens balanced by tracking them in array //
    } else if (query[i] === '{') {
      parens.push('{');
      output += '{';
    // Remove the last open parens from our array //
    } else if (query[i] === '}') {
      parens.pop();
      output += '}';
    // Eat newline character //
    } else if (query[i] === '\\') {
      if (query[i+1] === 'n') {
        i++;
      } else {
        output += query[i];
      }
    // Adds to minified query //
    } else {
      output += query[i];
    }
    i++;
  }

  return { output, endIdx: i };
}
