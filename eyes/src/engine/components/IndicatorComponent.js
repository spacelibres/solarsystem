/** @eyes-analysis
 * 文件职责：在视口边缘/屏幕位置显示目标指示器，约束位置并处理遮挡与边距。
 * 依据：import ../pioneer/public-api.js；IndicatorComponent extends PioneerPublicApi.BaseComponent @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:336279-341094.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：在视口边缘/屏幕位置显示目标指示器，约束位置并处理遮挡与边距。
 * 继承：PioneerPublicApi.BaseComponent；导出：IndicatorComponent。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class IndicatorComponent extends PioneerPublicApi.BaseComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `_activeCamera`、`_arrowClass`、`_bounds`、`_currentHTML`、`_div`、`_div.style.position`、`_div.style.translate`、`_hiddenClass`；调用 `document.createElement`、`new PioneerPublicApi.EntityRef`、`new PioneerPublicApi.Rect`、`super`、`this.__setRadius`、`this.getEntity`。
   * 状态写入：_activeCamera、_arrowClass、_bounds、_currentHTML、_div、_div.style.position、_div.style.translate、_hiddenClass等；完整记录见索引。
   * 调用线索：document.createElement、new PioneerPublicApi.EntityRef、new PioneerPublicApi.Rect、super、this.__setRadius等。
   */
  constructor(t, e) {
    super(t, e);
    this._activeCamera = null;
    this._hiddenClass = "hidden";
    this._arrowClass = "arrow";
    this._padding = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };
    this._sourceEntity = new PioneerPublicApi.EntityRef(this.getEntity().getScene());
    this._div = document.createElement("div");
    this._div.style.position = "absolute";
    this._div.style.translate = "";
    this._bounds = new PioneerPublicApi.Rect(0, 0, 0, 0);
    this._currentHTML = "";
    this.__setRadius(Number.POSITIVE_INFINITY);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._div`。
   */
  getDiv() {
    return this._div;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._activeCamera`。
   */
  getActiveCamera() {
    return this._activeCamera;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_activeCamera`；调用 `this.resetResources`。
   * 状态写入：_activeCamera。
   * 调用线索：this.resetResources。
   */
  setActiveCamera(activeCamera) {
    this._activeCamera = activeCamera;
    this.resetResources();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._bounds`。
   */
  getBounds() {
    return this._bounds;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._hiddenClass`。
   */
  getHiddenClass() {
    return this._hiddenClass;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_hiddenClass`；调用 `this._div.classList.add`、`this._div.classList.contains`、`this._div.classList.remove`。
   * 状态写入：_hiddenClass。
   * 调用线索：this._div.classList.add、this._div.classList.contains、this._div.classList.remove。
   */
  setHiddenClass(hiddenClass) {
    const e = this._div.classList.contains(this._hiddenClass);
    this._div.classList.remove(this._hiddenClass);
    this._hiddenClass = hiddenClass;
    e && this._div.classList.add(this._hiddenClass);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._arrowClass`。
   */
  getArrowClass() {
    return this._arrowClass;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_arrowClass`；调用 `this._div.classList.remove`。
   * 状态写入：_arrowClass。
   * 调用线索：this._div.classList.remove。
   */
  setArrowClass(arrowClass) {
    this._div.classList.remove(`${this._arrowClass}Left`);
    this._div.classList.remove(`${this._arrowClass}Right`);
    this._arrowClass = arrowClass;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_padding.bottom`、`_padding.left`、`_padding.right`、`_padding.top`。
   * 状态写入：_padding.bottom、_padding.left、_padding.right、_padding.top。
   */
  setPadding(t, e, i, s) {
    this._padding.left = t;
    this._padding.right = e;
    this._padding.top = i;
    this._padding.bottom = s;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `""!==this._sourceEntity.getName()?this._sourceEntity.getName():void 0`；调用 `this._sourceEntity.getName`。
   * 调用线索：this._sourceEntity.getName。
   */
  getSourceEntity() {
    return "" !== this._sourceEntity.getName() ? this._sourceEntity.getName() : void 0;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._sourceEntity.setName`。
   * 调用线索：this._sourceEntity.setName。
   */
  setSourceEntity(t) {
    this._sourceEntity.setName(t ?? "");
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._div.parentNode.removeChild`。
   * 调用线索：this._div.parentNode.removeChild。
   */
  __unloadResources() {
    null !== this._div.parentNode && this._div.parentNode.removeChild(this._div);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_activeCamera`、`_bounds.origin.x`、`_bounds.origin.y`、`_bounds.size.x`、`_bounds.size.y`、`_currentHTML`、`_div.style.rotate`、`_div.style.transformOrigin`；返回 `void` 或 `void this._div.remove()`；调用 `Math.atan`、`Math.cos`、`Math.floor`、`Math.min`、`Math.round`、`Math.sin`。
   * 状态写入：_activeCamera、_bounds.origin.x、_bounds.origin.y、_bounds.size.x、_bounds.size.y、_currentHTML、_div.style.rotate、_div.style.transformOrigin等；完整记录见索引。
   * 调用线索：Math.atan、Math.cos、Math.floor、Math.min、Math.round等。
   */
  __prepareForRender(t) {
    if (!this._activeCamera) {
      const t = this.getEntity().getScene().getEngine().getViewportAt(0);
      t && (this._activeCamera = t.getCamera());
    }
    if (this._activeCamera !== t) return;
    const e = t.getViewport();
    if (!e) return void this._div.remove();
    e.getDiv() !== this._div.parentNode && e.getDiv().append(this._div);
    let i = false;
    const n = e.getBounds().size;
    const o = this.getEntity().getPixelSpacePosition(t);
    let r;
    o.x >= this._padding.left && o.y >= this._padding.top && o.x < n.x - this._padding.right && o.y < n.y - this._padding.bottom && (i = true);
    r = "" !== this._sourceEntity.getName() ? this._sourceEntity.get() : t.getEntity().getParent();
    r || (i = true);
    const a = this._div.classList.contains(this._hiddenClass);
    if (this._div.classList.toggle(this._hiddenClass, i), i) return void (this._div.style.translate = `${Math.round(100 * n.x)}px ${Math.round(100 * n.y)}px`);
    const l = PioneerPublicApi.Vector3.pool.get();
    const c = PioneerPublicApi.Vector3.pool.get();
    const h = Math.atan(Math.tan(t.getHorizontalFieldOfView() / 2) * (1 - 2 * this._padding.left / n.x));
    const d = Math.atan(Math.tan(t.getHorizontalFieldOfView() / 2) * (1 - 2 * this._padding.right / n.x));
    const u = Math.atan(Math.tan(t.getVerticalFieldOfView() / 2) * (1 - 2 * this._padding.top / n.y));
    const p = Math.atan(Math.tan(t.getVerticalFieldOfView() / 2) * (1 - 2 * this._padding.bottom / n.y));
    const _ = Math.cos(h);
    const m = Math.sin(h);
    const g = Math.cos(d);
    const y = Math.sin(d);
    const f = Math.cos(u);
    const T = Math.sin(u);
    const b = Math.cos(p);
    const E = Math.sin(p);
    l.rotateInverse(t.getEntity().getOrientation(), this.getEntity().getCameraSpacePosition(t));
    c.rotateInverse(t.getEntity().getOrientation(), r.getCameraSpacePosition(t));
    const S = (-c.x * _ + -c.y * m) / ((l.x - c.x) * _ + (l.y - c.y) * m);
    const v = (-c.x * -g + -c.y * y) / ((l.x - c.x) * -g + (l.y - c.y) * y);
    const C = (-c.z * -f + -c.y * T) / ((l.z - c.z) * -f + (l.y - c.y) * T);
    const x = (-c.z * b + -c.y * E) / ((l.z - c.z) * b + (l.y - c.y) * E);
    let I = Number.POSITIVE_INFINITY;
    I = S > 0 ? Math.min(I, S) : I;
    I = v > 0 ? Math.min(I, v) : I;
    I = C > 0 ? Math.min(I, C) : I;
    I = x > 0 ? Math.min(I, x) : I;
    l.lerp(c, l, I);
    const w = PioneerPublicApi.Vector2.pool.get();
    const A = PioneerPublicApi.Vector2.pool.get();
    this._getPixelSpaceFromFrameSpace(w, l, n, t);
    this._getPixelSpaceFromFrameSpace(A, c, n, t);
    PioneerPublicApi.Vector3.pool.release(l);
    PioneerPublicApi.Vector3.pool.release(c);
    const M = this._div.classList.contains(`${this._arrowClass}Right`);
    const N = w.x - A.x > 0;
    this._div.classList.toggle(`${this._arrowClass}Left`, !N);
    this._div.classList.toggle(`${this._arrowClass}Right`, N);
    const L = Math.atan((w.y - A.y) / (w.x - A.x));
    this._currentHTML === this._div.innerHTML && a === i && M === N || (this._bounds.size.x = this._div.offsetWidth, this._bounds.size.y = this._div.offsetHeight, this._currentHTML = this._div.innerHTML);
    this._bounds.origin.copy(w);
    PioneerPublicApi.Vector2.pool.release(A);
    PioneerPublicApi.Vector2.pool.release(w);
    N && (this._bounds.origin.x -= this._bounds.size.x);
    this._bounds.origin.y -= Math.floor(.5 * this._bounds.size.y);
    this._div.style.translate = `${Math.round(this._bounds.origin.x)}px ${Math.round(this._bounds.origin.y)}px`;
    this._div.style.rotate = Math.round(100 * L) / 100 + "rad";
    this._div.style.transformOrigin = N ? "right center" : "left center";
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_div.style.translate`；调用 `Math.round`、`t.getBounds`、`this._activeCamera.getViewport`。
   * 状态写入：_div.style.translate。
   * 调用线索：Math.round、t.getBounds、this._activeCamera.getViewport。
   */
  __setVisible(t) {
    if (!t && this._activeCamera) {
      const t = this._activeCamera.getViewport();
      if (t) {
        const e = t.getBounds();
        this._div.style.translate = `${Math.round(10 * e.size.x)}px ${Math.round(10 * e.size.y)}px`;
      }
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Math.tan`、`PioneerPublicApi.Vector2.pool.get`、`PioneerPublicApi.Vector2.pool.release`、`n.getHorizontalFieldOfView`、`n.getVerticalFieldOfView`。
   * 调用线索：Math.tan、PioneerPublicApi.Vector2.pool.get、PioneerPublicApi.Vector2.pool.release、n.getHorizontalFieldOfView、n.getVerticalFieldOfView。
   */
  _getPixelSpaceFromFrameSpace(t, e, i, n) {
    const o = PioneerPublicApi.Vector2.pool.get();
    o.x = e.x / e.y / Math.tan(n.getHorizontalFieldOfView() / 2);
    o.y = e.z / e.y / Math.tan(n.getVerticalFieldOfView() / 2);
    t.x = i.x * (o.x + 1) / 2;
    t.y = i.y * (1 - o.y) / 2;
    PioneerPublicApi.Vector2.pool.release(o);
  }
  _activeCamera;
  _hiddenClass;
  _arrowClass;
  _padding;
  _sourceEntity;
  _div;
  _bounds;
  _currentHTML;
}
export { IndicatorComponent };
