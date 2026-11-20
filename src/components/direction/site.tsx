'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Check, Menu, X, Play, Plus, Phone, Leaf, Clock, Waves, Home, Building2, User, Receipt } from 'lucide-react';
import { h2go } from '@/lib/content';
import { commercialCta, residentialCta, verticals, serviceHref, type Vertical, type Offering, type SubVertical } from '@/lib/service-catalog';
import { VideoBackground } from '@/components/video-background';
import { AssessmentProvider, AssessButton, HeroPrompt, QuoteFlow, useAssessmentRequest } from './quote-flow';
import './site.css';
import './polish.css';

const navLinks = [
  { href: '/services/residential', label: 'Residential' },
  { href: '/services/commercial', label: 'Commercial' },
  { href: '/care', label: 'Care Club' },
  { href: '/#stories', label: 'Our work' },
];
const aboutLinks = [
  { href: '/about/reviews', label: 'Reviews' },
  { href: '/about/who-we-are', label: 'Who We Are' },
  { href: '/about/our-team', label: 'Our Team' },
  { href: '/about/faqs', label: 'FAQs' },
  { href: '/about/careers', label: 'Careers' },
];
// Account tools sit beside the CTA as icons, outside the text nav.
// Portal addresses are not confirmed yet, so these point at the footer entries.
const utilityLinks = [
  { href: '#login', label: 'Customer login', icon: User },
  { href: '#pay', label: 'Pay an invoice', icon: Receipt },
];

/** One header for every page. `overlay` lets it sit clear over the homepage film until the hero scrolls away. */
export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const [past, setPast] = useState(false);
  const openAssessment = useAssessmentRequest();
  const path = usePathname();
  const close = () => setOpen(false);
  const current = (href: string) => href !== '/#stories' && (path === href || path.startsWith(`${href}/`));

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => {
      const hero = document.getElementById('home-hero');
      setPast(hero ? hero.getBoundingClientRect().bottom < 74 : window.scrollY > 80);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [overlay]);

  const clear = overlay && !past && !open;
  return <header className={['d-header', overlay ? 'is-overlay' : '', clear ? 'is-clear' : ''].filter(Boolean).join(' ')}>
    <div className="d-wrap nav-row">
      <Link href="/" className="d-logo" aria-label="H2GO home"><Image src={clear ? '/h2go/logo-light.png' : '/h2go/logo.png'} alt="H2GO Mobile Wash" width={124} height={44} priority /></Link>
      <nav aria-label="Main navigation" className="d-nav">
        {navLinks.slice(0, 3).map(item => <Link key={item.href} href={item.href} aria-current={current(item.href) ? 'page' : undefined}>{item.label}</Link>)}
        <div className="nav-menu">
          <Link href="/about/who-we-are" aria-current={path.startsWith('/about') ? 'page' : undefined}>About Us</Link>
          <div className="nav-drop">{aboutLinks.map(item => <Link key={item.href} href={item.href} aria-current={path === item.href ? 'page' : undefined}>{item.label}</Link>)}</div>
        </div>
        <Link href="/#stories">Our work</Link>
      </nav>
      <div className="nav-tools">
        {utilityLinks.map(item => { const Icon = item.icon; return <a key={item.href} className="nav-tool" href={item.href} aria-label={item.label} title={item.label}><Icon size={18} aria-hidden="true" /></a>; })}
      </div>
      <button type="button" className="d-button nav-cta" onClick={openAssessment}>Request a FREE Assessment</button>
      <button type="button" className="menu-button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
    </div>
    {open && <nav id="mobile-navigation" className="d-mobile" aria-label="Mobile navigation">
      {navLinks.slice(0, 3).map(item => <Link onClick={close} key={item.href} href={item.href} aria-current={current(item.href) ? 'page' : undefined}>{item.label}<ArrowUpRight size={18} /></Link>)}
      <p className="d-mobile-label">About Us</p>
      {aboutLinks.map(item => <Link onClick={close} key={item.href} href={item.href} aria-current={path === item.href ? 'page' : undefined}>{item.label}<ArrowUpRight size={18} /></Link>)}
      <Link onClick={close} href="/#stories">Our work<ArrowUpRight size={18} /></Link>
      <button type="button" className="d-mobile-assess" onClick={() => { close(); openAssessment(); }}>Request a FREE Assessment <ArrowUpRight size={18} /></button>
      <div className="d-mobile-tools">
        {utilityLinks.map(item => { const Icon = item.icon; return <a key={item.href} href={item.href} onClick={close}><Icon size={17} aria-hidden="true" />{item.label}</a>; })}
      </div>
    </nav>}
  </header>;
}

