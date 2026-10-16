/** @eyes-analysis
 * 文件职责：故事提示内容
 * 依据：imports: ../../framework/eyes/public-api.js, ../templates/HintBlockTemplate.html, ../../styles/extracted/HintBlockStyles.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:666733-667255.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import HintBlockTemplate from "../templates/HintBlockTemplate.html";
import "../../styles/extracted/HintBlockStyles.js";
var getHintBlockTemplate = () => HintBlockTemplate;
/** @eyes-analysis
 * 类职责：故事提示内容；继承 EyesPublicApi.StoryBaseContentBlock
 * 继承：EyesPublicApi.StoryBaseContentBlock；导出：HintBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class HintBlock extends EyesPublicApi.StoryBaseContentBlock {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 Object.assign。
   * 调用线索：Object.assign、super。
   */
  constructor(t, e = {}) {
    super(t, {
      iconBefore: "icon-greater",
      iconAfter: "icon-greater",
      ...e
    });
    Object.assign(this._state, {
      text: this._config.info.text || "Scroll to continue",
      isIconBeforeVisibleClass: this._class.isVisible[this._config.info.iconBeforeText || false],
      isIconAfterVisibleClass: this._class.isVisible[this._config.info.iconAfterText || false]
    });
  }
}
HintBlock.html = getHintBlockTemplate();
export { HintBlock };
