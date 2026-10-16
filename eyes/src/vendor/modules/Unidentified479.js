/** @eyes-analysis
 * 文件职责：Swiper 的 FreeMode 功能插件；按初始化、更新和销毁事件管理状态及 DOM
 * 依据：// Recovered from vendors.js:1703435-1706603.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1703435-1706603.
import * as animateCSSModeScroll from "./animateCSSModeScroll.js";
function i({
  swiper: swiper,
  extendParams: extendParams,
  emit: emit,
  once: once
}) {
  extendParams({
    freeMode: {
      enabled: !1,
      momentum: !0,
      momentumRatio: 1,
      momentumBounce: !0,
      momentumBounceRatio: 1,
      momentumVelocityRatio: 1,
      sticky: !1,
      minimumVelocity: .02
    }
  }), Object.assign(swiper, {
    freeMode: {
      onTouchMove: function () {
        const {
          touchEventsData: touchEventsData,
          touches: touches
        } = swiper;
        0 === touchEventsData.velocities.length && touchEventsData.velocities.push({
          position: touches[swiper.isHorizontal() ? "startX" : "startY"],
          time: touchEventsData.touchStartTime
        }), touchEventsData.velocities.push({
          position: touches[swiper.isHorizontal() ? "currentX" : "currentY"],
          time: (0, animateCSSModeScroll.now)()
        });
      },
      onTouchEnd: function ({
        currentPos: currentPos
      }) {
        const {
            params: params,
            $wrapperEl: $wrapperEl,
            rtlTranslate: rtlTranslate,
            snapGrid: snapGrid,
            touchEventsData: touchEventsData
          } = swiper,
          u = (0, animateCSSModeScroll.now)() - touchEventsData.touchStartTime;
        if (currentPos < -swiper.minTranslate()) swiper.slideTo(swiper.activeIndex);else if (currentPos > -swiper.maxTranslate()) swiper.slides.length < snapGrid.length ? swiper.slideTo(snapGrid.length - 1) : swiper.slideTo(swiper.slides.length - 1);else {
          if (params.freeMode.momentum) {
            if (touchEventsData.velocities.length > 1) {
              const t = touchEventsData.velocities.pop(),
                n = touchEventsData.velocities.pop(),
                i = t.position - n.position,
                s = t.time - n.time;
              swiper.velocity = i / s, swiper.velocity /= 2, Math.abs(swiper.velocity) < params.freeMode.minimumVelocity && (swiper.velocity = 0), (s > 150 || (0, animateCSSModeScroll.now)() - t.time > 300) && (swiper.velocity = 0);
            } else swiper.velocity = 0;
            swiper.velocity *= params.freeMode.momentumVelocityRatio, touchEventsData.velocities.length = 0;
            let t = 1e3 * params.freeMode.momentumRatio;
            const u = swiper.velocity * t;
            let d = swiper.translate + u;
            rtlTranslate && (d = -d);
            let h,
              p = !1;
            const f = 20 * Math.abs(swiper.velocity) * params.freeMode.momentumBounceRatio;
            let m;
            if (d < swiper.maxTranslate()) params.freeMode.momentumBounce ? (d + swiper.maxTranslate() < -f && (d = swiper.maxTranslate() - f), h = swiper.maxTranslate(), p = !0, touchEventsData.allowMomentumBounce = !0) : d = swiper.maxTranslate(), params.loop && params.centeredSlides && (m = !0);else if (d > swiper.minTranslate()) params.freeMode.momentumBounce ? (d - swiper.minTranslate() > f && (d = swiper.minTranslate() + f), h = swiper.minTranslate(), p = !0, touchEventsData.allowMomentumBounce = !0) : d = swiper.minTranslate(), params.loop && params.centeredSlides && (m = !0);else if (params.freeMode.sticky) {
              let t;
              for (let e = 0; e < snapGrid.length; e += 1) if (snapGrid[e] > -d) {
                t = e;
                break;
              }
              d = Math.abs(snapGrid[t] - d) < Math.abs(snapGrid[t - 1] - d) || "next" === swiper.swipeDirection ? snapGrid[t] : snapGrid[t - 1], d = -d;
            }
            if (m && once("transitionEnd", () => {
              swiper.loopFix();
            }), 0 !== swiper.velocity) {
              if (t = rtlTranslate ? Math.abs((-d - swiper.translate) / swiper.velocity) : Math.abs((d - swiper.translate) / swiper.velocity), params.freeMode.sticky) {
                const n = Math.abs((rtlTranslate ? -d : d) - swiper.translate),
                  r = swiper.slidesSizesGrid[swiper.activeIndex];
                t = n < r ? params.speed : n < 2 * r ? 1.5 * params.speed : 2.5 * params.speed;
              }
            } else if (params.freeMode.sticky) return void swiper.slideToClosest();
            params.freeMode.momentumBounce && p ? (swiper.updateProgress(h), swiper.setTransition(t), swiper.setTranslate(d), swiper.transitionStart(!0, swiper.swipeDirection), swiper.animating = !0, $wrapperEl.transitionEnd(() => {
              swiper && !swiper.destroyed && touchEventsData.allowMomentumBounce && (emit("momentumBounce"), swiper.setTransition(params.speed), setTimeout(() => {
                swiper.setTranslate(h), $wrapperEl.transitionEnd(() => {
                  swiper && !swiper.destroyed && swiper.transitionEnd();
                });
              }, 0));
            })) : swiper.velocity ? (emit("_freeModeNoMomentumRelease"), swiper.updateProgress(d), swiper.setTransition(t), swiper.setTranslate(d), swiper.transitionStart(!0, swiper.swipeDirection), swiper.animating || (swiper.animating = !0, $wrapperEl.transitionEnd(() => {
              swiper && !swiper.destroyed && swiper.transitionEnd();
            }))) : swiper.updateProgress(d), swiper.updateActiveIndex(), swiper.updateSlidesClasses();
          } else {
            if (params.freeMode.sticky) return void swiper.slideToClosest();
            params.freeMode && emit("_freeModeNoMomentumRelease");
          }
          (!params.freeMode.momentum || u >= params.longSwipesMs) && (swiper.updateProgress(), swiper.updateActiveIndex(), swiper.updateSlidesClasses());
        }
      }
    }
  });
}
export { i as default };
