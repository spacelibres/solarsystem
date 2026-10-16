// Recovered from app.js:479708-488241.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 位置使用相邻关键帧及邻域切线做 Hermite，速度为导数除时间跨度；姿态用 slerp。实时模式以首次更新的墙钟秒为零点。 */

class KeyframeController extends PioneerPublicApi.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this._positionKeyframes = [];
    this._orientationKeyframes = [];
    this._timesAreRealTime = false;
    this._timeOfFirstUpdate = NaN;
    this.setCoverage(PioneerPublicApi.Interval.InfiniteNeg);
    this._position0 = new PioneerPublicApi.Vector3();
    this._position1 = new PioneerPublicApi.Vector3();
    this._orientation0 = new PioneerPublicApi.Quaternion();
    this._orientation1 = new PioneerPublicApi.Quaternion();
    this._newPosition = new PioneerPublicApi.Vector3();
    this._newVelocity = new PioneerPublicApi.Vector3();
    this._newOrientation = new PioneerPublicApi.Quaternion();
    this._tangent0 = new PioneerPublicApi.Vector3();
    this._tangent1 = new PioneerPublicApi.Vector3();
    this._tempA = new PioneerPublicApi.Vector3();
    this._tempB = new PioneerPublicApi.Vector3();
  }
  addPositionKeyframe(time, position, positionReferenceName, positionReferenceTime, orientationReferenceName, orientationReferenceTime) {
    const vector3 = new PioneerPublicApi.Vector3();
    vector3.copy(position);
    const keyframe = [time, {
      position: vector3,
      relativeToEntityPosition: void 0 !== positionReferenceName ? new PioneerPublicApi.EntityRef(this.getEntity().getScene(), positionReferenceName) : void 0,
      relativeToEntityPositionTime: positionReferenceTime,
      relativeToEntityOrientation: void 0 !== orientationReferenceName ? new PioneerPublicApi.EntityRef(this.getEntity().getScene(), orientationReferenceName) : void 0,
      relativeToEntityOrientationTime: orientationReferenceTime
    }];
    PioneerPublicApi.Sort.addObject(keyframe, this._positionKeyframes, KeyframeController.isLessAdd, KeyframeController.isEqualAdd);
    if (1 === this._positionKeyframes.length) {
      this.addModifiedState("position");
      this.addModifiedState("velocity");
    }
    this._updateCoverage();
  }
  removePositionKeyframe(time) {
    const removed = PioneerPublicApi.Sort.removeObject(time, this._positionKeyframes, KeyframeController.isLess, KeyframeController.isEqual);
    if (removed) {
      if (0 === this._positionKeyframes.length) {
        this.removeModifiedState("position");
        this.removeModifiedState("velocity");
      }
      this._updateCoverage();
    }
    return removed;
  }
  addOrientationKeyframe(time, orientation, orientationReferenceName, orientationReferenceTime) {
    const quaternion = new PioneerPublicApi.Quaternion();
    quaternion.copy(orientation);
    const keyframe = [time, {
      orientation: quaternion,
      relativeToEntityOrientation: void 0 !== orientationReferenceName ? new PioneerPublicApi.EntityRef(this.getEntity().getScene(), orientationReferenceName) : void 0,
      relativeToEntityOrientationTime: orientationReferenceTime
    }];
    PioneerPublicApi.Sort.addObject(keyframe, this._orientationKeyframes, KeyframeController.isLessAdd, KeyframeController.isEqualAdd);
    if (1 === this._orientationKeyframes.length) {
      this.addModifiedState("orientation");
    }
    this._updateCoverage();
  }
  removeOrientationKeyframe(time) {
    const removed = PioneerPublicApi.Sort.removeObject(time, this._orientationKeyframes, KeyframeController.isLess, KeyframeController.isEqual);
    if (removed) {
      if (0 === this._orientationKeyframes.length) {
        this.removeModifiedState("orientation");
      }
      this._updateCoverage();
    }
    return removed;
  }
  areTimesRealTime() {
    return this._timesAreRealTime;
  }
  setTimesAreRealTime(timesAreRealTime) {
    this._timesAreRealTime = timesAreRealTime;
    this._updateCoverage();
  }
  __updatePositionAtTime(positionOut, time) {
    this._getPositionAtTime(positionOut, time);
  }
  __updateVelocityAtTime(velocityOut, time) {
    this._getVelocityAtTime(velocityOut, time);
  }
  __updateOrientationAtTime(orientationOut, time) {
    this._getOrientationAtTime(orientationOut, time);
  }
  __update() {
    const engine = this.getEntity().getScene().getEngine();
    let time = 0;
    if (this._timesAreRealTime) {
      if (isNaN(this._timeOfFirstUpdate)) {
        this._timeOfFirstUpdate = Date.now() / 1e3;
      } else {
        time = Date.now() / 1e3 - this._timeOfFirstUpdate;
      }
    } else {
      time = engine.getTime();
    }
    if (this._getPositionAtTime(this._newPosition, time)) {
      this.getEntity().setPosition(this._newPosition);
    }
    if (this._getVelocityAtTime(this._newVelocity, time)) {
      this.getEntity().setVelocity(this._newVelocity);
    }
    if (this._getOrientationAtTime(this._newOrientation, time)) {
      this.getEntity().setOrientation(this._newOrientation);
    }
  }
  _getPositionAtTime(positionOut, time) {
    const insertionIndex = PioneerPublicApi.Sort.getIndexObject(time, this._positionKeyframes, KeyframeController.isLess);
    if (insertionIndex < this._positionKeyframes.length) {
      if (0 !== insertionIndex) {
        const startIndex = insertionIndex - 1;
        const endIndex = insertionIndex;
        const startKeyframe = this._positionKeyframes[startIndex];
        const endKeyframe = this._positionKeyframes[endIndex];
        const startTime = startKeyframe[0];
        const endTime = endKeyframe[0];
        this._getPositionOfKeyframe(this._position0, startKeyframe);
        this._getPositionOfKeyframe(this._position1, endKeyframe);
        if (startIndex > 0) {
          const previousKeyframe = this._positionKeyframes[startIndex - 1];
          const previousTime = previousKeyframe[0];
          this._getPositionOfKeyframe(this._tempA, previousKeyframe);
          this._tempA.sub(this._position0, this._tempA);
          this._tempB.sub(this._position1, this._position0);
          this._tempB.mult(this._tempB, .5);
          this._tangent0.addMult(this._tempB, this._tempA, .5 * (endTime - startTime) / (startTime - previousTime));
        } else this._tangent0.sub(this._position1, this._position0);
        if (endIndex < this._positionKeyframes.length - 1) {
          const nextKeyframe = this._positionKeyframes[endIndex + 1];
          const nextTime = nextKeyframe[0];
          this._getPositionOfKeyframe(this._tempB, nextKeyframe);
          this._tempA.sub(this._position1, this._position0);
          this._tempB.sub(this._tempB, this._position1);
          this._tempA.mult(this._tempA, .5);
          this._tangent1.addMult(this._tempA, this._tempB, .5 * (endTime - startTime) / (nextTime - endTime));
        } else this._tangent1.sub(this._position1, this._position0);
        const fraction = (time - startTime) / (endTime - startTime);
        this._cubicHermiteSpline(positionOut, this._position0, this._position1, this._tangent0, this._tangent1, fraction);
        return true;
      }
      {
        const firstKeyframe = this._positionKeyframes[0];
        if (firstKeyframe[0] === time) {
          this._getPositionOfKeyframe(positionOut, firstKeyframe);
          return true;
        }
      }
    }
    return false;
  }
  _getVelocityAtTime(velocityOut, time) {
    const insertionIndex = PioneerPublicApi.Sort.getIndexObject(time, this._positionKeyframes, KeyframeController.isLess);
    if (insertionIndex < this._positionKeyframes.length) {
      if (0 !== insertionIndex) {
        const startIndex = insertionIndex - 1;
        const endIndex = insertionIndex;
        const startKeyframe = this._positionKeyframes[startIndex];
        const endKeyframe = this._positionKeyframes[endIndex];
        const startTime = startKeyframe[0];
        const endTime = endKeyframe[0];
        this._getPositionOfKeyframe(this._position0, startKeyframe);
        this._getPositionOfKeyframe(this._position1, endKeyframe);
        if (startIndex > 0) {
          const previousKeyframe = this._positionKeyframes[startIndex - 1];
          const previousTime = previousKeyframe[0];
          this._getPositionOfKeyframe(this._tempA, previousKeyframe);
          this._tempA.sub(this._position0, this._tempA);
          this._tempB.sub(this._position1, this._position0);
          this._tempB.mult(this._tempB, .5);
          this._tangent0.addMult(this._tempB, this._tempA, .5 * (endTime - startTime) / (startTime - previousTime));
        } else this._tangent0.sub(this._position1, this._position0);
        if (endIndex < this._positionKeyframes.length - 1) {
          const nextKeyframe = this._positionKeyframes[endIndex + 1];
          const nextTime = nextKeyframe[0];
          this._getPositionOfKeyframe(this._tempB, nextKeyframe);
          this._tempA.sub(this._position1, this._position0);
          this._tempB.sub(this._tempB, this._position1);
          this._tempA.mult(this._tempA, .5);
          this._tangent1.addMult(this._tempA, this._tempB, .5 * (endTime - startTime) / (nextTime - endTime));
        } else this._tangent1.sub(this._position1, this._position0);
        const fraction = (time - startTime) / (endTime - startTime);
        this._cubicHermiteSplineDerivative(velocityOut, this._position0, this._position1, this._tangent0, this._tangent1, fraction);
        velocityOut.div(velocityOut, endTime - startTime);
        return true;
      }
      {
        const firstKeyframe = this._positionKeyframes[0];
        if (firstKeyframe[0] === time) {
          if (this._positionKeyframes.length > 1) {
            const secondKeyframe = this._positionKeyframes[1];
            const firstTime = firstKeyframe[0];
            const secondTime = secondKeyframe[0];
            this._getPositionOfKeyframe(this._position0, firstKeyframe);
            this._getPositionOfKeyframe(this._position1, secondKeyframe);
            velocityOut.sub(this._position1, this._position0);
            velocityOut.div(velocityOut, secondTime - firstTime);
          } else velocityOut.set(0, 0, 0);
          return true;
        }
      }
    }
    return false;
  }
  _getOrientationAtTime(orientationOut, time) {
    const insertionIndex = PioneerPublicApi.Sort.getIndexObject(time, this._orientationKeyframes, KeyframeController.isLess);
    if (insertionIndex < this._orientationKeyframes.length) {
      if (0 !== insertionIndex) {
        const startIndex = insertionIndex - 1;
        const endIndex = insertionIndex;
        const startKeyframe = this._orientationKeyframes[startIndex];
        const endKeyframe = this._orientationKeyframes[endIndex];
        const startTime = startKeyframe[0];
        this._getOrientationOfKeyframe(this._orientation0, startKeyframe);
        const endTime = endKeyframe[0];
        this._getOrientationOfKeyframe(this._orientation1, endKeyframe);
        orientationOut.slerp(this._orientation0, this._orientation1, (time - startTime) / (endTime - startTime));
        return true;
      }
      {
        const firstKeyframe = this._orientationKeyframes[0];
        if (firstKeyframe[0] === time) {
          this._getOrientationOfKeyframe(orientationOut, firstKeyframe);
          return true;
        }
      }
    }
    return false;
  }
  _getPositionOfKeyframe(positionOut, keyframe) {
    const keyframeState = keyframe[1];
    positionOut.copy(keyframeState.position);
    if (void 0 !== keyframeState.relativeToEntityOrientation) {
      const referenceTime = keyframe[1].relativeToEntityOrientationTime ?? keyframe[0];
      const referenceEntity = keyframeState.relativeToEntityOrientation.get();
      if (null !== referenceEntity) {
        const referenceOrientation = PioneerPublicApi.Quaternion.pool.get();
        referenceEntity.getOrientationAtTime(referenceOrientation, referenceTime);
        positionOut.rotate(referenceOrientation, positionOut);
        PioneerPublicApi.Quaternion.pool.release(referenceOrientation);
      } else positionOut.copy(PioneerPublicApi.Vector3.NaN);
    }
    if (void 0 !== keyframeState.relativeToEntityPosition) {
      const referenceTime = keyframe[1].relativeToEntityPositionTime ?? keyframe[0];
      const referenceEntity = keyframeState.relativeToEntityPosition.get();
      const parentEntity = this.getEntity().getParent();
      if (null !== referenceEntity && parentEntity) {
        const referencePosition = PioneerPublicApi.Vector3.pool.get();
        referenceEntity.getPositionRelativeToEntity(referencePosition, PioneerPublicApi.Vector3.Zero, parentEntity, referenceTime);
        positionOut.add(referencePosition, positionOut);
        PioneerPublicApi.Vector3.pool.release(referencePosition);
      } else positionOut.copy(PioneerPublicApi.Vector3.NaN);
    }
  }
  _getOrientationOfKeyframe(orientationOut, keyframe) {
    const keyframeState = keyframe[1];
    if (void 0 !== keyframeState.relativeToEntityOrientation) {
      const referenceTime = keyframe[1].relativeToEntityOrientationTime ?? keyframe[0];
      const referenceEntity = keyframeState.relativeToEntityOrientation.get();
      if (null !== referenceEntity) {
        referenceEntity.getOrientationAtTime(orientationOut, referenceTime);
        orientationOut.mult(orientationOut, keyframeState.orientation);
      } else {
        orientationOut.copy(PioneerPublicApi.Quaternion.NaN);
      }
    } else orientationOut.copy(keyframeState.orientation);
  }
  _updateCoverage() {
    if (this._timesAreRealTime) this.setCoverage(PioneerPublicApi.Interval.Infinite);else {
      const interval = new PioneerPublicApi.Interval(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
      if (this._positionKeyframes.length > 0) {
        interval.min = Math.min(interval.min, this._positionKeyframes[0][0]);
        interval.max = Math.max(interval.max, this._positionKeyframes[this._positionKeyframes.length - 1][0]);
      }
      if (this._orientationKeyframes.length > 0) {
        interval.min = Math.min(interval.min, this._orientationKeyframes[0][0]);
        interval.max = Math.max(interval.max, this._orientationKeyframes[this._orientationKeyframes.length - 1][0]);
      }
      this.setCoverage(interval);
    }
  }
  _cubicHermiteSpline(positionOut, startPosition, endPosition, startTangent, endTangent, fraction) {
    const fractionSquared = fraction * fraction;
    const fractionCubed = fraction * fractionSquared;
    const startPositionWeight = 2 * fractionCubed - 3 * fractionSquared + 1;
    const startTangentWeight = fractionCubed - 2 * fractionSquared + fraction;
    const endPositionWeight = -2 * fractionCubed + 3 * fractionSquared;
    const endTangentWeight = fractionCubed - fractionSquared;
    positionOut.x = startPositionWeight * startPosition.x + startTangentWeight * startTangent.x + endPositionWeight * endPosition.x + endTangentWeight * endTangent.x;
    positionOut.y = startPositionWeight * startPosition.y + startTangentWeight * startTangent.y + endPositionWeight * endPosition.y + endTangentWeight * endTangent.y;
    positionOut.z = startPositionWeight * startPosition.z + startTangentWeight * startTangent.z + endPositionWeight * endPosition.z + endTangentWeight * endTangent.z;
  }
  _cubicHermiteSplineDerivative(derivativeOut, startPosition, endPosition, startTangent, endTangent, fraction) {
    const fractionSquared = fraction * fraction;
    const startPositionWeight = 6 * fractionSquared - 6 * fraction;
    const startTangentWeight = 3 * fractionSquared - 4 * fraction + 1;
    const endPositionWeight = -6 * fractionSquared + 6 * fraction;
    const endTangentWeight = 3 * fractionSquared - 2 * fraction;
    derivativeOut.x = startPositionWeight * startPosition.x + startTangentWeight * startTangent.x + endPositionWeight * endPosition.x + endTangentWeight * endTangent.x;
    derivativeOut.y = startPositionWeight * startPosition.y + startTangentWeight * startTangent.y + endPositionWeight * endPosition.y + endTangentWeight * endTangent.y;
    derivativeOut.z = startPositionWeight * startPosition.z + startTangentWeight * startTangent.z + endPositionWeight * endPosition.z + endTangentWeight * endTangent.z;
  }
  static isLessAdd = (leftKeyframe, rightKeyframe) => leftKeyframe[0] < rightKeyframe[0];
  static isLess = (leftKeyframe, time) => leftKeyframe[0] < time;
  static isEqualAdd = (leftKeyframe, rightKeyframe) => leftKeyframe[0] === rightKeyframe[0];
  static isEqual = (leftKeyframe, time) => leftKeyframe[0] === time;
  _positionKeyframes;
  _orientationKeyframes;
  _timesAreRealTime;
  _timeOfFirstUpdate;
  _position0;
  _position1;
  _orientation0;
  _orientation1;
  _newPosition;
  _newVelocity;
  _newOrientation;
  _tangent0;
  _tangent1;
  _tempA;
  _tempB;
}
export { KeyframeController };
