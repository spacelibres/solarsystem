/**
 * Comet tails, from NASA's `CometTailComponent`.
 *
 * ## What NASA builds
 *
 * A comet gets **three** instances of the component, added in `Entity.register`
 * when the entity carries a `comet: {}` flag:
 *
 *   dust  addComponent(CometTailComponent, comet.name)
 *         timeLength = comet.timeLength (600000 s by default)
 *         colour (1, 1, 1, 1)       — white
 *         starAccelerationMultiplier 1
 *
 *   ion   addComponent(CometTailComponent)
 *         timeLength = 0.5 * dust.timeLength
 *         colour (.214, .235, .371, .5)   — blue-grey
 *         starAccelerationMultiplier 10   — pushed harder by the solar wind
 *
 *   coma  addComponent(CometTailComponent)
 *         starAccelerationMultiplier 0
 *         colour (1, 1, 1, 10)      — note alpha 10, over-unity
 *         numberOfParticles 1
 *
 * All three take the `sun` as their light source.
 *
 * ## How the tail is shaped
 *
 * Each instance is an **instanced quad**: `numberOfParticles` quads, each born at
 * the comet's position at a distinct past time `originTime` and then accelerated
 * *away from the star*. The vertex shader is the physics:
 *
 *   deltaTime    = now - originTime
 *   acceleration = starAccel · mult · normalize(originPosition) · 5e7
 *                  · 2.51188643151^(20 - starAbsMag) / dot(originPosition, originPosition)
 *   modelPosition = acceleration · deltaTime^1.5
 *
 * That is an inverse-square push away from the Sun, which is why the tail always
 * points anti-sunward and lengthens as the comet approaches. `deltaTime^1.5` is
 * the integration of the accelerating particle.
 *
 * The quad is then stretched along the view-space projection of that motion, and
 * gains a radial falloff in the fragment shader, so each particle reads as a soft
 * streak. Alpha fades as `sqrt(1 - sqrt(deltaTime / timeLength))`, so the oldest
 * particles vanish first.
 *
 * The whole component is hidden when the camera is closer than 40,000 km, then
 * fades in over the next 400,000 km — you never see the particles up close.
 */

import * as THREE from 'three';

/** Per-tail parameters, as the constructor sets them. */
export interface CometTailParams {
  /** How far back in time the tail reaches, seconds. */
  timeLength: number;
  /** Instanced quad count. */
  numberOfParticles: number;
  /** RGBA; alpha may exceed 1. */
  color: [number, number, number, number];
  /** How strongly the star accelerates the particles; 10 for the ion tail. */
  starAccelerationMultiplier: number;
}

/**
 * The three tails NASA builds for every comet, in the order it adds them.
 *
 * `dust` carries the comet's declared `timeLength`; `ion` takes exactly half of
 * whatever `dust` ends up with, which is why this list cannot be evaluated until
 * the comet's own value is known.
 */
export function cometTailsFor(timeLength = 600_000): CometTailParams[] {
  const dust: CometTailParams = {
    timeLength,
    numberOfParticles: 200,
    color: [1, 1, 1, 1],
    starAccelerationMultiplier: 1,
  };
  return [
    dust,
    {
      timeLength: 0.5 * dust.timeLength,
      numberOfParticles: 200,
      color: [0.214, 0.235, 0.371, 0.5],
      starAccelerationMultiplier: 10,
    },
    {
      timeLength: dust.timeLength,
      numberOfParticles: 1,
      color: [1, 1, 1, 10],
      starAccelerationMultiplier: 0,
    },
  ];
}

/** The component hides itself below this camera distance, km. */
export const COMET_TAIL_MIN_CAMERA_DISTANCE_KM = 4e4;
/** It fades in over this additional distance, km. */
export const COMET_TAIL_FADE_DISTANCE_KM = 4e5;

