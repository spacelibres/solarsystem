// Recovered from app.js:501754-508828.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 墙钟秒驱动位置、focus、up 三条关键帧轨道；位置段中点切换父参考系，距离曲线与方向混合保留原缓动及完成 Promise。 */
class OrbitKeyframeController extends PioneerPublicApi.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this._positionKeyframes = [];
    this._focusKeyframes = [];
    this._upKeyframes = [];
    this._timeOfFirstUpdate = NaN;
    this._directionOfFirstUpdate = new PioneerPublicApi.Vector3();
    this._resolvePromise = () => {};
    this._rejectPromise = null;
    this._endPromise = new Promise((resolvePromise, rejectPromise) => {
      this._resolvePromise = resolvePromise;
      this._rejectPromise = rejectPromise;
    });
    this.addModifiedState("position");
    this.addModifiedState("velocity");
    this.addModifiedState("orientation");
    this.addModifiedState("angularVelocity");
  }
  setPositionKeyframe(time, position, referenceEntityName) {
    if (void 0 !== position) {
      const positionKeyframe = new PositionKeyframe(this.getEntity().getScene());
      positionKeyframe.time = time;
      positionKeyframe.position.copy(position);
      positionKeyframe.relativeTo.setName(referenceEntityName);
      PioneerPublicApi.Sort.addObject(positionKeyframe, this._positionKeyframes, OrbitKeyframeController.isLess, OrbitKeyframeController.isEqual);
    } else {
      const keyframeIndex = PioneerPublicApi.Sort.getIndexObject(time, this._positionKeyframes, OrbitKeyframeController.isLessThanTime);
      if (keyframeIndex < this._positionKeyframes.length && time === this._positionKeyframes[keyframeIndex].time) {
        this._positionKeyframes.splice(keyframeIndex, 1);
      }
    }
  }
  setFocusKeyframe(time, focusEntityName) {
    if (void 0 !== focusEntityName) {
      const focusKeyframe = new FocusKeyframe(this.getEntity().getScene());
      focusKeyframe.time = time;
      focusKeyframe.focus.setName(focusEntityName);
      PioneerPublicApi.Sort.addObject(focusKeyframe, this._focusKeyframes, OrbitKeyframeController.isLess, OrbitKeyframeController.isEqual);
    } else {
      const keyframeIndex = PioneerPublicApi.Sort.getIndexObject(time, this._focusKeyframes, OrbitKeyframeController.isLessThanTime);
      if (keyframeIndex < this._focusKeyframes.length && time === this._focusKeyframes[keyframeIndex].time) {
        this._focusKeyframes.splice(keyframeIndex, 1);
      }
    }
  }
  setUpKeyframe(time, upVector) {
    if (void 0 !== upVector) {
      const upKeyframe = new UpKeyframe();
      upKeyframe.time = time;
      upKeyframe.up.copy(upVector);
      PioneerPublicApi.Sort.addObject(upKeyframe, this._upKeyframes, OrbitKeyframeController.isLess, OrbitKeyframeController.isEqual);
    } else {
      const keyframeIndex = PioneerPublicApi.Sort.getIndexObject(time, this._upKeyframes, OrbitKeyframeController.isLessThanTime);
      if (keyframeIndex < this._upKeyframes.length && time === this._upKeyframes[keyframeIndex].time) {
        this._upKeyframes.splice(keyframeIndex, 1);
      }
    }
  }
  async getEndPromise() {
    await this._endPromise;
  }
  __destroy() {
    super.__destroy();
    if (null !== this._rejectPromise) {
      this._rejectPromise(new Error(`Could not complete keyframes because ${this} was destroyed.`));
    }
  }
  __update() {
    const entity = this.getEntity();
    let elapsedTime = 0;
    if (isNaN(this._timeOfFirstUpdate)) {
      const parentEntity = entity.getParent();
      if (null === parentEntity) return;
      this._timeOfFirstUpdate = Date.now() / 1e3;
      entity.getOrientation().getAxis(this._directionOfFirstUpdate, 1);
      const positionKeyframe = new PositionKeyframe(entity.getScene());
      positionKeyframe.time = 0;
      positionKeyframe.position.copy(entity.getPosition());
      positionKeyframe.relativeTo.setName(parentEntity.getName());
      PioneerPublicApi.Sort.addObject(positionKeyframe, this._positionKeyframes, OrbitKeyframeController.isLess, OrbitKeyframeController.isEqual);
      const focusKeyframe = new FocusKeyframe(entity.getScene());
      focusKeyframe.time = 0;
      focusKeyframe.focus.setName("");
      PioneerPublicApi.Sort.addObject(focusKeyframe, this._focusKeyframes, OrbitKeyframeController.isLess, OrbitKeyframeController.isEqual);
      const upKeyframe = new UpKeyframe();
      upKeyframe.time = 0;
      entity.getOrientation().getAxis(upKeyframe.up, 2);
      PioneerPublicApi.Sort.addObject(upKeyframe, this._upKeyframes, OrbitKeyframeController.isLess, OrbitKeyframeController.isEqual);
    } else elapsedTime = Date.now() / 1e3 - this._timeOfFirstUpdate;
    let positionComplete = false;
    const positionIndex = PioneerPublicApi.Sort.getIndexObject(elapsedTime, this._positionKeyframes, OrbitKeyframeController.isLessThanTime);
    if (positionIndex > 0 && positionIndex < this._positionKeyframes.length) {
      const startKeyframe = this._positionKeyframes[positionIndex - 1];
      const endKeyframe = this._positionKeyframes[positionIndex];
      const startReference = startKeyframe.relativeTo.get();
      const endReference = endKeyframe.relativeTo.get();
      if (null !== startReference && null !== endReference) {
        let fraction = (elapsedTime - startKeyframe.time) / (endKeyframe.time - startKeyframe.time);
        let activeParent = startReference;
        if (fraction >= .5) {
          activeParent = endReference;
        }
        if (entity.getParent() !== activeParent) {
          entity.setParent(activeParent);
        }
        const startPositionInReference = PioneerPublicApi.Vector3.pool.get();
        const endPositionInReference = PioneerPublicApi.Vector3.pool.get();
        startReference.getPositionRelativeToEntity(startPositionInReference, startKeyframe.position, endReference);
        endReference.getPositionRelativeToEntity(endPositionInReference, endKeyframe.position, startReference);
        let startAltitudeAtStart = Math.max(0, startKeyframe.position.magnitude() - startReference.getOcclusionRadius());
        let endAltitudeAtStart = Math.max(0, endPositionInReference.magnitude() - startReference.getOcclusionRadius());
        let startAltitudeAtEnd = Math.max(0, startPositionInReference.magnitude() - endReference.getOcclusionRadius());
        let endAltitudeAtEnd = Math.max(0, endKeyframe.position.magnitude() - endReference.getOcclusionRadius());
        startAltitudeAtStart = Math.max(startAltitudeAtStart, endAltitudeAtStart / 1e4);
        endAltitudeAtStart = Math.max(endAltitudeAtStart, startAltitudeAtStart / 1e4);
        startAltitudeAtEnd = Math.max(startAltitudeAtEnd, endAltitudeAtEnd / 1e4);
        endAltitudeAtEnd = Math.max(endAltitudeAtEnd, endAltitudeAtStart / 1e4);
        if (startAltitudeAtStart !== endAltitudeAtStart && startAltitudeAtEnd !== endAltitudeAtEnd) {
          const startDistanceFraction = (endAltitudeAtStart ** fraction * startAltitudeAtStart ** (1 - fraction) - startAltitudeAtStart) / (endAltitudeAtStart - startAltitudeAtStart);
          const endDistanceFraction = (endAltitudeAtEnd ** fraction * startAltitudeAtEnd ** (1 - fraction) - startAltitudeAtEnd) / (endAltitudeAtEnd - startAltitudeAtEnd);
          fraction = PioneerPublicApi.MathUtils.lerp(startDistanceFraction, endDistanceFraction, fraction);
        }
        const fractionSquared = fraction * fraction;
        fraction = fractionSquared / (2 * (fractionSquared - fraction) + 1);
        startReference.getPositionRelativeToEntity(startPositionInReference, startKeyframe.position, activeParent);
        endReference.getPositionRelativeToEntity(endPositionInReference, endKeyframe.position, activeParent);
        const position = PioneerPublicApi.Vector3.pool.get();
        if (startReference === endReference) {
          position.slerp(startPositionInReference, endPositionInReference, fraction);
        } else {
          position.lerp(startPositionInReference, endPositionInReference, fraction);
        }
        entity.setPosition(position);
        PioneerPublicApi.Vector3.pool.release(position);
        PioneerPublicApi.Vector3.pool.release(startPositionInReference);
        PioneerPublicApi.Vector3.pool.release(endPositionInReference);
      }
    } else if (positionIndex === this._positionKeyframes.length) {
      const finalPositionKeyframe = this._positionKeyframes[this._positionKeyframes.length - 1];
      const finalParent = finalPositionKeyframe.relativeTo.get();
      if (entity.getParent() !== finalParent) {
        entity.setParent(finalParent);
      }
      entity.setPosition(finalPositionKeyframe.position);
      positionComplete = true;
    }
    const focusDirection = PioneerPublicApi.Vector3.pool.get();
    focusDirection.setMagnitude(entity.getPosition(), -1);
    const upDirection = PioneerPublicApi.Vector3.pool.get();
    entity.getOrientation().getAxis(upDirection, 2);
    let focusComplete = false;
    const focusIndex = PioneerPublicApi.Sort.getIndexObject(elapsedTime, this._focusKeyframes, OrbitKeyframeController.isLessThanTime);
    if (focusIndex > 0 && focusIndex < this._focusKeyframes.length) {
      const startFocusKeyframe = this._focusKeyframes[focusIndex - 1];
      const endFocusKeyframe = this._focusKeyframes[focusIndex];
      const startFocusEntity = startFocusKeyframe.focus.get();
      const endFocusEntity = endFocusKeyframe.focus.get();
      const parentEntity = entity.getParent();
      if (!("" !== startFocusKeyframe.focus.getName() && null === startFocusEntity || "" !== endFocusKeyframe.focus.getName() && null === endFocusEntity || null === parentEntity)) {
        let fraction = (elapsedTime - startFocusKeyframe.time) / (endFocusKeyframe.time - startFocusKeyframe.time);
        const fractionSquared = fraction * fraction;
        fraction = fractionSquared / (2 * (fractionSquared - fraction) + 1);
        const startFocusDirection = PioneerPublicApi.Vector3.pool.get();
        const endFocusDirection = PioneerPublicApi.Vector3.pool.get();
        if (startFocusEntity) {
          parentEntity.getPositionRelativeToEntity(startFocusDirection, entity.getPosition(), startFocusEntity);
          startFocusDirection.setMagnitude(startFocusDirection, -1);
          if (startFocusDirection.isZero()) {
            this.getEntity().getOrientation().getAxis(startFocusDirection, 1);
          }
        } else {
          startFocusDirection.copy(this._directionOfFirstUpdate);
        }
        if (endFocusEntity) {
          parentEntity.getPositionRelativeToEntity(endFocusDirection, entity.getPosition(), endFocusEntity);
          endFocusDirection.setMagnitude(endFocusDirection, -1);
          if (endFocusDirection.isZero()) {
            this.getEntity().getOrientation().getAxis(endFocusDirection, 1);
          }
        } else {
          endFocusDirection.copy(this._directionOfFirstUpdate);
        }
        focusDirection.slerp(startFocusDirection, endFocusDirection, fraction);
        PioneerPublicApi.Vector3.pool.release(startFocusDirection);
        PioneerPublicApi.Vector3.pool.release(endFocusDirection);
      }
    } else if (focusIndex === this._focusKeyframes.length) {
      const finalFocusEntity = this._focusKeyframes[this._focusKeyframes.length - 1].focus.get();
      const parentEntity = entity.getParent();
      if (null !== finalFocusEntity && null !== parentEntity) {
        parentEntity.getPositionRelativeToEntity(focusDirection, entity.getPosition(), finalFocusEntity);
        focusDirection.setMagnitude(focusDirection, -1);
        if (focusDirection.isZero()) {
          this.getEntity().getOrientation().getAxis(focusDirection, 1);
        }
      }
      focusComplete = true;
    } else {
      const firstFocusKeyframe = this._focusKeyframes[0];
      const firstFocusEntity = firstFocusKeyframe.focus.get();
      const parentEntity = entity.getParent();
      if (!("" !== firstFocusKeyframe.focus.getName() && null === firstFocusEntity || null === parentEntity)) {
        if (firstFocusEntity) {
          parentEntity.getPositionRelativeToEntity(focusDirection, entity.getPosition(), firstFocusEntity);
          focusDirection.setMagnitude(focusDirection, -1);
          if (focusDirection.isZero()) {
            this.getEntity().getOrientation().getAxis(focusDirection, 1);
          }
        } else {
          focusDirection.copy(this._directionOfFirstUpdate);
        }
      }
    }
    let upComplete = false;
    const upIndex = PioneerPublicApi.Sort.getIndexObject(elapsedTime, this._upKeyframes, OrbitKeyframeController.isLessThanTime);
    if (upIndex > 0 && upIndex < this._upKeyframes.length) {
      const startUpKeyframe = this._upKeyframes[upIndex - 1];
      const endUpKeyframe = this._upKeyframes[upIndex];
      let fraction = (elapsedTime - startUpKeyframe.time) / (endUpKeyframe.time - startUpKeyframe.time);
      const fractionSquared = fraction * fraction;
      fraction = fractionSquared / (2 * (fractionSquared - fraction) + 1);
      upDirection.slerp(startUpKeyframe.up, endUpKeyframe.up, fraction);
    } else if (upIndex === this._upKeyframes.length) {
      const finalUpKeyframe = this._upKeyframes[this._upKeyframes.length - 1];
      upDirection.copy(finalUpKeyframe.up);
      upComplete = true;
    }
    const orientation = PioneerPublicApi.Quaternion.pool.get();
    upDirection.setNormalTo(focusDirection, upDirection);
    orientation.setFromAxes(void 0, focusDirection, upDirection);
    entity.setOrientation(orientation);
    PioneerPublicApi.Quaternion.pool.release(orientation);
    PioneerPublicApi.Vector3.pool.release(focusDirection);
    if (positionComplete && focusComplete && upComplete) {
      this._rejectPromise = null;
      this._resolvePromise();
    }
  }
  static isLess = (leftKeyframe, rightKeyframe) => leftKeyframe.time < rightKeyframe.time;
  static isLessThanTime = (leftKeyframe, time) => leftKeyframe.time < time;
  static isEqual = (leftKeyframe, rightKeyframe) => leftKeyframe.time === rightKeyframe.time;
  _positionKeyframes;
  _focusKeyframes;
  _upKeyframes;
  _timeOfFirstUpdate;
  _directionOfFirstUpdate;
  _resolvePromise;
  _rejectPromise;
  _endPromise;
}
class Keyframe {
  time;
  constructor() {
    this.time = NaN;
  }
}
class PositionKeyframe extends Keyframe {
  position;
  relativeTo;
  constructor(scene) {
    super();
    this.position = new PioneerPublicApi.Vector3();
    this.relativeTo = new PioneerPublicApi.EntityRef(scene);
  }
}
class FocusKeyframe extends Keyframe {
  focus;
  constructor(scene) {
    super();
    this.focus = new PioneerPublicApi.EntityRef(scene);
  }
}
class UpKeyframe extends Keyframe {
  up;
  constructor() {
    super();
    this.up = new PioneerPublicApi.Vector3();
  }
}
export { OrbitKeyframeController };
