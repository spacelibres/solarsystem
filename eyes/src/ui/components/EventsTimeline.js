/** @eyes-analysis
 * 文件职责：航天器事件时间轴、播放和当前事件选择
 * 依据：imports: ../../vendor/modules/MomentSecondary.cjs, ../../framework/eyes/index.js, ../../styles/extracted/EventsTimelineStyles.js, ../templates/EventsTimelineTemplate.html；manager dependencies: router, time, scene
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
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
const u = "1px";
/** @eyes-analysis
 * 类职责：航天器事件时间轴、播放和当前事件选择；继承 Eyes.BaseComponent
 * 继承：Eyes.BaseComponent；导出：EventsTimeline。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class EventsTimeline extends Eyes.BaseComponent {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 this._app.getComponent, this.setState, this.bindFunctions, this.setOptions, this._app.getManager；写入 _settings, defaultOptions, _localState, _events, _markers, _tooltips, _animations, _setViewingLineXThrottled, _onFpTouchMoveThrottled, _showToolTipDebounced, _resizeDebounced, _onMarkerMouseEnterDebounced。
   * 状态写入：_animations、_events、_localState、_markers、_onFpMouseLeaveDebounced、_onFpTouchMoveThrottled、_onMarkerMouseEnterDebounced、_onMarkerMouseLeaveDebounced等；完整记录见索引。
   * 调用线索：debounce、super、this._app.getComponent、this._app.getManager、this.bindFunctions等。
   */
  constructor(t, e, i = {}) {
    super(t, e);
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
      ...i
    }, true);
    this.routeManager = this._app.getManager("router");
  }
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 super.init, this._settings.addTooltips, this._callbackRegistry.push, this._app.getManager, this._app.getComponent, this._setResizeTimeout。
   * 状态写入：_tooltips.timelinebar。
   * 调用线索：super.init、this._app.getComponent、this._app.getManager、this._callbackRegistry.push、this._setResizeTimeout等。
   */
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
    const s = isTouch ? {
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
    this._tooltips.timelinebar = this._settings.addTooltips([timelinebar], s);
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
  /** @eyes-analysis
   * 执行 _addFpTooltips 对应的组件业务步骤；调用 this._settings.addTooltips。
   * 状态写入：_tooltips.focusPanel。
   * 调用线索：this._settings.addTooltips。
   */
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
    const n = isTouch ? focusPanel : fpTicksContainer;
    const o = isTouch ? {
      props: {
        content: tooltips.tap,
        interactive: true,
        appendTo: n,
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
    this._tooltips.focusPanel = this._settings.addTooltips([n], o);
  }
  /** @eyes-analysis
   * 执行 _createAnimation 对应的组件业务步骤。
   * 调用线索：new Animation、new KeyframeEffect。
   */
  _createAnimation(t, e, i) {
    const keyframeEffect = new KeyframeEffect(t, e, i);
    return new Animation(keyframeEffect, t.ownerDocument.timeline);
  }
  /** @eyes-analysis
   * 执行 _depopulateFocusPanel 对应的组件业务步骤；调用 Content.removeChild。
   * 调用线索：fpContent.removeChild。
   */
  _depopulateFocusPanel() {
    const {
      fpContent: fpContent
    } = this._children;
    for (; fpContent.firstChild;) fpContent.removeChild(fpContent.firstChild);
  }
  /** @eyes-analysis
   * 执行 _populateFocusPanel 对应的组件业务步骤；调用 this._calcXfromTime, EventXs.push, this._onViewClick, Array.from, Content.appendChild, this._setVariables。
   * 调用线索：Array.from、Array.from(fpContent.children).includes、document.createElement、fpContent.appendChild、l.style.setProperty等。
   */
  _populateFocusPanel(t) {
    const {
      focusPanel: focusPanel,
      activeEventId: activeEventId,
      isTouch: isTouch
    } = this._localState;
    const {
      timelinebar: timelinebar
    } = this._localState;
    const {
      focusPanel: o,
      classNames: classNames
    } = this._options;
    const {
      fpContent: fpContent,
      fpMask: fpMask
    } = this._children;
    focusPanel.contentWidth || (focusPanel.contentWidth = timelinebar.width);
    const c = .01 * o.padding * focusPanel.contentWidth;
    const h = .01 * o.events.threshold * focusPanel.contentWidth;
    const d = .5 * o.events.width;
    const u = focusPanel.contentWidth - 2 * c;
    t.fpEventXs = [];
    const p = t.events.map((e, s) => [this._calcXfromTime(e.start, t.min, t.timeRange, u) + c, 0 !== s, e.id === activeEventId]);
    for (let t = 0; t < p.length - 1; t++) {
      const e = p[t];
      const i = p[t + 1];
      const [s, n] = e;
      const [o] = i;
      const r = o - d - (s + d);
      if (r < h) {
        const t = h - r;
        if (n) {
          const s = .5 * t;
          e[0] -= s;
          i[0] += s;
        } else i[0] += t;
        i[1] = false;
      }
    }
    t.fpEventElements = p.map(e => {
      const [i,, n] = e;
      t.fpEventXs.push(i);
      const l = document.createElement("div");
      l.className = `${classNames.focusPanel.eventLine} ${n ? "active" : ""}`;
      isTouch && (l.ontouchstart = t => t.preventDefault(), l.ontouchend = this._onFpEventTouch);
      this._app.canHover && (l.onmouseenter = this._onFpEventMouseOver, l.onclick = t => {
        t.preventDefault();
        t.stopPropagation();
        this._onViewClick(t);
      });
      l.style.setProperty("width", `${o.events.width}px`);
      l.style.setProperty("left", `${i}px`);
      Array.from(fpContent.children).includes(l) || fpContent.appendChild(l);
      return l;
    });
    fpMask.onclick = t => {
      t.preventDefault();
      t.stopPropagation();
      this._onViewClick(t);
    };
    this._setVariables(fpContent);
  }
  /** @eyes-analysis
   * 执行 _createEventsAndMarkers 对应的组件业务步骤；调用 this._events.forEach, this._calcWidthBtwnTimes, this._addToCluster, this._markers.forEach, Array.from, List.contains, List.toggle。
   * 调用线索：Array.from、Array.from(t.element.children).find、document.createTextNode、e.appendChild、t.classList.contains等。
   */
  _createEventsAndMarkers() {
    const {
      timelinebar: timelinebar
    } = this._localState;
    const {
      events: events
    } = this._options;
    const i = .01 * events.clusterThresh * timelinebar.width;
    this._events.forEach((t, e) => {
      const s = this._events[e - 1];
      let n = true;
      if (s) {
        this._calcWidthBtwnTimes(s.end, t.start) < i && (n = false);
      }
      this._addToCluster(t, n);
    });
    this._markers.forEach(t => {
      const e = Array.from(t.element.children).find(t => t.classList.contains("cluster-num-events"));
      e && t.events.length > 1 && e.appendChild(document.createTextNode(t.events.length));
      t.element.classList.toggle("single-event", t.events.length < 2);
    });
  }
  /** @eyes-analysis
   * 执行 _createEventElement 对应的组件业务步骤；调用 this._calcMidpointX, Container.appendChild。
   * 调用线索：document.createElement、eventContainer.appendChild、s.style.setProperty、this._calcMidpointX。
   */
  _createEventElement(t) {
    const {
      classNames: classNames
    } = this._options;
    const {
      eventContainer: eventContainer
    } = this._children;
    const s = document.createElement("div");
    s.className = classNames.eventStatic;
    const n = this._calcMidpointX(t.start, t.end);
    s.style.setProperty("left", `${t.cluster ? t.leftX : n}px`);
    eventContainer.appendChild(s);
  }
  /** @eyes-analysis
   * 执行 _addToCluster 对应的组件业务步骤；调用 this._getLastCluster, this._calcEventClusterMax, this._onViewClick, Container.appendChild, this._markers.push, this._markers.find, List.add, Array.from, List.contains。
   * 调用线索：Array.from、Array.from(a.element.children).some、a.element.appendChild、a.element.classList.add、document.createElement等。
   */
  _addToCluster(t, e = true) {
    const {
      classNames: classNames
    } = this._options;
    const {
      markerContainer: markerContainer
    } = this._children;
    const n = this._getLastCluster();
    const o = this._calcEventClusterMax();
    const r = n && n.events.length === o;
    if (e || !n || r) {
      const e = document.createElement("div");
      e.className = classNames.clusterMarker;
      e.ontouchstart = this._onMarkerTouch;
      e.onmouseenter = this._onMarkerMouseEnterDebounced;
      e.onmouseleave = this._onMarkerMouseLeaveDebounced;
      e.onmousemove = this._onMarkerMouseMove;
      e.onclick = t => {
        t.preventDefault();
        t.stopPropagation();
        this._onViewClick(t);
      };
      markerContainer.appendChild(e);
      this._markers.push({
        cluster: true,
        element: e,
        events: [t],
        fpEventElements: [],
        fpEventXs: []
      });
    } else n.events.push(t);
    const a = this._markers.find(e => e.events.includes(t));
    if (a && a.events.length > 1) {
      const t = document.createElement("div");
      t.classList.add("cluster-num-events");
      Array.from(a.element.children).some(t => t.classList.contains("cluster-num-events")) || a.element.appendChild(t);
      a.element.classList.add("cluster-dashed-line");
    }
  }
  /** @eyes-analysis
   * 执行 _createClusterEventLine 对应的组件业务步骤；调用 this._children.markerContainer.appendChild；写入 _clusterEventLine。
   * 状态写入：_clusterEventLine、_clusterEventLine.className。
   * 调用线索：document.createElement、this._children.markerContainer.appendChild。
   */
  _createClusterEventLine() {
    if (this._clusterEventLine) return;
    const {
      classNames: classNames
    } = this._options;
    this._clusterEventLine = document.createElement("div");
    this._clusterEventLine.className = classNames.clusterEventLine;
    this._children.markerContainer.appendChild(this._clusterEventLine);
  }
  /** @eyes-analysis
   * 执行 _populate 对应的组件业务步骤；调用 this._destroy, this._createEventsAndMarkers, this._setMarkerPositions, this._markers.some, this.setLocalState, this._createClusterEventLine, this._setVariables。
   * 调用线索：this._createClusterEventLine、this._createEventsAndMarkers、this._destroy、this._markers.some、this._setMarkerPositions等。
   */
  _populate() {
    if (!this._events.length || "hidden" !== this._state.focusContentVisibleClass) return;
    this._destroy();
    this._createEventsAndMarkers();
    this._setMarkerPositions();
    const t = this._markers.some(t => t.cluster);
    this.setLocalState({
      focusPanel: {
        enabled: t
      }
    });
    t && this._createClusterEventLine();
    this._setVariables(this._children.markerContainer);
  }
  /** @eyes-analysis
   * 执行 _destroy 对应的组件业务步骤；调用 this._depopulateFocusPanel, Container.removeChild, EventElements.filter；写入 _markers。
   * 状态写入：_markers。
   * 调用线索：eventContainer.removeChild、markerContainer.removeChild、t.element.remove、t.fpEventElements.filter、t.remove等。
   */
  _destroy() {
    this._depopulateFocusPanel();
    const {
      markerContainer: markerContainer,
      eventContainer: eventContainer
    } = this._children;
    for (; markerContainer.firstChild;) markerContainer.removeChild(markerContainer.firstChild);
    for (; eventContainer.firstChild;) eventContainer.removeChild(eventContainer.firstChild);
    if (this._markers.length) for (const t of this._markers) {
      t.element.remove();
      t.fpEventElements && t.fpEventElements.filter(t => (t.remove(), false));
    }
    this._markers = [];
  }
  /** @eyes-analysis
   * 执行 _setClickedOnce 对应的组件业务步骤；调用 this.setLocalState。
   * 调用线索：setTimeout、this.setLocalState。
   */
  _setClickedOnce(t, e = true) {
    const {
      doubleTimeout: doubleTimeout
    } = this._options;
    this.setLocalState({
      [t]: {
        clickedOnce: e
      }
    });
    e && setTimeout(() => {
      this.setLocalState({
        [t]: {
          clickedOnce: false
        }
      });
    }, doubleTimeout);
  }
  /** @eyes-analysis
   * 执行 _onTimelineMouseLeave 对应的组件业务步骤；调用 this._hideTooltip, this.setState, this.setLocalState。
   * 调用线索：this._hideTooltip、this.setLocalState、this.setState。
   */
  _onTimelineMouseLeave(t) {
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
  /** @eyes-analysis
   * 执行 _onTimelineMouseMove 对应的组件业务步骤；调用 this._hideTooltip, this._onMarkerMouseEnterDebounced.cancel, this._calcTimefromTimelineX, this.setState, this.setLocalState, this._setDateAndPosition, this._showToolTipDebounced。
   * 调用线索：o.isAfter、o.isBefore、this._calcTimefromTimelineX、this._hideTooltip、this._onMarkerMouseEnterDebounced.cancel等。
   */
  _onTimelineMouseMove(t) {
    if (this._hideTooltip(), this._onMarkerMouseEnterDebounced.cancel(), this._resizeTimeout) return;
    const {
      timelinebar: timelinebar
    } = this._localState;
    const {
      start: start,
      end: end
    } = this._options;
    const n = t.clientX - timelinebar.left;
    const o = this._calcTimefromTimelineX(n);
    const r = o.isBefore(start) || o.isAfter(end);
    this.setState({
      targetLineVisibleClass: r ? "hidden" : "",
      targetDateVisibleClass: r ? "hidden" : "",
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
    r || (this._setDateAndPosition(o, n), t.target === this._children.timelinebar && this._showToolTipDebounced());
  }
  /** @eyes-analysis
   * 执行 _onTimelineClick 对应的组件业务步骤；调用 this._calcTimefromTimelineX, this.goToTime, this.setLocalState。
   * 调用线索：s.valueOf、this._calcTimefromTimelineX、this.goToTime、this.setLocalState。
   */
  _onTimelineClick(t) {
    if (t.target !== this._children.timelinebar) return;
    const {
      timelinebar: timelinebar
    } = this._localState;
    const i = t.clientX - timelinebar.left;
    const s = this._calcTimefromTimelineX(i);
    this.goToTime(s);
    this.setLocalState({
      time: s.valueOf()
    });
  }
  /** @eyes-analysis
   * 执行 _onMarkerMouseEnter 对应的组件业务步骤；调用 this._markers.find, this._markers.indexOf, this.setLocalState, this._hideTooltip, this.setState, this._app.getComponent, Eyes.AppUtils.isMobilePortrait, this._markers.forEach, this._setActive, this._setFocusPanelPos, this._setEventName, this._setDateAndPosition。
   * 调用线索：Eyes.AppUtils.isMobilePortrait、a.element.style.setProperty、r?.element.style.setProperty、this._app.getComponent、this._app.getComponent("eventsBlock").setState等。
   */
  _onMarkerMouseEnter(t) {
    const {
      focusPanel: focusPanel,
      animMarkerIndex: animMarkerIndex,
      activeMarkerIndex: activeMarkerIndex
    } = this._localState;
    const {
      currentHoverMarkerIndex: currentHoverMarkerIndex
    } = this._localState;
    const r = this._markers[currentHoverMarkerIndex];
    const a = this._markers.find(e => e.element === t.target) || this._markers[activeMarkerIndex];
    const l = this._markers.indexOf(a);
    const c = this._markers[animMarkerIndex];
    if (this.setLocalState({
      currentHoverMarkerIndex: l
    }), r?.element.style.setProperty("width", u), focusPanel.active && !t.force) return;
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
      activeMarkerIndex: l,
      animMarkerIndex: a?.cluster ? l : this._localState.animMarkerIndex,
      ...(!a?.cluster && {
        activeEventId: a ? a.events[0].id : this._localState.activeEventId
      })
    }), this._markers.forEach(t => this._setActive(t.element, t === a)), a) if (a.cluster) {
      if (c === a) return;
      this._setFocusPanelPos(a);
    } else {
      const t = a.events[0];
      this._setEventName(t.title, t.start);
      this._setDateAndPosition(t.start, a.leftX);
    }
    r && r.events?.length > 1 && (r.element.children[0].innerHTML = r.events.length);
    a && (a.element.style.setProperty("width", "3px"), a.events?.length > 1 && (a.element.children[0].innerHTML = "+"));
  }
  /** @eyes-analysis
   * 执行 _onMarkerMouseLeave 对应的组件业务步骤；调用 this._resetStates。
   * 调用线索：e.element.style.setProperty、this._resetStates。
   */
  _onMarkerMouseLeave() {
    this._resetStates();
    const {
      currentHoverMarkerIndex: currentHoverMarkerIndex
    } = this._localState;
    const e = this._markers[currentHoverMarkerIndex];
    e && (e.element.style.setProperty("width", u), e.events?.length > 1 && (e.element.children[0].innerHTML = e.events.length));
  }
  /** @eyes-analysis
   * 执行 _onMarkerMouseMove 对应的组件业务步骤；调用 this._onFpMouseLeaveDebounced.cancel, this._onMarkerMouseLeaveDebounced.cancel, this._markers.find, List.contains, this._getNearestIndex, this._setDateAndPosition, this._setClusterEvent, this._setEventName, this.setLocalState。
   * 调用线索：t.stopPropagation、t.target.classList.contains、this._getNearestIndex、this._markers.find、this._onFpMouseLeaveDebounced.cancel等。
   */
  _onMarkerMouseMove(t) {
    t.stopPropagation();
    this._onFpMouseLeaveDebounced.cancel();
    this._onMarkerMouseLeaveDebounced.cancel();
    const {
      timelinebar: timelinebar,
      activeEventId: activeEventId,
      activeMarkerIndex: activeMarkerIndex,
      animMarkerIndex: animMarkerIndex
    } = this._localState;
    const o = this._markers.find(e => {
      let i;
      t.target.classList.contains("single-event") && (i = t.target.parentElement);
      return (e.element ?? i) === t.target;
    });
    const r = t.clientX - timelinebar.left;
    if (o) {
      const t = o.cluster ? this._getNearestIndex(r, o.eventXs) : 0;
      const e = o.events[t];
      const a = activeEventId === e.id;
      const l = activeMarkerIndex !== animMarkerIndex;
      if (l && this._setDateAndPosition(e.start, o.leftX), a || l) return;
      o.cluster ? this._setClusterEvent(o, t) : (this._setEventName(e.title, e.start), this._setDateAndPosition(e.start, o.leftX));
    }
    this.setLocalState({
      focusPanel: {
        active: false
      }
    });
  }
  /** @eyes-analysis
   * 执行 _onFpMouseEnter 对应的组件业务步骤；调用 this._onMarkerMouseLeaveDebounced.cancel, this._onFpMouseLeaveDebounced.cancel, this.setLocalState。
   * 调用线索：this._onFpMouseLeaveDebounced.cancel、this._onMarkerMouseLeaveDebounced.cancel、this.setLocalState。
   */
  _onFpMouseEnter() {
    this._onMarkerMouseLeaveDebounced.cancel();
    this._onFpMouseLeaveDebounced.cancel();
    this.setLocalState({
      focusPanel: {
        active: true
      }
    });
  }
  /** @eyes-analysis
   * 执行 _onFpMouseLeave 对应的组件业务步骤；调用 this._resetStates。
   * 调用线索：this._resetStates。
   */
  _onFpMouseLeave(t) {
    "hidden" !== this._state.fpVisibleClass && this._resetStates();
  }
  /** @eyes-analysis
   * 执行 _onFpEventMouseOver 对应的组件业务步骤；调用 this._hideTooltip, this._getMarkerAndIndexFromFocusEl, this._setClusterEvent, EventElements.find, List.contains, this._setFocusPanelPos, this.setState, this._app.getComponent。
   * 调用线索：Number、e.fpEventElements.find、s.style.left.split、t.classList.contains、this._app.getComponent等。
   */
  _onFpEventMouseOver(t) {
    this._hideTooltip();
    const [e, i] = this._getMarkerAndIndexFromFocusEl(t.target);
    this._setClusterEvent(e, i);
    const s = e.fpEventElements.find(t => t.classList.contains("active"));
    const n = {
      element: s,
      leftX: Number(s.style.left.split("px")[0])
    };
    this._setFocusPanelPos(n);
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
  /** @eyes-analysis
   * 执行 _onFpTicksMouseEnter 对应的组件业务步骤；调用 this._setFpElementActive, this._setEventName。
   * 调用线索：this._setEventName、this._setFpElementActive。
   */
  _onFpTicksMouseEnter() {
    const {
      activeMarkerIndex: activeMarkerIndex,
      title: title
    } = this._localState;
    const i = this._markers[activeMarkerIndex];
    i && this._setFpElementActive(i);
    this._setEventName(`Between ${title} events`);
  }
  /** @eyes-analysis
   * 执行 _onFpTicksMouseMove 对应的组件业务步骤；调用 this._hideTooltip, this.setState, this.setLocalState, this._calcTimeFromFpX, this._calcXfromTime, this._setDateAndPosition, this._setClusterLineTransform, this._children.focusPanel.style.setProperty, this._showToolTipDebounced。
   * 调用线索：this._calcTimeFromFpX、this._calcXfromTime、this._children.focusPanel.style.setProperty、this._hideTooltip、this._setClusterLineTransform等。
   */
  _onFpTicksMouseMove(t) {
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
        touchLineX: t.offsetX
      }
    });
    const s = this._calcTimeFromFpX(t.offsetX);
    const n = this._calcXfromTime(s);
    this._setDateAndPosition(s, n);
    this._setClusterLineTransform(n);
    this._children.focusPanel.style.setProperty("--fp-dateline-X", `${t.offsetX}px`);
    this._localState.activeEventId || this._showToolTipDebounced("focusPanel");
  }
  /** @eyes-analysis
   * 执行 _onFpTicksMouseLeave 对应的组件业务步骤；调用 this._hideTooltip。
   * 调用线索：this._hideTooltip。
   */
  _onFpTicksMouseLeave() {
    this._hideTooltip();
  }
  /** @eyes-analysis
   * 执行 _onFpTicksClick 对应的组件业务步骤；调用 this._hideTooltip, this._calcTimeFromFpX, this.goToTime, this.setLocalState。
   * 调用线索：i.valueOf、this._calcTimeFromFpX、this._hideTooltip、this.goToTime、this.setLocalState。
   */
  _onFpTicksClick() {
    this._hideTooltip();
    const {
      focusPanel: focusPanel,
      activeMarkerIndex: activeMarkerIndex
    } = this._localState;
    if (focusPanel.animating || -1 === activeMarkerIndex) return;
    const i = this._calcTimeFromFpX(focusPanel.touchLineX);
    this.goToTime(i);
    this.setLocalState({
      time: i.valueOf()
    });
  }
  /** @eyes-analysis
   * 执行 _onViewClick 对应的组件业务步骤；调用 this._hideTooltip, this._zoomIntoCluster, this.goToEvent, this._onDateTouchEnd, this.setLocalState。
   * 调用线索：l.events.find、t.target.firstChild?.classList?.contains、t?.target?.parentElement?.classList?.contains、this._hideTooltip、this._onDateTouchEnd等。
   */
  _onViewClick(t) {
    this._hideTooltip();
    const {
      activeEventId: activeEventId,
      activeMarkerIndex: activeMarkerIndex,
      currentHoverMarkerIndex: currentHoverMarkerIndex
    } = this._localState;
    const {
      fpTargetLineVisibleClass: fpTargetLineVisibleClass
    } = this._state;
    let o = "string" == typeof t ? t : activeEventId;
    const r = t?.target?.parentElement?.classList?.contains("fp-details");
    const a = t?.target?.firstChild && !t.target.firstChild?.classList?.contains("single-event") && !r;
    const l = this._markers[currentHoverMarkerIndex >= 0 ? currentHoverMarkerIndex : activeMarkerIndex];
    o || a || (o = l.events.find(t => t.title === this._state.fpEventName)?.id);
    a ? this._zoomIntoCluster(l) : null !== o ? this.goToEvent(o) : "" === fpTargetLineVisibleClass && this._onDateTouchEnd();
    this.setLocalState({
      time: null
    });
  }
  /** @eyes-analysis
   * 执行 _zoomIntoCluster 对应的组件业务步骤；调用 Container.removeChild, this._buildRangeOptions, this._setStartEndDates, this._populateFocusPanel, this.setState。
   * 调用线索：eventContainer.removeChild、markerContainer.removeChild、this._buildRangeOptions、this._populateFocusPanel、this._setStartEndDates等。
   */
  _zoomIntoCluster(t = null) {
    const e = this._markers[this._localState.animMarkerIndex] || t;
    const {
      markerContainer: markerContainer,
      eventContainer: eventContainer
    } = this._children;
    for (; markerContainer.firstChild;) markerContainer.removeChild(markerContainer.firstChild);
    for (; eventContainer.firstChild;) eventContainer.removeChild(eventContainer.firstChild);
    if (e?.events) {
      const t = e.events[0];
      const i = e.events[e.events.length - 1];
      this._buildRangeOptions({
        start: t.start,
        end: i.end
      });
      this._setStartEndDates();
      this._populateFocusPanel(e);
    }
    this.setState({
      resetZoomVisibleClass: "",
      focusContentVisibleClass: "",
      fpVisibleClass: ""
    });
  }
  /** @eyes-analysis
   * 执行 _zoomOutOfCluster 对应的组件业务步骤；调用 this._app.getView, this._calcCoverage, this._buildRangeOptions, this._setStartEndDates, this.setState, this._populate。
   * 调用线索：this._app.getView、this._app.getView("object")?.getCurrentTarget、this._buildRangeOptions、this._calcCoverage、this._populate等。
   */
  _zoomOutOfCluster() {
    const {
      target: target,
      dates: dates
    } = this._localState;
    let i = target;
    target || (i = this._app.getView("object")?.getCurrentTarget());
    const {
      start: start,
      end: end
    } = this._calcCoverage(i, dates);
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
  /** @eyes-analysis
   * 执行 _onFpWheel 对应的组件业务步骤；调用 this._hideTooltip, Math.abs, this._onMarkerMouseEnter, this.setLocalState, this._createAnimation。
   * 调用线索：Math.abs、a.play、r.play、t.preventDefault、this._createAnimation等。
   */
  _onFpWheel(t) {
    t.preventDefault();
    const {
      focusPanel: focusPanel,
      animMarkerIndex: animMarkerIndex
    } = this._localState;
    const s = .5 * focusPanel.contentWidth;
    const n = focusPanel.wheelX - t.deltaX;
    if (this._hideTooltip(), focusPanel.animating) return;
    if (Math.abs(n) > s) {
      const t = n > 0 ? this._markers[animMarkerIndex - 1] : this._markers[animMarkerIndex + 1];
      return void this._onMarkerMouseEnter({
        target: t.element,
        force: true
      });
    }
    this.setLocalState({
      focusPanel: {
        wheelX: n
      }
    });
    const o = {
      duration: 200,
      fill: "forwards",
      easing: "ease-out"
    };
    const r = this._createAnimation(this._children.fpContent, {
      transform: `translateX(${n}px) rotate(0.01deg)`
    }, o);
    const a = this._createAnimation(this._children.fpTicksContainer, {
      transform: `translateX(${n}px)`
    }, o);
    r.play();
    a.play();
  }
  /** @eyes-analysis
   * 执行 _onFpTouchStart 对应的组件业务步骤；调用 this._hideTooltip, this.setLocalState。
   * 调用线索：this._hideTooltip、this.setLocalState。
   */
  _onFpTouchStart(t) {
    this._hideTooltip();
    const e = t.touches[0].clientX;
    this.setLocalState({
      focusPanel: {
        touchX: e
      }
    });
  }
  /** @eyes-analysis
   * 执行 _onFpTouchEnd 对应的组件业务步骤；调用 this.setLocalState。
   * 调用线索：this.setLocalState。
   */
  _onFpTouchEnd() {
    this.setLocalState({
      focusPanel: {
        clickEnabled: true
      }
    });
  }
  /** @eyes-analysis
   * 执行 _onFpTouchMove 对应的组件业务步骤；调用 Math.abs, this.setLocalState, this._onMarkerTouch, this._createAnimation。
   * 调用线索：Math.abs、d.play、h.play、this._createAnimation、this._onMarkerTouch等。
   */
  _onFpTouchMove(t) {
    const {
      timelinebar: timelinebar,
      focusPanel: focusPanel,
      animMarkerIndex: animMarkerIndex
    } = this._localState;
    if (focusPanel.animating) return;
    const n = t.touches[0].clientX;
    const o = n - focusPanel.touchX;
    const r = focusPanel.touchDeltaX + o;
    const a = {
      touchX: n,
      touchDeltaX: r
    };
    focusPanel.clickEnabled && Math.abs(o) > 2 && (a.clickEnabled = false);
    this.setLocalState({
      focusPanel: a
    });
    const l = .7 * this._localState.focusPanel.contentWidth;
    if (Math.abs(r) > l) {
      const t = r > 0;
      const i = t ? this._markers[animMarkerIndex - 1] : this._markers[animMarkerIndex + 1];
      this._onMarkerTouch({
        target: i.element,
        touches: [{
          clientX: t ? timelinebar.width : 0
        }]
      });
    }
    const c = {
      duration: 100,
      fill: "forwards",
      easing: "ease-out"
    };
    const h = this._createAnimation(this._children.fpContent, {
      transform: `translateX(${r}px) rotate(0.01deg)`
    }, c);
    const d = this._createAnimation(this._children.fpTicksContainer, {
      transform: `translateX(${r}px)`
    }, c);
    h.play();
    d.play();
  }
  /** @eyes-analysis
   * 执行 _onFpTicksTouchStart 对应的组件业务步骤；调用 this._hideTooltip, this.setLocalState, Math.abs, this._setClickedOnce, this.setState, this._setEventName, this._setFpElementActive, this._calcTimeFromFpX, this._calcXfromTime, this._setDateAndPosition, this._setClusterLineTransform, this._children.focusPanel.style.setProperty。
   * 调用线索：Math.abs、t.preventDefault、t.stopPropagation、this._calcTimeFromFpX、this._calcXfromTime等。
   */
  _onFpTicksTouchStart(t) {
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
    const u = t.touches[0].clientX - left - arrowWidth - touchDeltaX - timelinebar.left;
    if (t.preventDefault(), t.stopPropagation(), focusPanel.animating || -1 === activeMarkerIndex) return;
    if (this._hideTooltip(), this.setLocalState({
      focusPanel: {
        touchLineX: u
      }
    }), clickedOnce) {
      if (Math.abs(touchLineX - u) < doubleThreshold) {
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
    const p = this._markers[activeMarkerIndex];
    this._setFpElementActive(p);
    const _ = this._calcTimeFromFpX(u);
    const m = left + .5 * totalWidth;
    const g = this._calcXfromTime(_);
    this._setDateAndPosition(_, m);
    this._setClusterLineTransform(g);
    this._children.focusPanel.style.setProperty("--fp-dateline-X", `${u}px`);
  }
  /** @eyes-analysis
   * 执行 _onFpTicksTouchMove 对应的组件业务步骤；调用 this.setLocalState, this.setState, this._calcTimeFromFpX, this._calcXfromTime, this._setDateAndPosition, this._setClusterLineTransform, this._children.focusPanel.style.setProperty。
   * 调用线索：t.stopPropagation、this._calcTimeFromFpX、this._calcXfromTime、this._children.focusPanel.style.setProperty、this._setClusterLineTransform等。
   */
  _onFpTicksTouchMove(t) {
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
    const l = t.touches[0].clientX - left - arrowWidth - touchDeltaX - timelinebar.left;
    if (t.stopPropagation(), focusPanel.animating || -1 === activeMarkerIndex) return;
    this.setLocalState({
      focusPanel: {
        touchLineX: l
      }
    });
    this.setState({
      fpTargetLineVisibleClass: "",
      targetDateVisibleClass: "fp",
      targetDateColorClass: "yellow",
      clusterLineColorClass: "yellow",
      clusterLineVisibleClass: ""
    });
    const c = this._calcTimeFromFpX(l);
    const h = left + .5 * totalWidth;
    const d = this._calcXfromTime(c);
    this._setDateAndPosition(c, h);
    this._setClusterLineTransform(d);
    this._children.focusPanel.style.setProperty("--fp-dateline-X", `${l}px`);
  }
  /** @eyes-analysis
   * 执行 _onFpTicksTouchEnd 对应的组件业务步骤；调用 this.setLocalState, this._onDateTouchEnd。
   * 调用线索：t.stopPropagation、this._onDateTouchEnd、this.setLocalState。
   */
  _onFpTicksTouchEnd(t) {
    t.stopPropagation();
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
  /** @eyes-analysis
   * 执行 _onMarkerTouch 对应的组件业务步骤；调用 this._markers.find, this._markers.indexOf, this._hideTooltip, this._markers.forEach, this._setActive, this.setState, Eyes.AppUtils.isMobilePortrait, this.setLocalState, this._getNearestIndex, this._setFpViewingLineStart, this._zoomIntoCluster, this._setFocusPanelPos, this._setFpAnimation, this._setEventNameDebounced.cancel。
   * 调用线索：Boolean、Eyes.AppUtils.isMobilePortrait、t.preventDefault、t.stopPropagation、this._getNearestIndex等。
   */
  _onMarkerTouch(t) {
    t.preventDefault && t.preventDefault();
    t.stopPropagation && t.stopPropagation();
    const {
      timelinebar: timelinebar,
      animMarkerIndex: animMarkerIndex,
      activeMarkerIndex: activeMarkerIndex
    } = this._localState;
    const n = this._markers.find(e => e.element === t.target);
    const r = this._markers.indexOf(n);
    const a = this._markers[animMarkerIndex];
    if (this._hideTooltip(), activeMarkerIndex !== r) {
      if (this._markers.forEach(t => this._setActive(t.element, t === n)), this.setState({
        targetLineVisibleClass: "hidden",
        targetDateVisibleClass: "hidden",
        targetDateColorClass: "white",
        fpTargetLineVisibleClass: "hidden",
        fpVisibleClass: "",
        rangeDatesVisibleClass: "hidden",
        fpViewingLineVisibleClass: "hidden",
        clusterLineVisibleClass: n?.cluster ? "" : "hidden"
      }), Eyes.AppUtils.isMobilePortrait() && this._settings?.hide(), this.setLocalState({
        focusPanel: {
          active: Boolean(n.cluster)
        },
        activeMarkerIndex: r,
        animMarkerIndex: n.cluster ? r : this._localState.animMarkerIndex
      }), n.cluster) {
        const i = t.touches[0].clientX;
        const s = this._getNearestIndex(i, n.eventXs);
        const o = timelinebar.viewingLineX < n.leftX;
        this._setFpViewingLineStart(o);
        n.events.length > 1 && this._zoomIntoCluster();
        this._setFocusPanelPos(n);
        this._setFpAnimation(a, n, s);
      } else {
        const t = n.events[0];
        this._setEventNameDebounced.cancel();
        this._setEventNameDebounced(t.title);
        this._setDateAndPosition(t.start, n.leftX);
        this._showToolTipDebounced();
      }
    } else n && !n.cluster && (this._onViewClick(n.events[0].id), this._resetStates());
  }
  /** @eyes-analysis
   * 执行 _onDateTouchStart 对应的组件业务步骤。
   * 调用线索：t.preventDefault。
   */
  _onDateTouchStart(t) {
    t.preventDefault();
  }
  /** @eyes-analysis
   * 执行 _onDateTouchEnd 对应的组件业务步骤；调用 this._calcTimeFromFpX, this._calcTimefromTimelineX, this.goToTime, this.setLocalState。
   * 调用线索：i.valueOf、this._calcTimeFromFpX、this._calcTimefromTimelineX、this.goToTime、this.setLocalState。
   */
  _onDateTouchEnd() {
    const {
      timelinebar: timelinebar,
      focusPanel: focusPanel
    } = this._localState;
    if (focusPanel.animating) return;
    const i = focusPanel.active ? this._calcTimeFromFpX(focusPanel.touchLineX) : this._calcTimefromTimelineX(timelinebar.touchLineX);
    this.goToTime(i);
    this.setLocalState({
      time: i.valueOf()
    });
  }
  /** @eyes-analysis
   * 执行 _onFpEventTouch 对应的组件业务步骤；调用 this._getMarkerAndIndexFromFocusEl, this._hideTooltip, this._setClusterEvent, this._onViewClick。
   * 调用线索：t.preventDefault、this._getMarkerAndIndexFromFocusEl、this._hideTooltip、this._onViewClick、this._setClusterEvent。
   */
  _onFpEventTouch(t) {
    t.preventDefault();
    const {
      focusPanel: focusPanel,
      activeEventId: activeEventId
    } = this._localState;
    if (!focusPanel.clickEnabled) return;
    const [s, n] = this._getMarkerAndIndexFromFocusEl(t.target);
    const o = s.events[n];
    this._hideTooltip();
    activeEventId !== o.id ? this._setClusterEvent(s, n) : this._onViewClick();
  }
  /** @eyes-analysis
   * 执行 _onFpArrowClick 对应的组件业务步骤；调用 this._markers.find, this._markers.indexOf, this._calcTimeFromFpX, this._hideTooltip, this._getNextEventIndexByTime, this._zoomOutOfCluster, this._onMarkerTouch, this._resetStates, this._setClusterEvent。
   * 调用线索：c.events.findIndex、t.events.find、t.preventDefault、t.target.getAttribute、this._calcTimeFromFpX等。
   */
  _onFpArrowClick(t) {
    t.preventDefault();
    const e = "left" === t.target.getAttribute("direction");
    const {
      timelinebar: timelinebar,
      activeMarkerIndex: activeMarkerIndex,
      activeEventId: activeEventId,
      focusPanel: focusPanel
    } = this._localState;
    const {
      fpTargetLineVisibleClass: fpTargetLineVisibleClass
    } = this._state;
    const a = this._markers.find(t => t.events.find(t => t.id === activeEventId));
    const l = this._markers.indexOf(a);
    const c = this._markers[activeMarkerIndex] || this._markers[l];
    if (void 0 === c) return;
    const h = c.events.findIndex(t => t.id === activeEventId);
    const d = "" === fpTargetLineVisibleClass ? this._calcTimeFromFpX(focusPanel.touchLineX) : this._localState.time;
    this._hideTooltip();
    const u = h > -1 ? e ? h - 1 : h + 1 : this._getNextEventIndexByTime(d, c, e);
    if (!c.events[u]) {
      c.events.length > 1 && this._zoomOutOfCluster();
      const t = e ? this._markers[activeMarkerIndex - 1] : this._markers[activeMarkerIndex + 1];
      return void (t ? this._onMarkerTouch({
        target: t.element,
        touches: [{
          clientX: e ? timelinebar.width : 0
        }]
      }) : this._resetStates());
    }
    this._setClusterEvent(c, u);
  }
  /** @eyes-analysis
   * 执行 _onTimelineTouchStart 对应的组件业务步骤；调用 this._hideTooltip, this.setLocalState, Math.abs, this._setClickedOnce, this._resetStates, this.setState, this._setDateAndPosition。
   * 调用线索：Math.abs、t.preventDefault、this._hideTooltip、this._resetStates、this._setClickedOnce等。
   */
  _onTimelineTouchStart(t) {
    if (t.target !== this._children.timelinebar) return;
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
    const o = t.touches[0].clientX - timelinebar.left;
    if (t.preventDefault(), this._hideTooltip(), this.setLocalState({
      timelinebar: {
        touchLineX: o
      }
    }), clickedOnce) {
      if (Math.abs(touchLineX - o) < doubleThreshold) {
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
    const r = o / timelinebar.width;
    const a = this._options.min + this._options.range * r;
    this._setDateAndPosition(a, o);
  }
  /** @eyes-analysis
   * 执行 _onTimelineTouchMove 对应的组件业务步骤；调用 this.setLocalState, this.setState, this._setDateAndPosition。
   * 调用线索：end.valueOf、start.valueOf、this._setDateAndPosition、this.setLocalState、this.setState。
   */
  _onTimelineTouchMove(t) {
    const {
      start: start,
      end: end
    } = this._options;
    const {
      timelinebar: timelinebar,
      activeMarkerIndex: activeMarkerIndex
    } = this._localState;
    const o = t.touches[0].clientX - timelinebar.left;
    const r = o / timelinebar.width;
    const a = this._options.min + this._options.range * r;
    const l = o < 0 || o > timelinebar.width || a < start.valueOf() || a > end.valueOf();
    activeMarkerIndex > -1 || l || (this.setLocalState({
      timelinebar: {
        touchLineX: o
      }
    }), this.setState({
      targetLineVisibleClass: "",
      targetDateVisibleClass: ""
    }), this._setDateAndPosition(a, o));
  }
  /** @eyes-analysis
   * 执行 _onTimelineTouchEnd 对应的组件业务步骤；调用 this._onDateTouchEnd, this.setLocalState, this.setState。
   * 调用线索：clearTimeout、setTimeout、this._onDateTouchEnd、this.setLocalState、this.setState。
   */
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
    const s = setTimeout(() => {
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
        fadeTimeout: s
      }
    });
  }
  /** @eyes-analysis
   * 执行 _onOutsideTouch 对应的组件业务步骤；调用 this._element.contains, this._resetStates。
   * 调用线索：this._element.contains、this._resetStates。
   */
  _onOutsideTouch(t) {
    this._element.contains(t.target) || this._resetStates();
  }
  /** @eyes-analysis
   * 执行 _setResizeTimeout 对应的组件业务步骤；写入 _resizeTimeout。
   * 状态写入：_resizeTimeout。
   * 调用线索：clearTimeout、setTimeout。
   */
  _setResizeTimeout(t = 1e3) {
    clearTimeout(this._resizeTimeout);
    this._resizeTimeout = setTimeout(this._resizeDebounced, t);
  }
  /** @eyes-analysis
   * 执行 _onResize 对应的组件业务步骤；调用 this._resetStates, this._children.timelinebar.getBoundingClientRect, Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet, this.setLocalState, this._children.timelinebar.style.setProperty, this._populate；写入 _resizeTimeout。
   * 状态写入：_resizeTimeout。
   * 调用线索：Eyes.AppUtils.isMobile、Eyes.AppUtils.isTablet、this._children.timelinebar.getBoundingClientRect、this._children.timelinebar.style.setProperty、this._populate等。
   */
  _onResize() {
    this._resizeTimeout = null;
    this._resetStates();
    const {
      width: width,
      height: height,
      left: left
    } = this._children.timelinebar.getBoundingClientRect();
    const s = window.navigator.maxTouchPoints > 0;
    let n = 304;
    width || (Eyes.AppUtils.isMobile() ? n = 348 : Eyes.AppUtils.isTablet() && (n = 720));
    this.setLocalState({
      isTouch: s,
      focusPanel: {
        calcWidths: true
      },
      timelinebar: {
        width: width || n,
        height: height || 40,
        left: left || 21
      }
    });
    this._children.timelinebar.style.setProperty("--timeline-height", `${this._localState.timelinebar.height}px`);
    this._populate();
  }
  /** @eyes-analysis
   * 重排响应式界面；调用 this._resizeDebounced。
   * 调用线索：this._resizeDebounced。
   */
  resize() {
    this._resizeDebounced();
  }
  /** @eyes-analysis
   * 执行 _calcEventClusterMax 对应的组件业务步骤；调用 Math.floor, Math.max, Math.min。
   * 调用线索：Math.floor、Math.max、Math.min。
   */
  _calcEventClusterMax() {
    const {
      events: events
    } = this._options;
    const {
      timelinebar: timelinebar
    } = this._localState;
    const i = Math.floor(events.clusterCoeff / timelinebar.width);
    return Math.max(Math.min(i, events.clusterMax), events.clusterMin);
  }
  /** @eyes-analysis
   * 执行 _calcMidpointX 对应的组件业务步骤；调用 this._calcXfromTime。
   * 调用线索：this._calcXfromTime。
   */
  _calcMidpointX(t, e, i = this._options.min, s = this._options.range, n = this._localState.timelinebar.width) {
    const o = .5 * (t + e);
    return this._calcXfromTime(o, i, s, n);
  }
  /** @eyes-analysis
   * 执行 _calcWidthBtwnTimes 对应的组件业务步骤；调用 Math.max, Math.min, Math.round。
   * 调用线索：Math.max、Math.min、Math.round、isNaN。
   */
  _calcWidthBtwnTimes(t, e, i = this._options.range, s = this._localState.timelinebar.width, n = 1, o = this._options.range, r = true) {
    let a = n;
    const l = (e - t) / i;
    return l && !isNaN(l) ? (a = Math.max(l * s, a), a = Math.min(a, o), r ? Math.round(a) : a) : null;
  }
  /** @eyes-analysis
   * 执行 _calcXfromTime 对应的组件业务步骤。
   * 调用线索：formatNumber、isNaN、parseFloat、t.replace。
   */
  _calcXfromTime(t, e = this._options.min, i = this._options.range, s = this._localState.timelinebar.width, n = 2) {
    let o = s * ((t - e) / i);
    if (o > this._localState.timelinebar.width && (o = this._localState.timelinebar.width), !isNaN(o)) {
      const t = formatNumber(o, n);
      return "string" == typeof t ? parseFloat(t.replace(/,/g, "")) : null;
    }
    return null;
  }
  /** @eyes-analysis
   * 执行 _calcTimefromTimelineX 对应的组件业务步骤。
   * 调用线索：getMomentSecondary、getMomentSecondary()。
   */
  _calcTimefromTimelineX(t) {
    const {
      timelinebar: timelinebar
    } = this._localState;
    const i = t / timelinebar.width;
    const s = this._options.min + i * this._options.range;
    return getMomentSecondary()(s);
  }
  /** @eyes-analysis
   * 执行 _calcTimeFromFpX 对应的组件业务步骤。
   * 调用线索：getMomentSecondary、getMomentSecondary()。
   */
  _calcTimeFromFpX(t) {
    const {
      focusPanel: focusPanel,
      activeMarkerIndex: activeMarkerIndex
    } = this._localState;
    const {
      focusPanel: s
    } = this._options;
    const o = .01 * s.padding * focusPanel.contentWidth;
    const r = (t - o) / (focusPanel.contentWidth - 2 * o);
    const a = this._markers[activeMarkerIndex];
    const l = a.min + r * a.timeRange;
    return getMomentSecondary()(l);
  }
  /** @eyes-analysis
   * 执行 _calcRelativeProgress 对应的组件业务步骤。
   */
  _calcRelativeProgress(t, e, i) {
    return t + i * (e - t);
  }
  /** @eyes-analysis
   * 执行 _calcFpEventOffset 对应的组件业务步骤。
   */
  _calcFpEventOffset(t, e) {
    const {
      leftOffset: leftOffset
    } = this._options.focusPanel.touch;
    return leftOffset - t.fpEventXs[e];
  }
  /** @eyes-analysis
   * 执行 _nestedPropsChanged 对应的组件业务步骤；调用 this._nestedPropsChanged。
   * 调用线索：console.error、this._nestedPropsChanged。
   */
  _nestedPropsChanged(t, e) {
    for (const i in t) {
      if (null !== t[i] && null !== e[i] && typeof t[i] != typeof e[i]) {
        console.error("Mismatched state types in object", t);
        return false;
      }
      if (null !== t[i] && t[i].constructor === Object) {
        if (this._nestedPropsChanged(t[i], e[i])) return true;
      } else if (t[i] !== e[i]) return true;
    }
    return false;
  }
  /** @eyes-analysis
   * 执行 _showToolTip 对应的组件业务步骤；调用 Math.min, Math.max, Math.abs, this._setTooltipModifiers, this.setLocalState。
   * 调用线索：Math.abs、Math.max、Math.min、e.show、setTimeout等。
   */
  _showToolTip(t = "timelinebar") {
    const e = this._tooltips[t];
    const {
      isTouch: isTouch,
      activeMarkerIndex: activeMarkerIndex,
      timelinebar: timelinebar
    } = this._localState;
    if (this._localState[t].displayedTip || !e) return;
    const o = this._markers[activeMarkerIndex];
    if (isTouch && o && !o.cluster) {
      const t = .5 * timelinebar.width;
      const i = o.leftX < t ? "right" : "left";
      const s = ({
        placement: placement,
        _: i,
        popper: popper
      }) => {
        if ("top" === placement) {
          const e = .5 * popper.width;
          return [Math.min(Math.max(o.leftX, e), timelinebar.width - e) - t, 30];
        }
        return [];
      };
      const r = ({
        popper: popper,
        _: s,
        placement: placement
      }) => {
        if ("top" === placement) {
          const s = .3 + .4 * Math.abs((o.leftX - t) / t);
          return {
            [i]: popper.width * s
          };
        }
        return 0;
      };
      this._setTooltipModifiers(e, s, r);
    }
    e.show();
    const {
      minTime: minTime
    } = this._options.tooltips;
    this.setLocalState({
      toolTipTimeout: setTimeout(() => {
        this.setLocalState({
          [t]: {
            displayedTip: true
          }
        });
      }, minTime)
    });
  }
  /** @eyes-analysis
   * 执行 _setTooltipModifiers 对应的组件业务步骤。
   * 调用线索：s.push、t.setProps。
   */
  _setTooltipModifiers(t, e, i) {
    const s = [];
    "function" == typeof e && s.push({
      name: "offset",
      options: {
        offset: e
      }
    });
    "function" == typeof i && s.push({
      name: "arrow",
      options: {
        padding: i
      }
    });
    t.setProps({
      popperOptions: {
        modifiers: s
      }
    });
  }
  /** @eyes-analysis
   * 执行 _resetTooltip 对应的组件业务步骤；调用 this._showToolTipDebounced.cancel。
   * 调用线索：clearTimeout、this._showToolTipDebounced.cancel。
   */
  _resetTooltip() {
    this._showToolTipDebounced.cancel();
    clearTimeout(this._localState.toolTipTimeout);
  }
  /** @eyes-analysis
   * 执行 _hideTooltip 对应的组件业务步骤；调用 this._resetTooltip, Object.values。
   * 调用线索：Object.values、Object.values(this._tooltips).forEach、t.hide、this._resetTooltip。
   */
  _hideTooltip(t = true) {
    t && this._resetTooltip();
    Object.values(this._tooltips).forEach(t => t.hide());
  }
  /** @eyes-analysis
   * 源码扩展或访问入口；调用 Eyes.AppUtils.isMobile, Eyes.AppUtils.isMobilePortrait, Eyes.AppUtils.isTablet, this._app.getComponent, this._app.getComponent("eventsBlock").setState, this._hideTooltip, this._markers.forEach, this._setActive, this.setLocalState, this.setState；写入 。
   * 调用线索：Eyes.AppUtils.isMobile、Eyes.AppUtils.isMobilePortrait、Eyes.AppUtils.isTablet、this._app.getComponent、this._app.getComponent("collapsibleMenu")?.getState等。
   */
  _resetStates({
    hideFocusPanel: t = true,
    hideClusterLine: e = true,
    hideDate: i = true
  } = {}) {
    const {
      timelinebar: timelinebar
    } = this._localState;
    if (this._hideTooltip(false), Eyes.AppUtils.isMobilePortrait() && this._app.getComponent("collapsibleMenu")?.getState("isVisible") && (t ? this._settings?.show() : this._settings?.hide()), this.setState({
      fpVisibleClass: t ? "hidden" : "",
      rangeDatesVisibleClass: t ? "" : "hidden",
      clusterLineVisibleClass: e ? "hidden" : "",
      targetDateVisibleClass: i && !timelinebar.active ? "hidden" : "",
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
    this._markers.forEach(t => this._setActive(t.element, false));
  }
  /** @eyes-analysis
   * 执行 _setViewingLineX 对应的组件业务步骤；调用 this._calcXfromTime, this._getFpViewingLineX, this._children.timelinebar.style.setProperty, this._children.focusPanel.style.setProperty, this.setState, this.setLocalState。
   * 调用线索：this._calcXfromTime、this._children.focusPanel.style.setProperty、this._children.timelinebar.style.setProperty、this._getFpViewingLineX、this.setLocalState等。
   */
  _setViewingLineX(t) {
    const {
      timelinebar: timelinebar,
      updateViewingLine: updateViewingLine,
      focusPanel: focusPanel
    } = this._localState;
    const n = {
      viewingLineVisibleClass: "hidden",
      fpViewingLineVisibleClass: "hidden"
    };
    const o = {
      updateViewingLine: false
    };
    const r = this._calcXfromTime(t);
    const a = this._getFpViewingLineX(t);
    if (r) {
      const t = timelinebar.width && r <= timelinebar.width;
      n.viewingLineVisibleClass = t ? "" : "hidden";
      (r !== timelinebar.viewingLineX || updateViewingLine) && (this._children.timelinebar.style.setProperty("--viewingline-X", `${r}px`), o.timelinebar = {
        viewingLineX: r
      });
    }
    a && (n.fpViewingLineVisibleClass = "", (a !== focusPanel.viewingLineX || updateViewingLine) && (this._children.focusPanel.style.setProperty("--fp-viewingline-X", `${a}px`), o.focusPanel = {
      viewingLineX: a
    }));
    this.setState(n);
    this.setLocalState(o);
  }
  /** @eyes-analysis
   * 执行 _setFpViewingLineStart 对应的组件业务步骤；调用 this._children.focusPanel.style.setProperty。
   * 调用线索：this._children.focusPanel.style.setProperty。
   */
  _setFpViewingLineStart(t) {
    const {
      focusPanel: focusPanel
    } = this._localState;
    const i = focusPanel.width || 1e3;
    const s = t ? -i : 2 * i;
    this._children.focusPanel.style.setProperty("--fp-viewingline-X", `${s}px`);
  }
  /** @eyes-analysis
   * 执行 _setClusterEvent 对应的组件业务步骤；调用 this._setEventName, this._setDateAndPosition, this._setClusterLineTransform, this.setState, this._setFpElementActive。
   * 调用线索：this._setClusterLineTransform、this._setDateAndPosition、this._setEventName、this._setFpElementActive、this.setState。
   */
  _setClusterEvent(t, e) {
    const i = t.events[e];
    const s = t.eventXs[e];
    const n = t.fpEventElements[e];
    this._setEventName(i.title, i.start);
    this._setDateAndPosition(i.start, s);
    this._setClusterLineTransform(s);
    this.setState({
      clusterLineVisibleClass: "",
      clusterLineColorClass: "white",
      targetDateColorClass: "white",
      targetDateVisibleClass: "hidden",
      fpTargetLineVisibleClass: "hidden",
      fpVisibleClass: ""
    });
    this._setFpElementActive(t, n);
  }
  /** @eyes-analysis
   * 执行 _setFpAnimation 对应的组件业务步骤；调用 this._markers.indexOf, this._getNormDistance, this._calcRelativeProgress, this.setState, this.setLocalState, this._depopulateFocusPanel, this._populateFocusPanel, this._setClusterEvent, this._getFpEventsEnterAnim, this._getFpEventsExitAnim, this._getFpTickAnim, this._getFpLineAnim, this._createAnimation。
   * 调用线索：_.play、c.play、l.play、m.play、p.play等。
   */
  _setFpAnimation(t, e, i) {
    const s = t;
    const n = this._markers.indexOf(e);
    const {
      isTouch: isTouch
    } = this._localState;
    if (s) {
      const s = 700;
      const r = 2e3;
      const a = t.leftX < e.leftX;
      const l = this._getNormDistance(t, e);
      const c = this._calcRelativeProgress(s, r, l);
      const h = .39 * c;
      const d = {
        focusPanel: {
          animating: true
        }
      };
      isTouch || (this.setState({
        clusterLineVisibleClass: "hidden"
      }), d.activeMarkerIndex = -1);
      this.setLocalState(d);
      const u = () => {
        t.fpEventElements = [];
        this._depopulateFocusPanel(t);
        this._populateFocusPanel(e);
        const s = {
          activeMarkerIndex: n,
          animMarkerIndex: n,
          updateViewingLine: true,
          [isTouch ? "touchDeltaX" : "wheelX"]: 0,
          focusPanel: {
            active: true
          }
        };
        void 0 !== i && this._setClusterEvent(e, i);
        this.setLocalState(s);
        const r = this._getFpEventsEnterAnim(h, a, 0);
        r.onfinish = () => {
          this.setLocalState({
            focusPanel: {
              animating: false
            }
          });
        };
        r.play();
      };
      const p = this._getFpEventsExitAnim(h, a);
      p.onfinish = u;
      p.play();
      const _ = this._getFpTickAnim(l, c, a);
      const m = this._getFpLineAnim(c);
      _.play();
      m.play();
    } else {
      const {
        animation: {
          keyframes: keyframes,
          timings: timings
        }
      } = this._options;
      this._depopulateFocusPanel();
      this._populateFocusPanel(e);
      const r = {
        activeMarkerIndex: n,
        animMarkerIndex: n,
        updateViewingLine: true,
        [isTouch ? "touchDeltaX" : "wheelX"]: 0,
        focusPanel: {
          active: true
        }
      };
      const a = [...keyframes.fpEvents.zoom];
      void 0 !== i && this._setClusterEvent(e, i);
      this.setLocalState(r);
      this._createAnimation(this._children.fpContent, a, timings.zoom).play();
      const l = this._createAnimation(this._children.fpTicks, keyframes.fpTicks.zoom, timings.zoom);
      const c = this._createAnimation(this._children.fpLine, keyframes.fpLine, timings.zoom);
      l.play();
      c.play();
    }
  }
  /** @eyes-analysis
   * 执行 _getFpViewingLineX 对应的组件业务步骤；调用 this._calcXfromTime, Math.round。
   * 调用线索：Math.round、this._calcXfromTime。
   */
  _getFpViewingLineX(t) {
    const {
      activeMarkerIndex: activeMarkerIndex,
      focusPanel: focusPanel
    } = this._localState;
    if (-1 !== activeMarkerIndex) {
      const {
        focusPanel: s
      } = this._options;
      const {
        min: min,
        timeRange: timeRange
      } = this._markers[activeMarkerIndex];
      const r = .01 * s.padding * focusPanel.contentWidth;
      const a = focusPanel.contentWidth - 2 * r;
      const l = this._calcXfromTime(t, min, timeRange, a, 0);
      if (null !== l) {
        const t = l + Math.round(r);
        if (t > -a && t < 2 * a) return t;
      }
    }
    return null;
  }
  /** @eyes-analysis
   * 执行 _getNearestEvent 对应的组件业务步骤；调用 this._getNearestIndex。
   * 调用线索：this._getNearestIndex。
   */
  _getNearestEvent(t, e) {
    if (t.cluster) {
      const i = this._getNearestIndex(e, t.eventXs);
      return t.events[i];
    }
    return t.events[0];
  }
  /** @eyes-analysis
   * 执行 _getNextEventIndexByTime 对应的组件业务步骤。
   * 调用线索：e.events.forEach、e.start.valueOf。
   */
  _getNextEventIndexByTime(t = this._localState.time, e, i) {
    let s = -1;
    e.events.forEach((e, i) => {
      t > e.start.valueOf() && (s = i);
    });
    return i ? s : s + 1;
  }
  /** @eyes-analysis
   * 执行 _setDateAndPosition 对应的组件业务步骤。
   * 调用线索：("number"==typeof t?getMomentSecondary()(t):t).format、getMomentSecondary、getMomentSecondary()、timelinebar.style.setProperty。
   */
  _setDateAndPosition(t, e) {
    const {
      timelinebar: timelinebar
    } = this._children;
    const s = ("number" == typeof t ? getMomentSecondary()(t) : t).format("MMM DD, YYYY");
    timelinebar.style.setProperty("--formatted-date", `'${s}'`);
    e && timelinebar.style.setProperty("--dateline-X", `${e}px`);
  }
  /** @eyes-analysis
   * 执行 _setEventName 对应的组件业务步骤；调用 this._element.style.setProperty, this.setState。
   * 调用线索：("number"==typeof t?getMomentSecondary()(t):t).format、getMomentSecondary、getMomentSecondary()、this._element.style.setProperty、this.setState。
   */
  _setEventName(t, e = null) {
    const {
      activeMarkerIndex: activeMarkerIndex,
      timelinebar: timelinebar
    } = this._localState;
    let o = 50;
    const r = this._markers[activeMarkerIndex];
    if (r && !r.cluster && (o = r.leftX / timelinebar.width * 100), this._element.style.setProperty("--event-offset-x", `-${o}%`), this._element.style.setProperty("--event-name", `'${t}'`), e) {
      const t = e;
      const i = ("number" == typeof t ? getMomentSecondary()(t) : t).format("MMM DD, YYYY");
      this.setState({
        fpEventTime: i
      });
    }
    this.setState({
      fpEventName: t
    });
  }
  /** @eyes-analysis
   * 执行 _setActive 对应的组件业务步骤；调用 List.add, List.remove。
   * 调用线索：t.classList.add、t.classList.remove。
   */
  _setActive(t, e) {
    e ? t.classList.add("active") : t.classList.remove("active");
  }
  /** @eyes-analysis
   * 执行 _getNormDistance 对应的组件业务步骤；调用 Math.abs。
   * 调用线索：Math.abs。
   */
  _getNormDistance(t, e) {
    const {
      timelinebar: timelinebar
    } = this._localState;
    return Math.abs(e.leftX - t.leftX) / timelinebar.width;
  }
  /** @eyes-analysis
   * 执行 _getFpEventsEnterAnim 对应的组件业务步骤；调用 this._createAnimation。
   * 调用线索：this._createAnimation。
   */
  _getFpEventsEnterAnim(t, e, i) {
    const s = {
      duration: t,
      fill: "forwards",
      easing: "cubic-bezier(0, 1, 0, 1)"
    };
    const n = e ? "" : "-";
    const o = [{
      transform: `translateX(${n}100%) scaleY(0)`
    }, {
      transform: `translateX(${n}50%) scaleY(0.1)`
    }, {
      transform: `translateX(${i}px) scaleY(1) rotate(0.01deg)`
    }];
    return this._createAnimation(this._children.fpContent, o, s);
  }
  /** @eyes-analysis
   * 执行 _getFpEventsExitAnim 对应的组件业务步骤；调用 this._createAnimation。
   * 调用线索：this._createAnimation。
   */
  _getFpEventsExitAnim(t, e) {
    const i = {
      duration: t,
      easing: "cubic-bezier(.2, 0, 0, 1)"
    };
    const s = e ? "-" : "";
    const n = [{
      transform: `translateX(${s}50%) scaleY(0.1)`,
      offset: .5
    }, {
      transform: `translateX(${s}100%) scaleY(0)`
    }];
    return this._createAnimation(this._children.fpContent, n, i);
  }
  /** @eyes-analysis
   * 执行 _getFpTickAnim 对应的组件业务步骤；调用 this._calcRelativeProgress, this._createAnimation。
   * 调用线索：this._calcRelativeProgress、this._createAnimation。
   */
  _getFpTickAnim(t, e, i) {
    const s = {
      duration: e,
      fill: "forwards",
      easing: "cubic-bezier(0, 1, 0, 1)"
    };
    const n = this._calcRelativeProgress(50, 150, t);
    const o = [{
      transform: "translateX(0%)"
    }, {
      transform: `translateX(${i ? "-" : ""}${n}%)`,
      offset: .49
    }, {
      transform: `translateX(${i ? "" : "-"}${n}%)`,
      offset: .5
    }, {
      transform: "translateX(0%)"
    }];
    return this._createAnimation(this._children.fpTicksContainer, o, s);
  }
  /** @eyes-analysis
   * 执行 _getFpLineAnim 对应的组件业务步骤；调用 this._createAnimation。
   * 调用线索：this._createAnimation。
   */
  _getFpLineAnim(t) {
    const e = {
      duration: t,
      fill: "forwards",
      easing: "cubic-bezier(0, 1, 0, 1)"
    };
    return this._createAnimation(this._children.fpLine, [{
      opacity: 0
    }, {
      opacity: .6
    }, {
      opacity: 0
    }], e);
  }
  /** @eyes-analysis
   * 执行 _setFpEventScaledClass 对应的组件业务步骤；调用 EventElements.forEach, List.add, List.remove。
   * 调用线索：requestAnimationFrame、t.classList.add、t.classList.remove、t.fpEventElements.forEach。
   */
  _setFpEventScaledClass(t) {
    t.fpEventElements.forEach(t => t.classList.add("scaled"));
    requestAnimationFrame(() => t.fpEventElements.forEach(t => t.classList.remove("scaled")));
  }
  /** @eyes-analysis
   * 执行 _setClusterLineTransform 对应的组件业务步骤；调用 this._clusterEventLine.style.setProperty。
   * 调用线索：this._clusterEventLine.style.setProperty。
   */
  _setClusterLineTransform(t) {
    this._clusterEventLine.style.setProperty("transform", `translateX(calc(${t}px - 50%))`);
  }
  /** @eyes-analysis
   * 执行 _getMarkerAndIndexFromFocusEl 对应的组件业务步骤；调用 EventElements.indexOf。
   * 调用线索：e.fpEventElements.indexOf。
   */
  _getMarkerAndIndexFromFocusEl(t) {
    for (const e of this._markers) if (e.fpEventElements) {
      const i = e.fpEventElements.indexOf(t);
      if (i > -1) return [e, i];
    }
    return null;
  }
  /** @eyes-analysis
   * 执行 _setFpElementActive 对应的组件业务步骤；调用 EventElements.forEach, List.toggle, EventElements.indexOf, this.setLocalState。
   * 调用线索：t.classList.toggle、t.fpEventElements.forEach、t.fpEventElements.indexOf、this.setLocalState。
   */
  _setFpElementActive(t, e) {
    t.fpEventElements.forEach(t => t.classList.toggle("active", t === e));
    const i = t.fpEventElements.indexOf(e);
    const s = i > -1 ? t.events[i].id : null;
    this.setLocalState({
      activeEventId: s
    });
  }
  /** @eyes-analysis
   * 源码扩展或访问入口；调用 Math.max, Math.min, focusPanel.getBoundingClientRect, focusPanel.style.setProperty, fpDetails.getBoundingClientRect, fpMask.getBoundingClientRect, this._setNumOfTicks, this.setLocalState；写入 。
   * 调用线索：Math.max、Math.min、focusPanel.getBoundingClientRect、focusPanel.style.setProperty、fpDetails.getBoundingClientRect等。
   */
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
      const t = focusPanel.getBoundingClientRect().width;
      const e = fpMask.getBoundingClientRect().width;
      const n = .5 * (t - e);
      this._setNumOfTicks(e);
      this.setLocalState({
        focusPanel: {
          calcWidths: false,
          totalWidth: t,
          contentWidth: e,
          arrowWidth: n
        }
      });
      focusPanel.style.setProperty("--fp-midpoint", .5 * t + "px");
    }
    const {
      timelinebar: timelinebar,
      focusPanel: r
    } = this._localState;
    const a = fpDetails.getBoundingClientRect().width;
    const l = a / 2;
    const c = timelinebar.width - a > 0 ? timelinebar.width - a : 0;
    const h = Math.min(Math.max(leftX - l, 0), c);
    const d = leftX - l;
    const u = widthPx / r.contentWidth;
    focusPanel.style.setProperty("--focus-X", `${h}px`);
    focusPanel.style.setProperty("--fpMarker-X", `${d}px`);
    focusPanel.style.setProperty("--fpMarker-scaleX", `${u}`);
  }
  /** @eyes-analysis
   * 执行 _setNumOfTicks 对应的组件业务步骤；调用 Math.round, Char.repeat。
   * 状态写入：_children.fpTicks.innerText。
   * 调用线索：Math.round、tickChar.repeat。
   */
  _setNumOfTicks(t) {
    const {
      tickChar: tickChar,
      tickMult: tickMult
    } = this._options.focusPanel;
    const s = Math.round(t * tickMult);
    this._children.fpTicks.innerText = tickChar.repeat(s);
  }
  /** @eyes-analysis
   * 执行 _getLastCluster 对应的组件业务步骤。
   */
  _getLastCluster() {
    for (let t = this._markers.length - 1; t >= 0; t--) {
      const e = this._markers[t];
      if (e.cluster) return e;
    }
    return null;
  }
  /** @eyes-analysis
   * 执行 _setMarkerPositions 对应的组件业务步骤；调用 this._markers.forEach, Math.max, this._calcWidthBtwnTimes, this._calcMidpointX, Math.min, this._createEventElement。
   * 调用线索：Math.max、Math.min、o.end.clone、o.end.clone().add、o.start.clone等。
   */
  _setMarkerPositions() {
    const {
      events: events,
      range: range
    } = this._options;
    const i = .01 * events.clusterThresh * 2 * range;
    const s = .5 * i;
    this._markers.forEach((t, e) => {
      const n = t.cluster ? 3 : 2;
      const o = t.events[0];
      const r = t.events[t.events.length - 1];
      t.widthPx = Math.max(this._calcWidthBtwnTimes(o.start, r.end), n);
      t.leftX = this._calcMidpointX(o.start, r.end);
      t.min = Math.min(...t.events.map(t => t.start));
      t.max = Math.max(...t.events.map(t => t.end));
      t.timeRange = t.max - t.min;
      const a = 1 === t.events.length;
      a && t.timeRange < i && (0 === e ? t.max = o.end.clone().add(i, "milliseconds") : e === this._markers.length - 1 ? t.min = o.start.clone().subtract(i, "milliseconds") : (t.min = o.start.clone().subtract(s, "milliseconds"), t.max = o.end.clone().add(s, "milliseconds")), t.timeRange = t.max - t.min);
      t.cluster && (t.eventXs = t.events.map(t => this._calcMidpointX(t.start, t.end)), a && this._createEventElement(t));
      t.element.style.setProperty("width", u);
      t.element.style.setProperty("transform", `translateX(calc(${t.leftX}px - 50%))`);
    });
  }
  /** @eyes-analysis
   * 执行 _getNearestIndex 对应的组件业务步骤；调用 Math.abs。
   * 调用线索：Math.abs、e.indexOf、e.reduce。
   */
  _getNearestIndex(t, e) {
    const i = e.reduce((e, i) => Math.abs(i - t) < Math.abs(e - t) ? i : e);
    return e.indexOf(i);
  }
  /** @eyes-analysis
   * 执行 setOptions 对应的组件业务步骤；写入 _options。
   * 状态写入：_options。
   * 调用线索：deepMerge。
   */
  setOptions(t, e = false) {
    const i = e ? this.defaultOptions : this._options;
    this._options = deepMerge(i, t);
  }
  /** @eyes-analysis
   * 执行 setLocalState 对应的组件业务步骤；调用 this._nestedPropsChanged；写入 _localState。
   * 状态写入：_localState。
   * 调用线索：deepMerge、this._nestedPropsChanged。
   */
  setLocalState(t) {
    const localState = this._localState;
    this._nestedPropsChanged(t, localState) && (this._localState = deepMerge(this._localState, t));
  }
  /** @eyes-analysis
   * 执行 _setEvents 对应的组件业务步骤；调用 this._events.forEach, this._events.sort；写入 _events。
   * 状态写入：_events。
   * 调用线索：getMomentSecondary、getMomentSecondary()、t.start.clone、t.start.clone().add、this._events.forEach等。
   */
  _setEvents(t) {
    this._events = [...t];
    this._events.forEach(t => {
      t.start = getMomentSecondary()(t.start);
      t.end = t.end ? getMomentSecondary()(t.end) : t.start.clone().add(1, "hours");
    });
    this._events.sort((t, e) => t.start > e.start);
  }
  /** @eyes-analysis
   * 执行 _buildRangeOptions 对应的组件业务步骤；调用 this.setOptions。
   * 调用线索：s.end.clone、s.end.clone().add、s.start.clone、s.start.clone().subtract、this.setOptions。
   */
  _buildRangeOptions(t) {
    const {
      start: start,
      end: end
    } = t;
    const s = {
      start: start,
      end: end
    };
    const n = (s.end - s.start) * this._options.marginPercent * .01;
    s.min = s.start.clone().subtract(n, "milliseconds");
    s.max = s.end.clone().add(n, "milliseconds");
    s.range = s.max - s.min;
    this.setOptions(s);
  }
  /** @eyes-analysis
   * 执行 _setStartEndDates 对应的组件业务步骤；调用 DateStart.setAttribute, DateEnd.setAttribute。
   * 调用线索：end.format、end.toISOString、rangeDateEnd.setAttribute、rangeDateStart.setAttribute、start.format等。
   */
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
  /** @eyes-analysis
   * 源码扩展或访问入口；调用 getMomentSecondary, getMomentSecondary(), getMomentSecondary().max, getMomentSecondary().min, this._app.getManager, this._app.getManager("scene").getCoverage, this._app.getManager("time").getDefaultLimits；写入 。
   * 调用线索：getMomentSecondary、getMomentSecondary()、getMomentSecondary().max、getMomentSecondary().min、this._app.getManager等。
   */
  _calcCoverage(t, {
    start: start,
    end: end
  } = {}) {
    let {
      min: min,
      max: max
    } = this._app.getManager("time").getDefaultLimits();
    const r = this._app.getManager("scene").getCoverage(t);
    null !== r.min && (min = getMomentSecondary().max(min, r.min));
    null !== r.max && (max = getMomentSecondary().min(max, r.max));
    start && (min = getMomentSecondary()(start));
    end && (max = getMomentSecondary()(end));
    return {
      start: min,
      end: max
    };
  }
  /** @eyes-analysis
   * 源码扩展或访问入口；调用 this._buildRangeOptions, this._calcCoverage, this._setEvents, this._setStartEndDates, this.setLocalState, this.setTime；写入 。
   * 调用线索：this._buildRangeOptions、this._calcCoverage、this._setEvents、this._setStartEndDates、this.setLocalState等。
   */
  setTarget({
    id: id,
    title: title,
    dates: dates,
    orderedEvents: orderedEvents
  }) {
    const n = id !== this._localState.target;
    if (id && orderedEvents && (this.setTime(), n)) {
      this.setLocalState({
        target: id,
        title: title,
        dates: dates
      });
      this._setEvents(orderedEvents);
      const n = this._calcCoverage(id, dates);
      this._buildRangeOptions(n);
      this._setStartEndDates();
    }
  }
  /** @eyes-analysis
   * 执行 checkForZoom 对应的组件业务步骤；调用 this._markers.find, this._zoomIntoCluster, this._zoomOutOfCluster。
   * 调用线索：e.events?.find、this._markers.find、this._zoomIntoCluster、this._zoomOutOfCluster。
   */
  checkForZoom(t) {
    if (!this._markers) return;
    const e = this._markers.find(e => e.events.length > 1 ? e.events?.find(e => e?.id === t?.id) : null);
    t && e ? this._zoomIntoCluster(e) : this._zoomOutOfCluster();
  }
  /** @eyes-analysis
   * 执行 show 对应的组件业务步骤；调用 super.show, this._setResizeTimeout。
   * 调用线索：super.show、this._setResizeTimeout。
   */
  show() {
    super.show();
    this._setResizeTimeout(200);
  }
  /** @eyes-analysis
   * 执行 hide 对应的组件业务步骤；调用 super.hide。
   * 调用线索：super.hide。
   */
  hide() {
    super.hide();
  }
  /** @eyes-analysis
   * 卸载 DOM 并取消业务订阅；调用 super.__disable。
   * 调用线索：clearTimeout、super.__disable。
   */
  __disable() {
    clearTimeout(this._resizeTimeout);
    super.__disable();
  }
  /** @eyes-analysis
   * 执行 goToTime 对应的组件业务步骤；调用 this._app.getManager, this.routeManager.navigate。
   * 调用线索：e.indexOf、e.slice、this._app.getManager、this._app.getManager("time").getTimeUrl、this.routeManager.navigate。
   */
  goToTime(t) {
    const e = this.routeManager.currentRoute.url;
    const i = e.indexOf("events");
    const s = i > -1 ? e.slice(0, i) : e;
    const n = this._app.getManager("time").getTimeUrl(t);
    this.routeManager.navigate({
      time: n
    }, s);
  }
  /** @eyes-analysis
   * 执行 goToEvent 对应的组件业务步骤；调用 this.routeManager.navigate。
   * 调用线索：e.endsWith、e.lastIndexOf、s.endsWith、s.slice、this.routeManager.navigate。
   */
  goToEvent(t) {
    const e = this.routeManager.currentRoute.url;
    const i = e.lastIndexOf("events");
    let s = `${e}${e.endsWith("/") ? "" : "/"}`;
    -1 === i ? s += `events/${t}` : (s.endsWith("https://eyes.nasa.gov/apps/solar-system/events/") || (s = s.slice(0, i + 7)), s += t);
    this.routeManager.navigate(s);
  }
  /** @eyes-analysis
   * 执行 setTime 对应的组件业务步骤；调用 this.setLocalState。
   * 调用线索：getMomentSecondary、getMomentSecondary()、getMomentSecondary()(t).valueOf、this.setLocalState。
   */
  setTime() {
    const t = this.routeManager.query.time;
    t && this.setLocalState({
      time: getMomentSecondary()(t).valueOf()
    });
  }
  /** @eyes-analysis
   * 执行 update 对应的组件业务步骤；调用 this.isEnabled, this._setViewingLineXThrottled。
   * 调用线索：this._setViewingLineXThrottled、this.isEnabled。
   */
  update(t) {
    this._state.isVisible && this.isEnabled() && this._setViewingLineXThrottled(t);
  }
}
EventsTimeline.html = getEventsTimelineTemplate();
export { EventsTimeline };
