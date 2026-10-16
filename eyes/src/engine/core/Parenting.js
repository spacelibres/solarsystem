// Recovered from app.js:731290-732068.
/* 父级表以开始时间排序，查找在边界命中当前条目，否则取前一条。祖先收集使用共享 Set 去重后递归，避免重复父路径循环展开。 */
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
class Parenting {
  static getParentOfEntity(entityId, timeValue) {
    const entityOptions = Entity.Entity.getEntityOptions(entityId);
    if (void 0 === entityOptions) throw new Error(`There are no entity options for ${entityId}.`);
    const parentTimeline = entityOptions.parents;
    const insertionIndex = Pioneer.Sort.getIndexObject(timeValue, parentTimeline, Parenting._isStartTimeLessThanTime);
    return insertionIndex < parentTimeline.length && timeValue === parentTimeline[insertionIndex][0] ? parentTimeline[insertionIndex][1] : insertionIndex > 0 ? parentTimeline[insertionIndex - 1][1] : "";
  }
  static getAllAncestorsOfEntity(entityId) {
    const set = new Set();
    this._getAllAncestorsOfEntityRecursed(entityId, set);
    return set;
  }
  static _getAllAncestorsOfEntityRecursed(entityId, ancestors) {
    const entityOptions = Entity.Entity.getEntityOptions(entityId);
    if (void 0 === entityOptions?.parents) return;
    const parentTimeline = entityOptions.parents;
    for (const parentEntry of parentTimeline) {
      const parentId = parentEntry[1];
      ancestors.has(parentId) || (ancestors.add(parentId), this._getAllAncestorsOfEntityRecursed(parentId, ancestors));
    }
  }
  static _isStartTimeLessThanTime(parentEntry, timeValue) {
    return parentEntry[0] < timeValue;
  }
}
export { Parenting };
