import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { parseDyn, parseDynSegment } from '../src/lib/dynamo/parse';
import { quatLength, rotateByQuat } from '../src/lib/dynamo/math';
import { nearestPoint, orbPositionAt, solveEccentricAnomaly } from '../src/lib/dynamo/orbit';
import type { OrbPoint } from '../src/lib/dynamo/parse';

const fixture = (name: string) =>
  parseDyn(new Uint8Array(readFileSync(join(__dirname, 'fixtures', name))));

describe('parseDyn header', () => {
  it('reads Earth´s heliocentric orbit header', () => {
    const file = fixture('earth-sun-orb.dyn');
    expect(file.header.version).toBe(2);
    expect(file.header.pointType).toBe('orb');
    expect(file.header.numberOfDigits).toBe(4);
    // Earth μ and Sun μ, the exact values NASA ships.
    expect(file.header.gravitationalParameter1).toBeCloseTo(398600.4355070226, 6);
    expect(file.header.gravitationalParameter2).toBeCloseTo(132712440041.27939, 3);
  });

  it('reads an orientation-only file with no gravity header', () => {
    const file = fixture('earth-ori.dyn');
    expect(file.header.pointType).toBe('ori');
    expect(file.header.gravitationalParameter1).toBeUndefined();
    expect(file.points).toHaveLength(3);
    expect(file.points[0].kind).toBe('ori');
  });
});

describe('parseDyn point blocks', () => {
  it('consumes the Earth orbit file exactly (429 × 72 bytes)', () => {
    const file = fixture('earth-sun-orb.dyn');
    expect(file.points).toHaveLength(429);
    expect(file.interval).not.toBeNull();
    // ~±100 years around J2000.
    expect(file.interval!.min).toBeLessThan(-3.1e9);
    expect(file.interval!.max).toBeGreaterThan(3.1e9);
  });

  it('produces physically valid elements for every Earth sample', () => {
    const file = fixture('earth-sun-orb.dyn');
    const pts = file.points as OrbPoint[];
    for (const p of pts) {
      expect(p.semiMajorAxis).toBeGreaterThan(1.4e8); // ~1 AU in km
      expect(p.semiMajorAxis).toBeLessThan(1.6e8);
      expect(p.eccentricity).toBeGreaterThanOrEqual(0);
      expect(p.eccentricity).toBeLessThan(0.1);
      expect(p.meanAngularMotion).toBeGreaterThan(0);
      expect(quatLength(p.orientation)).toBeCloseTo(1, 6);
    }
  });

  it('keeps sample times strictly increasing', () => {
    const file = fixture('earth-sun-orb.dyn');
    for (let i = 1; i < file.points.length; i++) {
      expect(file.points[i].time).toBeGreaterThan(file.points[i - 1].time);
    }
  });

  it('parses Mercury and Jupiter with the same stride', () => {
    expect(fixture('mercury-sun-orb.dyn').points).toHaveLength(37);
    expect(fixture('jupiter-sun-orb.dyn').points).toHaveLength(35);
    const jupiter = fixture('jupiter-sun-orb.dyn');
    // Jupiter μ, sanity-checking the gravity header per file.
    expect(jupiter.header.gravitationalParameter1).toBeGreaterThan(1.2e8);
    expect(jupiter.header.gravitationalParameter1).toBeLessThan(1.3e8);
  });

  it('rejects a truncated point block instead of reading garbage', () => {
    const raw = new Uint8Array(readFileSync(join(__dirname, 'fixtures', 'mercury-sun-orb.dyn')));
    // Drop 8 bytes: the count still claims 37 points, so the size check must fail.
    expect(() => parseDyn(raw.slice(0, raw.length - 8))).toThrow(/size mismatch/);
  });

  it('rejects a bogus point type', () => {
    const bad = new Uint8Array([2, 0, 0x78, 0x78, 0x78, 0, 0, 0, 0, 0, 0]);
    expect(() => parseDyn(bad)).toThrow(/invalid dynamo point type/);
  });
});

