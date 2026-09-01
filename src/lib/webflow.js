// Runtime helpers for executing preserved Webflow-export scripts inside the app.
// Imported only by client components.

// Lightweight, prefixed debug logging. Toggle at runtime in the browser console
// with `window.__AIM_DEBUG = false` (or true). Defaults on so issues are visible.
export function alog(...args) {
  if (typeof window !== 'undefined' && window.__AIM_DEBUG === false) return;
  console.info('%c[aim]', 'color:#a855f7;font-weight:bold', ...args);
}

const BLOCK_SEP = '/*__AIM_BLOCK__*/';

// Run a callback once the boot loader (public/js/aim-boot.js) has finished
// loading the core libraries (it sets __aimLibsReady after PureCounter, the last
// one the page scripts depend on). Resolves immediately on later client-side
// navigations. Only the readiness flag/event counts -- checking for an
// individual global like window.Webflow would fire too early, before the rest of
// the sequence (gsap, ScrollTrigger, PureCounter) has loaded.
export function whenLibsReady(cb) {
  if (window.__aimLibsReady) {
    cb();
    return;
  }
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    cb();
  };
  window.addEventListener('aim-libs-ready', run, { once: true });
  // Fallback: resolve on the flag, or after ~10s in case a library failed.
  let ticks = 0;
  const iv = setInterval(() => {
    if (window.__aimLibsReady || ++ticks > 200) {
      clearInterval(iv);
      if (!window.__aimLibsReady) alog('libs-ready fallback fired (a library may have failed to load)');
      run();
    }
  }, 50);
}

// The shared chrome script owns the site-wide scroll reveals and stat counters,
// so a route's own scripts must not run until it has finished: otherwise the
// per-route ScrollTrigger cleanup can tear down triggers the chrome script has
// only just created, leaving revealed content stuck at opacity 0.
let chromeReady = false;
const chromeWaiters = [];

export function markChromeReady() {
  if (chromeReady) return;
  chromeReady = true;
  chromeWaiters.splice(0).forEach((cb) => cb());
}

export function whenChromeReady(cb) {
  if (chromeReady) {
    cb();
    return;
  }
  chromeWaiters.push(cb);
  // Never strand a route if the chrome script itself failed.
  setTimeout(() => {
    if (!chromeReady) {
      alog('chrome-ready fallback fired (the shared chrome script may have failed)');
      markChromeReady();
    }
  }, 4000);
}

// Re-apply the content-scoped effects from the shared chrome script to a newly
// mounted route. That script runs once per session, so on a client-side
// navigation the incoming page's `.reveal` and `.count` elements would otherwise
// never be touched -- leaving reveals unanimated and, worse, stat counters stuck
// on their placeholder "0" instead of counting up to `data-to`.
//
// These mirror the SCROLL REVEALS and STAT COUNTERS sections of
// src/generated/global-chrome.js; keep them in step if the export changes them.
export function applyContentEffects() {
  const d = document;
  const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const reveals = [...d.querySelectorAll('.reveal')].filter((el) => !el.dataset.aimRevealed);
  if (reveals.length) {
    reveals.forEach((el) => {
      el.dataset.aimRevealed = '1';
    });
    if (window.gsap && window.ScrollTrigger && !rm) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      window.gsap.set(reveals, { opacity: 0, y: 48 });
      reveals.forEach((el) =>
        window.gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        }),
      );
    } else {
      reveals.forEach((el) => {
        el.style.opacity = '1';
      });
    }
    alog(`applied scroll reveals to ${reveals.length} element(s)`);
  }

  const grid = d.querySelector('.stat-grid:not([data-aim-counted])');
  if (grid) {
    grid.dataset.aimCounted = '1';
    let done = false;
    const run = () => {
      if (done) return;
      done = true;
      d.querySelectorAll('.count').forEach((el) => {
        const to = +el.dataset.to;
        if (!Number.isFinite(to)) return;
        let start = null;
        const dur = 1500;
        const step = (t) => {
          if (!start) start = t;
          const p = Math.min((t - start) / dur, 1);
          el.textContent = Math.floor(p * to);
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = to;
        };
        requestAnimationFrame(step);
      });
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (es) => es.forEach((e) => e.isIntersecting && run()),
        { threshold: 0.4 },
      );
      io.observe(grid);
    } else {
      run();
    }
    alog('re-armed stat counters');
  }
}

// Load a route's page-specific libraries (three.js, Lenis, PureCounter, the
// BambooHR embed) before its preserved scripts run. Sequential, so a page that
// lists a library and its plugin gets them in order, and cached per URL so
// revisiting a route does not re-fetch or re-execute anything.
const libCache = new Map();

function loadLib(src) {
  if (libCache.has(src)) return libCache.get(src);
  const p = new Promise((resolve) => {
    const existing = document.querySelector(`script[data-aim-lib="${CSS.escape(src)}"]`);
    if (existing) {
      resolve();
      return;
    }
    const el = document.createElement('script');
    el.src = src;
    el.async = false;
    el.setAttribute('data-aim-lib', src);
    el.onload = () => resolve();
    el.onerror = () => {
      alog(`page library failed to load: ${src}`);
      resolve(); // never stall the page on a third-party failure
    };
    document.head.appendChild(el);
  });
  libCache.set(src, p);
  return p;
}

export async function loadLibs(srcs) {
  if (!srcs || !srcs.length) return;
  alog(`loading ${srcs.length} page library/libraries`);
  for (const src of srcs) await loadLib(src);
}

