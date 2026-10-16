/** @eyes-analysis
 * 文件职责：在三维方向与立方体六个面的 UV 坐标间转换。
 * 依据：import ../pioneer/public-api.js；CubeMap @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:73142-74233.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：在三维方向与立方体六个面的 UV 坐标间转换。
 * 继承：无显式父类；导出：CubeMap。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class CubeMap {
  /** @eyes-analysis
   * 【结构证据】返回 `void t.set(NaN,NaN,NaN)`；调用 `Math.abs`、`t.set`。
   * 调用线索：Math.abs、t.set。
   */
  static xyzToUVFace(t, e, i = CubeMap.defaultCubeMapFaceFrames) {
    let n;
    for (let o = 0; o < 6; o++) {
      const r = i[o];
      const a = r[2];
      let l;
      let c;
      let h;
      let d;
      a === PioneerPublicApi.Vector3.XAxis || a === PioneerPublicApi.Vector3.XAxisNeg ? (l = e.x, c = e.y, h = e.z, d = a === PioneerPublicApi.Vector3.XAxisNeg) : a === PioneerPublicApi.Vector3.YAxis || a === PioneerPublicApi.Vector3.YAxisNeg ? (l = e.y, c = e.z, h = e.x, d = a === PioneerPublicApi.Vector3.YAxisNeg) : (l = e.z, c = e.x, h = e.y, d = a === PioneerPublicApi.Vector3.ZAxisNeg);
      Math.abs(l) >= Math.abs(c) && Math.abs(l) >= Math.abs(h) && (l >= 0 && !d || l < 0 && d) && (n = r, t.z = o);
    }
    if (void 0 === n) return void t.set(NaN, NaN, NaN);
    let o = n[2].x * e.x + n[2].y * e.y + n[2].z * e.z;
    o < 0 && (o = 1);
    t.x = (n[0].x * e.x + n[0].y * e.y + n[0].z * e.z) / o;
    t.y = (n[1].x * e.x + n[1].y * e.y + n[1].z * e.z) / o;
    t.x = .5 * (t.x + 1);
    t.y = .5 * (t.y + 1);
  }
  static defaultCubeMapFaceFrames = [[PioneerPublicApi.Vector3.YAxis, PioneerPublicApi.Vector3.ZAxis, PioneerPublicApi.Vector3.XAxis], [PioneerPublicApi.Vector3.XAxisNeg, PioneerPublicApi.Vector3.ZAxis, PioneerPublicApi.Vector3.YAxis], [PioneerPublicApi.Vector3.YAxisNeg, PioneerPublicApi.Vector3.ZAxis, PioneerPublicApi.Vector3.XAxisNeg], [PioneerPublicApi.Vector3.XAxis, PioneerPublicApi.Vector3.ZAxis, PioneerPublicApi.Vector3.YAxisNeg], [PioneerPublicApi.Vector3.YAxis, PioneerPublicApi.Vector3.XAxisNeg, PioneerPublicApi.Vector3.ZAxis], [PioneerPublicApi.Vector3.YAxis, PioneerPublicApi.Vector3.XAxis, PioneerPublicApi.Vector3.ZAxisNeg]];
}
export { CubeMap };
