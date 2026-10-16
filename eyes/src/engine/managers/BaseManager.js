/** @eyes-analysis
 * 文件职责：应用管理器基类：持有 app/pioneer，管理事件名、回调登记和函数绑定。
 * 依据：import ../pioneer/index.js；import ../../framework/eyes/public-api.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:688104-689007.
import "../pioneer/index.js";
import "../../framework/eyes/public-api.js";
/** @eyes-analysis
 * 类职责：应用管理器基类：持有 app/pioneer，管理事件名、回调登记和函数绑定。
 * 继承：无显式父类；导出：BaseManager。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class BaseManager {
  /** @eyes-analysis
   * 【结构证据】写入 `_app`、`_callbacks`、`_eventNames`、`_pioneer`。
   * 状态写入：_app、_callbacks、_eventNames、_pioneer。
   */
  constructor(app) {
    this._app = app;
    this._pioneer = app.pioneer;
    this._eventNames = [];
    this._callbacks = {};
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._pioneer`。
   */
  get pioneer() {
    return this._pioneer;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._app`。
   */
  get app() {
    return this._app;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_callbacks[this._eventNames[t]]`。
   * 状态写入：_callbacks[this._eventNames[t]]。
   */
  _initCallbacks() {
    for (let t = 0; t < this._eventNames.length; t++) this._callbacks[this._eventNames[t]] = [];
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._callbacks[t].includes`、`this._callbacks[t].push`、`this._eventNames.indexOf`。
   * 调用线索：this._callbacks[t].includes、this._callbacks[t].push、this._eventNames.indexOf。
   */
  registerCallback(t, e) {
    "function" != typeof e || this._eventNames.indexOf(t) < 0 || this._callbacks[t].includes(e) || this._callbacks[t].push(e);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `this._callbacks[t].indexOf`、`this._callbacks[t].splice`、`this._eventNames.indexOf`。
   * 调用线索：this._callbacks[t].indexOf、this._callbacks[t].splice、this._eventNames.indexOf。
   */
  removeCallback(t, e) {
    if ("function" != typeof e || this._eventNames.indexOf(t) < 0) return;
    const i = this._callbacks[t].indexOf(e);
    i > -1 && this._callbacks[t].splice(i, 1);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `0,this._callbacks[t][i]`。
   * 调用线索：0,this._callbacks[t][i]。
   */
  triggerCallbacks(t, e = []) {
    for (let i = this._callbacks[t].length - 1; i >= 0; i--) {
      (0, this._callbacks[t][i])(...e);
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `e[s].bind`。
   * 调用线索：e[s].bind。
   */
  bindFunctions(t = []) {
    const e = this;
    for (let i = 0; i < t.length; i++) {
      const s = t[i];
      e[s] = e[s].bind(this);
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.__destroy`。
   * 调用线索：this.__destroy。
   */
  destroy() {
    this.__destroy();
  }
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  __destroy() {}
}
export { BaseManager };
