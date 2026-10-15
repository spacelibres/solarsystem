'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import catalogData from '../data/catalog.json';
import type { CatalogEntity } from '../lib/nasa/catalog';
import { loadDynamo } from '../lib/dynamo/loader';
import type { OrbPoint } from '../lib/dynamo/parse';
import { createSolarScene, type SolarSceneHandle } from './solar-scene';
import { DEFAULT_PRESET, applyPaletteToDocument } from '../lib/theme/palette';
import BodyTree from './BodyTree';
import TimeBar from './TimeBar';

/** Simulation epoch: 2026-01-01, so the planets sit where they are today. */
const START_TIME = (Date.UTC(2026, 0, 1) - Date.UTC(2000, 0, 1, 12)) / 1000;

/** Bodies loaded by default: the Sun and the eight planets. */
const DEFAULT_BODIES = [
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
  const [selected, setSelected] = useState<string | null>(null);
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
        const wanted = new Set<string>(DEFAULT_BODIES);
        const entities = Object.values(CATALOG).filter((e) => wanted.has(e.id));

        const entries = await Promise.all(
          entities
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
          entities,
          orbits: new Map(entries),
          primaryColor: new THREE.Color(DEFAULT_PRESET.colors.primary),
          startTime: START_TIME,
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

  const onSelect = useCallback((id: string) => {
    setSelected(id);
    sceneRef.current?.focus(id);
  }, []);

  return (
    <div className="sl-viewer">
      <div ref={mountRef} className="sl-viewer__canvas" />

      <aside className="sl-viewer__sidebar">
        <BodyTree catalog={CATALOG} selected={selected} onSelect={onSelect} />
      </aside>

      <div className="sl-viewer__bottom">
        <TimeBar scene={scene} />
      </div>

      {selected && (
        <button
          type="button"
          className="sl-viewer__reset"
          onClick={() => {
            setSelected(null);
            sceneRef.current?.focus(null);
          }}
        >
          ← whole system
        </button>
      )}

      {status !== 'ready' && (
        <div className="sl-viewer__overlay">
          {status === 'loading' ? 'Loading local ephemerides…' : `Failed to load: ${error}`}
        </div>
      )}
    </div>
  );
}
