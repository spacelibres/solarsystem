import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, DoubleSide, DynamicDrawUsage, Mesh, ShaderMaterial, Vector2, type ColorRepresentation } from 'three';
import type { Vec3 } from '../../lib/dynamo/math';

const vertexShader = /* glsl */`
#include <common>
#include <logdepthbuf_pars_vertex>
attribute vec3 positionCurr;
attribute vec3 positionPrev;
attribute vec3 positionNext;
attribute float side;
attribute float trailU;
uniform vec2 viewportSize;
uniform float widthMin;
uniform float widthMax;
varying float fTrailU;
varying float fPixelOffset;
varying float fHalfWidth;
varying float fVisible;
vec4 projectSafe(vec3 point) {
    vec4 view = modelViewMatrix * vec4(point, 1.0);
    return projectionMatrix * view;
}
float divisorSafe(float w) {
    return (w < 0.0 ? -1.0 : 1.0) * max(abs(w), 0.000001);
}
vec2 directionSafe(vec2 delta) {
    float lengthSquared = dot(delta, delta);
    return lengthSquared > 0.000001 ? delta * inversesqrt(lengthSquared) : vec2(0.0);
}
void main() {
    vec4 center = projectSafe(positionCurr);
    vec4 previous = projectSafe(positionPrev);
    vec4 next = projectSafe(positionNext);
    vec2 pixelCenter = center.xy / divisorSafe(center.w) * viewportSize * 0.5;
    vec2 pixelPrevious = previous.xy / divisorSafe(previous.w) * viewportSize * 0.5;
    vec2 pixelNext = next.xy / divisorSafe(next.w) * viewportSize * 0.5;
    vec2 incoming = directionSafe(pixelCenter - pixelPrevious);
    vec2 outgoing = directionSafe(pixelNext - pixelCenter);
    vec2 tangent = directionSafe(incoming + outgoing);
    if (dot(tangent, tangent) < 0.5) tangent = dot(outgoing,outgoing) > 0.5 ? outgoing : incoming;
    vec2 normal = vec2(-tangent.y, tangent.x);
    float miter = dot(incoming,incoming) < 0.5 || dot(outgoing,outgoing) < 0.5 ? 1.0 : sqrt((1.0 + max(0.0, dot(incoming, outgoing))) * 0.5);
    float width = mix(widthMin, widthMax, trailU);
    float resolutionFactor = max(1.0, min(viewportSize.x, viewportSize.y) / 800.0);
    float halfWidth = width * 0.5 * resolutionFactor;
    float paddedHalfWidth = halfWidth + 0.5;
    vec2 offset = normal * side * paddedHalfWidth / max(miter, 0.70710678);
    gl_Position = center;
    gl_Position.xy += offset / viewportSize * 2.0 * center.w;
    fTrailU = trailU;
    fPixelOffset = side * paddedHalfWidth;
    fHalfWidth = halfWidth;
    fVisible = -(modelViewMatrix * vec4(positionCurr, 1.0)).z;
    #include <logdepthbuf_vertex>
}`;
const fragmentShader = /* glsl */`
#include <logdepthbuf_pars_fragment>
uniform vec3 diffuse;
uniform float alphaMultiplier;
uniform float alphaFade;
varying float fTrailU;
varying float fPixelOffset;
varying float fHalfWidth;
varying float fVisible;
void main() {
    if (fVisible <= 0.000001) discard;
    // Exact one-pixel box coverage preserves subpixel flux and vanishes at zero width.
    float edge = max(0.0, min(0.5, fHalfWidth - fPixelOffset) - max(-0.5, -fHalfWidth - fPixelOffset));
    gl_FragColor = vec4(diffuse, alphaMultiplier * mix(alphaFade, 1.0, fTrailU) * edge);
    #include <logdepthbuf_fragment>
    #include <colorspace_fragment>
}`;

/** Shared paired vertices prevent additive brightness spikes at segment joins.
 * Samples must be rebased in float64 by the caller before uploading their local positions.
 */
