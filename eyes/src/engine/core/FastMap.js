// Recovered from app.js:47564-48615.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 连续 entries 数组与 key→index Map 同步；删除压紧数组并修正后续索引，sort 的交换回调即时更新索引。 */
class FastMap extends PioneerPublicApi.FastIterable {
  constructor(initialEntries) {
    super();
    this._entries = [];
    this._keyMap = new Map();
    if (initialEntries) for (const entry of initialEntries) {
      this._entries.push({
        key: entry.key,
        value: entry.value
      });
      this._keyMap.set(entry.key, this._entries.length - 1);
    }
  }
  has(key) {
    return this._keyMap.has(key);
  }
  get(key) {
    const index = this._keyMap.get(key);
    if (void 0 !== index) return this._entries[index].value;
  }
  set(key, value) {
    const index = this._keyMap.get(key);
    if (void 0 !== index) {
      this._entries[index].value = value;
    } else {
      this._entries.push({
        key: key,
        value: value
      });
      this._keyMap.set(key, this._entries.length - 1);
    }
  }
  delete(key) {
    const index = this._keyMap.get(key);
    if (void 0 !== index) {
      this._entries.splice(index, 1);
      this._keyMap.delete(key);
      for (const indexedEntry of this._keyMap) if (indexedEntry[1] > index) {
        this._keyMap.set(indexedEntry[0], indexedEntry[1] - 1);
      }
      return true;
    }
    return false;
  }
  clear() {
    this._entries = [];
    this._keyMap.clear();
  }
  getAt(index) {
    return this._entries[index];
  }
  getSize() {
    return this._entries.length;
  }
  sort(isLess) {
    PioneerPublicApi.Sort.sortObject(this._entries, (left, right) => isLess(left.value, right.value), (firstIndex, secondIndex) => {
      this._keyMap.set(this._entries[firstIndex].key, firstIndex);
      this._keyMap.set(this._entries[secondIndex].key, secondIndex);
    });
  }
  _entries;
  _keyMap;
}
export { FastMap };
