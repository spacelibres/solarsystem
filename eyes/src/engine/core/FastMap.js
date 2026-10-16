// Recovered from app.js:47564-48615.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class FastMap extends PioneerPublicApi.FastIterable {
  constructor(t) {
    if (super(), this._entries = [], this._keyMap = new Map(), t) for (const e of t) {
      this._entries.push({
        key: e.key,
        value: e.value
      });
      this._keyMap.set(e.key, this._entries.length - 1);
    }
  }
  has(t) {
    return this._keyMap.has(t);
  }
  get(t) {
    const e = this._keyMap.get(t);
    if (void 0 !== e) return this._entries[e].value;
  }
  set(t, e) {
    const i = this._keyMap.get(t);
    void 0 !== i ? this._entries[i].value = e : (this._entries.push({
      key: t,
      value: e
    }), this._keyMap.set(t, this._entries.length - 1));
  }
  delete(t) {
    const e = this._keyMap.get(t);
    if (void 0 !== e) {
      this._entries.splice(e, 1);
      this._keyMap.delete(t);
      for (const t of this._keyMap) t[1] > e && this._keyMap.set(t[0], t[1] - 1);
      return true;
    }
    return false;
  }
  clear() {
    this._entries = [];
    this._keyMap.clear();
  }
  getAt(t) {
    return this._entries[t];
  }
  getSize() {
    return this._entries.length;
  }
  sort(t) {
    PioneerPublicApi.Sort.sortObject(this._entries, (e, i) => t(e.value, i.value), (t, e) => {
      this._keyMap.set(this._entries[t].key, t);
      this._keyMap.set(this._entries[e].key, e);
    });
  }
  _entries;
  _keyMap;
}
export { FastMap };
