// Recovered from app.js:1462838-1464795.
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import ToolboxBlockTemplate from "../templates/ToolboxBlockTemplate.html";
import "../../styles/extracted/ToolboxBlockStyles.js";
import "../../styles/extracted/MobileExpandButtonStyles-928.js";
import * as animateFill from "../../vendor/modules/animateFill-929.js";
var getToolboxBlockTemplate = () => ToolboxBlockTemplate;
class ToolboxBlock extends SolarSystemPublicApi.BaseContentBlock {
  constructor(t, e = {}) {
    super(t, null, {
      isVisible: true,
      iconClass: "",
      title: "",
      tooltipText: "",
      ...e
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
    window.addEventListener("contentPanelCollapse", t => {
      t.detail && this._closeTooltip();
    });
  }
  onRouteChange({
    entityId: entityId,
    link: link,
    query: i = {},
    options: s = {
      __remove: "all"
    },
    updatedTitle: n = "",
    tooltipText: o = this._state.tooltipText
  }) {
    const r = `/${entityId}${link}`;
    this.setState({
      nav: [i, r, s],
      title: n || this._state.title,
      tooltipText: o
    });
    this._tippy || (this._tippy = (0, animateFill.default)(this._children.tooltipIcon, {
      content: this._state.tooltipText,
      delay: 50
    }));
    this._tippy.setContent(this._state.tooltipText);
    window.removeEventListener("click", this._closeTooltip);
  }
  _showTooltip(t) {
    if (!this._isTouch) return;
    const e = document.getElementById("overview-block")?.getBoundingClientRect()?.height;
    this.element.style.setProperty("--tooltip-top-margin", `${e}px`);
    const i = this._children.tooltipPopup.classList.value.includes("hidden");
    Array.from(document.getElementsByClassName("tooltip-popup")).forEach(e => {
      e.classList.toggle("hidden", e.nextElementSibling !== t.target);
    });
    this.setState({
      inputTipVisibleClass: i ? "" : "hidden"
    });
    window.addEventListener("click", t => {
      t.target.classList.contains("tooltip") || this._closeTooltip();
    });
  }
  _closeTooltip(t) {
    t?.preventDefault();
    Array.from(document.getElementsByClassName("tooltip-popup")).forEach(t => {
      t.classList.add("hidden");
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
