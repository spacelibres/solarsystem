/** @eyes-analysis
 * 文件职责：拥有实体和 Three.js 场景，维护光源和控制器依赖图，分离状态更新与视觉更新。
 * 依据：import ../pioneer/public-api.js；Scene extends PioneerPublicApi.CollectionItem @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:225926-231270.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：拥有实体和 Three.js 场景，维护光源和控制器依赖图，分离状态更新与视觉更新。
 * 继承：PioneerPublicApi.CollectionItem；导出：Scene。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Scene extends PioneerPublicApi.CollectionItem {
  /** @eyes-analysis
   * 【结构证据】写入 `_ambientLightColor`、`_controllerDependencyGraph`、`_entities`、`_lightSources`、`_threeJsScene`；调用 `new PioneerPublicApi.Collection`、`new PioneerPublicApi.Color`、`new PioneerPublicApi.DependencyGraph`、`new PioneerPublicApi.THREE.Scene`、`super`。
   * 状态写入：_ambientLightColor、_controllerDependencyGraph、_entities、_lightSources、_threeJsScene。
   * 调用线索：new PioneerPublicApi.Collection、new PioneerPublicApi.Color、new PioneerPublicApi.DependencyGraph、new PioneerPublicApi.THREE.Scene、super。
   */
  constructor(t, e) {
    super(t, e);
    this._entities = new PioneerPublicApi.Collection(this);
    this._controllerDependencyGraph = new PioneerPublicApi.DependencyGraph(Scene._updateController, Scene._compareControllers);
    this._ambientLightColor = new PioneerPublicApi.Color(.02, .02, .02);
    this._lightSources = [];
    this._threeJsScene = new PioneerPublicApi.THREE.Scene();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this.__getCollectionParent()`；调用 `this.__getCollectionParent`。
   * 调用线索：this.__getCollectionParent。
   */
  getEngine() {
    return this.__getCollectionParent();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._entities.get(PioneerPublicApi.Entity,t)`；调用 `this._entities.get`。
   * 调用线索：this._entities.get。
   */
  getEntity(t) {
    return this._entities.get(PioneerPublicApi.Entity, t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._entities.getAt(t)`；调用 `this._entities.getAt`。
   * 调用线索：this._entities.getAt。
   */
  getEntityAt(t) {
    return this._entities.getAt(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._entities.getSize()`；调用 `this._entities.getSize`。
   * 调用线索：this._entities.getSize。
   */
  getNumEntities() {
    return this._entities.getSize();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._entities.add(PioneerPublicApi.Entity,t)`；调用 `this._entities.add`。
   * 调用线索：this._entities.add。
   */
  addEntity(t) {
    return this._entities.add(PioneerPublicApi.Entity, t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._entities.remove`。
   * 调用线索：this._entities.remove。
   */
  removeEntity(t) {
    this._entities.remove(t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `e._controllerDependencyGraph.addItem`、`e._entities.get`、`e.getClassIndex`、`e.getLoadState`、`i.getComponent`、`i.getControllerAt`。
   * 调用线索：e._controllerDependencyGraph.addItem、e._entities.get、e.getClassIndex、e.getLoadState、i.getComponent等。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `void 0===e||null===s?s:s.get(e,i)`；调用 `s.get`、`this._entities.getAny`。
   * 调用线索：s.get、this._entities.getAny。
   */
  get(t, e, i = 0) {
    const s = this._entities.getAny(t);
    return void 0 === e || null === s ? s : s.get(e, i);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._controllerDependencyGraph`。
   */
  getControllerDependencyGraph() {
    return this._controllerDependencyGraph;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._ambientLightColor`。
   */
  getAmbientLightColor() {
    return this._ambientLightColor;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._ambientLightColor.copy`。
   * 调用线索：this._ambientLightColor.copy。
   */
  setAmbientLightColor(t) {
    this._ambientLightColor.copy(t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `new Error`、`new PioneerPublicApi.ComponentRef`、`s.getComponentNameOrClassIndex`、`s.getEntityName`、`this._lightSources.push`；含显式错误分支。
   * 调用线索：new Error、new PioneerPublicApi.ComponentRef、s.getComponentNameOrClassIndex、s.getEntityName、this._lightSources.push。
   */
  __addLightSource(t, e) {
    for (let i = 0, s = this._lightSources.length; i < s; i++) {
      const s = this._lightSources[i];
      if (s.getEntityName() === t && s.getComponentNameOrClassIndex() === e) throw new Error(`Light source on ${t} with type index ${e} already added.`);
    }
    const componentRef = new PioneerPublicApi.ComponentRef(this, PioneerPublicApi.LightSourceComponent, t, e);
    this._lightSources.push(componentRef);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void this._lightSources.splice(i,1)`；调用 `new Error`、`s.getComponentNameOrClassIndex`、`s.getEntityName`、`this._lightSources.splice`；含显式错误分支。
   * 调用线索：new Error、s.getComponentNameOrClassIndex、s.getEntityName、this._lightSources.splice。
   */
  __removeLightSource(t, e = 0) {
    for (let i = 0, s = this._lightSources.length; i < s; i++) {
      const s = this._lightSources[i];
      if (s.getEntityName() === t && s.getComponentNameOrClassIndex() === e) return void this._lightSources.splice(i, 1);
    }
    throw new Error(`Light source on ${t} with type index ${e} not found.`);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._lightSources[t]?.get()??null`。
   * 调用线索：this._lightSources[t]?.get。
   */
  getLightSourceAt(t) {
    return this._lightSources[t]?.get() ?? null;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._lightSources.length`。
   */
  getNumLightSources() {
    return this._lightSources.length;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Promise.allSettled`、`n.push`、`new Error`、`o.push`、`r.every`、`r.filter`；含显式错误分支。
   * 调用线索：Promise.allSettled、n.push、new Error、o.push、r.every等。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `(await Promise.allSettled(o)).filter`、`Promise.allSettled`、`n.map`、`n.push`、`new Error`、`r.join`；含显式错误分支。
   * 调用线索：(await Promise.allSettled(o)).filter、(await Promise.allSettled(o)).filter(t=>"rejected"===t.status).map、Promise.allSettled、n.map、n.push等。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `super.__destroy`、`this._entities.__destroy`。
   * 调用线索：super.__destroy、this._entities.__destroy。
   */
  __destroy() {
    super.__destroy();
    this._entities.__destroy();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._threeJsScene`。
   */
  getThreeJsScene() {
    return this._threeJsScene;
  }
  /** @eyes-analysis
   * 先保存每个实体上一帧状态，再按当前仿真时间切换父级和覆盖标记，最后更新控制器依赖图，保证状态依赖先于视觉。
   * 调用线索：i.__updateIsInCoverages、i.__updateLastState、i.__updateParent、this._controllerDependencyGraph.update、this._entities.getAt等。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `e.__updateVisuals`、`e.isEnabled`、`e.isInPositionCoverage`、`this._entities.getAt`、`this._entities.getSize`。
   * 调用线索：e.__updateVisuals、e.isEnabled、e.isInPositionCoverage、this._entities.getAt、this._entities.getSize。
   */
  __updateVisuals() {
    for (let t = this._entities.getSize() - 1; t >= 0; t--) {
      const e = this._entities.getAt(t);
      e.isInPositionCoverage() && e.isEnabled() && e.__updateVisuals();
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._entities.getAt`、`this._entities.getAt(e).__removeCameraDependents`、`this._entities.getSize`。
   * 调用线索：this._entities.getAt、this._entities.getAt(e).__removeCameraDependents、this._entities.getSize。
   */
  __removeCameraDependents(t) {
    for (let e = this._entities.getSize() - 1; e >= 0; e--) this._entities.getAt(e).__removeCameraDependents(t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.__update`、`t.getCoverage`、`t.getCoverage().contains`、`t.getEntity`、`t.getEntity().getScene`、`t.getEntity().getScene().getEngine`。
   * 调用线索：t.__update、t.getCoverage、t.getCoverage().contains、t.getEntity、t.getEntity().getScene等。
   */
  static _updateController(t) {
    t.getEntity().isEnabled() && t.getCoverage().contains(t.getEntity().getScene().getEngine().getTime()) && t.isEnabled() && t.__update();
  }
  /** @eyes-analysis
   * 同实体以集合顺序排序；父实体位置/速度和显式 dependent-state 构成跨实体依赖；禁用或时间覆盖不相交的控制器不产生边。
   * 调用线索：e.__getModifiedStates、e.getCoverage、e.getEntity、e.getEntity().getName、e.getEntity().isEnabled等。
   */
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
