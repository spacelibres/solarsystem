// Recovered from app.js:237823-244622.
import * as PioneerPublicApi from "../pioneer/public-api.js";
// 渲染组件基类拥有加载状态与 Three.js 对象列表；派生类实现资源钩子，基类负责可见性、相机缓存与加载回调。
class BaseComponent extends PioneerPublicApi.EntityItem {
  constructor(componentName, entity) {
    super(componentName, entity);
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
  setEnabled(enabled) {
    super.setEnabled(enabled);
    this.__updateLoadState();
  }
  getRadius() {
    return this._radius;
  }
  __setRadius(radius) {
    this._radius = radius;
  }
  getPixelSpaceRadiusInCamera(camera) {
    return this._pixelSpaceRadiusPerCamera.get(camera);
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
  getThreeJsObjectByName(objectName) {
    for (let objectIndex = 0; objectIndex < this._threeJsObjects.length; objectIndex++) {
      const object = this._threeJsObjects[objectIndex];
      if (object.name === objectName) return object;
    }
    return null;
  }
  getThreeJsPositionInObject(output, object) {
    const localPosition = PioneerPublicApi.Vector3.threeJsPool.get();
    localPosition.set(0, 0, 0);
    let ancestor = object;
    for (; null !== ancestor && ancestor !== this._threeJsObjects[0];) {
      localPosition.applyMatrix4(ancestor.matrix);
      ancestor = ancestor.parent;
    }
    output.copyFromThreeJs(localPosition);
    PioneerPublicApi.Vector3.threeJsPool.release(localPosition);
  }
  getThreeJsOrientationInObject(output, object) {
    const localPosition = PioneerPublicApi.Vector3.threeJsPool.get();
    const localOrientation = PioneerPublicApi.Quaternion.threeJsPool.get();
    localPosition.set(0, 0, 0);
    localOrientation.set(0, 0, 0, 1);
    let ancestor = object;
    for (; null !== ancestor && ancestor !== this._threeJsObjects[0];) {
      localPosition.applyMatrix4(ancestor.matrix);
      localOrientation.multiplyQuaternions(ancestor.quaternion, localOrientation);
      ancestor = ancestor.parent;
    }
    output.copyFromThreeJs(localOrientation);
    PioneerPublicApi.Quaternion.threeJsPool.release(localOrientation);
    PioneerPublicApi.Vector3.threeJsPool.release(localPosition);
  }
  setAlphaFadeMultiplier(fadeMultiplier) {
    if (this.getThreeJsMaterials().length > 0) for (let materialIndex = 0; materialIndex < this.getThreeJsMaterials().length; materialIndex++) {
      const material = this.getThreeJsMaterials()[materialIndex];
      PioneerPublicApi.ThreeJsHelper.setUniformNumber(material, "alphaMultiplier", fadeMultiplier);
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
  // 使用 0.5 像素装载、0.25 像素卸载的滞回区间，减少边界抖动；forceLoaded 仍要求实体和组件启用。
  __updateLoadState() {
    const entity = this.getEntity();
    const enabled = entity.isEnabled() && this.isEnabled();
    const inCoverage = entity.isInPositionCoverage() && (entity.isInOrientationCoverage() || !this._usesEntityOrientation);
    enabled && (this._forceLoaded || inCoverage && this._greatestPixelSpaceRadius > .5) && "unloaded" === this._loadState.state ? this._loadResources() : enabled && (this._forceLoaded || inCoverage && !(this._greatestPixelSpaceRadius < .25)) || "loaded" !== this._loadState.state || this._unloadResources();
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
  // 异步期间 resetResources 可将状态换成 unloaded；结果到达后检查该状态，必要时立即走卸载钩子归还资源。
  _loadResources() {
    this._loadState.state = "loading";
    this.__loadResources().then(() => {
      "unloaded" !== this._loadState.state ? (this._loadState.state = "loaded", null !== this._resourcesLoadedCallback && this._resourcesLoadedCallback()) : this._unloadResources();
    }).catch(error => {
      error instanceof Error && (console.warn(`While loading ${this}:`, error), this._loadState.state = "failed", this._loadState.error = `While loading ${this}: ${error.message}`);
    });
  }
  // 派生类先清理实际资源，再清空基类对象列表并通知外部；回调观察到的是 unloaded 状态。
  _unloadResources() {
    this.__unloadResources();
    this._loadState.state = "unloaded";
    this._threeJsObjects = [];
    this._threeJsMaterials = [];
    null !== this._resourcesUnloadedCallback && this._resourcesUnloadedCallback();
  }
  async __loadResources() {}
  __unloadResources() {}
  // 先跨过一帧；forceLoaded=false 时 unloaded 也满足，不能据此断言 GPU 资源已建立。
  async getLoadedPromise(forceLoaded = false, timeout = Number.POSITIVE_INFINITY) {
    await this.getEntity().getScene().getEngine().waitUntilNextFrame();
    await (0, PioneerPublicApi.waitUntil)(() => !forceLoaded && "unloaded" === this._loadState.state || "loaded" === this._loadState.state, .25, timeout);
  }
  __updateCameraVariablesBase(camera) {
    const viewport = camera.getViewport();
    if (!viewport) return;
    const normalRadius = camera.getNormalSpaceRadiusFromRadius(this._radius, this.getEntity().getCameraSpacePosition(camera).magnitude());
    const pixelRadius = viewport.getPixelSpaceRadiusFromNormalSpaceRadius(normalRadius);
    this._pixelSpaceRadiusPerCamera.set(camera, pixelRadius);
    this.__updateCameraVariables(camera);
  }
  __updateBase() {
    this._greatestPixelSpaceRadius = 0;
    for (let cameraIndex = 0, cameraCount = this._pixelSpaceRadiusPerCamera.getSize(); cameraIndex < cameraCount; cameraIndex++) {
      const greatestPixelSpaceRadius = this._pixelSpaceRadiusPerCamera.getAt(cameraIndex).value;
      this._greatestPixelSpaceRadius < greatestPixelSpaceRadius && (this._greatestPixelSpaceRadius = greatestPixelSpaceRadius);
    }
    this.__updateLoadState();
    this.__update();
  }
  __prepareForRenderBase(camera) {
    if ("loaded" === this._loadState.state) if (this._renderingEnabled && !this._excludedCameras.has(camera)) {
      this.__setVisible(true);
      this.__prepareForRender(camera);
      for (let materialIndex = 0; materialIndex < this._threeJsMaterials.length; materialIndex++) {
        const uniforms = this._threeJsMaterials[materialIndex].uniforms;
        uniforms.invertDepth && uniforms.nearDistance && uniforms.midDistance && (uniforms.invertDepth.value = camera.getInvertDepth(), uniforms.nearDistance.value = camera.getAutoNearDistance(), uniforms.midDistance.value = camera.getAutoMidDistance());
      }
      for (let objectIndex = 0; objectIndex < this._threeJsObjects.length; objectIndex++) this._threeJsObjects[objectIndex].updateMatrix();
    } else this.__setVisible(false);
  }
  __updateCameraVariables(camera) {}
  __prepareForRender(camera) {}
  getUsesEntityOrientation() {
    return this._usesEntityOrientation;
  }
  __setUsesEntityOrientation(usesEntityOrientation) {
    this._usesEntityOrientation = usesEntityOrientation;
    this.__updateLoadState();
  }
  isRendering(camera) {
    return "loaded" === this._loadState.state && this._renderingEnabled && (void 0 === camera || !this._excludedCameras.has(camera));
  }
  getRenderingEnabled() {
    return this._renderingEnabled;
  }
  setRenderingEnabled(renderingEnabled) {
    this._renderingEnabled = renderingEnabled;
    this._renderingEnabled || this.__clearCameraDependentsBase();
  }
  isExcludedFromCamera(camera) {
    return this._excludedCameras.has(camera);
  }
  setExcludedFromCamera(camera, excluded) {
    !excluded && this._excludedCameras.has(camera) ? this._excludedCameras.delete(camera) : excluded && !this._excludedCameras.has(camera) && (this._excludedCameras.add(camera), this.__removeCameraDependentsBase(camera));
  }
  getVisibleInterval() {
    return this._visibleInterval;
  }
  setVisibleInterval(visibleInterval) {
    this._visibleInterval.copy(visibleInterval);
  }
  __setVisible(visible) {
    for (let objectIndex = 0; objectIndex < this._threeJsObjects.length; objectIndex++) this._threeJsObjects[objectIndex].visible = visible;
  }
  __removeCameraDependentsBase(camera) {
    this._pixelSpaceRadiusPerCamera.delete(camera);
    this.__removeCameraDependents(camera);
  }
  __clearCameraDependentsBase() {
    this._pixelSpaceRadiusPerCamera.clear();
    this.__clearCameraDependents();
  }
  __removeCameraDependents(camera) {}
  __clearCameraDependents() {}
  toString() {
    let classIndex = 0;
    for (let componentIndex = 0, componentCount = this.getEntity().getNumComponents(); componentIndex < componentCount; componentIndex++) {
      const component = this.getEntity().getComponentAt(componentIndex);
      if (this === component) break;
      this.constructor === component.constructor && (classIndex += 1);
    }
    return `${this.getEntity().getName()}.${this.constructor.name}.${classIndex}`;
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
