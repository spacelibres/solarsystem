// Recovered from app.js:757816-761933.
import * as Pioneer from "../pioneer/index.js";
class OrbitLineComponent extends Pioneer.BaseComponent {
  constructor(t, e) {
    super(t, e);
    this._color = new Pioneer.Color(1, 1, 1, 1);
    this._farSideAlphaFade = 1;
    this._lineWidth = 5;
    this._glowWidth = 0;
    this._lineMesh = null;
    this._positions = [];
    this._colors = [];
    this._widths = [];
    this.__setRadius(Number.POSITIVE_INFINITY);
  }
  getColor() {
    return this._color;
  }
  setColor(t) {
    if (this._color.copy(t), null !== this._lineMesh) {
      for (let t = 0, e = this._colors.length; t < e; t++) this._colors[t].copy(this._color);
      this._lineMesh.setColors(this._colors);
    }
  }
  getFarSideAlphaFade() {
    return this._farSideAlphaFade;
  }
  setFarSideAlphaFade(farSideAlphaFade) {
    this._farSideAlphaFade = farSideAlphaFade;
  }
  getLineWidth() {
    return this._lineWidth;
  }
  setLineWidth(lineWidth) {
    if (this._lineWidth = lineWidth, null !== this._lineMesh) {
      for (let t = 0, e = this._widths.length; t < e; t++) this._widths[t] = this._lineWidth;
      this._lineMesh.setWidths(this._widths);
    }
  }
  setGlowWidth(glowWidth) {
    this._glowWidth = glowWidth;
    Pioneer.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "glowWidth", this._glowWidth);
  }
  __prepareForRender(t) {
    this._lineMesh && (this._updateMesh(), Pioneer.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects(), this.getEntity(), t), this._lineMesh.prepareForRender(t));
  }
  async __loadResources() {
    this._lineMesh = new Pioneer.LineMesh(this);
    for (let t = 0, e = 720; t < e; t++) {
      this._positions.push(new Pioneer.Vector3());
      this._colors.push(new Pioneer.Color());
      this._colors[t].copy(this._color);
      this._widths.push(this._lineWidth);
    }
    this._lineMesh.setColors(this._colors);
    this._lineMesh.setWidths(this._widths);
    this._lineMesh.setGlowWidth(this._glowWidth);
  }
  __unloadResources() {
    this._positions = [];
    this._colors = [];
    this._widths = [];
    Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
    this._lineMesh = null;
  }
  _updateMesh() {
    if (!this._lineMesh) return;
    const t = this.getEntity();
    const e = t.getScene().getEngine().getTime();
    let i = 0;
    for (let n = t.getNumControllers() - 1; n >= 0; n--) {
      const o = t.getController(Pioneer.DynamoController, n);
      if (null !== o && o.getCoverage().contains(e) && "orb" === o.getPointType()) {
        i = (o.getHeaderValue("gravitationalParameter1") ?? 1) + (o.getHeaderValue("gravitationalParameter2") ?? 0);
        break;
      }
    }
    OrbitLineComponent.orbitalElements.setFromPositionAndVelocity(t.getPosition(), t.getVelocity(), e, i);
    const n = t.getPosition();
    const o = OrbitLineComponent.orbitalElements.getTrueAnomalyFromPosition(n);
    const r = OrbitLineComponent.orbitalElements.getEccentricAnomalyFromTrueAnomaly(o);
    let a = false;
    for (let t = 0; t < 360; t += 1) {
      const e = 2 * t;
      const i = (2 * t - 1 + this._positions.length) % this._positions.length;
      const o = this._positions[e];
      const l = this._positions[i];
      const c = this._colors[e];
      const h = this._colors[i];
      let d = OrbitLineComponent.orbitalElements.getEccentricAnomalyFromTrueAnomaly(Pioneer.MathUtils.degToRad(t - 180));
      const u = OrbitLineComponent.orbitalElements.getEccentricAnomalyFromTrueAnomaly(Pioneer.MathUtils.degToRad(t + 1 - 180));
      (d < r && r < u || u < d && d < r && r < u + Pioneer.MathUtils.TwoPi) && (d = r);
      const p = OrbitLineComponent.orbitalElements.getMeanAnomalyFromEccentricAnomaly(d);
      const _ = OrbitLineComponent.orbitalElements.epoch + (p - OrbitLineComponent.orbitalElements.meanAnomalyAtEpoch) / OrbitLineComponent.orbitalElements.meanAngularMotion;
      if (OrbitLineComponent.orbitalElements.project(o, OrbitLineComponent.velocity, _), o.sub(o, n), l.copy(o), isNaN(p)) {
        a = true;
        const t = (e + 1) % this._positions.length;
        const s = (i - 1 + this._positions.length) % this._positions.length;
        const n = this._positions[t];
        const r = this._positions[s];
        const d = this._colors[t];
        const u = this._colors[s];
        o.set(0, 0, 0);
        l.set(0, 0, 0);
        n.set(0, 0, 0);
        r.set(0, 0, 0);
        c.a = 0;
        h.a = 0;
        d.a = 0;
        u.a = 0;
        continue;
      }
      let m = Pioneer.MathUtils.angle(d, r) / Math.PI;
      m = Pioneer.MathUtils.clamp01(m);
      const g = Pioneer.MathUtils.lerp(1, this._farSideAlphaFade, m);
      c.mult(this._color, g);
      a || h.mult(this._color, g);
      a = false;
    }
    OrbitLineComponent.orbitalElements.eccentricity >= 1 && (this._positions[this._positions.length - 2].copy(this._positions[this._positions.length - 3]), this._positions[this._positions.length - 1].copy(this._positions[this._positions.length - 3]), this._colors[this._colors.length - 2].a = 0, this._colors[this._colors.length - 1].a = 0);
    this._lineMesh.setPositions(this._positions);
    this._lineMesh.setColors(this._colors);
  }
  _color;
  _farSideAlphaFade;
  _lineWidth;
  _glowWidth;
  _lineMesh;
  _positions;
  _colors;
  _widths;
  static orbitalElements = new Pioneer.OrbitalElements();
  static velocity = new Pioneer.Vector3();
}
export { OrbitLineComponent };
