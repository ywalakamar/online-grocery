/** Get unique keys from an Array of keys*/
const getUniqueKeys = (keys) => [...new Set(keys)];

/** Convert JSON object to Array Object */
const json2Array = (json) => {
  var array = [];
  var keys = Object.keys(json);
  keys.forEach((key) => {
    array.push(key);
  });
  return array;
};

/** Check if array is empty */
const isEmpty = (obj) => {
  return !obj.length ? true : false;
};

/** check if array is null */
const isNull = (obj) => {
  return obj == null ? true : false;
};

export { getUniqueKeys, json2Array, isNull, isEmpty };
