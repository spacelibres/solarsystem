/** @eyes-analysis
 * 文件职责：维护视口 DOM 和矩形、绑定相机、换算屏幕坐标并以 scissor 分区渲染。
 * 依据：import ../pioneer/public-api.js；Viewport extends PioneerPublicApi.CollectionItem @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:234498-237822.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：维护视口 DOM 和矩形、绑定相机、换算屏幕坐标并以 scissor 分区渲染。
 * 继承：PioneerPublicApi.CollectionItem；导出：Viewport。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Viewport extends PioneerPublicApi.CollectionItem {
  /** @eyes-analysis
   * 【结构证据】写入 `_backgroundColor`、`_bounds`、`_camera`、`_div`、`_div.id`、`_div.style.overflow`、`_div.style.position`、`_enabled`；调用 `document.createElement`、`n.__setActiveViewport`、`n.getActiveViewport`、`new PioneerPublicApi.Color`、`new PioneerPublicApi.Rect`、`new PioneerPublicApi.THREE.Color`。
   * 状态写入：_backgroundColor、_bounds、_camera、_div、_div.id、_div.style.overflow、_div.style.position、_enabled等；完整记录见索引。
   * 调用线索：document.createElement、n.__setActiveViewport、n.getActiveViewport、new PioneerPublicApi.Color、new PioneerPublicApi.Rect等。
   */
  constructor(t, e) {
    super(t, e);
    this._enabled = true;
    this._camera = null;
    this._div = document.createElement("div");
    this._bounds = new PioneerPublicApi.Rect(0, 0, 0, 0);
    this._backgroundColor = new PioneerPublicApi.Color(0, 0, 0, 1);
    this._threeJsBackgroundColor = new PioneerPublicApi.THREE.Color();
    this._div.style.position = "absolute";
    this._div.style.overflow = "hidden";
    this._div.id = t;
    this._div.classList.add("viewport");
    this.getEngine().getViewportDiv().appendChild(this._div);
    const i = this.getEngine().getRootDiv();
    this._bounds.set(this._div.offsetLeft - i.offsetLeft, this._div.offsetTop - i.offsetTop, this._div.offsetWidth, this._div.offsetHeight);
    const n = this.getEngine().getInput();
    null === n.getActiveViewport() && n.__setActiveViewport(this);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this.__getCollectionParent()`；调用 `this.__getCollectionParent`。
   * 调用线索：this.__getCollectionParent。
   */
  getEngine() {
    return this.__getCollectionParent();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._div`。
   */
  getDiv() {
    return this._div;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._bounds`。
   */
  getBounds() {
    return this._bounds;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._backgroundColor`。
   */
  getBackgroundColor() {
    return this._backgroundColor;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._backgroundColor.copy`、`this._threeJsBackgroundColor.setRGB`。
   * 调用线索：this._backgroundColor.copy、this._threeJsBackgroundColor.setRGB。
   */
  setBackgroundColor(t) {
    this._backgroundColor.copy(t);
    this._threeJsBackgroundColor.setRGB(this._backgroundColor.r, this._backgroundColor.g, this._backgroundColor.b);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._camera`。
   */
  getCamera() {
    return this._camera;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_camera`；调用 `this._camera.__setViewport`。
   * 状态写入：_camera。
   * 调用线索：this._camera.__setViewport。
   */
  setCamera(camera) {
    null !== this._camera && this._camera.__setViewport(null);
    this._camera = camera;
    null !== this._camera && this._camera.__setViewport(this);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._enabled`。
   */
  isEnabled() {
    return this._enabled;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_div.style.display`、`_enabled`。
   * 状态写入：_div.style.display、_enabled。
   */
  setEnabled(enabled) {
    this._enabled = enabled;
    this._enabled ? this._div.style.display = "block" : this._div.style.display = "none";
  }
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  getNormalSpacePositionFromPixelSpacePosition(t, e) {
    t.x = 2 * (e.x - this._bounds.origin.x) / this._bounds.size.x - 1;
    t.y = 1 - 2 * (e.y - this._bounds.origin.y) / this._bounds.size.y;
    t.z = -1;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.copy`。
   * 调用线索：t.copy。
   */
  getPixelSpacePositionFromNormalSpacePosition(t, e) {
    -1 < e.z && e.z < 1 ? (t.x = this._bounds.size.x * (e.x + 1) / 2 + this._bounds.origin.x, t.y = this._bounds.size.y * (1 - e.y) / 2 + this._bounds.origin.y) : t.copy(PioneerPublicApi.Vector2.NaN);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t*Math.max(this._bounds.size.x,this._bounds.size.y)`；调用 `Math.max`。
   * 调用线索：Math.max。
   */
  getPixelSpaceRadiusFromNormalSpaceRadius(t) {
    return t * Math.max(this._bounds.size.x, this._bounds.size.y);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t/Math.max(this._bounds.size.x,this._bounds.size.y)`；调用 `Math.max`。
   * 调用线索：Math.max。
   */
  getNormalSpaceRadiusFromPixelSpaceRadius(t) {
    return t / Math.max(this._bounds.size.x, this._bounds.size.y);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void t.copy(PioneerPublicApi.Vector3.NaN)`；调用 `e.getCameraSpacePositionFromNormalSpacePosition`、`i.getCursorPosition`、`t.copy`、`t.normalize`、`this.getCamera`、`this.getEngine`。
   * 调用线索：e.getCameraSpacePositionFromNormalSpacePosition、i.getCursorPosition、t.copy、t.normalize、this.getCamera等。
   */
  getDirectionOfCursor(t) {
    const e = this.getCamera();
    if (null === e) return void t.copy(PioneerPublicApi.Vector3.NaN);
    const i = this.getEngine().getInput();
    this.getNormalSpacePositionFromPixelSpacePosition(t, i.getCursorPosition());
    t.x < -1 || t.x > 1 || t.y < -1 || t.y > 1 || t.z < -1 || t.z > 1 ? t.copy(PioneerPublicApi.Vector3.NaN) : (e.getCameraSpacePositionFromNormalSpacePosition(t, t), t.normalize(t));
  }
  /** @eyes-analysis
   * 【结构证据】调用 `super.__destroy`、`this._div.remove`。
   * 调用线索：super.__destroy、this._div.remove。
   */
  __destroy() {
    super.__destroy();
    this._div.remove();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._bounds.set`、`this._camera.__updateCameraVariablesForConnectedScene`。
   * 调用线索：this._bounds.set、this._camera.__updateCameraVariablesForConnectedScene。
   */
  __updateViewportVariables() {
    this._enabled && (this._bounds.set(this._div.offsetLeft, this._div.offsetTop, this._div.offsetWidth, this._div.offsetHeight), null !== this._camera && this._camera.__updateCameraVariablesForConnectedScene());
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `t.setClearColor`、`t.setScissor`、`t.setViewport`、`this._camera.__prepareForRender`、`this._camera.__render`、`this._threeJsBackgroundColor.setRGB`。
   * 调用线索：t.setClearColor、t.setScissor、t.setViewport、this._camera.__prepareForRender、this._camera.__render等。
   */
  __render() {
    if (!this._enabled) return;
    const t = this.getEngine().__getThreeJsRenderer();
    const e = this.getEngine().getRootDiv().offsetHeight - this._div.offsetTop - this._div.offsetHeight;
    t.setViewport(this._bounds.origin.x, e, this._bounds.size.x, this._bounds.size.y);
    t.setScissor(this._bounds.origin.x, e, this._bounds.size.x, this._bounds.size.y);
    this._threeJsBackgroundColor.setRGB(this._backgroundColor.r, this._backgroundColor.g, this._backgroundColor.b);
    t.setClearColor(this._threeJsBackgroundColor, this._backgroundColor.a);
    null !== this._camera ? (this._camera.__prepareForRender(), this._camera.__render()) : this.getEngine().__getThreeJsRenderer().clear();
  }
  _enabled;
  _camera;
  _div;
  _bounds;
  _backgroundColor;
  _threeJsBackgroundColor;
}
export { Viewport };
