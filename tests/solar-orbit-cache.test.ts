import { expect, it } from 'vitest';
import { orbitGeometryNeedsUpdate } from '../src/solar/render/orbit-cache';
it('reuses geometry for camera-only zoom and subpixel motion, but updates visible movement',()=>{
 const previous={x:100,y:0,z:0};
 expect(orbitGeometryNeedsUpdate(previous,previous,1)).toBe(false);
 expect(orbitGeometryNeedsUpdate(previous,{x:100.2,y:0,z:0},1)).toBe(false);
 expect(orbitGeometryNeedsUpdate(previous,{x:100.3,y:0,z:0},1)).toBe(true);
 expect(orbitGeometryNeedsUpdate(previous,{x:100.2,y:0,z:0},.1)).toBe(true);
 expect(orbitGeometryNeedsUpdate(undefined,previous,1)).toBe(true);
});
