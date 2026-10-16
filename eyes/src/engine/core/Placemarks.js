// Recovered from app.js:732069-733451.
import * as Pioneer from "../pioneer/index.js";
class Placemarks {
  static addPlacemark(t, e, i, n, o, r) {
    const a = i.getScene().addEntity(t);
    a.setParent(i);
    a.setCanOcclude(false);
    a.setExtentsRadius(.001);
    const l = a.addComponent(Pioneer.DivComponent).getDiv();
    l.innerHTML = e;
    l.classList.add("pioneer-label-div");
    a.addController(Pioneer.FixedController);
    a.addController(Pioneer.RotateByEntityOrientationController);
    a.addController(Pioneer.GroundClampController);
    this.updateLLA(a, n, o, r);
    return a;
  }
  static updateLLA(t, e, i, n) {
    const o = t.getParent();
    const r = t.getController(Pioneer.FixedController);
    const a = t.getController(Pioneer.GroundClampController);
    if (null === o || null === r || null === a) throw new Error("There must be a parent and fixed and ground clamp controllers.");
    const l = o.getComponent(Pioneer.SpheroidComponent);
    if (null === l) throw new Error("There must be a spheroid for the placemark's parent.");
    const c = Pioneer.LatLonAlt.pool.get();
    const h = Pioneer.Vector3.pool.get();
    c.set(Pioneer.MathUtils.degToRad(e), Pioneer.MathUtils.degToRad(i), 0);
    l.xyzFromLLA(h, c);
    r.setPosition(h);
    Pioneer.Vector3.pool.release(h);
    const d = Pioneer.Quaternion.pool.get();
    const u = Pioneer.Vector3.pool.get();
    const p = Pioneer.Vector3.pool.get();
    l.eastFromLLA(u, c);
    l.northFromLLA(p, c);
    d.setFromAxes(u, p, void 0);
    r.setOrientation(d);
    Pioneer.Vector3.pool.release(u);
    Pioneer.Vector3.pool.release(p);
    Pioneer.Quaternion.pool.release(d);
    Pioneer.LatLonAlt.pool.release(c);
    a.setGroundEntityRef(o.getName());
    a.setDistanceFromGround(n);
  }
}
export { Placemarks };
