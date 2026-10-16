import { RingGeometry } from 'three';
import { SPRITES } from '../../lib/nasa/assets';
/** Radii and radial texture axes from the source planet registrations/RingsComponent. */
export const PLANET_RINGS = {
    saturn: { inner: 74270.580913, outer: 140478.924731, top: SPRITES.saturnRingsTop, bottom: SPRITES.saturnRingsBottom },
    uranus: { inner: 26840, outer: 103000, top: SPRITES.uranusRings, bottom: SPRITES.uranusRings },
    neptune: { inner: 40900, outer: 62964, top: SPRITES.neptuneRings, bottom: SPRITES.neptuneRings },
} as const;
export function createRingGeometry(inner: number, outer: number): RingGeometry {
    if (!Number.isFinite(inner) || !Number.isFinite(outer) || inner <= 0 || outer <= inner)
        throw new RangeError('Invalid ring radii');
    const geometry = new RingGeometry(inner, outer, 192);
    const position = geometry.getAttribute('position'), uv = geometry.getAttribute('uv');
    for (let index = 0; index < position.count; index++)
        uv.setXY(index, (Math.hypot(position.getX(index), position.getY(index)) - inner) / (outer - inner), 0);
    return geometry;
}
