import * as THREE from 'three';

export function createSunGlow(): THREE.Sprite {
    const material = new THREE.SpriteMaterial({ color: 0xffdca0, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
    const glow = new THREE.Sprite(material);
    glow.name = 'sun-pixel-glow';
    // Without the alpha texture, an additive sprite paints its entire rectangular quad.
    glow.visible = false;
    return glow;
}

export function setSunGlowTexture(glow: THREE.Sprite, texture: THREE.Texture): void {
    glow.material.map = texture;
    glow.material.needsUpdate = true;
    glow.visible = true;
}
