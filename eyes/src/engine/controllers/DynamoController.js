/** @eyes-analysis
 * 文件职责：读取 Dynamo v1/v2 定义与分层时间块，按五类样本插值驱动实体运动和姿态。
 * 依据：import ../pioneer/public-api.js；Point @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:452962-470709.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：Dynamo 时间样本协议基类：读取 time，定义计算、应用与无效化钩子，由具体点类型实现状态计算。
 * 继承：无显式父类；导出：模块内部声明。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Point {
  time;
  /** @eyes-analysis
   * 【结构证据】写入 `time`。
   * 状态写入：time。
   */
  constructor() {
    this.time = NaN;
  }
  /** @eyes-analysis
   * 从 Reader 读取样本时间 Float64；该基类本身不产生实体状态。
   * 状态写入：time。
   * 调用线索：t.readFloat64。
   */
  load(t) {
    this.time = t.readFloat64();
  }
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  calculate(t, e, i, s) {}
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  apply(t) {}
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  setNaN(t) {}
  /** @eyes-analysis
   * 【结构证据】返回 `{}`。
   */
  static readHeader(t) {
    return {};
  }
}
/** @eyes-analysis
 * 类职责：带位置和速度的 Hermite 动力学样本。
 * 继承：Point；导出：模块内部声明。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class PosPoint extends Point {
  position;
  velocity;
  /** @eyes-analysis
   * 【结构证据】写入 `position`、`velocity`；调用 `new PioneerPublicApi.Vector3`、`super`。
   * 状态写入：position、velocity。
   * 调用线索：new PioneerPublicApi.Vector3、super。
   */
  constructor() {
    super();
    this.position = new PioneerPublicApi.Vector3();
    this.velocity = new PioneerPublicApi.Vector3();
  }
  /** @eyes-analysis
   * 依次读取 time、position.xyz、velocity.xyz，全部为 Float64；可从字段读取数证明每点 56 字节。
   * 状态写入：position、velocity。
   * 调用线索：new PioneerPublicApi.Vector3、super.load、t.readFloat64。
   */
  load(t) {
    super.load(t);
    this.position = new PioneerPublicApi.Vector3(t.readFloat64(), t.readFloat64(), t.readFloat64());
    this.velocity = new PioneerPublicApi.Vector3(t.readFloat64(), t.readFloat64(), t.readFloat64());
  }
  /** @eyes-analysis
   * 以两端位置和速度做三次 Hermite 插值：归一化时间 u=(time-t0)/duration，速度项乘 duration；输出速度是同一多项式对时间的导数。
   * 状态写入：time。
   * 调用线索：this.position.addMult、this.position.mult、this.velocity.addMult、this.velocity.mult。
   */
  calculate(t, time, i, s) {
    this.time = time;
    const n = t[1].time - t[0].time;
    const o = (time - t[0].time) / n;
    const r = 1 - o;
    const a = r * r;
    const l = o * o;
    const c = (1 + 2 * o) * a;
    const h = o * a;
    const d = l * (3 - 2 * o);
    const u = l * -r;
    this.position.mult(t[0].position, c);
    this.position.addMult(this.position, t[0].velocity, n * h);
    this.position.addMult(this.position, t[1].position, d);
    this.position.addMult(this.position, t[1].velocity, n * u);
    const p = 6 * (l - o);
    const _ = p;
    const m = 3 * l - 4 * o + 1;
    const g = -p;
    const y = 3 * l - 2 * o;
    this.velocity.mult(t[0].position, _ / n);
    this.velocity.addMult(this.velocity, t[0].velocity, m);
    this.velocity.addMult(this.velocity, t[1].position, g / n);
    this.velocity.addMult(this.velocity, t[1].velocity, y);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.setPosition`、`t.setVelocity`。
   * 调用线索：t.setPosition、t.setVelocity。
   */
  apply(t) {
    t.setPosition(this.position);
    t.setVelocity(this.velocity);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.setPosition`、`t.setVelocity`。
   * 调用线索：t.setPosition、t.setVelocity。
   */
  setNaN(t) {
    t.setPosition(PioneerPublicApi.Vector3.NaN);
    t.setVelocity(PioneerPublicApi.Vector3.NaN);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `{}`。
   */
  static readHeader(t) {
    return {};
  }
}
/** @eyes-analysis
 * 类职责：只带位置的线性样本。
 * 继承：Point；导出：模块内部声明。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class LinPoint extends Point {
  position;
  velocity;
  /** @eyes-analysis
   * 【结构证据】写入 `position`、`velocity`；调用 `new PioneerPublicApi.Vector3`、`super`。
   * 状态写入：position、velocity。
   * 调用线索：new PioneerPublicApi.Vector3、super。
   */
  constructor() {
    super();
    this.position = new PioneerPublicApi.Vector3();
    this.velocity = new PioneerPublicApi.Vector3();
  }
  /** @eyes-analysis
   * 读取 time 和 position.xyz（32 字节），速度初始化为零。
   * 调用线索：super.load、t.readFloat64、this.position.set、this.velocity.copy。
   */
  load(t) {
    super.load(t);
    this.position.set(t.readFloat64(), t.readFloat64(), t.readFloat64());
    this.velocity.copy(PioneerPublicApi.Vector3.Zero);
  }
  /** @eyes-analysis
   * 夹紧归一化时间后线性混合位置，速度为端点差/时间差；非递增时间退回右端位置与零速度。
   * 状态写入：time。
   * 调用线索：PioneerPublicApi.MathUtils.clamp01、this.position.copy、this.position.lerp、this.velocity.copy、this.velocity.div等。
   */
  calculate(t, time, i, n) {
    if (this.time = time, t[1].time > t[0].time) {
      const i = PioneerPublicApi.MathUtils.clamp01((time - t[0].time) / (t[1].time - t[0].time));
      this.position.lerp(t[0].position, t[1].position, i);
      this.velocity.sub(t[1].position, t[0].position);
      this.velocity.div(this.velocity, t[1].time - t[0].time);
    } else {
      this.position.copy(t[1].position);
      this.velocity.copy(PioneerPublicApi.Vector3.Zero);
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.setPosition`、`t.setVelocity`。
   * 调用线索：t.setPosition、t.setVelocity。
   */
  apply(t) {
    t.setPosition(this.position);
    t.setVelocity(this.velocity);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.setPosition`、`t.setVelocity`。
   * 调用线索：t.setPosition、t.setVelocity。
   */
  setNaN(t) {
    t.setPosition(PioneerPublicApi.Vector3.NaN);
    t.setVelocity(PioneerPublicApi.Vector3.NaN);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `{}`。
   */
  static readHeader(t) {
    return {};
  }
}
/** @eyes-analysis
 * 类职责：带角速度的姿态样本。
 * 继承：Point；导出：模块内部声明。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class OriPoint extends Point {
  orientation;
  angularVelocity;
  /** @eyes-analysis
   * 【结构证据】写入 `angularVelocity`、`orientation`；调用 `new PioneerPublicApi.Quaternion`、`new PioneerPublicApi.Vector3`、`super`。
   * 状态写入：angularVelocity、orientation。
   * 调用线索：new PioneerPublicApi.Quaternion、new PioneerPublicApi.Vector3、super。
   */
  constructor() {
    super();
    this.orientation = new PioneerPublicApi.Quaternion();
    this.angularVelocity = new PioneerPublicApi.Vector3();
  }
  /** @eyes-analysis
   * 读取 time、四元数四个分量、角速度.xyz（64 字节），分量顺序以 Quaternion 构造调用为依据。
   * 状态写入：angularVelocity、orientation。
   * 调用线索：new PioneerPublicApi.Quaternion、new PioneerPublicApi.Vector3、super.load、t.readFloat64。
   */
  load(t) {
    super.load(t);
    this.orientation = new PioneerPublicApi.Quaternion(t.readFloat64(), t.readFloat64(), t.readFloat64(), t.readFloat64());
    this.angularVelocity = new PioneerPublicApi.Vector3(t.readFloat64(), t.readFloat64(), t.readFloat64());
  }
  /** @eyes-analysis
   * 分别用两端角速度外推到目标时间，再对投影四元数 slerp；角速度 slerp 后取负并转到插值姿态空间。临时向量/四元数须归还池。
   * 状态写入：time。
   * 调用线索：PioneerPublicApi.Quaternion.pool.get、PioneerPublicApi.Quaternion.pool.release、t[0]._project、t[1]._project、this.angularVelocity.neg等。
   */
  calculate(t, time, i, n) {
    this.time = time;
    const o = PioneerPublicApi.Quaternion.pool.get();
    const r = PioneerPublicApi.Quaternion.pool.get();
    const a = (time - t[0].time) / (t[1].time - t[0].time);
    t[0]._project(o, time, n);
    t[1]._project(r, time, n);
    this.orientation.slerp(o, r, a);
    PioneerPublicApi.Quaternion.pool.release(o);
    PioneerPublicApi.Quaternion.pool.release(r);
    this.angularVelocity.slerp(t[0].angularVelocity, t[1].angularVelocity, a);
    this.angularVelocity.neg(this.angularVelocity);
    this.angularVelocity.rotate(this.orientation, this.angularVelocity);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.setAngularVelocity`、`t.setOrientation`。
   * 调用线索：t.setAngularVelocity、t.setOrientation。
   */
  apply(t) {
    t.setOrientation(this.orientation);
    t.setAngularVelocity(this.angularVelocity);
  }
  /** @eyes-analysis
   * 由 angularVelocity 的方向/模长和时间差建立轴角旋转；incremental 决定与传入累计姿态相乘还是直接写投影姿态。
   * 调用线索：PioneerPublicApi.Quaternion.pool.get、PioneerPublicApi.Quaternion.pool.release、PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、n.normalize等。
   */
  _project(t, e, i) {
    const n = PioneerPublicApi.Vector3.pool.get();
    const o = PioneerPublicApi.Quaternion.pool.get();
    n.normalize(this.angularVelocity);
    o.setFromAxisAngle(n, this.angularVelocity.magnitude() * (e - this.time));
    PioneerPublicApi.Vector3.pool.release(n);
    i ? (o.multInverseR(this.orientation, o), t.mult(t, o)) : t.multInverseR(this.orientation, o);
    PioneerPublicApi.Quaternion.pool.release(o);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.setAngularVelocity`、`t.setOrientation`。
   * 调用线索：t.setAngularVelocity、t.setOrientation。
   */
  setNaN(t) {
    t.setOrientation(PioneerPublicApi.Quaternion.NaN);
    t.setAngularVelocity(PioneerPublicApi.Vector3.NaN);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `{}`。
   */
  static readHeader(t) {
    return {};
  }
}
/** @eyes-analysis
 * 类职责：仅四元数姿态样本。
 * 继承：Point；导出：模块内部声明。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class QuatPoint extends Point {
  orientation;
  angularVelocity;
  /** @eyes-analysis
   * 【结构证据】写入 `angularVelocity`、`orientation`；调用 `new PioneerPublicApi.Quaternion`、`new PioneerPublicApi.Vector3`、`super`。
   * 状态写入：angularVelocity、orientation。
   * 调用线索：new PioneerPublicApi.Quaternion、new PioneerPublicApi.Vector3、super。
   */
  constructor() {
    super();
    this.orientation = new PioneerPublicApi.Quaternion();
    this.angularVelocity = new PioneerPublicApi.Vector3();
  }
  /** @eyes-analysis
   * 只读取 time 和四元数四分量（40 字节）。
   * 状态写入：orientation。
   * 调用线索：new PioneerPublicApi.Quaternion、super.load、t.readFloat64。
   */
  load(t) {
    super.load(t);
    this.orientation = new PioneerPublicApi.Quaternion(t.readFloat64(), t.readFloat64(), t.readFloat64(), t.readFloat64());
  }
  /** @eyes-analysis
   * 夹紧目标时间比例后在端点四元数间 slerp；apply 总把角速度写零。
   * 状态写入：time。
   * 调用线索：PioneerPublicApi.MathUtils.clamp01、this.orientation.slerp。
   */
  calculate(t, time, i, n) {
    this.time = time;
    const o = PioneerPublicApi.MathUtils.clamp01((time - t[0].time) / (t[1].time - t[0].time));
    this.orientation.slerp(t[0].orientation, t[1].orientation, o);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.setAngularVelocity`、`t.setOrientation`。
   * 调用线索：t.setAngularVelocity、t.setOrientation。
   */
  apply(t) {
    t.setOrientation(this.orientation);
    t.setAngularVelocity(PioneerPublicApi.Vector3.Zero);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.setAngularVelocity`、`t.setOrientation`。
   * 调用线索：t.setAngularVelocity、t.setOrientation。
   */
  setNaN(t) {
    t.setOrientation(PioneerPublicApi.Quaternion.NaN);
    t.setAngularVelocity(PioneerPublicApi.Vector3.NaN);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `{}`。
   */
  static readHeader(t) {
    return {};
  }
}
/** @eyes-analysis
 * 类职责：带轨道元素的传播样本。
 * 继承：Point；导出：模块内部声明。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class OrbPoint extends Point {
  oe;
  position;
  velocity;
  /** @eyes-analysis
   * 【结构证据】写入 `oe`、`position`、`velocity`；调用 `new PioneerPublicApi.OrbitalElements`、`new PioneerPublicApi.Vector3`、`super`。
   * 状态写入：oe、position、velocity。
   * 调用线索：new PioneerPublicApi.OrbitalElements、new PioneerPublicApi.Vector3、super。
   */
  constructor() {
    super();
    this.oe = new PioneerPublicApi.OrbitalElements();
    this.position = new PioneerPublicApi.Vector3();
    this.velocity = new PioneerPublicApi.Vector3();
  }
  /** @eyes-analysis
   * 以样本时间为 epoch，读取半长轴、偏心率、平均角运动、历元平近点角与轨道姿态四元数（72 字节）。
   * 状态写入：oe.eccentricity、oe.epoch、oe.meanAngularMotion、oe.meanAnomalyAtEpoch、oe.semiMajorAxis。
   * 调用线索：super.load、t.readFloat64、this.oe.orientation.set。
   */
  load(t) {
    super.load(t);
    this.oe.epoch = this.time;
    this.oe.semiMajorAxis = t.readFloat64();
    this.oe.eccentricity = t.readFloat64();
    this.oe.meanAngularMotion = t.readFloat64();
    this.oe.meanAnomalyAtEpoch = t.readFloat64();
    this.oe.orientation.set(t.readFloat64(), t.readFloat64(), t.readFloat64(), t.readFloat64());
  }
  /** @eyes-analysis
   * 分别传播左右两组轨道元素至同一目标时刻，再按时间比例线性混合位置和速度；不是简单直接插值轨道元素后传播。
   * 状态写入：oe.epoch、time。
   * 调用线索：PioneerPublicApi.MathUtils.clamp01、PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、t[0]._project、t[1]._project等。
   */
  calculate(t, time, i, n) {
    this.time = time;
    this.oe.epoch = time;
    const o = PioneerPublicApi.Vector3.pool.get();
    const r = PioneerPublicApi.Vector3.pool.get();
    const a = PioneerPublicApi.Vector3.pool.get();
    const l = PioneerPublicApi.Vector3.pool.get();
    const c = PioneerPublicApi.MathUtils.clamp01((time - t[0].time) / (t[1].time - t[0].time));
    t[0]._project(o, a, time, i, n);
    t[1]._project(r, l, time, i, n);
    this.position.lerp(o, r, c);
    this.velocity.lerp(a, l, c);
    PioneerPublicApi.Vector3.pool.release(o);
    PioneerPublicApi.Vector3.pool.release(r);
    PioneerPublicApi.Vector3.pool.release(a);
    PioneerPublicApi.Vector3.pool.release(l);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.setPosition`、`t.setVelocity`。
   * 调用线索：t.setPosition、t.setVelocity。
   */
  apply(t) {
    t.setPosition(this.position);
    t.setVelocity(this.velocity);
  }
  /** @eyes-analysis
   * OrbitalElements.project 得相对轨道状态，body=1/2 时按两引力参数比例拆分成质心两侧状态；incremental 时将传播位置加到输出已有值。
   * 调用线索：PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、a.mult、e.copy、r.mult等。
   */
  _project(t, e, i, n, o) {
    const r = PioneerPublicApi.Vector3.pool.get();
    const a = PioneerPublicApi.Vector3.pool.get();
    this.oe.project(r, a, i);
    let l = 1;
    1 === n.body ? l = (n.gravitationalParameter2 ?? 1) / ((n.gravitationalParameter1 ?? 0) + (n.gravitationalParameter2 ?? 1)) : 2 === n.body && (l = -(n.gravitationalParameter1 ?? 1) / ((n.gravitationalParameter1 ?? 1) + (n.gravitationalParameter2 ?? 0)));
    r.mult(r, l);
    a.mult(a, l);
    o ? t.add(r, t) : t.copy(r);
    e.copy(a);
    PioneerPublicApi.Vector3.pool.release(r);
    PioneerPublicApi.Vector3.pool.release(a);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.setPosition`、`t.setVelocity`。
   * 调用线索：t.setPosition、t.setVelocity。
   */
  setNaN(t) {
    t.setPosition(PioneerPublicApi.Vector3.NaN);
    t.setVelocity(PioneerPublicApi.Vector3.NaN);
  }
  /** @eyes-analysis
   * 轨道点类型头额外读取 gravitationalParameter1 与 gravitationalParameter2 两个 Float64。
   * 调用线索：t.readFloat64。
   */
  static readHeader(t) {
    return {
      gravitationalParameter1: t.readFloat64(),
      gravitationalParameter2: t.readFloat64()
    };
  }
}
/** @eyes-analysis
 * 类职责：分层 Dynamo 时间块；索引块定位叶块，叶块保存相邻可插值样本。
 * 继承：无显式父类；导出：模块内部声明。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class PointSet {
  /** @eyes-analysis
   * 【结构证据】写入 `_PointClass`、`_accessedTime`、`_hintIndex`、`_interval`、`_loadedState`、`_name`、`_numberOfDigits`、`_pointSets`；调用 `new PioneerPublicApi.Interval`。
   * 状态写入：_PointClass、_accessedTime、_hintIndex、_interval、_loadedState、_name、_numberOfDigits、_pointSets等；完整记录见索引。
   * 调用线索：new PioneerPublicApi.Interval。
   */
  constructor(PointClass, version, numberOfDigits, name) {
    this._PointClass = PointClass;
    this._version = version;
    this._numberOfDigits = numberOfDigits;
    this._name = name;
    this._pointSets = [];
    this._points = [];
    this._hintIndex = 0;
    this._interval = new PioneerPublicApi.Interval(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
    this._loadedState = PointSet.State.NOT_LOADED;
    this._accessedTime = Number.POSITIVE_INFINITY;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._name`。
   */
  getName() {
    return this._name;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._interval`。
   */
  getInterval() {
    return this._interval;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._loadedState`。
   */
  getLoadedState() {
    return this._loadedState;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._accessedTime`。
   */
  getLoadedTime() {
    return this._accessedTime;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `0!==this._pointSets.length`。
   */
  hasPointSets() {
    return 0 !== this._pointSets.length;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `0!==this._points.length`。
   */
  hasPoints() {
    return 0 !== this._points.length;
  }
  /** @eyes-analysis
   * v1 def/v2 先读取叶标记。叶节点读取点数和样本；索引节点读取子块起点/范围。v2 最后一个起点只作右边界哨兵，删去对应空子块。
   * 状态写入：_accessedTime、_interval.max、_interval.min、_loadedState、_numberOfDigits、_pointSets[i-1]._interval.max。
   * 调用线索：Date.now、Math.ceil、Math.log10、_PointClass.load、`${i}`.padStart等。
   */
  load(t) {
    let e = true;
    if ((2 === this._version || 1 === this._version && "def" === this._name) && (e = 1 === t.readByte()), e) {
      const e = t.readInt32();
      for (let i = 0; i < e; i++) {
        const _PointClass = new this._PointClass();
        _PointClass.load(t);
        this._points.push(_PointClass);
      }
      this._points.length > 0 && (this._interval.min = this._points[0].time, this._interval.max = this._points[this._points.length - 1].time);
    } else {
      const e = t.readInt32();
      1 === this._version && (this._numberOfDigits = Math.ceil(Math.log10(e)));
      for (let i = 0; i < e; i++) {
        let e;
        e = "def" === this._name ? `${i}`.padStart(this._numberOfDigits, "0") : `${this._name}_${`${i}`.padStart(this._numberOfDigits, "0")}`;
        const pointSet = new PointSet(this._PointClass, this._version, this._numberOfDigits, e);
        pointSet._interval.min = t.readFloat64();
        1 === this._version ? pointSet._interval.max = t.readFloat64() : i > 0 && (this._pointSets[i - 1]._interval.max = pointSet._interval.min);
        this._pointSets.push(pointSet);
      }
      2 === this._version && this._pointSets.splice(this._pointSets.length - 1, 1);
      this._pointSets.length > 0 && (this._interval.min = this._pointSets[0]._interval.min, this._interval.max = this._pointSets[this._pointSets.length - 1]._interval.max);
    }
    this._loadedState = PointSet.State.LOADED;
    this._accessedTime = Date.now();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_loadedState`；调用 `n.add`、`n.delete`、`new PioneerPublicApi.Reader`、`t.download`、`t.download(o,"binary",i).finally`、`this.load`；含显式错误分支。
   * 状态写入：_loadedState。
   * 调用线索：n.add、n.delete、new PioneerPublicApi.Reader、t.download、t.download(o,"binary",i).finally等。
   */
  loadFromUrl(t, e, i, n) {
    this._loadedState = PointSet.State.LOADING;
    const o = `${e}/${this._name}.dyn`;
    n.add(o);
    t.download(o, "binary", i).finally(() => {
      n.delete(o);
    }).then(async t => {
      const reader = new PioneerPublicApi.Reader(t.content);
      this.load(reader);
    }).catch(async t => {
      if (!(t instanceof PioneerPublicApi.CanceledError)) throw this._loadedState = PointSet.State.FAILED, t;
    });
  }
  /** @eyes-analysis
   * 深度遍历已载入子块，一次最多卸载一个超过 15000ms 未访问的子树；根定义保持。
   * 调用线索：Date.now、e.unload、e.unloadOldPointSet。
   */
  unloadOldPointSet() {
    for (let t = 0, e = this._pointSets.length; t < e; t++) {
      const e = this._pointSets[t];
      if (e._loadedState === PointSet.State.LOADED) {
        if (Date.now() - e._accessedTime > 15e3) {
          e.unload();
          return true;
        }
        if (e.unloadOldPointSet()) return true;
      }
    }
    return false;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_accessedTime`、`_loadedState`、`_pointSets`、`_points`。
   * 状态写入：_accessedTime、_loadedState、_pointSets、_points。
   */
  unload() {
    this._loadedState = PointSet.State.NOT_LOADED;
    this._accessedTime = Number.POSITIVE_INFINITY;
    this._pointSets = [];
    this._points = [];
  }
  /** @eyes-analysis
   * 优先命中 hintIndex 及邻块，否则二分定位 interval.min；访问即更新 _accessedTime。
   * 状态写入：_accessedTime、_hintIndex。
   * 调用线索：Date.now、Math.ceil、this._pointSets[this._hintIndex+1]._interval.contains、this._pointSets[this._hintIndex-1]._interval.contains、this._pointSets[this._hintIndex]._interval.contains。
   */
  getPointSet(t) {
    if (this._accessedTime = Date.now(), 0 === this._pointSets.length) return null;
    if (this._pointSets[this._hintIndex]._interval.contains(t)) ;else if (this._hintIndex - 1 >= 0 && this._pointSets[this._hintIndex - 1]._interval.contains(t)) this._hintIndex -= 1;else if (this._hintIndex + 1 < this._pointSets.length && this._pointSets[this._hintIndex + 1]._interval.contains(t)) this._hintIndex += 1;else {
      let e;
      let hintIndex = 0;
      let s = this._pointSets.length - 1;
      for (; hintIndex !== s;) {
        e = Math.ceil((hintIndex + s) / 2);
        t < this._pointSets[e]._interval.min ? s = e - 1 : hintIndex = e;
      }
      this._hintIndex = hintIndex;
    }
    return this._pointSets[this._hintIndex];
  }
  /** @eyes-analysis
   * 返回夹住查询时间的相邻两个样本，先尝试缓存 hintIndex 及邻居，失败才二分；依赖叶节点至少有两点且时间有序。
   * 状态写入：_accessedTime、_hintIndex。
   * 调用线索：Date.now、Math.ceil。
   */
  getPoints(t, e) {
    if (this._accessedTime = Date.now(), 0 === this._points.length) {
      t[0] = null;
      return void (t[1] = null);
    }
    if (this._hintIndex + 1 < this._points.length && this._points[this._hintIndex].time <= e && e < this._points[this._hintIndex + 1].time) ;else if (this._hintIndex - 1 >= 0 && this._points[this._hintIndex - 1].time <= e && e < this._points[this._hintIndex].time) this._hintIndex -= 1;else if (this._hintIndex + 2 < this._points.length && this._points[this._hintIndex + 1].time <= e && e < this._points[this._hintIndex + 2].time) this._hintIndex += 1;else {
      let t;
      let hintIndex = 0;
      let s = this._points.length - 2;
      for (; hintIndex !== s;) {
        t = Math.ceil((hintIndex + s) / 2);
        e < this._points[t].time ? s = t - 1 : hintIndex = t;
      }
      this._hintIndex = hintIndex;
    }
    t[0] = this._points[this._hintIndex];
    t[1] = this._points[this._hintIndex + 1];
  }
  _PointClass;
  _name;
  _pointSets;
  _points;
  _version;
  _numberOfDigits;
  _hintIndex;
  _interval;
  _loadedState;
  _accessedTime;
  static State = {
    NOT_LOADED: 0,
    LOADING: 1,
    LOADED: 2,
    FAILED: 3
  };
}
/** @eyes-analysis
 * 类职责：读取 Dynamo v1/v2 定义与分层时间块，按五类样本插值驱动实体运动和姿态。
 * 继承：PioneerPublicApi.BaseController；导出：DynamoController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class DynamoController extends PioneerPublicApi.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_PointClass`、`_baseUrl`、`_currentDownloads`、`_downloader`、`_header`、`_incremental`、`_lastPoints`、`_numberOfDigits`；调用 `e.getScene`、`e.getScene().getEngine`、`e.getScene().getEngine().getDownloader`、`new PioneerPublicApi.Interval`、`new PosPoint`、`new Set`。
   * 状态写入：_PointClass、_baseUrl、_currentDownloads、_downloader、_header、_incremental、_lastPoints、_numberOfDigits等；完整记录见索引。
   * 调用线索：e.getScene、e.getScene().getEngine、e.getScene().getEngine().getDownloader、new PioneerPublicApi.Interval、new PosPoint等。
   */
  constructor(t, e) {
    super(t, e);
    this._baseUrl = "";
    this._timeOffset = 0;
    this._version = 0;
    this._pointType = "pos";
    this._PointClass = void 0;
    this._numberOfDigits = 0;
    this._header = {
      body: 0
    };
    this._incremental = false;
    this._pointSet = null;
    this._downloader = e.getScene().getEngine().getDownloader();
    this._currentDownloads = new Set();
    this._points = [null, null];
    this._lastPoints = [null, null];
    this._pCalc = new PosPoint();
    this._userCoverage = new PioneerPublicApi.Interval(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    super.setCoverage(new PioneerPublicApi.Interval(NaN, NaN));
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._pointType`。
   */
  getPointType() {
    return this._pointType;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._header[t]`。
   */
  getHeaderValue(t) {
    return this._header[t];
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_header[t]`。
   * 状态写入：_header[t]。
   */
  setHeaderValue(t, e) {
    this._header[t] = e;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._incremental`。
   */
  isIncremental() {
    return this._incremental;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_incremental`。
   * 状态写入：_incremental。
   */
  setIncremental(incremental) {
    this._incremental = incremental;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._baseUrl`。
   */
  getBaseUrl() {
    return this._baseUrl;
  }
  /** @eyes-analysis
   * 取消所有进行中块请求，清理旧类型/覆盖/modifiedStates，规范末尾斜线并重新 _loadDef；异步旧回调没有显式 generation token。
   * 状态写入：_PointClass、_baseUrl、_pointSet。
   * 调用线索：new PioneerPublicApi.Interval、super.setCoverage、this._baseUrl.endsWith、this._baseUrl.slice、this._downloader.cancel等。
   */
  setBaseUrl(baseUrl) {
    for (const t of this._currentDownloads) this._downloader.cancel(t);
    "" !== this._baseUrl && (this._pointSet = null, this._PointClass = void 0, super.setCoverage(new PioneerPublicApi.Interval(NaN, NaN)), this.removeModifiedState("position"), this.removeModifiedState("velocity"), this.removeModifiedState("orientation"), this.removeModifiedState("angularVelocity"));
    this._baseUrl = baseUrl;
    this._baseUrl.endsWith("/") && (this._baseUrl = this._baseUrl.slice(0, -1));
    this._loadDef();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._timeOffset`。
   */
  getTimeOffset() {
    return this._timeOffset;
  }
  /** @eyes-analysis
   * 按偏移差平移已发布 coverage；真实查询时间再减 offset，不修改二进制样本时间。
   * 状态写入：_timeOffset。
   * 调用线索：interval.copy、new PioneerPublicApi.Interval、super.setCoverage、this.getCoverage。
   */
  setTimeOffset(t) {
    const timeOffset = this._timeOffset;
    this._timeOffset = t;
    const interval = new PioneerPublicApi.Interval();
    interval.copy(this.getCoverage());
    interval.min += this._timeOffset - timeOffset;
    interval.max += this._timeOffset - timeOffset;
    super.setCoverage(interval);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.Interval.pool.get`、`PioneerPublicApi.Interval.pool.release`、`e.copy`、`e.intersection`、`new PioneerPublicApi.Interval`、`super.setCoverage`。
   * 调用线索：PioneerPublicApi.Interval.pool.get、PioneerPublicApi.Interval.pool.release、e.copy、e.intersection、new PioneerPublicApi.Interval等。
   */
  setCoverage(t) {
    this._userCoverage.copy(t);
    const e = PioneerPublicApi.Interval.pool.get();
    null !== this._pointSet ? e.intersection(this._userCoverage, this._pointSet.getInterval()) : e.copy(new PioneerPublicApi.Interval(NaN, NaN));
    e.min += this._timeOffset;
    e.max += this._timeOffset;
    super.setCoverage(e);
    PioneerPublicApi.Interval.pool.release(e);
  }
  /** @eyes-analysis
   * 对相邻 OrbPoint 的标量元素线性混合，平近点角按角度混合、轨道姿态 slerp；与 OrbPoint.calculate 的位置传播路径不同。
   * 状态写入：_lastPoints[0]、_lastPoints[1]。
   * 调用线索：PioneerPublicApi.MathUtils.clamp01、PioneerPublicApi.MathUtils.lerp、PioneerPublicApi.MathUtils.lerpAngle、t.orientation.slerp、this._getPointsAtTime。
   */
  getOrbitalElements(t, e) {
    if (this._PointClass === OrbPoint && null !== this._pointSet && (this._getPointsAtTime(this._points, e), null !== this._points[0] && (this._lastPoints[0] = this._points[0], this._lastPoints[1] = this._points[1]), null !== this._lastPoints[0] && null !== this._lastPoints[1])) {
      const i = this._lastPoints[0].oe;
      const n = this._lastPoints[1].oe;
      const o = PioneerPublicApi.MathUtils.clamp01((e - this._lastPoints[0].time) / (this._lastPoints[1].time - this._lastPoints[0].time));
      t.eccentricity = PioneerPublicApi.MathUtils.lerp(i.eccentricity, n.eccentricity, o);
      t.semiMajorAxis = PioneerPublicApi.MathUtils.lerp(i.semiMajorAxis, n.semiMajorAxis, o);
      t.epoch = PioneerPublicApi.MathUtils.lerp(i.epoch, n.epoch, o);
      t.meanAngularMotion = PioneerPublicApi.MathUtils.lerp(i.meanAngularMotion, n.meanAngularMotion, o);
      t.meanAnomalyAtEpoch = PioneerPublicApi.MathUtils.lerpAngle(i.meanAnomalyAtEpoch, n.meanAnomalyAtEpoch, o);
      t.orientation.slerp(i.orientation, n.orientation, o);
    }
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_lastPoints[0]`、`_lastPoints[1]`；返回 `PioneerPublicApi.MathUtils.lerp(this._lastPoints[0].oe.eccentricity,this._lastPoints[1].oe.eccentricity,e)` 或 `Number.NaN`；调用 `PioneerPublicApi.MathUtils.clamp01`、`PioneerPublicApi.MathUtils.lerp`、`this._getPointsAtTime`。
   * 状态写入：_lastPoints[0]、_lastPoints[1]。
   * 调用线索：PioneerPublicApi.MathUtils.clamp01、PioneerPublicApi.MathUtils.lerp、this._getPointsAtTime。
   */
  getEccentricity(t) {
    if (this._PointClass === OrbPoint && null !== this._pointSet && (this._getPointsAtTime(this._points, t), null !== this._points[0] && (this._lastPoints[0] = this._points[0], this._lastPoints[1] = this._points[1]), null !== this._lastPoints[0] && null !== this._lastPoints[1])) {
      const e = PioneerPublicApi.MathUtils.clamp01((t - this._lastPoints[0].time) / (this._lastPoints[1].time - this._lastPoints[0].time));
      return PioneerPublicApi.MathUtils.lerp(this._lastPoints[0].oe.eccentricity, this._lastPoints[1].oe.eccentricity, e);
    }
    return Number.NaN;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_lastPoints[0]`、`_lastPoints[1]`；返回 `PioneerPublicApi.MathUtils.lerp(this._lastPoints[0].oe.semiMajorAxis,this._lastPoints[1].oe.semiMajorAxis,e)` 或 `Number.NaN`；调用 `PioneerPublicApi.MathUtils.clamp01`、`PioneerPublicApi.MathUtils.lerp`、`this._getPointsAtTime`。
   * 状态写入：_lastPoints[0]、_lastPoints[1]。
   * 调用线索：PioneerPublicApi.MathUtils.clamp01、PioneerPublicApi.MathUtils.lerp、this._getPointsAtTime。
   */
  getSemiMajorAxis(t) {
    if (this._PointClass === OrbPoint && null !== this._pointSet && (this._getPointsAtTime(this._points, t), null !== this._points[0] && (this._lastPoints[0] = this._points[0], this._lastPoints[1] = this._points[1]), null !== this._lastPoints[0] && null !== this._lastPoints[1])) {
      const e = PioneerPublicApi.MathUtils.clamp01((t - this._lastPoints[0].time) / (this._lastPoints[1].time - this._lastPoints[0].time));
      return PioneerPublicApi.MathUtils.lerp(this._lastPoints[0].oe.semiMajorAxis, this._lastPoints[1].oe.semiMajorAxis, e);
    }
    return Number.NaN;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_lastPoints[0]`、`_lastPoints[1]`；调用 `PioneerPublicApi.MathUtils.clamp01`、`t.slerp`、`this._getPointsAtTime`。
   * 状态写入：_lastPoints[0]、_lastPoints[1]。
   * 调用线索：PioneerPublicApi.MathUtils.clamp01、t.slerp、this._getPointsAtTime。
   */
  getOrbitOrientation(t, e) {
    if (this._PointClass === OrbPoint && null !== this._pointSet && (this._getPointsAtTime(this._points, e), null !== this._points[0] && (this._lastPoints[0] = this._points[0], this._lastPoints[1] = this._points[1]), null !== this._lastPoints[0] && null !== this._lastPoints[1])) {
      const i = PioneerPublicApi.MathUtils.clamp01((e - this._lastPoints[0].time) / (this._lastPoints[1].time - this._lastPoints[0].time));
      t.slerp(this._lastPoints[0].oe.orientation, this._lastPoints[1].oe.orientation, i);
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `super.__destroy`、`this._downloader.cancel`。
   * 调用线索：super.__destroy、this._downloader.cancel。
   */
  __destroy() {
    for (const t of this._currentDownloads) this._downloader.cancel(t);
    super.__destroy();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void t.copy(PioneerPublicApi.Vector3.NaN)`；调用 `t.copy`、`this._getPointsAtTime`、`this._pCalc.calculate`、`this.getCoverage`、`this.getCoverage().contains`。
   * 调用线索：t.copy、this._getPointsAtTime、this._pCalc.calculate、this.getCoverage、this.getCoverage().contains。
   */
  __updatePositionAtTime(t, e) {
    if (null !== this._pointSet) {
      if ("position" in this._pCalc && this.getCoverage().contains(e)) {
        if (this._pCalc.time !== e) {
          if (this._getPointsAtTime(this._points, e), null === this._points[0]) return void t.copy(PioneerPublicApi.Vector3.NaN);
          this._pCalc.calculate(this._points, e - this._timeOffset, this._header, this._incremental);
        }
        t.copy(this._pCalc.position);
      }
    } else t.copy(PioneerPublicApi.Vector3.NaN);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void t.copy(PioneerPublicApi.Vector3.NaN)`；调用 `t.copy`、`this._getPointsAtTime`、`this._pCalc.calculate`、`this.getCoverage`、`this.getCoverage().contains`。
   * 调用线索：t.copy、this._getPointsAtTime、this._pCalc.calculate、this.getCoverage、this.getCoverage().contains。
   */
  __updateVelocityAtTime(t, e) {
    if (null !== this._pointSet) {
      if ("velocity" in this._pCalc && this.getCoverage().contains(e)) {
        if (this._pCalc.time !== e) {
          if (this._getPointsAtTime(this._points, e), null === this._points[0]) return void t.copy(PioneerPublicApi.Vector3.NaN);
          this._pCalc.calculate(this._points, e - this._timeOffset, this._header, this._incremental);
        }
        t.copy(this._pCalc.velocity);
      }
    } else t.copy(PioneerPublicApi.Vector3.NaN);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void t.copy(PioneerPublicApi.Quaternion.NaN)`；调用 `t.copy`、`this._getPointsAtTime`、`this._pCalc.calculate`、`this.getCoverage`、`this.getCoverage().contains`。
   * 调用线索：t.copy、this._getPointsAtTime、this._pCalc.calculate、this.getCoverage、this.getCoverage().contains。
   */
  __updateOrientationAtTime(t, e) {
    if (null !== this._pointSet) {
      if ("orientation" in this._pCalc && this.getCoverage().contains(e)) {
        if (this._pCalc.time !== e) {
          if (this._getPointsAtTime(this._points, e), null === this._points[0]) return void t.copy(PioneerPublicApi.Quaternion.NaN);
          this._pCalc.calculate(this._points, e - this._timeOffset, this._header, this._incremental);
        }
        t.copy(this._pCalc.orientation);
      }
    } else t.copy(PioneerPublicApi.Quaternion.NaN);
  }
  /** @eyes-analysis
   * 每帧尝试获得新样本并插值；暂未载入时用 _lastPoints 继续推算，根未载入时将四类状态设 NaN；因此后备路径可外推越过旧时间段。
   * 状态写入：_lastPoints[0]、_lastPoints[1]。
   * 调用线索：t.getScene、t.getScene().getEngine、t.getScene().getEngine().getTime、this._getPointsAtTime、this._pCalc.apply等。
   */
  __update() {
    const t = this.getEntity();
    const e = t.getScene().getEngine().getTime();
    null !== this._pointSet ? (this._pointSet.unloadOldPointSet(), this._getPointsAtTime(this._points, e), null !== this._points[0] ? (this._pCalc.calculate(this._points, e - this._timeOffset, this._header, this._incremental), this._pCalc.apply(t), this._lastPoints[0] = this._points[0], this._lastPoints[1] = this._points[1]) : null !== this._lastPoints[0] && null !== this._lastPoints[1] && (this._pCalc.calculate(this._lastPoints, e - this._timeOffset, this._header, this._incremental), this._pCalc.apply(t))) : (this.getEntity().setPosition(PioneerPublicApi.Vector3.NaN), this.getEntity().setVelocity(PioneerPublicApi.Vector3.NaN), this.getEntity().setOrientation(PioneerPublicApi.Quaternion.NaN), this.getEntity().setAngularVelocity(PioneerPublicApi.Vector3.NaN));
  }
  /** @eyes-analysis
   * 下载 baseUrl/def.dyn，校验版本只允许 1/2，按 pos/lin/ori/quat/orb 选 PointClass；设置 modifiedStates、类型头和根 PointSet，coverage 与用户覆盖取交再加 timeOffset。
   * 状态写入：_PointClass、_header、_numberOfDigits、_pCalc、_pointSet、_pointType、_version。
   * 调用线索：Object.assign、PioneerPublicApi.Interval.pool.get、PioneerPublicApi.Interval.pool.release、new Error、new PioneerPublicApi.Reader等。
   */
  async _loadDef() {
    const t = `${this._baseUrl}/def.dyn`;
    let e;
    this._currentDownloads.add(t);
    try {
      e = await this._downloader.download(t, "binary", -this.getEntity().getLeastCameraDepth());
    } catch (t) {
      if (t instanceof PioneerPublicApi.CanceledError) return;
      throw t;
    } finally {
      this._currentDownloads.delete(t);
    }
    try {
      const reader = new PioneerPublicApi.Reader(e.content);
      if (this._version = reader.readInt16(), 1 !== this._version && 2 !== this._version) throw new Error(`${t} is not Dynamo version 1 or 2`);
      const pointType = reader.readString();
      if ("pos" === pointType) this._PointClass = PosPoint;else if ("lin" === pointType) this._PointClass = LinPoint;else if ("ori" === pointType) this._PointClass = OriPoint;else if ("quat" === pointType) this._PointClass = QuatPoint;else {
        if ("orb" !== pointType) throw new Error(`${t} does not have valid Dynamo type`);
        this._PointClass = OrbPoint;
      }
      this._pointType = pointType;
      this._pCalc = new this._PointClass();
      this._PointClass === PosPoint || this._PointClass === LinPoint || this._PointClass === OrbPoint ? (this.addModifiedState("position"), this.addModifiedState("velocity"), this.removeModifiedState("orientation"), this.removeModifiedState("angularVelocity")) : this._PointClass !== OriPoint && this._PointClass !== QuatPoint || (this.addModifiedState("orientation"), this.addModifiedState("angularVelocity"), this.removeModifiedState("position"), this.removeModifiedState("velocity"));
      2 === this._version && (this._numberOfDigits = reader.readByte());
      this._header = Object.assign(this._header, this._PointClass.readHeader(reader));
      this._pointSet = new PointSet(this._PointClass, this._version, this._numberOfDigits, "def");
      this._pointSet.load(reader);
      const o = PioneerPublicApi.Interval.pool.get();
      o.intersection(this._userCoverage, this._pointSet.getInterval());
      o.min += this._timeOffset;
      o.max += this._timeOffset;
      super.setCoverage(o);
      PioneerPublicApi.Interval.pool.release(o);
    } catch (e) {
      throw new Error(`While reading ${t}: ${e instanceof Error ? e.message : "unknown error"}`);
    }
  }
  /** @eyes-analysis
   * 查询时统一减 timeOffset，逐层进入 PointSet；未加载块异步启动下载并返回 null；FAILED 重新 setBaseUrl 载入根定义。
   * 调用线索：pointSet.getLoadedState、pointSet.getPointSet、pointSet.getPoints、pointSet.hasPoints、pointSet.loadFromUrl等。
   */
  _getPointsAtTime(t, e) {
    let pointSet = this._pointSet;
    for (; null !== pointSet;) {
      if (pointSet.hasPoints()) return void pointSet.getPoints(t, e - this._timeOffset);
      if (pointSet.getLoadedState() !== PointSet.State.LOADED) {
        if (pointSet.getLoadedState() === PointSet.State.NOT_LOADED) {
          pointSet.loadFromUrl(this._downloader, this._baseUrl, -this.getEntity().getLeastCameraDepth(), this._currentDownloads);
          break;
        }
        if (pointSet.getLoadedState() === PointSet.State.FAILED) {
          this.setBaseUrl(this._baseUrl);
          break;
        }
        break;
      }
      pointSet = pointSet.getPointSet(e - this._timeOffset);
    }
    t[0] = null;
    t[1] = null;
  }
  _baseUrl;
  _timeOffset;
  _version;
  _pointType;
  _PointClass;
  _numberOfDigits;
  _header;
  _incremental;
  _pointSet;
  _downloader;
  _currentDownloads;
  _points;
  _lastPoints;
  _pCalc;
  _userCoverage;
}
export { DynamoController };
