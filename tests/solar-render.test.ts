import { applyFrameTransform } from '../src/solar/render/frame';
import { Group } from 'three';
import { createRingGeometry } from '../src/solar/render/rings';
import { describe, expect, it } from 'vitest';
import { Vector3 } from 'three';
import { createSpheroidFace, spheroidFacePoint } from '../src/solar/render/spheroid';
import { modelIsResolvable, cameraFitDistance } from '../src/solar/render/camera';
import { createRenderWorld } from '../src/solar/render/render-world';

describe('NASA six-face mapping with standard Three geometry', () => {
  it('rejects invalid GPU allocation options before creating a browser context', () => {
    const container = {} as HTMLElement;
    expect(() => createRenderWorld(container, [], { onSelect() {}, pixelRatioLimit: NaN })).toThrow(/pixelRatioLimit/);
    expect(() => createRenderWorld(container, [], { onSelect() {}, maxTextureBytes: -1 })).toThrow(/maxTextureBytes/);
    expect(() => createRenderWorld(container, [], { onSelect() {}, textureSize: 0 })).toThrow(/textureSize/);
  });
  it('preserves the verified face axes, ellipsoid radii and vertical texture orientation', () => {
    const expected = [[2, 0, 0], [0, 2, 0], [-2, 0, 0], [0, -2, 0], [0, 0, 1], [0, 0, -1]];
    for (let face = 0; face < 6; face++) {
      const p = spheroidFacePoint(face, .5, .5, 2, 1, true);
      expected[face].forEach((v, axis) => expect([p.position.x, p.position.y, p.position.z][axis]).toBeCloseTo(v));
      expect(p.uv).toEqual({ x: .5, y: .5 });
    }
    expect(spheroidFacePoint(0, 0, 0, 2, 1, true).uv).toEqual({ x: 0, y: 1 });
    const point = spheroidFacePoint(0, .5, 1, 2, 1, true);
    expect(point.position.x).toBeCloseTo(4 / Math.sqrt(5));
    expect(point.position.z).toBeCloseTo(1 / Math.sqrt(5));
    expect(point.normal.x).toBeCloseTo(Math.SQRT1_2, 14);
    expect(point.normal.y).toBe(0);
    expect(point.normal.z).toBeCloseTo(Math.SQRT1_2, 14);
  });

  it('has outward triangle winding and unit geodetic normals on every face', () => {
    for (let face = 0; face < 6; face++) {
      const geometry = createSpheroidFace(face, 2, 1, true, 8);
      const positions = geometry.getAttribute('position');
      const normals = geometry.getAttribute('normal');
      const indices = geometry.index!;
      expect(positions.count).toBe(81);
      for (let index = 0; index < normals.count; index++) expect(new Vector3().fromBufferAttribute(normals, index).length()).toBeCloseTo(1);
      for (let index = 0; index < indices.count; index += 3) {
        const a = new Vector3().fromBufferAttribute(positions, indices.getX(index));
        const b = new Vector3().fromBufferAttribute(positions, indices.getX(index + 1));
        const c = new Vector3().fromBufferAttribute(positions, indices.getX(index + 2));
        expect(b.sub(a).cross(c.sub(a)).dot(a)).toBeGreaterThan(0);
      }
      let disposed = 0;
      geometry.addEventListener('dispose', () => disposed++);
      geometry.dispose();
      expect(disposed).toBe(1);
    }
  });

  it('joins neighbouring faces at the same physical edge and rejects invalid allocation parameters', () => {
    const a = spheroidFacePoint(0, 1, .2, 6378.137, 6356.752, true);
    const b = spheroidFacePoint(1, 0, .2, 6378.137, 6356.752, true);
    expect(a.position).toEqual(b.position);
    expect(() => createSpheroidFace(6, 1, 1, true)).toThrow();
    expect(() => createSpheroidFace(0, NaN, 1, true)).toThrow();
    expect(() => createSpheroidFace(0, 1, 1, true, 1e9)).toThrow();
  });
});

describe('camera framing', () => {
  it('fits a sphere with margin at portrait, ordinary and ultrawide aspect ratios', () => {
    for (const aspect of [.5, 1, 1.5, 2.4, 3, 5]) {
      const vertical = 2 * Math.atan(Math.tan(Math.PI / 6) / Math.max(1, aspect));
      const horizontal = 2 * Math.atan(Math.tan(vertical / 2) * aspect);
      const distance = cameraFitDistance(6378, vertical, aspect);
      expect(Math.asin(6378 / distance)).toBeLessThan(Math.min(vertical, horizontal) / 2);
    }
  });
});

describe('source radial ring map', () => {
  it('maps inner/outer edge to U0/U1 rather than planar texture coordinates', () => {
    const geometry=createRingGeometry(74270.580913,140478.924731);
    const positions=geometry.getAttribute('position'),uv=geometry.getAttribute('uv');
    for(let i=0;i<positions.count;i++){
      const radius=Math.hypot(positions.getX(i),positions.getY(i));
      expect(uv.getX(i)).toBeCloseTo((radius-74270.580913)/(140478.924731-74270.580913),5);
      expect(uv.getY(i)).toBe(0);
      expect(positions.getZ(i)).toBe(0);
    }
    geometry.dispose();
  });
});

it('defers sub-pixel spacecraft geometry until focused or visibly resolved',()=>{
 expect(modelIsResolvable(.072,749000,Math.PI/4,500,false)).toBe(false);
 expect(modelIsResolvable(.072,.3,Math.PI/4,500,true)).toBe(true);
 expect(modelIsResolvable(10,100,Math.PI/4,500,false)).toBe(true);
});

it('uses camera-relative offsets and clears a previous model attitude when the next one is unknown',()=>{
 const group=new Group();
 applyFrameTransform(group,{x:1e9+3,y:1e9+4,z:1e9+5},{w:0,x:0,y:0,z:1},{x:1e9,y:1e9,z:1e9});
 expect(group.position.toArray()).toEqual([3,4,5]);
 expect(group.quaternion.w).toBe(0);
 applyFrameTransform(group,{x:0,y:0,z:0},null,{x:0,y:0,z:0});
 expect(group.quaternion.toArray()).toEqual([0,0,0,1]);
});
