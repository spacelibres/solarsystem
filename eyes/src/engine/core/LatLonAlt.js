/** @eyes-analysis
 * 文件职责：纬度、经度、高度值对象及其池化存储。
 * 依据：import ../pioneer/public-api.js；LatLonAlt @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:74701-75335.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：纬度、经度、高度值对象及其池化存储。
 * 继承：无显式父类；导出：LatLonAlt。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class LatLonAlt {
  static pool = new PioneerPublicApi.Pool(LatLonAlt);
  /** @eyes-analysis
   * 【结构证据】写入 `_alt`、`_lat`、`_lon`。
   * 状态写入：_alt、_lat、_lon。
   */
  constructor(lat = 0, lon = 0, alt = 0) {
    this._lat = lat;
    this._lon = lon;
    this._alt = alt;
  }
  /** @eyes-analysis
   * 【结构证据】读取访问器，返回 `this._lat`；本访问器没有 AST 可见的 this 字段直接赋值。
   */
  get lat() {
    return this._lat;
  }
  /** @eyes-analysis
   * 【结构证据】写入访问器，接收参数 (lat)；实际写入 `_lat`。
   * 状态写入：_lat。
   */
  set lat(lat) {
    this._lat = lat;
  }
  /** @eyes-analysis
   * 【结构证据】读取访问器，返回 `this._lon`；本访问器没有 AST 可见的 this 字段直接赋值。
   */
  get lon() {
    return this._lon;
  }
  /** @eyes-analysis
   * 【结构证据】写入访问器，接收参数 (lon)；实际写入 `_lon`。
   * 状态写入：_lon。
   */
  set lon(lon) {
    this._lon = lon;
  }
  /** @eyes-analysis
   * 【结构证据】读取访问器，返回 `this._alt`；本访问器没有 AST 可见的 this 字段直接赋值。
   */
  get alt() {
    return this._alt;
  }
  /** @eyes-analysis
   * 【结构证据】写入访问器，接收参数 (alt)；实际写入 `_alt`。
   * 状态写入：_alt。
   */
  set alt(alt) {
    this._alt = alt;
  }
  /** @eyes-analysis
   * 【结构证据】本访问器没有 AST 可见的 this 字段直接赋值；调用 `PioneerPublicApi.MathUtils.radToDeg`。
   * 调用线索：PioneerPublicApi.MathUtils.radToDeg。
   */
  toString(t = false) {
    return t ? `[${PioneerPublicApi.MathUtils.radToDeg(this._lat)}, ${PioneerPublicApi.MathUtils.radToDeg(this._lon)}, ${this._alt}]` : `[${this._lat}, ${this._lon}, ${this._alt}]`;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_alt`、`_lat`、`_lon`。
   * 状态写入：_alt、_lat、_lon。
   */
  copy(t) {
    this._lat = t.lat;
    this._lon = t.lon;
    this._alt = t.alt;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_alt`、`_lat`、`_lon`。
   * 状态写入：_alt、_lat、_lon。
   */
  set(lat, lon, alt) {
    this._lat = lat;
    this._lon = lon;
    this._alt = alt;
  }
  _lat;
  _lon;
  _alt;
}
export { LatLonAlt };
