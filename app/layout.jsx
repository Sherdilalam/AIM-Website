import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import Navbar from '../src/components/Navbar.jsx';
import Footer from '../src/components/Footer.jsx';
import GlobalChrome from '../src/components/GlobalChrome.jsx';
import LinkInterceptor from '../src/components/LinkInterceptor.jsx';

const globalChromeCode = readFileSync(join(process.cwd(), 'src/generated/global-chrome.js'), 'utf8');

// Applies theme + base body classes as early as possible to avoid a flash.
const THEME_NOFLASH =
  "(function(){function a(){var b=document.body;if(!b)return false;b.classList.add('aim');var t;try{t=sessionStorage.getItem('aim-theme');}catch(e){}b.classList.add(t==='dark'?'t-dark':'t-light');return true;}if(!a())document.addEventListener('DOMContentLoaded',a);})();";

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
    <html lang="en" data-wf-site="686f974b2e7de53e55148390" suppressHydrationWarning>
      <body className="body" suppressHydrationWarning>
        {/* Preconnect + Webflow stylesheets served from /public (so CSS url(../images) resolves). */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="/css/normalize.css" precedence="aim-1" />
        <link rel="stylesheet" href="/css/webflow.css" precedence="aim-2" />
        <link rel="stylesheet" href="/css/architecture-in-motion.webflow.css" precedence="aim-3" />
        <link rel="stylesheet" href="/css/aim-overrides.css" precedence="aim-4" />

        <script dangerouslySetInnerHTML={{ __html: THEME_NOFLASH }} />

        <div className="page-wrapper-new">
          <div className="main-wrapper-3">
            <Navbar />
            {children}
            <Footer />
          </div>
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
