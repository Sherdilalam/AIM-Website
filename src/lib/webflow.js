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

// Execute preserved script text in global scope, but make load/DOMContentLoaded
// handlers fire immediately (the DOM is already mounted when we run this, and
// those events never re-fire on client-side navigation). Blocks separated by the
// sentinel are evaluated independently -- like separate <script> tags -- so one
// block's error can't prevent the others from running.
export function runScript(code) {
  if (!code || !code.trim()) return;
  const blocks = code.split(BLOCK_SEP).filter((b) => b.trim()).length;
  alog(`runScript: ${blocks} block(s), ${code.length} chars`);
  const wAdd = window.addEventListener;
  const dAdd = document.addEventListener;
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

// Reflect the active route in the persistent nav's Webflow "current" styling.
export function setActiveNav(routePath) {
  const links = document.querySelectorAll('.navbar_component a[href]');
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
