/** @eyes-analysis
 * 文件职责：按轮询间隔等待谓词满足并提供超时错误。
 * 依据：当前源码声明、导入关系及工程调用链
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:44989-45345.
async function waitUntil(t, e, i) {
  return new Promise((s, n) => {
    let o = 0;
    const r = setInterval(() => {
      try {
        t() && (clearInterval(r), s(void 0));
      } catch (t) {
        clearInterval(r);
        return void n(t instanceof Error ? t : new Error());
      }
      o += e;
      o >= i && (clearInterval(r), n(new Error(`Timed out after ${i} seconds.`)));
    }, 1e3 * e);
  });
}
export { waitUntil };
