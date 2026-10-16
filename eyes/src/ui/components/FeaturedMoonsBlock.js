/** @eyes-analysis
 * 文件职责：精选卫星内容块
 * 依据：imports: ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/FeaturedMoonsBlockTemplate.html；manager dependencies: router
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1455580-1457214.
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import FeaturedMoonsBlockTemplate from "../templates/FeaturedMoonsBlockTemplate.html";
var getFeaturedMoonsBlockTemplate = () => FeaturedMoonsBlockTemplate;
/** @eyes-analysis
 * 类职责：精选卫星内容块；继承 SolarSystemPublicApi.BaseContentBlock
 * 继承：SolarSystemPublicApi.BaseContentBlock；导出：FeaturedMoonsBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class FeaturedMoonsBlock extends SolarSystemPublicApi.BaseContentBlock {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 this.resize。
   * 调用线索：super、this.resize。
   */
  constructor(...t) {
    super(...t);
    this.resize();
  }
  /** @eyes-analysis
   * 重排响应式界面；调用 super.resize, Eyes.AppUtils.isMobile, Eyes.AppUtils.isTabletPortrait, this.setState。
   * 调用线索：Eyes.AppUtils.isMobile、Eyes.AppUtils.isTabletPortrait、super.resize、this.setState。
   */
  resize() {
    super.resize();
    const t = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTabletPortrait();
    this.setState({
      showTitleLabel: t ? "hidden" : ""
    });
  }
  /** @eyes-analysis
   * 响应路径参数变化并刷新本模块；调用 this.hideMore, this._element.classList.remove, Array.isArray, this.setState, this._createListElement, this._children.featuredMoonsList.appendChild, List.add, this.setEnabled, this._setVariables。
   * 状态写入：_children.featuredMoonsList.innerHTML。
   * 调用线索：Array.isArray、e.classList.add、e.initial.forEach、e.more.forEach、this._children.featuredMoonsList.appendChild等。
   */
  async onRouteChange(t, e, i) {
    i && i.isCanceled || (this.hideMore(), this._children.featuredMoonsList.innerHTML = "", void 0 !== e.initial && 0 !== e.initial.length ? (this._element.classList.remove("hidden"), Array.isArray(e.more) && 0 !== e.more.length ? this.setState({
      hideMoreMessage: ""
    }) : this.setState({
      hideMoreMessage: "hidden"
    }), e.initial.forEach(t => {
      if (i && i.isCanceled) return;
      const e = this._createListElement(t);
      this._children.featuredMoonsList.appendChild(e);
    }), e.more.forEach(t => {
      if (i && i.isCanceled) return;
      const e = this._createListElement(t);
      e.classList.add("hidden", "{{moreClass}}", "hover-background");
      this._children.featuredMoonsList.appendChild(e);
    })) : this.setEnabled(false), this._setVariables(this._element));
  }
  /** @eyes-analysis
   * 执行 _createListElement 对应的组件业务步骤；调用 this._app.getManager, List.add。
   * 调用线索：document.createElement、document.createTextNode、e.addEventListener、e.appendChild、e.classList.add等。
   */
  _createListElement(t) {
    const e = document.createElement("li");
    const i = t.info ? `${t.title} (${t.info})` : t.title;
    e.appendChild(document.createTextNode(i));
    e.addEventListener("click", () => {
      this._app.getManager("router").navigate(t.url);
    }, false);
    e.classList.add("clickable", "hover-background");
    const s = document.createElement("span");
    s.classList.add("icon", "icon-greater", "mobile-icon");
    e.appendChild(s);
    e.style.paddingLeft = "1.25em";
    e.style.paddingRight = "1.25em";
    e.style.paddingTop = "0.5em";
    e.style.paddingBottom = "0.5em";
    e.style.justifyContent = "space-between";
    return e;
  }
}
FeaturedMoonsBlock.html = getFeaturedMoonsBlockTemplate();
export { FeaturedMoonsBlock };
