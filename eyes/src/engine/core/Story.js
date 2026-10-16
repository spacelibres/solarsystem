/** @eyes-analysis
 * 文件职责：管理故事进入/退出、幻灯片、摄像机步骤、时间限制及内容块。
 * 依据：import ../../framework/eyes/public-api.js；import ../../styles/extracted/StoryStyles.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:674726-678723.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import "../../styles/extracted/StoryStyles.js";
/** @eyes-analysis
 * 类职责：管理故事进入/退出、幻灯片、摄像机步骤、时间限制及内容块。
 * 继承：EyesPublicApi.Carousel；导出：Story。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Story extends EyesPublicApi.Carousel {
  /** @eyes-analysis
   * 【结构证据】写入 `_blocks`、`_config.navigationButtons.next.text`、`_id`、`_info`、`_onSlideChange`；调用 `EyesPublicApi.AppUtils.isPrimaryTouch`、`routerManager.navigate`、`super`、`this._app.getManager`、`this._app.getManager("time").getTimeUrl`。
   * 状态写入：_blocks、_config.navigationButtons.next.text、_id、_info、_onSlideChange。
   * 调用线索：EyesPublicApi.AppUtils.isPrimaryTouch、routerManager.navigate、super、this._app.getManager、this._app.getManager("time").getTimeUrl。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `super.init`、`this._element.querySelector`、`this._setVariables`。
   * 调用线索：super.init、t?.setAttribute、this._element.querySelector、this._setVariables。
   */
  init() {
    super.init();
    const t = this._element.querySelector(".close-button");
    t?.setAttribute("aria-label", "Close story");
    this._setVariables(this._children.carousel, false);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.forEach`、`t.setAttribute`、`this._element.querySelectorAll`。
   * 调用线索：t.forEach、t.setAttribute、this._element.querySelectorAll。
   */
  _setExpandToggleAriaLabel() {
    const t = this._element.querySelectorAll(".mobile-collapse");
    const e = this._state.isCollapsed ? "Collapse story panel" : "Expand story panel";
    t.forEach(t => t.setAttribute("aria-label", e));
  }
  /** @eyes-analysis
   * 【结构证据】调用 `super._toggleCollapse`、`this._setExpandToggleAriaLabel`。
   * 调用线索：super._toggleCollapse、this._setExpandToggleAriaLabel。
   */
  _toggleCollapse() {
    this._setExpandToggleAriaLabel();
    super._toggleCollapse();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_id`、`_info`；返回 `void`；调用 `this._app.getManager`、`this._app.getManager("time").setTimeRate`、`this._children.slides.findIndex`、`this._setExpandToggleAriaLabel`、`this.clear`、`this.goToSlide`。
   * 状态写入：_id、_info。
   * 调用线索：this._app.getManager、this._app.getManager("time").setTimeRate、this._children.slides.findIndex、this._setExpandToggleAriaLabel、this.clear等。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `this._app.getManager`、`this._app.getManager("time").setTimeRate`、`this._children.slides.findIndex`、`this.goToSlide`。
   * 调用线索：this._app.getManager、this._app.getManager("time").setTimeRate、this._children.slides.findIndex、this.goToSlide。
   */
  async onQueryChange({
    cancelToken: cancelToken,
    slide: slide
  } = {}) {
    if (cancelToken && cancelToken.isCanceled) return;
    const i = slide && this._children.slides.findIndex(t => t.dataset.id === slide) || 0;
    void 0 !== this._info[i]?.rate && this._app.getManager("time").setTimeRate(this._info[i].rate);
    await this.goToSlide(i);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_blocks[t.type]`；返回 `n.element`；调用 `n.init`、`new EyesPublicApi.ButtonsBlock`、`new EyesPublicApi.CheckboxBlock`、`new EyesPublicApi.DescriptionBlock`、`new EyesPublicApi.HintBlock`、`new EyesPublicApi.ImageBlock`。
   * 状态写入：_blocks[t.type]。
   * 调用线索：n.init、new EyesPublicApi.ButtonsBlock、new EyesPublicApi.CheckboxBlock、new EyesPublicApi.DescriptionBlock、new EyesPublicApi.HintBlock等。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `this._blocks[t]||console.warn(`Block ${t} is not available`)`；调用 `console.warn`。
   * 调用线索：console.warn。
   */
  getStoryBlock(t) {
    return this._blocks[t] || console.warn(`Block ${t} is not available`);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `i`；调用 `document.createDocumentFragment`、`i.appendChild`、`this.createBlockContent`。
   * 调用线索：document.createDocumentFragment、i.appendChild、this.createBlockContent。
   */
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
  /** @eyes-analysis
   * 【结构证据】写入 `_onEnter[t]`、`_onLeave[t]`；调用 `onEnter`、`onLeave`、`s.push`、`this._onEnter[t].push`、`this._onLeave[t].push`、`this.addSlide`。
   * 状态写入：_onEnter[t]、_onLeave[t]。
   * 调用线索：onEnter、onLeave、s.push、this._onEnter[t].push、this._onLeave[t].push等。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `routerManager.navigate`、`this._app.getManager`。
   * 调用线索：routerManager.navigate、this._app.getManager。
   */
  close() {
    const routerManager = this._app.getManager("router");
    routerManager.navigate(routerManager.homeRoute);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `super.onLeave`、`this._app.getManager`、`this._app.getManager("router").removeQuery`。
   * 调用线索：super.onLeave、this._app.getManager、this._app.getManager("router").removeQuery。
   */
  async onLeave(t) {
    if (await super.onLeave(t), "number" != typeof t) {
      this._app.getManager("router").removeQuery(["slide"]);
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `e.getPropertyValue`、`getComputedStyle`、`parseFloat`、`this._progressTooltip.setProps`。
   * 调用线索：e.getPropertyValue、getComputedStyle、parseFloat、this._progressTooltip.setProps。
   */
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
