/** @eyes-analysis
 * 文件职责：组件模板、状态绑定、DOM 挂载和回调订阅的共同基类
 * 依据：imports: ../../framework/eyes/public-api.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:547760-555898.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
/** @eyes-analysis
 * 类职责：组件模板、状态绑定、DOM 挂载和回调订阅的共同基类
 * 继承：无显式父类；导出：BaseComponent。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class BaseComponent {
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 状态写入：_app、_callbackRegistry、_callbacks、_children、_class、_components、_config、_config.hiddenMode等；完整记录见索引。
   * 调用线索：this._initCallbacks、this.bindFunctions。
   */
  constructor(app, element, i = {
    parent: null,
    config: {},
    params: {},
    isVisible: true
  }) {
    this._element = element;
    this._app = app;
    this._config = i.config || {};
    delete i.config;
    "hiddenMode" in this._config || (this._config.hiddenMode = "hidden");
    this._params = i.params || {};
    delete i.params;
    "isVisible" in i || (i.isVisible = false);
    this._class = {
      isVisible: {
        true: "active",
        false: "hidden" === this._config.hiddenMode ? "hidden" : "invisible"
      },
      fontSize: {
        small: "small",
        default: "",
        large: ""
      }
    };
    this._state = {
      ...i,
      isVisibleClass: this._class.isVisible[i.isVisible ? "true" : "false"],
      fontSizeClass: this._class.fontSize.default
    };
    this._oldState = {};
    this._children = {};
    this._components = [];
    this._vars = {};
    this._parent = this._element ? this._element.parentElement : i.parent || null;
    this._enabled = false;
    this._eventNames = ["statuschange", "visiblechange"];
    this._callbacks = {};
    this._initCallbacks();
    this._callbackRegistry = [];
    this._resizeTimeout = null;
    this._resizeTimeoutAmount = 0;
    this.bindFunctions(["resize", "isEnabled", "setEnabled", "show", "hide", "toggle", "loadHTML", "getState", "setState"]);
  }
  /** @eyes-analysis
   * 执行 components 对应的组件业务步骤。
   */
  get components() {
    return this._components;
  }
  /** @eyes-analysis
   * 执行 app 对应的组件业务步骤。
   */
  get app() {
    return this._app;
  }
  /** @eyes-analysis
   * 重排响应式界面；调用 this._updateFontSize。
   * 调用线索：this._updateFontSize。
   */
  resize() {
    this._updateFontSize();
  }
  /** @eyes-analysis
   * 执行 _updateFontSize 对应的组件业务步骤；调用 EyesPublicApi.AppUtils.isMobile, EyesPublicApi.AppUtils.isTablet, EyesPublicApi.AppUtils.isPanorama, EyesPublicApi.AppUtils.is2K, EyesPublicApi.AppUtils.is4K, this.setState。
   * 调用线索：EyesPublicApi.AppUtils.is2K、EyesPublicApi.AppUtils.is4K、EyesPublicApi.AppUtils.isMobile、EyesPublicApi.AppUtils.isPanorama、EyesPublicApi.AppUtils.isTablet等。
   */
  _updateFontSize() {
    let t = this._class.fontSize.default;
    EyesPublicApi.AppUtils.isMobile() ? t = this._class.fontSize.small : EyesPublicApi.AppUtils.isTablet() || EyesPublicApi.AppUtils.isPanorama() ? t = this._class.fontSize.default : (EyesPublicApi.AppUtils.is2K() || EyesPublicApi.AppUtils.is4K()) && (t = this._class.fontSize.large);
    this.setState({
      fontSizeClass: t
    });
  }
  /** @eyes-analysis
   * 执行 element 对应的组件业务步骤。
   */
  get element() {
    return this._element;
  }
  /** @eyes-analysis
   * 执行 getParent 对应的组件业务步骤。
   */
  getParent() {
    return this._parent;
  }
  /** @eyes-analysis
   * 执行 setParent 对应的组件业务步骤；调用 this._parent.removeChild, this._parent.appendChild；写入 _parent。
   * 状态写入：_parent。
   * 调用线索：this._parent.appendChild、this._parent.removeChild。
   */
  setParent(parent, e = null) {
    this._parent = parent;
    e && this._parent.removeChild(e);
    this._enabled && this._parent.appendChild(this._element);
  }
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 Object.assign, EyesPublicApi.AppUtils.htmlWithParamsToElement, this._element.classList.add, this._setVariables, this._setEventHandlersFromAttributes, this._updateFontSize；写入 _element。
   * 状态写入：_element。
   * 调用线索：EyesPublicApi.AppUtils.htmlWithParamsToElement、Object.assign、this._element.classList.add、this._setEventHandlersFromAttributes、this._setVariables等。
   */
  async init(t = {}) {
    Object.assign(this._params, t);
    const constructor = this.constructor;
    void 0 !== constructor.html ? (this._element = EyesPublicApi.AppUtils.htmlWithParamsToElement(constructor.html, this._params), this._element.classList.add("{{fontSizeClass}}"), this._setVariables(this._element), this._setEventHandlersFromAttributes(this._element)) : (this._element.classList.add("{{fontSizeClass}}"), this._setVariables(this._element));
    this._updateFontSize();
  }
  /** @eyes-analysis
   * 执行 getConfig 对应的组件业务步骤。
   */
  getConfig() {
    return this._config;
  }
  /** @eyes-analysis
   * 执行 setConfig 对应的组件业务步骤；调用 Object.assign。
   * 调用线索：Object.assign。
   */
  setConfig(t) {
    Object.assign(this._config, t);
  }
  /** @eyes-analysis
   * 执行 bindFunctions 对应的组件业务步骤。
   * 调用线索：e[s].bind。
   */
  bindFunctions(t = []) {
    const e = this;
    for (let i = 0; i < t.length; i++) {
      const s = t[i];
      e[s] = e[s].bind(this);
    }
  }
  /** @eyes-analysis
   * 执行 isEnabled 对应的组件业务步骤。
   */
  isEnabled() {
    return this._enabled;
  }
  /** @eyes-analysis
   * 切换当前组件及其子组件的启用状态；调用 this.__enable, this.__disable, this._components.forEach, this._app.getComponent；写入 _enabled。
   * 状态写入：_enabled。
   * 调用线索：("string"==typeof e?this._app.getComponent(e):e).setEnabled、this.__disable、this.__enable、this._app.getComponent、this._components.forEach。
   */
  setEnabled(t) {
    const enabled = this._enabled;
    t && !enabled ? this.__enable() : !t && enabled && this.__disable();
    this._enabled = t;
    this._components.forEach(e => {
      ("string" == typeof e ? this._app.getComponent(e) : e).setEnabled(t);
    });
  }
  /** @eyes-analysis
   * 执行 destroy 对应的组件业务步骤；调用 this.__destroy。
   * 调用线索：this.__destroy。
   */
  destroy() {
    this.__destroy();
  }
  /** @eyes-analysis
   * 执行 show 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
   * 调用线索：this.setState、this.triggerCallbacks。
   */
  show() {
    this.setState({
      isVisible: true,
      isVisibleClass: this._class.isVisible.true
    }, () => this.triggerCallbacks("visiblechange", [true]));
  }
  /** @eyes-analysis
   * 执行 hide 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
   * 调用线索：this.setState、this.triggerCallbacks。
   */
  hide() {
    this.setState({
      isVisible: false,
      isVisibleClass: this._class.isVisible.false
    }, () => this.triggerCallbacks("visiblechange", [false]));
  }
  /** @eyes-analysis
   * 执行 toggle 对应的组件业务步骤；调用 this.hide, this.show。
   * 调用线索：this.hide、this.show。
   */
  toggle() {
    this._state.isVisible ? this.hide() : this.show();
  }
  /** @eyes-analysis
   * 执行 loadHTML 对应的组件业务步骤；调用 this._parseHTML。
   * 调用线索：console.error、fetch、i.text、this._parseHTML。
   */
  async loadHTML(t, e = null) {
    const i = await fetch(t);
    if (i.ok) {
      const t = await i.text();
      this._parseHTML(t, e);
    } else console.error(i.status + ": " + i.statusText);
  }
  /** @eyes-analysis
   * 读取已登记状态键。
   */
  getState(t) {
    return t in this._state ? this._state[t] : null;
  }
  /** @eyes-analysis
   * 执行 addState 对应的组件业务步骤；调用 this._setVariables。
   * 状态写入：_state[t]。
   * 调用线索：this._setVariables。
   */
  addState(t, e, i) {
    this._state[t] = e;
    i && this._setVariables(i);
  }
  /** @eyes-analysis
   * 合并变化状态并更新对应 DOM 绑定；调用 EyesPublicApi.AppUtils.isEmptyObject, this._render；写入 _oldState, _state。
   * 状态写入：_oldState、_state。
   * 调用线索：EyesPublicApi.AppUtils.isEmptyObject、e、this._render。
   */
  setState(t, e) {
    if (EyesPublicApi.AppUtils.isEmptyObject(t)) return;
    let i = false;
    for (const e in t) if (t[e] !== this._state[e]) {
      i = true;
      break;
    }
    i && (this._oldState = {
      ...this._state
    }, this._state = {
      ...this._state,
      ...t
    }, this._render(t), void 0 !== e && e());
  }
  /** @eyes-analysis
   * 执行 _parseHTML 对应的组件业务步骤；调用 EyesPublicApi.AppUtils.htmlToElements, this._setVariables, this._setEventHandlersFromAttributes；写入 _roots。
   * 状态写入：_roots。
   * 调用线索：EyesPublicApi.AppUtils.htmlToElements、document.createDocumentFragment、i.appendChild、n.appendChild、this._setEventHandlersFromAttributes等。
   */
  _parseHTML(t, e = null) {
    if (!t) return;
    const i = e || this._element;
    this._roots = [...EyesPublicApi.AppUtils.htmlToElements(t)];
    const n = document.createDocumentFragment();
    for (let t = 0; t < this._roots.length; t++) {
      const e = this._roots[t];
      e instanceof HTMLElement && (this._setVariables(e), this._setEventHandlersFromAttributes(e), n.appendChild(e));
    }
    i.appendChild(n);
  }
  /** @eyes-analysis
   * 执行 _containVar 对应的组件业务步骤。
   * 调用线索：t.includes。
   */
  _containVar(t) {
    return t && "function" == typeof t.includes && t.includes("{{") && t.includes("}}");
  }
  /** @eyes-analysis
   * 执行 _splitNonEmpty 对应的组件业务步骤。
   * 调用线索：t.split、t.split(/\s+/g).filter。
   */
  _splitNonEmpty(t) {
    return t.split(/\s+/g).filter(t => "" !== t);
  }
  /** @eyes-analysis
   * 扫描 key 与双花括号占位符，建立 DOM 状态索引；调用 this._containVar, Var.startsWith, Var.endsWith, Var.replace, List.remove, this._splitNonEmpty, List.add, EyesPublicApi.AppUtils.isHTML, EyesPublicApi.AppUtils.htmlToElement, Node.replaceChild, EyesPublicApi.AppUtils.hasHTML, this._setVariables。
   * 状态写入：_children[i.value]、_vars[e]。
   * 调用线索：(t.parentElement||t.parentNode).replaceChild、EyesPublicApi.AppUtils.hasHTML、EyesPublicApi.AppUtils.htmlToElement、EyesPublicApi.AppUtils.isHTML、document.createElement等。
   */
  _setVariables(t, e = true) {
    let i;
    if (t instanceof Element) for (let e = t.attributes.length - 1; e >= 0; e--) {
      const i = t.attributes[e];
      if ("key" === i.name) {
        this._children[i.value] = t;
        break;
      }
    }
    const n = [];
    if (t.nodeType === Node.TEXT_NODE) this._containVar(t.nodeValue) && n.push({
      field: "nodeValue",
      elementVar: t.nodeValue
    });else if (t instanceof Element) {
      let e = t.className;
      for (; this._containVar(e);) {
        const t = e.indexOf("}}") + 2;
        n.push({
          field: "classList",
          elementVar: e.substring(e.indexOf("{{"), t)
        });
        e = e.substring(t);
      }
    }
    for (let e = 0; e < n.length; e++) {
      let {
        field: field,
        elementVar: elementVar
      } = n[e];
      if (field && elementVar.startsWith("{{") && elementVar.endsWith("}}")) {
        const e = elementVar.replace("{{", "").replace("}}", "");
        if ("classList" === field && t instanceof Element) {
          t.classList.remove(elementVar);
          const i = this._state[e];
          if (void 0 !== i) {
            const e = this._splitNonEmpty(i);
            t.classList.add(...e);
          }
        } else if (EyesPublicApi.AppUtils.isHTML(this._state[e])) {
          const n = EyesPublicApi.AppUtils.htmlToElement(this._state[e]);
          t.parentNode.replaceChild(n, t);
          i = n;
        } else if (EyesPublicApi.AppUtils.hasHTML(this._state[e])) {
          if (t.nodeType === Node.TEXT_NODE) {
            const s = document.createElement("span");
            s.innerHTML = this._state[e];
            (t.parentElement || t.parentNode).replaceChild(s, t);
            i = s;
            field = "innerHTML";
          } else t.innerHTML = this._state[e];
        } else {
          t[field] = this._state[e];
        }
        void 0 === this._vars[e] && (this._vars[e] = []);
        this._vars[e].push({
          element: i || t,
          field: field
        });
      }
    }
    if (e) for (let e = t.childNodes.length - 1; e >= 0; e--) this._setVariables(t.childNodes[e]);
  }
  /** @eyes-analysis
   * 把模板 on* 属性解析为绑定当前实例的事件监听器；调用 this._setEventHandlersFromAttributes。
   * 调用线索：e.push、n.bind、new Error、s.name.startsWith、s.name.substring等。
   */
  _setEventHandlersFromAttributes(t) {
    const e = [];
    for (let i = t.attributes.length - 1; i >= 0; i--) {
      const s = t.attributes[i];
      if (s.name.startsWith("on")) {
        const i = s.name.substring(2).toLowerCase();
        const n = this[s.value];
        if (void 0 === n || !(n instanceof Function)) throw new Error("Could not find valid " + i + " handler " + s.value + " for element with id " + t.id);
        const o = n.bind(this);
        e.push(s.name);
        t.addEventListener(i, o);
      }
    }
    for (let i = e.length - 1; i >= 0; i--) t.removeAttribute(e[i]);
    for (let e = t.children.length - 1; e >= 0; e--) this._setEventHandlersFromAttributes(t.children[e]);
  }
  /** @eyes-analysis
   * 将变化的状态写到文本、HTML 或 classList 绑定；调用 Object.keys, this._splitNonEmpty, EyesPublicApi.AppUtils.isHTML, EyesPublicApi.AppUtils.htmlToElement, Node.replaceChild, EyesPublicApi.AppUtils.hasHTML。
   * 状态写入：_vars[n][i].element、_vars[n][i].field。
   * 调用线索：(element.parentElement||element.parentNode).replaceChild、EyesPublicApi.AppUtils.hasHTML、EyesPublicApi.AppUtils.htmlToElement、EyesPublicApi.AppUtils.isHTML、Object.keys等。
   */
  _render(t) {
    const e = Object.keys(t);
    for (let i = e.length - 1; i >= 0; i--) {
      const n = e[i];
      if (n in this._vars && t[n] !== this._oldState[n]) {
        const e = this._vars[n];
        for (let i = 0; i < e.length; i++) {
          const {
            field: field,
            element: element
          } = e[i];
          if ("classList" === field) {
            let e = this._splitNonEmpty(this._oldState[n]);
            const i = element;
            i[field].remove(...e);
            e = this._splitNonEmpty(t[n]);
            i[field].add(...e);
          } else if (EyesPublicApi.AppUtils.isHTML(t[n])) {
            const e = EyesPublicApi.AppUtils.htmlToElement(t[n]);
            element.parentNode.replaceChild(e, element);
            this._vars[n][i].element = e;
          } else if (EyesPublicApi.AppUtils.hasHTML(t[n])) {
            if (element.nodeType === Node.TEXT_NODE) {
              const e = document.createElement("span");
              e.innerHTML = t[n];
              (element.parentElement || element.parentNode).replaceChild(e, element);
              this._vars[n][i].element = e;
              this._vars[n][i].field = "innerHTML";
            } else element.innerHTML = t[n];
          } else {
            element[field] = t[n];
          }
        }
      }
    }
  }
  /** @eyes-analysis
   * 挂载 DOM 并登记窗口和业务订阅；调用 this.registerCallbacks, this._parent.appendChild, this.triggerCallbacks；写入 _resizeTimeout。
   * 状态写入：_resizeTimeout。
   * 调用线索：clearTimeout、setTimeout、this._parent.appendChild、this.registerCallbacks、this.triggerCallbacks等。
   */
  __enable() {
    window.addEventListener("resize", () => {
      clearTimeout(this._resizeTimeout);
      this._resizeTimeout = setTimeout(this.resize, this._resizeTimeoutAmount);
    }, false);
    this.registerCallbacks();
    this._parent && (this._parent.appendChild(this._element), this.triggerCallbacks("statuschange", [true, this]));
  }
  /** @eyes-analysis
   * 卸载 DOM 并取消业务订阅；调用 this._parent.contains, this.triggerCallbacks, this._parent.removeChild, this.removeCallbacks；写入 _element。
   * 状态写入：_element。
   * 调用线索：clearTimeout、this._parent.contains、this._parent.removeChild、this.removeCallbacks、this.triggerCallbacks等。
   */
  __disable() {
    clearTimeout(this._resizeTimeout);
    this._parent && this._parent.contains(this._element) && (this.triggerCallbacks("statuschange", [false, this]), this._element = this._parent.removeChild(this._element));
    window.removeEventListener("resize", this.resize);
    this.removeCallbacks();
  }
  /** @eyes-analysis
   * 执行停用并释放根节点和父节点引用；调用 this.__disable；写入 _element, _parent。
   * 状态写入：_element、_parent。
   * 调用线索：this.__disable。
   */
  __destroy() {
    this.__disable();
    this._element = null;
    this._parent = null;
  }
  /** @eyes-analysis
   * 执行 _initCallbacks 对应的组件业务步骤。
   * 状态写入：_callbacks[this._eventNames[t]]。
   */
  _initCallbacks() {
    for (let t = 0; t < this._eventNames.length; t++) this._callbacks[this._eventNames[t]] = [];
  }
  /** @eyes-analysis
   * 执行 registerCallback 对应的组件业务步骤；调用 this._eventNames.indexOf。
   * 调用线索：this._callbacks[t].includes、this._callbacks[t].push、this._eventNames.indexOf。
   */
  registerCallback(t, e) {
    "function" != typeof e || this._eventNames.indexOf(t) < 0 || this._callbacks[t].includes(e) || this._callbacks[t].push(e);
  }
  /** @eyes-analysis
   * 执行 removeCallback 对应的组件业务步骤；调用 this._eventNames.indexOf。
   * 调用线索：this._callbacks[t].indexOf、this._callbacks[t].splice、this._eventNames.indexOf。
   */
  removeCallback(t, e) {
    if ("function" != typeof e || this._eventNames.indexOf(t) < 0) return;
    const i = this._callbacks[t].indexOf(e);
    i > -1 && this._callbacks[t].splice(i, 1);
  }
  /** @eyes-analysis
   * 执行 triggerCallbacks 对应的组件业务步骤。
   * 调用线索：0,this._callbacks[t][i]。
   */
  triggerCallbacks(t, e = []) {
    for (let i = this._callbacks[t].length - 1; i >= 0; i--) {
      (0, this._callbacks[t][i])(...e);
    }
  }
  /** @eyes-analysis
   * 登记跨组件或管理器事件订阅。
   * 调用线索：emitter.registerCallback。
   */
  registerCallbacks() {
    for (let t = 0; t < this._callbackRegistry.length; t++) {
      const {
        emitter: emitter,
        event: event,
        callback: callback
      } = this._callbackRegistry[t];
      emitter.registerCallback(event, callback);
    }
  }
  /** @eyes-analysis
   * 移除本模块登记的事件订阅。
   * 调用线索：emitter.removeCallback。
   */
  removeCallbacks() {
    for (let t = 0; t < this._callbackRegistry.length; t++) {
      const {
        emitter: emitter,
        event: event,
        callback: callback
      } = this._callbackRegistry[t];
      emitter.removeCallback(event, callback);
    }
  }
}
BaseComponent.create = async (t, e, i, s = true, n = [], o = {}) => {
  const r = s ? await t.addComponentWithPlaceholder({
    type: i,
    name: e,
    args: n,
    options: o
  }) : await t.addComponent(e, i, ...n, o);
  i.postCreationFunction && i.postCreationFunction(t, r);
  return r;
};
BaseComponent.html = void 0;
BaseComponent.postCreationFunction = void 0;
export { BaseComponent };
