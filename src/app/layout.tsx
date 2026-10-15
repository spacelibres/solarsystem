import type { Metadata, Viewport } from 'next';
import './globals.css';
import './nasa-ui.css';

export const metadata: Metadata = {
  title: 'spacelibre · solar system',
  description:
    'Explore the solar system using NASA Eyes dynamo ephemeris data, served locally, with the spacelibre visual standard.',
  applicationName: 'spacelibre solar system',
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-palette="01-electric-orbit">
      <body>{children}</body>
    </html>
  );
}
