/** @eyes-analysis
 * 文件职责：可折叠工具菜单和子项显示
 * 依据：imports: ../../framework/eyes/index.js, ../../app/public-api.js, ../../styles/extracted/CollapsibleMenuStyles.js, ../templates/CollapsibleMenuTemplate.html, ./CollapsibleMenuItem.js；manager dependencies: router
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1624127-1627949.
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import "../../styles/extracted/CollapsibleMenuStyles.js";
import CollapsibleMenuTemplate from "../templates/CollapsibleMenuTemplate.html";
import "./CollapsibleMenuItem.js";
var getCollapsibleMenuTemplate = () => CollapsibleMenuTemplate;
/** @eyes-analysis
 * 类职责：可折叠工具菜单和子项显示；继承 Eyes.BaseComponent
 * 继承：Eyes.BaseComponent；导出：CollapsibleMenu。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class CollapsibleMenu extends Eyes.BaseComponent {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 this._getMaxHeight, this._calcAvailableHeight, this._collapseLastItem, this._eventNames.push, this._initCallbacks, this.bindFunctions；写入 _menuItems, _expandedItems, _allowMultiple, _maxHeight, _availableHeight, _resizeObserver。
   * 状态写入：_allowMultiple、_availableHeight、_expandedItems、_maxHeight、_menuItems、_resizeObserver。
   * 调用线索：new ResizeObserver、super、t.forEach、this._calcAvailableHeight、this._collapseLastItem等。
   */
  constructor(t) {
    super(t, null, {
      numMenusClass: "",
      expandedMenusClass: ""
    });
    this._menuItems = [];
    this._expandedItems = [];
    this._allowMultiple = true;
    this._maxHeight = this._getMaxHeight();
    this._availableHeight = this._calcAvailableHeight();
    this._resizeObserver = new ResizeObserver(t => {
      t.forEach(() => {
        this._maxHeight = this._getMaxHeight();
        this._availableHeight = this._calcAvailableHeight();
        this._availableHeight < 0 && this._expandedItems > 1 && this._collapseLastItem();
      });
    });
    this._eventNames.push("expandtoggle");
    this._initCallbacks();
    this.bindFunctions(["onItemToggle", "onItemVisibleChange"]);
  }
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 super.init, this._resizeObserver.observe。
   * 调用线索：super.init、this._resizeObserver.observe。
   */
  init() {
    super.init();
    this._resizeObserver.observe(this._element);
  }
  /** @eyes-analysis
   * 执行 _getMaxHeight 对应的组件业务步骤。
   */
  _getMaxHeight() {
    const t = window.innerHeight;
    return t > 600 ? .4 * t : .5 * t;
  }
  /** @eyes-analysis
   * 执行 _calcUsedHeight 对应的组件业务步骤；调用 this._expandedItems.forEach。
   * 调用线索：this._expandedItems.forEach。
   */
  _calcUsedHeight() {
    let t = 0;
    this._expandedItems.forEach(({
      _config: _config
    }) => {
      const {
        height: height
      } = _config;
      t += height.max;
    });
    return t;
  }
  /** @eyes-analysis
   * 执行 _calcAvailableHeight 对应的组件业务步骤；调用 this._calcUsedHeight。
   * 调用线索：this._calcUsedHeight。
   */
  _calcAvailableHeight() {
    const t = this._calcUsedHeight();
    return this._maxHeight - t;
  }
  /** @eyes-analysis
   * 源码扩展或访问入口；调用 ；写入 。
   */
  _itemHasSpace({
    height: height
  }) {
    return this._availableHeight > height.max;
  }
  /** @eyes-analysis
   * 执行 _addExpandedItem 对应的组件业务步骤；调用 this._expandedItems.push, this._calcAvailableHeight；写入 _availableHeight。
   * 状态写入：_availableHeight。
   * 调用线索：this._calcAvailableHeight、this._expandedItems.push。
   */
  _addExpandedItem(t) {
    this._expandedItems.push(t);
    this._availableHeight = this._calcAvailableHeight();
  }
  /** @eyes-analysis
   * 执行 _removeExpandedItem 对应的组件业务步骤；调用 this._expandedItems.filter, this._calcAvailableHeight；写入 _expandedItems, _availableHeight。
   * 状态写入：_availableHeight、_expandedItems。
   * 调用线索：this._calcAvailableHeight、this._expandedItems.filter。
   */
  _removeExpandedItem(t) {
    this._expandedItems = this._expandedItems.filter(e => e !== t);
    this._availableHeight = this._calcAvailableHeight();
  }
  /** @eyes-analysis
   * 执行 _collapseLastItem 对应的组件业务步骤。
   * 调用线索：this._expandedItems[0].setExpanded。
   */
  _collapseLastItem() {
    this._expandedItems.length && this._expandedItems[0].setExpanded(false);
  }
  /** @eyes-analysis
   * 执行 collapse 对应的组件业务步骤；调用 this.triggerCallbacks。
   * 调用线索：this._menuItems[t].setExpanded、this.triggerCallbacks。
   */
  collapse() {
    for (let t = 0; t < this._menuItems.length; t++) this._menuItems[t].setExpanded(false);
    this.triggerCallbacks("expandtoggle", [false]);
  }
  /** @eyes-analysis
   * 执行 _setBtmGradScale 对应的组件业务步骤；调用 this._calcUsedHeight。
   * 调用线索：document.body.style.setProperty、this._calcUsedHeight。
   */
  _setBtmGradScale() {
    const t = (80 + this._calcUsedHeight()) / 80;
    document.body.style.setProperty("--btm-grad-height", "80px");
    document.body.style.setProperty("--btm-grad-scale", t);
  }
  /** @eyes-analysis
   * 源码扩展或访问入口；调用 Boolean, SolarSystemPublicApi.Types.get, a.addComponent, a.getState, a.setExpanded, componentNames.forEach, i.create, itemTitle.split, itemTitle.split(" ").join, itemTitle.split(" ").join("").toLowerCase, this._app.getComponent, this._app.getManager, this._callbackRegistry.push, this._element.appendChild, this._element.insertBefore, this._itemHasSpace, this._menuItems.push, this.onItemVisibleChange, this.registerCallbacks；写入 。
   * 调用线索：Boolean、SolarSystemPublicApi.Types.get、a.addComponent、a.getState、a.setExpanded等。
   */
  async addItem({
    itemTitle: itemTitle,
    componentNames: componentNames,
    positionIndex: positionIndex,
    dimensions: dimensions,
    expand: o = true
  }) {
    const r = `${itemTitle.split(" ").join("").toLowerCase()}Collapsible`;
    let a = this._app.getComponent(r);
    const l = Boolean(a);
    if (!l) {
      const i = SolarSystemPublicApi.Types.get("CollapsibleMenuItem");
      a = await i.create(this._app, r, i, false, [this], {
        isVisible: true,
        parent: this._element,
        itemTitle: itemTitle,
        config: dimensions
      });
      this._callbackRegistry.push({
        emitter: a,
        event: "expandtoggle",
        callback: this.onItemToggle
      }, {
        emitter: a,
        event: "visiblechange",
        callback: this.onItemVisibleChange
      });
      this.registerCallbacks();
      componentNames.forEach((t, e) => {
        const i = this._app.getComponent(t);
        a.addComponent(i, 0 === e);
      });
    }
    positionIndex >= this._element.children.length ? this._element.appendChild(a.element) : this._element.insertBefore(a.element, this._element.children[positionIndex]);
    this._menuItems.push(a);
    const {
      embed: embed
    } = this._app.getManager("router").configs;
    let h = l && o ? a.getState("isExpanded") : o;
    const timeControlsComponent = this._app.getComponent("timeControls");
    if (a?.components?.includes(timeControlsComponent)) {
      true === this._app.getManager("router").configs.collapseTimeControls && (h = false);
    }
    const u = h && this._itemHasSpace(dimensions) && !embed;
    a.setExpanded(u);
    this.onItemVisibleChange();
    return a;
  }
  /** @eyes-analysis
   * 执行 removeAllItems 对应的组件业务步骤；调用 this._menuItems.forEach, this._element.removeChild, this.onItemVisibleChange, this._calcAvailableHeight；写入 _menuItems, _expandedItems, _availableHeight。
   * 状态写入：_availableHeight、_expandedItems、_menuItems。
   * 调用线索：this._calcAvailableHeight、this._element.removeChild、this._menuItems.forEach、this.onItemVisibleChange。
   */
  removeAllItems() {
    this._menuItems.forEach(({
      element: element
    }) => {
      element?.parentNode === this._element && this._element.removeChild(element);
    });
    this._menuItems = [];
    this._expandedItems = [];
    this.onItemVisibleChange();
    this._availableHeight = this._calcAvailableHeight();
  }
  /** @eyes-analysis
   * 执行 onItemToggle 对应的组件业务步骤；调用 this._itemHasSpace, this._collapseLastItem, this._addExpandedItem, this._removeExpandedItem, this.setState, this.triggerCallbacks, this._setBtmGradScale。
   * 调用线索：this._addExpandedItem、this._collapseLastItem、this._itemHasSpace、this._removeExpandedItem、this._setBtmGradScale等。
   */
  onItemToggle(t, e) {
    const {
      _config: _config
    } = e;
    if (t) {
      this._itemHasSpace(_config) && this._allowMultiple || this._collapseLastItem();
      this._addExpandedItem(e);
    } else this._removeExpandedItem(e);
    this.setState({
      expandedMenusClass: `expanded-${this._expandedItems.length}`
    });
    this._expandedItems.length > 0 ? this.triggerCallbacks("expandtoggle", [true]) : this.triggerCallbacks("expandtoggle", [false]);
    this._setBtmGradScale();
  }
  /** @eyes-analysis
   * 执行 onItemVisibleChange 对应的组件业务步骤；调用 this.setState。
   * 调用线索：this.setState。
   */
  onItemVisibleChange() {
    this.setState({
      numMenusClass: `items-${this.visibleItems.length}`,
      expandedMenusClass: `expanded-${this._expandedItems.length}`
    });
  }
  /** @eyes-analysis
   * 执行 setAllowMultiple 对应的组件业务步骤；写入 _allowMultiple。
   * 状态写入：_allowMultiple。
   */
  setAllowMultiple(allowMultiple) {
    this._allowMultiple = allowMultiple;
  }
  /** @eyes-analysis
   * 执行 visibleItems 对应的组件业务步骤；调用 this._menuItems.filter。
   * 调用线索：t.getState、this._menuItems.filter。
   */
  get visibleItems() {
    return this._menuItems.filter(t => t.getState("isVisible"));
  }
  /** @eyes-analysis
   * 执行 allItems 对应的组件业务步骤。
   */
  get allItems() {
    return this._element?.childNodes;
  }
}
CollapsibleMenu.html = getCollapsibleMenuTemplate();
export { CollapsibleMenu };
