/** @eyes-analysis
 * 文件职责：故事内重播按钮
 * 依据：imports: ../../framework/eyes/public-api.js, ../templates/ReplayButtonBlockTemplate.html, ../../styles/extracted/ReplayButtonBlockStyles.js；manager dependencies: router
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:671248-671742.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import ReplayButtonBlockTemplate from "../templates/ReplayButtonBlockTemplate.html";
import "../../styles/extracted/ReplayButtonBlockStyles.js";
var getReplayButtonBlockTemplate = () => ReplayButtonBlockTemplate;
/** @eyes-analysis
 * 类职责：故事内重播按钮；继承 EyesPublicApi.StoryBaseContentBlock
 * 继承：EyesPublicApi.StoryBaseContentBlock；导出：ReplayButtonBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ReplayButtonBlock extends EyesPublicApi.StoryBaseContentBlock {
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 super.init。
   * 状态写入：_config.info.text。
   * 调用线索：super.init。
   */
  init() {
    this._config.info.text || (this._config.info.text = this._config.info.fromStart ? "Restart Story" : "Replay Animation");
    super.init(this._config.info);
  }
  /** @eyes-analysis
   * 执行 onClick 对应的组件业务步骤；调用 this._app.getManager, Manager.navigate, Manager.reload。
   * 调用线索：routerManager.navigate、routerManager.reload、this._app.getManager。
   */
  async onClick() {
    const routerManager = this._app.getManager("router");
    this._config.info.fromStart ? routerManager.navigate(routerManager.currentRoute.url) : routerManager.reload();
  }
}
ReplayButtonBlock.html = getReplayButtonBlockTemplate();
export { ReplayButtonBlock };
