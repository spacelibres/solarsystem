/** @eyes-analysis
 * 文件职责：累计帧时间计算刷新率。
 * 依据：FPS @2
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:31225-31717.
/** @eyes-analysis
 * 类职责：累计帧时间计算刷新率。
 * 继承：无显式父类；导出：FPS。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class FPS {
  /** @eyes-analysis
   * 【结构证据】返回 `this._numberOfSamples`。
   */
  getNumberOfSamples() {
    return this._numberOfSamples;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_numberOfSamples`、`_samples`；调用 `new Array`。
   * 状态写入：_numberOfSamples、_samples。
   * 调用线索：new Array。
   */
  setNumberOfSamples(numberOfSamples) {
    this._numberOfSamples = numberOfSamples;
    this._samples = new Array(this._numberOfSamples);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._samples.length/t`。
   */
  getFPS() {
    let t = 0;
    for (let e = 0; e < this._samples.length; e++) t += this._samples[e];
    return this._samples.length / t;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_index`、`_samples[this._index]`。
   * 状态写入：_index、_samples[this._index]。
   */
  update(t) {
    this._samples[this._index] = t;
    this._index = (this._index + 1) % this._samples.length;
  }
  _numberOfSamples = 100;
  _samples = new Array(this._numberOfSamples);
  _index = 0;
}
export { FPS };
