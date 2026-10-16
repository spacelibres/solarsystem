/** @eyes-analysis
 * 文件职责：对象事件重播控件
 * 依据：imports: ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/ReplayBlockTemplate.html, ../../styles/extracted/ReplayBlockStyles.js；manager dependencies: time, content
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1478935-1482401.
import "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import ReplayBlockTemplate from "../templates/ReplayBlockTemplate.html";
import "../../styles/extracted/ReplayBlockStyles.js";
var getReplayBlockTemplate = () => ReplayBlockTemplate;
/** @eyes-analysis
 * 类职责：对象事件重播控件；继承 SolarSystemPublicApi.BaseContentBlock
 * 继承：SolarSystemPublicApi.BaseContentBlock；导出：ReplayBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ReplayBlock extends SolarSystemPublicApi.BaseContentBlock {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 this.bindFunctions；写入 _app, _isPlaying。
   * 状态写入：_app、_isPlaying。
   * 调用线索：super、this.bindFunctions。
   */
  constructor(app) {
    super(app, null, {
      hideNextEventButton: "",
      dateText: "",
      timeText: "",
      playIconClass: "pause-icon-solid",
      isPrevBtnActive: "",
      isNextBtnActive: "",
      timeLimit: null
    });
    this._app = app;
    this._isPlaying = {
      true: "pause-icon-solid",
      false: "play-icon-solid",
      replay: "replay-icon-solid"
    };
    this.bindFunctions(["_onSliderMove", "update", "_playEvent"]);
  }
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 super.init, this._callbackRegistry.push, this._app.getManager。
   * 调用线索：super.init、this._app.getManager、this._callbackRegistry.push。
   */
  init() {
    super.init();
    this._callbackRegistry.push({
      emitter: this._app.getManager("time"),
      event: "update",
      callback: this.update
    });
  }
  /** @eyes-analysis
   * 响应路径参数变化并刷新本模块；调用 this._app.getManager, Events.findIndex, Manager.getTime, Manager.getDateFormat, this.setState, this.app.getComponent, ReplayClockComponent.show, ReplayClockComponent.setEnabled, ReplayClockComponent.setParent, this._app.getComponent, InputRange.addEventListener, this._app.pioneer.getTimeRate；写入 _objectId, _eventStartTime, _eventEndTime, _currentEvent, _prevEventId, _nextEventId。
   * 状态写入：_currentEvent、_eventEndTime、_eventStartTime、_nextEventId、_objectId、_prevEventId。
   * 调用线索：eventInputRange.addEventListener、eventsReplayClockComponent.setEnabled、eventsReplayClockComponent.setParent、eventsReplayClockComponent.show、new Date等。
   */
  onRouteChange(objectId, e, i, s, n) {
    if (n && n.isCanceled) return;
    const timeManager = this._app.getManager("time");
    this._objectId = objectId;
    this._eventStartTime = new Date(i.start);
    this._eventEndTime = new Date(i.end);
    const r = this._app.getManager("content").orderedEvents.findIndex(t => t.id === e);
    this._currentEvent = s[r];
    const a = r < 0 || r === s.length - 1;
    this._prevEventId = 0 === r ? null : s[r - 1].id;
    this._nextEventId = a ? null : s[r + 1].id;
    const l = timeManager.getTime().format("ll");
    const c = timeManager.getTime().format(timeManager.getDateFormat("time"));
    this.setState({
      dateText: l,
      timeText: c,
      isPrevBtnActive: null === this._prevEventId ? "disable" : "",
      isNextBtnActive: null === this._nextEventId ? "disable" : ""
    });
    const eventsReplayClockComponent = this.app.getComponent("eventsReplayClock");
    eventsReplayClockComponent.show();
    eventsReplayClockComponent.setEnabled(true);
    eventsReplayClockComponent.setParent(this._children.clockContainer);
    this._app.getComponent("clockShortcut").hide();
    const {
      eventInputRange: eventInputRange
    } = this._children;
    eventInputRange.value = 0;
    eventInputRange.addEventListener("input", this._onSliderMove);
    eventInputRange.addEventListener("mouseup", this._playEvent);
    eventInputRange.addEventListener("touchend", this._playEvent);
    this.setState({
      playIconClass: this._isPlaying[this._app.pioneer.getTimeRate() > 0]
    });
  }
  /** @eyes-analysis
   * 执行 _addTimeToDate 对应的组件业务步骤。
   * 调用线索：date.getMilliseconds、date.setMilliseconds、new Date。
   */
  _addTimeToDate(t) {
    const date = new Date(this._eventStartTime);
    let i = date.getMilliseconds();
    i += t;
    date.setMilliseconds(i);
    return date;
  }
  /** @eyes-analysis
   * 执行 _onSliderMove 对应的组件业务步骤；调用 this._addTimeToDate, this._app.getManager, this.setState。
   * 调用线索：Number、this._addTimeToDate、this._app.getManager、this._app.getManager("time").parseTime、this._app.getManager("time").parseTime(i).format等。
   */
  _onSliderMove(t) {
    const e = this._eventEndTime - this._eventStartTime;
    const i = this._addTimeToDate(e * (t.target.value / 100));
    const s = this._app.getManager("time").parseTime(i).format("ll");
    this.setState({
      dateText: s
    });
    Number(t.target.value) >= 0 && this._app.getManager("time").setTime(i);
  }
  /** @eyes-analysis
   * 执行 update 对应的组件业务步骤；调用 this.setState, this._app.getManager, this._app.pioneer.getTimeRate；写入 _isAtEnd。
   * 状态写入：_isAtEnd。
   * 调用线索：isNaN、new Date、t.format、this._app.getManager、this._app.getManager("time").getDateFormat等。
   */
  update(t) {
    this.setState({
      dateText: t.format(this._app.getManager("time").getDateFormat("date"))
    });
    const {
      eventInputRange: eventInputRange
    } = this._children;
    const i = this._app.getManager("time").parseTime(this._eventStartTime);
    const s = (t - i) / (this._app.getManager("time").parseTime(this._eventEndTime) - i) * 100;
    isNaN(s) || (eventInputRange.value = s);
    const date = new Date(t);
    this._eventEndTime - date < 100 ? (this._app.getManager("time").pause(), this._isAtEnd = true, this.setState({
      playIconClass: this._isPlaying.replay
    })) : (this._isAtEnd = false, this.setState({
      playIconClass: this._isPlaying[0 !== this._app.pioneer.getTimeRate()]
    }));
  }
  /** @eyes-analysis
   * 执行 setUpEventTimeControls 对应的组件业务步骤；调用 this._app.getComponent, ReplayTimeControlsComponent.setState, ReplayTimeControlsComponent.show, ReplayTimeControlsComponent.element.classList.add, ReplayTimeControlsComponent.setCanUpdate, ReplayTimeControlsComponent.setEnabled, ReplayTimeControlsComponent.setParent。
   * 调用线索：eventReplayTimeControlsComponent.element.classList.add、eventReplayTimeControlsComponent.setCanUpdate、eventReplayTimeControlsComponent.setEnabled、eventReplayTimeControlsComponent.setParent、eventReplayTimeControlsComponent.setState等。
   */
  setUpEventTimeControls() {
    const eventReplayTimeControlsComponent = this._app.getComponent("eventReplayTimeControls");
    eventReplayTimeControlsComponent.setState({
      isRateControlsVisible: "hidden",
      currentEvent: this._currentEvent
    });
    eventReplayTimeControlsComponent.show();
    eventReplayTimeControlsComponent.element.classList.add("event-time-controls");
    eventReplayTimeControlsComponent.setCanUpdate(true);
    eventReplayTimeControlsComponent.setEnabled(true);
    eventReplayTimeControlsComponent.setParent(this._children.eventsSliderContainer);
  }
  /** @eyes-analysis
   * 执行 prevButtonClicked 对应的组件业务步骤；调用 this._app.getComponent。
   * 调用线索：this._app.getComponent、this._app.getComponent("eventsTimeline").goToEvent。
   */
  prevButtonClicked() {
    this._app.getComponent("eventsTimeline").goToEvent(this._prevEventId);
  }
  /** @eyes-analysis
   * 执行 nextButtonClicked 对应的组件业务步骤；调用 this._app.getComponent。
   * 调用线索：this._app.getComponent、this._app.getComponent("eventsTimeline").goToEvent。
   */
  nextButtonClicked() {
    this._app.getComponent("eventsTimeline").goToEvent(this._nextEventId);
  }
  /** @eyes-analysis
   * 执行 _pauseEvent 对应的组件业务步骤；调用 this.setState, this._app.getManager。
   * 调用线索：this._app.getManager、this._app.getManager("time").pause、this.setState。
   */
  _pauseEvent() {
    this.setState({
      playIconClass: this._isPlaying[false]
    });
    this._app.getManager("time").pause();
  }
  /** @eyes-analysis
   * 执行 _playEvent 对应的组件业务步骤；调用 this.setState, this._app.getManager。
   * 调用线索：this._app.getManager、this._app.getManager("time").play、this.setState。
   */
  _playEvent() {
    this.setState({
      playIconClass: this._isPlaying[true]
    });
    this._app.getManager("time").play();
  }
  /** @eyes-analysis
   * 执行 playPauseEvent 对应的组件业务步骤；调用 this._app.getView, this._app.pioneer.getTimeRate, this._playEvent, this._pauseEvent。
   * 调用线索：this._app.getView、this._app.getView("event")?.replayEvent、this._app.pioneer.getTimeRate、this._pauseEvent、this._playEvent。
   */
  playPauseEvent() {
    this._isAtEnd ? this._app.getView("event")?.replayEvent() : 0 === this._app.pioneer.getTimeRate() ? this._playEvent() : this._pauseEvent();
  }
}
ReplayBlock.html = getReplayBlockTemplate();
export { ReplayBlock };
