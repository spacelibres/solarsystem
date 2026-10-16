// Eyes 框架类型注册表以字符串名映射公开构造器；导出名 Types 保持不变，应用层可随后覆写同名类型以注入具体实现。
// Recovered from app.js:1349248-1350132.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
const typeRegistry = new Map();
typeRegistry.set("TimeManager", EyesPublicApi.TimeManager);
typeRegistry.set("SelectionManager", EyesPublicApi.SelectionManager);
typeRegistry.set("LabelManager", EyesPublicApi.LabelManager);
typeRegistry.set("TitleManager", EyesPublicApi.TitleManager);
typeRegistry.set("TrailManager", EyesPublicApi.TrailManager);
typeRegistry.set("CameraFollowManager", EyesPublicApi.CameraFollowManager);
typeRegistry.set("AutoplayManager", EyesPublicApi.AutoplayManager);
typeRegistry.set("LoadIcon", EyesPublicApi.LoadIcon);
typeRegistry.set("Overlay", EyesPublicApi.Overlay);
typeRegistry.set("Settings", EyesPublicApi.Settings);
typeRegistry.set("Breadcrumb", EyesPublicApi.Breadcrumb);
typeRegistry.set("Clock", EyesPublicApi.Clock);
typeRegistry.set("ClockShortcut", EyesPublicApi.ClockShortcut);
typeRegistry.set("Story", EyesPublicApi.Story);
typeRegistry.set("LayerPanel", EyesPublicApi.LayerPanel);
typeRegistry.set("Search", EyesPublicApi.Search);
typeRegistry.set("Carousel", EyesPublicApi.Carousel);
typeRegistry.set("TutorialOverlay", EyesPublicApi.TutorialOverlay);
typeRegistry.set("CarouselPanel", EyesPublicApi.CarouselPanel);
typeRegistry.set("ShareModal", EyesPublicApi.ShareModal);
typeRegistry.set("TimeController", EyesPublicApi.TimeController);
typeRegistry.set("KioskBase", EyesPublicApi.KioskBase);
typeRegistry.set("Toast", EyesPublicApi.Toast);
export { typeRegistry as Types };
