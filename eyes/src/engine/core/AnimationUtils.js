// Recovered from app.js:546745-547759.
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
