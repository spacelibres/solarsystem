import { describe, expect, it } from 'vitest';
import { AdditiveBlending, type WebGLRenderer } from 'three';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { createTrailMaterial, setTrailHover, setTrailProgress } from '../src/solar/render/trail-material';

describe('trail shader against the installed Three.js source',()=>{
    it('replaces the actual pixel-width expression and fragment output',()=>{
        const material=createTrailMaterial();
        const shader={vertexShader:material.vertexShader,fragmentShader:material.fragmentShader,uniforms:{...material.uniforms}};
        // Exercise the exact callback Three invokes, starting from its actual LineMaterial shader.
        material.onBeforeCompile(shader as Parameters<typeof material.onBeforeCompile>[0],{} as WebGLRenderer);
        expect(shader.vertexShader).toContain('trailU = position.y < 0.5 ? trailStart : trailEnd;');
        expect(shader.vertexShader).toContain('offset *= mix(trailWidthMin,trailWidthMax,trailU)');
        expect(shader.vertexShader).not.toContain('offset *= linewidth;');
        expect(shader.fragmentShader).toContain('gl_FragColor = vec4( diffuseColor.rgb, alpha * trailU );');
        expect(shader.fragmentShader).not.toContain('gl_FragColor = vec4( diffuseColor.rgb, alpha );');
        expect(shader.uniforms.trailWidthMin).toBe(material.uniforms.trailWidthMin);
        expect(shader.uniforms.trailWidthMax).toBe(material.uniforms.trailWidthMax);
        expect(material.blending).toBe(AdditiveBlending);
        expect(material.depthWrite).toBe(false);
        setTrailHover(material,true);
        expect(shader.uniforms.trailWidthMin.value).toBe(2);
        expect(shader.uniforms.trailWidthMax.value).toBe(4);
        expect(material.opacity).toBe(1);
        setTrailHover(material,false);
        expect(shader.uniforms.trailWidthMin.value).toBe(0);
        expect(shader.uniforms.trailWidthMax.value).toBe(2);
        expect(material.opacity).toBe(.35);
        material.dispose();
    });
    it('assigns shared segment endpoints the same index fraction with an exact head',()=>{
        const geometry=new LineGeometry();
        geometry.setPositions([0,0,0,1,0,0,1,1,0]);
        setTrailProgress(geometry,3);
        expect(Array.from(geometry.getAttribute('trailStart').array)).toEqual([0,.5]);
        expect(Array.from(geometry.getAttribute('trailEnd').array)).toEqual([.5,1]);
        geometry.dispose();
    });
});