export function SiteFooter() {
  return <footer className="d-footer"><div className="d-wrap">
    <div className="footer-grid">
      <div className="footer-brand">
        <Link href="/" className="footer-wordmark" aria-label="H2GO home"><Image src="/h2go/logo.png" alt="H2GO Mobile Wash" width={155} height={54} loading="eager" /></Link>
        <p>Care for every surface.</p>
      </div>
      <nav aria-label="Services">
        <p className="footer-title">Services</p>
        <Link href="/services/residential">Residential</Link>
        <Link href="/services/commercial">Commercial</Link>
        <Link href="/care">Care Club</Link>
      </nav>
      <nav aria-label="About">
        <p className="footer-title">About Us</p>
        {aboutLinks.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}
      </nav>
      <nav aria-label="Customers">
        <p className="footer-title">Customers</p>
        <a id="login" href="#login">Customer login</a>
        <a id="pay" href="#pay">Pay an invoice</a>
        <AssessButton className="footer-assess">Request a FREE Assessment</AssessButton>
      </nav>
      <div>
        <p className="footer-title">Contact</p>
        <a href={h2go.phoneHref}>{h2go.phone}</a>
        <a href={`mailto:${h2go.email}`}>{h2go.email}</a>
        <span>{h2go.address.split(', ')[0]}<br />{h2go.address.split(', ').slice(1).join(', ')}</span>
      </div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} H2GO Mobile Wash</span><span>Mobile washing for homes and businesses across the GTA</span></div>
  </div></footer>;
}

export function DirectionShell({ children, overlayHeader = false }: { children: React.ReactNode; overlayHeader?: boolean }) {
  return <div className="direction"><AssessmentProvider><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader overlay={overlayHeader} />{children}<SiteFooter /></AssessmentProvider></div>;
}

function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="eyebrow"><span />{children}</p>; }

export function ServiceCards() {
  return <section className="d-wrap d-section" id="services">
    <div className="section-heading audience-heading"><div><Eyebrow>Our services</Eyebrow><h2>Residential or <span className="highlight-text">commercial.</span></h2><p>Choose the side that fits your property. Each one leads to its services and a free assessment.</p></div></div>
    <div className="market-grid audience-grid">{verticals.map((v) => <Link href={serviceHref(v)} className="market-card" key={v.slug}><Image src={v.image} alt={`${v.title} power washing`} fill sizes="(min-width: 800px) 50vw, 100vw" /><div className="market-shade" /><div className="market-content"><h3>{v.title}</h3><p>{v.label}. {v.description}</p><span className="circle-arrow"><ArrowUpRight size={22} /></span></div></Link>)}</div>
  </section>;
}

