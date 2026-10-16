// Recovered from app.js:547760-555898.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
class BaseComponent {
  // config 与 params 被取出后从传入对象删除，剩余选项进入状态。保留这项调用方可观察到的修改，避免去混淆顺带改变构造契约。
  constructor(app, element, initialOptions = {
    parent: null,
    config: {},
    params: {},
    isVisible: true
  }) {
    this._element = element;
    this._app = app;
    this._config = initialOptions.config || {};
    delete initialOptions.config;
    "hiddenMode" in this._config || (this._config.hiddenMode = "hidden");
    this._params = initialOptions.params || {};
    delete initialOptions.params;
    "isVisible" in initialOptions || (initialOptions.isVisible = false);
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
      ...initialOptions,
      isVisibleClass: this._class.isVisible[initialOptions.isVisible ? "true" : "false"],
      fontSizeClass: this._class.fontSize.default
    };
    this._oldState = {};
    this._children = {};
    this._components = [];
    this._vars = {};
    this._parent = this._element ? this._element.parentElement : initialOptions.parent || null;
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
    let fontSizeClass = this._class.fontSize.default;
    EyesPublicApi.AppUtils.isMobile() ? fontSizeClass = this._class.fontSize.small : EyesPublicApi.AppUtils.isTablet() || EyesPublicApi.AppUtils.isPanorama() ? fontSizeClass = this._class.fontSize.default : (EyesPublicApi.AppUtils.is2K() || EyesPublicApi.AppUtils.is4K()) && (fontSizeClass = this._class.fontSize.large);
    this.setState({
      fontSizeClass: fontSizeClass
    });
  }
  get element() {
    return this._element;
  }
  getParent() {
    return this._parent;
  }
  setParent(parent, replacedElement = null) {
    this._parent = parent;
    replacedElement && this._parent.removeChild(replacedElement);
    this._enabled && this._parent.appendChild(this._element);
  }
  async init(templateParams = {}) {
    Object.assign(this._params, templateParams);
    const constructor = this.constructor;
    void 0 !== constructor.html ? (this._element = EyesPublicApi.AppUtils.htmlWithParamsToElement(constructor.html, this._params), this._element.classList.add("{{fontSizeClass}}"), this._setVariables(this._element), this._setEventHandlersFromAttributes(this._element)) : (this._element.classList.add("{{fontSizeClass}}"), this._setVariables(this._element));
    this._updateFontSize();
  }
  getConfig() {
    return this._config;
  }
  setConfig(configUpdates) {
    Object.assign(this._config, configUpdates);
  }
  bindFunctions(methodNames = []) {
    const component = this;
    for (let methodIndex = 0; methodIndex < methodNames.length; methodIndex++) {
      const methodName = methodNames[methodIndex];
      component[methodName] = component[methodName].bind(this);
    }
  }
  isEnabled() {
    return this._enabled;
  }
  setEnabled(shouldEnable) {
    const enabled = this._enabled;
    shouldEnable && !enabled ? this.__enable() : !shouldEnable && enabled && this.__disable();
    this._enabled = shouldEnable;
    this._components.forEach(childComponent => {
      ("string" == typeof childComponent ? this._app.getComponent(childComponent) : childComponent).setEnabled(shouldEnable);
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
  async loadHTML(templateUrl, parentElement = null) {
    const response = await fetch(templateUrl);
    if (response.ok) {
      const templateHtml = await response.text();
      this._parseHTML(templateHtml, parentElement);
    } else console.error(response.status + ": " + response.statusText);
  }
  getState(stateKey) {
    return stateKey in this._state ? this._state[stateKey] : null;
  }
  addState(stateKey, initialValue, rootElement) {
    this._state[stateKey] = initialValue;
    rootElement && this._setVariables(rootElement);
  }
  // 只在至少一项值变化时保存旧状态、渲染并回调；相同值不会触发 onRendered。DOM 绑定由本组件持有，子组件启用状态另由 setEnabled 传播。
  setState(stateUpdates, onRendered) {
    if (EyesPublicApi.AppUtils.isEmptyObject(stateUpdates)) return;
    let hasChanges = false;
    for (const stateKey in stateUpdates) if (stateUpdates[stateKey] !== this._state[stateKey]) {
      hasChanges = true;
      break;
    }
    hasChanges && (this._oldState = {
      ...this._state
    }, this._state = {
      ...this._state,
      ...stateUpdates
    }, this._render(stateUpdates), void 0 !== onRendered && onRendered());
  }
  _parseHTML(templateHtml, parentElement = null) {
    if (!templateHtml) return;
    const destinationElement = parentElement || this._element;
    this._roots = [...EyesPublicApi.AppUtils.htmlToElements(templateHtml)];
    const fragment = document.createDocumentFragment();
    for (let rootIndex = 0; rootIndex < this._roots.length; rootIndex++) {
      const rootElement = this._roots[rootIndex];
      rootElement instanceof HTMLElement && (this._setVariables(rootElement), this._setEventHandlersFromAttributes(rootElement), fragment.appendChild(rootElement));
    }
    destinationElement.appendChild(fragment);
  }
  _containVar(text) {
    return text && "function" == typeof text.includes && text.includes("{{") && text.includes("}}");
  }
  _splitNonEmpty(text) {
    return text.split(/\s+/g).filter(token => "" !== token);
  }
  // 文本占位符可能替换成 HTML 元素，因此绑定保存实际替换后的节点；后续渲染必须更新同一份绑定引用。倒序遍历避免节点替换影响尚未访问的兄弟。
  _setVariables(node, includeChildren = true) {
    let replacementElement;
    if (node instanceof Element) for (let attributeIndex = node.attributes.length - 1; attributeIndex >= 0; attributeIndex--) {
      const attribute = node.attributes[attributeIndex];
      if ("key" === attribute.name) {
        this._children[attribute.value] = node;
        break;
      }
    }
    const placeholders = [];
    if (node.nodeType === Node.TEXT_NODE) this._containVar(node.nodeValue) && placeholders.push({
      field: "nodeValue",
      elementVar: node.nodeValue
    });else if (node instanceof Element) {
      let remainingClasses = node.className;
      for (; this._containVar(remainingClasses);) {
        const placeholderEnd = remainingClasses.indexOf("}}") + 2;
        placeholders.push({
          field: "classList",
          elementVar: remainingClasses.substring(remainingClasses.indexOf("{{"), placeholderEnd)
        });
        remainingClasses = remainingClasses.substring(placeholderEnd);
      }
    }
    for (let placeholderIndex = 0; placeholderIndex < placeholders.length; placeholderIndex++) {
      let {
        field: field,
        elementVar: elementVar
      } = placeholders[placeholderIndex];
      if (field && elementVar.startsWith("{{") && elementVar.endsWith("}}")) {
        const stateKey = elementVar.replace("{{", "").replace("}}", "");
        if ("classList" === field && node instanceof Element) {
          node.classList.remove(elementVar);
          const classValue = this._state[stateKey];
          if (void 0 !== classValue) {
            const classNames = this._splitNonEmpty(classValue);
            node.classList.add(...classNames);
          }
        } else if (EyesPublicApi.AppUtils.isHTML(this._state[stateKey])) {
          const htmlElement = EyesPublicApi.AppUtils.htmlToElement(this._state[stateKey]);
          node.parentNode.replaceChild(htmlElement, node);
          replacementElement = htmlElement;
        } else if (EyesPublicApi.AppUtils.hasHTML(this._state[stateKey])) {
          if (node.nodeType === Node.TEXT_NODE) {
            const htmlWrapper = document.createElement("span");
            htmlWrapper.innerHTML = this._state[stateKey];
            (node.parentElement || node.parentNode).replaceChild(htmlWrapper, node);
            replacementElement = htmlWrapper;
            field = "innerHTML";
          } else node.innerHTML = this._state[stateKey];
        } else {
          node[field] = this._state[stateKey];
        }
        void 0 === this._vars[stateKey] && (this._vars[stateKey] = []);
        this._vars[stateKey].push({
          element: replacementElement || node,
          field: field
        });
      }
    }
    if (includeChildren) for (let childIndex = node.childNodes.length - 1; childIndex >= 0; childIndex--) this._setVariables(node.childNodes[childIndex]);
  }
  _setEventHandlersFromAttributes(element) {
    const eventAttributeNames = [];
    for (let attributeIndex = element.attributes.length - 1; attributeIndex >= 0; attributeIndex--) {
      const attribute = element.attributes[attributeIndex];
      if (attribute.name.startsWith("on")) {
        const eventName = attribute.name.substring(2).toLowerCase();
        const handler = this[attribute.value];
        if (void 0 === handler || !(handler instanceof Function)) throw new Error("Could not find valid " + eventName + " handler " + attribute.value + " for element with id " + element.id);
        const boundHandler = handler.bind(this);
        eventAttributeNames.push(attribute.name);
        element.addEventListener(eventName, boundHandler);
      }
    }
    for (let attributeIndex = eventAttributeNames.length - 1; attributeIndex >= 0; attributeIndex--) element.removeAttribute(eventAttributeNames[attributeIndex]);
    for (let childIndex = element.children.length - 1; childIndex >= 0; childIndex--) this._setEventHandlersFromAttributes(element.children[childIndex]);
  }
  _render(stateUpdates) {
    const changedKeys = Object.keys(stateUpdates);
    for (let keyIndex = changedKeys.length - 1; keyIndex >= 0; keyIndex--) {
      const stateKey = changedKeys[keyIndex];
      if (stateKey in this._vars && stateUpdates[stateKey] !== this._oldState[stateKey]) {
        const bindings = this._vars[stateKey];
        for (let bindingIndex = 0; bindingIndex < bindings.length; bindingIndex++) {
          const {
            field: field,
            element: element
          } = bindings[bindingIndex];
          if ("classList" === field) {
            let classNames = this._splitNonEmpty(this._oldState[stateKey]);
            const boundElement = element;
            boundElement[field].remove(...classNames);
            classNames = this._splitNonEmpty(stateUpdates[stateKey]);
            boundElement[field].add(...classNames);
          } else if (EyesPublicApi.AppUtils.isHTML(stateUpdates[stateKey])) {
            const htmlElement = EyesPublicApi.AppUtils.htmlToElement(stateUpdates[stateKey]);
            element.parentNode.replaceChild(htmlElement, element);
            this._vars[stateKey][bindingIndex].element = htmlElement;
          } else if (EyesPublicApi.AppUtils.hasHTML(stateUpdates[stateKey])) {
            if (element.nodeType === Node.TEXT_NODE) {
              const htmlWrapper = document.createElement("span");
              htmlWrapper.innerHTML = stateUpdates[stateKey];
              (element.parentElement || element.parentNode).replaceChild(htmlWrapper, element);
              this._vars[stateKey][bindingIndex].element = htmlWrapper;
              this._vars[stateKey][bindingIndex].field = "innerHTML";
            } else element.innerHTML = stateUpdates[stateKey];
          } else {
            element[field] = stateUpdates[stateKey];
          }
        }
      }
    }
  }
  // 启用时挂载本组件根节点并注册业务订阅。原实现用匿名 resize 包装器监听窗口，停用时移除的却是 this.resize；此处仅说明现状，不夹带监听器修复。
  __enable() {
    window.addEventListener("resize", () => {
      clearTimeout(this._resizeTimeout);
      this._resizeTimeout = setTimeout(this.resize, this._resizeTimeoutAmount);
    }, false);
    this.registerCallbacks();
    this._parent && (this._parent.appendChild(this._element), this.triggerCallbacks("statuschange", [true, this]));
  }
  // 停用会取消待执行的尺寸更新、卸载根节点并解除登记的业务订阅；根节点引用保留供下一次启用复用。
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
    for (let eventIndex = 0; eventIndex < this._eventNames.length; eventIndex++) this._callbacks[this._eventNames[eventIndex]] = [];
  }
  registerCallback(eventName, callback) {
    "function" != typeof callback || this._eventNames.indexOf(eventName) < 0 || this._callbacks[eventName].includes(callback) || this._callbacks[eventName].push(callback);
  }
  removeCallback(eventName, callback) {
    if ("function" != typeof callback || this._eventNames.indexOf(eventName) < 0) return;
    const callbackIndex = this._callbacks[eventName].indexOf(callback);
    callbackIndex > -1 && this._callbacks[eventName].splice(callbackIndex, 1);
  }
  triggerCallbacks(eventName, callbackArgs = []) {
    for (let callbackIndex = this._callbacks[eventName].length - 1; callbackIndex >= 0; callbackIndex--) {
      (0, this._callbacks[eventName][callbackIndex])(...callbackArgs);
    }
  }
  registerCallbacks() {
    for (let subscriptionIndex = 0; subscriptionIndex < this._callbackRegistry.length; subscriptionIndex++) {
      const {
        emitter: emitter,
        event: event,
        callback: callback
      } = this._callbackRegistry[subscriptionIndex];
      emitter.registerCallback(event, callback);
    }
  }
  removeCallbacks() {
    for (let subscriptionIndex = 0; subscriptionIndex < this._callbackRegistry.length; subscriptionIndex++) {
      const {
        emitter: emitter,
        event: event,
        callback: callback
      } = this._callbackRegistry[subscriptionIndex];
      emitter.removeCallback(event, callback);
    }
  }
}
BaseComponent.create = async (app, componentName, ComponentClass, usePlaceholder = true, constructorArgs = [], options = {}) => {
  const component = usePlaceholder ? await app.addComponentWithPlaceholder({
    type: ComponentClass,
    name: componentName,
    args: constructorArgs,
    options: options
  }) : await app.addComponent(componentName, ComponentClass, ...constructorArgs, options);
  ComponentClass.postCreationFunction && ComponentClass.postCreationFunction(app, component);
  return component;
};
BaseComponent.html = void 0;
BaseComponent.postCreationFunction = void 0;
export { BaseComponent };
