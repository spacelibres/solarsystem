/** @eyes-analysis
 * 文件职责：拥有 WebGL2 渲染器、时间、输入、场景和视口，按帧顺序推进状态与渲染。
 * 依据：import ../pioneer/public-api.js；Engine @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:165087-170472.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：拥有 WebGL2 渲染器、时间、输入、场景和视口，按帧顺序推进状态与渲染。
 * 继承：无显式父类；导出：Engine。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Engine {
  /** @eyes-analysis
   * 【结构证据】写入 `_callbacks`、`_callbacksToRemove`、`_canvas`、`_canvas.style.height`、`_canvas.style.left`、`_canvas.style.position`、`_canvas.style.top`、`_canvas.style.width`；调用 `Date.now`、`PioneerPublicApi.Capabilities.__setContext`、`document.createElement`、`new Error`、`new PioneerPublicApi.Collection`、`new PioneerPublicApi.Config`；含显式错误分支。
   * 状态写入：_callbacks、_callbacksToRemove、_canvas、_canvas.style.height、_canvas.style.left、_canvas.style.position、_canvas.style.top、_canvas.style.width等；完整记录见索引。
   * 调用线索：Date.now、PioneerPublicApi.Capabilities.__setContext、document.createElement、new Error、new PioneerPublicApi.Collection等。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `PioneerPublicApi.Version`。
   */
  getVersion() {
    return PioneerPublicApi.Version;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._environment`。
   */
  getEnvironment() {
    return this._environment;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_environment`。
   * 状态写入：_environment。
   */
  setEnvironment(environment) {
    this._environment = environment;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._rootDiv`。
   */
  getRootDiv() {
    return this._rootDiv;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._renderSize`。
   */
  getRenderSize() {
    return this._renderSize;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._canvas`。
   */
  getCanvas() {
    return this._canvas;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._viewportDiv`。
   */
  getViewportDiv() {
    return this._viewportDiv;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._config`。
   */
  getConfig() {
    return this._config;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._input`。
   */
  getInput() {
    return this._input;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._downloader`。
   */
  getDownloader() {
    return this._downloader;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._textureLoader`。
   */
  getTextureLoader() {
    return this._textureLoader;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._resourceManager`。
   */
  getResourceManager() {
    return this._resourceManager;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._materialManager`。
   */
  getMaterialManager() {
    return this._materialManager;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._scenes.get(PioneerPublicApi.Scene,t)`；调用 `this._scenes.get`。
   * 调用线索：this._scenes.get。
   */
  getScene(t) {
    return this._scenes.get(PioneerPublicApi.Scene, t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._scenes.getAt(t)`；调用 `this._scenes.getAt`。
   * 调用线索：this._scenes.getAt。
   */
  getSceneAt(t) {
    return this._scenes.getAt(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._scenes.getSize()`；调用 `this._scenes.getSize`。
   * 调用线索：this._scenes.getSize。
   */
  getNumScenes() {
    return this._scenes.getSize();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._scenes.add(PioneerPublicApi.Scene,t)`；调用 `this._scenes.add`。
   * 调用线索：this._scenes.add。
   */
  addScene(t) {
    return this._scenes.add(PioneerPublicApi.Scene, t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._scenes.remove`。
   * 调用线索：this._scenes.remove。
   */
  removeScene(t) {
    this._scenes.remove(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void 0===e||null===n?n:n.get(e,i,s)`；调用 `n.get`、`this._scenes.getAny`。
   * 调用线索：n.get、this._scenes.getAny。
   */
  get(t, e, i, s = 0) {
    const n = this._scenes.getAny(t);
    return void 0 === e || null === n ? n : n.get(e, i, s);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._viewports.get(PioneerPublicApi.Viewport,t)`；调用 `this._viewports.get`。
   * 调用线索：this._viewports.get。
   */
  getViewport(t) {
    return this._viewports.get(PioneerPublicApi.Viewport, t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._viewports.getAt(t)`；调用 `this._viewports.getAt`。
   * 调用线索：this._viewports.getAt。
   */
  getViewportAt(t) {
    return this._viewports.getAt(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._viewports.getSize()`；调用 `this._viewports.getSize`。
   * 调用线索：this._viewports.getSize。
   */
  getNumViewports() {
    return this._viewports.getSize();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._viewports.add(PioneerPublicApi.Viewport,t)`；调用 `this._viewports.add`。
   * 调用线索：this._viewports.add。
   */
  addViewport(t) {
    return this._viewports.add(PioneerPublicApi.Viewport, t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._viewports.remove`。
   * 调用线索：this._viewports.remove。
   */
  removeViewport(t) {
    this._viewports.remove(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._time`。
   */
  getTime() {
    return this._time;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_time`。
   * 状态写入：_time。
   */
  setTime(time) {
    this._time = time;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._timeRate`。
   */
  getTimeRate() {
    return this._timeRate;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_timeRate`。
   * 状态写入：_timeRate。
   */
  setTimeRate(timeRate) {
    this._timeRate = timeRate;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._fps.getFPS()`；调用 `this._fps.getFPS`。
   * 调用线索：this._fps.getFPS。
   */
  getFPS() {
    return this._fps.getFPS();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._fpsLimit`。
   */
  getFPSLimit() {
    return this._fpsLimit;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_fpsLimit`。
   * 状态写入：_fpsLimit。
   */
  setFPSLimit(fpsLimit) {
    this._fpsLimit = fpsLimit;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._realDeltaTime`。
   */
  getDeltaTime() {
    return this._realDeltaTime;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `new Promise`、`t`、`this.addCallback`。
   * 调用线索：new Promise、t、this.addCallback。
   */
  async waitUntilNextFrame() {
    await new Promise(t => {
      this.addCallback(() => {
        t(void 0);
      }, false);
    });
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._callbacks.push`。
   * 调用线索：this._callbacks.push。
   */
  addCallback(t, e) {
    this._callbacks.push({
      callback: t,
      recurring: e
    });
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._callbacksToRemove.push`。
   * 调用线索：this._callbacksToRemove.push。
   */
  removeCallback(t) {
    this._callbacksToRemove.push(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._threeJsRenderer`。
   */
  __getThreeJsRenderer() {
    return this._threeJsRenderer;
  }
  /** @eyes-analysis
   * 以真实秒差推进 time += timeRate * delta；先 Scene.__update，再视口投影变量，再 Scene.__updateVisuals，清屏并依次渲染视口；执行/移除回调后重置输入瞬时态，继续 requestAnimationFrame。FPS 限制分支跳过整帧工作。
   * 状态写入：_callbacksToRemove、_lastAppTime、_realDeltaTime、_time。
   * 调用线索：Date.now、e.callback、requestAnimationFrame、this._callbacks.splice、this._callbacksToRemove.push等。
   */
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
