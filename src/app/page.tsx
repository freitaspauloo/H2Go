import type { Metadata } from 'next';
import { Homepage } from '@/components/direction/site';
export const metadata: Metadata = { title: 'H2GO Mobile Wash — A fresh start for every surface', description: 'Mobile washing for homes and businesses across the GTA. Plan a free home assessment or request a free site assessment with H2GO.' };
export default async function Page({ searchParams }: { searchParams: Promise<{ layout?: string }> }) {
  const { layout } = await searchParams;
  return <Homepage initialLayout={layout === 'northlight' ? 'northlight' : 'signal'} />;
}
