import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServicePage } from '@/components/direction/site';
import { findVertical, verticals } from '@/lib/service-catalog';
export function generateStaticParams(){ return verticals.map(v=>({vertical:v.slug})); }
export async function generateMetadata({params}:{params:Promise<{vertical:string}>}):Promise<Metadata>{const v=findVertical((await params).vertical);return {title:v?`${v.title} Power Washing | H2GO Mobile Wash`:'Service not found',description:v?.description};}
export default async function Page({params,searchParams}:{params:Promise<{vertical:string}>;searchParams:Promise<{interest?:string}>}){ const v=findVertical((await params).vertical);if(!v)notFound();const {interest}=await searchParams;return <ServicePage vertical={v} interest={interest}/>; }
