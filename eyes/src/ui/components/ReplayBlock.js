// Recovered from app.js:1478935-1482401.
import "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import ReplayBlockTemplate from "../templates/ReplayBlockTemplate.html";
import "../../styles/extracted/ReplayBlockStyles.js";
var getReplayBlockTemplate = () => ReplayBlockTemplate;
/* 事件时间滑块持有起止 Date，时间 update 订阅反向同步进度；拖动结束恢复播放，接近终点暂停并切换重播图标。时钟组件重新挂到本块容器。 */
class ReplayBlock extends SolarSystemPublicApi.BaseContentBlock {
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
  init() {
    super.init();
    this._callbackRegistry.push({
      emitter: this._app.getManager("time"),
      event: "update",
      callback: this.update
    });
  }
  onRouteChange(objectId, eventId, eventInfo, orderedEvents, cancelToken) {
    if (cancelToken && cancelToken.isCanceled) return;
    const timeManager = this._app.getManager("time");
    this._objectId = objectId;
    this._eventStartTime = new Date(eventInfo.start);
    this._eventEndTime = new Date(eventInfo.end);
    const eventIndex = this._app.getManager("content").orderedEvents.findIndex(eventEntry => eventEntry.id === eventId);
    this._currentEvent = orderedEvents[eventIndex];
    const isLastEvent = eventIndex < 0 || eventIndex === orderedEvents.length - 1;
    this._prevEventId = 0 === eventIndex ? null : orderedEvents[eventIndex - 1].id;
    this._nextEventId = isLastEvent ? null : orderedEvents[eventIndex + 1].id;
    const dateText = timeManager.getTime().format("ll");
    const timeText = timeManager.getTime().format(timeManager.getDateFormat("time"));
    this.setState({
      dateText: dateText,
      timeText: timeText,
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
  _addTimeToDate(elapsedMillis) {
    const date = new Date(this._eventStartTime);
    let milliseconds = date.getMilliseconds();
    milliseconds += elapsedMillis;
    date.setMilliseconds(milliseconds);
    return date;
  }
  _onSliderMove(inputEvent) {
    const durationMillis = this._eventEndTime - this._eventStartTime;
    const selectedTime = this._addTimeToDate(durationMillis * (inputEvent.target.value / 100));
    const dateText = this._app.getManager("time").parseTime(selectedTime).format("ll");
    this.setState({
      dateText: dateText
    });
    Number(inputEvent.target.value) >= 0 && this._app.getManager("time").setTime(selectedTime);
  }
  update(currentTime) {
    this.setState({
      dateText: currentTime.format(this._app.getManager("time").getDateFormat("date"))
    });
    const {
      eventInputRange: eventInputRange
    } = this._children;
    const eventStart = this._app.getManager("time").parseTime(this._eventStartTime);
    const progressPercent = (currentTime - eventStart) / (this._app.getManager("time").parseTime(this._eventEndTime) - eventStart) * 100;
    isNaN(progressPercent) || (eventInputRange.value = progressPercent);
    const date = new Date(currentTime);
    this._eventEndTime - date < 100 ? (this._app.getManager("time").pause(), this._isAtEnd = true, this.setState({
      playIconClass: this._isPlaying.replay
    })) : (this._isAtEnd = false, this.setState({
      playIconClass: this._isPlaying[0 !== this._app.pioneer.getTimeRate()]
    }));
  }
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
  prevButtonClicked() {
    this._app.getComponent("eventsTimeline").goToEvent(this._prevEventId);
  }
  nextButtonClicked() {
    this._app.getComponent("eventsTimeline").goToEvent(this._nextEventId);
  }
  _pauseEvent() {
    this.setState({
      playIconClass: this._isPlaying[false]
    });
    this._app.getManager("time").pause();
  }
  _playEvent() {
    this.setState({
      playIconClass: this._isPlaying[true]
    });
    this._app.getManager("time").play();
  }
  playPauseEvent() {
    this._isAtEnd ? this._app.getView("event")?.replayEvent() : 0 === this._app.pioneer.getTimeRate() ? this._playEvent() : this._pauseEvent();
  }
}
ReplayBlock.html = getReplayBlockTemplate();
export { ReplayBlock };
