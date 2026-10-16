// 轮询间隔与超时均以秒传入、计时器使用毫秒；谓词成功或抛错即清理 interval，异常转为 Error 后拒绝。保留同次 tick 的超时检查顺序。
// Recovered from app.js:44989-45345.
async function waitUntil(predicate, intervalSeconds, timeoutSeconds) {
  return new Promise((resolve, reject) => {
    let elapsedSeconds = 0;
    const timer = setInterval(() => {
      try {
        if (predicate()) {
          clearInterval(timer);
          resolve(void 0);
        }
      } catch (error) {
        clearInterval(timer);
        return void reject(error instanceof Error ? error : new Error());
      }
      elapsedSeconds += intervalSeconds;
      if (elapsedSeconds >= timeoutSeconds) {
        clearInterval(timer);
        reject(new Error(`Timed out after ${timeoutSeconds} seconds.`));
      }
    }, 1e3 * intervalSeconds);
  });
}
export { waitUntil };
