const BAO = {};

export const checkCache = query => {
  if (BAO[query]) {
    return JSON.parse(BAO[query]);
  } else {
    return false;
  }
}

export const storeCache = (query, result) => {
  console.log('-----PRE-----')
  console.log(BAO)
  BAO[query] = JSON.stringify(result);
  console.log('-----POST-----')
  console.log(BAO)
}