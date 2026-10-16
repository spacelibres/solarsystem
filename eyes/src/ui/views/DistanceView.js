// Recovered from app.js:1666469-1673135.
import * as Eyes from "../../framework/eyes/index.js";
import * as DistanceManager from "../../engine/managers/DistanceManager.js";
import * as ExtendedBaseView from "./ExtendedBaseView.js";
class DistanceView extends ExtendedBaseView.default {
  constructor(...t) {
    super(...t);
    this._rules = {
      ...this._rules,
      spaceObject: {
        value: t => null !== this._app.getManager("content").getEntityInfo(t)
      },
      to: {
        value: t => {
          const {
            spaceObject: spaceObject
          } = this._app.getManager("router").currentRoute.params;
          const contentManager = this._app.getManager("content");
          const sceneManager = this._app.getManager("scene");
          const n = "string" == typeof t ? t?.split(",") : [];
          const o = n.every(t => null !== contentManager.getEntityInfo(t));
          const r = n.some(t => t === spaceObject);
          const a = n.every(t => Boolean(sceneManager._entityStatuses.get(t)));
          return o && a && !r;
        }
      }
    };
    this._forceLoadEntities = [];
    this._spaceObjectChanged = null;
    this._targetChanged = null;
    this._timeChanged = null;
    this._rateChanged = null;
    this._redirect = null;
    this.bindFunctions(["onIsMobileChange"]);
  }
  async onEnter(t) {
    this.distanceManager ??= this.app.addManager("distance", DistanceManager.DistanceManager);
    this.distancePanel ??= this.app.getComponent("distancePanel");
    this.distancePanel.show();
    this.distanceManager.init();
    this.app.getComponent("collapsibleMenu")?.setAllowMultiple(false);
    this.distancePanel.initSearchUI();
    this.distancePanel.isMobileChangedCallback = this.onIsMobileChange;
    this.setBreadcrumbStaticTextVisible();
    this.updateVisibility();
    await super.onEnter(t);
  }
  async onLeave(t) {
    this.app.getComponent("collapsibleMenu")?.setAllowMultiple(true);
    this.distancePanel.isMobileChangedCallback = null;
    this.distanceManager.deinit();
    this.setBreadcrumbStaticTextVisible(true);
    await super.onLeave(t);
  }
  registerCallbacks() {
    super.registerCallbacks();
    this._app.getManager("time").registerCallback("update", this.distanceManager.update);
  }
  removeCallbacks() {
    super.removeCallbacks();
    this._app.getManager("time").removeCallback("update", this.distanceManager.update);
  }
  async processQuery(t) {
    await super.processQuery(t);
    const {
      spaceObject: spaceObject,
      to: to,
      time: time,
      rate: rate
    } = t;
    const routerManager = this.app.getManager("router");
    const sceneManager = this.app.getManager("scene");
    const {
      query: query,
      params: params
    } = routerManager.previousRoute;
    const {
      to: c,
      time: h,
      rate: d
    } = routerManager.parseQuery(query);
    if (this._spaceObjectChanged = params?.spaceObject !== spaceObject, this._targetChanged = c !== to, this._timeChanged = h !== time, this._rateChanged = d !== rate, query && !this._spaceObjectChanged && !this._targetChanged && !this._redirect) return void t.cancelToken.cancel();
    this.distanceManager.setIsWaitingForEntities(true);
    this.distanceManager.setBetweenPosHidden(true);
    this._forceLoadEntities = [spaceObject];
    const u = "string" == typeof to ? to.split(",") : [];
    u && this._forceLoadEntities.push(...u);
    this._forceLoadEntities = this._forceLoadEntities.map(t => [t, ...sceneManager.getDependencies(t)]);
    this._forceLoadEntities = [...new Set(this._forceLoadEntities.flat())];
    sceneManager.setEntitiesForceVisible(this._forceLoadEntities, true);
    this.distanceManager.setTargetDistanceEntities(u);
  }
  async onQueryChange(t) {
    if (this.distanceManager.setIsWaitingForEntities(true), await super.onQueryChange(t), t.cancelToken.isCanceled) {
      this.distanceManager.setIsWaitingForEntities(false);
      return void this.distanceManager.updateMeasurement(false);
    }
    this._updateComponents(t);
    await this._checkReady(t);
    await this._updateCamera(t);
  }
  async _updateTime(t) {
    const timeManager = this.app.getManager("time");
    if (t.time) {
      timeManager.parseTime(t.time).isValid() ? timeManager.setTime(t.time) : this._app.getManager("router").navigate({
        __remove: ["time"]
      });
    }
  }
  _reset(t) {
    super._reset(t);
    this._forceLoadEntities = [];
    this.distanceManager.resetAllDistanceEntities();
  }
  async _updateResources({
    spaceObject: spaceObject
  }) {
    this.app.getManager("scene").setEntitiesForceVisible([spaceObject], false);
    this.distanceManager.setSourceDistanceEntity(spaceObject);
    this._app.getManager("layer").setTarget(spaceObject);
    this._app.getManager("selection").selectEntity(spaceObject);
  }
  async _updateComponents(t) {
    super._updateComponents(t);
    const routerManager = this._app.getManager("router");
    const breadcrumbComponent = this._app.getComponent("breadcrumb");
    const {
      targetDisplayNames: targetDisplayNames
    } = this.distanceManager;
    const n = "Distance to" + (targetDisplayNames.length ? ` ${targetDisplayNames.join(" & ")}` : "");
    breadcrumbComponent._crumbTexts.distance = n;
    const o = routerManager.currentRoute.url.match(/[^/]+/g);
    breadcrumbComponent.onRouteChange({
      routeParts: o
    });
  }
  async _checkReady(t) {
    const timeManager = this.app.getManager("time");
    const i = t.time ? timeManager.parseTime(t.time) : timeManager.getTime();
    const s = timeManager.momentToET(i);
    const n = this.distanceManager.measureDistance(false, s);
    if (this.distanceManager.hasTarget && this.distancePanel.setIsLoading(true), await this._app.scene.waitTillEntitiesInPlace(this._forceLoadEntities, s), this.distancePanel.setIsLoading(false), !t.cancelToken.isCanceled) {
      if (this.distanceManager.hasTarget && !this._checkCoverageOverlap(t)) {
        await this.distanceManager.setTempErrorResult("« Source and target do not co-exist »");
        this._redirect = true;
        return void this._app.getManager("router").navigate({
          __remove: ["to"]
        });
      }
      this.distanceManager.setIsWaitingForEntities(false);
      this._redirect = false;
      !n && this.distanceManager.updateMeasurement(null, true);
    }
  }
  _checkCoverageOverlap(t) {
    const timeManager = this.app.getManager("time");
    const sceneManager = this.app.getManager("scene");
    const routerManager = this.app.getManager("router");
    const {
      id: id
    } = this.distanceManager.sourceDistanceEntity || {};
    const {
      id: o
    } = this.distanceManager.targetDistanceEntities[0] || {};
    const {
      min: min,
      max: max
    } = timeManager.getDefaultLimits();
    const {
      min: l,
      max: c
    } = id ? sceneManager.getCoverage(id) : {};
    const {
      min: h,
      max: d
    } = o ? sceneManager.getCoverage(o) : {};
    const u = l?.isValid() ? l.valueOf() : min.valueOf();
    const p = c?.isValid() ? c.valueOf() : max.valueOf();
    const _ = h?.isValid() ? h?.valueOf() : min.valueOf();
    const m = d?.isValid() ? d?.valueOf() : max.valueOf();
    const g = _ && _ >= u ? _ : u;
    const y = m && m <= p ? m : p;
    if (!(g < y)) return false;
    timeManager.setMin(g);
    timeManager.setMax(y);
    const f = timeManager.getTime();
    const T = timeManager.isWithinLimits(f);
    if (-1 === T || 1 === T) {
      const {
        min: t
      } = timeManager.getLimits();
      if (t.isValid()) {
        routerManager._previousRoute = {
          ...routerManager._currentRoute
        };
        this.app.getComponent("timecontrolsCollapsible")?.setExpanded(true);
        this._redirect = true;
        routerManager.navigate({
          time: timeManager.getTimeUrl(t)
        });
        return false;
      }
    }
    return true;
  }
  async _updateCamera() {
    const {
      id: id
    } = this.distanceManager.sourceDistanceEntity || {};
    const {
      hasTarget: hasTarget,
      measuredDistance: measuredDistance
    } = this.distanceManager;
    hasTarget ? await this.distanceManager.camToBetweenPos({
      force: true
    }) : await this.app.cameraScripts.goToCelestialObject(id, {
      distance: 3
    });
    hasTarget && measuredDistance >= 0 && this.distanceManager.setBetweenPosHidden(false);
  }
  _updateCollapsibleMenu(t = Eyes.AppUtils.isMobile()) {
    this._collapsibleItemOptions = this._collapsibleItemOptions.filter(t => "Time Controls" === t.itemTitle && (t.expand = false, true));
    t && this._collapsibleItemOptions.push({
      itemTitle: "Distance",
      componentNames: ["distancePanel"],
      positionIndex: 0,
      dimensions: {
        width: {
          min: 320,
          max: 400
        },
        height: {
          min: 30,
          max: 150
        }
      }
    });
    super._updateCollapsibleMenu();
  }
  async onIsMobileChange(t) {
    this._updateCollapsibleMenu(t);
    this._collapsibleItems = await Promise.all(this._collapsibleItems).then(t => t.filter(t => t));
    const e = this._collapsibleItems.find(t => "Distance" === t.getState("itemTitle"));
    const i = t && e?._children.componentContainer || this.app._dynamicElement;
    this.distancePanel.setParent(i);
  }
  setBreadcrumbStaticTextVisible(t = !Eyes.AppUtils.isMobile()) {
    const breadcrumbComponent = this._app.getComponent("breadcrumb");
    const i = breadcrumbComponent?._element.querySelector("h1");
    i && (i.style.display = t ? "" : "none");
  }
  resize() {
    super.resize();
    this.setBreadcrumbStaticTextVisible();
  }
  get shouldOffsetRight() {
    return false;
  }
  get shouldOffsetUp() {
    return false;
  }
}
export { DistanceView };
