import type { Metadata, Viewport } from 'next';
import './globals.css';
import './nasa-ui.css';

import { DEFAULT_PRESET } from '../lib/theme/palette';

/**
 * Icons come from the approved `icon` master, which `src/app/icon.svg` is a copy
 * of, so the browser tab, an installed app and the in-page logo all share the
 * mark's geometry. Previously no icons were declared at all and `/favicon.ico`
 * 404'd, so the browser fell back to its own default.
 *
 * The SVG master is monochrome and stays one ink; `useFavicon` swaps that ink
 * when the palette changes the surface behind the browser chrome.
 */
export const metadata: Metadata = {
  title: 'spacelibre · solar system',
  description:
    'Explore the solar system using NASA Eyes dynamo ephemeris data, served locally, with the spacelibre visual standard.',
  applicationName: 'spacelibre solar system',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
};

export const viewport: Viewport = {
  // The palette's `deep` role rather than a literal black, so the browser chrome
  // agrees with the active theme.
  themeColor: DEFAULT_PRESET.colors.deep,
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-palette={DEFAULT_PRESET.name}>
      <body>{children}</body>
    </html>
  );
}
