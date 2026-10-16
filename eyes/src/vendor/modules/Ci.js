/** @eyes-analysis
 * 文件职责：解析 KTX2 层级、DFD、键值和二进制纹理元数据
 * 依据：// Recovered from vendors.js:812563-836508.；exports: KHR_DF_CHANNEL_RGBSDA_ALPHA, KHR_DF_CHANNEL_RGBSDA_BLUE, KHR_DF_CHANNEL_RGBSDA_DEPTH, KHR_DF_CHANNEL_RGBSDA_GREEN, KHR_DF_CHANNEL_RGBSDA_RED, KHR_DF_CHANNEL_RGBSDA_STENCIL, KHR_DF_FLAG_ALPHA_PREMULTIPLIED, KHR_DF_FLAG_ALPHA_STRAIGHT, KHR_DF_KHR_DESCRIPTORTYPE_BASICFORMAT, KHR_DF_MODEL_ASTC, KHR_DF_MODEL_ETC1, KHR_DF_MODEL_ETC1S, KHR_DF_MODEL_ETC2, KHR_DF_MODEL_RGBSDA, KHR_DF_MODEL_UASTC, KHR_DF_MODEL_UNSPECIFIED, KHR_DF_PRIMARIES_ACES, KHR_DF_PRIMARIES_ACESCC, KHR_DF_PRIMARIES_ADOBERGB, KHR_DF_PRIMARIES_BT2020, KHR_DF_PRIMARIES_BT601_EBU, KHR_DF_PRIMARIES_BT601_SMPTE, KHR_DF_PRIMARIES_BT709, KHR_DF_PRIMARIES_CIEXYZ, KHR_DF_PRIMARIES_DIS…
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:812563-836508.
const KHR_SUPERCOMPRESSION_NONE = 0,
  KHR_SUPERCOMPRESSION_BASISLZ = 1,
  KHR_SUPERCOMPRESSION_ZSTD = 2,
  KHR_SUPERCOMPRESSION_ZLIB = 3,
  KHR_DF_KHR_DESCRIPTORTYPE_BASICFORMAT = 0,
  KHR_DF_VENDORID_KHRONOS = 0,
  KHR_DF_VERSION = 2,
  KHR_DF_MODEL_UNSPECIFIED = 0,
  KHR_DF_MODEL_RGBSDA = 1,
  KHR_DF_MODEL_ETC1 = 160,
  KHR_DF_MODEL_ETC2 = 161,
  KHR_DF_MODEL_ASTC = 162,
  KHR_DF_MODEL_ETC1S = 163,
  KHR_DF_MODEL_UASTC = 166,
  KHR_DF_FLAG_ALPHA_STRAIGHT = 0,
  KHR_DF_FLAG_ALPHA_PREMULTIPLIED = 1,
  KHR_DF_TRANSFER_UNSPECIFIED = 0,
  KHR_DF_TRANSFER_LINEAR = 1,
  KHR_DF_TRANSFER_SRGB = 2,
  KHR_DF_TRANSFER_ITU = 3,
  KHR_DF_TRANSFER_NTSC = 4,
  KHR_DF_TRANSFER_SLOG = 5,
  KHR_DF_TRANSFER_SLOG2 = 6,
  KHR_DF_TRANSFER_BT1886 = 7,
  KHR_DF_TRANSFER_HLG_OETF = 8,
  KHR_DF_TRANSFER_HLG_EOTF = 9,
  KHR_DF_TRANSFER_PQ_EOTF = 10,
  KHR_DF_TRANSFER_PQ_OETF = 11,
  KHR_DF_TRANSFER_DCIP3 = 12,
  KHR_DF_TRANSFER_PAL_OETF = 13,
  KHR_DF_TRANSFER_PAL625_EOTF = 14,
  KHR_DF_TRANSFER_ST240 = 15,
  KHR_DF_TRANSFER_ACESCC = 16,
  KHR_DF_TRANSFER_ACESCCT = 17,
  KHR_DF_TRANSFER_ADOBERGB = 18,
  KHR_DF_PRIMARIES_UNSPECIFIED = 0,
  KHR_DF_PRIMARIES_BT709 = 1,
  KHR_DF_PRIMARIES_BT601_EBU = 2,
  KHR_DF_PRIMARIES_BT601_SMPTE = 3,
  KHR_DF_PRIMARIES_BT2020 = 4,
  KHR_DF_PRIMARIES_CIEXYZ = 5,
  KHR_DF_PRIMARIES_ACES = 6,
  KHR_DF_PRIMARIES_ACESCC = 7,
  KHR_DF_PRIMARIES_NTSC1953 = 8,
  KHR_DF_PRIMARIES_PAL525 = 9,
  KHR_DF_PRIMARIES_DISPLAYP3 = 10,
  KHR_DF_PRIMARIES_ADOBERGB = 11,
  KHR_DF_CHANNEL_RGBSDA_RED = 0,
  KHR_DF_CHANNEL_RGBSDA_GREEN = 1,
  KHR_DF_CHANNEL_RGBSDA_BLUE = 2,
  KHR_DF_CHANNEL_RGBSDA_STENCIL = 13,
  KHR_DF_CHANNEL_RGBSDA_DEPTH = 14,
  KHR_DF_CHANNEL_RGBSDA_ALPHA = 15,
  KHR_DF_SAMPLE_DATATYPE_FLOAT = 128,
  KHR_DF_SAMPLE_DATATYPE_SIGNED = 64,
  KHR_DF_SAMPLE_DATATYPE_EXPONENT = 32,
  KHR_DF_SAMPLE_DATATYPE_LINEAR = 16,
  VK_FORMAT_UNDEFINED = 0,
  VK_FORMAT_R4G4_UNORM_PACK8 = 1,
  VK_FORMAT_R4G4B4A4_UNORM_PACK16 = 2,
  VK_FORMAT_B4G4R4A4_UNORM_PACK16 = 3,
  VK_FORMAT_R5G6B5_UNORM_PACK16 = 4,
  VK_FORMAT_B5G6R5_UNORM_PACK16 = 5,
  VK_FORMAT_R5G5B5A1_UNORM_PACK16 = 6,
  VK_FORMAT_B5G5R5A1_UNORM_PACK16 = 7,
  VK_FORMAT_A1R5G5B5_UNORM_PACK16 = 8,
  VK_FORMAT_R8_UNORM = 9,
  VK_FORMAT_R8_SNORM = 10,
  VK_FORMAT_R8_UINT = 13,
  VK_FORMAT_R8_SINT = 14,
  VK_FORMAT_R8_SRGB = 15,
  VK_FORMAT_R8G8_UNORM = 16,
  VK_FORMAT_R8G8_SNORM = 17,
  VK_FORMAT_R8G8_UINT = 20,
  VK_FORMAT_R8G8_SINT = 21,
  VK_FORMAT_R8G8_SRGB = 22,
  VK_FORMAT_R8G8B8_UNORM = 23,
  VK_FORMAT_R8G8B8_SNORM = 24,
  VK_FORMAT_R8G8B8_UINT = 27,
  VK_FORMAT_R8G8B8_SINT = 28,
  VK_FORMAT_R8G8B8_SRGB = 29,
  VK_FORMAT_B8G8R8_UNORM = 30,
  VK_FORMAT_B8G8R8_SNORM = 31,
  VK_FORMAT_B8G8R8_UINT = 34,
  VK_FORMAT_B8G8R8_SINT = 35,
  VK_FORMAT_B8G8R8_SRGB = 36,
  VK_FORMAT_R8G8B8A8_UNORM = 37,
  VK_FORMAT_R8G8B8A8_SNORM = 38,
  VK_FORMAT_R8G8B8A8_UINT = 41,
  VK_FORMAT_R8G8B8A8_SINT = 42,
  VK_FORMAT_R8G8B8A8_SRGB = 43,
  VK_FORMAT_B8G8R8A8_UNORM = 44,
  VK_FORMAT_B8G8R8A8_SNORM = 45,
  VK_FORMAT_B8G8R8A8_UINT = 48,
  VK_FORMAT_B8G8R8A8_SINT = 49,
  VK_FORMAT_B8G8R8A8_SRGB = 50,
  VK_FORMAT_A2R10G10B10_UNORM_PACK32 = 58,
  VK_FORMAT_A2R10G10B10_SNORM_PACK32 = 59,
  VK_FORMAT_A2R10G10B10_UINT_PACK32 = 62,
  VK_FORMAT_A2R10G10B10_SINT_PACK32 = 63,
  VK_FORMAT_A2B10G10R10_UNORM_PACK32 = 64,
  VK_FORMAT_A2B10G10R10_SNORM_PACK32 = 65,
  VK_FORMAT_A2B10G10R10_UINT_PACK32 = 68,
  VK_FORMAT_A2B10G10R10_SINT_PACK32 = 69,
  VK_FORMAT_R16_UNORM = 70,
  VK_FORMAT_R16_SNORM = 71,
  VK_FORMAT_R16_UINT = 74,
  VK_FORMAT_R16_SINT = 75,
  VK_FORMAT_R16_SFLOAT = 76,
  VK_FORMAT_R16G16_UNORM = 77,
  VK_FORMAT_R16G16_SNORM = 78,
  VK_FORMAT_R16G16_UINT = 81,
  VK_FORMAT_R16G16_SINT = 82,
  VK_FORMAT_R16G16_SFLOAT = 83,
  VK_FORMAT_R16G16B16_UNORM = 84,
  VK_FORMAT_R16G16B16_SNORM = 85,
  VK_FORMAT_R16G16B16_UINT = 88,
  VK_FORMAT_R16G16B16_SINT = 89,
  VK_FORMAT_R16G16B16_SFLOAT = 90,
  VK_FORMAT_R16G16B16A16_UNORM = 91,
  VK_FORMAT_R16G16B16A16_SNORM = 92,
  VK_FORMAT_R16G16B16A16_UINT = 95,
  VK_FORMAT_R16G16B16A16_SINT = 96,
  VK_FORMAT_R16G16B16A16_SFLOAT = 97,
  VK_FORMAT_R32_UINT = 98,
  VK_FORMAT_R32_SINT = 99,
  VK_FORMAT_R32_SFLOAT = 100,
  VK_FORMAT_R32G32_UINT = 101,
  VK_FORMAT_R32G32_SINT = 102,
  VK_FORMAT_R32G32_SFLOAT = 103,
  VK_FORMAT_R32G32B32_UINT = 104,
  VK_FORMAT_R32G32B32_SINT = 105,
  VK_FORMAT_R32G32B32_SFLOAT = 106,
  VK_FORMAT_R32G32B32A32_UINT = 107,
  VK_FORMAT_R32G32B32A32_SINT = 108,
  VK_FORMAT_R32G32B32A32_SFLOAT = 109,
  VK_FORMAT_R64_UINT = 110,
  VK_FORMAT_R64_SINT = 111,
  VK_FORMAT_R64_SFLOAT = 112,
  VK_FORMAT_R64G64_UINT = 113,
  VK_FORMAT_R64G64_SINT = 114,
  VK_FORMAT_R64G64_SFLOAT = 115,
  VK_FORMAT_R64G64B64_UINT = 116,
  VK_FORMAT_R64G64B64_SINT = 117,
  VK_FORMAT_R64G64B64_SFLOAT = 118,
  VK_FORMAT_R64G64B64A64_UINT = 119,
  VK_FORMAT_R64G64B64A64_SINT = 120,
  VK_FORMAT_R64G64B64A64_SFLOAT = 121,
  VK_FORMAT_B10G11R11_UFLOAT_PACK32 = 122,
  VK_FORMAT_E5B9G9R9_UFLOAT_PACK32 = 123,
  VK_FORMAT_D16_UNORM = 124,
  VK_FORMAT_X8_D24_UNORM_PACK32 = 125,
  VK_FORMAT_D32_SFLOAT = 126,
  VK_FORMAT_S8_UINT = 127,
  VK_FORMAT_D16_UNORM_S8_UINT = 128,
  VK_FORMAT_D24_UNORM_S8_UINT = 129,
  VK_FORMAT_D32_SFLOAT_S8_UINT = 130,
  VK_FORMAT_BC1_RGB_UNORM_BLOCK = 131,
  VK_FORMAT_BC1_RGB_SRGB_BLOCK = 132,
  VK_FORMAT_BC1_RGBA_UNORM_BLOCK = 133,
  VK_FORMAT_BC1_RGBA_SRGB_BLOCK = 134,
  VK_FORMAT_BC2_UNORM_BLOCK = 135,
  VK_FORMAT_BC2_SRGB_BLOCK = 136,
  VK_FORMAT_BC3_UNORM_BLOCK = 137,
  VK_FORMAT_BC3_SRGB_BLOCK = 138,
  VK_FORMAT_BC4_UNORM_BLOCK = 139,
  VK_FORMAT_BC4_SNORM_BLOCK = 140,
  VK_FORMAT_BC5_UNORM_BLOCK = 141,
  VK_FORMAT_BC5_SNORM_BLOCK = 142,
  VK_FORMAT_BC6H_UFLOAT_BLOCK = 143,
  VK_FORMAT_BC6H_SFLOAT_BLOCK = 144,
  VK_FORMAT_BC7_UNORM_BLOCK = 145,
  VK_FORMAT_BC7_SRGB_BLOCK = 146,
  VK_FORMAT_ETC2_R8G8B8_UNORM_BLOCK = 147,
  VK_FORMAT_ETC2_R8G8B8_SRGB_BLOCK = 148,
  VK_FORMAT_ETC2_R8G8B8A1_UNORM_BLOCK = 149,
  VK_FORMAT_ETC2_R8G8B8A1_SRGB_BLOCK = 150,
  VK_FORMAT_ETC2_R8G8B8A8_UNORM_BLOCK = 151,
  VK_FORMAT_ETC2_R8G8B8A8_SRGB_BLOCK = 152,
  VK_FORMAT_EAC_R11_UNORM_BLOCK = 153,
  VK_FORMAT_EAC_R11_SNORM_BLOCK = 154,
  VK_FORMAT_EAC_R11G11_UNORM_BLOCK = 155,
  VK_FORMAT_EAC_R11G11_SNORM_BLOCK = 156,
  VK_FORMAT_ASTC_4x4_UNORM_BLOCK = 157,
  VK_FORMAT_ASTC_4x4_SRGB_BLOCK = 158,
  VK_FORMAT_ASTC_5x4_UNORM_BLOCK = 159,
  VK_FORMAT_ASTC_5x4_SRGB_BLOCK = 160,
  VK_FORMAT_ASTC_5x5_UNORM_BLOCK = 161,
  VK_FORMAT_ASTC_5x5_SRGB_BLOCK = 162,
  VK_FORMAT_ASTC_6x5_UNORM_BLOCK = 163,
  VK_FORMAT_ASTC_6x5_SRGB_BLOCK = 164,
  VK_FORMAT_ASTC_6x6_UNORM_BLOCK = 165,
  VK_FORMAT_ASTC_6x6_SRGB_BLOCK = 166,
  VK_FORMAT_ASTC_8x5_UNORM_BLOCK = 167,
  VK_FORMAT_ASTC_8x5_SRGB_BLOCK = 168,
  VK_FORMAT_ASTC_8x6_UNORM_BLOCK = 169,
  VK_FORMAT_ASTC_8x6_SRGB_BLOCK = 170,
  VK_FORMAT_ASTC_8x8_UNORM_BLOCK = 171,
  VK_FORMAT_ASTC_8x8_SRGB_BLOCK = 172,
  VK_FORMAT_ASTC_10x5_UNORM_BLOCK = 173,
  VK_FORMAT_ASTC_10x5_SRGB_BLOCK = 174,
  VK_FORMAT_ASTC_10x6_UNORM_BLOCK = 175,
  VK_FORMAT_ASTC_10x6_SRGB_BLOCK = 176,
  VK_FORMAT_ASTC_10x8_UNORM_BLOCK = 177,
  VK_FORMAT_ASTC_10x8_SRGB_BLOCK = 178,
  VK_FORMAT_ASTC_10x10_UNORM_BLOCK = 179,
  VK_FORMAT_ASTC_10x10_SRGB_BLOCK = 180,
  VK_FORMAT_ASTC_12x10_UNORM_BLOCK = 181,
  VK_FORMAT_ASTC_12x10_SRGB_BLOCK = 182,
  VK_FORMAT_ASTC_12x12_UNORM_BLOCK = 183,
  VK_FORMAT_ASTC_12x12_SRGB_BLOCK = 184,
  VK_FORMAT_R10X6_UNORM_PACK16 = 1000156007,
  VK_FORMAT_R10X6G10X6_UNORM_2PACK16 = 1000156008,
  VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16 = 1000156009,
  VK_FORMAT_G10X6B10X6G10X6R10X6_422_UNORM_4PACK16 = 1000156010,
  VK_FORMAT_B10X6G10X6R10X6G10X6_422_UNORM_4PACK16 = 1000156011,
  VK_FORMAT_R12X4_UNORM_PACK16 = 1000156017,
  VK_FORMAT_R12X4G12X4_UNORM_2PACK16 = 1000156018,
  VK_FORMAT_R12X4G12X4B12X4A12X4_UNORM_4PACK16 = 1000156019,
  VK_FORMAT_G12X4B12X4G12X4R12X4_422_UNORM_4PACK16 = 1000156020,
  VK_FORMAT_B12X4G12X4R12X4G12X4_422_UNORM_4PACK16 = 1000156021,
  VK_FORMAT_PVRTC1_2BPP_UNORM_BLOCK_IMG = 1000054e3,
  VK_FORMAT_PVRTC1_4BPP_UNORM_BLOCK_IMG = 1000054001,
  VK_FORMAT_PVRTC2_2BPP_UNORM_BLOCK_IMG = 1000054002,
  VK_FORMAT_PVRTC2_4BPP_UNORM_BLOCK_IMG = 1000054003,
  VK_FORMAT_PVRTC1_2BPP_SRGB_BLOCK_IMG = 1000054004,
  VK_FORMAT_PVRTC1_4BPP_SRGB_BLOCK_IMG = 1000054005,
  VK_FORMAT_PVRTC2_2BPP_SRGB_BLOCK_IMG = 1000054006,
  VK_FORMAT_PVRTC2_4BPP_SRGB_BLOCK_IMG = 1000054007,
  VK_FORMAT_ASTC_4x4_SFLOAT_BLOCK_EXT = 1000066e3,
  VK_FORMAT_ASTC_5x4_SFLOAT_BLOCK_EXT = 1000066001,
  VK_FORMAT_ASTC_5x5_SFLOAT_BLOCK_EXT = 1000066002,
  VK_FORMAT_ASTC_6x5_SFLOAT_BLOCK_EXT = 1000066003,
  VK_FORMAT_ASTC_6x6_SFLOAT_BLOCK_EXT = 1000066004,
  VK_FORMAT_ASTC_8x5_SFLOAT_BLOCK_EXT = 1000066005,
  VK_FORMAT_ASTC_8x6_SFLOAT_BLOCK_EXT = 1000066006,
  VK_FORMAT_ASTC_8x8_SFLOAT_BLOCK_EXT = 1000066007,
  VK_FORMAT_ASTC_10x5_SFLOAT_BLOCK_EXT = 1000066008,
  VK_FORMAT_ASTC_10x6_SFLOAT_BLOCK_EXT = 1000066009,
  VK_FORMAT_ASTC_10x8_SFLOAT_BLOCK_EXT = 1000066010,
  VK_FORMAT_ASTC_10x10_SFLOAT_BLOCK_EXT = 1000066011,
  VK_FORMAT_ASTC_12x10_SFLOAT_BLOCK_EXT = 1000066012,
  VK_FORMAT_ASTC_12x12_SFLOAT_BLOCK_EXT = 1000066013,
  VK_FORMAT_A4R4G4B4_UNORM_PACK16_EXT = 100034e4,
  VK_FORMAT_A4B4G4R4_UNORM_PACK16_EXT = 1000340001;
function createDefaultContainer() {
  return {
    vkFormat: 0,
    typeSize: 1,
    pixelWidth: 0,
    pixelHeight: 0,
    pixelDepth: 0,
    layerCount: 0,
    faceCount: 1,
    levelCount: 0,
    supercompressionScheme: 0,
    levels: [],
    dataFormatDescriptor: [{
      vendorId: 0,
      descriptorType: 0,
      versionNumber: 2,
      colorModel: 0,
      colorPrimaries: 1,
      transferFunction: 2,
      flags: 0,
      texelBlockDimension: [0, 0, 0, 0],
      bytesPlane: [0, 0, 0, 0, 0, 0, 0, 0],
      samples: []
    }],
    keyValue: {},
    globalData: null
  };
}
/** @eyes-analysis
 * 类职责：解析 KTX2 层级、DFD、键值和二进制纹理元数据
 * 继承：无显式父类；导出：模块内部声明。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Ci {
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 状态写入：_dataView、_littleEndian、_offset。
   * 调用线索：new DataView。
   */
  constructor(e, t, n, littleEndian) {
    this._dataView = void 0, this._littleEndian = void 0, this._offset = void 0, this._dataView = new DataView(e.buffer, e.byteOffset + t, n), this._littleEndian = littleEndian, this._offset = 0;
  }
  /** @eyes-analysis
   * 源码方法 _nextUint8；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：_offset。
   * 调用线索：this._dataView.getUint8。
   */
  _nextUint8() {
    const e = this._dataView.getUint8(this._offset);
    return this._offset += 1, e;
  }
  /** @eyes-analysis
   * 源码方法 _nextUint16；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：_offset。
   * 调用线索：this._dataView.getUint16。
   */
  _nextUint16() {
    const e = this._dataView.getUint16(this._offset, this._littleEndian);
    return this._offset += 2, e;
  }
  /** @eyes-analysis
   * 源码方法 _nextUint32；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：_offset。
   * 调用线索：this._dataView.getUint32。
   */
  _nextUint32() {
    const e = this._dataView.getUint32(this._offset, this._littleEndian);
    return this._offset += 4, e;
  }
  /** @eyes-analysis
   * 源码方法 _nextUint64；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：_offset。
   * 调用线索：this._dataView.getUint32。
   */
  _nextUint64() {
    const e = this._dataView.getUint32(this._offset, this._littleEndian) + 2 ** 32 * this._dataView.getUint32(this._offset + 4, this._littleEndian);
    return this._offset += 8, e;
  }
  /** @eyes-analysis
   * 源码方法 _nextInt32；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：_offset。
   * 调用线索：this._dataView.getInt32。
   */
  _nextInt32() {
    const e = this._dataView.getInt32(this._offset, this._littleEndian);
    return this._offset += 4, e;
  }
  /** @eyes-analysis
   * 源码方法 _nextUint8Array；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：_offset。
   * 调用线索：new Uint8Array。
   */
  _nextUint8Array(offset) {
    const uint8Array = new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + this._offset, offset);
    return this._offset += offset, uint8Array;
  }
  /** @eyes-analysis
   * 源码方法 _skip；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：_offset。
   */
  _skip(offset) {
    return this._offset += offset, this;
  }
  /** @eyes-analysis
   * 源码方法 _scan；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：_offset。
   * 调用线索：new Uint8Array、this._dataView.getUint8。
   */
  _scan(e, t = 0) {
    const offset = this._offset;
    let r = 0;
    for (; this._dataView.getUint8(this._offset) !== t && r < e;) r++, this._offset++;
    return r < e && this._offset++, new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + offset, r);
  }
}
const uint8Array = new Uint8Array([0]),
  Rr = [171, 75, 84, 88, 32, 50, 48, 187, 13, 10, 26, 10];
