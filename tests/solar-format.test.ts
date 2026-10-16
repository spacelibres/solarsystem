import { describe, expect, it } from 'vitest';
import { etDateInput, formatEtUtc, utcInputToEt } from '../src/solar/ui/format';

describe('explicit UTC explorer controls', () => {
  it('round trips a timezone-free date input as UTC, with the source ET offset', () => {
    const time = utcInputToEt('2026-01-01T00:00');
    expect(time).toBeCloseTo(820497669.184, 5);
    expect(etDateInput(time)).toBe('2026-01-01T00:00:00');
    expect(formatEtUtc(time)).toBe('2026-01-01 00:00:00 UTC');
  });
  it('rejects silently normalized invalid calendar dates and timezone input', () => {
    for (const invalid of ['', '2026-02-30T00:00', '2026-01-01', '2026-01-01T00:00Z', '2026-01-01T25:00']) expect(() => utcInputToEt(invalid)).toThrow();
  });
  it('keeps extreme finite domain times from crashing the date display', () => {
    expect(formatEtUtc(1e100)).toBe('超出日期显示范围');
    expect(etDateInput(1e100)).toBe('');
  });
});
