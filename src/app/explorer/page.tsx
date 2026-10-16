import type { Metadata } from 'next';
import Explorer from '../../solar/ui/Explorer';

export const metadata: Metadata = {
  title: 'Solar System · spacelibre',
  description: 'An independent solar-system explorer using NASA ephemerides and imagery.',
};

export default function ExplorerPage() {
  return <Explorer />;
}
