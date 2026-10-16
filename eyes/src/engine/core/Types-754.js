/** @eyes-analysis
 * 文件职责：建立框架管理器和 UI 类型名称到构造函数的注册表。
 * 依据：import ../../framework/eyes/public-api.js；顶层副作用 n.set("TimeManager",EyesPublicApi.TimeManager)
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1349248-1350132.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
const n = new Map();
n.set("TimeManager", EyesPublicApi.TimeManager);
n.set("SelectionManager", EyesPublicApi.SelectionManager);
n.set("LabelManager", EyesPublicApi.LabelManager);
n.set("TitleManager", EyesPublicApi.TitleManager);
n.set("TrailManager", EyesPublicApi.TrailManager);
n.set("CameraFollowManager", EyesPublicApi.CameraFollowManager);
n.set("AutoplayManager", EyesPublicApi.AutoplayManager);
n.set("LoadIcon", EyesPublicApi.LoadIcon);
n.set("Overlay", EyesPublicApi.Overlay);
n.set("Settings", EyesPublicApi.Settings);
n.set("Breadcrumb", EyesPublicApi.Breadcrumb);
n.set("Clock", EyesPublicApi.Clock);
n.set("ClockShortcut", EyesPublicApi.ClockShortcut);
n.set("Story", EyesPublicApi.Story);
n.set("LayerPanel", EyesPublicApi.LayerPanel);
n.set("Search", EyesPublicApi.Search);
n.set("Carousel", EyesPublicApi.Carousel);
n.set("TutorialOverlay", EyesPublicApi.TutorialOverlay);
n.set("CarouselPanel", EyesPublicApi.CarouselPanel);
n.set("ShareModal", EyesPublicApi.ShareModal);
n.set("TimeController", EyesPublicApi.TimeController);
n.set("KioskBase", EyesPublicApi.KioskBase);
n.set("Toast", EyesPublicApi.Toast);
export { n as Types };
