import sourceCatalog from './catalog.generated.json';
import type { SourceModelAnimationPlan } from '../domain/model-animation';
import type { CatalogEntry, SourceController, SourceTime, StaticValue } from './catalog-types';
import type { ExplorerBodyDefinition } from './default-scene';
import type { EntityPhase } from '../domain/entities';
import type { SourceAlignAxis, SourceControllerPlan } from '../domain/controllers';
import type { ModelDescriptor } from '../render/models';
import type { Quat, Vec3 } from '../../lib/dynamo/math';
import type { SourceTrailOptions } from '../domain/trails';
const entries = sourceCatalog.entries as unknown as CatalogEntry[];
const vector = (value: StaticValue | undefined): Vec3 | undefined => Array.isArray(value) && value.length === 3 && value.every(item => typeof item === 'number') ? { x: value[0] as number, y: value[1] as number, z: value[2] as number } : undefined;
const quaternion = (value: StaticValue | undefined): Quat | undefined => Array.isArray(value) && value.length === 4 && value.every(item => typeof item === 'number') ? { w: value[0] as number, x: value[1] as number, y: value[2] as number, z: value[3] as number } : undefined;
const time = (value: SourceTime): number => value === '-Infinity' ? -1e18 : value === 'Infinity' ? 1e18 : value;
const isAttitude = (url: string) => /(?:^|\/)(?:ori|quat)(?:\/|$)/.test(url);
function axis(value: StaticValue | undefined): SourceAlignAxis | undefined {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        return;
    const direction = vector(value.axis), type = value.type;
    if (!direction || !['none', 'point', 'align', 'velocity', 'position'].includes(String(type)))
        return;
    return { type: type as SourceAlignAxis['type'], axis: direction, ...(typeof value.target === 'string' ? { targetId: value.target } : {}), ...(vector(value.targetAxis) ? { targetAxis: vector(value.targetAxis) } : {}) };
}
function plan(controller: SourceController): SourceControllerPlan | undefined {
    const coverage = controller.coverage ? [time(controller.coverage[0]), time(controller.coverage[1])] as const : undefined;
    if (controller.joint)
        return;
    if (controller.type === 'dynamo')
        return controller.url && isAttitude(controller.url) ? { type: 'dynamoOrientation', coverage } : undefined;
    if (controller.type === 'coverage')
        return;
    if (controller.joint)
        return; // Joint articulation is retained in the manifest, never applied to the whole craft.
    if (controller.type === 'fixed') {
        const position = vector(controller.position), orientation = quaternion(controller.orientation);
        return position || orientation ? { type: 'fixed', position, orientation, coverage } : { type: 'unsupported', sourceType: 'fixed surface location', coverage };
    }
    if (controller.type === 'align') {
        const primary = axis(controller.primary), secondary = axis(controller.secondary);
        return primary ? { type: 'align', primary, secondary, coverage } : { type: 'unsupported', sourceType: 'align', coverage };
    }
    if (controller.type === 'rotateByEntityOrientation')
        return { type: 'rotateByEntityOrientation', targetId: typeof controller.entityForOrientation === 'string' ? controller.entityForOrientation : undefined, rotatingPosition: typeof controller.rotatingPosition === 'boolean' ? controller.rotatingPosition : undefined, rotatingOrientation: typeof controller.rotatingOrientation === 'boolean' ? controller.rotatingOrientation : undefined, coverage };
    if (controller.type === 'spin' && typeof controller.relativeToTime === 'number' && typeof controller.periodInHours === 'number' && vector(controller.axis))
        return { type: 'spin', axis: vector(controller.axis)!, rate: 2 * Math.PI / (controller.periodInHours * 3600), referenceTime: typeof controller.relativeToTime === 'number' ? controller.relativeToTime : 0, axisRelativeToEntity: controller.axisInFrameSpace !== false, coverage };
    return { type: 'unsupported', sourceType: controller.type ?? 'custom', coverage };
}
function model(entry: CatalogEntry): ModelDescriptor | undefined {
    const value = entry.model;
    if (!value?.url)
        return;
    const rotate = value.rotate?.flatMap<{
        x: number;
    } | {
        y: number;
    } | {
        z: number;
    }>(rotation => typeof rotation.x === 'number' ? [{ x: rotation.x }] : typeof rotation.y === 'number' ? [{ y: rotation.y }] : typeof rotation.z === 'number' ? [{ z: rotation.z }] : []);
    const scale = typeof value.scale === 'number' ? value.scale : Array.isArray(value.scale) && value.scale.length === 3 ? value.scale as [
        number,
        number,
        number
    ] : undefined;
    return { url: value.url.replace('$STATIC_ASSETS_URL', 'https://eyes.nasa.gov/assets/static'), rotate, scale, translate: vector(value.translate) };
}
function sortedParents(entry: CatalogEntry): [
    number,
    string
][] {
    const parents = entry.parents.map(([start, parent]) => [time(start), parent] as [
        number,
        string
    ]).sort((a, b) => a[0] - b[0]);
    const result: [
        number,
        string
    ][] = [];
    for (let index = 0; index < parents.length;) {
        let end = index + 1;
        while (end < parents.length && parents[end][0] === parents[index][0])
            end++;
        result.push(parents[index]);
        if (end - index > 1) {
            // Source Sort retains equal starts: first wins at exact equality, last immediately afterwards.
            const bytes = new DataView(new ArrayBuffer(8));
            bytes.setFloat64(0, parents[index][0]);
            const bits = bytes.getBigUint64(0);
            bytes.setBigUint64(0, parents[index][0] >= 0 ? bits + 1n : bits - 1n);
            result.push([bytes.getFloat64(0), parents[end - 1][1]]);
        }
        index = end;
    }
    return result;
}
function definition(entry: CatalogEntry): ExplorerBodyDefinition {
    const dynamics = entry.controllers.filter(controller => controller.type === 'dynamo' && controller.url && !controller.joint);
    const positionControllers = dynamics.filter(controller => !isAttitude(controller.url!));
    const orientations = dynamics.filter(controller => isAttitude(controller.url!)).map(controller => `${controller.url}/def.dyn`);
    const phases: EntityPhase[] = sortedParents(entry).map(([start, parentId]) => {
        // Select candidates by declared reference body, then let real binary coverage resolve repeated-parent phases.
        const matching = positionControllers.filter(controller => controller.url!.split('/')[1] === parentId);
        const candidates = matching.length ? matching : positionControllers.filter(controller => entry.parents.length === 1 || controller.url!.split('/').length === 1);
        const barycenter = candidates.find(controller => controller.parentIsBarycenter !== undefined);
        return { startEt: time(start), parentId: parentId || null, positionPaths: candidates.map(controller => `${controller.url}/def.dyn`), orientationPaths: orientations, body: barycenter ? 1 : undefined };
    });
    const color = entry.spheroidLOD?.textures;
    const textures = color && typeof color === 'object' && !Array.isArray(color) ? color.color : undefined;
    const texture = textures && typeof textures === 'object' && !Array.isArray(textures) && typeof textures.url === 'string' && Array.isArray(textures.sizes) ? { url: textures.url, sizes: textures.sizes.filter((size): size is number => typeof size === 'number') } : undefined;
    const mesh = model(entry);
    const fixed = entry.controllers.find(controller => controller.type === 'fixed' && !controller.coverage && vector(controller.position));
    return {
        id: entry.id, label: entry.label ?? entry.id, groups: entry.groups, category: entry.groups.includes('spacecraft') ? 'Spacecraft' : entry.groups.includes('moons') ? 'Moon' : entry.groups.includes('planets') ? 'Planet' : 'Other',
        sourceCategory: entry.sourceCategory, sourceSubcategory: entry.sourceSubcategory,
        radiusKm: entry.spheroid?.equatorialRadius ?? entry.extentsRadius ?? entry.radius ?? .00001, polarRadiusKm: entry.spheroid?.polarRadius, planetographic: entry.spheroid?.planetographic,
        systemRadiusKm: entry.systemRadius, kind: mesh ? 'model' : entry.spheroid ? 'spheroid' : 'marker', model: mesh, texture, phases,
        modelAnimations: entry.modelAnimations?.flatMap(value => {
            const direction = vector(value.axis);
            return value.type === 'spin' && typeof value.joint === 'string' && direction && typeof value.rate === 'number' ? [{ ...value, type:'spin', joint:value.joint, axis:direction, rate:value.rate, coverage:Array.isArray(value.coverage) ? [time(value.coverage[0] as SourceTime), time(value.coverage[1] as SourceTime)] : undefined } as SourceModelAnimationPlan] : [];
        }),
        jointControllers: entry.controllers.flatMap(controller => { const joint = controller.joint; if(typeof joint !== 'string')return []; const value=plan({...controller,joint:undefined});return value ? [{joint,controller:value}] : []; }),
        trail: entry.trail ? sourceTrail(entry.trail) : undefined,
        staticPosition: fixed ? vector(fixed.position) : undefined,
        allowUnknownOrientation: !!mesh,
        controllers: entry.controllers.flatMap(controller => { const value = plan(controller); const result: SourceControllerPlan[] = value ? [value] : []; if (controller.type === 'fixed' && typeof controller.relativeToEntity === 'string')
            result.push({ type: 'rotateByEntityOrientation', targetId: controller.relativeToEntity, coverage: controller.coverage ? [time(controller.coverage[0]), time(controller.coverage[1])] : undefined }); return result; }),
        source: `${entry.provenance.file}:${entry.provenance.line}`,
        diagnostics: entry.diagnostics.map(diagnostic => diagnostic.reason),
    };
}
function sourceTrail(value: NonNullable<CatalogEntry['trail']>): SourceTrailOptions {
    const color = value.color;
    return {
        length: typeof value.length === 'number' ? value.length : undefined,
        color: Array.isArray(color) && color.length === 4 && color.every(item => typeof item === 'number') ? color as [number, number, number, number] : undefined,
        relativeTo: typeof value.relativeTo === 'string' ? value.relativeTo : undefined,
        relativeToOrientation: value.relativeToOrientation === true,
        lengthCoverages: Array.isArray(value.lengthCoverages) ? value.lengthCoverages.flatMap(item => {
            if (!Array.isArray(item) || item.length !== 3 || typeof item[0] !== 'number') return [];
            const isTime = (part: StaticValue): part is SourceTime => typeof part === 'number' || part === '-Infinity' || part === 'Infinity';
            return isTime(item[1]) && isTime(item[2]) ? [[item[0], time(item[1]), time(item[2])] as [number, number, number]] : [];
        }) : undefined,
    };
}
export const FULL_SCENE: readonly ExplorerBodyDefinition[] = entries.filter(entry => !['sun', 'milky_way', 'observable_universe'].includes(entry.id)).map(definition);
// The application is heliocentric, so the galactic source controller is deliberately outside this scene.
(FULL_SCENE as ExplorerBodyDefinition[]).unshift({ id: 'sun', label: 'Sun', groups: ['stars'], kind: 'star', radiusKm: 695500, systemRadiusKm: 7.5e9, phases: [{ startEt: -1e18, parentId: null }], staticPosition: { x: 0, y: 0, z: 0 }, staticOrientation: { w: 1, x: 0, y: 0, z: 0 }, texture: { url: 'sun/color_$SIZE_$FACE.png', sizes: [4, 512] }, source: 'eyes/src/engine/core/Unidentified695.js#sun' });