const VERTEX_SHADER = /* glsl */ `
in vec3 position;
in float originTime;
in vec3 originPosition;
in float accelerationMultiplier;

uniform float time;
uniform float timeLength;
uniform vec3 positionInCamera;
uniform float starAbsoluteMagnitude;
uniform float starAccelerationMultiplier;
uniform mat4 viewMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

out vec2 vPosition;
out float vAlpha;

void main() {
  // Where this particle has drifted to, measured from where it was born.
  float deltaTime = time - originTime;
  vec3 externalAcceleration = starAccelerationMultiplier * accelerationMultiplier
    * normalize(originPosition) * 5.0e7
    * pow(2.51188643151, 20.0 - starAbsoluteMagnitude)
    / dot(originPosition, originPosition);
  vec3 modelPosition = externalAcceleration * pow(deltaTime, 1.5);

  // General expansion, and the stretch along the tail direction.
  float expansion = 0.2 * max(1.0e5, length(modelPosition));
  vec3 modelStretch = modelPosition;
  vec3 cameraDirection = normalize(positionInCamera);
  modelStretch = modelStretch - dot(cameraDirection, modelStretch) * cameraDirection;
  vec4 viewStretch = viewMatrix * vec4(modelStretch, 1.0);

  vec2 stretch2d = vec2(max(expansion, 2.0 * length(viewStretch.xz)), expansion);

  // Translate, rotate, stretch, unrotate the quad.
  vec2 translate = 0.5 * normalize(vec2(viewStretch.xz));
  float angle = length(viewStretch.xz) > 0.0 ? atan(viewStretch.z, viewStretch.x) : 0.0;
  float cosAngle = cos(angle);
  float sinAngle = sin(angle);
  float stretchedX = (stretch2d.x * cosAngle * cosAngle + stretch2d.y * sinAngle * sinAngle)
      * 0.5 * (position.x + translate.x)
    + (stretch2d.x - stretch2d.y) * sinAngle * cosAngle * 0.5 * (position.y + translate.y);
  float stretchedY = (stretch2d.x - stretch2d.y) * sinAngle * cosAngle * 0.5 * (position.x + translate.x)
    + (stretch2d.x * sinAngle * sinAngle + stretch2d.y * cosAngle * cosAngle)
      * 0.5 * (position.y + translate.y);

  gl_Position = projectionMatrix * (vec4(stretchedX, 0.0, stretchedY, 0.0)
    + modelViewMatrix * vec4(modelPosition, 1.0));

  vPosition = vec2(cosAngle * position.x + sinAngle * position.y,
                   -sinAngle * position.x + cosAngle * position.y);
  // Older particles fade first.
  vAlpha = sqrt(1.0 - sqrt(deltaTime / timeLength));
  // The gas thins out far from the star.
  vAlpha *= min(1.0, 1.0 - length(originPosition) / 7.0e8);
}
`;

const FRAGMENT_SHADER = /* glsl */ `
precision highp float;

uniform vec4 color;

in vec2 vPosition;
in float vAlpha;

out vec4 outColor;

void main(void) {
  // A soft disc tinted by the tail colour.
  outColor = vec4(color.rgb, 0.5 * color.a) * max(0.0, 1.0 - dot(vPosition, vPosition)) * vAlpha;
}
`;

/** Build the instanced geometry for one tail. */
export function buildCometTailGeometry(numberOfParticles: number): THREE.InstancedBufferGeometry {
  const geometry = new THREE.InstancedBufferGeometry();
  // A unit quad, wound as NASA winds it.
  geometry.setAttribute('position', new THREE.BufferAttribute(
    new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0]), 3,
  ));
  geometry.setIndex(new THREE.BufferAttribute(new Uint16Array([0, 1, 2, 2, 3, 0]), 1));

  geometry.setAttribute('originTime', new THREE.InstancedBufferAttribute(new Float32Array(numberOfParticles), 1));
  geometry.setAttribute('originPosition', new THREE.InstancedBufferAttribute(new Float32Array(numberOfParticles * 3), 3));
  geometry.setAttribute('accelerationMultiplier', new THREE.InstancedBufferAttribute(new Float32Array(numberOfParticles), 1));
  geometry.instanceCount = numberOfParticles;
  return geometry;
}

/** Build the material for one tail. */
export function buildCometTailMaterial(params: CometTailParams): THREE.RawShaderMaterial {
  return new THREE.RawShaderMaterial({
    uniforms: {
      time: { value: 0 },
      timeLength: { value: params.timeLength },
      positionInCamera: { value: new THREE.Vector3() },
      starAbsoluteMagnitude: { value: 0 },
      starAccelerationMultiplier: { value: params.starAccelerationMultiplier },
      positionOfEntity: { value: new THREE.Vector3() },
      color: { value: new THREE.Vector4(...params.color) },
    },
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
    glslVersion: THREE.GLSL3,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}

/**
 * Seed the particles across the tail's history.
 *
 * NASA spreads them evenly: particle `i` of `n` is born at
 * `now - (i / n) * timeLength`, so the tail starts fully populated instead of
 * growing in over its length on first view. `originPosition` is stamped with the
 * comet's heliocentric position, which is what the shader accelerates along —
 * leaving it zero would make `normalize(originPosition)` a 0/0.
 */
export function seedCometTail(
  geometry: THREE.InstancedBufferGeometry,
  numberOfParticles: number,
  now: number,
  timeLength: number,
  heliocentricPosition: THREE.Vector3 = new THREE.Vector3(),
): void {
  const originTime = geometry.getAttribute('originTime') as THREE.InstancedBufferAttribute;
  const originPosition = geometry.getAttribute('originPosition') as THREE.InstancedBufferAttribute;
  const accel = geometry.getAttribute('accelerationMultiplier') as THREE.InstancedBufferAttribute;
  for (let i = 0; i < numberOfParticles; i++) {
    // A tiny non-zero offset keeps the shader's normalisation well defined even
    // if the comet sits exactly at the star.
    originTime.array[i] = now - (i / numberOfParticles) * timeLength;
    originPosition.array[i * 3] = heliocentricPosition.x || 1;
    originPosition.array[i * 3 + 1] = heliocentricPosition.y || 1;
    originPosition.array[i * 3 + 2] = heliocentricPosition.z || 1;
    // NASA randomises the acceleration per particle: `0 + 1 * random()`.
    accel.array[i] = Math.random();
  }
  originTime.needsUpdate = true;
  originPosition.needsUpdate = true;
  accel.needsUpdate = true;
}