const stories = [
  { label: 'Mike Holmes', tag: 'Residential · A ten-acre transformation', title: 'A big property. A bigger difference.', text: 'With limited well water on site, H2GO brought the water and equipment to refresh Mike’s patios and outdoor spaces.', image: '/h2go/mike-holmes-talking.png', video: 'https://www.youtube.com/embed/DVD1lJkS-b0', source: 'https://h2gomobilewash.com/mike-holmes/', link: 'See the property transformation' },
  { label: 'Hamilton Health Sciences', tag: 'Commercial · Hamilton', title: 'Care for the places that care for us.', text: 'See H2GO’s work at General Hospital in Hamilton, with the team and equipment on site.', image: '/h2go/hospital-project.jpg', video: 'https://player.vimeo.com/video/237971079', source: 'https://vimeo.com/237971079', link: 'Watch the hospital project' },
  { label: 'Fleet washing', tag: 'Commercial · Mobile wash technology', title: 'Your fleet is your first impression.', text: 'Watch the mobile wash system at work and explore a regular cleaning plan for your vehicles.', image: '/h2go/fleet.jpg', video: 'https://www.youtube.com/embed/5u_iE_hFCF4', source: 'https://h2gomobilewash.com/commercial/', link: 'Explore commercial care' },
];

/** Proof carousel. `first` picks the story that matches the page it sits on. */
export function StoryCarousel({ first = 0 }: { first?: number }) {
  const [active, setActive] = useState(first);
  const [playing, setPlaying] = useState(false);
  const story = stories[active];
  function select(index: number) { setActive((index + stories.length) % stories.length); setPlaying(false); }
  return <section className="stories-section" id="stories"><div className="d-wrap">
    <div className="section-heading"><div><Eyebrow>Real work. Real people.</Eyebrow><h2>Trusted across <span className="highlight-text">the GTA.</span></h2></div><p>By homeowners, property managers<br />and the people who keep business moving.</p></div>
    <div className="story-panel" id="story-panel">
      <div className="story-media">{playing ? <iframe title={`${story.label} project video`} src={`${story.video}${story.video.includes('?') ? '&' : '?'}autoplay=1`} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /> : <><Image src={story.image} alt={story.label === 'Hamilton Health Sciences' ? 'H2GO crew at General Hospital, Hamilton' : story.label} fill sizes="(min-width:800px) 50vw, 100vw" /><button className="play-button" aria-label={`Play ${story.label} video`} onClick={() => setPlaying(true)}><Play size={24} fill="currentColor" /></button><span className="media-caption">Watch the work <ArrowUpRight size={14} /></span></>}</div>
      <div className="story-copy" aria-live="polite"><span className="eyebrow">{story.tag}</span><h3>{story.title}</h3><p>{story.text}</p><a href={story.source} target="_blank" rel="noreferrer" className="inline-link">{story.link} <ArrowUpRight size={17} /></a><div className="story-controls"><span>0{active + 1} <i>/ 0{stories.length}</i></span><div><button aria-label="Previous story" onClick={() => select(active - 1)}><ChevronLeft size={20} /></button><button aria-label="Next story" onClick={() => select(active + 1)}><ChevronRight size={20} /></button></div></div></div>
    </div>
  </div></section>;
}

export function AboutSection() { return <section className="d-wrap d-section about-section" id="about"><div className="about-image"><Image src="/h2go/crew-1.jpg" alt="H2GO technician cleaning exterior masonry" fill sizes="(min-width:800px) 45vw,100vw" /></div><div><Eyebrow>The H2GO difference</Eyebrow><h2>Serious power.<br /><span className="highlight-text">Thoughtful care.</span></h2><p className="section-description">A proprietary mobile wash system, hot water and steam. A team that cares about the details. We bring them together to give your property a fresh start.</p><div className="benefit-grid">{[{ icon: Clock, title: 'Around your schedule', text: '24/7/365 response for planned visits and urgent cleanups.' }, { icon: Leaf, title: 'Eco-friendly products', text: 'Cleaning products selected with the environment in mind.' }, { icon: Waves, title: 'Hot water & steam', text: 'A method matched to the surface and the job.' }].map(b => <div key={b.title}><b.icon size={22} /><h3>{b.title}</h3><p>{b.text}</p></div>)}</div></div></section>; }

