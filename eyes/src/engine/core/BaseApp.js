/** @eyes-analysis
 * 文件职责：创建 Pioneer 引擎并组织应用管理器、UI 组件、场景与初始化流程。
 * 依据：import ../../vendor/modules/FollowName.cjs；import ../pioneer/index.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
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
/** @eyes-analysis
 * 类职责：创建 Pioneer 引擎并组织应用管理器、UI 组件、场景与初始化流程。
 * 继承：无显式父类；导出：BaseApp。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class BaseApp {
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  static setAppClass() {
    BaseApp._appClass = this;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_cameraScripts`、`_componentInfo`、`_componentTypes`、`_components`、`_dragging`、`_dynamicElement`、`_element`、`_entityInfo`；调用 `document.documentElement.style.setProperty`、`new EyesPublicApi.CameraScripts`、`this.bindFunctions`、`this.resize`、`window.addEventListener`。
   * 状态写入：_cameraScripts、_componentInfo、_componentTypes、_components、_dragging、_dynamicElement、_element、_entityInfo等；完整记录见索引。
   * 调用线索：document.documentElement.style.setProperty、new EyesPublicApi.CameraScripts、this.bindFunctions、this.resize、window.addEventListener。
   */
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
  /** @eyes-analysis
   * 【结构证据】写入 `_dynamicElement`、`_element`、`_pioneer`、`_staticElement`；调用 `Pioneer.TimeUtils.now`、`document.getElementById`、`new Pioneer.Engine`、`this._pioneer.getConfig`、`this._pioneer.getConfig().setValue`、`this._pioneer.getDownloader`。
   * 状态写入：_dynamicElement、_element、_pioneer、_staticElement。
   * 调用线索：Pioneer.TimeUtils.now、document.getElementById、new Pioneer.Engine、this._pioneer.getConfig、this._pioneer.getConfig().setValue等。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `this._pioneer`。
   */
  get pioneer() {
    return this._pioneer;
  }
  /** @eyes-analysis
   * 【结构证据】读取访问器，返回 `this._scene`；本访问器没有 AST 可见的 this 字段直接赋值。
   */
  get scene() {
    return this._scene;
  }
  /** @eyes-analysis
   * 【结构证据】写入访问器，接收参数 (scene)；实际写入 `_scene`。
   * 状态写入：_scene。
   */
  set scene(scene) {
    this._scene = scene;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._cameraScripts`。
   */
  get cameraScripts() {
    return this._cameraScripts;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._dynamicElement`。
   */
  get dynamicElement() {
    return this._dynamicElement;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._staticElement`。
   */
  get staticElement() {
    return this._staticElement;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._sceneInfo`。
   */
  get sceneInfo() {
    return this._sceneInfo;
  }
  /** @eyes-analysis
   * 【结构证据】读取访问器，返回 `this._element`；本访问器没有 AST 可见的 this 字段直接赋值。
   */
  get element() {
    return this._element;
  }
  /** @eyes-analysis
   * 【结构证据】写入访问器，接收参数 (element)；实际写入 `_element`。
   * 状态写入：_element。
   */
  set element(element) {
    this._element = element;
  }
  /** @eyes-analysis
   * 【结构证据】读取访问器，返回 `this._isSearching`；本访问器没有 AST 可见的 this 字段直接赋值。
   */
  get isSearching() {
    return this._isSearching;
  }
  /** @eyes-analysis
   * 【结构证据】写入访问器，接收参数 (isSearching)；实际写入 `_isSearching`。
   * 状态写入：_isSearching。
   */
  set isSearching(isSearching) {
    this._isSearching = isSearching;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_managers[t]`；返回 `this._managers[t]`；调用 `new e`。
   * 状态写入：_managers[t]。
   * 调用线索：new e。
   */
  addManager(t, e, ...i) {
    void 0 === this._managers[t] && (this._managers[t] = new e(this, ...i));
    return this._managers[t];
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._managers[t].destroy`。
   * 调用线索：this._managers[t].destroy。
   */
  removeManager(t) {
    void 0 !== this._managers[t] && (this._managers[t].destroy(), delete this._managers[t]);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void 0!==this._managers[t]?this._managers[t]:null`。
   */
  getManager(t) {
    return void 0 !== this._managers[t] ? this._managers[t] : null;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_scene`；调用 `EyesPublicApi.Types.get`、`Object.keys`、`_.initLabelWeights`、`_.registerCallback`、`d.addCallback`、`d.addLayer`。
   * 状态写入：_scene。
   * 调用线索：EyesPublicApi.Types.get、Object.keys、_.initLabelWeights、_.registerCallback、d.addCallback等。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `Array.from`、`getFollowName`、`getFollowName()`、`this.getManager`、`this.getManager("scene").getEntitiesNames`、`this.getManager("selection").setScene`。
   * 调用线索：Array.from、getFollowName、getFollowName()、this.getManager、this.getManager("scene").getEntitiesNames等。
   */
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
  /** @eyes-analysis
   * 【结构证据】写入 `_components[t]`；返回 `s`；调用 `new Error`、`new e`、`s.init`；含显式错误分支。
   * 状态写入：_components[t]。
   * 调用线索：new Error、new e、s.init。
   */
  async addComponent(t, e, ...i) {
    if (void 0 !== this._components[t]) throw new Error(`Component ${t} was already added.`);
    const s = new e(this, ...i);
    this._components[t] = s;
    await s.init();
    return s;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `Promise.reject(new Error(`addComponentWithPlaceholder: There is no placeholder element for ${t.type}`))` 或 `s`；调用 `Array.from`、`EyesPublicApi.AppUtils.convertObjType`、`Object.assign`、`Promise.reject`、`e.getElementsByTagName`、`new Error`。
   * 调用线索：Array.from、EyesPublicApi.AppUtils.convertObjType、Object.assign、Promise.reject、e.getElementsByTagName等。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `void 0!==this._components[t]&&(this._components[t].destroy(),delete this._components[t],true)`；调用 `this._components[t].destroy`。
   * 调用线索：this._components[t].destroy。
   */
  removeComponent(t) {
    return void 0 !== this._components[t] && (this._components[t].destroy(), delete this._components[t], true);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.removeComponent`。
   * 调用线索：this.removeComponent。
   */
  removeComponents() {
    for (let t = 0; t < this._componentInfo.length; t++) this.removeComponent(this._componentInfo[t].name);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void 0!==this._components[t]?this._components[t]:null`。
   */
  getComponent(t) {
    return void 0 !== this._components[t] ? this._components[t] : null;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._components`。
   */
  getComponents() {
    return this._components;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `EyesPublicApi.Types.get`、`l.create`、`postCreationFunction`。
   * 调用线索：EyesPublicApi.Types.get、l.create、postCreationFunction。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `document.addEventListener`、`searchDesktopComponent._children.input.focus`、`searchDesktopComponent.open`、`this.getComponent`。
   * 调用线索：document.addEventListener、searchDesktopComponent._children.input.focus、searchDesktopComponent.open、this.getComponent。
   */
  addShortcuts() {
    const searchDesktopComponent = this.getComponent("searchDesktop");
    searchDesktopComponent && document.addEventListener("keyup", e => {
      "KeyF" === e.code && (this.isSearching || (searchDesktopComponent.open(), searchDesktopComponent._children.input.focus()));
    });
  }
  /** @eyes-analysis
   * 【结构证据】写入 `dynamicElement.innerHTML`；调用 `EyesPublicApi.Types.get`、`a.create`、`postCreationFunction`。
   * 状态写入：dynamicElement.innerHTML。
   * 调用线索：EyesPublicApi.Types.get、a.create、postCreationFunction。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `this._views`。
   */
  getViews() {
    return this._views;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.addView`。
   * 调用线索：this.addView。
   */
  addViews() {
    for (let t = 0; t < this._viewInfo.length; t++) {
      const e = this._viewInfo[t];
      this.addView(e.name, this._viewClasses[e.class], this._element, e.components);
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.removeView`。
   * 调用线索：this.removeView。
   */
  removeViews() {
    for (const t in this._views) this.removeView(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void 0!==this._views[t]?this._views[t]:null`。
   */
  getView(t) {
    return void 0 !== this._views[t] ? this._views[t] : null;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_views[t]`；返回 `this._views[t]`；调用 `new e`。
   * 状态写入：_views[t]。
   * 调用线索：new e。
   */
  addView(t, e, ...i) {
    void 0 === this._views[t] && (this._views[t] = new e(this, ...i));
    return this._views[t];
  }
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  removeView(t) {
    void 0 !== this._views[t] && delete this._views[t];
  }
  /** @eyes-analysis
   * 【结构证据】写入 `getManager("camera").defaultMaxDistance`、`scene`；返回 `void console.error("App._sceneInfo needs to be set.")`；调用 `console.error`、`sceneManager.addEntitiesFromSceneInfo`、`sceneManager.addEntityLoadedCallback`、`sceneManager.addEntityWillBeUnloadedCallback`、`sceneManager.update`、`this.getManager`。
   * 状态写入：getManager("camera").defaultMaxDistance、scene。
   * 调用线索：console.error、sceneManager.addEntitiesFromSceneInfo、sceneManager.addEntityLoadedCallback、sceneManager.addEntityWillBeUnloadedCallback、sceneManager.update等。
   */
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
  /** @eyes-analysis
   * 【结构证据】写入 `cameraScripts.cameraEntity`、`cameraScripts.scene`；调用 `cameraManager.createViewportAndCamera`、`this.getManager`。
   * 状态写入：cameraScripts.cameraEntity、cameraScripts.scene。
   * 调用线索：cameraManager.createViewportAndCamera、this.getManager。
   */
  setUpViewportAndCamera() {
    const t = this.getManager("scene").main;
    const cameraManager = this.getManager("camera");
    cameraManager.createViewportAndCamera(t);
    this.cameraScripts.scene = t;
    this.cameraScripts.cameraEntity = cameraManager.cameraEntity;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.addUpdate`、`this.getManager`。
   * 调用线索：this.addUpdate、this.getManager。
   */
  setUpUpdates() {
    this.addUpdate(this.getManager("scene").update);
    this.addUpdate(this.getManager("label").update);
    this.addUpdate(this.getManager("camera").update);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._updates.push`。
   * 调用线索：this._updates.push。
   */
  addUpdate(t) {
    "function" == typeof t && this._updates.push(t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._updates.indexOf`、`this._updates.splice`。
   * 调用线索：this._updates.indexOf、this._updates.splice。
   */
  removeUpdate(t) {
    const e = this._updates.indexOf(t);
    e < 0 || this._updates.splice(e, 1);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `0,this._updates[t]`。
   * 调用线索：0,this._updates[t]。
   */
  update() {
    for (let t = 0; t < this._updates.length; t++) {
      (0, this._updates[t])();
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `e[s].bind`。
   * 调用线索：e[s].bind。
   */
  bindFunctions(t = []) {
    const e = this;
    for (let i = 0; i < t.length; i++) {
      const s = t[i];
      e[s] = e[s].bind(this);
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `document.getElementById`、`setTimeout`、`t.remove`。
   * 调用线索：document.getElementById、setTimeout、t.remove。
   */
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
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  setUpRoutes() {}
  /** @eyes-analysis
   * 【结构证据】返回 `this._dragging`。
   */
  isDragging() {
    return this._dragging;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._touchMax`。
   */
  isTouchMax() {
    return this._touchMax;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `canHover`、`isTouch`；调用 `EyesPublicApi.AppUtils.canHover`、`EyesPublicApi.AppUtils.isTouch`、`document.body.classList.toggle`、`document.documentElement.style.setProperty`、`setTimeout`。
   * 状态写入：canHover、isTouch。
   * 调用线索：EyesPublicApi.AppUtils.canHover、EyesPublicApi.AppUtils.isTouch、document.body.classList.toggle、document.documentElement.style.setProperty、setTimeout。
   */
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
  /** @eyes-analysis
   * 【结构证据】写入 `_dragging`、`_scrollable`、`_touchCount`、`_touchMax`、`_touchStartPos.x`、`_touchStartPos.y`；调用 `i.classList.contains`。
   * 状态写入：_dragging、_scrollable、_touchCount、_touchMax、_touchStartPos.x、_touchStartPos.y。
   * 调用线索：i.classList.contains。
   */
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
  /** @eyes-analysis
   * 【结构证据】写入 `_dragging`；调用 `Math.abs`、`Math.max`、`t.preventDefault`。
   * 状态写入：_dragging。
   * 调用线索：Math.abs、Math.max、t.preventDefault。
   */
  onTouchMove(t) {
    const e = t.changedTouches[0];
    Math.max(Math.abs(e.pageX - this._touchStartPos.x), Math.abs(e.pageY - this._touchStartPos.y)) > 5 && (this._dragging = true);
    this._scrollable || t.preventDefault();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_dragging`、`_scrollable`、`_touchCount`、`_touchMax`。
   * 状态写入：_dragging、_scrollable、_touchCount、_touchMax。
   */
  onTouchEnd(t) {
    this._touchCount--;
    0 === t.touches.length && (this._touchMax = false);
    this._dragging = false;
    this._scrollable = false;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this.pioneer.getVersion()`；调用 `this.pioneer.getVersion`。
   * 调用线索：this.pioneer.getVersion。
   */
  getPioneerVersion() {
    return this.pioneer.getVersion();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `EyesPublicApi.EyesVersion`。
   */
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
