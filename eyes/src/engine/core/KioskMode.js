// Recovered from app.js:1656976-1658607.
/* 展台模式在用户交互时先停止 autoplay，再归还基类会话计时。空闲后等待相机过渡完成才启动自动播放，启动前关闭 UI 图层；轨道法向量用于自动旋转轴。 */
import * as Eyes from "../../framework/eyes/index.js";
import * as Pioneer from "../pioneer/index.js";
class KioskMode extends Eyes.KioskBase {
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
  async handleMaxInactivityTime() {
    await super.handleMaxInactivityTime();
    Math.ceil(Pioneer.TimeUtils.now()) - Eyes.KioskBase.screenLastClicked >= this.maxInactivityTime && (await this.startAutoplay());
  }
  async onWindowInteract() {
    await this._app.getManager("autoplay").stopAutoplay();
    await super.onWindowInteract();
  }
  async startAutoplay() {
    await super.startAutoplay();
    const layerManager = this._app.getManager("layer");
    layerManager.getLayer("ui").visible && layerManager.toggleLayer("ui");
    const {
      kioskAutoplay: kioskAutoplay
    } = this._children;
    this.app.getManager("camera").waitForTransitionComplete().then(async transitionResult => (!this.isHidden(kioskAutoplay) && (await this._app.getManager("autoplay").startAutoplay()), transitionResult)).catch(transitionError => {
      console.warn("error: ", transitionError);
    });
  }
  setupSpinController() {
    this.camera.clearControllers();
    const earthEntity = this.app.pioneer.getScene("main").getEntity("earth");
    const vector3 = new Pioneer.Vector3();
    vector3.cross(earthEntity.getPosition(), earthEntity.getVelocity());
    vector3.normalize(vector3);
    const spinController = this.camera.addController(Pioneer.SpinController, "autoplaySpin");
    spinController.setAxis(vector3, true);
    spinController.setRate(.03);
    spinController.setUsingRealTime(true);
    spinController.setRotatingPosition(true);
  }
}
export { KioskMode };
