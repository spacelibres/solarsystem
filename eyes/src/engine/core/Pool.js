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
    let t;
    if (this._freeLength > 0) {
      t = this._objects[this._free[this._freeLength - 1]];
      this._freeLength -= 1;
    } else {
      t = new this._constructorFunction();
      const e = this._objects.push(t) - 1;
      this._objects[e]._poolIndex = e;
    }
    t._poolUsed = true;
    return t;
  }
  release(t) {
    if (!("_poolIndex" in t)) throw new Error("The item was not obtained via the pool.");
    const e = t;
    this._freeLength >= this._free.length ? this._free.push(e._poolIndex) : this._free[this._freeLength] = e._poolIndex;
    this._freeLength += 1;
    e._poolUsed = false;
  }
  clean(t) {
    if (void 0 === t || t >= (this._objects.length - this._freeLength) / this._objects.length) {
      for (let t = 0; t < this._freeLength; t++) {
        const e = this._free[t];
        this._destructorFunction?.(this._objects[e]);
        this._objects.splice(e, 1);
        for (let t = e, i = this._objects.length; t < i; t++) this._objects[t]._poolIndex -= 1;
        for (let i = t + 1, freeLength = this._freeLength; i < freeLength; i++) this._free[i] > e && (this._free[i] -= 1);
      }
      this._free = [];
      this._freeLength = 0;
    }
  }
  getAsArray() {
    return this._objects;
  }
  isUsed(t) {
    return t._poolUsed;
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
