// Recovered from app.js:1697980-1698303.
/** 内容目录使用的稳定 story id → 各故事运行时钩子；模块名由真实 title/实体/注册关系确认。 */
import * as AnnularSolarEclipseStory from "./AnnularSolarEclipseStory.js";
import * as TotalSolarEclipseStory from "./TotalSolarEclipseStory.js";
import * as EnceladusDiscoveryStory from "./EnceladusDiscoveryStory.js";
import * as VoyagerGrandTourStory from "./VoyagerGrandTourStory.js";
import * as ParkerSolarProbePerihelionStory from "./ParkerSolarProbePerihelionStory.js";
import "../../data/StoryCatalog.json";
const STORIES = {
  annular_solar_eclipse: AnnularSolarEclipseStory.default,
  total_solar_eclipse: TotalSolarEclipseStory.default,
  enceladus_discovery: EnceladusDiscoveryStory.default,
  voyager_grand_tour: VoyagerGrandTourStory.default,
  psp_perihelion: ParkerSolarProbePerihelionStory.default
};
export { STORIES };
export { default as STORY_LIST } from "../../data/StoryCatalog.json";
