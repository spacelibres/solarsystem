/** @eyes-analysis
 * 文件职责：所有渲染组件的资源状态机、相机投影半径、可见性和 Three.js 对象所有权基类。
 * 依据：import ../pioneer/public-api.js；BaseComponent extends PioneerPublicApi.EntityItem @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:237823-244622.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：所有渲染组件的资源状态机、相机投影半径、可见性和 Three.js 对象所有权基类。
 * 继承：PioneerPublicApi.EntityItem；导出：BaseComponent。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class BaseComponent extends PioneerPublicApi.EntityItem {
  /** @eyes-analysis
   * 【结构证据】写入 `_excludedCameras`、`_forceLoaded`、`_greatestPixelSpaceRadius`、`_isGroundComponent`、`_loadState`、`_pixelSpaceRadiusPerCamera`、`_radius`、`_renderingEnabled`；调用 `new PioneerPublicApi.FastMap`、`new PioneerPublicApi.VisibleInterval`、`new Set`、`super`。
   * 状态写入：_excludedCameras、_forceLoaded、_greatestPixelSpaceRadius、_isGroundComponent、_loadState、_pixelSpaceRadiusPerCamera、_radius、_renderingEnabled等；完整记录见索引。
   * 调用线索：new PioneerPublicApi.FastMap、new PioneerPublicApi.VisibleInterval、new Set、super。
   */
  constructor(t, e) {
    super(t, e);
    this._radius = .5;
    this._pixelSpaceRadiusPerCamera = new PioneerPublicApi.FastMap();
    this._greatestPixelSpaceRadius = 0;
    this._isGroundComponent = false;
    this._loadState = {
      state: "unloaded"
    };
    this._forceLoaded = false;
    this._resourcesLoadedCallback = null;
    this._resourcesUnloadedCallback = null;
    this._renderingEnabled = true;
    this._excludedCameras = new Set();
    this._visibleInterval = new PioneerPublicApi.VisibleInterval(0, Number.POSITIVE_INFINITY, "normal-radius");
    this._threeJsObjects = [];
    this._threeJsMaterials = [];
    this._usesEntityOrientation = false;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `super.__destroy`、`this._unloadResources`。
   * 调用线索：super.__destroy、this._unloadResources。
   */
  __destroy() {
    "loaded" === this._loadState.state && this._unloadResources();
    super.__destroy();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `super.setEnabled`、`this.__updateLoadState`。
   * 调用线索：super.setEnabled、this.__updateLoadState。
   */
  setEnabled(t) {
    super.setEnabled(t);
    this.__updateLoadState();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._radius`。
   */
  getRadius() {
    return this._radius;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_radius`。
   * 状态写入：_radius。
   */
  __setRadius(radius) {
    this._radius = radius;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._pixelSpaceRadiusPerCamera.get(t)`；调用 `this._pixelSpaceRadiusPerCamera.get`。
   * 调用线索：this._pixelSpaceRadiusPerCamera.get。
   */
  getPixelSpaceRadiusInCamera(t) {
    return this._pixelSpaceRadiusPerCamera.get(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._greatestPixelSpaceRadius`。
   */
  getGreatestPixelSpaceRadius() {
    return this._greatestPixelSpaceRadius;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._isGroundComponent`。
   */
  isGroundComponent() {
    return this._isGroundComponent;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_isGroundComponent`；调用 `this.getEntity`、`this.getEntity().__updateGroundComponent`。
   * 状态写入：_isGroundComponent。
   * 调用线索：this.getEntity、this.getEntity().__updateGroundComponent。
   */
  setIsGroundComponent(isGroundComponent) {
    this._isGroundComponent !== isGroundComponent && (this._isGroundComponent = isGroundComponent, this.getEntity().__updateGroundComponent());
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._threeJsObjects`。
   */
  getThreeJsObjects() {
    return this._threeJsObjects;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._threeJsMaterials`。
   */
  getThreeJsMaterials() {
    return this._threeJsMaterials;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `i` 或 `null`。
   */
  getThreeJsObjectByName(t) {
    for (let e = 0; e < this._threeJsObjects.length; e++) {
      const i = this._threeJsObjects[e];
      if (i.name === t) return i;
    }
    return null;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.Vector3.threeJsPool.get`、`PioneerPublicApi.Vector3.threeJsPool.release`、`i.applyMatrix4`、`i.set`、`t.copyFromThreeJs`。
   * 调用线索：PioneerPublicApi.Vector3.threeJsPool.get、PioneerPublicApi.Vector3.threeJsPool.release、i.applyMatrix4、i.set、t.copyFromThreeJs。
   */
  getThreeJsPositionInObject(t, e) {
    const i = PioneerPublicApi.Vector3.threeJsPool.get();
    i.set(0, 0, 0);
    let n = e;
    for (; null !== n && n !== this._threeJsObjects[0];) {
      i.applyMatrix4(n.matrix);
      n = n.parent;
    }
    t.copyFromThreeJs(i);
    PioneerPublicApi.Vector3.threeJsPool.release(i);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.Quaternion.threeJsPool.get`、`PioneerPublicApi.Quaternion.threeJsPool.release`、`PioneerPublicApi.Vector3.threeJsPool.get`、`PioneerPublicApi.Vector3.threeJsPool.release`、`i.applyMatrix4`、`i.set`。
   * 调用线索：PioneerPublicApi.Quaternion.threeJsPool.get、PioneerPublicApi.Quaternion.threeJsPool.release、PioneerPublicApi.Vector3.threeJsPool.get、PioneerPublicApi.Vector3.threeJsPool.release、i.applyMatrix4等。
   */
  getThreeJsOrientationInObject(t, e) {
    const i = PioneerPublicApi.Vector3.threeJsPool.get();
    const n = PioneerPublicApi.Quaternion.threeJsPool.get();
    i.set(0, 0, 0);
    n.set(0, 0, 0, 1);
    let o = e;
    for (; null !== o && o !== this._threeJsObjects[0];) {
      i.applyMatrix4(o.matrix);
      n.multiplyQuaternions(o.quaternion, n);
      o = o.parent;
    }
    t.copyFromThreeJs(n);
    PioneerPublicApi.Quaternion.threeJsPool.release(n);
    PioneerPublicApi.Vector3.threeJsPool.release(i);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setUniformNumber、this.getThreeJsMaterials。
   */
  setAlphaFadeMultiplier(t) {
    if (this.getThreeJsMaterials().length > 0) for (let e = 0; e < this.getThreeJsMaterials().length; e++) {
      const i = this.getThreeJsMaterials()[e];
      PioneerPublicApi.ThreeJsHelper.setUniformNumber(i, "alphaMultiplier", t);
    }
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._loadState`。
   */
  getLoadState() {
    return this._loadState;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._forceLoaded`。
   */
  isForceLoaded() {
    return this._forceLoaded;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_forceLoaded`；调用 `this._loadResources`。
   * 状态写入：_forceLoaded。
   * 调用线索：this._loadResources。
   */
  setForceLoaded(forceLoaded) {
    this._forceLoaded = forceLoaded;
    this._forceLoaded && "unloaded" === this._loadState.state && this._loadResources();
  }
  /** @eyes-analysis
   * 实体和组件启用、覆盖有效且投影半径 >0.5px 时开始加载；半径 <0.25px 才卸载，构成迟滞，forceLoaded 可绕过尺寸/覆盖约束。
   * 调用线索：t.isEnabled、t.isInOrientationCoverage、t.isInPositionCoverage、this._loadResources、this._unloadResources等。
   */
  __updateLoadState() {
    const t = this.getEntity();
    const e = t.isEnabled() && this.isEnabled();
    const i = t.isInPositionCoverage() && (t.isInOrientationCoverage() || !this._usesEntityOrientation);
    e && (this._forceLoaded || i && this._greatestPixelSpaceRadius > .5) && "unloaded" === this._loadState.state ? this._loadResources() : e && (this._forceLoaded || i && !(this._greatestPixelSpaceRadius < .25)) || "loaded" !== this._loadState.state || this._unloadResources();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_loadState`；调用 `this._unloadResources`。
   * 状态写入：_loadState。
   * 调用线索：this._unloadResources。
   */
  resetResources() {
    "loading" === this._loadState.state ? this._loadState = {
      state: "unloaded"
    } : "loaded" === this._loadState.state && this._unloadResources();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_resourcesLoadedCallback`。
   * 状态写入：_resourcesLoadedCallback。
   */
  setResourcesLoadedCallback(resourcesLoadedCallback) {
    this._resourcesLoadedCallback = resourcesLoadedCallback;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_resourcesUnloadedCallback`。
   * 状态写入：_resourcesUnloadedCallback。
   */
  setResourcesUnloadedCallback(resourcesUnloadedCallback) {
    this._resourcesUnloadedCallback = resourcesUnloadedCallback;
  }
  /** @eyes-analysis
   * 置 loading，等待子类 __loadResources；若期间 reset 为 unloaded，则完成后立刻卸载；否则置 loaded 并回调。异常写 failed/error。
   * 状态写入：_loadState.error、_loadState.state。
   * 调用线索：console.warn、this.__loadResources、this.__loadResources().then、this.__loadResources().then(()=>{"unloaded"!==this._loadState.state?(this._loadState.state="loaded",null!==this._resourcesLoadedCallback&&this._resourcesLoadedCallback()):this._unloadResources();}).catch、this._resourcesLoadedCallback等。
   */
  _loadResources() {
    this._loadState.state = "loading";
    this.__loadResources().then(() => {
      "unloaded" !== this._loadState.state ? (this._loadState.state = "loaded", null !== this._resourcesLoadedCallback && this._resourcesLoadedCallback()) : this._unloadResources();
    }).catch(t => {
      t instanceof Error && (console.warn(`While loading ${this}:`, t), this._loadState.state = "failed", this._loadState.error = `While loading ${this}: ${t.message}`);
    });
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_loadState.state`、`_threeJsMaterials`、`_threeJsObjects`；调用 `this.__unloadResources`、`this._resourcesUnloadedCallback`。
   * 状态写入：_loadState.state、_threeJsMaterials、_threeJsObjects。
   * 调用线索：this.__unloadResources、this._resourcesUnloadedCallback。
   */
  _unloadResources() {
    this.__unloadResources();
    this._loadState.state = "unloaded";
    this._threeJsObjects = [];
    this._threeJsMaterials = [];
    null !== this._resourcesUnloadedCallback && this._resourcesUnloadedCallback();
  }
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  async __loadResources() {}
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  __unloadResources() {}
  /** @eyes-analysis
   * 先等待下一帧再轮询；force=false 时 unloaded 也算满足，不能把此 Promise 的成功解释为 GPU 资源必已加载。
   * 调用线索：0,PioneerPublicApi.waitUntil、this.getEntity、this.getEntity().getScene、this.getEntity().getScene().getEngine、this.getEntity().getScene().getEngine().waitUntilNextFrame。
   */
  async getLoadedPromise(t = false, e = Number.POSITIVE_INFINITY) {
    await this.getEntity().getScene().getEngine().waitUntilNextFrame();
    await (0, PioneerPublicApi.waitUntil)(() => !t && "unloaded" === this._loadState.state || "loaded" === this._loadState.state, .25, e);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `e.getPixelSpaceRadiusFromNormalSpaceRadius`、`t.getNormalSpaceRadiusFromRadius`、`t.getViewport`、`this.__updateCameraVariables`、`this._pixelSpaceRadiusPerCamera.set`、`this.getEntity`。
   * 调用线索：e.getPixelSpaceRadiusFromNormalSpaceRadius、t.getNormalSpaceRadiusFromRadius、t.getViewport、this.__updateCameraVariables、this._pixelSpaceRadiusPerCamera.set等。
   */
  __updateCameraVariablesBase(t) {
    const e = t.getViewport();
    if (!e) return;
    const i = t.getNormalSpaceRadiusFromRadius(this._radius, this.getEntity().getCameraSpacePosition(t).magnitude());
    const s = e.getPixelSpaceRadiusFromNormalSpaceRadius(i);
    this._pixelSpaceRadiusPerCamera.set(t, s);
    this.__updateCameraVariables(t);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_greatestPixelSpaceRadius`；调用 `this.__update`、`this.__updateLoadState`、`this._pixelSpaceRadiusPerCamera.getAt`、`this._pixelSpaceRadiusPerCamera.getSize`。
   * 状态写入：_greatestPixelSpaceRadius。
   * 调用线索：this.__update、this.__updateLoadState、this._pixelSpaceRadiusPerCamera.getAt、this._pixelSpaceRadiusPerCamera.getSize。
   */
  __updateBase() {
    this._greatestPixelSpaceRadius = 0;
    for (let t = 0, e = this._pixelSpaceRadiusPerCamera.getSize(); t < e; t++) {
      const greatestPixelSpaceRadius = this._pixelSpaceRadiusPerCamera.getAt(t).value;
      this._greatestPixelSpaceRadius < greatestPixelSpaceRadius && (this._greatestPixelSpaceRadius = greatestPixelSpaceRadius);
    }
    this.__updateLoadState();
    this.__update();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.getAutoMidDistance`、`t.getAutoNearDistance`、`t.getInvertDepth`、`this.__prepareForRender`、`this.__setVisible`、`this._excludedCameras.has`。
   * 调用线索：t.getAutoMidDistance、t.getAutoNearDistance、t.getInvertDepth、this.__prepareForRender、this.__setVisible等。
   */
  __prepareForRenderBase(t) {
    if ("loaded" === this._loadState.state) if (this._renderingEnabled && !this._excludedCameras.has(t)) {
      this.__setVisible(true);
      this.__prepareForRender(t);
      for (let e = 0; e < this._threeJsMaterials.length; e++) {
        const i = this._threeJsMaterials[e].uniforms;
        i.invertDepth && i.nearDistance && i.midDistance && (i.invertDepth.value = t.getInvertDepth(), i.nearDistance.value = t.getAutoNearDistance(), i.midDistance.value = t.getAutoMidDistance());
      }
      for (let t = 0; t < this._threeJsObjects.length; t++) this._threeJsObjects[t].updateMatrix();
    } else this.__setVisible(false);
  }
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  __updateCameraVariables(t) {}
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  __prepareForRender(t) {}
  /** @eyes-analysis
   * 【结构证据】返回 `this._usesEntityOrientation`。
   */
  getUsesEntityOrientation() {
    return this._usesEntityOrientation;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_usesEntityOrientation`；调用 `this.__updateLoadState`。
   * 状态写入：_usesEntityOrientation。
   * 调用线索：this.__updateLoadState。
   */
  __setUsesEntityOrientation(usesEntityOrientation) {
    this._usesEntityOrientation = usesEntityOrientation;
    this.__updateLoadState();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `"loaded"===this._loadState.state&&this._renderingEnabled&&(void 0===t||!this._excludedCameras.has(t))`；调用 `this._excludedCameras.has`。
   * 调用线索：this._excludedCameras.has。
   */
  isRendering(t) {
    return "loaded" === this._loadState.state && this._renderingEnabled && (void 0 === t || !this._excludedCameras.has(t));
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._renderingEnabled`。
   */
  getRenderingEnabled() {
    return this._renderingEnabled;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_renderingEnabled`；调用 `this.__clearCameraDependentsBase`。
   * 状态写入：_renderingEnabled。
   * 调用线索：this.__clearCameraDependentsBase。
   */
  setRenderingEnabled(renderingEnabled) {
    this._renderingEnabled = renderingEnabled;
    this._renderingEnabled || this.__clearCameraDependentsBase();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._excludedCameras.has(t)`；调用 `this._excludedCameras.has`。
   * 调用线索：this._excludedCameras.has。
   */
  isExcludedFromCamera(t) {
    return this._excludedCameras.has(t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.__removeCameraDependentsBase`、`this._excludedCameras.add`、`this._excludedCameras.delete`、`this._excludedCameras.has`。
   * 调用线索：this.__removeCameraDependentsBase、this._excludedCameras.add、this._excludedCameras.delete、this._excludedCameras.has。
   */
  setExcludedFromCamera(t, e) {
    !e && this._excludedCameras.has(t) ? this._excludedCameras.delete(t) : e && !this._excludedCameras.has(t) && (this._excludedCameras.add(t), this.__removeCameraDependentsBase(t));
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._visibleInterval`。
   */
  getVisibleInterval() {
    return this._visibleInterval;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._visibleInterval.copy`。
   * 调用线索：this._visibleInterval.copy。
   */
  setVisibleInterval(t) {
    this._visibleInterval.copy(t);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_threeJsObjects[e].visible`。
   * 状态写入：_threeJsObjects[e].visible。
   */
  __setVisible(t) {
    for (let e = 0; e < this._threeJsObjects.length; e++) this._threeJsObjects[e].visible = t;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.__removeCameraDependents`、`this._pixelSpaceRadiusPerCamera.delete`。
   * 调用线索：this.__removeCameraDependents、this._pixelSpaceRadiusPerCamera.delete。
   */
  __removeCameraDependentsBase(t) {
    this._pixelSpaceRadiusPerCamera.delete(t);
    this.__removeCameraDependents(t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.__clearCameraDependents`、`this._pixelSpaceRadiusPerCamera.clear`。
   * 调用线索：this.__clearCameraDependents、this._pixelSpaceRadiusPerCamera.clear。
   */
  __clearCameraDependentsBase() {
    this._pixelSpaceRadiusPerCamera.clear();
    this.__clearCameraDependents();
  }
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  __removeCameraDependents(t) {}
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  __clearCameraDependents() {}
  /** @eyes-analysis
   * 【结构证据】本访问器没有 AST 可见的 this 字段直接赋值；调用 `this.getEntity`、`this.getEntity().getComponentAt`、`this.getEntity().getName`、`this.getEntity().getNumComponents`。
   * 调用线索：this.getEntity、this.getEntity().getComponentAt、this.getEntity().getName、this.getEntity().getNumComponents。
   */
  toString() {
    let t = 0;
    for (let e = 0, i = this.getEntity().getNumComponents(); e < i; e++) {
      const i = this.getEntity().getComponentAt(e);
      if (this === i) break;
      this.constructor === i.constructor && (t += 1);
    }
    return `${this.getEntity().getName()}.${this.constructor.name}.${t}`;
  }
  _radius;
  _pixelSpaceRadiusPerCamera;
  _greatestPixelSpaceRadius;
  _isGroundComponent;
  _loadState;
  _forceLoaded;
  _resourcesLoadedCallback;
  _resourcesUnloadedCallback;
  _renderingEnabled;
  _excludedCameras;
  _visibleInterval;
  _threeJsObjects;
  _threeJsMaterials;
  _usesEntityOrientation;
}
export { BaseComponent };
