/** @eyes-analysis
 * 文件职责：故事内容中的动作按钮组
 * 依据：imports: ../../framework/eyes/public-api.js, ../templates/ButtonsBlockTemplate.html, ../../styles/extracted/ButtonsBlockStyles.js；manager dependencies: time, content
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:671990-673409.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import ButtonsBlockTemplate from "../templates/ButtonsBlockTemplate.html";
import "../../styles/extracted/ButtonsBlockStyles.js";
var getButtonsBlockTemplate = () => ButtonsBlockTemplate;
/** @eyes-analysis
 * 类职责：故事内容中的动作按钮组；继承 EyesPublicApi.StoryBaseContentBlock
 * 继承：EyesPublicApi.StoryBaseContentBlock；导出：ButtonsBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ButtonsBlock extends EyesPublicApi.StoryBaseContentBlock {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 this.setUpHTML；写入 _app, _options。
   * 状态写入：_app、_options。
   * 调用线索：app.pioneer.getScene、app.pioneer.getScene("main").getLoadedPromise、app.pioneer.getScene("main").getLoadedPromise().then、app.pioneer.getScene("main").getLoadedPromise().then(()=>(this.setUpHTML(options),true)).catch、console.warn等。
   */
  constructor(app, options = {}) {
    super(app, {
      ...options
    });
    this._app = app;
    this._options = options;
    app.pioneer.getScene("main").getLoadedPromise().then(() => (this.setUpHTML(options), true)).catch(t => {
      console.warn(t);
    });
  }
  /** @eyes-analysis
   * 执行 setUpHTML 对应的组件业务步骤；调用 Content.forEach, List.add。
   * 调用线索：a.classList.add、buttonContent.forEach、document.createElement、document.createTextNode、document.getElementsByClassName等。
   */
  async setUpHTML(t) {
    const {
      buttonContent: buttonContent
    } = t.config.info;
    const i = document.getElementsByClassName("buttons-block");
    buttonContent.forEach((t, e) => {
      const {
        id: id,
        iconSrc: iconSrc,
        label: label
      } = t;
      const r = document.createElement("button");
      i[0].appendChild(r);
      r.classList.add("clickable");
      r.classList.add("custom-button");
      r.classList.add(`${id}`);
      0 === e && r.classList.add("focused");
      const a = document.createElement("img");
      r.appendChild(a);
      a.classList.add("button-icon");
      a.src = iconSrc;
      const l = document.createTextNode(label);
      r.appendChild(l);
      r.onclick = this.buttonClick;
    });
  }
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 调用线索：Object.values、Object.values(buttonContent).find、document.querySelectorAll、document.querySelectorAll(".custom-button").forEach、s.onClick等。
   */
  buttonClick = async t => {
    const {
      buttonContent: buttonContent
    } = this._options.config.info;
    const timeManager = this._app.getManager("time");
    const s = Object.values(buttonContent).find(e => t.target.classList.contains(e.id));
    document.querySelectorAll(".custom-button").forEach(t => t.classList.remove("focused"));
    s.timeLimits ? (timeManager.setMin(s.timeLimits.min), timeManager.setMax(s.timeLimits.max)) : timeManager.resetLimits();
    const {
      _id: _id
    } = this._app.getComponent("story");
    const o = this._app.getManager("content").getStory(_id).slides[0].time;
    timeManager.setTime(s.startTime ?? o);
    timeManager.setTimeRate(300);
    t.target.classList.add("focused");
    s.onClick(this._app);
  };
}
ButtonsBlock.html = getButtonsBlockTemplate();
export { ButtonsBlock };
