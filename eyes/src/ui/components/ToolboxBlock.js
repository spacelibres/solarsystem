// Recovered from app.js:1462838-1464795.
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import ToolboxBlockTemplate from "../templates/ToolboxBlockTemplate.html";
import "../../styles/extracted/ToolboxBlockStyles.js";
import "../../styles/extracted/MobileExpandButtonStyles-928.js";
import * as animateFill from "../../vendor/modules/animateFill-929.js";
var getToolboxBlockTemplate = () => ToolboxBlockTemplate;
/* 导航参数数组由此块保存并交给 router 展开调用；桌面提示交给 tippy，触摸端另用 DOM 弹层及外部点击关闭逻辑。 */
class ToolboxBlock extends SolarSystemPublicApi.BaseContentBlock {
  constructor(app, options = {}) {
    super(app, null, {
      isVisible: true,
      iconClass: "",
      title: "",
      tooltipText: "",
      ...options
    });
    this._state = {
      ...this._state,
      isVisibleClass: this._class.isVisible[this._state.isVisible],
      inputTipVisibleClass: "hidden",
      nav: []
    };
    this._isTouch = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTablet();
  }
  init() {
    super.init();
    this._children.clickableDiv.addEventListener("click", () => {
      this._app.getManager("router").navigate(...this._state.nav);
    });
    window.addEventListener("contentPanelCollapse", collapseEvent => {
      collapseEvent.detail && this._closeTooltip();
    });
  }
  onRouteChange({
    entityId: entityId,
    link: link,
    query: queryParams = {},
    options: navigationOptions = {
      __remove: "all"
    },
    updatedTitle = "",
    tooltipText = this._state.tooltipText
  }) {
    const targetRoute = `/${entityId}${link}`;
    this.setState({
      nav: [queryParams, targetRoute, navigationOptions],
      title: updatedTitle || this._state.title,
      tooltipText: tooltipText
    });
    this._tippy || (this._tippy = (0, animateFill.default)(this._children.tooltipIcon, {
      content: this._state.tooltipText,
      delay: 50
    }));
    this._tippy.setContent(this._state.tooltipText);
    window.removeEventListener("click", this._closeTooltip);
  }
  _showTooltip(clickEvent) {
    if (!this._isTouch) return;
    const overviewHeight = document.getElementById("overview-block")?.getBoundingClientRect()?.height;
    this.element.style.setProperty("--tooltip-top-margin", `${overviewHeight}px`);
    const isTooltipHidden = this._children.tooltipPopup.classList.value.includes("hidden");
    Array.from(document.getElementsByClassName("tooltip-popup")).forEach(popupElement => {
      popupElement.classList.toggle("hidden", popupElement.nextElementSibling !== clickEvent.target);
    });
    this.setState({
      inputTipVisibleClass: isTooltipHidden ? "" : "hidden"
    });
    window.addEventListener("click", outsideClickEvent => {
      outsideClickEvent.target.classList.contains("tooltip") || this._closeTooltip();
    });
  }
  _closeTooltip(clickEvent) {
    clickEvent?.preventDefault();
    Array.from(document.getElementsByClassName("tooltip-popup")).forEach(popupElement => {
      popupElement.classList.add("hidden");
    });
    this.setState({
      inputTipVisibleClass: "hidden"
    });
  }
  resize() {
    this._isTouch = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTablet();
  }
}
ToolboxBlock.html = getToolboxBlockTemplate();
export { ToolboxBlock };
