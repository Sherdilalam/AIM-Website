'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// The preserved Webflow content for /contact-us carries an empty
// `<div class="ct-form" id="ctFormMount">` in place of the original raw
// <form>. Submitting a lead goes through our own /api/contact endpoint,
// served by the Azure managed Function (api/contact/index.js) on Azure and by
// the Next.js route handler (app/api/contact/route.js) on Vercel. Either way it
// holds the Power Automate URL and the reCAPTCHA secret key
// server-side, so this component never sees or sends either. A real
// onSubmit handler needs a real React form, which dangerouslySetInnerHTML
// content can't provide, so this one is rendered through a portal into
// that mount point instead of living in the preserved HTML/script
// pipeline every other page uses.
//
// firstName, lastName, email, organization, message, and the field order
// come from legacy/contact-us.html, the original Webflow form -- phone,
// visit, and the consent checkbox were dropped somewhere during this
// page's redesign into New-AIM-code and are restored here to match that
// original exactly (field names, required-ness, visit's option list, and
// the checkbox's consent text are all copied verbatim from there).
// interest is a genuinely different field added during the redesign (a
// topic dropdown, not a renamed "visit"), kept and sent to Power Automate
// alongside the rest.
const TR = {
  en: {
    heading: 'Send us a message',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Work email',
    organization: 'Company',
    phone: 'Phone Number',
    visit: 'What is your preferred demo time?',
    visitOptions: [
      'Select one...',
      'Morning (9 AM – 12 PM)',
      'Afternoon (12 PM – 4 PM)',
      'End of day (4 PM – 6 PM)',
      "I'd like AIM to follow up later",
    ],
    interest: "I'm interested in",
    message: 'Message',
    consent:
      'AIM requires the contact details you provide to stay in touch with you about our solutions and services. You can opt-out of these communications at any time. To learn more about opting out, along with our privacy practices and dedication to safeguarding your information, please review our Privacy Policy.',
    submit: 'Send message',
    sending: 'Sending...',
    success: 'Thanks, your message has been sent. We will be in touch shortly.',
    notConfigured: 'Form submissions are not yet connected. Please email hello@iaim.ca in the meantime.',
    recaptchaRequired: 'Please complete the reCAPTCHA check before sending.',
    error: 'Something went wrong sending your message. Please email hello@iaim.ca instead.',
  },
  fr: {
    heading: 'Envoyez-nous un message',
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Courriel professionnel',
    organization: 'Entreprise',
    phone: 'Numéro de téléphone',
    visit: 'Quel est votre horaire préféré pour la démonstration?',
    visitOptions: [
      'Sélectionnez...',
      'Matin (9 h – 12 h)',
      'Après-midi (12 h – 16 h)',
      'Fin de journée (16 h – 18 h)',
      "Je préfère qu'AIM me recontacte plus tard",
    ],
    interest: 'Je suis intéressé par',
    message: 'Message',
    consent:
      "AIM a besoin des coordonnées que vous fournissez pour rester en contact avec vous au sujet de nos solutions et services. Vous pouvez vous désabonner de ces communications en tout temps. Pour en savoir plus sur la désinscription, ainsi que sur nos pratiques de confidentialité et notre engagement à protéger vos renseignements, veuillez consulter notre politique de confidentialité.",
    submit: 'Envoyer le message',
    sending: 'Envoi en cours...',
    success: 'Merci, votre message a été envoyé. Nous vous répondrons sous peu.',
    notConfigured: 'Les envois de formulaire ne sont pas encore connectés. Veuillez écrire à hello@iaim.ca en attendant.',
    recaptchaRequired: 'Veuillez compléter la vérification reCAPTCHA avant l’envoi.',
    error: "Une erreur s'est produite lors de l'envoi de votre message. Veuillez écrire à hello@iaim.ca.",
  },
};

// Never translated in the original either -- placeholders and dropdown
// options were always plain English there too, only labels/heading/button
// went through the page's i18n dictionary.
const INTEREST_OPTIONS = [
  'Select a topic',
  'AI & Data',
  'Cloud & Infrastructure',
  'Application Development',
  'Managed Services',
  'Strategy & Advisory',
  'Product demo',
  'Partnership',
  'Other',
];

const RECAPTCHA_SCRIPT_SRC = 'https://www.google.com/recaptcha/api.js';

