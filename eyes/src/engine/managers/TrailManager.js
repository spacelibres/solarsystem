// Recovered from app.js:1252118-1257302.
/* 轨迹和解析轨道线按实体类型分开管理；悬停临时改变线宽与透明度，图层开关还核对目录分类与 forceVisible。show/hide 保存隐藏 id 集合，轨道线替换原 TrailComponent 后仍沿用原图层状态。 */
import * as Pioneer from "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
class TrailManager extends EyesPublicApi.BaseManager {
  constructor(app, scene) {
    super(app);
    this._scene = scene;
    this._ids = [];
    this._hiddenIds = [];
    this._opacity = {
      primary: .75,
      secondary: .35,
      hover: 1
    };
    this._width = {
      default: [0, 2],
      hover: [2, 4]
    };
    this._orbitLinesOpts = {
      lineWidth: {
        default: 1.2,
        hover: 2
      },
      glowWidth: {
        default: 0,
        hover: 0
      },
      visibleInterval: Pioneer.VisibleInterval.DefaultVisibleFar
    };
    this._orbitLineEntityNames = SolarSystemSceneExports.Entity.getEntityNamesInGroup("planets").add("moon");
    this._colors = {
      default: new Pioneer.Color(1, 1, 1, this._opacity.secondary),
      mercury: new Pioneer.Color(151 / 255, 104 / 255, 172 / 255, this._opacity.primary),
      venus: new Pioneer.Color(176 / 255, 121 / 255, 25 / 255, this._opacity.primary),
      earth: new Pioneer.Color(0, .6, .8, this._opacity.primary),
      mars: new Pioneer.Color(154 / 255, 78 / 255, 25 / 255, this._opacity.primary),
      jupiter: new Pioneer.Color(218 / 255, 139 / 255, 114 / 255, this._opacity.primary),
      saturn: new Pioneer.Color(213 / 255, 193 / 255, 135 / 255, this._opacity.primary),
      uranus: new Pioneer.Color(104 / 255, .8, 218 / 255, this._opacity.primary),
      neptune: new Pioneer.Color(112 / 255, 140 / 255, 227 / 255, this._opacity.primary)
    };
    this.bindFunctions(["onHoverChange", "setUpTrail", "toggleTrails", "toggleOrbits"]);
  }
  setScene(scene) {
    this._scene = scene;
  }
  create(entityId) {
    if (this._scene.getEntity(entityId).getComponent(Pioneer.TrailComponent)) return void console.warn("Trail already exists for", entityId);
    const trailComponent = this._scene.getEntity(entityId).addComponent(Pioneer.TrailComponent);
    this._ids.push(entityId);
    return trailComponent;
  }
  setStartTime(entityIds, startTime) {
    Array.isArray(entityIds) || (entityIds = [entityIds]);
    for (let entityIndex = 0; entityIndex < entityIds.length; entityIndex++) {
      const trailComponent = this._scene.getEntity(entityIds[entityIndex]).getComponent(Pioneer.TrailComponent);
      trailComponent && trailComponent.setStartTime(startTime);
    }
  }
  setEndTime(entityIds, endTime) {
    Array.isArray(entityIds) || (entityIds = [entityIds]);
    for (let entityIndex = 0; entityIndex < entityIds.length; entityIndex++) {
      const trailComponent = this._scene.getEntity(entityIds[entityIndex]).getComponent(Pioneer.TrailComponent);
      trailComponent && trailComponent.setEndTime(endTime);
    }
  }
  onHoverChange(entityId, isHovered, updateFade = false) {
    const entity = this._scene.getEntity(entityId);
    const trailComponent = this._scene.getEntity(entityId).getComponent(Pioneer.TrailComponent);
    const orbitLineComponent = entity?.getComponent(SolarSystemSceneExports.OrbitLineComponent);
    if (!entity || !trailComponent && !orbitLineComponent) return;
    const color = new Pioneer.Color();
    const lineComponent = trailComponent ?? orbitLineComponent;
    const hoverState = isHovered ? "hover" : "default";
    if (orbitLineComponent) {
      const {
        lineWidth: lineWidth,
        glowWidth: glowWidth
      } = this._orbitLinesOpts;
      orbitLineComponent.setLineWidth(lineWidth[hoverState]);
      orbitLineComponent.setGlowWidth(glowWidth[hoverState]);
    } else if (trailComponent) {
      const widths = entity.trailHover?.width?.[hoverState] ?? this._width[hoverState];
      trailComponent.setWidths(...widths);
    }
    const {
      primary: primary,
      secondary: secondary,
      hover: hover
    } = this._opacity;
    const opacity = isHovered ? hover : this._colors[entityId] ? primary : secondary;
    color.copy(lineComponent.getColor());
    color.a = opacity;
    lineComponent.setColor(color);
    updateFade && trailComponent.setAlphaFade(color.a);
  }
  setFade(entityIds, alphaFade) {
    Array.isArray(entityIds) || (entityIds = [entityIds]);
    for (let entityIndex = 0; entityIndex < entityIds.length; entityIndex++) {
      const trailComponent = this._scene.getEntity(entityIds[entityIndex]).getComponent(Pioneer.TrailComponent);
      trailComponent && trailComponent.setAlphaFade(alphaFade);
    }
  }
  setWidths(entityIds, startWidth, endWidth) {
    Array.isArray(entityIds) || (entityIds = [entityIds]);
    for (let entityIndex = 0; entityIndex < entityIds.length; entityIndex++) {
      const trailComponent = this._scene.getEntity(entityIds[entityIndex]).getComponent(Pioneer.TrailComponent);
      trailComponent && trailComponent.setWidths(startWidth, endWidth);
    }
  }
  setMultipleWidths(entityIds, startWidth, endWidth) {
    for (const entityId of entityIds) {
      const trailComponent = this._scene.getEntity(entityId).getComponent(Pioneer.TrailComponent);
      trailComponent && trailComponent.setWidths(startWidth, endWidth);
    }
  }
  getColor(entityId) {
    const trailComponent = this._scene.getEntity(entityId).getComponent(Pioneer.TrailComponent);
    return trailComponent ? trailComponent.getColor() : null;
  }
  setColor(entityIds, suppliedColor = null) {
    Array.isArray(entityIds) || (entityIds = [entityIds]);
    for (let entityIndex = 0; entityIndex < entityIds.length; entityIndex++) {
      const entityId = entityIds[entityIndex];
      const trailComponent = this._scene.getEntity(entityId).getComponent(Pioneer.TrailComponent);
      if (trailComponent) {
        const trailColor = suppliedColor instanceof Pioneer.Color ? suppliedColor : this._colors[entityId] || this._colors.default;
        trailComponent.setColor(trailColor);
      }
    }
  }
  setUpTrail(entity) {
    const layerManager = this._app.getManager("layer");
    const sceneManager = this._app.getManager("scene");
    const entityId = entity.getName();
    const trailsLayer = layerManager.getLayer("trails");
    const useOrbitLine = this._orbitLineEntityNames.has(entityId);
    useOrbitLine && this.createOrbitLine(entity);
    (null !== trailsLayer && !trailsLayer.visible || useOrbitLine) && sceneManager.setVisibility(false, entityId);
  }
  show(entityIds = null) {
    null === entityIds ? entityIds = this._hiddenIds.length > 0 ? this._hiddenIds : this._ids : Array.isArray(entityIds) || (entityIds = [entityIds]);
    for (let entityIndex = 0; entityIndex < entityIds.length; entityIndex++) {
      const entityId = entityIds[entityIndex];
      const trailComponent = this._scene.getEntity(entityId).getComponent(Pioneer.TrailComponent);
      if (trailComponent) {
        const hiddenIndex = this._hiddenIds.indexOf(entityId);
        -1 !== hiddenIndex && this._hiddenIds.splice(hiddenIndex, 1);
        trailComponent.setEnabled(true);
      } else console.warn("TrailManager.show: Trail does not exist - ", entityId);
    }
  }
  hide(hiddenIds = null) {
    null === hiddenIds ? hiddenIds = this._ids : Array.isArray(hiddenIds) || (hiddenIds = [hiddenIds]);
    this._hiddenIds = hiddenIds;
    for (let entityIndex = 0; entityIndex < hiddenIds.length; entityIndex++) {
      const trailComponent = this._scene.getEntity(hiddenIds[entityIndex]).getComponent(Pioneer.TrailComponent);
      trailComponent && trailComponent.setEnabled(false);
    }
  }
  toggleTrails(isVisible, {
    scene: scene
  } = {}) {
    void 0 === scene && (scene = this._scene);
    for (let entityIndex = 0; entityIndex < scene.getNumEntities(); entityIndex++) {
      const entity = scene.getEntityAt(entityIndex);
      const trailComponent = entity.getComponent(Pioneer.TrailComponent);
      if (null !== trailComponent) {
        const entityInfo = this._app.getManager("content").getEntityInfo(entity.getName());
        if (entityInfo) {
          const category = entityInfo.category;
          const subcategory = entityInfo.subcategory;
          const categoryLayer = this._app.getManager("layer").getLayerFromCategory(subcategory) || this._app.getManager("layer").getLayerFromCategory(category);
          const {
            forceVisible = false
          } = this.app.getManager("scene").getEntityStatus(entity.getName()) || {};
          null === categoryLayer || categoryLayer.visible || forceVisible ? trailComponent.setEnabled(isVisible) : trailComponent.setEnabled(false);
        } else trailComponent.setEnabled(isVisible);
      }
    }
  }
  createOrbitLine(entity) {
    const trailComponent = entity.getComponent(Pioneer.TrailComponent);
    trailComponent && entity.removeComponent(trailComponent);
    const orbitLineComponent = entity.addComponent(SolarSystemSceneExports.OrbitLineComponent);
    const {
      lineWidth: lineWidth,
      glowWidth: glowWidth,
      visibleInterval: visibleInterval
    } = this._orbitLinesOpts;
    const lineColor = this._colors[entity.getName()] ?? this._colors.default;
    orbitLineComponent.setColor(lineColor);
    orbitLineComponent.setVisibleInterval(visibleInterval);
    orbitLineComponent.setLineWidth(lineWidth.default);
    orbitLineComponent.setGlowWidth(glowWidth.default);
    const isVisible = this._app.getManager("layer").getLayer("orbits").visible;
    orbitLineComponent.setEnabled(isVisible);
  }
  toggleOrbits(isVisible) {
    this._orbitLineEntityNames.forEach(entityId => {
      const orbitLineComponent = this._scene.getEntity(entityId)?.getComponent(SolarSystemSceneExports.OrbitLineComponent);
      orbitLineComponent?.setEnabled(isVisible);
    });
  }
  get ids() {
    return this._ids;
  }
  set ids(entityIds) {
    Array.isArray(entityIds) || (entityIds = [entityIds]);
    for (let entityIndex = 0; entityIndex < entityIds.length; entityIndex++) {
      const entityId = entityIds[entityIndex];
      if (this._ids.includes(entityId)) continue;
      this._scene.getEntity(entityId).getComponent(Pioneer.TrailComponent) && this._ids.push(entityId);
    }
  }
}
export { TrailManager };
