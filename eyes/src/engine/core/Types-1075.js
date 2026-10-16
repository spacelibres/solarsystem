// 应用加载时覆写 Eyes.Types 中部分框架类型以接入太阳系专用 manager/panel；字符串注册名与重新导出的 Types 身份必须保持一致。
// Recovered from app.js:1659148-1660116.
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
Eyes.Types.set("TimeManager", SolarSystemPublicApi.TimeManager);
Eyes.Types.set("LinkManager", SolarSystemPublicApi.LinkManager);
Eyes.Types.set("LabelManager", SolarSystemPublicApi.LabelManager);
Eyes.Types.set("SelectionManager", SolarSystemPublicApi.SelectionManager);
Eyes.Types.set("TrajectoryManager", SolarSystemPublicApi.TrajectoryManager);
Eyes.Types.set("Comparison", SolarSystemPublicApi.Comparison);
Eyes.Types.set("ContentPanel", SolarSystemPublicApi.ContentPanel);
Eyes.Types.set("FeaturedStoriesPanel", SolarSystemPublicApi.FeaturedStoriesPanel);
Eyes.Types.set("Menu", SolarSystemPublicApi.Menu);
Eyes.Types.set("MobileExpandButton", SolarSystemPublicApi.MobileExpandButton);
Eyes.Types.set("InfoPanel", SolarSystemPublicApi.InfoPanel);
Eyes.Types.set("DistancePanel", SolarSystemPublicApi.DistancePanel);
Eyes.Types.set("EventsTimeline", SolarSystemPublicApi.EventsTimeline);
Eyes.Types.set("CollapsibleMenu", SolarSystemPublicApi.CollapsibleMenu);
Eyes.Types.set("CollapsibleMenuItem", SolarSystemPublicApi.CollapsibleMenuItem);
Eyes.Types.set("TimeControls", SolarSystemPublicApi.TimeControls);
Eyes.Types.set("Telescope", SolarSystemPublicApi.Telescope);
Eyes.Types.set("Search", SolarSystemPublicApi.Search);
Eyes.Types.set("KioskMode", SolarSystemPublicApi.KioskMode);
Eyes.Types.set("Settings", SolarSystemPublicApi.Settings);
export { Types } from "../../framework/eyes/index.js";
