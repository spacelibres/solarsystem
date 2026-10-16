/** @eyes-analysis
 * 文件职责：将路由交给标题解析函数并更新页面标题。
 * 依据：import ../../framework/eyes/public-api.js；TitleManager extends EyesPublicApi.BaseManager @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1302987-1303646.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
/** @eyes-analysis
 * 类职责：将路由交给标题解析函数并更新页面标题。
 * 继承：EyesPublicApi.BaseManager；导出：TitleManager。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class TitleManager extends EyesPublicApi.BaseManager {
  /** @eyes-analysis
   * 【结构证据】写入 `_currentTitle`、`_fullTitle`、`_options`、`_parseFn`；调用 `super`。
   * 状态写入：_currentTitle、_fullTitle、_options、_parseFn。
   * 调用线索：super。
   */
  constructor(t, options) {
    super(t);
    this._options = options;
    this._currentTitle = null;
    this._fullTitle = null;
    this._parseFn = this._options.parseFn ?? null;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_currentTitle`、`_fullTitle`；调用 `this._parseRoute`。
   * 状态写入：_currentTitle、_fullTitle。
   * 调用线索：this._parseRoute。
   */
  updateTitle(t) {
    const {
      prefix: prefix,
      suffix: suffix
    } = this._options || {};
    this._currentTitle = this._parseRoute(t);
    this._fullTitle = `${prefix} - ${this._currentTitle} - ${suffix}`;
    document.title = this._fullTitle;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._parseFn?this._parseFn(t):"Home"`；调用 `this._parseFn`。
   * 调用线索：this._parseFn。
   */
  _parseRoute(t) {
    return this._parseFn ? this._parseFn(t) : "Home";
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_parseFn`。
   * 状态写入：_parseFn。
   */
  setParseFunction(parseFn) {
    "function" == typeof parseFn && (this._parseFn = parseFn);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._currentTitle`。
   */
  get currentTitle() {
    return this._currentTitle;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._fullTitle`。
   */
  get fullTitle() {
    return this._fullTitle;
  }
}
export { TitleManager };
