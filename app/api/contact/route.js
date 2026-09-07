// Server-side endpoint backing the contact form (src/components/ContactForm.jsx),
// which POSTs here at /api/contact on the same origin.
//
// Two secrets live here, and only here, never in client code:
//   CONTACT_FLOW_URL      the Power Automate flow URL (embeds a bearer signature)
//   RECAPTCHA_SECRET_KEY  the reCAPTCHA v2 secret, used to verify the client's
//                         token server-to-server before the lead is trusted
//
// Both are read from the runtime environment: locally from .env.local, in
// production from the Vercel project's environment variables. Neither is ever
// present in the client bundle. Only NEXT_PUBLIC_RECAPTCHA_SITE_KEY is, and a
// reCAPTCHA site key is public by design.
//
// This replaces an Azure Static Web Apps managed Function that used to live in
// api/contact/index.js. That used the Azure Functions programming model
// (context/req plus a function.json binding), which Vercel cannot execute, so
// the form had no reachable backend after the move.

const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

function json(status, body) {
  return Response.json(body, { status });
}

async function verifyRecaptcha(token, secret) {
  const res = await fetch(RECAPTCHA_VERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }).toString(),
  });
  return res.json();
}

export async function POST(request) {
  const CONTACT_FLOW_URL = process.env.CONTACT_FLOW_URL;
  const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

  if (!CONTACT_FLOW_URL) {
    console.warn('[contact] CONTACT_FLOW_URL is not set; reporting as not configured.');
    return json(503, { ok: false, reason: 'not_configured' });
  }
  if (!RECAPTCHA_SECRET_KEY) {
    console.warn('[contact] RECAPTCHA_SECRET_KEY is not set; rejecting rather than skipping verification.');
    return json(503, { ok: false, reason: 'not_configured' });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json(400, { ok: false, reason: 'invalid_json' });
  }

  const str = (v) => (typeof v === 'string' ? v.trim() : '');

  // The reCAPTCHA token is never forwarded to Power Automate. It is used here,
  // once, to establish that the submission is not automated.
  const recaptchaToken = str(body.recaptchaToken);
  if (!recaptchaToken) {
    return json(400, { ok: false, reason: 'recaptcha_missing' });
  }
  try {
    const verification = await verifyRecaptcha(recaptchaToken, RECAPTCHA_SECRET_KEY);
    if (!verification.success) {
      console.warn('[contact] reCAPTCHA verification failed:', verification['error-codes']);
      return json(400, { ok: false, reason: 'recaptcha_failed' });
    }
  } catch (err) {
    console.error('[contact] reCAPTCHA verification request error:', err);
    return json(502, { ok: false, reason: 'recaptcha_verify_error' });
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
    return json(400, { ok: false, reason: 'missing_required_fields' });
  }

  try {
    const upstream = await fetch(CONTACT_FLOW_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (upstream.ok || upstream.status === 202) {
      return json(200, { ok: true });
    }
    console.error('[contact] flow upstream error:', upstream.status);
    return json(502, { ok: false, reason: 'upstream_error' });
  } catch (err) {
    console.error('[contact] flow network error:', err);
    return json(502, { ok: false, reason: 'network_error' });
  }
}
