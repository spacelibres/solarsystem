/** @eyes-analysis
 * 文件职责：椭圆/双曲轨道元素及开普勒传播，把时间转换为三维位置和速度。
 * 依据：import ../pioneer/public-api.js；OrbitalElements @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:53647-59688.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：椭圆/双曲轨道元素及开普勒传播，把时间转换为三维位置和速度。
 * 继承：无显式父类；导出：OrbitalElements。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class OrbitalElements {
  epoch;
  eccentricity;
  semiMajorAxis;
  meanAngularMotion;
  meanAnomalyAtEpoch;
  orientation;
  static pool = new PioneerPublicApi.Pool(OrbitalElements);
  /** @eyes-analysis
   * 【结构证据】写入 `eccentricity`、`epoch`、`meanAngularMotion`、`meanAnomalyAtEpoch`、`orientation`、`semiMajorAxis`；调用 `new PioneerPublicApi.Quaternion`、`this.orientation.copy`、`this.setFromPositionAndVelocity`、`this.setOrientationFromElements`。
   * 状态写入：eccentricity、epoch、meanAngularMotion、meanAnomalyAtEpoch、orientation、semiMajorAxis。
   * 调用线索：new PioneerPublicApi.Quaternion、this.orientation.copy、this.setFromPositionAndVelocity、this.setOrientationFromElements。
   */
  constructor(t) {
    t ? "eccentricity" in t ? (this.epoch = t.epoch, this.eccentricity = t.eccentricity, this.semiMajorAxis = t.semiMajorAxis, this.meanAngularMotion = t.meanAngularMotion, this.meanAnomalyAtEpoch = t.meanAnomalyAtEpoch, this.orientation = new PioneerPublicApi.Quaternion(), "orientation" in t ? this.orientation.copy(t.orientation) : this.setOrientationFromElements(t.inclination, t.longitudeOfAscendingNode, t.argumentOfPeriapsis)) : this.setFromPositionAndVelocity(t.position, t.velocity, t.epoch, t.gm) : (this.epoch = 0, this.eccentricity = 0, this.semiMajorAxis = 0, this.meanAngularMotion = 0, this.meanAnomalyAtEpoch = 0, this.orientation = new PioneerPublicApi.Quaternion());
  }
  /** @eyes-analysis
   * 【结构证据】写入 `eccentricity`、`epoch`、`meanAngularMotion`、`meanAnomalyAtEpoch`、`semiMajorAxis`；调用 `this.orientation.copy`。
   * 状态写入：eccentricity、epoch、meanAngularMotion、meanAnomalyAtEpoch、semiMajorAxis。
   * 调用线索：this.orientation.copy。
   */
  copy(t) {
    this.epoch = t.epoch;
    this.eccentricity = t.eccentricity;
    this.semiMajorAxis = t.semiMajorAxis;
    this.meanAnomalyAtEpoch = t.meanAnomalyAtEpoch;
    this.meanAngularMotion = t.meanAngularMotion;
    this.orientation.copy(t.orientation);
  }
  /** @eyes-analysis
   * eccentricity<1 使用 sin/cos 椭圆参数，否则使用 sinh/cosh 双曲参数；先计算轨道平面位置/速度，设 z=0 后按 orientation 旋转到实体参考系。
   * 调用线索：Math.cos、Math.cosh、Math.sin、Math.sinh、Math.sqrt等。
   */
  projectFromMeanAnomaly(t, e, i) {
    if (this.eccentricity < 1) {
      const s = this.getEccentricAnomalyFromMeanAnomaly(i);
      const n = this.semiMajorAxis * (1 - this.eccentricity * Math.cos(s));
      const o = this.meanAngularMotion * this.semiMajorAxis * this.semiMajorAxis / n;
      t && (t.x = this.semiMajorAxis * (Math.cos(s) - this.eccentricity), t.y = this.semiMajorAxis * Math.sqrt(1 - this.eccentricity * this.eccentricity) * Math.sin(s));
      e && (e.x = -o * Math.sin(s), e.y = o * Math.sqrt(1 - this.eccentricity * this.eccentricity) * Math.cos(s));
    } else {
      const s = this.getEccentricAnomalyFromMeanAnomaly(i);
      const n = -this.semiMajorAxis * (1 - this.eccentricity * Math.cosh(s));
      const o = this.meanAngularMotion * this.semiMajorAxis * this.semiMajorAxis / n;
      t && (t.x = this.semiMajorAxis * (this.eccentricity - Math.cosh(s)), t.y = this.semiMajorAxis * Math.sqrt(this.eccentricity * this.eccentricity - 1) * Math.sinh(s));
      e && (e.x = -o * Math.sinh(s), e.y = o * Math.sqrt(this.eccentricity * this.eccentricity - 1) * Math.cosh(s));
    }
    t && (t.z = 0, t.rotate(this.orientation, t));
    e && (e.z = 0, e.rotate(this.orientation, e));
  }
  /** @eyes-analysis
   * meanAnomaly=meanAnomalyAtEpoch+meanAngularMotion*(time-epoch)，椭圆分支将角度 wrap 到 [-π,π]，再调用 projectFromMeanAnomaly 输出位置/速度。
   * 调用线索：PioneerPublicApi.MathUtils.wrap、this.projectFromMeanAnomaly。
   */
  project(t, e, i) {
    let n = this.meanAnomalyAtEpoch + this.meanAngularMotion * (i - this.epoch);
    this.eccentricity < 1 && (n = PioneerPublicApi.MathUtils.wrap(n, -PioneerPublicApi.MathUtils.Pi, +PioneerPublicApi.MathUtils.Pi));
    this.projectFromMeanAnomaly(t, e, n);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `i`；调用 `Math.atan2`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`e.rotateInverse`。
   * 调用线索：Math.atan2、PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、e.rotateInverse。
   */
  getTrueAnomalyFromPosition(t) {
    const e = PioneerPublicApi.Vector3.pool.get();
    e.rotateInverse(this.orientation, t);
    const i = Math.atan2(e.y, e.x);
    PioneerPublicApi.Vector3.pool.release(e);
    return i;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `e`；调用 `Math.atan`、`Math.atanh`、`Math.sin`、`Math.sinh`、`Math.sqrt`、`Math.tan`。
   * 调用线索：Math.atan、Math.atanh、Math.sin、Math.sinh、Math.sqrt等。
   */
  getMeanAnomalyFromTrueAnomaly(t) {
    let e;
    if (this.eccentricity < 1) {
      const i = 2 * Math.atan(Math.tan(t / 2) * Math.sqrt((1 - this.eccentricity) / (1 + this.eccentricity)));
      e = i - this.eccentricity * Math.sin(i);
    } else {
      const i = 2 * Math.atanh(Math.tan(t / 2) * Math.sqrt((this.eccentricity - 1) / (1 + this.eccentricity)));
      e = this.eccentricity * Math.sinh(i) - i;
    }
    return e;
  }
  /** @eyes-analysis
   * 分别解 E-e*sin(E)=M 或 e*sinh(H)-H=M。最多 20 次牛顿迭代，以更新量绝对值小于 0.00174532925 退出；未提供额外收敛失败标记。
   * 调用线索：Math.abs、Math.cos、Math.cosh、Math.log、Math.sign等。
   */
  getEccentricAnomalyFromMeanAnomaly(t) {
    if (this.eccentricity < 1) {
      let e = t;
      this.eccentricity >= .8 && (e = Math.sign(t) * PioneerPublicApi.MathUtils.Pi);
      for (let i = 0; i < 20; i++) {
        const i = (e - this.eccentricity * Math.sin(e) - t) / (this.eccentricity * Math.cos(e) - 1);
        if (e += i, Math.abs(i) < .00174532925) break;
      }
      return e;
    }
    let e = Math.log(2 * Math.abs(t) / Math.E + 1.8);
    this.eccentricity <= 1.2 && (e = Math.log(2 * Math.abs(t) / Math.E + 1.8));
    t < 0 && (e *= -1);
    for (let i = 0; i < 20; i++) {
      const i = (e - this.eccentricity * Math.sinh(e) + t) / (this.eccentricity * Math.cosh(e) - 1);
      if (e += i, Math.abs(i) < .00174532925) break;
    }
    return e;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `PioneerPublicApi.MathUtils.wrap(e,-Math.PI,+Math.PI)` 或 `this.eccentricity*Math.sinh(t)-t`；调用 `Math.sin`、`Math.sinh`、`PioneerPublicApi.MathUtils.wrap`。
   * 调用线索：Math.sin、Math.sinh、PioneerPublicApi.MathUtils.wrap。
   */
  getMeanAnomalyFromEccentricAnomaly(t) {
    if (this.eccentricity < 1) {
      const e = t - this.eccentricity * Math.sin(t);
      return PioneerPublicApi.MathUtils.wrap(e, -Math.PI, +Math.PI);
    }
    return this.eccentricity * Math.sinh(t) - t;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this.eccentricity<1?2*Math.atan(Math.sqrt((1+this.eccentricity)/(1-this.eccentricity))*Math.tan(t/2)):2*Math.atan(Math.sqrt((1+this.eccentricity)/(thi`；调用 `Math.atan`、`Math.sqrt`、`Math.tan`、`Math.tanh`。
   * 调用线索：Math.atan、Math.sqrt、Math.tan、Math.tanh。
   */
  getTrueAnomalyFromEccentricAnomaly(t) {
    return this.eccentricity < 1 ? 2 * Math.atan(Math.sqrt((1 + this.eccentricity) / (1 - this.eccentricity)) * Math.tan(t / 2)) : 2 * Math.atan(Math.sqrt((1 + this.eccentricity) / (this.eccentricity - 1)) * Math.tanh(t / 2));
  }
  /** @eyes-analysis
   * 【结构证据】返回 `PioneerPublicApi.MathUtils.wrap(e,-Math.PI,+Math.PI)` 或 `2*Math.atanh(Math.sqrt((this.eccentricity-1)/(this.eccentricity+1))*Math.tan(t/2))`；调用 `Math.atan2`、`Math.atanh`、`Math.sqrt`、`Math.tan`、`PioneerPublicApi.MathUtils.wrap`。
   * 调用线索：Math.atan2、Math.atanh、Math.sqrt、Math.tan、PioneerPublicApi.MathUtils.wrap。
   */
  getEccentricAnomalyFromTrueAnomaly(t) {
    if (this.eccentricity < 1) {
      const e = 2 * Math.atan2(Math.tan(t / 2), Math.sqrt((1 + this.eccentricity) / (1 - this.eccentricity)));
      return PioneerPublicApi.MathUtils.wrap(e, -Math.PI, +Math.PI);
    }
    return 2 * Math.atanh(Math.sqrt((this.eccentricity - 1) / (this.eccentricity + 1)) * Math.tan(t / 2));
  }
  /** @eyes-analysis
   * 【结构证据】返回 `e`；调用 `PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`t.angle`、`this.orientation.getAxis`。
   * 调用线索：PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、t.angle、this.orientation.getAxis。
   */
  getInclination() {
    const t = PioneerPublicApi.Vector3.pool.get();
    this.orientation.getAxis(t, 2);
    const e = t.angle(PioneerPublicApi.Vector3.ZAxis);
    PioneerPublicApi.Vector3.pool.release(t);
    return e;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `PioneerPublicApi.MathUtils.wrap(e,0,PioneerPublicApi.MathUtils.TwoPi)`；调用 `Math.atan2`、`PioneerPublicApi.MathUtils.wrap`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`this.orientation.getAxis`。
   * 调用线索：Math.atan2、PioneerPublicApi.MathUtils.wrap、PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、this.orientation.getAxis。
   */
  getLongitudeOfAscendingNode() {
    const t = PioneerPublicApi.Vector3.pool.get();
    this.orientation.getAxis(t, 2);
    const e = Math.atan2(t.x, -t.y);
    PioneerPublicApi.Vector3.pool.release(t);
    return PioneerPublicApi.MathUtils.wrap(e, 0, PioneerPublicApi.MathUtils.TwoPi);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `PioneerPublicApi.MathUtils.wrap(i,0,PioneerPublicApi.MathUtils.TwoPi)`；调用 `PioneerPublicApi.MathUtils.wrap`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`t.angle`、`t.set`、`this.orientation.getAxis`。
   * 调用线索：PioneerPublicApi.MathUtils.wrap、PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、t.angle、t.set等。
   */
  getArgumentOfPeriapsis() {
    const t = PioneerPublicApi.Vector3.pool.get();
    const e = PioneerPublicApi.Vector3.pool.get();
    this.orientation.getAxis(t, 2);
    t.set(-t.y, t.x, 0);
    this.orientation.getAxis(e, 0);
    const i = t.angle(e);
    PioneerPublicApi.Vector3.pool.release(e);
    PioneerPublicApi.Vector3.pool.release(t);
    return PioneerPublicApi.MathUtils.wrap(i, 0, PioneerPublicApi.MathUtils.TwoPi);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `PioneerPublicApi.MathUtils.TwoPi/this.meanAngularMotion`。
   */
  getPeriod() {
    return PioneerPublicApi.MathUtils.TwoPi / this.meanAngularMotion;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this.semiMajorAxis*(1-this.eccentricity)`。
   */
  getPeriapsis() {
    return this.semiMajorAxis * (1 - this.eccentricity);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this.semiMajorAxis*(1+this.eccentricity)`。
   */
  getApoapsis() {
    return this.semiMajorAxis * (1 + this.eccentricity);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Math.cos`、`Math.sin`、`PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`。
   * 调用线索：Math.cos、Math.sin、PioneerPublicApi.Quaternion.pool.get、PioneerPublicApi.Quaternion.pool.release、PioneerPublicApi.Vector3.pool.get等。
   */
  setOrientationFromElements(t, e, i) {
    const n = PioneerPublicApi.Vector3.pool.get();
    const o = PioneerPublicApi.Vector3.pool.get();
    const r = PioneerPublicApi.Quaternion.pool.get();
    n.set(Math.cos(e), Math.sin(e), 0);
    o.set(Math.sin(e) * Math.sin(t), -Math.cos(e) * Math.sin(t), Math.cos(t));
    this.orientation.setFromAxes(n, void 0, o);
    r.setFromAxisAngle(o, i);
    this.orientation.mult(r, this.orientation);
    PioneerPublicApi.Quaternion.pool.release(r);
    PioneerPublicApi.Vector3.pool.release(o);
    PioneerPublicApi.Vector3.pool.release(n);
  }
  /** @eyes-analysis
   * 用 r×v 得角动量，(v×h)/gm-r/|r| 得偏心率向量，推导半长轴、真近点角与姿态，再算历元平近点角和平均角运动；圆轨道/奇异输入应另做数值验证。
   * 状态写入：eccentricity、epoch、meanAngularMotion、meanAnomalyAtEpoch、semiMajorAxis。
   * 调用线索：Math.acos、Math.sqrt、PioneerPublicApi.MathUtils.clamp、PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release等。
   */
  setFromPositionAndVelocity(t, e, epoch, n) {
    const o = 1 / n;
    this.epoch = epoch;
    const r = PioneerPublicApi.Vector3.pool.get();
    r.cross(t, e);
    const a = PioneerPublicApi.Vector3.pool.get();
    const l = PioneerPublicApi.Vector3.pool.get();
    l.normalize(t);
    a.cross(e, r);
    a.mult(a, o);
    a.sub(a, l);
    this.eccentricity = a.magnitude();
    const c = r.dot(r) * o;
    this.semiMajorAxis = c / (1 - this.eccentricity * this.eccentricity);
    this.eccentricity > 1 && (this.semiMajorAxis *= -1);
    let h = Math.acos(PioneerPublicApi.MathUtils.clamp(a.dot(l) / this.eccentricity, -1, 1));
    t.dot(e) < 0 && (h *= -1);
    h < -Math.PI && (h += PioneerPublicApi.MathUtils.TwoPi);
    h >= Math.PI && (h -= PioneerPublicApi.MathUtils.TwoPi);
    a.normalize(a);
    r.normalize(r);
    this.orientation.setFromAxes(a, void 0, r);
    PioneerPublicApi.Vector3.pool.release(l);
    PioneerPublicApi.Vector3.pool.release(r);
    PioneerPublicApi.Vector3.pool.release(a);
    const d = this.getEccentricAnomalyFromTrueAnomaly(h);
    this.meanAnomalyAtEpoch = this.getMeanAnomalyFromEccentricAnomaly(d);
    this.meanAngularMotion = Math.sqrt(n / (this.semiMajorAxis * this.semiMajorAxis * this.semiMajorAxis));
  }
}
export { OrbitalElements };
