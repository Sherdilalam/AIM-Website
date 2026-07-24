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
      if (href.startsWith('#')) return; // same-page anchor
      if (/^\/(images|documents|css|js)\//i.test(href)) return; // static assets
      if (!href.startsWith('/')) return;
      e.preventDefault();
      router.push(href);
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [router]);
  return null;
}
