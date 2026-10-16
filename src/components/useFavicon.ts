'use client';

import { useEffect } from 'react';

import { logoPath, type LogoInk } from '../lib/theme/logo';

/**
 * Keep the document favicon in step with the active palette.
 *
 * The standard requires a theme change to reach the favicon, not just the page.
 * A monochrome master is one ink, so the ink is chosen for contrast against the
 * surface the palette puts behind the browser chrome: dark palettes take the
 * white mark, light palettes the black one. Full-colour marks bound to the
 * palette are handled by the SVG's own role attributes.
 *
 * The `icon` dimension master is used deliberately — it is the approved mark for
 * compact space, and using it here means the favicon cannot drift from the app's
 * own logo geometry.
 */
export function useFavicon(presetName: string, isDarkSurface: boolean): void {
  useEffect(() => {
    const ink: LogoInk = isDarkSurface ? 'white' : 'black';
    const href = logoPath('icon', ink);

    // Replace rather than add, so repeated palette switches cannot accumulate
    // stale links that some browsers keep using.
    for (const existing of document.querySelectorAll('link[rel~="icon"]')) {
      existing.remove();
    }

    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = href;
    link.dataset.palette = presetName;
    document.head.appendChild(link);
  }, [presetName, isDarkSurface]);
}

export default useFavicon;
