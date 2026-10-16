// Recovered from app.js:1206413-1214238.
import Unidentified719 from "../../vendor/modules/Unidentified719.cjs";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
var getUnidentified719 = () => Unidentified719;
class RouteManager extends EyesPublicApi.BaseManager {
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
  get homeRoute() {
    return this._homeRoute;
  }
  get previousRoute() {
    return this._previousRoute;
  }
  get currentRoute() {
    return this._currentRoute;
  }
  get query() {
    return this._query;
  }
  get configs() {
    return this._configs;
  }
  get currentView() {
    return this._currentView;
  }
  set currentView(currentView) {
    this._currentView = currentView;
  }
  get previousView() {
    return this._previousView;
  }
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
  leave(t) {
    t.cancelToken.cancel();
  }
  onRootRoute(t) {
    this.reroute(this._homeRoute, t);
  }
  onNotFound(t) {
    let homeRoute = this._homeRoute;
    t && (homeRoute += "?" + t);
    this._router.navigate(homeRoute);
  }
  replaceState(t) {
    history.replaceState({}, "", t);
  }
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
  addCancelToken(t) {
    const e = t || {};
    e.cancelToken = new EyesPublicApi.CancelToken();
    return e;
  }
  lastRouteResolved() {
    return this._router.lastRouteResolved();
  }
  lastPathResolved() {
    const t = this._router.lastRouteResolved();
    return t.query ? t.url + "?" + t.query : t.url;
  }
  getOnlyURL(t) {
    let e = t;
    const i = t.split("#");
    e = i.length > 1 ? this._cleanGETParam(i[1]) : this._cleanGETParam(i[0]);
    return e;
  }
  _cleanGETParam(t) {
    return t.split(/\?(.*)?$/)[0];
  }
  getValidQueries() {
    return this._validQueries;
  }
  setValidQueries(validQueries) {
    this._validQueries = validQueries;
  }
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
  buildQuery(t) {
    let e = "";
    for (const [i, s] of Object.entries(t)) e += "&" + i + "=" + s;
    e = e.replace("&", "?");
    return e;
  }
  addQuery(t) {
    this._query = {
      ...this._query,
      ...t
    };
    return this._query;
  }
  removeQuery(t = []) {
    t.forEach(t => delete this._query[t]);
    return this._query;
  }
  addConfigs(t) {
    this._configs = {
      ...this._configs,
      ...t
    };
    return this._configs;
  }
  setConfig(t, e) {
    this.configs[t] = e;
  }
  removeConfigs(t = []) {
    t.forEach(t => delete this._configs[t]);
    return this._configs;
  }
  updateQuery(t) {
    t.__remove && ("all" === t.__remove ? this._query = {} : this.removeQuery(t.__remove), delete t.__remove);
    const e = EyesPublicApi.AppUtils.filterObject(this._configs, t => void 0 !== t);
    return {
      ...this.addQuery(t),
      ...e
    };
  }
  updateQueryPath(t, e = "") {
    return (e || this._router.lastRouteResolved().url).replace(/(\/)(?=\/*\1)/, "") + this.buildQuery(this.updateQuery(t));
  }
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
  stillOnRoute(t) {
    const e = this._currentRoute.url.match(/^\/([^!/]*)/);
    return null !== e && void 0 !== e[1] && e[1] === t;
  }
  urlChanged(t, e) {
    return this.getOnlyURL(t) !== this.getOnlyURL(e);
  }
  routeChanged(t, e) {
    if ("" === t && !e) return true;
    if (!e || EyesPublicApi.AppUtils.isEmptyObject(e)) return true;
    if (t.url) return t.url !== e.url;
    const i = EyesPublicApi.AppUtils.deepCopy(t);
    const s = EyesPublicApi.AppUtils.deepCopy(e);
    return !EyesPublicApi.AppUtils.deepEqual(i, s);
  }
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
  async goToView(t, e, i) {
    this.routeChanged(this.currentRoute, this.previousRoute) ? await this._app.getView(t).onRouteChange({
      ...e,
      ...i
    }) : this.queryChanged(i, this.previousRoute.query) && (await this._app.getView(t).onQueryChange({
      ...e,
      ...i
    }));
  }
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
  start() {
    this._router.resolve();
    this.handleEmbedQueries();
  }
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
  navigate(t, e = "", i = {}) {
    if (EyesPublicApi.AppUtils.isEmptyObject(i) || "string" == typeof t && (e = EyesPublicApi.AppUtils.cleanPathDuplicate(`${e}/${t}`), t = {}), i.__remove && (t.__remove = i.__remove), i.keepTime) {
      const timeManager = this._app.getManager("time");
      this.query.time && timeManager && (e.includes("time=") || (t.time = t.time || timeManager.getTimeUrl()), e.includes("rate=") || (t.rate = t.rate || timeManager.getTimeRate()));
    }
    return this._navigate(t, e);
  }
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
  returnHome(t = true) {
    const e = t ? this.buildQuery(this.query) : "";
    this.navigate(e);
  }
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
