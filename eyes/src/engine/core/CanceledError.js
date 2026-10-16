/** @eyes-analysis
 * 文件职责：用于区分主动取消与真实加载失败的错误类型。
 * 依据：CanceledError extends Error @2
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:25898-26058.
/** @eyes-analysis
 * 类职责：用于区分主动取消与真实加载失败的错误类型。
 * 继承：Error；导出：CanceledError。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class CanceledError extends Error {
  /** @eyes-analysis
   * 【结构证据】调用 `super`。
   * 调用线索：super。
   */
  constructor() {
    super("Canceled");
  }
}
export { CanceledError };
