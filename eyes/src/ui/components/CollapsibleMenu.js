// Recovered from app.js:1624127-1627949.
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import "../../styles/extracted/CollapsibleMenuStyles.js";
import CollapsibleMenuTemplate from "../templates/CollapsibleMenuTemplate.html";
import "./CollapsibleMenuItem.js";
var getCollapsibleMenuTemplate = () => CollapsibleMenuTemplate;
class CollapsibleMenu extends Eyes.BaseComponent {
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
  init() {
    super.init();
    this._resizeObserver.observe(this._element);
  }
  _getMaxHeight() {
    const t = window.innerHeight;
    return t > 600 ? .4 * t : .5 * t;
  }
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
  _calcAvailableHeight() {
    const t = this._calcUsedHeight();
    return this._maxHeight - t;
  }
  _itemHasSpace({
    height: height
  }) {
    return this._availableHeight > height.max;
  }
  _addExpandedItem(t) {
    this._expandedItems.push(t);
    this._availableHeight = this._calcAvailableHeight();
  }
  _removeExpandedItem(t) {
    this._expandedItems = this._expandedItems.filter(e => e !== t);
    this._availableHeight = this._calcAvailableHeight();
  }
  _collapseLastItem() {
    this._expandedItems.length && this._expandedItems[0].setExpanded(false);
  }
  collapse() {
    for (let t = 0; t < this._menuItems.length; t++) this._menuItems[t].setExpanded(false);
    this.triggerCallbacks("expandtoggle", [false]);
  }
  _setBtmGradScale() {
    const t = (80 + this._calcUsedHeight()) / 80;
    document.body.style.setProperty("--btm-grad-height", "80px");
    document.body.style.setProperty("--btm-grad-scale", t);
  }
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
    return this._menuItems.filter(t => t.getState("isVisible"));
  }
  get allItems() {
    return this._element?.childNodes;
  }
}
CollapsibleMenu.html = getCollapsibleMenuTemplate();
export { CollapsibleMenu };
