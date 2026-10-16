// Recovered from app.js:492629-494120.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 场景时间映射到动画区间，模型根更换时重建 clip/joint/mixer 缓存；clip 时间保留末轨道采样数量修正。 */

class ModelAnimateController extends PioneerPublicApi.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this._animations = [];
  }
  setAnimation(model, jointName, animationName, interval) {
    if (null === model) throw new Error("Null model specified.");
    this._animations.push({
      model: model,
      jointName: jointName,
      animationName: animationName,
      interval: interval,
      animationClip: null,
      rootObject: null,
      jointObject: null,
      animationMixer: null
    });
  }
  __update() {
    const time = this.getEntity().getScene().getEngine().getTime();
    for (let firstTrack = 0, animation = this._animations.length; firstTrack < animation; firstTrack++) {
      const animation = this._animations[firstTrack];
      if (animation.model.isDestroyed()) {
        this._animations.splice(firstTrack, 1);
        firstTrack--;
      } else if (animation.model.getThreeJsObjects()[0]) {
        if (animation.rootObject !== animation.model.getThreeJsObjects()[0]) {
          animation.rootObject = animation.model.getThreeJsObjects()[0];
          animation.animationClip = null;
          animation.jointObject = null;
          animation.animationMixer = null;
        }
        animation.animationClip ??= animation.model.getAnimationClip(animation.animationName);
        if (null === animation.jointObject) {
          const jointObject = animation.model.getThreeJsObjectByName(animation.jointName);
          if (null !== jointObject) {
            animation.jointObject = jointObject;
          }
        }
        if (null === animation.animationMixer && null !== animation.animationClip && null !== animation.jointObject) {
          animation.animationMixer = new PioneerPublicApi.THREE.AnimationMixer(animation.jointObject);
          animation.animationMixer.clipAction(animation.animationClip).play();
        }
        if (animation.animationMixer && animation.animationClip) {
          const firstTrack = animation.animationClip.tracks[0];
          const fraction = PioneerPublicApi.MathUtils.clamp01((time - animation.interval.min) / (animation.interval.max - animation.interval.min));
          const clipTime = animation.animationClip.duration * fraction * (firstTrack.times.length - 1) / firstTrack.times.length;
          animation.animationMixer.setTime(clipTime);
          animation.animationMixer.update(0);
        }
      } else animation.rootObject = null;
    }
  }
  _animations;
}
export { ModelAnimateController };
