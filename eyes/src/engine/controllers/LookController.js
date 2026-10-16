/** @eyes-analysis
 * 文件职责：消费鼠标/触摸输入以改变相机观察方向。
 * 依据：import ../pioneer/public-api.js；LookController extends PioneerPublicApi.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:488242-492628.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：消费鼠标/触摸输入以改变相机观察方向。
 * 继承：PioneerPublicApi.BaseController；导出：LookController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class LookController extends PioneerPublicApi.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_dragSensitivity`、`_dragSmoothness`、`_pitchAngleSmoothedValue`、`_yawAngleSmoothedValue`、`_yawAxisEntity`、`_yawAxisType`；调用 `super`、`this.addModifiedState`。
   * 状态写入：_dragSensitivity、_dragSmoothness、_pitchAngleSmoothedValue、_yawAngleSmoothedValue、_yawAxisEntity、_yawAxisType。
   * 调用线索：super、this.addModifiedState。
   */
  constructor(t, e) {
    super(t, e);
    this._dragSensitivity = .01;
    this._dragSmoothness = .8;
    this._yawAngleSmoothedValue = 0;
    this._pitchAngleSmoothedValue = 0;
    this._yawAxisType = "none";
    this._yawAxisEntity = null;
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
   * 【结构证据】写入 `_pitchAngleSmoothedValue`、`_yawAngleSmoothedValue`、`_yawAxisEntity`；调用 `Math.abs`、`Math.min`、`PioneerPublicApi.MathUtils.lerp`、`PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.Vector3.pool.get`。
   * 状态写入：_pitchAngleSmoothedValue、_yawAngleSmoothedValue、_yawAxisEntity。
   * 调用线索：Math.abs、Math.min、PioneerPublicApi.MathUtils.lerp、PioneerPublicApi.Quaternion.pool.get、PioneerPublicApi.Quaternion.pool.release等。
   */
  __update() {
    null === this._yawAxisEntity && (this._yawAxisEntity = this.getEntity().getParent(), null !== this._yawAxisEntity && (["x-axis", "y-axis", "z-axis"].includes(this._yawAxisType) ? this.addDependentState(this._yawAxisEntity.getName(), "orientation") : "position" === this._yawAxisType && this.addDependentState(this._yawAxisEntity.getName(), "position")));
    this.getEntity().getOrientation().isNaN() && this.getEntity().setOrientation(PioneerPublicApi.Quaternion.Identity);
    const t = this.getEntity().getScene().getEngine().getInput();
    let e = 1;
    t.isKeyPressed("x") && (e = .05);
    const i = this.getEntity().getComponent(PioneerPublicApi.CameraComponent);
    null !== i && (e *= Math.min(1, i.getFieldOfView()));
    let n = 0;
    let o = 0;
    const r = t.getActiveViewport();
    if (null !== r) {
      const i = r.getCamera();
      if (null !== i && i.getEntity() === this.getEntity()) {
        const i = t.getDraggedOffset();
        n = -i.x * this._dragSensitivity * e;
        o = -i.y * this._dragSensitivity * e;
      }
    }
    this._yawAngleSmoothedValue = PioneerPublicApi.MathUtils.lerp(n, this._yawAngleSmoothedValue, this._dragSmoothness);
    this._pitchAngleSmoothedValue = PioneerPublicApi.MathUtils.lerp(o, this._pitchAngleSmoothedValue, this._dragSmoothness);
    Math.abs(this._yawAngleSmoothedValue) < 1e-4 * e && (this._yawAngleSmoothedValue = 0);
    Math.abs(this._pitchAngleSmoothedValue) < 1e-4 * e && (this._pitchAngleSmoothedValue = 0);
    const a = PioneerPublicApi.Vector3.pool.get();
    "x-axis" === this._yawAxisType && null !== this._yawAxisEntity ? this._yawAxisEntity.getOrientation().getAxis(a, 0) : "y-axis" === this._yawAxisType && null !== this._yawAxisEntity ? this._yawAxisEntity.getOrientation().getAxis(a, 1) : "z-axis" === this._yawAxisType && null !== this._yawAxisEntity ? this._yawAxisEntity.getOrientation().getAxis(a, 2) : "position" === this._yawAxisType && null !== this._yawAxisEntity ? a.normalize(this._yawAxisEntity.getPosition()) : this.getEntity().getOrientation().getAxis(a, 2);
    a.isNaN() && this.getEntity().getOrientation().getAxis(a, 2);
    const l = PioneerPublicApi.Quaternion.pool.get();
    l.copy(this.getEntity().getOrientation());
    const c = PioneerPublicApi.Quaternion.pool.get();
    const h = PioneerPublicApi.Vector3.pool.get();
    const d = PioneerPublicApi.Vector3.pool.get();
    this.getEntity().getOrientation().getAxis(d, 1);
    this.getEntity().getOrientation().getAxis(h, 2);
    const u = h.angleAroundAxis(a, d);
    c.setFromAxisAngle(d, u);
    c.normalize(c);
    l.mult(c, l);
    PioneerPublicApi.Vector3.pool.release(h);
    PioneerPublicApi.Vector3.pool.release(d);
    const p = PioneerPublicApi.Vector3.pool.get();
    l.getAxis(p, 0);
    c.setFromAxisAngle(p, this._pitchAngleSmoothedValue);
    l.mult(c, l);
    PioneerPublicApi.Vector3.pool.release(p);
    c.setFromAxisAngle(a, this._yawAngleSmoothedValue);
    l.mult(c, l);
    PioneerPublicApi.Vector3.pool.release(a);
    PioneerPublicApi.Quaternion.pool.release(c);
    this.getEntity().setOrientation(l);
    PioneerPublicApi.Quaternion.pool.release(l);
  }
  _dragSensitivity;
  _dragSmoothness;
  _yawAngleSmoothedValue;
  _pitchAngleSmoothedValue;
  _yawAxisType;
  _yawAxisEntity;
}
export { LookController };
