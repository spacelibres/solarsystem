// Recovered from app.js:647400-650560.
import * as animateFill from "../../vendor/modules/animateFill-168.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import TimeControllerTemplate from "../../ui/templates/TimeControllerTemplate.html";
let defaultExport;
var getTimeControllerTemplate = () => TimeControllerTemplate;
/** 时间倍率通过路由写入时间管理器；显示换算使用固定 365 天年、30 天月，并只选可整除的最大单位。 */
class TimeController extends EyesPublicApi.BaseComponent {
  constructor(app) {
    super(app, null, {
      isPlay: false,
      playClass: "",
      rate: 0,
      rateDisplay: 0
    });
    this._class.fontSize.small = "tiny";
    this._class.isPlay = {
      true: "icon-pause",
      false: "icon-play"
    };
    this._rates = [-94608e3, -31536e3, -6048e3, -604800, -86400, -36e3, -3600, -600, -60, -10, -1, 0, 1, 10, 60, 600, 3600, 36e3, 86400, 604800, 6048e3, 31536e3, 94608e3];
    this._manager = this._app.getManager("time");
    this._router = this._app.getManager("router");
    this._manager.setDefaultTimeRate(1);
    const timeRate = this._manager.getTimeRate();
    const isPlaying = 0 !== timeRate;
    this.setState({
      isPlay: isPlaying,
      playClass: this._class.isPlay[isPlaying],
      rate: timeRate,
      rateDisplay: this.getRateDisplay()
    });
    this.bindFunctions(["getRateLimits", "setRateLimits", "setRate", "setDefaultRate", "setRealRate", "decreaseRate", "increaseRate", "togglePlayPause", "onRateChange", "onForcedPause", "onForcedPauseResume"]);
  }
  init() {
    super.init();
    animateFill.default.setDefaultProps({
      theme: "default",
      touch: ["hold", 2e3],
      delay: [600, null],
      plugins: [animateFill.followCursor]
    });
    (0, animateFill.default)(this._children.toggleBtn, {
      placement: "top"
    });
    (0, animateFill.default)(this._children.increaseBtn, {
      placement: "top"
    });
    (0, animateFill.default)(this._children.decreaseBtn, {
      placement: "top"
    });
    this._children.decreaseContainer.classList.add("bg-color", "gray", "dark");
    this._children.increaseContainer.classList.add("bg-color", "gray", "dark");
    this._children.label.classList.add("semi");
    this._children.rateDisplay.classList.add("semi");
    this._callbackRegistry.push({
      emitter: this._app.getManager("time"),
      event: "ratechange",
      callback: this.onRateChange
    });
  }
  getRateLimits() {
    return this._rates;
  }
  setRateLimits(rates) {
    this._rates = rates;
  }
  setRate(timeRate) {
    this._router.navigate({
      time: this._manager.getTimeUrl(),
      rate: timeRate
    }, this._router.currentRoute.url);
  }
  /** 沿既有倍率表寻找相邻值；当前倍率不在表中的索引 −1 行为原样保留。 */
  decreaseRate() {
    if (0 === this._rates.length) {
      return;
    }
    const currentRateIndex = this._rates.indexOf(this._manager.getTimeRate());
    if (0 !== currentRateIndex) {
      this.setRate(this._rates[currentRateIndex - 1]);
    }
  }
  /** 沿既有倍率表寻找相邻值；空表和末端不更新路由。 */
  increaseRate() {
    if (0 === this._rates.length) {
      return;
    }
    const currentRateIndex = this._rates.indexOf(this._manager.getTimeRate());
    if (currentRateIndex !== this._rates.length - 1) {
      this.setRate(this._rates[currentRateIndex + 1]);
    }
  }
  togglePlayPause() {
    if (!this._state.isPlay) {
      this._manager.play();
    } else {
      this._manager.pause();
    }
    this.setRate(this._manager.getTimeRate());
  }
  setDefaultRate() {
    this.setRate(this._manager.getDefaultTimeRate());
  }
  setRealRate() {
    this.setRate(1);
  }
  /** 只有播放状态或倍率变化时刷新；不在允许表中的倍率通过路由回到默认值，空表允许任意倍率。 */
  onRateChange() {
    const timeRate = this._manager.getTimeRate();
    const isPlaying = 0 !== timeRate;
    if (!(isPlaying === this._state.isPlay && this._state.rate === timeRate)) {
      if (this._rates.length > 0 && !this._rates.includes(timeRate)) {
        this.setRate(this._manager.getDefaultTimeRate());
      } else {
        this.setState({
          isPlay: isPlaying,
          rate: timeRate,
          playClass: this._class.isPlay[isPlaying],
          rateDisplay: this.getRateDisplay(timeRate)
        });
      }
    }
  }
  onForcedPause() {
    this.setRate(0);
  }
  onForcedPauseResume() {
    this.setDefaultRate();
  }
  /** 按年、月、周、日、时、分顺序选择整除单位；否则保留原有对 60 取余的秒显示规则。 */
  getRateUnit(timeRate = null) {
    if (null === timeRate) {
      timeRate = this._manager.getTimeRate();
    }
    const yearsPerSecond = timeRate / 31536e3;
    const monthsPerSecond = timeRate / 2592e3;
    const weeksPerSecond = timeRate / 604800;
    const daysPerSecond = timeRate / 86400;
    const hoursPerSecond = timeRate / 3600;
    const minutesPerSecond = timeRate / 60;
    let unitSuffix = "";
    if ((yearsPerSecond >= 1 || yearsPerSecond <= -1) && yearsPerSecond % 1 == 0) {
      timeRate = yearsPerSecond;
      unitSuffix = " yr";
    } else if ((monthsPerSecond >= 1 || monthsPerSecond <= -1) && monthsPerSecond % 1 == 0) {
      timeRate = monthsPerSecond;
      unitSuffix = " mth";
    } else if ((weeksPerSecond >= 1 || weeksPerSecond <= -1) && weeksPerSecond % 1 == 0) {
      timeRate = weeksPerSecond;
      unitSuffix = " wk";
    } else if ((daysPerSecond >= 1 || daysPerSecond <= -1) && daysPerSecond % 1 == 0) {
      timeRate = daysPerSecond;
      unitSuffix = " day";
    } else if ((hoursPerSecond >= 1 || hoursPerSecond <= -1) && hoursPerSecond % 1 == 0) {
      timeRate = hoursPerSecond;
      unitSuffix = " hr";
    } else if ((minutesPerSecond >= 1 || minutesPerSecond <= -1) && minutesPerSecond % 1 == 0) {
      timeRate = minutesPerSecond;
      unitSuffix = " min";
    } else {
      timeRate %= 60;
      unitSuffix = " sec";
    }
    return {
      rate: timeRate,
      unit: unitSuffix
    };
  }
  getRateDisplay(timeRate) {
    const {
      rate: rate,
      unit: unit
    } = this.getRateUnit(timeRate);
    return 0 !== rate ? rate + unit + "(s)/sec" : "paused";
  }
}
TimeController.html = getTimeControllerTemplate();
defaultExport = TimeController;
export { defaultExport as default };
