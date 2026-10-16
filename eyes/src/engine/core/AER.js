/** @eyes-analysis
 * 文件职责：方位角、仰角、距离坐标与三维向量之间的转换值对象。
 * 依据：import ../pioneer/public-api.js；AER @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:45346-46208.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：方位角、仰角、距离坐标与三维向量之间的转换值对象。
 * 继承：无显式父类；导出：AER。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class AER {
  static pool = new PioneerPublicApi.Pool(AER);
  /** @eyes-analysis
   * 【结构证据】写入 `_azimuth`、`_elevation`、`_range`。
   * 状态写入：_azimuth、_elevation、_range。
   */
  constructor(azimuth = 0, elevation = 0, range = 0) {
    this._azimuth = azimuth;
    this._elevation = elevation;
    this._range = range;
  }
  /** @eyes-analysis
   * 【结构证据】读取访问器，返回 `this._azimuth`；本访问器没有 AST 可见的 this 字段直接赋值。
   */
  get azimuth() {
    return this._azimuth;
  }
  /** @eyes-analysis
   * 【结构证据】写入访问器，接收参数 (azimuth)；实际写入 `_azimuth`。
   * 状态写入：_azimuth。
   */
  set azimuth(azimuth) {
    this._azimuth = azimuth;
  }
  /** @eyes-analysis
   * 【结构证据】读取访问器，返回 `this._elevation`；本访问器没有 AST 可见的 this 字段直接赋值。
   */
  get elevation() {
    return this._elevation;
  }
  /** @eyes-analysis
   * 【结构证据】写入访问器，接收参数 (elevation)；实际写入 `_elevation`。
   * 状态写入：_elevation。
   */
  set elevation(elevation) {
    this._elevation = elevation;
  }
  /** @eyes-analysis
   * 【结构证据】读取访问器，返回 `this._range`；本访问器没有 AST 可见的 this 字段直接赋值。
   */
  get range() {
    return this._range;
  }
  /** @eyes-analysis
   * 【结构证据】写入访问器，接收参数 (range)；实际写入 `_range`。
   * 状态写入：_range。
   */
  set range(range) {
    this._range = range;
  }
  /** @eyes-analysis
   * 【结构证据】本访问器没有 AST 可见的 this 字段直接赋值；调用 `PioneerPublicApi.MathUtils.radToDeg`。
   * 调用线索：PioneerPublicApi.MathUtils.radToDeg。
   */
  toString(t = false) {
    return t ? `[${PioneerPublicApi.MathUtils.radToDeg(this._azimuth)}, ${PioneerPublicApi.MathUtils.radToDeg(this._elevation)}, ${this._range}]` : `[${this._azimuth}, ${this._elevation}, ${this._range}]`;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_azimuth`、`_elevation`、`_range`。
   * 状态写入：_azimuth、_elevation、_range。
   */
  copy(t) {
    this._azimuth = t.azimuth;
    this._elevation = t.elevation;
    this._range = t.range;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_azimuth`、`_elevation`、`_range`。
   * 状态写入：_azimuth、_elevation、_range。
   */
  set(azimuth, elevation, range) {
    this._azimuth = azimuth;
    this._elevation = elevation;
    this._range = range;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_azimuth`、`_elevation`、`_range`；调用 `Math.asin`、`Math.atan2`、`t.magnitude`。
   * 状态写入：_azimuth、_elevation、_range。
   * 调用线索：Math.asin、Math.atan2、t.magnitude。
   */
  setFromVector(t) {
    this._range = t.magnitude();
    this._elevation = Math.asin(t.z / this._range);
    this._azimuth = Math.atan2(t.y, t.x);
  }
  _azimuth;
  _elevation;
  _range;
}
export { AER };
