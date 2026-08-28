/*
 * Loads the site's shared third-party libraries once, outside React's control.
 * React 19 re-inserts <script src> elements from the component tree on
 * hydration, which would run webflow.js twice and corrupt its module registry
 * ("a is not a function"). This loader is idempotent (guarded).
 *
 * Only two pairs actually need to load in order (jQuery before webflow.js,
 * which is built on it; gsap's core before its ScrollTrigger plugin). Those
 * two pairs, the Google Fonts loader, and the chatbot/analytics scripts have
 * no dependency on each other at all, so they load in parallel rather than as
 * one long chain -- the previous version fetched every script one at a time,
 * waiting for each to fully download *and execute* before even starting the
 * next, turning 6 requests into a fully serial waterfall. That was the main
 * cause of first-load being slow and inconsistent: the total wait was the
 * sum of every request's latency instead of the slowest one.
 *
 * Only libraries every page uses live here. Ones a single page needs (three.js
 * on the homepage, Lenis and the BambooHR embed on careers, PureCounter on the
 * homepage) are recorded per route by the converter and loaded on demand by
 * PageRuntime, so they are not shipped to routes that never use them.
 */
(function () {
  if (window.__aimBooted) return;
  window.__aimBooted = true;

  // Webflow's site id, used only as the ?site= query on its jQuery CDN URL. It
  // changes if the Webflow project is rebuilt; keep it in step with the
  // data-wf-site attribute in app/layout.jsx and in the export's <html>.
  var SITE_ID = '6a79aa1b9c4ff1f5e5ab7a07';

  function signalReady() {
    if (window.__aimLibsReady) return;
    window.__aimLibsReady = true;
    if (window.__AIM_DEBUG !== false) {
      console.info(
        '%c[aim]',
        'color:#a855f7;font-weight:bold',
        'core libraries loaded',
        { jQuery: !!window.jQuery, Webflow: !!window.Webflow, gsap: !!window.gsap, ScrollTrigger: !!window.ScrollTrigger },
      );
    }
    try {
      window.dispatchEvent(new Event('aim-libs-ready'));
    } catch (e) {
      /* noop */
    }
  }

  // Runs an array of {src} / {run} steps strictly in order (each script's
  // fetch only starts once the previous one has finished), for the handful of
  // cases that actually require it. Returns nothing; call `done` when finished.
  function loadSequence(steps, done) {
    var i = 0;
    function next() {
      if (i >= steps.length) {
        done();
        return;
      }
      var step = steps[i++];
      if (step.run) {
        try {
          step.run();
        } catch (e) {
          console.error('[aim-boot]', e);
        }
        next();
        return;
      }
      var el = document.createElement('script');
      el.src = step.src;
      el.async = false;
      el.onload = next;
      el.onerror = next; // don't stall the chain on a failed third-party load
      document.head.appendChild(el);
    }
    next();
  }

  // The two libraries every preserved page script can call into. gate() fires
  // signalReady only once both independent chains have finished, in whichever
  // order they actually complete.
  var pending = 2;
  function gate() {
    if (--pending <= 0) signalReady();
  }

  loadSequence(
    [
      { src: 'https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=' + SITE_ID },
      { src: '/js/webflow.js' },
    ],
    gate,
  );
  loadSequence(
    [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js' },
    ],
    gate,
  );

  // Independent of the above and of each other -- kicked off in parallel, not
  // part of the readiness gate, since no preserved page script depends on any
  // of them.
  loadSequence(
    [
      { src: 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js' },
      {
        run: function () {
          if (window.WebFont) {
            window.WebFont.load({
              google: {
                families: ['Open Sans:300,300italic,400,400italic,600,600italic,700,700italic,800,800italic'],
              },
            });
          }
        },
      },
    ],
    function () {},
  );

  loadSequence(
    [
      { src: 'https://staimchatboti2thxt.z9.web.core.windows.net/aim-chatbot.js' },
      {
        run: function () {
          if (window.AIMChatbot) {
            window.AIMChatbot.init({ apiUrl: 'https://func-aim-chatbot-prod-cc.azurewebsites.net/api' });
          }
        },
      },
    ],
    function () {},
  );

  loadSequence(
    [
      { src: 'https://www.googletagmanager.com/gtag/js?id=G-YRG1WGCZBY' },
      {
        run: function () {
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
          window.gtag('js', new Date());
          window.gtag('config', 'G-YRG1WGCZBY');
        },
      },
    ],
    function () {},
  );

  // Never strand a route if a library failed silently in a way loadSequence's
  // per-step onerror didn't catch (e.g. a CDN timing out rather than erroring).
  setTimeout(function () {
    if (!window.__aimLibsReady) {
      if (window.__AIM_DEBUG !== false) console.info('%c[aim]', 'color:#a855f7;font-weight:bold', 'libs-ready fallback fired (a library may have failed to load)');
      signalReady();
    }
  }, 10000);
})();
