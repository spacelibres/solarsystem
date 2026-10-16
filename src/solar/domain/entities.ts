import { applySourceControllers, type SourceControllerPlan } from './controllers';
import type { Quat, Vec3 } from '../../lib/dynamo/math';
export interface EntityPhase {
    readonly startEt: number;
    readonly parentId: string | null;
    readonly positionPath?: string;
    readonly positionPaths?: readonly string[];
    readonly orientationPath?: string;
    readonly orientationPaths?: readonly string[];
    readonly body?: 1 | 2;
}
export interface EntityDefinition {
    readonly id: string;
    readonly phases: readonly EntityPhase[];
    readonly controllers?: readonly SourceControllerPlan[];
    readonly allowUnknownOrientation?: boolean;
    readonly staticPosition?: Vec3;
    readonly staticOrientation?: Quat;
}
export interface LocalEntityState {
    readonly position?: Vec3;
    readonly velocity?: Vec3;
    readonly orientation?: Quat;
}
export type EntityUnavailableReason = 'inactive' | 'no-phase' | 'missing-local' | 'missing-orientation' | 'invalid-state' | 'missing-parent' | 'parent-unavailable' | 'cycle';
export type EntityFrame = {
    readonly status: 'ready';
    readonly id: string;
    readonly parentId: string | null;
    readonly phaseIndex: number;
    readonly position: Vec3;
    readonly velocity: Vec3;
    readonly orientation: Quat | null;
} | {
    readonly status: 'unavailable';
    readonly id: string;
    readonly parentId: string | null;
    readonly phaseIndex: number;
    readonly reason: EntityUnavailableReason;
};
const finiteVector = (v: Vec3): boolean => Number.isFinite(v.x) && Number.isFinite(v.y) && Number.isFinite(v.z);
const finiteOrientation = (q: Quat): boolean => finiteVector(q) && Number.isFinite(q.w) && Math.abs(q.x * q.x + q.y * q.y + q.z * q.z + q.w * q.w - 1) < 1e-6;
/** 时间段起点是 ET；正放、倒放与跳转必须共用同一次区间查询。 */
export function activePhaseIndex(phases: readonly EntityPhase[], timeEt: number): number {
    if (!Number.isFinite(timeEt))
        throw new Error('Entity time must be finite');
    let previous = -Infinity;
    for (const phase of phases) {
        if (!Number.isFinite(phase.startEt) || phase.startEt <= previous)
            throw new Error('Entity phase starts must be finite and strictly increasing');
        previous = phase.startEt;
    }
    let lower = 0;
    let upper = phases.length;
    while (lower < upper) {
        const middle = Math.floor((lower + upper) / 2);
        if (phases[middle].startEt <= timeEt)
            lower = middle + 1;
        else
            upper = middle;
    }
    return lower - 1;
}
/**
 * Eyes 的普通实体位置是沿世界轴的父相对平移，不是 Object3D 的旋转局部空间。
 * 姿态已由控制器求出，不能再无条件乘父姿态；未知数据保留为不可用状态。
 */
