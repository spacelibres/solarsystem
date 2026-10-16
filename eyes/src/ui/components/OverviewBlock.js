// Recovered from app.js:1448321-1451890.
import "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import Unidentified777 from "../../vendor/modules/Unidentified777.cjs";
import OverviewBlockTemplate from "../templates/OverviewBlockTemplate.html";
import "../../styles/extracted/OverviewBlockStyles.js";
import * as Pioneer from "../../engine/pioneer/index.js";
var getUnidentified777 = () => Unidentified777;
var getOverviewBlockTemplate = () => OverviewBlockTemplate;
/* 概览将实体/事件信息与描述日期合并成模板状态；通用模型免责声明取引擎当前模型 URL，返回按钮监听在实体就绪后挂接。 */
class OverviewBlock extends SolarSystemPublicApi.BaseContentBlock {
  constructor(app) {
    super(app, null, {
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
  onRouteChange(targetId, suppliedInfo, entityDescription) {
    this._targetId = targetId;
    let disclaimerClass = "hidden";
    const entityInfo = suppliedInfo ?? this._app.getManager("content").getEntityInfo(targetId);
    let disclaimerText = "";
    ["Asteroid", "Comet", "Moon", "Dwarf Planet"].indexOf(entityInfo.category) >= 0 && this._app.scene.getEntity(targetId).getComponent(Pioneer.ModelComponent)?._url.includes("generic") && (disclaimerText = "This ", disclaimerText += entityInfo.category.toLowerCase(), disclaimerText += " is represented by a generic model.");
    "" !== disclaimerText && (disclaimerClass = "active");
    const {
      title: title,
      subHeadingString: subHeadingString,
      missionStartDate: missionStartDate,
      missionEndDate: missionEndDate
    } = this._determineOverviewContent(targetId, entityInfo, entityDescription);
    const currentTime = this._app.getManager("time").etToMoment(Pioneer.TimeUtils.now());
    const launchTime = this._app.getManager("time").parseTime(missionStartDate);
    const endTime = this._app.getManager("time").parseTime(missionEndDate);
    const isFutureLaunch = launchTime.isAfter(currentTime);
    const categoryShapes = this._app.getManager("content").getCategoryShapeMap();
    const shapeType = categoryShapes[entityInfo.category] ? categoryShapes[entityInfo.category].shape : "circle";
    const shapeColor = categoryShapes[entityInfo.category] ? categoryShapes[entityInfo.category].color : "brown";
    const isEventView = "event" === this._app.getManager("router").currentView;
    let missionDates = `${launchTime.year()} - ${"" !== missionEndDate ? endTime.year() : "Present"}`;
    launchTime.year() === endTime.year() && (missionDates = launchTime.year());
    isFutureLaunch && (missionDates = `Scheduled launch in ${launchTime.year()}`);
    let categoryLabel = entityInfo.category;
    isEventView ? categoryLabel = subHeadingString : entityInfo.title?.toLowerCase().includes("moons") && (categoryLabel = entityDescription);
    this.setState({
      title: title,
      category: categoryLabel,
      shapeType: shapeType,
      shapeColor: shapeColor,
      isShapeVisibleClass: entityInfo.category && !isEventView ? "" : "hidden",
      isCategoryVisibleClass: entityInfo.category ? "" : "hidden",
      isDateVisible: missionStartDate ? "" : "hidden",
      missionDates: missionDates,
      disclaimerClass: disclaimerClass,
      disclaimerMessage: disclaimerText,
      isBackButtonVisible: isEventView ? "" : "hidden"
    });
    this._setVariables(this._element);
    const needsCompactTitle = this._app.getComponent("contentPanel").element.clientWidth - this._children.overviewTitle.clientWidth < 100;
    this._children.overviewTitle.classList.toggle("long-title", needsCompactTitle);
    this._app.pioneer.getScene("main").waitTillEntitiesInPlace([targetId], this._app.pioneer.getTime(), 10).then(() => {
      this._targetId = targetId;
      const backButtons = document.getElementsByClassName("back-button");
      for (const backButton of backButtons) backButton.onclick = this.goBack;
      return true;
    }).catch(loadError => {
      console.warn(loadError);
    });
  }
  _determineOverviewContent(entityId, entityInfo, entityDescription) {
    const title = entityInfo?.displayName || entityInfo?.iauName || entityInfo?.title;
    const subheading = this._getSubheadingForObject(entityId, entityInfo, entityDescription);
    const missionStart = entityDescription?.dates?.start;
    const missionEnd = entityDescription?.dates?.end;
    return {
      title: title,
      subHeadingString: subheading,
      missionStartDate: missionStart,
      missionEndDate: missionEnd
    };
  }
  _getSubheadingForObject(entityId, overviewInfo, entityDescription) {
    const entityInfo = this._app.getManager("content").getEntityInfo(entityId);
    let subheading = "";
    const {
      currentView: currentView
    } = this._app.getManager("router");
    if ("event" === currentView) return getUnidentified777()(overviewInfo.start).format("MMM DD, YYYY");
    if (entityInfo) {
      switch (entityInfo.category) {
        case "Spacecraft":
          {
            let startLabel = "";
            const startTime = getUnidentified777()(overviewInfo.start);
            const currentTime = new (getUnidentified777())();
            if (void 0 === entityDescription.dates || true !== startTime.isValid()) return "";
            startLabel = startTime.year();
            let endLabel = "present";
            true === getUnidentified777()(entityDescription.dates.end).isValid() && (endLabel = getUnidentified777()(entityDescription.dates.end).year());
            startTime.isAfter(currentTime) ? (startTime.month() > -1 && startTime.year() > -1 ? startLabel = startTime.format("MMMM YYYY") : startTime.month() < 0 && startTime.year() > -1 && (startLabel = startTime.year()), subheading = startLabel) : subheading = startLabel + "-" + endLabel;
            break;
          }
        case "Moon":
          {
            const parentInfo = this._app.getManager("content").getEntityInfo(this._app.getManager("scene").get("main").getEntity(entityId).getParent().getName());
            subheading = "Moon of " + (parentInfo.displayName || parentInfo.iauName);
            break;
          }
        default:
          subheading = void 0 !== entityInfo.subcategory ? entityInfo.subcategory : entityInfo.category;
      }
      return subheading;
    }
  }
}
OverviewBlock.html = getOverviewBlockTemplate();
export { OverviewBlock };
