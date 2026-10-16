/** @eyes-analysis
 * 文件职责：提供 adjustAxisFromEnu、adjustAxisToEnu；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1789330-1790045.；exports: adjustAxisFromEnu, adjustAxisToEnu
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1789330-1790045.
var r = ["x", "y", "z"];
function adjustAxisToEnu(e, t) {
  const n = {};
  for (let i = 0, a = e.axis.length; i < a; i++) {
    if (2 === i && void 0 === t.z) continue;
    let a = t[r[i]];
    switch (e.axis[i]) {
      case "e":
        n.x = a;
        break;
      case "w":
        n.x = -a;
        break;
      case "n":
        n.y = a;
        break;
      case "s":
        n.y = -a;
        break;
      case "u":
        n.z = a;
        break;
      case "d":
        n.z = -a;
        break;
      default:
        return null;
    }
  }
  return n;
}
function adjustAxisFromEnu(e, t) {
  const n = {};
  for (let i = 0, a = e.axis.length; i < a; i++) if (2 !== i || void 0 !== t.z) switch (e.axis[i]) {
    case "e":
      n[r[i]] = t.x;
      break;
    case "w":
      n[r[i]] = -t.x;
      break;
    case "n":
      n[r[i]] = t.y;
      break;
    case "s":
      n[r[i]] = -t.y;
      break;
    case "u":
      n[r[i]] = t.z;
      break;
    case "d":
      n[r[i]] = -t.z;
      break;
    default:
      return null;
  }
  return n;
}
export { adjustAxisFromEnu };
export { adjustAxisToEnu };
