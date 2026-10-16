/** @eyes-analysis
 * 文件职责：解析路径与查询参数，推送导航并向应用广播路由变化。
 * 依据：import ../../vendor/modules/Unidentified719.cjs；import ../../framework/eyes/public-api.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1206413-1214238.
import Unidentified719 from "../../vendor/modules/Unidentified719.cjs";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
var getUnidentified719 = () => Unidentified719;
/** @eyes-analysis
 * 类职责：解析路径与查询参数，推送导航并向应用广播路由变化。
 * 继承：EyesPublicApi.BaseManager；导出：RouteManager。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class RouteManager extends EyesPublicApi.BaseManager {
  /** @eyes-analysis
   * 【结构证据】写入 `_alwaysHiddenComponents`、`_configs`、`_currentRoute`、`_currentView`、`_firstLoad`、`_homeRoute`、`_previousRoute`、`_previousView`；调用 `getUnidentified719`、`new getUnidentified719()`、`super`、`this.bindFunctions`。
   * 状态写入：_alwaysHiddenComponents、_configs、_currentRoute、_currentView、_firstLoad、_homeRoute、_previousRoute、_previousView等；完整记录见索引。
   * 调用线索：getUnidentified719、new getUnidentified719()、super、this.bindFunctions。
   */
  constructor(t) {
    super(t);
    this._router = new (getUnidentified719())(null, true);
    this._previousRoute = null;
    this._currentRoute = {};
    this._firstLoad = true;
    this._query = {};
    this._configs = {};
    this._validQueries = [];
    this._homeRoute = "/home";
    this._queryCallbacks = {};
    this._previousView = null;
    this._currentView = null;
    this._alwaysHiddenComponents = [];
    this.bindFunctions(["navigate", "onRootRoute", "onNotFound", "leave"]);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._homeRoute`。
   */
  get homeRoute() {
    return this._homeRoute;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._previousRoute`。
   */
  get previousRoute() {
    return this._previousRoute;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._currentRoute`。
   */
  get currentRoute() {
    return this._currentRoute;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._query`。
   */
  get query() {
    return this._query;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._configs`。
   */
  get configs() {
    return this._configs;
  }
  /** @eyes-analysis
   * 【结构证据】读取访问器，返回 `this._currentView`；本访问器没有 AST 可见的 this 字段直接赋值。
   */
  get currentView() {
    return this._currentView;
  }
  /** @eyes-analysis
   * 【结构证据】写入访问器，接收参数 (currentView)；实际写入 `_currentView`。
   * 状态写入：_currentView。
   */
  set currentView(currentView) {
    this._currentView = currentView;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._previousView`。
   */
  get previousView() {
    return this._previousView;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_currentRoute`、`_currentRoute.url`、`_firstLoad`、`_previousRoute`；调用 `e`、`t`、`this._currentRoute.url.replace`、`this._router.hooks`、`this._router.lastRouteResolved`、`this._router.on`。
   * 状态写入：_currentRoute、_currentRoute.url、_firstLoad、_previousRoute。
   * 调用线索：e、t、this._currentRoute.url.replace、this._router.hooks、this._router.lastRouteResolved等。
   */
  init(t, e) {
    this._router.hooks({
      before: async e => {
        this._previousRoute = {
          ...this._currentRoute
        };
        this._currentRoute = this._router.lastRouteResolved() || {};
        this._currentRoute.url && (this._currentRoute.url = this._currentRoute.url.replace(/(\/)+/, "/"));
        this.addQuery(this.parseQuery(this.currentRoute.query));
        "function" == typeof t && (await t(this._currentRoute, this._previousRoute));
        e();
      },
      after: async () => {
        "function" == typeof e && (await e(this._currentRoute, this._previousRoute));
        this._firstLoad = false;
      }
    });
    this._router.on(this.onRootRoute).notFound(this.onNotFound).on("milky_way", this.onNotFound).on("observable_universe", this.onNotFound);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.cancelToken.cancel`。
   * 调用线索：t.cancelToken.cancel。
   */
  leave(t) {
    t.cancelToken.cancel();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.reroute`。
   * 调用线索：this.reroute。
   */
  onRootRoute(t) {
    this.reroute(this._homeRoute, t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._router.navigate`。
   * 调用线索：this._router.navigate。
   */
  onNotFound(t) {
    let homeRoute = this._homeRoute;
    t && (homeRoute += "?" + t);
    this._router.navigate(homeRoute);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `history.replaceState`。
   * 调用线索：history.replaceState。
   */
  replaceState(t) {
    history.replaceState({}, "", t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `EyesPublicApi.AppUtils.filterObject`、`history.replaceState`、`this._router.resolve`、`this.buildQuery`、`this.parseQuery`。
   * 调用线索：EyesPublicApi.AppUtils.filterObject、history.replaceState、this._router.resolve、this.buildQuery、this.parseQuery。
   */
  reroute(t, e = "") {
    let i;
    "string" == typeof e && (e = this.parseQuery(e));
    const s = EyesPublicApi.AppUtils.filterObject(this._configs, t => void 0 !== t);
    i = this.buildQuery({
      ...e,
      ...s
    });
    const n = window.location.pathname;
    history.replaceState(i, "", `${n}#${t}${i}`);
    this._router.resolve();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `e`；调用 `new EyesPublicApi.CancelToken`。
   * 调用线索：new EyesPublicApi.CancelToken。
   */
  addCancelToken(t) {
    const e = t || {};
    e.cancelToken = new EyesPublicApi.CancelToken();
    return e;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._router.lastRouteResolved()`；调用 `this._router.lastRouteResolved`。
   * 调用线索：this._router.lastRouteResolved。
   */
  lastRouteResolved() {
    return this._router.lastRouteResolved();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t.query?t.url+"?"+t.query:t.url`；调用 `this._router.lastRouteResolved`。
   * 调用线索：this._router.lastRouteResolved。
   */
  lastPathResolved() {
    const t = this._router.lastRouteResolved();
    return t.query ? t.url + "?" + t.query : t.url;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `e`；调用 `t.split`、`this._cleanGETParam`。
   * 调用线索：t.split、this._cleanGETParam。
   */
  getOnlyURL(t) {
    let e = t;
    const i = t.split("#");
    e = i.length > 1 ? this._cleanGETParam(i[1]) : this._cleanGETParam(i[0]);
    return e;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t.split(/\?(.*)?$/)[0]`；调用 `t.split`。
   * 调用线索：t.split。
   */
  _cleanGETParam(t) {
    return t.split(/\?(.*)?$/)[0];
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._validQueries`。
   */
  getValidQueries() {
    return this._validQueries;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_validQueries`。
   * 状态写入：_validQueries。
   */
  setValidQueries(validQueries) {
    this._validQueries = validQueries;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_configs[o]`；返回 `{}` 或 `t.split("&").reduce((t,e)=>{const i=e.split("=");if(i.length>1){const e=decodeURIComponent(i[0].trim());let s=decodeURIComponent(i[1].trim());const n=`；调用 `Number`、`Number.isNaN`、`Object.keys`、`Object.keys(this.configs).includes`、`decodeURIComponent`、`e.split`。
   * 状态写入：_configs[o]。
   * 调用线索：Number、Number.isNaN、Object.keys、Object.keys(this.configs).includes、decodeURIComponent等。
   */
  parseQuery(t) {
    if (!t) return {};
    t.replace("?", "");
    return t.split("&").reduce((t, e) => {
      const i = e.split("=");
      if (i.length > 1) {
        const e = decodeURIComponent(i[0].trim());
        let s = decodeURIComponent(i[1].trim());
        const n = {
          lighting: ["flood", "natural", "shadow"]
        };
        switch (s.toLowerCase()) {
          case "true":
            s = true;
            break;
          case "false":
            s = false;
            break;
          case "undefined":
          case "":
            s = void 0;
            break;
          case "null":
            s = null;
            break;
          default:
            {
              const t = Number(s);
              Number.isNaN(t) ? e in n ? n[e].includes(s) || (s = false) : Object.keys(this.configs).includes(e) && "true" !== s && (s = "false" !== s && void 0) : s = t;
              break;
            }
        }
        const o = decodeURIComponent(i[0].trim());
        o in this._configs ? void 0 === this._configs[o] && (this._configs[o] = s) : t[o] = s;
      }
      return t;
    }, {});
  }
  /** @eyes-analysis
   * 【结构证据】返回 `e`；调用 `Object.entries`、`e.replace`。
   * 调用线索：Object.entries、e.replace。
   */
  buildQuery(t) {
    let e = "";
    for (const [i, s] of Object.entries(t)) e += "&" + i + "=" + s;
    e = e.replace("&", "?");
    return e;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_query`；返回 `this._query`。
   * 状态写入：_query。
   */
  addQuery(t) {
    this._query = {
      ...this._query,
      ...t
    };
    return this._query;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._query`；调用 `t.forEach`。
   * 调用线索：t.forEach。
   */
  removeQuery(t = []) {
    t.forEach(t => delete this._query[t]);
    return this._query;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_configs`；返回 `this._configs`。
   * 状态写入：_configs。
   */
  addConfigs(t) {
    this._configs = {
      ...this._configs,
      ...t
    };
    return this._configs;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `configs[t]`。
   * 状态写入：configs[t]。
   */
  setConfig(t, e) {
    this.configs[t] = e;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._configs`；调用 `t.forEach`。
   * 调用线索：t.forEach。
   */
  removeConfigs(t = []) {
    t.forEach(t => delete this._configs[t]);
    return this._configs;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_query`；返回 `{...this.addQuery(t),...e}`；调用 `EyesPublicApi.AppUtils.filterObject`、`this.addQuery`、`this.removeQuery`。
   * 状态写入：_query。
   * 调用线索：EyesPublicApi.AppUtils.filterObject、this.addQuery、this.removeQuery。
   */
  updateQuery(t) {
    t.__remove && ("all" === t.__remove ? this._query = {} : this.removeQuery(t.__remove), delete t.__remove);
    const e = EyesPublicApi.AppUtils.filterObject(this._configs, t => void 0 !== t);
    return {
      ...this.addQuery(t),
      ...e
    };
  }
  /** @eyes-analysis
   * 【结构证据】返回 `(e||this._router.lastRouteResolved().url).replace(/(\/)(?=\/*\1)/,"")+this.buildQuery(this.updateQuery(t))`；调用 `(e||this._router.lastRouteResolved().url).replace`、`this._router.lastRouteResolved`、`this.buildQuery`、`this.updateQuery`。
   * 调用线索：(e||this._router.lastRouteResolved().url).replace、this._router.lastRouteResolved、this.buildQuery、this.updateQuery。
   */
  updateQueryPath(t, e = "") {
    return (e || this._router.lastRouteResolved().url).replace(/(\/)(?=\/*\1)/, "") + this.buildQuery(this.updateQuery(t));
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_currentView`、`_previousView`；调用 `this._app.getView`、`this._app.getView(s).setEnabled`、`this._app.getView(this._currentView).onEnter`、`this._app.getView(this._previousView).onLeave`、`this._app.getViews`。
   * 状态写入：_currentView、_previousView。
   * 调用线索：this._app.getView、this._app.getView(s).setEnabled、this._app.getView(this._currentView).onEnter、this._app.getView(this._previousView).onLeave、this._app.getViews。
   */
  async resetView(currentView, e) {
    if (this._previousView = this._currentView, this._currentView = currentView, this._currentView !== this._previousView) {
      null !== this._previousView && (await this._app.getView(this._previousView).onLeave(e));
      await this._app.getView(this._currentView).onEnter(e);
      const i = this._app.getViews();
      for (let e = i.length - 1; e >= 0; e--) {
        const s = i[e];
        this._app.getView(s).setEnabled(s === currentView);
      }
    }
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_currentRoute.params`；调用 `this.addCancelToken`、`this.goToView`、`this.parseQuery`、`this.resetView`。
   * 状态写入：_currentRoute.params。
   * 调用线索：this.addCancelToken、this.goToView、this.parseQuery、this.resetView。
   */
  async handleRoute(t, e, i) {
    e || (e = this.addCancelToken(e), this._currentRoute.params = e);
    let s = {};
    i && (s = this.parseQuery(i));
    await this.resetView(t, {
      ...e,
      ...s,
      ...this._configs
    });
    await this.goToView(t, e, {
      ...s,
      ...this._configs
    });
  }
  /** @eyes-analysis
   * 【结构证据】返回 `null!==e&&void 0!==e[1]&&e[1]===t`；调用 `this._currentRoute.url.match`。
   * 调用线索：this._currentRoute.url.match。
   */
  stillOnRoute(t) {
    const e = this._currentRoute.url.match(/^\/([^!/]*)/);
    return null !== e && void 0 !== e[1] && e[1] === t;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this.getOnlyURL(t)!==this.getOnlyURL(e)`；调用 `this.getOnlyURL`。
   * 调用线索：this.getOnlyURL。
   */
  urlChanged(t, e) {
    return this.getOnlyURL(t) !== this.getOnlyURL(e);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `true` 或 `t.url!==e.url`；调用 `EyesPublicApi.AppUtils.deepCopy`、`EyesPublicApi.AppUtils.deepEqual`、`EyesPublicApi.AppUtils.isEmptyObject`。
   * 调用线索：EyesPublicApi.AppUtils.deepCopy、EyesPublicApi.AppUtils.deepEqual、EyesPublicApi.AppUtils.isEmptyObject。
   */
  routeChanged(t, e) {
    if ("" === t && !e) return true;
    if (!e || EyesPublicApi.AppUtils.isEmptyObject(e)) return true;
    if (t.url) return t.url !== e.url;
    const i = EyesPublicApi.AppUtils.deepCopy(t);
    const s = EyesPublicApi.AppUtils.deepCopy(e);
    return !EyesPublicApi.AppUtils.deepEqual(i, s);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `true` 或 `!EyesPublicApi.AppUtils.deepEqual(i,s)`；调用 `EyesPublicApi.AppUtils.deepCopy`、`EyesPublicApi.AppUtils.deepEqual`、`e.split`、`e.split("&").forEach`、`i[t].toString`、`t.split`。
   * 调用线索：EyesPublicApi.AppUtils.deepCopy、EyesPublicApi.AppUtils.deepEqual、e.split、e.split("&").forEach、i[t].toString等。
   */
  queryChanged(t, e) {
    if (!e) return true;
    const i = EyesPublicApi.AppUtils.deepCopy(t);
    const s = {};
    for (const t in i) "function" == typeof i[t].toString && (i[t] = i[t].toString());
    e.split("&").forEach(t => {
      const e = t.split("=");
      s[e[0]] = e[1];
    });
    return !EyesPublicApi.AppUtils.deepEqual(i, s);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._app.getView`、`this._app.getView(t).onQueryChange`、`this._app.getView(t).onRouteChange`、`this.queryChanged`、`this.routeChanged`。
   * 调用线索：this._app.getView、this._app.getView(t).onQueryChange、this._app.getView(t).onRouteChange、this.queryChanged、this.routeChanged。
   */
  async goToView(t, e, i) {
    this.routeChanged(this.currentRoute, this.previousRoute) ? await this._app.getView(t).onRouteChange({
      ...e,
      ...i
    }) : this.queryChanged(i, this.previousRoute.query) && (await this._app.getView(t).onQueryChange({
      ...e,
      ...i
    }));
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._router.on`、`this.before`、`this.handleRoute`。
   * 调用线索：this._router.on、this.before、this.handleRoute。
   */
  addRoutes(t) {
    for (let e = 0; e < t.length; e++) {
      const {
        route: route,
        view: view
      } = t[e];
      this._router.on(route, async (t, e) => {
        await this.handleRoute(view, t, e);
      }, {
        before: async (t, e) => {
          await this.before(t, e, view);
        },
        leave: this.leave
      });
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `e.cancelToken.cancel`、`t`、`this._app.getView`、`this.addCancelToken`、`this.parseQuery`。
   * 调用线索：e.cancelToken.cancel、t、this._app.getView、this._app.getView(i)?.validateQuery、this.addCancelToken等。
   */
  before(t, e, i) {
    let s = {};
    this._currentRoute.query && (s = this.parseQuery(this._currentRoute.query));
    e = this.addCancelToken(e);
    const n = this._app.getView(i)?.validateQuery({
      ...e,
      ...s
    });
    n || (e.cancelToken.cancel(), "function" == typeof t && t(false));
    "function" == typeof t && t();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_queryCallbacks[t]`；返回 `()=>{const i=this._queryCallbacks[t].indexOf(e);this._queryCallbacks[t].splice(i,1);}`；调用 `this._queryCallbacks[t].includes`、`this._queryCallbacks[t].indexOf`、`this._queryCallbacks[t].push`、`this._queryCallbacks[t].splice`。
   * 状态写入：_queryCallbacks[t]。
   * 调用线索：this._queryCallbacks[t].includes、this._queryCallbacks[t].indexOf、this._queryCallbacks[t].push、this._queryCallbacks[t].splice。
   */
  subscribeToQuery(t, e) {
    if ("function" == typeof e) {
      this._queryCallbacks[t] || (this._queryCallbacks[t] = []);
      this._queryCallbacks[t].includes(e) || this._queryCallbacks[t].push(e);
      return () => {
        const i = this._queryCallbacks[t].indexOf(e);
        this._queryCallbacks[t].splice(i, 1);
      };
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._router.resolve`、`this.handleEmbedQueries`。
   * 调用线索：this._router.resolve、this.handleEmbedQueries。
   */
  start() {
    this._router.resolve();
    this.handleEmbedQueries();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.description.replace`、`this._alwaysHiddenComponents.push`、`this.app.getComponent`。
   * 调用线索：searchComponent?.hide、settingsComponent?.hideFullScreenOption、settingsComponent?.toggleLightOptions、t.description.replace、this._alwaysHiddenComponents.push等。
   */
  handleEmbedQueries() {
    const {
      hideFullScreenToggle: hideFullScreenToggle,
      lighting: lighting,
      noKeyboard: noKeyboard,
      search: search
    } = this._configs;
    const n = true === noKeyboard || false === search;
    const searchComponent = this.app.getComponent("search");
    const settingsComponent = this.app.getComponent("settings");
    let a = [];
    let l = null;
    const tutorialOverlayComponent = this.app.getComponent("tutorialOverlay");
    if (true === hideFullScreenToggle && settingsComponent?.hideFullScreenOption?.(), "flood" !== lighting && "natural" !== lighting || settingsComponent?.toggleLightOptions?.(lighting), n && (this._alwaysHiddenComponents.push("search"), searchComponent?.hide(), a = tutorialOverlayComponent?.hideTutorialSlide?.("search")), true === this._configs.hideFullScreenToggle) {
      const t = this.app.tutorials?.find(t => "settings" === t.id);
      t && (t.description = t.description.replace(t.description, t.alternateDescription));
    }
    l = this.app.setTutorialVariables?.(a.length ? a : this.app.tutorials);
    tutorialOverlayComponent?.setTutorials?.(l);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._navigate(t,e)`；调用 `EyesPublicApi.AppUtils.cleanPathDuplicate`、`EyesPublicApi.AppUtils.isEmptyObject`、`e.includes`、`this._app.getManager`、`this._navigate`、`timeManager.getTimeRate`。
   * 调用线索：EyesPublicApi.AppUtils.cleanPathDuplicate、EyesPublicApi.AppUtils.isEmptyObject、e.includes、this._app.getManager、this._navigate等。
   */
  navigate(t, e = "", i = {}) {
    if (EyesPublicApi.AppUtils.isEmptyObject(i) || "string" == typeof t && (e = EyesPublicApi.AppUtils.cleanPathDuplicate(`${e}/${t}`), t = {}), i.__remove && (t.__remove = i.__remove), i.keepTime) {
      const timeManager = this._app.getManager("time");
      this.query.time && timeManager && (e.includes("time=") || (t.time = t.time || timeManager.getTimeUrl()), e.includes("rate=") || (t.rate = t.rate || timeManager.getTimeRate()));
    }
    return this._navigate(t, e);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_query`；返回 `true` 或 `false`；调用 `EyesPublicApi.AppUtils.filterObject`、`s.split`、`t.includes`、`t.startsWith`、`this._router.navigate`、`this.buildQuery`。
   * 状态写入：_query。
   * 调用线索：EyesPublicApi.AppUtils.filterObject、s.split、t.includes、t.startsWith、this._router.navigate等。
   */
  _navigate(t, e = "") {
    if ("string" == typeof t) {
      const i = this.lastPathResolved();
      let s = t;
      if (t.startsWith("/") || (s = "/" + t), t.includes(e) || (s = e + t), i !== s) {
        const t = s.split("?");
        if (t.length > 1) this._query = this.parseQuery(t[1]);else {
          this._query = {};
          const t = EyesPublicApi.AppUtils.filterObject(this._configs, t => void 0 !== t);
          s += this.buildQuery(t);
        }
        this._router.navigate(s);
        return true;
      }
      return false;
    }
    return this.navigate(this.updateQueryPath(t, e), e);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.buildQuery`、`this.navigate`。
   * 调用线索：this.buildQuery、this.navigate。
   */
  returnHome(t = true) {
    const e = t ? this.buildQuery(this.query) : "";
    this.navigate(e);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `i.onQueryChange`、`i.onRouteChange`、`this._app.getView`、`this._router.lastRouteResolved`、`this.parseQuery`。
   * 调用线索：i.onQueryChange、i.onRouteChange、this._app.getView、this._router.lastRouteResolved、this.parseQuery。
   */
  async reload(t = true, e = false) {
    const i = await this._app.getView(this._currentView);
    const {
      params: params,
      query: query
    } = this._router.lastRouteResolved();
    let o = {};
    !e && query && (o = this.parseQuery(query));
    t ? i.onQueryChange({
      ...params,
      ...o
    }) : i.onRouteChange({
      ...params,
      ...o
    });
  }
}
export { RouteManager };
