/** @eyes-analysis
 * 文件职责：轻量二元组数据结构。
 * 依据：Tuple @2
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:43268-43613.
/** @eyes-analysis
 * 类职责：轻量二元组数据结构。
 * 继承：无显式父类；导出：Tuple。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Tuple {
  /** @eyes-analysis
   * 【结构证据】返回 `[t(0),t(1)]`；调用 `t`。
   * 调用线索：t。
   */
  static create2Tuple(t) {
    return [t(0), t(1)];
  }
  /** @eyes-analysis
   * 【结构证据】返回 `[t(0),t(1),t(2)]`；调用 `t`。
   * 调用线索：t。
   */
  static create3Tuple(t) {
    return [t(0), t(1), t(2)];
  }
  /** @eyes-analysis
   * 【结构证据】返回 `[t(0),t(1),t(2),t(3)]`；调用 `t`。
   * 调用线索：t。
   */
  static create4Tuple(t) {
    return [t(0), t(1), t(2), t(3)];
  }
  /** @eyes-analysis
   * 【结构证据】返回 `[t(0),t(1),t(2),t(3),t(4)]`；调用 `t`。
   * 调用线索：t。
   */
  static create5Tuple(t) {
    return [t(0), t(1), t(2), t(3), t(4)];
  }
  /** @eyes-analysis
   * 【结构证据】返回 `[t(0),t(1),t(2),t(3),t(4),t(5)]`；调用 `t`。
   * 调用线索：t。
   */
  static create6Tuple(t) {
    return [t(0), t(1), t(2), t(3), t(4), t(5)];
  }
}
export { Tuple };
