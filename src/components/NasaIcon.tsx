'use client';

/**
 * Renders one of NASA's own interface icons.
 *
 * The artwork comes from the site's IcoMoon sprite, split into individual files
 * by `tools/split-sprite.cjs` and served from `/icons`. Using the real icons
 * (rather than substitutes) is what makes the chrome read as NASA Eyes.
 *
 * The SVGs use `fill="currentColor"`, so colour follows the button's `color`.
 */

interface Props {
  /** Icon name without the `icon-` prefix, e.g. `layers`, `lighting`. */
  name: string;
  size?: number;
  className?: string;
  title?: string;
}

export default function NasaIcon({ name, size = 30, className, title }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/icons/icon-${name}.svg`}
      alt={title ?? ''}
      title={title}
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, display: 'block' }}
      draggable={false}
    />
  );
}
