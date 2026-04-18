const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const BASE_URL = 'https://toolsmani.com';
const ROOT_DIR = '/tmp/toolsmani-e2e';
const FIXTURE_DIR = path.join(ROOT_DIR, 'fixtures');
const DOWNLOAD_DIR = path.join(ROOT_DIR, 'downloads');
const FAILURE_DIR = path.join(ROOT_DIR, 'failures');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ensureCleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function normalizeText(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function detectFileType(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (buffer.length >= 4 && buffer.slice(0, 4).toString() === '%PDF') {
    return 'pdf';
  }
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return 'png';
  }
  if (buffer.length >= 2 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    return 'jpg';
  }
  if (
    buffer.length >= 12 &&
    buffer.slice(0, 4).toString('ascii') === 'RIFF' &&
    buffer.slice(8, 12).toString('ascii') === 'WEBP'
  ) {
    return 'webp';
  }
  if (buffer.length >= 2 && buffer.slice(0, 2).toString('ascii') === 'BM') {
    return 'bmp';
  }
  if (buffer.length >= 2 && buffer.slice(0, 2).toString('ascii') === 'PK') {
    return 'zip';
  }
  return 'unknown';
}

async function waitForDownloads(dir, beforeEntries, timeoutMs = 30000) {
  const start = Date.now();
  let lastSignature = '';
  let stableSince = 0;

  while (Date.now() - start < timeoutMs) {
    const entries = fs
      .readdirSync(dir)
      .filter((name) => !beforeEntries.has(name))
      .sort();
    const completed = entries.filter(
      (name) => !name.endsWith('.crdownload') && !name.endsWith('.tmp') && !name.endsWith('.download')
    );
    const incomplete = entries.filter((name) =>
      name.endsWith('.crdownload') || name.endsWith('.tmp') || name.endsWith('.download')
    );

    const signature = completed
      .map((name) => `${name}:${fs.statSync(path.join(dir, name)).size}`)
      .join('|');

    if (signature !== lastSignature) {
      lastSignature = signature;
      stableSince = Date.now();
    }

    if (completed.length > 0 && incomplete.length === 0 && Date.now() - stableSince > 1200) {
      return completed.map((name) => {
        const fullPath = path.join(dir, name);
        return {
          name,
          path: fullPath,
          size: fs.statSync(fullPath).size,
          type: detectFileType(fullPath),
        };
      });
    }

    await sleep(250);
  }

  throw new Error('Download did not complete in time');
}

async function setDownloadBehavior(page) {
  const cdp = await page.createCDPSession();
  await cdp.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: DOWNLOAD_DIR,
  });
}

async function makeFixtures(browser) {
  ensureCleanDir(FIXTURE_DIR);
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 1300, deviceScaleFactor: 1 });

  await page.setContent(`
    <html>
      <body style="margin:0;font-family:Arial,sans-serif">
        <section style="height:100vh;display:flex;align-items:center;justify-content:center;background:#f97316;color:#fff;font-size:48px;font-weight:bold">
          PDF Fixture A
        </section>
      </body>
    </html>
  `);
  await page.pdf({
    path: path.join(FIXTURE_DIR, 'fixture-1-page.pdf'),
    format: 'A4',
    printBackground: true,
  });

  await page.setContent(`
    <html>
      <body style="margin:0;font-family:Arial,sans-serif">
        <section style="height:100vh;display:flex;align-items:center;justify-content:center;background:#f97316;color:#fff;font-size:48px;font-weight:bold">
          PDF Fixture Page 1
        </section>
        <section style="page-break-before:always;height:100vh;display:flex;align-items:center;justify-content:center;background:#0369a1;color:#fff;font-size:48px;font-weight:bold">
          PDF Fixture Page 2
        </section>
      </body>
    </html>
  `);
  await page.pdf({
    path: path.join(FIXTURE_DIR, 'fixture-2-pages.pdf'),
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
    path: path.join(FIXTURE_DIR, 'fixture-image.png'),
    type: 'png',
    fullPage: true,
  });
  await page.screenshot({
    path: path.join(FIXTURE_DIR, 'fixture-image.jpg'),
    type: 'jpeg',
    quality: 90,
    fullPage: true,
  });

  await page.close();
}

