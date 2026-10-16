// Recovered from app.js:445336-451721.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 先将主轴对齐，再绕已对齐主轴修正次轴；关节模式先合成祖先局部旋转并在输出时还原，依赖状态随目标引用变更迁移。 */

class AlignController extends PioneerPublicApi.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this._primaryAlignType = "none";
    this._primaryAxis = new PioneerPublicApi.Vector3(1, 0, 0);
    this._primaryTargetEntity = new PioneerPublicApi.EntityRef(this.getEntity().getScene());
    this._primaryTargetEntity.setRefChangedCallback((previousTarget, nextTarget) => {
      if (previousTarget) {
        this._removeDependentStates(previousTarget, this._primaryAlignType);
      }
      if (nextTarget) {
        this._addDependentStates(nextTarget, this._primaryAlignType);
      }
    });
    this._primaryTargetAxis = new PioneerPublicApi.Vector3(1, 0, 0);
    this._secondaryAlignType = "none";
    this._secondaryAxis = new PioneerPublicApi.Vector3(0, 1, 0);
    this._secondaryTargetEntity = new PioneerPublicApi.EntityRef(this.getEntity().getScene());
    this._secondaryTargetEntity.setRefChangedCallback((previousTarget, nextTarget) => {
      if (previousTarget) {
        this._removeDependentStates(previousTarget, this._secondaryAlignType);
      }
      if (nextTarget) {
        this._addDependentStates(nextTarget, this._secondaryAlignType);
      }
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
    const targetEntity = this._primaryTargetEntity.get();
    if (targetEntity) {
      this._removeDependentStates(targetEntity, this._primaryAlignType);
    }
    this._primaryAlignType = primaryAlignType;
    if (targetEntity) {
      this._addDependentStates(targetEntity, this._primaryAlignType);
    }
  }
  getPrimaryAxis() {
    return this._primaryAxis;
  }
  setPrimaryAxis(primaryAxis) {
    this._primaryAxis.copy(primaryAxis);
  }
  getPrimaryTargetEntity() {
    return this._primaryTargetEntity.getName();
  }
  setPrimaryTargetEntity(entityName) {
    this._primaryTargetEntity.setName(entityName);
  }
  getPrimaryTargetAxis() {
    return this._primaryTargetAxis;
  }
  setPrimaryTargetAxis(primaryTargetAxis) {
    this._primaryTargetAxis.copy(primaryTargetAxis);
  }
  getSecondaryAlignType() {
    return this._secondaryAlignType;
  }
  setSecondaryAlignType(secondaryAlignType) {
    if (this._secondaryAlignType === secondaryAlignType) return;
    const targetEntity = this._secondaryTargetEntity.get();
    if (targetEntity) {
      this._removeDependentStates(targetEntity, this._secondaryAlignType);
    }
    this._secondaryAlignType = secondaryAlignType;
    if (targetEntity) {
      this._addDependentStates(targetEntity, this._secondaryAlignType);
    }
  }
  getSecondaryAxis() {
    return this._secondaryAxis;
  }
  setSecondaryAxis(secondaryAxis) {
    this._secondaryAxis.copy(secondaryAxis);
  }
  getSecondaryTargetEntity() {
    return this._secondaryTargetEntity.getName();
  }
  setSecondaryTargetEntity(entityName) {
    this._secondaryTargetEntity.setName(entityName);
  }
  getSecondaryTargetAxis() {
    return this._secondaryTargetAxis;
  }
  setSecondaryTargetAxis(secondaryTargetAxis) {
    this._secondaryTargetAxis.copy(secondaryTargetAxis);
  }
  setJoint(joint, model) {
    this._joint = joint;
    if (model) this._model = model;else {
      const modelComponent = this.getEntity().getComponent(PioneerPublicApi.ModelComponent);
      if (null !== modelComponent) {
        this._model = modelComponent;
      }
    }
    if ("" !== this._joint) {
      this.addDependentState(this.getEntity().getName(), "orientation");
      this.removeModifiedState("orientation");
    } else {
      this.removeDependentState(this.getEntity().getName(), "orientation");
      this.addModifiedState("orientation");
    }
  }
  __updateOrientationAtTime(orientationOut, time) {
    if ("" === this._joint) {
      this._getOrientation(orientationOut, time);
    }
  }
  __update() {
    const orientation = PioneerPublicApi.Quaternion.pool.get();
    orientation.copy(this.getEntity().getOrientation());
    this._getOrientation(orientation);
    if (!orientation.isNaN()) {
      if (null !== this._jointObject) {
        this._jointObject.quaternion.set(orientation.x, orientation.y, orientation.z, orientation.w);
      } else {
        this.getEntity().setOrientation(orientation);
      }
    }
    PioneerPublicApi.Quaternion.pool.release(orientation);
  }
  _getOrientation(orientationOut, time) {
    if ("" !== this._joint && null !== this._model) {
      const modelRoot = this._model.getThreeJsObjects()[0];
      if (void 0 !== modelRoot && (null === this._jointObject || this._jointObject.name !== this._joint || modelRoot.id !== this._modelRootId)) {
        const jointObject = this._model.getThreeJsObjectByName(this._joint);
        if (null !== jointObject) {
          this._jointObject = jointObject;
          this._modelRootId = modelRoot.id;
        }
      }
      if (null === this._jointObject) return;
    }
    const primaryAxisInReference = PioneerPublicApi.Vector3.pool.get();
    const jointParentOrientation = PioneerPublicApi.Quaternion.pool.get();
    if (null !== this._jointObject && null !== this._model) {
      let jointObject = this._jointObject;
      const ancestorRotation = PioneerPublicApi.Quaternion.threeJsPool.get();
      for (ancestorRotation.set(0, 0, 0, 1); null !== jointObject.parent && jointObject.parent !== this._model.getThreeJsObjects()[0];) {
        jointObject = jointObject.parent;
        ancestorRotation.multiplyQuaternions(jointObject.quaternion, ancestorRotation);
      }
      jointParentOrientation.copyFromThreeJs(ancestorRotation);
      PioneerPublicApi.Quaternion.threeJsPool.release(ancestorRotation);
      jointParentOrientation.mult(this._model.getRotation(), jointParentOrientation);
      jointParentOrientation.mult(orientationOut, jointParentOrientation);
    } else jointParentOrientation.copy(orientationOut);
    if (jointParentOrientation.isNaN()) {
      jointParentOrientation.copy(PioneerPublicApi.Quaternion.Identity);
    }
    primaryAxisInReference.rotate(jointParentOrientation, this._primaryAxis);
    const targetAxis = PioneerPublicApi.Vector3.pool.get();
    this._getAxis(targetAxis, this._primaryAlignType, this._primaryTargetEntity, this._primaryTargetAxis, primaryAxisInReference, time);
    if (targetAxis.isNaN()) {
      orientationOut.copy(PioneerPublicApi.Quaternion.NaN);
      PioneerPublicApi.Vector3.pool.release(targetAxis);
      PioneerPublicApi.Vector3.pool.release(primaryAxisInReference);
      return void PioneerPublicApi.Quaternion.pool.release(jointParentOrientation);
    }
    const alignmentRotation = PioneerPublicApi.Quaternion.pool.get();
    alignmentRotation.setFromVectorFromTo(primaryAxisInReference, targetAxis);
    orientationOut.mult(alignmentRotation, jointParentOrientation);
    if (orientationOut.isNaN()) {
      orientationOut.copy(PioneerPublicApi.Quaternion.Identity);
    }
    PioneerPublicApi.Quaternion.pool.release(alignmentRotation);
    if ("none" !== this._secondaryAlignType) {
      this._getAxis(targetAxis, this._secondaryAlignType, this._secondaryTargetEntity, this._secondaryTargetAxis, primaryAxisInReference, time);
      if (targetAxis.isNaN()) {
        orientationOut.copy(PioneerPublicApi.Quaternion.NaN);
        PioneerPublicApi.Vector3.pool.release(targetAxis);
        PioneerPublicApi.Vector3.pool.release(primaryAxisInReference);
        return void PioneerPublicApi.Quaternion.pool.release(jointParentOrientation);
      }
      const secondaryRotation = PioneerPublicApi.Quaternion.pool.get();
      const alignedPrimaryAxis = PioneerPublicApi.Vector3.pool.get();
      const alignedSecondaryAxis = PioneerPublicApi.Vector3.pool.get();
      alignedPrimaryAxis.rotate(orientationOut, this._primaryAxis);
      alignedSecondaryAxis.rotate(orientationOut, this._secondaryAxis);
      const secondaryAngle = alignedSecondaryAxis.angleAroundAxis(targetAxis, alignedPrimaryAxis);
      secondaryRotation.setFromAxisAngle(alignedPrimaryAxis, secondaryAngle);
      orientationOut.mult(secondaryRotation, orientationOut);
      PioneerPublicApi.Quaternion.pool.release(secondaryRotation);
      PioneerPublicApi.Vector3.pool.release(alignedPrimaryAxis);
      PioneerPublicApi.Vector3.pool.release(alignedSecondaryAxis);
    }
    orientationOut.normalize(orientationOut);
    if (null !== this._jointObject) {
      orientationOut.multInverseL(jointParentOrientation, orientationOut);
    }
    PioneerPublicApi.Quaternion.pool.release(jointParentOrientation);
    PioneerPublicApi.Vector3.pool.release(primaryAxisInReference);
    PioneerPublicApi.Vector3.pool.release(targetAxis);
  }
  _getAxis(axisOut, alignType, targetRef, targetAxis, fallbackAxis, time) {
    const targetEntity = targetRef.get();
    if ("align" === alignType) {
      if (null === targetEntity) return void axisOut.copy(PioneerPublicApi.Vector3.NaN);
      const targetOrientation = PioneerPublicApi.Quaternion.pool.get();
      targetEntity.getOrientationAtTime(targetOrientation, time);
      axisOut.rotate(targetOrientation, targetAxis);
      PioneerPublicApi.Quaternion.pool.release(targetOrientation);
    } else if ("velocity" === alignType) {
      if (null === targetEntity) return void axisOut.copy(PioneerPublicApi.Vector3.NaN);
      targetEntity.getVelocityAtTime(axisOut, time);
      axisOut.normalize(axisOut);
    } else if ("point" === alignType) {
      if (null === targetEntity) return void axisOut.copy(PioneerPublicApi.Vector3.NaN);
      targetEntity.getPositionRelativeToEntity(axisOut, PioneerPublicApi.Vector3.Zero, this.getEntity(), time);
      axisOut.normalize(axisOut);
    } else if ("position" === alignType) {
      if (null === targetEntity) return void axisOut.copy(PioneerPublicApi.Vector3.NaN);
      axisOut.normalize(targetEntity.getPosition());
    } else axisOut.copy(fallbackAxis);
  }
  _removeDependentStates(targetEntity, alignType) {
    if ("align" === alignType) {
      this.removeDependentState(targetEntity.getName(), "orientation");
    } else {
      if ("velocity" === alignType) {
        this.removeDependentState(targetEntity.getName(), "velocity");
      } else {
        if ("point" === alignType) {
          this.removeDependentState(this.getEntity().getName(), "position");
          this.removeDependentState(targetEntity.getName(), "position");
        } else {
          if ("position" === alignType) {
            this.removeDependentState(targetEntity.getName(), "position");
          }
        }
      }
    }
  }
  _addDependentStates(targetEntity, alignType) {
    if ("align" === alignType) {
      this.addDependentState(targetEntity.getName(), "orientation");
    } else {
      if ("velocity" === alignType) {
        this.addDependentState(targetEntity.getName(), "velocity");
      } else {
        if ("point" === alignType) {
          this.addDependentState(this.getEntity().getName(), "position");
          this.addDependentState(targetEntity.getName(), "position");
        } else {
          if ("position" === alignType) {
            this.addDependentState(targetEntity.getName(), "position");
          }
        }
      }
    }
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
