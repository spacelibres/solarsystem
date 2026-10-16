/** @eyes-analysis
 * 文件职责：为动画生成插值/缓动函数和组合操作。
 * 依据：顶层副作用 AnimationUtils.createAnimation=(t,e,i)=>{const keyframeEffect=new KeyframeEffect(t,e,i);return new Animation(keyframeEffect,t.ownerDocument.timeline);}；顶层副作用 AnimationUtils.directionalFade=(t,{direction:e="up",fade:i="in",yOffset:s=0,xOffset:n=0,timings:o=AnimationUtils.defaultTimings})=>{const r={x:{ori:0,dest:0},y:{ori:0,dest:0},opacity:{ori:1,dest:0}};"up"===e||"down"===e?
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:546745-547759.
/** @eyes-analysis
 * 类职责：为动画生成插值/缓动函数和组合操作。
 * 继承：无显式父类；导出：AnimationUtils。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class AnimationUtils {}
AnimationUtils.createAnimation = (t, e, i) => {
  const keyframeEffect = new KeyframeEffect(t, e, i);
  return new Animation(keyframeEffect, t.ownerDocument.timeline);
};
AnimationUtils.directionalFade = (t, {
  direction: e = "up",
  fade: i = "in",
  yOffset: s = 0,
  xOffset: n = 0,
  timings: o = AnimationUtils.defaultTimings
}) => {
  const r = {
    x: {
      ori: 0,
      dest: 0
    },
    y: {
      ori: 0,
      dest: 0
    },
    opacity: {
      ori: 1,
      dest: 0
    }
  };
  "up" === e || "down" === e ? (r.y.ori = "in" === i ? 100 : 0, r.y.dest = 100 - r.y.ori, "up" === e && (r.y.ori *= -1, r.y.dest *= -1)) : (r.x.ori = "in" === i ? 100 : 0, r.x.dest = 100 - r.x.ori, "left" === e && (r.x.ori *= -1, r.x.dest *= -1));
  "in" === i && (r.opacity.ori = 0, r.opacity.dest = 1);
  r.x.ori += n;
  r.x.dest += n;
  r.y.ori += s;
  r.y.dest += s;
  const a = [{
    transform: "translate(" + r.x.ori + "%, " + r.y.ori + "%)",
    opacity: r.opacity.ori
  }, {
    transform: "translate(" + r.x.dest + "%, " + r.y.dest + "%)",
    opacity: r.opacity.dest
  }];
  return AnimationUtils.createAnimation(t, a, o);
};
AnimationUtils.defaultTimings = {
  duration: 1e3,
  iteration: 1,
  fill: "forwards",
  easing: "ease"
};
export { AnimationUtils };
