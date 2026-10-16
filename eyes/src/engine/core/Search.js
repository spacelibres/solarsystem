// Recovered from app.js:1656459-1656975.
/* 应用搜索扩展通用搜索链接解析，按 searchType 交给 link 管理器；reset 与 focus 钩子由配置持有，事件传播规则保持调用方原约定。 */
import * as Eyes from "../../framework/eyes/index.js";
class Search extends Eyes.Search {
  _getLink(selectedLink) {
    const {
      searchType: searchType
    } = this._config;
    return this._app.getManager("link")?.getParsedLink?.(selectedLink, searchType) || selectedLink;
  }
  reset(resetEvent) {
    const {
      onReset: onReset
    } = this._config;
    this.eraseInput();
    "function" == typeof onReset && onReset(this, resetEvent);
    this._config.initialOpen || this.close();
    "function" == typeof resetEvent?.stopPropagation && resetEvent.stopPropagation();
  }
  onInputFocus() {
    const {
      onSearchFocus: onSearchFocus
    } = this._config;
    "function" == typeof onSearchFocus && onSearchFocus(this);
    super.onInputFocus();
  }
}
export { Search };
