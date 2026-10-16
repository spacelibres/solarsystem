/** @eyes-analysis
 * 文件职责：引用地面组件查询地表位置，把实体位置限制到表面/给定高度。
 * 依据：import ../pioneer/public-api.js；GroundClampController extends PioneerPublicApi.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:476554-479707.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：引用地面组件查询地表位置，把实体位置限制到表面/给定高度。
 * 继承：PioneerPublicApi.BaseController；导出：GroundClampController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class GroundClampController extends PioneerPublicApi.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_clampOnlyIfBelow`、`_distanceFromGround`、`_groundEntityRef`、`_up`；调用 `new PioneerPublicApi.EntityRef`、`new PioneerPublicApi.Vector3`、`super`、`this.addModifiedState`、`this.getEntity`、`this.getEntity().getScene`。
   * 状态写入：_clampOnlyIfBelow、_distanceFromGround、_groundEntityRef、_up。
   * 调用线索：new PioneerPublicApi.EntityRef、new PioneerPublicApi.Vector3、super、this.addModifiedState、this.getEntity等。
   */
  constructor(t, e) {
    super(t, e);
    this._groundEntityRef = new PioneerPublicApi.EntityRef(this.getEntity().getScene());
    this._distanceFromGround = 0;
    this._up = new PioneerPublicApi.Vector3(0, 0, 1);
    this._clampOnlyIfBelow = false;
    this.addModifiedState("position");
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._groundEntityRef.getName`、`this._groundEntityRef.setName`、`this.addDependentState`、`this.removeDependentState`。
   * 调用线索：this._groundEntityRef.getName、this._groundEntityRef.setName、this.addDependentState、this.removeDependentState。
   */
  setGroundEntityRef(t) {
    this.removeDependentState(this._groundEntityRef.getName(), "orientation");
    this.removeDependentState(this._groundEntityRef.getName(), "ground");
    this._groundEntityRef.setName(t);
    this.addDependentState(t, "orientation");
    this.addDependentState(t, "ground");
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._distanceFromGround`。
   */
  getDistanceFromGround() {
    return this._distanceFromGround;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_distanceFromGround`。
   * 状态写入：_distanceFromGround。
   */
  setDistanceFromGround(distanceFromGround) {
    this._distanceFromGround = distanceFromGround;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._up`。
   */
  getUp() {
    return this._up;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._up.copy`。
   * 调用线索：this._up.copy。
   */
  setUp(t) {
    this._up.copy(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._clampOnlyIfBelow`。
   */
  getClampOnlyIfBelow() {
    return this._clampOnlyIfBelow;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_clampOnlyIfBelow`。
   * 状态写入：_clampOnlyIfBelow。
   */
  setClampOnlyIfBelow(clampOnlyIfBelow) {
    this._clampOnlyIfBelow = clampOnlyIfBelow;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `Math.abs`、`Math.min`、`PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`。
   * 调用线索：Math.abs、Math.min、PioneerPublicApi.Quaternion.pool.get、PioneerPublicApi.Quaternion.pool.release、PioneerPublicApi.Vector3.pool.get等。
   */
  __updatePositionAtTime(t, e) {
    const i = this.getEntity().getParentAtTime(e);
    const n = this.getEntity().getScene().getEntity(i);
    if (null === n) return;
    let o = this._groundEntityRef.get();
    let r = o?.getGroundComponent() ?? null;
    for (; o && !o.getGroundComponent();) {
      o = this.getEntity().getScene().getEntity(o.getParentAtTime(e));
      r = o?.getGroundComponent() ?? null;
    }
    if (!o || !r) return;
    const a = PioneerPublicApi.Vector3.pool.get();
    const l = PioneerPublicApi.Vector3.pool.get();
    const c = PioneerPublicApi.Vector3.pool.get();
    const h = PioneerPublicApi.Quaternion.pool.get();
    if (o.getOrientationAtTime(h, e), n.getPositionRelativeToEntity(a, t, o, e), a.rotateInverse(h, a), l.copy(PioneerPublicApi.Vector3.NaN), r.getGroundPosition(l, c, a), !l.isNaN()) {
      const i = PioneerPublicApi.Vector3.pool.get();
      const r = PioneerPublicApi.Quaternion.pool.get();
      this.getEntity().getOrientationAtTime(r, e);
      i.rotate(r, this._up);
      PioneerPublicApi.Quaternion.pool.release(r);
      i.rotateInverse(h, i);
      const d = Math.abs(i.dot(c));
      PioneerPublicApi.Vector3.pool.release(i);
      const u = Math.min(this._distanceFromGround / d, this._distanceFromGround + this.getEntity().getExtentsRadius());
      l.addMult(l, c, u);
      (!this._clampOnlyIfBelow || a.dot(c) - l.dot(c) < 0) && (a.rotate(h, l), o.getPositionRelativeToEntity(t, a, n, e));
    }
    PioneerPublicApi.Vector3.pool.release(a);
    PioneerPublicApi.Vector3.pool.release(l);
    PioneerPublicApi.Vector3.pool.release(c);
    PioneerPublicApi.Quaternion.pool.release(h);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `Math.abs`、`Math.min`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`e.dot`、`e.getGroundPosition`。
   * 调用线索：Math.abs、Math.min、PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、e.dot等。
   */
  __update() {
    if (null === this.getEntity().getParent()) return;
    let t = this._groundEntityRef.get();
    let e = t?.getGroundComponent() ?? null;
    for (; t && !t.getGroundComponent();) {
      t = t.getParent();
      e = t?.getGroundComponent() ?? null;
    }
    if (!t || !e) return;
    const i = PioneerPublicApi.Vector3.pool.get();
    const n = PioneerPublicApi.Vector3.pool.get();
    const o = PioneerPublicApi.Vector3.pool.get();
    if (this.getEntity().getPositionRelativeToEntity(i, PioneerPublicApi.Vector3.Zero, t), i.rotateInverse(t.getOrientation(), i), n.copy(PioneerPublicApi.Vector3.NaN), e.getGroundPosition(n, o, i), !n.isNaN()) {
      const e = PioneerPublicApi.Vector3.pool.get();
      e.rotate(this.getEntity().getOrientation(), this._up);
      e.rotateInverse(t.getOrientation(), e);
      const r = Math.abs(e.dot(o));
      PioneerPublicApi.Vector3.pool.release(e);
      const a = Math.min(this._distanceFromGround / r, this._distanceFromGround + this.getEntity().getExtentsRadius());
      n.addMult(n, o, a);
      const l = this.getEntity().getParent();
      (!this._clampOnlyIfBelow || i.dot(o) - n.dot(o) < 0) && l && (i.rotate(t.getOrientation(), n), t.getPositionRelativeToEntity(i, i, l), this.getEntity().setPosition(i));
    }
    PioneerPublicApi.Vector3.pool.release(i);
    PioneerPublicApi.Vector3.pool.release(n);
    PioneerPublicApi.Vector3.pool.release(o);
  }
  _groundEntityRef;
  _distanceFromGround;
  _up;
  _clampOnlyIfBelow;
}
export { GroundClampController };
