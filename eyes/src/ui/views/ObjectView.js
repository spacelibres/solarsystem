/** @eyes-analysis
 * 文件职责：对象页的实体准备、子父对象切换、覆盖时间及相机跟随
 * 依据：imports: ../../engine/solar-system/public-api.js, ../../engine/pioneer/index.js, ../../framework/eyes/index.js, ../../app/public-api.js, ./ExtendedBaseView.js；manager dependencies: content, layer, scene, cameraFollow, trajectory, router, time, selection
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1392306-1401559.
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
import * as Pioneer from "../../engine/pioneer/index.js";
import * as Eyes from "../../framework/eyes/index.js";
import "../../app/public-api.js";
import * as ExtendedBaseView from "./ExtendedBaseView.js";
/** @eyes-analysis
 * 类职责：对象页的实体准备、子父对象切换、覆盖时间及相机跟随；继承 ExtendedBaseView.default
 * 继承：ExtendedBaseView.default；导出：ObjectView。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ObjectView extends ExtendedBaseView.default {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 this._app.getManager, this.bindFunctions；写入 _entityInfo, _entityDesc, _scEvents, _featuredCardsList, _isSpacecraft, _forceLoadEntities, _hasLoaded, _onLoaded, _onAfter。
   * 状态写入：_entityDesc、_entityInfo、_featuredCardsList、_forceLoadEntities、_hasLoaded、_isSpacecraft、_onAfter、_onLoaded等；完整记录见索引。
   * 调用线索：super、this._app.getManager、this._app.getManager("content").getEntityInfo、this.bindFunctions。
   */
  constructor(...t) {
    super(...t);
    this._rules.spaceObject = {
      value: t => null !== this._app.getManager("content").getEntityInfo(t)
    };
    this._entityInfo = null;
    this._entityDesc = null;
    this._scEvents = null;
    this._featuredCardsList = null;
    this._isSpacecraft = false;
    this._forceLoadEntities = [];
    this._hasLoaded = null;
    this._onLoaded = [];
    this._onAfter = null;
    this.bindFunctions(["onParentChanged", "onChildChanged", "getCurrentTarget"]);
  }
  /** @eyes-analysis
   * 进入视图时准备界面和订阅；调用 this._app.getComponent, super.onEnter；写入 _offsetPanel。
   * 状态写入：_offsetPanel。
   * 调用线索：super.onEnter、this._app.getComponent。
   */
  async onEnter(t) {
    const e = this._app.getComponent("contentPanel");
    this._offsetPanel = e;
    await super.onEnter(t, e?.components);
  }
  /** @eyes-analysis
   * 离开视图时恢复状态并解除订阅；调用 this._app.getManager, this.app.getManager, super.onLeave。
   * 调用线索：e.removeChildChangedCallback、e.removeParentChangedCallback、super.onLeave、this._app.getManager、this._app.getManager("layer").toggleLayer等。
   */
  async onLeave(t) {
    this._app.getManager("layer").toggleLayer("heliosphere", {
      parentId: "sun"
    }, false);
    const e = this._app.getManager("scene").get("main").getEntity(this._target);
    null !== e && (e.removeParentChangedCallback(this.onParentChanged), e.removeChildChangedCallback(this.onChildChanged));
    this.app.getManager("cameraFollow").setEnabled(false, {
      resetCam: false,
      resetLimits: false,
      removeQueries: false
    });
    this.app.getManager("trajectory").isEnabled() && this.app.getManager("trajectory").setEnabled(false, t?.spaceObject);
    await super.onLeave(t);
  }
  /** @eyes-analysis
   * 响应路径参数变化并刷新本模块；调用 this._app.getManager, Manager.get, super.onRouteChange。
   * 调用线索：sceneManager.get、sceneManager.get("main").getEntity、super.onRouteChange、t.removeChildChangedCallback、t.removeParentChangedCallback等。
   */
  async onRouteChange(t) {
    const sceneManager = this._app.getManager("scene");
    if (null !== this._target) {
      const t = sceneManager.get("main").getEntity(this._target);
      null !== t && (t.removeParentChangedCallback(this.onParentChanged), t.removeChildChangedCallback(this.onChildChanged));
    }
    this._app.getManager("layer").toggleLayer("heliosphere", {
      parentId: "sun"
    }, false);
    if ("Moon" === this._app.getManager("content").getEntityInfo(t.spaceObject).category) {
      const e = this._app.getManager("scene").getParent(t.spaceObject);
      if (null !== e) {
        const i = "/" + e + "/moons/" + t.spaceObject;
        if (void 0 !== this._app.getManager("router").query.time) {
          const t = {
            time: this._app.getManager("time").getTimeUrl(),
            rate: this._app.getManager("time").getTimeRate()
          };
          this._app.getManager("router").reroute(i, t);
        } else this._app.getManager("router").reroute(i);
      }
    }
    super.onRouteChange(t);
  }
  /** @eyes-analysis
   * 响应查询参数变化；调用 super.onQueryChange, this._app.getComponent。
   * 调用线索：super.onQueryChange、this._app.getComponent、this._app.getComponent("contentPanel").onQueryChange。
   */
  async onQueryChange(t) {
    await super.onQueryChange(t);
    this._app.getComponent("contentPanel").onQueryChange(t);
  }
  /** @eyes-analysis
   * 登记跨组件或管理器事件订阅；调用 super.registerCallbacks, this._app.getComponent, PanelComponent.registerCallback。
   * 调用线索：contentPanelComponent.registerCallback、super.registerCallbacks、this._app.getComponent。
   */
  registerCallbacks() {
    super.registerCallbacks();
    const contentPanelComponent = this._app.getComponent("contentPanel");
    contentPanelComponent && (contentPanelComponent.registerCallback("visiblechange", this.updateVisibility), contentPanelComponent.registerCallback("expandtoggle", this.updateVisibility), contentPanelComponent.registerCallback("overlay", this.updateVisibility));
  }
  /** @eyes-analysis
   * 移除本模块登记的事件订阅；调用 super.removeCallbacks, this._app.getComponent, PanelComponent.removeCallback。
   * 调用线索：contentPanelComponent.removeCallback、super.removeCallbacks、this._app.getComponent。
   */
  removeCallbacks() {
    super.removeCallbacks();
    const contentPanelComponent = this._app.getComponent("contentPanel");
    contentPanelComponent && (contentPanelComponent.removeCallback("visiblechange", this.updateVisibility), contentPanelComponent.removeCallback("expandtoggle", this.updateVisibility), contentPanelComponent.removeCallback("overlay", this.updateVisibility));
  }
  /** @eyes-analysis
   * 重置上一目标留下的临时状态；调用 super._reset；写入 _entityDesc, _scEvents, _featuredCardsList, _scOrderedEvents, _isSpacecraft, _forceLoadEntities, _hasLoaded, _onLoaded, _target。
   * 状态写入：_entityDesc、_featuredCardsList、_forceLoadEntities、_hasLoaded、_isSpacecraft、_onLoaded、_scEvents、_scOrderedEvents等；完整记录见索引。
   * 调用线索：super._reset。
   */
  _reset(t) {
    super._reset(t);
    this._entityDesc = null;
    this._scEvents = null;
    this._featuredCardsList = null;
    this._scOrderedEvents = null;
    this._isSpacecraft = false;
    this._forceLoadEntities = [];
    this._hasLoaded = null;
    this._onLoaded = [];
    this._target = "moons" === t.feature && t.child ? t.child : t.spaceObject;
  }
  /** @eyes-analysis
   * 按目标和路由准备数据及实体；调用 this._app.getManager, this.app.getManager, this._app.pioneer.getScene, Manager.getEntityInfo, this._handleError, Manager.resetContext, this._forceLoadEntities.push, this._app.cameraScripts.isBarycenter, this._app.cameraScripts.removeBarycenter, Manager.setEntitiesForceVisible, this._app.scene.waitTillEntitiesInPlace, Manager.setTarget, this._entityInfo.category.toLowerCase, Manager.loadEvents；写入 _entityInfo, _isSpacecraft, _hasLoaded, _scEvents, _scOrderedEvents, _entityDesc, _featuredCardsList。
   * 状态写入：_entityDesc、_entityInfo、_featuredCardsList、_hasLoaded、_isSpacecraft、_scEvents、_scOrderedEvents。
   * 调用线索：Eyes.AppUtils.deepCopy、console.error、contentManager.getEntityInfo、contentManager.getStoryList、contentManager.loadDescriptions等。
   */
  async _updateResources(t) {
    const contentManager = this._app.getManager("content");
    const sceneManager = this.app.getManager("scene");
    const layerManager = this._app.getManager("layer");
    this._app.pioneer.getScene("main");
    if (this._entityInfo = contentManager.getEntityInfo(this._target), null === this._entityInfo) return void this._handleError(`ObjectView._updateResources: Cannot find entity named ${this._target}.`);
    contentManager.resetContext();
    null !== this._target && this._forceLoadEntities.push(this._target);
    this._app.cameraScripts.isBarycenter(this._target) && this._forceLoadEntities.push(this._app.cameraScripts.removeBarycenter(this._target));
    const {
      followId: followId
    } = t;
    followId && this._forceLoadEntities.push(followId);
    const r = [...new Set(this._forceLoadEntities)];
    sceneManager.setEntitiesForceVisible(r, false);
    await this._app.scene.waitTillEntitiesInPlace(this._forceLoadEntities);
    layerManager.setTarget(this._target);
    this._app.getManager("selection").selectEntity(this._target);
    if ("spacecraft" === this._entityInfo.category.toLowerCase() && (this._isSpacecraft = true, this._hasLoaded = false), this._entityInfo.hasEvents) {
      try {
        await contentManager.loadEvents(this._target, {
          all: "all_events"
        });
      } catch (t) {
        console.error("ObjectView._updateResources:", t);
      }
      if (t.cancelToken.isCanceled) return;
      null !== contentManager.context.events && (this._scEvents = Eyes.AppUtils.deepCopy(contentManager.context.events));
      null !== contentManager.context.orderedEvents && (this._scOrderedEvents = Eyes.AppUtils.deepCopy(contentManager.context.orderedEvents));
    }
    if (await contentManager.loadDescriptions([this._target]), t.cancelToken.isCanceled) return;
    null !== contentManager.context[this._target] && (this._entityDesc = Eyes.AppUtils.deepCopy(contentManager.context[this._target]));
    let a = null;
    if (null !== this._entityDesc && (a = this._entityDesc.cards), null != a) {
      const t = Eyes.AppUtils.deepCopy(contentManager.getStoryList());
      this._featuredCardsList = [];
      for (let e = 0; e < a.length; e++) {
        const i = a[e].storyId;
        void 0 !== t.stories[i] ? this._featuredCardsList.push(t.stories[i]) : t.internal && void 0 !== t.internal[i] ? (t.internal[i].isInternal = true, this._featuredCardsList.push(t.internal[i])) : t.external && void 0 !== t.external[i] && (t.external[i].isExternal = true, this._featuredCardsList.push(t.external[i]));
      }
    }
  }
  /** @eyes-analysis
   * 执行 getCurrentTarget 对应的组件业务步骤。
   */
  getCurrentTarget() {
    return this._target;
  }
  /** @eyes-analysis
   * 执行 appendForceLoadEntities 对应的组件业务步骤；调用 this._forceLoadEntities.push。
   * 调用线索：this._forceLoadEntities.push。
   */
  appendForceLoadEntities(t) {
    this._forceLoadEntities.push(t);
  }
  /** @eyes-analysis
   * 执行 removeForceLoadEntities 对应的组件业务步骤；调用 this._forceLoadEntities.includes, this._forceLoadEntities.indexOf, this._forceLoadEntities.splice。
   * 调用线索：this._forceLoadEntities.includes、this._forceLoadEntities.indexOf、this._forceLoadEntities.splice。
   */
  removeForceLoadEntities(t) {
    if (!this._forceLoadEntities.includes(t)) return;
    const e = this._forceLoadEntities.indexOf(t);
    this._forceLoadEntities.splice(e, 1);
  }
  /** @eyes-analysis
   * 执行 onChildChanged 对应的组件业务步骤；调用 this._app.getComponent, this._app.getManager, PanelComponent.onChildParentChange。
   * 调用线索：contentPanelComponent.onChildParentChange、e.getComponent、this._app.getComponent、this._app.getManager、this._app.getManager("content").getEntityInfo。
   */
  async onChildChanged(t, e) {
    if (null === e.getComponent(Pioneer.CameraComponent) && null !== this._target) {
      const contentPanelComponent = this._app.getComponent("contentPanel");
      const i = "Instrument" === (this._app.getManager("content").getEntityInfo(e)?.category || "");
      const {
        followId: followId
      } = this._app.getManager("router").query;
      !contentPanelComponent || i || followId || (await contentPanelComponent.onChildParentChange(this._target, this._entityInfo, true));
    }
  }
  /** @eyes-analysis
   * 执行 onParentChanged 对应的组件业务步骤；调用 this._app.getManager, Manager.resetContextualLayers, this._app.getComponent, PanelComponent.onChildParentChange, this._updateCamera。
   * 调用线索：contentPanelComponent.onChildParentChange、e.getName、i.getName、layerManager.resetContextualLayers、this._app.getComponent等。
   */
  async onParentChanged(t, e, i) {
    if (null !== this._target) {
      const layerManager = this._app.getManager("layer");
      const s = null !== e ? e.getName() : "";
      const n = null !== i ? i.getName() : "";
      layerManager.resetContextualLayers(n, s);
      const contentPanelComponent = this._app.getComponent("contentPanel");
      contentPanelComponent && (await contentPanelComponent.onChildParentChange(this._target, this._entityInfo, true));
      this._updateCamera({
        oldParent: s,
        newParent: n
      });
    }
  }
  /** @eyes-analysis
   * 把当前目标数据交给 UI 组件；调用 super._updateComponents, this._app.getManager, Manager.currentRoute.url.match, this._app.getComponent, this._components.includes, Promise.all, this._collapsibleItems.find, TimelineComponent.setTarget, this._onLoaded.push, TimelineComponent.resize, PanelComponent.clearPanel, PanelComponent.onRouteChangeObject, this.getCurrentTarget, PanelComponent.onRouteChangeObjectLoaded；写入 _collapsibleItems, _onLoaded。
   * 状态写入：_collapsibleItems、_onLoaded。
   * 调用线索：Promise.all、Promise.all(this._collapsibleItems).then、contentPanelComponent.clearPanel、contentPanelComponent.collapse、contentPanelComponent.getState等。
   */
  async _updateComponents(t) {
    super._updateComponents(t);
    const routerManager = this._app.getManager("router");
    const i = routerManager.currentRoute.url.match(/[^/]+/g);
    this._app.getComponent("breadcrumb").onRouteChange({
      ...t,
      routeParts: i
    });
    if (this._components.includes("eventsTimeline")) {
      this._collapsibleItems = await Promise.all(this._collapsibleItems).then(t => t.filter(t => t));
      const t = this._collapsibleItems.find(t => "Events Timeline" === t.getState("itemTitle"));
      routerManager.previousRoute.params?.spaceObject !== this._target && t?.hide();
      const {
        id: id,
        iauName: iauName,
        displayName: displayName
      } = this._entityInfo;
      const {
        dates: dates
      } = this._entityDesc;
      const r = {
        id: id,
        title: iauName || displayName,
        dates: dates,
        orderedEvents: this._scOrderedEvents
      };
      const eventsTimelineComponent = this._app.getComponent("eventsTimeline");
      if (eventsTimelineComponent.setTarget(r), this._onLoaded.push(() => {
        eventsTimelineComponent.resize();
        t?.show();
      }), this._hasLoaded) {
        for (let t = 0; t < this._onLoaded.length; t++) this._onLoaded[t]();
        this._onLoaded = [];
      }
    }
    if (null !== this._target) {
      const contentPanelComponent = this._app.getComponent("contentPanel");
      if (contentPanelComponent) {
        const s = true === t.embed || false === t.detailPanel;
        const n = this._entityDesc?.title || this._entityInfo.displayName || this._entityInfo.iauName;
        contentPanelComponent.clearPanel(n);
        await contentPanelComponent.onRouteChangeObject(this._target, this._entityInfo, this._entityDesc, this._scEvents, this._featuredCardsList, t.cancelToken, i);
        this._onLoaded.push(async n => {
          t.cancelToken && t.cancelToken.isCanceled && n !== this.getCurrentTarget() || (await contentPanelComponent.onRouteChangeObjectLoaded(this._target, this._entityInfo, this._entityDesc, this._scEvents, this._featuredCardsList, t, i), contentPanelComponent.show(), s && !contentPanelComponent.getState("isCollapsed") && contentPanelComponent.collapse());
        });
      }
      const s = this._app.getManager("scene").get("main").getEntity(this._target);
      s.addParentChangedCallback(this.onParentChanged);
      s.addChildChangedCallback(this.onChildChanged);
    }
  }
  /** @eyes-analysis
   * 将时间限制收敛到目标覆盖范围；调用 Math.abs, super._updateTimeForTarget, this._app.getManager, Manager.parseTime, Manager.isWithinLimits, Manager.getTimeUrl, this._app.getComponent, Manager.reroute；写入 _onAfter。
   * 状态写入：_onAfter。
   * 调用线索：Math.abs、routerManager.reroute、super._updateTimeForTarget、this._app.getComponent、this._app.getComponent("clock")?.setLimitMessage等。
   */
  async _updateTimeForTarget(t) {
    t.setTimeLimits = true;
    let e = false;
    t.rate && Math.abs(t.rate) < 60 && (e = true);
    await super._updateTimeForTarget(t, e);
    const timeManager = this._app.getManager("time");
    const routerManager = this._app.getManager("router");
    const n = timeManager.parseTime(t.time);
    const o = timeManager.isWithinLimits(n);
    if (0 !== o) {
      const {
        min: min,
        max: max
      } = timeManager.timeLimits;
      let n;
      1 === o && max ? n = timeManager.getTimeUrl(max) : -1 === o && min && (n = timeManager.getTimeUrl(min));
      n && (this._app.getComponent("clock")?.setLimitMessage(o), this._onAfter = () => {
        routerManager.reroute(routerManager.currentRoute.url, {
          time: n
        });
      });
    }
  }
  /** @eyes-analysis
   * 按当前模式定位相机与目标；调用 this._entityInfo.category.toLowerCase, this._app.getManager, this._app.getComponent, this._updateCameraOnParentChange, Scripts.alignSpacecraftPlanet, Scripts.goToSpacecraft, Scripts.goToInstrument, Scripts.goToCelestialObject, this.app.getManager, Manager.setEntitiesForceVisible, Manager.getCMTSEntity, SolarSystemSceneExports.Mapping.set, this._app.pioneer.getScene。
   * 调用线索：SolarSystemSceneExports.Mapping.set、cameraScripts.alignSpacecraftPlanet、cameraScripts.goToCelestialObject、cameraScripts.goToInstrument、cameraScripts.goToSpacecraft等。
   */
  async _updateCamera(t) {
    const e = this._entityInfo.category.toLowerCase();
    const {
      cameraScripts: cameraScripts
    } = this._app;
    const o = this._app.getManager("content").hasLanded(this._entityInfo);
    const contentPanelComponent = this._app.getComponent("contentPanel");
    void 0 !== t?.oldParent ? await this._updateCameraOnParentChange(t) : contentPanelComponent?.isEnabled() || ("spacecraft" === e ? o ? await cameraScripts.alignSpacecraftPlanet(this._target) : await cameraScripts.goToSpacecraft(this._target) : "landing site" === e ? await cameraScripts.alignSpacecraftPlanet(this._target) : "goToInstrument" === e ? await cameraScripts.goToInstrument(this._target) : await cameraScripts.goToCelestialObject(this._target));
    const sceneManager = this.app.getManager("scene");
    sceneManager.setEntitiesForceVisible(this._forceLoadEntities, true);
    const l = sceneManager.getCMTSEntity(this._target);
    l && "mars" === l.getName() && (l.getComponent(SolarSystemSceneExports.WMTSComponent) && l.removeComponent(l.getComponent(SolarSystemSceneExports.WMTSComponent)), SolarSystemSceneExports.Mapping.set(this._app.pioneer.getScene("main"), l.getName(), "cmts", {
      floatingClouds: true
    }), l.getComponent(Pioneer.CMTSComponent)?.setEnabled(true));
  }
  /** @eyes-analysis
   * 执行 _updateCameraOnParentChange 对应的组件业务步骤。
   */
  async _updateCameraOnParentChange(t) {}
  /** @eyes-analysis
   * 执行 _loaded 对应的组件业务步骤；调用 super._loaded；写入 _onLoaded, _hasLoaded。
   * 状态写入：_hasLoaded、_onLoaded。
   * 调用线索：super._loaded、this._onLoaded[e]。
   */
  _loaded(t) {
    super._loaded(t);
    for (let e = 0; e < this._onLoaded.length; e++) this._onLoaded[e](t);
    this._onLoaded = [];
    this._hasLoaded = true;
  }
  /** @eyes-analysis
   * 根据面板状态判断是否隐藏控制项；调用 this._app.getComponent, Eyes.AppUtils.isMobileMode。
   * 调用线索：Eyes.AppUtils.isMobileMode、this._app.getComponent、this._app.getComponent("contentPanel")?.getState。
   */
  _shouldHideControls() {
    const t = this._app.getComponent("contentPanel")?.getState("isVisible");
    const e = this._app.getComponent("contentPanel")?.getState("isExpanded");
    return Eyes.AppUtils.isMobileMode() && t && e;
  }
  /** @eyes-analysis
   * 执行路由更新后的收尾步骤；调用 this._onAfter；写入 _onAfter。
   * 状态写入：_onAfter。
   * 调用线索：this._onAfter。
   */
  after() {
    "function" == typeof this._onAfter && this._onAfter();
    this._onAfter = null;
  }
}
export { ObjectView };
