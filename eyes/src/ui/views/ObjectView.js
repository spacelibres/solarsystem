// Recovered from app.js:1392306-1401559.
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
import * as Pioneer from "../../engine/pioneer/index.js";
import * as Eyes from "../../framework/eyes/index.js";
import "../../app/public-api.js";
import * as ExtendedBaseView from "./ExtendedBaseView.js";
class ObjectView extends ExtendedBaseView.default {
  constructor(...constructorArgs) {
    super(...constructorArgs);
    this._rules.spaceObject = {
      value: entityId => null !== this._app.getManager("content").getEntityInfo(entityId)
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
  async onEnter(routeParams) {
    const contentPanel = this._app.getComponent("contentPanel");
    this._offsetPanel = contentPanel;
    await super.onEnter(routeParams, contentPanel?.components);
  }
  async onLeave(routeParams) {
    this._app.getManager("layer").toggleLayer("heliosphere", {
      parentId: "sun"
    }, false);
    const targetEntity = this._app.getManager("scene").get("main").getEntity(this._target);
    null !== targetEntity && (targetEntity.removeParentChangedCallback(this.onParentChanged), targetEntity.removeChildChangedCallback(this.onChildChanged));
    this.app.getManager("cameraFollow").setEnabled(false, {
      resetCam: false,
      resetLimits: false,
      removeQueries: false
    });
    this.app.getManager("trajectory").isEnabled() && this.app.getManager("trajectory").setEnabled(false, routeParams?.spaceObject);
    await super.onLeave(routeParams);
  }
  async onRouteChange(routeParams) {
    const sceneManager = this._app.getManager("scene");
    if (null !== this._target) {
      const previousTargetEntity = sceneManager.get("main").getEntity(this._target);
      null !== previousTargetEntity && (previousTargetEntity.removeParentChangedCallback(this.onParentChanged), previousTargetEntity.removeChildChangedCallback(this.onChildChanged));
    }
    this._app.getManager("layer").toggleLayer("heliosphere", {
      parentId: "sun"
    }, false);
    if ("Moon" === this._app.getManager("content").getEntityInfo(routeParams.spaceObject).category) {
      const parentEntityId = this._app.getManager("scene").getParent(routeParams.spaceObject);
      if (null !== parentEntityId) {
        const moonRoute = "/" + parentEntityId + "/moons/" + routeParams.spaceObject;
        if (void 0 !== this._app.getManager("router").query.time) {
          const timeQuery = {
            time: this._app.getManager("time").getTimeUrl(),
            rate: this._app.getManager("time").getTimeRate()
          };
          this._app.getManager("router").reroute(moonRoute, timeQuery);
        } else this._app.getManager("router").reroute(moonRoute);
      }
    }
    super.onRouteChange(routeParams);
  }
  async onQueryChange(routeParams) {
    await super.onQueryChange(routeParams);
    this._app.getComponent("contentPanel").onQueryChange(routeParams);
  }
  registerCallbacks() {
    super.registerCallbacks();
    const contentPanelComponent = this._app.getComponent("contentPanel");
    contentPanelComponent && (contentPanelComponent.registerCallback("visiblechange", this.updateVisibility), contentPanelComponent.registerCallback("expandtoggle", this.updateVisibility), contentPanelComponent.registerCallback("overlay", this.updateVisibility));
  }
  removeCallbacks() {
    super.removeCallbacks();
    const contentPanelComponent = this._app.getComponent("contentPanel");
    contentPanelComponent && (contentPanelComponent.removeCallback("visiblechange", this.updateVisibility), contentPanelComponent.removeCallback("expandtoggle", this.updateVisibility), contentPanelComponent.removeCallback("overlay", this.updateVisibility));
  }
  _reset(routeParams) {
    super._reset(routeParams);
    this._entityDesc = null;
    this._scEvents = null;
    this._featuredCardsList = null;
    this._scOrderedEvents = null;
    this._isSpacecraft = false;
    this._forceLoadEntities = [];
    this._hasLoaded = null;
    this._onLoaded = [];
    this._target = "moons" === routeParams.feature && routeParams.child ? routeParams.child : routeParams.spaceObject;
  }
  // 对象、重心对应实体与跟随对象共同参与强制加载。描述和故事卡片取自 content 上下文的副本，路由取消后不再提交后续资源。
  async _updateResources(routeParams) {
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
    } = routeParams;
    followId && this._forceLoadEntities.push(followId);
    const uniqueEntityIds = [...new Set(this._forceLoadEntities)];
    sceneManager.setEntitiesForceVisible(uniqueEntityIds, false);
    await this._app.scene.waitTillEntitiesInPlace(this._forceLoadEntities);
    layerManager.setTarget(this._target);
    this._app.getManager("selection").selectEntity(this._target);
    if ("spacecraft" === this._entityInfo.category.toLowerCase() && (this._isSpacecraft = true, this._hasLoaded = false), this._entityInfo.hasEvents) {
      try {
        await contentManager.loadEvents(this._target, {
          all: "all_events"
        });
      } catch (loadError) {
        console.error("ObjectView._updateResources:", loadError);
      }
      if (routeParams.cancelToken.isCanceled) return;
      null !== contentManager.context.events && (this._scEvents = Eyes.AppUtils.deepCopy(contentManager.context.events));
      null !== contentManager.context.orderedEvents && (this._scOrderedEvents = Eyes.AppUtils.deepCopy(contentManager.context.orderedEvents));
    }
    if (await contentManager.loadDescriptions([this._target]), routeParams.cancelToken.isCanceled) return;
    null !== contentManager.context[this._target] && (this._entityDesc = Eyes.AppUtils.deepCopy(contentManager.context[this._target]));
    let storyCards = null;
    if (null !== this._entityDesc && (storyCards = this._entityDesc.cards), null != storyCards) {
      const storyCatalog = Eyes.AppUtils.deepCopy(contentManager.getStoryList());
      this._featuredCardsList = [];
      for (let cardIndex = 0; cardIndex < storyCards.length; cardIndex++) {
        const storyId = storyCards[cardIndex].storyId;
        void 0 !== storyCatalog.stories[storyId] ? this._featuredCardsList.push(storyCatalog.stories[storyId]) : storyCatalog.internal && void 0 !== storyCatalog.internal[storyId] ? (storyCatalog.internal[storyId].isInternal = true, this._featuredCardsList.push(storyCatalog.internal[storyId])) : storyCatalog.external && void 0 !== storyCatalog.external[storyId] && (storyCatalog.external[storyId].isExternal = true, this._featuredCardsList.push(storyCatalog.external[storyId]));
      }
    }
  }
  getCurrentTarget() {
    return this._target;
  }
  appendForceLoadEntities(entityId) {
    this._forceLoadEntities.push(entityId);
  }
  removeForceLoadEntities(entityId) {
    if (!this._forceLoadEntities.includes(entityId)) return;
    const entityIndex = this._forceLoadEntities.indexOf(entityId);
    this._forceLoadEntities.splice(entityIndex, 1);
  }
  async onChildChanged(parentEntity, childEntity) {
    if (null === childEntity.getComponent(Pioneer.CameraComponent) && null !== this._target) {
      const contentPanelComponent = this._app.getComponent("contentPanel");
      const isInstrument = "Instrument" === (this._app.getManager("content").getEntityInfo(childEntity)?.category || "");
      const {
        followId: followId
      } = this._app.getManager("router").query;
      !contentPanelComponent || isInstrument || followId || (await contentPanelComponent.onChildParentChange(this._target, this._entityInfo, true));
    }
  }
  // 父实体变化会重建上下文图层并通知面板；相机收到旧、新父名称，避免把实体句柄误当作路由对象 id。
  async onParentChanged(entity, oldParent, newParent) {
    if (null !== this._target) {
      const layerManager = this._app.getManager("layer");
      const oldParentName = null !== oldParent ? oldParent.getName() : "";
      const newParentName = null !== newParent ? newParent.getName() : "";
      layerManager.resetContextualLayers(newParentName, oldParentName);
      const contentPanelComponent = this._app.getComponent("contentPanel");
      contentPanelComponent && (await contentPanelComponent.onChildParentChange(this._target, this._entityInfo, true));
      this._updateCamera({
        oldParent: oldParentName,
        newParent: newParentName
      });
    }
  }
  // 时间线与内容面板的后半段刷新放入 _onLoaded 队列；加载完成后统一执行并清空。队列归当前对象视图持有，重置对象时重新创建。
  async _updateComponents(routeParams) {
    super._updateComponents(routeParams);
    const routerManager = this._app.getManager("router");
    const routeParts = routerManager.currentRoute.url.match(/[^/]+/g);
    this._app.getComponent("breadcrumb").onRouteChange({
      ...routeParams,
      routeParts: routeParts
    });
    if (this._components.includes("eventsTimeline")) {
      this._collapsibleItems = await Promise.all(this._collapsibleItems).then(resolvedItems => resolvedItems.filter(collapsibleItem => collapsibleItem));
      const timelineItem = this._collapsibleItems.find(collapsibleItem => "Events Timeline" === collapsibleItem.getState("itemTitle"));
      routerManager.previousRoute.params?.spaceObject !== this._target && timelineItem?.hide();
      const {
        id: id,
        iauName: iauName,
        displayName: displayName
      } = this._entityInfo;
      const {
        dates: dates
      } = this._entityDesc;
      const timelineTarget = {
        id: id,
        title: iauName || displayName,
        dates: dates,
        orderedEvents: this._scOrderedEvents
      };
      const eventsTimelineComponent = this._app.getComponent("eventsTimeline");
      if (eventsTimelineComponent.setTarget(timelineTarget), this._onLoaded.push(() => {
        eventsTimelineComponent.resize();
        timelineItem?.show();
      }), this._hasLoaded) {
        for (let callbackIndex = 0; callbackIndex < this._onLoaded.length; callbackIndex++) this._onLoaded[callbackIndex]();
        this._onLoaded = [];
      }
    }
    if (null !== this._target) {
      const contentPanelComponent = this._app.getComponent("contentPanel");
      if (contentPanelComponent) {
        const shouldCollapse = true === routeParams.embed || false === routeParams.detailPanel;
        const panelTitle = this._entityDesc?.title || this._entityInfo.displayName || this._entityInfo.iauName;
        contentPanelComponent.clearPanel(panelTitle);
        await contentPanelComponent.onRouteChangeObject(this._target, this._entityInfo, this._entityDesc, this._scEvents, this._featuredCardsList, routeParams.cancelToken, routeParts);
        this._onLoaded.push(async loadedEntityId => {
          routeParams.cancelToken && routeParams.cancelToken.isCanceled && loadedEntityId !== this.getCurrentTarget() || (await contentPanelComponent.onRouteChangeObjectLoaded(this._target, this._entityInfo, this._entityDesc, this._scEvents, this._featuredCardsList, routeParams, routeParts), contentPanelComponent.show(), shouldCollapse && !contentPanelComponent.getState("isCollapsed") && contentPanelComponent.collapse());
        });
      }
      const targetEntity = this._app.getManager("scene").get("main").getEntity(this._target);
      targetEntity.addParentChangedCallback(this.onParentChanged);
      targetEntity.addChildChangedCallback(this.onChildChanged);
    }
  }
  async _updateTimeForTarget(routeParams) {
    routeParams.setTimeLimits = true;
    let waitForEntity = false;
    routeParams.rate && Math.abs(routeParams.rate) < 60 && (waitForEntity = true);
    await super._updateTimeForTarget(routeParams, waitForEntity);
    const timeManager = this._app.getManager("time");
    const routerManager = this._app.getManager("router");
    const requestedTime = timeManager.parseTime(routeParams.time);
    const limitDirection = timeManager.isWithinLimits(requestedTime);
    if (0 !== limitDirection) {
      const {
        min: min,
        max: max
      } = timeManager.timeLimits;
      let boundedTimeUrl;
      1 === limitDirection && max ? boundedTimeUrl = timeManager.getTimeUrl(max) : -1 === limitDirection && min && (boundedTimeUrl = timeManager.getTimeUrl(min));
      boundedTimeUrl && (this._app.getComponent("clock")?.setLimitMessage(limitDirection), this._onAfter = () => {
        routerManager.reroute(routerManager.currentRoute.url, {
          time: boundedTimeUrl
        });
      });
    }
  }
  async _updateCamera(routeParams) {
    const category = this._entityInfo.category.toLowerCase();
    const {
      cameraScripts: cameraScripts
    } = this._app;
    const hasLanded = this._app.getManager("content").hasLanded(this._entityInfo);
    const contentPanelComponent = this._app.getComponent("contentPanel");
    void 0 !== routeParams?.oldParent ? await this._updateCameraOnParentChange(routeParams) : contentPanelComponent?.isEnabled() || ("spacecraft" === category ? hasLanded ? await cameraScripts.alignSpacecraftPlanet(this._target) : await cameraScripts.goToSpacecraft(this._target) : "landing site" === category ? await cameraScripts.alignSpacecraftPlanet(this._target) : "goToInstrument" === category ? await cameraScripts.goToInstrument(this._target) : await cameraScripts.goToCelestialObject(this._target));
    const sceneManager = this.app.getManager("scene");
    sceneManager.setEntitiesForceVisible(this._forceLoadEntities, true);
    const tiledEntity = sceneManager.getCMTSEntity(this._target);
    tiledEntity && "mars" === tiledEntity.getName() && (tiledEntity.getComponent(SolarSystemSceneExports.WMTSComponent) && tiledEntity.removeComponent(tiledEntity.getComponent(SolarSystemSceneExports.WMTSComponent)), SolarSystemSceneExports.Mapping.set(this._app.pioneer.getScene("main"), tiledEntity.getName(), "cmts", {
      floatingClouds: true
    }), tiledEntity.getComponent(Pioneer.CMTSComponent)?.setEnabled(true));
  }
  async _updateCameraOnParentChange(routeParams) {}
  _loaded(loadedEntityId) {
    super._loaded(loadedEntityId);
    for (let callbackIndex = 0; callbackIndex < this._onLoaded.length; callbackIndex++) this._onLoaded[callbackIndex](loadedEntityId);
    this._onLoaded = [];
    this._hasLoaded = true;
  }
  _shouldHideControls() {
    const isPanelVisible = this._app.getComponent("contentPanel")?.getState("isVisible");
    const isPanelExpanded = this._app.getComponent("contentPanel")?.getState("isExpanded");
    return Eyes.AppUtils.isMobileMode() && isPanelVisible && isPanelExpanded;
  }
  after() {
    "function" == typeof this._onAfter && this._onAfter();
    this._onAfter = null;
  }
}
export { ObjectView };
