/**
 * Parser for NASA Eyes "dynamo" (`.dyn`) ephemeris files.
 *
 * ## Format (reverse-engineered and validated against live assets)
 *
 * All scalars are little-endian. A file is:
 *
 *   i16    version              (1 or 2; live assets use 2)
 *   string name                 NUL-terminated: "orb" | "pos" | "lin" | "ori" | "quat"
 *   u8     numberOfDigits       (version 2 only — sub-file zero-padding)
 *   <point-type header>         type-specific
 *   u8     hasPoints            (1 = inline points; 0 = multi-segment index)
 *   i32    count                (inline count, OR segment count when hasPoints = 0)
 *   count × <point record>      inline points
 *
 * ### Point-type headers
 *   orb    : f64 gravitationalParameter1 (primary, e.g. Earth μ), f64 gravitationalParameter2 (central, e.g. Sun μ)
 *   others : empty
 *
 * ### Point record layout (bytes; all f64)
 *   orb    : time, semiMajorAxis, eccentricity, meanAngularMotion, meanAnomalyAtEpoch, qw, qx, qy, qz   → 9 × 8 = 72
 *   pos    : time, px, py, pz, vx, vy, vz                                                                → 7 × 8 = 56
 *   lin    : time, px, py, pz                                                                            → 4 × 8 = 32
 *   ori    : time, qw, qx, qy, qz, wx, wy, wz                                                            → 8 × 8 = 64
 *   quat   : time, qw, qx, qy, qz                                                                        → 5 × 8 = 40
 *
 * The `orb` stride of 72 bytes was confirmed by exact file-length accounting
 * across 10+ live assets (Earth, Mercury, Jupiter, Mars, Europa Clipper, Juice,
 * Lucy, Pioneer) and by physical validation of every record (unit quaternions,
 * eccentricity in [0,1), positive semi-major axis, monotonic time).
 *
 * The `pos`/`lin` strides follow the field counts in NASA's own classes; only
 * `orb` and `ori` have been checked against real files so far, and the parser
 * verifies the remaining byte count is an exact multiple of the stride before
 * trusting a file, so mismatches surface loudly instead of silently.
 */

import { Reader } from './reader';
import type { Quat, Vec3 } from './math';

export type PointType = 'orb' | 'pos' | 'lin' | 'ori' | 'quat';

export const POINT_STRIDE: Record<PointType, number> = {
  orb: 72,
  pos: 56,
  lin: 32,
  ori: 64,
  quat: 40,
};

export interface OrbPoint {
  kind: 'orb';
  time: number; // seconds since J2000 (TT), may be negative
  semiMajorAxis: number; // km
  eccentricity: number;
  meanAngularMotion: number; // rad/s
  meanAnomalyAtEpoch: number; // rad
  orientation: Quat; // orbital-plane → reference-frame rotation
}

export interface PosPoint {
  kind: 'pos';
  time: number;
  position: Vec3; // km
  velocity: Vec3; // km/s
}

export interface LinPoint {
  kind: 'lin';
  time: number;
  position: Vec3; // km
}

export interface OriPoint {
  kind: 'ori';
  time: number;
  orientation: Quat;
  angularVelocity: Vec3; // rad/s
}

export interface QuatPoint {
  kind: 'quat';
  time: number;
  orientation: Quat;
}

export type DynPoint = OrbPoint | PosPoint | LinPoint | OriPoint | QuatPoint;

export interface DynHeader {
  version: number;
  name: string;
  pointType: PointType;
  numberOfDigits: number;
  /** Only present for `orb` files. */
  gravitationalParameter1?: number;
  gravitationalParameter2?: number;
}

export interface DynSegment {
  /** Segment index used to build the `def_NNN.dyn` continuation URL. */
  index: number;
  /** Start time of the segment window (seconds since J2000). */
  startTime: number;
  /** End time; inferred from the next segment's start when the file omits it (v2). */
  endTime: number;
}

export interface DynFile {
  header: DynHeader;
  /** Inline points, present when the file carries its own samples. */
  points: DynPoint[];
  /**
   * When a file is an index (hasPoints = 0), the segments that must be fetched
   * individually as `<name>_<NNN>.dyn`. Empty for inline files.
   */
  segments: DynSegment[];
  /** Coverage [min, max] over inline points, if any. */
  interval: { min: number; max: number } | null;
}

export class DynParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DynParseError';
  }
}

const VALID_TYPES: PointType[] = ['orb', 'pos', 'lin', 'ori', 'quat'];

/**
 * Parse a complete inline `.dyn` buffer.
 *
 * Throws {@link DynParseError} on structurally invalid input. Index files
 * (hasPoints = 0) parse successfully and return their `segments`.
 */
