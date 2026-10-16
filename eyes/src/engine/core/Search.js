/** @eyes-analysis
 * 文件职责：面向应用搜索界面的数据/查询协调。
 * 依据：import ../../framework/eyes/index.js；Search extends Eyes.Search @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1656459-1656975.
import * as Eyes from "../../framework/eyes/index.js";
/** @eyes-analysis
 * 类职责：面向应用搜索界面的数据/查询协调。
 * 继承：Eyes.Search；导出：Search。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Search extends Eyes.Search {
  /** @eyes-analysis
   * 【结构证据】返回 `this._app.getManager("link")?.getParsedLink?.(t,searchType)||t`；调用 `this._app.getManager`。
   * 调用线索：this._app.getManager、this._app.getManager("link")?.getParsedLink。
   */
  _getLink(t) {
    const {
      searchType: searchType
    } = this._config;
    return this._app.getManager("link")?.getParsedLink?.(t, searchType) || t;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `onReset`、`t.stopPropagation`、`this.close`、`this.eraseInput`。
   * 调用线索：onReset、t.stopPropagation、this.close、this.eraseInput。
   */
  reset(t) {
    const {
      onReset: onReset
    } = this._config;
    this.eraseInput();
    "function" == typeof onReset && onReset(this, t);
    this._config.initialOpen || this.close();
    "function" == typeof t?.stopPropagation && t.stopPropagation();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `onSearchFocus`、`super.onInputFocus`。
   * 调用线索：onSearchFocus、super.onInputFocus。
   */
  onInputFocus() {
    const {
      onSearchFocus: onSearchFocus
    } = this._config;
    "function" == typeof onSearchFocus && onSearchFocus(this);
    super.onInputFocus();
  }
}
export { Search };
