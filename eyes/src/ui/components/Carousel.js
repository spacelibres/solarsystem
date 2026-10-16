// Recovered from app.js:600844-609802.
import * as animateFill from "../../vendor/modules/animateFill-168.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import CarouselTemplate from "../templates/CarouselTemplate-390.html";
import CarouselTemplateDependency from "../templates/CarouselTemplate-391.html";
let defaultExport;
var getCarouselTemplate = () => CarouselTemplate;
var getCarouselTemplateDependency = () => CarouselTemplateDependency;
/* 幻灯片节点与进入/离开回调按索引归轮播持有；切换先 await 旧页退出，再更新轨道和新页显示，最后 await 新页进入。滚动边界与触摸方向共同决定翻页，timeout 防止连续手势重复切换。 */
class Carousel extends EyesPublicApi.BaseComponent {
  constructor(app, element, options = {}) {
    const gestureLabel = EyesPublicApi.AppUtils.isPrimaryTouch() ? "Swipe/Tap" : "Scroll/Click";
    options.config = {
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
        default: `${gestureLabel} arrows to continue`,
        first: `${gestureLabel} arrow to continue`,
        last: `${gestureLabel} arrow for previous`
      },
      ...options.config
    };
    super(app, element, {
      slideType: "",
      previousIndex: -1,
      currentIndex: options.config.initialSlideIndex || 0,
      isScrolling: false,
      isScrollingClass: "",
      isTimeout: false,
      collapseClass: "expand",
      isCollapsed: false,
      collapseButtonClass: "icon-collapse",
      isCloseButtonVisible: false,
      closeButtonText: "Exit",
      isControlsVisible: false,
      ...options
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
    window.addEventListener("keydown", keyEvent => {
      "Tab" === keyEvent.key && this._state.isScrolling && keyEvent.preventDefault();
    });
    this._children.carousel.addEventListener("transitionstart", transitionEvent => {
      transitionEvent.target === this._children.track && "transform" === transitionEvent.propertyName && (this.setState({
        isScrolling: true,
        isScrollingClass: "scrolling"
      }), this._children.carousel.style.pointerEvents = "all");
    }, true);
    this._children.carousel.addEventListener("transitionend", transitionEvent => {
      transitionEvent.target === this._children.track && "transform" === transitionEvent.propertyName && (this.setState({
        isScrolling: false,
        isScrollingClass: "scrolling-done"
      }), this._children.carousel.style.pointerEvents = "none");
    }, true);
    this._children.progress.addEventListener("wheel", this._onScroll, {
      passive: false
    });
    this._children.progress.addEventListener("touchstart", touchEvent => {
      const touchPoint = touchEvent.changedTouches[0];
      this._touchStartY = touchPoint.pageY;
    });
    this._children.progress.addEventListener("touchmove", touchEvent => {
      const touchPoint = touchEvent.changedTouches[0];
      touchEvent.deltaY = touchPoint.pageY - this._touchStartY;
      this._onScroll(touchEvent, "touch");
    }, {
      passive: false
    });
    this._children.progress.addEventListener("touchend", touchEvent => {
      const touchPoint = touchEvent.changedTouches[0];
      touchEvent.deltaY = touchPoint.pageY - this._touchStartY;
      this._onScroll(touchEvent, "touch");
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
    this._children.slides.forEach(slideElement => {
      this._children.track.appendChild(slideElement);
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
    if (slides.forEach(slideElement => {
      slideElement.style.transition = "none";
    }), track.style.transition = "none", vertical) {
      const trackHeight = [...slides].reduce((totalHeight, slideElement) => totalHeight + slideElement.getBoundingClientRect().height, 0);
      track.style.height = trackHeight + "px";
    } else {
      const trackWidth = [...slides].reduce((totalWidth, slideElement) => totalWidth + slideElement.getBoundingClientRect().width, 0);
      track.style.width = trackWidth + "px";
    }
    track.style.transition = "";
    slides.forEach(slideElement => {
      slideElement.style.transition = "";
    });
    this._updateTrackPosition();
  }
  _updateTrackPosition() {
    const {
      currentIndex: currentIndex
    } = this._state;
    let trackOffset = 0;
    for (let slideIndex = 0; slideIndex < currentIndex; slideIndex++) trackOffset += this._children.slides[slideIndex].getBoundingClientRect().height;
    const trackTransform = this._config.vertical ? `translateY(-${trackOffset}px)` : `translateX(-${trackOffset}px)`;
    this._children.track.style.transform = trackTransform;
  }
  _updateSlides() {
    const {
      previousIndex: previousIndex,
      currentIndex: currentIndex
    } = this._state;
    const previousSlide = this._children.slides[previousIndex];
    previousSlide && (previousSlide.classList.remove("active"), previousSlide.classList.add("hidden"));
    const currentSlide = this._children.slides[currentIndex];
    currentSlide && (currentSlide.classList.remove("hidden"), currentSlide.classList.add("active"));
  }
  _updateCarousel() {
    this._updateTrackPosition();
    this._updateSlides();
  }
  _onScroll(scrollEvent, inputMode = "mouse") {
    if (this._state.isCollapsed && !this._state.isTimeout) this.expand();else if (!this._state.isScrolling && !this._state.isTimeout) {
      const scrollViewport = scrollEvent.currentTarget.querySelector(".os-viewport") || scrollEvent.currentTarget;
      const scrollTop = scrollViewport.scrollTop;
      const isAtTop = 0 === scrollTop;
      const isAtBottom = Math.ceil(scrollViewport.getBoundingClientRect().height + scrollTop) >= scrollViewport.scrollHeight;
      scrollEvent.deltaY < 0 ? "mouse" === inputMode ? scrollEvent.deltaY < -4 && isAtTop && this.goToPrevSlide() : scrollEvent.deltaY < -5 && isAtBottom && this.goToNextSlide() : scrollEvent.deltaY > 0 && ("mouse" === inputMode ? scrollEvent.deltaY > 4 && isAtBottom && this.goToNextSlide() : scrollEvent.deltaY > 5 && isAtTop && this.goToPrevSlide());
    }
    this.setState({
      isTimeout: true
    }, () => setTimeout(() => this.setState({
      isTimeout: false
    }), this._config.timeout));
    ["wheel", "touchmove"].includes(scrollEvent.type) && scrollEvent.stopPropagation();
  }
  addSlide(slideInfo, {
    isLast = false,
    isFirst = false
  } = {}) {
    const slideTemplate = slideInfo.html || getCarouselTemplateDependency();
    const {
      type: type,
      content: content
    } = slideInfo;
    this._slideTypes.includes(type) || console.warn(`addSlide: Unknown slide type "${type}". Supported types: ${this._slideTypes}`);
    const slideElement = EyesPublicApi.AppUtils.htmlWithParamsToElement(slideTemplate, {
      prevButtonText: this._config.navigationButtons.prev.text,
      prevButtonIcon: this._config.navigationButtons.prev.icon,
      nextButtonText: this._config.navigationButtons.next.text,
      nextButtonIcon: this._config.navigationButtons.next.icon,
      replayButtonText: this._config.navigationButtons.replay.text,
      replayButtonIcon: this._config.navigationButtons.replay.icon,
      hintText: () => isLast ? this._config.hintText.last : isFirst ? this._config.hintText.first : this._config.hintText.default,
      type: type
    });
    slideElement.querySelector(".content").appendChild(content);
    isLast && slideElement.classList.add("last");
    isFirst && slideElement.classList.add("first");
    slideInfo.classList && slideElement.classList.add(...slideInfo.classList);
    slideInfo.id && (slideElement.dataset.id = slideInfo.id);
    slideElement.dataset.type = slideInfo.type || "";
    this._children.track.appendChild(slideElement);
    this._children.slides.push(slideElement);
    const contentElement = slideElement.firstChild;
    contentElement.addEventListener("wheel", this._onScroll, {
      passive: false
    });
    contentElement.addEventListener("touchstart", touchEvent => {
      const touchPoint = touchEvent.changedTouches[0];
      this._touchStartY = touchPoint.pageY;
    });
    contentElement.addEventListener("touchmove", touchEvent => {
      const touchPoint = touchEvent.changedTouches[0];
      touchEvent.deltaY = touchPoint.pageY - this._touchStartY;
      this._onScroll(touchEvent, "touch");
    }, {
      passive: false
    });
    contentElement.addEventListener("touchend", touchEvent => {
      const touchPoint = touchEvent.changedTouches[0];
      touchEvent.deltaY = touchPoint.pageY - this._touchStartY;
      this._onScroll(touchEvent, "touch");
    }, {
      passive: false
    });
    this._setVariables(slideElement);
    this._setEventHandlersFromAttributes(slideElement);
    this._setSlideTrackDimensions();
    this._updateCarousel();
    EyesPublicApi.AppUtils.addScrollbar(contentElement);
    null === this._progressTooltip && (this._progressTooltip = (0, animateFill.default)(this._children.progress.parentElement, {
      theme: "default",
      onShow(tooltip) {
        clearTimeout(tooltip.timeout);
        tooltip.timeout = setTimeout(() => {
          tooltip.hide();
        }, 2e3);
      }
    }));
  }
  addSlides(slideInfos) {
    for (let slideIndex = 0; slideIndex < slideInfos.length; slideIndex++) this.addSlide(slideInfos[slideIndex]);
  }
  async onEnter(slideIndex) {
    const enterCallbacks = this._onEnter[slideIndex];
    for (let callbackIndex = 0; callbackIndex < enterCallbacks?.length; callbackIndex++) "function" == typeof enterCallbacks[callbackIndex] && (await enterCallbacks[callbackIndex]());
  }
  async onLeave(slideIndex) {
    "number" != typeof slideIndex && (slideIndex = this._state.currentIndex);
    const leaveCallbacks = this._onLeave[slideIndex];
    for (let callbackIndex = 0; callbackIndex < leaveCallbacks?.length; callbackIndex++) "function" == typeof leaveCallbacks[callbackIndex] && (await leaveCallbacks[callbackIndex]());
  }
  async goToSlide(slideIndex) {
    const {
      spout: spout,
      spoutFontSize: spoutFontSize
    } = this.app.getManager("router").configs;
    const previousIndex = this._state.currentIndex;
    slideIndex !== previousIndex && (await this.onLeave(previousIndex));
    const slideType = this._children.slides[slideIndex]?.dataset.type;
    slideType && this.setState({
      currentIndex: slideIndex,
      previousIndex: previousIndex,
      slideType: slideType
    }, () => {
      this._updateCarousel();
      this._children.progress.style.top = `calc(${100 * slideIndex / (this._children.slides.length - 1)}% - ${this._children.progress.offsetHeight / 2}px)`;
      const scrollViewport = this._children.slides[slideIndex].querySelector(".os-viewport");
      scrollViewport && (scrollViewport.scrollTop = 0);
      this.triggerCallbacks("slidechange", [this._currentInfo]);
      this._progressTooltip.setContent(`${slideIndex + 1} of ${this._children.slides.length}`);
      this._updateTooltipsProps();
      this._state.isVisible && this._progressTooltip.show();
    });
    await this.onEnter(slideIndex);
    true === spout && (await this.app.getManager("spout").setUpSpoutLabels(spoutFontSize));
  }
  goToPrevSlide() {
    const {
      currentIndex: currentIndex
    } = this._state;
    const lastIndex = this._children.slides.length - 1;
    const previousIndex = currentIndex - 1;
    previousIndex < 0 ? this._config.infinite && this._onSlideChange(lastIndex) : this._onSlideChange(previousIndex);
  }
  goToNextSlide() {
    const {
      currentIndex: currentIndex
    } = this._state;
    const nextIndex = currentIndex + 1;
    nextIndex > this._children.slides.length - 1 ? this._config.infinite && this._onSlideChange(0) : this._onSlideChange(nextIndex);
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
