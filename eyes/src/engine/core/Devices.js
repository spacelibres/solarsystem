/** @eyes-analysis
 * 文件职责：检测设备/浏览器特征供交互与移动模式选择。
 * 依据：Devices @2
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:30708-31112.
/** @eyes-analysis
 * 类职责：检测设备/浏览器特征供交互与移动模式选择。
 * 继承：无显式父类；导出：Devices。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Devices {
  /** @eyes-analysis
   * 【结构证据】返回 `"Windows"===t||"Win32"===t||"Win16"===t?"Windows":"iPad"===t||"MacIntel"===t&&navigator.maxTouchPoints>1?"iPad":"MacIntel"===t?"Mac":t.startsWith("Lin`；调用 `t.startsWith`。
   * 调用线索：t.startsWith。
   */
  static getPlatform() {
    const t = navigator.userAgentData?.platform ?? navigator.platform;
    return "Windows" === t || "Win32" === t || "Win16" === t ? "Windows" : "iPad" === t || "MacIntel" === t && navigator.maxTouchPoints > 1 ? "iPad" : "MacIntel" === t ? "Mac" : t.startsWith("Linux") || "Android" === t ? "LinuxOrAndroid" : "iPhone" === t ? "iPhone" : "unknown";
  }
}
export { Devices };
