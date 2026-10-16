export interface ScreenPoint { readonly x: number; readonly y: number; }

/** Prefer the true projected point; use short leader offsets instead of hiding clustered planets. */
export function placeScreenLabel(x: number, y: number, width: number, height: number, occupied: readonly ScreenPoint[]): ScreenPoint | undefined {
  const offsets = [[0, 0], [0, -26], [0, 26], [90, 0], [-90, 0], [90, -26], [-90, -26], [90, 26], [-90, 26], [0, -52], [0, 52], [180, 0], [-180, 0]];
  for (const [dx, dy] of offsets) {
    const position = { x: Math.max(4, Math.min(width - 90, x + dx)), y: Math.max(4, Math.min(height - 24, y + dy)) };
    if (!occupied.some(point => Math.abs(point.x - position.x) < 85 && Math.abs(point.y - position.y) < 22)) return position;
  }
  return undefined;
}
