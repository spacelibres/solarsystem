import { etToUnixMilliseconds, unixMillisecondsToEt } from '../domain/time';

export function etDateInput(timeEt: number): string {
  try { return new Date(etToUnixMilliseconds(timeEt)).toISOString().slice(0, 19); }
  catch { return ''; }
}

export function formatEtUtc(timeEt: number): string {
  const input = etDateInput(timeEt);
  return input ? `${input.replace('T', ' ')} UTC` : '超出日期显示范围';
}

/** datetime-local 是无时区字段；此输入面板明确按 UTC 解释，拒绝 Date 的溢出归一化。 */
export function utcInputToEt(value: string): number {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?$/.test(value)) throw new Error('请输入完整 UTC 日期和时间');
  const milliseconds = Date.parse(`${value}Z`);
  const expected = value.length === 16 ? `${value}:00` : value;
  if (!Number.isFinite(milliseconds) || new Date(milliseconds).toISOString().slice(0, 19) !== expected) throw new Error('UTC 日期或时间无效');
  return unixMillisecondsToEt(milliseconds);
}
