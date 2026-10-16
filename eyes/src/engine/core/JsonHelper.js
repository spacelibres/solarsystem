// JSON 判定保持 JavaScript typeof 语义：number 不排除 NaN；对象排除 null 与数组，optional 属性只把 undefined 当缺省，集合检查逐项短路。
// Recovered from app.js:31718-33160.
class JsonHelper {
  static isNumber(value) {
    return "number" == typeof value;
  }
  static isString(value) {
    return "string" == typeof value;
  }
  static isBoolean(value) {
    return "boolean" == typeof value;
  }
  static isObject(value) {
    return "object" == typeof value && !JsonHelper.isArray(value) && null !== value;
  }
  static isArray(value) {
    return Array.isArray(value);
  }
  static isObjectOfStrings(object) {
    if (!JsonHelper.isObject(object)) return false;
    for (const propertyValue of Object.values(object)) if (!JsonHelper.isString(propertyValue)) return false;
    return true;
  }
  static isObjectOfNumbers(object) {
    if (!JsonHelper.isObject(object)) return false;
    for (const propertyValue of Object.values(object)) if (!JsonHelper.isNumber(propertyValue)) return false;
    return true;
  }
  static isObjectOfV(object, predicate) {
    if (!JsonHelper.isObject(object)) return false;
    for (const propertyValue of Object.values(object)) if (!predicate(propertyValue)) return false;
    return true;
  }
  static isArrayOfStrings(array) {
    if (!JsonHelper.isArray(array)) return false;
    for (let index = 0, length = array.length; index < length; index++) if (!JsonHelper.isString(array[index])) return false;
    return true;
  }
  static isArrayOfNumbers(array) {
    if (!JsonHelper.isArray(array)) return false;
    for (let index = 0, length = array.length; index < length; index++) if (!JsonHelper.isNumber(array[index])) return false;
    return true;
  }
  static isArrayOfBooleans(array) {
    if (!JsonHelper.isArray(array)) return false;
    for (let index = 0, length = array.length; index < length; index++) if (!JsonHelper.isBoolean(array[index])) return false;
    return true;
  }
  static isArrayOfV(array, predicate) {
    if (!JsonHelper.isArray(array)) return false;
    for (let index = 0, length = array.length; index < length; index++) if (!predicate(array[index])) return false;
    return true;
  }
  static hasPropOfType(object, key, predicate) {
    const propertyValue = object[key];
    return void 0 !== propertyValue && predicate(propertyValue);
  }
  static hasOptionalPropOfType(object, key, predicate) {
    const propertyValue = object[key];
    return void 0 === propertyValue || predicate(propertyValue);
  }
}
export { JsonHelper };
