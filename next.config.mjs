/** @type {import('next').NextConfig} */

// Two deploy targets from one codebase.
//
//   Azure Static Web Apps (default)  staging and testing, unchanged from before.
//     Builds a static export to out/. The contact endpoint is served by the
//     Azure managed Function in api/contact/, and the redirects below are
//     ignored (Next warns about this on export) because Azure reads its own
//     public/staticwebapp.config.json instead.
//
//   Vercel  set BUILD_TARGET=vercel
//     Skips the static export so app/api/contact/route.js becomes a real
//     endpoint, which is what makes the form and reCAPTCHA work there. A static
//     export emits no server code at all, so without this /api/contact is a 404
//     on Vercel. Pages are unaffected either way: app/[[...slug]]/page.jsx
//     declares generateStaticParams() with dynamicParams = false, so all 98 are
//     still prerendered to static HTML at build time. Vercel also ignores
//     staticwebapp.config.json, so the redirects below cover the renamed pages
//     there.
//
// Azure is the default deliberately: azure-pipelines.yml runs a bare
// `npm run build`, so staging keeps working with no pipeline change.
const isVercel = process.env.BUILD_TARGET === 'vercel';

// Renamed pages, mirroring the redirect rules in public/staticwebapp.config.json
// so Vercel serves them too. Kept at 301 rather than Next's default 308 to match
// the status Azure already returns.
//
// On Vercel each resolves in three hops, which is inherent to combining
// trailingSlash: true with redirects(): Next normalises the incoming path (308
// to add the slash), applies the 301, then normalises the destination (308
// again). Writing the destination with a trailing slash does not help, Next
// strips it. The 301 in the middle carries the rename, so the signal search
// engines need is intact.
const renamed = [
  ['/rehosting-lift-and-shift-cloud-migration-services', '/rehosting-lift-and-shift'],
  ['/business-intelligence-governance-center-of-excellence-coe', '/bi-governance-coe'],
  ['/cloud-architects-engineers-azure-aws-gcp', '/cloud-architects-engineers'],
  ['/semantic-modeling-olap-ssas-tabular', '/semantic-modeling-olap'],
  ['/self-healing-test-automation-frameworks', '/self-healing-testing'],
  ['/machine-learning-predictive-analytics-solutions', '/machine-learning-analytics'],
  ['/l1-l2-l3-support-services', '/l1-l2-l3-support-monitoring'],
  ['/tiered-it-support', '/l1-l2-l3-support-monitoring'],
  ['/itil-process-management', '/incident-problem-change-release-management'],
  ['/application-maintenance-support', '/application-maintenance-enhancements'],
  ['/current-state-assessment-gap-analysis', '/current-state-assessment'],
  ['/continuous-testing-in-devops-environments', '/continuous-testing-devops'],
  ['/staff-augmentation-support', '/talent-augmentation-delivery'],
  ['/ai-business-intelligence-solutions', '/data-analytics-ai'],
  ['/quality-assurance-testing', '/quality-engineering-assurance'],
  ['/front-end-development', '/custom-application-development'],
  ['/industry-financial-services', '/industries-financial-services'],
  ['/industry-retail', '/industries-retail'],
  ['/industry-transportation', '/industries-transportation'],
  ['/mirlin', '/goright-fleet-solutions'],
  ['/mirlin-ai-knowledge-assistant', '/goright-fleet-ai-knowledge-assistant'],
];

const nextConfig = {
  // Preserved Webflow scripts have real side effects and are not safe to
  // double-invoke, so disable StrictMode's development double-render.
  reactStrictMode: false,
  // Static HTML export for Azure; omitted on Vercel so the API route can run.
  ...(isVercel ? {} : { output: 'export' }),
  // We render the preserved Webflow <img> markup directly, so skip next/image.
  images: { unoptimized: true },
  // Emit /about-us/index.html so clean URLs work on static hosts.
  trailingSlash: true,
  async redirects() {
    return renamed.flatMap(([from, to]) => [
      { source: from, destination: to, statusCode: 301 },
      { source: `${from}/:path*`, destination: to, statusCode: 301 },
    ]);
  },
};

export default nextConfig;
