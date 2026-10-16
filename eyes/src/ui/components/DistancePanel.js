/** @eyes-analysis
 * 文件职责：距离源目标选择和距离计算显示面板
 * 依据：imports: ../../framework/eyes/index.js, ../../styles/extracted/DistancePanelStyles.js, ../templates/DistancePanelTemplate.html；manager dependencies: router, distance
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1566763-1579808.
import * as Eyes from "../../framework/eyes/index.js";
import "../../styles/extracted/DistancePanelStyles.js";
import DistancePanelTemplate from "../templates/DistancePanelTemplate.html";
var getDistancePanelTemplate = () => DistancePanelTemplate;
const r = "« Select or search for a target »";
/** @eyes-analysis
 * 类职责：距离源目标选择和距离计算显示面板；继承 Eyes.BaseComponent
 * 继承：Eyes.BaseComponent；导出：DistancePanel。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class DistancePanel extends Eyes.BaseComponent {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 Eyes.AppUtils.isMobile, this.bindFunctions；写入 _isTouch, _touchOptions, _canHover, _isMobile, isMobileChangedCallback, _dragState, _size, _lineGraphic。
   * 状态写入：_canHover、_dragState、_isMobile、_isTouch、_lineGraphic、_size、_touchOptions、isMobileChangedCallback。
   * 调用线索：Eyes.AppUtils.isMobile、super、this.bindFunctions。
   */
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
  /** @eyes-analysis
   * 执行 initSearchUI 对应的组件业务步骤；调用 this.app.getComponent, SearchContainer.appendChild, this.sourceSearch.show, this.targetSearch.show；写入 sourceSearch, targetSearch。
   * 状态写入：sourceSearch、targetSearch。
   * 调用线索：input.setAttribute、s.setAttribute、sourceSearchContainer.appendChild、targetSearchContainer.appendChild、this.app.getComponent等。
   */
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
  /** @eyes-analysis
   * 执行 onMouseDown 对应的组件业务步骤；调用 this.setCurrentlyDragging, this.setDownXY。
   * 调用线索：this.setCurrentlyDragging、this.setDownXY、window.addEventListener。
   */
  onMouseDown(t) {
    this.setCurrentlyDragging(true);
    this.setDownXY(t.clientX, t.clientY);
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("mouseup", this.onMouseUp);
  }
  /** @eyes-analysis
   * 执行 onMouseMove 对应的组件业务步骤；调用 this._calcNewXandY, this.getLimitedXandY, this.setLimitXY, this.setTransformCSSVars, this.calcMaxMinBtnPos。
   * 调用线索：this._calcNewXandY、this.calcMaxMinBtnPos、this.getLimitedXandY、this.setLimitXY、this.setTransformCSSVars。
   */
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
  /** @eyes-analysis
   * 执行 onMouseUp 对应的组件业务步骤；调用 this.setDragXY, this.setCurrentlyDragging。
   * 调用线索：this.setCurrentlyDragging、this.setDragXY、window.removeEventListener。
   */
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
  /** @eyes-analysis
   * 执行 onTouchStart 对应的组件业务步骤；调用 this.setCurrentlyDragging, this.setDownXY。
   * 调用线索：this.setCurrentlyDragging、this.setDownXY、window.addEventListener。
   */
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
  /** @eyes-analysis
   * 执行 onTouchMove 对应的组件业务步骤；调用 this._calcNewXandY, this.getLimitedXandY, this.setLimitXY, this.setTransformCSSVars, this.calcMaxMinBtnPos。
   * 调用线索：this._calcNewXandY、this.calcMaxMinBtnPos、this.getLimitedXandY、this.setLimitXY、this.setTransformCSSVars。
   */
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
  /** @eyes-analysis
   * 执行 onTouchEnd 对应的组件业务步骤；调用 this.setDragXY, this.setCurrentlyDragging。
   * 调用线索：this.setCurrentlyDragging、this.setDragXY、window.removeEventListener。
   */
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
  /** @eyes-analysis
   * 执行 _calcNewXandY 对应的组件业务步骤。
   */
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
  /** @eyes-analysis
   * 执行 exit 对应的组件业务步骤；调用 this.app.getManager, Manager.navigate。
   * 调用线索：routerManager.navigate、this.app.getManager。
   */
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
  /** @eyes-analysis
   * 执行 toggleSourceMP 对应的组件业务步骤；调用 this.distanceManager.toggleSourceMeasurePoint, this.onLineClick。
   * 调用线索：this.distanceManager.toggleSourceMeasurePoint、this.onLineClick。
   */
  toggleSourceMP() {
    const {
      dotPos: dotPos
    } = this._lineGraphic;
    this.distanceManager.toggleSourceMeasurePoint();
    0 === dotPos && this.onLineClick(null, 0);
  }
  /** @eyes-analysis
   * 执行 toggleTargetMP 对应的组件业务步骤；调用 this.distanceManager.toggleTargetMeasurePoint, this.onLineClick。
   * 调用线索：this.distanceManager.toggleTargetMeasurePoint、this.onLineClick。
   */
  toggleTargetMP() {
    const {
      dotPos: dotPos
    } = this._lineGraphic;
    this.distanceManager.toggleTargetMeasurePoint();
    1 === dotPos && this.onLineClick(null, 1);
  }
  /** @eyes-analysis
   * 执行 onSwapClick 对应的组件业务步骤。
   * 调用线索：this.distanceManager?.swapSourceAndTarget。
   */
  onSwapClick() {
    this.distanceManager?.swapSourceAndTarget();
  }
  /** @eyes-analysis
   * 执行 toggleUnitSystem 对应的组件业务步骤。
   * 调用线索：t.stopPropagation、this.distanceManager?.toggleCurrentUnitSystem、this.distanceManager?.updateMeasurement。
   */
  toggleUnitSystem(t) {
    t.stopPropagation();
    this.distanceManager?.toggleCurrentUnitSystem();
    this.distanceManager?.updateMeasurement(false);
  }
  /** @eyes-analysis
   * 执行 onResultClick 对应的组件业务步骤；调用 this._cMenuParent.setExpanded。
   * 调用线索：Boolean、this._cMenuParent.setExpanded、this._cMenuParent?.setExpanded、this.targetSearch?.onInputFocus。
   */
  onResultClick(t) {
    const {
      resultText: resultText
    } = this._state;
    const i = Boolean(this._isMobile && this._cMenuParent) && !this._cMenuParent._state.isExpanded;
    const s = resultText === r;
    i && this._cMenuParent.setExpanded(true);
    s ? this.targetSearch?.onInputFocus() : i || this._cMenuParent?.setExpanded(true);
  }
  /** @eyes-analysis
   * 执行 onContainerClick 对应的组件业务步骤。
   * 调用线索：this.sourceSearch?.reset、this.targetSearch?.reset。
   */
  onContainerClick(t) {
    t.target === this.element && (this.sourceSearch?.reset(), this.targetSearch?.reset());
  }
  /** @eyes-analysis
   * 执行 addEvents 对应的组件业务步骤；调用 Area.addEventListener, Graphic.addEventListener；写入 _isTouch, _canHover。
   * 状态写入：_canHover、_isTouch。
   * 调用线索：dragArea.addEventListener、lineGraphic.addEventListener。
   */
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
  /** @eyes-analysis
   * 执行 removeAllEvents 对应的组件业务步骤；调用 Area.removeEventListener, Graphic.addEventListener, Graphic.removeEventListener。
   * 调用线索：dragArea.removeEventListener、lineGraphic.addEventListener、lineGraphic.removeEventListener。
   */
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
  /** @eyes-analysis
   * 执行 setIsSearching 对应的组件业务步骤；调用 this.setState。
   * 调用线索：this.setState。
   */
  setIsSearching(t) {
    this.setState({
      isSearchingClass: t ? "searching" : ""
    });
  }
  /** @eyes-analysis
   * 执行 setScreenCenter 对应的组件业务步骤。
   * 状态写入：_dragState.screenCenterX、_dragState.screenCenterY。
   */
  setScreenCenter(t, e) {
    this._dragState.screenCenterX = t;
    this._dragState.screenCenterY = e;
  }
  /** @eyes-analysis
   * 执行 setPanelProps 对应的组件业务步骤；调用 this._element.style.setProperty, Eyes.AppUtils.isLandscape, this.getLimitedXandY, this.setDragXY, this.setTransformCSSVars, this.calcMaxMinBtnPos, this.setScreenCenter。
   * 调用线索：Eyes.AppUtils.isLandscape、this._element.style.setProperty、this.calcMaxMinBtnPos、this.getLimitedXandY、this.setDragXY等。
   */
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
  /** @eyes-analysis
   * 执行 currentlyDragging 对应的组件业务步骤。
   */
  get currentlyDragging() {
    return this._dragState.currentlyDragging;
  }
  /** @eyes-analysis
   * 执行 setCurrentlyDragging 对应的组件业务步骤；调用 this.setState。
   * 状态写入：_dragState.currentlyDragging。
   * 调用线索：this.setState。
   */
  setCurrentlyDragging(t) {
    this._dragState.currentlyDragging = t;
    this.setState({
      currDraggingClass: t ? "dragging" : ""
    });
  }
  /** @eyes-analysis
   * 执行 setDownXY 对应的组件业务步骤。
   * 状态写入：_dragState.downX、_dragState.downY。
   */
  setDownXY(t, e) {
    this._dragState.downX = t;
    this._dragState.downY = e;
  }
  /** @eyes-analysis
   * 执行 setLimitXY 对应的组件业务步骤。
   * 状态写入：_dragState.limitX、_dragState.limitY。
   */
  setLimitXY(t, e) {
    this._dragState.limitX = t;
    this._dragState.limitY = e;
  }
  /** @eyes-analysis
   * 执行 setDragXY 对应的组件业务步骤。
   * 状态写入：_dragState.dragX、_dragState.dragY。
   */
  setDragXY(t = this._dragState.x, e = this._dragState.y) {
    this._dragState.dragX = t;
    this._dragState.dragY = e;
  }
  /** @eyes-analysis
   * 执行 setTransformCSSVars 对应的组件业务步骤；调用 this._element.style.setProperty。
   * 调用线索：this._element.style.setProperty。
   */
  setTransformCSSVars(t, e) {
    const i = void 0 === t && void 0 === e;
    this._element.style.setProperty("--d-panel-x", i ? "" : `${t}px`);
    this._element.style.setProperty("--d-panel-y", i ? "" : `${e}px`);
  }
  /** @eyes-analysis
   * 执行 setCanMinimize 对应的组件业务步骤；调用 this.setState。
   * 调用线索：this.setState。
   */
  setCanMinimize(t) {
    this.setState({
      canMinimizeClass: t ? "minimizable" : ""
    });
  }
  /** @eyes-analysis
   * 执行 setSwapButtonVisible 对应的组件业务步骤；调用 this.setState。
   * 调用线索：this.setState。
   */
  setSwapButtonVisible(t) {
    this.setState({
      swapIsVisibleClass: t ? "" : "hidden"
    });
  }
  /** @eyes-analysis
   * 执行 calcMaxMinBtnPos 对应的组件业务步骤；调用 this.setState。
   * 调用线索：this.setState。
   */
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
  /** @eyes-analysis
   * 执行 getLimitedXandY 对应的组件业务步骤；调用 Math.min, Math.max。
   * 调用线索：Math.max、Math.min。
   */
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
  /** @eyes-analysis
   * 执行 toggleIsMinimized 对应的组件业务步骤；调用 this.setState, MinButton.setAttribute。
   * 调用线索：maxMinButton.setAttribute、this.setState。
   */
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
  /** @eyes-analysis
   * 执行 setIsDraggable 对应的组件业务步骤；调用 this.setState。
   * 调用线索：this.setState。
   */
  setIsDraggable(t) {
    this.setState({
      isDraggable: t,
      isDraggableClass: t ? "draggable" : "fixed"
    });
  }
  /** @eyes-analysis
   * 执行 setIsLoading 对应的组件业务步骤；调用 this.setState。
   * 调用线索：this.setState。
   */
  setIsLoading(t) {
    this.setState({
      isLoadingClass: t ? "" : "hidden"
    });
  }
  /** @eyes-analysis
   * 源码扩展或访问入口；调用 clearTimeout, this._element.style.setProperty, this.app.getManager, this.setState；写入 。
   * 调用线索：clearTimeout、this._element.style.setProperty、this.app.getManager、this.setState。
   */
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
  /** @eyes-analysis
   * 执行 setLightTime 对应的组件业务步骤；调用 this._element.style.setProperty, this.setState。
   * 调用线索：this._element.style.setProperty、this.setState。
   */
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
  /** @eyes-analysis
   * 执行 setSourceText 对应的组件业务步骤。
   * 调用线索：this.sourceSearch?.setConfig。
   */
  setSourceText(t) {
    const {
      input: input
    } = this.sourceSearch?._children || {};
    input && (input.value = t);
    t && this.sourceSearch?.setConfig({
      defaultText: t
    });
  }
  /** @eyes-analysis
   * 执行 setSourceMpState 对应的组件业务步骤；调用 this.setState。
   * 调用线索：this.setState。
   */
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
  /** @eyes-analysis
   * 执行 setTargetText 对应的组件业务步骤。
   * 调用线索：this.targetSearch?.setConfig。
   */
  setTargetText(t) {
    const {
      input: input
    } = this.targetSearch?._children || {};
    input && (input.value = t ?? "");
    "string" == typeof t && this.targetSearch?.setConfig({
      defaultText: t
    });
  }
  /** @eyes-analysis
   * 执行 setTargetMpState 对应的组件业务步骤；调用 this.setState。
   * 调用线索：this.setState。
   */
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
  /** @eyes-analysis
   * 执行 onIsMobileChanged 对应的组件业务步骤；调用 this._updateTitleAndCloseBtnParent, this.setIsDraggable, this.isMobileChangedCallback；写入 _isMobile。
   * 状态写入：_isMobile。
   * 调用线索：this._updateTitleAndCloseBtnParent、this.isMobileChangedCallback、this.setIsDraggable。
   */
  onIsMobileChanged(isMobile) {
    this._isMobile = isMobile;
    this._updateTitleAndCloseBtnParent(this._isMobile);
    this.setIsDraggable(!this._isMobile);
    "function" == typeof this.isMobileChangedCallback && this.isMobileChangedCallback(this._isMobile);
  }
  /** @eyes-analysis
   * 执行 _updateTitleAndCloseBtnParent 对应的组件业务步骤；调用 this.app._dynamicElement.prepend, Area.append。
   * 调用线索：dragArea.append、this.app._dynamicElement.prepend。
   */
  _updateTitleAndCloseBtnParent(t = this._isMobile) {
    const {
      dpTitle: dpTitle,
      dpCloseButton: dpCloseButton,
      dragArea: dragArea
    } = this._children;
    t ? this.app._dynamicElement.prepend(dpTitle, dpCloseButton) : dragArea.append(dpTitle, dpCloseButton);
  }
  /** @eyes-analysis
   * 执行 allowBpOffset 对应的组件业务步骤。
   */
  get allowBpOffset() {
    return this._state.isDraggable && this._state.isMinimized;
  }
  /** @eyes-analysis
   * 执行 setBpCSSOffsets 对应的组件业务步骤；调用 this.app.pioneer.getInput, this._element.style.setProperty。
   * 调用线索：this._element.style.setProperty、this.app.pioneer.getInput、this.app.pioneer.getInput().getActiveViewport、this.app.pioneer.getInput().getActiveViewport().getCamera、this.distanceManager._betweenPosEntity?.getPixelSpacePosition。
   */
  setBpCSSOffsets() {
    const t = this.app.pioneer.getInput().getActiveViewport().getCamera();
    const {
      x: e = 0,
      y: i = 0
    } = this.distanceManager._betweenPosEntity?.getPixelSpacePosition(t) || {};
    this._element.style.setProperty("--d-panel-bpX", `${e}px`);
    this._element.style.setProperty("--d-panel-bpY", `${i}px`);
  }
  /** @eyes-analysis
   * 执行 onLineClick 对应的组件业务步骤；调用 this.distanceManager.hideTooltip, this.setState, this.distanceManager.getOffsetU, this.distanceManager.on3dLineClick, this.distanceManager.setHoldU。
   * 调用线索：clearTimeout、this.distanceManager.getOffsetU、this.distanceManager.hideTooltip、this.distanceManager.on3dLineClick、this.distanceManager.setHoldU等。
   */
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
  /** @eyes-analysis
   * 执行 onLineMouseMove 对应的组件业务步骤；调用 this.setLineGraphicDotOffset。
   * 调用线索：this.setLineGraphicDotOffset。
   */
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
  /** @eyes-analysis
   * 执行 onLineMouseEnter 对应的组件业务步骤；调用 this.setLineGraphicDimensions。
   * 调用线索：this.setLineGraphicDimensions。
   */
  onLineMouseEnter() {
    this.setLineGraphicDimensions();
  }
  /** @eyes-analysis
   * 执行 onLineMouseLeave 对应的组件业务步骤；调用 this.setLineGraphicDotOffset。
   * 调用线索：this.setLineGraphicDotOffset。
   */
  onLineMouseLeave() {
    this.setLineGraphicDotOffset(null);
  }
  /** @eyes-analysis
   * 执行 setLineGraphicDimensions 对应的组件业务步骤；调用 Graphic.getBoundingClientRect。
   * 状态写入：_lineGraphic.height、_lineGraphic.top。
   * 调用线索：lineGraphic.getBoundingClientRect。
   */
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
  /** @eyes-analysis
   * 执行 _onLineTouchStart 对应的组件业务步骤；调用 this.setState, this.setLineGraphicDimensions, this.distanceManager.showTooltip。
   * 调用线索：clearTimeout、t.preventDefault、this.distanceManager.showTooltip、this.setLineGraphicDimensions、this.setState。
   */
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
  /** @eyes-analysis
   * 执行 _onLineTouchEnd 对应的组件业务步骤；调用 this.setState, this.distanceManager.hideTooltip。
   * 状态写入：_touchOptions.activeTimeout。
   * 调用线索：setTimeout、this.distanceManager.hideTooltip、this.setState。
   */
  _onLineTouchEnd() {
    this._touchOptions.activeTimeout = setTimeout(() => {
      this.setState({
        touchActiveClass: ""
      });
      this.distanceManager.hideTooltip();
    }, this._touchOptions.activeDelay);
  }
  /** @eyes-analysis
   * 执行 setLineGraphicDotPos 对应的组件业务步骤。
   * 状态写入：_lineGraphic.dotPos。
   * 调用线索：lineGraphic?.style.setProperty、parseFloat、t.toFixed。
   */
  setLineGraphicDotPos(t) {
    const {
      lineGraphic: lineGraphic
    } = this._children;
    const i = parseFloat(t.toFixed(5));
    const s = 0 === i || 1 === i ? i : t;
    this._lineGraphic.dotPos = s;
    lineGraphic?.style.setProperty("--focus-dot-pos", 100 * t + "%");
  }
  /** @eyes-analysis
   * 执行 setLineGraphicDotOffset 对应的组件业务步骤。
   * 调用线索：lineGraphic?.style.setProperty。
   */
  setLineGraphicDotOffset(t) {
    const {
      lineGraphic: lineGraphic
    } = this._children;
    const i = null !== t ? 100 * t + "%" : "unset";
    lineGraphic?.style.setProperty("--focus-dot-offset", i);
  }
  /** @eyes-analysis
   * 重排响应式界面；调用 Eyes.AppUtils.isMobile, this.onIsMobileChanged, this.removeAllEvents, this.addEvents, this.setPanelProps。
   * 调用线索：Eyes.AppUtils.isMobile、this.addEvents、this.onIsMobileChanged、this.removeAllEvents、this.setPanelProps。
   */
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
  /** @eyes-analysis
   * 执行 show 对应的组件业务步骤；调用 this.app.getManager, this.toggleIsMinimized。
   * 状态写入：distanceManager。
   * 调用线索：this.app.getManager、this.toggleIsMinimized。
   */
  show() {
    this.distanceManager ??= this.app.getManager("distance");
    this.toggleIsMinimized(null, false);
  }
  /** @eyes-analysis
   * 执行 hide 对应的组件业务步骤；调用 this.toggleIsMinimized, Element.getAttribute。
   * 调用线索：parentElement.getAttribute、this.toggleIsMinimized。
   */
  hide() {
    this.toggleIsMinimized(null, true);
    const {
      parentElement: parentElement
    } = this.element;
    "componentContainer" === parentElement.getAttribute("key") && (parentElement.style.opacity = 1, parentElement.style.visibility = "visible");
  }
  /** @eyes-analysis
   * 挂载 DOM 并登记窗口和业务订阅；调用 super.__enable, this.resize。
   * 调用线索：super.__enable、this.resize。
   */
  __enable() {
    super.__enable();
    this.resize(null, true);
  }
  /** @eyes-analysis
   * 卸载 DOM 并取消业务订阅；调用 this.removeAllEvents, this._updateTitleAndCloseBtnParent, super.__disable。
   * 调用线索：super.__disable、this._updateTitleAndCloseBtnParent、this.removeAllEvents。
   */
  __disable() {
    this.removeAllEvents();
    this._updateTitleAndCloseBtnParent(false);
    super.__disable();
  }
}
DistancePanel.html = getDistancePanelTemplate();
export { DistancePanel };