export function HomeCare() { return <section className="d-wrap homecare-section" id="homecare"><div className="homecare-panel"><div><Eyebrow>Introducing the Home Care Club</Eyebrow><h2>More weekends.<br /><span className="highlight-text">Less maintenance.</span></h2><p>Home Facts is a record of documented H2GO work at your home. You can keep it and share it. You approve the plan, and there is no membership fee.</p><ul>{['No membership fee. One recurring service is enough to join.', 'You approve your care plan and pricing each year.', 'Change or cancel future services anytime, with no clawback on completed work.', 'You pay after each completed visit.'].map(text => <li key={text}><Check size={17} />{text}</li>)}</ul><AssessButton className="d-button">Request a FREE Assessment <ArrowUpRight size={18} /></AssessButton></div><div className="homecare-photo"><Image src="/h2go/house.jpg" alt="H2GO residential wash van outside a home" fill sizes="(min-width:800px) 50vw,100vw" /></div></div></section>; }

/** Slim program banner: Home Care Club for residential pages, Ongoing Care for commercial ones. */
function ProgramBanner({ vertical, sub, id, href }: { vertical: Vertical; sub?: SubVertical; id?: string; href?: string }) {
  const home = vertical.slug === 'residential';
  const name = home ? 'Home Care Club' : 'Commercial Care Club';
  const text = home
    ? 'No membership fee. You approve the plan and pay after each completed visit. Name provisional.'
    : 'Tailored to each location, with a progress report after every shift. Name provisional.';
  const label = href
    ? <>{home ? 'About the Home Care Club' : 'About the Commercial Care Club'} <ArrowUpRight size={18} /></>
    : <>Request a FREE Assessment <ArrowUpRight size={18} /></>;
  return <section className="d-wrap care-banner" id={id}><div><Eyebrow>{name}</Eyebrow><p>{text}</p></div>{href ? <Link className="d-button" href={href}>{label}</Link> : <AssessButton className="d-button">{label}</AssessButton>}</section>;
}
export function OngoingCare() { return <ProgramBanner vertical={verticals[1]} id="ongoing-care" href="/care#commercial-care" />; }

export function CarePage() {
  return <DirectionShell><main id="main-content">
    <section className="d-wrap d-section care-intro"><h1>Residential and commercial care.</h1><p>One menu entry, two clubs. Both names are provisional.</p></section>
    <section className="d-wrap care-clubs">
      <article id="residential-care"><Eyebrow>Residential</Eyebrow><h2>Home Care Club</h2><p>A record of documented H2GO work at your home. You can keep it and share it. You approve the plan, and there is no membership fee.</p><ul>{['No membership fee. One recurring service is enough to join.', 'You approve your care plan and pricing each year.', 'Change or cancel future services anytime, with no clawback on completed work.', 'You pay after each completed visit.'].map(text => <li key={text}><Check size={17} />{text}</li>)}</ul><AssessButton className="d-button">Request a FREE Assessment <ArrowUpRight size={18} /></AssessButton></article>
      <article id="commercial-care"><Eyebrow>Commercial</Eyebrow><h2>Commercial Care Club</h2><p>Tailored to each location, with a progress report after each shift. You approve the plan.</p><ul>{['A progress report after each shift.', 'The plan is tailored to the site.'].map(text => <li key={text}><Check size={17} />{text}</li>)}</ul><AssessButton className="d-button">Request a FREE Assessment <ArrowUpRight size={18} /></AssessButton></article>
    </section>
  </main></DirectionShell>;
}

const aboutPages: Record<string, { title: string; text: string }> = {
  reviews: { title: 'Reviews', text: 'Placeholder. Customer reviews will go here once H2GO sends them.' },
  'who-we-are': { title: 'Who We Are', text: 'Placeholder. The company story will go here once H2GO sends it.' },
  'our-team': { title: 'Our Team', text: 'Placeholder. Team details will go here once H2GO sends them.' },
  faqs: { title: 'FAQs', text: 'Placeholder. Approved answers will go here once H2GO sends them.' },
  careers: { title: 'Careers', text: 'Placeholder. Open roles will go here once H2GO sends them.' },
};

