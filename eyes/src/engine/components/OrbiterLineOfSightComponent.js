/** @eyes-analysis
 * 文件职责：计算轨道器与地面/目标的视线几何并绘制可见性辅助图形。
 * 依据：import ../pioneer/index.js；OrbiterLineOfSightComponent extends Pioneer.BaseComponent @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:9615-11645.
import * as Pioneer from "../pioneer/index.js";
/** @eyes-analysis
 * 类职责：计算轨道器与地面/目标的视线几何并绘制可见性辅助图形。
 * 继承：Pioneer.BaseComponent；导出：OrbiterLineOfSightComponent。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class OrbiterLineOfSightComponent extends Pioneer.BaseComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `_color`、`_colors`、`_distanceThreshold`、`_ignoreDistance`、`_lineMesh`、`_positions`、`_targetA`、`_targetB`；调用 `e.getScene`、`e.getScene().getThreeJsScene`、`new Pioneer.Color`、`super`、`this.__setRadius`。
   * 状态写入：_color、_colors、_distanceThreshold、_ignoreDistance、_lineMesh、_positions、_targetA、_targetB等；完整记录见索引。
   * 调用线索：e.getScene、e.getScene().getThreeJsScene、new Pioneer.Color、super、this.__setRadius。
   */
  constructor(t, e) {
    super(t, e);
    this._targetA = null;
    this._targetB = null;
    this._ignoreDistance = false;
    this._distanceThreshold = {
      min: 2,
      max: 20
    };
    this._positions = [];
    this._colors = [];
    this._widths = [];
    this._color = new Pioneer.Color(1, 1, 0);
    this._width = 2;
    this._threeJsScene = e.getScene().getThreeJsScene();
    this._lineMesh = null;
    this.__setRadius(Number.POSITIVE_INFINITY);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_targetA`、`_targetB`；调用 `this.getEntity`、`this.getEntity().getScene`、`this.getEntity().getScene().getEntity`。
   * 状态写入：_targetA、_targetB。
   * 调用线索：this.getEntity、this.getEntity().getScene、this.getEntity().getScene().getEntity。
   */
  setTargets(targetA, targetB) {
    "string" == typeof targetA && (targetA = this.getEntity().getScene().getEntity(targetA));
    "string" == typeof targetB && (targetB = this.getEntity().getScene().getEntity(targetB));
    this._targetA = targetA;
    this._targetB = targetB;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_color`。
   * 状态写入：_color。
   */
  setColor(color) {
    this._color = color;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_width`。
   * 状态写入：_width。
   */
  setWidth(width) {
    this._width = width;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_lineMesh`；返回 `Promise.resolve()`；调用 `Promise.resolve`、`new Pioneer.LineMesh`。
   * 状态写入：_lineMesh。
   * 调用线索：Promise.resolve、new Pioneer.LineMesh。
   */
  __loadResources() {
    this._lineMesh = new Pioneer.LineMesh(this);
    return Promise.resolve();
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
   * 【结构证据】写入 `_color.a`、`getThreeJsObjects()[0].visible`；返回 `void(this.getThreeJsObjects().length>0&&(this.getThreeJsObjects()[0].visible=false))`；调用 `Pioneer.ThreeJsHelper.setPositionToEntity`、`t.getEntity`、`t.getEntity().getPosition`、`t.getEntity().getPosition().magnitude`、`this._lineMesh.prepareForRender`、`this._updatePoints`。
   * 状态写入：_color.a、getThreeJsObjects()[0].visible。
   * 调用线索：Pioneer.ThreeJsHelper.setPositionToEntity、t.getEntity、t.getEntity().getPosition、t.getEntity().getPosition().magnitude、this._lineMesh.prepareForRender等。
   */
  __prepareForRender(t) {
    if (null === this._targetA || null === this._targetB) return void (this.getThreeJsObjects().length > 0 && (this.getThreeJsObjects()[0].visible = false));
    this._updatePoints(t);
    let e = 1;
    if (!this._ignoreDistance) {
      e *= (t.getEntity().getPosition().magnitude() - this._distanceThreshold.min) / (this._distanceThreshold.max - this._distanceThreshold.min);
    }
    Pioneer.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), t);
    this._color.a = e;
    this._lineMesh.prepareForRender(t);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_colors`、`_positions`、`_widths`；调用 `Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`this._colors.push`、`this._lineMesh.setColors`、`this._lineMesh.setPositions`、`this._lineMesh.setWidths`。
   * 状态写入：_colors、_positions、_widths。
   * 调用线索：Pioneer.Vector3.pool.get、Pioneer.Vector3.pool.release、this._colors.push、this._lineMesh.setColors、this._lineMesh.setPositions等。
   */
  _updatePoints() {
    const t = Pioneer.Vector3.pool.get();
    const e = Pioneer.Vector3.pool.get();
    this._targetA.getPositionRelativeToEntity(t, Pioneer.Vector3.Zero, this.getEntity());
    this._targetB.getPositionRelativeToEntity(e, Pioneer.Vector3.Zero, this.getEntity());
    this._positions = [];
    this._positions.push(t);
    this._positions.push(e);
    this._lineMesh.setPositions(this._positions);
    const color = this._color;
    this._colors = [];
    this._colors.push(color);
    this._colors.push(color);
    this._lineMesh.setColors(this._colors);
    this._widths = [];
    this._widths.push(this._width);
    this._widths.push(this._width);
    this._lineMesh.setWidths(this._widths);
    Pioneer.Vector3.pool.release(t);
    Pioneer.Vector3.pool.release(e);
  }
}
export { OrbiterLineOfSightComponent };
