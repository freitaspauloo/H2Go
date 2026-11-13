import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DetailPage } from '@/components/direction/site';
import { findSubvertical, findVertical, verticals } from '@/lib/service-catalog';

type Params = Promise<{ vertical: string; offering: string; type: string }>;

export function generateStaticParams() {
  return verticals.flatMap(v => v.subverticals.flatMap(s => s.types.map(t => ({ vertical: v.slug, offering: s.slug, type: t.slug }))));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = await params;
  const v = findVertical(p.vertical);
  const type = v && findSubvertical(v, p.offering)?.types.find(t => t.slug === p.type);
  return { title: type ? `${type.title} | H2GO Mobile Wash` : 'Service not found', description: type?.description };
}

export default async function Page({ params }: { params: Params }) {
  const p = await params;
  const v = findVertical(p.vertical);
  const sub = v && findSubvertical(v, p.offering);
  const type = sub?.types.find(t => t.slug === p.type);
  if (!v || !sub || !type) notFound();
  return <DetailPage vertical={v} offering={type} related={sub.types} sub={sub} />;
}
