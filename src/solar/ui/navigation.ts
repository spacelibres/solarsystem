import type { ExplorerBodyDefinition } from '../config/default-scene';
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
export function visibleSystemIds(bodies: readonly ExplorerBodyDefinition[], selectedId: string, mode: SceneMode): readonly string[] {
    const ids = new Set(bodies.filter(body => body.id === 'sun' || body.id === 'moon' || body.groups?.includes('planets')).map(body => body.id));
    ids.add(selectedId);
    // Keep physical surroundings when zooming out of a close view. The runtime
    // already loads parents; visibility must not hide those resolved ancestors.
    const pending = [selectedId], visited = new Set<string>();
    while (pending.length) {
        const id = pending.pop()!;
        if (visited.has(id)) continue;
        visited.add(id);
        for (const phase of bodies.find(body => body.id === id)?.phases ?? []) {
            if (phase.parentId && bodies.some(body => body.id === phase.parentId)) {
                ids.add(phase.parentId); pending.push(phase.parentId);
            }
        }
    }
    if (mode !== 'overview') for (const body of bodies) {
        if ((mode === 'system' || body.groups?.includes('moons')) && (body.groups?.includes(selectedId) || body.phases.length === 1 && body.phases[0].parentId === selectedId)) ids.add(body.id);
    }
    return bodies.filter(body => ids.has(body.id)).map(body => body.id);
}
