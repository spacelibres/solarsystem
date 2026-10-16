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
const defaultTabContent = {
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
const tabsWithoutSubtabs = ["toolbox"];
const defaultMainTab = "info";
/* 面板拥有对象/事件/特征内容块与 tab 拓扑，路由刷新先停用旧块并克隆默认拓扑，再按资源能力增删块。加载完成后的对象阶段单独补入相机与贴图选项，多处取消检查还核对当前目标。移动布局把 overview 和 replay 作为持久块处理，拖动结束吸附到计算出的高度档位；桌面改用展开/折叠状态。routeFlag、refreshFlag 为原有未读取参数，保留签名但不推断业务用途。 */
class ContentPanel extends Eyes.BaseComponent {
  constructor(app, options) {
    super(app, null, {
      title: "",
      isOverlay: false,
      isOverlayClass: "",
      backButtonVisibleClass: "",
      backButtonText: "Back",
      scrollToTopVisible: "hidden",
      subtabsVisible: "hidden",
      ...options
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
    const tabVisibilityState = Object.keys(defaultTabContent).reduce((visibilityState, tabName) => ({
      ...visibilityState,
      [tabName + "TabVisibleClass"]: this._class.isVisible[true]
    }), {});
    const isCompact = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTablet();
    this.setState({
      ...tabVisibilityState,
      selectedTab: null,
      selectedSubtab: null,
      currentMainTab: defaultMainTab,
      infoSelectedClass: "",
      toolboxSelectedClass: "",
      viewOptionsSelectedClass: "",
      isExpanded: !isCompact,
      isExpandedClass: this._class.isExpanded[!isCompact],
      iconExpandClass: this._class.iconExpand[isCompact ? "mid" : "left"],
      isCollapsed: isCompact,
      isCollapsedClass: this._class.isCollapsed[isCompact],
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
  getScrollbar() {
    return this._scrollbar;
  }
  _showTab(tabName) {
    this.setState({
      [tabName + "TabVisibleClass"]: this._class.isVisible[true]
    });
  }
  _hideTab(tabName) {
    this.setState({
      [tabName + "TabVisibleClass"]: this._class.isVisible[false]
    });
  }
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
    this._tabContent = Eyes.AppUtils.deepClone(defaultTabContent);
    this.setState({
      isCollapsed: this._isMobile
    });
    this._isMobile && this._app.getComponent("collapsibleMenu").collapse();
    this.resize();
  }
  _onRouteChange(currentId, routeParts) {
    this.isEnabled() && (this._disableAllComponents(), this._defaultState.title = "", this._currentId = currentId, this.setupBackButton(routeParts), this._tabContent = Eyes.AppUtils.deepClone(defaultTabContent), this.selectTab(defaultMainTab), this._persistingBlocks = []);
  }
  getParentTabOfSubtab(subtabName) {
    for (const [tabName, tabInfo] of Object.entries(this._tabContent)) if (Object.keys(tabInfo.subtabs).includes(subtabName)) return tabName;
    return "";
  }
  selectTab(tabName, isMainTab = true) {
    const isCurrentMainTab = tabName === this._state.currentMainTab;
    const parentTabName = this.getParentTabOfSubtab(tabName);
    const mainTabName = isMainTab ? tabName : parentTabName;
    let tabContent = this._tabContent;
    isMainTab && !this._isMobile || (tabContent = this._tabContent[mainTabName].subtabs);
    const defaultSubtabName = !tabsWithoutSubtabs.includes(mainTabName) ? Object.keys(tabContent)[0] : null;
    const selectedSubtabName = isMainTab ? defaultSubtabName : tabName;
    this.setState({
      selectedTab: tabName,
      selectedSubtab: selectedSubtabName,
      currentMainTab: mainTabName
    });
    const hasSubtabs = !tabsWithoutSubtabs.includes(this._state.currentMainTab);
    this.setState({
      subtabsVisible: hasSubtabs ? "" : "hidden"
    });
    isCurrentMainTab || (this._isMobile && this._calcTabPanelBottomMargin(), this.populateTabs(this._tabContent, this._persistingBlocks));
    const tabNames = isMainTab ? Object.keys(this._tabContent) : Object.keys(tabContent);
    for (const candidateTabName of tabNames) {
      const isSelected = candidateTabName === tabName;
      const tabElement = this._children[`${candidateTabName}Tab`] ?? document.getElementById(`${candidateTabName}Tab`);
      tabElement?.classList.toggle("selected", isSelected);
      const panelElement = this._children[`${isMainTab ? candidateTabName : mainTabName}Panel`] ?? document.getElementById(`${isMainTab ? candidateTabName : mainTabName}Panel`);
      isMainTab && panelElement?.classList.toggle("selected", isSelected);
    }
  }
  _onTabSelect(clickEvent) {
    const {
      tab: tab
    } = clickEvent.target.dataset;
    const isMainTab = !clickEvent.target.parentElement.classList.contains("sub-tab-nav");
    this.selectTab(tab, isMainTab);
  }
  addBlockToTab(blockName, tabName = defaultMainTab, subtabName = null) {
    const subtabs = this._tabContent[tabName].subtabs || {};
    subtabName && (subtabs[subtabName] && !subtabs[subtabName].includes(blockName) ? subtabs[subtabName].push(blockName) : subtabs[subtabName] = [blockName]);
    this._tabContent[tabName].contentBlocks.includes(blockName) || (this._tabContent[tabName].contentBlocks.push(blockName), this._blockState[`${blockName}Block`] = true);
  }
  removeBlockFromTab(blockName, tabName = defaultMainTab, subtabName = null) {
    if (subtabName && delete this._tabContent[tabName].subtabs[blockName], this._tabContent[tabName].contentBlocks.includes(blockName)) {
      const blockIndex = this._tabContent[tabName].contentBlocks.indexOf(blockName);
      this._tabContent[tabName].contentBlocks.splice(blockIndex, 1);
    }
    this._blockState[`${blockName}Block`] = false;
  }
  populateTabs(tabs, persistingBlocks = []) {
    const {
      selectedSubtab: selectedSubtab,
      currentMainTab: currentMainTab
    } = this._state;
    const panelElement = this._children[`${currentMainTab}Panel`];
    if (panelElement && panelElement.firstChild) for (; panelElement.firstChild;) panelElement.removeChild(panelElement.firstChild);
    if (this._isMobile) {
      if (this.createSubtabHTML(), this._state.isCollapsed) return;
    } else if (this._children.tabGroup.contains(this._overviewBlock.element)) {
      this._overviewBlock.element.parentElement.removeChild(this._overviewBlock.element);
    }
    (this._isMobile && selectedSubtab ? tabs[currentMainTab].subtabs[selectedSubtab] : tabs[currentMainTab].contentBlocks).forEach(blockName => {
      const blockComponent = this._app.getComponent(`${blockName}Block`);
      panelElement.appendChild(blockComponent.element);
    });
    persistingBlocks.length && !this._isMobile && persistingBlocks.forEach(persistingBlock => {
      const blockComponent = persistingBlock.block;
      const insertIndex = "end" === persistingBlock.index ? panelElement.children.length : persistingBlock.index;
      panelElement.insertBefore(blockComponent.element, panelElement.children[insertIndex]);
    });
  }
  createSubtabHTML() {
    if (this._overviewBlock?.element) {
      const overviewNextSibling = this._overviewBlock.element.nextElementSibling;
      if ("content-main" !== overviewNextSibling?.id) {
        const mainContent = Array.from(this._children.tabGroup.children).find(childElement => "content-main" === childElement?.id);
        this._children.tabGroup.insertBefore(this._overviewBlock.element, mainContent);
      }
    }
    const {
      subTabNav: subTabNav
    } = this._children;
    const {
      currentMainTab: currentMainTab
    } = this._state;
    const orderedEvents = this._app.getManager("content").context.orderedEvents;
    const hasEvents = Object.keys(orderedEvents).length > 0;
    const subtabNames = Object.keys(this._tabContent[currentMainTab].subtabs);
    if (subtabNames) {
      const firstSubtabName = subtabNames[0];
      const selectedSubtabName = null !== this._state.selectedSubtab && subtabNames.includes(this._state.selectedSubtab) ? this._state.selectedSubtab : firstSubtabName;
      subTabNav.innerHTML = "";
      subtabNames.forEach(subtabName => {
        const subtabElement = document.getElementById(`${subtabName}Tab`) || document.createElement("li");
        subtabElement.setAttribute("id", `${subtabName}Tab`);
        subtabElement.setAttribute("data-tab", subtabName);
        let subtabLabel = subtabName.split(/(?=[A-Z])/).join(" ");
        subtabLabel = subtabLabel.charAt(0).toUpperCase() + subtabLabel.slice(1);
        hasEvents && "events" === subtabName && (subtabLabel += ` (${orderedEvents.length})`);
        subtabElement.appendChild(document.createTextNode(subtabLabel));
        subtabElement.onclick = this._onTabSelect;
        subTabNav.appendChild(subtabElement);
        this._children[`${currentMainTab}Tab`].classList.toggle("selected", Object.keys(this._tabContent[currentMainTab].subtabs).includes(firstSubtabName));
        subtabElement.classList.toggle("selected", subtabName === selectedSubtabName);
      });
      this.setState({
        selectedSubtab: selectedSubtabName
      });
    }
  }
  async onQueryChange(queryParams) {
    await this._cameraViewBlock.onQueryChange(queryParams);
  }
  setupBackButton(routeParts) {
    if (this._app.getManager("router").configs.locked || routeParts?.length <= 1) this._backButtonVisibleClass = "hidden";else {
      if (routeParts && routeParts.length > 1) {
        this._backRoute = "";
        for (let routePartIndex = 0; routePartIndex < routeParts.length - 1; routePartIndex++) this._backRoute += "/" + routeParts[routePartIndex];
      }
      this._backButtonVisibleClass = "visible";
    }
  }
  async onRouteChangeEvent(entityId, eventId, eventInfo, eventDescription, orderedEvents, cancelToken, routeParts) {
    this._onRouteChange(entityId, routeParts);
    const entityInfo = this._app.getManager("content").getEntityInfo(entityId);
    if (null !== eventDescription) {
      if (await this._overviewBlock.onRouteChange(entityId, eventInfo, eventDescription), orderedEvents && (this._replayBlock.onRouteChange(entityId, eventId, eventInfo, orderedEvents, cancelToken), this.addBlockToTab("replay", "info", "about"), this._delayedResize()), eventDescription && (await this._descriptionBlock.onRouteChange(entityId, eventDescription), this.addBlockToTab("description", "info", "about")), cancelToken && cancelToken.isCanceled && entityId !== this._app.getView("object")?.getCurrentTarget()) return;
    } else this.removeBlockFromTab("description", "info", "about");
    if (orderedEvents) {
      if (this._eventsBlock.onRouteChange(entityId, orderedEvents, eventInfo), this.addBlockToTab("events", "info", "events"), cancelToken && cancelToken.isCanceled && entityId !== this._app.getView("event")?._target) return;
    } else this.removeBlockFromTab("events", "info", "events");
    eventDescription.related.length ? (await this._relatedBlock.onRouteChange("Related", eventDescription.related, [], cancelToken), this.addBlockToTab("related", "info", "related")) : this.removeBlockFromTab("related", "info", "related");
    const toolboxTab = "toolbox";
    if (this._hideTab(toolboxTab), this._state.selectedTab === toolboxTab) {
      const nextTab = defaultMainTab;
      this.selectTab(nextTab);
    }
    this.addBlockToTab("cameraView", "viewOptions", "camera");
    await this._cameraViewBlock.onRouteChange({
      entityInfo: entityInfo
    });
    await this.determineViewOptionBlocksState(eventInfo.target, cancelToken);
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
  async onRouteChangeObject(entityId, entityInfo, entityDescription, events, featuredStories, cancelToken, routeParts, routeFlag = false) {
    let effectiveDescription = entityDescription;
    this._onRouteChange(entityId, routeParts);
    const {
      locked: locked
    } = this._app.getManager("router").configs;
    if (await this._overviewBlock.onRouteChange(entityId, entityInfo, entityDescription), this._delayedResize(), "Landing site" === entityInfo.category) {
      const spacecraftId = entityInfo.id.split("_landing_site")[0];
      effectiveDescription = await this._app.getManager("content").getEntityDesc(spacecraftId);
    }
    if (null !== effectiveDescription && (this.setState({
      title: effectiveDescription.title
    }), this._defaultState.title = effectiveDescription.title, await this._descriptionBlock.onRouteChange(entityId, effectiveDescription), this.addBlockToTab("description", "info", "about"), cancelToken && cancelToken.isCanceled && entityId !== this._app.getView("object")?.getCurrentTarget())) return;
    if (events ? (this._eventsBlock.onRouteChange(entityId, events), this.addBlockToTab("events", "info", "events")) : this.removeBlockFromTab("events", "info", "events"), !locked && effectiveDescription?.related?.length > 0) {
      if (await this._relatedBlock.onRouteChange("Related", effectiveDescription.related, featuredStories, cancelToken), this.addBlockToTab("related", "info", "related"), cancelToken && cancelToken.isCanceled && entityId !== this._app.getView("object")?.getCurrentTarget()) return;
    } else this.removeBlockFromTab("related", "info", "related");
    const toolboxTab = "toolbox";
    this._app.getManager("content").hasLanded(entityInfo) ? this._hideTab(toolboxTab) : (await this.determineToolboxBlocksState(entityInfo), this._showTab(toolboxTab));
    this._isMobile && this._setUpMobileCollapse();
  }
  async onRouteChangeObjectLoaded(entityId, entityInfo, entityDescription, events, featuredStories, routeParams, routeParts) {
    const {
      cancelToken: cancelToken
    } = routeParams;
    cancelToken && cancelToken.isCanceled && entityId !== this._app.getView("object")?.getCurrentTarget() || !this._app.getManager("router").configs.locked && null !== entityDescription && void 0 !== entityDescription.related && entityDescription.related.length > 0 && (await this._relatedBlock.onRouteChange("Related", entityDescription.related, featuredStories, cancelToken), cancelToken && cancelToken.isCanceled && entityId !== this._app.getView("object")?.getCurrentTarget()) || cancelToken && cancelToken.isCanceled && entityId !== this._app.getView("object")?.getCurrentTarget() || (this.addBlockToTab("cameraView", "viewOptions", "camera"), await this._cameraViewBlock.onRouteChange({
      entityInfo: entityInfo
    }), cancelToken && cancelToken.isCanceled && entityId !== this._app.getView("object")?.getCurrentTarget() || (this.determineViewOptionBlocksState(entityInfo.id, cancelToken), this.populateTabs(this._tabContent)));
  }
  async onRouteChangeFeature(entityId, entityInfo, featureInfo, featureDescription, cancelToken, routeParts) {
    this._onRouteChange(entityId, routeParts);
    const isMoonsFeature = "moons" === routeParts[routeParts.length - 1];
    const moonCount = SolarSystemSceneExports.Entity.getEntityNamesInGroup(entityId + ", moons")?.size;
    if (await this._overviewBlock.onRouteChange(entityId, featureDescription, isMoonsFeature ? `${moonCount} Moons` : `Feature of ${entityInfo?.displayName || entityInfo?.iauName}`), this._delayedResize(), featureDescription && (await this._descriptionBlock.onRouteChange(entityId, featureDescription), this.addBlockToTab("description", "info", "about")), isMoonsFeature && featureInfo.initial && featureInfo.initial.length > 0 && (await this._featuredMoonsBlock.onRouteChange(entityId, featureInfo, cancelToken), this.addBlockToTab("featuredMoons", "info", "featuredMoons"), cancelToken && cancelToken.isCanceled)) return;
    if (cancelToken && cancelToken.isCanceled) return;
    this._hideTab("toolbox");
    this.addBlockToTab("cameraView", "viewOptions", "camera");
    await this._cameraViewBlock.onRouteChange({
      entityInfo: entityInfo,
      defaultView: 1
    });
    cancelToken && cancelToken.isCanceled && entityId !== this._app.getView("feature")?.getCurrentTarget() || (this.determineViewOptionBlocksState(entityInfo.id, cancelToken), this.populateTabs(this._tabContent), this._isMobile && this._setUpMobileCollapse());
  }
  async onChildParentChange(entityId, entityInfo, refreshFlag) {
    await this._app.getManager("scene").updateHDTarget(entityInfo, entityId);
    let hdEntityId = this._app.getManager("scene").getHDToggleEntity();
    hdEntityId || "Spacecraft" === entityInfo.category || (hdEntityId = this._currentId);
    const parentEntityId = this._app.pioneer.getScene("main").getEntity(entityId)?.getParent()?.getName();
    let viewOptionsEntityId = hdEntityId;
    hdEntityId !== entityId && hdEntityId !== parentEntityId && (viewOptionsEntityId = parentEntityId);
    viewOptionsEntityId !== entityId && (await this.determineViewOptionBlocksState(viewOptionsEntityId));
    entityId === this._app.getView("object")?.getCurrentTarget() && (await this.determineViewOptionBlocksState(entityId), this.populateTabs(this._tabContent));
  }
  async determineToolboxBlocksState(entityInfo) {
    const toolboxBlocks = [];
    const entityTitle = entityInfo?.displayName || entityInfo?.iauName;
    const isSpacecraft = "Spacecraft" === entityInfo?.category;
    false !== entityInfo.comparisonFeature && !("Landing site" === entityInfo.category) && (await this._compareSizeBlock.onRouteChange({
      entityId: entityInfo.id,
      link: "/compare",
      tooltipText: `See the relative size of ${entityTitle} compared to other ${isSpacecraft ? "spacecraft." : "celestial bodies."}`
    }), toolboxBlocks.push("compareSize"));
    false !== entityInfo.distanceTool && (await this._distanceToolBlock.onRouteChange({
      entityId: entityInfo.id,
      link: "/distance",
      options: {
        keepTime: true
      },
      tooltipText: `Calculate the distance between ${entityTitle} and any other celestial body.`
    }), toolboxBlocks.push("distanceTool"));
    if (Boolean(entityInfo.hasMoons) && SolarSystemSceneExports.Entity.getEntityNamesInGroup(entityInfo.id + ", moons")?.size > 1) {
      const moonParentTitle = entityInfo.displayName || entityInfo.iauName;
      await this._moonsBlock.onRouteChange({
        entityId: entityInfo.id,
        link: "/moons",
        updatedTitle: `Moons of ${moonParentTitle}`,
        tooltipText: `See ${moonParentTitle}'s featured moons.`
      });
      toolboxBlocks.push("moons");
    }
    ("Planet" === entityInfo.category || "moon" === entityInfo.id) && (await this._telescopeModeBlock.onRouteChange({
      entityId: entityInfo.id,
      link: "/telescope",
      tooltipText: "Pick any location on the surface of the planet or moon to land there and see the sky from that spot."
    }), toolboxBlocks.push("telescopeMode"));
    for (const blockName of toolboxBlocks) this.addBlockToTab(blockName, "toolbox");
  }
  async determineViewOptionBlocksState(entityId, cancelToken = null) {
    const entityInfo = this._app.getManager("content").getEntityInfo(entityId);
    await this.determineSurfaceMapBlockState(entityId);
    await this.determineInstrumentFOVBlockState(entityId);
    await this.determineLayersBlockState(entityId, cancelToken);
    await this.determineTextureQualityBlockState(entityId);
    await this.determineFeaturesBlockState(entityId, entityInfo);
  }
  async determineSurfaceMapBlockState(entityId) {
    const contentManager = this._app.getManager("content");
    const parentEntityId = this._app.pioneer.getScene("main").getEntity(entityId)?.getParent()?.getName();
    const entityInfo = contentManager.getEntityInfo(entityId);
    const entityTitle = entityInfo?.displayName || entityInfo?.iauName || "";
    const sceneEntity = this._app.pioneer.getScene("main").getEntity(entityId);
    if (!sceneEntity || sceneEntity.getComponent(Pioneer.SpheroidLODComponent) && !sceneEntity.getComponent(Pioneer.SpheroidLODComponent)?.isEnabled()) return;
    const parentInfo = contentManager.getEntityInfo(parentEntityId);
    let parentTitle = "";
    parentInfo && (parentTitle = parentInfo.displayName || parentInfo.iauName || "");
    void 0 !== contentManager.getSpheroidLayers(entityInfo?.id) ? (this.addBlockToTab("surfaceMap", "viewOptions", "textures"), await this._surfaceMapBlock.onRouteChange(entityInfo, entityTitle)) : void 0 !== contentManager.getSpheroidLayers(parentEntityId) ? (this.addBlockToTab("surfaceMap", "viewOptions", "textures"), await this._surfaceMapBlock.onRouteChange(parentInfo, parentTitle, null, entityInfo)) : this.removeBlockFromTab("surfaceMap", "viewOptions", "textures");
  }
  async determineLayersBlockState(entityId, cancelToken = null) {
    const contentManager = this._app.getManager("content");
    const layerManager = this._app.getManager("layer");
    const {
      currentView: currentView
    } = this._app.getManager("router");
    const contextualLayers = layerManager.getContextualLayers(entityId);
    const entityInfo = contentManager.getEntityInfo(entityId);
    const parentEntityId = this._app.pioneer.getScene("main").getEntity(entityId)?.getParent()?.getName();
    const parentInfo = contentManager.getEntityInfo(parentEntityId);
    let parentTitle = "";
    if (parentInfo && (parentTitle = parentInfo.displayName || parentInfo.iauName || ""), 0 === contextualLayers.length || contextualLayers.includes("satelliteGroup")) {
      if ("event" !== currentView) if (0 !== layerManager.getContextualLayers(parentEntityId).length) {
        if (this.addBlockToTab("layers", "viewOptions", "layers"), await this._layersBlock.onRouteChange(parentInfo, parentTitle, null, entityInfo), cancelToken && cancelToken.isCanceled && entityId !== this._app.getView("object")?.getCurrentTarget()) return;
      } else if (parentInfo && "Landing site" === parentInfo.category) {
        const grandparentEntityId = this._app.getManager("scene").getParent(parentEntityId);
        const grandparentInfo = contentManager.getEntityInfo(grandparentEntityId);
        if (0 !== layerManager.getContextualLayers(grandparentEntityId).length || void 0 !== contentManager.getSpheroidLayers(grandparentEntityId)) {
          const grandparentTitle = grandparentEntityId.displayName || grandparentEntityId.iauName || "";
          if (this.addBlockToTab("layers", "viewOptions", "layers"), await this._layersBlock.onRouteChange(grandparentInfo, grandparentTitle), cancelToken && cancelToken.isCanceled && entityId !== this._app.getView("object")?.getCurrentTarget()) return;
        }
      } else this.removeBlockFromTab("layers", "viewOptions", "layers");
    } else if (this.addBlockToTab("layers", "viewOptions", "layers"), await this._layersBlock.onRouteChange(entityInfo), cancelToken && cancelToken.isCanceled && entityId !== this._app.getView("object")?.getCurrentTarget()) return;
  }
  async determineInstrumentFOVBlockState(entityId) {
    const contentManager = this._app.getManager("content");
    let instrumentEntityId = entityId;
    let instrumentEntityInfo = contentManager.getEntityInfo(entityId);
    const {
      currentView: currentView,
      currentRoute: currentRoute
    } = this._app.getManager("router");
    "event" === currentView && (instrumentEntityId = currentRoute.params.spaceObject, instrumentEntityInfo = contentManager.getEntityInfo(instrumentEntityId));
    this._instrumentFOVBlock.hasInstrumentsWithFOV(instrumentEntityId) ? (this.addBlockToTab("instrumentFOV", "viewOptions", "instruments"), await this._instrumentFOVBlock.onRouteChange(instrumentEntityInfo)) : this.removeBlockFromTab("instrumentFOV", "viewOptions", "instruments");
  }
  async determineTextureQualityBlockState(entityId) {
    const sceneManager = this._app.getManager("scene");
    const contentManager = this._app.getManager("content");
    const parentEntityId = this._app.pioneer.getScene("main").getEntity(entityId)?.getParent()?.getName();
    const entityInfo = contentManager.getEntityInfo(entityId);
    const sceneEntity = this._app.pioneer.getScene("main").getEntity(entityId);
    if (!sceneEntity || sceneEntity.getComponent(Pioneer.SpheroidLODComponent) && !sceneEntity.getComponent(Pioneer.SpheroidLODComponent)?.isEnabled()) return;
    const tiledEntity = this._app.getManager("scene").getCMTSEntity(entityId);
    const terrainComponent = tiledEntity?.getComponent(Pioneer.CMTSComponent);
    !sceneManager.hasHD(entityId) || Eyes.AppUtils.isiPhone() || terrainComponent ? parentEntityId && sceneManager.hasHD(parentEntityId) && !Eyes.AppUtils.isiPhone() && !terrainComponent ? (this.addBlockToTab("textureQuality", "viewOptions", "textures"), await this._textureQualityBlock.onRouteChange(contentManager.getEntityInfo(parentEntityId))) : this.removeBlockFromTab("textureQuality", "viewOptions", "textures") : (this.addBlockToTab("textureQuality", "viewOptions", "textures"), await this._textureQualityBlock.onRouteChange(entityInfo));
    Eyes.AppUtils.isAppleDevice() && this.removeBlockFromTab("textureQuality", "viewOptions", "textures");
  }
  async determineFeaturesBlockState(entityId, entityInfo) {
    const contentManager = this._app.getManager("content");
    const {
      currentView: currentView
    } = this._app.getManager("router");
    const isEventView = "event" === currentView;
    const parentEntityId = this._app.getManager("scene").get("main").getEntity(entityInfo?.id)?.getParent()?.getName();
    const hasFeatures = candidateEntityId => 0 !== contentManager.getSpheroidFeatures(candidateEntityId)?.length;
    hasFeatures(entityId) || hasFeatures(parentEntityId) && !isEventView ? (this.addBlockToTab("features", "viewOptions", "layers"), await this._featuresBlock.onRouteChange(entityInfo)) : this.removeBlockFromTab("features", "viewOptions", "layers");
  }
  backRoute() {
    const routerManager = this._app.getManager("router");
    let navigationQuery = {};
    const timeManager = this._app.getManager("time");
    routerManager.query.time && timeManager && (navigationQuery = {
      time: timeManager.getTimeUrl(),
      rate: timeManager.getTimeRate(),
      __remove: ["followId"]
    });
    this._app.getManager("router").navigate(navigationQuery, this._backRoute);
  }
  onClickShowCollapse() {
    this._state.isVisible ? this._state.isOverlay && Eyes.AppUtils.isMobileMode() ? this.hideOverlay() : this.hide() : this.show();
  }
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
  onDragStart(touchEvent) {
    this._isDragging = true;
    touchEvent.preventDefault();
  }
  onDrag(touchEvent) {
    if (!this._isDragging) return;
    touchEvent.preventDefault();
    const touchPoint = touchEvent.changedTouches[0];
    const panelHeight = window.innerHeight - touchPoint.pageY;
    this.element.style.height = `${panelHeight}px`;
  }
  onDragEnd(touchEvent) {
    this._isDragging = false;
    touchEvent.preventDefault();
    const hasSubtabs = !tabsWithoutSubtabs.includes(this._state.currentMainTab);
    const panelHeight = parseInt(this.element.style.height);
    const snappedHeight = this._snapHeights.value.reduce((closestHeight, candidateHeight, heightIndex) => Math.abs(candidateHeight - panelHeight) < Math.abs(closestHeight - panelHeight) ? candidateHeight : closestHeight);
    this._snapHeights.index = this._snapHeights.value.indexOf(snappedHeight);
    this.element.style.height = `${snappedHeight}px`;
    const isFullyExpanded = 0 === this._snapHeights.index;
    const isFullyCollapsed = this._snapHeights.index === this._snapHeights.value.length - 1;
    this.setState({
      isExpanded: isFullyExpanded,
      isExpandedClass: this._class.isExpanded[isFullyExpanded],
      iconExpandClass: this._class.iconExpand[isFullyCollapsed ? "bottom" : "mid"],
      isCollapsed: isFullyCollapsed,
      isCollapsedClass: this._class.isCollapsed[isFullyCollapsed],
      iconCollapseClass: this._class.iconCollapse[isFullyExpanded ? "top" : "mid"],
      subtabsVisible: isFullyCollapsed || !hasSubtabs ? "hidden" : "",
      tabsVisible: isFullyCollapsed ? "hidden" : ""
    });
    const customEvent = new CustomEvent("contentPanelCollapse", {
      detail: isFullyCollapsed
    });
    window.dispatchEvent(customEvent);
    this._setUpMobileCollapse();
  }
  expand() {
    const hasSubtabs = !tabsWithoutSubtabs.includes(this._state.currentMainTab);
    if (Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTablet()) {
      if (0 === this._snapHeights.index) return;
      this._snapHeights.index--;
      this.element.style.height = this._snapHeights.value[this._snapHeights.index] - this._adjustedMobileHeight + "px";
      const isFullyExpanded = 0 === this._snapHeights.index;
      const isFullyCollapsed = this._snapHeights.index === this._snapHeights.value.length - 1;
      this.setState({
        isExpanded: isFullyExpanded,
        isExpandedClass: this._class.isExpanded[isFullyExpanded],
        iconExpandClass: this._class.iconExpand.mid,
        isCollapsed: false,
        isCollapsedClass: this._class.isCollapsed[false],
        iconCollapseClass: this._class.iconCollapse[isFullyExpanded ? "top" : "mid"],
        subtabsVisible: isFullyCollapsed || !hasSubtabs ? "hidden" : "",
        tabsVisible: isFullyCollapsed ? "hidden" : ""
      });
      this._setUpMobileCollapse();
    } else this.toggleExpandCollapse();
  }
  collapse() {
    const hasSubtabs = !tabsWithoutSubtabs.includes(this._state.currentMainTab);
    if (Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTablet()) {
      if (this._snapHeights.index === this._snapHeights.value.length - 1) return;
      this._snapHeights.index++;
      this.element.style.height = `${this._snapHeights.value[this._snapHeights.index]}px`;
      const isFullyCollapsed = this._snapHeights.index === this._snapHeights.value.length - 1;
      this.setState({
        isExpanded: false,
        isExpandedClass: this._class.isExpanded[false],
        iconExpandClass: this._class.iconExpand[isFullyCollapsed ? "bottom" : "mid"],
        isCollapsed: isFullyCollapsed,
        isCollapsedClass: this._class.isCollapsed[isFullyCollapsed],
        iconCollapseClass: this._class.iconCollapse.mid,
        subtabsVisible: isFullyCollapsed || !hasSubtabs ? "hidden" : "",
        tabsVisible: isFullyCollapsed ? "hidden" : ""
      });
      this._setUpMobileCollapse();
    } else this.toggleExpandCollapse();
  }
  toggleExpandCollapse() {
    const isExpanded = !this._state.isExpanded;
    const isCollapsed = !this._state.isCollapsed;
    this.setState({
      isExpanded: isExpanded,
      isExpandedClass: this._class.isExpanded[isExpanded],
      isCollapsed: isCollapsed,
      isCollapsedClass: this._class.isCollapsed[isCollapsed]
    }, () => {
      this.triggerCallbacks("expandtoggle", [isExpanded]);
    });
  }
  show() {
    false !== this._app.getManager("layer").getLayer("ui").visible && (super.show(), this.setEnabled(true), this._components.forEach(componentName => {
      void 0 !== this._blockState[componentName] && null !== this._blockState[componentName] && this._app.getComponent(componentName).setEnabled(this._blockState[componentName]);
    }), this.triggerCallbacks("expandtoggle", [true]), this._state.isCollapsed && this._state.isVisible && this._app.getComponent("collapsibleMenu").collapse(), null === this._scrollbar && (this._scrollbar = Eyes.AppUtils.addScrollbar(this._element.querySelector("#content-main"))));
  }
  hide() {
    super.hide();
    this.triggerCallbacks("expandtoggle", [false]);
  }
  _delayedResize() {
    let attemptCount = 1;
    const resizeInterval = setInterval(() => {
      const overviewElement = document.getElementById("overview-block");
      const titleElement = overviewElement?.getElementsByClassName("title")[0];
      if (titleElement && 10 === attemptCount) {
        const titleHeight = parseFloat(window.getComputedStyle(titleElement).height);
        isNaN(titleHeight) || (this._adjustedMobileHeight = parseFloat(window.getComputedStyle(overviewElement).height), clearInterval(resizeInterval), this.resize());
      }
      attemptCount++;
    }, 100);
  }
  _getParentTabOfSubtab(subtabName) {
    for (const [tabName, tabInfo] of Object.entries(this._tabContent)) if (Object.keys(tabInfo.subtabs).includes(subtabName)) return tabName;
    return "";
  }
  _calcTabPanelBottomMargin() {
    const {
      currentMainTab: currentMainTab
    } = this._state;
    const lists = document.querySelectorAll("ul");
    const subtabContainer = Array.from(lists).find(listElement => "sub-tab-container" === listElement.id);
    const tabContainer = Array.from(lists).find(listElement => "tab-container" === listElement.id);
    const bottomMargin = tabsWithoutSubtabs.includes(currentMainTab) ? tabContainer?.offsetHeight : tabContainer?.offsetHeight + subtabContainer?.offsetHeight;
    this._element.style.setProperty("--content-bottom-margin", "" + (tabContainer ? `${bottomMargin > 0 ? bottomMargin : 112}px` : "10em"));
    this._state.isCollapsed && this._element.style.setProperty("--content-bottom-margin", "0");
  }
  async _getBlockHeight(blockElement) {
    return new Promise(resolveHeight => {
      const heightInterval = setInterval(() => {
        const blockHeight = parseFloat(window.getComputedStyle(blockElement).height);
        isNaN(blockHeight) || (clearInterval(heightInterval), resolveHeight(parseFloat(window.getComputedStyle(blockElement).height)));
      }, 25);
    }).then(measuredHeight => measuredHeight).catch(measureError => {
      console.warn("Could not calculate block height: ", measureError);
    });
  }
  async _calculateAdjustedMobileHeight() {
    if (!this._isMobile) return;
    const {
      currentMainTab: currentMainTab
    } = this._state;
    const panelElement = this._children[`${currentMainTab}Panel`];
    let collapsedContentHeight = 0;
    const adjustedMobileHeight = (await this._getBlockHeight(this._overviewBlock.element)) ?? 95;
    adjustedMobileHeight > 0 && adjustedMobileHeight !== this._adjustedMobileHeight && (this._adjustedMobileHeight = adjustedMobileHeight);
    await this._determineCollapsedBlockVisiblity();
    const blockElements = Array.from(panelElement.children);
    if ("toolbox" !== currentMainTab) for (let blockIndex = 0; blockIndex < blockElements.length; blockIndex++) this._isLandscape || (collapsedContentHeight += await this._getBlockHeight(blockElements[blockIndex]));
    const isFullyCollapsed = this._snapHeights.index === this._snapHeights.value.length - 1;
    this._adjustedMobileHeight !== collapsedContentHeight && !isNaN(collapsedContentHeight) && isFullyCollapsed && (this._adjustedMobileHeight += collapsedContentHeight);
    const overviewMargin = adjustedMobileHeight / 3;
    const collapsedMargin = isFullyCollapsed ? this._adjustedMobileHeight - adjustedMobileHeight + overviewMargin : 0;
    const hasExtraHeight = this._adjustedMobileHeight > adjustedMobileHeight;
    document.documentElement.style.setProperty("--collapsible-bottom-margin", `${hasExtraHeight ? collapsedMargin : overviewMargin}px`);
    this._app.getComponent("collapsibleMenu")._element.style.setProperty("--collapsible-bottom-margin", `${this._adjustedMobileHeight}px`);
  }
  async _setUpMobileCollapse(forceCollapsed = false) {
    await this._calculateAdjustedMobileHeight();
    const dynamicUI = document.getElementById("dynamic-ui");
    const gridRows = window.getComputedStyle(dynamicUI).getPropertyValue("grid-template-rows").split(" ");
    const expandedHeight = this._isLandscape ? window.innerHeight : window.innerHeight - parseInt(gridRows[0]);
    const collapsedBaseHeight = this._adjustedMobileHeight || parseInt(gridRows.at(-1));
    const middleRowHeight = parseInt(gridRows.at(-3));
    const collapsedPadding = Eyes.AppUtils.isLandscape() ? this._adjustedMobileHeight / 4 : this._adjustedMobileHeight / 8;
    if (this._snapHeights.value = [], this._snapHeights.value.push(expandedHeight), !Eyes.AppUtils.isLandscape() && this._snapHeights.value.push(middleRowHeight + collapsedBaseHeight + collapsedPadding + this._adjustedMobileHeight), this._snapHeights.value.push(collapsedBaseHeight + collapsedPadding), this._calcTabPanelBottomMargin(), this._isMobile) {
      let {
        isCollapsed: isCollapsed,
        isExpanded: isExpanded,
        currentMainTab: currentMainTab
      } = this._state;
      const hasSubtabs = !tabsWithoutSubtabs.includes(currentMainTab);
      (isCollapsed || forceCollapsed) && (this._snapHeights.index = this._snapHeights.value.length - 1);
      isCollapsed = this._snapHeights.index === this._snapHeights.value.length - 1;
      isExpanded = !isCollapsed && !forceCollapsed;
      const isFullyExpanded = 0 === this._snapHeights.index;
      this.element.style.height = `${this._snapHeights.value[this._snapHeights.index]}px`;
      this._isLandscape && isFullyExpanded ? this.element.classList.add("overlay") : this.element.classList.remove("overlay");
      this.setState({
        isExpanded: isExpanded,
        isExpandedClass: this._class.isExpanded[isFullyExpanded],
        iconExpandClass: this._class.iconExpand[isCollapsed ? "bottom" : "mid"],
        isCollapsed: isCollapsed,
        isCollapsedClass: this._class.isCollapsed[isCollapsed],
        iconCollapseClass: this._class.iconCollapse[isFullyExpanded ? "top" : "mid"],
        subtabsVisible: isCollapsed || !hasSubtabs ? "hidden" : "",
        tabsVisible: isCollapsed ? "hidden" : ""
      });
      isExpanded && this.populateTabs(this._tabContent);
    } else {
      this.element.style.height = "auto";
      this._snapHeights.index = -1;
      const isExpanded = !this._state.isCollapsed;
      this.setState({
        isExpanded: isExpanded,
        isExpandedClass: this._class.isExpanded[isExpanded],
        iconExpandClass: this._class.iconExpand.left,
        iconCollapseClass: this._class.iconCollapse.left,
        subtabsVisible: "hidden",
        tabsVisible: ""
      });
    }
    this.triggerCallbacks("expandtoggle", [this._state.isExpanded]);
  }
  _determineCollapsedBlockVisiblity() {
    const {
      selectedSubtab: selectedSubtab,
      currentMainTab: currentMainTab
    } = this._state;
    const panelElement = this._children[`${currentMainTab}Panel`];
    const subtabBlocks = this._tabContent[`${currentMainTab}`].subtabs[`${selectedSubtab}`];
    const isFullyCollapsed = this._snapHeights.index === this._snapHeights.value.length - 1;
    const persistentBlockNames = ["replay"];
    const collapsibleBlockNames = subtabBlocks?.filter(blockName => !persistentBlockNames.includes(blockName));
    return new Promise(resolveVisibility => {
      collapsibleBlockNames && collapsibleBlockNames.forEach(blockName => {
        const blockElement = this._app.getComponent(`${blockName}Block`).element;
        isFullyCollapsed ? panelElement.contains(blockElement) && panelElement.removeChild(blockElement) : panelElement.appendChild(blockElement);
      });
      persistentBlockNames && persistentBlockNames.forEach(async blockName => {
        const blockElement = this._app.getComponent(`${blockName}Block`).element;
        let existsInTabs = false;
        for (const tabName in this._tabContent) if (this._tabContent[tabName].contentBlocks.includes(blockName)) {
          existsInTabs = true;
          break;
        }
        !subtabBlocks?.includes(blockName) && panelElement.contains(blockElement) && panelElement.removeChild(blockElement);
        isFullyCollapsed ? (existsInTabs && panelElement.appendChild(blockElement), this._element.style.setProperty("--custom-overview-border", existsInTabs ? "1px solid #ffffff30" : "none")) : (!subtabBlocks?.includes(blockName) && panelElement.contains(blockElement) && panelElement.removeChild(blockElement), this._element.style.setProperty("--custom-overview-border", "none"));
      });
      resolveVisibility(true);
    });
  }
  _disableAllComponents() {
    this._components.forEach(componentName => {
      null !== this._blockState[componentName] && void 0 !== this._blockState[componentName] && (this._blockState[componentName] = false);
      this._app.getComponent(componentName).setEnabled(false);
    });
  }
  clearPanel(targetTitle = null) {
    if (this._disableAllComponents(), targetTitle) {
      const loadingTitle = `Loading ${targetTitle}...`;
      this.setState({
        title: loadingTitle
      });
      this._defaultState.title = loadingTitle;
    }
  }
  reset() {
    this.setState(this._defaultState);
    this._currentId = "";
    this._app.getComponent("collapsibleMenu")._element.style.setProperty("--collapsible-bottom-margin", "1em");
    document.documentElement.style.setProperty("--collapsible-bottom-margin", "1em");
  }
  __disable() {
    this.reset();
    super.__disable();
  }
}
ContentPanel.html = getContentPanelTemplate();
export { ContentPanel };
