/** @eyes-analysis
 * 文件职责：按输入增量旋转实体或相机目标。
 * 依据：import ../pioneer/public-api.js；RotateController extends PioneerPublicApi.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:514753-517750.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：按输入增量旋转实体或相机目标。
 * 继承：PioneerPublicApi.BaseController；导出：RotateController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class RotateController extends PioneerPublicApi.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_joint`、`_jointObject`、`_jointObjectIndex`、`_model`、`_rotatingOrientation`、`_rotatingPosition`、`_rotation`；调用 `new PioneerPublicApi.Quaternion`、`super`、`this.addModifiedState`。
   * 状态写入：_joint、_jointObject、_jointObjectIndex、_model、_rotatingOrientation、_rotatingPosition、_rotation。
   * 调用线索：new PioneerPublicApi.Quaternion、super、this.addModifiedState。
   */
  constructor(t, e) {
    super(t, e);
    this._rotation = new PioneerPublicApi.Quaternion();
    this._rotatingPosition = true;
    this._rotatingOrientation = true;
    this._joint = "";
    this._jointObject = null;
    this._jointObjectIndex = 0;
    this._model = null;
    this.addModifiedState("position");
    this.addModifiedState("velocity");
    this.addModifiedState("orientation");
    this.addModifiedState("angularVelocity");
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._rotation`。
   */
  getRotation() {
    return this._rotation;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._rotation.copy`。
   * 调用线索：this._rotation.copy。
   */
  setRotation(t) {
    this._rotation.copy(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._rotatingPosition`。
   */
  isRotatingPosition() {
    return this._rotatingPosition;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_rotatingPosition`；调用 `this._updateModifiedStates`。
   * 状态写入：_rotatingPosition。
   * 调用线索：this._updateModifiedStates。
   */
  setRotatingPosition(rotatingPosition) {
    this._rotatingPosition = rotatingPosition;
    this._updateModifiedStates();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._rotatingOrientation`。
   */
  isRotatingOrientation() {
    return this._rotatingOrientation;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_rotatingOrientation`；调用 `this._updateModifiedStates`。
   * 状态写入：_rotatingOrientation。
   * 调用线索：this._updateModifiedStates。
   */
  setRotatingOrientation(rotatingOrientation) {
    this._rotatingOrientation = rotatingOrientation;
    this._updateModifiedStates();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_joint`、`_model`；调用 `this._updateModifiedStates`、`this.getEntity`、`this.getEntity().getComponent`。
   * 状态写入：_joint、_model。
   * 调用线索：this._updateModifiedStates、this.getEntity、this.getEntity().getComponent。
   */
  setJoint(joint, model) {
    if (this._joint = joint, model) this._model = model;else {
      const t = this.getEntity().getComponent(PioneerPublicApi.ModelComponent);
      null !== t && (this._model = t);
    }
    this._updateModifiedStates();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.rotate`。
   * 调用线索：t.rotate。
   */
  __updatePositionAtTime(t, e) {
    this._rotatingPosition && "" === this._joint && t.rotate(this._rotation, t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.rotate`。
   * 调用线索：t.rotate。
   */
  __updateVelocityAtTime(t, e) {
    this._rotatingPosition && "" === this._joint && t.rotate(this._rotation, t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.mult`。
   * 调用线索：t.mult。
   */
  __updateOrientationAtTime(t, e) {
    this._rotatingOrientation && "" === this._joint && t.mult(this._rotation, t);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_jointObject`、`_jointObjectIndex`；调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.ThreeJsHelper.setOrientation`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`e.rotate`。
   * 状态写入：_jointObject、_jointObjectIndex。
   * 调用线索：PioneerPublicApi.Quaternion.pool.get、PioneerPublicApi.Quaternion.pool.release、PioneerPublicApi.ThreeJsHelper.setOrientation、PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release等。
   */
  __update() {
    if ("" === this._joint) {
      if (this._rotatingPosition) {
        const t = PioneerPublicApi.Vector3.pool.get();
        t.rotate(this._rotation, this.getEntity().getPosition());
        this.getEntity().setPosition(t);
        PioneerPublicApi.Vector3.pool.release(t);
        const e = PioneerPublicApi.Vector3.pool.get();
        e.rotate(this._rotation, this.getEntity().getVelocity());
        this.getEntity().setVelocity(e);
        PioneerPublicApi.Vector3.pool.release(e);
      }
      if (this._rotatingOrientation) {
        const t = PioneerPublicApi.Quaternion.pool.get();
        t.mult(this._rotation, this.getEntity().getOrientation());
        this.getEntity().setOrientation(t);
        PioneerPublicApi.Quaternion.pool.release(t);
        const e = PioneerPublicApi.Vector3.pool.get();
        e.rotate(this._rotation, this.getEntity().getAngularVelocity());
        this.getEntity().setAngularVelocity(e);
        PioneerPublicApi.Vector3.pool.release(e);
      }
    } else {
      if (null !== this._jointObject && this._model?.getThreeJsObjects()[this._jointObjectIndex] !== this._jointObject && (this._jointObject = null), "" !== this._joint && (null === this._jointObject || this._jointObject.name !== this._joint) && null !== this._model) {
        const jointObject = this._model.getThreeJsObjectByName(this._joint);
        null !== jointObject && (this._jointObject = jointObject, this._jointObjectIndex = this._model.getThreeJsObjects().indexOf(this._jointObject));
      }
      this._jointObject && PioneerPublicApi.ThreeJsHelper.setOrientation(this._jointObject, this._rotation);
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.addModifiedState`、`this.removeModifiedState`。
   * 调用线索：this.addModifiedState、this.removeModifiedState。
   */
  _updateModifiedStates() {
    "" === this._joint && this._rotatingOrientation ? (this.addModifiedState("orientation"), this.addModifiedState("angularVelocity")) : (this.removeModifiedState("orientation"), this.removeModifiedState("angularVelocity"));
    "" === this._joint && this._rotatingPosition ? (this.addModifiedState("position"), this.addModifiedState("velocity")) : (this.removeModifiedState("position"), this.removeModifiedState("velocity"));
  }
  _rotation;
  _rotatingPosition;
  _rotatingOrientation;
  _joint;
  _jointObject;
  _jointObjectIndex;
  _model;
}
export { RotateController };
