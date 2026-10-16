// Recovered from app.js:1566763-1579808.
import * as Eyes from "../../framework/eyes/index.js";
import "../../styles/extracted/DistancePanelStyles.js";
import DistancePanelTemplate from "../templates/DistancePanelTemplate.html";
var getDistancePanelTemplate = () => DistancePanelTemplate;
const r = "« Select or search for a target »";
class DistancePanel extends Eyes.BaseComponent {
  constructor(t, e = {}) {
    super(t, null, {
      isVisible: true,
      isSearchingClass: "",
      isMinimized: null,
      isMinimizedClass: "",
      canMinimizeClass: "",
      maxMinIconClass: "",
      maxMinBtnPosition: "right",
      isDraggable: null,
      isDraggableClass: "",
      currDraggingClass: "",
      isLoadingClass: "hidden",
      fromText: "<span>from</span>",
      showSourceMPToggleClass: "hidden",
      sourceMpClass: "",
      toText: "<span>to</span>",
      showTargetMPToggleClass: "hidden",
      touchActiveClass: "",
      swapIsVisibleClass: "hidden",
      swapOffsetClass: "",
      dotPosClass: "source-dot",
      targetMpClass: "",
      resultText: "",
      resultUnit: "",
      resultTextClass: "",
      relVelocityText: "",
      relVelocityUnit: "",
      relVelocityClass: "hidden",
      isExpandedClass: "",
      lightTimeVisibleClass: "hidden",
      lightTimeText: ""
    });
    this._isTouch = null;
    this._touchOptions = {
      activeDelay: 3e3,
      activeTimeout: null
    };
    this._canHover = null;
    this._isMobile = Eyes.AppUtils.isMobile();
    this.isMobileChangedCallback = null;
    this._dragState = {
      currentlyDragging: null,
      downX: null,
      downY: null,
      dragX: null,
      dragY: null,
      limitX: null,
      limitY: null,
      screenCenterX: null,
      screenCenterY: null
    };
    this._size = {
      width: 320,
      height: 320,
      expandedHeight: 360,
      padding: {
        top: 70,
        bottom: 150
      },
      heightFactor: 4.5
    };
    this._lineGraphic = {
      top: null,
      height: null,
      dotPos: null
    };
    this.bindFunctions(["onMouseDown", "onMouseMove", "onMouseUp", "onTouchStart", "onTouchMove", "onTouchEnd", "onLineMouseEnter", "onLineMouseLeave", "onLineMouseMove", "_onLineTouchStart", "_onLineTouchEnd", "_calcNewXandY", "setPanelProps"]);
  }
  initSearchUI() {
    const {
      sourceSearchContainer: sourceSearchContainer,
      targetSearchContainer: targetSearchContainer
    } = this._children;
    this.sourceSearch = this.app.getComponent("distanceSourceSearch");
    this.targetSearch = this.app.getComponent("distanceTargetSearch");
    sourceSearchContainer.appendChild(this.sourceSearch?.element);
    this.sourceSearch?.setParent(sourceSearchContainer);
    targetSearchContainer.appendChild(this.targetSearch?.element);
    this.targetSearch?.setParent(targetSearchContainer);
    const {
      input: input
    } = this.sourceSearch?._children || {};
    const {
      input: s
    } = this.targetSearch?._children || {};
    input && input.setAttribute("placeholder", "Name of source");
    s && s.setAttribute("placeholder", "Name of target");
    this.sourceSearch.show();
    this.targetSearch.show();
  }
  onMouseDown(t) {
    this.setCurrentlyDragging(true);
    this.setDownXY(t.clientX, t.clientY);
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("mouseup", this.onMouseUp);
  }
  onMouseMove(t) {
    if (1 === t.buttons && this.currentlyDragging) {
      const {
        newX: newX,
        newY: newY
      } = this._calcNewXandY(t.clientX, t.clientY);
      const {
        limitX: limitX,
        limitY: limitY
      } = this.getLimitedXandY(newX, newY);
      this.setLimitXY(limitX, limitY);
      this.setTransformCSSVars(limitX, limitY);
      this.calcMaxMinBtnPos(limitX);
    }
  }
  onMouseUp() {
    const {
      limitX: limitX,
      limitY: limitY
    } = this._dragState;
    this.setDragXY(limitX, limitY);
    this.setCurrentlyDragging(false);
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mouseup", this.onMouseUp);
  }
  onTouchStart(t) {
    this.setCurrentlyDragging(true);
    const {
      clientX: clientX,
      clientY: clientY
    } = t.touches[0];
    this.setDownXY(clientX, clientY);
    window.addEventListener("touchmove", this.onTouchMove);
    window.addEventListener("touchend", this.onTouchEnd);
  }
  onTouchMove(t) {
    if (this.currentlyDragging) {
      const {
        clientX: clientX,
        clientY: clientY
      } = t.touches[0];
      const {
        newX: newX,
        newY: newY
      } = this._calcNewXandY(clientX, clientY);
      const {
        limitX: limitX,
        limitY: limitY
      } = this.getLimitedXandY(newX, newY);
      this.setLimitXY(limitX, limitY);
      this.setTransformCSSVars(limitX, limitY);
      this.calcMaxMinBtnPos(limitX);
    }
  }
  onTouchEnd() {
    const {
      limitX: limitX,
      limitY: limitY
    } = this._dragState;
    this.setDragXY(limitX, limitY);
    this.setCurrentlyDragging(false);
    window.removeEventListener("touchmove", this.onTouchMove);
    window.removeEventListener("touchend", this.onTouchEnd);
  }
  _calcNewXandY(t, e) {
    const {
      downX: downX,
      downY: downY,
      dragX: dragX,
      dragY: dragY
    } = this._dragState;
    return {
      newX: dragX + (t - downX),
      newY: dragY + (e - downY)
    };
  }
  exit() {
    const routerManager = this.app.getManager("router");
    const {
      spaceObject: spaceObject
    } = routerManager.currentRoute?.params || {};
    spaceObject && routerManager.navigate({}, `/${spaceObject}`, {
      __remove: ["to"],
      keepTime: true
    });
  }
  toggleSourceMP() {
    const {
      dotPos: dotPos
    } = this._lineGraphic;
    this.distanceManager.toggleSourceMeasurePoint();
    0 === dotPos && this.onLineClick(null, 0);
  }
  toggleTargetMP() {
    const {
      dotPos: dotPos
    } = this._lineGraphic;
    this.distanceManager.toggleTargetMeasurePoint();
    1 === dotPos && this.onLineClick(null, 1);
  }
  onSwapClick() {
    this.distanceManager?.swapSourceAndTarget();
  }
  toggleUnitSystem(t) {
    t.stopPropagation();
    this.distanceManager?.toggleCurrentUnitSystem();
    this.distanceManager?.updateMeasurement(false);
  }
  onResultClick(t) {
    const {
      resultText: resultText
    } = this._state;
    const i = Boolean(this._isMobile && this._cMenuParent) && !this._cMenuParent._state.isExpanded;
    const s = resultText === r;
    i && this._cMenuParent.setExpanded(true);
    s ? this.targetSearch?.onInputFocus() : i || this._cMenuParent?.setExpanded(true);
  }
  onContainerClick(t) {
    t.target === this.element && (this.sourceSearch?.reset(), this.targetSearch?.reset());
  }
  addEvents() {
    const {
      isDraggable: isDraggable
    } = this._state;
    const {
      isTouch: isTouch,
      canHover: canHover
    } = this.app;
    const {
      dragArea: dragArea,
      lineGraphic: lineGraphic
    } = this._children;
    isDraggable && (canHover && dragArea.addEventListener("mousedown", this.onMouseDown), isTouch && dragArea.addEventListener("touchstart", this.onTouchStart));
    canHover && (lineGraphic.addEventListener("mouseenter", this.onLineMouseEnter), lineGraphic.addEventListener("mouseleave", this.onLineMouseLeave), lineGraphic.addEventListener("mousemove", this.onLineMouseMove));
    isTouch && (lineGraphic.addEventListener("touchstart", this._onLineTouchStart), lineGraphic.addEventListener("touchend", this._onLineTouchEnd));
    this._isTouch = isTouch;
    this._canHover = canHover;
  }
  removeAllEvents() {
    const {
      dragArea: dragArea,
      lineGraphic: lineGraphic
    } = this._children;
    dragArea.removeEventListener("mousedown", this.onMouseDown);
    dragArea.removeEventListener("touchstart", this.onTouchStart);
    lineGraphic.addEventListener("mouseenter", this.onLineMouseEnter);
    lineGraphic.addEventListener("mouseenter", this.onLineMouseLeave);
    lineGraphic.addEventListener("mousemove", this.onLineMouseMove);
    lineGraphic.removeEventListener("touchstart", this._onLineTouchStart);
    lineGraphic.removeEventListener("touchend", this._onLineTouchEnd);
  }
  setIsSearching(t) {
    this.setState({
      isSearchingClass: t ? "searching" : ""
    });
  }
  setScreenCenter(t, e) {
    this._dragState.screenCenterX = t;
    this._dragState.screenCenterY = e;
  }
  setPanelProps() {
    const {
      width: width,
      height: height,
      expandedHeight: expandedHeight
    } = this._size;
    const {
      isDraggable: isDraggable,
      isExpandedClass: isExpandedClass
    } = this._state;
    this._element.style.setProperty("--d-panel-width", isDraggable ? `${width}px` : "");
    this._element.style.setProperty("--d-panel-height", isDraggable ? `${isExpandedClass ? expandedHeight : height}px` : "");
    const {
      dragX: dragX,
      dragY: dragY,
      screenCenterX: screenCenterX,
      screenCenterY: screenCenterY
    } = this._dragState;
    const h = .5 * window.innerWidth;
    const d = .5 * window.innerHeight;
    const u = h - screenCenterX;
    const p = d - screenCenterY;
    const _ = Eyes.AppUtils.isLandscape();
    const m = null !== dragX ? dragX + u : h - width * (_ ? 1.5 : .5);
    const g = null !== dragY ? dragY + p : d - height * (_ ? .5 : -1);
    const {
      limitX: limitX,
      limitY: limitY
    } = this.getLimitedXandY(m, g);
    this.setDragXY(limitX, limitY);
    isDraggable ? (this.setTransformCSSVars(limitX, limitY), this.calcMaxMinBtnPos(limitX)) : (this.setTransformCSSVars(), this.calcMaxMinBtnPos());
    this.setScreenCenter(h, d);
  }
  get currentlyDragging() {
    return this._dragState.currentlyDragging;
  }
  setCurrentlyDragging(t) {
    this._dragState.currentlyDragging = t;
    this.setState({
      currDraggingClass: t ? "dragging" : ""
    });
  }
  setDownXY(t, e) {
    this._dragState.downX = t;
    this._dragState.downY = e;
  }
  setLimitXY(t, e) {
    this._dragState.limitX = t;
    this._dragState.limitY = e;
  }
  setDragXY(t = this._dragState.x, e = this._dragState.y) {
    this._dragState.dragX = t;
    this._dragState.dragY = e;
  }
  setTransformCSSVars(t, e) {
    const i = void 0 === t && void 0 === e;
    this._element.style.setProperty("--d-panel-x", i ? "" : `${t}px`);
    this._element.style.setProperty("--d-panel-y", i ? "" : `${e}px`);
  }
  setCanMinimize(t) {
    this.setState({
      canMinimizeClass: t ? "minimizable" : ""
    });
  }
  setSwapButtonVisible(t) {
    this.setState({
      swapIsVisibleClass: t ? "" : "hidden"
    });
  }
  calcMaxMinBtnPos(t) {
    const {
      width: width
    } = this._size;
    const {
      maxMinBtnPosition: maxMinBtnPosition
    } = this._state;
    const s = void 0 === t;
    const n = .5 * (window.innerWidth - width);
    const o = !s && t > n ? "left" : "right";
    const r = "left" === o ? "offset" : "";
    o !== maxMinBtnPosition && this.setState({
      maxMinBtnPosition: o,
      swapOffsetClass: r
    });
  }
  getLimitedXandY(t, e) {
    const {
      isExpandedClass: isExpandedClass
    } = this._state;
    const {
      width: width,
      height: height,
      padding: padding,
      expandedHeight: expandedHeight
    } = this._size;
    const a = padding.top;
    const l = window.innerWidth - width;
    const c = window.innerHeight - (isExpandedClass ? expandedHeight : height) - padding.bottom;
    return {
      limitX: Math.min(Math.max(0, t), l),
      limitY: Math.min(Math.max(a, e), c)
    };
  }
  toggleIsMinimized(t, e) {
    const {
      isMinimized: isMinimized
    } = this._state;
    const {
      maxMinButton: maxMinButton
    } = this._children;
    const n = e ?? !isMinimized;
    const o = n ? "minimized" : "maximized";
    const r = n ? "icon-plus" : "icon-minus";
    this.setState({
      isMinimized: n,
      isMinimizedClass: o,
      maxMinIconClass: r
    });
    const a = (n ? "Maximize" : "Minimize") + " distance tool panel";
    maxMinButton.setAttribute("alt", a);
  }
  setIsDraggable(t) {
    this.setState({
      isDraggable: t,
      isDraggableClass: t ? "draggable" : "fixed"
    });
  }
  setIsLoading(t) {
    this.setState({
      isLoadingClass: t ? "" : "hidden"
    });
  }
  setResult({
    text: text,
    unit: unit,
    relText: relText,
    relUnit: relUnit,
    isRelVelocity: n = false,
    isDistance: o = false
  } = {}) {
    clearTimeout(this.app.getManager("distance")?.errorResultTimeout);
    this.setState({
      resultText: text ?? r,
      resultUnit: unit ?? "",
      resultTextClass: o ? "distance monospace" : "info semi small color gray med",
      relVelocityText: relText ?? "",
      relVelocityUnit: relUnit ?? "",
      relVelocityClass: n ? "rel-velocity monospace" : "hidden",
      isExpandedClass: n ? "expanded" : "",
      lightTimeVisibleClass: "hidden",
      lightTimeText: ""
    });
    const {
      height: height,
      expandedHeight: expandedHeight,
      heightFactor: heightFactor
    } = this._size;
    const {
      isDraggable: isDraggable
    } = this._state;
    this._element.style.setProperty("--d-panel-height", isDraggable ? `${n ? expandedHeight : height}px` : "");
    this._element.style.setProperty("--d-panel-height-factor", isDraggable ? `${heightFactor}rem` : "");
  }
  setLightTime(t) {
    const {
      heightFactor: heightFactor
    } = this._size;
    const {
      isDraggable: isDraggable
    } = this._state;
    this._element.style.setProperty("--d-panel-height-factor", isDraggable ? `${t ? heightFactor + 1.5 : heightFactor}rem` : "");
    t ? this.setState({
      lightTimeVisibleClass: "",
      lightTimeText: t ?? ""
    }) : this.setState({
      lightTimeVisibleClass: "hidden",
      lightTimeText: ""
    });
  }
  setSourceText(t) {
    const {
      input: input
    } = this.sourceSearch?._children || {};
    input && (input.value = t);
    t && this.sourceSearch?.setConfig({
      defaultText: t
    });
  }
  setSourceMpState(t) {
    const e = "Moon" === this.distanceManager?.sourceDisplayName ? " the" : "";
    const i = t ? `<span>from the <span class="mp-highlight">${t}</span> of${e}</span>` : `<span>from${e}</span>`;
    const s = t ? "" : "hidden";
    const n = t || "no-toggle";
    this.setState({
      fromText: i,
      showSourceMPToggleClass: s,
      sourceMpClass: n
    });
  }
  setTargetText(t) {
    const {
      input: input
    } = this.targetSearch?._children || {};
    input && (input.value = t ?? "");
    "string" == typeof t && this.targetSearch?.setConfig({
      defaultText: t
    });
  }
  setTargetMpState(t) {
    const e = "Moon" === this.distanceManager?.targetDisplayNames[0] ? " the" : "";
    const i = t ? `<span>to the <span class="mp-highlight">${t}</span> of${e}</span>` : `<span>to${e}</span>`;
    const s = t ? "" : "hidden";
    const n = t || "no-toggle";
    this.setState({
      toText: i,
      showTargetMPToggleClass: s,
      targetMpClass: n
    });
  }
  onIsMobileChanged(isMobile) {
    this._isMobile = isMobile;
    this._updateTitleAndCloseBtnParent(this._isMobile);
    this.setIsDraggable(!this._isMobile);
    "function" == typeof this.isMobileChangedCallback && this.isMobileChangedCallback(this._isMobile);
  }
  _updateTitleAndCloseBtnParent(t = this._isMobile) {
    const {
      dpTitle: dpTitle,
      dpCloseButton: dpCloseButton,
      dragArea: dragArea
    } = this._children;
    t ? this.app._dynamicElement.prepend(dpTitle, dpCloseButton) : dragArea.append(dpTitle, dpCloseButton);
  }
  get allowBpOffset() {
    return this._state.isDraggable && this._state.isMinimized;
  }
  setBpCSSOffsets() {
    const t = this.app.pioneer.getInput().getActiveViewport().getCamera();
    const {
      x: e = 0,
      y: i = 0
    } = this.distanceManager._betweenPosEntity?.getPixelSpacePosition(t) || {};
    this._element.style.setProperty("--d-panel-bpX", `${e}px`);
    this._element.style.setProperty("--d-panel-bpY", `${i}px`);
  }
  onLineClick(t, e) {
    const {
      lineGraphic: lineGraphic
    } = this._children;
    const {
      top: top,
      height: height
    } = this._lineGraphic;
    const {
      hasTarget: hasTarget
    } = this.distanceManager;
    if (!hasTarget && void 0 === e && (null === t || t.target !== lineGraphic)) return;
    clearTimeout(this._touchOptions.activeTimeout);
    this.distanceManager.hideTooltip();
    const r = e ?? (t.clientY - top) / height;
    const a = r < .4 ? 0 : r > .6 ? 1 : .5;
    const l = 1 === a ? "target-dot" : .5 === a ? "centered-dot" : "source-dot";
    this.setState({
      dotPosClass: l,
      touchActiveClass: ""
    });
    const c = this.distanceManager.getOffsetU(a);
    this.distanceManager.on3dLineClick(null, c);
    this.distanceManager.setHoldU(a);
  }
  onLineMouseMove(t) {
    const {
      lineGraphic: lineGraphic
    } = this._children;
    const {
      top: top,
      height: height
    } = this._lineGraphic;
    if (t.target !== lineGraphic) return;
    const {
      clientY: clientY
    } = t;
    const o = (clientY - top) / height;
    const r = o < .4 ? 0 : o > .6 ? 1 : .5;
    this.setLineGraphicDotOffset(r);
  }
  onLineMouseEnter() {
    this.setLineGraphicDimensions();
  }
  onLineMouseLeave() {
    this.setLineGraphicDotOffset(null);
  }
  setLineGraphicDimensions() {
    const {
      lineGraphic: lineGraphic
    } = this._children;
    const {
      top: top,
      height: height
    } = lineGraphic.getBoundingClientRect();
    this._lineGraphic.top = top;
    this._lineGraphic.height = height;
  }
  _onLineTouchStart(t) {
    clearTimeout(this._touchOptions.activeTimeout);
    const {
      touchActiveClass: touchActiveClass
    } = this._state;
    const {
      hasTarget: hasTarget
    } = this.distanceManager;
    hasTarget && !touchActiveClass && (t.preventDefault(), this.setState({
      touchActiveClass: "touchactive"
    }), this.setLineGraphicDimensions(), this.distanceManager.showTooltip());
  }
  _onLineTouchEnd() {
    this._touchOptions.activeTimeout = setTimeout(() => {
      this.setState({
        touchActiveClass: ""
      });
      this.distanceManager.hideTooltip();
    }, this._touchOptions.activeDelay);
  }
  setLineGraphicDotPos(t) {
    const {
      lineGraphic: lineGraphic
    } = this._children;
    const i = parseFloat(t.toFixed(5));
    const s = 0 === i || 1 === i ? i : t;
    this._lineGraphic.dotPos = s;
    lineGraphic?.style.setProperty("--focus-dot-pos", 100 * t + "%");
  }
  setLineGraphicDotOffset(t) {
    const {
      lineGraphic: lineGraphic
    } = this._children;
    const i = null !== t ? 100 * t + "%" : "unset";
    lineGraphic?.style.setProperty("--focus-dot-offset", i);
  }
  resize(t, e = false) {
    const {
      isTouch: isTouch,
      canHover: canHover
    } = this.app;
    const o = Eyes.AppUtils.isMobile();
    const r = this._isMobile !== o;
    const a = this._isTouch !== isTouch;
    const l = this._canHover !== canHover;
    (e || r) && this.onIsMobileChanged(o);
    (e || a || l || r) && (this.removeAllEvents(), this.addEvents());
    this.setPanelProps();
  }
  show() {
    this.distanceManager ??= this.app.getManager("distance");
    this.toggleIsMinimized(null, false);
  }
  hide() {
    this.toggleIsMinimized(null, true);
    const {
      parentElement: parentElement
    } = this.element;
    "componentContainer" === parentElement.getAttribute("key") && (parentElement.style.opacity = 1, parentElement.style.visibility = "visible");
  }
  __enable() {
    super.__enable();
    this.resize(null, true);
  }
  __disable() {
    this.removeAllEvents();
    this._updateTitleAndCloseBtnParent(false);
    super.__disable();
  }
}
DistancePanel.html = getDistancePanelTemplate();
export { DistancePanel };
