import puppeteer from 'puppeteer';
import routes from '../src/generated/routes.js';

const BASE = process.env.BASE || 'http://localhost:4180';
const CONCURRENCY = 3;
// Broken images are reported separately; third-party/analytics noise and the
// known pre-existing lenis source bug are not real conversion defects.
const IGNORE =
  /recaptcha|gtag|googletagmanager|chatbot|core\.windows\.net|favicon|net::ERR_|ipapi\.co|Access to fetch|Failed to load resource/i;

// Defects in the Webflow export itself rather than in the conversion. Kept
// visible and reported separately so they don't mask a real regression: a route
// listed here still has to render correct chrome and content, it is only allowed
// to log the console error its own broken source produces.
const KNOWN_UPSTREAM = {
  '/contact-us':
    'the export renders the contact fields but no <form> wrapper, so its submit script has nothing to bind to',
};

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const results = [];
const brokenImgs = new Map();

async function test(route) {
  const page = await browser.newPage();
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
  try {
    // domcontentloaded + settle: networkidle never fires because the chatbot /
    // analytics / geo-IP connections stay open.
    await page.goto(BASE + route.path, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 2500));
    const info = await page.evaluate(() => {
      const wrap = document.querySelector('.customcode-wrapper');
      // Layout fidelity, not just presence. This export keeps the design's whole
      // stylesheet in a <head> <style>; when that is not carried over, every page
      // still has its markup and passes a presence check while rendering as an
      // unstyled column. A styled navbar is a horizontal bar with a real-sized
      // theme button in it, so assert that instead of trusting the DOM alone.
      const nav = document.querySelector('nav.nav');
      const navBox = nav ? nav.getBoundingClientRect() : null;
      const tog = document.getElementById('themeToggle');
      const togBox = tog ? tog.getBoundingClientRect() : null;
      const bodyFont = getComputedStyle(document.body).fontFamily || '';
      return {
        hasNav: !!nav,
        hasFooter: !!document.querySelector('footer.foot'),
        navIsBar: !!navBox && navBox.width > window.innerWidth * 0.8 && navBox.height < 200,
        togSized: !!togBox && togBox.width >= 24 && togBox.height >= 24,
        // The design's typeface arrives with that same stylesheet.
        designFont: /Poppins|Inter/i.test(bodyFont),
        mainLen: (document.querySelector('main')?.innerHTML || '').length,
        // Visibility, not just DOM presence: catches CSS/JS that hides content.
        visibleTextLen: (document.body.innerText || '').trim().length,
        shellVisible: !!wrap && getComputedStyle(wrap).display !== 'none' && wrap.offsetHeight > 200,
        title: document.title,
        broken: [...document.querySelectorAll('img')]
          .filter((i) => i.complete && i.naturalWidth === 0 && i.getAttribute('src'))
          .map((i) => i.getAttribute('src')),
      };
    });
    const relErrors = errors.filter((e) => !IGNORE.test(e));
    // Routes the export has no content for should still render working chrome;
    // asserting a populated <main> on them would report an upstream content gap
    // as a conversion failure.
    const contentOk = route.empty ? info.mainLen === 0 : info.mainLen > 500 && info.visibleTextLen > 200;
    const styledOk = info.navIsBar && info.togSized && info.designFont;
    const structureOk = info.hasNav && info.hasFooter && info.shellVisible && contentOk && styledOk;
    const known = KNOWN_UPSTREAM[route.path];
    const ok = structureOk && (relErrors.length === 0 || Boolean(known));
    if (info.broken.length) info.broken.forEach((s) => brokenImgs.set(s, (brokenImgs.get(s) || 0) + 1));
    results.push({
      path: route.path,
      ok,
      info,
      relErrors,
      empty: route.empty,
      knownIssue: known && relErrors.length ? known : null,
    });
  } catch (e) {
    results.push({ path: route.path, ok: false, info: { mainLen: 0 }, relErrors: ['NAV: ' + e.message] });
  } finally {
    await page.close();
  }
}

const queue = [...routes];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) await test(queue.shift());
  }),
);

results.sort((a, b) => a.path.localeCompare(b.path));
const failed = results.filter((r) => !r.ok);
const emptyRoutes = results.filter((r) => r.empty);
console.log(`Tested ${results.length} routes. PASS ${results.length - failed.length} / FAIL ${failed.length}`);
console.log(
  `  ${results.length - emptyRoutes.length} with content, ${emptyRoutes.length} chrome-only (no content in this export)\n`,
);
for (const r of failed) {
  console.log(
    `FAIL ${r.path}  nav=${r.info.hasNav} footer=${r.info.hasFooter} mainLen=${r.info.mainLen} shellVisible=${r.info.shellVisible} visibleText=${r.info.visibleTextLen} navIsBar=${r.info.navIsBar} togSized=${r.info.togSized} designFont=${r.info.designFont}${r.empty ? ' [expected chrome-only]' : ''}`,
  );
  (r.relErrors || []).slice(0, 4).forEach((e) => console.log('   ! ' + e.slice(0, 150)));
}

// SPA client-side navigation check.
{
  const page = await browser.newPage();
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 2500));
  await page.evaluate(() => (window.__m = true));
  const clicked = await page.evaluate(() => {
    const a = document.querySelector('nav.nav a[href="/about-us/"], nav.nav a[href="/about-us"]');
    if (!a) return false;
    a.click();
    return true;
  });
  if (clicked) {
    await new Promise((r) => setTimeout(r, 900));
    const res = await page.evaluate(() => ({ url: location.pathname, spa: window.__m === true }));
    const ok = /\/about-us\/?$/.test(res.url) && res.spa;
    console.log(`${ok ? 'PASS' : 'FAIL'} SPA nav -> ${res.url} (no reload: ${res.spa})`);
    if (!ok) failed.push({ path: 'SPA-nav' });
  } else {
    console.log('WARN: about-us nav link not found for SPA test');
  }
  await page.close();
}

const known = results.filter((r) => r.knownIssue);
if (known.length) {
  console.log(`\nKnown export defects (${known.length}) -- rendered fine, but fix these in Webflow:`);
  for (const r of known) {
    console.log(`   ${r.path}: ${r.knownIssue}`);
    (r.relErrors || []).slice(0, 2).forEach((e) => console.log(`      ! ${e.slice(0, 130)}`));
  }
}

const uniqBroken = [...brokenImgs.entries()].sort((a, b) => b[1] - a[1]);
if (uniqBroken.length) {
  console.log(`\nBroken image sources (${uniqBroken.length} unique):`);
  uniqBroken.slice(0, 20).forEach(([s, n]) => console.log(`   [${n}x] ${s}`));
}
await browser.close();
console.log(`\n${failed.length === 0 ? 'ALL GOOD' : failed.length + ' FAILURE(S)'}`);
process.exit(failed.length ? 1 : 0);
