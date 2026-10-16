/** @eyes-analysis
 * 文件职责：提供角度、插值、限制、周期包裹及数值辅助函数。
 * 依据：MathUtils @2
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:33161-34108.
/** @eyes-analysis
 * 类职责：提供角度、插值、限制、周期包裹及数值辅助函数。
 * 继承：无显式父类；导出：MathUtils。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class MathUtils {
  static Pi = Math.PI;
  static TwoPi = 2 * Math.PI;
  static HalfPi = .5 * Math.PI;
  /** @eyes-analysis
   * 【结构证据】返回 `57.29577951308232*t`。
   */
  static radToDeg(t) {
    return 57.29577951308232 * t;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `.017453292519943295*t`。
   */
  static degToRad(t) {
    return .017453292519943295 * t;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `(e=this.wrap(e,0,this.TwoPi))-t>this.Pi?t-e+this.TwoPi:t-e>this.Pi?e-t+this.TwoPi:Math.abs(e-t)`；调用 `Math.abs`、`this.wrap`。
   * 调用线索：Math.abs、this.wrap。
   */
  static angle(t, e) {
    t = this.wrap(t, 0, this.TwoPi);
    return (e = this.wrap(e, 0, this.TwoPi)) - t > this.Pi ? t - e + this.TwoPi : t - e > this.Pi ? e - t + this.TwoPi : Math.abs(e - t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `Math.min(Math.max(e,t),i)`；调用 `Math.max`、`Math.min`。
   * 调用线索：Math.max、Math.min。
   */
  static clamp(t, e, i) {
    return Math.min(Math.max(e, t), i);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `Math.min(Math.max(0,t),1)`；调用 `Math.max`、`Math.min`。
   * 调用线索：Math.max、Math.min。
   */
  static clamp01(t) {
    return Math.min(Math.max(0, t), 1);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `s`。
   */
  static wrap(t, e, i) {
    let s = (t - e) % (i - e) + e;
    s < e && (s += i - e);
    return s;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `e`。
   */
  static wrapAngle(t) {
    let e = t % this.TwoPi;
    e < 0 && (e += this.TwoPi);
    return e;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `(1-i)*t+i*e`。
   */
  static lerp(t, e, i) {
    return (1 - i) * t + i * e;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this.wrap(this.lerp(t,e,i),-this.Pi,+this.Pi)`；调用 `this.lerp`、`this.wrap`。
   * 调用线索：this.lerp、this.wrap。
   */
  static lerpAngle(t, e, i) {
    t = this.wrap(t, -this.Pi, +this.Pi);
    (e = this.wrap(e, -this.Pi, +this.Pi)) - t > this.Pi && (t += this.TwoPi);
    t - e > this.Pi && (e += this.TwoPi);
    return this.wrap(this.lerp(t, e, i), -this.Pi, +this.Pi);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `2**Math.ceil(Math.log(t)/Math.log(2))`；调用 `Math.ceil`、`Math.log`。
   * 调用线索：Math.ceil、Math.log。
   */
  static ceilPow2(t) {
    return 2 ** Math.ceil(Math.log(t) / Math.log(2));
  }
}
export { MathUtils };
