/** @eyes-analysis
 * 文件职责：复用临时对象以减少帧循环分配；借出和归还须配对。
 * 依据：Pool @2
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:34339-35652.
/** @eyes-analysis
 * 类职责：复用临时对象以减少帧循环分配；借出和归还须配对。
 * 继承：无显式父类；导出：Pool。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Pool {
  /** @eyes-analysis
   * 【结构证据】写入 `_constructorFunction`。
   * 状态写入：_constructorFunction。
   */
  constructor(constructorFunction) {
    this._constructorFunction = constructorFunction;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_constructorFunction`。
   * 状态写入：_constructorFunction。
   */
  setConstructorFunction(constructorFunction) {
    this._constructorFunction = constructorFunction;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_destructorFunction`。
   * 状态写入：_destructorFunction。
   */
  setDestructorFunction(destructorFunction) {
    this._destructorFunction = destructorFunction;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_freeLength`、`_objects[e]._poolIndex`；返回 `t`；调用 `new this._constructorFunction`、`this._objects.push`。
   * 状态写入：_freeLength、_objects[e]._poolIndex。
   * 调用线索：new this._constructorFunction、this._objects.push。
   */
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
  /** @eyes-analysis
   * 【结构证据】写入 `_freeLength`、`_free[this._freeLength]`；调用 `new Error`、`this._free.push`；含显式错误分支。
   * 状态写入：_freeLength、_free[this._freeLength]。
   * 调用线索：new Error、this._free.push。
   */
  release(t) {
    if (!("_poolIndex" in t)) throw new Error("The item was not obtained via the pool.");
    const e = t;
    this._freeLength >= this._free.length ? this._free.push(e._poolIndex) : this._free[this._freeLength] = e._poolIndex;
    this._freeLength += 1;
    e._poolUsed = false;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_free`、`_freeLength`、`_free[i]`、`_objects[t]._poolIndex`；调用 `this._objects.splice`。
   * 状态写入：_free、_freeLength、_free[i]、_objects[t]._poolIndex。
   * 调用线索：this._destructorFunction、this._objects.splice。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `this._objects`。
   */
  getAsArray() {
    return this._objects;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t._poolUsed`。
   */
  isUsed(t) {
    return t._poolUsed;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._freeLength<this._objects.length`。
   */
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
