// Recovered from app.js:1582969-1621402.
import MomentSecondary from "../../vendor/modules/MomentSecondary.cjs";
import * as Eyes from "../../framework/eyes/index.js";
import "../../styles/extracted/EventsTimelineStyles.js";
import EventsTimelineTemplate from "../templates/EventsTimelineTemplate.html";
var getMomentSecondary = () => MomentSecondary;
var getEventsTimelineTemplate = () => EventsTimelineTemplate;
const {
  deepMerge: deepMerge,
  debounce: debounce,
  throttle: throttle,
  formatNumber: formatNumber
} = Eyes.AppUtils;
const markerBaseWidth = "1px";
/* 时间线分为总览标记与放大 focusPanel 两个坐标空间，各自保存 hover/touch/双击和时间指示线状态。事件按像素间隔与容量聚类，焦点区另做碰撞让位；时间与像素换算必须保留各自 padding 和范围。动画先退出旧簇、重建焦点节点再进入新簇，onfinish 解除 animating 门闩；鼠标和触摸的方向、阈值与延迟提示独立。_setEvents 只复制数组，仍会把传入事件对象的起止值改为 Moment，保留这项原有所有权行为。 */
class EventsTimeline extends Eyes.BaseComponent {
  constructor(app, element, options = {}) {
    super(app, element);
    this._settings = this._app.getComponent("settings");
    this.defaultOptions = {
      marginPercent: 2,
      events: {
        clusterCoeff: 8e3,
        clusterMin: 3,
        clusterMax: 25,
        clusterThresh: 1.5
      },
      focusPanel: {
        padding: 5,
        tickChar: "|",
        tickMult: .8,
        events: {
          width: 2,
          threshold: 1
        },
        touch: {
          leftOffset: 70
        }
      },
      doubleThreshold: 5,
      doubleTimeout: 400,
      tapFadeDelay: 2e3,
      classNames: {
        clusterMarker: "cluster-marker",
        eventMarker: "event-marker",
        eventStatic: "event-static",
        clusterEventLine: "cluster-line {{clusterLineVisibleClass}} {{clusterLineColorClass}}",
        focusPanel: {
          eventLine: "event-line {{fpEventTextSideClass}}"
        }
      },
      tooltips: {},
      animation: {
        keyframes: {
          fpTicks: {
            zoom: [{
              transform: "scale(0,0)"
            }, {
              transform: "scale(0.1,0.1)"
            }, {
              transform: "scale(1,1)"
            }],
            left: [{
              transform: "translateX(0%)"
            }, {
              transform: "translateX(-50%)",
              offset: .49
            }, {
              transform: "translateX(50%)",
              offset: .5
            }, {
              transform: "translateX(0%)"
            }],
            right: [{
              transform: "translateX(0%)"
            }, {
              transform: "translateX(50%)",
              offset: .49
            }, {
              transform: "translateX(-50%)",
              offset: .5
            }, {
              transform: "translateX(0%)"
            }]
          },
          fpLine: [{
            opacity: .6
          }, {
            opacity: 0
          }],
          fpEvents: {
            zoom: [{
              transform: "translateY(50%) scale(var(--fpMarker-scaleX), 0)"
            }, {
              transform: "translateY(0) scale(var(--fpMarker-scaleX), 1)",
              offset: .3
            }, {
              transform: "scale(1,1) rotate(0.01deg)"
            }]
          }
        },
        timings: {
          zoom: {
            duration: 1200,
            delay: 200,
            fill: "forwards",
            easing: "cubic-bezier(0.3, 0, 0, 1)"
          }
        }
      }
    };
    this.setState({
      isVisible: false,
      isVisibleClass: "hidden",
      targetLineVisibleClass: "hidden",
      targetDateVisibleClass: "hidden",
      viewingLineVisibleClass: "",
      targetDateColorClass: "yellow",
      clusterLineVisibleClass: "hidden",
      clusterLineColorClass: "white",
      rangeDatesVisibleClass: "",
      resetZoomVisibleClass: "hidden",
      fpVisibleClass: "hidden",
      focusContentVisibleClass: "hidden",
      fpTicksVisibleClass: "hidden",
      fpTargetLineVisibleClass: "hidden",
      fpViewingLineVisibleClass: "hidden",
      fpEventName: "",
      fpEventTime: "",
      fpArrowVisible: "hidden"
    });
    this._localState = {
      target: null,
      title: null,
      time: null,
      dates: {},
      isTouch: this._app.isTouch,
      activeMarkerIndex: -1,
      animMarkerIndex: -1,
      currentHoverMarkerIndex: -1,
      activeEventId: null,
      viewingLineX: 0,
      updateViewingLine: false,
      toolTipTimeout: null,
      timelinebar: {
        active: false,
        width: null,
        height: null,
        left: null,
        viewingLineX: 0,
        touchLineX: 0,
        displayedTip: false,
        clickedOnce: false,
        doubleClick: false,
        fadeTimeout: null
      },
      focusPanel: {
        enabled: false,
        calcWidths: false,
        totalWidth: null,
        contentWidth: null,
        arrowWidth: null,
        left: null,
        viewingLineX: 0,
        active: false,
        animating: false,
        wheelX: 0,
        touchX: 0,
        touchDeltaX: 0,
        touchLineX: 0,
        clickEnabled: true,
        displayedTip: false,
        clickedOnce: false,
        doubleClick: false
      }
    };
    this._events = [];
    this._markers = [];
    this._tooltips = {};
    this._animations = {};
    this.bindFunctions(["_onTimelineMouseLeave", "_onTimelineMouseMove", "_onTimelineClick", "_onMarkerMouseEnter", "_onMarkerMouseLeave", "_onMarkerMouseMove", "_onViewClick", "_onFpMouseEnter", "_onFpMouseLeave", "_onFpEventMouseOver", "_onFpTicksMouseEnter", "_onFpTicksMouseMove", "_onFpTicksMouseLeave", "_onFpTicksClick", "_onFpWheel", "_onFpTouchStart", "_onFpTouchMove", "_onFpTouchEnd", "_onFpTicksTouchStart", "_onFpTicksTouchMove", "_onFpTicksTouchEnd", "_onMarkerTouch", "_onDateTouchStart", "_onDateTouchEnd", "_onFpEventTouch", "_onFpArrowClick", "_onTimelineTouchStart", "_onTimelineTouchMove", "_onTimelineTouchEnd", "_onOutsideTouch", "_onResize", "_setResizeTimeout", "update"]);
    this._setViewingLineXThrottled = throttle(this._setViewingLineX, 500);
    this._onFpTouchMoveThrottled = throttle(this._onFpTouchMove, 100);
    this._showToolTipDebounced = debounce(this._showToolTip, 2e3);
    this._resizeDebounced = debounce(this._onResize, 200);
    this._onMarkerMouseEnterDebounced = debounce(this._onMarkerMouseEnter, 200);
    this._onMarkerMouseLeaveDebounced = debounce(this._onMarkerMouseLeave, 200);
    this._onTimelineMouseLeaveDebounced = debounce(this._onTimelineMouseLeave, 200);
    this._onFpMouseLeaveDebounced = debounce(this._onFpMouseLeave, 200);
    this._setEventNameDebounced = debounce(this._setEventName, 200);
    window.timeline = this;
    this._resizeTimeout = null;
    this.setOptions({
      ...options
    }, true);
    this.routeManager = this._app.getManager("router");
  }
  init() {
    super.init();
    const {
      tooltips: tooltips
    } = this._options;
    const {
      isTouch: isTouch
    } = this._localState;
    const {
      timelinebar: timelinebar
    } = this._children;
    const timelineTooltipOptions = isTouch ? {
      props: {
        content: tooltips.tap,
        interactive: true,
        appendTo: this._element,
        trigger: "manual",
        touch: true
      },
      onclick: this._onViewClick
    } : {
      props: {
        content: tooltips.click,
        followCursor: "initial",
        appendTo: this._element,
        trigger: "manual",
        touch: true
      }
    };
    this._tooltips.timelinebar = this._settings.addTooltips([timelinebar], timelineTooltipOptions);
    window.ontouchend = this._onOutsideTouch;
    this._callbackRegistry.push({
      emitter: this._app.getManager("time"),
      event: "update",
      callback: this.update
    }, {
      emitter: this._app.getComponent("contentPanel"),
      event: "expandtoggle",
      callback: () => this._setResizeTimeout()
    });
  }
  _addFpTooltips() {
    if (this._tooltips.focusPanel) return;
    const {
      isTouch: isTouch
    } = this._localState;
    const {
      focusPanel: focusPanel,
      fpTicksContainer: fpTicksContainer
    } = this._children;
    const {
      tooltips: tooltips
    } = this._options;
    const tooltipAnchor = isTouch ? focusPanel : fpTicksContainer;
    const focusTooltipOptions = isTouch ? {
      props: {
        content: tooltips.tap,
        interactive: true,
        appendTo: tooltipAnchor,
        offset: [10, 0],
        trigger: "manual",
        touch: true
      },
      onclick: this._onViewClick
    } : {
      props: {
        content: tooltips.click,
        followCursor: "initial",
        appendTo: this._element,
        trigger: "manual",
        touch: true
      }
    };
    this._tooltips.focusPanel = this._settings.addTooltips([tooltipAnchor], focusTooltipOptions);
  }
  _createAnimation(element, keyframes, timingOptions) {
    const keyframeEffect = new KeyframeEffect(element, keyframes, timingOptions);
    return new Animation(keyframeEffect, element.ownerDocument.timeline);
  }
  _depopulateFocusPanel() {
    const {
      fpContent: fpContent
    } = this._children;
    for (; fpContent.firstChild;) fpContent.removeChild(fpContent.firstChild);
  }
  _populateFocusPanel(marker) {
    const {
      focusPanel: focusPanel,
      activeEventId: activeEventId,
      isTouch: isTouch
    } = this._localState;
    const {
      timelinebar: timelinebar
    } = this._localState;
    const {
      focusPanel: focusOptions,
      classNames: classNames
    } = this._options;
    const {
      fpContent: fpContent,
      fpMask: fpMask
    } = this._children;
    focusPanel.contentWidth || (focusPanel.contentWidth = timelinebar.width);
    const paddingPixels = .01 * focusOptions.padding * focusPanel.contentWidth;
    const minimumGap = .01 * focusOptions.events.threshold * focusPanel.contentWidth;
    const eventHalfWidth = .5 * focusOptions.events.width;
    const usableWidth = focusPanel.contentWidth - 2 * paddingPixels;
    marker.fpEventXs = [];
    const eventPositions = marker.events.map((eventInfo, eventIndex) => [this._calcXfromTime(eventInfo.start, marker.min, marker.timeRange, usableWidth) + paddingPixels, 0 !== eventIndex, eventInfo.id === activeEventId]);
    for (let positionIndex = 0; positionIndex < eventPositions.length - 1; positionIndex++) {
      const currentPosition = eventPositions[positionIndex];
      const nextPosition = eventPositions[positionIndex + 1];
      const [currentX, canShiftCurrent] = currentPosition;
      const [nextX] = nextPosition;
      const gapPixels = nextX - eventHalfWidth - (currentX + eventHalfWidth);
      if (gapPixels < minimumGap) {
        const missingGap = minimumGap - gapPixels;
        if (canShiftCurrent) {
          const halfGap = .5 * missingGap;
          currentPosition[0] -= halfGap;
          nextPosition[0] += halfGap;
        } else nextPosition[0] += missingGap;
        nextPosition[1] = false;
      }
    }
    marker.fpEventElements = eventPositions.map(eventPosition => {
      const [eventX,, isActiveEvent] = eventPosition;
      marker.fpEventXs.push(eventX);
      const eventElement = document.createElement("div");
      eventElement.className = `${classNames.focusPanel.eventLine} ${isActiveEvent ? "active" : ""}`;
      isTouch && (eventElement.ontouchstart = touchEvent => touchEvent.preventDefault(), eventElement.ontouchend = this._onFpEventTouch);
      this._app.canHover && (eventElement.onmouseenter = this._onFpEventMouseOver, eventElement.onclick = clickEvent => {
        clickEvent.preventDefault();
        clickEvent.stopPropagation();
        this._onViewClick(clickEvent);
      });
      eventElement.style.setProperty("width", `${focusOptions.events.width}px`);
      eventElement.style.setProperty("left", `${eventX}px`);
      Array.from(fpContent.children).includes(eventElement) || fpContent.appendChild(eventElement);
      return eventElement;
    });
    fpMask.onclick = clickEvent => {
      clickEvent.preventDefault();
      clickEvent.stopPropagation();
      this._onViewClick(clickEvent);
    };
    this._setVariables(fpContent);
  }
  _createEventsAndMarkers() {
    const {
      timelinebar: timelinebar
    } = this._localState;
    const {
      events: events
    } = this._options;
    const clusterThresholdPixels = .01 * events.clusterThresh * timelinebar.width;
    this._events.forEach((eventInfo, eventIndex) => {
      const previousEvent = this._events[eventIndex - 1];
      let startNewCluster = true;
      if (previousEvent) {
        this._calcWidthBtwnTimes(previousEvent.end, eventInfo.start) < clusterThresholdPixels && (startNewCluster = false);
      }
      this._addToCluster(eventInfo, startNewCluster);
    });
    this._markers.forEach(marker => {
      const countElement = Array.from(marker.element.children).find(childElement => childElement.classList.contains("cluster-num-events"));
      countElement && marker.events.length > 1 && countElement.appendChild(document.createTextNode(marker.events.length));
      marker.element.classList.toggle("single-event", marker.events.length < 2);
    });
  }
  _createEventElement(eventInfo) {
    const {
      classNames: classNames
    } = this._options;
    const {
      eventContainer: eventContainer
    } = this._children;
    const eventElement = document.createElement("div");
    eventElement.className = classNames.eventStatic;
    const midpointX = this._calcMidpointX(eventInfo.start, eventInfo.end);
    eventElement.style.setProperty("left", `${eventInfo.cluster ? eventInfo.leftX : midpointX}px`);
    eventContainer.appendChild(eventElement);
  }
  _addToCluster(eventInfo, startNewCluster = true) {
    const {
      classNames: classNames
    } = this._options;
    const {
      markerContainer: markerContainer
    } = this._children;
    const previousCluster = this._getLastCluster();
    const clusterCapacity = this._calcEventClusterMax();
    const isClusterFull = previousCluster && previousCluster.events.length === clusterCapacity;
    if (startNewCluster || !previousCluster || isClusterFull) {
      const markerElement = document.createElement("div");
      markerElement.className = classNames.clusterMarker;
      markerElement.ontouchstart = this._onMarkerTouch;
      markerElement.onmouseenter = this._onMarkerMouseEnterDebounced;
      markerElement.onmouseleave = this._onMarkerMouseLeaveDebounced;
      markerElement.onmousemove = this._onMarkerMouseMove;
      markerElement.onclick = clickEvent => {
        clickEvent.preventDefault();
        clickEvent.stopPropagation();
        this._onViewClick(clickEvent);
      };
      markerContainer.appendChild(markerElement);
      this._markers.push({
        cluster: true,
        element: markerElement,
        events: [eventInfo],
        fpEventElements: [],
        fpEventXs: []
      });
    } else previousCluster.events.push(eventInfo);
    const containingMarker = this._markers.find(candidateMarker => candidateMarker.events.includes(eventInfo));
    if (containingMarker && containingMarker.events.length > 1) {
      const countElement = document.createElement("div");
      countElement.classList.add("cluster-num-events");
      Array.from(containingMarker.element.children).some(childElement => childElement.classList.contains("cluster-num-events")) || containingMarker.element.appendChild(countElement);
      containingMarker.element.classList.add("cluster-dashed-line");
    }
  }
  _createClusterEventLine() {
    if (this._clusterEventLine) return;
    const {
      classNames: classNames
    } = this._options;
    this._clusterEventLine = document.createElement("div");
    this._clusterEventLine.className = classNames.clusterEventLine;
    this._children.markerContainer.appendChild(this._clusterEventLine);
  }
  _populate() {
    if (!this._events.length || "hidden" !== this._state.focusContentVisibleClass) return;
    this._destroy();
    this._createEventsAndMarkers();
    this._setMarkerPositions();
    const hasClusters = this._markers.some(marker => marker.cluster);
    this.setLocalState({
      focusPanel: {
        enabled: hasClusters
      }
    });
    hasClusters && this._createClusterEventLine();
    this._setVariables(this._children.markerContainer);
  }
  _destroy() {
    this._depopulateFocusPanel();
    const {
      markerContainer: markerContainer,
      eventContainer: eventContainer
    } = this._children;
    for (; markerContainer.firstChild;) markerContainer.removeChild(markerContainer.firstChild);
    for (; eventContainer.firstChild;) eventContainer.removeChild(eventContainer.firstChild);
    if (this._markers.length) for (const marker of this._markers) {
      marker.element.remove();
      marker.fpEventElements && marker.fpEventElements.filter(eventElement => (eventElement.remove(), false));
    }
    this._markers = [];
  }
  _setClickedOnce(stateSection, clickedOnce = true) {
    const {
      doubleTimeout: doubleTimeout
    } = this._options;
    this.setLocalState({
      [stateSection]: {
        clickedOnce: clickedOnce
      }
    });
    clickedOnce && setTimeout(() => {
      this.setLocalState({
        [stateSection]: {
          clickedOnce: false
        }
      });
    }, doubleTimeout);
  }
  _onTimelineMouseLeave(mouseEvent) {
    this._hideTooltip(false);
    const {
      focusPanel: focusPanel
    } = this._localState;
    this.setState({
      targetLineVisibleClass: "hidden",
      targetDateVisibleClass: focusPanel.active ? "" : "hidden",
      rangeDatesVisibleClass: focusPanel.active ? "hidden" : ""
    });
    this.setLocalState({
      timelinebar: {
        active: false
      }
    });
  }
  _onTimelineMouseMove(mouseEvent) {
    if (this._hideTooltip(), this._onMarkerMouseEnterDebounced.cancel(), this._resizeTimeout) return;
    const {
      timelinebar: timelinebar
    } = this._localState;
    const {
      start: start,
      end: end
    } = this._options;
    const timelineX = mouseEvent.clientX - timelinebar.left;
    const hoverTime = this._calcTimefromTimelineX(timelineX);
    const outsideTimeRange = hoverTime.isBefore(start) || hoverTime.isAfter(end);
    this.setState({
      targetLineVisibleClass: outsideTimeRange ? "hidden" : "",
      targetDateVisibleClass: outsideTimeRange ? "hidden" : "",
      targetDateColorClass: "yellow",
      rangeDatesVisibleClass: "hidden"
    });
    this.setLocalState({
      timelinebar: {
        active: true
      },
      focusPanel: {
        active: false
      }
    });
    outsideTimeRange || (this._setDateAndPosition(hoverTime, timelineX), mouseEvent.target === this._children.timelinebar && this._showToolTipDebounced());
  }
  _onTimelineClick(clickEvent) {
    if (clickEvent.target !== this._children.timelinebar) return;
    const {
      timelinebar: timelinebar
    } = this._localState;
    const timelineX = clickEvent.clientX - timelinebar.left;
    const selectedTime = this._calcTimefromTimelineX(timelineX);
    this.goToTime(selectedTime);
    this.setLocalState({
      time: selectedTime.valueOf()
    });
  }
  _onMarkerMouseEnter(mouseEvent) {
    const {
      focusPanel: focusPanel,
      animMarkerIndex: animMarkerIndex,
      activeMarkerIndex: activeMarkerIndex
    } = this._localState;
    const {
      currentHoverMarkerIndex: currentHoverMarkerIndex
    } = this._localState;
    const previousHoverMarker = this._markers[currentHoverMarkerIndex];
    const hoveredMarker = this._markers.find(candidateMarker => candidateMarker.element === mouseEvent.target) || this._markers[activeMarkerIndex];
    const hoveredMarkerIndex = this._markers.indexOf(hoveredMarker);
    const animatedMarker = this._markers[animMarkerIndex];
    if (this.setLocalState({
      currentHoverMarkerIndex: hoveredMarkerIndex
    }), previousHoverMarker?.element.style.setProperty("width", markerBaseWidth), focusPanel.active && !mouseEvent.force) return;
    this._hideTooltip();
    this.setState({
      targetLineVisibleClass: "hidden",
      targetDateVisibleClass: "hidden",
      targetDateColorClass: "white",
      fpVisibleClass: "",
      rangeDatesVisibleClass: "hidden",
      fpTargetLineVisibleClass: "hidden",
      fpViewingLineVisibleClass: "hidden"
    });
    if (this._app.getComponent("eventsBlock").setState({
      isIntroLabelVisible: "invisible"
    }), Eyes.AppUtils.isMobilePortrait() && this._settings?.hide(), this.setLocalState({
      activeMarkerIndex: hoveredMarkerIndex,
      animMarkerIndex: hoveredMarker?.cluster ? hoveredMarkerIndex : this._localState.animMarkerIndex,
      ...(!hoveredMarker?.cluster && {
        activeEventId: hoveredMarker ? hoveredMarker.events[0].id : this._localState.activeEventId
      })
    }), this._markers.forEach(marker => this._setActive(marker.element, marker === hoveredMarker)), hoveredMarker) if (hoveredMarker.cluster) {
      if (animatedMarker === hoveredMarker) return;
      this._setFocusPanelPos(hoveredMarker);
    } else {
      const eventInfo = hoveredMarker.events[0];
      this._setEventName(eventInfo.title, eventInfo.start);
      this._setDateAndPosition(eventInfo.start, hoveredMarker.leftX);
    }
    previousHoverMarker && previousHoverMarker.events?.length > 1 && (previousHoverMarker.element.children[0].innerHTML = previousHoverMarker.events.length);
    hoveredMarker && (hoveredMarker.element.style.setProperty("width", "3px"), hoveredMarker.events?.length > 1 && (hoveredMarker.element.children[0].innerHTML = "+"));
  }
  _onMarkerMouseLeave() {
    this._resetStates();
    const {
      currentHoverMarkerIndex: currentHoverMarkerIndex
    } = this._localState;
    const hoveredMarker = this._markers[currentHoverMarkerIndex];
    hoveredMarker && (hoveredMarker.element.style.setProperty("width", markerBaseWidth), hoveredMarker.events?.length > 1 && (hoveredMarker.element.children[0].innerHTML = hoveredMarker.events.length));
  }
  _onMarkerMouseMove(mouseEvent) {
    mouseEvent.stopPropagation();
    this._onFpMouseLeaveDebounced.cancel();
    this._onMarkerMouseLeaveDebounced.cancel();
    const {
      timelinebar: timelinebar,
      activeEventId: activeEventId,
      activeMarkerIndex: activeMarkerIndex,
      animMarkerIndex: animMarkerIndex
    } = this._localState;
    const hoveredMarker = this._markers.find(candidateMarker => {
      let singleEventParent;
      mouseEvent.target.classList.contains("single-event") && (singleEventParent = mouseEvent.target.parentElement);
      return (candidateMarker.element ?? singleEventParent) === mouseEvent.target;
    });
    const timelineX = mouseEvent.clientX - timelinebar.left;
    if (hoveredMarker) {
      const eventIndex = hoveredMarker.cluster ? this._getNearestIndex(timelineX, hoveredMarker.eventXs) : 0;
      const eventInfo = hoveredMarker.events[eventIndex];
      const isCurrentEvent = activeEventId === eventInfo.id;
      const markerChanged = activeMarkerIndex !== animMarkerIndex;
      if (markerChanged && this._setDateAndPosition(eventInfo.start, hoveredMarker.leftX), isCurrentEvent || markerChanged) return;
      hoveredMarker.cluster ? this._setClusterEvent(hoveredMarker, eventIndex) : (this._setEventName(eventInfo.title, eventInfo.start), this._setDateAndPosition(eventInfo.start, hoveredMarker.leftX));
    }
    this.setLocalState({
      focusPanel: {
        active: false
      }
    });
  }
  _onFpMouseEnter() {
    this._onMarkerMouseLeaveDebounced.cancel();
    this._onFpMouseLeaveDebounced.cancel();
    this.setLocalState({
      focusPanel: {
        active: true
      }
    });
  }
  _onFpMouseLeave(mouseEvent) {
    "hidden" !== this._state.fpVisibleClass && this._resetStates();
  }
  _onFpEventMouseOver(mouseEvent) {
    this._hideTooltip();
    const [marker, eventIndex] = this._getMarkerAndIndexFromFocusEl(mouseEvent.target);
    this._setClusterEvent(marker, eventIndex);
    const activeEventElement = marker.fpEventElements.find(eventElement => eventElement.classList.contains("active"));
    const focusAnchor = {
      element: activeEventElement,
      leftX: Number(activeEventElement.style.left.split("px")[0])
    };
    this._setFocusPanelPos(focusAnchor);
    this.setState({
      targetLineVisibleClass: "hidden",
      targetDateVisibleClass: "hidden",
      targetDateColorClass: "white",
      fpVisibleClass: "",
      rangeDatesVisibleClass: "hidden",
      fpTargetLineVisibleClass: "hidden",
      fpViewingLineVisibleClass: "hidden"
    });
    this._app.getComponent("eventsBlock").setState({
      isIntroLabelVisible: "invisible"
    });
  }
  _onFpTicksMouseEnter() {
    const {
      activeMarkerIndex: activeMarkerIndex,
      title: title
    } = this._localState;
    const activeMarker = this._markers[activeMarkerIndex];
    activeMarker && this._setFpElementActive(activeMarker);
    this._setEventName(`Between ${title} events`);
  }
  _onFpTicksMouseMove(mouseEvent) {
    this._hideTooltip();
    const {
      focusPanel: focusPanel,
      activeMarkerIndex: activeMarkerIndex
    } = this._localState;
    if (focusPanel.animating || -1 === activeMarkerIndex) return;
    this.setState({
      fpTargetLineVisibleClass: "",
      targetDateVisibleClass: "hidden",
      targetDateColorClass: "yellow",
      clusterLineColorClass: "yellow"
    });
    this.setLocalState({
      focusPanel: {
        touchLineX: mouseEvent.offsetX
      }
    });
    const hoverTime = this._calcTimeFromFpX(mouseEvent.offsetX);
    const timelineX = this._calcXfromTime(hoverTime);
    this._setDateAndPosition(hoverTime, timelineX);
    this._setClusterLineTransform(timelineX);
    this._children.focusPanel.style.setProperty("--fp-dateline-X", `${mouseEvent.offsetX}px`);
    this._localState.activeEventId || this._showToolTipDebounced("focusPanel");
  }
  _onFpTicksMouseLeave() {
    this._hideTooltip();
  }
  _onFpTicksClick() {
    this._hideTooltip();
    const {
      focusPanel: focusPanel,
      activeMarkerIndex: activeMarkerIndex
    } = this._localState;
    if (focusPanel.animating || -1 === activeMarkerIndex) return;
    const selectedTime = this._calcTimeFromFpX(focusPanel.touchLineX);
    this.goToTime(selectedTime);
    this.setLocalState({
      time: selectedTime.valueOf()
    });
  }
  _onViewClick(clickOrEventId) {
    this._hideTooltip();
    const {
      activeEventId: activeEventId,
      activeMarkerIndex: activeMarkerIndex,
      currentHoverMarkerIndex: currentHoverMarkerIndex
    } = this._localState;
    const {
      fpTargetLineVisibleClass: fpTargetLineVisibleClass
    } = this._state;
    let eventId = "string" == typeof clickOrEventId ? clickOrEventId : activeEventId;
    const clickedDetails = clickOrEventId?.target?.parentElement?.classList?.contains("fp-details");
    const clickedCluster = clickOrEventId?.target?.firstChild && !clickOrEventId.target.firstChild?.classList?.contains("single-event") && !clickedDetails;
    const selectedMarker = this._markers[currentHoverMarkerIndex >= 0 ? currentHoverMarkerIndex : activeMarkerIndex];
    eventId || clickedCluster || (eventId = selectedMarker.events.find(eventInfo => eventInfo.title === this._state.fpEventName)?.id);
    clickedCluster ? this._zoomIntoCluster(selectedMarker) : null !== eventId ? this.goToEvent(eventId) : "" === fpTargetLineVisibleClass && this._onDateTouchEnd();
    this.setLocalState({
      time: null
    });
  }
  _zoomIntoCluster(fallbackMarker = null) {
    const selectedMarker = this._markers[this._localState.animMarkerIndex] || fallbackMarker;
    const {
      markerContainer: markerContainer,
      eventContainer: eventContainer
    } = this._children;
    for (; markerContainer.firstChild;) markerContainer.removeChild(markerContainer.firstChild);
    for (; eventContainer.firstChild;) eventContainer.removeChild(eventContainer.firstChild);
    if (selectedMarker?.events) {
      const firstEvent = selectedMarker.events[0];
      const lastEvent = selectedMarker.events[selectedMarker.events.length - 1];
      this._buildRangeOptions({
        start: firstEvent.start,
        end: lastEvent.end
      });
      this._setStartEndDates();
      this._populateFocusPanel(selectedMarker);
    }
    this.setState({
      resetZoomVisibleClass: "",
      focusContentVisibleClass: "",
      fpVisibleClass: ""
    });
  }
  _zoomOutOfCluster() {
    const {
      target: target,
      dates: dates
    } = this._localState;
    let targetEntityId = target;
    target || (targetEntityId = this._app.getView("object")?.getCurrentTarget());
    const {
      start: start,
      end: end
    } = this._calcCoverage(targetEntityId, dates);
    this._buildRangeOptions({
      start: start,
      end: end
    });
    this._setStartEndDates();
    this.setState({
      fpVisibleClass: "hidden",
      resetZoomVisibleClass: "hidden",
      focusContentVisibleClass: "hidden"
    });
    this._populate();
  }
  _onFpWheel(wheelEvent) {
    wheelEvent.preventDefault();
    const {
      focusPanel: focusPanel,
      animMarkerIndex: animMarkerIndex
    } = this._localState;
    const switchThreshold = .5 * focusPanel.contentWidth;
    const nextWheelX = focusPanel.wheelX - wheelEvent.deltaX;
    if (this._hideTooltip(), focusPanel.animating) return;
    if (Math.abs(nextWheelX) > switchThreshold) {
      const adjacentMarker = nextWheelX > 0 ? this._markers[animMarkerIndex - 1] : this._markers[animMarkerIndex + 1];
      return void this._onMarkerMouseEnter({
        target: adjacentMarker.element,
        force: true
      });
    }
    this.setLocalState({
      focusPanel: {
        wheelX: nextWheelX
      }
    });
    const panTiming = {
      duration: 200,
      fill: "forwards",
      easing: "ease-out"
    };
    const contentAnimation = this._createAnimation(this._children.fpContent, {
      transform: `translateX(${nextWheelX}px) rotate(0.01deg)`
    }, panTiming);
    const ticksAnimation = this._createAnimation(this._children.fpTicksContainer, {
      transform: `translateX(${nextWheelX}px)`
    }, panTiming);
    contentAnimation.play();
    ticksAnimation.play();
  }
  _onFpTouchStart(touchEvent) {
    this._hideTooltip();
    const touchX = touchEvent.touches[0].clientX;
    this.setLocalState({
      focusPanel: {
        touchX: touchX
      }
    });
  }
  _onFpTouchEnd() {
    this.setLocalState({
      focusPanel: {
        clickEnabled: true
      }
    });
  }
  _onFpTouchMove(touchEvent) {
    const {
      timelinebar: timelinebar,
      focusPanel: focusPanel,
      animMarkerIndex: animMarkerIndex
    } = this._localState;
    if (focusPanel.animating) return;
    const touchX = touchEvent.touches[0].clientX;
    const deltaX = touchX - focusPanel.touchX;
    const accumulatedDeltaX = focusPanel.touchDeltaX + deltaX;
    const focusUpdates = {
      touchX: touchX,
      touchDeltaX: accumulatedDeltaX
    };
    focusPanel.clickEnabled && Math.abs(deltaX) > 2 && (focusUpdates.clickEnabled = false);
    this.setLocalState({
      focusPanel: focusUpdates
    });
    const switchThreshold = .7 * this._localState.focusPanel.contentWidth;
    if (Math.abs(accumulatedDeltaX) > switchThreshold) {
      const movingRight = accumulatedDeltaX > 0;
      const adjacentMarker = movingRight ? this._markers[animMarkerIndex - 1] : this._markers[animMarkerIndex + 1];
      this._onMarkerTouch({
        target: adjacentMarker.element,
        touches: [{
          clientX: movingRight ? timelinebar.width : 0
        }]
      });
    }
    const panTiming = {
      duration: 100,
      fill: "forwards",
      easing: "ease-out"
    };
    const contentAnimation = this._createAnimation(this._children.fpContent, {
      transform: `translateX(${accumulatedDeltaX}px) rotate(0.01deg)`
    }, panTiming);
    const ticksAnimation = this._createAnimation(this._children.fpTicksContainer, {
      transform: `translateX(${accumulatedDeltaX}px)`
    }, panTiming);
    contentAnimation.play();
    ticksAnimation.play();
  }
  _onFpTicksTouchStart(touchEvent) {
    const {
      timelinebar: timelinebar,
      focusPanel: focusPanel,
      activeMarkerIndex: activeMarkerIndex,
      title: title
    } = this._localState;
    const {
      left: left,
      arrowWidth: arrowWidth,
      touchDeltaX: touchDeltaX,
      totalWidth: totalWidth,
      clickedOnce: clickedOnce,
      touchLineX: touchLineX
    } = focusPanel;
    const {
      doubleThreshold: doubleThreshold
    } = this._options;
    const focusX = touchEvent.touches[0].clientX - left - arrowWidth - touchDeltaX - timelinebar.left;
    if (touchEvent.preventDefault(), touchEvent.stopPropagation(), focusPanel.animating || -1 === activeMarkerIndex) return;
    if (this._hideTooltip(), this.setLocalState({
      focusPanel: {
        touchLineX: focusX
      }
    }), clickedOnce) {
      if (Math.abs(touchLineX - focusX) < doubleThreshold) {
        this._setClickedOnce("focusPanel", false);
        return void this.setLocalState({
          focusPanel: {
            doubleClick: true
          }
        });
      }
    } else this._setClickedOnce("focusPanel");
    this.setState({
      fpTargetLineVisibleClass: "",
      targetDateVisibleClass: "fp",
      targetDateColorClass: "yellow",
      clusterLineColorClass: "yellow",
      clusterLineVisibleClass: ""
    });
    this._setEventName(`Between ${title} events`);
    const activeMarker = this._markers[activeMarkerIndex];
    this._setFpElementActive(activeMarker);
    const selectedTime = this._calcTimeFromFpX(focusX);
    const panelMidpointX = left + .5 * totalWidth;
    const timelineX = this._calcXfromTime(selectedTime);
    this._setDateAndPosition(selectedTime, panelMidpointX);
    this._setClusterLineTransform(timelineX);
    this._children.focusPanel.style.setProperty("--fp-dateline-X", `${focusX}px`);
  }
  _onFpTicksTouchMove(touchEvent) {
    const {
      timelinebar: timelinebar,
      focusPanel: focusPanel,
      activeMarkerIndex: activeMarkerIndex
    } = this._localState;
    const {
      left: left,
      arrowWidth: arrowWidth,
      touchDeltaX: touchDeltaX,
      totalWidth: totalWidth
    } = focusPanel;
    const focusX = touchEvent.touches[0].clientX - left - arrowWidth - touchDeltaX - timelinebar.left;
    if (touchEvent.stopPropagation(), focusPanel.animating || -1 === activeMarkerIndex) return;
    this.setLocalState({
      focusPanel: {
        touchLineX: focusX
      }
    });
    this.setState({
      fpTargetLineVisibleClass: "",
      targetDateVisibleClass: "fp",
      targetDateColorClass: "yellow",
      clusterLineColorClass: "yellow",
      clusterLineVisibleClass: ""
    });
    const selectedTime = this._calcTimeFromFpX(focusX);
    const panelMidpointX = left + .5 * totalWidth;
    const timelineX = this._calcXfromTime(selectedTime);
    this._setDateAndPosition(selectedTime, panelMidpointX);
    this._setClusterLineTransform(timelineX);
    this._children.focusPanel.style.setProperty("--fp-dateline-X", `${focusX}px`);
  }
  _onFpTicksTouchEnd(touchEvent) {
    touchEvent.stopPropagation();
    this.setLocalState({
      focusPanel: {
        animating: false
      }
    });
    const {
      focusPanel: focusPanel
    } = this._localState;
    focusPanel.doubleClick && (this._onDateTouchEnd(), this.setLocalState({
      focusPanel: {
        doubleClick: false
      }
    }));
  }
  _onMarkerTouch(touchEvent) {
    touchEvent.preventDefault && touchEvent.preventDefault();
    touchEvent.stopPropagation && touchEvent.stopPropagation();
    const {
      timelinebar: timelinebar,
      animMarkerIndex: animMarkerIndex,
      activeMarkerIndex: activeMarkerIndex
    } = this._localState;
    const touchedMarker = this._markers.find(candidateMarker => candidateMarker.element === touchEvent.target);
    const markerIndex = this._markers.indexOf(touchedMarker);
    const animatedMarker = this._markers[animMarkerIndex];
    if (this._hideTooltip(), activeMarkerIndex !== markerIndex) {
      if (this._markers.forEach(marker => this._setActive(marker.element, marker === touchedMarker)), this.setState({
        targetLineVisibleClass: "hidden",
        targetDateVisibleClass: "hidden",
        targetDateColorClass: "white",
        fpTargetLineVisibleClass: "hidden",
        fpVisibleClass: "",
        rangeDatesVisibleClass: "hidden",
        fpViewingLineVisibleClass: "hidden",
        clusterLineVisibleClass: touchedMarker?.cluster ? "" : "hidden"
      }), Eyes.AppUtils.isMobilePortrait() && this._settings?.hide(), this.setLocalState({
        focusPanel: {
          active: Boolean(touchedMarker.cluster)
        },
        activeMarkerIndex: markerIndex,
        animMarkerIndex: touchedMarker.cluster ? markerIndex : this._localState.animMarkerIndex
      }), touchedMarker.cluster) {
        const touchX = touchEvent.touches[0].clientX;
        const eventIndex = this._getNearestIndex(touchX, touchedMarker.eventXs);
        const viewingLineIsLeft = timelinebar.viewingLineX < touchedMarker.leftX;
        this._setFpViewingLineStart(viewingLineIsLeft);
        touchedMarker.events.length > 1 && this._zoomIntoCluster();
        this._setFocusPanelPos(touchedMarker);
        this._setFpAnimation(animatedMarker, touchedMarker, eventIndex);
      } else {
        const eventInfo = touchedMarker.events[0];
        this._setEventNameDebounced.cancel();
        this._setEventNameDebounced(eventInfo.title);
        this._setDateAndPosition(eventInfo.start, touchedMarker.leftX);
        this._showToolTipDebounced();
      }
    } else touchedMarker && !touchedMarker.cluster && (this._onViewClick(touchedMarker.events[0].id), this._resetStates());
  }
  _onDateTouchStart(touchEvent) {
    touchEvent.preventDefault();
  }
  _onDateTouchEnd() {
    const {
      timelinebar: timelinebar,
      focusPanel: focusPanel
    } = this._localState;
    if (focusPanel.animating) return;
    const selectedTime = focusPanel.active ? this._calcTimeFromFpX(focusPanel.touchLineX) : this._calcTimefromTimelineX(timelinebar.touchLineX);
    this.goToTime(selectedTime);
    this.setLocalState({
      time: selectedTime.valueOf()
    });
  }
  _onFpEventTouch(touchEvent) {
    touchEvent.preventDefault();
    const {
      focusPanel: focusPanel,
      activeEventId: activeEventId
    } = this._localState;
    if (!focusPanel.clickEnabled) return;
    const [marker, eventIndex] = this._getMarkerAndIndexFromFocusEl(touchEvent.target);
    const eventInfo = marker.events[eventIndex];
    this._hideTooltip();
    activeEventId !== eventInfo.id ? this._setClusterEvent(marker, eventIndex) : this._onViewClick();
  }
  _onFpArrowClick(clickEvent) {
    clickEvent.preventDefault();
    const movingLeft = "left" === clickEvent.target.getAttribute("direction");
    const {
      timelinebar: timelinebar,
      activeMarkerIndex: activeMarkerIndex,
      activeEventId: activeEventId,
      focusPanel: focusPanel
    } = this._localState;
    const {
      fpTargetLineVisibleClass: fpTargetLineVisibleClass
    } = this._state;
    const eventMarker = this._markers.find(marker => marker.events.find(eventInfo => eventInfo.id === activeEventId));
    const eventMarkerIndex = this._markers.indexOf(eventMarker);
    const activeMarker = this._markers[activeMarkerIndex] || this._markers[eventMarkerIndex];
    if (void 0 === activeMarker) return;
    const activeEventIndex = activeMarker.events.findIndex(eventInfo => eventInfo.id === activeEventId);
    const selectedTime = "" === fpTargetLineVisibleClass ? this._calcTimeFromFpX(focusPanel.touchLineX) : this._localState.time;
    this._hideTooltip();
    const nextEventIndex = activeEventIndex > -1 ? movingLeft ? activeEventIndex - 1 : activeEventIndex + 1 : this._getNextEventIndexByTime(selectedTime, activeMarker, movingLeft);
    if (!activeMarker.events[nextEventIndex]) {
      activeMarker.events.length > 1 && this._zoomOutOfCluster();
      const adjacentMarker = movingLeft ? this._markers[activeMarkerIndex - 1] : this._markers[activeMarkerIndex + 1];
      return void (adjacentMarker ? this._onMarkerTouch({
        target: adjacentMarker.element,
        touches: [{
          clientX: movingLeft ? timelinebar.width : 0
        }]
      }) : this._resetStates());
    }
    this._setClusterEvent(activeMarker, nextEventIndex);
  }
  _onTimelineTouchStart(touchEvent) {
    if (touchEvent.target !== this._children.timelinebar) return;
    const {
      timelinebar: timelinebar
    } = this._localState;
    const {
      clickedOnce: clickedOnce,
      touchLineX: touchLineX
    } = timelinebar;
    const {
      doubleThreshold: doubleThreshold
    } = this._options;
    const timelineX = touchEvent.touches[0].clientX - timelinebar.left;
    if (touchEvent.preventDefault(), this._hideTooltip(), this.setLocalState({
      timelinebar: {
        touchLineX: timelineX
      }
    }), clickedOnce) {
      if (Math.abs(touchLineX - timelineX) < doubleThreshold) {
        this._setClickedOnce("timelinebar", false);
        return void this.setLocalState({
          timelinebar: {
            doubleClick: true
          }
        });
      }
    } else this._setClickedOnce("timelinebar");
    this.setLocalState({
      timelinebar: {
        active: true
      },
      focusPanel: {
        active: false
      }
    });
    this._resetStates({
      hideDate: false
    });
    this.setState({
      targetLineVisibleClass: "",
      targetDateColorClass: "yellow",
      rangeDatesVisibleClass: "hidden"
    });
    const normalizedPosition = timelineX / timelinebar.width;
    const selectedTime = this._options.min + this._options.range * normalizedPosition;
    this._setDateAndPosition(selectedTime, timelineX);
  }
  _onTimelineTouchMove(touchEvent) {
    const {
      start: start,
      end: end
    } = this._options;
    const {
      timelinebar: timelinebar,
      activeMarkerIndex: activeMarkerIndex
    } = this._localState;
    const timelineX = touchEvent.touches[0].clientX - timelinebar.left;
    const normalizedPosition = timelineX / timelinebar.width;
    const selectedTime = this._options.min + this._options.range * normalizedPosition;
    const outsideTimeline = timelineX < 0 || timelineX > timelinebar.width || selectedTime < start.valueOf() || selectedTime > end.valueOf();
    activeMarkerIndex > -1 || outsideTimeline || (this.setLocalState({
      timelinebar: {
        touchLineX: timelineX
      }
    }), this.setState({
      targetLineVisibleClass: "",
      targetDateVisibleClass: ""
    }), this._setDateAndPosition(selectedTime, timelineX));
  }
  _onTimelineTouchEnd() {
    const {
      activeEventId: activeEventId,
      activeMarkerIndex: activeMarkerIndex
    } = this._localState;
    if (null !== activeEventId || activeMarkerIndex > -1) return;
    const {
      timelinebar: timelinebar
    } = this._localState;
    if (timelinebar.doubleClick) {
      this._onDateTouchEnd();
      return void this.setLocalState({
        timelinebar: {
          doubleClick: false
        }
      });
    }
    this.setState({
      targetLineVisibleClass: "hidden-slow",
      targetDateVisibleClass: "hidden-slow",
      rangeDatesVisibleClass: "fadein-slow"
    });
    clearTimeout(this._localState.timelinebar.fadeTimeout);
    const fadeTimeout = setTimeout(() => {
      if (this.setState && this.setLocalState) {
        const {
          targetLineVisibleClass: targetLineVisibleClass,
          targetDateVisibleClass: targetDateVisibleClass
        } = this._state;
        this.setState({
          targetLineVisibleClass: "hidden-slow" === targetLineVisibleClass ? "hidden" : targetLineVisibleClass,
          targetDateVisibleClass: "hidden-slow" === targetDateVisibleClass ? "hidden" : targetDateVisibleClass
        });
        this.setLocalState({
          timelinebar: {
            doubleClick: false
          },
          focusPanel: {
            doubleClick: false
          }
        });
      }
    }, this._options.tapFadeDelay);
    this.setLocalState({
      timelinebar: {
        active: false,
        fadeTimeout: fadeTimeout
      }
    });
  }
  _onOutsideTouch(touchEvent) {
    this._element.contains(touchEvent.target) || this._resetStates();
  }
  _setResizeTimeout(delayMillis = 1e3) {
    clearTimeout(this._resizeTimeout);
    this._resizeTimeout = setTimeout(this._resizeDebounced, delayMillis);
  }
  _onResize() {
    this._resizeTimeout = null;
    this._resetStates();
    const {
      width: width,
      height: height,
      left: left
    } = this._children.timelinebar.getBoundingClientRect();
    const isTouch = window.navigator.maxTouchPoints > 0;
    let fallbackWidth = 304;
    width || (Eyes.AppUtils.isMobile() ? fallbackWidth = 348 : Eyes.AppUtils.isTablet() && (fallbackWidth = 720));
    this.setLocalState({
      isTouch: isTouch,
      focusPanel: {
        calcWidths: true
      },
      timelinebar: {
        width: width || fallbackWidth,
        height: height || 40,
        left: left || 21
      }
    });
    this._children.timelinebar.style.setProperty("--timeline-height", `${this._localState.timelinebar.height}px`);
    this._populate();
  }
  resize() {
    this._resizeDebounced();
  }
  _calcEventClusterMax() {
    const {
      events: events
    } = this._options;
    const {
      timelinebar: timelinebar
    } = this._localState;
    const estimatedCapacity = Math.floor(events.clusterCoeff / timelinebar.width);
    return Math.max(Math.min(estimatedCapacity, events.clusterMax), events.clusterMin);
  }
  _calcMidpointX(startTime, endTime, rangeMinimum = this._options.min, timeRange = this._options.range, timelineWidth = this._localState.timelinebar.width) {
    const midpointTime = .5 * (startTime + endTime);
    return this._calcXfromTime(midpointTime, rangeMinimum, timeRange, timelineWidth);
  }
  _calcWidthBtwnTimes(startTime, endTime, timeRange = this._options.range, timelineWidth = this._localState.timelinebar.width, minimumWidth = 1, maximumWidth = this._options.range, roundPixels = true) {
    let widthPixels = minimumWidth;
    const normalizedDuration = (endTime - startTime) / timeRange;
    return normalizedDuration && !isNaN(normalizedDuration) ? (widthPixels = Math.max(normalizedDuration * timelineWidth, widthPixels), widthPixels = Math.min(widthPixels, maximumWidth), roundPixels ? Math.round(widthPixels) : widthPixels) : null;
  }
  _calcXfromTime(timeValue, rangeMinimum = this._options.min, timeRange = this._options.range, timelineWidth = this._localState.timelinebar.width, fractionDigits = 2) {
    let positionX = timelineWidth * ((timeValue - rangeMinimum) / timeRange);
    if (positionX > this._localState.timelinebar.width && (positionX = this._localState.timelinebar.width), !isNaN(positionX)) {
      const formattedPosition = formatNumber(positionX, fractionDigits);
      return "string" == typeof formattedPosition ? parseFloat(formattedPosition.replace(/,/g, "")) : null;
    }
    return null;
  }
  _calcTimefromTimelineX(timelineX) {
    const {
      timelinebar: timelinebar
    } = this._localState;
    const normalizedPosition = timelineX / timelinebar.width;
    const selectedTime = this._options.min + normalizedPosition * this._options.range;
    return getMomentSecondary()(selectedTime);
  }
  _calcTimeFromFpX(focusX) {
    const {
      focusPanel: focusPanel,
      activeMarkerIndex: activeMarkerIndex
    } = this._localState;
    const {
      focusPanel: focusOptions
    } = this._options;
    const paddingPixels = .01 * focusOptions.padding * focusPanel.contentWidth;
    const normalizedPosition = (focusX - paddingPixels) / (focusPanel.contentWidth - 2 * paddingPixels);
    const activeMarker = this._markers[activeMarkerIndex];
    const selectedTime = activeMarker.min + normalizedPosition * activeMarker.timeRange;
    return getMomentSecondary()(selectedTime);
  }
  _calcRelativeProgress(startValue, endValue, progress) {
    return startValue + progress * (endValue - startValue);
  }
  _calcFpEventOffset(marker, eventIndex) {
    const {
      leftOffset: leftOffset
    } = this._options.focusPanel.touch;
    return leftOffset - marker.fpEventXs[eventIndex];
  }
  _nestedPropsChanged(updates, previousState) {
    for (const propertyName in updates) {
      if (null !== updates[propertyName] && null !== previousState[propertyName] && typeof updates[propertyName] != typeof previousState[propertyName]) {
        console.error("Mismatched state types in object", updates);
        return false;
      }
      if (null !== updates[propertyName] && updates[propertyName].constructor === Object) {
        if (this._nestedPropsChanged(updates[propertyName], previousState[propertyName])) return true;
      } else if (updates[propertyName] !== previousState[propertyName]) return true;
    }
    return false;
  }
  _showToolTip(tooltipSection = "timelinebar") {
    const tooltip = this._tooltips[tooltipSection];
    const {
      isTouch: isTouch,
      activeMarkerIndex: activeMarkerIndex,
      timelinebar: timelinebar
    } = this._localState;
    if (this._localState[tooltipSection].displayedTip || !tooltip) return;
    const activeMarker = this._markers[activeMarkerIndex];
    if (isTouch && activeMarker && !activeMarker.cluster) {
      const timelineMidpoint = .5 * timelinebar.width;
      const arrowSide = activeMarker.leftX < timelineMidpoint ? "right" : "left";
      const calculateOffset = ({
        placement: placement,
        _: unusedPopperData,
        popper: popper
      }) => {
        if ("top" === placement) {
          const halfTooltipWidth = .5 * popper.width;
          return [Math.min(Math.max(activeMarker.leftX, halfTooltipWidth), timelinebar.width - halfTooltipWidth) - timelineMidpoint, 30];
        }
        return [];
      };
      const calculateArrowPadding = ({
        popper: popper,
        _: unusedPopperData,
        placement: placement
      }) => {
        if ("top" === placement) {
          const paddingRatio = .3 + .4 * Math.abs((activeMarker.leftX - timelineMidpoint) / timelineMidpoint);
          return {
            [arrowSide]: popper.width * paddingRatio
          };
        }
        return 0;
      };
      this._setTooltipModifiers(tooltip, calculateOffset, calculateArrowPadding);
    }
    tooltip.show();
    const {
      minTime: minTime
    } = this._options.tooltips;
    this.setLocalState({
      toolTipTimeout: setTimeout(() => {
        this.setLocalState({
          [tooltipSection]: {
            displayedTip: true
          }
        });
      }, minTime)
    });
  }
  _setTooltipModifiers(tooltip, offsetCallback, arrowPaddingCallback) {
    const modifiers = [];
    "function" == typeof offsetCallback && modifiers.push({
      name: "offset",
      options: {
        offset: offsetCallback
      }
    });
    "function" == typeof arrowPaddingCallback && modifiers.push({
      name: "arrow",
      options: {
        padding: arrowPaddingCallback
      }
    });
    tooltip.setProps({
      popperOptions: {
        modifiers: modifiers
      }
    });
  }
  _resetTooltip() {
    this._showToolTipDebounced.cancel();
    clearTimeout(this._localState.toolTipTimeout);
  }
  _hideTooltip(resetPendingTooltip = true) {
    resetPendingTooltip && this._resetTooltip();
    Object.values(this._tooltips).forEach(tooltip => tooltip.hide());
  }
  _resetStates({
    hideFocusPanel = true,
    hideClusterLine = true,
    hideDate = true
  } = {}) {
    const {
      timelinebar: timelinebar
    } = this._localState;
    if (this._hideTooltip(false), Eyes.AppUtils.isMobilePortrait() && this._app.getComponent("collapsibleMenu")?.getState("isVisible") && (hideFocusPanel ? this._settings?.show() : this._settings?.hide()), this.setState({
      fpVisibleClass: hideFocusPanel ? "hidden" : "",
      rangeDatesVisibleClass: hideFocusPanel ? "" : "hidden",
      clusterLineVisibleClass: hideClusterLine ? "hidden" : "",
      targetDateVisibleClass: hideDate && !timelinebar.active ? "hidden" : "",
      fpArrowVisible: Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTablet() ? "" : "hidden"
    }), this.setLocalState({
      activeMarkerIndex: -1,
      animMarkerIndex: -1,
      activeEventId: null,
      focusPanel: {
        active: false,
        wheelX: 0
      }
    }), !Eyes.AppUtils.isMobile() && !Eyes.AppUtils.isTablet()) {
      this._app.getComponent("eventsBlock").setState({
        isIntroLabelVisible: ""
      });
    }
    this._markers.forEach(marker => this._setActive(marker.element, false));
  }
  _setViewingLineX(currentTime) {
    const {
      timelinebar: timelinebar,
      updateViewingLine: updateViewingLine,
      focusPanel: focusPanel
    } = this._localState;
    const visibilityUpdates = {
      viewingLineVisibleClass: "hidden",
      fpViewingLineVisibleClass: "hidden"
    };
    const localUpdates = {
      updateViewingLine: false
    };
    const timelineX = this._calcXfromTime(currentTime);
    const focusX = this._getFpViewingLineX(currentTime);
    if (timelineX) {
      const withinTimelineWidth = timelinebar.width && timelineX <= timelinebar.width;
      visibilityUpdates.viewingLineVisibleClass = withinTimelineWidth ? "" : "hidden";
      (timelineX !== timelinebar.viewingLineX || updateViewingLine) && (this._children.timelinebar.style.setProperty("--viewingline-X", `${timelineX}px`), localUpdates.timelinebar = {
        viewingLineX: timelineX
      });
    }
    focusX && (visibilityUpdates.fpViewingLineVisibleClass = "", (focusX !== focusPanel.viewingLineX || updateViewingLine) && (this._children.focusPanel.style.setProperty("--fp-viewingline-X", `${focusX}px`), localUpdates.focusPanel = {
      viewingLineX: focusX
    }));
    this.setState(visibilityUpdates);
    this.setLocalState(localUpdates);
  }
  _setFpViewingLineStart(viewingLineIsLeft) {
    const {
      focusPanel: focusPanel
    } = this._localState;
    const panelWidth = focusPanel.width || 1e3;
    const startPositionX = viewingLineIsLeft ? -panelWidth : 2 * panelWidth;
    this._children.focusPanel.style.setProperty("--fp-viewingline-X", `${startPositionX}px`);
  }
  _setClusterEvent(marker, eventIndex) {
    const eventInfo = marker.events[eventIndex];
    const timelineX = marker.eventXs[eventIndex];
    const focusElement = marker.fpEventElements[eventIndex];
    this._setEventName(eventInfo.title, eventInfo.start);
    this._setDateAndPosition(eventInfo.start, timelineX);
    this._setClusterLineTransform(timelineX);
    this.setState({
      clusterLineVisibleClass: "",
      clusterLineColorClass: "white",
      targetDateColorClass: "white",
      targetDateVisibleClass: "hidden",
      fpTargetLineVisibleClass: "hidden",
      fpVisibleClass: ""
    });
    this._setFpElementActive(marker, focusElement);
  }
  _setFpAnimation(previousMarker, nextMarker, selectedEventIndex) {
    const hasPreviousMarker = previousMarker;
    const nextMarkerIndex = this._markers.indexOf(nextMarker);
    const {
      isTouch: isTouch
    } = this._localState;
    if (hasPreviousMarker) {
      const minimumDuration = 700;
      const maximumDuration = 2e3;
      const movingRight = previousMarker.leftX < nextMarker.leftX;
      const normalizedDistance = this._getNormDistance(previousMarker, nextMarker);
      const durationMillis = this._calcRelativeProgress(minimumDuration, maximumDuration, normalizedDistance);
      const eventDuration = .39 * durationMillis;
      const animationState = {
        focusPanel: {
          animating: true
        }
      };
      isTouch || (this.setState({
        clusterLineVisibleClass: "hidden"
      }), animationState.activeMarkerIndex = -1);
      this.setLocalState(animationState);
      const populateNextMarker = () => {
        previousMarker.fpEventElements = [];
        this._depopulateFocusPanel(previousMarker);
        this._populateFocusPanel(nextMarker);
        const focusState = {
          activeMarkerIndex: nextMarkerIndex,
          animMarkerIndex: nextMarkerIndex,
          updateViewingLine: true,
          [isTouch ? "touchDeltaX" : "wheelX"]: 0,
          focusPanel: {
            active: true
          }
        };
        void 0 !== selectedEventIndex && this._setClusterEvent(nextMarker, selectedEventIndex);
        this.setLocalState(focusState);
        const enterAnimation = this._getFpEventsEnterAnim(eventDuration, movingRight, 0);
        enterAnimation.onfinish = () => {
          this.setLocalState({
            focusPanel: {
              animating: false
            }
          });
        };
        enterAnimation.play();
      };
      const exitAnimation = this._getFpEventsExitAnim(eventDuration, movingRight);
      exitAnimation.onfinish = populateNextMarker;
      exitAnimation.play();
      const ticksAnimation = this._getFpTickAnim(normalizedDistance, durationMillis, movingRight);
      const lineAnimation = this._getFpLineAnim(durationMillis);
      ticksAnimation.play();
      lineAnimation.play();
    } else {
      const {
        animation: {
          keyframes: keyframes,
          timings: timings
        }
      } = this._options;
      this._depopulateFocusPanel();
      this._populateFocusPanel(nextMarker);
      const focusState = {
        activeMarkerIndex: nextMarkerIndex,
        animMarkerIndex: nextMarkerIndex,
        updateViewingLine: true,
        [isTouch ? "touchDeltaX" : "wheelX"]: 0,
        focusPanel: {
          active: true
        }
      };
      const zoomKeyframes = [...keyframes.fpEvents.zoom];
      void 0 !== selectedEventIndex && this._setClusterEvent(nextMarker, selectedEventIndex);
      this.setLocalState(focusState);
      this._createAnimation(this._children.fpContent, zoomKeyframes, timings.zoom).play();
      const ticksAnimation = this._createAnimation(this._children.fpTicks, keyframes.fpTicks.zoom, timings.zoom);
      const lineAnimation = this._createAnimation(this._children.fpLine, keyframes.fpLine, timings.zoom);
      ticksAnimation.play();
      lineAnimation.play();
    }
  }
  _getFpViewingLineX(currentTime) {
    const {
      activeMarkerIndex: activeMarkerIndex,
      focusPanel: focusPanel
    } = this._localState;
    if (-1 !== activeMarkerIndex) {
      const {
        focusPanel: focusOptions
      } = this._options;
      const {
        min: min,
        timeRange: timeRange
      } = this._markers[activeMarkerIndex];
      const paddingPixels = .01 * focusOptions.padding * focusPanel.contentWidth;
      const usableWidth = focusPanel.contentWidth - 2 * paddingPixels;
      const eventX = this._calcXfromTime(currentTime, min, timeRange, usableWidth, 0);
      if (null !== eventX) {
        const paddedX = eventX + Math.round(paddingPixels);
        if (paddedX > -usableWidth && paddedX < 2 * usableWidth) return paddedX;
      }
    }
    return null;
  }
  _getNearestEvent(marker, timelineX) {
    if (marker.cluster) {
      const eventIndex = this._getNearestIndex(timelineX, marker.eventXs);
      return marker.events[eventIndex];
    }
    return marker.events[0];
  }
  _getNextEventIndexByTime(selectedTime = this._localState.time, marker, movingLeft) {
    let previousEventIndex = -1;
    marker.events.forEach((eventInfo, eventIndex) => {
      selectedTime > eventInfo.start.valueOf() && (previousEventIndex = eventIndex);
    });
    return movingLeft ? previousEventIndex : previousEventIndex + 1;
  }
  _setDateAndPosition(selectedTime, timelineX) {
    const {
      timelinebar: timelinebar
    } = this._children;
    const formattedDate = ("number" == typeof selectedTime ? getMomentSecondary()(selectedTime) : selectedTime).format("MMM DD, YYYY");
    timelinebar.style.setProperty("--formatted-date", `'${formattedDate}'`);
    timelineX && timelinebar.style.setProperty("--dateline-X", `${timelineX}px`);
  }
  _setEventName(eventTitle, eventTime = null) {
    const {
      activeMarkerIndex: activeMarkerIndex,
      timelinebar: timelinebar
    } = this._localState;
    let labelOffsetPercent = 50;
    const activeMarker = this._markers[activeMarkerIndex];
    if (activeMarker && !activeMarker.cluster && (labelOffsetPercent = activeMarker.leftX / timelinebar.width * 100), this._element.style.setProperty("--event-offset-x", `-${labelOffsetPercent}%`), this._element.style.setProperty("--event-name", `'${eventTitle}'`), eventTime) {
      const timeValue = eventTime;
      const formattedDate = ("number" == typeof timeValue ? getMomentSecondary()(timeValue) : timeValue).format("MMM DD, YYYY");
      this.setState({
        fpEventTime: formattedDate
      });
    }
    this.setState({
      fpEventName: eventTitle
    });
  }
  _setActive(element, isActive) {
    isActive ? element.classList.add("active") : element.classList.remove("active");
  }
  _getNormDistance(previousMarker, nextMarker) {
    const {
      timelinebar: timelinebar
    } = this._localState;
    return Math.abs(nextMarker.leftX - previousMarker.leftX) / timelinebar.width;
  }
  _getFpEventsEnterAnim(durationMillis, movingRight, targetOffsetX) {
    const timingOptions = {
      duration: durationMillis,
      fill: "forwards",
      easing: "cubic-bezier(0, 1, 0, 1)"
    };
    const directionSign = movingRight ? "" : "-";
    const keyframes = [{
      transform: `translateX(${directionSign}100%) scaleY(0)`
    }, {
      transform: `translateX(${directionSign}50%) scaleY(0.1)`
    }, {
      transform: `translateX(${targetOffsetX}px) scaleY(1) rotate(0.01deg)`
    }];
    return this._createAnimation(this._children.fpContent, keyframes, timingOptions);
  }
  _getFpEventsExitAnim(durationMillis, movingRight) {
    const timingOptions = {
      duration: durationMillis,
      easing: "cubic-bezier(.2, 0, 0, 1)"
    };
    const directionSign = movingRight ? "-" : "";
    const keyframes = [{
      transform: `translateX(${directionSign}50%) scaleY(0.1)`,
      offset: .5
    }, {
      transform: `translateX(${directionSign}100%) scaleY(0)`
    }];
    return this._createAnimation(this._children.fpContent, keyframes, timingOptions);
  }
  _getFpTickAnim(normalizedDistance, durationMillis, movingRight) {
    const timingOptions = {
      duration: durationMillis,
      fill: "forwards",
      easing: "cubic-bezier(0, 1, 0, 1)"
    };
    const translationPercent = this._calcRelativeProgress(50, 150, normalizedDistance);
    const keyframes = [{
      transform: "translateX(0%)"
    }, {
      transform: `translateX(${movingRight ? "-" : ""}${translationPercent}%)`,
      offset: .49
    }, {
      transform: `translateX(${movingRight ? "" : "-"}${translationPercent}%)`,
      offset: .5
    }, {
      transform: "translateX(0%)"
    }];
    return this._createAnimation(this._children.fpTicksContainer, keyframes, timingOptions);
  }
  _getFpLineAnim(durationMillis) {
    const timingOptions = {
      duration: durationMillis,
      fill: "forwards",
      easing: "cubic-bezier(0, 1, 0, 1)"
    };
    return this._createAnimation(this._children.fpLine, [{
      opacity: 0
    }, {
      opacity: .6
    }, {
      opacity: 0
    }], timingOptions);
  }
  _setFpEventScaledClass(marker) {
    marker.fpEventElements.forEach(eventElement => eventElement.classList.add("scaled"));
    requestAnimationFrame(() => marker.fpEventElements.forEach(eventElement => eventElement.classList.remove("scaled")));
  }
  _setClusterLineTransform(timelineX) {
    this._clusterEventLine.style.setProperty("transform", `translateX(calc(${timelineX}px - 50%))`);
  }
  _getMarkerAndIndexFromFocusEl(focusElement) {
    for (const marker of this._markers) if (marker.fpEventElements) {
      const eventIndex = marker.fpEventElements.indexOf(focusElement);
      if (eventIndex > -1) return [marker, eventIndex];
    }
    return null;
  }
  _setFpElementActive(marker, activeElement) {
    marker.fpEventElements.forEach(eventElement => eventElement.classList.toggle("active", eventElement === activeElement));
    const eventIndex = marker.fpEventElements.indexOf(activeElement);
    const eventId = eventIndex > -1 ? marker.events[eventIndex].id : null;
    this.setLocalState({
      activeEventId: eventId
    });
  }
  _setFocusPanelPos({
    leftX: leftX,
    widthPx: widthPx
  }) {
    const {
      focusPanel: focusPanel,
      fpMask: fpMask,
      fpDetails: fpDetails
    } = this._children;
    if (this._localState.focusPanel.calcWidths) {
      const panelWidth = focusPanel.getBoundingClientRect().width;
      const maskWidth = fpMask.getBoundingClientRect().width;
      const arrowWidth = .5 * (panelWidth - maskWidth);
      this._setNumOfTicks(maskWidth);
      this.setLocalState({
        focusPanel: {
          calcWidths: false,
          totalWidth: panelWidth,
          contentWidth: maskWidth,
          arrowWidth: arrowWidth
        }
      });
      focusPanel.style.setProperty("--fp-midpoint", .5 * panelWidth + "px");
    }
    const {
      timelinebar: timelinebar,
      focusPanel: focusState
    } = this._localState;
    const detailsWidth = fpDetails.getBoundingClientRect().width;
    const halfDetailsWidth = detailsWidth / 2;
    const maximumLeft = timelinebar.width - detailsWidth > 0 ? timelinebar.width - detailsWidth : 0;
    const clampedLeft = Math.min(Math.max(leftX - halfDetailsWidth, 0), maximumLeft);
    const markerLeft = leftX - halfDetailsWidth;
    const markerScale = widthPx / focusState.contentWidth;
    focusPanel.style.setProperty("--focus-X", `${clampedLeft}px`);
    focusPanel.style.setProperty("--fpMarker-X", `${markerLeft}px`);
    focusPanel.style.setProperty("--fpMarker-scaleX", `${markerScale}`);
  }
  _setNumOfTicks(contentWidth) {
    const {
      tickChar: tickChar,
      tickMult: tickMult
    } = this._options.focusPanel;
    const tickCount = Math.round(contentWidth * tickMult);
    this._children.fpTicks.innerText = tickChar.repeat(tickCount);
  }
  _getLastCluster() {
    for (let markerIndex = this._markers.length - 1; markerIndex >= 0; markerIndex--) {
      const marker = this._markers[markerIndex];
      if (marker.cluster) return marker;
    }
    return null;
  }
  _setMarkerPositions() {
    const {
      events: events,
      range: range
    } = this._options;
    const minimumTimeRange = .01 * events.clusterThresh * 2 * range;
    const halfTimeRange = .5 * minimumTimeRange;
    this._markers.forEach((marker, markerIndex) => {
      const minimumMarkerWidth = marker.cluster ? 3 : 2;
      const firstEvent = marker.events[0];
      const lastEvent = marker.events[marker.events.length - 1];
      marker.widthPx = Math.max(this._calcWidthBtwnTimes(firstEvent.start, lastEvent.end), minimumMarkerWidth);
      marker.leftX = this._calcMidpointX(firstEvent.start, lastEvent.end);
      marker.min = Math.min(...marker.events.map(eventInfo => eventInfo.start));
      marker.max = Math.max(...marker.events.map(eventInfo => eventInfo.end));
      marker.timeRange = marker.max - marker.min;
      const isSingleEvent = 1 === marker.events.length;
      isSingleEvent && marker.timeRange < minimumTimeRange && (0 === markerIndex ? marker.max = firstEvent.end.clone().add(minimumTimeRange, "milliseconds") : markerIndex === this._markers.length - 1 ? marker.min = firstEvent.start.clone().subtract(minimumTimeRange, "milliseconds") : (marker.min = firstEvent.start.clone().subtract(halfTimeRange, "milliseconds"), marker.max = firstEvent.end.clone().add(halfTimeRange, "milliseconds")), marker.timeRange = marker.max - marker.min);
      marker.cluster && (marker.eventXs = marker.events.map(eventInfo => this._calcMidpointX(eventInfo.start, eventInfo.end)), isSingleEvent && this._createEventElement(marker));
      marker.element.style.setProperty("width", markerBaseWidth);
      marker.element.style.setProperty("transform", `translateX(calc(${marker.leftX}px - 50%))`);
    });
  }
  _getNearestIndex(targetPosition, positions) {
    const nearestPosition = positions.reduce((closestPosition, candidatePosition) => Math.abs(candidatePosition - targetPosition) < Math.abs(closestPosition - targetPosition) ? candidatePosition : closestPosition);
    return positions.indexOf(nearestPosition);
  }
  setOptions(optionUpdates, useDefaults = false) {
    const baseOptions = useDefaults ? this.defaultOptions : this._options;
    this._options = deepMerge(baseOptions, optionUpdates);
  }
  setLocalState(stateUpdates) {
    const localState = this._localState;
    this._nestedPropsChanged(stateUpdates, localState) && (this._localState = deepMerge(this._localState, stateUpdates));
  }
  _setEvents(events) {
    this._events = [...events];
    this._events.forEach(eventInfo => {
      eventInfo.start = getMomentSecondary()(eventInfo.start);
      eventInfo.end = eventInfo.end ? getMomentSecondary()(eventInfo.end) : eventInfo.start.clone().add(1, "hours");
    });
    this._events.sort((leftEvent, rightEvent) => leftEvent.start > rightEvent.start);
  }
  _buildRangeOptions(dateRange) {
    const {
      start: start,
      end: end
    } = dateRange;
    const rangeOptions = {
      start: start,
      end: end
    };
    const marginMillis = (rangeOptions.end - rangeOptions.start) * this._options.marginPercent * .01;
    rangeOptions.min = rangeOptions.start.clone().subtract(marginMillis, "milliseconds");
    rangeOptions.max = rangeOptions.end.clone().add(marginMillis, "milliseconds");
    rangeOptions.range = rangeOptions.max - rangeOptions.min;
    this.setOptions(rangeOptions);
  }
  _setStartEndDates() {
    const {
      start: start,
      end: end
    } = this._options;
    const {
      rangeDateStart: rangeDateStart,
      rangeDateEnd: rangeDateEnd
    } = this._children;
    rangeDateStart.setAttribute("datetime", start.toISOString());
    rangeDateStart.innerText = start.format("MMM DD, YYYY");
    rangeDateEnd.setAttribute("datetime", end.toISOString());
    rangeDateEnd.innerText = end.format("MMM DD, YYYY");
  }
  _calcCoverage(entityId, {
    start: start,
    end: end
  } = {}) {
    let {
      min: min,
      max: max
    } = this._app.getManager("time").getDefaultLimits();
    const coverage = this._app.getManager("scene").getCoverage(entityId);
    null !== coverage.min && (min = getMomentSecondary().max(min, coverage.min));
    null !== coverage.max && (max = getMomentSecondary().min(max, coverage.max));
    start && (min = getMomentSecondary()(start));
    end && (max = getMomentSecondary()(end));
    return {
      start: min,
      end: max
    };
  }
  setTarget({
    id: id,
    title: title,
    dates: dates,
    orderedEvents: orderedEvents
  }) {
    const targetChanged = id !== this._localState.target;
    if (id && orderedEvents && (this.setTime(), targetChanged)) {
      this.setLocalState({
        target: id,
        title: title,
        dates: dates
      });
      this._setEvents(orderedEvents);
      const targetCoverage = this._calcCoverage(id, dates);
      this._buildRangeOptions(targetCoverage);
      this._setStartEndDates();
    }
  }
  checkForZoom(eventInfo) {
    if (!this._markers) return;
    const containingMarker = this._markers.find(candidateMarker => candidateMarker.events.length > 1 ? candidateMarker.events?.find(candidateEvent => candidateEvent?.id === eventInfo?.id) : null);
    eventInfo && containingMarker ? this._zoomIntoCluster(containingMarker) : this._zoomOutOfCluster();
  }
  show() {
    super.show();
    this._setResizeTimeout(200);
  }
  hide() {
    super.hide();
  }
  __disable() {
    clearTimeout(this._resizeTimeout);
    super.__disable();
  }
  goToTime(selectedTime) {
    const currentUrl = this.routeManager.currentRoute.url;
    const eventsSegmentIndex = currentUrl.indexOf("events");
    const objectRoute = eventsSegmentIndex > -1 ? currentUrl.slice(0, eventsSegmentIndex) : currentUrl;
    const timeUrl = this._app.getManager("time").getTimeUrl(selectedTime);
    this.routeManager.navigate({
      time: timeUrl
    }, objectRoute);
  }
  goToEvent(eventId) {
    const currentUrl = this.routeManager.currentRoute.url;
    const eventsSegmentIndex = currentUrl.lastIndexOf("events");
    let eventRoute = `${currentUrl}${currentUrl.endsWith("/") ? "" : "/"}`;
    -1 === eventsSegmentIndex ? eventRoute += `events/${eventId}` : (eventRoute.endsWith("https://eyes.nasa.gov/apps/solar-system/events/") || (eventRoute = eventRoute.slice(0, eventsSegmentIndex + 7)), eventRoute += eventId);
    this.routeManager.navigate(eventRoute);
  }
  setTime() {
    const routeTime = this.routeManager.query.time;
    routeTime && this.setLocalState({
      time: getMomentSecondary()(routeTime).valueOf()
    });
  }
  update(currentTime) {
    this._state.isVisible && this.isEnabled() && this._setViewingLineXThrottled(currentTime);
  }
}
EventsTimeline.html = getEventsTimelineTemplate();
export { EventsTimeline };
