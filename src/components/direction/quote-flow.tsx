'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Check, ChevronLeft, Mail } from 'lucide-react';
import { assessmentOptions, commercialCta, isCommercialService, residentialCta, verticals } from '@/lib/service-catalog';

export function QuoteFlow({ vertical, initialService = '', cta, id = 'quote' }: { vertical?: string; initialService?: string; cta?: string; id?: string }) {
  const [step, setStep] = useState(0);
  const [area, setArea] = useState('');
  const [service, setService] = useState(initialService);
  const [details, setDetails] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState(false);
  const options = assessmentOptions(vertical);
  const submitLabel = cta ?? (vertical === 'commercial' ? commercialCta : residentialCta);
  const body = `Location: ${area}\nService: ${service}\nDetails: ${details || 'Not provided'}\nName: ${first} ${last}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nPlease contact me to schedule an assessment.`;
  const mailto = `mailto:info@h2gomobilewash.com?subject=${encodeURIComponent(`${submitLabel} — ${service}`)}&body=${encodeURIComponent(body)}`;
  function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 2) setStep(step + 1); else setReady(true);
  }
  return <div className="quote-card" id={id}>
    <div className="quote-top"><span className="eyebrow">{submitLabel}</span><span>{ready ? <Check size={18} /> : `0${step + 1} / 03`}</span></div>
    <ol className="quote-progress" aria-label="Assessment request progress">{['Location', 'Service', 'Your details'].map((label, n) => <li key={label} className={n <= step ? 'active' : ''} aria-current={n === step ? 'step' : undefined}><span>{label}</span></li>)}</ol>
    {ready ? <div role="status" className="quote-ready"><h2>Your request is ready.</h2><p>H2GO will follow up to schedule. This preview has not submitted anything yet. Send it by email below, and attach photos if you have them.</p><dl><dt>Location</dt><dd>{area}</dd><dt>Service</dt><dd>{service}</dd><dt>Contact</dt><dd>{first} {last} · {email}</dd></dl><a className="d-button" href={mailto}>Send request by email <Mail size={17} /></a><button className="text-button" onClick={() => setReady(false)}>Edit details</button></div> : <form onSubmit={next}>
      <div aria-live="polite"><h2>{['Where can we help?', 'What should we look at?', 'How can we reach you?'][step]}</h2><p className="quote-intro">{['Start with your city or postal code.', 'Choose the service you’d like to discuss.', 'H2GO confirms a time with you. Pricing follows the assessment.'][step]}</p></div>
      {step === 0 && <label>City or postal code<input autoComplete="address-level2" required maxLength={100} value={area} onChange={e => setArea(e.target.value)} placeholder="e.g. Toronto or M5V 2T6" /></label>}
      {step === 1 && <label>Service<select value={service} onChange={e => setService(e.target.value)} required><option value="">Select a service</option>{options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></label>}
      {step === 1 && <label>Details <small>(optional)</small><textarea rows={3} maxLength={600} value={details} onChange={e => setDetails(e.target.value)} placeholder="Surfaces, access, timing or anything else we should know." /></label>}
      {step === 2 && <><div className="form-pair"><label>First name<input required autoComplete="given-name" maxLength={80} value={first} onChange={e => setFirst(e.target.value)} /></label><label>Last name<input required autoComplete="family-name" maxLength={80} value={last} onChange={e => setLast(e.target.value)} /></label></div><label>Email<input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} /></label><label>Phone <small>(optional)</small><input type="tel" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} /></label><label className="consent"><input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)} />I agree that H2GO Mobile Wash may contact me by email, phone or text about this assessment. I can withdraw my consent at any time.</label></>}
      <div className="quote-actions">{step > 0 && <button type="button" className="back-button" onClick={() => setStep(step - 1)} aria-label="Previous step"><ChevronLeft size={18} /></button>}<button className="d-button" type="submit">{step < 2 ? ['Continue', 'Contact details'][step] : submitLabel}<ArrowRight size={17} /></button></div>
      <p className="quote-note">Free, with no obligation. You share timing preferences. H2GO schedules.</p>
    </form>}
  </div>;
}

