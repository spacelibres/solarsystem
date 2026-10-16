// Recovered from app.js:170473-190525.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class Entity extends PioneerPublicApi.CollectionItem {
  constructor(t, e) {
    super(t, e);
    this._enabled = true;
    this._disabledByAncestor = false;
    this._destroyed = false;
    this._parent = null;
    this._lastParent = null;
    this._children = [];
    this._parentingTable = [];
    this._parentChangedCallbacks = [];
    this._childChangedCallbacks = [];
    this._state = new EntityState();
    this._lastState = new EntityState();
    this._cameraSpacePosition = new PioneerPublicApi.FastMap();
    this._normalSpacePosition = new PioneerPublicApi.FastMap();
    this._pixelSpacePosition = new PioneerPublicApi.FastMap();
    this._normalSpaceExtentsRadius = new PioneerPublicApi.FastMap();
    this._pixelSpaceExtentsRadius = new PioneerPublicApi.FastMap();
    this._greatestPixelSpaceExtentsRadius = 0;
    this._cameraDepths = new PioneerPublicApi.FastMap();
    this._leastCameraDepth = Number.MAX_SAFE_INTEGER;
    this._components = new PioneerPublicApi.Collection(this);
    this._controllers = new PioneerPublicApi.Collection(this);
    this._occlusionRadius = 0;
    this._extentsRadius = 0;
    this._groundComponent = null;
    this._canOcclude = true;
    this._positionCoverage = new PioneerPublicApi.Interval(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    this._orientationCoverage = new PioneerPublicApi.Interval(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    this._isInPositionCoverage = false;
    this._isInOrientationCoverage = false;
  }
  getScene() {
    return this.__getCollectionParent();
  }
  isEnabled() {
    return this._enabled && !this._disabledByAncestor;
  }
  isDisabledByAncestor() {
    return this._disabledByAncestor;
  }
  setEnabled(enabled) {
    this._enabled !== enabled && (this._enabled = enabled, this._updateEnabled());
  }
  _updateEnabled() {
    for (let t = 0; t < this._components.getSize(); t++) this._components.getAt(t).__updateLoadState();
    for (let t = 0, e = this._children.length; t < e; t++) this._children[t]._updateDisabledByAncestor();
    this.getScene().getControllerDependencyGraph().needsSorting();
  }
  _updateDisabledByAncestor() {
    let disabledByAncestor = false;
    let parent = this._parent;
    for (; null !== parent;) {
      if (!parent._enabled || parent._disabledByAncestor) {
        disabledByAncestor = true;
        break;
      }
      parent = parent._parent;
    }
    this._disabledByAncestor !== disabledByAncestor && (this._disabledByAncestor = disabledByAncestor, this._updateEnabled());
  }
  isDestroyed() {
    return this._destroyed;
  }
  getPosition() {
    return this._state.position;
  }
  setPosition(t) {
    this._state.position.copy(t);
  }
  getVelocity() {
    return this._state.velocity;
  }
  setVelocity(t) {
    this._state.velocity.copy(t);
  }
  getOrientation() {
    return this._state.orientation;
  }
  setOrientation(t) {
    this._state.orientation.copy(t);
  }
  getAngularVelocity() {
    return this._state.angularVelocity;
  }
  setAngularVelocity(t) {
    this._state.angularVelocity.copy(t);
  }
  getLastPosition() {
    return this._lastState.position;
  }
  getLastVelocity() {
    return this._lastState.velocity;
  }
  getLastOrientation() {
    return this._lastState.orientation;
  }
  getLastAngularVelocity() {
    return this._lastState.angularVelocity;
  }
  getPositionRelativeToEntity(t, e, i, n) {
    let o = this;
    if (t.copy(e), void 0 === n) {
      const e = this.getLowestCommonAncestor(i);
      if (null === e) return void t.copy(PioneerPublicApi.Vector3.NaN);
      for (; o !== e;) {
        t.add(t, o.getPosition());
        const e = o.getParent();
        if (null === e) return void t.copy(PioneerPublicApi.Vector3.NaN);
        o = e;
      }
      const n = PioneerPublicApi.Vector3.pool.get();
      for (n.copy(PioneerPublicApi.Vector3.Zero), o = i; o !== e;) {
        n.add(n, o.getPosition());
        const e = o.getParent();
        if (null === e) {
          t.copy(PioneerPublicApi.Vector3.NaN);
          return void PioneerPublicApi.Vector3.pool.release(n);
        }
        o = e;
      }
      t.sub(t, n);
      PioneerPublicApi.Vector3.pool.release(n);
    } else {
      const e = this.getScene();
      const r = PioneerPublicApi.Vector3.pool.get();
      const a = this.getLowestCommonAncestorAtTime(i, n);
      if (null === a) {
        t.copy(PioneerPublicApi.Vector3.NaN);
        return void PioneerPublicApi.Vector3.pool.release(r);
      }
      for (; o !== a;) {
        o.getPositionAtTime(r, n);
        t.add(t, r);
        const i = o.getParentAtTime(n);
        const a = e.getEntity(i);
        if (null === a) {
          t.copy(PioneerPublicApi.Vector3.NaN);
          return void PioneerPublicApi.Vector3.pool.release(r);
        }
        o = a;
      }
      o = i;
      const l = PioneerPublicApi.Vector3.pool.get();
      for (l.copy(PioneerPublicApi.Vector3.Zero); o !== a;) {
        o.getPositionAtTime(r, n);
        l.add(l, r);
        const i = o.getParentAtTime(n);
        const a = e.getEntity(i);
        if (null === a) {
          t.copy(PioneerPublicApi.Vector3.NaN);
          PioneerPublicApi.Vector3.pool.release(r);
          return void PioneerPublicApi.Vector3.pool.release(l);
        }
        o = a;
      }
      t.sub(t, l);
      PioneerPublicApi.Vector3.pool.release(r);
      PioneerPublicApi.Vector3.pool.release(l);
    }
  }
  getVelocityRelativeToEntity(t, e, i, n) {
    let o = this;
    if (t.copy(e), void 0 === n) {
      const e = this.getLowestCommonAncestor(i);
      if (null === e) return void t.copy(PioneerPublicApi.Vector3.NaN);
      for (t.add(t, o.getVelocity()); o !== e;) {
        const e = o.getParent();
        if (null === e) return void t.copy(PioneerPublicApi.Vector3.NaN);
        t.add(t, e.getVelocity());
        o = e;
      }
      for (o = i, t.sub(t, o.getVelocity()); o !== e;) {
        const e = o.getParent();
        if (null === e) return void t.copy(PioneerPublicApi.Vector3.NaN);
        t.sub(t, e.getVelocity());
        o = e;
      }
    } else {
      const e = this.getScene();
      const r = PioneerPublicApi.Vector3.pool.get();
      const a = this.getLowestCommonAncestorAtTime(i, n);
      if (null !== a) {
        for (o.getVelocityAtTime(r, n), t.add(t, r); o !== a;) {
          const i = o.getParentAtTime(n);
          const a = e.getEntity(i);
          if (null === a) return void t.copy(PioneerPublicApi.Vector3.NaN);
          a.getVelocityAtTime(r, n);
          t.add(t, r);
          o = a;
        }
        for (o = i, o.getVelocityAtTime(r, n), t.sub(t, r); o !== a;) {
          const i = o.getParentAtTime(n);
          const a = e.getEntity(i);
          if (null === a) return void t.copy(PioneerPublicApi.Vector3.NaN);
          a.getVelocityAtTime(r, n);
          t.sub(t, r);
          o = a;
        }
      } else t.copy(PioneerPublicApi.Vector3.NaN);
      PioneerPublicApi.Vector3.pool.release(r);
    }
  }
  getPositionAtTime(t, e) {
    if (this.isEnabled()) {
      let i = true;
      if (void 0 !== e) {
        t.set(Number.NaN, Number.NaN, Number.NaN);
        for (let s = 0; s < this._controllers.getSize(); s++) {
          const n = this._controllers.getAt(s);
          n.hasModifiedState("position") && n.isEnabled() && (n.getCoverage().contains(e) && n.__updatePositionAtTime(t, e), i = false);
        }
      }
      i && t.copy(this._state.position);
    } else t.set(Number.NaN, Number.NaN, Number.NaN);
  }
  getVelocityAtTime(t, e) {
    if (this.isEnabled()) {
      let i = true;
      if (void 0 !== e) {
        t.set(Number.NaN, Number.NaN, Number.NaN);
        for (let s = 0; s < this._controllers.getSize(); s++) {
          const n = this._controllers.getAt(s);
          n.hasModifiedState("velocity") && n.isEnabled() && (n.getCoverage().contains(e) && n.__updateVelocityAtTime(t, e), i = false);
        }
      }
      i && t.copy(this._state.velocity);
    } else t.set(Number.NaN, Number.NaN, Number.NaN);
  }
  getOrientationAtTime(t, e) {
    if (this.isEnabled()) {
      let i = true;
      if (void 0 !== e) {
        t.set(Number.NaN, Number.NaN, Number.NaN, Number.NaN);
        for (let s = 0; s < this._controllers.getSize(); s++) {
          const n = this._controllers.getAt(s);
          n.hasModifiedState("orientation") && n.isEnabled() && (n.getCoverage().contains(e) && n.__updateOrientationAtTime(t, e), i = false);
        }
      }
      i && t.copy(this._state.orientation);
    } else t.set(Number.NaN, Number.NaN, Number.NaN, Number.NaN);
  }
  getDistanceTo(t, e, i) {
    const n = PioneerPublicApi.Vector3.pool.get();
    const o = PioneerPublicApi.Vector3.pool.get();
    if (this.getPositionRelativeToEntity(n, PioneerPublicApi.Vector3.Zero, t, i), o.normalize(n), e) {
      const e = this.getGroundComponent();
      if (e) {
        const t = PioneerPublicApi.Quaternion.pool.get();
        const o = PioneerPublicApi.Vector3.pool.get();
        this.getOrientationAtTime(t, i);
        o.rotateInverse(t, n);
        e.getGroundPosition(o, void 0, o);
        o.rotate(t, o);
        n.sub(n, o);
        PioneerPublicApi.Vector3.pool.release(o);
        PioneerPublicApi.Quaternion.pool.release(t);
      }
      const o = t.getGroundComponent();
      if (o) {
        const e = PioneerPublicApi.Quaternion.pool.get();
        const r = PioneerPublicApi.Vector3.pool.get();
        t.getOrientationAtTime(e, i);
        r.rotateInverse(e, n);
        o.getGroundPosition(r, void 0, r);
        r.rotate(e, r);
        n.sub(n, r);
        PioneerPublicApi.Vector3.pool.release(r);
        PioneerPublicApi.Quaternion.pool.release(e);
      }
    }
    const r = n.dot(o);
    PioneerPublicApi.Vector3.pool.release(o);
    PioneerPublicApi.Vector3.pool.release(n);
    return r;
  }
  getOcclusionRadius() {
    return this._occlusionRadius;
  }
  getExtentsRadius() {
    return this._extentsRadius;
  }
  setOcclusionRadius(occlusionRadius) {
    this._occlusionRadius = occlusionRadius;
  }
  setExtentsRadius(extentsRadius) {
    this._extentsRadius = extentsRadius;
  }
  getGroundComponent() {
    return this._groundComponent;
  }
  __updateGroundComponent() {
    this._groundComponent = null;
    for (let t = this._components.getSize() - 1; t >= 0; t--) {
      const groundComponent = this._components.getAt(t);
      if (groundComponent.isGroundComponent()) {
        this._groundComponent = groundComponent;
        break;
      }
    }
  }
  getPositionCoverage() {
    return this._positionCoverage;
  }
  getOrientationCoverage() {
    return this._orientationCoverage;
  }
  isInPositionCoverage() {
    return this._isInPositionCoverage;
  }
  isInOrientationCoverage() {
    return this._isInOrientationCoverage;
  }
  __updateLastState() {
    this._lastState.position.copy(this._state.position);
    this._lastState.velocity.copy(this._state.velocity);
    this._lastState.orientation.copy(this._state.orientation);
    this._lastState.angularVelocity.copy(this._state.angularVelocity);
  }
  __updateCoverage() {
    this._positionCoverage.set(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
    this._orientationCoverage.set(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
    let t = 0;
    let e = 0;
    for (let i = 0; i < this._controllers.getSize(); i++) {
      const s = this._controllers.getAt(i);
      if (s.isEnabled()) {
        if (s.getCoverage().isNaN()) {
          this._positionCoverage.set(NaN, NaN);
          this._orientationCoverage.set(NaN, NaN);
          t++;
          e++;
          break;
        }
        s.hasModifiedState("position") && (this._positionCoverage.union(this._positionCoverage, s.getCoverage()), t++);
        s.hasModifiedState("orientation") && (this._orientationCoverage.union(this._orientationCoverage, s.getCoverage()), e++);
      }
    }
    if (0 === t && this._positionCoverage.set(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY), 0 === e && this._orientationCoverage.set(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY), this._parentingTable.length > 0) {
      const t = this._parentingTable[0];
      const e = this._parentingTable[this._parentingTable.length - 1];
      this._positionCoverage.min = Math.max(this._positionCoverage.min, "" !== t[1] ? t[0] : Number.POSITIVE_INFINITY);
      this._positionCoverage.max = Math.min(this._positionCoverage.max, "" !== e[1] ? Number.POSITIVE_INFINITY : e[0]);
    }
    this.getScene().getControllerDependencyGraph().needsSorting();
  }
  canOcclude() {
    return this._canOcclude;
  }
  setCanOcclude(canOcclude) {
    this._canOcclude = canOcclude;
  }
  isOccludingPosition(t, e) {
    if (!this._canOcclude || !this.isInPositionCoverage()) return false;
    const i = Math.min(this._occlusionRadius, this.getCameraSpacePosition(t).magnitude());
    const n = PioneerPublicApi.Interval.pool.get();
    PioneerPublicApi.Geometry.getLineSphereIntersectionWithLineStartAtOrigin(n, e, this.getCameraSpacePosition(t), i);
    const o = n.min + n.max;
    const r = n.min < n.max && 0 <= o && o < 2;
    PioneerPublicApi.Interval.pool.release(n);
    return r;
  }
  getParent() {
    return this._parent;
  }
  getParentAtTime(t) {
    const e = PioneerPublicApi.Sort.getIndexObject(t, this._parentingTable, Entity.isStartTimeLessThanTime);
    return e < this._parentingTable.length && t === this._parentingTable[e][0] ? this._parentingTable[e][1] : e > 0 ? this._parentingTable[e - 1][1] : this._parentingTable.length > 0 ? "" : null !== this._parent ? this._parent.getName() : "";
  }
  setParent(t) {
    if (t === this._parent) return;
    if (t) {
      const e = PioneerPublicApi.Vector3.pool.get();
      this.getPositionRelativeToEntity(e, PioneerPublicApi.Vector3.Zero, t);
      e.isNaN() || this.setPosition(e);
      PioneerPublicApi.Vector3.pool.release(e);
    }
    if (null !== this._parent) for (let t = 0; t < this._parent._children.length; t++) {
      this._parent._children[t] === this && this._parent._children.splice(t, 1);
    }
    const parent = this._parent;
    this._parent = t;
    null !== this._parent && this._parent._children.push(this);
    this._clearCameraReferences();
    this._updateDisabledByAncestor();
    for (let t = 0, i = this._parentChangedCallbacks.length; t < i; t++) this._parentChangedCallbacks[t](this, parent, this._parent);
    if (null !== parent) for (let t = 0, i = parent._childChangedCallbacks.length; t < i; t++) parent._childChangedCallbacks[t](parent, this, false);
    if (null !== this._parent) for (let t = 0, e = this._parent._childChangedCallbacks.length; t < e; t++) this._parent._childChangedCallbacks[t](this._parent, this, true);
  }
  _clearCameraReferences() {
    this._cameraSpacePosition.clear();
    this._normalSpacePosition.clear();
    this._pixelSpacePosition.clear();
    this._normalSpaceExtentsRadius.clear();
    this._pixelSpaceExtentsRadius.clear();
    this._cameraDepths.clear();
    for (let t = 0, e = this._components.getSize(); t < e; t++) {
      this._components.getAt(t).__clearCameraDependentsBase();
    }
    for (let t = 0, e = this._children.length; t < e; t++) this._children[t]._clearCameraReferences();
  }
  getNumChildren() {
    return this._children.length;
  }
  getChild(t) {
    return this._children[t];
  }
  getLowestCommonAncestor(t) {
    if (null === t) return null;
    let e = this;
    let i = t;
    let s = 0;
    let n = 0;
    for (;;) {
      const t = e.getParent();
      if (null === t) break;
      s += 1;
      e = t;
    }
    for (;;) {
      const t = i.getParent();
      if (null === t) break;
      n += 1;
      i = t;
    }
    for (e = this, i = t; s > n;) {
      s -= 1;
      e = e.getParent();
    }
    for (; n > s;) {
      n -= 1;
      i = i.getParent();
    }
    for (; e !== i;) {
      const t = e.getParent();
      const s = i.getParent();
      if (!t || !s) return null;
      e = t;
      i = s;
    }
    return e;
  }
  getLowestCommonAncestorAtTime(t, e) {
    if (null === t) return null;
    let i = this;
    let s = t;
    let n = 0;
    let o = 0;
    const r = this.getScene();
    for (;;) {
      const t = i.getParentAtTime(e);
      if ("" === t) break;
      const s = r.getEntity(t);
      if (null === s) return null;
      n += 1;
      i = s;
    }
    for (;;) {
      const t = s.getParentAtTime(e);
      if ("" === t) break;
      const i = r.getEntity(t);
      if (null === i) return null;
      o += 1;
      s = i;
    }
    for (i = this, s = t; n > o;) {
      n -= 1;
      const t = i.getParentAtTime(e);
      const s = r.getEntity(t);
      if (null === s) return null;
      i = s;
    }
    for (; o > n;) {
      o -= 1;
      const t = s.getParentAtTime(e);
      const i = r.getEntity(t);
      if (null === i) return null;
      s = i;
    }
    for (; i !== s;) {
      const t = i.getParentAtTime(e);
      const n = r.getEntity(t);
      const o = s.getParentAtTime(e);
      const a = r.getEntity(o);
      if (!n || !a) return null;
      i = n;
      s = a;
    }
    return i;
  }
  getNumParentingTableEntries() {
    return this._parentingTable.length;
  }
  getParentingTableEntry(t) {
    return this._parentingTable[t];
  }
  addParentingTableEntry(t, e) {
    PioneerPublicApi.Sort.addObject([t, e], this._parentingTable, Entity._isStartTimeLess, Entity._isStartTimeEqual);
    this.__updateCoverage();
  }
  removeParentingTableEntry(t) {
    this._parentingTable.splice(t);
    this.__updateCoverage();
  }
  clearParentingTableEntries() {
    this._parentingTable = [];
    this.__updateCoverage();
  }
  addParentChangedCallback(t) {
    this._parentChangedCallbacks.push(t);
  }
  removeParentChangedCallback(t) {
    const e = this._parentChangedCallbacks.indexOf(t);
    -1 !== e && this._parentChangedCallbacks.splice(e, 1);
  }
  addChildChangedCallback(t) {
    this._childChangedCallbacks.push(t);
  }
  removeChildChangedCallback(t) {
    const e = this._childChangedCallbacks.indexOf(t);
    -1 !== e && this._childChangedCallbacks.splice(e, 1);
  }
  getComponent(t, e) {
    return this._components.get(t, e);
  }
  getComponentAt(t) {
    return this._components.getAt(t);
  }
  getNumComponents() {
    return this._components.getSize();
  }
  addComponent(t, e = "") {
    const i = this._components.add(t, e);
    this.__updateGroundComponent();
    return i;
  }
  removeComponent(t) {
    this._components.remove(t);
    this.__updateGroundComponent();
  }
  clearComponents() {
    this._components.clear();
  }
  getController(t, e) {
    return this._controllers.get(t, e);
  }
  getControllerAt(t) {
    return this._controllers.getAt(t);
  }
  getNumControllers() {
    return this._controllers.getSize();
  }
  addController(t, e = "", i) {
    const s = this._controllers.add(t, e, i);
    this.__updateCoverage();
    return s;
  }
  removeController(t) {
    this._controllers.remove(t);
    this.__updateCoverage();
  }
  clearControllers() {
    this._controllers.clear();
    this.__updateCoverage();
  }
  getCameraSpacePosition(t) {
    const e = this._cameraSpacePosition.get(t);
    return void 0 !== e ? e : PioneerPublicApi.Vector3.NaN;
  }
  getNormalSpacePosition(t) {
    const e = this._normalSpacePosition.get(t);
    return void 0 !== e ? e : PioneerPublicApi.Vector3.NaN;
  }
  getPixelSpacePosition(t) {
    const e = this._pixelSpacePosition.get(t);
    return void 0 !== e ? e : PioneerPublicApi.Vector2.NaN;
  }
  getNormalSpaceOcclusionRadius(t) {
    return 0 !== this._extentsRadius ? this.getNormalSpaceExtentsRadius(t) * this._occlusionRadius / this._extentsRadius : 0;
  }
  getNormalSpaceExtentsRadius(t) {
    const e = this._normalSpaceExtentsRadius.get(t);
    return void 0 !== e ? e : Number.NaN;
  }
  getPixelSpaceOcclusionRadius(t) {
    return 0 !== this._extentsRadius ? this.getPixelSpaceExtentsRadius(t) * this._occlusionRadius / this._extentsRadius : 0;
  }
  getPixelSpaceExtentsRadius(t) {
    const e = this._pixelSpaceExtentsRadius.get(t);
    return void 0 !== e ? e : Number.NaN;
  }
  getGreatestPixelSpaceOcclusionRadius() {
    return 0 !== this._extentsRadius ? this.getGreatestPixelSpaceExtentsRadius() * this._occlusionRadius / this._extentsRadius : 0;
  }
  getGreatestPixelSpaceExtentsRadius() {
    return this._greatestPixelSpaceExtentsRadius;
  }
  getLeastCameraDepth() {
    return this._leastCameraDepth;
  }
  __setCameraDependentVariables(t, e, i) {
    const n = t.getViewport();
    if (null === n) return;
    let o = this._cameraSpacePosition.get(t);
    void 0 === o && (o = new PioneerPublicApi.Vector3(), this._cameraSpacePosition.set(t, o));
    o.copy(e);
    let r = this._normalSpacePosition.get(t);
    void 0 === r && (r = new PioneerPublicApi.Vector3(), this._normalSpacePosition.set(t, r));
    t.getNormalSpacePositionFromCameraSpacePosition(r, o);
    let a = this._pixelSpacePosition.get(t);
    void 0 === a && (a = new PioneerPublicApi.Vector2(), this._pixelSpacePosition.set(t, a));
    n.getPixelSpacePositionFromNormalSpacePosition(a, r);
    const l = t.getNormalSpaceRadiusFromRadius(this._extentsRadius, o.magnitude());
    this._normalSpaceExtentsRadius.set(t, l);
    const c = n.getPixelSpaceRadiusFromNormalSpaceRadius(l);
    this._pixelSpaceExtentsRadius.set(t, c);
    this._cameraDepths.set(t, i);
  }
  __removeCameraDependents(t) {
    this._cameraSpacePosition.delete(t);
    this._normalSpacePosition.delete(t);
    this._pixelSpacePosition.delete(t);
    this._normalSpaceExtentsRadius.delete(t);
    this._pixelSpaceExtentsRadius.delete(t);
    this._cameraDepths.delete(t);
    for (let e = 0; e < this._components.getSize(); e++) this._components.getAt(e).__removeCameraDependentsBase(t);
  }
  get(t, e = 0) {
    const i = this._components.getAny(t, e);
    return i || this._controllers.getAny(t, e);
  }
  async getLoadedPromise(t = false, e = Number.POSITIVE_INFINITY) {
    const i = [];
    for (let s = 0, n = this._components.getSize(); s < n; s++) {
      const n = this._components.getAt(s);
      i.push(n.getLoadedPromise(t, e).catch(t => {
        if (t instanceof Error) throw new Error(`${n} - ${t.message}`);
      }));
    }
    for (let t = 0, n = this._controllers.getSize(); t < n; t++) {
      const n = this._controllers.getAt(t);
      i.push((0, PioneerPublicApi.waitUntil)(() => !n.getCoverage().isNaN(), .25, e));
    }
    const n = await Promise.allSettled(i);
    if (!n.every(t => "fulfilled" === t.status)) throw new Error(n.filter(t => "rejected" === t.status).map(t => t.reason instanceof Error ? t.reason.message : "").filter(t => "" !== t).reduce((t, e) => `${t}\n${e}`, ""));
  }
  async waitTillInPlace(t, e = Number.POSITIVE_INFINITY) {
    return (0, PioneerPublicApi.waitUntil)(() => {
      if (this.getPositionCoverage().isNaN() || this.getOrientationCoverage().isNaN()) return false;
      t ??= this.getScene().getEngine().getTime();
      if (!(this.getPositionCoverage().contains(t) && this.getOrientationCoverage().contains(t))) return true;
      const e = PioneerPublicApi.Vector3.pool.get();
      const i = PioneerPublicApi.Quaternion.pool.get();
      try {
        this.getPositionAtTime(e, t);
        return e.isNaN() ? false : (this.getOrientationAtTime(i, t), !i.isNaN());
      } finally {
        PioneerPublicApi.Quaternion.pool.release(i);
        PioneerPublicApi.Vector3.pool.release(e);
      }
    }, .25, e);
  }
  toString() {
    return this.getName();
  }
  __destroy() {
    this._destroyed = true;
    super.__destroy();
    for (let t = 0; t < this._children.length; t++) this._children[t].setParent(null);
    null !== this._parent && this.setParent(null);
    this._controllers.__destroy();
    this._components.__destroy();
  }
  __updateParent(t) {
    const e = this.getParentAtTime(t);
    if ("" !== e) {
      const t = this.getScene().getEntity(e);
      t !== this._parent && this.setParent(t);
    } else null !== this._parent && this.setParent(null);
    this._parent !== this._lastParent && (this.getScene().getControllerDependencyGraph().needsSorting(), this._lastParent = this._parent);
  }
  __updateIsInCoverages(t) {
    this._isInPositionCoverage = this._positionCoverage.contains(t);
    this._isInOrientationCoverage = this._orientationCoverage.contains(t);
    for (let t = 0; t < this._components.getSize(); t++) this._components.getAt(t).__updateLoadState();
  }
  __updateVisuals() {
    this._greatestPixelSpaceExtentsRadius = 0;
    for (let t = 0, e = this._pixelSpaceExtentsRadius.getSize(); t < e; t++) {
      const greatestPixelSpaceExtentsRadius = this._pixelSpaceExtentsRadius.getAt(t).value;
      this._greatestPixelSpaceExtentsRadius < greatestPixelSpaceExtentsRadius && (this._greatestPixelSpaceExtentsRadius = greatestPixelSpaceExtentsRadius);
    }
    this._leastCameraDepth = Number.MAX_SAFE_INTEGER;
    for (let t = 0, e = this._cameraDepths.getSize(); t < e; t++) {
      const e = this._cameraDepths.getAt(t).value;
      this._leastCameraDepth = Math.min(e, this._leastCameraDepth);
    }
    for (let t = 0, e = this._components.getSize(); t < e; t++) {
      const e = this._components.getAt(t);
      e.isEnabled() && e.__updateBase();
    }
  }
  __updateCameraVariables(t, e, i, n) {
    if (this.isEnabled()) {
      const o = PioneerPublicApi.Vector3.pool.get();
      null === e ? o.set(0, 0, 0) : i ? o.sub(e.getCameraSpacePosition(t), e.getPosition()) : o.add(e.getCameraSpacePosition(t), this._state.position);
      this.__setCameraDependentVariables(t, o, n);
      this._canOcclude && this.getPixelSpaceOcclusionRadius(t) >= 1 && t.__addToOccludingEntities(this);
      PioneerPublicApi.Vector3.pool.release(o);
      for (let e = 0, i = this._components.getSize(); e < i; e++) {
        const i = this._components.getAt(e);
        i !== t && i.isEnabled() && i.__updateCameraVariablesBase(t);
      }
    }
    null === this._parent || !i && this !== t.getEntity() || this._parent.__updateCameraVariables(t, this, true, n + 1);
    for (let i = 0, s = this._children.length; i < s; i++) {
      const s = this._children[i];
      s !== e && s.__updateCameraVariables(t, this, false, n + 1);
    }
  }
  __prepareForRender(t) {
    for (let e = 0, i = this._components.getSize(); e < i; e++) {
      const i = this._components.getAt(e);
      "__render" in i || i.__prepareForRenderBase(t);
    }
  }
  static _isStartTimeLess(t, e) {
    return t[0] < e[0];
  }
  static _isStartTimeEqual(t, e) {
    return t[0] === e[0];
  }
  static isStartTimeLessThanTime(t, e) {
    return t[0] < e;
  }
  _enabled;
  _disabledByAncestor;
  _destroyed;
  _parent;
  _lastParent;
  _children;
  _parentingTable;
  _parentChangedCallbacks;
  _childChangedCallbacks;
  _state;
  _lastState;
  _cameraSpacePosition;
  _normalSpacePosition;
  _pixelSpacePosition;
  _normalSpaceExtentsRadius;
  _pixelSpaceExtentsRadius;
  _greatestPixelSpaceExtentsRadius;
  _cameraDepths;
  _leastCameraDepth;
  _components;
  _controllers;
  _occlusionRadius;
  _extentsRadius;
  _groundComponent;
  _canOcclude;
  _positionCoverage;
  _orientationCoverage;
  _isInPositionCoverage;
  _isInOrientationCoverage;
}
class EntityState {
  position;
  velocity;
  orientation;
  angularVelocity;
  constructor() {
    this.position = new PioneerPublicApi.Vector3(Number.NaN, Number.NaN, Number.NaN);
    this.velocity = new PioneerPublicApi.Vector3(Number.NaN, Number.NaN, Number.NaN);
    this.orientation = new PioneerPublicApi.Quaternion(Number.NaN, Number.NaN, Number.NaN, Number.NaN);
    this.angularVelocity = new PioneerPublicApi.Vector3(Number.NaN, Number.NaN, Number.NaN);
  }
}
export { Entity };
