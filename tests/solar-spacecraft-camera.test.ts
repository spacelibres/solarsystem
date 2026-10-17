import { describe, expect, it } from 'vitest';
import { spacecraftCameraBasis } from '../src/solar/render/camera';
import { FULL_SCENE } from '../src/solar/config/scene-catalog';
import { applySourceControllers } from '../src/solar/domain/controllers';

describe('Eyes goToSpacecraft camera basis', () => {
  it('preserves IXPE source identity attitude instead of turning its body toward Earth', () => {
    const ixpe = FULL_SCENE.find(body => body.id === 'sc_ixpe')!;
    const state = applySourceControllers(ixpe.controllers, { position: { x: 6900, y: 0, z: 0 } }, { x: 1e8, y: 0, z: 0 }, 'earth', 845474202, () => undefined);
    expect(state.orientation).toEqual({ x: 0, y: 0, z: 0, w: 1 });
  });
  it('places the camera outside the parent-relative orbit, looking back at Earth', () => {
    const basis = spacecraftCameraBasis({ x: 3, y: 4, z: 0 }, null, null);
    expect(basis.offset).toEqual({ x: .6, y: .8, z: 0 });
    expect(basis.up).toEqual({ x: 0, y: 0, z: 1 });
  });
  it('uses the parent north axis rather than a global camera roll', () => {
    const basis = spacecraftCameraBasis({ x: 1, y: 0, z: 0 }, { x: Math.SQRT1_2, y: 0, z: 0, w: Math.SQRT1_2 }, null);
    expect(basis.up.y).toBeCloseTo(-1);
    expect(basis.up.z).toBeCloseTo(0);
  });
  it('uses the body X axis when the parent-relative position is zero', () => {
    const basis = spacecraftCameraBasis({ x: 0, y: 0, z: 0 }, null, { x: 0, y: 0, z: Math.SQRT1_2, w: Math.SQRT1_2 });
    expect(basis.offset.y).toBeCloseTo(1);
    expect(basis.offset.x).toBeCloseTo(0);
  });
});