export class TrailRibbon extends Mesh<BufferGeometry, ShaderMaterial> {
    readonly capacity: number;
    constructor(capacity = 4096) {
        if (!Number.isInteger(capacity) || capacity < 2) throw new RangeError('Trail capacity must be an integer >= 2');
        const geometry = new BufferGeometry();
        for (const name of ['positionCurr', 'positionPrev', 'positionNext']) {
            geometry.setAttribute(name, new BufferAttribute(new Float32Array(capacity * 6), 3).setUsage(DynamicDrawUsage));
        }
        geometry.setAttribute('position', geometry.getAttribute('positionCurr'));
        geometry.setAttribute('trailU', new BufferAttribute(new Float32Array(capacity * 2), 1).setUsage(DynamicDrawUsage));
        const sides = new Float32Array(capacity * 2);
        for (let i = 0; i < capacity; i++) { sides[i*2] = -1; sides[i*2+1] = 1; }
        geometry.setAttribute('side', new BufferAttribute(sides, 1));
        const indices = capacity * 2 > 65535 ? new Uint32Array((capacity-1)*6) : new Uint16Array((capacity-1)*6);
        for (let i = 0; i < capacity-1; i++) indices.set([i*2,i*2+1,i*2+2,i*2+2,i*2+1,i*2+3], i*6);
        geometry.setIndex(new BufferAttribute(indices, 1));
        geometry.setDrawRange(0,0);
        super(geometry, new ShaderMaterial({
            vertexShader, fragmentShader, transparent: true, depthWrite: false,
            side: DoubleSide, blending: AdditiveBlending,
            uniforms: {
                diffuse: { value: new Color(0xffffff) }, alphaMultiplier: { value: .35 }, alphaFade: { value: 0 },
                widthMin: { value: 0 }, widthMax: { value: 2 }, viewportSize: { value: new Vector2(1,1) },
            },
        }));
        this.capacity = capacity;
        this.frustumCulled = false;
    }
    /** Closed rings include a duplicate of the first point as their final point. */
    update(points: readonly Vec3[], closed = false, origin?: Vec3): void {
        if (points.length > this.capacity) throw new RangeError('Trail exceeds its fixed capacity');
        for (const p of points) if (!Number.isFinite(p.x) || !Number.isFinite(p.y) || !Number.isFinite(p.z)) throw new RangeError('Trail positions must be finite');
        const ox = origin?.x ?? 0, oy = origin?.y ?? 0, oz = origin?.z ?? 0;
        if (!Number.isFinite(ox) || !Number.isFinite(oy) || !Number.isFinite(oz)) throw new RangeError('Trail origin must be finite');
        const currAttribute = this.geometry.getAttribute('positionCurr') as BufferAttribute;
        const prevAttribute = this.geometry.getAttribute('positionPrev') as BufferAttribute;
        const nextAttribute = this.geometry.getAttribute('positionNext') as BufferAttribute;
        const progressAttribute = this.geometry.getAttribute('trailU') as BufferAttribute;
        const curr = currAttribute.array, prev = prevAttribute.array, nextArray = nextAttribute.array, progress = progressAttribute.array;
        for (let i = 0; i < points.length; i++) {
            const previous = closed && points.length > 2 && (i === 0 || i === points.length-1) ? points.length-2 : Math.max(0,i-1);
            const next = closed && points.length > 2 && (i === 0 || i === points.length-1) ? 1 : Math.min(points.length-1,i+1);
            const p = points[i], a = points[previous], b = points[next], offset = i*6;
            curr[offset] = curr[offset+3] = p.x-ox;
            curr[offset+1] = curr[offset+4] = p.y-oy;
            curr[offset+2] = curr[offset+5] = p.z-oz;
            prev[offset] = prev[offset+3] = a.x-ox;
            prev[offset+1] = prev[offset+4] = a.y-oy;
            prev[offset+2] = prev[offset+5] = a.z-oz;
            nextArray[offset] = nextArray[offset+3] = b.x-ox;
            nextArray[offset+1] = nextArray[offset+4] = b.y-oy;
            nextArray[offset+2] = nextArray[offset+5] = b.z-oz;
            const u = points.length > 1 ? i/(points.length-1) : 0;
            progress[i*2] = progress[i*2+1] = u;
        }
        for (const attribute of [currAttribute, prevAttribute, nextAttribute, progressAttribute]) {
            attribute.clearUpdateRanges();
            if (points.length > 0) {
                attribute.addUpdateRange(0, points.length * 2 * attribute.itemSize);
                attribute.needsUpdate = true;
            }
        }
        this.geometry.setDrawRange(0, Math.max(0,points.length-1)*6);
    }
    setResolution(width: number, height: number): void {
        this.material.uniforms.viewportSize.value.set(Math.max(1,width), Math.max(1,height));
    }
    setStyle(color: ColorRepresentation, opacity = .35, hovered = false): void {
        this.material.uniforms.diffuse.value.set(color);
        this.material.uniforms.alphaFade.value = 0;
        this.material.uniforms.alphaMultiplier.value = hovered ? 1 : opacity;
        this.material.uniforms.widthMin.value = hovered ? 2 : 0;
        this.material.uniforms.widthMax.value = hovered ? 4 : 2;
    }
    setOrbitStyle(color: ColorRepresentation, opacity = .75, width = 1.2): void {
        this.material.uniforms.diffuse.value.set(color);
        this.material.uniforms.alphaFade.value = 1;
        this.material.uniforms.alphaMultiplier.value = opacity;
        this.material.uniforms.widthMin.value = width;
        this.material.uniforms.widthMax.value = width;
    }
}

