// Recovered from app.js:688104-689007.
import "../pioneer/index.js";
import "../../framework/eyes/public-api.js";
class BaseManager {
  constructor(app) {
    this._app = app;
    this._pioneer = app.pioneer;
    this._eventNames = [];
    this._callbacks = {};
  }
  get pioneer() {
    return this._pioneer;
  }
  get app() {
    return this._app;
  }
  _initCallbacks() {
    for (let t = 0; t < this._eventNames.length; t++) this._callbacks[this._eventNames[t]] = [];
  }
  registerCallback(t, e) {
    "function" != typeof e || this._eventNames.indexOf(t) < 0 || this._callbacks[t].includes(e) || this._callbacks[t].push(e);
  }
  removeCallback(t, e) {
    if ("function" != typeof e || this._eventNames.indexOf(t) < 0) return;
    const i = this._callbacks[t].indexOf(e);
    i > -1 && this._callbacks[t].splice(i, 1);
  }
  triggerCallbacks(t, e = []) {
    for (let i = this._callbacks[t].length - 1; i >= 0; i--) {
      (0, this._callbacks[t][i])(...e);
    }
  }
  bindFunctions(t = []) {
    const e = this;
    for (let i = 0; i < t.length; i++) {
      const s = t[i];
      e[s] = e[s].bind(this);
    }
  }
  destroy() {
    this.__destroy();
  }
  __destroy() {}
}
export { BaseManager };
