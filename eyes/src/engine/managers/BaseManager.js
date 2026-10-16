// Recovered from app.js:688104-689007.
/* 管理器基类只拥有应用/引擎引用及命名事件订阅。回调去重，触发按逆序同步调用；bindFunctions 把供事件系统持有的方法固定到当前实例。 */
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
    for (let eventIndex = 0; eventIndex < this._eventNames.length; eventIndex++) this._callbacks[this._eventNames[eventIndex]] = [];
  }
  registerCallback(eventName, callback) {
    "function" != typeof callback || this._eventNames.indexOf(eventName) < 0 || this._callbacks[eventName].includes(callback) || this._callbacks[eventName].push(callback);
  }
  removeCallback(eventName, callback) {
    if ("function" != typeof callback || this._eventNames.indexOf(eventName) < 0) return;
    const callbackIndex = this._callbacks[eventName].indexOf(callback);
    callbackIndex > -1 && this._callbacks[eventName].splice(callbackIndex, 1);
  }
  triggerCallbacks(eventName, callbackArgs = []) {
    for (let callbackIndex = this._callbacks[eventName].length - 1; callbackIndex >= 0; callbackIndex--) {
      (0, this._callbacks[eventName][callbackIndex])(...callbackArgs);
    }
  }
  bindFunctions(methodNames = []) {
    const manager = this;
    for (let methodIndex = 0; methodIndex < methodNames.length; methodIndex++) {
      const methodName = methodNames[methodIndex];
      manager[methodName] = manager[methodName].bind(this);
    }
  }
  destroy() {
    this.__destroy();
  }
  __destroy() {}
}
export { BaseManager };
