// Recovered from app.js:35653-35929.
class RandomString {
  static generate(t) {
    const uint8Array = new Uint8Array(Math.ceil(t / 2));
    crypto.getRandomValues(uint8Array);
    return Array.from(uint8Array, t => `0${(255 & t).toString(16)}`.slice(-2)).join("").slice(0, t);
  }
}
export { RandomString };
