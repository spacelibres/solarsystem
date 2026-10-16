/** @eyes-analysis
 * 文件职责：组合成员查找与连续数组遍历的集合容器。
 * 依据：import ../pioneer/public-api.js；FastSet extends PioneerPublicApi.FastIterable @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:48616-49524.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：组合成员查找与连续数组遍历的集合容器。
 * 继承：PioneerPublicApi.FastIterable；导出：FastSet。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class FastSet extends PioneerPublicApi.FastIterable {
  /** @eyes-analysis
   * 【结构证据】写入 `_valueMap`、`_values`；调用 `new Map`、`super`、`this._valueMap.set`、`this._values.push`。
   * 状态写入：_valueMap、_values。
   * 调用线索：new Map、super、this._valueMap.set、this._values.push。
   */
  constructor(t) {
    if (super(), this._values = [], this._valueMap = new Map(), void 0 !== t) for (const e of t) {
      this._values.push(e);
      this._valueMap.set(e, this._values.length - 1);
    }
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._valueMap.has(t)`；调用 `this._valueMap.has`。
   * 调用线索：this._valueMap.has。
   */
  has(t) {
    return this._valueMap.has(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this`；调用 `this._valueMap.get`、`this._valueMap.set`、`this._values.push`。
   * 调用线索：this._valueMap.get、this._valueMap.set、this._values.push。
   */
  add(t) {
    void 0 === this._valueMap.get(t) && (this._values.push(t), this._valueMap.set(t, this._values.length - 1));
    return this;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `true` 或 `false`；调用 `this._valueMap.delete`、`this._valueMap.get`、`this._valueMap.set`、`this._values.splice`。
   * 调用线索：this._valueMap.delete、this._valueMap.get、this._valueMap.set、this._values.splice。
   */
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
  /** @eyes-analysis
   * 【结构证据】写入 `_values`；调用 `this._valueMap.clear`。
   * 状态写入：_values。
   * 调用线索：this._valueMap.clear。
   */
  clear() {
    this._values = [];
    this._valueMap.clear();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._values[t]`。
   */
  getAt(t) {
    return this._values[t];
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._values.length`。
   */
  getSize() {
    return this._values.length;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.Sort.sortObject`、`t`、`this._valueMap.set`。
   * 调用线索：PioneerPublicApi.Sort.sortObject、t、this._valueMap.set。
   */
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
