// Recovered from vendors.js:1742552-1743128.
import * as Unidentified599 from "./Unidentified599.js";
let defaultExport;
class PROJJSONBuilder2019 extends Unidentified599.default {
  static convert(e, t = {}) {
    super.convert(e, t);
    const n = e.find(e => Array.isArray(e) && "CS" === e[0]);
    n && (t.coordinate_system = {
      subtype: n[1],
      axis: this.extractAxes(e)
    });
    const r = e.find(e => Array.isArray(e) && "USAGE" === e[0]);
    if (r) {
      const e = r.find(e => Array.isArray(e) && "SCOPE" === e[0]),
        n = r.find(e => Array.isArray(e) && "AREA" === e[0]),
        i = r.find(e => Array.isArray(e) && "BBOX" === e[0]);
      t.usage = {}, e && (t.usage.scope = e[1]), n && (t.usage.area = n[1]), i && (t.usage.bbox = i.slice(1));
    }
    return t;
  }
}
defaultExport = PROJJSONBuilder2019;
export { defaultExport as default };
