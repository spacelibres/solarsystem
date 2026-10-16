/** @eyes-analysis
 * 文件职责：基于时间/持续时长推进动画回调，保存播放和完成状态。
 * 依据：import ../pioneer/index.js；Animation @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1197286-1198349.
import * as Pioneer from "../pioneer/index.js";
/** @eyes-analysis
 * 类职责：基于时间/持续时长推进动画回调，保存播放和完成状态。
 * 继承：无显式父类；导出：Animation。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Animation {
  /** @eyes-analysis
   * 【结构证据】返回 `o`；调用 `Pioneer.Sort.getIndexObject`、`n.sort`、`new Pioneer.Interval`、`o.getScene`、`o.getScene().getEngine`、`o.getScene().getEngine().getTime`。
   * 调用线索：Pioneer.Sort.getIndexObject、n.sort、new Pioneer.Interval、o.getScene、o.getScene().getEngine等。
   */
  static makeSubobjectVisibleAnimation(t, e, i, n) {
    n.sort((t, e) => t[0] - e[0]);
    const o = t.getEntity().addController(Pioneer.CoverageController);
    o.setCoverage(new Pioneer.Interval(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY));
    o.setUpdateFunction(o => {
      const r = o.getScene().getEngine().getTime();
      const a = Pioneer.Sort.getIndexObject(r, n, (t, e) => t[0] < e);
      0 === a ? t.setHiddenObject(e, !i) : t.setHiddenObject(e, !n[a - 1][1]);
    });
    return o;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `o`；调用 `Pioneer.MathUtils.lerp`、`Pioneer.Sort.getIndexObject`、`n.sort`、`new Pioneer.Interval`、`o.getScene`、`o.getScene().getEngine`。
   * 调用线索：Pioneer.MathUtils.lerp、Pioneer.Sort.getIndexObject、n.sort、new Pioneer.Interval、o.getScene等。
   */
  static makeJointRotationAnimation(t, e, i, n) {
    n.sort((t, e) => t[0] - e[0]);
    const o = t.getEntity().addController(Pioneer.CoverageController);
    o.setCoverage(new Pioneer.Interval(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY));
    o.setUpdateFunction(o => {
      const r = t.getThreeJsObjectByName(e);
      if (null !== r) {
        const t = o.getScene().getEngine().getTime();
        const e = Pioneer.Sort.getIndexObject(t, n, (t, e) => t[0] < e);
        if (0 === e) r.rotation[i] = n[0][1];else if (e === n.length) r.rotation[i] = n[n.length - 1][1];else {
          const o = n[e - 1];
          const a = n[e];
          const l = (t - o[0]) / (a[0] - o[0]);
          r.rotation[i] = Pioneer.MathUtils.lerp(o[1], a[1], l);
        }
      }
    });
    return o;
  }
}
export { Animation };
