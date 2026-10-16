'use client';

import type { CatalogEntity } from '../lib/nasa/catalog';
import { describeParents } from '../lib/nasa/groups';
import { bodyColor } from '../lib/theme/nasa-tokens';

interface Props {
  entity: CatalogEntity | null;
  onClose: () => void;
}

/**
 * Information panel for the focused body.
 * Mirrors NASA Eyes' `.content-panel-container`: a fixed left column with the
 * body name, its kind, and a facts table. Every value comes from the extracted
 * catalog, so nothing here is invented.
 */
export default function InfoPanel({ entity, onClose }: Props) {
  const open = entity !== null;

  return (
    <aside className={`ns-panel${open ? ' is-open' : ''}`} aria-hidden={!open}>
      {entity && (
        <>
          <div className="ns-panel__head">
            <div>
              <h2 className="ns-panel__name" style={{ color: bodyColor(entity.id, entity.groups) }}>
                {entity.label}
              </h2>
              <span className="ns-panel__kind">{kindLabel(entity)}</span>
            </div>
            <button type="button" className="ns-panel__close" onClick={onClose} aria-label="Close panel">
              ✕
            </button>
          </div>

          <div className="ns-panel__body">
            <dl className="ns-facts">
              {entity.radius !== null && (
                <>
                  <dt>Radius</dt>
                  <dd>{formatKm(entity.radius)}</dd>
                </>
              )}
              {entity.systemRadius !== null && (
                <>
                  <dt>System</dt>
                  <dd>{formatKm(entity.systemRadius)}</dd>
                </>
              )}
              {entity.parents.length > 0 && (
                <>
                  <dt>Primary</dt>
                  <dd>{describeParents(entity)}</dd>
                </>
              )}
              {entity.dynamo && (
                <>
                  <dt>Ephemeris</dt>
                  <dd>{entity.dynamo}</dd>
                </>
              )}
              <dt>Textures</dt>
              <dd>{Object.keys(entity.textures).join(', ') || '—'}</dd>
              {entity.modelUrl && (
                <>
                  <dt>Model</dt>
                  <dd>{entity.modelUrl.replace(/^.*\//, '')}</dd>
                </>
              )}
            </dl>
          </div>
        </>
      )}
    </aside>
  );
}

function kindLabel(entity: CatalogEntity): string {
  const g = entity.groups;
  if (entity.id === 'sun') return 'Star';
  if (g.includes('planets')) return 'Planet';
  if (g.includes('moons')) return 'Moon';
  if (g.includes('spacecraft')) return 'Spacecraft';
  if (g.includes('dwarf planets')) return 'Dwarf planet';
  if (g.includes('comets')) return 'Comet';
  if (g.includes('asteroids')) return 'Asteroid';
  return 'Body';
}

function formatKm(km: number): string {
  if (km >= 1000) return `${km.toLocaleString('en-US')} km`;
  return `${km.toLocaleString('en-US', { maximumFractionDigits: 1 })} km`;
}
