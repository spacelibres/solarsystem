// Recovered from app.js:48616-49524.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class FastSet extends PioneerPublicApi.FastIterable {
  constructor(t) {
    if (super(), this._values = [], this._valueMap = new Map(), void 0 !== t) for (const e of t) {
      this._values.push(e);
      this._valueMap.set(e, this._values.length - 1);
    }
  }
  has(t) {
    return this._valueMap.has(t);
  }
  add(t) {
    void 0 === this._valueMap.get(t) && (this._values.push(t), this._valueMap.set(t, this._values.length - 1));
    return this;
  }
  delete(t) {
    const e = this._valueMap.get(t);
    if (void 0 !== e) {
      this._values.splice(e, 1);
      this._valueMap.delete(t);
      for (const t of this._valueMap) t[1] > e && this._valueMap.set(t[0], t[1] - 1);
      return true;
    }
    return false;
  }
  clear() {
    this._values = [];
    this._valueMap.clear();
  }
  getAt(t) {
    return this._values[t];
  }
  getSize() {
    return this._values.length;
  }
  sort(t) {
    PioneerPublicApi.Sort.sortObject(this._values, (e, i) => t(e, i), (t, e) => {
      this._valueMap.set(this._values[t], t);
      this._valueMap.set(this._values[e], e);
    });
  }
  _values;
  _valueMap;
}
export { FastSet };
