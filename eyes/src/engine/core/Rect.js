/** @eyes-analysis
 * 文件职责：二维矩形边界、包含和相交运算。
 * 依据：import ../pioneer/public-api.js；Rect @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:59689-60681.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：二维矩形边界、包含和相交运算。
 * 继承：无显式父类；导出：Rect。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Rect {
  static pool = new PioneerPublicApi.Pool(Rect);
  /** @eyes-analysis
   * 【结构证据】写入 `_origin`、`_size`；调用 `new PioneerPublicApi.Vector2`。
   * 状态写入：_origin、_size。
   * 调用线索：new PioneerPublicApi.Vector2。
   */
  constructor(t = 0, e = 0, i = 0, n = 0) {
    this._origin = new PioneerPublicApi.Vector2(t, e);
    this._size = new PioneerPublicApi.Vector2(i, n);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._origin`。
   */
  get origin() {
    return this._origin;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._size`。
   */
  get size() {
    return this._size;
  }
  /** @eyes-analysis
   * 【结构证据】本访问器没有 AST 可见的 this 字段直接赋值。
   */
  toString() {
    return `[Origin: (${this._origin.x}, ${this._origin.y}), Size: (${this._size.x}, ${this._size.y})]`;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._origin.copy`、`this._size.copy`。
   * 调用线索：this._origin.copy、this._size.copy。
   */
  copy(t) {
    this._origin.copy(t.origin);
    this._size.copy(t.size);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._origin.set`、`this._size.set`。
   * 调用线索：this._origin.set、this._size.set。
   */
  set(t, e, i, s) {
    this._origin.set(t, e);
    this._size.set(i, s);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._origin.x<=t.x&&t.x<this._origin.x+this._size.x&&this._origin.y<=t.y&&t.y<this._origin.y+this._size.y`。
   */
  contains(t) {
    return this._origin.x <= t.x && t.x < this._origin.x + this._size.x && this._origin.y <= t.y && t.y < this._origin.y + this._size.y;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._origin.x+this._size.x>t.origin.x&&t.origin.x+t.size.x>this._origin.x&&this._origin.y+this._size.y>t.origin.y&&t.origin.y+t.size.y>this._origin.y`。
   */
  intersects(t) {
    return this._origin.x + this._size.x > t.origin.x && t.origin.x + t.size.x > this._origin.x && this._origin.y + this._size.y > t.origin.y && t.origin.y + t.size.y > this._origin.y;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._origin.x<=t.origin.x&&this._origin.x+this._size.x>=t.origin.x+t.size.x&&this._origin.y<=t.origin.y&&this._origin.y+this._size.y>=t.origin.y+t.si`。
   */
  surrounds(t) {
    return this._origin.x <= t.origin.x && this._origin.x + this._size.x >= t.origin.x + t.size.x && this._origin.y <= t.origin.y && this._origin.y + this._size.y >= t.origin.y + t.size.y;
  }
  _origin;
  _size;
}
export { Rect };
