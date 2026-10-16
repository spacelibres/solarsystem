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
