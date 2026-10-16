// Recovered from app.js:1318433-1324616.
import FollowName from "../../vendor/modules/FollowName.cjs";
import "../pioneer/index.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
var getFollowName = () => FollowName;
class AutoplayManager extends EyesPublicApi.BaseManager {
  constructor(t, url) {
    super(t);
    this._url = url;
    this._isPlaying = false;
    this._interval = 1e4;
    this._intervalTimer = null;
    this._slides = [];
    this._slideTimer = null;
    this._currentIndex = -1;
    this._resetStates = {
      lighting: "shadow",
      rate: 1,
      hd: false
    };
    this._eventNames.push("autoplaychange");
    this._initCallbacks();
    this.bindFunctions(["startAutoplay", "stopAutoplay"]);
  }
  async init() {
    try {
      this._slides = await EyesPublicApi.AppUtils.loadJSON(this._url);
    } catch (t) {
      console.error(t);
      this._slides = [];
    }
  }
  get interval() {
    return this._interval;
  }
  set interval(t) {
    this._isValidTime(t) && (this._interval = 1e3 * t);
  }
  _isValidTime(t) {
    return "" !== t && !isNaN(Number(t)) && Number(t) > 0;
  }
  async startAutoplay(t) {
    this._isPlaying = true;
    this.triggerCallbacks("autoplaychange", [true]);
    this._app.getManager("time").resetLimits();
    await this.playNextSlide(t);
    this._triggerInterval(t);
  }
  _triggerInterval(t) {
    clearInterval(this._intervalTimer);
    this._intervalTimer = null;
    this._isPlaying && (this._intervalTimer = setInterval(async () => {
      t?.isCanceled ? await this.stopAutoplay() : await this.playNextSlide(t);
    }, this._interval));
  }
  async playNextSlide(t) {
    this._currentIndex++;
    this._currentIndex >= this._slides.length && (this._currentIndex = 0);
    await this.playSlide(this._currentIndex, t);
  }
  async playSlide(t, e) {
    if (!this._isPlaying || !this._slides[t] || !this._slides[t].id) return;
    this._slideTimer && clearTimeout(this._slideTimer);
    clearInterval(this._intervalTimer);
    this._intervalTimer = null;
    const timeManager = this._app.getManager("time");
    const contentManager = this._app.getManager("content");
    const sceneManager = this._app.getManager("scene");
    const cameraManager = this.app.getManager("camera");
    const layerManager = this._app.getManager("layer");
    let c;
    if (timeManager.resetTimeRate(), cameraManager.updateLighting(this._resetStates.lighting), t - 1 >= 0 && "object" === this._slides[t - 1].type) {
      const e = contentManager.getEntityInfo(this._slides[t - 1].id);
      const i = contentManager.getSpheroidId(e);
      void 0 !== this._slides[t - 1].hd && (await sceneManager.toggleHDTextureForEntity(i, this._resetStates.hd));
      void 0 !== this._slides[t - 1].surfaceMapTiling && (await layerManager.resetSpheroidMap(i));
    }
    if ("event" === this._slides[t].type) {
      if (!this._slides[t].target) return void this._triggerInterval(e);
      if (c = contentManager.getEntityInfo(this._slides[t].target), !c) return void this._triggerInterval(e);
      if (await contentManager.loadEvents(this._slides[t].target, {
        all: "all_events"
      }, e), e?.isCanceled) return void (await this.stopAutoplay());
      const n = contentManager.context.events[this._slides[t].id];
      if (!n) return void this._triggerInterval(e);
      if (await contentManager.loadEvents(this._slides[t].target, {
        event: this._slides[t].id
      }, e), e?.isCanceled) return void (await this.stopAutoplay());
      const r = EyesPublicApi.AppUtils.deepCopy(contentManager.context.eventDesc);
      const a = {
        ...n,
        ...r
      };
      if (timeManager.setTime(n.start), await this._updateCamera(c, a), e?.isCanceled) return void (await this.stopAutoplay());
      const l = a.rate || this._slides[t].rate;
      void 0 !== l && timeManager.setTimeRate(l);
    } else {
      if (c = contentManager.getEntityInfo(this._slides[t].id), !c) return void this._triggerInterval(e);
      if (await contentManager.loadDescriptions([this._slides[t].id]), e?.isCanceled) return void (await this.stopAutoplay());
      const o = contentManager.context[this._slides[t].id];
      if (this._slides[t].time) timeManager.setTime(this._slides[t].time);else if (o?.dates?.end && o?.dates?.start) {
        this.app.getManager("scene").setEntitiesForceVisible([this._slides[t].id], true);
        let e = timeManager.getDefaultLimits().min.clone();
        await sceneManager.get("main").getEntity(this._slides[t].id).getLoadedPromise();
        const s = sceneManager.getCoverage(this._slides[t].id);
        null !== s.min && (e = getFollowName().max(e, s.min));
        const a = timeManager.parseTime(o.dates.start);
        e = getFollowName().max(a, e);
        timeManager.setTime(e);
      } else timeManager.setToNow();
      if (await this._updateCamera(c), e?.isCanceled) return void (await this.stopAutoplay());
      this._slides[t].rate && timeManager.setTimeRate(this._slides[t].rate);
    }
    const h = contentManager.getSpheroidId(c);
    if (void 0 !== this._slides[t].hd) await sceneManager.toggleHDTextureForEntity(h, this._slides[t].hd);else if (true === this._slides[t].surfaceMapTiling) {
      const t = contentManager.getSpheroidLayers(h);
      if (t) {
        const e = t.find(t => "wmts" === t.type);
        try {
          e && (await this._app.getManager("layer").changeSpheroidMap(h, e));
        } catch (t) {
          console.error(t);
        }
      }
    }
    this._isValidTime(this._slides[t].duration) && (this._slideTimer = setTimeout(() => this._triggerInterval(e), 1e3 * this._slides[t].duration));
    this._slides[t].lighting && cameraManager.updateLighting(this._slides[t].lighting);
    this._slides[t].duration || this._isPlaying && this._triggerInterval(e);
  }
  async _updateCamera(t, e = {}) {
    const i = t.category.toLowerCase();
    const {
      target: target,
      related: related
    } = e;
    const o = this._app.getManager("content").hasLanded(t);
    if (this.app.getManager("scene").setEntitiesForceVisible([...(related || []), ...(target ? [target] : []), ...(null !== t.id ? [t.id] : [])], true), "spacecraft" === i) {
      if (o) await this._app.cameraScripts.alignSpacecraftPlanet(t.id);else if (target) {
        const {
          duration: duration,
          distance: distance,
          horizontalOffset: horizontalOffset,
          verticalOffset: verticalOffset
        } = e;
        await this._app.cameraScripts.alignObjects(t.id, target, {
          duration: duration,
          distance: distance,
          horizontalOffset: horizontalOffset,
          verticalOffset: verticalOffset,
          ...this._slides[this._currentIndex].cameraOptions
        });
      } else await this._app.cameraScripts.goToSpacecraft(t.id, this._slides[this._currentIndex].cameraOptions);
    } else "landing site" === i ? await this._app.cameraScripts.alignSpacecraftPlanet(t.id, this._slides[this._currentIndex].cameraOptions) : "instrument" === i ? await this._app.cameraScripts.goToInstrument(t.id, this._slides[this._currentIndex].cameraOptions) : await this._app.cameraScripts.goToCelestialObject(t.id, this._slides[this._currentIndex].cameraOptions);
  }
  async stopAutoplay() {
    if (clearInterval(this._intervalTimer), this._intervalTimer = null, clearTimeout(this._slideTimer), this._slideTimer = null, !this._isPlaying && -1 === this._currentIndex) return;
    this._isPlaying = false;
    this.triggerCallbacks("autoplaychange", [false]);
    const routerManager = this._app.getManager("router");
    const timeManager = this._app.getManager("time");
    const sceneManager = this.app.getManager("scene");
    const cameraManager = this.app.getManager("camera");
    const contentManager = this.app.getManager("content");
    const layerManager = this._app.getManager("layer");
    if (this._currentIndex >= 0 && "object" === this._slides[this._currentIndex].type) {
      const t = this._slides[this._currentIndex];
      const e = contentManager.getEntityInfo(t.id);
      const s = contentManager.getSpheroidId(e);
      void 0 !== t.hd && sceneManager.toggleHDTextureForEntity(s, this._resetStates.hd);
      void 0 !== t.surfaceMapTiling && true !== t.surfaceMapTiling && (await layerManager.resetSpheroidMap(s));
    }
    sceneManager.setEntitiesForceVisible([], true);
    timeManager.setTimeRate("rate" in routerManager.query ? routerManager.query.rate : this._resetStates.rate);
    "time" in routerManager.query ? timeManager.setTime(routerManager.query.time) : timeManager.setToNow();
    cameraManager.updateLighting(this._resetStates.lighting);
    this._currentIndex = -1;
  }
}
export { AutoplayManager };
