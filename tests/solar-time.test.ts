import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { describe, expect, it } from 'vitest';

import { etToUnixMilliseconds, SimulationClock, unixMillisecondsToEt } from '../src/solar/domain/time';

const sourceText = readFileSync(new URL('../eyes/src/engine/core/TimeUtils.js', import.meta.url), 'utf8');
const sourceTime = runInNewContext(`${sourceText.replace('export { TimeUtils };', '')}\nTimeUtils;`) as {
  unixToEt(seconds: number): number;
  etToUnix(seconds: number): number;
  leapSeconds: number[];
};
const invalid = [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];
const unix2026 = Date.parse('2026-01-01T00:00:00Z');

describe('source-compatible ET and Unix milliseconds', () => {
  it('maps the accepted UTC epoch to the exact source ET convention', () => {
    expect(unixMillisecondsToEt(unix2026)).toBeCloseTo(820497669.184, 6);
  });

  it('matches the recovered source across every leap boundary in both directions', () => {
    expect(sourceTime.leapSeconds).toHaveLength(27);
    for (const lastSecond of sourceTime.leapSeconds) {
      const unixBoundary = (lastSecond + 1) * 1000;
      for (const delta of [-1001, -1000, -1, 0, 1, 1000, 1001]) {
        const milliseconds = unixBoundary + delta;
        const timeEt = unixMillisecondsToEt(milliseconds);
        expect(timeEt).toBe(sourceTime.unixToEt(milliseconds / 1000));
        expect(etToUnixMilliseconds(timeEt)).toBe(sourceTime.etToUnix(timeEt) * 1000);
        expect(Math.abs(etToUnixMilliseconds(timeEt) - milliseconds)).toBeLessThan(0.001);
      }
    }
  });

  it('round-trips ordinary fractional, pre-Unix, J2000 and future timestamps', () => {
    for (const milliseconds of [-2208988800000, -1.25, 0, 946728000000, unix2026 + 123.5, 4102444800000]) {
      expect(Math.abs(etToUnixMilliseconds(unixMillisecondsToEt(milliseconds)) - milliseconds)).toBeLessThan(0.001);
    }
  });

  it('collapses the unrepresentable leap ET second onto the prior Unix second', () => {
    const boundary = Date.parse('2017-01-01T00:00:00Z');
    const afterLeap = unixMillisecondsToEt(boundary);
    const beforeLeap = unixMillisecondsToEt(boundary - 1000);
    expect(afterLeap - beforeLeap).toBe(2);
    expect(etToUnixMilliseconds(afterLeap - 0.5)).toBeCloseTo(boundary - 500, 3);
    expect(unixMillisecondsToEt(etToUnixMilliseconds(afterLeap - 0.5))).toBeCloseTo(afterLeap - 1.5, 6);
  });

  it.each(invalid)('rejects nonfinite conversion input %s', (value) => {
    expect(() => unixMillisecondsToEt(value)).toThrow(RangeError);
    expect(() => etToUnixMilliseconds(value)).toThrow(RangeError);
  });

  it('rejects a conversion result that overflows milliseconds', () => {
    expect(() => etToUnixMilliseconds(Number.MAX_VALUE)).toThrow(RangeError);
  });
});

