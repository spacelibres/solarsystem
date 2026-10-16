// Recovered from app.js:1422622-1423457.
import * as Eyes from "../../framework/eyes/index.js";
import "../../styles/extracted/MobileExpandButtonStyles-928.js";
import * as animateFill from "../../vendor/modules/animateFill-929.js";
import MobileExpandButtonTemplate from "../templates/MobileExpandButtonTemplate.html";
import "../../styles/extracted/MobileExpandButtonStyles-987.js";
var getMobileExpandButtonTemplate = () => MobileExpandButtonTemplate;
class MobileExpandButton extends Eyes.BaseComponent {
  constructor(t) {
    super(t);
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
  showCPButton(t, component) {
    Eyes.AppUtils.isMobileMode() || (t = false);
    this._component = component;
    const i = t ? "" : "hidden";
    this.setState({
      isVisibleClass: i
    });
  }
}
MobileExpandButton.html = getMobileExpandButtonTemplate();
export { MobileExpandButton };
