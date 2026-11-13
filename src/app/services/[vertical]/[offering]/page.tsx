import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DetailPage, ServicePage } from '@/components/direction/site';
import { findSubvertical, findVertical, verticals } from '@/lib/service-catalog';

type Params = Promise<{ vertical: string; offering: string }>;

export function generateStaticParams() {
  return verticals.flatMap(v => v.subverticals.length
    ? v.subverticals.map(s => ({ vertical: v.slug, offering: s.slug }))
    : v.offerings.map(o => ({ vertical: v.slug, offering: o.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = await params;
  const v = findVertical(p.vertical);
  const sub = v && findSubvertical(v, p.offering);
  const type = v?.offerings.find(o => o.slug === p.offering);
  const page = sub ?? type;
  return { title: page ? `${page.title} | H2GO Mobile Wash` : 'Service not found', description: page?.description };
}

export default async function Page({ params }: { params: Params }) {
  const p = await params;
  const v = findVertical(p.vertical);
  if (!v) notFound();
  if (v.subverticals.length) {
    const sub = findSubvertical(v, p.offering);
    if (!sub) notFound();
    return <ServicePage vertical={v} sub={sub} />;
  }
  const offering = v.offerings.find(o => o.slug === p.offering);
  if (!offering) notFound();
  return <DetailPage vertical={v} offering={offering} />;
}
