// Recovered from app.js:612114-618466.
import * as A11y from "../../vendor/modules/A11y.js";
import "../../styles/extracted/TutorialOverlayStyles-497.js";
import "../../styles/extracted/TutorialOverlayStyles-498.js";
import "../../styles/extracted/TutorialOverlayStyles-499.js";
import "../../styles/extracted/TutorialOverlayStyles-500.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import TutorialOverlayTemplate from "../templates/TutorialOverlayTemplate.html";
let defaultExport;
var getTutorialOverlayTemplate = () => TutorialOverlayTemplate;
A11y.default.use([A11y.Navigation, A11y.Keyboard, A11y.Mousewheel]);
const a = "OK, got it. Thanks!";
const l = "OK, let's go!";
class TutorialOverlay extends EyesPublicApi.BaseComponent {
  constructor(t, e = {}) {
    e.config = {
      direction: "horizontal",
      speed: 600,
      slidesPerView: 1,
      spaceBetween: 100,
      keyboard: {
        enabled: true
      },
      mousewheel: {
        forceToAxis: true,
        thresholdDelta: 100
      },
      navigation: {
        prevEl: ".tutorial-carousel-prev",
        nextEl: ".tutorial-carousel-next"
      },
      ...e.config
    };
    super(t, null, {
      isVisible: false,
      carouselClass: "tutorial-carousel",
      slideClass: "",
      dismissText: a,
      ...e
    });
    this._swiper = null;
    this._allTutorials = null;
    this._elementMeasures = null;
    this._currIndex = null;
    this._slideViewedTimeout = null;
    this._initTimeout = null;
    this._bulletClass = "swiper-pagination-bullet";
    this._activeBulletClass = "swiper-pagination-bullet-active";
    this._swiperSlideClass = "swiper-slide";
    this._storageName = "EoA_Tutorials";
  }
  setTutorials(allTutorials) {
    this._allTutorials = allTutorials;
    this._createSlides();
  }
  hideTutorialSlide(t) {
    const {
      tutorials: tutorials
    } = this.app;
    return tutorials.filter(({
      id: id
    }) => id !== t);
  }
  _addEvents() {
    this._swiper.on("slideChange", ({
      realIndex: realIndex
    }) => {
      this._setHighlightedElement(realIndex);
      this._setActiveBullet(realIndex);
      this._currIndex !== realIndex && this.navigateToTutorial(realIndex);
      const {
        id: id
      } = this._allTutorials[realIndex] || {};
      const i = realIndex === this._allTutorials.length - 1;
      const s = id ? `tutorial-slide-${id}` : "";
      this.setState({
        dismissText: i ? l : a,
        slideClass: s
      });
    });
    this._children.swiperSlides.addEventListener("click", t => {
      const e = t?.target?.dataset?.def;
      e && this._app.getComponent("definitionOverlay").navigateToDefinition(e);
    });
  }
  _createSlides() {
    const {
      isTouch: isTouch
    } = this._app;
    this._allTutorials.forEach(({
      id: id,
      title: title,
      description: description,
      extra: extra
    }) => {
      const o = [];
      if (title) {
        const t = document.createElement("h2");
        t.innerHTML = title;
        o.push(t);
      }
      if (description) {
        const e = "object" == typeof description ? isTouch ? description.touch : description.desktop : description;
        if ("string" == typeof e) {
          const t = document.createElement("p");
          t.innerHTML = e;
          o.push(t);
        }
      }
      if (extra) {
        const e = "object" == typeof extra ? isTouch ? extra.touch : extra.desktop : extra;
        if ("string" == typeof e) {
          const t = document.createElement("div");
          t.className = "tutorial-extra";
          t.innerHTML = e;
          o.push(t);
        }
      }
      const r = `${this._swiperSlideClass} tutorial-slide-${id}`;
      o.length && this._addSlide(o, r);
    });
  }
  _addSlide(t = [], e) {
    const i = document.createElement("div");
    i.className = e;
    i.replaceChildren(...t);
    this._children.swiperSlides.append(i);
  }
  _createBullets() {
    const {
      bullets: bullets
    } = this._children;
    const {
      slides: slides
    } = this._swiper;
    const i = [...slides].map((t, e) => {
      const i = document.createElement("span");
      i.classList.add(this._bulletClass);
      i.addEventListener("click", t => this._swiper.slideTo(e));
      return i;
    });
    bullets.replaceChildren(...i);
  }
  _setActiveBullet(t = this._currIndex) {
    const {
      bullets: bullets
    } = this._children;
    bullets.childNodes.forEach((e, i) => {
      e.classList.remove(this._activeBulletClass);
      i === t && e.classList.add(this._activeBulletClass);
    });
  }
  _setHighlightedElement(t = this._currIndex, e = false) {
    (!this._elementMeasures || e) && (this._elementMeasures = this._calcElementMeasures());
    const i = this._elementMeasures[t];
    const {
      mask: mask
    } = this._allTutorials[t];
    if (i) {
      const {
        xPos: xPos,
        yPos: yPos,
        relWidth: relWidth,
        relHeight: relHeight
      } = i;
      const {
        xSizeMult: r = 1,
        ySizeMult: a = 1
      } = mask || {};
      const l = 15;
      const c = (200 + relWidth * l * 100) * r;
      const h = (200 + relHeight * l * 100) * a;
      const d = Math.max(200, c);
      const u = Math.max(200, h);
      const p = 100 / (d - 100);
      const _ = 100 / (u - 100);
      const m = .5 - .5 * _ + yPos * _;
      const g = (100 * (.5 - .5 * p + xPos * p)).toFixed(2);
      const y = (100 * m).toFixed(2);
      this._element.style.setProperty("--tutorial-mask-grad", "radial-gradient(transparent, black 5%)");
      this._element.style.setProperty("--tutorial-mask-pos", `${g}% ${y}%`);
      this._element.style.setProperty("--tutorial-mask-size", `${d}% ${u}%`);
    } else {
      this._element.style.setProperty("--tutorial-mask-grad", null);
      this._element.style.setProperty("--tutorial-mask-pos", null);
      this._element.style.setProperty("--tutorial-mask-size", null);
    }
  }
  onQueryChange({
    cancelToken: cancelToken,
    tutorial: tutorial
  } = {}) {
    clearTimeout(this._slideViewedTimeout);
    const {
      currentRoute: currentRoute,
      homeRoute: homeRoute
    } = this.app.getManager("router");
    if (currentRoute.url !== homeRoute || cancelToken?.isCanceled) return;
    const currIndex = this._getIndexByTutorialId(tutorial);
    currIndex !== this._currIndex && (this._currIndex = currIndex, this._currIndex > -1 ? (this._state.isVisible ? this._swiper.slideTo(this._currIndex) : this.show(), this._setSlideViewedTimeout(currIndex)) : this.hide());
  }
  _initSwiper() {
    const {
      carouselClass: carouselClass
    } = this._state;
    const e = `.${carouselClass} .swiper-wrapper > div`;
    EyesPublicApi.AppUtils.elementReady(e).then(() => {
      this._initTimeout = setTimeout(() => {
        this._swiper ? (this._swiper.update(), this._swiper.slideTo(this._currIndex)) : (this._swiper = new A11y.default(`.${carouselClass}`, this._config), this._postSwiperInitFunction(this._swiper));
        0 === this._currIndex && (this._setActiveBullet(), this._setHighlightedElement());
        super.show();
      }, 500);
    });
  }
  _postSwiperInitFunction() {
    this._addEvents();
    this._createBullets();
    this._swiper.slideTo(this._currIndex);
  }
  _getIndexByTutorialId(t) {
    return this._allTutorials?.findIndex(({
      id: id
    }) => id === t);
  }
  _setSlideViewedTimeout(t) {
    this._slideViewedTimeout = setTimeout(() => {
      const e = localStorage?.getItem(this._storageName)?.split(",") || [];
      e.includes(t.toString()) || (e.push(t), e.sort(), localStorage?.setItem(this._storageName, e));
    }, 3e3);
  }
  _calcElementMeasures() {
    const {
      clientWidth: clientWidth,
      clientHeight: clientHeight
    } = document.body;
    return this._allTutorials.map(({
      targetSelector: targetSelector
    }) => {
      const s = [...document.body.querySelectorAll(targetSelector)].filter(t => null !== t.offsetParent);
      if (!s.length) return false;
      const {
        left: left,
        width: width,
        top: top,
        height: height
      } = s[0].getBoundingClientRect();
      return {
        xPos: 1 - (left + .5 * width) / clientWidth,
        yPos: 1 - (top + .5 * height) / clientHeight,
        relWidth: width / clientWidth,
        relHeight: height / clientHeight
      };
    });
  }
  show() {
    const layerManager = this._app.getManager("layer");
    layerManager.getLayer("ui").visible || layerManager.toggleLayer("ui");
    const e = this._children.swiperSlides?.childNodes?.length;
    e && this._initSwiper();
    if (true === this._app.getManager("router").configs.hideExternalLinks) {
      const t = document.getElementsByClassName("tutorial-smallprint")[0].innerHTML;
      document.getElementsByClassName("tutorial-smallprint")[0].innerHTML = this._app.getManager("content").hideExternalLinksInText(t);
    }
  }
  hide() {
    clearTimeout(this._initTimeout);
    this._currIndex = null;
    super.hide();
  }
  calcPriorityIndex() {
    const t = localStorage?.getItem(this._storageName)?.split(",") || [];
    const e = this._allTutorials.filter((e, i) => !t.includes(i.toString()));
    return e.length ? this._getIndexByTutorialId(e[0].id) : null;
  }
  navigateToTutorial(t, e = false) {
    const {
      homeRoute: homeRoute,
      currentRoute: currentRoute,
      navigate: navigate
    } = this.app.getManager("router");
    const o = e ? homeRoute : currentRoute.url ?? "";
    if ("number" == typeof t && t > -1 && t < this._allTutorials.length) {
      const {
        id: id
      } = this._allTutorials[t];
      navigate({
        tutorial: id
      }, o);
    }
  }
  close() {
    this.app.getManager("router").navigate({
      __remove: ["tutorial"]
    });
  }
  resize() {
    this._state.isVisible && null !== this._currIndex && this._setHighlightedElement(this._currIndex, true);
  }
}
TutorialOverlay.html = getTutorialOverlayTemplate();
defaultExport = TutorialOverlay;
export { defaultExport as default };
