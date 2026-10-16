/** @eyes-analysis
 * 文件职责：根据动力学控制器的轨道元素生成环形轨道线，按显示区间设置透明度。
 * 依据：import ../pioneer/index.js；OrbitLineComponent extends Pioneer.BaseComponent @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:757816-761933.
import * as Pioneer from "../pioneer/index.js";
/** @eyes-analysis
 * 类职责：根据动力学控制器的轨道元素生成环形轨道线，按显示区间设置透明度。
 * 继承：Pioneer.BaseComponent；导出：OrbitLineComponent。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class OrbitLineComponent extends Pioneer.BaseComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `_color`、`_colors`、`_farSideAlphaFade`、`_glowWidth`、`_lineMesh`、`_lineWidth`、`_positions`、`_widths`；调用 `new Pioneer.Color`、`super`、`this.__setRadius`。
   * 状态写入：_color、_colors、_farSideAlphaFade、_glowWidth、_lineMesh、_lineWidth、_positions、_widths。
   * 调用线索：new Pioneer.Color、super、this.__setRadius。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `this._color`。
   */
  getColor() {
    return this._color;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._color.copy`、`this._colors[t].copy`、`this._lineMesh.setColors`。
   * 调用线索：this._color.copy、this._colors[t].copy、this._lineMesh.setColors。
   */
  setColor(t) {
    if (this._color.copy(t), null !== this._lineMesh) {
      for (let t = 0, e = this._colors.length; t < e; t++) this._colors[t].copy(this._color);
      this._lineMesh.setColors(this._colors);
    }
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._farSideAlphaFade`。
   */
  getFarSideAlphaFade() {
    return this._farSideAlphaFade;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_farSideAlphaFade`。
   * 状态写入：_farSideAlphaFade。
   */
  setFarSideAlphaFade(farSideAlphaFade) {
    this._farSideAlphaFade = farSideAlphaFade;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._lineWidth`。
   */
  getLineWidth() {
    return this._lineWidth;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_lineWidth`、`_widths[t]`；调用 `this._lineMesh.setWidths`。
   * 状态写入：_lineWidth、_widths[t]。
   * 调用线索：this._lineMesh.setWidths。
   */
  setLineWidth(lineWidth) {
    if (this._lineWidth = lineWidth, null !== this._lineMesh) {
      for (let t = 0, e = this._widths.length; t < e; t++) this._widths[t] = this._lineWidth;
      this._lineMesh.setWidths(this._widths);
    }
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_glowWidth`；调用 `Pioneer.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。
   * 状态写入：_glowWidth。
   * 调用线索：Pioneer.ThreeJsHelper.setUniformNumber、this.getThreeJsMaterials。
   */
  setGlowWidth(glowWidth) {
    this._glowWidth = glowWidth;
    Pioneer.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "glowWidth", this._glowWidth);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Pioneer.ThreeJsHelper.setPositionToEntity`、`this._lineMesh.prepareForRender`、`this._updateMesh`、`this.getEntity`、`this.getThreeJsObjects`。
   * 调用线索：Pioneer.ThreeJsHelper.setPositionToEntity、this._lineMesh.prepareForRender、this._updateMesh、this.getEntity、this.getThreeJsObjects。
   */
  __prepareForRender(t) {
    this._lineMesh && (this._updateMesh(), Pioneer.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects(), this.getEntity(), t), this._lineMesh.prepareForRender(t));
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_lineMesh`；调用 `new Pioneer.Color`、`new Pioneer.LineMesh`、`new Pioneer.Vector3`、`this._colors.push`、`this._colors[t].copy`、`this._lineMesh.setColors`。
   * 状态写入：_lineMesh。
   * 调用线索：new Pioneer.Color、new Pioneer.LineMesh、new Pioneer.Vector3、this._colors.push、this._colors[t].copy等。
   */
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
  /** @eyes-analysis
   * 【结构证据】写入 `_colors`、`_lineMesh`、`_positions`、`_widths`；调用 `Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials`。
   * 状态写入：_colors、_lineMesh、_positions、_widths。
   * 调用线索：Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials。
   */
  __unloadResources() {
    this._positions = [];
    this._colors = [];
    this._widths = [];
    Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
    this._lineMesh = null;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_colors[this._colors.length-1].a`、`_colors[this._colors.length-2].a`；返回 `void`；调用 `OrbitLineComponent.orbitalElements.getEccentricAnomalyFromTrueAnomaly`、`OrbitLineComponent.orbitalElements.getMeanAnomalyFromEccentricAnomaly`、`OrbitLineComponent.orbitalElements.getTrueAnomalyFromPosition`、`OrbitLineComponent.orbitalElements.project`、`OrbitLineComponent.orbitalElements.setFromPositionAndVelocity`、`Pioneer.MathUtils.angle`。
   * 状态写入：_colors[this._colors.length-1].a、_colors[this._colors.length-2].a。
   * 调用线索：OrbitLineComponent.orbitalElements.getEccentricAnomalyFromTrueAnomaly、OrbitLineComponent.orbitalElements.getMeanAnomalyFromEccentricAnomaly、OrbitLineComponent.orbitalElements.getTrueAnomalyFromPosition、OrbitLineComponent.orbitalElements.project、OrbitLineComponent.orbitalElements.setFromPositionAndVelocity等。
   */
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
