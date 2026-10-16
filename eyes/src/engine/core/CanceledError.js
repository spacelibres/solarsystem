// 取消异常是资源异步链的类型标记，固定消息为 Canceled；上层以 instanceof 区分取消与真实加载失败。
// Recovered from app.js:25898-26058.
class CanceledError extends Error {
  constructor() {
    super("Canceled");
  }
}
export { CanceledError };
