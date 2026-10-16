export type ClockMode = 'paused' | 'playback' | 'live';

export interface ClockSnapshot {
  readonly timeEt: number;
  readonly rate: number;
  readonly mode: ClockMode;
}

const ET_UNIX_BASE_SECONDS = 946727957.816;

// 与 Eyes TimeUtils 的历史表一致；各值为闰秒之后的 UTC 午夜 Unix 秒。
// 固定表保证重放不随运行机器或外部时间服务而变化。
const LEAP_TRANSITIONS_UNIX_SECONDS = [
  78796800, // 1972-07-01
  94694400, // 1973-01-01
  126230400, // 1974-01-01
  157766400, // 1975-01-01
  189302400, // 1976-01-01
  220924800, // 1977-01-01
  252460800, // 1978-01-01
  283996800, // 1979-01-01
  315532800, // 1980-01-01
  362793600, // 1981-07-01
  394329600, // 1982-07-01
  425865600, // 1983-07-01
  489024000, // 1985-07-01
  567993600, // 1988-01-01
  631152000, // 1990-01-01
  662688000, // 1991-01-01
  709948800, // 1992-07-01
  741484800, // 1993-07-01
  773020800, // 1994-07-01
  820454400, // 1996-01-01
  867715200, // 1997-07-01
  915148800, // 1999-01-01
  1136073600, // 2006-01-01
  1230768000, // 2009-01-01
  1341100800, // 2012-07-01
  1435708800, // 2015-07-01
  1483228800, // 2017-01-01
] as const;

function finite(value: number, name: string): number {
  if (!Number.isFinite(value)) throw new RangeError(`${name} must be finite`);
  return value;
}

export function unixMillisecondsToEt(milliseconds: number): number {
  const seconds = finite(milliseconds, 'Unix milliseconds') / 1000;
  let leapAdjustment = 0;
  for (const transition of LEAP_TRANSITIONS_UNIX_SECONDS) {
    if (seconds >= transition) leapAdjustment += 1;
  }
  return finite(seconds - ET_UNIX_BASE_SECONDS + leapAdjustment, 'ET result');
}

/** Unix 无 second=60；按源约定把闰秒 ET 区间折叠到前一个 Unix 秒，因而该区间不能双向往返。 */
export function etToUnixMilliseconds(timeEt: number): number {
  finite(timeEt, 'ET seconds');
  let leapAdjustment = 0;
  for (const transition of LEAP_TRANSITIONS_UNIX_SECONDS) {
    if (timeEt + ET_UNIX_BASE_SECONDS + leapAdjustment >= transition) leapAdjustment -= 1;
  }
  return finite((timeEt + ET_UNIX_BASE_SECONDS + leapAdjustment) * 1000, 'Unix milliseconds result');
}

export class SimulationClock {
  private timeEt: number;
  private rate = 1;
  private mode: ClockMode = 'paused';

  constructor(timeEt: number) {
    this.timeEt = finite(timeEt, 'ET seconds');
  }

  snapshot(): ClockSnapshot {
    return { timeEt: this.timeEt, rate: this.rate, mode: this.mode };
  }

  seek(timeEt: number): void {
    this.timeEt = finite(timeEt, 'ET seconds');
    if (this.mode === 'live') this.mode = 'paused';
  }

  play(rate = 1): void {
    this.rate = finite(rate, 'Playback rate');
    this.mode = 'playback';
  }

  pause(): void {
    this.mode = 'paused';
  }

  live(unixMilliseconds: number): void {
    this.timeEt = unixMillisecondsToEt(unixMilliseconds);
    this.rate = 1;
    this.mode = 'live';
  }

  advance(realSeconds: number, unixMilliseconds?: number): ClockSnapshot {
    finite(realSeconds, 'Real elapsed seconds');
    if (realSeconds < 0) throw new RangeError('Real elapsed seconds must be nonnegative');
    if (unixMilliseconds !== undefined) finite(unixMilliseconds, 'Unix milliseconds');

    let nextTimeEt = this.timeEt;
    if (this.mode === 'live') {
      // 不隐式读取系统时间，才能重放同一输入并保证一帧只有一个时间样本。
      if (unixMilliseconds === undefined) throw new RangeError('Live mode requires Unix milliseconds');
      nextTimeEt = unixMillisecondsToEt(unixMilliseconds);
    } else if (this.mode === 'playback') {
      nextTimeEt = finite(this.timeEt + realSeconds * this.rate, 'Playback ET result');
    }
    this.timeEt = nextTimeEt;
    return this.snapshot();
  }
}