export function AboutPage({ slug }: { slug: string }) {
  const page = aboutPages[slug];
  if (!page) return null;
  return <DirectionShell><main id="main-content"><section className="d-wrap d-section about-placeholder"><Eyebrow>About Us</Eyebrow><h1>{page.title}</h1><p>{page.text}</p></section></main></DirectionShell>;
}

export function ContactSection() { return <section className="d-wrap d-section" id="contact"><div className="contact-panel"><div><Eyebrow>Your next fresh start</Eyebrow><h2>Let’s bring your<br />property <span className="highlight-text">back to life.</span></h2><p>Tell us what you have in mind.<br />We’ll help with the rest.</p><a href={h2go.phoneHref} className="contact-phone"><Phone size={20} />{h2go.phone}</a><p className="contact-alt">Business, fleet or facility? <Link href="/services/commercial#quote">{commercialCta} <ArrowRight size={15} /></Link></p></div><QuoteFlow id="contact-quote" /></div></section>; }

const heroChips = [
  { label: 'Eco-friendly', icon: Leaf, className: 'chip-a' },
  { label: 'Hot water & steam', icon: Waves, className: 'chip-b' },
  { label: '24/7/365 response', icon: Clock, className: 'chip-c' },
  { label: 'Residential', icon: Home, className: 'chip-d' },
  { label: 'Commercial', icon: Building2, className: 'chip-e' },
];

export function Homepage({ initialLayout = 'signal' }: { initialLayout?: 'signal' | 'northlight' }) {
  const signal = initialLayout === 'signal';
  return <DirectionShell overlayHeader>
    <main id="main-content">
      <div className="layout-switch" role="group" aria-label="Hero layout">
        <Link href="/" aria-current={signal ? 'page' : undefined}>04 Signal</Link>
        <Link href="/?layout=northlight" aria-current={signal ? undefined : 'page'}>03 Northlight</Link>
      </div>
      <section id="home-hero" className={signal ? 'trial-signal' : 'trial-north'}>
        <div className="trial-hero">
          <div className="trial-media">
            <VideoBackground mp4="/h2go/video/residential-wash.mp4" poster="/h2go/crew-2.jpg" posterAlt="H2GO residential washing" />
            <div className="trial-shade" />
          </div>
          {!signal && heroChips.map((chip) => { const Icon = chip.icon; return <div key={chip.label} className={`trial-chip ${chip.className}`}><span><Icon size={11} strokeWidth={2.6} /></span>{chip.label}</div>; })}
          <div className="trial-copy">
            <h1>Bringing the <span className="highlight-text">shine</span> back to every surface.</h1>
            <p className="trial-lead">Mobile washing for homes and businesses across the GTA.</p>
            {signal ? <HeroPrompt /> : <div className="trial-actions"><Link className="trial-fill" href="/services/residential#quote">{residentialCta}</Link><Link className="trial-ghost" href="/services/commercial#quote">{commercialCta}</Link></div>}
          </div>
          <a className="trial-phone" href={h2go.phoneHref}><Phone size={15} aria-hidden="true" />{h2go.phone}</a>
          {!signal && <p className="trial-scroll">Scroll</p>}
        </div>
      </section>
      <ServiceCards /><AboutSection /><HomeCare /><OngoingCare /><StoryCarousel /><ContactSection />
    </main>
  </DirectionShell>;
}