export function parseDyn(data: ArrayBuffer | Uint8Array): DynFile {
  const reader = new Reader(data);

  const version = reader.readInt16();
  if (version !== 1 && version !== 2) {
    throw new DynParseError(`unsupported dynamo version ${version}`);
  }

  const name = reader.readString();
  if (!VALID_TYPES.includes(name as PointType)) {
    throw new DynParseError(`invalid dynamo point type "${name}"`);
  }
  const pointType = name as PointType;

  const numberOfDigits = version === 2 ? reader.readByte() : 0;

  const header: DynHeader = { version, name, pointType, numberOfDigits };

  if (pointType === 'orb') {
    header.gravitationalParameter1 = reader.readFloat64();
    header.gravitationalParameter2 = reader.readFloat64();
  }

  const hasPoints = reader.readByte() === 1;

  if (!hasPoints) {
    const segmentCount = reader.readInt32();
    const segments: DynSegment[] = [];
    for (let i = 0; i < segmentCount; i++) {
      const startTime = reader.readFloat64();
      // Version 1 stores an explicit end per segment; version 2 only stores the
      // start and the last segment has no successor to bound it.
      const endTime = version === 1 ? reader.readFloat64() : Number.POSITIVE_INFINITY;
      segments.push({ index: i, startTime, endTime });
    }
    // Version 2 closes each window with the next segment's start time.
    if (version === 2) {
      for (let i = 0; i < segments.length - 1; i++) {
        segments[i].endTime = segments[i + 1].startTime;
      }
    }
    return { header, points: [], segments, interval: null };
  }

  const count = reader.readInt32();
  if (count < 0) {
    throw new DynParseError(`negative point count ${count}`);
  }

  const stride = POINT_STRIDE[pointType];
  if (reader.remaining !== count * stride) {
    throw new DynParseError(
      `point block size mismatch: expected ${count * stride} bytes for ` +
        `${count} × ${pointType} (stride ${stride}), found ${reader.remaining}`,
    );
  }

  const points: DynPoint[] = new Array(count);
  for (let i = 0; i < count; i++) {
    points[i] = readPoint(reader, pointType);
  }

  const interval =
    count > 0 ? { min: points[0].time, max: points[count - 1].time } : null;

  return { header, points, segments: [], interval };
}

function readPoint(reader: Reader, type: PointType): DynPoint {
  const time = reader.readFloat64();
  switch (type) {
    case 'orb':
      return {
        kind: 'orb',
        time,
        semiMajorAxis: reader.readFloat64(),
        eccentricity: reader.readFloat64(),
        meanAngularMotion: reader.readFloat64(),
        meanAnomalyAtEpoch: reader.readFloat64(),
        // NASA reads this quaternion with `Quaternion.set(w, x, y, z)`, so the
        // file order is W-first. Reading it as (x,y,z,w) rotates every orbit
        // about the wrong axis (Earth came out at -19.5° ecliptic latitude
        // instead of ~0°).
        orientation: readQuatWxyz(reader),
      };
    case 'pos':
      return {
        kind: 'pos',
        time,
        position: vec3From(reader),
        velocity: vec3From(reader),
      };
    case 'lin':
      return { kind: 'lin', time, position: vec3From(reader) };
    case 'ori':
      return {
        kind: 'ori',
        time,
        orientation: readQuatWxyz(reader),
        angularVelocity: vec3From(reader),
      };
    case 'quat':
      return { kind: 'quat', time, orientation: readQuatWxyz(reader) };
  }
}

const vec3From = (r: Reader): Vec3 => ({
  x: r.readFloat64(),
  y: r.readFloat64(),
  z: r.readFloat64(),
});

/**
 * Read a quaternion stored in NASA's `(w, x, y, z)` order.
 *
 * NASA's `Quaternion.set(w, x, y, z)` is used by `OrbPoint.load`, `OriPoint`
 * and `QuatPoint`, so all quaternions in `.dyn` files are W-first.
 */
const readQuatWxyz = (r: Reader): Quat => {
  const w = r.readFloat64();
  const x = r.readFloat64();
  const y = r.readFloat64();
  const z = r.readFloat64();
  return { x, y, z, w };
};

/**
 * Parse a dynamo *segment* file (`<kind>/<NNN>.dyn`).
 *
 * Segments carry no header: the index file already supplied the point type,
 * version and gravity parameters, so these files are just
 *
 *   u8  hasPoints (always 1)
 *   i32 count
 *   count × <point record>
 *
 * Verified against `ganymede/jupiter/orb/122.dyn`: byte 0 = 1, count = 23, and
 * 5 + 23 × 72 equals the 1661-byte file exactly.
 */
export function parseDynSegment(
  data: ArrayBuffer | Uint8Array,
  type: PointType,
): DynPoint[] {
  const reader = new Reader(data);
  const hasPoints = reader.readByte() === 1;
  if (!hasPoints) {
    throw new DynParseError('segment file unexpectedly contains an index');
  }
  const count = reader.readInt32();
  if (count < 0) throw new DynParseError(`negative point count ${count}`);

  const stride = POINT_STRIDE[type];
  if (reader.remaining !== count * stride) {
    throw new DynParseError(
      `segment size mismatch: expected ${count * stride} bytes for ` +
        `${count} × ${type} (stride ${stride}), found ${reader.remaining}`,
    );
  }

  const points: DynPoint[] = new Array(count);
  for (let i = 0; i < count; i++) points[i] = readPoint(reader, type);
  return points;
}
