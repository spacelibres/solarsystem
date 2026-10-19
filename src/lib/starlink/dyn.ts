import { elementsFromState, starlinkPosition, type StarlinkOrbit } from '../../solar/domain/starlink';
import { unixMillisecondsToEt } from '../../solar/domain/time';

/** Encode a Starlink orbit as a NASA Eyes dynamo v2 `pos` file. */
export function encodeStarlinkDyn(orbit: StarlinkOrbit, sampleCount = 192, stepSeconds = 30): ArrayBuffer {
  const elements = elementsFromState(orbit);
  if (!elements) throw new Error(`Starlink ${orbit.n} has no bound orbit`);
  const start = unixMillisecondsToEt(orbit.e * 1000) - 3600;
  const step = stepSeconds;
  const samples = Array.from({ length: sampleCount }, (_, index) => {
    const time = start + index * step;
    return { time, position: starlinkPosition(elements, time) };
  });
  const velocities = samples.map((sample, index) => {
    const before = samples[Math.max(0, index - 1)];
    const after = samples[Math.min(samples.length - 1, index + 1)];
    const dt = after.time - before.time;
    return {
      x: (after.position.x - before.position.x) / dt,
      y: (after.position.y - before.position.y) / dt,
      z: (after.position.z - before.position.z) / dt,
    };
  });
  const bytes = new ArrayBuffer(12 + sampleCount * 56);
  const view = new DataView(bytes);
  let offset = 0;
  view.setInt16(offset, 2, true); offset += 2;
  for (const byte of [0x70, 0x6f, 0x73, 0]) view.setUint8(offset++, byte);
  view.setUint8(offset++, 0);
  view.setUint8(offset++, 1);
  view.setInt32(offset, sampleCount, true); offset += 4;
  samples.forEach((sample, index) => {
    view.setFloat64(offset, sample.time, true); offset += 8;
    view.setFloat64(offset, sample.position.x, true); offset += 8;
    view.setFloat64(offset, sample.position.y, true); offset += 8;
    view.setFloat64(offset, sample.position.z, true); offset += 8;
    view.setFloat64(offset, velocities[index].x, true); offset += 8;
    view.setFloat64(offset, velocities[index].y, true); offset += 8;
    view.setFloat64(offset, velocities[index].z, true); offset += 8;
  });
  return bytes;
}
