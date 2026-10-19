const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto('http://localhost:5174/', { waitUntil: 'networkidle' });
  await p.screenshot({ path: process.argv[2] || 'current-hero.png' });
  await b.close();
  console.log('screenshot saved');
})().catch(e => { console.error(e); process.exit(1); });