// Recovered from app.js:1302987-1303646.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
class TitleManager extends EyesPublicApi.BaseManager {
  constructor(t, options) {
    super(t);
    this._options = options;
    this._currentTitle = null;
    this._fullTitle = null;
    this._parseFn = this._options.parseFn ?? null;
  }
  updateTitle(t) {
    const {
      prefix: prefix,
      suffix: suffix
    } = this._options || {};
    this._currentTitle = this._parseRoute(t);
    this._fullTitle = `${prefix} - ${this._currentTitle} - ${suffix}`;
    document.title = this._fullTitle;
  }
  _parseRoute(t) {
    return this._parseFn ? this._parseFn(t) : "Home";
  }
  setParseFunction(parseFn) {
    "function" == typeof parseFn && (this._parseFn = parseFn);
  }
  get currentTitle() {
    return this._currentTitle;
  }
  get fullTitle() {
    return this._fullTitle;
  }
}
export { TitleManager };
