// 场景帮助器按 parenting、光源、轨迹相对实体、对齐控制器和显式 dependents 递归收集依赖，Set 防重复；地理转换通过实体 Spheroid 并区分局部/惯性朝向。
// Recovered from app.js:733452-735146.
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
class SceneHelpers {
  static getEclipJ2000ToJ2000Rotation() {
    return this.eclipJ2000ToJ2000Rotation;
  }
  static llaToXYZ(output, entity, geodetic, entityRelative) {
    const spheroid = entity.getComponent(Pioneer.SpheroidComponent);
    if (null !== spheroid) {
      spheroid.xyzFromLLA(output, geodetic);
      if (!entityRelative) {
        output.rotate(entity.getOrientation(), output);
      }
    }
  }
  static xyzToLLA(output, entity, position, entityRelative) {
    const spheroid = entity.getComponent(Pioneer.SpheroidComponent);
    if (null !== spheroid) {
      const localPosition = Pioneer.Vector3.pool.get();
      if (entityRelative) {
        localPosition.copy(position);
      } else {
        localPosition.rotateInverse(entity.getOrientation(), position);
      }
      spheroid.llaFromXYZ(output, localPosition);
      Pioneer.Vector3.pool.release(localPosition);
    }
  }
  static getDependentEntities(entityName) {
    const set = new Set();
    this._getDependentEntitiesRecursed(entityName, set);
    set.delete(entityName);
    return set;
  }
  static loadEntities(requestedNames, retainedNames, scene, options, onCreated, onRemoved) {
    for (let entityIndex = 0; entityIndex < scene.getNumEntities(); entityIndex++) {
      const entity = scene.getEntityAt(entityIndex);
      if (!retainedNames.has(entity.getName())) {
        onRemoved?.(entity);
        scene.removeEntity(entity);
        entityIndex--;
      }
    }
    const set = new Set();
    for (const entityName of requestedNames) {
      for (const dependentName of SceneHelpers.getDependentEntities(entityName)) set.add(dependentName);
      set.add(entityName);
    }
    for (const entityName of set) {
      const entity = Entity.Entity.create(entityName, scene, options);
      onCreated?.(entity);
    }
  }
  static _getDependentEntitiesRecursed(entityName, dependencies) {
    const options = Entity.Entity.getEntityOptions(entityName);
    if (void 0 === options) return;
    const set = new Set();
    const parents = options.parents;
    for (const parentingEntry of parents) if ("" !== parentingEntry[1]) {
      set.add(parentingEntry[1]);
    }
    if (void 0 !== options.lightSource) {
      set.add(options.lightSource);
    }
    if (void 0 !== options.trail?.relativeTo) {
      set.add(options.trail.relativeTo);
    }
    if (options.controllers) for (let controllerIndex = 0, controllerCount = options.controllers.length; controllerIndex < controllerCount; controllerIndex++) {
      const controller = options.controllers[controllerIndex];
      if ("align" === controller.type) {
        if (void 0 !== controller.primary.target) {
          set.add(controller.primary.target);
        }
        if (void 0 !== controller.secondary?.target) {
          set.add(controller.secondary.target);
        }
      }
    }
    if (options.dependents) for (let dependentIndex = 0, dependentCount = options.dependents.length; dependentIndex < dependentCount; dependentIndex++) set.add(options.dependents[dependentIndex]);
    for (const dependentName of set) if (!dependencies.has(dependentName)) {
      dependencies.add(dependentName);
      this._getDependentEntitiesRecursed(dependentName, dependencies);
    }
  }
  static eclipJ2000ToJ2000Rotation = new Pioneer.Quaternion(.9791532214288992, .2031230389823101, 0, 0);
}
export { SceneHelpers };
