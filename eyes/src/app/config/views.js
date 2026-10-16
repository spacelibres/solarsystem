// Recovered from app.js:1360300-1360625.
/** ViewInfo.class 使用的视图构造器表；保持命名空间的延迟属性读取，兼容既有 ESM 循环。 */
import * as CompareView from "../../ui/views/CompareView.js";
import * as EventView from "../../ui/views/EventView.js";
import * as FeatureView from "../../ui/views/FeatureView.js";
import * as HomeView from "../../ui/views/HomeView.js";
import * as ObjectView from "../../ui/views/ObjectView.js";
import * as StoryView from "../../ui/views/StoryView.js";
import * as TelescopeView from "../../ui/views/TelescopeView.js";
import * as DistanceView from "../../ui/views/DistanceView.js";
let viewConstructors;
viewConstructors = {
  CompareView: CompareView.CompareView,
  EventView: EventView.EventView,
  FeatureView: FeatureView.FeatureView,
  HomeView: HomeView.HomeView,
  ObjectView: ObjectView.ObjectView,
  StoryView: StoryView.StoryView,
  TelescopeView: TelescopeView.TelescopeView,
  DistanceView: DistanceView.DistanceView
};
export { viewConstructors as default };
