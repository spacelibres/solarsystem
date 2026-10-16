// Recovered from app.js:1566763-1579808.
import * as Eyes from "../../framework/eyes/index.js";
import "../../styles/extracted/DistancePanelStyles.js";
import DistancePanelTemplate from "../templates/DistancePanelTemplate.html";
var getDistancePanelTemplate = () => DistancePanelTemplate;
const selectTargetMessage = "« Select or search for a target »";
/* 测距计算归 distance 管理器，面板持有拖动坐标、移动布局与线条交互状态。按下时登记窗口移动/抬起监听，抬起保存限位坐标并解除监听；屏幕中心改变时补偿面板位置。线条点击吸附到源、中心或目标，再由管理器转换到三维线偏移。原 removeAllEvents 的 hover 监听添加行为保留，未在去混淆中修复。 */
class DistancePanel extends Eyes.BaseComponent {
  constructor(app, options = {}) {
    super(app, null, {
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
      input: targetInput
    } = this.targetSearch?._children || {};
    input && input.setAttribute("placeholder", "Name of source");
    targetInput && targetInput.setAttribute("placeholder", "Name of target");
    this.sourceSearch.show();
    this.targetSearch.show();
  }
  onMouseDown(mouseEvent) {
    this.setCurrentlyDragging(true);
    this.setDownXY(mouseEvent.clientX, mouseEvent.clientY);
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("mouseup", this.onMouseUp);
  }
  onMouseMove(mouseEvent) {
    if (1 === mouseEvent.buttons && this.currentlyDragging) {
      const {
        newX: newX,
        newY: newY
      } = this._calcNewXandY(mouseEvent.clientX, mouseEvent.clientY);
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
  onTouchStart(touchEvent) {
    this.setCurrentlyDragging(true);
    const {
      clientX: clientX,
      clientY: clientY
    } = touchEvent.touches[0];
    this.setDownXY(clientX, clientY);
    window.addEventListener("touchmove", this.onTouchMove);
    window.addEventListener("touchend", this.onTouchEnd);
  }
  onTouchMove(touchEvent) {
    if (this.currentlyDragging) {
      const {
        clientX: clientX,
        clientY: clientY
      } = touchEvent.touches[0];
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
  _calcNewXandY(pointerX, pointerY) {
    const {
      downX: downX,
      downY: downY,
      dragX: dragX,
      dragY: dragY
    } = this._dragState;
    return {
      newX: dragX + (pointerX - downX),
      newY: dragY + (pointerY - downY)
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
  toggleUnitSystem(clickEvent) {
    clickEvent.stopPropagation();
    this.distanceManager?.toggleCurrentUnitSystem();
    this.distanceManager?.updateMeasurement(false);
  }
  onResultClick(clickEvent) {
    const {
      resultText: resultText
    } = this._state;
    const isMobileCollapsed = Boolean(this._isMobile && this._cMenuParent) && !this._cMenuParent._state.isExpanded;
    const needsTarget = resultText === selectTargetMessage;
    isMobileCollapsed && this._cMenuParent.setExpanded(true);
    needsTarget ? this.targetSearch?.onInputFocus() : isMobileCollapsed || this._cMenuParent?.setExpanded(true);
  }
  onContainerClick(clickEvent) {
    clickEvent.target === this.element && (this.sourceSearch?.reset(), this.targetSearch?.reset());
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
  setIsSearching(isSearching) {
    this.setState({
      isSearchingClass: isSearching ? "searching" : ""
    });
  }
  setScreenCenter(centerX, centerY) {
    this._dragState.screenCenterX = centerX;
    this._dragState.screenCenterY = centerY;
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
    const currentCenterX = .5 * window.innerWidth;
    const currentCenterY = .5 * window.innerHeight;
    const centerDeltaX = currentCenterX - screenCenterX;
    const centerDeltaY = currentCenterY - screenCenterY;
    const isLandscape = Eyes.AppUtils.isLandscape();
    const desiredX = null !== dragX ? dragX + centerDeltaX : currentCenterX - width * (isLandscape ? 1.5 : .5);
    const desiredY = null !== dragY ? dragY + centerDeltaY : currentCenterY - height * (isLandscape ? .5 : -1);
    const {
      limitX: limitX,
      limitY: limitY
    } = this.getLimitedXandY(desiredX, desiredY);
    this.setDragXY(limitX, limitY);
    isDraggable ? (this.setTransformCSSVars(limitX, limitY), this.calcMaxMinBtnPos(limitX)) : (this.setTransformCSSVars(), this.calcMaxMinBtnPos());
    this.setScreenCenter(currentCenterX, currentCenterY);
  }
  get currentlyDragging() {
    return this._dragState.currentlyDragging;
  }
  setCurrentlyDragging(isDragging) {
    this._dragState.currentlyDragging = isDragging;
    this.setState({
      currDraggingClass: isDragging ? "dragging" : ""
    });
  }
  setDownXY(pointerX, pointerY) {
    this._dragState.downX = pointerX;
    this._dragState.downY = pointerY;
  }
  setLimitXY(limitX, limitY) {
    this._dragState.limitX = limitX;
    this._dragState.limitY = limitY;
  }
  setDragXY(dragX = this._dragState.x, dragY = this._dragState.y) {
    this._dragState.dragX = dragX;
    this._dragState.dragY = dragY;
  }
  setTransformCSSVars(panelX, panelY) {
    const clearTransform = void 0 === panelX && void 0 === panelY;
    this._element.style.setProperty("--d-panel-x", clearTransform ? "" : `${panelX}px`);
    this._element.style.setProperty("--d-panel-y", clearTransform ? "" : `${panelY}px`);
  }
  setCanMinimize(canMinimize) {
    this.setState({
      canMinimizeClass: canMinimize ? "minimizable" : ""
    });
  }
  setSwapButtonVisible(isVisible) {
    this.setState({
      swapIsVisibleClass: isVisible ? "" : "hidden"
    });
  }
  calcMaxMinBtnPos(panelX) {
    const {
      width: width
    } = this._size;
    const {
      maxMinBtnPosition: maxMinBtnPosition
    } = this._state;
    const useDefaultPosition = void 0 === panelX;
    const screenMidpoint = .5 * (window.innerWidth - width);
    const buttonSide = !useDefaultPosition && panelX > screenMidpoint ? "left" : "right";
    const swapOffsetClass = "left" === buttonSide ? "offset" : "";
    buttonSide !== maxMinBtnPosition && this.setState({
      maxMinBtnPosition: buttonSide,
      swapOffsetClass: swapOffsetClass
    });
  }
  getLimitedXandY(desiredX, desiredY) {
    const {
      isExpandedClass: isExpandedClass
    } = this._state;
    const {
      width: width,
      height: height,
      padding: padding,
      expandedHeight: expandedHeight
    } = this._size;
    const minimumY = padding.top;
    const maximumX = window.innerWidth - width;
    const maximumY = window.innerHeight - (isExpandedClass ? expandedHeight : height) - padding.bottom;
    return {
      limitX: Math.min(Math.max(0, desiredX), maximumX),
      limitY: Math.min(Math.max(minimumY, desiredY), maximumY)
    };
  }
  toggleIsMinimized(clickEvent, requestedMinimized) {
    const {
      isMinimized: isMinimized
    } = this._state;
    const {
      maxMinButton: maxMinButton
    } = this._children;
    const shouldMinimize = requestedMinimized ?? !isMinimized;
    const minimizedClass = shouldMinimize ? "minimized" : "maximized";
    const buttonIconClass = shouldMinimize ? "icon-plus" : "icon-minus";
    this.setState({
      isMinimized: shouldMinimize,
      isMinimizedClass: minimizedClass,
      maxMinIconClass: buttonIconClass
    });
    const buttonAltText = (shouldMinimize ? "Maximize" : "Minimize") + " distance tool panel";
    maxMinButton.setAttribute("alt", buttonAltText);
  }
  setIsDraggable(isDraggable) {
    this.setState({
      isDraggable: isDraggable,
      isDraggableClass: isDraggable ? "draggable" : "fixed"
    });
  }
  setIsLoading(isLoading) {
    this.setState({
      isLoadingClass: isLoading ? "" : "hidden"
    });
  }
  setResult({
    text: text,
    unit: unit,
    relText: relText,
    relUnit: relUnit,
    isRelVelocity = false,
    isDistance = false
  } = {}) {
    clearTimeout(this.app.getManager("distance")?.errorResultTimeout);
    this.setState({
      resultText: text ?? selectTargetMessage,
      resultUnit: unit ?? "",
      resultTextClass: isDistance ? "distance monospace" : "info semi small color gray med",
      relVelocityText: relText ?? "",
      relVelocityUnit: relUnit ?? "",
      relVelocityClass: isRelVelocity ? "rel-velocity monospace" : "hidden",
      isExpandedClass: isRelVelocity ? "expanded" : "",
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
    this._element.style.setProperty("--d-panel-height", isDraggable ? `${isRelVelocity ? expandedHeight : height}px` : "");
    this._element.style.setProperty("--d-panel-height-factor", isDraggable ? `${heightFactor}rem` : "");
  }
  setLightTime(lightTimeText) {
    const {
      heightFactor: heightFactor
    } = this._size;
    const {
      isDraggable: isDraggable
    } = this._state;
    this._element.style.setProperty("--d-panel-height-factor", isDraggable ? `${lightTimeText ? heightFactor + 1.5 : heightFactor}rem` : "");
    lightTimeText ? this.setState({
      lightTimeVisibleClass: "",
      lightTimeText: lightTimeText ?? ""
    }) : this.setState({
      lightTimeVisibleClass: "hidden",
      lightTimeText: ""
    });
  }
  setSourceText(sourceText) {
    const {
      input: input
    } = this.sourceSearch?._children || {};
    input && (input.value = sourceText);
    sourceText && this.sourceSearch?.setConfig({
      defaultText: sourceText
    });
  }
  setSourceMpState(measurePointName) {
    const sourceArticle = "Moon" === this.distanceManager?.sourceDisplayName ? " the" : "";
    const fromHtml = measurePointName ? `<span>from the <span class="mp-highlight">${measurePointName}</span> of${sourceArticle}</span>` : `<span>from${sourceArticle}</span>`;
    const toggleVisibleClass = measurePointName ? "" : "hidden";
    const measurePointClass = measurePointName || "no-toggle";
    this.setState({
      fromText: fromHtml,
      showSourceMPToggleClass: toggleVisibleClass,
      sourceMpClass: measurePointClass
    });
  }
  setTargetText(targetText) {
    const {
      input: input
    } = this.targetSearch?._children || {};
    input && (input.value = targetText ?? "");
    "string" == typeof targetText && this.targetSearch?.setConfig({
      defaultText: targetText
    });
  }
  setTargetMpState(measurePointName) {
    const targetArticle = "Moon" === this.distanceManager?.targetDisplayNames[0] ? " the" : "";
    const toHtml = measurePointName ? `<span>to the <span class="mp-highlight">${measurePointName}</span> of${targetArticle}</span>` : `<span>to${targetArticle}</span>`;
    const toggleVisibleClass = measurePointName ? "" : "hidden";
    const measurePointClass = measurePointName || "no-toggle";
    this.setState({
      toText: toHtml,
      showTargetMPToggleClass: toggleVisibleClass,
      targetMpClass: measurePointClass
    });
  }
  onIsMobileChanged(isMobile) {
    this._isMobile = isMobile;
    this._updateTitleAndCloseBtnParent(this._isMobile);
    this.setIsDraggable(!this._isMobile);
    "function" == typeof this.isMobileChangedCallback && this.isMobileChangedCallback(this._isMobile);
  }
  _updateTitleAndCloseBtnParent(isMobile = this._isMobile) {
    const {
      dpTitle: dpTitle,
      dpCloseButton: dpCloseButton,
      dragArea: dragArea
    } = this._children;
    isMobile ? this.app._dynamicElement.prepend(dpTitle, dpCloseButton) : dragArea.append(dpTitle, dpCloseButton);
  }
  get allowBpOffset() {
    return this._state.isDraggable && this._state.isMinimized;
  }
  setBpCSSOffsets() {
    const viewportCamera = this.app.pioneer.getInput().getActiveViewport().getCamera();
    const {
      x: betweenPixelX = 0,
      y: betweenPixelY = 0
    } = this.distanceManager._betweenPosEntity?.getPixelSpacePosition(viewportCamera) || {};
    this._element.style.setProperty("--d-panel-bpX", `${betweenPixelX}px`);
    this._element.style.setProperty("--d-panel-bpY", `${betweenPixelY}px`);
  }
  onLineClick(clickEvent, requestedPosition) {
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
    if (!hasTarget && void 0 === requestedPosition && (null === clickEvent || clickEvent.target !== lineGraphic)) return;
    clearTimeout(this._touchOptions.activeTimeout);
    this.distanceManager.hideTooltip();
    const normalizedPosition = requestedPosition ?? (clickEvent.clientY - top) / height;
    const snappedPosition = normalizedPosition < .4 ? 0 : normalizedPosition > .6 ? 1 : .5;
    const dotPositionClass = 1 === snappedPosition ? "target-dot" : .5 === snappedPosition ? "centered-dot" : "source-dot";
    this.setState({
      dotPosClass: dotPositionClass,
      touchActiveClass: ""
    });
    const offsetPosition = this.distanceManager.getOffsetU(snappedPosition);
    this.distanceManager.on3dLineClick(null, offsetPosition);
    this.distanceManager.setHoldU(snappedPosition);
  }
  onLineMouseMove(mouseEvent) {
    const {
      lineGraphic: lineGraphic
    } = this._children;
    const {
      top: top,
      height: height
    } = this._lineGraphic;
    if (mouseEvent.target !== lineGraphic) return;
    const {
      clientY: clientY
    } = mouseEvent;
    const normalizedPosition = (clientY - top) / height;
    const snappedPosition = normalizedPosition < .4 ? 0 : normalizedPosition > .6 ? 1 : .5;
    this.setLineGraphicDotOffset(snappedPosition);
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
  _onLineTouchStart(touchEvent) {
    clearTimeout(this._touchOptions.activeTimeout);
    const {
      touchActiveClass: touchActiveClass
    } = this._state;
    const {
      hasTarget: hasTarget
    } = this.distanceManager;
    hasTarget && !touchActiveClass && (touchEvent.preventDefault(), this.setState({
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
  setLineGraphicDotPos(normalizedPosition) {
    const {
      lineGraphic: lineGraphic
    } = this._children;
    const roundedPosition = parseFloat(normalizedPosition.toFixed(5));
    const storedPosition = 0 === roundedPosition || 1 === roundedPosition ? roundedPosition : normalizedPosition;
    this._lineGraphic.dotPos = storedPosition;
    lineGraphic?.style.setProperty("--focus-dot-pos", 100 * normalizedPosition + "%");
  }
  setLineGraphicDotOffset(normalizedOffset) {
    const {
      lineGraphic: lineGraphic
    } = this._children;
    const offsetValue = null !== normalizedOffset ? 100 * normalizedOffset + "%" : "unset";
    lineGraphic?.style.setProperty("--focus-dot-offset", offsetValue);
  }
  resize(resizeEvent, forceUpdate = false) {
    const {
      isTouch: isTouch,
      canHover: canHover
    } = this.app;
    const isMobile = Eyes.AppUtils.isMobile();
    const mobileChanged = this._isMobile !== isMobile;
    const touchChanged = this._isTouch !== isTouch;
    const hoverChanged = this._canHover !== canHover;
    (forceUpdate || mobileChanged) && this.onIsMobileChanged(isMobile);
    (forceUpdate || touchChanged || hoverChanged || mobileChanged) && (this.removeAllEvents(), this.addEvents());
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
