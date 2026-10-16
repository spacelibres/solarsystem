/** @eyes-analysis
 * 文件职责：教程步骤遮罩与提示定位
 * 依据：imports: ../../vendor/modules/A11y.js, ../../styles/extracted/TutorialOverlayStyles-497.js, ../../styles/extracted/TutorialOverlayStyles-498.js, ../../styles/extracted/TutorialOverlayStyles-499.js, ../../styles/extracted/TutorialOverlayStyles-500.js, ../../framework/eyes/public-api.js, ../templates/TutorialOverlayTemplate.html；manager dependencies: router, layer, content
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
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
/** @eyes-analysis
 * 类职责：教程步骤遮罩与提示定位；继承 EyesPublicApi.BaseComponent
 * 继承：EyesPublicApi.BaseComponent；导出：default。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class TutorialOverlay extends EyesPublicApi.BaseComponent {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；写入 _swiper, _allTutorials, _elementMeasures, _currIndex, _slideViewedTimeout, _initTimeout, _bulletClass, _activeBulletClass, _swiperSlideClass, _storageName。
   * 状态写入：_activeBulletClass、_allTutorials、_bulletClass、_currIndex、_elementMeasures、_initTimeout、_slideViewedTimeout、_storageName等；完整记录见索引。
   * 调用线索：super。
   */
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
  /** @eyes-analysis
   * 执行 setTutorials 对应的组件业务步骤；调用 this._createSlides；写入 _allTutorials。
   * 状态写入：_allTutorials。
   * 调用线索：this._createSlides。
   */
  setTutorials(allTutorials) {
    this._allTutorials = allTutorials;
    this._createSlides();
  }
  /** @eyes-analysis
   * 执行 hideTutorialSlide 对应的组件业务步骤。
   * 调用线索：tutorials.filter。
   */
  hideTutorialSlide(t) {
    const {
      tutorials: tutorials
    } = this.app;
    return tutorials.filter(({
      id: id
    }) => id !== t);
  }
  /** @eyes-analysis
   * 执行 _addEvents 对应的组件业务步骤；调用 this._swiper.on, this._setHighlightedElement, this._setActiveBullet, this.navigateToTutorial, this.setState, this._children.swiperSlides.addEventListener, this._app.getComponent。
   * 调用线索：this._app.getComponent、this._app.getComponent("definitionOverlay").navigateToDefinition、this._children.swiperSlides.addEventListener、this._setActiveBullet、this._setHighlightedElement等。
   */
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
  /** @eyes-analysis
   * 执行 _createSlides 对应的组件业务步骤；调用 this._allTutorials.forEach, this._addSlide。
   * 调用线索：document.createElement、o.push、this._addSlide、this._allTutorials.forEach。
   */
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
  /** @eyes-analysis
   * 执行 _addSlide 对应的组件业务步骤；调用 this._children.swiperSlides.append。
   * 调用线索：document.createElement、i.replaceChildren、this._children.swiperSlides.append。
   */
  _addSlide(t = [], e) {
    const i = document.createElement("div");
    i.className = e;
    i.replaceChildren(...t);
    this._children.swiperSlides.append(i);
  }
  /** @eyes-analysis
   * 执行 _createBullets 对应的组件业务步骤；调用 List.add, this._swiper.slideTo。
   * 调用线索：[...slides].map、bullets.replaceChildren、document.createElement、i.addEventListener、i.classList.add等。
   */
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
  /** @eyes-analysis
   * 执行 _setActiveBullet 对应的组件业务步骤；调用 Nodes.forEach, List.remove, List.add。
   * 调用线索：bullets.childNodes.forEach、e.classList.add、e.classList.remove。
   */
  _setActiveBullet(t = this._currIndex) {
    const {
      bullets: bullets
    } = this._children;
    bullets.childNodes.forEach((e, i) => {
      e.classList.remove(this._activeBulletClass);
      i === t && e.classList.add(this._activeBulletClass);
    });
  }
  /** @eyes-analysis
   * 执行 _setHighlightedElement 对应的组件业务步骤；调用 this._calcElementMeasures, Math.max, this._element.style.setProperty；写入 _elementMeasures。
   * 状态写入：_elementMeasures。
   * 调用线索：(100*(.5-.5*p+xPos*p)).toFixed、(100*m).toFixed、Math.max、this._calcElementMeasures、this._element.style.setProperty。
   */
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
  /** @eyes-analysis
   * 源码扩展或访问入口；调用 clearTimeout, this._getIndexByTutorialId, this._setSlideViewedTimeout, this._swiper.slideTo, this.app.getManager, this.hide, this.show；写入 _currIndex。
   * 状态写入：_currIndex。
   * 调用线索：clearTimeout、this._getIndexByTutorialId、this._setSlideViewedTimeout、this._swiper.slideTo、this.app.getManager等。
   */
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
  /** @eyes-analysis
   * 执行 _initSwiper 对应的组件业务步骤；调用 EyesPublicApi.AppUtils.elementReady, this._swiper.update, this._swiper.slideTo, A11y.default, this._postSwiperInitFunction, this._setActiveBullet, this._setHighlightedElement, super.show；写入 _initTimeout, _swiper。
   * 状态写入：_initTimeout、_swiper。
   * 调用线索：EyesPublicApi.AppUtils.elementReady、EyesPublicApi.AppUtils.elementReady(e).then、new A11y.default、setTimeout、super.show等。
   */
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
  /** @eyes-analysis
   * 执行 _postSwiperInitFunction 对应的组件业务步骤；调用 this._addEvents, this._createBullets, this._swiper.slideTo。
   * 调用线索：this._addEvents、this._createBullets、this._swiper.slideTo。
   */
  _postSwiperInitFunction() {
    this._addEvents();
    this._createBullets();
    this._swiper.slideTo(this._currIndex);
  }
  /** @eyes-analysis
   * 执行 _getIndexByTutorialId 对应的组件业务步骤。
   * 调用线索：this._allTutorials?.findIndex。
   */
  _getIndexByTutorialId(t) {
    return this._allTutorials?.findIndex(({
      id: id
    }) => id === t);
  }
  /** @eyes-analysis
   * 执行 _setSlideViewedTimeout 对应的组件业务步骤；写入 _slideViewedTimeout。
   * 状态写入：_slideViewedTimeout。
   * 调用线索：e.includes、e.push、e.sort、localStorage?.getItem、localStorage?.getItem(this._storageName)?.split等。
   */
  _setSlideViewedTimeout(t) {
    this._slideViewedTimeout = setTimeout(() => {
      const e = localStorage?.getItem(this._storageName)?.split(",") || [];
      e.includes(t.toString()) || (e.push(t), e.sort(), localStorage?.setItem(this._storageName, e));
    }, 3e3);
  }
  /** @eyes-analysis
   * 执行 _calcElementMeasures 对应的组件业务步骤；调用 this._allTutorials.map。
   * 调用线索：[...document.body.querySelectorAll(targetSelector)].filter、document.body.querySelectorAll、s[0].getBoundingClientRect、this._allTutorials.map。
   */
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
  /** @eyes-analysis
   * 执行 show 对应的组件业务步骤；调用 this._app.getManager, Manager.getLayer, Manager.toggleLayer, this._initSwiper。
   * 调用线索：document.getElementsByClassName、layerManager.getLayer、layerManager.toggleLayer、this._app.getManager、this._app.getManager("content").hideExternalLinksInText等。
   */
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
  /** @eyes-analysis
   * 执行 hide 对应的组件业务步骤；调用 super.hide；写入 _currIndex。
   * 状态写入：_currIndex。
   * 调用线索：clearTimeout、super.hide。
   */
  hide() {
    clearTimeout(this._initTimeout);
    this._currIndex = null;
    super.hide();
  }
  /** @eyes-analysis
   * 执行 calcPriorityIndex 对应的组件业务步骤；调用 this._allTutorials.filter, this._getIndexByTutorialId。
   * 调用线索：i.toString、localStorage?.getItem、localStorage?.getItem(this._storageName)?.split、t.includes、this._allTutorials.filter等。
   */
  calcPriorityIndex() {
    const t = localStorage?.getItem(this._storageName)?.split(",") || [];
    const e = this._allTutorials.filter((e, i) => !t.includes(i.toString()));
    return e.length ? this._getIndexByTutorialId(e[0].id) : null;
  }
  /** @eyes-analysis
   * 执行 navigateToTutorial 对应的组件业务步骤；调用 this.app.getManager。
   * 调用线索：navigate、this.app.getManager。
   */
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
  /** @eyes-analysis
   * 执行 close 对应的组件业务步骤；调用 this.app.getManager。
   * 调用线索：this.app.getManager、this.app.getManager("router").navigate。
   */
  close() {
    this.app.getManager("router").navigate({
      __remove: ["tutorial"]
    });
  }
  /** @eyes-analysis
   * 重排响应式界面；调用 this._setHighlightedElement。
   * 调用线索：this._setHighlightedElement。
   */
  resize() {
    this._state.isVisible && null !== this._currIndex && this._setHighlightedElement(this._currIndex, true);
  }
}
TutorialOverlay.html = getTutorialOverlayTemplate();
defaultExport = TutorialOverlay;
export { defaultExport as default };
