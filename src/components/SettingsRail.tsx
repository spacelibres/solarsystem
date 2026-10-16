'use client';

import { useState } from 'react';

import NasaIcon from './NasaIcon';

interface Props {
  onResetView: () => void;
}

export interface LayerState {
  orbits: boolean;
  labels: boolean;
  stars: boolean;
  constellations: boolean;
}

interface SettingsRailProps extends Props {
  layers: LayerState;
  onLayersChange: (layers: LayerState) => void;
}

/** Layer toggles, mirroring the entries NASA exposes in its layer panel. */
const LAYER_ITEMS: { key: keyof LayerState; label: string }[] = [
  { key: 'orbits', label: 'Orbit paths' },
  { key: 'labels', label: 'Labels' },
  { key: 'stars', label: 'Stars' },
  { key: 'constellations', label: 'Constellations' },
];

/**
 * Right-hand settings rail plus its layer panel.
 *
 * The icons are NASA's own (`info`, `layers`, `box`, `lighting`, `fullscreen`),
 * served from the extracted sprite, and the panel uses the same
 * `.layer-panel`-style list of checkbox rows.
 */
export default function SettingsRail({ onResetView, layers, onLayersChange }: SettingsRailProps) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [lighting, setLighting] = useState<'natural' | 'flood' | 'shadow'>('natural');

  const cycleLighting = () => {
    setLighting((l) => (l === 'natural' ? 'flood' : l === 'flood' ? 'shadow' : 'natural'));
  };

  return (
    <div className="ns-settings">
      {panelOpen && (
        <div className="ns-layerpanel">
          <div className="ns-layerpanel__head">
            <h5 className="ns-layerpanel__title">Layers</h5>
            <button
              type="button"
              className="ns-layerpanel__close"
              onClick={() => setPanelOpen(false)}
              aria-label="Close layers"
            >
              <NasaIcon name="close" size={16} />
            </button>
          </div>
          <ul className="ns-layerpanel__list">
            {LAYER_ITEMS.map((item) => (
              <li key={item.key}>
                <button
                  type="button"
                  className="ns-layerpanel__row"
                  onClick={() => onLayersChange({ ...layers, [item.key]: !layers[item.key] })}
                  aria-pressed={layers[item.key]}
                >
                  <NasaIcon
                    name={layers[item.key] ? 'checkbox-selected' : 'checkbox'}
                    size={15}
                  />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        className={`ns-settings__btn${panelOpen ? ' is-on' : ''}`}
        onClick={() => setPanelOpen((o) => !o)}
        title="Layers"
      >
        <NasaIcon name="layers" size={30} />
      </button>

      <button
        type="button"
        className={`ns-settings__btn${lighting !== 'natural' ? ' is-on' : ''}`}
        onClick={cycleLighting}
        title={`Lighting: ${lighting}`}
      >
        <NasaIcon
          name={lighting === 'natural' ? 'natural-light' : lighting === 'flood' ? 'flood-light' : 'shadow-light'}
          size={30}
        />
      </button>

      <button
        type="button"
        className="ns-settings__btn"
        onClick={onResetView}
        title="Return to the whole system"
      >
        <NasaIcon name="box" size={30} />
      </button>

      <button
        type="button"
        className="ns-settings__btn"
        onClick={() => {
          const el = document.documentElement;
          if (document.fullscreenElement) void document.exitFullscreen();
          else void el.requestFullscreen?.();
        }}
        title="Fullscreen"
      >
        <NasaIcon name="fullscreen" size={30} />
      </button>
    </div>
  );
}
