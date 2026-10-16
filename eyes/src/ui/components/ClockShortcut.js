/** @eyes-analysis
 * 文件职责：快速日期时间选择入口
 * 依据：imports: ../../vendor/modules/animateFill-168.js, ../../vendor/modules/FollowName.cjs, ../../framework/eyes/public-api.js, ../templates/ClockShortcutTemplate.html；manager dependencies: time, router
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:597896-600111.
import * as animateFill from "../../vendor/modules/animateFill-168.js";
import "../../vendor/modules/FollowName.cjs";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import ClockShortcutTemplate from "../templates/ClockShortcutTemplate.html";
let defaultExport;
var getClockShortcutTemplate = () => ClockShortcutTemplate;
/** @eyes-analysis
 * 类职责：快速日期时间选择入口；继承 EyesPublicApi.BaseComponent
 * 继承：EyesPublicApi.BaseComponent；导出：default。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ClockShortcut extends EyesPublicApi.BaseComponent {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 this.bindFunctions；写入 _liveCallback。
   * 状态写入：_class.fontSize.small、_liveCallback、_state.replayClass。
   * 调用线索：super、this.bindFunctions。
   */
  constructor(t) {
    super(t, null, {
      hasHover: false,
      liveContainerClass: "hidden",
      liveClass: "live",
      liveText: "live",
      liveIcon: "icon-live",
      replayClass: "container",
      replayIcon: "icon-replay"
    });
    this._state.replayClass = "hidden";
    this._class.fontSize.small = "x-small";
    this._liveCallback = null;
    this.bindFunctions(["_replay", "backToLive", "update"]);
  }
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 super.init, this._children.liveContainer.addEventListener, this.setState, Fill.default.setDefaultProps, this._children.live.classList.add, this._children.replay.classList.add, this._element.removeChild, this._callbackRegistry.push, this._app.getManager。
   * 调用线索：0,animateFill.default、animateFill.default.setDefaultProps、super.init、this._app.getManager、this._callbackRegistry.push等。
   */
  init() {
    super.init();
    const {
      canHover: canHover,
      isTouch: isTouch
    } = this._app;
    canHover && !isTouch && (this._children.liveContainer.addEventListener("mouseenter", () => {
      this.setState({
        hasHover: true,
        liveIcon: "icon-live"
      });
    }), this._children.liveContainer.addEventListener("mouseleave", () => {
      this.setState({
        hasHover: false,
        liveIcon: "icon-back-to-live"
      });
    }));
    animateFill.default.setDefaultProps({
      theme: "default",
      touch: ["hold", 2e3],
      delay: [600, null],
      plugins: [animateFill.followCursor]
    });
    (0, animateFill.default)(this._children.liveContainer, {
      content: "Reset time to live.",
      placement: "top"
    });
    this._children.live.classList.add("semi", "color");
    this._children.replay.classList.add("semi", "color");
    this._element.removeChild(this._children.replayContainer);
    this._callbackRegistry.push({
      emitter: this._app.getManager("time"),
      event: "update",
      callback: this.update
    });
  }
  /** @eyes-analysis
   * 执行 setCallback 对应的组件业务步骤；写入 _liveCallback。
   * 状态写入：_liveCallback。
   */
  setCallback(t) {
    this._liveCallback = "function" == typeof t ? t : null;
  }
  /** @eyes-analysis
   * 执行 backToLive 对应的组件业务步骤；调用 this._liveCallback, this._app.getManager, Manager.isNow, Manager.getTimeUrl, Manager.getNow, Manager.navigate, Manager.setTimeRate, Manager.setToNow。
   * 调用线索：routerManager.navigate、this._app.getManager、this._liveCallback、timeManager.getNow、timeManager.getTimeUrl等。
   */
  backToLive() {
    if ("function" == typeof this._liveCallback) this._liveCallback();else {
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
  }
  /** @eyes-analysis
   * 执行 _replay 对应的组件业务步骤；调用 this._app.getManager。
   * 调用线索：this._app.getManager、this._app.getManager("router").navigate、this._app.getManager("time").setTimeRate、this._app.getManager("time").setToStart。
   */
  _replay() {
    this._app.getManager("router").navigate({
      __remove: ["time", "rate"]
    }) || (this._app.getManager("time").setTimeRate(1), this._app.getManager("time").setToStart());
  }
  /** @eyes-analysis
   * 执行 update 对应的组件业务步骤；调用 this._app.getManager, EyesPublicApi.AppUtils.isMobileMode, this.setState。
   * 调用线索：EyesPublicApi.AppUtils.isMobileMode、this._app.getManager、this._app.getManager("time").getNow、this._app.getManager("time").isNow、this._app.getManager("time").isWithinLimits等。
   */
  update(t) {
    if (!this._state.isVisible) return;
    const e = this._app.getManager("time").isNow();
    const i = this._app.getManager("time").getNow();
    const s = {
      liveContainerClass: 0 === this._app.getManager("time").isWithinLimits(i) ? e ? "active" : "clickable" : "hidden",
      liveClass: e ? "live" : "",
      replayClass: EyesPublicApi.AppUtils.isMobileMode() ? "icon icon-box" : "container"
    };
    this._state.hasHover || (s.liveIcon = e ? "icon-live" : "icon-back-to-live");
    this.setState(s);
  }
}
ClockShortcut.html = getClockShortcutTemplate();
defaultExport = ClockShortcut;
export { defaultExport as default };
