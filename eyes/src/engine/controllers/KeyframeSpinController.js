// Recovered from app.js:788661-790329.
import * as Pioneer from "../pioneer/index.js";
class KeyframeSpinController extends Pioneer.BaseController {
  constructor(t, e) {
    super(t, e);
    this._keyframes = [];
    this._axis = new Pioneer.Vector3(1, 0, 0);
    this._startingAngle = 0;
    this.addModifiedState("orientation");
  }
  setKeyframes(t) {
    this._keyframes = [];
    let e = 0;
    for (let i = 0, n = t.length; i < n; i++) {
      const n = t[i];
      if (i > 0) {
        const o = t[i - 1];
        e = Pioneer.MathUtils.wrap(e + (n[0] - o[0]) * (o[1] + n[1]) * .5, 0, 2 * Math.PI);
      }
      this._keyframes.push([n[0], n[1], e]);
    }
    this._keyframes.sort((t, e) => t[0] - e[0]);
  }
  setAxis(t) {
    this._axis.copy(t);
  }
  setStartingAngle(startingAngle) {
    this._startingAngle = startingAngle;
  }
  __updateOrientationAtTime(t, e) {
    t.isNaN() && t.copy(Pioneer.Quaternion.Identity);
    this._getNewOrientation(t, e, t);
  }
  __update() {
    if (0 === this._keyframes.length) return;
    const t = this.getEntity();
    const e = t.getScene().getEngine().getTime();
    t.getOrientation().isNaN() && t.setOrientation(Pioneer.Quaternion.Identity);
    const i = Pioneer.Quaternion.pool.get();
    this._getNewOrientation(i, e, t.getOrientation());
    t.setOrientation(i);
    Pioneer.Quaternion.pool.release(i);
  }
  _getNewOrientation(t, e, i) {
    0 === this._keyframes.length && t.copy(Pioneer.Quaternion.NaN);
    const n = Pioneer.Sort.getIndexObject(e, this._keyframes, (t, e) => t[0] < e);
    let o = 0;
    let r = 0;
    n === this._keyframes.length ? (o = this._keyframes.length - 1, r = this._keyframes.length - 1) : n > 0 && (o = n - 1, r = n);
    const a = this._keyframes[o];
    const l = this._keyframes[r];
    const c = l[0] > a[0] ? (e - a[0]) / (l[0] - a[0]) : 0;
    const h = Pioneer.MathUtils.wrap(this._startingAngle + a[2] + (e - a[0]) * (a[1] + c * l[1]) / (1 + c), 0, 2 * Math.PI);
    const d = Pioneer.Vector3.pool.get();
    d.rotate(i, this._axis);
    const u = Pioneer.Quaternion.pool.get();
    u.setFromAxisAngle(d, h);
    t.mult(u, i);
    Pioneer.Vector3.pool.release(d);
    Pioneer.Quaternion.pool.release(u);
  }
  _keyframes;
  _axis;
  _startingAngle;
}
export { KeyframeSpinController };
