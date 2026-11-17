'use client';
import { createContext, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Check, ChevronLeft, Mail, X } from 'lucide-react';
import { verticals, type SubVertical } from '@/lib/service-catalog';

type Audience = 'residential' | 'commercial';
type Phase = 'location' | 'audience' | 'family' | 'areas' | 'contact';

const finalCta = 'Request a FREE Assessment';
const phaseCopy: Record<Phase, [string, string]> = {
  location: ['Where can we help?', 'Start with your city or postal code.'],
  audience: ['Residential or commercial?', 'Choose one to continue.'],
  family: ['What type of business?', 'Choose the one that fits.'],
  areas: ['Select what you’re interested in', 'Choose any that apply, then continue.'],
  contact: ['How can we reach you?', 'H2GO confirms a time with you. Pricing follows the assessment.'],
};
const phaseLabel: Record<Phase, string> = {
  location: 'Location',
  audience: 'Type',
  family: 'Business',
  areas: 'Services',
  contact: 'Your details',
};

const commercial = verticals.find(item => item.slug === 'commercial');
const families: SubVertical[] = commercial?.subverticals ?? [];

function areasFor(audience: Audience, familySlug: string) {
  if (audience === 'residential') {
    const home = verticals.find(item => item.slug === 'residential');
    return [...(home?.offerings.map(offering => offering.title) ?? []), 'Home Care Club'];
  }
  const group = families.find(item => item.slug === familySlug);
  const seen = new Set<string>();
  const labels: string[] = [];
  for (const offering of group?.types ?? []) {
    for (const label of [offering.title, ...offering.services]) {
      if (seen.has(label)) continue;
      const title = offering.title.toLowerCase();
      const name = label.toLowerCase();
      if (label !== offering.title && (title.startsWith(name) || name.startsWith(title))) continue;
      seen.add(label);
      labels.push(label);
      if (labels.length === 10) return labels;
    }
  }
  return labels;
}

function phaseAfterLocation(lockedAudience?: Audience, lockedFamily?: string): Phase {
  if (!lockedAudience) return 'audience';
  if (lockedAudience === 'commercial' && !lockedFamily) return 'family';
  return 'areas';
}