function kr(e) {
  return new TextEncoder().encode(e);
}
function Pr(e) {
  return new TextDecoder().decode(e);
}
function Yr(e) {
  let t = 0;
  for (const n of e) t += n.byteLength;
  const n = new Uint8Array(t);
  let r = 0;
  for (const t of e) n.set(new Uint8Array(t), r), r += t.byteLength;
  return n;
}
function Wr(e, t = 4) {
  return Math.ceil(e / t) * t - e;
}
function read(e) {
  const t = new Uint8Array(e.buffer, e.byteOffset, Rr.length);
  if (t[0] !== Rr[0] || t[1] !== Rr[1] || t[2] !== Rr[2] || t[3] !== Rr[3] || t[4] !== Rr[4] || t[5] !== Rr[5] || t[6] !== Rr[6] || t[7] !== Rr[7] || t[8] !== Rr[8] || t[9] !== Rr[9] || t[10] !== Rr[10] || t[11] !== Rr[11]) throw new Error("Missing KTX 2.0 identifier.");
  const n = {
      vkFormat: 0,
      typeSize: 1,
      pixelWidth: 0,
      pixelHeight: 0,
      pixelDepth: 0,
      layerCount: 0,
      faceCount: 1,
      levelCount: 0,
      supercompressionScheme: 0,
      levels: [],
      dataFormatDescriptor: [{
        vendorId: 0,
        descriptorType: 0,
        versionNumber: 2,
        colorModel: 0,
        colorPrimaries: 1,
        transferFunction: 2,
        flags: 0,
        texelBlockDimension: [0, 0, 0, 0],
        bytesPlane: [0, 0, 0, 0, 0, 0, 0, 0],
        samples: []
      }],
      keyValue: {},
      globalData: null
    },
    r = 17 * Uint32Array.BYTES_PER_ELEMENT,
    i = new Ci(e, Rr.length, r, !0);
  n.vkFormat = i._nextUint32(), n.typeSize = i._nextUint32(), n.pixelWidth = i._nextUint32(), n.pixelHeight = i._nextUint32(), n.pixelDepth = i._nextUint32(), n.layerCount = i._nextUint32(), n.faceCount = i._nextUint32(), n.levelCount = i._nextUint32(), n.supercompressionScheme = i._nextUint32();
  const a = i._nextUint32(),
    s = i._nextUint32(),
    o = i._nextUint32(),
    c = i._nextUint32(),
    l = i._nextUint64(),
    u = i._nextUint64(),
    d = 3 * Math.max(n.levelCount, 1) * 8,
    h = new Ci(e, Rr.length + r, d, !0);
  for (let t = 0, r = Math.max(n.levelCount, 1); t < r; t++) n.levels.push({
    levelData: new Uint8Array(e.buffer, e.byteOffset + h._nextUint64(), h._nextUint64()),
    uncompressedByteLength: h._nextUint64()
  });
  const p = new Ci(e, a, s, !0);
  p._skip(4);
  const f = p._nextUint16(),
    m = p._nextUint16(),
    M = p._nextUint16(),
    _ = p._nextUint16(),
    A = {
      vendorId: f,
      descriptorType: m,
      versionNumber: M,
      colorModel: p._nextUint8(),
      colorPrimaries: p._nextUint8(),
      transferFunction: p._nextUint8(),
      flags: p._nextUint8(),
      texelBlockDimension: [p._nextUint8(), p._nextUint8(), p._nextUint8(), p._nextUint8()],
      bytesPlane: [p._nextUint8(), p._nextUint8(), p._nextUint8(), p._nextUint8(), p._nextUint8(), p._nextUint8(), p._nextUint8(), p._nextUint8()],
      samples: []
    },
    g = (_ / 4 - 6) / 4;
  for (let e = 0; e < g; e++) {
    const t = {
      bitOffset: p._nextUint16(),
      bitLength: p._nextUint8(),
      channelType: p._nextUint8(),
      samplePosition: [p._nextUint8(), p._nextUint8(), p._nextUint8(), p._nextUint8()],
      sampleLower: Number.NEGATIVE_INFINITY,
      sampleUpper: Number.POSITIVE_INFINITY
    };
    64 & t.channelType ? (t.sampleLower = p._nextInt32(), t.sampleUpper = p._nextInt32()) : (t.sampleLower = p._nextUint32(), t.sampleUpper = p._nextUint32()), A.samples[e] = t;
  }
  n.dataFormatDescriptor.length = 0, n.dataFormatDescriptor.push(A);
  const b = new Ci(e, o, c, !0);
  for (; b._offset < c;) {
    const e = b._nextUint32(),
      t = b._scan(e),
      r = Pr(t);
    if (n.keyValue[r] = b._nextUint8Array(e - t.byteLength - 1), r.match(/^ktx/i)) {
      const e = Pr(n.keyValue[r]);
      n.keyValue[r] = e.substring(0, e.lastIndexOf("\0"));
    }
    b._skip(e % 4 ? 4 - e % 4 : 0);
  }
  if (u <= 0) return n;
  const y = new Ci(e, l, u, !0),
    L = y._nextUint16(),
    v = y._nextUint16(),
    T = y._nextUint32(),
    S = y._nextUint32(),
    w = y._nextUint32(),
    E = y._nextUint32(),
    x = [];
  for (let e = 0, t = Math.max(n.levelCount, 1); e < t; e++) x.push({
    imageFlags: y._nextUint32(),
    rgbSliceByteOffset: y._nextUint32(),
    rgbSliceByteLength: y._nextUint32(),
    alphaSliceByteOffset: y._nextUint32(),
    alphaSliceByteLength: y._nextUint32()
  });
  const C = l + y._offset,
    z = C + T,
    O = z + S,
    B = O + w,
    D = new Uint8Array(e.buffer, e.byteOffset + C, T),
    N = new Uint8Array(e.buffer, e.byteOffset + z, S),
    I = new Uint8Array(e.buffer, e.byteOffset + O, w),
    R = new Uint8Array(e.buffer, e.byteOffset + B, E);
  return n.globalData = {
    endpointCount: L,
    selectorCount: v,
    imageDescs: x,
    endpointsData: D,
    selectorsData: N,
    tablesData: I,
    extendedData: R
  }, n;
}
function qr() {
  return qr = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, qr.apply(null, arguments);
}
const Hr = {
  keepWriter: !1
};
function write(e, t = {}) {
  t = qr({}, Hr, t);
  let arrayBuffer = new ArrayBuffer(0);
  if (e.globalData) {
    const t = new ArrayBuffer(20 + 5 * e.globalData.imageDescs.length * 4),
      dataView = new DataView(t);
    dataView.setUint16(0, e.globalData.endpointCount, !0), dataView.setUint16(2, e.globalData.selectorCount, !0), dataView.setUint32(4, e.globalData.endpointsData.byteLength, !0), dataView.setUint32(8, e.globalData.selectorsData.byteLength, !0), dataView.setUint32(12, e.globalData.tablesData.byteLength, !0), dataView.setUint32(16, e.globalData.extendedData.byteLength, !0);
    for (let t = 0; t < e.globalData.imageDescs.length; t++) {
      const n = e.globalData.imageDescs[t];
      dataView.setUint32(20 + 5 * t * 4 + 0, n.imageFlags, !0), dataView.setUint32(20 + 5 * t * 4 + 4, n.rgbSliceByteOffset, !0), dataView.setUint32(20 + 5 * t * 4 + 8, n.rgbSliceByteLength, !0), dataView.setUint32(20 + 5 * t * 4 + 12, n.alphaSliceByteOffset, !0), dataView.setUint32(20 + 5 * t * 4 + 16, n.alphaSliceByteLength, !0);
    }
    arrayBuffer = Yr([t, e.globalData.endpointsData, e.globalData.selectorsData, e.globalData.tablesData, e.globalData.extendedData]);
  }
  const r = [],
    i = Object.entries(qr({}, e.keyValue, !t.keepWriter && {
      KTXwriter: "KTX-Parse v1.0.1"
    }));
  i.sort((e, t) => e[0] > t[0] ? 1 : -1);
  for (const [e, t] of i) {
    const n = kr(e),
      i = "string" == typeof t ? Yr([kr(t), uint8Array]) : t,
      a = n.byteLength + 1 + i.byteLength,
      s = Wr(a, 4);
    r.push(Yr([new Uint32Array([a]), n, uint8Array, i, new Uint8Array(s).fill(0)]));
  }
  const a = Yr(r);
  if (1 !== e.dataFormatDescriptor.length || 0 !== e.dataFormatDescriptor[0].descriptorType) throw new Error("Only BASICFORMAT Data Format Descriptor output supported.");
  const s = e.dataFormatDescriptor[0],
    o = new ArrayBuffer(28 + 16 * s.samples.length),
    dataView = new DataView(o),
    l = 24 + 16 * s.samples.length;
  if (dataView.setUint32(0, o.byteLength, !0), dataView.setUint16(4, s.vendorId, !0), dataView.setUint16(6, s.descriptorType, !0), dataView.setUint16(8, s.versionNumber, !0), dataView.setUint16(10, l, !0), dataView.setUint8(12, s.colorModel), dataView.setUint8(13, s.colorPrimaries), dataView.setUint8(14, s.transferFunction), dataView.setUint8(15, s.flags), !Array.isArray(s.texelBlockDimension)) throw new Error("texelBlockDimension is now an array. For dimensionality `d`, set `d - 1`.");
  dataView.setUint8(16, s.texelBlockDimension[0]), dataView.setUint8(17, s.texelBlockDimension[1]), dataView.setUint8(18, s.texelBlockDimension[2]), dataView.setUint8(19, s.texelBlockDimension[3]);
  for (let e = 0; e < 8; e++) dataView.setUint8(20 + e, s.bytesPlane[e]);
  for (let e = 0; e < s.samples.length; e++) {
    const t = s.samples[e],
      n = 28 + 16 * e;
    dataView.setUint16(n + 0, t.bitOffset, !0), dataView.setUint8(n + 2, t.bitLength), dataView.setUint8(n + 3, t.channelType), dataView.setUint8(n + 4, t.samplePosition[0]), dataView.setUint8(n + 5, t.samplePosition[1]), dataView.setUint8(n + 6, t.samplePosition[2]), dataView.setUint8(n + 7, t.samplePosition[3]), 64 & t.channelType ? (dataView.setInt32(n + 8, t.sampleLower, !0), dataView.setInt32(n + 12, t.sampleUpper, !0)) : (dataView.setUint32(n + 8, t.sampleLower, !0), dataView.setUint32(n + 12, t.sampleUpper, !0));
  }
  const u = Rr.length + 68 + 3 * e.levels.length * 8,
    d = u + o.byteLength;
  let h = arrayBuffer.byteLength > 0 ? d + a.byteLength : 0;
  h % 8 && (h += 8 - h % 8);
  const p = [],
    f = new DataView(new ArrayBuffer(3 * e.levels.length * 8)),
    uint32Array = new Uint32Array(e.levels.length);
  let M = 0;
  0 === e.supercompressionScheme && (M = function (e) {
    const t = Math.max(e, 4),
      n = Math.min(e, 4);
    let r = t;
    for (; r % n !== 0;) r += t;
    return r;
  }(function (e) {
    return e.levels[0].levelData.byteLength / function (e) {
      let t = 1;
      const n = [e.pixelWidth, e.pixelHeight, e.pixelDepth],
        r = function (e) {
          const [t, n, r] = e.dataFormatDescriptor[0].texelBlockDimension;
          return [t + 1, n + 1, r + 1];
        }(e);
      for (let e = 0; e < 3; e++) if (n[e] > 0) {
        const i = Math.ceil(Math.floor(1 * n[e]) / r[e]);
        t *= Math.max(1, i);
      }
      return e.layerCount > 0 && (t *= e.layerCount), e.faceCount > 0 && (t *= e.faceCount), t;
    }(e);
  }(e)));
  let _ = (h || d + a.byteLength) + arrayBuffer.byteLength;
  for (let t = e.levels.length - 1; t >= 0; t--) {
    if (_ % M) {
      const e = Wr(_, M);
      p.push(new Uint8Array(e)), _ += e;
    }
    const n = e.levels[t];
    p.push(n.levelData), uint32Array[t] = _, _ += n.levelData.byteLength;
  }
  for (let t = 0; t < e.levels.length; t++) {
    const n = e.levels[t];
    f.setBigUint64(24 * t + 0, BigInt(uint32Array[t]), !0), f.setBigUint64(24 * t + 8, BigInt(n.levelData.byteLength), !0), f.setBigUint64(24 * t + 16, BigInt(n.uncompressedByteLength), !0);
  }
  const A = new ArrayBuffer(68),
    g = new DataView(A);
  return g.setUint32(0, e.vkFormat, !0), g.setUint32(4, e.typeSize, !0), g.setUint32(8, e.pixelWidth, !0), g.setUint32(12, e.pixelHeight, !0), g.setUint32(16, e.pixelDepth, !0), g.setUint32(20, e.layerCount, !0), g.setUint32(24, e.faceCount, !0), g.setUint32(28, e.levelCount, !0), g.setUint32(32, e.supercompressionScheme, !0), g.setUint32(36, u, !0), g.setUint32(40, o.byteLength, !0), g.setUint32(44, d, !0), g.setUint32(48, a.byteLength, !0), g.setBigUint64(52, BigInt(arrayBuffer.byteLength > 0 ? h : 0), !0), g.setBigUint64(60, BigInt(arrayBuffer.byteLength), !0), new Uint8Array(Yr([new Uint8Array(Rr).buffer, A, f.buffer, o, a, h > 0 ? new ArrayBuffer(h - (d + a.byteLength)) : new ArrayBuffer(0), arrayBuffer, ...p]));
}
export { KHR_DF_CHANNEL_RGBSDA_ALPHA };
export { KHR_DF_CHANNEL_RGBSDA_BLUE };
export { KHR_DF_CHANNEL_RGBSDA_DEPTH };
export { KHR_DF_CHANNEL_RGBSDA_GREEN };
export { KHR_DF_CHANNEL_RGBSDA_RED };
export { KHR_DF_CHANNEL_RGBSDA_STENCIL };
export { KHR_DF_FLAG_ALPHA_PREMULTIPLIED };
export { KHR_DF_FLAG_ALPHA_STRAIGHT };
export { KHR_DF_KHR_DESCRIPTORTYPE_BASICFORMAT };
export { KHR_DF_MODEL_ASTC };
export { KHR_DF_MODEL_ETC1 };
export { KHR_DF_MODEL_ETC1S };
export { KHR_DF_MODEL_ETC2 };
export { KHR_DF_MODEL_RGBSDA };
export { KHR_DF_MODEL_UASTC };
export { KHR_DF_MODEL_UNSPECIFIED };
export { KHR_DF_PRIMARIES_ACES };
export { KHR_DF_PRIMARIES_ACESCC };
export { KHR_DF_PRIMARIES_ADOBERGB };
export { KHR_DF_PRIMARIES_BT2020 };
export { KHR_DF_PRIMARIES_BT601_EBU };
export { KHR_DF_PRIMARIES_BT601_SMPTE };
export { KHR_DF_PRIMARIES_BT709 };
export { KHR_DF_PRIMARIES_CIEXYZ };
export { KHR_DF_PRIMARIES_DISPLAYP3 };
export { KHR_DF_PRIMARIES_NTSC1953 };
export { KHR_DF_PRIMARIES_PAL525 };
export { KHR_DF_PRIMARIES_UNSPECIFIED };
export { KHR_DF_SAMPLE_DATATYPE_EXPONENT };
export { KHR_DF_SAMPLE_DATATYPE_FLOAT };
export { KHR_DF_SAMPLE_DATATYPE_LINEAR };
export { KHR_DF_SAMPLE_DATATYPE_SIGNED };
export { KHR_DF_TRANSFER_ACESCC };
export { KHR_DF_TRANSFER_ACESCCT };
export { KHR_DF_TRANSFER_ADOBERGB };
export { KHR_DF_TRANSFER_BT1886 };
export { KHR_DF_TRANSFER_DCIP3 };
export { KHR_DF_TRANSFER_HLG_EOTF };
export { KHR_DF_TRANSFER_HLG_OETF };
export { KHR_DF_TRANSFER_ITU };
export { KHR_DF_TRANSFER_LINEAR };
export { KHR_DF_TRANSFER_NTSC };
export { KHR_DF_TRANSFER_PAL625_EOTF };
export { KHR_DF_TRANSFER_PAL_OETF };
export { KHR_DF_TRANSFER_PQ_EOTF };
export { KHR_DF_TRANSFER_PQ_OETF };
export { KHR_DF_TRANSFER_SLOG };
export { KHR_DF_TRANSFER_SLOG2 };
export { KHR_DF_TRANSFER_SRGB };
export { KHR_DF_TRANSFER_ST240 };
export { KHR_DF_TRANSFER_UNSPECIFIED };
export { KHR_DF_VENDORID_KHRONOS };
export { KHR_DF_VERSION };
export { KHR_SUPERCOMPRESSION_BASISLZ };
export { KHR_SUPERCOMPRESSION_NONE };
export { KHR_SUPERCOMPRESSION_ZLIB };
export { KHR_SUPERCOMPRESSION_ZSTD };
export { VK_FORMAT_A1R5G5B5_UNORM_PACK16 };
export { VK_FORMAT_A2B10G10R10_SINT_PACK32 };
export { VK_FORMAT_A2B10G10R10_SNORM_PACK32 };
export { VK_FORMAT_A2B10G10R10_UINT_PACK32 };
export { VK_FORMAT_A2B10G10R10_UNORM_PACK32 };
export { VK_FORMAT_A2R10G10B10_SINT_PACK32 };
export { VK_FORMAT_A2R10G10B10_SNORM_PACK32 };
export { VK_FORMAT_A2R10G10B10_UINT_PACK32 };
export { VK_FORMAT_A2R10G10B10_UNORM_PACK32 };
export { VK_FORMAT_A4B4G4R4_UNORM_PACK16_EXT };
export { VK_FORMAT_A4R4G4B4_UNORM_PACK16_EXT };
export { VK_FORMAT_ASTC_10x10_SFLOAT_BLOCK_EXT };
export { VK_FORMAT_ASTC_10x10_SRGB_BLOCK };
export { VK_FORMAT_ASTC_10x10_UNORM_BLOCK };
export { VK_FORMAT_ASTC_10x5_SFLOAT_BLOCK_EXT };
export { VK_FORMAT_ASTC_10x5_SRGB_BLOCK };
export { VK_FORMAT_ASTC_10x5_UNORM_BLOCK };
export { VK_FORMAT_ASTC_10x6_SFLOAT_BLOCK_EXT };
export { VK_FORMAT_ASTC_10x6_SRGB_BLOCK };
export { VK_FORMAT_ASTC_10x6_UNORM_BLOCK };
export { VK_FORMAT_ASTC_10x8_SFLOAT_BLOCK_EXT };
export { VK_FORMAT_ASTC_10x8_SRGB_BLOCK };
export { VK_FORMAT_ASTC_10x8_UNORM_BLOCK };
export { VK_FORMAT_ASTC_12x10_SFLOAT_BLOCK_EXT };
export { VK_FORMAT_ASTC_12x10_SRGB_BLOCK };
export { VK_FORMAT_ASTC_12x10_UNORM_BLOCK };
export { VK_FORMAT_ASTC_12x12_SFLOAT_BLOCK_EXT };
export { VK_FORMAT_ASTC_12x12_SRGB_BLOCK };
export { VK_FORMAT_ASTC_12x12_UNORM_BLOCK };
export { VK_FORMAT_ASTC_4x4_SFLOAT_BLOCK_EXT };
export { VK_FORMAT_ASTC_4x4_SRGB_BLOCK };
export { VK_FORMAT_ASTC_4x4_UNORM_BLOCK };
export { VK_FORMAT_ASTC_5x4_SFLOAT_BLOCK_EXT };
export { VK_FORMAT_ASTC_5x4_SRGB_BLOCK };
export { VK_FORMAT_ASTC_5x4_UNORM_BLOCK };
export { VK_FORMAT_ASTC_5x5_SFLOAT_BLOCK_EXT };
export { VK_FORMAT_ASTC_5x5_SRGB_BLOCK };
export { VK_FORMAT_ASTC_5x5_UNORM_BLOCK };
export { VK_FORMAT_ASTC_6x5_SFLOAT_BLOCK_EXT };
export { VK_FORMAT_ASTC_6x5_SRGB_BLOCK };
export { VK_FORMAT_ASTC_6x5_UNORM_BLOCK };
export { VK_FORMAT_ASTC_6x6_SFLOAT_BLOCK_EXT };
export { VK_FORMAT_ASTC_6x6_SRGB_BLOCK };
export { VK_FORMAT_ASTC_6x6_UNORM_BLOCK };
export { VK_FORMAT_ASTC_8x5_SFLOAT_BLOCK_EXT };
export { VK_FORMAT_ASTC_8x5_SRGB_BLOCK };
export { VK_FORMAT_ASTC_8x5_UNORM_BLOCK };
export { VK_FORMAT_ASTC_8x6_SFLOAT_BLOCK_EXT };
export { VK_FORMAT_ASTC_8x6_SRGB_BLOCK };
export { VK_FORMAT_ASTC_8x6_UNORM_BLOCK };
export { VK_FORMAT_ASTC_8x8_SFLOAT_BLOCK_EXT };
export { VK_FORMAT_ASTC_8x8_SRGB_BLOCK };
export { VK_FORMAT_ASTC_8x8_UNORM_BLOCK };
export { VK_FORMAT_B10G11R11_UFLOAT_PACK32 };
export { VK_FORMAT_B10X6G10X6R10X6G10X6_422_UNORM_4PACK16 };
export { VK_FORMAT_B12X4G12X4R12X4G12X4_422_UNORM_4PACK16 };
export { VK_FORMAT_B4G4R4A4_UNORM_PACK16 };
export { VK_FORMAT_B5G5R5A1_UNORM_PACK16 };
export { VK_FORMAT_B5G6R5_UNORM_PACK16 };
export { VK_FORMAT_B8G8R8A8_SINT };
export { VK_FORMAT_B8G8R8A8_SNORM };
export { VK_FORMAT_B8G8R8A8_SRGB };
export { VK_FORMAT_B8G8R8A8_UINT };
export { VK_FORMAT_B8G8R8A8_UNORM };
export { VK_FORMAT_B8G8R8_SINT };
export { VK_FORMAT_B8G8R8_SNORM };
export { VK_FORMAT_B8G8R8_SRGB };
export { VK_FORMAT_B8G8R8_UINT };
export { VK_FORMAT_B8G8R8_UNORM };
export { VK_FORMAT_BC1_RGBA_SRGB_BLOCK };
export { VK_FORMAT_BC1_RGBA_UNORM_BLOCK };
export { VK_FORMAT_BC1_RGB_SRGB_BLOCK };
export { VK_FORMAT_BC1_RGB_UNORM_BLOCK };
export { VK_FORMAT_BC2_SRGB_BLOCK };
export { VK_FORMAT_BC2_UNORM_BLOCK };
export { VK_FORMAT_BC3_SRGB_BLOCK };
export { VK_FORMAT_BC3_UNORM_BLOCK };
export { VK_FORMAT_BC4_SNORM_BLOCK };
export { VK_FORMAT_BC4_UNORM_BLOCK };
export { VK_FORMAT_BC5_SNORM_BLOCK };
export { VK_FORMAT_BC5_UNORM_BLOCK };
export { VK_FORMAT_BC6H_SFLOAT_BLOCK };
export { VK_FORMAT_BC6H_UFLOAT_BLOCK };
export { VK_FORMAT_BC7_SRGB_BLOCK };
export { VK_FORMAT_BC7_UNORM_BLOCK };
export { VK_FORMAT_D16_UNORM };
export { VK_FORMAT_D16_UNORM_S8_UINT };
export { VK_FORMAT_D24_UNORM_S8_UINT };
export { VK_FORMAT_D32_SFLOAT };
export { VK_FORMAT_D32_SFLOAT_S8_UINT };
export { VK_FORMAT_E5B9G9R9_UFLOAT_PACK32 };
export { VK_FORMAT_EAC_R11G11_SNORM_BLOCK };
export { VK_FORMAT_EAC_R11G11_UNORM_BLOCK };
export { VK_FORMAT_EAC_R11_SNORM_BLOCK };
export { VK_FORMAT_EAC_R11_UNORM_BLOCK };
export { VK_FORMAT_ETC2_R8G8B8A1_SRGB_BLOCK };
export { VK_FORMAT_ETC2_R8G8B8A1_UNORM_BLOCK };
export { VK_FORMAT_ETC2_R8G8B8A8_SRGB_BLOCK };
export { VK_FORMAT_ETC2_R8G8B8A8_UNORM_BLOCK };
export { VK_FORMAT_ETC2_R8G8B8_SRGB_BLOCK };
export { VK_FORMAT_ETC2_R8G8B8_UNORM_BLOCK };
export { VK_FORMAT_G10X6B10X6G10X6R10X6_422_UNORM_4PACK16 };
export { VK_FORMAT_G12X4B12X4G12X4R12X4_422_UNORM_4PACK16 };
export { VK_FORMAT_PVRTC1_2BPP_SRGB_BLOCK_IMG };
export { VK_FORMAT_PVRTC1_2BPP_UNORM_BLOCK_IMG };
export { VK_FORMAT_PVRTC1_4BPP_SRGB_BLOCK_IMG };
export { VK_FORMAT_PVRTC1_4BPP_UNORM_BLOCK_IMG };
export { VK_FORMAT_PVRTC2_2BPP_SRGB_BLOCK_IMG };
export { VK_FORMAT_PVRTC2_2BPP_UNORM_BLOCK_IMG };
export { VK_FORMAT_PVRTC2_4BPP_SRGB_BLOCK_IMG };
export { VK_FORMAT_PVRTC2_4BPP_UNORM_BLOCK_IMG };
export { VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16 };
export { VK_FORMAT_R10X6G10X6_UNORM_2PACK16 };
export { VK_FORMAT_R10X6_UNORM_PACK16 };
export { VK_FORMAT_R12X4G12X4B12X4A12X4_UNORM_4PACK16 };
export { VK_FORMAT_R12X4G12X4_UNORM_2PACK16 };
export { VK_FORMAT_R12X4_UNORM_PACK16 };
export { VK_FORMAT_R16G16B16A16_SFLOAT };
export { VK_FORMAT_R16G16B16A16_SINT };
export { VK_FORMAT_R16G16B16A16_SNORM };
export { VK_FORMAT_R16G16B16A16_UINT };
export { VK_FORMAT_R16G16B16A16_UNORM };
export { VK_FORMAT_R16G16B16_SFLOAT };
export { VK_FORMAT_R16G16B16_SINT };
export { VK_FORMAT_R16G16B16_SNORM };
export { VK_FORMAT_R16G16B16_UINT };
export { VK_FORMAT_R16G16B16_UNORM };
export { VK_FORMAT_R16G16_SFLOAT };
export { VK_FORMAT_R16G16_SINT };
export { VK_FORMAT_R16G16_SNORM };
export { VK_FORMAT_R16G16_UINT };
export { VK_FORMAT_R16G16_UNORM };
export { VK_FORMAT_R16_SFLOAT };
export { VK_FORMAT_R16_SINT };
export { VK_FORMAT_R16_SNORM };
export { VK_FORMAT_R16_UINT };
export { VK_FORMAT_R16_UNORM };
export { VK_FORMAT_R32G32B32A32_SFLOAT };
export { VK_FORMAT_R32G32B32A32_SINT };
export { VK_FORMAT_R32G32B32A32_UINT };
export { VK_FORMAT_R32G32B32_SFLOAT };
export { VK_FORMAT_R32G32B32_SINT };
export { VK_FORMAT_R32G32B32_UINT };
export { VK_FORMAT_R32G32_SFLOAT };
export { VK_FORMAT_R32G32_SINT };
export { VK_FORMAT_R32G32_UINT };
export { VK_FORMAT_R32_SFLOAT };
export { VK_FORMAT_R32_SINT };
export { VK_FORMAT_R32_UINT };
export { VK_FORMAT_R4G4B4A4_UNORM_PACK16 };
export { VK_FORMAT_R4G4_UNORM_PACK8 };
export { VK_FORMAT_R5G5B5A1_UNORM_PACK16 };
export { VK_FORMAT_R5G6B5_UNORM_PACK16 };
export { VK_FORMAT_R64G64B64A64_SFLOAT };
export { VK_FORMAT_R64G64B64A64_SINT };
export { VK_FORMAT_R64G64B64A64_UINT };
export { VK_FORMAT_R64G64B64_SFLOAT };
export { VK_FORMAT_R64G64B64_SINT };
export { VK_FORMAT_R64G64B64_UINT };
export { VK_FORMAT_R64G64_SFLOAT };
export { VK_FORMAT_R64G64_SINT };
export { VK_FORMAT_R64G64_UINT };
export { VK_FORMAT_R64_SFLOAT };
export { VK_FORMAT_R64_SINT };
export { VK_FORMAT_R64_UINT };
export { VK_FORMAT_R8G8B8A8_SINT };
export { VK_FORMAT_R8G8B8A8_SNORM };
export { VK_FORMAT_R8G8B8A8_SRGB };
export { VK_FORMAT_R8G8B8A8_UINT };
export { VK_FORMAT_R8G8B8A8_UNORM };
export { VK_FORMAT_R8G8B8_SINT };
export { VK_FORMAT_R8G8B8_SNORM };
export { VK_FORMAT_R8G8B8_SRGB };
export { VK_FORMAT_R8G8B8_UINT };
export { VK_FORMAT_R8G8B8_UNORM };
export { VK_FORMAT_R8G8_SINT };
export { VK_FORMAT_R8G8_SNORM };
export { VK_FORMAT_R8G8_SRGB };
export { VK_FORMAT_R8G8_UINT };
export { VK_FORMAT_R8G8_UNORM };
export { VK_FORMAT_R8_SINT };
export { VK_FORMAT_R8_SNORM };
export { VK_FORMAT_R8_SRGB };
export { VK_FORMAT_R8_UINT };
export { VK_FORMAT_R8_UNORM };
export { VK_FORMAT_S8_UINT };
export { VK_FORMAT_UNDEFINED };
export { VK_FORMAT_X8_D24_UNORM_PACK32 };
export { createDefaultContainer };
export { read };
export { write };
