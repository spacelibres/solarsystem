// Recovered from vendors.js:1723137-1723511.
import * as Unidentified586 from "./Unidentified586.js";
import * as Unidentified587 from "./Unidentified587.js";
import * as Unidentified626 from "./Unidentified626.js";
import * as Unidentified624 from "./Unidentified624.js";
import * as Unidentified589 from "./Unidentified589.js";
import * as getNadgrids from "./getNadgrids.js";
import * as transformInternal from "./transformInternal.js";
import * as forward from "./forward-627.js";
import * as Unidentified628 from "./Unidentified628.js";
let defaultExport;
const h = Object.assign(Unidentified586.default, {
  defaultDatum: "WGS84",
  Proj: Unidentified587.default,
  WGS84: new Unidentified587.default("WGS84"),
  Point: Unidentified626.default,
  toPoint: Unidentified624.default,
  defs: Unidentified589.default,
  nadgrid: getNadgrids.default,
  transform: transformInternal.default,
  mgrs: forward.default,
  version: "__VERSION__"
});
(0, Unidentified628.default)(h), defaultExport = h;
export { defaultExport as default };