function AssessmentFlow({ variant, id, lockedAudience, lockedFamily = '', initialAreas = [], areas, locationTitle, seededArea = '', skipLocation = false }: {
  variant: 'hero' | 'card';
  id: string;
  lockedAudience?: Audience;
  lockedFamily?: string;
  initialAreas?: string[];
  /** Service areas for this page. Omit to use the audience or business type. */
  areas?: string[];
  /** Replaces "Where can we help?" on the location step. */
  locationTitle?: string;
  seededArea?: string;
  skipLocation?: boolean;
}) {
  const [phase, setPhase] = useState<Phase>(skipLocation ? phaseAfterLocation(lockedAudience, lockedFamily) : 'location');
  const [area, setArea] = useState(seededArea);
  const [audience, setAudience] = useState<Audience | ''>(lockedAudience ?? '');
  const [family, setFamily] = useState(lockedFamily);
  const [picked, setPicked] = useState<string[]>([]);
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [ready, setReady] = useState(false);
  const fields = useRef<HTMLDivElement>(null);
  const moved = useRef(false);
  const seeded = useRef('');

  const chosen = (lockedAudience ?? audience) as Audience | '';
  const familySlug = lockedFamily || family;
  const familyTitle = families.find(item => item.slug === familySlug)?.title ?? '';
  const steps: Phase[] = ['location'];
  if (!lockedAudience) steps.push('audience');
  if (chosen === 'commercial' && !lockedFamily) steps.push('family');
  steps.push('areas', 'contact');
  const index = Math.max(0, steps.indexOf(phase));
  const generated = chosen === 'residential' || (chosen === 'commercial' && familySlug) ? areasFor(chosen, familySlug) : [];
  const options = areas?.length ? areas : generated;
  const interests = picked.join(', ');
  const body = `Location: ${area}\nAudience: ${chosen === 'commercial' ? 'Commercial' : 'Residential'}${familyTitle ? `\nBusiness type: ${familyTitle}` : ''}\nInterested in: ${interests || 'Not provided'}\nName: ${first} ${last}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nPlease contact me to schedule an assessment.`;
  const mailto = `mailto:info@h2gomobilewash.com?subject=${encodeURIComponent(`${finalCta} — ${interests || familyTitle || chosen}`)}&body=${encodeURIComponent(body)}`;

  useEffect(() => {
    if (phase !== 'areas' || !chosen) return;
    const key = `${chosen}:${familySlug}`;
    if (seeded.current === key) return;
    seeded.current = key;
    const list = areas?.length ? areas : areasFor(chosen, familySlug);
    setPicked(initialAreas.filter(label => list.includes(label)));
  }, [phase, chosen, familySlug, initialAreas, areas]);

  useEffect(() => {
    if (!moved.current || variant !== 'hero') return;
    fields.current?.querySelector<HTMLElement>('input,select,textarea')?.focus();
  }, [phase, variant]);

  function go(to: Phase) {
    moved.current = true;
    setPhase(to);
  }
  function back() {
    go(steps[Math.max(0, index - 1)]);
  }
  function chooseAudience(next: Audience) {
    setAudience(next);
    if (next !== 'commercial') setFamily('');
    setPicked([]);
    go(next === 'commercial' && !lockedFamily ? 'family' : 'areas');
  }
  function chooseFamily(slug: string) {
    setFamily(slug);
    setPicked([]);
    go('areas');
  }
  function toggle(label: string) {
    setPicked(current => current.includes(label) ? current.filter(item => item !== label) : [...current, label]);
  }
  function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (phase === 'areas') {
      if (!picked.length) return;
      go('contact');
      return;
    }
    if (phase === 'location') {
      go(steps[1]);
      return;
    }
    setReady(true);
  }

  const progress = <ol className="quote-progress" aria-label="Assessment request progress">{steps.map((item, n) => <li key={item} className={n <= (ready ? steps.length : index) ? 'active' : ''} aria-current={!ready && item === phase ? 'step' : undefined}><span>{phaseLabel[item]}</span></li>)}</ol>;
  const [title, intro] = phase === 'location' && locationTitle ? [locationTitle, phaseCopy.location[1]] : phaseCopy[phase];
  const choices = phase === 'audience'
    ? <div className="choice-grid is-pair" role="group" aria-label="Residential or commercial">{(['residential', 'commercial'] as const).map(item => <button type="button" key={item} className="choice" onClick={() => chooseAudience(item)}>{item === 'residential' ? 'Residential' : 'Commercial'}</button>)}</div>
    : phase === 'family'
      ? <div className="choice-grid" role="group" aria-label="What type of business?">{families.map(item => <button type="button" key={item.slug} className="choice" onClick={() => chooseFamily(item.slug)}>{item.title}</button>)}</div>
      : <div className="choice-grid" role="group" aria-label="Select what you’re interested in">{options.map(label => <button type="button" key={label} className={picked.includes(label) ? 'choice is-on' : 'choice'} aria-pressed={picked.includes(label)} onClick={() => toggle(label)}>{label}</button>)}</div>;
  const showChoices = phase === 'audience' || phase === 'family' || phase === 'areas';
  const actions = <div className="quote-actions">
    {index > 0 && <button type="button" className="back-button" onClick={back} aria-label="Previous step"><ChevronLeft size={18} /></button>}
    {phase !== 'audience' && phase !== 'family' && <button className="d-button" type="submit" disabled={phase === 'areas' && picked.length === 0}>{phase === 'location' ? 'Continue' : phase === 'areas' ? 'Next' : finalCta}<ArrowRight size={17} /></button>}
  </div>;

  if (ready && variant === 'hero') {
    return <div className="quote-card hero-prompt is-ready" id={id}>
      {progress}
      <div role="status" className="quote-ready">
        <div className="prompt-head"><h2>Your request is ready.</h2><span className="prompt-count"><Check size={18} /></span></div>
        <p>H2GO will follow up to schedule. This preview has not submitted anything yet. Send it by email below, and attach photos if you have them.</p>
        <dl><div><dt>Location</dt><dd>{area}</dd></div><div><dt>Interested in</dt><dd>{interests}</dd></div><div><dt>Contact</dt><dd>{first} {last} · {email}</dd></div></dl>
        <div className="prompt-ready-actions"><a className="d-button" href={mailto}>Send request by email <Mail size={17} /></a><button type="button" className="text-button" onClick={() => setReady(false)}>Edit details</button></div>
      </div>
    </div>;
  }

  if (variant === 'hero') {
    return <><form className="quote-card hero-prompt" id={id} onSubmit={next}>
      {progress}
      <div className="prompt-head" aria-live="polite"><h2>{title}</h2><p className="quote-intro">{intro}</p></div>
      <div className="prompt-row">
        <div className={`prompt-fields${phase === 'contact' ? ' fields-contact' : ''}`} ref={fields}>
          {phase === 'location' && <input aria-label="City or postal code" autoComplete="address-level2" required maxLength={100} value={area} onChange={event => setArea(event.target.value)} placeholder="City or postal code, e.g. Toronto or M5V 2T6" />}
          {showChoices && choices}
          {phase === 'contact' && <><input aria-label="First name" required autoComplete="given-name" maxLength={80} value={first} onChange={event => setFirst(event.target.value)} placeholder="First name" /><input aria-label="Last name" required autoComplete="family-name" maxLength={80} value={last} onChange={event => setLast(event.target.value)} placeholder="Last name" /><input aria-label="Email" required type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="Email" /><input aria-label="Phone, optional" type="tel" autoComplete="tel" value={phone} onChange={event => setPhone(event.target.value)} placeholder="Phone" /></>}
        </div>
        {phase !== 'contact' && actions}
      </div>
      {phase === 'contact' && <div className="prompt-row prompt-foot">
        <label className="consent"><input type="checkbox" required checked={consent} onChange={event => setConsent(event.target.checked)} />I agree that H2GO Mobile Wash may contact me by email, phone or text about this assessment. I can withdraw my consent at any time.</label>
        {actions}
      </div>}
    </form><p className="hero-prompt-note">Free, with no obligation. You share timing preferences. H2GO schedules.</p></>;
  }

  if (ready) {
    return <div className="quote-card" id={id}>
      <div className="quote-top"><span className="eyebrow">{finalCta}</span><Check size={18} /></div>
      {progress}
      <div role="status" className="quote-ready"><h2>Your request is ready.</h2><p>H2GO will follow up to schedule. This preview has not submitted anything yet. Send it by email below, and attach photos if you have them.</p><dl><dt>Location</dt><dd>{area}</dd><dt>Interested in</dt><dd>{interests}</dd><dt>Contact</dt><dd>{first} {last} · {email}</dd></dl><a className="d-button" href={mailto}>Send request by email <Mail size={17} /></a><button className="text-button" type="button" onClick={() => setReady(false)}>Edit details</button></div>
    </div>;
  }

  return <div className="quote-card" id={id}>
    <div className="quote-top"><span className="eyebrow">{finalCta}</span><span>0{index + 1} / 0{steps.length}</span></div>
    {progress}
    <form onSubmit={next}>
      <div aria-live="polite"><h2>{title}</h2><p className="quote-intro">{intro}</p></div>
      {phase === 'location' && <label>City or postal code<input autoComplete="address-level2" required maxLength={100} value={area} onChange={event => setArea(event.target.value)} placeholder="e.g. Toronto or M5V 2T6" /></label>}
      {showChoices && choices}
      {phase === 'contact' && <><div className="form-pair"><label>First name<input required autoComplete="given-name" maxLength={80} value={first} onChange={event => setFirst(event.target.value)} /></label><label>Last name<input required autoComplete="family-name" maxLength={80} value={last} onChange={event => setLast(event.target.value)} /></label></div><label>Email<input required type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} /></label><label>Phone <small>(optional)</small><input type="tel" autoComplete="tel" value={phone} onChange={event => setPhone(event.target.value)} /></label><label className="consent"><input type="checkbox" required checked={consent} onChange={event => setConsent(event.target.checked)} />I agree that H2GO Mobile Wash may contact me by email, phone or text about this assessment. I can withdraw my consent at any time.</label></>}
      {actions}
      <p className="quote-note">Free, with no obligation. You share timing preferences. H2GO schedules.</p>
    </form>
  </div>;
}

