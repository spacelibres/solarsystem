// Recovered from app.js:225926-231270.
import * as PioneerPublicApi from "../pioneer/public-api.js";
// 场景持有实体集合与控制器依赖图；实体先保存上一帧状态及切换父级，再由依赖图按顺序更新控制器。
class Scene extends PioneerPublicApi.CollectionItem {
  constructor(sceneName, engine) {
    super(sceneName, engine);
    this._entities = new PioneerPublicApi.Collection(this);
    this._controllerDependencyGraph = new PioneerPublicApi.DependencyGraph(Scene._updateController, Scene._compareControllers);
    this._ambientLightColor = new PioneerPublicApi.Color(.02, .02, .02);
    this._lightSources = [];
    this._threeJsScene = new PioneerPublicApi.THREE.Scene();
  }
  getEngine() {
    return this.__getCollectionParent();
  }
  getEntity(entityName) {
    return this._entities.get(PioneerPublicApi.Entity, entityName);
  }
  getEntityAt(entityIndex) {
    return this._entities.getAt(entityIndex);
  }
  getNumEntities() {
    return this._entities.getSize();
  }
  addEntity(entityName) {
    return this._entities.add(PioneerPublicApi.Entity, entityName);
  }
  removeEntity(entityOrName) {
    this._entities.remove(entityOrName);
  }
  // 移动集合所有权时同步迁移控制器依赖图；灯光引用迁移保持原有实现，疑点见资源分析记录。
  moveEntity(entityOrName, targetScene) {
    let entity;
    this._entities.move(entityOrName, targetScene._entities);
    entity = "string" == typeof entityOrName ? targetScene._entities.get(PioneerPublicApi.Entity, entityOrName) : entityOrName;
    for (let controllerIndex = 0, controllerCount = entity.getNumControllers(); controllerIndex < controllerCount; controllerIndex++) {
      const controller = entity.getControllerAt(controllerIndex);
      this._controllerDependencyGraph.removeItem(controller);
      targetScene._controllerDependencyGraph.addItem(controller);
    }
    for (let lightComponentIndex = 0;; lightComponentIndex++) {
      const lightComponent = entity.getComponent(PioneerPublicApi.LightSourceComponent, lightComponentIndex);
      if (null === lightComponent || "loaded" !== lightComponent.getLoadState().state) break;
      for (let lightIndex = 0, lightCount = this._lightSources.length; lightIndex < lightCount; lightIndex++) {
        const lightRef = this._lightSources[lightIndex];
        if (lightRef.getEntityName() === entity.getName() && lightRef.getComponentNameOrClassIndex() === lightComponent.getClassIndex()) {
          this.__removeLightSource(entity.getName(), lightComponent.getClassIndex());
          this.__addLightSource(entity.getName(), lightComponent.getClassIndex());
          break;
        }
      }
    }
  }
  get(entityName, itemNameOrType, classIndex = 0) {
    const entity = this._entities.getAny(entityName);
    return void 0 === itemNameOrType || null === entity ? entity : entity.get(itemNameOrType, classIndex);
  }
  getControllerDependencyGraph() {
    return this._controllerDependencyGraph;
  }
  getAmbientLightColor() {
    return this._ambientLightColor;
  }
  setAmbientLightColor(color) {
    this._ambientLightColor.copy(color);
  }
  __addLightSource(entityName, componentClassIndex) {
    for (let lightIndex = 0, lightCount = this._lightSources.length; lightIndex < lightCount; lightIndex++) {
      const lightRef = this._lightSources[lightIndex];
      if (lightRef.getEntityName() === entityName && lightRef.getComponentNameOrClassIndex() === componentClassIndex) throw new Error(`Light source on ${entityName} with type index ${componentClassIndex} already added.`);
    }
    const componentRef = new PioneerPublicApi.ComponentRef(this, PioneerPublicApi.LightSourceComponent, entityName, componentClassIndex);
    this._lightSources.push(componentRef);
  }
  __removeLightSource(entityName, componentClassIndex = 0) {
    for (let lightIndex = 0, lightCount = this._lightSources.length; lightIndex < lightCount; lightIndex++) {
      const lightRef = this._lightSources[lightIndex];
      if (lightRef.getEntityName() === entityName && lightRef.getComponentNameOrClassIndex() === componentClassIndex) return void this._lightSources.splice(lightIndex, 1);
    }
    throw new Error(`Light source on ${entityName} with type index ${componentClassIndex} not found.`);
  }
  getLightSourceAt(lightIndex) {
    return this._lightSources[lightIndex]?.get() ?? null;
  }
  getNumLightSources() {
    return this._lightSources.length;
  }
  // 等待指定实体或全部实体；汇集失败后加上实体名，避免首个失败掩盖其余加载结果。
  async getLoadedPromise(entityNames, forceLoaded = false, timeout = Number.POSITIVE_INFINITY) {
    const entities = [];
    if (entityNames) for (const entityName of entityNames) {
      const entity = this._entities.get(PioneerPublicApi.Entity, entityName);
      if (!entity) throw new Error(`Entity "${entityName}" not added yet. Make sure it is in the scene.`);
      entities.push(entity);
    } else for (let entityIndex = 0, entityCount = this._entities.getSize(); entityIndex < entityCount; entityIndex++) entities.push(this._entities.getAt(entityIndex));
    const requests = [];
    for (let entityIndex = 0, entityCount = entities.length; entityIndex < entityCount; entityIndex++) {
      const entity = entities[entityIndex];
      requests.push(entity.getLoadedPromise(forceLoaded, timeout).catch(error => {
        if (error instanceof Error) throw new Error(`${entity.getName()} - ${error.message}`);
      }));
    }
    const results = await Promise.allSettled(requests);
    if (!results.every(result => "fulfilled" === result.status)) throw new Error(results.filter(result => "rejected" === result.status).map(result => result.reason instanceof Error ? result.reason.message : "").filter(message => "" !== message).reduce((errorMessages, message) => `${errorMessages}\n${message}`, ""));
  }
  async waitTillEntitiesInPlace(entityNames, time, timeout = Number.POSITIVE_INFINITY) {
    const entities = [];
    if (entityNames) for (const entityName of entityNames) {
      const entity = this._entities.get(PioneerPublicApi.Entity, entityName);
      if (!entity) throw new Error(`Entity "${entityName}" not added yet. Make sure it is in the scene.`);
      entities.push(entity);
    } else for (let entityIndex = 0, entityCount = this._entities.getSize(); entityIndex < entityCount; entityIndex++) entities.push(this._entities.getAt(entityIndex));
    const requests = entities.map(async entity => entity.waitTillInPlace(time, timeout).catch(() => {
      throw new Error(entity.getName());
    }));
    const remainingEntityNames = (await Promise.allSettled(requests)).filter(result => "rejected" === result.status).map(result => result.reason instanceof Error ? result.reason.message : "");
    if (remainingEntityNames.length > 0) throw new Error(`Timed out (${timeout} seconds) while waiting for entities to be in place. The remaining entities were [${remainingEntityNames.join(",")}].`);
  }
  __destroy() {
    super.__destroy();
    this._entities.__destroy();
  }
  getThreeJsScene() {
    return this._threeJsScene;
  }
  __update() {
    const time = this.getEngine().getTime();
    for (let entityIndex = this._entities.getSize() - 1; entityIndex >= 0; entityIndex--) {
      const entity = this._entities.getAt(entityIndex);
      entity.__updateLastState();
      entity.__updateParent(time);
      entity.__updateIsInCoverages(time);
    }
    this._controllerDependencyGraph.update();
  }
  __updateVisuals() {
    for (let entityIndex = this._entities.getSize() - 1; entityIndex >= 0; entityIndex--) {
      const entity = this._entities.getAt(entityIndex);
      entity.isInPositionCoverage() && entity.isEnabled() && entity.__updateVisuals();
    }
  }
  __removeCameraDependents(camera) {
    for (let entityIndex = this._entities.getSize() - 1; entityIndex >= 0; entityIndex--) this._entities.getAt(entityIndex).__removeCameraDependents(camera);
  }
  static _updateController(controller) {
    controller.getEntity().isEnabled() && controller.getCoverage().contains(controller.getEntity().getScene().getEngine().getTime()) && controller.isEnabled() && controller.__update();
  }
  // 同实体按集合顺序；跨实体按父级状态及显式 dependent-state 排序，禁用或时间不相交的控制器不建立边。
  static _compareControllers(dependentController, precedingController) {
    if (dependentController === precedingController) return false;
    if (!(dependentController.getEntity().isEnabled() && precedingController.getEntity().isEnabled() && dependentController.isEnabled() && precedingController.isEnabled())) return false;
    if (!dependentController.getCoverage().intersects(precedingController.getCoverage())) return false;
    if (dependentController.getEntity() === precedingController.getEntity()) {
      const entity = dependentController.getEntity();
      for (let controllerIndex = 0, controllerCount = entity.getNumControllers(); controllerIndex < controllerCount; controllerIndex++) {
        const controller = entity.getControllerAt(controllerIndex);
        if (precedingController === controller) return true;
        if (dependentController === controller) break;
      }
    }
    if (dependentController.getEntity().getParent() === precedingController.getEntity()) {
      if (dependentController.hasModifiedState("position") && precedingController.hasModifiedState("position") || dependentController.hasModifiedState("velocity") && precedingController.hasModifiedState("velocity")) return true;
      for (const modifiedState of precedingController.__getModifiedStates()) if (dependentController.hasDependentState("parent", modifiedState)) return true;
    }
    for (const modifiedState of precedingController.__getModifiedStates()) if (dependentController.hasDependentState(precedingController.getEntity().getName(), modifiedState)) return true;
    return false;
  }
  _entities;
  _controllerDependencyGraph;
  _ambientLightColor;
  _lightSources;
  _threeJsScene;
}
export { Scene };
