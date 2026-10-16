/** @eyes-analysis
 * 文件职责：在球面经纬位置创建具有标签的地表实体。
 * 依据：import ../pioneer/index.js；Placemarks @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:732069-733451.
import * as Pioneer from "../pioneer/index.js";
/** @eyes-analysis
 * 类职责：在球面经纬位置创建具有标签的地表实体。
 * 继承：无显式父类；导出：Placemarks。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Placemarks {
  /** @eyes-analysis
   * 【结构证据】返回 `a`；调用 `a.addComponent`、`a.addComponent(Pioneer.DivComponent).getDiv`、`a.addController`、`a.setCanOcclude`、`a.setExtentsRadius`、`a.setParent`。
   * 调用线索：a.addComponent、a.addComponent(Pioneer.DivComponent).getDiv、a.addController、a.setCanOcclude、a.setExtentsRadius等。
   */
  static addPlacemark(t, e, i, n, o, r) {
    const a = i.getScene().addEntity(t);
    a.setParent(i);
    a.setCanOcclude(false);
    a.setExtentsRadius(.001);
    const l = a.addComponent(Pioneer.DivComponent).getDiv();
    l.innerHTML = e;
    l.classList.add("pioneer-label-div");
    a.addController(Pioneer.FixedController);
    a.addController(Pioneer.RotateByEntityOrientationController);
    a.addController(Pioneer.GroundClampController);
    this.updateLLA(a, n, o, r);
    return a;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Pioneer.LatLonAlt.pool.get`、`Pioneer.LatLonAlt.pool.release`、`Pioneer.MathUtils.degToRad`、`Pioneer.Quaternion.pool.get`、`Pioneer.Quaternion.pool.release`、`Pioneer.Vector3.pool.get`；含显式错误分支。
   * 调用线索：Pioneer.LatLonAlt.pool.get、Pioneer.LatLonAlt.pool.release、Pioneer.MathUtils.degToRad、Pioneer.Quaternion.pool.get、Pioneer.Quaternion.pool.release等。
   */
  static updateLLA(t, e, i, n) {
    const o = t.getParent();
    const r = t.getController(Pioneer.FixedController);
    const a = t.getController(Pioneer.GroundClampController);
    if (null === o || null === r || null === a) throw new Error("There must be a parent and fixed and ground clamp controllers.");
    const l = o.getComponent(Pioneer.SpheroidComponent);
    if (null === l) throw new Error("There must be a spheroid for the placemark's parent.");
    const c = Pioneer.LatLonAlt.pool.get();
    const h = Pioneer.Vector3.pool.get();
    c.set(Pioneer.MathUtils.degToRad(e), Pioneer.MathUtils.degToRad(i), 0);
    l.xyzFromLLA(h, c);
    r.setPosition(h);
    Pioneer.Vector3.pool.release(h);
    const d = Pioneer.Quaternion.pool.get();
    const u = Pioneer.Vector3.pool.get();
    const p = Pioneer.Vector3.pool.get();
    l.eastFromLLA(u, c);
    l.northFromLLA(p, c);
    d.setFromAxes(u, p, void 0);
    r.setOrientation(d);
    Pioneer.Vector3.pool.release(u);
    Pioneer.Vector3.pool.release(p);
    Pioneer.Quaternion.pool.release(d);
    Pioneer.LatLonAlt.pool.release(c);
    a.setGroundEntityRef(o.getName());
    a.setDistanceFromGround(n);
  }
}
export { Placemarks };
