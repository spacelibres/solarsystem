// Recovered from app.js:619848-626658.
import * as A11y from "../../vendor/modules/A11y.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import CarouselPanelTemplate from "../templates/CarouselPanelTemplate.html";
let defaultExport;
var getCarouselPanelTemplate = () => CarouselPanelTemplate;
A11y.default.use([A11y.Navigation, A11y.Pagination, A11y.Keyboard, A11y.Mousewheel]);
/* Swiper 全局索引与标签页局部索引分开维护；分页圆点仅覆盖当前标签范围。每张长内容页持有滚动实例和拖动状态，mouseup 闭包成对撤销窗口鼠标监听。 */
class CarouselPanel extends EyesPublicApi.BaseComponent {
  constructor(app, options = {}) {
    const {
      paginationClass: paginationClass,
      prevButtonClass: prevButtonClass,
      nextButtonClass: nextButtonClass
    } = options;
    options.config = {
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
          renderCustom: (swiper, currentPage, totalPages) => `${currentPage} of ${totalPages}`
        }
      }),
      ...options.config
    };
    super(app, null, {
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
      ...options
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
  _addEvents() {
    this._swiper.on("slideChange", swiper => {
      const {
        realIndex: realIndex,
        previousIndex: previousIndex
      } = swiper;
      let relativeSlideIndex = realIndex;
      "function" == typeof this._onSlideChange && this._onSlideChange(swiper);
      const previousSlide = this._children.swiperSlides.childNodes[previousIndex];
      if (previousSlide?._scrollInstance && (previousSlide._isMousedown = false, previousSlide._scrollInstance.scroll(0)), this._tabElements) {
        const activeTabIndex = this._tabIndices.findIndex(({
          start: start,
          end: end
        }) => realIndex >= start && realIndex <= end);
        const {
          start: start
        } = this._tabIndices[activeTabIndex];
        if (relativeSlideIndex -= start, activeTabIndex > -1 && activeTabIndex !== this._activeTabIndex) {
          this._tabElements.forEach((tabElement, tabIndex) => {
            tabElement.classList.toggle("active", tabIndex === activeTabIndex);
          });
          this._activeTabIndex = activeTabIndex;
          return void this._createBullets(relativeSlideIndex);
        }
      }
      this._setActiveBullet(relativeSlideIndex);
    });
    this._children.swiperSlides.addEventListener("click", clickEvent => {
      const definitionId = clickEvent?.target?.dataset?.def;
      definitionId && this._app.getComponent("definitionOverlay").navigateToDefinition(definitionId);
    });
  }
  _hasOrientationChanged() {
    const orientation = EyesPublicApi.AppUtils.isPortrait() ? "portrait" : "landscape";
    const didOrientationChange = this._orientation !== orientation;
    this._orientation = orientation;
    return didOrientationChange;
  }
  _addScrollbars() {
    const didOrientationChange = this._hasOrientationChanged();
    this._children?.swiperSlides?.childNodes?.forEach(slideElement => {
      const {
        clientHeight: clientHeight,
        scrollHeight: scrollHeight,
        cHeight: cHeight,
        sHeight: sHeight
      } = slideElement;
      if (cHeight && cHeight === clientHeight && sHeight && sHeight === scrollHeight && !didOrientationChange) return;
      slideElement._scrollInstance?.destroy();
      const {
        clientHeight: viewportHeight,
        scrollHeight: contentHeight
      } = slideElement;
      if (slideElement.sHeight = viewportHeight, slideElement.cHeight = contentHeight, contentHeight > viewportHeight) {
        slideElement.classList.add("scrollable");
        slideElement._scrollInstance ??= EyesPublicApi.AppUtils.addScrollbar(slideElement);
        slideElement._isMousedown = false;
        slideElement._clientY = 0;
        const onDragMove = ({
          clientY: clientY
        }) => {
          if (slideElement._isMousedown) {
            const dragDeltaY = slideElement._clientY - clientY;
            slideElement._scrollInstance.scroll({
              y: `+=${dragDeltaY}`
            });
            slideElement._clientY = clientY;
          }
        };
        slideElement.onmousedown = ({
          clientY: clientY
        }) => {
          slideElement._isMousedown = true;
          slideElement._clientY = clientY;
          window.addEventListener("mousemove", onDragMove);
          window.addEventListener("mouseup", function onDragEnd() {
            slideElement._isMousedown = false;
            window.removeEventListener("mousemove", onDragMove);
            window.removeEventListener("mouseup", onDragEnd);
          });
        };
      }
    });
  }
  createTabs(tabInfos) {
    this._tabIndices = [];
    this._activeTabIndex = 0;
    let slideOffset = 0;
    this._swiper && this._destroy();
    this._tabElements = tabInfos.map(({
      title: title,
      content: content
    }, tabIndex) => {
      const tabElement = document.createElement("button");
      tabElement.innerHTML = title;
      tabElement.className = "clickable " + (tabIndex === this._activeTabIndex ? "active" : "");
      tabElement.addEventListener("click", this._onTabClick);
      this._tabIndices.push({
        start: slideOffset,
        end: slideOffset + content.length - 1
      });
      slideOffset += content.length;
      for (const slideInfo of content) {
        const slideElements = this._createSlideElements(slideInfo);
        this.addSlide(slideElements, slideInfo.onClick);
      }
      return tabElement;
    });
    this._children.tabsContainer.replaceChildren(...this._tabElements);
    this.setState({
      tabsVisibleClass: "",
      tabNumClass: `tabs-${this._tabElements.length}`
    });
  }
  _createSlideElements(slideInfo) {
    const {
      title: title,
      content: content,
      value: value
    } = slideInfo;
    const slideElements = [];
    if (title) {
      const titleElement = document.createElement("h4");
      titleElement.className = "title semi";
      titleElement.innerHTML = title;
      slideElements.push(titleElement);
    }
    if (content) {
      const descriptionElement = document.createElement("div");
      descriptionElement.className = "description";
      descriptionElement.innerHTML = content;
      slideElements.push(descriptionElement);
    }
    if (value) {
      const valueElement = document.createElement("div");
      valueElement.className = "value semi";
      valueElement.innerHTML = value;
      slideElements.push(valueElement);
    }
    return slideElements;
  }
  _createBullets(activeBulletIndex = 0) {
    const {
      bullets: bullets
    } = this._children;
    const {
      slides: slides
    } = this._swiper;
    let visibleSlides = [...slides];
    let slideOffset = 0;
    if (this._tabElements) {
      const {
        start: start,
        end: end
      } = this._tabIndices[this._activeTabIndex];
      slideOffset = start;
      visibleSlides = visibleSlides.slice(start, end + 1);
    }
    const bulletElements = [...visibleSlides].map((slideElement, bulletIndex) => {
      const bulletElement = document.createElement("span");
      bulletElement.classList.add(this._bulletClass);
      bulletElement.setAttribute("data-slide-index", bulletIndex + slideOffset);
      bulletElement.addEventListener("click", clickEvent => {
        const {
          slideIndex: slideIndex
        } = clickEvent.target.dataset;
        this._swiper.slideTo(slideIndex);
      });
      return bulletElement;
    });
    const replaceBullets = transitionEvent => {
      transitionEvent && "width" !== transitionEvent.propertyName || (bullets.replaceChildren(...bulletElements), bullets.classList.remove("hidden"), this._setActiveBullet(activeBulletIndex));
    };
    bullets.classList.contains("hidden") ? replaceBullets() : (bullets.classList.add("hidden"), bullets.ontransitionend = replaceBullets, bullets.ontransitioncancel = replaceBullets);
  }
  _setActiveBullet(activeBulletIndex) {
    const {
      bullets: bullets
    } = this._children;
    bullets.childNodes.forEach((bulletElement, bulletIndex) => {
      bulletElement.classList.remove(this._activeBulletClass);
      bulletIndex === activeBulletIndex && bulletElement.classList.add(this._activeBulletClass);
    });
  }
  addSlide(slideElements = [], onClick) {
    const slideElement = document.createElement("div");
    slideElement.className = `${onClick ? "clickable" : ""} ${this._swiperSlideClass}`;
    onClick && slideElement.addEventListener("click", onClick);
    slideElement.replaceChildren(...slideElements);
    this._children.swiperSlides.append(slideElement);
  }
  initSwiper() {
    const {
      carouselClass: carouselClass
    } = this._state;
    const slideSelector = `.${carouselClass} .swiper-wrapper > div`;
    return EyesPublicApi.AppUtils.elementReady(slideSelector).then(() => {
      this._swiper ? (this._swiper.update(), this._addScrollbars(), this._createBullets(), this._swiper.slideTo(0)) : (this._swiper = new A11y.default(`.${carouselClass}`, this._config), this._postSwiperInitFunction(this._swiper));
    });
  }
  _postSwiperInitFunction() {
    this._addEvents();
    this._addScrollbars();
    this._createBullets();
    this._swiper.update();
    this._swiper.slideTo(0);
  }
  _destroy() {
    this._children.swiperSlides.innerHTML = "";
    clearTimeout(this._resizeTimeout);
  }
  _onTabClick(clickEvent) {
    const tabIndex = this._tabElements.findIndex(tabElement => tabElement === clickEvent.target);
    const {
      start: start
    } = this._tabIndices[tabIndex];
    this._swiper.slideTo(start);
  }
  expand() {
    this.setState({
      isExpanded: true,
      isExpandedClass: "expanded"
    });
    this.triggerCallbacks("expandtoggle", [true]);
  }
  collapse() {
    this.setState({
      isExpanded: false,
      isExpandedClass: "collapsed"
    });
    this.triggerCallbacks("expandtoggle", [false]);
  }
  setExpandState(isExpanded) {
    this.setState({
      isExpanded: isExpanded,
      isExpandedClass: isExpanded ? "expanded" : "collapsed"
    });
    this.triggerCallbacks("expandtoggle", [isExpanded]);
  }
  show(initializeSwiper = true) {
    const isUIVisible = this._app.getManager("layer").getLayer("ui").visible;
    const slideCount = this._children.swiperSlides?.childNodes?.length;
    const revealPanel = () => {
      this._expandOnShow ? (this.setState({
        isVisible: true,
        isVisibleClass: this._class.isVisible.true,
        isExpanded: true,
        isExpandedClass: "expanded"
      }), this.triggerCallbacks("expandtoggle", [true]), this.triggerCallbacks("visiblechange", [true])) : super.show();
    };
    initializeSwiper && isUIVisible && slideCount ? this.initSwiper().then(() => revealPanel()) : revealPanel();
  }
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
