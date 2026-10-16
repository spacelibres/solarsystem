/** @eyes-analysis
 * 文件职责：将路由和目标层级转换为可点击面包屑
 * 依据：imports: ../../framework/eyes/public-api.js, ../templates/BreadcrumbTemplate.html, ../../styles/extracted/BreadcrumbStyles.js；manager dependencies: router, content
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:663079-665357.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import BreadcrumbTemplate from "../templates/BreadcrumbTemplate.html";
import "../../styles/extracted/BreadcrumbStyles.js";
var getBreadcrumbTemplate = () => BreadcrumbTemplate;
/** @eyes-analysis
 * 类职责：将路由和目标层级转换为可点击面包屑；继承 EyesPublicApi.BaseComponent
 * 继承：EyesPublicApi.BaseComponent；导出：Breadcrumb。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Breadcrumb extends EyesPublicApi.BaseComponent {
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 状态写入：_class.isHomeActiveClass、_crumbTexts。
   * 调用线索：Object.assign、super、this._app.getManager、this._app.getManager("router").navigate、this.bindFunctions等。
   */
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
  /** @eyes-analysis
   * 执行 updateBreadcrumb 对应的组件业务步骤；调用 this._app.getManager, this._children.staticLogo.classList.add, this._children.static.classList.remove, this.setState, this._createCrumb, this._element.appendChild。
   * 状态写入：_element.innerHTML。
   * 调用线索：document.createDocumentFragment、e.appendChild、t.slice、t.slice(0,i+1).join、this._app.getManager等。
   */
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
  /** @eyes-analysis
   * 源码扩展或访问入口；调用 this.updateBreadcrumb；写入 。
   * 调用线索：this.updateBreadcrumb。
   */
  onRouteChange({
    routeParts: routeParts
  } = {}) {
    this.updateBreadcrumb(routeParts);
  }
  /** @eyes-analysis
   * 执行 setCrumbClickHandler 对应的组件业务步骤；写入 _onCrumbClick。
   * 状态写入：_onCrumbClick。
   */
  setCrumbClickHandler(onCrumbClick) {
    this._onCrumbClick = onCrumbClick;
  }
  /** @eyes-analysis
   * 执行 _goToHome 对应的组件业务步骤；调用 this._app.getManager, this._app.cameraScripts.goToSystem, Manager.navigate。
   * 调用线索：routerManager.navigate、this._app.cameraScripts.goToSystem、this._app.getManager。
   */
  _goToHome() {
    const routerManager = this._app.getManager("router");
    "/home" === routerManager.currentRoute.url ? this._app.cameraScripts.goToSystem("inner_solar_system") : routerManager.navigate({
      __remove: "all"
    }, "/home");
  }
  /** @eyes-analysis
   * 执行 _getCrumbText 对应的组件业务步骤；调用 this._app.getManager。
   * 调用线索：this._app.getManager、this._app.getManager("content").getEntityInfo、this._app.getManager("content").getStoryList。
   */
  _getCrumbText(t) {
    if (this._crumbTexts[t]) return this._crumbTexts[t];
    const e = this._app.getManager("content").getEntityInfo([t]);
    if (e) return e.displayName || e.iauName;
    const i = this._app.getManager("content").events[t];
    if (i) return i.title;
    const s = this._app.getManager("content").getStoryList().stories[t];
    return s ? s.title : "";
  }
  /** @eyes-analysis
   * 执行 _createCrumb 对应的组件业务步骤；调用 this._app.getManager, this._onCrumbClick, this._getCrumbText。
   * 调用线索：document.createElement、i.addEventListener、i.appendChild、this._app.getManager、this._getCrumbText等。
   */
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
