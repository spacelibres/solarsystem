import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { createSunGlow, setSunGlowTexture } from '../src/solar/render/sun-glow';

describe('sun glow texture lifecycle', () => {
    it('never renders an unmasked additive square while loading or after a failed load', () => {
        const glow = createSunGlow();
        expect(glow.visible).toBe(false);
        expect(glow.material.map).toBeNull();
        expect(glow.material.depthWrite).toBe(false);
        glow.material.dispose();
    });
    it('reveals the glow only after its alpha texture is attached', () => {
        const glow = createSunGlow(), texture = new THREE.Texture();
        setSunGlowTexture(glow, texture);
        expect(glow.material.map).toBe(texture);
        expect(glow.visible).toBe(true);
        expect(glow.material.version).toBeGreaterThan(0);
        glow.material.dispose(); texture.dispose();
    });
});
