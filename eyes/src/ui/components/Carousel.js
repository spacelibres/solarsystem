/** @eyes-analysis
 * 文件职责：轮播条目选择、滚动与响应式显示
 * 依据：imports: ../../vendor/modules/animateFill-168.js, ../../framework/eyes/public-api.js, ../templates/CarouselTemplate-390.html, ../templates/CarouselTemplate-391.html；manager dependencies: router, spout
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:600844-609802.
import * as animateFill from "../../vendor/modules/animateFill-168.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import CarouselTemplate from "../templates/CarouselTemplate-390.html";
import CarouselTemplateDependency from "../templates/CarouselTemplate-391.html";
let defaultExport;
var getCarouselTemplate = () => CarouselTemplate;
var getCarouselTemplateDependency = () => CarouselTemplateDependency;
/** @eyes-analysis
 * 类职责：轮播条目选择、滚动与响应式显示；继承 EyesPublicApi.BaseComponent
 * 继承：EyesPublicApi.BaseComponent；导出：default。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Carousel extends EyesPublicApi.BaseComponent {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 EyesPublicApi.AppUtils.isPrimaryTouch, Object.assign, this._eventNames.push, this._initCallbacks, this.bindFunctions；写入 _children, _progressTooltip, _onEnter, _onLeave, _slideTypes, _currentInfo, _onSlideChange, _toggleControls。
   * 状态写入：_children、_currentInfo、_onEnter、_onLeave、_onSlideChange、_progressTooltip、_slideTypes、_toggleControls。
   * 调用线索：EyesPublicApi.AppUtils.isPrimaryTouch、Object.assign、super、this._eventNames.push、this._initCallbacks等。
   */
  constructor(t, e, i = {}) {
    const s = EyesPublicApi.AppUtils.isPrimaryTouch() ? "Swipe/Tap" : "Scroll/Click";
    i.config = {
      infinite: false,
      initialSlideIndex: 0,
      vertical: true,
      timeout: 1e3,
      navigationButtons: {
        prev: {
          text: "Prev",
          icon: "icon-greater up"
        },
        next: {
          text: "Next",
          icon: "icon-greater down"
        },
        replay: {
          text: "Back To Start",
          icon: "icon-replay"
        }
      },
      hintText: {
        default: `${s} arrows to continue`,
        first: `${s} arrow to continue`,
        last: `${s} arrow for previous`
      },
      ...i.config
    };
    super(t, e, {
      slideType: "",
      previousIndex: -1,
      currentIndex: i.config.initialSlideIndex || 0,
      isScrolling: false,
      isScrollingClass: "",
      isTimeout: false,
      collapseClass: "expand",
      isCollapsed: false,
      collapseButtonClass: "icon-collapse",
      isCloseButtonVisible: false,
      closeButtonText: "Exit",
      isControlsVisible: false,
      ...i
    });
    Object.assign(this._state, {
      isCloseButtonVisibleClass: this._class.isVisible[this._state.isCloseButtonVisible],
      isControlsVisibleClass: this._class.isVisible[this._state.isControlsVisible]
    });
    this._children = {
      track: null,
      slides: []
    };
    this._progressTooltip = null;
    this._onEnter = {};
    this._onLeave = {};
    this._slideTypes = ["panel", "overlay"];
    this._currentInfo = null;
    this._onSlideChange = this.goToSlide;
    this._toggleControls = null;
    this._eventNames.push("slidechange", "expandtoggle");
    this._initCallbacks();
    this.bindFunctions(["_setSlideTrackDimensions", "_updateCarousel", "_onScroll", "_toggleCollapse", "_onControlsToggle", "goToPrevSlide", "goToNextSlide", "close"]);
  }
  /** @eyes-analysis
   * 执行 currentInfo 对应的组件业务步骤。
   */
  get currentInfo() {
    return this._currentInfo;
  }
  /** @eyes-analysis
   * 执行 _onControlsToggle 对应的组件业务步骤；调用 this._toggleControls。
   * 调用线索：this._toggleControls。
   */
  _onControlsToggle() {
    this._toggleControls();
  }
  /** @eyes-analysis
   * 执行 setOnControlsToggle 对应的组件业务步骤；写入 _toggleControls。
   * 状态写入：_toggleControls。
   */
  setOnControlsToggle(toggleControls) {
    this._toggleControls = toggleControls;
  }
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 super.init, this._children.carousel.classList.add, this._createSlideTrack, this._updateCarousel, this._children.carousel.addEventListener, this.setState, this._children.progress.addEventListener, this._onScroll；写入 _touchStartY。
   * 状态写入：_children.carousel.style.pointerEvents、_touchStartY。
   * 调用线索：super.init、t.preventDefault、this._children.carousel.addEventListener、this._children.carousel.classList.add、this._children.progress.addEventListener等。
   */
  init() {
    super.init();
    this._children.carousel.classList.add(this._config.vertical ? "vertical" : "horizontal");
    this._createSlideTrack();
    this._updateCarousel();
    this._children.carousel.classList.add("initialized");
    window.addEventListener("keydown", t => {
      "Tab" === t.key && this._state.isScrolling && t.preventDefault();
    });
    this._children.carousel.addEventListener("transitionstart", t => {
      t.target === this._children.track && "transform" === t.propertyName && (this.setState({
        isScrolling: true,
        isScrollingClass: "scrolling"
      }), this._children.carousel.style.pointerEvents = "all");
    }, true);
    this._children.carousel.addEventListener("transitionend", t => {
      t.target === this._children.track && "transform" === t.propertyName && (this.setState({
        isScrolling: false,
        isScrollingClass: "scrolling-done"
      }), this._children.carousel.style.pointerEvents = "none");
    }, true);
    this._children.progress.addEventListener("wheel", this._onScroll, {
      passive: false
    });
    this._children.progress.addEventListener("touchstart", t => {
      const e = t.changedTouches[0];
      this._touchStartY = e.pageY;
    });
    this._children.progress.addEventListener("touchmove", t => {
      const e = t.changedTouches[0];
      t.deltaY = e.pageY - this._touchStartY;
      this._onScroll(t, "touch");
    }, {
      passive: false
    });
    this._children.progress.addEventListener("touchend", t => {
      const e = t.changedTouches[0];
      t.deltaY = e.pageY - this._touchStartY;
      this._onScroll(t, "touch");
    }, {
      passive: false
    });
  }
  /** @eyes-analysis
   * 重排响应式界面；调用 super.resize, this._updateTooltipsProps。
   * 调用线索：setTimeout、super.resize、this._updateTooltipsProps。
   */
  resize() {
    super.resize();
    setTimeout(this._setSlideTrackDimensions, 100);
    this._updateTooltipsProps();
  }
  /** @eyes-analysis
   * 执行 _updateTooltipsProps 对应的组件业务步骤；调用 this._progressTooltip.setProps。
   * 调用线索：this._progressTooltip.setProps。
   */
  _updateTooltipsProps() {
    const {
      slideType: slideType
    } = this._state;
    this._progressTooltip.setProps({
      offset: "overlay" === slideType ? [0, -30] : [0, 10]
    });
  }
  /** @eyes-analysis
   * 执行 _createSlideTrack 对应的组件业务步骤；调用 this._children.slides.forEach, this._children.track.appendChild, this._setSlideTrackDimensions。
   * 调用线索：this._children.slides.forEach、this._children.track.appendChild、this._setSlideTrackDimensions。
   */
  _createSlideTrack() {
    this._children.slides.forEach(t => {
      this._children.track.appendChild(t);
    });
    this._setSlideTrackDimensions();
  }
  /** @eyes-analysis
   * 执行 _setSlideTrackDimensions 对应的组件业务步骤；调用 this._updateTrackPosition。
   * 调用线索：[...slides].reduce、e.getBoundingClientRect、slides.forEach、this._updateTrackPosition。
   */
  _setSlideTrackDimensions() {
    const {
      track: track,
      slides: slides
    } = this._children;
    const {
      vertical: vertical
    } = this._config;
    if (slides.forEach(t => {
      t.style.transition = "none";
    }), track.style.transition = "none", vertical) {
      const i = [...slides].reduce((t, e) => t + e.getBoundingClientRect().height, 0);
      track.style.height = i + "px";
    } else {
      const i = [...slides].reduce((t, e) => t + e.getBoundingClientRect().width, 0);
      track.style.width = i + "px";
    }
    track.style.transition = "";
    slides.forEach(t => {
      t.style.transition = "";
    });
    this._updateTrackPosition();
  }
  /** @eyes-analysis
   * 执行 _updateTrackPosition 对应的组件业务步骤。
   * 状态写入：_children.track.style.transform。
   * 调用线索：this._children.slides[i].getBoundingClientRect。
   */
  _updateTrackPosition() {
    const {
      currentIndex: currentIndex
    } = this._state;
    let e = 0;
    for (let i = 0; i < currentIndex; i++) e += this._children.slides[i].getBoundingClientRect().height;
    const i = this._config.vertical ? `translateY(-${e}px)` : `translateX(-${e}px)`;
    this._children.track.style.transform = i;
  }
  /** @eyes-analysis
   * 执行 _updateSlides 对应的组件业务步骤；调用 List.remove, List.add。
   * 调用线索：i.classList.add、i.classList.remove、s.classList.add、s.classList.remove。
   */
  _updateSlides() {
    const {
      previousIndex: previousIndex,
      currentIndex: currentIndex
    } = this._state;
    const i = this._children.slides[previousIndex];
    i && (i.classList.remove("active"), i.classList.add("hidden"));
    const s = this._children.slides[currentIndex];
    s && (s.classList.remove("hidden"), s.classList.add("active"));
  }
  /** @eyes-analysis
   * 执行 _updateCarousel 对应的组件业务步骤；调用 this._updateTrackPosition, this._updateSlides。
   * 调用线索：this._updateSlides、this._updateTrackPosition。
   */
  _updateCarousel() {
    this._updateTrackPosition();
    this._updateSlides();
  }
  /** @eyes-analysis
   * 执行 _onScroll 对应的组件业务步骤；调用 this.expand, Target.querySelector, Math.ceil, this.goToPrevSlide, this.goToNextSlide, this.setState。
   * 调用线索：Math.ceil、["wheel","touchmove"].includes、i.getBoundingClientRect、setTimeout、t.currentTarget.querySelector等。
   */
  _onScroll(t, e = "mouse") {
    if (this._state.isCollapsed && !this._state.isTimeout) this.expand();else if (!this._state.isScrolling && !this._state.isTimeout) {
      const i = t.currentTarget.querySelector(".os-viewport") || t.currentTarget;
      const s = i.scrollTop;
      const n = 0 === s;
      const o = Math.ceil(i.getBoundingClientRect().height + s) >= i.scrollHeight;
      t.deltaY < 0 ? "mouse" === e ? t.deltaY < -4 && n && this.goToPrevSlide() : t.deltaY < -5 && o && this.goToNextSlide() : t.deltaY > 0 && ("mouse" === e ? t.deltaY > 4 && o && this.goToNextSlide() : t.deltaY > 5 && n && this.goToPrevSlide());
    }
    this.setState({
      isTimeout: true
    }, () => setTimeout(() => this.setState({
      isTimeout: false
    }), this._config.timeout));
    ["wheel", "touchmove"].includes(t.type) && t.stopPropagation();
  }
  /** @eyes-analysis
   * 源码扩展或访问入口；调用 0,animateFill.default, EyesPublicApi.AppUtils.addScrollbar, EyesPublicApi.AppUtils.htmlWithParamsToElement, c.classList.add, c.querySelector, c.querySelector(".content").appendChild, clearTimeout, console.warn, getCarouselTemplateDependency, h.addEventListener, setTimeout, t.hide, this._children.slides.push, this._children.track.appendChild, this._onScroll, this._setEventHandlersFromAttributes, this._setSlideTrackDimensions, this._setVariables, this._slideTypes.includes, this._updateCarousel；写入 _progressTooltip, _touchStartY。
   * 状态写入：_progressTooltip、_touchStartY。
   * 调用线索：0,animateFill.default、EyesPublicApi.AppUtils.addScrollbar、EyesPublicApi.AppUtils.htmlWithParamsToElement、c.classList.add、c.querySelector等。
   */
  addSlide(t, {
    isLast: e = false,
    isFirst: i = false
  } = {}) {
    const o = t.html || getCarouselTemplateDependency();
    const {
      type: type,
      content: content
    } = t;
    this._slideTypes.includes(type) || console.warn(`addSlide: Unknown slide type "${type}". Supported types: ${this._slideTypes}`);
    const c = EyesPublicApi.AppUtils.htmlWithParamsToElement(o, {
      prevButtonText: this._config.navigationButtons.prev.text,
      prevButtonIcon: this._config.navigationButtons.prev.icon,
      nextButtonText: this._config.navigationButtons.next.text,
      nextButtonIcon: this._config.navigationButtons.next.icon,
      replayButtonText: this._config.navigationButtons.replay.text,
      replayButtonIcon: this._config.navigationButtons.replay.icon,
      hintText: () => e ? this._config.hintText.last : i ? this._config.hintText.first : this._config.hintText.default,
      type: type
    });
    c.querySelector(".content").appendChild(content);
    e && c.classList.add("last");
    i && c.classList.add("first");
    t.classList && c.classList.add(...t.classList);
    t.id && (c.dataset.id = t.id);
    c.dataset.type = t.type || "";
    this._children.track.appendChild(c);
    this._children.slides.push(c);
    const h = c.firstChild;
    h.addEventListener("wheel", this._onScroll, {
      passive: false
    });
    h.addEventListener("touchstart", t => {
      const e = t.changedTouches[0];
      this._touchStartY = e.pageY;
    });
    h.addEventListener("touchmove", t => {
      const e = t.changedTouches[0];
      t.deltaY = e.pageY - this._touchStartY;
      this._onScroll(t, "touch");
    }, {
      passive: false
    });
    h.addEventListener("touchend", t => {
      const e = t.changedTouches[0];
      t.deltaY = e.pageY - this._touchStartY;
      this._onScroll(t, "touch");
    }, {
      passive: false
    });
    this._setVariables(c);
    this._setEventHandlersFromAttributes(c);
    this._setSlideTrackDimensions();
    this._updateCarousel();
    EyesPublicApi.AppUtils.addScrollbar(h);
    null === this._progressTooltip && (this._progressTooltip = (0, animateFill.default)(this._children.progress.parentElement, {
      theme: "default",
      onShow(t) {
        clearTimeout(t.timeout);
        t.timeout = setTimeout(() => {
          t.hide();
        }, 2e3);
      }
    }));
  }
  /** @eyes-analysis
   * 执行 addSlides 对应的组件业务步骤；调用 this.addSlide。
   * 调用线索：this.addSlide。
   */
  addSlides(t) {
    for (let e = 0; e < t.length; e++) this.addSlide(t[e]);
  }
  /** @eyes-analysis
   * 进入视图时准备界面和订阅。
   * 调用线索：e[t]。
   */
  async onEnter(t) {
    const e = this._onEnter[t];
    for (let t = 0; t < e?.length; t++) "function" == typeof e[t] && (await e[t]());
  }
  /** @eyes-analysis
   * 离开视图时恢复状态并解除订阅。
   * 调用线索：e[t]。
   */
  async onLeave(t) {
    "number" != typeof t && (t = this._state.currentIndex);
    const e = this._onLeave[t];
    for (let t = 0; t < e?.length; t++) "function" == typeof e[t] && (await e[t]());
  }
  /** @eyes-analysis
   * 执行 goToSlide 对应的组件业务步骤；调用 this.app.getManager, this.onLeave, this.setState, this._updateCarousel, this.triggerCallbacks, this._progressTooltip.setContent, this._updateTooltipsProps, this._progressTooltip.show, this.onEnter。
   * 状态写入：_children.progress.style.top。
   * 调用线索：this._children.slides[t].querySelector、this._progressTooltip.setContent、this._progressTooltip.show、this._updateCarousel、this._updateTooltipsProps等。
   */
  async goToSlide(t) {
    const {
      spout: spout,
      spoutFontSize: spoutFontSize
    } = this.app.getManager("router").configs;
    const s = this._state.currentIndex;
    t !== s && (await this.onLeave(s));
    const n = this._children.slides[t]?.dataset.type;
    n && this.setState({
      currentIndex: t,
      previousIndex: s,
      slideType: n
    }, () => {
      this._updateCarousel();
      this._children.progress.style.top = `calc(${100 * t / (this._children.slides.length - 1)}% - ${this._children.progress.offsetHeight / 2}px)`;
      const e = this._children.slides[t].querySelector(".os-viewport");
      e && (e.scrollTop = 0);
      this.triggerCallbacks("slidechange", [this._currentInfo]);
      this._progressTooltip.setContent(`${t + 1} of ${this._children.slides.length}`);
      this._updateTooltipsProps();
      this._state.isVisible && this._progressTooltip.show();
    });
    await this.onEnter(t);
    true === spout && (await this.app.getManager("spout").setUpSpoutLabels(spoutFontSize));
  }
  /** @eyes-analysis
   * 执行 goToPrevSlide 对应的组件业务步骤；调用 this._onSlideChange。
   * 调用线索：this._onSlideChange。
   */
  goToPrevSlide() {
    const {
      currentIndex: currentIndex
    } = this._state;
    const e = this._children.slides.length - 1;
    const i = currentIndex - 1;
    i < 0 ? this._config.infinite && this._onSlideChange(e) : this._onSlideChange(i);
  }
  /** @eyes-analysis
   * 执行 goToNextSlide 对应的组件业务步骤；调用 this._onSlideChange。
   * 调用线索：this._onSlideChange。
   */
  goToNextSlide() {
    const {
      currentIndex: currentIndex
    } = this._state;
    const e = currentIndex + 1;
    e > this._children.slides.length - 1 ? this._config.infinite && this._onSlideChange(0) : this._onSlideChange(e);
  }
  /** @eyes-analysis
   * 执行 goToFirstSlide 对应的组件业务步骤；调用 this._onSlideChange。
   * 调用线索：this._onSlideChange。
   */
  goToFirstSlide() {
    this._onSlideChange(0);
  }
  /** @eyes-analysis
   * 执行 isVisible 对应的组件业务步骤。
   */
  isVisible() {
    return this._state.isVisible;
  }
  /** @eyes-analysis
   * 执行 collapse 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
   * 调用线索：this.setState、this.triggerCallbacks。
   */
  collapse() {
    this.setState({
      isCollapsed: true,
      collapseClass: "collapse",
      collapseButtonClass: "icon-expand"
    });
    this.triggerCallbacks("expandtoggle", [false]);
  }
  /** @eyes-analysis
   * 执行 expand 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
   * 调用线索：this.setState、this.triggerCallbacks。
   */
  expand() {
    this.setState({
      isCollapsed: false,
      collapseClass: "expand",
      collapseButtonClass: "icon-collapse"
    });
    this.triggerCallbacks("expandtoggle", [true]);
  }
  /** @eyes-analysis
   * 执行 close 对应的组件业务步骤。
   */
  close() {}
  /** @eyes-analysis
   * 执行 show 对应的组件业务步骤；调用 super.show, this._updateCarousel, this._progressTooltip.show。
   * 调用线索：super.show、this._progressTooltip.show、this._updateCarousel。
   */
  show() {
    super.show();
    this._updateCarousel();
    null !== this._progressTooltip && this._children.slides.length > 1 && this._progressTooltip.show();
  }
  /** @eyes-analysis
   * 执行 clear 对应的组件业务步骤；写入 _onEnter, _onLeave, _currentInfo。
   * 状态写入：_children.slides、_children.track.innerHTML、_currentInfo、_onEnter、_onLeave、_state.currentIndex、_state.previousIndex。
   */
  clear() {
    this._children.track.innerHTML = "";
    this._children.slides = [];
    this._onEnter = {};
    this._onLeave = {};
    this._currentInfo = null;
    this._state.previousIndex = 1;
    this._state.currentIndex = this._config.initialSlideIndex || 0;
  }
  /** @eyes-analysis
   * 执行 _toggleCollapse 对应的组件业务步骤；调用 this.expand, this.collapse。
   * 调用线索：this.collapse、this.expand。
   */
  _toggleCollapse() {
    this._state.isCollapsed ? this.expand() : this.collapse();
  }
}
Carousel.html = getCarouselTemplate();
defaultExport = Carousel;
export { defaultExport as default };
