// Recovered from app.js:159260-159658.
class Capabilities {
  static hasGLExtension(t) {
    if (null === Capabilities._context) return false;
    let e = Capabilities._cache.get(t);
    void 0 === e && (e = null !== Capabilities._context.getExtension(t), Capabilities._cache.set(t, e));
    return e;
  }
  static __setContext(t) {
    Capabilities._context = t;
  }
  static _cache = new Map();
  static _context = null;
}
export { Capabilities };
