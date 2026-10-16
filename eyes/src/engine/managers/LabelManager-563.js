// Recovered from app.js:690604-698144.
/* 该场景层管理器拥有标签 DOM、四叉树权重与可点击例外集；轻量包装层仍独立保留。重建标签内容保留 DivComponent 外壳，事件监听仅按属性标记安装一次；默认点击/触摸读取当前可点击状态，触摸还检查拖动与多指状态。自定义处理函数接收原事件和实体 ID，关闭交互不会删除监听。 */
import * as Pioneer from "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
class LabelManager extends EyesPublicApi.BaseManager {
  constructor(app, scene, viewport) {
    super(app);
    this._scene = scene;
    this._eventNames.push("hoverchange", "labelclicked");
    this._initCallbacks();
    this._viewport = viewport;
    this._labelQuadtree = new SolarSystemSceneExports.LabelQuadtree(viewport);
    this._focusRect = new Pioneer.Rect();
    this._focusSize = .05;
    this._focusIntersectionRects = new Pioneer.FastMap();
    this._iconMap = {
      Universe: "no-icon",
      Galaxy: "no-icon",
      Star: "no-icon",
      Barycenter: "icon-circle-white-small",
      "Landing site": "icon-hexagon",
      Moon: "icon-circle-white-small",
      Asteroid: "icon-circle-white-small",
      "Dwarf Planet": "icon-circle-white-small",
      Comet: "icon-circle-white-small",
      Spacecraft: "icon-hexagon",
      Planet: "icon-circle-",
      Default: "icon-circle-white-small"
    };
    this._weightMap = {
      Universe: 100,
      Galaxy: 100,
      Star: 100,
      Barycenter: 0,
      "Landing site": 5,
      Asteroid: 15,
      Comet: 15,
      Moon: 25,
      "Dwarf Planet": 28,
      Spacecraft: 30,
      Planet: 50,
      Constellation: 10
    };
    this._weights = {};
    this._labels = {};
    this._isClickable = true;
    this._exceptions = new Set();
    this.bindFunctions(["update", "addLabel", "removeLabel", "toggleLabels", "toggleLabelForEntity", "toggleIcons", "toggleIconForEntity", "_clickCallback", "setUpLabel", "setUpIcon"]);
  }
  update() {
    const viewportSize = this._viewport.getBounds().size;
    const focusDiameter = Math.max(viewportSize.x, viewportSize.y) * this._focusSize;
    this._focusRect.set((viewportSize.x - focusDiameter) / 2, (viewportSize.y - focusDiameter) / 2, focusDiameter, focusDiameter);
    this._labelQuadtree.setBounds("__focus", this._focusRect);
    this._labelQuadtree.update();
  }
  initLabelWeights(weightDefinitions, resetExisting = true) {
    resetExisting && (this._weights = {});
    const labelManager = this._app.getManager("label");
    for (const weightId of Object.keys(weightDefinitions)) {
      const category = weightDefinitions[weightId].category;
      this._weights[weightId] = {};
      void 0 !== this._weightMap[category] ? this._weights[weightId].weight = this._weightMap[category] : this._weights[weightId].weight = 1;
      resetExisting && labelManager._labels[weightId] && labelManager.setWeight(weightId, this._weights[weightId].weight);
    }
  }
  setWeight(entityId, weight) {
    try {
      this._labelQuadtree.setWeight(entityId, weight);
      return true;
    } catch (missingLabelError) {
      return false;
    }
  }
  resetWeight(entityId) {
    const contentManager = this._app.getManager("content");
    const category = contentManager?.getEntityInfo(entityId)?.category;
    const defaultWeight = this.getDefaultWeight(entityId, category);
    this._labelQuadtree.setWeight(entityId, defaultWeight);
  }
  getDefaultWeight(entityId, category = void 0) {
    return entityId.startsWith("constellation_") ? this._weightMap.Constellation : Object.keys(this._weights).length > 0 && void 0 !== this._weights[entityId] ? this._weights[entityId].weight : void 0 !== this._weightMap[category] ? this._weightMap[category] : 0;
  }
  getWeightMap() {
    return this._weightMap;
  }
  setWeightMap(weightMap) {
    this._weightMap = weightMap;
  }
  setUpLabel(entity) {
    const contentManager = this._app.getManager("content");
    const layerManager = this._app.getManager("layer");
    const category = contentManager.getEntityInfo(entity.getName())?.category;
    const defaultWeight = this.getDefaultWeight(entity.getName(), category);
    this.addLabel(entity, defaultWeight);
    this.setLabelProps({
      getLabelClass: labelEntityId => `no-select ${contentManager.getClassName(labelEntityId) ?? ""}`
    }, [entity.getName()]);
    const entityId = entity.getName();
    const labelsLayer = layerManager.getLayer("labels");
    null === labelsLayer || labelsLayer.visible || this.toggleLabelForEntity(false, entityId);
  }
  addLabel(entity, weight) {
    entity.getComponent(Pioneer.DivComponent) && (this._labels[entity.getName()] = {
      name: entity.getName(),
      el: entity.getComponent(Pioneer.DivComponent).getDiv(),
      isClickable: true
    }, this._labelQuadtree.addEntity(entity, weight));
  }
  removeLabel(entityId) {
    entityId.getComponent(Pioneer.DivComponent) && (delete this._labels[entityId.getName()], this._labelQuadtree.removeEntity(entityId.getName()));
  }
  setUpIcon(entity) {
    const layerManager = this._app.getManager("layer");
    const entityId = entity.getName();
    const iconsLayer = layerManager.getLayer("icons");
    null === iconsLayer || iconsLayer.visible || this.toggleIconForEntity(false, entityId);
  }
  setLabelClickable(entityId, isClickable) {
    this._labels[entityId] && (this._labels[entityId].isClickable = isClickable, this._labels[entityId].el.classList.toggle("clickable", isClickable));
  }
  setClickable(isClickable) {
    this._isClickable = isClickable;
    for (let entityIndex = 0, entityCount = this._scene.getNumEntities(); entityIndex < entityCount; entityIndex++) {
      const divComponent = this._scene.getEntityAt(entityIndex).getComponent(Pioneer.DivComponent);
      if (null !== divComponent) {
        const labelElement = divComponent.getDiv();
        isClickable ? labelElement.classList.remove("unclickable") : labelElement.classList.add("unclickable");
      }
    }
  }
  addException(entityId) {
    this._exceptions.add(entityId);
  }
  removeException(entityId) {
    this._exceptions.delete(entityId);
  }
  addExceptions(entityIds) {
    entityIds.forEach(entityId => this._exceptions.add(entityId));
  }
  removeExceptions(entityIds) {
    entityIds.forEach(entityId => this._exceptions.delete(entityId));
  }
  toggleLabels(visible, {
    scene: scene
  } = {}) {
    void 0 === scene && (scene = this._scene);
    for (let entityIndex = 0; entityIndex < scene.getNumEntities(); entityIndex++) this.toggleLabelForEntity(visible, scene.getEntityAt(entityIndex).getName(), {
      scene: scene
    });
  }
  toggleLabelForEntity(visible, entityId, {
    scene: scene
  } = {}) {
    let targetScene = scene;
    void 0 === targetScene && (targetScene = this._scene);
    const entity = targetScene.getEntity(entityId);
    const divComponent = entity.getComponent(Pioneer.DivComponent);
    this._exceptions.has(entity.getName()) || null !== divComponent && (visible ? divComponent.getDiv().lastElementChild?.classList.remove("hidden") : divComponent.getDiv().lastElementChild?.classList.add("hidden"));
  }
  toggleIcons(visible, {
    scene: scene
  } = {}) {
    void 0 === scene && (scene = this._scene);
    for (let entityIndex = 0; entityIndex < scene.getNumEntities(); entityIndex++) this.toggleIconForEntity(visible, scene.getEntityAt(entityIndex).getName(), {
      scene: scene
    });
  }
  toggleIconForEntity(visible, entityId, {
    scene: scene
  } = {}) {
    let targetScene = scene;
    void 0 === targetScene && (targetScene = this._scene);
    const entity = targetScene.getEntity(entityId);
    const divComponent = entity.getComponent(Pioneer.DivComponent);
    this._exceptions.has(entity.getName()) || null !== divComponent && (visible ? divComponent.getDiv().firstElementChild?.classList.remove("hidden") : divComponent.getDiv().firstElementChild?.classList.add("hidden"));
  }
  _getLink(entityId) {
    return `/${entityId}`;
  }
  _clickCallback(entity) {
    const routerManager = this._app.getManager("router");
    const link = this._getLink(entity.getName());
    const routePath = "string" == typeof link ? link : link.path ?? "";
    const {
      options: navigationOptions = {
        keepTime: true
      },
      query: queryParams = {}
    } = "object" == typeof link && link;
    routerManager.navigate(queryParams, routePath, navigationOptions);
  }
  setLabelProps({
    getLabelClass: getLabelClass,
    getIconClass: getIconClass,
    getTextClass: getTextClass,
    handleClick: handleClick,
    handleTouch: handleTouch,
    handleMouseEnter: handleMouseEnter,
    handleMouseLeave: handleMouseLeave
  } = {}, entityIds = Object.keys(this._labels), sceneOverride, cameraOverride) {
    let targetScene = sceneOverride;
    targetScene || (targetScene = this._scene);
    let cameraEntity = cameraOverride;
    cameraEntity || (cameraEntity = targetScene.getEntity("camera"));
    const cameraComponent = cameraEntity.getComponent(Pioneer.CameraComponent);
    for (const entityId of entityIds) {
      const entity = targetScene.getEntity(entityId);
      const entityInfo = this._app.getManager("content").getEntityInfo(entityId);
      const divComponent = entity.getComponent(Pioneer.DivComponent);
      if (null === divComponent) continue;
      divComponent.setActiveCamera(cameraComponent);
      const labelElement = divComponent.getDiv();
      const labelClass = "function" == typeof getLabelClass ? getLabelClass(entityId) : "";
      labelElement.className += ` ${labelClass} clickable`;
      const iconElement = document.createElement("span");
      const textElement = document.createElement("span");
      const categoryIconClass = this._iconMap[entityInfo?.category] ?? this._iconMap.Default;
      const planetIconSuffix = "Planet" === entityInfo?.category ? entityId : "";
      const customIconClass = "function" == typeof getIconClass ? getIconClass(entityId) : "";
      iconElement.className = `icon ${categoryIconClass}${planetIconSuffix} ${customIconClass}`;
      textElement.className = `text ${"function" == typeof getTextClass ? getTextClass(entityId) : ""}`;
      textElement.innerHTML = entityInfo?.displayName || entityInfo?.iauName || labelElement.innerHTML;
      labelElement.innerHTML = "";
      labelElement.appendChild(iconElement);
      labelElement.appendChild(textElement);
      const defaultClickHandler = async event => {
        const labelRecord = this._labels[entityId];
        this._isClickable && labelRecord?.isClickable && null !== this._clickCallback && (this._clickCallback(entity), event.preventDefault(), this.triggerCallbacks("labelclicked", [true]));
      };
      const defaultTouchHandler = async event => {
        const labelRecord = this._labels[entityId];
        this._isClickable && labelRecord?.isClickable && (this.app.isDragging() || this.app.isTouchMax() || null === this._clickCallback || (this._clickCallback(entity), event.preventDefault(), this.triggerCallbacks("labelclicked", [true])));
      };
      labelElement.addEventListener("mousedown", event => {
        event.preventDefault();
        this.triggerCallbacks("labelclicked", [false]);
      });
      labelElement.addEventListener("touchstart", event => {
        event.preventDefault();
        this.triggerCallbacks("labelclicked", [false]);
      });
      const clickHandler = "function" == typeof handleClick ? event => handleClick(event, entityId) : defaultClickHandler;
      const touchHandler = "function" == typeof handleTouch ? event => handleTouch(event, entityId) : defaultTouchHandler;
      const mouseEnterHandler = "function" == typeof handleMouseEnter ? event => handleMouseEnter(event, entityId) : () => this.triggerCallbacks("hoverchange", [entityId, true]);
      const mouseLeaveHandler = "function" == typeof handleMouseLeave ? event => handleMouseLeave(event, entityId) : () => this.triggerCallbacks("hoverchange", [entityId, false]);
      null !== handleClick && "true" !== labelElement.getAttribute("hasClickListener") && (labelElement.setAttribute("hasClickListener", "true"), labelElement.addEventListener("click", clickHandler));
      null !== handleTouch && "true" !== labelElement.getAttribute("hasTouchEndListener") && (labelElement.setAttribute("hasTouchEndListener", "true"), labelElement.addEventListener("touchend", touchHandler));
      null !== handleMouseEnter && "true" !== labelElement.getAttribute("hasMouseEnterListener") && (labelElement.setAttribute("hasMouseEnterListener", "true"), labelElement.addEventListener("mouseenter", mouseEnterHandler));
      null !== handleMouseLeave && "true" !== labelElement.getAttribute("hasMouseLeaveListener") && (labelElement.setAttribute("hasMouseLeaveListener", "true"), labelElement.addEventListener("mouseleave", mouseLeaveHandler));
      "true" !== labelElement.getAttribute("hasMouseMoveListener") && (labelElement.setAttribute("hasMouseMoveListener", "true"), labelElement.addEventListener("mousemove", event => {
        event.preventDefault();
      }, true));
    }
  }
  addClassToLabels(className, entityIds) {
    for (const entityId of entityIds) {
      const entity = this._scene.getEntity(entityId);
      const labelElement = entity?.getComponent(Pioneer.DivComponent)?.getDiv();
      labelElement?.classList.add(className);
    }
  }
  removeClassFromLabels(className, entityIds) {
    for (const entityId of entityIds) {
      const entity = this._scene.getEntity(entityId);
      const labelElement = entity?.getComponent(Pioneer.DivComponent)?.getDiv();
      labelElement?.classList.remove(className);
    }
  }
}
export { LabelManager };
