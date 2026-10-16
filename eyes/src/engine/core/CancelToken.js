/** @eyes-analysis
 * 文件职责：维护可取消操作的取消标记/回调令牌。
 * 依据：CancelToken @2
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:539212-539424.
/** @eyes-analysis
 * 类职责：维护可取消操作的取消标记/回调令牌。
 * 继承：无显式父类；导出：CancelToken。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class CancelToken {
  /** @eyes-analysis
   * 【结构证据】写入 `_isCanceled`。
   * 状态写入：_isCanceled。
   */
  constructor() {
    this._isCanceled = false;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_isCanceled`。
   * 状态写入：_isCanceled。
   */
  cancel() {
    this._isCanceled = true;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._isCanceled`。
   */
  get isCanceled() {
    return this._isCanceled;
  }
}
export { CancelToken };
