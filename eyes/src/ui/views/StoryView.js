/** @eyes-analysis
 * 文件职责：故事与 slide 查询切换、故事时钟及相机状态
 * 依据：imports: ../../framework/eyes/index.js, ./ExtendedBaseView.js；manager dependencies: content, label, selection, time, router, layer, scene
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1660117-1665370.
import * as Eyes from "../../framework/eyes/index.js";
import * as ExtendedBaseView from "./ExtendedBaseView.js";
/** @eyes-analysis
 * 类职责：故事与 slide 查询切换、故事时钟及相机状态；继承 ExtendedBaseView.default
 * 继承：ExtendedBaseView.default；导出：StoryView。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class StoryView extends ExtendedBaseView.default {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 this._validQueries.push, this._app.getManager, this.bindFunctions；写入 _story, _storyId, _slideId, _isStoryEntry, _isStoryExit。
   * 状态写入：_isStoryEntry、_isStoryExit、_rules.id、_slideId、_story、_storyId。
   * 调用线索：super、this._app.getManager、this._app.getManager("content").getStoryList、this._validQueries.push、this.bindFunctions。
   */
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
  /** @eyes-analysis
   * 执行路由更新前置步骤；调用 super.before；写入 _isStoryEntry, _isStoryExit。
   * 状态写入：_isStoryEntry、_isStoryExit。
   * 调用线索：super.before。
   */
  before(t) {
    super.before(t);
    this._isStoryEntry = true;
    this._isStoryExit = false;
  }
  /** @eyes-analysis
   * 执行路由更新后的收尾步骤；调用 super.after；写入 _isStoryEntry。
   * 状态写入：_isStoryEntry。
   * 调用线索：super.after。
   */
  after(t) {
    super.after(t);
    this._isStoryEntry = false;
  }
  /** @eyes-analysis
   * 响应路径参数变化并刷新本模块；调用 super.onRouteChange, this._verifySlideInfo。
   * 调用线索：super.onRouteChange、this._verifySlideInfo。
   */
  async onRouteChange(t) {
    t.cancelToken.isCanceled || (await super.onRouteChange(t), await this._verifySlideInfo(t));
  }
  /** @eyes-analysis
   * 响应查询参数变化；调用 this._verifySlideInfo, super.onQueryChange, this._app.getComponent, this._updateCamera；写入 _isStoryExit, _slideId, _isStoryEntry。
   * 状态写入：_isStoryEntry、_isStoryExit、_slideId。
   * 调用线索：super.onQueryChange、this._app.getComponent、this._app.getComponent("story").onQueryChange、this._updateCamera、this._verifySlideInfo。
   */
  async onQueryChange(t) {
    t.cancelToken.isCanceled || (await this._verifySlideInfo(t), this._isStoryExit = false, await super.onQueryChange(t), await this._app.getComponent("story").onQueryChange(t), this._slideId = t.slide, await this._updateCamera(t), this._isStoryEntry = false);
  }
  /** @eyes-analysis
   * 进入视图时准备界面和订阅；调用 this._app.getComponent, super.onEnter, this._app.getManager, Eyes.AppUtils.isMobileMode；写入 _isStoryExit, _offsetPanel。
   * 状态写入：_isStoryExit、_offsetPanel。
   * 调用线索：Eyes.AppUtils.isMobileMode、super.onEnter、this._app.getComponent、this._app.getComponent("clock").setState、this._app.getComponent("menu")?.setEnabled等。
   */
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
  /** @eyes-analysis
   * 离开视图时恢复状态并解除订阅；调用 super.onLeave, this._app.getComponent, Component.onLeave, Component.hide, this.setViewportOffset, this._app.getManager；写入 _story, _isStoryEntry, _isStoryExit。
   * 状态写入：_isStoryEntry、_isStoryExit、_story。
   * 调用线索：storyComponent.hide、storyComponent.onLeave、super.onLeave、this._app.getComponent、this._app.getComponent("clock").setState等。
   */
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
  /** @eyes-analysis
   * 执行 _verifySlideInfo 对应的组件业务步骤；调用 this._story.slides.find, this._app.getManager, Manager.reroute。
   * 调用线索：routerManager.reroute、this._app.getManager、this._story.slides.find。
   */
  async _verifySlideInfo(t) {
    if (!(t.slide ? this._story.slides.find(e => e.id === t.slide) : this._story.slides[0])) {
      const routerManager = this._app.getManager("router");
      await routerManager.reroute(routerManager.currentRoute.url, {
        slide: this._story.slides[0].id
      });
    }
  }
  /** @eyes-analysis
   * 按目标和路由准备数据及实体；调用 super._updateResources, this._app.getManager, this._app.getComponent, Eyes.AppUtils.deepClone, this._story.slides.find, this.app.getManager, this._app.scene.waitTillEntitiesInPlace, this._handleError；写入 _isStoryExit, _story, _storyId, _slideId。
   * 状态写入：_isStoryExit、_slideId、_story、_storyId。
   * 调用线索：Eyes.AppUtils.deepClone、super._updateResources、this._app.getComponent、this._app.getComponent("story")?.onLeave、this._app.getManager等。
   */
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
  /** @eyes-analysis
   * 按查询参数或当前目标设置时间；调用 super._updateTime, this._app.getManager, this._story.slides.find, Manager.setTime, this._app.pioneer.waitUntilNextFrame, Manager.setMin, Manager.setMax。
   * 调用线索：super._updateTime、this._app.getManager、this._app.pioneer.waitUntilNextFrame、this._story.slides.find、timeManager.setMax等。
   */
  async _updateTime(t) {
    if (t.cancelToken.isCanceled) return;
    await super._updateTime(t);
    const timeManager = this._app.getManager("time");
    const i = t.slide ? this._story.slides.find(e => e.id === t.slide) : this._story.slides[0];
    !t.time && i?.time && (timeManager.setTime(i.time), await this._app.pioneer.waitUntilNextFrame());
    i?.timeLimits && (i.timeLimits.min && timeManager.setMin(i.timeLimits.min), i.timeLimits.max && timeManager.setMax(i.timeLimits.max));
  }
  /** @eyes-analysis
   * 根据面板状态判断是否隐藏控制项；调用 Eyes.AppUtils.isMobileMode, this._app.getComponent。
   * 调用线索：Eyes.AppUtils.isMobileMode、this._app.getComponent、this._app.getComponent("story").getState。
   */
  _shouldHideControls() {
    return Eyes.AppUtils.isMobileMode() && !this._app.getComponent("story").getState("isCollapsed");
  }
  /** @eyes-analysis
   * 把当前目标数据交给 UI 组件；调用 super._updateComponents, this._app.getManager, Route.url.match, this._app.getComponent, Component.onRouteChange, Component.show, this.setViewportOffset。
   * 调用线索：e.indexOf、e.splice、storyComponent.onRouteChange、storyComponent.show、super._updateComponents等。
   */
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
  /** @eyes-analysis
   * 按当前模式定位相机与目标；调用 super._updateCamera, this._story.slides.find, this._app.getComponent, Component.getState, this._app.cameraScripts.goToSystem, this.app.getManager, this._app.scene.waitTillEntitiesInPlace。
   * 调用线索：storyComponent.getState、super._updateCamera、t、this._app.cameraScripts.goToSystem、this._app.getComponent等。
   */
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
  /** @eyes-analysis
   * 重排响应式界面；调用 super.resize, this._app.getComponent, Eyes.AppUtils.isMobileMode。
   * 调用线索：Eyes.AppUtils.isMobileMode、super.resize、this._app.getComponent、this._app.getComponent("menu")?.setEnabled。
   */
  resize() {
    super.resize();
    this._app.getComponent("menu")?.setEnabled(Eyes.AppUtils.isMobileMode());
  }
  /** @eyes-analysis
   * 登记跨组件或管理器事件订阅；调用 super.registerCallbacks, this._app.getComponent, Component.registerCallback。
   * 调用线索：storyComponent.registerCallback、super.registerCallbacks、this._app.getComponent。
   */
  registerCallbacks() {
    super.registerCallbacks();
    const storyComponent = this._app.getComponent("story");
    storyComponent && (storyComponent.registerCallback("expandtoggle", this.updateVisibility), storyComponent.registerCallback("overlay", this.updateVisibility));
  }
  /** @eyes-analysis
   * 移除本模块登记的事件订阅；调用 super.removeCallbacks, this._app.getComponent, Component.removeCallback。
   * 调用线索：storyComponent.removeCallback、super.removeCallbacks、this._app.getComponent。
   */
  removeCallbacks() {
    super.removeCallbacks();
    const storyComponent = this._app.getComponent("story");
    storyComponent && (storyComponent.removeCallback("expandtoggle", this.updateVisibility), storyComponent.removeCallback("overlay", this.updateVisibility));
  }
  /** @eyes-analysis
   * 执行 setStorySlides 对应的组件业务步骤。
   * 状态写入：_story.slides。
   */
  setStorySlides(t) {
    this._story.slides = t;
  }
  /** @eyes-analysis
   * 执行 isStoryExit 对应的组件业务步骤。
   */
  isStoryExit() {
    return this._isStoryExit;
  }
}
export { StoryView };
