/** @eyes-analysis
 * 文件职责：按当前/前一索引判断 next/prev/reset 并发射过渡阶段事件
 * 依据：// Recovered from vendors.js:1617356-1617787.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
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
