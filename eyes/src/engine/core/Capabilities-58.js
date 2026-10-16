// WebGL 扩展能力按扩展名缓存布尔值；未设置 context 返回 false，context 更换时保留原有缓存行为。
// Recovered from app.js:159260-159658.
class Capabilities {
  static hasGLExtension(extensionName) {
    if (null === Capabilities._context) return false;
    let supported = Capabilities._cache.get(extensionName);
    if (void 0 === supported) {
      supported = null !== Capabilities._context.getExtension(extensionName);
      Capabilities._cache.set(extensionName, supported);
    }
    return supported;
  }
  static __setContext(context) {
    Capabilities._context = context;
  }
  static _cache = new Map();
  static _context = null;
}
export { Capabilities };
