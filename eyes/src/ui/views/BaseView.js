// Recovered from app.js:1324617-1332515.
import FollowName from "../../vendor/modules/FollowName.cjs";
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import * as Pioneer from "../../engine/pioneer/index.js";
var getFollowName = () => FollowName;
class BaseView extends EyesPublicApi.BaseComponent {
  constructor(app, element, componentNames = []) {
    super(app, element);
    this._components = [...componentNames];
    this._validQueries = [];
    this._rules = {};
    this._target = null;
    this._enabled = false;
    this.bindFunctions(["resize", "updateVisibility", "toggleViewUI"]);
  }
  get app() {
    return super.app;
  }
  _showControls() {}
  _hideControls() {}
  _shouldHideControls() {
    return false;
  }
  updateVisibility() {
    this._app.getManager("layer").getLayer("ui").visible && (this._shouldHideControls() ? this._hideControls() : this._showControls());
  }
  resize() {
    this.updateVisibility();
  }
  toggleViewUI() {}
  _shouldResetStatus() {
    return this._app.getManager("layer").getLayer("ui").visible;
  }
  _resetStatus(preservedComponentNames = []) {
    if (this._shouldResetStatus()) {
      const componentNames = Object.keys(this._app.getComponents());
      for (let componentIndex = componentNames.length - 1; componentIndex >= 0; componentIndex--) {
        const componentName = componentNames[componentIndex];
        preservedComponentNames.includes(componentName) || this._app.getComponent(componentName).setEnabled(this._components.includes(componentName));
      }
    }
  }
  registerCallbacks() {
    this._app.getManager("layer").addCallback("ui", this.toggleViewUI);
  }
  removeCallbacks() {
    this._app.getManager("layer").removeCallback("ui", this.toggleViewUI);
  }
  // 视图拥有窗口 resize 与图层 UI 订阅，离开时必须成对释放；组件的启用集合由当前视图配置决定。
  async onEnter(routeParams, preservedComponentNames = []) {
    if (routeParams.cancelToken.isCanceled) return;
    this._resetStatus(preservedComponentNames);
    window.addEventListener("resize", this.resize);
    this.registerCallbacks();
    const viewClassName = this._app.getManager("router").currentView + "-view";
    document.body.classList.add(viewClassName);
    this._app.getManager("router").configs.locked && (document.body.classList.add("locked"), this._app.getManager("label").setClickable(false), this._app.getManager("selection").setClickable(false));
  }
  // 路由更新分阶段串行执行；资源和界面准备后的取消检查阻止过期路由继续进入相机阶段。相机阶段进入后，无论成功还是抛错都执行 after 清理。
  async onRouteChange(routeParams) {
    if (await this.before(routeParams), routeParams.cancelToken.isCanceled) return;
    if (this._reset(routeParams), await this._updateResources(routeParams), routeParams.cancelToken.isCanceled) return;
    if (routeParams.setTimeLimits = true, await this.processQuery(routeParams), await this._updateComponentsVisibility(routeParams), routeParams.cancelToken.isCanceled) return;
    await this._checkReady(routeParams);
    try {
      await this._updateCamera(routeParams);
      this._updateLoading(routeParams);
    } finally {
      await this.after(routeParams);
    }
    const {
      spout: spout
    } = this.app.getManager("router").configs;
    if (true === spout) {
      const {
        spoutGlobe: spoutGlobe,
        spoutRenderWidth: spoutRenderWidth,
        spoutGlobeDistance: spoutGlobeDistance,
        spoutTarget: spoutTarget,
        spoutFontSize: spoutFontSize,
        spoutLonAngleOffset: spoutLonAngleOffset,
        spoutAlignToNorthPole: spoutAlignToNorthPole
      } = this.app.getManager("router").configs;
      const spoutCameraTarget = spoutTarget || (await this.app.getManager("spout").getSpoutCameraTargetEntity(routeParams));
      this.app.getManager("spout").enableSpout(spoutGlobe, spoutRenderWidth, spoutGlobeDistance, spoutCameraTarget, spoutFontSize, spoutLonAngleOffset, spoutAlignToNorthPole);
    }
  }
  async onQueryChange(routeParams) {
    routeParams.cancelToken.isCanceled || (await this.processQuery(routeParams));
  }
  validateQuery(routeParams) {
    const validatedParams = {
      ...routeParams
    };
    const queryKeys = Object.keys(validatedParams);
    const defaultParams = {};
    const invalidParams = {};
    const routerManager = this._app.getManager("router");
    for (let keyIndex = queryKeys.length - 1; keyIndex >= 0; keyIndex--) {
      const queryKey = queryKeys[keyIndex];
      if (!(queryKey in this._rules)) {
        delete validatedParams[queryKey];
        continue;
      }
      const rule = this._rules[queryKey];
      if (!("function" == typeof rule.value ? rule.value(validatedParams[queryKey]) : rule.value === validatedParams[queryKey])) {
        if (invalidParams[queryKey] = validatedParams[queryKey], "function" == typeof this._rules.redirect) {
          this._rules.redirect(validatedParams[queryKey]);
          return false;
        }
        if ("route" in rule) {
          routerManager.navigate(rule.route);
          return false;
        }
        "default" in rule && (defaultParams[queryKey] = rule.default);
      }
    }
    return EyesPublicApi.AppUtils.isEmptyObject(defaultParams) ? !!EyesPublicApi.AppUtils.isEmptyObject(invalidParams) || (this._handleError(`validateQuery: Invalid input - ${JSON.stringify(invalidParams)}`), false) : (routerManager.navigate({
      ...validatedParams,
      ...defaultParams
    }), false);
  }
  async processQuery(routeParams) {
    this._updateTimeRate(routeParams);
    await this._updateTime(routeParams);
    const routerManager = this._app.getManager("router");
    const previousQuery = routerManager.parseQuery(routerManager.previousRoute?.query);
    for (const queryKey of Object.keys(routerManager._queryCallbacks)) {
      const currentValue = routeParams[queryKey];
      const previousValue = previousQuery[queryKey];
      (currentValue || previousValue) && routerManager._queryCallbacks[queryKey].forEach(queryCallback => queryCallback(currentValue, previousValue));
    }
    const layerManager = this._app.getManager("layer");
    const layerPanelComponent = this._app.getComponent("layerPanel");
    const queryLayerNames = {
      layerUI: "ui",
      layerTrails: "trails",
      layerOrbits: "orbits",
      layerLabels: "labels",
      layerIcons: "icons",
      layerPlanets: "planets",
      layerAsteroids: "asteroids",
      layerComets: "comets",
      layerDwarfPlanets: "dwarfPlanets",
      layerConstellations: "constellations",
      layerSpacecraft: "spacecraft"
    };
    for (const queryKey in queryLayerNames) if (queryKey in routeParams) {
      const layerName = queryLayerNames[queryKey];
      "disable" === routeParams[queryKey] ? layerPanelComponent?.setCategoryEnabled(layerName, false) : layerPanelComponent?.isCategoryEnabled(layerName) && ("show" === routeParams[queryKey] ? layerManager.getLayer(layerName).visible || layerPanelComponent.toggleLayer(layerName) : "hide" === routeParams[queryKey] && layerManager.getLayer(layerName).visible && layerPanelComponent.toggleLayer(layerName));
    }
    this.app.getManager("title")?.updateTitle(routerManager.currentRoute);
  }
  _handleError(message = "") {
    const error = new Error(message);
    console.error(error);
    if (null !== this._app.getManager("router")) {
      let fallbackUrl = this._app.getManager("router").previousRoute.url;
      fallbackUrl || (fallbackUrl = this._app.getManager("router").homeRoute);
      this._app.getManager("router").navigate(fallbackUrl);
    }
  }
  onLeave(routeParams) {
    window.removeEventListener("resize", this.resize);
    this.removeCallbacks();
    const viewClassName = this._app.getManager("router").previousView + "-view";
    document.body.classList.remove(viewClassName);
    this._app.getManager("selection").unselect();
    this._app.getManager("scene").clearForceLoad();
    this._validQueries.length && this._app.getManager("router").navigate({
      __remove: this._validQueries
    });
  }
  _reset(routeParams) {
    this._app.getManager("scene").clearForceLoad();
  }
  async _updateResources(routeParams) {}
  _updateTimeRate(routeParams) {
    const timeManager = this._app.getManager("time");
    "rate" in routeParams ? timeManager.setTimeRate(parseInt(routeParams.rate)) : timeManager.resetTimeRate();
  }
  async _updateTime(routeParams) {
    const timeManager = this._app.getManager("time");
    const isStoryRoute = this._app.getManager("router").currentRoute.url.includes("story");
    let slideCount = 0;
    if (isStoryRoute && this._storyId) {
      slideCount = this._app.getManager("content").getStory(this._storyId).slides.length;
    }
    if ((!this._target && slideCount > 1 || isStoryRoute && !this._target && !this._storyId) && (timeManager.resetMin(), timeManager.resetMax()), this._target) await this._updateTimeForTarget(routeParams);else if (routeParams.time) {
      this._app.getManager("time").parseTime(routeParams.time).isValid() ? this._app.getManager("time").setTime(routeParams.time) : this._app.getManager("router").navigate({
        __remove: ["time"]
      });
    } else this._app.getManager("time").setToNow();
  }
  // 时间范围取默认范围、轨道数据覆盖和描述日期的交集。请求时间超界时按原规则夹到边界；不能将这些分支简化成统一的 setToNow。
  async _updateTimeForTarget(routeParams, waitForEntity = true) {
    const timeManager = this._app.getManager("time");
    let minimumTime = timeManager.timeLimits.min.clone();
    let maximumTime = timeManager.timeLimits.max.clone();
    if (routeParams.setTimeLimits) {
      const defaultLimits = timeManager.getDefaultLimits();
      minimumTime = defaultLimits.min.clone();
      maximumTime = defaultLimits.max.clone();
      waitForEntity && (await this._app.getManager("scene").get("main").getEntity(this._target).getLoadedPromise());
      const entityCoverage = this._app.getManager("scene").getCoverage(this._target);
      if (null !== entityCoverage.min && (minimumTime = getFollowName().max(minimumTime, entityCoverage.min)), null !== entityCoverage.max && (maximumTime = getFollowName().min(maximumTime, entityCoverage.max)), this._entityDesc?.dates?.start) {
        const descriptionStart = timeManager.parseTime(this._entityDesc.dates.start);
        minimumTime = getFollowName().max(descriptionStart, minimumTime);
      }
      if (this._entityDesc?.dates?.end) {
        const descriptionEnd = timeManager.parseTime(this._entityDesc.dates.end);
        maximumTime = getFollowName().min(descriptionEnd, maximumTime);
      }
      if (minimumTime.isAfter(maximumTime)) {
        console.error("Start date provided is after end date.");
        const routerManager = this._app.getManager("router");
        this._app.getComponent("clock")?.setLimitMessage(1, "time limit error");
        return void setTimeout(() => routerManager.navigate("/"), 1e3);
      }
      timeManager.setMax(maximumTime);
      timeManager.setMin(minimumTime);
    }
    if (!routeParams.time && this._eventInfo?.start) {
      const eventStart = timeManager.parseTime(this._eventInfo.start);
      timeManager.setTime(getFollowName().max(eventStart, minimumTime));
    } else if (routeParams.time) {
      const requestedTime = timeManager.parseTime(routeParams.time);
      requestedTime.isAfter(maximumTime) ? (timeManager.setTime(maximumTime), timeManager.setTimeRate(0), this._app.getComponent("clock")?.setLimitMessage(1)) : requestedTime.isBefore(minimumTime) ? (timeManager.setTime(minimumTime), this._app.getComponent("clock")?.setLimitMessage(-1)) : timeManager.setTime(requestedTime);
    } else {
      const currentTime = this._app.getManager("time").getNow();
      currentTime.isAfter(maximumTime) || currentTime.isBefore(minimumTime) ? timeManager.setTime(minimumTime) : timeManager.setToNow();
    }
  }
  async _updateComponentsVisibility(routeParams) {
    await this._updateComponents(routeParams);
    routeParams.cancelToken.isCanceled || this.updateVisibility();
  }
  async _updateComponents(routeParams) {}
  async _updateCamera(routeParams) {}
  _updateLoading(routeParams) {
    if (null !== this._target) {
      const loadingPromises = [];
      const visualComponentTypes = [Pioneer.ModelComponent, SolarSystemSceneExports.WMTSComponent, Pioneer.SpheroidLODComponent];
      const sceneManager = this._app.getManager("scene");
      const contentManager = this._app.getManager("content");
      const category = contentManager.getEntityInfo(this._target)?.category;
      category && "Instrument" === category && sceneManager.addLoading(sceneManager._scene.getEntity(this._target).getParent().getName(), "view");
      sceneManager.addLoading(this._target, "view");
      for (let componentIndex = 0; componentIndex < visualComponentTypes.length; componentIndex++) {
        const visualComponent = sceneManager.get("main").getEntity(this._target).getComponent(visualComponentTypes[componentIndex]);
        null !== visualComponent && (sceneManager.forceLoad(visualComponent), loadingPromises.push(sceneManager.componentIsReady(visualComponent)));
      }
      Promise.all(loadingPromises).then(() => {
        category && "Instrument" === category && sceneManager.removeLoading(sceneManager._scene.getEntity(this._target).getParent().getName(), "view");
        sceneManager.removeLoading(this._target, "view");
      });
    }
  }
  async _checkReady(routeParams) {
    if (null === this._target) return;
    const ancestorNames = [];
    let target = this._target;
    for (; "sun" !== target;) {
      ancestorNames.push(target);
      const parentEntity = this._app.getManager("scene").get("main").getEntity(target)?.getParent();
      if (!parentEntity) break;
      target = parentEntity.getName();
    }
    await this._app.pioneer.getScene("main").waitTillEntitiesInPlace(ancestorNames);
    await this._app.pioneer.waitUntilNextFrame();
  }
  async before(routeParams) {}
  after(routeParams) {
    this._app.getManager("layer").resetTarget();
    this._app.getManager("scene").clearTempEntities();
  }
}
export { BaseView };
