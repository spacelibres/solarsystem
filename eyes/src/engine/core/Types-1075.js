/** @eyes-analysis
 * 文件职责：用太阳系专用管理器/UI 覆盖框架 Types 注册项。
 * 依据：import ../../framework/eyes/index.js；import ../../app/public-api.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
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
