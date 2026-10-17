import { describe, expect, it } from 'vitest';
import { AdditiveBlending, DoubleSide } from 'three';
import { TrailRibbon } from '../src/solar/render/trail-ribbon';

describe('continuous trail ribbon', () => {
    it('pads the strip for pixel coverage without dimming its nominal width', () => {
        const ribbon = new TrailRibbon(8);
        expect(ribbon.material.vertexShader).toContain('halfWidth + 0.5');
        expect(ribbon.material.fragmentShader).toContain('min(0.5, fHalfWidth - fPixelOffset)');
        expect(ribbon.material.fragmentShader).toContain('max(-0.5, -fHalfWidth - fPixelOffset)');
        expect(ribbon.material.fragmentShader).not.toContain('fwidth(fSide)');
    });
    it('converts linear source colors into the renderer output color space', () => {
        const ribbon = new TrailRibbon(8);
        const shader = ribbon.material.fragmentShader;
        expect(shader).toContain('#include <colorspace_fragment>');
        expect(shader.indexOf('#include <colorspace_fragment>')).toBeGreaterThan(shader.indexOf('gl_FragColor ='));
    });
    it('keeps actual clip coordinates for hardware clipping across the eye plane', () => {
        const ribbon = new TrailRibbon(8);
        expect(ribbon.material.vertexShader).not.toContain('view.z = min');
        expect(ribbon.material.vertexShader).toContain('return projectionMatrix * view;');
        expect(ribbon.material.vertexShader).toContain('abs(w)');
    });
    it('subtracts the local origin before float32 storage preserves nearby spacecraft motion', () => {
        const ribbon = new TrailRibbon(8);
        ribbon.update([{x:7000+1e-7,y:7000-1e-7,z:7000},{x:7000,y:7000,z:7000}],false,{x:7000,y:7000,z:7000});
        const curr = ribbon.geometry.getAttribute('positionCurr');
        expect(curr.getX(0)).toBeCloseTo(1e-7,11);
        expect(curr.getY(0)).toBeCloseTo(-1e-7,11);
        expect(curr.getZ(0)).toBe(0);
        expect([curr.getX(2),curr.getY(2),curr.getZ(2)]).toEqual([0,0,0]);
    });
    it('gives both vertices of a duplicated closed seam the same adjacent points', () => {
        const ribbon = new TrailRibbon(8);
        ribbon.update([{x:0,y:0,z:-1},{x:1,y:0,z:-1},{x:1,y:1,z:-1},{x:0,y:0,z:-1}], true);
        const prev = ribbon.geometry.getAttribute('positionPrev');
        const next = ribbon.geometry.getAttribute('positionNext');
        expect([prev.getX(0),prev.getY(0),prev.getZ(0)]).toEqual([1,1,-1]);
        expect([prev.getX(6),prev.getY(6),prev.getZ(6)]).toEqual([1,1,-1]);
        expect([next.getX(0),next.getY(0),next.getZ(0)]).toEqual([1,0,-1]);
        expect([next.getX(6),next.getY(6),next.getZ(6)]).toEqual([1,0,-1]);
        expect(ribbon.geometry.drawRange.count).toBe(18);
    });
    it('switches between constant-width complete orbits and fading trails', () => {
        const ribbon = new TrailRibbon(8);
        ribbon.setOrbitStyle(0x123456);
        expect(ribbon.material.uniforms.widthMin.value).toBe(1.2);
        expect(ribbon.material.uniforms.widthMax.value).toBe(1.2);
        expect(ribbon.material.uniforms.alphaMultiplier.value).toBe(.75);
        expect(ribbon.material.uniforms.alphaFade.value).toBe(1);
        ribbon.setStyle(0x654321,.35,true);
        expect(ribbon.material.uniforms.alphaFade.value).toBe(0);
        expect(ribbon.material.uniforms.widthMin.value).toBe(2);
        expect(ribbon.material.uniforms.widthMax.value).toBe(4);
        ribbon.setOrbitStyle(0xffffff,.5,3);
        expect(ribbon.material.uniforms.widthMin.value).toBe(3);
        expect(ribbon.material.uniforms.widthMax.value).toBe(3);
        expect(ribbon.material.uniforms.alphaMultiplier.value).toBe(.5);
        expect(ribbon.material.uniforms.alphaFade.value).toBe(1);
    });
    it('shares each paired join across triangles instead of overlapping segment caps', () => {
        const ribbon = new TrailRibbon(8);
        ribbon.update([{x:0,y:0,z:-1},{x:1,y:0,z:-1},{x:1,y:1,z:-1}]);
        expect(ribbon.geometry.drawRange.count).toBe(12);
        expect(Array.from(ribbon.geometry.index!.array).slice(0,12)).toEqual([0,1,2,2,1,3,2,3,4,4,3,5]);
        const curr = ribbon.geometry.getAttribute('positionCurr');
        expect(Array.from(curr.array).slice(0,18)).toEqual([0,0,-1,0,0,-1,1,0,-1,1,0,-1,1,1,-1,1,1,-1]);
        expect(Array.from(ribbon.geometry.getAttribute('trailU').array).slice(0,6)).toEqual([0,0,.5,.5,1,1]);
    });
    it('reuses GPU buffers and clears the draw range for a missing arc', () => {
        const ribbon = new TrailRibbon(8);
        const geometry = ribbon.geometry;
        const attribute = geometry.getAttribute('positionCurr');
        ribbon.update([{x:0,y:0,z:-1},{x:1,y:0,z:-1}]);
        const version = (attribute as import('three').BufferAttribute).version;
        ribbon.update([{x:0,y:0,z:-2},{x:2,y:0,z:-2},{x:3,y:0,z:-2}]);
        expect(ribbon.geometry).toBe(geometry);
        expect(geometry.getAttribute('positionCurr')).toBe(attribute);
        expect((attribute as import('three').BufferAttribute).version).toBeGreaterThan(version);
        expect((attribute as import('three').BufferAttribute).updateRanges).toEqual([{start:0,count:18}]);
        expect((geometry.getAttribute('positionPrev') as import('three').BufferAttribute).updateRanges).toEqual([{start:0,count:18}]);
        expect((geometry.getAttribute('positionNext') as import('three').BufferAttribute).updateRanges).toEqual([{start:0,count:18}]);
        expect((geometry.getAttribute('trailU') as import('three').BufferAttribute).updateRanges).toEqual([{start:0,count:6}]);
        ribbon.update([]);
        expect(geometry.drawRange.count).toBe(0);
    });
    it('preserves taper, hover, resolution and additive depth settings', () => {
        const ribbon = new TrailRibbon(8);
        ribbon.setStyle(0xff0000, .35, true);
        expect(ribbon.material.uniforms.widthMin.value).toBe(2);
        expect(ribbon.material.uniforms.widthMax.value).toBe(4);
        expect(ribbon.material.uniforms.alphaMultiplier.value).toBe(1);
        ribbon.setStyle(0x00ff00, .35, false);
        expect(ribbon.material.uniforms.widthMin.value).toBe(0);
        expect(ribbon.material.uniforms.widthMax.value).toBe(2);
        expect(ribbon.material.uniforms.alphaMultiplier.value).toBe(.35);
        ribbon.setResolution(1600, 900);
        expect(ribbon.material.uniforms.viewportSize.value.toArray()).toEqual([1600,900]);
        expect(ribbon.material.blending).toBe(AdditiveBlending);
        expect(ribbon.material.depthWrite).toBe(false);
        expect(ribbon.material.side).toBe(DoubleSide);
        expect(ribbon.frustumCulled).toBe(false);
    });
    it('rejects invalid inputs before corrupting an active geometry', () => {
        const ribbon = new TrailRibbon(2);
        ribbon.update([{x:0,y:0,z:0},{x:0,y:0,z:0}]);
        expect(() => ribbon.update([{x:0,y:0,z:0},{x:NaN,y:0,z:0}])).toThrow();
        expect(() => ribbon.update([{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0}])).toThrow();
        expect(ribbon.geometry.drawRange.count).toBe(6);
    });
});

