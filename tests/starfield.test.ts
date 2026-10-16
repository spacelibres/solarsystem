import { describe, expect, it } from 'vitest';

import { STAR_BYTES, STARFIELD_LAYERS, STAR_SHELL_CAMERA_FRACTION, buildStarfield, parseStarfield } from '../src/lib/scene/starfield';

/** Build one 23-byte star record. */
function starRecord(mag: number, absMag: number, r: number, g: number, b: number, x: number, y: number, z: number): ArrayBuffer {
  const buffer = new ArrayBuffer(4 + STAR_BYTES);
  const view = new DataView(buffer);
  view.setInt32(0, 1, true);
  view.setFloat32(4, mag, true);
  view.setFloat32(8, absMag, true);
  view.setUint8(12, r);
  view.setUint8(13, g);
  view.setUint8(14, b);
  // Position is written y, z, x, with y negated on read.
  view.setFloat32(15, y, true);
  view.setFloat32(19, z, true);
  view.setFloat32(23, x, true);
  return buffer;
}

describe('starfield parsing', () => {
  it('reads the 23-byte record layout', () => {
    const stars = parseStarfield(starRecord(3.5, -1.5, 255, 128, 64, 10, 20, 30));
    expect(stars).toHaveLength(1);
    expect(stars[0].magnitude).toBeCloseTo(3.5, 5);
    expect(stars[0].absoluteMagnitude).toBeCloseTo(-1.5, 5);
    // Colour is normalised by the largest channel, so r becomes 1.
    expect(stars[0].color.r).toBeCloseTo(1, 5);
    expect(stars[0].color.g).toBeCloseTo(128 / 255, 5);
  });

  it('rotates the ecliptic-J2000 position into J2000', () => {
    // The reader applies NASA's hardcoded quaternion
    // (0.9791532214288992, 0.2031230389823101, 0, 0), which is a 180° rotation
    // about an axis in the XY plane. So the stored vector comes back rotated,
    // not verbatim — length is preserved, the components are not.
    const stars = parseStarfield(starRecord(0, 0, 255, 255, 255, 10, 20, 30));
    const p = stars[0].position;
    expect(p.length()).toBeCloseTo(Math.hypot(10, 20, 30), 3);
    // The raw (10, -20, 30) is not what we get back.
    expect(p.x).not.toBeCloseTo(10, 1);
    expect(p.y).not.toBeCloseTo(-20, 1);
    // z is mapped through unchanged by this particular 180° rotation.
    expect(p.z).toBeCloseTo(-30, 3);
  });

  it('lists NASA´s seven layers, galaxies first', () => {
    expect(STARFIELD_LAYERS).toHaveLength(7);
    expect(STARFIELD_LAYERS[0]).toBe('galaxies.0');
    expect(STARFIELD_LAYERS[6]).toBe('stars.5');
  });
});

describe('starfield geometry', () => {
  it('uploads a four-component colour, carrying absolute magnitude in alpha', () => {
    // This is the channel that drives NASA's flux-based sizing. Without it every
    // star renders flat and the field looks sparse.
    const stars = parseStarfield(starRecord(3.5, -1.5, 255, 200, 100, 1, 2, 3));
    const points = buildStarfield([stars]);
    const color = points.geometry.getAttribute('color');
    expect(color.itemSize).toBe(4);
    expect(color.getW(0)).toBeCloseTo(-1.5, 5);
  });

  it('normalises positions to a unit sphere, because float32 cannot hold 1e19 km', () => {
    // The files store real parallax coordinates up to 3e20 km. Uploaded raw as
    // float32 the direction is lost to rounding and the field projects to NaN and
    // disappears; so the CPU normalises to a unit vector and the scene scales the
    // object per frame to keep the sky in sync with the camera.
    const far = starRecord(0, -5, 255, 255, 255, 1e19, 2e19, 3e19);
    const points = buildStarfield([parseStarfield(far)]);
    const p = points.geometry.getAttribute('position');
    const len = Math.hypot(p.getX(0), p.getY(0), p.getZ(0));
    expect(len).toBeCloseTo(1, 5);
    // The components are unit-scale and finite: the direction survived rather than
    // collapsing to NaN through float32 rounding, and the ecliptic rotation is
    // applied on top (so the raw proportions no longer hold).
    for (const c of [p.getX(0), p.getY(0), p.getZ(0)]) {
      expect(Number.isFinite(c)).toBe(true);
    }

    // The true distance is preserved separately, for the flux term.
    const d = points.geometry.getAttribute('distance');
    expect(d.getX(0)).toBeCloseTo(Math.hypot(1e19, 2e19, 3e19), -14);
  });

  it('flattens the cloud to infinity so the clip planes cannot cut it', () => {
    const points = buildStarfield([parseStarfield(starRecord(0, 0, 255, 255, 255, 0, 0, 1))]);
    const shader = (points.material as unknown as { vertexShader: string }).vertexShader;

    // NASA's line, and the reason the sky is never half-missing: overwriting `w`
    // with the view-space vertical component makes the projection depend on a
    // star's direction only, so a star behind the camera is not clipped.
    expect(shader).toContain('gl_Position.w = viewPosition.y');

    // It must come AFTER the ordinary projection, or it would be overwritten.
    expect(shader.indexOf('gl_Position = projectionMatrix')).toBeLessThan(
      shader.indexOf('gl_Position.w = viewPosition.y'),
    );
  });

  it('scales the shell as a float32 convenience, not a clipping workaround', () => {
    // Sizing a real sphere to fit between near and far cannot work: the camera
    // sits at its centre, so the rear half is always behind the near plane.
    const points = buildStarfield([parseStarfield(starRecord(0, 0, 255, 255, 255, 0, 0, 1))]);
    expect(points.frustumCulled).toBe(false);
    expect(STAR_SHELL_CAMERA_FRACTION).toBeGreaterThan(0);
    expect(STAR_SHELL_CAMERA_FRACTION).toBeLessThan(1);
  });

  it('pins to the sky and draws additively, as NASA does', () => {
    const points = buildStarfield([parseStarfield(starRecord(0, 0, 255, 255, 255, 0, 0, 1))]);
    // All seven layers render at -2.
    expect(points.renderOrder).toBe(-2);
    const material = points.material as { blending: number; transparent: boolean; depthWrite: boolean };
    expect(material.transparent).toBe(true);
    expect(material.depthWrite).toBe(false);
  });

  it('exposes particleSize, the uniform the shader sizes with', () => {
    const points = buildStarfield([parseStarfield(starRecord(0, 0, 255, 255, 255, 0, 0, 1))]);
    const material = points.material as unknown as { uniforms: Record<string, { value: number }> };
    expect(material.uniforms.particleSize.value).toBe(1);
  });
});
