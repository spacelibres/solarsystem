// Recovered from app.js:786224-788660.
import * as Pioneer from "../pioneer/index.js";
class KeyframePointingController extends Pioneer.BaseController {
  constructor(t, e) {
    super(t, e);
    this._keyframes = [];
    this._direction = new Pioneer.Vector3(1, 0, 0);
    this.addModifiedState("orientation");
  }
  setKeyframes(t) {
    for (let t = 0, e = this._keyframes.length; t < e; t++) {
      let e = this._keyframes[t][1];
      e.startsWith("-") && (e = e.substring(1));
      "velocity" === e ? this.removeDependentState(this.getEntity().getName(), "velocity") : this.removeDependentState(e, "position");
    }
    this._keyframes = [];
    for (let e = 0, i = t.length; e < i; e++) {
      const i = t[e];
      this._keyframes.push([i[0], i[1]]);
      let s = i[1];
      s.startsWith("-") && (s = s.substring(1));
      "velocity" === s ? this.addDependentState(this.getEntity().getName(), "velocity") : this.addDependentState(s, "position");
    }
    this._keyframes.sort((t, e) => t[0] - e[0]);
  }
  setDirection(t) {
    this._direction.copy(t);
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
    const h = Pioneer.Vector3.pool.get();
    const d = Pioneer.Vector3.pool.get();
    this._getDirection(h, e, a[1]);
    this._getDirection(d, e, l[1]);
    d.slerp(h, d, c);
    d.normalize(d);
    h.rotate(i, this._direction);
    const u = Pioneer.Quaternion.pool.get();
    u.setFromVectorFromTo(h, d);
    t.mult(u, i);
    Pioneer.Quaternion.pool.release(u);
    Pioneer.Vector3.pool.release(d);
    Pioneer.Vector3.pool.release(h);
  }
  _getDirection(t, e, i) {
    const n = this.getEntity();
    const o = i.startsWith("-");
    if (o && (i = i.substring(1)), i.startsWith("velocity")) {
      if ((i = i.substring(8)).startsWith(" rel ")) {
        i = i.substring(5);
        const o = n.getScene().getEntity(i);
        null !== o && n.getVelocityRelativeToEntity(t, Pioneer.Vector3.Zero, o, e);
      } else n.getVelocityAtTime(t, e);
    } else {
      const o = n.getScene().getEntity(i);
      null !== o ? o.getPositionRelativeToEntity(t, Pioneer.Vector3.Zero, n, e) : t.copy(Pioneer.Vector3.NaN);
    }
    t.normalize(t);
    o && t.mult(t, -1);
  }
  _keyframes;
  _direction;
}
export { KeyframePointingController };
