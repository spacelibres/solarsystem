/** @eyes-analysis
 * 文件职责：故事内容中的复选项组
 * 依据：imports: ../../framework/eyes/public-api.js, ../templates/CheckboxBlockTemplate.html, ../../styles/extracted/CheckboxBlockStyles.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:673558-674563.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import CheckboxBlockTemplate from "../templates/CheckboxBlockTemplate.html";
import "../../styles/extracted/CheckboxBlockStyles.js";
var getCheckboxBlockTemplate = () => CheckboxBlockTemplate;
/** @eyes-analysis
 * 类职责：故事内容中的复选项组；继承 EyesPublicApi.StoryBaseContentBlock
 * 继承：EyesPublicApi.StoryBaseContentBlock；导出：CheckboxBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class CheckboxBlock extends EyesPublicApi.StoryBaseContentBlock {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 this.setUpHTML；写入 options。
   * 状态写入：options。
   * 调用线索：console.warn、super、t.pioneer.getScene、t.pioneer.getScene("main").getLoadedPromise、t.pioneer.getScene("main").getLoadedPromise().then等。
   */
  constructor(t, options = {}) {
    super(t, {
      ...options
    });
    t.pioneer.getScene("main").getLoadedPromise().then(() => (this.setUpHTML(options), true)).catch(t => {
      console.warn(t);
    });
    this.options = options;
  }
  /** @eyes-analysis
   * 执行 setUpHTML 对应的组件业务步骤；调用 Content.forEach, List.add。
   * 调用线索：a.classList.add、checkboxContent.forEach、document.createElement、document.createTextNode、document.getElementsByClassName等。
   */
  async setUpHTML(t) {
    const {
      checkboxContent: checkboxContent
    } = t.config.info;
    const i = document.getElementsByClassName("checkboxes-block")[0];
    checkboxContent.forEach(t => {
      const {
        id: id,
        label: label,
        onChange: onChange
      } = t;
      const o = document.createElement("label");
      o.classList.add("cb-container");
      o.classList.add("clickable");
      const r = document.createElement("input");
      r.type = "checkbox";
      r.checked = true;
      r.id = `${id}-checkbox`;
      const a = document.createElement("span");
      a.classList.add("checkmark");
      o.appendChild(document.createTextNode(label));
      o.appendChild(r);
      o.appendChild(a);
      i.appendChild(o);
      r.addEventListener("change", t => {
        onChange(t, this._app);
      });
    });
  }
  /** @eyes-analysis
   * 执行 setChecked 对应的组件业务步骤。
   * 调用线索：document.getElementById。
   */
  setChecked(t, e) {
    const i = document.getElementById(`${t}-checkbox`);
    i && (i.checked = e);
  }
}
CheckboxBlock.html = getCheckboxBlockTemplate();
export { CheckboxBlock };
