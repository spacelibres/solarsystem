/** @eyes-analysis
 * 文件职责：故事标题内容块
 * 依据：imports: ../../framework/eyes/public-api.js, ../templates/TitleBlockTemplate.html
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:668705-668890.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import TitleBlockTemplate from "../templates/TitleBlockTemplate.html";
var getTitleBlockTemplate = () => TitleBlockTemplate;
/** @eyes-analysis
 * 类职责：故事标题内容块；继承 EyesPublicApi.StoryBaseContentBlock
 * 继承：EyesPublicApi.StoryBaseContentBlock；导出：TitleBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class TitleBlock extends EyesPublicApi.StoryBaseContentBlock {}
TitleBlock.html = getTitleBlockTemplate();
export { TitleBlock };
