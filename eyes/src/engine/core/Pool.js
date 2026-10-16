/** 空闲索引栈借还同一对象，不重置业务字段；clean 只销毁空闲项并修正其后索引，重复 release 与跨池使用的原限制不扩展。 */
// Recovered from app.js:34339-35652.
class Pool {
  constructor(constructorFunction) {
    this._constructorFunction = constructorFunction;
  }
  setConstructorFunction(constructorFunction) {
    this._constructorFunction = constructorFunction;
  }
  setDestructorFunction(destructorFunction) {
    this._destructorFunction = destructorFunction;
  }
  get() {
    let item;
    if (this._freeLength > 0) {
      item = this._objects[this._free[this._freeLength - 1]];
      this._freeLength -= 1;
    } else {
      item = new this._constructorFunction();
      const poolIndex = this._objects.push(item) - 1;
      this._objects[poolIndex]._poolIndex = poolIndex;
    }
    item._poolUsed = true;
    return item;
  }
  release(item) {
    if (!("_poolIndex" in item)) throw new Error("The item was not obtained via the pool.");
    const pooledItem = item;
    if (this._freeLength >= this._free.length) {
      this._free.push(pooledItem._poolIndex);
    } else {
      this._free[this._freeLength] = pooledItem._poolIndex;
    }
    this._freeLength += 1;
    pooledItem._poolUsed = false;
  }
  clean(maximumUsedRatio) {
    if (void 0 === maximumUsedRatio || maximumUsedRatio >= (this._objects.length - this._freeLength) / this._objects.length) {
      for (let freeIndex = 0; freeIndex < this._freeLength; freeIndex++) {
        const objectIndex = this._free[freeIndex];
        this._destructorFunction?.(this._objects[objectIndex]);
        this._objects.splice(objectIndex, 1);
        for (let shiftedObjectIndex = objectIndex, objectCount = this._objects.length; shiftedObjectIndex < objectCount; shiftedObjectIndex++) this._objects[shiftedObjectIndex]._poolIndex -= 1;
        for (let laterFreeIndex = freeIndex + 1, freeLength = this._freeLength; laterFreeIndex < freeLength; laterFreeIndex++) if (this._free[laterFreeIndex] > objectIndex) {
          this._free[laterFreeIndex] -= 1;
        }
      }
      this._free = [];
      this._freeLength = 0;
    }
  }
  getAsArray() {
    return this._objects;
  }
  isUsed(item) {
    return item._poolUsed;
  }
  areAnyUsed() {
    return this._freeLength < this._objects.length;
  }
  _constructorFunction;
  _destructorFunction = void 0;
  _objects = [];
  _free = [];
  _freeLength = 0;
}
export { Pool };
