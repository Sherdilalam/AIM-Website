'use client';

import { useEffect } from 'react';
import {
  runScript,
  killScrollTriggers,
  reinitWebflow,
  setActiveNav,
  whenLibsReady,
  whenChromeReady,
  loadLibs,
  applyContentEffects,
  refreshScrollTriggersAfterFonts,
  alog,
} from '../lib/webflow.js';

// The shared chrome script decorates whichever page was loaded first, so only
// later routes need their content effects re-applied.
let isFirstRoute = true;

// Per-route runtime: runs on every navigation to set the Webflow page id, load
// the route's page-specific libraries, re-arm the shared content effects, run its
// preserved scripts, reinitialise Webflow, mark the active nav link, and record a
// SPA page view.
export default function PageRuntime({ slug, wfPage, path, title, pageScript, libs }) {
  useEffect(() => {
    let cancelled = false;
    const firstRoute = isFirstRoute;
    isFirstRoute = false;

    alog(`page mount: ${path} (slug=${slug}, wfPage=${wfPage || 'none'})`);
    if (wfPage) document.documentElement.setAttribute('data-wf-page', wfPage);
    setActiveNav(path);
    // { behavior: 'instant' } is required here, not the plain scrollTo(0, 0)
    // form: the site sets `html{scroll-behavior:smooth}` globally, so a plain
    // call animates over time instead of snapping, which is what read as the
    // page "stopping" partway down before drifting up to the top.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', { page_path: path, page_title: title });
    }

    // Wait for the shared chrome script before touching ScrollTriggers or running
    // page scripts: it creates the site-wide scroll reveals, and racing it left
    // revealed content stuck at opacity 0.
    whenLibsReady(() =>
      whenChromeReady(async () => {
        // Loading a library is async, so a quick navigation can land us here after
        // unmount. The page's scripts target DOM that is already gone, so bail
        // rather than running them against the next route's content.
        if (cancelled) return;
        await loadLibs(libs);
        if (cancelled) return;
        // The unmount of the previous route already cleared its ScrollTriggers;
        // clearing again here would destroy the ones just created for this page.
        if (!firstRoute) applyContentEffects();
        alog(`running page script + Webflow reinit for ${path}`);
        if (pageScript && pageScript.trim()) runScript(pageScript);
        reinitWebflow();
        refreshScrollTriggersAfterFonts();
        // A page's own script (GSAP timelines, a delayed ScrollTrigger.refresh())
        // or Webflow's reinit above can shift scroll position after the reset at
        // the top of this effect already ran, landing a fresh navigation
        // partway down the page instead of at the hero. Re-assert it once more
        // now that everything for this route has finished initializing, and
        // again after the delayed ScrollTrigger.refresh() some page scripts run.
        // Both instant, for the same scroll-behavior:smooth reason as above.
        if (!cancelled) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        setTimeout(() => {
          if (cancelled) return;
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          // This route's ScrollTrigger instances (created above, synchronously,
          // against whatever layout existed at that instant) can end up measured
          // against a page that hasn't fully settled yet -- e.g. a route swap on
          // a slower connection/device where images are still reserving/adjusting
          // space. A stale trigger doesn't fire late, it just never fires: the
          // section stays at its GSAP "from" state (opacity:0) no matter how far
          // the page is scrolled, until something recomputes it. A full reload
          // never shows this because everything is measured once, from scratch,
          // against the final DOM. Re-measuring here, once things have had time
          // to settle, is a cheap no-op when nothing shifted and a real fix when
          // it did.
          if (window.ScrollTrigger && typeof window.ScrollTrigger.refresh === 'function') {
            window.ScrollTrigger.refresh();
          }
        }, 450);
      }),
    );

    return () => {
      cancelled = true;
      killScrollTriggers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  return null;
}
