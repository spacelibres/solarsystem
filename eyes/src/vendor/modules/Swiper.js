/** @eyes-analysis
 * 文件职责：轮播实例，组合尺寸、事件、滑动、循环与扩展模块生命周期
 * 依据：// Recovered from vendors.js:1565231-1573320.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1565231-1573320.
import * as extend from "./extend.js";
import * as Dom7Entry from "./Dom7Entry.js";
import * as animateCSSModeScroll from "./animateCSSModeScroll.js";
import * as getSupport from "./getSupport.js";
import * as getDevice from "./getDevice.js";
import * as getBrowser from "./getBrowser.js";
import * as Unidentified404 from "./Unidentified404.js";
import * as Unidentified405 from "./Unidentified405.js";
import * as Unidentified406 from "./Unidentified406.js";
import * as Unidentified407 from "./Unidentified407.js";
import * as Unidentified417 from "./Unidentified417.js";
import * as Unidentified423 from "./Unidentified423.js";
import * as Unidentified428 from "./Unidentified428.js";
import * as Unidentified436 from "./Unidentified436.js";
import * as Unidentified440 from "./Unidentified440.js";
import * as Unidentified443 from "./Unidentified443.js";
import * as Unidentified450 from "./Unidentified450.js";
import * as Unidentified453 from "./Unidentified453.js";
import * as Unidentified456 from "./Unidentified456.js";
import * as Unidentified459 from "./Unidentified459.js";
import * as Unidentified460 from "./Unidentified460.js";
import * as Unidentified461 from "./Unidentified461.js";
let defaultExport;
const S = {
    eventsEmitter: Unidentified406.default,
    update: Unidentified407.default,
    translate: Unidentified417.default,
    transition: Unidentified423.default,
    slide: Unidentified428.default,
    loop: Unidentified436.default,
    grabCursor: Unidentified440.default,
    events: Unidentified443.default,
    breakpoints: Unidentified450.default,
    checkOverflow: Unidentified459.default,
    classes: Unidentified453.default,
    images: Unidentified456.default
  },
  w = {};
/** @eyes-analysis
 * 类职责：轮播实例，组合尺寸、事件、滑动、循环与扩展模块生命周期
 * 继承：无显式父类；导出：default。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Swiper {
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 调用线索：(0,Dom7Entry.default)(n.el).each、0,Dom7Entry.default、0,Unidentified461.default、0,animateCSSModeScroll.extend、0,animateCSSModeScroll.now等。
   */
  constructor(...e) {
    let t, n;
    if (1 === e.length && e[0].constructor && "Object" === Object.prototype.toString.call(e[0]).slice(8, -1) ? n = e[0] : [t, n] = e, n || (n = {}), n = (0, animateCSSModeScroll.extend)({}, n), t && !n.el && (n.el = t), n.el && (0, Dom7Entry.default)(n.el).length > 1) {
      const e = [];
      return (0, Dom7Entry.default)(n.el).each(t => {
        const r = (0, animateCSSModeScroll.extend)({}, n, {
          el: t
        });
        e.push(new Swiper(r));
      }), e;
    }
    const r = this;
    r.__swiper__ = !0, r.support = (0, getSupport.getSupport)(), r.device = (0, getDevice.getDevice)({
      userAgent: n.userAgent
    }), r.browser = (0, getBrowser.getBrowser)(), r.eventsListeners = {}, r.eventsAnyListeners = [], r.modules = [...r.__modules__], n.modules && Array.isArray(n.modules) && r.modules.push(...n.modules);
    const l = {};
    r.modules.forEach(e => {
      e({
        swiper: r,
        extendParams: (0, Unidentified461.default)(n, l),
        on: r.on.bind(r),
        once: r.once.bind(r),
        off: r.off.bind(r),
        emit: r.emit.bind(r)
      });
    });
    const u = (0, animateCSSModeScroll.extend)({}, Unidentified460.default, l);
    return r.params = (0, animateCSSModeScroll.extend)({}, u, w, n), r.originalParams = (0, animateCSSModeScroll.extend)({}, r.params), r.passedParams = (0, animateCSSModeScroll.extend)({}, n), r.params && r.params.on && Object.keys(r.params.on).forEach(e => {
      r.on(e, r.params.on[e]);
    }), r.params && r.params.onAny && r.onAny(r.params.onAny), r.$ = Dom7Entry.default, Object.assign(r, {
      enabled: r.params.enabled,
      el: t,
      classNames: [],
      slides: (0, Dom7Entry.default)(),
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      isHorizontal() {
        return "horizontal" === r.params.direction;
      },
      isVertical() {
        return "vertical" === r.params.direction;
      },
      activeIndex: 0,
      realIndex: 0,
      isBeginning: !0,
      isEnd: !1,
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: !1,
      allowSlideNext: r.params.allowSlideNext,
      allowSlidePrev: r.params.allowSlidePrev,
      touchEvents: function () {
        const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
          t = ["pointerdown", "pointermove", "pointerup"];
        return r.touchEventsTouch = {
          start: e[0],
          move: e[1],
          end: e[2],
          cancel: e[3]
        }, r.touchEventsDesktop = {
          start: t[0],
          move: t[1],
          end: t[2]
        }, r.support.touch || !r.params.simulateTouch ? r.touchEventsTouch : r.touchEventsDesktop;
      }(),
      touchEventsData: {
        isTouched: void 0,
        isMoved: void 0,
        allowTouchCallbacks: void 0,
        touchStartTime: void 0,
        isScrolling: void 0,
        currentTranslate: void 0,
        startTranslate: void 0,
        allowThresholdMove: void 0,
        focusableElements: r.params.focusableElements,
        lastClickTime: (0, animateCSSModeScroll.now)(),
        clickTimeout: void 0,
        velocities: [],
        allowMomentumBounce: void 0,
        isTouchEvent: void 0,
        startMoving: void 0
      },
      allowClick: !0,
      allowTouchMove: r.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      imagesToLoad: [],
      imagesLoaded: 0
    }), r.emit("_swiper"), r.params.init && r.init(), r;
  }
  /** @eyes-analysis
   * 源码方法 enable；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：e.emit、e.setGrabCursor。
   */
  enable() {
    const e = this;
    e.enabled || (e.enabled = !0, e.params.grabCursor && e.setGrabCursor(), e.emit("enable"));
  }
  /** @eyes-analysis
   * 源码方法 disable；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：e.emit、e.unsetGrabCursor。
   */
  disable() {
    const e = this;
    e.enabled && (e.enabled = !1, e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"));
  }
  /** @eyes-analysis
   * 源码方法 setProgress；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：Math.max、Math.min、n.maxTranslate、n.minTranslate、n.translateTo等。
   */
  setProgress(e, t) {
    const n = this;
    e = Math.min(Math.max(e, 0), 1);
    const r = n.minTranslate(),
      i = (n.maxTranslate() - r) * e + r;
    n.translateTo(i, void 0 === t ? 0 : t), n.updateActiveIndex(), n.updateSlidesClasses();
  }
  /** @eyes-analysis
   * 源码方法 emitContainerClasses；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：e.el.className.split、e.el.className.split(" ").filter、e.emit、t.indexOf、t.join。
   */
  emitContainerClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = e.el.className.split(" ").filter(t => 0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass));
    e.emit("_containerClasses", t.join(" "));
  }
  /** @eyes-analysis
   * 源码方法 getSlideClasses；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：e.className.split、e.className.split(" ").filter、e.className.split(" ").filter(e=>0===e.indexOf("swiper-slide")||0===e.indexOf(t.params.slideClass)).join、e.indexOf。
   */
  getSlideClasses(e) {
    const t = this;
    return e.className.split(" ").filter(e => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass)).join(" ");
  }
  /** @eyes-analysis
   * 源码方法 emitSlidesClasses；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：e.emit、e.getSlideClasses、e.slides.each、t.push。
   */
  emitSlidesClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = [];
    e.slides.each(n => {
      const r = e.getSlideClasses(n);
      t.push({
        slideEl: n,
        classNames: r
      }), e.emit("_slideClass", n, r);
    }), e.emit("_slideClasses", t);
  }
  /** @eyes-analysis
   * 源码方法 slidesPerViewDynamic；作用以类职责与源码实现为准，未猜测压缩参数含义
   */
  slidesPerViewDynamic(e = "current", t = !1) {
    const {
      params: params,
      slides: slides,
      slidesGrid: slidesGrid,
      slidesSizesGrid: slidesSizesGrid,
      size: size,
      activeIndex: activeIndex
    } = this;
    let c = 1;
    if (params.centeredSlides) {
      let e,
        t = slides[activeIndex].swiperSlideSize;
      for (let n = activeIndex + 1; n < slides.length; n += 1) slides[n] && !e && (t += slides[n].swiperSlideSize, c += 1, t > size && (e = !0));
      for (let n = activeIndex - 1; n >= 0; n -= 1) slides[n] && !e && (t += slides[n].swiperSlideSize, c += 1, t > size && (e = !0));
    } else if ("current" === e) for (let e = activeIndex + 1; e < slides.length; e += 1) {
      (t ? slidesGrid[e] + slidesSizesGrid[e] - slidesGrid[activeIndex] < size : slidesGrid[e] - slidesGrid[activeIndex] < size) && (c += 1);
    } else for (let e = activeIndex - 1; e >= 0; e -= 1) {
      slidesGrid[activeIndex] - slidesGrid[e] < size && (c += 1);
    }
    return c;
  }
  /** @eyes-analysis
   * 按当前时间或场景状态推进对象并维护缓存失效
   * 调用线索：Math.max、Math.min、e.checkOverflow、e.emit、e.maxTranslate等。
   */
  update() {
    const e = this;
    if (!e || e.destroyed) return;
    const {
      snapGrid: snapGrid,
      params: params
    } = e;
    function r() {
      const t = e.rtlTranslate ? -1 * e.translate : e.translate,
        n = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
      e.setTranslate(n), e.updateActiveIndex(), e.updateSlidesClasses();
    }
    let i;
    params.breakpoints && e.setBreakpoint(), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode && e.params.freeMode.enabled ? (r(), e.params.autoHeight && e.updateAutoHeight()) : (i = ("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), i || r()), params.watchOverflow && snapGrid !== e.snapGrid && e.checkOverflow(), e.emit("update");
  }
  /** @eyes-analysis
   * 源码方法 changeDirection；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：n.$el.removeClass、n.$el.removeClass(`${n.params.containerModifierClass}${r}`).addClass、n.emit、n.emitContainerClasses、n.slides.each等。
   */
  changeDirection(e, t = !0) {
    const n = this,
      r = n.params.direction;
    return e || (e = "horizontal" === r ? "vertical" : "horizontal"), e === r || "horizontal" !== e && "vertical" !== e || (n.$el.removeClass(`${n.params.containerModifierClass}${r}`).addClass(`${n.params.containerModifierClass}${e}`), n.emitContainerClasses(), n.params.direction = e, n.slides.each(t => {
      "vertical" === e ? t.style.width = "" : t.style.height = "";
    }), n.emit("changeDirection"), t && n.update()), n;
  }
  /** @eyes-analysis
   * 源码方法 mount；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：()=>{if(e&&e.shadowRoot&&e.shadowRoot.querySelector){const t=(0,Dom7Entry.default)(e.shadowRoot.querySelector(a()));return t.children=e=>n.children(e),t;}return n.children(a());}、(0,extend.getDocument)().createElement、(t.params.wrapperClass||"").trim、(t.params.wrapperClass||"").trim().split、(t.params.wrapperClass||"").trim().split(" ").join等。
   */
  mount(e) {
    const t = this;
    if (t.mounted) return !0;
    const n = (0, Dom7Entry.default)(e || t.params.el);
    if (!(e = n[0])) return !1;
    e.swiper = t;
    const a = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let s = (() => {
      if (e && e.shadowRoot && e.shadowRoot.querySelector) {
        const t = (0, Dom7Entry.default)(e.shadowRoot.querySelector(a()));
        return t.children = e => n.children(e), t;
      }
      return n.children(a());
    })();
    if (0 === s.length && t.params.createElements) {
      const e = (0, extend.getDocument)().createElement("div");
      s = (0, Dom7Entry.default)(e), e.className = t.params.wrapperClass, n.append(e), n.children(`.${t.params.slideClass}`).each(e => {
        s.append(e);
      });
    }
    return Object.assign(t, {
      $el: n,
      el: e,
      $wrapperEl: s,
      wrapperEl: s[0],
      mounted: !0,
      rtl: "rtl" === e.dir.toLowerCase() || "rtl" === n.css("direction"),
      rtlTranslate: "horizontal" === t.params.direction && ("rtl" === e.dir.toLowerCase() || "rtl" === n.css("direction")),
      wrongRTL: "-webkit-box" === s.css("display")
    }), !0;
  }
  /** @eyes-analysis
   * 初始化延迟资源和运行时能力；必须先完成再使用依赖资源的方法
   * 调用线索：t.addClasses、t.attachEvents、t.checkOverflow、t.emit、t.loopCreate等。
   */
  init(e) {
    const t = this;
    if (t.initialized) return t;
    return !1 === t.mount(e) || (t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.params.loop && t.loopCreate(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.preloadImages && t.preloadImages(), t.params.loop ? t.slideTo(t.params.initialSlide + t.loopedSlides, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.attachEvents(), t.initialized = !0, t.emit("init"), t.emit("afterInit")), t;
  }
  /** @eyes-analysis
   * 源码方法 destroy；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：$el.removeAttr、$wrapperEl.removeAttr、0,animateCSSModeScroll.deleteProps、Object.keys、Object.keys(n.eventsListeners).forEach等。
   */
  destroy(e = !0, t = !0) {
    const n = this,
      {
        params: params,
        $el: $el,
        $wrapperEl: $wrapperEl,
        slides: slides
      } = n;
    return void 0 === n.params || n.destroyed || (n.emit("beforeDestroy"), n.initialized = !1, n.detachEvents(), params.loop && n.loopDestroy(), t && (n.removeClasses(), $el.removeAttr("style"), $wrapperEl.removeAttr("style"), slides && slides.length && slides.removeClass([params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")), n.emit("destroy"), Object.keys(n.eventsListeners).forEach(e => {
      n.off(e);
    }), !1 !== e && (n.$el[0].swiper = null, (0, animateCSSModeScroll.deleteProps)(n)), n.destroyed = !0), null;
  }
  /** @eyes-analysis
   * 源码方法 extendDefaults；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：0,animateCSSModeScroll.extend。
   */
  static extendDefaults(e) {
    (0, animateCSSModeScroll.extend)(w, e);
  }
  /** @eyes-analysis
   * 只读返回 w；此 getter 不执行对应 setter 的写入或更新通知
   */
  static get extendedDefaults() {
    return w;
  }
  /** @eyes-analysis
   * 只读返回 Unidentified460.default；此 getter 不执行对应 setter 的写入或更新通知
   */
  static get defaults() {
    return Unidentified460.default;
  }
  /** @eyes-analysis
   * 源码方法 installModule；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：t.indexOf、t.push。
   */
  static installModule(e) {
    Swiper.prototype.__modules__ || (Swiper.prototype.__modules__ = []);
    const t = Swiper.prototype.__modules__;
    "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
  }
  /** @eyes-analysis
   * 源码方法 use；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：Array.isArray、Swiper.installModule、e.forEach。
   */
  static use(e) {
    return Array.isArray(e) ? (e.forEach(e => Swiper.installModule(e)), Swiper) : (Swiper.installModule(e), Swiper);
  }
}
Object.keys(S).forEach(e => {
  Object.keys(S[e]).forEach(t => {
    Swiper.prototype[t] = S[e][t];
  });
}), Swiper.use([Unidentified404.default, Unidentified405.default]), defaultExport = Swiper;
export { defaultExport as default };
