'use client';

import { useEffect, useState } from 'react';

import { DEFAULT_PRESET, PRESETS, type PalettePreset } from './palette';

const PRESET_BY_NAME = new Map<string, PalettePreset>(PRESETS.map((p) => [p.name, p]));

/**
 * The palette currently applied to the document.
 *
 * One source of truth, so a logo, a favicon and the scene cannot disagree about
 * which theme is active. The value is read from the `data-palette` attribute,
 * which is the same marker the CSS and the standard's tooling use, so a palette
 * change made anywhere is picked up everywhere.
 *
 * The standard requires a theme change to reach the whole deliverable — including
 * the logo and favicon — not just a settings panel, which is why this is a shared
 * hook rather than per-component state.
 */
export function usePalette(): PalettePreset {
  const [preset, setPreset] = useState<PalettePreset>(DEFAULT_PRESET);

  useEffect(() => {
    const read = () => {
      const name = document.documentElement.dataset.palette;
      const next = name ? PRESET_BY_NAME.get(name) : undefined;
      if (!next) return;
      setPreset((current) => (current.name === next.name ? current : next));
    };

    read();

    // `applyPalette` sets `data-palette` imperatively, so observe the attribute
    // rather than require every caller to route through this hook.
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-palette'],
    });
    return () => observer.disconnect();
  }, []);

  return preset;
}
