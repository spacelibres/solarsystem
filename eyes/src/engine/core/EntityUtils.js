// 实体工具创建喷流并用长度/速度/扩展比例设置参数；子对象显隐通过 CoverageController 的进入/退出事件驱动，每次回调重新取得模型以适应资源重载。
// Recovered from app.js:860931-861814.
import * as Pioneer from "../pioneer/index.js";
class EntityUtils {
  static addGeyser(entity, lengthScale, opacity, particleCount, speedScale, spreadScale, origin, direction) {
    const spray = entity.addComponent(Pioneer.ParticleSprayComponent);
    spray.setNumberOfParticles(particleCount);
    spray.setSizeOfParticles(.25 * lengthScale * spreadScale);
    spray.setSpeedOfParticles(speedScale * lengthScale);
    spray.setColorOfParticles(new Pioneer.Color(1, 1, 1, .5 * opacity));
    spray.setSpread(1 * spreadScale);
    spray.setParticleSpacingRandom(false);
    spray.setLength(2.5 * lengthScale);
    spray.setOriginOffset(new Pioneer.Vector3(origin[0], origin[1], origin[2]));
    spray.setDirection(new Pioneer.Vector3(direction[0], direction[1], direction[2]));
  }
  static showSubObjectDuringInterval(entity, objectName, startTime, endTime) {
    const model = entity.getComponent(Pioneer.ModelComponent);
    if (!model) return;
    model.setHiddenObject(objectName, true);
    const controller = entity.addController(Pioneer.CoverageController);
    controller.setCoverage(new Pioneer.Interval(startTime, endTime));
    controller.setEnterFunction(entity => {
      const model = entity.getComponent(Pioneer.ModelComponent);
      if (model) {
        model.setHiddenObject(objectName, false);
      }
    });
    controller.setExitFunction(entity => {
      const model = entity.getComponent(Pioneer.ModelComponent);
      if (model) {
        model.setHiddenObject(objectName, true);
      }
    });
  }
}
export { EntityUtils };
