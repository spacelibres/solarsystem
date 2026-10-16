// Recovered from app.js:727902-731289.
import * as Pioneer from "../pioneer/index.js";
/** 映射切换先禁用其他类型，再并行等待全部操作；CMTS 先隐藏渲染，等待资源和瓦片完成后显示，保留各天体端点与平台分支。 */

class Mapping {
  static getOptions() {
    return mappingOptions;
  }
  static async set(scene, entityName, mappingType, options) {
    const operations = [];
    if (!(entityName in mappingOptions)) throw new Error(`Invalid entity name "${entityName}".`);
    for (const otherMappingType of Pioneer.ObjectUtils.keys(mappingOptions[entityName])) if (otherMappingType !== mappingType) {
      operations.push(Mapping.setEnabled(scene, entityName, otherMappingType, false, {}));
    }
    operations.push(Mapping.setEnabled(scene, entityName, mappingType, true, options));
    await Promise.allSettled(operations);
  }
  static async setEnabled(scene, entityName, mappingType, enabled, options) {
    if ("basic" === mappingType) await Mapping.setBasic(scene, entityName, enabled);else {
      if (!mappingType.startsWith("cmts")) throw new Error(`Invalid type ${mappingType}.`);
      await Mapping.setCMTS(scene, entityName, enabled, options);
    }
  }
  static async setBasic(scene, entityName, enabled) {
    const entity = scene.getEntity(entityName);
    if (null === entity) throw new Error(`No entity named '${entityName}' exists.`);
    const basicComponent = entity.getComponent(Pioneer.SpheroidLODComponent, "basic");
    if (null === basicComponent) throw new Error(`The entity '${entityName}' does not have a spheroidLOD named 'basic'.`);
    basicComponent.setEnabled(enabled);
    if (enabled) {
      basicComponent.setRenderingEnabled(false);
      await basicComponent.getLoadedPromise();
      basicComponent.setRenderingEnabled(true);
    }
  }
  static async setCMTS(scene, entityName, enabled, options) {
    const entity = scene.getEntity(entityName);
    if (null === entity) throw new Error(`No entity named '${entityName}' exists.`);
    let cmtsComponent = entity.getComponent(Pioneer.CMTSComponent, "cmts");
    if (enabled && !cmtsComponent) {
      cmtsComponent = entity.addComponent(Pioneer.CMTSComponent, "cmts");
      if ("1_ceres" === entityName) {
        cmtsComponent.setBaseUrl("color", `$DYNAMIC_ASSETS_URL/cmts/${entityName}/color`);
        if ("iPhone" !== Pioneer.Devices.getPlatform()) {
          cmtsComponent.setBaseUrl("normal", `$DYNAMIC_ASSETS_URL/cmts/${entityName}/normal`);
        }
        cmtsComponent.setBaseUrl("height", `$DYNAMIC_ASSETS_URL/cmts/${entityName}/height`);
      } else if ("earth" === entityName) {
        cmtsComponent.setBaseUrl("color", `$DYNAMIC_ASSETS_URL/cmts/${entityName}/color`);
        if ("iPhone" !== Pioneer.Devices.getPlatform()) {
          cmtsComponent.setBaseUrl("normal", `$DYNAMIC_ASSETS_URL/cmts/${entityName}/normal`);
        }
        cmtsComponent.setBaseUrl("height", `$DYNAMIC_ASSETS_URL/cmts/${entityName}/height`);
        cmtsComponent.setBaseUrl("specular", `$DYNAMIC_ASSETS_URL/cmts/${entityName}/specular`);
        if (!(options && false === options.night)) {
          cmtsComponent.setBaseUrl("night", `$DYNAMIC_ASSETS_URL/cmts/${entityName}/night`);
        }
        if (options) if (true === options.clouds) cmtsComponent.setBaseUrl("decal", `$DYNAMIC_ASSETS_URL/cmts/${entityName}/cloud`);else if (true === options.floatingClouds) {
          const cloudComponent = entity.addComponent(Pioneer.CMTSComponent, "floatingClouds");
          cloudComponent.setBaseUrl("color", `$DYNAMIC_ASSETS_URL/cmts/${entityName}/cloud`);
          cloudComponent.setTransparent(true);
          cloudComponent.setShadowEntities(["moon"]);
          cloudComponent.setHeightOffset(15);
          cloudComponent.setIsGroundComponent(false);
        }
        cmtsComponent.setShadowEntities(["moon"]);
      } else if ("mars" === entityName) {
        cmtsComponent.setBaseUrl("color", `$DYNAMIC_ASSETS_URL/cmts/${entityName}/color`);
        if ("iPhone" !== Pioneer.Devices.getPlatform()) {
          cmtsComponent.setBaseUrl("normal", `$DYNAMIC_ASSETS_URL/cmts/${entityName}/normal`);
        }
        cmtsComponent.setBaseUrl("height", `$DYNAMIC_ASSETS_URL/cmts/${entityName}/height`);
        cmtsComponent.setShadowEntities(["phobos", "deimos"]);
      } else {
        if ("mercury" === entityName) {
          cmtsComponent.setBaseUrl("color", `$DYNAMIC_ASSETS_URL/cmts/${entityName}/color`);
          if ("iPhone" !== Pioneer.Devices.getPlatform()) {
            cmtsComponent.setBaseUrl("normal", `$DYNAMIC_ASSETS_URL/cmts/${entityName}/normal`);
          }
          cmtsComponent.setBaseUrl("height", `$DYNAMIC_ASSETS_URL/cmts/${entityName}/height`);
        } else {
          if ("moon" === entityName) {
            cmtsComponent.setBaseUrl("color", `$DYNAMIC_ASSETS_URL/cmts/${entityName}/color`);
            if ("iPhone" !== Pioneer.Devices.getPlatform()) {
              cmtsComponent.setBaseUrl("normal", `$DYNAMIC_ASSETS_URL/cmts/${entityName}/normal`);
            }
            cmtsComponent.setBaseUrl("height", `$DYNAMIC_ASSETS_URL/cmts/${entityName}/height`);
            cmtsComponent.setShadowEntities(["earth"]);
          }
        }
      }
      cmtsComponent.setRenderingEnabled(false);
      await cmtsComponent.getLoadedPromise();
      await cmtsComponent.getTilesLoadedPromise();
      cmtsComponent.setRenderingEnabled(true);
    } else if (!enabled && cmtsComponent && (entity.removeComponent(cmtsComponent), "earth" === entityName)) {
      const cloudComponent = entity.getComponent(Pioneer.CMTSComponent, "floatingClouds");
      if (cloudComponent) {
        entity.removeComponent(cloudComponent);
      }
    }
  }
}
const mappingOptions = {
  "1_ceres": {
    basic: void 0,
    cmts: void 0
  },
  earth: {
    basic: void 0,
    cmts: ["night", "clouds", "floatingClouds"]
  },
  mars: {
    basic: void 0,
    cmts: void 0
  },
  mercury: {
    basic: void 0,
    cmts: void 0
  },
  moon: {
    basic: void 0,
    cmts: void 0
  }
};
export { Mapping };
export { mappingOptions };
