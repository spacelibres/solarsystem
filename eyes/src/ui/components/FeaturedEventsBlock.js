// Recovered from app.js:1457724-1459665.
import Unidentified777 from "../../vendor/modules/Unidentified777.cjs";
import "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import FeaturedEventsBlockTemplate from "../templates/FeaturedEventsBlockTemplate.html";
var getUnidentified777 = () => Unidentified777;
var getFeaturedEventsBlockTemplate = () => FeaturedEventsBlockTemplate;
/* 精选事件引用与事件详情分离：首屏从传入 eventsById 取详情，更多列表按原实现读取全局事件表；每项闭包保留独立事件路径。 */
class FeaturedEventsBlock extends SolarSystemPublicApi.BaseContentBlock {
  constructor(app) {
    super(app);
    this._more.isHidden.moreMessage = "Show More";
    this._featuredEventsList = null;
  }
  async onRouteChange(entityId, entityDescription, eventsById, cancelToken) {
    this._featuredEventsList = this._children.featuredEventsList;
    const featuredEvents = entityDescription.featuredEvents;
    this._featuredEventsList.innerHTML = "";
    featuredEvents.initial.forEach(featuredEvent => {
      const listItem = document.createElement("li");
      const eventInfo = eventsById[featuredEvent.eventId];
      let yearLabel = "";
      getUnidentified777()(eventInfo.start).isValid() && (yearLabel = " (" + getUnidentified777()(eventInfo.start).year() + ")");
      const titleElement = document.createElement("span");
      titleElement.innerHTML = `<span class="semi">${eventInfo.title}</span> ${yearLabel}`;
      listItem.appendChild(titleElement);
      const chevronElement = document.createElement("span");
      chevronElement.classList.add("icon", "icon-greater", "mobile-icon");
      listItem.appendChild(chevronElement);
      const eventRoute = entityId + "/events/" + featuredEvent.eventId;
      listItem.addEventListener("click", () => {
        this._app.getManager("router").navigate(eventRoute);
      }, false);
      listItem.classList.add("featured-events-list-item", "clickable", "underline");
      this._featuredEventsList.appendChild(listItem);
    });
    let hideMoreClass = "hidden";
    void 0 !== featuredEvents.more && featuredEvents.more.length > 0 && (hideMoreClass = "", featuredEvents.more.forEach(featuredEvent => {
      const listItem = document.createElement("li");
      const eventInfo = this._app.getManager("content").events[featuredEvent.eventId];
      let yearLabel = "";
      getUnidentified777()(eventInfo.start).isValid() && (yearLabel = " (" + getUnidentified777()(eventInfo.start).year() + ")");
      const titleElement = document.createElement("span");
      titleElement.innerHTML = `<span class="semi">${eventInfo.title}</span> ${yearLabel}`;
      listItem.appendChild(titleElement);
      const eventRoute = entityId + "/events/" + featuredEvent.eventId;
      listItem.addEventListener("click", () => {
        this._app.getManager("router").navigate(eventRoute);
      }, false);
      listItem.classList.add("featured-events-list-item", "clickable", "underline");
      listItem.classList.add("{{moreClass}}");
      const chevronElement = document.createElement("span");
      chevronElement.classList.add("icon", "icon-greater", "mobile-icon");
      listItem.appendChild(chevronElement);
      this._featuredEventsList.appendChild(listItem);
    }));
    const colorClass = this._app.getManager("content").getColorClass(entityId);
    this._setVariables(this._children.featuredEventsList);
    this.setState({
      colorClass: colorClass,
      hideMoreMessage: hideMoreClass
    });
  }
}
FeaturedEventsBlock.html = getFeaturedEventsBlockTemplate();
export { FeaturedEventsBlock };
