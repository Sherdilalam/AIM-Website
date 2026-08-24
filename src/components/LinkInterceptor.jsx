'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Internal links live inside preserved HTML (plain <a>), so intercept their
// clicks and route client-side instead of triggering a full page reload.
export default function LinkInterceptor() {
  const router = useRouter();
  useEffect(() => {
    function onClick(e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      const target = a.getAttribute('target');
      if (target && target !== '_self') return;
      if (a.hasAttribute('download')) return;
      const href = a.getAttribute('href');
      if (!href) return;
      if (/^(https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(href)) return;
      if (href.startsWith('#')) {
        const id = href.slice(1);
        if (!id) return; // bare '#' trigger link, handled by the nav's own dropdown script
        const hashTarget = document.getElementById(id);
        if (!hashTarget) return; // no matching element here; let the browser try its default behavior
        e.preventDefault();
        closeNavMenus();
        scrollToHash(hashTarget, href);
        return;
      }
      if (/^\/(images|documents|css|js)\//i.test(href)) return; // static assets
      if (!href.startsWith('/')) return;
      e.preventDefault();
      closeNavMenus();
      router.push(href);
    }
    // The browser's own "scroll to fragment" for a same-page #hash click was
    // measured (via live instrumentation) to sit idle for ~2s before visibly
    // moving on this site, with no app script or long task explaining the
    // stall -- likely an interaction between native scroll-behavior:smooth and
    // this page's async content/fonts settling. Driving the scroll ourselves
    // sidesteps whatever that native stall is, and lets us offset for the
    // fixed nav at the same time (plain scrollIntoView renders the target
    // right under it, per the "why is X hidden" nav-overlay bug pattern).
    function scrollToHash(target, href) {
      const nav = document.getElementById('nav');
      const navH = nav ? nav.getBoundingClientRect().height : 80;
      const y = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top: Math.max(0, y), left: 0, behavior: 'smooth' });
      try {
        window.history.replaceState(window.history.state, '', href);
      } catch {
        /* ignore */
      }
    }
    // The nav bar persists across client-side navigations (see Navbar.jsx), but its
    // dropdowns only open/close via CSS :hover. Clicking a link inside an open dropdown
    // navigates without moving the mouse, so :hover never releases and the dropdown is
    // left covering the new page until the mouse is moved. Force it closed on every
    // intercepted click, then let normal :hover behavior resume on the next mouse move.
    function closeNavMenus() {
      const nav = document.getElementById('nav');
      if (!nav) return;
      nav.classList.remove('open');
      nav.querySelectorAll('.has-dd.open').forEach((li) => li.classList.remove('open'));
      const dds = nav.querySelectorAll('.dd');
      dds.forEach((dd) => {
        dd.style.setProperty('opacity', '0', 'important');
        dd.style.setProperty('visibility', 'hidden', 'important');
        dd.style.setProperty('transition', 'none', 'important');
      });
      function clear() {
        dds.forEach((dd) => {
          dd.style.removeProperty('opacity');
          dd.style.removeProperty('visibility');
          dd.style.removeProperty('transition');
        });
        window.removeEventListener('mousemove', clear);
      }
      window.addEventListener('mousemove', clear);
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [router]);
  return null;
}
