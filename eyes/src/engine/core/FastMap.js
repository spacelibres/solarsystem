/** @eyes-analysis
 * 文件职责：组合键查找与连续数组遍历的映射容器。
 * 依据：import ../pioneer/public-api.js；FastMap extends PioneerPublicApi.FastIterable @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:47564-48615.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：组合键查找与连续数组遍历的映射容器。
 * 继承：PioneerPublicApi.FastIterable；导出：FastMap。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class FastMap extends PioneerPublicApi.FastIterable {
  /** @eyes-analysis
   * 【结构证据】写入 `_entries`、`_keyMap`；调用 `new Map`、`super`、`this._entries.push`、`this._keyMap.set`。
   * 状态写入：_entries、_keyMap。
   * 调用线索：new Map、super、this._entries.push、this._keyMap.set。
   */
  constructor(t) {
    if (super(), this._entries = [], this._keyMap = new Map(), t) for (const e of t) {
      this._entries.push({
        key: e.key,
        value: e.value
      });
      this._keyMap.set(e.key, this._entries.length - 1);
    }
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._keyMap.has(t)`；调用 `this._keyMap.has`。
   * 调用线索：this._keyMap.has。
   */
  has(t) {
    return this._keyMap.has(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._entries[e].value`；调用 `this._keyMap.get`。
   * 调用线索：this._keyMap.get。
   */
  get(t) {
    const e = this._keyMap.get(t);
    if (void 0 !== e) return this._entries[e].value;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_entries[i].value`；调用 `this._entries.push`、`this._keyMap.get`、`this._keyMap.set`。
   * 状态写入：_entries[i].value。
   * 调用线索：this._entries.push、this._keyMap.get、this._keyMap.set。
   */
  set(t, e) {
    const i = this._keyMap.get(t);
    void 0 !== i ? this._entries[i].value = e : (this._entries.push({
      key: t,
      value: e
    }), this._keyMap.set(t, this._entries.length - 1));
  }
  /** @eyes-analysis
   * 【结构证据】返回 `true` 或 `false`；调用 `this._entries.splice`、`this._keyMap.delete`、`this._keyMap.get`、`this._keyMap.set`。
   * 调用线索：this._entries.splice、this._keyMap.delete、this._keyMap.get、this._keyMap.set。
   */
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
  /** @eyes-analysis
   * 【结构证据】写入 `_entries`；调用 `this._keyMap.clear`。
   * 状态写入：_entries。
   * 调用线索：this._keyMap.clear。
   */
  clear() {
    this._entries = [];
    this._keyMap.clear();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._entries[t]`。
   */
  getAt(t) {
    return this._entries[t];
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._entries.length`。
   */
  getSize() {
    return this._entries.length;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.Sort.sortObject`、`t`、`this._keyMap.set`。
   * 调用线索：PioneerPublicApi.Sort.sortObject、t、this._keyMap.set。
   */
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