describe('parseDynSegment', () => {
  it('reads a header-less segment (no version, no gravity block)', () => {
    // Build a segment by hand: hasPoints=1, count=2, then two orb records.
    const count = 2;
    const buf = new ArrayBuffer(5 + count * 72);
    const dv = new DataView(buf);
    dv.setUint8(0, 1);
    dv.setInt32(1, count, true);
    let o = 5;
    const put = (v: number) => { dv.setFloat64(o, v, true); o += 8; };
    for (let i = 0; i < count; i++) {
      put(100 + i); // time
      put(1.5e8); // a
      put(0.017); // e
      put(1.99e-7); // n
      put(0.1 * i); // M0
      put(0); put(0); put(0); put(1); // quaternion
    }
    const pts = parseDynSegment(new Uint8Array(buf), 'orb');
    expect(pts).toHaveLength(count);
    expect(pts[0].kind).toBe('orb');
    expect(pts[1].time).toBe(101);
  });

  it('rejects a segment whose size does not match its count', () => {
    const buf = new ArrayBuffer(5 + 72 * 2 - 8);
    const dv = new DataView(buf);
    dv.setUint8(0, 1);
    dv.setInt32(1, 2, true);
    expect(() => parseDynSegment(new Uint8Array(buf), 'orb')).toThrow(/size mismatch/);
  });
});

describe('orbit geometry', () => {
  it('solves Kepler´s equation for a circular orbit', () => {
    // e = 0 ⇒ E = M exactly.
    const M = 1.234;
    expect(solveEccentricAnomaly(M, 0)).toBeCloseTo(M, 9);
  });

  it('places Earth at roughly one AU for a mid-range epoch', () => {
    const AU_KM = 149_597_870.7;
    const pts = fixture('earth-sun-orb.dyn').points as OrbPoint[];
    // Pick the sample nearest J2000 and evaluate at its own epoch.
    const p = nearestPoint(pts, 0)!;
    const r = orbPositionAt(p, p.time);
    const distance = Math.hypot(r.x, r.y, r.z);
    expect(distance / AU_KM).toBeGreaterThan(0.97);
    expect(distance / AU_KM).toBeLessThan(1.03);
  });

  it('rotates by a unit quaternion without changing length', () => {
    const q = { x: 0.1273131201926585, y: -0.1584199438136041, z: 0.7631240006295859, w: 0.6134625094429162 };
    const v = { x: 3, y: -4, z: 12 };
    const out = rotateByQuat(v, q);
    expect(Math.hypot(out.x, out.y, out.z)).toBeCloseTo(13, 9);
  });

  it('places each planet near its true ecliptic latitude', () => {
    // Direction matters as much as distance. Reading the orientation quaternion
    // with the wrong component order keeps |r| correct, so a length-only check
    // passes while every orbit tilts about the wrong axis.
    //
    // The `.dyn` orientation maps the perifocal plane into J2000 *equatorial*
    // coordinates, so the raw result must be rotated by the inverse of NASA's
    // `eclipJ2000ToJ2000Rotation` before its latitude is the ecliptic one.
    const q = {
      w: 0.9791532214288992,
      x: 0.2031230389823101,
      y: 0,
      z: 0,
    };
    const toEcliptic = (v: { x: number; y: number; z: number }) =>
      rotateByQuat(v, { w: q.w, x: -q.x, y: -q.y, z: -q.z });

    // Planets orbit within a few degrees of the ecliptic; the limit is each
    // body's orbital inclination plus a small margin.
    const INCLINATION_DEG: Record<string, number> = {
      'earth-sun-orb.dyn': 0.1,
      'mercury-sun-orb.dyn': 7.005,
      'jupiter-sun-orb.dyn': 1.303,
    };

    for (const [file, incl] of Object.entries(INCLINATION_DEG)) {
      const pts = fixture(file).points as OrbPoint[];
      for (const idx of [0, Math.floor(pts.length / 2), pts.length - 1]) {
        const p = pts[idx];
        const r = toEcliptic(orbPositionAt(p, p.time));
        const len = Math.hypot(r.x, r.y, r.z);
        const latDeg = (Math.asin(r.z / len) * 180) / Math.PI;
        expect(Math.abs(latDeg)).toBeLessThan(incl + 1.0);
      }
    }
  });
});
