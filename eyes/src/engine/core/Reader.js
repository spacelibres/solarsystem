// Recovered from app.js:35930-37559.
class Reader {
  constructor(t) {
    this._dataView = new DataView(t);
    this._offset = 0;
  }
  isAtEnd() {
    return this._offset >= this._dataView.byteLength;
  }
  readByte() {
    const t = this._dataView.getUint8(this._offset);
    this._offset += 1;
    return t;
  }
  readFloat32() {
    const t = this._dataView.getFloat32(this._offset, true);
    this._offset += 4;
    return t;
  }
  readFloat64() {
    const t = this._dataView.getFloat64(this._offset, true);
    this._offset += 8;
    return t;
  }
  readUInt8() {
    const t = this._dataView.getUint8(this._offset);
    this._offset += 1;
    return t;
  }
  readUInt16() {
    const t = this._dataView.getUint16(this._offset, true);
    this._offset += 2;
    return t;
  }
  readUInt32() {
    const t = this._dataView.getUint32(this._offset, true);
    this._offset += 4;
    return t;
  }
  readUInt64() {
    const t = Number(this._dataView.getBigUint64(this._offset, true));
    this._offset += 8;
    return Number.isSafeInteger(t) ? t : NaN;
  }
  readInt8() {
    const t = this._dataView.getInt8(this._offset);
    this._offset += 1;
    return t;
  }
  readInt16() {
    const t = this._dataView.getInt16(this._offset, true);
    this._offset += 2;
    return t;
  }
  readInt32() {
    const t = this._dataView.getInt32(this._offset, true);
    this._offset += 4;
    return t;
  }
  readInt64() {
    const t = Number(this._dataView.getBigInt64(this._offset, true));
    this._offset += 8;
    return Number.isSafeInteger(t) ? t : NaN;
  }
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
