'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// Internal links live inside preserved HTML (plain <a>), so intercept their
// clicks and route client-side instead of triggering a full page reload.
export default function LinkInterceptor() {
  const router = useRouter();
  const pathname = usePathname();
  const [navigating, setNavigating] = useState(false);
  const navigatingTimeout = useRef(null);

  // A route's own segment has no async server work to suspend on (its content
  // comes from a synchronous readFileSync, not a slow data fetch), so app router
  // loading.js never actually triggers here -- the delay users saw was pure
  // network transfer time of an already-fully-rendered response, which Next
  // shows no built-in feedback for. Drive the indicator ourselves instead: show
  // it the moment a real cross-page router.push() is issued, and clear it once
  // the pathname actually changes to match (confirmation the new page landed).
  useEffect(() => {
    setNavigating(false);
    clearTimeout(navigatingTimeout.current);
  }, [pathname]);

  useEffect(() => {
    return () => clearTimeout(navigatingTimeout.current);
  }, []);

  useEffect(() => {
    // Internal links here are plain, preserved <a href> markup, not next/link's
    // <Link>, so none of them get Next's automatic hover/viewport prefetching --
    // every click was a cold fetch of that route's data with no head start,
    // which is what made navigation feel slow and inconsistent. Prefetch on
    // hover intent instead: a short delay so a mouse just passing over a link
    // doesn't trigger a fetch, and a cache so the same href is never requested
    // twice in one session.
    const prefetched = new Set();
    let hoverTimer = null;
    function prefetchHref(href) {
      if (prefetched.has(href)) return;
      prefetched.add(href);
      try {
        router.prefetch(href);
      } catch {
        /* prefetch is best-effort; a failure here must never block navigation */
      }
    }
    function onPointerOver(e) {
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || prefetched.has(href)) return;
      if (/^(https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(href)) return;
      if (/^\/(images|documents|css|js)\//i.test(href)) return;
      if (!href.startsWith('/')) return;
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => prefetchHref(href), 60);
    }
    function onPointerOut() {
      clearTimeout(hoverTimer);
    }
    document.addEventListener('mouseover', onPointerOver);
    document.addEventListener('mouseout', onPointerOut);
    // Touch devices have no hover; prefetch on the initial touch instead, which
    // still lands well before the click handler below completes its own work.
    document.addEventListener('touchstart', onPointerOver, { passive: true });

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
      // router.push() to the page you're already on is a no-op in the App Router --
      // no re-render, no scroll reset, nothing visibly happens, which reads as "the
      // page doesn't reload." A scroll-to-top alone isn't enough either: the page's
      // own PageRuntime effect (which re-arms every GSAP/ScrollTrigger reveal) is
      // keyed on the route slug, so it also doesn't re-run when the slug is
      // unchanged, which is what actually caused the reported blank sections.
      // Force a real, full browser navigation instead -- identical to how the page
      // behaves the first time it's ever loaded. Normalize away a trailing slash
      // (this export runs trailingSlash: true, so location.pathname can have one
      // even when the link's href doesn't) before comparing.
      const normalize = (p) => (p.length > 1 ? p.replace(/\/+$/, '') : p);
      const targetPath = normalize(href.split(/[?#]/)[0]);
      const currentPath = normalize(window.location.pathname);
      if (targetPath === currentPath) {
        window.location.href = href;
        return;
      }
      setNavigating(true);
      // Safety net: if a navigation never resolves to a pathname change (e.g. a
      // route that 404s under dynamicParams:false), don't leave the bar stuck.
      clearTimeout(navigatingTimeout.current);
      navigatingTimeout.current = setTimeout(() => setNavigating(false), 8000);
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
    return () => {
      clearTimeout(hoverTimer);
      document.removeEventListener('click', onClick);
      document.removeEventListener('mouseover', onPointerOver);
      document.removeEventListener('mouseout', onPointerOut);
      document.removeEventListener('touchstart', onPointerOver);
    };
  }, [router]);

  if (!navigating) return null;
  return (
    <div aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 2000, overflow: 'hidden', pointerEvents: 'none' }}>
      <div className="aim-route-progress" />
      <style>{`
        .aim-route-progress {
          height: 100%;
          width: 40%;
          background: linear-gradient(90deg, #1800AD, #C026D3);
          border-radius: 0 2px 2px 0;
          animation: aim-route-progress-slide 1.1s ease-in-out infinite;
        }
        @keyframes aim-route-progress-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aim-route-progress { animation-duration: 2.2s; }
        }
      `}</style>
    </div>
  );
}
