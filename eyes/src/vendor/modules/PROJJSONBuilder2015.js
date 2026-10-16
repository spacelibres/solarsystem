// Recovered from vendors.js:1737266-1737556.
import * as Unidentified599 from "./Unidentified599.js";
let defaultExport;
class PROJJSONBuilder2015 extends Unidentified599.default {
  static convert(e, t = {}) {
    return super.convert(e, t), t.coordinate_system && "Cartesian" === t.coordinate_system.subtype && delete t.coordinate_system, t.usage && delete t.usage, t;
  }
}
defaultExport = PROJJSONBuilder2015;
export { defaultExport as default };
