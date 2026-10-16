// Recovered from app.js:73142-74233.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class CubeMap {
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
