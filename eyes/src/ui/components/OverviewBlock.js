/** @eyes-analysis
 * 文件职责：对象概览内容块
 * 依据：imports: ../../framework/eyes/index.js, ../../app/public-api.js, ../../vendor/modules/Unidentified777.cjs, ../templates/OverviewBlockTemplate.html, ../../styles/extracted/OverviewBlockStyles.js, ../../engine/pioneer/index.js；manager dependencies: router, content, time, scene
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1448321-1451890.
import "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import Unidentified777 from "../../vendor/modules/Unidentified777.cjs";
import OverviewBlockTemplate from "../templates/OverviewBlockTemplate.html";
import "../../styles/extracted/OverviewBlockStyles.js";
import * as Pioneer from "../../engine/pioneer/index.js";
var getUnidentified777 = () => Unidentified777;
var getOverviewBlockTemplate = () => OverviewBlockTemplate;
/** @eyes-analysis
 * 类职责：对象概览内容块；继承 SolarSystemPublicApi.BaseContentBlock
 * 继承：SolarSystemPublicApi.BaseContentBlock；导出：OverviewBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class OverviewBlock extends SolarSystemPublicApi.BaseContentBlock {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 this.setState, this.bindFunctions。
   * 状态写入：_more.isHidden.moreMessage。
   * 调用线索：super、this.bindFunctions、this.setState。
   */
  constructor(t) {
    super(t, null, {
      objectType: "",
      objectDescription: "",
      moreDescription: "",
      disclaimerClass: "hidden",
      disclaimerMessage: ""
    });
    this.setState({
      category: "",
      shapeType: "circle",
      shapeColor: "blue",
      isShapeVisibleClass: "hidden",
      isCategoryVisibleClass: "hidden",
      isDateVisible: "hidden",
      isBackButtonVisible: "hidden",
      time: ""
    });
    this._more.isHidden.moreMessage = "Read More";
    this.bindFunctions(["goBack"]);
  }
  /** @eyes-analysis
   * 执行 goBack 对应的组件业务步骤；调用 this._app.getManager, this._app.getComponent, Manager.navigate。
   * 调用线索：routerManager.navigate、this._app.getComponent、this._app.getComponent("contentPanel").selectTab、this._app.getManager。
   */
  goBack() {
    const routerManager = this._app.getManager("router");
    this._app.getComponent("contentPanel").selectTab("info");
    routerManager.navigate(this._targetId);
  }
  /** @eyes-analysis
   * 响应路径参数变化并刷新本模块；调用 this._app.getManager, this._app.scene.getEntity, this._determineOverviewContent, Pioneer.TimeUtils.now, this.setState, this._setVariables, this._app.getComponent, this._children.overviewTitle.classList.toggle, this._app.pioneer.getScene, this._app.pioneer.getTime；写入 _targetId。
   * 状态写入：_targetId。
   * 调用线索：Pioneer.TimeUtils.now、["Asteroid","Comet","Moon","Dwarf Planet"].indexOf、console.warn、document.getElementsByClassName、n.category.toLowerCase等。
   */
  onRouteChange(targetId, e, i) {
    this._targetId = targetId;
    let s = "hidden";
    const n = e ?? this._app.getManager("content").getEntityInfo(targetId);
    let o = "";
    ["Asteroid", "Comet", "Moon", "Dwarf Planet"].indexOf(n.category) >= 0 && this._app.scene.getEntity(targetId).getComponent(Pioneer.ModelComponent)?._url.includes("generic") && (o = "This ", o += n.category.toLowerCase(), o += " is represented by a generic model.");
    "" !== o && (s = "active");
    const {
      title: title,
      subHeadingString: subHeadingString,
      missionStartDate: missionStartDate,
      missionEndDate: missionEndDate
    } = this._determineOverviewContent(targetId, n, i);
    const d = this._app.getManager("time").etToMoment(Pioneer.TimeUtils.now());
    const u = this._app.getManager("time").parseTime(missionStartDate);
    const p = this._app.getManager("time").parseTime(missionEndDate);
    const _ = u.isAfter(d);
    const m = this._app.getManager("content").getCategoryShapeMap();
    const g = m[n.category] ? m[n.category].shape : "circle";
    const y = m[n.category] ? m[n.category].color : "brown";
    const f = "event" === this._app.getManager("router").currentView;
    let T = `${u.year()} - ${"" !== missionEndDate ? p.year() : "Present"}`;
    u.year() === p.year() && (T = u.year());
    _ && (T = `Scheduled launch in ${u.year()}`);
    let b = n.category;
    f ? b = subHeadingString : n.title?.toLowerCase().includes("moons") && (b = i);
    this.setState({
      title: title,
      category: b,
      shapeType: g,
      shapeColor: y,
      isShapeVisibleClass: n.category && !f ? "" : "hidden",
      isCategoryVisibleClass: n.category ? "" : "hidden",
      isDateVisible: missionStartDate ? "" : "hidden",
      missionDates: T,
      disclaimerClass: s,
      disclaimerMessage: o,
      isBackButtonVisible: f ? "" : "hidden"
    });
    this._setVariables(this._element);
    const E = this._app.getComponent("contentPanel").element.clientWidth - this._children.overviewTitle.clientWidth < 100;
    this._children.overviewTitle.classList.toggle("long-title", E);
    this._app.pioneer.getScene("main").waitTillEntitiesInPlace([targetId], this._app.pioneer.getTime(), 10).then(() => {
      this._targetId = targetId;
      const e = document.getElementsByClassName("back-button");
      for (const t of e) t.onclick = this.goBack;
      return true;
    }).catch(t => {
      console.warn(t);
    });
  }
  /** @eyes-analysis
   * 执行 _determineOverviewContent 对应的组件业务步骤；调用 this._getSubheadingForObject。
   * 调用线索：this._getSubheadingForObject。
   */
  _determineOverviewContent(t, e, i) {
    const s = e?.displayName || e?.iauName || e?.title;
    const n = this._getSubheadingForObject(t, e, i);
    const o = i?.dates?.start;
    const r = i?.dates?.end;
    return {
      title: s,
      subHeadingString: n,
      missionStartDate: o,
      missionEndDate: r
    };
  }
  /** @eyes-analysis
   * 执行 _getSubheadingForObject 对应的组件业务步骤；调用 this._app.getManager。
   * 调用线索：getUnidentified777、getUnidentified777()、getUnidentified777()(e.start).format、getUnidentified777()(i.dates.end).isValid、getUnidentified777()(i.dates.end).year等。
   */
  _getSubheadingForObject(t, e, i) {
    const s = this._app.getManager("content").getEntityInfo(t);
    let n = "";
    const {
      currentView: currentView
    } = this._app.getManager("router");
    if ("event" === currentView) return getUnidentified777()(e.start).format("MMM DD, YYYY");
    if (s) {
      switch (s.category) {
        case "Spacecraft":
          {
            let t = "";
            const s = getUnidentified777()(e.start);
            const r = new (getUnidentified777())();
            if (void 0 === i.dates || true !== s.isValid()) return "";
            t = s.year();
            let a = "present";
            true === getUnidentified777()(i.dates.end).isValid() && (a = getUnidentified777()(i.dates.end).year());
            s.isAfter(r) ? (s.month() > -1 && s.year() > -1 ? t = s.format("MMMM YYYY") : s.month() < 0 && s.year() > -1 && (t = s.year()), n = t) : n = t + "-" + a;
            break;
          }
        case "Moon":
          {
            const e = this._app.getManager("content").getEntityInfo(this._app.getManager("scene").get("main").getEntity(t).getParent().getName());
            n = "Moon of " + (e.displayName || e.iauName);
            break;
          }
        default:
          n = void 0 !== s.subcategory ? s.subcategory : s.category;
      }
      return n;
    }
  }
}
OverviewBlock.html = getOverviewBlockTemplate();
export { OverviewBlock };
