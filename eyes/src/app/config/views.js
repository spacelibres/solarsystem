/** @eyes-analysis
 * 文件职责：视图构造器注册表，与 ViewInfo class 字段对应
 * 依据：imports: ../../ui/views/CompareView.js, ../../ui/views/EventView.js, ../../ui/views/FeatureView.js, ../../ui/views/HomeView.js, ../../ui/views/ObjectView.js, ../../ui/views/StoryView.js, ../../ui/views/TelescopeView.js, ../../ui/views/DistanceView.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1360300-1360625.
import * as CompareView from "../../ui/views/CompareView.js";
import * as EventView from "../../ui/views/EventView.js";
import * as FeatureView from "../../ui/views/FeatureView.js";
import * as HomeView from "../../ui/views/HomeView.js";
import * as ObjectView from "../../ui/views/ObjectView.js";
import * as StoryView from "../../ui/views/StoryView.js";
import * as TelescopeView from "../../ui/views/TelescopeView.js";
import * as DistanceView from "../../ui/views/DistanceView.js";
let defaultExport;
defaultExport = {
  CompareView: CompareView.CompareView,
  EventView: EventView.EventView,
  FeatureView: FeatureView.FeatureView,
  HomeView: HomeView.HomeView,
  ObjectView: ObjectView.ObjectView,
  StoryView: StoryView.StoryView,
  TelescopeView: TelescopeView.TelescopeView,
  DistanceView: DistanceView.DistanceView
};
export { defaultExport as default };
