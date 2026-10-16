/** @eyes-analysis
 * 文件职责：对象探索入口内容块
 * 依据：imports: ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/ExplorationBlockTemplate.html；manager dependencies: content, router
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1460277-1462258.
import "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import ExplorationBlockTemplate from "../templates/ExplorationBlockTemplate.html";
var getExplorationBlockTemplate = () => ExplorationBlockTemplate;
/** @eyes-analysis
 * 类职责：对象探索入口内容块；继承 SolarSystemPublicApi.BaseContentBlock
 * 继承：SolarSystemPublicApi.BaseContentBlock；导出：ExplorationBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ExplorationBlock extends SolarSystemPublicApi.BaseContentBlock {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；写入 _explorationList。
   * 状态写入：_explorationList。
   * 调用线索：super。
   */
  constructor(t) {
    super(t);
    this._explorationList = null;
  }
  /** @eyes-analysis
   * 响应路径参数变化并刷新本模块；调用 this.setEnabled, this.setState, this._app.getManager, this._element.classList.remove, List.add, this._explorationList.appendChild, this._setVariables；写入 _explorationList。
   * 状态写入：_explorationList、_explorationList.innerHTML。
   * 调用线索：console.log、document.createElement、e.addEventListener、e.appendChild、e.classList.add等。
   */
  async onRouteChange(t, e, i) {
    if (null === this._children.explorationList || void 0 === this._children.explorationList) {
      console.log("explorationList is null or undefined!!!");
      return void this.setEnabled(false);
    }
    this._explorationList = this._children.explorationList;
    this.setState({
      colorClass: this._app.getManager("content").getColorClass(t)
    });
    this._explorationList.innerHTML = "";
    void 0 !== e && 0 !== e.initial.length ? (this._element.classList.remove("hidden"), null === e.more || void 0 === e.more || e.more.length <= 0 ? this.setState({
      hideMoreMessage: "hidden"
    }) : this.setState({
      hideMoreMessage: ""
    }), e.initial.forEach(t => {
      const e = document.createElement("li");
      const i = document.createElement("span");
      i.innerHTML = t.info ? `<span class="semi">${t.title}</span> (${t.info})` : `<span class="semi">${t.title}</span>`;
      e.appendChild(i);
      e.addEventListener("click", () => {
        this._app.getManager("router").navigate(t.url);
      }, false);
      e.classList.add("exploration-list-item", "underline");
      e.classList.add("clickable");
      const s = document.createElement("span");
      s.classList.add("icon", "icon-greater", "mobile-icon");
      e.appendChild(s);
      this._explorationList.appendChild(e);
    }), e.more.forEach(t => {
      const e = document.createElement("li");
      const i = document.createElement("span");
      i.innerHTML = t.info ? `<span class="semi">${t.title}</span> (${t.info})` : `<span class="semi">${t.title}</span>`;
      e.appendChild(i);
      e.addEventListener("click", () => {
        this._app.getManager("router").navigate(t.url);
      }, false);
      e.classList.add("exploration-list-item");
      e.classList.add("clickable");
      e.classList.add("hidden");
      this._explorationList.appendChild(e);
      e.classList.add("clickable", "{{moreClass}}", "underline");
    })) : this.setEnabled(false);
    this.setState({
      colorClass: this._app.getManager("content").getColorClass(t)
    });
    this._setVariables(this._element);
  }
}
ExplorationBlock.html = getExplorationBlockTemplate();
export { ExplorationBlock };
