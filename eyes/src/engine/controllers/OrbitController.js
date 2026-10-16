/** @eyes-analysis
 * 文件职责：围绕焦点实体维护距离、偏航、俯仰和上方向，处理鼠标/触摸轨道相机输入及约束。
 * 依据：import ../pioneer/public-api.js；OrbitController extends PioneerPublicApi.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:494121-501753.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：围绕焦点实体维护距离、偏航、俯仰和上方向，处理鼠标/触摸轨道相机输入及约束。
 * 继承：PioneerPublicApi.BaseController；导出：OrbitController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class OrbitController extends PioneerPublicApi.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_dragSensitivity`、`_dragSmoothness`、`_pitchAngleLimits`、`_pitchAxisEntity`、`_pitchAxisType`、`_pitchChangeSmoothedValue`、`_yawAngleLimits`、`_yawAxisEntity`；调用 `new PioneerPublicApi.Interval`、`super`、`this.addModifiedState`。
   * 状态写入：_dragSensitivity、_dragSmoothness、_pitchAngleLimits、_pitchAxisEntity、_pitchAxisType、_pitchChangeSmoothedValue、_yawAngleLimits、_yawAxisEntity等；完整记录见索引。
   * 调用线索：new PioneerPublicApi.Interval、super、this.addModifiedState。
   */
  constructor(t, e) {
    super(t, e);
    this._dragSensitivity = .01;
    this._dragSmoothness = .8;
    this._yawChangeSmoothedValue = 0;
    this._pitchChangeSmoothedValue = 0;
    this._yawAxisType = "none";
    this._yawAxisEntity = null;
    this._pitchAxisType = "none";
    this._pitchAxisEntity = null;
    this._yawAngleLimits = new PioneerPublicApi.Interval(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    this._pitchAngleLimits = new PioneerPublicApi.Interval(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    this.addModifiedState("position");
    this.addModifiedState("orientation");
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._dragSensitivity`。
   */
  getDragSensitivity() {
    return this._dragSensitivity;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_dragSensitivity`。
   * 状态写入：_dragSensitivity。
   */
  setDragSensitivity(dragSensitivity) {
    this._dragSensitivity = dragSensitivity;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._dragSmoothness`。
   */
  getDragSmoothness() {
    return this._dragSmoothness;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_dragSmoothness`。
   * 状态写入：_dragSmoothness。
   */
  setDragSmoothness(dragSmoothness) {
    this._dragSmoothness = dragSmoothness;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._yawAxisType`。
   */
  getYawAxisType() {
    return this._yawAxisType;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_yawAxisType`；调用 `["x-axis","y-axis","z-axis"].includes`、`this._yawAxisEntity.getName`、`this.addDependentState`、`this.removeDependentState`。
   * 状态写入：_yawAxisType。
   * 调用线索：["x-axis","y-axis","z-axis"].includes、this._yawAxisEntity.getName、this.addDependentState、this.removeDependentState。
   */
  setYawAxisType(yawAxisType) {
    this._yawAxisType !== yawAxisType && (null !== this._yawAxisEntity && (["x-axis", "y-axis", "z-axis"].includes(this._yawAxisType) ? this.removeDependentState(this._yawAxisEntity.getName(), "orientation") : "position" === this._yawAxisType && this.removeDependentState(this._yawAxisEntity.getName(), "position")), this._yawAxisType = yawAxisType, null !== this._yawAxisEntity && (["x-axis", "y-axis", "z-axis"].includes(this._yawAxisType) ? this.addDependentState(this._yawAxisEntity.getName(), "orientation") : "position" === this._yawAxisType && this.addDependentState(this._yawAxisEntity.getName(), "position")));
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._pitchAxisType`。
   */
  getPitchAxisType() {
    return this._pitchAxisType;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_pitchAxisType`；调用 `["x-axis","y-axis","z-axis"].includes`、`this._pitchAxisEntity.getName`、`this.addDependentState`、`this.removeDependentState`。
   * 状态写入：_pitchAxisType。
   * 调用线索：["x-axis","y-axis","z-axis"].includes、this._pitchAxisEntity.getName、this.addDependentState、this.removeDependentState。
   */
  setPitchAxisType(pitchAxisType) {
    this._pitchAxisType !== pitchAxisType && (null !== this._pitchAxisEntity && (["x-axis", "y-axis", "z-axis"].includes(this._pitchAxisType) ? this.removeDependentState(this._pitchAxisEntity.getName(), "orientation") : "position" === this._pitchAxisType && this.removeDependentState(this._pitchAxisEntity.getName(), "position")), this._pitchAxisType = pitchAxisType, null !== this._pitchAxisEntity && (["x-axis", "y-axis", "z-axis"].includes(this._pitchAxisType) ? this.addDependentState(this._pitchAxisEntity.getName(), "orientation") : "position" === this._pitchAxisType && this.addDependentState(this._pitchAxisEntity.getName(), "position")));
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._yawAxisEntity`。
   */
  getYawAxisEntity() {
    return this._yawAxisEntity;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_yawAxisEntity`；调用 `["x-axis","y-axis","z-axis"].includes`、`this._yawAxisEntity.getName`、`this.addDependentState`、`this.removeDependentState`。
   * 状态写入：_yawAxisEntity。
   * 调用线索：["x-axis","y-axis","z-axis"].includes、this._yawAxisEntity.getName、this.addDependentState、this.removeDependentState。
   */
  setYawAxisEntity(yawAxisEntity) {
    this._yawAxisEntity !== yawAxisEntity && (null !== this._yawAxisEntity && (["x-axis", "y-axis", "z-axis"].includes(this._yawAxisType) ? this.removeDependentState(this._yawAxisEntity.getName(), "orientation") : "position" === this._yawAxisType && this.removeDependentState(this._yawAxisEntity.getName(), "position")), this._yawAxisEntity = yawAxisEntity, null !== this._yawAxisEntity && (["x-axis", "y-axis", "z-axis"].includes(this._yawAxisType) ? this.addDependentState(this._yawAxisEntity.getName(), "orientation") : "position" === this._yawAxisType && this.addDependentState(this._yawAxisEntity.getName(), "position")));
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._pitchAxisEntity`。
   */
  getPitchAxisEntity() {
    return this._pitchAxisEntity;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_pitchAxisEntity`；调用 `["x-axis","y-axis","z-axis"].includes`、`this._pitchAxisEntity.getName`、`this.addDependentState`、`this.removeDependentState`。
   * 状态写入：_pitchAxisEntity。
   * 调用线索：["x-axis","y-axis","z-axis"].includes、this._pitchAxisEntity.getName、this.addDependentState、this.removeDependentState。
   */
  setPitchAxisEntity(pitchAxisEntity) {
    this._pitchAxisEntity !== pitchAxisEntity && (null !== this._pitchAxisEntity && (["x-axis", "y-axis", "z-axis"].includes(this._pitchAxisType) ? this.removeDependentState(this._pitchAxisEntity.getName(), "orientation") : "position" === this._pitchAxisType && this.removeDependentState(this._pitchAxisEntity.getName(), "position")), this._pitchAxisEntity = pitchAxisEntity, null !== this._pitchAxisEntity && (["x-axis", "y-axis", "z-axis"].includes(this._pitchAxisType) ? this.addDependentState(this._pitchAxisEntity.getName(), "orientation") : "position" === this._pitchAxisType && this.addDependentState(this._pitchAxisEntity.getName(), "position")));
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._yawAngleLimits`。
   */
  getYawAngleLimits() {
    return this._yawAngleLimits;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._yawAngleLimits.copy`。
   * 调用线索：this._yawAngleLimits.copy。
   */
  setYawAngleLimits(t) {
    this._yawAngleLimits.copy(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._pitchAngleLimits`。
   */
  getPitchAngleLimits() {
    return this._pitchAngleLimits;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._pitchAngleLimits.copy`。
   * 调用线索：this._pitchAngleLimits.copy。
   */
  setPitchAngleLimits(t) {
    this._pitchAngleLimits.copy(t);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_pitchAxisEntity`、`_pitchChangeSmoothedValue`、`_yawAxisEntity`、`_yawChangeSmoothedValue`；返回 `void`；调用 `Math.abs`、`Math.min`、`PioneerPublicApi.Geometry.getLLAFromXYZOnSphere`、`PioneerPublicApi.Geometry.getXYZFromLLAOnSphere`、`PioneerPublicApi.LatLonAlt.pool.get`、`PioneerPublicApi.LatLonAlt.pool.release`。
   * 状态写入：_pitchAxisEntity、_pitchChangeSmoothedValue、_yawAxisEntity、_yawChangeSmoothedValue。
   * 调用线索：Math.abs、Math.min、PioneerPublicApi.Geometry.getLLAFromXYZOnSphere、PioneerPublicApi.Geometry.getXYZFromLLAOnSphere、PioneerPublicApi.LatLonAlt.pool.get等。
   */
  __update() {
    const t = this.getEntity().getParent();
    if (!t) return;
    this.getEntity().getOrientation().isNaN() && this.getEntity().setOrientation(PioneerPublicApi.Quaternion.Identity);
    this.getEntity().getPosition().isNaN() && this.getEntity().setPosition(new PioneerPublicApi.Vector3(0, -1, 0));
    const e = this.getEntity().getScene().getEngine().getInput();
    let i = 1;
    e.isKeyPressed("x") && (i = .05);
    e.isShiftPressed() && (i = 5);
    const n = this.getEntity().getComponent(PioneerPublicApi.CameraComponent);
    null !== n && (i *= Math.min(1, n.getFieldOfView()));
    let o = 0;
    let r = 0;
    const a = e.getActiveViewport();
    if (null !== a) {
      const t = a.getCamera();
      if (null !== t && t.getEntity() === this.getEntity()) {
        const t = e.getDraggedOffset();
        o = -t.x * this._dragSensitivity * i;
        r = t.y * this._dragSensitivity * i;
        e.isKeyPressed("d") && (o += this._dragSensitivity * i);
        e.isKeyPressed("a") && (o -= this._dragSensitivity * i);
        e.isKeyPressed("e") && (r -= this._dragSensitivity * i);
        e.isKeyPressed("q") && (r += this._dragSensitivity * i);
      }
    }
    this._yawChangeSmoothedValue = PioneerPublicApi.MathUtils.lerp(o, this._yawChangeSmoothedValue, this._dragSmoothness);
    this._pitchChangeSmoothedValue = PioneerPublicApi.MathUtils.lerp(r, this._pitchChangeSmoothedValue, this._dragSmoothness);
    Math.abs(this._yawChangeSmoothedValue) < 1e-4 * i && (this._yawChangeSmoothedValue = 0);
    Math.abs(this._pitchChangeSmoothedValue) < 1e-4 * i && (this._pitchChangeSmoothedValue = 0);
    const l = PioneerPublicApi.Vector3.pool.get();
    this._yawAxisEntity ??= this.getEntity().getParent();
    "x-axis" === this._yawAxisType && null !== this._yawAxisEntity ? this._yawAxisEntity.getOrientation().getAxis(l, 0) : "y-axis" === this._yawAxisType && null !== this._yawAxisEntity ? this._yawAxisEntity.getOrientation().getAxis(l, 1) : "z-axis" === this._yawAxisType && null !== this._yawAxisEntity ? this._yawAxisEntity.getOrientation().getAxis(l, 2) : "position" === this._yawAxisType && null !== this._yawAxisEntity ? l.normalize(this._yawAxisEntity.getPosition()) : this.getEntity().getOrientation().getAxis(l, 2);
    (l.isNaN() || l.isZero()) && this.getEntity().getOrientation().getAxis(l, 2);
    const c = PioneerPublicApi.Vector3.pool.get();
    this._pitchAxisEntity ??= this.getEntity().getParent();
    "x-axis" === this._pitchAxisType && null !== this._pitchAxisEntity ? this._pitchAxisEntity.getOrientation().getAxis(c, 0) : "y-axis" === this._pitchAxisType && null !== this._pitchAxisEntity ? this._pitchAxisEntity.getOrientation().getAxis(c, 1) : "z-axis" === this._pitchAxisType && null !== this._pitchAxisEntity ? this._pitchAxisEntity.getOrientation().getAxis(c, 2) : "position" === this._pitchAxisType && null !== this._pitchAxisEntity ? c.normalize(this._pitchAxisEntity.getPosition()) : this.getEntity().getOrientation().getAxis(c, 0);
    (c.isNaN() || c.isZero()) && this.getEntity().getOrientation().getAxis(c, 0);
    c.setNormalTo(l, c);
    const h = PioneerPublicApi.Quaternion.pool.get();
    h.setFromAxes(c, void 0, l);
    PioneerPublicApi.Vector3.pool.release(c);
    PioneerPublicApi.Vector3.pool.release(l);
    const d = PioneerPublicApi.Vector3.pool.get();
    d.copy(this.getEntity().getPosition());
    (d.isZero() || d.isNaN()) && (this.getEntity().getOrientation().getAxis(d, 1), d.setMagnitude(d, -1e-5));
    d.rotateInverse(h, d);
    let u = 1;
    const p = t.getGroundComponent();
    if (p) {
      const e = PioneerPublicApi.Vector3.pool.get();
      const i = PioneerPublicApi.Vector3.pool.get();
      i.rotateInverse(t.getOrientation(), this.getEntity().getPosition());
      p.getGroundPosition(e, void 0, i);
      const n = e.magnitude();
      const o = i.distance(e);
      n > 0 && (u = Math.min(o / n, 1));
      PioneerPublicApi.Vector3.pool.release(e);
      PioneerPublicApi.Vector3.pool.release(i);
    }
    const _ = PioneerPublicApi.LatLonAlt.pool.get();
    PioneerPublicApi.Geometry.getLLAFromXYZOnSphere(_, d, 0);
    _.lat += this._pitchChangeSmoothedValue * u;
    _.lon += this._yawChangeSmoothedValue * u;
    _.lat < 1e-4 - PioneerPublicApi.MathUtils.HalfPi && (_.lat = 1e-4 - PioneerPublicApi.MathUtils.HalfPi);
    _.lat > PioneerPublicApi.MathUtils.HalfPi - 1e-4 && (_.lat = PioneerPublicApi.MathUtils.HalfPi - 1e-4);
    _.lat < this._pitchAngleLimits.min && (_.lat = this._pitchAngleLimits.min);
    _.lat > this._pitchAngleLimits.max && (_.lat = this._pitchAngleLimits.max);
    _.lon < this._yawAngleLimits.min && (_.lon = this._yawAngleLimits.min);
    _.lon > this._yawAngleLimits.max && (_.lon = this._yawAngleLimits.max);
    PioneerPublicApi.Geometry.getXYZFromLLAOnSphere(d, _, 0);
    PioneerPublicApi.LatLonAlt.pool.release(_);
    d.rotate(h, d);
    PioneerPublicApi.Quaternion.pool.release(h);
    this.getEntity().setPosition(d);
    PioneerPublicApi.Vector3.pool.release(d);
  }
  _dragSensitivity;
  _dragSmoothness;
  _yawChangeSmoothedValue;
  _pitchChangeSmoothedValue;
  _yawAxisType;
  _yawAxisEntity;
  _pitchAxisType;
  _pitchAxisEntity;
  _yawAngleLimits;
  _pitchAngleLimits;
}
export { OrbitController };
