// Recovered from app.js:588680-592849.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import "../../vendor/modules/FollowName.cjs";
import ClockTemplate from "../templates/ClockTemplate.html";
let defaultExport;
var getClockTemplate = () => ClockTemplate;
class Clock extends EyesPublicApi.BaseComponent {
  constructor(t, e = {}) {
    super(t, null, {
      isVisible: false,
      isDateVisible: true,
      isTimeVisible: true,
      isMeridiemVisible: true,
      allowEdit: true,
      date: "Date",
      time: "Time",
      meridiem: "",
      alert: "",
      isKioskSessionTimer: false,
      ...e
    });
    Object.assign(this._state, {
      isDateVisibleClass: this._class.isVisible[this._state.isDateVisible],
      isTimeVisibleClass: this._class.isVisible[this._state.isTimeVisible],
      isMeridiemVisibleClass: this._class.isVisible[this._state.isMeridiemVisible]
    });
    this.bindFunctions(["update", "onDateTimeClick"]);
  }
  init() {
    super.init();
    const {
      allowEdit: allowEdit,
      isKioskSessionTimer: isKioskSessionTimer
    } = this._state;
    this._app.getManager("time").setDateFormats({
      utc: {
        date: "MMM DD, YYYY",
        time: "HH[:]mm[:]ss"
      },
      local: {
        date: "MMM DD, YYYY",
        time: "hh[:]mm[:]ss",
        meridiem: "a",
        parse: ["MMM D, YYYY h:m:s a", "MMM D, YYYY h:m a", "MMM D, YYYY h a", "MMM D, YYYY"]
      }
    });
    this._app.getManager("time").setDisplayUTC(false);
    const {
      displayContainer: displayContainer,
      timeInput: timeInput,
      timeForm: timeForm
    } = this._children;
    allowEdit && (displayContainer.classList.add("editable"), timeInput.addEventListener("keyup", t => {
      t.stopPropagation();
    }), timeInput.addEventListener("keydown", t => {
      t.stopPropagation();
    }), timeForm.classList.add("editable"), timeForm.addEventListener("submit", t => {
      timeInput.blur();
      this._parseTime(timeInput.value);
      t.preventDefault();
    }), timeInput.addEventListener("blur", t => {
      timeForm.classList.add("hidden");
      displayContainer.classList.remove("hidden");
    }));
    this._setVariables(this._element);
    this._children.date.classList.add("semi");
    this._children.time.classList.add("semi");
    this._children.meridiem.classList.add("semi");
    this._children.timeInput.classList.add("semi");
    this._children.timeForm.classList.add("semi");
    isKioskSessionTimer || this._callbackRegistry.push({
      emitter: this._app.getManager("time"),
      event: "update",
      callback: this.update
    });
  }
  onDateTimeClick() {
    const {
      displayContainer: displayContainer,
      timeInput: timeInput,
      timeForm: timeForm,
      date: date,
      time: time,
      meridiem: meridiem
    } = this._children;
    const r = this._app.getManager("router").currentRoute.url.includes("story");
    if (!this._state.allowEdit || r) return;
    const a = this._state.meridiem ? ` ${meridiem.innerHTML}` : "";
    timeInput.value = `${date.innerHTML} ${time.innerHTML}${a}`;
    displayContainer.classList.add("hidden");
    timeForm.classList.remove("hidden");
    timeInput.focus();
  }
  isERT() {
    return this._isERT;
  }
  toggle(t, e) {
    switch (t) {
      case "date":
        this.setState({
          isDateVisible: e,
          isDateVisibleClass: this._class.isVisible[e]
        });
        break;
      case "time":
        this.setState({
          isTimeVisible: e,
          isTimeVisibleClass: this._class.isVisible[e]
        });
        break;
      case "meridiem":
        this.setState({
          isMeridiemVisible: e,
          isMeridiemVisibleClass: this._class.isVisible[e]
        });
    }
  }
  _parseTime(t) {
    const routerManager = this._app.getManager("router");
    const i = this._app.getManager("time").parseTime(t, "parse");
    if (i.isValid()) {
      this._app.getManager("time").setDisplayUTC(i.isUTC());
      const t = this._app.getManager("time").getTimeUrl(i);
      routerManager.navigate({
        time: t
      }, routerManager.currentRoute.url);
    } else {
      console.error("Invalid input: " + t);
      routerManager.navigate({
        __remove: ["time"]
      }, routerManager.currentRoute.url);
    }
  }
  update(t, e = false) {
    this._state.isVisible && (e ? this.setState({
      time: t
    }) : this.setState({
      date: t.format(this._app.getManager("time").getDateFormat("date")),
      time: t.format(this._app.getManager("time").getDateFormat("time")),
      meridiem: this._app.getManager("time").isUTC() ? "" : t.format(this._app.getManager("time").getDateFormat("meridiem")),
      alert: this._app.getManager("time").forcedPause ? "alert" : ""
    }));
  }
  backToLive() {
    const routerManager = this._app.getManager("router");
    const timeManager = this._app.getManager("time");
    if (!timeManager.isNow()) {
      const i = timeManager.getTimeUrl(timeManager.getNow());
      const s = routerManager.query.time;
      routerManager.navigate({
        __remove: ["time", "rate"]
      }, routerManager.currentRoute.url);
      s !== i && (timeManager.setTimeRate(1), timeManager.setToNow());
    }
  }
  setLimitMessage(t, e) {
    let i;
    if (e) i = `"${e}"`;else {
      const {
        currentView: currentView
      } = this._app.getManager("router");
      const {
        _isSpacecraft: _isSpacecraft
      } = this._app.getView(currentView);
      let n = "time " + (1 === t ? "maximum" : "minimum");
      "event" === currentView ? n = "event " + (1 === t ? "end" : "start") : _isSpacecraft && (n = "mission " + (1 === t ? "end" : "start"));
      i = 1 === t ? `"cannot exceed ${n}"` : `"cannot precede ${n}"`;
    }
    this._children.displayContainer?.style.setProperty("--limit-message", i);
    this._displayLimitMessage(true);
    this.limitMessageTimeout = setTimeout(() => {
      this._displayLimitMessage(false);
    }, 3e3);
  }
  _displayLimitMessage(t) {
    this._children.displayContainer?.classList.toggle("limit", t);
  }
  __disable() {
    this._displayLimitMessage(false);
    clearTimeout(this.limitMessageTimeout);
    super.__disable();
  }
}
Clock.html = getClockTemplate();
defaultExport = Clock;
export { Clock };
export { defaultExport as default };
