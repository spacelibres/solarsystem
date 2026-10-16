// Recovered from app.js:1478935-1482401.
import "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import ReplayBlockTemplate from "../templates/ReplayBlockTemplate.html";
import "../../styles/extracted/ReplayBlockStyles.js";
var getReplayBlockTemplate = () => ReplayBlockTemplate;
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
  _addTimeToDate(t) {
    const date = new Date(this._eventStartTime);
    let i = date.getMilliseconds();
    i += t;
    date.setMilliseconds(i);
    return date;
  }
  _onSliderMove(t) {
    const e = this._eventEndTime - this._eventStartTime;
    const i = this._addTimeToDate(e * (t.target.value / 100));
    const s = this._app.getManager("time").parseTime(i).format("ll");
    this.setState({
      dateText: s
    });
    Number(t.target.value) >= 0 && this._app.getManager("time").setTime(i);
  }
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