export function OfferingGrid({ vertical, items, hrefFor }: { vertical: Vertical; items?: Offering[]; hrefFor?: (o: Offering) => string }) {
  const [open, setOpen] = useState<string | null>(null);
  const list = items ?? vertical.offerings;
  const to = hrefFor ?? ((o: Offering) => serviceHref(vertical, o));
  return <section className="d-wrap d-section" id="offerings">
    <div className="section-heading"><div><Eyebrow>Services for your property</Eyebrow><h2>Find the right <span className="highlight-text">kind of clean.</span></h2></div><p>See what’s included, then open a service for the details and to plan an assessment.</p></div>
    <div className="offering-grid">{list.map((o) => <article key={o.slug} className={open === o.slug ? 'offering-card expanded' : 'offering-card'}>
      <div className="offering-photo"><Image src={o.image} alt="" fill sizes="(min-width:800px) 33vw,100vw" /></div>
      <div className="market-shade" />
      <Link className="offering-main" href={to(o)} aria-label={`Explore ${o.title}`}>
        <span className="circle-arrow card-arrow"><ArrowUpRight size={22} /></span>
        <div className="card-subs">{o.services.map(name => <span key={name}>{name}</span>)}</div>
        <h3>{o.title}</h3>
        <p>{o.description}</p>
      </Link>
      <div className="offering-help">
        <button className="offering-toggle" aria-expanded={open === o.slug} aria-controls={`offering-${o.slug}`} onClick={() => setOpen(open === o.slug ? null : o.slug)}><span>How we help</span><Plus size={18} /></button>
        <div className="offering-reveal" id={`offering-${o.slug}`} inert={open !== o.slug} aria-hidden={open !== o.slug}><div><p>We’ll discuss the surface, access and the work you need, then plan an appropriate wash for your property.</p><AssessButton className="inline-link">Request a FREE Assessment <ArrowRight size={16} /></AssessButton></div></div>
      </div>
    </article>)}</div>
  </section>;
}

function ProcessSection() { return <section className="process-section"><div className="d-wrap"><Eyebrow>Simple from the start</Eyebrow><h2>A better clean.<br /><span className="highlight-text">A clear plan.</span></h2><div className="process-grid">{[{ title: 'Tell us about your property', text: 'Share the location, surfaces and what you need help with.' }, { title: 'We work out the right approach', text: 'Discuss access, water supply and a convenient time with the team.' }, { title: 'Your property gets a fresh start', text: 'Our mobile crew arrives with the agreed equipment and plan.' }].map((s,i) => <div key={s.title}><span>0{i+1}</span><h3>{s.title}</h3><p>{s.text}</p></div>)}</div></div></section>; }

function HeroSearch({ placeholder, onSearch }: { placeholder: string; onSearch: (place: string) => void }) {
  const [place, setPlace] = useState('');
  return <form className="hero-search" onSubmit={event => { event.preventDefault(); onSearch(place); }}>
    <input required maxLength={100} autoComplete="address-level2" aria-label={placeholder} placeholder={placeholder} value={place} onChange={event => setPlace(event.target.value)} />
    <button className="d-button" type="submit">Search <ArrowRight size={17} /></button>
  </form>;
}

