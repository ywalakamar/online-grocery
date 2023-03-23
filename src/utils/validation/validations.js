import { getUniqueKeys, json2Array } from "./functions";
import mongoose from "mongoose";

/**
 * Check for blank values
 * @param {Object} obj
 * @returns {Array}
 */
const checkBlankValues = (obj) => {
  var arr = [];
  Object.keys(obj).forEach((key) => {
    for (key in obj) {
      if (obj[key] === null || obj[key] === "") {
        arr.push(key);
      }
    }
  });
  return getUniqueKeys(arr);
};

/** Check invalid keys
 * @param {Object} obj
 * @param {Array} keys
 * @returns {Array}
 */
const checkKeys = (obj, keys) => {
  const errors = [];
  Object.keys(obj).forEach((key) => {
    keys.forEach(() => {
      if (!keys.includes(key)) {
        errors.push(key);
      }
    });
  });
  return getUniqueKeys(errors);
};

/**
 *Check key values
 * @param {Object} obj
 * @param {Array} keys
 * @returns {Array}
 */
const checkProperties = (obj, keys) => {
  /** Convert json objects to arrays */
  var array = json2Array(obj);

  /** Check for difference  */
  Array.prototype.diff = function (b) {
    return this.filter((x) => !b.includes(x));
  };

  return keys.diff(array);
};

const isValidId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export { checkBlankValues, checkKeys, checkProperties, isValidId };
