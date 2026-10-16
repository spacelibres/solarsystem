/** @eyes-analysis
 * 文件职责：围绕指定轴按参考时刻和角速率计算实体姿态。
 * 依据：import ../pioneer/public-api.js；SpinController extends PioneerPublicApi.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:523363-527918.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：围绕指定轴按参考时刻和角速率计算实体姿态。
 * 继承：PioneerPublicApi.BaseController；导出：SpinController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class SpinController extends PioneerPublicApi.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_axis`、`_axisRelativeToEntity`、`_clampedToRealTime`、`_joint`、`_jointObject`、`_jointObjectIndex`、`_lastTime`、`_model`；调用 `e.getScene`、`e.getScene().getEngine`、`e.getScene().getEngine().getTime`、`new PioneerPublicApi.Vector3`、`super`、`this.addModifiedState`。
   * 状态写入：_axis、_axisRelativeToEntity、_clampedToRealTime、_joint、_jointObject、_jointObjectIndex、_lastTime、_model等；完整记录见索引。
   * 调用线索：e.getScene、e.getScene().getEngine、e.getScene().getEngine().getTime、new PioneerPublicApi.Vector3、super等。
   */
  constructor(t, e) {
    super(t, e);
    this._axis = new PioneerPublicApi.Vector3(0, 0, 1);
    this._axisRelativeToEntity = true;
    this._rate = 0;
    this._referenceAngle = 0;
    this._referenceTime = void 0;
    this._clampedToRealTime = false;
    this._usingRealTime = false;
    this._rotatingPosition = false;
    this._joint = "";
    this._jointObject = null;
    this._jointObjectIndex = 0;
    this._model = null;
    this._lastTime = e.getScene().getEngine().getTime();
    this.addModifiedState("orientation");
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._axis`。
   */
  getAxis() {
    return this._axis;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._axisRelativeToEntity`。
   */
  isAxisRelativeToEntity() {
    return this._axisRelativeToEntity;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_axisRelativeToEntity`；调用 `this._axis.copy`。
   * 状态写入：_axisRelativeToEntity。
   * 调用线索：this._axis.copy。
   */
  setAxis(t, axisRelativeToEntity) {
    this._axis.copy(t);
    this._axisRelativeToEntity = axisRelativeToEntity;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._rate`。
   */
  getRate() {
    return this._rate;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_rate`。
   * 状态写入：_rate。
   */
  setRate(rate) {
    this._rate = rate;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._referenceAngle`。
   */
  getReferenceAngle() {
    return this._referenceAngle;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_referenceAngle`。
   * 状态写入：_referenceAngle。
   */
  setReferenceAngle(referenceAngle) {
    this._referenceAngle = referenceAngle;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._referenceTime`。
   */
  getReferenceTime() {
    return this._referenceTime;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_referenceTime`。
   * 状态写入：_referenceTime。
   */
  setReferenceTime(referenceTime) {
    this._referenceTime = referenceTime;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._clampedToRealTime`。
   */
  isClampedToRealTime() {
    return this._clampedToRealTime;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_clampedToRealTime`。
   * 状态写入：_clampedToRealTime。
   */
  setClampedToRealTime(clampedToRealTime) {
    this._clampedToRealTime = clampedToRealTime;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._usingRealTime`。
   */
  isUsingRealTime() {
    return this._usingRealTime;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_usingRealTime`。
   * 状态写入：_usingRealTime。
   */
  setUsingRealTime(usingRealTime) {
    this._usingRealTime = usingRealTime;
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
    rotatingPosition ? this.addModifiedState("position") : this.removeModifiedState("position");
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_joint`、`_model`；调用 `this.addModifiedState`、`this.getEntity`、`this.getEntity().getComponent`、`this.removeModifiedState`。
   * 状态写入：_joint、_model。
   * 调用线索：this.addModifiedState、this.getEntity、this.getEntity().getComponent、this.removeModifiedState。
   */
  setJoint(joint, model) {
    if (this._joint = joint, model) this._model = model;else {
      const t = this.getEntity().getComponent(PioneerPublicApi.ModelComponent);
      null !== t && (this._model = t);
    }
    "" !== this._joint ? (this.removeModifiedState("orientation"), this.removeModifiedState("position")) : (this.addModifiedState("orientation"), this._rotatingPosition && this.addModifiedState("position"));
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`n.mult`、`n.multInverseR`、`n.setFromAxisAngle`、`t.rotate`。
   * 调用线索：PioneerPublicApi.Quaternion.pool.get、PioneerPublicApi.Quaternion.pool.release、n.mult、n.multInverseR、n.setFromAxisAngle等。
   */
  __updatePositionAtTime(t, e) {
    if (this._rotatingPosition) {
      let i = 0;
      this._usingRealTime || void 0 !== this._referenceTime && (i = e - this._referenceTime, i -= this._referenceAngle / this._rate);
      const n = PioneerPublicApi.Quaternion.pool.get();
      if (n.setFromAxisAngle(this._axis, this._rate * i), null === this._jointObject) {
        if (this._axisRelativeToEntity) {
          const t = PioneerPublicApi.Quaternion.pool.get();
          this.getEntity().getOrientationAtTime(t, e);
          n.mult(t, n);
          n.multInverseR(n, t);
          PioneerPublicApi.Quaternion.pool.release(t);
        }
        t.rotate(n, t);
      }
      PioneerPublicApi.Quaternion.pool.release(n);
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`n.mult`、`n.multInverseR`、`n.setFromAxisAngle`、`t.copy`。
   * 调用线索：PioneerPublicApi.Quaternion.pool.get、PioneerPublicApi.Quaternion.pool.release、n.mult、n.multInverseR、n.setFromAxisAngle等。
   */
  __updateOrientationAtTime(t, e) {
    t.isNaN() && t.copy(PioneerPublicApi.Quaternion.Identity);
    let i = 0;
    this._usingRealTime || void 0 !== this._referenceTime && (i = e - this._referenceTime, i -= this._referenceAngle / this._rate);
    const n = PioneerPublicApi.Quaternion.pool.get();
    n.setFromAxisAngle(this._axis, this._rate * i);
    null === this._jointObject && (this._axisRelativeToEntity && (n.mult(t, n), n.multInverseR(n, t)), t.mult(n, t), t.normalize(t));
    PioneerPublicApi.Quaternion.pool.release(n);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_jointObject`、`_jointObjectIndex`、`_lastTime`；调用 `PioneerPublicApi.MathUtils.clamp`、`PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.Quaternion.threeJsPool.get`、`PioneerPublicApi.Quaternion.threeJsPool.release`、`PioneerPublicApi.Vector3.pool.get`。
   * 状态写入：_jointObject、_jointObjectIndex、_lastTime。
   * 调用线索：PioneerPublicApi.MathUtils.clamp、PioneerPublicApi.Quaternion.pool.get、PioneerPublicApi.Quaternion.pool.release、PioneerPublicApi.Quaternion.threeJsPool.get、PioneerPublicApi.Quaternion.threeJsPool.release等。
   */
  __update() {
    this.getEntity().getOrientation().isNaN() && this.getEntity().setOrientation(PioneerPublicApi.Quaternion.Identity);
    const t = this.getEntity().getScene().getEngine();
    let e;
    if (this._usingRealTime) e = t.getDeltaTime();else if (void 0 !== this._referenceTime) {
      e = t.getTime() - this._referenceTime;
      e -= this._referenceAngle / this._rate;
    } else if (e = t.getTime() - this._lastTime, this._clampedToRealTime) {
      const i = t.getDeltaTime();
      e = PioneerPublicApi.MathUtils.clamp(e, -i, i);
    }
    const i = PioneerPublicApi.Quaternion.pool.get();
    if (i.setFromAxisAngle(this._axis, this._rate * e), null !== this._jointObject && this._model?.getThreeJsObjects()[this._jointObjectIndex] !== this._jointObject && (this._jointObject = null), "" !== this._joint && (null === this._jointObject || this._jointObject.name !== this._joint) && null !== this._model) {
      const jointObject = this._model.getThreeJsObjectByName(this._joint);
      null !== jointObject && (this._jointObject = jointObject, this._jointObjectIndex = this._model.getThreeJsObjects().indexOf(this._jointObject));
    }
    const n = this.getEntity().getOrientation();
    if (null !== this._jointObject) {
      this._axisRelativeToEntity || (i.multInverseL(n, i), i.mult(i, n));
      const t = PioneerPublicApi.Quaternion.threeJsPool.get();
      t.set(i.x, i.y, i.z, i.w);
      this._jointObject.quaternion.multiplyQuaternions(t, this._jointObject.quaternion);
      this._rotatingPosition && this._jointObject.position.applyQuaternion(t);
      PioneerPublicApi.Quaternion.threeJsPool.release(t);
    } else {
      const t = PioneerPublicApi.Quaternion.pool.get();
      this._axisRelativeToEntity && (i.mult(n, i), i.multInverseR(i, n));
      t.mult(i, n);
      t.normalize(t);
      const e = PioneerPublicApi.Vector3.pool.get();
      if (e.mult(this._axis, this._rate), this._axisRelativeToEntity && e.rotate(t, e), this.getEntity().setOrientation(t), this.getEntity().setAngularVelocity(e), PioneerPublicApi.Vector3.pool.release(e), PioneerPublicApi.Quaternion.pool.release(t), this._rotatingPosition) {
        const t = PioneerPublicApi.Vector3.pool.get();
        t.rotate(i, this.getEntity().getPosition());
        this.getEntity().setPosition(t);
        PioneerPublicApi.Vector3.pool.release(t);
      }
    }
    PioneerPublicApi.Quaternion.pool.release(i);
    this._lastTime = t.getTime();
  }
  _axis;
  _axisRelativeToEntity;
  _rate;
  _referenceAngle;
  _referenceTime;
  _clampedToRealTime;
  _usingRealTime;
  _rotatingPosition;
  _joint;
  _jointObject;
  _jointObjectIndex;
  _model;
  _lastTime;
}
export { SpinController };
