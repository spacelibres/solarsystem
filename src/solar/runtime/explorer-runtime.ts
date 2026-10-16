import { controllerDependencies } from '../domain/controllers';
import { DEFAULT_SCENE, type ExplorerBodyDefinition } from '../config/default-scene';
import { activePhaseIndex, resolveEntityFrames, type EntityFrame, type LocalEntityState } from '../domain/entities';
import { evaluateEphemeris, type EphemerisWindow } from '../domain/ephemeris';
import { SimulationClock, type ClockSnapshot } from '../domain/time';
import { EphemerisRepository, EphemerisRepositoryError } from './ephemeris-repository';

export type { ExplorerBodyDefinition } from '../config/default-scene';
export interface ResourceStatistics {
  readonly active: number;
  readonly queued: number;
  readonly entries: number;
  readonly bytes: number;
  readonly references: number;
}
export interface EphemerisRepositoryPort {
  load(path: string, timeEt: number, signal?: AbortSignal): Promise<EphemerisWindow>;
  snapshot(): ResourceStatistics;
  dispose(): void;
}
export interface ExplorerRuntimeOptions {
  readonly entities?: readonly ExplorerBodyDefinition[];
  readonly timeEt: number;
  readonly activeIds?: readonly string[];
  /** The runtime owns even an injected repository, and disposes it once. */
  readonly repository?: EphemerisRepositoryPort;
}
export interface ExplorerSnapshot {
  readonly clock: ClockSnapshot;
  readonly selectedId: string;
  readonly phase: 'loading' | 'ready' | 'partial' | 'error' | 'disposed';
  readonly frames: ReadonlyMap<string, EntityFrame>;
  readonly pending: readonly string[];
  readonly errors: Readonly<Record<string, string>>;
  readonly unavailablePaths: readonly string[];
  readonly resources: ResourceStatistics;
  readonly generation: number;
}
interface PendingLoad {
  readonly controller: AbortController;
  readonly generation: number;
  readonly timeEt: number;
}
const covers = (window: EphemerisWindow | undefined, timeEt: number): window is EphemerisWindow =>
  window !== undefined && timeEt >= window.interval.min && timeEt <= window.interval.max;

/** One clock sample drives local evaluation and parent resolution in each transaction. */
export class ExplorerRuntime {
  private readonly clock: SimulationClock;
  private readonly repository: EphemerisRepositoryPort;
  private readonly entities: readonly ExplorerBodyDefinition[];
  private readonly windows = new Map<string, EphemerisWindow>();
  private readonly pending = new Map<string, PendingLoad>();
  private readonly failures = new Map<string, string>();
  private readonly unavailableIntervals = new Map<string, { readonly min: number; readonly max: number }>();
  private readonly listeners = new Set<() => void>();
  private selectedId: string;
  private activeIds: Set<string> | undefined;
  private requiredIds = new Set<string>();
  private suppressedFailures = new Set<string>();
  private generation = 0;
  private disposed = false;
  private frames: ReadonlyMap<string, EntityFrame> = new Map();
  private evaluationErrors: Record<string, string> = {};

  constructor(options: ExplorerRuntimeOptions) {
    this.clock = new SimulationClock(options.timeEt);
    this.entities = structuredClone(options.entities ?? DEFAULT_SCENE);
    if (this.entities.length === 0) throw new Error('Explorer requires at least one entity');
    // Validate phases and IDs before accepting ownership or launching requests.
    resolveEntityFrames(this.entities, new Map(), options.timeEt);
    this.selectedId = this.entities.some(entity => entity.id === 'earth') ? 'earth' : this.entities[0].id;
    this.activeIds = options.activeIds ? this.validateIds(options.activeIds) : undefined;
    this.repository = options.repository ?? new EphemerisRepository();
    this.reconcile();
  }

