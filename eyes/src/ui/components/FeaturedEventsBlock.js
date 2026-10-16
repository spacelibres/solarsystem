/** @eyes-analysis
 * 文件职责：精选事件卡片内容块
 * 依据：imports: ../../vendor/modules/Unidentified777.cjs, ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/FeaturedEventsBlockTemplate.html；manager dependencies: router, content
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1457724-1459665.
import Unidentified777 from "../../vendor/modules/Unidentified777.cjs";
import "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import FeaturedEventsBlockTemplate from "../templates/FeaturedEventsBlockTemplate.html";
var getUnidentified777 = () => Unidentified777;
var getFeaturedEventsBlockTemplate = () => FeaturedEventsBlockTemplate;
/** @eyes-analysis
 * 类职责：精选事件卡片内容块；继承 SolarSystemPublicApi.BaseContentBlock
 * 继承：SolarSystemPublicApi.BaseContentBlock；导出：FeaturedEventsBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class FeaturedEventsBlock extends SolarSystemPublicApi.BaseContentBlock {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；写入 _featuredEventsList。
   * 状态写入：_featuredEventsList、_more.isHidden.moreMessage。
   * 调用线索：super。
   */
  constructor(t) {
    super(t);
    this._more.isHidden.moreMessage = "Show More";
    this._featuredEventsList = null;
  }
  /** @eyes-analysis
   * 响应路径参数变化并刷新本模块；调用 List.add, this._app.getManager, this._featuredEventsList.appendChild, this._setVariables, this.setState；写入 _featuredEventsList。
   * 状态写入：_featuredEventsList、_featuredEventsList.innerHTML。
   * 调用线索：document.createElement、getUnidentified777、getUnidentified777()、getUnidentified777()(o.start).isValid、getUnidentified777()(o.start).year等。
   */
  async onRouteChange(t, e, i, s) {
    this._featuredEventsList = this._children.featuredEventsList;
    const o = e.featuredEvents;
    this._featuredEventsList.innerHTML = "";
    o.initial.forEach(e => {
      const s = document.createElement("li");
      const o = i[e.eventId];
      let r = "";
      getUnidentified777()(o.start).isValid() && (r = " (" + getUnidentified777()(o.start).year() + ")");
      const a = document.createElement("span");
      a.innerHTML = `<span class="semi">${o.title}</span> ${r}`;
      s.appendChild(a);
      const l = document.createElement("span");
      l.classList.add("icon", "icon-greater", "mobile-icon");
      s.appendChild(l);
      const c = t + "/events/" + e.eventId;
      s.addEventListener("click", () => {
        this._app.getManager("router").navigate(c);
      }, false);
      s.classList.add("featured-events-list-item", "clickable", "underline");
      this._featuredEventsList.appendChild(s);
    });
    let r = "hidden";
    void 0 !== o.more && o.more.length > 0 && (r = "", o.more.forEach(e => {
      const i = document.createElement("li");
      const s = this._app.getManager("content").events[e.eventId];
      let o = "";
      getUnidentified777()(s.start).isValid() && (o = " (" + getUnidentified777()(s.start).year() + ")");
      const r = document.createElement("span");
      r.innerHTML = `<span class="semi">${s.title}</span> ${o}`;
      i.appendChild(r);
      const a = t + "/events/" + e.eventId;
      i.addEventListener("click", () => {
        this._app.getManager("router").navigate(a);
      }, false);
      i.classList.add("featured-events-list-item", "clickable", "underline");
      i.classList.add("{{moreClass}}");
      const l = document.createElement("span");
      l.classList.add("icon", "icon-greater", "mobile-icon");
      i.appendChild(l);
      this._featuredEventsList.appendChild(i);
    }));
    const a = this._app.getManager("content").getColorClass(t);
    this._setVariables(this._children.featuredEventsList);
    this.setState({
      colorClass: a,
      hideMoreMessage: r
    });
  }
}
FeaturedEventsBlock.html = getFeaturedEventsBlockTemplate();
export { FeaturedEventsBlock };