async function newToolPage(browser, route) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1200, deviceScaleFactor: 1 });
  await setDownloadBehavior(page);

  const consoleMessages = [];
  const pageErrors = [];
  const requestFailures = [];

  page.on('console', (msg) => {
    if (['error', 'warning'].includes(msg.type())) {
      consoleMessages.push(`${msg.type()}: ${msg.text()}`);
    }
  });

  page.on('pageerror', (error) => {
    pageErrors.push(error.message);
  });

  page.on('requestfailed', (request) => {
    const url = request.url();
    if (/google-analytics|googletagmanager|googleusercontent/.test(url)) {
      return;
    }
    requestFailures.push({
      url,
      errorText: request.failure() ? request.failure().errorText : 'unknown',
    });
  });

  const response = await page.goto(`${BASE_URL}${route}`, {
    waitUntil: 'networkidle2',
    timeout: 45000,
  });

  return {
    page,
    meta: {
      route,
      status: response ? response.status() : null,
      consoleMessages,
      pageErrors,
      requestFailures,
    },
  };
}

async function getBodyText(page) {
  return page.evaluate(() => document.body.innerText.replace(/\s+/g, ' ').trim());
}

async function setTextarea(page, index, value) {
  await page.evaluate(
    (textareaIndex, nextValue) => {
      const target = document.querySelectorAll('textarea')[textareaIndex];
      if (!target) {
        throw new Error(`Textarea ${textareaIndex} not found`);
      }
      const descriptor = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        'value'
      );
      descriptor.set.call(target, nextValue);
      target.dispatchEvent(new Event('input', { bubbles: true }));
      target.dispatchEvent(new Event('change', { bubbles: true }));
    },
    index,
    value
  );
}

async function setInputByType(page, type, index, value) {
  await page.evaluate(
    (inputType, inputIndex, nextValue) => {
      const inputs = Array.from(document.querySelectorAll(`input[type="${inputType}"]`));
      const target = inputs[inputIndex];
      if (!target) {
        throw new Error(`Input ${inputType}[${inputIndex}] not found`);
      }
      const descriptor = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      );
      descriptor.set.call(target, String(nextValue));
      target.dispatchEvent(new Event('input', { bubbles: true }));
      target.dispatchEvent(new Event('change', { bubbles: true }));
    },
    type,
    index,
    value
  );
}

async function setSelectValue(page, index, value) {
  await page.evaluate(
    (selectIndex, nextValue) => {
      const target = document.querySelectorAll('select')[selectIndex];
      if (!target) {
        throw new Error(`Select ${selectIndex} not found`);
      }
      target.value = nextValue;
      target.dispatchEvent(new Event('change', { bubbles: true }));
    },
    index,
    value
  );
}

async function uploadFiles(page, ...filePaths) {
  const input = await page.$('input[type="file"]');
  if (!input) {
    throw new Error('File input not found');
  }
  await input.uploadFile(...filePaths);
}

async function clickButtonContaining(page, text) {
  const clicked = await page.evaluate((needle) => {
    const target = Array.from(document.querySelectorAll('button')).find((button) =>
      button.innerText.replace(/\s+/g, ' ').trim().includes(needle)
    );
    if (!target) {
      return false;
    }
    target.click();
    return true;
  }, text);

  if (!clicked) {
    throw new Error(`Button containing "${text}" not found`);
  }
}

async function clickButtonExact(page, text) {
  const clicked = await page.evaluate((needle) => {
    const target = Array.from(document.querySelectorAll('button')).find(
      (button) => button.innerText.replace(/\s+/g, ' ').trim() === needle
    );
    if (!target) {
      return false;
    }
    target.click();
    return true;
  }, text);

  if (!clicked) {
    throw new Error(`Button "${text}" not found`);
  }
}

