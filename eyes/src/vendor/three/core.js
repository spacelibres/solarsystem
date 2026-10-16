// Recovered from vendors.js:386331-792655.
const REVISION = "185",
  MOUSE = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2,
    ROTATE: 0,
    DOLLY: 1,
    PAN: 2
  },
  TOUCH = {
    ROTATE: 0,
    PAN: 1,
    DOLLY_PAN: 2,
    DOLLY_ROTATE: 3
  },
  CullFaceNone = 0,
  CullFaceBack = 1,
  CullFaceFront = 2,
  CullFaceFrontBack = 3,
  BasicShadowMap = 0,
  PCFShadowMap = 1,
  PCFSoftShadowMap = 2,
  VSMShadowMap = 3,
  f = 0,
  BackSide = 1,
  DoubleSide = 2,
  NoBlending = 0,
  A = 1,
  AdditiveBlending = 2,
  SubtractiveBlending = 3,
  MultiplyBlending = 4,
  CustomBlending = 5,
  MaterialBlending = 6,
  T = 100,
  SubtractEquation = 101,
  ReverseSubtractEquation = 102,
  MinEquation = 103,
  MaxEquation = 104,
  ZeroFactor = 200,
  OneFactor = 201,
  SrcColorFactor = 202,
  OneMinusSrcColorFactor = 203,
  D = 204,
  N = 205,
  DstAlphaFactor = 206,
  OneMinusDstAlphaFactor = 207,
  DstColorFactor = 208,
  OneMinusDstColorFactor = 209,
  SrcAlphaSaturateFactor = 210,
  ConstantColorFactor = 211,
  OneMinusConstantColorFactor = 212,
  ConstantAlphaFactor = 213,
  OneMinusConstantAlphaFactor = 214,
  NeverDepth = 0,
  AlwaysDepth = 1,
  LessDepth = 2,
  j = 3,
  EqualDepth = 4,
  GreaterEqualDepth = 5,
  GreaterDepth = 6,
  NotEqualDepth = 7,
  Z = 0,
  MixOperation = 1,
  AddOperation = 2,
  NoToneMapping = 0,
  LinearToneMapping = 1,
  ReinhardToneMapping = 2,
  CineonToneMapping = 3,
  ACESFilmicToneMapping = 4,
  CustomToneMapping = 5,
  AgXToneMapping = 6,
  NeutralToneMapping = 7,
  ue = "attached",
  DetachedBindMode = "detached",
  UVMapping = 300,
  CubeReflectionMapping = 301,
  CubeRefractionMapping = 302,
  EquirectangularReflectionMapping = 303,
  EquirectangularRefractionMapping = 304,
  CubeUVReflectionMapping = 306,
  RepeatWrapping = 1e3,
  ge = 1001,
  MirroredRepeatWrapping = 1002,
  ye = 1003,
  NearestMipmapNearestFilter = 1004,
  NearestMipMapNearestFilter = 1004,
  NearestMipmapLinearFilter = 1005,
  NearestMipMapLinearFilter = 1005,
  LinearFilter = 1006,
  LinearMipmapNearestFilter = 1007,
  LinearMipMapNearestFilter = 1007,
  LinearMipmapLinearFilter = 1008,
  LinearMipMapLinearFilter = 1008,
  Oe = 1009,
  ByteType = 1010,
  ShortType = 1011,
  UnsignedShortType = 1012,
  IntType = 1013,
  UnsignedIntType = 1014,
  ke = 1015,
  HalfFloatType = 1016,
  UnsignedShort4444Type = 1017,
  UnsignedShort5551Type = 1018,
  UnsignedInt248Type = 1020,
  UnsignedInt5999Type = 35902,
  UnsignedInt101111Type = 35899,
  AlphaFormat = 1021,
  RGBFormat = 1022,
  RGBAFormat = 1023,
  DepthFormat = 1026,
  DepthStencilFormat = 1027,
  RedFormat = 1028,
  RedIntegerFormat = 1029,
  RGFormat = 1030,
  RGIntegerFormat = 1031,
  RGBIntegerFormat = 1032,
  RGBAIntegerFormat = 1033,
  RGB_S3TC_DXT1_Format = 33776,
  RGBA_S3TC_DXT1_Format = 33777,
  RGBA_S3TC_DXT3_Format = 33778,
  RGBA_S3TC_DXT5_Format = 33779,
  RGB_PVRTC_4BPPV1_Format = 35840,
  RGB_PVRTC_2BPPV1_Format = 35841,
  RGBA_PVRTC_4BPPV1_Format = 35842,
  RGBA_PVRTC_2BPPV1_Format = 35843,
  RGB_ETC1_Format = 36196,
  RGB_ETC2_Format = 37492,
  RGBA_ETC2_EAC_Format = 37496,
  R11_EAC_Format = 37488,
  SIGNED_R11_EAC_Format = 37489,
  RG11_EAC_Format = 37490,
  SIGNED_RG11_EAC_Format = 37491,
  RGBA_ASTC_4x4_Format = 37808,
  RGBA_ASTC_5x4_Format = 37809,
  RGBA_ASTC_5x5_Format = 37810,
  RGBA_ASTC_6x5_Format = 37811,
  RGBA_ASTC_6x6_Format = 37812,
  RGBA_ASTC_8x5_Format = 37813,
  RGBA_ASTC_8x6_Format = 37814,
  RGBA_ASTC_8x8_Format = 37815,
  RGBA_ASTC_10x5_Format = 37816,
  RGBA_ASTC_10x6_Format = 37817,
  RGBA_ASTC_10x8_Format = 37818,
  RGBA_ASTC_10x10_Format = 37819,
  RGBA_ASTC_12x10_Format = 37820,
  RGBA_ASTC_12x12_Format = 37821,
  RGBA_BPTC_Format = 36492,
  RGB_BPTC_SIGNED_Format = 36494,
  RGB_BPTC_UNSIGNED_Format = 36495,
  RED_RGTC1_Format = 36283,
  SIGNED_RED_RGTC1_Format = 36284,
  RED_GREEN_RGTC2_Format = 36285,
  SIGNED_RED_GREEN_RGTC2_Format = 36286,
  LoopOnce = 2200,
  Pt = 2201,
  LoopPingPong = 2202,
  InterpolateDiscrete = 2300,
  InterpolateLinear = 2301,
  InterpolateSmooth = 2302,
  InterpolateBezier = 2303,
  ZeroCurvatureEnding = 2400,
  ZeroSlopeEnding = 2401,
  WrapAroundEnding = 2402,
  NormalAnimationBlendMode = 2500,
  AdditiveAnimationBlendMode = 2501,
  TrianglesDrawMode = 0,
  TriangleStripDrawMode = 1,
  TriangleFanDrawMode = 2,
  $t = 3200,
  RGBADepthPacking = 3201,
  RGBDepthPacking = 3202,
  RGDepthPacking = 3203,
  nn = 0,
  ObjectSpaceNormalMap = 1,
  NoColorSpace = "",
  SRGBColorSpace = "srgb",
  LinearSRGBColorSpace = "srgb-linear",
  LinearTransfer = "linear",
  SRGBTransfer = "srgb",
  NoNormalPacking = "",
  NormalRGPacking = "rg",
  NormalGAPacking = "ga",
  ZeroStencilOp = 0,
  fn = 7680,
  ReplaceStencilOp = 7681,
  IncrementStencilOp = 7682,
  DecrementStencilOp = 7683,
  IncrementWrapStencilOp = 34055,
  DecrementWrapStencilOp = 34056,
  InvertStencilOp = 5386,
  NeverStencilFunc = 512,
  LessStencilFunc = 513,
  EqualStencilFunc = 514,
  LessEqualStencilFunc = 515,
  GreaterStencilFunc = 516,
  NotEqualStencilFunc = 517,
  GreaterEqualStencilFunc = 518,
  xn = 519,
  NeverCompare = 512,
  LessCompare = 513,
  EqualCompare = 514,
  LessEqualCompare = 515,
  GreaterCompare = 516,
  NotEqualCompare = 517,
  GreaterEqualCompare = 518,
  AlwaysCompare = 519,
  kn = 35044,
  DynamicDrawUsage = 35048,
  StreamDrawUsage = 35040,
  StaticReadUsage = 35045,
  DynamicReadUsage = 35049,
  StreamReadUsage = 35041,
  StaticCopyUsage = 35046,
  DynamicCopyUsage = 35050,
  StreamCopyUsage = 35042,
  GLSL1 = "100",
  GLSL3 = "300 es",
  Vn = 2e3,
  WebGPUCoordinateSystem = 2001,
  TimestampQuery = {
    COMPUTE: "compute",
    RENDER: "render"
  },
  InterpolationSamplingType = {
    PERSPECTIVE: "perspective",
    LINEAR: "linear",
    FLAT: "flat"
  },
  InterpolationSamplingMode = {
    NORMAL: "normal",
    CENTROID: "centroid",
    SAMPLE: "sample",
    FIRST: "first",
    EITHER: "either"
  },
  Compatibility = {
    TEXTURE_COMPARE: "depthTextureCompare"
  };
const er = {
  Int8Array: Int8Array,
  Uint8Array: Uint8Array,
  Uint8ClampedArray: Uint8ClampedArray,
  Int16Array: Int16Array,
  Uint16Array: Uint16Array,
  Int32Array: Int32Array,
  Uint32Array: Uint32Array,
  Float32Array: Float32Array,
  Float64Array: Float64Array
};
function tr(e, t) {
  return new er[e](t);
}
function isTypedArray(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function createElementNS(e) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", e);
}
function createCanvasElement() {
  const e = createElementNS("canvas");
  return e.style.display = "block", e;
}
const ar = {};
let sr = null;
function setConsoleFunction(e) {
  sr = e;
}
function getConsoleFunction() {
  return sr;
}
function log(...e) {
  const t = "THREE." + e.shift();
  sr ? sr("log", t, ...e) : console.log(t, ...e);
}
function ur(e) {
  const t = e[0];
  if ("string" == typeof t && t.startsWith("TSL:")) {
    const t = e[1];
    t && t.isStackTrace ? e[0] += " " + t.getLocation() : e[1] = 'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.';
  }
  return e;
}
function warn(...e) {
  const t = "THREE." + (e = ur(e)).shift();
  if (sr) sr("warn", t, ...e);else {
    const n = e[0];
    n && n.isStackTrace ? console.warn(n.getError(t)) : console.warn(t, ...e);
  }
}
function error(...e) {
  const t = "THREE." + (e = ur(e)).shift();
  if (sr) sr("error", t, ...e);else {
    const n = e[0];
    n && n.isStackTrace ? console.error(n.getError(t)) : console.error(t, ...e);
  }
}
function warnOnce(...e) {
  const t = e.join(" ");
  t in ar || (ar[t] = !0, warn(...e));
}
function yieldToMain() {
  return "undefined" != typeof self && void 0 !== self.scheduler && void 0 !== self.scheduler.yield ? self.scheduler.yield() : new Promise(e => {
    requestAnimationFrame(e);
  });
}
function probeAsync(e, t, n) {
  return new Promise(function (r, i) {
    setTimeout(function a() {
      switch (e.clientWaitSync(t, e.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case e.WAIT_FAILED:
          i();
          break;
        case e.TIMEOUT_EXPIRED:
          setTimeout(a, n);
          break;
        default:
          r();
      }
    }, n);
  });
}
const ReversedDepthFuncs = {
  [NeverDepth]: AlwaysDepth,
  [LessDepth]: GreaterDepth,
  [EqualDepth]: NotEqualDepth,
  [j]: GreaterEqualDepth,
  [AlwaysDepth]: NeverDepth,
  [GreaterDepth]: LessDepth,
  [NotEqualDepth]: EqualDepth,
  [GreaterEqualDepth]: j
};
class EventDispatcher {
  addEventListener(e, t) {
    void 0 === this._listeners && (this._listeners = {});
    const listeners = this._listeners;
    void 0 === listeners[e] && (listeners[e] = []), -1 === listeners[e].indexOf(t) && listeners[e].push(t);
  }
  hasEventListener(e, t) {
    const listeners = this._listeners;
    return void 0 !== listeners && void 0 !== listeners[e] && -1 !== listeners[e].indexOf(t);
  }
  removeEventListener(e, t) {
    const listeners = this._listeners;
    if (void 0 === listeners) return;
    const r = listeners[e];
    if (void 0 !== r) {
      const e = r.indexOf(t);
      -1 !== e && r.splice(e, 1);
    }
  }
  dispatchEvent(e) {
    const listeners = this._listeners;
    if (void 0 === listeners) return;
    const n = listeners[e.type];
    if (void 0 !== n) {
      e.target = this;
      const t = n.slice(0);
      for (let n = 0, r = t.length; n < r; n++) t[n].call(this, e);
      e.target = null;
    }
  }
}
const _r = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
let Ar = 1234567;
const gr = Math.PI / 180,
  RAD2DEG = 180 / Math.PI;
function yr() {
  const e = 4294967295 * Math.random() | 0,
    t = 4294967295 * Math.random() | 0,
    n = 4294967295 * Math.random() | 0,
    r = 4294967295 * Math.random() | 0;
  return (_r[255 & e] + _r[e >> 8 & 255] + _r[e >> 16 & 255] + _r[e >> 24 & 255] + "-" + _r[255 & t] + _r[t >> 8 & 255] + "-" + _r[t >> 16 & 15 | 64] + _r[t >> 24 & 255] + "-" + _r[63 & n | 128] + _r[n >> 8 & 255] + "-" + _r[n >> 16 & 255] + _r[n >> 24 & 255] + _r[255 & r] + _r[r >> 8 & 255] + _r[r >> 16 & 255] + _r[r >> 24 & 255]).toLowerCase();
}
function Lr(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function vr(e, t) {
  return (e % t + t) % t;
}
function Tr(e, t, n) {
  return (1 - n) * e + n * t;
}
function Sr(e, t) {
  switch (t.constructor) {
    case Float32Array:
      return e;
    case Uint32Array:
      return e / 4294967295;
    case Uint16Array:
      return e / 65535;
    case Uint8Array:
      return e / 255;
    case Int32Array:
      return Math.max(e / 2147483647, -1);
    case Int16Array:
      return Math.max(e / 32767, -1);
    case Int8Array:
      return Math.max(e / 127, -1);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
function wr(e, t) {
  switch (t.constructor) {
    case Float32Array:
      return e;
    case Uint32Array:
      return Math.round(4294967295 * e);
    case Uint16Array:
      return Math.round(65535 * e);
    case Uint8Array:
      return Math.round(255 * e);
    case Int32Array:
      return Math.round(2147483647 * e);
    case Int16Array:
      return Math.round(32767 * e);
    case Int8Array:
      return Math.round(127 * e);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
const MathUtils = {
  DEG2RAD: gr,
  RAD2DEG: RAD2DEG,
  generateUUID: yr,
  clamp: Lr,
  euclideanModulo: vr,
  mapLinear: function (e, t, n, r, i) {
    return r + (e - t) * (i - r) / (n - t);
  },
  inverseLerp: function (e, t, n) {
    return e !== t ? (n - e) / (t - e) : 0;
  },
  lerp: Tr,
  damp: function (e, t, n, r) {
    return Tr(e, t, 1 - Math.exp(-n * r));
  },
  pingpong: function (e, t = 1) {
    return t - Math.abs(vr(e, 2 * t) - t);
  },
  smoothstep: function (e, t, n) {
    return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t)) * e * (3 - 2 * e);
  },
  smootherstep: function (e, t, n) {
    return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t)) * e * e * (e * (6 * e - 15) + 10);
  },
  randInt: function (e, t) {
    return e + Math.floor(Math.random() * (t - e + 1));
  },
  randFloat: function (e, t) {
    return e + Math.random() * (t - e);
  },
  randFloatSpread: function (e) {
    return e * (.5 - Math.random());
  },
  seededRandom: function (e) {
    void 0 !== e && (Ar = e);
    let t = Ar += 1831565813;
    return t = Math.imul(t ^ t >>> 15, 1 | t), t ^= t + Math.imul(t ^ t >>> 7, 61 | t), ((t ^ t >>> 14) >>> 0) / 4294967296;
  },
  degToRad: function (e) {
    return e * gr;
  },
  radToDeg: function (e) {
    return e * RAD2DEG;
  },
  isPowerOfTwo: function (e) {
    return !(e & e - 1) && 0 !== e;
  },
  ceilPowerOfTwo: function (e) {
    return Math.pow(2, Math.ceil(Math.log(e) / Math.LN2));
  },
  floorPowerOfTwo: function (e) {
    return Math.pow(2, Math.floor(Math.log(e) / Math.LN2));
  },
  setQuaternionFromProperEuler: function (e, t, n, r, i) {
    const a = Math.cos,
      s = Math.sin,
      o = a(n / 2),
      c = s(n / 2),
      l = a((t + r) / 2),
      u = s((t + r) / 2),
      d = a((t - r) / 2),
      h = s((t - r) / 2),
      p = a((r - t) / 2),
      f = s((r - t) / 2);
    switch (i) {
      case "XYX":
        e.set(o * u, c * d, c * h, o * l);
        break;
      case "YZY":
        e.set(c * h, o * u, c * d, o * l);
        break;
      case "ZXZ":
        e.set(c * d, c * h, o * u, o * l);
        break;
      case "XZX":
        e.set(o * u, c * f, c * p, o * l);
        break;
      case "YXY":
        e.set(c * p, o * u, c * f, o * l);
        break;
      case "ZYZ":
        e.set(c * f, c * p, o * u, o * l);
        break;
      default:
        warn("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + i);
    }
  },
  normalize: wr,
  denormalize: Sr
};
class Vector2 {
  static {
    Vector2.prototype.isVector2 = !0;
  }
  constructor(e = 0, t = 0) {
    this.x = e, this.y = t;
  }
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  set(e, t) {
    return this.x = e, this.y = t, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this;
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  applyMatrix3(e) {
    const t = this.x,
      n = this.y,
      r = e.elements;
    return this.x = r[0] * t + r[3] * n + r[6], this.y = r[1] * t + r[4] * n + r[7], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
  }
  clamp(e, t) {
    return this.x = Lr(this.x, e.x, t.x), this.y = Lr(this.y, e.y, t.y), this;
  }
  clampScalar(e, t) {
    return this.x = Lr(this.x, e, t), this.y = Lr(this.y, e, t), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Lr(n, e, t));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (0 === t) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(Lr(n, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x,
      n = this.y - e.y;
    return t * t + n * n;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this;
  }
  rotateAround(e, t) {
    const n = Math.cos(t),
      r = Math.sin(t),
      i = this.x - e.x,
      a = this.y - e.y;
    return this.x = i * n - a * r + e.x, this.y = i * r + a * n + e.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class Quaternion {
  constructor(e = 0, t = 0, n = 0, r = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = r;
  }
  static slerpFlat(e, t, n, r, i, a, s) {
    let o = n[r + 0],
      c = n[r + 1],
      l = n[r + 2],
      u = n[r + 3],
      d = i[a + 0],
      h = i[a + 1],
      p = i[a + 2],
      f = i[a + 3];
    if (u !== f || o !== d || c !== h || l !== p) {
      let e = o * d + c * h + l * p + u * f;
      e < 0 && (d = -d, h = -h, p = -p, f = -f, e = -e);
      let t = 1 - s;
      if (e < .9995) {
        const n = Math.acos(e),
          r = Math.sin(n);
        t = Math.sin(t * n) / r, o = o * t + d * (s = Math.sin(s * n) / r), c = c * t + h * s, l = l * t + p * s, u = u * t + f * s;
      } else {
        o = o * t + d * s, c = c * t + h * s, l = l * t + p * s, u = u * t + f * s;
        const e = 1 / Math.sqrt(o * o + c * c + l * l + u * u);
        o *= e, c *= e, l *= e, u *= e;
      }
    }
    e[t] = o, e[t + 1] = c, e[t + 2] = l, e[t + 3] = u;
  }
  static multiplyQuaternionsFlat(e, t, n, r, i, a) {
    const s = n[r],
      o = n[r + 1],
      c = n[r + 2],
      l = n[r + 3],
      u = i[a],
      d = i[a + 1],
      h = i[a + 2],
      p = i[a + 3];
    return e[t] = s * p + l * u + o * h - c * d, e[t + 1] = o * p + l * d + c * u - s * h, e[t + 2] = c * p + l * h + s * d - o * u, e[t + 3] = l * p - s * u - o * d - c * h, e;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e, this._onChangeCallback();
  }
  set(e, t, n, r) {
    return this._x = e, this._y = t, this._z = n, this._w = r, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(e) {
    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
  }
  setFromEuler(e, t = !0) {
    const n = e._x,
      r = e._y,
      i = e._z,
      a = e._order,
      s = Math.cos,
      o = Math.sin,
      c = s(n / 2),
      l = s(r / 2),
      u = s(i / 2),
      d = o(n / 2),
      h = o(r / 2),
      p = o(i / 2);
    switch (a) {
      case "XYZ":
        this._x = d * l * u + c * h * p, this._y = c * h * u - d * l * p, this._z = c * l * p + d * h * u, this._w = c * l * u - d * h * p;
        break;
      case "YXZ":
        this._x = d * l * u + c * h * p, this._y = c * h * u - d * l * p, this._z = c * l * p - d * h * u, this._w = c * l * u + d * h * p;
        break;
      case "ZXY":
        this._x = d * l * u - c * h * p, this._y = c * h * u + d * l * p, this._z = c * l * p + d * h * u, this._w = c * l * u - d * h * p;
        break;
      case "ZYX":
        this._x = d * l * u - c * h * p, this._y = c * h * u + d * l * p, this._z = c * l * p - d * h * u, this._w = c * l * u + d * h * p;
        break;
      case "YZX":
        this._x = d * l * u + c * h * p, this._y = c * h * u + d * l * p, this._z = c * l * p - d * h * u, this._w = c * l * u - d * h * p;
        break;
      case "XZY":
        this._x = d * l * u - c * h * p, this._y = c * h * u - d * l * p, this._z = c * l * p + d * h * u, this._w = c * l * u + d * h * p;
        break;
      default:
        warn("Quaternion: .setFromEuler() encountered an unknown order: " + a);
    }
    return !0 === t && this._onChangeCallback(), this;
  }
  setFromAxisAngle(e, t) {
    const n = t / 2,
      r = Math.sin(n);
    return this._x = e.x * r, this._y = e.y * r, this._z = e.z * r, this._w = Math.cos(n), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e) {
    const t = e.elements,
      n = t[0],
      r = t[4],
      i = t[8],
      a = t[1],
      s = t[5],
      o = t[9],
      c = t[2],
      l = t[6],
      u = t[10],
      d = n + s + u;
    if (d > 0) {
      const e = .5 / Math.sqrt(d + 1);
      this._w = .25 / e, this._x = (l - o) * e, this._y = (i - c) * e, this._z = (a - r) * e;
    } else if (n > s && n > u) {
      const e = 2 * Math.sqrt(1 + n - s - u);
      this._w = (l - o) / e, this._x = .25 * e, this._y = (r + a) / e, this._z = (i + c) / e;
    } else if (s > u) {
      const e = 2 * Math.sqrt(1 + s - n - u);
      this._w = (i - c) / e, this._x = (r + a) / e, this._y = .25 * e, this._z = (o + l) / e;
    } else {
      const e = 2 * Math.sqrt(1 + u - n - s);
      this._w = (a - r) / e, this._x = (i + c) / e, this._y = (o + l) / e, this._z = .25 * e;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(e, t) {
    let n = e.dot(t) + 1;
    return n < 1e-8 ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize();
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(Lr(this.dot(e), -1, 1)));
  }
  rotateTowards(e, t) {
    const n = this.angleTo(e);
    if (0 === n) return this;
    const r = Math.min(1, t / n);
    return this.slerp(e, r), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let e = this.length();
    return 0 === e ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this;
  }
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  multiplyQuaternions(e, t) {
    const n = e._x,
      r = e._y,
      i = e._z,
      a = e._w,
      s = t._x,
      o = t._y,
      c = t._z,
      l = t._w;
    return this._x = n * l + a * s + r * c - i * o, this._y = r * l + a * o + i * s - n * c, this._z = i * l + a * c + n * o - r * s, this._w = a * l - n * s - r * o - i * c, this._onChangeCallback(), this;
  }
  slerp(e, t) {
    let n = e._x,
      r = e._y,
      i = e._z,
      a = e._w,
      s = this.dot(e);
    s < 0 && (n = -n, r = -r, i = -i, a = -a, s = -s);
    let o = 1 - t;
    if (s < .9995) {
      const e = Math.acos(s),
        c = Math.sin(e);
      o = Math.sin(o * e) / c, t = Math.sin(t * e) / c, this._x = this._x * o + n * t, this._y = this._y * o + r * t, this._z = this._z * o + i * t, this._w = this._w * o + a * t, this._onChangeCallback();
    } else this._x = this._x * o + n * t, this._y = this._y * o + r * t, this._z = this._z * o + i * t, this._w = this._w * o + a * t, this.normalize();
    return this;
  }
  slerpQuaternions(e, t, n) {
    return this.copy(e).slerp(t, n);
  }
  random() {
    const e = 2 * Math.PI * Math.random(),
      t = 2 * Math.PI * Math.random(),
      n = Math.random(),
      r = Math.sqrt(1 - n),
      i = Math.sqrt(n);
    return this.set(r * Math.sin(e), r * Math.cos(e), i * Math.sin(t), i * Math.cos(t));
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  fromArray(e, t = 0) {
    return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
  }
  fromBufferAttribute(e, t) {
    return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(onChangeCallback) {
    return this._onChangeCallback = onChangeCallback, this;
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class Vector3 {
  static {
    Vector3.prototype.isVector3 = !0;
  }
  constructor(e = 0, t = 0, n = 0) {
    this.x = e, this.y = t, this.z = n;
  }
  set(e, t, n) {
    return void 0 === n && (n = this.z), this.x = e, this.y = t, this.z = n, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this;
  }
  multiplyVectors(e, t) {
    return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
  }
  applyEuler(e) {
    return this.applyQuaternion(quaternion.setFromEuler(e));
  }
  applyAxisAngle(e, t) {
    return this.applyQuaternion(quaternion.setFromAxisAngle(e, t));
  }
  applyMatrix3(e) {
    const t = this.x,
      n = this.y,
      r = this.z,
      i = e.elements;
    return this.x = i[0] * t + i[3] * n + i[6] * r, this.y = i[1] * t + i[4] * n + i[7] * r, this.z = i[2] * t + i[5] * n + i[8] * r, this;
  }
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  applyMatrix4(e) {
    const t = this.x,
      n = this.y,
      r = this.z,
      i = e.elements,
      a = 1 / (i[3] * t + i[7] * n + i[11] * r + i[15]);
    return this.x = (i[0] * t + i[4] * n + i[8] * r + i[12]) * a, this.y = (i[1] * t + i[5] * n + i[9] * r + i[13]) * a, this.z = (i[2] * t + i[6] * n + i[10] * r + i[14]) * a, this;
  }
  applyQuaternion(e) {
    const t = this.x,
      n = this.y,
      r = this.z,
      i = e.x,
      a = e.y,
      s = e.z,
      o = e.w,
      c = 2 * (a * r - s * n),
      l = 2 * (s * t - i * r),
      u = 2 * (i * n - a * t);
    return this.x = t + o * c + a * u - s * l, this.y = n + o * l + s * c - i * u, this.z = r + o * u + i * l - a * c, this;
  }
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  transformDirection(e) {
    const t = this.x,
      n = this.y,
      r = this.z,
      i = e.elements;
    return this.x = i[0] * t + i[4] * n + i[8] * r, this.y = i[1] * t + i[5] * n + i[9] * r, this.z = i[2] * t + i[6] * n + i[10] * r, this.normalize();
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
  }
  clamp(e, t) {
    return this.x = Lr(this.x, e.x, t.x), this.y = Lr(this.y, e.y, t.y), this.z = Lr(this.z, e.z, t.z), this;
  }
  clampScalar(e, t) {
    return this.x = Lr(this.x, e, t), this.y = Lr(this.y, e, t), this.z = Lr(this.z, e, t), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Lr(n, e, t));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this;
  }
  cross(e) {
    return this.crossVectors(this, e);
  }
  crossVectors(e, t) {
    const n = e.x,
      r = e.y,
      i = e.z,
      a = t.x,
      s = t.y,
      o = t.z;
    return this.x = r * o - i * s, this.y = i * a - n * o, this.z = n * s - r * a, this;
  }
  projectOnVector(e) {
    const t = e.lengthSq();
    if (0 === t) return this.set(0, 0, 0);
    const n = e.dot(this) / t;
    return this.copy(e).multiplyScalar(n);
  }
  projectOnPlane(e) {
    return vector3.copy(this).projectOnVector(e), this.sub(vector3);
  }
  reflect(e) {
    return this.sub(vector3.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (0 === t) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(Lr(n, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x,
      n = this.y - e.y,
      r = this.z - e.z;
    return t * t + n * n + r * r;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  setFromSphericalCoords(e, t, n) {
    const r = Math.sin(t) * e;
    return this.x = r * Math.sin(n), this.y = Math.cos(t) * e, this.z = r * Math.cos(n), this;
  }
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  setFromCylindricalCoords(e, t, n) {
    return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this;
  }
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this;
  }
  setFromMatrixScale(e) {
    const t = this.setFromMatrixColumn(e, 0).length(),
      n = this.setFromMatrixColumn(e, 1).length(),
      r = this.setFromMatrixColumn(e, 2).length();
    return this.x = t, this.y = n, this.z = r, this;
  }
  setFromMatrixColumn(e, t) {
    return this.fromArray(e.elements, 4 * t);
  }
  setFromMatrix3Column(e, t) {
    return this.fromArray(e.elements, 3 * t);
  }
  setFromEuler(e) {
    return this.x = e._x, this.y = e._y, this.z = e._z, this;
  }
  setFromColor(e) {
    return this.x = e.r, this.y = e.g, this.z = e.b, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const e = Math.random() * Math.PI * 2,
      t = 2 * Math.random() - 1,
      n = Math.sqrt(1 - t * t);
    return this.x = n * Math.cos(e), this.y = t, this.z = n * Math.sin(e), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const vector3 = new Vector3(),
  quaternion = new Quaternion();
class Matrix3 {
  static {
    Matrix3.prototype.isMatrix3 = !0;
  }
  constructor(e, t, n, r, i, a, s, o, c) {
    this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], void 0 !== e && this.set(e, t, n, r, i, a, s, o, c);
  }
  set(e, t, n, r, i, a, s, o, c) {
    const elements = this.elements;
    return elements[0] = e, elements[1] = r, elements[2] = s, elements[3] = t, elements[4] = i, elements[5] = o, elements[6] = n, elements[7] = a, elements[8] = c, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
  }
  copy(e) {
    const elements = this.elements,
      n = e.elements;
    return elements[0] = n[0], elements[1] = n[1], elements[2] = n[2], elements[3] = n[3], elements[4] = n[4], elements[5] = n[5], elements[6] = n[6], elements[7] = n[7], elements[8] = n[8], this;
  }
  extractBasis(e, t, n) {
    return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(e) {
    const t = e.elements;
    return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const n = e.elements,
      r = t.elements,
      elements = this.elements,
      a = n[0],
      s = n[3],
      o = n[6],
      c = n[1],
      l = n[4],
      u = n[7],
      d = n[2],
      h = n[5],
      p = n[8],
      f = r[0],
      m = r[3],
      M = r[6],
      _ = r[1],
      A = r[4],
      g = r[7],
      b = r[2],
      y = r[5],
      L = r[8];
    return elements[0] = a * f + s * _ + o * b, elements[3] = a * m + s * A + o * y, elements[6] = a * M + s * g + o * L, elements[1] = c * f + l * _ + u * b, elements[4] = c * m + l * A + u * y, elements[7] = c * M + l * g + u * L, elements[2] = d * f + h * _ + p * b, elements[5] = d * m + h * A + p * y, elements[8] = d * M + h * g + p * L, this;
  }
  multiplyScalar(e) {
    const elements = this.elements;
    return elements[0] *= e, elements[3] *= e, elements[6] *= e, elements[1] *= e, elements[4] *= e, elements[7] *= e, elements[2] *= e, elements[5] *= e, elements[8] *= e, this;
  }
  determinant() {
    const elements = this.elements,
      t = elements[0],
      n = elements[1],
      r = elements[2],
      i = elements[3],
      a = elements[4],
      s = elements[5],
      o = elements[6],
      c = elements[7],
      l = elements[8];
    return t * a * l - t * s * c - n * i * l + n * s * o + r * i * c - r * a * o;
  }
  invert() {
    const elements = this.elements,
      t = elements[0],
      n = elements[1],
      r = elements[2],
      i = elements[3],
      a = elements[4],
      s = elements[5],
      o = elements[6],
      c = elements[7],
      l = elements[8],
      u = l * a - s * c,
      d = s * o - l * i,
      h = c * i - a * o,
      p = t * u + n * d + r * h;
    if (0 === p) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const f = 1 / p;
    return elements[0] = u * f, elements[1] = (r * c - l * n) * f, elements[2] = (s * n - r * a) * f, elements[3] = d * f, elements[4] = (l * t - r * o) * f, elements[5] = (r * i - s * t) * f, elements[6] = h * f, elements[7] = (n * o - c * t) * f, elements[8] = (a * t - n * i) * f, this;
  }
  transpose() {
    let e;
    const elements = this.elements;
    return e = elements[1], elements[1] = elements[3], elements[3] = e, e = elements[2], elements[2] = elements[6], elements[6] = e, e = elements[5], elements[5] = elements[7], elements[7] = e, this;
  }
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  transposeIntoArray(e) {
    const elements = this.elements;
    return e[0] = elements[0], e[1] = elements[3], e[2] = elements[6], e[3] = elements[1], e[4] = elements[4], e[5] = elements[7], e[6] = elements[2], e[7] = elements[5], e[8] = elements[8], this;
  }
  setUvTransform(e, t, n, r, i, a, s) {
    const o = Math.cos(i),
      c = Math.sin(i);
    return this.set(n * o, n * c, -n * (o * a + c * s) + a + e, -r * c, r * o, -r * (-c * a + o * s) + s + t, 0, 0, 1), this;
  }
  scale(e, t) {
    return warnOnce("Matrix3: .scale() is deprecated. Use .makeScale() instead."), this.premultiply(matrix3.makeScale(e, t)), this;
  }
  rotate(e) {
    return warnOnce("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."), this.premultiply(matrix3.makeRotation(-e)), this;
  }
  translate(e, t) {
    return warnOnce("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."), this.premultiply(matrix3.makeTranslation(e, t)), this;
  }
  makeTranslation(e, t) {
    return e.isVector2 ? this.set(1, 0, e.x, 0, 1, e.y, 0, 0, 1) : this.set(1, 0, e, 0, 1, t, 0, 0, 1), this;
  }
  makeRotation(e) {
    const t = Math.cos(e),
      n = Math.sin(e);
    return this.set(t, -n, 0, n, t, 0, 0, 0, 1), this;
  }
  makeScale(e, t) {
    return this.set(e, 0, 0, 0, t, 0, 0, 0, 1), this;
  }
  equals(e) {
    const elements = this.elements,
      n = e.elements;
    for (let e = 0; e < 9; e++) if (elements[e] !== n[e]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let n = 0; n < 9; n++) this.elements[n] = e[n + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const elements = this.elements;
    return e[t] = elements[0], e[t + 1] = elements[1], e[t + 2] = elements[2], e[t + 3] = elements[3], e[t + 4] = elements[4], e[t + 5] = elements[5], e[t + 6] = elements[6], e[t + 7] = elements[7], e[t + 8] = elements[8], e;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const matrix3 = new Matrix3(),
  Or = new Matrix3().set(.4123908, .3575843, .1804808, .212639, .7151687, .0721923, .0193308, .1191948, .9505322),
  Br = new Matrix3().set(3.2409699, -1.5373832, -.4986108, -.9692436, 1.8759675, .0415551, .0556301, -.203977, 1.0569715);
function Dr() {
  const e = {
      enabled: !0,
      workingColorSpace: LinearSRGBColorSpace,
      spaces: {},
      convert: function (e, t, n) {
        return !1 !== this.enabled && t !== n && t && n ? (this.spaces[t].transfer === SRGBTransfer && (e.r = Ir(e.r), e.g = Ir(e.g), e.b = Ir(e.b)), this.spaces[t].primaries !== this.spaces[n].primaries && (e.applyMatrix3(this.spaces[t].toXYZ), e.applyMatrix3(this.spaces[n].fromXYZ)), this.spaces[n].transfer === SRGBTransfer && (e.r = Rr(e.r), e.g = Rr(e.g), e.b = Rr(e.b)), e) : e;
      },
      workingToColorSpace: function (e, t) {
        return this.convert(e, this.workingColorSpace, t);
      },
      colorSpaceToWorking: function (e, t) {
        return this.convert(e, t, this.workingColorSpace);
      },
      getPrimaries: function (e) {
        return this.spaces[e].primaries;
      },
      getTransfer: function (e) {
        return e === NoColorSpace ? LinearTransfer : this.spaces[e].transfer;
      },
      getToneMappingMode: function (e) {
        return this.spaces[e].outputColorSpaceConfig.toneMappingMode || "standard";
      },
      getLuminanceCoefficients: function (e, t = this.workingColorSpace) {
        return e.fromArray(this.spaces[t].luminanceCoefficients);
      },
      define: function (e) {
        Object.assign(this.spaces, e);
      },
      _getMatrix: function (e, t, n) {
        return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ);
      },
      _getDrawingBufferColorSpace: function (e) {
        return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace;
      },
      _getUnpackColorSpace: function (e = this.workingColorSpace) {
        return this.spaces[e].workingColorSpaceConfig.unpackColorSpace;
      },
      fromWorkingColorSpace: function (t, n) {
        return warnOnce("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), e.workingToColorSpace(t, n);
      },
      toWorkingColorSpace: function (t, n) {
        return warnOnce("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), e.colorSpaceToWorking(t, n);
      }
    },
    t = [.64, .33, .3, .6, .15, .06],
    n = [.2126, .7152, .0722],
    r = [.3127, .329];
  return e.define({
    [LinearSRGBColorSpace]: {
      primaries: t,
      whitePoint: r,
      transfer: LinearTransfer,
      toXYZ: Or,
      fromXYZ: Br,
      luminanceCoefficients: n,
      workingColorSpaceConfig: {
        unpackColorSpace: SRGBColorSpace
      },
      outputColorSpaceConfig: {
        drawingBufferColorSpace: SRGBColorSpace
      }
    },
    [SRGBColorSpace]: {
      primaries: t,
      whitePoint: r,
      transfer: SRGBTransfer,
      toXYZ: Or,
      fromXYZ: Br,
      luminanceCoefficients: n,
      outputColorSpaceConfig: {
        drawingBufferColorSpace: SRGBColorSpace
      }
    }
  }), e;
}
const ColorManagement = Dr();
function Ir(e) {
  return e < .04045 ? .0773993808 * e : Math.pow(.9478672986 * e + .0521327014, 2.4);
}
function Rr(e) {
  return e < .0031308 ? 12.92 * e : 1.055 * Math.pow(e, .41666) - .055;
}
let kr;
class ImageUtils {
  static getDataURL(e, t = "image/png") {
    if (/^data:/i.test(e.src)) return e.src;
    if ("undefined" == typeof HTMLCanvasElement) return e.src;
    let n;
    if (e instanceof HTMLCanvasElement) n = e;else {
      void 0 === kr && (kr = createElementNS("canvas")), kr.width = e.width, kr.height = e.height;
      const t = kr.getContext("2d");
      e instanceof ImageData ? t.putImageData(e, 0, 0) : t.drawImage(e, 0, 0, e.width, e.height), n = kr;
    }
    return n.toDataURL(t);
  }
  static sRGBToLinear(e) {
    if ("undefined" != typeof HTMLImageElement && e instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && e instanceof ImageBitmap) {
      const t = createElementNS("canvas");
      t.width = e.width, t.height = e.height;
      const n = t.getContext("2d");
      n.drawImage(e, 0, 0, e.width, e.height);
      const r = n.getImageData(0, 0, e.width, e.height),
        i = r.data;
      for (let e = 0; e < i.length; e++) i[e] = 255 * Ir(i[e] / 255);
      return n.putImageData(r, 0, 0), t;
    }
    if (e.data) {
      const t = e.data.slice(0);
      for (let e = 0; e < t.length; e++) t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[e] = Math.floor(255 * Ir(t[e] / 255)) : t[e] = Ir(t[e]);
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    }
    return warn("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}
let Pr = 0;
class Source {
  constructor(data = null) {
    this.isSource = !0, Object.defineProperty(this, "id", {
      value: Pr++
    }), this.uuid = yr(), this.data = data, this.dataReady = !0, this.version = 0;
  }
  getSize(e) {
    const data = this.data;
    return "undefined" != typeof HTMLVideoElement && data instanceof HTMLVideoElement ? e.set(data.videoWidth, data.videoHeight, 0) : "undefined" != typeof VideoFrame && data instanceof VideoFrame ? e.set(data.displayWidth, data.displayHeight, 0) : null !== data ? e.set(data.width, data.height, data.depth || 0) : e.set(0, 0, 0), e;
  }
  set needsUpdate(e) {
    !0 === e && this.version++;
  }
  toJSON(e) {
    const t = void 0 === e || "string" == typeof e;
    if (!t && void 0 !== e.images[this.uuid]) return e.images[this.uuid];
    const n = {
        uuid: this.uuid,
        url: ""
      },
      data = this.data;
    if (null !== data) {
      let e;
      if (Array.isArray(data)) {
        e = [];
        for (let t = 0, n = data.length; t < n; t++) data[t].isDataTexture ? e.push(Yr(data[t].image)) : e.push(Yr(data[t]));
      } else e = Yr(data);
      n.url = e;
    }
    return t || (e.images[this.uuid] = n), n;
  }
}
function Yr(e) {
  return "undefined" != typeof HTMLImageElement && e instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && e instanceof ImageBitmap ? ImageUtils.getDataURL(e) : e.data ? {
    data: Array.from(e.data),
    width: e.width,
    height: e.height,
    type: e.data.constructor.name
  } : (warn("Texture: Unable to serialize Texture."), {});
}
let Wr = 0;
const Fr = new Vector3();
class Texture extends EventDispatcher {
  constructor(e = Texture.DEFAULT_IMAGE, mapping = Texture.DEFAULT_MAPPING, wrapS = ge, wrapT = ge, magFilter = LinearFilter, minFilter = LinearMipmapLinearFilter, format = RGBAFormat, type = Oe, anisotropy = Texture.DEFAULT_ANISOTROPY, colorSpace = NoColorSpace) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", {
      value: Wr++
    }), this.uuid = yr(), this.name = "", this.source = new Source(e), this.mipmaps = [], this.mapping = mapping, this.channel = 0, this.wrapS = wrapS, this.wrapT = wrapT, this.magFilter = magFilter, this.minFilter = minFilter, this.anisotropy = anisotropy, this.format = format, this.internalFormat = null, this.type = type, this.offset = new Vector2(0, 0), this.repeat = new Vector2(1, 1), this.center = new Vector2(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Matrix3(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = colorSpace, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(e && e.depth && e.depth > 1), this.pmremVersion = 0, this.normalized = !1;
  }
  get width() {
    return this.source.getSize(Fr).x;
  }
  get height() {
    return this.source.getSize(Fr).y;
  }
  get depth() {
    return this.source.getSize(Fr).z;
  }
  get image() {
    return this.source.data;
  }
  set image(e) {
    this.source.data = e;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({
      start: e,
      count: t
    });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.normalized = e.normalized, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.renderTarget = e.renderTarget, this.isRenderTargetTexture = e.isRenderTargetTexture, this.isArrayTexture = e.isArrayTexture, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
  }
  setValues(e) {
    for (const t in e) {
      const n = e[t];
      if (void 0 === n) {
        warn(`Texture.setValues(): parameter '${t}' has value of undefined.`);
        continue;
      }
      const r = this[t];
      void 0 !== r ? r && n && r.isVector2 && n.isVector2 || r && n && r.isVector3 && n.isVector3 || r && n && r.isMatrix3 && n.isMatrix3 ? r.copy(n) : this[t] = n : warn(`Texture.setValues(): property '${t}' does not exist.`);
    }
  }
  toJSON(e) {
    const t = void 0 === e || "string" == typeof e;
    if (!t && void 0 !== e.textures[this.uuid]) return e.textures[this.uuid];
    const n = {
      metadata: {
        version: 4.7,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(e).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      normalized: this.normalized,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (n.userData = this.userData), t || (e.textures[this.uuid] = n), n;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
  transformUv(e) {
    if (this.mapping !== UVMapping) return e;
    if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1) switch (this.wrapS) {
      case RepeatWrapping:
        e.x = e.x - Math.floor(e.x);
        break;
      case ge:
        e.x = e.x < 0 ? 0 : 1;
        break;
      case MirroredRepeatWrapping:
        1 === Math.abs(Math.floor(e.x) % 2) ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
    }
    if (e.y < 0 || e.y > 1) switch (this.wrapT) {
      case RepeatWrapping:
        e.y = e.y - Math.floor(e.y);
        break;
      case ge:
        e.y = e.y < 0 ? 0 : 1;
        break;
      case MirroredRepeatWrapping:
        1 === Math.abs(Math.floor(e.y) % 2) ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y);
    }
    return this.flipY && (e.y = 1 - e.y), e;
  }
  set needsUpdate(e) {
    !0 === e && (this.version++, this.source.needsUpdate = !0);
  }
  set needsPMREMUpdate(e) {
    !0 === e && this.pmremVersion++;
  }
}
Texture.DEFAULT_IMAGE = null, Texture.DEFAULT_MAPPING = UVMapping, Texture.DEFAULT_ANISOTROPY = 1;
class Vector4 {
  static {
    Vector4.prototype.isVector4 = !0;
  }
  constructor(e = 0, t = 0, n = 0, r = 1) {
    this.x = e, this.y = t, this.z = n, this.w = r;
  }
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  set(e, t, n, r) {
    return this.x = e, this.y = t, this.z = n, this.w = r, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this.w = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setW(e) {
    return this.w = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      case 3:
        this.w = t;
        break;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this.w = void 0 !== e.w ? e.w : 1, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this.w += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
  }
  applyMatrix4(e) {
    const t = this.x,
      n = this.y,
      r = this.z,
      i = this.w,
      a = e.elements;
    return this.x = a[0] * t + a[4] * n + a[8] * r + a[12] * i, this.y = a[1] * t + a[5] * n + a[9] * r + a[13] * i, this.z = a[2] * t + a[6] * n + a[10] * r + a[14] * i, this.w = a[3] * t + a[7] * n + a[11] * r + a[15] * i, this;
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this.w /= e.w, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    const t = Math.sqrt(1 - e.w * e.w);
    return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
  }
  setAxisAngleFromRotationMatrix(e) {
    let t, n, r, i;
    const a = .01,
      s = .1,
      o = e.elements,
      c = o[0],
      l = o[4],
      u = o[8],
      d = o[1],
      h = o[5],
      p = o[9],
      f = o[2],
      m = o[6],
      M = o[10];
    if (Math.abs(l - d) < a && Math.abs(u - f) < a && Math.abs(p - m) < a) {
      if (Math.abs(l + d) < s && Math.abs(u + f) < s && Math.abs(p + m) < s && Math.abs(c + h + M - 3) < s) return this.set(1, 0, 0, 0), this;
      t = Math.PI;
      const e = (c + 1) / 2,
        o = (h + 1) / 2,
        _ = (M + 1) / 2,
        A = (l + d) / 4,
        g = (u + f) / 4,
        b = (p + m) / 4;
      return e > o && e > _ ? e < a ? (n = 0, r = .707106781, i = .707106781) : (n = Math.sqrt(e), r = A / n, i = g / n) : o > _ ? o < a ? (n = .707106781, r = 0, i = .707106781) : (r = Math.sqrt(o), n = A / r, i = b / r) : _ < a ? (n = .707106781, r = .707106781, i = 0) : (i = Math.sqrt(_), n = g / i, r = b / i), this.set(n, r, i, t), this;
    }
    let _ = Math.sqrt((m - p) * (m - p) + (u - f) * (u - f) + (d - l) * (d - l));
    return Math.abs(_) < .001 && (_ = 1), this.x = (m - p) / _, this.y = (u - f) / _, this.z = (d - l) / _, this.w = Math.acos((c + h + M - 1) / 2), this;
  }
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this.w = t[15], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
  }
  clamp(e, t) {
    return this.x = Lr(this.x, e.x, t.x), this.y = Lr(this.y, e.y, t.y), this.z = Lr(this.z, e.z, t.z), this.w = Lr(this.w, e.w, t.w), this;
  }
  clampScalar(e, t) {
    return this.x = Lr(this.x, e, t), this.y = Lr(this.y, e, t), this.z = Lr(this.z, e, t), this.w = Lr(this.w, e, t), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Lr(n, e, t));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class RenderTarget extends EventDispatcher {
  constructor(width = 1, height = 1, n = {}) {
    super(), n = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: LinearFilter,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1,
      depth: 1,
      multiview: !1,
      useArrayDepthTexture: !1
    }, n), this.isRenderTarget = !0, this.width = width, this.height = height, this.depth = n.depth, this.scissor = new Vector4(0, 0, width, height), this.scissorTest = !1, this.viewport = new Vector4(0, 0, width, height), this.textures = [];
    const r = {
        width: width,
        height: height,
        depth: n.depth
      },
      texture = new Texture(r),
      a = n.count;
    for (let e = 0; e < a; e++) this.textures[e] = texture.clone(), this.textures[e].isRenderTargetTexture = !0, this.textures[e].renderTarget = this;
    this._setTextureOptions(n), this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this._depthTexture = null, this.depthTexture = n.depthTexture, this.samples = n.samples, this.multiview = n.multiview, this.useArrayDepthTexture = n.useArrayDepthTexture;
  }
  _setTextureOptions(e = {}) {
    const t = {
      minFilter: LinearFilter,
      generateMipmaps: !1,
      flipY: !1,
      internalFormat: null
    };
    void 0 !== e.mapping && (t.mapping = e.mapping), void 0 !== e.wrapS && (t.wrapS = e.wrapS), void 0 !== e.wrapT && (t.wrapT = e.wrapT), void 0 !== e.wrapR && (t.wrapR = e.wrapR), void 0 !== e.magFilter && (t.magFilter = e.magFilter), void 0 !== e.minFilter && (t.minFilter = e.minFilter), void 0 !== e.format && (t.format = e.format), void 0 !== e.type && (t.type = e.type), void 0 !== e.anisotropy && (t.anisotropy = e.anisotropy), void 0 !== e.colorSpace && (t.colorSpace = e.colorSpace), void 0 !== e.flipY && (t.flipY = e.flipY), void 0 !== e.generateMipmaps && (t.generateMipmaps = e.generateMipmaps), void 0 !== e.internalFormat && (t.internalFormat = e.internalFormat);
    for (let e = 0; e < this.textures.length; e++) {
      this.textures[e].setValues(t);
    }
  }
  get texture() {
    return this.textures[0];
  }
  set texture(e) {
    this.textures[0] = e;
  }
  set depthTexture(depthTexture) {
    null !== this._depthTexture && (this._depthTexture.renderTarget = null), null !== depthTexture && (depthTexture.renderTarget = this), this._depthTexture = depthTexture;
  }
  get depthTexture() {
    return this._depthTexture;
  }
  setSize(width, height, depth = 1) {
    if (this.width !== width || this.height !== height || this.depth !== depth) {
      this.width = width, this.height = height, this.depth = depth;
      for (let r = 0, i = this.textures.length; r < i; r++) this.textures[r].image.width = width, this.textures[r].image.height = height, this.textures[r].image.depth = depth, !0 !== this.textures[r].isData3DTexture && (this.textures[r].isArrayTexture = this.textures[r].image.depth > 1);
      this.dispose();
    }
    this.viewport.set(0, 0, width, height), this.scissor.set(0, 0, width, height);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
    for (let t = 0, n = e.textures.length; t < n; t++) {
      this.textures[t] = e.textures[t].clone(), this.textures[t].isRenderTargetTexture = !0, this.textures[t].renderTarget = this;
      const n = Object.assign({}, e.textures[t].image);
      this.textures[t].source = new Source(n);
    }
    return this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, null !== e.depthTexture && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this.multiview = e.multiview, this.useArrayDepthTexture = e.useArrayDepthTexture, this;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
}
class WebGLRenderTarget extends RenderTarget {
  constructor(e = 1, t = 1, n = {}) {
    super(e, t, n), this.isWebGLRenderTarget = !0;
  }
}
class DataArrayTexture extends Texture {
  constructor(e = null, t = 1, n = 1, r = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = {
      data: e,
      width: t,
      height: n,
      depth: r
    }, this.magFilter = ye, this.minFilter = ye, this.wrapR = ge, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = new Set();
  }
  addLayerUpdate(e) {
    this.layerUpdates.add(e);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class WebGLArrayRenderTarget extends WebGLRenderTarget {
  constructor(e = 1, t = 1, depth = 1, r = {}) {
    super(e, t, r), this.isWebGLArrayRenderTarget = !0, this.depth = depth, this.texture = new DataArrayTexture(null, e, t, depth), this._setTextureOptions(r), this.texture.isRenderTargetTexture = !0;
  }
}
class Data3DTexture extends Texture {
  constructor(e = null, t = 1, n = 1, r = 1) {
    super(null), this.isData3DTexture = !0, this.image = {
      data: e,
      width: t,
      height: n,
      depth: r
    }, this.magFilter = ye, this.minFilter = ye, this.wrapR = ge, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class WebGL3DRenderTarget extends WebGLRenderTarget {
  constructor(e = 1, t = 1, depth = 1, r = {}) {
    super(e, t, r), this.isWebGL3DRenderTarget = !0, this.depth = depth, this.texture = new Data3DTexture(null, e, t, depth), this._setTextureOptions(r), this.texture.isRenderTargetTexture = !0;
  }
}
class Matrix4 {
  static {
    Matrix4.prototype.isMatrix4 = !0;
  }
  constructor(e, t, n, r, i, a, s, o, c, l, u, d, h, p, f, m) {
    this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], void 0 !== e && this.set(e, t, n, r, i, a, s, o, c, l, u, d, h, p, f, m);
  }
  set(e, t, n, r, i, a, s, o, c, l, u, d, h, p, f, m) {
    const elements = this.elements;
    return elements[0] = e, elements[4] = t, elements[8] = n, elements[12] = r, elements[1] = i, elements[5] = a, elements[9] = s, elements[13] = o, elements[2] = c, elements[6] = l, elements[10] = u, elements[14] = d, elements[3] = h, elements[7] = p, elements[11] = f, elements[15] = m, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  clone() {
    return new Matrix4().fromArray(this.elements);
  }
  copy(e) {
    const elements = this.elements,
      n = e.elements;
    return elements[0] = n[0], elements[1] = n[1], elements[2] = n[2], elements[3] = n[3], elements[4] = n[4], elements[5] = n[5], elements[6] = n[6], elements[7] = n[7], elements[8] = n[8], elements[9] = n[9], elements[10] = n[10], elements[11] = n[11], elements[12] = n[12], elements[13] = n[13], elements[14] = n[14], elements[15] = n[15], this;
  }
  copyPosition(e) {
    const elements = this.elements,
      n = e.elements;
    return elements[12] = n[12], elements[13] = n[13], elements[14] = n[14], this;
  }
  setFromMatrix3(e) {
    const t = e.elements;
    return this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1), this;
  }
  extractBasis(e, t, n) {
    return 0 === this.determinantAffine() ? (e.set(1, 0, 0), t.set(0, 1, 0), n.set(0, 0, 1), this) : (e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this);
  }
  makeBasis(e, t, n) {
    return this.set(e.x, t.x, n.x, 0, e.y, t.y, n.y, 0, e.z, t.z, n.z, 0, 0, 0, 0, 1), this;
  }
  extractRotation(e) {
    if (0 === e.determinantAffine()) return this.identity();
    const elements = this.elements,
      n = e.elements,
      r = 1 / qr.setFromMatrixColumn(e, 0).length(),
      i = 1 / qr.setFromMatrixColumn(e, 1).length(),
      a = 1 / qr.setFromMatrixColumn(e, 2).length();
    return elements[0] = n[0] * r, elements[1] = n[1] * r, elements[2] = n[2] * r, elements[3] = 0, elements[4] = n[4] * i, elements[5] = n[5] * i, elements[6] = n[6] * i, elements[7] = 0, elements[8] = n[8] * a, elements[9] = n[9] * a, elements[10] = n[10] * a, elements[11] = 0, elements[12] = 0, elements[13] = 0, elements[14] = 0, elements[15] = 1, this;
  }
  makeRotationFromEuler(e) {
    const elements = this.elements,
      n = e.x,
      r = e.y,
      i = e.z,
      a = Math.cos(n),
      s = Math.sin(n),
      o = Math.cos(r),
      c = Math.sin(r),
      l = Math.cos(i),
      u = Math.sin(i);
    if ("XYZ" === e.order) {
      const e = a * l,
        n = a * u,
        r = s * l,
        i = s * u;
      elements[0] = o * l, elements[4] = -o * u, elements[8] = c, elements[1] = n + r * c, elements[5] = e - i * c, elements[9] = -s * o, elements[2] = i - e * c, elements[6] = r + n * c, elements[10] = a * o;
    } else if ("YXZ" === e.order) {
      const e = o * l,
        n = o * u,
        r = c * l,
        i = c * u;
      elements[0] = e + i * s, elements[4] = r * s - n, elements[8] = a * c, elements[1] = a * u, elements[5] = a * l, elements[9] = -s, elements[2] = n * s - r, elements[6] = i + e * s, elements[10] = a * o;
    } else if ("ZXY" === e.order) {
      const e = o * l,
        n = o * u,
        r = c * l,
        i = c * u;
      elements[0] = e - i * s, elements[4] = -a * u, elements[8] = r + n * s, elements[1] = n + r * s, elements[5] = a * l, elements[9] = i - e * s, elements[2] = -a * c, elements[6] = s, elements[10] = a * o;
    } else if ("ZYX" === e.order) {
      const e = a * l,
        n = a * u,
        r = s * l,
        i = s * u;
      elements[0] = o * l, elements[4] = r * c - n, elements[8] = e * c + i, elements[1] = o * u, elements[5] = i * c + e, elements[9] = n * c - r, elements[2] = -c, elements[6] = s * o, elements[10] = a * o;
    } else if ("YZX" === e.order) {
      const e = a * o,
        n = a * c,
        r = s * o,
        i = s * c;
      elements[0] = o * l, elements[4] = i - e * u, elements[8] = r * u + n, elements[1] = u, elements[5] = a * l, elements[9] = -s * l, elements[2] = -c * l, elements[6] = n * u + r, elements[10] = e - i * u;
    } else if ("XZY" === e.order) {
      const e = a * o,
        n = a * c,
        r = s * o,
        i = s * c;
      elements[0] = o * l, elements[4] = -u, elements[8] = c * l, elements[1] = e * u + i, elements[5] = a * l, elements[9] = n * u - r, elements[2] = r * u - n, elements[6] = s * l, elements[10] = i * u + e;
    }
    return elements[3] = 0, elements[7] = 0, elements[11] = 0, elements[12] = 0, elements[13] = 0, elements[14] = 0, elements[15] = 1, this;
  }
  makeRotationFromQuaternion(e) {
    return this.compose(Ur, e, Gr);
  }
  lookAt(e, t, n) {
    const elements = this.elements;
    return Vr.subVectors(e, t), 0 === Vr.lengthSq() && (Vr.z = 1), Vr.normalize(), Xr.crossVectors(n, Vr), 0 === Xr.lengthSq() && (1 === Math.abs(n.z) ? Vr.x += 1e-4 : Vr.z += 1e-4, Vr.normalize(), Xr.crossVectors(n, Vr)), Xr.normalize(), jr.crossVectors(Vr, Xr), elements[0] = Xr.x, elements[4] = jr.x, elements[8] = Vr.x, elements[1] = Xr.y, elements[5] = jr.y, elements[9] = Vr.y, elements[2] = Xr.z, elements[6] = jr.z, elements[10] = Vr.z, this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const n = e.elements,
      r = t.elements,
      elements = this.elements,
      a = n[0],
      s = n[4],
      o = n[8],
      c = n[12],
      l = n[1],
      u = n[5],
      d = n[9],
      h = n[13],
      p = n[2],
      f = n[6],
      m = n[10],
      M = n[14],
      _ = n[3],
      A = n[7],
      g = n[11],
      b = n[15],
      y = r[0],
      L = r[4],
      v = r[8],
      T = r[12],
      S = r[1],
      w = r[5],
      E = r[9],
      x = r[13],
      C = r[2],
      z = r[6],
      O = r[10],
      B = r[14],
      D = r[3],
      N = r[7],
      I = r[11],
      R = r[15];
    return elements[0] = a * y + s * S + o * C + c * D, elements[4] = a * L + s * w + o * z + c * N, elements[8] = a * v + s * E + o * O + c * I, elements[12] = a * T + s * x + o * B + c * R, elements[1] = l * y + u * S + d * C + h * D, elements[5] = l * L + u * w + d * z + h * N, elements[9] = l * v + u * E + d * O + h * I, elements[13] = l * T + u * x + d * B + h * R, elements[2] = p * y + f * S + m * C + M * D, elements[6] = p * L + f * w + m * z + M * N, elements[10] = p * v + f * E + m * O + M * I, elements[14] = p * T + f * x + m * B + M * R, elements[3] = _ * y + A * S + g * C + b * D, elements[7] = _ * L + A * w + g * z + b * N, elements[11] = _ * v + A * E + g * O + b * I, elements[15] = _ * T + A * x + g * B + b * R, this;
  }
  multiplyScalar(e) {
    const elements = this.elements;
    return elements[0] *= e, elements[4] *= e, elements[8] *= e, elements[12] *= e, elements[1] *= e, elements[5] *= e, elements[9] *= e, elements[13] *= e, elements[2] *= e, elements[6] *= e, elements[10] *= e, elements[14] *= e, elements[3] *= e, elements[7] *= e, elements[11] *= e, elements[15] *= e, this;
  }
  determinant() {
    const elements = this.elements,
      t = elements[0],
      n = elements[4],
      r = elements[8],
      i = elements[12],
      a = elements[1],
      s = elements[5],
      o = elements[9],
      c = elements[13],
      l = elements[2],
      u = elements[6],
      d = elements[10],
      h = elements[14],
      p = elements[3],
      f = elements[7],
      m = elements[11],
      M = elements[15],
      _ = o * h - c * d,
      A = s * h - c * u,
      g = s * d - o * u,
      b = a * h - c * l,
      y = a * d - o * l,
      L = a * u - s * l;
    return t * (f * _ - m * A + M * g) - n * (p * _ - m * b + M * y) + r * (p * A - f * b + M * L) - i * (p * g - f * y + m * L);
  }
  determinantAffine() {
    const elements = this.elements,
      t = elements[0],
      n = elements[4],
      r = elements[8],
      i = elements[1],
      a = elements[5],
      s = elements[9],
      o = elements[2],
      c = elements[6],
      l = elements[10];
    return t * (a * l - s * c) - n * (i * l - s * o) + r * (i * c - a * o);
  }
  transpose() {
    const elements = this.elements;
    let t;
    return t = elements[1], elements[1] = elements[4], elements[4] = t, t = elements[2], elements[2] = elements[8], elements[8] = t, t = elements[6], elements[6] = elements[9], elements[9] = t, t = elements[3], elements[3] = elements[12], elements[12] = t, t = elements[7], elements[7] = elements[13], elements[13] = t, t = elements[11], elements[11] = elements[14], elements[14] = t, this;
  }
  setPosition(e, t, n) {
    const elements = this.elements;
    return e.isVector3 ? (elements[12] = e.x, elements[13] = e.y, elements[14] = e.z) : (elements[12] = e, elements[13] = t, elements[14] = n), this;
  }
  invert() {
    const elements = this.elements,
      t = elements[0],
      n = elements[1],
      r = elements[2],
      i = elements[3],
      a = elements[4],
      s = elements[5],
      o = elements[6],
      c = elements[7],
      l = elements[8],
      u = elements[9],
      d = elements[10],
      h = elements[11],
      p = elements[12],
      f = elements[13],
      m = elements[14],
      M = elements[15],
      _ = t * s - n * a,
      A = t * o - r * a,
      g = t * c - i * a,
      b = n * o - r * s,
      y = n * c - i * s,
      L = r * c - i * o,
      v = l * f - u * p,
      T = l * m - d * p,
      S = l * M - h * p,
      w = u * m - d * f,
      E = u * M - h * f,
      x = d * M - h * m,
      C = _ * x - A * E + g * w + b * S - y * T + L * v;
    if (0 === C) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const z = 1 / C;
    return elements[0] = (s * x - o * E + c * w) * z, elements[1] = (r * E - n * x - i * w) * z, elements[2] = (f * L - m * y + M * b) * z, elements[3] = (d * y - u * L - h * b) * z, elements[4] = (o * S - a * x - c * T) * z, elements[5] = (t * x - r * S + i * T) * z, elements[6] = (m * g - p * L - M * A) * z, elements[7] = (l * L - d * g + h * A) * z, elements[8] = (a * E - s * S + c * v) * z, elements[9] = (n * S - t * E - i * v) * z, elements[10] = (p * y - f * g + M * _) * z, elements[11] = (u * g - l * y - h * _) * z, elements[12] = (s * T - a * w - o * v) * z, elements[13] = (t * w - n * T + r * v) * z, elements[14] = (f * A - p * b - m * _) * z, elements[15] = (l * b - u * A + d * _) * z, this;
  }
  scale(e) {
    const elements = this.elements,
      n = e.x,
      r = e.y,
      i = e.z;
    return elements[0] *= n, elements[4] *= r, elements[8] *= i, elements[1] *= n, elements[5] *= r, elements[9] *= i, elements[2] *= n, elements[6] *= r, elements[10] *= i, elements[3] *= n, elements[7] *= r, elements[11] *= i, this;
  }
  getMaxScaleOnAxis() {
    const elements = this.elements,
      t = elements[0] * elements[0] + elements[1] * elements[1] + elements[2] * elements[2],
      n = elements[4] * elements[4] + elements[5] * elements[5] + elements[6] * elements[6],
      r = elements[8] * elements[8] + elements[9] * elements[9] + elements[10] * elements[10];
    return Math.sqrt(Math.max(t, n, r));
  }
  makeTranslation(e, t, n) {
    return e.isVector3 ? this.set(1, 0, 0, e.x, 0, 1, 0, e.y, 0, 0, 1, e.z, 0, 0, 0, 1) : this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, n, 0, 0, 0, 1), this;
  }
  makeRotationX(e) {
    const t = Math.cos(e),
      n = Math.sin(e);
    return this.set(1, 0, 0, 0, 0, t, -n, 0, 0, n, t, 0, 0, 0, 0, 1), this;
  }
  makeRotationY(e) {
    const t = Math.cos(e),
      n = Math.sin(e);
    return this.set(t, 0, n, 0, 0, 1, 0, 0, -n, 0, t, 0, 0, 0, 0, 1), this;
  }
  makeRotationZ(e) {
    const t = Math.cos(e),
      n = Math.sin(e);
    return this.set(t, -n, 0, 0, n, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  makeRotationAxis(e, t) {
    const n = Math.cos(t),
      r = Math.sin(t),
      i = 1 - n,
      a = e.x,
      s = e.y,
      o = e.z,
      c = i * a,
      l = i * s;
    return this.set(c * a + n, c * s - r * o, c * o + r * s, 0, c * s + r * o, l * s + n, l * o - r * a, 0, c * o - r * s, l * o + r * a, i * o * o + n, 0, 0, 0, 0, 1), this;
  }
  makeScale(e, t, n) {
    return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this;
  }
  makeShear(e, t, n, r, i, a) {
    return this.set(1, n, i, 0, e, 1, a, 0, t, r, 1, 0, 0, 0, 0, 1), this;
  }
  compose(e, t, n) {
    const elements = this.elements,
      i = t._x,
      a = t._y,
      s = t._z,
      o = t._w,
      c = i + i,
      l = a + a,
      u = s + s,
      d = i * c,
      h = i * l,
      p = i * u,
      f = a * l,
      m = a * u,
      M = s * u,
      _ = o * c,
      A = o * l,
      g = o * u,
      b = n.x,
      y = n.y,
      L = n.z;
    return elements[0] = (1 - (f + M)) * b, elements[1] = (h + g) * b, elements[2] = (p - A) * b, elements[3] = 0, elements[4] = (h - g) * y, elements[5] = (1 - (d + M)) * y, elements[6] = (m + _) * y, elements[7] = 0, elements[8] = (p + A) * L, elements[9] = (m - _) * L, elements[10] = (1 - (d + f)) * L, elements[11] = 0, elements[12] = e.x, elements[13] = e.y, elements[14] = e.z, elements[15] = 1, this;
  }
  decompose(e, t, n) {
    const elements = this.elements;
    e.x = elements[12], e.y = elements[13], e.z = elements[14];
    const i = this.determinantAffine();
    if (0 === i) return n.set(1, 1, 1), t.identity(), this;
    let a = qr.set(elements[0], elements[1], elements[2]).length();
    const s = qr.set(elements[4], elements[5], elements[6]).length(),
      o = qr.set(elements[8], elements[9], elements[10]).length();
    i < 0 && (a = -a), matrix4.copy(this);
    const c = 1 / a,
      l = 1 / s,
      u = 1 / o;
    return matrix4.elements[0] *= c, matrix4.elements[1] *= c, matrix4.elements[2] *= c, matrix4.elements[4] *= l, matrix4.elements[5] *= l, matrix4.elements[6] *= l, matrix4.elements[8] *= u, matrix4.elements[9] *= u, matrix4.elements[10] *= u, t.setFromRotationMatrix(matrix4), n.x = a, n.y = s, n.z = o, this;
  }
  makePerspective(e, t, n, r, i, a, s = Vn, o = !1) {
    const elements = this.elements,
      l = 2 * i / (t - e),
      u = 2 * i / (n - r),
      d = (t + e) / (t - e),
      h = (n + r) / (n - r);
    let p, f;
    if (o) p = i / (a - i), f = a * i / (a - i);else if (s === Vn) p = -(a + i) / (a - i), f = -2 * a * i / (a - i);else {
      if (s !== WebGPUCoordinateSystem) throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + s);
      p = -a / (a - i), f = -a * i / (a - i);
    }
    return elements[0] = l, elements[4] = 0, elements[8] = d, elements[12] = 0, elements[1] = 0, elements[5] = u, elements[9] = h, elements[13] = 0, elements[2] = 0, elements[6] = 0, elements[10] = p, elements[14] = f, elements[3] = 0, elements[7] = 0, elements[11] = -1, elements[15] = 0, this;
  }
  makeOrthographic(e, t, n, r, i, a, s = Vn, o = !1) {
    const elements = this.elements,
      l = 2 / (t - e),
      u = 2 / (n - r),
      d = -(t + e) / (t - e),
      h = -(n + r) / (n - r);
    let p, f;
    if (o) p = 1 / (a - i), f = a / (a - i);else if (s === Vn) p = -2 / (a - i), f = -(a + i) / (a - i);else {
      if (s !== WebGPUCoordinateSystem) throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + s);
      p = -1 / (a - i), f = -i / (a - i);
    }
    return elements[0] = l, elements[4] = 0, elements[8] = 0, elements[12] = d, elements[1] = 0, elements[5] = u, elements[9] = 0, elements[13] = h, elements[2] = 0, elements[6] = 0, elements[10] = p, elements[14] = f, elements[3] = 0, elements[7] = 0, elements[11] = 0, elements[15] = 1, this;
  }
  equals(e) {
    const elements = this.elements,
      n = e.elements;
    for (let e = 0; e < 16; e++) if (elements[e] !== n[e]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let n = 0; n < 16; n++) this.elements[n] = e[n + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const elements = this.elements;
    return e[t] = elements[0], e[t + 1] = elements[1], e[t + 2] = elements[2], e[t + 3] = elements[3], e[t + 4] = elements[4], e[t + 5] = elements[5], e[t + 6] = elements[6], e[t + 7] = elements[7], e[t + 8] = elements[8], e[t + 9] = elements[9], e[t + 10] = elements[10], e[t + 11] = elements[11], e[t + 12] = elements[12], e[t + 13] = elements[13], e[t + 14] = elements[14], e[t + 15] = elements[15], e;
  }
}
const qr = new Vector3(),
  matrix4 = new Matrix4(),
  Ur = new Vector3(0, 0, 0),
  Gr = new Vector3(1, 1, 1),
  Xr = new Vector3(),
  jr = new Vector3(),
  Vr = new Vector3(),
  Qr = new Matrix4(),
  Kr = new Quaternion();
class Euler {
  constructor(e = 0, t = 0, n = 0, order = Euler.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = e, this._y = t, this._z = n, this._order = order;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(order) {
    this._order = order, this._onChangeCallback();
  }
  set(e, t, n, order = this._order) {
    return this._x = e, this._y = t, this._z = n, this._order = order, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(e) {
    return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e, order = this._order, n = !0) {
    const r = e.elements,
      i = r[0],
      a = r[4],
      s = r[8],
      o = r[1],
      c = r[5],
      l = r[9],
      u = r[2],
      d = r[6],
      h = r[10];
    switch (order) {
      case "XYZ":
        this._y = Math.asin(Lr(s, -1, 1)), Math.abs(s) < .9999999 ? (this._x = Math.atan2(-l, h), this._z = Math.atan2(-a, i)) : (this._x = Math.atan2(d, c), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-Lr(l, -1, 1)), Math.abs(l) < .9999999 ? (this._y = Math.atan2(s, h), this._z = Math.atan2(o, c)) : (this._y = Math.atan2(-u, i), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(Lr(d, -1, 1)), Math.abs(d) < .9999999 ? (this._y = Math.atan2(-u, h), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(o, i));
        break;
      case "ZYX":
        this._y = Math.asin(-Lr(u, -1, 1)), Math.abs(u) < .9999999 ? (this._x = Math.atan2(d, h), this._z = Math.atan2(o, i)) : (this._x = 0, this._z = Math.atan2(-a, c));
        break;
      case "YZX":
        this._z = Math.asin(Lr(o, -1, 1)), Math.abs(o) < .9999999 ? (this._x = Math.atan2(-l, c), this._y = Math.atan2(-u, i)) : (this._x = 0, this._y = Math.atan2(s, h));
        break;
      case "XZY":
        this._z = Math.asin(-Lr(a, -1, 1)), Math.abs(a) < .9999999 ? (this._x = Math.atan2(d, c), this._y = Math.atan2(s, i)) : (this._x = Math.atan2(-l, h), this._y = 0);
        break;
      default:
        warn("Euler: .setFromRotationMatrix() encountered an unknown order: " + order);
    }
    return this._order = order, !0 === n && this._onChangeCallback(), this;
  }
  setFromQuaternion(e, t, n) {
    return Qr.makeRotationFromQuaternion(e), this.setFromRotationMatrix(Qr, t, n);
  }
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  reorder(e) {
    return Kr.setFromEuler(this), this.setFromQuaternion(Kr, e);
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
  }
  fromArray(e) {
    return this._x = e[0], this._y = e[1], this._z = e[2], void 0 !== e[3] && (this._order = e[3]), this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
  }
  _onChange(onChangeCallback) {
    return this._onChangeCallback = onChangeCallback, this;
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
Euler.DEFAULT_ORDER = "XYZ";
class Layers {
  constructor() {
    this.mask = 1;
  }
  set(e) {
    this.mask = 1 << e >>> 0;
  }
  enable(e) {
    this.mask |= 1 << e;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(e) {
    this.mask ^= 1 << e;
  }
  disable(e) {
    this.mask &= ~(1 << e);
  }
  disableAll() {
    this.mask = 0;
  }
  test(e) {
    return 0 !== (this.mask & e.mask);
  }
  isEnabled(e) {
    return !!(this.mask & 1 << e);
  }
}
let Jr = 0;
const $r = new Vector3(),
  Zr = new Quaternion(),
  ei = new Matrix4(),
  ti = new Vector3(),
  ni = new Vector3(),
  ri = new Vector3(),
  ii = new Quaternion(),
  ai = new Vector3(1, 0, 0),
  si = new Vector3(0, 1, 0),
  oi = new Vector3(0, 0, 1),
  ci = {
    type: "added"
  },
  li = {
    type: "removed"
  },
  ui = {
    type: "childadded",
    child: null
  },
  di = {
    type: "childremoved",
    child: null
  };
class Object3D extends EventDispatcher {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", {
      value: Jr++
    }), this.uuid = yr(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = Object3D.DEFAULT_UP.clone();
    const e = new Vector3(),
      euler = new Euler(),
      n = new Quaternion(),
      r = new Vector3(1, 1, 1);
    euler._onChange(function () {
      n.setFromEuler(euler, !1);
    }), n._onChange(function () {
      euler.setFromQuaternion(n, void 0, !1);
    }), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: euler
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: n
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: r
      },
      modelViewMatrix: {
        value: new Matrix4()
      },
      normalMatrix: {
        value: new Matrix3()
      }
    }), this.matrix = new Matrix4(), this.matrixWorld = new Matrix4(), this.matrixAutoUpdate = Object3D.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Layers(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = !1, this.userData = {}, this.pivot = null;
  }
  onBeforeShadow() {}
  onAfterShadow() {}
  onBeforeRender() {}
  onAfterRender() {}
  applyMatrix4(e) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(e) {
    return this.quaternion.premultiply(e), this;
  }
  setRotationFromAxisAngle(e, t) {
    this.quaternion.setFromAxisAngle(e, t);
  }
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, !0);
  }
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  rotateOnAxis(e, t) {
    return Zr.setFromAxisAngle(e, t), this.quaternion.multiply(Zr), this;
  }
  rotateOnWorldAxis(e, t) {
    return Zr.setFromAxisAngle(e, t), this.quaternion.premultiply(Zr), this;
  }
  rotateX(e) {
    return this.rotateOnAxis(ai, e);
  }
  rotateY(e) {
    return this.rotateOnAxis(si, e);
  }
  rotateZ(e) {
    return this.rotateOnAxis(oi, e);
  }
  translateOnAxis(e, t) {
    return $r.copy(e).applyQuaternion(this.quaternion), this.position.add($r.multiplyScalar(t)), this;
  }
  translateX(e) {
    return this.translateOnAxis(ai, e);
  }
  translateY(e) {
    return this.translateOnAxis(si, e);
  }
  translateZ(e) {
    return this.translateOnAxis(oi, e);
  }
  localToWorld(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(ei.copy(this.matrixWorld).invert());
  }
  lookAt(e, t, n) {
    e.isVector3 ? ti.copy(e) : ti.set(e, t, n);
    const parent = this.parent;
    this.updateWorldMatrix(!0, !1), ni.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? ei.lookAt(ni, ti, this.up) : ei.lookAt(ti, ni, this.up), this.quaternion.setFromRotationMatrix(ei), parent && (ei.extractRotation(parent.matrixWorld), Zr.setFromRotationMatrix(ei), this.quaternion.premultiply(Zr.invert()));
  }
  add(e) {
    if (arguments.length > 1) {
      for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
      return this;
    }
    return e === this ? (error("Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(ci), ui.child = e, this.dispatchEvent(ui), ui.child = null) : error("Object3D.add: object not an instance of THREE.Object3D.", e), this);
  }
  remove(e) {
    if (arguments.length > 1) {
      for (let e = 0; e < arguments.length; e++) this.remove(arguments[e]);
      return this;
    }
    const t = this.children.indexOf(e);
    return -1 !== t && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(li), di.child = e, this.dispatchEvent(di), di.child = null), this;
  }
  removeFromParent() {
    const parent = this.parent;
    return null !== parent && parent.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(e) {
    return this.updateWorldMatrix(!0, !1), ei.copy(this.matrixWorld).invert(), null !== e.parent && (e.parent.updateWorldMatrix(!0, !1), ei.multiply(e.parent.matrixWorld)), e.applyMatrix4(ei), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(ci), ui.child = e, this.dispatchEvent(ui), ui.child = null, this;
  }
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  getObjectByProperty(e, t) {
    if (this[e] === t) return this;
    for (let n = 0, r = this.children.length; n < r; n++) {
      const r = this.children[n].getObjectByProperty(e, t);
      if (void 0 !== r) return r;
    }
  }
  getObjectsByProperty(e, t, n = []) {
    this[e] === t && n.push(this);
    const children = this.children;
    for (let i = 0, a = children.length; i < a; i++) children[i].getObjectsByProperty(e, t, n);
    return n;
  }
  getWorldPosition(e) {
    return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(ni, e, ri), e;
  }
  getWorldScale(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(ni, ii, e), e;
  }
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const t = this.matrixWorld.elements;
    return e.set(t[8], t[9], t[10]).normalize();
  }
  raycast() {}
  traverse(e) {
    e(this);
    const children = this.children;
    for (let n = 0, r = children.length; n < r; n++) children[n].traverse(e);
  }
  traverseVisible(e) {
    if (!1 === this.visible) return;
    e(this);
    const children = this.children;
    for (let n = 0, r = children.length; n < r; n++) children[n].traverseVisible(e);
  }
  traverseAncestors(e) {
    const parent = this.parent;
    null !== parent && (e(parent), parent.traverseAncestors(e));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    const pivot = this.pivot;
    if (null !== pivot) {
      const t = pivot.x,
        n = pivot.y,
        r = pivot.z,
        i = this.matrix.elements;
      i[12] += t - i[0] * t - i[4] * n - i[8] * r, i[13] += n - i[1] * t - i[5] * n - i[9] * r, i[14] += r - i[2] * t - i[6] * n - i[10] * r;
    }
    this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(e) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (!0 === this.matrixWorldAutoUpdate && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, e = !0);
    const children = this.children;
    for (let n = 0, r = children.length; n < r; n++) {
      children[n].updateMatrixWorld(e);
    }
  }
  updateWorldMatrix(e, t, n = !1) {
    const parent = this.parent;
    if (!0 === e && null !== parent && parent.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || n) && (!0 === this.matrixWorldAutoUpdate && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, n = !0), !0 === t) {
      const children = this.children;
      for (let t = 0, r = children.length; t < r; t++) {
        children[t].updateWorldMatrix(!1, !0, n);
      }
    }
  }
  toJSON(e) {
    const t = void 0 === e || "string" == typeof e,
      n = {};
    t && (e = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, n.metadata = {
      version: 4.7,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const r = {};
    function i(t, n) {
      return void 0 === t[n.uuid] && (t[n.uuid] = n.toJSON(e)), n.uuid;
    }
    if (r.uuid = this.uuid, r.type = this.type, "" !== this.name && (r.name = this.name), !0 === this.castShadow && (r.castShadow = !0), !0 === this.receiveShadow && (r.receiveShadow = !0), !1 === this.visible && (r.visible = !1), !1 === this.frustumCulled && (r.frustumCulled = !1), 0 !== this.renderOrder && (r.renderOrder = this.renderOrder), !1 !== this.static && (r.static = this.static), Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), null !== this.pivot && (r.pivot = this.pivot.toArray()), !1 === this.matrixAutoUpdate && (r.matrixAutoUpdate = !1), void 0 !== this.morphTargetDictionary && (r.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)), void 0 !== this.morphTargetInfluences && (r.morphTargetInfluences = this.morphTargetInfluences.slice()), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), null !== this.instanceColor && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.geometryInfo = this._geometryInfo.map(e => ({
      ...e,
      boundingBox: e.boundingBox ? e.boundingBox.toJSON() : void 0,
      boundingSphere: e.boundingSphere ? e.boundingSphere.toJSON() : void 0
    })), r.instanceInfo = this._instanceInfo.map(e => ({
      ...e
    })), r.availableInstanceIds = this._availableInstanceIds.slice(), r.availableGeometryIds = this._availableGeometryIds.slice(), r.nextIndexStart = this._nextIndexStart, r.nextVertexStart = this._nextVertexStart, r.geometryCount = this._geometryCount, r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.matricesTexture = this._matricesTexture.toJSON(e), r.indirectTexture = this._indirectTexture.toJSON(e), null !== this._colorsTexture && (r.colorsTexture = this._colorsTexture.toJSON(e)), null !== this.boundingSphere && (r.boundingSphere = this.boundingSphere.toJSON()), null !== this.boundingBox && (r.boundingBox = this.boundingBox.toJSON())), this.isScene) this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && !0 !== this.environment.isRenderTargetTexture && (r.environment = this.environment.toJSON(e).uuid);else if (this.isMesh || this.isLine || this.isPoints) {
      r.geometry = i(e.geometries, this.geometry);
      const t = this.geometry.parameters;
      if (void 0 !== t && void 0 !== t.shapes) {
        const n = t.shapes;
        if (Array.isArray(n)) for (let t = 0, r = n.length; t < r; t++) {
          const r = n[t];
          i(e.shapes, r);
        } else i(e.shapes, n);
      }
    }
    if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), void 0 !== this.skeleton && (i(e.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), void 0 !== this.material) if (Array.isArray(this.material)) {
      const t = [];
      for (let n = 0, r = this.material.length; n < r; n++) t.push(i(e.materials, this.material[n]));
      r.material = t;
    } else r.material = i(e.materials, this.material);
    if (this.children.length > 0) {
      r.children = [];
      for (let t = 0; t < this.children.length; t++) r.children.push(this.children[t].toJSON(e).object);
    }
    if (this.animations.length > 0) {
      r.animations = [];
      for (let t = 0; t < this.animations.length; t++) {
        const n = this.animations[t];
        r.animations.push(i(e.animations, n));
      }
    }
    if (t) {
      const t = a(e.geometries),
        r = a(e.materials),
        i = a(e.textures),
        s = a(e.images),
        o = a(e.shapes),
        c = a(e.skeletons),
        l = a(e.animations),
        u = a(e.nodes);
      t.length > 0 && (n.geometries = t), r.length > 0 && (n.materials = r), i.length > 0 && (n.textures = i), s.length > 0 && (n.images = s), o.length > 0 && (n.shapes = o), c.length > 0 && (n.skeletons = c), l.length > 0 && (n.animations = l), u.length > 0 && (n.nodes = u);
    }
    return n.object = r, n;
    function a(e) {
      const t = [];
      for (const n in e) {
        const r = e[n];
        delete r.metadata, t.push(r);
      }
      return t;
    }
  }
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  copy(e, t = !0) {
    if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.pivot = null !== e.pivot ? e.pivot.clone() : null, this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.static = e.static, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), !0 === t) for (let t = 0; t < e.children.length; t++) {
      const n = e.children[t];
      this.add(n.clone());
    }
    return this;
  }
}
Object3D.DEFAULT_UP = new Vector3(0, 1, 0), Object3D.DEFAULT_MATRIX_AUTO_UPDATE = !0, Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
class Group extends Object3D {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const hi = {
  type: "move"
};
class WebXRController {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return null === this._hand && (this._hand = new Group(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = {
      pinching: !1
    }), this._hand;
  }
  getTargetRaySpace() {
    return null === this._targetRay && (this._targetRay = new Group(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new Vector3(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new Vector3()), this._targetRay;
  }
  getGripSpace() {
    return null === this._grip && (this._grip = new Group(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new Vector3(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new Vector3(), this._grip.eventsEnabled = !1), this._grip;
  }
  dispatchEvent(e) {
    return null !== this._targetRay && this._targetRay.dispatchEvent(e), null !== this._grip && this._grip.dispatchEvent(e), null !== this._hand && this._hand.dispatchEvent(e), this;
  }
  connect(e) {
    if (e && e.hand) {
      const hand = this._hand;
      if (hand) for (const n of e.hand.values()) this._getHandJoint(hand, n);
    }
    return this.dispatchEvent({
      type: "connected",
      data: e
    }), this;
  }
  disconnect(e) {
    return this.dispatchEvent({
      type: "disconnected",
      data: e
    }), null !== this._targetRay && (this._targetRay.visible = !1), null !== this._grip && (this._grip.visible = !1), null !== this._hand && (this._hand.visible = !1), this;
  }
  update(e, t, n) {
    let r = null,
      i = null,
      a = null;
    const targetRay = this._targetRay,
      grip = this._grip,
      hand = this._hand;
    if (e && "visible-blurred" !== t.session.visibilityState) {
      if (hand && e.hand) {
        a = !0;
        for (const r of e.hand.values()) {
          const e = t.getJointPose(r, n),
            i = this._getHandJoint(hand, r);
          null !== e && (i.matrix.fromArray(e.transform.matrix), i.matrix.decompose(i.position, i.rotation, i.scale), i.matrixWorldNeedsUpdate = !0, i.jointRadius = e.radius), i.visible = null !== e;
        }
        const r = hand.joints["index-finger-tip"],
          i = hand.joints["thumb-tip"],
          s = r.position.distanceTo(i.position),
          o = .02,
          l = .005;
        hand.inputState.pinching && s > o + l ? (hand.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !hand.inputState.pinching && s <= o - l && (hand.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else null !== grip && e.gripSpace && (i = t.getPose(e.gripSpace, n), null !== i && (grip.matrix.fromArray(i.transform.matrix), grip.matrix.decompose(grip.position, grip.rotation, grip.scale), grip.matrixWorldNeedsUpdate = !0, i.linearVelocity ? (grip.hasLinearVelocity = !0, grip.linearVelocity.copy(i.linearVelocity)) : grip.hasLinearVelocity = !1, i.angularVelocity ? (grip.hasAngularVelocity = !0, grip.angularVelocity.copy(i.angularVelocity)) : grip.hasAngularVelocity = !1, grip.eventsEnabled && grip.dispatchEvent({
        type: "gripUpdated",
        data: e,
        target: this
      })));
      null !== targetRay && (r = t.getPose(e.targetRaySpace, n), null === r && null !== i && (r = i), null !== r && (targetRay.matrix.fromArray(r.transform.matrix), targetRay.matrix.decompose(targetRay.position, targetRay.rotation, targetRay.scale), targetRay.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (targetRay.hasLinearVelocity = !0, targetRay.linearVelocity.copy(r.linearVelocity)) : targetRay.hasLinearVelocity = !1, r.angularVelocity ? (targetRay.hasAngularVelocity = !0, targetRay.angularVelocity.copy(r.angularVelocity)) : targetRay.hasAngularVelocity = !1, this.dispatchEvent(hi)));
    }
    return null !== targetRay && (targetRay.visible = null !== r), null !== grip && (grip.visible = null !== i), null !== hand && (hand.visible = null !== a), this;
  }
  _getHandJoint(e, t) {
    if (void 0 === e.joints[t.jointName]) {
      const group = new Group();
      group.matrixAutoUpdate = !1, group.visible = !1, e.joints[t.jointName] = group, e.add(group);
    }
    return e.joints[t.jointName];
  }
}
const pi = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  },
  fi = {
    h: 0,
    s: 0,
    l: 0
  },
  mi = {
    h: 0,
    s: 0,
    l: 0
  };
function Mi(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + 6 * (t - e) * n : n < .5 ? t : n < 2 / 3 ? e + 6 * (t - e) * (2 / 3 - n) : e;
}
class Color {
  constructor(e, t, n) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, n);
  }
  set(e, t, n) {
    if (void 0 === t && void 0 === n) {
      const t = e;
      t && t.isColor ? this.copy(t) : "number" == typeof t ? this.setHex(t) : "string" == typeof t && this.setStyle(t);
    } else this.setRGB(e, t, n);
    return this;
  }
  setScalar(e) {
    return this.r = e, this.g = e, this.b = e, this;
  }
  setHex(e, t = SRGBColorSpace) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (255 & e) / 255, ColorManagement.colorSpaceToWorking(this, t), this;
  }
  setRGB(e, t, n, r = ColorManagement.workingColorSpace) {
    return this.r = e, this.g = t, this.b = n, ColorManagement.colorSpaceToWorking(this, r), this;
  }
  setHSL(e, t, n, r = ColorManagement.workingColorSpace) {
    if (e = vr(e, 1), t = Lr(t, 0, 1), n = Lr(n, 0, 1), 0 === t) this.r = this.g = this.b = n;else {
      const r = n <= .5 ? n * (1 + t) : n + t - n * t,
        i = 2 * n - r;
      this.r = Mi(i, r, e + 1 / 3), this.g = Mi(i, r, e), this.b = Mi(i, r, e - 1 / 3);
    }
    return ColorManagement.colorSpaceToWorking(this, r), this;
  }
  setStyle(e, t = SRGBColorSpace) {
    function n(t) {
      void 0 !== t && parseFloat(t) < 1 && warn("Color: Alpha component of " + e + " will be ignored.");
    }
    let r;
    if (r = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let i;
      const a = r[1],
        s = r[2];
      switch (a) {
        case "rgb":
        case "rgba":
          if (i = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s)) return n(i[4]), this.setRGB(Math.min(255, parseInt(i[1], 10)) / 255, Math.min(255, parseInt(i[2], 10)) / 255, Math.min(255, parseInt(i[3], 10)) / 255, t);
          if (i = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s)) return n(i[4]), this.setRGB(Math.min(100, parseInt(i[1], 10)) / 100, Math.min(100, parseInt(i[2], 10)) / 100, Math.min(100, parseInt(i[3], 10)) / 100, t);
          break;
        case "hsl":
        case "hsla":
          if (i = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s)) return n(i[4]), this.setHSL(parseFloat(i[1]) / 360, parseFloat(i[2]) / 100, parseFloat(i[3]) / 100, t);
          break;
        default:
          warn("Color: Unknown color model " + e);
      }
    } else if (r = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const n = r[1],
        i = n.length;
      if (3 === i) return this.setRGB(parseInt(n.charAt(0), 16) / 15, parseInt(n.charAt(1), 16) / 15, parseInt(n.charAt(2), 16) / 15, t);
      if (6 === i) return this.setHex(parseInt(n, 16), t);
      warn("Color: Invalid hex color " + e);
    } else if (e && e.length > 0) return this.setColorName(e, t);
    return this;
  }
  setColorName(e, t = SRGBColorSpace) {
    const n = pi[e.toLowerCase()];
    return void 0 !== n ? this.setHex(n, t) : warn("Color: Unknown color " + e), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  copySRGBToLinear(e) {
    return this.r = Ir(e.r), this.g = Ir(e.g), this.b = Ir(e.b), this;
  }
  copyLinearToSRGB(e) {
    return this.r = Rr(e.r), this.g = Rr(e.g), this.b = Rr(e.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(e = SRGBColorSpace) {
    return ColorManagement.workingToColorSpace(color.copy(this), e), 65536 * Math.round(Lr(255 * color.r, 0, 255)) + 256 * Math.round(Lr(255 * color.g, 0, 255)) + Math.round(Lr(255 * color.b, 0, 255));
  }
  getHexString(e = SRGBColorSpace) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = ColorManagement.workingColorSpace) {
    ColorManagement.workingToColorSpace(color.copy(this), t);
    const n = color.r,
      r = color.g,
      i = color.b,
      a = Math.max(n, r, i),
      s = Math.min(n, r, i);
    let o, c;
    const l = (s + a) / 2;
    if (s === a) o = 0, c = 0;else {
      const e = a - s;
      switch (c = l <= .5 ? e / (a + s) : e / (2 - a - s), a) {
        case n:
          o = (r - i) / e + (r < i ? 6 : 0);
          break;
        case r:
          o = (i - n) / e + 2;
          break;
        case i:
          o = (n - r) / e + 4;
      }
      o /= 6;
    }
    return e.h = o, e.s = c, e.l = l, e;
  }
  getRGB(e, t = ColorManagement.workingColorSpace) {
    return ColorManagement.workingToColorSpace(color.copy(this), t), e.r = color.r, e.g = color.g, e.b = color.b, e;
  }
  getStyle(e = SRGBColorSpace) {
    ColorManagement.workingToColorSpace(color.copy(this), e);
    const t = color.r,
      n = color.g,
      r = color.b;
    return e !== SRGBColorSpace ? `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})` : `rgb(${Math.round(255 * t)},${Math.round(255 * n)},${Math.round(255 * r)})`;
  }
  offsetHSL(e, t, n) {
    return this.getHSL(fi), this.setHSL(fi.h + e, fi.s + t, fi.l + n);
  }
  add(e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this;
  }
  addColors(e, t) {
    return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
  }
  addScalar(e) {
    return this.r += e, this.g += e, this.b += e, this;
  }
  sub(e) {
    return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
  }
  multiply(e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
  }
  multiplyScalar(e) {
    return this.r *= e, this.g *= e, this.b *= e, this;
  }
  lerp(e, t) {
    return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
  }
  lerpColors(e, t, n) {
    return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this;
  }
  lerpHSL(e, t) {
    this.getHSL(fi), e.getHSL(mi);
    const n = Tr(fi.h, mi.h, t),
      r = Tr(fi.s, mi.s, t),
      i = Tr(fi.l, mi.l, t);
    return this.setHSL(n, r, i), this;
  }
  setFromVector3(e) {
    return this.r = e.x, this.g = e.y, this.b = e.z, this;
  }
  applyMatrix3(e) {
    const t = this.r,
      n = this.g,
      r = this.b,
      i = e.elements;
    return this.r = i[0] * t + i[3] * n + i[6] * r, this.g = i[1] * t + i[4] * n + i[7] * r, this.b = i[2] * t + i[5] * n + i[8] * r, this;
  }
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  fromArray(e, t = 0) {
    return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
  }
  fromBufferAttribute(e, t) {
    return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const color = new Color();
Color.NAMES = pi;
class FogExp2 {
  constructor(e, density = 25e-5) {
    this.isFogExp2 = !0, this.name = "", this.color = new Color(e), this.density = density;
  }
  clone() {
    return new FogExp2(this.color, this.density);
  }
  toJSON() {
    return {
      type: "FogExp2",
      name: this.name,
      color: this.color.getHex(),
      density: this.density
    };
  }
}
class Fog {
  constructor(e, near = 1, far = 1e3) {
    this.isFog = !0, this.name = "", this.color = new Color(e), this.near = near, this.far = far;
  }
  clone() {
    return new Fog(this.color, this.near, this.far);
  }
  toJSON() {
    return {
      type: "Fog",
      name: this.name,
      color: this.color.getHex(),
      near: this.near,
      far: this.far
    };
  }
}
class Scene extends Object3D {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new Euler(), this.environmentIntensity = 1, this.environmentRotation = new Euler(), this.overrideMaterial = null, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
      detail: this
    }));
  }
  copy(e, t) {
    return super.copy(e, t), null !== e.background && (this.background = e.background.clone()), null !== e.environment && (this.environment = e.environment.clone()), null !== e.fog && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), null !== e.overrideMaterial && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return null !== this.fog && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), 1 !== this.backgroundIntensity && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), 1 !== this.environmentIntensity && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t;
  }
}
const Ai = new Vector3(),
  gi = new Vector3(),
  bi = new Vector3(),
  yi = new Vector3(),
  Li = new Vector3(),
  vi = new Vector3(),
  Ti = new Vector3(),
  Si = new Vector3(),
  wi = new Vector3(),
  Ei = new Vector3(),
  vector4 = new Vector4(),
  zi = new Vector4(),
  Oi = new Vector4();
class Triangle {
  constructor(e = new Vector3(), t = new Vector3(), n = new Vector3()) {
    this.a = e, this.b = t, this.c = n;
  }
  static getNormal(e, t, n, r) {
    r.subVectors(n, t), Ai.subVectors(e, t), r.cross(Ai);
    const i = r.lengthSq();
    return i > 0 ? r.multiplyScalar(1 / Math.sqrt(i)) : r.set(0, 0, 0);
  }
  static getBarycoord(e, t, n, r, i) {
    Ai.subVectors(r, t), gi.subVectors(n, t), bi.subVectors(e, t);
    const a = Ai.dot(Ai),
      s = Ai.dot(gi),
      o = Ai.dot(bi),
      c = gi.dot(gi),
      l = gi.dot(bi),
      u = a * c - s * s;
    if (0 === u) return i.set(0, 0, 0), null;
    const d = 1 / u,
      h = (c * o - s * l) * d,
      p = (a * l - s * o) * d;
    return i.set(1 - h - p, p, h);
  }
  static containsPoint(e, t, n, r) {
    return null !== this.getBarycoord(e, t, n, r, yi) && yi.x >= 0 && yi.y >= 0 && yi.x + yi.y <= 1;
  }
  static getInterpolation(e, t, n, r, i, a, s, o) {
    return null === this.getBarycoord(e, t, n, r, yi) ? (o.x = 0, o.y = 0, "z" in o && (o.z = 0), "w" in o && (o.w = 0), null) : (o.setScalar(0), o.addScaledVector(i, yi.x), o.addScaledVector(a, yi.y), o.addScaledVector(s, yi.z), o);
  }
  static getInterpolatedAttribute(e, t, n, r, i, a) {
    return vector4.setScalar(0), zi.setScalar(0), Oi.setScalar(0), vector4.fromBufferAttribute(e, t), zi.fromBufferAttribute(e, n), Oi.fromBufferAttribute(e, r), a.setScalar(0), a.addScaledVector(vector4, i.x), a.addScaledVector(zi, i.y), a.addScaledVector(Oi, i.z), a;
  }
  static isFrontFacing(e, t, n, r) {
    return Ai.subVectors(n, t), gi.subVectors(e, t), Ai.cross(gi).dot(r) < 0;
  }
  set(e, t, n) {
    return this.a.copy(e), this.b.copy(t), this.c.copy(n), this;
  }
  setFromPointsAndIndices(e, t, n, r) {
    return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[r]), this;
  }
  setFromAttributeAndIndices(e, t, n, r) {
    return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, n), this.c.fromBufferAttribute(e, r), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
  }
  getArea() {
    return Ai.subVectors(this.c, this.b), gi.subVectors(this.a, this.b), .5 * Ai.cross(gi).length();
  }
  getMidpoint(e) {
    return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(e) {
    return Triangle.getNormal(this.a, this.b, this.c, e);
  }
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(e, t) {
    return Triangle.getBarycoord(e, this.a, this.b, this.c, t);
  }
  getInterpolation(e, t, n, r, i) {
    return Triangle.getInterpolation(e, this.a, this.b, this.c, t, n, r, i);
  }
  containsPoint(e) {
    return Triangle.containsPoint(e, this.a, this.b, this.c);
  }
  isFrontFacing(e) {
    return Triangle.isFrontFacing(this.a, this.b, this.c, e);
  }
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  closestPointToPoint(e, t) {
    const n = this.a,
      r = this.b,
      i = this.c;
    let a, s;
    Li.subVectors(r, n), vi.subVectors(i, n), Si.subVectors(e, n);
    const o = Li.dot(Si),
      c = vi.dot(Si);
    if (o <= 0 && c <= 0) return t.copy(n);
    wi.subVectors(e, r);
    const l = Li.dot(wi),
      u = vi.dot(wi);
    if (l >= 0 && u <= l) return t.copy(r);
    const d = o * u - l * c;
    if (d <= 0 && o >= 0 && l <= 0) return a = o / (o - l), t.copy(n).addScaledVector(Li, a);
    Ei.subVectors(e, i);
    const h = Li.dot(Ei),
      p = vi.dot(Ei);
    if (p >= 0 && h <= p) return t.copy(i);
    const f = h * c - o * p;
    if (f <= 0 && c >= 0 && p <= 0) return s = c / (c - p), t.copy(n).addScaledVector(vi, s);
    const m = l * p - h * u;
    if (m <= 0 && u - l >= 0 && h - p >= 0) return Ti.subVectors(i, r), s = (u - l) / (u - l + (h - p)), t.copy(r).addScaledVector(Ti, s);
    const M = 1 / (m + f + d);
    return a = f * M, s = d * M, t.copy(n).addScaledVector(Li, a).addScaledVector(vi, s);
  }
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
class Box3 {
  constructor(min = new Vector3(1 / 0, 1 / 0, 1 / 0), max = new Vector3(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = min, this.max = max;
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t += 3) this.expandByPoint(Di.fromArray(e, t));
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, n = e.count; t < n; t++) this.expandByPoint(Di.fromBufferAttribute(e, t));
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t++) this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    const n = Di.copy(t).multiplyScalar(.5);
    return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
  }
  setFromObject(e, t = !1) {
    return this.makeEmpty(), this.expandByObject(e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  expandByObject(e, t = !1) {
    e.updateWorldMatrix(!1, !1);
    const n = e.geometry;
    if (void 0 !== n) {
      const r = n.getAttribute("position");
      if (!0 === t && void 0 !== r && !0 !== e.isInstancedMesh) for (let t = 0, n = r.count; t < n; t++) !0 === e.isMesh ? e.getVertexPosition(t, Di) : Di.fromBufferAttribute(r, t), Di.applyMatrix4(e.matrixWorld), this.expandByPoint(Di);else void 0 !== e.boundingBox ? (null === e.boundingBox && e.computeBoundingBox(), box3.copy(e.boundingBox)) : (null === n.boundingBox && n.computeBoundingBox(), box3.copy(n.boundingBox)), box3.applyMatrix4(e.matrixWorld), this.union(box3);
    }
    const r = e.children;
    for (let e = 0, n = r.length; e < n; e++) this.expandByObject(r[e], t);
    return this;
  }
  containsPoint(e) {
    return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
  }
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
  }
  getParameter(e, t) {
    return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z));
  }
  intersectsBox(e) {
    return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
  }
  intersectsSphere(e) {
    return this.clampPoint(e.center, Di), Di.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  intersectsPlane(e) {
    let t, n;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
  }
  intersectsTriangle(e) {
    if (this.isEmpty()) return !1;
    this.getCenter(Fi), qi.subVectors(this.max, Fi), Ii.subVectors(e.a, Fi), Ri.subVectors(e.b, Fi), ki.subVectors(e.c, Fi), Pi.subVectors(Ri, Ii), Yi.subVectors(ki, Ri), Wi.subVectors(Ii, ki);
    let t = [0, -Pi.z, Pi.y, 0, -Yi.z, Yi.y, 0, -Wi.z, Wi.y, Pi.z, 0, -Pi.x, Yi.z, 0, -Yi.x, Wi.z, 0, -Wi.x, -Pi.y, Pi.x, 0, -Yi.y, Yi.x, 0, -Wi.y, Wi.x, 0];
    return !!Gi(t, Ii, Ri, ki, qi) && (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !!Gi(t, Ii, Ri, ki, qi) && (Hi.crossVectors(Pi, Yi), t = [Hi.x, Hi.y, Hi.z], Gi(t, Ii, Ri, ki, qi)));
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, Di).distanceTo(e);
  }
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = .5 * this.getSize(Di).length()), e;
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  applyMatrix4(e) {
    return this.isEmpty() || (Bi[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), Bi[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), Bi[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), Bi[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), Bi[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), Bi[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), Bi[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), Bi[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(Bi)), this;
  }
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
  toJSON() {
    return {
      min: this.min.toArray(),
      max: this.max.toArray()
    };
  }
  fromJSON(e) {
    return this.min.fromArray(e.min), this.max.fromArray(e.max), this;
  }
}
const Bi = [new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3()],
  Di = new Vector3(),
  box3 = new Box3(),
  Ii = new Vector3(),
  Ri = new Vector3(),
  ki = new Vector3(),
  Pi = new Vector3(),
  Yi = new Vector3(),
  Wi = new Vector3(),
  Fi = new Vector3(),
  qi = new Vector3(),
  Hi = new Vector3(),
  Ui = new Vector3();
function Gi(e, t, n, r, i) {
  for (let a = 0, s = e.length - 3; a <= s; a += 3) {
    Ui.fromArray(e, a);
    const s = i.x * Math.abs(Ui.x) + i.y * Math.abs(Ui.y) + i.z * Math.abs(Ui.z),
      o = t.dot(Ui),
      c = n.dot(Ui),
      l = r.dot(Ui);
    if (Math.max(-Math.max(o, c, l), Math.min(o, c, l)) > s) return !1;
  }
  return !0;
}
const Xi = ji();
function ji() {
  const arrayBuffer = new ArrayBuffer(4),
    float32Array = new Float32Array(arrayBuffer),
    uint32Array = new Uint32Array(arrayBuffer),
    r = new Uint32Array(512),
    i = new Uint32Array(512);
  for (let e = 0; e < 256; ++e) {
    const t = e - 127;
    t < -27 ? (r[e] = 0, r[256 | e] = 32768, i[e] = 24, i[256 | e] = 24) : t < -14 ? (r[e] = 1024 >> -t - 14, r[256 | e] = 1024 >> -t - 14 | 32768, i[e] = -t - 1, i[256 | e] = -t - 1) : t <= 15 ? (r[e] = t + 15 << 10, r[256 | e] = t + 15 << 10 | 32768, i[e] = 13, i[256 | e] = 13) : t < 128 ? (r[e] = 31744, r[256 | e] = 64512, i[e] = 24, i[256 | e] = 24) : (r[e] = 31744, r[256 | e] = 64512, i[e] = 13, i[256 | e] = 13);
  }
  const a = new Uint32Array(2048),
    s = new Uint32Array(64),
    o = new Uint32Array(64);
  for (let e = 1; e < 1024; ++e) {
    let t = e << 13,
      n = 0;
    for (; !(8388608 & t);) t <<= 1, n -= 8388608;
    t &= -8388609, n += 947912704, a[e] = t | n;
  }
  for (let e = 1024; e < 2048; ++e) a[e] = 939524096 + (e - 1024 << 13);
  for (let e = 1; e < 31; ++e) s[e] = e << 23;
  s[31] = 1199570944, s[32] = 2147483648;
  for (let e = 33; e < 63; ++e) s[e] = 2147483648 + (e - 32 << 23);
  s[63] = 3347054592;
  for (let e = 1; e < 64; ++e) 32 !== e && (o[e] = 1024);
  return {
    floatView: float32Array,
    uint32View: uint32Array,
    baseTable: r,
    shiftTable: i,
    mantissaTable: a,
    exponentTable: s,
    offsetTable: o
  };
}
function Vi(e) {
  Math.abs(e) > 65504 && warn("DataUtils.toHalfFloat(): Value out of range."), e = Lr(e, -65504, 65504), Xi.floatView[0] = e;
  const t = Xi.uint32View[0],
    n = t >> 23 & 511;
  return Xi.baseTable[n] + ((8388607 & t) >> Xi.shiftTable[n]);
}
function Qi(e) {
  const t = e >> 10;
  return Xi.uint32View[0] = Xi.mantissaTable[Xi.offsetTable[t] + (1023 & e)] + Xi.exponentTable[t], Xi.floatView[0];
}
class DataUtils {
  static toHalfFloat(e) {
    return Vi(e);
  }
  static fromHalfFloat(e) {
    return Qi(e);
  }
}
const Ki = new Vector3(),
  vector2 = new Vector2();
let $i = 0;
class BufferAttribute extends EventDispatcher {
  constructor(array, itemSize, normalized = !1) {
    if (super(), Array.isArray(array)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, Object.defineProperty(this, "id", {
      value: $i++
    }), this.name = "", this.array = array, this.itemSize = itemSize, this.count = void 0 !== array ? array.length / itemSize : 0, this.normalized = normalized, this.usage = kn, this.updateRanges = [], this.gpuType = ke, this.version = 0;
  }
  onUploadCallback() {}
  set needsUpdate(e) {
    !0 === e && this.version++;
  }
  setUsage(usage) {
    return this.usage = usage, this;
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({
      start: e,
      count: t
    });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
  }
  copyAt(e, t, n) {
    e *= this.itemSize, n *= t.itemSize;
    for (let r = 0, itemSize = this.itemSize; r < itemSize; r++) this.array[e + r] = t.array[n + r];
    return this;
  }
  copyArray(e) {
    return this.array.set(e), this;
  }
  applyMatrix3(e) {
    if (2 === this.itemSize) for (let t = 0, count = this.count; t < count; t++) vector2.fromBufferAttribute(this, t), vector2.applyMatrix3(e), this.setXY(t, vector2.x, vector2.y);else if (3 === this.itemSize) for (let t = 0, count = this.count; t < count; t++) Ki.fromBufferAttribute(this, t), Ki.applyMatrix3(e), this.setXYZ(t, Ki.x, Ki.y, Ki.z);
    return this;
  }
  applyMatrix4(e) {
    for (let t = 0, count = this.count; t < count; t++) Ki.fromBufferAttribute(this, t), Ki.applyMatrix4(e), this.setXYZ(t, Ki.x, Ki.y, Ki.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, count = this.count; t < count; t++) Ki.fromBufferAttribute(this, t), Ki.applyNormalMatrix(e), this.setXYZ(t, Ki.x, Ki.y, Ki.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, count = this.count; t < count; t++) Ki.fromBufferAttribute(this, t), Ki.transformDirection(e), this.setXYZ(t, Ki.x, Ki.y, Ki.z);
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  getComponent(e, t) {
    let n = this.array[e * this.itemSize + t];
    return this.normalized && (n = Sr(n, this.array)), n;
  }
  setComponent(e, t, n) {
    return this.normalized && (n = wr(n, this.array)), this.array[e * this.itemSize + t] = n, this;
  }
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = Sr(t, this.array)), t;
  }
  setX(e, t) {
    return this.normalized && (t = wr(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = Sr(t, this.array)), t;
  }
  setY(e, t) {
    return this.normalized && (t = wr(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = Sr(t, this.array)), t;
  }
  setZ(e, t) {
    return this.normalized && (t = wr(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = Sr(t, this.array)), t;
  }
  setW(e, t) {
    return this.normalized && (t = wr(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  setXY(e, t, n) {
    return e *= this.itemSize, this.normalized && (t = wr(t, this.array), n = wr(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this;
  }
  setXYZ(e, t, n, r) {
    return e *= this.itemSize, this.normalized && (t = wr(t, this.array), n = wr(n, this.array), r = wr(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this;
  }
  setXYZW(e, t, n, r, i) {
    return e *= this.itemSize, this.normalized && (t = wr(t, this.array), n = wr(n, this.array), r = wr(r, this.array), i = wr(i, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this.array[e + 3] = i, this;
  }
  onUpload(onUploadCallback) {
    return this.onUploadCallback = onUploadCallback, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return "" !== this.name && (e.name = this.name), this.usage !== kn && (e.usage = this.usage), e;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
}
class Int8BufferAttribute extends BufferAttribute {
  constructor(e, t, n) {
    super(new Int8Array(e), t, n);
  }
}
class Uint8BufferAttribute extends BufferAttribute {
  constructor(e, t, n) {
    super(new Uint8Array(e), t, n);
  }
}
class Uint8ClampedBufferAttribute extends BufferAttribute {
  constructor(e, t, n) {
    super(new Uint8ClampedArray(e), t, n);
  }
}
class Int16BufferAttribute extends BufferAttribute {
  constructor(e, t, n) {
    super(new Int16Array(e), t, n);
  }
}
class Uint16BufferAttribute extends BufferAttribute {
  constructor(e, t, n) {
    super(new Uint16Array(e), t, n);
  }
}
class Int32BufferAttribute extends BufferAttribute {
  constructor(e, t, n) {
    super(new Int32Array(e), t, n);
  }
}
class Uint32BufferAttribute extends BufferAttribute {
  constructor(e, t, n) {
    super(new Uint32Array(e), t, n);
  }
}
class Float16BufferAttribute extends BufferAttribute {
  constructor(e, t, n) {
    super(new Uint16Array(e), t, n), this.isFloat16BufferAttribute = !0;
  }
  getX(e) {
    let t = Qi(this.array[e * this.itemSize]);
    return this.normalized && (t = Sr(t, this.array)), t;
  }
  setX(e, t) {
    return this.normalized && (t = wr(t, this.array)), this.array[e * this.itemSize] = Vi(t), this;
  }
  getY(e) {
    let t = Qi(this.array[e * this.itemSize + 1]);
    return this.normalized && (t = Sr(t, this.array)), t;
  }
  setY(e, t) {
    return this.normalized && (t = wr(t, this.array)), this.array[e * this.itemSize + 1] = Vi(t), this;
  }
  getZ(e) {
    let t = Qi(this.array[e * this.itemSize + 2]);
    return this.normalized && (t = Sr(t, this.array)), t;
  }
  setZ(e, t) {
    return this.normalized && (t = wr(t, this.array)), this.array[e * this.itemSize + 2] = Vi(t), this;
  }
  getW(e) {
    let t = Qi(this.array[e * this.itemSize + 3]);
    return this.normalized && (t = Sr(t, this.array)), t;
  }
  setW(e, t) {
    return this.normalized && (t = wr(t, this.array)), this.array[e * this.itemSize + 3] = Vi(t), this;
  }
  setXY(e, t, n) {
    return e *= this.itemSize, this.normalized && (t = wr(t, this.array), n = wr(n, this.array)), this.array[e + 0] = Vi(t), this.array[e + 1] = Vi(n), this;
  }
  setXYZ(e, t, n, r) {
    return e *= this.itemSize, this.normalized && (t = wr(t, this.array), n = wr(n, this.array), r = wr(r, this.array)), this.array[e + 0] = Vi(t), this.array[e + 1] = Vi(n), this.array[e + 2] = Vi(r), this;
  }
  setXYZW(e, t, n, r, i) {
    return e *= this.itemSize, this.normalized && (t = wr(t, this.array), n = wr(n, this.array), r = wr(r, this.array), i = wr(i, this.array)), this.array[e + 0] = Vi(t), this.array[e + 1] = Vi(n), this.array[e + 2] = Vi(r), this.array[e + 3] = Vi(i), this;
  }
}
class Float32BufferAttribute extends BufferAttribute {
  constructor(e, t, n) {
    super(new Float32Array(e), t, n);
  }
}
const Zi = new Box3(),
  ea = new Vector3(),
  ta = new Vector3();
class Sphere {
  constructor(center = new Vector3(), radius = -1) {
    this.isSphere = !0, this.center = center, this.radius = radius;
  }
  set(e, radius) {
    return this.center.copy(e), this.radius = radius, this;
  }
  setFromPoints(e, t) {
    const center = this.center;
    void 0 !== t ? center.copy(t) : Zi.setFromPoints(e).getCenter(center);
    let r = 0;
    for (let t = 0, i = e.length; t < i; t++) r = Math.max(r, center.distanceToSquared(e[t]));
    return this.radius = Math.sqrt(r), this;
  }
  copy(e) {
    return this.center.copy(e.center), this.radius = e.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(e) {
    const t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(e, t) {
    const n = this.center.distanceToSquared(e);
    return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
  }
  getBoundingBox(e) {
    return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  applyMatrix4(e) {
    return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this;
  }
  translate(e) {
    return this.center.add(e), this;
  }
  expandByPoint(e) {
    if (this.isEmpty()) return this.center.copy(e), this.radius = 0, this;
    ea.subVectors(e, this.center);
    const t = ea.lengthSq();
    if (t > this.radius * this.radius) {
      const e = Math.sqrt(t),
        radius = .5 * (e - this.radius);
      this.center.addScaledVector(ea, radius / e), this.radius += radius;
    }
    return this;
  }
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (!0 === this.center.equals(e.center) ? this.radius = Math.max(this.radius, e.radius) : (ta.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(ea.copy(e.center).add(ta)), this.expandByPoint(ea.copy(e.center).sub(ta))), this);
  }
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    return {
      radius: this.radius,
      center: this.center.toArray()
    };
  }
  fromJSON(e) {
    return this.radius = e.radius, this.center.fromArray(e.center), this;
  }
}
let na = 0;
const ra = new Matrix4(),
  object3D = new Object3D(),
  aa = new Vector3(),
  sa = new Box3(),
  oa = new Box3(),
  ca = new Vector3();
class BufferGeometry extends EventDispatcher {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", {
      value: na++
    }), this.uuid = yr(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
      start: 0,
      count: 1 / 0
    }, this.userData = {}, this._transformed = !1;
  }
  getIndex() {
    return this.index;
  }
  setIndex(index) {
    return Array.isArray(index) ? this.index = new (function (e) {
      for (let t = e.length - 1; t >= 0; --t) if (e[t] >= 65535) return !0;
      return !1;
    }(index) ? Uint32BufferAttribute : Uint16BufferAttribute)(index, 1) : this.index = index, this;
  }
  setIndirect(indirect, indirectOffset = 0) {
    return this.indirect = indirect, this.indirectOffset = indirectOffset, this;
  }
  getIndirect() {
    return this.indirect;
  }
  getAttribute(e) {
    return this.attributes[e];
  }
  setAttribute(e, t) {
    return this.attributes[e] = t, this;
  }
  deleteAttribute(e) {
    return delete this.attributes[e], this;
  }
  hasAttribute(e) {
    return void 0 !== this.attributes[e];
  }
  addGroup(e, t, n = 0) {
    this.groups.push({
      start: e,
      count: t,
      materialIndex: n
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(e, t) {
    this.drawRange.start = e, this.drawRange.count = t;
  }
  applyMatrix4(e) {
    const t = this.attributes.position;
    void 0 !== t && (t.applyMatrix4(e), t.needsUpdate = !0);
    const n = this.attributes.normal;
    if (void 0 !== n) {
      const t = new Matrix3().getNormalMatrix(e);
      n.applyNormalMatrix(t), n.needsUpdate = !0;
    }
    const r = this.attributes.tangent;
    return void 0 !== r && (r.transformDirection(e), r.needsUpdate = !0), null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this._transformed = !0, this;
  }
  applyQuaternion(e) {
    return ra.makeRotationFromQuaternion(e), this.applyMatrix4(ra), this;
  }
  rotateX(e) {
    return ra.makeRotationX(e), this.applyMatrix4(ra), this;
  }
  rotateY(e) {
    return ra.makeRotationY(e), this.applyMatrix4(ra), this;
  }
  rotateZ(e) {
    return ra.makeRotationZ(e), this.applyMatrix4(ra), this;
  }
  translate(e, t, n) {
    return ra.makeTranslation(e, t, n), this.applyMatrix4(ra), this;
  }
  scale(e, t, n) {
    return ra.makeScale(e, t, n), this.applyMatrix4(ra), this;
  }
  lookAt(e) {
    return object3D.lookAt(e), object3D.updateMatrix(), this.applyMatrix4(object3D.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(aa).negate(), this.translate(aa.x, aa.y, aa.z), this;
  }
  setFromPoints(e) {
    const t = this.getAttribute("position");
    if (void 0 === t) {
      const t = [];
      for (let n = 0, r = e.length; n < r; n++) {
        const r = e[n];
        t.push(r.x, r.y, r.z || 0);
      }
      this.setAttribute("position", new Float32BufferAttribute(t, 3));
    } else {
      const n = Math.min(e.length, t.count);
      for (let r = 0; r < n; r++) {
        const n = e[r];
        t.setXYZ(r, n.x, n.y, n.z || 0);
      }
      e.length > t.count && warn("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), t.needsUpdate = !0;
    }
    return this;
  }
  computeBoundingBox() {
    null === this.boundingBox && (this.boundingBox = new Box3());
    const e = this.attributes.position,
      t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) return error("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), void this.boundingBox.set(new Vector3(-1 / 0, -1 / 0, -1 / 0), new Vector3(1 / 0, 1 / 0, 1 / 0));
    if (void 0 !== e) {
      if (this.boundingBox.setFromBufferAttribute(e), t) for (let e = 0, n = t.length; e < n; e++) {
        const n = t[e];
        sa.setFromBufferAttribute(n), this.morphTargetsRelative ? (ca.addVectors(this.boundingBox.min, sa.min), this.boundingBox.expandByPoint(ca), ca.addVectors(this.boundingBox.max, sa.max), this.boundingBox.expandByPoint(ca)) : (this.boundingBox.expandByPoint(sa.min), this.boundingBox.expandByPoint(sa.max));
      }
    } else this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && error('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    null === this.boundingSphere && (this.boundingSphere = new Sphere());
    const e = this.attributes.position,
      t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) return error("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), void this.boundingSphere.set(new Vector3(), 1 / 0);
    if (e) {
      const n = this.boundingSphere.center;
      if (sa.setFromBufferAttribute(e), t) for (let e = 0, n = t.length; e < n; e++) {
        const n = t[e];
        oa.setFromBufferAttribute(n), this.morphTargetsRelative ? (ca.addVectors(sa.min, oa.min), sa.expandByPoint(ca), ca.addVectors(sa.max, oa.max), sa.expandByPoint(ca)) : (sa.expandByPoint(oa.min), sa.expandByPoint(oa.max));
      }
      sa.getCenter(n);
      let r = 0;
      for (let t = 0, i = e.count; t < i; t++) ca.fromBufferAttribute(e, t), r = Math.max(r, n.distanceToSquared(ca));
      if (t) for (let i = 0, a = t.length; i < a; i++) {
        const a = t[i],
          morphTargetsRelative = this.morphTargetsRelative;
        for (let t = 0, i = a.count; t < i; t++) ca.fromBufferAttribute(a, t), morphTargetsRelative && (aa.fromBufferAttribute(e, t), ca.add(aa)), r = Math.max(r, n.distanceToSquared(ca));
      }
      this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && error('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const index = this.index,
      attributes = this.attributes;
    if (null === index || void 0 === attributes.position || void 0 === attributes.normal || void 0 === attributes.uv) return void error("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
    const n = attributes.position,
      r = attributes.normal,
      i = attributes.uv;
    let a = this.getAttribute("tangent");
    void 0 !== a && a.count === n.count || (a = new BufferAttribute(new Float32Array(4 * n.count), 4), this.setAttribute("tangent", a));
    const s = [],
      o = [];
    for (let e = 0; e < n.count; e++) s[e] = new Vector3(), o[e] = new Vector3();
    const c = new Vector3(),
      l = new Vector3(),
      u = new Vector3(),
      d = new Vector2(),
      h = new Vector2(),
      p = new Vector2(),
      f = new Vector3(),
      m = new Vector3();
    function M(e, t, r) {
      c.fromBufferAttribute(n, e), l.fromBufferAttribute(n, t), u.fromBufferAttribute(n, r), d.fromBufferAttribute(i, e), h.fromBufferAttribute(i, t), p.fromBufferAttribute(i, r), l.sub(c), u.sub(c), h.sub(d), p.sub(d);
      const a = 1 / (h.x * p.y - p.x * h.y);
      isFinite(a) && (f.copy(l).multiplyScalar(p.y).addScaledVector(u, -h.y).multiplyScalar(a), m.copy(u).multiplyScalar(h.x).addScaledVector(l, -p.x).multiplyScalar(a), s[e].add(f), s[t].add(f), s[r].add(f), o[e].add(m), o[t].add(m), o[r].add(m));
    }
    let groups = this.groups;
    0 === groups.length && (groups = [{
      start: 0,
      count: index.count
    }]);
    for (let t = 0, n = groups.length; t < n; ++t) {
      const n = groups[t],
        r = n.start;
      for (let t = r, i = r + n.count; t < i; t += 3) M(index.getX(t + 0), index.getX(t + 1), index.getX(t + 2));
    }
    const A = new Vector3(),
      g = new Vector3(),
      b = new Vector3(),
      y = new Vector3();
    function L(e) {
      b.fromBufferAttribute(r, e), y.copy(b);
      const t = s[e];
      A.copy(t), A.sub(b.multiplyScalar(b.dot(t))).normalize(), g.crossVectors(y, t);
      const n = g.dot(o[e]) < 0 ? -1 : 1;
      a.setXYZW(e, A.x, A.y, A.z, n);
    }
    for (let t = 0, n = groups.length; t < n; ++t) {
      const n = groups[t],
        r = n.start;
      for (let t = r, i = r + n.count; t < i; t += 3) L(index.getX(t + 0)), L(index.getX(t + 1)), L(index.getX(t + 2));
    }
    this._transformed = !0;
  }
  computeVertexNormals() {
    const index = this.index,
      t = this.getAttribute("position");
    if (void 0 !== t) {
      let n = this.getAttribute("normal");
      if (void 0 === n || n.count !== t.count) n = new BufferAttribute(new Float32Array(3 * t.count), 3), this.setAttribute("normal", n);else for (let e = 0, t = n.count; e < t; e++) n.setXYZ(e, 0, 0, 0);
      const r = new Vector3(),
        i = new Vector3(),
        a = new Vector3(),
        s = new Vector3(),
        o = new Vector3(),
        c = new Vector3(),
        l = new Vector3(),
        u = new Vector3();
      if (index) for (let d = 0, h = index.count; d < h; d += 3) {
        const h = index.getX(d + 0),
          p = index.getX(d + 1),
          f = index.getX(d + 2);
        r.fromBufferAttribute(t, h), i.fromBufferAttribute(t, p), a.fromBufferAttribute(t, f), l.subVectors(a, i), u.subVectors(r, i), l.cross(u), s.fromBufferAttribute(n, h), o.fromBufferAttribute(n, p), c.fromBufferAttribute(n, f), s.add(l), o.add(l), c.add(l), n.setXYZ(h, s.x, s.y, s.z), n.setXYZ(p, o.x, o.y, o.z), n.setXYZ(f, c.x, c.y, c.z);
      } else for (let e = 0, s = t.count; e < s; e += 3) r.fromBufferAttribute(t, e + 0), i.fromBufferAttribute(t, e + 1), a.fromBufferAttribute(t, e + 2), l.subVectors(a, i), u.subVectors(r, i), l.cross(u), n.setXYZ(e + 0, l.x, l.y, l.z), n.setXYZ(e + 1, l.x, l.y, l.z), n.setXYZ(e + 2, l.x, l.y, l.z);
      this.normalizeNormals(), n.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const e = this.attributes.normal;
    for (let t = 0, n = e.count; t < n; t++) ca.fromBufferAttribute(e, t), ca.normalize(), e.setXYZ(t, ca.x, ca.y, ca.z);
  }
  toNonIndexed() {
    function e(e, t) {
      const n = e.array,
        r = e.itemSize,
        i = e.normalized,
        constructor = new n.constructor(t.length * r);
      let s = 0,
        o = 0;
      for (let i = 0, c = t.length; i < c; i++) {
        s = e.isInterleavedBufferAttribute ? t[i] * e.data.stride + e.offset : t[i] * r;
        for (let e = 0; e < r; e++) constructor[o++] = n[s++];
      }
      return new BufferAttribute(constructor, r, i);
    }
    if (null === this.index) return warn("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const bufferGeometry = new BufferGeometry(),
      n = this.index.array,
      attributes = this.attributes;
    for (const i in attributes) {
      const a = e(attributes[i], n);
      bufferGeometry.setAttribute(i, a);
    }
    const morphAttributes = this.morphAttributes;
    for (const r in morphAttributes) {
      const a = [],
        s = morphAttributes[r];
      for (let t = 0, r = s.length; t < r; t++) {
        const r = e(s[t], n);
        a.push(r);
      }
      bufferGeometry.morphAttributes[r] = a;
    }
    bufferGeometry.morphTargetsRelative = this.morphTargetsRelative;
    const groups = this.groups;
    for (let e = 0, n = groups.length; e < n; e++) {
      const n = groups[e];
      bufferGeometry.addGroup(n.start, n.count, n.materialIndex);
    }
    return bufferGeometry;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.7,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (e.uuid = this.uuid, e.type = void 0 !== this.parameters && !0 === this._transformed ? "BufferGeometry" : this.type, "" !== this.name && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), void 0 !== this.parameters && !0 !== this._transformed) {
      const parameters = this.parameters;
      for (const n in parameters) void 0 !== parameters[n] && (e[n] = parameters[n]);
      return e;
    }
    e.data = {
      attributes: {}
    };
    const index = this.index;
    null !== index && (e.data.index = {
      type: index.array.constructor.name,
      array: Array.prototype.slice.call(index.array)
    });
    const attributes = this.attributes;
    for (const t in attributes) {
      const r = attributes[t];
      e.data.attributes[t] = r.toJSON(e.data);
    }
    const r = {};
    let i = !1;
    for (const t in this.morphAttributes) {
      const n = this.morphAttributes[t],
        a = [];
      for (let t = 0, r = n.length; t < r; t++) {
        const r = n[t];
        a.push(r.toJSON(e.data));
      }
      a.length > 0 && (r[t] = a, i = !0);
    }
    i && (e.data.morphAttributes = r, e.data.morphTargetsRelative = this.morphTargetsRelative);
    const groups = this.groups;
    groups.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(groups)));
    const boundingSphere = this.boundingSphere;
    return null !== boundingSphere && (e.data.boundingSphere = boundingSphere.toJSON()), e;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const t = {};
    this.name = e.name;
    const n = e.index;
    null !== n && this.setIndex(n.clone());
    const r = e.attributes;
    for (const e in r) {
      const n = r[e];
      this.setAttribute(e, n.clone(t));
    }
    const i = e.morphAttributes;
    for (const e in i) {
      const n = [],
        r = i[e];
      for (let e = 0, i = r.length; e < i; e++) n.push(r[e].clone(t));
      this.morphAttributes[e] = n;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    const a = e.groups;
    for (let e = 0, t = a.length; e < t; e++) {
      const t = a[e];
      this.addGroup(t.start, t.count, t.materialIndex);
    }
    const s = e.boundingBox;
    null !== s && (this.boundingBox = s.clone());
    const o = e.boundingSphere;
    return null !== o && (this.boundingSphere = o.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this._transformed = e._transformed, this;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
}
class InterleavedBuffer {
  constructor(array, stride) {
    this.isInterleavedBuffer = !0, this.array = array, this.stride = stride, this.count = void 0 !== array ? array.length / stride : 0, this.usage = kn, this.updateRanges = [], this.version = 0, this.uuid = yr();
  }
  onUploadCallback() {}
  set needsUpdate(e) {
    !0 === e && this.version++;
  }
  setUsage(usage) {
    return this.usage = usage, this;
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({
      start: e,
      count: t
    });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return this.array = new e.array.constructor(e.array), this.count = e.count, this.stride = e.stride, this.usage = e.usage, this;
  }
  copyAt(e, t, n) {
    e *= this.stride, n *= t.stride;
    for (let r = 0, stride = this.stride; r < stride; r++) this.array[e + r] = t.array[n + r];
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  clone(e) {
    void 0 === e.arrayBuffers && (e.arrayBuffers = {}), void 0 === this.array.buffer._uuid && (this.array.buffer._uuid = yr()), void 0 === e.arrayBuffers[this.array.buffer._uuid] && (e.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer);
    const constructor = new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),
      n = new this.constructor(constructor, this.stride);
    return n.setUsage(this.usage), n;
  }
  onUpload(onUploadCallback) {
    return this.onUploadCallback = onUploadCallback, this;
  }
  toJSON(e) {
    return void 0 === e.arrayBuffers && (e.arrayBuffers = {}), void 0 === this.array.buffer._uuid && (this.array.buffer._uuid = yr()), void 0 === e.arrayBuffers[this.array.buffer._uuid] && (e.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer))), {
      uuid: this.uuid,
      buffer: this.array.buffer._uuid,
      type: this.array.constructor.name,
      stride: this.stride
    };
  }
}
const la = new Vector3();
class InterleavedBufferAttribute {
  constructor(data, itemSize, offset, normalized = !1) {
    this.isInterleavedBufferAttribute = !0, this.name = "", this.data = data, this.itemSize = itemSize, this.offset = offset, this.normalized = normalized;
  }
  get count() {
    return this.data.count;
  }
  get array() {
    return this.data.array;
  }
  set needsUpdate(e) {
    this.data.needsUpdate = e;
  }
  applyMatrix4(e) {
    for (let t = 0, n = this.data.count; t < n; t++) la.fromBufferAttribute(this, t), la.applyMatrix4(e), this.setXYZ(t, la.x, la.y, la.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, count = this.count; t < count; t++) la.fromBufferAttribute(this, t), la.applyNormalMatrix(e), this.setXYZ(t, la.x, la.y, la.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, count = this.count; t < count; t++) la.fromBufferAttribute(this, t), la.transformDirection(e), this.setXYZ(t, la.x, la.y, la.z);
    return this;
  }
  getComponent(e, t) {
    let n = this.array[e * this.data.stride + this.offset + t];
    return this.normalized && (n = Sr(n, this.array)), n;
  }
  setComponent(e, t, n) {
    return this.normalized && (n = wr(n, this.array)), this.data.array[e * this.data.stride + this.offset + t] = n, this;
  }
  setX(e, t) {
    return this.normalized && (t = wr(t, this.array)), this.data.array[e * this.data.stride + this.offset] = t, this;
  }
  setY(e, t) {
    return this.normalized && (t = wr(t, this.array)), this.data.array[e * this.data.stride + this.offset + 1] = t, this;
  }
  setZ(e, t) {
    return this.normalized && (t = wr(t, this.array)), this.data.array[e * this.data.stride + this.offset + 2] = t, this;
  }
  setW(e, t) {
    return this.normalized && (t = wr(t, this.array)), this.data.array[e * this.data.stride + this.offset + 3] = t, this;
  }
  getX(e) {
    let t = this.data.array[e * this.data.stride + this.offset];
    return this.normalized && (t = Sr(t, this.array)), t;
  }
  getY(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 1];
    return this.normalized && (t = Sr(t, this.array)), t;
  }
  getZ(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 2];
    return this.normalized && (t = Sr(t, this.array)), t;
  }
  getW(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 3];
    return this.normalized && (t = Sr(t, this.array)), t;
  }
  setXY(e, t, n) {
    return e = e * this.data.stride + this.offset, this.normalized && (t = wr(t, this.array), n = wr(n, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this;
  }
  setXYZ(e, t, n, r) {
    return e = e * this.data.stride + this.offset, this.normalized && (t = wr(t, this.array), n = wr(n, this.array), r = wr(r, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = r, this;
  }
  setXYZW(e, t, n, r, i) {
    return e = e * this.data.stride + this.offset, this.normalized && (t = wr(t, this.array), n = wr(n, this.array), r = wr(r, this.array), i = wr(i, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = r, this.data.array[e + 3] = i, this;
  }
  clone(e) {
    if (void 0 === e) {
      log("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");
      const e = [];
      for (let t = 0; t < this.count; t++) {
        const n = t * this.data.stride + this.offset;
        for (let t = 0; t < this.itemSize; t++) e.push(this.data.array[n + t]);
      }
      return new BufferAttribute(new this.array.constructor(e), this.itemSize, this.normalized);
    }
    return void 0 === e.interleavedBuffers && (e.interleavedBuffers = {}), void 0 === e.interleavedBuffers[this.data.uuid] && (e.interleavedBuffers[this.data.uuid] = this.data.clone(e)), new InterleavedBufferAttribute(e.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized);
  }
  toJSON(e) {
    if (void 0 === e) {
      log("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");
      const e = [];
      for (let t = 0; t < this.count; t++) {
        const n = t * this.data.stride + this.offset;
        for (let t = 0; t < this.itemSize; t++) e.push(this.data.array[n + t]);
      }
      return {
        itemSize: this.itemSize,
        type: this.array.constructor.name,
        array: e,
        normalized: this.normalized
      };
    }
    return void 0 === e.interleavedBuffers && (e.interleavedBuffers = {}), void 0 === e.interleavedBuffers[this.data.uuid] && (e.interleavedBuffers[this.data.uuid] = this.data.toJSON(e)), {
      isInterleavedBufferAttribute: !0,
      itemSize: this.itemSize,
      data: this.data.uuid,
      offset: this.offset,
      normalized: this.normalized
    };
  }
}
let geometry,
  da = 0;
class Material extends EventDispatcher {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", {
      value: da++
    }), this.uuid = yr(), this.name = "", this.type = "Material", this.blending = A, this.side = f, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = D, this.blendDst = N, this.blendEquation = T, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Color(0, 0, 0), this.blendAlpha = 0, this.depthFunc = j, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = xn, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = fn, this.stencilZFail = fn, this.stencilZPass = fn, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(alphaTest) {
    this._alphaTest > 0 != alphaTest > 0 && this.version++, this._alphaTest = alphaTest;
  }
  onBeforeRender() {}
  onBeforeCompile() {}
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(e) {
    if (void 0 !== e) for (const t in e) {
      const n = e[t];
      if (void 0 === n) {
        warn(`Material: parameter '${t}' has value of undefined.`);
        continue;
      }
      const r = this[t];
      void 0 !== r ? r && r.isColor ? r.set(n) : r && r.isVector2 && n && n.isVector2 || r && r.isEuler && n && n.isEuler || r && r.isVector3 && n && n.isVector3 ? r.copy(n) : this[t] = n : warn(`Material: '${t}' is not a property of THREE.${this.type}.`);
    }
  }
  toJSON(e) {
    const t = void 0 === e || "string" == typeof e;
    t && (e = {
      textures: {},
      images: {}
    });
    const n = {
      metadata: {
        version: 4.7,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    function r(e) {
      const t = [];
      for (const n in e) {
        const r = e[n];
        delete r.metadata, t.push(r);
      }
      return t;
    }
    if (n.uuid = this.uuid, n.type = this.type, "" !== this.name && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), void 0 !== this.roughness && (n.roughness = this.roughness), void 0 !== this.metalness && (n.metalness = this.metalness), void 0 !== this.sheen && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), void 0 !== this.sheenRoughness && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), void 0 !== this.emissiveIntensity && 1 !== this.emissiveIntensity && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), void 0 !== this.specularIntensity && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), void 0 !== this.shininess && (n.shininess = this.shininess), void 0 !== this.clearcoat && (n.clearcoat = this.clearcoat), void 0 !== this.clearcoatRoughness && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (n.sheenColorMap = this.sheenColorMap.toJSON(e).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (n.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e).uuid), void 0 !== this.dispersion && (n.dispersion = this.dispersion), void 0 !== this.iridescence && (n.iridescence = this.iridescence), void 0 !== this.iridescenceIOR && (n.iridescenceIOR = this.iridescenceIOR), void 0 !== this.iridescenceThicknessRange && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), void 0 !== this.anisotropy && (n.anisotropy = this.anisotropy), void 0 !== this.anisotropyRotation && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, void 0 !== this.combine && (n.combine = this.combine)), void 0 !== this.envMapRotation && (n.envMapRotation = this.envMapRotation.toArray()), void 0 !== this.envMapIntensity && (n.envMapIntensity = this.envMapIntensity), void 0 !== this.reflectivity && (n.reflectivity = this.reflectivity), void 0 !== this.refractionRatio && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), void 0 !== this.transmission && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), void 0 !== this.thickness && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), void 0 !== this.attenuationDistance && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), void 0 !== this.attenuationColor && (n.attenuationColor = this.attenuationColor.getHex()), void 0 !== this.size && (n.size = this.size), null !== this.shadowSide && (n.shadowSide = this.shadowSide), void 0 !== this.sizeAttenuation && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== A && (n.blending = this.blending), this.side !== f && (n.side = this.side), !0 === this.vertexColors && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), !0 === this.transparent && (n.transparent = !0), this.blendSrc !== D && (n.blendSrc = this.blendSrc), this.blendDst !== N && (n.blendDst = this.blendDst), this.blendEquation !== T && (n.blendEquation = this.blendEquation), null !== this.blendSrcAlpha && (n.blendSrcAlpha = this.blendSrcAlpha), null !== this.blendDstAlpha && (n.blendDstAlpha = this.blendDstAlpha), null !== this.blendEquationAlpha && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), 0 !== this.blendAlpha && (n.blendAlpha = this.blendAlpha), this.depthFunc !== j && (n.depthFunc = this.depthFunc), !1 === this.depthTest && (n.depthTest = this.depthTest), !1 === this.depthWrite && (n.depthWrite = this.depthWrite), !1 === this.colorWrite && (n.colorWrite = this.colorWrite), 255 !== this.stencilWriteMask && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== xn && (n.stencilFunc = this.stencilFunc), 0 !== this.stencilRef && (n.stencilRef = this.stencilRef), 255 !== this.stencilFuncMask && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== fn && (n.stencilFail = this.stencilFail), this.stencilZFail !== fn && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== fn && (n.stencilZPass = this.stencilZPass), !0 === this.stencilWrite && (n.stencilWrite = this.stencilWrite), void 0 !== this.rotation && 0 !== this.rotation && (n.rotation = this.rotation), !0 === this.polygonOffset && (n.polygonOffset = !0), 0 !== this.polygonOffsetFactor && (n.polygonOffsetFactor = this.polygonOffsetFactor), 0 !== this.polygonOffsetUnits && (n.polygonOffsetUnits = this.polygonOffsetUnits), void 0 !== this.linewidth && 1 !== this.linewidth && (n.linewidth = this.linewidth), void 0 !== this.dashSize && (n.dashSize = this.dashSize), void 0 !== this.gapSize && (n.gapSize = this.gapSize), void 0 !== this.scale && (n.scale = this.scale), !0 === this.dithering && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), !0 === this.alphaHash && (n.alphaHash = !0), !0 === this.alphaToCoverage && (n.alphaToCoverage = !0), !0 === this.premultipliedAlpha && (n.premultipliedAlpha = !0), !0 === this.forceSinglePass && (n.forceSinglePass = !0), !1 === this.allowOverride && (n.allowOverride = !1), !0 === this.wireframe && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), "round" !== this.wireframeLinecap && (n.wireframeLinecap = this.wireframeLinecap), "round" !== this.wireframeLinejoin && (n.wireframeLinejoin = this.wireframeLinejoin), !0 === this.flatShading && (n.flatShading = !0), !1 === this.visible && (n.visible = !1), !1 === this.toneMapped && (n.toneMapped = !1), !1 === this.fog && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData), t) {
      const t = r(e.textures),
        i = r(e.images);
      t.length > 0 && (n.textures = t), i.length > 0 && (n.images = i);
    }
    return n;
  }
  fromJSON(e, t) {
    if (void 0 !== e.uuid && (this.uuid = e.uuid), void 0 !== e.name && (this.name = e.name), void 0 !== e.color && void 0 !== this.color && this.color.setHex(e.color), void 0 !== e.roughness && (this.roughness = e.roughness), void 0 !== e.metalness && (this.metalness = e.metalness), void 0 !== e.sheen && (this.sheen = e.sheen), void 0 !== e.sheenColor && (this.sheenColor = new Color().setHex(e.sheenColor)), void 0 !== e.sheenRoughness && (this.sheenRoughness = e.sheenRoughness), void 0 !== e.emissive && void 0 !== this.emissive && this.emissive.setHex(e.emissive), void 0 !== e.specular && void 0 !== this.specular && this.specular.setHex(e.specular), void 0 !== e.specularIntensity && (this.specularIntensity = e.specularIntensity), void 0 !== e.specularColor && void 0 !== this.specularColor && this.specularColor.setHex(e.specularColor), void 0 !== e.shininess && (this.shininess = e.shininess), void 0 !== e.clearcoat && (this.clearcoat = e.clearcoat), void 0 !== e.clearcoatRoughness && (this.clearcoatRoughness = e.clearcoatRoughness), void 0 !== e.dispersion && (this.dispersion = e.dispersion), void 0 !== e.iridescence && (this.iridescence = e.iridescence), void 0 !== e.iridescenceIOR && (this.iridescenceIOR = e.iridescenceIOR), void 0 !== e.iridescenceThicknessRange && (this.iridescenceThicknessRange = e.iridescenceThicknessRange), void 0 !== e.transmission && (this.transmission = e.transmission), void 0 !== e.thickness && (this.thickness = e.thickness), void 0 !== e.attenuationDistance && (this.attenuationDistance = e.attenuationDistance), void 0 !== e.attenuationColor && void 0 !== this.attenuationColor && this.attenuationColor.setHex(e.attenuationColor), void 0 !== e.anisotropy && (this.anisotropy = e.anisotropy), void 0 !== e.anisotropyRotation && (this.anisotropyRotation = e.anisotropyRotation), void 0 !== e.fog && (this.fog = e.fog), void 0 !== e.flatShading && (this.flatShading = e.flatShading), void 0 !== e.blending && (this.blending = e.blending), void 0 !== e.combine && (this.combine = e.combine), void 0 !== e.side && (this.side = e.side), void 0 !== e.shadowSide && (this.shadowSide = e.shadowSide), void 0 !== e.opacity && (this.opacity = e.opacity), void 0 !== e.transparent && (this.transparent = e.transparent), void 0 !== e.alphaTest && (this.alphaTest = e.alphaTest), void 0 !== e.alphaHash && (this.alphaHash = e.alphaHash), void 0 !== e.depthFunc && (this.depthFunc = e.depthFunc), void 0 !== e.depthTest && (this.depthTest = e.depthTest), void 0 !== e.depthWrite && (this.depthWrite = e.depthWrite), void 0 !== e.colorWrite && (this.colorWrite = e.colorWrite), void 0 !== e.blendSrc && (this.blendSrc = e.blendSrc), void 0 !== e.blendDst && (this.blendDst = e.blendDst), void 0 !== e.blendEquation && (this.blendEquation = e.blendEquation), void 0 !== e.blendSrcAlpha && (this.blendSrcAlpha = e.blendSrcAlpha), void 0 !== e.blendDstAlpha && (this.blendDstAlpha = e.blendDstAlpha), void 0 !== e.blendEquationAlpha && (this.blendEquationAlpha = e.blendEquationAlpha), void 0 !== e.blendColor && void 0 !== this.blendColor && this.blendColor.setHex(e.blendColor), void 0 !== e.blendAlpha && (this.blendAlpha = e.blendAlpha), void 0 !== e.stencilWriteMask && (this.stencilWriteMask = e.stencilWriteMask), void 0 !== e.stencilFunc && (this.stencilFunc = e.stencilFunc), void 0 !== e.stencilRef && (this.stencilRef = e.stencilRef), void 0 !== e.stencilFuncMask && (this.stencilFuncMask = e.stencilFuncMask), void 0 !== e.stencilFail && (this.stencilFail = e.stencilFail), void 0 !== e.stencilZFail && (this.stencilZFail = e.stencilZFail), void 0 !== e.stencilZPass && (this.stencilZPass = e.stencilZPass), void 0 !== e.stencilWrite && (this.stencilWrite = e.stencilWrite), void 0 !== e.wireframe && (this.wireframe = e.wireframe), void 0 !== e.wireframeLinewidth && (this.wireframeLinewidth = e.wireframeLinewidth), void 0 !== e.wireframeLinecap && (this.wireframeLinecap = e.wireframeLinecap), void 0 !== e.wireframeLinejoin && (this.wireframeLinejoin = e.wireframeLinejoin), void 0 !== e.rotation && (this.rotation = e.rotation), void 0 !== e.linewidth && (this.linewidth = e.linewidth), void 0 !== e.dashSize && (this.dashSize = e.dashSize), void 0 !== e.gapSize && (this.gapSize = e.gapSize), void 0 !== e.scale && (this.scale = e.scale), void 0 !== e.polygonOffset && (this.polygonOffset = e.polygonOffset), void 0 !== e.polygonOffsetFactor && (this.polygonOffsetFactor = e.polygonOffsetFactor), void 0 !== e.polygonOffsetUnits && (this.polygonOffsetUnits = e.polygonOffsetUnits), void 0 !== e.dithering && (this.dithering = e.dithering), void 0 !== e.alphaToCoverage && (this.alphaToCoverage = e.alphaToCoverage), void 0 !== e.premultipliedAlpha && (this.premultipliedAlpha = e.premultipliedAlpha), void 0 !== e.forceSinglePass && (this.forceSinglePass = e.forceSinglePass), void 0 !== e.allowOverride && (this.allowOverride = e.allowOverride), void 0 !== e.visible && (this.visible = e.visible), void 0 !== e.toneMapped && (this.toneMapped = e.toneMapped), void 0 !== e.userData && (this.userData = e.userData), void 0 !== e.vertexColors && ("number" == typeof e.vertexColors ? this.vertexColors = e.vertexColors > 0 : this.vertexColors = e.vertexColors), void 0 !== e.size && (this.size = e.size), void 0 !== e.sizeAttenuation && (this.sizeAttenuation = e.sizeAttenuation), void 0 !== e.map && (this.map = t[e.map] || null), void 0 !== e.matcap && (this.matcap = t[e.matcap] || null), void 0 !== e.alphaMap && (this.alphaMap = t[e.alphaMap] || null), void 0 !== e.bumpMap && (this.bumpMap = t[e.bumpMap] || null), void 0 !== e.bumpScale && (this.bumpScale = e.bumpScale), void 0 !== e.normalMap && (this.normalMap = t[e.normalMap] || null), void 0 !== e.normalMapType && (this.normalMapType = e.normalMapType), void 0 !== e.normalScale) {
      let t = e.normalScale;
      !1 === Array.isArray(t) && (t = [t, t]), this.normalScale = new Vector2().fromArray(t);
    }
    return void 0 !== e.displacementMap && (this.displacementMap = t[e.displacementMap] || null), void 0 !== e.displacementScale && (this.displacementScale = e.displacementScale), void 0 !== e.displacementBias && (this.displacementBias = e.displacementBias), void 0 !== e.roughnessMap && (this.roughnessMap = t[e.roughnessMap] || null), void 0 !== e.metalnessMap && (this.metalnessMap = t[e.metalnessMap] || null), void 0 !== e.emissiveMap && (this.emissiveMap = t[e.emissiveMap] || null), void 0 !== e.emissiveIntensity && (this.emissiveIntensity = e.emissiveIntensity), void 0 !== e.specularMap && (this.specularMap = t[e.specularMap] || null), void 0 !== e.specularIntensityMap && (this.specularIntensityMap = t[e.specularIntensityMap] || null), void 0 !== e.specularColorMap && (this.specularColorMap = t[e.specularColorMap] || null), void 0 !== e.envMap && (this.envMap = t[e.envMap] || null), void 0 !== e.envMapRotation && this.envMapRotation.fromArray(e.envMapRotation), void 0 !== e.envMapIntensity && (this.envMapIntensity = e.envMapIntensity), void 0 !== e.reflectivity && (this.reflectivity = e.reflectivity), void 0 !== e.refractionRatio && (this.refractionRatio = e.refractionRatio), void 0 !== e.lightMap && (this.lightMap = t[e.lightMap] || null), void 0 !== e.lightMapIntensity && (this.lightMapIntensity = e.lightMapIntensity), void 0 !== e.aoMap && (this.aoMap = t[e.aoMap] || null), void 0 !== e.aoMapIntensity && (this.aoMapIntensity = e.aoMapIntensity), void 0 !== e.gradientMap && (this.gradientMap = t[e.gradientMap] || null), void 0 !== e.clearcoatMap && (this.clearcoatMap = t[e.clearcoatMap] || null), void 0 !== e.clearcoatRoughnessMap && (this.clearcoatRoughnessMap = t[e.clearcoatRoughnessMap] || null), void 0 !== e.clearcoatNormalMap && (this.clearcoatNormalMap = t[e.clearcoatNormalMap] || null), void 0 !== e.clearcoatNormalScale && (this.clearcoatNormalScale = new Vector2().fromArray(e.clearcoatNormalScale)), void 0 !== e.iridescenceMap && (this.iridescenceMap = t[e.iridescenceMap] || null), void 0 !== e.iridescenceThicknessMap && (this.iridescenceThicknessMap = t[e.iridescenceThicknessMap] || null), void 0 !== e.transmissionMap && (this.transmissionMap = t[e.transmissionMap] || null), void 0 !== e.thicknessMap && (this.thicknessMap = t[e.thicknessMap] || null), void 0 !== e.anisotropyMap && (this.anisotropyMap = t[e.anisotropyMap] || null), void 0 !== e.sheenColorMap && (this.sheenColorMap = t[e.sheenColorMap] || null), void 0 !== e.sheenRoughnessMap && (this.sheenRoughnessMap = t[e.sheenRoughnessMap] || null), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
    const t = e.clippingPlanes;
    let clippingPlanes = null;
    if (null !== t) {
      const e = t.length;
      clippingPlanes = new Array(e);
      for (let r = 0; r !== e; ++r) clippingPlanes[r] = t[r].clone();
    }
    return this.clippingPlanes = clippingPlanes, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.allowOverride = e.allowOverride, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
  set needsUpdate(e) {
    !0 === e && this.version++;
  }
}
class SpriteMaterial extends Material {
  constructor(e) {
    super(), this.isSpriteMaterial = !0, this.type = "SpriteMaterial", this.color = new Color(16777215), this.map = null, this.alphaMap = null, this.rotation = 0, this.sizeAttenuation = !0, this.transparent = !0, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.rotation = e.rotation, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this;
  }
}
const ha = new Vector3(),
  pa = new Vector3(),
  fa = new Vector3(),
  ma = new Vector2(),
  Ma = new Vector2(),
  _a = new Matrix4(),
  Aa = new Vector3(),
  ga = new Vector3(),
  ba = new Vector3(),
  ya = new Vector2(),
  La = new Vector2(),
  va = new Vector2();
class Sprite extends Object3D {
  constructor(material = new SpriteMaterial()) {
    if (super(), this.isSprite = !0, this.type = "Sprite", void 0 === geometry) {
      geometry = new BufferGeometry();
      const float32Array = new Float32Array([-.5, -.5, 0, 0, 0, .5, -.5, 0, 1, 0, .5, .5, 0, 1, 1, -.5, .5, 0, 0, 1]),
        interleavedBuffer = new InterleavedBuffer(float32Array, 5);
      geometry.setIndex([0, 1, 2, 0, 2, 3]), geometry.setAttribute("position", new InterleavedBufferAttribute(interleavedBuffer, 3, 0, !1)), geometry.setAttribute("uv", new InterleavedBufferAttribute(interleavedBuffer, 2, 3, !1));
    }
    this.geometry = geometry, this.material = material, this.center = new Vector2(.5, .5), this.count = 1;
  }
  raycast(e, t) {
    null === e.camera && error('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'), pa.setFromMatrixScale(this.matrixWorld), _a.copy(e.camera.matrixWorld), this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse, this.matrixWorld), fa.setFromMatrixPosition(this.modelViewMatrix), e.camera.isPerspectiveCamera && !1 === this.material.sizeAttenuation && pa.multiplyScalar(-fa.z);
    const n = this.material.rotation;
    let r, i;
    0 !== n && (i = Math.cos(n), r = Math.sin(n));
    const center = this.center;
    Ta(Aa.set(-.5, -.5, 0), fa, center, pa, r, i), Ta(ga.set(.5, -.5, 0), fa, center, pa, r, i), Ta(ba.set(.5, .5, 0), fa, center, pa, r, i), ya.set(0, 0), La.set(1, 0), va.set(1, 1);
    let s = e.ray.intersectTriangle(Aa, ga, ba, !1, ha);
    if (null === s && (Ta(ga.set(-.5, .5, 0), fa, center, pa, r, i), La.set(0, 1), s = e.ray.intersectTriangle(Aa, ba, ga, !1, ha), null === s)) return;
    const o = e.ray.origin.distanceTo(ha);
    o < e.near || o > e.far || t.push({
      distance: o,
      point: ha.clone(),
      uv: Triangle.getInterpolation(ha, Aa, ga, ba, ya, La, va, new Vector2()),
      face: null,
      object: this
    });
  }
  copy(e, t) {
    return super.copy(e, t), void 0 !== e.center && this.center.copy(e.center), this.material = e.material, this;
  }
}
function Ta(e, t, n, r, i, a) {
  ma.subVectors(e, n).addScalar(.5).multiply(r), void 0 !== i ? (Ma.x = a * ma.x - i * ma.y, Ma.y = i * ma.x + a * ma.y) : Ma.copy(ma), e.copy(t), e.x += Ma.x, e.y += Ma.y, e.applyMatrix4(_a);
}
const Sa = new Vector3(),
  wa = new Vector3();
class LOD extends Object3D {
  constructor() {
    super(), this.isLOD = !0, this._currentLevel = 0, this.type = "LOD", Object.defineProperties(this, {
      levels: {
        enumerable: !0,
        value: []
      }
    }), this.autoUpdate = !0;
  }
  copy(e) {
    super.copy(e, !1);
    const t = e.levels;
    for (let e = 0, n = t.length; e < n; e++) {
      const n = t[e];
      this.addLevel(n.object.clone(), n.distance, n.hysteresis);
    }
    return this.autoUpdate = e.autoUpdate, this;
  }
  addLevel(e, t = 0, n = 0) {
    t = Math.abs(t);
    const levels = this.levels;
    let i;
    for (i = 0; i < levels.length && !(t < levels[i].distance); i++);
    return levels.splice(i, 0, {
      distance: t,
      hysteresis: n,
      object: e
    }), this.add(e), this;
  }
  removeLevel(e) {
    const levels = this.levels;
    for (let n = 0; n < levels.length; n++) if (levels[n].distance === e) {
      const e = levels.splice(n, 1);
      return this.remove(e[0].object), !0;
    }
    return !1;
  }
  getCurrentLevel() {
    return this._currentLevel;
  }
  getObjectForDistance(e) {
    const levels = this.levels;
    if (levels.length > 0) {
      let n, r;
      for (n = 1, r = levels.length; n < r; n++) {
        let r = levels[n].distance;
        if (levels[n].object.visible && (r -= r * levels[n].hysteresis), e < r) break;
      }
      return levels[n - 1].object;
    }
    return null;
  }
  raycast(e, t) {
    if (this.levels.length > 0) {
      Sa.setFromMatrixPosition(this.matrixWorld);
      const n = e.ray.origin.distanceTo(Sa);
      this.getObjectForDistance(n).raycast(e, t);
    }
  }
  update(e) {
    const levels = this.levels;
    if (levels.length > 1) {
      Sa.setFromMatrixPosition(e.matrixWorld), wa.setFromMatrixPosition(this.matrixWorld);
      const n = Sa.distanceTo(wa) / e.zoom;
      let r, i;
      for (levels[0].object.visible = !0, r = 1, i = levels.length; r < i; r++) {
        let e = levels[r].distance;
        if (levels[r].object.visible && (e -= e * levels[r].hysteresis), !(n >= e)) break;
        levels[r - 1].object.visible = !1, levels[r].object.visible = !0;
      }
      for (this._currentLevel = r - 1; r < i; r++) levels[r].object.visible = !1;
    }
  }
  toJSON(e) {
    const t = super.toJSON(e);
    !1 === this.autoUpdate && (t.object.autoUpdate = !1), t.object.levels = [];
    const levels = this.levels;
    for (let e = 0, r = levels.length; e < r; e++) {
      const r = levels[e];
      t.object.levels.push({
        object: r.object.uuid,
        distance: r.distance,
        hysteresis: r.hysteresis
      });
    }
    return t;
  }
}
const Ea = new Vector3(),
  xa = new Vector3(),
  Ca = new Vector3(),
  za = new Vector3(),
  Oa = new Vector3(),
  Ba = new Vector3(),
  Da = new Vector3();
class Ray {
  constructor(origin = new Vector3(), direction = new Vector3(0, 0, -1)) {
    this.origin = origin, this.direction = direction;
  }
  set(e, t) {
    return this.origin.copy(e), this.direction.copy(t), this;
  }
  copy(e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
  }
  at(e, t) {
    return t.copy(this.origin).addScaledVector(this.direction, e);
  }
  lookAt(e) {
    return this.direction.copy(e).sub(this.origin).normalize(), this;
  }
  recast(e) {
    return this.origin.copy(this.at(e, Ea)), this;
  }
  closestPointToPoint(e, t) {
    t.subVectors(e, this.origin);
    const n = t.dot(this.direction);
    return n < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, n);
  }
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  distanceSqToPoint(e) {
    const t = Ea.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (Ea.copy(this.origin).addScaledVector(this.direction, t), Ea.distanceToSquared(e));
  }
  distanceSqToSegment(e, t, n, r) {
    xa.copy(e).add(t).multiplyScalar(.5), Ca.copy(t).sub(e).normalize(), za.copy(this.origin).sub(xa);
    const i = .5 * e.distanceTo(t),
      a = -this.direction.dot(Ca),
      s = za.dot(this.direction),
      o = -za.dot(Ca),
      c = za.lengthSq(),
      l = Math.abs(1 - a * a);
    let u, d, h, p;
    if (l > 0) {
      if (u = a * o - s, d = a * s - o, p = i * l, u >= 0) {
        if (d >= -p) {
          if (d <= p) {
            const e = 1 / l;
            u *= e, d *= e, h = u * (u + a * d + 2 * s) + d * (a * u + d + 2 * o) + c;
          } else d = i, u = Math.max(0, -(a * d + s)), h = -u * u + d * (d + 2 * o) + c;
        } else d = -i, u = Math.max(0, -(a * d + s)), h = -u * u + d * (d + 2 * o) + c;
      } else d <= -p ? (u = Math.max(0, -(-a * i + s)), d = u > 0 ? -i : Math.min(Math.max(-i, -o), i), h = -u * u + d * (d + 2 * o) + c) : d <= p ? (u = 0, d = Math.min(Math.max(-i, -o), i), h = d * (d + 2 * o) + c) : (u = Math.max(0, -(a * i + s)), d = u > 0 ? i : Math.min(Math.max(-i, -o), i), h = -u * u + d * (d + 2 * o) + c);
    } else d = a > 0 ? -i : i, u = Math.max(0, -(a * d + s)), h = -u * u + d * (d + 2 * o) + c;
    return n && n.copy(this.origin).addScaledVector(this.direction, u), r && r.copy(xa).addScaledVector(Ca, d), h;
  }
  intersectSphere(e, t) {
    Ea.subVectors(e.center, this.origin);
    const n = Ea.dot(this.direction),
      r = Ea.dot(Ea) - n * n,
      i = e.radius * e.radius;
    if (r > i) return null;
    const a = Math.sqrt(i - r),
      s = n - a,
      o = n + a;
    return o < 0 ? null : s < 0 ? this.at(o, t) : this.at(s, t);
  }
  intersectsSphere(e) {
    return !(e.radius < 0) && this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  distanceToPlane(e) {
    const t = e.normal.dot(this.direction);
    if (0 === t) return 0 === e.distanceToPoint(this.origin) ? 0 : null;
    const n = -(this.origin.dot(e.normal) + e.constant) / t;
    return n >= 0 ? n : null;
  }
  intersectPlane(e, t) {
    const n = this.distanceToPlane(e);
    return null === n ? null : this.at(n, t);
  }
  intersectsPlane(e) {
    const t = e.distanceToPoint(this.origin);
    if (0 === t) return !0;
    return e.normal.dot(this.direction) * t < 0;
  }
  intersectBox(e, t) {
    let n, r, i, a, s, o;
    const c = 1 / this.direction.x,
      l = 1 / this.direction.y,
      u = 1 / this.direction.z,
      origin = this.origin;
    return c >= 0 ? (n = (e.min.x - origin.x) * c, r = (e.max.x - origin.x) * c) : (n = (e.max.x - origin.x) * c, r = (e.min.x - origin.x) * c), l >= 0 ? (i = (e.min.y - origin.y) * l, a = (e.max.y - origin.y) * l) : (i = (e.max.y - origin.y) * l, a = (e.min.y - origin.y) * l), n > a || i > r ? null : ((i > n || isNaN(n)) && (n = i), (a < r || isNaN(r)) && (r = a), u >= 0 ? (s = (e.min.z - origin.z) * u, o = (e.max.z - origin.z) * u) : (s = (e.max.z - origin.z) * u, o = (e.min.z - origin.z) * u), n > o || s > r ? null : ((s > n || n != n) && (n = s), (o < r || r != r) && (r = o), r < 0 ? null : this.at(n >= 0 ? n : r, t)));
  }
  intersectsBox(e) {
    return null !== this.intersectBox(e, Ea);
  }
  intersectTriangle(e, t, n, r, i) {
    Oa.subVectors(t, e), Ba.subVectors(n, e), Da.crossVectors(Oa, Ba);
    let a,
      s = this.direction.dot(Da);
    if (s > 0) {
      if (r) return null;
      a = 1;
    } else {
      if (!(s < 0)) return null;
      a = -1, s = -s;
    }
    za.subVectors(this.origin, e);
    const o = a * this.direction.dot(Ba.crossVectors(za, Ba));
    if (o < 0) return null;
    const c = a * this.direction.dot(Oa.cross(za));
    if (c < 0) return null;
    if (o + c > s) return null;
    const l = -a * za.dot(Da);
    return l < 0 ? null : this.at(l / s, i);
  }
  applyMatrix4(e) {
    return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
  }
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class MeshBasicMaterial extends Material {
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Color(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Euler(), this.combine = Z, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}
const Na = new Matrix4(),
  ray = new Ray(),
  sphere = new Sphere(),
  ka = new Vector3(),
  Pa = new Vector3(),
  Ya = new Vector3(),
  Wa = new Vector3(),
  Fa = new Vector3(),
  qa = new Vector3(),
  Ha = new Vector3(),
  Ua = new Vector3();
class Mesh extends Object3D {
  constructor(e = new BufferGeometry(), material = new MeshBasicMaterial()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = material, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), void 0 !== e.morphTargetInfluences && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), void 0 !== e.morphTargetDictionary && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes,
      t = Object.keys(e);
    if (t.length > 0) {
      const n = e[t[0]];
      if (void 0 !== n) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let e = 0, t = n.length; e < t; e++) {
          const t = n[e].name || String(e);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e;
        }
      }
    }
  }
  getVertexPosition(e, t) {
    const n = this.geometry,
      r = n.attributes.position,
      i = n.morphAttributes.position,
      a = n.morphTargetsRelative;
    t.fromBufferAttribute(r, e);
    const morphTargetInfluences = this.morphTargetInfluences;
    if (i && morphTargetInfluences) {
      qa.set(0, 0, 0);
      for (let n = 0, r = i.length; n < r; n++) {
        const r = morphTargetInfluences[n],
          o = i[n];
        0 !== r && (Fa.fromBufferAttribute(o, e), a ? qa.addScaledVector(Fa, r) : qa.addScaledVector(Fa.sub(t), r));
      }
      t.add(qa);
    }
    return t;
  }
  raycast(e, t) {
    const n = this.geometry,
      material = this.material,
      matrixWorld = this.matrixWorld;
    if (void 0 !== material) {
      if (null === n.boundingSphere && n.computeBoundingSphere(), sphere.copy(n.boundingSphere), sphere.applyMatrix4(matrixWorld), ray.copy(e.ray).recast(e.near), !1 === sphere.containsPoint(ray.origin)) {
        if (null === ray.intersectSphere(sphere, ka)) return;
        if (ray.origin.distanceToSquared(ka) > (e.far - e.near) ** 2) return;
      }
      Na.copy(matrixWorld).invert(), ray.copy(e.ray).applyMatrix4(Na), null !== n.boundingBox && !1 === ray.intersectsBox(n.boundingBox) || this._computeIntersections(e, t, ray);
    }
  }
  _computeIntersections(e, t, n) {
    let r;
    const i = this.geometry,
      material = this.material,
      s = i.index,
      o = i.attributes.position,
      c = i.attributes.uv,
      l = i.attributes.uv1,
      u = i.attributes.normal,
      d = i.groups,
      h = i.drawRange;
    if (null !== s) {
      if (Array.isArray(material)) for (let i = 0, o = d.length; i < o; i++) {
        const o = d[i],
          p = material[o.materialIndex];
        for (let i = Math.max(o.start, h.start), a = Math.min(s.count, Math.min(o.start + o.count, h.start + h.count)); i < a; i += 3) {
          r = Ga(this, p, e, n, c, l, u, s.getX(i), s.getX(i + 1), s.getX(i + 2)), r && (r.faceIndex = Math.floor(i / 3), r.face.materialIndex = o.materialIndex, t.push(r));
        }
      } else {
        for (let i = Math.max(0, h.start), o = Math.min(s.count, h.start + h.count); i < o; i += 3) {
          r = Ga(this, material, e, n, c, l, u, s.getX(i), s.getX(i + 1), s.getX(i + 2)), r && (r.faceIndex = Math.floor(i / 3), t.push(r));
        }
      }
    } else if (void 0 !== o) if (Array.isArray(material)) for (let i = 0, s = d.length; i < s; i++) {
      const s = d[i],
        p = material[s.materialIndex];
      for (let i = Math.max(s.start, h.start), a = Math.min(o.count, Math.min(s.start + s.count, h.start + h.count)); i < a; i += 3) {
        r = Ga(this, p, e, n, c, l, u, i, i + 1, i + 2), r && (r.faceIndex = Math.floor(i / 3), r.face.materialIndex = s.materialIndex, t.push(r));
      }
    } else {
      for (let i = Math.max(0, h.start), s = Math.min(o.count, h.start + h.count); i < s; i += 3) {
        r = Ga(this, material, e, n, c, l, u, i, i + 1, i + 2), r && (r.faceIndex = Math.floor(i / 3), t.push(r));
      }
    }
  }
}
function Ga(e, t, n, r, i, a, s, o, c, l) {
  e.getVertexPosition(o, Pa), e.getVertexPosition(c, Ya), e.getVertexPosition(l, Wa);
  const u = function (e, t, n, r, i, a, s, o) {
    let c;
    if (c = t.side === BackSide ? r.intersectTriangle(s, a, i, !0, o) : r.intersectTriangle(i, a, s, t.side === f, o), null === c) return null;
    Ua.copy(o), Ua.applyMatrix4(e.matrixWorld);
    const l = n.ray.origin.distanceTo(Ua);
    return l < n.near || l > n.far ? null : {
      distance: l,
      point: Ua.clone(),
      object: e
    };
  }(e, t, n, r, Pa, Ya, Wa, Ha);
  if (u) {
    const e = new Vector3();
    Triangle.getBarycoord(Ha, Pa, Ya, Wa, e), i && (u.uv = Triangle.getInterpolatedAttribute(i, o, c, l, e, new Vector2())), a && (u.uv1 = Triangle.getInterpolatedAttribute(a, o, c, l, e, new Vector2())), s && (u.normal = Triangle.getInterpolatedAttribute(s, o, c, l, e, new Vector3()), u.normal.dot(r.direction) > 0 && u.normal.multiplyScalar(-1));
    const t = {
      a: o,
      b: c,
      c: l,
      normal: new Vector3(),
      materialIndex: 0
    };
    Triangle.getNormal(Pa, Ya, Wa, t.normal), u.face = t, u.barycoord = e;
  }
  return u;
}
const Xa = new Vector4(),
  ja = new Vector4(),
  Va = new Vector4(),
  Qa = new Vector4(),
  Ka = new Matrix4(),
  Ja = new Vector3(),
  $a = new Sphere(),
  Za = new Matrix4(),
  es = new Ray();
class SkinnedMesh extends Mesh {
  constructor(e, t) {
    super(e, t), this.isSkinnedMesh = !0, this.type = "SkinnedMesh", this.bindMode = ue, this.bindMatrix = new Matrix4(), this.bindMatrixInverse = new Matrix4(), this.boundingBox = null, this.boundingSphere = null;
  }
  computeBoundingBox() {
    const e = this.geometry;
    null === this.boundingBox && (this.boundingBox = new Box3()), this.boundingBox.makeEmpty();
    const t = e.getAttribute("position");
    for (let e = 0; e < t.count; e++) this.getVertexPosition(e, Ja), this.boundingBox.expandByPoint(Ja);
  }
  computeBoundingSphere() {
    const e = this.geometry;
    null === this.boundingSphere && (this.boundingSphere = new Sphere()), this.boundingSphere.makeEmpty();
    const t = e.getAttribute("position");
    for (let e = 0; e < t.count; e++) this.getVertexPosition(e, Ja), this.boundingSphere.expandByPoint(Ja);
  }
  copy(e, t) {
    return super.copy(e, t), this.bindMode = e.bindMode, this.bindMatrix.copy(e.bindMatrix), this.bindMatrixInverse.copy(e.bindMatrixInverse), this.skeleton = e.skeleton, null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone()), null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()), this;
  }
  raycast(e, t) {
    const material = this.material,
      matrixWorld = this.matrixWorld;
    void 0 !== material && (null === this.boundingSphere && this.computeBoundingSphere(), $a.copy(this.boundingSphere), $a.applyMatrix4(matrixWorld), !1 !== e.ray.intersectsSphere($a) && (Za.copy(matrixWorld).invert(), es.copy(e.ray).applyMatrix4(Za), null !== this.boundingBox && !1 === es.intersectsBox(this.boundingBox) || this._computeIntersections(e, t, es)));
  }
  getVertexPosition(e, t) {
    return super.getVertexPosition(e, t), this.applyBoneTransform(e, t), t;
  }
  bind(skeleton, t) {
    this.skeleton = skeleton, void 0 === t && (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), t = this.matrixWorld), this.bindMatrix.copy(t), this.bindMatrixInverse.copy(t).invert();
  }
  pose() {
    this.skeleton.pose();
  }
  normalizeSkinWeights() {
    const e = new Vector4(),
      t = this.geometry.attributes.skinWeight;
    for (let n = 0, r = t.count; n < r; n++) {
      e.fromBufferAttribute(t, n);
      const r = 1 / e.manhattanLength();
      r !== 1 / 0 ? e.multiplyScalar(r) : e.set(1, 0, 0, 0), t.setXYZW(n, e.x, e.y, e.z, e.w);
    }
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.bindMode === ue ? this.bindMatrixInverse.copy(this.matrixWorld).invert() : this.bindMode === DetachedBindMode ? this.bindMatrixInverse.copy(this.bindMatrix).invert() : warn("SkinnedMesh: Unrecognized bindMode: " + this.bindMode);
  }
  applyBoneTransform(e, t) {
    const skeleton = this.skeleton,
      r = this.geometry;
    ja.fromBufferAttribute(r.attributes.skinIndex, e), Va.fromBufferAttribute(r.attributes.skinWeight, e), t.isVector4 ? (Xa.copy(t), t.set(0, 0, 0, 0)) : (Xa.set(...t, 1), t.set(0, 0, 0)), Xa.applyMatrix4(this.bindMatrix);
    for (let e = 0; e < 4; e++) {
      const r = Va.getComponent(e);
      if (0 !== r) {
        const i = ja.getComponent(e);
        Ka.multiplyMatrices(skeleton.bones[i].matrixWorld, skeleton.boneInverses[i]), t.addScaledVector(Qa.copy(Xa).applyMatrix4(Ka), r);
      }
    }
    return t.isVector4 && (t.w = Xa.w), t.applyMatrix4(this.bindMatrixInverse);
  }
}
class Bone extends Object3D {
  constructor() {
    super(), this.isBone = !0, this.type = "Bone";
  }
}
class DataTexture extends Texture {
  constructor(e = null, t = 1, n = 1, r, i, a, s, o, c = ye, l = ye, u, d) {
    super(null, a, s, o, c, l, r, i, u, d), this.isDataTexture = !0, this.image = {
      data: e,
      width: t,
      height: n
    }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
const ts = new Matrix4(),
  ns = new Matrix4();
class Skeleton {
  constructor(e = [], boneInverses = []) {
    this.uuid = yr(), this.bones = e.slice(0), this.boneInverses = boneInverses, this.boneMatrices = null, this.boneTexture = null, this.init();
  }
  init() {
    const bones = this.bones,
      boneInverses = this.boneInverses;
    if (this.boneMatrices = new Float32Array(16 * bones.length), 0 === boneInverses.length) this.calculateInverses();else if (bones.length !== boneInverses.length) {
      warn("Skeleton: Number of inverse bone matrices does not match amount of bones."), this.boneInverses = [];
      for (let e = 0, t = this.bones.length; e < t; e++) this.boneInverses.push(new Matrix4());
    }
  }
  calculateInverses() {
    this.boneInverses.length = 0;
    for (let e = 0, t = this.bones.length; e < t; e++) {
      const t = new Matrix4();
      this.bones[e] && t.copy(this.bones[e].matrixWorld).invert(), this.boneInverses.push(t);
    }
  }
  pose() {
    for (let e = 0, t = this.bones.length; e < t; e++) {
      const t = this.bones[e];
      t && t.matrixWorld.copy(this.boneInverses[e]).invert();
    }
    for (let e = 0, t = this.bones.length; e < t; e++) {
      const t = this.bones[e];
      t && (t.parent && t.parent.isBone ? (t.matrix.copy(t.parent.matrixWorld).invert(), t.matrix.multiply(t.matrixWorld)) : t.matrix.copy(t.matrixWorld), t.matrix.decompose(t.position, t.quaternion, t.scale));
    }
  }
  update() {
    const bones = this.bones,
      boneInverses = this.boneInverses,
      boneMatrices = this.boneMatrices,
      boneTexture = this.boneTexture;
    for (let r = 0, i = bones.length; r < i; r++) {
      const i = bones[r] ? bones[r].matrixWorld : ns;
      ts.multiplyMatrices(i, boneInverses[r]), ts.toArray(boneMatrices, 16 * r);
    }
    null !== boneTexture && (boneTexture.needsUpdate = !0);
  }
  clone() {
    return new Skeleton(this.bones, this.boneInverses);
  }
  computeBoneTexture() {
    let e = Math.sqrt(4 * this.bones.length);
    e = 4 * Math.ceil(e / 4), e = Math.max(e, 4);
    const t = new Float32Array(e * e * 4);
    t.set(this.boneMatrices);
    const n = new DataTexture(t, e, e, RGBAFormat, ke);
    return n.needsUpdate = !0, this.boneMatrices = t, this.boneTexture = n, this;
  }
  getBoneByName(e) {
    for (let t = 0, n = this.bones.length; t < n; t++) {
      const n = this.bones[t];
      if (n.name === e) return n;
    }
  }
  dispose() {
    null !== this.boneTexture && (this.boneTexture.dispose(), this.boneTexture = null);
  }
  fromJSON(e, t) {
    this.uuid = e.uuid;
    for (let n = 0, r = e.bones.length; n < r; n++) {
      const r = e.bones[n];
      let i = t[r];
      void 0 === i && (warn("Skeleton: No bone found with UUID:", r), i = new Bone()), this.bones.push(i), this.boneInverses.push(new Matrix4().fromArray(e.boneInverses[n]));
    }
    return this.init(), this;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.7,
        type: "Skeleton",
        generator: "Skeleton.toJSON"
      },
      bones: [],
      boneInverses: []
    };
    e.uuid = this.uuid;
    const bones = this.bones,
      boneInverses = this.boneInverses;
    for (let r = 0, i = bones.length; r < i; r++) {
      const i = bones[r];
      e.bones.push(i.uuid);
      const a = boneInverses[r];
      e.boneInverses.push(a.toArray());
    }
    return e;
  }
}
class InstancedBufferAttribute extends BufferAttribute {
  constructor(e, t, n, meshPerAttribute = 1) {
    super(e, t, n), this.isInstancedBufferAttribute = !0, this.meshPerAttribute = meshPerAttribute;
  }
  copy(e) {
    return super.copy(e), this.meshPerAttribute = e.meshPerAttribute, this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.meshPerAttribute = this.meshPerAttribute, e.isInstancedBufferAttribute = !0, e;
  }
}
const rs = new Matrix4(),
  is = new Matrix4(),
  as = [],
  ss = new Box3(),
  os = new Matrix4(),
  mesh = new Mesh(),
  ls = new Sphere();
class InstancedMesh extends Mesh {
  constructor(e, t, count) {
    super(e, t), this.isInstancedMesh = !0, this.instanceMatrix = new InstancedBufferAttribute(new Float32Array(16 * count), 16), this.instanceColor = null, this.morphTexture = null, this.count = count, this.boundingBox = null, this.boundingSphere = null;
    for (let e = 0; e < count; e++) this.setMatrixAt(e, os);
  }
  computeBoundingBox() {
    const e = this.geometry,
      count = this.count;
    null === this.boundingBox && (this.boundingBox = new Box3()), null === e.boundingBox && e.computeBoundingBox(), this.boundingBox.makeEmpty();
    for (let n = 0; n < count; n++) this.getMatrixAt(n, rs), ss.copy(e.boundingBox).applyMatrix4(rs), this.boundingBox.union(ss);
  }
  computeBoundingSphere() {
    const e = this.geometry,
      count = this.count;
    null === this.boundingSphere && (this.boundingSphere = new Sphere()), null === e.boundingSphere && e.computeBoundingSphere(), this.boundingSphere.makeEmpty();
    for (let n = 0; n < count; n++) this.getMatrixAt(n, rs), ls.copy(e.boundingSphere).applyMatrix4(rs), this.boundingSphere.union(ls);
  }
  copy(e, t) {
    return super.copy(e, t), this.instanceMatrix.copy(e.instanceMatrix), null !== e.morphTexture && (this.morphTexture = e.morphTexture.clone()), null !== e.instanceColor && (this.instanceColor = e.instanceColor.clone()), this.count = e.count, null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone()), null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()), this;
  }
  getColorAt(e, t) {
    return null === this.instanceColor ? t.setRGB(1, 1, 1) : t.fromArray(this.instanceColor.array, 3 * e);
  }
  getMatrixAt(e, t) {
    return t.fromArray(this.instanceMatrix.array, 16 * e);
  }
  getMorphAt(e, t) {
    const n = t.morphTargetInfluences,
      r = this.morphTexture.source.data.data,
      i = e * (n.length + 1) + 1;
    for (let e = 0; e < n.length; e++) n[e] = r[i + e];
  }
  raycast(e, t) {
    const matrixWorld = this.matrixWorld,
      count = this.count;
    if (mesh.geometry = this.geometry, mesh.material = this.material, void 0 !== mesh.material && (null === this.boundingSphere && this.computeBoundingSphere(), ls.copy(this.boundingSphere), ls.applyMatrix4(matrixWorld), !1 !== e.ray.intersectsSphere(ls))) for (let i = 0; i < count; i++) {
      this.getMatrixAt(i, rs), is.multiplyMatrices(matrixWorld, rs), mesh.matrixWorld = is, mesh.raycast(e, as);
      for (let e = 0, n = as.length; e < n; e++) {
        const n = as[e];
        n.instanceId = i, n.object = this, t.push(n);
      }
      as.length = 0;
    }
  }
  setColorAt(e, t) {
    return null === this.instanceColor && (this.instanceColor = new InstancedBufferAttribute(new Float32Array(3 * this.instanceMatrix.count).fill(1), 3)), t.toArray(this.instanceColor.array, 3 * e), this;
  }
  setMatrixAt(e, t) {
    return t.toArray(this.instanceMatrix.array, 16 * e), this;
  }
  setMorphAt(e, t) {
    const n = t.morphTargetInfluences,
      r = n.length + 1;
    null === this.morphTexture && (this.morphTexture = new DataTexture(new Float32Array(r * this.count), r, this.count, RedFormat, ke));
    const i = this.morphTexture.source.data.data;
    let a = 0;
    for (let e = 0; e < n.length; e++) a += n[e];
    const s = this.geometry.morphTargetsRelative ? 1 : 1 - a,
      o = r * e;
    return i[o] = s, i.set(n, o + 1), this;
  }
  updateMorphTargets() {}
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    }), null !== this.morphTexture && (this.morphTexture.dispose(), this.morphTexture = null);
  }
}
const us = new Vector3(),
  ds = new Vector3(),
  hs = new Matrix3();
class Plane {
  constructor(normal = new Vector3(1, 0, 0), constant = 0) {
    this.isPlane = !0, this.normal = normal, this.constant = constant;
  }
  set(e, constant) {
    return this.normal.copy(e), this.constant = constant, this;
  }
  setComponents(e, t, n, constant) {
    return this.normal.set(e, t, n), this.constant = constant, this;
  }
  setFromNormalAndCoplanarPoint(e, t) {
    return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
  }
  setFromCoplanarPoints(e, t, n) {
    const r = us.subVectors(n, t).cross(ds.subVectors(e, t)).normalize();
    return this.setFromNormalAndCoplanarPoint(r, e), this;
  }
  copy(e) {
    return this.normal.copy(e.normal), this.constant = e.constant, this;
  }
  normalize() {
    const constant = 1 / this.normal.length();
    return this.normal.multiplyScalar(constant), this.constant *= constant, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  projectPoint(e, t) {
    return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  intersectLine(e, t, n = !0) {
    const r = e.delta(us),
      i = this.normal.dot(r);
    if (0 === i) return 0 === this.distanceToPoint(e.start) ? t.copy(e.start) : null;
    const a = -(e.start.dot(this.normal) + this.constant) / i;
    return !0 === n && (a < 0 || a > 1) ? null : t.copy(e.start).addScaledVector(r, a);
  }
  intersectsLine(e) {
    const t = this.distanceToPoint(e.start),
      n = this.distanceToPoint(e.end);
    return t < 0 && n > 0 || n < 0 && t > 0;
  }
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(e, t) {
    const n = t || hs.getNormalMatrix(e),
      r = this.coplanarPoint(us).applyMatrix4(e),
      i = this.normal.applyMatrix3(n).normalize();
    return this.constant = -r.dot(i), this;
  }
  translate(e) {
    return this.constant -= e.dot(this.normal), this;
  }
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const ps = new Sphere(),
  fs = new Vector2(.5, .5),
  ms = new Vector3();
class Frustum {
  constructor(e = new Plane(), t = new Plane(), n = new Plane(), r = new Plane(), i = new Plane(), a = new Plane()) {
    this.planes = [e, t, n, r, i, a];
  }
  set(e, t, n, r, i, a) {
    const planes = this.planes;
    return planes[0].copy(e), planes[1].copy(t), planes[2].copy(n), planes[3].copy(r), planes[4].copy(i), planes[5].copy(a), this;
  }
  copy(e) {
    const planes = this.planes;
    for (let n = 0; n < 6; n++) planes[n].copy(e.planes[n]);
    return this;
  }
  setFromProjectionMatrix(e, t = Vn, n = !1) {
    const planes = this.planes,
      i = e.elements,
      a = i[0],
      s = i[1],
      o = i[2],
      c = i[3],
      l = i[4],
      u = i[5],
      d = i[6],
      h = i[7],
      p = i[8],
      f = i[9],
      m = i[10],
      M = i[11],
      _ = i[12],
      A = i[13],
      g = i[14],
      b = i[15];
    if (planes[0].setComponents(c - a, h - l, M - p, b - _).normalize(), planes[1].setComponents(c + a, h + l, M + p, b + _).normalize(), planes[2].setComponents(c + s, h + u, M + f, b + A).normalize(), planes[3].setComponents(c - s, h - u, M - f, b - A).normalize(), n) planes[4].setComponents(o, d, m, g).normalize(), planes[5].setComponents(c - o, h - d, M - m, b - g).normalize();else if (planes[4].setComponents(c - o, h - d, M - m, b - g).normalize(), t === Vn) planes[5].setComponents(c + o, h + d, M + m, b + g).normalize();else {
      if (t !== WebGPUCoordinateSystem) throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
      planes[5].setComponents(o, d, m, g).normalize();
    }
    return this;
  }
  intersectsObject(e) {
    if (void 0 !== e.boundingSphere) null === e.boundingSphere && e.computeBoundingSphere(), ps.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else {
      const t = e.geometry;
      null === t.boundingSphere && t.computeBoundingSphere(), ps.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(ps);
  }
  intersectsSprite(e) {
    ps.center.set(0, 0, 0);
    const t = fs.distanceTo(e.center);
    return ps.radius = .7071067811865476 + t, ps.applyMatrix4(e.matrixWorld), this.intersectsSphere(ps);
  }
  intersectsSphere(e) {
    const planes = this.planes,
      n = e.center,
      r = -e.radius;
    for (let e = 0; e < 6; e++) {
      if (planes[e].distanceToPoint(n) < r) return !1;
    }
    return !0;
  }
  intersectsBox(e) {
    const planes = this.planes;
    for (let n = 0; n < 6; n++) {
      const r = planes[n];
      if (ms.x = r.normal.x > 0 ? e.max.x : e.min.x, ms.y = r.normal.y > 0 ? e.max.y : e.min.y, ms.z = r.normal.z > 0 ? e.max.z : e.min.z, r.distanceToPoint(ms) < 0) return !1;
    }
    return !0;
  }
  containsPoint(e) {
    const planes = this.planes;
    for (let n = 0; n < 6; n++) if (planes[n].distanceToPoint(e) < 0) return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Ms = new Matrix4();
class FrustumArray {
  constructor() {
    this.coordinateSystem = Vn, this._frustums = [], this._count = 0;
  }
  setFromArrayCamera(e) {
    const t = e.cameras,
      frustums = this._frustums;
    for (let e = 0; e < t.length; e++) {
      const r = t[e];
      Ms.multiplyMatrices(r.projectionMatrix, r.matrixWorldInverse), void 0 === frustums[e] && (frustums[e] = new Frustum()), frustums[e].setFromProjectionMatrix(Ms, r.coordinateSystem, r.reversedDepth);
    }
    return this._count = t.length, this;
  }
  intersectsObject(e) {
    const frustums = this._frustums;
    for (let n = 0; n < this._count; n++) if (frustums[n].intersectsObject(e)) return !0;
    return !1;
  }
  intersectsSprite(e) {
    const frustums = this._frustums;
    for (let n = 0; n < this._count; n++) if (frustums[n].intersectsSprite(e)) return !0;
    return !1;
  }
  intersectsSphere(e) {
    const frustums = this._frustums;
    for (let n = 0; n < this._count; n++) if (frustums[n].intersectsSphere(e)) return !0;
    return !1;
  }
  intersectsBox(e) {
    const frustums = this._frustums;
    for (let n = 0; n < this._count; n++) if (frustums[n].intersectsBox(e)) return !0;
    return !1;
  }
  containsPoint(e) {
    const frustums = this._frustums;
    for (let n = 0; n < this._count; n++) if (frustums[n].containsPoint(e)) return !0;
    return !1;
  }
  copy(e) {
    this.coordinateSystem = e.coordinateSystem;
    const frustums = this._frustums,
      n = e._frustums;
    for (let r = 0; r < e._count; r++) void 0 === frustums[r] && (frustums[r] = new Frustum()), frustums[r].copy(n[r]);
    return this._count = e._count, this;
  }
  clone() {
    return new FrustumArray().copy(this);
  }
}
function _s(e, t) {
  return e - t;
}
function As(e, t) {
  return e.z - t.z;
}
function gs(e, t) {
  return t.z - e.z;
}
class MultiDrawRenderList {
  constructor() {
    this.index = 0, this.pool = [], this.list = [];
  }
  push(e, t, n, r) {
    const pool = this.pool,
      list = this.list;
    this.index >= pool.length && pool.push({
      start: -1,
      count: -1,
      z: -1,
      index: -1
    });
    const s = pool[this.index];
    list.push(s), this.index++, s.start = e, s.count = t, s.z = n, s.index = r;
  }
  reset() {
    this.list.length = 0, this.index = 0;
  }
}
const bs = new Matrix4(),
  ys = new Color(1, 1, 1),
  frustum = new Frustum(),
  frustumArray = new FrustumArray(),
  Ts = new Box3(),
  Ss = new Sphere(),
  ws = new Vector3(),
  Es = new Vector3(),
  xs = new Vector3(),
  multiDrawRenderList = new MultiDrawRenderList(),
  zs = new Mesh(),
  Os = [];
function Bs(e, t, n = 0) {
  const r = t.itemSize;
  if (e.isInterleavedBufferAttribute || e.array.constructor !== t.array.constructor) {
    const i = e.count;
    for (let a = 0; a < i; a++) for (let i = 0; i < r; i++) t.setComponent(a + n, i, e.getComponent(a, i));
  } else t.array.set(e.array, n * r);
  t.needsUpdate = !0;
}
function Ds(e, t) {
  if (e.constructor !== t.constructor) {
    const n = Math.min(e.length, t.length);
    for (let r = 0; r < n; r++) t[r] = e[r];
  } else {
    const n = Math.min(e.length, t.length);
    t.set(new e.constructor(e.buffer, 0, n));
  }
}
class BatchedMesh extends Mesh {
  constructor(maxInstanceCount, maxVertexCount, maxIndexCount = 2 * maxVertexCount, r) {
    super(new BufferGeometry(), r), this.isBatchedMesh = !0, this.perObjectFrustumCulled = !0, this.sortObjects = !0, this.boundingBox = null, this.boundingSphere = null, this.customSort = null, this._instanceInfo = [], this._geometryInfo = [], this._availableInstanceIds = [], this._availableGeometryIds = [], this._nextIndexStart = 0, this._nextVertexStart = 0, this._geometryCount = 0, this._visibilityChanged = !0, this._geometryInitialized = !1, this._maxInstanceCount = maxInstanceCount, this._maxVertexCount = maxVertexCount, this._maxIndexCount = maxIndexCount, this._multiDrawCounts = new Int32Array(maxInstanceCount), this._multiDrawStarts = new Int32Array(maxInstanceCount), this._multiDrawCount = 0, this._matricesTexture = null, this._indirectTexture = null, this._colorsTexture = null, this._initMatricesTexture(), this._initIndirectTexture();
  }
  get maxInstanceCount() {
    return this._maxInstanceCount;
  }
  get instanceCount() {
    return this._instanceInfo.length - this._availableInstanceIds.length;
  }
  get unusedVertexCount() {
    return this._maxVertexCount - this._nextVertexStart;
  }
  get unusedIndexCount() {
    return this._maxIndexCount - this._nextIndexStart;
  }
  _initMatricesTexture() {
    let e = Math.sqrt(4 * this._maxInstanceCount);
    e = 4 * Math.ceil(e / 4), e = Math.max(e, 4);
    const float32Array = new Float32Array(e * e * 4),
      n = new DataTexture(float32Array, e, e, RGBAFormat, ke);
    this._matricesTexture = n;
  }
  _initIndirectTexture() {
    let e = Math.sqrt(this._maxInstanceCount);
    e = Math.ceil(e);
    const uint32Array = new Uint32Array(e * e),
      n = new DataTexture(uint32Array, e, e, RedIntegerFormat, UnsignedIntType);
    this._indirectTexture = n;
  }
  _initColorsTexture() {
    let e = Math.sqrt(this._maxInstanceCount);
    e = Math.ceil(e);
    const t = new Float32Array(e * e * 4).fill(1),
      n = new DataTexture(t, e, e, RGBAFormat, ke);
    n.colorSpace = ColorManagement.workingColorSpace, this._colorsTexture = n;
  }
  _initializeGeometry(e) {
    const t = this.geometry,
      maxVertexCount = this._maxVertexCount,
      maxIndexCount = this._maxIndexCount;
    if (!1 === this._geometryInitialized) {
      for (const r in e.attributes) {
        const i = e.getAttribute(r),
          {
            array: array,
            itemSize: itemSize,
            normalized: normalized
          } = i,
          constructor = new array.constructor(maxVertexCount * itemSize),
          bufferAttribute = new BufferAttribute(constructor, itemSize, normalized);
        t.setAttribute(r, bufferAttribute);
      }
      if (null !== e.getIndex()) {
        const e = maxVertexCount > 65535 ? new Uint32Array(maxIndexCount) : new Uint16Array(maxIndexCount);
        t.setIndex(new BufferAttribute(e, 1));
      }
      this._geometryInitialized = !0;
    }
  }
  _validateGeometry(e) {
    const t = this.geometry;
    if (Boolean(e.getIndex()) !== Boolean(t.getIndex())) throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');
    for (const n in t.attributes) {
      if (!e.hasAttribute(n)) throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);
      const r = e.getAttribute(n),
        i = t.getAttribute(n);
      if (r.itemSize !== i.itemSize || r.normalized !== i.normalized) throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.");
    }
  }
  validateInstanceId(e) {
    const instanceInfo = this._instanceInfo;
    if (e < 0 || e >= instanceInfo.length || !1 === instanceInfo[e].active) throw new Error(`THREE.BatchedMesh: Invalid instanceId ${e}. Instance is either out of range or has been deleted.`);
  }
  validateGeometryId(e) {
    const geometryInfo = this._geometryInfo;
    if (e < 0 || e >= geometryInfo.length || !1 === geometryInfo[e].active) throw new Error(`THREE.BatchedMesh: Invalid geometryId ${e}. Geometry is either out of range or has been deleted.`);
  }
  setCustomSort(customSort) {
    return this.customSort = customSort, this;
  }
  computeBoundingBox() {
    null === this.boundingBox && (this.boundingBox = new Box3());
    const boundingBox = this.boundingBox,
      instanceInfo = this._instanceInfo;
    boundingBox.makeEmpty();
    for (let n = 0, r = instanceInfo.length; n < r; n++) {
      if (!1 === instanceInfo[n].active) continue;
      const r = instanceInfo[n].geometryIndex;
      this.getMatrixAt(n, bs), this.getBoundingBoxAt(r, Ts).applyMatrix4(bs), boundingBox.union(Ts);
    }
  }
  computeBoundingSphere() {
    null === this.boundingSphere && (this.boundingSphere = new Sphere());
    const boundingSphere = this.boundingSphere,
      instanceInfo = this._instanceInfo;
    boundingSphere.makeEmpty();
    for (let n = 0, r = instanceInfo.length; n < r; n++) {
      if (!1 === instanceInfo[n].active) continue;
      const r = instanceInfo[n].geometryIndex;
      this.getMatrixAt(n, bs), this.getBoundingSphereAt(r, Ss).applyMatrix4(bs), boundingSphere.union(Ss);
    }
  }
  addInstance(e) {
    if (this._instanceInfo.length >= this.maxInstanceCount && 0 === this._availableInstanceIds.length) throw new Error("THREE.BatchedMesh: Maximum item count reached.");
    const t = {
      visible: !0,
      active: !0,
      geometryIndex: e
    };
    let n = null;
    this._availableInstanceIds.length > 0 ? (this._availableInstanceIds.sort(_s), n = this._availableInstanceIds.shift(), this._instanceInfo[n] = t) : (n = this._instanceInfo.length, this._instanceInfo.push(t));
    const matricesTexture = this._matricesTexture;
    bs.identity().toArray(matricesTexture.image.data, 16 * n), matricesTexture.needsUpdate = !0;
    const colorsTexture = this._colorsTexture;
    return colorsTexture && (ys.toArray(colorsTexture.image.data, 4 * n), colorsTexture.needsUpdate = !0), this._visibilityChanged = !0, n;
  }
  addGeometry(e, t = -1, n = -1) {
    this._initializeGeometry(e), this._validateGeometry(e);
    const r = {
        vertexStart: -1,
        vertexCount: -1,
        reservedVertexCount: -1,
        indexStart: -1,
        indexCount: -1,
        reservedIndexCount: -1,
        start: -1,
        count: -1,
        boundingBox: null,
        boundingSphere: null,
        active: !0
      },
      geometryInfo = this._geometryInfo;
    r.vertexStart = this._nextVertexStart, r.reservedVertexCount = -1 === t ? e.getAttribute("position").count : t;
    const a = e.getIndex();
    if (null !== a && (r.indexStart = this._nextIndexStart, r.reservedIndexCount = -1 === n ? a.count : n), -1 !== r.indexStart && r.indexStart + r.reservedIndexCount > this._maxIndexCount || r.vertexStart + r.reservedVertexCount > this._maxVertexCount) throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");
    let s;
    return this._availableGeometryIds.length > 0 ? (this._availableGeometryIds.sort(_s), s = this._availableGeometryIds.shift(), geometryInfo[s] = r) : (s = this._geometryCount, this._geometryCount++, geometryInfo.push(r)), this.setGeometryAt(s, e), this._nextIndexStart = r.indexStart + r.reservedIndexCount, this._nextVertexStart = r.vertexStart + r.reservedVertexCount, s;
  }
  setGeometryAt(e, t) {
    if (e >= this._geometryCount) throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");
    this._validateGeometry(t);
    const n = this.geometry,
      r = null !== n.getIndex(),
      i = n.getIndex(),
      a = t.getIndex(),
      s = this._geometryInfo[e];
    if (r && a.count > s.reservedIndexCount || t.attributes.position.count > s.reservedVertexCount) throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");
    const o = s.vertexStart,
      c = s.reservedVertexCount;
    s.vertexCount = t.getAttribute("position").count;
    for (const e in n.attributes) {
      const r = t.getAttribute(e),
        i = n.getAttribute(e);
      Bs(r, i, o);
      const a = r.itemSize;
      for (let e = r.count, t = c; e < t; e++) {
        const t = o + e;
        for (let e = 0; e < a; e++) i.setComponent(t, e, 0);
      }
      i.needsUpdate = !0, i.addUpdateRange(o * a, c * a);
    }
    if (r) {
      const e = s.indexStart,
        n = s.reservedIndexCount;
      s.indexCount = t.getIndex().count;
      for (let t = 0; t < a.count; t++) i.setX(e + t, o + a.getX(t));
      for (let t = a.count, r = n; t < r; t++) i.setX(e + t, o);
      i.needsUpdate = !0, i.addUpdateRange(e, s.reservedIndexCount);
    }
    return s.start = r ? s.indexStart : s.vertexStart, s.count = r ? s.indexCount : s.vertexCount, s.boundingBox = null, null !== t.boundingBox && (s.boundingBox = t.boundingBox.clone()), s.boundingSphere = null, null !== t.boundingSphere && (s.boundingSphere = t.boundingSphere.clone()), this._visibilityChanged = !0, e;
  }
  deleteGeometry(e) {
    const geometryInfo = this._geometryInfo;
    if (e >= geometryInfo.length || !1 === geometryInfo[e].active) return this;
    const instanceInfo = this._instanceInfo;
    for (let t = 0, r = instanceInfo.length; t < r; t++) instanceInfo[t].active && instanceInfo[t].geometryIndex === e && this.deleteInstance(t);
    return geometryInfo[e].active = !1, this._availableGeometryIds.push(e), this._visibilityChanged = !0, this;
  }
  deleteInstance(e) {
    return this.validateInstanceId(e), this._instanceInfo[e].active = !1, this._availableInstanceIds.push(e), this._visibilityChanged = !0, this;
  }
  optimize() {
    let nextVertexStart = 0,
      nextIndexStart = 0;
    const geometryInfo = this._geometryInfo,
      r = geometryInfo.map((e, t) => t).sort((e, t) => geometryInfo[e].vertexStart - geometryInfo[t].vertexStart),
      i = this.geometry;
    for (let a = 0, s = geometryInfo.length; a < s; a++) {
      const s = r[a],
        o = geometryInfo[s];
      if (!1 !== o.active) {
        if (null !== i.index) {
          if (o.indexStart !== nextIndexStart) {
            const {
                indexStart: indexStart,
                vertexStart: vertexStart,
                reservedIndexCount: reservedIndexCount
              } = o,
              s = i.index,
              c = s.array,
              l = nextVertexStart - vertexStart;
            for (let e = indexStart; e < indexStart + reservedIndexCount; e++) c[e] = c[e] + l;
            s.array.copyWithin(nextIndexStart, indexStart, indexStart + reservedIndexCount), s.addUpdateRange(nextIndexStart, reservedIndexCount), s.needsUpdate = !0, o.indexStart = nextIndexStart;
          }
          nextIndexStart += o.reservedIndexCount;
        }
        if (o.vertexStart !== nextVertexStart) {
          const {
              vertexStart: vertexStart,
              reservedVertexCount: reservedVertexCount
            } = o,
            r = i.attributes;
          for (const i in r) {
            const a = r[i],
              {
                array: array,
                itemSize: itemSize
              } = a;
            array.copyWithin(nextVertexStart * itemSize, vertexStart * itemSize, (vertexStart + reservedVertexCount) * itemSize), a.addUpdateRange(nextVertexStart * itemSize, reservedVertexCount * itemSize), a.needsUpdate = !0;
          }
          o.vertexStart = nextVertexStart;
        }
        nextVertexStart += o.reservedVertexCount, o.start = i.index ? o.indexStart : o.vertexStart;
      }
    }
    return this._nextIndexStart = nextIndexStart, this._nextVertexStart = nextVertexStart, this._visibilityChanged = !0, this;
  }
  getBoundingBoxAt(e, t) {
    if (e >= this._geometryCount) return null;
    const n = this.geometry,
      r = this._geometryInfo[e];
    if (null === r.boundingBox) {
      const e = new Box3(),
        t = n.index,
        i = n.attributes.position;
      for (let n = r.start, a = r.start + r.count; n < a; n++) {
        let r = n;
        t && (r = t.getX(r)), e.expandByPoint(ws.fromBufferAttribute(i, r));
      }
      r.boundingBox = e;
    }
    return t.copy(r.boundingBox), t;
  }
  getBoundingSphereAt(e, t) {
    if (e >= this._geometryCount) return null;
    const n = this.geometry,
      r = this._geometryInfo[e];
    if (null === r.boundingSphere) {
      const t = new Sphere();
      this.getBoundingBoxAt(e, Ts), Ts.getCenter(t.center);
      const i = n.index,
        a = n.attributes.position;
      let s = 0;
      for (let e = r.start, n = r.start + r.count; e < n; e++) {
        let n = e;
        i && (n = i.getX(n)), ws.fromBufferAttribute(a, n), s = Math.max(s, t.center.distanceToSquared(ws));
      }
      t.radius = Math.sqrt(s), r.boundingSphere = t;
    }
    return t.copy(r.boundingSphere), t;
  }
  setMatrixAt(e, t) {
    this.validateInstanceId(e);
    const matricesTexture = this._matricesTexture,
      r = this._matricesTexture.image.data;
    return t.toArray(r, 16 * e), matricesTexture.needsUpdate = !0, this;
  }
  getMatrixAt(e, t) {
    return this.validateInstanceId(e), t.fromArray(this._matricesTexture.image.data, 16 * e);
  }
  setColorAt(e, t) {
    return this.validateInstanceId(e), null === this._colorsTexture && this._initColorsTexture(), t.toArray(this._colorsTexture.image.data, 4 * e), this._colorsTexture.needsUpdate = !0, this;
  }
  getColorAt(e, t) {
    return this.validateInstanceId(e), null === this._colorsTexture ? t.isVector4 ? t.set(1, 1, 1, 1) : t.setRGB(1, 1, 1) : t.fromArray(this._colorsTexture.image.data, 4 * e);
  }
  setVisibleAt(e, t) {
    return this.validateInstanceId(e), this._instanceInfo[e].visible === t || (this._instanceInfo[e].visible = t, this._visibilityChanged = !0), this;
  }
  getVisibleAt(e) {
    return this.validateInstanceId(e), this._instanceInfo[e].visible;
  }
  setGeometryIdAt(e, t) {
    return this.validateInstanceId(e), this.validateGeometryId(t), this._instanceInfo[e].geometryIndex = t, this;
  }
  getGeometryIdAt(e) {
    return this.validateInstanceId(e), this._instanceInfo[e].geometryIndex;
  }
  getGeometryRangeAt(e, t = {}) {
    this.validateGeometryId(e);
    const n = this._geometryInfo[e];
    return t.vertexStart = n.vertexStart, t.vertexCount = n.vertexCount, t.reservedVertexCount = n.reservedVertexCount, t.indexStart = n.indexStart, t.indexCount = n.indexCount, t.reservedIndexCount = n.reservedIndexCount, t.start = n.start, t.count = n.count, t;
  }
  setInstanceCount(maxInstanceCount) {
    const availableInstanceIds = this._availableInstanceIds,
      instanceInfo = this._instanceInfo;
    for (availableInstanceIds.sort(_s); availableInstanceIds[availableInstanceIds.length - 1] === instanceInfo.length - 1;) instanceInfo.pop(), availableInstanceIds.pop();
    if (maxInstanceCount < instanceInfo.length) throw new Error(`THREE.BatchedMesh: Instance ids outside the range ${maxInstanceCount} are being used. Cannot shrink instance count.`);
    const r = new Int32Array(maxInstanceCount),
      i = new Int32Array(maxInstanceCount);
    Ds(this._multiDrawCounts, r), Ds(this._multiDrawStarts, i), this._multiDrawCounts = r, this._multiDrawStarts = i, this._maxInstanceCount = maxInstanceCount;
    const indirectTexture = this._indirectTexture,
      matricesTexture = this._matricesTexture,
      colorsTexture = this._colorsTexture;
    indirectTexture.dispose(), this._initIndirectTexture(), Ds(indirectTexture.image.data, this._indirectTexture.image.data), matricesTexture.dispose(), this._initMatricesTexture(), Ds(matricesTexture.image.data, this._matricesTexture.image.data), colorsTexture && (colorsTexture.dispose(), this._initColorsTexture(), Ds(colorsTexture.image.data, this._colorsTexture.image.data));
  }
  setGeometrySize(maxVertexCount, maxIndexCount) {
    const n = [...this._geometryInfo].filter(e => e.active);
    if (Math.max(...n.map(e => e.vertexStart + e.reservedVertexCount)) > maxVertexCount) throw new Error(`THREE.BatchedMesh: Geometry vertex values are being used outside the range ${maxIndexCount}. Cannot shrink further.`);
    if (this.geometry.index) {
      if (Math.max(...n.map(e => e.indexStart + e.reservedIndexCount)) > maxIndexCount) throw new Error(`THREE.BatchedMesh: Geometry index values are being used outside the range ${maxIndexCount}. Cannot shrink further.`);
    }
    const r = this.geometry;
    r.dispose(), this._maxVertexCount = maxVertexCount, this._maxIndexCount = maxIndexCount, this._geometryInitialized && (this._geometryInitialized = !1, this.geometry = new BufferGeometry(), this._initializeGeometry(r));
    const i = this.geometry;
    r.index && Ds(r.index.array, i.index.array);
    for (const e in r.attributes) Ds(r.attributes[e].array, i.attributes[e].array);
  }
  raycast(e, t) {
    const instanceInfo = this._instanceInfo,
      geometryInfo = this._geometryInfo,
      matrixWorld = this.matrixWorld,
      a = this.geometry;
    zs.material = this.material, zs.geometry.index = a.index, zs.geometry.attributes = a.attributes, null === zs.geometry.boundingBox && (zs.geometry.boundingBox = new Box3()), null === zs.geometry.boundingSphere && (zs.geometry.boundingSphere = new Sphere());
    for (let a = 0, s = instanceInfo.length; a < s; a++) {
      if (!instanceInfo[a].visible || !instanceInfo[a].active) continue;
      const s = instanceInfo[a].geometryIndex,
        o = geometryInfo[s];
      zs.geometry.setDrawRange(o.start, o.count), this.getMatrixAt(a, zs.matrixWorld).premultiply(matrixWorld), this.getBoundingBoxAt(s, zs.geometry.boundingBox), this.getBoundingSphereAt(s, zs.geometry.boundingSphere), zs.raycast(e, Os);
      for (let e = 0, n = Os.length; e < n; e++) {
        const n = Os[e];
        n.object = this, n.batchId = a, t.push(n);
      }
      Os.length = 0;
    }
    zs.material = null, zs.geometry.index = null, zs.geometry.attributes = {}, zs.geometry.setDrawRange(0, 1 / 0);
  }
  copy(e) {
    return super.copy(e), this.geometry = e.geometry.clone(), this.perObjectFrustumCulled = e.perObjectFrustumCulled, this.sortObjects = e.sortObjects, this.boundingBox = null !== e.boundingBox ? e.boundingBox.clone() : null, this.boundingSphere = null !== e.boundingSphere ? e.boundingSphere.clone() : null, this._geometryInfo = e._geometryInfo.map(e => ({
      ...e,
      boundingBox: null !== e.boundingBox ? e.boundingBox.clone() : null,
      boundingSphere: null !== e.boundingSphere ? e.boundingSphere.clone() : null
    })), this._instanceInfo = e._instanceInfo.map(e => ({
      ...e
    })), this._availableInstanceIds = e._availableInstanceIds.slice(), this._availableGeometryIds = e._availableGeometryIds.slice(), this._nextIndexStart = e._nextIndexStart, this._nextVertexStart = e._nextVertexStart, this._geometryCount = e._geometryCount, this._maxInstanceCount = e._maxInstanceCount, this._maxVertexCount = e._maxVertexCount, this._maxIndexCount = e._maxIndexCount, this._geometryInitialized = e._geometryInitialized, this._multiDrawCounts = e._multiDrawCounts.slice(), this._multiDrawStarts = e._multiDrawStarts.slice(), this._indirectTexture = e._indirectTexture.clone(), this._indirectTexture.image.data = this._indirectTexture.image.data.slice(), this._matricesTexture = e._matricesTexture.clone(), this._matricesTexture.image.data = this._matricesTexture.image.data.slice(), null !== this._colorsTexture && (this._colorsTexture = e._colorsTexture.clone(), this._colorsTexture.image.data = this._colorsTexture.image.data.slice()), this;
  }
  dispose() {
    this.geometry.dispose(), this._matricesTexture.dispose(), this._matricesTexture = null, this._indirectTexture.dispose(), this._indirectTexture = null, null !== this._colorsTexture && (this._colorsTexture.dispose(), this._colorsTexture = null);
  }
  onBeforeRender(e, t, n, r, i) {
    if (!this._visibilityChanged && !this.perObjectFrustumCulled && !this.sortObjects) return;
    const a = r.getIndex();
    let s = null === a ? 1 : a.array.BYTES_PER_ELEMENT,
      o = 1;
    i.wireframe && (o = 2, s = r.attributes.position.count > 65535 ? 4 : 2);
    const instanceInfo = this._instanceInfo,
      multiDrawStarts = this._multiDrawStarts,
      multiDrawCounts = this._multiDrawCounts,
      geometryInfo = this._geometryInfo,
      perObjectFrustumCulled = this.perObjectFrustumCulled,
      indirectTexture = this._indirectTexture,
      f = indirectTexture.image.data,
      m = n.isArrayCamera ? frustumArray : frustum;
    perObjectFrustumCulled && (n.isArrayCamera ? m.setFromArrayCamera(n) : (bs.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse).multiply(this.matrixWorld), m.setFromProjectionMatrix(bs, n.coordinateSystem, n.reversedDepth)));
    let multiDrawCount = 0;
    if (this.sortObjects) {
      bs.copy(this.matrixWorld).invert(), ws.setFromMatrixPosition(n.matrixWorld).applyMatrix4(bs), Es.set(0, 0, -1).transformDirection(n.matrixWorld).transformDirection(bs);
      for (let e = 0, t = instanceInfo.length; e < t; e++) if (instanceInfo[e].visible && instanceInfo[e].active) {
        const t = instanceInfo[e].geometryIndex;
        this.getMatrixAt(e, bs), this.getBoundingSphereAt(t, Ss).applyMatrix4(bs);
        let n = !1;
        if (perObjectFrustumCulled && (n = !m.intersectsSphere(Ss)), !n) {
          const n = geometryInfo[t],
            r = xs.subVectors(Ss.center, ws).dot(Es);
          multiDrawRenderList.push(n.start, n.count, r, e);
        }
      }
      const e = multiDrawRenderList.list,
        customSort = this.customSort;
      null === customSort ? e.sort(i.transparent ? gs : As) : customSort.call(this, e, n);
      for (let t = 0, n = e.length; t < n; t++) {
        const n = e[t];
        multiDrawStarts[multiDrawCount] = n.start * s * o, multiDrawCounts[multiDrawCount] = n.count * o, f[multiDrawCount] = n.index, multiDrawCount++;
      }
      multiDrawRenderList.reset();
    } else for (let e = 0, t = instanceInfo.length; e < t; e++) if (instanceInfo[e].visible && instanceInfo[e].active) {
      const t = instanceInfo[e].geometryIndex;
      let n = !1;
      if (perObjectFrustumCulled && (this.getMatrixAt(e, bs), this.getBoundingSphereAt(t, Ss).applyMatrix4(bs), n = !m.intersectsSphere(Ss)), !n) {
        const n = geometryInfo[t];
        multiDrawStarts[multiDrawCount] = n.start * s * o, multiDrawCounts[multiDrawCount] = n.count * o, f[multiDrawCount] = e, multiDrawCount++;
      }
    }
    indirectTexture.needsUpdate = !0, this._multiDrawCount = multiDrawCount, this._visibilityChanged = !1;
  }
  onBeforeShadow(e, t, n, r, i, a) {
    this.onBeforeRender(e, null, r, i, a);
  }
}
class LineBasicMaterial extends Material {
  constructor(e) {
    super(), this.isLineBasicMaterial = !0, this.type = "LineBasicMaterial", this.color = new Color(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.linewidth = e.linewidth, this.linecap = e.linecap, this.linejoin = e.linejoin, this.fog = e.fog, this;
  }
}
const Ns = new Vector3(),
  Is = new Vector3(),
  Rs = new Matrix4(),
  ks = new Ray(),
  Ps = new Sphere(),
  Ys = new Vector3(),
  Ws = new Vector3();
class Line extends Object3D {
  constructor(e = new BufferGeometry(), material = new LineBasicMaterial()) {
    super(), this.isLine = !0, this.type = "Line", this.geometry = e, this.material = material, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  computeLineDistances() {
    const e = this.geometry;
    if (null === e.index) {
      const t = e.attributes.position,
        n = [0];
      for (let e = 1, r = t.count; e < r; e++) Ns.fromBufferAttribute(t, e - 1), Is.fromBufferAttribute(t, e), n[e] = n[e - 1], n[e] += Ns.distanceTo(Is);
      e.setAttribute("lineDistance", new Float32BufferAttribute(n, 1));
    } else warn("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
  raycast(e, t) {
    const n = this.geometry,
      matrixWorld = this.matrixWorld,
      i = e.params.Line.threshold,
      a = n.drawRange;
    if (null === n.boundingSphere && n.computeBoundingSphere(), Ps.copy(n.boundingSphere), Ps.applyMatrix4(matrixWorld), Ps.radius += i, !1 === e.ray.intersectsSphere(Ps)) return;
    Rs.copy(matrixWorld).invert(), ks.copy(e.ray).applyMatrix4(Rs);
    const s = i / ((this.scale.x + this.scale.y + this.scale.z) / 3),
      o = s * s,
      c = this.isLineSegments ? 2 : 1,
      l = n.index,
      u = n.attributes.position;
    if (null !== l) {
      const n = Math.max(0, a.start),
        r = Math.min(l.count, a.start + a.count);
      for (let i = n, a = r - 1; i < a; i += c) {
        const n = l.getX(i),
          r = l.getX(i + 1),
          a = Fs(this, e, ks, o, n, r, i);
        a && t.push(a);
      }
      if (this.isLineLoop) {
        const i = l.getX(r - 1),
          a = l.getX(n),
          s = Fs(this, e, ks, o, i, a, r - 1);
        s && t.push(s);
      }
    } else {
      const n = Math.max(0, a.start),
        r = Math.min(u.count, a.start + a.count);
      for (let i = n, a = r - 1; i < a; i += c) {
        const n = Fs(this, e, ks, o, i, i + 1, i);
        n && t.push(n);
      }
      if (this.isLineLoop) {
        const i = Fs(this, e, ks, o, r - 1, n, r - 1);
        i && t.push(i);
      }
    }
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes,
      t = Object.keys(e);
    if (t.length > 0) {
      const n = e[t[0]];
      if (void 0 !== n) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let e = 0, t = n.length; e < t; e++) {
          const t = n[e].name || String(e);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e;
        }
      }
    }
  }
}
function Fs(e, t, n, r, i, a, s) {
  const o = e.geometry.attributes.position;
  Ns.fromBufferAttribute(o, i), Is.fromBufferAttribute(o, a);
  if (n.distanceSqToSegment(Ns, Is, Ys, Ws) > r) return;
  Ys.applyMatrix4(e.matrixWorld);
  const c = t.ray.origin.distanceTo(Ys);
  return c < t.near || c > t.far ? void 0 : {
    distance: c,
    point: Ws.clone().applyMatrix4(e.matrixWorld),
    index: s,
    face: null,
    faceIndex: null,
    barycoord: null,
    object: e
  };
}
const qs = new Vector3(),
  Hs = new Vector3();
class LineSegments extends Line {
  constructor(e, t) {
    super(e, t), this.isLineSegments = !0, this.type = "LineSegments";
  }
  computeLineDistances() {
    const e = this.geometry;
    if (null === e.index) {
      const t = e.attributes.position,
        n = [];
      for (let e = 0, r = t.count; e < r; e += 2) qs.fromBufferAttribute(t, e), Hs.fromBufferAttribute(t, e + 1), n[e] = 0 === e ? 0 : n[e - 1], n[e + 1] = n[e] + qs.distanceTo(Hs);
      e.setAttribute("lineDistance", new Float32BufferAttribute(n, 1));
    } else warn("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
}
class LineLoop extends Line {
  constructor(e, t) {
    super(e, t), this.isLineLoop = !0, this.type = "LineLoop";
  }
}
class PointsMaterial extends Material {
  constructor(e) {
    super(), this.isPointsMaterial = !0, this.type = "PointsMaterial", this.color = new Color(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.size = e.size, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this;
  }
}
const Us = new Matrix4(),
  Gs = new Ray(),
  Xs = new Sphere(),
  js = new Vector3();
class Points extends Object3D {
  constructor(e = new BufferGeometry(), material = new PointsMaterial()) {
    super(), this.isPoints = !0, this.type = "Points", this.geometry = e, this.material = material, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  raycast(e, t) {
    const n = this.geometry,
      matrixWorld = this.matrixWorld,
      i = e.params.Points.threshold,
      a = n.drawRange;
    if (null === n.boundingSphere && n.computeBoundingSphere(), Xs.copy(n.boundingSphere), Xs.applyMatrix4(matrixWorld), Xs.radius += i, !1 === e.ray.intersectsSphere(Xs)) return;
    Us.copy(matrixWorld).invert(), Gs.copy(e.ray).applyMatrix4(Us);
    const s = i / ((this.scale.x + this.scale.y + this.scale.z) / 3),
      o = s * s,
      c = n.index,
      l = n.attributes.position;
    if (null !== c) {
      for (let n = Math.max(0, a.start), i = Math.min(c.count, a.start + a.count); n < i; n++) {
        const i = c.getX(n);
        js.fromBufferAttribute(l, i), Vs(js, i, o, matrixWorld, e, t, this);
      }
    } else {
      for (let n = Math.max(0, a.start), i = Math.min(l.count, a.start + a.count); n < i; n++) js.fromBufferAttribute(l, n), Vs(js, n, o, matrixWorld, e, t, this);
    }
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes,
      t = Object.keys(e);
    if (t.length > 0) {
      const n = e[t[0]];
      if (void 0 !== n) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let e = 0, t = n.length; e < t; e++) {
          const t = n[e].name || String(e);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e;
        }
      }
    }
  }
}
function Vs(e, t, n, r, i, a, s) {
  const o = Gs.distanceSqToPoint(e);
  if (o < n) {
    const n = new Vector3();
    Gs.closestPointToPoint(e, n), n.applyMatrix4(r);
    const c = i.ray.origin.distanceTo(n);
    if (c < i.near || c > i.far) return;
    a.push({
      distance: c,
      distanceToRay: Math.sqrt(o),
      point: n,
      index: t,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: s
    });
  }
}
class VideoTexture extends Texture {
  constructor(e, t, n, r, i = LinearFilter, a = LinearFilter, s, o, c) {
    super(e, t, n, r, i, a, s, o, c), this.isVideoTexture = !0, this.generateMipmaps = !1, this._requestVideoFrameCallbackId = 0;
    const l = this;
    "requestVideoFrameCallback" in e && (this._requestVideoFrameCallbackId = e.requestVideoFrameCallback(function t() {
      l.needsUpdate = !0, l._requestVideoFrameCallbackId = e.requestVideoFrameCallback(t);
    }));
  }
  clone() {
    return new this.constructor(this.image).copy(this);
  }
  update() {
    const image = this.image;
    !1 === "requestVideoFrameCallback" in image && image.readyState >= image.HAVE_CURRENT_DATA && (this.needsUpdate = !0);
  }
  dispose() {
    0 !== this._requestVideoFrameCallbackId && (this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId), this._requestVideoFrameCallbackId = 0), super.dispose();
  }
}
class VideoFrameTexture extends VideoTexture {
  constructor(e, t, n, r, i, a, s, o) {
    super({}, e, t, n, r, i, a, s, o), this.isVideoFrameTexture = !0;
  }
  update() {}
  clone() {
    return new this.constructor().copy(this);
  }
  setFrame(image) {
    this.image = image, this.needsUpdate = !0;
  }
}
class FramebufferTexture extends Texture {
  constructor(e, t) {
    super({
      width: e,
      height: t
    }), this.isFramebufferTexture = !0, this.magFilter = ye, this.minFilter = ye, this.generateMipmaps = !1, this.needsUpdate = !0;
  }
}
class CompressedTexture extends Texture {
  constructor(mipmaps, t, n, r, i, a, s, o, c, l, u, d) {
    super(null, a, s, o, c, l, r, i, u, d), this.isCompressedTexture = !0, this.image = {
      width: t,
      height: n
    }, this.mipmaps = mipmaps, this.flipY = !1, this.generateMipmaps = !1;
  }
}
class CompressedArrayTexture extends CompressedTexture {
  constructor(e, t, n, r, i, a) {
    super(e, t, n, i, a), this.isCompressedArrayTexture = !0, this.image.depth = r, this.wrapR = ge, this.layerUpdates = new Set();
  }
  addLayerUpdate(e) {
    this.layerUpdates.add(e);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class CompressedCubeTexture extends CompressedTexture {
  constructor(image, t, n) {
    super(void 0, image[0].width, image[0].height, t, n, CubeReflectionMapping), this.isCompressedCubeTexture = !0, this.isCubeTexture = !0, this.image = image;
  }
}
class CubeTexture extends Texture {
  constructor(e = [], t = CubeReflectionMapping, n, r, i, a, s, o, c, l) {
    super(e, t, n, r, i, a, s, o, c, l), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(image) {
    this.image = image;
  }
}
class CanvasTexture extends Texture {
  constructor(e, t, n, r, i, a, s, o, c) {
    super(e, t, n, r, i, a, s, o, c), this.isCanvasTexture = !0, this.needsUpdate = !0;
  }
}
class HTMLTexture extends Texture {
  constructor(e, t, n, r, i, a, s, o, c) {
    super(e, t, n, r, i, a, s, o, c), this.isHTMLTexture = !0, this.generateMipmaps = !1, this.needsUpdate = !0;
    const l = e ? e.parentNode : null;
    null !== l && "requestPaint" in l && (l.onpaint = () => {
      this.needsUpdate = !0;
    }, l.requestPaint());
  }
  dispose() {
    const e = this.image ? this.image.parentNode : null;
    null !== e && "onpaint" in e && (e.onpaint = null), super.dispose();
  }
}
class DepthTexture extends Texture {
  constructor(e, t, n = UnsignedIntType, r, i, a, s = ye, o = ye, c, l = DepthFormat, u = 1) {
    if (l !== DepthFormat && l !== DepthStencilFormat) throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    super({
      width: e,
      height: t,
      depth: u
    }, r, i, a, s, o, l, n, c), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.source = new Source(Object.assign({}, e.image)), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return null !== this.compareFunction && (t.compareFunction = this.compareFunction), t;
  }
}
class CubeDepthTexture extends DepthTexture {
  constructor(e, t = UnsignedIntType, n = CubeReflectionMapping, r, i, a = ye, s = ye, o, c = DepthFormat) {
    const l = {
        width: e,
        height: e,
        depth: 1
      },
      image = [l, l, l, l, l, l];
    super(e, e, t, n, r, i, a, s, o, c), this.image = image, this.isCubeDepthTexture = !0, this.isCubeTexture = !0;
  }
  get images() {
    return this.image;
  }
  set images(image) {
    this.image = image;
  }
}
class ExternalTexture extends Texture {
  constructor(sourceTexture = null) {
    super(), this.sourceTexture = sourceTexture, this.isExternalTexture = !0;
  }
  copy(e) {
    return super.copy(e), this.sourceTexture = e.sourceTexture, this;
  }
}
class BoxGeometry extends BufferGeometry {
  constructor(e = 1, t = 1, n = 1, r = 1, i = 1, a = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: e,
      height: t,
      depth: n,
      widthSegments: r,
      heightSegments: i,
      depthSegments: a
    };
    const s = this;
    r = Math.floor(r), i = Math.floor(i), a = Math.floor(a);
    const o = [],
      c = [],
      l = [],
      u = [];
    let d = 0,
      h = 0;
    function p(e, t, n, r, i, a, p, f, m, M, _) {
      const A = a / m,
        g = p / M,
        b = a / 2,
        y = p / 2,
        L = f / 2,
        v = m + 1,
        T = M + 1;
      let S = 0,
        w = 0;
      const E = new Vector3();
      for (let a = 0; a < T; a++) {
        const s = a * g - y;
        for (let o = 0; o < v; o++) {
          const d = o * A - b;
          E[e] = d * r, E[t] = s * i, E[n] = L, c.push(E.x, E.y, E.z), E[e] = 0, E[t] = 0, E[n] = f > 0 ? 1 : -1, l.push(E.x, E.y, E.z), u.push(o / m), u.push(1 - a / M), S += 1;
        }
      }
      for (let e = 0; e < M; e++) for (let t = 0; t < m; t++) {
        const n = d + t + v * e,
          r = d + t + v * (e + 1),
          i = d + (t + 1) + v * (e + 1),
          a = d + (t + 1) + v * e;
        o.push(n, r, a), o.push(r, i, a), w += 6;
      }
      s.addGroup(h, w, _), h += w, d += S;
    }
    p("z", "y", "x", -1, -1, n, t, e, a, i, 0), p("z", "y", "x", 1, -1, n, t, -e, a, i, 1), p("x", "z", "y", 1, 1, e, n, t, r, a, 2), p("x", "z", "y", 1, -1, e, n, -t, r, a, 3), p("x", "y", "z", 1, -1, e, t, n, r, i, 4), p("x", "y", "z", -1, -1, e, t, -n, r, i, 5), this.setIndex(o), this.setAttribute("position", new Float32BufferAttribute(c, 3)), this.setAttribute("normal", new Float32BufferAttribute(l, 3)), this.setAttribute("uv", new Float32BufferAttribute(u, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new BoxGeometry(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments);
  }
}
class CapsuleGeometry extends BufferGeometry {
  constructor(e = 1, t = 1, n = 4, r = 8, i = 1) {
    super(), this.type = "CapsuleGeometry", this.parameters = {
      radius: e,
      height: t,
      capSegments: n,
      radialSegments: r,
      heightSegments: i
    }, t = Math.max(0, t), n = Math.max(1, Math.floor(n)), r = Math.max(3, Math.floor(r)), i = Math.max(1, Math.floor(i));
    const a = [],
      s = [],
      o = [],
      c = [],
      l = t / 2,
      u = Math.PI / 2 * e,
      d = t,
      h = 2 * u + d,
      p = 2 * n + i,
      f = r + 1,
      m = new Vector3(),
      M = new Vector3();
    for (let _ = 0; _ <= p; _++) {
      let A = 0,
        g = 0,
        b = 0,
        y = 0;
      if (_ <= n) {
        const t = _ / n,
          r = t * Math.PI / 2;
        g = -l - e * Math.cos(r), b = e * Math.sin(r), y = -e * Math.cos(r), A = t * u;
      } else if (_ <= n + i) {
        const r = (_ - n) / i;
        g = r * t - l, b = e, y = 0, A = u + r * d;
      } else {
        const t = (_ - n - i) / n,
          r = t * Math.PI / 2;
        g = l + e * Math.sin(r), b = e * Math.cos(r), y = e * Math.sin(r), A = u + d + t * u;
      }
      const L = Math.max(0, Math.min(1, A / h));
      let v = 0;
      0 === _ ? v = .5 / r : _ === p && (v = -.5 / r);
      for (let e = 0; e <= r; e++) {
        const t = e / r,
          n = t * Math.PI * 2,
          i = Math.sin(n),
          a = Math.cos(n);
        M.x = -b * a, M.y = g, M.z = b * i, s.push(M.x, M.y, M.z), m.set(-b * a, y, b * i), m.normalize(), o.push(m.x, m.y, m.z), c.push(t + v, L);
      }
      if (_ > 0) {
        const e = (_ - 1) * f;
        for (let t = 0; t < r; t++) {
          const n = e + t,
            r = e + t + 1,
            i = _ * f + t,
            s = _ * f + t + 1;
          a.push(n, r, i), a.push(r, s, i);
        }
      }
    }
    this.setIndex(a), this.setAttribute("position", new Float32BufferAttribute(s, 3)), this.setAttribute("normal", new Float32BufferAttribute(o, 3)), this.setAttribute("uv", new Float32BufferAttribute(c, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new CapsuleGeometry(e.radius, e.height, e.capSegments, e.radialSegments, e.heightSegments);
  }
}
class CircleGeometry extends BufferGeometry {
  constructor(e = 1, t = 32, n = 0, r = 2 * Math.PI) {
    super(), this.type = "CircleGeometry", this.parameters = {
      radius: e,
      segments: t,
      thetaStart: n,
      thetaLength: r
    }, t = Math.max(3, t);
    const i = [],
      a = [],
      s = [],
      o = [],
      c = new Vector3(),
      l = new Vector2();
    a.push(0, 0, 0), s.push(0, 0, 1), o.push(.5, .5);
    for (let i = 0, u = 3; i <= t; i++, u += 3) {
      const d = n + i / t * r;
      c.x = e * Math.cos(d), c.y = e * Math.sin(d), a.push(c.x, c.y, c.z), s.push(0, 0, 1), l.x = (a[u] / e + 1) / 2, l.y = (a[u + 1] / e + 1) / 2, o.push(l.x, l.y);
    }
    for (let e = 1; e <= t; e++) i.push(e, e + 1, 0);
    this.setIndex(i), this.setAttribute("position", new Float32BufferAttribute(a, 3)), this.setAttribute("normal", new Float32BufferAttribute(s, 3)), this.setAttribute("uv", new Float32BufferAttribute(o, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new CircleGeometry(e.radius, e.segments, e.thetaStart, e.thetaLength);
  }
}
class CylinderGeometry extends BufferGeometry {
  constructor(e = 1, t = 1, n = 1, r = 32, i = 1, a = !1, s = 0, o = 2 * Math.PI) {
    super(), this.type = "CylinderGeometry", this.parameters = {
      radiusTop: e,
      radiusBottom: t,
      height: n,
      radialSegments: r,
      heightSegments: i,
      openEnded: a,
      thetaStart: s,
      thetaLength: o
    };
    const c = this;
    r = Math.floor(r), i = Math.floor(i);
    const l = [],
      u = [],
      d = [],
      h = [];
    let p = 0;
    const f = [],
      m = n / 2;
    let M = 0;
    function _(n) {
      const i = p,
        a = new Vector2(),
        f = new Vector3();
      let _ = 0;
      const A = !0 === n ? e : t,
        g = !0 === n ? 1 : -1;
      for (let e = 1; e <= r; e++) u.push(0, m * g, 0), d.push(0, g, 0), h.push(.5, .5), p++;
      const b = p;
      for (let e = 0; e <= r; e++) {
        const t = e / r * o + s,
          n = Math.cos(t),
          i = Math.sin(t);
        f.x = A * i, f.y = m * g, f.z = A * n, u.push(f.x, f.y, f.z), d.push(0, g, 0), a.x = .5 * n + .5, a.y = .5 * i * g + .5, h.push(a.x, a.y), p++;
      }
      for (let e = 0; e < r; e++) {
        const t = i + e,
          r = b + e;
        !0 === n ? l.push(r, r + 1, t) : l.push(r + 1, r, t), _ += 3;
      }
      c.addGroup(M, _, !0 === n ? 1 : 2), M += _;
    }
    !function () {
      const a = new Vector3(),
        _ = new Vector3();
      let A = 0;
      const g = (t - e) / n;
      for (let c = 0; c <= i; c++) {
        const l = [],
          M = c / i,
          A = M * (t - e) + e;
        for (let e = 0; e <= r; e++) {
          const t = e / r,
            i = t * o + s,
            c = Math.sin(i),
            f = Math.cos(i);
          _.x = A * c, _.y = -M * n + m, _.z = A * f, u.push(_.x, _.y, _.z), a.set(c, g, f).normalize(), d.push(a.x, a.y, a.z), h.push(t, 1 - M), l.push(p++);
        }
        f.push(l);
      }
      for (let n = 0; n < r; n++) for (let r = 0; r < i; r++) {
        const a = f[r][n],
          s = f[r + 1][n],
          o = f[r + 1][n + 1],
          c = f[r][n + 1];
        (e > 0 || 0 !== r) && (l.push(a, s, c), A += 3), (t > 0 || r !== i - 1) && (l.push(s, o, c), A += 3);
      }
      c.addGroup(M, A, 0), M += A;
    }(), !1 === a && (e > 0 && _(!0), t > 0 && _(!1)), this.setIndex(l), this.setAttribute("position", new Float32BufferAttribute(u, 3)), this.setAttribute("normal", new Float32BufferAttribute(d, 3)), this.setAttribute("uv", new Float32BufferAttribute(h, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new CylinderGeometry(e.radiusTop, e.radiusBottom, e.height, e.radialSegments, e.heightSegments, e.openEnded, e.thetaStart, e.thetaLength);
  }
}
class ConeGeometry extends CylinderGeometry {
  constructor(e = 1, t = 1, n = 32, r = 1, i = !1, a = 0, s = 2 * Math.PI) {
    super(0, e, t, n, r, i, a, s), this.type = "ConeGeometry", this.parameters = {
      radius: e,
      height: t,
      radialSegments: n,
      heightSegments: r,
      openEnded: i,
      thetaStart: a,
      thetaLength: s
    };
  }
  static fromJSON(e) {
    return new ConeGeometry(e.radius, e.height, e.radialSegments, e.heightSegments, e.openEnded, e.thetaStart, e.thetaLength);
  }
}
class PolyhedronGeometry extends BufferGeometry {
  constructor(e = [], t = [], n = 1, r = 0) {
    super(), this.type = "PolyhedronGeometry", this.parameters = {
      vertices: e,
      indices: t,
      radius: n,
      detail: r
    };
    const i = [],
      a = [];
    function s(e, t, n, r) {
      const i = r + 1,
        a = [];
      for (let r = 0; r <= i; r++) {
        a[r] = [];
        const s = e.clone().lerp(n, r / i),
          o = t.clone().lerp(n, r / i),
          c = i - r;
        for (let e = 0; e <= c; e++) a[r][e] = 0 === e && r === i ? s : s.clone().lerp(o, e / c);
      }
      for (let e = 0; e < i; e++) for (let t = 0; t < 2 * (i - e) - 1; t++) {
        const n = Math.floor(t / 2);
        t % 2 == 0 ? (o(a[e][n + 1]), o(a[e + 1][n]), o(a[e][n])) : (o(a[e][n + 1]), o(a[e + 1][n + 1]), o(a[e + 1][n]));
      }
    }
    function o(e) {
      i.push(e.x, e.y, e.z);
    }
    function c(t, n) {
      const r = 3 * t;
      n.x = e[r + 0], n.y = e[r + 1], n.z = e[r + 2];
    }
    function l(e, t, n, r) {
      r < 0 && 1 === e.x && (a[t] = e.x - 1), 0 === n.x && 0 === n.z && (a[t] = r / 2 / Math.PI + .5);
    }
    function u(e) {
      return Math.atan2(e.z, -e.x);
    }
    function d(e) {
      return Math.atan2(-e.y, Math.sqrt(e.x * e.x + e.z * e.z));
    }
    !function (e) {
      const n = new Vector3(),
        r = new Vector3(),
        i = new Vector3();
      for (let a = 0; a < t.length; a += 3) c(t[a + 0], n), c(t[a + 1], r), c(t[a + 2], i), s(n, r, i, e);
    }(r), function (e) {
      const t = new Vector3();
      for (let n = 0; n < i.length; n += 3) t.x = i[n + 0], t.y = i[n + 1], t.z = i[n + 2], t.normalize().multiplyScalar(e), i[n + 0] = t.x, i[n + 1] = t.y, i[n + 2] = t.z;
    }(n), function () {
      const e = new Vector3();
      for (let t = 0; t < i.length; t += 3) {
        e.x = i[t + 0], e.y = i[t + 1], e.z = i[t + 2];
        const n = u(e) / 2 / Math.PI + .5,
          r = d(e) / Math.PI + .5;
        a.push(n, 1 - r);
      }
      (function () {
        const e = new Vector3(),
          t = new Vector3(),
          n = new Vector3(),
          r = new Vector3(),
          s = new Vector2(),
          o = new Vector2(),
          c = new Vector2();
        for (let d = 0, h = 0; d < i.length; d += 9, h += 6) {
          e.set(i[d + 0], i[d + 1], i[d + 2]), t.set(i[d + 3], i[d + 4], i[d + 5]), n.set(i[d + 6], i[d + 7], i[d + 8]), s.set(a[h + 0], a[h + 1]), o.set(a[h + 2], a[h + 3]), c.set(a[h + 4], a[h + 5]), r.copy(e).add(t).add(n).divideScalar(3);
          const p = u(r);
          l(s, h + 0, e, p), l(o, h + 2, t, p), l(c, h + 4, n, p);
        }
      })(), function () {
        for (let e = 0; e < a.length; e += 6) {
          const t = a[e + 0],
            n = a[e + 2],
            r = a[e + 4],
            i = Math.max(t, n, r),
            s = Math.min(t, n, r);
          i > .9 && s < .1 && (t < .2 && (a[e + 0] += 1), n < .2 && (a[e + 2] += 1), r < .2 && (a[e + 4] += 1));
        }
      }();
    }(), this.setAttribute("position", new Float32BufferAttribute(i, 3)), this.setAttribute("normal", new Float32BufferAttribute(i.slice(), 3)), this.setAttribute("uv", new Float32BufferAttribute(a, 2)), 0 === r ? this.computeVertexNormals() : this.normalizeNormals();
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new PolyhedronGeometry(e.vertices, e.indices, e.radius, e.detail);
  }
}
class DodecahedronGeometry extends PolyhedronGeometry {
  constructor(e = 1, t = 0) {
    const n = (1 + Math.sqrt(5)) / 2,
      r = 1 / n;
    super([-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -r, -n, 0, -r, n, 0, r, -n, 0, r, n, -r, -n, 0, -r, n, 0, r, -n, 0, r, n, 0, -n, 0, -r, n, 0, -r, -n, 0, r, n, 0, r], [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9], e, t), this.type = "DodecahedronGeometry", this.parameters = {
      radius: e,
      detail: t
    };
  }
  static fromJSON(e) {
    return new DodecahedronGeometry(e.radius, e.detail);
  }
}
const Qs = new Vector3(),
  Ks = new Vector3(),
  Js = new Vector3(),
  triangle = new Triangle();
class EdgesGeometry extends BufferGeometry {
  constructor(e = null, t = 1) {
    if (super(), this.type = "EdgesGeometry", this.parameters = {
      geometry: e,
      thresholdAngle: t
    }, null !== e) {
      const n = 4,
        r = Math.pow(10, n),
        i = Math.cos(gr * t),
        a = e.getIndex(),
        s = e.getAttribute("position"),
        o = a ? a.count : s.count,
        c = [0, 0, 0],
        l = ["a", "b", "c"],
        array = new Array(3),
        d = {},
        h = [];
      for (let e = 0; e < o; e += 3) {
        a ? (c[0] = a.getX(e), c[1] = a.getX(e + 1), c[2] = a.getX(e + 2)) : (c[0] = e, c[1] = e + 1, c[2] = e + 2);
        const {
          a: t,
          b: n,
          c: o
        } = triangle;
        if (t.fromBufferAttribute(s, c[0]), n.fromBufferAttribute(s, c[1]), o.fromBufferAttribute(s, c[2]), triangle.getNormal(Js), array[0] = `${Math.round(t.x * r)},${Math.round(t.y * r)},${Math.round(t.z * r)}`, array[1] = `${Math.round(n.x * r)},${Math.round(n.y * r)},${Math.round(n.z * r)}`, array[2] = `${Math.round(o.x * r)},${Math.round(o.y * r)},${Math.round(o.z * r)}`, array[0] !== array[1] && array[1] !== array[2] && array[2] !== array[0]) for (let e = 0; e < 3; e++) {
          const t = (e + 1) % 3,
            n = array[e],
            r = array[t],
            a = triangle[l[e]],
            s = triangle[l[t]],
            o = `${n}_${r}`,
            p = `${r}_${n}`;
          p in d && d[p] ? (Js.dot(d[p].normal) <= i && (h.push(a.x, a.y, a.z), h.push(s.x, s.y, s.z)), d[p] = null) : o in d || (d[o] = {
            index0: c[e],
            index1: c[t],
            normal: Js.clone()
          });
        }
      }
      for (const e in d) if (d[e]) {
        const {
          index0: index0,
          index1: index1
        } = d[e];
        Qs.fromBufferAttribute(s, index0), Ks.fromBufferAttribute(s, index1), h.push(Qs.x, Qs.y, Qs.z), h.push(Ks.x, Ks.y, Ks.z);
      }
      this.setAttribute("position", new Float32BufferAttribute(h, 3));
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
}
class Curve {
  constructor() {
    this.type = "Curve", this.arcLengthDivisions = 200, this.needsUpdate = !1, this.cacheArcLengths = null;
  }
  getPoint() {
    warn("Curve: .getPoint() not implemented.");
  }
  getPointAt(e, t) {
    const n = this.getUtoTmapping(e);
    return this.getPoint(n, t);
  }
  getPoints(e = 5) {
    const t = [];
    for (let n = 0; n <= e; n++) t.push(this.getPoint(n / e));
    return t;
  }
  getSpacedPoints(e = 5) {
    const t = [];
    for (let n = 0; n <= e; n++) t.push(this.getPointAt(n / e));
    return t;
  }
  getLength() {
    const e = this.getLengths();
    return e[e.length - 1];
  }
  getLengths(e = this.arcLengthDivisions) {
    if (this.cacheArcLengths && this.cacheArcLengths.length === e + 1 && !this.needsUpdate) return this.cacheArcLengths;
    this.needsUpdate = !1;
    const cacheArcLengths = [];
    let n,
      r = this.getPoint(0),
      i = 0;
    cacheArcLengths.push(0);
    for (let a = 1; a <= e; a++) n = this.getPoint(a / e), i += n.distanceTo(r), cacheArcLengths.push(i), r = n;
    return this.cacheArcLengths = cacheArcLengths, cacheArcLengths;
  }
  updateArcLengths() {
    this.needsUpdate = !0, this.getLengths();
  }
  getUtoTmapping(e, t = null) {
    const n = this.getLengths();
    let r = 0;
    const i = n.length;
    let a;
    a = t || e * n[i - 1];
    let s,
      o = 0,
      c = i - 1;
    for (; o <= c;) if (r = Math.floor(o + (c - o) / 2), s = n[r] - a, s < 0) o = r + 1;else {
      if (!(s > 0)) {
        c = r;
        break;
      }
      c = r - 1;
    }
    if (r = c, n[r] === a) return r / (i - 1);
    const l = n[r];
    return (r + (a - l) / (n[r + 1] - l)) / (i - 1);
  }
  getTangent(e, t) {
    const n = 1e-4;
    let r = e - n,
      i = e + n;
    r < 0 && (r = 0), i > 1 && (i = 1);
    const a = this.getPoint(r),
      s = this.getPoint(i),
      o = t || (a.isVector2 ? new Vector2() : new Vector3());
    return o.copy(s).sub(a).normalize(), o;
  }
  getTangentAt(e, t) {
    const n = this.getUtoTmapping(e);
    return this.getTangent(n, t);
  }
  computeFrenetFrames(e, t = !1) {
    const n = new Vector3(),
      r = [],
      i = [],
      a = [],
      s = new Vector3(),
      o = new Matrix4();
    for (let t = 0; t <= e; t++) {
      const n = t / e;
      r[t] = this.getTangentAt(n, new Vector3());
    }
    i[0] = new Vector3(), a[0] = new Vector3();
    let c = Number.MAX_VALUE;
    const l = Math.abs(r[0].x),
      u = Math.abs(r[0].y),
      d = Math.abs(r[0].z);
    l <= c && (c = l, n.set(1, 0, 0)), u <= c && (c = u, n.set(0, 1, 0)), d <= c && n.set(0, 0, 1), s.crossVectors(r[0], n).normalize(), i[0].crossVectors(r[0], s), a[0].crossVectors(r[0], i[0]);
    for (let t = 1; t <= e; t++) {
      if (i[t] = i[t - 1].clone(), a[t] = a[t - 1].clone(), s.crossVectors(r[t - 1], r[t]), s.length() > Number.EPSILON) {
        s.normalize();
        const e = Math.acos(Lr(r[t - 1].dot(r[t]), -1, 1));
        i[t].applyMatrix4(o.makeRotationAxis(s, e));
      }
      a[t].crossVectors(r[t], i[t]);
    }
    if (!0 === t) {
      let t = Math.acos(Lr(i[0].dot(i[e]), -1, 1));
      t /= e, r[0].dot(s.crossVectors(i[0], i[e])) > 0 && (t = -t);
      for (let n = 1; n <= e; n++) i[n].applyMatrix4(o.makeRotationAxis(r[n], t * n)), a[n].crossVectors(r[n], i[n]);
    }
    return {
      tangents: r,
      normals: i,
      binormals: a
    };
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.arcLengthDivisions = e.arcLengthDivisions, this;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.7,
        type: "Curve",
        generator: "Curve.toJSON"
      }
    };
    return e.arcLengthDivisions = this.arcLengthDivisions, e.type = this.type, e;
  }
  fromJSON(e) {
    return this.arcLengthDivisions = e.arcLengthDivisions, this;
  }
}
class EllipseCurve extends Curve {
  constructor(aX = 0, aY = 0, xRadius = 1, yRadius = 1, aStartAngle = 0, aEndAngle = 2 * Math.PI, aClockwise = !1, aRotation = 0) {
    super(), this.isEllipseCurve = !0, this.type = "EllipseCurve", this.aX = aX, this.aY = aY, this.xRadius = xRadius, this.yRadius = yRadius, this.aStartAngle = aStartAngle, this.aEndAngle = aEndAngle, this.aClockwise = aClockwise, this.aRotation = aRotation;
  }
  getPoint(e, t = new Vector2()) {
    const n = t,
      r = 2 * Math.PI;
    let i = this.aEndAngle - this.aStartAngle;
    const a = Math.abs(i) < Number.EPSILON;
    for (; i < 0;) i += r;
    for (; i > r;) i -= r;
    i < Number.EPSILON && (i = a ? 0 : r), !0 !== this.aClockwise || a || (i === r ? i = -r : i -= r);
    const s = this.aStartAngle + e * i;
    let o = this.aX + this.xRadius * Math.cos(s),
      c = this.aY + this.yRadius * Math.sin(s);
    if (0 !== this.aRotation) {
      const e = Math.cos(this.aRotation),
        t = Math.sin(this.aRotation),
        n = o - this.aX,
        r = c - this.aY;
      o = n * e - r * t + this.aX, c = n * t + r * e + this.aY;
    }
    return n.set(o, c);
  }
  copy(e) {
    return super.copy(e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.aX = this.aX, e.aY = this.aY, e.xRadius = this.xRadius, e.yRadius = this.yRadius, e.aStartAngle = this.aStartAngle, e.aEndAngle = this.aEndAngle, e.aClockwise = this.aClockwise, e.aRotation = this.aRotation, e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this;
  }
}
class ArcCurve extends EllipseCurve {
  constructor(e, t, n, r, i, a) {
    super(e, t, n, n, r, i, a), this.isArcCurve = !0, this.type = "ArcCurve";
  }
}
function Zs() {
  let e = 0,
    t = 0,
    n = 0,
    r = 0;
  function i(i, a, s, o) {
    e = i, t = s, n = -3 * i + 3 * a - 2 * s - o, r = 2 * i - 2 * a + s + o;
  }
  return {
    initCatmullRom: function (e, t, n, r, a) {
      i(t, n, a * (n - e), a * (r - t));
    },
    initNonuniformCatmullRom: function (e, t, n, r, a, s, o) {
      let c = (t - e) / a - (n - e) / (a + s) + (n - t) / s,
        l = (n - t) / s - (r - t) / (s + o) + (r - n) / o;
      c *= s, l *= s, i(t, n, c, l);
    },
    calc: function (i) {
      const a = i * i;
      return e + t * i + n * a + r * (a * i);
    }
  };
}
const eo = new Vector3(),
  to = new Vector3(),
  no = new Zs(),
  ro = new Zs(),
  io = new Zs();
class CatmullRomCurve3 extends Curve {
  constructor(points = [], closed = !1, curveType = "centripetal", tension = .5) {
    super(), this.isCatmullRomCurve3 = !0, this.type = "CatmullRomCurve3", this.points = points, this.closed = closed, this.curveType = curveType, this.tension = tension;
  }
  getPoint(e, t = new Vector3()) {
    const n = t,
      points = this.points,
      i = points.length,
      a = (i - (this.closed ? 0 : 1)) * e;
    let s,
      o,
      c = Math.floor(a),
      l = a - c;
    this.closed ? c += c > 0 ? 0 : (Math.floor(Math.abs(c) / i) + 1) * i : 0 === l && c === i - 1 && (c = i - 2, l = 1), this.closed || c > 0 ? s = points[(c - 1) % i] : (to.subVectors(points[0], points[1]).add(points[0]), s = to);
    const u = points[c % i],
      d = points[(c + 1) % i];
    if (this.closed || c + 2 < i ? o = points[(c + 2) % i] : (eo.subVectors(points[i - 1], points[i - 2]).add(points[i - 1]), o = eo), "centripetal" === this.curveType || "chordal" === this.curveType) {
      const e = "chordal" === this.curveType ? .5 : .25;
      let t = Math.pow(s.distanceToSquared(u), e),
        n = Math.pow(u.distanceToSquared(d), e),
        r = Math.pow(d.distanceToSquared(o), e);
      n < 1e-4 && (n = 1), t < 1e-4 && (t = n), r < 1e-4 && (r = n), no.initNonuniformCatmullRom(s.x, u.x, d.x, o.x, t, n, r), ro.initNonuniformCatmullRom(s.y, u.y, d.y, o.y, t, n, r), io.initNonuniformCatmullRom(s.z, u.z, d.z, o.z, t, n, r);
    } else "catmullrom" === this.curveType && (no.initCatmullRom(s.x, u.x, d.x, o.x, this.tension), ro.initCatmullRom(s.y, u.y, d.y, o.y, this.tension), io.initCatmullRom(s.z, u.z, d.z, o.z, this.tension));
    return n.set(no.calc(l), ro.calc(l), io.calc(l)), n;
  }
  copy(e) {
    super.copy(e), this.points = [];
    for (let t = 0, n = e.points.length; t < n; t++) {
      const n = e.points[t];
      this.points.push(n.clone());
    }
    return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this;
  }
  toJSON() {
    const e = super.toJSON();
    e.points = [];
    for (let t = 0, n = this.points.length; t < n; t++) {
      const n = this.points[t];
      e.points.push(n.toArray());
    }
    return e.closed = this.closed, e.curveType = this.curveType, e.tension = this.tension, e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.points = [];
    for (let t = 0, n = e.points.length; t < n; t++) {
      const n = e.points[t];
      this.points.push(new Vector3().fromArray(n));
    }
    return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this;
  }
}
function ao(e, t, n, r, i) {
  const a = .5 * (r - t),
    s = .5 * (i - n),
    o = e * e;
  return (2 * n - 2 * r + a + s) * (e * o) + (-3 * n + 3 * r - 2 * a - s) * o + a * e + n;
}
function so(e, t, n, r) {
  return function (e, t) {
    const n = 1 - e;
    return n * n * t;
  }(e, t) + function (e, t) {
    return 2 * (1 - e) * e * t;
  }(e, n) + function (e, t) {
    return e * e * t;
  }(e, r);
}
function oo(e, t, n, r, i) {
  return function (e, t) {
    const n = 1 - e;
    return n * n * n * t;
  }(e, t) + function (e, t) {
    const n = 1 - e;
    return 3 * n * n * e * t;
  }(e, n) + function (e, t) {
    return 3 * (1 - e) * e * e * t;
  }(e, r) + function (e, t) {
    return e * e * e * t;
  }(e, i);
}
class CubicBezierCurve extends Curve {
  constructor(v0 = new Vector2(), v1 = new Vector2(), v2 = new Vector2(), v3 = new Vector2()) {
    super(), this.isCubicBezierCurve = !0, this.type = "CubicBezierCurve", this.v0 = v0, this.v1 = v1, this.v2 = v2, this.v3 = v3;
  }
  getPoint(e, t = new Vector2()) {
    const n = t,
      v0 = this.v0,
      v1 = this.v1,
      v2 = this.v2,
      v3 = this.v3;
    return n.set(oo(e, v0.x, v1.x, v2.x, v3.x), oo(e, v0.y, v1.y, v2.y, v3.y)), n;
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this;
  }
}
class CubicBezierCurve3 extends Curve {
  constructor(v0 = new Vector3(), v1 = new Vector3(), v2 = new Vector3(), v3 = new Vector3()) {
    super(), this.isCubicBezierCurve3 = !0, this.type = "CubicBezierCurve3", this.v0 = v0, this.v1 = v1, this.v2 = v2, this.v3 = v3;
  }
  getPoint(e, t = new Vector3()) {
    const n = t,
      v0 = this.v0,
      v1 = this.v1,
      v2 = this.v2,
      v3 = this.v3;
    return n.set(oo(e, v0.x, v1.x, v2.x, v3.x), oo(e, v0.y, v1.y, v2.y, v3.y), oo(e, v0.z, v1.z, v2.z, v3.z)), n;
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this;
  }
}
class LineCurve extends Curve {
  constructor(v1 = new Vector2(), v2 = new Vector2()) {
    super(), this.isLineCurve = !0, this.type = "LineCurve", this.v1 = v1, this.v2 = v2;
  }
  getPoint(e, t = new Vector2()) {
    const n = t;
    return 1 === e ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)), n;
  }
  getPointAt(e, t) {
    return this.getPoint(e, t);
  }
  getTangent(e, t = new Vector2()) {
    return t.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(e, t) {
    return this.getTangent(e, t);
  }
  copy(e) {
    return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}
class LineCurve3 extends Curve {
  constructor(v1 = new Vector3(), v2 = new Vector3()) {
    super(), this.isLineCurve3 = !0, this.type = "LineCurve3", this.v1 = v1, this.v2 = v2;
  }
  getPoint(e, t = new Vector3()) {
    const n = t;
    return 1 === e ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)), n;
  }
  getPointAt(e, t) {
    return this.getPoint(e, t);
  }
  getTangent(e, t = new Vector3()) {
    return t.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(e, t) {
    return this.getTangent(e, t);
  }
  copy(e) {
    return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}
class QuadraticBezierCurve extends Curve {
  constructor(v0 = new Vector2(), v1 = new Vector2(), v2 = new Vector2()) {
    super(), this.isQuadraticBezierCurve = !0, this.type = "QuadraticBezierCurve", this.v0 = v0, this.v1 = v1, this.v2 = v2;
  }
  getPoint(e, t = new Vector2()) {
    const n = t,
      v0 = this.v0,
      v1 = this.v1,
      v2 = this.v2;
    return n.set(so(e, v0.x, v1.x, v2.x), so(e, v0.y, v1.y, v2.y)), n;
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}
class QuadraticBezierCurve3 extends Curve {
  constructor(v0 = new Vector3(), v1 = new Vector3(), v2 = new Vector3()) {
    super(), this.isQuadraticBezierCurve3 = !0, this.type = "QuadraticBezierCurve3", this.v0 = v0, this.v1 = v1, this.v2 = v2;
  }
  getPoint(e, t = new Vector3()) {
    const n = t,
      v0 = this.v0,
      v1 = this.v1,
      v2 = this.v2;
    return n.set(so(e, v0.x, v1.x, v2.x), so(e, v0.y, v1.y, v2.y), so(e, v0.z, v1.z, v2.z)), n;
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}
class SplineCurve extends Curve {
  constructor(points = []) {
    super(), this.isSplineCurve = !0, this.type = "SplineCurve", this.points = points;
  }
  getPoint(e, t = new Vector2()) {
    const n = t,
      points = this.points,
      i = (points.length - 1) * e,
      a = Math.floor(i),
      s = i - a,
      o = points[0 === a ? a : a - 1],
      c = points[a],
      l = points[a > points.length - 2 ? points.length - 1 : a + 1],
      u = points[a > points.length - 3 ? points.length - 1 : a + 2];
    return n.set(ao(s, o.x, c.x, l.x, u.x), ao(s, o.y, c.y, l.y, u.y)), n;
  }
  copy(e) {
    super.copy(e), this.points = [];
    for (let t = 0, n = e.points.length; t < n; t++) {
      const n = e.points[t];
      this.points.push(n.clone());
    }
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.points = [];
    for (let t = 0, n = this.points.length; t < n; t++) {
      const n = this.points[t];
      e.points.push(n.toArray());
    }
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.points = [];
    for (let t = 0, n = e.points.length; t < n; t++) {
      const n = e.points[t];
      this.points.push(new Vector2().fromArray(n));
    }
    return this;
  }
}
var co = Object.freeze({
  __proto__: null,
  ArcCurve: ArcCurve,
  CatmullRomCurve3: CatmullRomCurve3,
  CubicBezierCurve: CubicBezierCurve,
  CubicBezierCurve3: CubicBezierCurve3,
  EllipseCurve: EllipseCurve,
  LineCurve: LineCurve,
  LineCurve3: LineCurve3,
  QuadraticBezierCurve: QuadraticBezierCurve,
  QuadraticBezierCurve3: QuadraticBezierCurve3,
  SplineCurve: SplineCurve
});
class CurvePath extends Curve {
  constructor() {
    super(), this.type = "CurvePath", this.curves = [], this.autoClose = !1;
  }
  add(e) {
    this.curves.push(e);
  }
  closePath() {
    const e = this.curves[0].getPoint(0),
      t = this.curves[this.curves.length - 1].getPoint(1);
    if (!e.equals(t)) {
      const n = !0 === e.isVector2 ? "LineCurve" : "LineCurve3";
      this.curves.push(new co[n](t, e));
    }
    return this;
  }
  getPoint(e, t) {
    const n = e * this.getLength(),
      r = this.getCurveLengths();
    let i = 0;
    for (; i < r.length;) {
      if (r[i] >= n) {
        const e = r[i] - n,
          a = this.curves[i],
          s = a.getLength(),
          o = 0 === s ? 0 : 1 - e / s;
        return a.getPointAt(o, t);
      }
      i++;
    }
    return null;
  }
  getLength() {
    const e = this.getCurveLengths();
    return e[e.length - 1];
  }
  updateArcLengths() {
    this.needsUpdate = !0, this.cacheLengths = null, this.getCurveLengths();
  }
  getCurveLengths() {
    if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths;
    const cacheLengths = [];
    let t = 0;
    for (let n = 0, r = this.curves.length; n < r; n++) t += this.curves[n].getLength(), cacheLengths.push(t);
    return this.cacheLengths = cacheLengths, cacheLengths;
  }
  getSpacedPoints(e = 40) {
    const t = [];
    for (let n = 0; n <= e; n++) t.push(this.getPoint(n / e));
    return this.autoClose && t.push(t[0]), t;
  }
  getPoints(e = 12) {
    const t = [];
    let n;
    for (let r = 0, curves = this.curves; r < curves.length; r++) {
      const a = curves[r],
        s = a.isEllipseCurve ? 2 * e : a.isLineCurve || a.isLineCurve3 ? 1 : a.isSplineCurve ? e * a.points.length : e,
        o = a.getPoints(s);
      for (let e = 0; e < o.length; e++) {
        const r = o[e];
        n && n.equals(r) || (t.push(r), n = r);
      }
    }
    return this.autoClose && t.length > 1 && !t[t.length - 1].equals(t[0]) && t.push(t[0]), t;
  }
  copy(e) {
    super.copy(e), this.curves = [];
    for (let t = 0, n = e.curves.length; t < n; t++) {
      const n = e.curves[t];
      this.curves.push(n.clone());
    }
    return this.autoClose = e.autoClose, this;
  }
  toJSON() {
    const e = super.toJSON();
    e.autoClose = this.autoClose, e.curves = [];
    for (let t = 0, n = this.curves.length; t < n; t++) {
      const n = this.curves[t];
      e.curves.push(n.toJSON());
    }
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.autoClose = e.autoClose, this.curves = [];
    for (let t = 0, n = e.curves.length; t < n; t++) {
      const n = e.curves[t];
      this.curves.push(new co[n.type]().fromJSON(n));
    }
    return this;
  }
}
class Path extends CurvePath {
  constructor(e) {
    super(), this.type = "Path", this.currentPoint = new Vector2(), e && this.setFromPoints(e);
  }
  setFromPoints(e) {
    this.moveTo(e[0].x, e[0].y);
    for (let t = 1, n = e.length; t < n; t++) this.lineTo(e[t].x, e[t].y);
    return this;
  }
  moveTo(e, t) {
    return this.currentPoint.set(e, t), this;
  }
  lineTo(e, t) {
    const lineCurve = new LineCurve(this.currentPoint.clone(), new Vector2(e, t));
    return this.curves.push(lineCurve), this.currentPoint.set(e, t), this;
  }
  quadraticCurveTo(e, t, n, r) {
    const quadraticBezierCurve = new QuadraticBezierCurve(this.currentPoint.clone(), new Vector2(e, t), new Vector2(n, r));
    return this.curves.push(quadraticBezierCurve), this.currentPoint.set(n, r), this;
  }
  bezierCurveTo(e, t, n, r, i, a) {
    const cubicBezierCurve = new CubicBezierCurve(this.currentPoint.clone(), new Vector2(e, t), new Vector2(n, r), new Vector2(i, a));
    return this.curves.push(cubicBezierCurve), this.currentPoint.set(i, a), this;
  }
  splineThru(e) {
    const t = [this.currentPoint.clone()].concat(e),
      splineCurve = new SplineCurve(t);
    return this.curves.push(splineCurve), this.currentPoint.copy(e[e.length - 1]), this;
  }
  arc(e, t, n, r, i, a) {
    const s = this.currentPoint.x,
      o = this.currentPoint.y;
    return this.absarc(e + s, t + o, n, r, i, a), this;
  }
  absarc(e, t, n, r, i, a) {
    return this.absellipse(e, t, n, n, r, i, a), this;
  }
  ellipse(e, t, n, r, i, a, s, o) {
    const c = this.currentPoint.x,
      l = this.currentPoint.y;
    return this.absellipse(e + c, t + l, n, r, i, a, s, o), this;
  }
  absellipse(e, t, n, r, i, a, s, o) {
    const ellipseCurve = new EllipseCurve(e, t, n, r, i, a, s, o);
    if (this.curves.length > 0) {
      const e = ellipseCurve.getPoint(0);
      e.equals(this.currentPoint) || this.lineTo(e.x, e.y);
    }
    this.curves.push(ellipseCurve);
    const l = ellipseCurve.getPoint(1);
    return this.currentPoint.copy(l), this;
  }
  copy(e) {
    return super.copy(e), this.currentPoint.copy(e.currentPoint), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.currentPoint = this.currentPoint.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.currentPoint.fromArray(e.currentPoint), this;
  }
}
class Shape extends Path {
  constructor(e) {
    super(e), this.uuid = yr(), this.type = "Shape", this.holes = [];
  }
  getPointsHoles(e) {
    const t = [];
    for (let n = 0, r = this.holes.length; n < r; n++) t[n] = this.holes[n].getPoints(e);
    return t;
  }
  extractPoints(e) {
    return {
      shape: this.getPoints(e),
      holes: this.getPointsHoles(e)
    };
  }
  copy(e) {
    super.copy(e), this.holes = [];
    for (let t = 0, n = e.holes.length; t < n; t++) {
      const n = e.holes[t];
      this.holes.push(n.clone());
    }
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.uuid = this.uuid, e.holes = [];
    for (let t = 0, n = this.holes.length; t < n; t++) {
      const n = this.holes[t];
      e.holes.push(n.toJSON());
    }
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.uuid = e.uuid, this.holes = [];
    for (let t = 0, n = e.holes.length; t < n; t++) {
      const n = e.holes[t];
      this.holes.push(new Path().fromJSON(n));
    }
    return this;
  }
}
function lo(e, t, n = 2) {
  const r = t && t.length,
    i = r ? t[0] * n : e.length;
  let a = uo(e, 0, i, n, !0);
  const s = [];
  if (!a || a.next === a.prev) return s;
  let o, c, l;
  if (r && (a = function (e, t, n, r) {
    const i = [];
    for (let n = 0, a = t.length; n < a; n++) {
      const s = uo(e, t[n] * r, n < a - 1 ? t[n + 1] * r : e.length, r, !1);
      s === s.next && (s.steiner = !0), i.push(Lo(s));
    }
    i.sort(Ao);
    for (let e = 0; e < i.length; e++) n = go(i[e], n);
    return n;
  }(e, t, a, n)), e.length > 80 * n) {
    o = e[0], c = e[1];
    let t = o,
      r = c;
    for (let a = n; a < i; a += n) {
      const n = e[a],
        i = e[a + 1];
      n < o && (o = n), i < c && (c = i), n > t && (t = n), i > r && (r = i);
    }
    l = Math.max(t - o, r - c), l = 0 !== l ? 32767 / l : 0;
  }
  return po(a, s, n, o, c, l, 0), s;
}
function uo(e, t, n, r, i) {
  let a;
  if (i === function (e, t, n, r) {
    let i = 0;
    for (let a = t, s = n - r; a < n; a += r) i += (e[s] - e[a]) * (e[a + 1] + e[s + 1]), s = a;
    return i;
  }(e, t, n, r) > 0) for (let i = t; i < n; i += r) a = Do(i / r | 0, e[i], e[i + 1], a);else for (let i = n - r; i >= t; i -= r) a = Do(i / r | 0, e[i], e[i + 1], a);
  return a && Eo(a, a.next) && (No(a), a = a.next), a;
}
function ho(e, t) {
  if (!e) return e;
  t || (t = e);
  let n,
    r = e;
  do {
    if (n = !1, r.steiner || !Eo(r, r.next) && 0 !== wo(r.prev, r, r.next)) r = r.next;else {
      if (No(r), r = t = r.prev, r === r.next) break;
      n = !0;
    }
  } while (n || r !== t);
  return t;
}
function po(e, t, n, r, i, a, s) {
  if (!e) return;
  !s && a && function (e, t, n, r) {
    let i = e;
    do {
      0 === i.z && (i.z = yo(i.x, i.y, t, n, r)), i.prevZ = i.prev, i.nextZ = i.next, i = i.next;
    } while (i !== e);
    i.prevZ.nextZ = null, i.prevZ = null, function (e) {
      let t,
        n = 1;
      do {
        let r,
          i = e;
        e = null;
        let a = null;
        for (t = 0; i;) {
          t++;
          let s = i,
            o = 0;
          for (let e = 0; e < n && (o++, s = s.nextZ, s); e++);
          let c = n;
          for (; o > 0 || c > 0 && s;) 0 !== o && (0 === c || !s || i.z <= s.z) ? (r = i, i = i.nextZ, o--) : (r = s, s = s.nextZ, c--), a ? a.nextZ = r : e = r, r.prevZ = a, a = r;
          i = s;
        }
        a.nextZ = null, n *= 2;
      } while (t > 1);
    }(i);
  }(e, r, i, a);
  let o = e;
  for (; e.prev !== e.next;) {
    const c = e.prev,
      l = e.next;
    if (a ? mo(e, r, i, a) : fo(e)) t.push(c.i, e.i, l.i), No(e), e = l.next, o = l.next;else if ((e = l) === o) {
      s ? 1 === s ? po(e = Mo(ho(e), t), t, n, r, i, a, 2) : 2 === s && _o(e, t, n, r, i, a) : po(ho(e), t, n, r, i, a, 1);
      break;
    }
  }
}
function fo(e) {
  const t = e.prev,
    n = e,
    r = e.next;
  if (wo(t, n, r) >= 0) return !1;
  const i = t.x,
    a = n.x,
    s = r.x,
    o = t.y,
    c = n.y,
    l = r.y,
    u = Math.min(i, a, s),
    d = Math.min(o, c, l),
    h = Math.max(i, a, s),
    p = Math.max(o, c, l);
  let f = r.next;
  for (; f !== t;) {
    if (f.x >= u && f.x <= h && f.y >= d && f.y <= p && To(i, o, a, c, s, l, f.x, f.y) && wo(f.prev, f, f.next) >= 0) return !1;
    f = f.next;
  }
  return !0;
}
function mo(e, t, n, r) {
  const i = e.prev,
    a = e,
    s = e.next;
  if (wo(i, a, s) >= 0) return !1;
  const o = i.x,
    c = a.x,
    l = s.x,
    u = i.y,
    d = a.y,
    h = s.y,
    p = Math.min(o, c, l),
    f = Math.min(u, d, h),
    m = Math.max(o, c, l),
    M = Math.max(u, d, h),
    _ = yo(p, f, t, n, r),
    A = yo(m, M, t, n, r);
  let g = e.prevZ,
    b = e.nextZ;
  for (; g && g.z >= _ && b && b.z <= A;) {
    if (g.x >= p && g.x <= m && g.y >= f && g.y <= M && g !== i && g !== s && To(o, u, c, d, l, h, g.x, g.y) && wo(g.prev, g, g.next) >= 0) return !1;
    if (g = g.prevZ, b.x >= p && b.x <= m && b.y >= f && b.y <= M && b !== i && b !== s && To(o, u, c, d, l, h, b.x, b.y) && wo(b.prev, b, b.next) >= 0) return !1;
    b = b.nextZ;
  }
  for (; g && g.z >= _;) {
    if (g.x >= p && g.x <= m && g.y >= f && g.y <= M && g !== i && g !== s && To(o, u, c, d, l, h, g.x, g.y) && wo(g.prev, g, g.next) >= 0) return !1;
    g = g.prevZ;
  }
  for (; b && b.z <= A;) {
    if (b.x >= p && b.x <= m && b.y >= f && b.y <= M && b !== i && b !== s && To(o, u, c, d, l, h, b.x, b.y) && wo(b.prev, b, b.next) >= 0) return !1;
    b = b.nextZ;
  }
  return !0;
}
function Mo(e, t) {
  let n = e;
  do {
    const r = n.prev,
      i = n.next.next;
    !Eo(r, i) && xo(r, n, n.next, i) && Oo(r, i) && Oo(i, r) && (t.push(r.i, n.i, i.i), No(n), No(n.next), n = e = i), n = n.next;
  } while (n !== e);
  return ho(n);
}
function _o(e, t, n, r, i, a) {
  let s = e;
  do {
    let e = s.next.next;
    for (; e !== s.prev;) {
      if (s.i !== e.i && So(s, e)) {
        let o = Bo(s, e);
        return s = ho(s, s.next), o = ho(o, o.next), po(s, t, n, r, i, a, 0), void po(o, t, n, r, i, a, 0);
      }
      e = e.next;
    }
    s = s.next;
  } while (s !== e);
}
function Ao(e, t) {
  let n = e.x - t.x;
  if (0 === n && (n = e.y - t.y, 0 === n)) {
    n = (e.next.y - e.y) / (e.next.x - e.x) - (t.next.y - t.y) / (t.next.x - t.x);
  }
  return n;
}
function go(e, t) {
  const n = function (e, t) {
    let n = t;
    const r = e.x,
      i = e.y;
    let a,
      s = -1 / 0;
    if (Eo(e, n)) return n;
    do {
      if (Eo(e, n.next)) return n.next;
      if (i <= n.y && i >= n.next.y && n.next.y !== n.y) {
        const e = n.x + (i - n.y) * (n.next.x - n.x) / (n.next.y - n.y);
        if (e <= r && e > s && (s = e, a = n.x < n.next.x ? n : n.next, e === r)) return a;
      }
      n = n.next;
    } while (n !== t);
    if (!a) return null;
    const o = a,
      c = a.x,
      l = a.y;
    let u = 1 / 0;
    n = a;
    do {
      if (r >= n.x && n.x >= c && r !== n.x && vo(i < l ? r : s, i, c, l, i < l ? s : r, i, n.x, n.y)) {
        const t = Math.abs(i - n.y) / (r - n.x);
        Oo(n, e) && (t < u || t === u && (n.x > a.x || n.x === a.x && bo(a, n))) && (a = n, u = t);
      }
      n = n.next;
    } while (n !== o);
    return a;
  }(e, t);
  if (!n) return t;
  const r = Bo(n, e);
  return ho(r, r.next), ho(n, n.next);
}
function bo(e, t) {
  return wo(e.prev, e, t.prev) < 0 && wo(t.next, e, e.next) < 0;
}
function yo(e, t, n, r, i) {
  return (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e = (e - n) * i | 0) | e << 8)) | e << 4)) | e << 2)) | e << 1)) | (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t = (t - r) * i | 0) | t << 8)) | t << 4)) | t << 2)) | t << 1)) << 1;
}
function Lo(e) {
  let t = e,
    n = e;
  do {
    (t.x < n.x || t.x === n.x && t.y < n.y) && (n = t), t = t.next;
  } while (t !== e);
  return n;
}
function vo(e, t, n, r, i, a, s, o) {
  return (i - s) * (t - o) >= (e - s) * (a - o) && (e - s) * (r - o) >= (n - s) * (t - o) && (n - s) * (a - o) >= (i - s) * (r - o);
}
function To(e, t, n, r, i, a, s, o) {
  return !(e === s && t === o) && vo(e, t, n, r, i, a, s, o);
}
function So(e, t) {
  return e.next.i !== t.i && e.prev.i !== t.i && !function (e, t) {
    let n = e;
    do {
      if (n.i !== e.i && n.next.i !== e.i && n.i !== t.i && n.next.i !== t.i && xo(n, n.next, e, t)) return !0;
      n = n.next;
    } while (n !== e);
    return !1;
  }(e, t) && (Oo(e, t) && Oo(t, e) && function (e, t) {
    let n = e,
      r = !1;
    const i = (e.x + t.x) / 2,
      a = (e.y + t.y) / 2;
    do {
      n.y > a != n.next.y > a && n.next.y !== n.y && i < (n.next.x - n.x) * (a - n.y) / (n.next.y - n.y) + n.x && (r = !r), n = n.next;
    } while (n !== e);
    return r;
  }(e, t) && (wo(e.prev, e, t.prev) || wo(e, t.prev, t)) || Eo(e, t) && wo(e.prev, e, e.next) > 0 && wo(t.prev, t, t.next) > 0);
}
function wo(e, t, n) {
  return (t.y - e.y) * (n.x - t.x) - (t.x - e.x) * (n.y - t.y);
}
function Eo(e, t) {
  return e.x === t.x && e.y === t.y;
}
function xo(e, t, n, r) {
  const i = zo(wo(e, t, n)),
    a = zo(wo(e, t, r)),
    s = zo(wo(n, r, e)),
    o = zo(wo(n, r, t));
  return i !== a && s !== o || !(0 !== i || !Co(e, n, t)) || !(0 !== a || !Co(e, r, t)) || !(0 !== s || !Co(n, e, r)) || !(0 !== o || !Co(n, t, r));
}
function Co(e, t, n) {
  return t.x <= Math.max(e.x, n.x) && t.x >= Math.min(e.x, n.x) && t.y <= Math.max(e.y, n.y) && t.y >= Math.min(e.y, n.y);
}
function zo(e) {
  return e > 0 ? 1 : e < 0 ? -1 : 0;
}
function Oo(e, t) {
  return wo(e.prev, e, e.next) < 0 ? wo(e, t, e.next) >= 0 && wo(e, e.prev, t) >= 0 : wo(e, t, e.prev) < 0 || wo(e, e.next, t) < 0;
}
function Bo(e, t) {
  const n = Io(e.i, e.x, e.y),
    r = Io(t.i, t.x, t.y),
    i = e.next,
    a = t.prev;
  return e.next = t, t.prev = e, n.next = i, i.prev = n, r.next = n, n.prev = r, a.next = r, r.prev = a, r;
}
function Do(e, t, n, r) {
  const i = Io(e, t, n);
  return r ? (i.next = r.next, i.prev = r, r.next.prev = i, r.next = i) : (i.prev = i, i.next = i), i;
}
function No(e) {
  e.next.prev = e.prev, e.prev.next = e.next, e.prevZ && (e.prevZ.nextZ = e.nextZ), e.nextZ && (e.nextZ.prevZ = e.prevZ);
}
function Io(e, t, n) {
  return {
    i: e,
    x: t,
    y: n,
    prev: null,
    next: null,
    z: 0,
    prevZ: null,
    nextZ: null,
    steiner: !1
  };
}
class Earcut {
  static triangulate(e, t, n = 2) {
    return lo(e, t, n);
  }
}
class ShapeUtils {
  static area(e) {
    const t = e.length;
    let n = 0;
    for (let r = t - 1, i = 0; i < t; r = i++) n += e[r].x * e[i].y - e[i].x * e[r].y;
    return .5 * n;
  }
  static isClockWise(e) {
    return ShapeUtils.area(e) < 0;
  }
  static triangulateShape(e, t) {
    const n = [],
      r = [],
      i = [];
    Ro(e), ko(n, e);
    let a = e.length;
    t.forEach(Ro);
    for (let e = 0; e < t.length; e++) r.push(a), a += t[e].length, ko(n, t[e]);
    const s = Earcut.triangulate(n, r);
    for (let e = 0; e < s.length; e += 3) i.push(s.slice(e, e + 3));
    return i;
  }
}
function Ro(e) {
  const t = e.length;
  t > 2 && e[t - 1].equals(e[0]) && e.pop();
}
function ko(e, t) {
  for (let n = 0; n < t.length; n++) e.push(t[n].x), e.push(t[n].y);
}
class ExtrudeGeometry extends BufferGeometry {
  constructor(e = new Shape([new Vector2(.5, .5), new Vector2(-.5, .5), new Vector2(-.5, -.5), new Vector2(.5, -.5)]), t = {}) {
    super(), this.type = "ExtrudeGeometry", this.parameters = {
      shapes: e,
      options: t
    }, e = Array.isArray(e) ? e : [e];
    const n = this,
      r = [],
      i = [];
    for (let t = 0, n = e.length; t < n; t++) {
      a(e[t]);
    }
    function a(e) {
      const a = [],
        s = void 0 !== t.curveSegments ? t.curveSegments : 12,
        o = void 0 !== t.steps ? t.steps : 1,
        c = void 0 !== t.depth ? t.depth : 1;
      let l = void 0 === t.bevelEnabled || t.bevelEnabled,
        u = void 0 !== t.bevelThickness ? t.bevelThickness : .2,
        d = void 0 !== t.bevelSize ? t.bevelSize : u - .1,
        h = void 0 !== t.bevelOffset ? t.bevelOffset : 0,
        p = void 0 !== t.bevelSegments ? t.bevelSegments : 3;
      const f = t.extrudePath,
        m = void 0 !== t.UVGenerator ? t.UVGenerator : Po;
      let M,
        _,
        A,
        g,
        b,
        y = !1;
      if (f) {
        M = f.getSpacedPoints(o), y = !0, l = !1;
        const e = !!f.isCatmullRomCurve3 && f.closed;
        _ = f.computeFrenetFrames(o, e), A = new Vector3(), g = new Vector3(), b = new Vector3();
      }
      l || (p = 0, u = 0, d = 0, h = 0);
      const L = e.extractPoints(s);
      let v = L.shape;
      const T = L.holes;
      if (!ShapeUtils.isClockWise(v)) {
        v = v.reverse();
        for (let e = 0, t = T.length; e < t; e++) {
          const t = T[e];
          ShapeUtils.isClockWise(t) && (T[e] = t.reverse());
        }
      }
      function S(e) {
        const t = 1e-10 * 1e-10;
        let n = e[0];
        for (let r = 1; r <= e.length; r++) {
          const i = r % e.length,
            a = e[i],
            s = a.x - n.x,
            o = a.y - n.y,
            c = s * s + o * o,
            l = Math.max(Math.abs(a.x), Math.abs(a.y), Math.abs(n.x), Math.abs(n.y));
          c <= t * l * l ? (e.splice(i, 1), r--) : n = a;
        }
      }
      S(v), T.forEach(S);
      const w = T.length,
        E = v;
      for (let e = 0; e < w; e++) {
        const t = T[e];
        v = v.concat(t);
      }
      function x(e, t, n) {
        return t || error("ExtrudeGeometry: vec does not exist"), e.clone().addScaledVector(t, n);
      }
      const C = v.length;
      function z(e, t, n) {
        let r, i, a;
        const s = e.x - t.x,
          o = e.y - t.y,
          c = n.x - e.x,
          l = n.y - e.y,
          u = s * s + o * o,
          d = s * l - o * c;
        if (Math.abs(d) > Number.EPSILON) {
          const d = Math.sqrt(u),
            h = Math.sqrt(c * c + l * l),
            p = t.x - o / d,
            f = t.y + s / d,
            m = ((n.x - l / h - p) * l - (n.y + c / h - f) * c) / (s * l - o * c);
          r = p + s * m - e.x, i = f + o * m - e.y;
          const M = r * r + i * i;
          if (M <= 2) return new Vector2(r, i);
          a = Math.sqrt(M / 2);
        } else {
          let e = !1;
          s > Number.EPSILON ? c > Number.EPSILON && (e = !0) : s < -Number.EPSILON ? c < -Number.EPSILON && (e = !0) : Math.sign(o) === Math.sign(l) && (e = !0), e ? (r = -o, i = s, a = Math.sqrt(u)) : (r = s, i = o, a = Math.sqrt(u / 2));
        }
        return new Vector2(r / a, i / a);
      }
      const O = [];
      for (let e = 0, t = E.length, n = t - 1, r = e + 1; e < t; e++, n++, r++) n === t && (n = 0), r === t && (r = 0), O[e] = z(E[e], E[n], E[r]);
      const B = [];
      let D,
        N,
        I = O.concat();
      for (let e = 0, t = w; e < t; e++) {
        const t = T[e];
        D = [];
        for (let e = 0, n = t.length, r = n - 1, i = e + 1; e < n; e++, r++, i++) r === n && (r = 0), i === n && (i = 0), D[e] = z(t[e], t[r], t[i]);
        B.push(D), I = I.concat(D);
      }
      if (0 === p) N = ShapeUtils.triangulateShape(E, T);else {
        const e = [],
          t = [];
        for (let n = 0; n < p; n++) {
          const r = n / p,
            i = u * Math.cos(r * Math.PI / 2),
            a = d * Math.sin(r * Math.PI / 2) + h;
          for (let t = 0, n = E.length; t < n; t++) {
            const n = x(E[t], O[t], a);
            Y(n.x, n.y, -i), 0 === r && e.push(n);
          }
          for (let e = 0, n = w; e < n; e++) {
            const n = T[e];
            D = B[e];
            const s = [];
            for (let e = 0, t = n.length; e < t; e++) {
              const t = x(n[e], D[e], a);
              Y(t.x, t.y, -i), 0 === r && s.push(t);
            }
            0 === r && t.push(s);
          }
        }
        N = ShapeUtils.triangulateShape(e, t);
      }
      const R = N.length,
        k = d + h;
      for (let e = 0; e < C; e++) {
        const t = l ? x(v[e], I[e], k) : v[e];
        y ? (g.copy(_.normals[0]).multiplyScalar(t.x), A.copy(_.binormals[0]).multiplyScalar(t.y), b.copy(M[0]).add(g).add(A), Y(b.x, b.y, b.z)) : Y(t.x, t.y, 0);
      }
      for (let e = 1; e <= o; e++) for (let t = 0; t < C; t++) {
        const n = l ? x(v[t], I[t], k) : v[t];
        y ? (g.copy(_.normals[e]).multiplyScalar(n.x), A.copy(_.binormals[e]).multiplyScalar(n.y), b.copy(M[e]).add(g).add(A), Y(b.x, b.y, b.z)) : Y(n.x, n.y, c / o * e);
      }
      for (let e = p - 1; e >= 0; e--) {
        const t = e / p,
          n = u * Math.cos(t * Math.PI / 2),
          r = d * Math.sin(t * Math.PI / 2) + h;
        for (let e = 0, t = E.length; e < t; e++) {
          const t = x(E[e], O[e], r);
          Y(t.x, t.y, c + n);
        }
        for (let e = 0, t = T.length; e < t; e++) {
          const t = T[e];
          D = B[e];
          for (let e = 0, i = t.length; e < i; e++) {
            const i = x(t[e], D[e], r);
            y ? Y(i.x, i.y + M[o - 1].y, M[o - 1].x + n) : Y(i.x, i.y, c + n);
          }
        }
      }
      function P(e, t) {
        let n = e.length;
        for (; --n >= 0;) {
          const r = n;
          let i = n - 1;
          i < 0 && (i = e.length - 1);
          for (let e = 0, n = o + 2 * p; e < n; e++) {
            const n = C * e,
              a = C * (e + 1);
            F(t + r + n, t + i + n, t + i + a, t + r + a);
          }
        }
      }
      function Y(e, t, n) {
        a.push(e), a.push(t), a.push(n);
      }
      function W(e, t, i) {
        q(e), q(t), q(i);
        const a = r.length / 3,
          s = m.generateTopUV(n, r, a - 3, a - 2, a - 1);
        H(s[0]), H(s[1]), H(s[2]);
      }
      function F(e, t, i, a) {
        q(e), q(t), q(a), q(t), q(i), q(a);
        const s = r.length / 3,
          o = m.generateSideWallUV(n, r, s - 6, s - 3, s - 2, s - 1);
        H(o[0]), H(o[1]), H(o[3]), H(o[1]), H(o[2]), H(o[3]);
      }
      function q(e) {
        r.push(a[3 * e + 0]), r.push(a[3 * e + 1]), r.push(a[3 * e + 2]);
      }
      function H(e) {
        i.push(e.x), i.push(e.y);
      }
      !function () {
        const e = r.length / 3;
        if (l) {
          let e = 0,
            t = C * e;
          for (let e = 0; e < R; e++) {
            const n = N[e];
            W(n[2] + t, n[1] + t, n[0] + t);
          }
          e = o + 2 * p, t = C * e;
          for (let e = 0; e < R; e++) {
            const n = N[e];
            W(n[0] + t, n[1] + t, n[2] + t);
          }
        } else {
          for (let e = 0; e < R; e++) {
            const t = N[e];
            W(t[2], t[1], t[0]);
          }
          for (let e = 0; e < R; e++) {
            const t = N[e];
            W(t[0] + C * o, t[1] + C * o, t[2] + C * o);
          }
        }
        n.addGroup(e, r.length / 3 - e, 0);
      }(), function () {
        const e = r.length / 3;
        let t = 0;
        P(E, t), t += E.length;
        for (let e = 0, n = T.length; e < n; e++) {
          const n = T[e];
          P(n, t), t += n.length;
        }
        n.addGroup(e, r.length / 3 - e, 1);
      }();
    }
    this.setAttribute("position", new Float32BufferAttribute(r, 3)), this.setAttribute("uv", new Float32BufferAttribute(i, 2)), this.computeVertexNormals();
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  toJSON() {
    const e = super.toJSON();
    return function (e, t, n) {
      if (n.shapes = [], Array.isArray(e)) for (let t = 0, r = e.length; t < r; t++) {
        const r = e[t];
        n.shapes.push(r.uuid);
      } else n.shapes.push(e.uuid);
      n.options = Object.assign({}, t), void 0 !== t.extrudePath && (n.options.extrudePath = t.extrudePath.toJSON());
      return n;
    }(this.parameters.shapes, this.parameters.options, e);
  }
  static fromJSON(e, t) {
    const n = [];
    for (let r = 0, i = e.shapes.length; r < i; r++) {
      const i = t[e.shapes[r]];
      n.push(i);
    }
    const r = e.options.extrudePath;
    return void 0 !== r && (e.options.extrudePath = new co[r.type]().fromJSON(r)), new ExtrudeGeometry(n, e.options);
  }
}
const Po = {
  generateTopUV: function (e, t, n, r, i) {
    const a = t[3 * n],
      s = t[3 * n + 1],
      o = t[3 * r],
      c = t[3 * r + 1],
      l = t[3 * i],
      u = t[3 * i + 1];
    return [new Vector2(a, s), new Vector2(o, c), new Vector2(l, u)];
  },
  generateSideWallUV: function (e, t, n, r, i, a) {
    const s = t[3 * n],
      o = t[3 * n + 1],
      c = t[3 * n + 2],
      l = t[3 * r],
      u = t[3 * r + 1],
      d = t[3 * r + 2],
      h = t[3 * i],
      p = t[3 * i + 1],
      f = t[3 * i + 2],
      m = t[3 * a],
      M = t[3 * a + 1],
      _ = t[3 * a + 2];
    return Math.abs(o - u) < Math.abs(s - l) ? [new Vector2(s, 1 - c), new Vector2(l, 1 - d), new Vector2(h, 1 - f), new Vector2(m, 1 - _)] : [new Vector2(o, 1 - c), new Vector2(u, 1 - d), new Vector2(p, 1 - f), new Vector2(M, 1 - _)];
  }
};
class IcosahedronGeometry extends PolyhedronGeometry {
  constructor(e = 1, t = 0) {
    const n = (1 + Math.sqrt(5)) / 2;
    super([-1, n, 0, 1, n, 0, -1, -n, 0, 1, -n, 0, 0, -1, n, 0, 1, n, 0, -1, -n, 0, 1, -n, n, 0, -1, n, 0, 1, -n, 0, -1, -n, 0, 1], [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1], e, t), this.type = "IcosahedronGeometry", this.parameters = {
      radius: e,
      detail: t
    };
  }
  static fromJSON(e) {
    return new IcosahedronGeometry(e.radius, e.detail);
  }
}
class LatheGeometry extends BufferGeometry {
  constructor(e = [new Vector2(0, -.5), new Vector2(.5, 0), new Vector2(0, .5)], t = 12, n = 0, r = 2 * Math.PI) {
    super(), this.type = "LatheGeometry", this.parameters = {
      points: e,
      segments: t,
      phiStart: n,
      phiLength: r
    }, t = Math.floor(t), r = Lr(r, 0, 2 * Math.PI);
    const i = [],
      a = [],
      s = [],
      o = [],
      c = [],
      l = 1 / t,
      u = new Vector3(),
      d = new Vector2(),
      h = new Vector3(),
      p = new Vector3(),
      f = new Vector3();
    let m = 0,
      M = 0;
    for (let t = 0; t <= e.length - 1; t++) switch (t) {
      case 0:
        m = e[t + 1].x - e[t].x, M = e[t + 1].y - e[t].y, h.x = 1 * M, h.y = -m, h.z = 0 * M, f.copy(h), h.normalize(), o.push(h.x, h.y, h.z);
        break;
      case e.length - 1:
        o.push(f.x, f.y, f.z);
        break;
      default:
        m = e[t + 1].x - e[t].x, M = e[t + 1].y - e[t].y, h.x = 1 * M, h.y = -m, h.z = 0 * M, p.copy(h), h.x += f.x, h.y += f.y, h.z += f.z, h.normalize(), o.push(h.x, h.y, h.z), f.copy(p);
    }
    for (let i = 0; i <= t; i++) {
      const h = n + i * l * r,
        p = Math.sin(h),
        f = Math.cos(h);
      for (let n = 0; n <= e.length - 1; n++) {
        u.x = e[n].x * p, u.y = e[n].y, u.z = e[n].x * f, a.push(u.x, u.y, u.z), d.x = i / t, d.y = n / (e.length - 1), s.push(d.x, d.y);
        const r = o[3 * n + 0] * p,
          l = o[3 * n + 1],
          h = o[3 * n + 0] * f;
        c.push(r, l, h);
      }
    }
    for (let n = 0; n < t; n++) for (let t = 0; t < e.length - 1; t++) {
      const r = t + n * e.length,
        a = r,
        s = r + e.length,
        o = r + e.length + 1,
        c = r + 1;
      i.push(a, s, c), i.push(o, c, s);
    }
    this.setIndex(i), this.setAttribute("position", new Float32BufferAttribute(a, 3)), this.setAttribute("uv", new Float32BufferAttribute(s, 2)), this.setAttribute("normal", new Float32BufferAttribute(c, 3));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new LatheGeometry(e.points, e.segments, e.phiStart, e.phiLength);
  }
}
class OctahedronGeometry extends PolyhedronGeometry {
  constructor(e = 1, t = 0) {
    super([1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1], [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2], e, t), this.type = "OctahedronGeometry", this.parameters = {
      radius: e,
      detail: t
    };
  }
  static fromJSON(e) {
    return new OctahedronGeometry(e.radius, e.detail);
  }
}
class PlaneGeometry extends BufferGeometry {
  constructor(e = 1, t = 1, n = 1, r = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: e,
      height: t,
      widthSegments: n,
      heightSegments: r
    };
    const i = e / 2,
      a = t / 2,
      s = Math.floor(n),
      o = Math.floor(r),
      c = s + 1,
      l = o + 1,
      u = e / s,
      d = t / o,
      h = [],
      p = [],
      f = [],
      m = [];
    for (let e = 0; e < l; e++) {
      const t = e * d - a;
      for (let n = 0; n < c; n++) {
        const r = n * u - i;
        p.push(r, -t, 0), f.push(0, 0, 1), m.push(n / s), m.push(1 - e / o);
      }
    }
    for (let e = 0; e < o; e++) for (let t = 0; t < s; t++) {
      const n = t + c * e,
        r = t + c * (e + 1),
        i = t + 1 + c * (e + 1),
        a = t + 1 + c * e;
      h.push(n, r, a), h.push(r, i, a);
    }
    this.setIndex(h), this.setAttribute("position", new Float32BufferAttribute(p, 3)), this.setAttribute("normal", new Float32BufferAttribute(f, 3)), this.setAttribute("uv", new Float32BufferAttribute(m, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new PlaneGeometry(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}
class RingGeometry extends BufferGeometry {
  constructor(e = .5, t = 1, n = 32, r = 1, i = 0, a = 2 * Math.PI) {
    super(), this.type = "RingGeometry", this.parameters = {
      innerRadius: e,
      outerRadius: t,
      thetaSegments: n,
      phiSegments: r,
      thetaStart: i,
      thetaLength: a
    }, n = Math.max(3, n);
    const s = [],
      o = [],
      c = [],
      l = [];
    let u = e;
    const d = (t - e) / (r = Math.max(1, r)),
      h = new Vector3(),
      p = new Vector2();
    for (let e = 0; e <= r; e++) {
      for (let e = 0; e <= n; e++) {
        const r = i + e / n * a;
        h.x = u * Math.cos(r), h.y = u * Math.sin(r), o.push(h.x, h.y, h.z), c.push(0, 0, 1), p.x = (h.x / t + 1) / 2, p.y = (h.y / t + 1) / 2, l.push(p.x, p.y);
      }
      u += d;
    }
    for (let e = 0; e < r; e++) {
      const t = e * (n + 1);
      for (let e = 0; e < n; e++) {
        const r = e + t,
          i = r,
          a = r + n + 1,
          o = r + n + 2,
          c = r + 1;
        s.push(i, a, c), s.push(a, o, c);
      }
    }
    this.setIndex(s), this.setAttribute("position", new Float32BufferAttribute(o, 3)), this.setAttribute("normal", new Float32BufferAttribute(c, 3)), this.setAttribute("uv", new Float32BufferAttribute(l, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new RingGeometry(e.innerRadius, e.outerRadius, e.thetaSegments, e.phiSegments, e.thetaStart, e.thetaLength);
  }
}
class ShapeGeometry extends BufferGeometry {
  constructor(e = new Shape([new Vector2(0, .5), new Vector2(-.5, -.5), new Vector2(.5, -.5)]), t = 12) {
    super(), this.type = "ShapeGeometry", this.parameters = {
      shapes: e,
      curveSegments: t
    };
    const n = [],
      r = [],
      i = [],
      a = [];
    let s = 0,
      o = 0;
    if (!1 === Array.isArray(e)) c(e);else for (let t = 0; t < e.length; t++) c(e[t]), this.addGroup(s, o, t), s += o, o = 0;
    function c(e) {
      const s = r.length / 3,
        c = e.extractPoints(t);
      let l = c.shape;
      const u = c.holes;
      !1 === ShapeUtils.isClockWise(l) && (l = l.reverse());
      for (let e = 0, t = u.length; e < t; e++) {
        const t = u[e];
        !0 === ShapeUtils.isClockWise(t) && (u[e] = t.reverse());
      }
      const d = ShapeUtils.triangulateShape(l, u);
      for (let e = 0, t = u.length; e < t; e++) {
        const t = u[e];
        l = l.concat(t);
      }
      for (let e = 0, t = l.length; e < t; e++) {
        const t = l[e];
        r.push(t.x, t.y, 0), i.push(0, 0, 1), a.push(t.x, t.y);
      }
      for (let e = 0, t = d.length; e < t; e++) {
        const t = d[e],
          r = t[0] + s,
          i = t[1] + s,
          a = t[2] + s;
        n.push(r, i, a), o += 3;
      }
    }
    this.setIndex(n), this.setAttribute("position", new Float32BufferAttribute(r, 3)), this.setAttribute("normal", new Float32BufferAttribute(i, 3)), this.setAttribute("uv", new Float32BufferAttribute(a, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  toJSON() {
    const e = super.toJSON();
    return function (e, t) {
      if (t.shapes = [], Array.isArray(e)) for (let n = 0, r = e.length; n < r; n++) {
        const r = e[n];
        t.shapes.push(r.uuid);
      } else t.shapes.push(e.uuid);
      return t;
    }(this.parameters.shapes, e);
  }
  static fromJSON(e, t) {
    const n = [];
    for (let r = 0, i = e.shapes.length; r < i; r++) {
      const i = t[e.shapes[r]];
      n.push(i);
    }
    return new ShapeGeometry(n, e.curveSegments);
  }
}
class SphereGeometry extends BufferGeometry {
  constructor(e = 1, t = 32, n = 16, r = 0, i = 2 * Math.PI, a = 0, s = Math.PI) {
    super(), this.type = "SphereGeometry", this.parameters = {
      radius: e,
      widthSegments: t,
      heightSegments: n,
      phiStart: r,
      phiLength: i,
      thetaStart: a,
      thetaLength: s
    }, t = Math.max(3, Math.floor(t)), n = Math.max(2, Math.floor(n));
    const o = Math.min(a + s, Math.PI);
    let c = 0;
    const l = [],
      u = new Vector3(),
      d = new Vector3(),
      h = [],
      p = [],
      f = [],
      m = [];
    for (let h = 0; h <= n; h++) {
      const M = [],
        _ = h / n,
        A = a + _ * s,
        g = e * Math.cos(A),
        b = Math.sqrt(e * e - g * g);
      let y = 0;
      0 === h && 0 === a ? y = .5 / t : h === n && o === Math.PI && (y = -.5 / t);
      for (let e = 0; e <= t; e++) {
        const n = e / t,
          a = r + n * i;
        u.x = -b * Math.cos(a), u.y = g, u.z = b * Math.sin(a), p.push(u.x, u.y, u.z), d.copy(u).normalize(), f.push(d.x, d.y, d.z), m.push(n + y, 1 - _), M.push(c++);
      }
      l.push(M);
    }
    for (let e = 0; e < n; e++) for (let r = 0; r < t; r++) {
      const t = l[e][r + 1],
        i = l[e][r],
        s = l[e + 1][r],
        c = l[e + 1][r + 1];
      (0 !== e || a > 0) && h.push(t, i, c), (e !== n - 1 || o < Math.PI) && h.push(i, s, c);
    }
    this.setIndex(h), this.setAttribute("position", new Float32BufferAttribute(p, 3)), this.setAttribute("normal", new Float32BufferAttribute(f, 3)), this.setAttribute("uv", new Float32BufferAttribute(m, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new SphereGeometry(e.radius, e.widthSegments, e.heightSegments, e.phiStart, e.phiLength, e.thetaStart, e.thetaLength);
  }
}
class TetrahedronGeometry extends PolyhedronGeometry {
  constructor(e = 1, t = 0) {
    super([1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1], [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1], e, t), this.type = "TetrahedronGeometry", this.parameters = {
      radius: e,
      detail: t
    };
  }
  static fromJSON(e) {
    return new TetrahedronGeometry(e.radius, e.detail);
  }
}
class TorusGeometry extends BufferGeometry {
  constructor(e = 1, t = .4, n = 12, r = 48, i = 2 * Math.PI, a = 0, s = 2 * Math.PI) {
    super(), this.type = "TorusGeometry", this.parameters = {
      radius: e,
      tube: t,
      radialSegments: n,
      tubularSegments: r,
      arc: i,
      thetaStart: a,
      thetaLength: s
    }, n = Math.floor(n), r = Math.floor(r);
    const o = [],
      c = [],
      l = [],
      u = [],
      d = new Vector3(),
      h = new Vector3(),
      p = new Vector3();
    for (let o = 0; o <= n; o++) {
      const f = a + o / n * s;
      for (let a = 0; a <= r; a++) {
        const s = a / r * i;
        h.x = (e + t * Math.cos(f)) * Math.cos(s), h.y = (e + t * Math.cos(f)) * Math.sin(s), h.z = t * Math.sin(f), c.push(h.x, h.y, h.z), d.x = e * Math.cos(s), d.y = e * Math.sin(s), p.subVectors(h, d).normalize(), l.push(p.x, p.y, p.z), u.push(a / r), u.push(o / n);
      }
    }
    for (let e = 1; e <= n; e++) for (let t = 1; t <= r; t++) {
      const n = (r + 1) * e + t - 1,
        i = (r + 1) * (e - 1) + t - 1,
        a = (r + 1) * (e - 1) + t,
        s = (r + 1) * e + t;
      o.push(n, i, s), o.push(i, a, s);
    }
    this.setIndex(o), this.setAttribute("position", new Float32BufferAttribute(c, 3)), this.setAttribute("normal", new Float32BufferAttribute(l, 3)), this.setAttribute("uv", new Float32BufferAttribute(u, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new TorusGeometry(e.radius, e.tube, e.radialSegments, e.tubularSegments, e.arc);
  }
}
class TorusKnotGeometry extends BufferGeometry {
  constructor(e = 1, t = .4, n = 64, r = 8, i = 2, a = 3) {
    super(), this.type = "TorusKnotGeometry", this.parameters = {
      radius: e,
      tube: t,
      tubularSegments: n,
      radialSegments: r,
      p: i,
      q: a
    }, n = Math.floor(n), r = Math.floor(r);
    const s = [],
      o = [],
      c = [],
      l = [],
      u = new Vector3(),
      d = new Vector3(),
      h = new Vector3(),
      p = new Vector3(),
      f = new Vector3(),
      m = new Vector3(),
      M = new Vector3();
    for (let s = 0; s <= n; ++s) {
      const A = s / n * i * Math.PI * 2;
      _(A, i, a, e, h), _(A + .01, i, a, e, p), m.subVectors(p, h), M.addVectors(p, h), f.crossVectors(m, M), M.crossVectors(f, m), f.normalize(), M.normalize();
      for (let e = 0; e <= r; ++e) {
        const i = e / r * Math.PI * 2,
          a = -t * Math.cos(i),
          p = t * Math.sin(i);
        u.x = h.x + (a * M.x + p * f.x), u.y = h.y + (a * M.y + p * f.y), u.z = h.z + (a * M.z + p * f.z), o.push(u.x, u.y, u.z), d.subVectors(u, h).normalize(), c.push(d.x, d.y, d.z), l.push(s / n), l.push(e / r);
      }
    }
    for (let e = 1; e <= n; e++) for (let t = 1; t <= r; t++) {
      const n = (r + 1) * (e - 1) + (t - 1),
        i = (r + 1) * e + (t - 1),
        a = (r + 1) * e + t,
        o = (r + 1) * (e - 1) + t;
      s.push(n, i, o), s.push(i, a, o);
    }
    function _(e, t, n, r, i) {
      const a = Math.cos(e),
        s = Math.sin(e),
        o = n / t * e,
        c = Math.cos(o);
      i.x = r * (2 + c) * .5 * a, i.y = r * (2 + c) * s * .5, i.z = r * Math.sin(o) * .5;
    }
    this.setIndex(s), this.setAttribute("position", new Float32BufferAttribute(o, 3)), this.setAttribute("normal", new Float32BufferAttribute(c, 3)), this.setAttribute("uv", new Float32BufferAttribute(l, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new TorusKnotGeometry(e.radius, e.tube, e.tubularSegments, e.radialSegments, e.p, e.q);
  }
}
class TubeGeometry extends BufferGeometry {
  constructor(e = new QuadraticBezierCurve3(new Vector3(-1, -1, 0), new Vector3(-1, 1, 0), new Vector3(1, 1, 0)), t = 64, n = 1, r = 8, i = !1) {
    super(), this.type = "TubeGeometry", this.parameters = {
      path: e,
      tubularSegments: t,
      radius: n,
      radialSegments: r,
      closed: i
    };
    const a = e.computeFrenetFrames(t, i);
    this.tangents = a.tangents, this.normals = a.normals, this.binormals = a.binormals;
    const s = new Vector3(),
      o = new Vector3(),
      c = new Vector2();
    let l = new Vector3();
    const u = [],
      d = [],
      h = [],
      p = [];
    function f(i) {
      l = e.getPointAt(i / t, l);
      const c = a.normals[i],
        h = a.binormals[i];
      for (let e = 0; e <= r; e++) {
        const t = e / r * Math.PI * 2,
          i = Math.sin(t),
          a = -Math.cos(t);
        o.x = a * c.x + i * h.x, o.y = a * c.y + i * h.y, o.z = a * c.z + i * h.z, o.normalize(), d.push(o.x, o.y, o.z), s.x = l.x + n * o.x, s.y = l.y + n * o.y, s.z = l.z + n * o.z, u.push(s.x, s.y, s.z);
      }
    }
    !function () {
      for (let e = 0; e < t; e++) f(e);
      f(!1 === i ? t : 0), function () {
        for (let e = 0; e <= t; e++) for (let n = 0; n <= r; n++) c.x = e / t, c.y = n / r, h.push(c.x, c.y);
      }(), function () {
        for (let e = 1; e <= t; e++) for (let t = 1; t <= r; t++) {
          const n = (r + 1) * (e - 1) + (t - 1),
            i = (r + 1) * e + (t - 1),
            a = (r + 1) * e + t,
            s = (r + 1) * (e - 1) + t;
          p.push(n, i, s), p.push(i, a, s);
        }
      }();
    }(), this.setIndex(p), this.setAttribute("position", new Float32BufferAttribute(u, 3)), this.setAttribute("normal", new Float32BufferAttribute(d, 3)), this.setAttribute("uv", new Float32BufferAttribute(h, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.path = this.parameters.path.toJSON(), e;
  }
  static fromJSON(e) {
    return new TubeGeometry(new co[e.path.type]().fromJSON(e.path), e.tubularSegments, e.radius, e.radialSegments, e.closed);
  }
}
class WireframeGeometry extends BufferGeometry {
  constructor(e = null) {
    if (super(), this.type = "WireframeGeometry", this.parameters = {
      geometry: e
    }, null !== e) {
      const t = [],
        set = new Set(),
        r = new Vector3(),
        i = new Vector3();
      if (null !== e.index) {
        const a = e.attributes.position,
          s = e.index;
        let o = e.groups;
        0 === o.length && (o = [{
          start: 0,
          count: s.count,
          materialIndex: 0
        }]);
        for (let e = 0, c = o.length; e < c; ++e) {
          const c = o[e],
            l = c.start;
          for (let e = l, o = l + c.count; e < o; e += 3) for (let o = 0; o < 3; o++) {
            const c = s.getX(e + o),
              l = s.getX(e + (o + 1) % 3);
            r.fromBufferAttribute(a, c), i.fromBufferAttribute(a, l), !0 === Yo(r, i, set) && (t.push(r.x, r.y, r.z), t.push(i.x, i.y, i.z));
          }
        }
      } else {
        const a = e.attributes.position;
        for (let e = 0, s = a.count / 3; e < s; e++) for (let s = 0; s < 3; s++) {
          const o = 3 * e + s,
            c = 3 * e + (s + 1) % 3;
          r.fromBufferAttribute(a, o), i.fromBufferAttribute(a, c), !0 === Yo(r, i, set) && (t.push(r.x, r.y, r.z), t.push(i.x, i.y, i.z));
        }
      }
      this.setAttribute("position", new Float32BufferAttribute(t, 3));
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
}
function Yo(e, t, n) {
  const r = `${e.x},${e.y},${e.z}-${t.x},${t.y},${t.z}`,
    i = `${t.x},${t.y},${t.z}-${e.x},${e.y},${e.z}`;
  return !0 !== n.has(r) && !0 !== n.has(i) && (n.add(r), n.add(i), !0);
}
var Wo = Object.freeze({
  __proto__: null,
  BoxGeometry: BoxGeometry,
  CapsuleGeometry: CapsuleGeometry,
  CircleGeometry: CircleGeometry,
  ConeGeometry: ConeGeometry,
  CylinderGeometry: CylinderGeometry,
  DodecahedronGeometry: DodecahedronGeometry,
  EdgesGeometry: EdgesGeometry,
  ExtrudeGeometry: ExtrudeGeometry,
  IcosahedronGeometry: IcosahedronGeometry,
  LatheGeometry: LatheGeometry,
  OctahedronGeometry: OctahedronGeometry,
  PlaneGeometry: PlaneGeometry,
  PolyhedronGeometry: PolyhedronGeometry,
  RingGeometry: RingGeometry,
  ShapeGeometry: ShapeGeometry,
  SphereGeometry: SphereGeometry,
  TetrahedronGeometry: TetrahedronGeometry,
  TorusGeometry: TorusGeometry,
  TorusKnotGeometry: TorusKnotGeometry,
  TubeGeometry: TubeGeometry,
  WireframeGeometry: WireframeGeometry
});
class ShadowMaterial extends Material {
  constructor(e) {
    super(), this.isShadowMaterial = !0, this.type = "ShadowMaterial", this.color = new Color(0), this.transparent = !0, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.fog = e.fog, this;
  }
}
function cloneUniforms(e) {
  const t = {};
  for (const n in e) {
    t[n] = {};
    for (const r in e[n]) {
      const i = e[n][r];
      if (Ho(i)) i.isRenderTargetTexture ? (warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[n][r] = null) : t[n][r] = i.clone();else if (Array.isArray(i)) {
        if (Ho(i[0])) {
          const e = [];
          for (let t = 0, n = i.length; t < n; t++) e[t] = i[t].clone();
          t[n][r] = e;
        } else t[n][r] = i.slice();
      } else t[n][r] = i;
    }
  }
  return t;
}
function mergeUniforms(e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = cloneUniforms(e[n]);
    for (const e in r) t[e] = r[e];
  }
  return t;
}
function Ho(e) {
  return e && (e.isColor || e.isMatrix3 || e.isMatrix4 || e.isVector2 || e.isVector3 || e.isVector4 || e.isTexture || e.isQuaternion);
}
function getUnlitUniformColorSpace(e) {
  const t = e.getRenderTarget();
  return null === t ? e.outputColorSpace : !0 === t.isXRRenderTarget ? t.texture.colorSpace : ColorManagement.workingColorSpace;
}
const UniformsUtils = {
  clone: cloneUniforms,
  merge: mergeUniforms
};
class ShaderMaterial extends Material {
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", this.fragmentShader = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      clipCullDistance: !1,
      multiDraw: !1
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, void 0 !== e && this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = cloneUniforms(e.uniforms), this.uniformsGroups = function (e) {
      const t = [];
      for (let n = 0; n < e.length; n++) t.push(e[n].clone());
      return t;
    }(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this.defaultAttributeValues = Object.assign({}, e.defaultAttributeValues), this.index0AttributeName = e.index0AttributeName, this.uniformsNeedUpdate = e.uniformsNeedUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.glslVersion = this.glslVersion, t.uniforms = {};
    for (const n in this.uniforms) {
      const r = this.uniforms[n].value;
      r && r.isTexture ? t.uniforms[n] = {
        type: "t",
        value: r.toJSON(e).uuid
      } : r && r.isColor ? t.uniforms[n] = {
        type: "c",
        value: r.getHex()
      } : r && r.isVector2 ? t.uniforms[n] = {
        type: "v2",
        value: r.toArray()
      } : r && r.isVector3 ? t.uniforms[n] = {
        type: "v3",
        value: r.toArray()
      } : r && r.isVector4 ? t.uniforms[n] = {
        type: "v4",
        value: r.toArray()
      } : r && r.isMatrix3 ? t.uniforms[n] = {
        type: "m3",
        value: r.toArray()
      } : r && r.isMatrix4 ? t.uniforms[n] = {
        type: "m4",
        value: r.toArray()
      } : t.uniforms[n] = {
        value: r
      };
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
    const n = {};
    for (const e in this.extensions) !0 === this.extensions[e] && (n[e] = !0);
    return Object.keys(n).length > 0 && (t.extensions = n), t;
  }
  fromJSON(e, t) {
    if (super.fromJSON(e, t), void 0 !== e.uniforms) for (const n in e.uniforms) {
      const r = e.uniforms[n];
      switch (this.uniforms[n] = {}, r.type) {
        case "t":
          this.uniforms[n].value = t[r.value] || null;
          break;
        case "c":
          this.uniforms[n].value = new Color().setHex(r.value);
          break;
        case "v2":
          this.uniforms[n].value = new Vector2().fromArray(r.value);
          break;
        case "v3":
          this.uniforms[n].value = new Vector3().fromArray(r.value);
          break;
        case "v4":
          this.uniforms[n].value = new Vector4().fromArray(r.value);
          break;
        case "m3":
          this.uniforms[n].value = new Matrix3().fromArray(r.value);
          break;
        case "m4":
          this.uniforms[n].value = new Matrix4().fromArray(r.value);
          break;
        default:
          this.uniforms[n].value = r.value;
      }
    }
    if (void 0 !== e.defines && (this.defines = e.defines), void 0 !== e.vertexShader && (this.vertexShader = e.vertexShader), void 0 !== e.fragmentShader && (this.fragmentShader = e.fragmentShader), void 0 !== e.glslVersion && (this.glslVersion = e.glslVersion), void 0 !== e.extensions) for (const t in e.extensions) this.extensions[t] = e.extensions[t];
    return void 0 !== e.lights && (this.lights = e.lights), void 0 !== e.clipping && (this.clipping = e.clipping), this;
  }
}
class RawShaderMaterial extends ShaderMaterial {
  constructor(e) {
    super(e), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
  }
}
class MeshStandardMaterial extends Material {
  constructor(e) {
    super(), this.isMeshStandardMaterial = !0, this.type = "MeshStandardMaterial", this.defines = {
      STANDARD: ""
    }, this.color = new Color(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Color(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = nn, this.normalScale = new Vector2(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Euler(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.defines = {
      STANDARD: ""
    }, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.envMapIntensity = e.envMapIntensity, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
  }
}
class MeshPhysicalMaterial extends MeshStandardMaterial {
  constructor(e) {
    super(), this.isMeshPhysicalMaterial = !0, this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.type = "MeshPhysicalMaterial", this.anisotropyRotation = 0, this.anisotropyMap = null, this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new Vector2(1, 1), this.clearcoatNormalMap = null, this.ior = 1.5, Object.defineProperty(this, "reflectivity", {
      get: function () {
        return Lr(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1);
      },
      set: function (e) {
        this.ior = (1 + .4 * e) / (1 - .4 * e);
      }
    }), this.iridescenceMap = null, this.iridescenceIOR = 1.3, this.iridescenceThicknessRange = [100, 400], this.iridescenceThicknessMap = null, this.sheenColor = new Color(0), this.sheenColorMap = null, this.sheenRoughness = 1, this.sheenRoughnessMap = null, this.transmissionMap = null, this.thickness = 0, this.thicknessMap = null, this.attenuationDistance = 1 / 0, this.attenuationColor = new Color(1, 1, 1), this.specularIntensity = 1, this.specularIntensityMap = null, this.specularColor = new Color(1, 1, 1), this.specularColorMap = null, this._anisotropy = 0, this._clearcoat = 0, this._dispersion = 0, this._iridescence = 0, this._sheen = 0, this._transmission = 0, this.setValues(e);
  }
  get anisotropy() {
    return this._anisotropy;
  }
  set anisotropy(anisotropy) {
    this._anisotropy > 0 != anisotropy > 0 && this.version++, this._anisotropy = anisotropy;
  }
  get clearcoat() {
    return this._clearcoat;
  }
  set clearcoat(clearcoat) {
    this._clearcoat > 0 != clearcoat > 0 && this.version++, this._clearcoat = clearcoat;
  }
  get iridescence() {
    return this._iridescence;
  }
  set iridescence(iridescence) {
    this._iridescence > 0 != iridescence > 0 && this.version++, this._iridescence = iridescence;
  }
  get dispersion() {
    return this._dispersion;
  }
  set dispersion(dispersion) {
    this._dispersion > 0 != dispersion > 0 && this.version++, this._dispersion = dispersion;
  }
  get sheen() {
    return this._sheen;
  }
  set sheen(sheen) {
    this._sheen > 0 != sheen > 0 && this.version++, this._sheen = sheen;
  }
  get transmission() {
    return this._transmission;
  }
  set transmission(transmission) {
    this._transmission > 0 != transmission > 0 && this.version++, this._transmission = transmission;
  }
  copy(e) {
    return super.copy(e), this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.anisotropy = e.anisotropy, this.anisotropyRotation = e.anisotropyRotation, this.anisotropyMap = e.anisotropyMap, this.clearcoat = e.clearcoat, this.clearcoatMap = e.clearcoatMap, this.clearcoatRoughness = e.clearcoatRoughness, this.clearcoatRoughnessMap = e.clearcoatRoughnessMap, this.clearcoatNormalMap = e.clearcoatNormalMap, this.clearcoatNormalScale.copy(e.clearcoatNormalScale), this.dispersion = e.dispersion, this.ior = e.ior, this.iridescence = e.iridescence, this.iridescenceMap = e.iridescenceMap, this.iridescenceIOR = e.iridescenceIOR, this.iridescenceThicknessRange = [...e.iridescenceThicknessRange], this.iridescenceThicknessMap = e.iridescenceThicknessMap, this.sheen = e.sheen, this.sheenColor.copy(e.sheenColor), this.sheenColorMap = e.sheenColorMap, this.sheenRoughness = e.sheenRoughness, this.sheenRoughnessMap = e.sheenRoughnessMap, this.transmission = e.transmission, this.transmissionMap = e.transmissionMap, this.thickness = e.thickness, this.thicknessMap = e.thicknessMap, this.attenuationDistance = e.attenuationDistance, this.attenuationColor.copy(e.attenuationColor), this.specularIntensity = e.specularIntensity, this.specularIntensityMap = e.specularIntensityMap, this.specularColor.copy(e.specularColor), this.specularColorMap = e.specularColorMap, this;
  }
}
class MeshPhongMaterial extends Material {
  constructor(e) {
    super(), this.isMeshPhongMaterial = !0, this.type = "MeshPhongMaterial", this.color = new Color(16777215), this.specular = new Color(1118481), this.shininess = 30, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Color(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = nn, this.normalScale = new Vector2(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Euler(), this.combine = Z, this.reflectivity = 1, this.envMapIntensity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.specular.copy(e.specular), this.shininess = e.shininess, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.envMapIntensity = e.envMapIntensity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
  }
}
class MeshToonMaterial extends Material {
  constructor(e) {
    super(), this.isMeshToonMaterial = !0, this.defines = {
      TOON: ""
    }, this.type = "MeshToonMaterial", this.color = new Color(16777215), this.map = null, this.gradientMap = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Color(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = nn, this.normalScale = new Vector2(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.alphaMap = null, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.gradientMap = e.gradientMap, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.alphaMap = e.alphaMap, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}
class MeshNormalMaterial extends Material {
  constructor(e) {
    super(), this.isMeshNormalMaterial = !0, this.type = "MeshNormalMaterial", this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = nn, this.normalScale = new Vector2(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.flatShading = !1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.flatShading = e.flatShading, this;
  }
}
class MeshLambertMaterial extends Material {
  constructor(e) {
    super(), this.isMeshLambertMaterial = !0, this.type = "MeshLambertMaterial", this.color = new Color(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Color(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = nn, this.normalScale = new Vector2(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Euler(), this.combine = Z, this.reflectivity = 1, this.envMapIntensity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.envMapIntensity = e.envMapIntensity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
  }
}
class MeshDepthMaterial extends Material {
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = $t, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}
class MeshDistanceMaterial extends Material {
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
}
class MeshMatcapMaterial extends Material {
  constructor(e) {
    super(), this.isMeshMatcapMaterial = !0, this.defines = {
      MATCAP: ""
    }, this.type = "MeshMatcapMaterial", this.color = new Color(16777215), this.matcap = null, this.map = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = nn, this.normalScale = new Vector2(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.alphaMap = null, this.wireframe = !1, this.wireframeLinewidth = 1, this.flatShading = !1, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.defines = {
      MATCAP: ""
    }, this.color.copy(e.color), this.matcap = e.matcap, this.map = e.map, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.alphaMap = e.alphaMap, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.flatShading = e.flatShading, this.fog = e.fog, this;
  }
}
class LineDashedMaterial extends LineBasicMaterial {
  constructor(e) {
    super(), this.isLineDashedMaterial = !0, this.type = "LineDashedMaterial", this.scale = 1, this.dashSize = 3, this.gapSize = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.scale = e.scale, this.dashSize = e.dashSize, this.gapSize = e.gapSize, this;
  }
}
function Xo(e, t) {
  return e && e.constructor !== t ? "number" == typeof t.BYTES_PER_ELEMENT ? new t(e) : Array.prototype.slice.call(e) : e;
}
function jo(e) {
  const t = e.length,
    array = new Array(t);
  for (let e = 0; e !== t; ++e) array[e] = e;
  return array.sort(function (t, n) {
    return e[t] - e[n];
  }), array;
}
function Vo(e, t, n) {
  const r = e.length,
    constructor = new e.constructor(r);
  for (let a = 0, s = 0; s !== r; ++a) {
    const r = n[a] * t;
    for (let n = 0; n !== t; ++n) constructor[s++] = e[r + n];
  }
  return constructor;
}
function Qo(e, t, n, r) {
  let i = 1,
    a = e[0];
  for (; void 0 !== a && void 0 === a[r];) a = e[i++];
  if (void 0 === a) return;
  let s = a[r];
  if (void 0 !== s) if (Array.isArray(s)) do {
    s = a[r], void 0 !== s && (t.push(a.time), n.push(...s)), a = e[i++];
  } while (void 0 !== a);else if (void 0 !== s.toArray) do {
    s = a[r], void 0 !== s && (t.push(a.time), s.toArray(n, n.length)), a = e[i++];
  } while (void 0 !== a);else do {
    s = a[r], void 0 !== s && (t.push(a.time), n.push(s)), a = e[i++];
  } while (void 0 !== a);
}
class AnimationUtils {
  static convertArray(e, t) {
    return Xo(e, t);
  }
  static isTypedArray(e) {
    return isTypedArray(e);
  }
  static getKeyframeOrder(e) {
    return jo(e);
  }
  static sortedArray(e, t, n) {
    return Vo(e, t, n);
  }
  static flattenJSON(e, t, n, r) {
    Qo(e, t, n, r);
  }
  static subclip(e, t, n, r, i = 30) {
    return function (e, t, n, r, i = 30) {
      const a = e.clone();
      a.name = t;
      const s = [];
      for (let e = 0; e < a.tracks.length; ++e) {
        const t = a.tracks[e],
          o = t.getValueSize(),
          c = [],
          l = [];
        for (let e = 0; e < t.times.length; ++e) {
          const a = t.times[e] * i;
          if (!(a < n || a >= r)) {
            c.push(t.times[e]);
            for (let n = 0; n < o; ++n) l.push(t.values[e * o + n]);
          }
        }
        0 !== c.length && (t.times = Xo(c, t.times.constructor), t.values = Xo(l, t.values.constructor), s.push(t));
      }
      a.tracks = s;
      let o = 1 / 0;
      for (let e = 0; e < a.tracks.length; ++e) o > a.tracks[e].times[0] && (o = a.tracks[e].times[0]);
      for (let e = 0; e < a.tracks.length; ++e) a.tracks[e].shift(-1 * o);
      return a.resetDuration(), a;
    }(e, t, n, r, i);
  }
  static makeClipAdditive(e, t = 0, n = e, r = 30) {
    return function (e, t = 0, n = e, r = 30) {
      r <= 0 && (r = 30);
      const i = n.tracks.length,
        a = t / r;
      for (let t = 0; t < i; ++t) {
        const r = n.tracks[t],
          i = r.ValueTypeName;
        if ("bool" === i || "string" === i) continue;
        const s = e.tracks.find(function (e) {
          return e.name === r.name && e.ValueTypeName === i;
        });
        if (void 0 === s) continue;
        let o = 0;
        const c = r.getValueSize();
        r.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline && (o = c / 3);
        let l = 0;
        const u = s.getValueSize();
        s.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline && (l = u / 3);
        const d = r.times.length - 1;
        let h;
        if (a <= r.times[0]) {
          const e = o,
            t = c - o;
          h = r.values.slice(e, t);
        } else if (a >= r.times[d]) {
          const e = d * c + o,
            t = e + c - o;
          h = r.values.slice(e, t);
        } else {
          const e = r.createInterpolant(),
            t = o,
            n = c - o;
          e.evaluate(a), h = e.resultBuffer.slice(t, n);
        }
        "quaternion" === i && new Quaternion().fromArray(h).normalize().conjugate().toArray(h);
        const p = s.times.length;
        for (let e = 0; e < p; ++e) {
          const t = e * u + l;
          if ("quaternion" === i) Quaternion.multiplyQuaternionsFlat(s.values, t, h, 0, s.values, t);else {
            const e = u - 2 * l;
            for (let n = 0; n < e; ++n) s.values[t + n] -= h[n];
          }
        }
      }
      return e.blendMode = AdditiveAnimationBlendMode, e;
    }(e, t, n, r);
  }
}
class Interpolant {
  constructor(parameterPositions, sampleValues, valueSize, r) {
    this.parameterPositions = parameterPositions, this._cachedIndex = 0, this.resultBuffer = void 0 !== r ? r : new sampleValues.constructor(valueSize), this.sampleValues = sampleValues, this.valueSize = valueSize, this.settings = null, this.DefaultSettings_ = {};
  }
  evaluate(e) {
    const parameterPositions = this.parameterPositions;
    let cachedIndex = this._cachedIndex,
      r = parameterPositions[cachedIndex],
      i = parameterPositions[cachedIndex - 1];
    e: {
      t: {
        let a;
        n: {
          r: if (!(e < r)) {
            for (let a = cachedIndex + 2;;) {
              if (void 0 === r) {
                if (e < i) break r;
                return cachedIndex = parameterPositions.length, this._cachedIndex = cachedIndex, this.copySampleValue_(cachedIndex - 1);
              }
              if (cachedIndex === a) break;
              if (i = r, r = parameterPositions[++cachedIndex], e < r) break t;
            }
            a = parameterPositions.length;
            break n;
          }
          if (!(e >= i)) {
            const s = parameterPositions[1];
            e < s && (cachedIndex = 2, i = s);
            for (let a = cachedIndex - 2;;) {
              if (void 0 === i) return this._cachedIndex = 0, this.copySampleValue_(0);
              if (cachedIndex === a) break;
              if (r = i, i = parameterPositions[--cachedIndex - 1], e >= i) break t;
            }
            a = cachedIndex, cachedIndex = 0;
            break n;
          }
          break e;
        }
        for (; cachedIndex < a;) {
          const r = cachedIndex + a >>> 1;
          e < parameterPositions[r] ? a = r : cachedIndex = r + 1;
        }
        if (r = parameterPositions[cachedIndex], i = parameterPositions[cachedIndex - 1], void 0 === i) return this._cachedIndex = 0, this.copySampleValue_(0);
        if (void 0 === r) return cachedIndex = parameterPositions.length, this._cachedIndex = cachedIndex, this.copySampleValue_(cachedIndex - 1);
      }
      this._cachedIndex = cachedIndex, this.intervalChanged_(cachedIndex, i, r);
    }
    return this.interpolate_(cachedIndex, i, e, r);
  }
  getSettings_() {
    return this.settings || this.DefaultSettings_;
  }
  copySampleValue_(e) {
    const resultBuffer = this.resultBuffer,
      sampleValues = this.sampleValues,
      valueSize = this.valueSize,
      i = e * valueSize;
    for (let e = 0; e !== valueSize; ++e) resultBuffer[e] = sampleValues[i + e];
    return resultBuffer;
  }
  interpolate_() {
    throw new Error("THREE.Interpolant: Call to abstract method.");
  }
  intervalChanged_() {}
}
class CubicInterpolant extends Interpolant {
  constructor(e, t, n, r) {
    super(e, t, n, r), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
      endingStart: ZeroCurvatureEnding,
      endingEnd: ZeroCurvatureEnding
    };
  }
  intervalChanged_(e, t, n) {
    const parameterPositions = this.parameterPositions;
    let i = e - 2,
      a = e + 1,
      s = parameterPositions[i],
      o = parameterPositions[a];
    if (void 0 === s) switch (this.getSettings_().endingStart) {
      case ZeroSlopeEnding:
        i = e, s = 2 * t - n;
        break;
      case WrapAroundEnding:
        i = parameterPositions.length - 2, s = t + parameterPositions[i] - parameterPositions[i + 1];
        break;
      default:
        i = e, s = n;
    }
    if (void 0 === o) switch (this.getSettings_().endingEnd) {
      case ZeroSlopeEnding:
        a = e, o = 2 * n - t;
        break;
      case WrapAroundEnding:
        a = 1, o = n + parameterPositions[1] - parameterPositions[0];
        break;
      default:
        a = e - 1, o = t;
    }
    const c = .5 * (n - t),
      valueSize = this.valueSize;
    this._weightPrev = c / (t - s), this._weightNext = c / (o - n), this._offsetPrev = i * valueSize, this._offsetNext = a * valueSize;
  }
  interpolate_(e, t, n, r) {
    const resultBuffer = this.resultBuffer,
      sampleValues = this.sampleValues,
      valueSize = this.valueSize,
      o = e * valueSize,
      c = o - valueSize,
      offsetPrev = this._offsetPrev,
      offsetNext = this._offsetNext,
      weightPrev = this._weightPrev,
      weightNext = this._weightNext,
      p = (n - t) / (r - t),
      f = p * p,
      m = f * p,
      M = -weightPrev * m + 2 * weightPrev * f - weightPrev * p,
      _ = (1 + weightPrev) * m + (-1.5 - 2 * weightPrev) * f + (-.5 + weightPrev) * p + 1,
      A = (-1 - weightNext) * m + (1.5 + weightNext) * f + .5 * p,
      g = weightNext * m - weightNext * f;
    for (let e = 0; e !== valueSize; ++e) resultBuffer[e] = M * sampleValues[offsetPrev + e] + _ * sampleValues[c + e] + A * sampleValues[o + e] + g * sampleValues[offsetNext + e];
    return resultBuffer;
  }
}
class LinearInterpolant extends Interpolant {
  constructor(e, t, n, r) {
    super(e, t, n, r);
  }
  interpolate_(e, t, n, r) {
    const resultBuffer = this.resultBuffer,
      sampleValues = this.sampleValues,
      valueSize = this.valueSize,
      o = e * valueSize,
      c = o - valueSize,
      l = (n - t) / (r - t),
      u = 1 - l;
    for (let e = 0; e !== valueSize; ++e) resultBuffer[e] = sampleValues[c + e] * u + sampleValues[o + e] * l;
    return resultBuffer;
  }
}
class DiscreteInterpolant extends Interpolant {
  constructor(e, t, n, r) {
    super(e, t, n, r);
  }
  interpolate_(e) {
    return this.copySampleValue_(e - 1);
  }
}
class BezierInterpolant extends Interpolant {
  interpolate_(e, t, n, r) {
    const resultBuffer = this.resultBuffer,
      sampleValues = this.sampleValues,
      valueSize = this.valueSize,
      o = e * valueSize,
      c = o - valueSize,
      inTangents = this.inTangents,
      outTangents = this.outTangents;
    if (!inTangents || !outTangents) {
      const e = (n - t) / (r - t),
        l = 1 - e;
      for (let t = 0; t !== valueSize; ++t) resultBuffer[t] = sampleValues[c + t] * l + sampleValues[o + t] * e;
      return resultBuffer;
    }
    const d = 2 * valueSize,
      h = e - 1;
    for (let p = 0; p !== valueSize; ++p) {
      const s = sampleValues[c + p],
        f = sampleValues[o + p],
        m = h * d + 2 * p,
        M = outTangents[m],
        _ = outTangents[m + 1],
        A = e * d + 2 * p,
        g = inTangents[A],
        b = inTangents[A + 1];
      let y,
        L,
        v,
        T,
        S,
        w = (n - t) / (r - t);
      for (let e = 0; e < 8; e++) {
        y = w * w, L = y * w, v = 1 - w, T = v * v, S = T * v;
        const e = S * t + 3 * T * w * M + 3 * v * y * g + L * r - n;
        if (Math.abs(e) < 1e-10) break;
        const i = 3 * T * (M - t) + 6 * v * w * (g - M) + 3 * y * (r - g);
        if (Math.abs(i) < 1e-10) break;
        w -= e / i, w = Math.max(0, Math.min(1, w));
      }
      resultBuffer[p] = S * s + 3 * T * w * _ + 3 * v * y * b + L * f;
    }
    return resultBuffer;
  }
}
class KeyframeTrack {
  constructor(name, t, n, r) {
    if (void 0 === name) throw new Error("THREE.KeyframeTrack: track name is undefined");
    if (void 0 === t || 0 === t.length) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + name);
    this.name = name, this.times = Xo(t, this.TimeBufferType), this.values = Xo(n, this.ValueBufferType), this.setInterpolation(r || this.DefaultInterpolation);
  }
  static toJSON(e) {
    const t = e.constructor;
    let n;
    if (t.toJSON !== this.toJSON) n = t.toJSON(e);else {
      n = {
        name: e.name,
        times: Xo(e.times, Array),
        values: Xo(e.values, Array)
      };
      const t = e.getInterpolation();
      t !== e.DefaultInterpolation && (n.interpolation = t);
    }
    return n.type = e.ValueTypeName, n;
  }
  InterpolantFactoryMethodDiscrete(e) {
    return new DiscreteInterpolant(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodLinear(e) {
    return new LinearInterpolant(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodSmooth(e) {
    return new CubicInterpolant(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodBezier(e) {
    const bezierInterpolant = new BezierInterpolant(this.times, this.values, this.getValueSize(), e);
    return this.settings && (bezierInterpolant.inTangents = this.settings.inTangents, bezierInterpolant.outTangents = this.settings.outTangents), bezierInterpolant;
  }
  setInterpolation(e) {
    let createInterpolant;
    switch (e) {
      case InterpolateDiscrete:
        createInterpolant = this.InterpolantFactoryMethodDiscrete;
        break;
      case InterpolateLinear:
        createInterpolant = this.InterpolantFactoryMethodLinear;
        break;
      case InterpolateSmooth:
        createInterpolant = this.InterpolantFactoryMethodSmooth;
        break;
      case InterpolateBezier:
        createInterpolant = this.InterpolantFactoryMethodBezier;
    }
    if (void 0 === createInterpolant) {
      const t = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
      if (void 0 === this.createInterpolant) {
        if (e === this.DefaultInterpolation) throw new Error(t);
        this.setInterpolation(this.DefaultInterpolation);
      }
      return warn("KeyframeTrack:", t), this;
    }
    return this.createInterpolant = createInterpolant, this;
  }
  getInterpolation() {
    switch (this.createInterpolant) {
      case this.InterpolantFactoryMethodDiscrete:
        return InterpolateDiscrete;
      case this.InterpolantFactoryMethodLinear:
        return InterpolateLinear;
      case this.InterpolantFactoryMethodSmooth:
        return InterpolateSmooth;
      case this.InterpolantFactoryMethodBezier:
        return InterpolateBezier;
    }
  }
  getValueSize() {
    return this.values.length / this.times.length;
  }
  shift(e) {
    if (0 !== e) {
      const times = this.times;
      for (let n = 0, r = times.length; n !== r; ++n) times[n] += e;
    }
    return this;
  }
  scale(e) {
    if (1 !== e) {
      const times = this.times;
      for (let n = 0, r = times.length; n !== r; ++n) times[n] *= e;
    }
    return this;
  }
  trim(e, t) {
    const times = this.times,
      r = times.length;
    let i = 0,
      a = r - 1;
    for (; i !== r && times[i] < e;) ++i;
    for (; -1 !== a && times[a] > t;) --a;
    if (++a, 0 !== i || a !== r) {
      i >= a && (a = Math.max(a, 1), i = a - 1);
      const e = this.getValueSize();
      this.times = times.slice(i, a), this.values = this.values.slice(i * e, a * e);
    }
    return this;
  }
  validate() {
    let e = !0;
    const t = this.getValueSize();
    t - Math.floor(t) !== 0 && (error("KeyframeTrack: Invalid value size in track.", this), e = !1);
    const times = this.times,
      values = this.values,
      i = times.length;
    0 === i && (error("KeyframeTrack: Track is empty.", this), e = !1);
    let a = null;
    for (let t = 0; t !== i; t++) {
      const r = times[t];
      if ("number" == typeof r && isNaN(r)) {
        error("KeyframeTrack: Time is not a valid number.", this, t, r), e = !1;
        break;
      }
      if (null !== a && a > r) {
        error("KeyframeTrack: Out of order keys.", this, t, r, a), e = !1;
        break;
      }
      a = r;
    }
    if (void 0 !== values && isTypedArray(values)) for (let t = 0, n = values.length; t !== n; ++t) {
      const n = values[t];
      if (isNaN(n)) {
        error("KeyframeTrack: Value is not a valid number.", this, t, n), e = !1;
        break;
      }
    }
    return e;
  }
  optimize() {
    const times = this.times.slice(),
      values = this.values.slice(),
      n = this.getValueSize(),
      r = this.getInterpolation() === InterpolateSmooth,
      i = times.length - 1;
    let a = 1;
    for (let s = 1; s < i; ++s) {
      let i = !1;
      const o = times[s];
      if (o !== times[s + 1] && (1 !== s || o !== times[0])) if (r) i = !0;else {
        const e = s * n,
          r = e - n,
          a = e + n;
        for (let s = 0; s !== n; ++s) {
          const n = values[e + s];
          if (n !== values[r + s] || n !== values[a + s]) {
            i = !0;
            break;
          }
        }
      }
      if (i) {
        if (s !== a) {
          times[a] = times[s];
          const r = s * n,
            i = a * n;
          for (let e = 0; e !== n; ++e) values[i + e] = values[r + e];
        }
        ++a;
      }
    }
    if (i > 0) {
      times[a] = times[i];
      for (let e = i * n, r = a * n, s = 0; s !== n; ++s) values[r + s] = values[e + s];
      ++a;
    }
    return a !== times.length ? (this.times = times.slice(0, a), this.values = values.slice(0, a * n)) : (this.times = times, this.values = values), this;
  }
  clone() {
    const e = this.times.slice(),
      t = this.values.slice(),
      n = new (0, this.constructor)(this.name, e, t);
    return n.createInterpolant = this.createInterpolant, n;
  }
}
KeyframeTrack.prototype.ValueTypeName = "", KeyframeTrack.prototype.TimeBufferType = Float32Array, KeyframeTrack.prototype.ValueBufferType = Float32Array, KeyframeTrack.prototype.DefaultInterpolation = InterpolateLinear;
class BooleanKeyframeTrack extends KeyframeTrack {
  constructor(e, t, n) {
    super(e, t, n);
  }
}
BooleanKeyframeTrack.prototype.ValueTypeName = "bool", BooleanKeyframeTrack.prototype.ValueBufferType = Array, BooleanKeyframeTrack.prototype.DefaultInterpolation = InterpolateDiscrete, BooleanKeyframeTrack.prototype.InterpolantFactoryMethodLinear = void 0, BooleanKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
class ColorKeyframeTrack extends KeyframeTrack {
  constructor(e, t, n, r) {
    super(e, t, n, r);
  }
}
ColorKeyframeTrack.prototype.ValueTypeName = "color";
class NumberKeyframeTrack extends KeyframeTrack {
  constructor(e, t, n, r) {
    super(e, t, n, r);
  }
}
NumberKeyframeTrack.prototype.ValueTypeName = "number";
class QuaternionLinearInterpolant extends Interpolant {
  constructor(e, t, n, r) {
    super(e, t, n, r);
  }
  interpolate_(e, t, n, r) {
    const resultBuffer = this.resultBuffer,
      sampleValues = this.sampleValues,
      valueSize = this.valueSize,
      o = (n - t) / (r - t);
    let c = e * valueSize;
    for (let e = c + valueSize; c !== e; c += 4) Quaternion.slerpFlat(resultBuffer, 0, sampleValues, c - valueSize, sampleValues, c, o);
    return resultBuffer;
  }
}
class QuaternionKeyframeTrack extends KeyframeTrack {
  constructor(e, t, n, r) {
    super(e, t, n, r);
  }
  InterpolantFactoryMethodLinear(e) {
    return new QuaternionLinearInterpolant(this.times, this.values, this.getValueSize(), e);
  }
}
QuaternionKeyframeTrack.prototype.ValueTypeName = "quaternion", QuaternionKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
class StringKeyframeTrack extends KeyframeTrack {
  constructor(e, t, n) {
    super(e, t, n);
  }
}
StringKeyframeTrack.prototype.ValueTypeName = "string", StringKeyframeTrack.prototype.ValueBufferType = Array, StringKeyframeTrack.prototype.DefaultInterpolation = InterpolateDiscrete, StringKeyframeTrack.prototype.InterpolantFactoryMethodLinear = void 0, StringKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
class VectorKeyframeTrack extends KeyframeTrack {
  constructor(e, t, n, r) {
    super(e, t, n, r);
  }
}
VectorKeyframeTrack.prototype.ValueTypeName = "vector";
class AnimationClip {
  constructor(name = "", duration = -1, tracks = [], blendMode = NormalAnimationBlendMode) {
    this.name = name, this.tracks = tracks, this.duration = duration, this.blendMode = blendMode, this.uuid = yr(), this.userData = {}, this.duration < 0 && this.resetDuration();
  }
  static parse(e) {
    const t = [],
      n = e.tracks,
      r = 1 / (e.fps || 1);
    for (let e = 0, i = n.length; e !== i; ++e) t.push(Ko(n[e]).scale(r));
    const i = new this(e.name, e.duration, t, e.blendMode);
    return i.uuid = e.uuid, i.userData = JSON.parse(e.userData || "{}"), i;
  }
  static toJSON(e) {
    const t = [],
      n = e.tracks,
      r = {
        name: e.name,
        duration: e.duration,
        tracks: t,
        uuid: e.uuid,
        blendMode: e.blendMode,
        userData: JSON.stringify(e.userData)
      };
    for (let e = 0, r = n.length; e !== r; ++e) t.push(KeyframeTrack.toJSON(n[e]));
    return r;
  }
  static CreateFromMorphTargetSequence(e, t, n, r) {
    const i = t.length,
      a = [];
    for (let e = 0; e < i; e++) {
      let s = [],
        o = [];
      s.push((e + i - 1) % i, e, (e + 1) % i), o.push(0, 1, 0);
      const c = jo(s);
      s = Vo(s, 1, c), o = Vo(o, 1, c), r || 0 !== s[0] || (s.push(i), o.push(o[0])), a.push(new NumberKeyframeTrack(".morphTargetInfluences[" + t[e].name + "]", s, o).scale(1 / n));
    }
    return new this(e, -1, a);
  }
  static findByName(e, t) {
    let n = e;
    if (!Array.isArray(e)) {
      const t = e;
      n = t.geometry && t.geometry.animations || t.animations;
    }
    for (let e = 0; e < n.length; e++) if (n[e].name === t) return n[e];
    return null;
  }
  static CreateClipsFromMorphTargetSequences(e, t, n) {
    const r = {},
      i = /^([\w-]*?)([\d]+)$/;
    for (let t = 0, n = e.length; t < n; t++) {
      const n = e[t],
        a = n.name.match(i);
      if (a && a.length > 1) {
        const e = a[1];
        let t = r[e];
        t || (r[e] = t = []), t.push(n);
      }
    }
    const a = [];
    for (const e in r) a.push(this.CreateFromMorphTargetSequence(e, r[e], t, n));
    return a;
  }
  resetDuration() {
    let duration = 0;
    for (let t = 0, n = this.tracks.length; t !== n; ++t) {
      const n = this.tracks[t];
      duration = Math.max(duration, n.times[n.times.length - 1]);
    }
    return this.duration = duration, this;
  }
  trim() {
    for (let e = 0; e < this.tracks.length; e++) this.tracks[e].trim(0, this.duration);
    return this;
  }
  validate() {
    let e = !0;
    for (let t = 0; t < this.tracks.length; t++) e = e && this.tracks[t].validate();
    return e;
  }
  optimize() {
    for (let e = 0; e < this.tracks.length; e++) this.tracks[e].optimize();
    return this;
  }
  clone() {
    const e = [];
    for (let t = 0; t < this.tracks.length; t++) e.push(this.tracks[t].clone());
    const constructor = new this.constructor(this.name, this.duration, e, this.blendMode);
    return constructor.userData = JSON.parse(JSON.stringify(this.userData)), constructor;
  }
  toJSON() {
    return this.constructor.toJSON(this);
  }
}
function Ko(e) {
  if (void 0 === e.type) throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");
  const t = function (e) {
    switch (e.toLowerCase()) {
      case "scalar":
      case "double":
      case "float":
      case "number":
      case "integer":
        return NumberKeyframeTrack;
      case "vector":
      case "vector2":
      case "vector3":
      case "vector4":
        return VectorKeyframeTrack;
      case "color":
        return ColorKeyframeTrack;
      case "quaternion":
        return QuaternionKeyframeTrack;
      case "bool":
      case "boolean":
        return BooleanKeyframeTrack;
      case "string":
        return StringKeyframeTrack;
    }
    throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + e);
  }(e.type);
  if (void 0 === e.times) {
    const t = [],
      n = [];
    Qo(e.keys, t, n, "value"), e.times = t, e.values = n;
  }
  return void 0 !== t.parse ? t.parse(e) : new t(e.name, e.times, e.values, e.interpolation);
}
const Cache = {
  enabled: !1,
  files: {},
  add: function (e, t) {
    !1 !== this.enabled && ($o(e) || (this.files[e] = t));
  },
  get: function (e) {
    if (!1 !== this.enabled && !$o(e)) return this.files[e];
  },
  remove: function (e) {
    delete this.files[e];
  },
  clear: function () {
    this.files = {};
  }
};
function $o(e) {
  try {
    const t = e.slice(e.indexOf(":") + 1);
    return "blob:" === new URL(t).protocol;
  } catch (e) {
    return !1;
  }
}
class LoadingManager {
  constructor(onLoad, onProgress, onError) {
    const r = this;
    let i,
      a = !1,
      s = 0,
      o = 0;
    const c = [];
    this.onStart = void 0, this.onLoad = onLoad, this.onProgress = onProgress, this.onError = onError, this._abortController = null, this.itemStart = function (e) {
      o++, !1 === a && void 0 !== r.onStart && r.onStart(e, s, o), a = !0;
    }, this.itemEnd = function (e) {
      s++, void 0 !== r.onProgress && r.onProgress(e, s, o), s === o && (a = !1, void 0 !== r.onLoad && r.onLoad());
    }, this.itemError = function (e) {
      void 0 !== r.onError && r.onError(e);
    }, this.resolveURL = function (e) {
      return e = e.normalize("NFC"), i ? i(e) : e;
    }, this.setURLModifier = function (e) {
      return i = e, this;
    }, this.addHandler = function (e, t) {
      return c.push(e, t), this;
    }, this.removeHandler = function (e) {
      const t = c.indexOf(e);
      return -1 !== t && c.splice(t, 2), this;
    }, this.getHandler = function (e) {
      for (let t = 0, n = c.length; t < n; t += 2) {
        const n = c[t],
          r = c[t + 1];
        if (n.global && (n.lastIndex = 0), n.test(e)) return r;
      }
      return null;
    }, this.abort = function () {
      return this.abortController.abort(), this._abortController = null, this;
    };
  }
  get abortController() {
    return this._abortController || (this._abortController = new AbortController()), this._abortController;
  }
}
const Zo = new LoadingManager();
class Loader {
  constructor(e) {
    this.manager = void 0 !== e ? e : Zo, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {}, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
      detail: this
    }));
  }
  load() {}
  loadAsync(e, t) {
    const n = this;
    return new Promise(function (r, i) {
      n.load(e, r, t, i);
    });
  }
  parse() {}
  setCrossOrigin(crossOrigin) {
    return this.crossOrigin = crossOrigin, this;
  }
  setWithCredentials(withCredentials) {
    return this.withCredentials = withCredentials, this;
  }
  setPath(path) {
    return this.path = path, this;
  }
  setResourcePath(resourcePath) {
    return this.resourcePath = resourcePath, this;
  }
  setRequestHeader(requestHeader) {
    return this.requestHeader = requestHeader, this;
  }
  abort() {
    return this;
  }
}
Loader.DEFAULT_MATERIAL_NAME = "__DEFAULT";
const ec = {};
class HttpError extends Error {
  constructor(e, response) {
    super(e), this.response = response;
  }
}
class FileLoader extends Loader {
  constructor(e) {
    super(e), this.mimeType = "", this.responseType = "", this._abortController = new AbortController();
  }
  load(e, t, n, r) {
    void 0 === e && (e = ""), void 0 !== this.path && (e = this.path + e), e = this.manager.resolveURL(e);
    const i = Cache.get(`file:${e}`);
    if (void 0 !== i) return this.manager.itemStart(e), void setTimeout(() => {
      t && t(i), this.manager.itemEnd(e);
    }, 0);
    if (void 0 !== ec[e]) return void ec[e].push({
      onLoad: t,
      onProgress: n,
      onError: r
    });
    ec[e] = [], ec[e].push({
      onLoad: t,
      onProgress: n,
      onError: r
    });
    const request = new Request(e, {
        headers: new Headers(this.requestHeader),
        credentials: this.withCredentials ? "include" : "same-origin",
        signal: "function" == typeof AbortSignal.any ? AbortSignal.any([this._abortController.signal, this.manager.abortController.signal]) : this._abortController.signal
      }),
      mimeType = this.mimeType,
      responseType = this.responseType;
    fetch(request).then(t => {
      if (200 === t.status || 0 === t.status) {
        if (0 === t.status && warn("FileLoader: HTTP Status 0 received."), "undefined" == typeof ReadableStream || void 0 === t.body || void 0 === t.body.getReader) return t;
        const n = ec[e],
          r = t.body.getReader(),
          i = t.headers.get("X-File-Size") || t.headers.get("Content-Length"),
          a = i ? parseInt(i) : 0,
          s = 0 !== a;
        let o = 0;
        const readableStream = new ReadableStream({
          start(e) {
            !function t() {
              r.read().then(({
                done: done,
                value: value
              }) => {
                if (done) e.close();else {
                  o += value.byteLength;
                  const progressEvent = new ProgressEvent("progress", {
                    lengthComputable: s,
                    loaded: o,
                    total: a
                  });
                  for (let e = 0, t = n.length; e < t; e++) {
                    const t = n[e];
                    t.onProgress && t.onProgress(progressEvent);
                  }
                  e.enqueue(value), t();
                }
              }, t => {
                e.error(t);
              });
            }();
          }
        });
        return new Response(readableStream);
      }
      throw new HttpError(`fetch for "${t.url}" responded with ${t.status}: ${t.statusText}`, t);
    }).then(e => {
      switch (responseType) {
        case "arraybuffer":
          return e.arrayBuffer();
        case "blob":
          return e.blob();
        case "document":
          return e.text().then(e => new DOMParser().parseFromString(e, mimeType));
        case "json":
          return e.json();
        default:
          if ("" === mimeType) return e.text();
          {
            const t = /charset="?([^;"\s]*)"?/i.exec(mimeType),
              n = t && t[1] ? t[1].toLowerCase() : void 0,
              textDecoder = new TextDecoder(n);
            return e.arrayBuffer().then(e => textDecoder.decode(e));
          }
      }
    }).then(t => {
      Cache.add(`file:${e}`, t);
      const n = ec[e];
      delete ec[e];
      for (let e = 0, r = n.length; e < r; e++) {
        const r = n[e];
        r.onLoad && r.onLoad(t);
      }
    }).catch(t => {
      const n = ec[e];
      if (void 0 === n) throw this.manager.itemError(e), t;
      delete ec[e];
      for (let e = 0, r = n.length; e < r; e++) {
        const r = n[e];
        r.onError && r.onError(t);
      }
      this.manager.itemError(e);
    }).finally(() => {
      this.manager.itemEnd(e);
    }), this.manager.itemStart(e);
  }
  setResponseType(responseType) {
    return this.responseType = responseType, this;
  }
  setMimeType(mimeType) {
    return this.mimeType = mimeType, this;
  }
  abort() {
    return this._abortController.abort(), this._abortController = new AbortController(), this;
  }
}
class AnimationLoader extends Loader {
  constructor(e) {
    super(e);
  }
  load(e, t, n, r) {
    const i = this,
      fileLoader = new FileLoader(this.manager);
    fileLoader.setPath(this.path), fileLoader.setRequestHeader(this.requestHeader), fileLoader.setWithCredentials(this.withCredentials), fileLoader.load(e, function (n) {
      try {
        t(i.parse(JSON.parse(n)));
      } catch (t) {
        r ? r(t) : error(t), i.manager.itemError(e);
      }
    }, n, r);
  }
  parse(e) {
    const t = [];
    for (let n = 0; n < e.length; n++) {
      const r = AnimationClip.parse(e[n]);
      t.push(r);
    }
    return t;
  }
}
class CompressedTextureLoader extends Loader {
  constructor(e) {
    super(e);
  }
  load(e, t, n, r) {
    const i = this,
      a = [],
      compressedTexture = new CompressedTexture(),
      fileLoader = new FileLoader(this.manager);
    fileLoader.setPath(this.path), fileLoader.setResponseType("arraybuffer"), fileLoader.setRequestHeader(this.requestHeader), fileLoader.setWithCredentials(i.withCredentials);
    let c = 0;
    function l(l) {
      fileLoader.load(e[l], function (e) {
        const n = i.parse(e, !0);
        a[l] = {
          width: n.width,
          height: n.height,
          format: n.format,
          mipmaps: n.mipmaps
        }, c += 1, 6 === c && (1 === n.mipmapCount && (compressedTexture.minFilter = LinearFilter), compressedTexture.image = a, compressedTexture.format = n.format, compressedTexture.needsUpdate = !0, t && t(compressedTexture));
      }, n, r);
    }
    if (Array.isArray(e)) for (let t = 0, n = e.length; t < n; ++t) l(t);else fileLoader.load(e, function (e) {
      const n = i.parse(e, !0);
      if (n.isCubemap) {
        const e = n.mipmaps.length / n.mipmapCount;
        for (let t = 0; t < e; t++) {
          a[t] = {
            mipmaps: []
          };
          for (let e = 0; e < n.mipmapCount; e++) a[t].mipmaps.push(n.mipmaps[t * n.mipmapCount + e]), a[t].format = n.format, a[t].width = n.width, a[t].height = n.height;
        }
        compressedTexture.image = a;
      } else compressedTexture.image.width = n.width, compressedTexture.image.height = n.height, compressedTexture.mipmaps = n.mipmaps;
      1 === n.mipmapCount && (compressedTexture.minFilter = LinearFilter), compressedTexture.format = n.format, compressedTexture.needsUpdate = !0, t && t(compressedTexture);
    }, n, r);
    return compressedTexture;
  }
}
const weakMap = new WeakMap();
class ImageLoader extends Loader {
  constructor(e) {
    super(e);
  }
  load(e, t, n, r) {
    void 0 !== this.path && (e = this.path + e), e = this.manager.resolveURL(e);
    const i = this,
      a = Cache.get(`image:${e}`);
    if (void 0 !== a) {
      if (!0 === a.complete) i.manager.itemStart(e), setTimeout(function () {
        t && t(a), i.manager.itemEnd(e);
      }, 0);else {
        let e = weakMap.get(a);
        void 0 === e && (e = [], weakMap.set(a, e)), e.push({
          onLoad: t,
          onError: r
        });
      }
      return a;
    }
    const s = createElementNS("img");
    function o() {
      l(), t && t(this);
      const n = weakMap.get(this) || [];
      for (let e = 0; e < n.length; e++) {
        const t = n[e];
        t.onLoad && t.onLoad(this);
      }
      weakMap.delete(this), i.manager.itemEnd(e);
    }
    function c(t) {
      l(), r && r(t), Cache.remove(`image:${e}`);
      const n = weakMap.get(this) || [];
      for (let e = 0; e < n.length; e++) {
        const r = n[e];
        r.onError && r.onError(t);
      }
      weakMap.delete(this), i.manager.itemError(e), i.manager.itemEnd(e);
    }
    function l() {
      s.removeEventListener("load", o, !1), s.removeEventListener("error", c, !1);
    }
    return s.addEventListener("load", o, !1), s.addEventListener("error", c, !1), "data:" !== e.slice(0, 5) && void 0 !== this.crossOrigin && (s.crossOrigin = this.crossOrigin), Cache.add(`image:${e}`, s), i.manager.itemStart(e), s.src = e, s;
  }
}
class CubeTextureLoader extends Loader {
  constructor(e) {
    super(e);
  }
  load(e, t, n, r) {
    const cubeTexture = new CubeTexture();
    cubeTexture.colorSpace = SRGBColorSpace;
    const imageLoader = new ImageLoader(this.manager);
    imageLoader.setCrossOrigin(this.crossOrigin), imageLoader.setPath(this.path);
    let s = 0;
    function o(n) {
      imageLoader.load(e[n], function (e) {
        cubeTexture.images[n] = e, s++, 6 === s && (cubeTexture.needsUpdate = !0, t && t(cubeTexture));
      }, void 0, r);
    }
    for (let t = 0; t < e.length; ++t) o(t);
    return cubeTexture;
  }
}
class DataTextureLoader extends Loader {
  constructor(e) {
    super(e);
  }
  load(e, t, n, r) {
    const i = this,
      dataTexture = new DataTexture(),
      fileLoader = new FileLoader(this.manager);
    return fileLoader.setResponseType("arraybuffer"), fileLoader.setRequestHeader(this.requestHeader), fileLoader.setPath(this.path), fileLoader.setWithCredentials(i.withCredentials), fileLoader.load(e, function (e) {
      let n;
      try {
        n = i.parse(e);
      } catch (e) {
        return void (void 0 !== r ? r(e) : error(e));
      }
      i._applyTexData(dataTexture, n), t && t(dataTexture, n);
    }, n, r), dataTexture;
  }
  createDataTexture(e) {
    const dataTexture = new DataTexture();
    return this._applyTexData(dataTexture, this.parse(e)), dataTexture;
  }
  _applyTexData(e, t) {
    void 0 !== t.image ? e.image = t.image : void 0 !== t.data && (e.image.width = t.width, e.image.height = t.height, e.image.data = t.data), e.wrapS = void 0 !== t.wrapS ? t.wrapS : ge, e.wrapT = void 0 !== t.wrapT ? t.wrapT : ge, e.magFilter = void 0 !== t.magFilter ? t.magFilter : LinearFilter, e.minFilter = void 0 !== t.minFilter ? t.minFilter : LinearFilter, e.anisotropy = void 0 !== t.anisotropy ? t.anisotropy : 1, void 0 !== t.colorSpace && (e.colorSpace = t.colorSpace), void 0 !== t.flipY && (e.flipY = t.flipY), void 0 !== t.format && (e.format = t.format), void 0 !== t.type && (e.type = t.type), void 0 !== t.mipmaps && (e.mipmaps = t.mipmaps, e.minFilter = LinearMipmapLinearFilter), 1 === t.mipmapCount && (e.minFilter = LinearFilter), void 0 !== t.generateMipmaps && (e.generateMipmaps = t.generateMipmaps), e.needsUpdate = !0;
  }
}
class TextureLoader extends Loader {
  constructor(e) {
    super(e);
  }
  load(e, t, n, r) {
    const texture = new Texture(),
      imageLoader = new ImageLoader(this.manager);
    return imageLoader.setCrossOrigin(this.crossOrigin), imageLoader.setPath(this.path), imageLoader.load(e, function (e) {
      texture.image = e, texture.needsUpdate = !0, void 0 !== t && t(texture);
    }, n, r), texture;
  }
}
class Light extends Object3D {
  constructor(e, intensity = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new Color(e), this.intensity = intensity;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
  copy(e, t) {
    return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, t;
  }
}
class HemisphereLight extends Light {
  constructor(e, t, n) {
    super(e, n), this.isHemisphereLight = !0, this.type = "HemisphereLight", this.position.copy(Object3D.DEFAULT_UP), this.updateMatrix(), this.groundColor = new Color(t);
  }
  copy(e, t) {
    return super.copy(e, t), this.groundColor.copy(e.groundColor), this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.groundColor = this.groundColor.getHex(), t;
  }
}
const nc = new Matrix4(),
  rc = new Vector3(),
  ic = new Vector3();
class LightShadow {
  constructor(camera) {
    this.camera = camera, this.intensity = 1, this.bias = 0, this.biasNode = null, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new Vector2(512, 512), this.mapType = Oe, this.map = null, this.mapPass = null, this.matrix = new Matrix4(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new Frustum(), this._frameExtents = new Vector2(1, 1), this._viewportCount = 1, this._viewports = [new Vector4(0, 0, 1, 1)];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(e) {
    const camera = this.camera,
      matrix = this.matrix;
    rc.setFromMatrixPosition(e.matrixWorld), camera.position.copy(rc), ic.setFromMatrixPosition(e.target.matrixWorld), camera.lookAt(ic), camera.updateMatrixWorld(), nc.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse), this._frustum.setFromProjectionMatrix(nc, camera.coordinateSystem, camera.reversedDepth), camera.coordinateSystem === WebGPUCoordinateSystem || camera.reversedDepth ? matrix.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, 1, 0, 0, 0, 0, 1) : matrix.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), matrix.multiply(nc);
  }
  getViewport(e) {
    return this._viewports[e];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  copy(e) {
    return this.camera = e.camera.clone(), this.intensity = e.intensity, this.bias = e.bias, this.radius = e.radius, this.autoUpdate = e.autoUpdate, this.needsUpdate = e.needsUpdate, this.normalBias = e.normalBias, this.blurSamples = e.blurSamples, this.mapSize.copy(e.mapSize), this.biasNode = e.biasNode, this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const e = {};
    return 1 !== this.intensity && (e.intensity = this.intensity), 0 !== this.bias && (e.bias = this.bias), 0 !== this.normalBias && (e.normalBias = this.normalBias), 1 !== this.radius && (e.radius = this.radius), 512 === this.mapSize.x && 512 === this.mapSize.y || (e.mapSize = this.mapSize.toArray()), e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e;
  }
}
const ac = new Vector3(),
  sc = new Quaternion(),
  oc = new Vector3();
class Camera extends Object3D {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new Matrix4(), this.projectionMatrix = new Matrix4(), this.projectionMatrixInverse = new Matrix4(), this.coordinateSystem = Vn, this._reversedDepth = !1;
  }
  get reversedDepth() {
    return this._reversedDepth;
  }
  copy(e, t) {
    return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
  }
  getWorldDirection(e) {
    return super.getWorldDirection(e).negate();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.matrixWorld.decompose(ac, sc, oc), 1 === oc.x && 1 === oc.y && 1 === oc.z ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(ac, sc, oc.set(1, 1, 1)).invert();
  }
  updateWorldMatrix(e, t, n = !1) {
    super.updateWorldMatrix(e, t, n), this.matrixWorld.decompose(ac, sc, oc), 1 === oc.x && 1 === oc.y && 1 === oc.z ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(ac, sc, oc.set(1, 1, 1)).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const cc = new Vector3(),
  lc = new Vector2(),
  uc = new Vector2();
class PerspectiveCamera extends Camera {
  constructor(fov = 50, aspect = 1, near = .1, far = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = fov, this.zoom = 1, this.near = near, this.far = far, this.focus = 10, this.aspect = aspect, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = null === e.view ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  setFocalLength(e) {
    const t = .5 * this.getFilmHeight() / e;
    this.fov = 2 * RAD2DEG * Math.atan(t), this.updateProjectionMatrix();
  }
  getFocalLength() {
    const e = Math.tan(.5 * gr * this.fov);
    return .5 * this.getFilmHeight() / e;
  }
  getEffectiveFOV() {
    return 2 * RAD2DEG * Math.atan(Math.tan(.5 * gr * this.fov) / this.zoom);
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  getViewBounds(e, t, n) {
    cc.set(-1, -1, .5).applyMatrix4(this.projectionMatrixInverse), t.set(cc.x, cc.y).multiplyScalar(-e / cc.z), cc.set(1, 1, .5).applyMatrix4(this.projectionMatrixInverse), n.set(cc.x, cc.y).multiplyScalar(-e / cc.z);
  }
  getViewSize(e, t) {
    return this.getViewBounds(e, lc, uc), t.subVectors(uc, lc);
  }
  setViewOffset(e, t, n, r, i, a) {
    this.aspect = e / t, null === this.view && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = i, this.view.height = a, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const near = this.near;
    let t = near * Math.tan(.5 * gr * this.fov) / this.zoom,
      n = 2 * t,
      r = this.aspect * n,
      i = -.5 * r;
    const view = this.view;
    if (null !== this.view && this.view.enabled) {
      const e = view.fullWidth,
        s = view.fullHeight;
      i += view.offsetX * r / e, t -= view.offsetY * n / s, r *= view.width / e, n *= view.height / s;
    }
    const filmOffset = this.filmOffset;
    0 !== filmOffset && (i += near * filmOffset / this.getFilmWidth()), this.projectionMatrix.makePerspective(i, i + r, t, t - n, near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, null !== this.view && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
  }
}
class SpotLightShadow extends LightShadow {
  constructor() {
    super(new PerspectiveCamera(50, 1, .5, 500)), this.isSpotLightShadow = !0, this.focus = 1, this.aspect = 1;
  }
  updateMatrices(e) {
    const camera = this.camera,
      n = 2 * RAD2DEG * e.angle * this.focus,
      r = this.mapSize.width / this.mapSize.height * this.aspect,
      i = e.distance || camera.far;
    n === camera.fov && r === camera.aspect && i === camera.far || (camera.fov = n, camera.aspect = r, camera.far = i, camera.updateProjectionMatrix()), super.updateMatrices(e);
  }
  copy(e) {
    return super.copy(e), this.focus = e.focus, this;
  }
}
class SpotLight extends Light {
  constructor(e, t, distance = 0, angle = Math.PI / 3, penumbra = 0, decay = 2) {
    super(e, t), this.isSpotLight = !0, this.type = "SpotLight", this.position.copy(Object3D.DEFAULT_UP), this.updateMatrix(), this.target = new Object3D(), this.distance = distance, this.angle = angle, this.penumbra = penumbra, this.decay = decay, this.map = null, this.shadow = new SpotLightShadow();
  }
  get power() {
    return this.intensity * Math.PI;
  }
  set power(e) {
    this.intensity = e / Math.PI;
  }
  dispose() {
    super.dispose(), this.shadow.dispose();
  }
  copy(e, t) {
    return super.copy(e, t), this.distance = e.distance, this.angle = e.angle, this.penumbra = e.penumbra, this.decay = e.decay, this.target = e.target.clone(), this.map = e.map, this.shadow = e.shadow.clone(), this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.distance = this.distance, t.object.angle = this.angle, t.object.decay = this.decay, t.object.penumbra = this.penumbra, t.object.target = this.target.uuid, this.map && this.map.isTexture && (t.object.map = this.map.toJSON(e).uuid), t.object.shadow = this.shadow.toJSON(), t;
  }
}
class PointLightShadow extends LightShadow {
  constructor() {
    super(new PerspectiveCamera(90, 1, .5, 500)), this.isPointLightShadow = !0;
  }
}
class PointLight extends Light {
  constructor(e, t, distance = 0, decay = 2) {
    super(e, t), this.isPointLight = !0, this.type = "PointLight", this.distance = distance, this.decay = decay, this.shadow = new PointLightShadow();
  }
  get power() {
    return 4 * this.intensity * Math.PI;
  }
  set power(e) {
    this.intensity = e / (4 * Math.PI);
  }
  dispose() {
    super.dispose(), this.shadow.dispose();
  }
  copy(e, t) {
    return super.copy(e, t), this.distance = e.distance, this.decay = e.decay, this.shadow = e.shadow.clone(), this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.distance = this.distance, t.object.decay = this.decay, t.object.shadow = this.shadow.toJSON(), t;
  }
}
class OrthographicCamera extends Camera {
  constructor(left = -1, right = 1, top = 1, bottom = -1, near = .1, far = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = left, this.right = right, this.top = top, this.bottom = bottom, this.near = near, this.far = far, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = null === e.view ? null : Object.assign({}, e.view), this;
  }
  setViewOffset(e, t, n, r, i, a) {
    null === this.view && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = i, this.view.height = a, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom),
      t = (this.top - this.bottom) / (2 * this.zoom),
      n = (this.right + this.left) / 2,
      r = (this.top + this.bottom) / 2;
    let i = n - e,
      a = n + e,
      s = r + t,
      o = r - t;
    if (null !== this.view && this.view.enabled) {
      const e = (this.right - this.left) / this.view.fullWidth / this.zoom,
        t = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      i += e * this.view.offsetX, a = i + e * this.view.width, s -= t * this.view.offsetY, o = s - t * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(i, a, s, o, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, null !== this.view && (t.object.view = Object.assign({}, this.view)), t;
  }
}
class DirectionalLightShadow extends LightShadow {
  constructor() {
    super(new OrthographicCamera(-5, 5, 5, -5, .5, 500)), this.isDirectionalLightShadow = !0;
  }
}
class DirectionalLight extends Light {
  constructor(e, t) {
    super(e, t), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(Object3D.DEFAULT_UP), this.updateMatrix(), this.target = new Object3D(), this.shadow = new DirectionalLightShadow();
  }
  dispose() {
    super.dispose(), this.shadow.dispose();
  }
  copy(e) {
    return super.copy(e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.shadow = this.shadow.toJSON(), t.object.target = this.target.uuid, t;
  }
}
class AmbientLight extends Light {
  constructor(e, t) {
    super(e, t), this.isAmbientLight = !0, this.type = "AmbientLight";
  }
}
class RectAreaLight extends Light {
  constructor(e, t, width = 10, height = 10) {
    super(e, t), this.isRectAreaLight = !0, this.type = "RectAreaLight", this.width = width, this.height = height;
  }
  get power() {
    return this.intensity * this.width * this.height * Math.PI;
  }
  set power(e) {
    this.intensity = e / (this.width * this.height * Math.PI);
  }
  copy(e) {
    return super.copy(e), this.width = e.width, this.height = e.height, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.width = this.width, t.object.height = this.height, t;
  }
}
class SphericalHarmonics3 {
  constructor() {
    this.isSphericalHarmonics3 = !0, this.coefficients = [];
    for (let e = 0; e < 9; e++) this.coefficients.push(new Vector3());
  }
  set(e) {
    for (let t = 0; t < 9; t++) this.coefficients[t].copy(e[t]);
    return this;
  }
  zero() {
    for (let e = 0; e < 9; e++) this.coefficients[e].set(0, 0, 0);
    return this;
  }
  getAt(e, t) {
    const n = e.x,
      r = e.y,
      i = e.z,
      coefficients = this.coefficients;
    return t.copy(coefficients[0]).multiplyScalar(.282095), t.addScaledVector(coefficients[1], .488603 * r), t.addScaledVector(coefficients[2], .488603 * i), t.addScaledVector(coefficients[3], .488603 * n), t.addScaledVector(coefficients[4], n * r * 1.092548), t.addScaledVector(coefficients[5], r * i * 1.092548), t.addScaledVector(coefficients[6], .315392 * (3 * i * i - 1)), t.addScaledVector(coefficients[7], n * i * 1.092548), t.addScaledVector(coefficients[8], .546274 * (n * n - r * r)), t;
  }
  getIrradianceAt(e, t) {
    const n = e.x,
      r = e.y,
      i = e.z,
      coefficients = this.coefficients;
    return t.copy(coefficients[0]).multiplyScalar(.886227), t.addScaledVector(coefficients[1], 1.023328 * r), t.addScaledVector(coefficients[2], 1.023328 * i), t.addScaledVector(coefficients[3], 1.023328 * n), t.addScaledVector(coefficients[4], .858086 * n * r), t.addScaledVector(coefficients[5], .858086 * r * i), t.addScaledVector(coefficients[6], .743125 * i * i - .247708), t.addScaledVector(coefficients[7], .858086 * n * i), t.addScaledVector(coefficients[8], .429043 * (n * n - r * r)), t;
  }
  add(e) {
    for (let t = 0; t < 9; t++) this.coefficients[t].add(e.coefficients[t]);
    return this;
  }
  addScaledSH(e, t) {
    for (let n = 0; n < 9; n++) this.coefficients[n].addScaledVector(e.coefficients[n], t);
    return this;
  }
  scale(e) {
    for (let t = 0; t < 9; t++) this.coefficients[t].multiplyScalar(e);
    return this;
  }
  lerp(e, t) {
    for (let n = 0; n < 9; n++) this.coefficients[n].lerp(e.coefficients[n], t);
    return this;
  }
  equals(e) {
    for (let t = 0; t < 9; t++) if (!this.coefficients[t].equals(e.coefficients[t])) return !1;
    return !0;
  }
  copy(e) {
    return this.set(e.coefficients);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  fromArray(e, t = 0) {
    const coefficients = this.coefficients;
    for (let r = 0; r < 9; r++) coefficients[r].fromArray(e, t + 3 * r);
    return this;
  }
  toArray(e = [], t = 0) {
    const coefficients = this.coefficients;
    for (let r = 0; r < 9; r++) coefficients[r].toArray(e, t + 3 * r);
    return e;
  }
  static getBasisAt(e, t) {
    const n = e.x,
      r = e.y,
      i = e.z;
    t[0] = .282095, t[1] = .488603 * r, t[2] = .488603 * i, t[3] = .488603 * n, t[4] = 1.092548 * n * r, t[5] = 1.092548 * r * i, t[6] = .315392 * (3 * i * i - 1), t[7] = 1.092548 * n * i, t[8] = .546274 * (n * n - r * r);
  }
}
class LightProbe extends Light {
  constructor(sh = new SphericalHarmonics3(), t = 1) {
    super(void 0, t), this.isLightProbe = !0, this.sh = sh;
  }
  copy(e) {
    return super.copy(e), this.sh.copy(e.sh), this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.sh = this.sh.toArray(), t;
  }
}
const dc = {};
class MaterialLoader extends Loader {
  constructor(e) {
    super(e), this.textures = {};
  }
  load(e, t, n, r) {
    const i = this,
      fileLoader = new FileLoader(i.manager);
    fileLoader.setPath(i.path), fileLoader.setRequestHeader(i.requestHeader), fileLoader.setWithCredentials(i.withCredentials), fileLoader.load(e, function (n) {
      try {
        t(i.parse(JSON.parse(n)));
      } catch (t) {
        r ? r(t) : error(t), i.manager.itemError(e);
      }
    }, n, r);
  }
  parse(e) {
    const t = this.createMaterialFromType(e.type);
    return t.fromJSON(e, this.textures), t;
  }
  setTextures(textures) {
    return this.textures = textures, this;
  }
  createMaterialFromType(e) {
    return MaterialLoader.createMaterialFromType(e);
  }
  static createMaterialFromType(e) {
    const t = {
      ShadowMaterial: ShadowMaterial,
      SpriteMaterial: SpriteMaterial,
      RawShaderMaterial: RawShaderMaterial,
      ShaderMaterial: ShaderMaterial,
      PointsMaterial: PointsMaterial,
      MeshPhysicalMaterial: MeshPhysicalMaterial,
      MeshStandardMaterial: MeshStandardMaterial,
      MeshPhongMaterial: MeshPhongMaterial,
      MeshToonMaterial: MeshToonMaterial,
      MeshNormalMaterial: MeshNormalMaterial,
      MeshLambertMaterial: MeshLambertMaterial,
      MeshDepthMaterial: MeshDepthMaterial,
      MeshDistanceMaterial: MeshDistanceMaterial,
      MeshBasicMaterial: MeshBasicMaterial,
      MeshMatcapMaterial: MeshMatcapMaterial,
      LineDashedMaterial: LineDashedMaterial,
      LineBasicMaterial: LineBasicMaterial,
      Material: Material,
      ...dc
    }[e];
    let n;
    return void 0 === t ? (warnOnce(`MaterialLoader: Unknown material type "${e}". Use .registerMaterial() before starting the deserialization process.`), n = new Material()) : n = new t(), n;
  }
  static registerMaterial(e, t) {
    dc[e] = t;
  }
}
class LoaderUtils {
  static extractUrlBase(e) {
    const t = e.lastIndexOf("/");
    return -1 === t ? "./" : e.slice(0, t + 1);
  }
  static resolveURL(e, t) {
    return "string" != typeof e || "" === e ? "" : (/^https?:\/\//i.test(t) && /^\//.test(e) && (t = t.replace(/(^https?:\/\/[^\/]+).*/i, "$1")), /^(https?:)?\/\//i.test(e) || /^data:.*,.*$/i.test(e) || /^blob:.*$/i.test(e) ? e : t + e);
  }
}
class InstancedBufferGeometry extends BufferGeometry {
  constructor() {
    super(), this.isInstancedBufferGeometry = !0, this.type = "InstancedBufferGeometry", this.instanceCount = 1 / 0;
  }
  copy(e) {
    return super.copy(e), this.instanceCount = e.instanceCount, this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.instanceCount = this.instanceCount, e.isInstancedBufferGeometry = !0, e;
  }
}
class BufferGeometryLoader extends Loader {
  constructor(e) {
    super(e);
  }
  load(e, t, n, r) {
    const i = this,
      fileLoader = new FileLoader(i.manager);
    fileLoader.setPath(i.path), fileLoader.setRequestHeader(i.requestHeader), fileLoader.setWithCredentials(i.withCredentials), fileLoader.load(e, function (n) {
      try {
        t(i.parse(JSON.parse(n)));
      } catch (t) {
        r ? r(t) : error(t), i.manager.itemError(e);
      }
    }, n, r);
  }
  parse(e) {
    const t = {},
      n = {};
    function r(e, r) {
      if (void 0 !== t[r]) return t[r];
      const i = e.interleavedBuffers[r],
        a = function (e, t) {
          if (void 0 !== n[t]) return n[t];
          const r = e.arrayBuffers,
            i = r[t],
            a = new Uint32Array(i).buffer;
          return n[t] = a, a;
        }(e, i.buffer),
        s = tr(i.type, a),
        interleavedBuffer = new InterleavedBuffer(s, i.stride);
      return interleavedBuffer.uuid = i.uuid, t[r] = interleavedBuffer, interleavedBuffer;
    }
    const i = e.isInstancedBufferGeometry ? new InstancedBufferGeometry() : new BufferGeometry(),
      a = e.data.index;
    if (void 0 !== a) {
      const e = tr(a.type, a.array);
      i.setIndex(new BufferAttribute(e, 1));
    }
    const s = e.data.attributes;
    for (const t in s) {
      const n = s[t];
      let a;
      if (n.isInterleavedBufferAttribute) {
        const t = r(e.data, n.data);
        a = new InterleavedBufferAttribute(t, n.itemSize, n.offset, n.normalized);
      } else {
        const e = tr(n.type, n.array);
        a = new (n.isInstancedBufferAttribute ? InstancedBufferAttribute : BufferAttribute)(e, n.itemSize, n.normalized);
      }
      void 0 !== n.name && (a.name = n.name), void 0 !== n.usage && a.setUsage(n.usage), i.setAttribute(t, a);
    }
    const o = e.data.morphAttributes;
    if (o) for (const t in o) {
      const n = o[t],
        a = [];
      for (let t = 0, i = n.length; t < i; t++) {
        const i = n[t];
        let s;
        if (i.isInterleavedBufferAttribute) {
          const t = r(e.data, i.data);
          s = new InterleavedBufferAttribute(t, i.itemSize, i.offset, i.normalized);
        } else {
          const e = tr(i.type, i.array);
          s = new BufferAttribute(e, i.itemSize, i.normalized);
        }
        void 0 !== i.name && (s.name = i.name), a.push(s);
      }
      i.morphAttributes[t] = a;
    }
    e.data.morphTargetsRelative && (i.morphTargetsRelative = !0);
    const c = e.data.groups || e.data.drawcalls || e.data.offsets;
    if (void 0 !== c) for (let e = 0, t = c.length; e !== t; ++e) {
      const t = c[e];
      i.addGroup(t.start, t.count, t.materialIndex);
    }
    const l = e.data.boundingSphere;
    return void 0 !== l && (i.boundingSphere = new Sphere().fromJSON(l)), e.name && (i.name = e.name), e.userData && (i.userData = e.userData), i;
  }
}
const hc = {};
class ObjectLoader extends Loader {
  constructor(e) {
    super(e);
  }
  load(e, t, n, r) {
    const i = this,
      a = "" === this.path ? LoaderUtils.extractUrlBase(e) : this.path;
    this.resourcePath = this.resourcePath || a;
    const fileLoader = new FileLoader(this.manager);
    fileLoader.setPath(this.path), fileLoader.setRequestHeader(this.requestHeader), fileLoader.setWithCredentials(this.withCredentials), fileLoader.load(e, function (n) {
      let a = null;
      try {
        a = JSON.parse(n);
      } catch (t) {
        return void 0 !== r && r(t), void error("ObjectLoader: Can't parse " + e + ".", t.message);
      }
      const s = a.metadata;
      if (void 0 === s || void 0 === s.type || "geometry" === s.type.toLowerCase()) return void 0 !== r && r(new Error("THREE.ObjectLoader: Can't load " + e)), void error("ObjectLoader: Can't load " + e);
      i.parse(a, t);
    }, n, r);
  }
  async loadAsync(e, t) {
    const n = "" === this.path ? LoaderUtils.extractUrlBase(e) : this.path;
    this.resourcePath = this.resourcePath || n;
    const fileLoader = new FileLoader(this.manager);
    fileLoader.setPath(this.path), fileLoader.setRequestHeader(this.requestHeader), fileLoader.setWithCredentials(this.withCredentials);
    const i = await fileLoader.loadAsync(e, t);
    let a;
    try {
      a = JSON.parse(i);
    } catch (t) {
      throw new Error("THREE.ObjectLoader: Can't parse " + e + ". " + t.message);
    }
    const s = a.metadata;
    if (void 0 === s || void 0 === s.type || "geometry" === s.type.toLowerCase()) throw new Error("THREE.ObjectLoader: Can't load " + e);
    return await this.parseAsync(a);
  }
  parse(e, t) {
    const n = this.parseAnimations(e.animations),
      r = this.parseShapes(e.shapes),
      i = this.parseGeometries(e.geometries, r),
      a = this.parseImages(e.images, function () {
        void 0 !== t && t(c);
      }),
      s = this.parseTextures(e.textures, a),
      o = this.parseMaterials(e.materials, s),
      c = this.parseObject(e.object, i, o, s, n),
      l = this.parseSkeletons(e.skeletons, c);
    if (this.bindSkeletons(c, l), this.bindLightTargets(c), void 0 !== t) {
      let e = !1;
      for (const t in a) if (a[t].data instanceof HTMLImageElement) {
        e = !0;
        break;
      }
      !1 === e && t(c);
    }
    return c;
  }
  async parseAsync(e) {
    const t = this.parseAnimations(e.animations),
      n = this.parseShapes(e.shapes),
      r = this.parseGeometries(e.geometries, n),
      i = await this.parseImagesAsync(e.images),
      a = this.parseTextures(e.textures, i),
      s = this.parseMaterials(e.materials, a),
      o = this.parseObject(e.object, r, s, a, t),
      c = this.parseSkeletons(e.skeletons, o);
    return this.bindSkeletons(o, c), this.bindLightTargets(o), o;
  }
  static registerGeometry(e, t) {
    hc[e] = t;
  }
  parseShapes(e) {
    const t = {};
    if (void 0 !== e) for (let n = 0, r = e.length; n < r; n++) {
      const r = new Shape().fromJSON(e[n]);
      t[r.uuid] = r;
    }
    return t;
  }
  parseSkeletons(e, t) {
    const n = {},
      r = {};
    if (t.traverse(function (e) {
      e.isBone && (r[e.uuid] = e);
    }), void 0 !== e) for (let t = 0, i = e.length; t < i; t++) {
      const i = new Skeleton().fromJSON(e[t], r);
      n[i.uuid] = i;
    }
    return n;
  }
  parseGeometries(e, t) {
    const n = {};
    if (void 0 !== e) {
      const bufferGeometryLoader = new BufferGeometryLoader();
      for (let i = 0, a = e.length; i < a; i++) {
        let a;
        const s = e[i];
        switch (s.type) {
          case "BufferGeometry":
          case "InstancedBufferGeometry":
            a = bufferGeometryLoader.parse(s);
            break;
          default:
            s.type in Wo ? a = Wo[s.type].fromJSON(s, t) : s.type in hc ? a = hc[s.type].fromJSON(s, t) : warn(`ObjectLoader: Unknown geometry type "${s.type}". Use .registerGeometry() before starting the deserialization process.`);
        }
        a.uuid = s.uuid, void 0 !== s.name && (a.name = s.name), void 0 !== s.userData && (a.userData = s.userData), n[s.uuid] = a;
      }
    }
    return n;
  }
  parseMaterials(e, t) {
    const n = {},
      r = {};
    if (void 0 !== e) {
      const materialLoader = new MaterialLoader();
      materialLoader.setTextures(t);
      for (let t = 0, a = e.length; t < a; t++) {
        const a = e[t];
        void 0 === n[a.uuid] && (n[a.uuid] = materialLoader.parse(a)), r[a.uuid] = n[a.uuid];
      }
    }
    return r;
  }
  parseAnimations(e) {
    const t = {};
    if (void 0 !== e) for (let n = 0; n < e.length; n++) {
      const r = e[n],
        i = AnimationClip.parse(r);
      t[i.uuid] = i;
    }
    return t;
  }
  parseImages(e, t) {
    const n = this,
      r = {};
    let i;
    function a(e) {
      if ("string" == typeof e) {
        const t = e;
        return function (e) {
          return e = n.manager.resolveURL(e), n.manager.itemStart(e), i.load(e, function () {
            n.manager.itemEnd(e);
          }, void 0, function () {
            n.manager.itemError(e), n.manager.itemEnd(e);
          });
        }(/^(\/\/)|([a-z]+:(\/\/)?)/i.test(t) ? t : n.resourcePath + t);
      }
      return e.data ? {
        data: tr(e.type, e.data),
        width: e.width,
        height: e.height
      } : null;
    }
    if (void 0 !== e && e.length > 0) {
      const loadingManager = new LoadingManager(t);
      i = new ImageLoader(loadingManager), i.setCrossOrigin(this.crossOrigin);
      for (let t = 0, n = e.length; t < n; t++) {
        const n = e[t],
          i = n.url;
        if (Array.isArray(i)) {
          const e = [];
          for (let t = 0, n = i.length; t < n; t++) {
            const n = a(i[t]);
            null !== n && (n instanceof HTMLImageElement ? e.push(n) : e.push(new DataTexture(n.data, n.width, n.height)));
          }
          r[n.uuid] = new Source(e);
        } else {
          const e = a(n.url);
          r[n.uuid] = new Source(e);
        }
      }
    }
    return r;
  }
  async parseImagesAsync(e) {
    const t = this,
      n = {};
    let r;
    async function i(e) {
      if ("string" == typeof e) {
        const n = e,
          i = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(n) ? n : t.resourcePath + n;
        return await r.loadAsync(i);
      }
      return e.data ? {
        data: tr(e.type, e.data),
        width: e.width,
        height: e.height
      } : null;
    }
    if (void 0 !== e && e.length > 0) {
      r = new ImageLoader(this.manager), r.setCrossOrigin(this.crossOrigin);
      for (let t = 0, r = e.length; t < r; t++) {
        const r = e[t],
          a = r.url;
        if (Array.isArray(a)) {
          const e = [];
          for (let t = 0, n = a.length; t < n; t++) {
            const n = a[t],
              r = await i(n);
            null !== r && (r instanceof HTMLImageElement ? e.push(r) : e.push(new DataTexture(r.data, r.width, r.height)));
          }
          n[r.uuid] = new Source(e);
        } else {
          const e = await i(r.url);
          n[r.uuid] = new Source(e);
        }
      }
    }
    return n;
  }
  parseTextures(e, t) {
    function n(e, t) {
      return "number" == typeof e ? e : (warn("ObjectLoader.parseTexture: Constant should be in numeric form.", e), t[e]);
    }
    const r = {};
    if (void 0 !== e) for (let i = 0, a = e.length; i < a; i++) {
      const a = e[i];
      void 0 === a.image && warn('ObjectLoader: No "image" specified for', a.uuid), void 0 === t[a.image] && warn("ObjectLoader: Undefined image", a.image);
      const s = t[a.image],
        o = s.data;
      let c;
      Array.isArray(o) ? (c = new CubeTexture(), 6 === o.length && (c.needsUpdate = !0)) : (c = o && o.data ? new DataTexture() : new Texture(), o && (c.needsUpdate = !0)), c.source = s, c.uuid = a.uuid, void 0 !== a.name && (c.name = a.name), void 0 !== a.mapping && (c.mapping = n(a.mapping, pc)), void 0 !== a.channel && (c.channel = a.channel), void 0 !== a.offset && c.offset.fromArray(a.offset), void 0 !== a.repeat && c.repeat.fromArray(a.repeat), void 0 !== a.center && c.center.fromArray(a.center), void 0 !== a.rotation && (c.rotation = a.rotation), void 0 !== a.wrap && (c.wrapS = n(a.wrap[0], fc), c.wrapT = n(a.wrap[1], fc)), void 0 !== a.format && (c.format = a.format), void 0 !== a.internalFormat && (c.internalFormat = a.internalFormat), void 0 !== a.type && (c.type = a.type), void 0 !== a.colorSpace && (c.colorSpace = a.colorSpace), void 0 !== a.minFilter && (c.minFilter = n(a.minFilter, mc)), void 0 !== a.magFilter && (c.magFilter = n(a.magFilter, mc)), void 0 !== a.anisotropy && (c.anisotropy = a.anisotropy), void 0 !== a.flipY && (c.flipY = a.flipY), void 0 !== a.generateMipmaps && (c.generateMipmaps = a.generateMipmaps), void 0 !== a.premultiplyAlpha && (c.premultiplyAlpha = a.premultiplyAlpha), void 0 !== a.unpackAlignment && (c.unpackAlignment = a.unpackAlignment), void 0 !== a.compareFunction && (c.compareFunction = a.compareFunction), void 0 !== a.normalized && (c.normalized = a.normalized), void 0 !== a.userData && (c.userData = a.userData), r[a.uuid] = c;
    }
    return r;
  }
  parseObject(e, t, n, r, i) {
    let a, s, o;
    function c(e) {
      return void 0 === t[e] && warn("ObjectLoader: Undefined geometry", e), t[e];
    }
    function l(e) {
      if (void 0 !== e) {
        if (Array.isArray(e)) {
          const t = [];
          for (let r = 0, i = e.length; r < i; r++) {
            const i = e[r];
            void 0 === n[i] && warn("ObjectLoader: Undefined material", i), t.push(n[i]);
          }
          return t;
        }
        return void 0 === n[e] && warn("ObjectLoader: Undefined material", e), n[e];
      }
    }
    function u(e) {
      return void 0 === r[e] && warn("ObjectLoader: Undefined texture", e), r[e];
    }
    switch (e.type) {
      case "Scene":
        a = new Scene(), void 0 !== e.background && (Number.isInteger(e.background) ? a.background = new Color(e.background) : a.background = u(e.background)), void 0 !== e.environment && (a.environment = u(e.environment)), void 0 !== e.fog && ("Fog" === e.fog.type ? a.fog = new Fog(e.fog.color, e.fog.near, e.fog.far) : "FogExp2" === e.fog.type && (a.fog = new FogExp2(e.fog.color, e.fog.density)), "" !== e.fog.name && (a.fog.name = e.fog.name)), void 0 !== e.backgroundBlurriness && (a.backgroundBlurriness = e.backgroundBlurriness), void 0 !== e.backgroundIntensity && (a.backgroundIntensity = e.backgroundIntensity), void 0 !== e.backgroundRotation && a.backgroundRotation.fromArray(e.backgroundRotation), void 0 !== e.environmentIntensity && (a.environmentIntensity = e.environmentIntensity), void 0 !== e.environmentRotation && a.environmentRotation.fromArray(e.environmentRotation);
        break;
      case "PerspectiveCamera":
        a = new PerspectiveCamera(e.fov, e.aspect, e.near, e.far), void 0 !== e.focus && (a.focus = e.focus), void 0 !== e.zoom && (a.zoom = e.zoom), void 0 !== e.filmGauge && (a.filmGauge = e.filmGauge), void 0 !== e.filmOffset && (a.filmOffset = e.filmOffset), void 0 !== e.view && (a.view = Object.assign({}, e.view));
        break;
      case "OrthographicCamera":
        a = new OrthographicCamera(e.left, e.right, e.top, e.bottom, e.near, e.far), void 0 !== e.zoom && (a.zoom = e.zoom), void 0 !== e.view && (a.view = Object.assign({}, e.view));
        break;
      case "AmbientLight":
        a = new AmbientLight(e.color, e.intensity);
        break;
      case "DirectionalLight":
        a = new DirectionalLight(e.color, e.intensity), a.target = e.target || "";
        break;
      case "PointLight":
        a = new PointLight(e.color, e.intensity, e.distance, e.decay);
        break;
      case "RectAreaLight":
        a = new RectAreaLight(e.color, e.intensity, e.width, e.height);
        break;
      case "SpotLight":
        a = new SpotLight(e.color, e.intensity, e.distance, e.angle, e.penumbra, e.decay), a.target = e.target || "";
        break;
      case "HemisphereLight":
        a = new HemisphereLight(e.color, e.groundColor, e.intensity);
        break;
      case "LightProbe":
        const t = new SphericalHarmonics3().fromArray(e.sh);
        a = new LightProbe(t, e.intensity);
        break;
      case "SkinnedMesh":
        s = c(e.geometry), o = l(e.material), a = new SkinnedMesh(s, o), void 0 !== e.bindMode && (a.bindMode = e.bindMode), void 0 !== e.bindMatrix && a.bindMatrix.fromArray(e.bindMatrix), void 0 !== e.skeleton && (a.skeleton = e.skeleton);
        break;
      case "Mesh":
        s = c(e.geometry), o = l(e.material), a = new Mesh(s, o);
        break;
      case "InstancedMesh":
        s = c(e.geometry), o = l(e.material);
        const n = e.count,
          r = e.instanceMatrix,
          i = e.instanceColor;
        a = new InstancedMesh(s, o, n), a.instanceMatrix = new InstancedBufferAttribute(new Float32Array(r.array), 16), void 0 !== i && (a.instanceColor = new InstancedBufferAttribute(new Float32Array(i.array), i.itemSize));
        break;
      case "BatchedMesh":
        s = c(e.geometry), o = l(e.material), a = new BatchedMesh(e.maxInstanceCount, e.maxVertexCount, e.maxIndexCount, o), a.geometry = s, a.perObjectFrustumCulled = e.perObjectFrustumCulled, a.sortObjects = e.sortObjects, a._drawRanges = e.drawRanges, a._reservedRanges = e.reservedRanges, a._geometryInfo = e.geometryInfo.map(e => {
          let t = null,
            n = null;
          return void 0 !== e.boundingBox && (t = new Box3().fromJSON(e.boundingBox)), void 0 !== e.boundingSphere && (n = new Sphere().fromJSON(e.boundingSphere)), {
            ...e,
            boundingBox: t,
            boundingSphere: n
          };
        }), a._instanceInfo = e.instanceInfo, a._availableInstanceIds = e._availableInstanceIds, a._availableGeometryIds = e._availableGeometryIds, a._nextIndexStart = e.nextIndexStart, a._nextVertexStart = e.nextVertexStart, a._geometryCount = e.geometryCount, a._maxInstanceCount = e.maxInstanceCount, a._maxVertexCount = e.maxVertexCount, a._maxIndexCount = e.maxIndexCount, a._geometryInitialized = e.geometryInitialized, a._matricesTexture = u(e.matricesTexture.uuid), a._indirectTexture = u(e.indirectTexture.uuid), void 0 !== e.colorsTexture && (a._colorsTexture = u(e.colorsTexture.uuid)), void 0 !== e.boundingSphere && (a.boundingSphere = new Sphere().fromJSON(e.boundingSphere)), void 0 !== e.boundingBox && (a.boundingBox = new Box3().fromJSON(e.boundingBox));
        break;
      case "LOD":
        a = new LOD();
        break;
      case "Line":
        a = new Line(c(e.geometry), l(e.material));
        break;
      case "LineLoop":
        a = new LineLoop(c(e.geometry), l(e.material));
        break;
      case "LineSegments":
        a = new LineSegments(c(e.geometry), l(e.material));
        break;
      case "PointCloud":
      case "Points":
        a = new Points(c(e.geometry), l(e.material));
        break;
      case "Sprite":
        a = new Sprite(l(e.material));
        break;
      case "Group":
        a = new Group();
        break;
      case "Bone":
        a = new Bone();
        break;
      default:
        a = new Object3D();
    }
    if (a.uuid = e.uuid, void 0 !== e.name && (a.name = e.name), void 0 !== e.matrix ? (a.matrix.fromArray(e.matrix), void 0 !== e.matrixAutoUpdate && (a.matrixAutoUpdate = e.matrixAutoUpdate), a.matrixAutoUpdate && a.matrix.decompose(a.position, a.quaternion, a.scale)) : (void 0 !== e.position && a.position.fromArray(e.position), void 0 !== e.rotation && a.rotation.fromArray(e.rotation), void 0 !== e.quaternion && a.quaternion.fromArray(e.quaternion), void 0 !== e.scale && a.scale.fromArray(e.scale)), void 0 !== e.up && a.up.fromArray(e.up), void 0 !== e.pivot && (a.pivot = new Vector3().fromArray(e.pivot)), void 0 !== e.morphTargetDictionary && (a.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), void 0 !== e.morphTargetInfluences && (a.morphTargetInfluences = e.morphTargetInfluences.slice()), void 0 !== e.castShadow && (a.castShadow = e.castShadow), void 0 !== e.receiveShadow && (a.receiveShadow = e.receiveShadow), e.shadow && (void 0 !== e.shadow.intensity && (a.shadow.intensity = e.shadow.intensity), void 0 !== e.shadow.bias && (a.shadow.bias = e.shadow.bias), void 0 !== e.shadow.normalBias && (a.shadow.normalBias = e.shadow.normalBias), void 0 !== e.shadow.radius && (a.shadow.radius = e.shadow.radius), void 0 !== e.shadow.mapSize && a.shadow.mapSize.fromArray(e.shadow.mapSize), void 0 !== e.shadow.camera && (a.shadow.camera = this.parseObject(e.shadow.camera))), void 0 !== e.visible && (a.visible = e.visible), void 0 !== e.frustumCulled && (a.frustumCulled = e.frustumCulled), void 0 !== e.renderOrder && (a.renderOrder = e.renderOrder), void 0 !== e.static && (a.static = e.static), void 0 !== e.userData && (a.userData = e.userData), void 0 !== e.layers && (a.layers.mask = e.layers), void 0 !== e.children) {
      const s = e.children;
      for (let e = 0; e < s.length; e++) a.add(this.parseObject(s[e], t, n, r, i));
    }
    if (void 0 !== e.animations) {
      const t = e.animations;
      for (let e = 0; e < t.length; e++) {
        const n = t[e];
        a.animations.push(i[n]);
      }
    }
    if ("LOD" === e.type) {
      void 0 !== e.autoUpdate && (a.autoUpdate = e.autoUpdate);
      const t = e.levels;
      for (let e = 0; e < t.length; e++) {
        const n = t[e],
          r = a.getObjectByProperty("uuid", n.object);
        void 0 !== r && a.addLevel(r, n.distance, n.hysteresis);
      }
    }
    return a;
  }
  bindSkeletons(e, t) {
    0 !== Object.keys(t).length && e.traverse(function (e) {
      if (!0 === e.isSkinnedMesh && void 0 !== e.skeleton) {
        const n = t[e.skeleton];
        void 0 === n ? warn("ObjectLoader: No skeleton found with UUID:", e.skeleton) : e.bind(n, e.bindMatrix);
      }
    });
  }
  bindLightTargets(e) {
    e.traverse(function (t) {
      if (t.isDirectionalLight || t.isSpotLight) {
        const n = t.target,
          r = e.getObjectByProperty("uuid", n);
        t.target = void 0 !== r ? r : new Object3D();
      }
    });
  }
}
const pc = {
    UVMapping: UVMapping,
    CubeReflectionMapping: CubeReflectionMapping,
    CubeRefractionMapping: CubeRefractionMapping,
    EquirectangularReflectionMapping: EquirectangularReflectionMapping,
    EquirectangularRefractionMapping: EquirectangularRefractionMapping,
    CubeUVReflectionMapping: CubeUVReflectionMapping
  },
  fc = {
    RepeatWrapping: RepeatWrapping,
    ClampToEdgeWrapping: ge,
    MirroredRepeatWrapping: MirroredRepeatWrapping
  },
  mc = {
    NearestFilter: ye,
    NearestMipmapNearestFilter: NearestMipmapNearestFilter,
    NearestMipmapLinearFilter: NearestMipmapLinearFilter,
    LinearFilter: LinearFilter,
    LinearMipmapNearestFilter: LinearMipmapNearestFilter,
    LinearMipmapLinearFilter: LinearMipmapLinearFilter
  },
  Mc = new WeakMap();
class ImageBitmapLoader extends Loader {
  constructor(e) {
    super(e), this.isImageBitmapLoader = !0, "undefined" == typeof createImageBitmap && warn("ImageBitmapLoader: createImageBitmap() not supported."), "undefined" == typeof fetch && warn("ImageBitmapLoader: fetch() not supported."), this.options = {
      premultiplyAlpha: "none"
    }, this._abortController = new AbortController();
  }
  setOptions(options) {
    return this.options = options, this;
  }
  load(e, t, n, r) {
    void 0 === e && (e = ""), void 0 !== this.path && (e = this.path + e), e = this.manager.resolveURL(e);
    const i = this,
      a = Cache.get(`image-bitmap:${e}`);
    if (void 0 !== a) return i.manager.itemStart(e), a.then ? void a.then(n => {
      !0 === Mc.has(a) ? (r && r(Mc.get(a)), i.manager.itemError(e), i.manager.itemEnd(e)) : (t && t(n), i.manager.itemEnd(e));
    }) : void setTimeout(function () {
      t && t(a), i.manager.itemEnd(e);
    }, 0);
    const s = {};
    s.credentials = "anonymous" === this.crossOrigin ? "same-origin" : "include", s.headers = this.requestHeader, s.signal = "function" == typeof AbortSignal.any ? AbortSignal.any([this._abortController.signal, this.manager.abortController.signal]) : this._abortController.signal;
    const o = fetch(e, s).then(function (e) {
      return e.blob();
    }).then(function (e) {
      return createImageBitmap(e, Object.assign(i.options, {
        colorSpaceConversion: "none"
      }));
    }).then(function (n) {
      Cache.add(`image-bitmap:${e}`, n), t && t(n), i.manager.itemEnd(e);
    }).catch(function (t) {
      r && r(t), Mc.set(o, t), Cache.remove(`image-bitmap:${e}`), i.manager.itemError(e), i.manager.itemEnd(e);
    });
    Cache.add(`image-bitmap:${e}`, o), i.manager.itemStart(e);
  }
  abort() {
    return this._abortController.abort(), this._abortController = new AbortController(), this;
  }
}
let _c;
class AudioContext {
  static getContext() {
    return void 0 === _c && (_c = new (window.AudioContext || window.webkitAudioContext)()), _c;
  }
  static setContext(e) {
    _c = e;
  }
}
class AudioLoader extends Loader {
  constructor(e) {
    super(e);
  }
  load(e, t, n, r) {
    const i = this,
      fileLoader = new FileLoader(this.manager);
    function s(t) {
      r ? r(t) : error(t), i.manager.itemError(e);
    }
    fileLoader.setResponseType("arraybuffer"), fileLoader.setPath(this.path), fileLoader.setRequestHeader(this.requestHeader), fileLoader.setWithCredentials(this.withCredentials), fileLoader.load(e, function (n) {
      try {
        const r = n.slice(0),
          a = AudioContext.getContext(),
          o = e + "#decode";
        i.manager.itemStart(o), a.decodeAudioData(r, function (e) {
          t(e), i.manager.itemEnd(o);
        }).catch(function (e) {
          s(e), i.manager.itemEnd(o);
        });
      } catch (e) {
        s(e);
      }
    }, n, r);
  }
}
const Ac = new Matrix4(),
  gc = new Matrix4(),
  bc = new Matrix4();
class StereoCamera {
  constructor() {
    this.type = "StereoCamera", this.aspect = 1, this.eyeSep = .064, this.cameraL = new PerspectiveCamera(), this.cameraL.layers.enable(1), this.cameraL.matrixAutoUpdate = !1, this.cameraR = new PerspectiveCamera(), this.cameraR.layers.enable(2), this.cameraR.matrixAutoUpdate = !1, this._cache = {
      focus: null,
      fov: null,
      aspect: null,
      near: null,
      far: null,
      zoom: null,
      eyeSep: null
    };
  }
  update(e) {
    const cache = this._cache;
    if (cache.focus !== e.focus || cache.fov !== e.fov || cache.aspect !== e.aspect * this.aspect || cache.near !== e.near || cache.far !== e.far || cache.zoom !== e.zoom || cache.eyeSep !== this.eyeSep) {
      cache.focus = e.focus, cache.fov = e.fov, cache.aspect = e.aspect * this.aspect, cache.near = e.near, cache.far = e.far, cache.zoom = e.zoom, cache.eyeSep = this.eyeSep, bc.copy(e.projectionMatrix);
      const n = cache.eyeSep / 2,
        r = n * cache.near / cache.focus,
        i = cache.near * Math.tan(gr * cache.fov * .5) / cache.zoom;
      let a, s;
      gc.elements[12] = -n, Ac.elements[12] = n, a = -i * cache.aspect + r, s = i * cache.aspect + r, bc.elements[0] = 2 * cache.near / (s - a), bc.elements[8] = (s + a) / (s - a), this.cameraL.projectionMatrix.copy(bc), a = -i * cache.aspect - r, s = i * cache.aspect - r, bc.elements[0] = 2 * cache.near / (s - a), bc.elements[8] = (s + a) / (s - a), this.cameraR.projectionMatrix.copy(bc);
    }
    this.cameraL.matrix.copy(e.matrixWorld).multiply(gc), this.cameraL.matrixWorldNeedsUpdate = !0, this.cameraR.matrix.copy(e.matrixWorld).multiply(Ac), this.cameraR.matrixWorldNeedsUpdate = !0;
  }
}
const yc = -90;
class CubeCamera extends Object3D {
  constructor(e, t, renderTarget) {
    super(), this.type = "CubeCamera", this.renderTarget = renderTarget, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const perspectiveCamera = new PerspectiveCamera(yc, 1, e, t);
    perspectiveCamera.layers = this.layers, this.add(perspectiveCamera);
    const i = new PerspectiveCamera(yc, 1, e, t);
    i.layers = this.layers, this.add(i);
    const a = new PerspectiveCamera(yc, 1, e, t);
    a.layers = this.layers, this.add(a);
    const s = new PerspectiveCamera(yc, 1, e, t);
    s.layers = this.layers, this.add(s);
    const o = new PerspectiveCamera(yc, 1, e, t);
    o.layers = this.layers, this.add(o);
    const c = new PerspectiveCamera(yc, 1, e, t);
    c.layers = this.layers, this.add(c);
  }
  updateCoordinateSystem() {
    const coordinateSystem = this.coordinateSystem,
      t = this.children.concat(),
      [n, r, i, a, s, o] = t;
    for (const e of t) this.remove(e);
    if (coordinateSystem === Vn) n.up.set(0, 1, 0), n.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), i.up.set(0, 0, -1), i.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), s.up.set(0, 1, 0), s.lookAt(0, 0, 1), o.up.set(0, 1, 0), o.lookAt(0, 0, -1);else {
      if (coordinateSystem !== WebGPUCoordinateSystem) throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + coordinateSystem);
      n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), i.up.set(0, 0, 1), i.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), s.up.set(0, -1, 0), s.lookAt(0, 0, 1), o.up.set(0, -1, 0), o.lookAt(0, 0, -1);
    }
    for (const e of t) this.add(e), e.updateMatrixWorld();
  }
  update(e, t) {
    null === this.parent && this.updateMatrixWorld();
    const {
      renderTarget: renderTarget,
      activeMipmapLevel: activeMipmapLevel
    } = this;
    this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
    const [i, a, s, o, c, l] = this.children,
      u = e.getRenderTarget(),
      d = e.getActiveCubeFace(),
      h = e.getActiveMipmapLevel(),
      p = e.xr.enabled;
    e.xr.enabled = !1;
    const f = renderTarget.texture.generateMipmaps;
    renderTarget.texture.generateMipmaps = !1;
    let m = !1;
    m = !0 === e.isWebGLRenderer ? e.state.buffers.depth.getReversed() : e.reversedDepthBuffer, e.setRenderTarget(renderTarget, 0, activeMipmapLevel), m && !1 === e.autoClear && e.clearDepth(), e.render(t, i), e.setRenderTarget(renderTarget, 1, activeMipmapLevel), m && !1 === e.autoClear && e.clearDepth(), e.render(t, a), e.setRenderTarget(renderTarget, 2, activeMipmapLevel), m && !1 === e.autoClear && e.clearDepth(), e.render(t, s), e.setRenderTarget(renderTarget, 3, activeMipmapLevel), m && !1 === e.autoClear && e.clearDepth(), e.render(t, o), e.setRenderTarget(renderTarget, 4, activeMipmapLevel), m && !1 === e.autoClear && e.clearDepth(), e.render(t, c), renderTarget.texture.generateMipmaps = f, e.setRenderTarget(renderTarget, 5, activeMipmapLevel), m && !1 === e.autoClear && e.clearDepth(), e.render(t, l), e.setRenderTarget(u, d, h), e.xr.enabled = p, renderTarget.texture.needsPMREMUpdate = !0;
  }
}
class ArrayCamera extends PerspectiveCamera {
  constructor(cameras = []) {
    super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = cameras;
  }
}
class Timer {
  constructor() {
    this._previousTime = 0, this._currentTime = 0, this._startTime = performance.now(), this._delta = 0, this._elapsed = 0, this._timescale = 1, this._document = null, this._pageVisibilityHandler = null;
  }
  connect(e) {
    this._document = e, void 0 !== e.hidden && (this._pageVisibilityHandler = Lc.bind(this), e.addEventListener("visibilitychange", this._pageVisibilityHandler, !1));
  }
  disconnect() {
    null !== this._pageVisibilityHandler && (this._document.removeEventListener("visibilitychange", this._pageVisibilityHandler), this._pageVisibilityHandler = null), this._document = null;
  }
  getDelta() {
    return this._delta / 1e3;
  }
  getElapsed() {
    return this._elapsed / 1e3;
  }
  getTimescale() {
    return this._timescale;
  }
  setTimescale(timescale) {
    return this._timescale = timescale, this;
  }
  reset() {
    return this._currentTime = performance.now() - this._startTime, this;
  }
  dispose() {
    this.disconnect();
  }
  update(e) {
    return null !== this._pageVisibilityHandler && !0 === this._document.hidden ? this._delta = 0 : (this._previousTime = this._currentTime, this._currentTime = (void 0 !== e ? e : performance.now()) - this._startTime, this._delta = (this._currentTime - this._previousTime) * this._timescale, this._elapsed += this._delta), this;
  }
}
function Lc() {
  !1 === this._document.hidden && this.reset();
}
const vc = new Vector3(),
  Tc = new Quaternion(),
  Sc = new Vector3(),
  wc = new Vector3(),
  Ec = new Vector3();
class AudioListener extends Object3D {
  constructor() {
    super(), this.type = "AudioListener", this.context = AudioContext.getContext(), this.gain = this.context.createGain(), this.gain.connect(this.context.destination), this.filter = null, this.timeDelta = 0, this._timer = new Timer();
  }
  getInput() {
    return this.gain;
  }
  removeFilter() {
    return null !== this.filter && (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination), this.gain.connect(this.context.destination), this.filter = null), this;
  }
  getFilter() {
    return this.filter;
  }
  setFilter(filter) {
    return null !== this.filter ? (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination)) : this.gain.disconnect(this.context.destination), this.filter = filter, this.gain.connect(this.filter), this.filter.connect(this.context.destination), this;
  }
  getMasterVolume() {
    return this.gain.gain.value;
  }
  setMasterVolume(e) {
    return this.gain.gain.setTargetAtTime(e, this.context.currentTime, .01), this;
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this._timer.update();
    const t = this.context.listener;
    if (this.timeDelta = this._timer.getDelta(), this.matrixWorld.decompose(vc, Tc, Sc), wc.set(0, 0, -1).applyQuaternion(Tc), Ec.set(0, 1, 0).applyQuaternion(Tc), t.positionX) {
      const e = this.context.currentTime + this.timeDelta;
      t.positionX.linearRampToValueAtTime(vc.x, e), t.positionY.linearRampToValueAtTime(vc.y, e), t.positionZ.linearRampToValueAtTime(vc.z, e), t.forwardX.linearRampToValueAtTime(wc.x, e), t.forwardY.linearRampToValueAtTime(wc.y, e), t.forwardZ.linearRampToValueAtTime(wc.z, e), t.upX.linearRampToValueAtTime(Ec.x, e), t.upY.linearRampToValueAtTime(Ec.y, e), t.upZ.linearRampToValueAtTime(Ec.z, e);
    } else t.setPosition(vc.x, vc.y, vc.z), t.setOrientation(wc.x, wc.y, wc.z, Ec.x, Ec.y, Ec.z);
  }
}
class Audio extends Object3D {
  constructor(listener) {
    super(), this.type = "Audio", this.listener = listener, this.context = listener.context, this.gain = this.context.createGain(), this.gain.connect(listener.getInput()), this.autoplay = !1, this.buffer = null, this.detune = 0, this.loop = !1, this.loopStart = 0, this.loopEnd = 0, this.offset = 0, this.duration = void 0, this.playbackRate = 1, this.isPlaying = !1, this.hasPlaybackControl = !0, this.source = null, this.sourceType = "empty", this._startedAt = 0, this._progress = 0, this._connected = !1, this.filters = [];
  }
  getOutput() {
    return this.gain;
  }
  setNodeSource(source) {
    return this.hasPlaybackControl = !1, this.sourceType = "audioNode", this.source = source, this.connect(), this;
  }
  setMediaElementSource(e) {
    return this.hasPlaybackControl = !1, this.sourceType = "mediaNode", this.source = this.context.createMediaElementSource(e), this.connect(), this;
  }
  setMediaStreamSource(e) {
    return this.hasPlaybackControl = !1, this.sourceType = "mediaStreamNode", this.source = this.context.createMediaStreamSource(e), this.connect(), this;
  }
  setBuffer(buffer) {
    return this.buffer = buffer, this.sourceType = "buffer", this.autoplay && this.play(), this;
  }
  play(e = 0) {
    if (!0 === this.isPlaying) return void warn("Audio: Audio is already playing.");
    if (!1 === this.hasPlaybackControl) return void warn("Audio: this Audio has no playback control.");
    this._startedAt = this.context.currentTime + e;
    const source = this.context.createBufferSource();
    return source.buffer = this.buffer, source.loop = this.loop, source.loopStart = this.loopStart, source.loopEnd = this.loopEnd, source.onended = this.onEnded.bind(this), source.start(this._startedAt, this._progress + this.offset, this.duration), this.isPlaying = !0, this.source = source, this.setDetune(this.detune), this.setPlaybackRate(this.playbackRate), this.connect();
  }
  pause() {
    if (!1 !== this.hasPlaybackControl) return !0 === this.isPlaying && (this._progress += Math.max(this.context.currentTime - this._startedAt, 0) * this.playbackRate, !0 === this.loop && (this._progress = this._progress % (this.duration || this.buffer.duration)), this.source.stop(), this.source.onended = null, this.isPlaying = !1), this;
    warn("Audio: this Audio has no playback control.");
  }
  stop(e = 0) {
    if (!1 !== this.hasPlaybackControl) return this._progress = 0, null !== this.source && (this.source.stop(this.context.currentTime + e), this.source.onended = null), this.isPlaying = !1, this;
    warn("Audio: this Audio has no playback control.");
  }
  connect() {
    if (this.filters.length > 0) {
      this.source.connect(this.filters[0]);
      for (let e = 1, t = this.filters.length; e < t; e++) this.filters[e - 1].connect(this.filters[e]);
      this.filters[this.filters.length - 1].connect(this.getOutput());
    } else this.source.connect(this.getOutput());
    return this._connected = !0, this;
  }
  disconnect() {
    if (!1 !== this._connected) {
      if (this.filters.length > 0) {
        this.source.disconnect(this.filters[0]);
        for (let e = 1, t = this.filters.length; e < t; e++) this.filters[e - 1].disconnect(this.filters[e]);
        this.filters[this.filters.length - 1].disconnect(this.getOutput());
      } else this.source.disconnect(this.getOutput());
      return this._connected = !1, this;
    }
  }
  getFilters() {
    return this.filters;
  }
  setFilters(e) {
    return e || (e = []), !0 === this._connected ? (this.disconnect(), this.filters = e.slice(), this.connect()) : this.filters = e.slice(), this;
  }
  setDetune(detune) {
    return this.detune = detune, !0 === this.isPlaying && void 0 !== this.source.detune && this.source.detune.setTargetAtTime(this.detune, this.context.currentTime, .01), this;
  }
  getDetune() {
    return this.detune;
  }
  getFilter() {
    return this.getFilters()[0];
  }
  setFilter(e) {
    return this.setFilters(e ? [e] : []);
  }
  setPlaybackRate(playbackRate) {
    if (!1 !== this.hasPlaybackControl) return this.playbackRate = playbackRate, !0 === this.isPlaying && this.source.playbackRate.setTargetAtTime(this.playbackRate, this.context.currentTime, .01), this;
    warn("Audio: this Audio has no playback control.");
  }
  getPlaybackRate() {
    return this.playbackRate;
  }
  onEnded() {
    this.isPlaying = !1, this._progress = 0;
  }
  getLoop() {
    return !1 === this.hasPlaybackControl ? (warn("Audio: this Audio has no playback control."), !1) : this.loop;
  }
  setLoop(loop) {
    if (!1 !== this.hasPlaybackControl) return this.loop = loop, !0 === this.isPlaying && (this.source.loop = this.loop), this;
    warn("Audio: this Audio has no playback control.");
  }
  setLoopStart(loopStart) {
    return this.loopStart = loopStart, this;
  }
  setLoopEnd(loopEnd) {
    return this.loopEnd = loopEnd, this;
  }
  getVolume() {
    return this.gain.gain.value;
  }
  setVolume(e) {
    return this.gain.gain.setTargetAtTime(e, this.context.currentTime, .01), this;
  }
  copy(e, t) {
    return super.copy(e, t), "buffer" !== e.sourceType ? (warn("Audio: Audio source type cannot be copied."), this) : (this.autoplay = e.autoplay, this.buffer = e.buffer, this.detune = e.detune, this.loop = e.loop, this.loopStart = e.loopStart, this.loopEnd = e.loopEnd, this.offset = e.offset, this.duration = e.duration, this.playbackRate = e.playbackRate, this.hasPlaybackControl = e.hasPlaybackControl, this.sourceType = e.sourceType, this.filters = e.filters.slice(), this);
  }
  clone(e) {
    return new this.constructor(this.listener).copy(this, e);
  }
}
const xc = new Vector3(),
  Cc = new Quaternion(),
  zc = new Vector3(),
  Oc = new Vector3();
class PositionalAudio extends Audio {
  constructor(e) {
    super(e), this.panner = this.context.createPanner(), this.panner.panningModel = "HRTF", this.panner.connect(this.gain);
  }
  connect() {
    return super.connect(), this.panner.connect(this.gain), this;
  }
  disconnect() {
    return super.disconnect(), this.panner.disconnect(this.gain), this;
  }
  getOutput() {
    return this.panner;
  }
  getRefDistance() {
    return this.panner.refDistance;
  }
  setRefDistance(e) {
    return this.panner.refDistance = e, this;
  }
  getRolloffFactor() {
    return this.panner.rolloffFactor;
  }
  setRolloffFactor(e) {
    return this.panner.rolloffFactor = e, this;
  }
  getDistanceModel() {
    return this.panner.distanceModel;
  }
  setDistanceModel(e) {
    return this.panner.distanceModel = e, this;
  }
  getMaxDistance() {
    return this.panner.maxDistance;
  }
  setMaxDistance(e) {
    return this.panner.maxDistance = e, this;
  }
  setDirectionalCone(e, t, n) {
    return this.panner.coneInnerAngle = e, this.panner.coneOuterAngle = t, this.panner.coneOuterGain = n, this;
  }
  updateMatrixWorld(e) {
    if (super.updateMatrixWorld(e), !0 === this.hasPlaybackControl && !1 === this.isPlaying) return;
    this.matrixWorld.decompose(xc, Cc, zc), Oc.set(0, 0, 1).applyQuaternion(Cc);
    const panner = this.panner;
    if (panner.positionX) {
      const e = this.context.currentTime + this.listener.timeDelta;
      panner.positionX.linearRampToValueAtTime(xc.x, e), panner.positionY.linearRampToValueAtTime(xc.y, e), panner.positionZ.linearRampToValueAtTime(xc.z, e), panner.orientationX.linearRampToValueAtTime(Oc.x, e), panner.orientationY.linearRampToValueAtTime(Oc.y, e), panner.orientationZ.linearRampToValueAtTime(Oc.z, e);
    } else panner.setPosition(xc.x, xc.y, xc.z), panner.setOrientation(Oc.x, Oc.y, Oc.z);
  }
}
class AudioAnalyser {
  constructor(e, t = 2048) {
    this.analyser = e.context.createAnalyser(), this.analyser.fftSize = t, this.data = new Uint8Array(this.analyser.frequencyBinCount), e.getOutput().connect(this.analyser);
  }
  getFrequencyData() {
    return this.analyser.getByteFrequencyData(this.data), this.data;
  }
  getAverageFrequency() {
    let e = 0;
    const t = this.getFrequencyData();
    for (let n = 0; n < t.length; n++) e += t[n];
    return e / t.length;
  }
}
class PropertyMixer {
  constructor(binding, t, valueSize) {
    let mixBufferRegion, mixBufferRegionAdditive, setIdentity;
    switch (this.binding = binding, this.valueSize = valueSize, t) {
      case "quaternion":
        mixBufferRegion = this._slerp, mixBufferRegionAdditive = this._slerpAdditive, setIdentity = this._setAdditiveIdentityQuaternion, this.buffer = new Float64Array(6 * valueSize), this._workIndex = 5;
        break;
      case "string":
      case "bool":
        mixBufferRegion = this._select, mixBufferRegionAdditive = this._select, setIdentity = this._setAdditiveIdentityOther, this.buffer = new Array(5 * valueSize);
        break;
      default:
        mixBufferRegion = this._lerp, mixBufferRegionAdditive = this._lerpAdditive, setIdentity = this._setAdditiveIdentityNumeric, this.buffer = new Float64Array(5 * valueSize);
    }
    this._mixBufferRegion = mixBufferRegion, this._mixBufferRegionAdditive = mixBufferRegionAdditive, this._setIdentity = setIdentity, this._origIndex = 3, this._addIndex = 4, this.cumulativeWeight = 0, this.cumulativeWeightAdditive = 0, this.useCount = 0, this.referenceCount = 0;
  }
  accumulate(e, t) {
    const buffer = this.buffer,
      valueSize = this.valueSize,
      i = e * valueSize + valueSize;
    let cumulativeWeight = this.cumulativeWeight;
    if (0 === cumulativeWeight) {
      for (let e = 0; e !== valueSize; ++e) buffer[i + e] = buffer[e];
      cumulativeWeight = t;
    } else {
      cumulativeWeight += t;
      const e = t / cumulativeWeight;
      this._mixBufferRegion(buffer, i, 0, e, valueSize);
    }
    this.cumulativeWeight = cumulativeWeight;
  }
  accumulateAdditive(cumulativeWeightAdditive) {
    const buffer = this.buffer,
      valueSize = this.valueSize,
      r = valueSize * this._addIndex;
    0 === this.cumulativeWeightAdditive && this._setIdentity(), this._mixBufferRegionAdditive(buffer, r, 0, cumulativeWeightAdditive, valueSize), this.cumulativeWeightAdditive += cumulativeWeightAdditive;
  }
  apply(e) {
    const valueSize = this.valueSize,
      buffer = this.buffer,
      r = e * valueSize + valueSize,
      cumulativeWeight = this.cumulativeWeight,
      cumulativeWeightAdditive = this.cumulativeWeightAdditive,
      binding = this.binding;
    if (this.cumulativeWeight = 0, this.cumulativeWeightAdditive = 0, cumulativeWeight < 1) {
      const e = valueSize * this._origIndex;
      this._mixBufferRegion(buffer, r, e, 1 - cumulativeWeight, valueSize);
    }
    cumulativeWeightAdditive > 0 && this._mixBufferRegionAdditive(buffer, r, this._addIndex * valueSize, 1, valueSize);
    for (let e = valueSize, i = valueSize + valueSize; e !== i; ++e) if (buffer[e] !== buffer[e + valueSize]) {
      binding.setValue(buffer, r);
      break;
    }
  }
  saveOriginalState() {
    const binding = this.binding,
      buffer = this.buffer,
      valueSize = this.valueSize,
      r = valueSize * this._origIndex;
    binding.getValue(buffer, r);
    for (let e = valueSize, i = r; e !== i; ++e) buffer[e] = buffer[r + e % valueSize];
    this._setIdentity(), this.cumulativeWeight = 0, this.cumulativeWeightAdditive = 0;
  }
  restoreOriginalState() {
    const e = 3 * this.valueSize;
    this.binding.setValue(this.buffer, e);
  }
  _setAdditiveIdentityNumeric() {
    const e = this._addIndex * this.valueSize,
      t = e + this.valueSize;
    for (let n = e; n < t; n++) this.buffer[n] = 0;
  }
  _setAdditiveIdentityQuaternion() {
    this._setAdditiveIdentityNumeric(), this.buffer[this._addIndex * this.valueSize + 3] = 1;
  }
  _setAdditiveIdentityOther() {
    const e = this._origIndex * this.valueSize,
      t = this._addIndex * this.valueSize;
    for (let n = 0; n < this.valueSize; n++) this.buffer[t + n] = this.buffer[e + n];
  }
  _select(e, t, n, r, i) {
    if (r >= .5) for (let r = 0; r !== i; ++r) e[t + r] = e[n + r];
  }
  _slerp(e, t, n, r) {
    Quaternion.slerpFlat(e, t, e, t, e, n, r);
  }
  _slerpAdditive(e, t, n, r, i) {
    const a = this._workIndex * i;
    Quaternion.multiplyQuaternionsFlat(e, a, e, t, e, n), Quaternion.slerpFlat(e, t, e, t, e, a, r);
  }
  _lerp(e, t, n, r, i) {
    const a = 1 - r;
    for (let s = 0; s !== i; ++s) {
      const i = t + s;
      e[i] = e[i] * a + e[n + s] * r;
    }
  }
  _lerpAdditive(e, t, n, r, i) {
    for (let a = 0; a !== i; ++a) {
      const i = t + a;
      e[i] = e[i] + e[n + a] * r;
    }
  }
}
const Bc = "\\[\\]\\.:\\/",
  regExp = new RegExp("[" + Bc + "]", "g"),
  Nc = "[^" + Bc + "]",
  Ic = "[^" + Bc.replace("\\.", "") + "]",
  Rc = new RegExp("^" + /((?:WC+[\/:])*)/.source.replace("WC", Nc) + /(WCOD+)?/.source.replace("WCOD", Ic) + /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", Nc) + /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", Nc) + "$"),
  kc = ["material", "materials", "bones", "map"];
class PropertyBinding {
  constructor(rootNode, path, n) {
    this.path = path, this.parsedPath = n || PropertyBinding.parseTrackName(path), this.node = PropertyBinding.findNode(rootNode, this.parsedPath.nodeName), this.rootNode = rootNode, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
  static create(e, t, n) {
    return e && e.isAnimationObjectGroup ? new PropertyBinding.Composite(e, t, n) : new PropertyBinding(e, t, n);
  }
  static sanitizeNodeName(e) {
    return e.replace(/\s/g, "_").replace(regExp, "");
  }
  static parseTrackName(e) {
    const t = Rc.exec(e);
    if (null === t) throw new Error("THREE.PropertyBinding: Cannot parse trackName: " + e);
    const n = {
        nodeName: t[2],
        objectName: t[3],
        objectIndex: t[4],
        propertyName: t[5],
        propertyIndex: t[6]
      },
      r = n.nodeName && n.nodeName.lastIndexOf(".");
    if (void 0 !== r && -1 !== r) {
      const e = n.nodeName.substring(r + 1);
      -1 !== kc.indexOf(e) && (n.nodeName = n.nodeName.substring(0, r), n.objectName = e);
    }
    if (null === n.propertyName || 0 === n.propertyName.length) throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: " + e);
    return n;
  }
  static findNode(e, t) {
    if (void 0 === t || "" === t || "." === t || -1 === t || t === e.name || t === e.uuid) return e;
    if (e.skeleton) {
      const n = e.skeleton.getBoneByName(t);
      if (void 0 !== n) return n;
    }
    if (e.children) {
      const n = function (e) {
          for (let r = 0; r < e.length; r++) {
            const i = e[r];
            if (i.name === t || i.uuid === t) return i;
            const a = n(i.children);
            if (a) return a;
          }
          return null;
        },
        r = n(e.children);
      if (r) return r;
    }
    return null;
  }
  _getValue_unavailable() {}
  _setValue_unavailable() {}
  _getValue_direct(e, t) {
    e[t] = this.targetObject[this.propertyName];
  }
  _getValue_array(e, t) {
    const resolvedProperty = this.resolvedProperty;
    for (let r = 0, i = resolvedProperty.length; r !== i; ++r) e[t++] = resolvedProperty[r];
  }
  _getValue_arrayElement(e, t) {
    e[t] = this.resolvedProperty[this.propertyIndex];
  }
  _getValue_toArray(e, t) {
    this.resolvedProperty.toArray(e, t);
  }
  _setValue_direct(e, t) {
    this.targetObject[this.propertyName] = e[t];
  }
  _setValue_direct_setNeedsUpdate(e, t) {
    this.targetObject[this.propertyName] = e[t], this.targetObject.needsUpdate = !0;
  }
  _setValue_direct_setMatrixWorldNeedsUpdate(e, t) {
    this.targetObject[this.propertyName] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_array(e, t) {
    const resolvedProperty = this.resolvedProperty;
    for (let r = 0, i = resolvedProperty.length; r !== i; ++r) resolvedProperty[r] = e[t++];
  }
  _setValue_array_setNeedsUpdate(e, t) {
    const resolvedProperty = this.resolvedProperty;
    for (let r = 0, i = resolvedProperty.length; r !== i; ++r) resolvedProperty[r] = e[t++];
    this.targetObject.needsUpdate = !0;
  }
  _setValue_array_setMatrixWorldNeedsUpdate(e, t) {
    const resolvedProperty = this.resolvedProperty;
    for (let r = 0, i = resolvedProperty.length; r !== i; ++r) resolvedProperty[r] = e[t++];
    this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_arrayElement(e, t) {
    this.resolvedProperty[this.propertyIndex] = e[t];
  }
  _setValue_arrayElement_setNeedsUpdate(e, t) {
    this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.needsUpdate = !0;
  }
  _setValue_arrayElement_setMatrixWorldNeedsUpdate(e, t) {
    this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_fromArray(e, t) {
    this.resolvedProperty.fromArray(e, t);
  }
  _setValue_fromArray_setNeedsUpdate(e, t) {
    this.resolvedProperty.fromArray(e, t), this.targetObject.needsUpdate = !0;
  }
  _setValue_fromArray_setMatrixWorldNeedsUpdate(e, t) {
    this.resolvedProperty.fromArray(e, t), this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _getValue_unbound(e, t) {
    this.bind(), this.getValue(e, t);
  }
  _setValue_unbound(e, t) {
    this.bind(), this.setValue(e, t);
  }
  bind() {
    let e = this.node;
    const parsedPath = this.parsedPath,
      n = parsedPath.objectName,
      propertyName = parsedPath.propertyName;
    let propertyIndex = parsedPath.propertyIndex;
    if (e || (e = PropertyBinding.findNode(this.rootNode, parsedPath.nodeName), this.node = e), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !e) return void warn("PropertyBinding: No target node found for track: " + this.path + ".");
    if (n) {
      let r = parsedPath.objectIndex;
      switch (n) {
        case "materials":
          if (!e.material) return void error("PropertyBinding: Can not bind to material as node does not have a material.", this);
          if (!e.material.materials) return void error("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
          e = e.material.materials;
          break;
        case "bones":
          if (!e.skeleton) return void error("PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
          e = e.skeleton.bones;
          for (let t = 0; t < e.length; t++) if (e[t].name === r) {
            r = t;
            break;
          }
          break;
        case "map":
          if ("map" in e) {
            e = e.map;
            break;
          }
          if (!e.material) return void error("PropertyBinding: Can not bind to material as node does not have a material.", this);
          if (!e.material.map) return void error("PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
          e = e.material.map;
          break;
        default:
          if (void 0 === e[n]) return void error("PropertyBinding: Can not bind to objectName of node undefined.", this);
          e = e[n];
      }
      if (void 0 !== r) {
        if (void 0 === e[r]) return void error("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, e);
        e = e[r];
      }
    }
    const resolvedProperty = e[propertyName];
    if (void 0 === resolvedProperty) {
      return void error("PropertyBinding: Trying to update property for track: " + parsedPath.nodeName + "." + propertyName + " but it wasn't found.", e);
    }
    let s = this.Versioning.None;
    this.targetObject = e, !0 === e.isMaterial ? s = this.Versioning.NeedsUpdate : !0 === e.isObject3D && (s = this.Versioning.MatrixWorldNeedsUpdate);
    let o = this.BindingType.Direct;
    if (void 0 !== propertyIndex) {
      if ("morphTargetInfluences" === propertyName) {
        if (!e.geometry) return void error("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
        if (!e.geometry.morphAttributes) return void error("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
        void 0 !== e.morphTargetDictionary[propertyIndex] && (propertyIndex = e.morphTargetDictionary[propertyIndex]);
      }
      o = this.BindingType.ArrayElement, this.resolvedProperty = resolvedProperty, this.propertyIndex = propertyIndex;
    } else void 0 !== resolvedProperty.fromArray && void 0 !== resolvedProperty.toArray ? (o = this.BindingType.HasFromToArray, this.resolvedProperty = resolvedProperty) : Array.isArray(resolvedProperty) ? (o = this.BindingType.EntireArray, this.resolvedProperty = resolvedProperty) : this.propertyName = propertyName;
    this.getValue = this.GetterByBindingType[o], this.setValue = this.SetterByBindingTypeAndVersioning[o][s];
  }
  unbind() {
    this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
}
PropertyBinding.Composite = class Composite {
  constructor(targetGroup, t, n) {
    const r = n || PropertyBinding.parseTrackName(t);
    this._targetGroup = targetGroup, this._bindings = targetGroup.subscribe_(t, r);
  }
  getValue(e, t) {
    this.bind();
    const n = this._targetGroup.nCachedObjects_,
      r = this._bindings[n];
    void 0 !== r && r.getValue(e, t);
  }
  setValue(e, t) {
    const bindings = this._bindings;
    for (let r = this._targetGroup.nCachedObjects_, i = bindings.length; r !== i; ++r) bindings[r].setValue(e, t);
  }
  bind() {
    const bindings = this._bindings;
    for (let t = this._targetGroup.nCachedObjects_, n = bindings.length; t !== n; ++t) bindings[t].bind();
  }
  unbind() {
    const bindings = this._bindings;
    for (let t = this._targetGroup.nCachedObjects_, n = bindings.length; t !== n; ++t) bindings[t].unbind();
  }
}, PropertyBinding.prototype.BindingType = {
  Direct: 0,
  EntireArray: 1,
  ArrayElement: 2,
  HasFromToArray: 3
}, PropertyBinding.prototype.Versioning = {
  None: 0,
  NeedsUpdate: 1,
  MatrixWorldNeedsUpdate: 2
}, PropertyBinding.prototype.GetterByBindingType = [PropertyBinding.prototype._getValue_direct, PropertyBinding.prototype._getValue_array, PropertyBinding.prototype._getValue_arrayElement, PropertyBinding.prototype._getValue_toArray], PropertyBinding.prototype.SetterByBindingTypeAndVersioning = [[PropertyBinding.prototype._setValue_direct, PropertyBinding.prototype._setValue_direct_setNeedsUpdate, PropertyBinding.prototype._setValue_direct_setMatrixWorldNeedsUpdate], [PropertyBinding.prototype._setValue_array, PropertyBinding.prototype._setValue_array_setNeedsUpdate, PropertyBinding.prototype._setValue_array_setMatrixWorldNeedsUpdate], [PropertyBinding.prototype._setValue_arrayElement, PropertyBinding.prototype._setValue_arrayElement_setNeedsUpdate, PropertyBinding.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate], [PropertyBinding.prototype._setValue_fromArray, PropertyBinding.prototype._setValue_fromArray_setNeedsUpdate, PropertyBinding.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];
class AnimationObjectGroup {
  constructor() {
    this.isAnimationObjectGroup = !0, this.uuid = yr(), this._objects = Array.prototype.slice.call(arguments), this.nCachedObjects_ = 0;
    const indicesByUUID = {};
    this._indicesByUUID = indicesByUUID;
    for (let t = 0, n = arguments.length; t !== n; ++t) indicesByUUID[arguments[t].uuid] = t;
    this._paths = [], this._parsedPaths = [], this._bindings = [], this._bindingsIndicesByPath = {};
    const t = this;
    this.stats = {
      objects: {
        get total() {
          return t._objects.length;
        },
        get inUse() {
          return this.total - t.nCachedObjects_;
        }
      },
      get bindingsPerObject() {
        return t._bindings.length;
      }
    };
  }
  add() {
    const objects = this._objects,
      indicesByUUID = this._indicesByUUID,
      paths = this._paths,
      parsedPaths = this._parsedPaths,
      bindings = this._bindings,
      a = bindings.length;
    let s,
      o = objects.length,
      nCachedObjects_ = this.nCachedObjects_;
    for (let l = 0, u = arguments.length; l !== u; ++l) {
      const u = arguments[l],
        d = u.uuid;
      let h = indicesByUUID[d];
      if (void 0 === h) {
        h = o++, indicesByUUID[d] = h, objects.push(u);
        for (let e = 0, t = a; e !== t; ++e) bindings[e].push(new PropertyBinding(u, paths[e], parsedPaths[e]));
      } else if (h < nCachedObjects_) {
        s = objects[h];
        const o = --nCachedObjects_,
          l = objects[o];
        indicesByUUID[l.uuid] = h, objects[h] = l, indicesByUUID[d] = o, objects[o] = u;
        for (let e = 0, t = a; e !== t; ++e) {
          const t = bindings[e],
            a = t[o];
          let s = t[h];
          t[h] = a, void 0 === s && (s = new PropertyBinding(u, paths[e], parsedPaths[e])), t[o] = s;
        }
      } else objects[h] !== s && error("AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.");
    }
    this.nCachedObjects_ = nCachedObjects_;
  }
  remove() {
    const objects = this._objects,
      indicesByUUID = this._indicesByUUID,
      bindings = this._bindings,
      r = bindings.length;
    let nCachedObjects_ = this.nCachedObjects_;
    for (let a = 0, s = arguments.length; a !== s; ++a) {
      const s = arguments[a],
        o = s.uuid,
        c = indicesByUUID[o];
      if (void 0 !== c && c >= nCachedObjects_) {
        const a = nCachedObjects_++,
          l = objects[a];
        indicesByUUID[l.uuid] = c, objects[c] = l, indicesByUUID[o] = a, objects[a] = s;
        for (let e = 0, t = r; e !== t; ++e) {
          const t = bindings[e],
            r = t[a],
            i = t[c];
          t[c] = r, t[a] = i;
        }
      }
    }
    this.nCachedObjects_ = nCachedObjects_;
  }
  uncache() {
    const objects = this._objects,
      indicesByUUID = this._indicesByUUID,
      bindings = this._bindings,
      r = bindings.length;
    let nCachedObjects_ = this.nCachedObjects_,
      a = objects.length;
    for (let s = 0, o = arguments.length; s !== o; ++s) {
      const o = arguments[s].uuid,
        c = indicesByUUID[o];
      if (void 0 !== c) if (delete indicesByUUID[o], c < nCachedObjects_) {
        const s = --nCachedObjects_,
          o = objects[s],
          l = --a,
          u = objects[l];
        indicesByUUID[o.uuid] = c, objects[c] = o, indicesByUUID[u.uuid] = s, objects[s] = u, objects.pop();
        for (let e = 0, t = r; e !== t; ++e) {
          const t = bindings[e],
            r = t[s],
            i = t[l];
          t[c] = r, t[s] = i, t.pop();
        }
      } else {
        const i = --a,
          s = objects[i];
        i > 0 && (indicesByUUID[s.uuid] = c), objects[c] = s, objects.pop();
        for (let e = 0, t = r; e !== t; ++e) {
          const t = bindings[e];
          t[c] = t[i], t.pop();
        }
      }
    }
    this.nCachedObjects_ = nCachedObjects_;
  }
  subscribe_(e, t) {
    const bindingsIndicesByPath = this._bindingsIndicesByPath;
    let r = bindingsIndicesByPath[e];
    const bindings = this._bindings;
    if (void 0 !== r) return bindings[r];
    const paths = this._paths,
      parsedPaths = this._parsedPaths,
      objects = this._objects,
      c = objects.length,
      nCachedObjects_ = this.nCachedObjects_,
      array = new Array(c);
    r = bindings.length, bindingsIndicesByPath[e] = r, paths.push(e), parsedPaths.push(t), bindings.push(array);
    for (let n = nCachedObjects_, r = objects.length; n !== r; ++n) {
      const r = objects[n];
      array[n] = new PropertyBinding(r, e, t);
    }
    return array;
  }
  unsubscribe_(e) {
    const bindingsIndicesByPath = this._bindingsIndicesByPath,
      n = bindingsIndicesByPath[e];
    if (void 0 !== n) {
      const paths = this._paths,
        parsedPaths = this._parsedPaths,
        bindings = this._bindings,
        s = bindings.length - 1,
        o = bindings[s];
      bindingsIndicesByPath[e[s]] = n, bindings[n] = o, bindings.pop(), parsedPaths[n] = parsedPaths[s], parsedPaths.pop(), paths[n] = paths[s], paths.pop();
    }
  }
}
class AnimationAction {
  constructor(mixer, clip, localRoot = null, blendMode = clip.blendMode) {
    this._mixer = mixer, this._clip = clip, this._localRoot = localRoot, this.blendMode = blendMode;
    const i = clip.tracks,
      a = i.length,
      s = new Array(a),
      interpolantSettings = {
        endingStart: ZeroCurvatureEnding,
        endingEnd: ZeroCurvatureEnding
      };
    for (let e = 0; e !== a; ++e) {
      const t = i[e].createInterpolant(null);
      s[e] = t, t.settings = interpolantSettings;
    }
    this._interpolantSettings = interpolantSettings, this._interpolants = s, this._propertyBindings = new Array(a), this._cacheIndex = null, this._byClipCacheIndex = null, this._timeScaleInterpolant = null, this._restoreTimeScale = null, this._weightInterpolant = null, this.loop = Pt, this._loopCount = -1, this._startTime = null, this.time = 0, this.timeScale = 1, this._effectiveTimeScale = 1, this.weight = 1, this._effectiveWeight = 1, this.repetitions = 1 / 0, this.paused = !1, this.enabled = !0, this.clampWhenFinished = !1, this.zeroSlopeAtStart = !0, this.zeroSlopeAtEnd = !0;
  }
  play() {
    return this._mixer._activateAction(this), this;
  }
  stop() {
    return this._mixer._deactivateAction(this), this.reset();
  }
  reset() {
    return this.paused = !1, this.enabled = !0, this.time = 0, this._loopCount = -1, this._startTime = null, this.stopFading().stopWarping();
  }
  isRunning() {
    return this.enabled && !this.paused && 0 !== this.timeScale && null === this._startTime && this._mixer._isActiveAction(this);
  }
  isScheduled() {
    return this._mixer._isActiveAction(this);
  }
  startAt(startTime) {
    return this._startTime = startTime, this;
  }
  setLoop(loop, repetitions) {
    return this.loop = loop, this.repetitions = repetitions, this;
  }
  setEffectiveWeight(weight) {
    return this.weight = weight, this._effectiveWeight = this.enabled ? weight : 0, this.stopFading();
  }
  getEffectiveWeight() {
    return this._effectiveWeight;
  }
  fadeIn(e) {
    return this._scheduleFading(e, 0, 1);
  }
  fadeOut(e) {
    return this._scheduleFading(e, 1, 0);
  }
  crossFadeFrom(e, t, n = !1) {
    if (e.fadeOut(t), this.fadeIn(t), !0 === n) {
      const n = this._clip.duration,
        r = e._clip.duration,
        i = r / n,
        a = n / r;
      e._restoreTimeScale = e.timeScale, this._restoreTimeScale = this.timeScale, e.warp(1, i, t), this.warp(a, 1, t);
    }
    return this;
  }
  crossFadeTo(e, t, n = !1) {
    return e.crossFadeFrom(this, t, n);
  }
  stopFading() {
    const weightInterpolant = this._weightInterpolant;
    return null !== weightInterpolant && (this._weightInterpolant = null, this._mixer._takeBackControlInterpolant(weightInterpolant)), this;
  }
  setEffectiveTimeScale(timeScale) {
    return this.timeScale = timeScale, this._effectiveTimeScale = this.paused ? 0 : timeScale, this.stopWarping();
  }
  getEffectiveTimeScale() {
    return this._effectiveTimeScale;
  }
  setDuration(e) {
    return this.timeScale = this._clip.duration / e, this.stopWarping();
  }
  syncWith(e) {
    return this.time = e.time, this.timeScale = e.timeScale, this.stopWarping();
  }
  halt(e) {
    return this.warp(this._effectiveTimeScale, 0, e);
  }
  warp(e, t, n) {
    const mixer = this._mixer,
      i = mixer.time,
      timeScale = this.timeScale;
    let timeScaleInterpolant = this._timeScaleInterpolant;
    null === timeScaleInterpolant && (timeScaleInterpolant = mixer._lendControlInterpolant(), this._timeScaleInterpolant = timeScaleInterpolant);
    const o = timeScaleInterpolant.parameterPositions,
      c = timeScaleInterpolant.sampleValues;
    return o[0] = i, o[1] = i + n, c[0] = e / timeScale, c[1] = t / timeScale, this;
  }
  stopWarping() {
    const timeScaleInterpolant = this._timeScaleInterpolant;
    return null !== timeScaleInterpolant && (this._timeScaleInterpolant = null, this._mixer._takeBackControlInterpolant(timeScaleInterpolant)), this._restoreTimeScale = null, this;
  }
  getMixer() {
    return this._mixer;
  }
  getClip() {
    return this._clip;
  }
  getRoot() {
    return this._localRoot || this._mixer._root;
  }
  _update(e, t, n, r) {
    if (!this.enabled) return void this._updateWeight(e);
    const startTime = this._startTime;
    if (null !== startTime) {
      const r = (e - startTime) * n;
      r < 0 || 0 === n ? t = 0 : (this._startTime = null, t = n * r);
    }
    t *= this._updateTimeScale(e);
    const a = this._updateTime(t),
      s = this._updateWeight(e);
    if (s > 0) {
      const interpolants = this._interpolants,
        propertyBindings = this._propertyBindings;
      if (this.blendMode === AdditiveAnimationBlendMode) for (let n = 0, r = interpolants.length; n !== r; ++n) interpolants[n].evaluate(a), propertyBindings[n].accumulateAdditive(s);else for (let n = 0, i = interpolants.length; n !== i; ++n) interpolants[n].evaluate(a), propertyBindings[n].accumulate(r, s);
    }
  }
  _updateWeight(e) {
    let effectiveWeight = 0;
    if (this.enabled) {
      effectiveWeight = this.weight;
      const weightInterpolant = this._weightInterpolant;
      if (null !== weightInterpolant) {
        const r = weightInterpolant.evaluate(e)[0];
        effectiveWeight *= r, e > weightInterpolant.parameterPositions[1] && (this.stopFading(), 0 === r && (this.enabled = !1));
      }
    }
    return this._effectiveWeight = effectiveWeight, effectiveWeight;
  }
  _updateTimeScale(e) {
    let t = 0;
    if (!this.paused) {
      t = this.timeScale;
      const timeScaleInterpolant = this._timeScaleInterpolant;
      if (null !== timeScaleInterpolant) {
        t *= timeScaleInterpolant.evaluate(e)[0], e > timeScaleInterpolant.parameterPositions[1] && (0 === t ? this.paused = !0 : (null !== this._restoreTimeScale && (t = this._restoreTimeScale), this.timeScale = t), this.stopWarping());
      }
    }
    return this._effectiveTimeScale = t, t;
  }
  _updateTime(e) {
    const t = this._clip.duration,
      loop = this.loop;
    let time = this.time + e,
      loopCount = this._loopCount;
    const a = loop === LoopPingPong;
    if (0 === e) return -1 === loopCount || !a || 1 & ~loopCount ? time : t - time;
    if (loop === LoopOnce) {
      -1 === loopCount && (this._loopCount = 0, this._setEndings(!0, !0, !1));
      e: {
        if (time >= t) time = t;else {
          if (!(time < 0)) {
            this.time = time;
            break e;
          }
          time = 0;
        }
        this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, this.time = time, this._mixer.dispatchEvent({
          type: "finished",
          action: this,
          direction: e < 0 ? -1 : 1
        });
      }
    } else {
      if (-1 === loopCount && (e >= 0 ? (loopCount = 0, this._setEndings(!0, 0 === this.repetitions, a)) : this._setEndings(0 === this.repetitions, !0, a)), time >= t || time < 0) {
        const n = Math.floor(time / t);
        time -= t * n, loopCount += Math.abs(n);
        const s = this.repetitions - loopCount;
        if (s <= 0) this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, time = e > 0 ? t : 0, this.time = time, this._mixer.dispatchEvent({
          type: "finished",
          action: this,
          direction: e > 0 ? 1 : -1
        });else {
          if (1 === s) {
            const t = e < 0;
            this._setEndings(t, !t, a);
          } else this._setEndings(!1, !1, a);
          this._loopCount = loopCount, this.time = time, this._mixer.dispatchEvent({
            type: "loop",
            action: this,
            loopDelta: n
          });
        }
      } else this._loopCount = loopCount, this.time = time;
      if (a && !(1 & ~loopCount)) return t - time;
    }
    return time;
  }
  _setEndings(e, t, n) {
    const interpolantSettings = this._interpolantSettings;
    n ? (interpolantSettings.endingStart = ZeroSlopeEnding, interpolantSettings.endingEnd = ZeroSlopeEnding) : (interpolantSettings.endingStart = e ? this.zeroSlopeAtStart ? ZeroSlopeEnding : ZeroCurvatureEnding : WrapAroundEnding, interpolantSettings.endingEnd = t ? this.zeroSlopeAtEnd ? ZeroSlopeEnding : ZeroCurvatureEnding : WrapAroundEnding);
  }
  _scheduleFading(e, t, n) {
    const mixer = this._mixer,
      i = mixer.time;
    let weightInterpolant = this._weightInterpolant;
    null === weightInterpolant && (weightInterpolant = mixer._lendControlInterpolant(), this._weightInterpolant = weightInterpolant);
    const s = weightInterpolant.parameterPositions,
      o = weightInterpolant.sampleValues;
    return s[0] = i, o[0] = t, s[1] = i + e, o[1] = n, this;
  }
}
const float32Array = new Float32Array(1);
class AnimationMixer extends EventDispatcher {
  constructor(root) {
    super(), this._root = root, this._initMemoryManager(), this._accuIndex = 0, this.time = 0, this.timeScale = 1, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
      detail: this
    }));
  }
  _bindAction(e, t) {
    const n = e._localRoot || this._root,
      r = e._clip.tracks,
      i = r.length,
      a = e._propertyBindings,
      s = e._interpolants,
      o = n.uuid,
      bindingsByRootAndName = this._bindingsByRootAndName;
    let l = bindingsByRootAndName[o];
    void 0 === l && (l = {}, bindingsByRootAndName[o] = l);
    for (let e = 0; e !== i; ++e) {
      const i = r[e],
        c = i.name;
      let u = l[c];
      if (void 0 !== u) ++u.referenceCount, a[e] = u;else {
        if (u = a[e], void 0 !== u) {
          null === u._cacheIndex && (++u.referenceCount, this._addInactiveBinding(u, o, c));
          continue;
        }
        const r = t && t._propertyBindings[e].binding.parsedPath;
        u = new PropertyMixer(PropertyBinding.create(n, c, r), i.ValueTypeName, i.getValueSize()), ++u.referenceCount, this._addInactiveBinding(u, o, c), a[e] = u;
      }
      s[e].resultBuffer = u.buffer;
    }
  }
  _activateAction(e) {
    if (!this._isActiveAction(e)) {
      if (null === e._cacheIndex) {
        const t = (e._localRoot || this._root).uuid,
          n = e._clip.uuid,
          r = this._actionsByClip[n];
        this._bindAction(e, r && r.knownActions[0]), this._addInactiveAction(e, n, t);
      }
      const t = e._propertyBindings;
      for (let e = 0, n = t.length; e !== n; ++e) {
        const n = t[e];
        0 === n.useCount++ && (this._lendBinding(n), n.saveOriginalState());
      }
      this._lendAction(e);
    }
  }
  _deactivateAction(e) {
    if (this._isActiveAction(e)) {
      const t = e._propertyBindings;
      for (let e = 0, n = t.length; e !== n; ++e) {
        const n = t[e];
        0 === --n.useCount && (n.restoreOriginalState(), this._takeBackBinding(n));
      }
      this._takeBackAction(e);
    }
  }
  _initMemoryManager() {
    this._actions = [], this._nActiveActions = 0, this._actionsByClip = {}, this._bindings = [], this._nActiveBindings = 0, this._bindingsByRootAndName = {}, this._controlInterpolants = [], this._nActiveControlInterpolants = 0;
    const e = this;
    this.stats = {
      actions: {
        get total() {
          return e._actions.length;
        },
        get inUse() {
          return e._nActiveActions;
        }
      },
      bindings: {
        get total() {
          return e._bindings.length;
        },
        get inUse() {
          return e._nActiveBindings;
        }
      },
      controlInterpolants: {
        get total() {
          return e._controlInterpolants.length;
        },
        get inUse() {
          return e._nActiveControlInterpolants;
        }
      }
    };
  }
  _isActiveAction(e) {
    const t = e._cacheIndex;
    return null !== t && t < this._nActiveActions;
  }
  _addInactiveAction(e, t, n) {
    const actions = this._actions,
      actionsByClip = this._actionsByClip;
    let a = actionsByClip[t];
    if (void 0 === a) a = {
      knownActions: [e],
      actionByRoot: {}
    }, e._byClipCacheIndex = 0, actionsByClip[t] = a;else {
      const t = a.knownActions;
      e._byClipCacheIndex = t.length, t.push(e);
    }
    e._cacheIndex = actions.length, actions.push(e), a.actionByRoot[n] = e;
  }
  _removeInactiveAction(e) {
    const actions = this._actions,
      n = actions[actions.length - 1],
      r = e._cacheIndex;
    n._cacheIndex = r, actions[r] = n, actions.pop(), e._cacheIndex = null;
    const i = e._clip.uuid,
      actionsByClip = this._actionsByClip,
      s = actionsByClip[i],
      o = s.knownActions,
      c = o[o.length - 1],
      l = e._byClipCacheIndex;
    c._byClipCacheIndex = l, o[l] = c, o.pop(), e._byClipCacheIndex = null;
    delete s.actionByRoot[(e._localRoot || this._root).uuid], 0 === o.length && delete actionsByClip[i], this._removeInactiveBindingsForAction(e);
  }
  _removeInactiveBindingsForAction(e) {
    const t = e._propertyBindings;
    for (let e = 0, n = t.length; e !== n; ++e) {
      const n = t[e];
      0 === --n.referenceCount && this._removeInactiveBinding(n);
    }
  }
  _lendAction(e) {
    const actions = this._actions,
      n = e._cacheIndex,
      r = this._nActiveActions++,
      i = actions[r];
    e._cacheIndex = r, actions[r] = e, i._cacheIndex = n, actions[n] = i;
  }
  _takeBackAction(e) {
    const actions = this._actions,
      n = e._cacheIndex,
      r = --this._nActiveActions,
      i = actions[r];
    e._cacheIndex = r, actions[r] = e, i._cacheIndex = n, actions[n] = i;
  }
  _addInactiveBinding(e, t, n) {
    const bindingsByRootAndName = this._bindingsByRootAndName,
      bindings = this._bindings;
    let a = bindingsByRootAndName[t];
    void 0 === a && (a = {}, bindingsByRootAndName[t] = a), a[n] = e, e._cacheIndex = bindings.length, bindings.push(e);
  }
  _removeInactiveBinding(e) {
    const bindings = this._bindings,
      n = e.binding,
      r = n.rootNode.uuid,
      i = n.path,
      bindingsByRootAndName = this._bindingsByRootAndName,
      s = bindingsByRootAndName[r],
      o = bindings[bindings.length - 1],
      c = e._cacheIndex;
    o._cacheIndex = c, bindings[c] = o, bindings.pop(), delete s[i], 0 === Object.keys(s).length && delete bindingsByRootAndName[r];
  }
  _lendBinding(e) {
    const bindings = this._bindings,
      n = e._cacheIndex,
      r = this._nActiveBindings++,
      i = bindings[r];
    e._cacheIndex = r, bindings[r] = e, i._cacheIndex = n, bindings[n] = i;
  }
  _takeBackBinding(e) {
    const bindings = this._bindings,
      n = e._cacheIndex,
      r = --this._nActiveBindings,
      i = bindings[r];
    e._cacheIndex = r, bindings[r] = e, i._cacheIndex = n, bindings[n] = i;
  }
  _lendControlInterpolant() {
    const controlInterpolants = this._controlInterpolants,
      t = this._nActiveControlInterpolants++;
    let n = controlInterpolants[t];
    return void 0 === n && (n = new LinearInterpolant(new Float32Array(2), new Float32Array(2), 1, float32Array), n.__cacheIndex = t, controlInterpolants[t] = n), n;
  }
  _takeBackControlInterpolant(e) {
    const controlInterpolants = this._controlInterpolants,
      n = e.__cacheIndex,
      r = --this._nActiveControlInterpolants,
      i = controlInterpolants[r];
    e.__cacheIndex = r, controlInterpolants[r] = e, i.__cacheIndex = n, controlInterpolants[n] = i;
  }
  clipAction(e, t, n) {
    const r = t || this._root,
      i = r.uuid;
    let a = "string" == typeof e ? AnimationClip.findByName(r, e) : e;
    const s = null !== a ? a.uuid : e,
      o = this._actionsByClip[s];
    let c = null;
    if (void 0 === n && (n = null !== a ? a.blendMode : NormalAnimationBlendMode), void 0 !== o) {
      const e = o.actionByRoot[i];
      if (void 0 !== e && e.blendMode === n) return e;
      c = o.knownActions[0], null === a && (a = c._clip);
    }
    if (null === a) return null;
    const animationAction = new AnimationAction(this, a, t, n);
    return this._bindAction(animationAction, c), this._addInactiveAction(animationAction, s, i), animationAction;
  }
  existingAction(e, t) {
    const n = t || this._root,
      r = n.uuid,
      i = "string" == typeof e ? AnimationClip.findByName(n, e) : e,
      a = i ? i.uuid : e,
      s = this._actionsByClip[a];
    return void 0 !== s && s.actionByRoot[r] || null;
  }
  stopAllAction() {
    const actions = this._actions;
    for (let t = this._nActiveActions - 1; t >= 0; --t) actions[t].stop();
    return this;
  }
  update(time) {
    time *= this.timeScale;
    const actions = this._actions,
      nActiveActions = this._nActiveActions,
      r = this.time += time,
      i = Math.sign(time),
      a = this._accuIndex ^= 1;
    for (let s = 0; s !== nActiveActions; ++s) {
      actions[s]._update(r, time, i, a);
    }
    const bindings = this._bindings,
      nActiveBindings = this._nActiveBindings;
    for (let e = 0; e !== nActiveBindings; ++e) bindings[e].apply(a);
    return this;
  }
  setTime(e) {
    this.time = 0;
    for (let e = 0; e < this._actions.length; e++) this._actions[e].time = 0;
    return this.update(e);
  }
  getRoot() {
    return this._root;
  }
  uncacheClip(e) {
    const actions = this._actions,
      n = e.uuid,
      actionsByClip = this._actionsByClip,
      i = actionsByClip[n];
    if (void 0 !== i) {
      const e = i.knownActions;
      for (let n = 0, r = e.length; n !== r; ++n) {
        const r = e[n];
        this._deactivateAction(r);
        const i = r._cacheIndex,
          a = actions[actions.length - 1];
        r._cacheIndex = null, r._byClipCacheIndex = null, a._cacheIndex = i, actions[i] = a, actions.pop(), this._removeInactiveBindingsForAction(r);
      }
      delete actionsByClip[n];
    }
  }
  uncacheRoot(e) {
    const t = e.uuid,
      actionsByClip = this._actionsByClip;
    for (const e in actionsByClip) {
      const r = actionsByClip[e].actionByRoot[t];
      void 0 !== r && (this._deactivateAction(r), this._removeInactiveAction(r));
    }
    const r = this._bindingsByRootAndName[t];
    if (void 0 !== r) for (const e in r) {
      const t = r[e];
      t.restoreOriginalState(), this._removeInactiveBinding(t);
    }
  }
  uncacheAction(e, t) {
    const n = this.existingAction(e, t);
    null !== n && (this._deactivateAction(n), this._removeInactiveAction(n));
  }
}
class RenderTarget3D extends RenderTarget {
  constructor(e = 1, t = 1, depth = 1, r = {}) {
    super(e, t, r), this.isRenderTarget3D = !0, this.depth = depth, this.texture = new Data3DTexture(null, e, t, depth), this._setTextureOptions(r), this.texture.isRenderTargetTexture = !0;
  }
}
class Uniform {
  constructor(value) {
    this.value = value;
  }
  clone() {
    return new Uniform(void 0 === this.value.clone ? this.value : this.value.clone());
  }
}
let Yc = 0;
class UniformsGroup extends EventDispatcher {
  constructor() {
    super(), this.isUniformsGroup = !0, Object.defineProperty(this, "id", {
      value: Yc++
    }), this.name = "", this.usage = kn, this.uniforms = [];
  }
  add(e) {
    return this.uniforms.push(e), this;
  }
  remove(e) {
    const t = this.uniforms.indexOf(e);
    return -1 !== t && this.uniforms.splice(t, 1), this;
  }
  setName(name) {
    return this.name = name, this;
  }
  setUsage(usage) {
    return this.usage = usage, this;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
  copy(e) {
    this.name = e.name, this.usage = e.usage;
    const t = e.uniforms;
    this.uniforms.length = 0;
    for (let e = 0, n = t.length; e < n; e++) {
      const n = Array.isArray(t[e]) ? t[e] : [t[e]];
      for (let e = 0; e < n.length; e++) this.uniforms.push(n[e].clone());
    }
    return this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class InstancedInterleavedBuffer extends InterleavedBuffer {
  constructor(e, t, meshPerAttribute = 1) {
    super(e, t), this.isInstancedInterleavedBuffer = !0, this.meshPerAttribute = meshPerAttribute;
  }
  copy(e) {
    return super.copy(e), this.meshPerAttribute = e.meshPerAttribute, this;
  }
  clone(e) {
    const t = super.clone(e);
    return t.meshPerAttribute = this.meshPerAttribute, t;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.isInstancedInterleavedBuffer = !0, t.meshPerAttribute = this.meshPerAttribute, t;
  }
}
class GLBufferAttribute {
  constructor(buffer, type, itemSize, elementSize, count, normalized = !1) {
    this.isGLBufferAttribute = !0, this.name = "", this.buffer = buffer, this.type = type, this.itemSize = itemSize, this.elementSize = elementSize, this.count = count, this.normalized = normalized, this.version = 0;
  }
  set needsUpdate(e) {
    !0 === e && this.version++;
  }
  setBuffer(buffer) {
    return this.buffer = buffer, this;
  }
  setType(type, elementSize) {
    return this.type = type, this.elementSize = elementSize, this;
  }
  setItemSize(itemSize) {
    return this.itemSize = itemSize, this;
  }
  setCount(count) {
    return this.count = count, this;
  }
}
const Wc = new Matrix4();
class Raycaster {
  constructor(e, t, near = 0, far = 1 / 0) {
    this.ray = new Ray(e, t), this.near = near, this.far = far, this.camera = null, this.layers = new Layers(), this.params = {
      Mesh: {},
      Line: {
        threshold: 1
      },
      LOD: {},
      Points: {
        threshold: 1
      },
      Sprite: {}
    };
  }
  set(e, t) {
    this.ray.set(e, t);
  }
  setFromCamera(e, camera) {
    camera.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(camera.matrixWorld), this.ray.direction.set(e.x, e.y, .5).unproject(camera).sub(this.ray.origin).normalize(), this.camera = camera) : camera.isOrthographicCamera ? (this.ray.origin.set(e.x, e.y, camera.projectionMatrix.elements[14]).unproject(camera), this.ray.direction.set(0, 0, -1).transformDirection(camera.matrixWorld), this.camera = camera) : error("Raycaster: Unsupported camera type: " + camera.type);
  }
  setFromXRController(e) {
    return Wc.identity().extractRotation(e.matrixWorld), this.ray.origin.setFromMatrixPosition(e.matrixWorld), this.ray.direction.set(0, 0, -1).applyMatrix4(Wc), this;
  }
  intersectObject(e, t = !0, n = []) {
    return qc(e, this, n, t), n.sort(Fc), n;
  }
  intersectObjects(e, t = !0, n = []) {
    for (let r = 0, i = e.length; r < i; r++) qc(e[r], this, n, t);
    return n.sort(Fc), n;
  }
}
function Fc(e, t) {
  return e.distance - t.distance;
}
function qc(e, t, n, r) {
  let i = !0;
  if (e.layers.test(t.layers)) {
    !1 === e.raycast(t, n) && (i = !1);
  }
  if (!0 === i && !0 === r) {
    const r = e.children;
    for (let e = 0, i = r.length; e < i; e++) qc(r[e], t, n, !0);
  }
}
class Clock {
  constructor(autoStart = !0) {
    this.autoStart = autoStart, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1, warn("Clock: This module has been deprecated. Please use THREE.Timer instead.");
  }
  start() {
    this.startTime = performance.now(), this.oldTime = this.startTime, this.elapsedTime = 0, this.running = !0;
  }
  stop() {
    this.getElapsedTime(), this.running = !1, this.autoStart = !1;
  }
  getElapsedTime() {
    return this.getDelta(), this.elapsedTime;
  }
  getDelta() {
    let elapsedTime = 0;
    if (this.autoStart && !this.running) return this.start(), 0;
    if (this.running) {
      const oldTime = performance.now();
      elapsedTime = (oldTime - this.oldTime) / 1e3, this.oldTime = oldTime, this.elapsedTime += elapsedTime;
    }
    return elapsedTime;
  }
}
class Spherical {
  constructor(radius = 1, phi = 0, theta = 0) {
    this.radius = radius, this.phi = phi, this.theta = theta;
  }
  set(radius, phi, theta) {
    return this.radius = radius, this.phi = phi, this.theta = theta, this;
  }
  copy(e) {
    return this.radius = e.radius, this.phi = e.phi, this.theta = e.theta, this;
  }
  makeSafe() {
    const e = 1e-6;
    return this.phi = Lr(this.phi, e, Math.PI - e), this;
  }
  setFromVector3(e) {
    return this.setFromCartesianCoords(e.x, e.y, e.z);
  }
  setFromCartesianCoords(e, t, n) {
    return this.radius = Math.sqrt(e * e + t * t + n * n), 0 === this.radius ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(e, n), this.phi = Math.acos(Lr(t / this.radius, -1, 1))), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Cylindrical {
  constructor(radius = 1, theta = 0, n = 0) {
    this.radius = radius, this.theta = theta, this.y = n;
  }
  set(radius, theta, n) {
    return this.radius = radius, this.theta = theta, this.y = n, this;
  }
  copy(e) {
    return this.radius = e.radius, this.theta = e.theta, this.y = e.y, this;
  }
  setFromVector3(e) {
    return this.setFromCartesianCoords(e.x, e.y, e.z);
  }
  setFromCartesianCoords(e, t, n) {
    return this.radius = Math.sqrt(e * e + n * n), this.theta = Math.atan2(e, n), this.y = t, this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Matrix2 {
  static {
    Matrix2.prototype.isMatrix2 = !0;
  }
  constructor(e, t, n, r) {
    this.elements = [1, 0, 0, 1], void 0 !== e && this.set(e, t, n, r);
  }
  identity() {
    return this.set(1, 0, 0, 1), this;
  }
  fromArray(e, t = 0) {
    for (let n = 0; n < 4; n++) this.elements[n] = e[n + t];
    return this;
  }
  set(e, t, n, r) {
    const elements = this.elements;
    return elements[0] = e, elements[2] = t, elements[1] = n, elements[3] = r, this;
  }
}
const Hc = new Vector2();
class Box2 {
  constructor(min = new Vector2(1 / 0, 1 / 0), max = new Vector2(-1 / 0, -1 / 0)) {
    this.isBox2 = !0, this.min = min, this.max = max;
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t++) this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    const n = Hc.copy(t).multiplyScalar(.5);
    return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = 1 / 0, this.max.x = this.max.y = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y;
  }
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  containsPoint(e) {
    return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y;
  }
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y;
  }
  getParameter(e, t) {
    return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y));
  }
  intersectsBox(e) {
    return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y;
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, Hc).distanceTo(e);
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
}
const Uc = new Vector3(),
  Gc = new Vector3(),
  Xc = new Vector3(),
  jc = new Vector3(),
  Vc = new Vector3(),
  Qc = new Vector3(),
  Kc = new Vector3();
class Line3 {
  constructor(start = new Vector3(), end = new Vector3()) {
    this.start = start, this.end = end;
  }
  set(e, t) {
    return this.start.copy(e), this.end.copy(t), this;
  }
  copy(e) {
    return this.start.copy(e.start), this.end.copy(e.end), this;
  }
  getCenter(e) {
    return e.addVectors(this.start, this.end).multiplyScalar(.5);
  }
  delta(e) {
    return e.subVectors(this.end, this.start);
  }
  distanceSq() {
    return this.start.distanceToSquared(this.end);
  }
  distance() {
    return this.start.distanceTo(this.end);
  }
  at(e, t) {
    return this.delta(t).multiplyScalar(e).add(this.start);
  }
  closestPointToPointParameter(e, t) {
    Uc.subVectors(e, this.start), Gc.subVectors(this.end, this.start);
    const n = Gc.dot(Gc);
    if (0 === n) return 0;
    let r = Gc.dot(Uc) / n;
    return t && (r = Lr(r, 0, 1)), r;
  }
  closestPointToPoint(e, t, n) {
    const r = this.closestPointToPointParameter(e, t);
    return this.delta(n).multiplyScalar(r).add(this.start);
  }
  distanceSqToLine3(e, t = Qc, n = Kc) {
    const r = 1e-8 * 1e-8;
    let i, a;
    const start = this.start,
      o = e.start,
      end = this.end,
      l = e.end;
    Xc.subVectors(end, start), jc.subVectors(l, o), Vc.subVectors(start, o);
    const u = Xc.dot(Xc),
      d = jc.dot(jc),
      h = jc.dot(Vc);
    if (u <= r && d <= r) return t.copy(start), n.copy(o), t.sub(n), t.dot(t);
    if (u <= r) i = 0, a = h / d, a = Lr(a, 0, 1);else {
      const e = Xc.dot(Vc);
      if (d <= r) a = 0, i = Lr(-e / u, 0, 1);else {
        const t = Xc.dot(jc),
          n = u * d - t * t;
        i = 0 !== n ? Lr((t * h - e * d) / n, 0, 1) : 0, a = (t * i + h) / d, a < 0 ? (a = 0, i = Lr(-e / u, 0, 1)) : a > 1 && (a = 1, i = Lr((t - e) / u, 0, 1));
      }
    }
    return t.copy(start).addScaledVector(Xc, i), n.copy(o).addScaledVector(jc, a), t.distanceToSquared(n);
  }
  applyMatrix4(e) {
    return this.start.applyMatrix4(e), this.end.applyMatrix4(e), this;
  }
  equals(e) {
    return e.start.equals(this.start) && e.end.equals(this.end);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Jc = new Vector3();
class SpotLightHelper extends Object3D {
  constructor(light, t) {
    super(), this.light = light, this.matrixAutoUpdate = !1, this.color = t, this.type = "SpotLightHelper";
    const bufferGeometry = new BufferGeometry(),
      r = [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, -1, 1];
    for (let e = 0, t = 1, n = 32; e < n; e++, t++) {
      const i = e / n * Math.PI * 2,
        a = t / n * Math.PI * 2;
      r.push(Math.cos(i), Math.sin(i), 1, Math.cos(a), Math.sin(a), 1);
    }
    bufferGeometry.setAttribute("position", new Float32BufferAttribute(r, 3));
    const lineBasicMaterial = new LineBasicMaterial({
      fog: !1,
      toneMapped: !1
    });
    this.cone = new LineSegments(bufferGeometry, lineBasicMaterial), this.add(this.cone), this.update();
  }
  dispose() {
    this.cone.geometry.dispose(), this.cone.material.dispose();
  }
  update() {
    this.light.updateWorldMatrix(!0, !1), this.light.target.updateWorldMatrix(!0, !1), this.parent ? (this.parent.updateWorldMatrix(!0), this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)) : this.matrix.copy(this.light.matrixWorld), this.matrixWorldNeedsUpdate = !0;
    const e = this.light.distance ? this.light.distance : 1e3,
      t = e * Math.tan(this.light.angle);
    this.cone.scale.set(t, t, e), Jc.setFromMatrixPosition(this.light.target.matrixWorld), this.cone.lookAt(Jc), void 0 !== this.color ? this.cone.material.color.set(this.color) : this.cone.material.color.copy(this.light.color);
  }
}
const $c = new Vector3(),
  Zc = new Matrix4(),
  el = new Matrix4();
class SkeletonHelper extends LineSegments {
  constructor(root) {
    const bones = tl(root),
      bufferGeometry = new BufferGeometry(),
      r = [],
      i = [];
    for (let e = 0; e < bones.length; e++) {
      const n = bones[e];
      n.parent && n.parent.isBone && (r.push(0, 0, 0), r.push(0, 0, 0), i.push(0, 0, 0), i.push(0, 0, 0));
    }
    bufferGeometry.setAttribute("position", new Float32BufferAttribute(r, 3)), bufferGeometry.setAttribute("color", new Float32BufferAttribute(i, 3));
    super(bufferGeometry, new LineBasicMaterial({
      vertexColors: !0,
      depthTest: !1,
      depthWrite: !1,
      toneMapped: !1,
      transparent: !0
    })), this.isSkeletonHelper = !0, this.type = "SkeletonHelper", this.root = root, this.bones = bones, this.matrix = root.matrixWorld, this.matrixAutoUpdate = !1;
    const a = new Color(255),
      s = new Color(65280);
    this.setColors(a, s);
  }
  updateMatrixWorld(e) {
    const bones = this.bones,
      n = this.geometry,
      r = n.getAttribute("position");
    el.copy(this.root.matrixWorld).invert();
    for (let e = 0, n = 0; e < bones.length; e++) {
      const i = bones[e];
      i.parent && i.parent.isBone && (Zc.multiplyMatrices(el, i.matrixWorld), $c.setFromMatrixPosition(Zc), r.setXYZ(n, $c.x, $c.y, $c.z), Zc.multiplyMatrices(el, i.parent.matrixWorld), $c.setFromMatrixPosition(Zc), r.setXYZ(n + 1, $c.x, $c.y, $c.z), n += 2);
    }
    n.getAttribute("position").needsUpdate = !0, super.updateMatrixWorld(e);
  }
  setColors(e, t) {
    const n = this.geometry.getAttribute("color");
    for (let r = 0; r < n.count; r += 2) n.setXYZ(r, e.r, e.g, e.b), n.setXYZ(r + 1, t.r, t.g, t.b);
    return n.needsUpdate = !0, this;
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
function tl(e) {
  const t = [];
  !0 === e.isBone && t.push(e);
  for (let n = 0; n < e.children.length; n++) t.push(...tl(e.children[n]));
  return t;
}
class PointLightHelper extends Mesh {
  constructor(light, t, n) {
    super(new SphereGeometry(t, 4, 2), new MeshBasicMaterial({
      wireframe: !0,
      fog: !1,
      toneMapped: !1
    })), this.light = light, this.color = n, this.type = "PointLightHelper", this.matrix = this.light.matrixWorld, this.matrixAutoUpdate = !1, this.update();
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
  update() {
    this.matrixWorldNeedsUpdate = !0, this.light.updateWorldMatrix(!0, !1), void 0 !== this.color ? this.material.color.set(this.color) : this.material.color.copy(this.light.color);
  }
}
const nl = new Vector3(),
  rl = new Color(),
  il = new Color();
class HemisphereLightHelper extends Object3D {
  constructor(light, t, n) {
    super(), this.light = light, this.matrix = light.matrixWorld, this.matrixAutoUpdate = !1, this.color = n, this.type = "HemisphereLightHelper";
    const octahedronGeometry = new OctahedronGeometry(t);
    octahedronGeometry.rotateY(.5 * Math.PI), this.material = new MeshBasicMaterial({
      wireframe: !0,
      fog: !1,
      toneMapped: !1
    }), void 0 === this.color && (this.material.vertexColors = !0);
    const i = octahedronGeometry.getAttribute("position"),
      a = new Float32Array(3 * i.count);
    octahedronGeometry.setAttribute("color", new BufferAttribute(a, 3)), this.add(new Mesh(octahedronGeometry, this.material)), this.update();
  }
  dispose() {
    this.children[0].geometry.dispose(), this.children[0].material.dispose();
  }
  update() {
    const e = this.children[0];
    if (void 0 !== this.color) this.material.color.set(this.color);else {
      const t = e.geometry.getAttribute("color");
      rl.copy(this.light.color), il.copy(this.light.groundColor);
      for (let e = 0, n = t.count; e < n; e++) {
        const r = e < n / 2 ? rl : il;
        t.setXYZ(e, r.r, r.g, r.b);
      }
      t.needsUpdate = !0;
    }
    this.matrixWorldNeedsUpdate = !0, this.light.updateWorldMatrix(!0, !1), e.lookAt(nl.setFromMatrixPosition(this.light.matrixWorld).negate());
  }
}
class GridHelper extends LineSegments {
  constructor(e = 10, t = 10, n = 4473924, r = 8947848) {
    n = new Color(n), r = new Color(r);
    const i = t / 2,
      a = e / t,
      s = e / 2,
      o = [],
      c = [];
    for (let e = 0, l = 0, u = -s; e <= t; e++, u += a) {
      o.push(-s, 0, u, s, 0, u), o.push(u, 0, -s, u, 0, s);
      const t = e === i ? n : r;
      t.toArray(c, l), l += 3, t.toArray(c, l), l += 3, t.toArray(c, l), l += 3, t.toArray(c, l), l += 3;
    }
    const bufferGeometry = new BufferGeometry();
    bufferGeometry.setAttribute("position", new Float32BufferAttribute(o, 3)), bufferGeometry.setAttribute("color", new Float32BufferAttribute(c, 3));
    super(bufferGeometry, new LineBasicMaterial({
      vertexColors: !0,
      toneMapped: !1
    })), this.type = "GridHelper";
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
class PolarGridHelper extends LineSegments {
  constructor(e = 10, t = 16, n = 8, r = 64, i = 4473924, a = 8947848) {
    i = new Color(i), a = new Color(a);
    const s = [],
      o = [];
    if (t > 1) for (let n = 0; n < t; n++) {
      const r = n / t * (2 * Math.PI),
        c = Math.sin(r) * e,
        l = Math.cos(r) * e;
      s.push(0, 0, 0), s.push(c, 0, l);
      const u = 1 & n ? i : a;
      o.push(u.r, u.g, u.b), o.push(u.r, u.g, u.b);
    }
    for (let t = 0; t < n; t++) {
      const c = 1 & t ? i : a,
        l = e - e / n * t;
      for (let e = 0; e < r; e++) {
        let t = e / r * (2 * Math.PI),
          n = Math.sin(t) * l,
          i = Math.cos(t) * l;
        s.push(n, 0, i), o.push(c.r, c.g, c.b), t = (e + 1) / r * (2 * Math.PI), n = Math.sin(t) * l, i = Math.cos(t) * l, s.push(n, 0, i), o.push(c.r, c.g, c.b);
      }
    }
    const bufferGeometry = new BufferGeometry();
    bufferGeometry.setAttribute("position", new Float32BufferAttribute(s, 3)), bufferGeometry.setAttribute("color", new Float32BufferAttribute(o, 3));
    super(bufferGeometry, new LineBasicMaterial({
      vertexColors: !0,
      toneMapped: !1
    })), this.type = "PolarGridHelper";
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
const al = new Vector3(),
  sl = new Vector3(),
  ol = new Vector3();
class DirectionalLightHelper extends Object3D {
  constructor(light, t, n) {
    super(), this.light = light, this.matrix = light.matrixWorld, this.matrixAutoUpdate = !1, this.color = n, this.type = "DirectionalLightHelper", void 0 === t && (t = 1);
    let bufferGeometry = new BufferGeometry();
    bufferGeometry.setAttribute("position", new Float32BufferAttribute([-t, t, 0, t, t, 0, t, -t, 0, -t, -t, 0, -t, t, 0], 3));
    const lineBasicMaterial = new LineBasicMaterial({
      fog: !1,
      toneMapped: !1
    });
    this.lightPlane = new Line(bufferGeometry, lineBasicMaterial), this.add(this.lightPlane), bufferGeometry = new BufferGeometry(), bufferGeometry.setAttribute("position", new Float32BufferAttribute([0, 0, 0, 0, 0, 1], 3)), this.targetLine = new Line(bufferGeometry, lineBasicMaterial), this.add(this.targetLine), this.update();
  }
  dispose() {
    this.lightPlane.geometry.dispose(), this.lightPlane.material.dispose(), this.targetLine.geometry.dispose(), this.targetLine.material.dispose();
  }
  update() {
    this.matrixWorldNeedsUpdate = !0, this.light.updateWorldMatrix(!0, !1), this.light.target.updateWorldMatrix(!0, !1), al.setFromMatrixPosition(this.light.matrixWorld), sl.setFromMatrixPosition(this.light.target.matrixWorld), ol.subVectors(sl, al), this.lightPlane.lookAt(sl), void 0 !== this.color ? (this.lightPlane.material.color.set(this.color), this.targetLine.material.color.set(this.color)) : (this.lightPlane.material.color.copy(this.light.color), this.targetLine.material.color.copy(this.light.color)), this.targetLine.lookAt(sl), this.targetLine.scale.z = ol.length();
  }
}
const cl = new Vector3(),
  camera = new Camera();
class CameraHelper extends LineSegments {
  constructor(e) {
    const bufferGeometry = new BufferGeometry(),
      lineBasicMaterial = new LineBasicMaterial({
        color: 16777215,
        vertexColors: !0,
        toneMapped: !1
      }),
      r = [],
      i = [],
      pointMap = {};
    function s(e, t) {
      o(e), o(t);
    }
    function o(e) {
      r.push(0, 0, 0), i.push(0, 0, 0), void 0 === pointMap[e] && (pointMap[e] = []), pointMap[e].push(r.length / 3 - 1);
    }
    s("n1", "n2"), s("n2", "n4"), s("n4", "n3"), s("n3", "n1"), s("f1", "f2"), s("f2", "f4"), s("f4", "f3"), s("f3", "f1"), s("n1", "f1"), s("n2", "f2"), s("n3", "f3"), s("n4", "f4"), s("p", "n1"), s("p", "n2"), s("p", "n3"), s("p", "n4"), s("u1", "u2"), s("u2", "u3"), s("u3", "u1"), s("c", "t"), s("p", "c"), s("cn1", "cn2"), s("cn3", "cn4"), s("cf1", "cf2"), s("cf3", "cf4"), bufferGeometry.setAttribute("position", new Float32BufferAttribute(r, 3)), bufferGeometry.setAttribute("color", new Float32BufferAttribute(i, 3)), super(bufferGeometry, lineBasicMaterial), this.type = "CameraHelper", this.camera = e, this.camera.updateProjectionMatrix && this.camera.updateProjectionMatrix(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, this.pointMap = pointMap, this.update();
    const c = new Color(16755200),
      l = new Color(16711680),
      u = new Color(43775),
      d = new Color(16777215),
      h = new Color(3355443);
    this.setColors(c, l, u, d, h);
  }
  setColors(e, t, n, r, i) {
    const a = this.geometry.getAttribute("color");
    return a.setXYZ(0, e.r, e.g, e.b), a.setXYZ(1, e.r, e.g, e.b), a.setXYZ(2, e.r, e.g, e.b), a.setXYZ(3, e.r, e.g, e.b), a.setXYZ(4, e.r, e.g, e.b), a.setXYZ(5, e.r, e.g, e.b), a.setXYZ(6, e.r, e.g, e.b), a.setXYZ(7, e.r, e.g, e.b), a.setXYZ(8, e.r, e.g, e.b), a.setXYZ(9, e.r, e.g, e.b), a.setXYZ(10, e.r, e.g, e.b), a.setXYZ(11, e.r, e.g, e.b), a.setXYZ(12, e.r, e.g, e.b), a.setXYZ(13, e.r, e.g, e.b), a.setXYZ(14, e.r, e.g, e.b), a.setXYZ(15, e.r, e.g, e.b), a.setXYZ(16, e.r, e.g, e.b), a.setXYZ(17, e.r, e.g, e.b), a.setXYZ(18, e.r, e.g, e.b), a.setXYZ(19, e.r, e.g, e.b), a.setXYZ(20, e.r, e.g, e.b), a.setXYZ(21, e.r, e.g, e.b), a.setXYZ(22, e.r, e.g, e.b), a.setXYZ(23, e.r, e.g, e.b), a.setXYZ(24, t.r, t.g, t.b), a.setXYZ(25, t.r, t.g, t.b), a.setXYZ(26, t.r, t.g, t.b), a.setXYZ(27, t.r, t.g, t.b), a.setXYZ(28, t.r, t.g, t.b), a.setXYZ(29, t.r, t.g, t.b), a.setXYZ(30, t.r, t.g, t.b), a.setXYZ(31, t.r, t.g, t.b), a.setXYZ(32, n.r, n.g, n.b), a.setXYZ(33, n.r, n.g, n.b), a.setXYZ(34, n.r, n.g, n.b), a.setXYZ(35, n.r, n.g, n.b), a.setXYZ(36, n.r, n.g, n.b), a.setXYZ(37, n.r, n.g, n.b), a.setXYZ(38, r.r, r.g, r.b), a.setXYZ(39, r.r, r.g, r.b), a.setXYZ(40, i.r, i.g, i.b), a.setXYZ(41, i.r, i.g, i.b), a.setXYZ(42, i.r, i.g, i.b), a.setXYZ(43, i.r, i.g, i.b), a.setXYZ(44, i.r, i.g, i.b), a.setXYZ(45, i.r, i.g, i.b), a.setXYZ(46, i.r, i.g, i.b), a.setXYZ(47, i.r, i.g, i.b), a.setXYZ(48, i.r, i.g, i.b), a.setXYZ(49, i.r, i.g, i.b), a.needsUpdate = !0, this;
  }
  update() {
    const e = this.geometry,
      pointMap = this.pointMap;
    let n, r;
    if (camera.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse), !0 === this.camera.reversedDepth) n = 1, r = 0;else if (this.camera.coordinateSystem === Vn) n = -1, r = 1;else {
      if (this.camera.coordinateSystem !== WebGPUCoordinateSystem) throw new Error("THREE.CameraHelper.update(): Invalid coordinate system: " + this.camera.coordinateSystem);
      n = 0, r = 1;
    }
    ul("c", pointMap, e, camera, 0, 0, n), ul("t", pointMap, e, camera, 0, 0, r), ul("n1", pointMap, e, camera, -1, -1, n), ul("n2", pointMap, e, camera, 1, -1, n), ul("n3", pointMap, e, camera, -1, 1, n), ul("n4", pointMap, e, camera, 1, 1, n), ul("f1", pointMap, e, camera, -1, -1, r), ul("f2", pointMap, e, camera, 1, -1, r), ul("f3", pointMap, e, camera, -1, 1, r), ul("f4", pointMap, e, camera, 1, 1, r), ul("u1", pointMap, e, camera, .7, 1.1, n), ul("u2", pointMap, e, camera, -.7, 1.1, n), ul("u3", pointMap, e, camera, 0, 2, n), ul("cf1", pointMap, e, camera, -1, 0, r), ul("cf2", pointMap, e, camera, 1, 0, r), ul("cf3", pointMap, e, camera, 0, -1, r), ul("cf4", pointMap, e, camera, 0, 1, r), ul("cn1", pointMap, e, camera, -1, 0, n), ul("cn2", pointMap, e, camera, 1, 0, n), ul("cn3", pointMap, e, camera, 0, -1, n), ul("cn4", pointMap, e, camera, 0, 1, n), e.getAttribute("position").needsUpdate = !0;
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
function ul(e, t, n, r, i, a, s) {
  cl.set(i, a, s).unproject(r);
  const o = t[e];
  if (void 0 !== o) {
    const e = n.getAttribute("position");
    for (let t = 0, n = o.length; t < n; t++) e.setXYZ(o[t], cl.x, cl.y, cl.z);
  }
}
const dl = new Box3();
class BoxHelper extends LineSegments {
  constructor(object, t = 16776960) {
    const uint16Array = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]),
      r = new Float32Array(24),
      bufferGeometry = new BufferGeometry();
    bufferGeometry.setIndex(new BufferAttribute(uint16Array, 1)), bufferGeometry.setAttribute("position", new BufferAttribute(r, 3)), super(bufferGeometry, new LineBasicMaterial({
      color: t,
      toneMapped: !1
    })), this.object = object, this.type = "BoxHelper", this.matrixAutoUpdate = !1, this.update();
  }
  update() {
    if (void 0 !== this.object && dl.setFromObject(this.object), dl.isEmpty()) return;
    const e = dl.min,
      t = dl.max,
      n = this.geometry.attributes.position,
      r = n.array;
    r[0] = t.x, r[1] = t.y, r[2] = t.z, r[3] = e.x, r[4] = t.y, r[5] = t.z, r[6] = e.x, r[7] = e.y, r[8] = t.z, r[9] = t.x, r[10] = e.y, r[11] = t.z, r[12] = t.x, r[13] = t.y, r[14] = e.z, r[15] = e.x, r[16] = t.y, r[17] = e.z, r[18] = e.x, r[19] = e.y, r[20] = e.z, r[21] = t.x, r[22] = e.y, r[23] = e.z, n.needsUpdate = !0, this.geometry.computeBoundingSphere();
  }
  setFromObject(object) {
    return this.object = object, this.update(), this;
  }
  copy(e, t) {
    return super.copy(e, t), this.object = e.object, this;
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
class Box3Helper extends LineSegments {
  constructor(box, t = 16776960) {
    const uint16Array = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]),
      bufferGeometry = new BufferGeometry();
    bufferGeometry.setIndex(new BufferAttribute(uint16Array, 1)), bufferGeometry.setAttribute("position", new Float32BufferAttribute([1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1], 3)), super(bufferGeometry, new LineBasicMaterial({
      color: t,
      toneMapped: !1
    })), this.box = box, this.type = "Box3Helper", this.geometry.computeBoundingSphere();
  }
  updateMatrixWorld(e) {
    const box = this.box;
    box.isEmpty() || (box.getCenter(this.position), box.getSize(this.scale), this.scale.multiplyScalar(.5), super.updateMatrixWorld(e));
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
class PlaneHelper extends Line {
  constructor(plane, size = 1, n = 16776960) {
    const r = n,
      bufferGeometry = new BufferGeometry();
    bufferGeometry.setAttribute("position", new Float32BufferAttribute([1, -1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], 3)), bufferGeometry.computeBoundingSphere(), super(bufferGeometry, new LineBasicMaterial({
      color: r,
      toneMapped: !1
    })), this.type = "PlaneHelper", this.plane = plane, this.size = size;
    const a = new BufferGeometry();
    a.setAttribute("position", new Float32BufferAttribute([1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], 3)), a.computeBoundingSphere(), this.add(new Mesh(a, new MeshBasicMaterial({
      color: r,
      opacity: .2,
      transparent: !0,
      depthWrite: !1,
      toneMapped: !1
    })));
  }
  updateMatrixWorld(e) {
    this.position.set(0, 0, 0), this.scale.set(.5 * this.size, .5 * this.size, 1), this.lookAt(this.plane.normal), this.translateZ(-this.plane.constant), super.updateMatrixWorld(e);
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose(), this.children[0].geometry.dispose(), this.children[0].material.dispose();
  }
}
const hl = new Vector3();
let pl, fl;
class ArrowHelper extends Object3D {
  constructor(e = new Vector3(0, 0, 1), t = new Vector3(0, 0, 0), n = 1, r = 16776960, i = .2 * n, a = .2 * i) {
    super(), this.type = "ArrowHelper", void 0 === pl && (pl = new BufferGeometry(), pl.setAttribute("position", new Float32BufferAttribute([0, 0, 0, 0, 1, 0], 3)), fl = new ConeGeometry(.5, 1, 5, 1), fl.translate(0, -.5, 0)), this.position.copy(t), this.line = new Line(pl, new LineBasicMaterial({
      color: r,
      toneMapped: !1
    })), this.line.matrixAutoUpdate = !1, this.add(this.line), this.cone = new Mesh(fl, new MeshBasicMaterial({
      color: r,
      toneMapped: !1
    })), this.cone.matrixAutoUpdate = !1, this.add(this.cone), this.setDirection(e), this.setLength(n, i, a);
  }
  setDirection(e) {
    if (e.y > .99999) this.quaternion.set(0, 0, 0, 1);else if (e.y < -.99999) this.quaternion.set(1, 0, 0, 0);else {
      hl.set(e.z, 0, -e.x).normalize();
      const t = Math.acos(e.y);
      this.quaternion.setFromAxisAngle(hl, t);
    }
  }
  setLength(e, t = .2 * e, n = .2 * t) {
    this.line.scale.set(1, Math.max(1e-4, e - t), 1), this.line.updateMatrix(), this.cone.scale.set(n, t, n), this.cone.position.y = e, this.cone.updateMatrix();
  }
  setColor(e) {
    this.line.material.color.set(e), this.cone.material.color.set(e);
  }
  copy(e) {
    return super.copy(e, !1), this.line.copy(e.line), this.cone.copy(e.cone), this;
  }
  dispose() {
    this.line.geometry.dispose(), this.line.material.dispose(), this.cone.geometry.dispose(), this.cone.material.dispose();
  }
}
class AxesHelper extends LineSegments {
  constructor(e = 1) {
    const t = [0, 0, 0, e, 0, 0, 0, 0, 0, 0, e, 0, 0, 0, 0, 0, 0, e],
      bufferGeometry = new BufferGeometry();
    bufferGeometry.setAttribute("position", new Float32BufferAttribute(t, 3)), bufferGeometry.setAttribute("color", new Float32BufferAttribute([1, 0, 0, 1, .6, 0, 0, 1, 0, .6, 1, 0, 0, 0, 1, 0, .6, 1], 3));
    super(bufferGeometry, new LineBasicMaterial({
      vertexColors: !0,
      toneMapped: !1
    })), this.type = "AxesHelper";
  }
  setColors(e, t, n) {
    const r = new Color(),
      i = this.geometry.attributes.color.array;
    return r.set(e), r.toArray(i, 0), r.toArray(i, 3), r.set(t), r.toArray(i, 6), r.toArray(i, 9), r.set(n), r.toArray(i, 12), r.toArray(i, 15), this.geometry.attributes.color.needsUpdate = !0, this;
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
class ShapePath {
  constructor() {
    this.type = "ShapePath", this.color = new Color(), this.subPaths = [], this.currentPath = null, this.userData = {};
  }
  moveTo(e, t) {
    return this.currentPath = new Path(), this.subPaths.push(this.currentPath), this.currentPath.moveTo(e, t), this;
  }
  lineTo(e, t) {
    return this.currentPath.lineTo(e, t), this;
  }
  quadraticCurveTo(e, t, n, r) {
    return this.currentPath.quadraticCurveTo(e, t, n, r), this;
  }
  bezierCurveTo(e, t, n, r, i, a) {
    return this.currentPath.bezierCurveTo(e, t, n, r, i, a), this;
  }
  splineThru(e) {
    return this.currentPath.splineThru(e), this;
  }
  toShapes() {
    function e(e, t) {
      let n = !1;
      const r = t.length;
      for (let i = 0, a = r - 1; i < r; a = i++) {
        const r = t[i],
          s = t[a];
        r.y > e.y != s.y > e.y && e.x < (s.x - r.x) * (e.y - r.y) / (s.y - r.y) + r.x && (n = !n);
      }
      return n;
    }
    function t(t, n) {
      const r = n.getCenter(new Vector2());
      if (e(r, t)) return r;
      const i = r.y,
        a = [],
        s = t.length;
      for (let e = 0; e < s; e++) {
        const n = t[e],
          r = t[(e + 1) % s];
        if (n.y > i != r.y > i) {
          const e = n.x + (i - n.y) * (r.x - n.x) / (r.y - n.y);
          a.push(e);
        }
      }
      return a.length > 1 && (a.sort((e, t) => e - t), r.x = (a[0] + a[1]) / 2), r;
    }
    let n = this.userData.style && this.userData.style.fillRule || "nonzero";
    "nonzero" !== n && "evenodd" !== n && (warn('Fill-rule "' + n + '" is not supported, falling back to "nonzero".'), n = "nonzero");
    const r = "nonzero" === n ? e => 0 !== e : e => !!(1 & e),
      i = [];
    for (const e of this.subPaths) {
      const n = e.getPoints();
      if (n.length < 3) continue;
      const r = ShapeUtils.area(n);
      if (0 === r) continue;
      const box2 = new Box2();
      for (let e = 0; e < n.length; e++) box2.expandByPoint(n[e]);
      i.push({
        subPath: e,
        points: n,
        boundingBox: box2,
        interiorPoint: t(n, box2),
        absArea: Math.abs(r),
        winding: r < 0 ? -1 : 1,
        container: null,
        exclude: !1,
        role: null
      });
    }
    i.sort((e, t) => t.absArea - e.absArea);
    for (let t = 0; t < i.length; t++) {
      const n = i[t];
      let a = 0;
      for (let r = t - 1; r >= 0; r--) {
        const t = i[r];
        if (t.boundingBox.containsBox(n.boundingBox) && e(n.interiorPoint, t.points)) {
          n.container = t.exclude ? t.container : t, a = t.winding, n.winding += a;
          break;
        }
      }
      r(n.winding) === r(a) && (n.exclude = !0);
    }
    for (const e of i) e.exclude || (e.role = null === e.container || "hole" === e.container.role ? "outer" : "hole");
    const a = [],
      map = new Map();
    for (const e of i) {
      if (e.exclude || "outer" !== e.role) continue;
      const shape = new Shape();
      shape.curves = e.subPath.curves, a.push(shape), map.set(e, shape);
    }
    for (const e of i) {
      if (e.exclude || "hole" !== e.role) continue;
      const t = map.get(e.container);
      if (!t) continue;
      const path = new Path();
      path.curves = e.subPath.curves, t.holes.push(path);
    }
    return a;
  }
}
class Controls extends EventDispatcher {
  constructor(object, domElement = null) {
    super(), this.object = object, this.domElement = domElement, this.enabled = !0, this.state = -1, this.keys = {}, this.mouseButtons = {
      LEFT: null,
      MIDDLE: null,
      RIGHT: null
    }, this.touches = {
      ONE: null,
      TWO: null
    };
  }
  connect(domElement) {
    void 0 !== domElement ? (null !== this.domElement && this.disconnect(), this.domElement = domElement) : warn("Controls: connect() now requires an element.");
  }
  disconnect() {}
  dispose() {}
  update() {}
}
function getByteLength(e, t, n, r) {
  const i = function (e) {
    switch (e) {
      case Oe:
      case ByteType:
        return {
          byteLength: 1,
          components: 1
        };
      case UnsignedShortType:
      case ShortType:
      case HalfFloatType:
        return {
          byteLength: 2,
          components: 1
        };
      case UnsignedShort4444Type:
      case UnsignedShort5551Type:
        return {
          byteLength: 2,
          components: 4
        };
      case UnsignedIntType:
      case IntType:
      case ke:
        return {
          byteLength: 4,
          components: 1
        };
      case UnsignedInt5999Type:
      case UnsignedInt101111Type:
        return {
          byteLength: 4,
          components: 3
        };
    }
    throw new Error(`THREE.TextureUtils: Unknown texture type ${e}.`);
  }(r);
  switch (n) {
    case AlphaFormat:
      return e * t;
    case RedFormat:
    case RedIntegerFormat:
      return e * t / i.components * i.byteLength;
    case RGFormat:
    case RGIntegerFormat:
      return e * t * 2 / i.components * i.byteLength;
    case RGBFormat:
      return e * t * 3 / i.components * i.byteLength;
    case RGBAFormat:
    case RGBAIntegerFormat:
      return e * t * 4 / i.components * i.byteLength;
    case RGB_S3TC_DXT1_Format:
    case RGBA_S3TC_DXT1_Format:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case RGBA_S3TC_DXT3_Format:
    case RGBA_S3TC_DXT5_Format:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case RGB_PVRTC_2BPPV1_Format:
    case RGBA_PVRTC_2BPPV1_Format:
      return Math.max(e, 16) * Math.max(t, 8) / 4;
    case RGB_PVRTC_4BPPV1_Format:
    case RGBA_PVRTC_4BPPV1_Format:
      return Math.max(e, 8) * Math.max(t, 8) / 2;
    case RGB_ETC1_Format:
    case RGB_ETC2_Format:
    case R11_EAC_Format:
    case SIGNED_R11_EAC_Format:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case RGBA_ETC2_EAC_Format:
    case RG11_EAC_Format:
    case SIGNED_RG11_EAC_Format:
    case RGBA_ASTC_4x4_Format:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case RGBA_ASTC_5x4_Format:
      return Math.floor((e + 4) / 5) * Math.floor((t + 3) / 4) * 16;
    case RGBA_ASTC_5x5_Format:
      return Math.floor((e + 4) / 5) * Math.floor((t + 4) / 5) * 16;
    case RGBA_ASTC_6x5_Format:
      return Math.floor((e + 5) / 6) * Math.floor((t + 4) / 5) * 16;
    case RGBA_ASTC_6x6_Format:
      return Math.floor((e + 5) / 6) * Math.floor((t + 5) / 6) * 16;
    case RGBA_ASTC_8x5_Format:
      return Math.floor((e + 7) / 8) * Math.floor((t + 4) / 5) * 16;
    case RGBA_ASTC_8x6_Format:
      return Math.floor((e + 7) / 8) * Math.floor((t + 5) / 6) * 16;
    case RGBA_ASTC_8x8_Format:
      return Math.floor((e + 7) / 8) * Math.floor((t + 7) / 8) * 16;
    case RGBA_ASTC_10x5_Format:
      return Math.floor((e + 9) / 10) * Math.floor((t + 4) / 5) * 16;
    case RGBA_ASTC_10x6_Format:
      return Math.floor((e + 9) / 10) * Math.floor((t + 5) / 6) * 16;
    case RGBA_ASTC_10x8_Format:
      return Math.floor((e + 9) / 10) * Math.floor((t + 7) / 8) * 16;
    case RGBA_ASTC_10x10_Format:
      return Math.floor((e + 9) / 10) * Math.floor((t + 9) / 10) * 16;
    case RGBA_ASTC_12x10_Format:
      return Math.floor((e + 11) / 12) * Math.floor((t + 9) / 10) * 16;
    case RGBA_ASTC_12x12_Format:
      return Math.floor((e + 11) / 12) * Math.floor((t + 11) / 12) * 16;
    case RGBA_BPTC_Format:
    case RGB_BPTC_SIGNED_Format:
    case RGB_BPTC_UNSIGNED_Format:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
    case RED_RGTC1_Format:
    case SIGNED_RED_RGTC1_Format:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 8;
    case RED_GREEN_RGTC2_Format:
    case SIGNED_RED_GREEN_RGTC2_Format:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
  }
  throw new Error(`Unable to determine texture byte length for ${n} format.`);
}
class TextureUtils {
  static contain(e, t) {
    return function (e, t) {
      const n = e.image && e.image.width ? e.image.width / e.image.height : 1;
      return n > t ? (e.repeat.x = 1, e.repeat.y = n / t, e.offset.x = 0, e.offset.y = (1 - e.repeat.y) / 2) : (e.repeat.x = t / n, e.repeat.y = 1, e.offset.x = (1 - e.repeat.x) / 2, e.offset.y = 0), e;
    }(e, t);
  }
  static cover(e, t) {
    return function (e, t) {
      const n = e.image && e.image.width ? e.image.width / e.image.height : 1;
      return n > t ? (e.repeat.x = t / n, e.repeat.y = 1, e.offset.x = (1 - e.repeat.x) / 2, e.offset.y = 0) : (e.repeat.x = 1, e.repeat.y = n / t, e.offset.x = 0, e.offset.y = (1 - e.repeat.y) / 2), e;
    }(e, t);
  }
  static fill(e) {
    return function (e) {
      return e.repeat.x = 1, e.repeat.y = 1, e.offset.x = 0, e.offset.y = 0, e;
    }(e);
  }
  static getByteLength(e, t, n, r) {
    return getByteLength(e, t, n, r);
  }
}
"undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", {
  detail: {
    revision: REVISION
  }
})), "undefined" != typeof window && (window.__THREE__ ? warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = REVISION);
export { ACESFilmicToneMapping };
export { T as AddEquation };
export { AddOperation };
export { AdditiveAnimationBlendMode };
export { AdditiveBlending };
export { AgXToneMapping };
export { AlphaFormat };
export { AlwaysCompare };
export { AlwaysDepth };
export { xn as AlwaysStencilFunc };
export { AmbientLight };
export { AnimationAction };
export { AnimationClip };
export { AnimationLoader };
export { AnimationMixer };
export { AnimationObjectGroup };
export { AnimationUtils };
export { ArcCurve };
export { ArrayCamera };
export { ArrowHelper };
export { ue as AttachedBindMode };
export { Audio };
export { AudioAnalyser };
export { AudioContext };
export { AudioListener };
export { AudioLoader };
export { AxesHelper };
export { BackSide };
export { $t as BasicDepthPacking };
export { BasicShadowMap };
export { BatchedMesh };
export { BezierInterpolant };
export { Bone };
export { BooleanKeyframeTrack };
export { Box2 };
export { Box3 };
export { Box3Helper };
export { BoxGeometry };
export { BoxHelper };
export { BufferAttribute };
export { BufferGeometry };
export { BufferGeometryLoader };
export { ByteType };
export { Cache };
export { Camera };
export { CameraHelper };
export { CanvasTexture };
export { CapsuleGeometry };
export { CatmullRomCurve3 };
export { CineonToneMapping };
export { CircleGeometry };
export { ge as ClampToEdgeWrapping };
export { Clock };
export { Color };
export { ColorKeyframeTrack };
export { ColorManagement };
export { Compatibility };
export { CompressedArrayTexture };
export { CompressedCubeTexture };
export { CompressedTexture };
export { CompressedTextureLoader };
export { ConeGeometry };
export { ConstantAlphaFactor };
export { ConstantColorFactor };
export { Controls };
export { CubeCamera };
export { CubeDepthTexture };
export { CubeReflectionMapping };
export { CubeRefractionMapping };
export { CubeTexture };
export { CubeTextureLoader };
export { CubeUVReflectionMapping };
export { CubicBezierCurve };
export { CubicBezierCurve3 };
export { CubicInterpolant };
export { CullFaceBack };
export { CullFaceFront };
export { CullFaceFrontBack };
export { CullFaceNone };
export { Curve };
export { CurvePath };
export { CustomBlending };
export { CustomToneMapping };
export { CylinderGeometry };
export { Cylindrical };
export { Data3DTexture };
export { DataArrayTexture };
export { DataTexture };
export { DataTextureLoader };
export { DataUtils };
export { DecrementStencilOp };
export { DecrementWrapStencilOp };
export { Zo as DefaultLoadingManager };
export { DepthFormat };
export { DepthStencilFormat };
export { DepthTexture };
export { DetachedBindMode };
export { DirectionalLight };
export { DirectionalLightHelper };
export { DiscreteInterpolant };
export { DodecahedronGeometry };
export { DoubleSide };
export { DstAlphaFactor };
export { DstColorFactor };
export { DynamicCopyUsage };
export { DynamicDrawUsage };
export { DynamicReadUsage };
export { EdgesGeometry };
export { EllipseCurve };
export { EqualCompare };
export { EqualDepth };
export { EqualStencilFunc };
export { EquirectangularReflectionMapping };
export { EquirectangularRefractionMapping };
export { Euler };
export { EventDispatcher };
export { ExternalTexture };
export { ExtrudeGeometry };
export { FileLoader };
export { Float16BufferAttribute };
export { Float32BufferAttribute };
export { ke as FloatType };
export { Fog };
export { FogExp2 };
export { FramebufferTexture };
export { f as FrontSide };
export { Frustum };
export { FrustumArray };
export { GLBufferAttribute };
export { GLSL1 };
export { GLSL3 };
export { GreaterCompare };
export { GreaterDepth };
export { GreaterEqualCompare };
export { GreaterEqualDepth };
export { GreaterEqualStencilFunc };
export { GreaterStencilFunc };
export { GridHelper };
export { Group };
export { HTMLTexture };
export { HalfFloatType };
export { HemisphereLight };
export { HemisphereLightHelper };
export { IcosahedronGeometry };
export { ImageBitmapLoader };
export { ImageLoader };
export { ImageUtils };
export { IncrementStencilOp };
export { IncrementWrapStencilOp };
export { InstancedBufferAttribute };
export { InstancedBufferGeometry };
export { InstancedInterleavedBuffer };
export { InstancedMesh };
export { Int16BufferAttribute };
export { Int32BufferAttribute };
export { Int8BufferAttribute };
export { IntType };
export { InterleavedBuffer };
export { InterleavedBufferAttribute };
export { Interpolant };
export { InterpolateBezier };
export { InterpolateDiscrete };
export { InterpolateLinear };
export { InterpolateSmooth };
export { InterpolationSamplingMode };
export { InterpolationSamplingType };
export { InvertStencilOp };
export { fn as KeepStencilOp };
export { KeyframeTrack };
export { LOD };
export { LatheGeometry };
export { Layers };
export { LessCompare };
export { LessDepth };
export { LessEqualCompare };
export { j as LessEqualDepth };
export { LessEqualStencilFunc };
export { LessStencilFunc };
export { Light };
export { LightProbe };
export { Line };
export { Line3 };
export { LineBasicMaterial };
export { LineCurve };
export { LineCurve3 };
export { LineDashedMaterial };
export { LineLoop };
export { LineSegments };
export { LinearFilter };
export { LinearInterpolant };
export { LinearMipMapLinearFilter };
export { LinearMipMapNearestFilter };
export { LinearMipmapLinearFilter };
export { LinearMipmapNearestFilter };
export { LinearSRGBColorSpace };
export { LinearToneMapping };
export { LinearTransfer };
export { Loader };
export { LoaderUtils };
export { LoadingManager };
export { LoopOnce };
export { LoopPingPong };
export { Pt as LoopRepeat };
export { MOUSE };
export { Material };
export { MaterialBlending };
export { MaterialLoader };
export { MathUtils };
export { Matrix2 };
export { Matrix3 };
export { Matrix4 };
export { MaxEquation };
export { Mesh };
export { MeshBasicMaterial };
export { MeshDepthMaterial };
export { MeshDistanceMaterial };
export { MeshLambertMaterial };
export { MeshMatcapMaterial };
export { MeshNormalMaterial };
export { MeshPhongMaterial };
export { MeshPhysicalMaterial };
export { MeshStandardMaterial };
export { MeshToonMaterial };
export { MinEquation };
export { MirroredRepeatWrapping };
export { MixOperation };
export { MultiplyBlending };
export { Z as MultiplyOperation };
export { ye as NearestFilter };
export { NearestMipMapLinearFilter };
export { NearestMipMapNearestFilter };
export { NearestMipmapLinearFilter };
export { NearestMipmapNearestFilter };
export { NeutralToneMapping };
export { NeverCompare };
export { NeverDepth };
export { NeverStencilFunc };
export { NoBlending };
export { NoColorSpace };
export { NoNormalPacking };
export { NoToneMapping };
export { NormalAnimationBlendMode };
export { A as NormalBlending };
export { NormalGAPacking };
export { NormalRGPacking };
export { NotEqualCompare };
export { NotEqualDepth };
export { NotEqualStencilFunc };
export { NumberKeyframeTrack };
export { Object3D };
export { ObjectLoader };
export { ObjectSpaceNormalMap };
export { OctahedronGeometry };
export { OneFactor };
export { OneMinusConstantAlphaFactor };
export { OneMinusConstantColorFactor };
export { OneMinusDstAlphaFactor };
export { OneMinusDstColorFactor };
export { N as OneMinusSrcAlphaFactor };
export { OneMinusSrcColorFactor };
export { OrthographicCamera };
export { PCFShadowMap };
export { PCFSoftShadowMap };
export { Path };
export { PerspectiveCamera };
export { Plane };
export { PlaneGeometry };
export { PlaneHelper };
export { PointLight };
export { PointLightHelper };
export { Points };
export { PointsMaterial };
export { PolarGridHelper };
export { PolyhedronGeometry };
export { PositionalAudio };
export { PropertyBinding };
export { PropertyMixer };
export { QuadraticBezierCurve };
export { QuadraticBezierCurve3 };
export { Quaternion };
export { QuaternionKeyframeTrack };
export { QuaternionLinearInterpolant };
export { R11_EAC_Format };
export { RAD2DEG };
export { RED_GREEN_RGTC2_Format };
export { RED_RGTC1_Format };
export { REVISION };
export { RG11_EAC_Format };
export { RGBADepthPacking };
export { RGBAFormat };
export { RGBAIntegerFormat };
export { RGBA_ASTC_10x10_Format };
export { RGBA_ASTC_10x5_Format };
export { RGBA_ASTC_10x6_Format };
export { RGBA_ASTC_10x8_Format };
export { RGBA_ASTC_12x10_Format };
export { RGBA_ASTC_12x12_Format };
export { RGBA_ASTC_4x4_Format };
export { RGBA_ASTC_5x4_Format };
export { RGBA_ASTC_5x5_Format };
export { RGBA_ASTC_6x5_Format };
export { RGBA_ASTC_6x6_Format };
export { RGBA_ASTC_8x5_Format };
export { RGBA_ASTC_8x6_Format };
export { RGBA_ASTC_8x8_Format };
export { RGBA_BPTC_Format };
export { RGBA_ETC2_EAC_Format };
export { RGBA_PVRTC_2BPPV1_Format };
export { RGBA_PVRTC_4BPPV1_Format };
export { RGBA_S3TC_DXT1_Format };
export { RGBA_S3TC_DXT3_Format };
export { RGBA_S3TC_DXT5_Format };
export { RGBDepthPacking };
export { RGBFormat };
export { RGBIntegerFormat };
export { RGB_BPTC_SIGNED_Format };
export { RGB_BPTC_UNSIGNED_Format };
export { RGB_ETC1_Format };
export { RGB_ETC2_Format };
export { RGB_PVRTC_2BPPV1_Format };
export { RGB_PVRTC_4BPPV1_Format };
export { RGB_S3TC_DXT1_Format };
export { RGDepthPacking };
export { RGFormat };
export { RGIntegerFormat };
export { RawShaderMaterial };
export { Ray };
export { Raycaster };
export { RectAreaLight };
export { RedFormat };
export { RedIntegerFormat };
export { ReinhardToneMapping };
export { RenderTarget };
export { RenderTarget3D };
export { RepeatWrapping };
export { ReplaceStencilOp };
export { ReverseSubtractEquation };
export { ReversedDepthFuncs };
export { RingGeometry };
export { SIGNED_R11_EAC_Format };
export { SIGNED_RED_GREEN_RGTC2_Format };
export { SIGNED_RED_RGTC1_Format };
export { SIGNED_RG11_EAC_Format };
export { SRGBColorSpace };
export { SRGBTransfer };
export { Scene };
export { ShaderMaterial };
export { ShadowMaterial };
export { Shape };
export { ShapeGeometry };
export { ShapePath };
export { ShapeUtils };
export { ShortType };
export { Skeleton };
export { SkeletonHelper };
export { SkinnedMesh };
export { Source };
export { Sphere };
export { SphereGeometry };
export { Spherical };
export { SphericalHarmonics3 };
export { SplineCurve };
export { SpotLight };
export { SpotLightHelper };
export { Sprite };
export { SpriteMaterial };
export { D as SrcAlphaFactor };
export { SrcAlphaSaturateFactor };
export { SrcColorFactor };
export { StaticCopyUsage };
export { kn as StaticDrawUsage };
export { StaticReadUsage };
export { StereoCamera };
export { StreamCopyUsage };
export { StreamDrawUsage };
export { StreamReadUsage };
export { StringKeyframeTrack };
export { SubtractEquation };
export { SubtractiveBlending };
export { TOUCH };
export { nn as TangentSpaceNormalMap };
export { TetrahedronGeometry };
export { Texture };
export { TextureLoader };
export { TextureUtils };
export { Timer };
export { TimestampQuery };
export { TorusGeometry };
export { TorusKnotGeometry };
export { Triangle };
export { TriangleFanDrawMode };
export { TriangleStripDrawMode };
export { TrianglesDrawMode };
export { TubeGeometry };
export { UVMapping };
export { Uint16BufferAttribute };
export { Uint32BufferAttribute };
export { Uint8BufferAttribute };
export { Uint8ClampedBufferAttribute };
export { Uniform };
export { UniformsGroup };
export { UniformsUtils };
export { Oe as UnsignedByteType };
export { UnsignedInt101111Type };
export { UnsignedInt248Type };
export { UnsignedInt5999Type };
export { UnsignedIntType };
export { UnsignedShort4444Type };
export { UnsignedShort5551Type };
export { UnsignedShortType };
export { VSMShadowMap };
export { Vector2 };
export { Vector3 };
export { Vector4 };
export { VectorKeyframeTrack };
export { VideoFrameTexture };
export { VideoTexture };
export { WebGL3DRenderTarget };
export { WebGLArrayRenderTarget };
export { Vn as WebGLCoordinateSystem };
export { WebGLRenderTarget };
export { WebGPUCoordinateSystem };
export { WebXRController };
export { WireframeGeometry };
export { WrapAroundEnding };
export { ZeroCurvatureEnding };
export { ZeroFactor };
export { ZeroSlopeEnding };
export { ZeroStencilOp };
export { cloneUniforms };
export { createCanvasElement };
export { createElementNS };
export { error };
export { getByteLength };
export { getConsoleFunction };
export { getUnlitUniformColorSpace };
export { isTypedArray };
export { log };
export { mergeUniforms };
export { probeAsync };
export { setConsoleFunction };
export { warn };
export { warnOnce };
export { yieldToMain };
