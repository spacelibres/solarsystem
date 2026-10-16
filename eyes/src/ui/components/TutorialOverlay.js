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
const dismissLabel = "OK, got it. Thanks!";
const finalDismissLabel = "OK, let's go!";
/* 教程实例持有 Swiper、目标测量缓存及延迟初始化/已读计时器。路由只在主页且未取消时驱动教程，mask 百分比由目标视口比例换算，已读索引写入 localStorage。 */
class TutorialOverlay extends EyesPublicApi.BaseComponent {
  constructor(app, options = {}) {
    options.config = {
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
      ...options.config
    };
    super(app, null, {
      isVisible: false,
      carouselClass: "tutorial-carousel",
      slideClass: "",
      dismissText: dismissLabel,
      ...options
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
  hideTutorialSlide(tutorialId) {
    const {
      tutorials: tutorials
    } = this.app;
    return tutorials.filter(({
      id: id
    }) => id !== tutorialId);
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
      const isLastSlide = realIndex === this._allTutorials.length - 1;
      const slideClass = id ? `tutorial-slide-${id}` : "";
      this.setState({
        dismissText: isLastSlide ? finalDismissLabel : dismissLabel,
        slideClass: slideClass
      });
    });
    this._children.swiperSlides.addEventListener("click", clickEvent => {
      const definitionId = clickEvent?.target?.dataset?.def;
      definitionId && this._app.getComponent("definitionOverlay").navigateToDefinition(definitionId);
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
      const slideElements = [];
      if (title) {
        const titleElement = document.createElement("h2");
        titleElement.innerHTML = title;
        slideElements.push(titleElement);
      }
      if (description) {
        const descriptionText = "object" == typeof description ? isTouch ? description.touch : description.desktop : description;
        if ("string" == typeof descriptionText) {
          const descriptionElement = document.createElement("p");
          descriptionElement.innerHTML = descriptionText;
          slideElements.push(descriptionElement);
        }
      }
      if (extra) {
        const extraHtml = "object" == typeof extra ? isTouch ? extra.touch : extra.desktop : extra;
        if ("string" == typeof extraHtml) {
          const extraElement = document.createElement("div");
          extraElement.className = "tutorial-extra";
          extraElement.innerHTML = extraHtml;
          slideElements.push(extraElement);
        }
      }
      const slideClass = `${this._swiperSlideClass} tutorial-slide-${id}`;
      slideElements.length && this._addSlide(slideElements, slideClass);
    });
  }
  _addSlide(slideElements = [], slideClass) {
    const slideElement = document.createElement("div");
    slideElement.className = slideClass;
    slideElement.replaceChildren(...slideElements);
    this._children.swiperSlides.append(slideElement);
  }
  _createBullets() {
    const {
      bullets: bullets
    } = this._children;
    const {
      slides: slides
    } = this._swiper;
    const bulletElements = [...slides].map((slideElement, slideIndex) => {
      const bulletElement = document.createElement("span");
      bulletElement.classList.add(this._bulletClass);
      bulletElement.addEventListener("click", clickEvent => this._swiper.slideTo(slideIndex));
      return bulletElement;
    });
    bullets.replaceChildren(...bulletElements);
  }
  _setActiveBullet(slideIndex = this._currIndex) {
    const {
      bullets: bullets
    } = this._children;
    bullets.childNodes.forEach((bulletElement, bulletIndex) => {
      bulletElement.classList.remove(this._activeBulletClass);
      bulletIndex === slideIndex && bulletElement.classList.add(this._activeBulletClass);
    });
  }
  _setHighlightedElement(slideIndex = this._currIndex, recalculateMeasures = false) {
    (!this._elementMeasures || recalculateMeasures) && (this._elementMeasures = this._calcElementMeasures());
    const targetMeasures = this._elementMeasures[slideIndex];
    const {
      mask: mask
    } = this._allTutorials[slideIndex];
    if (targetMeasures) {
      const {
        xPos: xPos,
        yPos: yPos,
        relWidth: relWidth,
        relHeight: relHeight
      } = targetMeasures;
      const {
        xSizeMult: widthMultiplier = 1,
        ySizeMult: heightMultiplier = 1
      } = mask || {};
      const maskScale = 15;
      const requestedWidthPercent = (200 + relWidth * maskScale * 100) * widthMultiplier;
      const requestedHeightPercent = (200 + relHeight * maskScale * 100) * heightMultiplier;
      const maskWidthPercent = Math.max(200, requestedWidthPercent);
      const maskHeightPercent = Math.max(200, requestedHeightPercent);
      const horizontalPositionScale = 100 / (maskWidthPercent - 100);
      const verticalPositionScale = 100 / (maskHeightPercent - 100);
      const normalizedMaskY = .5 - .5 * verticalPositionScale + yPos * verticalPositionScale;
      const maskXPercent = (100 * (.5 - .5 * horizontalPositionScale + xPos * horizontalPositionScale)).toFixed(2);
      const maskYPercent = (100 * normalizedMaskY).toFixed(2);
      this._element.style.setProperty("--tutorial-mask-grad", "radial-gradient(transparent, black 5%)");
      this._element.style.setProperty("--tutorial-mask-pos", `${maskXPercent}% ${maskYPercent}%`);
      this._element.style.setProperty("--tutorial-mask-size", `${maskWidthPercent}% ${maskHeightPercent}%`);
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
    const slideSelector = `.${carouselClass} .swiper-wrapper > div`;
    EyesPublicApi.AppUtils.elementReady(slideSelector).then(() => {
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
  _getIndexByTutorialId(tutorialId) {
    return this._allTutorials?.findIndex(({
      id: id
    }) => id === tutorialId);
  }
  _setSlideViewedTimeout(slideIndex) {
    this._slideViewedTimeout = setTimeout(() => {
      const viewedIndices = localStorage?.getItem(this._storageName)?.split(",") || [];
      viewedIndices.includes(slideIndex.toString()) || (viewedIndices.push(slideIndex), viewedIndices.sort(), localStorage?.setItem(this._storageName, viewedIndices));
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
      const visibleTargets = [...document.body.querySelectorAll(targetSelector)].filter(targetElement => null !== targetElement.offsetParent);
      if (!visibleTargets.length) return false;
      const {
        left: left,
        width: width,
        top: top,
        height: height
      } = visibleTargets[0].getBoundingClientRect();
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
    const slideCount = this._children.swiperSlides?.childNodes?.length;
    slideCount && this._initSwiper();
    if (true === this._app.getManager("router").configs.hideExternalLinks) {
      const smallprintHtml = document.getElementsByClassName("tutorial-smallprint")[0].innerHTML;
      document.getElementsByClassName("tutorial-smallprint")[0].innerHTML = this._app.getManager("content").hideExternalLinksInText(smallprintHtml);
    }
  }
  hide() {
    clearTimeout(this._initTimeout);
    this._currIndex = null;
    super.hide();
  }
  calcPriorityIndex() {
    const viewedIndices = localStorage?.getItem(this._storageName)?.split(",") || [];
    const unviewedTutorials = this._allTutorials.filter((tutorial, tutorialIndex) => !viewedIndices.includes(tutorialIndex.toString()));
    return unviewedTutorials.length ? this._getIndexByTutorialId(unviewedTutorials[0].id) : null;
  }
  navigateToTutorial(tutorialIndex, useHomeRoute = false) {
    const {
      homeRoute: homeRoute,
      currentRoute: currentRoute,
      navigate: navigate
    } = this.app.getManager("router");
    const destinationRoute = useHomeRoute ? homeRoute : currentRoute.url ?? "";
    if ("number" == typeof tutorialIndex && tutorialIndex > -1 && tutorialIndex < this._allTutorials.length) {
      const {
        id: id
      } = this._allTutorials[tutorialIndex];
      navigate({
        tutorial: id
      }, destinationRoute);
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
