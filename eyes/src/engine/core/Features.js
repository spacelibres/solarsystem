// Recovered from app.js:715579-719508.
/* 特征开关按实体和 featureId 分派到明确实现。木星特征以模型组件管理，土星磁层使用独立实体与远近两份模型；资源回调设置渲染顺序，原路径、缩放和四元数保持不变。 */
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
class Features {
  static setEnabled(scene, entityId, featureId, isEnabled) {
    const entitySetters = Features.entityFeatureSetEnabledMap[entityId];
    if (void 0 === entitySetters) throw new Error(`Attempted to access unavailable feature ${featureId} for ${entityId}.`);
    const setFeatureEnabled = entitySetters[featureId];
    if (void 0 === setFeatureEnabled) throw new Error(`Attempted to access unavailable feature ${featureId} for ${entityId}.`);
    setFeatureEnabled(scene, isEnabled);
  }
  static isEnabled(scene, entityId, featureId) {
    const entityGetters = Features.entityFeatureIsEnabledMap[entityId];
    if (void 0 === entityGetters) throw new Error(`Attempted to access unavailable feature ${featureId} for ${entityId}.`);
    const getFeatureEnabled = entityGetters[featureId];
    if (void 0 === getFeatureEnabled) throw new Error(`Attempted to access unavailable feature ${featureId} for ${entityId}.`);
    return getFeatureEnabled(scene);
  }
  static setEnabledJupiterAuroras(scene, isEnabled) {
    if (isEnabled) Features._createJupiterModelComponent(scene, "auroras", "auroras");else {
      const jupiterEntity = scene.getEntity("jupiter");
      jupiterEntity && jupiterEntity.removeComponent("auroras");
    }
  }
  static isEnabledJupiterAuroras(scene) {
    const jupiterEntity = scene.getEntity("jupiter");
    return !!jupiterEntity && null !== jupiterEntity.getComponent(Pioneer.ModelComponent, "auroras");
  }
  static setEnabledJupiterMagnetosphere(scene, isEnabled) {
    if (isEnabled) Features._createJupiterModelComponent(scene, "magnetosphere", "magnetosphere");else {
      const jupiterEntity = scene.getEntity("jupiter");
      jupiterEntity && jupiterEntity.removeComponent("magnetosphere");
    }
  }
  static isEnabledJupiterMagnetosphere(scene) {
    const jupiterEntity = scene.getEntity("jupiter");
    return !!jupiterEntity && null !== jupiterEntity.getComponent(Pioneer.ModelComponent, "magnetosphere");
  }
  static setEnabledJupiterRadiationBelt(scene, isEnabled) {
    if (isEnabled) for (let beltIndex = 1; beltIndex <= 4; beltIndex++) Features._createJupiterModelComponent(scene, `radiation_belt_${beltIndex}`, `radbelt${beltIndex}`);else {
      const jupiterEntity = scene.getEntity("jupiter");
      if (jupiterEntity) for (let beltIndex = 1; beltIndex <= 4; beltIndex++) jupiterEntity.removeComponent(`radiation_belt_${beltIndex}`);
    }
  }
  static isEnabledJupiterRadiationBelt(scene) {
    const jupiterEntity = scene.getEntity("jupiter");
    if (!jupiterEntity) return false;
    for (let beltIndex = 1; beltIndex <= 4; beltIndex++) if (null === jupiterEntity.getComponent(Pioneer.ModelComponent, `radiation_belt_${beltIndex}`)) return false;
    return true;
  }
  static setEnabledSaturnMagnetosphere(scene, isEnabled) {
    isEnabled ? Entity.Entity.createFromOptions("saturn_magnetosphere", {
      radius: 5027500,
      parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
      model: {
        url: "$STATIC_ASSETS_URL/models/saturn/magnetosphere/saturn_magnetosphere.gltf",
        scale: 1078.27002124,
        rotate: [{
          x: 90
        }]
      },
      controllers: [{
        type: "fixed",
        position: Pioneer.Vector3.Zero
      }, {
        type: "align",
        primary: {
          type: "align",
          target: "saturn",
          axis: Pioneer.Vector3.ZAxis,
          targetAxis: Pioneer.Vector3.ZAxis
        },
        secondary: {
          type: "point",
          target: "sun",
          axis: Pioneer.Vector3.XAxis
        }
      }],
      postCreateFunction: magnetosphereEntity => {
        magnetosphereEntity.setCanOcclude(false);
        const thinModel = magnetosphereEntity.addComponent(Pioneer.ModelComponent);
        thinModel.setUrl("$STATIC_ASSETS_URL/models/saturn/magnetosphere_thin/saturn_magnetosphere_thin.gltf");
        thinModel.setScale(1078.27002124);
        thinModel.setRotation(new Pioneer.Quaternion(Math.sqrt(.5), Math.sqrt(.5), 0, 0));
        thinModel.setVisibleInterval(new Pioneer.VisibleInterval(4e3, Number.POSITIVE_INFINITY));
        thinModel.setResourcesLoadedCallback(() => {
          thinModel.getThreeJsObjects().length > 0 && (thinModel.getThreeJsObjects()[0].renderOrder = -1);
        });
        const nearModel = magnetosphereEntity.getComponent(Pioneer.ModelComponent);
        nearModel && (nearModel.setVisibleInterval(new Pioneer.VisibleInterval(0, 4e3)), nearModel.setResourcesLoadedCallback(() => {
          nearModel.getThreeJsObjects().length > 0 && (nearModel.getThreeJsObjects()[0].renderOrder = -1);
        }));
      }
    }, scene) : scene.removeEntity("saturn_magnetosphere");
  }
  static isEnabledSaturnMagnetosphere(scene) {
    return null !== scene.getEntity("saturn_magnetosphere");
  }
  static _createJupiterModelComponent(scene, featureDirectory, modelBasename) {
    const jupiterEntity = scene.getEntity("jupiter");
    if (!jupiterEntity) throw new Error("The entity jupiter is not found.");
    const modelComponent = jupiterEntity.addComponent(Pioneer.ModelComponent, featureDirectory);
    modelComponent.setUrl(`$STATIC_ASSETS_URL/models/jupiter/${featureDirectory}/jupiter_${modelBasename}.gltf`);
    modelComponent.setScale(1337.08);
    const quaternion = new Pioneer.Quaternion(Math.SQRT1_2, Math.SQRT1_2, 0, 0);
    const zRotation = new Pioneer.Quaternion(Math.SQRT1_2, 0, 0, Math.SQRT1_2);
    quaternion.mult(zRotation, quaternion);
    modelComponent.setRotation(quaternion);
  }
  static entityFeatureSetEnabledMap = {
    jupiter: {
      auroras: Features.setEnabledJupiterAuroras,
      magnetosphere: Features.setEnabledJupiterMagnetosphere,
      radiationBelt: Features.setEnabledJupiterRadiationBelt
    },
    saturn: {
      magnetosphere: Features.setEnabledSaturnMagnetosphere
    }
  };
  static entityFeatureIsEnabledMap = {
    jupiter: {
      auroras: Features.isEnabledJupiterAuroras,
      magnetosphere: Features.isEnabledJupiterMagnetosphere,
      radiationBelt: Features.isEnabledJupiterRadiationBelt
    },
    saturn: {
      magnetosphere: Features.isEnabledSaturnMagnetosphere
    }
  };
}
export { Features };
