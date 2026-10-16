// Recovered from app.js:445336-451721.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class AlignController extends PioneerPublicApi.BaseController {
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
  getPrimaryAlignType() {
    return this._primaryAlignType;
  }
  setPrimaryAlignType(primaryAlignType) {
    if (this._primaryAlignType === primaryAlignType) return;
    const e = this._primaryTargetEntity.get();
    e && this._removeDependentStates(e, this._primaryAlignType);
    this._primaryAlignType = primaryAlignType;
    e && this._addDependentStates(e, this._primaryAlignType);
  }
  getPrimaryAxis() {
    return this._primaryAxis;
  }
  setPrimaryAxis(t) {
    this._primaryAxis.copy(t);
  }
  getPrimaryTargetEntity() {
    return this._primaryTargetEntity.getName();
  }
  setPrimaryTargetEntity(t) {
    this._primaryTargetEntity.setName(t);
  }
  getPrimaryTargetAxis() {
    return this._primaryTargetAxis;
  }
  setPrimaryTargetAxis(t) {
    this._primaryTargetAxis.copy(t);
  }
  getSecondaryAlignType() {
    return this._secondaryAlignType;
  }
  setSecondaryAlignType(secondaryAlignType) {
    if (this._secondaryAlignType === secondaryAlignType) return;
    const e = this._secondaryTargetEntity.get();
    e && this._removeDependentStates(e, this._secondaryAlignType);
    this._secondaryAlignType = secondaryAlignType;
    e && this._addDependentStates(e, this._secondaryAlignType);
  }
  getSecondaryAxis() {
    return this._secondaryAxis;
  }
  setSecondaryAxis(t) {
    this._secondaryAxis.copy(t);
  }
  getSecondaryTargetEntity() {
    return this._secondaryTargetEntity.getName();
  }
  setSecondaryTargetEntity(t) {
    this._secondaryTargetEntity.setName(t);
  }
  getSecondaryTargetAxis() {
    return this._secondaryTargetAxis;
  }
  setSecondaryTargetAxis(t) {
    this._secondaryTargetAxis.copy(t);
  }
  setJoint(joint, model) {
    if (this._joint = joint, model) this._model = model;else {
      const t = this.getEntity().getComponent(PioneerPublicApi.ModelComponent);
      null !== t && (this._model = t);
    }
    "" !== this._joint ? (this.addDependentState(this.getEntity().getName(), "orientation"), this.removeModifiedState("orientation")) : (this.removeDependentState(this.getEntity().getName(), "orientation"), this.addModifiedState("orientation"));
  }
  __updateOrientationAtTime(t, e) {
    "" === this._joint && this._getOrientation(t, e);
  }
  __update() {
    const t = PioneerPublicApi.Quaternion.pool.get();
    t.copy(this.getEntity().getOrientation());
    this._getOrientation(t);
    t.isNaN() || (null !== this._jointObject ? this._jointObject.quaternion.set(t.x, t.y, t.z, t.w) : this.getEntity().setOrientation(t));
    PioneerPublicApi.Quaternion.pool.release(t);
  }
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
  _removeDependentStates(t, e) {
    "align" === e ? this.removeDependentState(t.getName(), "orientation") : "velocity" === e ? this.removeDependentState(t.getName(), "velocity") : "point" === e ? (this.removeDependentState(this.getEntity().getName(), "position"), this.removeDependentState(t.getName(), "position")) : "position" === e && this.removeDependentState(t.getName(), "position");
  }
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
