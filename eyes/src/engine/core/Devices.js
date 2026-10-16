// Recovered from app.js:30708-31112.
class Devices {
  static getPlatform() {
    const t = navigator.userAgentData?.platform ?? navigator.platform;
    return "Windows" === t || "Win32" === t || "Win16" === t ? "Windows" : "iPad" === t || "MacIntel" === t && navigator.maxTouchPoints > 1 ? "iPad" : "MacIntel" === t ? "Mac" : t.startsWith("Linux") || "Android" === t ? "LinuxOrAndroid" : "iPhone" === t ? "iPhone" : "unknown";
  }
}
export { Devices };
