// Recovered from app.js:1318433-1324616.
/* 自动播放持有轮播 interval 与当前页 timeout，进入每页先暂停 interval、恢复上一页临时地图设置，再加载目标资源。异步资源与相机阶段后检查取消令牌；停止清理两个计时器，按当前路由归还时间/速率并恢复默认光照。 */
import FollowName from "../../vendor/modules/FollowName.cjs";
import "../pioneer/index.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
var getFollowName = () => FollowName;
class AutoplayManager extends EyesPublicApi.BaseManager {
  constructor(app, url) {
    super(app);
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
    } catch (loadError) {
      console.error(loadError);
      this._slides = [];
    }
  }
  get interval() {
    return this._interval;
  }
  set interval(intervalSeconds) {
    this._isValidTime(intervalSeconds) && (this._interval = 1e3 * intervalSeconds);
  }
  _isValidTime(durationValue) {
    return "" !== durationValue && !isNaN(Number(durationValue)) && Number(durationValue) > 0;
  }
  async startAutoplay(cancelToken) {
    this._isPlaying = true;
    this.triggerCallbacks("autoplaychange", [true]);
    this._app.getManager("time").resetLimits();
    await this.playNextSlide(cancelToken);
    this._triggerInterval(cancelToken);
  }
  _triggerInterval(cancelToken) {
    clearInterval(this._intervalTimer);
    this._intervalTimer = null;
    this._isPlaying && (this._intervalTimer = setInterval(async () => {
      cancelToken?.isCanceled ? await this.stopAutoplay() : await this.playNextSlide(cancelToken);
    }, this._interval));
  }
  async playNextSlide(cancelToken) {
    this._currentIndex++;
    this._currentIndex >= this._slides.length && (this._currentIndex = 0);
    await this.playSlide(this._currentIndex, cancelToken);
  }
  async playSlide(slideIndex, cancelToken) {
    if (!this._isPlaying || !this._slides[slideIndex] || !this._slides[slideIndex].id) return;
    this._slideTimer && clearTimeout(this._slideTimer);
    clearInterval(this._intervalTimer);
    this._intervalTimer = null;
    const timeManager = this._app.getManager("time");
    const contentManager = this._app.getManager("content");
    const sceneManager = this._app.getManager("scene");
    const cameraManager = this.app.getManager("camera");
    const layerManager = this._app.getManager("layer");
    let entityInfo;
    if (timeManager.resetTimeRate(), cameraManager.updateLighting(this._resetStates.lighting), slideIndex - 1 >= 0 && "object" === this._slides[slideIndex - 1].type) {
      const previousEntityInfo = contentManager.getEntityInfo(this._slides[slideIndex - 1].id);
      const previousSpheroidId = contentManager.getSpheroidId(previousEntityInfo);
      void 0 !== this._slides[slideIndex - 1].hd && (await sceneManager.toggleHDTextureForEntity(previousSpheroidId, this._resetStates.hd));
      void 0 !== this._slides[slideIndex - 1].surfaceMapTiling && (await layerManager.resetSpheroidMap(previousSpheroidId));
    }
    if ("event" === this._slides[slideIndex].type) {
      if (!this._slides[slideIndex].target) return void this._triggerInterval(cancelToken);
      if (entityInfo = contentManager.getEntityInfo(this._slides[slideIndex].target), !entityInfo) return void this._triggerInterval(cancelToken);
      if (await contentManager.loadEvents(this._slides[slideIndex].target, {
        all: "all_events"
      }, cancelToken), cancelToken?.isCanceled) return void (await this.stopAutoplay());
      const eventInfo = contentManager.context.events[this._slides[slideIndex].id];
      if (!eventInfo) return void this._triggerInterval(cancelToken);
      if (await contentManager.loadEvents(this._slides[slideIndex].target, {
        event: this._slides[slideIndex].id
      }, cancelToken), cancelToken?.isCanceled) return void (await this.stopAutoplay());
      const eventDescription = EyesPublicApi.AppUtils.deepCopy(contentManager.context.eventDesc);
      const mergedEventInfo = {
        ...eventInfo,
        ...eventDescription
      };
      if (timeManager.setTime(eventInfo.start), await this._updateCamera(entityInfo, mergedEventInfo), cancelToken?.isCanceled) return void (await this.stopAutoplay());
      const eventRate = mergedEventInfo.rate || this._slides[slideIndex].rate;
      void 0 !== eventRate && timeManager.setTimeRate(eventRate);
    } else {
      if (entityInfo = contentManager.getEntityInfo(this._slides[slideIndex].id), !entityInfo) return void this._triggerInterval(cancelToken);
      if (await contentManager.loadDescriptions([this._slides[slideIndex].id]), cancelToken?.isCanceled) return void (await this.stopAutoplay());
      const entityDescription = contentManager.context[this._slides[slideIndex].id];
      if (this._slides[slideIndex].time) timeManager.setTime(this._slides[slideIndex].time);else if (entityDescription?.dates?.end && entityDescription?.dates?.start) {
        this.app.getManager("scene").setEntitiesForceVisible([this._slides[slideIndex].id], true);
        let earliestTime = timeManager.getDefaultLimits().min.clone();
        await sceneManager.get("main").getEntity(this._slides[slideIndex].id).getLoadedPromise();
        const coverage = sceneManager.getCoverage(this._slides[slideIndex].id);
        null !== coverage.min && (earliestTime = getFollowName().max(earliestTime, coverage.min));
        const descriptionStart = timeManager.parseTime(entityDescription.dates.start);
        earliestTime = getFollowName().max(descriptionStart, earliestTime);
        timeManager.setTime(earliestTime);
      } else timeManager.setToNow();
      if (await this._updateCamera(entityInfo), cancelToken?.isCanceled) return void (await this.stopAutoplay());
      this._slides[slideIndex].rate && timeManager.setTimeRate(this._slides[slideIndex].rate);
    }
    const spheroidId = contentManager.getSpheroidId(entityInfo);
    if (void 0 !== this._slides[slideIndex].hd) await sceneManager.toggleHDTextureForEntity(spheroidId, this._slides[slideIndex].hd);else if (true === this._slides[slideIndex].surfaceMapTiling) {
      const surfaceMaps = contentManager.getSpheroidLayers(spheroidId);
      if (surfaceMaps) {
        const tiledMap = surfaceMaps.find(surfaceMap => "wmts" === surfaceMap.type);
        try {
          tiledMap && (await this._app.getManager("layer").changeSpheroidMap(spheroidId, tiledMap));
        } catch (mapError) {
          console.error(mapError);
        }
      }
    }
    this._isValidTime(this._slides[slideIndex].duration) && (this._slideTimer = setTimeout(() => this._triggerInterval(cancelToken), 1e3 * this._slides[slideIndex].duration));
    this._slides[slideIndex].lighting && cameraManager.updateLighting(this._slides[slideIndex].lighting);
    this._slides[slideIndex].duration || this._isPlaying && this._triggerInterval(cancelToken);
  }
  async _updateCamera(entityInfo, eventInfo = {}) {
    const category = entityInfo.category.toLowerCase();
    const {
      target: target,
      related: related
    } = eventInfo;
    const hasLanded = this._app.getManager("content").hasLanded(entityInfo);
    if (this.app.getManager("scene").setEntitiesForceVisible([...(related || []), ...(target ? [target] : []), ...(null !== entityInfo.id ? [entityInfo.id] : [])], true), "spacecraft" === category) {
      if (hasLanded) await this._app.cameraScripts.alignSpacecraftPlanet(entityInfo.id);else if (target) {
        const {
          duration: duration,
          distance: distance,
          horizontalOffset: horizontalOffset,
          verticalOffset: verticalOffset
        } = eventInfo;
        await this._app.cameraScripts.alignObjects(entityInfo.id, target, {
          duration: duration,
          distance: distance,
          horizontalOffset: horizontalOffset,
          verticalOffset: verticalOffset,
          ...this._slides[this._currentIndex].cameraOptions
        });
      } else await this._app.cameraScripts.goToSpacecraft(entityInfo.id, this._slides[this._currentIndex].cameraOptions);
    } else "landing site" === category ? await this._app.cameraScripts.alignSpacecraftPlanet(entityInfo.id, this._slides[this._currentIndex].cameraOptions) : "instrument" === category ? await this._app.cameraScripts.goToInstrument(entityInfo.id, this._slides[this._currentIndex].cameraOptions) : await this._app.cameraScripts.goToCelestialObject(entityInfo.id, this._slides[this._currentIndex].cameraOptions);
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
      const currentSlide = this._slides[this._currentIndex];
      const entityInfo = contentManager.getEntityInfo(currentSlide.id);
      const spheroidId = contentManager.getSpheroidId(entityInfo);
      void 0 !== currentSlide.hd && sceneManager.toggleHDTextureForEntity(spheroidId, this._resetStates.hd);
      void 0 !== currentSlide.surfaceMapTiling && true !== currentSlide.surfaceMapTiling && (await layerManager.resetSpheroidMap(spheroidId));
    }
    sceneManager.setEntitiesForceVisible([], true);
    timeManager.setTimeRate("rate" in routerManager.query ? routerManager.query.rate : this._resetStates.rate);
    "time" in routerManager.query ? timeManager.setTime(routerManager.query.time) : timeManager.setToNow();
    cameraManager.updateLighting(this._resetStates.lighting);
    this._currentIndex = -1;
  }
}
export { AutoplayManager };
