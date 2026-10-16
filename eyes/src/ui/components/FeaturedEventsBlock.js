// Recovered from app.js:1457724-1459665.
import Unidentified777 from "../../vendor/modules/Unidentified777.cjs";
import "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import FeaturedEventsBlockTemplate from "../templates/FeaturedEventsBlockTemplate.html";
var getUnidentified777 = () => Unidentified777;
var getFeaturedEventsBlockTemplate = () => FeaturedEventsBlockTemplate;
class FeaturedEventsBlock extends SolarSystemPublicApi.BaseContentBlock {
  constructor(t) {
    super(t);
    this._more.isHidden.moreMessage = "Show More";
    this._featuredEventsList = null;
  }
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
