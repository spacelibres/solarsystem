import type { ExplorerBodyDefinition } from '../config/default-scene';
import { activePhaseIndex } from '../domain/entities';
export type SceneMode = 'overview' | 'system' | 'body';
export type CatalogFilter = 'all' | 'planets' | 'moons' | 'earth-satellites' | 'spacecraft' | 'small-bodies';
export function searchBodies(bodies: readonly ExplorerBodyDefinition[], query: string, filter: CatalogFilter): readonly ExplorerBodyDefinition[] {
    const text = query.trim().toLowerCase();
    const matches = bodies.filter(body => {
        const groups = body.groups ?? [];
        const matches = filter === 'all' || filter === 'earth-satellites' && groups.includes('spacecraft') && groups.includes('earth') || filter === 'small-bodies' && (groups.includes('asteroids') || groups.includes('comets') || groups.includes('dwarf_planets')) || groups.includes(filter);
        return matches && `${body.id} ${body.label} ${body.category ?? ''}`.toLowerCase().includes(text);
    });
    if (!text) return matches;
    const rank = (body: ExplorerBodyDefinition): number => {
        const names = [body.id.toLowerCase(), body.label.toLowerCase()];
        if (names.includes(text)) return 0;
        if (names.some(name => name.startsWith(text))) return 1;
        return names.some(name => name.includes(text)) ? 2 : 3;
    };
    return matches.sort((a, b) => rank(a) - rank(b));
}
/** This is a visibility request; the runtime adds actual parent and attitude dependencies. */
export function visibleSystemIds(bodies: readonly ExplorerBodyDefinition[], selectedId: string, mode: SceneMode, timeEt = Number.MAX_VALUE, expandedParentIds: readonly string[] = []): readonly string[] {
    const byId = new Map(bodies.map(body => [body.id, body]));
    const parentOf = (body: ExplorerBodyDefinition): string | null => body.phases[activePhaseIndex(body.phases, timeEt)]?.parentId ?? null;
    const ids = new Set(bodies.filter(body => body.id === 'sun' || body.id === 'moon' || body.groups?.includes('planets')).map(body => body.id));
    ids.add(selectedId);
    const expanded = new Set(expandedParentIds);
    if (mode !== 'overview') expanded.add(selectedId);
    for (const body of bodies) {
        const parentId = parentOf(body);
        if (parentId === 'sun' && !body.groups?.some(group => ['planets','spacecraft'].includes(group))) continue;
        // BaseApp disables the small-body layers initially; explicit focus remains visible.
        if (body.groups?.some(group => ['asteroids','comets','dwarf_planets'].includes(group))) continue;
        if (parentId && expanded.has(parentId)) ids.add(body.id);
    }
    // Keep physical surroundings when zooming out of a close view. The runtime
    // already loads parents; visibility must not hide those resolved ancestors.
    const pending = [...ids], visited = new Set<string>();
    while (pending.length) {
        const id = pending.pop()!;
        if (visited.has(id)) continue;
        visited.add(id);
        const body = byId.get(id), parentId = body ? parentOf(body) : null;
        if (parentId && byId.has(parentId)) {
            ids.add(parentId); pending.push(parentId);
        }
    }
    return bodies.filter(body => ids.has(body.id)).map(body => body.id);
}

/** SceneManager._isEntityVisibleWithinParent uses a twenty-pixel system radius. */
export function projectedSystemVisible(radiusKm: number, systemRadiusKm: number | undefined, distanceKm: number, fovRadians: number, viewportHeight: number, threshold = 20): boolean {
    const systemRadius = systemRadiusKm || 25 * radiusKm;
    if (!Number.isFinite(systemRadius) || systemRadius <= 0 || !Number.isFinite(distanceKm) || distanceKm < 0 || !Number.isFinite(fovRadians) || fovRadians <= 0 || fovRadians >= Math.PI || !Number.isFinite(viewportHeight) || viewportHeight <= 0 || !Number.isFinite(threshold) || threshold <= 0) return false;
    if (distanceKm === 0) return true;
    return systemRadius * viewportHeight / (2 * Math.tan(fovRadians / 2) * distanceKm) >= threshold;
}
