// Recovered from app.js:588680-592849.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import "../../vendor/modules/FollowName.cjs";
import ClockTemplate from "../templates/ClockTemplate.html";
let defaultExport;
var getClockTemplate = () => ClockTemplate;
/* 时钟格式由 time 管理器统一持有，普通时钟订阅 update，kiosk 计时器由调用者直接传文本。编辑提交经解析后写入路由；停用时取消限时提示的隐藏计时器。 */
class Clock extends EyesPublicApi.BaseComponent {
  constructor(app, options = {}) {
    super(app, null, {
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
      ...options
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
    allowEdit && (displayContainer.classList.add("editable"), timeInput.addEventListener("keyup", keyEvent => {
      keyEvent.stopPropagation();
    }), timeInput.addEventListener("keydown", keyEvent => {
      keyEvent.stopPropagation();
    }), timeForm.classList.add("editable"), timeForm.addEventListener("submit", submitEvent => {
      timeInput.blur();
      this._parseTime(timeInput.value);
      submitEvent.preventDefault();
    }), timeInput.addEventListener("blur", blurEvent => {
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
    const isStoryRoute = this._app.getManager("router").currentRoute.url.includes("story");
    if (!this._state.allowEdit || isStoryRoute) return;
    const meridiemText = this._state.meridiem ? ` ${meridiem.innerHTML}` : "";
    timeInput.value = `${date.innerHTML} ${time.innerHTML}${meridiemText}`;
    displayContainer.classList.add("hidden");
    timeForm.classList.remove("hidden");
    timeInput.focus();
  }
  isERT() {
    return this._isERT;
  }
  toggle(fieldName, isVisible) {
    switch (fieldName) {
      case "date":
        this.setState({
          isDateVisible: isVisible,
          isDateVisibleClass: this._class.isVisible[isVisible]
        });
        break;
      case "time":
        this.setState({
          isTimeVisible: isVisible,
          isTimeVisibleClass: this._class.isVisible[isVisible]
        });
        break;
      case "meridiem":
        this.setState({
          isMeridiemVisible: isVisible,
          isMeridiemVisibleClass: this._class.isVisible[isVisible]
        });
    }
  }
  _parseTime(inputText) {
    const routerManager = this._app.getManager("router");
    const parsedTime = this._app.getManager("time").parseTime(inputText, "parse");
    if (parsedTime.isValid()) {
      this._app.getManager("time").setDisplayUTC(parsedTime.isUTC());
      const timeUrl = this._app.getManager("time").getTimeUrl(parsedTime);
      routerManager.navigate({
        time: timeUrl
      }, routerManager.currentRoute.url);
    } else {
      console.error("Invalid input: " + inputText);
      routerManager.navigate({
        __remove: ["time"]
      }, routerManager.currentRoute.url);
    }
  }
  update(timeValue, isTimerText = false) {
    this._state.isVisible && (isTimerText ? this.setState({
      time: timeValue
    }) : this.setState({
      date: timeValue.format(this._app.getManager("time").getDateFormat("date")),
      time: timeValue.format(this._app.getManager("time").getDateFormat("time")),
      meridiem: this._app.getManager("time").isUTC() ? "" : timeValue.format(this._app.getManager("time").getDateFormat("meridiem")),
      alert: this._app.getManager("time").forcedPause ? "alert" : ""
    }));
  }
  backToLive() {
    const routerManager = this._app.getManager("router");
    const timeManager = this._app.getManager("time");
    if (!timeManager.isNow()) {
      const liveTimeUrl = timeManager.getTimeUrl(timeManager.getNow());
      const routeTime = routerManager.query.time;
      routerManager.navigate({
        __remove: ["time", "rate"]
      }, routerManager.currentRoute.url);
      routeTime !== liveTimeUrl && (timeManager.setTimeRate(1), timeManager.setToNow());
    }
  }
  setLimitMessage(limitDirection, customMessage) {
    let quotedMessage;
    if (customMessage) quotedMessage = `"${customMessage}"`;else {
      const {
        currentView: currentView
      } = this._app.getManager("router");
      const {
        _isSpacecraft: _isSpacecraft
      } = this._app.getView(currentView);
      let limitLabel = "time " + (1 === limitDirection ? "maximum" : "minimum");
      "event" === currentView ? limitLabel = "event " + (1 === limitDirection ? "end" : "start") : _isSpacecraft && (limitLabel = "mission " + (1 === limitDirection ? "end" : "start"));
      quotedMessage = 1 === limitDirection ? `"cannot exceed ${limitLabel}"` : `"cannot precede ${limitLabel}"`;
    }
    this._children.displayContainer?.style.setProperty("--limit-message", quotedMessage);
    this._displayLimitMessage(true);
    this.limitMessageTimeout = setTimeout(() => {
      this._displayLimitMessage(false);
    }, 3e3);
  }
  _displayLimitMessage(isVisible) {
    this._children.displayContainer?.classList.toggle("limit", isVisible);
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
