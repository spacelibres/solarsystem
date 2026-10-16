// Recovered from app.js:1440435-1446447.
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import EventsBlockTemplate from "../templates/EventsBlockTemplate.html";
import "../../styles/extracted/EventsBlockStyles.js";
var getEventsBlockTemplate = () => EventsBlockTemplate;
/* 此块在表格与共享 eventsTimeline 间切换；共享时间线重新挂到本块容器。实体就绪后才提交事件集合和选择，排序会替换本块的事件数组但不修改目录事件对象。 */
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
  onRouteChange(entityId, events, selectedEvent) {
    this.startLoading();
    selectedEvent || (this._currentTab = this._defaultTab);
    const {
      timelineContainer: timelineContainer
    } = this._children;
    this._timeline = this._app.getComponent("eventsTimeline");
    this._timeline.setParent(timelineContainer);
    this._app.pioneer.getScene("main").waitTillEntitiesInPlace([entityId], this._app.pioneer.getTime(), 10).then(async () => {
      this._events = events;
      this._currentEvent = null;
      this._events && selectedEvent && (this._currentEvent = this._events.find(eventEntry => eventEntry.id === selectedEvent.id));
      const {
        currentView: currentView
      } = this._app.getManager("router");
      const isEventView = "event" === currentView;
      this._numEvents = Object.keys(this._events).length;
      this.setState({
        numEvents: this._numEvents
      });
      const sortTriangle = document.getElementsByClassName("sort-triangle")[0];
      if (sortTriangle && sortTriangle.classList.remove("rotated"), isEventView && selectedEvent && this._currentEvent) {
        const timelineTarget = {
          id: entityId,
          title: selectedEvent.title,
          dates: [this._currentEvent.start, this._currentEvent.end],
          orderedEvents: events
        };
        this._timeline.setTarget(timelineTarget);
      }
      this.selectTab(this._numEvents > this._minEventsForTimeline ? this._currentTab : "table");
      this.stopLoading();
      return true;
    }).catch(loadError => {
      console.warn(loadError);
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
    const isCompact = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTablet();
    const hasTimeline = this._numEvents > this._minEventsForTimeline;
    this.setState({
      isLoadingClass: "hide",
      isViewToggleVisible: hasTimeline ? "" : "hide",
      isNumEventsVisible: isCompact ? "hidden" : "",
      isEventsViewContainerVisible: "",
      introLabelText: this._introMessages[this._currentTab]
    });
    hasTimeline && this.selectTab(this._currentTab);
  }
  _onTabSelect(clickEvent) {
    let titleElement = clickEvent.target;
    titleElement.classList.contains("toggle-title") || (titleElement = Array.from(clickEvent.target.children).find(childElement => childElement.classList.contains("toggle-title")));
    const fallbackTitleElement = Array.from(clickEvent.target.parentElement.children).find(siblingElement => "" !== siblingElement.innerHTML);
    const selectedTab = titleElement?.innerHTML ?? fallbackTitleElement.innerHTML;
    this.selectTab(selectedTab);
  }
  selectTab(tabName) {
    const currentTab = tabName.toLowerCase();
    const tabElements = Array.from(this._children.toggleContainer?.children);
    tabElements?.forEach(tabElement => {
      tabElement.classList.contains("tab") && tabElement.classList.toggle("selected", tabElement.lastChild.innerText.toLowerCase() === currentTab);
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
    Object.values(this._events).forEach(eventInfo => {
      const tableRow = document.createElement("tr");
      tableRow.classList.add("clickable", "event-row");
      const titleCell = document.createElement("td");
      const eventTitle = eventInfo.title;
      titleCell.appendChild(document.createTextNode(eventTitle));
      titleCell.classList.add("event-title");
      tableRow.appendChild(titleCell);
      const yearCell = document.createElement("td");
      const startTime = this._app.getManager("time").parseTime(eventInfo.start);
      yearCell.appendChild(document.createTextNode(startTime.year()));
      tableRow.appendChild(yearCell);
      const targetCell = document.createElement("td");
      const targetInfo = this._app.getManager("content").getEntityInfo(eventInfo.target);
      const targetTitle = targetInfo?.displayName || targetInfo?.iauName;
      targetCell.appendChild(document.createTextNode(targetTitle || "None"));
      tableRow.appendChild(targetCell);
      eventsTable.appendChild(tableRow);
      tableRow.onclick = this.rowClick;
      const {
        currentView: currentView,
        currentRoute: currentRoute
      } = this._app.getManager("router");
      if ("event" === currentView) {
        const selectedEventId = currentRoute.params.child;
        tableRow.classList.toggle("highlight", selectedEventId === eventInfo.id);
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
  rotateSortTriangle(sortField) {
    Array.from(document.getElementsByClassName("sort-triangle")).find(triangleElement => triangleElement.classList.contains(sortField)).classList.toggle("rotated");
  }
  sortTable(sortField) {
    const contentManager = this._app.getManager("content");
    this.setState({
      sortAscending: !this.getState("sortAscending")
    });
    this._events = Object.values(this._events).sort((leftEvent, rightEvent) => {
      let {
        [`${sortField}`]: leftValue
      } = leftEvent;
      let {
        [`${sortField}`]: rightValue
      } = rightEvent;
      "start" === sortField && ("string" != typeof leftValue && (leftValue = leftValue.format("MMM DD, YYYY")), "string" != typeof rightValue && (rightValue = rightValue.format("MMM DD, YYYY")));
      leftValue && rightValue ? ("target" === sortField && (leftValue = contentManager.getEntityInfo(leftValue).displayName || contentManager.getEntityInfo(leftValue).iauName, rightValue = contentManager.getEntityInfo(rightValue).displayName || contentManager.getEntityInfo(rightValue).iauName), "start" === sortField && (leftValue = new Date(leftValue).toISOString(), rightValue = new Date(rightValue).toISOString())) : (leftValue = leftValue || "None", rightValue = rightValue || "None");
      return this.getState("sortAscending") ? leftValue.localeCompare(rightValue) : rightValue.localeCompare(leftValue);
    });
  }
  showContainer(container, isVisible = true) {
    container.classList.toggle("hide", !isVisible);
  }
  rowClick = async clickEvent => {
    const tableRow = clickEvent.target.parentElement;
    const eventTitle = Array.from(tableRow.children).find(cellElement => cellElement.classList.contains("event-title")).innerHTML;
    const selectedEvent = Object.values(this._events).find(eventInfo => eventInfo.title === eventTitle);
    this._timeline.goToEvent(selectedEvent.id);
  };
  resize() {
    super.resize();
    const isCompact = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTablet();
    this.setState({
      isNumEventsVisible: isCompact ? "hidden" : ""
    });
    "table" === this._currentTab && this.setState({
      isIntroLabelVisible: isCompact || Eyes.AppUtils.isLandscape() ? "hidden" : ""
    });
    this._events && Object.keys(this._events).length > this._minEventsForTimeline && this._timeline.show();
  }
}
EventsBlock.html = getEventsBlockTemplate();
export { EventsBlock };