async function clickLabelContaining(page, text) {
  const clicked = await page.evaluate((needle) => {
    const target = Array.from(document.querySelectorAll('label')).find((label) =>
      label.innerText.replace(/\s+/g, ' ').trim().includes(needle)
    );
    if (!target) {
      return false;
    }
    target.click();
    return true;
  }, text);

  if (!clicked) {
    throw new Error(`Label containing "${text}" not found`);
  }
}

async function clearTextEntry(page, selector) {
  await page.click(selector, { clickCount: 3 });
  await page.keyboard.press('Backspace');
}

async function readTextareas(page) {
  return page.evaluate(() => Array.from(document.querySelectorAll('textarea')).map((el) => el.value));
}

async function readInputs(page) {
  return page.evaluate(() =>
    Array.from(document.querySelectorAll('input')).map((el) => ({
      type: el.type,
      value: el.value,
      checked: el.checked,
    }))
  );
}

async function clickAndCollectDownloads(page, action, timeoutMs = 30000) {
  ensureCleanDir(DOWNLOAD_DIR);
  const before = new Set(fs.readdirSync(DOWNLOAD_DIR));
  await action();
  return waitForDownloads(DOWNLOAD_DIR, before, timeoutMs);
}

function summarizeDownloads(downloads) {
  return downloads.map((download) => ({
    name: download.name,
    type: download.type,
    size: download.size,
  }));
}

async function smokeHome(browser) {
  const { page, meta } = await newToolPage(browser, '/');
  try {
    const h1 = await page.$eval('h1', (el) => el.innerText.replace(/\s+/g, ' ').trim());
    assert(meta.status === 200, 'Home page did not return HTTP 200');
    assert(h1.includes('Güçlü Online Araçlar'), 'Home page hero heading did not render');
    return {
      tool: 'home',
      ok: true,
      details: {
        status: meta.status,
        h1,
      },
      logs: meta,
    };
  } finally {
    await page.close();
  }
}

async function smokePdfIndex(browser) {
  const { page, meta } = await newToolPage(browser, '/tools/pdf');
  try {
    const h1 = await page.$eval('h1', (el) => el.innerText.replace(/\s+/g, ' ').trim());
    assert(meta.status === 200, 'PDF index did not return HTTP 200');
    assert(h1.includes('Ücretsiz Online PDF Araçları'), 'PDF tools index heading did not render');
    return {
      tool: 'pdf-index',
      ok: true,
      details: {
        status: meta.status,
        h1,
      },
      logs: meta,
    };
  } finally {
    await page.close();
  }
}

async function testTextCounter(browser) {
  const { page, meta } = await newToolPage(browser, '/tools/text-counter');
  try {
    const sample = 'Hello world.\nThis is a test.';
    const expected = {
      words: sample.trim().split(/\s+/).length,
      characters: sample.length,
      noSpaces: sample.replace(/\s/g, '').length,
      sentences: sample.split(/[.!?]+/).filter((part) => part.trim()).length,
      paragraphs: sample.split(/\n+/).filter((part) => part.trim()).length,
    };

    await setTextarea(page, 0, sample);
    await page.waitForFunction(
      (words) => document.body.innerText.includes(`${words} Words`),
      {},
      expected.words
    );

    let body = await getBodyText(page);
    assert(body.includes(`${expected.words} Words`), 'Word count is incorrect');
    assert(body.includes(`${expected.characters} Characters`), 'Character count is incorrect');
    assert(body.includes(`${expected.noSpaces} No Spaces`), 'No-spaces count is incorrect');
    assert(body.includes(`${expected.sentences} Sentences`), 'Sentence count is incorrect');
    assert(body.includes(`${expected.paragraphs} Paragraphs`), 'Paragraph count is incorrect');

    await clickButtonContaining(page, 'UPPERCASE');
    await page.waitForFunction(() => document.querySelector('textarea').value === document.querySelector('textarea').value.toUpperCase());
    let value = await page.$eval('textarea', (el) => el.value);
    assert(value === sample.toUpperCase(), 'UPPERCASE did not transform text');

    await clickButtonContaining(page, 'lowercase');
    await page.waitForFunction(() => document.querySelector('textarea').value === document.querySelector('textarea').value.toLowerCase());
    value = await page.$eval('textarea', (el) => el.value);
    assert(value === sample.toLowerCase(), 'lowercase did not transform text');

    await clickButtonContaining(page, 'Clear');
    await page.waitForFunction(() => document.querySelector('textarea').value === '');
    body = await getBodyText(page);
    assert(body.includes('0 Words'), 'Clear did not reset counters');

    return {
      tool: 'text-counter',
      ok: true,
      details: expected,
      logs: meta,
    };
  } finally {
    await page.close();
  }
}

