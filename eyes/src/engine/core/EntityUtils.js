/** @eyes-analysis
 * 文件职责：批量实体检索、层级和场景状态操作工具。
 * 依据：import ../pioneer/index.js；EntityUtils @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:860931-861814.
import * as Pioneer from "../pioneer/index.js";
/** @eyes-analysis
 * 类职责：批量实体检索、层级和场景状态操作工具。
 * 继承：无显式父类；导出：EntityUtils。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class EntityUtils {
  /** @eyes-analysis
   * 【结构证据】调用 `c.setColorOfParticles`、`c.setDirection`、`c.setLength`、`c.setNumberOfParticles`、`c.setOriginOffset`、`c.setParticleSpacingRandom`。
   * 调用线索：c.setColorOfParticles、c.setDirection、c.setLength、c.setNumberOfParticles、c.setOriginOffset等。
   */
  static addGeyser(t, e, i, n, o, r, a, l) {
    const c = t.addComponent(Pioneer.ParticleSprayComponent);
    c.setNumberOfParticles(n);
    c.setSizeOfParticles(.25 * e * r);
    c.setSpeedOfParticles(o * e);
    c.setColorOfParticles(new Pioneer.Color(1, 1, 1, .5 * i));
    c.setSpread(1 * r);
    c.setParticleSpacingRandom(false);
    c.setLength(2.5 * e);
    c.setOriginOffset(new Pioneer.Vector3(a[0], a[1], a[2]));
    c.setDirection(new Pioneer.Vector3(l[0], l[1], l[2]));
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `i.setHiddenObject`、`new Pioneer.Interval`、`o.setHiddenObject`、`r.setCoverage`、`r.setEnterFunction`、`r.setExitFunction`。
   * 调用线索：i.setHiddenObject、new Pioneer.Interval、o.setHiddenObject、r.setCoverage、r.setEnterFunction等。
   */
  static showSubObjectDuringInterval(t, e, i, n) {
    const o = t.getComponent(Pioneer.ModelComponent);
    if (!o) return;
    o.setHiddenObject(e, true);
    const r = t.addController(Pioneer.CoverageController);
    r.setCoverage(new Pioneer.Interval(i, n));
    r.setEnterFunction(t => {
      const i = t.getComponent(Pioneer.ModelComponent);
      i && i.setHiddenObject(e, false);
    });
    r.setExitFunction(t => {
      const i = t.getComponent(Pioneer.ModelComponent);
      i && i.setHiddenObject(e, true);
    });
  }
}
export { EntityUtils };
