// Recovered from app.js:860931-861814.
import * as Pioneer from "../pioneer/index.js";
class EntityUtils {
  static addGeyser(t, e, i, n, o, r, a, l) {
    const c = t.addComponent(Pioneer.ParticleSprayComponent);
    c.setNumberOfParticles(n);
    c.setSizeOfParticles(.25 * e * r);
    c.setSpeedOfParticles(o * e);
    c.setColorOfParticles(new Pioneer.Color(1, 1, 1, .5 * i));
    c.setSpread(1 * r);
    c.setParticleSpacingRandom(false);
    c.setLength(2.5 * e);
    c.setOriginOffset(new Pioneer.Vector3(a[0], a[1], a[2]));
    c.setDirection(new Pioneer.Vector3(l[0], l[1], l[2]));
  }
  static showSubObjectDuringInterval(t, e, i, n) {
    const o = t.getComponent(Pioneer.ModelComponent);
    if (!o) return;
    o.setHiddenObject(e, true);
    const r = t.addController(Pioneer.CoverageController);
    r.setCoverage(new Pioneer.Interval(i, n));
    r.setEnterFunction(t => {
      const i = t.getComponent(Pioneer.ModelComponent);
      i && i.setHiddenObject(e, false);
    });
    r.setExitFunction(t => {
      const i = t.getComponent(Pioneer.ModelComponent);
      i && i.setHiddenObject(e, true);
    });
  }
}
export { EntityUtils };
