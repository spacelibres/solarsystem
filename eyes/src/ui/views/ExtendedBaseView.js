// Recovered from app.js:1363886-1372305.
import * as Eyes from "../../framework/eyes/index.js";
import * as PreloadManager from "../../app/PreloadManager.js";
class ExtendedBaseView extends Eyes.BaseView {
  constructor(...t) {
    super(...t);
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
  async onEnter(t) {
    this._offsetPanel || this.setViewportOffset(false);
    const {
      menu: menu,
      featured: featured,
      noKeyboard: noKeyboard,
      search: search,
      content: content,
      shareButton: shareButton
    } = this._app.getManager("router").configs;
    for (const t in this.embedQueries) this.embedQueries[t] = this._app.getManager("router").configs[t];
    if (true === t.kiosk) for (const t in this.kioskValues) {
      this._app.getManager("router").configs[t] = this.kioskValues[t];
      this.embedQueries[t] = this.kioskValues[t];
    }
    if (false === menu && (this.disableUIComponent("menu"), Eyes.AppUtils.isMobileMode() || this._app.getComponent("searchDesktop")?.show()), false === featured && this.disableUIComponent("featuredStoriesPanel"), true === noKeyboard || false === search) {
      const t = ["searchDesktop", "searchMobile"];
      for (let e = 0; e < t.length; e++) this.disableUIComponent(t[e]);
    }
    false === content && this.disableUIComponent("contentPanel");
    false === shareButton && this.disableUIComponent("shareModal");
    true === this.embedQueries.hideExternalLinks && this._app.getManager("content").hideExternalLinkStoryList();
    this._updateCollapsibleMenu();
    await super.onEnter(t);
  }
  disableUIComponent(t) {
    const e = this._components.indexOf(t);
    e > -1 && (this._components.splice(e, 1), this._app.removeComponent(t));
  }
  async onLeave(t) {
    this._offsetPanel && this.setViewportOffset(false, true);
    const clockShortcutComponent = this._app.getComponent("clockShortcut");
    clockShortcutComponent.setCallback(null);
    clockShortcutComponent.hide();
    await super.onLeave(t);
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
  async processQuery(t) {
    await super.processQuery(t);
  }
  async _updateComponents(t) {
    this._components.includes("timeControls") && this.app.getComponent("timeControls")?.setEnabled(false !== t.timeControls);
    this._components.includes("clockShortcut") && this.app.getComponent("clockShortcut")?.setEnabled(false !== t.timeControls);
    const e = !this._app.getManager("router").configs.locked && this._scOrderedEvents?.length > 1;
    const i = this._components.indexOf("eventsTimeline");
    e && -1 === i ? (this._components.push("eventsTimeline"), this.app.getComponent("eventsTimeline").setEnabled(true)) : !e && i > -1 && this._components.splice(i, 1);
    const routerManager = this.app.getManager("router");
    const {
      previousView: previousView,
      currentView: currentView
    } = routerManager;
    const {
      params: params
    } = routerManager.previousRoute;
    if ((params?.spaceObject !== t.spaceObject || previousView !== currentView) && this._updateCollapsibleMenu(), t.spaceObject) {
      const contentManager = this._app.getManager("content");
      const sceneManager = this._app.getManager("scene");
      if (true === this.embedQueries.hd) {
        const s = contentManager.getEntityInfo(t.spaceObject);
        if (this._app.getComponent("contentPanel")) this._app.getComponent("contentPanel").onChildParentChange(t.spaceObject, s);else {
          await sceneManager.updateHDTarget(s, t.spaceObject);
          const e = sceneManager.getHDToggleEntity();
          e && (await sceneManager.toggleHDTextureForEntity(e));
        }
      }
      if (true === this.embedQueries.surfaceMapTiling) {
        let s = t.spaceObject;
        "moons" === t.feature && (s = t.child);
        let n = contentManager.getSpheroidLayers(s);
        if (!n) {
          const o = await sceneManager.findClosestSpaceObjectTo(t.spaceObject);
          n = contentManager.getSpheroidLayers(o);
          s = o;
        }
        if (n) {
          const t = n.find(t => "wmts" === t.type);
          t && this._app.getManager("layer").changeSpheroidMap(s, t);
        }
      }
    }
    this._handleInfoPanelEmbedQueries(t);
    true === t.kiosk && this._app.getManager("router").removeConfigs(Object.keys(this.kioskValues));
    if (this._components.includes("timeControls")) {
      const timeControlsComponent = this._app.getComponent("timeControls");
      this._collapsibleItems = await Promise.all(this._collapsibleItems).then(t => t.filter(t => t));
      this._target ? this._app.scene.getEntity(this._target).getLoadedPromise().then(() => (timeControlsComponent.setCanUpdate(true), true)).catch(t => {
        throw t;
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
  _loaded(t) {
    PreloadManager.default.embedLoading && (PreloadManager.default.updateEmbedLoadPercent(100), PreloadManager.default.showEmbedViewButton());
  }
  _updateLoading(t) {
    super._updateLoading(t);
    const {
      _isLoading: _isLoading
    } = this._app.getManager("scene");
    _isLoading || this._loaded();
  }
  _updateCollapsibleMenu() {
    const collapsibleMenuComponent = this._app.getComponent("collapsibleMenu");
    const e = this._components.includes("collapsibleMenu");
    if (!collapsibleMenuComponent) return;
    collapsibleMenuComponent.removeAllItems();
    const i = false === this._app.getManager("router").configs.timeControls;
    e && (i && (this._collapsibleItemOptions = this._collapsibleItemOptions.filter(t => !t?.componentNames?.includes("timeControls"))), this._collapsibleItems = this._collapsibleItemOptions.map(e => e.componentNames.every(t => this._components.includes(t)) && collapsibleMenuComponent.addItem(e)));
  }
  _handleInfoPanelEmbedQueries(t) {
    if (this._components.includes("infoPanel")) {
      const infoPanelComponent = this._app.getComponent("infoPanel");
      if (Object.keys(infoPanelComponent._children).length > 0) {
        const e = infoPanelComponent._children;
        if (e) for (const t in e) {
          true === this.embedQueries.hideExternalLinks && e[t].innerHTML?.match(/\/?http[^"]*/) && (e[t].innerHTML = e[t].innerHTML.replace(/\/?http[^"]*/, ""), e[t].innerHTML = e[t].innerHTML.replace("You can also check out this video tutorial.", ""), e[t].innerHTML = e[t].innerHTML.replace('<div class="videoWrapper" style="', '<div class="videoWrapper" style="display: none; '));
          true === this.embedQueries.hideFullScreenToggle && (e[t].innerHTML = e[t].innerHTML.replace("expand to full screen,", ""));
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
    const t = document.getElementById("extended-controls");
    const {
      visible: visible
    } = this._app.getManager("layer").getLayer("ui");
    const i = ["breadcrumb", "settings", "layerPanel", "kioskMode", "kioskSessionClock"];
    visible ? (this._components.forEach(t => {
      "contentPanel" === t ? this._app.getComponent(t).show() : this._app.getComponent(t).setEnabled(true);
    }), t && t.classList.remove("hidden"), this.updateVisibility()) : (this._components.forEach(t => {
      i.includes(t) || this._app.getComponent(t).setEnabled(false);
      "settings" === t && this._app.getComponent(t).collapse();
      "layerPanel" !== t && "contentPanel" !== t || this._app.getComponent(t).hide();
    }), t && t.classList.add("hidden"));
    this.setViewportOffset(visible, true);
  }
  get shouldOffsetRight() {
    return Eyes.AppUtils.isDesktop();
  }
  get shouldOffsetUp() {
    return !Eyes.AppUtils.isDesktop();
  }
  setViewportOffset(t, e = false) {
    const {
      visible: visible
    } = this._app.getManager("layer").getLayer("ui");
    let s = this._offsetPanel?.isEnabled() && this._offsetPanel?.getState?.("isVisible");
    null !== this._offsetPanel?.getState?.("isExpanded") && (s = s && this._offsetPanel?.getState?.("isExpanded"));
    const n = e ? s : (t && this._offsetPanel?.getState?.("isExpanded") && visible) ?? s;
    const o = this.shouldOffsetRight && n;
    const r = this.shouldOffsetUp && n;
    document.body.classList.toggle("offset-right", o);
    document.body.classList.toggle("offset-up", r);
  }
  resize() {
    this.setViewportOffset();
    super.resize();
  }
}
export { ExtendedBaseView as default };
