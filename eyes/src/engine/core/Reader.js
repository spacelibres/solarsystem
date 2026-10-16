/** @eyes-analysis
 * 文件职责：以小端序 DataView 游标读取二进制数值和 UTF-8 字符串；64 位整数超过安全范围返回 NaN。
 * 依据：Reader @2
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:35930-37559.
/** @eyes-analysis
 * 类职责：以小端序 DataView 游标读取二进制数值和 UTF-8 字符串；64 位整数超过安全范围返回 NaN。
 * 继承：无显式父类；导出：Reader。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Reader {
  /** @eyes-analysis
   * 【结构证据】写入 `_dataView`、`_offset`；调用 `new DataView`。
   * 状态写入：_dataView、_offset。
   * 调用线索：new DataView。
   */
  constructor(t) {
    this._dataView = new DataView(t);
    this._offset = 0;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._offset>=this._dataView.byteLength`。
   */
  isAtEnd() {
    return this._offset >= this._dataView.byteLength;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_offset`；返回 `t`；调用 `this._dataView.getUint8`。
   * 状态写入：_offset。
   * 调用线索：this._dataView.getUint8。
   */
  readByte() {
    const t = this._dataView.getUint8(this._offset);
    this._offset += 1;
    return t;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_offset`；返回 `t`；调用 `this._dataView.getFloat32`。
   * 状态写入：_offset。
   * 调用线索：this._dataView.getFloat32。
   */
  readFloat32() {
    const t = this._dataView.getFloat32(this._offset, true);
    this._offset += 4;
    return t;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_offset`；返回 `t`；调用 `this._dataView.getFloat64`。
   * 状态写入：_offset。
   * 调用线索：this._dataView.getFloat64。
   */
  readFloat64() {
    const t = this._dataView.getFloat64(this._offset, true);
    this._offset += 8;
    return t;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_offset`；返回 `t`；调用 `this._dataView.getUint8`。
   * 状态写入：_offset。
   * 调用线索：this._dataView.getUint8。
   */
  readUInt8() {
    const t = this._dataView.getUint8(this._offset);
    this._offset += 1;
    return t;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_offset`；返回 `t`；调用 `this._dataView.getUint16`。
   * 状态写入：_offset。
   * 调用线索：this._dataView.getUint16。
   */
  readUInt16() {
    const t = this._dataView.getUint16(this._offset, true);
    this._offset += 2;
    return t;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_offset`；返回 `t`；调用 `this._dataView.getUint32`。
   * 状态写入：_offset。
   * 调用线索：this._dataView.getUint32。
   */
  readUInt32() {
    const t = this._dataView.getUint32(this._offset, true);
    this._offset += 4;
    return t;
  }
  /** @eyes-analysis
   * 小端读取 BigUint64 后转 Number；若超出安全整数范围返回 NaN，避免静默精度损失。
   * 状态写入：_offset。
   * 调用线索：Number、Number.isSafeInteger、this._dataView.getBigUint64。
   */
  readUInt64() {
    const t = Number(this._dataView.getBigUint64(this._offset, true));
    this._offset += 8;
    return Number.isSafeInteger(t) ? t : NaN;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_offset`；返回 `t`；调用 `this._dataView.getInt8`。
   * 状态写入：_offset。
   * 调用线索：this._dataView.getInt8。
   */
  readInt8() {
    const t = this._dataView.getInt8(this._offset);
    this._offset += 1;
    return t;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_offset`；返回 `t`；调用 `this._dataView.getInt16`。
   * 状态写入：_offset。
   * 调用线索：this._dataView.getInt16。
   */
  readInt16() {
    const t = this._dataView.getInt16(this._offset, true);
    this._offset += 2;
    return t;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_offset`；返回 `t`；调用 `this._dataView.getInt32`。
   * 状态写入：_offset。
   * 调用线索：this._dataView.getInt32。
   */
  readInt32() {
    const t = this._dataView.getInt32(this._offset, true);
    this._offset += 4;
    return t;
  }
  /** @eyes-analysis
   * 小端读取 BigInt64 后转 Number；若超出安全整数范围返回 NaN。
   * 状态写入：_offset。
   * 调用线索：Number、Number.isSafeInteger、this._dataView.getBigInt64。
   */
  readInt64() {
    const t = Number(this._dataView.getBigInt64(this._offset, true));
    this._offset += 8;
    return Number.isSafeInteger(t) ? t : NaN;
  }
  /** @eyes-analysis
   * 逐字节读取到 LF，丢弃 CR，再 UTF-8 解码；缺少 LF 会由 DataView 越界异常终止。
   * 调用线索：String.fromCharCode、new TextDecoder、new Uint8Array、t.push、textDecoder.decode等。
   */
  readLine() {
    const t = [];
    for (;;) {
      const e = this.readByte();
      const i = String.fromCharCode(e);
      if ("\r" !== i) {
        if ("\n" === i) break;
        t.push(e);
      }
    }
    const textDecoder = new TextDecoder();
    const uint8Array = new Uint8Array(t);
    return textDecoder.decode(uint8Array);
  }
  /** @eyes-analysis
   * 未传 length 时读取到零字节；传 length 时恰好读该字节数，再由 TextDecoder 解码。不是前缀长度字符串。length=0 的特殊情况未单独处理。
   * 调用线索：e.push、new TextDecoder、new Uint8Array、textDecoder.decode、this.readByte。
   */
  readString(t) {
    const e = [];
    for (;;) {
      const i = this.readByte();
      if (void 0 === t && 0 === i) break;
      if (e.push(i), void 0 !== t && e.length === t) break;
    }
    const textDecoder = new TextDecoder();
    const uint8Array = new Uint8Array(e);
    return textDecoder.decode(uint8Array);
  }
  _dataView;
  _offset;
}
export { Reader };
