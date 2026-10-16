/** @eyes-analysis
 * 文件职责：故事/信息面板内容块的 DOM 生命周期和公共设置基类。
 * 依据：import ../../framework/eyes/index.js；import ../../styles/extracted/BaseContentBlockStyles.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1435197-1435991.
import * as Eyes from "../../framework/eyes/index.js";
import "../../styles/extracted/BaseContentBlockStyles.js";
/** @eyes-analysis
 * 类职责：故事/信息面板内容块的 DOM 生命周期和公共设置基类。
 * 继承：Eyes.BaseComponent；导出：BaseContentBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class BaseContentBlock extends Eyes.BaseComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `_more`；调用 `Object.assign`、`super`。
   * 状态写入：_more。
   * 调用线索：Object.assign、super。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `super.init`、`this._element.classList.add`、`this._setVariables`。
   * 调用线索：super.init、this._element.classList.add、this._setVariables。
   */
  async init() {
    super.init();
    this._element.classList.add("content-block", "{{isVisibleClass}}");
    this._setVariables(this._element);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.setState`。
   * 调用线索：this.setState。
   */
  showMore() {
    this.setState({
      isMoreVisible: true,
      ...this._more.isVisible
    });
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.setState`。
   * 调用线索：this.setState。
   */
  hideMore() {
    this.setState({
      isMoreVisible: false,
      ...this._more.isHidden
    });
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.hideMore`、`this.showMore`。
   * 调用线索：this.hideMore、this.showMore。
   */
  toggleMore() {
    this._state.isMoreVisible ? this.hideMore() : this.showMore();
  }
}
export { BaseContentBlock };
