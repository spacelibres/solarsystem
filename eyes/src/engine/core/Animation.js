// Recovered from app.js:1197286-1198349.
import * as Pioneer from "../pioneer/index.js";
/** 关键帧先原地按场景时间排序；可见性为阶梯变化，关节 Euler 分量线性插值，CoverageController 每帧驱动。 */
class Animation {
  static makeSubobjectVisibleAnimation(model, objectName, initialVisible, keyframes) {
    keyframes.sort((leftKeyframe, rightKeyframe) => leftKeyframe[0] - rightKeyframe[0]);
    const controller = model.getEntity().addController(Pioneer.CoverageController);
    controller.setCoverage(new Pioneer.Interval(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY));
    controller.setUpdateFunction(entity => {
      const time = entity.getScene().getEngine().getTime();
      const insertionIndex = Pioneer.Sort.getIndexObject(time, keyframes, (leftKeyframe, time) => leftKeyframe[0] < time);
      if (0 === insertionIndex) {
        model.setHiddenObject(objectName, !initialVisible);
      } else {
        model.setHiddenObject(objectName, !keyframes[insertionIndex - 1][1]);
      }
    });
    return controller;
  }
  static makeJointRotationAnimation(model, jointName, rotationAxis, keyframes) {
    keyframes.sort((leftKeyframe, rightKeyframe) => leftKeyframe[0] - rightKeyframe[0]);
    const controller = model.getEntity().addController(Pioneer.CoverageController);
    controller.setCoverage(new Pioneer.Interval(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY));
    controller.setUpdateFunction(entity => {
      const jointObject = model.getThreeJsObjectByName(jointName);
      if (null !== jointObject) {
        const time = entity.getScene().getEngine().getTime();
        const insertionIndex = Pioneer.Sort.getIndexObject(time, keyframes, (leftKeyframe, time) => leftKeyframe[0] < time);
        if (0 === insertionIndex) jointObject.rotation[rotationAxis] = keyframes[0][1];else if (insertionIndex === keyframes.length) jointObject.rotation[rotationAxis] = keyframes[keyframes.length - 1][1];else {
          const startKeyframe = keyframes[insertionIndex - 1];
          const endKeyframe = keyframes[insertionIndex];
          const fraction = (time - startKeyframe[0]) / (endKeyframe[0] - startKeyframe[0]);
          jointObject.rotation[rotationAxis] = Pioneer.MathUtils.lerp(startKeyframe[1], endKeyframe[1], fraction);
        }
      }
    });
    return controller;
  }
}
export { Animation };
