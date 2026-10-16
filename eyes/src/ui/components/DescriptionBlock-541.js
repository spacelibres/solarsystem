// Recovered from app.js:669611-670544.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import DescriptionBlockTemplate from "../templates/DescriptionBlockTemplate-542.html";
import "../../styles/extracted/DescriptionBlockStyles-543.js";
var getDescriptionBlockTemplate = () => DescriptionBlockTemplate;
class DescriptionBlock extends EyesPublicApi.StoryBaseContentBlock {
  constructor(t, e = {}) {
    super(t, {
      hasMore: false,
      isMoreVisible: false,
      ...e
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
    const t = Boolean(this._config.info.more);
    this.setState({
      hasMore: t,
      hasMoreClass: this._class.hasMoreClass[t]
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
