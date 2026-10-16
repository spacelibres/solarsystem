// Recovered from app.js:663079-665357.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import BreadcrumbTemplate from "../templates/BreadcrumbTemplate.html";
import "../../styles/extracted/BreadcrumbStyles.js";
var getBreadcrumbTemplate = () => BreadcrumbTemplate;
class Breadcrumb extends EyesPublicApi.BaseComponent {
  constructor(t, e = {
    params: {}
  }) {
    e.params = {
      title: "",
      ...e.params
    };
    super(t, null, e);
    this._class.isHomeActiveClass = {
      true: "active",
      false: ""
    };
    this._crumbTexts = {
      compare: "Compare Size",
      events: "Mission Events"
    };
    this.setCrumbClickHandler(t => {
      this._app.getManager("router").navigate(t, "", {
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
  updateBreadcrumb(t) {
    this._element.innerHTML = "";
    const e = document.createDocumentFragment();
    false === this._app.getManager("router").configs.logo && this._children.staticLogo.classList.add("hidden");
    this._app.getManager("router").configs.locked && this._children.static.classList.remove("clickable");
    e.appendChild(this._children.static);
    const i = !t || 0 === t.length || 1 === t.length && "home" === t[0];
    if (i && (t = null), this.setState({
      isHomeActive: i,
      isHomeActiveClass: this._class.isHomeActiveClass[i]
    }), t && t.length > 0) for (let i = 0; i < t.length; i++) {
      const s = t[i];
      const n = t.slice(0, i + 1).join("/");
      const o = this._createCrumb(s, n);
      e.appendChild(o);
    }
    this._element.appendChild(e);
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
  _getCrumbText(t) {
    if (this._crumbTexts[t]) return this._crumbTexts[t];
    const e = this._app.getManager("content").getEntityInfo([t]);
    if (e) return e.displayName || e.iauName;
    const i = this._app.getManager("content").events[t];
    if (i) return i.title;
    const s = this._app.getManager("content").getStoryList().stories[t];
    return s ? s.title : "";
  }
  _createCrumb(t, e) {
    const i = document.createElement("nav");
    const {
      locked: locked
    } = this._app.getManager("router").configs;
    i.className = "container " + (locked ? "" : "clickable");
    locked || i.addEventListener("click", () => {
      this._onCrumbClick(e);
    });
    const n = document.createElement("span");
    n.className = "separator icon icon-greater";
    i.appendChild(n);
    const o = document.createElement("a");
    o.innerHTML = this._getCrumbText(t) || t;
    o.className = "text link";
    i.appendChild(o);
    return i;
  }
}
Breadcrumb.html = getBreadcrumbTemplate();
export { Breadcrumb };
