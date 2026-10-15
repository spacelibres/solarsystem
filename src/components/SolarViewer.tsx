'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import catalogData from '../data/catalog.json';
import { PLANET_IDS, type CatalogEntity } from '../lib/nasa/catalog';
import { loadDynamo } from '../lib/dynamo/loader';
import type { OrbPoint } from '../lib/dynamo/parse';
import { createSolarScene, type SolarSceneHandle } from './solar-scene';
import { DEFAULT_PRESET, applyPaletteToDocument } from '../lib/theme/palette';

const PLANET_SET = new Set<string>(['sun', ...PLANET_IDS]);

export default function SolarViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SolarSceneHandle | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    applyPaletteToDocument(DEFAULT_PRESET);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let scene: SolarSceneHandle | null = null;
    const controller = new AbortController();

    (async () => {
      try {
        const catalog = catalogData as Record<string, CatalogEntity>;
        const entities = Object.values(catalog).filter((e) => PLANET_SET.has(e.id));

        // Load the primary dynamo controller for each body in parallel.
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

        const orbits = new Map(entries);
        scene = createSolarScene({
          container: mount,
          entities,
          orbits,
          primaryColor: new THREE.Color(DEFAULT_PRESET.colors.primary),
        });
        sceneRef.current = scene;
        setStatus('ready');
      } catch (err) {
        if (disposed) return;
        setError(err instanceof Error ? err.message : String(err));
        setStatus('error');
      }
    })();

    const onResize = () => scene?.resize(mount.clientWidth, mount.clientHeight);
    window.addEventListener('resize', onResize);

    return () => {
      disposed = true;
      controller.abort();
      window.removeEventListener('resize', onResize);
      scene?.dispose();
      sceneRef.current = null;
    };
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />
      {status !== 'ready' && (
        <Overlay>
          {status === 'loading' ? 'Loading ephemerides…' : `Failed to load: ${error}`}
        </Overlay>
      )}
    </div>
  );
}

function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        font: '14px/1.4 var(--sl-font, Arial, sans-serif)',
        color: 'rgba(255,255,255,0.8)',
        letterSpacing: '0.04em',
        pointerEvents: 'none',
      }}
    >
      {children}
    </div>
  );
}
