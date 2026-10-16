/** @eyes-analysis
 * 文件职责：故事图像与说明内容
 * 依据：imports: ../../framework/eyes/public-api.js, ../templates/ImageBlockTemplate.html, ../../styles/extracted/ImageBlockStyles.js；component dependencies: overlay
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:669028-669417.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import ImageBlockTemplate from "../templates/ImageBlockTemplate.html";
import "../../styles/extracted/ImageBlockStyles.js";
var getImageBlockTemplate = () => ImageBlockTemplate;
/** @eyes-analysis
 * 类职责：故事图像与说明内容；继承 EyesPublicApi.StoryBaseContentBlock
 * 继承：EyesPublicApi.StoryBaseContentBlock；导出：ImageBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ImageBlock extends EyesPublicApi.StoryBaseContentBlock {
  /** @eyes-analysis
   * 执行 onClick 对应的组件业务步骤；调用 this._element.cloneNode, List.add, List.remove, this._app.getComponent。
   * 调用线索：t.classList.add、t.classList.remove、this._app.getComponent、this._app.getComponent("overlay").setContent、this._app.getComponent("overlay").show等。
   */
  onClick() {
    const t = this._element.cloneNode(true);
    t.classList.add("fullscreen");
    t.classList.remove("clickable");
    this._app.getComponent("overlay").setContent(t);
    this._app.getComponent("overlay").show();
  }
}
ImageBlock.html = getImageBlockTemplate();
export { ImageBlock };
