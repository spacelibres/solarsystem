/** @eyes-analysis
 * 文件职责：管理距离/光行时面板所需的实体选择与距离计算。
 * 依据：import ../../framework/eyes/index.js；import ../pioneer/index.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1673136-1697979.
import * as Eyes from "../../framework/eyes/index.js";
import * as Pioneer from "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
import * as animateFill from "../../vendor/modules/animateFill-929.js";
const {
  formatNumber: formatNumber,
  conversionTable: conversionTable,
  throttle: throttle
} = Eyes.AppUtils;
const h = "center";
const d = "surface";
const u = h;
const p = "metric";
const _ = "imperial";
const currentUnitSystem = p;
/** @eyes-analysis
 * 类职责：管理距离/光行时面板所需的实体选择与距离计算。
 * 继承：Eyes.BaseManager；导出：DistanceManager。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class DistanceManager extends Eyes.BaseManager {
  /** @eyes-analysis
   * 【结构证据】写入 `_allowPlay`、`_allowRaycasting`、`_areClose`、`_areRelated`、`_bpAnimation`、`_bpParentIsSource`、`_currBetweenOffset`、`_currentSecond`；调用 `super`、`this.bindFunctions`、`throttle`。
   * 状态写入：_allowPlay、_allowRaycasting、_areClose、_areRelated、_bpAnimation、_bpParentIsSource、_currBetweenOffset、_currentSecond等；完整记录见索引。
   * 调用线索：super、this.bindFunctions、throttle。
   */
  constructor(t) {
    super(t);
    this._sourceDistanceEntity = null;
    this._targetDistanceEntities = [];
    this.hasTarget = null;
    this._areRelated = null;
    this._areClose = null;
    this._currentSecond = null;
    this.distanceInfo = {
      centerValue: null,
      measuredValue: null,
      sourceTargetDiff: null
    };
    this._allowRaycasting = null;
    this._allowPlay = null;
    this._prevValues = {
      weights: {},
      occRadii: {}
    };
    this._currentUnitSystem = currentUnitSystem;
    this.errorResultTimeout = null;
    this._vectors = {};
    this._uValueCurrent = null;
    this._uValueHold = null;
    this.intersect = null;
    this._bpAnimation = null;
    this._bpParentIsSource = null;
    this._currBetweenOffset = {};
    this._isTransitioning = null;
    this._isBelowZero = null;
    this._tooltipOpts = {
      contentSuffix: "the line to adjust the camera's orbit center",
      height: null,
      isTouch: null,
      instance: null
    };
    this._isWaitingForEntities = null;
    this.distancePanel = null;
    this.pionerEl = null;
    this.bindFunctions(["update", "on3dLineMouseMove", "on3dLineClick", "showTooltip", "hideTooltip"]);
    this._on3dLineMouseMoveThrottled = throttle(this.on3dLineMouseMove, 200, {
      leading: true,
      trailing: true
    });
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_betweenPosEntity`、`_bpController`、`distancePanel`、`pionerEl`；调用 `document.getElementById`、`this._betweenPosEntity.addController`、`this._createBetweenEntity`、`this._grabVectors`、`this.addEvents`、`this.app.getComponent`。
   * 状态写入：_betweenPosEntity、_bpController、distancePanel、pionerEl。
   * 调用线索：document.getElementById、this._betweenPosEntity.addController、this._createBetweenEntity、this._grabVectors、this.addEvents等。
   */
  init() {
    this._betweenPosEntity ??= this._createBetweenEntity();
    this._bpController ??= this._betweenPosEntity.addController(SolarSystemSceneExports.PositionSumController, "bp_position_sum");
    this.distancePanel ??= this.app.getComponent("distancePanel");
    this.pionerEl ??= document.getElementById("pioneer");
    this._grabVectors();
    this.addEvents();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._releaseVectors`、`this.removeEvents`、`this.resetAllDistanceEntities`、`this.resetUValue`、`this.setBetweenPosHidden`。
   * 调用线索：this._releaseVectors、this.removeEvents、this.resetAllDistanceEntities、this.resetUValue、this.setBetweenPosHidden。
   */
  deinit() {
    this.resetAllDistanceEntities();
    this.resetUValue();
    this._releaseVectors();
    this.removeEvents();
    this.setBetweenPosHidden(true);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `layerManager.getLayer`、`layerManager.toggleLayer`、`this.app.getManager`。
   * 调用线索：layerManager.getLayer、layerManager.toggleLayer、this.app.getManager。
   */
  hideSpacecraftLayer() {
    const layerManager = this.app.getManager("layer");
    const {
      visible: visible
    } = layerManager.getLayer("spacecraft");
    visible && layerManager.toggleLayer("spacecraft");
  }
  /** @eyes-analysis
   * 【结构证据】调用 `layerManager.getLayer`、`layerManager.toggleLayer`、`this.app.getManager`。
   * 调用线索：layerManager.getLayer、layerManager.toggleLayer、this.app.getManager。
   */
  showSpacecraftLayer() {
    const layerManager = this.app.getManager("layer");
    const {
      visible: visible
    } = layerManager.getLayer("spacecraft");
    !visible && layerManager.toggleLayer("spacecraft");
  }
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   * 调用线索：this.pionerEl?.addEventListener。
   */
  addEvents() {
    const {
      canHover: canHover
    } = this.app;
    this.pionerEl?.addEventListener("click", this.on3dLineClick);
    canHover && this.pionerEl?.addEventListener("mousemove", this._on3dLineMouseMoveThrottled);
  }
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   * 调用线索：this.pionerEl?.removeEventListener。
   */
  removeEvents() {
    this.pionerEl?.removeEventListener("click", this.on3dLineClick);
    this.pionerEl?.removeEventListener("mousemove", this._on3dLineMouseMoveThrottled);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.addEvents`、`this.removeEvents`。
   * 调用线索：this.addEvents、this.removeEvents。
   */
  resetEvents() {
    this.removeEvents();
    this.addEvents();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_tooltipOpts.height`、`_tooltipOpts.instance`、`_tooltipOpts.isTouch`；返回 `void`；调用 `0,animateFill.default`、`instance.setProps`、`this._betweenPosEntity.getComponent`、`this._betweenPosEntity.getComponent(Pioneer.DivComponent).getDiv`。
   * 状态写入：_tooltipOpts.height、_tooltipOpts.instance、_tooltipOpts.isTouch。
   * 调用线索：0,animateFill.default、instance.setProps、this._betweenPosEntity.getComponent、this._betweenPosEntity.getComponent(Pioneer.DivComponent).getDiv。
   */
  _updateTooltip() {
    const {
      contentSuffix: contentSuffix,
      height: height,
      isTouch: isTouch,
      instance: instance
    } = this._tooltipOpts;
    const o = window.innerHeight;
    const {
      isTouch: a
    } = this.app;
    if (o === height && a === isTouch) return;
    const l = {
      content: `${a ? "Tap" : "Click"} ${contentSuffix}`,
      placement: o > 640 ? "top" : "right",
      arrow: !a,
      hideOnClick: !a || "toggle",
      delay: [1e3, null]
    };
    if (instance) instance.setProps(l);else {
      const t = this._betweenPosEntity.getComponent(Pioneer.DivComponent).getDiv()?.firstChild;
      this._tooltipOpts.instance = (0, animateFill.default)(t, l);
    }
    this._tooltipOpts.height = o;
    this._tooltipOpts.isTouch = a;
  }
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   * 调用线索：instance?.show。
   */
  showTooltip() {
    const {
      instance: instance
    } = this._tooltipOpts;
    instance?.show();
  }
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   * 调用线索：instance?.hide。
   */
  hideTooltip() {
    const {
      instance: instance
    } = this._tooltipOpts;
    instance?.hide();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `intersect`；返回 `void` 或 `void(this.intersect=null)`；调用 `Boolean`、`i.getNormalSpacePositionFromCameraSpacePosition`、`i.getViewport`、`i.getViewport().getPixelSpacePositionFromNormalSpacePosition`、`this.app.getManager`、`this.app.getManager("time").getTimeRate`。
   * 状态写入：intersect。
   * 调用线索：Boolean、i.getNormalSpacePositionFromCameraSpacePosition、i.getViewport、i.getViewport().getPixelSpacePositionFromNormalSpacePosition、this._betweenPosEntity?.getPixelSpacePosition等。
   */
  on3dLineMouseMove(t) {
    if (this._isTransitioning) return;
    const {
      buttons: e = 0
    } = t || {};
    if (0 !== e) return void (this.intersect = null);
    const i = this.app.pioneer.getInput().getActiveViewport().getCamera();
    const intersect = this.calcIntersect();
    const n = null === this.intersect && intersect || this.intersect && null === intersect;
    if (this.intersect = intersect, n && this.setBetweenIntersectClass(Boolean(this.intersect)), null === this.intersect) {
      n && this.playTime();
      return void this.distancePanel.setLineGraphicDotOffset(null);
    }
    const o = 1 === this.app.getManager("time").getTimeRate();
    n && !o && this.pauseTime();
    const {
      normalSpacePoint: normalSpacePoint,
      pixelSpacePoint: pixelSpacePoint
    } = this._vectors;
    i.getNormalSpacePositionFromCameraSpacePosition(normalSpacePoint, this.intersect.linePoint);
    i.getViewport().getPixelSpacePositionFromNormalSpacePosition(pixelSpacePoint, normalSpacePoint);
    const {
      x: l = 0,
      y: c = 0
    } = this._betweenPosEntity?.getPixelSpacePosition(i) || {};
    const h = pixelSpacePoint.x - l;
    const d = pixelSpacePoint.y - c;
    this.setBetweenOffsetVars(h, d);
    const u = this.getInterpolationU(this.intersect.u);
    this.distancePanel.setLineGraphicDotOffset(u);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._bpParentIsSource?n:1-n`；调用 `this.getLimitedU`。
   * 调用线索：this.getLimitedU。
   */
  getInterpolationU(t) {
    const {
      limitedU: limitedU,
      minSurfaceU: minSurfaceU,
      maxSurfaceU: maxSurfaceU
    } = this.getLimitedU(t);
    const n = (limitedU - minSurfaceU) / (maxSurfaceU - minSurfaceU);
    return this._bpParentIsSource ? n : 1 - n;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `.5!==t?limitedU:minSurfaceU+(maxSurfaceU-minSurfaceU)*t`；调用 `this.getLimitedU`。
   * 调用线索：this.getLimitedU。
   */
  getOffsetU(t) {
    const e = this._bpParentIsSource ? t : 1 - t;
    const {
      limitedU: limitedU,
      minSurfaceU: minSurfaceU,
      maxSurfaceU: maxSurfaceU
    } = this.getLimitedU(e);
    return .5 !== t ? limitedU : minSurfaceU + (maxSurfaceU - minSurfaceU) * t;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `intersect`；返回 `void`；调用 `Math.abs`、`Math.max`、`Math.pow`、`parseFloat`、`t.toFixed`、`this.calcIntersect`。
   * 状态写入：intersect。
   * 调用线索：Math.abs、Math.max、Math.pow、parseFloat、t.toFixed等。
   */
  on3dLineClick(t, e) {
    if (this.app.canHover || (this.intersect = this.calcIntersect()), null === this.intersect && void 0 === e) return;
    const uValueCurrent = this._uValueCurrent;
    const {
      limitedU: limitedU
    } = this.getLimitedU(e ?? this.intersect.u);
    const {
      x: n,
      y: o
    } = this._currBetweenOffset;
    if (this.valuesWithPrecisionAreEqual(uValueCurrent, limitedU)) return;
    const r = void 0 !== e && Math.abs(uValueCurrent - e) > .8;
    this.setHoldU(null);
    this.setIsTransitioning(true);
    this.setBetweenPosHidden(true);
    const a = this.camToBetweenPos({
      targetU: limitedU,
      duration: 1
    });
    this.setBpAnimation({
      initialU: uValueCurrent,
      targetU: limitedU,
      duration: 1,
      onUpdate: (t, e) => {
        const i = Math.max(1 - t, 0);
        const s = n * i;
        const a = o * i;
        if (this.setBetweenOffsetVars(s, a), r) {
          const t = Math.pow(2 * Math.abs(e - .5), 12);
          const i = parseFloat(t.toFixed(2));
          this._distanceLine?.setOpacity(i);
        }
      },
      onEnd: async () => {
        await a;
        limitedU > .5 && this.toggleBetweenParent(limitedU);
        this.setIsTransitioning(false);
        this.setBetweenPosHidden(false);
        this.setBetweenIntersectClass(false);
        this.playTime();
      }
    });
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `this.getLimitedU`、`this.setBpAnimation`、`this.setHoldU`、`this.setIsTransitioning`、`this.toggleBetweenParent`。
   * 调用线索：this.getLimitedU、this.setBpAnimation、this.setHoldU、this.setIsTransitioning、this.toggleBetweenParent。
   */
  onNewULimit() {
    const t = this._uValueCurrent ?? 0;
    const {
      limitedU: limitedU
    } = this.getLimitedU(t);
    if (t === limitedU) return;
    this.setIsTransitioning(true);
    this.setBpAnimation({
      initialU: t,
      targetU: limitedU,
      duration: .3,
      onEnd: async () => {
        limitedU > .5 && this.toggleBetweenParent(limitedU);
        0 !== t && 1 !== t || this.setHoldU(t);
        this.setIsTransitioning(false);
      }
    });
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `L.lerp`、`Math.abs`、`Math.max`、`Math.min`、`O.copy`、`O.neg`。
   * 调用线索：L.lerp、Math.abs、Math.max、Math.min、O.copy等。
   */
  async camToBetweenPos({
    targetU: targetU,
    duration: e = 1.5,
    force: i = false
  } = {}) {
    const {
      entity: entity,
      measurePoint: measurePoint
    } = this.sourceDistanceEntity || {};
    const {
      entity: r,
      measurePoint: a
    } = this.targetDistanceEntities[0] || {};
    const {
      sourceTargetDiff: sourceTargetDiff
    } = this.distanceInfo;
    if (null === sourceTargetDiff) return;
    const c = this._bpParentIsSource ? entity : r;
    const h = this._bpParentIsSource ? r : entity;
    const d = this._bpParentIsSource ? measurePoint : a;
    const u = this._bpParentIsSource ? a : measurePoint;
    const p = null !== this._uValueHold ? this.getOffsetU(this._uValueHold) : null;
    const _ = this._bpParentIsSource ? 0 : 1;
    const m = p ?? this._uValueCurrent ?? _;
    const {
      limitedU: limitedU,
      minRadiusU: minRadiusU,
      maxRadiusU: maxRadiusU
    } = this.getLimitedU(m);
    const T = targetU ?? limitedU;
    const cameraManager = this.app.getManager("camera");
    const E = 4 * this.centerDistance;
    const S = 20 * (T > .5 ? u.radius : d.radius);
    const v = S + (E - S) * (-2 * Math.abs(T - .5) + 1);
    const C = cameraManager.cameraEntity.getPosition().magnitude();
    const x = Math.abs(C - v);
    const I = S;
    const w = Math.abs(T - m);
    if (!i && !(x > I || w > .1)) return;
    const A = -168 * T - 6;
    const vector3 = new Pioneer.Vector3();
    const N = new Pioneer.Vector3();
    const L = new Pioneer.Vector3();
    const V = new Pioneer.Vector3();
    const R = new Pioneer.Vector3();
    R.copy(sourceTargetDiff);
    R.neg(R);
    R.normalize(R);
    R.mult(R, v);
    c.getOrientation().getAxis(vector3, 2);
    h.getOrientation().getAxis(N, 2);
    L.lerp(vector3, N, T);
    V.cross(R, L);
    V.normalize(V);
    const P = window.innerHeight > 640 ? V : L;
    const quaternion = new Pioneer.Quaternion();
    quaternion.setFromAxisAngle(P, Pioneer.MathUtils.degToRad(A));
    R.rotate(quaternion, R);
    const O = new Pioneer.Vector3();
    this._bpParentIsSource ? O.neg(sourceTargetDiff) : O.copy(sourceTargetDiff);
    O.normalize(O);
    const F = this.app.cameraScripts._easeInOutExpoTransition;
    let U = 1;
    T < minRadiusU || T > maxRadiusU ? U = 0 : T < .1 ? U = (T - minRadiusU) / (.1 - minRadiusU) : T > .9 && (U = (T - .9) / (maxRadiusU - .9));
    U = Math.max(U, 0);
    const D = 2.5 + 17.5 * U;
    let j = (d.radius + (u.radius - d.radius) * T) * D;
    const z = Math.max(d.radius, u.radius);
    const B = Math.min(d.radius, u.radius);
    const H = .1 * this.measuredDistance;
    this.centerDistance < 20 * z ? j = 2.5 * B : 1 === U && j < H && (j = H);
    const $ = Math.max(z, 50 * Math.abs(this.centerDistance));
    const interval = new Pioneer.Interval(j, $);
    await cameraManager.goToBetweenPos?.(this._betweenPosEntity, {
      destination: R,
      destinationUp: O,
      transitionFunction: F,
      duration: e,
      zoomInterval: interval
    });
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_bpAnimation`；调用 `Date.now`。
   * 状态写入：_bpAnimation。
   * 调用线索：Date.now。
   */
  setBpAnimation({
    initialU: initialU,
    targetU: targetU,
    onUpdate: onUpdate,
    onEnd: onEnd,
    duration: n = 1.5
  }) {
    this._bpAnimation = {
      duration: 1e3 * n,
      startTime: Date.now(),
      initialU: initialU,
      targetU: targetU,
      onUpdate: onUpdate,
      onEnd: onEnd
    };
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_bpAnimation`；调用 `Date.now`、`Math.pow`、`onEnd`、`onUpdate`、`this.updateBetweenPoint`。
   * 状态写入：_bpAnimation。
   * 调用线索：Date.now、Math.pow、onEnd、onUpdate、this.updateBetweenPoint。
   */
  _updateBpAnimation() {
    const {
      duration: duration,
      startTime: startTime,
      initialU: initialU,
      targetU: targetU,
      onUpdate: onUpdate,
      onEnd: onEnd
    } = this._bpAnimation;
    const r = Date.now() - startTime;
    let a = r > duration ? 1 : r / duration;
    const l = a;
    if (1 !== a) {
      const t = 4;
      a = ((a *= 2) <= 1 ? Math.pow(a, t) : 2 - Math.pow(2 - a, t)) / 2;
    }
    "function" == typeof onUpdate && onUpdate(a, l);
    const c = initialU + (targetU - initialU) * a;
    this.updateBetweenPoint(c, false);
    1 === a && ("function" == typeof onEnd && onEnd(), this._bpAnimation = null);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.app.getComponent`、`this.app.getManager`、`this.setAllowPlay`、`timeControlsComponent.playPauseRate`、`timeManager.getTimeRate`、`timeManager.pause`。
   * 调用线索：this.app.getComponent、this.app.getManager、this.setAllowPlay、timeControlsComponent.playPauseRate、timeManager.getTimeRate等。
   */
  pauseTime() {
    const timeControlsComponent = this.app.getComponent("timeControls");
    const timeManager = this.app.getManager("time");
    const i = 0 === timeManager.getTimeRate();
    this.setAllowPlay(!i);
    i || (timeControlsComponent._canUpdate ? timeControlsComponent.playPauseRate(null, true) : timeManager.pause());
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `this.app.getComponent`、`this.app.getManager`、`timeControlsComponent.playPauseRate`、`timeManager.getTimeRate`、`timeManager.play`。
   * 调用线索：this.app.getComponent、this.app.getManager、timeControlsComponent.playPauseRate、timeManager.getTimeRate、timeManager.play。
   */
  playTime() {
    const timeManager = this.app.getManager("time");
    const e = 0 !== timeManager.getTimeRate();
    if (!this._allowPlay || e) return;
    const timeControlsComponent = this.app.getComponent("timeControls");
    timeControlsComponent._canUpdate ? timeControlsComponent.playPauseRate(null, false) : timeManager.play();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.app.getManager`。
   * 调用线索：this.app.getManager、this.app.getManager("router")?.navigate。
   */
  swapSourceAndTarget() {
    const {
      id: id
    } = this.sourceDistanceEntity;
    const {
      id: e
    } = this.targetDistanceEntities[0];
    const i = `${e}/distance`;
    const s = {
      to: id
    };
    this.app.getManager("router")?.navigate(s, i, {
      keepTime: true
    });
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_currBetweenOffset`；返回 `void`；调用 `o.style.setProperty`。
   * 状态写入：_currBetweenOffset。
   * 调用线索：o.style.setProperty、this._betweenPosEntity?.getComponent、this._betweenPosEntity?.getComponent(Pioneer.DivComponent)?.getDiv。
   */
  setBetweenOffsetVars(t, e) {
    const {
      x: i,
      y: s
    } = this._currBetweenOffset;
    if (t === i && e === s) return;
    this._currBetweenOffset = {
      x: t,
      y: e
    };
    const o = this._betweenPosEntity?.getComponent(Pioneer.DivComponent)?.getDiv();
    o.style.setProperty("--icon-offset-x", `${t}px`);
    o.style.setProperty("--icon-offset-y", `${e}px`);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `r`；调用 `Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`i.copy`、`i.magnitude`、`i.neg`、`i.rotateInverse`。
   * 调用线索：Pioneer.Vector3.pool.get、Pioneer.Vector3.pool.release、i.copy、i.magnitude、i.neg等。
   */
  getAccurateRadius(t, e = false) {
    const i = Pioneer.Vector3.pool.get();
    const s = Pioneer.Vector3.pool.get();
    e ? i.neg(this.distanceInfo.sourceTargetDiff) : i.copy(this.distanceInfo.sourceTargetDiff);
    i.rotateInverse(t.getOrientation(), i);
    let o = false;
    for (let e = t.getNumComponents() - 1; e >= 0; e--) {
      const n = t.getComponentAt(e);
      if (void 0 !== n.getGroundPosition) {
        n.getGroundPosition(i, s, i);
        o = true;
        break;
      }
    }
    const r = o ? i.magnitude() : null;
    Pioneer.Vector3.pool.release(i);
    Pioneer.Vector3.pool.release(s);
    return r;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_isBelowZero`、`distanceInfo.measuredValue`、`sourceDistanceEntity.measurePoint.radius`、`targetDistanceEntities[0].measurePoint.radius`；返回 `null` 或 `this._getDistanceParams(this.measuredDistance)`；调用 `this._distanceLine.setRenderingEnabled`、`this._getDistanceParams`、`this.calcMPPositions`、`this.distanceIsValid`、`this.distancePanel.setSourceMpState`、`this.distancePanel.setTargetMpState`。
   * 状态写入：_isBelowZero、distanceInfo.measuredValue、sourceDistanceEntity.measurePoint.radius、targetDistanceEntities[0].measurePoint.radius。
   * 调用线索：this._distanceLine.setRenderingEnabled、this._distanceLine?.setDistanceProps、this._distanceLine?.setSourceMeasurePoint、this._distanceLine?.setTargetMeasurePoint、this._getDistanceParams等。
   */
  measureDistance(t = false, e = void 0) {
    const {
      entity: entity,
      measurePoint: measurePoint
    } = this.sourceDistanceEntity || {};
    const {
      entity: n,
      measurePoint: o
    } = this.targetDistanceEntities[0] || {};
    if (!entity || !n) return null;
    if (this.setDistanceInfo(e), !this.distanceIsValid(this.centerDistance)) return null;
    const r = measurePoint.radius > .01 && measurePoint.radius / this.centerDistance > .001;
    const a = o.radius > .01 && o.radius / this.centerDistance > .001;
    const l = this.setMPAdjustable(this.sourceDistanceEntity, r);
    const c = this.setMPAdjustable(this.targetDistanceEntities[0], a);
    const {
      sourceMpPosChanged: sourceMpPosChanged,
      targetMpPosChanged: targetMpPosChanged
    } = this.calcMPPositions();
    let p = false;
    if (t || l || sourceMpPosChanged) {
      const {
        position: position
      } = this.sourceDistanceEntity.measurePoint;
      this.distancePanel.setSourceMpState(r && position);
      p = true;
      this._distanceLine?.setSourceMeasurePoint(r && position);
    }
    if (t || c || targetMpPosChanged) {
      const {
        position: position
      } = this.targetDistanceEntities[0].measurePoint;
      this.distancePanel.setTargetMpState(a && position);
      p = true;
      this._distanceLine?.setTargetMeasurePoint(a && position);
    }
    const _ = measurePoint.adjustable && measurePoint.position === d;
    const m = o.adjustable && o.position === d;
    if (_) {
      const t = this.getAccurateRadius(entity);
      t && (this.sourceDistanceEntity.measurePoint.radius = t);
      this.distanceInfo.measuredValue -= measurePoint.radius;
    }
    if (m) {
      const t = this.getAccurateRadius(n, true);
      t && (this.targetDistanceEntities[0].measurePoint.radius = t);
      this.distanceInfo.measuredValue -= o.radius;
    }
    if (p && this.onNewULimit(), this._distanceLine?.setDistanceProps({
      distance: this.centerDistance,
      sourceRadius: measurePoint.radius,
      targetRadius: o.radius
    }), !this.distanceIsValid(this.measuredDistance)) return null;
    const isBelowZero = this.measuredDistance < 0;
    this._isBelowZero !== isBelowZero && (this.setBetweenPosHidden(isBelowZero), this._distanceLine.setRenderingEnabled(!isBelowZero), this._isBelowZero = isBelowZero);
    return this._getDistanceParams(this.measuredDistance);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `{prefix:d,value:h,scale:u,unit:p,dps:g.length>1&&g[1].length>1?2:1,actualDistanceValue:m}`；调用 `Math.max`、`h.toPrecision`、`h.toPrecision(4).split`。
   * 调用线索：Math.max、h.toPrecision、h.toPrecision(4).split。
   */
  _getDistanceParams(t) {
    const e = this._currentUnitSystem === _;
    const i = 9460730472580.8;
    const s = 1e9;
    const n = 1e6;
    const {
      kmToMi: kmToMi,
      miToFt: miToFt,
      kmToM: kmToM
    } = conversionTable;
    let c = e ? t * kmToMi : t;
    c = Math.max(0, c);
    let h = c;
    let d = "";
    let u = "";
    let p = e ? "mi" : "km";
    const m = c;
    t >= i ? (h = t / i, p = "light years") : c >= s ? (h = c / s, u = "billion") : c >= n ? (h = c / n, u = "million") : c >= 1e3 ? (h = c / 1e3, u = "thousand") : c < 1 && (d = "~ ", h = e ? c * miToFt : c * kmToM, p = e ? "ft" : "m");
    const g = h.toPrecision(4).split(".");
    return {
      prefix: d,
      value: h,
      scale: u,
      unit: p,
      dps: g.length > 1 && g[1].length > 1 ? 2 : 1,
      actualDistanceValue: m
    };
  }
  /** @eyes-analysis
   * 【结构证据】返回 `null` 或 `o`；调用 `Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`entity.getVelocityRelativeToEntity`、`s.magnitude`、`this._getDistanceParams`。
   * 调用线索：Pioneer.Vector3.pool.get、Pioneer.Vector3.pool.release、entity.getVelocityRelativeToEntity、s.magnitude、this._getDistanceParams。
   */
  measureRelativeVelocity(t) {
    const {
      entity: entity
    } = this.sourceDistanceEntity || {};
    const {
      entity: i
    } = this.targetDistanceEntities[0] || {};
    if (!entity || !i) return null;
    const s = Pioneer.Vector3.pool.get();
    entity.getVelocityRelativeToEntity(s, Pioneer.Vector3.Zero, i, t);
    const o = this._getDistanceParams(3600 * s.magnitude());
    o.unit += "/hr";
    Pioneer.Vector3.pool.release(s);
    return o;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `{id:t,entity:i,info:e,measurePoint:s}`；调用 `Error`、`i.getExtentsRadius`、`this.app.getManager`、`this.app.getManager("content").getEntityInfo`、`this.app.scene.getEntity`；含显式错误分支。
   * 调用线索：Error、i.getExtentsRadius、this.app.getManager、this.app.getManager("content").getEntityInfo、this.app.scene.getEntity。
   */
  _createDistanceEntity(t) {
    const e = this.app.getManager("content").getEntityInfo(t);
    const i = this.app.scene.getEntity(t);
    if (null === e || !i) throw Error(`DistanceView._createDistanceEntity: Cannot find entity ${t}.`);
    const s = {
      adjustable: false,
      position: u,
      radius: i.getExtentsRadius()
    };
    return {
      id: t,
      entity: i,
      info: e,
      measurePoint: s
    };
  }
  /** @eyes-analysis
   * 【结构证据】返回 `i`；调用 `SolarSystemSceneExports.Entity.createFromOptions`、`i.setExtentsRadius`、`i.setOcclusionRadius`、`i.setOrientation`、`i.setPosition`、`labelManager.addLabel`。
   * 调用线索：SolarSystemSceneExports.Entity.createFromOptions、i.setExtentsRadius、i.setOcclusionRadius、i.setOrientation、i.setPosition等。
   */
  _createBetweenEntity() {
    const labelManager = this.app.getManager("label");
    const e = "distance_betweenPos";
    const i = SolarSystemSceneExports.Entity.createFromOptions(e, {
      parents: [],
      label: "~"
    }, this.app.scene);
    i.setPosition(Pioneer.Vector3.Zero);
    i.setOrientation(Pioneer.Quaternion.Identity);
    i.setOcclusionRadius(.001);
    i.setExtentsRadius(.001);
    labelManager.addLabel(i);
    labelManager.setLabelProps({
      getLabelClass: () => "no-select distance-between-pos"
    }, [e]);
    labelManager.setLabelClickable(e, false);
    this.setLabelWeight(e, false, "201");
    return i;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_bpParentIsSource`；调用 `this._betweenPosEntity.setParent`。
   * 状态写入：_bpParentIsSource。
   * 调用线索：this._betweenPosEntity.setParent。
   */
  setBetweenEntityParent(t) {
    this._betweenPosEntity.setParent(t);
    this._bpParentIsSource = t === this.sourceDistanceEntity?.entity;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.setBetweenEntityParent`、`this.setDistanceInfo`、`this.updateBetweenPoint`。
   * 调用线索：this.setBetweenEntityParent、this.setDistanceInfo、this.updateBetweenPoint。
   */
  toggleBetweenParent(t) {
    const {
      entity: entity
    } = this.sourceDistanceEntity || {};
    const {
      entity: i
    } = this.targetDistanceEntities[0] || {};
    const s = this._bpParentIsSource ? i : entity;
    this.setBetweenEntityParent(s);
    this.setDistanceInfo();
    this.updateBetweenPoint(1 - t);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_uValueHold`。
   * 状态写入：_uValueHold。
   */
  setHoldU(uValueHold) {
    this._uValueHold = uValueHold;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_uValueCurrent`；返回 `void`；调用 `this.distancePanel.setLineGraphicDotPos`、`this.getInterpolationU`、`this.getLimitedU`、`this.getOffsetU`、`this.setBpControllerMults`。
   * 状态写入：_uValueCurrent。
   * 调用线索：this.distancePanel.setLineGraphicDotPos、this.getInterpolationU、this.getLimitedU、this.getOffsetU、this.setBpControllerMults。
   */
  updateBetweenPoint(t, e = true) {
    const {
      sourceTargetDiff: sourceTargetDiff
    } = this.distanceInfo;
    if (!this.hasTarget || null === sourceTargetDiff) return;
    const s = null !== this._uValueHold ? this.getOffsetU(this._uValueHold) : null;
    const n = this._bpParentIsSource ? 0 : 1;
    let uValueCurrent = t ?? s ?? this._uValueCurrent ?? n;
    const {
      limitedU: limitedU
    } = this.getLimitedU(uValueCurrent);
    e && (uValueCurrent = limitedU);
    this.setBpControllerMults(uValueCurrent);
    const a = this.getInterpolationU(uValueCurrent);
    this.distancePanel.setLineGraphicDotPos(a);
    this._uValueCurrent !== uValueCurrent && (this._uValueCurrent = uValueCurrent);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._bpController._entities.get`。
   * 调用线索：this._bpController._entities.get。
   */
  setBpControllerMults(t) {
    const {
      id: id
    } = this.sourceDistanceEntity || {};
    const {
      id: i
    } = this.targetDistanceEntities[0] || {};
    const s = 1 - t;
    const n = this._bpParentIsSource ? s : t;
    const o = this._bpParentIsSource ? t : s;
    const r = this._bpController._entities.get(id);
    const a = this._bpController._entities.get(i);
    r && a && (r.mult = n, a.mult = o);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_uValueCurrent`。
   * 状态写入：_uValueCurrent。
   */
  resetUValue() {
    this._uValueCurrent = null;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_areRelated`。
   * 状态写入：_areRelated。
   */
  resetAreRelated() {
    this._areRelated = null;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `distanceInfo`。
   * 状态写入：distanceInfo。
   */
  resetDistanceInfo() {
    this.distanceInfo = {
      centerValue: null,
      measuredValue: null,
      sourceTargetDiff: null
    };
  }
  /** @eyes-analysis
   * 【结构证据】调用 `e.classList.toggle`。
   * 调用线索：e.classList.toggle、this._betweenPosEntity?.getComponent、this._betweenPosEntity?.getComponent(Pioneer.DivComponent).getDiv。
   */
  setBetweenPosHidden(t) {
    const e = this._betweenPosEntity?.getComponent(Pioneer.DivComponent).getDiv();
    e.classList.toggle("hide", t);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_currentUnitSystem`。
   * 状态写入：_currentUnitSystem。
   */
  toggleCurrentUnitSystem() {
    const t = this._currentUnitSystem === p ? _ : p;
    this._currentUnitSystem = t;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `s`。
   */
  setMPPosition(t, e = u) {
    const {
      measurePoint: measurePoint
    } = t || {};
    const s = measurePoint?.position !== e;
    s && (measurePoint.position = e);
    return s;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `s`。
   */
  setMPAdjustable(t, e) {
    const {
      measurePoint: measurePoint
    } = t || {};
    const s = measurePoint?.adjustable !== e;
    s && (measurePoint.adjustable = e);
    return s;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `this.setMPPosition`、`this.updateMeasurement`。
   * 调用线索：this.setMPPosition、this.updateMeasurement。
   */
  toggleSourceMeasurePoint() {
    const {
      adjustable: adjustable,
      position: position
    } = this.sourceDistanceEntity?.measurePoint || {};
    if (!adjustable) return;
    const i = position === h ? d : h;
    this.setMPPosition(this.sourceDistanceEntity, i);
    this.updateMeasurement(null, true);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `this.setMPPosition`、`this.updateMeasurement`。
   * 调用线索：this.setMPPosition、this.updateMeasurement。
   */
  toggleTargetMeasurePoint() {
    const {
      adjustable: adjustable,
      position: position
    } = this.targetDistanceEntities[0]?.measurePoint || {};
    if (!adjustable) return;
    const i = position === h ? d : h;
    this.setMPPosition(this.targetDistanceEntities[0], i);
    this.updateMeasurement(null, true);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_distanceLine`、`_sourceDistanceEntity`；调用 `entity.addComponent`、`this._bpController.addEntity`、`this._createDistanceEntity`、`this.distancePanel.setSourceText`、`this.resetSourceDistanceEntity`、`this.setBetweenEntityParent`。
   * 状态写入：_distanceLine、_sourceDistanceEntity。
   * 调用线索：entity.addComponent、this._bpController.addEntity、this._createDistanceEntity、this.distancePanel.setSourceText、this.distancePanel.targetSearch?.setExcludeResults等。
   */
  setSourceDistanceEntity(t) {
    this.resetSourceDistanceEntity();
    this._sourceDistanceEntity = this._createDistanceEntity(t);
    const {
      entity: entity,
      id: id
    } = this.sourceDistanceEntity || {};
    this._distanceLine = entity && entity.addComponent(Eyes.DistanceLineComponent, "distance_line");
    this.setBetweenEntityParent(entity);
    this.distancePanel.setSourceText(this.sourceDisplayName);
    this.distancePanel.targetSearch?.setExcludeResults([id]);
    this.toggleSourceIconClass("distance-source", true);
    this.setLabelWeight(id);
    entity && this.setOcclusionRadius(entity);
    this._bpController.addEntity(id, 1, 0);
    null === this._uValueHold && this.setHoldU(0);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Boolean`、`t.forEach`、`this._bpController.addEntity`、`this._distanceLine.setTargetEntity`、`this.addTargetDistanceEntity`、`this.distancePanel.setResult`。
   * 调用线索：Boolean、t.forEach、this._bpController.addEntity、this._distanceLine.setTargetEntity、this.addTargetDistanceEntity等。
   */
  setTargetDistanceEntities(t) {
    this.resetTargetDistanceEntities();
    t.forEach(t => this.addTargetDistanceEntity(t));
    const e = Boolean(this.targetDistanceEntities.length);
    if (e) {
      const {
        id: id,
        entity: entity
      } = this.targetDistanceEntities[0] || {};
      const {
        entity: s
      } = this.sourceDistanceEntity || {};
      this.setHasTarget(e);
      this.hideSpacecraftLayer();
      this.setBetweenEntityParent(s);
      this.distancePanel.setTargetText(this.targetDisplayNames[0]);
      this.distancePanel.sourceSearch?.setExcludeResults([id]);
      this.distancePanel.setResult({
        text: ""
      });
      this.toggleTargetIconClass("distance-target", true);
      this.setLabelWeight(id);
      entity && this.setOcclusionRadius(entity);
      this._distanceLine.setTargetEntity(entity);
      this._bpController.addEntity(id, 0, 0);
      null === this._uValueHold && this.setHoldU(0);
    } else this.resetUValue();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `errorResultTimeout`；返回 `new Promise(t=>{this.errorResultTimeout=setTimeout(()=>{this.distancePanel.setResult();t();},3e3);})`；调用 `new Promise`、`setTimeout`、`t`、`this.distancePanel.setResult`。
   * 状态写入：errorResultTimeout。
   * 调用线索：new Promise、setTimeout、t、this.distancePanel.setResult。
   */
  async setTempErrorResult(t) {
    this.distancePanel.setResult({
      text: t
    });
    return new Promise(t => {
      this.errorResultTimeout = setTimeout(() => {
        this.distancePanel.setResult();
        t();
      }, 3e3);
    });
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_prevValues.weights[t]`；返回 `void`；调用 `labelManager.getDefaultWeight`、`labelManager.setWeight`、`this.app.getManager`、`this.app.scene.getEntity`。
   * 状态写入：_prevValues.weights[t]。
   * 调用线索：labelManager.getDefaultWeight、labelManager.setWeight、this.app.getManager、this.app.scene.getEntity。
   */
  setLabelWeight(t, e = false, i) {
    if (!t) return;
    if (null === this.app.scene.getEntity(t)) return;
    const s = i ?? "200";
    const labelManager = this.app.getManager("label");
    const o = labelManager.getDefaultWeight(t);
    0 === o && (labelManager._weights[t] = {});
    e ? this._prevValues.weights[t] && labelManager.setWeight(t, this._prevValues.weights[t]) : (labelManager.setWeight(t, s), this._prevValues.weights[t] = o);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_prevValues.occRadii[i]`；调用 `t.getName`、`t.getOcclusionRadius`、`t.setOcclusionRadius`。
   * 状态写入：_prevValues.occRadii[i]。
   * 调用线索：t.getName、t.getOcclusionRadius、t.setOcclusionRadius。
   */
  setOcclusionRadius(t, e = false) {
    const i = t.getName();
    const s = t.getOcclusionRadius();
    e ? this._prevValues.occRadii[i] && t.setOcclusionRadius(this._prevValues.occRadii[i]) : (t.setOcclusionRadius(0), this._prevValues.occRadii[i] = s);
  }
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   * 调用线索：this._betweenPosEntity?.getComponent、this._betweenPosEntity?.getComponent(Pioneer.DivComponent)?.getDiv、this._betweenPosEntity?.getComponent(Pioneer.DivComponent)?.getDiv()?.classList?.toggle。
   */
  setBetweenIntersectClass(t) {
    this._betweenPosEntity?.getComponent(Pioneer.DivComponent)?.getDiv()?.classList?.toggle("intersect", t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `o.classList.toggle`。
   * 调用线索：entity?.getComponent、o.classList.toggle、s?.getDiv。
   */
  toggleSourceIconClass(t, e) {
    const {
      entity: entity
    } = this.sourceDistanceEntity || {};
    if (!entity) return;
    const s = entity?.getComponent(Pioneer.DivComponent);
    const o = s?.getDiv()?.firstChild;
    o && o.classList.toggle(t, e);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `o.classList.toggle`。
   * 调用线索：entity?.getComponent、o.classList.toggle、s?.getDiv。
   */
  toggleTargetIconClass(t, e) {
    const {
      entity: entity
    } = this.targetDistanceEntities[0] || {};
    if (!entity) return;
    const s = entity?.getComponent(Pioneer.DivComponent);
    const o = s?.getDiv()?.firstChild;
    o && o.classList.toggle(t, e);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_areClose`、`_areRelated`；返回 `void` 或 `h`；调用 `this.setMPPosition`。
   * 状态写入：_areClose、_areRelated。
   * 调用线索：entity?.getParent、entity?.getParent()?.getName、n?.getParent、n?.getParent()?.getName、this.setMPPosition。
   */
  calcMPPositions() {
    if (!this.hasTarget) return;
    const {
      id: id,
      entity: entity,
      measurePoint: measurePoint
    } = this.sourceDistanceEntity || {};
    const {
      id: s,
      entity: n,
      measurePoint: o
    } = this.targetDistanceEntities[0] || {};
    const areRelated = entity?.getParent()?.getName() === s || n?.getParent()?.getName() === id;
    const a = this._areRelated !== areRelated;
    const areClose = measurePoint.radius / this.measuredDistance < .01 || o.radius / this.measuredDistance < .01;
    const c = this._areClose !== areClose;
    const h = {
      sourceMpPosChanged: false,
      targetMpPosChanged: false
    };
    if (a || c) {
      const t = measurePoint.adjustable && (areRelated || areClose);
      const e = o.adjustable && (areRelated || areClose);
      const s = t ? d : u;
      const n = e ? d : u;
      h.sourceMpPosChanged = this.setMPPosition(this.sourceDistanceEntity, s);
      h.targetMpPosChanged = this.setMPPosition(this.targetDistanceEntities[0], n);
      this._areRelated = areRelated;
      this._areClose = areClose;
    }
    return h;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_sourceDistanceEntity`；调用 `entity.removeComponent`、`this._bpController.removeEntity`、`this.distancePanel.setSourceMpState`、`this.distancePanel.setSourceText`、`this.resetAreRelated`、`this.resetDistanceInfo`。
   * 状态写入：_sourceDistanceEntity。
   * 调用线索：entity.removeComponent、this._bpController.removeEntity、this.distancePanel.setSourceMpState、this.distancePanel.setSourceText、this.distancePanel.targetSearch?.setExcludeResults等。
   */
  resetSourceDistanceEntity() {
    const {
      entity: entity,
      id: id
    } = this.sourceDistanceEntity || {};
    entity && entity.removeComponent("distance_line");
    this.resetAreRelated();
    1 === this._uValueHold && this.setHoldU(null);
    this._bpController.removeEntity(id);
    this.toggleSourceIconClass("distance-source", false);
    this.setLabelWeight(id, true);
    entity && this.setOcclusionRadius(entity, true);
    this._sourceDistanceEntity = null;
    this.distancePanel.setSourceText("");
    this.distancePanel.setSourceMpState("");
    this.distancePanel.targetSearch?.setExcludeResults([]);
    this.resetDistanceInfo();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `console.error`、`this._createDistanceEntity`、`this._targetDistanceEntities.push`、`this.targetDistanceEntities.find`。
   * 调用线索：console.error、this._createDistanceEntity、this._targetDistanceEntities.push、this.targetDistanceEntities.find。
   */
  addTargetDistanceEntity(t) {
    this.targetDistanceEntities.find(({
      id: id
    }) => id === t) && console.error(`DistanceManager.addTargetDistanceEntity: The entity, '${t}', is already a target.`);
    const e = this._createDistanceEntity(t);
    this._targetDistanceEntities.push(e);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_targetDistanceEntities`；调用 `this._bpController.removeEntity`、`this.distancePanel.setResult`、`this.distancePanel.setSourceMpState`、`this.distancePanel.setTargetMpState`、`this.distancePanel.setTargetText`、`this.resetAreRelated`。
   * 状态写入：_targetDistanceEntities。
   * 调用线索：this._bpController.removeEntity、this._distanceLine?.setTargetEntity、this.distancePanel.setResult、this.distancePanel.setSourceMpState、this.distancePanel.setTargetMpState等。
   */
  resetTargetDistanceEntities() {
    const {
      entity: entity,
      id: id
    } = this._targetDistanceEntities[0] || {};
    this.resetAreRelated();
    1 === this._uValueHold && this.setHoldU(null);
    this._bpController.removeEntity(id);
    this.toggleTargetIconClass("distance-target", false);
    this.setLabelWeight(id, true);
    entity && this.setOcclusionRadius(entity, true);
    this._targetDistanceEntities = [];
    this.setHasTarget(false);
    this.distancePanel.setTargetText("");
    this.distancePanel.setTargetMpState("");
    this.distancePanel.setResult();
    this.distancePanel.setSourceMpState("");
    this.distancePanel.sourceSearch?.setExcludeResults([]);
    this._distanceLine?.setTargetEntity(null);
    this.resetDistanceInfo();
    this.showSpacecraftLayer();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `null!=t&&null!=e&&(null==i?t===e:t.toPrecision(i)===e.toPrecision(i))`；调用 `e.toPrecision`、`t.toPrecision`。
   * 调用线索：e.toPrecision、t.toPrecision。
   */
  valuesWithPrecisionAreEqual(t, e, i = 5) {
    return null != t && null != e && (null == i ? t === e : t.toPrecision(i) === e.toPrecision(i));
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.resetSourceDistanceEntity`、`this.resetTargetDistanceEntities`。
   * 调用线索：this.resetSourceDistanceEntity、this.resetTargetDistanceEntities。
   */
  resetAllDistanceEntities() {
    this.resetSourceDistanceEntity();
    this.resetTargetDistanceEntities();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `hasTarget`；调用 `this.distancePanel.setCanMinimize`、`this.distancePanel.setSwapButtonVisible`。
   * 状态写入：hasTarget。
   * 调用线索：this.distancePanel.setCanMinimize、this.distancePanel.setSwapButtonVisible。
   */
  setHasTarget(hasTarget) {
    this.hasTarget = hasTarget;
    this.distancePanel.setCanMinimize(this.hasTarget);
    this.distancePanel.setSwapButtonVisible(this.hasTarget);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_allowRaycasting`。
   * 状态写入：_allowRaycasting。
   */
  setAllowRaycasting(allowRaycasting) {
    this._allowRaycasting = allowRaycasting;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_allowPlay`。
   * 状态写入：_allowPlay。
   */
  setAllowPlay(allowPlay) {
    this._allowPlay = allowPlay;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_isTransitioning`。
   * 状态写入：_isTransitioning。
   */
  setIsTransitioning(isTransitioning) {
    this._isTransitioning = isTransitioning;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_isWaitingForEntities`。
   * 状态写入：_isWaitingForEntities。
   */
  setIsWaitingForEntities(isWaitingForEntities) {
    this._isWaitingForEntities = isWaitingForEntities;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t`；调用 `t.push`、`this.targetDistanceEntities.map`。
   * 调用线索：t.push、this.targetDistanceEntities.map。
   */
  getEntitiesToLoad() {
    const t = [];
    this.sourceDistanceEntity?.id && t.push(this.sourceDistanceEntity.id);
    this.targetDistanceEntities.length && t.push(...this.targetDistanceEntities.map(({
      id: id
    }) => id));
    return t;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `distanceInfo.centerValue`、`distanceInfo.measuredValue`、`distanceInfo.sourceTargetDiff`；调用 `(this._bpParentIsSource?i:entity).getPositionRelativeToEntity`、`sourceTargetDiff.magnitude`、`this.distanceIsValid`。
   * 状态写入：distanceInfo.centerValue、distanceInfo.measuredValue、distanceInfo.sourceTargetDiff。
   * 调用线索：(this._bpParentIsSource?i:entity).getPositionRelativeToEntity、sourceTargetDiff.magnitude、this.distanceIsValid。
   */
  setDistanceInfo(t) {
    const {
      entity: entity
    } = this.sourceDistanceEntity || {};
    const {
      entity: i
    } = this.targetDistanceEntities[0] || {};
    const {
      sourceTargetDiff: sourceTargetDiff
    } = this._vectors;
    const o = this._bpParentIsSource ? entity : i;
    (this._bpParentIsSource ? i : entity).getPositionRelativeToEntity(sourceTargetDiff, Pioneer.Vector3.Zero, o, t);
    const r = sourceTargetDiff.magnitude();
    this.distanceIsValid(r) && this.distanceInfo.value !== r && (this.distanceInfo.measuredValue = r, this.distanceInfo.centerValue = r, this.distanceInfo.sourceTargetDiff = sourceTargetDiff);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `s<5&&(s<.5||i>1)` 或 `true`；调用 `Math.max`、`this.app.getManager`、`this.app.getManager("camera").cameraEntity.getPosition`、`this.app.getManager("camera").cameraEntity.getPosition().magnitude`、`this.distanceIsValid`。
   * 调用线索：Math.max、this.app.getManager、this.app.getManager("camera").cameraEntity.getPosition、this.app.getManager("camera").cameraEntity.getPosition().magnitude、this.distanceIsValid。
   */
  isCloseEnough() {
    const {
      measurePoint: measurePoint
    } = this.sourceDistanceEntity;
    const {
      measurePoint: e
    } = this.targetDistanceEntities[0];
    if (this.distanceIsValid(this.measuredDistance)) {
      const i = Math.max(measurePoint.radius, e.radius) / this.measuredDistance;
      const s = this.app.getManager("camera").cameraEntity.getPosition().magnitude() / this.centerDistance;
      return s < 5 && (s < .5 || i > 1);
    }
    return true;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_currentSecond`；返回 `false` 或 `true`；调用 `_.split`、`parseInt`、`t.valueOf`、`this._formatText`、`this.calculateLightTime`、`this.distancePanel.setLightTime`。
   * 状态写入：_currentSecond。
   * 调用线索：_.split、parseInt、t.valueOf、this._formatText、this.calculateLightTime等。
   */
  updateMeasurement(t, e = false) {
    const currentSecond = t && parseInt(.001 * t.valueOf());
    const s = t && currentSecond === this._currentSecond;
    if (!e && (!this.hasTarget || this._isWaitingForEntities || s && !this.isCloseEnough())) return false;
    t && (this._currentSecond = currentSecond);
    const {
      prefix: prefix,
      value: o = null,
      scale: scale,
      unit: unit,
      dps: dps,
      actualDistanceValue: actualDistanceValue
    } = this.measureDistance(e) || {};
    const {
      prefix: d,
      value: u = null,
      scale: p,
      unit: _,
      dps: m
    } = this.measureRelativeVelocity() || {};
    if (null === o) return false;
    const g = this._formatText(prefix, o, scale, unit, dps);
    const y = this._formatText(d, u, p, _.split("/")[0], m);
    const {
      resultText: resultText,
      resultUnit: resultUnit,
      relVelocityText: relVelocityText,
      relVelocityUnit: relVelocityUnit
    } = this.distancePanel._state;
    g === resultText && unit === resultUnit && y === relVelocityText && _ === relVelocityUnit || this.distancePanel.setResult({
      text: g,
      unit: unit,
      isDistance: true,
      relText: y,
      relUnit: _,
      isRelVelocity: true
    });
    const {
      kmToMi: kmToMi
    } = conversionTable;
    const {
      timeHours: timeHours,
      timeMin: timeMin,
      timeSec: timeSec,
      timeMillisec: timeMillisec
    } = this.calculateLightTime("km" === unit ? actualDistanceValue : actualDistanceValue / kmToMi);
    let w = null;
    w = timeHours > 9 ? `${timeHours} hr` : timeHours > 0 ? `${timeHours} hr ${timeMin.toString().padStart(2, "0")} min` : timeMin > 0 ? `${timeMin} min ${timeSec.toString().padStart(2, "0")} sec` : timeSec > 5 ? `${timeSec} sec` : timeSec > 0 ? `${timeSec} sec ${timeMillisec.toFixed(0)} ms` : `${timeMillisec.toFixed(2)} ms`;
    this.distancePanel.setLightTime(w);
    return true;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `{timeHours:i,timeMin:n,timeSec:r,timeMillisec:1e3*(o-r)}`；调用 `Math.floor`。
   * 调用线索：Math.floor。
   */
  calculateLightTime(t) {
    const e = t / 299792.458 / 3600;
    const i = Math.floor(e);
    const s = 60 * (e - i);
    const n = Math.floor(s);
    const o = 60 * (s - n);
    const r = Math.floor(o);
    return {
      timeHours: i,
      timeMin: n,
      timeSec: r,
      timeMillisec: 1e3 * (o - r)
    };
  }
  /** @eyes-analysis
   * 【结构证据】返回 ``${t}${formatNumber(e,"m"===s||"ft"===s?0:n,"m"===s||"ft"===s?0:n)} ${i}``；调用 `formatNumber`。
   * 调用线索：formatNumber。
   */
  _formatText(t, e, i, s, n) {
    return `${t}${formatNumber(e, "m" === s || "ft" === s ? 0 : n, "m" === s || "ft" === s ? 0 : n)} ${i}`;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `null` 或 `{u:S,linePoint:closestPointOnLine}`；调用 `Math.pow`、`a.getCameraSpacePosition`、`closestPointOnLine.lerp`、`intersectToSource.dot`、`intersectToSource.sub`、`intersectionPoint.copy`。
   * 调用线索：Math.pow、a.getCameraSpacePosition、closestPointOnLine.lerp、intersectToSource.dot、intersectToSource.sub等。
   */
  calcIntersect() {
    if (!this._allowRaycasting) return null;
    const {
      entity: entity
    } = this.sourceDistanceEntity || {};
    const {
      entity: e
    } = this.targetDistanceEntities[0] || {};
    const {
      sourceTargetDiff: sourceTargetDiff
    } = this.distanceInfo;
    if (!entity || !e || sourceTargetDiff.isNaN()) return null;
    const s = this.app.pioneer.getInput();
    const n = s.getActiveViewport();
    const o = s.getCursorPosition();
    const r = n.getCamera();
    const a = this._bpParentIsSource ? entity : e;
    const l = this._bpParentIsSource ? e : entity;
    const {
      rayDirection: rayDirection,
      parentEntityPosition: parentEntityPosition,
      otherEntityPosition: otherEntityPosition,
      planeNormal: planeNormal,
      intersectionPoint: intersectionPoint,
      intersectToSource: intersectToSource,
      closestPointOnLine: closestPointOnLine
    } = this._vectors;
    n.getNormalSpacePositionFromPixelSpacePosition(rayDirection, o);
    r.getCameraSpacePositionFromNormalSpacePosition(rayDirection, rayDirection);
    rayDirection.normalize(rayDirection);
    parentEntityPosition.copy(a.getCameraSpacePosition(r));
    otherEntityPosition.copy(l.getCameraSpacePosition(r));
    const g = parentEntityPosition.magnitude();
    const y = otherEntityPosition.magnitude();
    const f = sourceTargetDiff.magnitude();
    let T = n.getNormalSpaceRadiusFromPixelSpaceRadius(80);
    let b = T;
    T = r.getRadiusFromNormalSpaceRadius(T, g);
    b = r.getRadiusFromNormalSpaceRadius(b, y);
    planeNormal.cross(sourceTargetDiff, rayDirection);
    planeNormal.cross(planeNormal, sourceTargetDiff);
    planeNormal.normalize(planeNormal);
    const E = parentEntityPosition.dot(planeNormal) / planeNormal.dot(rayDirection);
    if (E < 0) return null;
    intersectionPoint.copy(rayDirection);
    intersectionPoint.mult(intersectionPoint, E);
    intersectToSource.sub(intersectionPoint, parentEntityPosition);
    const S = intersectToSource.dot(sourceTargetDiff) / Math.pow(f, 2);
    if (S > 1 || S < 0) return null;
    closestPointOnLine.lerp(parentEntityPosition, otherEntityPosition, S);
    const v = intersectionPoint.distance(closestPointOnLine);
    const C = T + S * (b - T);
    if (v < -C || v > C) return null;
    const x = this.getLimitedU(S).limitedU;
    closestPointOnLine.lerp(parentEntityPosition, otherEntityPosition, x);
    return {
      u: S,
      linePoint: closestPointOnLine
    };
  }
  /** @eyes-analysis
   * 【结构证据】返回 `s`；调用 `Math.max`、`Math.min`。
   * 调用线索：Math.max、Math.min。
   */
  getLimitedU(t) {
    const {
      measurePoint: measurePoint
    } = this.sourceDistanceEntity || {};
    const {
      measurePoint: i
    } = this.targetDistanceEntities[0] || {};
    const s = {
      limitedU: 0,
      minSurfaceU: 0,
      maxSurfaceU: 1
    };
    if (null == measurePoint || null == i) return s;
    const n = Math.min(measurePoint.radius / this.centerDistance, 1);
    const o = Math.min(i.radius / this.centerDistance, 1);
    const r = measurePoint.position === d ? n : 0;
    const a = i.position === d ? o : 0;
    const l = this._bpParentIsSource ? r : a;
    const c = 1 - (this._bpParentIsSource ? a : r);
    const h = this._bpParentIsSource ? n : o;
    const u = 1 - (this._bpParentIsSource ? o : n);
    s.limitedU = Math.min(c, Math.max(l, t));
    s.minSurfaceU = l;
    s.maxSurfaceU = c;
    s.minRadiusU = h;
    s.maxRadiusU = u;
    return s;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_vectors`；调用 `e.get`、`pool.get`。
   * 状态写入：_vectors。
   * 调用线索：e.get、pool.get。
   */
  _grabVectors() {
    const {
      pool: pool
    } = Pioneer.Vector3;
    const {
      pool: e
    } = Pioneer.Vector3;
    this._vectors = {
      rayDirection: pool.get(),
      parentEntityPosition: pool.get(),
      otherEntityPosition: pool.get(),
      planeNormal: pool.get(),
      intersectionPoint: pool.get(),
      intersectToSource: pool.get(),
      closestPointOnLine: pool.get(),
      sourceTargetDiff: pool.get(),
      normalSpacePoint: pool.get(),
      pixelSpacePoint: e.get()
    };
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Object.values`、`Pioneer.Vector3.pool.release`。
   * 调用线索：Object.values、Pioneer.Vector3.pool.release。
   */
  _releaseVectors() {
    for (const t of Object.values(this._vectors)) Pioneer.Vector3.pool.release(t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Math.abs`、`e.getDraggedOffset`、`e.getDraggedOffset().isZero`、`e.getZoomedOffset`、`this._updateBpAnimation`、`this._updateTooltip`。
   * 调用线索：Math.abs、e.getDraggedOffset、e.getDraggedOffset().isZero、e.getZoomedOffset、this._updateBpAnimation等。
   */
  update(t) {
    const e = this.app.pioneer.getInput();
    const i = !e.getDraggedOffset().isZero();
    const s = Math.abs(e.getZoomedOffset()) > 0;
    const n = null !== this._bpAnimation || this._isTransitioning;
    const isWaitingForEntities = this._isWaitingForEntities;
    const r = !isWaitingForEntities && !n && !(i || s);
    const a = !isWaitingForEntities && !n;
    const l = null !== this._bpAnimation;
    const c = this.distancePanel.allowBpOffset;
    const h = null === this.intersect || i || s;
    this.setAllowRaycasting(r);
    h && this.setBetweenOffsetVars(0, 0);
    a && this.updateBetweenPoint();
    l && this._updateBpAnimation();
    c && this.distancePanel.setBpCSSOffsets();
    this._updateTooltip();
    !isWaitingForEntities && this.updateMeasurement(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `"number"==typeof t&&!isNaN(t)&&null!=t&&t!==1/0`；调用 `isNaN`。
   * 调用线索：isNaN。
   */
  distanceIsValid(t) {
    return "number" == typeof t && !isNaN(t) && null != t && t !== 1 / 0;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this.distanceInfo.centerValue`。
   */
  get centerDistance() {
    return this.distanceInfo.centerValue;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this.distanceInfo.measuredValue`。
   */
  get measuredDistance() {
    return this.distanceInfo.measuredValue;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `info?.displayName||info?.iauName`。
   */
  get sourceDisplayName() {
    const {
      info: info
    } = this.sourceDistanceEntity || {};
    return info?.displayName || info?.iauName;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this.targetDistanceEntities.map(({info:info})=>info.displayName||info.iauName)`；调用 `this.targetDistanceEntities.map`。
   * 调用线索：this.targetDistanceEntities.map。
   */
  get targetDisplayNames() {
    return this.targetDistanceEntities.map(({
      info: info
    }) => info.displayName || info.iauName);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._targetDistanceEntities`。
   */
  get targetDistanceEntities() {
    return this._targetDistanceEntities;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._sourceDistanceEntity`。
   */
  get sourceDistanceEntity() {
    return this._sourceDistanceEntity;
  }
}
export { DistanceManager };
