// Recovered from app.js:731290-732068.
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
class Parenting {
  static getParentOfEntity(t, e) {
    const i = Entity.Entity.getEntityOptions(t);
    if (void 0 === i) throw new Error(`There are no entity options for ${t}.`);
    const o = i.parents;
    const r = Pioneer.Sort.getIndexObject(e, o, Parenting._isStartTimeLessThanTime);
    return r < o.length && e === o[r][0] ? o[r][1] : r > 0 ? o[r - 1][1] : "";
  }
  static getAllAncestorsOfEntity(t) {
    const set = new Set();
    this._getAllAncestorsOfEntityRecursed(t, set);
    return set;
  }
  static _getAllAncestorsOfEntityRecursed(t, e) {
    const i = Entity.Entity.getEntityOptions(t);
    if (void 0 === i?.parents) return;
    const s = i.parents;
    for (const t of s) {
      const i = t[1];
      e.has(i) || (e.add(i), this._getAllAncestorsOfEntityRecursed(i, e));
    }
  }
  static _isStartTimeLessThanTime(t, e) {
    return t[0] < e;
  }
}
export { Parenting };
