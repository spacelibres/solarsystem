// Recovered from app.js:1624127-1627949.
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import "../../styles/extracted/CollapsibleMenuStyles.js";
import CollapsibleMenuTemplate from "../templates/CollapsibleMenuTemplate.html";
import "./CollapsibleMenuItem.js";
var getCollapsibleMenuTemplate = () => CollapsibleMenuTemplate;
/* 菜单保存项目顺序与已展开队列，依据各项最大高度计算剩余空间；新增项目可复用现存组件，组件订阅则登记在本菜单的回调注册表。 */
class CollapsibleMenu extends Eyes.BaseComponent {
  constructor(app) {
    super(app, null, {
      numMenusClass: "",
      expandedMenusClass: ""
    });
    this._menuItems = [];
    this._expandedItems = [];
    this._allowMultiple = true;
    this._maxHeight = this._getMaxHeight();
    this._availableHeight = this._calcAvailableHeight();
    this._resizeObserver = new ResizeObserver(resizeEntries => {
      resizeEntries.forEach(() => {
        this._maxHeight = this._getMaxHeight();
        this._availableHeight = this._calcAvailableHeight();
        this._availableHeight < 0 && this._expandedItems > 1 && this._collapseLastItem();
      });
    });
    this._eventNames.push("expandtoggle");
    this._initCallbacks();
    this.bindFunctions(["onItemToggle", "onItemVisibleChange"]);
  }
  init() {
    super.init();
    this._resizeObserver.observe(this._element);
  }
  _getMaxHeight() {
    const windowHeight = window.innerHeight;
    return windowHeight > 600 ? .4 * windowHeight : .5 * windowHeight;
  }
  _calcUsedHeight() {
    let usedHeight = 0;
    this._expandedItems.forEach(({
      _config: _config
    }) => {
      const {
        height: height
      } = _config;
      usedHeight += height.max;
    });
    return usedHeight;
  }
  _calcAvailableHeight() {
    const usedHeight = this._calcUsedHeight();
    return this._maxHeight - usedHeight;
  }
  _itemHasSpace({
    height: height
  }) {
    return this._availableHeight > height.max;
  }
  _addExpandedItem(menuItem) {
    this._expandedItems.push(menuItem);
    this._availableHeight = this._calcAvailableHeight();
  }
  _removeExpandedItem(menuItem) {
    this._expandedItems = this._expandedItems.filter(expandedItem => expandedItem !== menuItem);
    this._availableHeight = this._calcAvailableHeight();
  }
  _collapseLastItem() {
    this._expandedItems.length && this._expandedItems[0].setExpanded(false);
  }
  collapse() {
    for (let itemIndex = 0; itemIndex < this._menuItems.length; itemIndex++) this._menuItems[itemIndex].setExpanded(false);
    this.triggerCallbacks("expandtoggle", [false]);
  }
  _setBtmGradScale() {
    const gradientScale = (80 + this._calcUsedHeight()) / 80;
    document.body.style.setProperty("--btm-grad-height", "80px");
    document.body.style.setProperty("--btm-grad-scale", gradientScale);
  }
  async addItem({
    itemTitle: itemTitle,
    componentNames: componentNames,
    positionIndex: positionIndex,
    dimensions: dimensions,
    expand: shouldExpand = true
  }) {
    const componentName = `${itemTitle.split(" ").join("").toLowerCase()}Collapsible`;
    let menuItem = this._app.getComponent(componentName);
    const alreadyExists = Boolean(menuItem);
    if (!alreadyExists) {
      const MenuItemClass = SolarSystemPublicApi.Types.get("CollapsibleMenuItem");
      menuItem = await MenuItemClass.create(this._app, componentName, MenuItemClass, false, [this], {
        isVisible: true,
        parent: this._element,
        itemTitle: itemTitle,
        config: dimensions
      });
      this._callbackRegistry.push({
        emitter: menuItem,
        event: "expandtoggle",
        callback: this.onItemToggle
      }, {
        emitter: menuItem,
        event: "visiblechange",
        callback: this.onItemVisibleChange
      });
      this.registerCallbacks();
      componentNames.forEach((childComponentName, childIndex) => {
        const childComponent = this._app.getComponent(childComponentName);
        menuItem.addComponent(childComponent, 0 === childIndex);
      });
    }
    positionIndex >= this._element.children.length ? this._element.appendChild(menuItem.element) : this._element.insertBefore(menuItem.element, this._element.children[positionIndex]);
    this._menuItems.push(menuItem);
    const {
      embed: embed
    } = this._app.getManager("router").configs;
    let requestedExpandedState = alreadyExists && shouldExpand ? menuItem.getState("isExpanded") : shouldExpand;
    const timeControlsComponent = this._app.getComponent("timeControls");
    if (menuItem?.components?.includes(timeControlsComponent)) {
      true === this._app.getManager("router").configs.collapseTimeControls && (requestedExpandedState = false);
    }
    const canExpand = requestedExpandedState && this._itemHasSpace(dimensions) && !embed;
    menuItem.setExpanded(canExpand);
    this.onItemVisibleChange();
    return menuItem;
  }
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
  onItemToggle(isExpanded, menuItem) {
    const {
      _config: _config
    } = menuItem;
    if (isExpanded) {
      this._itemHasSpace(_config) && this._allowMultiple || this._collapseLastItem();
      this._addExpandedItem(menuItem);
    } else this._removeExpandedItem(menuItem);
    this.setState({
      expandedMenusClass: `expanded-${this._expandedItems.length}`
    });
    this._expandedItems.length > 0 ? this.triggerCallbacks("expandtoggle", [true]) : this.triggerCallbacks("expandtoggle", [false]);
    this._setBtmGradScale();
  }
  onItemVisibleChange() {
    this.setState({
      numMenusClass: `items-${this.visibleItems.length}`,
      expandedMenusClass: `expanded-${this._expandedItems.length}`
    });
  }
  setAllowMultiple(allowMultiple) {
    this._allowMultiple = allowMultiple;
  }
  get visibleItems() {
    return this._menuItems.filter(menuItem => menuItem.getState("isVisible"));
  }
  get allItems() {
    return this._element?.childNodes;
  }
}
CollapsibleMenu.html = getCollapsibleMenuTemplate();
export { CollapsibleMenu };
