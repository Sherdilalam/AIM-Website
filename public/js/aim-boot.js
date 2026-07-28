/*
 * Loads the site's shared third-party libraries once, in order, outside React's
 * control. React 19 re-inserts <script src> elements from the component tree on
 * hydration, which would run webflow.js twice and corrupt its module registry
 * ("a is not a function"). This loader is idempotent (guarded) and loads
 * everything sequentially so jQuery precedes webflow.js and gsap precedes
 * ScrollTrigger. It signals readiness so the app can run preserved page scripts.
 *
 * Only libraries every page uses live here. Ones a single page needs (three.js
 * on the homepage, Lenis and the BambooHR embed on careers, PureCounter on the
 * homepage) are recorded per route by the converter and loaded on demand by
 * PageRuntime, so they are not shipped to routes that never use them.
 */
(function () {
  if (window.__aimBooted) return;
  window.__aimBooted = true;

  var SITE_ID = '6a68f37e87efa6a5b2b2119b';

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

  var steps = [
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
    { src: 'https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=' + SITE_ID },
    { src: '/js/webflow.js' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js' },
    // Core libraries needed by preserved page scripts are ready here.
    { run: signalReady },
    // Non-critical extras continue loading afterwards.
    { src: 'https://staimchatboti2thxt.z9.web.core.windows.net/aim-chatbot.js' },
    {
      run: function () {
        if (window.AIMChatbot) {
          window.AIMChatbot.init({ apiUrl: 'https://func-aim-chatbot-prod-cc.azurewebsites.net/api' });
        }
      },
    },
    { src: 'https://www.googletagmanager.com/gtag/js?id=G-YRG1WGCZBY' },
    {
      run: function () {
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', 'G-YRG1WGCZBY');
      },
    },
  ];

  var i = 0;
  function next() {
    if (i >= steps.length) {
      signalReady();
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
})();
