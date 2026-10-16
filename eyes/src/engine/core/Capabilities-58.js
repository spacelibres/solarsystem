/** @eyes-analysis
 * 文件职责：读取 WebGL 能力/扩展，通过静态上下文供材质与纹理能力判断。
 * 依据：Capabilities @2
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:159260-159658.
/** @eyes-analysis
 * 类职责：读取 WebGL 能力/扩展，通过静态上下文供材质与纹理能力判断。
 * 继承：无显式父类；导出：Capabilities。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Capabilities {
  /** @eyes-analysis
   * 【结构证据】返回 `false` 或 `e`；调用 `Capabilities._cache.get`、`Capabilities._cache.set`、`Capabilities._context.getExtension`。
   * 调用线索：Capabilities._cache.get、Capabilities._cache.set、Capabilities._context.getExtension。
   */
  static hasGLExtension(t) {
    if (null === Capabilities._context) return false;
    let e = Capabilities._cache.get(t);
    void 0 === e && (e = null !== Capabilities._context.getExtension(t), Capabilities._cache.set(t, e));
    return e;
  }
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  static __setContext(t) {
    Capabilities._context = t;
  }
  static _cache = new Map();
  static _context = null;
}
export { Capabilities };
