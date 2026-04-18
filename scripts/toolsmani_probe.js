const puppeteer = require('puppeteer');

const BASE_URL = 'https://toolsmani.com';
const PATHS = [
  '/',
  '/tools/pdf',
  '/tools/pdf-merge',
  '/tools/pdf-split',
  '/tools/pdf-compress',
  '/tools/pdf-rotate',
  '/tools/pdf-pages',
  '/tools/pdf-watermark',
  '/tools/pdf-pagenumber',
  '/tools/text-counter',
  '/tools/json-formatter',
  '/tools/qr-generator',
  '/tools/password-generator',
  '/tools/image-compress',
  '/tools/base64',
  '/tools/color-picker',
  '/tools/lorem-ipsum',
  '/tools/markdown-preview',
  '/tools/unit-converter',
  '/tools/image-convert',
  '/tools/pdf-to-image',
  '/tools/image-to-pdf',
];

async function probePath(browser, path) {
  const page = await browser.newPage();
  const consoleMessages = [];
  const pageErrors = [];
  const requestFailures = [];

  page.on('console', (msg) => {
    if (['error', 'warning'].includes(msg.type())) {
      consoleMessages.push(`${msg.type()}: ${msg.text()}`);
    }
  });

  page.on('pageerror', (err) => {
    pageErrors.push(err.message);
  });

  page.on('requestfailed', (req) => {
    requestFailures.push({
      url: req.url(),
      errorText: req.failure() ? req.failure().errorText : 'unknown',
    });
  });

  const response = await page.goto(`${BASE_URL}${path}`, {
    waitUntil: 'networkidle2',
    timeout: 45000,
  });

  const info = await page.evaluate(() => {
    const text = document.body.innerText
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 800);
    const buttons = Array.from(document.querySelectorAll('button'))
      .map((el) => el.innerText.replace(/\s+/g, ' ').trim())
      .filter(Boolean)
      .slice(0, 12);
    const inputs = Array.from(document.querySelectorAll('input, textarea, select'))
      .map((el) => ({
        tag: el.tagName.toLowerCase(),
        type: el.getAttribute('type') || '',
        placeholder: el.getAttribute('placeholder') || '',
        name: el.getAttribute('name') || '',
      }))
      .slice(0, 20);
    const dropzones = Array.from(document.querySelectorAll('*'))
      .filter((el) => {
        const text = (el.innerText || '').trim();
        return text && /drop|upload|drag|select files|choose files/i.test(text);
      })
      .map((el) => el.innerText.replace(/\s+/g, ' ').trim())
      .slice(0, 8);
    return {
      title: document.title,
      text,
      buttons,
      inputs,
      dropzones,
      h1: document.querySelector('h1')?.innerText?.trim() || '',
    };
  });

  await page.close();

  return {
    path,
    status: response ? response.status() : null,
    finalUrl: response ? response.url() : null,
    ...info,
    consoleMessages,
    pageErrors,
    requestFailures,
  };
}

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox'],
  });

  const results = [];
  for (const path of PATHS) {
    try {
      results.push(await probePath(browser, path));
    } catch (error) {
      results.push({
        path,
        error: error.message,
      });
    }
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
