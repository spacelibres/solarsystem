// Recovered from app.js:1405886-1422621.
import * as Eyes from "../../framework/eyes/index.js";
import * as Pioneer from "../pioneer/index.js";
class TrajectoryManager extends Eyes.BaseManager {
  constructor(app) {
    super(app);
    this._app = app;
    this._entityId = null;
    this._prevEntityId = null;
    this._wasAlreadyEnabled = false;
    this._isEnabled = false;
    this._atSystem = false;
    this._urlMissionChoice = "primary";
    this._callbackEnabled = false;
    this.bindFunctions(["customEngineLoopCallback", "setEngineLoopCallback"]);
    this._eventNames.push("trajectorySelect");
    this._initCallbacks();
    this._offsetObserver = new MutationObserver(t => {
      t.forEach(t => {
        "class" === t.attributeName && this._calcIndicatorPadding();
      });
    });
    this._resizeObserver = new ResizeObserver(() => {
      this._calcIndicatorPadding();
    });
  }
  getCustomMissions() {
    return r;
  }
  createTrajectory(t, e, i = null) {
    let s = t.getName();
    if ("" === s && (s = this._entityId), "all" === e) return;
    const {
      cameraOnEnterParams: cameraOnEnterParams
    } = r[s] ?? {};
    const a = r[s]?.missionOptions[e];
    const {
      start: start,
      end: end,
      color: color
    } = a ?? {};
    const d = i ?? this._app.getManager("time").urlToET(start);
    const u = this._app.getManager("time").urlToET(end);
    const p = t.getComponent(Pioneer.TrailComponent, e) ?? t.addComponent(Pioneer.TrailComponent, e);
    p.setAlphaFade(1);
    p.setColor(color ?? new Pioneer.Color(1, 1, 1, .7));
    cameraOnEnterParams?.system && p.setRelativeToEntity(cameraOnEnterParams.system);
    d && (p.setRelativeStartTime(false), p.setStartTime(d), p.setDrawStartTime(d));
    u ? (p.setEndTime(u), p.setRelativeEndTime(false)) : (p.setEndTime(0), p.setRelativeEndTime(true));
    u - d > 2628e3 && p.setPointsPerFrame(18);
    p.setEnabled(false);
  }
  hasTrajectoryOptions(t) {
    return !!t && Object.keys(this.getCustomMissions()).includes(t);
  }
  async setEnabled(isEnabled, entityId, i = ["trajectory"]) {
    this._wasAlreadyEnabled = this._isEnabled;
    this._isEnabled = isEnabled;
    const {
      query: query
    } = this.app.getManager("router").currentRoute;
    const {
      trajectory: n
    } = this.app.getManager("router").parseQuery(query);
    this._urlMissionChoice = n;
    const o = this.hasTrajectoryOptions(entityId) ? Object.keys(r[entityId]?.missionOptions) : null;
    o && !o.includes(n) && (this._urlMissionChoice = o[0]);
    this._prevEntityId = this._entityId;
    this._entityId = entityId;
    this._toggleLayers();
    isEnabled ? (this._onEnable(), this._enterSelectedTrajectoryView(entityId, this._urlMissionChoice), this._resizeObserver.observe(document.body), this._offsetObserver.observe(document.body, {
      attributes: true
    })) : (await this._onDisable(), this._resizeObserver.disconnect(), this._offsetObserver.disconnect(), this._app.getManager("router").navigate({
      __remove: i
    }));
  }
  async _enterSelectedTrajectoryView(entityId, e) {
    this._entityId = entityId;
    let i = "primary";
    Object.keys(r[entityId]?.missionOptions)?.includes(e) && (i = e);
    const s = o[entityId];
    const {
      cameraOnEnterParams: cameraOnEnterParams
    } = r[entityId];
    this._atSystem || (await this.app.cameraScripts.goToSystem(cameraOnEnterParams.system), this._atSystem = true);
    this.triggerCallbacks("trajectorySelect", [i]);
    await s?.onSelect?.(this.app, i);
    this._toggleLayers();
    Object.keys(r[entityId].missionOptions).forEach(t => {
      const e = document.getElementById(`${t}-radio-button`);
      e?.classList.toggle("checked", t === i);
    });
  }
  _toggleLayers() {
    const {
      hideLayers: hideLayers
    } = r[this._entityId] ?? r[this._prevEntityId] ?? {};
    hideLayers?.forEach(t => {
      this._app.getManager("layer").toggleLayer(t, {}, !this._isEnabled);
    });
    this._app.getComponent("layersBlock")?.syncAllLayerCheckboxes();
  }
  _onEnable() {
    if (this._wasAlreadyEnabled) return;
    const {
      showStoryClock: showStoryClock
    } = r[this._entityId] ?? {};
    o[this._entityId]?.onCreate?.(this._app);
    const timeControlsComponent = this._app.getComponent("timeControls");
    timeControlsComponent?.isEnabled() && timeControlsComponent?.setEnabled(false);
    const clockShortcutComponent = this._app.getComponent("clockShortcut");
    clockShortcutComponent?.isEnabled() && clockShortcutComponent?.setEnabled(false);
    const clockComponent = this._app.getComponent("clock");
    clockComponent?.isEnabled() && clockComponent?.setEnabled(false);
    showStoryClock && (Eyes.AppUtils.isMobile() && document.getElementById("extended-controls")?.classList.add("mobile-bottom-margin"), this._app.getComponent("storyClock")?.setEnabled(true), this._app.getComponent("storyClock")?.show(), this._app.getComponent("storyClock")?.setState({
      allowEdit: false
    }));
    this._app.scene.getEntity(this._entityId)?.getComponent(Pioneer.TrailComponent)?.setEnabled(false);
    this._app.getManager("label").setClickable(false);
    this._app.getManager("selection").setClickable(false);
    this._app.getComponent("contentPanel")?.selectTab("viewOptions");
  }
  async _onDisable() {
    const timeManager = this._app.getManager("time");
    o[this._entityId]?.onLeave?.(this._app);
    if (false !== this._app.getManager("router").configs.timeControls) {
      const timeControlsComponent = this._app.getComponent("timeControls");
      timeControlsComponent?.isEnabled() || timeControlsComponent?.setEnabled(true);
      const clockShortcutComponent = this._app.getComponent("clockShortcut");
      clockShortcutComponent?.isEnabled() || clockShortcutComponent?.setEnabled(true);
      const clockComponent = this._app.getComponent("clock");
      clockComponent?.isEnabled() || clockComponent?.setEnabled(true);
    }
    Eyes.AppUtils.isMobile() && document.getElementById("extended-controls")?.classList.remove("mobile-bottom-margin");
    this._app.getComponent("storyClock")?.setEnabled(false);
    const e = this._entityId ?? this._prevEntityId;
    if (e) {
      const t = this._app.scene.getEntity(e);
      r[e]?.missionOptions && Object.keys(r[e].missionOptions).forEach(e => {
        const i = t?.getComponent(Pioneer.TrailComponent, e);
        i && t?.removeComponent(i);
      });
      this._setUpIndicatorForEntity(t, false);
      r[e]?.associatedEntities?.length && r[e].associatedEntities.forEach(t => {
        const e = this._app.pioneer.getScene("main").getEntity(t);
        e && this.setUpAssociatedEntities(e, false);
      });
    }
    const i = this._app.pioneer.getScene("main")?.getEntity(this._entityId)?.getComponent(Pioneer.TrailComponent);
    i?.setEnabled(true);
    this._app.getManager("time").getTimeRate() > this._app.getManager("time").getDefaultTimeRate() && this._app.getManager("time").resetTimeRate();
    this._callbackEnabled && this.setEngineLoopCallback(false);
    this._atSystem = false;
    this._app.getManager("label").setClickable(true);
    this._app.getManager("selection").setClickable(true);
    timeManager.getTimeRate() !== timeManager.getDefaultTimeRate() && timeManager.resetTimeRate();
    document.getElementById("trajectory-options-container")?.remove();
    this._toggleLayers();
    this._app.getComponent("contentPanel")?.selectTab("info");
  }
  isEnabled() {
    return this._isEnabled;
  }
  createUI(t) {
    if (!t) return;
    if (!(Array.from(t.children).filter(t => t.classList.contains("trajectory-options")).length > 0)) {
      const e = this._app.pioneer.getScene("main").getEntity(this._entityId);
      const i = this._createCheckboxOptions(e);
      t.appendChild(i);
      const s = this._createExitButton();
      i?.appendChild(s);
    }
  }
  _createExitButton() {
    const t = document.createElement("button");
    t.className = "trajectory-exit-button clickable";
    t.innerHTML = "Exit Trajectory View";
    t.addEventListener("click", () => {
      this.setEnabled(false, this._entityId);
      this._app.getComponent("cameraViewBlock") && this._app.getComponent("cameraViewBlock").goToDefaultView();
    });
    return t;
  }
  _createCheckboxOptions(t) {
    if (!t) return;
    const e = document.createElement("div");
    e.className = "trajectory-options option clickable";
    e.id = "trajectory-options-container";
    const i = [];
    Object.keys(r[t.getName()].missionOptions).forEach(s => {
      const o = r[t.getName()].missionOptions[s];
      if (!o) return;
      this._trajectoryViewId = t?.getName();
      const a = document.createElement("div");
      a.className = "option-container";
      const l = document.createElement("input");
      l.type = "radio";
      l.name = "mission";
      l.className = "radio-button clickable";
      const c = `${s}-radio-button`;
      l.id = c;
      const h = document.createElement("label");
      h.innerHTML = `Draw ${o?.displayName ?? ""}`;
      h.setAttribute("for", c);
      h.className = "mission-option-label";
      const d = document.createElement("span");
      d.className = "radio-icon";
      i.push(l);
      t.getComponent(Pioneer.TrailComponent, s) || this.createTrajectory(t, s);
      l.addEventListener("click", async () => {
        i.forEach(t => {
          t.classList.toggle("checked", t.id === l.id);
        });
        this.app.getManager("router").navigate(`/${t.getName()}?trajectory=${s}`);
      });
      a.appendChild(l);
      a.appendChild(h);
      a.appendChild(d);
      e.appendChild(a);
      s === this._urlMissionChoice && l.click();
    });
    return e;
  }
  customEngineLoopCallback() {
    const timeManager = this._app.getManager("time");
    const e = this._app.pioneer.getScene("main").getEntity(this._entityId);
    const i = timeManager.getTime();
    const s = timeManager.momentToET(i);
    const o = timeManager.momentToET(timeManager.getLimits().max);
    const a = Math.round(Math.min(e?.getPositionCoverage()?.max, o));
    const l = r[this._entityId].missionOptions;
    Object.keys(l).forEach(i => {
      const o = timeManager.urlToET(l[i].start);
      const r = timeManager.urlToET(l[i].end);
      if (o && r) {
        if (o <= s && s <= r && timeManager.getTimeRate() > 0) {
          const t = e?.getComponent(Pioneer.TrailComponent, i);
          t?.isEnabled() || t?.setEnabled(true);
        }
      }
      i === this._urlMissionChoice && (Math.round(s + timeManager.getTimeRate()) >= r || Math.round(s + timeManager.getTimeRate()) >= a) && e?.isInPositionCoverage() && (timeManager.pause(), isNaN(a) || this._app.pioneer.setTime(isNaN(r) ? a : r));
    });
  }
  setEngineLoopCallback(t) {
    t !== this._callbackEnabled && (t ? (this._app.pioneer.addCallback(this.customEngineLoopCallback, true), this._callbackEnabled = true) : (this._app.pioneer.removeCallback(this.customEngineLoopCallback), this._callbackEnabled = false));
  }
  enableAssociatedEntities(t) {
    r[t].associatedEntities.length && r[t].associatedEntities.forEach(t => {
      this._app.getManager("scene").setEntitiesForceVisible([t], false);
      this._app.pioneer.getScene("main").getEntity(t).setEnabled(true);
    });
  }
  setUpAssociatedEntities(t, e = true) {
    this._setUpAssociatedEntityTrails(t, e);
    this._setUpIndicatorForEntity(t, e);
  }
  _setUpAssociatedEntityTrails(t, e = true) {
    if (!t) return;
    const i = Object.keys(r[t.getName()]?.missionOptions)[0];
    if (!e) {
      t.getComponent(Pioneer.TrailComponent)?.setEnabled(true);
      return void t.getComponent(Pioneer.TrailComponent, i)?.setEnabled(false);
    }
    const s = t.getComponent(Pioneer.TrailComponent);
    const o = s?.getStartTime();
    const a = s?.getEndTime();
    const l = Math.abs(a - o) ?? 1e8;
    const c = s?.getStartTime() * l;
    this.createTrajectory(t, i, c);
    const h = t.getComponent(Pioneer.TrailComponent, i);
    s?.setEnabled(false);
    h?.setEnabled(true);
    h?.setRelativeStartTime(true);
    h?.setRelativeEndTime(true);
    h?.setRelativeToEntity("sun");
  }
  _setUpIndicatorForEntity(t, e = true) {
    if (!e) {
      const e = t.getComponent(Pioneer.IndicatorComponent, "indicator");
      return void (e && t.removeComponent(e));
    }
    const {
      iauName: iauName
    } = this._app.getManager("content").getEntityInfo(t.getName());
    const s = t.getComponent(Pioneer.IndicatorComponent, "indicator") ?? t.addComponent(Pioneer.IndicatorComponent, "indicator");
    s.getDiv().innerHTML = `<span class="left">« </span><span>${iauName}</span><span class="right"> »</span>`;
    s.getDiv().classList.add("pioneer-indicator");
    this._calcIndicatorPadding(t.getName());
  }
  _calcIndicatorPadding(t = this._entityId) {
    const e = document.body.classList.contains("offset-right");
    const contentPanelComponent = this._app.getComponent("contentPanel");
    const o = 25;
    let a = o;
    let l = o;
    if (e) {
      const t = this.app.pioneer.getInput().getActiveViewport();
      const e = t?.getBounds().size.x;
      const s = contentPanelComponent?.element.offsetWidth;
      if (e) {
        const t = Math.round(.12 * e);
        a = s - t + o;
        l = e - (e - t) + o;
      }
    }
    [t, ...(r[t]?.associatedEntities ?? [])].forEach(t => {
      const e = this._app.pioneer.getScene("main").getEntity(t)?.getComponent(Pioneer.IndicatorComponent);
      if (Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTablet()) {
        const t = (contentPanelComponent?.element.offsetHeight ?? 100) + o;
        e?.setPadding(o, o, o, t);
      } else e?.setPadding(a, l, o, o);
    });
  }
  setUpVoyagers(t, e) {
    const i = "sc_voyager_1" === t ? "sc_voyager_2" : "sc_voyager_1";
    const {
      start: start,
      timeRate: timeRate,
      setForceLoadEntity: setForceLoadEntity
    } = r[t].missionOptions[e];
    const l = this._app.getManager("time").urlToET(start);
    this._app.pioneer.setTime(l);
    this._app.getManager("time").setTimeRate(timeRate);
    const c = this._app.pioneer.getScene("main").getEntity(t);
    const h = c.getComponent(Pioneer.TrailComponent);
    const d = c.getComponent(Pioneer.TrailComponent, e) ?? c.addComponent(Pioneer.TrailComponent, e);
    const u = Math.abs(h?.getEndTime() - h?.getStartTime()) ?? 1e8;
    const p = h?.getStartTime() * u;
    d.setStartTime(p);
    d.setDrawStartTime(p);
    d.setEndTime(h?.getEndTime() || 0);
    d.setRelativeStartTime(true);
    d.setRelativeEndTime(true);
    d.setRelativeToEntity("sun");
    d.setEnabled(true);
    this._setUpIndicatorForEntity(c);
    setForceLoadEntity ? this._app.getView("object").appendForceLoadEntities(i) : this._app.getView("object").removeForceLoadEntities(i);
    this._app.getManager("scene").setEntitiesForceVisible([t, i], true);
    const _ = this._app.pioneer.getScene("main").getEntity(i);
    this._app.getManager("scene").setVisibility(true === setForceLoadEntity, "sc_voyager_2");
    _?.setEnabled(true === setForceLoadEntity);
    setForceLoadEntity && this.setUpAssociatedEntities(_);
  }
}
const o = {
  sc_artemis_1: {
    onSelect: async (t, e) => {
      const timeManager = t.getManager("time");
      const s = e;
      const o = t.pioneer.getScene("main").getEntity("sc_artemis_1");
      const {
        customAppTime: customAppTime,
        start: start,
        timeRate: timeRate,
        cameraAngle: cameraAngle,
        resetCameraToSystem: resetCameraToSystem
      } = r.sc_artemis_1.missionOptions[e];
      const u = timeManager.urlToET(start);
      const p = timeManager.urlToET(customAppTime) ?? u;
      t.pioneer.setTime(p);
      const _ = o.getComponent(Pioneer.TrailComponent, e);
      if (_?.setEnabled(false), resetCameraToSystem) {
        const {
          distance: distance,
          angle: angle
        } = resetCameraToSystem;
        await t.cameraScripts.goToSystem("earth", {
          distance: distance,
          angle: angle
        });
      }
      if (cameraAngle) {
        const {
          distance: distance,
          horizontalOffset: horizontalOffset,
          verticalOffset: verticalOffset
        } = cameraAngle;
        await t.cameraScripts.alignObjects("moon", "earth", {
          distance: distance,
          horizontalOffset: horizontalOffset,
          verticalOffset: verticalOffset
        });
      }
      Object.keys(r.sc_artemis_1.missionOptions).forEach(t => {
        const e = o?.getComponent(Pioneer.TrailComponent, t);
        e && e?.setEnabled(t === s);
      });
      timeManager.setTimeRate(timeRate);
    }
  },
  sc_artemis_2: {
    onSelect: async (t, e) => {
      const timeManager = t.getManager("time");
      const s = e;
      const o = t.pioneer.getScene("main").getEntity("sc_artemis_2");
      const {
        customAppTime: customAppTime,
        start: start,
        timeRate: timeRate,
        cameraAngle: cameraAngle,
        resetCameraToSystem: resetCameraToSystem
      } = r.sc_artemis_2.missionOptions[e];
      const u = timeManager.urlToET(start);
      const p = timeManager.urlToET(customAppTime) ?? u;
      t.pioneer.setTime(p);
      const _ = o.getComponent(Pioneer.TrailComponent, e);
      if (_?.setEnabled(false), resetCameraToSystem) {
        const {
          distance: distance,
          angle: angle
        } = resetCameraToSystem;
        await t.cameraScripts.goToSystem("earth", {
          distance: distance,
          angle: angle
        });
      }
      if (cameraAngle) {
        const {
          distance: distance,
          horizontalOffset: horizontalOffset,
          verticalOffset: verticalOffset
        } = cameraAngle;
        await t.cameraScripts.alignObjects("moon", "earth", {
          distance: distance,
          horizontalOffset: horizontalOffset,
          verticalOffset: verticalOffset
        });
      }
      Object.keys(r.sc_artemis_2.missionOptions).forEach(t => {
        const e = o?.getComponent(Pioneer.TrailComponent, t);
        e && e?.setEnabled(t === s);
      });
      timeManager.setTimeRate(timeRate);
    }
  },
  sc_cassini: {
    onSelect: async (t, e) => {
      const i = e;
      const s = t.pioneer.getScene("main").getEntity("sc_cassini");
      s?.getComponent(Pioneer.DivComponent)?.setRenderingEnabled(false);
      const {
        start: start,
        timeRate: timeRate
      } = r.sc_cassini.missionOptions[i];
      const l = t.getManager("time").urlToET(start);
      if (timeRate && t.pioneer.setTimeRate(timeRate), "all" !== e) {
        t.pioneer.setTime(l);
        Object.keys(r.sc_cassini.missionOptions).forEach(t => {
          const e = s?.getComponent(Pioneer.TrailComponent, t);
          e?.setEnabled(false);
        });
        s?.getComponent(Pioneer.TrailComponent, i)?.setEnabled(true);
      } else {
        const e = r.sc_cassini.missionOptions.primary;
        const i = t.getManager("time").urlToET(e.start);
        t.pioneer.setTime(i);
        Object.keys(r.sc_cassini.missionOptions).forEach(t => {
          const e = s?.getComponent(Pioneer.TrailComponent, t);
          e?.setEnabled(false);
        });
      }
      t.getManager("trajectory").setEngineLoopCallback(true);
    },
    onLeave: async t => {
      t.pioneer.getScene("main").getEntity("sc_cassini")?.getComponent(Pioneer.DivComponent)?.setRenderingEnabled(true);
      t.getManager("trajectory").setEngineLoopCallback(false);
    }
  },
  sc_voyager_1: {
    onCreate: t => {
      t.getManager("trajectory").enableAssociatedEntities("sc_voyager_1");
    },
    onSelect: async (t, e) => {
      t.getManager("trajectory").setUpVoyagers("sc_voyager_1", e);
      t.getManager("trajectory").setEngineLoopCallback(true);
    },
    onLeave: t => {
      t.getManager("trajectory").setEngineLoopCallback(false);
    }
  },
  sc_voyager_2: {
    onCreate: t => {
      t.getManager("trajectory").enableAssociatedEntities("sc_voyager_2");
    },
    onSelect: async (t, e) => {
      t.getManager("trajectory").setUpVoyagers("sc_voyager_2", e);
      t.getManager("trajectory").setEngineLoopCallback(true);
    },
    onLeave: async t => {
      t.getManager("trajectory").setEngineLoopCallback(false);
    }
  }
};
const r = {
  sc_artemis_1: {
    cameraOnEnterParams: {
      system: "earth"
    },
    hideLayers: ["spacecraft"],
    missionOptions: {
      primary: {
        displayName: "Mission",
        start: "2022-11-16T06:50:44",
        end: "2022-12-11T17:40:30",
        relativeEndTime: false,
        customAppTime: "2022-11-25T17:40:30",
        timeRate: 0,
        resetCameraToSystem: {
          distance: 100
        }
      },
      near_moon: {
        displayName: "Near Moon",
        start: "2022-11-16T06:50:44",
        end: "2022-12-11T17:40:30",
        relativeEndTime: false,
        customAppTime: "2022-11-21T13:08:38.546+00:00",
        color: new Pioneer.Color(1, 1, 1, 1),
        timeRate: 1,
        cameraAngle: {
          distance: 15e3,
          horizontalOffset: 15,
          verticalOffset: 15
        }
      }
    }
  },
  sc_artemis_2: {
    cameraOnEnterParams: {
      system: "earth"
    },
    hideLayers: ["spacecraft"],
    missionOptions: {
      primary: {
        displayName: "Mission",
        start: "2026-04-02T02:59:07",
        end: "2026-04-10T23:53:05",
        customAppTime: "2026-04-06T22:24:13.098+00:00",
        timeRate: 0,
        resetCameraToSystem: {
          distance: 50,
          angle: 15
        }
      },
      near_moon: {
        displayName: "Near Moon",
        start: "2026-04-02T02:59:07",
        end: "2026-04-10T23:53:05",
        customAppTime: "2026-04-06T22:24:13.098+00:00",
        color: new Pioneer.Color(1, 1, 1, 1),
        timeRate: 1,
        cameraAngle: {
          distance: 15e3,
          horizontalOffset: 15,
          verticalOffset: 15
        }
      }
    }
  },
  sc_cassini: {
    cameraOnEnterParams: {
      system: "saturn"
    },
    showStoryClock: true,
    hideLayers: ["spacecraft", "majorMoons"],
    missionOptions: {
      primary: {
        displayName: "Primary Mission (2004 - 2008)",
        start: "2004-06-30T12:38:22.527+00:00",
        end: "2008-06-30T15:16:30.000+00:00",
        color: new Pioneer.Color(.715, .578, .3),
        timeRate: 5e6
      },
      equinox: {
        displayName: "Equinox Mission (2008 - 2010)",
        start: "2008-07-01T09:26:18.000+00:00",
        end: "2010-10-10T09:26:18.000+00:00",
        color: new Pioneer.Color(.484, .294, .101, .7),
        timeRate: 5e6
      },
      solstice: {
        displayName: "Solstice Mission (2010 - 2017)",
        start: "2010-10-11T09:26:18.000+00:00",
        end: "2017-09-15T09:26:18.000+00:00",
        color: new Pioneer.Color(.543, .184, .105, .7),
        timeRate: 5e6
      },
      all: {
        displayName: "All (2004 - 2017)",
        start: "2004-06-30T12:38:22.527+00:00",
        end: "2017-09-15T09:26:18.000+00:00",
        timeRate: 5e6
      }
    }
  },
  sc_voyager_1: {
    cameraOnEnterParams: {
      system: "sun"
    },
    showStoryClock: true,
    hideLayers: ["spacecraft"],
    associatedEntities: ["sc_voyager_2"],
    missionOptions: {
      primary: {
        displayName: "Voyager 1 Mission",
        start: "1977-09-06T12:56:00",
        timeRate: 25228800
      },
      both: {
        displayName: "Voyager 1 and Voyager 2",
        start: "1977-09-06T12:56:00",
        timeRate: 25228800,
        setForceLoadEntity: true
      }
    }
  },
  sc_voyager_2: {
    cameraOnEnterParams: {
      system: "sun"
    },
    showStoryClock: true,
    hideLayers: ["spacecraft"],
    associatedEntities: ["sc_voyager_1"],
    missionOptions: {
      primary: {
        displayName: "Voyager 2 Mission",
        start: "1977-08-21T14:29:00",
        timeRate: 25228800
      },
      both: {
        displayName: "Voyager 1 and Voyager 2",
        start: "1977-08-21T14:29:00",
        timeRate: 25228800,
        setForceLoadEntity: true
      }
    }
  }
};
export { TrajectoryManager };
