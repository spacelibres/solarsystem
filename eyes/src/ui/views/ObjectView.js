// Recovered from app.js:1392306-1401559.
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
import * as Pioneer from "../../engine/pioneer/index.js";
import * as Eyes from "../../framework/eyes/index.js";
import "../../app/public-api.js";
import * as ExtendedBaseView from "./ExtendedBaseView.js";
class ObjectView extends ExtendedBaseView.default {
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
  async onEnter(t) {
    const e = this._app.getComponent("contentPanel");
    this._offsetPanel = e;
    await super.onEnter(t, e?.components);
  }
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
  async onQueryChange(t) {
    await super.onQueryChange(t);
    this._app.getComponent("contentPanel").onQueryChange(t);
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
  getCurrentTarget() {
    return this._target;
  }
  appendForceLoadEntities(t) {
    this._forceLoadEntities.push(t);
  }
  removeForceLoadEntities(t) {
    if (!this._forceLoadEntities.includes(t)) return;
    const e = this._forceLoadEntities.indexOf(t);
    this._forceLoadEntities.splice(e, 1);
  }
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
  async _updateCameraOnParentChange(t) {}
  _loaded(t) {
    super._loaded(t);
    for (let e = 0; e < this._onLoaded.length; e++) this._onLoaded[e](t);
    this._onLoaded = [];
    this._hasLoaded = true;
  }
  _shouldHideControls() {
    const t = this._app.getComponent("contentPanel")?.getState("isVisible");
    const e = this._app.getComponent("contentPanel")?.getState("isExpanded");
    return Eyes.AppUtils.isMobileMode() && t && e;
  }
  after() {
    "function" == typeof this._onAfter && this._onAfter();
    this._onAfter = null;
  }
}
export { ObjectView };
