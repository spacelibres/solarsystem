/** @eyes-analysis
 * 文件职责：取得模型动画片段并通过 Three.js 动画混合器按仿真时间播放。
 * 依据：import ../pioneer/public-api.js；ModelAnimateController extends PioneerPublicApi.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:492629-494120.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：取得模型动画片段并通过 Three.js 动画混合器按仿真时间播放。
 * 继承：PioneerPublicApi.BaseController；导出：ModelAnimateController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ModelAnimateController extends PioneerPublicApi.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_animations`；调用 `super`。
   * 状态写入：_animations。
   * 调用线索：super。
   */
  constructor(t, e) {
    super(t, e);
    this._animations = [];
  }
  /** @eyes-analysis
   * 【结构证据】调用 `new Error`、`this._animations.push`；含显式错误分支。
   * 调用线索：new Error、this._animations.push。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.MathUtils.clamp01`、`i.animationMixer.clipAction`、`i.animationMixer.clipAction(i.animationClip).play`、`i.animationMixer.setTime`、`i.animationMixer.update`、`i.model.getAnimationClip`。
   * 调用线索：PioneerPublicApi.MathUtils.clamp01、i.animationMixer.clipAction、i.animationMixer.clipAction(i.animationClip).play、i.animationMixer.setTime、i.animationMixer.update等。
   */
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
