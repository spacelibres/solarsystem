/** @eyes-analysis
 * 文件职责：提供 vincentyDirect、vincentyInverse；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1850649-1852194.；exports: vincentyDirect, vincentyInverse
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1850649-1852194.
function vincentyInverse(e, t, n, r, i, a) {
  const s = r - t,
    o = Math.atan((1 - a) * Math.tan(e)),
    c = Math.atan((1 - a) * Math.tan(n)),
    l = Math.sin(o),
    u = Math.cos(o),
    d = Math.sin(c),
    h = Math.cos(c);
  let p,
    f,
    m,
    M,
    _,
    A,
    g,
    b,
    y,
    L,
    v,
    T,
    S,
    w,
    E,
    x = s,
    C = 100;
  do {
    if (f = Math.sin(x), m = Math.cos(x), M = Math.sqrt(h * f * (h * f) + (u * d - l * h * m) * (u * d - l * h * m)), 0 === M) return {
      azi1: 0,
      s12: 0
    };
    _ = l * d + u * h * m, A = Math.atan2(M, _), g = u * h * f / M, b = 1 - g * g, y = 0 !== b ? _ - 2 * l * d / b : 0, L = a / 16 * b * (4 + a * (4 - 3 * b)), p = x, x = s + (1 - L) * a * g * (A + L * M * (y + L * _ * (2 * y * y - 1)));
  } while (Math.abs(x - p) > 1e-12 && --C > 0);
  if (0 === C) return {
    azi1: NaN,
    s12: NaN
  };
  v = b * (i * i - i * (1 - a) * (i * (1 - a))) / (i * (1 - a) * (i * (1 - a))), T = 1 + v / 16384 * (4096 + v * (v * (320 - 175 * v) - 768)), S = v / 1024 * (256 + v * (v * (74 - 47 * v) - 128)), w = S * M * (y + S / 4 * (_ * (2 * y * y - 1) - S / 6 * y * (4 * M * M - 3) * (4 * y * y - 3))), E = i * (1 - a) * T * (A - w);
  return {
    azi1: Math.atan2(h * f, u * d - l * h * m),
    s12: E
  };
}
function vincentyDirect(e, t, n, r, i, a) {
  const s = Math.atan((1 - a) * Math.tan(e)),
    o = Math.sin(s),
    c = Math.cos(s),
    l = Math.sin(n),
    u = Math.cos(n),
    d = Math.atan2(o, c * u),
    h = c * l,
    p = 1 - h * h,
    f = p * (i * i - i * (1 - a) * (i * (1 - a))) / (i * (1 - a) * (i * (1 - a))),
    m = 1 + f / 16384 * (4096 + f * (f * (320 - 175 * f) - 768)),
    M = f / 1024 * (256 + f * (f * (74 - 47 * f) - 128));
  let _,
    A,
    g,
    b,
    y,
    L = r / (i * (1 - a) * m),
    v = 100;
  do {
    A = Math.cos(2 * d + L), g = Math.sin(L), b = Math.cos(L), y = M * g * (A + M / 4 * (b * (2 * A * A - 1) - M / 6 * A * (4 * g * g - 3) * (4 * A * A - 3))), _ = L, L = r / (i * (1 - a) * m) + y;
  } while (Math.abs(L - _) > 1e-12 && --v > 0);
  if (0 === v) return {
    lat2: NaN,
    lon2: NaN
  };
  const T = o * g - c * b * u,
    S = a / 16 * p * (4 + a * (4 - 3 * p));
  return {
    lat2: Math.atan2(o * b + c * g * u, (1 - a) * Math.sqrt(h * h + T * T)),
    lon2: t + (Math.atan2(g * l, c * b - o * g * u) - (1 - S) * a * h * (L + S * g * (A + S * b * (2 * A * A - 1))))
  };
}
export { vincentyDirect };
export { vincentyInverse };
