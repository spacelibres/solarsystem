// Recovered from app.js:735147-737637.
import * as Pioneer from "../pioneer/index.js";
class Transitions {
  static jumpToLocationOnSphere(t, e, i, n, o, r, a, l, c, h) {
    t <= 0 && (t = .001);
    h = Transitions.easeInOut(h);
    const d = o.getParent();
    if (void 0 === n) {
      if (!d) throw new Error("Needs entity parent or sphere entity.");
      n = d;
    }
    const u = Pioneer.Vector3.pool.get();
    const p = Pioneer.Vector3.pool.get();
    d ? (d.getPositionRelativeToEntity(u, r, n), d.getPositionRelativeToEntity(p, a, n)) : (u.copy(r), p.copy(a));
    const _ = u.magnitude() - e;
    const m = p.magnitude() - e;
    const g = Pioneer.Vector3.pool.get();
    i ? n.getOrientation().getAxis(g, 2) : g.cross(u, p);
    g.normalize(g);
    g.isZero() && g.set(0, 0, 1);
    const y = Pioneer.Vector3.pool.get();
    const f = Pioneer.Vector3.pool.get();
    const T = Pioneer.Quaternion.pool.get();
    T.setFromAxis(g, 2);
    y.rotateInverse(T, u);
    f.rotateInverse(T, p);
    const b = Pioneer.LatLonAlt.pool.get();
    const E = Pioneer.LatLonAlt.pool.get();
    Pioneer.Geometry.getLLAFromXYZOnSphere(b, y, 0);
    Pioneer.Geometry.getLLAFromXYZOnSphere(E, f, 0);
    Pioneer.Vector3.pool.release(f);
    Pioneer.Vector3.pool.release(y);
    let S = b.lon * Math.cos(b.lat);
    let v = E.lon * Math.cos(E.lat);
    S + Math.PI < v && (S += 2 * Math.PI);
    v + Math.PI < S && (v += 2 * Math.PI);
    const C = e * t * Math.sqrt((v - S) * (v - S) + (E.lat - b.lat) * (E.lat - b.lat));
    const x = Pioneer.Vector2.pool.get();
    Transitions._jumpOnCircle(x, C, _, m, h);
    const I = x.x;
    const w = x.y;
    Pioneer.Vector2.pool.release(x);
    const A = Pioneer.Vector3.pool.get();
    A.normalize(u);
    A.mult(A, w + e);
    const M = Pioneer.LatLonAlt.pool.get();
    let N;
    N = 0 !== C ? (C - I) / C : 0;
    M.lat = Pioneer.MathUtils.lerp(b.lat, E.lat, N);
    M.lon = Pioneer.MathUtils.lerpAngle(b.lon, E.lon, N);
    M.alt = w;
    Pioneer.Geometry.getXYZFromLLAOnSphere(A, M, e);
    A.rotate(T, A);
    Pioneer.LatLonAlt.pool.release(M);
    Pioneer.LatLonAlt.pool.release(b);
    Pioneer.LatLonAlt.pool.release(E);
    Pioneer.Quaternion.pool.release(T);
    A.isNaN() && A.copy(p);
    d && n.getPositionRelativeToEntity(A, A, d);
    o.setPosition(A);
    Pioneer.Vector3.pool.release(A);
    Pioneer.Vector3.pool.release(g);
    const L = Pioneer.Vector3.pool.get();
    n.getPositionRelativeToEntity(L, Pioneer.Vector3.Zero, o);
    L.normalize(L);
    const V = Pioneer.Vector3.pool.get();
    const R = Pioneer.Quaternion.pool.get();
    i ? n.getOrientation().getAxis(V, 2) : (R.slerp(l, c, h), R.getAxis(V, 2));
    V.setNormalTo(L, V);
    R.setFromAxes(void 0, L, V);
    o.setOrientation(R);
    Pioneer.Vector3.pool.release(V);
    Pioneer.Quaternion.pool.release(R);
    Pioneer.Vector3.pool.release(L);
    Pioneer.Vector3.pool.release(u);
    Pioneer.Vector3.pool.release(p);
  }
  static easeInOut(t) {
    const e = t * t;
    return e / (2 * (e - t) + 1);
  }
  static _jumpOnCircle(t, e, i, s, n) {
    let o;
    let r;
    if (Math.abs(e / (s - i)) > 1e-6) {
      const t = (s - i) / -e * (s + i) / 2 + e / 2;
      const a = Math.sign(e) * Math.acos((i * s + (e - t) * -t) / Math.sqrt(i * i + (e - t) * (e - t)) / Math.sqrt(s * s + t * t));
      const l = Math.cos(n * a);
      const c = Math.sin(n * a);
      o = (e - t) * c + i * l;
      r = t + (e - t) * l - i * c;
    } else {
      o = n * s + (1 - n) * i;
      r = (1 - n) * e;
    }
    1 === n && (o = s, r = 0);
    t.set(r, o);
  }
}
export { Transitions };
