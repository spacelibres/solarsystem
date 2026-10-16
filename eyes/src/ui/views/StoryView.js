// Recovered from app.js:1660117-1665370.
import * as Eyes from "../../framework/eyes/index.js";
import * as ExtendedBaseView from "./ExtendedBaseView.js";
class StoryView extends ExtendedBaseView.default {
  constructor(...t) {
    super(...t);
    this._story = null;
    this._storyId = null;
    this._slideId = null;
    this._isStoryEntry = true;
    this._isStoryExit = false;
    this._validQueries.push("slide");
    this._rules.id = {
      value: t => t in this._app.getManager("content").getStoryList().stories
    };
    this.bindFunctions(["isStoryExit"]);
  }
  before(t) {
    super.before(t);
    this._isStoryEntry = true;
    this._isStoryExit = false;
  }
  after(t) {
    super.after(t);
    this._isStoryEntry = false;
  }
  async onRouteChange(t) {
    t.cancelToken.isCanceled || (await super.onRouteChange(t), await this._verifySlideInfo(t));
  }
  async onQueryChange(t) {
    t.cancelToken.isCanceled || (await this._verifySlideInfo(t), this._isStoryExit = false, await super.onQueryChange(t), await this._app.getComponent("story").onQueryChange(t), this._slideId = t.slide, await this._updateCamera(t), this._isStoryEntry = false);
  }
  async onEnter(t, e = []) {
    this._isStoryExit = false;
    this._offsetPanel = this._app.getComponent("story");
    await super.onEnter(t, e);
    this._app.getComponent("clock").setState({
      allowEdit: false
    });
    this._app.getManager("label").setClickable(false);
    this._app.getManager("selection").setClickable(false);
    this._app.getComponent("menu")?.setEnabled(Eyes.AppUtils.isMobileMode());
  }
  async onLeave(t) {
    await super.onLeave(t);
    const storyComponent = this._app.getComponent("story");
    await storyComponent.onLeave();
    storyComponent.hide();
    this.setViewportOffset(false);
    await this._story?.onLeave?.(this._app);
    this._app.getComponent("clock").setState({
      allowEdit: true
    });
    this._app.getManager("label").setClickable(true);
    this._app.getManager("selection").setClickable(true);
    this._app.getManager("time").resetMin();
    this._app.getManager("time").resetMax();
    this._story = null;
    this._isStoryEntry = true;
    this._isStoryExit = true;
  }
  async _verifySlideInfo(t) {
    if (!(t.slide ? this._story.slides.find(e => e.id === t.slide) : this._story.slides[0])) {
      const routerManager = this._app.getManager("router");
      await routerManager.reroute(routerManager.currentRoute.url, {
        slide: this._story.slides[0].id
      });
    }
  }
  async _updateResources(t) {
    if (!t.cancelToken.isCanceled) {
      await super._updateResources(t);
      this._app.getManager("layer").setTarget("");
      this._story && (this._story.onLeave?.(this._app), this._app.getComponent("story")?.onLeave(), this._isStoryExit = false);
      try {
        const e = await this._app.getManager("content").getStory(t.id);
        this._story = Eyes.AppUtils.deepClone(e);
        this._storyId = t.id;
        this._slideId = t.slide;
        const i = t.slide ? this._story.slides.find(e => e.id === t.slide) : this._story.slides[0];
        const n = [...(i?.entities || []), ...(this._story.entities || [])];
        this.app.getManager("scene").setEntitiesForceVisible(n, false);
        await this._app.scene.waitTillEntitiesInPlace(n);
        await this._story?.onEnter?.(this._app);
      } catch (e) {
        this._handleError(`StoryView._updateResources: Cannot find story ${t.id}: ${e}`);
      }
    }
  }
  async _updateTime(t) {
    if (t.cancelToken.isCanceled) return;
    await super._updateTime(t);
    const timeManager = this._app.getManager("time");
    const i = t.slide ? this._story.slides.find(e => e.id === t.slide) : this._story.slides[0];
    !t.time && i?.time && (timeManager.setTime(i.time), await this._app.pioneer.waitUntilNextFrame());
    i?.timeLimits && (i.timeLimits.min && timeManager.setMin(i.timeLimits.min), i.timeLimits.max && timeManager.setMax(i.timeLimits.max));
  }
  _shouldHideControls() {
    return Eyes.AppUtils.isMobileMode() && !this._app.getComponent("story").getState("isCollapsed");
  }
  async _updateComponents(t) {
    if (t.cancelToken.isCanceled) return;
    await super._updateComponents(t);
    const e = this._app.getManager("router").currentRoute.url.match(/[^/]+/g);
    e.splice(e.indexOf("story"), 1);
    this._app.getComponent("breadcrumb").onRouteChange({
      ...t,
      routeParts: e
    });
    this._app.getComponent("storyClock").show();
    const i = this._app.getManager("content").getStory(t.id);
    const s = false !== this._app.getManager("router").configs.timeControls;
    const n = i?.slides.length;
    const o = n < 2;
    this._app.getComponent("timeControls").setEnabled(o && s);
    this._app.getComponent("clockShortcut").setEnabled(o && s);
    this._app.getComponent("storyClock").setEnabled(!o);
    const storyComponent = this._app.getComponent("story");
    await storyComponent.onRouteChange(this._story.slides, t);
    storyComponent.show();
    this.setViewportOffset(true);
    await this._app.getComponent("settings").setConfig({
      orientation: {
        tabletPortrait: {
          ori: "horizontal"
        },
        smallLandscape: {
          ori: "horizontal"
        },
        tabletLandscape: {
          ori: "horizontal"
        }
      }
    });
  }
  async _updateCamera(t) {
    if (t.cancelToken.isCanceled) return;
    await super._updateCamera(t);
    const e = t.slide ? this._story.slides.find(e => e.id === t.slide) : this._story.slides[0];
    const i = [...(e?.entities || []), ...(this._story.entities || [])];
    if (e?.camera) {
      const storyComponent = this._app.getComponent("story");
      if (this._isStoryEntry || storyComponent.getState("previousIndex") !== storyComponent.getState("currentIndex")) {
        const t = e.camera[0];
        await t(this._app, this.isStoryExit);
      }
    } else await this._app.cameraScripts.goToSystem("outer_solar_system");
    this.app.getManager("scene").setEntitiesForceVisible(i, true);
    await this._app.scene.waitTillEntitiesInPlace(i);
  }
  resize() {
    super.resize();
    this._app.getComponent("menu")?.setEnabled(Eyes.AppUtils.isMobileMode());
  }
  registerCallbacks() {
    super.registerCallbacks();
    const storyComponent = this._app.getComponent("story");
    storyComponent && (storyComponent.registerCallback("expandtoggle", this.updateVisibility), storyComponent.registerCallback("overlay", this.updateVisibility));
  }
  removeCallbacks() {
    super.removeCallbacks();
    const storyComponent = this._app.getComponent("story");
    storyComponent && (storyComponent.removeCallback("expandtoggle", this.updateVisibility), storyComponent.removeCallback("overlay", this.updateVisibility));
  }
  setStorySlides(t) {
    this._story.slides = t;
  }
  isStoryExit() {
    return this._isStoryExit;
  }
}
export { StoryView };
