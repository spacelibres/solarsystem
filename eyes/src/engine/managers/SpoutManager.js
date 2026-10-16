// Recovered from app.js:1303647-1307038.
/* Spout 使用独立隐藏 viewport 与可选地球仪相机；标签从 DOM DivComponent 转成 LabelComponent 并排除常规相机。构造时默认目标仍按原实现保存异步返回值，本轮不改变初始化时序。 */
import * as Pioneer from "../pioneer/index.js";
import "../solar-system/public-api.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
class SpoutManager extends EyesPublicApi.BaseManager {
  constructor(app) {
    super(app);
    this._scene = this.app.pioneer.getScene("main");
    this._defaultTarget = this.getSpoutCameraTargetEntity(this.app.getManager("router").currentRoute.params);
    this._defaultTargetRadius = this._defaultTarget ? this._scene.getEntity(this._defaultTarget)?.getExtentsRadius() : this._scene.getEntity("earth").getExtentsRadius();
  }
  async enableSpout(forGlobe = false, renderWidth = 2048, globeDistance = 2 * this._defaultTargetRadius, targetEntityId = this._defaultTarget, fontSize = 25, longitudeOffsetDegrees = 0, alignToNorthPole = false) {
    const spoutViewport = this.app.pioneer.getViewport("spoutViewport") || this.app.pioneer.addViewport("spoutViewport");
    spoutViewport.getDiv().style.display = "none";
    spoutViewport.getDiv().style.width = "100%";
    spoutViewport.getDiv().style.height = "100%";
    const targetEntity = this._scene.getEntity(targetEntityId) || this._scene.getEntity("earth");
    const cameraEntity = this.setUpSpoutCamera(forGlobe, targetEntity, alignToNorthPole, longitudeOffsetDegrees);
    const spoutComponent = cameraEntity.getComponent(Pioneer.SpoutComponent) ?? cameraEntity.addComponent(Pioneer.SpoutComponent);
    spoutViewport.setCamera(spoutComponent);
    spoutComponent.setRenderWidth(renderWidth);
    this._scene.setAmbientLightColor(new Pioneer.Color(1, 1, 1));
    true === forGlobe && (spoutComponent.setForGlobe(true, globeDistance || 2 * targetEntity.getExtentsRadius()), spoutComponent.setNearDistance(.5 * targetEntity.getExtentsRadius()), targetEntity.getComponent(Pioneer.AtmosphereComponent)?.setExcludedFromCamera(spoutComponent, true));
    await this.setUpSpoutLabels(fontSize, targetEntity);
  }
  setUpSpoutCamera(forGlobe, targetEntity = this._defaultTarget, alignToNorthPole = false, longitudeOffsetDegrees = 0) {
    let cameraEntity;
    if (true === forGlobe) {
      cameraEntity = this._scene.getEntity("spoutCamera") || this._scene.addEntity("spoutCamera");
      cameraEntity.clearControllers();
      cameraEntity.setParent(targetEntity);
      cameraEntity.setPosition(Pioneer.Vector3.Zero);
      cameraEntity.setOrientation(Pioneer.Quaternion.Identity);
      const alignController = cameraEntity.addController(Pioneer.AlignController);
      alignController.setPrimaryAlignType("align");
      alignController.setPrimaryAxis(Pioneer.Vector3.ZAxis);
      alignController.setPrimaryTargetAxis(Pioneer.Vector3.ZAxis);
      alignToNorthPole ? alignController.setPrimaryTargetEntity(targetEntity.getName()) : alignController.setPrimaryTargetEntity("camera");
      const vector3 = new Pioneer.Vector3();
      Pioneer.Geometry.getXYZFromLLAOnSphere(vector3, new Pioneer.LatLonAlt(0, Pioneer.MathUtils.degToRad(180 + longitudeOffsetDegrees), 1), 1);
      alignController.setSecondaryAlignType("align");
      alignController.setSecondaryAxis(Pioneer.Vector3.XAxis);
      alignController.setSecondaryTargetEntity("camera");
      alignController.setSecondaryTargetAxis(vector3);
    } else cameraEntity = this._scene.getEntity("camera");
    return cameraEntity;
  }
  async setUpSpoutLabels(fontSize = 25, suppliedTarget = null) {
    let targetEntityId = suppliedTarget;
    suppliedTarget || (targetEntityId = (await this.getSpoutCameraTargetEntity(this.app.getManager("router").currentRoute.params)) || "sun");
    for (let entityIndex = 0; entityIndex < this._scene.getNumEntities(); entityIndex++) {
      const entity = this._scene.getEntityAt(entityIndex);
      const divComponent = entity.getComponent(Pioneer.DivComponent);
      if (divComponent instanceof Pioneer.DivComponent) {
        const labelComponent = entity.getComponent(Pioneer.LabelComponent) ?? entity.addComponent(Pioneer.LabelComponent);
        labelComponent.setText(divComponent.getDiv().querySelector(".text")?.innerHTML || divComponent.getDiv()?.textContent || "");
        labelComponent.setColor(new Pioneer.Color(1, 1, 1, 1));
        labelComponent.setFontSize(fontSize);
        labelComponent.setAlignment(new Pioneer.Vector2(0, .5));
        labelComponent.setPixelOffset(new Pioneer.Vector2(-fontSize / 4, -1));
        labelComponent.setExcludedFromCamera(this._scene.getEntity("camera").getComponent(Pioneer.CameraComponent), true);
      }
    }
  }
  async getSpoutCameraTargetEntity(routeParams) {
    let targetEntityId = null;
    const contentManager = this.app.getManager("content");
    if (routeParams) {
      const routeEntityId = "feature" in routeParams && "moons" === routeParams.feature ? routeParams.child : routeParams.spaceObject;
      const routeEntity = this.pioneer.getScene("main").getEntity(routeEntityId) ?? this.pioneer.getScene("main").getEntity("earth");
      const entityInfo = contentManager.getEntityInfo(routeEntityId) || {};
      const entityDescription = await contentManager.getEntityDesc(routeEntityId);
      const parentEntityId = routeEntityId && this.pioneer.getScene("main").getEntity(routeEntityId)?.getParent()?.getName();
      switch (entityInfo.category) {
        case "Spacecraft":
          targetEntityId = EyesPublicApi.AppUtils.isFutureMission(entityDescription?.dates?.start) ? "earth" : routeEntity?.getParent()?.getName();
          entityInfo.keywords.includes("lander") && routeEntity.getParent().getName().includes("landing_site") && (targetEntityId = this.pioneer.getScene("main").getEntity(routeEntityId)?.getParent()?.getParent()?.getName());
          break;
        case "Landing site":
          targetEntityId = parentEntityId;
          break;
        default:
          targetEntityId = routeEntityId;
      }
    }
    return targetEntityId;
  }
}
export { SpoutManager };
