'use client';

import { useEffect } from 'react';
import { runScript, killScrollTriggers, reinitWebflow, setActiveNav, whenLibsReady, alog } from '../lib/webflow.js';

// Per-route runtime: runs on every navigation to set the Webflow page id, run the
// page's preserved scripts, reinitialise Webflow interactions against the new
// content, mark the active nav link, and record a SPA page view.
export default function PageRuntime({ slug, wfPage, path, title, pageScript }) {
  useEffect(() => {
    alog(`page mount: ${path} (slug=${slug}, wfPage=${wfPage || 'none'})`);
    if (wfPage) document.documentElement.setAttribute('data-wf-page', wfPage);
    setActiveNav(path);
    window.scrollTo(0, 0);

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', { page_path: path, page_title: title });
    }

    whenLibsReady(() => {
      alog(`libs ready -> running page script + Webflow reinit for ${path}`);
      killScrollTriggers();
      if (pageScript && pageScript.trim()) runScript(pageScript);
      reinitWebflow();
    });

    return () => killScrollTriggers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  return null;
}
