// Recovered from app.js:1440435-1446447.
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import EventsBlockTemplate from "../templates/EventsBlockTemplate.html";
import "../../styles/extracted/EventsBlockStyles.js";
var getEventsBlockTemplate = () => EventsBlockTemplate;
class EventsBlock extends SolarSystemPublicApi.BaseContentBlock {
  constructor(app) {
    super(app, null, {});
    this._introMessages = {
      timeline: "Select an event below to learn more.",
      table: "Click or tap an event to start the animation"
    };
    this._currentTab = "timeline";
    this._defaultTab = "timeline";
    this._minEventsForTimeline = 4;
    this.setState({
      isLoadingClass: "hide",
      isViewToggleVisible: "hide",
      isNumEventsVisible: "hide",
      isEventsViewContainerVisible: "hide",
      isIntroLabelVisible: "",
      introLabelText: this._introMessages.timeline,
      sortAscending: false
    });
    this._app = app;
  }
  onRouteChange(t, events, i) {
    this.startLoading();
    i || (this._currentTab = this._defaultTab);
    const {
      timelineContainer: timelineContainer
    } = this._children;
    this._timeline = this._app.getComponent("eventsTimeline");
    this._timeline.setParent(timelineContainer);
    this._app.pioneer.getScene("main").waitTillEntitiesInPlace([t], this._app.pioneer.getTime(), 10).then(async () => {
      this._events = events;
      this._currentEvent = null;
      this._events && i && (this._currentEvent = this._events.find(t => t.id === i.id));
      const {
        currentView: currentView
      } = this._app.getManager("router");
      const n = "event" === currentView;
      this._numEvents = Object.keys(this._events).length;
      this.setState({
        numEvents: this._numEvents
      });
      const o = document.getElementsByClassName("sort-triangle")[0];
      if (o && o.classList.remove("rotated"), n && i && this._currentEvent) {
        const s = {
          id: t,
          title: i.title,
          dates: [this._currentEvent.start, this._currentEvent.end],
          orderedEvents: events
        };
        this._timeline.setTarget(s);
      }
      this.selectTab(this._numEvents > this._minEventsForTimeline ? this._currentTab : "table");
      this.stopLoading();
      return true;
    }).catch(t => {
      console.warn(t);
    });
  }
  startLoading() {
    const {
      tableContainer: tableContainer
    } = this._children;
    this.showContainer(tableContainer, false);
    this._timeline?.hide();
    this.setState({
      isLoadingClass: "loading",
      isViewToggleVisible: "hide",
      isEventsViewContainerVisible: "hide",
      isNumEventsVisible: "hidden",
      introLabelText: "Loading events..."
    });
  }
  stopLoading() {
    const t = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTablet();
    const e = this._numEvents > this._minEventsForTimeline;
    this.setState({
      isLoadingClass: "hide",
      isViewToggleVisible: e ? "" : "hide",
      isNumEventsVisible: t ? "hidden" : "",
      isEventsViewContainerVisible: "",
      introLabelText: this._introMessages[this._currentTab]
    });
    e && this.selectTab(this._currentTab);
  }
  _onTabSelect(t) {
    let e = t.target;
    e.classList.contains("toggle-title") || (e = Array.from(t.target.children).find(t => t.classList.contains("toggle-title")));
    const i = Array.from(t.target.parentElement.children).find(t => "" !== t.innerHTML);
    const s = e?.innerHTML ?? i.innerHTML;
    this.selectTab(s);
  }
  selectTab(t) {
    const currentTab = t.toLowerCase();
    const i = Array.from(this._children.toggleContainer?.children);
    i?.forEach(t => {
      t.classList.contains("tab") && t.classList.toggle("selected", t.lastChild.innerText.toLowerCase() === currentTab);
    });
    this._currentTab = currentTab;
    this.setState({
      introLabelText: `${this._introMessages[currentTab]}`
    });
    "timeline" === currentTab ? this.showTimeline() : this.showTable();
  }
  showTimeline() {
    const {
      timelineContainer: timelineContainer,
      tableContainer: tableContainer
    } = this._children;
    this.showContainer(timelineContainer);
    this.showContainer(tableContainer, false);
    this.setState({
      isIntroLabelVisible: ""
    });
    this._timeline.checkForZoom(this._currentEvent);
    this._timeline.show();
  }
  showTable() {
    const {
      timelineContainer: timelineContainer,
      tableContainer: tableContainer
    } = this._children;
    this.showContainer(timelineContainer, false);
    this._timeline.hide();
    this.populateTable();
    this.showContainer(tableContainer);
    (Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTablet()) && this.setState({
      isIntroLabelVisible: "hidden"
    });
  }
  resetScrollbar() {
    this._children.tableContainer.scrollTop = 0;
  }
  populateTable() {
    const {
      eventsTable: eventsTable
    } = this._children;
    eventsTable.innerHTML = "";
    Object.values(this._events).forEach(e => {
      const i = document.createElement("tr");
      i.classList.add("clickable", "event-row");
      const s = document.createElement("td");
      const n = e.title;
      s.appendChild(document.createTextNode(n));
      s.classList.add("event-title");
      i.appendChild(s);
      const o = document.createElement("td");
      const r = this._app.getManager("time").parseTime(e.start);
      o.appendChild(document.createTextNode(r.year()));
      i.appendChild(o);
      const a = document.createElement("td");
      const l = this._app.getManager("content").getEntityInfo(e.target);
      const c = l?.displayName || l?.iauName;
      a.appendChild(document.createTextNode(c || "None"));
      i.appendChild(a);
      eventsTable.appendChild(i);
      i.onclick = this.rowClick;
      const {
        currentView: currentView,
        currentRoute: currentRoute
      } = this._app.getManager("router");
      if ("event" === currentView) {
        const t = currentRoute.params.child;
        i.classList.toggle("highlight", t === e.id);
      }
    });
  }
  sortEventsByTitle = () => {
    this.sortTable("title");
    this.populateTable();
    this.rotateSortTriangle("title");
    this.resetScrollbar();
  };
  sortEventsByYear = () => {
    this.sortTable("start");
    this.populateTable();
    this.rotateSortTriangle("year");
    this.resetScrollbar();
  };
  sortEventsByTarget = () => {
    this.sortTable("target");
    this.populateTable();
    this.rotateSortTriangle("target");
    this.resetScrollbar();
  };
  rotateSortTriangle(t) {
    Array.from(document.getElementsByClassName("sort-triangle")).find(e => e.classList.contains(t)).classList.toggle("rotated");
  }
  sortTable(t) {
    const contentManager = this._app.getManager("content");
    this.setState({
      sortAscending: !this.getState("sortAscending")
    });
    this._events = Object.values(this._events).sort((i, s) => {
      let {
        [`${t}`]: n
      } = i;
      let {
        [`${t}`]: o
      } = s;
      "start" === t && ("string" != typeof n && (n = n.format("MMM DD, YYYY")), "string" != typeof o && (o = o.format("MMM DD, YYYY")));
      n && o ? ("target" === t && (n = contentManager.getEntityInfo(n).displayName || contentManager.getEntityInfo(n).iauName, o = contentManager.getEntityInfo(o).displayName || contentManager.getEntityInfo(o).iauName), "start" === t && (n = new Date(n).toISOString(), o = new Date(o).toISOString())) : (n = n || "None", o = o || "None");
      return this.getState("sortAscending") ? n.localeCompare(o) : o.localeCompare(n);
    });
  }
  showContainer(t, e = true) {
    t.classList.toggle("hide", !e);
  }
  rowClick = async t => {
    const e = t.target.parentElement;
    const i = Array.from(e.children).find(t => t.classList.contains("event-title")).innerHTML;
    const s = Object.values(this._events).find(t => t.title === i);
    this._timeline.goToEvent(s.id);
  };
  resize() {
    super.resize();
    const t = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTablet();
    this.setState({
      isNumEventsVisible: t ? "hidden" : ""
    });
    "table" === this._currentTab && this.setState({
      isIntroLabelVisible: t || Eyes.AppUtils.isLandscape() ? "hidden" : ""
    });
    this._events && Object.keys(this._events).length > this._minEventsForTimeline && this._timeline.show();
  }
}
EventsBlock.html = getEventsBlockTemplate();
export { EventsBlock };
