// Recovered from app.js:452962-470709.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 样本时间来自文件的 Float64；calculate 的输出对象由控制器复用，不改写端点样本。 */
class Point {
  time;
  constructor() {
    this.time = NaN;
  }
  load(reader) {
    this.time = reader.readFloat64();
  }
  calculate(samples, time, header, incremental) {}
  apply(entity) {}
  setNaN(entity) {}
  static readHeader(reader) {
    return {};
  }
}
/** 三次 Hermite 插值同时使用两端位置和速度；速度为同一多项式对时间的导数，比例不截断，因此允许外推。 */
class PosPoint extends Point {
  position;
  velocity;
  constructor() {
    super();
    this.position = new PioneerPublicApi.Vector3();
    this.velocity = new PioneerPublicApi.Vector3();
  }
  /** 记录为 time、position.xyz、velocity.xyz，共七个 Float64（56 字节）；各分量沿文件顺序读取。 */
  load(reader) {
    super.load(reader);
    this.position = new PioneerPublicApi.Vector3(reader.readFloat64(), reader.readFloat64(), reader.readFloat64());
    this.velocity = new PioneerPublicApi.Vector3(reader.readFloat64(), reader.readFloat64(), reader.readFloat64());
  }
  calculate(samples, time, header, incremental) {
    this.time = time;
    const sampleDuration = samples[1].time - samples[0].time;
    const fraction = (time - samples[0].time) / sampleDuration;
    const remainingFraction = 1 - fraction;
    const remainingSquared = remainingFraction * remainingFraction;
    const fractionSquared = fraction * fraction;
    const startPositionWeight = (1 + 2 * fraction) * remainingSquared;
    const startVelocityWeight = fraction * remainingSquared;
    const endPositionWeight = fractionSquared * (3 - 2 * fraction);
    const endVelocityWeight = fractionSquared * -remainingFraction;
    this.position.mult(samples[0].position, startPositionWeight);
    this.position.addMult(this.position, samples[0].velocity, sampleDuration * startVelocityWeight);
    this.position.addMult(this.position, samples[1].position, endPositionWeight);
    this.position.addMult(this.position, samples[1].velocity, sampleDuration * endVelocityWeight);
    const positionDerivativeWeight = 6 * (fractionSquared - fraction);
    const startPositionDerivativeWeight = positionDerivativeWeight;
    const startVelocityDerivativeWeight = 3 * fractionSquared - 4 * fraction + 1;
    const endPositionDerivativeWeight = -positionDerivativeWeight;
    const endVelocityDerivativeWeight = 3 * fractionSquared - 2 * fraction;
    this.velocity.mult(samples[0].position, startPositionDerivativeWeight / sampleDuration);
    this.velocity.addMult(this.velocity, samples[0].velocity, startVelocityDerivativeWeight);
    this.velocity.addMult(this.velocity, samples[1].position, endPositionDerivativeWeight / sampleDuration);
    this.velocity.addMult(this.velocity, samples[1].velocity, endVelocityDerivativeWeight);
  }
  apply(entity) {
    entity.setPosition(this.position);
    entity.setVelocity(this.velocity);
  }
  setNaN(entity) {
    entity.setPosition(PioneerPublicApi.Vector3.NaN);
    entity.setVelocity(PioneerPublicApi.Vector3.NaN);
  }
  static readHeader(reader) {
    return {};
  }
}
/** 位置按截断比例线性混合，速度为整段割线；时间不递增时使用末端位置和零速度。 */
class LinPoint extends Point {
  position;
  velocity;
  constructor() {
    super();
    this.position = new PioneerPublicApi.Vector3();
    this.velocity = new PioneerPublicApi.Vector3();
  }
  /** 记录为 time、position.xyz，共四个 Float64（32 字节）；文件不携带速度。 */
  load(reader) {
    super.load(reader);
    this.position.set(reader.readFloat64(), reader.readFloat64(), reader.readFloat64());
    this.velocity.copy(PioneerPublicApi.Vector3.Zero);
  }
  calculate(samples, time, header, incremental) {
    this.time = time;
    if (samples[1].time > samples[0].time) {
      const fraction = PioneerPublicApi.MathUtils.clamp01((time - samples[0].time) / (samples[1].time - samples[0].time));
      this.position.lerp(samples[0].position, samples[1].position, fraction);
      this.velocity.sub(samples[1].position, samples[0].position);
      this.velocity.div(this.velocity, samples[1].time - samples[0].time);
    } else {
      this.position.copy(samples[1].position);
      this.velocity.copy(PioneerPublicApi.Vector3.Zero);
    }
  }
  apply(entity) {
    entity.setPosition(this.position);
    entity.setVelocity(this.velocity);
  }
  setNaN(entity) {
    entity.setPosition(PioneerPublicApi.Vector3.NaN);
    entity.setVelocity(PioneerPublicApi.Vector3.NaN);
  }
  static readHeader(reader) {
    return {};
  }
}
/** 先按各端点角速度传播到查询时间，再球面混合姿态；临时四元数和向量均归还对象池。 */
class OriPoint extends Point {
  orientation;
  angularVelocity;
  constructor() {
    super();
    this.orientation = new PioneerPublicApi.Quaternion();
    this.angularVelocity = new PioneerPublicApi.Vector3();
  }
  /** 记录为 time、四元数四分量、angularVelocity.xyz，共八个 Float64（64 字节）；四元数顺序沿构造器约定。 */
  load(reader) {
    super.load(reader);
    this.orientation = new PioneerPublicApi.Quaternion(reader.readFloat64(), reader.readFloat64(), reader.readFloat64(), reader.readFloat64());
    this.angularVelocity = new PioneerPublicApi.Vector3(reader.readFloat64(), reader.readFloat64(), reader.readFloat64());
  }
  calculate(samples, time, header, incremental) {
    this.time = time;
    const startOrientation = PioneerPublicApi.Quaternion.pool.get();
    const endOrientation = PioneerPublicApi.Quaternion.pool.get();
    const fraction = (time - samples[0].time) / (samples[1].time - samples[0].time);
    samples[0]._project(startOrientation, time, incremental);
    samples[1]._project(endOrientation, time, incremental);
    this.orientation.slerp(startOrientation, endOrientation, fraction);
    PioneerPublicApi.Quaternion.pool.release(startOrientation);
    PioneerPublicApi.Quaternion.pool.release(endOrientation);
    this.angularVelocity.slerp(samples[0].angularVelocity, samples[1].angularVelocity, fraction);
    this.angularVelocity.neg(this.angularVelocity);
    this.angularVelocity.rotate(this.orientation, this.angularVelocity);
  }
  apply(entity) {
    entity.setOrientation(this.orientation);
    entity.setAngularVelocity(this.angularVelocity);
  }
  /** 角速度模长乘时间差得到轴角（弧度）；增量模式依赖调用者给定的输出初态，临时旋转从对象池借还。 */
  _project(orientationOut, time, incremental) {
    const rotationAxis = PioneerPublicApi.Vector3.pool.get();
    const elapsedRotation = PioneerPublicApi.Quaternion.pool.get();
    rotationAxis.normalize(this.angularVelocity);
    elapsedRotation.setFromAxisAngle(rotationAxis, this.angularVelocity.magnitude() * (time - this.time));
    PioneerPublicApi.Vector3.pool.release(rotationAxis);
    if (incremental) {
      elapsedRotation.multInverseR(this.orientation, elapsedRotation);
      orientationOut.mult(orientationOut, elapsedRotation);
    } else {
      orientationOut.multInverseR(this.orientation, elapsedRotation);
    }
    PioneerPublicApi.Quaternion.pool.release(elapsedRotation);
  }
  setNaN(entity) {
    entity.setOrientation(PioneerPublicApi.Quaternion.NaN);
    entity.setAngularVelocity(PioneerPublicApi.Vector3.NaN);
  }
  static readHeader(reader) {
    return {};
  }
}
/** 仅对姿态样本做截断球面混合；应用到实体时角速度固定为零。 */
class QuatPoint extends Point {
  orientation;
  angularVelocity;
  constructor() {
    super();
    this.orientation = new PioneerPublicApi.Quaternion();
    this.angularVelocity = new PioneerPublicApi.Vector3();
  }
  /** 记录为 time 和四元数四分量，共五个 Float64（40 字节）。 */
  load(reader) {
    super.load(reader);
    this.orientation = new PioneerPublicApi.Quaternion(reader.readFloat64(), reader.readFloat64(), reader.readFloat64(), reader.readFloat64());
  }
  calculate(samples, time, header, incremental) {
    this.time = time;
    const fraction = PioneerPublicApi.MathUtils.clamp01((time - samples[0].time) / (samples[1].time - samples[0].time));
    this.orientation.slerp(samples[0].orientation, samples[1].orientation, fraction);
  }
  apply(entity) {
    entity.setOrientation(this.orientation);
    entity.setAngularVelocity(PioneerPublicApi.Vector3.Zero);
  }
  setNaN(entity) {
    entity.setOrientation(PioneerPublicApi.Quaternion.NaN);
    entity.setAngularVelocity(PioneerPublicApi.Vector3.NaN);
  }
  static readHeader(reader) {
    return {};
  }
}
/** 两个轨道样本各自传播到同一时刻，再混合位置和速度；body 选择按引力参数比例缩放到质心参考系。 */
class OrbPoint extends Point {
  oe;
  position;
  velocity;
  constructor() {
    super();
    this.oe = new PioneerPublicApi.OrbitalElements();
    this.position = new PioneerPublicApi.Vector3();
    this.velocity = new PioneerPublicApi.Vector3();
  }
  /** 记录为 time、a、e、n、M0、轨道四元数，共九个 Float64（72 字节）；样本时间同时作为轨道历元。 */
  load(reader) {
    super.load(reader);
    this.oe.epoch = this.time;
    this.oe.semiMajorAxis = reader.readFloat64();
    this.oe.eccentricity = reader.readFloat64();
    this.oe.meanAngularMotion = reader.readFloat64();
    this.oe.meanAnomalyAtEpoch = reader.readFloat64();
    this.oe.orientation.set(reader.readFloat64(), reader.readFloat64(), reader.readFloat64(), reader.readFloat64());
  }
  calculate(samples, time, header, incremental) {
    this.time = time;
    this.oe.epoch = time;
    const startPosition = PioneerPublicApi.Vector3.pool.get();
    const endPosition = PioneerPublicApi.Vector3.pool.get();
    const startVelocity = PioneerPublicApi.Vector3.pool.get();
    const endVelocity = PioneerPublicApi.Vector3.pool.get();
    const fraction = PioneerPublicApi.MathUtils.clamp01((time - samples[0].time) / (samples[1].time - samples[0].time));
    samples[0]._project(startPosition, startVelocity, time, header, incremental);
    samples[1]._project(endPosition, endVelocity, time, header, incremental);
    this.position.lerp(startPosition, endPosition, fraction);
    this.velocity.lerp(startVelocity, endVelocity, fraction);
    PioneerPublicApi.Vector3.pool.release(startPosition);
    PioneerPublicApi.Vector3.pool.release(endPosition);
    PioneerPublicApi.Vector3.pool.release(startVelocity);
    PioneerPublicApi.Vector3.pool.release(endVelocity);
  }
  apply(entity) {
    entity.setPosition(this.position);
    entity.setVelocity(this.velocity);
  }
  /** body=1/2 分别给相对轨道乘 μ2/(μ1+μ2) 或 −μ1/(μ1+μ2)；增量模式只累加位置，速度仍覆盖写入。 */
  _project(positionOut, velocityOut, time, header, incremental) {
    const relativePosition = PioneerPublicApi.Vector3.pool.get();
    const relativeVelocity = PioneerPublicApi.Vector3.pool.get();
    this.oe.project(relativePosition, relativeVelocity, time);
    let barycentricScale = 1;
    if (1 === header.body) {
      barycentricScale = (header.gravitationalParameter2 ?? 1) / ((header.gravitationalParameter1 ?? 0) + (header.gravitationalParameter2 ?? 1));
    } else if (2 === header.body) {
      barycentricScale = -(header.gravitationalParameter1 ?? 1) / ((header.gravitationalParameter1 ?? 1) + (header.gravitationalParameter2 ?? 0));
    }
    relativePosition.mult(relativePosition, barycentricScale);
    relativeVelocity.mult(relativeVelocity, barycentricScale);
    if (incremental) {
      positionOut.add(relativePosition, positionOut);
    } else {
      positionOut.copy(relativePosition);
    }
    velocityOut.copy(relativeVelocity);
    PioneerPublicApi.Vector3.pool.release(relativePosition);
    PioneerPublicApi.Vector3.pool.release(relativeVelocity);
  }
  setNaN(entity) {
    entity.setPosition(PioneerPublicApi.Vector3.NaN);
    entity.setVelocity(PioneerPublicApi.Vector3.NaN);
  }
  static readHeader(reader) {
    return {
      gravitationalParameter1: reader.readFloat64(),
      gravitationalParameter2: reader.readFloat64()
    };
  }
}
/** 块可包含样本或下级块。v1 索引存每段起止时间，v2 存连续边界并丢弃末尾哨兵；缓存索引先尝试相邻段再二分。 */
class PointSet {
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
  getName() {
    return this._name;
  }
  getInterval() {
    return this._interval;
  }
  getLoadedState() {
    return this._loadedState;
  }
  getLoadedTime() {
    return this._accessedTime;
  }
  hasPointSets() {
    return 0 !== this._pointSets.length;
  }
  hasPoints() {
    return 0 !== this._points.length;
  }
  /** 版本标记决定后续是样本还是下级索引；叶节点供插值时要求至少两点且时间有序。v2 最后一个边界只封闭前段，不对应文件。 */
  load(reader) {
    let storesSamples = true;
    if (2 === this._version || 1 === this._version && "def" === this._name) {
      storesSamples = 1 === reader.readByte();
    }
    if (storesSamples) {
      const entryCount = reader.readInt32();
      for (let entryIndex = 0; entryIndex < entryCount; entryIndex++) {
        const sample = new this._PointClass();
        sample.load(reader);
        this._points.push(sample);
      }
      if (this._points.length > 0) {
        this._interval.min = this._points[0].time;
        this._interval.max = this._points[this._points.length - 1].time;
      }
    } else {
      const entryCount = reader.readInt32();
      if (1 === this._version) {
        this._numberOfDigits = Math.ceil(Math.log10(entryCount));
      }
      for (let entryIndex = 0; entryIndex < entryCount; entryIndex++) {
        let childName;
        childName = "def" === this._name ? `${entryIndex}`.padStart(this._numberOfDigits, "0") : `${this._name}_${`${entryIndex}`.padStart(this._numberOfDigits, "0")}`;
        const pointSet = new PointSet(this._PointClass, this._version, this._numberOfDigits, childName);
        pointSet._interval.min = reader.readFloat64();
        if (1 === this._version) {
          pointSet._interval.max = reader.readFloat64();
        } else if (entryIndex > 0) {
          this._pointSets[entryIndex - 1]._interval.max = pointSet._interval.min;
        }
        this._pointSets.push(pointSet);
      }
      if (2 === this._version) {
        this._pointSets.splice(this._pointSets.length - 1, 1);
      }
      if (this._pointSets.length > 0) {
        this._interval.min = this._pointSets[0]._interval.min;
        this._interval.max = this._pointSets[this._pointSets.length - 1]._interval.max;
      }
    }
    this._loadedState = PointSet.State.LOADED;
    this._accessedTime = Date.now();
  }
  /** 下载集合用于控制器取消请求；finally 先移除 URL，再处理内容。取消不会被改成 FAILED，保持原生命周期。 */
  loadFromUrl(downloader, baseUrl, priority, currentDownloads) {
    this._loadedState = PointSet.State.LOADING;
    const pointSetUrl = `${baseUrl}/${this._name}.dyn`;
    currentDownloads.add(pointSetUrl);
    downloader.download(pointSetUrl, "binary", priority).finally(() => {
      currentDownloads.delete(pointSetUrl);
    }).then(async downloadResult => {
      const reader = new PioneerPublicApi.Reader(downloadResult.content);
      this.load(reader);
    }).catch(async error => {
      if (!(error instanceof PioneerPublicApi.CanceledError)) {
        this._loadedState = PointSet.State.FAILED;
        throw error;
      }
    });
  }
  /** 每次最多卸载一个超过 15 秒未访问的已载入子树，避免单帧集中清理。 */
  unloadOldPointSet() {
    for (let childIndex = 0, childCount = this._pointSets.length; childIndex < childCount; childIndex++) {
      const childPointSet = this._pointSets[childIndex];
      if (childPointSet._loadedState === PointSet.State.LOADED) {
        if (Date.now() - childPointSet._accessedTime > 15e3) {
          childPointSet.unload();
          return true;
        }
        if (childPointSet.unloadOldPointSet()) {
          return true;
        }
      }
    }
    return false;
  }
  unload() {
    this._loadedState = PointSet.State.NOT_LOADED;
    this._accessedTime = Number.POSITIVE_INFINITY;
    this._pointSets = [];
    this._points = [];
  }
  /** hint 命中后不移动；相邻命中只移动一格，否则以起始时间二分，保留原有越界查询行为。 */
  getPointSet(time) {
    this._accessedTime = Date.now();
    if (0 === this._pointSets.length) {
      return null;
    }
    if (this._pointSets[this._hintIndex]._interval.contains(time)) {} else if (this._hintIndex - 1 >= 0 && this._pointSets[this._hintIndex - 1]._interval.contains(time)) {
      this._hintIndex -= 1;
    } else if (this._hintIndex + 1 < this._pointSets.length && this._pointSets[this._hintIndex + 1]._interval.contains(time)) {
      this._hintIndex += 1;
    } else {
      let middleIndex;
      let lowerIndex = 0;
      let upperIndex = this._pointSets.length - 1;
      for (; lowerIndex !== upperIndex;) {
        middleIndex = Math.ceil((lowerIndex + upperIndex) / 2);
        if (time < this._pointSets[middleIndex]._interval.min) {
          upperIndex = middleIndex - 1;
        } else {
          lowerIndex = middleIndex;
        }
      }
      this._hintIndex = lowerIndex;
    }
    return this._pointSets[this._hintIndex];
  }
  /** 输出数组由调用者持有；空块清空两个槽。有序叶节点用左闭右开区间匹配，末端或外部时间由二分选择端段。 */
  getPoints(samplesOut, time) {
    this._accessedTime = Date.now();
    if (0 === this._points.length) {
      samplesOut[0] = null;
      samplesOut[1] = null;
      return;
    }
    if (this._hintIndex + 1 < this._points.length && this._points[this._hintIndex].time <= time && time < this._points[this._hintIndex + 1].time) {} else if (this._hintIndex - 1 >= 0 && this._points[this._hintIndex - 1].time <= time && time < this._points[this._hintIndex].time) {
      this._hintIndex -= 1;
    } else if (this._hintIndex + 2 < this._points.length && this._points[this._hintIndex + 1].time <= time && time < this._points[this._hintIndex + 2].time) {
      this._hintIndex += 1;
    } else {
      let middleIndex;
      let lowerIndex = 0;
      let upperIndex = this._points.length - 2;
      for (; lowerIndex !== upperIndex;) {
        middleIndex = Math.ceil((lowerIndex + upperIndex) / 2);
        if (time < this._points[middleIndex].time) {
          upperIndex = middleIndex - 1;
        } else {
          lowerIndex = middleIndex;
        }
      }
      this._hintIndex = lowerIndex;
    }
    samplesOut[0] = this._points[this._hintIndex];
    samplesOut[1] = this._points[this._hintIndex + 1];
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
/** 场景查询时间减去 timeOffset 后才进入文件时间域；已公布覆盖区间反向加偏移。异步缺块时保留上次端点供每帧继续传播。 */
class DynamoController extends PioneerPublicApi.BaseController {
  constructor(name, entity) {
    super(name, entity);
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
    this._downloader = entity.getScene().getEngine().getDownloader();
    this._currentDownloads = new Set();
    this._points = [null, null];
    this._lastPoints = [null, null];
    this._pCalc = new PosPoint();
    this._userCoverage = new PioneerPublicApi.Interval(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    super.setCoverage(new PioneerPublicApi.Interval(NaN, NaN));
  }
  getPointType() {
    return this._pointType;
  }
  getHeaderValue(headerKey) {
    return this._header[headerKey];
  }
  setHeaderValue(headerKey, value) {
    this._header[headerKey] = value;
  }
  isIncremental() {
    return this._incremental;
  }
  setIncremental(incremental) {
    this._incremental = incremental;
  }
  getBaseUrl() {
    return this._baseUrl;
  }
  /** 取消集合中的现有请求并清除旧类型状态后载入定义；保留原有异步流程，不新增世代令牌。 */
  setBaseUrl(baseUrl) {
    for (const downloadUrl of this._currentDownloads) this._downloader.cancel(downloadUrl);
    if ("" !== this._baseUrl) {
      this._pointSet = null;
      this._PointClass = void 0;
      super.setCoverage(new PioneerPublicApi.Interval(NaN, NaN));
      this.removeModifiedState("position");
      this.removeModifiedState("velocity");
      this.removeModifiedState("orientation");
      this.removeModifiedState("angularVelocity");
    }
    this._baseUrl = baseUrl;
    if (this._baseUrl.endsWith("/")) {
      this._baseUrl = this._baseUrl.slice(0, -1);
    }
    this._loadDef();
  }
  getTimeOffset() {
    return this._timeOffset;
  }
  /** 只按偏移差平移已发布 coverage；文件样本及其时间不变，查询路径会减去当前偏移。 */
  setTimeOffset(timeOffset) {
    const previousTimeOffset = this._timeOffset;
    this._timeOffset = timeOffset;
    const interval = new PioneerPublicApi.Interval();
    interval.copy(this.getCoverage());
    interval.min += this._timeOffset - previousTimeOffset;
    interval.max += this._timeOffset - previousTimeOffset;
    super.setCoverage(interval);
  }
  /** 用户覆盖与文件覆盖先取交，再加 timeOffset 发布到场景时间域；临时区间归还池。 */
  setCoverage(coverage) {
    this._userCoverage.copy(coverage);
    const effectiveCoverage = PioneerPublicApi.Interval.pool.get();
    if (null !== this._pointSet) {
      effectiveCoverage.intersection(this._userCoverage, this._pointSet.getInterval());
    } else {
      effectiveCoverage.copy(new PioneerPublicApi.Interval(NaN, NaN));
    }
    effectiveCoverage.min += this._timeOffset;
    effectiveCoverage.max += this._timeOffset;
    super.setCoverage(effectiveCoverage);
    PioneerPublicApi.Interval.pool.release(effectiveCoverage);
  }
  /** 标量元素线性混合，平近点角跨周期混合，轨道姿态球面混合；这与传播后混合位置的 OrbPoint 路径不同。 */
  getOrbitalElements(elementsOut, time) {
    if (this._PointClass === OrbPoint) {
      if (null !== this._pointSet) {
        this._getPointsAtTime(this._points, time);
        if (null !== this._points[0]) {
          this._lastPoints[0] = this._points[0];
          this._lastPoints[1] = this._points[1];
        }
        if (null !== this._lastPoints[0]) {
          if (null !== this._lastPoints[1]) {
            const startElements = this._lastPoints[0].oe;
            const endElements = this._lastPoints[1].oe;
            const fraction = PioneerPublicApi.MathUtils.clamp01((time - this._lastPoints[0].time) / (this._lastPoints[1].time - this._lastPoints[0].time));
            elementsOut.eccentricity = PioneerPublicApi.MathUtils.lerp(startElements.eccentricity, endElements.eccentricity, fraction);
            elementsOut.semiMajorAxis = PioneerPublicApi.MathUtils.lerp(startElements.semiMajorAxis, endElements.semiMajorAxis, fraction);
            elementsOut.epoch = PioneerPublicApi.MathUtils.lerp(startElements.epoch, endElements.epoch, fraction);
            elementsOut.meanAngularMotion = PioneerPublicApi.MathUtils.lerp(startElements.meanAngularMotion, endElements.meanAngularMotion, fraction);
            elementsOut.meanAnomalyAtEpoch = PioneerPublicApi.MathUtils.lerpAngle(startElements.meanAnomalyAtEpoch, endElements.meanAnomalyAtEpoch, fraction);
            elementsOut.orientation.slerp(startElements.orientation, endElements.orientation, fraction);
          }
        }
      }
    }
  }
  getEccentricity(time) {
    if (this._PointClass === OrbPoint) {
      if (null !== this._pointSet) {
        this._getPointsAtTime(this._points, time);
        if (null !== this._points[0]) {
          this._lastPoints[0] = this._points[0];
          this._lastPoints[1] = this._points[1];
        }
        if (null !== this._lastPoints[0]) {
          if (null !== this._lastPoints[1]) {
            const fraction = PioneerPublicApi.MathUtils.clamp01((time - this._lastPoints[0].time) / (this._lastPoints[1].time - this._lastPoints[0].time));
            return PioneerPublicApi.MathUtils.lerp(this._lastPoints[0].oe.eccentricity, this._lastPoints[1].oe.eccentricity, fraction);
          }
        }
      }
    }
    return Number.NaN;
  }
  getSemiMajorAxis(time) {
    if (this._PointClass === OrbPoint) {
      if (null !== this._pointSet) {
        this._getPointsAtTime(this._points, time);
        if (null !== this._points[0]) {
          this._lastPoints[0] = this._points[0];
          this._lastPoints[1] = this._points[1];
        }
        if (null !== this._lastPoints[0]) {
          if (null !== this._lastPoints[1]) {
            const fraction = PioneerPublicApi.MathUtils.clamp01((time - this._lastPoints[0].time) / (this._lastPoints[1].time - this._lastPoints[0].time));
            return PioneerPublicApi.MathUtils.lerp(this._lastPoints[0].oe.semiMajorAxis, this._lastPoints[1].oe.semiMajorAxis, fraction);
          }
        }
      }
    }
    return Number.NaN;
  }
  getOrbitOrientation(orientationOut, time) {
    if (this._PointClass === OrbPoint) {
      if (null !== this._pointSet) {
        this._getPointsAtTime(this._points, time);
        if (null !== this._points[0]) {
          this._lastPoints[0] = this._points[0];
          this._lastPoints[1] = this._points[1];
        }
        if (null !== this._lastPoints[0]) {
          if (null !== this._lastPoints[1]) {
            const fraction = PioneerPublicApi.MathUtils.clamp01((time - this._lastPoints[0].time) / (this._lastPoints[1].time - this._lastPoints[0].time));
            orientationOut.slerp(this._lastPoints[0].oe.orientation, this._lastPoints[1].oe.orientation, fraction);
          }
        }
      }
    }
  }
  __destroy() {
    for (const downloadUrl of this._currentDownloads) this._downloader.cancel(downloadUrl);
    super.__destroy();
  }
  __updatePositionAtTime(positionOut, time) {
    if (null !== this._pointSet) {
      if ("position" in this._pCalc && this.getCoverage().contains(time)) {
        if (this._pCalc.time !== time) {
          this._getPointsAtTime(this._points, time);
          if (null === this._points[0]) {
            positionOut.copy(PioneerPublicApi.Vector3.NaN);
            return;
          }
          this._pCalc.calculate(this._points, time - this._timeOffset, this._header, this._incremental);
        }
        positionOut.copy(this._pCalc.position);
      }
    } else {
      positionOut.copy(PioneerPublicApi.Vector3.NaN);
    }
  }
  __updateVelocityAtTime(velocityOut, time) {
    if (null !== this._pointSet) {
      if ("velocity" in this._pCalc && this.getCoverage().contains(time)) {
        if (this._pCalc.time !== time) {
          this._getPointsAtTime(this._points, time);
          if (null === this._points[0]) {
            velocityOut.copy(PioneerPublicApi.Vector3.NaN);
            return;
          }
          this._pCalc.calculate(this._points, time - this._timeOffset, this._header, this._incremental);
        }
        velocityOut.copy(this._pCalc.velocity);
      }
    } else {
      velocityOut.copy(PioneerPublicApi.Vector3.NaN);
    }
  }
  __updateOrientationAtTime(orientationOut, time) {
    if (null !== this._pointSet) {
      if ("orientation" in this._pCalc && this.getCoverage().contains(time)) {
        if (this._pCalc.time !== time) {
          this._getPointsAtTime(this._points, time);
          if (null === this._points[0]) {
            orientationOut.copy(PioneerPublicApi.Quaternion.NaN);
            return;
          }
          this._pCalc.calculate(this._points, time - this._timeOffset, this._header, this._incremental);
        }
        orientationOut.copy(this._pCalc.orientation);
      }
    } else {
      orientationOut.copy(PioneerPublicApi.Quaternion.NaN);
    }
  }
  /** 新块尚未可用时继续使用上次样本；根定义缺失时把实体状态设为 NaN。旧样本后备路径允许外推。 */
  __update() {
    const entity = this.getEntity();
    const time = entity.getScene().getEngine().getTime();
    if (null !== this._pointSet) {
      this._pointSet.unloadOldPointSet();
      this._getPointsAtTime(this._points, time);
      if (null !== this._points[0]) {
        this._pCalc.calculate(this._points, time - this._timeOffset, this._header, this._incremental);
        this._pCalc.apply(entity);
        this._lastPoints[0] = this._points[0];
        this._lastPoints[1] = this._points[1];
      } else if (null !== this._lastPoints[0] && null !== this._lastPoints[1]) {
        this._pCalc.calculate(this._lastPoints, time - this._timeOffset, this._header, this._incremental);
        this._pCalc.apply(entity);
      }
    } else {
      this.getEntity().setPosition(PioneerPublicApi.Vector3.NaN);
      this.getEntity().setVelocity(PioneerPublicApi.Vector3.NaN);
      this.getEntity().setOrientation(PioneerPublicApi.Quaternion.NaN);
      this.getEntity().setAngularVelocity(PioneerPublicApi.Vector3.NaN);
    }
  }
  /** 定义头只接受版本 1/2 与五种已知样本类型；v2 另含文件名补零位数，orb 类型另含两个引力参数。 */
  async _loadDef() {
    const definitionUrl = `${this._baseUrl}/def.dyn`;
    let downloadResult;
    this._currentDownloads.add(definitionUrl);
    try {
      downloadResult = await this._downloader.download(definitionUrl, "binary", -this.getEntity().getLeastCameraDepth());
    } catch (definitionUrl) {
      if (definitionUrl instanceof PioneerPublicApi.CanceledError) {
        return;
      }
      throw definitionUrl;
    } finally {
      this._currentDownloads.delete(definitionUrl);
    }
    try {
      const reader = new PioneerPublicApi.Reader(downloadResult.content);
      this._version = reader.readInt16();
      if (1 !== this._version && 2 !== this._version) {
        throw new Error(`${definitionUrl} is not Dynamo version 1 or 2`);
      }
      const pointType = reader.readString();
      if ("pos" === pointType) {
        this._PointClass = PosPoint;
      } else if ("lin" === pointType) {
        this._PointClass = LinPoint;
      } else if ("ori" === pointType) {
        this._PointClass = OriPoint;
      } else if ("quat" === pointType) {
        this._PointClass = QuatPoint;
      } else {
        if ("orb" !== pointType) {
          throw new Error(`${definitionUrl} does not have valid Dynamo type`);
        }
        this._PointClass = OrbPoint;
      }
      this._pointType = pointType;
      this._pCalc = new this._PointClass();
      if (this._PointClass === PosPoint || this._PointClass === LinPoint || this._PointClass === OrbPoint) {
        this.addModifiedState("position");
        this.addModifiedState("velocity");
        this.removeModifiedState("orientation");
        this.removeModifiedState("angularVelocity");
      } else if (!(this._PointClass !== OriPoint && this._PointClass !== QuatPoint)) {
        this.addModifiedState("orientation");
        this.addModifiedState("angularVelocity");
        this.removeModifiedState("position");
        this.removeModifiedState("velocity");
      }
      if (2 === this._version) {
        this._numberOfDigits = reader.readByte();
      }
      this._header = Object.assign(this._header, this._PointClass.readHeader(reader));
      this._pointSet = new PointSet(this._PointClass, this._version, this._numberOfDigits, "def");
      this._pointSet.load(reader);
      const effectiveCoverage = PioneerPublicApi.Interval.pool.get();
      effectiveCoverage.intersection(this._userCoverage, this._pointSet.getInterval());
      effectiveCoverage.min += this._timeOffset;
      effectiveCoverage.max += this._timeOffset;
      super.setCoverage(effectiveCoverage);
      PioneerPublicApi.Interval.pool.release(effectiveCoverage);
    } catch (downloadResult) {
      throw new Error(`While reading ${definitionUrl}: ${downloadResult instanceof Error ? downloadResult.message : "unknown error"}`);
    }
  }
  /** 逐层进入查询时间对应的块；缺块仅启动下载并清空输出，失败块触发根定义重载。 */
  _getPointsAtTime(samplesOut, time) {
    let pointSet = this._pointSet;
    for (; null !== pointSet;) {
      if (pointSet.hasPoints()) {
        pointSet.getPoints(samplesOut, time - this._timeOffset);
        return;
      }
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
      pointSet = pointSet.getPointSet(time - this._timeOffset);
    }
    samplesOut[0] = null;
    samplesOut[1] = null;
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
