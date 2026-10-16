// Recovered from app.js:237823-244622.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class BaseComponent extends PioneerPublicApi.EntityItem {
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
  __destroy() {
    "loaded" === this._loadState.state && this._unloadResources();
    super.__destroy();
  }
  setEnabled(t) {
    super.setEnabled(t);
    this.__updateLoadState();
  }
  getRadius() {
    return this._radius;
  }
  __setRadius(radius) {
    this._radius = radius;
  }
  getPixelSpaceRadiusInCamera(t) {
    return this._pixelSpaceRadiusPerCamera.get(t);
  }
  getGreatestPixelSpaceRadius() {
    return this._greatestPixelSpaceRadius;
  }
  isGroundComponent() {
    return this._isGroundComponent;
  }
  setIsGroundComponent(isGroundComponent) {
    this._isGroundComponent !== isGroundComponent && (this._isGroundComponent = isGroundComponent, this.getEntity().__updateGroundComponent());
  }
  getThreeJsObjects() {
    return this._threeJsObjects;
  }
  getThreeJsMaterials() {
    return this._threeJsMaterials;
  }
  getThreeJsObjectByName(t) {
    for (let e = 0; e < this._threeJsObjects.length; e++) {
      const i = this._threeJsObjects[e];
      if (i.name === t) return i;
    }
    return null;
  }
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
  setAlphaFadeMultiplier(t) {
    if (this.getThreeJsMaterials().length > 0) for (let e = 0; e < this.getThreeJsMaterials().length; e++) {
      const i = this.getThreeJsMaterials()[e];
      PioneerPublicApi.ThreeJsHelper.setUniformNumber(i, "alphaMultiplier", t);
    }
  }
  getLoadState() {
    return this._loadState;
  }
  isForceLoaded() {
    return this._forceLoaded;
  }
  setForceLoaded(forceLoaded) {
    this._forceLoaded = forceLoaded;
    this._forceLoaded && "unloaded" === this._loadState.state && this._loadResources();
  }
  __updateLoadState() {
    const t = this.getEntity();
    const e = t.isEnabled() && this.isEnabled();
    const i = t.isInPositionCoverage() && (t.isInOrientationCoverage() || !this._usesEntityOrientation);
    e && (this._forceLoaded || i && this._greatestPixelSpaceRadius > .5) && "unloaded" === this._loadState.state ? this._loadResources() : e && (this._forceLoaded || i && !(this._greatestPixelSpaceRadius < .25)) || "loaded" !== this._loadState.state || this._unloadResources();
  }
  resetResources() {
    "loading" === this._loadState.state ? this._loadState = {
      state: "unloaded"
    } : "loaded" === this._loadState.state && this._unloadResources();
  }
  setResourcesLoadedCallback(resourcesLoadedCallback) {
    this._resourcesLoadedCallback = resourcesLoadedCallback;
  }
  setResourcesUnloadedCallback(resourcesUnloadedCallback) {
    this._resourcesUnloadedCallback = resourcesUnloadedCallback;
  }
  _loadResources() {
    this._loadState.state = "loading";
    this.__loadResources().then(() => {
      "unloaded" !== this._loadState.state ? (this._loadState.state = "loaded", null !== this._resourcesLoadedCallback && this._resourcesLoadedCallback()) : this._unloadResources();
    }).catch(t => {
      t instanceof Error && (console.warn(`While loading ${this}:`, t), this._loadState.state = "failed", this._loadState.error = `While loading ${this}: ${t.message}`);
    });
  }
  _unloadResources() {
    this.__unloadResources();
    this._loadState.state = "unloaded";
    this._threeJsObjects = [];
    this._threeJsMaterials = [];
    null !== this._resourcesUnloadedCallback && this._resourcesUnloadedCallback();
  }
  async __loadResources() {}
  __unloadResources() {}
  async getLoadedPromise(t = false, e = Number.POSITIVE_INFINITY) {
    await this.getEntity().getScene().getEngine().waitUntilNextFrame();
    await (0, PioneerPublicApi.waitUntil)(() => !t && "unloaded" === this._loadState.state || "loaded" === this._loadState.state, .25, e);
  }
  __updateCameraVariablesBase(t) {
    const e = t.getViewport();
    if (!e) return;
    const i = t.getNormalSpaceRadiusFromRadius(this._radius, this.getEntity().getCameraSpacePosition(t).magnitude());
    const s = e.getPixelSpaceRadiusFromNormalSpaceRadius(i);
    this._pixelSpaceRadiusPerCamera.set(t, s);
    this.__updateCameraVariables(t);
  }
  __updateBase() {
    this._greatestPixelSpaceRadius = 0;
    for (let t = 0, e = this._pixelSpaceRadiusPerCamera.getSize(); t < e; t++) {
      const greatestPixelSpaceRadius = this._pixelSpaceRadiusPerCamera.getAt(t).value;
      this._greatestPixelSpaceRadius < greatestPixelSpaceRadius && (this._greatestPixelSpaceRadius = greatestPixelSpaceRadius);
    }
    this.__updateLoadState();
    this.__update();
  }
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
  __updateCameraVariables(t) {}
  __prepareForRender(t) {}
  getUsesEntityOrientation() {
    return this._usesEntityOrientation;
  }
  __setUsesEntityOrientation(usesEntityOrientation) {
    this._usesEntityOrientation = usesEntityOrientation;
    this.__updateLoadState();
  }
  isRendering(t) {
    return "loaded" === this._loadState.state && this._renderingEnabled && (void 0 === t || !this._excludedCameras.has(t));
  }
  getRenderingEnabled() {
    return this._renderingEnabled;
  }
  setRenderingEnabled(renderingEnabled) {
    this._renderingEnabled = renderingEnabled;
    this._renderingEnabled || this.__clearCameraDependentsBase();
  }
  isExcludedFromCamera(t) {
    return this._excludedCameras.has(t);
  }
  setExcludedFromCamera(t, e) {
    !e && this._excludedCameras.has(t) ? this._excludedCameras.delete(t) : e && !this._excludedCameras.has(t) && (this._excludedCameras.add(t), this.__removeCameraDependentsBase(t));
  }
  getVisibleInterval() {
    return this._visibleInterval;
  }
  setVisibleInterval(t) {
    this._visibleInterval.copy(t);
  }
  __setVisible(t) {
    for (let e = 0; e < this._threeJsObjects.length; e++) this._threeJsObjects[e].visible = t;
  }
  __removeCameraDependentsBase(t) {
    this._pixelSpaceRadiusPerCamera.delete(t);
    this.__removeCameraDependents(t);
  }
  __clearCameraDependentsBase() {
    this._pixelSpaceRadiusPerCamera.clear();
    this.__clearCameraDependents();
  }
  __removeCameraDependents(t) {}
  __clearCameraDependents() {}
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
