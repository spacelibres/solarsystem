// Recovered from app.js:790330-791478.
import * as Pioneer from "../pioneer/index.js";
/** 各源位置先转到本实体父参考系，按径向 multiplier 与 add 组合后累加；零距离时不除长度。 */
class PositionSumController extends Pioneer.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this._entities = new Pioneer.FastMap();
    this.addModifiedState("position");
  }
  addEntity(entityName, radialMultiplier, radialOffset) {
    const entityRef = new Pioneer.EntityRef(this.getEntity().getScene());
    entityRef.setName(entityName);
    this._entities.set(entityName, {
      ref: entityRef,
      mult: radialMultiplier,
      add: radialOffset
    });
    this.addDependentState(entityName, "position");
  }
  removeEntity(entityName) {
    this._entities.delete(entityName);
    this.removeDependentState(entityName, "position");
  }
  setEntityParams(entityName, radialMultiplier, radialOffset) {
    const entry = this._entities.get(entityName);
    if (!entry) throw new Error(`The entity ${entityName} has not been previously added to the controller.`);
    if (void 0 !== radialMultiplier) {
      entry.mult = radialMultiplier;
    }
    if (void 0 !== radialOffset) {
      entry.add = radialOffset;
    }
  }
  __update() {
    const parentEntity = this.getEntity().getParent();
    if (!parentEntity) return;
    const positionSum = Pioneer.Vector3.pool.get();
    const relativePosition = Pioneer.Vector3.pool.get();
    positionSum.set(0, 0, 0);
    for (let entryIndex = 0, entryCount = this._entities.getSize(); entryIndex < entryCount; entryIndex++) {
      const entry = this._entities.getAt(entryIndex).value;
      const sourceEntity = entry.ref.get();
      if (null === sourceEntity) continue;
      sourceEntity.getPositionRelativeToEntity(relativePosition, Pioneer.Vector3.Zero, parentEntity);
      const distance = relativePosition.magnitude();
      positionSum.addMult(positionSum, relativePosition, entry.mult + (distance > 0 ? entry.add / distance : 0));
    }
    this.getEntity().setPosition(positionSum);
    Pioneer.Vector3.pool.release(positionSum);
    Pioneer.Vector3.pool.release(relativePosition);
  }
  _entities;
}
export { PositionSumController };
