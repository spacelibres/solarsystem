// Recovered from app.js:48616-49524.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 连续 values 数组与 value→index Map 同步；add 去重且返回 this，删除压紧后修正索引，构造输入的既有重复行为保留。 */
class FastSet extends PioneerPublicApi.FastIterable {
  constructor(initialValues) {
    super();
    this._values = [];
    this._valueMap = new Map();
    if (void 0 !== initialValues) for (const value of initialValues) {
      this._values.push(value);
      this._valueMap.set(value, this._values.length - 1);
    }
  }
  has(value) {
    return this._valueMap.has(value);
  }
  add(value) {
    if (void 0 === this._valueMap.get(value)) {
      this._values.push(value);
      this._valueMap.set(value, this._values.length - 1);
    }
    return this;
  }
  delete(value) {
    const index = this._valueMap.get(value);
    if (void 0 !== index) {
      this._values.splice(index, 1);
      this._valueMap.delete(value);
      for (const indexedEntry of this._valueMap) if (indexedEntry[1] > index) {
        this._valueMap.set(indexedEntry[0], indexedEntry[1] - 1);
      }
      return true;
    }
    return false;
  }
  clear() {
    this._values = [];
    this._valueMap.clear();
  }
  getAt(index) {
    return this._values[index];
  }
  getSize() {
    return this._values.length;
  }
  sort(isLess) {
    PioneerPublicApi.Sort.sortObject(this._values, (left, right) => isLess(left, right), (firstIndex, secondIndex) => {
      this._valueMap.set(this._values[firstIndex], firstIndex);
      this._valueMap.set(this._values[secondIndex], secondIndex);
    });
  }
  _values;
  _valueMap;
}
export { FastSet };
