import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AboutPage } from '@/components/direction/site';

const pages = ['reviews', 'who-we-are', 'our-team', 'faqs', 'careers'] as const;

export function generateStaticParams() {
  return pages.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase());
  return { title: `${title} | H2GO Mobile Wash`, description: 'Placeholder page. Copy follows once H2GO sends it.' };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!pages.includes(slug as typeof pages[number])) notFound();
  return <AboutPage slug={slug} />;
}
