/** @eyes-analysis
 * 文件职责：移动端展开目标内容面板的按钮
 * 依据：imports: ../../framework/eyes/index.js, ../../styles/extracted/MobileExpandButtonStyles-928.js, ../../vendor/modules/animateFill-929.js, ../templates/MobileExpandButtonTemplate.html, ../../styles/extracted/MobileExpandButtonStyles-987.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1422622-1423457.
import * as Eyes from "../../framework/eyes/index.js";
import "../../styles/extracted/MobileExpandButtonStyles-928.js";
import * as animateFill from "../../vendor/modules/animateFill-929.js";
import MobileExpandButtonTemplate from "../templates/MobileExpandButtonTemplate.html";
import "../../styles/extracted/MobileExpandButtonStyles-987.js";
var getMobileExpandButtonTemplate = () => MobileExpandButtonTemplate;
/** @eyes-analysis
 * 类职责：移动端展开目标内容面板的按钮；继承 Eyes.BaseComponent
 * 继承：Eyes.BaseComponent；导出：MobileExpandButton。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class MobileExpandButton extends Eyes.BaseComponent {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 this._expandButtonClicked.bind, this.showCPButton.bind, Fill.default.setDefaultProps；写入 _component, _expandButtonClicked, showCPButton。
   * 状态写入：_component、_expandButtonClicked、showCPButton。
   * 调用线索：animateFill.default.setDefaultProps、super、this._expandButtonClicked.bind、this.showCPButton.bind。
   */
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
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 super.init。
   * 调用线索：0,animateFill.default、super.init。
   */
  init() {
    super.init();
    (0, animateFill.default)(this._children.mobileExpandButton, {
      content: "Expand content panel.",
      placement: "top"
    });
  }
  /** @eyes-analysis
   * 执行 _expandButtonClicked 对应的组件业务步骤；调用 this._app.getComponent, this.hide。
   * 调用线索：this._app.getComponent、this._app.getComponent(this._component).onClickShowCollapse、this.hide。
   */
  _expandButtonClicked() {
    this._app.getComponent(this._component).onClickShowCollapse();
    this.hide();
  }
  /** @eyes-analysis
   * 执行 showCPButton 对应的组件业务步骤；调用 Eyes.AppUtils.isMobileMode, this.setState；写入 _component。
   * 状态写入：_component。
   * 调用线索：Eyes.AppUtils.isMobileMode、this.setState。
   */
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
