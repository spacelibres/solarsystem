// Recovered from app.js:1656459-1656975.
import * as Eyes from "../../framework/eyes/index.js";
class Search extends Eyes.Search {
  _getLink(t) {
    const {
      searchType: searchType
    } = this._config;
    return this._app.getManager("link")?.getParsedLink?.(t, searchType) || t;
  }
  reset(t) {
    const {
      onReset: onReset
    } = this._config;
    this.eraseInput();
    "function" == typeof onReset && onReset(this, t);
    this._config.initialOpen || this.close();
    "function" == typeof t?.stopPropagation && t.stopPropagation();
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
