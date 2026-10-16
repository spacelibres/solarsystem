export interface ScreenPoint { readonly x: number; readonly y: number; }

/** Keep text close to its physical anchor; hide crowded names instead of moving bodies. */
export function placeScreenLabel(x: number, y: number, width: number, height: number, occupied: readonly ScreenPoint[]): ScreenPoint | undefined {
  const offsets = [[8, -8], [8, -30], [8, 14]];
  for (const [dx, dy] of offsets) {
    const position = { x: Math.max(4, Math.min(width - 90, x + dx)), y: Math.max(4, Math.min(height - 24, y + dy)) };
    if (!occupied.some(point => Math.abs(point.x - position.x) < 85 && Math.abs(point.y - position.y) < 22)) return position;
  }
  return undefined;
}
