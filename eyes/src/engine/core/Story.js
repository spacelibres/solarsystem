// Recovered from app.js:674726-678723.
/* 故事组件把幻灯片 id 写入路由，以轮播索引管理 DOM 和进入/离开回调。每个内容块初始化后将生命周期函数登记到所属页，按内容类型缓存最近创建的实例。 */
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import "../../styles/extracted/StoryStyles.js";
class Story extends EyesPublicApi.Carousel {
  constructor(app, options) {
    super(app, null, {
      isCloseButtonVisible: true,
      closeButtonText: "Close",
      ...options
    });
    this._id = "";
    this._info = [];
    this._blocks = {};
    this._config.navigationButtons.next.text = EyesPublicApi.AppUtils.isPrimaryTouch() ? "Swipe to continue" : "Scroll to continue";
    this._onSlideChange = async (slideIndex, keepTime = false) => {
      const slideQuery = {
        slide: this._children.slides[slideIndex].dataset.id
      };
      keepTime ? slideQuery.time = this._app.getManager("time").getTimeUrl() : slideQuery.__remove = ["time"];
      const routerManager = this._app.getManager("router");
      const currentRoute = routerManager.currentRoute;
      await routerManager.navigate(slideQuery, currentRoute.url);
    };
  }
  init() {
    super.init();
    const closeButton = this._element.querySelector(".close-button");
    closeButton?.setAttribute("aria-label", "Close story");
    this._setVariables(this._children.carousel, false);
  }
  _setExpandToggleAriaLabel() {
    const collapseButtons = this._element.querySelectorAll(".mobile-collapse");
    const actionLabel = this._state.isCollapsed ? "Collapse story panel" : "Expand story panel";
    collapseButtons.forEach(collapseButton => collapseButton.setAttribute("aria-label", actionLabel));
  }
  _toggleCollapse() {
    this._setExpandToggleAriaLabel();
    super._toggleCollapse();
  }
  async onRouteChange(info, {
    cancelToken: cancelToken,
    slide: slide,
    id: id
  } = {}) {
    if (cancelToken && cancelToken.isCanceled) return;
    if (this.clear(), this._info = info, this._id = id, this._app.getManager("router").configs.locked) {
      const showCloseButton = false;
      this.setState({
        isCloseButtonVisible: showCloseButton,
        isCloseButtonVisibleClass: this._class.isVisible[showCloseButton]
      });
    }
    await this.setUp();
    this._setExpandToggleAriaLabel();
    const slideIndex = slide && this._children.slides.findIndex(slideElement => slideElement.dataset.id === slide) || 0;
    void 0 !== info[slideIndex]?.rate && this._app.getManager("time").setTimeRate(info[slideIndex].rate);
    await this.goToSlide(slideIndex);
  }
  async onQueryChange({
    cancelToken: cancelToken,
    slide: slide
  } = {}) {
    if (cancelToken && cancelToken.isCanceled) return;
    const slideIndex = slide && this._children.slides.findIndex(slideElement => slideElement.dataset.id === slide) || 0;
    void 0 !== this._info[slideIndex]?.rate && this._app.getManager("time").setTimeRate(this._info[slideIndex].rate);
    await this.goToSlide(slideIndex);
  }
  async createBlockContent(blockInfo, slideIndex) {
    const {
      hideExternalLinks: hideExternalLinks
    } = this.app.getManager("router").configs;
    let blockComponent;
    switch (blockInfo.type) {
      case "title":
        {
          const titleInfo = {
            ...blockInfo
          };
          titleInfo.title = true === hideExternalLinks ? this.app.getManager("content").hideExternalLinksInText(titleInfo.title) : titleInfo.title;
          blockComponent = new EyesPublicApi.TitleBlock(this._app, {
            config: {
              info: titleInfo
            }
          });
          break;
        }
      case "description":
        {
          const descriptionInfo = {
            ...blockInfo
          };
          descriptionInfo.description = true === hideExternalLinks ? this.app.getManager("content").hideExternalLinksInText(descriptionInfo.description) : descriptionInfo.description;
          blockComponent = new EyesPublicApi.DescriptionBlock(this._app, {
            config: {
              info: descriptionInfo
            }
          });
          break;
        }
      case "image":
      case "diagram":
        blockComponent = new EyesPublicApi.ImageBlock(this._app, {
          config: {
            info: blockInfo
          }
        });
        break;
      case "toggle":
        blockComponent = new EyesPublicApi.ToggleBlock(this._app, {
          config: {
            info: blockInfo
          }
        });
        break;
      case "hint":
        blockComponent = new EyesPublicApi.HintBlock(this._app, {
          config: {
            info: blockInfo
          }
        });
        break;
      case "replay":
        blockComponent = new EyesPublicApi.ReplayButtonBlock(this._app, {
          config: {
            info: blockInfo
          }
        });
        break;
      case "buttons":
        blockComponent = new EyesPublicApi.ButtonsBlock(this._app, {
          config: {
            info: blockInfo
          }
        });
        break;
      case "checkboxes":
        blockComponent = new EyesPublicApi.CheckboxBlock(this._app, {
          config: {
            info: blockInfo
          }
        });
    }
    await blockComponent.init();
    this._onEnter[slideIndex].push(blockComponent.onEnter);
    this._onLeave[slideIndex].push(blockComponent.onLeave);
    this._blocks[blockInfo.type] = blockComponent;
    return blockComponent.element;
  }
  getStoryBlock(blockType) {
    return this._blocks[blockType] || console.warn(`Block ${blockType} is not available`);
  }
  async createSlideContent(slideInfo, slideIndex) {
    if (!slideInfo.htmlFile) {
      const contentFragment = document.createDocumentFragment();
      for (let blockIndex = 0; blockIndex < slideInfo.content.length; blockIndex++) {
        const blockInfo = slideInfo.content[blockIndex];
        const blockElement = await this.createBlockContent(blockInfo, slideIndex);
        blockElement && contentFragment.appendChild(blockElement);
      }
      return contentFragment;
    }
  }
  async setUp() {
    for (let slideIndex = 0; slideIndex < this._info.length; slideIndex++) {
      const {
        id: id,
        type: type,
        classList: slideClasses = [],
        onEnter: onEnter,
        onLeave: onLeave
      } = this._info[slideIndex];
      this._onEnter[slideIndex] = [];
      this._onLeave[slideIndex] = [];
      onEnter && this._onEnter[slideIndex].push(() => onEnter(this._app, this));
      const slideContent = await this.createSlideContent(this._info[slideIndex], slideIndex);
      slideClasses.push("grid-layout", "simple-grid");
      onLeave && this._onLeave[slideIndex].push(() => onLeave(this._app, this));
      this.addSlide({
        id: id,
        type: type,
        classList: slideClasses,
        content: slideContent
      }, {
        isFirst: 0 === slideIndex,
        isLast: slideIndex === this._info.length - 1
      });
    }
  }
  close() {
    const routerManager = this._app.getManager("router");
    routerManager.navigate(routerManager.homeRoute);
  }
  async onLeave(slideIndex) {
    if (await super.onLeave(slideIndex), "number" != typeof slideIndex) {
      this._app.getManager("router").removeQuery(["slide"]);
    }
  }
  _updateTooltipsProps() {
    const {
      slideType: slideType
    } = this._state;
    const bodyStyle = getComputedStyle(document.body);
    const overlayOffset = -(parseFloat(bodyStyle.getPropertyValue("--gridHeaderHeight")) + 20);
    null !== this._progressTooltip && this._progressTooltip.setProps({
      offset: "overlay" === slideType ? [0, overlayOffset] : [0, 10]
    });
  }
}
export { Story };
