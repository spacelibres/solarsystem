/** @eyes-analysis
 * 文件职责：延迟引用基类：get 时刷新，过滤禁用对象，并只在引用身份变化时回调。
 * 依据：BaseRef @2
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:25441-25897.
/** @eyes-analysis
 * 类职责：延迟引用基类：get 时刷新，过滤禁用对象，并只在引用身份变化时回调。
 * 继承：无显式父类；导出：BaseRef。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class BaseRef {
  /** @eyes-analysis
   * 【结构证据】写入 `_ref`、`_refChangedCallback`。
   * 状态写入：_ref、_refChangedCallback。
   */
  constructor() {
    this._ref = null;
    this._refChangedCallback = null;
  }
  /** @eyes-analysis
   * 先调用虚方法 update 再返回缓存；getRef 只返回缓存，不主动解析。
   * 调用线索：this.update。
   */
  get() {
    this.update();
    return this._ref;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_refChangedCallback`。
   * 状态写入：_refChangedCallback。
   */
  setRefChangedCallback(refChangedCallback) {
    this._refChangedCallback = refChangedCallback;
  }
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  update() {}
  /** @eyes-analysis
   * 【结构证据】返回 `this._ref`。
   */
  getRef() {
    return this._ref;
  }
  /** @eyes-analysis
   * 先将禁用目标折叠为 null，仅身份改变才保存新值并以 (oldRef,newRef) 调用回调；避免每帧重复触发资源绑定。
   * 状态写入：_ref。
   * 调用线索：t.isEnabled、this._refChangedCallback。
   */
  _setRef(t) {
    if (t && !t.isEnabled() && (t = null), this._ref !== t) {
      const ref = this._ref;
      this._ref = t;
      this._refChangedCallback && this._refChangedCallback(ref, this._ref);
    }
  }
  _ref;
  _refChangedCallback;
}
export { BaseRef };
