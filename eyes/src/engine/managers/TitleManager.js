// Recovered from app.js:1302987-1303646.
/* 标题解析函数由配置提供，updateTitle 保存当前标题和完整标题并写入 document.title；分享组件可读取同一完整标题。 */
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
class TitleManager extends EyesPublicApi.BaseManager {
  constructor(app, options) {
    super(app);
    this._options = options;
    this._currentTitle = null;
    this._fullTitle = null;
    this._parseFn = this._options.parseFn ?? null;
  }
  updateTitle(routeInfo) {
    const {
      prefix: prefix,
      suffix: suffix
    } = this._options || {};
    this._currentTitle = this._parseRoute(routeInfo);
    this._fullTitle = `${prefix} - ${this._currentTitle} - ${suffix}`;
    document.title = this._fullTitle;
  }
  _parseRoute(routeInfo) {
    return this._parseFn ? this._parseFn(routeInfo) : "Home";
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
