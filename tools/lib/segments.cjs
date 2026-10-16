/**
 * Shared logic for expanding dynamo index files into segment URLs.
 *
 * Kept separate from `expand-segments.cjs` so it can be tested without the
 * script's file-system side effects. Both the tool and its tests import this.
 */

'use strict';

const BASE = 'https://eyes.nasa.gov/assets/dynamic/dynamo';

/**
 * Read the header of a dynamo index (`def.dyn`) file.
 *
 * Layout, as observed in real assets: `int16 version`, `cstring name`, then for
 * version 2 a `uint8 digits`, then for `orb` controllers two doubles, then
 * `uint8 hasPoints` and `int32 count`.
 *
 * @param {Buffer} buf
 * @returns {{ name: string, digits: number, hasPoints: number, count: number }}
 */
function readIndexInfo(buf) {
  let o = 0;
  const i16 = () => {
    const v = buf.readInt16LE(o);
    o += 2;
    return v;
  };
  const u8 = () => buf.readUInt8(o++);
  const i32 = () => {
    const v = buf.readInt32LE(o);
    o += 4;
    return v;
  };
  const f64 = () => {
    o += 8;
  };
  const str = () => {
    let s = '';
    for (;;) {
      const c = u8();
      if (!c) break;
      s += String.fromCharCode(c);
    }
    return s;
  };

  const version = i16();
  const name = str();
  const digits = version === 2 ? u8() : 0;
  if (name === 'orb') {
    f64();
    f64();
  }
  const hasPoints = u8();
  const count = i32();
  return { name, digits, hasPoints, count };
}

/**
 * Enumerate the segment URLs of a controller whose index reports `count`.
 *
 * The header count is two more than the highest index on disk, so the valid
 * windows are `0 … count-2`. Measured against real assets:
 *
 *   moon/earth/orb         count 386, files 000–384 (385 of them)
 *   amalthea/jupiter/orb   count 220, files 000–218 (219 of them)
 *
 * and `moon/earth/orb/385.dyn` / `amalthea/jupiter/orb/219.dyn` both return 403
 * from NASA, while the last real file in each returns 200. Generating
 * `0 … count-1` therefore invented one URL per controller — 674 phantom
 * requests in a full mirror, all of which failed.
 *
 * @param {string} controller e.g. `moon/earth/orb`
 * @param {number} count value from the index header
 * @param {number} digits zero-padding width
 * @returns {string[]}
 */
function segmentUrls(controller, count, digits) {
  const urls = [];
  const width = digits || 3;
  for (let i = 0; i < count - 1; i++) {
    urls.push(`${BASE}/${controller}/${String(i).padStart(width, '0')}.dyn`);
  }
  return urls;
}

module.exports = { readIndexInfo, segmentUrls };
