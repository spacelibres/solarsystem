/** @eyes-analysis
 * 文件职责：生成随机字符串标识。
 * 依据：RandomString @2
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:35653-35929.
/** @eyes-analysis
 * 类职责：生成随机字符串标识。
 * 继承：无显式父类；导出：RandomString。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class RandomString {
  /** @eyes-analysis
   * 【结构证据】返回 `Array.from(uint8Array,t=>`0${(255&t).toString(16)}`.slice(-2)).join("").slice(0,t)`；调用 `(255&t).toString`、`Array.from`、`Math.ceil`、``0${(255&t).toString(16)}`.slice`、`crypto.getRandomValues`、`new Uint8Array`。
   * 调用线索：(255&t).toString、Array.from、Array.from(uint8Array,t=>`0${(255&t).toString(16)}`.slice(-2)).join、Array.from(uint8Array,t=>`0${(255&t).toString(16)}`.slice(-2)).join("").slice、Math.ceil等。
   */
  static generate(t) {
    const uint8Array = new Uint8Array(Math.ceil(t / 2));
    crypto.getRandomValues(uint8Array);
    return Array.from(uint8Array, t => `0${(255 & t).toString(16)}`.slice(-2)).join("").slice(0, t);
  }
}
export { RandomString };