  snapshot(): ExplorerSnapshot {
    const ready = [...this.frames.values()].filter(frame => frame.status === 'ready').length;
    const phase = this.disposed ? 'disposed' : this.pending.size > 0 ? 'loading' : ready === this.requiredIds.size ? 'ready' : ready > 0 ? 'partial' : 'error';
    return {
      clock: this.clock.snapshot(), selectedId: this.selectedId, phase,
      frames: structuredClone(this.frames), pending: [...this.pending.keys()],
      errors: { ...Object.fromEntries([...this.failures].filter(([path]) => !this.suppressedFailures.has(path))), ...this.evaluationErrors },
      unavailablePaths: [...this.unavailableIntervals.keys()].filter(path=>!this.suppressedFailures.has(path)),
      resources: { ...this.repository.snapshot() }, generation: this.generation,
    };
  }

  tick(realSeconds: number, unixMilliseconds?: number): ExplorerSnapshot {
    this.assertActive();
    this.clock.advance(realSeconds, unixMilliseconds);
    this.reconcile();
    return this.snapshot();
  }

  seek(timeEt: number): void {
    this.assertActive();
    this.clock.seek(timeEt);
    this.invalidate();
    this.reconcile();
  }

  play(rate?: number): void {
    this.assertActive(); this.clock.play(rate); this.notify();
  }

  pause(): void {
    this.assertActive(); this.clock.pause(); this.notify();
  }

  live(unixMilliseconds: number): void {
    this.assertActive(); this.clock.live(unixMilliseconds); this.invalidate(); this.reconcile();
  }

  select(id: string): void {
    this.assertActive();
    if (!this.entities.some(entity => entity.id === id)) throw new Error(`Unknown entity: ${id}`);
    this.selectedId = id;
    this.notify();
  }

  setActive(ids: readonly string[]): void {
    this.assertActive();
    this.activeIds = this.validateIds(ids); this.invalidate(); this.reconcile();
  }

  private validateIds(ids: readonly string[]): Set<string> {
    for (const id of ids) if (!this.entities.some(entity => entity.id === id)) throw new Error(`Unknown entity: ${id}`);
    return new Set(ids);
  }

  retry(): void {
    this.assertActive();
    for (const path of Object.keys(this.evaluationErrors)) this.windows.delete(path);
    this.failures.clear();
    this.unavailableIntervals.clear();
    this.reconcile();
  }

  subscribe(callback: () => void): () => void {
    this.assertActive();
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.invalidate();
    this.listeners.clear();
    this.windows.clear();
    this.frames = new Map();
    this.evaluationErrors = {};
    this.repository.dispose();
  }

  private assertActive(): void {
    if (this.disposed) throw new Error('Explorer runtime is disposed');
  }

  private invalidate(): void {
    this.generation++;
    for (const load of this.pending.values()) load.controller.abort();
    this.pending.clear();
    this.failures.clear();
    this.unavailableIntervals.clear();
  }

