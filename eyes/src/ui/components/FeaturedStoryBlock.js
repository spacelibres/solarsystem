/** @eyes-analysis
 * 文件职责：单个精选故事卡片
 * 依据：imports: ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/FeaturedStoryBlockTemplate.html, ../../styles/extracted/FeaturedStoryBlockStyles.js；manager dependencies: content, router
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1438051-1440063.
import "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import FeaturedStoryBlockTemplate from "../templates/FeaturedStoryBlockTemplate.html";
import "../../styles/extracted/FeaturedStoryBlockStyles.js";
var getFeaturedStoryBlockTemplate = () => FeaturedStoryBlockTemplate;
/** @eyes-analysis
 * 类职责：单个精选故事卡片；继承 SolarSystemPublicApi.BaseContentBlock
 * 继承：SolarSystemPublicApi.BaseContentBlock；导出：FeaturedStoryBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class FeaturedStoryBlock extends SolarSystemPublicApi.BaseContentBlock {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；写入 _storyList。
   * 状态写入：_more.isHidden.moreMessage、_storyList。
   * 调用线索：super。
   */
  constructor(t) {
    super(t, null, {
      colorClass: "spacecraft",
      blockTitle: "",
      hideTitle: ""
    });
    this._more.isHidden.moreMessage = "Show More";
    this._storyList = null;
  }
  /** @eyes-analysis
   * 响应路径参数变化并刷新本模块；调用 this.setEnabled, this._app.getManager, List.add, this._storyList.appendChild, this._setVariables, this.setState；写入 _storyList。
   * 状态写入：_storyList、_storyList.innerHTML。
   * 调用线索：_.classList.add、_.setAttribute、d.appendChild、d.classList.add、document.createElement等。
   */
  onRouteChange(t, e, i, s) {
    if (this._storyList = this._children.storyList, null === this._storyList || void 0 === this._storyList) return void this.setEnabled(false);
    if ("home" !== t && void 0 === this._app.getManager("content").context[t]) return;
    this._storyList.innerHTML = "";
    i.forEach(t => {
      const e = document.createElement("li");
      let s = null;
      s = void 0 === t.storyId ? t : i[t.storyId];
      const {
        title: title,
        subtitle: subtitle,
        icon: icon,
        link: link,
        isExternal: isExternal,
        isInternal: isInternal
      } = s;
      const h = document.createElement("div");
      h.classList.add("story-container");
      e.appendChild(h);
      const d = document.createElement("div");
      d.classList.add("story-title");
      const u = document.createElement("h2");
      if (u.appendChild(document.createTextNode(title)), d.appendChild(u), h.appendChild(d), subtitle) {
        const t = document.createElement("div");
        t.classList.add("story-list", "story-subtitle", "wide-text", "color", "{{colorClass}}", "x-small");
        t.appendChild(document.createTextNode(subtitle));
        h.appendChild(t);
      }
      const p = document.createElement("div");
      p.classList.add("story-icon");
      const _ = document.createElement("img");
      const m = `${subtitle}: ${title}`;
      if (_.setAttribute("alt", m), _.setAttribute("src", icon), _.classList.add("story-icon-image"), p.appendChild(_), h.appendChild(p), isExternal) e.addEventListener("click", () => {
        window.open(link);
      }, false);else if (isInternal) e.addEventListener("click", () => {
        this._app.getManager("router").navigate(link);
      }, false);else {
        const i = "story/" + t.id;
        e.addEventListener("click", () => {
          this._app.getManager("router").navigate(i);
        }, false);
      }
      if (isExternal) {
        const t = document.createElement("div");
        t.classList.add("icon", "icon-external");
        h.appendChild(t);
      }
      e.classList.add("clickable");
      this._storyList.appendChild(e);
    });
    const n = "" === e ? "hidden" : "";
    this._setVariables(this._element);
    this.setState({
      blockTitle: e,
      hideTitle: n
    });
  }
}
FeaturedStoryBlock.html = getFeaturedStoryBlockTemplate();
export { FeaturedStoryBlock };
