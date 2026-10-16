/** @eyes-analysis
 * 文件职责：把五个故事 id 映射到对应故事配置模块。
 * 依据：import ./Unidentified1081.js；import ./Unidentified1082.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1697980-1698303.
import * as Unidentified1081 from "./Unidentified1081.js";
import * as Unidentified1082 from "./Unidentified1082.js";
import * as Unidentified1083 from "./Unidentified1083.js";
import * as Unidentified1084 from "./Unidentified1084.js";
import * as Unidentified1085 from "./Unidentified1085.js";
import "../../data/StoryCatalog.json";
const STORIES = {
  annular_solar_eclipse: Unidentified1081.default,
  total_solar_eclipse: Unidentified1082.default,
  enceladus_discovery: Unidentified1083.default,
  voyager_grand_tour: Unidentified1084.default,
  psp_perihelion: Unidentified1085.default
};
export { STORIES };
export { default as STORY_LIST } from "../../data/StoryCatalog.json";
