export default function(queryName, query, obsidianSchema) {
  // Make an object
  const queryObj = {
    queryName
  };

  // Some variables
  const brackets = [];
  let i = query.indexOf(queryName) + queryName.length;
  let parameterName = '';
  let parameterValue = '';
  let onName = false;
  let onValue = false;

  while (brackets.length === 0) {
    if (query[i] === ' ') {
      // Skipping everything else for whitespace
    } else if (query[i] === '{') {
      brackets.push('{');
    } else if (query[i] === '(') {
      onName = true;
    } else if (query[i] === ')' || query[i] === ',') {
      queryObj.parameters[parameterName] = parameterValue;
      onValue = false;
      onName = true;
    } else if (query[i] === ':' && onName) {
      onName = false;
      onValue = true;
    } else {
      if (onName) {
        parameterName += query[i];
      } else if (onValue) {
        parameterValue += query[i];
      }
    }
    i++;
  }


  while () {

  }

  return queryObj;
}