export function ServicePage({ vertical, interest, sub }: { vertical: Vertical; interest?: string; sub?: SubVertical }) {
  const headline = sub?.title ?? vertical.headline;
  const summary = sub?.description ?? vertical.description;
  const home = vertical.slug === 'residential';
  const [sought, setSought] = useState<string | null>(null);
  return <DirectionShell><main id="main-content">
    <section className="service-hero">
      <VideoBackground mp4={sub?.film ?? vertical.film} poster={sub?.image ?? vertical.image} posterAlt={`${sub?.title ?? vertical.title} washing`} />
      <div className="service-overlay" />
      <div className="d-wrap service-hero-inner is-search">
        <div className="service-hero-copy"><Eyebrow>{sub ? 'Commercial' : `${vertical.title} mobile wash`}</Eyebrow><h1>{headline.split('. ').map((line,i,parts) => <span key={line} className={i ? 'accent' : ''}>{line}{i === 0 && parts.length > 1 ? '.' : ''}{' '}</span>)}</h1><p>{summary}</p>{sought ? <QuoteFlow layout="hero" id="hero-quote" vertical={vertical.slug} family={sub?.slug} initialAreas={interest === 'homecare' && home ? ['Home Care Club'] : []} seededArea={sought} skipLocation /> : <HeroSearch placeholder={home ? 'Enter your location for a free home assessment.' : 'Enter your location for a free site assessment.'} onSearch={setSought} />}<div className="service-assurance"><span><Clock size={16} />24/7/365 response</span><span><Leaf size={16} />Eco-friendly products</span></div><a href="#offerings" className="inline-link">Explore {sub ? sub.title.toLowerCase() : vertical.title.toLowerCase()} services <ArrowRight size={18} /></a></div>
      </div>
    </section>
    <section className="d-wrap program-band"><p><strong>{home ? 'Home Care Club' : 'Commercial Care Club'}</strong>{home ? 'A record of documented work at your home, with no membership fee. Name provisional.' : 'Tailored to each location, with a progress report after each shift. Name provisional.'}</p><Link className="inline-link" href={home ? '/care#residential-care' : '/care#commercial-care'}>{home ? 'About the Home Care Club' : 'About the Commercial Care Club'} <ArrowRight size={16} /></Link></section>
    {sub ? <OfferingGrid vertical={vertical} items={sub.types} hrefFor={o => serviceHref(vertical, o, sub)} /> : vertical.subverticals.length ? <section className="d-wrap d-section" id="offerings">
      <div className="section-heading"><div><Eyebrow>Commercial services</Eyebrow><h2>Built for <span className="highlight-text">your kind of property.</span></h2></div><p>Ten customer groups. Choose one to see its services and request a free site assessment.</p></div>
      <div className="market-grid sector-grid">{vertical.subverticals.map(s => <article className="market-card" key={s.slug}><Image src={s.image} alt="" fill sizes="(min-width:800px) 33vw, 100vw" /><div className="market-shade" /><Link className="circle-arrow card-arrow" href={serviceHref(vertical, undefined, s)} aria-label={s.title}><ArrowUpRight size={22} /></Link><div className="market-content">{(s.linked || s.homeLink) && <div className="card-subs">{s.linked && s.types.map(t => <Link key={t.slug} href={serviceHref(vertical, t, s)}>{t.title}</Link>)}{s.homeLink && <Link href="/services/residential">Residential services</Link>}</div>}<h3><Link href={serviceHref(vertical, undefined, s)}>{s.title}</Link></h3><p>{s.description}</p></div></article>)}</div>
    </section> : <OfferingGrid vertical={vertical} />}
    <ProcessSection />
    {sub && sub.story === undefined ? <section className="d-wrap d-section site-prompt"><Eyebrow>Your site</Eyebrow><h2>Tell us about <span className="highlight-text">your site.</span></h2><p>Share the location and the work you have in mind. H2GO confirms the approach during a free site assessment.</p><AssessButton className="d-button">Request a FREE Assessment <ArrowUpRight size={18} /></AssessButton></section> : <StoryCarousel first={sub?.story ?? vertical.story} />}
    {home && <section className="ads-quote" id="ads"><div className="d-wrap"><figure className="ads-quote-card"><span aria-hidden="true">“</span><blockquote><p>The A.D.S. story will go here once H2GO approves the wording.</p></blockquote><figcaption>Placeholder. The story follows once H2GO sends it.</figcaption></figure></div></section>}
    <section className="d-wrap service-bottom"><div className="contact-panel"><div><h2>Not sure where to start?</h2><a className="contact-phone" href={h2go.phoneHref}><Phone size={20} />{h2go.phone}</a></div><QuoteFlow key={`${vertical.slug}-${sub?.slug ?? ''}-${interest ?? ''}`} id="quote" vertical={vertical.slug} family={sub?.slug} initialAreas={interest === 'homecare' && home ? ['Home Care Club'] : []} locationTitle={home ? 'Plan my free home assessment' : 'Request a free site assessment'} /></div></section>
  </main></DirectionShell>;
}

