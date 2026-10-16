// Recovered from app.js:1660117-1665370.
import * as Eyes from "../../framework/eyes/index.js";
import * as ExtendedBaseView from "./ExtendedBaseView.js";
class StoryView extends ExtendedBaseView.default {
  constructor(...constructorArgs) {
    super(...constructorArgs);
    this._story = null;
    this._storyId = null;
    this._slideId = null;
    this._isStoryEntry = true;
    this._isStoryExit = false;
    this._validQueries.push("slide");
    this._rules.id = {
      value: storyId => storyId in this._app.getManager("content").getStoryList().stories
    };
    this.bindFunctions(["isStoryExit"]);
  }
  before(routeParams) {
    super.before(routeParams);
    this._isStoryEntry = true;
    this._isStoryExit = false;
  }
  after(routeParams) {
    super.after(routeParams);
    this._isStoryEntry = false;
  }
  async onRouteChange(routeParams) {
    routeParams.cancelToken.isCanceled || (await super.onRouteChange(routeParams), await this._verifySlideInfo(routeParams));
  }
  async onQueryChange(routeParams) {
    routeParams.cancelToken.isCanceled || (await this._verifySlideInfo(routeParams), this._isStoryExit = false, await super.onQueryChange(routeParams), await this._app.getComponent("story").onQueryChange(routeParams), this._slideId = routeParams.slide, await this._updateCamera(routeParams), this._isStoryEntry = false);
  }
  async onEnter(routeParams, preservedComponents = []) {
    this._isStoryExit = false;
    this._offsetPanel = this._app.getComponent("story");
    await super.onEnter(routeParams, preservedComponents);
    this._app.getComponent("clock").setState({
      allowEdit: false
    });
    this._app.getManager("label").setClickable(false);
    this._app.getManager("selection").setClickable(false);
    this._app.getComponent("menu")?.setEnabled(Eyes.AppUtils.isMobileMode());
  }
  // 退出故事后归还时钟编辑与对象点击能力，并重置时间范围；isStoryExit 也供仍在运行的故事相机脚本查询。
  async onLeave(routeParams) {
    await super.onLeave(routeParams);
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
  async _verifySlideInfo(routeParams) {
    if (!(routeParams.slide ? this._story.slides.find(slide => slide.id === routeParams.slide) : this._story.slides[0])) {
      const routerManager = this._app.getManager("router");
      await routerManager.reroute(routerManager.currentRoute.url, {
        slide: this._story.slides[0].id
      });
    }
  }
  // 故事定义深拷贝后由当前视图持有，幻灯片和故事级实体共同决定加载集合；切换故事前执行旧故事退出钩子。
  async _updateResources(routeParams) {
    if (!routeParams.cancelToken.isCanceled) {
      await super._updateResources(routeParams);
      this._app.getManager("layer").setTarget("");
      this._story && (this._story.onLeave?.(this._app), this._app.getComponent("story")?.onLeave(), this._isStoryExit = false);
      try {
        const storyDefinition = await this._app.getManager("content").getStory(routeParams.id);
        this._story = Eyes.AppUtils.deepClone(storyDefinition);
        this._storyId = routeParams.id;
        this._slideId = routeParams.slide;
        const selectedSlide = routeParams.slide ? this._story.slides.find(slide => slide.id === routeParams.slide) : this._story.slides[0];
        const requiredEntityIds = [...(selectedSlide?.entities || []), ...(this._story.entities || [])];
        this.app.getManager("scene").setEntitiesForceVisible(requiredEntityIds, false);
        await this._app.scene.waitTillEntitiesInPlace(requiredEntityIds);
        await this._story?.onEnter?.(this._app);
      } catch (loadError) {
        this._handleError(`StoryView._updateResources: Cannot find story ${routeParams.id}: ${loadError}`);
      }
    }
  }
  async _updateTime(routeParams) {
    if (routeParams.cancelToken.isCanceled) return;
    await super._updateTime(routeParams);
    const timeManager = this._app.getManager("time");
    const selectedSlide = routeParams.slide ? this._story.slides.find(slide => slide.id === routeParams.slide) : this._story.slides[0];
    !routeParams.time && selectedSlide?.time && (timeManager.setTime(selectedSlide.time), await this._app.pioneer.waitUntilNextFrame());
    selectedSlide?.timeLimits && (selectedSlide.timeLimits.min && timeManager.setMin(selectedSlide.timeLimits.min), selectedSlide.timeLimits.max && timeManager.setMax(selectedSlide.timeLimits.max));
  }
  _shouldHideControls() {
    return Eyes.AppUtils.isMobileMode() && !this._app.getComponent("story").getState("isCollapsed");
  }
  async _updateComponents(routeParams) {
    if (routeParams.cancelToken.isCanceled) return;
    await super._updateComponents(routeParams);
    const routeParts = this._app.getManager("router").currentRoute.url.match(/[^/]+/g);
    routeParts.splice(routeParts.indexOf("story"), 1);
    this._app.getComponent("breadcrumb").onRouteChange({
      ...routeParams,
      routeParts: routeParts
    });
    this._app.getComponent("storyClock").show();
    const storyDefinition = this._app.getManager("content").getStory(routeParams.id);
    const allowTimeControls = false !== this._app.getManager("router").configs.timeControls;
    const slideCount = storyDefinition?.slides.length;
    const isSingleSlide = slideCount < 2;
    this._app.getComponent("timeControls").setEnabled(isSingleSlide && allowTimeControls);
    this._app.getComponent("clockShortcut").setEnabled(isSingleSlide && allowTimeControls);
    this._app.getComponent("storyClock").setEnabled(!isSingleSlide);
    const storyComponent = this._app.getComponent("story");
    await storyComponent.onRouteChange(this._story.slides, routeParams);
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
  async _updateCamera(routeParams) {
    if (routeParams.cancelToken.isCanceled) return;
    await super._updateCamera(routeParams);
    const selectedSlide = routeParams.slide ? this._story.slides.find(slide => slide.id === routeParams.slide) : this._story.slides[0];
    const requiredEntityIds = [...(selectedSlide?.entities || []), ...(this._story.entities || [])];
    if (selectedSlide?.camera) {
      const storyComponent = this._app.getComponent("story");
      if (this._isStoryEntry || storyComponent.getState("previousIndex") !== storyComponent.getState("currentIndex")) {
        const cameraAction = selectedSlide.camera[0];
        await cameraAction(this._app, this.isStoryExit);
      }
    } else await this._app.cameraScripts.goToSystem("outer_solar_system");
    this.app.getManager("scene").setEntitiesForceVisible(requiredEntityIds, true);
    await this._app.scene.waitTillEntitiesInPlace(requiredEntityIds);
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
  setStorySlides(slides) {
    this._story.slides = slides;
  }
  isStoryExit() {
    return this._isStoryExit;
  }
}
export { StoryView };
