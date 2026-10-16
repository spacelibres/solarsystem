import { describe, expect, it } from 'vitest';
import { activePhaseIndex, resolveEntityFrames, type EntityDefinition } from '../src/solar/domain/entities';

const zero = { x: 0, y: 0, z: 0 };
const identity = { x: 0, y: 0, z: 0, w: 1 };
const definitions: EntityDefinition[] = [
  { id: 'sun', phases: [{ startEt: -1e18, parentId: null }], staticPosition: zero, staticOrientation: identity },
  { id: 'earth', phases: [{ startEt: -1e18, parentId: 'sun' }] },
  { id: 'moon', phases: [{ startEt: -1e18, parentId: 'earth' }] },
];

describe('independent entity frames', () => {
  it('adds parent translations without rotating world-axis local offsets', () => {
    const states = new Map([
      ['earth', { position: { x: 100, y: 0, z: 0 }, velocity: { x: 1, y: 0, z: 0 }, orientation: { x: 0, y: 0, z: Math.SQRT1_2, w: Math.SQRT1_2 } }],
      ['moon', { position: { x: 2, y: 3, z: 0 }, velocity: { x: 0, y: 1, z: 0 }, orientation: identity }],
    ]);
    const frames = resolveEntityFrames(definitions, states, 0);
    expect(frames.get('moon')).toMatchObject({ status: 'ready', parentId: 'earth', position: { x: 102, y: 3, z: 0 }, velocity: { x: 1, y: 1, z: 0 }, orientation: identity });
    expect(states.get('moon')?.position).toEqual({ x: 2, y: 3, z: 0 });
    const moon = frames.get('moon');
    if (moon?.status === 'ready') moon.position.x = -10;
    expect(states.get('moon')?.position.x).toBe(2);
  });

  it('selects phases identically for forward, backward and arbitrary seek order', () => {
    const phases = [{ startEt: 0, parentId: 'earth' }, { startEt: 10, parentId: 'sun' }];
    expect([15, 5, 10, -1, 0].map(t => activePhaseIndex(phases, t))).toEqual([1, 0, 1, -1, 0]);
    const defs: EntityDefinition[] = [...definitions, { id: 'probe', phases, staticPosition: { x: 1, y: 0, z: 0 }, staticOrientation: identity }];
    const states = new Map([['earth', { position: { x: 100, y: 0, z: 0 }, velocity: zero, orientation: identity }]]);
    expect(resolveEntityFrames(defs, states, 15).get('probe')).toMatchObject({ position: { x: 1 } });
    expect(resolveEntityFrames(defs, states, 5).get('probe')).toMatchObject({ position: { x: 101 } });
    expect(resolveEntityFrames(defs, states, -1).get('probe')).toMatchObject({ status: 'unavailable', reason: 'no-phase' });
  });

  it('keeps missing data and missing parents explicit rather than placing at origin', () => {
    expect(resolveEntityFrames(definitions, new Map(), 0).get('earth')).toMatchObject({ status: 'unavailable', reason: 'missing-local' });
    const orphan: EntityDefinition = { id: 'orphan', phases: [{ startEt: 0, parentId: 'missing' }], staticPosition: zero };
    expect(resolveEntityFrames([orphan], new Map(), 0).get('orphan')).toMatchObject({ status: 'unavailable', reason: 'missing-parent' });
    const result = resolveEntityFrames(definitions, new Map([['moon', { position: zero }]]), 0);
    expect(result.get('moon')).toMatchObject({ status: 'unavailable', reason: 'parent-unavailable' });
  });

  it('does not substitute static defaults for controllers whose requested data is absent', () => {
    const dynamic: EntityDefinition = { id: 'dynamic', phases: [{ startEt: 0, parentId: null, positionPath: 'dynamic/pos/def.dyn', orientationPath: 'dynamic/ori/def.dyn' }], staticPosition: zero, staticOrientation: identity };
    expect(resolveEntityFrames([dynamic], new Map(), 0).get('dynamic')).toMatchObject({ status: 'unavailable', reason: 'missing-local' });
    expect(resolveEntityFrames([dynamic], new Map([['dynamic', { position: zero, velocity: zero }]]), 0).get('dynamic')).toMatchObject({ status: 'unavailable', reason: 'missing-orientation' });
  });

  it('diagnoses cycles without hanging and distinguishes dependent children', () => {
    const defs = ['a', 'b', 'c'].map((id, index) => ({ id, phases: [{ startEt: 0, parentId: index === 0 ? 'b' : 'a' }], staticPosition: zero }));
    const result = resolveEntityFrames(defs, new Map(), 0);
    expect(result.get('a')).toMatchObject({ reason: 'cycle' });
    expect(result.get('b')).toMatchObject({ reason: 'cycle' });
    expect(result.get('c')).toMatchObject({ reason: 'parent-unavailable' });
  });

  it('rejects ambiguous definitions and invalid times; nonfinite local data is unavailable', () => {
    expect(() => resolveEntityFrames([definitions[0], definitions[0]], new Map(), 0)).toThrow(/duplicate/i);
    expect(() => resolveEntityFrames(definitions, new Map(), Number.NaN)).toThrow(/time/i);
    expect(() => activePhaseIndex([{ startEt: 10, parentId: null }, { startEt: 0, parentId: null }], 0)).toThrow(/increas/i);
    const result = resolveEntityFrames(definitions, new Map([['earth', { position: { x: NaN, y: 0, z: 0 } }]]), 0);
    expect(result.get('earth')).toMatchObject({ reason: 'invalid-state' });
  });
});
