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
