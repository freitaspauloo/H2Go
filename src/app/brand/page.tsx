import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { DirectionShell } from '@/components/direction/site';
import { commercialCta, residentialCta, verticals, serviceHref } from '@/lib/service-catalog';

export const metadata: Metadata = { title: 'Brand & Website Direction | H2GO Mobile Wash' };

const swatches = [
  { n: 'Deep navy', hex: '#0D2F52', ink: '#fff' },
  { n: 'Electric cyan', hex: '#5FE0FF', ink: '#0a1f36' },
  { n: 'Action blue', hex: '#1E6FD9', ink: '#fff' },
  { n: 'Paper', hex: '#F1F5F9', ink: '#0a1f36' },
  { n: 'Ink', hex: '#0A1F36', ink: '#fff' },
];

export default function Page() {
  const [residential, commercial] = verticals;
  return <DirectionShell><main id="main-content" className="d-wrap">
    <section className="brand-section">
      <p className="eyebrow">H2GO / Website direction</p>
      <h1>More H2GO.<br /><span className="highlight-text">Less ordinary.</span></h1>
      <p>A focused evolution of the existing brand. Evergreen’s navy and cyan, a bold sans-serif close to the logo, real working photography and film, and one clear route from finding a service to planning an assessment.</p>
      <div className="brand-swatches">{swatches.map(c => <div key={c.n} style={{ background: c.hex, color: c.ink }}><strong>{c.n}</strong><span>{c.hex}</span></div>)}</div>
    </section>

    <section className="brand-section">
      <p className="eyebrow">01 / Typography</p>
      <h2>Bold. Clear.<br /><span className="highlight-text">A little momentum.</span></h2>
      <div className="brand-type"><span>Display / Inter Tight · 600 · 38–66px · 1.1 line height · one highlight in italic</span><h1>Bringing the <span className="highlight-text">shine.</span></h1></div>
      <div className="brand-type"><span>Section / Inter Tight · 600 · 32–46px · 1.15 line height</span><h2>Care for every <span className="highlight-text">surface.</span></h2></div>
      <div className="brand-type"><span>Card title / Inter Tight · 600 · 24–34px · 1.22 line height</span><h3>House washing</h3></div>
      <div className="brand-type"><span>Label / Inter · 600 · 11px · uppercase · 0.13em tracking</span><p className="eyebrow" style={{ margin: 0 }}><span />Real work. Real people.</p></div>
      <div className="brand-type"><span>Body / Inter · 400 · 15–16px · 1.7 line height</span><p>Say what the service does, who it helps, and what happens next. Use direct language and practical details.</p></div>
      <div className="brand-type"><span>Action / Inter · 600 · 14px · 50px pill · sentence case · one line</span><div className="brand-actions"><Link href="/services/residential#quote" className="d-button">{residentialCta} <ArrowUpRight size={18} /></Link><div className="on-dark"><Link href="/services/residential#quote" className="trial-fill">{residentialCta}</Link><Link href="/services/commercial#quote" className="trial-ghost">{commercialCta}</Link></div></div></div>
    </section>

    <section className="brand-section">
      <p className="eyebrow">02 / How it is used</p>
      <div className="brand-rules">
        <div><h3>One highlight per headline.</h3><p>The closing words go italic. Action blue on light surfaces, electric cyan on navy and film.</p></div>
        <div><h3>Two calls to action.</h3><p>“{residentialCta}” for homes and “{commercialCta}” for businesses. Cyan pill on the page, navy pill in the header.</p></div>
        <div><h3>Real work on screen.</h3><p>H2GO’s own films and project photography. Rounded corners, a navy shade under text, no stock scenes.</p></div>
      </div>
    </section>

    <section className="brand-section">
      <p className="eyebrow">03 / Four templates. One experience.</p>
      <div className="brand-grid">
        <Link href="/"><small>01 / Homepage</small><span>Residential or commercial.</span><p>The film hero, the two paths, the H2GO difference, Home Care Club, Ongoing Care, proof and the assessment.</p><ArrowUpRight /></Link>
        <Link href="/services/residential"><small>02 / Residential overview</small><span>Every home service.</span><p>The film hero with the assessment in it, the services at a glance, the process and proof.</p><ArrowUpRight /></Link>
        <Link href="/services/commercial/fleet"><small>03 / Commercial sub-vertical</small><span>One sector at a time.</span><p>Property, retail, industrial, municipal or fleet, each with its own services and Ongoing Care program.</p><ArrowUpRight /></Link>
        <Link href="/services/residential/deck-patio-power-washing"><small>04 / Service type</small><span>Details and proof.</span><p>What’s included, the process, questions, before and after, and the assessment with the service selected.</p><ArrowUpRight /></Link>
      </div>
    </section>

    <section className="brand-section">
      <p className="eyebrow">04 / Experience map</p>
      <h2>Home → service → <span className="highlight-text">the assessment.</span></h2>
      <div className="brand-sitemap">
        <div><h3><Link href={serviceHref(residential)}>{residential.title}</Link></h3>{residential.offerings.map(o => <Link key={o.slug} href={serviceHref(residential, o)}>{o.title} ↗</Link>)}</div>
        <div><h3><Link href={serviceHref(commercial)}>{commercial.title}</Link></h3><div className="sitemap-columns">{commercial.subverticals.map(s => <div key={s.slug}><Link href={serviceHref(commercial, undefined, s)}>{s.title} ↗</Link><small>{s.types.map(t => t.title).join(' · ')}</small></div>)}</div></div>
      </div>
      <div className="brand-note">
        <strong>For direction approval</strong>
        <p>Two homepage heroes to compare: <Link href="/">Signal</Link> and <Link href="/?layout=northlight">Northlight</Link>. Everything below the hero is the same.</p>
        <p>Service copy comes from the current site and stands in until Offer V1. Assessment requests open as an email draft in this preview, and nothing is submitted. The customer login and invoice links, the areas list and matched before-and-after photos are waiting on H2GO.</p>
      </div>
    </section>
  </main></DirectionShell>;
}
