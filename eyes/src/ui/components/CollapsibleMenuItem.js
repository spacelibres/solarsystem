// Recovered from app.js:1628109-1630011.
import * as Eyes from "../../framework/eyes/index.js";
import "../../styles/extracted/CollapsibleMenuItemStyles.js";
import CollapsibleMenuItemTemplate from "../templates/CollapsibleMenuItemTemplate.html";
var getCollapsibleMenuItemTemplate = () => CollapsibleMenuItemTemplate;
/* 子组件 DOM 移入本项容器，同时记录 _cMenuParent 供视图访问；展开事件先发出，再更新本项状态、子组件可见性和尺寸。 */
class CollapsibleMenuItem extends Eyes.BaseComponent {
  constructor(app, parentComponent, options = {}) {
    super(app, null, {
      isExpanded: false,
      expandedClass: "collapsed",
      collapseBtnVisibleClass: "hidden",
      itemTitle: "",
      ...options
    });
    this._parentComponent = parentComponent;
    this._components = [];
    this._eventNames.push("expandtoggle");
    this._initCallbacks();
  }
  init() {
    super.init();
    const {
      collapseButton: collapseButton
    } = this._children;
    const {
      itemTitle: itemTitle,
      isExpanded: isExpanded
    } = this._state;
    collapseButton.setAttribute("aria-label", `${isExpanded ? "Collapse" : "Expand"} ${itemTitle.toLowerCase()}`);
    const {
      width: width
    } = this._config;
    this._element.style.setProperty("--container-width", `clamp(${width.min}px, 100%, ${width.max}px)`);
    this._setContainerHeight(isExpanded);
    this._setToggleAriaLabel(isExpanded);
  }
  addComponent(component, followEnabledState = false) {
    this._components.push(component);
    followEnabledState && component.registerCallback("statuschange", isEnabled => {
      isEnabled ? this.show() : this.hide();
    });
    component._cMenuParent = this;
    const {
      componentContainer: componentContainer
    } = this._children;
    component.setParent(componentContainer);
    componentContainer.appendChild(component.element);
  }
  onToggleClick() {
    const {
      isExpanded: isExpanded
    } = this._state;
    const shouldExpand = !isExpanded;
    this.setExpanded(shouldExpand);
  }
  onCollapseClick() {
    this.setExpanded(false);
  }
  _setToggleAriaLabel(isExpanded) {
    const {
      toggleButton: toggleButton
    } = this._children;
    const {
      itemTitle: itemTitle
    } = this._state;
    const actionLabel = isExpanded ? "Collapse" : "Expand";
    toggleButton.setAttribute("aria-label", `${actionLabel} ${itemTitle.toLowerCase()}`);
  }
  setExpanded(isExpanded) {
    this.triggerCallbacks("expandtoggle", [isExpanded, this]);
    isExpanded !== this._state.isExpanded && (this.setState({
      isExpanded: isExpanded,
      expandedClass: isExpanded ? "expanded" : "collapsed",
      collapseBtnVisibleClass: isExpanded ? "" : "hidden"
    }), this._setToggleAriaLabel(isExpanded), isExpanded ? this._components.forEach(component => component.show()) : this._components.forEach(component => component.hide()), this._setContainerHeight(isExpanded));
  }
  _setContainerHeight(isExpanded) {
    const {
      height: height
    } = this._config;
    const heightPixels = isExpanded ? height.max : height.min;
    this._element.style.setProperty("--container-height", `${heightPixels}px`);
    height.active && this._element.style.setProperty("--container-height-active", `${height.active}px`);
  }
  get parentComponent() {
    return this._parentComponent;
  }
}
CollapsibleMenuItem.html = getCollapsibleMenuItemTemplate();
export { CollapsibleMenuItem };
