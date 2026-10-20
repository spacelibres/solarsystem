import type { ArtworkDefinition } from './registration.js';
export interface ArtworkVectorGeometry {positions:Float32Array;colors:Float32Array;}
export function createArtworkVectorGeometry(svgText:string, artwork:Pick<ArtworkDefinition,'width'|'height'|'anchors'>, options?:{curveSegments?:number}):ArtworkVectorGeometry;
