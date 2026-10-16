// Recovered from app.js:1244022-1252117.
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
import * as Pioneer from "../pioneer/index.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
class LayerManager extends EyesPublicApi.BaseManager {
  constructor(t) {
    super(t);
    this._sceneManager = t.getManager("scene");
    this._contentManager = t.getManager("content");
    this._layers = {};
    this._contextualLayersList = ["majorMoons", "minorMoons", "landers", "orbiters", "satelliteGroup", "heliosphere"];
    this._targetId = "";
    this._previousTarget = [];
    this._dependencies = new Set();
    this._previousDependencies = new Set();
    this._currentSurfaceLayer = "default";
    this.bindFunctions(["resetContextualVisibility", "toggleLayer", "changeSpheroidMap", "resetContextualLayers"]);
    this._eventNames.push("toggleLayer");
    this._initCallbacks();
  }
  addLayer(t, {
    name: e = "",
    group: i = "",
    categories: s = [],
    defaultVisibility: n = true,
    toggleCallback: o = [],
    sublayers: r = []
  }) {
    void 0 === this._layers[t] && (this._layers[t] = {});
    this._layers[t].name = e;
    this._layers[t].group = i;
    this._layers[t].defaultVisibility = n;
    this._layers[t].visible = n;
    Array.isArray(s) || (s = [s]);
    this._layers[t].categories = s;
    Array.isArray(r) || (r = [r]);
    this._layers[t].sublayers = r;
    for (let e = 0; e < r.length; e++) {
      const i = r[e];
      void 0 === this._layers[i] && (this._layers[i] = {});
      this._layers[i].parent = t;
    }
    Array.isArray(o) || (o = [o]);
    this._layers[t].toggleCallback = o;
  }
  addCallback(t, e) {
    const i = this.getLayer(t);
    null !== i && i.toggleCallback.push(e);
  }
  removeCallback(t, e) {
    const i = this.getLayer(t);
    if (null === i) return;
    const s = i.toggleCallback.indexOf(e);
    i.toggleCallback.splice(s, 1);
  }
  getLayer(t) {
    return void 0 === this._layers[t] ? null : this._layers[t];
  }
  getCurrentSurfaceLayer() {
    return this._currentSurfaceLayer;
  }
  async changeSpheroidMap(t, e, i = {}) {
    if ("cmts" === e.type) return void console.error("This function does not yet handle CMTS texture");
    const sceneManager = this.app.getManager("scene");
    const wmtsManager = this.app.getManager("wmts");
    const a = sceneManager.get("main").getEntity(t)?.getComponent(Pioneer.SpheroidLODComponent);
    const l = sceneManager.get("main").getEntity(t)?.getComponent(Pioneer.AtmosphereComponent);
    const c = sceneManager.get("main").getEntity(t)?.getComponent(SolarSystemSceneExports.WMTSComponent);
    this._currentSurfaceLayer = e.id;
    a && "texture" === e.type ? (false === wmtsManager.getWMTSComponentState(t) && sceneManager.isEntityHD(t) && (await sceneManager.toggleHDTextureForEntity(t, false)), a.setEnabled(true), sceneManager.addLoading(t, "spheroidLOD"), Object.keys(e.textures).forEach(t => {
      const i = "$STATIC_ASSETS_URL/maps/" + e.textures[t].url;
      a.setTexture(t, i, e.textures[t].sizes);
    }), await a.getLoadedPromise(), null !== c && c.setEnabled(false), sceneManager.removeLoading(t, "spheroidLOD")) : "wmts" === e.type && (null === c || c.getName() !== e.id ? await sceneManager.addWMTSComponent(t, e) : false === c.isEnabled() && (await sceneManager.enableWMTSComponent(t, c)));
    null != l && false !== i.atmosphere && l.setEnabled(e.features.includes("atmosphere"));
  }
  async resetSpheroidMap(t) {
    const e = this._app.pioneer.getScene("main").getEntity(t)?.getComponent(Pioneer.AtmosphereComponent);
    let i = ["shadowEntities"];
    e?.isEnabled() && (i = ["shadowEntities", "atmosphere"]);
    const s = this._app.getManager("content").getSpheroidDefaultTextureInformation(t, i);
    "default" !== s?.id && (await this.changeSpheroidMap(t, s));
  }
  async toggleLayer(t, e = {}, i) {
    const {
      spout: spout,
      spoutFontSize: spoutFontSize
    } = this.app.getManager("router").configs;
    if (void 0 === this._layers[t]) return;
    const {
      configs: configs
    } = this._app.getManager("router");
    if (e.layerId = t, void 0 !== i && this._layers[t].visible === i && true !== configs[t]) return;
    this._layers[t].visible = !this._layers[t].visible;
    for (let i = 0; i < this._layers[t].toggleCallback.length; i++) {
      (0, this._layers[t].toggleCallback[i])(this._layers[t].visible, e);
    }
    for (let i = 0; i < this._layers[t].sublayers.length; i++) {
      this.getLayer(this._layers[t].sublayers[i]).visible = this._layers[t].visible;
      this.triggerCallbacks("toggleLayer", [this._layers[t].sublayers[i], this._layers[t].visible, e]);
    }
    this.triggerCallbacks("toggleLayer", [t, this._layers[t].visible, e]);
    const sceneManager = this.app.getManager("scene");
    if (null !== e.parentId && void 0 !== e.parentId ? sceneManager.updateEntityLayerVisibilityForChildren(e) : sceneManager.updateEntityLayerVisibility(e), true === spout && this._layers[t].visible) {
      const e = [];
      if (await this.pioneer.waitUntilNextFrame(), t.toLowerCase().includes("constellations")) {
        this.app.pioneer.getScene("main").getEntity("sun").getComponent(SolarSystemSceneExports.ConstellationsComponent).getNames().forEach(t => {
          e.push(this.app.pioneer.getScene("main").getEntity(`constellation_label_${t}`));
        });
      }
      await this.app.getManager("spout").setUpSpoutLabels(spoutFontSize, e?.[0]?.id);
    }
  }
  syncLayerVisibilityWithQueries() {
    const t = this.app.getManager("router").configs;
    this._contextualLayersList.forEach(e => {
      const i = t[e] ?? this._app.getManager("layer").getLayer(e).defaultVisibility;
      this.toggleLayer(e, {}, i);
    });
  }
  setTarget(targetId) {
    if (this._previousTarget.push(this._targetId), this._previousDependencies = new Set([...this._previousDependencies, ...this._dependencies]), this._targetId = targetId, this._dependencies.clear(), "" !== this._targetId) {
      const t = this._sceneManager.getDependencies(this._targetId);
      this._dependencies = new Set(t);
    }
  }
  resetTarget() {
    for (let t = 0; t < this._previousTarget.length; t++) {
      const e = this._previousTarget[t];
      const i = this.app.getManager("camera").cameraEntity;
      if (null === i || null === i.getParent()) return;
      if (i.getParent().getName() === e) return;
    }
    for (let t = 0; t < this._previousTarget.length; t++) {
      const e = this._previousTarget[t];
      this.resetContextualVisibility(e);
    }
    this._previousTarget = [];
    this._previousDependencies.clear();
  }
  resetContextualVisibility(contextId) {
    const e = this._sceneManager.main.getEngine().getTime();
    let i = this.getContextualLayers(contextId);
    for (; "" !== contextId && 0 === i.length;) {
      contextId = SolarSystemSceneExports.Parenting.getParentOfEntity(contextId, e);
      i = this.getContextualLayers(contextId);
    }
    let targetId = this._targetId;
    for (i = this.getContextualLayers(targetId); "" !== targetId && 0 === i.length;) {
      targetId = SolarSystemSceneExports.Parenting.getParentOfEntity(targetId, e);
      i = this.getContextualLayers(targetId);
    }
    if (targetId !== contextId) {
      this._contextId = contextId;
      for (let e = 0; e < i.length; e++) {
        const s = i[e];
        const n = this.getLayer(s);
        if (void 0 !== n.parent) {
          this.getLayer(n.parent).visible !== n.visible && this.toggleLayer(s, {
            parentId: contextId,
            group: n.group
          });
        } else n.visible !== n.defaultVisibility && this.toggleLayer(s, {
          parentId: contextId,
          group: n.group
        });
      }
    }
  }
  getTarget() {
    return this._targetId;
  }
  getEntityLayer(t) {
    const e = this._contentManager.getEntityInfo(t);
    if (null === e) return null;
    const i = e.category;
    const s = e.subcategory;
    return this.getLayerFromCategory(s) || this.getLayerFromCategory(i);
  }
  getLayerFromCategory(t) {
    if (!t) return null;
    for (const [e, i] of Object.entries(this._layers)) if (i.categories.includes(t)) return this._layers[e];
    return null;
  }
  getLayerFromSatelliteGroup(t) {
    if (!t) return null;
    for (const [e, i] of Object.entries(this._layers)) if (i.categories.includes(t)) return this._layers[e];
    return null;
  }
  getAllContextualLayerOptions() {
    return this._contextualLayersList;
  }
  getContextualLayers(t) {
    const e = [];
    if ("" === t) return e;
    const contentManager = this.app.getManager("content");
    const n = contentManager.getEntityInfo(t);
    const o = n?.hasMoons ? SolarSystemSceneExports.Entity.getEntityNamesInGroup(t + ", moons") : new Set();
    const r = SolarSystemSceneExports.Entity.getEntityNamesInGroup(t + ", spacecraft");
    "sun" === t && false === e.includes("heliosphere") && e.push("heliosphere");
    o.forEach(t => {
      const s = contentManager.getEntityInfo(t);
      if (null !== s) {
        switch (s.subcategory || s.category) {
          case "Major Moon":
            false === e.includes("majorMoons") && e.push("majorMoons");
            break;
          case "Minor Moon":
            false === e.includes("minorMoons") && e.push("minorMoons");
        }
      }
    });
    const a = this._app.pioneer.getTime();
    r.forEach(n => {
      const o = contentManager.getEntityInfo(n);
      if (null !== o) {
        switch (o.subcategory || o.category) {
          case "Orbiter":
            false === e.includes("orbiters") && SolarSystemSceneExports.Parenting.getParentOfEntity(n, a) === t && e.push("orbiters");
            break;
          case "Landing Site":
          case "Lander":
          case "Rover":
            false === e.includes("landers") && SolarSystemSceneExports.Parenting.getParentOfEntity(n, a) === t && e.push("landers");
        }
      }
    });
    n?.constellation && e.push("satelliteGroup");
    e.sort((t, e) => {
      const i = Object.keys(this._layers);
      return i.indexOf(t) - i.indexOf(e);
    });
    return e;
  }
  resetContextualLayers(t, e) {
    const i = this.getContextualLayers(t);
    this._contextualLayersList.forEach(t => {
      false === i.includes(t) && ("heliosphere" === t ? this.toggleLayer(t, {
        parentId: void 0
      }, this.getLayer(t).defaultVisibility || false) : this.toggleLayer(t, {
        parentId: e
      }, this.getLayer(t).defaultVisibility || false));
    });
  }
  isEntityVisibleWithCurrentLayers(t, e = {}) {
    const {
      satelliteGroup: satelliteGroup,
      allowSublayer: allowSublayer
    } = e ?? {};
    const n = this._contentManager.getEntityInfo(t);
    if (null !== n) {
      const t = this.getLayerFromCategory(n.category);
      const e = this.getLayerFromCategory(n.subcategory);
      const o = this.getLayerFromSatelliteGroup(n.constellation);
      return null !== o && n.constellation === satelliteGroup ? o.visible : null !== e ? !(e.parent && !this.getLayer(e.parent)?.visible && !allowSublayer) && e.visible : null !== t ? t.visible : null === t && null === e;
    }
    return true;
  }
}
export { LayerManager };
