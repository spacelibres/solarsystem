/** @eyes-analysis
 * 文件职责：对象工具入口集合
 * 依据：imports: ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/ToolboxBlockTemplate.html, ../../styles/extracted/ToolboxBlockStyles.js, ../../styles/extracted/MobileExpandButtonStyles-928.js, ../../vendor/modules/animateFill-929.js；manager dependencies: router
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1462838-1464795.
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import ToolboxBlockTemplate from "../templates/ToolboxBlockTemplate.html";
import "../../styles/extracted/ToolboxBlockStyles.js";
import "../../styles/extracted/MobileExpandButtonStyles-928.js";
import * as animateFill from "../../vendor/modules/animateFill-929.js";
var getToolboxBlockTemplate = () => ToolboxBlockTemplate;
/** @eyes-analysis
 * 类职责：对象工具入口集合；继承 SolarSystemPublicApi.BaseContentBlock
 * 继承：SolarSystemPublicApi.BaseContentBlock；导出：ToolboxBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ToolboxBlock extends SolarSystemPublicApi.BaseContentBlock {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet；写入 _state, _isTouch。
   * 状态写入：_isTouch、_state。
   * 调用线索：Eyes.AppUtils.isMobile、Eyes.AppUtils.isTablet、super。
   */
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
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 super.init, this._children.clickableDiv.addEventListener, this._app.getManager, this._closeTooltip。
   * 调用线索：super.init、this._app.getManager、this._app.getManager("router").navigate、this._children.clickableDiv.addEventListener、this._closeTooltip等。
   */
  init() {
    super.init();
    this._children.clickableDiv.addEventListener("click", () => {
      this._app.getManager("router").navigate(...this._state.nav);
    });
    window.addEventListener("contentPanelCollapse", t => {
      t.detail && this._closeTooltip();
    });
  }
  /** @eyes-analysis
   * 源码扩展或访问入口；调用 0,animateFill.default, this._tippy.setContent, this.setState, window.removeEventListener；写入 _tippy。
   * 状态写入：_tippy。
   * 调用线索：0,animateFill.default、this._tippy.setContent、this.setState、window.removeEventListener。
   */
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
  /** @eyes-analysis
   * 执行 _showTooltip 对应的组件业务步骤；调用 this.element.style.setProperty, this._children.tooltipPopup.classList.value.includes, Array.from, List.toggle, this.setState, List.contains, this._closeTooltip。
   * 调用线索：Array.from、Array.from(document.getElementsByClassName("tooltip-popup")).forEach、document.getElementById、document.getElementById("overview-block")?.getBoundingClientRect、document.getElementsByClassName等。
   */
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
  /** @eyes-analysis
   * 执行 _closeTooltip 对应的组件业务步骤；调用 Array.from, List.add, this.setState。
   * 调用线索：Array.from、Array.from(document.getElementsByClassName("tooltip-popup")).forEach、document.getElementsByClassName、t.classList.add、t?.preventDefault等。
   */
  _closeTooltip(t) {
    t?.preventDefault();
    Array.from(document.getElementsByClassName("tooltip-popup")).forEach(t => {
      t.classList.add("hidden");
    });
    this.setState({
      inputTipVisibleClass: "hidden"
    });
  }
  /** @eyes-analysis
   * 重排响应式界面；调用 Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet；写入 _isTouch。
   * 状态写入：_isTouch。
   * 调用线索：Eyes.AppUtils.isMobile、Eyes.AppUtils.isTablet。
   */
  resize() {
    this._isTouch = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTablet();
  }
}
ToolboxBlock.html = getToolboxBlockTemplate();
export { ToolboxBlock };
