import type { Metadata } from 'next';
import { CarePage } from '@/components/direction/site';

export const metadata: Metadata = {
  title: 'Care Club | H2GO Mobile Wash',
  description: 'Residential and commercial care clubs. Both names are provisional.',
};

export default function Page() {
  return <CarePage />;
}
