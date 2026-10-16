/** @eyes-analysis
 * 文件职责：保存引擎配置值并在配置项改变时通知监听者。
 * 依据：Config @2
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:159659-160397.
/** @eyes-analysis
 * 类职责：保存引擎配置值并在配置项改变时通知监听者。
 * 继承：无显式父类；导出：Config。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Config {
  /** @eyes-analysis
   * 【结构证据】写入 `_callbacksMap`、`_valueMap`；调用 `new Map`、`this.setValue`。
   * 状态写入：_callbacksMap、_valueMap。
   * 调用线索：new Map、this.setValue。
   */
  constructor() {
    this._valueMap = new Map();
    this._callbacksMap = new Map();
    this.setValue("maxTextureSize", 512);
    this.setValue("fontFamily", "Arial");
    this.setValue("fontSize", 16);
    this.setValue("gammaCorrection", 1);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._valueMap.get(t)`；调用 `this._valueMap.get`。
   * 调用线索：this._valueMap.get。
   */
  getValue(t) {
    return this._valueMap.get(t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `i[s]`、`this._callbacksMap.get`、`this._valueMap.get`、`this._valueMap.set`。
   * 调用线索：i[s]、this._callbacksMap.get、this._valueMap.get、this._valueMap.set。
   */
  setValue(t, e) {
    if (this._valueMap.get(t) !== e) {
      this._valueMap.set(t, e);
      const i = this._callbacksMap.get(t);
      if (i) for (let s = 0; s < i.length; s++) i[s](t, e);
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `i.push`、`this._callbacksMap.get`、`this._callbacksMap.set`。
   * 调用线索：i.push、this._callbacksMap.get、this._callbacksMap.set。
   */
  addEventListener(t, e) {
    let i = this._callbacksMap.get(t);
    void 0 === i && (i = [], this._callbacksMap.set(t, i));
    i.push(e);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `i.splice`、`this._callbacksMap.get`。
   * 调用线索：i.splice、this._callbacksMap.get。
   */
  removeEventListener(t, e) {
    const i = this._callbacksMap.get(t);
    if (i) for (let t = 0; t < i.length; t++) if (i[t] === e) {
      i.splice(t, 1);
      break;
    }
  }
  _valueMap;
  _callbacksMap;
}
export { Config };
