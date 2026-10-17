import type { ModelDescriptor } from '../render/models';
import type { EntityDefinition } from '../domain/entities';
import type { SourceTrailOptions } from '../domain/trails';
export interface ExplorerBodyDefinition extends EntityDefinition {
    readonly label: string;
    readonly radiusKm: number;
    readonly polarRadiusKm?: number;
    readonly planetographic?: boolean;
    readonly kind: 'star' | 'spheroid' | 'marker' | 'model';
    readonly groups?: readonly string[];
    readonly trail?: SourceTrailOptions;
    readonly category?: string;
    readonly sourceCategory?: string;
    readonly sourceSubcategory?: string;
    readonly systemRadiusKm?: number;
    readonly model?: ModelDescriptor;
    readonly diagnostics?: readonly string[];
    readonly texture?: {
        readonly url: string;
        readonly sizes: number[];
    };
    readonly source: string;
}
// This curated slice uses the actual spheroid radii and explicit source controllers.
// The Sun is the heliocentric root; Galactic translation is outside this viewer.
export const DEFAULT_SCENE: readonly ExplorerBodyDefinition[] = [
    {
        id: 'sun', label: 'Sun', kind: 'star', radiusKm: 695500, polarRadiusKm: 695500, planetographic: false,
        phases: [{ startEt: -1e18, parentId: null }],
        staticPosition: { x: 0, y: 0, z: 0 }, staticOrientation: { w: 1, x: 0, y: 0, z: 0 },
        texture: { url: 'sun/color_$SIZE_$FACE.png', sizes: [4, 512] },
        source: 'eyes/src/engine/core/Unidentified695.js#sun (explicit heliocentric root)',
    },
    {
        id: 'earth', label: 'Earth', kind: 'spheroid', radiusKm: 6378.137, polarRadiusKm: 6356.752, planetographic: true,
        phases: [{ startEt: -1e18, parentId: 'sun', positionPath: 'earth/sun/orb/def.dyn', orientationPath: 'earth/ori/def.dyn' }],
        texture: { url: 'earth/color_$SIZE_$FACE.png', sizes: [16, 512, 4096] },
        source: 'eyes/src/engine/core/Unidentified695.js#earth',
    },
    {
        id: 'moon', label: 'Moon', kind: 'spheroid', radiusKm: 1737.4, polarRadiusKm: 1737.4, planetographic: true,
        phases: [{ startEt: -1e18, parentId: 'earth', positionPath: 'moon/earth/orb/def.dyn', orientationPath: 'moon/ori/def.dyn' }],
        texture: { url: 'moon/color_$SIZE_$FACE.png', sizes: [16, 512, 4096] },
        source: 'eyes/src/engine/core/EntityEntry-699.js#moon',
    },
    {
        id: 'jupiter', label: 'Jupiter', kind: 'spheroid', radiusKm: 71492, polarRadiusKm: 66854, planetographic: false,
        phases: [{ startEt: -1e18, parentId: 'sun', positionPath: 'jupiter/sun/orb/def.dyn', orientationPath: 'jupiter/ori/def.dyn' }],
        texture: { url: 'jupiter/color_$SIZE_$FACE.jpg', sizes: [16, 512, 4096] },
        source: 'eyes/src/engine/core/Unidentified695.js#jupiter',
    },
    {
        id: 'saturn', label: 'Saturn', kind: 'spheroid', radiusKm: 60268, polarRadiusKm: 54364, planetographic: false,
        phases: [{ startEt: -1e18, parentId: 'sun', positionPath: 'saturn/sun/orb/def.dyn', orientationPath: 'saturn/ori/def.dyn' }],
        texture: { url: 'saturn/color_$SIZE_$FACE.png', sizes: [4, 512] },
        source: 'eyes/src/engine/core/Unidentified695.js#saturn',
    },
    {
        id: 'sc_voyager_1', label: 'Voyager 1', kind: 'marker', radiusKm: 0.0043,
        phases: [
            { startEt: -704412035.617, parentId: 'earth', positionPath: 'sc_voyager_1/earth/def.dyn' },
            { startEt: -703530245, parentId: 'sun', positionPath: 'sc_voyager_1/sun/1/def.dyn' },
            { startEt: -660264745, parentId: 'jupiter', positionPath: 'sc_voyager_1/jupiter/def.dyn' },
            { startEt: -655057463, parentId: 'sun', positionPath: 'sc_voyager_1/sun/2/def.dyn' },
            { startEt: -606239665, parentId: 'saturn', positionPath: 'sc_voyager_1/saturn/def.dyn' },
            { startEt: -600733702, parentId: 'sun', positionPath: 'sc_voyager_1/sun/3/def.dyn' },
        ],
        // Source model attitude additionally composes Earth alignment and ori; a marker claims neither.
        source: 'eyes/src/engine/core/Unidentified712.js#sc_voyager_1 (extents radius, position marker)',
    },
];
