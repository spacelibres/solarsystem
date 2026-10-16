/**
 * NASA's atmosphere shell, ported from `AtmosphereComponent`.
 *
 * This is not an approximation. The fragment program is a transcription of
 * `AtmosphereComponent._fragmentShader` from NASA's bundle, including:
 *
 *   - the ray/sphere chord integration over `numIterations = 5` samples,
 *   - the exponential density falloff `density * exp(min(r - |p|, 0) / scaleHeight)`,
 *   - the day/night `easeInOut` shaping,
 *   - the two sun-glare terms (narrow `spread 0.00004`, broad `spread 0.04`),
 *   - the sunset blend, and
 *   - `adjustOverbrightness`, which is what makes Earth's limb read brighter
 *     than a plain alpha shell.
 *
 * Two structural facts come from the vertex program and the geometry NASA
 * builds, and both matter:
 *
 *   1. The shell is scaled to `radius + scaleHeight * 20` in the vertex shader,
 *      not to a small fraction of the planet. That is why a scale height of 8 km
 *      is still visible on a 6378 km planet.
 *   2. The geometry is a 64 × 129 lat/lon grid (not an icosphere), and
 *      `gl_Position.w = viewPosition.y` pins it to the sky the same way the
 *      starfield is pinned.
 *
 * Uniform names match NASA's, so values read from the reference app can be
 * dropped in unchanged.
 */

import * as THREE from 'three';

/** Per-body atmosphere parameters, exactly as the reference app reports them. */
export interface AtmosphereParams {
  /** Particle density at the surface. */
  density: number;
  /** Exponential scale height, km. */
  scaleHeight: number;
  /** Self-luminous amount; only the Sun is non-zero. */
  emissivity: number;
  /** Base tint, linear RGB. May exceed 1 (Earth's blue is 1.5). */
  color: [number, number, number];
  /** Strength of the sun-glare terms. */
  sunBrightness: number;
  /** Colour of the sunset/horizon band. */
  sunsetColor: [number, number, number];
  /** Strength of the sunset term; 0 disables it. */
  sunsetIntensity: number;
}

/**
 * NASA's atmosphere parameters, read live from the reference app.
 *
 * Only these eight bodies have an `AtmosphereComponent`. **Mercury has none**,
 * and neither do any moons, spacecraft or small bodies.
 */
export const ATMOSPHERES: Record<string, AtmosphereParams> = {
  sun: {
    density: 8e-7, scaleHeight: 200000, emissivity: 1,
    color: [1, 1, 0.25098039215686274],
    sunBrightness: 1, sunsetColor: [1, 1, 1], sunsetIntensity: 0,
  },
  venus: {
    density: 0.001, scaleHeight: 15, emissivity: 0,
    color: [0.8352941176470589, 0.6274509803921569, 0.3686274509803922],
    sunBrightness: 0.25, sunsetColor: [1, 1, 1], sunsetIntensity: 0,
  },
  earth: {
    density: 0.0015, scaleHeight: 8, emissivity: 0,
    color: [0.8411764705882353, 1.0470588235294118, 1.5],
    sunBrightness: 2, sunsetColor: [1, 0.5, 0], sunsetIntensity: 1.2,
  },
  mars: {
    density: 0.001, scaleHeight: 10.8, emissivity: 0,
    color: [0.8823529411764706, 0.6980392156862745, 0.4392156862745098],
    sunBrightness: 0.8,
    // Mars is the only body with a non-white sunset colour.
    sunsetColor: [0.0392156862745098, 0.29411764705882354, 0.5490196078431373],
    sunsetIntensity: 1,
  },
  jupiter: {
    density: 0.00005, scaleHeight: 200, emissivity: 0,
    color: [0.9176470588235294, 0.792156862745098, 0.6666666666666666],
    sunBrightness: 0.25, sunsetColor: [1, 1, 1], sunsetIntensity: 0,
  },
  saturn: {
    density: 0.00005, scaleHeight: 200, emissivity: 0,
    color: [0.9176470588235294, 0.792156862745098, 0.592156862745098],
    sunBrightness: 1, sunsetColor: [1, 1, 1], sunsetIntensity: 0,
  },
  uranus: {
    density: 0.00005, scaleHeight: 200, emissivity: 0,
    color: [0.5764705882352941, 0.7176470588235294, 0.788235294117647],
    sunBrightness: 1,
    sunsetColor: [0.6431372549019608, 0.6588235294117647, 0.4],
    sunsetIntensity: 1,
  },
  neptune: {
    density: 0.00005, scaleHeight: 200, emissivity: 0,
    color: [0.5411764705882353, 0.6274509803921569, 1],
    sunBrightness: 1, sunsetColor: [1, 1, 1], sunsetIntensity: 0,
  },
};

