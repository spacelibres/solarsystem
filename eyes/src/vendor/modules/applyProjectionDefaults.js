// Recovered from vendors.js:1751838-1752420.
var r = .017453292519943295;
function d2r(e) {
  return e * r;
}
function applyProjectionDefaults(e) {
  const t = (e.projName || "").toLowerCase().replace(/_/g, " ");
  void 0 === e.long0 && void 0 !== e.longc && (e.long0 = e.longc), e.lat_ts || !e.lat1 || "stereographic south pole" !== t && "polar stereographic (variant b)" !== t ? e.lat_ts || !e.lat0 || "polar stereographic" !== t && "polar stereographic (variant a)" !== t || (e.lat_ts = e.lat0, e.lat0 = d2r(e.lat0 > 0 ? 90 : -90), delete e.lat1) : (e.lat0 = d2r(e.lat1 > 0 ? 90 : -90), e.lat_ts = e.lat1, delete e.lat1);
}
export { applyProjectionDefaults };
export { d2r };