export function QuoteFlow({ vertical, family, initialAreas, areas, id = 'quote', locationTitle, seededArea, skipLocation, layout = 'card' }: { vertical?: string; family?: string; initialAreas?: string[]; areas?: string[]; id?: string; locationTitle?: string; seededArea?: string; skipLocation?: boolean; layout?: 'hero' | 'card' }) {
  const audience = vertical === 'commercial' || vertical === 'residential' ? vertical : undefined;
  return <AssessmentFlow variant={layout} id={id} lockedAudience={audience} lockedFamily={family} initialAreas={initialAreas} areas={areas} locationTitle={locationTitle} seededArea={seededArea} skipLocation={skipLocation} />;
}

/** Homepage hero. Same steps as the page forms, laid out as one wide bar. */
export function HeroPrompt() {
  return <AssessmentFlow variant="hero" id="quote" />;
}

const AssessmentModalContext = createContext<() => void>(() => {});

/** Opens the assessment modal used by buttons outside the hero and the bottom stepper. */
export function useAssessmentRequest() {
  return useContext(AssessmentModalContext);
}

export function AssessButton({ className, children }: { className?: string; children?: ReactNode }) {
  const open = useAssessmentRequest();
  return <button type="button" className={className} onClick={open}>{children ?? <>Request a FREE Assessment <ArrowUpRight size={18} /></>}</button>;
}

function AssessmentModal({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dialog.current?.querySelector<HTMLElement>('input')?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return <div className="assess-modal" onClick={onClose}>
    <div className="assess-dialog" role="dialog" aria-modal="true" aria-label={finalCta} ref={dialog} onClick={event => event.stopPropagation()}>
      <button type="button" className="assess-close" aria-label="Close" onClick={onClose}><X size={18} /></button>
      <AssessmentFlow variant="card" id="assess-quote" />
    </div>
  </div>;
}

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <AssessmentModalContext.Provider value={() => setOpen(true)}>
    {children}
    {open && <AssessmentModal onClose={() => setOpen(false)} />}
  </AssessmentModalContext.Provider>;
}
