// Recovered from app.js:674726-678723.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import "../../styles/extracted/StoryStyles.js";
class Story extends EyesPublicApi.Carousel {
  constructor(t, e) {
    super(t, null, {
      isCloseButtonVisible: true,
      closeButtonText: "Close",
      ...e
    });
    this._id = "";
    this._info = [];
    this._blocks = {};
    this._config.navigationButtons.next.text = EyesPublicApi.AppUtils.isPrimaryTouch() ? "Swipe to continue" : "Scroll to continue";
    this._onSlideChange = async (t, e = false) => {
      const i = {
        slide: this._children.slides[t].dataset.id
      };
      e ? i.time = this._app.getManager("time").getTimeUrl() : i.__remove = ["time"];
      const routerManager = this._app.getManager("router");
      const n = routerManager.currentRoute;
      await routerManager.navigate(i, n.url);
    };
  }
  init() {
    super.init();
    const t = this._element.querySelector(".close-button");
    t?.setAttribute("aria-label", "Close story");
    this._setVariables(this._children.carousel, false);
  }
  _setExpandToggleAriaLabel() {
    const t = this._element.querySelectorAll(".mobile-collapse");
    const e = this._state.isCollapsed ? "Collapse story panel" : "Expand story panel";
    t.forEach(t => t.setAttribute("aria-label", e));
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
      const t = false;
      this.setState({
        isCloseButtonVisible: t,
        isCloseButtonVisibleClass: this._class.isVisible[t]
      });
    }
    await this.setUp();
    this._setExpandToggleAriaLabel();
    const n = slide && this._children.slides.findIndex(t => t.dataset.id === slide) || 0;
    void 0 !== info[n]?.rate && this._app.getManager("time").setTimeRate(info[n].rate);
    await this.goToSlide(n);
  }
  async onQueryChange({
    cancelToken: cancelToken,
    slide: slide
  } = {}) {
    if (cancelToken && cancelToken.isCanceled) return;
    const i = slide && this._children.slides.findIndex(t => t.dataset.id === slide) || 0;
    void 0 !== this._info[i]?.rate && this._app.getManager("time").setTimeRate(this._info[i].rate);
    await this.goToSlide(i);
  }
  async createBlockContent(t, e) {
    const {
      hideExternalLinks: hideExternalLinks
    } = this.app.getManager("router").configs;
    let n;
    switch (t.type) {
      case "title":
        {
          const e = {
            ...t
          };
          e.title = true === hideExternalLinks ? this.app.getManager("content").hideExternalLinksInText(e.title) : e.title;
          n = new EyesPublicApi.TitleBlock(this._app, {
            config: {
              info: e
            }
          });
          break;
        }
      case "description":
        {
          const e = {
            ...t
          };
          e.description = true === hideExternalLinks ? this.app.getManager("content").hideExternalLinksInText(e.description) : e.description;
          n = new EyesPublicApi.DescriptionBlock(this._app, {
            config: {
              info: e
            }
          });
          break;
        }
      case "image":
      case "diagram":
        n = new EyesPublicApi.ImageBlock(this._app, {
          config: {
            info: t
          }
        });
        break;
      case "toggle":
        n = new EyesPublicApi.ToggleBlock(this._app, {
          config: {
            info: t
          }
        });
        break;
      case "hint":
        n = new EyesPublicApi.HintBlock(this._app, {
          config: {
            info: t
          }
        });
        break;
      case "replay":
        n = new EyesPublicApi.ReplayButtonBlock(this._app, {
          config: {
            info: t
          }
        });
        break;
      case "buttons":
        n = new EyesPublicApi.ButtonsBlock(this._app, {
          config: {
            info: t
          }
        });
        break;
      case "checkboxes":
        n = new EyesPublicApi.CheckboxBlock(this._app, {
          config: {
            info: t
          }
        });
    }
    await n.init();
    this._onEnter[e].push(n.onEnter);
    this._onLeave[e].push(n.onLeave);
    this._blocks[t.type] = n;
    return n.element;
  }
  getStoryBlock(t) {
    return this._blocks[t] || console.warn(`Block ${t} is not available`);
  }
  async createSlideContent(t, e) {
    if (!t.htmlFile) {
      const i = document.createDocumentFragment();
      for (let s = 0; s < t.content.length; s++) {
        const n = t.content[s];
        const o = await this.createBlockContent(n, e);
        o && i.appendChild(o);
      }
      return i;
    }
  }
  async setUp() {
    for (let t = 0; t < this._info.length; t++) {
      const {
        id: id,
        type: type,
        classList: s = [],
        onEnter: onEnter,
        onLeave: onLeave
      } = this._info[t];
      this._onEnter[t] = [];
      this._onLeave[t] = [];
      onEnter && this._onEnter[t].push(() => onEnter(this._app, this));
      const r = await this.createSlideContent(this._info[t], t);
      s.push("grid-layout", "simple-grid");
      onLeave && this._onLeave[t].push(() => onLeave(this._app, this));
      this.addSlide({
        id: id,
        type: type,
        classList: s,
        content: r
      }, {
        isFirst: 0 === t,
        isLast: t === this._info.length - 1
      });
    }
  }
  close() {
    const routerManager = this._app.getManager("router");
    routerManager.navigate(routerManager.homeRoute);
  }
  async onLeave(t) {
    if (await super.onLeave(t), "number" != typeof t) {
      this._app.getManager("router").removeQuery(["slide"]);
    }
  }
  _updateTooltipsProps() {
    const {
      slideType: slideType
    } = this._state;
    const e = getComputedStyle(document.body);
    const i = -(parseFloat(e.getPropertyValue("--gridHeaderHeight")) + 20);
    null !== this._progressTooltip && this._progressTooltip.setProps({
      offset: "overlay" === slideType ? [0, i] : [0, 10]
    });
  }
}
export { Story };
