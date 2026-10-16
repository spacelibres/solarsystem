// Recovered from app.js:669611-670544.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import DescriptionBlockTemplate from "../templates/DescriptionBlockTemplate-542.html";
import "../../styles/extracted/DescriptionBlockStyles-543.js";
var getDescriptionBlockTemplate = () => DescriptionBlockTemplate;
/* 故事描述的更多内容由 info.more 决定；_more 保存完整按钮文字、图标和 class 快照，切换时与 isMoreVisible 一并提交。 */
class DescriptionBlock extends EyesPublicApi.StoryBaseContentBlock {
  constructor(app, options = {}) {
    super(app, {
      hasMore: false,
      isMoreVisible: false,
      ...options
    });
    this._class.hasMoreClass = {
      true: "",
      false: "hidden"
    };
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
    Object.assign(this._state, this._more.isHidden, {
      hasMoreClass: this._class.hasMoreClass[this._state.hasMore]
    });
  }
  init() {
    super.init();
    const hasMore = Boolean(this._config.info.more);
    this.setState({
      hasMore: hasMore,
      hasMoreClass: this._class.hasMoreClass[hasMore]
    });
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
DescriptionBlock.html = getDescriptionBlockTemplate();
export { DescriptionBlock };
