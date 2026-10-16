// Recovered from app.js:663079-665357.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import BreadcrumbTemplate from "../templates/BreadcrumbTemplate.html";
import "../../styles/extracted/BreadcrumbStyles.js";
var getBreadcrumbTemplate = () => BreadcrumbTemplate;
/* 面包屑每次路由变化重建动态节点，静态 logo 节点继续复用。每项点击闭包保存该层完整路径，locked 配置决定是否注册点击监听。 */
class Breadcrumb extends EyesPublicApi.BaseComponent {
  constructor(app, options = {
    params: {}
  }) {
    options.params = {
      title: "",
      ...options.params
    };
    super(app, null, options);
    this._class.isHomeActiveClass = {
      true: "active",
      false: ""
    };
    this._crumbTexts = {
      compare: "Compare Size",
      events: "Mission Events"
    };
    this.setCrumbClickHandler(crumbRoute => {
      this._app.getManager("router").navigate(crumbRoute, "", {
        __remove: "all",
        keepTime: true
      });
    });
    Object.assign(this._state, {
      isHomeActive: false,
      isHomeActiveClass: this._class.isHomeActiveClass.false
    });
    this.bindFunctions(["_goToHome"]);
  }
  updateBreadcrumb(routeParts) {
    this._element.innerHTML = "";
    const fragment = document.createDocumentFragment();
    false === this._app.getManager("router").configs.logo && this._children.staticLogo.classList.add("hidden");
    this._app.getManager("router").configs.locked && this._children.static.classList.remove("clickable");
    fragment.appendChild(this._children.static);
    const isHomeRoute = !routeParts || 0 === routeParts.length || 1 === routeParts.length && "home" === routeParts[0];
    if (isHomeRoute && (routeParts = null), this.setState({
      isHomeActive: isHomeRoute,
      isHomeActiveClass: this._class.isHomeActiveClass[isHomeRoute]
    }), routeParts && routeParts.length > 0) for (let routePartIndex = 0; routePartIndex < routeParts.length; routePartIndex++) {
      const routePart = routeParts[routePartIndex];
      const crumbRoute = routeParts.slice(0, routePartIndex + 1).join("/");
      const crumbElement = this._createCrumb(routePart, crumbRoute);
      fragment.appendChild(crumbElement);
    }
    this._element.appendChild(fragment);
  }
  onRouteChange({
    routeParts: routeParts
  } = {}) {
    this.updateBreadcrumb(routeParts);
  }
  setCrumbClickHandler(onCrumbClick) {
    this._onCrumbClick = onCrumbClick;
  }
  _goToHome() {
    const routerManager = this._app.getManager("router");
    "/home" === routerManager.currentRoute.url ? this._app.cameraScripts.goToSystem("inner_solar_system") : routerManager.navigate({
      __remove: "all"
    }, "/home");
  }
  _getCrumbText(routePart) {
    if (this._crumbTexts[routePart]) return this._crumbTexts[routePart];
    const entityInfo = this._app.getManager("content").getEntityInfo([routePart]);
    if (entityInfo) return entityInfo.displayName || entityInfo.iauName;
    const eventInfo = this._app.getManager("content").events[routePart];
    if (eventInfo) return eventInfo.title;
    const story = this._app.getManager("content").getStoryList().stories[routePart];
    return story ? story.title : "";
  }
  _createCrumb(routePart, crumbRoute) {
    const crumbElement = document.createElement("nav");
    const {
      locked: locked
    } = this._app.getManager("router").configs;
    crumbElement.className = "container " + (locked ? "" : "clickable");
    locked || crumbElement.addEventListener("click", () => {
      this._onCrumbClick(crumbRoute);
    });
    const separatorElement = document.createElement("span");
    separatorElement.className = "separator icon icon-greater";
    crumbElement.appendChild(separatorElement);
    const linkElement = document.createElement("a");
    linkElement.innerHTML = this._getCrumbText(routePart) || routePart;
    linkElement.className = "text link";
    crumbElement.appendChild(linkElement);
    return crumbElement;
  }
}
Breadcrumb.html = getBreadcrumbTemplate();
export { Breadcrumb };
