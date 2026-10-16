// Recovered from app.js:1220244-1241305.
import FollowName from "../../vendor/modules/FollowName.cjs";
import * as Pioneer from "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
var getFollowName = () => FollowName;
class SceneManager extends EyesPublicApi.BaseManager {
  constructor(t) {
    super(t);
    this._scenes = {};
    this._scene = this.add("main");
    this._isHD = false;
    this._hdWMTSMap = {};
    this._loadingItems = [];
    this._loadedComponents = [];
    this._wmtsServerStates = new Map();
    this._wmtsComponentStates = new Map();
    this._hdBreakpointSize = 512;
    this._maxTextureSize = 4096;
    this._eventNames.push("loading", "loaded");
    this._initCallbacks();
    this._isLoading = false;
    this._entityStatuses = new Pioneer.FastMap();
    this._entityExtraOptions = void 0;
    this._entityLoadedCallbacks = [];
    this._entityWillBeUnloadedCallbacks = [];
    this._componentTypesNotVisible = new Set();
    this._hdToggleEntity = null;
    this._mobileTextureSize = 1024;
    this.bindFunctions(["addLoading", "removeLoading", "update", "toggleStarfield", "toggleHeliosphere", "toggleConstellations", "addWMTSComponent", "tileIsReady", "enableWMTSComponent", "forceTextureSizeForEntity", "toggleHDTextureForEntity", "isEntityHD"]);
    this._tempEntities = [];
  }
  getHDToggleEntity() {
    return this._hdToggleEntity;
  }
  add(t) {
    return "main" === t && this._scene ? this._scene : (this._scenes[t] = this.pioneer.addScene(t), this._scenes[t].setAmbientLightColor(new Pioneer.Color(.005, .005, .005)), this._scenes[t]);
  }
  addEntity(t, e) {
    if (this._entityStatuses.has(t)) throw new Error(`Error adding entity: The entity ${t} has already been added.`);
    this._entityStatuses.set(t, {
      forceVisible: false,
      layerVisibility: this.app.getManager("layer").isEntityVisibleWithCurrentLayers(t),
      dynamic: e,
      dependentEntities: [],
      entitiesForcingThisVisible: new Set(),
      visible: true,
      componentTypesNotVisible: new Set()
    });
  }
  removeEntity(t) {
    if (!this._entityStatuses.delete(t)) throw new Error(`Error removing entity: The entity ${t} was not in the scene manager.`);
    const e = this._scene.getEntity(t);
    if (null !== e) {
      for (let t = 0, i = this._entityWillBeUnloadedCallbacks.length; t < i; t++) this._entityWillBeUnloadedCallbacks[t](e);
      this._scene.removeEntity(t);
    }
  }
  getEntityStatus(t) {
    return this._entityStatuses.get(t);
  }
  addEntitiesFromSceneInfo(t) {
    const map = new Map();
    void 0 !== t.staticEntities && (1 === t.staticEntities.length && "all" === t.staticEntities[0] ? SolarSystemSceneExports.Entity.getEntityNamesInGroup("").forEach(t => map.set(t, false)) : t.staticEntities.forEach(t => map.set(t, false)));
    void 0 !== t.staticEntityGroups && t.staticEntityGroups.forEach(t => {
      SolarSystemSceneExports.Entity.getEntityNamesInGroup(t).forEach(t => map.set(t, false));
    });
    void 0 !== t.dynamicEntities && (1 === t.dynamicEntities.length && "all" === t.dynamicEntities[0] ? SolarSystemSceneExports.Entity.getEntityNamesInGroup("").forEach(t => {
      map.has(t) || map.set(t, true);
    }) : t.dynamicEntities.forEach(t => {
      map.has(t) || map.set(t, true);
    }));
    void 0 !== t.dynamicEntityGroups && t.dynamicEntityGroups.forEach(t => {
      SolarSystemSceneExports.Entity.getEntityNamesInGroup(t).forEach(t => {
        map.has(t) || map.set(t, true);
      });
    });
    const contentManager = this.app.getManager("content");
    for (const t of map.keys()) null === contentManager.getEntityInfo(t) && map.delete(t);
    map.forEach((t, e) => this.addEntity(e, t));
    this.setExtraEntityOptions(t.entityOptions);
    this.updateEntityLayerVisibility();
  }
  addEntityLoadedCallback(t) {
    this._entityLoadedCallbacks.push(t);
  }
  removeEntityLoadedCallback(t) {
    for (let e = 0, i = this._entityLoadedCallbacks.length; e < i; e++) if (this._entityLoadedCallbacks[e] === t) return void this._entityLoadedCallbacks.splice(e, 1);
  }
  addEntityWillBeUnloadedCallback(t) {
    this._entityWillBeUnloadedCallbacks.push(t);
  }
  removeEntityWillBeUnloadedCallback(t) {
    for (let e = 0, i = this._entityWillBeUnloadedCallbacks.length; e < i; e++) if (this._entityWillBeUnloadedCallbacks[e] === t) return void this._entityWillBeUnloadedCallbacks.splice(e, 1);
  }
  setEntitiesForceVisible(t, e, i = true) {
    if (e) for (let t = 0, e = this._entityStatuses.getSize(); t < e; t++) {
      this._entityStatuses.getAt(t).value.forceVisible = false;
    }
    for (let e = 0, s = t.length; e < s; e++) {
      const s = t[e];
      const n = this._entityStatuses.get(s);
      if (void 0 === n) throw new Error(`Entity ${s} was set to force load, but isn't in the scene manager. Use addEntity().`);
      n.forceVisible = i;
    }
    this.update();
  }
  setExtraEntityOptions(t) {
    this._entityExtraOptions = {
      ...t
    };
  }
  updateEntityLayerVisibilityForChildren(t) {
    const layerManager = this.app.getManager("layer");
    const i = this._scene.getEngine().getTime();
    for (let s = 0, n = this._entityStatuses.getSize(); s < n; s++) {
      const n = this._entityStatuses.getAt(s);
      SolarSystemSceneExports.Parenting.getAllAncestorsOfEntity(n.key, i).has(t.parentId) && (n.value.layerVisibility = layerManager.isEntityVisibleWithCurrentLayers(n.key, t));
    }
  }
  updateEntityLayerVisibility(t) {
    const layerManager = this.app.getManager("layer");
    for (let i = 0, s = this._entityStatuses.getSize(); i < s; i++) {
      const s = this._entityStatuses.getAt(i);
      s.value.layerVisibility = layerManager.isEntityVisibleWithCurrentLayers(s.key, t);
    }
  }
  update() {
    const t = this.app.getManager("camera").cameraEntity;
    const contentManager = this.app.getManager("content");
    for (let i = 0, s = this._entityStatuses.getSize(); i < s; i++) {
      const s = this._entityStatuses.getAt(i);
      const n = s.key;
      const o = s.value;
      const a = o.forceVisible || !o.dynamic && o.layerVisibility || o.dynamic && o.layerVisibility && this._isEntityVisibleWithinParent(n) || t?.getParent()?.getName() === n;
      let l = this._scene.getEntity(n);
      if (a && null === l) {
        this._createEntity(n);
        const t = SolarSystemSceneExports.SceneHelpers.getDependentEntities(n);
        for (const e of t) null === this._scene.getEntity(e) && this._createEntity(e);
      } else if (!a && null !== l) {
        const i = t.getParent()?.getName();
        const s = contentManager.getEntityInfo(n)?.ignoreDependentWhenUnloading;
        let r = false;
        for (let t = 0, e = o.dependentEntities.length; t < e; t++) {
          const e = this._scene.getEntity(o.dependentEntities[t])?.getName();
          if (e) {
            if (e === i && s?.includes(i)) {
              r = false;
              break;
            }
            r = true;
          }
        }
        if (!r) {
          for (let t = 0, e = this._entityWillBeUnloadedCallbacks.length; t < e; t++) {
            this._entityWillBeUnloadedCallbacks[t](l);
            l = null;
          }
          o.dependentEntities = [];
          this._scene.removeEntity(n);
        }
      }
      const c = this._entityStatuses.get(l?.getParent()?.getName());
      const h = o.forceVisible || o.layerVisibility && c?.visible || this._isAncestorOfCamera(t, n) || o.entitiesForcingThisVisible.size > 0;
      null !== l && o.visible !== h && this.setVisibility(h, n);
    }
  }
  _createEntity(t) {
    const e = SolarSystemSceneExports.Entity.create(t, this._scene, this._entityExtraOptions);
    this._entityStatuses.get(t).visible || this.setVisibility(false, t);
    const i = SolarSystemSceneExports.SceneHelpers.getDependentEntities(t);
    for (const e of i) {
      let i = this._entityStatuses.get(e);
      void 0 === i && (this.addEntity(e, this._entityStatuses.get(t).dynamic), i = this._entityStatuses.get(e));
      i.dependentEntities.push(t);
    }
    for (let t = 0, i = this._entityLoadedCallbacks.length; t < i; t++) this._entityLoadedCallbacks[t](e);
    return e;
  }
  _isAncestorOfCamera(t, e) {
    let i = t;
    for (; null !== i;) {
      if (i.getName() === e) return true;
      for (let t = 0, s = i.getNumParentingTableEntries(); t < s; t++) if (i.getParentingTableEntry(t)[1] === e) return true;
      i = i.getParent();
    }
    return false;
  }
  setVisibility(t, e) {
    const i = this._entityStatuses.get(e);
    void 0 !== i && (i.visible = t);
    const s = this._scene.getEntity(e);
    if (null === s) return;
    const layerManager = this.app.getManager("layer");
    const r = layerManager.getLayer("trails").visible;
    const a = layerManager.getLayer("labels").visible;
    for (let e = 0; e < s.getNumComponents(); e++) {
      const n = s.getComponentAt(e);
      "sun" !== s.getName() && (t && n instanceof Pioneer.TrailComponent ? n.setEnabled(t && r && !i.componentTypesNotVisible.has(Pioneer.TrailComponent)) : t && n instanceof Pioneer.DivComponent ? n.setEnabled(t && a && !i.componentTypesNotVisible.has(Pioneer.DivComponent)) : n.setEnabled(t && !Array.from(i.componentTypesNotVisible).some(t => n instanceof t)));
    }
    const l = this.app.getManager("content").getEntityInfo(e);
    if (void 0 !== l?.forceVisibleEntities) for (let i = 0, s = l.forceVisibleEntities.length; i < s; i++) {
      const s = this._entityStatuses.get(l.forceVisibleEntities[i]);
      if (void 0 === s) throw new Error(`Entity ${e} was set to force load, but isn't in the scene manager. Use addEntity().`);
      t ? s.entitiesForcingThisVisible.add(e) : s.entitiesForcingThisVisible.delete(e);
    }
  }
  _isEntityVisibleWithinParent(t) {
    const e = SolarSystemSceneExports.Parenting.getParentOfEntity(t, this._scene.getEngine().getTime());
    const i = this._scene.getEntity(e);
    if (null === i) return false;
    const s = SolarSystemSceneExports.Entity.getEntityOptions(e);
    return (s.systemRadius || 25 * s.radius || 25 * s.extentsRadius) / i.getExtentsRadius() * i.getGreatestPixelSpaceExtentsRadius() >= 20;
  }
  get(t) {
    return void 0 !== this._scenes[t] ? this._scenes[t] : null;
  }
  getEntitiesNames() {
    const t = [];
    for (let e = 0; e < this._scene.getNumEntities(); e++) {
      const i = this._scene.getEntityAt(e);
      t.push(i.getName());
    }
    return t;
  }
  getParent(t) {
    const e = this._scene.getEntity(t);
    if (null !== e) {
      const t = e.getParent();
      if (null !== t) return t.getName();
    }
    return null;
  }
  getParentList(t) {
    let e = this.getParent(t);
    const i = [];
    for (; null !== e && "" !== e;) {
      i.push(e);
      e = this.getParent(e);
    }
    return i;
  }
  getDependencies(t) {
    const e = this._scene.getEntity(t);
    const set = new Set();
    if (null !== e) for (let t = 0; t < e.getNumParentingTableEntries(); t++) {
      const s = e.getParentingTableEntry(t)[1];
      "" !== s && set.add(s);
    }
    const s = SolarSystemSceneExports.Entity.getEntityOptions(t);
    if (void 0 !== s) for (const e of Object.keys(s)) {
      const n = s[e];
      if ("parents" === e) for (let t = 0; t < n.length; t++) {
        const e = n[t][1];
        "" !== e && set.add(e);
      }
      "align" === e && (n.primary && n.primary.target && n.primary.target !== t && set.add(n.primary.target), n.secondary && n.secondary.target && n.secondary.target !== t && set.add(n.secondary.target));
    }
    return Array.from(set);
  }
  async isReady(t, e) {
    e = void 0 === e ? this.pioneer.getTime() : this.app.getManager("time").momentToET(e);
    await this._scene.waitTillEntitiesInPlace([t], e);
  }
  async isListReady(t, e) {
    const i = [];
    void 0 === e && (e = [void 0]);
    for (let s = 0; s < t.length; s++) for (let n = 0; n < e.length; n++) i.push(this.isReady(t[s], e[n]));
    await Promise.all(i);
  }
  async tileIsReady(t) {
    let e = null;
    return new Promise((i, s) => {
      const n = setInterval(() => {
        t.isEnabled() && t.getEntity().isEnabled() || (clearInterval(n), s(new Error("disabled")));
        null === e && null !== t.getTilesLoadedPromise() && (e = t.getTilesLoadedPromise().then(() => {
          clearInterval(n);
          i(true);
        }));
      }, 30);
    });
  }
  hasCMTS(t) {
    return !!SolarSystemSceneExports.Mapping.getOptions()[t] && "cmts" in SolarSystemSceneExports.Mapping.getOptions()[t];
  }
  getCMTSEntity(t) {
    if (!t) return null;
    if (this.hasCMTS(t)) return this._scene.getEntity(t);
    let e = t;
    for (; !this.hasCMTS(e) && (e = this._scene.getEntity(e)?.getParent()?.getName(), e && !e.includes("universe")););
    return this.hasCMTS(e) ? this._scene.getEntity(e) : null;
  }
  async terrainIsReady(t) {
    let e = null;
    return new Promise(i => {
      const s = setInterval(() => {
        t.isEnabled() && t.getEntity().isEnabled() || (clearInterval(s), i(true));
        null === e && null !== t._loadedPromise && (e = t.getTilesLoadedPromise().then(() => {
          clearInterval(s);
          i(true);
        }));
      }, 30);
    });
  }
  async componentIsReady(t) {
    if (t.isEnabled() && "loaded" === t.getLoadState().state) return;
    return new Promise(e => {
      const i = setInterval(() => {
        t.isEnabled() && t.getEntity().isEnabled() || (clearInterval(i), e(true));
        "loaded" === t.getLoadState().state && (clearInterval(i), e(true));
      }, 30);
    });
  }
  toggleStarfield(t) {
    for (let e = 0; e < 7; e++) this._scene.getEntity("sun").getComponent(Pioneer.StarfieldComponent, e).setEnabled(t);
  }
  toggleHeliosphere(t) {
    this._scene.getEntity("sun").getComponent(Pioneer.ModelComponent).setEnabled(t);
  }
  async toggleConstellations(t) {
    const e = this._scene.getEntity("sun");
    if (null === e) return;
    let i = e.getComponent(SolarSystemSceneExports.ConstellationsComponent);
    if (t && null === i) {
      i = e.addComponent(SolarSystemSceneExports.ConstellationsComponent);
      i instanceof SolarSystemSceneExports.ConstellationsComponent && (i.setUrl("$STATIC_ASSETS_URL/stars/constellations.bin"), i.setColor(new Pioneer.Color(.35, .7, 1, .5)));
      await i.getLoadedPromise();
      const labelManager = this.app.getManager("label");
      const contentManager = this.app.getManager("content");
      const color = new Pioneer.Color(.35, .7, 1, 1);
      const a = this.get("main").getEntity("camera").getComponent(Pioneer.CameraComponent);
      i.getNames().forEach(e => {
        const r = `constellation_label_${e}`;
        const l = this._scene.getEntity(r);
        const c = labelManager.getDefaultWeight(r);
        labelManager.addLabel(l, c);
        labelManager.setLabelProps({
          getLabelClass: t => `no-select ${contentManager.getClassName(t, "constellation") ?? "constellation"}`,
          handleTouch: null,
          handleMouseEnter: t => {
            i.setHighlight(i.getNearestConstellationIndex(new Pioneer.Vector2(t.x, t.y), a), color, 2.5);
          },
          handleMouseLeave: () => {
            i.setHighlight(void 0, color, 2.5);
          },
          handleClick: null
        }, [r]);
      });
    } else if (!t && null !== i) {
      const labelManager = this.app.getManager("label");
      i.getNames().forEach(e => {
        const i = `constellation_label_${e}`;
        const s = this._scene.getEntity(i);
        labelManager.removeLabel(s);
      });
      e.removeComponent(i);
    }
  }
  isHD() {
    return this._isHD;
  }
  hasHD(t) {
    const e = this._scene.getEntity(t);
    if (null === e) return false;
    if (Object.prototype.hasOwnProperty.call(this._hdWMTSMap, t)) return true;
    if (null !== e.getParent() && Object.prototype.hasOwnProperty.call(this._hdWMTSMap, e.getParent().getName())) return true;
    if (null !== e.getComponent(Pioneer.SpheroidLODComponent)) {
      const t = e.getComponent(Pioneer.SpheroidLODComponent).getTextureSizes("color");
      for (let e = 0; e < t.length; e++) if (t[e] > this._hdBreakpointSize) return true;
    }
    return false;
  }
  setHDBreakpoints(hdBreakpointSize, maxTextureSize) {
    this._hdBreakpointSize = hdBreakpointSize;
    this._maxTextureSize = maxTextureSize;
  }
  async toggleHD() {
    this._isHD = !this._isHD;
    this._isHD || this.pioneer.getConfig().setValue("maxTextureSize", this._hdBreakpointSize);
    for (const t in this._hdWMTSMap) {
      const e = this._hdWMTSMap[t];
      const i = this._scene.getEntity(t);
      const s = i.getComponent(Pioneer.SpheroidLODComponent);
      const n = i.getComponent(SolarSystemSceneExports.WMTSComponent, e);
      if (EyesPublicApi.AppUtils.isMobileMode() && n.setMaxLevel(5), n.setEnabled(this._isHD), this._isHD) {
        this.addLoading(t, "wmts");
        await this.pioneer.waitUntilNextFrame();
        true === (await this.tileIsReady(n).catch(() => {
          this.removeLoading(t, "wmts");
        })) && (s.setEnabled(false), this.removeLoading(t, "wmts"));
      } else s.setEnabled(true);
      this._isHD && this.pioneer.getConfig().setValue("maxTextureSize", this._maxTextureSize);
    }
  }
  async updateHDTarget(t, e) {
    const contentManager = this.app.getManager("content");
    const s = this.app.getManager("router").currentView;
    let hdToggleEntity = e;
    if (this._hdToggleEntity = null, "Planet" === t.category || "Moon" === t.category || "Dwarf Planet" === t.category || "Star" === t.category) hdToggleEntity = e;else {
      const t = this.getParent(e);
      if ("event" === s) return void (hdToggleEntity = this.app.getView("event")._eventInfo?.target);
      const o = await this.findClosestSpaceObjectTo(e);
      if (null !== t) {
        const e = contentManager.getEntityInfo(t);
        if ("Planet" === e.category || "Moon" === e.category) return void (hdToggleEntity = t);
        if ("Landing site" === e.category) {
          return void (hdToggleEntity = this.getParent(t));
        }
        if (o) return t === o ? void (hdToggleEntity = t) : void (hdToggleEntity = o);
      }
    }
    null !== hdToggleEntity && this.hasHD(hdToggleEntity) ? this._hdToggleEntity = hdToggleEntity : this._hdToggleEntity = null;
  }
  async findClosestSpaceObjectTo(t) {
    const e = this.get("main");
    const i = SolarSystemSceneExports.SceneHelpers.getDependentEntities(t);
    const s = Array.from(i);
    const n = s.filter(t => this.hasHD(t));
    return e.waitTillEntitiesInPlace(s, this.app.pioneer.getTime(), 3).then(async () => {
      let i = "";
      let s = e.getEntity(n[0])?.getDistanceTo(e.getEntity(t), false);
      n.forEach(n => {
        const o = e.getEntity(n).getDistanceTo(e.getEntity(t), false);
        o < s && (s = o, i = n);
      });
      return i;
    }).catch(t => {
      console.warn(t);
    });
  }
  async forceTextureSizeForEntity(t, e, i = "color") {
    const s = this.app.pioneer.getScene("main").getEntity(t).getComponent(Pioneer.SpheroidLODComponent);
    null != s && s.forceTextureSize(i, e);
  }
  async isEntityHD(t) {
    const e = this.app.pioneer.getScene("main").getEntity(t).getComponent(Pioneer.SpheroidLODComponent);
    return !(null == e || !e.isEnabled()) && (await e.getTexturesLoadedPromise(3).catch(() => false), e.getTextureCurrentSize("color", 0) > this._hdBreakpointSize);
  }
  async toggleHDTextureForEntity(t, e = null) {
    const i = await this.isEntityHD(t);
    if (null !== e && i === e) return e;
    const s = this.app.pioneer.getScene("main").getEntity(t).getComponent(Pioneer.SpheroidLODComponent);
    const isHD = null !== e ? e : !i;
    const r = isHD ? EyesPublicApi.AppUtils.isiPhone() ? this._mobileTextureSize : this._maxTextureSize : this._hdBreakpointSize;
    this.addLoading(t, "spheroidLOD");
    s.getTextureNames().forEach(e => {
      this.forceTextureSizeForEntity(t, r, e);
    });
    await s?.getTexturesLoadedPromise(3).catch(async () => {
      const e = this.app.getManager("content").getSpheroidDefaultTextureInformation(t);
      this.app.getManager("layer").changeSpheroidMap(t, e);
      this._isHD = false;
      return false;
    });
    this.removeLoading(t, "spheroidLOD");
    this._isHD = isHD;
    return isHD;
  }
  createRing(t, e, i, {
    orbitPlaneEntityName: orbitPlaneEntityName,
    color: color,
    numCircles: a = 1,
    numSpokes: l = 0,
    labelPosition: c = new Pioneer.Vector3(-e, 0, 0),
    labelText: h = "",
    isEnable: d = true
  } = {}) {
    const u = this._scene.addEntity(t);
    u.setPosition(Pioneer.Vector3.Zero);
    const p = this._scene.getEntity(i);
    u.setParent(p);
    const _ = u.addComponent(SolarSystemSceneExports.DiscGridComponent);
    _.setLineWidth(6);
    _.setSize(e);
    _.setNumCircles(a);
    _.setNumSpokes(l);
    orbitPlaneEntityName && this.setAlignPlane(u, orbitPlaneEntityName);
    color instanceof Pioneer.Color && _.setColor(color);
    const m = this._scene.addEntity(`${t}Label`);
    m.setPosition(Pioneer.Vector3.Zero);
    m.setParent(p);
    m.addController(Pioneer.FixedController).setPosition(c);
    const g = m.addComponent(Pioneer.DivComponent);
    g.getDiv().classList.add("ring-label");
    g.getDiv().innerHTML = h;
    u.setEnabled(d);
    m.setEnabled(d);
  }
  createTorus(t, e, i, s, {
    orbitPlaneEntityName: orbitPlaneEntityName,
    color: color,
    visibleDistance: l = [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY],
    labelPosition: c = new Pioneer.Vector3(-i, 0, 0),
    labelText: h = "",
    isEnable: d = true
  } = {}) {
    const u = this._scene.addEntity(t);
    u.setPosition(Pioneer.Vector3.Zero);
    const p = this._scene.getEntity(s);
    u.setParent(p);
    const _ = u.addComponent(SolarSystemSceneExports.TorusComponent);
    _.setInnerRadius(e);
    _.setOuterRadius(i);
    _.setVisibleInterval(new Pioneer.VisibleInterval(...l));
    orbitPlaneEntityName && this.setAlignPlane(u, orbitPlaneEntityName);
    color instanceof Pioneer.Color && _.setColor(color);
    const m = this._scene.addEntity(`${t}Label`);
    m.setPosition(Pioneer.Vector3.Zero);
    m.setParent(p);
    m.addController(Pioneer.FixedController).setPosition(c);
    const g = m.addComponent(Pioneer.DivComponent);
    g.getDiv().classList.add("ring-label");
    g.getDiv().innerHTML = h;
    u.setEnabled(d);
    m.setEnabled(d);
  }
  setEntityHDWMTS(t, e) {
    this._hdWMTSMap[t] = e;
  }
  async enableWMTSComponent(t, e) {
    EyesPublicApi.AppUtils.isMobileMode() && e.setMaxLevel(5);
    const i = this.get("main").getEntity(t).getComponent(Pioneer.SpheroidLODComponent);
    this.addLoading(t, "wmts");
    e.setEnabled(true);
    await this.pioneer.waitUntilNextFrame();
    (await this.tileIsReady(e).catch(() => {
      this.removeLoading(t, "wmts");
    })) ? (i.setEnabled(false), this.removeLoading(t, "wmts")) : i.setEnabled(true);
  }
  async addWMTSComponent(t, e) {
    this.addLoading(t, "wmts");
    const wmtsManager = this.app.getManager("wmts");
    const s = await wmtsManager.initWMTS(t, e);
    s ? (this.removeLoading(t, "wmts"), await this.enableWMTSComponent(t, s)) : await this.showWMTSError(t);
  }
  async showWMTSError(t) {
    this.removeLoading(t, "wmts");
    const toastComponent = this.app.getComponent("toast");
    const i = "WMTS Data could not be loaded. Switching to " + (this.hasHD(t) ? "HD" : "standard") + " map.";
    toastComponent.setError(true);
    toastComponent.setContent(i);
    toastComponent.show();
    this.hasHD(t) && !this.isHD() && (await this.toggleHDTextureForEntity(t));
  }
  loadWMTSFromJSON(t) {
    for (const e in t) {
      let i = "";
      for (const s in t[e]) if ("hd" === s || "" === i) {
        i = t[e][s];
        this._hdWMTSMap[e] = i;
      } else {
        const i = t[e][s];
        const n = this._scene.getEntity(e).addComponent(SolarSystemSceneExports.WMTSComponent, s);
        n.setEnabled(false);
        n.setEndPoint(i.endPoint);
        n.setLayer(i.layer);
        i.tile && n.setTileMatrixSet(i.tile);
        const date = new Date();
        "yesterday" === i.time ? (date.setDate(date.getDate() - 1), n.setDimensionValue("Time", date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0"))) : "now" === i.time && n.setDimensionValue("Time", date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0"));
        i.level ? n.setMaxLevel(i.level) : n.setMaxLevel(1 / 0);
      }
    }
  }
  setAlignPlane(t, e) {
    const i = this._scene.getEntity(e);
    const quaternion = new Pioneer.Quaternion();
    i.getController(Pioneer.DynamoController).getOrbitOrientation(quaternion, this.app.pioneer.getTime());
    t.setOrientation(quaternion);
  }
  clearTempEntities() {
    const t = this.app.getManager("camera").cameraEntity;
    if (null === t || null === t.getParent()) return;
    const e = t.getParent().getName();
    this._tempEntities = this._tempEntities.filter(t => {
      if (e === t.getName()) return true;
      this.app.getManager("label").removeLabel(t);
      this._scene.removeEntity(t?.getName());
      return false;
    });
  }
  addTempEntity(t) {
    this._tempEntities.push(t);
  }
  addLoading(t, e) {
    const i = t + "_" + e;
    this._loadingItems.indexOf(i) < 0 && this._loadingItems.push(i);
    this._loadingItems.length > 0 && (this._isLoading = true, this.triggerCallbacks("loading"));
  }
  removeLoading(t, e) {
    if ("*" === t) for (let t = 0; t < this._loadingItems.length; t++) this._loadingItems[t].includes(e) && this._loadingItems.splice(t, 1);else {
      const i = t + "_" + e;
      const s = this._loadingItems.indexOf(i);
      s >= 0 && this._loadingItems.splice(s, 1);
    }
    0 === this._loadingItems.length && (this._isLoading = false, this.triggerCallbacks("loaded", [t]));
  }
  forceLoad(t) {
    t.setForceLoaded(true);
    this._loadedComponents.push(t);
  }
  removeForceLoad(t) {
    this._loadedComponents = this._loadedComponents.filter(e => e !== t || (t.setForceLoaded(false), false));
  }
  clearForceLoad() {
    for (let t = 0; t < this._loadedComponents.length; t++) {
      this._loadedComponents[t].setForceLoaded(false);
    }
    this._loadedComponents = [];
  }
  getDistance(t, e, {
    time: time,
    subtractRadius: s = false,
    precision: n = 0
  } = {}) {
    const r = Pioneer.Vector3.pool.get();
    const a = this._scene.getEntity(t);
    const l = this._scene.getEntity(e);
    let c = 0;
    if (void 0 !== time) {
      const t = Pioneer.TimeUtils.unixToEt(time.valueOf() / 1e3);
      a.getPositionRelativeToEntity(r, Pioneer.Vector3.Zero, l, t);
    } else a.getPositionRelativeToEntity(r, Pioneer.Vector3.Zero, l);
    if (c = r.magnitude(), s) {
      c -= a.getExtentsRadius() + l.getExtentsRadius();
    }
    if (n > 0) {
      const t = Math.pow(10, Math.floor(Math.log10(c)) - n);
      c = Math.round(c / t) * t;
    }
    Pioneer.Vector3.pool.release(r);
    return c;
  }
  getSpeed(t, e, {
    time: time
  } = {}) {
    const s = Pioneer.Vector3.pool.get();
    const n = this._scene.getEntity(t);
    let r = null;
    if (r = void 0 === e ? n.getParent() : this._scene.getEntity(e), void 0 !== time) {
      const t = this.app.getManager("time").momentToET(time);
      n.getVelocityRelativeToEntity(s, Pioneer.Vector3.Zero, r, t);
    } else n.getVelocityRelativeToEntity(s, Pioneer.Vector3.Zero, r);
    Pioneer.Vector3.pool.release(s);
    return s.magnitude();
  }
  getCoverage(t, e = true) {
    const i = {
      min: EyesPublicApi.AppUtils.constants.maxDate,
      max: EyesPublicApi.AppUtils.constants.minDate
    };
    const s = this.pioneer.getScene("main").getEntity(t);
    let r = s.getPositionCoverage().min;
    let l = s.getPositionCoverage().max;
    if (e && (r = Math.max(s.getPositionCoverage().min, s.getOrientationCoverage().min), l = Math.min(s.getPositionCoverage().max, s.getOrientationCoverage().max)), i.min = s ? Math.min(r, i.min) : i.min, i.max = s ? Math.max(l - .001, i.max) : i.max, i.min === -1 / 0 || i.min < EyesPublicApi.AppUtils.minDate) i.min = getFollowName()(EyesPublicApi.AppUtils.constants.minDate);else {
      i.min = Math.ceil(1e3 * i.min) / 1e3;
      let t = 1e3 * Pioneer.TimeUtils.etToUnix(i.min);
      t = Math.ceil(1e3 * t) / 1e3;
      i.min = getFollowName().tz(t, "ETC/Utc");
    }
    if (i.max === 1 / 0 || i.max > EyesPublicApi.AppUtils.maxDate) i.max = getFollowName()(EyesPublicApi.AppUtils.constants.maxDate);else {
      i.max = Math.floor(1e3 * i.max) / 1e3;
      let t = 1e3 * Pioneer.TimeUtils.etToUnix(i.max);
      t = Math.floor(1e3 * t) / 1e3;
      i.max = getFollowName().tz(t, "ETC/Utc");
    }
    return i;
  }
  async toggleRing(t) {
    console.log("toggleRing", t);
  }
  get main() {
    return this._scene;
  }
  get isLoading() {
    return this._isLoading;
  }
}
export { SceneManager };
