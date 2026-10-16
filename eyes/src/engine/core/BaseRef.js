// Recovered from app.js:25441-25897.
class BaseRef {
  constructor() {
    this._ref = null;
    this._refChangedCallback = null;
  }
  get() {
    this.update();
    return this._ref;
  }
  setRefChangedCallback(refChangedCallback) {
    this._refChangedCallback = refChangedCallback;
  }
  update() {}
  getRef() {
    return this._ref;
  }
  _setRef(t) {
    if (t && !t.isEnabled() && (t = null), this._ref !== t) {
      const ref = this._ref;
      this._ref = t;
      this._refChangedCallback && this._refChangedCallback(ref, this._ref);
    }
  }
  _ref;
  _refChangedCallback;
}
export { BaseRef };
