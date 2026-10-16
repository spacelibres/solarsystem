// Recovered from app.js:49525-50278.
class Geometry {
  static getLineSphereIntersectionWithSphereAtOrigin(t, e, i) {
    const s = t.dot(t);
    const n = t.dot(e);
    const o = e.dot(e);
    const r = n * n + (i * i - s) * o;
    return r < 0 ? Number.NaN : (-n - Math.sqrt(r)) / o;
  }
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
  static getLLAFromXYZOnSphere(t, e, i) {
    const s = e.magnitudeXY();
    t.lon = Math.atan2(e.y, e.x);
    t.lat = Math.atan(e.z / s);
    t.alt = e.magnitude() - i;
  }
  static getXYZFromLLAOnSphere(t, e, i) {
    t.x = (i + e.alt) * Math.cos(e.lat) * Math.cos(e.lon);
    t.y = (i + e.alt) * Math.cos(e.lat) * Math.sin(e.lon);
    t.z = (i + e.alt) * Math.sin(e.lat);
  }
}
export { Geometry };