export default function ContactForm() {
  const [mountNode, setMountNode] = useState(null);
  const [lang, setLang] = useState('en');
  const [status, setStatus] = useState('idle'); // idle | sending | success | not_configured | recaptcha_required | error
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const recaptchaContainerRef = useRef(null);
  const recaptchaWidgetId = useRef(null);

  useEffect(() => {
    setMountNode(document.getElementById('ctFormMount'));
    setLang(window.aimGetLang ? window.aimGetLang() : 'en');
    const onLangChange = () => setLang(window.aimGetLang ? window.aimGetLang() : 'en');
    window.addEventListener('aim-lang-change', onLangChange);
    return () => window.removeEventListener('aim-lang-change', onLangChange);
  }, []);

  // Load Google's reCAPTCHA script once, session-wide (a later client-side
  // navigation back to this page reuses the already-loaded script/globals).
  // The script tag's own `load` event fires once the *file* has downloaded,
  // not once `grecaptcha.render` actually exists, Google does further async
  // setup after that (confirmed live: calling render() right on script
  // `load` threw "window.grecaptcha.render is not a function"). The
  // `?onload=<callback>&render=explicit` query params are Google's own
  // documented way to be notified once the API is genuinely ready.
  useEffect(() => {
    if (window.grecaptcha && window.grecaptcha.render) {
      setRecaptchaReady(true);
      return;
    }
    if (document.querySelector(`script[src^="${RECAPTCHA_SCRIPT_SRC}"]`)) {
      // Already requested (e.g. by a previous mount of this component this
      // session) -- its onload callback below will still fire once ready.
      return;
    }
    window.__aimRecaptchaOnLoad = () => setRecaptchaReady(true);
    const script = document.createElement('script');
    script.src = `${RECAPTCHA_SCRIPT_SRC}?onload=__aimRecaptchaOnLoad&render=explicit`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  // Render the widget once the script is ready and its container exists.
  // Guarded so a re-render (e.g. a language switch) never renders it twice.
  useEffect(() => {
    if (!recaptchaReady || !recaptchaContainerRef.current || recaptchaWidgetId.current !== null) return;
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey || !window.grecaptcha || typeof window.grecaptcha.render !== 'function') return;
    recaptchaWidgetId.current = window.grecaptcha.render(recaptchaContainerRef.current, {
      sitekey: siteKey,
      callback: (token) => setRecaptchaToken(token),
      'expired-callback': () => setRecaptchaToken(''),
    });
  });

  if (!mountNode) return null;

  const t = TR[lang] || TR.en;

  function resetRecaptcha() {
    setRecaptchaToken('');
    if (window.grecaptcha && recaptchaWidgetId.current !== null) {
      window.grecaptcha.reset(recaptchaWidgetId.current);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    if (!recaptchaToken) {
      setStatus('recaptcha_required');
      return;
    }
    const payload = {
      firstName: form.firstName.value.trim(),
      lastName: form.lastName.value.trim(),
      organization: form.organization.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      visit: form.visit.value,
      interest: form.interest.value,
      message: form.message.value.trim(),
      source: 11,
    };
    setStatus('sending');
    try {
      // No trailing slash, deliberately. This one path has to work on both
      // deploy targets: on Azure it is matched by the Function's own route
      // ("contact"), which is not Next's router and need not tolerate a
      // trailing slash. On Vercel, trailingSlash: true means this earns a
      // single 308 to '/api/contact/' and the POST is re-sent, which is
      // correct (308 preserves method and body) and costs one round trip.
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, recaptchaToken }),
      });
      if (response.ok || response.status === 202) {
        setStatus('success');
        form.reset();
        resetRecaptcha();
      } else if (response.status === 503) {
        setStatus('not_configured');
        resetRecaptcha();
      } else if (response.status === 400) {
        let reason = '';
        try {
          reason = (await response.json()).reason || '';
        } catch {
          /* body wasn't JSON; fall through to the generic error message */
        }
        setStatus(reason === 'recaptcha_missing' || reason === 'recaptcha_failed' ? 'recaptcha_required' : 'error');
        resetRecaptcha();
      } else {
        setStatus('error');
        resetRecaptcha();
        console.error('Contact form submit error:', response.status);
      }
    } catch (err) {
      setStatus('error');
      resetRecaptcha();
      console.error('Contact form network error:', err);
    }
  }

  if (status === 'success') {
    return createPortal(
      <p className="ct-form-status" role="status" aria-live="polite" style={{ marginTop: 0, fontSize: 15 }}>
        {t.success}
      </p>,
      mountNode,
    );
  }

  const sending = status === 'sending';
  const statusText =
    status === 'not_configured'
      ? t.notConfigured
      : status === 'recaptcha_required'
        ? t.recaptchaRequired
        : status === 'error'
          ? t.error
          : '';

  return createPortal(
    <form onSubmit={handleSubmit}>
      <h2>{t.heading}</h2>
      <div className="ct-row">
        <div className="ct-field">
          <label>{t.firstName}</label>
          <input type="text" name="firstName" placeholder="Your first name" required />
        </div>
        <div className="ct-field">
          <label>{t.lastName}</label>
          <input type="text" name="lastName" placeholder="Your last name" required />
        </div>
      </div>
      <div className="ct-field">
        <label>{t.email}</label>
        <input type="email" name="email" placeholder="you@company.com" required />
      </div>
      <div className="ct-field">
        <label>{t.organization}</label>
        <input type="text" name="organization" placeholder="Your organization" />
      </div>
      <div className="ct-field">
        <label>{t.phone}</label>
        <input type="tel" name="phone" placeholder="+1 (226) 123-4567" required />
      </div>
      <div className="ct-field">
        <label>{t.visit}</label>
        <select name="visit" defaultValue={t.visitOptions[0]} required>
          {t.visitOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div className="ct-field">
        <label>{t.interest}</label>
        <select name="interest" defaultValue={INTEREST_OPTIONS[0]}>
          {INTEREST_OPTIONS.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div className="ct-field">
        <label>{t.message}</label>
        <textarea name="message" placeholder="Tell us about your project or question..." required />
      </div>
      <label className="ct-consent" style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 14, fontSize: 13, lineHeight: 1.5, cursor: 'pointer' }}>
        <input type="checkbox" name="checkbox" required style={{ marginTop: 3, flex: '0 0 auto' }} />
        <span>{t.consent}</span>
      </label>
      <div ref={recaptchaContainerRef} style={{ marginTop: 14 }} />
      <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 14 }} disabled={sending}>
        {sending ? t.sending : t.submit}
      </button>
      <p className="ct-form-status" role="status" aria-live="polite" style={{ marginTop: 14, fontSize: 14 }}>
        {statusText}
      </p>
    </form>,
    mountNode,
  );
}
