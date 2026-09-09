import { chromium } from 'playwright';

const browser = await chromium.launch({ args: ['--headless'] });
const page = await browser.newPage();
page.on('pageerror', (e) => console.log('pageerror:', e.message));
page.on('requestfailed', (r) => console.log('requestfailed:', r.url(), r.failure()?.message));
page.on('console', (msg) => {
  if (msg.type() === 'error') console.log('console error:', msg.text());
});

const testService = async (label) => {
  await page.goto('http://localhost:5173/', { waitUntil: 'load', timeout: 5000 });
  await page.getByText(label, { exact: false }).wait({ state: 'visible', timeout: 2000 });
  await page.getByText(label, { exact: false }).click();
  await page.waitForTimeout(2000);
  const text = await page.locator('body').innerText();
  console.log(label, 'visible text length:', text.length, 'sample:', text.slice(0, 200));
};

await testService('Cybersecurity');
await testService('GRC & Compliance');
await testService('Microsoft & Digital Workplace');
await testService('Digital Transformation');

await browser.close();