describe('SimulationClock', () => {
  it('starts paused with a detached readonly snapshot', () => {
    const clock = new SimulationClock(100);
    const snapshot = clock.snapshot();
    expect(snapshot).toEqual({ timeEt: 100, rate: 1, mode: 'paused' });
    expect(clock.snapshot()).not.toBe(snapshot);
    // API 外的调用者即使绕过 readonly，也不能修改内部状态。
    const mutable = snapshot as { timeEt: number; rate: number; mode: string };
    mutable.timeEt = 900;
    mutable.rate = 100;
    mutable.mode = 'live';
    expect(clock.snapshot()).toEqual({ timeEt: 100, rate: 1, mode: 'paused' });
    expect(clock.advance(20).timeEt).toBe(100);
  });

  it('plays forwards at default rate and supports zero and negative rates', () => {
    const clock = new SimulationClock(100);
    clock.play();
    expect(clock.advance(3)).toEqual({ timeEt: 103, rate: 1, mode: 'playback' });
    clock.play(0);
    expect(clock.advance(3).timeEt).toBe(103);
    clock.play(-2);
    expect(clock.advance(3)).toEqual({ timeEt: 97, rate: -2, mode: 'playback' });
  });

  it('pause preserves the current time and playback rate', () => {
    const clock = new SimulationClock(100);
    clock.play(-2);
    clock.advance(3);
    clock.pause();
    expect(clock.advance(5)).toEqual({ timeEt: 94, rate: -2, mode: 'paused' });
  });

  it('seek replaces time in paused and playback modes', () => {
    const clock = new SimulationClock(100);
    clock.seek(200);
    expect(clock.snapshot()).toEqual({ timeEt: 200, rate: 1, mode: 'paused' });
    clock.play(4);
    clock.seek(-50);
    expect(clock.advance(2)).toEqual({ timeEt: -42, rate: 4, mode: 'playback' });
  });

  it('live follows only explicit wall-clock samples, including backwards changes', () => {
    const clock = new SimulationClock(100);
    clock.play(-2);
    clock.live(unix2026);
    expect(clock.snapshot()).toEqual({ timeEt: unixMillisecondsToEt(unix2026), rate: 1, mode: 'live' });
    expect(clock.advance(60, unix2026 + 1234).timeEt).toBe(unixMillisecondsToEt(unix2026 + 1234));
    expect(clock.advance(1, unix2026 - 1000).timeEt).toBe(unixMillisecondsToEt(unix2026 - 1000));
    const before = clock.snapshot();
    expect(() => clock.advance(1)).toThrow(/Unix/i);
    expect(clock.snapshot()).toEqual(before);
  });

  it('seek exits live into paused and play or pause explicitly leave live', () => {
    const clock = new SimulationClock(100);
    clock.live(unix2026);
    clock.seek(400);
    expect(clock.advance(10)).toEqual({ timeEt: 400, rate: 1, mode: 'paused' });
    clock.live(unix2026);
    clock.play(2);
    expect(clock.advance(10).timeEt).toBe(unixMillisecondsToEt(unix2026) + 20);
    clock.live(unix2026);
    clock.pause();
    expect(clock.advance(10).mode).toBe('paused');
  });

  it.each(invalid)('rejects nonfinite constructor and commands without mutation: %s', (value) => {
    expect(() => new SimulationClock(value)).toThrow(RangeError);
    const clock = new SimulationClock(100);
    clock.play(-3);
    const before = clock.snapshot();
    for (const command of [
      () => clock.seek(value),
      () => clock.play(value),
      () => clock.live(value),
      () => clock.advance(value),
      () => clock.advance(1, value),
    ]) {
      expect(command).toThrow(RangeError);
      expect(clock.snapshot()).toEqual(before);
    }
    clock.live(unix2026);
    const liveBefore = clock.snapshot();
    expect(() => clock.advance(1, value)).toThrow(RangeError);
    expect(clock.snapshot()).toEqual(liveBefore);
  });

  it('rejects negative real elapsed time in every mode without mutation', () => {
    const clock = new SimulationClock(100);
    for (const enter of [() => clock.pause(), () => clock.play(), () => clock.live(unix2026)]) {
      enter();
      const before = clock.snapshot();
      expect(() => clock.advance(-1, unix2026)).toThrow(RangeError);
      expect(clock.snapshot()).toEqual(before);
    }
  });

  it('rejects playback overflow without corrupting state', () => {
    const clock = new SimulationClock(Number.MAX_VALUE);
    clock.play(Number.MAX_VALUE);
    const before = clock.snapshot();
    expect(() => clock.advance(2)).toThrow(RangeError);
    expect(clock.snapshot()).toEqual(before);
  });
});
