// Recovered from app.js:1332516-1345889.
/* 应用负责按顺序建立管理器、组件与路由，再把每帧更新回调接入引擎。组件占位符 dataset 转型后并入 options，初始化完成才替换占位节点；管理器/视图按名称复用，组件重复注册则抛错。触摸监听区分滚动容器与场景拖动，全局 bootstrap 仍保留原异步调用方式。 */
import FollowName from "../../vendor/modules/FollowName.cjs";
import * as Pioneer from "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
import "./Unidentified738.js";
import EntityCatalog from "../../data/EntityCatalog.json";
import * as Unidentified752 from "./Unidentified752.js";
import * as Unidentified753 from "./Unidentified753.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
var getFollowName = () => FollowName;
class BaseApp {
  static setAppClass() {
    BaseApp._appClass = this;
  }
  constructor(componentTypes) {
    window.app = this;
    this._pioneer = null;
    this._scene = null;
    this._router = null;
    this._element = null;
    this._dynamicElement = null;
    this._timeInfo = {};
    this._sceneInfo = void 0;
    this._cameraScripts = new EyesPublicApi.CameraScripts(this);
    this._componentInfo = [];
    this._componentTypes = componentTypes;
    this._managers = {};
    this._components = {};
    this._views = {};
    this._viewInfo = [];
    this._viewClasses = {};
    this._updates = [];
    this.isTouch = null;
    this.canHover = null;
    this._isSearching = null;
    this._touchStartPos = {
      x: 0,
      y: 0
    };
    this._dragging = false;
    this._entityInfo = EntityCatalog;
    this.bindFunctions(["resize", "onTouchStart", "onTouchMove", "onTouchEnd", "update"]);
    this._touchCount = 0;
    this._scrollable = false;
    this._touchMax = false;
    window.addEventListener("touchstart", this.onTouchStart, false);
    window.addEventListener("touchmove", this.onTouchMove, {
      passive: false
    });
    window.addEventListener("touchend", this.onTouchEnd);
    const viewportHeight = window.innerHeight;
    document.documentElement.style.setProperty("--vh", `${viewportHeight}px`);
    window.addEventListener("resize", this.resize, false);
    this.resize();
  }
  async init() {
    this._element = document.getElementById("ui");
    this._dynamicElement = document.getElementById("dynamic-ui");
    this._staticElement = document.getElementById("static-ui");
    const engineElement = document.getElementById("pioneer");
    engineElement.style.position = "absolute";
    this._pioneer = new Pioneer.Engine(engineElement);
    this._pioneer.setEnvironment("production");
    "string" == typeof window.config.staticAssetsUrl && this._pioneer.getDownloader().setReplacement("STATIC_ASSETS_URL", window.config.staticAssetsUrl);
    "string" == typeof window.config.dynamicAssetsUrl && this._pioneer.getDownloader().setReplacement("DYNAMIC_ASSETS_URL", window.config.dynamicAssetsUrl);
    this._pioneer.getConfig().setValue("fontFamily", "Raleway");
    this._pioneer.getConfig().setValue("fontSize", 16);
    this._pioneer.getConfig().setValue("pbr", true);
    this._pioneer.setTime(Pioneer.TimeUtils.now());
    this._pioneer.setTimeRate(1);
    await this.createManagers();
    await this.createComponents();
    this.setUpRoutes();
    this.setUpUpdates();
    this.getManager("router").start();
    const {
      spout: spout
    } = this.getManager("router").configs;
    if (true === spout) {
      const {
        spoutGlobe: spoutGlobe,
        spoutRenderWidth: spoutRenderWidth,
        spoutGlobeDistance: spoutGlobeDistance,
        spoutTarget: spoutTarget,
        spoutFontSize: spoutFontSize,
        spoutLonAngleOffset: spoutLonAngleOffset,
        spoutAlignToNorthPole: spoutAlignToNorthPole
      } = this.getManager("router").configs;
      const spoutTargetEntity = spoutTarget || (await this.getManager("spout").getSpoutCameraTargetEntity(this.getManager("router").currentRoute.params));
      this.getManager("spout").enableSpout(spoutGlobe, spoutRenderWidth, spoutGlobeDistance, spoutTargetEntity, spoutFontSize, spoutLonAngleOffset, spoutAlignToNorthPole);
    }
  }
  get pioneer() {
    return this._pioneer;
  }
  get scene() {
    return this._scene;
  }
  set scene(scene) {
    this._scene = scene;
  }
  get cameraScripts() {
    return this._cameraScripts;
  }
  get dynamicElement() {
    return this._dynamicElement;
  }
  get staticElement() {
    return this._staticElement;
  }
  get sceneInfo() {
    return this._sceneInfo;
  }
  get element() {
    return this._element;
  }
  set element(element) {
    this._element = element;
  }
  get isSearching() {
    return this._isSearching;
  }
  set isSearching(isSearching) {
    this._isSearching = isSearching;
  }
  addManager(managerName, ManagerClass, ...constructorArgs) {
    void 0 === this._managers[managerName] && (this._managers[managerName] = new ManagerClass(this, ...constructorArgs));
    return this._managers[managerName];
  }
  removeManager(managerName) {
    void 0 !== this._managers[managerName] && (this._managers[managerName].destroy(), delete this._managers[managerName]);
  }
  getManager(managerName) {
    return void 0 !== this._managers[managerName] ? this._managers[managerName] : null;
  }
  async createManagers() {
    const TimeManagerClass = EyesPublicApi.Types.get("TimeManager");
    const timeManager = this.addManager("time", TimeManagerClass);
    const defaultMinimum = getFollowName().tz("1949-12-31", "Etc/UTC");
    const defaultMaximum = getFollowName().tz("2049-12-31", "Etc/UTC");
    timeManager.setDefaultLimits({
      min: defaultMinimum,
      max: defaultMaximum
    });
    timeManager.setLimits({
      min: defaultMinimum,
      max: defaultMaximum
    });
    const contentManager = this.addManager("content", EyesPublicApi.ContentManager);
    contentManager.setEntityList(EntityCatalog);
    contentManager.setSpheroidLayers(Unidentified752.default);
    contentManager.setSpheroidFeatures(Unidentified753.default);
    contentManager.setFolders({
      description: "https://eyes.nasa.gov/apps/solar-system/descriptions/",
      event: "https://eyes.nasa.gov/apps/solar-system/events/",
      stories: "https://eyes.nasa.gov/apps/solar-system/stories/"
    });
    const sceneManager = this.addManager("scene", EyesPublicApi.SceneManager);
    this._scene = sceneManager.main;
    const layerManager = this.addManager("layer", EyesPublicApi.LayerManager);
    layerManager.addLayer("ui", {
      name: "User Interface"
    });
    layerManager.addLayer("trails", {
      name: "Trails"
    });
    layerManager.addLayer("orbits", {
      name: "Orbits"
    });
    layerManager.addLayer("labels", {
      name: "Labels"
    });
    layerManager.addLayer("icons", {
      name: "Icons"
    });
    layerManager.addLayer("planets", {
      name: "Planets",
      categories: "Planet"
    });
    layerManager.addLayer("asteroids", {
      name: "Asteroids",
      categories: "Asteroid",
      defaultVisibility: false
    });
    layerManager.addLayer("comets", {
      name: "Comets",
      categories: "Comet",
      defaultVisibility: false
    });
    layerManager.addLayer("dwarfPlanets", {
      name: "Dwarf Planets",
      categories: "Dwarf Planet",
      defaultVisibility: false
    });
    layerManager.addLayer("spacecraft", {
      name: "Spacecraft",
      categories: "Spacecraft",
      sublayers: ["orbiters", "landers", "satelliteGroup"]
    });
    layerManager.addLayer("majorMoons", {
      name: "Major Moons",
      categories: "Major Moon",
      group: "moons"
    });
    layerManager.addLayer("minorMoons", {
      name: "Minor Moons",
      categories: "Minor Moon",
      defaultVisibility: false,
      group: "moons"
    });
    layerManager.addLayer("orbiters", {
      name: "Orbiters",
      categories: "Orbiter",
      group: "spacecraft"
    });
    layerManager.addLayer("satelliteGroup", {
      name: "Satellite Group",
      categories: ["CYGNSS", "TROPICS", "STARLING", "PREFIRE"],
      group: "spacecraft",
      defaultVisibility: true
    });
    layerManager.addLayer("landers", {
      name: "Landers",
      categories: ["Lander", "Rover", "Landing site"],
      group: "spacecraft"
    });
    layerManager.addLayer("starfield", {
      name: "Star Field",
      defaultVisibility: false
    });
    layerManager.addLayer("heliosphere", {
      name: "Heliosphere",
      defaultVisibility: false
    });
    layerManager.addLayer("constellations", {
      name: "Constellations",
      categories: "Constellations",
      defaultVisibility: false
    });
    const cameraManager = this.addManager("camera", EyesPublicApi.CameraManager, this._scene);
    this._cameraScripts.setCameraManager(cameraManager);
    cameraManager.createViewportAndCamera(this._scene);
    this.addManager("search", EyesPublicApi.SearchManager, {
      keys: [{
        name: "iauName",
        weight: .99
      }, {
        name: "displayName",
        weight: .98
      }, {
        name: "altName",
        weight: .98
      }, {
        name: "keywords",
        weight: .3
      }, {
        name: "category",
        weight: .3
      }]
    });
    this.addManager("comparison", EyesPublicApi.ComparisonManager);
    this.addManager("wmts", EyesPublicApi.WMTSManager);
    const LabelManagerClass = EyesPublicApi.Types.get("LabelManager");
    const labelManager = this.addManager("label", LabelManagerClass, this._scene, this._pioneer.getViewportAt(0));
    labelManager.initLabelWeights(contentManager.getEntityList());
    const SelectionManagerClass = EyesPublicApi.Types.get("SelectionManager");
    const selectionManager = this.addManager("selection", SelectionManagerClass, this._scene);
    selectionManager.init3Dcallback(cameraManager);
    labelManager.registerCallback("labelclicked", selectionManager.setSuppress);
    const routerManager = this.addManager("router", EyesPublicApi.RouteManager);
    routerManager.setValidQueries(["time", "rate"]);
    routerManager.init();
    routerManager.addConfigs({
      embed: void 0,
      kiosk: void 0,
      logo: void 0,
      detailPanel: void 0,
      content: void 0,
      featured: void 0,
      menu: void 0,
      locked: void 0,
      surfaceMapTiling: void 0,
      hd: void 0,
      lighting: void 0,
      hideExternalLinks: void 0,
      hideFullScreenToggle: void 0,
      maxSessionTime: void 0,
      maxInactivityTime: void 0,
      forceRestart: void 0,
      noKeyboard: void 0,
      search: void 0,
      collapseSettingsOptions: void 0,
      shareButton: void 0,
      spout: void 0,
      spoutGlobe: void 0,
      spoutRenderWidth: void 0,
      spoutGlobeDistance: void 0,
      spoutTarget: void 0,
      spoutFontSize: void 0,
      spoutLonAngleOffset: void 0,
      spoutAlignToNorthPole: void 0,
      interactPrompt: void 0,
      timeControls: void 0,
      collapseTimeControls: void 0
    });
    const contextualLayerNames = layerManager.getAllContextualLayerOptions();
    if (contextualLayerNames.length) {
      const contextualConfigs = contextualLayerNames.reduce((configs, layerName) => (configs[layerName] = void 0, configs), {});
      Object.keys(contextualConfigs).length && routerManager.addConfigs(contextualConfigs);
    }
    const TrailManagerClass = EyesPublicApi.Types.get("TrailManager");
    const trailManager = this.addManager("trail", TrailManagerClass, this._scene);
    labelManager.registerCallback("hoverchange", trailManager.onHoverChange);
    this.addManager("spout", EyesPublicApi.SpoutManager);
    layerManager.addCallback("trails", trailManager.toggleTrails);
    layerManager.addCallback("orbits", trailManager.toggleOrbits);
    layerManager.addCallback("labels", labelManager.toggleLabels);
    layerManager.addCallback("icons", labelManager.toggleIcons);
    layerManager.addCallback("starfield", sceneManager.toggleStarfield);
    layerManager.addCallback("heliosphere", sceneManager.toggleHeliosphere);
    layerManager.addCallback("constellations", sceneManager.toggleConstellations);
    this.addViews();
    this.setUpViewportAndCamera();
    await this.setUpScene();
    await this.setUpManagers();
    await this.setUpComponents();
    this.addShortcuts();
    this._pioneer.addCallback(this.update, true);
  }
  async setUpManagers() {
    const scene = this.scene;
    const trailManager = this.getManager("trail");
    const timeManager = this.getManager("time");
    let {
      limits: limits
    } = this._timeInfo;
    limits ? (limits.min = "min" in limits && "-Infinity" !== limits.min ? this.getManager("time").parseTime(limits.min) : getFollowName()(EyesPublicApi.AppUtils.constants.minDate), limits.max = "max" in limits && "Infinity" !== limits.max ? this.getManager("time").parseTime(limits.max) : getFollowName()(EyesPublicApi.AppUtils.constants.maxDate)) : limits = {
      min: getFollowName()(EyesPublicApi.AppUtils.constants.minDate),
      max: getFollowName()(EyesPublicApi.AppUtils.constants.maxDate)
    };
    timeManager.setDefaultLimits(limits);
    timeManager.setLimits(limits);
    this.getManager("selection").setScene(scene);
    trailManager.setScene(scene);
    trailManager.ids = Array.from(this.getManager("scene").getEntitiesNames());
    trailManager.setColor(trailManager.ids);
  }
  async addComponent(componentName, ComponentClass, ...constructorArgs) {
    if (void 0 !== this._components[componentName]) throw new Error(`Component ${componentName} was already added.`);
    const component = new ComponentClass(this, ...constructorArgs);
    this._components[componentName] = component;
    await component.init();
    return component;
  }
  async addComponentWithPlaceholder(componentInfo, searchRoot = document, placeholderElement = null) {
    if (componentInfo.args || (componentInfo.args = []), componentInfo.options || (componentInfo.options = {}), !placeholderElement) {
      const candidateElements = Array.from(searchRoot.getElementsByTagName(componentInfo.type.name));
      if (!(placeholderElement = candidateElements.find(candidateElement => candidateElement instanceof HTMLElement && candidateElement.id === componentInfo.name)) && candidateElements[0] instanceof HTMLElement && (placeholderElement = candidateElements[0]), !placeholderElement) return Promise.reject(new Error(`addComponentWithPlaceholder: There is no placeholder element for ${componentInfo.type}`));
    }
    Object.assign(componentInfo.options, EyesPublicApi.AppUtils.convertObjType({
      ...placeholderElement.dataset
    }));
    const component = await this.addComponent(componentInfo.name, componentInfo.type, ...componentInfo.args, componentInfo.options);
    component.setParent(placeholderElement.parentElement, placeholderElement);
    return component;
  }
  removeComponent(componentName) {
    return void 0 !== this._components[componentName] && (this._components[componentName].destroy(), delete this._components[componentName], true);
  }
  removeComponents() {
    for (let componentIndex = 0; componentIndex < this._componentInfo.length; componentIndex++) this.removeComponent(this._componentInfo[componentIndex].name);
  }
  getComponent(componentName) {
    return void 0 !== this._components[componentName] ? this._components[componentName] : null;
  }
  getComponents() {
    return this._components;
  }
  async createComponents() {
    const initialComponents = [{
      name: "loadIcon",
      type: "LoadIcon"
    }, {
      name: "overlay",
      type: "Overlay",
      options: {
        isOpenButtonVisible: false
      }
    }];
    for (let componentIndex = 0; componentIndex < initialComponents.length; componentIndex++) {
      const {
        name: name,
        type: type,
        hasPlaceholder: hasPlaceholder,
        args: args,
        options: options,
        postCreationFunction: postCreationFunction
      } = initialComponents[componentIndex];
      const ComponentClass = EyesPublicApi.Types.get(type);
      const component = await ComponentClass.create(this, name, ComponentClass, hasPlaceholder, args, options);
      postCreationFunction && postCreationFunction(this, component);
    }
  }
  addShortcuts() {
    const searchDesktopComponent = this.getComponent("searchDesktop");
    searchDesktopComponent && document.addEventListener("keyup", keyEvent => {
      "KeyF" === keyEvent.code && (this.isSearching || (searchDesktopComponent.open(), searchDesktopComponent._children.input.focus()));
    });
  }
  async setUpComponents() {
    this.dynamicElement.innerHTML = this.constructor.html;
    for (let componentIndex = 0; componentIndex < this._componentInfo.length; componentIndex++) {
      const {
        name: name,
        type: type,
        hasPlaceholder: hasPlaceholder,
        args: args,
        options: options,
        postCreationFunction: postCreationFunction
      } = this._componentInfo[componentIndex];
      const ComponentClass = EyesPublicApi.Types.get(type);
      const component = await ComponentClass.create(this, name, ComponentClass, hasPlaceholder, args, options);
      postCreationFunction && postCreationFunction(this, component);
    }
  }
  getViews() {
    return this._views;
  }
  addViews() {
    for (let viewIndex = 0; viewIndex < this._viewInfo.length; viewIndex++) {
      const viewInfo = this._viewInfo[viewIndex];
      this.addView(viewInfo.name, this._viewClasses[viewInfo.class], this._element, viewInfo.components);
    }
  }
  removeViews() {
    for (const viewName in this._views) this.removeView(viewName);
  }
  getView(viewName) {
    return void 0 !== this._views[viewName] ? this._views[viewName] : null;
  }
  addView(viewName, ViewClass, ...constructorArgs) {
    void 0 === this._views[viewName] && (this._views[viewName] = new ViewClass(this, ...constructorArgs));
    return this._views[viewName];
  }
  removeView(viewName) {
    void 0 !== this._views[viewName] && delete this._views[viewName];
  }
  async setUpScene() {
    if (void 0 === this._sceneInfo) return void console.error("App._sceneInfo needs to be set.");
    this.getManager("camera").defaultMaxDistance = this._sceneInfo.zoomMax || 2e18;
    const sceneManager = this.getManager("scene");
    sceneManager.addEntitiesFromSceneInfo(this._sceneInfo);
    const labelManager = this.getManager("label");
    const trailManager = this.getManager("trail");
    const cameraManager = this.getManager("camera");
    sceneManager.addEntityLoadedCallback(labelManager.setUpLabel);
    sceneManager.addEntityLoadedCallback(trailManager.setUpTrail);
    sceneManager.addEntityLoadedCallback(labelManager.setUpIcon);
    sceneManager.addEntityLoadedCallback(cameraManager.addDynamicEnvMap);
    sceneManager.addEntityWillBeUnloadedCallback(labelManager.removeLabel);
    sceneManager.update();
    this.scene = this.getManager("scene").main;
    this.scene.getEntity("sun").getComponent(Pioneer.ModelComponent)?.setEnabled(false);
  }
  setUpViewportAndCamera() {
    const mainScene = this.getManager("scene").main;
    const cameraManager = this.getManager("camera");
    cameraManager.createViewportAndCamera(mainScene);
    this.cameraScripts.scene = mainScene;
    this.cameraScripts.cameraEntity = cameraManager.cameraEntity;
  }
  setUpUpdates() {
    this.addUpdate(this.getManager("scene").update);
    this.addUpdate(this.getManager("label").update);
    this.addUpdate(this.getManager("camera").update);
  }
  addUpdate(updateCallback) {
    "function" == typeof updateCallback && this._updates.push(updateCallback);
  }
  removeUpdate(updateCallback) {
    const callbackIndex = this._updates.indexOf(updateCallback);
    callbackIndex < 0 || this._updates.splice(callbackIndex, 1);
  }
  update() {
    for (let callbackIndex = 0; callbackIndex < this._updates.length; callbackIndex++) {
      (0, this._updates[callbackIndex])();
    }
  }
  bindFunctions(methodNames = []) {
    const app = this;
    for (let methodIndex = 0; methodIndex < methodNames.length; methodIndex++) {
      const methodName = methodNames[methodIndex];
      app[methodName] = app[methodName].bind(this);
    }
  }
  endLoadingScreen() {
    const loadingElement = document.getElementById("loading-screen");
    if (loadingElement) {
      const fadeDuration = 400;
      loadingElement.style.transition = `opacity ${fadeDuration / 1e3}s ease-out`;
      loadingElement.style.opacity = "0";
      setTimeout(() => {
        loadingElement.remove();
      }, fadeDuration);
    }
  }
  setUpRoutes() {}
  isDragging() {
    return this._dragging;
  }
  isTouchMax() {
    return this._touchMax;
  }
  resize() {
    const viewportHeight = window.innerHeight;
    document.documentElement.style.setProperty("--vh", `${viewportHeight}px`);
    document.body.style.height = viewportHeight + "px";
    const isTouch = EyesPublicApi.AppUtils.isTouch();
    const canHover = EyesPublicApi.AppUtils.canHover();
    this.isTouch !== isTouch && (document.body.classList.toggle("touch", isTouch), this.isTouch = isTouch);
    this.canHover !== canHover && (document.body.classList.toggle("hover", canHover), this.canHover = canHover);
    setTimeout(() => {
      if (viewportHeight !== window.innerHeight) {
        const latestHeight = window.innerHeight;
        document.documentElement.style.setProperty("--vh", `${latestHeight}px`);
        document.body.style.height = latestHeight + "px";
      }
    }, 1e3);
  }
  onTouchStart(touchEvent) {
    this._touchCount++;
    this._touchMax = this._touchCount > 1;
    const touchPoint = touchEvent.changedTouches[0];
    this._touchStartPos.x = touchPoint.pageX;
    this._touchStartPos.y = touchPoint.pageY;
    this._dragging = false;
    this._scrollable = false;
    let ancestorElement = touchEvent.target;
    for (; null !== ancestorElement.parentElement;) {
      if (ancestorElement.classList.contains("scrollable")) {
        this._scrollable = true;
        break;
      }
      ancestorElement = ancestorElement.parentElement;
    }
  }
  onTouchMove(touchEvent) {
    const touchPoint = touchEvent.changedTouches[0];
    Math.max(Math.abs(touchPoint.pageX - this._touchStartPos.x), Math.abs(touchPoint.pageY - this._touchStartPos.y)) > 5 && (this._dragging = true);
    this._scrollable || touchEvent.preventDefault();
  }
  onTouchEnd(touchEvent) {
    this._touchCount--;
    0 === touchEvent.touches.length && (this._touchMax = false);
    this._dragging = false;
    this._scrollable = false;
  }
  getPioneerVersion() {
    return this.pioneer.getVersion();
  }
  getEyesVersion() {
    return EyesPublicApi.EyesVersion;
  }
}
window.addEventListener("load", async () => {
  try {
    new BaseApp._appClass().init();
  } catch (initializationError) {
    throw document.body.innerHTML = "", initializationError;
  }
});
BaseApp._appClass = BaseApp;
window.Pioneer = Pioneer;
window.PioneerScripts = SolarSystemSceneExports;
export { BaseApp };