/** The shell is drawn at `radius + scaleHeight * 20`; NASA's vertex constant. */
export const SCALE_HEIGHT_MULTIPLIER = 20;

/** Sample count along the view ray; `numIterations` in NASA's fragment shader. */
export const NUM_ITERATIONS = 5;

const VERTEX_SHADER = /* glsl */ `
in vec3 position;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform float scaleHeight;
uniform float equatorialRadius;
uniform float polarRadius;

out vec3 localPosition;

void main() {
  float scaleHeightMultiplier = ${SCALE_HEIGHT_MULTIPLIER.toFixed(1)};
  localPosition = vec3(
    position.x * (equatorialRadius + scaleHeight * scaleHeightMultiplier),
    position.y * (equatorialRadius + scaleHeight * scaleHeightMultiplier),
    position.z * (polarRadius + scaleHeight * scaleHeightMultiplier)
  );
  vec4 viewPosition = modelViewMatrix * vec4(localPosition, 1.);
  gl_Position = projectionMatrix * viewPosition;
  // Pin the shell to the sky, exactly as NASA does; without this the shell
  // shrinks to nothing long before the planet does.
  gl_Position.w = viewPosition.y;
}
`;

const FRAGMENT_SHADER = /* glsl */ `
precision highp float;

uniform vec3 lightPositions[5];
uniform vec3 lightColors[5];
uniform int numLights;

uniform float density;
uniform float scaleHeight;
uniform float equatorialRadius;
uniform float polarRadius;
uniform vec3 cameraPosition;
uniform vec4 entityOrientation;
uniform vec3 color;
uniform float emissivity;
uniform float sunBrightness;
uniform vec3 sunsetColor;
uniform float sunsetIntensity;

in vec3 localPosition;

out vec4 outColor;

const int numIterations = ${NUM_ITERATIONS};

vec3 quatRotInv(vec4 q, vec3 v) {
  float tx = q.w * v.x - q.y * v.z + q.z * v.y;
  float ty = q.w * v.y - q.z * v.x + q.x * v.z;
  float tz = q.w * v.z - q.x * v.y + q.y * v.x;
  float tw = q.x * v.x + q.y * v.y + q.z * v.z;
  float x = tx * q.w + tw * q.x + ty * q.z - tz * q.y;
  float y = ty * q.w + tw * q.y + tz * q.x - tx * q.z;
  float z = tz * q.w + tw * q.z + tx * q.y - ty * q.x;
  return vec3(x, y, z);
}

void getStartEndSamples(out float start, out float end, vec3 origin, vec3 direction,
                        float maxDistance, float groundRadius, float atmosphereScaleHeight) {
  float perpD = -dot(origin, direction);
  vec3 perp = origin + direction * perpD;
  float atmosphereRadius = groundRadius + atmosphereScaleHeight * 6.0;
  float chordHalfLength = sqrt(max(0.0, atmosphereRadius * atmosphereRadius - dot(perp, perp)));
  start = max(0.0, perpD - chordHalfLength);
  end = min(maxDistance, perpD + chordHalfLength);
}

float getDensity(vec3 position, float radius, float density, float atmosphereScaleHeight) {
  return density * exp(min(radius - length(position), 0.0) / atmosphereScaleHeight);
}

float easeInOut(float x, float sharpness) {
  float b = sharpness;
  if (x < 0.5) {
    return max(0.0, (pow(b, 2.0 * x) - 1.0) / (2.0 * (b - 1.0)));
  }
  return min(1.0, 1.0 - (pow(b, 2.0 * (1.0 - x)) - 1.0) / (2.0 * (b - 1.0)));
}

vec3 adjustOverbrightness(vec3 c) {
  float maxColor = max(c.r, max(c.g, c.b));
  if (maxColor > 1.0) {
    c.r = min(1.0, pow(c.r / maxColor, 1.0 / maxColor));
    c.g = min(1.0, pow(c.g / maxColor, 1.0 / maxColor));
    c.b = min(1.0, pow(c.b / maxColor, 1.0 / maxColor));
  }
  return c;
}

float glow(float spread, float amount, float lightDotCamera) {
  return amount * spread / (1.0 + spread - lightDotCamera);
}

vec4 getEmissiveColor(float totalDensity, vec3 cameraPositionS, vec3 color, float emissivity) {
  vec4 emissiveColor;
  emissiveColor.a = emissivity * clamp(totalDensity, 0.0, 1.0);
  emissiveColor.rgb = emissivity * color
    * clamp(pow(15.0 * totalDensity / (density * equatorialRadius), 0.2), 0.75, 1.0);
  emissiveColor.a = mix(emissiveColor.a, emissivity,
    getDensity(cameraPositionS, equatorialRadius + scaleHeight, 1.0, 2.0 * scaleHeight));
  emissiveColor.a = clamp(emissiveColor.a, 0.0, 1.0);
  return emissiveColor;
}

vec4 getColor(float totalDensity, vec3 lightColor, vec3 lightPosition, float spheroidRatio,
              vec3 positionS, vec3 cameraPositionS, vec3 cameraToPositionUnit) {
  vec4 atmosphereColor = getEmissiveColor(totalDensity, cameraPositionS, lightColor * color, 1.0);
  atmosphereColor.a *= length(lightColor) / sqrt(3.0);

  highp vec3 lightPositionS = quatRotInv(entityOrientation, lightPosition);
  lightPositionS.z *= spheroidRatio;
  highp vec3 lightToPosition = positionS - lightPositionS;
  highp vec3 lightToPositionUnit = normalize(lightToPosition / 1.0e8);

  vec3 dayRefUp = normalize(cameraPositionS - min(0.0, dot(cameraPositionS, cameraToPositionUnit)) * cameraToPositionUnit);
  float dayLevel = -dot(lightToPositionUnit, dayRefUp);
  atmosphereColor.rgb *= easeInOut(0.5 + 2.0 * dayLevel, 2.0);
  atmosphereColor.a *= easeInOut(1.0 + 2.0 * dayLevel, 2.0);

  float lightDotCamera = max(0.0, -dot(lightToPositionUnit, cameraToPositionUnit));
  atmosphereColor.a = clamp(atmosphereColor.a * (1.0 + glow(0.004, 1.0, lightDotCamera)), 0.0, 1.0);

  atmosphereColor.rgb *= lightColor * (1.0 + sunBrightness * atmosphereColor.a * glow(0.00004, 1.0, lightDotCamera));
  atmosphereColor.rgb *= lightColor * (1.0 + sunBrightness * atmosphereColor.a * glow(0.04, 0.125, lightDotCamera));

  float lightDotHorizon = pow(clamp(1.0 - dot(lightToPositionUnit, dayRefUp), 0.0, 1.0), 2.0);
  float cameraDotHorizon = pow(clamp(1.0 - dot(cameraToPositionUnit, dayRefUp), 0.0, 1.0), 8.0);
  float sunsetAmount = sunsetIntensity * lightDotHorizon * cameraDotHorizon * glow(0.04, 0.5, lightDotCamera);
  atmosphereColor.rgb = mix(atmosphereColor.rgb, sunsetColor, clamp(sunsetAmount, 0.0, 1.0));

  return atmosphereColor;
}

void main(void) {
  float spheroidRatio = equatorialRadius / polarRadius;
  highp vec3 positionS = localPosition;
  highp vec3 cameraPositionS = cameraPosition;
  positionS.z *= spheroidRatio;
  cameraPositionS.z *= spheroidRatio;

  highp vec3 cameraToPosition = positionS - cameraPositionS;
  float cameraToPositionDist = length(cameraToPosition / 1.0e8) * 1.0e8;
  highp vec3 cameraToPositionUnit = cameraToPosition / cameraToPositionDist;

  float start;
  float end;
  getStartEndSamples(start, end, cameraPositionS, cameraToPositionUnit, 1.0e24, equatorialRadius, scaleHeight);
  float fracPerStep = 1.0 / float(numIterations - 1);
  float stepDist = fracPerStep * (end - start);

  float totalDensity = 0.0;
  float segmentStart = start;
  for (int j = 0; j < numIterations; j++) {
    float segDist = stepDist;
    if (j == 0 || j == numIterations - 1) segDist *= 0.5;
    vec3 p = cameraPositionS + segmentStart * cameraToPositionUnit;
    totalDensity += getDensity(p, equatorialRadius, density, scaleHeight) * segDist;
    segmentStart += stepDist;
  }

  outColor = vec4(0.0);
  outColor += getEmissiveColor(totalDensity, cameraPositionS, color, emissivity);

  for (int i = 0; i < 5; i++) {
    if (i >= numLights) break;
    if (length(lightPositions[i]) > 0.0) {
      outColor += getColor(totalDensity, lightColors[i], lightPositions[i], spheroidRatio,
                           positionS, cameraPositionS, cameraToPositionUnit);
    }
  }

  outColor.rgb = adjustOverbrightness(outColor.rgb);
}
`;

