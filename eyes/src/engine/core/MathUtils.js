// Recovered from app.js:33161-34108.
class MathUtils {
  static Pi = Math.PI;
  static TwoPi = 2 * Math.PI;
  static HalfPi = .5 * Math.PI;
  static radToDeg(t) {
    return 57.29577951308232 * t;
  }
  static degToRad(t) {
    return .017453292519943295 * t;
  }
  static angle(t, e) {
    t = this.wrap(t, 0, this.TwoPi);
    return (e = this.wrap(e, 0, this.TwoPi)) - t > this.Pi ? t - e + this.TwoPi : t - e > this.Pi ? e - t + this.TwoPi : Math.abs(e - t);
  }
  static clamp(t, e, i) {
    return Math.min(Math.max(e, t), i);
  }
  static clamp01(t) {
    return Math.min(Math.max(0, t), 1);
  }
  static wrap(t, e, i) {
    let s = (t - e) % (i - e) + e;
    s < e && (s += i - e);
    return s;
  }
  static wrapAngle(t) {
    let e = t % this.TwoPi;
    e < 0 && (e += this.TwoPi);
    return e;
  }
  static lerp(t, e, i) {
    return (1 - i) * t + i * e;
  }
  static lerpAngle(t, e, i) {
    t = this.wrap(t, -this.Pi, +this.Pi);
    (e = this.wrap(e, -this.Pi, +this.Pi)) - t > this.Pi && (t += this.TwoPi);
    t - e > this.Pi && (e += this.TwoPi);
    return this.wrap(this.lerp(t, e, i), -this.Pi, +this.Pi);
  }
  static ceilPow2(t) {
    return 2 ** Math.ceil(Math.log(t) / Math.log(2));
  }
}
export { MathUtils };
