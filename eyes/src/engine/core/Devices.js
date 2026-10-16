// 平台识别优先 userAgentData.platform 再回退 navigator.platform；MacIntel 配合多触点被视为 iPad，Linux 和 Android 合并为同一平台分支。
// Recovered from app.js:30708-31112.
class Devices {
  static getPlatform() {
    const platform = navigator.userAgentData?.platform ?? navigator.platform;
    return "Windows" === platform || "Win32" === platform || "Win16" === platform ? "Windows" : "iPad" === platform || "MacIntel" === platform && navigator.maxTouchPoints > 1 ? "iPad" : "MacIntel" === platform ? "Mac" : platform.startsWith("Linux") || "Android" === platform ? "LinuxOrAndroid" : "iPhone" === platform ? "iPhone" : "unknown";
  }
}
export { Devices };
