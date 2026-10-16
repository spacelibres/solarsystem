// Recovered from app.js:59689-60681.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class Rect {
  static pool = new PioneerPublicApi.Pool(Rect);
  constructor(t = 0, e = 0, i = 0, n = 0) {
    this._origin = new PioneerPublicApi.Vector2(t, e);
    this._size = new PioneerPublicApi.Vector2(i, n);
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
  copy(t) {
    this._origin.copy(t.origin);
    this._size.copy(t.size);
  }
  set(t, e, i, s) {
    this._origin.set(t, e);
    this._size.set(i, s);
  }
  contains(t) {
    return this._origin.x <= t.x && t.x < this._origin.x + this._size.x && this._origin.y <= t.y && t.y < this._origin.y + this._size.y;
  }
  intersects(t) {
    return this._origin.x + this._size.x > t.origin.x && t.origin.x + t.size.x > this._origin.x && this._origin.y + this._size.y > t.origin.y && t.origin.y + t.size.y > this._origin.y;
  }
  surrounds(t) {
    return this._origin.x <= t.origin.x && this._origin.x + this._size.x >= t.origin.x + t.size.x && this._origin.y <= t.origin.y && this._origin.y + this._size.y >= t.origin.y + t.size.y;
  }
  _origin;
  _size;
}
export { Rect };
