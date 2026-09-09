import { chromium } from 'playwright';

const browser = await chromium.launch({ args: ['--headless'] });
const page = await browser.newPage();

const consoleErrors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});
page.on('pageerror', (e) => consoleErrors.push('pageerror: ' + e.message));

await page.goto('http://localhost:5174/', { waitUntil: 'commit', timeout: 10000 });
await page.waitForTimeout(2500);

const labels = ['GRC & Compliance', 'Microsoft & Digital Workplace', 'Digital Transformation'];

for (const label of labels) {
  await page.evaluate((l) => {
    const els = Array.from(document.querySelectorAll('button, [role="link"], div[role="link"]'));
    const el = els.find(e => e.textContent?.trim() === l);
    if (el) el.click();
  }, label);
  await page.waitForTimeout(3000);
  const text = await page.locator('body').innerText();
  console.log(label, 'text length:', text.length, 'sample:', text.slice(0, 200));
  console.log(label, 'console errors:', consoleErrors.slice(-5));
}

await browser.close();