// Execute preserved script text in global scope, but make load/DOMContentLoaded
// handlers fire immediately (the DOM is already mounted when we run this, and
// those events never re-fire on client-side navigation). Blocks separated by the
// sentinel are evaluated independently -- like separate <script> tags -- so one
// block's error can't prevent the others from running.
//
// A preserved script has no route-change lifecycle of its own: any listener it
// adds straight to window/document (e.g. the `aim-lang-change` translate hook
// every page script registers) has no way to know when its own page has been
// navigated away from, so it just keeps living on window for the rest of the
// SPA session. It then fires again on a later, unrelated navigation -- often
// re-running that page's own DOM queries (broad, position-based CSS selectors
// like ".sec:nth-child(4) .heading", not scoped to that page's own container)
// against whatever page happens to be mounted at that moment, silently
// overwriting the new page's content with the old page's. This is what caused
// headings to "leak" between product pages and land with the wrong
// scroll-reveal offset after navigating away and back. Track every listener a
// script adds here and hand the caller a function to remove them all, so a
// route's own script-added listeners can be torn down the moment that route
// unmounts, the same way its ScrollTriggers already are.
export function runScript(code) {
  if (!code || !code.trim()) return null;
  const blocks = code.split(BLOCK_SEP).filter((b) => b.trim()).length;
  alog(`runScript: ${blocks} block(s), ${code.length} chars`);
  const wAdd = window.addEventListener;
  const dAdd = document.addEventListener;
  const tracked = [];
  const shim = (orig, target) =>
    function (type, handler, opts) {
      if ((type === 'load' || type === 'DOMContentLoaded') && typeof handler === 'function') {
        try {
          handler.call(target, new Event(type));
        } catch (e) {
          console.error('[aim] deferred handler error:', e);
        }
        return;
      }
      tracked.push({ target, type, handler, opts });
      return orig.call(target, type, handler, opts);
    };
  window.addEventListener = shim(wAdd, window);
  document.addEventListener = shim(dAdd, document);
  try {
    for (const block of code.split(BLOCK_SEP)) {
      if (!block.trim()) continue;
      try {
        // indirect eval -> runs in global scope, like a <script> tag
        (0, eval)(block);
      } catch (e) {
        console.error('[aim] script block error:', e);
      }
    }
  } finally {
    window.addEventListener = wAdd;
    document.addEventListener = dAdd;
  }
  return () => {
    tracked.forEach(({ target, type, handler, opts }) => {
      try {
        target.removeEventListener(type, handler, opts);
      } catch (e) {
        /* noop */
      }
    });
    if (tracked.length) alog(`runScript cleanup: removed ${tracked.length} window/document listener(s)`);
  };
}

// Every page's script creates its scroll-triggered reveals (.sa-pillar, .sa-step,
// etc.) as soon as it runs, using whatever layout exists at that moment. The
// Google Fonts <link> in <head> means text is still on a fallback font then;
// when the real font swaps in, line-wrapping and section heights can shift,
// leaving ScrollTrigger's cached trigger positions stale. Its own resize
// listener doesn't catch this (a font swap reflows the page without changing
// the viewport size), so a trigger can end up permanently past the point
// ScrollTrigger thinks it starts at -- the element never reveals no matter how
// far the page is scrolled, even though the markup and animation are both
// correct. Call this once a route's ScrollTriggers exist so it re-measures
// against the final, settled layout.
export function refreshScrollTriggersAfterFonts() {
  try {
    if (!document.fonts || !document.fonts.ready) return;
    document.fonts.ready.then(() => {
      if (window.ScrollTrigger && typeof window.ScrollTrigger.refresh === 'function') {
        window.ScrollTrigger.refresh();
      }
    });
  } catch (e) {
    /* noop */
  }
}

// Kill GSAP ScrollTriggers so they don't accumulate across route changes.
export function killScrollTriggers() {
  try {
    if (window.ScrollTrigger && typeof window.ScrollTrigger.getAll === 'function') {
      window.ScrollTrigger.getAll().forEach((t) => t.kill());
    }
  } catch (e) {
    /* noop */
  }
}

// Re-run Webflow's module + IX2 interaction engine against the current DOM.
export function reinitWebflow() {
  try {
    const wf = window.Webflow;
    if (!wf) {
      alog('reinitWebflow: window.Webflow not present yet, skipping');
      return;
    }
    if (typeof wf.destroy === 'function') wf.destroy();
    if (typeof wf.ready === 'function') wf.ready();
    if (typeof wf.require === 'function') {
      const ix2 = wf.require('ix2');
      if (ix2 && typeof ix2.init === 'function') ix2.init();
    }
    alog('reinitWebflow: done');
  } catch (e) {
    console.error('[aim] Webflow reinit error:', e);
  }
}

// Mark the current route in the persistent nav. This export's nav ships no
// active-link styling of its own, so `aria-current` is the part that carries
// real weight (assistive tech, and a hook for CSS later); `w--current` is kept
// for the Webflow convention in case the design adds a rule for it.
export function setActiveNav(routePath) {
  const links = document.querySelectorAll('nav.nav a[href], .navbar_component a[href]');
  links.forEach((a) => {
    const href = a.getAttribute('href');
    const norm = (href || '').replace(/\/$/, '') || '/';
    const target = (routePath || '/').replace(/\/$/, '') || '/';
    const isCurrent = norm === target;
    a.classList.toggle('w--current', isCurrent);
    if (isCurrent) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}
