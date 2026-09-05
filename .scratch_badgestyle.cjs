const puppeteer = require('puppeteer');

const SLUGS = [
  'aris-solutions', 'aws', 'azure-services', 'botpress', 'broadcom-solutions',
  'google-cloud-platform', 'goright-fleet-solutions', 'jasper-ai',
  'microsoft-dynamics-365', 'oracle-services', 'salesforce', 'sap',
  'service-now', 'webmethods',
];

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const problems = [];

  for (const slug of SLUGS) {
    for (const vp of [{ n: 'desktop', w: 1440, h: 900 }, { n: 'mobile', w: 390, h: 844 }]) {
      for (const theme of ['light', 'dark']) {
        const ctx = await browser.createBrowserContext();
        const page = await ctx.newPage();
        await page.setViewport({ width: vp.w, height: vp.h });
        await page.goto(`http://localhost:3001/${slug}/`, { waitUntil: 'networkidle0' });
        if (theme === 'dark') {
          await page.evaluate(() => { const t = document.getElementById('themeToggle'); if (t) t.click(); });
          await new Promise(r => setTimeout(r, 350));
        }
        await new Promise(r => setTimeout(r, 900));

        const r = await page.evaluate(() => {
          const chip = document.querySelector('.pf-logo-chip');
          if (!chip) return { missing: true };
          const spans = Array.from(chip.querySelectorAll('span'));
          const styles = spans.map(s => {
            const c = getComputedStyle(s);
            return {
              text: s.textContent.trim(),
              fontFamily: c.fontFamily, fontSize: c.fontSize, fontWeight: c.fontWeight,
              color: c.color, letterSpacing: c.letterSpacing, lineHeight: c.lineHeight,
            };
          });
          const rect = chip.getBoundingClientRect();
          return {
            spanCount: spans.length,
            styles,
            label: chip.textContent.replace(/\s+/g, ' ').trim(),
            w: Math.round(rect.width), h: Math.round(rect.height),
            overflows: rect.right > window.innerWidth,
          };
        });

        const tag = `${slug} | ${vp.n} | ${theme}`;
        if (r.missing) { problems.push(`${tag}: NO CHIP`); }
        else {
          if (r.spanCount !== 1) problems.push(`${tag}: ${r.spanCount} spans (expected 1)`);
          if (r.h > 60) problems.push(`${tag}: chip height ${r.h}px (wrapping?)`);
          if (r.overflows) problems.push(`${tag}: overflows viewport`);
          console.log(`${tag.padEnd(52)} "${r.label}" ${r.w}x${r.h} | ${r.styles[0].fontSize} ${r.styles[0].fontWeight} ${r.styles[0].color} ls=${r.styles[0].letterSpacing}`);
        }
        await ctx.close();
      }
    }
  }

  console.log('\n=== PROBLEMS ===');
  console.log(problems.length ? problems.join('\n') : 'none');
  await browser.close();
})();
