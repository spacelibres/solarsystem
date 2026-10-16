// 配置值以严格身份比较触发通知；先保存新值，再按注册顺序以 key/value 调用监听器，移除时只删第一个匹配回调。
// Recovered from app.js:159659-160397.
class Config {
  constructor() {
    this._valueMap = new Map();
    this._callbacksMap = new Map();
    this.setValue("maxTextureSize", 512);
    this.setValue("fontFamily", "Arial");
    this.setValue("fontSize", 16);
    this.setValue("gammaCorrection", 1);
  }
  getValue(key) {
    return this._valueMap.get(key);
  }
  setValue(key, value) {
    if (this._valueMap.get(key) !== value) {
      this._valueMap.set(key, value);
      const callbacks = this._callbacksMap.get(key);
      if (callbacks) for (let callbackIndex = 0; callbackIndex < callbacks.length; callbackIndex++) callbacks[callbackIndex](key, value);
    }
  }
  addEventListener(key, callback) {
    let callbacks = this._callbacksMap.get(key);
    if (void 0 === callbacks) {
      callbacks = [];
      this._callbacksMap.set(key, callbacks);
    }
    callbacks.push(callback);
  }
  removeEventListener(key, callback) {
    const callbacks = this._callbacksMap.get(key);
    if (callbacks) for (let callbackIndex = 0; callbackIndex < callbacks.length; callbackIndex++) if (callbacks[callbackIndex] === callback) {
      callbacks.splice(callbackIndex, 1);
      break;
    }
  }
  _valueMap;
  _callbacksMap;
}
export { Config };
