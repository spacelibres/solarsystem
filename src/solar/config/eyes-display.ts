/** Application overrides, from eyes/src/engine/managers/TrailManager.js.
 * Factory registration colors are replaced by this palette in Eyes itself.
 */
const PLANET_ORBIT_RGB: Readonly<Record<string, readonly [number, number, number]>> = {
  mercury: [151/255,104/255,172/255], venus: [176/255,121/255,25/255],
  earth: [0,.6,.8], mars: [154/255,78/255,25/255],
  jupiter: [218/255,139/255,114/255], saturn: [213/255,193/255,135/255],
  uranus: [104/255,.8,218/255], neptune: [112/255,140/255,227/255],
};
export function eyesOrbitStyle(id: string, hovered = false, primary?: string): { rgba: readonly [number,number,number,number]; width: number } {
  // When an active VI palette is supplied, orbit strokes use its primary role.
  // Without one (tests, NASA-only rendering) the original per-body colours stay.
  if (primary) {
    const hex = primary.replace('#', '');
    if (/^[0-9a-f]{6}$/i.test(hex)) {
      const rgb = [0, 2, 4].map(offset => parseInt(hex.slice(offset, offset + 2), 16) / 255) as [number, number, number];
      return { rgba: [...rgb, hovered ? 1 : 0.6], width: hovered ? 2 : 1.2 };
    }
  }
  const rgb = PLANET_ORBIT_RGB[id];
  return { rgba: [...(rgb ?? [1,1,1]), hovered ? 1 : rgb ? .75 : .35], width: hovered ? 2 : 1.2 };
}
/** VisibleInterval.DefaultVisibleFar: normal radius [0,.02], fadeBlur .5. */
export function eyesOrbitFade(normalRadius:number):number {
  return Math.max(0,Math.min(1,(1-normalRadius/.02)/.5+1));
}
/** TrailComponent also fades when the camera approaches the trail's own body. */
export function eyesTrailFade(normalRadius:number, relativeDistance:number):number {
  return eyesOrbitFade(normalRadius)*Math.max(0,Math.min(1,1000*relativeDistance));
}
