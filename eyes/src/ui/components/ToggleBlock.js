/** @eyes-analysis
 * 文件职责：故事内开关交互
 * 依据：imports: ../../framework/eyes/public-api.js, ../templates/ToggleBlockTemplate.html, ../../styles/extracted/ToggleBlockStyles.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:667559-668537.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import ToggleBlockTemplate from "../templates/ToggleBlockTemplate.html";
import "../../styles/extracted/ToggleBlockStyles.js";
var getToggleBlockTemplate = () => ToggleBlockTemplate;
/** @eyes-analysis
 * 类职责：故事内开关交互；继承 EyesPublicApi.StoryBaseContentBlock
 * 继承：EyesPublicApi.StoryBaseContentBlock；导出：ToggleBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ToggleBlock extends EyesPublicApi.StoryBaseContentBlock {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 Object.assign。
   * 状态写入：_class.isSelectedClass、_config.info.selected。
   * 调用线索：Boolean、Object.assign、super。
   */
  constructor(t, e = {}) {
    super(t, {
      isSelected: false,
      ...e
    });
    this._class.isSelectedClass = {
      true: "selected",
      false: ""
    };
    this._config.info.selected = Boolean(this._config.info.selected);
    Object.assign(this._state, {
      isSelectedClass: this._class.isSelectedClass[this._state.isSelected]
    });
  }
  /** @eyes-analysis
   * 进入视图时准备界面和订阅；调用 super.onEnter, this.onClick。
   * 调用线索：super.onEnter、this.onClick。
   */
  async onEnter() {
    await super.onEnter();
    this._config.info.selected !== this._state.isSelected && (await this.onClick());
  }
  /** @eyes-analysis
   * 离开视图时恢复状态并解除订阅；调用 super.onLeave, this.onClick。
   * 调用线索：super.onLeave、this.onClick。
   */
  async onLeave() {
    await super.onLeave();
    this._state.isSelected && (await this.onClick());
  }
  /** @eyes-analysis
   * 执行 onClick 对应的组件业务步骤；调用 super.onClick, this.unselect, this.select。
   * 调用线索：console.log、super.onClick、this.select、this.unselect。
   */
  async onClick() {
    await super.onClick();
    this._state.isSelected ? (this.unselect(), console.log("unselect")) : (this.select(), console.log("select"));
  }
  /** @eyes-analysis
   * 执行 select 对应的组件业务步骤；调用 this.setState。
   * 调用线索：this.setState。
   */
  select() {
    this.setState({
      isSelected: true,
      isSelectedClass: this._class.isSelectedClass.true
    });
  }
  /** @eyes-analysis
   * 执行 unselect 对应的组件业务步骤；调用 this.setState。
   * 调用线索：this.setState。
   */
  unselect() {
    this.setState({
      isSelected: false,
      isSelectedClass: this._class.isSelectedClass.false
    });
  }
}
ToggleBlock.html = getToggleBlockTemplate();
export { ToggleBlock };
