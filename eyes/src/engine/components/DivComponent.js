/** @eyes-analysis
 * 文件职责：把真实 DOM 元素投影到视口，处理遮挡、屏幕偏移、对齐和可见区间。
 * 依据：import ../pioneer/public-api.js；DivComponent extends PioneerPublicApi.BaseComponent @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:318406-321592.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：把真实 DOM 元素投影到视口，处理遮挡、屏幕偏移、对齐和可见区间。
 * 继承：PioneerPublicApi.BaseComponent；导出：DivComponent。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class DivComponent extends PioneerPublicApi.BaseComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `_activeCamera`、`_alignment`、`_bounds`、`_canBeOccluded`、`_currentHTML`、`_div`、`_div.style.position`、`_div.style.translate`；调用 `document.createElement`、`new PioneerPublicApi.Rect`、`new PioneerPublicApi.Vector2`、`super`、`this.__setRadius`、`this.setVisibleInterval`。
   * 状态写入：_activeCamera、_alignment、_bounds、_canBeOccluded、_currentHTML、_div、_div.style.position、_div.style.translate等；完整记录见索引。
   * 调用线索：document.createElement、new PioneerPublicApi.Rect、new PioneerPublicApi.Vector2、super、this.__setRadius等。
   */
  constructor(t, e) {
    super(t, e);
    this._activeCamera = null;
    this._canBeOccluded = true;
    this._hiddenClass = "hidden";
    this._div = document.createElement("div");
    this._div.style.position = "absolute";
    this._div.style.translate = "";
    this._alignment = new PioneerPublicApi.Vector2(0, .5);
    this._bounds = new PioneerPublicApi.Rect(0, 0, 0, 0);
    this._currentHTML = "";
    this.__setRadius(Number.POSITIVE_INFINITY);
    this.setVisibleInterval(PioneerPublicApi.VisibleInterval.DefaultVisibleFar);
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
   * 【结构证据】返回 `this._canBeOccluded`。
   */
  getCanBeOccluded() {
    return this._canBeOccluded;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_canBeOccluded`。
   * 状态写入：_canBeOccluded。
   */
  setCanBeOccluded(canBeOccluded) {
    this._canBeOccluded = canBeOccluded;
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
   * 【结构证据】返回 `this._alignment`。
   */
  getAlignment() {
    return this._alignment;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._alignment.copy`。
   * 调用线索：this._alignment.copy。
   */
  setAlignment(t) {
    this._alignment.copy(t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._div.parentNode.removeChild`。
   * 调用线索：this._div.parentNode.removeChild。
   */
  __unloadResources() {
    null !== this._div.parentNode && this._div.parentNode.removeChild(this._div);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `e`；调用 `PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`n.dot`、`t.getEntity`、`t.getEntity().getOrientation`、`t.getEntity().getOrientation().getAxis`。
   * 调用线索：PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、n.dot、t.getEntity、t.getEntity().getOrientation等。
   */
  _determineComponentVisibility(t) {
    let e = 0 === this.getVisibleInterval().getFadeMultiplier(this.getEntity(), t);
    const i = this.getEntity().getCameraSpacePosition(t);
    if (!e && this._canBeOccluded && (e = t.isPositionOccluded(i)), !e) {
      const n = PioneerPublicApi.Vector3.pool.get();
      t.getEntity().getOrientation().getAxis(n, 1);
      e = n.dot(i) <= 0;
      PioneerPublicApi.Vector3.pool.release(n);
    }
    return e;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_activeCamera`、`_bounds.origin.x`、`_bounds.origin.y`、`_bounds.size.x`、`_bounds.size.y`、`_currentHTML`、`_div.style.translate`；返回 `void` 或 `void this._div.remove()`；调用 `Math.floor`、`Math.round`、`PioneerPublicApi.Rect.pool.get`、`PioneerPublicApi.Rect.pool.release`、`PioneerPublicApi.Vector2.pool.get`、`PioneerPublicApi.Vector2.pool.release`。
   * 状态写入：_activeCamera、_bounds.origin.x、_bounds.origin.y、_bounds.size.x、_bounds.size.y、_currentHTML、_div.style.translate。
   * 调用线索：Math.floor、Math.round、PioneerPublicApi.Rect.pool.get、PioneerPublicApi.Rect.pool.release、PioneerPublicApi.Vector2.pool.get等。
   */
  __prepareForRender(t) {
    if (null === this._activeCamera) {
      const t = this.getEntity().getScene().getEngine().getViewportAt(0);
      t && (this._activeCamera = t.getCamera());
    }
    if (this._activeCamera !== t) return;
    const e = this._activeCamera.getViewport();
    if (!e) return void this._div.remove();
    e.getDiv() !== this._div.parentNode && e.getDiv().append(this._div);
    const i = this._div.classList.contains(this._hiddenClass);
    const n = this._determineComponentVisibility(t);
    this._div.classList.toggle(this._hiddenClass, n);
    this._currentHTML === this._div.innerHTML && i === n || (this._bounds.size.x = this._div.offsetWidth, this._bounds.size.y = this._div.offsetHeight, this._currentHTML = this._div.innerHTML);
    const o = t.getViewport();
    if (o) {
      const e = o.getBounds();
      const i = PioneerPublicApi.Rect.pool.get();
      const n = PioneerPublicApi.Vector2.pool.get();
      i.copy(e);
      i.origin.set(0, 0);
      n.copy(this.getEntity().getPixelSpacePosition(t));
      n.x = e.size.x % 2 == 0 ? Math.round(n.x) : Math.floor(n.x);
      n.y = e.size.y % 2 == 0 ? Math.round(n.y) : Math.floor(n.y);
      this._bounds.origin.x = n.x - this._bounds.size.x * this._alignment.x - e.origin.x;
      this._bounds.origin.y = n.y - this._bounds.size.y * this._alignment.y - e.origin.y;
      PioneerPublicApi.Vector2.pool.release(n);
      !this._bounds.origin.isNaN() && i.intersects(this._bounds) ? this._div.style.translate = `${Math.round(this._bounds.origin.x)}px ${Math.round(this._bounds.origin.y)}px` : this._div.style.translate = `${Math.round(10 * e.size.x)}px ${Math.round(10 * e.size.y)}px`;
      PioneerPublicApi.Rect.pool.release(i);
    }
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
  _activeCamera;
  _canBeOccluded;
  _hiddenClass;
  _div;
  _alignment;
  _bounds;
  _currentHTML;
}
export { DivComponent };