  private reconcile(): void {
    if (this.disposed) return;
    const timeEt = this.clock.snapshot().timeEt;
    const byId = new Map(this.entities.map(entity => [entity.id, entity]));
    const required = new Set<string>();
    const include = (id: string): void => {
      if (required.has(id)) return;
      const entity = byId.get(id); if (!entity) return;
      required.add(id);
      const phase = entity.phases[activePhaseIndex(entity.phases, timeEt)];
      if (phase?.parentId) include(phase.parentId);
      for (const target of controllerDependencies(entity.controllers, phase?.parentId ?? null, timeEt)) include(target);
    };
    for (const id of this.activeIds ?? byId.keys()) include(id);
    this.requiredIds = required;
    const activeEntities = this.entities.filter(entity => required.has(entity.id));
    const candidates = (phase: typeof this.entities[number]['phases'][number], kind: 'position' | 'orientation'): readonly string[] =>
      [...new Set([...(kind === 'position' ? phase.positionPaths ?? [] : phase.orientationPaths ?? []), ...(phase[`${kind}Path`] ? [phase[`${kind}Path`]!] : [])])];
    const paths = new Set<string>();
    for (const entity of activeEntities) {
      const phase = entity.phases[activePhaseIndex(entity.phases, timeEt)];
      if (phase) for (const kind of ['position', 'orientation'] as const) for (const path of candidates(phase, kind)) paths.add(path);
    }
    for (const [path, load] of this.pending) {
      if (!paths.has(path)) { this.pending.delete(path); load.controller.abort(); }
    }
    // Keep at most one real interval per active controller, not an unbounded seek history.
    for (const path of this.windows.keys()) if (!paths.has(path)) this.windows.delete(path);
    for (const path of this.failures.keys()) if (!paths.has(path)) { this.failures.delete(path); this.unavailableIntervals.delete(path); }
    for (const [path, interval] of this.unavailableIntervals) {
      if (timeEt < interval.min || timeEt > interval.max) { this.failures.delete(path); this.unavailableIntervals.delete(path); }
    }
    for (const path of paths) {
      if (!covers(this.windows.get(path), timeEt) && !this.pending.has(path) && !this.failures.has(path)) this.request(path, timeEt);
    }
    const localStates = new Map<string, LocalEntityState>();
    this.evaluationErrors = {};
    this.suppressedFailures.clear();
    for (const entity of activeEntities) {
      const phase = entity.phases[activePhaseIndex(entity.phases, timeEt)];
      if (!phase) continue;
      let local: LocalEntityState = {};
      for (const kind of ['position', 'orientation'] as const) {
        const alternatives = candidates(phase, kind);
        for (const path of alternatives) {
          const window = this.windows.get(path);
          if (!covers(window, timeEt)) continue;
          const result = evaluateEphemeris(window, timeEt, { body: phase.body });
          if (result.status === 'unavailable') this.evaluationErrors[path] = result.reason;
          else if (kind !== result.kind) this.evaluationErrors[path] = `Expected ${kind} controller, received ${result.kind}`;
          else {
            if (result.kind === 'position') local = { ...local, position: result.position, velocity: result.velocity };
            else local = { ...local, orientation: result.orientation };
            for (const alternative of alternatives) { this.suppressedFailures.add(alternative); delete this.evaluationErrors[alternative]; }
            break;
          }
        }
      }
      localStates.set(entity.id, local);
    }
    const resolved = new Map(resolveEntityFrames(activeEntities, localStates, timeEt));
    for (const entity of this.entities) if (!required.has(entity.id)) {
      const phaseIndex = activePhaseIndex(entity.phases, timeEt);
      resolved.set(entity.id, { status: 'unavailable', id: entity.id, phaseIndex, parentId: entity.phases[phaseIndex]?.parentId ?? null, reason: 'inactive' });
    }
    this.frames = resolved;
    this.notify();
  }

  private request(path: string, timeEt: number): void {
    const load: PendingLoad = { controller: new AbortController(), generation: this.generation, timeEt };
    this.pending.set(path, load);
    // Promise boundary also catches synchronously throwing injected repositories.
    let promise: Promise<EphemerisWindow>;
    try { promise = this.repository.load(path, timeEt, load.controller.signal); }
    catch (error) { promise = Promise.reject(error); }
    void promise.then(window => {
      if (!this.isCurrent(path, load)) return;
      this.pending.delete(path);
      if (covers(window, load.timeEt)) this.windows.set(path, window);
      else this.failures.set(path, `Loaded window does not cover requested ET ${load.timeEt}`);
      this.reconcile();
    }, error => {
      if (!this.isCurrent(path, load)) return;
      this.pending.delete(path);
      this.failures.set(path, error instanceof Error ? error.message : String(error));
      if (error instanceof EphemerisRepositoryError && error.code === 'no-data' && error.unavailableInterval &&
          error.unavailableInterval.min <= load.timeEt && error.unavailableInterval.max >= load.timeEt) {
        this.unavailableIntervals.set(path, error.unavailableInterval);
      }
      this.reconcile();
    });
  }

  private isCurrent(path: string, load: PendingLoad): boolean {
    return !this.disposed && this.generation === load.generation && this.pending.get(path) === load;
  }

  private notify(): void {
    for (const listener of [...this.listeners]) {
      if (!this.disposed && this.listeners.has(listener)) listener();
    }
  }
}
