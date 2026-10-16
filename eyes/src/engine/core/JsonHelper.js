// Recovered from app.js:31718-33160.
class JsonHelper {
  static isNumber(t) {
    return "number" == typeof t;
  }
  static isString(t) {
    return "string" == typeof t;
  }
  static isBoolean(t) {
    return "boolean" == typeof t;
  }
  static isObject(t) {
    return "object" == typeof t && !JsonHelper.isArray(t) && null !== t;
  }
  static isArray(t) {
    return Array.isArray(t);
  }
  static isObjectOfStrings(t) {
    if (!JsonHelper.isObject(t)) return false;
    for (const e of Object.values(t)) if (!JsonHelper.isString(e)) return false;
    return true;
  }
  static isObjectOfNumbers(t) {
    if (!JsonHelper.isObject(t)) return false;
    for (const e of Object.values(t)) if (!JsonHelper.isNumber(e)) return false;
    return true;
  }
  static isObjectOfV(t, e) {
    if (!JsonHelper.isObject(t)) return false;
    for (const i of Object.values(t)) if (!e(i)) return false;
    return true;
  }
  static isArrayOfStrings(t) {
    if (!JsonHelper.isArray(t)) return false;
    for (let e = 0, i = t.length; e < i; e++) if (!JsonHelper.isString(t[e])) return false;
    return true;
  }
  static isArrayOfNumbers(t) {
    if (!JsonHelper.isArray(t)) return false;
    for (let e = 0, i = t.length; e < i; e++) if (!JsonHelper.isNumber(t[e])) return false;
    return true;
  }
  static isArrayOfBooleans(t) {
    if (!JsonHelper.isArray(t)) return false;
    for (let e = 0, i = t.length; e < i; e++) if (!JsonHelper.isBoolean(t[e])) return false;
    return true;
  }
  static isArrayOfV(t, e) {
    if (!JsonHelper.isArray(t)) return false;
    for (let i = 0, s = t.length; i < s; i++) if (!e(t[i])) return false;
    return true;
  }
  static hasPropOfType(t, e, i) {
    const s = t[e];
    return void 0 !== s && i(s);
  }
  static hasOptionalPropOfType(t, e, i) {
    const s = t[e];
    return void 0 === s || i(s);
  }
}
export { JsonHelper };
