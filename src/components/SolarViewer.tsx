'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import catalogData from '../data/catalog.json';
import type { CatalogEntity } from '../lib/nasa/catalog';
import { loadDynamo } from '../lib/dynamo/loader';
import { createSolarScene, type SolarSceneHandle, type LoadedOrbit } from './solar-scene';
import { DEFAULT_PRESET, applyPaletteToDocument } from '../lib/theme/palette';
import { bodyColor } from '../lib/theme/nasa-tokens';
import { FEATURED_STORIES } from '../lib/nasa/featured';
import InfoPanel from './InfoPanel';
import TimeBar from './TimeBar';
import FeaturedStories from './FeaturedStories';
import SettingsRail, { type LayerState } from './SettingsRail';
import TopNav from './TopNav';
import SpacelibreLogo from './SpacelibreLogo';
import { VERSION } from '../lib/version';
import type { FeaturedStory } from '../lib/nasa/featured';

/** Simulation epoch: 2026-01-01, so the bodies sit where they are today. */
const START_TIME = (Date.UTC(2026, 0, 1) - Date.UTC(2000, 0, 1, 12)) / 1000;

const CATALOG = catalogData as unknown as Record<string, CatalogEntity>;

/** Bodies always loaded: they anchor the hierarchy. */
const CORE_IDS = [
  'sun',
  'mercury',
  'venus',
  'earth',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
] as const;

/** Bodies the featured cards reference, so those stories can fly to them. */
const FEATURED_TARGET_IDS = FEATURED_STORIES.map((s) => s.target).filter(
  (id): id is string => Boolean(id),
);

/** How many additional bodies (moons, spacecraft) to load in this pass. */
const MAX_EXTRA = 60;

/**
 * Pick the entities worth rendering at solar-system scale: the core bodies, the
 * major moons, and the notable spacecraft. NASA shows far more, but everything
 * loaded here arrives through the same parent-chain path, so raising the limit
 * only costs load time.
 */
