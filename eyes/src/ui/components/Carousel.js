// Recovered from app.js:600844-609802.
import * as animateFill from "../../vendor/modules/animateFill-168.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import CarouselTemplate from "../templates/CarouselTemplate-390.html";
import CarouselTemplateDependency from "../templates/CarouselTemplate-391.html";
let defaultExport;
var getCarouselTemplate = () => CarouselTemplate;
var getCarouselTemplateDependency = () => CarouselTemplateDependency;
class Carousel extends EyesPublicApi.BaseComponent {
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
  get currentInfo() {
    return this._currentInfo;
  }
  _onControlsToggle() {
    this._toggleControls();
  }
  setOnControlsToggle(toggleControls) {
    this._toggleControls = toggleControls;
  }
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
  resize() {
    super.resize();
    setTimeout(this._setSlideTrackDimensions, 100);
    this._updateTooltipsProps();
  }
  _updateTooltipsProps() {
    const {
      slideType: slideType
    } = this._state;
    this._progressTooltip.setProps({
      offset: "overlay" === slideType ? [0, -30] : [0, 10]
    });
  }
  _createSlideTrack() {
    this._children.slides.forEach(t => {
      this._children.track.appendChild(t);
    });
    this._setSlideTrackDimensions();
  }
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
  _updateTrackPosition() {
    const {
      currentIndex: currentIndex
    } = this._state;
    let e = 0;
    for (let i = 0; i < currentIndex; i++) e += this._children.slides[i].getBoundingClientRect().height;
    const i = this._config.vertical ? `translateY(-${e}px)` : `translateX(-${e}px)`;
    this._children.track.style.transform = i;
  }
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
  _updateCarousel() {
    this._updateTrackPosition();
    this._updateSlides();
  }
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
  addSlides(t) {
    for (let e = 0; e < t.length; e++) this.addSlide(t[e]);
  }
  async onEnter(t) {
    const e = this._onEnter[t];
    for (let t = 0; t < e?.length; t++) "function" == typeof e[t] && (await e[t]());
  }
  async onLeave(t) {
    "number" != typeof t && (t = this._state.currentIndex);
    const e = this._onLeave[t];
    for (let t = 0; t < e?.length; t++) "function" == typeof e[t] && (await e[t]());
  }
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
  goToPrevSlide() {
    const {
      currentIndex: currentIndex
    } = this._state;
    const e = this._children.slides.length - 1;
    const i = currentIndex - 1;
    i < 0 ? this._config.infinite && this._onSlideChange(e) : this._onSlideChange(i);
  }
  goToNextSlide() {
    const {
      currentIndex: currentIndex
    } = this._state;
    const e = currentIndex + 1;
    e > this._children.slides.length - 1 ? this._config.infinite && this._onSlideChange(0) : this._onSlideChange(e);
  }
  goToFirstSlide() {
    this._onSlideChange(0);
  }
  isVisible() {
    return this._state.isVisible;
  }
  collapse() {
    this.setState({
      isCollapsed: true,
      collapseClass: "collapse",
      collapseButtonClass: "icon-expand"
    });
    this.triggerCallbacks("expandtoggle", [false]);
  }
  expand() {
    this.setState({
      isCollapsed: false,
      collapseClass: "expand",
      collapseButtonClass: "icon-collapse"
    });
    this.triggerCallbacks("expandtoggle", [true]);
  }
  close() {}
  show() {
    super.show();
    this._updateCarousel();
    null !== this._progressTooltip && this._children.slides.length > 1 && this._progressTooltip.show();
  }
  clear() {
    this._children.track.innerHTML = "";
    this._children.slides = [];
    this._onEnter = {};
    this._onLeave = {};
    this._currentInfo = null;
    this._state.previousIndex = 1;
    this._state.currentIndex = this._config.initialSlideIndex || 0;
  }
  _toggleCollapse() {
    this._state.isCollapsed ? this.expand() : this.collapse();
  }
}
Carousel.html = getCarouselTemplate();
defaultExport = Carousel;
export { defaultExport as default };
