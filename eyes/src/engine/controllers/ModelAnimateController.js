// Recovered from app.js:492629-494120.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class ModelAnimateController extends PioneerPublicApi.BaseController {
  constructor(t, e) {
    super(t, e);
    this._animations = [];
  }
  setAnimation(t, e, i, s) {
    if (null === t) throw new Error("Null model specified.");
    this._animations.push({
      model: t,
      jointName: e,
      animationName: i,
      interval: s,
      animationClip: null,
      rootObject: null,
      jointObject: null,
      animationMixer: null
    });
  }
  __update() {
    const t = this.getEntity().getScene().getEngine().getTime();
    for (let e = 0, i = this._animations.length; e < i; e++) {
      const i = this._animations[e];
      if (i.model.isDestroyed()) {
        this._animations.splice(e, 1);
        e--;
      } else if (i.model.getThreeJsObjects()[0]) {
        if (i.rootObject !== i.model.getThreeJsObjects()[0] && (i.rootObject = i.model.getThreeJsObjects()[0], i.animationClip = null, i.jointObject = null, i.animationMixer = null), i.animationClip ??= i.model.getAnimationClip(i.animationName), null === i.jointObject) {
          const t = i.model.getThreeJsObjectByName(i.jointName);
          null !== t && (i.jointObject = t);
        }
        if (null === i.animationMixer && null !== i.animationClip && null !== i.jointObject && (i.animationMixer = new PioneerPublicApi.THREE.AnimationMixer(i.jointObject), i.animationMixer.clipAction(i.animationClip).play()), i.animationMixer && i.animationClip) {
          const e = i.animationClip.tracks[0];
          const n = PioneerPublicApi.MathUtils.clamp01((t - i.interval.min) / (i.interval.max - i.interval.min));
          const o = i.animationClip.duration * n * (e.times.length - 1) / e.times.length;
          i.animationMixer.setTime(o);
          i.animationMixer.update(0);
        }
      } else i.rootObject = null;
    }
  }
  _animations;
}
export { ModelAnimateController };
