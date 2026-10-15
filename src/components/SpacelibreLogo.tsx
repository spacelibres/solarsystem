'use client';

/**
 * spacelibre wordmark rendered from the approved geometry cues.
 *
 * The VI standard requires the actual SVG masters rather than reconstructed
 * geometry, so this component loads `horizontal-white.svg` and `icon-white.svg`
 * from the bundled VI assets. Because those masters are monochrome they never
 * acquire theme colours — matching the "monochrome takes precedence" rule.
 */

interface Props {
  /** `horizontal` suits navigation; `icon` suits compact UI. */
  variant?: 'horizontal' | 'icon';
  height?: number;
  alt?: string;
}

const SOURCES = {
  horizontal: '/brand/horizontal-white.svg',
  icon: '/brand/icon-white.svg',
} as const;

export default function SpacelibreLogo({ variant = 'horizontal', height = 28, alt = 'spacelibre' }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={SOURCES[variant]}
      alt={alt}
      height={height}
      style={{ height, width: 'auto', display: 'block' }}
      data-color-mode="monochrome"
    />
  );
}
