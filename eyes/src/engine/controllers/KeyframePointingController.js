// Recovered from app.js:786224-788660.
import * as Pioneer from "../pioneer/index.js";
/** 关键帧目标可为位置、速度或带负号方向；查询时先在同一时刻求两端方向，再球面混合并相对输入姿态旋转。 */

class KeyframePointingController extends Pioneer.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this._keyframes = [];
    this._direction = new Pioneer.Vector3(1, 0, 0);
    this.addModifiedState("orientation");
  }
  setKeyframes(keyframes) {
    for (let oldKeyframeIndex = 0, oldKeyframeCount = this._keyframes.length; oldKeyframeIndex < oldKeyframeCount; oldKeyframeIndex++) {
      let oldTargetName = this._keyframes[oldKeyframeIndex][1];
      if (oldTargetName.startsWith("-")) {
        oldTargetName = oldTargetName.substring(1);
      }
      if ("velocity" === oldTargetName) {
        this.removeDependentState(this.getEntity().getName(), "velocity");
      } else {
        this.removeDependentState(oldTargetName, "position");
      }
    }
    this._keyframes = [];
    for (let keyframeIndex = 0, keyframeCount = keyframes.length; keyframeIndex < keyframeCount; keyframeIndex++) {
      const keyframe = keyframes[keyframeIndex];
      this._keyframes.push([keyframe[0], keyframe[1]]);
      let targetName = keyframe[1];
      if (targetName.startsWith("-")) {
        targetName = targetName.substring(1);
      }
      if ("velocity" === targetName) {
        this.addDependentState(this.getEntity().getName(), "velocity");
      } else {
        this.addDependentState(targetName, "position");
      }
    }
    this._keyframes.sort((oldKeyframeIndex, keyframeIndex) => oldKeyframeIndex[0] - keyframeIndex[0]);
  }
  setDirection(direction) {
    this._direction.copy(direction);
  }
  __updateOrientationAtTime(orientationOut, time) {
    if (orientationOut.isNaN()) {
      orientationOut.copy(Pioneer.Quaternion.Identity);
    }
    this._getNewOrientation(orientationOut, time, orientationOut);
  }
  __update() {
    if (0 === this._keyframes.length) return;
    const entity = this.getEntity();
    const time = entity.getScene().getEngine().getTime();
    if (entity.getOrientation().isNaN()) {
      entity.setOrientation(Pioneer.Quaternion.Identity);
    }
    const orientation = Pioneer.Quaternion.pool.get();
    this._getNewOrientation(orientation, time, entity.getOrientation());
    entity.setOrientation(orientation);
    Pioneer.Quaternion.pool.release(orientation);
  }
  _getNewOrientation(orientationOut, time, initialOrientation) {
    if (0 === this._keyframes.length) {
      orientationOut.copy(Pioneer.Quaternion.NaN);
    }
    const insertionIndex = Pioneer.Sort.getIndexObject(time, this._keyframes, (leftKeyframe, time) => leftKeyframe[0] < time);
    let startIndex = 0;
    let endIndex = 0;
    if (insertionIndex === this._keyframes.length) {
      startIndex = this._keyframes.length - 1;
      endIndex = this._keyframes.length - 1;
    } else {
      if (insertionIndex > 0) {
        startIndex = insertionIndex - 1;
        endIndex = insertionIndex;
      }
    }
    const startKeyframe = this._keyframes[startIndex];
    const endKeyframe = this._keyframes[endIndex];
    const fraction = endKeyframe[0] > startKeyframe[0] ? (time - startKeyframe[0]) / (endKeyframe[0] - startKeyframe[0]) : 0;
    const startDirection = Pioneer.Vector3.pool.get();
    const targetDirection = Pioneer.Vector3.pool.get();
    this._getDirection(startDirection, time, startKeyframe[1]);
    this._getDirection(targetDirection, time, endKeyframe[1]);
    targetDirection.slerp(startDirection, targetDirection, fraction);
    targetDirection.normalize(targetDirection);
    startDirection.rotate(initialOrientation, this._direction);
    const pointingRotation = Pioneer.Quaternion.pool.get();
    pointingRotation.setFromVectorFromTo(startDirection, targetDirection);
    orientationOut.mult(pointingRotation, initialOrientation);
    Pioneer.Quaternion.pool.release(pointingRotation);
    Pioneer.Vector3.pool.release(targetDirection);
    Pioneer.Vector3.pool.release(startDirection);
  }
  _getDirection(directionOut, time, targetName) {
    const entity = this.getEntity();
    const reverseDirection = targetName.startsWith("-");
    if (reverseDirection) {
      targetName = targetName.substring(1);
    }
    if (targetName.startsWith("velocity")) {
      if ((targetName = targetName.substring(8)).startsWith(" rel ")) {
        targetName = targetName.substring(5);
        const referenceEntity = entity.getScene().getEntity(targetName);
        if (null !== referenceEntity) {
          entity.getVelocityRelativeToEntity(directionOut, Pioneer.Vector3.Zero, referenceEntity, time);
        }
      } else entity.getVelocityAtTime(directionOut, time);
    } else {
      const referenceEntity = entity.getScene().getEntity(targetName);
      if (null !== referenceEntity) {
        referenceEntity.getPositionRelativeToEntity(directionOut, Pioneer.Vector3.Zero, entity, time);
      } else {
        directionOut.copy(Pioneer.Vector3.NaN);
      }
    }
    directionOut.normalize(directionOut);
    if (reverseDirection) {
      directionOut.mult(directionOut, -1);
    }
  }
  _keyframes;
  _direction;
}
export { KeyframePointingController };
