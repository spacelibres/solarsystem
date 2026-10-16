// Recovered from app.js:1628109-1630011.
import * as Eyes from "../../framework/eyes/index.js";
import "../../styles/extracted/CollapsibleMenuItemStyles.js";
import CollapsibleMenuItemTemplate from "../templates/CollapsibleMenuItemTemplate.html";
var getCollapsibleMenuItemTemplate = () => CollapsibleMenuItemTemplate;
class CollapsibleMenuItem extends Eyes.BaseComponent {
  constructor(t, parentComponent, i = {}) {
    super(t, null, {
      isExpanded: false,
      expandedClass: "collapsed",
      collapseBtnVisibleClass: "hidden",
      itemTitle: "",
      ...i
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
  addComponent(t, e = false) {
    this._components.push(t);
    e && t.registerCallback("statuschange", t => {
      t ? this.show() : this.hide();
    });
    t._cMenuParent = this;
    const {
      componentContainer: componentContainer
    } = this._children;
    t.setParent(componentContainer);
    componentContainer.appendChild(t.element);
  }
  onToggleClick() {
    const {
      isExpanded: isExpanded
    } = this._state;
    const e = !isExpanded;
    this.setExpanded(e);
  }
  onCollapseClick() {
    this.setExpanded(false);
  }
  _setToggleAriaLabel(t) {
    const {
      toggleButton: toggleButton
    } = this._children;
    const {
      itemTitle: itemTitle
    } = this._state;
    const s = t ? "Collapse" : "Expand";
    toggleButton.setAttribute("aria-label", `${s} ${itemTitle.toLowerCase()}`);
  }
  setExpanded(t) {
    this.triggerCallbacks("expandtoggle", [t, this]);
    t !== this._state.isExpanded && (this.setState({
      isExpanded: t,
      expandedClass: t ? "expanded" : "collapsed",
      collapseBtnVisibleClass: t ? "" : "hidden"
    }), this._setToggleAriaLabel(t), t ? this._components.forEach(t => t.show()) : this._components.forEach(t => t.hide()), this._setContainerHeight(t));
  }
  _setContainerHeight(t) {
    const {
      height: height
    } = this._config;
    const i = t ? height.max : height.min;
    this._element.style.setProperty("--container-height", `${i}px`);
    height.active && this._element.style.setProperty("--container-height-active", `${height.active}px`);
  }
  get parentComponent() {
    return this._parentComponent;
  }
}
CollapsibleMenuItem.html = getCollapsibleMenuItemTemplate();
export { CollapsibleMenuItem };
