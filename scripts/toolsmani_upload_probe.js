const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const OUT_DIR = '/tmp/toolsmani-fixtures';
const DOWNLOAD_DIR = '/tmp/toolsmani-downloads';
const BASE_URL = 'https://toolsmani.com';
const TOOLS = [
  '/tools/pdf-merge',
  '/tools/pdf-split',
  '/tools/pdf-compress',
  '/tools/pdf-rotate',
  '/tools/pdf-pages',
  '/tools/pdf-watermark',
  '/tools/pdf-pagenumber',
  '/tools/image-compress',
  '/tools/image-convert',
  '/tools/pdf-to-image',
  '/tools/image-to-pdf',
];

function ensureCleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

async function makeFixtures(browser) {
  ensureCleanDir(OUT_DIR);
  const page = await browser.newPage();
  await page.setViewport({ width: 900, height: 1200, deviceScaleFactor: 1 });

  await page.setContent(`
    <html>
      <body style="margin:0;font-family:Arial,sans-serif">
        <section style="height:100vh;display:flex;align-items:center;justify-content:center;background:#f97316;color:white;font-size:48px;font-weight:bold">
          PDF Fixture Page 1
        </section>
        <section style="page-break-before:always;height:100vh;display:flex;align-items:center;justify-content:center;background:#0369a1;color:white;font-size:48px;font-weight:bold">
          PDF Fixture Page 2
        </section>
      </body>
    </html>
  `);
  await page.pdf({
    path: path.join(OUT_DIR, 'fixture-2-pages.pdf'),
    format: 'A4',
    printBackground: true,
  });

  await page.setContent(`
    <html>
      <body style="margin:0;height:100vh;display:grid;place-items:center;background:linear-gradient(135deg,#22c55e,#2563eb);font-family:Arial,sans-serif">
        <div style="width:360px;height:240px;border-radius:24px;background:rgba(255,255,255,0.18);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;color:white;font-size:42px;font-weight:bold;border:4px solid rgba(255,255,255,0.45)">
          IMG TEST
        </div>
      </body>
    </html>
  `);
  await page.screenshot({
    path: path.join(OUT_DIR, 'fixture-image.png'),
    type: 'png',
    fullPage: true,
  });
  await page.screenshot({
    path: path.join(OUT_DIR, 'fixture-image.jpg'),
    type: 'jpeg',
    quality: 90,
    fullPage: true,
  });

  await page.close();
}

function fixtureForTool(tool) {
  if (
    tool.includes('image-compress') ||
    tool.includes('image-convert') ||
    tool.includes('image-to-pdf')
  ) {
    return path.join(OUT_DIR, 'fixture-image.png');
  }
  return path.join(OUT_DIR, 'fixture-2-pages.pdf');
}

async function probeTool(browser, tool) {
  const page = await browser.newPage();
  const cdp = await page.createCDPSession();
  await cdp.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: DOWNLOAD_DIR,
  });

  await page.goto(`${BASE_URL}${tool}`, { waitUntil: 'networkidle2', timeout: 45000 });
  const input = await page.$('input[type="file"]');
  if (!input) {
    throw new Error('No file input found');
  }

  await input.uploadFile(fixtureForTool(tool));
  await page.waitForTimeout?.(1500);
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const info = await page.evaluate(() => {
    const text = document.body.innerText.replace(/\s+/g, ' ').trim().slice(0, 1500);
    const buttons = Array.from(document.querySelectorAll('button'))
      .map((el) => el.innerText.replace(/\s+/g, ' ').trim())
      .filter(Boolean);
    const links = Array.from(document.querySelectorAll('a[download], a'))
      .map((el) => ({
        text: (el.innerText || '').replace(/\s+/g, ' ').trim(),
        download: el.getAttribute('download') || '',
        href: el.getAttribute('href') || '',
      }))
      .filter((el) => el.text || el.download)
      .slice(0, 20);
    return { text, buttons, links };
  });

  await page.close();
  return { tool, ...info };
}

async function main() {
  ensureCleanDir(DOWNLOAD_DIR);
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox'],
  });

  await makeFixtures(browser);

  const results = [];
  for (const tool of TOOLS) {
    try {
      results.push(await probeTool(browser, tool));
    } catch (error) {
      results.push({ tool, error: error.message });
    }
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
