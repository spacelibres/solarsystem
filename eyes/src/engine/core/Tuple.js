// Recovered from app.js:43268-43613.
class Tuple {
  static create2Tuple(t) {
    return [t(0), t(1)];
  }
  static create3Tuple(t) {
    return [t(0), t(1), t(2)];
  }
  static create4Tuple(t) {
    return [t(0), t(1), t(2), t(3)];
  }
  static create5Tuple(t) {
    return [t(0), t(1), t(2), t(3), t(4)];
  }
  static create6Tuple(t) {
    return [t(0), t(1), t(2), t(3), t(4), t(5)];
  }
}
export { Tuple };
