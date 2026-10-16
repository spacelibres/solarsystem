// Recovered from app.js:59689-60681.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** origin 与 size 是持有的二维向量；contains 左下闭右上开，intersects 需要正面积重叠，surrounds 包含边界。 */
class Rect {
  static pool = new PioneerPublicApi.Pool(Rect);
  constructor(originX = 0, originY = 0, width = 0, height = 0) {
    this._origin = new PioneerPublicApi.Vector2(originX, originY);
    this._size = new PioneerPublicApi.Vector2(width, height);
  }
  get origin() {
    return this._origin;
  }
  get size() {
    return this._size;
  }
  toString() {
    return `[Origin: (${this._origin.x}, ${this._origin.y}), Size: (${this._size.x}, ${this._size.y})]`;
  }
  copy(source) {
    this._origin.copy(source.origin);
    this._size.copy(source.size);
  }
  set(originX, originY, width, height) {
    this._origin.set(originX, originY);
    this._size.set(width, height);
  }
  contains(point) {
    return this._origin.x <= point.x && point.x < this._origin.x + this._size.x && this._origin.y <= point.y && point.y < this._origin.y + this._size.y;
  }
  intersects(otherRect) {
    return this._origin.x + this._size.x > otherRect.origin.x && otherRect.origin.x + otherRect.size.x > this._origin.x && this._origin.y + this._size.y > otherRect.origin.y && otherRect.origin.y + otherRect.size.y > this._origin.y;
  }
  surrounds(otherRect) {
    return this._origin.x <= otherRect.origin.x && this._origin.x + this._size.x >= otherRect.origin.x + otherRect.size.x && this._origin.y <= otherRect.origin.y && this._origin.y + this._size.y >= otherRect.origin.y + otherRect.size.y;
  }
  _origin;
  _size;
}
export { Rect };
