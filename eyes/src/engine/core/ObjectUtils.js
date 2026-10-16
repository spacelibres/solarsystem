/** @eyes-analysis
 * 文件职责：以统一接口枚举/处理对象键值。
 * 依据：ObjectUtils @2
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:34109-34338.
/** @eyes-analysis
 * 类职责：以统一接口枚举/处理对象键值。
 * 继承：无显式父类；导出：ObjectUtils。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ObjectUtils {
  /** @eyes-analysis
   * 【结构证据】返回 `Object.entries(t)`；调用 `Object.entries`。
   * 调用线索：Object.entries。
   */
  static entries(t) {
    return Object.entries(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `Object.keys(t)`；调用 `Object.keys`。
   * 调用线索：Object.keys。
   */
  static keys(t) {
    return Object.keys(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `Object.values(t)`；调用 `Object.values`。
   * 调用线索：Object.values。
   */
  static values(t) {
    return Object.values(t);
  }
}
export { ObjectUtils };
