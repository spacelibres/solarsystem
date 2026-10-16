/** @eyes-analysis
 * 文件职责：球面、射线、平面和几何交点/坐标转换算法。
 * 依据：Geometry @2
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:49525-50278.
/** @eyes-analysis
 * 类职责：球面、射线、平面和几何交点/坐标转换算法。
 * 继承：无显式父类；导出：Geometry。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Geometry {
  /** @eyes-analysis
   * 【结构证据】返回 `r<0?Number.NaN:(-n-Math.sqrt(r))/o`；调用 `Math.sqrt`、`e.dot`、`t.dot`。
   * 调用线索：Math.sqrt、e.dot、t.dot。
   */
  static getLineSphereIntersectionWithSphereAtOrigin(t, e, i) {
    const s = t.dot(t);
    const n = t.dot(e);
    const o = e.dot(e);
    const r = n * n + (i * i - s) * o;
    return r < 0 ? Number.NaN : (-n - Math.sqrt(r)) / o;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Math.sqrt`、`e.dot`、`i.dot`。
   * 调用线索：Math.sqrt、e.dot、i.dot。
   */
  static getLineSphereIntersectionWithLineStartAtOrigin(t, e, i, s) {
    const n = e.dot(e);
    const o = e.dot(i);
    const r = o * o + (s * s - i.dot(i)) * n;
    if (r < 0) {
      t.min = Number.NaN;
      t.max = Number.NaN;
    } else {
      const e = Math.sqrt(r);
      t.min = (o - e) / n;
      t.max = (o + e) / n;
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Math.atan`、`Math.atan2`、`e.magnitude`、`e.magnitudeXY`。
   * 调用线索：Math.atan、Math.atan2、e.magnitude、e.magnitudeXY。
   */
  static getLLAFromXYZOnSphere(t, e, i) {
    const s = e.magnitudeXY();
    t.lon = Math.atan2(e.y, e.x);
    t.lat = Math.atan(e.z / s);
    t.alt = e.magnitude() - i;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Math.cos`、`Math.sin`。
   * 调用线索：Math.cos、Math.sin。
   */
  static getXYZFromLLAOnSphere(t, e, i) {
    t.x = (i + e.alt) * Math.cos(e.lat) * Math.cos(e.lon);
    t.y = (i + e.alt) * Math.cos(e.lat) * Math.sin(e.lon);
    t.z = (i + e.alt) * Math.sin(e.lat);
  }
}
export { Geometry };
