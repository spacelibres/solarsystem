export interface ArtworkAnchor { readonly pixel: readonly number[]; readonly direction: readonly number[]; readonly hip?: number; }
export interface ArtworkDefinition { readonly renderMode?: 'vector'|'texture'; readonly id: string; readonly name: string; readonly file: string; readonly width: number; readonly height: number; readonly anchors: readonly ArtworkAnchor[]; readonly covers: readonly string[]; }
export interface ArtworkCatalogue { readonly schemaVersion: 1; readonly frame: 'ICRS/J2000'; readonly artworks: readonly ArtworkDefinition[]; }
export function createRegistration(anchors: readonly ArtworkAnchor[]): (x: number,y: number)=>number[];
export function createArtworkPatch(artwork: Pick<ArtworkDefinition,'width'|'height'|'anchors'>,subdivisions?: number): {positions:Float32Array;uvs:Float32Array;indices:Uint16Array};
