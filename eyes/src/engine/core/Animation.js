// Recovered from app.js:1197286-1198349.
import * as Pioneer from "../pioneer/index.js";
class Animation {
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
