/** 二进制游标按字节前移；多字节数值固定小端。越界由 DataView 抛出，调用者负责提供完整记录。 */
// Recovered from app.js:35930-37559.
class Reader {
  constructor(buffer) {
    this._dataView = new DataView(buffer);
    this._offset = 0;
  }
  isAtEnd() {
    return this._offset >= this._dataView.byteLength;
  }
  readByte() {
    const value = this._dataView.getUint8(this._offset);
    this._offset += 1;
    return value;
  }
  readFloat32() {
    const value = this._dataView.getFloat32(this._offset, true);
    this._offset += 4;
    return value;
  }
  readFloat64() {
    const value = this._dataView.getFloat64(this._offset, true);
    this._offset += 8;
    return value;
  }
  readUInt8() {
    const value = this._dataView.getUint8(this._offset);
    this._offset += 1;
    return value;
  }
  readUInt16() {
    const value = this._dataView.getUint16(this._offset, true);
    this._offset += 2;
    return value;
  }
  readUInt32() {
    const value = this._dataView.getUint32(this._offset, true);
    this._offset += 4;
    return value;
  }
  /** 超过 Number 安全整数范围时返回 NaN，但仍消费八字节；不得静默舍入为可用 ID。 */
  readUInt64() {
    const value = Number(this._dataView.getBigUint64(this._offset, true));
    this._offset += 8;
    return Number.isSafeInteger(value) ? value : NaN;
  }
  readInt8() {
    const value = this._dataView.getInt8(this._offset);
    this._offset += 1;
    return value;
  }
  readInt16() {
    const value = this._dataView.getInt16(this._offset, true);
    this._offset += 2;
    return value;
  }
  readInt32() {
    const value = this._dataView.getInt32(this._offset, true);
    this._offset += 4;
    return value;
  }
  /** 有符号值同样要求 Number 安全整数；越界精度用 NaN 表示，游标照常消费八字节。 */
  readInt64() {
    const value = Number(this._dataView.getBigInt64(this._offset, true));
    this._offset += 8;
    return Number.isSafeInteger(value) ? value : NaN;
  }
  /** 忽略 CR，遇 LF 终止，再一次性按 UTF-8 解码；未找到 LF 时保留越界异常。 */
  readLine() {
    const lineBytes = [];
    for (;;) {
      const byte = this.readByte();
      const character = String.fromCharCode(byte);
      if ("\r" !== character) {
        if ("\n" === character) {
          break;
        }
        lineBytes.push(byte);
      }
    }
    const textDecoder = new TextDecoder();
    const uint8Array = new Uint8Array(lineBytes);
    return textDecoder.decode(uint8Array);
  }
  /** 省略长度时以零字节终止；显式长度按字节计数。保留原有 length=0 行为，不把它改为空字符串。 */
  readString(byteLength) {
    const stringBytes = [];
    for (;;) {
      const byte = this.readByte();
      if (void 0 === byteLength && 0 === byte) {
        break;
      }
      stringBytes.push(byte);
      if (void 0 !== byteLength && stringBytes.length === byteLength) {
        break;
      }
    }
    const textDecoder = new TextDecoder();
    const uint8Array = new Uint8Array(stringBytes);
    return textDecoder.decode(uint8Array);
  }
  _dataView;
  _offset;
}
export { Reader };
