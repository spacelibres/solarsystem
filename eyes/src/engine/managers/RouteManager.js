// Recovered from app.js:1206413-1214238.
/* 路由管理器分开保存路径查询与嵌入 configs，parseQuery 会把已登记配置写入 configs 而不返回到普通 query。视图切换先 await 离开/进入，再区分路径更新与查询更新；每次路由参数有独立 CancelToken。navigate/updateQuery 会消费 __remove 并修改传入对象，保留 keepTime 与参数优先级的原逻辑。 */
import Unidentified719 from "../../vendor/modules/Unidentified719.cjs";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
var getUnidentified719 = () => Unidentified719;
class RouteManager extends EyesPublicApi.BaseManager {
  constructor(app) {
    super(app);
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
  init(beforeRoute, afterRoute) {
    this._router.hooks({
      before: async continueRoute => {
        this._previousRoute = {
          ...this._currentRoute
        };
        this._currentRoute = this._router.lastRouteResolved() || {};
        this._currentRoute.url && (this._currentRoute.url = this._currentRoute.url.replace(/(\/)+/, "/"));
        this.addQuery(this.parseQuery(this.currentRoute.query));
        "function" == typeof beforeRoute && (await beforeRoute(this._currentRoute, this._previousRoute));
        continueRoute();
      },
      after: async () => {
        "function" == typeof afterRoute && (await afterRoute(this._currentRoute, this._previousRoute));
        this._firstLoad = false;
      }
    });
    this._router.on(this.onRootRoute).notFound(this.onNotFound).on("milky_way", this.onNotFound).on("observable_universe", this.onNotFound);
  }
  leave(routeParams) {
    routeParams.cancelToken.cancel();
  }
  onRootRoute(queryParams) {
    this.reroute(this._homeRoute, queryParams);
  }
  onNotFound(queryString) {
    let homeRoute = this._homeRoute;
    queryString && (homeRoute += "?" + queryString);
    this._router.navigate(homeRoute);
  }
  replaceState(url) {
    history.replaceState({}, "", url);
  }
  reroute(routePath, queryParams = "") {
    let queryString;
    "string" == typeof queryParams && (queryParams = this.parseQuery(queryParams));
    const activeConfigs = EyesPublicApi.AppUtils.filterObject(this._configs, configValue => void 0 !== configValue);
    queryString = this.buildQuery({
      ...queryParams,
      ...activeConfigs
    });
    const pathname = window.location.pathname;
    history.replaceState(queryString, "", `${pathname}#${routePath}${queryString}`);
    this._router.resolve();
  }
  addCancelToken(routeParams) {
    const paramsWithToken = routeParams || {};
    paramsWithToken.cancelToken = new EyesPublicApi.CancelToken();
    return paramsWithToken;
  }
  lastRouteResolved() {
    return this._router.lastRouteResolved();
  }
  lastPathResolved() {
    const resolvedRoute = this._router.lastRouteResolved();
    return resolvedRoute.query ? resolvedRoute.url + "?" + resolvedRoute.query : resolvedRoute.url;
  }
  getOnlyURL(url) {
    let routePath = url;
    const hashParts = url.split("#");
    routePath = hashParts.length > 1 ? this._cleanGETParam(hashParts[1]) : this._cleanGETParam(hashParts[0]);
    return routePath;
  }
  _cleanGETParam(routePath) {
    return routePath.split(/\?(.*)?$/)[0];
  }
  getValidQueries() {
    return this._validQueries;
  }
  setValidQueries(validQueries) {
    this._validQueries = validQueries;
  }
  parseQuery(queryString) {
    if (!queryString) return {};
    queryString.replace("?", "");
    return queryString.split("&").reduce((parsedQuery, queryEntry) => {
      const entryParts = queryEntry.split("=");
      if (entryParts.length > 1) {
        const queryName = decodeURIComponent(entryParts[0].trim());
        let queryValue = decodeURIComponent(entryParts[1].trim());
        const allowedConfigValues = {
          lighting: ["flood", "natural", "shadow"]
        };
        switch (queryValue.toLowerCase()) {
          case "true":
            queryValue = true;
            break;
          case "false":
            queryValue = false;
            break;
          case "undefined":
          case "":
            queryValue = void 0;
            break;
          case "null":
            queryValue = null;
            break;
          default:
            {
              const numericValue = Number(queryValue);
              Number.isNaN(numericValue) ? queryName in allowedConfigValues ? allowedConfigValues[queryName].includes(queryValue) || (queryValue = false) : Object.keys(this.configs).includes(queryName) && "true" !== queryValue && (queryValue = "false" !== queryValue && void 0) : queryValue = numericValue;
              break;
            }
        }
        const configKey = decodeURIComponent(entryParts[0].trim());
        configKey in this._configs ? void 0 === this._configs[configKey] && (this._configs[configKey] = queryValue) : parsedQuery[configKey] = queryValue;
      }
      return parsedQuery;
    }, {});
  }
  buildQuery(queryParams) {
    let queryString = "";
    for (const [queryName, queryValue] of Object.entries(queryParams)) queryString += "&" + queryName + "=" + queryValue;
    queryString = queryString.replace("&", "?");
    return queryString;
  }
  addQuery(queryUpdates) {
    this._query = {
      ...this._query,
      ...queryUpdates
    };
    return this._query;
  }
  removeQuery(queryNames = []) {
    queryNames.forEach(queryName => delete this._query[queryName]);
    return this._query;
  }
  addConfigs(configUpdates) {
    this._configs = {
      ...this._configs,
      ...configUpdates
    };
    return this._configs;
  }
  setConfig(configName, configValue) {
    this.configs[configName] = configValue;
  }
  removeConfigs(configNames = []) {
    configNames.forEach(configName => delete this._configs[configName]);
    return this._configs;
  }
  updateQuery(queryUpdates) {
    queryUpdates.__remove && ("all" === queryUpdates.__remove ? this._query = {} : this.removeQuery(queryUpdates.__remove), delete queryUpdates.__remove);
    const activeConfigs = EyesPublicApi.AppUtils.filterObject(this._configs, configValue => void 0 !== configValue);
    return {
      ...this.addQuery(queryUpdates),
      ...activeConfigs
    };
  }
  updateQueryPath(queryUpdates, routePath = "") {
    return (routePath || this._router.lastRouteResolved().url).replace(/(\/)(?=\/*\1)/, "") + this.buildQuery(this.updateQuery(queryUpdates));
  }
  async resetView(currentView, routeParams) {
    if (this._previousView = this._currentView, this._currentView = currentView, this._currentView !== this._previousView) {
      null !== this._previousView && (await this._app.getView(this._previousView).onLeave(routeParams));
      await this._app.getView(this._currentView).onEnter(routeParams);
      const views = this._app.getViews();
      for (let viewIndex = views.length - 1; viewIndex >= 0; viewIndex--) {
        const viewName = views[viewIndex];
        this._app.getView(viewName).setEnabled(viewName === currentView);
      }
    }
  }
  async handleRoute(viewName, routeParams, queryString) {
    routeParams || (routeParams = this.addCancelToken(routeParams), this._currentRoute.params = routeParams);
    let queryParams = {};
    queryString && (queryParams = this.parseQuery(queryString));
    await this.resetView(viewName, {
      ...routeParams,
      ...queryParams,
      ...this._configs
    });
    await this.goToView(viewName, routeParams, {
      ...queryParams,
      ...this._configs
    });
  }
  stillOnRoute(routeName) {
    const routeMatch = this._currentRoute.url.match(/^\/([^!/]*)/);
    return null !== routeMatch && void 0 !== routeMatch[1] && routeMatch[1] === routeName;
  }
  urlChanged(currentUrl, previousUrl) {
    return this.getOnlyURL(currentUrl) !== this.getOnlyURL(previousUrl);
  }
  routeChanged(currentRoute, previousRoute) {
    if ("" === currentRoute && !previousRoute) return true;
    if (!previousRoute || EyesPublicApi.AppUtils.isEmptyObject(previousRoute)) return true;
    if (currentRoute.url) return currentRoute.url !== previousRoute.url;
    const currentSnapshot = EyesPublicApi.AppUtils.deepCopy(currentRoute);
    const previousSnapshot = EyesPublicApi.AppUtils.deepCopy(previousRoute);
    return !EyesPublicApi.AppUtils.deepEqual(currentSnapshot, previousSnapshot);
  }
  queryChanged(currentQuery, previousQueryString) {
    if (!previousQueryString) return true;
    const currentSnapshot = EyesPublicApi.AppUtils.deepCopy(currentQuery);
    const previousSnapshot = {};
    for (const queryName in currentSnapshot) "function" == typeof currentSnapshot[queryName].toString && (currentSnapshot[queryName] = currentSnapshot[queryName].toString());
    previousQueryString.split("&").forEach(queryEntry => {
      const entryParts = queryEntry.split("=");
      previousSnapshot[entryParts[0]] = entryParts[1];
    });
    return !EyesPublicApi.AppUtils.deepEqual(currentSnapshot, previousSnapshot);
  }
  async goToView(viewName, routeParams, queryParams) {
    this.routeChanged(this.currentRoute, this.previousRoute) ? await this._app.getView(viewName).onRouteChange({
      ...routeParams,
      ...queryParams
    }) : this.queryChanged(queryParams, this.previousRoute.query) && (await this._app.getView(viewName).onQueryChange({
      ...routeParams,
      ...queryParams
    }));
  }
  addRoutes(routeDefinitions) {
    for (let routeIndex = 0; routeIndex < routeDefinitions.length; routeIndex++) {
      const {
        route: route,
        view: view
      } = routeDefinitions[routeIndex];
      this._router.on(route, async (routeParams, queryString) => {
        await this.handleRoute(view, routeParams, queryString);
      }, {
        before: async (continueRoute, routeParams) => {
          await this.before(continueRoute, routeParams, view);
        },
        leave: this.leave
      });
    }
  }
  before(continueRoute, routeParams, viewName) {
    let queryParams = {};
    this._currentRoute.query && (queryParams = this.parseQuery(this._currentRoute.query));
    routeParams = this.addCancelToken(routeParams);
    const isValid = this._app.getView(viewName)?.validateQuery({
      ...routeParams,
      ...queryParams
    });
    isValid || (routeParams.cancelToken.cancel(), "function" == typeof continueRoute && continueRoute(false));
    "function" == typeof continueRoute && continueRoute();
  }
  subscribeToQuery(queryName, callback) {
    if ("function" == typeof callback) {
      this._queryCallbacks[queryName] || (this._queryCallbacks[queryName] = []);
      this._queryCallbacks[queryName].includes(callback) || this._queryCallbacks[queryName].push(callback);
      return () => {
        const callbackIndex = this._queryCallbacks[queryName].indexOf(callback);
        this._queryCallbacks[queryName].splice(callbackIndex, 1);
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
    const hideSearch = true === noKeyboard || false === search;
    const searchComponent = this.app.getComponent("search");
    const settingsComponent = this.app.getComponent("settings");
    let tutorialsWithoutSearch = [];
    let tutorials = null;
    const tutorialOverlayComponent = this.app.getComponent("tutorialOverlay");
    if (true === hideFullScreenToggle && settingsComponent?.hideFullScreenOption?.(), "flood" !== lighting && "natural" !== lighting || settingsComponent?.toggleLightOptions?.(lighting), hideSearch && (this._alwaysHiddenComponents.push("search"), searchComponent?.hide(), tutorialsWithoutSearch = tutorialOverlayComponent?.hideTutorialSlide?.("search")), true === this._configs.hideFullScreenToggle) {
      const settingsTutorial = this.app.tutorials?.find(tutorial => "settings" === tutorial.id);
      settingsTutorial && (settingsTutorial.description = settingsTutorial.description.replace(settingsTutorial.description, settingsTutorial.alternateDescription));
    }
    tutorials = this.app.setTutorialVariables?.(tutorialsWithoutSearch.length ? tutorialsWithoutSearch : this.app.tutorials);
    tutorialOverlayComponent?.setTutorials?.(tutorials);
  }
  navigate(queryOrPath, routePath = "", options = {}) {
    if (EyesPublicApi.AppUtils.isEmptyObject(options) || "string" == typeof queryOrPath && (routePath = EyesPublicApi.AppUtils.cleanPathDuplicate(`${routePath}/${queryOrPath}`), queryOrPath = {}), options.__remove && (queryOrPath.__remove = options.__remove), options.keepTime) {
      const timeManager = this._app.getManager("time");
      this.query.time && timeManager && (routePath.includes("time=") || (queryOrPath.time = queryOrPath.time || timeManager.getTimeUrl()), routePath.includes("rate=") || (queryOrPath.rate = queryOrPath.rate || timeManager.getTimeRate()));
    }
    return this._navigate(queryOrPath, routePath);
  }
  _navigate(queryOrPath, routePrefix = "") {
    if ("string" == typeof queryOrPath) {
      const currentPath = this.lastPathResolved();
      let destinationPath = queryOrPath;
      if (queryOrPath.startsWith("/") || (destinationPath = "/" + queryOrPath), queryOrPath.includes(routePrefix) || (destinationPath = routePrefix + queryOrPath), currentPath !== destinationPath) {
        const pathParts = destinationPath.split("?");
        if (pathParts.length > 1) this._query = this.parseQuery(pathParts[1]);else {
          this._query = {};
          const activeConfigs = EyesPublicApi.AppUtils.filterObject(this._configs, configValue => void 0 !== configValue);
          destinationPath += this.buildQuery(activeConfigs);
        }
        this._router.navigate(destinationPath);
        return true;
      }
      return false;
    }
    return this.navigate(this.updateQueryPath(queryOrPath, routePrefix), routePrefix);
  }
  returnHome(keepQuery = true) {
    const queryString = keepQuery ? this.buildQuery(this.query) : "";
    this.navigate(queryString);
  }
  async reload(queryOnly = true, ignoreQuery = false) {
    const currentView = await this._app.getView(this._currentView);
    const {
      params: params,
      query: query
    } = this._router.lastRouteResolved();
    let queryParams = {};
    !ignoreQuery && query && (queryParams = this.parseQuery(query));
    queryOnly ? currentView.onQueryChange({
      ...params,
      ...queryParams
    }) : currentView.onRouteChange({
      ...params,
      ...queryParams
    });
  }
}
export { RouteManager };
