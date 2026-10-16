/** @eyes-analysis
 * 文件职责：将 JSON 风格配置转换到引擎对象并提取字段。
 * 依据：JsonHelper @2
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:31718-33160.
/** @eyes-analysis
 * 类职责：将 JSON 风格配置转换到引擎对象并提取字段。
 * 继承：无显式父类；导出：JsonHelper。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class JsonHelper {
  /** @eyes-analysis
   * 【结构证据】返回 `"number"==typeof t`。
   */
  static isNumber(t) {
    return "number" == typeof t;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `"string"==typeof t`。
   */
  static isString(t) {
    return "string" == typeof t;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `"boolean"==typeof t`。
   */
  static isBoolean(t) {
    return "boolean" == typeof t;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `"object"==typeof t&&!JsonHelper.isArray(t)&&null!==t`；调用 `JsonHelper.isArray`。
   * 调用线索：JsonHelper.isArray。
   */
  static isObject(t) {
    return "object" == typeof t && !JsonHelper.isArray(t) && null !== t;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `Array.isArray(t)`；调用 `Array.isArray`。
   * 调用线索：Array.isArray。
   */
  static isArray(t) {
    return Array.isArray(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `false` 或 `true`；调用 `JsonHelper.isObject`、`JsonHelper.isString`、`Object.values`。
   * 调用线索：JsonHelper.isObject、JsonHelper.isString、Object.values。
   */
  static isObjectOfStrings(t) {
    if (!JsonHelper.isObject(t)) return false;
    for (const e of Object.values(t)) if (!JsonHelper.isString(e)) return false;
    return true;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `false` 或 `true`；调用 `JsonHelper.isNumber`、`JsonHelper.isObject`、`Object.values`。
   * 调用线索：JsonHelper.isNumber、JsonHelper.isObject、Object.values。
   */
  static isObjectOfNumbers(t) {
    if (!JsonHelper.isObject(t)) return false;
    for (const e of Object.values(t)) if (!JsonHelper.isNumber(e)) return false;
    return true;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `false` 或 `true`；调用 `JsonHelper.isObject`、`Object.values`、`e`。
   * 调用线索：JsonHelper.isObject、Object.values、e。
   */
  static isObjectOfV(t, e) {
    if (!JsonHelper.isObject(t)) return false;
    for (const i of Object.values(t)) if (!e(i)) return false;
    return true;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `false` 或 `true`；调用 `JsonHelper.isArray`、`JsonHelper.isString`。
   * 调用线索：JsonHelper.isArray、JsonHelper.isString。
   */
  static isArrayOfStrings(t) {
    if (!JsonHelper.isArray(t)) return false;
    for (let e = 0, i = t.length; e < i; e++) if (!JsonHelper.isString(t[e])) return false;
    return true;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `false` 或 `true`；调用 `JsonHelper.isArray`、`JsonHelper.isNumber`。
   * 调用线索：JsonHelper.isArray、JsonHelper.isNumber。
   */
  static isArrayOfNumbers(t) {
    if (!JsonHelper.isArray(t)) return false;
    for (let e = 0, i = t.length; e < i; e++) if (!JsonHelper.isNumber(t[e])) return false;
    return true;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `false` 或 `true`；调用 `JsonHelper.isArray`、`JsonHelper.isBoolean`。
   * 调用线索：JsonHelper.isArray、JsonHelper.isBoolean。
   */
  static isArrayOfBooleans(t) {
    if (!JsonHelper.isArray(t)) return false;
    for (let e = 0, i = t.length; e < i; e++) if (!JsonHelper.isBoolean(t[e])) return false;
    return true;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `false` 或 `true`；调用 `JsonHelper.isArray`、`e`。
   * 调用线索：JsonHelper.isArray、e。
   */
  static isArrayOfV(t, e) {
    if (!JsonHelper.isArray(t)) return false;
    for (let i = 0, s = t.length; i < s; i++) if (!e(t[i])) return false;
    return true;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void 0!==s&&i(s)`；调用 `i`。
   * 调用线索：i。
   */
  static hasPropOfType(t, e, i) {
    const s = t[e];
    return void 0 !== s && i(s);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void 0===s||i(s)`；调用 `i`。
   * 调用线索：i。
   */
  static hasOptionalPropOfType(t, e, i) {
    const s = t[e];
    return void 0 === s || i(s);
  }
}
export { JsonHelper };
