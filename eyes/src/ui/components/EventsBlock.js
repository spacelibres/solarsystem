/** @eyes-analysis
 * 文件职责：对象事件列表内容块
 * 依据：imports: ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/EventsBlockTemplate.html, ../../styles/extracted/EventsBlockStyles.js；manager dependencies: router, time, content
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1440435-1446447.
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import EventsBlockTemplate from "../templates/EventsBlockTemplate.html";
import "../../styles/extracted/EventsBlockStyles.js";
var getEventsBlockTemplate = () => EventsBlockTemplate;
/** @eyes-analysis
 * 类职责：对象事件列表内容块；继承 SolarSystemPublicApi.BaseContentBlock
 * 继承：SolarSystemPublicApi.BaseContentBlock；导出：EventsBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class EventsBlock extends SolarSystemPublicApi.BaseContentBlock {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 this.setState；写入 _introMessages, _currentTab, _defaultTab, _minEventsForTimeline, _app。
   * 状态写入：_app、_currentTab、_defaultTab、_introMessages、_minEventsForTimeline。
   * 调用线索：super、this.setState。
   */
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
  /** @eyes-analysis
   * 响应路径参数变化并刷新本模块；调用 this.startLoading, this._app.getComponent, this._timeline.setParent, this._app.pioneer.getScene, this._app.pioneer.getTime, this._events.find, this._app.getManager, Object.keys, this.setState, List.remove, this._timeline.setTarget, this.selectTab, this.stopLoading；写入 _currentTab, _timeline, _events, _currentEvent, _numEvents。
   * 状态写入：_currentEvent、_currentTab、_events、_numEvents、_timeline。
   * 调用线索：Object.keys、console.warn、document.getElementsByClassName、o.classList.remove、this._app.getComponent等。
   */
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
  /** @eyes-analysis
   * 执行 startLoading 对应的组件业务步骤；调用 this.showContainer, this.setState。
   * 调用线索：this._timeline?.hide、this.setState、this.showContainer。
   */
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
  /** @eyes-analysis
   * 执行 stopLoading 对应的组件业务步骤；调用 Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet, this.setState, this.selectTab。
   * 调用线索：Eyes.AppUtils.isMobile、Eyes.AppUtils.isTablet、this.selectTab、this.setState。
   */
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
  /** @eyes-analysis
   * 执行 _onTabSelect 对应的组件业务步骤；调用 List.contains, Array.from, this.selectTab。
   * 调用线索：Array.from、Array.from(t.target.children).find、Array.from(t.target.parentElement.children).find、e.classList.contains、t.classList.contains等。
   */
  _onTabSelect(t) {
    let e = t.target;
    e.classList.contains("toggle-title") || (e = Array.from(t.target.children).find(t => t.classList.contains("toggle-title")));
    const i = Array.from(t.target.parentElement.children).find(t => "" !== t.innerHTML);
    const s = e?.innerHTML ?? i.innerHTML;
    this.selectTab(s);
  }
  /** @eyes-analysis
   * 执行 selectTab 对应的组件业务步骤；调用 Array.from, List.contains, List.toggle, Child.innerText.toLowerCase, this.setState, this.showTimeline, this.showTable；写入 _currentTab。
   * 状态写入：_currentTab。
   * 调用线索：Array.from、i?.forEach、t.classList.contains、t.classList.toggle、t.lastChild.innerText.toLowerCase等。
   */
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
  /** @eyes-analysis
   * 执行 showTimeline 对应的组件业务步骤；调用 this.showContainer, this.setState, this._timeline.checkForZoom, this._timeline.show。
   * 调用线索：this._timeline.checkForZoom、this._timeline.show、this.setState、this.showContainer。
   */
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
  /** @eyes-analysis
   * 执行 showTable 对应的组件业务步骤；调用 this.showContainer, this._timeline.hide, this.populateTable, Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet, this.setState。
   * 调用线索：Eyes.AppUtils.isMobile、Eyes.AppUtils.isTablet、this._timeline.hide、this.populateTable、this.setState等。
   */
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
  /** @eyes-analysis
   * 执行 resetScrollbar 对应的组件业务步骤。
   * 状态写入：_children.tableContainer.scrollTop。
   */
  resetScrollbar() {
    this._children.tableContainer.scrollTop = 0;
  }
  /** @eyes-analysis
   * 执行 populateTable 对应的组件业务步骤；调用 Object.values, List.add, this._app.getManager, Table.appendChild, List.toggle。
   * 调用线索：Object.values、Object.values(this._events).forEach、a.appendChild、document.createElement、document.createTextNode等。
   */
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
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 调用线索：this.populateTable、this.resetScrollbar、this.rotateSortTriangle、this.sortTable。
   */
  sortEventsByTitle = () => {
    this.sortTable("title");
    this.populateTable();
    this.rotateSortTriangle("title");
    this.resetScrollbar();
  };
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 调用线索：this.populateTable、this.resetScrollbar、this.rotateSortTriangle、this.sortTable。
   */
  sortEventsByYear = () => {
    this.sortTable("start");
    this.populateTable();
    this.rotateSortTriangle("year");
    this.resetScrollbar();
  };
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 调用线索：this.populateTable、this.resetScrollbar、this.rotateSortTriangle、this.sortTable。
   */
  sortEventsByTarget = () => {
    this.sortTable("target");
    this.populateTable();
    this.rotateSortTriangle("target");
    this.resetScrollbar();
  };
  /** @eyes-analysis
   * 执行 rotateSortTriangle 对应的组件业务步骤；调用 Array.from, List.contains, List.toggle。
   * 调用线索：Array.from、Array.from(document.getElementsByClassName("sort-triangle")).find、Array.from(document.getElementsByClassName("sort-triangle")).find(e=>e.classList.contains(t)).classList.toggle、document.getElementsByClassName、e.classList.contains。
   */
  rotateSortTriangle(t) {
    Array.from(document.getElementsByClassName("sort-triangle")).find(e => e.classList.contains(t)).classList.toggle("rotated");
  }
  /** @eyes-analysis
   * 执行 sortTable 对应的组件业务步骤；调用 this._app.getManager, this.setState, this.getState, Object.values, Manager.getEntityInfo；写入 _events。
   * 状态写入：_events。
   * 调用线索：Object.values、Object.values(this._events).sort、contentManager.getEntityInfo、n.format、n.localeCompare等。
   */
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
  /** @eyes-analysis
   * 执行 showContainer 对应的组件业务步骤；调用 List.toggle。
   * 调用线索：t.classList.toggle。
   */
  showContainer(t, e = true) {
    t.classList.toggle("hide", !e);
  }
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 调用线索：Array.from、Array.from(e.children).find、Object.values、Object.values(this._events).find、t.classList.contains等。
   */
  rowClick = async t => {
    const e = t.target.parentElement;
    const i = Array.from(e.children).find(t => t.classList.contains("event-title")).innerHTML;
    const s = Object.values(this._events).find(t => t.title === i);
    this._timeline.goToEvent(s.id);
  };
  /** @eyes-analysis
   * 重排响应式界面；调用 super.resize, Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet, this.setState, Eyes.AppUtils.isLandscape, Object.keys, this._timeline.show。
   * 调用线索：Eyes.AppUtils.isLandscape、Eyes.AppUtils.isMobile、Eyes.AppUtils.isTablet、Object.keys、super.resize等。
   */
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
