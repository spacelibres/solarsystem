// Recovered from app.js:1363886-1372305.
import * as Eyes from "../../framework/eyes/index.js";
import * as PreloadManager from "../../app/PreloadManager.js";
class ExtendedBaseView extends Eyes.BaseView {
  constructor(...constructorArgs) {
    super(...constructorArgs);
    this._collapsibleItemOptions = [{
      itemTitle: "Time Controls",
      componentNames: ["timeControls", "clock"],
      positionIndex: 0,
      dimensions: {
        width: {
          min: 320,
          max: 600
        },
        height: {
          min: 0,
          max: 120,
          active: 140
        }
      }
    }];
    this._collapsibleItems = null;
    this._offsetPanel = null;
    this.embedQueries = {
      hd: null,
      surfaceMapTiling: null,
      hideExternalLinks: null,
      hideFullScreenToggle: null,
      kiosk: null,
      timeControls: null
    };
    this.kioskValues = {
      lighting: "flood",
      hideExternalLinks: true,
      hideFullScreenToggle: true,
      search: false
    };
    this.bindFunctions(["setViewportOffset", "_updateCollapsibleMenu", "_loaded"]);
  }
  // 嵌入与 kiosk 配置在进入时折叠到组件集合；这里只协调已有 NASA 控件，不创建新的界面。
  async onEnter(routeParams) {
    this._offsetPanel || this.setViewportOffset(false);
    const {
      menu: menu,
      featured: featured,
      noKeyboard: noKeyboard,
      search: search,
      content: content,
      shareButton: shareButton
    } = this._app.getManager("router").configs;
    for (const configKey in this.embedQueries) this.embedQueries[configKey] = this._app.getManager("router").configs[configKey];
    if (true === routeParams.kiosk) for (const kioskKey in this.kioskValues) {
      this._app.getManager("router").configs[kioskKey] = this.kioskValues[kioskKey];
      this.embedQueries[kioskKey] = this.kioskValues[kioskKey];
    }
    if (false === menu && (this.disableUIComponent("menu"), Eyes.AppUtils.isMobileMode() || this._app.getComponent("searchDesktop")?.show()), false === featured && this.disableUIComponent("featuredStoriesPanel"), true === noKeyboard || false === search) {
      const searchComponentNames = ["searchDesktop", "searchMobile"];
      for (let componentIndex = 0; componentIndex < searchComponentNames.length; componentIndex++) this.disableUIComponent(searchComponentNames[componentIndex]);
    }
    false === content && this.disableUIComponent("contentPanel");
    false === shareButton && this.disableUIComponent("shareModal");
    true === this.embedQueries.hideExternalLinks && this._app.getManager("content").hideExternalLinkStoryList();
    this._updateCollapsibleMenu();
    await super.onEnter(routeParams);
  }
  disableUIComponent(componentName) {
    const componentIndex = this._components.indexOf(componentName);
    componentIndex > -1 && (this._components.splice(componentIndex, 1), this._app.removeComponent(componentName));
  }
  async onLeave(routeParams) {
    this._offsetPanel && this.setViewportOffset(false, true);
    const clockShortcutComponent = this._app.getComponent("clockShortcut");
    clockShortcutComponent.setCallback(null);
    clockShortcutComponent.hide();
    await super.onLeave(routeParams);
  }
  registerCallbacks() {
    super.registerCallbacks();
    this._offsetPanel?.registerCallback("expandtoggle", this.setViewportOffset);
    this._app.getManager("scene").registerCallback("loaded", this._loaded);
  }
  removeCallbacks() {
    super.removeCallbacks();
    this._offsetPanel?.removeCallback("expandtoggle", this.setViewportOffset);
    this._app.getManager("scene").removeCallback("loaded", this._loaded);
  }
  _reset() {
    super._reset();
    this._app.getComponent("timeControls")?.setCanUpdate(false);
  }
  async processQuery(routeParams) {
    await super.processQuery(routeParams);
  }
  async _updateComponents(routeParams) {
    this._components.includes("timeControls") && this.app.getComponent("timeControls")?.setEnabled(false !== routeParams.timeControls);
    this._components.includes("clockShortcut") && this.app.getComponent("clockShortcut")?.setEnabled(false !== routeParams.timeControls);
    const shouldShowTimeline = !this._app.getManager("router").configs.locked && this._scOrderedEvents?.length > 1;
    const timelineIndex = this._components.indexOf("eventsTimeline");
    shouldShowTimeline && -1 === timelineIndex ? (this._components.push("eventsTimeline"), this.app.getComponent("eventsTimeline").setEnabled(true)) : !shouldShowTimeline && timelineIndex > -1 && this._components.splice(timelineIndex, 1);
    const routerManager = this.app.getManager("router");
    const {
      previousView: previousView,
      currentView: currentView
    } = routerManager;
    const {
      params: params
    } = routerManager.previousRoute;
    if ((params?.spaceObject !== routeParams.spaceObject || previousView !== currentView) && this._updateCollapsibleMenu(), routeParams.spaceObject) {
      const contentManager = this._app.getManager("content");
      const sceneManager = this._app.getManager("scene");
      if (true === this.embedQueries.hd) {
        const entityInfo = contentManager.getEntityInfo(routeParams.spaceObject);
        if (this._app.getComponent("contentPanel")) this._app.getComponent("contentPanel").onChildParentChange(routeParams.spaceObject, entityInfo);else {
          await sceneManager.updateHDTarget(entityInfo, routeParams.spaceObject);
          const hdEntity = sceneManager.getHDToggleEntity();
          hdEntity && (await sceneManager.toggleHDTextureForEntity(hdEntity));
        }
      }
      if (true === this.embedQueries.surfaceMapTiling) {
        let mapTargetId = routeParams.spaceObject;
        "moons" === routeParams.feature && (mapTargetId = routeParams.child);
        let spheroidLayers = contentManager.getSpheroidLayers(mapTargetId);
        if (!spheroidLayers) {
          const closestEntityId = await sceneManager.findClosestSpaceObjectTo(routeParams.spaceObject);
          spheroidLayers = contentManager.getSpheroidLayers(closestEntityId);
          mapTargetId = closestEntityId;
        }
        if (spheroidLayers) {
          const wmtsLayer = spheroidLayers.find(candidateLayer => "wmts" === candidateLayer.type);
          wmtsLayer && this._app.getManager("layer").changeSpheroidMap(mapTargetId, wmtsLayer);
        }
      }
    }
    this._handleInfoPanelEmbedQueries(routeParams);
    true === routeParams.kiosk && this._app.getManager("router").removeConfigs(Object.keys(this.kioskValues));
    if (this._components.includes("timeControls")) {
      const timeControlsComponent = this._app.getComponent("timeControls");
      this._collapsibleItems = await Promise.all(this._collapsibleItems).then(resolvedItems => resolvedItems.filter(collapsibleItem => collapsibleItem));
      this._target ? this._app.scene.getEntity(this._target).getLoadedPromise().then(() => (timeControlsComponent.setCanUpdate(true), true)).catch(loadError => {
        throw loadError;
      }) : timeControlsComponent.setCanUpdate(true);
    }
    await this._app.getComponent("settings").setConfig({
      orientation: {
        tabletPortrait: {
          ori: "horizontal"
        },
        smallLandscape: {
          ori: "horizontal"
        },
        tabletLandscape: {
          ori: "horizontal"
        }
      }
    });
    this._app.getManager("layer").syncLayerVisibilityWithQueries();
  }
  _loaded(loadedEntityId) {
    PreloadManager.default.embedLoading && (PreloadManager.default.updateEmbedLoadPercent(100), PreloadManager.default.showEmbedViewButton());
  }
  _updateLoading(routeParams) {
    super._updateLoading(routeParams);
    const {
      _isLoading: _isLoading
    } = this._app.getManager("scene");
    _isLoading || this._loaded();
  }
  _updateCollapsibleMenu() {
    const collapsibleMenuComponent = this._app.getComponent("collapsibleMenu");
    const hasCollapsibleMenu = this._components.includes("collapsibleMenu");
    if (!collapsibleMenuComponent) return;
    collapsibleMenuComponent.removeAllItems();
    const hideTimeControls = false === this._app.getManager("router").configs.timeControls;
    hasCollapsibleMenu && (hideTimeControls && (this._collapsibleItemOptions = this._collapsibleItemOptions.filter(itemOptions => !itemOptions?.componentNames?.includes("timeControls"))), this._collapsibleItems = this._collapsibleItemOptions.map(itemOptions => itemOptions.componentNames.every(componentName => this._components.includes(componentName)) && collapsibleMenuComponent.addItem(itemOptions)));
  }
  _handleInfoPanelEmbedQueries(routeParams) {
    if (this._components.includes("infoPanel")) {
      const infoPanelComponent = this._app.getComponent("infoPanel");
      if (Object.keys(infoPanelComponent._children).length > 0) {
        const panelChildren = infoPanelComponent._children;
        if (panelChildren) for (const childKey in panelChildren) {
          true === this.embedQueries.hideExternalLinks && panelChildren[childKey].innerHTML?.match(/\/?http[^"]*/) && (panelChildren[childKey].innerHTML = panelChildren[childKey].innerHTML.replace(/\/?http[^"]*/, ""), panelChildren[childKey].innerHTML = panelChildren[childKey].innerHTML.replace("You can also check out this video tutorial.", ""), panelChildren[childKey].innerHTML = panelChildren[childKey].innerHTML.replace('<div class="videoWrapper" style="', '<div class="videoWrapper" style="display: none; '));
          true === this.embedQueries.hideFullScreenToggle && (panelChildren[childKey].innerHTML = panelChildren[childKey].innerHTML.replace("expand to full screen,", ""));
        }
      }
    }
  }
  _showControls() {
    const settingsComponent = this._app.getComponent("settings");
    const collapsibleMenuComponent = this._app.getComponent("collapsibleMenu");
    this._app.getComponent("clock").show();
    this._app.getComponent("clockShortcut").show();
    collapsibleMenuComponent.show();
    settingsComponent.show();
    document.getElementById("float-mid-bottom").classList.remove("hidden");
    document.getElementById("float-mid-bottom").classList.add("active");
    const {
      embed: embed,
      content: content,
      locked: locked
    } = this._app.getManager("router").configs;
    if (false !== content && Eyes.AppUtils.isMobileMode() ? this._app.getComponent("mobileExpandButton")?.show() : this._app.getComponent("mobileExpandButton")?.hide(), embed && (settingsComponent.collapse(), collapsibleMenuComponent.collapse()), locked) {
      this._app.getComponent("searchDesktop")?.hide();
      const menuComponent = this._app.getComponent("menu");
      menuComponent?.hide();
      menuComponent?.setEnabled(false);
    }
  }
  _hideControls() {
    if (Eyes.AppUtils.isMobileMode()) {
      this._app.getComponent("clock").hide();
      this._app.getComponent("clockShortcut").hide();
      this._app.getComponent("collapsibleMenu").hide();
      this._app.getComponent("settings").hide();
      document.getElementById("float-mid-bottom").classList.add("hidden");
      document.getElementById("float-mid-bottom").classList.remove("active");
      const eventsTimelineComponent = this._app.getComponent("eventsTimeline");
      this._app.getComponent("contentPanel")?.getState("isOverlay") && eventsTimelineComponent.hide();
    }
  }
  toggleViewUI() {
    const controlsElement = document.getElementById("extended-controls");
    const {
      visible: visible
    } = this._app.getManager("layer").getLayer("ui");
    const persistentComponentNames = ["breadcrumb", "settings", "layerPanel", "kioskMode", "kioskSessionClock"];
    visible ? (this._components.forEach(componentName => {
      "contentPanel" === componentName ? this._app.getComponent(componentName).show() : this._app.getComponent(componentName).setEnabled(true);
    }), controlsElement && controlsElement.classList.remove("hidden"), this.updateVisibility()) : (this._components.forEach(componentName => {
      persistentComponentNames.includes(componentName) || this._app.getComponent(componentName).setEnabled(false);
      "settings" === componentName && this._app.getComponent(componentName).collapse();
      "layerPanel" !== componentName && "contentPanel" !== componentName || this._app.getComponent(componentName).hide();
    }), controlsElement && controlsElement.classList.add("hidden"));
    this.setViewportOffset(visible, true);
  }
  get shouldOffsetRight() {
    return Eyes.AppUtils.isDesktop();
  }
  get shouldOffsetUp() {
    return !Eyes.AppUtils.isDesktop();
  }
  // 偏移同时取决于 UI 图层、面板启用与展开状态及设备方向；usePanelState 用于退出或整层切换时直接读取面板状态。
  setViewportOffset(isExpanded, usePanelState = false) {
    const {
      visible: visible
    } = this._app.getManager("layer").getLayer("ui");
    let panelVisible = this._offsetPanel?.isEnabled() && this._offsetPanel?.getState?.("isVisible");
    null !== this._offsetPanel?.getState?.("isExpanded") && (panelVisible = panelVisible && this._offsetPanel?.getState?.("isExpanded"));
    const shouldOffset = usePanelState ? panelVisible : (isExpanded && this._offsetPanel?.getState?.("isExpanded") && visible) ?? panelVisible;
    const offsetRight = this.shouldOffsetRight && shouldOffset;
    const offsetUp = this.shouldOffsetUp && shouldOffset;
    document.body.classList.toggle("offset-right", offsetRight);
    document.body.classList.toggle("offset-up", offsetUp);
  }
  resize() {
    this.setViewportOffset();
    super.resize();
  }
}
export { ExtendedBaseView as default };
