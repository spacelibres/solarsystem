// 随机标识符使用 crypto.getRandomValues 填充字节并编码为补零十六进制；奇数字符长度在编码后截断，不改变熵来源。
// Recovered from app.js:35653-35929.
class RandomString {
  static generate(length) {
    const uint8Array = new Uint8Array(Math.ceil(length / 2));
    crypto.getRandomValues(uint8Array);
    return Array.from(uint8Array, byte => `0${(255 & byte).toString(16)}`.slice(-2)).join("").slice(0, length);
  }
}
export { RandomString };
