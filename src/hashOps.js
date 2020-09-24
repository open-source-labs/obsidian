
// Slices schema name off of hash //
const findTypeSchemaName = hash => {
  let i = 0;
  while (hash[i] !== '~') {
    i++;
  }
  return hash.slice(0, i);
}

// Slices property name off of hash //
const findProp = hash => {
  let i = hash.length - 1;

  while (hash[i] !== '~') {
    i--;
  }
  return hash.slice(i + 1);
}

export {
  findTypeSchemaName,
  findProp
}
