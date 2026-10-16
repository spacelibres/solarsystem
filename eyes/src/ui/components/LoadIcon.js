/** @eyes-analysis
 * 文件职责：加载指示器显示与隐藏
 * 依据：imports: ../../framework/eyes/public-api.js, ../templates/LoadIconTemplate.html；manager dependencies: scene
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:573118-573470.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import LoadIconTemplate from "../templates/LoadIconTemplate.html";
let defaultExport;
var getLoadIconTemplate = () => LoadIconTemplate;
/** @eyes-analysis
 * 类职责：加载指示器显示与隐藏；继承 EyesPublicApi.BaseComponent
 * 继承：EyesPublicApi.BaseComponent；导出：default。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class LoadIcon extends EyesPublicApi.BaseComponent {
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 super.init, this._callbackRegistry.push, this._app.getManager, this.hide。
   * 调用线索：super.init、this._app.getManager、this._callbackRegistry.push、this.hide。
   */
  init() {
    super.init();
    this._callbackRegistry.push({
      emitter: this._app.getManager("scene"),
      event: "loading",
      callback: this.show
    }, {
      emitter: this._app.getManager("scene"),
      event: "loaded",
      callback: this.hide
    });
    this.hide();
  }
}
LoadIcon.html = getLoadIconTemplate();
defaultExport = LoadIcon;
export { defaultExport as default };