function ComparisonPreview() {
  const [value, setValue] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const move = (clientX: number) => {
    const box = frame.current?.getBoundingClientRect();
    if (!box) return;
    setValue(Math.min(100, Math.max(0, ((clientX - box.left) / box.width) * 100)));
  };
  return <div className="comparison"><div className="comparison-images" ref={frame} role="slider" aria-label="Compare before and after" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(value)} tabIndex={0} onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); move(e.clientX); }} onPointerMove={e => { if (e.currentTarget.hasPointerCapture(e.pointerId)) move(e.clientX); }} onKeyDown={e => { if (e.key === 'ArrowLeft') setValue(v => Math.max(0, v - 5)); if (e.key === 'ArrowRight') setValue(v => Math.min(100, v + 5)); }}><Image src="/h2go/deck-after.jpg" alt="Clean deck project photography" fill sizes="(min-width:800px) 50vw,100vw" /><div className="comparison-overlay" style={{ clipPath:`inset(0 ${100-value}% 0 0)` }}><Image src="/h2go/deck-after.jpg" alt="" fill sizes="(min-width:800px) 50vw,100vw" /></div><div className="comparison-divider" style={{left:`${value}%`}}><span>↔</span></div><span className="compare-label left">Before</span><span className="compare-label right">After</span></div></div>;
}

export function DetailPage({ vertical, offering, related, sub }: { vertical: Vertical; offering: Offering; related?: Offering[]; sub?: SubVertical }) {
  const siblings = (related ?? vertical.offerings).filter(o => o.slug !== offering.slug).slice(0, 3);
  const to = (o: Offering) => serviceHref(vertical, o, sub);
  const home = vertical.slug === 'residential';
  return <DirectionShell><main id="main-content">
    <section className="d-wrap detail-hero"><div><h1>{offering.title}</h1><p>{offering.description}</p><ul className="detail-points">{offering.services.map(service => <li key={service}><Check size={16} />{service}</li>)}</ul><AssessButton className="d-button">Request a FREE Assessment <ArrowUpRight size={18} /></AssessButton></div><div className="detail-photo"><Image src={offering.image} alt={offering.title} fill sizes="(min-width:800px) 50vw,100vw" priority /></div></section>
    <ProcessSection />
    <section className="d-wrap d-section detail-content">
      <div><Eyebrow>The right method matters</Eyebrow><h2>Power where you need it.<br /><span className="highlight-text">Care where it counts.</span></h2><p>Every surface and site is different. Before your wash, the team discusses the condition, material and access requirements to choose an appropriate approach.</p>
        <div className="faq-list">
          <details><summary>How is the wash planned?</summary><p>Tell the team about the surface, buildup, water access and any areas that need particular care. Photos can help the team understand the surface before the visit.</p></details>
          <details><summary>Can we arrange recurring visits?</summary><p>{home ? 'Discuss a repeat schedule with H2GO. For exterior care at home, ask about the Home Care Club.' : 'Discuss a repeat schedule with H2GO. Commercial care includes a progress report after each shift.'}</p></details>
          <details><summary>What does it cost?</summary><p>Pricing is confirmed during your free assessment, once the team understands the property.</p></details>
        </div>
      </div>
      <QuoteFlow key={offering.slug} vertical={vertical.slug} family={sub?.slug} areas={sub ? [offering.title, ...offering.services] : undefined} initialAreas={[offering.title]} locationTitle={home ? 'Plan my free home assessment' : 'Request a free site assessment'} />
    </section>
    {offering.slug === 'deck-patio-power-washing' && <section className="d-wrap d-section comparison-section"><div><Eyebrow>See the difference</Eyebrow><h2>A little care.<br /><span className="highlight-text">A whole new outlook.</span></h2></div><ComparisonPreview /></section>}
    <ProgramBanner vertical={vertical} sub={sub} />
    {sub && sub.story === undefined ? null : <StoryCarousel first={sub?.story ?? vertical.story} />}
    {siblings.length > 0 && <section className="d-wrap related-section"><Eyebrow>While we’re here</Eyebrow><h2>More ways <span className="highlight-text">to refresh.</span></h2><div>{siblings.map(o=><Link key={o.slug} href={to(o)}>{o.title}<ArrowUpRight size={20}/></Link>)}</div></section>}
  </main></DirectionShell>;
}