/** Homepage hero. The same three steps and field styling as QuoteFlow, set out as one wide bar. */
export function HeroPrompt() {
  const [step, setStep] = useState(0);
  const [area, setArea] = useState('');
  const [service, setService] = useState('');
  const [details, setDetails] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [ready, setReady] = useState(false);
  const fields = useRef<HTMLDivElement>(null);
  const moved = useRef(false);
  const submitLabel = isCommercialService(service) ? commercialCta : residentialCta;
  const body = `Location: ${area}\nService: ${service}\nDetails: ${details || 'Not provided'}\nName: ${first} ${last}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nPlease contact me to schedule an assessment.`;
  const mailto = `mailto:info@h2gomobilewash.com?subject=${encodeURIComponent(`${submitLabel} — ${service}`)}&body=${encodeURIComponent(body)}`;

  // Moving between steps puts the cursor in the first field of the new step. Nothing is focused on first load.
  useEffect(() => {
    if (!moved.current) return;
    fields.current?.querySelector<HTMLElement>('input,select,textarea')?.focus();
  }, [step]);

  function go(to: number) {
    moved.current = true;
    setStep(to);
  }
  function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 2) go(step + 1); else setReady(true);
  }

  const progress = <ol className="quote-progress" aria-label="Assessment request progress">{['Location', 'Service', 'Your details'].map((label, n) => <li key={label} className={n <= step ? 'active' : ''} aria-current={n === step ? 'step' : undefined}><span>{label}</span></li>)}</ol>;

  // Sits under the card, on the film, so the card holds only the progress strip and the fields. Shown on the three steps, not on the ready summary.
  const note = <p className="hero-prompt-note">Free, with no obligation. You share timing preferences. H2GO schedules.</p>;

  if (ready) {
    return <div className="quote-card hero-prompt is-ready" id="quote">
      {progress}
      <div role="status" className="quote-ready">
        <div className="prompt-head"><h2>Your request is ready.</h2><span className="prompt-count"><Check size={18} /></span></div>
        <p>H2GO will follow up to schedule. This preview has not submitted anything yet. Send it by email below, and attach photos if you have them.</p>
        <dl><div><dt>Location</dt><dd>{area}</dd></div><div><dt>Service</dt><dd>{service}</dd></div><div><dt>Contact</dt><dd>{first} {last} · {email}</dd></div></dl>
        <div className="prompt-ready-actions"><a className="d-button" href={mailto}>Send request by email <Mail size={17} /></a><button type="button" className="text-button" onClick={() => setReady(false)}>Edit details</button></div>
      </div>
    </div>;
  }

  const actions = <div className="quote-actions">
    {step > 0 && <button type="button" className="back-button" onClick={() => go(step - 1)} aria-label="Previous step"><ChevronLeft size={18} /></button>}
    <button className="d-button" type="submit">{step < 2 ? ['Continue', 'Contact details'][step] : submitLabel}<ArrowRight size={17} /></button>
  </div>;

  return <><form className="quote-card hero-prompt" id="quote" onSubmit={next}>
    {progress}
    <div className="prompt-row">
      {/* The progress strip names the step and the placeholders name the fields, so nothing is labelled twice. aria-label keeps each field's name for screen readers. */}
      <div className={`prompt-fields step-${step}`} ref={fields}>
        {step === 0 && <input aria-label="City or postal code" autoComplete="address-level2" required maxLength={100} value={area} onChange={e => setArea(e.target.value)} placeholder="City or postal code, e.g. Toronto or M5V 2T6" />}
        {step === 1 && <><select aria-label="Service" value={service} onChange={e => setService(e.target.value)} required><option value="">Service</option>{verticals.map(v => <optgroup key={v.slug} label={v.title}>{assessmentOptions(v.slug).map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</optgroup>)}</select><input aria-label="Details, optional" maxLength={600} value={details} onChange={e => setDetails(e.target.value)} placeholder="Surfaces, access, timing or anything else we should know." /></>}
        {step === 2 && <><input aria-label="First name" required autoComplete="given-name" maxLength={80} value={first} onChange={e => setFirst(e.target.value)} placeholder="First name" /><input aria-label="Last name" required autoComplete="family-name" maxLength={80} value={last} onChange={e => setLast(e.target.value)} placeholder="Last name" /><input aria-label="Email" required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" /><input aria-label="Phone, optional" type="tel" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" /></>}
      </div>
      {step < 2 && actions}
    </div>
    {step === 2 && <div className="prompt-row prompt-foot">
      <label className="consent"><input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)} />I agree that H2GO Mobile Wash may contact me by email, phone or text about this assessment. I can withdraw my consent at any time.</label>
      {actions}
    </div>}
  </form>{note}</>;
}