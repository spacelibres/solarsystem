// Recovered from app.js:225926-231270.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class Scene extends PioneerPublicApi.CollectionItem {
  constructor(t, e) {
    super(t, e);
    this._entities = new PioneerPublicApi.Collection(this);
    this._controllerDependencyGraph = new PioneerPublicApi.DependencyGraph(Scene._updateController, Scene._compareControllers);
    this._ambientLightColor = new PioneerPublicApi.Color(.02, .02, .02);
    this._lightSources = [];
    this._threeJsScene = new PioneerPublicApi.THREE.Scene();
  }
  getEngine() {
    return this.__getCollectionParent();
  }
  getEntity(t) {
    return this._entities.get(PioneerPublicApi.Entity, t);
  }
  getEntityAt(t) {
    return this._entities.getAt(t);
  }
  getNumEntities() {
    return this._entities.getSize();
  }
  addEntity(t) {
    return this._entities.add(PioneerPublicApi.Entity, t);
  }
  removeEntity(t) {
    this._entities.remove(t);
  }
  moveEntity(t, e) {
    let i;
    this._entities.move(t, e._entities);
    i = "string" == typeof t ? e._entities.get(PioneerPublicApi.Entity, t) : t;
    for (let t = 0, s = i.getNumControllers(); t < s; t++) {
      const s = i.getControllerAt(t);
      this._controllerDependencyGraph.removeItem(s);
      e._controllerDependencyGraph.addItem(s);
    }
    for (let t = 0;; t++) {
      const e = i.getComponent(PioneerPublicApi.LightSourceComponent, t);
      if (null === e || "loaded" !== e.getLoadState().state) break;
      for (let t = 0, s = this._lightSources.length; t < s; t++) {
        const s = this._lightSources[t];
        if (s.getEntityName() === i.getName() && s.getComponentNameOrClassIndex() === e.getClassIndex()) {
          this.__removeLightSource(i.getName(), e.getClassIndex());
          this.__addLightSource(i.getName(), e.getClassIndex());
          break;
        }
      }
    }
  }
  get(t, e, i = 0) {
    const s = this._entities.getAny(t);
    return void 0 === e || null === s ? s : s.get(e, i);
  }
  getControllerDependencyGraph() {
    return this._controllerDependencyGraph;
  }
  getAmbientLightColor() {
    return this._ambientLightColor;
  }
  setAmbientLightColor(t) {
    this._ambientLightColor.copy(t);
  }
  __addLightSource(t, e) {
    for (let i = 0, s = this._lightSources.length; i < s; i++) {
      const s = this._lightSources[i];
      if (s.getEntityName() === t && s.getComponentNameOrClassIndex() === e) throw new Error(`Light source on ${t} with type index ${e} already added.`);
    }
    const componentRef = new PioneerPublicApi.ComponentRef(this, PioneerPublicApi.LightSourceComponent, t, e);
    this._lightSources.push(componentRef);
  }
  __removeLightSource(t, e = 0) {
    for (let i = 0, s = this._lightSources.length; i < s; i++) {
      const s = this._lightSources[i];
      if (s.getEntityName() === t && s.getComponentNameOrClassIndex() === e) return void this._lightSources.splice(i, 1);
    }
    throw new Error(`Light source on ${t} with type index ${e} not found.`);
  }
  getLightSourceAt(t) {
    return this._lightSources[t]?.get() ?? null;
  }
  getNumLightSources() {
    return this._lightSources.length;
  }
  async getLoadedPromise(t, e = false, i = Number.POSITIVE_INFINITY) {
    const n = [];
    if (t) for (const e of t) {
      const t = this._entities.get(PioneerPublicApi.Entity, e);
      if (!t) throw new Error(`Entity "${e}" not added yet. Make sure it is in the scene.`);
      n.push(t);
    } else for (let t = 0, e = this._entities.getSize(); t < e; t++) n.push(this._entities.getAt(t));
    const o = [];
    for (let t = 0, s = n.length; t < s; t++) {
      const s = n[t];
      o.push(s.getLoadedPromise(e, i).catch(t => {
        if (t instanceof Error) throw new Error(`${s.getName()} - ${t.message}`);
      }));
    }
    const r = await Promise.allSettled(o);
    if (!r.every(t => "fulfilled" === t.status)) throw new Error(r.filter(t => "rejected" === t.status).map(t => t.reason instanceof Error ? t.reason.message : "").filter(t => "" !== t).reduce((t, e) => `${t}\n${e}`, ""));
  }
  async waitTillEntitiesInPlace(t, e, i = Number.POSITIVE_INFINITY) {
    const n = [];
    if (t) for (const e of t) {
      const t = this._entities.get(PioneerPublicApi.Entity, e);
      if (!t) throw new Error(`Entity "${e}" not added yet. Make sure it is in the scene.`);
      n.push(t);
    } else for (let t = 0, e = this._entities.getSize(); t < e; t++) n.push(this._entities.getAt(t));
    const o = n.map(async t => t.waitTillInPlace(e, i).catch(() => {
      throw new Error(t.getName());
    }));
    const r = (await Promise.allSettled(o)).filter(t => "rejected" === t.status).map(t => t.reason instanceof Error ? t.reason.message : "");
    if (r.length > 0) throw new Error(`Timed out (${i} seconds) while waiting for entities to be in place. The remaining entities were [${r.join(",")}].`);
  }
  __destroy() {
    super.__destroy();
    this._entities.__destroy();
  }
  getThreeJsScene() {
    return this._threeJsScene;
  }
  __update() {
    const t = this.getEngine().getTime();
    for (let e = this._entities.getSize() - 1; e >= 0; e--) {
      const i = this._entities.getAt(e);
      i.__updateLastState();
      i.__updateParent(t);
      i.__updateIsInCoverages(t);
    }
    this._controllerDependencyGraph.update();
  }
  __updateVisuals() {
    for (let t = this._entities.getSize() - 1; t >= 0; t--) {
      const e = this._entities.getAt(t);
      e.isInPositionCoverage() && e.isEnabled() && e.__updateVisuals();
    }
  }
  __removeCameraDependents(t) {
    for (let e = this._entities.getSize() - 1; e >= 0; e--) this._entities.getAt(e).__removeCameraDependents(t);
  }
  static _updateController(t) {
    t.getEntity().isEnabled() && t.getCoverage().contains(t.getEntity().getScene().getEngine().getTime()) && t.isEnabled() && t.__update();
  }
  static _compareControllers(t, e) {
    if (t === e) return false;
    if (!(t.getEntity().isEnabled() && e.getEntity().isEnabled() && t.isEnabled() && e.isEnabled())) return false;
    if (!t.getCoverage().intersects(e.getCoverage())) return false;
    if (t.getEntity() === e.getEntity()) {
      const i = t.getEntity();
      for (let s = 0, n = i.getNumControllers(); s < n; s++) {
        const n = i.getControllerAt(s);
        if (e === n) return true;
        if (t === n) break;
      }
    }
    if (t.getEntity().getParent() === e.getEntity()) {
      if (t.hasModifiedState("position") && e.hasModifiedState("position") || t.hasModifiedState("velocity") && e.hasModifiedState("velocity")) return true;
      for (const i of e.__getModifiedStates()) if (t.hasDependentState("parent", i)) return true;
    }
    for (const i of e.__getModifiedStates()) if (t.hasDependentState(e.getEntity().getName(), i)) return true;
    return false;
  }
  _entities;
  _controllerDependencyGraph;
  _ambientLightColor;
  _lightSources;
  _threeJsScene;
}
export { Scene };
