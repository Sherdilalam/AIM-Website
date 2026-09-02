// Azure Static Web Apps managed Function backing the /api/contact route the
// site's contact form (src/components/ContactForm.jsx) submits to.
//
// Two secrets live here, and only here, never in client code:
//   CONTACT_FLOW_URL    the Power Automate flow URL (embeds a bearer signature)
//   RECAPTCHA_SECRET_KEY the reCAPTCHA v2 secret key, used to verify the
//                        client's token server-to-server before trusting it
//
// Next.js can't hold either of these server-side here: this project is
// `output: 'export'` (a static site with no server at runtime), so a Next.js
// Route Handler cannot do dynamic work like this. Azure Static Web Apps' own
// managed Functions API (this folder) is the supported way to add a real
// server-side endpoint to a static-export site deployed there -- it runs
// alongside the static files and is exposed at /api/* on the same origin, so
// the browser only ever talks to our own site.
//
// Both env vars are read from the Functions runtime's own environment:
// locally from api/local.settings.json (gitignored, never committed), in
// production from Application Settings on the Static Web App resource. They
// are never present in the static export or any client-shipped file.
const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

async function verifyRecaptcha(token, secret) {
  const params = new URLSearchParams({ secret, response: token });
  const res = await fetch(RECAPTCHA_VERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  return res.json();
}

module.exports = async function (context, req) {
  const CONTACT_FLOW_URL = process.env.CONTACT_FLOW_URL;
  const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

  if (!CONTACT_FLOW_URL) {
    context.log.warn('CONTACT_FLOW_URL is not set; contact form submissions will report as not configured.');
    context.res = {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
      body: { ok: false, reason: 'not_configured' },
    };
    return;
  }

  const body = req.body || {};
  const str = (v) => (typeof v === 'string' ? v.trim() : '');

  // The reCAPTCHA token never gets forwarded to Power Automate, it's only
  // used here, once, to verify the submission is not automated.
  const recaptchaToken = str(body.recaptchaToken);
  if (!RECAPTCHA_SECRET_KEY) {
    context.log.warn('RECAPTCHA_SECRET_KEY is not set; rejecting submission rather than skipping verification.');
    context.res = {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
      body: { ok: false, reason: 'not_configured' },
    };
    return;
  }
  if (!recaptchaToken) {
    context.res = {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
      body: { ok: false, reason: 'recaptcha_missing' },
    };
    return;
  }
  try {
    const verification = await verifyRecaptcha(recaptchaToken, RECAPTCHA_SECRET_KEY);
    if (!verification.success) {
      context.log.warn('reCAPTCHA verification failed:', verification['error-codes']);
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: { ok: false, reason: 'recaptcha_failed' },
      };
      return;
    }
  } catch (err) {
    context.log.error('reCAPTCHA verification request error:', err);
    context.res = {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
      body: { ok: false, reason: 'recaptcha_verify_error' },
    };
    return;
  }

  const payload = {
    firstName: str(body.firstName),
    lastName: str(body.lastName),
    organization: str(body.organization),
    email: str(body.email),
    phone: str(body.phone),
    visit: str(body.visit),
    interest: str(body.interest),
    message: str(body.message),
    source: 11,
  };

  if (!payload.firstName || !payload.lastName || !payload.email || !payload.phone || !payload.visit || !payload.message) {
    context.res = {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
      body: { ok: false, reason: 'missing_required_fields' },
    };
    return;
  }

  try {
    const upstream = await fetch(CONTACT_FLOW_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (upstream.ok || upstream.status === 202) {
      context.res = {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: { ok: true },
      };
    } else {
      context.log.error('Contact flow upstream error:', upstream.status);
      context.res = {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
        body: { ok: false, reason: 'upstream_error' },
      };
    }
  } catch (err) {
    context.log.error('Contact flow network error:', err);
    context.res = {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
      body: { ok: false, reason: 'network_error' },
    };
  }
};
