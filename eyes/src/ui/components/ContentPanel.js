/** @eyes-analysis
 * 文件职责：按路由描述装配对象内容块并控制面板折叠与覆盖
 * 依据：imports: ../../styles/extracted/MobileExpandButtonStyles-928.js, ../../vendor/modules/animateFill-929.js, ../../engine/solar-system/public-api.js, ../../engine/pioneer/index.js, ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/ContentPanelTemplate.html, ../../styles/extracted/ContentPanelStyles.js；manager dependencies: content, router, scene, layer, time
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1514149-1542996.
import "../../styles/extracted/MobileExpandButtonStyles-928.js";
import * as animateFill from "../../vendor/modules/animateFill-929.js";
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
import * as Pioneer from "../../engine/pioneer/index.js";
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import ContentPanelTemplate from "../templates/ContentPanelTemplate.html";
import "../../styles/extracted/ContentPanelStyles.js";
var getContentPanelTemplate = () => ContentPanelTemplate;
const h = {
  info: {
    subtabs: {
      about: []
    },
    contentBlocks: ["overview", "description"]
  },
  toolbox: {
    subtabs: {},
    contentBlocks: []
  },
  viewOptions: {
    subtabs: {
      camera: ["cameraView"]
    },
    contentBlocks: ["cameraView"]
  }
};
const d = ["toolbox"];
const u = "info";
/** @eyes-analysis
 * 类职责：按路由描述装配对象内容块并控制面板折叠与覆盖；继承 Eyes.BaseComponent
 * 继承：Eyes.BaseComponent；导出：ContentPanel。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ContentPanel extends Eyes.BaseComponent {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 Object.keys, this._eventNames.push, this._initCallbacks, Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet, this.setState, Fill.default.setDefaultProps, this.bindFunctions；写入 _backRoute, _backButtonVisibleClass, _defaultState, _blockState, _components, _currentId, _overviewBlock, _cameraViewBlock, _descriptionBlock, _relatedBlock, _eventsBlock, _featuredMoonsBlock。
   * 状态写入：_adjustedMobileHeight、_backButtonVisibleClass、_backRoute、_blockState、_cameraViewBlock、_class.iconCollapse、_class.iconExpand、_class.isCollapsed等；完整记录见索引。
   * 调用线索：Eyes.AppUtils.isMobile、Eyes.AppUtils.isTablet、Object.keys、Object.keys(h).reduce、animateFill.default.setDefaultProps等。
   */
  constructor(t, e) {
    super(t, null, {
      title: "",
      isOverlay: false,
      isOverlayClass: "",
      backButtonVisibleClass: "",
      backButtonText: "Back",
      scrollToTopVisible: "hidden",
      subtabsVisible: "hidden",
      ...e
    });
    this._class.isOverlay = {
      true: "overlay",
      false: ""
    };
    this._class.isExpanded = {
      true: "expanded",
      false: ""
    };
    this._class.iconExpand = {
      mid: "arrow-line-up",
      bottom: "caret-up",
      left: "icon-expand-side"
    };
    this._class.isCollapsed = {
      true: "collapsed",
      false: ""
    };
    this._class.iconCollapse = {
      top: "caret-down",
      mid: "arrow-line-down",
      left: "caret-double-left"
    };
    this._backRoute = this._state.backButtonRoute || "#";
    this._backButtonVisibleClass = "";
    this._class.isScrollToTopVisible = {
      true: "active",
      false: "hidden"
    };
    this._defaultState = {
      backButtonVisibleClass: this._backButtonVisibleClass,
      scrollToTopVisible: this._class.isScrollToTopVisible.false,
      title: ""
    };
    this._blockState = {
      overviewBlock: false,
      descriptionBlock: false,
      relatedBlock: false,
      eventsBlock: false,
      cameraViewBlock: false,
      featuredMoonsBlock: false,
      surfaceMapBlock: false,
      instrumentFOVBlock: false,
      layersBlock: false,
      textureQualityBlock: false,
      compareSizeBlock: false,
      distanceToolBlock: false,
      moonsBlock: false,
      telescopeModeBlock: false,
      replayBlock: false,
      featuresBlock: false
    };
    this._components = Object.keys(this._blockState);
    this._eventNames.push("overlay", "expandtoggle");
    this._initCallbacks();
    this._currentId = "";
    this._overviewBlock = null;
    this._cameraViewBlock = null;
    this._descriptionBlock = null;
    this._relatedBlock = null;
    this._eventsBlock = null;
    this._featuredMoonsBlock = null;
    this._instrumentFOVBlock = null;
    this._layersBlock = null;
    this._surfaceMapBlock = null;
    this._textureQualityBlock = null;
    this._compareSizeBlock = null;
    this._distanceToolBlock = null;
    this._moonsBlock = null;
    this._telescopeModeBlock = null;
    this._replayBlock = null;
    this._featuresBlock = null;
    this._mainViewportEl = null;
    this._pioneerParentEl = null;
    const i = Object.keys(h).reduce((t, e) => ({
      ...t,
      [e + "TabVisibleClass"]: this._class.isVisible[true]
    }), {});
    const n = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTablet();
    this.setState({
      ...i,
      selectedTab: null,
      selectedSubtab: null,
      currentMainTab: u,
      infoSelectedClass: "",
      toolboxSelectedClass: "",
      viewOptionsSelectedClass: "",
      isExpanded: !n,
      isExpandedClass: this._class.isExpanded[!n],
      iconExpandClass: this._class.iconExpand[n ? "mid" : "left"],
      isCollapsed: n,
      isCollapsedClass: this._class.isCollapsed[n],
      iconCollapseClass: this._class.iconCollapse.left,
      tabsVisible: ""
    });
    animateFill.default.setDefaultProps({
      theme: "default",
      touch: ["hold", 2e3],
      delay: [600, null],
      plugins: [animateFill.followCursor]
    });
    this._scrollbar = null;
    this._isDragging = false;
    this._snapHeights = {
      index: -1,
      value: []
    };
    this._adjustedMobileHeight = 0;
    this._resizeTimeoutAmount = 300;
    this.bindFunctions(["backRoute", "selectTab", "_onTabSelect", "onClickShowCollapse", "onDragStart", "onDrag", "onDragEnd", "collapse", "expand", "onChildParentChange", "clearPanel", "_setUpMobileCollapse"]);
  }
  /** @eyes-analysis
   * 执行 getScrollbar 对应的组件业务步骤。
   */
  getScrollbar() {
    return this._scrollbar;
  }
  /** @eyes-analysis
   * 执行 _showTab 对应的组件业务步骤；调用 this.setState。
   * 调用线索：this.setState。
   */
  _showTab(t) {
    this.setState({
      [t + "TabVisibleClass"]: this._class.isVisible[true]
    });
  }
  /** @eyes-analysis
   * 执行 _hideTab 对应的组件业务步骤；调用 this.setState。
   * 调用线索：this.setState。
   */
  _hideTab(t) {
    this.setState({
      [t + "TabVisibleClass"]: this._class.isVisible[false]
    });
  }
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 super.init, this._app.addComponent, Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet, Eyes.AppUtils.isLandscape, Eyes.AppUtils.deepClone, this.setState, this._app.getComponent, this.resize；写入 _overviewBlock, _descriptionBlock, _relatedBlock, _eventsBlock, _replayBlock, _featuredMoonsBlock, _compareSizeBlock, _distanceToolBlock, _moonsBlock, _telescopeModeBlock, _cameraViewBlock, _surfaceMapBlock。
   * 状态写入：_cameraViewBlock、_compareSizeBlock、_descriptionBlock、_distanceToolBlock、_eventsBlock、_featuredMoonsBlock、_featuresBlock、_instrumentFOVBlock等；完整记录见索引。
   * 调用线索：0,animateFill.default、Eyes.AppUtils.deepClone、Eyes.AppUtils.isLandscape、Eyes.AppUtils.isMobile、Eyes.AppUtils.isTablet等。
   */
  async init() {
    super.init();
    this._overviewBlock = await this._app.addComponent("overviewBlock", SolarSystemPublicApi.OverviewBlock);
    this._descriptionBlock = await this._app.addComponent("descriptionBlock", SolarSystemPublicApi.DescriptionBlock);
    this._relatedBlock = await this._app.addComponent("relatedBlock", SolarSystemPublicApi.RelatedBlock);
    this._eventsBlock = await this._app.addComponent("eventsBlock", SolarSystemPublicApi.EventsBlock);
    this._replayBlock = await this._app.addComponent("replayBlock", SolarSystemPublicApi.ReplayBlock);
    this._featuredMoonsBlock = await this._app.addComponent("featuredMoonsBlock", SolarSystemPublicApi.FeaturedMoonsBlock);
    this._compareSizeBlock = await this._app.addComponent("compareSizeBlock", SolarSystemPublicApi.ToolboxBlock, {
      iconClass: "compare-size",
      title: "Compare Size"
    });
    this._distanceToolBlock = await this._app.addComponent("distanceToolBlock", SolarSystemPublicApi.ToolboxBlock, {
      iconClass: "distance-tool",
      title: "Distance Tool"
    });
    this._moonsBlock = await this._app.addComponent("moonsBlock", SolarSystemPublicApi.ToolboxBlock, {
      iconClass: "shape crescent",
      title: "Moons"
    });
    this._telescopeModeBlock = await this._app.addComponent("telescopeModeBlock", SolarSystemPublicApi.ToolboxBlock, {
      iconClass: "telescope-mode",
      title: "Telescope Mode"
    });
    this._cameraViewBlock = await this._app.addComponent("cameraViewBlock", SolarSystemPublicApi.CameraViewBlock);
    this._surfaceMapBlock = await this._app.addComponent("surfaceMapBlock", SolarSystemPublicApi.SurfaceMapBlock);
    this._instrumentFOVBlock = await this._app.addComponent("instrumentFOVBlock", SolarSystemPublicApi.InstrumentFOVBlock);
    this._layersBlock = await this._app.addComponent("layersBlock", SolarSystemPublicApi.LayersBlock);
    this._textureQualityBlock = await this._app.addComponent("textureQualityBlock", SolarSystemPublicApi.TextureQualityBlock);
    this._featuresBlock = await this._app.addComponent("featuresBlock", SolarSystemPublicApi.FeaturesBlock);
    (0, animateFill.default)(this._children.expandButton, {
      content: "Expand content panel.",
      placement: "top"
    });
    (0, animateFill.default)(this._children.collapseButton, {
      content: "Collapse content panel.",
      placement: "top"
    });
    this._isMobile = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTablet();
    this._isLandscape = Eyes.AppUtils.isLandscape();
    this._tabContent = Eyes.AppUtils.deepClone(h);
    this.setState({
      isCollapsed: this._isMobile
    });
    this._isMobile && this._app.getComponent("collapsibleMenu").collapse();
    this.resize();
  }
  /** @eyes-analysis
   * 执行 _onRouteChange 对应的组件业务步骤；调用 this.isEnabled, this._disableAllComponents, this.setupBackButton, Eyes.AppUtils.deepClone, this.selectTab；写入 _currentId, _tabContent, _persistingBlocks。
   * 状态写入：_currentId、_defaultState.title、_persistingBlocks、_tabContent。
   * 调用线索：Eyes.AppUtils.deepClone、this._disableAllComponents、this.isEnabled、this.selectTab、this.setupBackButton。
   */
  _onRouteChange(currentId, e) {
    this.isEnabled() && (this._disableAllComponents(), this._defaultState.title = "", this._currentId = currentId, this.setupBackButton(e), this._tabContent = Eyes.AppUtils.deepClone(h), this.selectTab(u), this._persistingBlocks = []);
  }
  /** @eyes-analysis
   * 执行 getParentTabOfSubtab 对应的组件业务步骤；调用 Object.entries, Object.keys。
   * 调用线索：Object.entries、Object.keys、Object.keys(i.subtabs).includes。
   */
  getParentTabOfSubtab(t) {
    for (const [e, i] of Object.entries(this._tabContent)) if (Object.keys(i.subtabs).includes(t)) return e;
    return "";
  }
  /** @eyes-analysis
   * 执行 selectTab 对应的组件业务步骤；调用 this.getParentTabOfSubtab, Object.keys, this.setState, this._calcTabPanelBottomMargin, this.populateTabs, List.toggle。
   * 调用线索：Object.keys、d.includes、document.getElementById、o?.classList.toggle、r?.classList.toggle等。
   */
  selectTab(t, e = true) {
    const i = t === this._state.currentMainTab;
    const s = this.getParentTabOfSubtab(t);
    const n = e ? t : s;
    let tabContent = this._tabContent;
    e && !this._isMobile || (tabContent = this._tabContent[n].subtabs);
    const r = !d.includes(n) ? Object.keys(tabContent)[0] : null;
    const a = e ? r : t;
    this.setState({
      selectedTab: t,
      selectedSubtab: a,
      currentMainTab: n
    });
    const l = !d.includes(this._state.currentMainTab);
    this.setState({
      subtabsVisible: l ? "" : "hidden"
    });
    i || (this._isMobile && this._calcTabPanelBottomMargin(), this.populateTabs(this._tabContent, this._persistingBlocks));
    const c = e ? Object.keys(this._tabContent) : Object.keys(tabContent);
    for (const i of c) {
      const s = i === t;
      const o = this._children[`${i}Tab`] ?? document.getElementById(`${i}Tab`);
      o?.classList.toggle("selected", s);
      const r = this._children[`${e ? i : n}Panel`] ?? document.getElementById(`${e ? i : n}Panel`);
      e && r?.classList.toggle("selected", s);
    }
  }
  /** @eyes-analysis
   * 执行 _onTabSelect 对应的组件业务步骤；调用 Element.classList.contains, this.selectTab。
   * 调用线索：t.target.parentElement.classList.contains、this.selectTab。
   */
  _onTabSelect(t) {
    const {
      tab: tab
    } = t.target.dataset;
    const i = !t.target.parentElement.classList.contains("sub-tab-nav");
    this.selectTab(tab, i);
  }
  /** @eyes-analysis
   * 执行 addBlockToTab 对应的组件业务步骤；调用 Blocks.includes, Blocks.push。
   * 状态写入：_blockState[`${t}Block`]。
   * 调用线索：s[i].includes、s[i].push、this._tabContent[e].contentBlocks.includes、this._tabContent[e].contentBlocks.push。
   */
  addBlockToTab(t, e = u, i = null) {
    const s = this._tabContent[e].subtabs || {};
    i && (s[i] && !s[i].includes(t) ? s[i].push(t) : s[i] = [t]);
    this._tabContent[e].contentBlocks.includes(t) || (this._tabContent[e].contentBlocks.push(t), this._blockState[`${t}Block`] = true);
  }
  /** @eyes-analysis
   * 执行 removeBlockFromTab 对应的组件业务步骤；调用 Blocks.includes, Blocks.indexOf, Blocks.splice。
   * 状态写入：_blockState[`${t}Block`]。
   * 调用线索：this._tabContent[e].contentBlocks.includes、this._tabContent[e].contentBlocks.indexOf、this._tabContent[e].contentBlocks.splice。
   */
  removeBlockFromTab(t, e = u, i = null) {
    if (i && delete this._tabContent[e].subtabs[t], this._tabContent[e].contentBlocks.includes(t)) {
      const i = this._tabContent[e].contentBlocks.indexOf(t);
      this._tabContent[e].contentBlocks.splice(i, 1);
    }
    this._blockState[`${t}Block`] = false;
  }
  /** @eyes-analysis
   * 执行 populateTabs 对应的组件业务步骤；调用 this.createSubtabHTML, this._children.tabGroup.contains, this._overviewBlock.element.parentElement.removeChild, this._app.getComponent。
   * 调用线索：(this._isMobile&&selectedSubtab?t[currentMainTab].subtabs[selectedSubtab]:t[currentMainTab].contentBlocks).forEach、e.forEach、n.appendChild、n.insertBefore、n.removeChild等。
   */
  populateTabs(t, e = []) {
    const {
      selectedSubtab: selectedSubtab,
      currentMainTab: currentMainTab
    } = this._state;
    const n = this._children[`${currentMainTab}Panel`];
    if (n && n.firstChild) for (; n.firstChild;) n.removeChild(n.firstChild);
    if (this._isMobile) {
      if (this.createSubtabHTML(), this._state.isCollapsed) return;
    } else if (this._children.tabGroup.contains(this._overviewBlock.element)) {
      this._overviewBlock.element.parentElement.removeChild(this._overviewBlock.element);
    }
    (this._isMobile && selectedSubtab ? t[currentMainTab].subtabs[selectedSubtab] : t[currentMainTab].contentBlocks).forEach(t => {
      const e = this._app.getComponent(`${t}Block`);
      n.appendChild(e.element);
    });
    e.length && !this._isMobile && e.forEach(t => {
      const e = t.block;
      const i = "end" === t.index ? n.children.length : t.index;
      n.insertBefore(e.element, n.children[i]);
    });
  }
  /** @eyes-analysis
   * 执行 createSubtabHTML 对应的组件业务步骤；调用 Array.from, this._children.tabGroup.insertBefore, this._app.getManager, Object.keys, TabNav.appendChild, List.toggle, this.setState。
   * 调用线索：Array.from、Array.from(this._children.tabGroup.children).find、Object.keys、Object.keys(this._tabContent[currentMainTab].subtabs).includes、a.appendChild等。
   */
  createSubtabHTML() {
    if (this._overviewBlock?.element) {
      const t = this._overviewBlock.element.nextElementSibling;
      if ("content-main" !== t?.id) {
        const t = Array.from(this._children.tabGroup.children).find(t => "content-main" === t?.id);
        this._children.tabGroup.insertBefore(this._overviewBlock.element, t);
      }
    }
    const {
      subTabNav: subTabNav
    } = this._children;
    const {
      currentMainTab: currentMainTab
    } = this._state;
    const i = this._app.getManager("content").context.orderedEvents;
    const s = Object.keys(i).length > 0;
    const n = Object.keys(this._tabContent[currentMainTab].subtabs);
    if (n) {
      const o = n[0];
      const r = null !== this._state.selectedSubtab && n.includes(this._state.selectedSubtab) ? this._state.selectedSubtab : o;
      subTabNav.innerHTML = "";
      n.forEach(n => {
        const a = document.getElementById(`${n}Tab`) || document.createElement("li");
        a.setAttribute("id", `${n}Tab`);
        a.setAttribute("data-tab", n);
        let l = n.split(/(?=[A-Z])/).join(" ");
        l = l.charAt(0).toUpperCase() + l.slice(1);
        s && "events" === n && (l += ` (${i.length})`);
        a.appendChild(document.createTextNode(l));
        a.onclick = this._onTabSelect;
        subTabNav.appendChild(a);
        this._children[`${currentMainTab}Tab`].classList.toggle("selected", Object.keys(this._tabContent[currentMainTab].subtabs).includes(o));
        a.classList.toggle("selected", n === r);
      });
      this.setState({
        selectedSubtab: r
      });
    }
  }
  /** @eyes-analysis
   * 响应查询参数变化；调用 this._cameraViewBlock.onQueryChange。
   * 调用线索：this._cameraViewBlock.onQueryChange。
   */
  async onQueryChange(t) {
    await this._cameraViewBlock.onQueryChange(t);
  }
  /** @eyes-analysis
   * 执行 setupBackButton 对应的组件业务步骤；调用 this._app.getManager；写入 _backButtonVisibleClass, _backRoute。
   * 状态写入：_backButtonVisibleClass、_backRoute。
   * 调用线索：this._app.getManager。
   */
  setupBackButton(t) {
    if (this._app.getManager("router").configs.locked || t?.length <= 1) this._backButtonVisibleClass = "hidden";else {
      if (t && t.length > 1) {
        this._backRoute = "";
        for (let e = 0; e < t.length - 1; e++) this._backRoute += "/" + t[e];
      }
      this._backButtonVisibleClass = "visible";
    }
  }
  /** @eyes-analysis
   * 执行 onRouteChangeEvent 对应的组件业务步骤；调用 this._onRouteChange, this._app.getManager, this._overviewBlock.onRouteChange, this._replayBlock.onRouteChange, this.addBlockToTab, this._delayedResize, this._descriptionBlock.onRouteChange, this._app.getView, this.removeBlockFromTab, this._eventsBlock.onRouteChange, this._relatedBlock.onRouteChange, this._hideTab, this.selectTab, this._cameraViewBlock.onRouteChange；写入 _persistingBlocks。
   * 状态写入：_persistingBlocks。
   * 调用线索：this._app.getManager、this._app.getManager("content").getEntityInfo、this._app.getView、this._app.getView("object")?.getCurrentTarget、this._cameraViewBlock.onRouteChange等。
   */
  async onRouteChangeEvent(t, e, i, s, n, o, r) {
    this._onRouteChange(t, r);
    const a = this._app.getManager("content").getEntityInfo(t);
    if (null !== s) {
      if (await this._overviewBlock.onRouteChange(t, i, s), n && (this._replayBlock.onRouteChange(t, e, i, n, o), this.addBlockToTab("replay", "info", "about"), this._delayedResize()), s && (await this._descriptionBlock.onRouteChange(t, s), this.addBlockToTab("description", "info", "about")), o && o.isCanceled && t !== this._app.getView("object")?.getCurrentTarget()) return;
    } else this.removeBlockFromTab("description", "info", "about");
    if (n) {
      if (this._eventsBlock.onRouteChange(t, n, i), this.addBlockToTab("events", "info", "events"), o && o.isCanceled && t !== this._app.getView("event")?._target) return;
    } else this.removeBlockFromTab("events", "info", "events");
    s.related.length ? (await this._relatedBlock.onRouteChange("Related", s.related, [], o), this.addBlockToTab("related", "info", "related")) : this.removeBlockFromTab("related", "info", "related");
    const l = "toolbox";
    if (this._hideTab(l), this._state.selectedTab === l) {
      const t = u;
      this.selectTab(t);
    }
    this.addBlockToTab("cameraView", "viewOptions", "camera");
    await this._cameraViewBlock.onRouteChange({
      entityInfo: a
    });
    await this.determineViewOptionBlocksState(i.target, o);
    this._persistingBlocks = [{
      block: this._overviewBlock,
      index: 0
    }, {
      block: this._replayBlock,
      index: "end"
    }];
    this.populateTabs(this._tabContent, this._persistingBlocks);
    this._isMobile && this._setUpMobileCollapse();
  }
  /** @eyes-analysis
   * 执行 onRouteChangeObject 对应的组件业务步骤；调用 this._onRouteChange, this._app.getManager, this._overviewBlock.onRouteChange, this._delayedResize, this.setState, this._descriptionBlock.onRouteChange, this.addBlockToTab, this._app.getView, this._eventsBlock.onRouteChange, this.removeBlockFromTab, this._relatedBlock.onRouteChange, this._hideTab, this.determineToolboxBlocksState, this._showTab。
   * 状态写入：_defaultState.title。
   * 调用线索：e.id.split、this._app.getManager、this._app.getManager("content").getEntityDesc、this._app.getManager("content").hasLanded、this._app.getView等。
   */
  async onRouteChangeObject(t, e, i, s, n, o, r, a = false) {
    let l = i;
    this._onRouteChange(t, r);
    const {
      locked: locked
    } = this._app.getManager("router").configs;
    if (await this._overviewBlock.onRouteChange(t, e, i), this._delayedResize(), "Landing site" === e.category) {
      const t = e.id.split("_landing_site")[0];
      l = await this._app.getManager("content").getEntityDesc(t);
    }
    if (null !== l && (this.setState({
      title: l.title
    }), this._defaultState.title = l.title, await this._descriptionBlock.onRouteChange(t, l), this.addBlockToTab("description", "info", "about"), o && o.isCanceled && t !== this._app.getView("object")?.getCurrentTarget())) return;
    if (s ? (this._eventsBlock.onRouteChange(t, s), this.addBlockToTab("events", "info", "events")) : this.removeBlockFromTab("events", "info", "events"), !locked && l?.related?.length > 0) {
      if (await this._relatedBlock.onRouteChange("Related", l.related, n, o), this.addBlockToTab("related", "info", "related"), o && o.isCanceled && t !== this._app.getView("object")?.getCurrentTarget()) return;
    } else this.removeBlockFromTab("related", "info", "related");
    const h = "toolbox";
    this._app.getManager("content").hasLanded(e) ? this._hideTab(h) : (await this.determineToolboxBlocksState(e), this._showTab(h));
    this._isMobile && this._setUpMobileCollapse();
  }
  /** @eyes-analysis
   * 执行 onRouteChangeObjectLoaded 对应的组件业务步骤；调用 this._app.getView, this._app.getManager, this._relatedBlock.onRouteChange, this.addBlockToTab, this._cameraViewBlock.onRouteChange, this.determineViewOptionBlocksState, this.populateTabs。
   * 调用线索：this._app.getManager、this._app.getView、this._app.getView("object")?.getCurrentTarget、this._cameraViewBlock.onRouteChange、this._relatedBlock.onRouteChange等。
   */
  async onRouteChangeObjectLoaded(t, e, i, s, n, o, r) {
    const {
      cancelToken: cancelToken
    } = o;
    cancelToken && cancelToken.isCanceled && t !== this._app.getView("object")?.getCurrentTarget() || !this._app.getManager("router").configs.locked && null !== i && void 0 !== i.related && i.related.length > 0 && (await this._relatedBlock.onRouteChange("Related", i.related, n, cancelToken), cancelToken && cancelToken.isCanceled && t !== this._app.getView("object")?.getCurrentTarget()) || cancelToken && cancelToken.isCanceled && t !== this._app.getView("object")?.getCurrentTarget() || (this.addBlockToTab("cameraView", "viewOptions", "camera"), await this._cameraViewBlock.onRouteChange({
      entityInfo: e
    }), cancelToken && cancelToken.isCanceled && t !== this._app.getView("object")?.getCurrentTarget() || (this.determineViewOptionBlocksState(e.id, cancelToken), this.populateTabs(this._tabContent)));
  }
  /** @eyes-analysis
   * 执行 onRouteChangeFeature 对应的组件业务步骤；调用 this._onRouteChange, SolarSystemSceneExports.Entity.getEntityNamesInGroup, this._overviewBlock.onRouteChange, this._delayedResize, this._descriptionBlock.onRouteChange, this.addBlockToTab, this._featuredMoonsBlock.onRouteChange, this._hideTab, this._cameraViewBlock.onRouteChange, this._app.getView, this.determineViewOptionBlocksState, this.populateTabs, this._setUpMobileCollapse。
   * 调用线索：SolarSystemSceneExports.Entity.getEntityNamesInGroup、this._app.getView、this._app.getView("feature")?.getCurrentTarget、this._cameraViewBlock.onRouteChange、this._delayedResize等。
   */
  async onRouteChangeFeature(t, e, i, s, o, r) {
    this._onRouteChange(t, r);
    const a = "moons" === r[r.length - 1];
    const l = SolarSystemSceneExports.Entity.getEntityNamesInGroup(t + ", moons")?.size;
    if (await this._overviewBlock.onRouteChange(t, s, a ? `${l} Moons` : `Feature of ${e?.displayName || e?.iauName}`), this._delayedResize(), s && (await this._descriptionBlock.onRouteChange(t, s), this.addBlockToTab("description", "info", "about")), a && i.initial && i.initial.length > 0 && (await this._featuredMoonsBlock.onRouteChange(t, i, o), this.addBlockToTab("featuredMoons", "info", "featuredMoons"), o && o.isCanceled)) return;
    if (o && o.isCanceled) return;
    this._hideTab("toolbox");
    this.addBlockToTab("cameraView", "viewOptions", "camera");
    await this._cameraViewBlock.onRouteChange({
      entityInfo: e,
      defaultView: 1
    });
    o && o.isCanceled && t !== this._app.getView("feature")?.getCurrentTarget() || (this.determineViewOptionBlocksState(e.id, o), this.populateTabs(this._tabContent), this._isMobile && this._setUpMobileCollapse());
  }
  /** @eyes-analysis
   * 执行 onChildParentChange 对应的组件业务步骤；调用 this._app.getManager, this._app.pioneer.getScene, this.determineViewOptionBlocksState, this._app.getView, this.populateTabs。
   * 调用线索：this._app.getManager、this._app.getManager("scene").getHDToggleEntity、this._app.getManager("scene").updateHDTarget、this._app.getView、this._app.getView("object")?.getCurrentTarget等。
   */
  async onChildParentChange(t, e, i) {
    await this._app.getManager("scene").updateHDTarget(e, t);
    let s = this._app.getManager("scene").getHDToggleEntity();
    s || "Spacecraft" === e.category || (s = this._currentId);
    const n = this._app.pioneer.getScene("main").getEntity(t)?.getParent()?.getName();
    let o = s;
    s !== t && s !== n && (o = n);
    o !== t && (await this.determineViewOptionBlocksState(o));
    t === this._app.getView("object")?.getCurrentTarget() && (await this.determineViewOptionBlocksState(t), this.populateTabs(this._tabContent));
  }
  /** @eyes-analysis
   * 执行 determineToolboxBlocksState 对应的组件业务步骤；调用 this._compareSizeBlock.onRouteChange, this._distanceToolBlock.onRouteChange, SolarSystemSceneExports.Entity.getEntityNamesInGroup, this._moonsBlock.onRouteChange, this._telescopeModeBlock.onRouteChange, this.addBlockToTab。
   * 调用线索：Boolean、SolarSystemSceneExports.Entity.getEntityNamesInGroup、e.push、this._compareSizeBlock.onRouteChange、this._distanceToolBlock.onRouteChange等。
   */
  async determineToolboxBlocksState(t) {
    const e = [];
    const i = t?.displayName || t?.iauName;
    const s = "Spacecraft" === t?.category;
    false !== t.comparisonFeature && !("Landing site" === t.category) && (await this._compareSizeBlock.onRouteChange({
      entityId: t.id,
      link: "/compare",
      tooltipText: `See the relative size of ${i} compared to other ${s ? "spacecraft." : "celestial bodies."}`
    }), e.push("compareSize"));
    false !== t.distanceTool && (await this._distanceToolBlock.onRouteChange({
      entityId: t.id,
      link: "/distance",
      options: {
        keepTime: true
      },
      tooltipText: `Calculate the distance between ${i} and any other celestial body.`
    }), e.push("distanceTool"));
    if (Boolean(t.hasMoons) && SolarSystemSceneExports.Entity.getEntityNamesInGroup(t.id + ", moons")?.size > 1) {
      const i = t.displayName || t.iauName;
      await this._moonsBlock.onRouteChange({
        entityId: t.id,
        link: "/moons",
        updatedTitle: `Moons of ${i}`,
        tooltipText: `See ${i}'s featured moons.`
      });
      e.push("moons");
    }
    ("Planet" === t.category || "moon" === t.id) && (await this._telescopeModeBlock.onRouteChange({
      entityId: t.id,
      link: "/telescope",
      tooltipText: "Pick any location on the surface of the planet or moon to land there and see the sky from that spot."
    }), e.push("telescopeMode"));
    for (const t of e) this.addBlockToTab(t, "toolbox");
  }
  /** @eyes-analysis
   * 执行 determineViewOptionBlocksState 对应的组件业务步骤；调用 this._app.getManager, this.determineSurfaceMapBlockState, this.determineInstrumentFOVBlockState, this.determineLayersBlockState, this.determineTextureQualityBlockState, this.determineFeaturesBlockState。
   * 调用线索：this._app.getManager、this._app.getManager("content").getEntityInfo、this.determineFeaturesBlockState、this.determineInstrumentFOVBlockState、this.determineLayersBlockState等。
   */
  async determineViewOptionBlocksState(t, e = null) {
    const i = this._app.getManager("content").getEntityInfo(t);
    await this.determineSurfaceMapBlockState(t);
    await this.determineInstrumentFOVBlockState(t);
    await this.determineLayersBlockState(t, e);
    await this.determineTextureQualityBlockState(t);
    await this.determineFeaturesBlockState(t, i);
  }
  /** @eyes-analysis
   * 执行 determineSurfaceMapBlockState 对应的组件业务步骤；调用 this._app.getManager, this._app.pioneer.getScene, Manager.getEntityInfo, Manager.getSpheroidLayers, this.addBlockToTab, this._surfaceMapBlock.onRouteChange, this.removeBlockFromTab。
   * 调用线索：contentManager.getEntityInfo、contentManager.getSpheroidLayers、r.getComponent、r.getComponent(Pioneer.SpheroidLODComponent)?.isEnabled、this._app.getManager等。
   */
  async determineSurfaceMapBlockState(t) {
    const contentManager = this._app.getManager("content");
    const i = this._app.pioneer.getScene("main").getEntity(t)?.getParent()?.getName();
    const s = contentManager.getEntityInfo(t);
    const n = s?.displayName || s?.iauName || "";
    const r = this._app.pioneer.getScene("main").getEntity(t);
    if (!r || r.getComponent(Pioneer.SpheroidLODComponent) && !r.getComponent(Pioneer.SpheroidLODComponent)?.isEnabled()) return;
    const a = contentManager.getEntityInfo(i);
    let l = "";
    a && (l = a.displayName || a.iauName || "");
    void 0 !== contentManager.getSpheroidLayers(s?.id) ? (this.addBlockToTab("surfaceMap", "viewOptions", "textures"), await this._surfaceMapBlock.onRouteChange(s, n)) : void 0 !== contentManager.getSpheroidLayers(i) ? (this.addBlockToTab("surfaceMap", "viewOptions", "textures"), await this._surfaceMapBlock.onRouteChange(a, l, null, s)) : this.removeBlockFromTab("surfaceMap", "viewOptions", "textures");
  }
  /** @eyes-analysis
   * 执行 determineLayersBlockState 对应的组件业务步骤；调用 this._app.getManager, Manager.getContextualLayers, Manager.getEntityInfo, this._app.pioneer.getScene, this.addBlockToTab, this._layersBlock.onRouteChange, this._app.getView, Manager.getSpheroidLayers, this.removeBlockFromTab。
   * 调用线索：contentManager.getEntityInfo、contentManager.getSpheroidLayers、layerManager.getContextualLayers、o.includes、this._app.getManager等。
   */
  async determineLayersBlockState(t, e = null) {
    const contentManager = this._app.getManager("content");
    const layerManager = this._app.getManager("layer");
    const {
      currentView: currentView
    } = this._app.getManager("router");
    const o = layerManager.getContextualLayers(t);
    const r = contentManager.getEntityInfo(t);
    const a = this._app.pioneer.getScene("main").getEntity(t)?.getParent()?.getName();
    const l = contentManager.getEntityInfo(a);
    let c = "";
    if (l && (c = l.displayName || l.iauName || ""), 0 === o.length || o.includes("satelliteGroup")) {
      if ("event" !== currentView) if (0 !== layerManager.getContextualLayers(a).length) {
        if (this.addBlockToTab("layers", "viewOptions", "layers"), await this._layersBlock.onRouteChange(l, c, null, r), e && e.isCanceled && t !== this._app.getView("object")?.getCurrentTarget()) return;
      } else if (l && "Landing site" === l.category) {
        const n = this._app.getManager("scene").getParent(a);
        const o = contentManager.getEntityInfo(n);
        if (0 !== layerManager.getContextualLayers(n).length || void 0 !== contentManager.getSpheroidLayers(n)) {
          const i = n.displayName || n.iauName || "";
          if (this.addBlockToTab("layers", "viewOptions", "layers"), await this._layersBlock.onRouteChange(o, i), e && e.isCanceled && t !== this._app.getView("object")?.getCurrentTarget()) return;
        }
      } else this.removeBlockFromTab("layers", "viewOptions", "layers");
    } else if (this.addBlockToTab("layers", "viewOptions", "layers"), await this._layersBlock.onRouteChange(r), e && e.isCanceled && t !== this._app.getView("object")?.getCurrentTarget()) return;
  }
  /** @eyes-analysis
   * 执行 determineInstrumentFOVBlockState 对应的组件业务步骤；调用 this._app.getManager, Manager.getEntityInfo, this._instrumentFOVBlock.hasInstrumentsWithFOV, this.addBlockToTab, this._instrumentFOVBlock.onRouteChange, this.removeBlockFromTab。
   * 调用线索：contentManager.getEntityInfo、this._app.getManager、this._instrumentFOVBlock.hasInstrumentsWithFOV、this._instrumentFOVBlock.onRouteChange、this.addBlockToTab等。
   */
  async determineInstrumentFOVBlockState(t) {
    const contentManager = this._app.getManager("content");
    let i = t;
    let s = contentManager.getEntityInfo(t);
    const {
      currentView: currentView,
      currentRoute: currentRoute
    } = this._app.getManager("router");
    "event" === currentView && (i = currentRoute.params.spaceObject, s = contentManager.getEntityInfo(i));
    this._instrumentFOVBlock.hasInstrumentsWithFOV(i) ? (this.addBlockToTab("instrumentFOV", "viewOptions", "instruments"), await this._instrumentFOVBlock.onRouteChange(s)) : this.removeBlockFromTab("instrumentFOV", "viewOptions", "instruments");
  }
  /** @eyes-analysis
   * 执行 determineTextureQualityBlockState 对应的组件业务步骤；调用 this._app.getManager, this._app.pioneer.getScene, Manager.getEntityInfo, Manager.hasHD, Eyes.AppUtils.isiPhone, this.addBlockToTab, this._textureQualityBlock.onRouteChange, this.removeBlockFromTab, Eyes.AppUtils.isAppleDevice。
   * 调用线索：Eyes.AppUtils.isAppleDevice、Eyes.AppUtils.isiPhone、a.getComponent、a.getComponent(Pioneer.SpheroidLODComponent)?.isEnabled、contentManager.getEntityInfo等。
   */
  async determineTextureQualityBlockState(t) {
    const sceneManager = this._app.getManager("scene");
    const contentManager = this._app.getManager("content");
    const s = this._app.pioneer.getScene("main").getEntity(t)?.getParent()?.getName();
    const n = contentManager.getEntityInfo(t);
    const a = this._app.pioneer.getScene("main").getEntity(t);
    if (!a || a.getComponent(Pioneer.SpheroidLODComponent) && !a.getComponent(Pioneer.SpheroidLODComponent)?.isEnabled()) return;
    const l = this._app.getManager("scene").getCMTSEntity(t);
    const c = l?.getComponent(Pioneer.CMTSComponent);
    !sceneManager.hasHD(t) || Eyes.AppUtils.isiPhone() || c ? s && sceneManager.hasHD(s) && !Eyes.AppUtils.isiPhone() && !c ? (this.addBlockToTab("textureQuality", "viewOptions", "textures"), await this._textureQualityBlock.onRouteChange(contentManager.getEntityInfo(s))) : this.removeBlockFromTab("textureQuality", "viewOptions", "textures") : (this.addBlockToTab("textureQuality", "viewOptions", "textures"), await this._textureQualityBlock.onRouteChange(n));
    Eyes.AppUtils.isAppleDevice() && this.removeBlockFromTab("textureQuality", "viewOptions", "textures");
  }
  /** @eyes-analysis
   * 执行 determineFeaturesBlockState 对应的组件业务步骤；调用 this._app.getManager, Manager.getSpheroidFeatures, this.addBlockToTab, this._featuresBlock.onRouteChange, this.removeBlockFromTab。
   * 调用线索：contentManager.getSpheroidFeatures、r、this._app.getManager、this._app.getManager("scene").get、this._app.getManager("scene").get("main").getEntity等。
   */
  async determineFeaturesBlockState(t, e) {
    const contentManager = this._app.getManager("content");
    const {
      currentView: currentView
    } = this._app.getManager("router");
    const n = "event" === currentView;
    const o = this._app.getManager("scene").get("main").getEntity(e?.id)?.getParent()?.getName();
    const r = t => 0 !== contentManager.getSpheroidFeatures(t)?.length;
    r(t) || r(o) && !n ? (this.addBlockToTab("features", "viewOptions", "layers"), await this._featuresBlock.onRouteChange(e)) : this.removeBlockFromTab("features", "viewOptions", "layers");
  }
  /** @eyes-analysis
   * 执行 backRoute 对应的组件业务步骤；调用 this._app.getManager, Manager.getTimeUrl, Manager.getTimeRate。
   * 调用线索：this._app.getManager、this._app.getManager("router").navigate、timeManager.getTimeRate、timeManager.getTimeUrl。
   */
  backRoute() {
    const routerManager = this._app.getManager("router");
    let e = {};
    const timeManager = this._app.getManager("time");
    routerManager.query.time && timeManager && (e = {
      time: timeManager.getTimeUrl(),
      rate: timeManager.getTimeRate(),
      __remove: ["followId"]
    });
    this._app.getManager("router").navigate(e, this._backRoute);
  }
  /** @eyes-analysis
   * 执行 onClickShowCollapse 对应的组件业务步骤；调用 Eyes.AppUtils.isMobileMode, this.hideOverlay, this.hide, this.show。
   * 调用线索：Eyes.AppUtils.isMobileMode、this.hide、this.hideOverlay、this.show。
   */
  onClickShowCollapse() {
    this._state.isVisible ? this._state.isOverlay && Eyes.AppUtils.isMobileMode() ? this.hideOverlay() : this.hide() : this.show();
  }
  /** @eyes-analysis
   * 重排响应式界面；调用 super.resize, Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet, Eyes.AppUtils.isLandscape, this.selectTab, this.populateTabs, this._setUpMobileCollapse；写入 _isMobile, _isLandscape。
   * 状态写入：_isLandscape、_isMobile。
   * 调用线索：Eyes.AppUtils.isLandscape、Eyes.AppUtils.isMobile、Eyes.AppUtils.isTablet、super.resize、this._setUpMobileCollapse等。
   */
  resize() {
    super.resize();
    const {
      currentMainTab: currentMainTab,
      isExpanded: isExpanded
    } = this._state;
    const isMobile = this._isMobile;
    this._isMobile = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTablet();
    const isLandscape = this._isLandscape;
    this._isLandscape = Eyes.AppUtils.isLandscape();
    this.selectTab(currentMainTab);
    this._isMobile === isMobile && this._isLandscape === isLandscape || (this.populateTabs(this._tabContent, this._persistingBlocks), this._setUpMobileCollapse(isExpanded));
  }
  /** @eyes-analysis
   * 执行 onDragStart 对应的组件业务步骤；写入 _isDragging。
   * 状态写入：_isDragging。
   * 调用线索：t.preventDefault。
   */
  onDragStart(t) {
    this._isDragging = true;
    t.preventDefault();
  }
  /** @eyes-analysis
   * 执行 onDrag 对应的组件业务步骤。
   * 状态写入：element.style.height。
   * 调用线索：t.preventDefault。
   */
  onDrag(t) {
    if (!this._isDragging) return;
    t.preventDefault();
    const e = t.changedTouches[0];
    const i = window.innerHeight - e.pageY;
    this.element.style.height = `${i}px`;
  }
  /** @eyes-analysis
   * 执行 onDragEnd 对应的组件业务步骤；调用 this._snapHeights.value.reduce, Math.abs, this._snapHeights.value.indexOf, this.setState, this._setUpMobileCollapse；写入 _isDragging。
   * 状态写入：_isDragging、_snapHeights.index、element.style.height。
   * 调用线索：Math.abs、d.includes、new CustomEvent、parseInt、t.preventDefault等。
   */
  onDragEnd(t) {
    this._isDragging = false;
    t.preventDefault();
    const e = !d.includes(this._state.currentMainTab);
    const i = parseInt(this.element.style.height);
    const s = this._snapHeights.value.reduce((t, e, s) => Math.abs(e - i) < Math.abs(t - i) ? e : t);
    this._snapHeights.index = this._snapHeights.value.indexOf(s);
    this.element.style.height = `${s}px`;
    const n = 0 === this._snapHeights.index;
    const o = this._snapHeights.index === this._snapHeights.value.length - 1;
    this.setState({
      isExpanded: n,
      isExpandedClass: this._class.isExpanded[n],
      iconExpandClass: this._class.iconExpand[o ? "bottom" : "mid"],
      isCollapsed: o,
      isCollapsedClass: this._class.isCollapsed[o],
      iconCollapseClass: this._class.iconCollapse[n ? "top" : "mid"],
      subtabsVisible: o || !e ? "hidden" : "",
      tabsVisible: o ? "hidden" : ""
    });
    const customEvent = new CustomEvent("contentPanelCollapse", {
      detail: o
    });
    window.dispatchEvent(customEvent);
    this._setUpMobileCollapse();
  }
  /** @eyes-analysis
   * 执行 expand 对应的组件业务步骤；调用 Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet, this.setState, this._setUpMobileCollapse, this.toggleExpandCollapse。
   * 状态写入：_snapHeights.index、element.style.height。
   * 调用线索：Eyes.AppUtils.isMobile、Eyes.AppUtils.isTablet、d.includes、this._setUpMobileCollapse、this.setState等。
   */
  expand() {
    const t = !d.includes(this._state.currentMainTab);
    if (Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTablet()) {
      if (0 === this._snapHeights.index) return;
      this._snapHeights.index--;
      this.element.style.height = this._snapHeights.value[this._snapHeights.index] - this._adjustedMobileHeight + "px";
      const e = 0 === this._snapHeights.index;
      const i = this._snapHeights.index === this._snapHeights.value.length - 1;
      this.setState({
        isExpanded: e,
        isExpandedClass: this._class.isExpanded[e],
        iconExpandClass: this._class.iconExpand.mid,
        isCollapsed: false,
        isCollapsedClass: this._class.isCollapsed[false],
        iconCollapseClass: this._class.iconCollapse[e ? "top" : "mid"],
        subtabsVisible: i || !t ? "hidden" : "",
        tabsVisible: i ? "hidden" : ""
      });
      this._setUpMobileCollapse();
    } else this.toggleExpandCollapse();
  }
  /** @eyes-analysis
   * 执行 collapse 对应的组件业务步骤；调用 Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet, this.setState, this._setUpMobileCollapse, this.toggleExpandCollapse。
   * 状态写入：_snapHeights.index、element.style.height。
   * 调用线索：Eyes.AppUtils.isMobile、Eyes.AppUtils.isTablet、d.includes、this._setUpMobileCollapse、this.setState等。
   */
  collapse() {
    const t = !d.includes(this._state.currentMainTab);
    if (Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTablet()) {
      if (this._snapHeights.index === this._snapHeights.value.length - 1) return;
      this._snapHeights.index++;
      this.element.style.height = `${this._snapHeights.value[this._snapHeights.index]}px`;
      const e = this._snapHeights.index === this._snapHeights.value.length - 1;
      this.setState({
        isExpanded: false,
        isExpandedClass: this._class.isExpanded[false],
        iconExpandClass: this._class.iconExpand[e ? "bottom" : "mid"],
        isCollapsed: e,
        isCollapsedClass: this._class.isCollapsed[e],
        iconCollapseClass: this._class.iconCollapse.mid,
        subtabsVisible: e || !t ? "hidden" : "",
        tabsVisible: e ? "hidden" : ""
      });
      this._setUpMobileCollapse();
    } else this.toggleExpandCollapse();
  }
  /** @eyes-analysis
   * 执行 toggleExpandCollapse 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
   * 调用线索：this.setState、this.triggerCallbacks。
   */
  toggleExpandCollapse() {
    const t = !this._state.isExpanded;
    const e = !this._state.isCollapsed;
    this.setState({
      isExpanded: t,
      isExpandedClass: this._class.isExpanded[t],
      isCollapsed: e,
      isCollapsedClass: this._class.isCollapsed[e]
    }, () => {
      this.triggerCallbacks("expandtoggle", [t]);
    });
  }
  /** @eyes-analysis
   * 执行 show 对应的组件业务步骤；调用 this._app.getManager, super.show, this.setEnabled, this._components.forEach, this._app.getComponent, this.triggerCallbacks, Eyes.AppUtils.addScrollbar, this._element.querySelector；写入 _scrollbar。
   * 状态写入：_scrollbar。
   * 调用线索：Eyes.AppUtils.addScrollbar、super.show、this._app.getComponent、this._app.getComponent("collapsibleMenu").collapse、this._app.getComponent(t).setEnabled等。
   */
  show() {
    false !== this._app.getManager("layer").getLayer("ui").visible && (super.show(), this.setEnabled(true), this._components.forEach(t => {
      void 0 !== this._blockState[t] && null !== this._blockState[t] && this._app.getComponent(t).setEnabled(this._blockState[t]);
    }), this.triggerCallbacks("expandtoggle", [true]), this._state.isCollapsed && this._state.isVisible && this._app.getComponent("collapsibleMenu").collapse(), null === this._scrollbar && (this._scrollbar = Eyes.AppUtils.addScrollbar(this._element.querySelector("#content-main"))));
  }
  /** @eyes-analysis
   * 执行 hide 对应的组件业务步骤；调用 super.hide, this.triggerCallbacks。
   * 调用线索：super.hide、this.triggerCallbacks。
   */
  hide() {
    super.hide();
    this.triggerCallbacks("expandtoggle", [false]);
  }
  /** @eyes-analysis
   * 执行 _delayedResize 对应的组件业务步骤；调用 this.resize；写入 _adjustedMobileHeight。
   * 状态写入：_adjustedMobileHeight。
   * 调用线索：clearInterval、document.getElementById、i?.getElementsByClassName、isNaN、parseFloat等。
   */
  _delayedResize() {
    let t = 1;
    const e = setInterval(() => {
      const i = document.getElementById("overview-block");
      const s = i?.getElementsByClassName("title")[0];
      if (s && 10 === t) {
        const t = parseFloat(window.getComputedStyle(s).height);
        isNaN(t) || (this._adjustedMobileHeight = parseFloat(window.getComputedStyle(i).height), clearInterval(e), this.resize());
      }
      t++;
    }, 100);
  }
  /** @eyes-analysis
   * 执行 _getParentTabOfSubtab 对应的组件业务步骤；调用 Object.entries, Object.keys。
   * 调用线索：Object.entries、Object.keys、Object.keys(i.subtabs).includes。
   */
  _getParentTabOfSubtab(t) {
    for (const [e, i] of Object.entries(this._tabContent)) if (Object.keys(i.subtabs).includes(t)) return e;
    return "";
  }
  /** @eyes-analysis
   * 执行 _calcTabPanelBottomMargin 对应的组件业务步骤；调用 Array.from, this._element.style.setProperty。
   * 调用线索：Array.from、Array.from(e).find、d.includes、document.querySelectorAll、this._element.style.setProperty。
   */
  _calcTabPanelBottomMargin() {
    const {
      currentMainTab: currentMainTab
    } = this._state;
    const e = document.querySelectorAll("ul");
    const i = Array.from(e).find(t => "sub-tab-container" === t.id);
    const s = Array.from(e).find(t => "tab-container" === t.id);
    const n = d.includes(currentMainTab) ? s?.offsetHeight : s?.offsetHeight + i?.offsetHeight;
    this._element.style.setProperty("--content-bottom-margin", "" + (s ? `${n > 0 ? n : 112}px` : "10em"));
    this._state.isCollapsed && this._element.style.setProperty("--content-bottom-margin", "0");
  }
  /** @eyes-analysis
   * 执行 _getBlockHeight 对应的组件业务步骤。
   * 调用线索：clearInterval、console.warn、e、isNaN、new Promise等。
   */
  async _getBlockHeight(t) {
    return new Promise(e => {
      const i = setInterval(() => {
        const s = parseFloat(window.getComputedStyle(t).height);
        isNaN(s) || (clearInterval(i), e(parseFloat(window.getComputedStyle(t).height)));
      }, 25);
    }).then(t => t).catch(t => {
      console.warn("Could not calculate block height: ", t);
    });
  }
  /** @eyes-analysis
   * 执行 _calculateAdjustedMobileHeight 对应的组件业务步骤；调用 this._getBlockHeight, this._determineCollapsedBlockVisiblity, Array.from, Element.style.setProperty, this._app.getComponent；写入 _adjustedMobileHeight。
   * 状态写入：_adjustedMobileHeight。
   * 调用线索：Array.from、document.documentElement.style.setProperty、isNaN、this._app.getComponent、this._app.getComponent("collapsibleMenu")._element.style.setProperty等。
   */
  async _calculateAdjustedMobileHeight() {
    if (!this._isMobile) return;
    const {
      currentMainTab: currentMainTab
    } = this._state;
    const e = this._children[`${currentMainTab}Panel`];
    let i = 0;
    const adjustedMobileHeight = (await this._getBlockHeight(this._overviewBlock.element)) ?? 95;
    adjustedMobileHeight > 0 && adjustedMobileHeight !== this._adjustedMobileHeight && (this._adjustedMobileHeight = adjustedMobileHeight);
    await this._determineCollapsedBlockVisiblity();
    const n = Array.from(e.children);
    if ("toolbox" !== currentMainTab) for (let t = 0; t < n.length; t++) this._isLandscape || (i += await this._getBlockHeight(n[t]));
    const o = this._snapHeights.index === this._snapHeights.value.length - 1;
    this._adjustedMobileHeight !== i && !isNaN(i) && o && (this._adjustedMobileHeight += i);
    const r = adjustedMobileHeight / 3;
    const a = o ? this._adjustedMobileHeight - adjustedMobileHeight + r : 0;
    const l = this._adjustedMobileHeight > adjustedMobileHeight;
    document.documentElement.style.setProperty("--collapsible-bottom-margin", `${l ? a : r}px`);
    this._app.getComponent("collapsibleMenu")._element.style.setProperty("--collapsible-bottom-margin", `${this._adjustedMobileHeight}px`);
  }
  /** @eyes-analysis
   * 执行 _setUpMobileCollapse 对应的组件业务步骤；调用 this._calculateAdjustedMobileHeight, Eyes.AppUtils.isLandscape, this._snapHeights.value.push, this._calcTabPanelBottomMargin, this.element.classList.add, this.element.classList.remove, this.setState, this.populateTabs, this.triggerCallbacks。
   * 状态写入：_snapHeights.index、_snapHeights.value、element.style.height。
   * 调用线索：Eyes.AppUtils.isLandscape、d.includes、document.getElementById、i.at、parseInt等。
   */
  async _setUpMobileCollapse(t = false) {
    await this._calculateAdjustedMobileHeight();
    const e = document.getElementById("dynamic-ui");
    const i = window.getComputedStyle(e).getPropertyValue("grid-template-rows").split(" ");
    const s = this._isLandscape ? window.innerHeight : window.innerHeight - parseInt(i[0]);
    const n = this._adjustedMobileHeight || parseInt(i.at(-1));
    const o = parseInt(i.at(-3));
    const a = Eyes.AppUtils.isLandscape() ? this._adjustedMobileHeight / 4 : this._adjustedMobileHeight / 8;
    if (this._snapHeights.value = [], this._snapHeights.value.push(s), !Eyes.AppUtils.isLandscape() && this._snapHeights.value.push(o + n + a + this._adjustedMobileHeight), this._snapHeights.value.push(n + a), this._calcTabPanelBottomMargin(), this._isMobile) {
      let {
        isCollapsed: isCollapsed,
        isExpanded: isExpanded,
        currentMainTab: currentMainTab
      } = this._state;
      const n = !d.includes(currentMainTab);
      (isCollapsed || t) && (this._snapHeights.index = this._snapHeights.value.length - 1);
      isCollapsed = this._snapHeights.index === this._snapHeights.value.length - 1;
      isExpanded = !isCollapsed && !t;
      const o = 0 === this._snapHeights.index;
      this.element.style.height = `${this._snapHeights.value[this._snapHeights.index]}px`;
      this._isLandscape && o ? this.element.classList.add("overlay") : this.element.classList.remove("overlay");
      this.setState({
        isExpanded: isExpanded,
        isExpandedClass: this._class.isExpanded[o],
        iconExpandClass: this._class.iconExpand[isCollapsed ? "bottom" : "mid"],
        isCollapsed: isCollapsed,
        isCollapsedClass: this._class.isCollapsed[isCollapsed],
        iconCollapseClass: this._class.iconCollapse[o ? "top" : "mid"],
        subtabsVisible: isCollapsed || !n ? "hidden" : "",
        tabsVisible: isCollapsed ? "hidden" : ""
      });
      isExpanded && this.populateTabs(this._tabContent);
    } else {
      this.element.style.height = "auto";
      this._snapHeights.index = -1;
      const t = !this._state.isCollapsed;
      this.setState({
        isExpanded: t,
        isExpandedClass: this._class.isExpanded[t],
        iconExpandClass: this._class.iconExpand.left,
        iconCollapseClass: this._class.iconCollapse.left,
        subtabsVisible: "hidden",
        tabsVisible: ""
      });
    }
    this.triggerCallbacks("expandtoggle", [this._state.isExpanded]);
  }
  /** @eyes-analysis
   * 执行 _determineCollapsedBlockVisiblity 对应的组件业务步骤；调用 this._app.getComponent, Blocks.includes, this._element.style.setProperty。
   * 调用线索：i.appendChild、i.contains、i.removeChild、new Promise、o.forEach等。
   */
  _determineCollapsedBlockVisiblity() {
    const {
      selectedSubtab: selectedSubtab,
      currentMainTab: currentMainTab
    } = this._state;
    const i = this._children[`${currentMainTab}Panel`];
    const s = this._tabContent[`${currentMainTab}`].subtabs[`${selectedSubtab}`];
    const n = this._snapHeights.index === this._snapHeights.value.length - 1;
    const o = ["replay"];
    const r = s?.filter(t => !o.includes(t));
    return new Promise(t => {
      r && r.forEach(t => {
        const e = this._app.getComponent(`${t}Block`).element;
        n ? i.contains(e) && i.removeChild(e) : i.appendChild(e);
      });
      o && o.forEach(async t => {
        const e = this._app.getComponent(`${t}Block`).element;
        let o = false;
        for (const e in this._tabContent) if (this._tabContent[e].contentBlocks.includes(t)) {
          o = true;
          break;
        }
        !s?.includes(t) && i.contains(e) && i.removeChild(e);
        n ? (o && i.appendChild(e), this._element.style.setProperty("--custom-overview-border", o ? "1px solid #ffffff30" : "none")) : (!s?.includes(t) && i.contains(e) && i.removeChild(e), this._element.style.setProperty("--custom-overview-border", "none"));
      });
      t(true);
    });
  }
  /** @eyes-analysis
   * 执行 _disableAllComponents 对应的组件业务步骤；调用 this._components.forEach, this._app.getComponent。
   * 状态写入：_blockState[t]。
   * 调用线索：this._app.getComponent、this._app.getComponent(t).setEnabled、this._components.forEach。
   */
  _disableAllComponents() {
    this._components.forEach(t => {
      null !== this._blockState[t] && void 0 !== this._blockState[t] && (this._blockState[t] = false);
      this._app.getComponent(t).setEnabled(false);
    });
  }
  /** @eyes-analysis
   * 执行 clearPanel 对应的组件业务步骤；调用 this._disableAllComponents, this.setState。
   * 状态写入：_defaultState.title。
   * 调用线索：this._disableAllComponents、this.setState。
   */
  clearPanel(t = null) {
    if (this._disableAllComponents(), t) {
      const e = `Loading ${t}...`;
      this.setState({
        title: e
      });
      this._defaultState.title = e;
    }
  }
  /** @eyes-analysis
   * 执行 reset 对应的组件业务步骤；调用 this.setState, this._app.getComponent, Element.style.setProperty；写入 _currentId。
   * 状态写入：_currentId。
   * 调用线索：document.documentElement.style.setProperty、this._app.getComponent、this._app.getComponent("collapsibleMenu")._element.style.setProperty、this.setState。
   */
  reset() {
    this.setState(this._defaultState);
    this._currentId = "";
    this._app.getComponent("collapsibleMenu")._element.style.setProperty("--collapsible-bottom-margin", "1em");
    document.documentElement.style.setProperty("--collapsible-bottom-margin", "1em");
  }
  /** @eyes-analysis
   * 卸载 DOM 并取消业务订阅；调用 this.reset, super.__disable。
   * 调用线索：super.__disable、this.reset。
   */
  __disable() {
    this.reset();
    super.__disable();
  }
}
ContentPanel.html = getContentPanelTemplate();
export { ContentPanel };
