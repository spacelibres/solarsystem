/** @eyes-analysis
 * 文件职责：按实体包围半径与相机视场计算合适距离，执行自动取景。
 * 依据：import ../pioneer/index.js；ZoomFitController extends Pioneer.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:791479-793204.
import * as Pioneer from "../pioneer/index.js";
/** @eyes-analysis
 * 类职责：按实体包围半径与相机视场计算合适距离，执行自动取景。
 * 继承：Pioneer.BaseController；导出：ZoomFitController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ZoomFitController extends Pioneer.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_edgeSize`、`_entities`、`_tightFit`、`_zoomOutOnly`；调用 `new Pioneer.FastMap`、`super`、`this.addModifiedState`。
   * 状态写入：_edgeSize、_entities、_tightFit、_zoomOutOnly。
   * 调用线索：new Pioneer.FastMap、super、this.addModifiedState。
   */
  constructor(t, e) {
    super(t, e);
    this._entities = new Pioneer.FastMap();
    this._tightFit = false;
    this._zoomOutOnly = false;
    this._edgeSize = 0;
    this.addModifiedState("position");
  }
  /** @eyes-analysis
   * 【结构证据】调用 `entityRef.setName`、`new Pioneer.EntityRef`、`this._entities.set`、`this.addDependentState`、`this.getEntity`、`this.getEntity().getScene`。
   * 调用线索：entityRef.setName、new Pioneer.EntityRef、this._entities.set、this.addDependentState、this.getEntity等。
   */
  addEntity(t) {
    const entityRef = new Pioneer.EntityRef(this.getEntity().getScene());
    entityRef.setName(t);
    this._entities.set(t, {
      ref: entityRef
    });
    this.addDependentState(t, "position");
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._entities.delete`、`this.removeDependentState`。
   * 调用线索：this._entities.delete、this.removeDependentState。
   */
  removeEntity(t) {
    this._entities.delete(t);
    this.removeDependentState(t, "position");
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_tightFit`。
   * 状态写入：_tightFit。
   */
  setTightFit(tightFit) {
    this._tightFit = tightFit;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_zoomOutOnly`。
   * 状态写入：_zoomOutOnly。
   */
  setZoomOutOnly(zoomOutOnly) {
    this._zoomOutOnly = zoomOutOnly;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_edgeSize`。
   * 状态写入：_edgeSize。
   */
  setEdgeSize(edgeSize) {
    this._edgeSize = edgeSize;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `Math.max`、`Math.min`、`Math.sqrt`、`Math.tan`、`Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`。
   * 调用线索：Math.max、Math.min、Math.sqrt、Math.tan、Pioneer.Vector3.pool.get等。
   */
  __update() {
    const t = this.getEntity().getParent();
    if (!t) return;
    let e = 1;
    const i = this.getEntity().getComponent(Pioneer.CameraComponent);
    if (null !== i) {
      const t = Math.min(i.getHorizontalFieldOfView(), i.getVerticalFieldOfView());
      e = Math.tan(t / 2);
    }
    const n = Pioneer.Vector3.pool.get();
    n.normalize(this.getEntity().getPosition());
    0 === n.magnitudeSqr() && (this.getEntity().getOrientation().getAxis(n, 1), n.neg(n));
    n.isNaN() && n.copy(Pioneer.Vector3.YAxisNeg);
    const o = (1 + this._edgeSize / (.5 - this._edgeSize)) / e;
    let r = 0;
    const a = Pioneer.Vector3.pool.get();
    for (let e = 0, i = this._entities.getSize(); e < i; e++) {
      const i = this._entities.getAt(e).value.ref.get();
      if (null === i) continue;
      i.getPositionRelativeToEntity(a, Pioneer.Vector3.Zero, t);
      const l = i.getExtentsRadius();
      let c;
      if (this._tightFit) {
        const t = a.dot(n);
        a.addMult(a, n, -t);
        c = t + o * a.magnitude() + l * Math.sqrt(o * o + 1);
      } else c = a.magnitude() + l;
      r = Math.max(r, c);
    }
    Pioneer.Vector3.pool.release(a);
    this._tightFit || (r *= Math.sqrt(o * o + 1));
    (!this._zoomOutOnly || r > this.getEntity().getPosition().magnitude()) && (n.mult(n, r), this.getEntity().setPosition(n));
    Pioneer.Vector3.pool.release(n);
  }
  _entities;
  _tightFit;
  _zoomOutOnly;
  _edgeSize;
}
export { ZoomFitController };
