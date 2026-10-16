// Recovered from vendors.js:1736923-1737265.
import * as PROJJSONBuilder2015 from "./PROJJSONBuilder2015.js";
import * as PROJJSONBuilder2019 from "./PROJJSONBuilder2019.js";
function buildPROJJSON(e) {
  const t = function (e) {
    return e.find(e => Array.isArray(e) && "USAGE" === e[0]) ? "2019" : (e.find(e => Array.isArray(e) && "CS" === e[0]) || "BOUNDCRS" === e[0] || "PROJCRS" === e[0] || e[0], "2015");
  }(e);
  return ("2019" === t ? PROJJSONBuilder2019.default : PROJJSONBuilder2015.default).convert(e);
}
export { buildPROJJSON };
