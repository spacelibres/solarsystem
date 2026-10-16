// Recovered from app.js:547760-555898.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
class BaseComponent {
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
  get components() {
    return this._components;
  }
  get app() {
    return this._app;
  }
  resize() {
    this._updateFontSize();
  }
  _updateFontSize() {
    let t = this._class.fontSize.default;
    EyesPublicApi.AppUtils.isMobile() ? t = this._class.fontSize.small : EyesPublicApi.AppUtils.isTablet() || EyesPublicApi.AppUtils.isPanorama() ? t = this._class.fontSize.default : (EyesPublicApi.AppUtils.is2K() || EyesPublicApi.AppUtils.is4K()) && (t = this._class.fontSize.large);
    this.setState({
      fontSizeClass: t
    });
  }
  get element() {
    return this._element;
  }
  getParent() {
    return this._parent;
  }
  setParent(parent, e = null) {
    this._parent = parent;
    e && this._parent.removeChild(e);
    this._enabled && this._parent.appendChild(this._element);
  }
  async init(t = {}) {
    Object.assign(this._params, t);
    const constructor = this.constructor;
    void 0 !== constructor.html ? (this._element = EyesPublicApi.AppUtils.htmlWithParamsToElement(constructor.html, this._params), this._element.classList.add("{{fontSizeClass}}"), this._setVariables(this._element), this._setEventHandlersFromAttributes(this._element)) : (this._element.classList.add("{{fontSizeClass}}"), this._setVariables(this._element));
    this._updateFontSize();
  }
  getConfig() {
    return this._config;
  }
  setConfig(t) {
    Object.assign(this._config, t);
  }
  bindFunctions(t = []) {
    const e = this;
    for (let i = 0; i < t.length; i++) {
      const s = t[i];
      e[s] = e[s].bind(this);
    }
  }
  isEnabled() {
    return this._enabled;
  }
  setEnabled(t) {
    const enabled = this._enabled;
    t && !enabled ? this.__enable() : !t && enabled && this.__disable();
    this._enabled = t;
    this._components.forEach(e => {
      ("string" == typeof e ? this._app.getComponent(e) : e).setEnabled(t);
    });
  }
  destroy() {
    this.__destroy();
  }
  show() {
    this.setState({
      isVisible: true,
      isVisibleClass: this._class.isVisible.true
    }, () => this.triggerCallbacks("visiblechange", [true]));
  }
  hide() {
    this.setState({
      isVisible: false,
      isVisibleClass: this._class.isVisible.false
    }, () => this.triggerCallbacks("visiblechange", [false]));
  }
  toggle() {
    this._state.isVisible ? this.hide() : this.show();
  }
  async loadHTML(t, e = null) {
    const i = await fetch(t);
    if (i.ok) {
      const t = await i.text();
      this._parseHTML(t, e);
    } else console.error(i.status + ": " + i.statusText);
  }
  getState(t) {
    return t in this._state ? this._state[t] : null;
  }
  addState(t, e, i) {
    this._state[t] = e;
    i && this._setVariables(i);
  }
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
  _containVar(t) {
    return t && "function" == typeof t.includes && t.includes("{{") && t.includes("}}");
  }
  _splitNonEmpty(t) {
    return t.split(/\s+/g).filter(t => "" !== t);
  }
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
  __enable() {
    window.addEventListener("resize", () => {
      clearTimeout(this._resizeTimeout);
      this._resizeTimeout = setTimeout(this.resize, this._resizeTimeoutAmount);
    }, false);
    this.registerCallbacks();
    this._parent && (this._parent.appendChild(this._element), this.triggerCallbacks("statuschange", [true, this]));
  }
  __disable() {
    clearTimeout(this._resizeTimeout);
    this._parent && this._parent.contains(this._element) && (this.triggerCallbacks("statuschange", [false, this]), this._element = this._parent.removeChild(this._element));
    window.removeEventListener("resize", this.resize);
    this.removeCallbacks();
  }
  __destroy() {
    this.__disable();
    this._element = null;
    this._parent = null;
  }
  _initCallbacks() {
    for (let t = 0; t < this._eventNames.length; t++) this._callbacks[this._eventNames[t]] = [];
  }
  registerCallback(t, e) {
    "function" != typeof e || this._eventNames.indexOf(t) < 0 || this._callbacks[t].includes(e) || this._callbacks[t].push(e);
  }
  removeCallback(t, e) {
    if ("function" != typeof e || this._eventNames.indexOf(t) < 0) return;
    const i = this._callbacks[t].indexOf(e);
    i > -1 && this._callbacks[t].splice(i, 1);
  }
  triggerCallbacks(t, e = []) {
    for (let i = this._callbacks[t].length - 1; i >= 0; i--) {
      (0, this._callbacks[t][i])(...e);
    }
  }
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
