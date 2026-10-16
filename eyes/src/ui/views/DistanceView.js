// Recovered from app.js:1666469-1673135.
import * as Eyes from "../../framework/eyes/index.js";
import * as DistanceManager from "../../engine/managers/DistanceManager.js";
import * as ExtendedBaseView from "./ExtendedBaseView.js";
class DistanceView extends ExtendedBaseView.default {
  constructor(...constructorArgs) {
    super(...constructorArgs);
    this._rules = {
      ...this._rules,
      spaceObject: {
        value: entityId => null !== this._app.getManager("content").getEntityInfo(entityId)
      },
      to: {
        value: targetQuery => {
          const {
            spaceObject: spaceObject
          } = this._app.getManager("router").currentRoute.params;
          const contentManager = this._app.getManager("content");
          const sceneManager = this._app.getManager("scene");
          const targetEntityIds = "string" == typeof targetQuery ? targetQuery?.split(",") : [];
          const allTargetsKnown = targetEntityIds.every(targetEntityId => null !== contentManager.getEntityInfo(targetEntityId));
          const includesSource = targetEntityIds.some(targetEntityId => targetEntityId === spaceObject);
          const allTargetsAvailable = targetEntityIds.every(targetEntityId => Boolean(sceneManager._entityStatuses.get(targetEntityId)));
          return allTargetsKnown && allTargetsAvailable && !includesSource;
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
  async onEnter(routeParams) {
    this.distanceManager ??= this.app.addManager("distance", DistanceManager.DistanceManager);
    this.distancePanel ??= this.app.getComponent("distancePanel");
    this.distancePanel.show();
    this.distanceManager.init();
    this.app.getComponent("collapsibleMenu")?.setAllowMultiple(false);
    this.distancePanel.initSearchUI();
    this.distancePanel.isMobileChangedCallback = this.onIsMobileChange;
    this.setBreadcrumbStaticTextVisible();
    this.updateVisibility();
    await super.onEnter(routeParams);
  }
  async onLeave(routeParams) {
    this.app.getComponent("collapsibleMenu")?.setAllowMultiple(true);
    this.distancePanel.isMobileChangedCallback = null;
    this.distanceManager.deinit();
    this.setBreadcrumbStaticTextVisible(true);
    await super.onLeave(routeParams);
  }
  registerCallbacks() {
    super.registerCallbacks();
    this._app.getManager("time").registerCallback("update", this.distanceManager.update);
  }
  removeCallbacks() {
    super.removeCallbacks();
    this._app.getManager("time").removeCallback("update", this.distanceManager.update);
  }
  // 源与目标未变时取消本轮完整刷新，保留距离管理器既有实体。需要刷新时展开场景依赖并去重，保证测距之前依赖已就位。
  async processQuery(routeParams) {
    await super.processQuery(routeParams);
    const {
      spaceObject: spaceObject,
      to: to,
      time: time,
      rate: rate
    } = routeParams;
    const routerManager = this.app.getManager("router");
    const sceneManager = this.app.getManager("scene");
    const {
      query: query,
      params: params
    } = routerManager.previousRoute;
    const {
      to: previousTargets,
      time: previousTime,
      rate: previousRate
    } = routerManager.parseQuery(query);
    if (this._spaceObjectChanged = params?.spaceObject !== spaceObject, this._targetChanged = previousTargets !== to, this._timeChanged = previousTime !== time, this._rateChanged = previousRate !== rate, query && !this._spaceObjectChanged && !this._targetChanged && !this._redirect) return void routeParams.cancelToken.cancel();
    this.distanceManager.setIsWaitingForEntities(true);
    this.distanceManager.setBetweenPosHidden(true);
    this._forceLoadEntities = [spaceObject];
    const targetEntityIds = "string" == typeof to ? to.split(",") : [];
    targetEntityIds && this._forceLoadEntities.push(...targetEntityIds);
    this._forceLoadEntities = this._forceLoadEntities.map(entityId => [entityId, ...sceneManager.getDependencies(entityId)]);
    this._forceLoadEntities = [...new Set(this._forceLoadEntities.flat())];
    sceneManager.setEntitiesForceVisible(this._forceLoadEntities, true);
    this.distanceManager.setTargetDistanceEntities(targetEntityIds);
  }
  async onQueryChange(routeParams) {
    if (this.distanceManager.setIsWaitingForEntities(true), await super.onQueryChange(routeParams), routeParams.cancelToken.isCanceled) {
      this.distanceManager.setIsWaitingForEntities(false);
      return void this.distanceManager.updateMeasurement(false);
    }
    this._updateComponents(routeParams);
    await this._checkReady(routeParams);
    await this._updateCamera(routeParams);
  }
  async _updateTime(routeParams) {
    const timeManager = this.app.getManager("time");
    if (routeParams.time) {
      timeManager.parseTime(routeParams.time).isValid() ? timeManager.setTime(routeParams.time) : this._app.getManager("router").navigate({
        __remove: ["time"]
      });
    }
  }
  _reset(routeParams) {
    super._reset(routeParams);
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
  async _updateComponents(routeParams) {
    super._updateComponents(routeParams);
    const routerManager = this._app.getManager("router");
    const breadcrumbComponent = this._app.getComponent("breadcrumb");
    const {
      targetDisplayNames: targetDisplayNames
    } = this.distanceManager;
    const distanceCrumbText = "Distance to" + (targetDisplayNames.length ? ` ${targetDisplayNames.join(" & ")}` : "");
    breadcrumbComponent._crumbTexts.distance = distanceCrumbText;
    const routeParts = routerManager.currentRoute.url.match(/[^/]+/g);
    breadcrumbComponent.onRouteChange({
      routeParts: routeParts
    });
  }
  async _checkReady(routeParams) {
    const timeManager = this.app.getManager("time");
    const requestedTime = routeParams.time ? timeManager.parseTime(routeParams.time) : timeManager.getTime();
    const ephemerisTime = timeManager.momentToET(requestedTime);
    const measuredImmediately = this.distanceManager.measureDistance(false, ephemerisTime);
    if (this.distanceManager.hasTarget && this.distancePanel.setIsLoading(true), await this._app.scene.waitTillEntitiesInPlace(this._forceLoadEntities, ephemerisTime), this.distancePanel.setIsLoading(false), !routeParams.cancelToken.isCanceled) {
      if (this.distanceManager.hasTarget && !this._checkCoverageOverlap(routeParams)) {
        await this.distanceManager.setTempErrorResult("« Source and target do not co-exist »");
        this._redirect = true;
        return void this._app.getManager("router").navigate({
          __remove: ["to"]
        });
      }
      this.distanceManager.setIsWaitingForEntities(false);
      this._redirect = false;
      !measuredImmediately && this.distanceManager.updateMeasurement(null, true);
    }
  }
  // 比较源对象与首个目标的有效覆盖区间；无交集时由调用方移除目标查询。当前时间超界时重定向到交集起点，并保留原有重定向标记。
  _checkCoverageOverlap(routeParams) {
    const timeManager = this.app.getManager("time");
    const sceneManager = this.app.getManager("scene");
    const routerManager = this.app.getManager("router");
    const {
      id: id
    } = this.distanceManager.sourceDistanceEntity || {};
    const {
      id: targetEntityId
    } = this.distanceManager.targetDistanceEntities[0] || {};
    const {
      min: min,
      max: max
    } = timeManager.getDefaultLimits();
    const {
      min: sourceStart,
      max: sourceEnd
    } = id ? sceneManager.getCoverage(id) : {};
    const {
      min: targetStart,
      max: targetEnd
    } = targetEntityId ? sceneManager.getCoverage(targetEntityId) : {};
    const sourceStartMillis = sourceStart?.isValid() ? sourceStart.valueOf() : min.valueOf();
    const sourceEndMillis = sourceEnd?.isValid() ? sourceEnd.valueOf() : max.valueOf();
    const targetStartMillis = targetStart?.isValid() ? targetStart?.valueOf() : min.valueOf();
    const targetEndMillis = targetEnd?.isValid() ? targetEnd?.valueOf() : max.valueOf();
    const overlapStartMillis = targetStartMillis && targetStartMillis >= sourceStartMillis ? targetStartMillis : sourceStartMillis;
    const overlapEndMillis = targetEndMillis && targetEndMillis <= sourceEndMillis ? targetEndMillis : sourceEndMillis;
    if (!(overlapStartMillis < overlapEndMillis)) return false;
    timeManager.setMin(overlapStartMillis);
    timeManager.setMax(overlapEndMillis);
    const currentTime = timeManager.getTime();
    const limitDirection = timeManager.isWithinLimits(currentTime);
    if (-1 === limitDirection || 1 === limitDirection) {
      const {
        min: overlapStart
      } = timeManager.getLimits();
      if (overlapStart.isValid()) {
        routerManager._previousRoute = {
          ...routerManager._currentRoute
        };
        this.app.getComponent("timecontrolsCollapsible")?.setExpanded(true);
        this._redirect = true;
        routerManager.navigate({
          time: timeManager.getTimeUrl(overlapStart)
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
  _updateCollapsibleMenu(isMobile = Eyes.AppUtils.isMobile()) {
    this._collapsibleItemOptions = this._collapsibleItemOptions.filter(itemOptions => "Time Controls" === itemOptions.itemTitle && (itemOptions.expand = false, true));
    isMobile && this._collapsibleItemOptions.push({
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
  async onIsMobileChange(isMobile) {
    this._updateCollapsibleMenu(isMobile);
    this._collapsibleItems = await Promise.all(this._collapsibleItems).then(resolvedItems => resolvedItems.filter(collapsibleItem => collapsibleItem));
    const distanceItem = this._collapsibleItems.find(collapsibleItem => "Distance" === collapsibleItem.getState("itemTitle"));
    const panelParent = isMobile && distanceItem?._children.componentContainer || this.app._dynamicElement;
    this.distancePanel.setParent(panelParent);
  }
  setBreadcrumbStaticTextVisible(isVisible = !Eyes.AppUtils.isMobile()) {
    const breadcrumbComponent = this._app.getComponent("breadcrumb");
    const headingElement = breadcrumbComponent?._element.querySelector("h1");
    headingElement && (headingElement.style.display = isVisible ? "" : "none");
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
