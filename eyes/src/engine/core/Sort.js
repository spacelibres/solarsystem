/** @eyes-analysis
 * 文件职责：排序、二分查找和有序插入工具。
 * 依据：Sort @2
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:39659-40702.
/** @eyes-analysis
 * 类职责：排序、二分查找和有序插入工具。
 * 继承：无显式父类；导出：Sort。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Sort {
  /** @eyes-analysis
   * 【结构证据】返回 `i`。
   */
  static getIndex(t, e) {
    let i = 0;
    let s = e.length;
    for (; i < s;) {
      const n = i + s >>> 1;
      e[n] < t ? i = n + 1 : s = n;
    }
    return i;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `s`；调用 `i`。
   * 调用线索：i。
   */
  static getIndexObject(t, e, i) {
    let s = 0;
    let n = e.length;
    for (; s < n;) {
      const o = s + n >>> 1;
      i(e[o], t) ? s = o + 1 : n = o;
    }
    return s;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `e.splice`、`this.getIndex`。
   * 调用线索：e.splice、this.getIndex。
   */
  static add(t, e) {
    let i = this.getIndex(t, e);
    for (; i < e.length && e[i] === t;) i += 1;
    e.splice(i, 0, t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `e.splice`、`s`、`this.getIndexObject`。
   * 调用线索：e.splice、s、this.getIndexObject。
   */
  static addObject(t, e, i, s) {
    let n = this.getIndexObject(t, e, i);
    for (; n < e.length && s(e[n], t);) n += 1;
    e.splice(n, 0, t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `s`；调用 `e.splice`、`this.getIndex`。
   * 调用线索：e.splice、this.getIndex。
   */
  static remove(t, e) {
    const i = this.getIndex(t, e);
    let s = false;
    i < e.length && e[i] === t && (s = true);
    s && e.splice(i, 1);
    return s;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `o`；调用 `e.splice`、`s`、`this.getIndexObject`。
   * 调用线索：e.splice、s、this.getIndexObject。
   */
  static removeObject(t, e, i, s) {
    const n = this.getIndexObject(t, e, i);
    let o = false;
    n < e.length && s(e[n], t) && (o = true);
    o && e.splice(n, 1);
    return o;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `e`。
   * 调用线索：e。
   */
  static sort(t, e) {
    if (0 === t.length) return;
    let i = 1;
    for (; i < t.length;) {
      let s = i - 1;
      for (; s >= 0 && t[s + 1] < t[s];) {
        const i = t[s];
        t[s] = t[s + 1];
        t[s + 1] = i;
        e && e(s + 1, s);
        s--;
      }
      i++;
    }
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `e`、`i`。
   * 调用线索：e、i。
   */
  static sortObject(t, e, i) {
    if (0 === t.length) return;
    let s = 1;
    for (; s < t.length;) {
      let n = s - 1;
      for (; n >= 0 && e(t[n + 1], t[n]);) {
        const e = t[n];
        t[n] = t[n + 1];
        t[n + 1] = e;
        i && i(n + 1, n);
        n--;
      }
      s++;
    }
  }
}
export { Sort };
