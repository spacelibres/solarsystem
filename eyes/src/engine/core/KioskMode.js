/** @eyes-analysis
 * 文件职责：展台模式的界面及自动交互配置。
 * 依据：import ../../framework/eyes/index.js；import ../pioneer/index.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1656976-1658607.
import * as Eyes from "../../framework/eyes/index.js";
import * as Pioneer from "../pioneer/index.js";
/** @eyes-analysis
 * 类职责：展台模式的界面及自动交互配置。
 * 继承：Eyes.KioskBase；导出：KioskMode。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class KioskMode extends Eyes.KioskBase {
  /** @eyes-analysis
   * 【结构证据】写入 `_router`、`camera`；调用 `document.addEventListener`、`super.init`、`this.app.getManager`、`this.onWindowInteract`。
   * 状态写入：_router、camera。
   * 调用线索：document.addEventListener、super.init、this.app.getManager、this.onWindowInteract。
   */
  async init() {
    super.init();
    this._router = this.app.getManager("router");
    this.camera = this.app.getManager("camera").cameraEntity;
    document.addEventListener("keydown", async () => await this.onWindowInteract());
    document.addEventListener("click", async () => await this.onWindowInteract());
    document.addEventListener("scroll", async () => await this.onWindowInteract());
    document.addEventListener("touchstart", async () => await this.onWindowInteract());
    document.addEventListener("touchend", async () => await this.onWindowInteract());
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Math.ceil`、`Pioneer.TimeUtils.now`、`super.handleMaxInactivityTime`、`this.startAutoplay`。
   * 调用线索：Math.ceil、Pioneer.TimeUtils.now、super.handleMaxInactivityTime、this.startAutoplay。
   */
  async handleMaxInactivityTime() {
    await super.handleMaxInactivityTime();
    Math.ceil(Pioneer.TimeUtils.now()) - Eyes.KioskBase.screenLastClicked >= this.maxInactivityTime && (await this.startAutoplay());
  }
  /** @eyes-analysis
   * 【结构证据】调用 `super.onWindowInteract`、`this._app.getManager`、`this._app.getManager("autoplay").stopAutoplay`。
   * 调用线索：super.onWindowInteract、this._app.getManager、this._app.getManager("autoplay").stopAutoplay。
   */
  async onWindowInteract() {
    await this._app.getManager("autoplay").stopAutoplay();
    await super.onWindowInteract();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `console.warn`、`layerManager.getLayer`、`layerManager.toggleLayer`、`super.startAutoplay`、`this._app.getManager`、`this._app.getManager("autoplay").startAutoplay`。
   * 调用线索：console.warn、layerManager.getLayer、layerManager.toggleLayer、super.startAutoplay、this._app.getManager等。
   */
  async startAutoplay() {
    await super.startAutoplay();
    const layerManager = this._app.getManager("layer");
    layerManager.getLayer("ui").visible && layerManager.toggleLayer("ui");
    const {
      kioskAutoplay: kioskAutoplay
    } = this._children;
    this.app.getManager("camera").waitForTransitionComplete().then(async t => (!this.isHidden(kioskAutoplay) && (await this._app.getManager("autoplay").startAutoplay()), t)).catch(t => {
      console.warn("error: ", t);
    });
  }
  /** @eyes-analysis
   * 【结构证据】调用 `i.setAxis`、`i.setRate`、`i.setRotatingPosition`、`i.setUsingRealTime`、`new Pioneer.Vector3`、`t.getPosition`。
   * 调用线索：i.setAxis、i.setRate、i.setRotatingPosition、i.setUsingRealTime、new Pioneer.Vector3等。
   */
  setupSpinController() {
    this.camera.clearControllers();
    const t = this.app.pioneer.getScene("main").getEntity("earth");
    const vector3 = new Pioneer.Vector3();
    vector3.cross(t.getPosition(), t.getVelocity());
    vector3.normalize(vector3);
    const i = this.camera.addController(Pioneer.SpinController, "autoplaySpin");
    i.setAxis(vector3, true);
    i.setRate(.03);
    i.setUsingRealTime(true);
    i.setRotatingPosition(true);
  }
}
export { KioskMode };
