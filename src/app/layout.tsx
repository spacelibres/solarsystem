import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'spacelibre · solar system',
  description:
    'Explore the solar system using NASA Eyes public dynamo ephemeris data, presented with the spacelibre visual standard.',
  applicationName: 'spacelibre solar system',
};

export const viewport: Viewport = {
  themeColor: '#0D1721',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-palette="01-electric-orbit">
      <body>{children}</body>
    </html>
  );
}
