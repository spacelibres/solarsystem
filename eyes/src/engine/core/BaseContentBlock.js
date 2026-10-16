// Recovered from app.js:1435197-1435991.
import * as Eyes from "../../framework/eyes/index.js";
import "../../styles/extracted/BaseContentBlockStyles.js";
class BaseContentBlock extends Eyes.BaseComponent {
  constructor(t, e, i = {}) {
    super(t, e, {
      isVisible: true,
      isMoreVisible: false,
      hideMoreMessage: "",
      ...i
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
