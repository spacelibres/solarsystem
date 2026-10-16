/** 封装 Web Animations API；位移用元素百分比，方向控制起止偏移符号，timings 和原键名直接传给浏览器。 */
// Recovered from app.js:546745-547759.
class AnimationUtils {}
AnimationUtils.createAnimation = (element, keyframes, timings) => {
  const keyframeEffect = new KeyframeEffect(element, keyframes, timings);
  return new Animation(keyframeEffect, element.ownerDocument.timeline);
};
AnimationUtils.directionalFade = (element, {
  direction = "up",
  fade = "in",
  yOffset = 0,
  xOffset = 0,
  timings = AnimationUtils.defaultTimings
}) => {
  const endpoints = {
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
  if ("up" === direction || "down" === direction) {
    endpoints.y.ori = "in" === fade ? 100 : 0;
    endpoints.y.dest = 100 - endpoints.y.ori;
    if ("up" === direction) {
      endpoints.y.ori *= -1;
      endpoints.y.dest *= -1;
    }
  } else {
    endpoints.x.ori = "in" === fade ? 100 : 0;
    endpoints.x.dest = 100 - endpoints.x.ori;
    if ("left" === direction) {
      endpoints.x.ori *= -1;
      endpoints.x.dest *= -1;
    }
  }
  if ("in" === fade) {
    endpoints.opacity.ori = 0;
    endpoints.opacity.dest = 1;
  }
  endpoints.x.ori += xOffset;
  endpoints.x.dest += xOffset;
  endpoints.y.ori += yOffset;
  endpoints.y.dest += yOffset;
  const keyframes = [{
    transform: "translate(" + endpoints.x.ori + "%, " + endpoints.y.ori + "%)",
    opacity: endpoints.opacity.ori
  }, {
    transform: "translate(" + endpoints.x.dest + "%, " + endpoints.y.dest + "%)",
    opacity: endpoints.opacity.dest
  }];
  return AnimationUtils.createAnimation(element, keyframes, timings);
};
AnimationUtils.defaultTimings = {
  duration: 1e3,
  iteration: 1,
  fill: "forwards",
  easing: "ease"
};
export { AnimationUtils };
