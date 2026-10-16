/** @eyes-analysis
 * 文件职责：时间编辑、显示、时区和边界提示
 * 依据：imports: ../../framework/eyes/public-api.js, ../../vendor/modules/FollowName.cjs, ../templates/ClockTemplate.html；manager dependencies: time, router
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:588680-592849.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import "../../vendor/modules/FollowName.cjs";
import ClockTemplate from "../templates/ClockTemplate.html";
let defaultExport;
var getClockTemplate = () => ClockTemplate;
/** @eyes-analysis
 * 类职责：时间编辑、显示、时区和边界提示；继承 EyesPublicApi.BaseComponent
 * 继承：EyesPublicApi.BaseComponent；导出：Clock, default。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Clock extends EyesPublicApi.BaseComponent {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 Object.assign, this.bindFunctions。
   * 调用线索：Object.assign、super、this.bindFunctions。
   */
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
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 super.init, this._app.getManager, Container.classList.add, Input.addEventListener, Form.classList.add, Form.addEventListener, Input.blur, this._parseTime, Container.classList.remove, this._setVariables, this._children.date.classList.add, this._children.time.classList.add, this._children.meridiem.classList.add, this._children.timeInput.classList.add。
   * 调用线索：displayContainer.classList.add、displayContainer.classList.remove、super.init、t.preventDefault、t.stopPropagation等。
   */
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
  /** @eyes-analysis
   * 执行 onDateTimeClick 对应的组件业务步骤；调用 this._app.getManager, Route.url.includes, Container.classList.add, Form.classList.remove, Input.focus。
   * 调用线索：displayContainer.classList.add、this._app.getManager、this._app.getManager("router").currentRoute.url.includes、timeForm.classList.remove、timeInput.focus。
   */
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
  /** @eyes-analysis
   * 执行 isERT 对应的组件业务步骤。
   */
  isERT() {
    return this._isERT;
  }
  /** @eyes-analysis
   * 执行 toggle 对应的组件业务步骤；调用 this.setState。
   * 调用线索：this.setState。
   */
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
  /** @eyes-analysis
   * 执行 _parseTime 对应的组件业务步骤；调用 this._app.getManager, Manager.navigate。
   * 调用线索：console.error、i.isUTC、i.isValid、routerManager.navigate、this._app.getManager等。
   */
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
  /** @eyes-analysis
   * 执行 update 对应的组件业务步骤；调用 this.setState, this._app.getManager。
   * 调用线索：t.format、this._app.getManager、this._app.getManager("time").getDateFormat、this._app.getManager("time").isUTC、this.setState。
   */
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
  /** @eyes-analysis
   * 执行 backToLive 对应的组件业务步骤；调用 this._app.getManager, Manager.isNow, Manager.getTimeUrl, Manager.getNow, Manager.navigate, Manager.setTimeRate, Manager.setToNow。
   * 调用线索：routerManager.navigate、this._app.getManager、timeManager.getNow、timeManager.getTimeUrl、timeManager.isNow等。
   */
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
  /** @eyes-analysis
   * 执行 setLimitMessage 对应的组件业务步骤；调用 this._app.getManager, this._app.getView, this._displayLimitMessage；写入 limitMessageTimeout。
   * 状态写入：limitMessageTimeout。
   * 调用线索：setTimeout、this._app.getManager、this._app.getView、this._children.displayContainer?.style.setProperty、this._displayLimitMessage。
   */
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
  /** @eyes-analysis
   * 执行 _displayLimitMessage 对应的组件业务步骤；调用 List.toggle。
   * 调用线索：this._children.displayContainer?.classList.toggle。
   */
  _displayLimitMessage(t) {
    this._children.displayContainer?.classList.toggle("limit", t);
  }
  /** @eyes-analysis
   * 卸载 DOM 并取消业务订阅；调用 this._displayLimitMessage, super.__disable。
   * 调用线索：clearTimeout、super.__disable、this._displayLimitMessage。
   */
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