function selectEntities(catalog: Record<string, CatalogEntity>): CatalogEntity[] {
  const core = new Set<string>([...CORE_IDS, ...FEATURED_TARGET_IDS]);
  const chosen: CatalogEntity[] = [];

  for (const id of core) if (catalog[id]) chosen.push(catalog[id]);

  const ranked = Object.values(catalog)
    .filter((e) => !core.has(e.id))
    .filter((e) => e.dynamo)
    .map((e) => ({ e, score: scoreOf(e) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_EXTRA)
    .map((x) => x.e);

  return [...chosen, ...ranked];
}

/** Rank bodies so the notable ones win the load budget. */
function scoreOf(e: CatalogEntity): number {
  let s = e.radius ?? 0;
  if (e.groups.includes('moons')) s += 3000;
  if (e.groups.includes('spacecraft')) s += 1500;
  if (e.groups.includes('dwarf planets')) s += 2000;
  if (e.groups.includes('major') || e.groups.includes('galilean')) s += 1500;
  return s;
}

export default function SolarViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SolarSceneHandle | null>(null);
  const [scene, setScene] = useState<SolarSceneHandle | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(0);
  const [layers, setLayers] = useState<LayerState>({
    orbits: true,
    labels: true,
    stars: true,
    constellations: true,
    trails: true,
  });

  useEffect(() => {
    applyPaletteToDocument(DEFAULT_PRESET);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let created: SolarSceneHandle | null = null;

    (async () => {
      try {
        const entities = selectEntities(CATALOG);

        // Load each controller, skipping bodies whose ephemeris has no data for
        // this epoch (spacecraft before launch, orbits outside their span).
        const results = await Promise.all(
          entities
            .filter((e) => e.dynamo)
            .map(async (e) => {
              const result = await loadDynamo(e.dynamo!, START_TIME).catch(() => null);
              if (!result) return null;
              const points = result.points.filter(
                (p): p is import('../lib/dynamo/parse').OrbPoint => p.kind === 'orb',
              );
              if (!points.length) return null;
              const orbit: LoadedOrbit = { points, relTo: result.relTo };
              return [e.id, orbit] as const;
            }),
        );

        if (disposed) return;

        const loadedIds = new Set(
          results.filter((r): r is readonly [string, LoadedOrbit] => r !== null).map((r) => r[0]),
        );
        const renderable = entities.filter((e) => e.id === 'sun' || loadedIds.has(e.id));
        const orbitEntries = results.filter(
          (r): r is readonly [string, LoadedOrbit] => r !== null,
        );

        created = createSolarScene({
          container: mount,
          entities: renderable,
          orbits: new Map(orbitEntries),
          startTime: START_TIME,
          bodyColorFn: (e) => bodyColor(e.id, e.groups),
        });
        sceneRef.current = created;
        setScene(created);
        setLoaded(orbitEntries.length);
        setStatus('ready');
      } catch (err) {
        if (disposed) return;
        setError(err instanceof Error ? err.message : String(err));
        setStatus('error');
      }
    })();

    const onResize = () => created?.resize(mount.clientWidth, mount.clientHeight);
    window.addEventListener('resize', onResize);

    return () => {
      disposed = true;
      window.removeEventListener('resize', onResize);
      created?.dispose();
      sceneRef.current = null;
      setScene(null);
    };
  }, []);

  const onClosePanel = useCallback(() => {
    setSelectedId(null);
    sceneRef.current?.focus(null);
  }, []);

  /** Focus a body by id (shared by search, stories and picking). */
  const onSelectBody = useCallback((id: string) => {
    if (!CATALOG[id]) return;
    setSelectedId(id);
    sceneRef.current?.focus(id);
  }, []);

  /** A featured card focuses its target body and jumps to the story's date. */
  const onStory = useCallback((story: FeaturedStory) => {
    const scene = sceneRef.current;
    if (story.date) {
      const t = (Date.parse(story.date) - Date.UTC(2000, 0, 1, 12)) / 1000;
      scene?.setTime(t);
    }
    if (story.target && CATALOG[story.target]) {
      setSelectedId(story.target);
      scene?.focus(story.target);
    }
  }, []);

  // Clicking a body focuses it and opens its panel; clicking empty space clears.
  useEffect(() => {
    if (!scene) return;
    scene.onPick((id) => {
      setSelectedId(id);
      scene.focus(id);
    });
  }, [scene]);

  // Push layer visibility into the scene whenever it changes.
  useEffect(() => {
    sceneRef.current?.setLayers({
      orbits: layers.orbits,
      labels: layers.labels,
      stars: layers.stars,
      trails: layers.trails,
    });
  }, [layers, scene]);

  const selected = selectedId ? CATALOG[selectedId] ?? null : null;

  return (
    <div className="ns-app">
      <header className="ns-header">
        <div className="ns-header__left">
          <SpacelibreLogo variant="horizontal" height={26} />
          <h1 className="ns-header__title">Eyes on the Solar System</h1>
          {selected && (
            <nav className="ns-breadcrumb" aria-label="Location">
              <span>Home</span>
              <span className="ns-breadcrumb__sep">›</span>
              <span className="ns-breadcrumb__current">{selected.label}</span>
            </nav>
          )}
        </div>
        <div className="ns-header__nav">
          <TopNav catalog={CATALOG} onSelect={onSelectBody} />
        </div>
      </header>

      <section className="ns-stage" aria-label="Solar system explorer">
        <div ref={mountRef} className="ns-canvas" />

        <FeaturedStories onSelect={onStory} />

        <InfoPanel entity={selected} onClose={onClosePanel} />

        {selected && (
          <button type="button" className="ns-reframe" onClick={onClosePanel}>
            ← whole system
          </button>
        )}

        <SettingsRail onResetView={onClosePanel} layers={layers} onLayersChange={setLayers} />

        {status !== 'ready' && (
          <div className="ns-overlay">
            {status === 'loading' ? 'Loading local ephemerides…' : `Failed to load: ${error}`}
          </div>
        )}
      </section>

      <TimeBar scene={scene} />

      <span className="ns-version">v{VERSION} · {loaded} bodies</span>
    </div>
  );
}
