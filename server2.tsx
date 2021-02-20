export function destructureQueriesWithFragments(queryOperationStr) {
  // make a copy of the original input
  let copyQueryOperationStr = queryOperationStr;

  // assume we have fragments
  let haveFrag = true;
  const fragments = [];
  // find instances of the word "fragment"
  // if we have fragments
  if (queryOperationStr.indexOf('fragment') !== -1) {
    let startOfFragIndex = queryOperationStr.indexOf('fragment');
    let startOfFragCurly = queryOperationStr.indexOf('{', startOfFragIndex);
    let endOfFragCurly;
    const stack = ['{'];
    const curlsAndParens = {
      '}': '{',
      ')': '('
    }
    for (let i = startOfFragCurly + 1; i < queryOperationStr.length; i++) {
      let char = queryOperationStr[i];
      if (char === '{' || char === '(') {
        stack.push(char);
      }
      if (char === '}' || char === ')') {
        let topOfStack = stack[stack.length - 1];
        if (topOfStack === curlsAndParens[char]) stack.pop();
      }
      if (!stack[0]) {
        endOfFragCurly = i;
        break;
      }
    }
    let fragment = copyQueryOperationStr.slice(startOfFragIndex, endOfFragCurly + 1);
    let newStr = copyQueryOperationStr.slice(endOfFragCurly + 1);
    fragments.push(fragment);
    
  }
}