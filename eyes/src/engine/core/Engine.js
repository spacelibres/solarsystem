// Recovered from app.js:165087-170472.
import * as PioneerPublicApi from "../pioneer/public-api.js";
// 引擎拥有渲染器、下载器与资源管理器；每帧先推进场景状态，再更新视口、视觉资源，最后渲染并执行回调。
class Engine {
  constructor(rootDiv) {
    if (!(rootDiv instanceof HTMLDivElement)) throw new Error("The root div param is not an actual div element.");
    if (this._environment = "development", this._rootDiv = rootDiv, this._renderSize = new PioneerPublicApi.Vector2(), this._input = new PioneerPublicApi.Input(this), this._config = new PioneerPublicApi.Config(), this._downloader = new PioneerPublicApi.Downloader(), this._scenes = new PioneerPublicApi.Collection(this), this._viewports = new PioneerPublicApi.Collection(this), this._lastAppTime = Date.now(), this._realDeltaTime = 0, this._fps = new PioneerPublicApi.FPS(), this._fpsLimit = Number.POSITIVE_INFINITY, this._time = 0, this._timeRate = 0, this._callbacks = [], this._callbacksToRemove = [], this._thisLoop = this._loop.bind(this), "relative" !== this._rootDiv.style.position && "absolute" !== this._rootDiv.style.position && (this._rootDiv.style.position = "relative"), this._rootDiv.style.userSelect = "none", this._rootDiv.style.touchAction = "none", this._canvas = document.createElement("canvas"), this._canvas.style.position = "absolute", this._canvas.style.left = "0px", this._canvas.style.top = "0px", this._canvas.style.width = "100%", this._canvas.style.height = "100%", this._rootDiv.appendChild(this._canvas), this._viewportDiv = document.createElement("div"), this._viewportDiv.style.position = "absolute", this._viewportDiv.style.left = "0px", this._viewportDiv.style.top = "0px", this._viewportDiv.style.width = "100%", this._viewportDiv.style.height = "100%", this._viewportDiv.style.overflow = "hidden", this._rootDiv.appendChild(this._viewportDiv), this._threeJsRenderer = new PioneerPublicApi.THREE.WebGLRenderer({
      antialias: true,
      canvas: this._canvas
    }), !this._threeJsRenderer.capabilities.isWebGL2) throw new Error("Your browser does not support WebGL 2. Please upgrade your browser.");
    this._threeJsRenderer.setScissorTest(true);
    this._threeJsRenderer.setPixelRatio(window.devicePixelRatio);
    this._textureLoader = new PioneerPublicApi.TextureLoader(this);
    this._resourceManager = new PioneerPublicApi.ResourceManager(this);
    PioneerPublicApi.THREE.Cache.enabled = false;
    PioneerPublicApi.Capabilities.__setContext(this._threeJsRenderer.getContext());
    this._materialManager = new PioneerPublicApi.MaterialManager(this._downloader);
    requestAnimationFrame(this._thisLoop);
  }
  getVersion() {
    return PioneerPublicApi.Version;
  }
  getEnvironment() {
    return this._environment;
  }
  setEnvironment(environment) {
    this._environment = environment;
  }
  getRootDiv() {
    return this._rootDiv;
  }
  getRenderSize() {
    return this._renderSize;
  }
  getCanvas() {
    return this._canvas;
  }
  getViewportDiv() {
    return this._viewportDiv;
  }
  getConfig() {
    return this._config;
  }
  getInput() {
    return this._input;
  }
  getDownloader() {
    return this._downloader;
  }
  getTextureLoader() {
    return this._textureLoader;
  }
  getResourceManager() {
    return this._resourceManager;
  }
  getMaterialManager() {
    return this._materialManager;
  }
  getScene(sceneName) {
    return this._scenes.get(PioneerPublicApi.Scene, sceneName);
  }
  getSceneAt(sceneIndex) {
    return this._scenes.getAt(sceneIndex);
  }
  getNumScenes() {
    return this._scenes.getSize();
  }
  addScene(sceneName) {
    return this._scenes.add(PioneerPublicApi.Scene, sceneName);
  }
  removeScene(sceneOrName) {
    this._scenes.remove(sceneOrName);
  }
  get(sceneName, entityName, itemNameOrType, classIndex = 0) {
    const scene = this._scenes.getAny(sceneName);
    return void 0 === entityName || null === scene ? scene : scene.get(entityName, itemNameOrType, classIndex);
  }
  getViewport(viewportName) {
    return this._viewports.get(PioneerPublicApi.Viewport, viewportName);
  }
  getViewportAt(viewportIndex) {
    return this._viewports.getAt(viewportIndex);
  }
  getNumViewports() {
    return this._viewports.getSize();
  }
  addViewport(viewportName) {
    return this._viewports.add(PioneerPublicApi.Viewport, viewportName);
  }
  removeViewport(viewportOrName) {
    this._viewports.remove(viewportOrName);
  }
  getTime() {
    return this._time;
  }
  setTime(time) {
    this._time = time;
  }
  getTimeRate() {
    return this._timeRate;
  }
  setTimeRate(timeRate) {
    this._timeRate = timeRate;
  }
  getFPS() {
    return this._fps.getFPS();
  }
  getFPSLimit() {
    return this._fpsLimit;
  }
  setFPSLimit(fpsLimit) {
    this._fpsLimit = fpsLimit;
  }
  getDeltaTime() {
    return this._realDeltaTime;
  }
  // 一次性回调在帧尾兑现，调用者随后观察的是本帧更新后的场景状态。
  async waitUntilNextFrame() {
    await new Promise(resolve => {
      this.addCallback(() => {
        resolve(void 0);
      }, false);
    });
  }
  addCallback(callback, recurring) {
    this._callbacks.push({
      callback: callback,
      recurring: recurring
    });
  }
  removeCallback(callback) {
    this._callbacksToRemove.push(callback);
  }
  __getThreeJsRenderer() {
    return this._threeJsRenderer;
  }
  // 限帧时不推进上一帧时间；真正执行帧时才更新时间与输入状态。回调删除延后到下一次回调遍历前，避免遍历中删项。
  _loop() {
    const lastAppTime = Date.now();
    if (this._realDeltaTime = (lastAppTime - this._lastAppTime) / 1e3, this._realDeltaTime < 1 / this._fpsLimit) requestAnimationFrame(this._thisLoop);else {
      this._lastAppTime = lastAppTime;
      this._fps.update(this._realDeltaTime);
      this._time += this._timeRate * this._realDeltaTime;
      this._renderSize.x === this._rootDiv.clientWidth && this._renderSize.y === this._rootDiv.clientHeight || (this._renderSize.set(this._rootDiv.clientWidth, this._rootDiv.clientHeight), this._threeJsRenderer.setSize(this._renderSize.x, this._renderSize.y, false));
      for (let sceneIndex = 0; sceneIndex < this._scenes.getSize(); sceneIndex++) this._scenes.getAt(sceneIndex).__update();
      for (let viewportIndex = 0; viewportIndex < this._viewports.getSize(); viewportIndex++) this._viewports.getAt(viewportIndex).__updateViewportVariables();
      for (let sceneIndex = 0; sceneIndex < this._scenes.getSize(); sceneIndex++) this._scenes.getAt(sceneIndex).__updateVisuals();
      this._threeJsRenderer.setViewport(0, 0, this._renderSize.x, this._renderSize.y);
      this._threeJsRenderer.setScissor(0, 0, this._renderSize.x, this._renderSize.y);
      this._threeJsRenderer.clear();
      for (let viewportIndex = 0; viewportIndex < this._viewports.getSize(); viewportIndex++) this._viewports.getAt(viewportIndex).__render();
      for (let removalIndex = 0, removalCount = this._callbacksToRemove.length; removalIndex < removalCount; removalIndex++) for (let callbackIndex = 0, callbackCount = this._callbacks.length; callbackIndex < callbackCount; callbackIndex++) if (this._callbacks[callbackIndex].callback === this._callbacksToRemove[removalIndex]) {
        this._callbacks.splice(callbackIndex, 1);
        break;
      }
      this._callbacksToRemove = [];
      for (let callbackIndex = 0; callbackIndex < this._callbacks.length; callbackIndex++) {
        const callbackEntry = this._callbacks[callbackIndex];
        callbackEntry.callback();
        callbackEntry.recurring || this._callbacksToRemove.push(callbackEntry.callback);
      }
      this._input.__resetStatesForNextFrame();
      requestAnimationFrame(this._thisLoop);
    }
  }
  _environment;
  _rootDiv;
  _renderSize;
  _input;
  _config;
  _downloader;
  _scenes;
  _viewports;
  _lastAppTime;
  _realDeltaTime;
  _fps;
  _fpsLimit;
  _time;
  _timeRate;
  _callbacks;
  _callbacksToRemove;
  _thisLoop;
  _canvas;
  _viewportDiv;
  _threeJsRenderer;
  _textureLoader;
  _resourceManager;
  _materialManager;
}
export { Engine };
