/* ----------------------------------------------------------------*/

/** containsHashableObject -
 * Returns a boolean indicating that the passed in value contains a hashable object. It must:
 * 1) Be an object
 * 2) Has all hashable keys
 *
 * @param {any} objectInQuestion Object being tested contains hashable object
 * @param {Array<string>} hashableKeys Array of hashable keys
 * @return {boolean} Boolean indicating if objectInQuestion is hashable or not
 */

export const containsHashableObject = (
  objectInQuestion: any,
  hashableKeys: Array<string>
): boolean => {
  if (
    typeof objectInQuestion !== 'object' ||
    Array.isArray(objectInQuestion) ||
    !objectInQuestion
  )
    return false;
  const objectInQuestionKeysSet = new Set(Object.keys(objectInQuestion));
  return hashableKeys.every((key) => objectInQuestionKeysSet.has(key));
};
/* ----------------------------------------------------------------*/

/* ----------------------------------------------------------------*/
/** isHashableObject -
 * Returns a boolean indicating that the passed in value is hashable. It must:
 * 1) Contain hashable object
 * 2) Does not have any nesting (i.e., contains no objects or array values)
 *
 * @param {any} objectInQuestion Object being tested if hashable
 * @param {Array<string>} hashableKeys Array of hashable keys
 * @return {boolean} Boolean indicating if objectInQuestion is hashable or not
 */
export const isHashableObject = (
  objectInQuestion: any,
  hashableKeys: Array<string>
): boolean => {
  if (!containsHashableObject(objectInQuestion, hashableKeys)) return false;
  for (const key in objectInQuestion) {
    if (typeof objectInQuestion[key] === 'object') return false;
  }
  return true;
};
/* ----------------------------------------------------------------*/

/* ----------------------------------------------------------------*/
export type GenericObject = { [key: string]: any };
type FlatObject = { [key: string]: string | number | boolean };
/** hashMaker -
 * Creates unique hash string for an object with hashable keys with hashable object passed in
 *
 * @param {FlatObject} hashableObject Object that is hashable
 * @param {Array<string>} hashableKeys Array of hashable keys
 * @return {string} Hash string
 */
export const hashMaker = (
  hashableObject: FlatObject,
  hashableKeys: Array<string>
): string => {
  let hash = '';
  for (let i = 0; i < hashableKeys.length; i++) {
    hash += hashableObject[hashableKeys[i]];
    if (i < hashableKeys.length - 1) hash += '~'
  }
  return hash;
};
/* ----------------------------------------------------------------*/

/* ----------------------------------------------------------------*/
/** printHashableObject -
 * Creates a hashable object from an object that contains a hashable object. Does not print hashable object
 *
 * @param {FlatObject} containsHashableObject Object that is hashable
 * @return {GenericObject} A hashable object
 */
export const printHashableObject = (
  containsHashableObject: GenericObject
): GenericObject => {
  const hashObj: GenericObject = {};
  for (const key in containsHashableObject) {
    if (
      typeof containsHashableObject[key] !== 'object' &&
      !hashObj.hasOwnProperty(key)
    )
      hashObj[key] = containsHashableObject[key];
  }
  return hashObj;
};
/* ----------------------------------------------------------------*/

/* ----------------------------------------------------------------*/

/**
 * Recursively flattens an arbitrarily nested object into an objects with hash key and hashable object pairs
 *
 * For each key in object (typeof === 'object', meaning it can be array):
 *
 * 1) If current object contains hashable object and if it hasn't printed already,
 * it prints a hashable object and makes its associated hash. If hash doesn't exist in normalizedHashableObjects,
 * it adds hash key and hashable object pair.
 *
 * 2) If the value at the current key is an object (typeof === 'object', meaning it can be array), it recursively
 * calls normalizeObject with the value passed in. This recursive calls goes inside arbitrary nesting.
 *
 * 3) Return normalizedHashableObjects. In the outer most execution context, this will return the output of the function.
 * In inner execution contexts, this will return that execution context's normalizedHashableObjects.
 *
 * @param {GenericObject} nestedObject Nested object
 * @param {Array<string>} hashableKeys Array of hashable keys
 * @return {FlatObject} Normalized object with hash keys and hashable object pairs
 */
export const normalizeObject = (
  nestedObject: GenericObject,
  hashableKeys: Array<string>,
  normalizedHashableObjects: GenericObject = {}
): GenericObject => {
  let hasAlreadyPrinted = false;
  for (const key in nestedObject) {
    if (
      containsHashableObject(nestedObject, hashableKeys) &&
      hasAlreadyPrinted === false
    ) {
      hasAlreadyPrinted = true;
      const hashableObject = printHashableObject(nestedObject);
      const hash = hashMaker(hashableObject, hashableKeys);
      if (!normalizedHashableObjects.hasOwnProperty(hash))
        normalizedHashableObjects[hash] = hashableObject;
    }
    if (typeof nestedObject[key] === 'object')
      normalizeObject(
        nestedObject[key],
        hashableKeys,
        normalizedHashableObjects
      );
  }
  return normalizedHashableObjects;
};
