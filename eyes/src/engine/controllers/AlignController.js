/** @eyes-analysis
 * 文件职责：依据主/次轴和目标的点向、速度或轴向约束计算实体姿态，并登记目标状态依赖。
 * 依据：import ../pioneer/public-api.js；AlignController extends PioneerPublicApi.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:445336-451721.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：依据主/次轴和目标的点向、速度或轴向约束计算实体姿态，并登记目标状态依赖。
 * 继承：PioneerPublicApi.BaseController；导出：AlignController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class AlignController extends PioneerPublicApi.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_joint`、`_jointObject`、`_model`、`_modelRootId`、`_primaryAlignType`、`_primaryAxis`、`_primaryTargetAxis`、`_primaryTargetEntity`；调用 `new PioneerPublicApi.EntityRef`、`new PioneerPublicApi.Vector3`、`super`、`this._addDependentStates`、`this._primaryTargetEntity.setRefChangedCallback`、`this._removeDependentStates`。
   * 状态写入：_joint、_jointObject、_model、_modelRootId、_primaryAlignType、_primaryAxis、_primaryTargetAxis、_primaryTargetEntity等；完整记录见索引。
   * 调用线索：new PioneerPublicApi.EntityRef、new PioneerPublicApi.Vector3、super、this._addDependentStates、this._primaryTargetEntity.setRefChangedCallback等。
   */
  constructor(t, e) {
    super(t, e);
    this._primaryAlignType = "none";
    this._primaryAxis = new PioneerPublicApi.Vector3(1, 0, 0);
    this._primaryTargetEntity = new PioneerPublicApi.EntityRef(this.getEntity().getScene());
    this._primaryTargetEntity.setRefChangedCallback((t, e) => {
      t && this._removeDependentStates(t, this._primaryAlignType);
      e && this._addDependentStates(e, this._primaryAlignType);
    });
    this._primaryTargetAxis = new PioneerPublicApi.Vector3(1, 0, 0);
    this._secondaryAlignType = "none";
    this._secondaryAxis = new PioneerPublicApi.Vector3(0, 1, 0);
    this._secondaryTargetEntity = new PioneerPublicApi.EntityRef(this.getEntity().getScene());
    this._secondaryTargetEntity.setRefChangedCallback((t, e) => {
      t && this._removeDependentStates(t, this._secondaryAlignType);
      e && this._addDependentStates(e, this._secondaryAlignType);
    });
    this._secondaryTargetAxis = new PioneerPublicApi.Vector3(0, 1, 0);
    this._joint = "";
    this._jointObject = null;
    this._model = null;
    this._modelRootId = 0;
    this.addModifiedState("orientation");
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._primaryAlignType`。
   */
  getPrimaryAlignType() {
    return this._primaryAlignType;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_primaryAlignType`；返回 `void`；调用 `this._addDependentStates`、`this._primaryTargetEntity.get`、`this._removeDependentStates`。
   * 状态写入：_primaryAlignType。
   * 调用线索：this._addDependentStates、this._primaryTargetEntity.get、this._removeDependentStates。
   */
  setPrimaryAlignType(primaryAlignType) {
    if (this._primaryAlignType === primaryAlignType) return;
    const e = this._primaryTargetEntity.get();
    e && this._removeDependentStates(e, this._primaryAlignType);
    this._primaryAlignType = primaryAlignType;
    e && this._addDependentStates(e, this._primaryAlignType);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._primaryAxis`。
   */
  getPrimaryAxis() {
    return this._primaryAxis;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._primaryAxis.copy`。
   * 调用线索：this._primaryAxis.copy。
   */
  setPrimaryAxis(t) {
    this._primaryAxis.copy(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._primaryTargetEntity.getName()`；调用 `this._primaryTargetEntity.getName`。
   * 调用线索：this._primaryTargetEntity.getName。
   */
  getPrimaryTargetEntity() {
    return this._primaryTargetEntity.getName();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._primaryTargetEntity.setName`。
   * 调用线索：this._primaryTargetEntity.setName。
   */
  setPrimaryTargetEntity(t) {
    this._primaryTargetEntity.setName(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._primaryTargetAxis`。
   */
  getPrimaryTargetAxis() {
    return this._primaryTargetAxis;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._primaryTargetAxis.copy`。
   * 调用线索：this._primaryTargetAxis.copy。
   */
  setPrimaryTargetAxis(t) {
    this._primaryTargetAxis.copy(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._secondaryAlignType`。
   */
  getSecondaryAlignType() {
    return this._secondaryAlignType;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_secondaryAlignType`；返回 `void`；调用 `this._addDependentStates`、`this._removeDependentStates`、`this._secondaryTargetEntity.get`。
   * 状态写入：_secondaryAlignType。
   * 调用线索：this._addDependentStates、this._removeDependentStates、this._secondaryTargetEntity.get。
   */
  setSecondaryAlignType(secondaryAlignType) {
    if (this._secondaryAlignType === secondaryAlignType) return;
    const e = this._secondaryTargetEntity.get();
    e && this._removeDependentStates(e, this._secondaryAlignType);
    this._secondaryAlignType = secondaryAlignType;
    e && this._addDependentStates(e, this._secondaryAlignType);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._secondaryAxis`。
   */
  getSecondaryAxis() {
    return this._secondaryAxis;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._secondaryAxis.copy`。
   * 调用线索：this._secondaryAxis.copy。
   */
  setSecondaryAxis(t) {
    this._secondaryAxis.copy(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._secondaryTargetEntity.getName()`；调用 `this._secondaryTargetEntity.getName`。
   * 调用线索：this._secondaryTargetEntity.getName。
   */
  getSecondaryTargetEntity() {
    return this._secondaryTargetEntity.getName();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._secondaryTargetEntity.setName`。
   * 调用线索：this._secondaryTargetEntity.setName。
   */
  setSecondaryTargetEntity(t) {
    this._secondaryTargetEntity.setName(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._secondaryTargetAxis`。
   */
  getSecondaryTargetAxis() {
    return this._secondaryTargetAxis;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._secondaryTargetAxis.copy`。
   * 调用线索：this._secondaryTargetAxis.copy。
   */
  setSecondaryTargetAxis(t) {
    this._secondaryTargetAxis.copy(t);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_joint`、`_model`；调用 `this.addDependentState`、`this.addModifiedState`、`this.getEntity`、`this.getEntity().getComponent`、`this.getEntity().getName`、`this.removeDependentState`。
   * 状态写入：_joint、_model。
   * 调用线索：this.addDependentState、this.addModifiedState、this.getEntity、this.getEntity().getComponent、this.getEntity().getName等。
   */
  setJoint(joint, model) {
    if (this._joint = joint, model) this._model = model;else {
      const t = this.getEntity().getComponent(PioneerPublicApi.ModelComponent);
      null !== t && (this._model = t);
    }
    "" !== this._joint ? (this.addDependentState(this.getEntity().getName(), "orientation"), this.removeModifiedState("orientation")) : (this.removeDependentState(this.getEntity().getName(), "orientation"), this.addModifiedState("orientation"));
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._getOrientation`。
   * 调用线索：this._getOrientation。
   */
  __updateOrientationAtTime(t, e) {
    "" === this._joint && this._getOrientation(t, e);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`t.copy`、`t.isNaN`、`this._getOrientation`、`this._jointObject.quaternion.set`。
   * 调用线索：PioneerPublicApi.Quaternion.pool.get、PioneerPublicApi.Quaternion.pool.release、t.copy、t.isNaN、this._getOrientation等。
   */
  __update() {
    const t = PioneerPublicApi.Quaternion.pool.get();
    t.copy(this.getEntity().getOrientation());
    this._getOrientation(t);
    t.isNaN() || (null !== this._jointObject ? this._jointObject.quaternion.set(t.x, t.y, t.z, t.w) : this.getEntity().setOrientation(t));
    PioneerPublicApi.Quaternion.pool.release(t);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_jointObject`、`_modelRootId`；返回 `void` 或 `void PioneerPublicApi.Quaternion.pool.release(n)`；调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.Quaternion.threeJsPool.get`、`PioneerPublicApi.Quaternion.threeJsPool.release`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`。
   * 状态写入：_jointObject、_modelRootId。
   * 调用线索：PioneerPublicApi.Quaternion.pool.get、PioneerPublicApi.Quaternion.pool.release、PioneerPublicApi.Quaternion.threeJsPool.get、PioneerPublicApi.Quaternion.threeJsPool.release、PioneerPublicApi.Vector3.pool.get等。
   */
  _getOrientation(t, e) {
    if ("" !== this._joint && null !== this._model) {
      const t = this._model.getThreeJsObjects()[0];
      if (void 0 !== t && (null === this._jointObject || this._jointObject.name !== this._joint || t.id !== this._modelRootId)) {
        const jointObject = this._model.getThreeJsObjectByName(this._joint);
        null !== jointObject && (this._jointObject = jointObject, this._modelRootId = t.id);
      }
      if (null === this._jointObject) return;
    }
    const i = PioneerPublicApi.Vector3.pool.get();
    const n = PioneerPublicApi.Quaternion.pool.get();
    if (null !== this._jointObject && null !== this._model) {
      let jointObject = this._jointObject;
      const i = PioneerPublicApi.Quaternion.threeJsPool.get();
      for (i.set(0, 0, 0, 1); null !== jointObject.parent && jointObject.parent !== this._model.getThreeJsObjects()[0];) {
        jointObject = jointObject.parent;
        i.multiplyQuaternions(jointObject.quaternion, i);
      }
      n.copyFromThreeJs(i);
      PioneerPublicApi.Quaternion.threeJsPool.release(i);
      n.mult(this._model.getRotation(), n);
      n.mult(t, n);
    } else n.copy(t);
    n.isNaN() && n.copy(PioneerPublicApi.Quaternion.Identity);
    i.rotate(n, this._primaryAxis);
    const o = PioneerPublicApi.Vector3.pool.get();
    if (this._getAxis(o, this._primaryAlignType, this._primaryTargetEntity, this._primaryTargetAxis, i, e), o.isNaN()) {
      t.copy(PioneerPublicApi.Quaternion.NaN);
      PioneerPublicApi.Vector3.pool.release(o);
      PioneerPublicApi.Vector3.pool.release(i);
      return void PioneerPublicApi.Quaternion.pool.release(n);
    }
    const r = PioneerPublicApi.Quaternion.pool.get();
    if (r.setFromVectorFromTo(i, o), t.mult(r, n), t.isNaN() && t.copy(PioneerPublicApi.Quaternion.Identity), PioneerPublicApi.Quaternion.pool.release(r), "none" !== this._secondaryAlignType) {
      if (this._getAxis(o, this._secondaryAlignType, this._secondaryTargetEntity, this._secondaryTargetAxis, i, e), o.isNaN()) {
        t.copy(PioneerPublicApi.Quaternion.NaN);
        PioneerPublicApi.Vector3.pool.release(o);
        PioneerPublicApi.Vector3.pool.release(i);
        return void PioneerPublicApi.Quaternion.pool.release(n);
      }
      const r = PioneerPublicApi.Quaternion.pool.get();
      const a = PioneerPublicApi.Vector3.pool.get();
      const l = PioneerPublicApi.Vector3.pool.get();
      a.rotate(t, this._primaryAxis);
      l.rotate(t, this._secondaryAxis);
      const c = l.angleAroundAxis(o, a);
      r.setFromAxisAngle(a, c);
      t.mult(r, t);
      PioneerPublicApi.Quaternion.pool.release(r);
      PioneerPublicApi.Vector3.pool.release(a);
      PioneerPublicApi.Vector3.pool.release(l);
    }
    t.normalize(t);
    null !== this._jointObject && t.multInverseL(n, t);
    PioneerPublicApi.Quaternion.pool.release(n);
    PioneerPublicApi.Vector3.pool.release(i);
    PioneerPublicApi.Vector3.pool.release(o);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void t.copy(PioneerPublicApi.Vector3.NaN)`；调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`a.getOrientationAtTime`、`a.getPosition`、`a.getPositionRelativeToEntity`、`a.getVelocityAtTime`。
   * 调用线索：PioneerPublicApi.Quaternion.pool.get、PioneerPublicApi.Quaternion.pool.release、a.getOrientationAtTime、a.getPosition、a.getPositionRelativeToEntity等。
   */
  _getAxis(t, e, i, n, o, r) {
    const a = i.get();
    if ("align" === e) {
      if (null === a) return void t.copy(PioneerPublicApi.Vector3.NaN);
      const e = PioneerPublicApi.Quaternion.pool.get();
      a.getOrientationAtTime(e, r);
      t.rotate(e, n);
      PioneerPublicApi.Quaternion.pool.release(e);
    } else if ("velocity" === e) {
      if (null === a) return void t.copy(PioneerPublicApi.Vector3.NaN);
      a.getVelocityAtTime(t, r);
      t.normalize(t);
    } else if ("point" === e) {
      if (null === a) return void t.copy(PioneerPublicApi.Vector3.NaN);
      a.getPositionRelativeToEntity(t, PioneerPublicApi.Vector3.Zero, this.getEntity(), r);
      t.normalize(t);
    } else if ("position" === e) {
      if (null === a) return void t.copy(PioneerPublicApi.Vector3.NaN);
      t.normalize(a.getPosition());
    } else t.copy(o);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.getName`、`this.getEntity`、`this.getEntity().getName`、`this.removeDependentState`。
   * 调用线索：t.getName、this.getEntity、this.getEntity().getName、this.removeDependentState。
   */
  _removeDependentStates(t, e) {
    "align" === e ? this.removeDependentState(t.getName(), "orientation") : "velocity" === e ? this.removeDependentState(t.getName(), "velocity") : "point" === e ? (this.removeDependentState(this.getEntity().getName(), "position"), this.removeDependentState(t.getName(), "position")) : "position" === e && this.removeDependentState(t.getName(), "position");
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.getName`、`this.addDependentState`、`this.getEntity`、`this.getEntity().getName`。
   * 调用线索：t.getName、this.addDependentState、this.getEntity、this.getEntity().getName。
   */
  _addDependentStates(t, e) {
    "align" === e ? this.addDependentState(t.getName(), "orientation") : "velocity" === e ? this.addDependentState(t.getName(), "velocity") : "point" === e ? (this.addDependentState(this.getEntity().getName(), "position"), this.addDependentState(t.getName(), "position")) : "position" === e && this.addDependentState(t.getName(), "position");
  }
  _primaryAlignType;
  _primaryAxis;
  _primaryTargetEntity;
  _primaryTargetAxis;
  _secondaryAlignType;
  _secondaryAxis;
  _secondaryTargetEntity;
  _secondaryTargetAxis;
  _joint;
  _jointObject;
  _model;
  _modelRootId;
}
export { AlignController };
