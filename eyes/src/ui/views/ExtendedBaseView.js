/** @eyes-analysis
 * 文件职责：加入 embed/kiosk 查询控制、面板偏移与全局 UI 可见性策略
 * 依据：imports: ../../framework/eyes/index.js, ../../app/PreloadManager.js；manager dependencies: router, content, scene, layer
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1363886-1372305.
import * as Eyes from "../../framework/eyes/index.js";
import * as PreloadManager from "../../app/PreloadManager.js";
/** @eyes-analysis
 * 类职责：加入 embed/kiosk 查询控制、面板偏移与全局 UI 可见性策略；继承 Eyes.BaseView
 * 继承：Eyes.BaseView；导出：default。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ExtendedBaseView extends Eyes.BaseView {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 this.bindFunctions；写入 _collapsibleItemOptions, _collapsibleItems, _offsetPanel, embedQueries, kioskValues。
   * 状态写入：_collapsibleItemOptions、_collapsibleItems、_offsetPanel、embedQueries、kioskValues。
   * 调用线索：super、this.bindFunctions。
   */
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
  /** @eyes-analysis
   * 进入视图时准备界面和订阅；调用 this.setViewportOffset, this._app.getManager, this.disableUIComponent, Eyes.AppUtils.isMobileMode, this._app.getComponent, this._updateCollapsibleMenu, super.onEnter。
   * 状态写入：_app.getManager("router").configs[t]、embedQueries[t]。
   * 调用线索：Eyes.AppUtils.isMobileMode、super.onEnter、this._app.getComponent、this._app.getComponent("searchDesktop")?.show、this._app.getManager等。
   */
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
  /** @eyes-analysis
   * 执行 disableUIComponent 对应的组件业务步骤；调用 this._components.indexOf, this._components.splice, this._app.removeComponent。
   * 调用线索：this._app.removeComponent、this._components.indexOf、this._components.splice。
   */
  disableUIComponent(t) {
    const e = this._components.indexOf(t);
    e > -1 && (this._components.splice(e, 1), this._app.removeComponent(t));
  }
  /** @eyes-analysis
   * 离开视图时恢复状态并解除订阅；调用 this.setViewportOffset, this._app.getComponent, ShortcutComponent.setCallback, ShortcutComponent.hide, super.onLeave。
   * 调用线索：clockShortcutComponent.hide、clockShortcutComponent.setCallback、super.onLeave、this._app.getComponent、this.setViewportOffset。
   */
  async onLeave(t) {
    this._offsetPanel && this.setViewportOffset(false, true);
    const clockShortcutComponent = this._app.getComponent("clockShortcut");
    clockShortcutComponent.setCallback(null);
    clockShortcutComponent.hide();
    await super.onLeave(t);
  }
  /** @eyes-analysis
   * 登记跨组件或管理器事件订阅；调用 super.registerCallbacks, this._app.getManager。
   * 调用线索：super.registerCallbacks、this._app.getManager、this._app.getManager("scene").registerCallback、this._offsetPanel?.registerCallback。
   */
  registerCallbacks() {
    super.registerCallbacks();
    this._offsetPanel?.registerCallback("expandtoggle", this.setViewportOffset);
    this._app.getManager("scene").registerCallback("loaded", this._loaded);
  }
  /** @eyes-analysis
   * 移除本模块登记的事件订阅；调用 super.removeCallbacks, this._app.getManager。
   * 调用线索：super.removeCallbacks、this._app.getManager、this._app.getManager("scene").removeCallback、this._offsetPanel?.removeCallback。
   */
  removeCallbacks() {
    super.removeCallbacks();
    this._offsetPanel?.removeCallback("expandtoggle", this.setViewportOffset);
    this._app.getManager("scene").removeCallback("loaded", this._loaded);
  }
  /** @eyes-analysis
   * 重置上一目标留下的临时状态；调用 super._reset, this._app.getComponent。
   * 调用线索：super._reset、this._app.getComponent、this._app.getComponent("timeControls")?.setCanUpdate。
   */
  _reset() {
    super._reset();
    this._app.getComponent("timeControls")?.setCanUpdate(false);
  }
  /** @eyes-analysis
   * 把查询参数应用到时间、图层或模块状态；调用 super.processQuery。
   * 调用线索：super.processQuery。
   */
  async processQuery(t) {
    await super.processQuery(t);
  }
  /** @eyes-analysis
   * 把当前目标数据交给 UI 组件；调用 this._components.includes, this.app.getComponent, this._app.getManager, this._components.indexOf, this._components.push, this._components.splice, this.app.getManager, this._updateCollapsibleMenu, Manager.getEntityInfo, this._app.getComponent, Manager.updateHDTarget, Manager.getHDToggleEntity, Manager.toggleHDTextureForEntity, Manager.getSpheroidLayers；写入 _collapsibleItems。
   * 状态写入：_collapsibleItems。
   * 调用线索：Object.keys、Promise.all、Promise.all(this._collapsibleItems).then、contentManager.getEntityInfo、contentManager.getSpheroidLayers等。
   */
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
  /** @eyes-analysis
   * 执行 _loaded 对应的组件业务步骤；调用 PreloadManager.default.updateEmbedLoadPercent, PreloadManager.default.showEmbedViewButton。
   * 调用线索：PreloadManager.default.showEmbedViewButton、PreloadManager.default.updateEmbedLoadPercent。
   */
  _loaded(t) {
    PreloadManager.default.embedLoading && (PreloadManager.default.updateEmbedLoadPercent(100), PreloadManager.default.showEmbedViewButton());
  }
  /** @eyes-analysis
   * 把目标组件加载状态关联到场景加载提示；调用 super._updateLoading, this._app.getManager, this._loaded。
   * 调用线索：super._updateLoading、this._app.getManager、this._loaded。
   */
  _updateLoading(t) {
    super._updateLoading(t);
    const {
      _isLoading: _isLoading
    } = this._app.getManager("scene");
    _isLoading || this._loaded();
  }
  /** @eyes-analysis
   * 执行 _updateCollapsibleMenu 对应的组件业务步骤；调用 this._app.getComponent, this._components.includes, MenuComponent.removeAllItems, this._app.getManager, this._collapsibleItemOptions.filter, this._collapsibleItemOptions.map, Names.every, MenuComponent.addItem；写入 _collapsibleItemOptions, _collapsibleItems。
   * 状态写入：_collapsibleItemOptions、_collapsibleItems。
   * 调用线索：collapsibleMenuComponent.addItem、collapsibleMenuComponent.removeAllItems、e.componentNames.every、t?.componentNames?.includes、this._app.getComponent等。
   */
  _updateCollapsibleMenu() {
    const collapsibleMenuComponent = this._app.getComponent("collapsibleMenu");
    const e = this._components.includes("collapsibleMenu");
    if (!collapsibleMenuComponent) return;
    collapsibleMenuComponent.removeAllItems();
    const i = false === this._app.getManager("router").configs.timeControls;
    e && (i && (this._collapsibleItemOptions = this._collapsibleItemOptions.filter(t => !t?.componentNames?.includes("timeControls"))), this._collapsibleItems = this._collapsibleItemOptions.map(e => e.componentNames.every(t => this._components.includes(t)) && collapsibleMenuComponent.addItem(e)));
  }
  /** @eyes-analysis
   * 执行 _handleInfoPanelEmbedQueries 对应的组件业务步骤；调用 this._components.includes, this._app.getComponent, Object.keys, HTML.replace。
   * 调用线索：Object.keys、e[t].innerHTML.replace、e[t].innerHTML?.match、this._app.getComponent、this._components.includes。
   */
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
  /** @eyes-analysis
   * 执行 _showControls 对应的组件业务步骤；调用 this._app.getComponent, MenuComponent.show, Component.show, List.remove, List.add, this._app.getManager, Eyes.AppUtils.isMobileMode, Component.collapse, MenuComponent.collapse。
   * 调用线索：Eyes.AppUtils.isMobileMode、collapsibleMenuComponent.collapse、collapsibleMenuComponent.show、document.getElementById、document.getElementById("float-mid-bottom").classList.add等。
   */
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
  /** @eyes-analysis
   * 执行 _hideControls 对应的组件业务步骤；调用 Eyes.AppUtils.isMobileMode, this._app.getComponent, List.add, List.remove, TimelineComponent.hide。
   * 调用线索：Eyes.AppUtils.isMobileMode、document.getElementById、document.getElementById("float-mid-bottom").classList.add、document.getElementById("float-mid-bottom").classList.remove、eventsTimelineComponent.hide等。
   */
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
  /** @eyes-analysis
   * 执行 toggleViewUI 对应的组件业务步骤；调用 this._app.getManager, this._components.forEach, this._app.getComponent, List.remove, this.updateVisibility, List.add, this.setViewportOffset。
   * 调用线索：document.getElementById、i.includes、t.classList.add、t.classList.remove、this._app.getComponent等。
   */
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
  /** @eyes-analysis
   * 执行 shouldOffsetRight 对应的组件业务步骤；调用 Eyes.AppUtils.isDesktop。
   * 调用线索：Eyes.AppUtils.isDesktop。
   */
  get shouldOffsetRight() {
    return Eyes.AppUtils.isDesktop();
  }
  /** @eyes-analysis
   * 执行 shouldOffsetUp 对应的组件业务步骤；调用 Eyes.AppUtils.isDesktop。
   * 调用线索：Eyes.AppUtils.isDesktop。
   */
  get shouldOffsetUp() {
    return !Eyes.AppUtils.isDesktop();
  }
  /** @eyes-analysis
   * 执行 setViewportOffset 对应的组件业务步骤；调用 this._app.getManager, List.toggle。
   * 调用线索：document.body.classList.toggle、this._app.getManager、this._app.getManager("layer").getLayer、this._offsetPanel?.getState、this._offsetPanel?.isEnabled。
   */
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
  /** @eyes-analysis
   * 重排响应式界面；调用 this.setViewportOffset, super.resize。
   * 调用线索：super.resize、this.setViewportOffset。
   */
  resize() {
    this.setViewportOffset();
    super.resize();
  }
}
export { ExtendedBaseView as default };
