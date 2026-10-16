/** @eyes-analysis
 * 文件职责：轮播面板及其条目生命周期
 * 依据：imports: ../../vendor/modules/A11y.js, ../../framework/eyes/public-api.js, ../templates/CarouselPanelTemplate.html；manager dependencies: layer
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:619848-626658.
import * as A11y from "../../vendor/modules/A11y.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import CarouselPanelTemplate from "../templates/CarouselPanelTemplate.html";
let defaultExport;
var getCarouselPanelTemplate = () => CarouselPanelTemplate;
A11y.default.use([A11y.Navigation, A11y.Pagination, A11y.Keyboard, A11y.Mousewheel]);
/** @eyes-analysis
 * 类职责：轮播面板及其条目生命周期；继承 EyesPublicApi.BaseComponent
 * 继承：EyesPublicApi.BaseComponent；导出：default。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class CarouselPanel extends EyesPublicApi.BaseComponent {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 this._eventNames.push, this._initCallbacks, this.bindFunctions；写入 _swiper, _tabIndices, _activeTabIndex, _tabElements, _bulletClass, _activeBulletClass, _swiperSlideClass, _onSlideChange, _expandOnShow, _orientation, _resizeTimeout, _isInitialized。
   * 状态写入：_activeBulletClass、_activeTabIndex、_bulletClass、_expandOnShow、_isInitialized、_onSlideChange、_orientation、_resizeTimeout等；完整记录见索引。
   * 调用线索：super、this._eventNames.push、this._initCallbacks、this.bindFunctions。
   */
  constructor(t, e = {}) {
    const {
      paginationClass: paginationClass,
      prevButtonClass: prevButtonClass,
      nextButtonClass: nextButtonClass
    } = e;
    e.config = {
      direction: "horizontal",
      speed: 600,
      grabCursor: true,
      touchStartPreventDefault: false,
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
        prevEl: `.${prevButtonClass}`,
        nextEl: `.${nextButtonClass}`
      },
      ...(paginationClass && {
        pagination: {
          el: `.${paginationClass}`,
          type: "custom",
          renderCustom: (t, e, i) => `${e} of ${i}`
        }
      }),
      ...e.config
    };
    super(t, null, {
      isVisible: false,
      preTitle: "viewing",
      title: "Panel Title",
      caption: "This is the panel subtitle",
      carouselClass: "",
      paginationClass: "",
      prevButtonClass: "",
      nextButtonClass: "",
      isExpandedClass: "collapsed",
      tabsVisibleClass: "hidden",
      tabNumClass: "",
      ...e
    });
    this._swiper = null;
    this._tabIndices = null;
    this._activeTabIndex = null;
    this._tabElements = null;
    this._bulletClass = "swiper-pagination-bullet";
    this._activeBulletClass = "swiper-pagination-bullet-active";
    this._swiperSlideClass = "swiper-slide";
    this._onSlideChange = null;
    this._expandOnShow = false;
    this._orientation = null;
    this._resizeTimeout = null;
    this._isInitialized = null;
    this._eventNames.push("expandtoggle");
    this._initCallbacks();
    this.bindFunctions(["_onTabClick"]);
  }
  /** @eyes-analysis
   * 执行 _addEvents 对应的组件业务步骤；调用 this._swiper.on, this._onSlideChange, Instance.scroll, this._tabIndices.findIndex, this._tabElements.forEach, List.toggle, this._createBullets, this._setActiveBullet, this._children.swiperSlides.addEventListener, this._app.getComponent；写入 _activeTabIndex。
   * 状态写入：_activeTabIndex。
   * 调用线索：e.classList.toggle、n._scrollInstance.scroll、this._app.getComponent、this._app.getComponent("definitionOverlay").navigateToDefinition、this._children.swiperSlides.addEventListener等。
   */
  _addEvents() {
    this._swiper.on("slideChange", t => {
      const {
        realIndex: realIndex,
        previousIndex: previousIndex
      } = t;
      let s = realIndex;
      "function" == typeof this._onSlideChange && this._onSlideChange(t);
      const n = this._children.swiperSlides.childNodes[previousIndex];
      if (n?._scrollInstance && (n._isMousedown = false, n._scrollInstance.scroll(0)), this._tabElements) {
        const activeTabIndex = this._tabIndices.findIndex(({
          start: start,
          end: end
        }) => realIndex >= start && realIndex <= end);
        const {
          start: start
        } = this._tabIndices[activeTabIndex];
        if (s -= start, activeTabIndex > -1 && activeTabIndex !== this._activeTabIndex) {
          this._tabElements.forEach((e, i) => {
            e.classList.toggle("active", i === activeTabIndex);
          });
          this._activeTabIndex = activeTabIndex;
          return void this._createBullets(s);
        }
      }
      this._setActiveBullet(s);
    });
    this._children.swiperSlides.addEventListener("click", t => {
      const e = t?.target?.dataset?.def;
      e && this._app.getComponent("definitionOverlay").navigateToDefinition(e);
    });
  }
  /** @eyes-analysis
   * 执行 _hasOrientationChanged 对应的组件业务步骤；调用 EyesPublicApi.AppUtils.isPortrait；写入 _orientation。
   * 状态写入：_orientation。
   * 调用线索：EyesPublicApi.AppUtils.isPortrait。
   */
  _hasOrientationChanged() {
    const orientation = EyesPublicApi.AppUtils.isPortrait() ? "portrait" : "landscape";
    const e = this._orientation !== orientation;
    this._orientation = orientation;
    return e;
  }
  /** @eyes-analysis
   * 执行 _addScrollbars 对应的组件业务步骤；调用 this._hasOrientationChanged, List.add, EyesPublicApi.AppUtils.addScrollbar, Instance.scroll。
   * 调用线索：EyesPublicApi.AppUtils.addScrollbar、e._scrollInstance.scroll、e._scrollInstance?.destroy、e.classList.add、this._children?.swiperSlides?.childNodes?.forEach等。
   */
  _addScrollbars() {
    const t = this._hasOrientationChanged();
    this._children?.swiperSlides?.childNodes?.forEach(e => {
      const {
        clientHeight: clientHeight,
        scrollHeight: scrollHeight,
        cHeight: cHeight,
        sHeight: sHeight
      } = e;
      if (cHeight && cHeight === clientHeight && sHeight && sHeight === scrollHeight && !t) return;
      e._scrollInstance?.destroy();
      const {
        clientHeight: a,
        scrollHeight: l
      } = e;
      if (e.sHeight = a, e.cHeight = l, l > a) {
        e.classList.add("scrollable");
        e._scrollInstance ??= EyesPublicApi.AppUtils.addScrollbar(e);
        e._isMousedown = false;
        e._clientY = 0;
        const t = ({
          clientY: clientY
        }) => {
          if (e._isMousedown) {
            const i = e._clientY - clientY;
            e._scrollInstance.scroll({
              y: `+=${i}`
            });
            e._clientY = clientY;
          }
        };
        e.onmousedown = ({
          clientY: clientY
        }) => {
          e._isMousedown = true;
          e._clientY = clientY;
          window.addEventListener("mousemove", t);
          window.addEventListener("mouseup", function i() {
            e._isMousedown = false;
            window.removeEventListener("mousemove", t);
            window.removeEventListener("mouseup", i);
          });
        };
      }
    });
  }
  /** @eyes-analysis
   * 执行 createTabs 对应的组件业务步骤；调用 this._destroy, this._tabIndices.push, this._createSlideElements, this.addSlide, this._children.tabsContainer.replaceChildren, this.setState；写入 _tabIndices, _activeTabIndex, _tabElements。
   * 状态写入：_activeTabIndex、_tabElements、_tabIndices。
   * 调用线索：document.createElement、n.addEventListener、t.map、this._children.tabsContainer.replaceChildren、this._createSlideElements等。
   */
  createTabs(t) {
    this._tabIndices = [];
    this._activeTabIndex = 0;
    let e = 0;
    this._swiper && this._destroy();
    this._tabElements = t.map(({
      title: title,
      content: content
    }, s) => {
      const n = document.createElement("button");
      n.innerHTML = title;
      n.className = "clickable " + (s === this._activeTabIndex ? "active" : "");
      n.addEventListener("click", this._onTabClick);
      this._tabIndices.push({
        start: e,
        end: e + content.length - 1
      });
      e += content.length;
      for (const t of content) {
        const e = this._createSlideElements(t);
        this.addSlide(e, t.onClick);
      }
      return n;
    });
    this._children.tabsContainer.replaceChildren(...this._tabElements);
    this.setState({
      tabsVisibleClass: "",
      tabNumClass: `tabs-${this._tabElements.length}`
    });
  }
  /** @eyes-analysis
   * 执行 _createSlideElements 对应的组件业务步骤。
   * 调用线索：document.createElement、n.push。
   */
  _createSlideElements(t) {
    const {
      title: title,
      content: content,
      value: value
    } = t;
    const n = [];
    if (title) {
      const t = document.createElement("h4");
      t.className = "title semi";
      t.innerHTML = title;
      n.push(t);
    }
    if (content) {
      const t = document.createElement("div");
      t.className = "description";
      t.innerHTML = content;
      n.push(t);
    }
    if (value) {
      const t = document.createElement("div");
      t.className = "value semi";
      t.innerHTML = value;
      n.push(t);
    }
    return n;
  }
  /** @eyes-analysis
   * 执行 _createBullets 对应的组件业务步骤；调用 List.add, this._swiper.slideTo, List.remove, this._setActiveBullet, List.contains。
   * 调用线索：[...s].map、bullets.classList.add、bullets.classList.contains、bullets.classList.remove、bullets.replaceChildren等。
   */
  _createBullets(t = 0) {
    const {
      bullets: bullets
    } = this._children;
    const {
      slides: slides
    } = this._swiper;
    let s = [...slides];
    let n = 0;
    if (this._tabElements) {
      const {
        start: start,
        end: end
      } = this._tabIndices[this._activeTabIndex];
      n = start;
      s = s.slice(start, end + 1);
    }
    const o = [...s].map((t, e) => {
      const i = document.createElement("span");
      i.classList.add(this._bulletClass);
      i.setAttribute("data-slide-index", e + n);
      i.addEventListener("click", t => {
        const {
          slideIndex: slideIndex
        } = t.target.dataset;
        this._swiper.slideTo(slideIndex);
      });
      return i;
    });
    const r = i => {
      i && "width" !== i.propertyName || (bullets.replaceChildren(...o), bullets.classList.remove("hidden"), this._setActiveBullet(t));
    };
    bullets.classList.contains("hidden") ? r() : (bullets.classList.add("hidden"), bullets.ontransitionend = r, bullets.ontransitioncancel = r);
  }
  /** @eyes-analysis
   * 执行 _setActiveBullet 对应的组件业务步骤；调用 Nodes.forEach, List.remove, List.add。
   * 调用线索：bullets.childNodes.forEach、e.classList.add、e.classList.remove。
   */
  _setActiveBullet(t) {
    const {
      bullets: bullets
    } = this._children;
    bullets.childNodes.forEach((e, i) => {
      e.classList.remove(this._activeBulletClass);
      i === t && e.classList.add(this._activeBulletClass);
    });
  }
  /** @eyes-analysis
   * 执行 addSlide 对应的组件业务步骤；调用 this._children.swiperSlides.append。
   * 调用线索：document.createElement、i.addEventListener、i.replaceChildren、this._children.swiperSlides.append。
   */
  addSlide(t = [], e) {
    const i = document.createElement("div");
    i.className = `${e ? "clickable" : ""} ${this._swiperSlideClass}`;
    e && i.addEventListener("click", e);
    i.replaceChildren(...t);
    this._children.swiperSlides.append(i);
  }
  /** @eyes-analysis
   * 执行 initSwiper 对应的组件业务步骤；调用 EyesPublicApi.AppUtils.elementReady, this._swiper.update, this._addScrollbars, this._createBullets, this._swiper.slideTo, A11y.default, this._postSwiperInitFunction；写入 _swiper。
   * 状态写入：_swiper。
   * 调用线索：EyesPublicApi.AppUtils.elementReady、EyesPublicApi.AppUtils.elementReady(e).then、new A11y.default、this._addScrollbars、this._createBullets等。
   */
  initSwiper() {
    const {
      carouselClass: carouselClass
    } = this._state;
    const e = `.${carouselClass} .swiper-wrapper > div`;
    return EyesPublicApi.AppUtils.elementReady(e).then(() => {
      this._swiper ? (this._swiper.update(), this._addScrollbars(), this._createBullets(), this._swiper.slideTo(0)) : (this._swiper = new A11y.default(`.${carouselClass}`, this._config), this._postSwiperInitFunction(this._swiper));
    });
  }
  /** @eyes-analysis
   * 执行 _postSwiperInitFunction 对应的组件业务步骤；调用 this._addEvents, this._addScrollbars, this._createBullets, this._swiper.update, this._swiper.slideTo。
   * 调用线索：this._addEvents、this._addScrollbars、this._createBullets、this._swiper.slideTo、this._swiper.update。
   */
  _postSwiperInitFunction() {
    this._addEvents();
    this._addScrollbars();
    this._createBullets();
    this._swiper.update();
    this._swiper.slideTo(0);
  }
  /** @eyes-analysis
   * 执行 _destroy 对应的组件业务步骤。
   * 状态写入：_children.swiperSlides.innerHTML。
   * 调用线索：clearTimeout。
   */
  _destroy() {
    this._children.swiperSlides.innerHTML = "";
    clearTimeout(this._resizeTimeout);
  }
  /** @eyes-analysis
   * 执行 _onTabClick 对应的组件业务步骤；调用 this._tabElements.findIndex, this._swiper.slideTo。
   * 调用线索：this._swiper.slideTo、this._tabElements.findIndex。
   */
  _onTabClick(t) {
    const e = this._tabElements.findIndex(e => e === t.target);
    const {
      start: start
    } = this._tabIndices[e];
    this._swiper.slideTo(start);
  }
  /** @eyes-analysis
   * 执行 expand 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
   * 调用线索：this.setState、this.triggerCallbacks。
   */
  expand() {
    this.setState({
      isExpanded: true,
      isExpandedClass: "expanded"
    });
    this.triggerCallbacks("expandtoggle", [true]);
  }
  /** @eyes-analysis
   * 执行 collapse 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
   * 调用线索：this.setState、this.triggerCallbacks。
   */
  collapse() {
    this.setState({
      isExpanded: false,
      isExpandedClass: "collapsed"
    });
    this.triggerCallbacks("expandtoggle", [false]);
  }
  /** @eyes-analysis
   * 执行 setExpandState 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
   * 调用线索：this.setState、this.triggerCallbacks。
   */
  setExpandState(t) {
    this.setState({
      isExpanded: t,
      isExpandedClass: t ? "expanded" : "collapsed"
    });
    this.triggerCallbacks("expandtoggle", [t]);
  }
  /** @eyes-analysis
   * 执行 show 对应的组件业务步骤；调用 this._app.getManager, this.setState, this.triggerCallbacks, super.show, this.initSwiper。
   * 调用线索：s、super.show、this._app.getManager、this._app.getManager("layer").getLayer、this.initSwiper等。
   */
  show(t = true) {
    const e = this._app.getManager("layer").getLayer("ui").visible;
    const i = this._children.swiperSlides?.childNodes?.length;
    const s = () => {
      this._expandOnShow ? (this.setState({
        isVisible: true,
        isVisibleClass: this._class.isVisible.true,
        isExpanded: true,
        isExpandedClass: "expanded"
      }), this.triggerCallbacks("expandtoggle", [true]), this.triggerCallbacks("visiblechange", [true])) : super.show();
    };
    t && e && i ? this.initSwiper().then(() => s()) : s();
  }
  /** @eyes-analysis
   * 执行 hide 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks；写入 _isInitialized。
   * 状态写入：_isInitialized。
   * 调用线索：this.setState、this.triggerCallbacks。
   */
  hide() {
    this.setState({
      isVisible: false,
      isVisibleClass: this._class.isVisible.false,
      isExpanded: false,
      isExpandedClass: "collapsed"
    });
    this.triggerCallbacks("expandtoggle", [false, false]);
    this.triggerCallbacks("visiblechange", [false]);
    this._expandOnShow && (this._isInitialized = false);
  }
  /** @eyes-analysis
   * 重排响应式界面；调用 this._addScrollbars；写入 _resizeTimeout。
   * 状态写入：_resizeTimeout。
   * 调用线索：clearTimeout、setTimeout、this._addScrollbars。
   */
  resize() {
    clearTimeout(this._resizeTimeout);
    this._resizeTimeout = setTimeout(() => {
      this._addScrollbars();
    }, 200);
  }
}
CarouselPanel.html = getCarouselPanelTemplate();
defaultExport = CarouselPanel;
export { defaultExport as default };
