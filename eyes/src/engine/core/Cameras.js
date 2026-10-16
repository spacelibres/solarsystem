// Recovered from app.js:699730-703953.
/* 相机工具通过控制器组合定位、对齐和过渡。过渡完成后清除临时控制器并恢复交互控制器；拾取回调得到局部 XYZ 与经纬高，借出的池对象仅在同步回调期间有效。 */
import * as Pioneer from "../pioneer/index.js";
class Cameras {
  static createFullSizeViewportAndCamera(scene, viewportName = "main", cameraName = "camera") {
    const viewport = scene.getEngine().addViewport(viewportName);
    viewport.getDiv().style.width = "100%";
    viewport.getDiv().style.height = "100%";
    const cameraComponent = scene.addEntity(cameraName).addComponent(Pioneer.CameraComponent);
    viewport.setCamera(cameraComponent);
  }
  static focusOnEntity(cameraEntity, targetEntity, {
    up: alignUp = true,
    orbiter: isOrbiter = false
  }) {
    const alignController = cameraEntity.addController(Pioneer.AlignController);
    alignController.setPrimaryAlignType("point");
    alignController.setPrimaryAxis(Pioneer.Vector3.YAxis);
    alignController.setPrimaryTargetEntity(targetEntity.getName());
    alignUp && (isOrbiter ? (alignController.setSecondaryAlignType("position"), alignController.setSecondaryAxis(Pioneer.Vector3.ZAxis), alignController.setSecondaryTargetEntity(targetEntity.getName())) : (alignController.setSecondaryAlignType("align"), alignController.setSecondaryAxis(Pioneer.Vector3.ZAxis), alignController.setSecondaryTargetEntity(targetEntity.getName()), alignController.setSecondaryTargetAxis(Pioneer.Vector3.ZAxis)));
  }
  static async lookAtEntity(cameraEntity, targetEntity, {
    duration = .5,
    finalUp: finalUp,
    finalUpRelativeEntity: finalUpRelativeEntity,
    finalUpPosition: useUpPosition = false
  }) {
    if (cameraEntity.getPosition().isNaN()) return;
    const vector3 = new Pioneer.Vector3();
    targetEntity.getPositionRelativeToEntity(vector3, Pioneer.Vector3.Zero, cameraEntity);
    vector3.normalize(vector3);
    for (let controllerIndex = 0; controllerIndex < cameraEntity.getNumControllers(); controllerIndex++) {
      const controller = cameraEntity.getControllerAt(controllerIndex);
      controller.hasModifiedState("orientation") && (cameraEntity.removeController(controller), controllerIndex--);
    }
    const alignController = cameraEntity.addController(Pioneer.AlignController);
    alignController.setPrimaryAlignType("point");
    alignController.setPrimaryAxis(Pioneer.Vector3.YAxis);
    alignController.setPrimaryTargetEntity(targetEntity.getName());
    void 0 !== finalUp && (finalUpRelativeEntity ??= targetEntity, useUpPosition ? (alignController.setSecondaryAlignType("position"), alignController.setSecondaryAxis(Pioneer.Vector3.ZAxis), alignController.setSecondaryTargetEntity(finalUpRelativeEntity.getName())) : (alignController.setSecondaryAlignType("align"), alignController.setSecondaryAxis(Pioneer.Vector3.ZAxis), alignController.setSecondaryTargetEntity(finalUpRelativeEntity.getName()), alignController.setSecondaryTargetAxis(finalUp)));
    const transitionController = cameraEntity.addController(Pioneer.TransitionController);
    transitionController.setTransitionTime(duration);
    await transitionController.getEndPromise();
  }
  static async goToEntity(cameraEntity, targetEntity, {
    up: alignUp = true,
    orbiter: isOrbiter = false,
    fixedToParent = false,
    duration = 1,
    distance: distance,
    zoom: allowZoom = true,
    destination: destination,
    destinationUp: destinationUp,
    destinationInFocusFrame = false,
    transitionFunction: transitionFunction
  }) {
    for (distance ??= 5 * targetEntity.getExtentsRadius();;) {
      const parentEntity = cameraEntity.getParent();
      if (!parentEntity || parentEntity.isInPositionCoverage()) break;
      cameraEntity.setParent(parentEntity.getParent());
    }
    if ((!cameraEntity.getParent() || cameraEntity.getPosition().isNaN() || cameraEntity.getOrientation().isNaN()) && (cameraEntity.setParent(targetEntity), void 0 === destination ? cameraEntity.setPosition(new Pioneer.Vector3(0, -distance, 0)) : cameraEntity.setPosition(destination), cameraEntity.setOrientation(Pioneer.Quaternion.Identity), duration = 0), void 0 === destination) {
      const vector3 = new Pioneer.Vector3();
      cameraEntity.getPositionRelativeToEntity(vector3, Pioneer.Vector3.Zero, targetEntity);
      vector3.normalize(vector3);
      vector3.mult(vector3, distance);
      vector3.isNaN() && vector3.set(0, -distance, 0);
      destination = vector3;
    }
    cameraEntity.clearControllers();
    const fixedController = cameraEntity.addController(Pioneer.FixedController);
    if (fixedController.setPosition(destination), void 0 !== destinationUp) {
      const vector3 = new Pioneer.Vector3();
      const upDirection = new Pioneer.Vector3();
      vector3.neg(destination);
      vector3.isZero() && cameraEntity.getOrientation().getAxis(vector3, 1);
      vector3.normalize(vector3);
      upDirection.setNormalTo(vector3, destinationUp);
      const quaternion = new Pioneer.Quaternion();
      quaternion.setFromAxes(void 0, vector3, upDirection);
      fixedController.setOrientation(quaternion);
    }
    if (destinationInFocusFrame) {
      const rotationController = cameraEntity.addController(Pioneer.RotateByEntityOrientationController);
      void 0 === destinationUp && rotationController.setRotatingOrientation(false);
    }
    this.focusOnEntity(cameraEntity, targetEntity, {
      up: alignUp,
      orbiter: isOrbiter
    });
    const transitionController = cameraEntity.addController(Pioneer.TransitionController);
    transitionController.setTransitionTime(duration);
    transitionController.setParent(targetEntity.getName());
    transitionFunction && transitionController.setTransitionFunction(transitionFunction);
    await transitionController.getEndPromise();
    cameraEntity.clearControllers();
    const orbitController = cameraEntity.addController(Pioneer.OrbitController);
    alignUp ? isOrbiter ? orbitController.setYawAxisType("position") : orbitController.setYawAxisType("z-axis") : cameraEntity.addController(Pioneer.RollController);
    fixedToParent && cameraEntity.addController(Pioneer.FixedToParentController);
    allowZoom && cameraEntity.addController(Pioneer.ZoomController);
    this.focusOnEntity(cameraEntity, targetEntity, {
      up: alignUp,
      orbiter: isOrbiter
    });
  }
  static pickOnEntity(cameraEntity, targetEntity, onPick) {
    const pickController = cameraEntity.addController(Pioneer.PickController);
    pickController.setPickedEntity(targetEntity);
    pickController.setCallback(pickedPosition => {
      const spheroidComponent = targetEntity.getComponent(Pioneer.SpheroidComponent);
      if (null !== spheroidComponent) {
        const localPosition = Pioneer.Vector3.pool.get();
        localPosition.rotateInverse(targetEntity.getOrientation(), pickedPosition);
        const latitudeLongitudeAltitude = Pioneer.LatLonAlt.pool.get();
        spheroidComponent.llaFromXYZ(latitudeLongitudeAltitude, localPosition);
        onPick(localPosition, latitudeLongitudeAltitude);
        Pioneer.LatLonAlt.pool.release(latitudeLongitudeAltitude);
        Pioneer.Vector3.pool.release(localPosition);
      }
    });
  }
  static getDistanceToFitEntities(cameraEntity, viewOrientation, focusEntity, entities) {
    const cameraComponent = cameraEntity.getComponent(Pioneer.CameraComponent);
    if (null === cameraComponent) return NaN;
    let requiredDistance = 0;
    const relativePosition = Pioneer.Vector3.pool.get();
    const horizontalSin = Math.sin(cameraComponent.getHorizontalFieldOfView() / 2);
    const verticalSin = Math.sin(cameraComponent.getVerticalFieldOfView() / 2);
    const horizontalTan = Math.tan(cameraComponent.getHorizontalFieldOfView() / 2);
    const verticalTan = Math.tan(cameraComponent.getVerticalFieldOfView() / 2);
    for (let entityIndex = 0; entityIndex < entities.length; entityIndex++) {
      const entity = entities[entityIndex];
      let ringsRadius = 0;
      const ringsComponent = entity.getComponent(Pioneer.RingsComponent);
      null !== ringsComponent && (ringsRadius = ringsComponent.getOuterRadius());
      entity.getPositionRelativeToEntity(relativePosition, Pioneer.Vector3.Zero, focusEntity);
      relativePosition.rotateInverse(viewOrientation, relativePosition);
      requiredDistance = Math.max(requiredDistance, Math.abs(relativePosition.x) / horizontalTan + Math.max(entity.getExtentsRadius(), ringsRadius) / horizontalSin - relativePosition.y);
      requiredDistance = Math.max(requiredDistance, Math.abs(relativePosition.z) / verticalTan + Math.max(entity.getExtentsRadius(), ringsRadius) / verticalSin - relativePosition.y);
    }
    Pioneer.Vector3.pool.release(relativePosition);
    return requiredDistance;
  }
}
export { Cameras };
