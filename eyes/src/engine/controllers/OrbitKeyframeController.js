// Recovered from app.js:501754-508828.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class OrbitKeyframeController extends PioneerPublicApi.BaseController {
  constructor(t, e) {
    super(t, e);
    this._positionKeyframes = [];
    this._focusKeyframes = [];
    this._upKeyframes = [];
    this._timeOfFirstUpdate = NaN;
    this._directionOfFirstUpdate = new PioneerPublicApi.Vector3();
    this._resolvePromise = () => {};
    this._rejectPromise = null;
    this._endPromise = new Promise((resolvePromise, rejectPromise) => {
      this._resolvePromise = resolvePromise;
      this._rejectPromise = rejectPromise;
    });
    this.addModifiedState("position");
    this.addModifiedState("velocity");
    this.addModifiedState("orientation");
    this.addModifiedState("angularVelocity");
  }
  setPositionKeyframe(t, e, i) {
    if (void 0 !== e) {
      const positionKeyframe = new PositionKeyframe(this.getEntity().getScene());
      positionKeyframe.time = t;
      positionKeyframe.position.copy(e);
      positionKeyframe.relativeTo.setName(i);
      PioneerPublicApi.Sort.addObject(positionKeyframe, this._positionKeyframes, OrbitKeyframeController.isLess, OrbitKeyframeController.isEqual);
    } else {
      const e = PioneerPublicApi.Sort.getIndexObject(t, this._positionKeyframes, OrbitKeyframeController.isLessThanTime);
      e < this._positionKeyframes.length && t === this._positionKeyframes[e].time && this._positionKeyframes.splice(e, 1);
    }
  }
  setFocusKeyframe(t, e) {
    if (void 0 !== e) {
      const focusKeyframe = new FocusKeyframe(this.getEntity().getScene());
      focusKeyframe.time = t;
      focusKeyframe.focus.setName(e);
      PioneerPublicApi.Sort.addObject(focusKeyframe, this._focusKeyframes, OrbitKeyframeController.isLess, OrbitKeyframeController.isEqual);
    } else {
      const e = PioneerPublicApi.Sort.getIndexObject(t, this._focusKeyframes, OrbitKeyframeController.isLessThanTime);
      e < this._focusKeyframes.length && t === this._focusKeyframes[e].time && this._focusKeyframes.splice(e, 1);
    }
  }
  setUpKeyframe(t, e) {
    if (void 0 !== e) {
      const upKeyframe = new UpKeyframe();
      upKeyframe.time = t;
      upKeyframe.up.copy(e);
      PioneerPublicApi.Sort.addObject(upKeyframe, this._upKeyframes, OrbitKeyframeController.isLess, OrbitKeyframeController.isEqual);
    } else {
      const e = PioneerPublicApi.Sort.getIndexObject(t, this._upKeyframes, OrbitKeyframeController.isLessThanTime);
      e < this._upKeyframes.length && t === this._upKeyframes[e].time && this._upKeyframes.splice(e, 1);
    }
  }
  async getEndPromise() {
    await this._endPromise;
  }
  __destroy() {
    super.__destroy();
    null !== this._rejectPromise && this._rejectPromise(new Error(`Could not complete keyframes because ${this} was destroyed.`));
  }
  __update() {
    const t = this.getEntity();
    let e = 0;
    if (isNaN(this._timeOfFirstUpdate)) {
      const e = t.getParent();
      if (null === e) return;
      this._timeOfFirstUpdate = Date.now() / 1e3;
      t.getOrientation().getAxis(this._directionOfFirstUpdate, 1);
      const positionKeyframe = new PositionKeyframe(t.getScene());
      positionKeyframe.time = 0;
      positionKeyframe.position.copy(t.getPosition());
      positionKeyframe.relativeTo.setName(e.getName());
      PioneerPublicApi.Sort.addObject(positionKeyframe, this._positionKeyframes, OrbitKeyframeController.isLess, OrbitKeyframeController.isEqual);
      const focusKeyframe = new FocusKeyframe(t.getScene());
      focusKeyframe.time = 0;
      focusKeyframe.focus.setName("");
      PioneerPublicApi.Sort.addObject(focusKeyframe, this._focusKeyframes, OrbitKeyframeController.isLess, OrbitKeyframeController.isEqual);
      const upKeyframe = new UpKeyframe();
      upKeyframe.time = 0;
      t.getOrientation().getAxis(upKeyframe.up, 2);
      PioneerPublicApi.Sort.addObject(upKeyframe, this._upKeyframes, OrbitKeyframeController.isLess, OrbitKeyframeController.isEqual);
    } else e = Date.now() / 1e3 - this._timeOfFirstUpdate;
    let i = false;
    const n = PioneerPublicApi.Sort.getIndexObject(e, this._positionKeyframes, OrbitKeyframeController.isLessThanTime);
    if (n > 0 && n < this._positionKeyframes.length) {
      const i = this._positionKeyframes[n - 1];
      const o = this._positionKeyframes[n];
      const r = i.relativeTo.get();
      const a = o.relativeTo.get();
      if (null !== r && null !== a) {
        let n = (e - i.time) / (o.time - i.time);
        let l = r;
        n >= .5 && (l = a);
        t.getParent() !== l && t.setParent(l);
        const c = PioneerPublicApi.Vector3.pool.get();
        const h = PioneerPublicApi.Vector3.pool.get();
        r.getPositionRelativeToEntity(c, i.position, a);
        a.getPositionRelativeToEntity(h, o.position, r);
        let d = Math.max(0, i.position.magnitude() - r.getOcclusionRadius());
        let u = Math.max(0, h.magnitude() - r.getOcclusionRadius());
        let p = Math.max(0, c.magnitude() - a.getOcclusionRadius());
        let _ = Math.max(0, o.position.magnitude() - a.getOcclusionRadius());
        if (d = Math.max(d, u / 1e4), u = Math.max(u, d / 1e4), p = Math.max(p, _ / 1e4), _ = Math.max(_, u / 1e4), d !== u && p !== _) {
          const t = (u ** n * d ** (1 - n) - d) / (u - d);
          const e = (_ ** n * p ** (1 - n) - p) / (_ - p);
          n = PioneerPublicApi.MathUtils.lerp(t, e, n);
        }
        const m = n * n;
        n = m / (2 * (m - n) + 1);
        r.getPositionRelativeToEntity(c, i.position, l);
        a.getPositionRelativeToEntity(h, o.position, l);
        const g = PioneerPublicApi.Vector3.pool.get();
        r === a ? g.slerp(c, h, n) : g.lerp(c, h, n);
        t.setPosition(g);
        PioneerPublicApi.Vector3.pool.release(g);
        PioneerPublicApi.Vector3.pool.release(c);
        PioneerPublicApi.Vector3.pool.release(h);
      }
    } else if (n === this._positionKeyframes.length) {
      const e = this._positionKeyframes[this._positionKeyframes.length - 1];
      const s = e.relativeTo.get();
      t.getParent() !== s && t.setParent(s);
      t.setPosition(e.position);
      i = true;
    }
    const o = PioneerPublicApi.Vector3.pool.get();
    o.setMagnitude(t.getPosition(), -1);
    const r = PioneerPublicApi.Vector3.pool.get();
    t.getOrientation().getAxis(r, 2);
    let a = false;
    const l = PioneerPublicApi.Sort.getIndexObject(e, this._focusKeyframes, OrbitKeyframeController.isLessThanTime);
    if (l > 0 && l < this._focusKeyframes.length) {
      const i = this._focusKeyframes[l - 1];
      const n = this._focusKeyframes[l];
      const r = i.focus.get();
      const a = n.focus.get();
      const c = t.getParent();
      if (!("" !== i.focus.getName() && null === r || "" !== n.focus.getName() && null === a || null === c)) {
        let l = (e - i.time) / (n.time - i.time);
        const h = l * l;
        l = h / (2 * (h - l) + 1);
        const d = PioneerPublicApi.Vector3.pool.get();
        const u = PioneerPublicApi.Vector3.pool.get();
        r ? (c.getPositionRelativeToEntity(d, t.getPosition(), r), d.setMagnitude(d, -1), d.isZero() && this.getEntity().getOrientation().getAxis(d, 1)) : d.copy(this._directionOfFirstUpdate);
        a ? (c.getPositionRelativeToEntity(u, t.getPosition(), a), u.setMagnitude(u, -1), u.isZero() && this.getEntity().getOrientation().getAxis(u, 1)) : u.copy(this._directionOfFirstUpdate);
        o.slerp(d, u, l);
        PioneerPublicApi.Vector3.pool.release(d);
        PioneerPublicApi.Vector3.pool.release(u);
      }
    } else if (l === this._focusKeyframes.length) {
      const e = this._focusKeyframes[this._focusKeyframes.length - 1].focus.get();
      const i = t.getParent();
      null !== e && null !== i && (i.getPositionRelativeToEntity(o, t.getPosition(), e), o.setMagnitude(o, -1), o.isZero() && this.getEntity().getOrientation().getAxis(o, 1));
      a = true;
    } else {
      const e = this._focusKeyframes[0];
      const i = e.focus.get();
      const s = t.getParent();
      "" !== e.focus.getName() && null === i || null === s || (i ? (s.getPositionRelativeToEntity(o, t.getPosition(), i), o.setMagnitude(o, -1), o.isZero() && this.getEntity().getOrientation().getAxis(o, 1)) : o.copy(this._directionOfFirstUpdate));
    }
    let c = false;
    const h = PioneerPublicApi.Sort.getIndexObject(e, this._upKeyframes, OrbitKeyframeController.isLessThanTime);
    if (h > 0 && h < this._upKeyframes.length) {
      const t = this._upKeyframes[h - 1];
      const i = this._upKeyframes[h];
      let s = (e - t.time) / (i.time - t.time);
      const n = s * s;
      s = n / (2 * (n - s) + 1);
      r.slerp(t.up, i.up, s);
    } else if (h === this._upKeyframes.length) {
      const t = this._upKeyframes[this._upKeyframes.length - 1];
      r.copy(t.up);
      c = true;
    }
    const d = PioneerPublicApi.Quaternion.pool.get();
    r.setNormalTo(o, r);
    d.setFromAxes(void 0, o, r);
    t.setOrientation(d);
    PioneerPublicApi.Quaternion.pool.release(d);
    PioneerPublicApi.Vector3.pool.release(o);
    i && a && c && (this._rejectPromise = null, this._resolvePromise());
  }
  static isLess = (t, e) => t.time < e.time;
  static isLessThanTime = (t, e) => t.time < e;
  static isEqual = (t, e) => t.time === e.time;
  _positionKeyframes;
  _focusKeyframes;
  _upKeyframes;
  _timeOfFirstUpdate;
  _directionOfFirstUpdate;
  _resolvePromise;
  _rejectPromise;
  _endPromise;
}
class Keyframe {
  time;
  constructor() {
    this.time = NaN;
  }
}
class PositionKeyframe extends Keyframe {
  position;
  relativeTo;
  constructor(t) {
    super();
    this.position = new PioneerPublicApi.Vector3();
    this.relativeTo = new PioneerPublicApi.EntityRef(t);
  }
}
class FocusKeyframe extends Keyframe {
  focus;
  constructor(t) {
    super();
    this.focus = new PioneerPublicApi.EntityRef(t);
  }
}
class UpKeyframe extends Keyframe {
  up;
  constructor() {
    super();
    this.up = new PioneerPublicApi.Vector3();
  }
}
export { OrbitKeyframeController };
