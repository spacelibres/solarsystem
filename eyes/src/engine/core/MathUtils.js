/** wrap 采用 [minimum,maximum) 区间并修正负余数；角度插值先跨 2π 选择短路径，算术常数及非有限输入行为不变。 */

// Recovered from app.js:33161-34108.
class MathUtils {
  static Pi = Math.PI;
  static TwoPi = 2 * Math.PI;
  static HalfPi = .5 * Math.PI;
  static radToDeg(radians) {
    return 57.29577951308232 * radians;
  }
  static degToRad(degrees) {
    return .017453292519943295 * degrees;
  }
  static angle(firstAngle, secondAngle) {
    firstAngle = this.wrap(firstAngle, 0, this.TwoPi);
    return (secondAngle = this.wrap(secondAngle, 0, this.TwoPi)) - firstAngle > this.Pi ? firstAngle - secondAngle + this.TwoPi : firstAngle - secondAngle > this.Pi ? secondAngle - firstAngle + this.TwoPi : Math.abs(secondAngle - firstAngle);
  }
  static clamp(value, minimum, maximum) {
    return Math.min(Math.max(minimum, value), maximum);
  }
  static clamp01(value) {
    return Math.min(Math.max(0, value), 1);
  }
  static wrap(value, minimum, maximum) {
    let wrappedValue = (value - minimum) % (maximum - minimum) + minimum;
    if (wrappedValue < minimum) {
      wrappedValue += maximum - minimum;
    }
    return wrappedValue;
  }
  static wrapAngle(angle) {
    let wrappedAngle = angle % this.TwoPi;
    if (wrappedAngle < 0) {
      wrappedAngle += this.TwoPi;
    }
    return wrappedAngle;
  }
  static lerp(start, end, fraction) {
    return (1 - fraction) * start + fraction * end;
  }
  static lerpAngle(startAngle, endAngle, fraction) {
    startAngle = this.wrap(startAngle, -this.Pi, +this.Pi);
    if ((endAngle = this.wrap(endAngle, -this.Pi, +this.Pi)) - startAngle > this.Pi) {
      startAngle += this.TwoPi;
    }
    if (startAngle - endAngle > this.Pi) {
      endAngle += this.TwoPi;
    }
    return this.wrap(this.lerp(startAngle, endAngle, fraction), -this.Pi, +this.Pi);
  }
  static ceilPow2(value) {
    return 2 ** Math.ceil(Math.log(value) / Math.log(2));
  }
}
export { MathUtils };
