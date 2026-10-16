// Recovered from vendors.js:2401745-2401968.
import * as max from "./max-938.js";
function within(e, t, n) {
  return (0, max.max)(e, (0, max.min)(t, n));
}
function withinMaxClamp(e, t, n) {
  var r = within(e, t, n);
  return r > n ? n : r;
}
export { within };
export { withinMaxClamp };
