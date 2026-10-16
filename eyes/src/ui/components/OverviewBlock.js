// Recovered from app.js:1448321-1451890.
import "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import Unidentified777 from "../../vendor/modules/Unidentified777.cjs";
import OverviewBlockTemplate from "../templates/OverviewBlockTemplate.html";
import "../../styles/extracted/OverviewBlockStyles.js";
import * as Pioneer from "../../engine/pioneer/index.js";
var getUnidentified777 = () => Unidentified777;
var getOverviewBlockTemplate = () => OverviewBlockTemplate;
class OverviewBlock extends SolarSystemPublicApi.BaseContentBlock {
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
  goBack() {
    const routerManager = this._app.getManager("router");
    this._app.getComponent("contentPanel").selectTab("info");
    routerManager.navigate(this._targetId);
  }
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
