// Recovered from app.js:699730-703953.
import * as Pioneer from "../pioneer/index.js";
class Cameras {
  static createFullSizeViewportAndCamera(t, e = "main", i = "camera") {
    const n = t.getEngine().addViewport(e);
    n.getDiv().style.width = "100%";
    n.getDiv().style.height = "100%";
    const o = t.addEntity(i).addComponent(Pioneer.CameraComponent);
    n.setCamera(o);
  }
  static focusOnEntity(t, e, {
    up: i = true,
    orbiter: n = false
  }) {
    const o = t.addController(Pioneer.AlignController);
    o.setPrimaryAlignType("point");
    o.setPrimaryAxis(Pioneer.Vector3.YAxis);
    o.setPrimaryTargetEntity(e.getName());
    i && (n ? (o.setSecondaryAlignType("position"), o.setSecondaryAxis(Pioneer.Vector3.ZAxis), o.setSecondaryTargetEntity(e.getName())) : (o.setSecondaryAlignType("align"), o.setSecondaryAxis(Pioneer.Vector3.ZAxis), o.setSecondaryTargetEntity(e.getName()), o.setSecondaryTargetAxis(Pioneer.Vector3.ZAxis)));
  }
  static async lookAtEntity(t, e, {
    duration: i = .5,
    finalUp: finalUp,
    finalUpRelativeEntity: finalUpRelativeEntity,
    finalUpPosition: r = false
  }) {
    if (t.getPosition().isNaN()) return;
    const vector3 = new Pioneer.Vector3();
    e.getPositionRelativeToEntity(vector3, Pioneer.Vector3.Zero, t);
    vector3.normalize(vector3);
    for (let e = 0; e < t.getNumControllers(); e++) {
      const i = t.getControllerAt(e);
      i.hasModifiedState("orientation") && (t.removeController(i), e--);
    }
    const l = t.addController(Pioneer.AlignController);
    l.setPrimaryAlignType("point");
    l.setPrimaryAxis(Pioneer.Vector3.YAxis);
    l.setPrimaryTargetEntity(e.getName());
    void 0 !== finalUp && (finalUpRelativeEntity ??= e, r ? (l.setSecondaryAlignType("position"), l.setSecondaryAxis(Pioneer.Vector3.ZAxis), l.setSecondaryTargetEntity(finalUpRelativeEntity.getName())) : (l.setSecondaryAlignType("align"), l.setSecondaryAxis(Pioneer.Vector3.ZAxis), l.setSecondaryTargetEntity(finalUpRelativeEntity.getName()), l.setSecondaryTargetAxis(finalUp)));
    const c = t.addController(Pioneer.TransitionController);
    c.setTransitionTime(i);
    await c.getEndPromise();
  }
  static async goToEntity(t, e, {
    up: i = true,
    orbiter: n = false,
    fixedToParent: o = false,
    duration: r = 1,
    distance: distance,
    zoom: l = true,
    destination: destination,
    destinationUp: destinationUp,
    destinationInFocusFrame: d = false,
    transitionFunction: transitionFunction
  }) {
    for (distance ??= 5 * e.getExtentsRadius();;) {
      const e = t.getParent();
      if (!e || e.isInPositionCoverage()) break;
      t.setParent(e.getParent());
    }
    if ((!t.getParent() || t.getPosition().isNaN() || t.getOrientation().isNaN()) && (t.setParent(e), void 0 === destination ? t.setPosition(new Pioneer.Vector3(0, -distance, 0)) : t.setPosition(destination), t.setOrientation(Pioneer.Quaternion.Identity), r = 0), void 0 === destination) {
      const vector3 = new Pioneer.Vector3();
      t.getPositionRelativeToEntity(vector3, Pioneer.Vector3.Zero, e);
      vector3.normalize(vector3);
      vector3.mult(vector3, distance);
      vector3.isNaN() && vector3.set(0, -distance, 0);
      destination = vector3;
    }
    t.clearControllers();
    const p = t.addController(Pioneer.FixedController);
    if (p.setPosition(destination), void 0 !== destinationUp) {
      const vector3 = new Pioneer.Vector3();
      const i = new Pioneer.Vector3();
      vector3.neg(destination);
      vector3.isZero() && t.getOrientation().getAxis(vector3, 1);
      vector3.normalize(vector3);
      i.setNormalTo(vector3, destinationUp);
      const quaternion = new Pioneer.Quaternion();
      quaternion.setFromAxes(void 0, vector3, i);
      p.setOrientation(quaternion);
    }
    if (d) {
      const e = t.addController(Pioneer.RotateByEntityOrientationController);
      void 0 === destinationUp && e.setRotatingOrientation(false);
    }
    this.focusOnEntity(t, e, {
      up: i,
      orbiter: n
    });
    const _ = t.addController(Pioneer.TransitionController);
    _.setTransitionTime(r);
    _.setParent(e.getName());
    transitionFunction && _.setTransitionFunction(transitionFunction);
    await _.getEndPromise();
    t.clearControllers();
    const m = t.addController(Pioneer.OrbitController);
    i ? n ? m.setYawAxisType("position") : m.setYawAxisType("z-axis") : t.addController(Pioneer.RollController);
    o && t.addController(Pioneer.FixedToParentController);
    l && t.addController(Pioneer.ZoomController);
    this.focusOnEntity(t, e, {
      up: i,
      orbiter: n
    });
  }
  static pickOnEntity(t, e, i) {
    const n = t.addController(Pioneer.PickController);
    n.setPickedEntity(e);
    n.setCallback(t => {
      const n = e.getComponent(Pioneer.SpheroidComponent);
      if (null !== n) {
        const o = Pioneer.Vector3.pool.get();
        o.rotateInverse(e.getOrientation(), t);
        const r = Pioneer.LatLonAlt.pool.get();
        n.llaFromXYZ(r, o);
        i(o, r);
        Pioneer.LatLonAlt.pool.release(r);
        Pioneer.Vector3.pool.release(o);
      }
    });
  }
  static getDistanceToFitEntities(t, e, i, n) {
    const o = t.getComponent(Pioneer.CameraComponent);
    if (null === o) return NaN;
    let r = 0;
    const a = Pioneer.Vector3.pool.get();
    const l = Math.sin(o.getHorizontalFieldOfView() / 2);
    const c = Math.sin(o.getVerticalFieldOfView() / 2);
    const h = Math.tan(o.getHorizontalFieldOfView() / 2);
    const d = Math.tan(o.getVerticalFieldOfView() / 2);
    for (let t = 0; t < n.length; t++) {
      const o = n[t];
      let u = 0;
      const p = o.getComponent(Pioneer.RingsComponent);
      null !== p && (u = p.getOuterRadius());
      o.getPositionRelativeToEntity(a, Pioneer.Vector3.Zero, i);
      a.rotateInverse(e, a);
      r = Math.max(r, Math.abs(a.x) / h + Math.max(o.getExtentsRadius(), u) / l - a.y);
      r = Math.max(r, Math.abs(a.z) / d + Math.max(o.getExtentsRadius(), u) / c - a.y);
    }
    Pioneer.Vector3.pool.release(a);
    return r;
  }
}
export { Cameras };
