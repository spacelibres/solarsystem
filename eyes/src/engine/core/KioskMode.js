// Recovered from app.js:1656976-1658607.
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
    this.app.getManager("camera").waitForTransitionComplete().then(async t => (!this.isHidden(kioskAutoplay) && (await this._app.getManager("autoplay").startAutoplay()), t)).catch(t => {
      console.warn("error: ", t);
    });
  }
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
