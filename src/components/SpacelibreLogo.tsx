'use client';

/**
 * spacelibre mark, rendered from the approved masters.
 *
 * The standard is explicit that the wordmark is outlined geometry and must not be
 * reconstructed, so this loads the supplied SVG rather than drawing anything.
 * Which master depends on `ink`:
 *
 *   monochrome (`black` / `navy` / `white`) — the default
 *     One ink for planet, orbit and wordmark, unchanged by the palette. Carries
 *     `data-color-mode="monochrome"`, and role resolution skips it entirely, so
 *     this is the right choice on the viewer's dark chrome.
 *
 *   `primary` (full colour)
 *     No `data-color-mode`, and the planet carries `data-stroke-role="planet"`, so
 *     the mark follows the active palette. Served as a `<img>`, though, the
 *     master would render its literal navy fallback and the planet would vanish
 *     against a dark surface — the failure the standard calls a defect. So the
 *     roles are resolved against the palette first (see `logo-roles.ts`) and the
 *     resolved SVG is used as the source.
 */

import { useEffect, useState } from 'react';

import {
  CANVAS,
  MIN_DISPLAY_WIDTH,
  clearSpace,
  logoPath,
  type LogoInk,
  type LogoOrientation,
} from '../lib/theme/logo';
import { resolveLogoUrl } from '../lib/theme/logo-roles';
import { usePalette } from '../lib/theme/usePalette';

interface Props {
  /** `horizontal` for navigation, `stacked` for covers, `icon` for compact space. */
  orientation?: LogoOrientation;
  /** Defaults to the mark's REVERSE ink, which suits a dark surface. */
  ink?: LogoInk;
  /** Rendered width in px. The master's canvas ratio is preserved. */
  width?: number;
  alt?: string;
  className?: string;
}

export default function SpacelibreLogo({
  orientation = 'horizontal',
  ink = 'white',
  width,
  alt = 'spacelibre',
  className,
}: Props) {
  const palette = usePalette();
  const canvas = CANVAS[orientation];

  const displayWidth = width ?? MIN_DISPLAY_WIDTH[orientation];
  const displayHeight = Math.round((displayWidth * canvas.height) / canvas.width);
  const space = clearSpace(displayHeight);

  // Monochrome ink resolves to the plain master path with no fetch; full colour
  // fetches and substitutes roles. Starting from the plain path avoids a flash of
  // the navy fallback while the resolved version is prepared.
  const [src, setSrc] = useState(() => logoPath(orientation, ink));

  useEffect(() => {
    let revoked: string | null = null;
    let cancelled = false;

    resolveLogoUrl(orientation, ink, palette.colors)
      .then((url) => {
        if (cancelled) {
          if (url.startsWith('blob:')) URL.revokeObjectURL(url);
          return;
        }
        if (url.startsWith('blob:')) revoked = url;
        setSrc(url);
      })
      .catch(() => {
        /* keep the master path; the literal fallback is still the approved mark */
      });

    return () => {
      cancelled = true;
      if (revoked) URL.revokeObjectURL(revoked);
    };
  }, [orientation, ink, palette]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={displayWidth}
      height={displayHeight}
      className={className}
      style={{
        display: 'block',
        width: displayWidth,
        height: displayHeight,
        // The standard asks for 0.25 of the canvas height as clear space. Held
        // here rather than left to the surrounding layout, which could tighten it
        // below the required margin.
        padding: space,
        boxSizing: 'content-box',
      }}
      data-logo-orientation={orientation}
      data-logo-ink={ink}
      // Full-colour marks omit this so the palette can recolour them.
      {...(ink === 'primary' ? {} : { 'data-color-mode': 'monochrome' })}
    />
  );
}
