// Recovered from app.js:1292425-1301906.
/* 比较模式持有左右独立场景、锚点、相机和视口，进入时记录并关闭原视口，退出按原索引恢复。两边共享最大适配距离且每帧同步缩放距离；模型旋转表以度存储，应用前转弧度。side 参数保留调用契约，目前旋转表仅按实体 ID 查询。 */
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import * as Pioneer from "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
class ComparisonManager extends EyesPublicApi.BaseManager {
  constructor(app) {
    super(app);
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
  get entityLeft() {
    return this._entityLeft;
  }
  get entityRight() {
    return this._entityRight;
  }
  zoomIn(isHeld = false) {
    let zoomMultiplier = 1;
    const zoomSensitivity = isHeld ? this._zoomSensitivity.hold : this._zoomSensitivity.click;
    zoomMultiplier /= Math.pow(2, zoomSensitivity);
    const cameraManager = this.app.getManager("camera");
    cameraManager.zoom(zoomMultiplier, this._cameraEntityLeft);
    cameraManager.zoom(zoomMultiplier, this._cameraEntityRight);
  }
  zoomOut(isHeld = false) {
    let zoomMultiplier = 1;
    const zoomSensitivity = isHeld ? this._zoomSensitivity.hold : this._zoomSensitivity.click;
    zoomMultiplier *= Math.pow(2, zoomSensitivity);
    const cameraManager = this.app.getManager("camera");
    cameraManager.zoom(zoomMultiplier, this._cameraEntityLeft);
    cameraManager.zoom(zoomMultiplier, this._cameraEntityRight);
  }
  async compare(leftEntityId, rightEntityId) {
    const sceneManager = this.app.getManager("scene");
    this._entityLeft && this._entityLeft.getName() !== leftEntityId && (this._sceneLeft.removeEntity(this._entityLeft), sceneManager.removeLoading(this._entityLeft.getName(), "compare"), this._entityLeft = null);
    this._entityRight && this._entityRight.getName() !== rightEntityId && (this._sceneRight.removeEntity(this._entityRight), sceneManager.removeLoading(this._entityRight.getName(), "compare"), this._entityRight = null);
    const contentManager = this.app.getManager("content");
    const labelManager = this.app.getManager("label");
    if (!this._entityLeft) {
      this._entityLeft = SolarSystemSceneExports.Entity.create(leftEntityId, this._sceneLeft);
      this._entityLeft.clearParentingTableEntries();
      this._entityLeft.clearControllers();
      this._entityLeft.setParent(this._anchorEntityLeft);
      this._entityLeft.setPosition(Pioneer.Vector3.Zero);
      const quaternion = new Pioneer.Quaternion();
      this._getCustomRotation(quaternion, leftEntityId, "left");
      this._entityLeft.setOrientation(quaternion);
      labelManager.setLabelProps({
        getLabelClass: entityId => `no-select ${contentManager.getClassName(entityId, "") ?? ""}`,
        handleTouch: null,
        handleClick: null
      }, [leftEntityId], this._sceneLeft, this._cameraEntityLeft);
    }
    if (!this._entityRight) {
      this._entityRight = SolarSystemSceneExports.Entity.create(rightEntityId, this._sceneRight);
      this._entityRight.clearParentingTableEntries();
      this._entityRight.clearControllers();
      this._entityRight.setParent(this._anchorEntityRight);
      this._entityRight.setPosition(Pioneer.Vector3.Zero);
      const quaternion = new Pioneer.Quaternion();
      this._getCustomRotation(quaternion, rightEntityId, "right");
      this._entityRight.setOrientation(quaternion);
      labelManager.setLabelProps({
        getLabelClass: entityId => `no-select ${contentManager.getClassName(entityId, "") ?? ""}`,
        handleTouch: null,
        handleClick: null
      }, [rightEntityId], this._sceneRight, this._cameraEntityRight);
    }
    if (this._updateSuns(), !this._viewportLeft.isEnabled()) {
      for (let viewportIndex = 0, viewportCount = this.pioneer.getNumViewports(); viewportIndex < viewportCount; viewportIndex++) {
        const viewport = this.pioneer.getViewportAt(viewportIndex);
        viewport.isEnabled() && (this._activeViewports.push(viewportIndex), viewport.setEnabled(false));
      }
      this._viewportLeft.setEnabled(true);
      this._viewportRight.setEnabled(true);
      this.setCameraLight(true);
      const customEvent = new CustomEvent("comparisonenter", {
        detail: {}
      });
      window.dispatchEvent(customEvent);
    }
    const leftFitDistance = SolarSystemSceneExports.Cameras.getDistanceToFitEntities(this._cameraEntityLeft, Pioneer.Quaternion.Identity, this._entityLeft, [this._entityLeft]);
    const rightFitDistance = SolarSystemSceneExports.Cameras.getDistanceToFitEntities(this._cameraEntityRight, Pioneer.Quaternion.Identity, this._entityRight, [this._entityRight]);
    let comparisonDistance = Math.max(rightFitDistance, leftFitDistance);
    comparisonDistance *= 1.6;
    const vector3 = new Pioneer.Vector3();
    vector3.setMagnitude(Pioneer.Vector3.YAxisNeg, comparisonDistance);
    const rightDestination = new Pioneer.Vector3();
    rightDestination.setMagnitude(Pioneer.Vector3.YAxisNeg, comparisonDistance);
    this._cameraEntityLeft.clearControllers();
    this._cameraEntityRight.clearControllers();
    const customEvent = new CustomEvent("cameracompare", {
      detail: {
        left: leftEntityId,
        right: rightEntityId
      }
    });
    window.dispatchEvent(customEvent);
    const cameraManager = this.app.getManager("camera");
    const leftTransition = cameraManager.goToEntity("anchorLeft", {
      minRadius: .5 * comparisonDistance,
      maxRadius: 10 * comparisonDistance,
      camera: this._cameraEntityLeft,
      destination: vector3,
      destinationUp: Pioneer.Vector3.ZAxis,
      scene: this._sceneLeft,
      select: false,
      zoom: true,
      cinematic: true
    });
    const rightTransition = cameraManager.goToEntity("anchorRight", {
      minRadius: .5 * comparisonDistance,
      maxRadius: 10 * comparisonDistance,
      camera: this._cameraEntityRight,
      destination: rightDestination,
      destinationUp: Pioneer.Vector3.ZAxis,
      scene: this._sceneRight,
      select: false,
      zoom: true,
      cinematic: true
    });
    await Promise.all([leftTransition, rightTransition]);
    sceneManager.addLoading(this._entityLeft.getName(), "compare");
    sceneManager.addLoading(this._entityRight.getName(), "compare");
    await Promise.all([this._entityLeft.getLoadedPromise(), this._entityRight.getLoadedPromise()]);
    sceneManager.removeLoading(this._entityLeft.getName(), "compare");
    sceneManager.removeLoading(this._entityRight.getName(), "compare");
  }
  setCameraLight(enabled, lightColor) {
    this._cameraLightLeft.setEnabled(enabled);
    this._cameraLightRight.setEnabled(enabled);
    void 0 !== lightColor && (this._cameraLightLeft.setColor(lightColor), this._cameraLightRight.setColor(lightColor));
    this._updateSuns();
  }
  exit() {
    this._entityLeft && (this._sceneLeft.removeEntity(this._entityLeft), this._entityLeft = null);
    this._entityRight && (this._sceneRight.removeEntity(this._entityRight), this._entityRight = null);
    this.app.getManager("scene").removeLoading("*", "compare");
    this._viewportLeft.setEnabled(false);
    this._viewportRight.setEnabled(false);
    for (let activeIndex = 0; activeIndex < this._activeViewports.length; activeIndex++) {
      const viewportIndex = this._activeViewports[activeIndex];
      this.pioneer.getViewportAt(viewportIndex).setEnabled(true);
    }
    this._activeViewports = [];
    const customEvent = new CustomEvent("comparisonexit", {
      detail: {}
    });
    window.dispatchEvent(customEvent);
  }
  _updateSuns() {
    const showLeftSun = "sun" !== this._entityLeft?.getName() && (!this._cameraLightLeft.isEnabled() || this._cameraLightLeft.getColor().min() < 1);
    const showRightSun = "sun" !== this._entityRight?.getName() && (!this._cameraLightRight.isEnabled() || this._cameraLightRight.getColor().min() < 1);
    this._sunLeft.getComponent(Pioneer.SpheroidLODComponent).setEnabled(showLeftSun);
    this._sunLeft.getComponent(Pioneer.AtmosphereComponent).setEnabled(showLeftSun);
    this._sunLeft.getComponent(Pioneer.SpriteComponent).setEnabled(showLeftSun);
    this._sunLeft.getComponent(Pioneer.LightSourceComponent).setEnabled(showLeftSun);
    this._sunRight.getComponent(Pioneer.SpheroidLODComponent).setEnabled(showRightSun);
    this._sunRight.getComponent(Pioneer.AtmosphereComponent).setEnabled(showRightSun);
    this._sunRight.getComponent(Pioneer.SpriteComponent).setEnabled(showRightSun);
    this._sunRight.getComponent(Pioneer.LightSourceComponent).setEnabled(showRightSun);
  }
  _adjustZoomFromViewport() {
    if (!this._viewportLeft.isEnabled()) return;
    if (!this._viewportRight.isEnabled()) return;
    let synchronizedDistance = this._cameraEntityLeft.getPosition().magnitude();
    Number.isNaN(synchronizedDistance) && (synchronizedDistance = 1);
    const activeViewport = this.app.pioneer.getInput().getActiveViewport();
    activeViewport && "right-viewport" === activeViewport.getName() && (synchronizedDistance = this._cameraEntityRight.getPosition().magnitude(), Number.isNaN(synchronizedDistance) && (synchronizedDistance = 1));
    const leftPosition = Pioneer.Vector3.pool.get();
    leftPosition.setMagnitude(this._cameraEntityLeft.getPosition(), synchronizedDistance);
    const rightPosition = Pioneer.Vector3.pool.get();
    rightPosition.setMagnitude(this._cameraEntityRight.getPosition(), synchronizedDistance);
    this._cameraEntityLeft.setPosition(leftPosition);
    this._cameraEntityRight.setPosition(rightPosition);
    Pioneer.Vector3.pool.release(leftPosition);
    Pioneer.Vector3.pool.release(rightPosition);
  }
  _getCustomRotation(outputRotation, entityId, side) {
    if (outputRotation.set(1, 0, 0, 0), void 0 !== this._customRotations[entityId]) {
      const rotationSteps = this._customRotations[entityId];
      for (let stepIndex = 0, stepCount = rotationSteps.length; stepIndex < stepCount; stepIndex++) {
        let rotationAxis;
        if ("x" === rotationSteps[stepIndex][0]) rotationAxis = Pioneer.Vector3.XAxis;else if ("y" === rotationSteps[stepIndex][0]) rotationAxis = Pioneer.Vector3.YAxis;else {
          if ("z" !== rotationSteps[stepIndex][0]) throw new Error(`Invalid model rotate axis "${rotationSteps[stepIndex][0]}".`);
          rotationAxis = Pioneer.Vector3.ZAxis;
        }
        let rotationAngle = rotationSteps[stepIndex][1];
        rotationAngle = Pioneer.MathUtils.degToRad(rotationAngle);
        const quaternion = new Pioneer.Quaternion();
        quaternion.setFromAxisAngle(rotationAxis, rotationAngle);
        outputRotation.mult(outputRotation, quaternion);
      }
    }
  }
}
export { ComparisonManager };
