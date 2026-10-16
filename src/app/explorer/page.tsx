import type { Metadata } from 'next';
import Explorer from '../../solar/ui/Explorer';

export const metadata: Metadata = {
  title: 'Solar System · spacelibre',
  description: 'An independent solar-system explorer with source-derived planetary systems, NASA spacecraft models and ephemerides.',
};

export default function ExplorerPage() {
  return <Explorer />;
}
