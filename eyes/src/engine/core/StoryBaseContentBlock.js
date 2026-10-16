/** @eyes-analysis
 * 文件职责：故事内容块的基础类型和渲染/事件接口。
 * 依据：import ../../framework/eyes/public-api.js；import ../../styles/extracted/StoryBaseContentBlockStyles.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:665677-666695.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import "../../styles/extracted/StoryBaseContentBlockStyles.js";
/** @eyes-analysis
 * 类职责：故事内容块的基础类型和渲染/事件接口。
 * 继承：EyesPublicApi.BaseComponent；导出：StoryBaseContentBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class StoryBaseContentBlock extends EyesPublicApi.BaseComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `onEnter`、`onLeave`；调用 `super`、`this._config.info.onEnter`、`this._config.info.onLeave`、`this.bindFunctions`。
   * 状态写入：onEnter、onLeave。
   * 调用线索：super、this._config.info.onEnter、this._config.info.onLeave、this.bindFunctions。
   */
  constructor(t, e = {
    config: {
      info: {}
    }
  }) {
    e.isVisible = true;
    super(t, null, e);
    this._config.info.onEnter && (this.onEnter = async () => await this._config.info.onEnter(t, this));
    this._config.info.onLeave && (this.onLeave = async () => await this._config.info.onLeave(t, this));
    this.bindFunctions(["onEnter", "onLeave", "onClick"]);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Array.isArray`、`super.init`、`this._element.addEventListener`、`this._element.classList.add`、`this._setVariables`。
   * 调用线索：Array.isArray、super.init、this._element.addEventListener、this._element.classList.add、this._setVariables。
   */
  init() {
    super.init(this._config.info);
    this._element.classList.add("content-block", "{{isVisibleClass}}");
    Array.isArray(this._config.info.classList) && this._element.classList.add(...this._config.info.classList);
    this._setVariables(this._element, false);
    (this._config.info.clickable || this._config.info.func) && (this._element.classList.add("clickable"), this._element.addEventListener("click", this.onClick));
  }
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  async onEnter() {}
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  async onLeave() {}
  /** @eyes-analysis
   * 【结构证据】调用 `this._config.info.func`。
   * 调用线索：this._config.info.func。
   */
  async onClick() {
    const {
      type: type
    } = this._config.info;
    "buttons" !== type && (await this._config.info.func(this._app, this));
  }
}
export { StoryBaseContentBlock };
