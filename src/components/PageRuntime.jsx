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
    window.scrollTo(0, 0);

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
