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
class DistanceManager extends Eyes.BaseManager {
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
  init() {
    this._betweenPosEntity ??= this._createBetweenEntity();
    this._bpController ??= this._betweenPosEntity.addController(SolarSystemSceneExports.PositionSumController, "bp_position_sum");
    this.distancePanel ??= this.app.getComponent("distancePanel");
    this.pionerEl ??= document.getElementById("pioneer");
    this._grabVectors();
    this.addEvents();
  }
  deinit() {
    this.resetAllDistanceEntities();
    this.resetUValue();
    this._releaseVectors();
    this.removeEvents();
    this.setBetweenPosHidden(true);
  }
  hideSpacecraftLayer() {
    const layerManager = this.app.getManager("layer");
    const {
      visible: visible
    } = layerManager.getLayer("spacecraft");
    visible && layerManager.toggleLayer("spacecraft");
  }
  showSpacecraftLayer() {
    const layerManager = this.app.getManager("layer");
    const {
      visible: visible
    } = layerManager.getLayer("spacecraft");
    !visible && layerManager.toggleLayer("spacecraft");
  }
  addEvents() {
    const {
      canHover: canHover
    } = this.app;
    this.pionerEl?.addEventListener("click", this.on3dLineClick);
    canHover && this.pionerEl?.addEventListener("mousemove", this._on3dLineMouseMoveThrottled);
  }
  removeEvents() {
    this.pionerEl?.removeEventListener("click", this.on3dLineClick);
    this.pionerEl?.removeEventListener("mousemove", this._on3dLineMouseMoveThrottled);
  }
  resetEvents() {
    this.removeEvents();
    this.addEvents();
  }
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
  showTooltip() {
    const {
      instance: instance
    } = this._tooltipOpts;
    instance?.show();
  }
  hideTooltip() {
    const {
      instance: instance
    } = this._tooltipOpts;
    instance?.hide();
  }
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
  getInterpolationU(t) {
    const {
      limitedU: limitedU,
      minSurfaceU: minSurfaceU,
      maxSurfaceU: maxSurfaceU
    } = this.getLimitedU(t);
    const n = (limitedU - minSurfaceU) / (maxSurfaceU - minSurfaceU);
    return this._bpParentIsSource ? n : 1 - n;
  }
  getOffsetU(t) {
    const e = this._bpParentIsSource ? t : 1 - t;
    const {
      limitedU: limitedU,
      minSurfaceU: minSurfaceU,
      maxSurfaceU: maxSurfaceU
    } = this.getLimitedU(e);
    return .5 !== t ? limitedU : minSurfaceU + (maxSurfaceU - minSurfaceU) * t;
  }
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
  pauseTime() {
    const timeControlsComponent = this.app.getComponent("timeControls");
    const timeManager = this.app.getManager("time");
    const i = 0 === timeManager.getTimeRate();
    this.setAllowPlay(!i);
    i || (timeControlsComponent._canUpdate ? timeControlsComponent.playPauseRate(null, true) : timeManager.pause());
  }
  playTime() {
    const timeManager = this.app.getManager("time");
    const e = 0 !== timeManager.getTimeRate();
    if (!this._allowPlay || e) return;
    const timeControlsComponent = this.app.getComponent("timeControls");
    timeControlsComponent._canUpdate ? timeControlsComponent.playPauseRate(null, false) : timeManager.play();
  }
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
  setBetweenEntityParent(t) {
    this._betweenPosEntity.setParent(t);
    this._bpParentIsSource = t === this.sourceDistanceEntity?.entity;
  }
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
  setHoldU(uValueHold) {
    this._uValueHold = uValueHold;
  }
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
  resetUValue() {
    this._uValueCurrent = null;
  }
  resetAreRelated() {
    this._areRelated = null;
  }
  resetDistanceInfo() {
    this.distanceInfo = {
      centerValue: null,
      measuredValue: null,
      sourceTargetDiff: null
    };
  }
  setBetweenPosHidden(t) {
    const e = this._betweenPosEntity?.getComponent(Pioneer.DivComponent).getDiv();
    e.classList.toggle("hide", t);
  }
  toggleCurrentUnitSystem() {
    const t = this._currentUnitSystem === p ? _ : p;
    this._currentUnitSystem = t;
  }
  setMPPosition(t, e = u) {
    const {
      measurePoint: measurePoint
    } = t || {};
    const s = measurePoint?.position !== e;
    s && (measurePoint.position = e);
    return s;
  }
  setMPAdjustable(t, e) {
    const {
      measurePoint: measurePoint
    } = t || {};
    const s = measurePoint?.adjustable !== e;
    s && (measurePoint.adjustable = e);
    return s;
  }
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
  setLabelWeight(t, e = false, i) {
    if (!t) return;
    if (null === this.app.scene.getEntity(t)) return;
    const s = i ?? "200";
    const labelManager = this.app.getManager("label");
    const o = labelManager.getDefaultWeight(t);
    0 === o && (labelManager._weights[t] = {});
    e ? this._prevValues.weights[t] && labelManager.setWeight(t, this._prevValues.weights[t]) : (labelManager.setWeight(t, s), this._prevValues.weights[t] = o);
  }
  setOcclusionRadius(t, e = false) {
    const i = t.getName();
    const s = t.getOcclusionRadius();
    e ? this._prevValues.occRadii[i] && t.setOcclusionRadius(this._prevValues.occRadii[i]) : (t.setOcclusionRadius(0), this._prevValues.occRadii[i] = s);
  }
  setBetweenIntersectClass(t) {
    this._betweenPosEntity?.getComponent(Pioneer.DivComponent)?.getDiv()?.classList?.toggle("intersect", t);
  }
  toggleSourceIconClass(t, e) {
    const {
      entity: entity
    } = this.sourceDistanceEntity || {};
    if (!entity) return;
    const s = entity?.getComponent(Pioneer.DivComponent);
    const o = s?.getDiv()?.firstChild;
    o && o.classList.toggle(t, e);
  }
  toggleTargetIconClass(t, e) {
    const {
      entity: entity
    } = this.targetDistanceEntities[0] || {};
    if (!entity) return;
    const s = entity?.getComponent(Pioneer.DivComponent);
    const o = s?.getDiv()?.firstChild;
    o && o.classList.toggle(t, e);
  }
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
  addTargetDistanceEntity(t) {
    this.targetDistanceEntities.find(({
      id: id
    }) => id === t) && console.error(`DistanceManager.addTargetDistanceEntity: The entity, '${t}', is already a target.`);
    const e = this._createDistanceEntity(t);
    this._targetDistanceEntities.push(e);
  }
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
  valuesWithPrecisionAreEqual(t, e, i = 5) {
    return null != t && null != e && (null == i ? t === e : t.toPrecision(i) === e.toPrecision(i));
  }
  resetAllDistanceEntities() {
    this.resetSourceDistanceEntity();
    this.resetTargetDistanceEntities();
  }
  setHasTarget(hasTarget) {
    this.hasTarget = hasTarget;
    this.distancePanel.setCanMinimize(this.hasTarget);
    this.distancePanel.setSwapButtonVisible(this.hasTarget);
  }
  setAllowRaycasting(allowRaycasting) {
    this._allowRaycasting = allowRaycasting;
  }
  setAllowPlay(allowPlay) {
    this._allowPlay = allowPlay;
  }
  setIsTransitioning(isTransitioning) {
    this._isTransitioning = isTransitioning;
  }
  setIsWaitingForEntities(isWaitingForEntities) {
    this._isWaitingForEntities = isWaitingForEntities;
  }
  getEntitiesToLoad() {
    const t = [];
    this.sourceDistanceEntity?.id && t.push(this.sourceDistanceEntity.id);
    this.targetDistanceEntities.length && t.push(...this.targetDistanceEntities.map(({
      id: id
    }) => id));
    return t;
  }
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
  _formatText(t, e, i, s, n) {
    return `${t}${formatNumber(e, "m" === s || "ft" === s ? 0 : n, "m" === s || "ft" === s ? 0 : n)} ${i}`;
  }
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
  _releaseVectors() {
    for (const t of Object.values(this._vectors)) Pioneer.Vector3.pool.release(t);
  }
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
  distanceIsValid(t) {
    return "number" == typeof t && !isNaN(t) && null != t && t !== 1 / 0;
  }
  get centerDistance() {
    return this.distanceInfo.centerValue;
  }
  get measuredDistance() {
    return this.distanceInfo.measuredValue;
  }
  get sourceDisplayName() {
    const {
      info: info
    } = this.sourceDistanceEntity || {};
    return info?.displayName || info?.iauName;
  }
  get targetDisplayNames() {
    return this.targetDistanceEntities.map(({
      info: info
    }) => info.displayName || info.iauName);
  }
  get targetDistanceEntities() {
    return this._targetDistanceEntities;
  }
  get sourceDistanceEntity() {
    return this._sourceDistanceEntity;
  }
}
export { DistanceManager };
