import { describe, expect, it } from 'vitest';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { readIndexInfo, segmentUrls } = require('../tools/lib/segments.cjs') as {
  readIndexInfo: (buf: Buffer) => {
    name: string;
    digits: number;
    hasPoints: number;
    count: number;
  };
  segmentUrls: (controller: string, count: number, digits: number) => string[];
};

/**
 * The dynamo index count is easy to get wrong by one, and getting it wrong is
 * not a silent mistake: the extra URL 403s. Across a full mirror that produced
 * 674 phantom requests to NASA, every one of them a permanent "failure".
 *
 * The numbers here are the measured values from real assets, not assumptions.
 */
function indexHeader(version: number, name: string, digits: number, count: number): Buffer {
  const bytes: number[] = [];
  const i16 = (v: number) => bytes.push(v & 0xff, (v >> 8) & 0xff);
  const i32 = (v: number) => bytes.push(v & 0xff, (v >> 8) & 0xff, (v >> 16) & 0xff, (v >> 24) & 0xff);
  const str = (s: string) => {
    for (const ch of s) bytes.push(ch.charCodeAt(0));
    bytes.push(0);
  };

  i16(version);
  str(name);
  if (version === 2) bytes.push(digits);
  // `orb` controllers carry two doubles between the name and hasPoints.
  if (name === 'orb') for (let i = 0; i < 16; i++) bytes.push(0);
  bytes.push(0); // hasPoints = 0 means "has segments"
  i32(count);
  return Buffer.from(bytes);
}

describe('dynamo index header', () => {
  it('reads name, digits and segment count', () => {
    const info = readIndexInfo(indexHeader(2, 'orb', 3, 386));
    expect(info).toEqual({ name: 'orb', digits: 3, hasPoints: 0, count: 386 });
  });

  it('reads a non-orb controller, which has no double pair', () => {
    const info = readIndexInfo(indexHeader(2, 'ori', 3, 12));
    expect(info.count).toBe(12);
    expect(info.digits).toBe(3);
  });
});

describe('segment enumeration', () => {
  it('stops one short of the header count', () => {
    // moon/earth/orb: count 386, real files 000–384.
    const urls = segmentUrls('moon/earth/orb', 386, 3);
    expect(urls).toHaveLength(385);
    expect(urls.at(-1)).toBe(
      'https://eyes.nasa.gov/assets/dynamic/dynamo/moon/earth/orb/384.dyn',
    );
  });

  it('never emits the index that NASA answers with 403', () => {
    const urls = segmentUrls('moon/earth/orb', 386, 3);
    expect(urls.some((u) => u.endsWith('/385.dyn'))).toBe(false);
  });

  it('matches the second measured controller', () => {
    // amalthea/jupiter/orb: count 220, real files 000–218.
    const urls = segmentUrls('amalthea/jupiter/orb', 220, 3);
    expect(urls).toHaveLength(219);
    expect(urls.at(-1)?.endsWith('/218.dyn')).toBe(true);
  });

  it('zero-pads to the declared digit width', () => {
    const urls = segmentUrls('x/y/orb', 5, 4);
    expect(urls[0].endsWith('/0000.dyn')).toBe(true);
    expect(urls.at(-1)?.endsWith('/0003.dyn')).toBe(true);
  });

  it('falls back to three digits when the header declares none', () => {
    const urls = segmentUrls('x/y/orb', 3, 0);
    expect(urls[0].endsWith('/000.dyn')).toBe(true);
  });
});