async function testJsonFormatter(browser) {
  const { page, meta } = await newToolPage(browser, '/tools/json-formatter');
  try {
    const valid = '{"a":1,"b":[2,3]}';
    await setTextarea(page, 0, valid);

    await clickButtonContaining(page, 'Format');
    await page.waitForFunction(() => document.querySelectorAll('textarea')[1].value.includes('\n'));
    let [inputValue, outputValue] = await readTextareas(page);
    assert(inputValue === valid, 'JSON input was not preserved');
    assert(outputValue.includes('"a": 1'), 'Formatted JSON output is incorrect');

    await clickButtonContaining(page, 'Minify');
    await page.waitForFunction(() => document.querySelectorAll('textarea')[1].value.includes('{"a":1'));
    [, outputValue] = await readTextareas(page);
    assert(outputValue === valid, 'Minify output is incorrect');

    await clickButtonContaining(page, 'Validate');
    await page.waitForFunction(() => document.querySelectorAll('textarea')[1].value.includes('Valid JSON!'));
    [, outputValue] = await readTextareas(page);
    assert(outputValue.includes('Valid JSON!'), 'Validate did not confirm valid JSON');

    await setTextarea(page, 0, '{"a":}');
    await clickButtonContaining(page, 'Validate');
    await page.waitForFunction(() => /not valid JSON|Unexpected token/.test(document.body.innerText));
    const body = await getBodyText(page);
    assert(/not valid JSON|Unexpected token/.test(body), 'Invalid JSON error did not appear');

    return {
      tool: 'json-formatter',
      ok: true,
      details: {
        formattedPreview: outputValue,
      },
      logs: meta,
    };
  } finally {
    await page.close();
  }
}

async function testQrGenerator(browser) {
  const { page, meta } = await newToolPage(browser, '/tools/qr-generator');
  try {
    const initialDataUrl = await page.$eval('canvas', (canvas) => canvas.toDataURL());
    await setTextarea(page, 0, 'https://toolsmani.com/test?source=e2e');
    await page.waitForFunction(
      (oldDataUrl) => {
        const canvas = document.querySelector('canvas');
        return canvas && canvas.toDataURL() !== oldDataUrl;
      },
      {},
      initialDataUrl
    );

    const downloads = await clickAndCollectDownloads(page, async () => {
      await clickButtonContaining(page, 'Download PNG');
    });

    assert(downloads.length >= 1, 'QR generator did not download anything');
    assert(downloads[0].type === 'png', 'QR generator did not download a PNG');

    return {
      tool: 'qr-generator',
      ok: true,
      details: {
        downloads: summarizeDownloads(downloads),
      },
      logs: meta,
    };
  } finally {
    await page.close();
  }
}

