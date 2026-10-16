// Recovered from app.js:788661-790329.
import * as Pioneer from "../pioneer/index.js";
/** 关键帧预积累梯形角位移，查询时按原公式积分并 wrap 到 2π；轴先由输入姿态转到参考系再左乘旋转。 */

class KeyframeSpinController extends Pioneer.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this._keyframes = [];
    this._axis = new Pioneer.Vector3(1, 0, 0);
    this._startingAngle = 0;
    this.addModifiedState("orientation");
  }
  setKeyframes(keyframes) {
    this._keyframes = [];
    let integratedAngle = 0;
    for (let keyframeIndex = 0, keyframeCount = keyframes.length; keyframeIndex < keyframeCount; keyframeIndex++) {
      const keyframe = keyframes[keyframeIndex];
      if (keyframeIndex > 0) {
        const previousKeyframe = keyframes[keyframeIndex - 1];
        integratedAngle = Pioneer.MathUtils.wrap(integratedAngle + (keyframe[0] - previousKeyframe[0]) * (previousKeyframe[1] + keyframe[1]) * .5, 0, 2 * Math.PI);
      }
      this._keyframes.push([keyframe[0], keyframe[1], integratedAngle]);
    }
    this._keyframes.sort((leftKeyframe, rightKeyframe) => leftKeyframe[0] - rightKeyframe[0]);
  }
  setAxis(axis) {
    this._axis.copy(axis);
  }
  setStartingAngle(startingAngle) {
    this._startingAngle = startingAngle;
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
    const spinAngle = Pioneer.MathUtils.wrap(this._startingAngle + startKeyframe[2] + (time - startKeyframe[0]) * (startKeyframe[1] + fraction * endKeyframe[1]) / (1 + fraction), 0, 2 * Math.PI);
    const axisInReference = Pioneer.Vector3.pool.get();
    axisInReference.rotate(initialOrientation, this._axis);
    const spinRotation = Pioneer.Quaternion.pool.get();
    spinRotation.setFromAxisAngle(axisInReference, spinAngle);
    orientationOut.mult(spinRotation, initialOrientation);
    Pioneer.Vector3.pool.release(axisInReference);
    Pioneer.Quaternion.pool.release(spinRotation);
  }
  _keyframes;
  _axis;
  _startingAngle;
}
export { KeyframeSpinController };
