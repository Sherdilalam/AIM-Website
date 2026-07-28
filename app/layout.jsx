import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import Navbar from '../src/components/Navbar.jsx';
import Footer from '../src/components/Footer.jsx';
import GlobalChrome from '../src/components/GlobalChrome.jsx';
import LinkInterceptor from '../src/components/LinkInterceptor.jsx';
import { headCssHref, stylesheets } from '../src/generated/head.js';

const globalChromeCode = readFileSync(join(process.cwd(), 'src/generated/global-chrome.js'), 'utf8');

// Applies the theme and language classes before first paint to avoid a flash.
// Mirrors the export's own head script (theme lives in sessionStorage, an older
// localStorage key is cleaned up) and additionally restores the saved language,
// which the export does from a body script -- too late here, since the app runs
// preserved body scripts only after its libraries have loaded.
const THEME_NOFLASH = `(function(){var th=null,lang=null;
try{localStorage.removeItem('aim-theme');}catch(e){}
try{th=sessionStorage.getItem('aim-theme');}catch(e){}
try{lang=localStorage.getItem('aim-lang');}catch(e){}
function go(){var b=document.body;if(!b){requestAnimationFrame(go);return;}
b.classList.add('aim');
if(th==='dark'){b.classList.remove('t-light');b.classList.add('t-dark');}
else{b.classList.remove('t-dark');b.classList.add('t-light');}
if(lang==='fr'||lang==='en'){b.setAttribute('data-lang',lang);}}
go();})();`;

export const metadata = {
  metadataBase: new URL('https://www.iaim.ca'),
  title: 'AI-Powered Digital Engineering & IT Solutions | AIM',
  description:
    'Transform your business with AI-driven digital engineering, cloud modernization, and IT strategy. Trusted by global enterprises in healthcare, finance & tech.',
  icons: {
    icon: [
      { url: '/images/favicon.png', media: '(prefers-color-scheme: light)', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon-dark.png', media: '(prefers-color-scheme: dark)', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/images/webclip-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/images/webclip-180.png', sizes: '180x180' }],
  },
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: the no-flash script and Webflow set classes/
    // attributes on <html>/<body> before hydration; the server can't know the
    // visitor's stored theme, so this mismatch is expected and intentional.
    <html lang="en" data-wf-site="6a68f37e87efa6a5b2b2119b" suppressHydrationWarning>
      <body className="body" suppressHydrationWarning>
        {/* Preconnect + Webflow stylesheets served from /public (so CSS url(../images) resolves). */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="/css/normalize.css" precedence="aim-1" />
        <link rel="stylesheet" href="/css/webflow.css" precedence="aim-2" />
        <link rel="stylesheet" href="/css/architecture-in-motion.webflow.css" precedence="aim-3" />
        {/* The design's typeface and its stylesheet both live in the export's
            <head>, not in the exported .webflow.css. Extracted by the converter
            and loaded here, after the Webflow sheets it overrides. */}
        {stylesheets.map((href) => (
          <link key={href} rel="stylesheet" href={href} precedence="aim-4" />
        ))}
        {headCssHref && <link rel="stylesheet" href={headCssHref} precedence="aim-5" />}
        <link rel="stylesheet" href="/css/aim-overrides.css" precedence="aim-6" />

        <script dangerouslySetInnerHTML={{ __html: THEME_NOFLASH }} />

        {/* The export wraps its embed blocks in .customcode-wrapper; keep that
            container so the pages' own CSS resolves against the same structure. */}
        <div className="customcode-wrapper">
          <Navbar />
          {children}
          <Footer />
        </div>

        <GlobalChrome code={globalChromeCode} />
        <LinkInterceptor />

        {/*
          All third-party libraries load via this idempotent boot script. React 19
          re-inserts <script src> from the component tree on hydration (running
          webflow.js twice corrupts its module registry), so the loader lives
          outside React and guards against double execution. It loads jQuery
          before webflow.js and gsap before ScrollTrigger, then signals readiness.
        */}
        <script src="/js/aim-boot.js" />
      </body>
    </html>
  );
}
