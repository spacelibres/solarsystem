// Recovered from vendors.js:1617356-1617787.
function r({
  swiper: swiper,
  runCallbacks: runCallbacks,
  direction: direction,
  step: step
}) {
  const {
    activeIndex: activeIndex,
    previousIndex: previousIndex
  } = swiper;
  let s = direction;
  if (s || (s = activeIndex > previousIndex ? "next" : activeIndex < previousIndex ? "prev" : "reset"), swiper.emit(`transition${step}`), runCallbacks && activeIndex !== previousIndex) {
    if ("reset" === s) return void swiper.emit(`slideResetTransition${step}`);
    swiper.emit(`slideChangeTransition${step}`), "next" === s ? swiper.emit(`slideNextTransition${step}`) : swiper.emit(`slidePrevTransition${step}`);
  }
}
export { r as default };
