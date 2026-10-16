// Recovered from app.js:707355-715578.
/* 实体选项目录与场景实例分离：register 只登记描述，createFromOptions 按父级、组件和控制器描述构建实例；中途异常先移除半成品实体，再补充错误上下文。轨迹覆盖控制器闭包持有各自时间区间，退出恢复默认轨迹长度；所有资源路径和模型旋转顺序保持原值。 */
import * as Pioneer from "../pioneer/index.js";
class Entity {
  static register(entityOptionsByName) {
    for (const [entityName, entityOptions] of Object.entries(entityOptionsByName)) this._entities.set(entityName, entityOptions);
  }
  static create(entityName, scene, creationOptions) {
    const entityOptions = Entity._entities.get(entityName);
    if (void 0 === entityOptions) throw new Error(`Could not find the options for the entity with name ${entityName}`);
    return this.createFromOptions(entityName, entityOptions, scene, creationOptions);
  }
  static createFromOptions(entityName, entityOptions, scene, creationOptions) {
    let resolvedName = entityName;
    creationOptions && (void 0 !== creationOptions.namePrefix && (resolvedName = creationOptions.namePrefix + resolvedName), void 0 !== creationOptions.nameSuffix && (resolvedName += creationOptions.nameSuffix));
    let entity = scene.getEntity(resolvedName);
    if (null !== entity) return entity;
    entity = scene.addEntity(resolvedName);
    try {
      void 0 !== entityOptions.radius && (entity.setOcclusionRadius(entityOptions.radius), entity.setExtentsRadius(entityOptions.radius));
      void 0 !== entityOptions.occlusionRadius && entity.setOcclusionRadius(entityOptions.occlusionRadius);
      void 0 !== entityOptions.extentsRadius && entity.setExtentsRadius(entityOptions.extentsRadius);
      for (const [parentStartTime, parentName] of entityOptions.parents) entity.addParentingTableEntry(parentStartTime, parentName);
      if (void 0 !== entityOptions.label) {
        const labelElement = entity.addComponent(Pioneer.DivComponent).getDiv();
        labelElement.innerHTML = entityOptions.label;
        labelElement.className = "pioneer-label-div";
      }
      if (entityOptions.trail) {
        const trailComponent = entity.addComponent(Pioneer.TrailComponent, entityOptions.trail.name);
        if (trailComponent.setStartTime(entityOptions.trail.length), entityOptions.trail.color ? trailComponent.setColor(new Pioneer.Color(entityOptions.trail.color[0], entityOptions.trail.color[1], entityOptions.trail.color[2], entityOptions.trail.color[3])) : trailComponent.setColor(new Pioneer.Color(1, 1, 1, .5)), void 0 !== entityOptions.trail.relativeTo ? trailComponent.setRelativeToEntity(entityOptions.trail.relativeTo) : void 0 !== entityOptions.trail.relativeToOrientation && trailComponent.setRelativeToEntityOrientation(entityOptions.trail.relativeToOrientation), void 0 !== entityOptions.trail.updatePointPositions && trailComponent.setUpdatePointPositions(true), entityOptions.trail.lengthCoverages) {
          const defaultTrailLength = entityOptions.trail.length;
          for (let coverageIndex = 0, coverageCount = entityOptions.trail.lengthCoverages.length; coverageIndex < coverageCount; coverageIndex++) {
            const lengthCoverage = entityOptions.trail.lengthCoverages[coverageIndex];
            const coverageController = entity.addController(Pioneer.CoverageController, `trail_length_coverage.${coverageIndex}`, entity.getControllerAt(0) ?? void 0);
            coverageController.setCoverage(new Pioneer.Interval(lengthCoverage[1], lengthCoverage[2]));
            coverageController.setEnterFunction(coveredEntity => {
              const coveredTrail = coveredEntity.getComponent(Pioneer.TrailComponent);
              null !== coveredTrail && coveredTrail.setStartTime(lengthCoverage[0]);
            });
            coverageController.setExitFunction(coveredEntity => {
              const coveredTrail = coveredEntity.getComponent(Pioneer.TrailComponent);
              null !== coveredTrail && coveredTrail.setStartTime(defaultTrailLength);
            });
          }
        }
      }
      if (entityOptions.spheroid) {
        const spheroidComponent = entity.addComponent(Pioneer.SpheroidComponent, entityOptions.spheroid.name);
        spheroidComponent.setEquatorialRadius(entityOptions.spheroid.equatorialRadius);
        spheroidComponent.setPolarRadius(entityOptions.spheroid.polarRadius);
        spheroidComponent.setPlanetographic(entityOptions.spheroid.planetographic);
      }
      if (entityOptions.spheroidLOD) {
        const lodComponent = entity.addComponent(Pioneer.SpheroidLODComponent, entityOptions.spheroidLOD.name ?? "basic");
        if (entityOptions.spheroidLOD.materialOptions) for (let materialIndex = 0, materialCount = entityOptions.spheroidLOD.materialOptions.length; materialIndex < materialCount; materialIndex++) lodComponent.setMaterialOption(entityOptions.spheroidLOD.materialOptions[materialIndex], true);
        if (entityOptions.spheroidLOD.textures) {
          lodComponent.setMapping("cube");
          for (const textureRole of Object.keys(entityOptions.spheroidLOD.textures)) {
            const textureInfo = entityOptions.spheroidLOD.textures[textureRole];
            lodComponent.setTexture(textureRole, `$STATIC_ASSETS_URL/maps/${textureInfo.url}`, textureInfo.sizes);
          }
        }
        entityOptions.spheroidLOD.shadowEntities && lodComponent.setShadowEntities(entityOptions.spheroidLOD.shadowEntities);
      }
      if (entityOptions.cmts) {
        const terrainComponent = entity.addComponent(Pioneer.CMTSComponent, entityOptions.cmts.name);
        for (const textureRole of Object.keys(entityOptions.cmts.textures)) {
          const textureUrl = entityOptions.cmts.textures[textureRole];
          terrainComponent.setBaseUrl(textureRole, textureUrl);
        }
        terrainComponent.setMaxLevel(entityOptions.cmts.maxLevel ?? 0);
        entityOptions.cmts.shadowEntities && terrainComponent.setShadowEntities(entityOptions.cmts.shadowEntities);
      }
      if (entityOptions.model) {
        const modelComponent = entity.addComponent(Pioneer.ModelComponent, entityOptions.model.name);
        if (modelComponent.setUrl(entityOptions.model.url), entityOptions.model.rotate) {
          const quaternion = new Pioneer.Quaternion();
          quaternion.set(1, 0, 0, 0);
          for (let rotationIndex = 0, rotationCount = entityOptions.model.rotate.length; rotationIndex < rotationCount; rotationIndex++) {
            let rotationAxis;
            let rotationAngle;
            const rotationInfo = entityOptions.model.rotate[rotationIndex];
            "x" in rotationInfo ? (rotationAxis = new Pioneer.Vector3(1, 0, 0), rotationAngle = rotationInfo.x) : "y" in rotationInfo ? (rotationAxis = new Pioneer.Vector3(0, 1, 0), rotationAngle = rotationInfo.y) : (rotationAxis = new Pioneer.Vector3(0, 0, 1), rotationAngle = rotationInfo.z);
            rotationAngle = Pioneer.MathUtils.degToRad(rotationAngle);
            const axisRotation = new Pioneer.Quaternion();
            axisRotation.setFromAxisAngle(rotationAxis, rotationAngle);
            quaternion.mult(axisRotation, quaternion);
          }
          modelComponent.setRotation(quaternion);
        }
        if (void 0 !== entityOptions.model.scale) {
          const modelScale = entityOptions.model.scale;
          Array.isArray(modelScale) ? modelComponent.setScale(new Pioneer.Vector3(modelScale[0], modelScale[1], modelScale[2])) : modelComponent.setScale(modelScale);
        }
        entityOptions.model.translate && modelComponent.setTranslation(entityOptions.model.translate);
        entityOptions.model.shadowEntities && modelComponent.setShadowEntities(entityOptions.model.shadowEntities);
        entityOptions.model.environmentMap && ("cubemap" in entityOptions.model.environmentMap ? (modelComponent.setEnvironmentCubemapUrl(entityOptions.model.environmentMap.cubemap), modelComponent.setEnvironmentCylindricalUrl("")) : (modelComponent.setEnvironmentCylindricalUrl(entityOptions.model.environmentMap.cylindrical), modelComponent.setEnvironmentCubemapUrl("")));
      }
      if (entityOptions.comet) {
        const primaryTail = entity.addComponent(Pioneer.CometTailComponent, entityOptions.comet.name);
        void 0 !== entityOptions.comet.timeLength && primaryTail.setTimeLength(entityOptions.comet.timeLength);
        primaryTail.setLightSource("sun");
        const secondaryTail = entity.addComponent(Pioneer.CometTailComponent);
        secondaryTail.setTimeLength(.5 * primaryTail.getTimeLength());
        secondaryTail.setColor(new Pioneer.Color(.214, .235, .371, .5));
        secondaryTail.setStarAccelerationMultiplier(10);
        secondaryTail.setLightSource("sun");
        const nucleusTail = entity.addComponent(Pioneer.CometTailComponent);
        nucleusTail.setStarAccelerationMultiplier(0);
        nucleusTail.setColor(new Pioneer.Color(1, 1, 1, 10));
        nucleusTail.setNumberOfParticles(1);
        nucleusTail.setLightSource("sun");
      }
      if (entityOptions.controllers) for (let controllerIndex = 0, controllerCount = entityOptions.controllers.length; controllerIndex < controllerCount; controllerIndex++) {
        const controllerInfo = entityOptions.controllers[controllerIndex];
        const controllerType = controllerInfo.type;
        let controller;
        if ("fixed" === controllerType) {
          if (controller = entity.addController(Pioneer.FixedController, controllerInfo.name), "position" in controllerInfo || "orientation" in controllerInfo) {
            if (controllerInfo.position && controller.setPosition(controllerInfo.position), controllerInfo.orientation && controller.setOrientation(controllerInfo.orientation), void 0 !== controllerInfo.relativeToEntity) {
              const rotationController = entity.addController(Pioneer.RotateByEntityOrientationController);
              rotationController.setEntityForOrientation(controllerInfo.relativeToEntity);
              controllerInfo.coverage && rotationController.setCoverage(new Pioneer.Interval(controllerInfo.coverage[0], controllerInfo.coverage[1]));
            }
          } else if ("llaOnSpheroid" in controllerInfo) {
            const groundEntityName = controllerInfo.llaOnSpheroidEntity ?? entityOptions.parents[0]?.[1];
            if (void 0 === groundEntityName) throw new Error("There is no valid entity for llaOnSpheroid.");
            const groundEntity = scene.getEntity(groundEntityName);
            if (null === groundEntity) throw new Error("The parent for llaOnSpheroid does not exist.");
            const spheroidComponent = groundEntity.getComponent(Pioneer.SpheroidComponent);
            if (null === spheroidComponent) throw new Error("Missing spheroid component.");
            controllerInfo.coverage && controller.setCoverage(new Pioneer.Interval(controllerInfo.coverage[0], controllerInfo.coverage[1]));
            const vector3 = new Pioneer.Vector3();
            spheroidComponent.xyzFromLLA(vector3, controllerInfo.llaOnSpheroid);
            controller.setPosition(vector3);
            const quaternion = new Pioneer.Quaternion();
            spheroidComponent.orientationFromLLA(quaternion, controllerInfo.llaOnSpheroid);
            controller.setOrientation(quaternion);
            const rotationController = entity.addController(Pioneer.RotateByEntityOrientationController);
            if (controllerInfo.coverage && rotationController.setCoverage(new Pioneer.Interval(controllerInfo.coverage[0], controllerInfo.coverage[1])), controllerInfo.clampToGround) {
              const groundClamp = entity.addController(Pioneer.GroundClampController);
              groundClamp.setGroundEntityRef(groundEntityName);
              controllerInfo.coverage && groundClamp.setCoverage(new Pioneer.Interval(controllerInfo.coverage[0], controllerInfo.coverage[1]));
            }
          }
        } else if ("dynamo" === controllerType) {
          controller = entity.addController(Pioneer.DynamoController, controllerInfo.name);
          true !== controllerInfo.customUrl ? controller.setBaseUrl(`$DYNAMIC_ASSETS_URL/dynamo/${controllerInfo.url}`) : controller.setBaseUrl(controllerInfo.url);
          void 0 !== controllerInfo.parentIsBarycenter && controller.setHeaderValue("body", 1);
        } else if ("align" === controllerType) {
          controller = entity.addController(Pioneer.AlignController, controllerInfo.name);
          void 0 !== controllerInfo.joint && controller.setJoint(controllerInfo.joint);
          controller.setPrimaryAlignType(controllerInfo.primary.type);
          controller.setPrimaryTargetEntity(controllerInfo.primary.target ?? "");
          controller.setPrimaryAxis(controllerInfo.primary.axis);
          controllerInfo.primary.targetAxis && controller.setPrimaryTargetAxis(controllerInfo.primary.targetAxis);
          controllerInfo.secondary && (controller.setSecondaryAlignType(controllerInfo.secondary.type), controller.setSecondaryTargetEntity(controllerInfo.secondary.target ?? ""), controller.setSecondaryAxis(controllerInfo.secondary.axis), controllerInfo.secondary.targetAxis && controller.setSecondaryTargetAxis(controllerInfo.secondary.targetAxis));
        } else if ("spin" === controllerType) {
          controller = entity.addController(Pioneer.SpinController, controllerInfo.name);
          controller.setAxis(controllerInfo.axis, controllerInfo.axisInFrameSpace ?? true);
          controller.setRate(Pioneer.MathUtils.TwoPi / (3600 * controllerInfo.periodInHours));
          void 0 !== controllerInfo.relativeToTime && controller.setReferenceTime(controllerInfo.relativeToTime);
        } else if ("rotateByEntityOrientation" === controllerType) {
          controller = entity.addController(Pioneer.RotateByEntityOrientationController, controllerInfo.name);
          void 0 !== controllerInfo.entityForOrientation && controller.setEntityForOrientation(controllerInfo.entityForOrientation);
          void 0 !== controllerInfo.rotatingOrientation && controller.setRotatingOrientation(controllerInfo.rotatingOrientation);
          void 0 !== controllerInfo.rotatingPosition && controller.setRotatingPosition(controllerInfo.rotatingPosition);
        } else if ("orbitalElements" === controllerType) {
          controller = entity.addController(Pioneer.OrbitalElementsController, controllerInfo.name);
          const orbitalElements = new Pioneer.OrbitalElements(controllerInfo);
          controller.addOrbitalElements(controllerInfo.epoch, orbitalElements);
        } else "coverage" === controllerType ? (controller = entity.addController(Pioneer.CoverageController, controllerInfo.name), controller.setEnterFunction(controllerInfo.enter), controller.setExitFunction(controllerInfo.exit), controller.setUpdateFunction(controllerInfo.update), void 0 !== controllerInfo.updateInterval && controller.setUpdateInterval(controllerInfo.updateInterval)) : controller = controllerInfo.func(entity);
        controllerInfo.coverage && controller.setCoverage(new Pioneer.Interval(controllerInfo.coverage[0], controllerInfo.coverage[1]));
      }
      entityOptions.postCreateFunction && entityOptions.postCreateFunction(entity, creationOptions);
    } catch (creationError) {
      throw scene.removeEntity(entity), creationError instanceof Error && (creationError.message = `While creating "${resolvedName}": ${creationError.message}`), creationError;
    }
    return entity;
  }
  static getEntityOptions(entityName) {
    return Entity._entities.get(entityName);
  }
  static getEntityNamesInGroup(groupQuery) {
    const set = new Set();
    if ("" !== groupQuery) {
      const requiredGroups = groupQuery.split(",").map(groupName => groupName.trim());
      for (const [entityName, entityOptions] of Entity._entities) {
        const entityGroups = entityOptions.groups;
        if (!entityGroups) continue;
        let matchesAllGroups = true;
        for (const requiredGroup of requiredGroups) entityGroups.includes(requiredGroup) || (matchesAllGroups = false);
        matchesAllGroups && set.add(entityName);
      }
    } else for (const entityName of Entity._entities.keys()) set.add(entityName);
    return set;
  }
  static getGroups() {
    const set = new Set();
    for (const entityOptions of this._entities.values()) {
      const entityGroups = entityOptions.groups;
      if (void 0 !== entityGroups) for (let groupIndex = 0; groupIndex < entityGroups.length; groupIndex++) set.add(entityGroups[groupIndex]);
    }
    return set;
  }
  static createGroup(groupQuery, scene, creationOptions) {
    const entityNames = this.getEntityNamesInGroup(groupQuery);
    for (const entityName of entityNames) this.create(entityName, scene, creationOptions);
  }
  static _entities = new Map();
}
export { Entity };
