// Recovered from vendors.js:1665416-1665576.
function r(e = "") {
  return `.${e.trim().replace(/([\.:!\/])/g, "\\$1").replace(/ /g, ".")}`;
}
export { r as default };
