// 取消令牌只保存单向布尔状态；cancel 可重复调用，isCanceled 为只读 getter，不隐含中止网络请求或事件分发。
// Recovered from app.js:539212-539424.
class CancelToken {
  constructor() {
    this._isCanceled = false;
  }
  cancel() {
    this._isCanceled = true;
  }
  get isCanceled() {
    return this._isCanceled;
  }
}
export { CancelToken };
