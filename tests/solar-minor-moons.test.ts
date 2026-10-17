import { expect, it } from 'vitest';
import { FULL_SCENE } from '../src/solar/config/scene-catalog';
import { searchBodies, visibleSystemIds } from '../src/solar/ui/navigation';

it('uses NASA classifications to hide minor moons by default', () => {
    const minor = FULL_SCENE.find(body => body.groups?.includes('jupiter') && body.sourceSubcategory === 'Minor Moon');
    expect(minor).toBeDefined();
    const visible = visibleSystemIds(FULL_SCENE, 'jupiter', 'system');
    for (const id of ['io', 'europa', 'ganymede', 'callisto']) expect(visible).toContain(id);
    expect(visible).not.toContain(minor!.id);
    expect(visibleSystemIds(FULL_SCENE, 'jupiter', 'system', undefined, [], true)).toContain(minor!.id);
    expect(visibleSystemIds(FULL_SCENE, minor!.id, 'body')).toContain(minor!.id);
    expect(visibleSystemIds(FULL_SCENE, minor!.id, 'body')).toContain('jupiter');
    expect(searchBodies(FULL_SCENE, '', 'all')).toHaveLength(FULL_SCENE.length);
    expect(searchBodies(FULL_SCENE, minor!.id, 'all').map(body => body.id)).toContain(minor!.id);
});
