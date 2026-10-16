// Recovered from app.js:1422622-1423457.
import * as Eyes from "../../framework/eyes/index.js";
import "../../styles/extracted/MobileExpandButtonStyles-928.js";
import * as animateFill from "../../vendor/modules/animateFill-929.js";
import MobileExpandButtonTemplate from "../templates/MobileExpandButtonTemplate.html";
import "../../styles/extracted/MobileExpandButtonStyles-987.js";
var getMobileExpandButtonTemplate = () => MobileExpandButtonTemplate;
/* 按钮保存当前内容组件名，点击后调用该组件的展开接口并隐藏自身；桌面环境会强制抑制移动展开按钮。 */
class MobileExpandButton extends Eyes.BaseComponent {
  constructor(app) {
    super(app);
    this._component = "";
    this._expandButtonClicked = this._expandButtonClicked.bind(this);
    this.showCPButton = this.showCPButton.bind(this);
    animateFill.default.setDefaultProps({
      theme: "default",
      touch: ["hold", 2e3],
      delay: [600, null],
      plugins: [animateFill.followCursor]
    });
  }
  init() {
    super.init();
    (0, animateFill.default)(this._children.mobileExpandButton, {
      content: "Expand content panel.",
      placement: "top"
    });
  }
  _expandButtonClicked() {
    this._app.getComponent(this._component).onClickShowCollapse();
    this.hide();
  }
  showCPButton(shouldShow, component) {
    Eyes.AppUtils.isMobileMode() || (shouldShow = false);
    this._component = component;
    const visibilityClass = shouldShow ? "" : "hidden";
    this.setState({
      isVisibleClass: visibilityClass
    });
  }
}
MobileExpandButton.html = getMobileExpandButtonTemplate();
export { MobileExpandButton };
