/** @eyes-analysis
 * 文件职责：把位置/姿态按另一个实体的姿态旋转，补充父层级只做平移的参考系行为。
 * 依据：import ../pioneer/public-api.js；RotateByEntityOrientationController extends PioneerPublicApi.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:517751-520916.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：把位置/姿态按另一个实体的姿态旋转，补充父层级只做平移的参考系行为。
 * 继承：PioneerPublicApi.BaseController；导出：RotateByEntityOrientationController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class RotateByEntityOrientationController extends PioneerPublicApi.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_entityRef`、`_rotatingOrientation`、`_rotatingPosition`；调用 `new PioneerPublicApi.EntityRef`、`super`、`this.addDependentState`、`this.addModifiedState`、`this.getEntity`、`this.getEntity().getScene`。
   * 状态写入：_entityRef、_rotatingOrientation、_rotatingPosition。
   * 调用线索：new PioneerPublicApi.EntityRef、super、this.addDependentState、this.addModifiedState、this.getEntity等。
   */
  constructor(t, e) {
    super(t, e);
    this._entityRef = new PioneerPublicApi.EntityRef(this.getEntity().getScene());
    this._rotatingPosition = true;
    this._rotatingOrientation = true;
    this.addModifiedState("position");
    this.addModifiedState("velocity");
    this.addModifiedState("orientation");
    this.addModifiedState("angularVelocity");
    this.addDependentState("parent", "orientation");
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._entityRef.getName`、`this._entityRef.setName`、`this.addDependentState`、`this.removeDependentState`。
   * 调用线索：this._entityRef.getName、this._entityRef.setName、this.addDependentState、this.removeDependentState。
   */
  setEntityForOrientation(t) {
    "" !== this._entityRef.getName() ? this.removeDependentState(this._entityRef.getName(), "orientation") : this.removeDependentState("parent", "orientation");
    this._entityRef.setName(t);
    "" !== this._entityRef.getName() ? this.addDependentState(t, "orientation") : this.addDependentState("parent", "orientation");
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._rotatingPosition`。
   */
  isRotatingPosition() {
    return this._rotatingPosition;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_rotatingPosition`；调用 `this.addModifiedState`、`this.removeModifiedState`。
   * 状态写入：_rotatingPosition。
   * 调用线索：this.addModifiedState、this.removeModifiedState。
   */
  setRotatingPosition(rotatingPosition) {
    this._rotatingPosition = rotatingPosition;
    rotatingPosition ? (this.addModifiedState("position"), this.addModifiedState("velocity")) : (this.removeModifiedState("position"), this.removeModifiedState("velocity"));
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._rotatingOrientation`。
   */
  isRotatingOrientation() {
    return this._rotatingOrientation;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_rotatingOrientation`；调用 `this.addModifiedState`、`this.removeModifiedState`。
   * 状态写入：_rotatingOrientation。
   * 调用线索：this.addModifiedState、this.removeModifiedState。
   */
  setRotatingOrientation(rotatingOrientation) {
    this._rotatingOrientation = rotatingOrientation;
    rotatingOrientation ? (this.addModifiedState("orientation"), this.addModifiedState("angularVelocity")) : (this.removeModifiedState("orientation"), this.removeModifiedState("angularVelocity"));
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`i.getOrientationAtTime`、`t.rotate`、`this._entityRef.get`、`this._entityRef.getName`。
   * 调用线索：PioneerPublicApi.Quaternion.pool.get、PioneerPublicApi.Quaternion.pool.release、i.getOrientationAtTime、t.rotate、this._entityRef.get等。
   */
  __updatePositionAtTime(t, e) {
    if (this._rotatingPosition) {
      const i = "" !== this._entityRef.getName() ? this._entityRef.get() : this.getEntity().getScene().getEntity(this.getEntity().getParentAtTime(e));
      if (null !== i) {
        const n = PioneerPublicApi.Quaternion.pool.get();
        i.getOrientationAtTime(n, e);
        t.rotate(n, t);
        PioneerPublicApi.Quaternion.pool.release(n);
      }
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`i.getOrientationAtTime`、`t.rotate`、`this._entityRef.get`、`this._entityRef.getName`。
   * 调用线索：PioneerPublicApi.Quaternion.pool.get、PioneerPublicApi.Quaternion.pool.release、i.getOrientationAtTime、t.rotate、this._entityRef.get等。
   */
  __updateVelocityAtTime(t, e) {
    if (this._rotatingPosition) {
      const i = "" !== this._entityRef.getName() ? this._entityRef.get() : this.getEntity().getScene().getEntity(this.getEntity().getParentAtTime(e));
      if (null !== i) {
        const n = PioneerPublicApi.Quaternion.pool.get();
        i.getOrientationAtTime(n, e);
        t.rotate(n, t);
        PioneerPublicApi.Quaternion.pool.release(n);
      }
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`i.getOrientationAtTime`、`t.mult`、`this._entityRef.get`、`this._entityRef.getName`。
   * 调用线索：PioneerPublicApi.Quaternion.pool.get、PioneerPublicApi.Quaternion.pool.release、i.getOrientationAtTime、t.mult、this._entityRef.get等。
   */
  __updateOrientationAtTime(t, e) {
    if (this._rotatingOrientation) {
      const i = "" !== this._entityRef.getName() ? this._entityRef.get() : this.getEntity().getScene().getEntity(this.getEntity().getParentAtTime(e));
      if (null !== i) {
        const n = PioneerPublicApi.Quaternion.pool.get();
        i.getOrientationAtTime(n, e);
        t.mult(n, t);
        PioneerPublicApi.Quaternion.pool.release(n);
      }
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`e.mult`、`e.rotate`。
   * 调用线索：PioneerPublicApi.Quaternion.pool.get、PioneerPublicApi.Quaternion.pool.release、PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、e.mult等。
   */
  __update() {
    const t = "" !== this._entityRef.getName() ? this._entityRef.get() : this.getEntity().getParent();
    if (null !== t) {
      if (this._rotatingPosition) {
        const e = PioneerPublicApi.Vector3.pool.get();
        e.rotate(t.getOrientation(), this.getEntity().getPosition());
        this.getEntity().setPosition(e);
        PioneerPublicApi.Vector3.pool.release(e);
        const i = PioneerPublicApi.Vector3.pool.get();
        i.rotate(t.getOrientation(), this.getEntity().getVelocity());
        this.getEntity().setVelocity(i);
        PioneerPublicApi.Vector3.pool.release(i);
      }
      if (this._rotatingOrientation) {
        const e = PioneerPublicApi.Quaternion.pool.get();
        e.mult(t.getOrientation(), this.getEntity().getOrientation());
        this.getEntity().setOrientation(e);
        PioneerPublicApi.Quaternion.pool.release(e);
        const i = PioneerPublicApi.Vector3.pool.get();
        i.rotate(t.getOrientation(), this.getEntity().getAngularVelocity());
        this.getEntity().setAngularVelocity(i);
        PioneerPublicApi.Vector3.pool.release(i);
      }
    }
  }
  _entityRef;
  _rotatingPosition;
  _rotatingOrientation;
}
export { RotateByEntityOrientationController };