async function testPasswordGenerator(browser) {
  const { page, meta } = await newToolPage(browser, '/tools/password-generator');
  try {
    await setInputByType(page, 'range', 0, 20);
    const beforeInputs = await readInputs(page);
    if (beforeInputs[5] && beforeInputs[5].checked) {
      await clickLabelContaining(page, 'Symbols');
    }
    await clickButtonContaining(page, 'Generate Password');
    await page.waitForFunction(() => {
      const input = document.querySelector('input[type="text"]');
      return input && input.value.length > 0;
    });

    const inputs = await readInputs(page);
    const password = inputs.find((input) => input.type === 'text').value;

    assert(password.length === 20, 'Generated password does not match requested length');
    assert(/^[A-Za-z0-9]+$/.test(password), 'Password contains symbols after symbols were disabled');

    return {
      tool: 'password-generator',
      ok: true,
      details: {
        length: password.length,
        samplePassword: password,
      },
      logs: meta,
    };
  } finally {
    await page.close();
  }
}

async function testImageCompress(browser) {
  const { page, meta } = await newToolPage(browser, '/tools/image-compress');
  const inputPath = path.join(FIXTURE_DIR, 'fixture-image.png');
  try {
    await uploadFiles(page, inputPath);
    await page.waitForFunction(() => document.body.innerText.includes('Results'));
    const downloads = await clickAndCollectDownloads(page, async () => {
      await clickButtonContaining(page, 'Download');
    });

    assert(downloads.length >= 1, 'Image compressor did not download anything');
    assert(['png', 'jpg', 'webp'].includes(downloads[0].type), 'Compressed file is not an image');
    assert(
      downloads[0].size < fs.statSync(inputPath).size,
      'Compressed image is not smaller than the original fixture'
    );

    return {
      tool: 'image-compress',
      ok: true,
      details: {
        originalSize: fs.statSync(inputPath).size,
        downloads: summarizeDownloads(downloads),
      },
      logs: meta,
    };
  } finally {
    await page.close();
  }
}

async function testBase64(browser) {
  const { page, meta } = await newToolPage(browser, '/tools/base64');
  try {
    await setTextarea(page, 0, 'hello');
    await clickButtonContaining(page, 'Encode');
    await page.waitForFunction(() => document.querySelectorAll('textarea')[1].value === 'aGVsbG8=');
    let values = await readTextareas(page);
    assert(values[1] === 'aGVsbG8=', 'Base64 encode output is incorrect');

    await setTextarea(page, 0, 'aGVsbG8=');
    await clickButtonContaining(page, 'Decode');
    await page.waitForFunction(() => document.querySelectorAll('textarea')[1].value === 'hello');
    values = await readTextareas(page);
    assert(values[1] === 'hello', 'Base64 decode output is incorrect');

    return {
      tool: 'base64',
      ok: true,
      details: {
        encoded: 'aGVsbG8=',
      },
      logs: meta,
    };
  } finally {
    await page.close();
  }
}

