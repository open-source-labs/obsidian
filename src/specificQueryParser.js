export default function specificQueryParser(startIdx, query) {
  // Declare some variables
  const parens = [];
  let output = '';
  let i = startIdx;

  // Construct beginning of output
  while (parens.length === 0) {
    // Eat whitespace
    if (query[i] === ' ') {
      i++;
    // Came to the start of the requested fields, break out of loop
    } else if (query[i] === '{') {
      parens.push('{');
      output += '{';
      i++;
    // Eat newline character
    } else if (query[i] === '\\') {
      if (query[i+1] === 'n') {
        i += 2;
      } else {
        output += query[i];
        i++;
      }
    } else {
      output += query[i];
      i++;
    }
  }

  // Loop through the query string until we hit the end of the query
  while (parens.length > 0) {
    // Eat whitespace
    if (query[i] === ' ') {
      i++;
    // Keep our open parens balanced by tracking them in array
    } else if (query[i] === '{') {
      parens.push('{');
      output += '{';
      i++;
    // Remove the last open parens from our array
    } else if (query[i] === '}') {
      parens.pop();
      output += '}';
      i++;
    // Eat newline character
    } else if (query[i] === '\\') {
      if (query[i+1] === 'n') {
        i += 2;
      } else {
        output += query[i];
        i++;
      }
    } else {
      output += query[i];
      i++;
    }
  }

  return { output, endIdx: i };
}
