// Recovered from app.js:1435197-1435991.
/* 内容块扩展基类状态，更多按钮的文字、图标和可见 class 以两份快照统一切换；init 创建模板后再登记新增的 class 占位符。 */
import * as Eyes from "../../framework/eyes/index.js";
import "../../styles/extracted/BaseContentBlockStyles.js";
class BaseContentBlock extends Eyes.BaseComponent {
  constructor(app, element, options = {}) {
    super(app, element, {
      isVisible: true,
      isMoreVisible: false,
      hideMoreMessage: "",
      ...options
    });
    this._more = {
      isVisible: {
        moreMessage: "Show Less",
        moreIcon: "icon-minus",
        moreClass: ""
      },
      isHidden: {
        moreMessage: "Show More",
        moreIcon: "icon-plus",
        moreClass: "hidden"
      }
    };
    Object.assign(this._state, this._more.isHidden);
  }
  async init() {
    super.init();
    this._element.classList.add("content-block", "{{isVisibleClass}}");
    this._setVariables(this._element);
  }
  showMore() {
    this.setState({
      isMoreVisible: true,
      ...this._more.isVisible
    });
  }
  hideMore() {
    this.setState({
      isMoreVisible: false,
      ...this._more.isHidden
    });
  }
  toggleMore() {
    this._state.isMoreVisible ? this.hideMore() : this.showMore();
  }
}
export { BaseContentBlock };
