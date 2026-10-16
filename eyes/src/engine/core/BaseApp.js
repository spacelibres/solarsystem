// Recovered from app.js:1332516-1345889.
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
    const e = window.innerHeight;
    document.documentElement.style.setProperty("--vh", `${e}px`);
    window.addEventListener("resize", this.resize, false);
    this.resize();
  }
  async init() {
    this._element = document.getElementById("ui");
    this._dynamicElement = document.getElementById("dynamic-ui");
    this._staticElement = document.getElementById("static-ui");
    const t = document.getElementById("pioneer");
    t.style.position = "absolute";
    this._pioneer = new Pioneer.Engine(t);
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
      const a = spoutTarget || (await this.getManager("spout").getSpoutCameraTargetEntity(this.getManager("router").currentRoute.params));
      this.getManager("spout").enableSpout(spoutGlobe, spoutRenderWidth, spoutGlobeDistance, a, spoutFontSize, spoutLonAngleOffset, spoutAlignToNorthPole);
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
  addManager(t, e, ...i) {
    void 0 === this._managers[t] && (this._managers[t] = new e(this, ...i));
    return this._managers[t];
  }
  removeManager(t) {
    void 0 !== this._managers[t] && (this._managers[t].destroy(), delete this._managers[t]);
  }
  getManager(t) {
    return void 0 !== this._managers[t] ? this._managers[t] : null;
  }
  async createManagers() {
    const t = EyesPublicApi.Types.get("TimeManager");
    const e = this.addManager("time", t);
    const i = getFollowName().tz("1949-12-31", "Etc/UTC");
    const s = getFollowName().tz("2049-12-31", "Etc/UTC");
    e.setDefaultLimits({
      min: i,
      max: s
    });
    e.setLimits({
      min: i,
      max: s
    });
    const o = this.addManager("content", EyesPublicApi.ContentManager);
    o.setEntityList(EntityCatalog);
    o.setSpheroidLayers(Unidentified752.default);
    o.setSpheroidFeatures(Unidentified753.default);
    o.setFolders({
      description: "https://eyes.nasa.gov/apps/solar-system/descriptions/",
      event: "https://eyes.nasa.gov/apps/solar-system/events/",
      stories: "https://eyes.nasa.gov/apps/solar-system/stories/"
    });
    const r = this.addManager("scene", EyesPublicApi.SceneManager);
    this._scene = r.main;
    const d = this.addManager("layer", EyesPublicApi.LayerManager);
    d.addLayer("ui", {
      name: "User Interface"
    });
    d.addLayer("trails", {
      name: "Trails"
    });
    d.addLayer("orbits", {
      name: "Orbits"
    });
    d.addLayer("labels", {
      name: "Labels"
    });
    d.addLayer("icons", {
      name: "Icons"
    });
    d.addLayer("planets", {
      name: "Planets",
      categories: "Planet"
    });
    d.addLayer("asteroids", {
      name: "Asteroids",
      categories: "Asteroid",
      defaultVisibility: false
    });
    d.addLayer("comets", {
      name: "Comets",
      categories: "Comet",
      defaultVisibility: false
    });
    d.addLayer("dwarfPlanets", {
      name: "Dwarf Planets",
      categories: "Dwarf Planet",
      defaultVisibility: false
    });
    d.addLayer("spacecraft", {
      name: "Spacecraft",
      categories: "Spacecraft",
      sublayers: ["orbiters", "landers", "satelliteGroup"]
    });
    d.addLayer("majorMoons", {
      name: "Major Moons",
      categories: "Major Moon",
      group: "moons"
    });
    d.addLayer("minorMoons", {
      name: "Minor Moons",
      categories: "Minor Moon",
      defaultVisibility: false,
      group: "moons"
    });
    d.addLayer("orbiters", {
      name: "Orbiters",
      categories: "Orbiter",
      group: "spacecraft"
    });
    d.addLayer("satelliteGroup", {
      name: "Satellite Group",
      categories: ["CYGNSS", "TROPICS", "STARLING", "PREFIRE"],
      group: "spacecraft",
      defaultVisibility: true
    });
    d.addLayer("landers", {
      name: "Landers",
      categories: ["Lander", "Rover", "Landing site"],
      group: "spacecraft"
    });
    d.addLayer("starfield", {
      name: "Star Field",
      defaultVisibility: false
    });
    d.addLayer("heliosphere", {
      name: "Heliosphere",
      defaultVisibility: false
    });
    d.addLayer("constellations", {
      name: "Constellations",
      categories: "Constellations",
      defaultVisibility: false
    });
    const u = this.addManager("camera", EyesPublicApi.CameraManager, this._scene);
    this._cameraScripts.setCameraManager(u);
    u.createViewportAndCamera(this._scene);
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
    const p = EyesPublicApi.Types.get("LabelManager");
    const _ = this.addManager("label", p, this._scene, this._pioneer.getViewportAt(0));
    _.initLabelWeights(o.getEntityList());
    const m = EyesPublicApi.Types.get("SelectionManager");
    const g = this.addManager("selection", m, this._scene);
    g.init3Dcallback(u);
    _.registerCallback("labelclicked", g.setSuppress);
    const y = this.addManager("router", EyesPublicApi.RouteManager);
    y.setValidQueries(["time", "rate"]);
    y.init();
    y.addConfigs({
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
    const f = d.getAllContextualLayerOptions();
    if (f.length) {
      const t = f.reduce((t, e) => (t[e] = void 0, t), {});
      Object.keys(t).length && y.addConfigs(t);
    }
    const T = EyesPublicApi.Types.get("TrailManager");
    const b = this.addManager("trail", T, this._scene);
    _.registerCallback("hoverchange", b.onHoverChange);
    this.addManager("spout", EyesPublicApi.SpoutManager);
    d.addCallback("trails", b.toggleTrails);
    d.addCallback("orbits", b.toggleOrbits);
    d.addCallback("labels", _.toggleLabels);
    d.addCallback("icons", _.toggleIcons);
    d.addCallback("starfield", r.toggleStarfield);
    d.addCallback("heliosphere", r.toggleHeliosphere);
    d.addCallback("constellations", r.toggleConstellations);
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
  async addComponent(t, e, ...i) {
    if (void 0 !== this._components[t]) throw new Error(`Component ${t} was already added.`);
    const s = new e(this, ...i);
    this._components[t] = s;
    await s.init();
    return s;
  }
  async addComponentWithPlaceholder(t, e = document, i = null) {
    if (t.args || (t.args = []), t.options || (t.options = {}), !i) {
      const s = Array.from(e.getElementsByTagName(t.type.name));
      if (!(i = s.find(e => e instanceof HTMLElement && e.id === t.name)) && s[0] instanceof HTMLElement && (i = s[0]), !i) return Promise.reject(new Error(`addComponentWithPlaceholder: There is no placeholder element for ${t.type}`));
    }
    Object.assign(t.options, EyesPublicApi.AppUtils.convertObjType({
      ...i.dataset
    }));
    const s = await this.addComponent(t.name, t.type, ...t.args, t.options);
    s.setParent(i.parentElement, i);
    return s;
  }
  removeComponent(t) {
    return void 0 !== this._components[t] && (this._components[t].destroy(), delete this._components[t], true);
  }
  removeComponents() {
    for (let t = 0; t < this._componentInfo.length; t++) this.removeComponent(this._componentInfo[t].name);
  }
  getComponent(t) {
    return void 0 !== this._components[t] ? this._components[t] : null;
  }
  getComponents() {
    return this._components;
  }
  async createComponents() {
    const t = [{
      name: "loadIcon",
      type: "LoadIcon"
    }, {
      name: "overlay",
      type: "Overlay",
      options: {
        isOpenButtonVisible: false
      }
    }];
    for (let e = 0; e < t.length; e++) {
      const {
        name: name,
        type: type,
        hasPlaceholder: hasPlaceholder,
        args: args,
        options: options,
        postCreationFunction: postCreationFunction
      } = t[e];
      const l = EyesPublicApi.Types.get(type);
      const c = await l.create(this, name, l, hasPlaceholder, args, options);
      postCreationFunction && postCreationFunction(this, c);
    }
  }
  addShortcuts() {
    const searchDesktopComponent = this.getComponent("searchDesktop");
    searchDesktopComponent && document.addEventListener("keyup", e => {
      "KeyF" === e.code && (this.isSearching || (searchDesktopComponent.open(), searchDesktopComponent._children.input.focus()));
    });
  }
  async setUpComponents() {
    this.dynamicElement.innerHTML = this.constructor.html;
    for (let t = 0; t < this._componentInfo.length; t++) {
      const {
        name: name,
        type: type,
        hasPlaceholder: hasPlaceholder,
        args: args,
        options: options,
        postCreationFunction: postCreationFunction
      } = this._componentInfo[t];
      const a = EyesPublicApi.Types.get(type);
      const l = await a.create(this, name, a, hasPlaceholder, args, options);
      postCreationFunction && postCreationFunction(this, l);
    }
  }
  getViews() {
    return this._views;
  }
  addViews() {
    for (let t = 0; t < this._viewInfo.length; t++) {
      const e = this._viewInfo[t];
      this.addView(e.name, this._viewClasses[e.class], this._element, e.components);
    }
  }
  removeViews() {
    for (const t in this._views) this.removeView(t);
  }
  getView(t) {
    return void 0 !== this._views[t] ? this._views[t] : null;
  }
  addView(t, e, ...i) {
    void 0 === this._views[t] && (this._views[t] = new e(this, ...i));
    return this._views[t];
  }
  removeView(t) {
    void 0 !== this._views[t] && delete this._views[t];
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
    const t = this.getManager("scene").main;
    const cameraManager = this.getManager("camera");
    cameraManager.createViewportAndCamera(t);
    this.cameraScripts.scene = t;
    this.cameraScripts.cameraEntity = cameraManager.cameraEntity;
  }
  setUpUpdates() {
    this.addUpdate(this.getManager("scene").update);
    this.addUpdate(this.getManager("label").update);
    this.addUpdate(this.getManager("camera").update);
  }
  addUpdate(t) {
    "function" == typeof t && this._updates.push(t);
  }
  removeUpdate(t) {
    const e = this._updates.indexOf(t);
    e < 0 || this._updates.splice(e, 1);
  }
  update() {
    for (let t = 0; t < this._updates.length; t++) {
      (0, this._updates[t])();
    }
  }
  bindFunctions(t = []) {
    const e = this;
    for (let i = 0; i < t.length; i++) {
      const s = t[i];
      e[s] = e[s].bind(this);
    }
  }
  endLoadingScreen() {
    const t = document.getElementById("loading-screen");
    if (t) {
      const e = 400;
      t.style.transition = `opacity ${e / 1e3}s ease-out`;
      t.style.opacity = "0";
      setTimeout(() => {
        t.remove();
      }, e);
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
    const t = window.innerHeight;
    document.documentElement.style.setProperty("--vh", `${t}px`);
    document.body.style.height = t + "px";
    const isTouch = EyesPublicApi.AppUtils.isTouch();
    const canHover = EyesPublicApi.AppUtils.canHover();
    this.isTouch !== isTouch && (document.body.classList.toggle("touch", isTouch), this.isTouch = isTouch);
    this.canHover !== canHover && (document.body.classList.toggle("hover", canHover), this.canHover = canHover);
    setTimeout(() => {
      if (t !== window.innerHeight) {
        const t = window.innerHeight;
        document.documentElement.style.setProperty("--vh", `${t}px`);
        document.body.style.height = t + "px";
      }
    }, 1e3);
  }
  onTouchStart(t) {
    this._touchCount++;
    this._touchMax = this._touchCount > 1;
    const e = t.changedTouches[0];
    this._touchStartPos.x = e.pageX;
    this._touchStartPos.y = e.pageY;
    this._dragging = false;
    this._scrollable = false;
    let i = t.target;
    for (; null !== i.parentElement;) {
      if (i.classList.contains("scrollable")) {
        this._scrollable = true;
        break;
      }
      i = i.parentElement;
    }
  }
  onTouchMove(t) {
    const e = t.changedTouches[0];
    Math.max(Math.abs(e.pageX - this._touchStartPos.x), Math.abs(e.pageY - this._touchStartPos.y)) > 5 && (this._dragging = true);
    this._scrollable || t.preventDefault();
  }
  onTouchEnd(t) {
    this._touchCount--;
    0 === t.touches.length && (this._touchMax = false);
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
  } catch (t) {
    throw document.body.innerHTML = "", t;
  }
});
BaseApp._appClass = BaseApp;
window.Pioneer = Pioneer;
window.PioneerScripts = SolarSystemSceneExports;
export { BaseApp };
