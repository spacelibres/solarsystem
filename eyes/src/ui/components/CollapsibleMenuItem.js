/** @eyes-analysis
 * 文件职责：工具菜单中的独立动作项
 * 依据：imports: ../../framework/eyes/index.js, ../../styles/extracted/CollapsibleMenuItemStyles.js, ../templates/CollapsibleMenuItemTemplate.html
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1628109-1630011.
import * as Eyes from "../../framework/eyes/index.js";
import "../../styles/extracted/CollapsibleMenuItemStyles.js";
import CollapsibleMenuItemTemplate from "../templates/CollapsibleMenuItemTemplate.html";
var getCollapsibleMenuItemTemplate = () => CollapsibleMenuItemTemplate;
/** @eyes-analysis
 * 类职责：工具菜单中的独立动作项；继承 Eyes.BaseComponent
 * 继承：Eyes.BaseComponent；导出：CollapsibleMenuItem。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class CollapsibleMenuItem extends Eyes.BaseComponent {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 this._eventNames.push, this._initCallbacks；写入 _parentComponent, _components。
   * 状态写入：_components、_parentComponent。
   * 调用线索：super、this._eventNames.push、this._initCallbacks。
   */
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
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 super.init, Button.setAttribute, Title.toLowerCase, this._element.style.setProperty, this._setContainerHeight, this._setToggleAriaLabel。
   * 调用线索：collapseButton.setAttribute、itemTitle.toLowerCase、super.init、this._element.style.setProperty、this._setContainerHeight等。
   */
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
  /** @eyes-analysis
   * 执行 addComponent 对应的组件业务步骤；调用 this._components.push, this.show, this.hide, Container.appendChild。
   * 调用线索：componentContainer.appendChild、t.registerCallback、t.setParent、this._components.push、this.hide等。
   */
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
  /** @eyes-analysis
   * 执行 onToggleClick 对应的组件业务步骤；调用 this.setExpanded。
   * 调用线索：this.setExpanded。
   */
  onToggleClick() {
    const {
      isExpanded: isExpanded
    } = this._state;
    const e = !isExpanded;
    this.setExpanded(e);
  }
  /** @eyes-analysis
   * 执行 onCollapseClick 对应的组件业务步骤；调用 this.setExpanded。
   * 调用线索：this.setExpanded。
   */
  onCollapseClick() {
    this.setExpanded(false);
  }
  /** @eyes-analysis
   * 执行 _setToggleAriaLabel 对应的组件业务步骤；调用 Button.setAttribute, Title.toLowerCase。
   * 调用线索：itemTitle.toLowerCase、toggleButton.setAttribute。
   */
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
  /** @eyes-analysis
   * 执行 setExpanded 对应的组件业务步骤；调用 this.triggerCallbacks, this.setState, this._setToggleAriaLabel, this._components.forEach, this._setContainerHeight。
   * 调用线索：t.hide、t.show、this._components.forEach、this._setContainerHeight、this._setToggleAriaLabel等。
   */
  setExpanded(t) {
    this.triggerCallbacks("expandtoggle", [t, this]);
    t !== this._state.isExpanded && (this.setState({
      isExpanded: t,
      expandedClass: t ? "expanded" : "collapsed",
      collapseBtnVisibleClass: t ? "" : "hidden"
    }), this._setToggleAriaLabel(t), t ? this._components.forEach(t => t.show()) : this._components.forEach(t => t.hide()), this._setContainerHeight(t));
  }
  /** @eyes-analysis
   * 执行 _setContainerHeight 对应的组件业务步骤；调用 this._element.style.setProperty。
   * 调用线索：this._element.style.setProperty。
   */
  _setContainerHeight(t) {
    const {
      height: height
    } = this._config;
    const i = t ? height.max : height.min;
    this._element.style.setProperty("--container-height", `${i}px`);
    height.active && this._element.style.setProperty("--container-height-active", `${height.active}px`);
  }
  /** @eyes-analysis
   * 执行 parentComponent 对应的组件业务步骤。
   */
  get parentComponent() {
    return this._parentComponent;
  }
}
CollapsibleMenuItem.html = getCollapsibleMenuItemTemplate();
export { CollapsibleMenuItem };