/**
 * Build NASA's 64 × 129 lat/lon atmosphere sphere.
 *
 * The vertex layout and triangle indices are the ones NASA constructs:
 * 64 latitude rows × 129 longitude columns, two triangles per quad, wound as
 * (t+0,n+0) (t+1,n+0) (t+1,n+1) / (t+0,n+0) (t+1,n+1) (t+0,n+1).
 */
export function buildAtmosphereGeometry(): THREE.BufferGeometry {
  const ROWS = 64;
  const COLS = 129;
  const positions = new Float32Array(ROWS * COLS * 3);
  const indices = new Uint16Array((ROWS - 1) * (COLS - 1) * 6);

  const latStep = Math.PI / 63;
  const lonStep = (2 * Math.PI) / 128;

  for (let r = 0; r < ROWS; r++) {
    const lat = r * latStep - Math.PI / 2;
    const cosLat = Math.cos(lat);
    const sinLat = Math.sin(lat);
    for (let c = 0; c < COLS; c++) {
      const lon = c * lonStep - Math.PI;
      // Row-major over COLS columns — NASA writes `129 * t + n`.
      const i = COLS * r + c;
      positions[3 * i + 0] = cosLat * Math.cos(lon);
      positions[3 * i + 1] = cosLat * Math.sin(lon);
      positions[3 * i + 2] = sinLat;
    }
  }
  let d = 0;
  for (let r = 0; r < ROWS - 1; r++) {
    for (let c = 0; c < COLS - 1; c++) {
      indices[6 * d + 0] = COLS * (r + 0) + (c + 0);
      indices[6 * d + 1] = COLS * (r + 1) + (c + 0);
      indices[6 * d + 2] = COLS * (r + 1) + (c + 1);
      indices[6 * d + 3] = COLS * (r + 0) + (c + 0);
      indices[6 * d + 4] = COLS * (r + 1) + (c + 1);
      indices[6 * d + 5] = COLS * (r + 0) + (c + 1);
      d++;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  return geometry;
}

/**
 * Build the atmosphere material for a body.
 *
 * `lightPosition` is filled per frame by the scene (the Sun's position in the
 * body's local frame); `cameraPosition` likewise. Everything else is static.
 */
export function buildAtmosphereMaterial(
  params: AtmosphereParams,
  equatorialRadius: number,
  polarRadius: number,
): THREE.RawShaderMaterial {
  return new THREE.RawShaderMaterial({
    uniforms: {
      lightPositions: { value: [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)] },
      lightColors: { value: [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)] },
      numLights: { value: 0 },
      density: { value: params.density },
      scaleHeight: { value: params.scaleHeight },
      emissivity: { value: params.emissivity },
      equatorialRadius: { value: equatorialRadius },
      polarRadius: { value: polarRadius },
      cameraPosition: { value: new THREE.Vector3(1, 0, 0) },
      entityOrientation: { value: new THREE.Vector4(1, 0, 0, 0) },
      color: { value: new THREE.Vector3(...params.color) },
      sunBrightness: { value: params.sunBrightness },
      sunsetColor: { value: new THREE.Vector3(...params.sunsetColor) },
      sunsetIntensity: { value: params.sunsetIntensity },
    },
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
    glslVersion: THREE.GLSL3,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
  });
}