async function testColorPicker(browser) {
  const { page, meta } = await newToolPage(browser, '/tools/color-picker');
  try {
    await setInputByType(page, 'color', 0, '#ff0000');
    await page.waitForFunction(() => document.body.innerText.includes('rgb(255, 0, 0)'));
    const body = await getBodyText(page);
    const inputs = await readInputs(page);
    const hexInput = inputs.find((input) => input.type === 'text').value;

    assert(/^#ff0000$/i.test(hexInput), 'HEX input did not update to red');
    assert(body.includes('rgb(255, 0, 0)'), 'RGB conversion is incorrect');
    assert(body.includes('hsl(0, 100%, 50%)'), 'HSL conversion is incorrect');

    return {
      tool: 'color-picker',
      ok: true,
      details: {
        hex: hexInput,
      },
      logs: meta,
    };
  } finally {
    await page.close();
  }
}

async function testLoremIpsum(browser) {
  const { page, meta } = await newToolPage(browser, '/tools/lorem-ipsum');
  try {
    await setSelectValue(page, 0, 'paragraphs');
    await setInputByType(page, 'number', 0, 2);
    await clickButtonContaining(page, 'Generate');
    await page.waitForFunction(() => document.querySelector('textarea').value.length > 50);
    const value = await page.$eval('textarea', (el) => el.value);
    const paragraphs = value
      .split(/\n\s*\n/)
      .map((part) => part.trim())
      .filter(Boolean);

    assert(paragraphs.length >= 2, 'Lorem Ipsum did not generate multiple paragraphs');

    return {
      tool: 'lorem-ipsum',
      ok: true,
      details: {
        paragraphs: paragraphs.length,
      },
      logs: meta,
    };
  } finally {
    await page.close();
  }
}

async function testMarkdownPreview(browser) {
  const { page, meta } = await newToolPage(browser, '/tools/markdown-preview');
  try {
    await setTextarea(page, 0, '# Hello\n\n**Bold**');
    await page.waitForFunction(() =>
      Array.from(document.querySelectorAll('strong')).some((el) => el.innerText.trim() === 'Bold')
    );
    const rendered = await page.evaluate(() => ({
      h1s: Array.from(document.querySelectorAll('h1')).map((el) =>
        el.innerText.replace(/\s+/g, ' ').trim()
      ),
      strongs: Array.from(document.querySelectorAll('strong')).map((el) =>
        el.innerText.replace(/\s+/g, ' ').trim()
      ),
    }));

    assert(rendered.h1s.includes('Hello'), 'Markdown preview did not render H1');
    assert(rendered.strongs.includes('Bold'), 'Markdown preview did not render bold text');

    return {
      tool: 'markdown-preview',
      ok: true,
      details: rendered,
      logs: meta,
    };
  } finally {
    await page.close();
  }
}

async function testUnitConverter(browser) {
  const { page, meta } = await newToolPage(browser, '/tools/unit-converter');
  try {
    await setSelectValue(page, 0, 'm');
    await setSelectValue(page, 1, 'cm');
    await setInputByType(page, 'number', 0, 2);
    await page.waitForFunction(() => document.body.innerText.includes('2 Meters = 200 Centimeters'));
    const body = await getBodyText(page);

    assert(body.includes('2 Meters = 200 Centimeters'), 'Unit conversion result is incorrect');

    return {
      tool: 'unit-converter',
      ok: true,
      details: {
        conversion: '2 Meters = 200 Centimeters',
      },
      logs: meta,
    };
  } finally {
    await page.close();
  }
}

async function testPdfMerge(browser) {
  const { page, meta } = await newToolPage(browser, '/tools/pdf-merge');
  try {
    await uploadFiles(
      page,
      path.join(FIXTURE_DIR, 'fixture-1-page.pdf'),
      path.join(FIXTURE_DIR, 'fixture-2-pages.pdf')
    );
    await page.waitForFunction(() => document.body.innerText.includes('Birleştir 2 PDF'));
    const downloads = await clickAndCollectDownloads(page, async () => {
      await clickButtonContaining(page, 'Birleştir 2 PDF');
    }, 45000);

    assert(downloads.length >= 1, 'PDF merge did not download anything');
    assert(downloads[0].type === 'pdf', 'PDF merge output is not a PDF');

    return {
      tool: 'pdf-merge',
      ok: true,
      details: {
        downloads: summarizeDownloads(downloads),
      },
      logs: meta,
    };
  } finally {
    await page.close();
  }
}

async function testPdfSplit(browser) {
  const { page, meta } = await newToolPage(browser, '/tools/pdf-split');
  try {
    await uploadFiles(page, path.join(FIXTURE_DIR, 'fixture-2-pages.pdf'));
    await page.waitForFunction(() => document.body.innerText.includes('PDF\'i Böl'));
    const downloads = await clickAndCollectDownloads(page, async () => {
      await clickButtonContaining(page, "PDF'i Böl");
    }, 45000);

    assert(downloads.length >= 1, 'PDF split did not download anything');
    assert(
      downloads.some((download) => ['pdf', 'zip'].includes(download.type)),
      'PDF split output is neither PDF nor ZIP'
    );

    return {
      tool: 'pdf-split',
      ok: true,
      details: {
        downloads: summarizeDownloads(downloads),
      },
      logs: meta,
    };
  } finally {
    await page.close();
  }
}

async function testPdfCompress(browser) {
  const { page, meta } = await newToolPage(browser, '/tools/pdf-compress');
  try {
    await uploadFiles(page, path.join(FIXTURE_DIR, 'fixture-2-pages.pdf'));
    const downloads = await clickAndCollectDownloads(page, async () => {
      await clickButtonContaining(page, "PDF'i Sıkıştır");
    }, 45000);

    assert(downloads.length >= 1, 'PDF compress did not download anything');
    assert(downloads[0].type === 'pdf', 'PDF compress output is not a PDF');

    return {
      tool: 'pdf-compress',
      ok: true,
      details: {
        downloads: summarizeDownloads(downloads),
      },
      logs: meta,
    };
  } finally {
    await page.close();
  }
}

async function testPdfRotate(browser) {
  const { page, meta } = await newToolPage(browser, '/tools/pdf-rotate');
  try {
    await uploadFiles(page, path.join(FIXTURE_DIR, 'fixture-2-pages.pdf'));
    await clickButtonContaining(page, 'Tümünü Döndür →90°');
    const downloads = await clickAndCollectDownloads(page, async () => {
      await clickButtonContaining(page, "Döndürülmüş PDF'i İndir");
    }, 45000);

    assert(downloads.length >= 1, 'PDF rotate did not download anything');
    assert(downloads[0].type === 'pdf', 'PDF rotate output is not a PDF');

    return {
      tool: 'pdf-rotate',
      ok: true,
      details: {
        downloads: summarizeDownloads(downloads),
      },
      logs: meta,
    };
  } finally {
    await page.close();
  }
}

async function testPdfPages(browser) {
  const { page, meta } = await newToolPage(browser, '/tools/pdf-pages');
  try {
    await uploadFiles(page, path.join(FIXTURE_DIR, 'fixture-2-pages.pdf'));
    await clickButtonExact(page, '2');
    await page.waitForFunction(() => document.body.innerText.includes('1 seçili'));
    const downloads = await clickAndCollectDownloads(page, async () => {
      await clickButtonContaining(page, 'Çıkar 1 Sayfa');
    }, 45000);

    assert(downloads.length >= 1, 'PDF page manager did not download anything');
    assert(downloads[0].type === 'pdf', 'PDF page manager output is not a PDF');

    return {
      tool: 'pdf-pages',
      ok: true,
      details: {
        downloads: summarizeDownloads(downloads),
      },
      logs: meta,
    };
  } finally {
    await page.close();
  }
}

async function testPdfWatermark(browser) {
  const { page, meta } = await newToolPage(browser, '/tools/pdf-watermark');
  try {
    await uploadFiles(page, path.join(FIXTURE_DIR, 'fixture-2-pages.pdf'));
    const downloads = await clickAndCollectDownloads(page, async () => {
      await clickButtonContaining(page, 'Filigran Ekle & İndir');
    }, 45000);

    assert(downloads.length >= 1, 'PDF watermark did not download anything');
    assert(downloads[0].type === 'pdf', 'PDF watermark output is not a PDF');

    return {
      tool: 'pdf-watermark',
      ok: true,
      details: {
        downloads: summarizeDownloads(downloads),
      },
      logs: meta,
    };
  } finally {
    await page.close();
  }
}

async function testPdfPageNumber(browser) {
  const { page, meta } = await newToolPage(browser, '/tools/pdf-pagenumber');
  try {
    await uploadFiles(page, path.join(FIXTURE_DIR, 'fixture-2-pages.pdf'));
    const downloads = await clickAndCollectDownloads(page, async () => {
      await clickButtonContaining(page, 'Sayfa Numarası Ekle & İndir');
    }, 45000);

    assert(downloads.length >= 1, 'PDF page number tool did not download anything');
    assert(downloads[0].type === 'pdf', 'PDF page number output is not a PDF');

    return {
      tool: 'pdf-pagenumber',
      ok: true,
      details: {
        downloads: summarizeDownloads(downloads),
      },
      logs: meta,
    };
  } finally {
    await page.close();
  }
}

async function testImageConvert(browser) {
  const { page, meta } = await newToolPage(browser, '/tools/image-convert');
  try {
    await uploadFiles(page, path.join(FIXTURE_DIR, 'fixture-image.png'));
    await clickButtonContaining(page, 'JPEG');
    const downloads = await clickAndCollectDownloads(page, async () => {
      await clickButtonContaining(page, 'Dönüştür 1 dosya');
    }, 45000);

    assert(downloads.length >= 1, 'Image convert did not download anything');
    assert(downloads[0].type === 'jpg', 'Image convert output is not a JPEG');

    return {
      tool: 'image-convert',
      ok: true,
      details: {
        downloads: summarizeDownloads(downloads),
      },
      logs: meta,
    };
  } finally {
    await page.close();
  }
}

async function testPdfToImage(browser) {
  const { page, meta } = await newToolPage(browser, '/tools/pdf-to-image');
  try {
    await uploadFiles(page, path.join(FIXTURE_DIR, 'fixture-2-pages.pdf'));
    const downloads = await clickAndCollectDownloads(page, async () => {
      await clickButtonContaining(page, 'Görsele Dönüştür');
    }, 60000);

    assert(downloads.length >= 1, 'PDF to image did not download anything');
    assert(
      downloads.some((download) => ['zip', 'jpg', 'png'].includes(download.type)),
      'PDF to image output is neither ZIP nor image'
    );

    return {
      tool: 'pdf-to-image',
      ok: true,
      details: {
        downloads: summarizeDownloads(downloads),
      },
      logs: meta,
    };
  } finally {
    await page.close();
  }
}

async function testImageToPdf(browser) {
  const { page, meta } = await newToolPage(browser, '/tools/image-to-pdf');
  try {
    await uploadFiles(page, path.join(FIXTURE_DIR, 'fixture-image.png'));
    const downloads = await clickAndCollectDownloads(page, async () => {
      await clickButtonContaining(page, "PDF'e Dönüştür");
    }, 45000);

    assert(downloads.length >= 1, 'Image to PDF did not download anything');
    assert(downloads[0].type === 'pdf', 'Image to PDF output is not a PDF');

    return {
      tool: 'image-to-pdf',
      ok: true,
      details: {
        downloads: summarizeDownloads(downloads),
      },
      logs: meta,
    };
  } finally {
    await page.close();
  }
}

async function runTest(browser, fn) {
  try {
    return await fn(browser);
  } catch (error) {
    if (error.page && !error.page.isClosed()) {
      const screenshotPath = path.join(
        FAILURE_DIR,
        `${Date.now()}-${Math.random().toString(36).slice(2)}.png`
      );
      await error.page.screenshot({ path: screenshotPath, fullPage: true });
      error.screenshotPath = screenshotPath;
    }
    throw error;
  }
}

async function main() {
  ensureCleanDir(ROOT_DIR);
  fs.mkdirSync(FIXTURE_DIR, { recursive: true });
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
  fs.mkdirSync(FAILURE_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox'],
  });

  await makeFixtures(browser);

  const tests = [
    smokeHome,
    smokePdfIndex,
    testTextCounter,
    testJsonFormatter,
    testQrGenerator,
    testPasswordGenerator,
    testImageCompress,
    testBase64,
    testColorPicker,
    testLoremIpsum,
    testMarkdownPreview,
    testUnitConverter,
    testPdfMerge,
    testPdfSplit,
    testPdfCompress,
    testPdfRotate,
    testPdfPages,
    testPdfWatermark,
    testPdfPageNumber,
    testImageConvert,
    testPdfToImage,
    testImageToPdf,
  ];

  const results = [];
  for (const test of tests) {
    try {
      results.push(await test(browser));
    } catch (error) {
      results.push({
        tool: test.name,
        ok: false,
        error: error.message,
        screenshotPath: error.screenshotPath || null,
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
