'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import catalogData from '../data/catalog.json';
import type { CatalogEntity } from '../lib/nasa/catalog';
import { loadDynamo } from '../lib/dynamo/loader';
import type { OrbPoint } from '../lib/dynamo/parse';
import { createSolarScene, type SolarSceneHandle } from './solar-scene';
import { DEFAULT_PRESET, applyPaletteToDocument } from '../lib/theme/palette';
import { bodyColor } from '../lib/theme/nasa-tokens';
import InfoPanel from './InfoPanel';
import TimeBar from './TimeBar';
import SpacelibreLogo from './SpacelibreLogo';
import { VERSION } from '../lib/version';

/** Simulation epoch: 2026-01-01, so the planets sit where they are today. */
const START_TIME = (Date.UTC(2026, 0, 1) - Date.UTC(2000, 0, 1, 12)) / 1000;

/**
 * Bodies loaded by default: the Sun, the eight planets, and every named moon of
 * those planets — the "all satellites" requirement.
 */
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

const CATALOG = catalogData as Record<string, CatalogEntity>;

export default function SolarViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SolarSceneHandle | null>(null);
  const [scene, setScene] = useState<SolarSceneHandle | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

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
        // Planets + Sun first: their ephemerides anchor the scene.
        const core = CORE_IDS.map((id) => CATALOG[id]).filter(Boolean);

        // Register a placeholder body for every other catalog entry so the
        // object list can offer them; their orbits are loaded on demand.
        const entityList = core;

        const entries = await Promise.all(
          entityList
            .filter((e) => e.dynamo)
            .map(async (e) => {
              const loaded = await loadDynamo(e.dynamo!);
              const orbPoints = loaded.points.filter(
                (p): p is OrbPoint => p.kind === 'orb',
              );
              return [e.id, orbPoints] as const;
            }),
        );

        if (disposed) return;

        created = createSolarScene({
          container: mount,
          entities: entityList,
          orbits: new Map(entries),
          primaryColor: new THREE.Color(DEFAULT_PRESET.colors.primary),
          startTime: START_TIME,
          bodyColorFn: (e) => bodyColor(e.id, e.groups),
        });
        sceneRef.current = created;
        setScene(created);
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

  const selected = selectedId ? CATALOG[selectedId] ?? null : null;

  return (
    <div className="ns-app">
      <header className="ns-header">
        <div className="ns-header__left">
          <SpacelibreLogo variant="horizontal" height={26} />
          <h1 className="ns-header__title">Solar System</h1>
          {selected && (
            <nav className="ns-breadcrumb" aria-label="Location">
              <span>Home</span>
              <span className="ns-breadcrumb__sep">›</span>
              <span className="ns-breadcrumb__current">{selected.label}</span>
            </nav>
          )}
        </div>
        <div className="ns-header__nav">
          <span className="ns-header__chip">local ephemeris</span>
        </div>
      </header>

      <section className="ns-stage" aria-label="Solar system explorer">
        <div ref={mountRef} className="ns-canvas" />

        <InfoPanel entity={selected} onClose={onClosePanel} />

        {selected && (
          <button type="button" className="ns-reframe" onClick={onClosePanel}>
            ← whole system
          </button>
        )}

        <div className="ns-settings">
          <button type="button" className="ns-settings__btn is-on" title="Orbits">
            ◯
          </button>
          <button type="button" className="ns-settings__btn is-on" title="Labels">
            ≡
          </button>
          <button type="button" className="ns-settings__btn" title="Reset view" onClick={onClosePanel}>
            ⌂
          </button>
        </div>

        {status !== 'ready' && (
          <div className="ns-overlay">
            {status === 'loading' ? 'Loading local ephemerides…' : `Failed to load: ${error}`}
          </div>
        )}
      </section>

      <TimeBar scene={scene} />

      <span className="ns-version">v{VERSION}</span>
    </div>
  );
}