export function resolveEntityFrames(definitions: readonly EntityDefinition[], localStates: ReadonlyMap<string, LocalEntityState>, timeEt: number): ReadonlyMap<string, EntityFrame> {
    if (!Number.isFinite(timeEt))
        throw new Error('Entity time must be finite');
    const definitionsById = new Map<string, EntityDefinition>();
    const phaseIndices = new Map<string, number>();
    for (const definition of definitions) {
        if (!definition.id.trim())
            throw new Error('Entity id cannot be empty');
        if (definitionsById.has(definition.id))
            throw new Error(`Duplicate entity id: ${definition.id}`);
        definitionsById.set(definition.id, definition);
        phaseIndices.set(definition.id, activePhaseIndex(definition.phases, timeEt));
    }
    const frames = new Map<string, EntityFrame>();
    const stack: string[] = [];
    const visiting = new Map<string, number>();
    const unavailable = (id: string, reason: EntityUnavailableReason): EntityFrame => {
        const phaseIndex = phaseIndices.get(id) ?? -1;
        const parentId = definitionsById.get(id)?.phases[phaseIndex]?.parentId ?? null;
        return { status: 'unavailable', id, phaseIndex, parentId, reason };
    };
    const resolve = (id: string): EntityFrame => {
        const cached = frames.get(id);
        if (cached)
            return cached;
        const cycleStart = visiting.get(id);
        if (cycleStart !== undefined) {
            for (const member of stack.slice(cycleStart))
                frames.set(member, unavailable(member, 'cycle'));
            return frames.get(id)!;
        }
        const definition = definitionsById.get(id)!;
        const phaseIndex = phaseIndices.get(id)!;
        if (phaseIndex < 0) {
            const frame = unavailable(id, 'no-phase');
            frames.set(id, frame);
            return frame;
        }
        const phase = definition.phases[phaseIndex];
        const local = localStates.get(id);
        let position = local?.position ?? ((phase.positionPath || phase.positionPaths?.length) ? undefined : definition.staticPosition);
        let velocity = local?.velocity ?? { x: 0, y: 0, z: 0 };
        let orientation = local?.orientation ?? ((phase.orientationPath || phase.orientationPaths?.length) ? null : definition.staticOrientation ?? null);
        visiting.set(id, stack.length);
        stack.push(id);
        let parentFrame: EntityFrame | undefined;
        if (phase.parentId && definitionsById.has(phase.parentId))
            parentFrame = resolve(phase.parentId);
        if (!parentFrame || parentFrame.status === 'ready') {
            const parentPosition = parentFrame?.status === 'ready' ? parentFrame.position : { x: 0, y: 0, z: 0 };
            const provisionalFrame = (): EntityFrame | undefined => position ? {
                status: 'ready', id, phaseIndex, parentId: phase.parentId,
                position: { x: position.x + parentPosition.x, y: position.y + parentPosition.y, z: position.z + parentPosition.z },
                velocity: {
                    x: velocity.x + (parentFrame?.status === 'ready' ? parentFrame.velocity.x : 0),
                    y: velocity.y + (parentFrame?.status === 'ready' ? parentFrame.velocity.y : 0),
                    z: velocity.z + (parentFrame?.status === 'ready' ? parentFrame.velocity.z : 0),
                }, orientation,
            } : undefined;
            const controlled = applySourceControllers(definition.controllers, { position, velocity, ...(orientation ? { orientation } : {}) }, { x: (position?.x ?? 0) + parentPosition.x, y: (position?.y ?? 0) + parentPosition.y, z: (position?.z ?? 0) + parentPosition.z }, phase.parentId, timeEt, targetId => targetId === id ? provisionalFrame() : definitionsById.has(targetId) ? resolve(targetId) : undefined);
            position = controlled.position;
            velocity = controlled.velocity ?? { x: 0, y: 0, z: 0 };
            orientation = controlled.orientation ?? null;
        }
        stack.pop();
        visiting.delete(id);
        const cycleFrame = frames.get(id);
        if (cycleFrame)
            return cycleFrame;
        let frame: EntityFrame;
        if (phase.parentId && !definitionsById.has(phase.parentId))
            frame = unavailable(id, 'missing-parent');
        else if (parentFrame?.status === 'unavailable')
            frame = unavailable(id, 'parent-unavailable');
        else if (!position)
            frame = unavailable(id, 'missing-local');
        else if (!definition.allowUnknownOrientation && (phase.orientationPath || phase.orientationPaths?.length) && orientation === null)
            frame = unavailable(id, 'missing-orientation');
        else if (!finiteVector(position) || !finiteVector(velocity) || (orientation !== null && !finiteOrientation(orientation)))
            frame = unavailable(id, 'invalid-state');
        else {
            const parentPosition = parentFrame?.status === 'ready' ? parentFrame.position : { x: 0, y: 0, z: 0 };
            const parentVelocity = parentFrame?.status === 'ready' ? parentFrame.velocity : { x: 0, y: 0, z: 0 };
            const worldPosition = { x: position.x + parentPosition.x, y: position.y + parentPosition.y, z: position.z + parentPosition.z };
            const worldVelocity = { x: velocity.x + parentVelocity.x, y: velocity.y + parentVelocity.y, z: velocity.z + parentVelocity.z };
            frame = !finiteVector(worldPosition) || !finiteVector(worldVelocity) ? unavailable(id, 'invalid-state') : {
                status: 'ready', id, phaseIndex, parentId: phase.parentId,
                position: worldPosition, velocity: worldVelocity,
                orientation: orientation ? { ...orientation } : null,
            };
        }
        frames.set(id, frame);
        return frame;
    };
    for (const definition of definitions)
        resolve(definition.id);
    return frames;
}
