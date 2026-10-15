/**
 * Little-endian binary reader mirroring NASA Eyes' internal `Reader` class.
 *
 * All multi-byte scalars in .dyn files are little-endian. This reader is a thin,
 * dependency-free wrapper over DataView that keeps an internal offset and never
 * reads past the buffer.
 */
export class Reader {
  private readonly view: DataView;
  private offset = 0;

  constructor(data: ArrayBuffer | Uint8Array) {
    if (data instanceof Uint8Array) {
      this.view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    } else {
      this.view = new DataView(data);
    }
  }

  get position(): number {
    return this.offset;
  }

  get byteLength(): number {
    return this.view.byteLength;
  }

  get remaining(): number {
    return this.view.byteLength - this.offset;
  }

  isAtEnd(): boolean {
    return this.offset >= this.view.byteLength;
  }

  private require(bytes: number): number {
    const at = this.offset;
    if (at + bytes > this.view.byteLength) {
      throw new RangeError(
        `dynamo reader: need ${bytes} byte(s) at offset ${at}, only ${this.remaining} available`,
      );
    }
    this.offset += bytes;
    return at;
  }

  readByte(): number {
    return this.view.getUint8(this.require(1));
  }

  readInt8(): number {
    return this.view.getInt8(this.require(1));
  }

  readUInt16(): number {
    return this.view.getUint16(this.require(2), true);
  }

  readInt16(): number {
    return this.view.getInt16(this.require(2), true);
  }

  readUInt32(): number {
    return this.view.getUint32(this.require(4), true);
  }

  readInt32(): number {
    return this.view.getInt32(this.require(4), true);
  }

  readFloat32(): number {
    return this.view.getFloat32(this.require(4), true);
  }

  readFloat64(): number {
    return this.view.getFloat64(this.require(8), true);
  }

  /** NUL-terminated string (NASA's `readString()` with no length). */
  readString(): string {
    const bytes: number[] = [];
    for (;;) {
      const b = this.readByte();
      if (b === 0) break;
      bytes.push(b);
    }
    return new TextDecoder().decode(new Uint8Array(bytes));
  }

  /** CRLF-tolerant line reader (NASA's `readLine()`). */
  readLine(): string {
    const bytes: number[] = [];
    for (;;) {
      const c = String.fromCharCode(this.readByte());
      if (c === '\r') continue;
      if (c === '\n') break;
      bytes.push(c.charCodeAt(0));
    }
    return new TextDecoder().decode(new Uint8Array(bytes));
  }
}
