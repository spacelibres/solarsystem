// Recovered from app.js:165087-170472.
import * as PioneerPublicApi from "../pioneer/public-api.js";
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
  getScene(t) {
    return this._scenes.get(PioneerPublicApi.Scene, t);
  }
  getSceneAt(t) {
    return this._scenes.getAt(t);
  }
  getNumScenes() {
    return this._scenes.getSize();
  }
  addScene(t) {
    return this._scenes.add(PioneerPublicApi.Scene, t);
  }
  removeScene(t) {
    this._scenes.remove(t);
  }
  get(t, e, i, s = 0) {
    const n = this._scenes.getAny(t);
    return void 0 === e || null === n ? n : n.get(e, i, s);
  }
  getViewport(t) {
    return this._viewports.get(PioneerPublicApi.Viewport, t);
  }
  getViewportAt(t) {
    return this._viewports.getAt(t);
  }
  getNumViewports() {
    return this._viewports.getSize();
  }
  addViewport(t) {
    return this._viewports.add(PioneerPublicApi.Viewport, t);
  }
  removeViewport(t) {
    this._viewports.remove(t);
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
  async waitUntilNextFrame() {
    await new Promise(t => {
      this.addCallback(() => {
        t(void 0);
      }, false);
    });
  }
  addCallback(t, e) {
    this._callbacks.push({
      callback: t,
      recurring: e
    });
  }
  removeCallback(t) {
    this._callbacksToRemove.push(t);
  }
  __getThreeJsRenderer() {
    return this._threeJsRenderer;
  }
  _loop() {
    const lastAppTime = Date.now();
    if (this._realDeltaTime = (lastAppTime - this._lastAppTime) / 1e3, this._realDeltaTime < 1 / this._fpsLimit) requestAnimationFrame(this._thisLoop);else {
      this._lastAppTime = lastAppTime;
      this._fps.update(this._realDeltaTime);
      this._time += this._timeRate * this._realDeltaTime;
      this._renderSize.x === this._rootDiv.clientWidth && this._renderSize.y === this._rootDiv.clientHeight || (this._renderSize.set(this._rootDiv.clientWidth, this._rootDiv.clientHeight), this._threeJsRenderer.setSize(this._renderSize.x, this._renderSize.y, false));
      for (let t = 0; t < this._scenes.getSize(); t++) this._scenes.getAt(t).__update();
      for (let t = 0; t < this._viewports.getSize(); t++) this._viewports.getAt(t).__updateViewportVariables();
      for (let t = 0; t < this._scenes.getSize(); t++) this._scenes.getAt(t).__updateVisuals();
      this._threeJsRenderer.setViewport(0, 0, this._renderSize.x, this._renderSize.y);
      this._threeJsRenderer.setScissor(0, 0, this._renderSize.x, this._renderSize.y);
      this._threeJsRenderer.clear();
      for (let t = 0; t < this._viewports.getSize(); t++) this._viewports.getAt(t).__render();
      for (let t = 0, e = this._callbacksToRemove.length; t < e; t++) for (let e = 0, i = this._callbacks.length; e < i; e++) if (this._callbacks[e].callback === this._callbacksToRemove[t]) {
        this._callbacks.splice(e, 1);
        break;
      }
      this._callbacksToRemove = [];
      for (let t = 0; t < this._callbacks.length; t++) {
        const e = this._callbacks[t];
        e.callback();
        e.recurring || this._callbacksToRemove.push(e.callback);
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
