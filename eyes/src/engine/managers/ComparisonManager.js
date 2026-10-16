/** @eyes-analysis
 * 文件职责：创建实体大小/属性比较场景，调整实体布局并在退出时恢复原场景状态。
 * 依据：import ../../framework/eyes/public-api.js；import ../pioneer/index.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1292425-1301906.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import * as Pioneer from "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
/** @eyes-analysis
 * 类职责：创建实体大小/属性比较场景，调整实体布局并在退出时恢复原场景状态。
 * 继承：EyesPublicApi.BaseManager；导出：ComparisonManager。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ComparisonManager extends EyesPublicApi.BaseManager {
  /** @eyes-analysis
   * 【结构证据】写入 `_activeViewports`、`_anchorEntityLeft`、`_anchorEntityRight`、`_cameraEntityLeft`、`_cameraEntityRight`、`_cameraLeft`、`_cameraLightLeft`、`_cameraLightRight`；调用 `SolarSystemSceneExports.Entity.create`、`new Pioneer.Color`、`new Pioneer.Vector3`、`super`、`this._adjustZoomFromViewport.bind`、`this._anchorEntityLeft.setOrientation`。
   * 状态写入：_activeViewports、_anchorEntityLeft、_anchorEntityRight、_cameraEntityLeft、_cameraEntityRight、_cameraLeft、_cameraLightLeft、_cameraLightRight等；完整记录见索引。
   * 调用线索：SolarSystemSceneExports.Entity.create、new Pioneer.Color、new Pioneer.Vector3、super、this._adjustZoomFromViewport.bind等。
   */
  constructor(t) {
    super(t);
    this._viewportLeft = null;
    this._viewportRight = null;
    this._sceneLeft = null;
    this._sceneRight = null;
    this._anchorEntityLeft = null;
    this._anchorEntityRight = null;
    this._entityLeft = null;
    this._entityRight = null;
    this._sunLeft = null;
    this._sunRight = null;
    this._activeViewports = [];
    this._customRotations = {
      rose_bowl: [["x", 45], ["z", 180]],
      sc_juno: [["x", 45], ["z", 180]],
      saturn: [["x", 25]],
      sc_lucy: [["z", -90], ["y", -25]],
      sc_ixpe: [["z", -90], ["y", 180]],
      sc_hubble_space_telescope: [["x", 90], ["z", 90]],
      sc_jwst: [["x", 180], ["y", 180]],
      sc_psyche: [["x", 90], ["z", 90]],
      sc_stardust: [["x", 90]],
      sc_osiris_rex_src: [["x", 90]],
      sc_stardust_src: [["z", 90]],
      sc_acs3: [["x", 90]]
    };
    this._zoomSensitivity = {
      click: .3,
      hold: .1
    };
    this.bindFunctions(["_adjustZoomFromViewport", "zoomIn", "zoomOut"]);
    this._sceneLeft = this.pioneer.addScene("comparisonLeft");
    this._sceneLeft.setAmbientLightColor(new Pioneer.Color(.005, .005, .005));
    this._sceneRight = this.pioneer.addScene("comparisonRight");
    this._sceneRight.setAmbientLightColor(new Pioneer.Color(.005, .005, .005));
    SolarSystemSceneExports.Entity.create("observable_universe", this._sceneLeft);
    SolarSystemSceneExports.Entity.create("milky_way", this._sceneLeft);
    SolarSystemSceneExports.Entity.create("observable_universe", this._sceneRight);
    SolarSystemSceneExports.Entity.create("milky_way", this._sceneRight);
    this._sunLeft = SolarSystemSceneExports.Entity.create("sun", this._sceneLeft, {
      nameSuffix: "_compare"
    });
    this._sunRight = SolarSystemSceneExports.Entity.create("sun", this._sceneRight, {
      nameSuffix: "_compare"
    });
    this._anchorEntityLeft = this._sceneLeft.addEntity("anchorLeft");
    this._anchorEntityLeft.setParent(this._sceneLeft.getEntity("sun_compare"));
    this._anchorEntityLeft.setPosition(new Pioneer.Vector3(1e8, 0, 0));
    this._anchorEntityLeft.setOrientation(Pioneer.Quaternion.Identity);
    this._anchorEntityRight = this._sceneRight.addEntity("anchorRight");
    this._anchorEntityRight.setParent(this._sceneRight.getEntity("sun_compare"));
    this._anchorEntityRight.setPosition(new Pioneer.Vector3(1e8, 0, 0));
    this._anchorEntityRight.setOrientation(Pioneer.Quaternion.Identity);
    this._cameraEntityLeft = this._sceneLeft.addEntity("cameraLeft");
    this._cameraEntityLeft.setParent(this._anchorEntityLeft);
    this._cameraLeft = this._cameraEntityLeft.addComponent(Pioneer.CameraComponent);
    this._cameraLightLeft = this._cameraEntityLeft.addComponent(Pioneer.LightSourceComponent);
    this._cameraLightLeft.setEnabled(false);
    this._cameraEntityRight = this._sceneRight.addEntity("cameraRight");
    this._cameraEntityRight.setParent(this._anchorEntityRight);
    this._cameraRight = this._cameraEntityRight.addComponent(Pioneer.CameraComponent);
    this._cameraLightRight = this._cameraEntityRight.addComponent(Pioneer.LightSourceComponent);
    this._cameraLightRight.setEnabled(false);
    this._viewportLeft = this.pioneer.addViewport("left-viewport");
    this._viewportLeft.getDiv().className = "compare-viewport left-desktop";
    this._viewportLeft.setEnabled(false);
    this._viewportLeft.setCamera(this._cameraLeft);
    this._viewportRight = this.pioneer.addViewport("right-viewport");
    this._viewportRight.getDiv().className = "compare-viewport right-desktop";
    this._viewportRight.setEnabled(false);
    this._viewportRight.setCamera(this._cameraRight);
    this.pioneer.addCallback(this._adjustZoomFromViewport.bind(this), true);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._entityLeft`。
   */
  get entityLeft() {
    return this._entityLeft;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._entityRight`。
   */
  get entityRight() {
    return this._entityRight;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Math.pow`、`cameraManager.zoom`、`this.app.getManager`。
   * 调用线索：Math.pow、cameraManager.zoom、this.app.getManager。
   */
  zoomIn(t = false) {
    let e = 1;
    const i = t ? this._zoomSensitivity.hold : this._zoomSensitivity.click;
    e /= Math.pow(2, i);
    const cameraManager = this.app.getManager("camera");
    cameraManager.zoom(e, this._cameraEntityLeft);
    cameraManager.zoom(e, this._cameraEntityRight);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Math.pow`、`cameraManager.zoom`、`this.app.getManager`。
   * 调用线索：Math.pow、cameraManager.zoom、this.app.getManager。
   */
  zoomOut(t = false) {
    let e = 1;
    const i = t ? this._zoomSensitivity.hold : this._zoomSensitivity.click;
    e *= Math.pow(2, i);
    const cameraManager = this.app.getManager("camera");
    cameraManager.zoom(e, this._cameraEntityLeft);
    cameraManager.zoom(e, this._cameraEntityRight);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_entityLeft`、`_entityRight`；调用 `Math.max`、`Promise.all`、`SolarSystemSceneExports.Cameras.getDistanceToFitEntities`、`SolarSystemSceneExports.Entity.create`、`cameraManager.goToEntity`、`contentManager.getClassName`。
   * 状态写入：_entityLeft、_entityRight。
   * 调用线索：Math.max、Promise.all、SolarSystemSceneExports.Cameras.getDistanceToFitEntities、SolarSystemSceneExports.Entity.create、cameraManager.goToEntity等。
   */
  async compare(t, e) {
    const sceneManager = this.app.getManager("scene");
    this._entityLeft && this._entityLeft.getName() !== t && (this._sceneLeft.removeEntity(this._entityLeft), sceneManager.removeLoading(this._entityLeft.getName(), "compare"), this._entityLeft = null);
    this._entityRight && this._entityRight.getName() !== e && (this._sceneRight.removeEntity(this._entityRight), sceneManager.removeLoading(this._entityRight.getName(), "compare"), this._entityRight = null);
    const contentManager = this.app.getManager("content");
    const labelManager = this.app.getManager("label");
    if (!this._entityLeft) {
      this._entityLeft = SolarSystemSceneExports.Entity.create(t, this._sceneLeft);
      this._entityLeft.clearParentingTableEntries();
      this._entityLeft.clearControllers();
      this._entityLeft.setParent(this._anchorEntityLeft);
      this._entityLeft.setPosition(Pioneer.Vector3.Zero);
      const quaternion = new Pioneer.Quaternion();
      this._getCustomRotation(quaternion, t, "left");
      this._entityLeft.setOrientation(quaternion);
      labelManager.setLabelProps({
        getLabelClass: t => `no-select ${contentManager.getClassName(t, "") ?? ""}`,
        handleTouch: null,
        handleClick: null
      }, [t], this._sceneLeft, this._cameraEntityLeft);
    }
    if (!this._entityRight) {
      this._entityRight = SolarSystemSceneExports.Entity.create(e, this._sceneRight);
      this._entityRight.clearParentingTableEntries();
      this._entityRight.clearControllers();
      this._entityRight.setParent(this._anchorEntityRight);
      this._entityRight.setPosition(Pioneer.Vector3.Zero);
      const quaternion = new Pioneer.Quaternion();
      this._getCustomRotation(quaternion, e, "right");
      this._entityRight.setOrientation(quaternion);
      labelManager.setLabelProps({
        getLabelClass: t => `no-select ${contentManager.getClassName(t, "") ?? ""}`,
        handleTouch: null,
        handleClick: null
      }, [e], this._sceneRight, this._cameraEntityRight);
    }
    if (this._updateSuns(), !this._viewportLeft.isEnabled()) {
      for (let t = 0, e = this.pioneer.getNumViewports(); t < e; t++) {
        const e = this.pioneer.getViewportAt(t);
        e.isEnabled() && (this._activeViewports.push(t), e.setEnabled(false));
      }
      this._viewportLeft.setEnabled(true);
      this._viewportRight.setEnabled(true);
      this.setCameraLight(true);
      const customEvent = new CustomEvent("comparisonenter", {
        detail: {}
      });
      window.dispatchEvent(customEvent);
    }
    const a = SolarSystemSceneExports.Cameras.getDistanceToFitEntities(this._cameraEntityLeft, Pioneer.Quaternion.Identity, this._entityLeft, [this._entityLeft]);
    const l = SolarSystemSceneExports.Cameras.getDistanceToFitEntities(this._cameraEntityRight, Pioneer.Quaternion.Identity, this._entityRight, [this._entityRight]);
    let c = Math.max(l, a);
    c *= 1.6;
    const vector3 = new Pioneer.Vector3();
    vector3.setMagnitude(Pioneer.Vector3.YAxisNeg, c);
    const d = new Pioneer.Vector3();
    d.setMagnitude(Pioneer.Vector3.YAxisNeg, c);
    this._cameraEntityLeft.clearControllers();
    this._cameraEntityRight.clearControllers();
    const customEvent = new CustomEvent("cameracompare", {
      detail: {
        left: t,
        right: e
      }
    });
    window.dispatchEvent(customEvent);
    const cameraManager = this.app.getManager("camera");
    const _ = cameraManager.goToEntity("anchorLeft", {
      minRadius: .5 * c,
      maxRadius: 10 * c,
      camera: this._cameraEntityLeft,
      destination: vector3,
      destinationUp: Pioneer.Vector3.ZAxis,
      scene: this._sceneLeft,
      select: false,
      zoom: true,
      cinematic: true
    });
    const m = cameraManager.goToEntity("anchorRight", {
      minRadius: .5 * c,
      maxRadius: 10 * c,
      camera: this._cameraEntityRight,
      destination: d,
      destinationUp: Pioneer.Vector3.ZAxis,
      scene: this._sceneRight,
      select: false,
      zoom: true,
      cinematic: true
    });
    await Promise.all([_, m]);
    sceneManager.addLoading(this._entityLeft.getName(), "compare");
    sceneManager.addLoading(this._entityRight.getName(), "compare");
    await Promise.all([this._entityLeft.getLoadedPromise(), this._entityRight.getLoadedPromise()]);
    sceneManager.removeLoading(this._entityLeft.getName(), "compare");
    sceneManager.removeLoading(this._entityRight.getName(), "compare");
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._cameraLightLeft.setColor`、`this._cameraLightLeft.setEnabled`、`this._cameraLightRight.setColor`、`this._cameraLightRight.setEnabled`、`this._updateSuns`。
   * 调用线索：this._cameraLightLeft.setColor、this._cameraLightLeft.setEnabled、this._cameraLightRight.setColor、this._cameraLightRight.setEnabled、this._updateSuns。
   */
  setCameraLight(t, e) {
    this._cameraLightLeft.setEnabled(t);
    this._cameraLightRight.setEnabled(t);
    void 0 !== e && (this._cameraLightLeft.setColor(e), this._cameraLightRight.setColor(e));
    this._updateSuns();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_activeViewports`、`_entityLeft`、`_entityRight`；调用 `new CustomEvent`、`this._sceneLeft.removeEntity`、`this._sceneRight.removeEntity`、`this._viewportLeft.setEnabled`、`this._viewportRight.setEnabled`、`this.app.getManager`。
   * 状态写入：_activeViewports、_entityLeft、_entityRight。
   * 调用线索：new CustomEvent、this._sceneLeft.removeEntity、this._sceneRight.removeEntity、this._viewportLeft.setEnabled、this._viewportRight.setEnabled等。
   */
  exit() {
    this._entityLeft && (this._sceneLeft.removeEntity(this._entityLeft), this._entityLeft = null);
    this._entityRight && (this._sceneRight.removeEntity(this._entityRight), this._entityRight = null);
    this.app.getManager("scene").removeLoading("*", "compare");
    this._viewportLeft.setEnabled(false);
    this._viewportRight.setEnabled(false);
    for (let t = 0; t < this._activeViewports.length; t++) {
      const e = this._activeViewports[t];
      this.pioneer.getViewportAt(e).setEnabled(true);
    }
    this._activeViewports = [];
    const customEvent = new CustomEvent("comparisonexit", {
      detail: {}
    });
    window.dispatchEvent(customEvent);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._cameraLightLeft.getColor`、`this._cameraLightLeft.getColor().min`、`this._cameraLightLeft.isEnabled`、`this._cameraLightRight.getColor`、`this._cameraLightRight.getColor().min`、`this._cameraLightRight.isEnabled`。
   * 调用线索：this._cameraLightLeft.getColor、this._cameraLightLeft.getColor().min、this._cameraLightLeft.isEnabled、this._cameraLightRight.getColor、this._cameraLightRight.getColor().min等。
   */
  _updateSuns() {
    const t = "sun" !== this._entityLeft?.getName() && (!this._cameraLightLeft.isEnabled() || this._cameraLightLeft.getColor().min() < 1);
    const e = "sun" !== this._entityRight?.getName() && (!this._cameraLightRight.isEnabled() || this._cameraLightRight.getColor().min() < 1);
    this._sunLeft.getComponent(Pioneer.SpheroidLODComponent).setEnabled(t);
    this._sunLeft.getComponent(Pioneer.AtmosphereComponent).setEnabled(t);
    this._sunLeft.getComponent(Pioneer.SpriteComponent).setEnabled(t);
    this._sunLeft.getComponent(Pioneer.LightSourceComponent).setEnabled(t);
    this._sunRight.getComponent(Pioneer.SpheroidLODComponent).setEnabled(e);
    this._sunRight.getComponent(Pioneer.AtmosphereComponent).setEnabled(e);
    this._sunRight.getComponent(Pioneer.SpriteComponent).setEnabled(e);
    this._sunRight.getComponent(Pioneer.LightSourceComponent).setEnabled(e);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `Number.isNaN`、`Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`e.getName`、`i.setMagnitude`、`s.setMagnitude`。
   * 调用线索：Number.isNaN、Pioneer.Vector3.pool.get、Pioneer.Vector3.pool.release、e.getName、i.setMagnitude等。
   */
  _adjustZoomFromViewport() {
    if (!this._viewportLeft.isEnabled()) return;
    if (!this._viewportRight.isEnabled()) return;
    let t = this._cameraEntityLeft.getPosition().magnitude();
    Number.isNaN(t) && (t = 1);
    const e = this.app.pioneer.getInput().getActiveViewport();
    e && "right-viewport" === e.getName() && (t = this._cameraEntityRight.getPosition().magnitude(), Number.isNaN(t) && (t = 1));
    const i = Pioneer.Vector3.pool.get();
    i.setMagnitude(this._cameraEntityLeft.getPosition(), t);
    const s = Pioneer.Vector3.pool.get();
    s.setMagnitude(this._cameraEntityRight.getPosition(), t);
    this._cameraEntityLeft.setPosition(i);
    this._cameraEntityRight.setPosition(s);
    Pioneer.Vector3.pool.release(i);
    Pioneer.Vector3.pool.release(s);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Pioneer.MathUtils.degToRad`、`new Error`、`new Pioneer.Quaternion`、`quaternion.setFromAxisAngle`、`t.mult`、`t.set`；含显式错误分支。
   * 调用线索：Pioneer.MathUtils.degToRad、new Error、new Pioneer.Quaternion、quaternion.setFromAxisAngle、t.mult等。
   */
  _getCustomRotation(t, e, i) {
    if (t.set(1, 0, 0, 0), void 0 !== this._customRotations[e]) {
      const i = this._customRotations[e];
      for (let e = 0, s = i.length; e < s; e++) {
        let s;
        if ("x" === i[e][0]) s = Pioneer.Vector3.XAxis;else if ("y" === i[e][0]) s = Pioneer.Vector3.YAxis;else {
          if ("z" !== i[e][0]) throw new Error(`Invalid model rotate axis "${i[e][0]}".`);
          s = Pioneer.Vector3.ZAxis;
        }
        let o = i[e][1];
        o = Pioneer.MathUtils.degToRad(o);
        const quaternion = new Pioneer.Quaternion();
        quaternion.setFromAxisAngle(s, o);
        t.mult(t, quaternion);
      }
    }
  }
}
export { ComparisonManager };
