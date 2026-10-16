/** @eyes-analysis
 * 文件职责：依据相机/视场参数构造可视化视锥，提供观察方向和覆盖范围辅助图形。
 * 依据：import ../pioneer/index.js；FrustumComponent extends Pioneer.BaseComponent @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:750609-757815.
import * as Pioneer from "../pioneer/index.js";
/** @eyes-analysis
 * 类职责：依据相机/视场参数构造可视化视锥，提供观察方向和覆盖范围辅助图形。
 * 继承：Pioneer.BaseComponent；导出：FrustumComponent。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class FrustumComponent extends Pioneer.BaseComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `_color`、`_direction`、`_farBase`、`_frustumType`、`_hFOVRad`、`_hiddenPyramidEdges`、`_intersectionEntities`、`_keyframes`；调用 `new Pioneer.Color`、`new Pioneer.Vector2`、`new Pioneer.Vector3`、`super`。
   * 状态写入：_color、_direction、_farBase、_frustumType、_hFOVRad、_hiddenPyramidEdges、_intersectionEntities、_keyframes等；完整记录见索引。
   * 调用线索：new Pioneer.Color、new Pioneer.Vector2、new Pioneer.Vector3、super。
   */
  constructor(t, e) {
    super(t, e);
    this._frustumType = "pyramid";
    this._color = new Pioneer.Color(1, 1, 1, 1);
    this._lineWidth = 1;
    this._lineMesh = null;
    this._intersectionEntities = [];
    this._length = 1;
    this._hFOVRad = 1;
    this._vFOVRad = 1;
    this._nearBase = new Pioneer.Vector2(0, 0);
    this._farBase = new Pioneer.Vector2(0, 0);
    this._originOffset = new Pioneer.Vector3(0, 0, 0);
    this._direction = new Pioneer.Vector3(1, 0, 0);
    this._spinAngle = 0;
    this._relativeToEntityOrientation = true;
    this._numberOfCirclePoints = 24;
    this._numConeLines = 2;
    this._hiddenPyramidEdges = [];
    this._keyframes = [];
    this._useKeyframes = false;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._frustumType`。
   */
  getFrustumType() {
    return this._frustumType;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_frustumType`。
   * 状态写入：_frustumType。
   */
  setFrustumType(frustumType) {
    this._frustumType = frustumType;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._intersectionEntities`。
   */
  getIntersectionEntities() {
    return this._intersectionEntities;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_intersectionEntities`。
   * 状态写入：_intersectionEntities。
   */
  setIntersectionEntities(intersectionEntities) {
    this._intersectionEntities = intersectionEntities;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._hFOVRad`。
   */
  getHorizontalFOV() {
    return this._hFOVRad;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._vFOVRad`。
   */
  getVerticalFOV() {
    return this._vFOVRad;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_hFOVRad`、`_vFOVRad`；调用 `this._farBaseFromLengthAndFOV`。
   * 状态写入：_hFOVRad、_vFOVRad。
   * 调用线索：this._farBaseFromLengthAndFOV。
   */
  setFOVRadians(hFOVRad, vFOVRad = hFOVRad) {
    this._hFOVRad = hFOVRad;
    this._vFOVRad = vFOVRad;
    this._farBaseFromLengthAndFOV(this._farBase, this._length, this._hFOVRad, this._vFOVRad);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Pioneer.MathUtils.degToRad`、`this.setFOVRadians`。
   * 调用线索：Pioneer.MathUtils.degToRad、this.setFOVRadians。
   */
  setFOVDegrees(t, e = t) {
    this.setFOVRadians(Pioneer.MathUtils.degToRad(t), Pioneer.MathUtils.degToRad(e));
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._length`。
   */
  getLength() {
    return this._length;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_length`；调用 `this.setFOVRadians`。
   * 状态写入：_length。
   * 调用线索：this.setFOVRadians。
   */
  setLength(length) {
    this._length = length;
    this.setFOVRadians(this._hFOVRad, this._vFOVRad);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._nearBase`。
   */
  getNearBase() {
    return this._nearBase;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._nearBase.set`、`this._updateFOVFromBases`。
   * 调用线索：this._nearBase.set、this._updateFOVFromBases。
   */
  setNearBase(t, e = t) {
    this._nearBase.set(t, e);
    this._updateFOVFromBases();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._farBase`。
   */
  getFarBase() {
    return this._farBase;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._farBase.set`、`this._updateFOVFromBases`。
   * 调用线索：this._farBase.set、this._updateFOVFromBases。
   */
  setFarBase(t, e = t) {
    this._farBase.set(t, e);
    this._updateFOVFromBases();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._color`。
   */
  getColor() {
    return this._color;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._color.copy`。
   * 调用线索：this._color.copy。
   */
  setColor(t) {
    this._color.copy(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._originOffset`。
   */
  getOriginOffset() {
    return this._originOffset;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._originOffset.copy`。
   * 调用线索：this._originOffset.copy。
   */
  setOriginOffset(t) {
    this._originOffset.copy(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._direction`。
   */
  getDirection() {
    return this._direction;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._direction.normalize`。
   * 调用线索：this._direction.normalize。
   */
  setDirection(t) {
    this._direction.normalize(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._spinAngle`。
   */
  getSpinAngle() {
    return this._spinAngle;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_spinAngle`。
   * 状态写入：_spinAngle。
   */
  setSpinAngle(spinAngle) {
    this._spinAngle = spinAngle;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._numberOfCirclePoints`。
   */
  getNumberOfCirclePoints() {
    return this._numberOfCirclePoints;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_numberOfCirclePoints`。
   * 状态写入：_numberOfCirclePoints。
   */
  setNumberOfCirclePoints(numberOfCirclePoints) {
    this._numberOfCirclePoints = numberOfCirclePoints;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._numConeLines`。
   */
  getNumConeLines() {
    return this._numConeLines;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_numConeLines`。
   * 状态写入：_numConeLines。
   */
  setNumConeLines(numConeLines) {
    this._numConeLines = numConeLines;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._hiddenPyramidEdges`。
   */
  getHiddenPyramidEdges() {
    return this._hiddenPyramidEdges;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_hiddenPyramidEdges`。
   * 状态写入：_hiddenPyramidEdges。
   */
  setHiddenPyramidEdges(hiddenPyramidEdges) {
    this._hiddenPyramidEdges = hiddenPyramidEdges;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._relativeToEntityOrientation`。
   */
  getRelativeToEntityOrientation() {
    return this._relativeToEntityOrientation;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._keyframes`。
   */
  getKeyframes() {
    return this._keyframes;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_keyframes`；调用 `this._updateMesh`。
   * 状态写入：_keyframes。
   * 调用线索：this._updateMesh。
   */
  setKeyframes(keyframes) {
    this._keyframes = keyframes;
    this._updateMesh();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._useKeyframes`。
   */
  getUseKeyframes() {
    return this._useKeyframes;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_useKeyframes`；调用 `this._updateMesh`。
   * 状态写入：_useKeyframes。
   * 调用线索：this._updateMesh。
   */
  setUseKeyframes(useKeyframes) {
    this._useKeyframes = useKeyframes;
    this._updateMesh();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_relativeToEntityOrientation`。
   * 状态写入：_relativeToEntityOrientation。
   */
  setRelativeToEntityOrientation(relativeToEntityOrientation) {
    this._relativeToEntityOrientation = relativeToEntityOrientation;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Math.tan`、`t.set`。
   * 调用线索：Math.tan、t.set。
   */
  _farBaseFromLengthAndFOV(t, e, i, s) {
    e += this._nearBase.x / 2 / Math.tan(i / 2);
    t.set(Math.tan(i / 2) * e * 2, Math.tan(s / 2) * e * 2);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_hFOVRad`、`_vFOVRad`；调用 `Math.atan`、`Math.tan`。
   * 状态写入：_hFOVRad、_vFOVRad。
   * 调用线索：Math.atan、Math.tan。
   */
  _updateFOVFromBases() {
    if (this._nearBase.x > 0 && this._length > 0) {
      const t = this._nearBase.x / 2 / Math.tan(this._hFOVRad / 2) + this._length;
      this._hFOVRad = 2 * Math.atan(this._farBase.x / 2 / t);
      this._vFOVRad = 2 * Math.atan(this._farBase.y / 2 / t);
    }
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_lineMesh`；调用 `new Pioneer.LineMesh`、`this._updateMesh`。
   * 状态写入：_lineMesh。
   * 调用线索：new Pioneer.LineMesh、this._updateMesh。
   */
  async __loadResources() {
    this._lineMesh = new Pioneer.LineMesh(this);
    this._updateMesh();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_lineMesh`；调用 `Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials`。
   * 状态写入：_lineMesh。
   * 调用线索：Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials。
   */
  __unloadResources() {
    Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
    this._lineMesh = null;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Pioneer.ThreeJsHelper.setPositionToEntity`、`Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`e.rotate`、`t.rotate`、`this._lineMesh.prepareForRender`。
   * 调用线索：Pioneer.ThreeJsHelper.setPositionToEntity、Pioneer.Vector3.pool.get、Pioneer.Vector3.pool.release、e.rotate、t.rotate等。
   */
  __prepareForRender(t) {
    if (this._lineMesh) {
      if (this._updateMesh(), this._relativeToEntityOrientation) {
        const t = Pioneer.Vector3.pool.get();
        const e = Pioneer.Vector3.pool.get();
        t.rotate(this.getEntity().getOrientation(), this._originOffset);
        e.rotate(this.getEntity().getOrientation(), this._direction);
        Pioneer.Vector3.pool.release(t);
        Pioneer.Vector3.pool.release(e);
      }
      Pioneer.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), t);
      this._lineMesh.prepareForRender(t);
    }
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void` 或 `void this._updateLineMesh(t)`；调用 `Math.cos`、`Math.min`、`Math.sin`、`Pioneer.Geometry.getLineSphereIntersectionWithLineStartAtOrigin`、`Pioneer.Interval.pool.get`、`Pioneer.Interval.pool.release`。
   * 调用线索：Math.cos、Math.min、Math.sin、Pioneer.Geometry.getLineSphereIntersectionWithLineStartAtOrigin、Pioneer.Interval.pool.get等。
   */
  _updateMesh() {
    if (!this._lineMesh) return;
    const t = [];
    if (this._useKeyframes) {
      if (0 === this._keyframes.length) return void this._updateLineMesh(t);
      const e = this.getEntity().getScene().getEngine().getTime();
      const i = Pioneer.Sort.getIndexObject(e, this._keyframes, (t, e) => t[1] < e);
      const n = this._keyframes[i];
      if (n) {
        const i = n[0];
        const s = n[1];
        if (i > e || e >= s) return void this._updateLineMesh(t);
      }
    }
    let direction = this._direction;
    let originOffset = this._originOffset;
    const n = Pioneer.Vector3.pool.get();
    const o = Pioneer.Vector3.pool.get();
    if (this._relativeToEntityOrientation) {
      n.rotate(this.getEntity().getOrientation(), Pioneer.Vector3.YAxis);
      o.rotate(this.getEntity().getOrientation(), Pioneer.Vector3.XAxis);
      const t = Pioneer.Vector3.pool.get();
      const r = Pioneer.Vector3.pool.get();
      t.rotate(this.getEntity().getOrientation(), this._direction);
      r.rotate(this.getEntity().getOrientation(), this._originOffset);
      direction = t;
      originOffset = r;
    } else {
      n.copy(Pioneer.Vector3.YAxis);
      o.copy(Pioneer.Vector3.XAxis);
    }
    let length = this._length;
    let farBase = this._farBase;
    if (this._intersectionEntities.length > 0) {
      const t = Pioneer.Interval.pool.get();
      const i = Pioneer.Vector3.pool.get();
      i.setMagnitude(direction, this._length);
      const n = Pioneer.Vector3.pool.get();
      this._intersectionEntities.forEach(e => {
        const o = this.getEntity().getScene().getEntity(e);
        if (o && (o.getPositionRelativeToEntity(n, Pioneer.Vector3.Zero, this.getEntity()), Pioneer.Geometry.getLineSphereIntersectionWithLineStartAtOrigin(t, i, n, o.getExtentsRadius()), !isNaN(t.min) && t.min >= 0 && t.min <= 1)) {
          const e = t.min * this._length;
          const i = e > 100 ? 11 : 5;
          length = Math.min(length, e - i);
        }
      });
      Pioneer.Interval.pool.release(t);
      Pioneer.Vector3.pool.release(n);
      Pioneer.Vector3.pool.release(i);
      length < this._length && (farBase = Pioneer.Vector2.pool.get(), this._farBaseFromLengthAndFOV(farBase, length, this._hFOVRad, this._vFOVRad));
    }
    const l = Pioneer.Vector3.pool.get();
    const c = Pioneer.Vector3.pool.get();
    const h = Pioneer.Vector3.pool.get();
    h.set(originOffset.x + direction.x * length, originOffset.y + direction.y * length, originOffset.z + direction.z * length);
    const d = Pioneer.Quaternion.pool.get();
    d.setFromAxisAngle(direction, this._spinAngle);
    l.cross(direction, n);
    l.isZero() && l.cross(direction, o);
    l.normalize(l);
    c.cross(direction, l);
    c.normalize(c);
    l.rotate(d, l);
    c.rotate(d, c);
    const u = .5 * this._nearBase.x;
    const p = .5 * this._nearBase.y;
    const _ = .5 * farBase.x;
    const m = .5 * farBase.y;
    if ("pyramid" === this._frustumType) {
      const e = [this._calcPoint(originOffset, l, c, -1, -1, u, p), this._calcPoint(originOffset, l, c, 1, -1, u, p), this._calcPoint(originOffset, l, c, 1, 1, u, p), this._calcPoint(originOffset, l, c, -1, 1, u, p), this._calcPoint(h, l, c, -1, -1, _, m), this._calcPoint(h, l, c, 1, -1, _, m), this._calcPoint(h, l, c, 1, 1, _, m), this._calcPoint(h, l, c, -1, 1, _, m)];
      for (let i = 0; i < 4; i++) {
        t.push(e[i], e[(i + 1) % 4]);
        t.push(e[4 + i], e[4 + (i + 1) % 4]);
        this._hiddenPyramidEdges.includes(i) || t.push(e[i], e[4 + i]);
      }
    } else {
      const e = 2 * Math.PI / this._numberOfCirclePoints;
      let s = e;
      let n = this._calcPoint(originOffset, l, c, u, p, 1, 0);
      let o = this._calcPoint(h, l, c, _, m, 1, 0);
      for (let r = 0; r < this._numberOfCirclePoints; r++) {
        const r = this._calcPoint(originOffset, l, c, u, p, Math.cos(s), Math.sin(s));
        const a = this._calcPoint(h, l, c, _, m, Math.cos(s), Math.sin(s));
        t.push(n, r);
        t.push(o, a);
        n = r;
        o = a;
        s += e;
      }
      for (let e = 0; e < this._numConeLines; e++) {
        const s = e * (2 * Math.PI / this._numConeLines);
        const n = this._calcPoint(originOffset, l, c, u, p, Math.cos(s), Math.sin(s));
        const o = this._calcPoint(h, l, c, _, m, Math.cos(s), Math.sin(s));
        t.push(n, o);
      }
    }
    Pioneer.Vector3.pool.release(l);
    Pioneer.Vector3.pool.release(c);
    Pioneer.Vector3.pool.release(h);
    Pioneer.Quaternion.pool.release(d);
    this._relativeToEntityOrientation && (Pioneer.Vector3.pool.release(direction), Pioneer.Vector3.pool.release(originOffset));
    Pioneer.Vector3.pool.release(n);
    Pioneer.Vector3.pool.release(o);
    length < this._length && Pioneer.Vector2.pool.release(farBase);
    this._updateLineMesh(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `new Pioneer.Vector3(t.x+l*e.x+c*i.x,t.y+l*e.y+c*i.y,t.z+l*e.z+c*i.z)`；调用 `new Pioneer.Vector3`。
   * 调用线索：new Pioneer.Vector3。
   */
  _calcPoint(t, e, i, n, o, r, a) {
    const l = n * r;
    const c = o * a;
    return new Pioneer.Vector3(t.x + l * e.x + c * i.x, t.y + l * e.y + c * i.y, t.z + l * e.z + c * i.z);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `e.push`、`i.push`、`this._lineMesh.setColors`、`this._lineMesh.setPositions`、`this._lineMesh.setWidths`。
   * 调用线索：e.push、i.push、this._lineMesh.setColors、this._lineMesh.setPositions、this._lineMesh.setWidths。
   */
  _updateLineMesh(t) {
    if (!this._lineMesh) return;
    const e = [];
    for (let i = 0, s = t.length; i < s; i++) e.push(this._color);
    const i = [];
    for (let e = 0, s = t.length; e < s; e++) i.push(this._lineWidth);
    this._lineMesh.setPositions(t);
    this._lineMesh.setColors(e);
    this._lineMesh.setWidths(i);
  }
  _frustumType;
  _color;
  _lineWidth;
  _lineMesh;
  _intersectionEntities;
  _length;
  _hFOVRad;
  _vFOVRad;
  _nearBase;
  _farBase;
  _originOffset;
  _direction;
  _spinAngle;
  _relativeToEntityOrientation;
  _numberOfCirclePoints;
  _numConeLines;
  _hiddenPyramidEdges;
  _keyframes;
  _useKeyframes;
}
export { FrustumComponent };
