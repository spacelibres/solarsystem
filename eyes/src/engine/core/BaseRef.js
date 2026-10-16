// 延迟引用在 get() 时由子类 update() 解析；getRef() 仅查看缓存。禁用目标视为空引用，回调只在身份发生变化时运行。
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
  _setRef(nextRef) {
    if (nextRef && !nextRef.isEnabled()) {
      nextRef = null;
    }
    if (this._ref !== nextRef) {
      const ref = this._ref;
      this._ref = nextRef;
      if (this._refChangedCallback) {
        this._refChangedCallback(ref, this._ref);
      }
    }
  }
  _ref;
  _refChangedCallback;
}
export { BaseRef };
